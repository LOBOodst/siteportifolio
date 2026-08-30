# Workspace Guidelines & Agent Rules

## 🎮 Project Identity
- **Developer**: Hosch Alef (Gameplay Programmer & Systems Architect).
- **Core Themes**: Tactical Telemetry & Low-Level Architecture, Bioluminescent Particle Lighting & Spring Physics, High-Tension Spatial AI & Investigation.
- **Languages**: C++, C#, Python, JavaScript, SQL.

## 🛠️ Tech Stack & Conventions
- **Framework**: React 19 + Vite (Fast HMR).
- **Styling**: Tailwind CSS v4 + Custom Figma Design Tokens in `src/index.css`.
- **Quality & Linting**: Biome (`npm run check`, `npm run format`).
- **Icons**: Lucide React + Accessible Vector SVGs in `src/components/common/Icons.jsx`.
- **Assets**: All static media must live in `public/images/`, `public/videos/`, `public/CV/`.

## 🚫 Hard Constraints
- **NO AI-GENERATED IMAGES**: Only real, authentic in-game screenshots and recorded gameplay footage from actual game builds may be displayed.
- **NO HARDCODED SCRIPT PATHS**: Explain game systems from an architectural perspective (FSM, Dijkstra Grid, Server Authority, SphereCasts, Object Pooling) without citing raw file paths.
- **SECURITY**: Maintain strict CSP, `rel="noopener noreferrer"` on external links, and zero-vulnerability dependencies.
