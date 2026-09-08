import { Outlet, createFileRoute, useLocation } from '@tanstack/react-router'
import { PracticeView } from '@/components/practice/PracticeView'

function PracticeRoute() {
  const location = useLocation()
  return location.pathname === '/practice' ? <PracticeView /> : <Outlet />
}

export const Route = createFileRoute('/practice')({ component: PracticeRoute })
