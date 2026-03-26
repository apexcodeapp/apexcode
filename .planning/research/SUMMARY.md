# Project Research Summary

**Project:** ApexCode — Developer Studio Landing Page
**Domain:** Static marketing / agency landing page
**Researched:** 2026-03-26
**Confidence:** HIGH

## Executive Summary

ApexCode is a static marketing landing page for a two-person AI-focused development studio targeting SMBs. The product is a pure content site: no authentication, no database, no API routes, no dynamic data. The research consensus is clear — this type of site should be built with a zero-JS-by-default static site generator deployed to a global CDN. The recommended stack is Astro 5.x with Tailwind CSS v4, not Next.js. Astro ships zero JavaScript by default and is purpose-built for content sites, while Next.js ships a 40-50 KB React runtime unconditionally — overhead with no benefit for a fully static page. This decision has a direct, measurable impact on performance (Lighthouse 95-100 vs 75-85) and SEO, both critical for a studio whose design reference is vercel.com.

**Important caveat:** ARCHITECTURE.md documents Next.js App Router patterns rather than Astro patterns. This is a research inconsistency — the architectural patterns described (RSC, `next/font`, `app/layout.tsx`, `sitemap.ts` file convention) are Next.js-specific. The STACK.md recommendation of Astro is the correct choice for this project. The architectural patterns in ARCHITECTURE.md are still useful as a reference for structural thinking (sections as isolated components, metadata centralisation, static-first data flow) but the implementation details must be adapted to Astro conventions, not Next.js conventions.

The key risks are performance degradation from poor framework choices and credibility damage from copy tone, missing OG images, or broken SEO foundations. Both are preventable from day one with the right setup. The site's single conversion goal — capture inbound interest from potential SMB clients — requires fast load, trustworthy design, clear copy, and working social share previews. None of these are hard technical problems, but each has specific pitfalls that must be addressed in the foundation phase.

## Key Findings

### Recommended Stack

Astro 5.x is the correct framework for this project. It ships zero client-side JavaScript by default, integrates with Tailwind CSS v4 via `@tailwindcss/vite` with no PostCSS configuration, deploys to Vercel with zero configuration (no adapter needed for static output), and includes built-in TypeScript strict mode, image optimisation via Sharp, and a sitemap integration. The combination of Astro + Tailwind v4 + Vercel achieves the lean, high-performance, SEO-friendly result the project requires.

See `.planning/research/STACK.md` for full rationale and installation instructions.

**Core technologies:**
- Astro 5.x: static site generator — ships zero JS by default, HTML-first output, built-in TypeScript, purpose-built for content sites
- Tailwind CSS 4.2.x: utility-first CSS — CSS-first engine (no JS config), Lightning CSS, zero runtime overhead
- TypeScript 5.x: bundled via Astro — project rule, strict mode via `astro/tsconfigs/strict`
- `@astrojs/sitemap`: sitemap generation — zero-config, required for search indexing
- `astro-seo`: SEO meta tags — handles OG, Twitter card, canonical in one typed component

**Version requirements:**
- Node.js 20.3.0 LTS minimum (Astro 5.8+ requirement; Node 18 is EOL)
- Astro 5.2+ required for Tailwind v4 support
- Tailwind v4 uses `@theme {}` blocks in CSS — no `tailwind.config.js`

### Expected Features

The feature set is lean and well-defined. All P1 features are low implementation cost and high conversion value. There are no complex interactive features in v1. See `.planning/research/FEATURES.md` for full prioritisation matrix and competitor analysis.

**Must have (table stakes):**
- Hero with clear headline + single CTA — visitors decide within 3 seconds; multiple CTAs reduce conversion by 266%
- Services section (3 cards: AI Automation, Custom Development, Smart Integrations) — validates scope match
- Contact path (email CTA, no form) — 81% of started forms are abandoned; `mailto:` link is sufficient
- Mobile-first responsive layout — 82.9% of landing page traffic is mobile
- Fast load time under 3s — 40% of users abandon at 3s; pure static handles this trivially
- SEO foundations (title, meta description, OG tags, semantic HTML) — invisible without these
- Anchor navigation — smooth in-page scroll to all sections

