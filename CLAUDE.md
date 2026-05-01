# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev        # Start dev server (localhost:3000)
npm run build      # Production build (outputs debug info via --debug)
npm run lint       # ESLint with next/core-web-vitals + next/typescript rules
npm run typecheck  # TypeScript check without emitting files
```

No test suite is configured.

## Architecture

### Stack

- **Next.js 15** (App Router) with **React 19**, Node 22 required
- **Tailwind CSS v4** via PostCSS (`@tailwindcss/postcss`) — no `tailwind.config` file; utility classes are available but the codebase uses almost none (see Styling)
- **Framer Motion 12** for animations, **Lucide React** for icons
- TypeScript strict mode; `@/*` path alias maps to `src/`

### Content layer

All site copy, types, and structured data live in one file: `src/content/site.ts`. This is the only place to edit text, routes, case studies, timeline entries, teaching info, or chat knowledge. There is no CMS, database, or external data fetching.

### Styling

JSX contains no Tailwind utility classes. Every visual element is expressed through semantic BEM-style class names (`.home-hero`, `.case-row`, `.command-item`, etc.) defined entirely in `src/app/globals.css`. Design tokens are CSS custom properties on `:root` (`--bg`, `--accent`, `--ink`, `--shell`, etc.). Theme switching is done by toggling `data-theme="light"` on `<html>` — dark is the default set in `layout.tsx`.

### Page shell

`src/app/layout.tsx` wraps every page in `<SiteShell>`, which composes `<Header>`, the page's `{children}`, `<CommandPalette>`, and `<ChatWidget>`. There is no layout nesting beyond the root.

### Client vs. server components

Server components are the default. `"use client"` is added only to components that need browser APIs or interactivity: `animated.tsx` (Framer Motion), `chat-widget.tsx`, `command-palette.tsx`, `header.tsx`, and `theme-toggle.tsx`.

### Case study routing

Two routing strategies coexist under `/casos`:

1. `src/app/casos/speech-analytics-calidad-atencion/page.tsx` — a hand-crafted static page with a full architecture diagram and detailed sections, sourced from `speechAnalyticsCase` in `site.ts`.
2. `src/app/casos/[slug]/page.tsx` — a generic template for all other cases. It explicitly returns `notFound()` for the speech-analytics slug to avoid conflict, and `generateStaticParams` excludes that slug as well.

To add a new fully detailed case, create a dedicated static page file (like the speech-analytics one) rather than extending the generic template.

### Interactive features

- **Command palette** (`⌘K` / `Ctrl+K`): navigates between routes defined in the `routes` array in `site.ts`. Adding routes there automatically surfaces them in the palette.
- **Chat widget**: keyword-matching FAQ widget powered by `chatKnowledge` in `site.ts`. Hidden on case detail pages (`/casos/*`). No external API is involved.
