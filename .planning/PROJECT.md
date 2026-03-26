# ApexCode

## What This Is

A marketing landing page for Apex Code, a two-person development studio building AI-powered solutions for small and medium businesses. The site presents the studio's vision and services, establishes credibility through the founders' identity, and captures inbound interest — no product to sell yet.

## Core Value

First impression that converts: a visitor lands, immediately understands what Apex Code does and why they should trust it, and knows exactly how to reach out.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Hero section — bold headline, single sentence, single CTA ("Get in Touch" or "Work With Us")
- [ ] Services section — 3 cards: AI Automation, Custom Development, Smart Integrations
- [ ] Why Us section — 2 founders, human touch, fast delivery, modern stack
- [ ] How We Work section — 3-step process (Discover → Build → Ship)
- [ ] Contact section — email CTA, no form
- [ ] Mobile-first responsive layout
- [ ] Deploys to Vercel
- [ ] SEO foundations (meta tags, OG, semantic HTML)
- [ ] Lean performance — minimal JS, fast load

### Out of Scope

- Authentication / user accounts — no product yet, no need
- Database or backend — pure static site
- Contact form — email CTA only for v1
- Stock photos or illustrations — design direction is pure typography + layout
- Blog or CMS — future milestone

## Context

- Design reference: vercel.com — dark background, minimal, high contrast, clean typography, developer-confident tone
- Two founders, no team page needed beyond the "Why Us" section
- Tone: bold, modern, confident — not corporate, not startup-cringe
- Stack: GSD to recommend best fit for fast, SEO-friendly, Vercel-deployable site with TypeScript

## Constraints

- **Language**: TypeScript — project rule, no exceptions
- **Deploy**: Vercel — must work with zero-config or minimal config
- **Performance**: Lean — no heavy client-side frameworks if avoidable; keep bundle small
- **Mobile-first**: All layouts designed for mobile, scaled up to desktop
- **No backend**: Static site only — no server, no database, no auth

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| No contact form in v1 | Reduce scope; email CTA is sufficient to capture interest at launch | — Pending |
| No illustrations or stock photos | Stays true to Vercel-like aesthetic; avoids generic startup look | — Pending |
| Stack TBD by GSD | User delegated stack decision to GSD based on performance/SEO/Vercel fit | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-03-26 after initialization*
