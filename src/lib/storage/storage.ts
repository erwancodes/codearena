import { z } from 'zod'
import type { Settings, TrainingSession, UserProgress } from '@/types/codearena'

export const STORAGE_VERSION = '2'
export const storageKeys = {
  progress: 'codearena:progress',
  sessions: 'codearena:sessions',
  settings: 'codearena:settings',
  challengeState: 'codearena:challenge-state',
  version: 'codearena:data-version',
} as const

export type PersistedTimer = { remainingTime: number; startedAt?: string; pausedAt?: string; running: boolean }

const progressSchema = z.object({
  totalXp: z.number(), completedChallenges: z.array(z.string()), scores: z.record(z.string(), z.number()), skillProgress: z.record(z.string(), z.number()), streak: z.number(), bestStreak: z.number(), totalTrainingMinutes: z.number(), lastSessionAt: z.string().optional(),
})

const sessionsSchema = z.array(z.object({ id: z.string(), challengeId: z.string().optional(), type: z.enum(['practice', 'challenge', 'competition']), startedAt: z.string(), completedAt: z.string().optional(), duration: z.number(), score: z.number().optional() }))
const settingsSchema = z.object({ displayName: z.string().default(''), onboardingCompleted: z.boolean().default(false), tutorialCompleted: z.boolean().default(false), trainingFocus: z.enum(['React', 'JavaScript', 'Accessibility', 'WorldSkills']).default('React'), preferredDifficulty: z.enum(['Beginner', 'Intermediate', 'Advanced', 'WorldSkills']), defaultDuration: z.number(), timerSound: z.boolean(), competitionRules: z.boolean() })

const isBrowser = () => typeof window !== 'undefined'

function read<T>(key: string, schema: z.ZodType<T>, fallback: T): T {
  if (!isBrowser()) return fallback
  try {
    const parsed = schema.safeParse(JSON.parse(window.localStorage.getItem(key) ?? 'null'))
    return parsed.success ? parsed.data : fallback
  } catch {
    return fallback
  }
}

function write<T>(key: string, value: T) {
  if (!isBrowser()) return
  window.localStorage.setItem(key, JSON.stringify(value))
  window.localStorage.setItem(storageKeys.version, STORAGE_VERSION)
}

export const progressStorage = {
  read: (fallback: UserProgress) => read(storageKeys.progress, progressSchema, fallback),
  write: (value: UserProgress) => write(storageKeys.progress, value),
}

export const sessionStorage = {
  read: () => read<TrainingSession[]>(storageKeys.sessions, sessionsSchema, []),
  write: (value: TrainingSession[]) => write(storageKeys.sessions, value),
}

export const settingsStorage = {
  read: (fallback: Settings) => read(storageKeys.settings, settingsSchema, fallback),
  write: (value: Settings) => write(storageKeys.settings, value),
}

export const timerStorage = {
  read: (key: string) => read<PersistedTimer>(`codearena:timer:${key}`, z.object({ remainingTime: z.number(), startedAt: z.string().optional(), pausedAt: z.string().optional(), running: z.boolean() }), { remainingTime: 0, running: false }),
  write: (key: string, value: PersistedTimer) => write(`codearena:timer:${key}`, value),
  clear: (key: string) => { if (isBrowser()) window.localStorage.removeItem(`codearena:timer:${key}`) },
}

export function exportData() {
  return JSON.stringify({ version: STORAGE_VERSION, progress: progressStorage.read({} as UserProgress), sessions: sessionStorage.read(), settings: settingsStorage.read({} as Settings) }, null, 2)
}

export function importData(raw: string) {
  const parsed = z.object({ version: z.string().optional(), progress: progressSchema, sessions: sessionsSchema, settings: settingsSchema }).parse(JSON.parse(raw))
  progressStorage.write(parsed.progress)
  sessionStorage.write(parsed.sessions)
  settingsStorage.write(parsed.settings)
  return parsed
}

export function clearAllData() {
  if (!isBrowser()) return
  Object.values(storageKeys).forEach((key) => window.localStorage.removeItem(key))
  for (let index = window.localStorage.length - 1; index >= 0; index -= 1) {
    const key = window.localStorage.key(index)
    if (key?.startsWith('codearena:timer:')) window.localStorage.removeItem(key)
  }
}
