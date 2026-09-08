import { useEffect, useMemo, useState } from 'react'
import { timerStorage, type PersistedTimer } from '@/lib/storage/storage'

function remainingFromState(state: PersistedTimer) {
  if (!state.running || !state.startedAt) return state.remainingTime
  const elapsed = Math.floor((Date.now() - new Date(state.startedAt).getTime()) / 1000)
  return Math.max(0, state.remainingTime - elapsed)
}

export function useTimer(initialMinutes: number, persistenceKey: string) {
  const initialState: PersistedTimer = { remainingTime: initialMinutes * 60, running: false }
  const [state, setState] = useState<PersistedTimer>(initialState)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const saved = timerStorage.read(persistenceKey)
    const remainingTime = saved.remainingTime > 0 ? remainingFromState(saved) : initialState.remainingTime
    setState({ ...saved, remainingTime, running: saved.running && remainingTime > 0 })
    setHydrated(true)
  }, [initialMinutes, persistenceKey])

  useEffect(() => {
    if (!hydrated) return
    timerStorage.write(persistenceKey, state)
  }, [hydrated, persistenceKey, state])

  useEffect(() => {
    if (!state.running || !state.startedAt) return
    const timer = window.setInterval(() => {
      setState((current) => {
        const remainingTime = remainingFromState(current)
        return { ...current, remainingTime, running: remainingTime > 0 }
      })
    }, 1000)
    return () => window.clearInterval(timer)
  }, [state.running, state.startedAt])

  const formatted = useMemo(() => `${String(Math.floor(state.remainingTime / 3600)).padStart(2, '0')}:${String(Math.floor((state.remainingTime % 3600) / 60)).padStart(2, '0')}:${String(state.remainingTime % 60).padStart(2, '0')}`, [state.remainingTime])
  const start = () => setState((current) => { const next = { ...current, running: true, startedAt: new Date().toISOString(), pausedAt: undefined }; timerStorage.write(persistenceKey, next); return next })
  const pause = () => setState((current) => { const next = { ...current, remainingTime: remainingFromState(current), running: false, pausedAt: new Date().toISOString() }; timerStorage.write(persistenceKey, next); return next })
  const reset = () => { timerStorage.clear(persistenceKey); setState(initialState) }

  return { secondsLeft: state.remainingTime, formatted, running: state.running, start, pause, reset }
}
