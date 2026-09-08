export type ChallengeCategory =
  | 'React'
  | 'JavaScript'
  | 'CSS'
  | 'HTML'
  | 'Accessibility'
  | 'Web fundamentals'
  | 'Debug'
  | 'UI rebuild'

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'WorldSkills'
export type ChallengeStatus = 'not-started' | 'in-progress' | 'completed'
export type TrainingFocus = 'React' | 'JavaScript' | 'Accessibility' | 'WorldSkills'

export type Challenge = {
  id: string
  title: string
  description: string
  category: ChallengeCategory
  skill: string
  difficulty: Difficulty
  estimatedMinutes: number
  xp: number
  requirements: string[]
  bonus?: string[]
  tags: string[]
  status?: ChallengeStatus
}

export type UserProgress = {
  totalXp: number
  completedChallenges: string[]
  scores: Record<string, number>
  skillProgress: Record<string, number>
  streak: number
  bestStreak: number
  totalTrainingMinutes: number
  lastSessionAt?: string
}

export type TrainingSession = {
  id: string
  challengeId?: string
  type: 'practice' | 'challenge' | 'competition'
  startedAt: string
  completedAt?: string
  duration: number
  score?: number
}

export type Settings = {
  displayName: string
  onboardingCompleted: boolean
  tutorialCompleted: boolean
  trainingFocus: TrainingFocus
  preferredDifficulty: Difficulty
  defaultDuration: number
  timerSound: boolean
  competitionRules: boolean
}

export const skillColors: Record<string, string> = {
  React: '#4da3ff',
  JavaScript: '#f4c84e',
  CSS: '#42a5f5',
  HTML: '#f06b4a',
  Accessibility: '#a28bff',
  'Web fundamentals': '#2fc4a6',
}