**Should have (competitive differentiators):**
- Founder-forward "Why Us" section — small studios win on trust; real faces and credentials convert skeptics
- "How We Work" 3-step process (Discover → Build → Ship) — process transparency is rare and builds trust
- AI-specific positioning in hero/services — differentiates from generic dev agencies
- Vercel-like dark typography-led aesthetic — signals technical credibility without screenshots

**Defer to v1.x (post-launch):**
- 2-3 curated testimonial quotes — add when first clients provide feedback
- JSON-LD structured data (ProfessionalService schema) — add when organic traffic is priority
- OG image asset — add before any social/paid promotion

**Defer to v2+:**
- Blog / CMS — requires content pipeline; empty blog damages credibility worse than no blog
- Case studies — requires client consent, copy, design assets
- Privacy-respecting analytics (Plausible/Fathom)

### Architecture Approach

The architecture is a pure static site: all content lives in Astro component files, all rendering happens at build time, and the output is pre-built HTML served from Vercel's Edge CDN. There is no runtime server, no client-side state, and no external data dependencies. The component model follows section-based decomposition — each landing page section is an isolated presentational component with no cross-section dependencies. The only shared concerns are the layout shell (header/footer), UI primitives (Button, Card), and a central metadata constants file.

Note: ARCHITECTURE.md documents Next.js-specific patterns. For Astro, the equivalent patterns are: `.astro` files instead of `.tsx` RSC files; frontmatter for data/imports instead of Server Component data fetching; `astro.config.mts` for sitemap and metadata instead of `app/sitemap.ts`; `src/layouts/Layout.astro` instead of `app/layout.tsx`. The structural intent is identical; only the syntax differs.

**Major components:**
1. `src/layouts/Layout.astro` — root shell: SEO meta via `astro-seo`, global styles, JSON-LD schema
2. `src/pages/index.astro` — page composition: assembles all sections in reading order
3. `src/components/sections/` — Hero, Services, WhyUs, HowWeWork, Contact — isolated presentational components
4. `src/components/layout/` — SiteHeader, SiteFooter — persistent chrome
5. `src/components/ui/` — Button, Card — atomic primitives shared across sections
6. `src/lib/metadata.ts` — site URL, title, description constants — single source of truth

**Suggested build order (dependency-respecting):**
1. Project scaffold (`astro.config.mts`, `tsconfig.json`, Tailwind global CSS, path aliases, ESLint)
2. `src/lib/metadata.ts` — constants, no dependencies
3. `src/styles/global.css` — design tokens, Tailwind import, base reset
4. `src/layouts/Layout.astro` — SEO, font loading, HTML shell
5. `src/components/ui/` — Button, Card primitives
6. `src/components/layout/` — SiteHeader, SiteFooter
7. Section components in any order (no cross-section dependencies)
8. `src/pages/index.astro` — assembles sections
9. `public/og-image.png` — 1200x630 OG image asset
10. Vercel deployment — connect repo, verify build, submit sitemap to Google Search Console

### Critical Pitfalls

See `.planning/research/PITFALLS.md` for full detail including recovery strategies and phase-to-pitfall mapping.

1. **Missing `metadataBase` / broken OG images** — Set the canonical production URL in the root layout's metadata before any other SEO work. Social crawlers get 404s on relative image paths; OG images fail silently in browser but visibly in social share previews. In Astro: configure `site` in `astro.config.mts` and use absolute URLs in `astro-seo`.

2. **`"use client"` overuse / unnecessary JS (Next.js pattern adapted for Astro)** — In Astro, this manifests as adding framework island adapters (`@astrojs/react`) when no interactivity is needed. All v1 sections are pure markup. Keep every section as a plain `.astro` component with zero framework overhead. If a single interactive element is needed later, use `@astrojs/preact` (4 KB) not `@astrojs/react` (42 KB).

3. **Google Fonts via `<link>` tag** — Never use a Google Fonts `<link>` tag. In Astro, use `@fontsource` for self-hosted fonts or a system font stack. Eliminates render-blocking external request, improves privacy, prevents CLS from font swap.

4. **Pure black background (`#000000`)** — Use near-black (`#0a0a0a` or `#111111`) with off-white text (`#ededed` or `#f5f5f5`). Pure black with pure white causes halation for ~50% of users with astigmatism. Tailwind `bg-black text-white` is the wrong default.

5. **Vercel Hobby plan for commercial use** — Vercel Hobby explicitly prohibits commercial use. Upgrade to Pro ($20/month) from day one, or deploy to Cloudflare Pages (free, no commercial restriction) as an alternative.

