# Feature Research

**Domain:** Developer studio / AI agency landing page (2-person studio, SMB targeting)
**Researched:** 2026-03-26
**Confidence:** HIGH (multiple verified sources, cross-checked)

---

## Feature Landscape

### Table Stakes (Users Expect These)

Features visitors assume exist. Missing any of these creates an immediate trust problem — visitors leave before reading your offer.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Hero with clear headline + single CTA | Visitors decide within 3 seconds if they stay; vague or multi-CTA heroes destroy this window | LOW | "What you do + who for" in one sentence. Single CTA only — multiple CTAs reduce conversion by 266% |
| Services/offerings section | Visitors need to confirm your scope matches their problem before trusting you | LOW | 3 focused cards is the proven pattern; more than 4 creates cognitive overload |
| Contact path (any form) | Visitors who reach the bottom with intent need a next step or they leave forever | LOW | Email CTA is sufficient for v1; friction from forms kills completion (81% abandon started forms) |
| Mobile-responsive layout | 82.9% of landing page traffic is mobile; non-responsive = invisible to most visitors | LOW | Mobile-first is the correct default, not an afterthought |
| Fast load time (<3s) | 40% of users leave if load exceeds 3 seconds; at 5s you lose 90% | LOW | Pure static HTML/CSS, minimal JS. Performance is a revenue lever, not a nice-to-have |
| Legible typography hierarchy | Visitors scan, not read — if hierarchy is broken, the value prop doesn't land | LOW | High-contrast dark background + clear type scale. No wall-of-text paragraphs |
| Some form of social proof | Digital skepticism is high in 2026; confident claims without proof are dismissed | MEDIUM | Even one testimonial helps early-stage studios. Client logos, founder credentials, or a quote all qualify |
| SEO foundations (title, meta description, OG tags) | Static sites without meta tags are invisible in search and look broken when shared | LOW | `<title>`, `<meta description>`, OG title/description/image. 50-60 char titles, 150-160 char descriptions |

---

### Differentiators (Competitive Advantage)

These are not expected by default. A visitor who sees them remembers you over competing studios. Focus on the two or three that align with the "bold, modern, confident" design direction.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Founder-forward "Why Us" section | Small studios win on trust, not scale; putting real faces and credentials on the page converts skeptics into leads | LOW | Two founders, real photos (not illustrations), concise credentials. "You're hiring us, not a company" framing |
| Explicit 3-step process ("How We Work") | Process transparency is rare and builds disproportionate trust; SMBs fear being handed off to juniors or lost in workflow | LOW | Discover → Build → Ship. Visual numbered steps. Reduces pre-contact anxiety |
| AI-specific positioning in hero/services | Most dev agencies are generic; "AI-powered solutions for SMBs" is a differentiated, current hook | LOW | One targeted headline beats a generic one. Reference AI Automation, Smart Integrations explicitly |
| Vercel-like aesthetic (dark, typography-led) | Developer-confident design signals technical credibility without needing screenshots or case studies | MEDIUM | No stock photos, no illustrations. Pure typography + whitespace + layout. Reference: vercel.com |
| Semantic HTML + structured data | Signals technical excellence; helps search engines understand your service offering (LocalBusiness or ProfessionalService schema) | LOW | JSON-LD `Organization` or `ProfessionalService` schema. Increases rich snippet eligibility |
| Anchor-linked single-page navigation | Smooth in-page scrolling feels polished; lets visitors jump to services or contact without loading new pages | LOW | `#services`, `#contact` anchors in nav. No router needed — static HTML |

---

### Anti-Features (Commonly Requested, Often Problematic)

