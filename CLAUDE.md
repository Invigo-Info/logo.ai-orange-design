# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start dev server (http://localhost:3000)
- `npm run build` — Production build
- `npm run start` — Run production server
- `npm run lint` — Run ESLint (next/core-web-vitals + next/typescript)

No test framework is configured.

## Architecture

This is a **Next.js 16 App Router** landing page for "Logo.ai" (a logo generation service). It is a single-page site with no backend, no external API calls, and no environment variables.

**Stack:** Next.js 16, React 18, TypeScript (strict), Tailwind CSS 3

### Path alias

`@/*` maps to `./src/*` (configured in tsconfig.json).

### Source layout

- `src/app/` — App Router: single route (`page.tsx`), root `layout.tsx`, `globals.css`
- `src/components/` — All UI components (client and server)
- `src/data/` — Static data files (`logoData.ts`, `previewData.ts`, `faqData.ts`)

### Page composition

`src/app/page.tsx` composes the full landing page from section components in order: Navbar → Hero → LogoExamples → HowItWorks → LogoPreview → FAQ → FinalCTA → Footer. In-page navigation uses smooth scroll to anchors (`#top`, `#how`, `#preview`, `#faq`, `#cta-section`).

### Client vs Server components

Interactive components use `"use client"` (Hero, Navbar, LogoExamples, LogoPreview, FAQ, EmailBar, ScrollReveal, CategoryTabs). Static sections remain server components. State is local `useState`/`useEffect` only — no global state library.

### Styling conventions

- Tailwind utilities for layout and spacing
- Custom CSS in `globals.css` for complex animations (scroll reveals, ambient glow, grid textures, section fades)
- Custom Tailwind theme in `tailwind.config.ts`:
  - Colors: `b0`/`b1`/`b3` (blacks), `amber` (brand gold), `cream` with opacity variants
  - Fonts: `serif` (Playfair Display), `sans` (Manrope), `mono` (IBM Plex Mono)
  - Animations: `rise-1` through `rise-5` (staggered entrance)
- Easing curve: `cubic-bezier(0.16, 1, 0.3, 1)`

### Data patterns

`src/data/logoData.ts` contains 16 categories with 12 logo entries each. `previewData.ts` contains Base64-encoded SVG mockup images mapped by category. These are imported directly — no API fetching.
