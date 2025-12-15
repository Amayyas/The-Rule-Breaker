# 🎮 The Rule Breaker

<div align="center">

![The Rule Breaker](https://img.shields.io/badge/Game-Interactive%20Puzzle-00f5ff?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646cff?style=for-the-badge&logo=vite)

**Un jeu de déduction mystérieux où vous devez découvrir les règles cachées**

[🎯 Jouer Maintenant](#installation) • [📖 Documentation](#comment-jouer) • [🎨 Captures](#aperçu)

</div>

---

## 🌟 Concept

**The Rule Breaker** est un jeu web interactif où l'IA génère secrètement des règles que vous devez découvrir par essai-erreur. Aucune instruction n'est donnée - vous êtes un détective devant déchiffrer le puzzle.

### Caractéristiques Principales

- 🎲 **Règles Aléatoires**: Chaque partie génère 2-5 règles différentes parmi 11 possibles
- 🎯 **Déduction Pure**: Pas d'explications - observez, déduisez, testez
- 💡 **Indices Progressifs**: Débloquez des indices après 10, 20, 30 actions
- 🎨 **Design Cyberpunk**: Esthétique mystérieuse avec effets glitch et néons
- 🔊 **Feedback Multisensoriel**: Sons procéduraux et animations fluides
- 📈 **Progression**: Niveaux de difficulté croissante

## 🎯 Comment Jouer

1. **Cliquez sur les cases** de la grille 5x5
2. **Observez les feedbacks**:
   - ✓ = Action positive (points gagnés)
   - ✗ = Action négative (points perdus)
   - ○ = Action neutre
3. **Déduisez les règles** cachées
4. **Formulez vos hypothèses** avec le bouton "Je pense avoir compris !"
5. **Progressez** vers des niveaux plus complexes

### Les 11 Règles Possibles

#### 📍 Règles Spatiales
- **Corner Bonus**: Les coins donnent +12 points
- **Edge Bonus**: Les bords (non-coins) donnent +6 points
- **Center Penalty**: Le centre fait perdre -8 points
- **Diagonal Penalty**: Mouvements diagonaux = -5 points

#### 🎨 Règles de Couleur
- **Same Color Adjacent**: Cases adjacentes de même couleur = +10 points
- **Alternating Colors**: Alterner entre couleurs = +8 points
- **Red-Blue Combo**: Alterner rouge et bleu = +15 points
- **Three in Row**: 3 cases consécutives de même couleur = +20 points
- **Yellow Avoid**: Cliquer sur jaune = -7 points

#### 🎯 Règles de Comportement
- **Same Position Penalty**: Cliquer 2× sur la même case = -10 points
- **No Repetition**: Éviter les répétitions

## 🚀 Installation

### Prérequis

- Node.js 18+ (recommandé: 20+)
- npm ou yarn

### Étapes

```bash
# Cloner le projet
cd The-Rule-Breaker

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Ouvrir dans le navigateur
# → http://localhost:5173
```

## 🏗️ Build de Production

```bash
# Créer le build optimisé
npm run build

# Prévisualiser le build
npm run preview
```

Les fichiers optimisés seront dans le dossier `dist/`.

## 🎨 Aperçu

Le jeu utilise une esthétique **cyberpunk mystérieuse** avec:

- Palette de couleurs sombre (noir, cyan, magenta)
- Effets glitch sur le titre
- Animations fluides et satisfaisantes
- Grille colorée avec dégradés vibrants
- Sons procéduraux générés en temps réel

### Interface

- **Panneau de Score**: Score, niveau, compteur d'actions
- **Grille Interactive**: 5×5 cellules colorées
- **Historique**: 5 dernières actions avec feedback
- **Indices**: Révélés progressivement
- **Modal Hypothèse**: Vérifiez vos théories

## 🛠️ Technologies

- **React 19**: Framework UI moderne
- **Vite 5**: Build tool ultra-rapide
- **Web Audio API**: Sons procéduraux
- **CSS Moderne**: Animations, Grid, Flexbox, Backdrop filters
- **Vanilla JavaScript**: Pas de dépendances lourdes

## 📂 Structure du Projet

```
The-Rule-Breaker/
├── src/
│   ├── components/          # Composants React
│   │   ├── Grid.jsx        # Grille 5×5
│   │   ├── ScorePanel.jsx  # Affichage score
│   │   ├── ActionHistory.jsx
│   │   ├── HintPanel.jsx
│   │   ├── HypothesisModal.jsx
│   │   └── LevelComplete.jsx
│   ├── App.jsx             # Composant principal
│   ├── gameRules.js        # Moteur de règles
│   └── index.css           # Design system
├── public/                  # Assets statiques
├── index.html              # Point d'entrée
└── package.json
```

## 🎯 Logique du Jeu

### Génération de Règles

```javascript
// Sélection aléatoire selon le niveau
generateRules(difficulty) {
  const numRules = Math.min(2 + difficulty - 1, 5);
  // Niveau 1: 2 règles
  // Niveau 2: 3 règles
  // Niveau 5+: 5 règles
}
```

### Évaluation d'Actions

Chaque clic déclenche:
1. Évaluation contre toutes les règles actives
2. Calcul des points (cumulatifs)
3. Mise à jour du score (minimum 0)
4. Feedback visuel + sonore
5. Ajout à l'historique

### Progression

- **Complétion**: 40 actions + score > 50
- **Indices**: Automatiques à 10, 20, 30 actions
- **Bouton Révéler**: Disponible après 15 actions

## 🎵 Système Audio

Sons générés procéduralement avec Web Audio API:

```javascript
// Success: Montée de fréquence
oscillator.frequency: 800Hz → 1200Hz (0.15s)

// Fail: Descente de fréquence  
oscillator.frequency: 400Hz → 200Hz (0.15s)

// Neutral: Ton constant
oscillator.frequency: 600Hz (0.1s)
```

## 🚀 Déploiement

### Options Recommandées

1. **Vercel** (Recommandé)
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Netlify**
   - Drag & drop du dossier `dist/`
   - Ou connecter le repo GitHub

3. **GitHub Pages**
   ```bash
   npm run build
   # Déployer le dossier dist/ sur gh-pages
   ```

4. **Serveur Statique**
   ```bash
   npm run build
   # Copier dist/ vers votre serveur
   ```

## 🎮 Stratégies de Jeu

### Pour Débutants
- Testez méthodiquement les patterns simples
- Observez les coins et bords en premier
- Notez mentalement les répétitions

### Avancé
- Identifiez les règles par élimination
- Croisez les informations des indices
- Testez les combinaisons de couleurs spécifiques

## 🔧 Personnalisation

### Ajouter de Nouvelles Règles

Dans `gameRules.js`:

```javascript
export const RULE_BANK = {
  // ...
  maRegle: {
    id: 'maRegle',
    description: 'Description de la règle',
    hint: 'Indice subtil...',
    check: (action, grid, history) => {
      // Logique de validation
      return { valid: true/false, points: X };
    }
  }
};
```

### Modifier les Couleurs

Dans `index.css`, changez les variables CSS:

```css
:root {
  --color-primary: #00f5ff;    /* Cyan */
  --color-secondary: #ff00ff;  /* Magenta */
  /* ... */
}
```

## 📊 Statistiques

- **11 règles** découvrables
- **5 couleurs** différentes
- **25 cellules** interactives
- **Infinies** combinaisons de jeu

## 🤝 Contribution

Les contributions sont bienvenues ! N'hésitez pas à:

- Ajouter de nouvelles règles
- Améliorer le design
- Optimiser les performances
- Corriger les bugs

## 📝 Licence

Ce projet est open source. Libre d'utilisation et de modification.

## 🎉 Crédits

- **Design**: Esthétique cyberpunk inspirée des jeux de puzzle modernes
- **Fonts**: Orbitron & Space Mono (Google Fonts)
- **Concept**: Jeu de déduction original

---

<div align="center">

**Développé avec ❤️ et mystère**

[⬆ Retour en haut](#-the-rule-breaker)

</div>
