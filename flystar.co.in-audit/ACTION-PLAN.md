# Action Plan — flystar.co.in

Prioritized: **Critical → High → Medium → Low**. Effort = S (≤1h), M (½–1 day), L (multi-day).

## Phase 1 — Critical Fixes (Week 1)

| # | Fix | Effort | Where |
|---|-----|--------|-------|
| 1 | **Fix soft 404s** — return real HTTP 404 for unknown routes. On Vercel, serve a static `404.html`/status for non-matching paths, or SSR the status. At minimum stop returning 200 for junk URLs. | M | `vercel.json`, hosting |
| 2 | **Get per-page HTML rendered server-side** — start prerendering the 43 sitemap URLs at build (react-snap / vite prerender) OR plan SSR/SSG migration. This unblocks meta, canonical, OG, schema and AI readiness in one move. | L | build pipeline |
| 3 | **Add `Sitemap:` to robots.txt** → `Sitemap: https://www.flystar.co.in/sitemap.xml` | S | `public/robots.txt` |

## Phase 2 — High-Impact Improvements (Weeks 2–3)

| # | Fix | Effort | Where |
|---|-----|--------|-------|
| 4 | **Canonical on every page** — reuse the homepage `react-helmet-async` pattern; add `<link rel="canonical">` to all 41 remaining pages, pointing keyword-alias routes (e.g. `/best-atpl-classes-in-india`) at their canonical (`/courses/atpl`). | M | all `src/pages/**` |
| 5 | **Open Graph + Twitter Card tags** — add sensible defaults in `index.html` (og:site_name, og:type, og:image = a hosted 1200×630, twitter:card=summary_large_image) and per-page overrides via Helmet. | M | `index.html`, pages |
| 6 | **Per-page schema, not the homepage graph everywhere** — move the static `@graph` out of `index.html`; emit page-appropriate schema per route (Course on course pages, Service on service pages, correct BreadcrumbList, BlogPosting on blogs). Keep Organization/WebSite site-wide. | L | `index.html`, pages |
| 7 | **De-duplicate the title system** — pick one source of truth (Helmet per page) and drop the Render.com `useMeta` fetch, or make the backend the only writer. Remove the cold-start dependency. | M | `src/hooks/useMeta.ts` |
| 8 | **Fix keyword-stuffed schema `name` fields** — use the real brand name; move keyword phrases into `description`. | S | `index.html` |

## Phase 3 — Content & Authority (Month 2)

| # | Fix | Effort | Where |
|---|-----|--------|-------|
| 9 | **Differentiate or consolidate alias routes** — either give each keyword-alias URL unique content or 301/canonical them to the primary page to kill duplicate content. | M | routing/content |
| 10 | **Add E-E-A-T signals** — instructor/founder bios, DGCA approval numbers, accreditations, student outcomes; link from About. | M | content |
| 11 | **Add answer/FAQ blocks + `FAQPage` schema** on key pages ("What is CPL?", eligibility, fees) for AI Overviews/Perplexity citability. | M | pages |
| 12 | **Remove/slim `meta[name=keywords]`** global stuffing. | S | `src/hooks/useMeta.ts` |
| 13 | **Add `<lastmod>` to sitemap.xml** entries; regenerate on deploy. | S | `public/sitemap.xml` |

## Phase 4 — Monitoring & Iteration (Ongoing)

| # | Fix | Effort | Where |
|---|-----|--------|-------|
| 14 | **Measure real CWV** (CrUX/PSI with API key) after prerender; track LCP/INP/CLS on mobile. | S | — |
| 15 | Add security headers (`X-Content-Type-Options: nosniff`, `Referrer-Policy`, frame protection). | S | `vercel.json` |
| 16 | Convert remaining `.jpeg` aircraft images to WebP/AVIF; set explicit width/height to prevent CLS. | M | `public/*` |
| 17 | Submit sitemap in Google Search Console; monitor Coverage for soft-404 and duplicate reports. | S | GSC |
| 18 | Optional: add `llms.txt` for AI tooling. | S | `public/` |

---

### The one thing that matters most
Ship **server-rendered / prerendered HTML per route**. It converts four separate High/Critical problems (meta, canonical, OG, page schema) plus AI readiness from "do 42× by hand in JS" into "correct by construction."
