# Phase 2: Content — Research

**Researched:** 2026-03-26
**Domain:** Astro content sections, Tailwind v4 layout utilities, semantic HTML, marketing copy
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- **D-01:** Use draft placeholder copy for all sections. The planner writes realistic, requirement-accurate copy. User reviews and refines before launch.
- **D-02:** Contact email is `hello@apexcode.dev` — use this verbatim in `mailto:` link.
- **D-03:** Hero height is full viewport height (`min-h-screen` or `100dvh`) minus the sticky header (56px). Content is vertically centered in the remaining space.
- **D-04:** Hero content alignment is centered — headline, subheadline, and CTA button all centered horizontally within `max-w-5xl mx-auto`.
- **D-05:** CTA button label is "Work With Us" — scrolls to `#contact` via anchor link. Single CTA, no secondary CTA (HERO-03).
- **D-06:** Service cards are icon-free — title and description text only. No icon library, no inline SVGs.
- **D-07:** Card style is bordered cards — `bg-surface-raised` background and 1px `border-border`. Three cards in responsive grid: `grid-cols-1 md:grid-cols-3`.
- **D-08:** Why Us section presents founders by name only — no headshots or avatars. Layout is Claude's discretion.
- **D-09:** Section IDs: `id="services"`, `id="why-us"`, `id="process"`, `id="contact"`, `id="hero"`.

### Claude's Discretion

- Section spacing and padding (follow 8-point scale from Phase 1 UI-SPEC)
- Exact heading copy for "Why Us" and "How We Work" section titles
- Whether to include a subtle section divider between sections or rely on spacing
- Draft copy for all sections (guided by REQUIREMENTS.md and project brief)

### Deferred Ideas (OUT OF SCOPE)

None — discussion stayed within Phase 2 scope.
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|------------------|
| NAV-02 | All sections have stable `id` attributes (`#services`, `#why-us`, `#process`, `#contact`) | D-09 locks IDs; `[id] { scroll-margin-top: 56px }` already in global.css |
| HERO-01 | Bold headline communicates what Apex Code does and who it's for in one sentence | Copy guidance section covers tone and structure |
| HERO-02 | Single subheadline (one sentence, no more) | Copy guidance section; typography patterns apply |
| HERO-03 | Single CTA button "Work With Us" — no secondary CTA | D-05 locked; CTA pattern documented |
| SERV-01 | Three service cards: AI Automation, Custom Development, Smart Integrations | Grid pattern and card structure documented |
| SERV-02 | Each card has title and short outcome-oriented description (2–3 sentences max) | Copy guidance for services; card component pattern |
| WHY-01 | Section presents both founders by name with a brief human-readable description | Founder layout pattern documented |
| WHY-02 | Section communicates: human touch, fast delivery, modern stack as distinct differentiators | Copy guidance section covers differentiator messaging |
| PROC-01 | Three-step numbered process: Discover → Build → Ship | CSS counter pattern documented; no JS needed |
| PROC-02 | Each step has a title and one-sentence description | Copy guidance section; step component pattern |
| CONT-01 | Contact section includes a visible email address or `mailto:` CTA link | mailto pattern documented; D-02 locks the address |
| CONT-02 | No contact form — email CTA only | Confirmed static-only approach, no form processing needed |
| SEO-04 | All sections use semantic HTML (`<header>`, `<section>`, `<footer>`, `<h1>`/`<h2>`) | Section landmark patterns documented; heading hierarchy rules |
</phase_requirements>

---

## Summary

Phase 2 builds five static Astro section components and assembles them in `src/pages/index.astro`. All components are pure `.astro` files — no JavaScript, no client-side framework, no props required on most sections. The design system is fully established in Phase 1; Phase 2 consumes tokens without modifying them.

The primary technical concerns are: (1) correct semantic HTML structure so each section is a proper landmark region accessible to screen readers, (2) the hero height calculation using `min-h-[calc(100dvh-56px)]` to account for the sticky header, (3) responsive grid for service cards using `grid-cols-1 md:grid-cols-3`, and (4) a CSS-only numbered process list using either CSS counters or explicit number spans.

Copy tone is "problem-first, outcome-oriented, developer-confident" as established in the Phase 1 UI-SPEC. All five sections use placeholder copy that reads as real copy from day one — no lorem ipsum.

**Primary recommendation:** Build each section as a standalone zero-props `.astro` file. Wire them into `index.astro` in order. Use `aria-labelledby` on each `<section>` to make every section a proper landmark region.

---

## Project Constraints (from CLAUDE.md)

