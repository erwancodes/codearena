import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, BarChart3, CheckCircle2, Code2, Crosshair, LayoutDashboard, X } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'
import { useArena } from '@/components/app-provider'
import { Button } from '@/components/ui'

const tutorialSteps = [
  {
    title: 'Ton tableau de bord',
    description: 'C’est ton point de départ. Tu y retrouves ton niveau, tes XP, ta série et la prochaine session utile à lancer.',
    detail: 'Les chiffres apparaissent uniquement après tes vraies sessions.',
    icon: LayoutDashboard,
    color: '#4da3ff',
  },
  {
    title: 'Entraîne-toi avec intention',
    description: 'L’espace Entraînement regroupe les axes React, JavaScript, CSS, HTML et accessibilité.',
    detail: 'Tu peux suivre une recommandation ou parcourir librement les challenges.',
    icon: Crosshair,
    color: '#58d3b0',
  },
  {
    title: 'Écris, exécute, corrige',
    description: 'Le Labo React te permet d’écrire du code, de le lancer dans le navigateur et de vérifier le rendu attendu.',
    detail: 'Tes brouillons restent locaux et le minuteur accompagne chaque entraînement.',
    icon: Code2,
    color: '#a58bff',
  },
  {
    title: 'Suis ton vrai niveau',
    description: 'Après un challenge, ton score met à jour tes compétences, tes XP, ta série et ton historique.',
    detail: 'La page Progression t’aide à choisir ton prochain axe de travail.',
    icon: BarChart3,
    color: '#f4c84e',
  },
]

export function AppTutorial() {
  const { updateSettings } = useArena()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const primaryButtonRef = useRef<HTMLButtonElement>(null)
  const current = tutorialSteps[step]
  const Icon = current.icon
  const lastStep = step === tutorialSteps.length - 1

  useEffect(() => {
    primaryButtonRef.current?.focus()
    const handleEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') updateSettings({ tutorialCompleted: true }) }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [step, updateSettings])

  const close = () => updateSettings({ tutorialCompleted: true })
  const finish = () => { close(); void navigate({ to: '/practice' }) }

  return <div className="mobile-modal-viewport fixed inset-0 z-50 flex min-h-[100dvh] items-start justify-center overflow-y-auto bg-[#06101d]/88 px-4 backdrop-blur-md sm:items-center" role="dialog" aria-modal="true" aria-labelledby="tutorial-title"><div className="my-4 w-full max-w-[720px] overflow-hidden rounded-[14px] border border-[#315a82] bg-[linear-gradient(145deg,#112944,#091728)] shadow-[0_24px_80px_rgba(0,0,0,.5)] sm:my-6"><div className="flex items-center justify-between border-b border-[#294b6b] px-4 py-4 sm:px-5"><div className="flex min-w-0 items-center gap-2"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-[7px] bg-[#2d77df] text-white"><Code2 size={18} /></span><div className="min-w-0"><p className="truncate text-[13px] font-semibold text-white">Prise en main de CodeArena</p><p className="mt-0.5 truncate text-[10px] text-[#7896b2]">Quelques repères pour commencer sans te perdre</p></div></div><button type="button" aria-label="Passer le tutoriel" onClick={close} className="focus-ring grid min-h-10 min-w-10 shrink-0 place-items-center rounded-[6px] text-[#86a3bf] hover:bg-[#173453] hover:text-white"><X size={16} /></button></div><div className="grid grid-cols-4 gap-1 bg-[#0b1c30] p-1">{tutorialSteps.map((item, index) => <button key={item.title} type="button" aria-label={`Afficher l’étape ${index + 1}`} aria-current={index === step ? 'step' : undefined} onClick={() => setStep(index)} className={`focus-ring h-2 rounded-full transition-colors ${index <= step ? 'bg-[#4d9af5]' : 'bg-[#203a56]'}`} />)}</div><div className="grid md:grid-cols-[190px_1fr]"><div className="border-b border-[#294b6b] bg-[#0b1c30]/70 p-3 md:border-b-0 md:border-r md:p-4"><p className="px-2 text-[9px] font-semibold uppercase tracking-[.18em] text-[#6686a6]">Le parcours</p><div className="mt-3 grid grid-cols-2 gap-1 md:block md:space-y-1">{tutorialSteps.map((item, index) => { const StepIcon = item.icon; return <button key={item.title} type="button" onClick={() => setStep(index)} className={`focus-ring flex min-h-11 w-full items-center gap-2 rounded-[7px] px-2.5 py-2 text-left transition-colors ${index === step ? 'bg-[#16395f] text-white' : 'text-[#7896b2] hover:bg-[#102943] hover:text-[#dceafa]'}`}><span className={`grid h-6 w-6 shrink-0 place-items-center rounded-[5px] ${index === step ? 'bg-[#2b73c9]' : 'bg-[#142c47]'}`}><StepIcon size={13} style={{ color: index === step ? '#fff' : item.color }} /></span><span className="min-w-0"><span className="block truncate text-[10px] font-medium">{item.title}</span><span className="mt-0.5 block text-[9px] text-[#6885a3]">Étape {index + 1}</span></span>{index < step ? <CheckCircle2 size={13} className="ml-auto hidden shrink-0 text-[#5bd2af] sm:block" /> : null}</button> })}</div></div><div className="p-5 sm:p-7"><div className="grid h-12 w-12 place-items-center rounded-[10px]" style={{ color: current.color, backgroundColor: `${current.color}1c` }}><Icon size={24} /></div><p className="mt-5 text-[10px] font-semibold uppercase tracking-[.18em] text-[#6daeff]">Étape {step + 1} sur {tutorialSteps.length}</p><h1 id="tutorial-title" className="mt-2 text-[25px] font-semibold tracking-[-.05em] text-white">{current.title}</h1><p className="mt-3 max-w-[50ch] text-[13px] leading-6 text-[#abc0d4]">{current.description}</p><div className="mt-5 rounded-[8px] border border-[#294b6b] bg-[#0c2036] p-3 text-[11px] leading-5 text-[#8ca8c3]">{current.detail}</div><div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-[#294b6b] pt-4"><button type="button" onClick={close} className="focus-ring min-h-11 text-[11px] font-medium text-[#8ca8c2] hover:text-white">Passer le tutoriel</button><div className="flex items-center gap-2">{step > 0 ? <Button variant="ghost" onClick={() => setStep((currentStep) => currentStep - 1)}><ArrowLeft size={14} /> Retour</Button> : null}{lastStep ? <button ref={primaryButtonRef} type="button" onClick={finish} className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-[7px] bg-[#3d8df5] px-3.5 py-2 text-[12px] font-semibold text-white shadow-[0_8px_20px_rgba(30,108,220,.25)] transition-all hover:bg-[#5aa0ff] active:translate-y-px sm:min-h-0">Commencer l’entraînement <ArrowRight size={14} /></button> : <button ref={primaryButtonRef} type="button" onClick={() => setStep((currentStep) => currentStep + 1)} className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-[7px] bg-[#3d8df5] px-3.5 py-2 text-[12px] font-semibold text-white shadow-[0_8px_20px_rgba(30,108,220,.25)] transition-all hover:bg-[#5aa0ff] active:translate-y-px sm:min-h-0">Suivant <ArrowRight size={14} /></button>}</div></div></div></div></div></div>
}
