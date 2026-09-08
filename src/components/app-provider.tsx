import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { challenges } from '@/data/challenges'
import { defaultProgress, skillProgress } from '@/data/skills'
import { clearAllData, progressStorage, sessionStorage, settingsStorage, STORAGE_VERSION, storageKeys } from '@/lib/storage/storage'
import type { Challenge, ChallengeStatus, Settings, TrainingSession, UserProgress } from '@/types/codearena'

const defaultSettings: Settings = { displayName: '', onboardingCompleted: false, tutorialCompleted: false, trainingFocus: 'React', preferredDifficulty: 'Intermediate', defaultDuration: 30, timerSound: true, competitionRules: true }

type ArenaContextValue = {
  progress: UserProgress
  settings: Settings
  hydrated: boolean
  getChallengeStatus: (id: string) => ChallengeStatus
  getChallenges: () => Challenge[]
  completeChallenge: (challenge: Challenge, score: number) => void
  startChallenge: (challengeId: string) => void
  updateSettings: (next: Partial<Settings>) => void
  resetProgress: () => void
  resetWorkspace: () => void
  sessions: TrainingSession[]
}

const ArenaContext = createContext<ArenaContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(defaultProgress)
  const [settings, setSettings] = useState<Settings>(defaultSettings)
  const [sessions, setSessions] = useState<TrainingSession[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    if (window.localStorage.getItem(storageKeys.version) !== STORAGE_VERSION) clearAllData()
    setProgress(progressStorage.read(defaultProgress))
    setSettings(settingsStorage.read(defaultSettings))
    setSessions(sessionStorage.read())
    setHydrated(true)
  }, [])

  const value = useMemo<ArenaContextValue>(() => {
    const getChallengeStatus = (id: string): ChallengeStatus => {
      if (progress.completedChallenges.includes(id)) return 'completed'
      return sessions.some((session) => session.challengeId === id && !session.completedAt) ? 'in-progress' : 'not-started'
    }
    return {
      progress, settings, hydrated, sessions, getChallengeStatus,
      getChallenges: () => challenges.map((challenge) => ({ ...challenge, status: getChallengeStatus(challenge.id) })),
      completeChallenge: (challenge, score) => {
        setProgress((current) => {
          const now = new Date()
          const alreadyCompleted = current.completedChallenges.includes(challenge.id)
          const previousSession = current.lastSessionAt ? new Date(current.lastSessionAt) : null
          const dayGap = previousSession ? Math.floor((new Date(now.toDateString()).getTime() - new Date(previousSession.toDateString()).getTime()) / 86400000) : null
          const nextStreak = !previousSession || dayGap === null || dayGap > 1 ? 1 : dayGap === 1 ? current.streak + 1 : Math.max(1, current.streak)
          const previousSkill = current.skillProgress[challenge.category] ?? 0
          const nextSkill = Math.min(100, Math.round(previousSkill + (score - previousSkill) * 0.35))
          const next = { ...current, totalXp: current.totalXp + (alreadyCompleted ? 0 : challenge.xp), totalTrainingMinutes: current.totalTrainingMinutes + (alreadyCompleted ? 0 : challenge.estimatedMinutes), lastSessionAt: now.toISOString(), completedChallenges: alreadyCompleted ? current.completedChallenges : [...current.completedChallenges, challenge.id], scores: { ...current.scores, [challenge.id]: score }, streak: nextStreak, bestStreak: Math.max(current.bestStreak, nextStreak), skillProgress: { ...current.skillProgress, [challenge.category]: nextSkill } }
          progressStorage.write(next)
          return next
        })
        setSessions((current) => {
          const now = new Date()
          const runningSession = current.find((session) => session.challengeId === challenge.id && !session.completedAt)
          const duration = runningSession ? Math.max(1, Math.round((now.getTime() - new Date(runningSession.startedAt).getTime()) / 60000)) : challenge.estimatedMinutes
          const next = runningSession ? current.map((session) => session.id === runningSession.id ? { ...session, completedAt: now.toISOString(), duration, score } : session) : [{ id: crypto.randomUUID(), challengeId: challenge.id, type: 'challenge' as const, startedAt: now.toISOString(), completedAt: now.toISOString(), duration, score }, ...current]
          sessionStorage.write(next)
          return next
        })
      },
      startChallenge: (challengeId) => setSessions((current) => {
        if (current.some((session) => session.challengeId === challengeId && !session.completedAt)) return current
        const next = [{ id: crypto.randomUUID(), challengeId, type: 'challenge' as const, startedAt: new Date().toISOString(), duration: 0 }, ...current]
        sessionStorage.write(next)
        return next
      }),
      updateSettings: (next) => setSettings((current) => { const updated = { ...current, ...next }; settingsStorage.write(updated); return updated }),
      resetProgress: () => { const emptyProgress = { ...defaultProgress, skillProgress: Object.fromEntries(skillProgress.map((skill) => [skill.name, skill.score])) }; setProgress(emptyProgress); progressStorage.write(emptyProgress); setSessions([]); sessionStorage.write([]) },
      resetWorkspace: () => { const emptyProgress = { ...defaultProgress, skillProgress: Object.fromEntries(skillProgress.map((skill) => [skill.name, skill.score])) }; clearAllData(); setProgress(emptyProgress); progressStorage.write(emptyProgress); setSessions([]); sessionStorage.write([]); setSettings(defaultSettings); settingsStorage.write(defaultSettings) },
    }
  }, [hydrated, progress, sessions, settings])

  return <ArenaContext.Provider value={value}>{children}</ArenaContext.Provider>
}

export function useArena() {
  const context = useContext(ArenaContext)
  if (!context) throw new Error('useArena must be used inside AppProvider')
  return context
}
