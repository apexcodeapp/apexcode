---
phase: 1
slug: foundation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-26
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — Phase 1 is a logic-free static scaffold; no unit test framework needed |
| **Config file** | none — Wave 0 installs |
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
| TBD — filled by planner during PLAN.md creation | | | | | | | |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- No test framework setup needed for Phase 1 (logic-free static scaffold)
- `npx astro check` available after scaffold — no install needed
- `npm run build` is the primary gate (TypeScript strict compilation)

*Existing infrastructure covers all phase requirements via build-time checks.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Tailwind tokens render correctly | FOUND-02 | Visual design check | Build + open `dist/index.html` in browser, inspect background color via devtools |
| Static output deploys to Vercel | FOUND-03 | Requires live deploy | Check Vercel build log, confirm deployed URL loads |
| Mobile-first layout | FOUND-04 | Responsive visual check | Browser devtools → responsive mode, 375px viewport |
| Page loads < 3s mobile | FOUND-05 | Requires PageSpeed Insights | Run PageSpeed on deployed `.vercel.app` URL |
| Background is `#0a0a0a` | FOUND-06 | Visual check | Browser devtools color picker on `<body>` background |
| Sticky header with anchor links | NAV-01 | Visual + scroll check | Scroll page, confirm header stays fixed; click each nav link |

---

## Build-Gate Verifications (Automated)

| Behavior | Requirement | Command | Expected Output |
|----------|-------------|---------|-----------------|
| Zero TS errors in strict mode | FOUND-01 | `npm run build` | Exit code 0, no TS errors |
| `<title>` present, 42 chars | SEO-01 | `grep -c "<title>" dist/index.html` | Returns 1 |
| `<meta name="description">` present | SEO-02 | `grep -c "meta name=\"description\"" dist/index.html` | Returns 1 |
| OG tags present | SEO-03 | `grep -c "og:title" dist/index.html` | Returns 1 |
| `sitemap-index.xml` exists | SEO-05 | `ls dist/sitemap-index.xml` | File exists |
| `robots.txt` exists | SEO-06 | `ls dist/robots.txt` | File exists |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