- TypeScript always — all files must be `.astro` or `.ts`. No `.js` files.
- Named exports only. No default exports except pages (`index.astro` is the exception).
- `const` over `let`. Never `var`.
- Early returns to avoid nesting.
- No hardcoded strings in UI — however, this is a static marketing site with no i18n system. Copy is hardcoded in `.astro` templates per REQUIREMENTS.md scope. No i18n library is in the stack.
- No `console.log` in committed code.
- No client-side JS frameworks — confirmed by CLAUDE.md and REQUIREMENTS.md FOUND-05.
- Mobile-first layouts — Tailwind classes default to mobile; `md:` prefix for desktop overrides.
- Static site only — no server, no database, no auth.

---

## Standard Stack

### Core (already installed — no new packages needed)

| Library | Version | Purpose | Status |
|---------|---------|---------|--------|
| Astro | 6.0.8 | Static site generator, component model | Installed |
| TypeScript | 5.x (bundled) | Language — strict mode | Active via `tsconfig.json` |
| Tailwind CSS | 4.2.2 | Utility-first CSS via `@tailwindcss/vite` | Installed |

### Design Tokens (already declared in `src/styles/global.css`)

| Token | CSS Variable | Tailwind Utility | Value |
|-------|-------------|-----------------|-------|
| Page background | `--color-surface` | `bg-surface` | `#0a0a0a` |
| Card/header background | `--color-surface-raised` | `bg-surface-raised` | `#111111` |
| Primary text | `--color-text-primary` | `text-text-primary` | `#f5f5f5` |
| Muted text | `--color-text-muted` | `text-text-muted` | `#a1a1a1` |
| Border | `--color-border` | `border-border` | `#1f1f1f` |
| Accent (interactive) | `--color-accent` | `bg-accent`, `text-accent` | `#ffffff` |

**No new packages required for Phase 2.** All dependencies are already installed.

---

## Architecture Patterns

### Recommended Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── SiteHeader.astro    (Phase 1 — do not modify)
│   │   └── SiteFooter.astro    (Phase 1 — do not modify)
│   └── sections/
│       ├── HeroSection.astro   (Phase 2 — NEW)
│       ├── ServicesSection.astro   (Phase 2 — NEW)
│       ├── WhyUsSection.astro  (Phase 2 — NEW)
│       ├── ProcessSection.astro    (Phase 2 — NEW)
│       └── ContactSection.astro    (Phase 2 — NEW)
├── layouts/
│   └── Layout.astro            (Phase 1 — do not modify)
├── lib/
│   └── metadata.ts             (Phase 1 — do not modify)
├── pages/
│   └── index.astro             (Phase 2 — REPLACE placeholder comment with imports)
└── styles/
    └── global.css              (Phase 1 — do not modify)
```

**Convention:** Section components live in `src/components/sections/` — separate from layout chrome in `src/components/layout/`. This mirrors the SiteHeader/SiteFooter convention Phase 1 established.

---

### Pattern 1: Static Section Component (No Props)

All five content sections are fully static. No data fetching, no dynamic values. The correct pattern is a `.astro` file with an empty frontmatter (or import-only frontmatter) and a semantic HTML template.

```astro
---
// No imports needed for pure static sections
// Frontmatter fence is still required for consistency and extensibility
---

<section id="services" aria-labelledby="services-heading" class="py-16 md:py-24">
  <div class="max-w-5xl mx-auto px-4">
    <h2 id="services-heading" class="text-[22px] md:text-[28px] font-semibold leading-tight tracking-[-0.01em] text-text-primary mb-12">
      What We Build
    </h2>
    <!-- section content -->
  </div>
</section>
```

**Key rules:**
- Every section gets `id`, `aria-labelledby`, and a matching `id` on the `<h2>`. This makes the `<section>` a proper ARIA landmark region (MDN-verified).
- The `id` on the `<section>` matches D-09. The `id` on the `<h2>` is `{section-id}-heading` (e.g., `services-heading`) — do not reuse the section ID on the heading.
- `max-w-5xl mx-auto px-4` is the universal inner container — consistent with SiteHeader and SiteFooter.
- Section IDs already have `scroll-margin-top: 56px` via global.css `[id]` selector.

---

### Pattern 2: Hero Section — Full-Height Minus Header

Decision D-03 requires hero height = full viewport minus 56px header. The Tailwind v4 arbitrary value `min-h-[calc(100dvh-56px)]` accomplishes this.

```astro
---
---

<section
  id="hero"
  aria-label="Hero"
  class="min-h-[calc(100dvh-56px)] flex items-center justify-center"
>
  <div class="max-w-5xl mx-auto px-4 text-center">
    <h1 class="text-[32px] md:text-[48px] font-semibold leading-none tracking-[-0.02em] text-text-primary mb-6">
      We build AI-powered software for businesses that can't afford to waste time.
    </h1>
    <p class="text-base font-normal leading-relaxed text-text-muted mb-10 max-w-2xl mx-auto">
      Apex Code is a two-person studio that ships AI automation, custom tools, and smart integrations — built to fit your business, not the other way around.
    </p>
    <a
      href="#contact"
      class="inline-block bg-accent text-surface font-semibold text-base px-8 py-3 rounded hover:opacity-90 transition-opacity duration-150"
    >
      Work With Us
    </a>
  </div>
