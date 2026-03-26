# Architecture Research

**Domain:** Static marketing landing page — developer studio
**Researched:** 2026-03-26
**Confidence:** HIGH (all key claims verified against official Next.js docs dated 2026-03-25)

## Standard Architecture

### System Overview

```
┌──────────────────────────────────────────────────────────────┐
│                     Build Time (next build)                   │
├──────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │ app/layout   │  │  app/page    │  │  app/sitemap.ts  │   │
│  │ (metadata,   │  │  (page RSC,  │  │  (auto-generated │   │
│  │  font load,  │  │   sections,  │  │   sitemap.xml)   │   │
│  │  JSON-LD)    │  │   JSON-LD)   │  └──────────────────┘   │
│  └──────┬───────┘  └──────┬───────┘                         │
│         │                 │                                   │
├─────────┴─────────────────┴───────────────────────────────── ┤
│                  Static HTML Output (/out or .next)           │
├──────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────────┐    │
│  │                  Vercel Edge CDN                      │    │
│  │        (serves pre-built HTML + assets globally)     │    │
│  └──────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| `app/layout.tsx` | Root shell: font loading, global metadata, JSON-LD org schema | Server Component, exports `metadata` const |
| `app/page.tsx` | Page composition: assembles all sections in order | Server Component, no `'use client'` |
| `components/sections/Hero.tsx` | Headline, sub-copy, primary CTA button | Server Component (pure markup) |
| `components/sections/Services.tsx` | 3-card grid (AI Automation, Custom Dev, Integrations) | Server Component |
| `components/sections/WhyUs.tsx` | Founder identities, differentiators | Server Component |
| `components/sections/HowWeWork.tsx` | 3-step process (Discover → Build → Ship) | Server Component |
| `components/sections/Contact.tsx` | Email CTA, `mailto:` link | Server Component |
| `components/ui/Button.tsx` | Reusable CTA button primitive | Server Component (no state needed) |
| `components/ui/Card.tsx` | Service card primitive | Server Component |
| `components/layout/SiteHeader.tsx` | Nav bar, studio name/logo | Server Component |
| `components/layout/SiteFooter.tsx` | Copyright, optional social links | Server Component |
| `app/sitemap.ts` | Generates `sitemap.xml` at build time | Next.js file convention, returns `MetadataRoute.Sitemap` |
| `app/robots.ts` | Generates `robots.txt` at build time | Next.js file convention |

## Recommended Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout: fonts, global metadata, JSON-LD
│   ├── page.tsx            # Single page: composes all section components
│   ├── sitemap.ts          # Auto-generates sitemap.xml (Next.js convention)
│   ├── robots.ts           # Auto-generates robots.txt (Next.js convention)
│   └── globals.css         # CSS custom properties, base reset, utility classes
├── components/
│   ├── sections/           # One file per landing page section
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── WhyUs.tsx
│   │   ├── HowWeWork.tsx
│   │   └── Contact.tsx
│   ├── layout/             # Persistent chrome (appears on every page)
│   │   ├── SiteHeader.tsx
│   │   └── SiteFooter.tsx
│   └── ui/                 # Atomic primitives shared across sections
│       ├── Button.tsx
│       └── Card.tsx
├── lib/
│   └── metadata.ts         # Shared metadata constants (site URL, OG image path, etc.)
└── public/
    ├── og-image.png        # 1200x630 OG image (1.2:1 ratio)
    ├── favicon.ico
    └── apple-touch-icon.png
```

### Structure Rationale

- **`app/`**: All Next.js App Router conventions live here. One `layout.tsx` + one `page.tsx` is the entire routing surface — single-page site.
- **`components/sections/`**: Each landing page section is an isolated component. Sections communicate nothing to each other — they are pure presentational markup with no shared state.
- **`components/layout/`**: Header and footer are separated from sections because they compose into `layout.tsx`, not `page.tsx`.
- **`components/ui/`**: Atomic primitives that appear in multiple sections (Button appears in Hero and Contact; Card appears in Services).
- **`lib/metadata.ts`**: Centralise the site URL, default title, OG image path, and description so they are one source of truth, consumed by `layout.tsx` and `sitemap.ts`.
- **`public/`**: Static files served verbatim. OG image must be here for Vercel's CDN to serve it at an absolute URL.

