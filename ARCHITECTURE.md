# 🏗️ Architecture Heyama Web

## Aperçu global

```
┌─────────────────────────────────────────────────────────┐
│                    Browser / Client                      │
│  ┌──────────────────────────────────────────────────────┐
│  │              Next.js Application                      │
│  │  ┌──────────────────────────────────────────────┐    │
│  │  │            App Router (Pages)               │    │
│  │  │  • / (Homepage)                            │    │
│  │  │  • /objects/[id] (Details)                 │    │
│  │  └──────────────────────────────────────────────┘    │
│  │  ┌──────────────────────────────────────────────┐    │
│  │  │          React Components                   │    │
│  │  │  • ObjectCard, ObjectList                  │    │
│  │  │  • CreateObjectDialog                      │    │
│  │  │  • ImageUpload                             │    │
│  │  └──────────────────────────────────────────────┘    │
│  │  ┌──────────────────────────────────────────────┐    │
│  │  │         Custom Hooks                        │    │
│  │  │  • useObjects() - State management         │    │
│  │  │  • useSocket() - Real-time connection      │    │
│  │  │  • useToast() - Notifications              │    │
│  │  └──────────────────────────────────────────────┘    │
│  │  ┌──────────────────────────────────────────────┐    │
│  │  │        Libraries & Services                │    │
│  │  │  • API Client (Axios)                      │    │
│  │  │  • Socket.IO Client                        │    │
│  │  │  • Form Validation (Zod, RHF)            │    │
│  │  │  • UI Components (shadcn/ui)              │    │
│  │  │  • Styling (Tailwind CSS)                 │    │
│  │  └──────────────────────────────────────────────┘    │
│  └──────────────────────────────────────────────────────┘
└─────────────────────────────────────────────────────────┘
                           ↕️
                    HTTP + WebSocket
                           ↕️
┌─────────────────────────────────────────────────────────┐
│              Backend API (NestJS)                        │
│  • REST Endpoints: GET /objects, POST, DELETE      │
│  • WebSocket: Socket.IO for real-time updates          │
│  • Image Upload: /objects/upload                    │
│  • Database: PostgreSQL / MongoDB                       │
└─────────────────────────────────────────────────────────┘
```

## Structure des dossiers

### `app/` - Next.js App Router

```
app/
├── layout.tsx              # Layout racine
│   └── Providers: Toaster (Sonner)
│   └── Metadata pour SEO
│   └── Fonts: Geist
├── globals.css             # Styles globaux
│   └── Tailwind directives
│   └── CSS variables pour theming
│   └── Animations custom
├── page.tsx                # / - Page d'accueil
│   └── Affiche la liste des objets
│   └── Header avec title et create button
│   └── Footer
└── objects/
    └── [id]/
        └── page.tsx        # /objects/123 - Détails
            └── Affiche un objet en détail
            └── Bouton de suppression
            └── Gestion d'erreur 404
```

### `components/` - React Components

```
components/
├── ui/                     # shadcn/ui Components
│   ├── button.tsx         # Button avec variants
│   ├── card.tsx           # Card container
│   ├── input.tsx          # Text input
│   ├── textarea.tsx       # Multi-line input
│   ├── badge.tsx          # Small label component
│   ├── skeleton.tsx       # Loading placeholder
│   └── dialog.tsx         # Modal dialog
├── object-card.tsx         # Carte d'objet dans la liste
├── object-list.tsx         # Grille d'objets
├── create-object-dialog.tsx # Dialog pour créer
├── delete-confirmation-dialog.tsx
└── image-upload.tsx        # Upload avec drag-drop
```

### `hooks/` - Custom React Hooks

```
hooks/
├── use-objects.ts         # Gère l'état des objets
│   ├── State: objects[], loading, error
│   ├── Actions: fetchObjects(), addObject(), removeObject()
│   ├── Effets: fetch initial + Socket.IO listeners
│   └── Notifications: toast sur les mises à jour
├── use-socket.ts          # Connexion Socket.IO
│   ├── Initialise la socket une fois
│   ├── Retourne l'instance socket
│   └── Gère la reconnexion
└── use-toast.ts           # Wrapper Sonner
    └── Abstraction pour les notifications
```

### `lib/` - Logique partagée

```
lib/
├── api.ts                  # Client HTTP (Axios)
│   ├── objectsApi.getAll()
│   ├── objectsApi.getById()
│   ├── objectsApi.create()
│   ├── objectsApi.delete()
│   └── objectsApi.uploadImage()
├── socket.ts              # Configuration Socket.IO
│   ├── initSocket()
│   ├── getSocket()
│   └── disconnectSocket()
├── utils.ts               # Fonctions utilitaires
│   ├── cn() - clsx + tailwind-merge
│   ├── formatRelativeTime()
│   └── formatDate()
└── validations.ts         # Schémas Zod
    └── createObjectSchema
```

## Flux de données

### Récupération des objets

```
1. User ouvre l'app
   ↓
2. App mounts
   ↓
3. useObjects() hook s'exécute
   ↓
4. fetchObjects() appelle objectsApi.getAll()
   ↓
5. API Client (Axios) fait GET /objects
   ↓
6. Backend retourne la liste
   ↓
7. State objects[] mis à jour
   ↓
8. Composant re-render avec les objets
   ↓
9. Chaque objet affiche une ObjectCard
```

### Création d'un objet

