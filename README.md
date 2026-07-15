🍑 L'abricot - Application de gestion de projets SaaS
L'abricot est une application de gestion de tâches collaborative permettant aux utilisateurs de créer, suivre et organiser leurs projets en équipe à travers une interface intuitive.
Ce projet a été développé dans le cadre de ma formation de Développeur Full-Stack chez OpenClassrooms.

🛠 Technologies utilisées
Frontend : Next.js, React, TypeScript, TailwindCSS, CSS Modules.

Backend : Node.js, Express, Prisma (ORM), TypeScript.

Architecture : Application SaaS avec authentification JWT et gestion de rôles.

🚀 Mode d'emploi : Lancement du projet en local
Ce projet est composé de deux parties distinctes qui doivent fonctionner simultanément :

Le Backend (L'API qui gère la base de données).

Le Frontend (L'interface Next.js de ce dépôt).

Voici la procédure pour tout lancer avec deux terminaux.

ÉTAPE 1 : Lancer le Backend (API)
Ouvrez un premier terminal.

Naviguez jusqu'au dossier de votre backend.

Installez les dépendances : npm install

Configurez vos variables d'environnement (voir .env.example).

Démarrez le serveur : npm run dev

Note : Le serveur doit être actif sur le port 8000.

ÉTAPE 2 : Lancer le Frontend
Ouvrez un deuxième terminal (ne fermez pas celui du backend).

Naviguez jusqu'au dossier racine de ce projet : labricot-frontend.

Créez votre fichier d'environnement : cp .env.example .env.local

Configurez le fichier .env.local avec l'URL de votre API : NEXT_PUBLIC_API_URL=http://localhost:8000

Installez les dépendances : npm install

Lancez le serveur : npm run dev

ÉTAPE 3 : Accéder à l'application
Ouvrez votre navigateur web.

Allez à l'adresse fournie par le terminal du frontend (généralement http://localhost:3000).

📋 Fonctionnalités implémentées
Gestion complète du CRUD : Création, lecture, modification et suppression de tâches.

Assignation dynamique : Système permettant d'assigner des membres réels du projet à une tâche.

Sécurité : Vérification des droits d'accès aux projets via middleware (Auth).

Interface : Design responsive et moderne.

Développé par Etienne ESPIN