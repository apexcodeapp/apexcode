---
phase: 01-foundation
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - astro.config.mts
  - tsconfig.json
  - package.json
  - src/styles/global.css
  - src/lib/metadata.ts
  - src/layouts/Layout.astro
  - src/components/layout/SiteHeader.astro
  - src/components/layout/SiteFooter.astro
  - src/pages/index.astro
  - public/robots.txt
autonomous: false
requirements:
  - FOUND-01
  - FOUND-02
  - FOUND-03
  - FOUND-04
  - FOUND-05
  - FOUND-06
  - NAV-01
  - SEO-01
  - SEO-02
  - SEO-03
  - SEO-05
  - SEO-06

must_haves:
  truths:
    - "npm run build completes with zero TypeScript errors in strict mode"
    - "Page background is #0a0a0a (near-black), text is #f5f5f5 (off-white)"
    - "Sticky header is visible at top with 4 anchor nav links (Services, Why Us, Process, Contact)"
    - "sitemap-index.xml and robots.txt exist in the build output"
    - "<title> and <meta name='description'> are present in the HTML source with correct copy"
    - "OG tags (og:title, og:description, og:image, og:url) are present in the HTML source"
    - "Footer displays copyright line"
    - "Deployed Vercel URL loads in under 3 seconds on mobile"
  artifacts:
    - path: "astro.config.mts"
      provides: "Astro config with site URL, sitemap integration, Tailwind vite plugin"
      contains: "defineConfig"
    - path: "src/styles/global.css"
      provides: "Tailwind v4 import + @theme design tokens + base reset"
      contains: "@theme"
    - path: "src/lib/metadata.ts"
      provides: "SITE_URL, SITE_TITLE, SITE_DESCRIPTION named exports"
      exports: ["SITE_URL", "SITE_TITLE", "SITE_DESCRIPTION"]
    - path: "src/layouts/Layout.astro"
      provides: "HTML shell with SEO head, font imports, skip link, slot"
      min_lines: 25
    - path: "src/components/layout/SiteHeader.astro"
      provides: "Sticky header with logo wordmark and anchor nav links"
      min_lines: 15
    - path: "src/components/layout/SiteFooter.astro"
      provides: "Footer with copyright line"
      min_lines: 8
    - path: "src/pages/index.astro"
      provides: "Index page composing Layout + Header + main + Footer"
      min_lines: 10
    - path: "public/robots.txt"
      provides: "Static robots.txt referencing sitemap-index.xml"
      contains: "sitemap-index.xml"
  key_links:
    - from: "src/pages/index.astro"
      to: "src/layouts/Layout.astro"
      via: "import Layout"
      pattern: "import Layout from"
    - from: "src/layouts/Layout.astro"
      to: "src/lib/metadata.ts"
      via: "import metadata constants for SEO"
      pattern: "import.*SITE_URL.*from.*metadata"
    - from: "src/layouts/Layout.astro"
      to: "astro-seo"
      via: "SEO component in head"
      pattern: "import.*SEO.*from.*astro-seo"
    - from: "src/layouts/Layout.astro"
      to: "src/styles/global.css"
      via: "CSS import for Tailwind tokens"
      pattern: "import.*global\\.css"
    - from: "astro.config.mts"
      to: "@astrojs/sitemap"
      via: "sitemap() integration"
      pattern: "sitemap\\(\\)"
    - from: "astro.config.mts"
      to: "@tailwindcss/vite"
      via: "tailwindcss() vite plugin"
      pattern: "tailwindcss\\(\\)"

user_setup:
  - service: github
    why: "Git integration for Vercel auto-deploy (per D-03, D-07)"
    env_vars: []
    dashboard_config:
      - task: "Create GitHub repository named 'apexcode' (or equivalent)"
        location: "github.com/new or gh CLI"
  - service: vercel
    why: "Static site hosting with Git integration (per D-03)"
    env_vars: []
    dashboard_config:
      - task: "Connect GitHub repo to Vercel project for auto-deploy"
        location: "vercel.com/new -> Import Git Repository"
---

<objective>
Scaffold the Astro 5.x project from zero, establish the design token system (colors, typography, spacing), build the layout shell (header, footer, index page), wire all SEO metadata, and deploy to Vercel via GitHub Git integration.

Purpose: This is the foundation everything else builds on. Phase 2 drops content sections into the `<main>` slot created here. The design tokens, SEO metadata, and deploy pipeline must work correctly before any content work begins.

