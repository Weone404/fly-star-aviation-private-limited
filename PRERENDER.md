# Static Prerendering

The site is a client-side React SPA. The supported `npm run build` lifecycle
generates route data, builds the client bundle, prerenders route HTML, and scans
the generated admin bundles.

## Supported build lifecycle

`package.json` wires the normal build as:

1. `prebuild`: `scripts/fetch-blogs.mjs`, `scripts/generate-sitemap.mjs`, and
   `scripts/generate-feed.mjs`.
2. `build`: Vite creates `dist/`.
3. `postbuild`: `scripts/prerender.js` writes static HTML, then
   `scripts/verify-admin-client.mjs` checks the client bundles.

The Preview blog fetch is intentionally fail-closed: configure canonical
`VITE_API_URL`, `PREVIEW_BACKEND_API_ORIGIN`, and
`PRODUCTION_BACKEND_API_ORIGIN` as documented in [DEPLOYMENT.md](./DEPLOYMENT.md)
before running a Preview build. `BLOG_API_URL` is only a legacy fallback when
`VITE_API_URL` is unset. The selected origin must match the isolated Preview
backend, never Production. The sitemap and feed generators write files under
`public/`, so run the lifecycle in a disposable copy when validating changes.

## Routes and metadata

`scripts/prerender.js` builds its route list from `src/lib/routeMeta.ts` and
`getBlogRoutes()` in `src/lib/blogData.js`. It serves the built `dist/` locally
and writes rendered snapshots under `dist/<route>/index.html`. It does not read
the sitemap to choose prerender routes.

`scripts/generate-sitemap.mjs` generates `public/sitemap.xml` from
`src/lib/routeMeta.ts` and eligible substantive blog posts. Keep the route
metadata and sitemap in sync; `src/test/renderGate.test.ts` checks that
sitemap entries have a prerender route. The React `useMeta` hook reads
`src/lib/routeMeta.ts` to set title, description, canonical, Open Graph, and
Twitter metadata. Structured data is provided by the schema builder.

Vercel serves matching static files before the terminal 404 route in
`vercel.json`, so a generated route file can return rendered HTML without
requiring the client app to create the page first.

## Commands and alternate script

```bash
npm run build          # supported lifecycle: prebuild, Vite, postbuild
npm run prerender      # separate legacy scripts/prerender.mjs; expects dist/
```

`npm run build:prerender` also invokes the separate `scripts/prerender.mjs`
after a direct Vite build. It does not run the `prebuild` or `postbuild`
lifecycle and must not be treated as equivalent release validation. The
`postbuild`-wired `scripts/prerender.js` is the supported production path.

`vercel.json` contains routing rules, not a `buildCommand`. Verify in Vercel
Project Settings that the configured build command is `npm run build`; do not
assume the alternate script or a historical dashboard override is active.
Vercel settings have not been inspected as part of this candidate work.

## Chromium

`scripts/prerender.js` uses `PRERENDER_EXECUTABLE_PATH` when set. On Windows,
set it to an installed Chrome/Chromium executable or the script skips
prerendering. On other platforms it can use the bundled
`@sparticuz/chromium`; when an external executable fails, it attempts the
bundled binary. The prerender browser resolves external hostnames as unavailable
and only allows page requests to its own local static server. Build-time blog
fetching remains a separate, explicitly configured step before Vite builds; the
browser cannot fall back to a remote API, tracker, font, or image host. Metadata
and HTML URLs are still rendered as authored, but remote assets are not fetched
during prerender.

## Adding a route

1. Add the route to `src/App.tsx`.
2. Add its render-gate metadata to `src/lib/routeMeta.ts`.
3. Add appropriate schema through the existing schema builder when needed.
4. Run the supported build lifecycle in a safe environment and verify the
   route's generated HTML and metadata.
5. The sitemap is generated from the route metadata; do not edit it by hand.
6. Add relevant internal links and update `public/llms.txt` where appropriate.

For release validation steps, including isolated Preview variables and the
restriction against Production API access, follow [DEPLOYMENT.md](./DEPLOYMENT.md).
