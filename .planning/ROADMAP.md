# Roadmap: ApexCode

## Milestones

- **v1.0** (2026-03-26) — Astro 6 static site: design system, layout shell, five content sections, hero background image, white/dark color scheme. Phase 3 (Launch verification) deferred. → [Archive](.planning/milestones/v1.0-ROADMAP.md)

## Current Milestone: v1.1

### Overview

Close the launch gate: deploy to Vercel, verify Lighthouse scores, create the OG image asset, and confirm search indexing.

### Phases

- [ ] **Phase 3: Launch** — Lighthouse 95+ Performance, OG image asset (1200×630), sitemap submission to Google Search Console, JS bundle < 50 KB, Vercel deployment verified

### Phase Details

#### Phase 3: Launch
**Goal:** The deployed site passes all launch-gate checks — Lighthouse performance, social share previews, and search indexing — and is ready for public traffic
**Depends on:** Phase 2 (complete)
**Success Criteria:**
  1. Lighthouse on the production URL scores 95+ Performance, 100 Accessibility, 100 Best Practices, 100 SEO
  2. Pasting the production URL into opengraph.xyz shows the correct title, description, and OG image preview
  3. Google Search Console confirms the sitemap is submitted and the index coverage report shows no errors
  4. The JS bundle shipped to the browser is under 50 KB (verified via Vercel build output or Chrome DevTools Network tab)
**Plans:** TBD

## Progress

| Phase | Plans | Status | Completed |
|-------|-------|--------|-----------|
| 1. Foundation | 1/1 | Complete | 2026-03-26 |
| 2. Content | 1/1 | Complete | 2026-03-26 |
| 3. Launch | 0/? | Not started | - |
