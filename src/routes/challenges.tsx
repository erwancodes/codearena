import { createFileRoute } from '@tanstack/react-router'
import { ChallengesView } from '@/components/challenges/ChallengesView'

export const Route = createFileRoute('/challenges')({ component: ChallengesView })