## Architectural Patterns

### Pattern 1: Server Components by Default (RSC-First)

**What:** Every component is a React Server Component unless it explicitly needs browser APIs or event handlers. No `'use client'` directive unless required.

**When to use:** Everywhere on this site. Hero, Services, WhyUs, HowWeWork, Contact — all are pure markup. No state, no effects, no browser APIs needed.

**Trade-offs:** Zero client-side JS shipped for these components. Bundle size stays near zero KB of React runtime for content sections. The only client JS Next.js ships is the minimal hydration code.

```typescript
// components/sections/Hero.tsx — no 'use client', no hooks
import { Button } from '@/components/ui/Button'

export const Hero = () => (
  <section className="hero">
    <h1>We build AI-powered software for growing businesses.</h1>
    <p>Two founders. Fast delivery. Modern stack.</p>
    <Button href="#contact" variant="primary">Work With Us</Button>
  </section>
)
```

### Pattern 2: Static Metadata Export (not generateMetadata)

**What:** Export a typed `metadata` const from `app/layout.tsx`. Since all content is static (no dynamic data, no route params), use the static form rather than `generateMetadata`.

**When to use:** Any page where SEO metadata does not depend on database queries or route parameters — which is every page on this site.

**Trade-offs:** Simpler, included in initial HTML `<head>` with no streaming delay, fully compatible with `output: 'export'` if needed.

```typescript
// app/layout.tsx
import type { Metadata } from 'next'
import { siteConfig } from '@/lib/metadata'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: 'Apex Code', template: '%s | Apex Code' },
  description: 'AI-powered solutions for small and medium businesses.',
  openGraph: {
    type: 'website',
    url: siteConfig.url,
    siteName: 'Apex Code',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
}
```

### Pattern 3: JSON-LD Organization Schema in Root Layout

**What:** Inject a `schema.org/Organization` JSON-LD block directly in `app/layout.tsx` via a `<script>` tag inside the Server Component. Use `schema-dts` for TypeScript types.

**When to use:** Every site with a business identity. Organization schema communicates studio name, founders, contact, and service type to Google's Knowledge Graph.

**Trade-offs:** Zero runtime cost. Injected at build time into every page's static HTML. Must sanitize `<` characters to prevent XSS.

```typescript
// app/layout.tsx (inside JSX)
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Apex Code',
  url: 'https://apexcode.dev',
  description: 'AI-powered solutions for small and medium businesses.',
  founders: [{ '@type': 'Person', name: 'Founder 1' }, { '@type': 'Person', name: 'Founder 2' }],
  contactPoint: { '@type': 'ContactPoint', contactType: 'customer service', email: 'hello@apexcode.dev' },
}

// In JSX:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
  }}
/>
```

### Pattern 4: next/font for Zero-CLS Typography

**What:** Use `next/font/google` (or `next/font/local`) to self-host fonts. Next.js downloads the font at build time, self-hosts it, and injects it with `font-display: swap` and no external network request at runtime.

**When to use:** All font loading on this project. Never use a raw `<link>` to Google Fonts.

**Trade-offs:** Eliminates render-blocking external font requests. CLS from font swap is eliminated by the automatic `size-adjust` mechanism. Required for strong Core Web Vitals scores.

```typescript
// app/layout.tsx
import { Inter, JetBrains_Mono } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' })
```

## Data Flow

### Request Flow

This is a static site. There is no runtime request-response cycle for content. Data flow is entirely at build time.

```
Build Time:
  next build
    ↓
  app/layout.tsx (Server Component) — reads lib/metadata.ts constants
    ↓
  app/page.tsx (Server Component) — imports section components
    ↓
  Section components — read inline props/constants only (no fetch)
    ↓
  Static HTML files output to .next/ or out/
    ↓
  Deployed to Vercel Edge CDN

Runtime (user visits site):
  Browser → Vercel CDN edge node → pre-built HTML (instant, ~0ms TTFB)
    ↓
  Browser parses HTML, renders content (no JS hydration needed for content)
    ↓
  next/font CSS loaded from same origin (self-hosted, no external DNS)
    ↓
  Page visible (LCP fires)
```

