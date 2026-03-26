# Stack Research

**Domain:** Static marketing/landing page — developer studio
**Researched:** 2026-03-26
**Confidence:** HIGH

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Astro | 5.x (latest ~5.8+) | Static site generator / framework | Ships zero JS by default; HTML-first output; built-in TypeScript; image optimization via Sharp; zero-config Vercel deploy; purpose-built for content sites with optional islands for any interactive component |
| TypeScript | 5.x (bundled via Astro) | Language | Project rule. Astro ships first-class TS support with `strict` preset built-in. No separate install needed. |
| Tailwind CSS | 4.2.x | Utility-first CSS | CSS-first engine (no JS config file), Lightning CSS under the hood for faster builds, zero runtime overhead — pure static CSS output. Pairs with Astro via `@tailwindcss/vite` plugin with no separate PostCSS pipeline. |

**Why Astro over Next.js for this project:**

Next.js 15 is excellent for apps but the wrong tool here. A static landing page with no auth, no database, no API routes, and no dynamic data does not need React's 42 KB runtime on the client. Next.js ships that runtime unconditionally. Astro ships zero JS by default; you opt in per-component. Lighthouse scores on a pure-content site: Astro consistently scores 95-100 Performance; Next.js on the same content lands around 75-85 on slow connections. For a developer studio whose design reference is vercel.com — fast, minimal, confident — Astro is the correct choice. It also produces fully-static HTML that search crawlers read without JavaScript execution, which is a direct SEO advantage.

**Why Astro over Gatsby / other SSGs:**

Gatsby is effectively deprecated for new projects (Meta handed it to Netlify, activity has dropped sharply). Gatsby's GraphQL data layer adds unnecessary complexity for a single-page site. Vite/plain HTML would work but provides no component model, no type safety, no image optimization. Astro gives you the component model and TypeScript without the runtime cost.

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

```bash
# Scaffold new Astro project (TypeScript strict preset)
npm create astro@latest apexcode -- --template minimal --typescript strict

cd apexcode

# Tailwind CSS v4 (Vite-native, no PostCSS config needed)
npm install tailwindcss @tailwindcss/vite

# SEO and sitemap
npm install astro-seo
npx astro add sitemap

# Dev tools
npm install -D eslint eslint-plugin-astro prettier prettier-plugin-astro
```

**Tailwind CSS v4 Astro config (`astro.config.mts`):**
```typescript
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://apexcode.dev", // required for sitemap
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

**Tailwind entry (`src/styles/global.css`):**
```css
@import "tailwindcss";
```

**tsconfig.json:**
```json
{
  "extends": "astro/tsconfigs/strict"
}
```

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

**If an interactive component is needed (e.g. animated counter, accordion):**
- Add `@astrojs/preact` (not React) as the island adapter
- Because Preact is ~4 KB vs React's 42 KB, and this project needs zero framework overhead

**If a contact form replaces the email CTA in a future milestone:**
- Use a serverless form service (Formspree, Formspark, or Netlify Forms)
- Astro with `output: "static"` cannot process form submissions server-side
- Do not switch to SSR/Next.js for this reason alone

**If a blog/CMS is added in a future milestone:**
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

---
*Stack research for: ApexCode developer studio landing page*
*Researched: 2026-03-26*