</section>
```

**Notes:**
- `100dvh` is Baseline Widely Available as of June 2025. Browser support ~95% globally as of 2026. Safe to use without fallback.
- `min-h-[calc(100dvh-56px)]` not `h-[calc(100dvh-56px)]` — `min-h` allows the section to grow if content exceeds viewport height on small screens.
- Hero section uses `aria-label="Hero"` (not `aria-labelledby`) because using the h1 as the landmark label would conflict with screen readers announcing the h1 twice in some implementations. A plain label is cleaner here.
- CTA button: `bg-accent` = `#ffffff`, `text-surface` = `#0a0a0a` — white button with near-black text. Contrast ratio: `#ffffff` on `#ffffff`... wait — `text-surface` = `#0a0a0a` on `bg-accent` = `#ffffff`: contrast ratio ~19:1 (AAA). Correct.
- `rounded` without a size suffix = Tailwind's default `border-radius: 0.25rem`. Acceptable. Add `rounded-md` (6px) if a slightly more modern look is preferred — Claude's discretion.

---

### Pattern 3: Service Cards — Responsive 3-Column Grid

D-07 specifies: bordered cards, `bg-surface-raised`, `border-border`, `grid-cols-1 md:grid-cols-3`.

```astro
---
---

<section id="services" aria-labelledby="services-heading" class="py-16 md:py-24">
  <div class="max-w-5xl mx-auto px-4">
    <h2 id="services-heading" class="text-[22px] md:text-[28px] font-semibold leading-tight tracking-[-0.01em] text-text-primary mb-12 text-center">
      What We Build
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-surface-raised border border-border rounded-md p-6">
        <h3 class="text-base font-semibold text-text-primary mb-3">AI Automation</h3>
        <p class="text-sm font-normal leading-relaxed text-text-muted">
          We replace manual, repetitive workflows with AI systems that run while you sleep. Less overhead, faster turnaround, fewer errors.
        </p>
      </div>
      <!-- repeat for Custom Development, Smart Integrations -->
    </div>
  </div>
</section>
```

**Notes:**
- Card titles use `<h3>` because section title is `<h2>`. Heading hierarchy: h1 (hero) → h2 (section) → h3 (card title). Skipping to h4 would be a WCAG violation.
- D-06: no icons. Title + description only per decision.
- `gap-6` = 24px gap (lg on spacing scale).
- `p-6` = 24px internal padding (lg).
- `rounded-md` = 6px radius for cards, consistent with modern Vercel aesthetic.
- Cards are `<div>` not `<article>` — they are not self-contained or redistributable content, just layout sub-units.

---

### Pattern 4: Why Us — Two-Column Founder Layout

D-08: founders by name only, no headshots. Layout is Claude's discretion. Two-column on desktop, stacked on mobile.

```astro
---
---

<section id="why-us" aria-labelledby="why-us-heading" class="py-16 md:py-24">
  <div class="max-w-5xl mx-auto px-4">
    <h2 id="why-us-heading" class="text-[22px] md:text-[28px] font-semibold leading-tight tracking-[-0.01em] text-text-primary mb-4 text-center">
      Why Apex Code
    </h2>
    <p class="text-base leading-relaxed text-text-muted text-center mb-12 max-w-2xl mx-auto">
      Two founders. No account managers. You work directly with the people building your product.
    </p>

    <!-- Differentiators: WHY-02 -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
      <div class="text-center">
        <p class="text-base font-semibold text-text-primary mb-2">Human Touch</p>
        <p class="text-sm text-text-muted leading-relaxed">Direct access to the founders who built your solution — no tickets, no handoffs.</p>
      </div>
      <!-- Fast Delivery, Modern Stack -->
    </div>

    <!-- Founders: WHY-01 -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="bg-surface-raised border border-border rounded-md p-6">
        <p class="text-base font-semibold text-text-primary mb-2">[Founder Name 1]</p>
        <p class="text-sm text-text-muted leading-relaxed">...</p>
      </div>
      <div class="bg-surface-raised border border-border rounded-md p-6">
        <p class="text-base font-semibold text-text-primary mb-2">[Founder Name 2]</p>
        <p class="text-sm text-text-muted leading-relaxed">...</p>
      </div>
    </div>
  </div>
</section>
```