### State Management

There is no client-side state on this site for v1. All content is static. No state store is needed.

The only interactive element is the email CTA (`mailto:` link), which is a native browser behavior requiring no JavaScript.

If a smooth-scroll or mobile menu is added later, it can be a minimal `'use client'` component wrapping only the interactive element — not the full page.

### Key Data Flows

1. **Metadata to `<head>`:** `lib/metadata.ts` constants → `app/layout.tsx` `metadata` export → Next.js injects into `<head>` at build time.
2. **Sitemap generation:** `app/sitemap.ts` returns a `MetadataRoute.Sitemap` array → Next.js generates `sitemap.xml` in the output → Vercel serves it at `/sitemap.xml`.
3. **Font delivery:** `next/font/google` → downloaded at build time → self-hosted in `.next/static/` → served by Vercel CDN with `Cache-Control: immutable`.

## Deployment Architecture: Vercel

### Recommended Mode: Default `next build` (not `output: 'export'`)

Use standard `next build` without `output: 'export'`. Vercel handles this natively with zero config. The deployed site will serve all pages as pre-rendered static HTML from Vercel's Edge CDN. No Node.js server runs at runtime.

**Why not `output: 'export'`:** The static export mode disables the default `next/image` optimizer (requires a custom loader), disables `sitemap.ts` and `robots.ts` file conventions, and blocks future use of ISR if the site ever adds a blog. The default build on Vercel achieves identical performance for fully static pages with fewer constraints.

**Constraints from static export mode to avoid:**
| Feature | `output: 'export'` | Default build on Vercel |
|---------|-------------------|------------------------|
| `next/image` built-in optimization | Requires custom loader | Works out of the box |
| `app/sitemap.ts` convention | Not supported | Auto-generated |
| `app/robots.ts` convention | Not supported | Auto-generated |
| Future ISR for blog | Blocked | Available |
| Static HTML delivery from CDN | Yes | Yes (identical) |

### Vercel Deployment Behavior

On `git push` to the connected repo:
1. Vercel runs `next build` in CI
2. All pages pre-render to static HTML (no server functions needed)
3. HTML + assets deployed to Vercel's global Edge Network
4. Assets served with `Cache-Control: public, max-age=31536000, immutable`
5. Preview URLs generated for every branch automatically

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0–100k visitors/month | No changes needed. Pure static HTML from CDN handles this trivially. |
| 100k–1M visitors/month | Still no changes needed. Vercel CDN scales automatically. Cost increases, not architecture. |
| Add blog later | Add `app/blog/[slug]/page.tsx` with ISR (`revalidate: 3600`). No refactor of landing page sections. |

### Scaling Priorities

1. **First bottleneck:** OG image size — if the `/og-image.png` is not compressed (should be <200KB), it becomes the largest asset on the page. Use `squoosh` or `sharp` to compress at build time.
2. **Second bottleneck:** Third-party scripts — analytics or chat widgets added later. Use `next/script` with `strategy="lazyOnload"` to prevent them from blocking LCP.

## Anti-Patterns

### Anti-Pattern 1: `'use client'` on Section Components

**What people do:** Add `'use client'` to Hero, Services, etc. because they want to use a CSS animation library that uses hooks.

**Why it's wrong:** Sends full React client runtime (~40KB gzip) for each client component tree unnecessarily. All animation that matters for a landing page can be done with CSS `@keyframes` or CSS `transition` without any JavaScript.

**Do this instead:** Keep sections as Server Components. Use CSS animations via `globals.css` or inline `style`. If a specific animation truly requires JS (e.g. a scroll-driven counter), create a minimal `'use client'` wrapper around only that one element.

### Anti-Pattern 2: `output: 'export'` with `next/image`

**What people do:** Set `output: 'export'` for "full static", then hit the error that `next/image` requires a custom loader in export mode.

