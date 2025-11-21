# ⚡ Quick Start - Heyama Web

Lancez l'application en 5 minutes.

## 1️⃣ Installation

```bash
# Accédez au dossier
cd heyama-web

# Installez les dépendances (2-3 min)
npm install
```

## 2️⃣ Configuration

```bash
# Vérifiez .env.local existe
cat .env.local

# Doit contenir:
# NEXT_PUBLIC_API_URL=http://localhost:3000
# NEXT_PUBLIC_SOCKET_URL=http://localhost:3000
```

## 3️⃣ API en cours d'exécution

**Important**: L'API doit être accessible avant de lancer l'app.

```bash
# Dans un autre terminal, lancez l'API
cd ../nestjs-heyama-api
npm start

# Vous devez voir:
# [Nest] Application listening on port 3000
```

## 4️⃣ Lancez l'app

```bash
npm run dev

# Vous devez voir:
# ▲ Next.js 14.x.x
# - Local: http://localhost:3000
```

## 5️⃣ Ouvrez dans le navigateur

Allez à **http://localhost:3000**

---

## 🧪 Test l'app

### ✅ Créer un objet

1. Cliquez **"Créer un objet"**
2. Remplissez le formulaire
3. Sélectionnez une image (ou glissez-déposez)
4. Cliquez **"Créer"**
5. Notification de succès ✨

### ✅ Voir les détails

Cliquez sur une carte d'objet → Page de détails

### ✅ Supprimer

Sur la page de détails, cliquez **"Supprimer"**

---

## 🆘 Troubleshooting

### ❌ "Cannot fetch from localhost:3000"

```bash
# Vérifiez que l'API est en cours d'exécution
# Terminal 1: npm run dev (frontend)
# Terminal 2: npm start (API)
```

### ❌ "Module not found"

```bash
# Supprimez et réinstallez
rm -r node_modules package-lock.json
npm install
```

### ❌ "Port 3000 already in use"

```bash
# Lancez sur un port différent
npm run dev -- -p 3000
```

---

## 📁 Structure rapide

```
app/             → Pages de l'app
components/      → Composants React
hooks/           → Logique partagée
lib/             → API client, utilities
```

---

## 🚀 Commandes essentielles

```bash
npm run dev      # Développement
npm run build    # Build production
npm start        # Production
npm run lint     # Vérifier le code
npm run format   # Formater le code
```

---

## 📚 Documentation complète

- **README.md** - Documentation générale
- **SETUP.md** - Guide détaillé d'installation
- **ARCHITECTURE.md** - Architecture technique
- **FEATURES.md** - Fonctionnalités et idées

---

## 🎯 Prochaines étapes

Après la création d'objets, vous pouvez:

1. Implémenter la recherche
2. Ajouter le mode sombre
3. Ajouter l'authentification
4. Déployer sur Vercel

Voir **FEATURES.md** pour plus d'idées.

---

**Prêt?** Lancez `npm run dev` et amusez-vous! ✨
