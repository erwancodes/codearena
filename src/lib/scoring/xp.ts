import type { Difficulty } from '@/types/codearena'

export const xpByDifficulty: Record<Difficulty, number> = {
  Beginner: 50,
  Intermediate: 100,
  Advanced: 200,
  WorldSkills: 350,
}

export function levelFromXp(xp: number) {
  if (xp >= 9000) return 10
  if (xp >= 6800) return 9
  if (xp >= 5000) return 8
  if (xp >= 3600) return 7
  if (xp >= 2500) return 6
  if (xp >= 1600) return 5
  if (xp >= 900) return 4
  if (xp >= 500) return 3
  if (xp >= 200) return 2
  return 1
}

export function xpForNextLevel(level: number) {
  return [0, 200, 500, 900, 1600, 2500, 3600, 5000, 6800, 9000][level] ?? 11000
}
