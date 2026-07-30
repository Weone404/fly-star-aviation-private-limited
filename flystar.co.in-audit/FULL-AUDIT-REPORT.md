# Full SEO Audit — flystar.co.in

**Site:** https://www.flystar.co.in
**Business:** Flying Star Aviator Private Limited — DGCA pilot training institute + aviation services, Dwarka, New Delhi
**Detected type:** Local Service / Educational Organization (pilot training) + B2B aviation services
**Stack:** Vite + React SPA (client-side rendered), React Router, deployed on Vercel; meta served by a separate Render.com Node backend
**Audit date:** 2026-07-30
**Method:** Live render (Playwright/Chromium) + source code review of `fly-star-aviation-private-limited/`

---

## Executive Summary

### Overall SEO Health Score: **55 / 100**

The site has genuinely good raw ingredients — a rich, valid JSON-LD schema graph, a clean 43-URL sitemap, keyword-mapped alias routes, WebP images with alt text, a preloaded LCP hero, and per-page titles/descriptions. **But almost none of it reaches non-JavaScript crawlers**, because the entire site is a client-side-rendered SPA where per-page metadata, canonical tags and content only appear *after* React boots and (for meta) after a call to an external Render.com API. The static HTML shipped for **every** URL is the homepage's title, description and schema.

This is the root cause behind most findings below. Google can render JS, so it will eventually see the right content — but with delay, cold-start risk, and no safety net. Social crawlers (Facebook, LinkedIn, WhatsApp, X), Bing, and most AI crawlers do **not** execute JS and will see the homepage title/description/schema on every single page.

### Top 5 Critical / High Issues
1. **Client-side rendering — per-page meta, canonical, OG & schema exist only after JS runs.** Every route ships identical homepage `<title>`, description and JSON-LD in the raw HTML. (Critical)
2. **Soft 404s** — non-existent URLs return HTTP `200` with the SPA shell instead of `404`. Google will flag these as soft 404s and can index junk URLs. (Critical)
3. **No canonical tag on 41 of 42 pages** (only the homepage has one). Combined with ~25 keyword-alias routes that render the same components, this is an open duplicate-content risk. (High)
4. **Open Graph / Twitter Card tags exist only on the homepage.** Sharing any inner page shows the generic homepage title/no image. (High)
5. **`robots.txt` has no `Sitemap:` directive** and the same static JSON-LD graph (Organization + CPL breadcrumb) is injected on every page, mislabeling `/about`, `/services/*`, `/blogs`, etc. (High)

### Top 5 Quick Wins
1. Add `Sitemap: https://www.flystar.co.in/sitemap.xml` to `robots.txt` (1 line).
2. Add a Vercel 404 rewrite / status handling so unknown routes return a real 404.
3. Bake default Open Graph + Twitter tags into `index.html` (image, site name, type).
4. Add `<link rel="canonical">` via react-helmet-async on every page (pattern already used on the homepage).
5. Add `<lastmod>` to `sitemap.xml` entries; trim the keyword-stuffed schema `name` fields.

---

## 1. Technical SEO — Score 45/100

**What works**
- HTTPS enforced with HSTS (`max-age=63072000`).
- Production ships hashed, bundled assets (`/assets/index-*.js`) with `modulepreload` for vendor chunks — no dev-source leak.
- `robots.txt` allows all major crawlers; Brotli compression active (`content-encoding: br`).
- Clean, human-readable URL structure (`/pilot-training/india`, `/courses/cpl`, `/dgca/medical`).
- Valid XML sitemap with 43 URLs.

**Findings**
- **[Critical] Client-side rendering.** Raw HTML is a 203-byte shell + loader; all content requires JS (`is_spa: true`). Googlebot renders JS but on a deferred queue; Bing, social and many AI crawlers do not. There is no SSR/SSG/prerender fallback.
- **[Critical] Soft 404.** `GET /this-page-does-not-exist-xyz123` → HTTP `200`. The React `NotFound` component renders but the HTTP status is success. Search engines treat these as soft 404s.
- **[High] Per-page `<title>`/`<meta description>` are injected client-side.** `useMeta.ts` fetches `https://fly-star-aviation-private-limited.onrender.com/api/meta?path=…` on every navigation and sets `document.title` via DOM. Render.com free instances cold-start (up to ~50s) — if the fetch is slow or fails, the page keeps the homepage fallback title. This is also a single external point of failure for all metadata.
- **[High] Two systems fight over `document.title`.** `useMeta()` (backend fetch) and per-page `react-helmet-async` both set the title; last-writer-wins race.
- **[High] `robots.txt` omits the `Sitemap:` directive.**
- **[Medium] Missing security headers** beyond HSTS: no `X-Content-Type-Options`, `X-Frame-Options`/CSP `frame-ancestors`, or `Referrer-Policy`.
- **[Medium] Core Web Vitals not measurable live** — PageSpeed API was rate-limited (HTTP 429) during the audit. SPA JS payload (React + icons + UI vendor chunks) is a likely mobile TBT/LCP risk; measure before/after any SSR work.

---

## 2. Content Quality — Score 65/100

**What works**
- Broad, intent-matched topical coverage: CPL/ATPL/PPL, DGCA subjects (medical, computer number, ground classes, RTR), country training pages, airline-interview prep, and B2B services (MRO, CAMO, charter, aircraft management).
- Clear E-E-A-T anchors: founded 2008, physical Dwarka address, phone, Google/Justdial/YourStory profiles.
- One `<h1>` per page across all 42 page files (good heading discipline).

