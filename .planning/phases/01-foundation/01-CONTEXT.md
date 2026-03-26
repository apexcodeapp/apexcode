# Phase 1: Foundation - Context

**Gathered:** 2026-03-26
**Status:** Ready for planning

<domain>
## Phase Boundary

This phase delivers a deployed, empty Astro site with the correct design system (colors, typography, spacing), SEO metadata baseline, and a working Vercel CI/CD pipeline — ready for content sections to be dropped in during Phase 2. No content sections are built here. The output is a layout shell: SiteHeader, SiteFooter, global CSS, and a minimal index page.

</domain>

<decisions>
## Implementation Decisions

### Domain & Deployment
- **D-01:** Deploy to `.vercel.app` first — use a placeholder `site` URL in `astro.config.mts` for Phase 1. Real domain gets wired in Phase 3 (Launch).
- **D-02:** Canonical URLs, OG `og:url`, and sitemap will use the placeholder URL for now. Phase 3 swaps them to the real domain.
- **D-03:** Vercel connected via **Git integration** (GitHub push → auto-deploy). Not Vercel CLI manual deploy.

### OG Image
- **D-04:** Include `og:image` meta tag in Phase 1 with a placeholder path (`/og-image.png`). The actual image is a Phase 3 deliverable. The tag should be present in the HTML source — crawlers won't find the asset until Phase 3.
- **D-05:** The placeholder path declared in `metadata.ts` should be `{SITE_URL}/og-image.png` so it resolves to an absolute URL automatically when the real domain is swapped in.

### Project Scaffolding
- **D-06:** Initialize with `npm create astro@latest` using the **"Empty" template** and **TypeScript strict** preset. This handles `tsconfig.json`, `package.json`, and base structure correctly out of the box.
- **D-07:** Initialize git and create a GitHub repo as part of Phase 1. Full pipeline (git init → GitHub repo → Vercel connected) is set up before any code is written, so auto-deploy works from the first commit.

### Claude's Discretion
- File naming conventions beyond what UI-SPEC specifies (e.g., barrel exports, naming of config files)
- Exact Vercel project name (can match repo name)
- Whether to use `.mts` or `.ts` extension for `astro.config` (Astro recommends `.mts` for ESM)
- npm vs pnpm vs yarn package manager (use npm unless project already has a lockfile)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Design System & UI Contract
- `.planning/phases/01-foundation/01-UI-SPEC.md` — Complete design contract: color tokens, typography scale, spacing scale, component specs (Layout, SiteHeader, SiteFooter, index.astro, metadata.ts, global.css), copywriting contract, SEO contract, interaction contract, accessibility baseline. This is the single source of truth for all visual and structural decisions in Phase 1.

### Requirements
- `.planning/REQUIREMENTS.md` — Phase 1 requirement IDs: FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05, FOUND-06, NAV-01, SEO-01, SEO-02, SEO-03, SEO-05, SEO-06. Planner must map each task to a requirement ID.

### Roadmap & Goal
- `.planning/ROADMAP.md` — Phase 1 goal, success criteria, and dependency context. Check success criteria before declaring phase complete.

### Project Constraints
- `CLAUDE.md` (project root) — TypeScript required, no JS files; Vercel deploy target; mobile-first; no backend; no client-side JS frameworks.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- None — project is not yet scaffolded. Starting from blank slate.

### Established Patterns
- None yet — this phase establishes the baseline patterns for all subsequent phases.

### Integration Points
- Phase 2 will drop content sections (Hero, Services, Why Us, Process, Contact) into the `<main>` slot defined in `src/layouts/Layout.astro`. Keep the slot clean and unstyled.
- The design tokens declared in `src/styles/global.css` (`@theme {}` blocks) propagate to Phase 2 automatically via Tailwind v4's CSS-first approach.

</code_context>

<specifics>
## Specific Ideas

- **Vercel pipeline first:** User explicitly wants git init + GitHub repo + Vercel connection to happen in Phase 1, before content work begins. Don't defer pipeline setup.
- **Placeholder `.vercel.app` URL:** Use the auto-generated Vercel URL as the `site` value in `astro.config.mts` (e.g., `https://apexcode.vercel.app`). This makes sitemap and canonical URLs functional from day one without waiting for a real domain.
- **OG image tag:** Declare but don't block on the image asset. The SEO contract is met at the tag level; the asset follows in Phase 3.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 01-foundation*
*Context gathered: 2026-03-26*
