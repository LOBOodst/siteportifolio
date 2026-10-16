# Hosch Alef // Portfolio & Systems Showcase

> **Gameplay Programmer & Systems Architect**  
> Modular C++ & C# Architecture, Server Authority, Tactical AI & Speculative Game Design.

---

## 🚀 Architecture Overview

A single-page portfolio built with:

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with the "Blockout" design tokens in `src/index.css` (see [`DESIGN.md`](DESIGN.md))
- **Motion**: [Motion](https://motion.dev/) (honours `prefers-reduced-motion`)
- **Icons**: [Lucide React](https://lucide.dev/) + custom SVGs
- **Linter & Formatter**: [Biome](https://biomejs.dev/)
- **Languages**: English, Português, Français (auto-detected, remembered per visitor)

---

## 📁 Repository Structure

```text
siteportifolio/
├── public/
│   ├── images/        # Real in-game screenshots
│   ├── videos/        # Gameplay recordings (+ a .webp still frame per clip)
│   └── CV/            # Résumé PDFs
│
├── src/
│   ├── components/
│   │   ├── common/      # Icons and the engine-family marker
│   │   ├── contact/     # Footer with e-mail, Discord, socials
│   │   ├── hero/        # Name as the "selected actor" + screenshot reel
│   │   ├── navigation/  # Navbar, scroll-spy and language switch
│   │   ├── profile/     # About section
│   │   ├── projects/    # Cards, filtered grid and project page (modal)
│   │   └── stack/       # Engineering domains
│   ├── context/ThemeContext.jsx  # Language + open project (deep links: #project-id)
│   ├── data/          # projects.js, skills.js, translations.js
│   ├── hooks/         # Konami-code easter egg
│   └── utils/media.js # Asset URLs and YouTube / local video handling
│
├── DESIGN.md          # Design system and rules
└── index.html         # HTML shell with CSP, Open Graph and structured data
```

### Adding a project

Add an entry to `src/data/projects.js`. Every text field takes `{ pt, en, fr }`;
empty optional fields (`facts`, `myWork`, `links`) are simply not rendered.
For a local video clip, put a still frame next to it with the same name
(`videos/clip.mp4` → `videos/clip.webp`), for example:

```bash
ffmpeg -ss 3 -i public/videos/clip.mp4 -frames:v 1 -vf scale=1280:-2 public/videos/clip.webp
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