**Why it's wrong:** Requires wiring up Cloudinary or another service just to get image optimization that Vercel provides for free with the default build mode.

**Do this instead:** Use the default `next build`. On Vercel, static pages are served from CDN identically to `output: 'export'`, but with full `next/image` optimization, `sitemap.ts`, and `robots.ts` support.

### Anti-Pattern 3: Metadata Defined Only in `page.tsx`

**What people do:** Skip `layout.tsx` metadata entirely and define the full metadata object in `page.tsx`.

**Why it's wrong:** Does not establish a `title.template` for future pages (e.g. a future `/blog/post-title` page). Also means `metadataBase` — required for absolute OG image URLs — must be duplicated.

**Do this instead:** Define `metadataBase`, `title.default`, `title.template`, and default OG image in `app/layout.tsx`. Individual pages override only what they need.

### Anti-Pattern 4: Hardcoded Absolute URLs

**What people do:** Write `https://apexcode.dev/og-image.png` directly in the metadata object in multiple files.

**Why it's wrong:** Domain changes and local development break. OG images resolve to `http://localhost:3000/og-image.png` in dev, which social crawlers cannot reach.

**Do this instead:** Set `metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://apexcode.dev')` once in `layout.tsx`. All relative image paths (`/og-image.png`) are resolved against it automatically.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Vercel | `git push` → zero-config CI/CD | No `vercel.json` needed for basic deployment |
| Google Search Console | `app/sitemap.ts` + `app/robots.ts` file conventions | Submit sitemap URL after first deploy |
| Email client (CTA) | `href="mailto:hello@apexcode.dev"` native link | No JS, no API, no form — v1 scope |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| `layout.tsx` ↔ section components | None — layout wraps children, sections are children of `page.tsx` | No props passed across this boundary |
| `page.tsx` ↔ section components | Import only — sections receive no props in v1 | All content is hardcoded in sections for v1 |
| `lib/metadata.ts` ↔ `layout.tsx` | Direct import of constants | One-directional; metadata.ts has no imports |
| `components/ui/` ↔ `components/sections/` | Import only — sections import ui primitives | ui components accept typed props, no callbacks |

## Suggested Build Order

Build in this order to respect dependency direction (depended-on things first):

1. **Project scaffolding** — `next.config.ts`, `tsconfig.json`, `tailwind.config.ts` (if using Tailwind), path aliases, ESLint
2. **`lib/metadata.ts`** — site URL, title, description constants (no dependencies)
3. **`app/globals.css`** — design tokens, CSS custom properties, base reset
4. **`app/layout.tsx`** — font loading, metadata export, JSON-LD, HTML shell
5. **`components/ui/Button.tsx`, `components/ui/Card.tsx`** — primitives used by multiple sections
6. **`components/layout/SiteHeader.tsx`**, **`SiteFooter.tsx`** — chrome used in layout
7. **Section components** (any order, no cross-section dependencies):
   - `Hero.tsx`
   - `Services.tsx`
   - `WhyUs.tsx`
   - `HowWeWork.tsx`
   - `Contact.tsx`
8. **`app/page.tsx`** — assembles sections in reading order
9. **`app/sitemap.ts`** and **`app/robots.ts`** — SEO file conventions
10. **`public/og-image.png`** — 1200x630 OG image asset
11. **Vercel deployment** — connect repo, verify build output, submit sitemap

## Sources

- [Next.js Static Exports — Official Docs (updated 2026-03-25)](https://nextjs.org/docs/app/guides/static-exports)
- [Next.js generateMetadata API — Official Docs (updated 2026-03-25)](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Next.js JSON-LD Guide — Official Docs (updated 2026-03-25)](https://nextjs.org/docs/app/guides/json-ld)
- [Vercel Next.js Framework Page](https://vercel.com/frameworks/nextjs)
- [Next.js Optimizing Fonts and Images — Official Learn](https://nextjs.org/learn/dashboard-app/optimizing-fonts-images)
- [Optimize Next.js for Core Web Vitals — patterns.dev](https://www.patterns.dev/react/nextjs-vitals/)

---
*Architecture research for: static developer studio landing page*
*Researched: 2026-03-26*
