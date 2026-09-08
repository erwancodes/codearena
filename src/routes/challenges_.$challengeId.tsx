import { createFileRoute } from '@tanstack/react-router'
import { ChallengeDetail } from '@/components/challenges/ChallengeDetail'

export const Route = createFileRoute('/challenges_/$challengeId')({ component: ChallengeRoute })

function ChallengeRoute() {
  const { challengeId } = Route.useParams()
  return <ChallengeDetail challengeId={challengeId} />
}
