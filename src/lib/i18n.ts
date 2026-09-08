import type { ChallengeCategory, ChallengeStatus, Difficulty } from '@/types/codearena'

export const difficultyLabels: Record<Difficulty, string> = {
  Beginner: 'Débutant',
  Intermediate: 'Intermédiaire',
  Advanced: 'Avancé',
  WorldSkills: 'WorldSkills',
}

export const categoryLabels: Record<ChallengeCategory, string> = {
  React: 'React',
  JavaScript: 'JavaScript',
  CSS: 'CSS',
  HTML: 'HTML',
  Accessibility: 'Accessibilité',
  'Web fundamentals': 'Fondamentaux du web',
  Debug: 'Débogage',
  'UI rebuild': 'Reproduction UI',
}

export const skillLabels: Record<string, string> = {
  React: 'React',
  JavaScript: 'JavaScript',
  CSS: 'CSS',
  HTML: 'HTML',
  Accessibility: 'Accessibilité',
  'Web fundamentals': 'Fondamentaux du web',
}

export const statusLabels: Record<ChallengeStatus, string> = {
  'not-started': 'À commencer',
  'in-progress': 'En cours',
  completed: 'Terminé',
}

export const challengeTranslations: Record<string, { title: string; description: string; requirements: string[]; bonus?: string[] }> = {
  'searchable-user-list': { title: 'Liste d’utilisateurs filtrable', description: 'Construis une liste d’utilisateurs filtrable avec un état vide clair.', requirements: ['Créer des composants réutilisables', 'Utiliser un champ de recherche contrôlé', 'Filtrer les utilisateurs par nom et e-mail', 'Gérer l’état vide', 'Garder une mise en page responsive'], bonus: ['Navigation au clavier', 'Surligner les résultats correspondants'] },
  'todo-app': { title: 'Application de tâches', description: 'Livre un gestionnaire de tâches avec persistance locale et états explicites.', requirements: ['Ajouter, terminer et supprimer des tâches', 'Découper l’interface en composants ciblés', 'Persister la liste localement', 'Afficher un état vide utile'], bonus: ['Filtrer par statut', 'Annuler une suppression'] },
  'modal-component': { title: 'Composant de fenêtre modale', description: 'Crée une fenêtre modale réutilisable qui respecte le focus et la touche Échap.', requirements: ['Exposer un état d’ouverture contrôlé', 'Piéger le focus dans la fenêtre', 'Fermer avec Échap', 'Rendre le focus au déclencheur', 'Empêcher le défilement en arrière-plan'], bonus: ['Ajouter une variante de confirmation', 'Respecter la réduction des animations'] },
  'api-dashboard': { title: 'Tableau de bord API', description: 'Transforme un endpoint asynchrone en tableau de bord avec états de chargement et d’échec.', requirements: ['Récupérer et afficher les données distantes', 'Afficher un squelette de chargement', 'Gérer l’état d’erreur', 'Définir explicitement la forme des données', 'Ajouter une action pour réessayer'], bonus: ['Annuler les requêtes obsolètes', 'Ajouter un rafraîchissement optimiste'] },
  'multi-step-form': { title: 'Formulaire multi-étapes', description: 'Construis un parcours de formulaire robuste avec validation, récapitulatif et retour arrière.', requirements: ['Garder chaque étape focalisée', 'Valider avant de continuer', 'Conserver les réponses au retour arrière', 'Afficher les erreurs au niveau du champ', 'Fournir une étape de récapitulatif'], bonus: ['Annoncer les changements d’étape', 'Persister un brouillon'] },
  'react-debug-challenge': { title: 'Défi de débogage React', description: 'Trouve les erreurs subtiles d’état, de clés et d’effets qui bloquent une petite application.', requirements: ['Identifier la dépendance obsolète de l’effet', 'Corriger les clés de liste instables', 'Éviter la mutation directe de l’état', 'Expliquer la boucle de rendu', 'Rédiger une courte note de correction'], bonus: ['Repérer le rendu inutile', 'Ajouter un test de non-régression'] },
  'array-transformation': { title: 'Transformation de tableaux', description: 'Compose des utilitaires de tableaux prévisibles à partir d’un jeu de données désordonné.', requirements: ['Regrouper les entrées par catégorie', 'Trier sans muter l’entrée', 'Supprimer les identifiants en double', 'Retourner une forme de résultat stable'], bonus: ['Gérer les champs manquants', 'Expliquer la complexité'] },
  'debounce-function': { title: 'Fonction debounce', description: 'Implémente un utilitaire debounce réutilisable et rends son annulation explicite.', requirements: ['Retarder l’exécution jusqu’à l’inactivité', 'Conserver les derniers arguments', 'Conserver le contexte d’appel', 'Exposer l’annulation'], bonus: ['Exposer un flush', 'Documenter le comportement temporel'] },
  'fetch-api': { title: 'API Fetch', description: 'Consomme un endpoint de façon sûre et transforme le transport en états compréhensibles.', requirements: ['Vérifier le statut de la réponse', 'Parser le JSON correctement', 'Gérer les erreurs réseau', 'Garder un état en attente visible'], bonus: ['Ajouter l’annulation de requête', 'Réessayer une fois sur une erreur temporaire'] },
  'async-error-handling': { title: 'Gestion des erreurs asynchrones', description: 'Rends une séquence d’opérations asynchrones explicite en cas d’échec et récupérable.', requirements: ['Séparer les erreurs récupérables', 'Conserver la cause originale', 'Éviter les promesses avalées', 'Rendre la nouvelle tentative sûre'], bonus: ['Ajouter des logs structurés', 'Modéliser l’annulation'] },
  'responsive-dashboard': { title: 'Tableau de bord responsive', description: 'Transforme un tableau de bord dense en un parcours mobile calme et lisible.', requirements: ['Définir l’ordre de lecture mobile', 'Utiliser CSS Grid pour la structure', 'Éviter le débordement horizontal', 'Garder les actions accessibles'], bonus: ['Respecter la réduction des animations', 'Ajouter des container queries'] },
  'css-grid-gallery': { title: 'Galerie CSS Grid', description: 'Compose une galerie asymétrique qui reste lisible à chaque breakpoint.', requirements: ['Créer une grille non uniforme', 'Conserver les ratios d’image', 'Ajouter un focus visible au clavier', 'Passer sur une colonne sur petit écran'], bonus: ['Ajouter le réordonnancement', 'Utiliser subgrid'] },
  'animated-accordion': { title: 'Accordéon animé', description: 'Construis un accordéon avec un modèle de divulgation clair et une animation utile.', requirements: ['Utiliser un modèle de divulgation sémantique', 'Animer l’ouverture et la fermeture', 'Garder le focus visible', 'Respecter la réduction des animations'], bonus: ['Autoriser un seul panneau ouvert', 'Animer la hauteur sans saut de mise en page'] },
  'semantic-landing-page': { title: 'Page d’accueil sémantique', description: 'Donne à une page simple une structure de document et des repères significatifs.', requirements: ['Utiliser des repères pertinents', 'Garder une hiérarchie de titres logique', 'Étiqueter la navigation', 'Utiliser des boutons pour les actions'], bonus: ['Ajouter un lien d’évitement', 'Vérifier l’arbre d’accessibilité'] },
  'accessible-modal': { title: 'Fenêtre modale accessible', description: 'Construis une modale fiable pour les utilisateurs clavier et lecteurs d’écran.', requirements: ['Donner un nom accessible à la boîte de dialogue', 'Déplacer le focus dans la modale', 'Fermer avec Échap', 'Rendre le focus au déclencheur', 'Masquer le contenu d’arrière-plan inactif'], bonus: ['Annoncer les erreurs de validation', 'Tester avec un lecteur d’écran'] },
  'keyboard-navigation': { title: 'Navigation au clavier', description: 'Rends une palette d’actions compacte utilisable sans souris.', requirements: ['Définir un ordre de tabulation prévisible', 'Gérer les déplacements avec les flèches', 'Afficher clairement le focus', 'Éviter les pièges clavier'], bonus: ['Ajouter une recherche par saisie', 'Documenter les raccourcis'] },
  'rest-api-contract': { title: 'Contrat d’API REST', description: 'Lis un contrat d’API et conçois les états d’interface avant la requête.', requirements: ['Identifier la méthode et les statuts', 'Modéliser le succès et l’échec', 'Valider la forme de la réponse', 'Expliquer les implications du cache'], bonus: ['Concevoir un fallback hors ligne', 'Documenter la pagination'] },
  'browser-devtools-audit': { title: 'Audit des DevTools', description: 'Utilise les outils du navigateur pour isoler les défauts de layout, performance et accessibilité.', requirements: ['Localiser le décalage de mise en page', 'Trouver la ressource lente', 'Inspecter les styles calculés', 'Lancer un contrôle d’accessibilité', 'Rédiger une liste de corrections priorisée'], bonus: ['Enregistrer une trace de performance', 'Comparer avant et après'] },
  'ui-rebuild-dashboard': { title: 'Reproduction UI : tableau de bord', description: 'Reproduis un tableau de bord de référence sans perdre sa hiérarchie ni son rythme d’espacement.', requirements: ['Cartographier la hiérarchie visuelle', 'Recréer la structure responsive', 'Respecter le rythme d’espacement', 'Nommer les états interactifs', 'Garder l’implémentation accessible'], bonus: ['Ajouter une passe de comparaison visuelle', 'Documenter les compromis'] },
  'ui-rebuild-login': { title: 'Reproduction UI : écran de connexion', description: 'Transforme une référence visuelle en écran de connexion ciblé et navigable au clavier.', requirements: ['Respecter la composition de référence', 'Étiqueter correctement les champs', 'Gérer la validation', 'Fournir un état de chargement', 'Garder le CTA accessible sur mobile'], bonus: ['Ajouter l’affichage du mot de passe', 'Prendre en charge l’autoremplissage'] },
  'worldskills-full-stack': { title: 'Brief Web WorldSkills', description: 'Livre un frontend multi-vues soigné dans le cadre d’un brief de compétition fixe.', requirements: ['Planifier avant de coder', 'Créer un système de composants clair', 'Respecter les exigences responsive', 'Couvrir les bases de l’accessibilité', 'Tester le parcours final'], bonus: ['Ajouter une passe sur un second breakpoint', 'Rédiger une note de transmission'] },
}