6. **Salesy copy that alienates developer audiences** — Developer audiences dismiss corporate cliche ("We Build the Future", "Transforming Businesses"). Use problem-first, outcome-oriented copy. CTAs must describe the action: "Work With Us" not "Get Started".

7. **Missing `robots.txt` and `sitemap.xml`** — In Astro, `@astrojs/sitemap` generates `sitemap.xml` automatically when `site` is set in `astro.config.mts`. Add a `public/robots.txt` manually. Submit to Google Search Console immediately after first deploy.

## Implications for Roadmap

Based on research, the project maps cleanly to three phases. All features are low complexity; the main risk is setup quality (performance, SEO, design tokens) in Phase 1 undermining the entire site.

### Phase 1: Foundation and Design System
**Rationale:** Setup decisions made here (framework config, design tokens, typography, metadata baseline) are the hardest to change later and affect every section built in Phase 2. Getting these wrong means a Phase 2 rework. Pitfall prevention is concentrated here.
**Delivers:** Working Astro project deployed to Vercel with correct TypeScript config, Tailwind design tokens (color palette, type scale), self-hosted fonts, root layout with SEO metadata, and `robots.txt` / `sitemap.xml`.
**Addresses:** SEO foundations (table stakes), fast load / lean JS (table stakes), mobile-first layout baseline
**Avoids:** Pure black background pitfall, Google Fonts pitfall, missing `metadataBase` pitfall, Vercel Hobby plan pitfall, `"use client"` overuse pattern

### Phase 2: Content Sections and Copy
**Rationale:** All sections are isolated components with no cross-section dependencies — they can be built in any order within this phase. Copy quality is the differentiator; the visual system from Phase 1 is the enabler.
**Delivers:** All five sections (Hero, Services, WhyUs, HowWeWork, Contact) with reviewed copy, anchor navigation wired to section IDs, and mobile-responsive layout verified across all sections.
**Addresses:** Hero (P1), Services section (P1), Founder-forward Why Us (P1), How We Work process (P1), Contact path (P1), Anchor navigation (P1), AI-specific positioning (differentiator), Vercel-like aesthetic (differentiator)
**Avoids:** Salesy copy pitfall, CTA anchor mismatch pitfall (hero CTA must resolve to `#contact` section), JS-based responsive layout pitfall (Tailwind `hidden md:block` only), missing OG image pitfall

### Phase 3: SEO Polish and Launch
**Rationale:** Final verification of everything that is invisible in the browser but critical at launch — social share previews, search indexing, performance scores. These cannot be validated until the content is real and the domain is live.
**Delivers:** OG image asset (1200x630), Google Search Console sitemap submission, Lighthouse performance verification (LCP under 2.5s, CLS under 0.1, JS bundle under 50 KB), social share preview verification via opengraph.xyz, canonical URL confirmed.
**Addresses:** OG image (v1.x post-launch feature, moved to launch gate), robots.txt / sitemap, structured data (optional, can defer to v1.x)
**Avoids:** Missing OG image pitfall, missing robots.txt / sitemap pitfall, canonical URL pitfall, TypeScript strict mode omission

### Phase Ordering Rationale

- Phase 1 must precede all others because design tokens and the metadata baseline are used by every section. Retrofitting color tokens or the `site` URL after sections are built causes cascading changes.
- Sections in Phase 2 have no dependencies on each other; they can be parallelised or sequenced in any order within the phase.
- Phase 3 is gated on Phase 2 being complete because OG image content (studio name, tagline) and Lighthouse scores depend on real content being in place.
- The "looks done but isn't" checklist from PITFALLS.md maps directly to Phase 3 verification steps.

### Research Flags

Phases with standard patterns (skip research-phase — well-documented, established patterns):
- **Phase 1:** Astro + Tailwind v4 setup is fully documented in official docs; STACK.md provides exact config. No additional research needed.
- **Phase 2:** Landing page section patterns are well-established; FEATURES.md and PITFALLS.md provide sufficient guidance for copy and layout decisions.
- **Phase 3:** SEO launch checklist is standard; PITFALLS.md covers the complete verification surface.

