# Pitfalls Research

**Domain:** Developer studio / agency marketing landing page (static, dark-themed, Vercel-deployed)
**Researched:** 2026-03-26
**Confidence:** HIGH (multiple authoritative sources, Next.js/Vercel official docs confirmed)

---

## Critical Pitfalls

### Pitfall 1: Missing `metadataBase` — Broken OG Images on Social Share

**What goes wrong:**
Open Graph images resolve to relative URLs (e.g., `/og.png`) instead of absolute URLs. When shared on LinkedIn, Twitter/X, or Slack, the preview image fails to load entirely. The site looks unprofessional at the worst possible moment — when someone forwards the link to a potential client.

**Why it happens:**
Next.js App Router resolves OG image paths relative to the current route unless `metadataBase` is set in the root layout. Developers test locally where images appear fine in the DOM, but social crawlers fetch absolute URLs from an external IP and get 404s.

**How to avoid:**
Set `metadataBase` in `app/layout.tsx` before any other metadata work:
```ts
export const metadata: Metadata = {
  metadataBase: new URL('https://apexcode.dev'), // production URL
  // ...
};
```
Use the canonical production domain, not `localhost`. Set it as an environment variable (`NEXT_PUBLIC_SITE_URL`) so it works in preview deployments too.

**Warning signs:**
- OG image URL in page source starts with `/` not `https://`
- Social share preview tool (opengraph.xyz) shows broken image
- `<meta property="og:image">` value is a relative path

**Phase to address:** Foundation / SEO setup phase (day one, before any other metadata)

---

### Pitfall 2: `"use client"` Spread Across All Components — Kills the Performance Story

**What goes wrong:**
The entire React tree becomes client-side JavaScript. A site that should ship ~5–10 KB of JS ends up shipping 180+ KB because every layout, section, and card is hydrated. Core Web Vitals scores drop. The developer-audience visits a "lean" site that loads slower than average.

**Why it happens:**
Developers coming from pre-App Router Next.js (or React in general) habitually add `"use client"` to any component that uses props, events, or hooks. In App Router, the default is Server Components — you only add `"use client"` when the component genuinely needs browser APIs or event handlers.

**How to avoid:**
- Default every component to a Server Component (no directive needed)
- Only add `"use client"` to components that use `useState`, `useEffect`, `onClick`, or browser APIs
- For this site: the only candidates are the mobile hamburger menu toggle and any scroll-based animation. Everything else — hero, services cards, contact section — is static HTML and needs zero `"use client"`
- Verify with `next build` output: the JS bundle for a pure marketing page should be under 50 KB

**Warning signs:**
- `"use client"` appears at the top of layout files or section components
- `next build` reports a JS first-load of >100 KB for the homepage
- Lighthouse shows high "Total Blocking Time"

**Phase to address:** Foundation / component architecture phase

---

### Pitfall 3: Hero Image Without `priority` — LCP Fails

