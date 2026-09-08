# CodeArena

CodeArena est un espace personnel d’entraînement au développement web, pensé pour préparer les épreuves WorldSkills Web Development.

L’application est en français, fonctionne sans compte et conserve la progression uniquement dans le navigateur. Elle aide à choisir un axe de travail, écrire du code, pratiquer dans un environnement chronométré et suivre son niveau réel.

## Ce qui est inclus

- onboarding en deux étapes avec nom, axe de départ et niveau initial ;
- tutoriel guidé rejouable pour comprendre le tableau de bord, l’entraînement et la progression ;
- tableau de bord sans statistiques inventées ;
- bibliothèque de challenges React, JavaScript, CSS, HTML, accessibilité et fondamentaux du web ;
- React Lab avec éditeur `App.jsx`, aperçu React isolé dans le navigateur, vérifications, erreurs de rendu et brouillons locaux ;
- minuteurs de session, XP, niveaux, séries, scores et progression par compétence ;
- mode compétition WorldSkills ;
- export et import JSON des données locales.

## Stack

- React + TypeScript
- TanStack Start et TanStack Router
- Vite
- Tailwind CSS v4
- Lucide React
- Zod
- `localStorage` versionné pour les données locales

## Démarrer en local

Pré-requis : Node.js 20 ou supérieur.

```bash
npm install
npm run dev
```

L’application est ensuite disponible sur [http://127.0.0.1:3000](http://127.0.0.1:3000).

## Scripts

```bash
npm run dev       # serveur de développement
npm run typecheck # vérification TypeScript
npm run build     # build client et serveur
```

## Parcours principaux

| Espace | Route | Rôle |
| --- | --- | --- |
| Tableau de bord | `/` | Voir le niveau, la prochaine action et l’historique |
| Entraînement | `/practice` | Choisir un axe et un challenge |
| React Lab | `/practice/react` | Écrire et exécuter du React dans le navigateur |
| Challenges | `/challenges` | Parcourir la bibliothèque d’exercices |
| Compétition | `/competition` | Simuler une session WorldSkills chronométrée |
| Progression | `/progress` | Lire les scores, séries et compétences |
| Ressources | `/resources` | Consulter la bibliothèque de référence |
| Paramètres | `/settings` | Gérer les préférences, le tutoriel et les données |

## Données et confidentialité

CodeArena ne possède pas de backend dans cette version. Le profil, les sessions, les scores, les brouillons React et les préférences sont enregistrés dans le `localStorage` du navigateur. L’export JSON permet de conserver ou déplacer ces données.

Le React Lab charge React, ReactDOM et Babel Standalone dans son iframe d’aperçu pour compiler le JSX directement dans le navigateur. Le code utilisateur reste dans l’espace de travail local et n’est pas envoyé à un service CodeArena.

## Déploiement Vercel

Le projet est compatible avec un déploiement Vercel connecté au dépôt GitHub. Utiliser les réglages suivants :

- Framework preset : `Vite` ou détection automatique ;
- Install command : `npm install` ;
- Build command : `npm run build` ;
- aucune variable d’environnement n’est requise pour cette version ;
- ajouter le domaine personnalisé uniquement après avoir confirmé le domaine exact et ses droits DNS.

Le domaine `*.vercel.app` fourni par Vercel peut servir de première URL de validation avant de brancher un domaine personnalisé.

## Licence

Projet personnel d’entraînement. La licence et les conditions de redistribution restent à définir avant une diffusion externe.