Phases that may benefit from targeted research:
- **Phase 2 (copy):** The specific copy for headlines, service descriptions, and the "Why Us" section depends on the founders' actual credentials and positioning. This is not a research gap — it requires the founders' input, not external research.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Astro and Tailwind v4 recommendations verified against official docs dated 2026-03-26. Version compatibility confirmed. The stack conflict between STACK.md (Astro) and ARCHITECTURE.md (Next.js) is resolved in favour of Astro — consistent with the project constraints and performance requirements. |
| Features | HIGH | Cross-referenced against Evil Martians' 100-page devtool landing page study, multiple landing page pattern sources, and the Vercel design reference from PROJECT.md. Feature priority matrix is internally consistent. |
| Architecture | MEDIUM | ARCHITECTURE.md documents Next.js patterns which do not apply directly to the chosen Astro stack. The structural patterns (section isolation, metadata centralisation, static-first data flow) are valid and transferable. Implementation details require Astro-specific adaptation. |
| Pitfalls | HIGH | Sourced from official Next.js/Vercel docs, Smashing Magazine accessibility research, and Evil Martians dev tool study. Most pitfalls (OG images, font loading, color tokens, Vercel plan) are directly applicable regardless of Astro vs Next.js choice. |

**Overall confidence:** HIGH

### Gaps to Address

- **Architecture documentation vs chosen stack:** ARCHITECTURE.md describes Next.js App Router patterns. During Phase 1 planning, the equivalent Astro patterns should be documented explicitly (Astro layouts, frontmatter, `astro.config.mts`, `@astrojs/sitemap` integration). The structural intent transfers directly but the syntax is different.
- **Founder copy and credentials:** The "Why Us" section, hero headline, and service descriptions require real input from the founders. No amount of research substitutes for this. Treat copy as a blocking dependency for Phase 2 completion.
- **OG image design:** The 1200x630 OG image requires a design decision (studio name, tagline, visual treatment). Can be a simple typographic card — but must be created before social sharing begins.

## Sources

### Primary (HIGH confidence)
- [Astro official docs — Deploy to Vercel](https://docs.astro.build/en/guides/deploy/vercel/) — confirmed no adapter needed for static sites
- [Tailwind CSS official docs — Install with Astro](https://tailwindcss.com/docs/guides/astro) — confirmed `@tailwindcss/vite` pattern for v4
- [Astro official docs — TypeScript](https://docs.astro.build/en/guides/typescript/) — confirmed `astro/tsconfigs/strict` preset
- [Astro 5.8 release blog](https://astro.build/blog/astro-580/) — confirmed Node.js 20.3.0 LTS minimum
- [Next.js Static Exports — Official Docs (2026-03-25)](https://nextjs.org/docs/app/guides/static-exports) — architecture patterns (Next.js, adapted for reference)
- [Next.js generateMetadata API — Official Docs (2026-03-25)](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) — metadata pattern reference
- [Vercel Hobby Plan Limits](https://vercel.com/docs/plans/hobby) — commercial use restriction confirmed
- [Evil Martians: We studied 100 dev tool landing pages (2025)](https://evilmartians.com/chronicles/we-studied-100-devtool-landing-pages-here-is-what-actually-works-in-2025) — feature and copy recommendations
- [Next.js Metadata and OG Images — Official Docs](https://nextjs.org/docs/app/getting-started/metadata-and-og-images) — OG image pitfalls
- [Inclusive Dark Mode — Smashing Magazine](https://www.smashingmagazine.com/2025/04/inclusive-dark-mode-designing-accessible-dark-themes/) — pure black background accessibility finding

### Secondary (MEDIUM confidence)
- [Makersden: Astro vs Next.js for marketing websites](https://makersden.io/blog/nextjs-vs-astro-in-2025-which-framework-best-for-your-marketing-website) — performance comparison
- [Eastondev: Astro vs Next.js comparison](https://eastondev.com/blog/en/posts/dev/20251202-astro-vs-nextjs-comparison/) — Lighthouse score claims (verify with own run post-build)
- [Blogging Wizard: Landing page statistics 2026](https://bloggingwizard.com/landing-page-statistics/) — conversion and abandonment stats
- [Moosend: Landing page mistakes 2025](https://moosend.com/blog/landing-page-mistakes/) — anti-feature rationale
- [Pagepro: Common Next.js Core Web Vitals mistakes](https://pagepro.co/blog/common-nextjs-mistakes-core-web-vitals/) — performance pitfall reference

---
*Research completed: 2026-03-26*
*Ready for roadmap: yes*
