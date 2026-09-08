import { ArrowRight, Braces, Code2, FileCode2, Globe2, Keyboard, LayoutGrid, Shuffle, Sparkles } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { challenges } from '@/data/challenges'
import { skillProgress } from '@/data/skills'
import { useArena } from '@/components/app-provider'
import { Badge, Button, DifficultyBadge, Panel } from '@/components/ui'
import { categoryLabels, skillLabels } from '@/lib/i18n'

const areas = [
  { name: 'React', detail: 'Composants, hooks, gestion d’état', icon: Code2, color: '#4da3ff' },
  { name: 'JavaScript', detail: 'ES6+, asynchrone, tableaux, DOM', icon: Braces, color: '#f4c84e' },
  { name: 'HTML', detail: 'Balisage sémantique, formulaires, SEO', icon: FileCode2, color: '#f06b4a' },
  { name: 'CSS', detail: 'Mise en page, responsive, mouvement', icon: LayoutGrid, color: '#42a5f5' },
  { name: 'Accessibility', detail: 'ARIA, clavier, lecteurs d’écran', icon: Keyboard, color: '#a28bff' },
  { name: 'Web fundamentals', detail: 'HTTP, API, Git, DevTools', icon: Globe2, color: '#2fc4a6' },
]

export function PracticeView() {
  const { progress } = useArena()
  const recommended = challenges.filter((challenge) => ['accessible-modal', 'keyboard-navigation', 'searchable-user-list'].includes(challenge.id))

  return (
    <div className="panel-in space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[.2em] text-[#5b8fc8]">Entraînement / choisir un axe</p>
          <h1 className="text-[26px] font-semibold tracking-[-.05em] text-white">Construis la compétence, pas la série.</h1>
          <p className="mt-1.5 text-[12px] text-[#8ca6c2]">Choisis un axe et démarre un bloc volontaire en moins d’une minute.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to="/practice/react"><Button><Code2 size={14} /> Ouvrir le labo React</Button></Link>
          <Link to="/challenges"><Button variant="secondary"><Shuffle size={14} /> Parcourir les challenges</Button></Link>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {areas.map(({ name, detail, icon: Icon, color }) => (
          <Link to="/challenges" key={name} className="group">
            <div className="surface-panel-flat rounded-[9px] p-4 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:border-[#3e6e9d]">
              <div className="flex items-start justify-between">
                <span className="grid h-9 w-9 place-items-center rounded-[7px]" style={{ color, backgroundColor: `${color}1b` }}><Icon size={18} /></span>
                <ArrowRight size={15} className="text-[#5d7c9d] transition-transform group-hover:translate-x-1 group-hover:text-[#89bfff]" />
              </div>
              <h2 className="mt-4 text-[15px] font-semibold text-[#ecf4fc]">{skillLabels[name] ?? name}</h2>
              <p className="mt-1 text-[11px] text-[#82a0bd]">{detail}</p>
              <div className="mt-4 flex items-center justify-between border-t border-[#25425c] pt-3">
                <span className="text-[10px] text-[#748faa]">Niveau actuel</span>
                <span className="font-mono text-[10px]" style={{ color }}>{progress.skillProgress[name] ?? skillProgress.find((skill) => skill.name === name)?.score ?? 0} %</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.5fr_.8fr]">
        <Panel title="Recommandé pour toi" action={<Badge tone="blue"><Sparkles size={11} /> Selon tes points faibles</Badge>}>
          <div className="divide-y divide-[#203d5a]">
            {recommended.map((challenge) => (
              <div key={challenge.id} className="flex flex-wrap items-center gap-3 p-4">
                <div className="grid h-9 w-9 place-items-center rounded-[7px] bg-[#172f4a] text-[#6eb3ff]"><Code2 size={17} /></div>
                <div className="min-w-[180px] flex-1">
                  <h3 className="text-[12px] font-semibold text-[#e9f2fc]">{challenge.title}</h3>
                  <p className="mt-1 text-[10px] text-[#7f9ab6]">{challenge.description}</p>
                  <div className="mt-2 flex items-center gap-2"><Badge tone="purple">{categoryLabels[challenge.category]}</Badge><DifficultyBadge difficulty={challenge.difficulty} /><span className="text-[10px] text-[#718ba6]">{challenge.estimatedMinutes} min</span></div>
                </div>
                <Link to="/challenges/$challengeId" params={{ challengeId: challenge.id }}><Button>Démarrer <ArrowRight size={13} /></Button></Link>
              </div>
            ))}
          </div>
        </Panel>

        <Panel className="overflow-hidden">
          <div className="relative p-5">
            <div className="absolute right-[-28px] top-[-30px] h-32 w-32 rounded-full border-[22px] border-[#245c95] opacity-30" />
            <span className="relative grid h-9 w-9 place-items-center rounded-[7px] bg-[#1a4068] text-[#6fb2ff]"><Sparkles size={17} /></span>
            <h2 className="relative mt-6 text-[18px] font-semibold tracking-[-.03em] text-white">Challenge aléatoire</h2>
            <p className="relative mt-2 text-[11px] leading-5 text-[#88a3bd]">Laisse la bibliothèque choisir un challenge utile selon ton travail incomplet et tes compétences les plus fragiles.</p>
            <Link to="/challenges" className="relative mt-5 inline-flex"><Button variant="secondary">Surprends-moi <ArrowRight size={13} /></Button></Link>
          </div>
        </Panel>
      </div>
    </div>
  )
}
