# Phase 1: Foundation — Discussion Log

**Session:** 2026-03-26
**Mode:** discuss-phase (interactive)

---

## Gray Areas Identified

Three gray areas were presented and all three selected for discussion:
1. Domain & Vercel deployment
2. OG image placeholder strategy
3. Scaffolding approach

---

## Area 1: Domain & Vercel Deployment

**Q:** Is the domain apexcode.dev purchased? Where should Phase 1 deploy to?
**Options:** Deploy to .vercel.app first / Domain is purchased — use it now
**Answer:** Deploy to .vercel.app first

**Q:** How should the Vercel project be connected?
**Options:** Git integration / Vercel CLI manual deploy
**Answer:** Git integration (GitHub push → auto-deploy)

**Decisions captured:** D-01, D-02, D-03

---

## Area 2: OG Image Placeholder Strategy

**Q:** Phase 1 SEO contract requires og:image in the HTML. The actual image is a Phase 3 deliverable. How should Phase 1 handle this?
**Options:** Include the tag with a placeholder path / Skip the og:image tag for now
**Answer:** Include the tag with a placeholder path

**Decisions captured:** D-04, D-05

---

## Area 3: Scaffolding Approach

**Q:** How should the Astro project be initialized?
**Options:** npm create astro@latest — Empty template / Manual file creation
**Answer:** npm create astro@latest — Empty template

**Q:** Should the planner initialize git and create the GitHub repo as part of Phase 1?
**Options:** Yes — init git + create GitHub repo / No — skip git/GitHub setup
**Answer:** Yes — init git + create GitHub repo

**Decisions captured:** D-06, D-07

---

*For human reference only. Not consumed by researcher or planner agents.*
