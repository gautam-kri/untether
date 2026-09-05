# UNTETHER — Website

> **A private AI chief of staff built on a memory system that recalls your life with receipts, on hardware you own.**

The marketing and product website for [Untether](https://untether.in/), a local-first AI assistant that captures commitments across every channel — email, Slack, calls, even the hallway — and drives them to done. The memory engine stores structured, evidence-gated claims on hardware you own; models are plug-ins, the memory is the machine.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Design System](#design-system)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Routing](#routing)
- [Key Concepts](#key-concepts)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This repository contains the public-facing website for Untether. It is a single-page React application with client-side routing, built around a distinctive dark engineering-blueprint design language. The site communicates the product's core value propositions — private memory, local hardware, evidence-gated recall — across a set of full-viewport, shutter-wiped landing sections and conventional scrolling sub-pages.

### Pages

| Route | Purpose |
|---|---|
| `/` | **Landing** — full-viewport wipe-through: Hero → Product → Memory → Tiers → Mission |
| `/memory` | Deep dive into the evidence-gated memory engine |
| `/trust` | Security whitepaper / threat model summary |
| `/team` | Co-founder bios with interactive photo hover effects |
| `/partners` | Design-partner cohort application (10-seat reservation form) |
| `/contact` | General contact form |
| `/faq` | Frequently asked questions |

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [React 18](https://react.dev/) with TypeScript |
| **Build** | [Vite 5](https://vitejs.dev/) |
| **Routing** | [React Router v6](https://reactrouter.com/) (client-side `BrowserRouter`) |
| **Styling** | [Tailwind CSS 3](https://tailwindcss.com/) + custom CSS design tokens + component-level CSS |
| **Fonts** | TT2020 Base (typewriter mono body), URW DIN Arabic Condensed Black (display) |
| **Analytics** | [Plausible](https://plausible.io/) (privacy-first, no cookies) |
| **Hosting** | [Vercel](https://vercel.com/) with SPA rewrite rules |

---

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│  index.html                                                  │
│  └─ main.tsx  (React root + BrowserRouter)                   │
│     └─ App.tsx                                               │
│        ├─ Cursor          (custom reticle, fine-pointer only) │
│        ├─ Banner          (design-partner seat counter)       │
│        ├─ Navbar          (desktop links + mobile overlay)    │
│        ├─ RouteWipeHost   (shutter-bar route transitions)     │
│        └─ Routes                                             │
│           ├─ /          → Landing (WipeContainer + sections)  │
│           ├─ /memory    → Memory  (PageShell + scrolling)     │
│           ├─ /trust     → Trust                               │
│           ├─ /team      → Team                                │
│           ├─ /partners  → Partners                            │
│           ├─ /contact   → Contact                             │
│           └─ /faq       → Faq                                 │
└──────────────────────────────────────────────────────────────┘
```

### Transition System

The site uses a **shutter-bar wipe** for all navigations. Five fully-opaque bars sweep across the viewport, swap content under full cover, then sweep out to reveal the new page/section. This is coordinated by:

- **`WipeContainer`** — manages landing-page section transitions (wheel/swipe/keyboard driven).
- **`RouteWipeHost`** (in `App.tsx`) — intercepts `<a>` clicks for route-level transitions.
- **`ShutterBars`** (in `wipe.tsx`) — the actual animated bar elements.
- **`landingNav`** — a tiny external store so the `Navbar` and `ProgressNav` (outside the landing route subtree) can read the active section and trigger transitions.
- **`routeWipe`** — a pub/sub channel for route-level wipe requests.
- **`transition.ts`** — ref-counted body class toggle that suspends the navbar backdrop blur during transitions (performance fix for iOS Safari).

All motion respects `prefers-reduced-motion` — animations are replaced with instant crossfades.

---

## Project Structure

```
untether/
├── index.html                  # HTML shell with SEO meta, Open Graph, Plausible
├── package.json                # Dependencies and scripts
├── vite.config.ts              # Vite + React plugin
├── tailwind.config.js          # Tailwind extended with design tokens
├── postcss.config.js           # PostCSS (Tailwind + Autoprefixer)
├── tsconfig.json               # TypeScript project config
├── tsconfig.node.json          # TypeScript config for Node tooling (Vite)
├── vercel.json                 # Vercel SPA rewrite rules
├── UNTETHER-DESIGN-SYSTEM.md   # Comprehensive visual design reference
│
├── public/
│   ├── favicon.svg             # Brand mark favicon
│   ├── fonts/                  # TT2020 Base & StyleB woff2 files
│   ├── images/                 # Product renders (Vault, Aperture, glasses)
│   └── founders*.webp          # Team photos and signature overlays
│
└── src/
    ├── main.tsx                # React root entry point
    ├── App.tsx                 # Route definitions + global layout shell
    ├── config.ts               # Site-wide constants (seats, prices, URLs)
    ├── index.css               # Master stylesheet (imports tokens, Tailwind, all component CSS)
    │
    ├── components/             # Reusable UI components
    │   ├── Banner.tsx          #   Fixed top banner (seat counter)
    │   ├── Button.tsx          #   Primary/secondary CTA (link or action)
    │   ├── Chip.tsx            #   Small bordered annotation label
    │   ├── Cursor.tsx          #   Custom reticle cursor (fine-pointer only)
    │   ├── DemoVideo.tsx       #   90-second demo CTA chip
    │   ├── FeatureTile.tsx     #   Feature card with glyph + title + body
    │   ├── FitScale.tsx        #   Viewport-fit auto-scaler (scale or scroll)
    │   ├── Footer.tsx          #   Site footer with brand mark and nav
    │   ├── FoundersPhoto.tsx   #   Interactive team photo with spotlight hover
    │   ├── HeroGlasses.tsx     #   Cursor-driven skin/wireframe reveal
    │   ├── Kicker.tsx          #   Red rule + uppercase label above headings
    │   ├── Logo.tsx            #   Brand mark SVG with draw-on animation
    │   ├── Navbar.tsx          #   Fixed navbar (desktop links + mobile menu)
    │   ├── PageShell.tsx       #   Standard scrolling page wrapper
    │   ├── ProductTile.tsx     #   Product card with illustration + chip
    │   ├── ProgressNav.tsx     #   Right-side section progress dots (landing)
    │   ├── RisingLetters.tsx   #   Staggered letter-rise animation
    │   ├── SectionHeading.tsx  #   Display heading (hero or section scale)
    │   ├── SectionShell.tsx    #   Full-height section scaffold
    │   ├── WipeContainer.tsx   #   Full-viewport section switcher (landing)
    │   └── wipe.tsx            #   ShutterBars component + timing constants
    │
    ├── pages/                  # Route-level page components
    │   ├── Landing.tsx         #   Assembles landing sections into WipeContainer
    │   ├── Memory.tsx          #   Memory engine deep-dive
    │   ├── Trust.tsx           #   Security & threat model
    │   ├── Team.tsx            #   Co-founder bios
    │   ├── Partners.tsx        #   Design-partner application
    │   ├── Contact.tsx         #   Contact form
    │   └── Faq.tsx             #   FAQ accordion
    │
    ├── sections/               # Landing page wipe sections
    │   ├── HeroSection.tsx     #   Hero with wordmark, tagline, CTAs
    │   ├── TwoWallsSection.tsx #   "Why your AI forgets you" + 3-column grid
    │   ├── MemorySection.tsx   #   Memory pipeline illustration + summary
    │   ├── TiersSection.tsx    #   Cloud / Bridge / Vault pricing tiles
    │   └── MissionSection.tsx  #   Mission statement + footer
    │
    ├── illustrations/          # Hand-authored SVG blueprint illustrations
    │   ├── Illustration.tsx    #   Base frame + drawable primitives (Path, Line, etc.)
    │   ├── FeatureGlyph.tsx    #   32px line-art icons for feature tiles
    │   ├── CircuitIllustration.tsx
    │   ├── GlassesIllustration.tsx
    │   ├── GpuIllustration.tsx
    │   ├── LockIllustration.tsx
    │   ├── MemoryGraphIllustration.tsx
    │   ├── MemoryPipelineIllustration.tsx
    │   ├── PortraitPlaceholder.tsx
    │   ├── ServerIllustration.tsx
    │   └── ShutterEyeIllustration.tsx
    │
    ├── lib/                    # Shared utilities and state
    │   ├── hooks.ts            #   useMediaQuery, useReducedMotion, useFinePointer
    │   ├── landingNav.ts       #   External store for landing section navigation
    │   ├── reveal.tsx          #   RevealProvider + useReveal (illustration draw-on)
    │   ├── routeWipe.ts        #   Pub/sub for route-level wipe requests
    │   ├── sections.ts         #   Section metadata (IDs, hashes, nav labels)
    │   └── transition.ts       #   Ref-counted transition body class toggle
    │
    ├── data/
    │   └── logoMark.ts         #   SVG path data for the brand mark
    │
    └── styles/
        ├── tokens.css          #   CSS custom properties (palette, easing, layout)
        └── illustrations.css   #   Shared SVG illustration styles + draw-on animation
```

---

## Design System

The visual language is documented in detail in [`UNTETHER-DESIGN-SYSTEM.md`](./UNTETHER-DESIGN-SYSTEM.md). Key principles:

- **Near-black background** (`#060606`), never pure black.
- **Off-white type** (`#F2F1EC`), never pure white.
- **One red accent** (`#D93B3C`) used sparingly — CTAs, the headline period, active states.
- **Muted teal** (`#81ADAA`) for all secondary text, labels, annotations.
- **Condensed-black uppercase** display face (URW DIN Arabic / Bahnschrift fallback).
- **Typewriter monospace** body face (TT2020 Base / JetBrains Mono fallback).
- **1px teal hairline** borders, 2px border radius, no gradients or shadows.
- **Blueprint-style** hand-drawn SVG illustrations with draw-on animations.
- **Mechanical easing** (`cubic-bezier(0.76, 0, 0.24, 1)`) for all UI motion.

Design tokens are defined as CSS custom properties in [`src/styles/tokens.css`](./src/styles/tokens.css) and extended into Tailwind via [`tailwind.config.js`](./tailwind.config.js).

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9 (ships with Node 18+)

### Installation

```bash
# Clone the repository
git clone https://github.com/gautam-kri/untether.git
cd untether

# Install dependencies
npm install
```

### Development

```bash
# Start the Vite dev server (hot reload, localhost:5173)
npm run dev
```

### Production Build

```bash
# Type-check and build to dist/
npm run build

# Preview the production build locally
npm run preview
```

---

## Available Scripts

| Script | Command | Description |
|---|---|---|
| `dev` | `vite` | Start the development server with HMR |
| `build` | `tsc --noEmit && vite build` | Type-check then build for production |
| `preview` | `vite preview` | Preview the production build locally |

---

## Routing

Client-side routing is handled by React Router v6 with `BrowserRouter`. The Vercel config (`vercel.json`) rewrites all paths to `index.html` for SPA support:

```json
{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
```

### Landing Page Sections

The landing page (`/`) uses `WipeContainer` instead of scroll — sections are full-viewport panels navigated by wheel, swipe, keyboard arrows, or the right-side progress dots. URL hashes (`#hero`, `#product`, `#memory`, `#tiers`, `#mission`) are updated as the user navigates.

### Route Transitions

All internal `<a>` clicks are intercepted by `RouteWipeHost` in `App.tsx`, which plays the shutter-bar wipe before navigating. This ensures the content swap is never visible to the user.

---

## Key Concepts

### Evidence-Gated Memory

The product's core differentiator. Unlike context windows (which blur with scale) or RAG (which retrieves by similarity), Untether stores **structured claims** backed by **timestamped evidence** in a graph. Claims without evidence don't exist. Claims can be audited and erased.

### Three Tiers

| Tier | Model | Price |
|---|---|---|
| **Untether Cloud** | Hosted dedicated infrastructure | $300/mo |
| **Untether Bridge** | Home node + cloud compute burst | $400/mo |
| **Untether Vault** | Fully local sealed appliance | $3–5K one-time |

### Design-Partner Cohort

The first 10 seats are being hand-installed with San Francisco founders. The seat counter and application form are driven by constants in [`src/config.ts`](./src/config.ts).

---

## Deployment

The site deploys to **Vercel**. The configuration lives in:

- [`vercel.json`](./vercel.json) — SPA rewrite rules
- [`.vercelignore`](./.vercelignore) — files excluded from deployment

Push to `main` triggers automatic deployment (when connected to Vercel).

### Environment

No environment variables are required. All configuration (seat count, pricing, URLs) is in [`src/config.ts`](./src/config.ts) and updated via code changes.

---

## Contributing

1. **Branch** off `main` with a descriptive name (`feat/…`, `fix/…`, `docs/…`).
2. **Follow the design system** — reference [`UNTETHER-DESIGN-SYSTEM.md`](./UNTETHER-DESIGN-SYSTEM.md) for colors, typography, spacing, and component patterns.
3. **Respect reduced motion** — all animations must be gated behind `useReducedMotion()` or `@media (prefers-reduced-motion: reduce)`.
4. **Keep the custom cursor consistent** — interactive elements should carry `data-cursor="link"` for the reticle hover state.
5. **Type-check** before committing: `npm run build` (which runs `tsc --noEmit`).

---

## License

Proprietary. © 2026 Untether. All rights reserved.
