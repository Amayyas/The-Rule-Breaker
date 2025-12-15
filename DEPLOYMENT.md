# Déploiement - The Rule Breaker

Ce guide explique comment déployer **The Rule Breaker** sur différentes plateformes.

## 🚀 Options de Déploiement

### 1. Vercel (Recommandé)

**Avantages**: Gratuit, ultra-rapide, intégration GitHub automatique

#### Via Interface Web
1. Allez sur [vercel.com](https://vercel.com)
2. Connectez votre compte GitHub
3. Importez le repository `The-Rule-Breaker`
4. Vercel détecte automatiquement Vite
5. Cliquez sur **Deploy**

#### Via CLI
```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Production
vercel --prod
```

**Configuration automatique**:
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

---

### 2. Netlify

**Avantages**: Drag & drop facile, redirections simples, formulaires inclus

#### Via Drag & Drop
1. Construire le projet localement:
   ```bash
   npm run build
   ```
2. Aller sur [app.netlify.com](https://app.netlify.com)
3. Glisser-déposer le dossier `dist/`

#### Via Git
1. Connecter le repo sur Netlify
2. Configuration:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Deploy

#### Configuration Netlify (netlify.toml)
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### 3. GitHub Pages

**Avantages**: Gratuit avec GitHub, facile à configurer

#### Installation
```bash
# Installer gh-pages
npm install --save-dev gh-pages
```

#### Ajouter dans package.json
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://votre-username.github.io/The-Rule-Breaker"
}
```

#### Déployer
```bash
npm run deploy
```

#### Configuration vite.config.js
```javascript
export default defineConfig({
  base: '/The-Rule-Breaker/',
  plugins: [react()]
})
```

---

### 4. Render

**Avantages**: Services gratuits persistants, SSL automatique

1. Créer un compte sur [render.com](https://render.com)
2. Nouveau → Static Site
3. Connecter le repo GitHub
4. Configuration:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
5. Deploy

---

### 5. Cloudflare Pages

**Avantages**: CDN ultra-rapide, analytics gratuits

1. Aller sur [pages.cloudflare.com](https://pages.cloudflare.com)
2. Connecter GitHub
3. Configuration:
   - Build command: `npm run build`
   - Build output: `dist`
4. Save and Deploy

---

## 📦 Build de Production

Avant tout déploiement, testez localement:

```bash
# Build
npm run build

# Prévisualiser
npm run preview
```

### Optimisations Automatiques

Le build Vite inclut:
- ✅ Minification JS/CSS
- ✅ Tree-shaking
- ✅ Code splitting
- ✅ Asset optimization
- ✅ Compression gzip

### Taille Estimée

```
dist/
├── assets/
│   ├── index-[hash].js    (~50-80 KB gzipped)
│   └── index-[hash].css   (~10-15 KB gzipped)
└── index.html             (~2 KB)
```

---

## 🔧 Variables d'Environnement

Si vous ajoutez des APIs ou services externes:

### Fichier .env
```env
VITE_API_URL=https://api.example.com
VITE_ANALYTICS_ID=your-id
```

### Utilisation
```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

### Configuration par Plateforme

**Vercel**: Project Settings → Environment Variables

**Netlify**: Site Settings → Build & Deploy → Environment

**GitHub Pages**: Utiliser GitHub Secrets + Actions

---

## 🌐 Domaine Personnalisé

### Vercel
1. Project Settings → Domains
2. Ajouter votre domaine
3. Configurer DNS (CNAME ou A record)

### Netlify
1. Domain Settings → Add custom domain
2. Suivre les instructions DNS

### GitHub Pages
1. Repository Settings → Pages
2. Custom domain
3. Configurer CNAME

---

## 📊 Analytics (Optionnel)

### Google Analytics
```html
<!-- Dans index.html avant </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### Vercel Analytics
```bash
npm install @vercel/analytics
```

```javascript
// Dans main.jsx
import { Analytics } from '@vercel/analytics/react';

// Ajouter dans App
<Analytics />
```

---

## ✅ Checklist Pré-Déploiement

- [ ] `npm run build` fonctionne sans erreurs
- [ ] `npm run preview` affiche le jeu correctement
- [ ] Toutes les dépendances sont dans `package.json`
- [ ] Meta tags SEO configurés dans `index.html`
- [ ] README.md à jour
- [ ] .gitignore inclut `node_modules/` et `dist/`
- [ ] Licence ajoutée (si applicable)

---

## 🐛 Troubleshooting

### Erreur: "404 on refresh"
**Solution**: Configurer les redirects (voir section Netlify)

### Assets ne chargent pas
**Solution**: Vérifier `base` dans `vite.config.js`

### Build échoue
```bash
# Vider cache et réinstaller
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Performance lente
- Activer compression gzip sur le serveur
- Utiliser un CDN (Cloudflare, Vercel Edge)
- Optimiser les images

---

## 📱 PWA (Progressive Web App)

Pour transformer le jeu en PWA installable:

```bash
npm install vite-plugin-pwa -D
```

```javascript
// vite.config.js
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'The Rule Breaker',
        short_name: 'Rule Breaker',
        description: 'Jeu de déduction mystérieux',
        theme_color: '#0a0a0f',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
```

---

## 🎉 Déploiement Réussi !

Une fois déployé:
1. Testez sur différents appareils
2. Vérifiez les performances (PageSpeed Insights)
3. Partagez le lien !

**URL Exemple**: https://the-rule-breaker.vercel.app

---

<div align="center">

**Bon déploiement ! 🚀**

</div>
