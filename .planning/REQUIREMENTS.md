# Requirements: ApexCode

**Defined:** 2026-03-26
**Core Value:** First impression that converts — visitor lands, understands what Apex Code does, trusts the founders, and knows how to reach out.

## v1 Requirements

### Foundation

- [x] **FOUND-01**: Site is built with Astro 5.x and TypeScript (strict mode)
- [x] **FOUND-02**: Tailwind CSS v4 is configured via `@theme {}` blocks (no tailwind.config.js)
- [x] **FOUND-03**: Project deploys to Vercel with zero-config static output
- [x] **FOUND-04**: All layout is mobile-first (designed for mobile, scaled up to desktop)
- [x] **FOUND-05**: Page loads in under 3 seconds on mobile (lean bundle, no unnecessary JS)
- [x] **FOUND-06**: Near-black background color (`#0a0a0a` or equivalent, not pure `#000000`)

### Navigation

- [x] **NAV-01**: Sticky header with anchor links to each on-page section (max 4 items)
- [ ] **NAV-02**: All sections have stable `id` attributes (`#services`, `#why-us`, `#process`, `#contact`)

### Hero

- [ ] **HERO-01**: Bold headline communicates what Apex Code does and who it's for in one sentence
- [ ] **HERO-02**: Single subheadline (one sentence, no more)
- [ ] **HERO-03**: Single CTA button ("Work With Us" or "Get in Touch") — no secondary CTA

### Services

- [ ] **SERV-01**: Three service cards: AI Automation, Custom Development, Smart Integrations
- [ ] **SERV-02**: Each card has a title and a short outcome-oriented description (2–3 sentences max)

### Why Us

- [ ] **WHY-01**: Section presents both founders by name with a brief human-readable description
- [ ] **WHY-02**: Section communicates: human touch, fast delivery, modern stack (as distinct differentiators)

### How We Work

- [ ] **PROC-01**: Three-step numbered process: Discover → Build → Ship
- [ ] **PROC-02**: Each step has a title and one-sentence description

### Contact

- [ ] **CONT-01**: Contact section includes a visible email address or `mailto:` CTA link
- [ ] **CONT-02**: No contact form — email CTA only

### SEO & Meta

- [x] **SEO-01**: Page has `<title>` tag (50–60 characters)
- [x] **SEO-02**: Page has `<meta name="description">` (150–160 characters)
- [x] **SEO-03**: Page has Open Graph tags: `og:title`, `og:description`, `og:image`, `og:url`
- [ ] **SEO-04**: All sections use semantic HTML (`<header>`, `<section>`, `<footer>`, `<h1>`/`<h2>`)
- [x] **SEO-05**: `sitemap.xml` is generated and accessible
- [x] **SEO-06**: `robots.txt` is generated and accessible

## v2 Requirements

### Social Proof

- **PROOF-01**: 2–3 static testimonial quotes from clients (add when first clients provide feedback)
- **PROOF-02**: JSON-LD `ProfessionalService` structured data schema (add when organic traffic is a priority)

### Assets

- **ASSET-01**: Custom OG image asset (typography-based card, generated) — add before any social promotion

### Analytics

- **ANALY-01**: Privacy-respecting analytics (Plausible or Fathom, no consent banner) — add when traffic data informs decisions

## Out of Scope

| Feature | Reason |
|---------|--------|
| Contact form | 81% form abandonment rate; static constraint; email CTA is higher-converting at this stage |
| Authentication / backend / database | No product to sell; pure static site |
| Blog / CMS | Requires content pipeline; empty blog signals neglect |
| Case studies / portfolio | Requires client consent and copy; ship when 2+ projects complete |
| Chat widget | Third-party JS weight; conflicts with lean performance goal |
| Cookie banner | No tracking scripts or analytics in v1; banner is pure noise |
| Splash screen / loading animation | Penalized by Core Web Vitals; instant render is the premium experience |
| Social media follow buttons above the CTA fold | Drives traffic away before conversion |
| Testimonial carousel / auto-scroll | Banner blindness; complex; static quotes convert better |
| Stock photos or illustrations | Damages credibility with technical audiences; Vercel aesthetic uses none |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 | Complete |
| FOUND-02 | Phase 1 | Complete |
| FOUND-03 | Phase 1 | Complete |
| FOUND-04 | Phase 1 | Complete |
| FOUND-05 | Phase 1 | Complete |
| FOUND-06 | Phase 1 | Complete |
| NAV-01 | Phase 1 | Complete |
| NAV-02 | Phase 2 | Pending |
| HERO-01 | Phase 2 | Pending |
| HERO-02 | Phase 2 | Pending |
| HERO-03 | Phase 2 | Pending |
| SERV-01 | Phase 2 | Pending |
| SERV-02 | Phase 2 | Pending |
| WHY-01 | Phase 2 | Pending |
| WHY-02 | Phase 2 | Pending |
| PROC-01 | Phase 2 | Pending |
| PROC-02 | Phase 2 | Pending |
| CONT-01 | Phase 2 | Pending |
| CONT-02 | Phase 2 | Pending |
| SEO-01 | Phase 1 | Complete |
| SEO-02 | Phase 1 | Complete |
| SEO-03 | Phase 1 | Complete |
| SEO-04 | Phase 2 | Pending |
| SEO-05 | Phase 1 | Complete |
| SEO-06 | Phase 1 | Complete |

**Coverage:**
- v1 requirements: 24 total
- Mapped to phases: 24 (Phase 1: 12, Phase 2: 12)
- Unmapped: 0 ✓
- Note: Phase 3 (Launch) is a verification gate — no new requirements; it confirms Phases 1 and 2 work end-to-end in production

---
*Requirements defined: 2026-03-26*
*Last updated: 2026-03-26 after roadmap creation*
