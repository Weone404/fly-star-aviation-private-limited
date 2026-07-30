# Technical SEO Findings — flystar.co.in

## Rendering
- **SPA, client-side rendered.** `is_spa: true`; raw HTML = 203-byte shell + loader. Rendered via Playwright/Chromium in 2.6s. Content, per-page meta, canonical, OG and page schema appear only after JS.
- Production serves hashed bundles (`/assets/index-CzYW4aBH.js`) + `modulepreload` vendor chunks. No dev-source leak (`/src/main.tsx` → SPA fallback, not real source).

## Crawlability & Indexability
- `robots.txt` allows Googlebot/Bingbot/Twitterbot/facebookexternalhit/* — but **no `Sitemap:` directive**.
- **Soft 404:** `GET /nonexistent-xyz` → HTTP **200** (SPA shell). Risk of soft-404 flags + junk indexing.
- Vercel rewrites: `/api/*` → api, `/sitemap.xml` passthrough, everything else → `index.html` (SPA fallback = source of the 200-on-404 behavior).
- 43-URL sitemap, valid XML, **no `<lastmod>`**. ~25 keyword-alias routes in `App.tsx` are NOT in the sitemap (good) but remain linkable/indexable with no canonical.

## Metadata delivery
- `useMeta.ts` fetches `https://fly-star-aviation-private-limited.onrender.com/api/meta?path=…` per navigation → sets `document.title` + description via DOM. Verified distinct output for `/`, `/about`, `/services/mro`.
- Risks: Render free-tier cold start (up to ~50s), single point of failure for ALL metadata, and a race with per-page `react-helmet-async` also setting the title.

## Security / Headers
- HTTPS + `strict-transport-security: max-age=63072000`. Missing: `X-Content-Type-Options`, frame protection/CSP, `Referrer-Policy`.

## Core Web Vitals
- Not captured live — PageSpeed Insights API returned HTTP 429 (quota exceeded). Re-run with API key.
