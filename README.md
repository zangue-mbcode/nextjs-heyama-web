# Heyama Web - Frontend Next.js

Application web moderne et élégante pour la gestion d'objets avec synchronisation temps réel via Socket.IO.

## 🎯 Aperçu

Heyama Web est un frontend Next.js 14+ qui communique avec une API REST et reçoit des mises à jour en temps réel. L'application offre une expérience utilisateur fluide et moderne avec un design minimaliste inspiré de Vercel et Linear.

### Caractéristiques principales

- ✨ Design moderne et minimaliste
- 🔄 Synchronisation temps réel avec Socket.IO
- 📱 Responsive sur tous les appareils
- ⚡ Performance optimisée avec Next.js
- 🎨 UI Components personnalisés avec shadcn/ui
- 📝 Validation de formulaires avec React Hook Form + Zod
- 🔔 Notifications toast avec Sonner
- 📸 Upload d'images avec drag & drop
- 🌐 Support multilingue (français)

## 🚀 Démarrage rapide

### Prérequis

- Node.js 18+ et npm/yarn
- L'API Heyama en cours d'exécution (`https://nestjs-heyama-api-test.onrender.com`)

### Installation

1. Clonez le projet et naviguez vers le dossier:

```bash
cd nextjs-heyama-web
```

2. Installez les dépendances:

```bash
npm install
```

3. Configurez les variables d'environnement:

```bash
cp .env.example .env.local
```

4. Vérifiez que `.env.local` contient:

```env
NEXT_PUBLIC_API_URL=https://nestjs-heyama-api-test.onrender.com
NEXT_PUBLIC_SOCKET_URL=https://nestjs-heyama-api-test.onrender.com
```

5. Lancez le serveur de développement:

```bash
npm run dev
```

L'application est accessible à `https://nestjs-heyama-api-test.onrender.com`

## 📦 Structure du projet

```
heyama-web/
├── app/                          # App Router Next.js
│   ├── layout.tsx               # Layout racine avec Toaster
│   ├── page.tsx                 # Page d'accueil
│   ├── globals.css              # Styles globaux
│   └── objects/
│       └── [id]/
│           └── page.tsx         # Page détails d'un objet
├── components/
│   ├── ui/                      # Composants shadcn/ui
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── badge.tsx
│   │   ├── skeleton.tsx
│   │   └── dialog.tsx
│   ├── object-card.tsx          # Carte d'objet
│   ├── object-list.tsx          # Liste des objets
│   ├── create-object-dialog.tsx # Dialog de création
│   ├── delete-confirmation-dialog.tsx # Dialog de suppression
│   └── image-upload.tsx         # Upload d'image avec drag & drop
├── hooks/
│   ├── use-objects.ts           # Hook pour gérer les objets
│   ├── use-socket.ts            # Hook pour Socket.IO
│   └── use-toast.ts             # Hook pour notifications
├── lib/
│   ├── api.ts                   # Client API
│   ├── socket.ts                # Configuration Socket.IO
│   ├── utils.ts                 # Utilitaires
│   └── validations.ts           # Schémas Zod
├── public/                      # Assets statiques
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── README.md
```

## 🎨 Design System

### Palette de couleurs

