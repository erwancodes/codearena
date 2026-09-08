import type { ReactNode } from 'react'
import { Link, useLocation } from '@tanstack/react-router'
import { Bell, BookOpen, ChartNoAxesColumnIncreasing, ChevronDown, CircleHelp, Code2, Crosshair, Gauge, LayoutDashboard, ListChecks, Menu, Search, Settings, Trophy } from 'lucide-react'
import { useState } from 'react'
import { useArena } from '@/components/app-provider'
import { AppTutorial } from '@/components/onboarding/AppTutorial'
import { OnboardingModal } from '@/components/onboarding/OnboardingModal'
import { levelFromXp } from '@/lib/scoring/xp'

const mainNav = [
  { to: '/', label: 'Tableau de bord', shortLabel: 'Accueil', icon: LayoutDashboard },
  { to: '/practice', label: 'Entraînement', shortLabel: 'Pratique', icon: Crosshair },
  { to: '/challenges', label: 'Challenges', shortLabel: 'Défis', icon: ListChecks },
  { to: '/competition', label: 'Compétition', shortLabel: 'Compète', icon: Trophy },
  { to: '/progress', label: 'Progression', shortLabel: 'Progrès', icon: ChartNoAxesColumnIncreasing },
  { to: '/resources', label: 'Ressources', shortLabel: 'Ressources', icon: BookOpen },
]

