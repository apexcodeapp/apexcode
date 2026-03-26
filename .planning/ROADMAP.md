# Roadmap: ApexCode

## Overview

Three phases deliver a fully deployed, high-performance marketing landing page for Apex Code. Phase 1 establishes the project scaffold and design system — the decisions made here propagate through every section built afterward. Phase 2 builds all five content sections and wires them together into a complete, reviewable page. Phase 3 verifies the invisible-but-critical launch requirements — performance scores, social share previews, and search indexing — before the site goes live.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation** - Astro project scaffold, design tokens, layout shell, SEO meta baseline, and Vercel deployment
- [ ] **Phase 2: Content** - All five page sections with copy, anchor navigation, and mobile-responsive layout
- [ ] **Phase 3: Launch** - Performance verification, social share preview check, and search indexing confirmation

## Phase Details

### Phase 1: Foundation
**Goal**: A deployed, empty Astro site with the correct design system, typography, SEO metadata baseline, and Vercel pipeline — ready for content to be dropped in
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05, FOUND-06, NAV-01, SEO-01, SEO-02, SEO-03, SEO-05, SEO-06
**Success Criteria** (what must be TRUE):
  1. Running `npm run build` produces a static output with zero TypeScript errors in strict mode
  2. The deployed Vercel URL loads in under 3 seconds on a mobile connection (verified via PageSpeed Insights)
  3. The page background is near-black (`#0a0a0a`) — not pure black — with high-contrast off-white text
  4. `sitemap.xml` and `robots.txt` are accessible at their canonical URLs on the deployed site
  5. A sticky header with anchor links is visible and the `<title>` and `<meta name="description">` tags are present in the page source
**Plans**: 1 plan

Plans:
- [ ] 01-01-PLAN.md — Scaffold project, design tokens, layout shell, SEO metadata, and Vercel deploy

**UI hint**: yes

### Phase 2: Content
**Goal**: All five content sections are built, copywritten, and assembled into a complete, mobile-responsive single-page site
**Depends on**: Phase 1
**Requirements**: NAV-02, HERO-01, HERO-02, HERO-03, SERV-01, SERV-02, WHY-01, WHY-02, PROC-01, PROC-02, CONT-01, CONT-02, SEO-04
**Success Criteria** (what must be TRUE):
  1. A visitor scrolling the page encounters all five sections in order: Hero, Services, Why Us, How We Work, Contact
  2. The hero headline communicates what Apex Code does in one sentence, with a single CTA button that scrolls to the contact section
  3. Three service cards (AI Automation, Custom Development, Smart Integrations) each show an outcome-oriented description
  4. Both founders are named in the Why Us section alongside three stated differentiators (human touch, fast delivery, modern stack)
  5. The contact section shows a visible `mailto:` link with no form present on the page
**Plans**: TBD
**UI hint**: yes

### Phase 3: Launch
**Goal**: The deployed site passes all launch-gate checks — Lighthouse performance, social share previews, and search indexing — and is ready for public traffic
**Depends on**: Phase 2
**Requirements**: (verification phase — all requirements assigned to Phases 1 and 2; this phase confirms they work end-to-end in production)
**Success Criteria** (what must be TRUE):
  1. Lighthouse on the production URL scores 95+ Performance, 100 Accessibility, 100 Best Practices, 100 SEO
  2. Pasting the production URL into opengraph.xyz shows the correct title, description, and OG image preview
  3. Google Search Console confirms the sitemap is submitted and the index coverage report shows no errors
  4. The JS bundle shipped to the browser is under 50 KB (verified via Vercel build output or Chrome DevTools Network tab)
**Plans**: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 0/1 | Planning complete | - |
| 2. Content | 0/? | Not started | - |
| 3. Launch | 0/? | Not started | - |
