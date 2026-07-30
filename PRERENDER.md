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
2. A Playwright-managed Chromium (`~/.cache/ms-playwright` / `~/Library/Caches/ms-playwright`) — used on dev machines
3. System Chrome/Chromium
4. **`@sparticuz/chromium`** — a Chromium built for minimal serverless Linux
   (Vercel/Lambda) that runs without extra system libraries. Used automatically
   in CI when no local browser is found.

## Deploying on Vercel

**No dashboard changes are needed.** `vercel.json` sets:

```
"buildCommand": "vite build && (node scripts/prerender.mjs || true)"
```

So every deploy runs `vite build`, then prerenders all sitemap routes using the
bundled `@sparticuz/chromium`. The `|| true` makes prerender **best-effort**: if
the browser can't start for any reason, the build still succeeds and ships the
working SPA (no prerendered HTML that deploy) — never a broken deploy.

> If a stale Build Command is set in the Vercel dashboard, clear it so the
> `vercel.json` `buildCommand` takes effect.

After a deploy, confirm prerendering is live:

```
curl -s https://www.flystar.co.in/services/mro | grep -i "<title>"
```

It should show the **MRO** page title, not the homepage title.

## When you add a new route

1. Add it to `public/sitemap.xml` (with `<lastmod>`).
2. Add a title/description entry in `src/lib/pageMeta.ts`.
3. If it's a keyword alias of an existing page, add it to `ALIAS_CANONICAL` in
   `src/hooks/useMeta.ts` so it canonicalizes correctly.