export function AppShell({ children }: { children: ReactNode }) {
  const location = useLocation()
  const { progress, settings, hydrated, updateSettings } = useArena()
  const [mobileOpen, setMobileOpen] = useState(false)
  const level = levelFromXp(progress.totalXp)
  const displayName = settings.displayName || 'Ton profil'
  const initials = displayName.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase()
  const currentPage = location.pathname === '/' ? 'Tableau de bord' : location.pathname === '/practice' || location.pathname.startsWith('/practice/') ? 'Entraînement' : location.pathname === '/challenges' || location.pathname.startsWith('/challenges/') ? 'Challenges' : location.pathname === '/competition' ? 'Compétition' : location.pathname === '/progress' ? 'Progression' : location.pathname === '/resources' ? 'Ressources' : 'Paramètres'

  const navContent = <>
    <div className="mb-8 flex items-center gap-3 px-2"><span className="grid h-8 w-8 place-items-center rounded-[7px] bg-[#2d77df] text-white shadow-[0_6px_20px_rgba(45,119,223,.3)]"><Code2 size={20} strokeWidth={2.2} /></span><div><p className="text-[16px] font-bold tracking-[-.045em] text-white">Code<span className="text-[#57a0ff]">Arena</span></p><p className="text-[9px] uppercase tracking-[.18em] text-[#7693b2]">Entraîne-toi. Construis. Compète.</p></div></div>
    <div className="mb-2 px-2 text-[9px] font-semibold uppercase tracking-[.19em] text-[#5f7b99]">Espace de travail</div>
    <nav className="space-y-1" aria-label="Navigation principale">{mainNav.map(({ to, label, icon: Icon }) => { const active = location.pathname === to || (to !== '/' && location.pathname.startsWith(to)); return <Link key={to} to={to} onClick={() => setMobileOpen(false)} className={`focus-ring group flex items-center gap-3 rounded-[7px] px-3 py-2.5 text-[12px] font-medium transition-colors ${active ? 'bg-[#1b5db5] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.12)]' : 'text-[#90a9c3] hover:bg-[#142b46] hover:text-[#eaf3ff]'}`}><Icon size={15} strokeWidth={active ? 2.1 : 1.7} /><span>{label}</span>{active ? <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#8bc2ff]" /> : null}</Link> })}</nav>
    <div className="mt-8 px-2 text-[9px] font-semibold uppercase tracking-[.19em] text-[#5f7b99]">Système</div>
    <Link to="/settings" onClick={() => setMobileOpen(false)} className={`focus-ring mt-2 flex items-center gap-3 rounded-[7px] px-3 py-2.5 text-[12px] font-medium ${location.pathname === '/settings' ? 'bg-[#1b5db5] text-white' : 'text-[#90a9c3] hover:bg-[#142b46] hover:text-[#eaf3ff]'}`}><Settings size={15} strokeWidth={1.7} /><span>Paramètres</span></Link>
    <div className="mt-auto rounded-[9px] border border-[#294967] bg-[#10253d] p-3"><div className="flex items-start justify-between"><span className="grid h-7 w-7 place-items-center rounded-[6px] bg-[#1d4168] text-[#76b5ff]"><Gauge size={15} /></span><span className="rounded-full bg-[#173c63] px-2 py-1 text-[9px] font-semibold text-[#83b9f5]">Niveau {level}</span></div><p className="mt-3 text-[11px] font-semibold text-[#dceaff]">Entraîne-toi avec intention.</p><p className="mt-1 text-[10px] leading-4 text-[#7691af]">Une session concentrée aujourd’hui garde ton avantage pour la compétition.</p><Link to="/practice" onClick={() => setMobileOpen(false)} className="mt-3 inline-flex text-[10px] font-semibold text-[#6bb0ff] hover:text-white">Démarrer une session <span className="ml-1">→</span></Link></div>
  </>

  return <div className="app-grid min-h-[100dvh] text-[#e8f0fb]">
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[224px] flex-col border-r border-[#203c5b] bg-[#0a1728]/95 px-3 py-5 backdrop-blur-xl lg:flex">{navContent}</aside>
    {mobileOpen ? <div className="fixed inset-0 z-40 bg-[#06101d]/80 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)}><aside className="flex h-full w-[250px] flex-col border-r border-[#203c5b] bg-[#0b192b] px-3 py-5" onClick={(event) => event.stopPropagation()}>{navContent}</aside></div> : null}
    <div className="lg:pl-[224px]">
      <header className="sticky top-0 z-20 border-b border-[#203c5b]/80 bg-[#0b192b]/88 backdrop-blur-xl"><div className="mx-auto flex h-[62px] max-w-[1440px] items-center gap-3 px-4 sm:px-6 lg:px-8"><button type="button" aria-label="Ouvrir la navigation" className="focus-ring rounded-[6px] p-2 text-[#a5bdd6] hover:bg-[#142b46] lg:hidden" onClick={() => setMobileOpen(true)}><Menu size={18} /></button><div className="hidden items-center gap-2 lg:flex"><span className="text-[10px] text-[#5f7b99]">Espace de travail</span><span className="text-[#365477]">/</span><span className="text-[11px] font-medium text-[#a8bfda]">{currentPage}</span></div><div className="relative ml-auto hidden w-[260px] sm:block"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#63809f]" size={14} /><input aria-label="Rechercher des challenges et ressources" placeholder="Rechercher des challenges, ressources..." className="focus-ring h-8 w-full rounded-[6px] border border-[#294966] bg-[#11243a] pl-9 pr-3 text-[11px] text-white placeholder:text-[#63809f]" /></div><button type="button" aria-label="Ouvrir l’aide" onClick={() => updateSettings({ tutorialCompleted: false })} className="focus-ring rounded-[6px] p-2 text-[#7d98b6] hover:bg-[#142b46] hover:text-white"><CircleHelp size={16} /></button><button type="button" aria-label="Notifications" className="focus-ring relative rounded-[6px] p-2 text-[#7d98b6] hover:bg-[#142b46] hover:text-white"><Bell size={16} /><span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#5da2ff]" /></button><div className="flex items-center gap-2 border-l border-[#28435f] pl-3"><div className="grid h-7 w-7 place-items-center rounded-full bg-[#2775d7] text-[10px] font-bold text-white">{initials}</div><div className="hidden text-right sm:block"><p className="text-[10px] font-semibold text-[#dceafa]">{displayName}</p><p className="text-[9px] text-[#7290ad]">Niveau {level}</p></div><ChevronDown size={13} className="text-[#6f8ba9]" /></div></div></header>
      <main className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8">{children}</main>
    </div>
    <nav className="fixed inset-x-3 bottom-3 z-20 grid grid-cols-5 rounded-[10px] border border-[#2a4b6a] bg-[#0d2036]/95 p-1.5 shadow-[0_12px_36px_rgba(0,0,0,.34)] backdrop-blur-xl lg:hidden">{mainNav.slice(0, 5).map(({ to, shortLabel, icon: Icon }) => <Link key={to} to={to} className={`flex flex-col items-center gap-1 rounded-[6px] px-1 py-2 text-[9px] ${location.pathname === to ? 'bg-[#1b5db5] text-white' : 'text-[#7894b0]'}`}><Icon size={15} /><span>{shortLabel}</span></Link>)}</nav>
    {hydrated && !settings.onboardingCompleted ? <OnboardingModal /> : hydrated && !settings.tutorialCompleted ? <AppTutorial /> : null}
  </div>
}
