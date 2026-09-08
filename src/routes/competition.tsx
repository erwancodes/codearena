import { createFileRoute } from '@tanstack/react-router'
import { CompetitionView } from '@/components/competition/CompetitionView'

export const Route = createFileRoute('/competition')({ component: CompetitionView })
