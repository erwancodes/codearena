# CodeArena Design System

CodeArena is an Operate-mode training cockpit for one WorldSkills web developer. Its visual authority is the supplied CodeArena reference image, translated into a calm evidence-first mission board: the next action and the evidence behind it share the same frame.

## World

- Ground: deep navy `#08111f` with a restrained radial field; no pure black.
- Surfaces: navy-blue inset panels with 1px blue-gray rules and a single soft depth shadow.
- Primary signal: cobalt blue for actions, active navigation, and focus.
- Secondary signals: cyan/teal for healthy progress, amber for XP and time, purple for accessibility, red for WorldSkills or destructive states.
- Material: technical control room, not cyberpunk; no neon haze, no decorative gradients, no glass for its own sake.

## Type

The UI uses a compact system sans stack with tight, high-contrast headings and small uppercase utility labels. Numbers, timers, scores, and XP use monospace to read as measurement. Body copy stays short, concrete, and muted against the navy surfaces.

## Composition

The desktop shell is a fixed 224px navigation rail, a compact utility header, and a max-width content field. Pages lead with the current task, then move through evidence: stats, continuation, recommendations, checklists, and history. Panels have 8–10px corners and only exist when they group a real task or state. On mobile, the rail collapses to a bottom navigation and grids become one-column flows.

## Components

Primary components: `AppShell`, `Panel`, `Badge`, `DifficultyBadge`, `Button`, `StatCard`, `ProgressBar`, `ChallengeCard`, `ChallengeDetail`, `CompetitionView`, and `SettingsView`. Interactive actions provide hover, active, focus, loading/timer, empty, and error states. Icons come from Lucide React with a consistent thin stroke.

## Motion

Motion is functional and quiet: panels reveal once, buttons press on activation, the streak/status dot breathes, progress bars fill, and timers update as live measurement. Reduced-motion users get the same information with animation removed.

## Contract

The shipped build follows the “Evidence-first mission board” grounded direction (candidate 7) and the assigned concept seeds `3e76e139` for the surface and `19f0a327` for the direction. The first viewport puts dashboard proof beside the next training action; every route inherits the same task-control grammar.
