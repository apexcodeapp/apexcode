---
phase: 3
slug: launch
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-26
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Astro build (`npm run build`) + manual browser checks |
| **Config file** | `astro.config.mts` |
| **Quick run command** | `npm run build` |
| **Full suite command** | `npm run build && npx astro check` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run build`
- **After every plan wave:** Run `npm run build && npx astro check`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 3-01-01 | 01 | 1 | OG image | build | `npm run build && ls dist/og-image.png` | ❌ W0 | ⬜ pending |
| 3-01-02 | 01 | 1 | Site URL | manual | `grep apexcode.dev src/lib/metadata.ts` | ✅ | ⬜ pending |
| 3-01-03 | 01 | 2 | Lighthouse | manual | Browser DevTools / Lighthouse CLI | ✅ | ⬜ pending |
| 3-01-04 | 01 | 2 | Sitemap | manual | `ls dist/sitemap-index.xml` | ✅ | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `public/og-image.png` — 1200×630px OG image asset (creation is manual/design task, not code)

*All other phase behaviors verified via build output or manual browser inspection.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Lighthouse scores | 95+ Perf, 100 A11y/BP/SEO | Requires deployed URL | Run Lighthouse in Chrome DevTools on production URL |
| OG preview | Correct title/desc/image | Requires external tool | Paste URL into opengraph.xyz |
| Google Search Console | Sitemap submitted, no errors | Requires GSC account | Submit sitemap URL in GSC property |
| JS bundle size | < 50 KB | Requires build output | Check Vercel build log or `du -sh dist/_astro/*.js` |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
