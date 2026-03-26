# Phase 3: Launch - Research

**Researched:** 2026-03-26
**Domain:** Static site deployment, Lighthouse performance, OG image creation, Google Search Console indexing
**Confidence:** HIGH

## Summary

Phase 3 closes the launch gate for a zero-JS Astro 6 static site. The existing build already produces no JavaScript — only a single 17.8 KB CSS file plus font assets — so the 50 KB JS bundle constraint is already satisfied. The remaining work is: (1) choose and configure a production host that permits commercial use, (2) create the missing `public/og-image.png` asset, (3) update `astro.config.mts` to point at the real production URL, (4) verify Lighthouse scores on the live URL, and (5) submit the sitemap to Google Search Console.

The biggest upstream decision is the hosting platform. Vercel's Hobby plan explicitly prohibits commercial use, and Apex Code is a commercial studio. The two viable options are Vercel Pro ($20/month) or Cloudflare Pages (free, no commercial use restriction). This is a **blocker** — the site cannot go live on Hobby.

The current hero background image is a 233 KB JPEG applied via a CSS `background-image` property on a `<div>`, not an `<img>` tag. This means the browser cannot preload it as the LCP candidate, which may cost Lighthouse Performance points. Addressing this is the highest-risk item for hitting 95+ Performance.

**Primary recommendation:** Deploy to Cloudflare Pages (free tier, commercial use permitted, global CDN). Create the OG image manually in Figma or Canva at 1200×630 PNG under 150 KB. Fix the hero background implementation to use a proper `<img>` with `fetchpriority="high"` for LCP. Submit `sitemap-index.xml` to Google Search Console after DNS propagates.

## Project Constraints (from CLAUDE.md)

- Language: TypeScript only — no JavaScript files
- Deploy: Vercel (or Cloudflare Pages as stated alternative in STATE.md) — zero-config or minimal config
- Performance: Lean — no heavy client-side frameworks, keep bundle small
- Mobile-first: All layouts designed for mobile, scaled up to desktop
- No backend: Static site only
- No i18n required (single-language site)
- Named exports only, const over let, Zod for input validation, no console.log in committed code
- Never commit directly to main; branch naming: feature/name, fix/name, chore/name

## Current State Inventory

Verified from the existing codebase:

| Item | State | Notes |
|------|-------|-------|
| Build output | Zero JS | `dist/_astro/` has only CSS + font files — no `.js` files |
| CSS bundle | 17.8 KB | Well under 50 KB JS limit (and is CSS, not JS) |
| Hero image | `hero-bg.jpg` at 233 KB | Applied via CSS `background-image`, not `<img>` tag — LCP risk |
| Sitemap | Generated | `sitemap-index.xml` + `sitemap-0.xml` with one URL |
| `robots.txt` | Present | Points to `https://apexcode.vercel.app/sitemap-index.xml` |
| `public/og-image.png` | MISSING | Declared in SEO meta via `astro-seo`, file does not exist |
| `site` in `astro.config.mts` | `https://apexcode.vercel.app` | Placeholder — must update to real domain before launch |
| Metadata constants | `src/lib/metadata.ts` | `SITE_URL` hardcoded to `apexcode.vercel.app` — must update |
| GitHub repo | `apexcodeapp/apexcode` | Pushed; master branch |
| Vercel connection | None | Not yet connected to Vercel or Cloudflare Pages |
| Contact email | `hello@apexcode.dev` | Unverified — human verification task |
| Founder bios | Draft text | Human task, not a code task |

## Standard Stack

### Core (already installed)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `astro` | ^6.0.8 | Static site generator | Zero-JS output, TypeScript-first |
| `@astrojs/sitemap` | ^3.7.1 | Generates `sitemap-index.xml` + `sitemap-0.xml` | Required for GSC submission |
| `astro-seo` | ^1.1.0 | OG meta tags, Twitter card, canonical URL | Already wired into Layout.astro |
| `tailwindcss` | ^4.2.2 | CSS utility classes | Zero runtime, pure static CSS |
| `@fontsource/geist-sans` | ^5.2.5 | Self-hosted fonts | Avoids Google Fonts render-blocking |

