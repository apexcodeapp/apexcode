# ApexCode

## What This Is

A marketing landing page for Apex Code, a two-person development studio building AI-powered solutions for small and medium businesses. The site presents the studio's vision and services, establishes credibility through the founders' identity, and captures inbound interest — no product to sell yet.

## Core Value

First impression that converts: a visitor lands, immediately understands what Apex Code does and why they should trust it, and knows exactly how to reach out.

## Current State (v1.0 — 2026-03-26)

The site is fully built and passing a clean build. Five sections, correct typography, white/dark color scheme, hero background image. Not yet deployed to Vercel.

**Outstanding before go-live:**
- Vercel deployment (GitHub repo creation + Vercel connect)
- OG image asset (`public/og-image.png` declared but not created)
- Lighthouse score verification (Phase 3)
- Real founder bios (current bios in WhyUsSection.astro are draft placeholders)
- Verify `hello@apexcode.dev` is the correct contact address

## Next Milestone Goals (v1.1)

1. Deploy to Vercel — push to GitHub, connect repo, confirm live URL
2. Create OG image — 1200×630 typography card matching brand
3. Run Lighthouse — hit 95+ Performance, 100 Accessibility/Best Practices/SEO
4. Submit sitemap to Google Search Console
5. Verify JS bundle < 50 KB

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| No contact form in v1 | Reduce scope; email CTA is sufficient to capture interest at launch | Validated |
| No illustrations or stock photos | Stays true to Vercel-like aesthetic; avoids generic startup look | Validated |
| Astro 6.x (over 5.x) | Scaffold installs latest stable; API surface identical | Accepted |
| `astro.config.mts` extension | TypeScript-only project rule (scaffold generated .mjs) | Enforced |
| White background (inverted from dark) | User preference — pivoted post-Phase 2 execution | Applied |
| Hero background image scoped to content block | Full-width felt wrong; constrained to text div with rounded corners | Applied |
| No icons in service cards | Pure typography approach; consistent with overall aesthetic | Applied |

## Constraints

- **Language**: TypeScript — project rule, no exceptions
- **Deploy**: Vercel — must work with zero-config or minimal config
- **Performance**: Lean — no heavy client-side frameworks if avoidable; keep bundle small
- **Mobile-first**: All layouts designed for mobile, scaled up to desktop
- **No backend**: Static site only — no server, no database, no auth

## Out of Scope

| Feature | Reason |
|---------|--------|
| Contact form | 81% form abandonment rate; static constraint; email CTA is higher-converting at this stage |
| Authentication / backend / database | No product to sell; pure static site |
| Blog / CMS | Requires content pipeline; empty blog signals neglect |
| Case studies / portfolio | Requires client consent and copy; ship when 2+ projects complete |
| Chat widget | Third-party JS weight; conflicts with lean performance goal |
| Cookie banner | No tracking scripts or analytics in v1; banner is pure noise |

---
*Last updated: 2026-03-26 after v1.0 milestone archive*
