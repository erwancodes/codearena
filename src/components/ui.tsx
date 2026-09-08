import type { ReactNode } from 'react'
import { ArrowUpRight, Check, ChevronRight, LockKeyhole } from 'lucide-react'
import type { Difficulty } from '@/types/codearena'
import { difficultyLabels } from '@/lib/i18n'

export function Button({ children, variant = 'primary', className = '', type = 'button', onClick, disabled = false }: { children: ReactNode; variant?: 'primary' | 'secondary' | 'ghost' | 'danger'; className?: string; type?: 'button' | 'submit' | 'reset'; onClick?: () => void; disabled?: boolean }) {
  const variants = {
    primary: 'bg-[#3d8df5] text-white shadow-[0_8px_20px_rgba(30,108,220,.25)] hover:bg-[#5aa0ff]',
    secondary: 'bg-[#1b3554] text-[#deebfa] border border-[#3d6288] hover:bg-[#244568]',
    ghost: 'bg-transparent text-[#9eb5cf] hover:bg-[#1a3049] hover:text-white',
    danger: 'bg-[#682d3a] text-[#ffcbd2] border border-[#a84c5d] hover:bg-[#81394a]',
  }
  return <button type={type} onClick={onClick} disabled={disabled} className={`focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-[7px] px-3.5 py-2 text-[12px] font-semibold tracking-[.01em] transition-all duration-200 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-0 ${variants[variant]} ${className}`}>{children}</button>
}

export function Badge({ children, tone = 'blue', className = '' }: { children: ReactNode; tone?: 'blue' | 'green' | 'yellow' | 'purple' | 'red' | 'slate'; className?: string }) {
  const tones = {
    blue: 'border-[#275891] bg-[#12335c] text-[#8fc2ff]',
    green: 'border-[#1e6e60] bg-[#103c39] text-[#67e1bd]',
    yellow: 'border-[#846d25] bg-[#423919] text-[#f8d862]',
    purple: 'border-[#5a4c92] bg-[#282344] text-[#baaaff]',
    red: 'border-[#854453] bg-[#4a2633] text-[#ff9eac]',
    slate: 'border-[#48627e] bg-[#1b2c41] text-[#abc1d8]',
  }
  return <span className={`inline-flex items-center rounded-[4px] border px-2 py-0.5 text-[10px] font-semibold leading-4 ${tones[tone]} ${className}`}>{children}</span>
}

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const tone = difficulty === 'Beginner' ? 'green' : difficulty === 'Intermediate' ? 'yellow' : difficulty === 'Advanced' ? 'purple' : 'red'
  return <Badge tone={tone}>{difficultyLabels[difficulty]}</Badge>
}

export function Panel({ children, className = '', title, action }: { children: ReactNode; className?: string; title?: string; action?: ReactNode }) {
  return <section className={`surface-panel min-w-0 rounded-[10px] ${className}`}>
    {title ? <div className="flex items-center justify-between border-b thin-rule px-4 py-3"><h2 className="text-[12px] font-semibold text-[#dce9f8]">{title}</h2>{action}</div> : null}
    {children}
  </section>
}

export function SectionHeading({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return <div className="mb-3 flex flex-wrap items-end justify-between gap-3"><div><h2 className="text-[15px] font-semibold tracking-[-.02em] text-[#edf4fb]">{title}</h2>{description ? <p className="mt-1 text-[11px] text-[#7f9ab8]">{description}</p> : null}</div>{action}</div>
}

export function ProgressBar({ value, color = '#438ef3', className = '' }: { value: number; color?: string; className?: string }) {
  return <div className={`h-1.5 overflow-hidden rounded-full bg-[#1b3049] ${className}`}><div className="h-full rounded-full transition-all duration-700" style={{ width: `${Math.max(0, Math.min(100, value))}%`, backgroundColor: color }} /></div>
}

export function StatCard({ label, value, caption, icon: Icon, color = '#4da3ff', progress, pulse = false }: { label: string; value: string; caption?: string; icon: React.ComponentType<{ size?: number; strokeWidth?: number }>; color?: string; progress?: number; pulse?: boolean }) {
  return <div className="surface-panel-flat min-w-0 min-h-[104px] rounded-[8px] px-3.5 py-3"><div className="flex items-start justify-between"><div className="flex min-w-0 items-center gap-2"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-[6px]" style={{ backgroundColor: `${color}1c`, color }}><Icon size={15} strokeWidth={1.8} /></span><span className="truncate text-[10px] text-[#86a0bc]">{label}</span></div>{pulse ? <span className="signal-pulse mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#53d5ad]" /> : null}</div><p className="mt-3 text-[21px] font-semibold tracking-[-.04em] text-[#f5f8fd]">{value}</p>{caption ? <p className="mt-0.5 truncate text-[10px] text-[#718ba7]">{caption}</p> : null}{progress !== undefined ? <ProgressBar value={progress} color={color} className="mt-3" /> : null}</div>
}

export function ListArrow() { return <ChevronRight size={14} className="text-[#7795b4]" /> }
export function LinkArrow() { return <ArrowUpRight size={13} /> }
export function CheckMark({ checked = true }: { checked?: boolean }) { return checked ? <Check size={14} strokeWidth={2.4} /> : <LockKeyhole size={13} /> }
