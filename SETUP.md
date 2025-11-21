# 🚀 Guide de configuration - Heyama Web

Ce guide vous aide à configurer et lancer l'application Heyama Web.

## 📋 Prérequis

Avant de commencer, assurez-vous que vous avez:

- **Node.js** 18+ installé ([télécharger](https://nodejs.org/))
- **npm** ou **yarn** (inclus avec Node.js)
- **L'API Heyama** en cours d'exécution sur `http://localhost:3000`

Vérifiez votre version de Node.js:

```bash
node --version
npm --version
```

## 🔧 Installation étape par étape

### 1. Clonez ou téléchargez le projet

```bash
cd heyama-web
```

### 2. Installez les dépendances

```bash
npm install
```

Cela va:
- Télécharger tous les packages npm
- Installer Next.js, React, TypeScript, etc.
- Créer le dossier `node_modules`
- Générer `package-lock.json`

Attendez que l'installation soit complète. Cela peut prendre 2-5 minutes.

### 3. Configuration des variables d'environnement

Créez un fichier `.env.local` à la racine du projet:

```bash
# Copier le fichier d'exemple
cp .env.example .env.local
```

Ou créez manuellement `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_SOCKET_URL=http://localhost:3000
```

**Notes importantes:**
- Les variables commençant par `NEXT_PUBLIC_` sont exposées au client (navigateur)
- Assurez-vous que votre API est accessible à ces URLs
- En production, remplacez `localhost:3000` par l'URL réelle de votre API

### 4. Vérifiez que l'API est accessible

Avant de lancer l'app, testez l'API:

```bash
# Dans votre terminal
curl http://localhost:3000/objects

# Vous devriez obtenir une réponse JSON (vide ou avec des objets)
# Si vous avez une erreur, l'API n'est pas accessible
```

## ✅ Démarrage

### Mode développement

```bash
npm run dev
```

L'application est accessible à **http://localhost:3000**

Vous verrez:

```
> next dev

  ▲ Next.js 14.x.x
  - Local:        http://localhost:3000
  - Environments: .env.local
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### Mode production

Pour tester la version optimisée:

```bash
# Build
npm run build

# Start
npm start
```

## 📁 Structure des fichiers créés

Après l'installation, vous aurez:

```
heyama-web/
├── node_modules/          # Dépendances npm (ne pas commiter)
├── .next/                 # Cache Next.js (généré automatiquement)
├── app/                   # Pages de l'application
├── components/            # Composants React
├── hooks/                 # Hooks personnalisés
├── lib/                   # Logique partagée
├── public/                # Assets statiques
├── .env.local             # Variables d'environnement (local)
├── package.json           # Dépendances
├── tsconfig.json          # Configuration TypeScript
├── tailwind.config.ts     # Configuration Tailwind
├── next.config.js         # Configuration Next.js
└── README.md              # Documentation
```

## 🔍 Vérification de l'installation

Vérifiez que tout est correctement installé:

1. **Ouvrez http://localhost:3000** dans votre navigateur
2. Vous devez voir la page d'accueil avec "Heyama" en titre
3. Cliquez sur "Créer un objet" - un dialog doit s'ouvrir
4. Vérifiez la console du navigateur (F12) pour les erreurs

Si vous voyez des erreurs:

### Erreur: "ECONNREFUSED 127.0.0.1:3000"

```
⚠️ L'API n'est pas accessible
✅ Solution: Lancez l'API en premier
  - Ouvrez un nouveau terminal
  - Allez dans nestjs-heyama-api
  - Lancez: npm run start
```

### Erreur: "Module not found"

```
⚠️ Les dépendances ne sont pas installées
✅ Solution:
  - Supprimez node_modules: rm -r node_modules
  - Réinstallez: npm install
```

### Erreur: "Port 3000 already in use"

```
⚠️ Le port 3000 est déjà utilisé
✅ Solution:
  - Tuez le processus: lsof -i :3000 | kill -9 <PID>
  - Ou lancez sur un autre port: npm run dev -- -p 3000
```

## 🎯 Utilisation de l'application

### Créer un objet

1. Cliquez sur le bouton **"Créer un objet"**
2. Remplissez le formulaire:
   - **Titre**: Ex: "Magnifique paysage"
   - **Description**: Ex: "Une belle photo prise lors de mes vacances..."
   - **Image**: Glissez-déposez une image ou cliquez pour sélectionner
3. Cliquez **"Créer"**
4. Une notification confirmera la création
5. L'objet apparaît dans la liste

### Voir les détails

1. Cliquez sur une carte d'objet
2. Vous êtes redirigé vers la page de détails
3. Voyez l'image en grand, le titre et la description complète
4. Voyez les dates de création/modification

### Supprimer un objet

1. Sur la page de détails, cliquez **"Supprimer"**
2. Confirmez la suppression dans le dialog
3. L'objet est supprimé
4. Vous êtes redirigé vers la liste

## 🔄 Synchronisation temps réel

L'application synchronise automatiquement via Socket.IO:

- ✅ Les nouveaux objets apparaissent immédiatement dans la liste
- ✅ Les objets supprimés disparaissent immédiatement
- ✅ Les utilisateurs sont notifiés des changements

## 🛠️ Commandes utiles

```bash
# Développement
npm run dev           # Lance le serveur de développement

# Production
npm run build         # Build pour production
npm start            # Lance la version production

# Code quality
npm run lint         # Vérifie la qualité du code
npm run format       # Formate le code avec Prettier
```

## 🐛 Debugging

### Console du navigateur (F12)

Ouvrez la console pour voir:
- Les erreurs JavaScript
- Les logs de connexion Socket.IO
- Les requêtes API en Network tab

### Logs Backend

Vérifiez la console de l'API pour voir:
- Les requêtes reçues
- Les connexions Socket.IO
- Les erreurs serveur

### React DevTools

Installez l'extension [React DevTools](https://react-devtools-tutorial.vercel.app/):

```bash
# Chrome: https://chrome.google.com/webstore
# Firefox: https://addons.mozilla.org/
```

## 📝 Fichiers de configuration expliqués

### .env.local

Variables d'environnement locales. **Ne pas commiter!**

```env
# L'URL de l'API backend
NEXT_PUBLIC_API_URL=http://localhost:3000

# L'URL de Socket.IO (peut être identique)
NEXT_PUBLIC_SOCKET_URL=http://localhost:3000
```

### package.json

Déclare les dépendances et scripts:

```json
{
  "scripts": {
    "dev": "next dev",      // Développement
    "build": "next build",  // Build production
    "start": "next start"   // Production
  },
  "dependencies": {
    "react": "^19.0.0",
    "next": "^14.2.0",
    // ... autres dépendances
  }
}
```

### tsconfig.json

Configuration TypeScript:

```json
{
  "compilerOptions": {
    "strict": true,           // Mode strict
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]        // Import avec @/
    }
  }
}
```

### next.config.js

Configuration Next.js:

```javascript
{
  images: {
    remotePatterns: [
      // Patterns d'URLs autorisées pour les images
    ]
  }
}
```

### tailwind.config.ts

Configuration Tailwind CSS:

```typescript
{
  theme: {
    colors: {
      primary: "...",    // Couleur primaire
      // ... autres couleurs
    }
  }
}
```

## 🌐 Déploiement

### Vercel (recommandé pour Next.js)

```bash
# 1. Installez Vercel CLI
npm i -g vercel

