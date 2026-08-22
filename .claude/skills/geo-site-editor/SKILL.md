---
name: geo-site-editor
description: Makes direct code changes in the Flying Star website repo — adds new pages using the site's own templates, restructures existing pages, wires meta and schema, updates sitemap/llms.txt/internal links, and commits on feature branches. Use when asked to apply changes, add a page to the site, restructure a page in code, or commit prepared content.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash, WebFetch
---

# GEO Site Editor

## Role
The site admin's hands. Authorized in CLAUDE.md — edit freely, follow the gates
exactly.

## The stack (already discovered — do not re-derive)
- Vite + React 18 + TypeScript + Tailwind + shadcn/ui. Deployed on Vercel.
- Routes: `src/App.tsx` (lazy imports + `<Route>`); keyword aliases mapped to
  canonical paths in `src/lib/routes.ts`.
- Page components: `src/pages/**` (e.g. `src/pages/dgca/full-form.tsx` — 620
  lines — is the reference long-form guide template).
- Meta: `src/lib/pageMeta.ts` (+ `src/lib/routeMeta.ts`), applied by
  `src/hooks/useMeta.ts`. Keywords in `src/lib/seoKeywords.ts`.
- Schema: built in `src/lib/schema.ts`, injected by `src/hooks/useSchema.ts`.
  Site-wide Organization/EducationalOrganization/WebSite graph is in
  `index.html`.
- **Prerender / render gate:** `npm run build` -> `scripts/prerender.js`
  (postbuild). It parses the `routeMeta` object out of `src/lib/routeMeta.ts`
  (plus blog routes from `src/lib/blogData.js`) and writes static HTML for each.
  `vercel.json` then serves: filesystem first, a hardcoded path regex ->
  `/index.html`, and a final `/(.*)` -> **404**.
  **A route with no `routeMeta.ts` entry is never prerendered and returns HTTP
  404 in production.** Verified 2026-08-22: 15 of 43 sitemap URLs 404 for
  exactly this reason. `routeMeta.ts` is the gate; `sitemap.xml` only advertises.
- `public/robots.txt` already allows all AI crawlers. `public/llms.txt` exists
  and is maintained by hand.

## Where new articles go (decided — do not deviate without asking)
New GEO guides become **real routed pages** under `src/pages/`, not entries in
the blog. The blog (`src/pages/BlogDetail.tsx`, `src/lib/blogData.js`) loads
posts client-side from an Express/Mongo API at numeric URLs (`/blogs/3`) — no
prerendering, no per-post meta, no descriptive slug. It is unfit for GEO
content. If the user wants a post in the blog anyway, say this first.

## Work types
A. **Add new article** (input from geo-article-writer):
   1. Create `src/pages/<section>/<slug>.tsx` following the structure of
      `src/pages/dgca/full-form.tsx` (same layout components, heading rhythm,
      Tailwind classes) so it is visually indistinguishable from existing pages.
   2. Add the lazy import + `<Route>` in `src/App.tsx`.
   3. Add title/description to `src/lib/pageMeta.ts` (title <=60, desc <=155).
   4. Add breadcrumb labels + the page-type node in `src/lib/schema.ts`
      (Article/Course/FAQPage as appropriate).
   5. Add the URL to `public/sitemap.xml` with today's `<lastmod>`.
   6. Add the page to `public/llms.txt` under the right section.
   7. Add internal links FROM 2–3 related existing pages, descriptive anchors.
B. **Restructure existing page**: apply geo-page-optimizer output. Never change
   slug, meta title intent, or H1. Never delete existing Q&A passages.
C. **Technical fixes**: robots.txt, llms.txt accuracy, homepage Organization
   schema/sameAs, sitemap accuracy, prerender coverage.
D. **Site-wide when asked**: internal anchors, alt text, heading hierarchy.

## Quality gates before every commit
- JSON-LD parses (no trailing commas, quotes escaped).
- `npm run lint` clean for touched files; `npm run build` runs clean (report the
  result — prerender needs Chromium and may fail locally; say so rather than
  hiding it).
- Internal links verified against real routes (grep `src/App.tsx`).
- No analytics, contact form, backend, payment or admin code touched.

## Git workflow (mandatory)
1. Branch `geo/<short-topic>` off main.
2. Small commits, message format: `[GEO] what, on which page`.
3. NEVER push, merge or deploy unless explicitly commanded in the conversation.
4. After committing print: branch name · files changed · exactly what to review ·
   suggested manual checks before merge.

## Escalation
If a request violates a CLAUDE.md gate, stop and explain. If content must live
outside this repo (blog API/Mongo), say so and deliver paste-ready content
instead of guessing.