### No new dependencies needed
The existing stack is sufficient for all launch-gate work. OG image is a static PNG asset, not a generated file. No code library additions are required.

**Installation:** No new packages needed.

**Version verification:** Confirmed from `package.json`. Build artifacts in `dist/` confirm packages are functioning correctly.

## Architecture Patterns

### Deployment: Cloudflare Pages (recommended) or Vercel Pro

#### Option A: Cloudflare Pages (recommended)
- Free tier, no commercial use restriction
- Global CDN, unlimited bandwidth
- GitHub integration: auto-deploys on push to `master`
- Astro framework preset available in dashboard (auto-fills build command and output dir)
- **Required build settings:**
  - Framework preset: Astro
  - Build command: `npm run build`
  - Build output directory: `dist`
  - Environment variable: `NODE_VERSION=22` (Cloudflare's default is Node 18, which Astro 6.x does not support)
- No `@astrojs/cloudflare` adapter needed — static output only

#### Option B: Vercel Pro ($20/month)
- Requires credit card and plan upgrade before connecting GitHub
- GitHub integration: auto-deploys on push
- Zero-config Astro detection — no build settings needed
- Custom domain: add in project Settings > Domains

**Both options:** After connecting, update `astro.config.mts` and `src/lib/metadata.ts` to use the real production domain (custom domain if set up, or the platform-assigned URL otherwise).

### OG Image Creation

**Specification:**
- Dimensions: 1200 × 630 px (1.91:1 aspect ratio — universal across Facebook, LinkedIn, Discord, Slack)
- Format: PNG (good for text-heavy designs)
- File size: under 150 KB (target under 100 KB for performance)
- Location: `public/og-image.png`
- Must be served over HTTPS — any `http://` URL will be blocked by social scrapers

**Design guidance:**
- Include studio name "Apex Code" prominently
- Include tagline or one-line value proposition
- Keep text in the top 80% of image (Facebook overlays domain in bottom strip)
- Use brand colors: white background (#ffffff), dark text (#0a0a0a)

**Tools to create (no code required):**
- Figma (free) — export as PNG
- Canva (free) — 1200×630 template
- Or generate with a script using `sharp` or `satori` if desired (not recommended for this project — adds dependency for a one-time static asset)

**Verification tool:** `https://opengraph.xyz` — paste the production URL, confirm title, description, and image render correctly.

### Hero Image: LCP Fix

The hero background is currently a CSS `background-image`, which browsers cannot preload or treat as the LCP element in the standard way.

**Current implementation (LCP risk):**
```astro
<div style="background-image: url('/hero-bg.jpg')">
```

**Recommended fix — convert to `<img>` with `fetchpriority`:**
```astro
<section class="relative min-h-[calc(100dvh-56px)] ...">
  <img
    src="/hero-bg.jpg"
    alt=""
    aria-hidden="true"
    fetchpriority="high"
    loading="eager"
    class="absolute inset-0 w-full h-full object-cover rounded-xl"
  />
  <div class="relative z-10 ...">
    <!-- text content -->
  </div>
</section>
```

`fetchpriority="high"` is fully standardized in 2026 and signals the browser's network stack to preload this image at highest priority, directly improving LCP.

Alternatively, add a `<link rel="preload">` in the `<head>`:
```html
<link rel="preload" href="/hero-bg.jpg" as="image" fetchpriority="high" />
```

**Hero image size:** Current `hero-bg.jpg` is 233 KB. This is acceptable but consider compressing to under 150 KB (use `sharp` CLI or Squoosh) for better LCP.

### Sitemap Submission to Google Search Console

The `@astrojs/sitemap` integration generates two files:
- `sitemap-index.xml` — the index file that references all numbered sitemaps
- `sitemap-0.xml` — the actual URL entries

**Submit `sitemap-index.xml`** (not `sitemap-0.xml`) to GSC:
- GSC URL: `https://search.google.com/search-console/`
- Property type: URL prefix (e.g., `https://apexcode.dev/`) or Domain (if DNS verification)
- Verification method: DNS TXT record (recommended) or HTML file
- Sitemap submission path: Left nav → Indexing → Sitemaps → Enter `sitemap-index.xml`

**Domain verification sequence:**
1. Get DNS TXT record from GSC
2. Add to domain registrar DNS settings
3. Wait for propagation (minutes to hours)
4. Click Verify in GSC
5. Submit sitemap

**`robots.txt` note:** The current `robots.txt` correctly declares `Sitemap: https://apexcode.vercel.app/sitemap-index.xml`. After domain change, update this URL to match the real production domain.

### Lighthouse Audit

**Tools:**
- Chrome DevTools > Lighthouse tab (run on production URL in Incognito, throttled)
- `npx lighthouse https://your-domain.com --output html --view` (CLI, optional)
- PageSpeed Insights: `https://pagespeed.web.dev/` (uses real CrUX data for mobile)

**Why this site should score well:**
- Zero JS shipped to browser (Astro default, confirmed from build output)
- Self-hosted fonts (no external render-blocking requests)
- `robots.txt` and `sitemap.xml` present (SEO 100)
- Skip-to-content link present in Layout.astro (Accessibility)
- `<html lang="en">` set (Accessibility)
- SEO meta tags via `astro-seo` (title, description, canonical, OG)

**Remaining Lighthouse risks:**
1. Hero image LCP — CSS background-image not preloaded (see Hero Image fix above)
2. Hero image size — 233 KB may impact LCP time on mobile
3. Missing `og:image` file — broken image request, may affect Best Practices score (generates 404)
4. `site` URL in config pointing to `apexcode.vercel.app` — must match actual production domain for canonical to be correct

**Score targets:**
| Category | Target | Expected with fixes |
|----------|--------|---------------------|
| Performance | 95+ | Achievable — zero JS, small CSS, font preloaded |
| Accessibility | 100 | Strong baseline — skip link, lang, semantic HTML |
| Best Practices | 100 | Fix missing OG image (removes 404 from audit) |
| SEO | 100 | Meta tags, sitemap, robots.txt all present |

### URL Configuration Update

Both `astro.config.mts` and `src/lib/metadata.ts` must be updated to the real production domain before the first production deploy. Incorrect URL means:
- Sitemap entries point to wrong domain
- Canonical tags wrong
- OG image URL wrong (social scrapers load image from wrong host)
- `robots.txt` sitemap declaration wrong

**Files to update:**
- `astro.config.mts`: `site: 'https://YOUR-REAL-DOMAIN'`
- `src/lib/metadata.ts`: `SITE_URL = 'https://YOUR-REAL-DOMAIN'`
- `public/robots.txt`: `Sitemap: https://YOUR-REAL-DOMAIN/sitemap-index.xml`

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Sitemap XML | Custom sitemap generator | `@astrojs/sitemap` (already installed) | Handles `lastmod`, `changefreq`, multiple pages, proper index structure |
| OG meta tags | Manual `<head>` tags | `astro-seo` (already installed) | Prevents missing properties, TypeScript-typed props |
| OG image generation | Custom canvas/puppeteer renderer | Static PNG file in `public/` | This is a single-page site — one static image is correct; automated generation adds runtime dependency for no gain |
| Lighthouse audit | Manual browser checks | Chrome Lighthouse tab or PageSpeed Insights | Comprehensive, standardized, no setup |
| SSL certificate | Manual cert management | Vercel/Cloudflare auto-provisions | Both platforms handle TLS automatically |

## Common Pitfalls

### Pitfall 1: Deploying on Vercel Hobby for a Commercial Site
**What goes wrong:** Vercel terms explicitly prohibit commercial use on the Hobby plan. A development studio's marketing site is unambiguously commercial. Risk of account suspension.
**Why it happens:** Hobby plan is convenient and free.
**How to avoid:** Upgrade to Vercel Pro before connecting the repo, or use Cloudflare Pages (free, commercial OK).
**Warning signs:** Any Vercel Hobby deployment for a revenue-generating studio.

### Pitfall 2: Launching with Wrong `site` URL in Config
**What goes wrong:** Sitemap entries, canonical tags, and OG image URL all embed the placeholder `apexcode.vercel.app` domain. Social scrapers and Googlebot follow these incorrect URLs. GSC shows index errors.
**Why it happens:** Config was set during development before the real domain was known.
**How to avoid:** Update `astro.config.mts`, `src/lib/metadata.ts`, and `public/robots.txt` before the first production deploy. Rebuild after the change.
**Warning signs:** Sitemap XML contains `apexcode.vercel.app` after the real domain is assigned.

### Pitfall 3: Missing OG Image PNG
**What goes wrong:** Browser fetches `og-image.png` and receives a 404. Social platforms show no preview image. Lighthouse Best Practices flags the broken image request.
**Why it happens:** The file is declared in `Layout.astro` but was never created.
**How to avoid:** Create `public/og-image.png` at 1200×630 before deploying.
**Warning signs:** `opengraph.xyz` shows no image preview; Chrome Network tab shows 404 for `og-image.png`.

### Pitfall 4: Hero Image as CSS `background-image` Hurts LCP
**What goes wrong:** CSS background images cannot be given `fetchpriority="high"`, cannot be prefetched via `<link rel="preload">` in the same way, and are not identified by browsers as primary LCP candidates until after layout. This can cause Lighthouse Performance to drop below 95.
**Why it happens:** CSS `background-image` is a common pattern for decorative images, but the hero background is the dominant visual element and Lighthouse treats it as LCP.
**How to avoid:** Convert to `<img fetchpriority="high" loading="eager">` or add a `<link rel="preload">` in the layout `<head>`.
**Warning signs:** Lighthouse shows "Largest Contentful Paint element" pointing to the div, with a slow LCP time.

### Pitfall 5: Cloudflare Pages Using Wrong Node Version
**What goes wrong:** Cloudflare Pages defaults to Node 18.17.1. Astro 6.x requires Node >= 20.3.0. Build fails with a Node version error.
**Why it happens:** Platform default is older than the project requirement.
**How to avoid:** Set `NODE_VERSION=22` in Cloudflare Pages environment variables (Settings > Environment Variables) before the first deploy, or add a `.node-version` file with `22` to the repo root.
**Warning signs:** Build log shows "Node.js v18.17.1 is not supported by Astro".

### Pitfall 6: Submitting `sitemap-0.xml` Instead of `sitemap-index.xml` to GSC
**What goes wrong:** Submitting `sitemap-0.xml` works but is a numbered file. If the site grows past 45,000 URLs, `sitemap-1.xml` would exist but not be submitted. Best practice is always to submit the index.
**Why it happens:** Confusion about which file to submit.
**How to avoid:** Always submit `sitemap-index.xml` to Google Search Console.

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Build | Available | v22.20.0 | — |
| npm | Build | Available | bundled with Node | — |
| Vercel CLI | Deployment (optional) | Not installed | — | Use Vercel web dashboard or Cloudflare Pages web dashboard |
| Astro build | Build output | Working | ^6.0.8 | — |
| Chrome DevTools Lighthouse | Audit | Browser | — | PageSpeed Insights (web-based) |
| Domain registrar access | DNS verification for GSC | Unknown | — | HTML file verification method |
| Figma or Canva | OG image creation | Unknown — human task | — | Any image editor capable of 1200×630 PNG export |

**Missing dependencies with no fallback:** None that block automated execution.

**Missing dependencies with fallback:**
- Vercel CLI → use web dashboard (not a blocker)
- Domain registrar → use GSC HTML file verification if DNS access is unavailable

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None detected — no test files or config in repository |
| Config file | None |
| Quick run command | `npm run build` (build-time type check + successful output) |
| Full suite command | `npm run build && npx lighthouse https://PRODUCTION_URL --output json` (post-deploy manual) |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| LAUNCH-01 | Lighthouse 95+ Performance, 100 Accessibility, 100 Best Practices, 100 SEO | manual | Run Lighthouse against production URL | N/A — external tool |
| LAUNCH-02 | OG image shows correctly in opengraph.xyz | manual | Paste production URL into opengraph.xyz | N/A — external tool |
| LAUNCH-03 | GSC sitemap submitted, no index errors | manual | GSC dashboard verification | N/A — external service |
| LAUNCH-04 | JS bundle < 50 KB | automated | `ls -la dist/_astro/*.js` (currently zero JS files) | N/A — verified at build time |

### Sampling Rate
- **Per build:** `npm run build` — confirms TypeScript compiles and Astro produces valid output
- **Pre-launch gate:** Manual Lighthouse run on production URL, opengraph.xyz check, GSC sitemap submission
- **Phase gate:** All four success criteria met before marking Phase 3 complete

### Wave 0 Gaps
- No unit test framework exists or is needed for a static site with no logic
- Lighthouse CI could be added (`@lhci/cli`) but is optional for this project size
- All validation is external/manual: Lighthouse on production URL, opengraph.xyz, GSC

## Code Examples

### Update `astro.config.mts` for Real Domain
```typescript
// Source: https://docs.astro.build/en/reference/configuration-reference/#site
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://apexcode.dev', // replace with actual production domain
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

### Update `src/lib/metadata.ts`
```typescript
export const SITE_URL = 'https://apexcode.dev' as const; // replace with actual domain

export const SITE_TITLE = 'Apex Code — AI-Powered Development for SMBs' as const;

export const SITE_DESCRIPTION =
  'Apex Code is a two-person development studio building AI automation, custom software, and smart integrations for small and medium businesses. Fast delivery, human touch.' as const;
```

### `public/robots.txt` Update
```
User-agent: *
Allow: /
Sitemap: https://apexcode.dev/sitemap-index.xml
```

### Hero Image Fix for LCP (in `HeroSection.astro`)
```astro
---
---

<section
  id="hero"
  aria-label="Hero"
  class="relative min-h-[calc(100dvh-56px)] flex items-center justify-center"
>
  <img
    src="/hero-bg.jpg"
    alt=""
    aria-hidden="true"
    fetchpriority="high"
    loading="eager"
    class="absolute inset-0 w-full h-full object-cover rounded-xl"
  />
  <div class="relative z-10 max-w-5xl mx-auto px-16 py-20 text-center">
    <!-- h1, p, a tags unchanged -->
  </div>
</section>
```

### Cloudflare Pages `.node-version` File (optional alternative to env var)
```
22
```
Place at repo root. Cloudflare Pages respects `.node-version` during builds.

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `loading="lazy"` on hero images | `fetchpriority="high"` on LCP images | Standardized ~2023, widely adopted 2024-2026 | Directly improves LCP score |
| Google Fonts `<link>` tag | `@fontsource` self-hosted | 2022+ | Eliminates render-blocking external request |
| `tailwind.config.js` | `@theme {}` CSS blocks (Tailwind v4) | Tailwind v4 (2025) | No JS config file; Lightning CSS engine |
| Vercel adapter for all Astro | No adapter for static Astro | Always been the case, clarified in docs | Adding `@astrojs/vercel` to a static site adds complexity with no benefit |
| `sitemap.xml` | `sitemap-index.xml` + `sitemap-0.xml` | `@astrojs/sitemap` default | Submit the index file to GSC, not the numbered file |

**Deprecated/outdated:**
- Cloudflare `@astrojs/cloudflare` adapter: Cloudflare is migrating Pages to Workers. For static-only Astro, the adapter is irrelevant — no adapter needed.
- Gatsby: Maintenance mode, not applicable.

## Open Questions

1. **Custom domain availability**
   - What we know: The `astro.config.mts` placeholder uses `apexcode.vercel.app`. The STATE.md references `hello@apexcode.dev` as the contact address, suggesting `apexcode.dev` may be registered.
   - What's unclear: Whether `apexcode.dev` is registered and controlled by the founders, and who the registrar is.
   - Recommendation: Confirm domain ownership before planning DNS steps. If not registered, register `apexcode.dev` immediately (Google Domains, Namecheap, etc.). The plan should include a step to confirm domain status.

2. **Hosting platform decision**
   - What we know: Vercel Hobby is prohibited for commercial use. Vercel Pro costs $20/month. Cloudflare Pages is free with no commercial restriction.
   - What's unclear: Whether the founders prefer to pay for Vercel Pro (simpler, familiar) or use Cloudflare Pages (free, slightly different dashboard).
   - Recommendation: Plan should present both options with a decision gate. Default to Cloudflare Pages given the cost difference and unrestricted free tier.

3. **Founder bio content**
   - What we know: Draft text exists in the codebase.
   - What's unclear: Whether real bios are ready to ship with Phase 3.
   - Recommendation: Flag as a human task that must be completed before launch. Not a code blocker but is a content blocker.

## Sources

### Primary (HIGH confidence)
- [Astro deploy to Vercel — official docs](https://docs.astro.build/en/guides/deploy/vercel/) — zero-config static deployment confirmed
- [Astro `@astrojs/sitemap` — official docs](https://docs.astro.build/en/guides/integrations-guide/sitemap/) — sitemap-index.xml pattern confirmed
- [Cloudflare Pages deploy Astro — official docs](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/) — build settings confirmed
- [Vercel Hobby plan — official docs](https://vercel.com/docs/plans/hobby) — commercial use prohibition confirmed verbatim
- Project codebase — `dist/` folder inspection confirms zero JS output, 17.8 KB CSS, sitemap generated correctly

### Secondary (MEDIUM confidence)
- [OG Image Size Guide 2026 — og-image.org](https://og-image.org/learn/og-image-size) — 1200×630 as universal standard, verified across multiple sources
- [Cloudflare Community — NODE_VERSION for Astro](https://community.cloudflare.com/t/github-pages-astro-framework-node-js-v12-18-0-is-not-supported-by-astro/430276) — Node 22 env var requirement for Cloudflare Pages
- [LCP lazy loading pitfalls — corewebvitals.io](https://www.corewebvitals.io/pagespeed/fix-largest-contentful-paint-image-was-lazily-loaded-lighthouse) — `fetchpriority="high"` impact on LCP
- [Google Search Console sitemap submission — Google support](https://support.google.com/webmasters/answer/7451001) — official GSC sitemap workflow

### Tertiary (LOW confidence)
- WebSearch results on Lighthouse 2026 scores for Astro — third-party benchmark claims not independently verified; run your own Lighthouse after deploy

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — verified from `package.json` and `dist/` build output
- Architecture (deployment): HIGH — verified from official Vercel and Cloudflare Pages docs
- OG image spec: HIGH — cross-referenced from multiple official platform docs
- Lighthouse expectations: MEDIUM — Astro's zero-JS output is confirmed; exact score depends on hero image LCP fix
- GSC submission: HIGH — official Google support docs
- Pitfalls: HIGH — confirmed from official docs and direct code inspection

**Research date:** 2026-03-26
**Valid until:** 2026-04-26 (stable domain — Astro, Vercel, Cloudflare Pages docs change slowly)