**What goes wrong:**
The Largest Contentful Paint element (typically the hero section's primary visual or headline) loads lazily, causing LCP scores of 4–8 seconds on mobile. Google Search Console flags the page as "Poor" for Core Web Vitals, hurting SEO ranking.

**Why it happens:**
Next.js `<Image>` components lazy-load by default, which is correct for below-the-fold images. Developers apply the same default to above-the-fold elements without realizing that the browser queues the hero image behind JavaScript parsing.

**How to avoid:**
- Add `priority` prop to any `<Image>` that appears above the fold in the hero section
- If the LCP element is a text heading (which is likely given the Vercel-like design reference), ensure the font is preloaded — use `next/font` with `display: 'swap'` and preload enabled
- For a text-primary dark design with no hero image, the LCP element is the heading — ensure the font CSS is inlined at build time (next/font handles this automatically)

**Warning signs:**
- Lighthouse LCP > 2.5s
- PageSpeed Insights flags "Largest Contentful Paint element" as a font or above-fold image
- `<Image>` in hero section has no `priority` attribute

**Phase to address:** Performance phase / component build phase

---

### Pitfall 4: Google Fonts via `<link>` Instead of `next/font` — CLS and Extra Round-Trip

**What goes wrong:**
Text renders in the system fallback font, then shifts to the custom font after it loads (FOUT). This causes visible layout shift — a particularly bad look on a typography-primary design. CLS score increases. Additionally, a manual `<link rel="stylesheet">` to fonts.googleapis.com adds a render-blocking network round-trip to Google's servers.

**Why it happens:**
Developers copy the Google Fonts embed snippet from fonts.google.com and paste it into `<head>`. It works visually but is the wrong approach for Next.js — the framework provides `next/font` specifically to solve this.

**How to avoid:**
```ts
// app/fonts.ts
import { Inter, JetBrains_Mono } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});
```
`next/font` self-hosts the font file at build time, eliminates the Google network request, inlines the font CSS, and uses `size-adjust` CSS to match fallback proportions — preventing layout shift even during the swap window.

**Warning signs:**
- `<link href="https://fonts.googleapis.com">` appears anywhere in the HTML source
- CLS score > 0.1 in Lighthouse
- Visible text flash / font swap visible during page load in slow-network tests

**Phase to address:** Foundation / typography setup (first commit)

---

### Pitfall 5: Layout Shift from Conditional Rendering by Screen Size in JavaScript

**What goes wrong:**
A component uses `window.innerWidth` or a `useEffect` + `useState` pattern to show/hide mobile vs desktop layouts. On first render (SSR), the server doesn't know the screen size, so it renders one layout, then JavaScript corrects it — causing a large CLS spike visible to Lighthouse and real users.

**Why it happens:**
Developers think "responsive" means conditional rendering in React. The correct approach for layout is CSS (`@media` queries or Tailwind responsive prefixes). JavaScript-based responsive logic is a CLS trap.

**How to avoid:**
- Use only CSS/Tailwind for show/hide based on screen size (`hidden md:block`, etc.)
- Never use `typeof window !== 'undefined'` to conditionally render layout sections
- Exception: a mobile menu *toggle state* (open/closed) is fine in `useState` — it doesn't affect layout on initial render

**Warning signs:**
- `useEffect` with `window.innerWidth` or `resize` event listeners in layout components
- Components that render `null` on server and content on client (results in hydration mismatches)
- CLS spikes on mobile in Lighthouse

**Phase to address:** Layout / responsive design phase

---

### Pitfall 6: Pure Black Background (`#000000`) — Halation and Accessibility Trap

**What goes wrong:**
Pure black (#000000) with pure white (#ffffff) text creates a contrast ratio so high that it causes "halation" — the text appears to glow and bleed, particularly for users with astigmatism (estimated 50% of the population). This is the opposite of the intended Vercel-like aesthetic, which uses near-black (#0a0a0a) with off-white text.

**Why it happens:**
Developers assume maximum contrast = best accessibility. Pure black is the default `bg-black` in Tailwind. The nuance of WCAG minimum vs. optimal contrast is missed.

**How to avoid:**
- Background: `#0a0a0a` or `#111111` (not `#000000`)
- Primary text: `#ededed` or `#f5f5f5` (not `#ffffff`)
- Secondary text: `#a1a1aa` (zinc-400) — still WCAG AA compliant
- Verify contrast ratios with the WebAIM Contrast Checker — aim for 7:1 for body text (AAA), minimum 4.5:1 (AA)
- Reference: Vercel's actual design tokens use `#000000` background but `#ededed` text, achieving ~14:1 ratio that avoids extreme halation

**Warning signs:**
- Tailwind `bg-black text-white` used as primary palette
- Contrast checker shows ratio above 18:1 (likely too harsh)
- Text looks "bloomy" or hard to read in screenshots on light displays

**Phase to address:** Design tokens / Tailwind config setup

---

### Pitfall 7: Vercel Hobby Plan Commercial Use Violation

**What goes wrong:**
Vercel's Hobby (free) tier explicitly restricts use to "non-commercial, personal use only." A commercial studio landing page — even without a product — is a commercial entity. Deployment succeeds but the terms of service are violated, creating legal and account-risk exposure.

**Why it happens:**
The restriction is buried in the plan comparison. Developers deploy to Vercel on the free tier without checking whether the Hobby plan covers commercial projects.

**How to avoid:**
- Use the Vercel Pro plan ($20/month) for any commercial project from day one
- Alternatively: deploy the same Next.js/Astro static output to Cloudflare Pages (free tier, no commercial restriction) or Netlify Starter (free, commercial allowed for static sites)
- If staying on Vercel Pro: 100 GB bandwidth, 6,000 build minutes, commercial use — more than sufficient for a studio landing page

**Warning signs:**
- Vercel project is on Hobby plan for a business/studio/agency site
- Vercel terms of service not reviewed before deployment

**Phase to address:** Infrastructure / deployment setup phase

---

### Pitfall 8: Salesy Language and Generic CTAs — Developer Audience Alienation

**What goes wrong:**
Headlines like "We Build the Future" or "Transforming Businesses with Technology" read as corporate cliche. Developer audiences — the likely referrers and evaluators for a dev studio — have high bullshit detection and will mentally downgrade credibility on contact. Generic CTAs like "Get Started" or "Learn More" fail to communicate what happens when clicked.

**Why it happens:**
Developers writing copy default to startup-speak patterns they've absorbed from marketing playbooks. The Vercel design reference is studied for visual style but not for copy tone.

**How to avoid:**
- Copy pattern from successful dev tool landing pages: problem-first framing ("We build AI tools that automate the workflows killing your margins"), not feature-first
- CTA should be specific: "Email Us" or "Work With Us" — tells the visitor exactly what action occurs
- Avoid: "Get Started", "Transform Your Business", "Cutting-Edge Solutions", "Leverage Synergies"
- The "Why Us" section should name the founders and their credentials — specificity builds trust with technical audiences
- Study: vercel.com, linear.app, supabase.com for tone reference

**Warning signs:**
- Any headline containing "future", "solutions", "leverage", "synergy", or "transform"
- CTA button text that doesn't describe what happens next
- Services described with adjectives rather than outcomes

**Phase to address:** Copy / content phase

---

### Pitfall 9: No `robots.txt` or `sitemap.xml` — Search Engines Can't Index Efficiently

**What goes wrong:**
Google indexes the site eventually without these, but the process is slower and the crawl budget is unguided. For a new domain (apexcode.dev likely has zero domain authority), every advantage matters. Missing structured crawl hints delays appearing in search results for branded queries.

**Why it happens:**
Static site SEO basics are often treated as "optional polish" rather than day-one requirements. Developers focus on the visible UI and defer crawl configuration.

**How to avoid:**
Next.js App Router has built-in file-based generation:
```
app/robots.ts   → generates /robots.txt
app/sitemap.ts  → generates /sitemap.xml
```
Both are trivial to implement for a single-page or few-page static site. Submit the sitemap to Google Search Console immediately after first deployment.

**Warning signs:**
- No `robots.txt` accessible at `yourdomain.com/robots.txt` post-launch
- Google Search Console shows "Discovered - currently not indexed" status
- `app/robots.ts` and `app/sitemap.ts` files absent from project

**Phase to address:** SEO foundations phase

---

### Pitfall 10: No `og:image` — Dead Social Previews for a Studio That Sells Trust

**What goes wrong:**
When the URL is shared in Slack, LinkedIn, or WhatsApp, no preview card appears — just a plain link. For a studio whose entire pitch is "trust us with your technical work," a broken social preview is a silent credibility killer.

**Why it happens:**
OG images are perceived as nice-to-have. For a portfolio/studio site they are conversion-critical because word-of-mouth sharing is the primary acquisition channel.

**How to avoid:**
- Next.js supports auto-generated OG images via `app/opengraph-image.tsx` using `ImageResponse` from `next/og` — no external service needed
- Minimum spec: 1200×630px, includes studio name + tagline + visual brand element
- Include both `og:image` and `twitter:image` (Twitter/X uses `twitter:card: summary_large_image`)
- Test with: https://opengraph.xyz before launch

**Warning signs:**
- `curl -s https://yourdomain.com | grep "og:image"` returns nothing
- Social share preview shows no image
- `app/opengraph-image.tsx` absent from project

**Phase to address:** SEO foundations / launch checklist phase

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Inline `style={}` for one-off spacing tweaks | Fast to write | Inconsistent spacing scale; hard to maintain dark/light theme toggles | Never on a design-system-intended site |
| `"use client"` on entire page file | Avoids thinking about server vs client boundary | Entire page ships as JS; kills performance story | Never |
| Hardcoded text strings in JSX | Simple | Blocks future i18n; violates project coding rules | Never — use i18n keys per coding rules |
| `<img>` tags instead of `next/image` | Familiar syntax | No automatic format optimization (WebP/AVIF), no lazy load, no CLS prevention | Never in Next.js |
| Google Fonts `<link>` embed | 30-second setup | Extra DNS lookup, render-blocking, potential CLS, privacy implications | Never in Next.js (use next/font) |
| Deploying on Vercel Hobby for commercial | Free | ToS violation, account risk | Never for commercial work |

---

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Vercel + Next.js | Not setting `NEXT_PUBLIC_SITE_URL` env var, so `metadataBase` hardcodes `localhost` in preview builds | Set env var in Vercel project settings; use it in `metadataBase` |
| Vercel + custom domain | Deploying without setting canonical URL in metadata, resulting in Vercel's auto-generated `.vercel.app` domain indexed by Google | Set canonical and `metadataBase` to the production custom domain before first public share |
| next/font + Tailwind | Font CSS variable not passed to `<html>` tag via `className`, so Tailwind `font-sans` doesn't pick it up | Apply font variable class to `<html>` in root layout: `<html className={inter.variable}>` |
| Google Search Console | Submitting sitemap before DNS propagation completes; GSC shows errors | Wait 24h after custom domain setup before submitting sitemap |

---

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Unoptimized SVG icons imported as React components | JS bundle inflates by icon library weight (e.g., lucide-react ships 50KB+ if tree-shaking fails) | Import individual icons by path, not whole libraries; verify bundle with `@next/bundle-analyzer` | Immediately at build time; visible on first Lighthouse run |
| CSS-in-JS (styled-components, Emotion) on a static page | Runtime style injection causes layout recalculation, hurts LCP and INP | Use Tailwind CSS or CSS Modules — zero runtime cost | Every page load on every visitor |
| Third-party scripts (analytics, chat) without `<Script strategy="lazyOnload">` | Render-blocking scripts inflate TBT and delay TTI | Use Next.js `<Script>` component with `strategy="afterInteractive"` or `"lazyOnload"` | Every page load; measurable in Lighthouse TBT |
| Large Tailwind CSS bundle (no PurgeCSS) | CSS file ships megabytes of unused utilities | Tailwind v3/v4 with App Router purges automatically via content config — verify `tailwind.config.ts` content paths include all component files | Only if content paths are misconfigured |

---

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| Email address hardcoded in JSX/HTML source | Email harvested by scrapers; increases spam | Use CSS obfuscation or a `mailto:` link with the address stored in an env var (`NEXT_PUBLIC_CONTACT_EMAIL`) — acceptable tradeoff for a simple contact CTA |
| No Content Security Policy header | XSS attack surface; not critical for a static page but flags on security scanners | Add CSP via `next.config.ts` headers; at minimum: `default-src 'self'`, allow `next/font` data URIs |
| `X-Frame-Options: DENY` missing | Site embeddable in iframes for clickjacking | Add security headers in `next.config.ts` response headers |

---

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Navigation with 5+ links on a studio landing page | Visitors scroll-hunt instead of following intended path; attention dilutes | Single-page site with anchor scroll nav: Hero → Services → Why Us → Process → Contact. 4-5 nav items maximum |
| Auto-played animations on scroll that block reading | Users on slow connections or with reduced-motion preferences get broken/jarring experience | Use `prefers-reduced-motion` CSS media query; keep animations subtle (fade-in, not parallax) |
| "Work With Us" CTA that goes nowhere (no contact section anchor) | Click frustration; trust drops | Ensure CTA in hero scrolls to or links directly to the contact section — test the scroll target exists before launch |
| Services section with equal visual weight for all 3 cards | Visitors don't know which service is the "hero" offer | One card can be visually elevated (border accent, slightly larger) to signal the primary offering |
| Founder photos absent from "Why Us" section | Developer audiences evaluate people, not brands; faceless studios feel untrustworthy | Include headshots — even professional-casual photos — in the Why Us section |

---

## "Looks Done But Isn't" Checklist

- [ ] **OG Image:** Site looks complete in browser but `og:image` is missing or relative — verify with https://opengraph.xyz
- [ ] **metadataBase:** Metadata exports exist but `metadataBase` is absent — social crawlers get relative image URLs
- [ ] **Mobile nav:** Desktop layout is complete but hamburger menu on mobile has no open/close toggle — test at 375px viewport
- [ ] **Font loading:** Page renders visually correct but fonts are loaded via Google Fonts `<link>` not `next/font` — check HTML source for `fonts.googleapis.com`
- [ ] **robots.txt / sitemap:** Site is live but `/robots.txt` returns 404 — verify `app/robots.ts` is present
- [ ] **CTA anchor:** Hero "Get in Touch" button exists but its `href="#contact"` has no matching `id="contact"` on the contact section
- [ ] **Vercel plan:** Project deployed and working but on Hobby tier — verify Pro plan active for commercial use
- [ ] **Canonical URL:** Site is indexed but both `yourdomain.com` and `www.yourdomain.com` are crawlable without a canonical tag specifying the preferred version
- [ ] **TypeScript strict mode:** Code compiles but `strict: true` is absent in `tsconfig.json` — violates project TypeScript standard
- [ ] **i18n keys:** UI text is hardcoded strings in JSX — violates project coding rules

---

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Missing metadataBase (discovered post-launch) | LOW | Add `metadataBase` to root layout, redeploy; social crawlers re-fetch within 24-48h |
| Wrong Vercel plan (Hobby for commercial) | LOW | Upgrade to Pro in Vercel dashboard; no redeployment needed |
| Google Fonts instead of next/font | LOW | Replace `<link>` with `next/font` import; one component change + redeploy |
| `"use client"` overuse (large bundle) | MEDIUM | Audit each component, remove `"use client"` from non-interactive ones; may require splitting mixed components into server + client parts |
| Missing OG image (site already shared) | LOW-MEDIUM | Add `app/opengraph-image.tsx`; redeploy; previously shared links won't auto-update on Twitter/LinkedIn — new shares will be correct |
| Pure black background (design already approved) | MEDIUM | Update design tokens in `tailwind.config.ts`; ripple through all components using `bg-black` |
| Salesy copy (site launched with it) | LOW (copy only) | Content edit + redeploy; no architectural change needed |

---

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Missing `metadataBase` | Phase 1: Foundation & SEO setup | Check HTML source: `og:image` value is absolute URL |
| `"use client"` overuse | Phase 1: Foundation & component architecture | `next build` JS first-load < 50 KB for homepage |
| Hero image without `priority` | Phase 2: Component build | Lighthouse LCP < 2.5s on mobile |
| Google Fonts via `<link>` | Phase 1: Foundation (typography) | HTML source has no `fonts.googleapis.com` reference |
| JS-based responsive layout | Phase 2: Layout / responsive | CLS < 0.1 in Lighthouse; no `window.innerWidth` in layout components |
| Pure black background | Phase 1: Design tokens / Tailwind config | No `#000000` in color palette; background uses `#0a0a0a` or equivalent |
| Vercel Hobby for commercial | Phase 3: Deployment setup | Vercel project dashboard shows Pro plan |
| Salesy copy | Phase 2: Content / copy | Copy review against dev tool landing page tone guide |
| Missing robots.txt / sitemap | Phase 3: SEO launch checklist | `GET /robots.txt` returns 200; `GET /sitemap.xml` returns valid XML |
| Missing OG image | Phase 2: SEO foundations | opengraph.xyz preview shows correct 1200×630 image |

---

## Sources

- [Next.js Metadata and OG Images — Official Docs](https://nextjs.org/docs/app/getting-started/metadata-and-og-images)
- [Common Mistakes with Next.js App Router — Vercel Blog](https://vercel.com/blog/common-mistakes-with-the-next-js-app-router-and-how-to-fix-them)
- [We Studied 100 Dev Tool Landing Pages — Evil Martians](https://evilmartians.com/chronicles/we-studied-100-devtool-landing-pages-here-is-what-actually-works-in-2025)
- [Next.js Core Web Vitals Optimization — BetterLink Blog](https://eastondev.com/blog/en/posts/dev/20251219-nextjs-core-web-vitals/)
- [Core Web Vitals Common Next.js Mistakes — Pagepro](https://pagepro.co/blog/common-nextjs-mistakes-core-web-vitals/)
- [Next.js Font Optimization — Official Docs](https://nextjs.org/docs/app/getting-started/fonts)
- [Inclusive Dark Mode Accessibility — Smashing Magazine](https://www.smashingmagazine.com/2025/04/inclusive-dark-mode-designing-accessible-dark-themes/)
- [Vercel Hobby Plan Limits and Commercial Use](https://vercel.com/docs/plans/hobby)
- [Vercel Pricing Breakdown 2025 — Flexprice](https://flexprice.io/blog/vercel-pricing-breakdown)
- [Next.js SEO Guide 2025 — Digital Applied](https://www.digitalapplied.com/blog/nextjs-seo-guide)
- [generateMetadata Errors — OneUptime](https://oneuptime.com/blog/post/2026-01-24-fix-nextjs-metadata-generation-errors/view)
- [Astro vs Next.js for Marketing Websites — Makers Den](https://makersden.io/blog/astro-vs-nextjs-marketing-website)

---
*Pitfalls research for: developer studio / agency marketing landing page (ApexCode)*
*Researched: 2026-03-26*
