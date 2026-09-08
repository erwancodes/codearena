import { createFileRoute } from '@tanstack/react-router'
import { ResourcesView } from '@/components/resources/ResourcesView'

export const Route = createFileRoute('/resources')({ component: ResourcesView })
