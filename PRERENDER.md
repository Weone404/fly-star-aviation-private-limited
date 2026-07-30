# Static Prerendering

The site is a client-side React SPA. To give crawlers, social bots and AI
engines real per-page HTML (title, description, canonical, Open Graph tags and
rendered body content), we prerender every sitemap URL at build time.

## How it works

1. `vite build` produces `dist/` (the normal SPA build).
2. `scripts/prerender.mjs` starts `vite preview`, opens a headless Chromium
   (via `puppeteer-core`), visits every `<loc>` in `dist/sitemap.xml`, waits for
   React + the `useMeta` hook to finish, and writes the fully-rendered HTML to
   `dist/<route>/index.html`.
3. On Vercel, static files are served **before** the SPA catch-all rewrite in
   `vercel.json`, so `/services/mro` is served from `dist/services/mro/index.html`
   directly — no JavaScript required to see the content or metadata.

Page metadata is the local map in `src/lib/pageMeta.ts` (read synchronously by
`src/hooks/useMeta.ts`). There is **no** runtime dependency on the Render meta
API anymore — add or edit titles/descriptions there.

## Commands

```bash
npm run build:prerender   # vite build + prerender all sitemap routes
npm run prerender         # prerender only (expects an existing dist/)
```

## Chromium resolution

`scripts/prerender.mjs` looks for Chromium in this order:

1. `PUPPETEER_EXECUTABLE_PATH` env var
2. A Playwright-managed Chromium (`~/.cache/ms-playwright` / `~/Library/Caches/ms-playwright`)
3. System Chrome/Chromium

## Deploying on Vercel

Set the **Build Command** to install a browser, then build + prerender:

```
npx playwright install chromium && npm run build:prerender
```

(Output directory stays `dist`.) Alternatively, set `PUPPETEER_EXECUTABLE_PATH`
to a Chromium binary available in the build image.

If the browser can't be provisioned in CI, the site still deploys as a working
SPA — you just lose the prerendered HTML for that deploy.

## When you add a new route

1. Add it to `public/sitemap.xml` (with `<lastmod>`).
2. Add a title/description entry in `src/lib/pageMeta.ts`.
3. If it's a keyword alias of an existing page, add it to `ALIAS_CANONICAL` in
   `src/hooks/useMeta.ts` so it canonicalizes correctly.