These look reasonable at first glance but hurt either conversion, scope, or the lean v1 goal.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Contact form with multiple fields | Feels more "professional" than email link | 81% of started forms are abandoned; form validation, spam protection, and email delivery are backend concerns that break the static constraint | Email CTA (`mailto:` link or displayed address). Reduces scope and friction simultaneously |
| Navigation menu with many links | Standard on websites; feels complete | Landing pages with full nav menus distract from the single conversion goal; each extra link is an escape hatch away from the CTA | Anchor links to on-page sections only. Max 4 items in sticky nav |
| Blog / CMS section | Establishes thought leadership | Content strategy requires ongoing investment; an empty blog signals neglect worse than no blog | Future milestone. Ship without it, add when content pipeline exists |
| Case studies / portfolio section | Proves capability | Requires client consent, copy, design assets, and ongoing updates; empty or thin case studies hurt more than they help | Testimonial quotes + stated outcomes ("saved 12 hours/week") instead of full case studies |
| Testimonial carousel / auto-scroll widget | Shows many testimonials | Carousels are ignored (banner blindness); users don't interact with them; complex to build and maintain | 2–3 static curated quotes, inline, styled consistently. Simple and scannable |
| Stock photo hero or illustration pack | Fills empty space, feels "designed" | AI-generated or generic stock visuals signal low effort; damages credibility with technical audiences | Typography + layout as the visual. This is the Vercel pattern — no imagery needed |
| Chat widget (Intercom, Crisp, etc.) | Offers real-time engagement | Adds third-party JS weight; SMB visitors rarely use it; creates false urgency to monitor and respond; conflicts with lean static goal | Email CTA handles this. Add async messaging only if response SLA can be met |
| Cookie consent banner | Legal compliance perception | For a static marketing site with no tracking cookies, analytics, or third-party scripts, a GDPR banner is pure noise and a UX disruption | Only add if analytics are added. Use privacy-respecting analytics (Plausible, Fathom) that don't require consent banners |
| Animated loading screen / splash | Feels premium, branded | Adds perceived latency before any content appears; penalized by Core Web Vitals (LCP, FID); visitors with slow connections abandon | Instant render is the premium experience. No splash needed |
| Social media follow buttons | Extends reach | Drives traffic away from the page before conversion; visitor leaves to check your Twitter, never comes back | Add social links only in footer, below the CTA fold. Keep them small |

---

## Feature Dependencies

```
Hero (headline + CTA)
    └──requires──> Contact path (CTA must point somewhere)

Social proof
    └──enhances──> Hero conversion rate
    └──enhances──> Services credibility

Founder section ("Why Us")
    └──enhances──> Social proof (founders are their own trust signal)

SEO foundations
    └──requires──> Semantic HTML structure
    └──enhances──> OG image (needs a dedicated asset)

"How We Work" (3-step process)
    └──enhances──> Contact conversion (reduces pre-contact anxiety)

Mobile-first layout
    └──requires──> All sections (must be designed mobile-first, not adapted)

Anchor navigation
    └──requires──> Section IDs on Hero, Services, Why Us, Process, Contact
```

### Dependency Notes

- **Contact path requires Hero CTA destination:** The CTA in the hero must resolve to something — email link or anchor scroll to the contact section. Decide this upfront so the hero CTA wording is accurate.
- **SEO foundations require semantic HTML:** `<h1>`, `<section>`, `<article>` landmarks must be in the HTML before meta tags provide value; they reinforce each other.
- **Social proof enhances everything but is not gated by anything:** Can be added as a standalone section between services and contact without blocking other work.
- **Anchor navigation requires section IDs:** All sections must have stable `id` attributes before nav links can be wired up. Easy to do from the start; painful to retrofit.

---

## MVP Definition

### Launch With (v1)

The minimum set that creates a credible first impression and captures inbound interest.

- [ ] Hero — bold headline (what + who), single sentence subheadline, one CTA ("Work With Us")
- [ ] Services section — 3 cards: AI Automation, Custom Development, Smart Integrations
- [ ] Founder-forward "Why Us" section — two founders, human framing, fast delivery, modern stack
- [ ] "How We Work" — 3-step numbered process (Discover → Build → Ship)
- [ ] Contact section — email CTA, no form
- [ ] Mobile-first responsive layout — all sections
- [ ] SEO foundations — title, meta description, OG tags, semantic HTML
- [ ] Anchor navigation — links to each section

### Add After Validation (v1.x)

Add these when early leads confirm the value prop is landing and you have content to populate them.

- [ ] 2–3 curated testimonial quotes — add when first clients provide feedback
- [ ] JSON-LD structured data (ProfessionalService schema) — add when organic traffic is a priority
- [ ] OG image asset — add before any social/paid promotion campaign

### Future Consideration (v2+)

Defer until product-market fit is clear and there is ongoing investment capacity.

