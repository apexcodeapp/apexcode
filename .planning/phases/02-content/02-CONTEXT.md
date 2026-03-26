# Phase 2: Content - Context

**Gathered:** 2026-03-26
**Status:** Ready for planning

<domain>
## Phase Boundary

This phase builds all five content sections (Hero, Services, Why Us, How We Work, Contact) and drops them into the `<main>` slot created in Phase 1. The output is a complete, reviewable single-page site with real structure, draft copy, and mobile-responsive layout. No design system changes — all tokens and layout shell come from Phase 1.

</domain>

<decisions>
## Implementation Decisions

### Copy Strategy
- **D-01:** Use **draft placeholder copy** for all sections. The planner writes realistic, requirement-accurate copy based on REQUIREMENTS.md and the project brief. The user reviews and refines copy before launch. This unblocks Phase 2 immediately without requiring a copy session.
- **D-02:** Contact email is **`hello@apexcode.dev`** — use this verbatim in the `mailto:` link. User will update to the real address before go-live if different.

### Hero Section
- **D-03:** Hero height is **full viewport height** (`min-h-screen` or `100dvh`) minus the sticky header (56px). Content is vertically centered in the remaining space.
- **D-04:** Hero content alignment is **centered** — headline, subheadline, and CTA button all centered horizontally within `max-w-5xl mx-auto`.
- **D-05:** CTA button label is **"Work With Us"** — scrolls to `#contact` section via anchor link. Single CTA, no secondary CTA (HERO-03).

### Service Cards
- **D-06:** Service cards are **icon-free** — title + description text only. No icon library, no inline SVGs. Keeps the section minimal and dependency-free.
- **D-07:** Card style: **bordered cards** — each card has `bg-surface-raised` (#111111) background and a 1px `border-border` (#1f1f1f) border. Consistent with Phase 1 design tokens. Three cards in a responsive grid: 1 column on mobile, 3 columns on desktop (`grid-cols-1 md:grid-cols-3`).

### Founder Presentation (Claude's Discretion)
- **D-08:** Why Us section presents founders **by name only** — no headshots or avatars (consistent with "no illustrations or stock photos" from PROJECT.md). Layout is Claude's discretion; a two-column layout on desktop and stacked on mobile is appropriate.

### Section IDs
- **D-09:** All five sections use the exact IDs specified in NAV-02: `id="services"`, `id="why-us"`, `id="process"`, `id="contact"`. Hero section uses `id="hero"` (not in nav, but useful for internal linking). The sticky header nav links from Phase 1 already point to these IDs.

### Claude's Discretion
- Section spacing and padding (follow 8-point scale from Phase 1 UI-SPEC)
- Exact heading copy for "Why Us" and "How We Work" section titles
- Whether to include a subtle section divider between sections or rely on spacing
- Draft copy for all sections (guided by REQUIREMENTS.md and project brief)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Design System & Prior Phase Contract
- `.planning/phases/01-foundation/01-UI-SPEC.md` — Color tokens, typography scale, spacing scale, component patterns established in Phase 1. All Phase 2 sections must use these tokens.

### Requirements
- `.planning/REQUIREMENTS.md` — Phase 2 requirement IDs: NAV-02, HERO-01, HERO-02, HERO-03, SERV-01, SERV-02, WHY-01, WHY-02, PROC-01, PROC-02, CONT-01, CONT-02, SEO-04.

### Roadmap & Goal
- `.planning/ROADMAP.md` — Phase 2 goal, success criteria, and section order (Hero → Services → Why Us → How We Work → Contact).

### Project Constraints
- `CLAUDE.md` (project root) — TypeScript required, mobile-first, no client-side JS frameworks, no backend.

### Existing Code (Phase 1 output)
- `src/layouts/Layout.astro` — Wraps all pages; Phase 2 sections drop into the `<slot />` inside `src/pages/index.astro`
- `src/styles/global.css` — All design tokens; `[id] { scroll-margin-top: 56px }` already set for sticky header clearance
- `src/components/layout/SiteHeader.astro` — Nav links already point to `#services`, `#why-us`, `#process`, `#contact`

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/layouts/Layout.astro` — HTML shell; Phase 2 content goes into the `<slot />` via `src/pages/index.astro`
- `src/components/layout/SiteHeader.astro` — Already has anchor links; Phase 2 just needs the section IDs to match
- `src/styles/global.css` — `scroll-margin-top: 56px` on all `[id]` elements already handles sticky header offset
- `src/lib/metadata.ts` — `SITE_URL` constant available for any absolute URL construction

### Established Patterns
- Tailwind v4 utility classes with `bg-surface-raised`, `text-text-primary`, `text-text-muted`, `border-border`, `text-accent` — use these token names, not raw hex values
- Component files are plain `.astro` — no React, no client-side JS
- Named exports only; `const` over `let`

### Integration Points
- Phase 2 sections mount in `src/pages/index.astro` inside `<main id="main-content">` — import each section component and render in order: Hero → Services → Why Us → How We Work → Contact
- Each section needs a stable `id` attribute so Phase 1's nav links and `scroll-margin-top` work correctly

</code_context>

<specifics>
## Specific Ideas

- **Section order:** Hero → Services → Why Us → How We Work → Contact (per ROADMAP.md success criteria)
- **Draft copy approach:** The planner should write realistic copy that matches the tone in REQUIREMENTS.md ("problem-first, outcome-oriented, developer-confident") — not generic lorem ipsum. It should read like real copy even if refinement is expected.
- **Hero scroll target:** The "Work With Us" CTA should `href="#contact"` — smooth scroll is already set via `scroll-behavior: smooth` on `<html>` from Phase 1.
- **Bordered cards:** Service cards use the same surface-raised + border-border treatment as the sticky header background — visual consistency with Phase 1 chrome.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within Phase 2 scope.

</deferred>

---

*Phase: 02-content*
*Context gathered: 2026-03-26*
