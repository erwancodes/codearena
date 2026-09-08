# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Delegated in the brief: TanStack Start, React, TypeScript, TanStack Router, Tailwind CSS, shadcn/ui, Lucide React, Zod, and localStorage for the MVP. No backend.

## Users

One primary user: Erwan, a web-development competitor preparing for WorldSkills Web Development. He uses the app repeatedly during personal training sessions on desktop, laptop, tablet, and mobile.

## Product Purpose

CodeArena is a personal training workspace for practising React, JavaScript, CSS, HTML, accessibility, web fundamentals, debugging, and UI rebuilding. It turns short practice sessions and timed simulations into visible skill progression, XP, streaks, scores, and next-step recommendations.

Success means the user can open the app, choose a useful exercise, start quickly, complete or score it, and understand what to train next without an account or cloud setup.

## Positioning

The product combines a personal challenge library, competition-style timers, and local progression into one WorldSkills-focused training loop. It is deliberately individual, offline-friendly, and practice-first rather than social or AI-assisted.

## Operating Context

The main workflow is: open the dashboard, continue or choose a challenge, start a practice timer, complete or score the work, then review progression and weak skills. Competition mode simulates fixed-duration WorldSkills constraints and can disable hints, solutions, AI help, explanations, and correction until the end.

## Capabilities and Constraints

- Dashboard at `/` with welcome, progress, recommendation, continuation, and weakest skills.
- Practice, challenges, challenge detail, competition, progress, resources, and settings routes.
- At least twenty seeded challenges across React, JavaScript, CSS, HTML, accessibility, web fundamentals, debug, and UI rebuild.
- Challenge difficulty: Beginner, Intermediate, Advanced, WorldSkills.
- Challenge completion captures difficulty feeling, score, and optional notes.
- Random challenge selection considers difficulty, category, weak skills, and incomplete work.
- XP, levels, streaks, training sessions, skill scores, competition results, timer persistence, and JSON export/import are MVP requirements.
- Progress and settings data are local only, behind a dedicated storage layer and versioned keys; components must not call localStorage directly.
- No authentication, backend, database, payment, social, global leaderboard, AI, Monaco editor, multiplayer, or cloud sync in the MVP.
- The architecture should allow storage and editor implementations to be replaced later.
- Facts, scores, and examples shown in the initial product are illustrative seeded training data, not external claims.

## Brand Commitments

The name is CodeArena. The product line is “Train. Build. Compete.” The tone is sober, motivating, and concrete. The supplied reference image commits the app to a dark, modern, developer-oriented training cockpit with a blue primary accent, high legibility, restrained borders, and compact but breathable dashboard density. The product brief explicitly rejects gamer-cliché neon, excessive gradients, and glow.

## Evidence on Hand

- Product requirements: `C:\Users\proer\.codex\attachments\580a08b0-b108-4069-ac12-78f43d5f6cf7\pasted-text.txt`.
- Visual reference: `C:\Users\proer\AppData\Local\Temp\codex-clipboard-086e4556-3d0f-4086-a08d-65ae76f4f7ce.png`.
- No incumbent source code, design system, backend, user data, or production content exists in the repository yet.

## Product Principles

- Start a useful training session in a few clicks.
- Make progress legible without turning practice into noise.
- Rehearse competition constraints honestly.
- Keep personal data local and portable.
- Prefer clear, reusable fundamentals over feature theatre.

## Accessibility & Inclusion

The product must remain keyboard navigable, use semantic HTML and labelled controls, keep focus visible, preserve readable contrast in its dark theme, and support responsive use from desktop through mobile. Accessibility itself is a first-class training domain and must be represented in the challenge library.
