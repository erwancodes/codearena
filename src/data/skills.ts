export const skillProgress = [
  { name: 'React', score: 0, delta: '', color: '#4da3ff' },
  { name: 'JavaScript', score: 0, delta: '', color: '#f4c84e' },
  { name: 'CSS', score: 0, delta: '', color: '#42a5f5' },
  { name: 'HTML', score: 0, delta: '', color: '#f06b4a' },
  { name: 'Accessibility', score: 0, delta: '', color: '#a28bff' },
  { name: 'Web fundamentals', score: 0, delta: '', color: '#2fc4a6' },
]

export const defaultProgress = {
  totalXp: 0,
  completedChallenges: [],
  scores: {},
  skillProgress: Object.fromEntries(skillProgress.map((skill) => [skill.name, skill.score])),
  streak: 0,
  bestStreak: 0,
  totalTrainingMinutes: 0,
}