Output: A deployed, empty Astro site at a `.vercel.app` URL with correct design system, sticky header with nav links, footer, SEO tags in HTML source, sitemap, and robots.txt.
</objective>

<execution_context>
@$HOME/.claude/get-shit-done/workflows/execute-plan.md
@$HOME/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/STATE.md
@.planning/phases/01-foundation/01-CONTEXT.md
@.planning/phases/01-foundation/01-RESEARCH.md
@.planning/phases/01-foundation/01-UI-SPEC.md
@.planning/phases/01-foundation/01-VALIDATION.md
</context>

<tasks>

<task type="auto">
  <name>Task 1: Scaffold Astro project, install dependencies, configure design tokens</name>
  <files>
    astro.config.mts,
    tsconfig.json,
    package.json,
    src/styles/global.css,
    src/lib/metadata.ts,
    public/robots.txt
  </files>
  <action>
    **Step 1 — Scaffold (per D-06):**
    Run `npm create astro@latest -- --template empty --typescript strict` in the project root directory. This generates `package.json`, `tsconfig.json` (extending `astro/tsconfigs/strict`), `astro.config.mts`, and the `src/pages/index.astro` starter.

    If the project directory already has files (e.g., `.planning/`), scaffold into a temp directory and move the generated files into the project root, preserving existing `.planning/` and `CLAUDE.md`.

    **Step 2 — Install dependencies:**
    ```
    npm install tailwindcss@^4.2 @tailwindcss/vite@^4.2
    npm install astro-seo @astrojs/sitemap
    npm install @fontsource/geist-sans
    ```
    Do NOT install `@astrojs/vercel` (static sites need no adapter — per RESEARCH.md pitfall 2).
    Do NOT install `@astrojs/react` or any island adapter (zero client-side JS — per FOUND-05).
    Do NOT create `tailwind.config.js` (Tailwind v4 is CSS-first — per RESEARCH.md pitfall 4).

    **Step 3 — Configure `astro.config.mts`:**
    Use the exact pattern from RESEARCH.md Pattern 1:
    - `site: 'https://apexcode.vercel.app'` (per D-01, placeholder `.vercel.app` URL)
    - `integrations: [sitemap()]` (per SEO-05)
    - `vite: { plugins: [tailwindcss()] }` (per FOUND-02)
    - Import `sitemap` from `@astrojs/sitemap`, `tailwindcss` from `@tailwindcss/vite`
    - Use `defineConfig` from `'astro/config'`

    **Step 4 — Create `src/lib/metadata.ts` (per RESEARCH.md Pattern 3):**
    Named exports only (project rule). All values as `const` assertions:
    - `SITE_URL = 'https://apexcode.vercel.app'` (per D-01)
    - `SITE_TITLE = 'Apex Code — AI-Powered Development for SMBs'` (per SEO-01, Copywriting Contract — 42 chars)
    - `SITE_DESCRIPTION = 'Apex Code is a two-person development studio building AI automation, custom software, and smart integrations for small and medium businesses. Fast delivery, human touch.'` (per SEO-02, Copywriting Contract — 152 chars)

    **Step 5 — Create `src/styles/global.css` (per RESEARCH.md Pattern 1, UI-SPEC Color + Typography):**
    Must contain:
    - `@import "tailwindcss";` (Tailwind v4 entry point)
    - `@theme {}` block with ALL 6 color tokens from UI-SPEC: `--color-surface: #0a0a0a`, `--color-surface-raised: #111111`, `--color-text-primary: #f5f5f5`, `--color-text-muted: #a1a1a1`, `--color-border: #1f1f1f`, `--color-accent: #ffffff`
    - `--font-family-sans: 'Geist Sans', ui-sans-serif, system-ui, sans-serif` in `@theme {}`
    - Base reset on `html`: `scroll-behavior: smooth`
    - Base reset on `body`: `background-color: var(--color-surface)`, `color: var(--color-text-primary)`, `font-family: var(--font-family-sans)`, `min-height: 100vh`, `-webkit-font-smoothing: antialiased`, `-moz-osx-font-smoothing: grayscale`
    - Scroll offset for sticky header: `[id] { scroll-margin-top: 56px; }` (per NAV-01, UI-SPEC spacing exception)

    **Step 6 — Create `public/robots.txt` (per RESEARCH.md Pattern 5, SEO-06):**
    Must reference `sitemap-index.xml` (NOT `sitemap.xml` — per RESEARCH.md pitfall 1):
    ```
    User-agent: *
    Allow: /
    Sitemap: https://apexcode.vercel.app/sitemap-index.xml
    ```

    **Step 7 — Verify `tsconfig.json`:**
    Should already extend `astro/tsconfigs/strict` from scaffold. Confirm it includes `".astro/types.d.ts"` in `include` and `"dist"` in `exclude`. Do not modify unless missing.
  </action>
  <verify>
    <automated>npm run build</automated>
    Exits with code 0 (zero TypeScript errors in strict mode).
    After build: `ls dist/sitemap-index.xml dist/robots.txt` — both files exist.
    `grep "sitemap-index.xml" dist/robots.txt` — returns a match.
  </verify>
  <done>
    Astro project scaffolded with TypeScript strict (FOUND-01). Tailwind v4 configured via @theme blocks with all 6 color tokens (FOUND-02, FOUND-06). Sitemap integration active (SEO-05). robots.txt references sitemap-index.xml (SEO-06). metadata.ts exports SITE_URL, SITE_TITLE, SITE_DESCRIPTION. npm run build succeeds with zero errors.
  </done>