**Notes:**
- WHY-02 (human touch, fast delivery, modern stack) and WHY-01 (founders by name) are both addressed within one section.
- Differentiator cards use `<div>` with `text-center` — no bordered card needed here. Keeps visual weight lighter than the service cards.
- Founder cards use the same bordered card treatment as services for visual consistency (same `bg-surface-raised border border-border rounded-md p-6`).
- Founder names are `<p class="font-semibold">` not `<h3>` because the context does not form a heading hierarchy requiring sub-level headings. If the section structure evolves, elevate to h3.

---

### Pattern 5: Process Section — CSS Counter Numbered Steps

PROC-01 and PROC-02 require three numbered steps: Discover → Build → Ship. The cleanest CSS-only approach uses explicit number spans rather than CSS counters — this avoids pseudo-element complexity and is more readable in markup.

```astro
---
---

<section id="process" aria-labelledby="process-heading" class="py-16 md:py-24">
  <div class="max-w-5xl mx-auto px-4">
    <h2 id="process-heading" class="text-[22px] md:text-[28px] font-semibold leading-tight tracking-[-0.01em] text-text-primary mb-12 text-center">
      How We Work
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div class="flex flex-col">
        <span class="text-[48px] font-semibold leading-none text-border mb-4 select-none" aria-hidden="true">01</span>
        <h3 class="text-base font-semibold text-text-primary mb-2">Discover</h3>
        <p class="text-sm text-text-muted leading-relaxed">We learn your workflow, pain points, and goals in a focused session — no lengthy discovery phase.</p>
      </div>
      <!-- 02 Build, 03 Ship -->
    </div>
  </div>
</section>
```

**Notes:**
- Large number (`text-[48px]`) in `text-border` color (`#1f1f1f`) — visually present as a design element but low-contrast enough not to compete with the heading. This creates depth without icons.
- `aria-hidden="true"` on the number span — screen readers will still encounter the `<h3>` with "Discover", "Build", "Ship". The number is decorative.
- `select-none` prevents accidental text selection of the large decorative number.
- Numbers `01`, `02`, `03` are hardcoded strings — not generated by CSS counters. This is simpler, more maintainable, and eliminates the CSS counter edge cases (counter-reset scope, pseudo-element content in Tailwind).
- `text-border` = `#1f1f1f`. Contrast ratio `#1f1f1f` on `#0a0a0a` ≈ 1.2:1 — intentionally very low, purely decorative. `aria-hidden="true"` ensures this never violates accessibility rules.

---

### Pattern 6: Contact Section — Email CTA Only

CONT-01 and CONT-02: visible email address, `mailto:` link, no form.

```astro
---
---

<section id="contact" aria-labelledby="contact-heading" class="py-16 md:py-24">
  <div class="max-w-5xl mx-auto px-4 text-center">
    <h2 id="contact-heading" class="text-[22px] md:text-[28px] font-semibold leading-tight tracking-[-0.01em] text-text-primary mb-4">
      Ready to Build?
    </h2>
    <p class="text-base leading-relaxed text-text-muted mb-10 max-w-xl mx-auto">
      Tell us what you're working on. We'll get back to you within one business day.
    </p>
    <a
      href="mailto:hello@apexcode.dev"
      class="inline-block bg-accent text-surface font-semibold text-base px-8 py-3 rounded-md hover:opacity-90 transition-opacity duration-150"
    >
      hello@apexcode.dev
    </a>
  </div>
</section>
```

**Notes:**
- The CTA button label is the email address itself — satisfies both CONT-01 (visible email) and CONT-02 (email CTA only) in a single element.
- `mailto:` links on static sites are the recommended pattern for email contact per REQUIREMENTS.md rationale.
- Button styling matches the Hero CTA button exactly (`bg-accent text-surface`) — consistent primary action style.
- `max-w-xl mx-auto` on the subheadline keeps line length readable on wide viewports.

---

### Pattern 7: Assembling index.astro

Replace the placeholder comment in `src/pages/index.astro` with imports and renders of all five section components:

```astro
---
import Layout from '../layouts/Layout.astro';
import SiteHeader from '../components/layout/SiteHeader.astro';
import SiteFooter from '../components/layout/SiteFooter.astro';
import HeroSection from '../components/sections/HeroSection.astro';
import ServicesSection from '../components/sections/ServicesSection.astro';
import WhyUsSection from '../components/sections/WhyUsSection.astro';
import ProcessSection from '../components/sections/ProcessSection.astro';
import ContactSection from '../components/sections/ContactSection.astro';
---

<Layout>
  <SiteHeader />
  <main id="main-content">
    <HeroSection />
    <ServicesSection />
    <WhyUsSection />
    <ProcessSection />
    <ContactSection />
  </main>
  <SiteFooter />
</Layout>
```

