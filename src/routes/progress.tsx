import { createFileRoute } from '@tanstack/react-router'
import { ProgressView } from '@/components/progress/ProgressView'

export const Route = createFileRoute('/progress')({ component: ProgressView })
