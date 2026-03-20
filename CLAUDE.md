# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start dev server (http://localhost:3000)
- `npm run build` — Production build
- `npm run start` — Run production server
- `npm run lint` — Run ESLint (next/core-web-vitals + next/typescript)

No test framework is configured.

## Architecture

This is a **Next.js 16 App Router** landing page for "Logo.ai" (a logo generation service). Single-page site with Supabase for early access email tracking. ISR with 60-second revalidation.

**Stack:** Next.js 16, React 18, TypeScript (strict), Tailwind CSS 3, Supabase

### Path alias

`@/*` maps to `./src/*` (configured in tsconfig.json).

### Source layout

- `src/app/` — App Router: single route (`page.tsx`), root `layout.tsx`, `globals.css`
- `src/components/` — All UI components (client and server); subdirectories for content pages (about, terms, privacy, cookies, press, contact, careers)
- `src/data/` — Static data files (`faqData.ts`, `aboutData.ts`) and legacy blob URL JSON files (no longer used for image display)
- `src/lib/` — `getLogoCategories.ts` — filesystem-based category discovery
- `src/middleware.ts` — Sets `Content-Disposition: attachment` on image routes for download with named filenames (e.g. `coffee-shop-logo-1.webp`)

### Page composition

`src/app/page.tsx` composes the full landing page from section components in order: Navbar → Hero → LogoExamples → HowItWorks → LogoPreview → FAQ → FinalCTA → Footer. In-page navigation uses smooth scroll to anchors (`#top`, `#how`, `#preview`, `#faq`, `#cta-section`).

Categories are fetched server-side via `getLogoCategories()` and `getMockupCategories()` which scan the filesystem, then passed as props to `LogoExamples` and `LogoPreview`.

### Image serving

Logo images are served as **local static files** from `public/`:
- `public/logo-examples/{category}/{n}.webp` — logo gallery images (up to 24 per category)
- `public/logo-mockups/{category}/{n}.webp` — mockup slideshow images (5 per category)

Categories are discovered dynamically by reading directory contents at build/request time via `fs.readdirSync` in `src/lib/getLogoCategories.ts`. To add a new category, create a folder with numbered `.webp` files in the appropriate `public/` directory.

`blobUrls.json` and `mockupBlobUrls.json` in `src/data/` are legacy files — not imported by any app code.

### Client vs Server components

Interactive components use `"use client"` (Hero, Navbar, LogoExamples, LogoPreview, FAQ, EmailBar, ScrollReveal, CategoryTabs, CategoryTabsAdvanced, CountProvider). Static sections remain server components. State is local `useState`/`useEffect` only — no global state library.

`CountProvider` supplies signup count context (base count 63,482 + Supabase `early_access_user_emails` row count).

### Styling conventions

- Tailwind utilities for layout and spacing
- Custom CSS in `globals.css` for complex animations (scroll reveals, ambient glow, grid textures, section fades, noise overlay)
- Custom Tailwind theme in `tailwind.config.ts`:
  - Colors: `b0`/`b1`/`b3`/`b4` (blacks), `accent` (#E8420D orange) with hi/lo/opacity variants, `cream` with opacity variants (80/55/35/18/10/5)
  - Fonts: `serif` (Playfair Display), `sans` (Outfit), `display` (Sora), `mono` (IBM Plex Mono)
  - Animations: `rise-1` through `rise-5` (staggered entrance), `pulse-dot`
- Easing curve: `cubic-bezier(0.16, 1, 0.3, 1)`

### Data patterns

`src/data/faqData.ts` uses placeholder tokens (`{{CLAIMED_COUNT}}`, `{{LAUNCH_COUNTDOWN}}`) replaced at render time. `aboutData.ts` contains cost comparison, team, stats, and milestone data. These are imported directly — no API fetching.