</task>

<task type="auto">
  <name>Task 2: Build Layout shell, SiteHeader, SiteFooter, and wire SEO metadata</name>
  <files>
    src/layouts/Layout.astro,
    src/components/layout/SiteHeader.astro,
    src/components/layout/SiteFooter.astro,
    src/pages/index.astro
  </files>
  <action>
    **Step 1 — Create `src/layouts/Layout.astro` (per RESEARCH.md Pattern 2, UI-SPEC Component Inventory):**

    Frontmatter:
    - `import { SEO } from 'astro-seo';` (per SEO-01, SEO-02, SEO-03)
    - `import '@fontsource/geist-sans/400.css';` (regular weight — per UI-SPEC Typography)
    - `import '@fontsource/geist-sans/600.css';` (semibold weight — per UI-SPEC Typography)
    - `import '../styles/global.css';`
    - `import { SITE_URL, SITE_TITLE, SITE_DESCRIPTION } from '../lib/metadata';`
    - Define `interface Props { title?: string; description?: string; }` (named exports rule does not apply to Props interfaces in .astro files)
    - Destructure props with defaults from metadata constants

    Template:
    - `<html lang="en">` (per UI-SPEC Accessibility Baseline)
    - `<head>`: `<meta charset="UTF-8">`, `<meta name="viewport" content="width=device-width, initial-scale=1">`, `<link rel="icon" type="image/svg+xml" href="/favicon.svg">`
    - `<SEO>` component with props (per RESEARCH.md Pattern 2):
      - `title={title}` (renders `<title>` — per SEO-01)
      - `description={description}` (renders `<meta name="description">` — per SEO-02)
      - `canonical={SITE_URL + '/'}` (per D-02)
      - `openGraph={{ basic: { title: title, type: 'website', image: SITE_URL + '/og-image.png', url: SITE_URL + '/' }, optional: { description: description, siteName: 'Apex Code' } }}` (per SEO-03, D-04, D-05)
    - `<body>`:
      - Skip link as FIRST element: `<a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-surface-raised focus:text-text-primary focus:px-4 focus:py-2 focus:rounded">Skip to main content</a>` (per UI-SPEC Accessibility Baseline)
      - `<slot />` — Phase 2 content sections drop into this slot

    **Step 2 — Create `src/components/layout/SiteHeader.astro` (per UI-SPEC SiteHeader specification):**

    Create directory `src/components/layout/` if it does not exist.

    Template — a `<header>` element with:
    - Classes: `sticky top-0 z-50 h-14 bg-surface-raised border-b border-border backdrop-blur-sm` (per UI-SPEC: 56px height, #111111 bg, 1px #1f1f1f bottom border, backdrop blur)
    - Inner container: `max-w-5xl mx-auto px-4 h-full flex items-center justify-between`
    - Logo: `<a href="/" class="text-base font-semibold text-text-primary">Apex Code</a>` (per UI-SPEC: Geist Sans 16px weight 600, #f5f5f5)
    - Nav: `<nav class="hidden md:flex items-center gap-6">` (hidden below md breakpoint — per UI-SPEC mobile spec, FOUND-04)
      - 4 anchor links (per NAV-01, UI-SPEC Copywriting Contract):
        1. `<a href="#services" class="text-sm font-normal text-text-muted hover:text-text-primary transition-colors duration-150 ease-in-out min-h-[44px] flex items-center">Services</a>`
        2. `<a href="#why-us" ...>Why Us</a>`
        3. `<a href="#process" ...>Process</a>`
        4. `<a href="#contact" ...>Contact</a>`
      - Each link: 14px, weight 400, #a1a1a1 default, #f5f5f5 on hover, 150ms transition (per UI-SPEC SiteHeader specification)
      - Each link: `min-h-[44px] flex items-center` for 44px touch target (per UI-SPEC spacing exception)
    - Add code comment: `{/* Section IDs created in Phase 2 */}` (per RESEARCH.md pitfall 7)

    **Step 3 — Create `src/components/layout/SiteFooter.astro` (per UI-SPEC SiteFooter specification):**

    Template — a `<footer>` element with:
    - Classes: `bg-surface-raised border-t border-border py-8` (per UI-SPEC: #111111 bg, 1px #1f1f1f top border, 32px vertical padding)
    - Inner container: `max-w-5xl mx-auto px-4`
    - Copy: `<p class="text-sm font-normal text-text-muted text-center">` containing the exact string from UI-SPEC Copywriting Contract
    - The year in the copyright MUST be the current year. Use the static string from the Copywriting Contract for Phase 1.

    **Step 4 — Update `src/pages/index.astro` (per RESEARCH.md code example, UI-SPEC Component Inventory):**

    Replace the scaffold-generated content with:
    ```astro
    ---
    import Layout from '../layouts/Layout.astro';
    import SiteHeader from '../components/layout/SiteHeader.astro';
    import SiteFooter from '../components/layout/SiteFooter.astro';
    ---
    <Layout>
      <SiteHeader />
      <main id="main-content">
        {/* Content sections added in Phase 2 */}
      </main>
      <SiteFooter />
    </Layout>
    ```
    The `<main>` element uses `id="main-content"` to match the skip link target (per UI-SPEC Accessibility Baseline).
  </action>
  <verify>
    <automated>npm run build && npx astro check</automated>
    Build exits 0 with zero TS errors. astro check exits 0 with no diagnostics.
    Post-build verification (all must return matches):
    - `grep -c "<title>" dist/index.html` returns 1 (SEO-01)
    - `grep -c 'name="description"' dist/index.html` returns 1 (SEO-02)
    - `grep -c 'og:title' dist/index.html` returns 1 (SEO-03)
    - `grep -c 'og:image' dist/index.html` returns 1 (SEO-03, D-04)
    - `grep -c 'og:url' dist/index.html` returns 1 (SEO-03)
    - `grep 'og:image' dist/index.html` contains `https://apexcode.vercel.app/og-image.png` (absolute URL — per D-05, RESEARCH.md pitfall 3)
    - `grep -c 'canonical' dist/index.html` returns 1 (D-02)
    - `grep -c 'Skip to main content' dist/index.html` returns 1 (accessibility)
    - `grep -c 'Apex Code' dist/index.html` returns at least 1 (header wordmark)
    - `ls dist/sitemap-index.xml dist/robots.txt` both exist (SEO-05, SEO-06)
  </verify>
  <done>
    Layout.astro renders full HTML shell with SEO meta tags via astro-seo (SEO-01, SEO-02, SEO-03), Geist Sans font loaded at weights 400+600, skip link for accessibility. SiteHeader is sticky with logo wordmark and 4 anchor nav links hidden on mobile (NAV-01, FOUND-04). SiteFooter displays copyright. index.astro composes all components with empty main element ready for Phase 2 content. All SEO tags verified present in build output with absolute OG image URL (D-04, D-05). Background is #0a0a0a (FOUND-06).
  </done>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <name>Task 3: Deploy to Vercel and verify live site</name>
  <what-built>
    Complete Astro project with design system, layout shell (sticky header, footer), SEO metadata, sitemap, and robots.txt. Per D-03 and D-07, the project needs to be pushed to a GitHub repo and connected to Vercel via Git integration for auto-deploy.

    **Before this checkpoint, the executor must:**
    1. Initialize git in the project root (`git init`) if not already done (per D-07)
    2. Create a `.gitignore` with `node_modules/`, `dist/`, `.astro/` entries
    3. Stage and commit all project files
    4. Create a GitHub repository (via `gh repo create apexcode --public --source=.` or equivalent)
    5. Push to GitHub (`git push -u origin main`)

    The human then connects Vercel to the GitHub repo for auto-deploy. After the first deploy succeeds, the human verifies the items below.
  </what-built>
  <how-to-verify>
    **Step 1 — Connect Vercel (human action per D-03):**
    Go to vercel.com/new, import the `apexcode` GitHub repository. Vercel auto-detects Astro and deploys. Note the assigned `.vercel.app` URL.

    If the assigned URL differs from `apexcode.vercel.app`, update `SITE_URL` in `src/lib/metadata.ts` and `Sitemap:` URL in `public/robots.txt`, then push to trigger a rebuild.

    **Step 2 — Verify deployed site:**
    1. Open the `.vercel.app` URL in a browser — page loads with near-black (#0a0a0a) background and off-white text (FOUND-06)
    2. Sticky header is visible at the top with "Apex Code" wordmark and 4 nav links on desktop (NAV-01)
    3. Resize browser to 375px width — nav links are hidden, header still visible (FOUND-04)
    4. Footer shows copyright line at page bottom
    5. View page source (Ctrl+U) — confirm `<title>Apex Code — AI-Powered Development for SMBs</title>` is present (SEO-01)
    6. View page source — confirm `<meta name="description"` with correct content (SEO-02)
    7. View page source — confirm `og:title`, `og:description`, `og:image`, `og:url` tags are present (SEO-03)
    8. Visit `{URL}/sitemap-index.xml` — valid XML loads (SEO-05)
    9. Visit `{URL}/robots.txt` — text file loads with `Sitemap:` line (SEO-06)
    10. Run PageSpeed Insights on the URL — page loads under 3s on mobile (FOUND-05)

    **Step 3 — Verify Geist Sans font:**
    Open browser devtools, inspect the header wordmark text. Computed font-family should show "Geist Sans" (not a fallback system font).
  </how-to-verify>
  <resume-signal>Type "approved" if all checks pass, or describe issues found.</resume-signal>
</task>

</tasks>

<verification>
**Build gate (automated — run after Task 1 and Task 2):**
```bash
npm run build && npx astro check
```
Must exit 0 with zero TypeScript errors and zero diagnostics.

**Structural verification (automated — run after Task 2):**
```bash
# SEO tags present
grep -c "<title>" dist/index.html              # expect: 1
grep -c 'name="description"' dist/index.html   # expect: 1
grep -c 'og:title' dist/index.html             # expect: 1
grep -c 'og:image' dist/index.html             # expect: 1
grep -c 'og:url' dist/index.html               # expect: 1

# Sitemap and robots.txt in build output
ls dist/sitemap-index.xml                       # expect: exists
ls dist/robots.txt                              # expect: exists
grep 'sitemap-index.xml' dist/robots.txt        # expect: match

# Absolute OG image URL (not relative)
grep 'og:image' dist/index.html | grep 'https://'  # expect: match
```

**Live site verification (manual — Task 3 checkpoint):**
- Background color is #0a0a0a
- Sticky header with "Apex Code" wordmark and 4 nav links (desktop)
- Nav links hidden on mobile (375px)
- Footer copyright visible
- sitemap-index.xml and robots.txt accessible via URL
- PageSpeed: loads under 3s on mobile
</verification>

<success_criteria>
1. `npm run build` produces static output with zero TypeScript errors in strict mode (FOUND-01)
2. Tailwind v4 configured via `@theme {}` blocks with all 6 color tokens — no `tailwind.config.js` exists (FOUND-02)
3. Site is deployed to Vercel via GitHub Git integration (FOUND-03, D-03)
4. Layout is mobile-first: nav links hidden below md breakpoint, no horizontal overflow at 375px (FOUND-04)
5. Deployed site loads under 3s on mobile — zero client-side JS shipped (FOUND-05)
6. Page background is #0a0a0a (near-black, not pure black), text is #f5f5f5 (FOUND-06)
7. Sticky header with "Apex Code" wordmark and 4 anchor links: Services, Why Us, Process, Contact (NAV-01)
8. `<title>` tag present with 42-char title (SEO-01)
9. `<meta name="description">` present with 152-char description (SEO-02)
10. OG tags (og:title, og:description, og:image with absolute URL, og:url) present in HTML source (SEO-03, D-04, D-05)
11. `sitemap-index.xml` accessible at deployed URL (SEO-05)
12. `robots.txt` accessible at deployed URL, references `sitemap-index.xml` (SEO-06)
</success_criteria>

<output>
After completion, create `.planning/phases/01-foundation/01-01-SUMMARY.md`
</output>