```
1. User clique "Créer un objet"
   ↓
2. Dialog s'ouvre
   ↓
3. User remplit le formulaire
   ↓
4. User clique "Créer"
   ↓
5. Validation côté client (Zod)
   ↓
6. Image uploadée: POST /objects/upload
   ↓
7. Objet créé: POST /objects
   ↓
8. Toast de succès
   ↓
9. Dialog se ferme
   ↓
10. useObjects() recharge les objets (optionnel)
    OU Socket.IO Event objectCreated se déclenche
```

### Synchronisation temps réel

```
Client A              Socket.IO Server           Client B
   |                                              |
   |---- Create Object ---->|                    |
   |                        |                    |
   |                        |---- Broadcast ---->|
   |                        |  objectCreated     |
   |                        |                    |
   |                        |                 Hook useObjects()
   |                        |                  listener reçoit
   |                        |                  l'objet
   |                        |                    |
   |                        |              addObject()
   |                        |                    |
   |                        |              Re-render
   |                        |                    |
```

## État global

Pas de Redux/Zustand utilisé - l'état est géré localement:

### useObjects() State

```typescript
{
  objects: HeyamaObject[]        // Liste des objets
  loading: boolean               // État de chargement
  error: string | null           // Message d'erreur
  fetchObjects: () => Promise    // Recharge les objets
  addObject: (obj) => void       // Ajoute un objet
  removeObject: (id) => void     // Supprime un objet
}
```

## Patterns utilisés

### 1. Custom Hooks pour la logique

```typescript
const { objects, loading } = useObjects()
// Encapsule: fetch, Socket.IO, state management
```

### 2. Component Composition

```tsx
<ObjectList>
  {objects.map(obj => <ObjectCard obj={obj} />)}
</ObjectList>
```

### 3. Server Client Boundary

```typescript
'use client'  // Composants interactifs
// Pages sans 'use client' sont des Server Components
```

### 4. Validation schémas

```typescript
const schema = z.object({
  title: z.string().min(3)
})
// Utilisé par React Hook Form
```

## Communication avec l'API

### Architecture du Client API

```typescript
// lib/api.ts
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { 'Content-Type': 'application/json' }
})

export const objectsApi = {
  getAll: async () => { ... },
  getById: async (id) => { ... },
  create: async (payload) => { ... },
  delete: async (id) => { ... },
  uploadImage: async (file) => { ... },
}
```

### Types des réponses

```typescript
interface HeyamaObject {
  id: string
  title: string
  description: string
  imageUrl: string
  createdAt: string
  updatedAt: string
}
```

## Événements Socket.IO

### Client Side Listeners

```typescript
socket.on('objectCreated', (object: HeyamaObject) => {
  // Ajouter à la liste
  addObject(object)
  // Notifier l'utilisateur
  toast({ title: 'Nouvel objet' })
})

socket.on('objectDeleted', (id: string) => {
  // Retirer de la liste
  removeObject(id)
})
```

### Événements du serveur

```typescript
// Le serveur émet ces événements:
// - objectCreated
// - objectDeleted
// - objectUpdated (potentiel)
```

## Styling Architecture

### Tailwind CSS

```css
@tailwind base;      /* Resets et styles de base */
@tailwind components; /* Composants (Card, Button) */
@tailwind utilities;  /* Classes utilitaires */
```

### CSS Variables

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  /* ... */
}

.dark {
  --background: 222.2 84% 4.9%;
  /* Dark mode colors */
}
```

### Components avec CVA

```typescript
const buttonVariants = cva(
  "base styles",
  {
    variants: {
      variant: {
        default: "...",
        destructive: "..."
      }
    }
  }
)
```

## Performance Optimizations

### 1. Image Optimization

```typescript
<Image
  src={url}
  alt={title}
  fill
  className="object-cover"
  sizes="(max-width: 640px) 100vw, 33vw"
  priority={false}
/>
```

- Next.js compresse automatiquement
- Lazy loading par défaut
- Responsive avec srcset

### 2. Code Splitting

Next.js App Router fait du code splitting automatique:

```typescript
// Chaque page est son propre bundle
app/page.tsx
app/objects/[id]/page.tsx
```

### 3. Memoization

```typescript
const fetchObjects = useCallback(async () => {
  // Évite les re-renders inutiles
}, [])
```

## Sécurité

### 1. Validation côté client

```typescript
const schema = z.object({
  title: z.string().min(1, "Requis"),
})
// Prévient les données invalides
```

### 2. CORS et HTTPS

```typescript
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})
// Variables d'environnement ne révèlent pas de secrets
```

### 3. Content Security Policy

```typescript
// À implémenter dans next.config.js
```

## Testing Strategy

### Tests recommandés

```typescript
// __tests__/components/object-card.test.tsx
describe('ObjectCard', () => {
  it('should render object title', () => {
    // Test rendering
  })

  it('should navigate on click', () => {
    // Test navigation
  })
})
```

### Tools

```bash
npm install --save-dev jest @testing-library/react
```

## Déploiement

### Build Process

```bash
npm run build
# Optimise le code
# Génère les fichiers statiques
# Prépare pour le serveur
```

### Output sur Vercel

```
.next/
├── server/       # Code serveur
├── static/       # Assets statiques
└── ...
```

## Scalability

Pour scaler l'application:

1. **Données beaucoup plus importantes**
   - Ajouter pagination/infinite scroll
   - Implémenter le caching (TanStack Query)

2. **Plus de fonctionnalités**
   - Ajouter authentification
   - Ajouter permissions/roles
   - Ajouter partage social

3. **Performance**
   - Metrics tracking
   - Image CDN (Cloudinary, Imgix)
   - Database indexing

4. **Maintenabilité**
   - Ajouter tests unitaires
   - Ajouter e2e tests
   - Documentation API

---

Créé avec ✨ pour l'excellence. Heyama © 2024
