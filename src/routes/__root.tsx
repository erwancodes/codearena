import type { ReactNode } from 'react'
import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'
import { AppProvider } from '@/components/app-provider'
import { AppShell } from '@/components/layout/AppShell'
import '@/styles.css'

export const Route = createRootRoute({
  head: () => ({ meta: [{ charSet: 'utf-8' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { title: 'CodeArena — Entraîne-toi. Construis. Compète.' }, { name: 'description', content: 'Ton espace personnel d’entraînement au développement web pour WorldSkills.' }] }),
  component: RootComponent,
})

function RootComponent() {
  return <RootDocument><Outlet /></RootDocument>
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  const directionContract = '<!-- THESIS: CodeArena is a living competition desk, not a generic dashboard; it puts the next training decision beside the evidence that makes it credible. OWN-WORLD: deep navy surfaces, cobalt task bands, restrained cyan/amber signals, thin technical rules, compact grotesk UI, and softly inset panels. STORY: Erwan sees his current edge, chooses a useful block, and returns with progress recorded locally. FIRST VIEWPORT: fixed left navigation, compact top utility bar, welcome/next-action band, five training signals, then a split continuation and recommendation field. FORM: Evidence-first mission board, candidate 7 grounded direction, surface seed 3e76e139, direction seed 19f0a327. FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, and DESIGN.md -->'
  return <html lang="fr"><head><HeadContent /></head><body><noscript dangerouslySetInnerHTML={{ __html: directionContract }} /><AppProvider><AppShell>{children}</AppShell></AppProvider><Scripts /></body></html>
}