- [ ] Blog / CMS — requires content pipeline and editorial discipline; wrong to ship empty
- [ ] Case studies — requires client consent, copy, design; ship when 2+ projects are complete
- [ ] Privacy-respecting analytics (Plausible/Fathom) — add when traffic data informs decisions
- [ ] Localization / i18n — add when targeting non-English markets

---

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Hero (headline + CTA) | HIGH | LOW | P1 |
| Mobile-first layout | HIGH | LOW | P1 |
| Services section (3 cards) | HIGH | LOW | P1 |
| Contact path (email CTA) | HIGH | LOW | P1 |
| SEO foundations (meta, OG, semantic HTML) | HIGH | LOW | P1 |
| Fast load / lean JS | HIGH | LOW | P1 |
| Founder-forward "Why Us" section | HIGH | LOW | P1 |
| "How We Work" 3-step process | HIGH | LOW | P1 |
| Anchor navigation | MEDIUM | LOW | P1 |
| Testimonial quotes (2–3 static) | HIGH | LOW | P2 |
| OG image asset | MEDIUM | LOW | P2 |
| JSON-LD structured data | MEDIUM | LOW | P2 |
| Blog / CMS | MEDIUM | HIGH | P3 |
| Case studies | HIGH | HIGH | P3 |
| Analytics | MEDIUM | LOW | P3 |

**Priority key:**
- P1: Must have for launch — every item is LOW cost and HIGH/MEDIUM value
- P2: Should have — add in first iteration after launch
- P3: Defer — requires ongoing investment or is not yet warranted

---

## Competitor Feature Analysis

Reference pattern: Vercel.com (stated design reference in PROJECT.md)

| Feature | Vercel pattern | Typical generic agency | Our Approach |
|---------|---------------|----------------------|--------------|
| Hero | Bold single headline, single CTA, dark background | Rotating headlines, multiple CTAs, hero image | Follow Vercel: one headline, one CTA, no hero image |
| Social proof | Logo parade + curated quotes | Testimonial carousel or star ratings | 2–3 static quotes inline, no carousel |
| Services | Feature cards with icon + short copy | Long service pages with pricing tables | 3 focused cards, outcome-oriented copy |
| Team/founders | Minimal or absent (product-first) | Grid of headshots with bios | Founder-forward (differentiator for 2-person studio) |
| Process | Not shown (product-first) | Waterfall project phases | 3-step numbered process (Discover → Build → Ship) |
| Contact | Signup form / sales form | Multi-field contact form | Email CTA only for v1 |
| Navigation | Minimal sticky header | Full site nav with dropdowns | Anchor-only nav, max 4 items |
| Performance | Exceptional (sub-1s) | Variable | Lean static: minimal JS, sub-2s target |

---

## Sources

- [Evil Martians: We studied 100 dev tool landing pages — here's what really works in 2025](https://evilmartians.com/chronicles/we-studied-100-devtool-landing-pages-here-is-what-actually-works-in-2025) — HIGH confidence, primary industry research
- [Orizon: Our 10 Favourite Landing Page Designs in Fall 2025 and Why They Convert](https://www.orizon.co/blog/our-10-favourite-landing-page-designs-in-fall-2025-and-why-they-convert) — MEDIUM confidence, practitioner analysis
- [Moosend: 10 Landing Page Mistakes You Should Absolutely Avoid in 2025](https://moosend.com/blog/landing-page-mistakes/) — MEDIUM confidence, verified against multiple sources
- [Lapa Ninja: Studio Landing Page Examples](https://www.lapa.ninja/category/studio/) — MEDIUM confidence, pattern observation from gallery
- [Lapa Ninja: Agency Landing Page Examples](https://www.lapa.ninja/category/agency/) — MEDIUM confidence, pattern observation from gallery
- [wisernotify: 10 High-Impact Social Proof Landing Page Examples (2025)](https://wisernotify.com/blog/landing-page-social-proof/) — MEDIUM confidence, industry stats
- [Blogging Wizard: 27 Top Landing Page Statistics for 2026](https://bloggingwizard.com/landing-page-statistics/) — MEDIUM confidence, aggregated stats
- [Evil Martians devtool landing page study] — 100-page research sample, HIGH signal for developer audience

---

*Feature research for: Developer studio / AI agency landing page (ApexCode)*
*Researched: 2026-03-26*
