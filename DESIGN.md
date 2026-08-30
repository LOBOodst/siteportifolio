---
version: "alpha"
name: "Hosch Alef Systems Architecture"
description: "Official visual identity system and design tokens for Hosch Alef's Gameplay & Systems Architecture portfolio."
colors:
  primary: "#00f0ff"
  secondary: "#3b82f6"
  tertiary: "#f43f5e"
  neutral-bg: "#080c14"
  neutral-surface: "#0f172a"
  neutral-surface-hover: "#1e293b"
  neutral-text: "#f8fafc"
  neutral-muted: "#94a3b8"
  border-subtle: "rgba(255, 255, 255, 0.08)"
  border-hover: "rgba(255, 255, 255, 0.20)"
  on-primary: "#080c14"
  on-surface: "#f8fafc"
typography:
  h1:
    fontFamily: "Space Grotesk"
    fontSize: "3.5rem"
    fontWeight: "700"
    lineHeight: "1.1"
  h2:
    fontFamily: "Space Grotesk"
    fontSize: "2.25rem"
    fontWeight: "700"
    lineHeight: "1.2"
  h3:
    fontFamily: "Space Grotesk"
    fontSize: "1.5rem"
    fontWeight: "600"
    lineHeight: "1.3"
  body-lg:
    fontFamily: "Plus Jakarta Sans"
    fontSize: "1.125rem"
    fontWeight: "400"
    lineHeight: "1.7"
  body-md:
    fontFamily: "Plus Jakarta Sans"
    fontSize: "0.875rem"
    fontWeight: "400"
    lineHeight: "1.6"
  mono-sm:
    fontFamily: "JetBrains Mono"
    fontSize: "0.75rem"
    fontWeight: "500"
    lineHeight: "1.5"
rounded:
  sm: "6px"
  md: "10px"
  lg: "16px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  "2xl": "48px"
  "3xl": "64px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "#38bdf8"
  button-secondary:
    backgroundColor: "{colors.neutral-surface}"
    textColor: "{colors.neutral-text}"
    rounded: "{rounded.md}"
    padding: "12px 24px"
  card:
    backgroundColor: "{colors.neutral-surface}"
    textColor: "{colors.neutral-text}"
    rounded: "{rounded.lg}"
    padding: "24px"
  card-hover:
    backgroundColor: "{colors.neutral-surface-hover}"
---

## Overview

A dark, high-precision interface embodying the craft of low-level gameplay engineering and systems architecture. The design pairs the technical authority of game development viewports and telemetry with clean, human-readable editorial clarity.

## Colors

The palette is rooted in deep space neutrals paired with dynamic project-driven chromatic accents:

- **Neutral Background (`#080c14`):** Deep obsidian canvas that sets high contrast for code and gameplay imagery.
- **Neutral Surface (`#0f172a`):** Rich slate surface for interactive cards with subtle backdrop blur.
- **Primary Cyber Cyan (`#00f0ff`):** Represents server authority, C++ engine architecture, and primary actions.
- **Secondary Blue (`#3b82f6`):** Secondary systems and navigational elements.
- **Tertiary Crimson (`#f43f5e`):** Highlights tension, spatial AI perception, and critical mechanics.
- **Muted Text (`#94a3b8`):** Readable, accessible metadata and secondary explanations.

## Typography

Typography establishes clear hierarchy across technical data and narrative case studies:

- **Space Grotesk:** Headlines, section titles, and project names. Provides geometric structure and confident voice.
- **Plus Jakarta Sans:** Body prose, bio manifesto, and technical explanations. Engineered for effortless readability on dark surfaces.
- **JetBrains Mono:** Code snippets, engine metrics, programming language tags, and architecture parameters.

## Layout

- **Max Width Container:** Centered `max-w-6xl` grid with fluid horizontal padding (`px-6` to `px-10`).
- **Section Rhythm:** Consistent vertical breathing room (`mb-28`) between architectural components.
- **Featured Grid:** 2-column spotlight for primary case studies (LAN FPS C++ and Psychasteniac C#), followed by responsive grid cards for supporting systems.

## Elevation & Depth

- **Base Layer:** Ambient canvas with soft radial particle dust.
- **Surface Layer:** 16px backdrop-blur glassmorphic cards with `1px solid rgba(255, 255, 255, 0.08)` border.
- **Interactive Layer:** Subtle `translateY(-2px)` elevation with enhanced border opacity (`0.20`) and soft shadow on hover.
- **Overlay Layer:** Modal deep-dive layer at `z-50` with `bg-[#080c14]/95` backdrop-blur.

## Shapes

- **Corner Radii:** Consistent `rounded.lg` (16px) on primary cards, `rounded.md` (10px) on buttons and interactive pills, and `rounded.full` for active status beacons.
- **Dividers:** Refined 1px hairline rules (`border-slate-800` / `border-white/5`).

## Components

- **Navbar:** Fixed frosted glass header with brand logo, direct section links, and live `PT | EN | FR` language switcher.
- **Hero Thesis:** Name, systems architect title, availability beacon, and primary action CTAs.
- **Competency Matrix:** 5-language breakdown (C++, C#, Python, JavaScript, SQL) with concrete project linkages.
- **Case Study Modal:** Fullscreen technical breakdown featuring real gameplay videos, architecture highlights, and keyboard navigation (`Escape`, `ArrowLeft`, `ArrowRight`).
- **Contact Hub:** Frictionless communication triggers (instant Discord tag copy `lobo_spartans`, direct email, LinkedIn, GitHub).

## Do's and Don'ts

### Do's
- **DO** use 100% authentic in-game screenshots and real gameplay videos.
- **DO** keep animations subtle, organic, and respectful of reduced-motion preferences.
- **DO** explain game mechanics from an architectural perspective (FSM, Dijkstra grid, server authority, SphereCasts).
- **DO** maintain strict WCAG AA contrast standards.

### Don'ts
- **DON'T** use AI-generated images or concept art.
- **DON'T** include fake telemetry overlays (e.g. fake coordinates `X:0.521 Y:0.842` or fake uptime counters).
- **DON'T** add chatbot mascots with speech bubbles.
- **DON'T** hardcode raw internal script paths (e.g. `PlayerController.cs`).
