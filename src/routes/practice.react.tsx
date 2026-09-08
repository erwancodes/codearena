import { createFileRoute } from '@tanstack/react-router'
import { ReactLab } from '@/components/practice/ReactLab'

export const Route = createFileRoute('/practice/react')({
  component: ReactLab,
})
