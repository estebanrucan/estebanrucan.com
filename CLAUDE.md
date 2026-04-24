# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install        # install dependencies
npm run dev        # start dev server at http://localhost:3000
npm run build      # production build (standalone output)
npm start          # run production server
npm run lint       # Next.js ESLint
```

There are no tests. No TypeScript — the codebase is plain JavaScript.

## Architecture

This is a **Next.js 14 (App Router)** single-page portfolio with a cyberpunk/sci-fi aesthetic. The routing layer is minimal:

- `app/layout.js` — root layout, loads Google Fonts and Font Awesome via CDN
- `app/page.js` — renders `<NeuralInterface />` inside `<main>`
- `app/globals.css` — all styling; CSS custom properties define the color palette (`--neon-cyan`, `--neon-purple`, `--neon-green`, `--neon-red`)

**Everything of substance lives in `components/NeuralInterface.js`**, a single `'use client'` component (~800 lines). It uses a large `useEffect` that imperatively bootstraps a vanilla JS application inside React — canvas rendering, audio, DOM manipulation, and event listeners all run inside that hook.

### State machine

The app cycles through four states stored in the `state` variable:

```
BOOT → IDLE → MODAL → DESTRUCT
```

- **BOOT**: Terminal-style log animation plays; user clicks "INITIALIZE_LINK"
- **IDLE**: Interactive canvas with clickable nodes; camera interpolates smoothly
- **MODAL**: A node was clicked; camera zooms in and a data panel appears
- **DESTRUCT**: Triggered automatically once all nodes have been visited; alarm, screen shake, countdown, then `finalizeDestruction()` which hides the canvas and shows the final screen

### Canvas rendering

The render loop (`animate()`) runs via `requestAnimationFrame`. It draws:
1. Connections between nodes (lines from the center PERFIL node to each outer node, plus an outer ring connecting EXPERIENCIA → SKILLS → EDUCACION → DOCENCIA)
2. Nodes (pulse ring + core circle + inner dot + label)

Node positions lerp toward `baseX`/`baseY` each frame. The camera (`camera.x`, `camera.y`, `camera.zoom`) also lerps toward target values (`camera.tx`, `camera.ty`, `camera.tz`).

### Content and nodes

Portfolio content is a plain object `db` keyed by node ID:

```js
const db = { PERFIL: { title, content }, EXPERIENCIA: { ... }, ... }
```

Node layout is defined in `nodeConfig`:

```js
const nodeConfig = [
    { id: 'PERFIL',     label, x: 0,    y: 0,    color: '#fff',    size: 30 },
    { id: 'EXPERIENCIA',label, x: 0,    y: -150, color: '#bc13fe', size: 20 },
    { id: 'DOCENCIA',   label, x: -140, y: -50,  color: '#bc13fe', size: 18 },
    { id: 'SKILLS',     label, x: 140,  y: -50,  color: '#00f3ff', size: 20 },
    { id: 'EDUCACION',  label, x: 0,    y: 150,  color: '#00f3ff', size: 18 },
]
```

**To add a new node**: add an entry to `db`, add an entry to `nodeConfig`, and update the connection-drawing section in `animate()` (the "outer ring" `ctx.lineTo` chain assumes a fixed node order).

### Audio

Two parallel audio systems:
- **SFX** (`SfxSys`): Web Audio API oscillators for hover/click/alarm sounds; initialized on first user gesture
- **Background audio** (`<audio id="bg-audio">`): plays `public/Esteban_Rucán_IA_Generativa_impacto_negocio.m4a` in a loop; controlled by the on-screen Play/Pause, volume slider, and speed buttons

### Styling conventions

- **Global CSS only** — no CSS Modules, no Tailwind
- Inline `style` props are used heavily in the JSX alongside `globals.css` classes
- CSS custom properties are defined in `:root` in `globals.css` and used throughout both CSS and inline styles
- Fonts: `Share Tech Mono` (monospace UI/canvas) and `Rajdhani` (modal body text), both loaded via `@import` in `globals.css`
- Icons: Font Awesome 6 loaded via `<link>` in `app/layout.js`

### Build output

`next.config.js` sets `output: 'standalone'`, producing a self-contained Node.js server bundle suitable for containerized deployment.