# 2. Déployez
vercel

# 3. Configurez les variables d'environnement dans le dashboard Vercel
NEXT_PUBLIC_API_URL=https://api.heyama.com
NEXT_PUBLIC_SOCKET_URL=https://api.heyama.com
```

### Autres hébergeurs

L'application peut être déployée sur n'importe quel hébergeur supportant Node.js:
- Heroku
- Railway
- Fly.io
- Digital Ocean
- AWS

Commande de build générelle:

```bash
npm run build
npm start
```

## ❓ FAQ

### Comment changer la URL de l'API?

Modifiez `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://votre-api.com
NEXT_PUBLIC_SOCKET_URL=https://votre-api.com
```

Redémarrez le serveur de développement.

### Comment ajouter une nouvelle page?

Créez un fichier dans `app/`:

```
app/
├── page.tsx              # / (accueil)
├── about/
│   └── page.tsx          # /about
└── objects/
    └── [id]/
        └── page.tsx      # /objects/123
```

### Comment ajouter un nouveau composant?

Créez un fichier dans `components/`:

```typescript
// components/my-component.tsx
export function MyComponent() {
  return <div>Mon composant</div>
}
```

Importez-le:

```typescript
import { MyComponent } from '@/components/my-component'
```

### Pourquoi les images ne s'affichent pas?

1. Vérifiez que l'URL est valide
2. Vérifiez `next.config.js` pour le domaine autorisé
3. Vérifiez la console pour les erreurs CORS

## 📚 Ressources utiles

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Socket.IO Client](https://socket.io/docs/v4/client-api/)

## 🆘 Support

Si vous rencontrez des problèmes:

1. Vérifiez que l'API est en cours d'exécution
2. Vérifiez la console du navigateur (F12)
3. Vérifiez les logs du terminal
4. Redémarrez l'application (`Ctrl+C` puis `npm run dev`)
5. Supprimez `.next` et réinstallez les dépendances

---

Heyama © 2024 - Créé avec ✨ pour l'excellence