- **Primaire**: Bleu moderne (#4338ca / 221.2° 83.2% 53.3%)
- **Secondaire**: Gris clair (#f3f4f6 / 210° 40% 96.1%)
- **Destructive**: Rouge (#ef4444 / 0° 84.2% 60.2%)
- **Muted**: Gris moyen (#9ca3af / 215.4° 16.3% 46.9%)
- **Background**: Blanc (#ffffff / 0° 0% 100%)
- **Foreground**: Noir (#0f172a / 222.2° 84% 4.9%)

### Typographie

- **Police**: Geist, Inter
- **Spacing**: Système de spacing Tailwind généreux
- **Bordures**: Arrondies (rounded-lg, rounded-xl)
- **Ombres**: Subtiles et douces

## 🔧 Configuration

### Variables d'environnement

```env
# URL de l'API backend
NEXT_PUBLIC_API_URL=https://nestjs-heyama-api-test.onrender.com

# URL de Socket.IO (peut être identique à l'API)
NEXT_PUBLIC_SOCKET_URL=https://nestjs-heyama-api-test.onrender.com
```

### Tailwind Configuration

La configuration utilise des CSS variables pour le theming:

```css
--background: 0 0% 100%;
--foreground: 222.2 84% 4.9%;
--primary: 221.2 83.2% 53.3%;
--border: 214.3 31.8% 91.4%;
/* ... etc */
```

## 📱 Fonctionnalités

### Page d'accueil (`/`)

- Liste responsive des objets (1-3 colonnes selon l'écran)
- Grille d'objets avec images optimisées
- État de chargement avec skeletons
- État vide avec message encourageant
- Button pour créer un nouvel objet

### Création d'objet

- Dialog modal centré
- Formulaire avec validation temps réel
- Champs: Titre, Description, Image
- Upload d'image avec drag & drop
- Prévisualisation de l'image
- Validation Zod côté client
- Toast de succès/erreur

### Page détails (`/objects/[id]`)

- Image grande en vedette
- Titre et description complètes
- Métadonnées (dates de création/modification)
- Bouton de suppression avec confirmation
- Gestion d'erreur 404
- Navigation fluide

### Synchronisation temps réel

Événements Socket.IO écoutés:

- `objectCreated`: Ajoute un nouvel objet à la liste
- `objectDeleted`: Retire un objet de la liste

Chaque événement affiche un toast discret.

## 🎯 Composants clés

### ObjectCard

Affiche un objet en format carte:

```tsx
<ObjectCard object={heyamaObject} />
```

- Image avec effet hover
- Titre et description tronqués
- Date de création relative
- Lien vers les détails

### ObjectList

Liste responsive d'objets:

```tsx
<ObjectList objects={objects} loading={isLoading} />
```

- Support des états de chargement
- État vide personnalisé
- Grille responsive

### CreateObjectDialog

Dialog pour créer un objet:

```tsx
<CreateObjectDialog onSuccess={() => refetch()} />
```

- Validation complète
- Upload d'image
- Gestion des erreurs

### ImageUpload

Composant pour télécharger une image:

```tsx
<ImageUpload onImageSelect={setFile} />
```

- Drag & drop
- Aperçu de l'image
- Validation du type et taille

## 🪝 Hooks personnalisés

### useObjects()

Gère l'état et les opérations sur les objets:

```typescript
const { objects, loading, error, fetchObjects, addObject, removeObject } = useObjects()
```

- Fetch initial
- Écoute des événements Socket.IO
- Intégration avec Sonner pour les toasts

### useSocket()

Initialise et retourne la connexion Socket.IO:

```typescript
const socket = useSocket()
```

- Connexion lazy
- Reconnexion automatique

### useToast()

Wrapper autour de Sonner:

```typescript
const { toast } = useToast()
toast({ title: 'Succès', description: '...' })
```

## 🔌 API Client

Module `lib/api.ts` avec les endpoints:

```typescript
// Récupérer tous les objets
const objects = await objectsApi.getAll()

// Récupérer un objet par ID
const object = await objectsApi.getById(id)

// Créer un objet
const newObject = await objectsApi.create({ title, description, imageUrl })

// Supprimer un objet
await objectsApi.delete(id)

// Upload une image
const imageUrl = await objectsApi.uploadImage(file)
```

## 🎬 Animations

- **Fade-in**: Animation d'apparition douce
- **Slide-up**: Animation de montée subtile
- **Hover**: Effets au survol des cartes
- **Skeleton**: Animation de chargement

## ♿ Accessibilité

- Labels sur tous les formulaires
- Navigation clavier complète
- ARIA labels appropriés
- Contraste de couleurs suffisant
- Feedback visuel sur les interactions

## 📊 Performance

- Images optimisées avec Next.js Image
- Code splitting automatique
- Lazy loading des composants
- Optimisation du rendu React
- Cache des requêtes API

## 🧪 Commandes utiles

```bash
# Développement
npm run dev

# Build production
npm run build

# Lancer la version production
npm start

# Linting
npm run lint

# Formatting
npm run format
```

## 🔗 Stack technologique

| Technologie | Version | Usage |
|---|---|---|
| **Next.js** | 14+ | Framework React |
| **React** | 19 | UI Library |
| **TypeScript** | 5.3+ | Type-safe development |
| **Tailwind CSS** | 3.4+ | Styling |
| **shadcn/ui** | Latest | UI Components |
| **Socket.IO Client** | 4.7+ | Real-time updates |
| **React Hook Form** | 7.51+ | Form management |
| **Zod** | 3.22+ | Validation |
| **Sonner** | 1.3+ | Toast notifications |
| **Axios** | 1.7+ | HTTP Client |
| **Lucide React** | 0.378+ | Icons |
| **Framer Motion** | 10+ | Animations |

## 📝 Conventions de code

### Composants

```typescript
'use client'  // Si client-side

import { useState } from 'react'
import { Component } from '@/components/...'

export function MyComponent() {
  const [state, setState] = useState()

  return (
    <div>
      {/* JSX */}
    </div>
  )
}
```

### Naming

- Composants: `PascalCase` (ObjectCard.tsx)
- Hooks: `useXxx` (useObjects.ts)
- Fonctions utilitaires: `camelCase` (formatDate)
- Constantes: `UPPER_SNAKE_CASE`

### Imports

```typescript
// Externe
import { useState } from 'react'
import { Card } from '@/components/ui/card'

// Interne
import { useObjects } from '@/hooks/use-objects'
import { formatDate } from '@/lib/utils'
```

## 🐛 Troubleshooting

### La connexion Socket.IO échoue

- Vérifiez que l'API est en cours d'exécution
- Vérifiez `NEXT_PUBLIC_SOCKET_URL` dans `.env.local`
- Vérifiez la console du navigateur pour les erreurs

### Les images ne s'affichent pas

- Vérifiez que les URLs S3 sont valides
- Vérifiez `next.config.js` pour les domaines autorisés
- Vérifiez que les images sont accessibles publiquement

### Erreurs de validation de formulaire

- Vérifiez les messages d'erreur dans le formulaire
- Vérifiez `lib/validations.ts` pour les schémas
- Vérifiez la console pour les erreurs détaillées

## 📄 Licence

Projet créé pour le test technique Heyama.

## 👥 Support

Pour des questions ou problèmes, consultez la documentation de Next.js:
- [Next.js Docs](https://nextjs.org/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)

---

Créé avec ✨ pour l'excellence. Heyama © 2024