**Notes:**
- Section order matches CONTEXT.md: Hero → Services → Why Us → How We Work → Contact.
- No props passed — all sections are self-contained static components.
- `<main id="main-content">` already exists in Phase 1 output. The only change is replacing `{/* Content sections added in Phase 2 */}` with the five component imports and renders.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Smooth scroll to anchor | JS scroll handler | CSS `scroll-behavior: smooth` on `html` | Already set in global.css; zero JS, works across all browsers |
| Sticky header scroll offset | JS `getBoundingClientRect` | CSS `scroll-margin-top: 56px` on `[id]` | Already set in global.css; declarative, performant |
| Numbered steps | CSS counter or JS | Hardcoded `01`, `02`, `03` text spans | Three static steps never change; CSS counters add complexity for no gain |
| Email obfuscation | JS email scrambler | Plain `mailto:` link | No anti-spam system is in scope; obfuscation adds JS weight with marginal benefit |
| Responsive nav reveal | JS IntersectionObserver | CSS `hidden md:flex` | Already implemented in SiteHeader.astro; no JS needed |
| Card hover effects | JS mouse tracking | CSS `hover:` variants in Tailwind | Tailwind hover utilities generate pure CSS; no JS |

---

## Semantic HTML Structure

### Required Heading Hierarchy

A single page must have exactly one `<h1>`. Each section uses `<h2>`. Card titles within sections use `<h3>`. Do not skip levels.

```
<body>
  <header>              ← SiteHeader (Phase 1)
    <nav>
  <main>
    <section id="hero">
      <h1>             ← Only h1 on the page (HERO-01)
    <section id="services">
      <h2>             ← "What We Build"
        <h3>           ← "AI Automation"
        <h3>           ← "Custom Development"
        <h3>           ← "Smart Integrations"
    <section id="why-us">
      <h2>             ← "Why Apex Code"
        <h3>           ← Process step titles (if used)
    <section id="process">
      <h2>             ← "How We Work"
        <h3>           ← "Discover", "Build", "Ship"
    <section id="contact">
      <h2>             ← "Ready to Build?"
  <footer>             ← SiteFooter (Phase 1)
```

### Landmark Regions

Each `<section>` must have `aria-labelledby` pointing to its `<h2 id="...">`. This makes the section a proper ARIA region landmark (MDN-verified). Screen reader users can then navigate between sections using landmark shortcuts.

Exception: The Hero `<section>` uses `aria-label="Hero"` (not `aria-labelledby`) to avoid the h1 being announced twice by some screen readers.

Source: [MDN — ARIA region role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/region_role)

---

## Copy Guidance

### Tone Rules (from UI-SPEC and REQUIREMENTS.md)

- **Problem-first:** Lead with the pain before the solution. "Businesses waste hours on manual tasks" before "we automate them."
- **Outcome-oriented:** State results, not features. "Ship in days" not "agile process."
- **Developer-confident:** No corporate cliché. No "cutting-edge solutions." No "leverage synergies." No "we build the future."
- **Specific:** Numbers and specifics convert better than vague claims. "Within one business day" not "fast response."
- **Human:** Two real founders, not a faceless agency. Use "we" naturally.

### Section-by-Section Copy Structure

**Hero (HERO-01, HERO-02)**
- h1: One sentence. Subject = Apex Code (implied). Verb = action we take. Object = outcome for client. Target = SMB audience.
- Draft: "We build AI-powered software for businesses that can't afford to waste time."
- Subheadline: One sentence expanding who we are. Draft: "Apex Code is a two-person studio that ships AI automation, custom tools, and smart integrations — built to fit your business, not the other way around."
- CTA: "Work With Us" (locked D-05)

**Services (SERV-01, SERV-02)**
- Section heading: "What We Build" (action-oriented, not "Our Services")
- Three cards, title + 2–3 sentence outcome-first description:
  - **AI Automation:** Replace manual workflows with AI. Outcome: less overhead, fewer errors.
  - **Custom Development:** Software that fits the actual workflow. Outcome: no workarounds, no bloat.
  - **Smart Integrations:** Connect the tools already in use. Outcome: data flows without manual re-entry.

**Why Us (WHY-01, WHY-02)**
- Section heading: "Why Apex Code" (direct, not "About Us")
- Differentiators (WHY-02): Human Touch, Fast Delivery, Modern Stack — each with one-line explanation
- Founders (WHY-01): Name + 2–3 sentence bio emphasizing real experience, not credentials. No titles or roles unless naturally part of the sentence.

**How We Work (PROC-01, PROC-02)**
- Section heading: "How We Work"
- Three steps with names and one sentence each:
  - **01 Discover:** "We learn your workflow, pain points, and goals in a focused session — no lengthy discovery phase."
  - **02 Build:** "We design and build incrementally, showing you working software within days."
  - **03 Ship:** "We deploy, hand off, and stay available — no disappearing after launch."

