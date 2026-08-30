# Hosch Alef // Portfolio & Systems Showcase

> **Gameplay Programmer & Systems Architect**  
> Modular C++ & C# Architecture, Server Authority, Tactical AI & Speculative Game Design.

---

## 🚀 Architecture Overview

This portfolio is built as a high-performance, living single-page application using:

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) + Custom Figma Glassmorphic Design Tokens
- **Icons**: [Lucide React](https://lucide.dev/) + Custom SVG Vector Components
- **Linter & Formatter**: [Biome](https://biomejs.dev/)
- **Atmospheric Engine**: Dynamic Chromatic Theme Lerping & Bioluminescent Canvas Particles

---

## 📁 Repository Structure

```text
siteportifolio/
├── public/                     # Static assets served at root
│   ├── images/                 # High-resolution gameplay screenshots & badges
│   ├── videos/                 # Gameplay showcase recordings
│   └── CV/                     # Official resumes & documentation
│
├── src/                        # React Application Source
│   ├── components/             # Reusable UI Components
│   │   ├── background/         # Living particle canvas & UNSC telemetry HUD
│   │   ├── common/             # Accessible icons & shared design primitives
│   │   ├── contact/            # Spawn point comms & social connectors
│   │   ├── hero/               # Cinematic header, ethos manifesto & badges
│   │   ├── mascot/             # Interactive Hosch companion unit & guided tour
│   │   ├── navigation/         # Frosted glass navbar & language switcher
│   │   ├── profile/            # Ori/Gris, Halo & Ordem Paranormal pillars
│   │   ├── projects/           # Spring-hover cards, grid & case study modal
│   │   └── stack/              # Objective 5-language skill tree & matrix
│   │
│   ├── context/
│   │   └── ThemeContext.jsx    # Global reactive chromatic state orchestrator
│   │
│   ├── data/
│   │   ├── projects.js         # Case study metadata, technical wins & themes
│   │   └── translations.js     # Multilingual dictionaries (PT, EN, FR)
│   │
│   ├── App.jsx                 # Master application layout
│   ├── index.css               # Design tokens, CSS variables & typography
│   └── main.jsx                # React root mount entry point
│
├── biome.json                  # Biome code quality & formatting rules
├── index.html                  # HTML5 shell with CSP & security headers
├── package.json                # Project dependencies & scripts
├── vite.config.js              # Vite bundler & plugin configuration
└── .gitignore                  # Production ignore definitions
```

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm

### Installation
```bash
# Clone the repository
git clone https://github.com/LOBOodst/siteportifolio.git

# Navigate to project directory
cd siteportifolio

# Install dependencies
npm install
```

### Development
```bash
# Start local dev server with Fast HMR (http://localhost:3000)
npm run dev
```

### Production Build
```bash
# Compile and bundle optimized static assets into dist/
npm run build

# Preview production build locally
npm run preview
```

### Code Quality
```bash
# Run Biome linter and formatter
npm run check
```

---

## 🛡️ Security & Hardening
- **Strict Content Security Policy (CSP)**
- **X-Content-Type-Options: nosniff**
- **Referrer-Policy: strict-origin-when-cross-origin**
- **Zero-Trust outbound link isolation (`rel="noopener noreferrer"`)**
