import { useEffect, useMemo, useRef, useState } from 'react'
import { AlertTriangle, Check, CheckCircle2, Code2, ExternalLink, FileCode2, Play, RotateCcw, Save, Terminal, TimerReset, XCircle, Zap } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { challenges } from '@/data/challenges'
import { useArena } from '@/components/app-provider'
import { useTimer } from '@/hooks/use-timer'
import { Badge, Button, DifficultyBadge, Panel, ProgressBar } from '@/components/ui'

type LabChallengeId = 'searchable-user-list' | 'todo-app' | 'accessible-modal'
type Snapshot = { text: string; controls: { inputs: number; buttons: number; listItems: number } }
type PreviewMessage = { source?: string; type?: 'ready' | 'snapshot' | 'error'; message?: string; snapshot?: Snapshot }

const labChallengeIds: LabChallengeId[] = ['searchable-user-list', 'todo-app', 'accessible-modal']

const starterCode: Record<LabChallengeId, string> = {
  'searchable-user-list': `const users = [
  { id: 1, name: 'Ada Lovelace', role: 'Frontend engineer' },
  { id: 2, name: 'Grace Hopper', role: 'Platform engineer' },
  { id: 3, name: 'Margaret Hamilton', role: 'Systems engineer' },
];

function App() {
  const [query, setQuery] = React.useState('');
  // TODO: filter the users by name with the query
  const filteredUsers = users;

  return (
    <main className="app-shell">
      <p className="eyebrow">Entraînement React</p>
      <h1>Liste d’utilisateurs</h1>
      <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Rechercher un utilisateur" aria-label="Rechercher un utilisateur" />
      <ul>{filteredUsers.map((user) => <li key={user.id}><strong>{user.name}</strong><span>{user.role}</span></li>)}</ul>
    </main>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);`,
  'todo-app': `function App() {
  const [tasks, setTasks] = React.useState(['Lire la consigne', 'Construire le premier composant']);
  const [draft, setDraft] = React.useState('');

  function addTask() {
    if (!draft.trim()) return;
    setTasks((current) => [...current, draft.trim()]);
    setDraft('');
  }

  return (
    <main className="app-shell">
      <p className="eyebrow">Entraînement React</p>
      <h1>Liste de tâches</h1>
      <div className="task-form"><input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Ajouter une tâche" aria-label="Ajouter une tâche" /><button onClick={addTask}>Ajouter</button></div>
      <ul>{tasks.map((task, index) => <li key={index}><span>{task}</span><button aria-label={'Supprimer ' + task} onClick={() => setTasks((current) => current.filter((_, taskIndex) => taskIndex !== index))}>Supprimer</button></li>)}</ul>
    </main>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);`,
  'accessible-modal': `function App() {
  const [open, setOpen] = React.useState(false);

  return (
    <main className="app-shell">
      <p className="eyebrow">Entraînement React</p>
      <h1>Fenêtre modale accessible</h1>
      <p>Construis une interaction utilisable au clavier.</p>
      <button onClick={() => setOpen(true)}>Ouvrir la fenêtre</button>
      {open ? <div className="backdrop" role="presentation"><section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><h2 id="modal-title">Enregistrer ta progression ?</h2><p>Ton travail reste dans ce navigateur.</p><button onClick={() => setOpen(false)}>Fermer</button></section></div> : null}
    </main>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);`,
}

const starterCss = `* { box-sizing: border-box; }
body { margin: 0; background: #091727; color: #eaf3fc; font-family: Inter, system-ui, sans-serif; }
.app-shell { width: min(620px, calc(100% - 32px)); margin: 0 auto; padding: 48px 0; }
.eyebrow { color: #70b7ff; font-size: 11px; letter-spacing: .16em; text-transform: uppercase; }
h1 { margin: 8px 0 20px; font-size: 30px; }
input, button { border: 1px solid #315679; border-radius: 6px; background: #10263e; color: inherit; padding: 10px 12px; font: inherit; }
input { width: 100%; }
button { cursor: pointer; background: #347fdf; border-color: #5aa0ff; }
ul { display: grid; gap: 8px; padding: 0; list-style: none; }
li { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 14px; border: 1px solid #24445f; border-radius: 7px; background: #10243a; }
li span { color: #8ba8c3; font-size: 13px; }
.task-form { display: flex; gap: 8px; }
.task-form input { flex: 1; }
.backdrop { position: fixed; inset: 0; display: grid; place-items: center; padding: 24px; background: rgba(3, 11, 20, .78); }
.modal { max-width: 380px; padding: 24px; border: 1px solid #4b7eae; border-radius: 10px; background: #132b46; }
`;

