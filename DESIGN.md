# Design system: "Blockout"

The site borrows the look of a greyboxed level open in a dark engine editor: editor-grey
surfaces, light text, the editor's yellow selection highlight, and the transform-gizmo
axis colours. The real game screenshots and videos supply the rest of the colour.

Audience: game studio leads and recruiters (Belgium / Europe). Their job on this page:
see the games within seconds, then read what I built. Everything else stays quiet.

## Colour

Dark theme, modelled on a dark engine editor UI. All tokens live in `src/index.css` (`@theme`)
and are used as Tailwind classes (`bg-paper`, `text-ink-2`…). Names describe roles:
`paper` is the page background, `ink` the main text colour.

| Token | Hex | Use | Contrast |
|---|---|---|---|
| `paper` | `#1b1d22` | Page background (editor grey) | – |
| `raised` | `#24272d` | Panels, tags, hover backgrounds | – |
| `ink` | `#eceef1` | Headings, emphasis, secondary-button borders, focus ring | 14.5:1 on paper |
| `ink-2` | `#bfc4cc` | Body text | 9.6:1 on paper |
| `ink-3` | `#979da8` | Secondary text, labels | 6.2:1 on paper |
| `line` | `#363a43` | Dividers, tag borders | decorative |
| `select` | `#ffb21a` | Primary action, selected/hovered item outline, links in the footer | 9.3:1 on paper |
| `on-select` | `#16181d` | Text on `select` | 9.8:1 |
| `axis-x` | `#f0505c` | Unreal Engine / C++ marker | 4.8:1 (non-text) |
| `axis-y` | `#33b860` | Unity / C# marker | 6.6:1 (non-text) |
| `axis-z` | `#5b8ff9` | Python / Node.js marker | 5.4:1 (non-text) |
| `stage` | `#111215` | Media viewer, modal bar, contact footer (darker than the page) | – |
| `stage-text` / `stage-muted` | `#d3d6dc` / `#9aa0aa` | Text on stage | 16:1 / 7:1 |

Rules:
- One accent. `select` marks what you can act on or what is selected, nothing else.
  Text placed on it always uses `on-select`.
- Axis colours are a code for the engine family and always sit next to its name
  (`EngineMark` / `EngineSwatch` in `src/components/common/EngineMark.jsx`). Never use them as decoration.
- No gradients, glows or glass.

## Type

One family: **Archivo** (variable, self-hosted via `@fontsource-variable/archivo`, no Google Fonts request).
Its width axis carries the hierarchy:

- `wide` (font-stretch 125%), weight 900: the name and section headings.
- `semiwide` (112%), weight 700–800: project titles, sub-headings.
- Normal width, 400–600: everything you read.

Sentence case everywhere. No all-caps labels, no monospace labels.

## Layout

- Content column `max-w-6xl`, left-aligned. Reading text capped around 60–68 characters.
- Order: Hero (name + screenshot reel) → Projects → Stack → About → Contact.
- Projects: featured projects get a wide image-left row; the rest a 3-column grid.
- Screenshots: 3px radius (viewport-like); buttons and panels 6px.
- Hover/selection on a screenshot = 3px `select` outline, like a selected actor in the editor.
- The one bold element: the name in the hero is shown as the **selected actor** (`SelectedName.jsx`):
  yellow selection frame, `BP_HoschAlef` label, X/Y/Z gizmo at the pivot. It can be dragged
  sideways and springs back. Don't repeat this treatment anywhere else.
- Easter egg: the Konami code (↑ ↑ ↓ ↓ ← → ← → B A), or the hint button in the footer,
  toggles "debug draw" (`html[data-debug]` in `index.css`): every element gets an outline,
  coloured with the gizmo code. A yellow toast confirms on/off.
- About: one sentence from the bio is pulled out as a large quote; it is removed from the
  paragraph so it isn't read twice.

## Motion

One orchestrated moment: the hero (name, then the reel sliding in). Elsewhere motion only
answers an action (filter change, opening a project). `prefers-reduced-motion` is honoured
globally and through `MotionConfig reducedMotion="user"`.

## Do / don't

- **Do** use only real in-game screenshots and recorded gameplay.
- **Do** keep the project modal media-first: video at the top, text below.
- **Don't** add AI-generated images, fake telemetry overlays or decorative counters.
- **Don't** cite raw script paths; explain systems architecturally.