**Findings**
- **[High] All body content is JS-dependent.** Non-rendering crawlers and AI answer engines see almost no text — hurting citability and non-Google indexing.
- **[Medium] E-E-A-T depth.** No visible author/instructor bios, DGCA approval numbers, or credential pages surfaced; add named-expert and accreditation signals for a YMYL-adjacent education niche.
- **[Medium] Thin-content risk on alias routes** — ~25 keyword-alias URLs (e.g. `/best-atpl-classes-in-india`, `/commercial-pilot-training-in-dwarka`) render the *same* component as the canonical page, i.e. duplicate bodies with no differentiation.

---

## 3. On-Page SEO — Score 55/100

**What works**
- Distinct, keyword-aligned titles/descriptions are defined per path in the meta backend (verified for `/`, `/about`, `/services/mro`).
- Descriptive URLs and a single H1 per page.

**Findings**
- **[High] Titles/descriptions not in static HTML** — every URL's raw HTML carries the homepage title *"Flying Star Aviator | Best Pilot Training Institute in India"* and homepage description. Only JS updates them.
- **[High] Canonical present on homepage only** (`src/pages/Index.tsx`). 41 pages have no canonical → alias/duplicate routes cannot consolidate signals.
- **[Medium] Keyword-stuffed `meta[name=keywords]`** — the full `GLOBAL_KEYWORDS` list is injected on every page. Ignored by Google; a spam signal at worst, noise at best. Remove or slim.
- **[Low] Alias routes not in sitemap** (good — avoids explicit indexing) but still linkable/indexable without canonical.

---

## 4. Schema / Structured Data — Score 55/100

**What works**
- Rich, valid JSON-LD `@graph` in `index.html`: Organization, WebSite (+SearchAction), Place, EducationalOrganization (with geo, hours, contactPoint, knowsAbout), Service, Course, BreadcrumbList. 4 blocks, all parsed valid (14 KB).

**Findings**
- **[High] The same homepage graph is served on every route.** `/about`, `/services/mro`, `/blogs/*` all carry the Organization + **"CPL Training" breadcrumb** + CPL/ATPL Course schema — factually wrong for those pages. Breadcrumbs and page-type schema should be per-page.
- **[Medium] Keyword-stuffed `name` fields** — e.g. Organization `name` = *"Flying Star Aviator Private Limited | Best Cadet Pilot Training Institute in India - DGCA CPL Flight Training in Delhi"*. Google may treat this as manip­ulative; use the real legal/brand name and move keywords to `description`.
- **[Medium] Missing per-page schema opportunities:** `Course` on each course page, `Service` on each service page, `FAQPage` where FAQs exist, `BlogPosting` on blog articles, `LocalBusiness` variations per location page.
- **[Low] `image` points to a Google `lh3.googleusercontent.com` URL** — prefer a self-hosted, stable image.

---

## 5. Performance (CWV) — Score 60/100 (estimated; field data unavailable)

**What works**
- LCP hero preloaded with responsive `srcset` (`/images/hero-aircraft-{480,800,1280}.webp`) — all return 200.
- `preconnect` to Google Fonts, non-blocking font load, route-level `React.lazy` code-splitting, `modulepreload` for vendor chunks, WebP imagery, Brotli.

**Findings**
- **[Medium] Live CWV not captured** — PageSpeed Insights API returned 429 (quota). Re-run with an API key / CrUX for real LCP/INP/CLS.
- **[Medium] JS-first render cost** — full-page hydration before any content paints; the 3s `setTimeout` gating popups and multiple vendor chunks add main-thread work. Watch mobile TBT/INP.
- **[Low] Initial loader** is inline (good for perceived speed) but the true content LCP still waits on React + lazy chunk.

---

## 6. Images — Score 70/100

**What works**
- WebP across hero/location/logo assets; alt text present on `<img>` (multiline JSX — e.g. `alt={currentLocation.name}` in `Locations.tsx`).
- Responsive hero `srcset`; `apple-touch-icon.png` and `favicon.ico` resolve (200).

**Findings**
- **[Medium] Explicit `width`/`height` (or aspect-ratio) not consistently set** on content images → CLS risk. Verify against measured CLS.
- **[Low] Some aircraft images are `.jpeg`** (`public/*.jpeg`) — convert to WebP/AVIF for consistency and weight.
- **[Low] `image` in schema is an external Google-hosted URL** (see Schema).

---

## 7. AI Search Readiness — Score 40/100

**Findings**
- **[High] Content invisible to non-rendering AI crawlers.** GPTBot, PerplexityBot, and AI Overviews passage extraction largely rely on server HTML; this site ships an empty shell. Low citability despite good schema.
- **[Medium] No `llms.txt`** (optional; ignored by Google Search but used by some AI tools).
- **[Medium] No passage-level answer blocks in static HTML** (definitions, FAQs, "what is CPL" style Q&A) that AI engines quote.
- **Positive:** strong Organization/EducationalOrganization schema and NAP consistency aid entity understanding *once rendered*.

---

## Root Cause & Strategic Recommendation

Almost every High/Critical item traces to one decision: **a marketing/SEO site built as a pure client-side SPA with metadata delivered by JS + an external API.** The highest-leverage fix is to **render HTML on the server**:

- **Best:** migrate to SSR/SSG (Next.js, or Astro, or `vite-plugin-ssr`/Vite SSG) so each route ships full HTML with its own title, description, canonical, OG tags, page-specific schema and body content.
- **Faster interim:** add a **prerendering** step (e.g. `vite-plugin-prerender`/`react-snap`, or Vercel's prerender/`@vercel/og` + a prerender service) for all sitemap URLs, and inline per-page meta/canonical/OG at build time.

Everything else (canonical, OG, per-page schema, soft-404, AI readiness) is either solved or dramatically easier once HTML is server-rendered.
