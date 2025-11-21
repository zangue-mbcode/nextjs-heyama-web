# ✅ Checklist de vérification - Heyama Web

Utilisez cette checklist pour vérifier que tout fonctionne correctement.

## 📦 Installation

- [ ] Dossier `heyama-web` créé
- [ ] `npm install` exécuté avec succès
- [ ] Pas d'erreurs dans le terminal
- [ ] Dossier `node_modules` créé
- [ ] Fichier `package-lock.json` créé

## 🔧 Configuration

- [ ] `.env.local` existe
- [ ] `.env.local` contient `NEXT_PUBLIC_API_URL=http://localhost:3000`
- [ ] `.env.local` contient `NEXT_PUBLIC_SOCKET_URL=http://localhost:3000`
- [ ] API backend est accessible (`curl http://localhost:3000/objects`)

## 🚀 Démarrage

- [ ] `npm run dev` lancé sans erreurs
- [ ] Application accessible à `http://localhost:3000`
- [ ] Page d'accueil charge correctement
- [ ] Pas d'erreurs rouges dans la console du navigateur

## 📱 Fonctionnalités de base

### Page d'accueil
- [ ] Titre "Heyama" visible
- [ ] Bouton "Créer un objet" visible
- [ ] Liste des objets affichée (ou message vide)
- [ ] Grille responsive (1 colonne mobile, 2-3 desktop)
- [ ] Footer visible