const previewReactUrl = 'https://unpkg.com/react@18.3.1/umd/react.development.js'
const previewReactDomUrl = 'https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js'
const previewBabelUrl = 'https://unpkg.com/@babel/standalone@7.26.9/babel.min.js'

function buildPreviewDocument(code: string, css: string) {
  const safeCode = JSON.stringify(code).replace(/</g, '\\u003c')
  const safeCss = css.replace(/<\/style/gi, '<\\/style')
  return `<!doctype html><html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style>${safeCss}</style></head><body><div id="root"></div><pre id="runtime-error" style="display:none;color:#ffb2bd;background:#3b1f2c;padding:16px;white-space:pre-wrap"></pre><script src="${previewReactUrl}"></script><script src="${previewReactDomUrl}"></script><script src="${previewBabelUrl}"></script><script>
const send = (payload) => window.parent.postMessage({ source: 'codearena-react-lab', ...payload }, '*');
const showError = (message) => { const error = document.getElementById('runtime-error'); error.style.display = 'block'; error.textContent = message; send({ type: 'error', message }); };
window.addEventListener('error', (event) => showError(event.message || 'Runtime error'));
window.addEventListener('unhandledrejection', (event) => showError(event.reason?.message || String(event.reason)));
try {
  const source = ${safeCode};
  const compiled = Babel.transform(source, { presets: ['react'] }).code;
  new Function('React', 'ReactDOM', compiled)(React, ReactDOM);
  setTimeout(() => send({ type: 'snapshot', snapshot: { text: document.body.innerText, controls: { inputs: document.querySelectorAll('input').length, buttons: document.querySelectorAll('button').length, listItems: document.querySelectorAll('li').length } } }), 120);
} catch (error) { showError(error?.message || String(error)); }
</script></body></html>`
}

function testsFor(challengeId: LabChallengeId, snapshot: Snapshot | null) {
  const text = snapshot?.text ?? ''
  const controls = snapshot?.controls ?? { inputs: 0, buttons: 0, listItems: 0 }
  if (challengeId === 'searchable-user-list') return [{ label: 'Un champ de recherche est présent', passed: controls.inputs > 0 }, { label: 'La liste affiche des utilisateurs', passed: controls.listItems > 0 }, { label: 'Le rendu contient un nom utilisateur', passed: /Ada|Grace|Margaret/.test(text) }]
  if (challengeId === 'todo-app') return [{ label: 'Un champ d’ajout est présent', passed: controls.inputs > 0 }, { label: 'Une action permet d’ajouter', passed: /Add task|Ajouter/i.test(text) || controls.buttons > 0 }, { label: 'La liste contient au moins une tâche', passed: controls.listItems > 0 }]
  return [{ label: 'Un bouton ouvre l’interaction', passed: controls.buttons > 0 }, { label: 'Le rendu porte un titre de modal', passed: /Fenêtre modale|Ouvrir la fenêtre/i.test(text) }, { label: 'Le code déclare un dialogue accessible', passed: /role="dialog"|role='dialog'/.test(document.querySelector('textarea')?.value ?? '') }]
}