**Contact (CONT-01, CONT-02)**
- Section heading: "Ready to Build?"
- One-sentence invitation: "Tell us what you're working on. We'll get back to you within one business day."
- CTA: email address as button label (`hello@apexcode.dev`)

---

## Common Pitfalls

### Pitfall 1: Using the Section ID on the H2

**What goes wrong:** `<section id="services"><h2 id="services">` — same id on section and heading.
**Why it happens:** Developer reuses the section ID for the ARIA link.
**How to avoid:** Section gets `id="services"` (for nav anchor). Heading gets a distinct `id="services-heading"` (for `aria-labelledby`). Never duplicate IDs in HTML — the browser takes only the first.

### Pitfall 2: Wrong Viewport Unit on Hero

**What goes wrong:** Using `min-h-screen` (100vh) instead of `min-h-[calc(100dvh-56px)]`.
**Why it happens:** `min-h-screen` is the default Tailwind viewport utility.
**How to avoid:** On mobile, `100vh` includes the browser chrome (address bar). The address bar can cover 56-80px on mobile, making the hero appear smaller than intended. Use `100dvh` which adjusts dynamically. The `calc(100dvh-56px)` also subtracts the header. `dvh` is Baseline Widely Available as of June 2025.

### Pitfall 3: Using Raw Hex Values Instead of Tokens

**What goes wrong:** `class="bg-[#111111]"` instead of `class="bg-surface-raised"`.
**Why it happens:** Developer forgets that `@theme {}` variables auto-generate Tailwind utilities.
**How to avoid:** Always use token names. Tailwind v4 maps `--color-surface-raised` → `bg-surface-raised`, `text-surface-raised`, `border-surface-raised` automatically. Using raw hex bypasses the token system and creates maintenance debt.

### Pitfall 4: Section Without Accessible Name

**What goes wrong:** `<section id="services">` with no `aria-labelledby` or `aria-label`.
**Why it happens:** Sections look semantically correct in HTML but are invisible to screen reader landmark navigation.
**How to avoid:** A `<section>` only becomes a landmark region when it has an accessible name. Always pair `aria-labelledby="section-id-heading"` on every `<section>`. Source: MDN ARIA region role documentation.

### Pitfall 5: Skipping Heading Levels

**What goes wrong:** `<h1>` in hero, `<h3>` in service cards, no `<h2>` for section titles.
**Why it happens:** Developer treats section title as "secondary" and jumps to h3 for card-level headings.
**How to avoid:** Every section needs an `<h2>` as its own title, even if visually subdued. Card titles are `<h3>`. Never skip from h1 to h3. WCAG 1.3.1 — heading structure creates the accessible document outline.

### Pitfall 6: Mobile Nav Links Hidden = Mobile Users Stuck

**What goes wrong:** `hidden md:flex` on nav means mobile users have no nav links — and no hamburger was built in Phase 1.
**Why it happens:** Phase 1 decision to defer mobile nav.
**How to avoid:** Mobile users navigate via scrolling. This is intentional per Phase 1 decisions. Do NOT add a hamburger menu in Phase 2 unless specifically requested — that is out of scope. The hero CTA "Work With Us" provides the primary mobile conversion path.

### Pitfall 7: CTA Button — Using `<button>` Instead of `<a>`

**What goes wrong:** `<button>Work With Us</button>` for the hero CTA.
**Why it happens:** Instinctive use of `<button>` for CTAs.
**How to avoid:** The CTA navigates to an anchor (`#contact`). Use `<a href="#contact">` — that is semantically correct for navigation. `<button>` is for actions, not navigation.

### Pitfall 8: Forgetting `text-surface` on the CTA Button Text

