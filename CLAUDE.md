<!-- GSD:project-start source:PROJECT.md -->
## Project

**ApexCode**

A marketing landing page for Apex Code, a two-person development studio building AI-powered solutions for small and medium businesses. The site presents the studio's vision and services, establishes credibility through the founders' identity, and captures inbound interest — no product to sell yet.

**Core Value:** First impression that converts: a visitor lands, immediately understands what Apex Code does and why they should trust it, and knows exactly how to reach out.

### Constraints

- **Language**: TypeScript — project rule, no exceptions
- **Deploy**: Vercel — must work with zero-config or minimal config
- **Performance**: Lean — no heavy client-side frameworks if avoidable; keep bundle small
- **Mobile-first**: All layouts designed for mobile, scaled up to desktop
- **No backend**: Static site only — no server, no database, no auth
<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->
## Technology Stack

## Recommended Stack
### Core Technologies
| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Astro | 5.x (latest ~5.8+) | Static site generator / framework | Ships zero JS by default; HTML-first output; built-in TypeScript; image optimization via Sharp; zero-config Vercel deploy; purpose-built for content sites with optional islands for any interactive component |
| TypeScript | 5.x (bundled via Astro) | Language | Project rule. Astro ships first-class TS support with `strict` preset built-in. No separate install needed. |
| Tailwind CSS | 4.2.x | Utility-first CSS | CSS-first engine (no JS config file), Lightning CSS under the hood for faster builds, zero runtime overhead — pure static CSS output. Pairs with Astro via `@tailwindcss/vite` plugin with no separate PostCSS pipeline. |
### Supporting Libraries
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `astro-seo` | latest (~2.x) | Structured SEO meta tags (OG, Twitter card, canonical) | Use in the base Layout component. Handles the SEO checklist so no tag is forgotten. Lightweight, TypeScript-typed props. Alternative: write meta tags manually — the library adds no magic, only convenience and completeness guarantees. |
| `@astrojs/sitemap` | latest | Auto-generates `sitemap.xml` at build time | Always include. Required for proper search engine indexing. Zero-config: add `sitemap()` to Astro integrations. |
| `@fontsource/*` | latest | Self-hosted web fonts | Use if adding a custom font (e.g. Geist). Self-hosting avoids Google Fonts external request, which saves a render-blocking round-trip and improves privacy. If using system font stack only, skip this entirely. |
### Development Tools
| Tool | Purpose | Notes |
|------|---------|-------|
| `eslint` + `eslint-plugin-astro` | Lint `.astro` files and TypeScript | Use `eslint-plugin-astro` with `recommended` config. The plugin understands Astro component frontmatter and template syntax. |
| Prettier + `prettier-plugin-astro` | Format `.astro` files | Required — Prettier does not format `.astro` without the plugin. |
| Vercel CLI (`vercel`) | Local preview and one-command deploy | Optional. Vercel's Git integration (auto-deploy on push) is sufficient for this project size. |
## Installation
# Scaffold new Astro project (TypeScript strict preset)
# Tailwind CSS v4 (Vite-native, no PostCSS config needed)
# SEO and sitemap
# Dev tools
## Alternatives Considered
| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Astro | Next.js 15 App Router | When the site needs React server components, SSR, API routes, auth, or will grow into a web app. Not appropriate for a pure-static marketing page. |
| Astro | Gatsby | Never for new projects in 2026. Gatsby is in maintenance mode. Use Astro instead. |
| Astro | Remix / SvelteKit | Remix: designed for full-stack apps with mutations and forms — overkill. SvelteKit is a valid static SSG but Svelte has a smaller component ecosystem and less TypeScript tooling. Choose if the team prefers Svelte. |
| Astro | Plain Vite + HTML | Viable for an extremely minimal site, but loses component model, image optimization, typed frontmatter, and the sitemap integration. No meaningful gain. |
| Tailwind CSS v4 | Tailwind CSS v3 | If using older Astro or needing `tailwind.config.js` compatibility with existing design tokens. v4 is CSS-first and requires Astro 5.2+. For a greenfield project, v4 is correct. |
| `astro-seo` | Manual `<head>` meta tags | Manual is fine if the team is disciplined. `astro-seo` adds no overhead and serves as a completeness checklist. Use manual if the library adds friction. |
## What NOT to Use
| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Next.js (for this project) | Ships 40-50 KB React runtime to every visitor even when the page has zero interactivity. For a static marketing page this is pure overhead with no benefit. Performance and SEO are measurably worse. | Astro |
| `@astrojs/react` island adapter | This project has no interactive components that require React. Adding the React adapter reintroduces React runtime cost for zero gain. | Astro's native component model, or `@astrojs/preact` if a lightweight interactive island is ever needed. |
| `@astrojs/vercel` adapter | The adapter is for SSR/on-demand rendering. Static Astro sites deploy to Vercel with zero configuration. Adding the adapter for a static site adds unnecessary complexity. | Nothing — Vercel auto-detects Astro static builds. |
| Styled-components / CSS-in-JS | Requires JS runtime for style injection. Incompatible with Astro's zero-JS-by-default model. | Tailwind CSS utility classes or Astro scoped `<style>` blocks (compiles to static CSS). |
| Google Fonts `<link>` tag | Adds an external render-blocking request. Hurts CWV (LCP, FCP). | `@fontsource` for self-hosted fonts, or a system font stack. |
| CMS (Contentful, Sanity, etc.) | Out of scope per PROJECT.md. No dynamic content. | Static `.astro` component files for copy. Future milestone if blog is added. |
## Stack Patterns by Variant
- Add `@astrojs/preact` (not React) as the island adapter
- Because Preact is ~4 KB vs React's 42 KB, and this project needs zero framework overhead
- Use a serverless form service (Formspree, Formspark, or Netlify Forms)
- Astro with `output: "static"` cannot process form submissions server-side
- Do not switch to SSR/Next.js for this reason alone
- Stay on Astro, add Astro Content Collections (built-in, type-safe)
- Or add a headless CMS adapter (`@astrojs/markdoc` or `@astrojs/mdx`)
- Do not migrate to Next.js — Astro handles this natively
## Version Compatibility
| Package | Compatible With | Notes |
|---------|-----------------|-------|
| `astro@5.x` | `tailwindcss@4.x` via `@tailwindcss/vite` | Requires Astro 5.2+ for full Tailwind v4 support. Confirmed working as of 5.8. |
| `astro@5.x` | Node.js >=20.3.0 or >=22.0.0 | Astro 5.8 bumped minimum Node to 20.3.0 LTS. Node 18 is no longer officially supported (EOL). Use Node 20 LTS or 22 LTS. |
| `@astrojs/sitemap` | `astro@5.x` | `site` property in `astro.config` is mandatory for sitemap generation. Deploy will warn if missing. |
| Tailwind CSS v4 | No `tailwind.config.js` | v4 is CSS-first. Configuration moves to `@theme {}` blocks in CSS. All v3 `tailwind.config.js` patterns are unsupported. This is a greenfield project so no migration needed. |
## Sources
- [Astro official docs — Deploy to Vercel](https://docs.astro.build/en/guides/deploy/vercel/) — Confirmed no adapter needed for static sites (HIGH confidence)
- [Tailwind CSS official docs — Install with Astro](https://tailwindcss.com/docs/guides/astro) — Confirmed `@tailwindcss/vite` pattern for v4 (HIGH confidence)
- [Astro official docs — TypeScript](https://docs.astro.build/en/guides/typescript/) — Confirmed `astro/tsconfigs/strict` preset (HIGH confidence)
- [Astro 5.8 release blog](https://astro.build/blog/astro-580/) — Confirmed Node.js minimum versions (HIGH confidence)
- [WebSearch: Astro vs Next.js 2025](https://makersden.io/blog/nextjs-vs-astro-in-2025-which-framework-best-for-your-marketing-website) — Performance comparison data (MEDIUM confidence — third party benchmarks)
- [WebSearch: Astro performance numbers](https://eastondev.com/blog/en/posts/dev/20251202-astro-vs-nextjs-comparison/) — Lighthouse score claims (MEDIUM confidence — verify with your own Lighthouse run post-build)
- [npmjs.com: astro package](https://www.npmjs.com/package/astro) — Latest version ~6.0.8 (but 5.x is the stable LTS-equivalent; verify before pinning)
- [npmjs.com: tailwindcss](https://www.npmjs.com/package/tailwindcss) — Latest 4.2.2 as of 2026-03-26 (MEDIUM confidence — verify at install time)
- [GitHub: astro-seo](https://github.com/jonasmerlin/astro-seo) — SEO component library (MEDIUM confidence — small community library, evaluate maintenance status)
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd:quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd:debug` for investigation and bug fixing
- `/gsd:execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd:profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