export function ReactLab() {
  const { completeChallenge, getChallengeStatus } = useArena()
  const [selectedId, setSelectedId] = useState<LabChallengeId>('searchable-user-list')
  const selectedChallenge = challenges.find((challenge) => challenge.id === selectedId) ?? challenges[0]
  const [code, setCode] = useState(starterCode[selectedId])
  const [css, setCss] = useState(starterCss)
  const [submittedCode, setSubmittedCode] = useState(starterCode[selectedId])
  const [submittedCss, setSubmittedCss] = useState(starterCss)
  const [runVersion, setRunVersion] = useState(0)
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null)
  const [runtimeError, setRuntimeError] = useState('')
  const [saved, setSaved] = useState(false)
  const [completed, setCompleted] = useState(getChallengeStatus(selectedId) === 'completed')
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const timer = useTimer(selectedChallenge.estimatedMinutes, `react-lab:${selectedId}`)
  const tests = useMemo(() => testsFor(selectedId, snapshot), [selectedId, snapshot])
  const allTestsPassed = tests.every((test) => test.passed)

  useEffect(() => {
    const savedDraft = window.localStorage.getItem(`codearena:react-lab:${selectedId}`)
    if (savedDraft) {
      try { const parsed = JSON.parse(savedDraft) as { code?: string; css?: string }; if (parsed.code) { setCode(parsed.code); setSubmittedCode(parsed.code) }; if (parsed.css) { setCss(parsed.css); setSubmittedCss(parsed.css) } } catch { /* ignore an invalid local draft */ }
    }
  }, [selectedId])

  useEffect(() => {
    const handleMessage = (event: MessageEvent<PreviewMessage>) => {
      if (event.data?.source !== 'codearena-react-lab') return
      if (event.data.type === 'error') { setRuntimeError(event.data.message ?? 'Erreur d’exécution inconnue.'); setSnapshot(null) }
      if (event.data.type === 'snapshot' && event.data.snapshot) { setRuntimeError(''); setSnapshot(event.data.snapshot) }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  const selectChallenge = (challengeId: LabChallengeId) => { setSelectedId(challengeId); setCode(starterCode[challengeId]); setCss(starterCss); setSubmittedCode(starterCode[challengeId]); setSubmittedCss(starterCss); setSnapshot(null); setRuntimeError(''); setSaved(false); setCompleted(getChallengeStatus(challengeId) === 'completed') }
  const run = () => { setSubmittedCode(code); setSubmittedCss(css); setRunVersion((current) => current + 1); setRuntimeError(''); setSnapshot(null); setSaved(false); if (!timer.running) timer.start() }
  const saveDraft = () => { window.localStorage.setItem(`codearena:react-lab:${selectedId}`, JSON.stringify({ code, css })); setSaved(true) }
  const resetDraft = () => { setCode(starterCode[selectedId]); setCss(starterCss); setSaved(false) }
  const complete = () => { if (!allTestsPassed || completed) return; completeChallenge(selectedChallenge, Math.round((tests.filter((test) => test.passed).length / tests.length) * 100)); setCompleted(true); timer.pause() }
  const handleTab = (event: React.KeyboardEvent<HTMLTextAreaElement>) => { if (event.key !== 'Tab') return; event.preventDefault(); const target = event.currentTarget; const start = target.selectionStart; const end = target.selectionEnd; const next = `${code.slice(0, start)}  ${code.slice(end)}`; setCode(next); requestAnimationFrame(() => { target.selectionStart = start + 2; target.selectionEnd = start + 2 }) }

  return <div className="panel-in min-w-0 space-y-5"><div className="flex min-w-0 flex-wrap items-end justify-between gap-3"><div className="min-w-0"><div className="flex items-center gap-2"><Link to="/practice" className="text-[10px] text-[#7fa1c2] hover:text-white">Entraînement</Link><span className="text-[#365477]">/</span><span className="text-[10px] text-[#a6bed8]">React Lab</span></div><h1 className="mt-3 flex items-center gap-3 text-[26px] font-semibold tracking-[-.05em] text-white"><Code2 size={24} className="shrink-0 text-[#65adff]" /> <span>Écris. Exécute. Corrige.</span></h1><p className="mt-1.5 max-w-[62ch] text-[12px] text-[#8ca6c2]">Un vrai bac à sable React dans le navigateur : modifie le JSX, lance le rendu et valide les comportements attendus.</p></div><div className="flex shrink-0 items-center gap-2"><Badge tone={runtimeError ? 'red' : snapshot ? 'green' : 'blue'}>{runtimeError ? 'Erreur de rendu' : snapshot ? 'Rendu valide' : 'Prêt à exécuter'}</Badge><Badge tone="slate"><TimerReset size={11} /> {timer.formatted}</Badge></div></div><div className="grid gap-3 md:grid-cols-3">{labChallengeIds.map((challengeId) => { const challenge = challenges.find((item) => item.id === challengeId); if (!challenge) return null; return <button type="button" key={challengeId} onClick={() => selectChallenge(challengeId)} className={`focus-ring surface-panel-flat min-h-11 rounded-[9px] p-3 text-left transition-all active:translate-y-px ${selectedId === challengeId ? 'border-[#4a98ed] bg-[#143557]' : 'hover:border-[#3d678d]'}`}><div className="flex items-center justify-between"><span className="grid h-8 w-8 place-items-center rounded-[6px] bg-[#173a61] text-[#72b6ff]"><FileCode2 size={16} /></span>{getChallengeStatus(challengeId) === 'completed' ? <CheckCircle2 size={15} className="text-[#5bd2af]" /> : <DifficultyBadge difficulty={challenge.difficulty} />}</div><p className="mt-3 text-[12px] font-semibold text-[#edf4fc]">{challenge.title}</p><p className="mt-1 text-[10px] leading-4 text-[#819db8]">{challenge.estimatedMinutes} min · {challenge.xp} XP</p></button> })}</div><div className="grid min-w-0 gap-4 xl:grid-cols-[1.15fr_.85fr]"><Panel className="min-w-0 overflow-hidden"><div className="flex flex-wrap items-center justify-between gap-3 border-b thin-rule px-4 py-3"><div><p className="text-[11px] font-semibold text-[#e9f2fc]">App.jsx</p><p className="mt-0.5 text-[10px] text-[#7795b2]">Écris ton composant sans quitter CodeArena.</p></div><div className="flex flex-wrap items-center gap-2"><button type="button" onClick={resetDraft} className="focus-ring inline-flex min-h-10 items-center gap-1 rounded-[5px] px-2 py-1 text-[10px] text-[#89a5c0] hover:bg-[#172f4a] hover:text-white sm:min-h-0"><RotateCcw size={12} /> Repartir du starter</button><button type="button" onClick={saveDraft} className="focus-ring inline-flex min-h-10 items-center gap-1 rounded-[5px] px-2 py-1 text-[10px] text-[#89bfff] hover:bg-[#172f4a] sm:min-h-0"> <Save size={12} /> {saved ? 'Brouillon sauvegardé' : 'Sauvegarder'}</button></div></div><div className="bg-[#081522] p-3"><textarea value={code} onChange={(event) => { setCode(event.target.value); setSaved(false) }} onKeyDown={handleTab} spellCheck={false} aria-label="Code source App.jsx" className="ios-code-editor focus-ring min-h-[420px] w-full resize-y overflow-auto rounded-[7px] border border-[#244663] bg-[#07111d] p-4 font-mono text-[12px] leading-6 text-[#c9def2] caret-[#73b8ff] outline-none placeholder:text-[#5e7f9d] sm:min-h-[520px]" /><div className="mt-3 flex flex-wrap items-center justify-between gap-3"><span className="text-[10px] text-[#6f8da9]">{code.split('\n').length} lignes · Tab insère deux espaces</span><Button onClick={run}><Play size={14} fill="currentColor" /> Exécuter le code</Button></div></div></Panel><div className="min-w-0 space-y-4"><Panel title="Aperçu navigateur" action={<span className="inline-flex items-center gap-1 text-[10px] text-[#6b9ed0]"><ExternalLink size={11} /> iframe isolée</span>}><div className="overflow-hidden rounded-b-[10px] bg-[#07111c]"><iframe key={runVersion} ref={iframeRef} title="Aperçu de l’application React" sandbox="allow-scripts" srcDoc={buildPreviewDocument(submittedCode, submittedCss)} className="react-preview-frame h-[360px] w-full border-0 sm:h-[430px]" /></div></Panel><Panel title="Vérifications"><div className="space-y-2 p-4">{tests.map((test) => <div key={test.label} className="flex items-center gap-2 text-[11px]">{test.passed ? <CheckCircle2 size={15} className="text-[#58d3b0]" /> : <XCircle size={15} className="text-[#7895b2]" />}<span className={test.passed ? 'text-[#cfe9df]' : 'text-[#8da8c0]'}>{test.label}</span></div>)}<div className="mt-4 border-t thin-rule pt-3"><ProgressBar value={(tests.filter((test) => test.passed).length / tests.length) * 100} color="#4acbaa" /><div className="mt-2 flex items-center justify-between text-[10px] text-[#7896b2]"><span>{tests.filter((test) => test.passed).length} / {tests.length} vérifications</span><span>{selectedChallenge.xp} XP à gagner</span></div></div>{runtimeError ? <div role="alert" className="mt-4 flex gap-2 rounded-[6px] border border-[#814454] bg-[#3b202e] p-3 text-[10px] leading-4 text-[#ffb0bb]"><AlertTriangle size={14} className="mt-0.5 shrink-0" /><span>{runtimeError}</span></div> : null}{completed ? <div className="mt-4 flex items-center gap-2 rounded-[6px] border border-[#26735f] bg-[#103b37] p-3 text-[10px] text-[#8ae4c8]"><Check size={14} /> Challenge validé et progression enregistrée.</div> : <Button className="mt-4 w-full" disabled={!allTestsPassed} onClick={complete}><Zap size={14} /> Valider l’entraînement</Button>}</div></Panel><Panel title="Console"><div className="flex items-center gap-2 p-4 text-[10px] text-[#7897b2]"><Terminal size={14} className="text-[#69adff]" /> {runtimeError ? 'La console a signalé une erreur. Corrige le code puis relance.' : snapshot ? 'Rendu exécuté sans erreur.' : 'Lance le code pour observer le résultat.'}</div></Panel></div></div></div>
}