**What goes wrong:** CTA button uses `bg-accent` (white) but text is also white → invisible button text.
**Why it happens:** Default text color from `body` is `text-text-primary` (#f5f5f5 — off-white). On a white button, this disappears.
**How to avoid:** CTA button must explicitly set `text-surface` (which maps to `#0a0a0a`) or `text-black` to ensure visible contrast. Pattern: `bg-accent text-surface`.

### Pitfall 9: Section Padding Inconsistency

**What goes wrong:** Some sections get `py-16` and others get `py-24` with no pattern, creating an uneven page rhythm.
**Why it happens:** Ad-hoc padding choices during implementation.
**How to avoid:** Follow the 8-point spacing scale from UI-SPEC. Standard section padding: `py-16 md:py-24` (64px mobile, 96px desktop) for all content sections. Hero is full viewport height so padding is irrelevant there. This creates predictable rhythm.

---

## Integration Notes

### How Sections Wire into index.astro

1. Replace the `{/* Content sections added in Phase 2 */}` comment in `src/pages/index.astro` with five imports (in frontmatter) and five component renders (in template), in order.
2. No props needed — each component is self-contained.
3. Section order must be: HeroSection → ServicesSection → WhyUsSection → ProcessSection → ContactSection.
4. The `<main id="main-content">` wrapper remains — do not remove it (skip-link target from Phase 1 Layout.astro).

### Scroll Behavior Already Handled

- `scroll-behavior: smooth` on `<html>` (global.css) — no JS needed
- `scroll-margin-top: 56px` on all `[id]` elements (global.css) — applies automatically to all five section IDs
- Nav links in SiteHeader.astro already point to `#services`, `#why-us`, `#process`, `#contact`
- D-05 hero CTA `href="#contact"` relies on the same smooth scroll behavior

### Build Verification

After implementing all five sections, run `npm run build` from the project root to confirm:
- Zero TypeScript errors
- Zero Astro compilation errors
- Static output in `dist/` with all sections rendered

Run `npm run preview` to verify scroll behavior, CTA anchor links, and mobile layout at 375px viewport width.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `100vh` for hero height | `100dvh` (dynamic viewport height) | CSS Baseline June 2025 | Fixes mobile browser chrome overlap; use `dvh` |
| `tailwind.config.js` JS file | `@theme {}` blocks in CSS | Tailwind v4 (2025) | No JS config file; token changes go in global.css only |
| CSS counter pseudo-elements for numbering | Explicit hardcoded number spans | Always available | Simpler markup, no CSS specificity issues, fully predictable |
| `aria-label` on nameless sections | `aria-labelledby` referencing visible h2 | ARIA best practice 2023+ | Visible label preferred over invisible label per ARIA APG |

---

## Environment Availability

Step 2.6: All external dependencies are already installed as part of the Astro project scaffolded in Phase 1. No new tools, services, or CLIs are required for Phase 2.

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Astro build | Yes | >=22.12.0 (project) | — |
| Astro CLI | Build + preview | Yes | 6.0.8 | — |
| Tailwind CSS v4 | Styling | Yes | 4.2.2 | — |
| `@tailwindcss/vite` | Tailwind integration | Yes | 4.2.2 | — |

No missing dependencies.

---

## Validation Architecture

> `workflow.nyquist_validation` is `true` in `.planning/config.json` — section included.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None installed — no jest, vitest, or playwright in package.json |
| Config file | None — see Wave 0 |
| Quick run command | `npm run build` (build-time type-check) |
| Full suite command | `npm run build && npm run preview` (manual visual check) |

**Assessment:** This is a zero-JS static HTML site. The "tests" for Phase 2 are:
1. **Build passes** — `astro build` compiles without TypeScript or template errors.
2. **Visual review** — `astro preview` confirms layout at 375px (mobile) and 1280px (desktop).
3. **Accessibility check** — Section IDs present, heading hierarchy correct, aria-labelledby wired.
4. **Anchor link check** — Nav links and hero CTA scroll to correct sections.

No unit tests are applicable to static `.astro` content components with no logic. Installing a test framework (vitest, playwright) solely for this phase would add dev dependencies with zero testing value for pure-HTML output.

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| NAV-02 | Section IDs `#services`, `#why-us`, `#process`, `#contact` exist in HTML output | smoke | `npm run build` + inspect `dist/index.html` for `id="services"` etc. | ❌ Wave 0 |
| HERO-01 | h1 present with substantive headline copy | smoke | `npm run build` + inspect `dist/index.html` | ❌ Wave 0 |
| HERO-02 | Subheadline present as `<p>` after h1 | smoke | `npm run build` + inspect `dist/index.html` | ❌ Wave 0 |
| HERO-03 | Single `<a href="#contact">Work With Us</a>` in hero | smoke | `npm run build` + inspect `dist/index.html` | ❌ Wave 0 |
| SERV-01 | Three cards with titles AI Automation, Custom Development, Smart Integrations | smoke | `npm run build` + inspect `dist/index.html` | ❌ Wave 0 |
| SERV-02 | Each card has description text (not empty) | smoke | `npm run build` + inspect `dist/index.html` | ❌ Wave 0 |
| WHY-01 | Two founder names present in `#why-us` section | manual | Visual review via `npm run preview` | ❌ Wave 0 |
| WHY-02 | Three differentiators (human touch, fast delivery, modern stack) visible | manual | Visual review via `npm run preview` | ❌ Wave 0 |
| PROC-01 | Three steps numbered 01/02/03 with Discover/Build/Ship titles | smoke | `npm run build` + inspect `dist/index.html` | ❌ Wave 0 |
| PROC-02 | Each step has one-sentence description | smoke | `npm run build` + inspect `dist/index.html` | ❌ Wave 0 |
| CONT-01 | `mailto:hello@apexcode.dev` link present in `#contact` section | smoke | `npm run build` + inspect `dist/index.html` for `mailto:` | ❌ Wave 0 |
| CONT-02 | No `<form>` element in output | smoke | `npm run build` + inspect `dist/index.html` | ❌ Wave 0 |
| SEO-04 | `<section>`, `<h1>`, `<h2>` elements present and correctly nested | smoke | `npm run build` + inspect `dist/index.html` | ❌ Wave 0 |

### Sampling Rate

- **Per task commit:** `npm run build` — confirms zero Astro/TypeScript compilation errors
- **Per wave merge:** `npm run build && npm run preview` — manual visual check at 375px and 1280px
- **Phase gate:** Full build green + manual accessibility review before `/gsd:verify-work`

### Wave 0 Gaps

The smoke tests above are manual HTML inspection tasks, not automated test files. No test framework installation is recommended for this phase — it would add unnecessary tooling overhead for a pure static content build. All verification is done via:

1. `npm run build` — Astro build-time validation (TypeScript errors, template errors, broken imports)
2. Manual HTML inspection of `dist/index.html`
3. `npm run preview` — visual review in browser

If automated accessibility testing is desired in a future phase, `@astrojs/check` and `axe-core` via Playwright are the appropriate tools.

---

## Open Questions

1. **Founder names**
   - What we know: REQUIREMENTS.md WHY-01 says "both founders by name" but names are not provided anywhere in the planning documents.
   - What's unclear: The actual founder names — placeholder names cannot be used in production copy.
   - Recommendation: Planner uses `[Founder Name 1]` and `[Founder Name 2]` as explicit placeholders with a TODO comment. User fills in real names before launch. This is the same approach as D-01 (draft copy).

2. **Founder bios**
   - What we know: WHY-01 requires "a brief human-readable description" per requirements.
   - What's unclear: Background, experience, or skills the founders want to highlight.
   - Recommendation: Planner writes placeholder bio copy that is structurally correct and tonally right. User replaces before launch.

3. **Section dividers vs. spacing only**
   - What we know: Claude's discretion per CONTEXT.md.
   - Recommendation: Use spacing only (`py-16 md:py-24` consistently) — no visual dividers. The `bg-surface` background is uniform across sections. Section separation is achieved via vertical rhythm, not borders. This is cleaner and consistent with the Vercel aesthetic.

---

## Sources

### Primary (HIGH confidence)
- [Astro official docs — Components](https://docs.astro.build/en/basics/astro-components/) — frontmatter patterns, static component structure, props interface
- [Tailwind CSS official docs — min-height](https://tailwindcss.com/docs/min-height) — confirmed `min-h-dvh`, `min-h-[calc(100dvh-56px)]` pattern
- [Tailwind CSS official docs — grid-template-columns](https://tailwindcss.com/docs/grid-template-columns) — confirmed `grid-cols-1 md:grid-cols-3` responsive grid syntax
- [Tailwind CSS official docs — theme variables](https://tailwindcss.com/docs/theme) — confirmed `--color-*` namespace auto-generates all color utilities
- [MDN — ARIA region role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/region_role) — confirmed `<section>` + `aria-labelledby` = landmark region pattern
- Phase 1 output: `src/styles/global.css`, `src/layouts/Layout.astro`, `src/components/layout/SiteHeader.astro`, `src/components/layout/SiteFooter.astro`, `src/pages/index.astro` — all read directly

### Secondary (MEDIUM confidence)
- [web.dev — Semantic HTML](https://web.dev/learn/html/semantic-html) — section vs div guidance, nested header/footer behavior
- [WebSearch: dvh browser support 2026](https://savvy.co.il/en/blog/css/css-dynamic-viewport-height-dvh/) — confirmed Baseline Widely Available June 2025, ~95% global support
- [WebAIM — Semantic Structure](https://webaim.org/techniques/semanticstructure/) — heading hierarchy rules, landmark regions

### Tertiary (LOW confidence — not load-bearing, corroborating only)
- Various WebSearch results on marketing copy tone, CSS counter patterns — used to confirm established patterns, not as primary guidance

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all packages confirmed installed, versions verified from package.json
- Architecture patterns: HIGH — all patterns derived from official Astro and Tailwind docs, confirmed against Phase 1 code
- Semantic HTML: HIGH — MDN primary source, corroborated by WebAIM and web.dev
- Copy guidance: MEDIUM — derived from REQUIREMENTS.md tone directives and UI-SPEC; actual copy is planner's discretion
- Pitfalls: HIGH — derived from official documentation and direct code inspection

**Research date:** 2026-03-26
**Valid until:** 2026-06-26 (90 days — stack is stable; Astro 6.x and Tailwind v4 are not fast-moving at this point)