### Création d'objet
- [ ] Cliquer "Créer un objet" ouvre un dialog
- [ ] Dialog a titre, description, champ image
- [ ] Peut sélectionner une image (clic ou drag-drop)
- [ ] Image se prévisualise
- [ ] Validation fonctionne (messages d'erreur)
- [ ] Bouton "Créer" créé l'objet
- [ ] Toast de succès affiché
- [ ] Dialog se ferme après création
- [ ] Nouvel objet apparaît dans la liste

### Page détails
- [ ] Cliquer une carte ouvre la page de détails
- [ ] URL change vers `/objects/[id]`
- [ ] Image affichée en grand
- [ ] Titre et description affichés complets
- [ ] Dates de création/modification visibles
- [ ] Bouton "Retour" fonctionnel
- [ ] Bouton "Supprimer" présent

### Suppression
- [ ] Cliquer "Supprimer" ouvre un dialog de confirmation
- [ ] Dialog affiche le nom de l'objet
- [ ] Bouton "Supprimer" dans le dialog supprime l'objet
- [ ] Toast de succès affiché
- [ ] Redirection vers l'accueil
- [ ] Objet disparu de la liste

## 🔄 Temps réel (Socket.IO)

- [ ] Console ne montre pas d'erreurs Socket.IO
- [ ] À chaque création, un toast "Nouvel objet" apparaît
- [ ] Objets créés dans d'autres clients apparaissent (si multi-onglets)
- [ ] Objets supprimés disparaissent du multi-onglets

## 🎨 Design & UX

- [ ] Page responsive sur mobile (testez avec F12)
- [ ] Boutons réactifs (hover, active states)
- [ ] Animations fluides (pas de saccades)
- [ ] Texte lisible (contraste suffisant)
- [ ] Pas de layout shift pendant le chargement
- [ ] Images chargent correctement
- [ ] Skeletons affichés pendant le chargement

## 🐛 Gestion d'erreurs

- [ ] Si API pas accessible: message d'erreur clair
- [ ] Si Socket.IO échoue: pas de crash (console message)
- [ ] Si image invalide: message d'erreur
- [ ] Si suppression échoue: toast d'erreur
- [ ] Page 404 si objet n'existe pas
- [ ] Formulaire invalide: messages clairs

## ♿ Accessibilité

- [ ] Tous les inputs ont des labels
- [ ] Navigation au clavier fonctionne (Tab)
- [ ] Boutons focusables et accessibles
- [ ] Images ont des alt texts
- [ ] Contraste de couleurs suffisant
- [ ] Pas de flash de contenu

## 📱 Responsive

- [ ] Desktop (1280px+): 3 colonnes
- [ ] Tablet (768px-1024px): 2 colonnes
- [ ] Mobile (320px-640px): 1 colonne
- [ ] Header adaptatif
- [ ] Footer adaptatif
- [ ] Dialogs centrés et lisibles
- [ ] Inputs cliquables sur mobile

## 🔐 Sécurité

- [ ] Pas d'URLs sensibles en NEXT_PUBLIC_
- [ ] Validation côté client (Zod)
- [ ] Gestion d'erreurs sans révéler les détails
- [ ] HTTPS en production (à configurer)
- [ ] Pas de credentials hardcodés

## 📊 Performance

- [ ] Page charge en < 3s (testez avec Lighthouse)
- [ ] Images optimisées (Next.js Image)
- [ ] Pas de memory leak (DevTools)
- [ ] Console sans warnings
- [ ] Build réussit (`npm run build`)

## 📚 Documentation

- [ ] README.md existe et est complet
- [ ] QUICK_START.md existe
- [ ] SETUP.md existe
- [ ] ARCHITECTURE.md existe
- [ ] FEATURES.md existe
- [ ] GETTING_STARTED.md existe
- [ ] .env.example existe avec valeurs

## 🛠️ Outils de développement

- [ ] `npm run lint` fonctionne
- [ ] `npm run format` formate le code
- [ ] `npm run build` crée un build réussi
- [ ] `npm start` lance la production
- [ ] Pas de warnings TypeScript
- [ ] ESLint ne show pas de critiques

## 📁 Structure du projet

- [ ] `app/` contient les pages
- [ ] `components/` contient les composants
- [ ] `hooks/` contient les hooks personnalisés
- [ ] `lib/` contient la logique partagée
- [ ] `public/` existe pour les assets
- [ ] `package.json` correct
- [ ] `tsconfig.json` correct
- [ ] `tailwind.config.ts` correct
- [ ] `next.config.js` correct

## 💾 Fichiers de code

### Pages
- [ ] `app/layout.tsx` - Root layout
- [ ] `app/page.tsx` - Page d'accueil
- [ ] `app/objects/[id]/page.tsx` - Détails

### Components
- [ ] `components/object-card.tsx` - Carte d'objet
- [ ] `components/object-list.tsx` - Liste
- [ ] `components/create-object-dialog.tsx` - Création
- [ ] `components/delete-confirmation-dialog.tsx` - Suppression
- [ ] `components/image-upload.tsx` - Upload image
- [ ] `components/ui/button.tsx` - Button component
- [ ] `components/ui/card.tsx` - Card component
- [ ] `components/ui/input.tsx` - Input component
- [ ] `components/ui/textarea.tsx` - Textarea
- [ ] `components/ui/badge.tsx` - Badge
- [ ] `components/ui/skeleton.tsx` - Skeleton
- [ ] `components/ui/dialog.tsx` - Dialog

### Hooks
- [ ] `hooks/use-objects.ts` - Gestion des objets
- [ ] `hooks/use-socket.ts` - Socket.IO
- [ ] `hooks/use-toast.ts` - Notifications

### Lib
- [ ] `lib/api.ts` - Client API
- [ ] `lib/socket.ts` - Config Socket
- [ ] `lib/utils.ts` - Utilités
- [ ] `lib/validations.ts` - Schémas Zod

## 🎯 Tests avancés

- [ ] Créer 10 objets rapidement (pas d'erreur)
- [ ] Supprimer une image et réessayer
- [ ] Fermer le dialog et réouvrir
- [ ] Naviguer vers un ID invalide (404)
- [ ] Tester avec une image > 10MB (erreur)
- [ ] Tester avec titre vide (erreur)
- [ ] Tester avec description courte (erreur)

## 📋 Avant de déployer

- [ ] Tous les TODOs ci-dessus cochés
- [ ] Code formaté (`npm run format`)
- [ ] Pas d'erreurs de build (`npm run build`)
- [ ] Variables d'environnement configurées
- [ ] README complet
- [ ] Documentation à jour

## 🚀 Déploiement

- [ ] Build production réussi
- [ ] Déployé sur Vercel/Heroku/autre
- [ ] Variables d'environnement configurées sur la plateforme
- [ ] Accès à l'API production configuré
- [ ] Tests en production réussis
- [ ] Monitoring configuré

## 🎉 Fin de checklist

Si tous les points sont cochés, **l'application est prête!**

### Ressources utiles

- [Next.js Troubleshooting](https://nextjs.org/docs/basic-features/troubleshooting)
- [React DevTools](https://react-devtools-tutorial.vercel.app/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WAVE Accessibility](https://wave.webaim.org/)

### Prochaines étapes

1. Ajouter des tests unitaires
2. Implémenter les features bonus (FEATURES.md)
3. Configurer le CI/CD
4. Ajouter des metrics
5. Mettre en place le monitoring

---

Créé avec ✨ pour l'excellence. Heyama © 2024

Besoin d'aide? Consultez **GETTING_STARTED.md** ou **README.md**
