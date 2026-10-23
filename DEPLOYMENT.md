# DEPLOYMENT.md — flystar.co.in
Updated 2026-10-22.

## 1. Stack
Vite 6 · React 18 · TypeScript · Tailwind · shadcn/ui · Express + Mongoose
backend in `backend/` · Vercel.

## 2. Environment variables
| Variable | Where | Requirement and notes |
|---|---|---|
| `NODE_ENV` | Backend service environment (Render) | Set to `production`; otherwise the session cookie does not get the `Secure` flag |
| `VITE_API_URL` | Frontend build environment (Vercel) | Public backend base URL used by build-time blog fetching when `BLOG_API_URL` is unset; never put credentials in it |
| `BLOG_API_URL` | Vercel build environment | Explicit backend origin for `scripts/fetch-blogs.mjs`; required for Preview builds and must point to the isolated Preview backend there. Every other build must explicitly set `BLOG_API_URL` or `VITE_API_URL`; there is no Production default |
| `BACKEND_API_ORIGIN` | Vercel Production environment | Required HTTPS origin for the production `/backend-api/` proxy; no production fallback is used when missing |
| `PREVIEW_BACKEND_API_ORIGIN` | Vercel Preview environment | Required HTTPS origin for preview proxy requests; must differ from `PRODUCTION_BACKEND_API_ORIGIN` |
| `PRODUCTION_BACKEND_API_ORIGIN` | Vercel Preview environment | Required HTTPS origin guard; preview requests/builds fail closed if the preview origin equals this production origin |
| `FLYSTAR_DEPLOYMENT_ENV` | Backend service environment (Render) | Required in production: `production` selects `MONGODB_URI`; `preview` selects only `PREVIEW_MONGODB_URI`; any other value fails closed |
| `ADMIN_TRUSTED_ORIGINS` | Render backend environment (optional in production; required on isolated preview backend) | Comma-separated exact HTTPS origins. When set, replaces code defaults; on preview set only the exact Vercel preview origin |
| `ADMIN_USERNAME` | Backend service environment (Render) | Required to enable admin login; non-empty; use a fresh value |
| `ADMIN_PASSWORD` | Backend service environment (Render) | Required to enable admin login; at least 16 UTF-8 bytes; use a fresh value and never reuse one exposed in client assets |
| `ADMIN_SESSION_SECRET` | Backend service environment (Render) | Required to enable admin login; at least 32 UTF-8 bytes; generate randomly and rotate independently |
| `MONGODB_URI` | Production backend (Render) and Vercel Production Function environment | Production database URI; never configured for Preview |
| `PREVIEW_MONGODB_URI` | Preview backend (Render) and Vercel Preview Function environment | Required Preview-only database URI; Preview code never falls back to `MONGODB_URI` |
| `CLOUDINARY_CLOUD_NAME` | Backend service environment (Render) | Optional; required with the API key and secret for image uploads |
| `CLOUDINARY_API_KEY` | Backend service environment (Render) | Optional; image-upload credential, keep server-side |
| `CLOUDINARY_API_SECRET` | Backend service environment (Render) | Optional; image-upload secret, keep server-side |
| `RESEND_API_KEY` | Backend service environment (Render), if email notifications are enabled | Email provider secret; keep server-side |
| `ENQUIRY_NOTIFY_TO` | Backend service environment (Render), if email notifications are enabled | Recipient address or comma-separated list |
| `ENQUIRY_NOTIFY_FROM` | Backend service environment (Render), if email notifications are enabled | Verified sender address |
| `VERCEL_DEPLOY_HOOK_URL` | Backend service environment (Render), if blog-triggered rebuilds are enabled | Deployment hook secret; keep server-side |
| `PRERENDER_EXECUTABLE_PATH` | CI only, optional | Path to a stock Chrome/Chromium. When unset, the bundled `@sparticuz/chromium` is used |
| `PRERENDER_PORT` | optional | Defaults to 4173 |
| `PORT` | Supplied by Render | The server listens on `process.env.PORT`, falling back to `5000`; do not hard-code a production port |
| `RENDER_EXTERNAL_URL` | Supplied by Render at runtime | Current service's HTTPS origin; the backend uses this only for its optional keep-alive request and has no hard-coded production URL fallback |

Admin browser requests use the same-origin `/backend-api/` proxy so the
`HttpOnly`, `Secure` (in production), `SameSite=Lax` session cookie remains
first-party in browsers. The Vercel function selects `BACKEND_API_ORIGIN` only
for production and `PREVIEW_BACKEND_API_ORIGIN` only for previews. It returns
`503` if the applicable origin is missing or invalid and never falls back
between environments. Preview proxying and blog fetching also require
`PRODUCTION_BACKEND_API_ORIGIN` and reject an equal Preview origin. Preview blog
fetching requires `BLOG_API_URL` and rejects the production Render hostname.
If the configured Preview blog API fails or returns an invalid response, the
Preview build stops and leaves the prior generated blog module untouched; it
does not silently build from stale fetched data.
The Vercel contact function selects `PREVIEW_MONGODB_URI` for Preview and does
not fall back to `MONGODB_URI`. Local Vite development proxies the same path to
`localhost:5000`.

The backend auth code fails closed for admin requests if any of the three
`ADMIN_*` settings are absent or invalid. It does not prevent the HTTP server
from starting. Admin session creation, validation, and revocation use the
shared MongoDB `admin_sessions` collection; if MongoDB is unavailable, admin
authentication returns `503` rather than issuing or accepting an untracked
session. The shared MongoDB `admin_login_attempts` collection rate-limits
attempts per configured admin account and backend socket address to five
attempts in a fixed 15-minute window; a sixth attempt returns `429` with
`Retry-After`.
Successful login clears that address/account bucket. The shared database and
TTL indexes are required before the backend enables Mongo-backed admin auth.
The environment-specific MongoDB URI is not required for the process to start,
but it is required for admin authentication and durable storage.

Sessions expire after eight hours and are invalidated on logout through a
shared MongoDB store, so revocation is not tied to one backend process. Every
backend instance must use the same intended database. MongoDB TTL indexes are
created for session and login-attempt expiry before the backend marks MongoDB
ready; an index-creation failure leaves admin auth unavailable (`503`) rather
than using a local fallback. Logical expiry is checked on reads even before
MongoDB's asynchronous TTL cleanup runs. Verify the Render `MONGODB_URI`
configuration before enabling admin access.

`.env.production` remains tracked and contains only the public `VITE_API_URL`
setting; it was inspected without printing its value. `backend/.env` contains
non-placeholder, credential-shaped values for `MONGODB_URI`,
`CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`. It has been removed from
Git tracking in this candidate while preserving the local file, and
`backend/.env` is explicitly ignored. The same sensitive-looking keys are
present in historical Git blobs; removing the current index entry does not
erase that history. Treat the MongoDB database credentials and Cloudinary API
key/secret as exposed and rotate/revoke them through their providers before
any deployment that uses them. No credentials were printed or rotated, and
Git history was not rewritten. Production startup does not load `backend/.env`.

### Manual credential rotation checklist

These credentials appeared in historical Git blobs. Treat them as exposed;
complete this checklist through the provider dashboards before production use.
No secret values should be pasted into tickets, chat, commits, or shell logs.
Do not revoke the old credential until its replacement has been verified.

- [ ] **MongoDB replacement:** Create a new least-privilege database user.
  Prefer separate Preview and Production users, each scoped to its own
  database; the Preview user must not read or write production collections.
- [ ] **MongoDB Preview verification:** Set the new Preview credential only in
  Render Preview `PREVIEW_MONGODB_URI` and, only if the Vercel contact function
  is enabled there, Vercel Preview `PREVIEW_MONGODB_URI`. Verify `/healthz`,
  session/index readiness and a disposable Preview-only read/write check.
- [ ] **MongoDB Production update:** After Preview verification, update
  Production Render `MONGODB_URI` and Vercel Production `MONGODB_URI` only if
  the production contact function is intentionally enabled. Verify connectivity
  using the authorized production change procedure; do not use production
  data-mutating tests for this verification.
- [ ] **MongoDB revocation:** Only after every intended service uses and has
  verified the replacement, revoke the historical database user. Confirm the
  old credential can no longer authenticate, without recording its value.
- [ ] **Cloudinary replacement:** Create a replacement API key/secret. Update
  Render Preview only if uploads are enabled there, preferably with a separate
  Preview account/key and isolated asset location. Verify one disposable
  Preview upload and access to that asset.
- [ ] **Cloudinary Production update and revocation:** Update Production
  `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` through the authorized
  change process. Verify the replacement with an approved non-destructive
  connectivity check, then revoke the historical key/secret and verify the old
  key no longer authenticates.
- [ ] Record only completion status, environment, and verification outcome.
  Never record credential values. Rotation does not erase historical Git
  blobs; history has not been rewritten.

### Admin configuration and preview gate

These are setup instructions only; no Render or Vercel settings have been
inspected or changed for this candidate.

**Preview admin traffic fails closed until the separate preview service is
configured.** The proxy has no production fallback in Preview and rejects the
production Render hostname. Do not submit credentials or test mutations until
the following settings are configured and independently checked:

Complete this checklist in the provider dashboards. Values below are names and
formats, not credentials; do not paste actual values into this document.

**Vercel — Preview environment**

- [ ] Use a stable, dedicated Preview site origin, for example
  `https://preview.example.com`. Do not use the production site origin. Add this
  exact origin to the Preview backend's trusted-origin setting.
- [ ] Set `PREVIEW_BACKEND_API_ORIGIN=https://<preview-render-host>` to the
  separate Preview Render service origin, with HTTPS and no path, query,
  fragment, username, or password.
- [ ] Set `PRODUCTION_BACKEND_API_ORIGIN=https://<production-render-host>` as
  the production-origin comparison guard only. Preview proxy requests must use
  `PREVIEW_BACKEND_API_ORIGIN`, never this guard value.
- [ ] Set `BLOG_API_URL` and `VITE_API_URL` to the same Preview backend origin
  as `PREVIEW_BACKEND_API_ORIGIN`. This explicitly overrides tracked
  `.env.production`, whose public default is production-like. These values must
  contain no credentials.
- [ ] Do **not** set Preview `BACKEND_API_ORIGIN` or production `MONGODB_URI`.
  If the Vercel `api/contact.js` function is enabled in Preview, set only
  `PREVIEW_MONGODB_URI` to the isolated Preview database; otherwise leave it
  unset.
- [ ] Keep analytics, email delivery, and deploy hooks disabled unless their
  Preview integrations are separately isolated and explicitly required.
- [ ] Verify every variable is scoped to **Preview** (not Production or
  Development) and redeploy the Preview only after the separate backend is
  ready.

**Render — Preview backend service**

- [ ] Create a separate Render service; root directory `backend/`, Node
  `>=20.19.0`, build command `npm ci`, start command `npm start`, health-check
  path `/healthz`. Render supplies `PORT`; do not hard-code it.
- [ ] Set `NODE_ENV=production` (for secure cookies) and
  `FLYSTAR_DEPLOYMENT_ENV=preview`.
- [ ] Set only `PREVIEW_MONGODB_URI` to a Preview-only database and least-
  privilege user that cannot access Production. Do not set `MONGODB_URI`.
  Ensure all Preview instances use the same URI and `flystarDB` collections
  `admin_sessions` and `admin_login_attempts`.
- [ ] Set fresh, Preview-only `ADMIN_USERNAME`, `ADMIN_PASSWORD` (at least 16
  UTF-8 bytes), and `ADMIN_SESSION_SECRET` (at least 32 bytes); none may match
  Production or any historically exposed value.
- [ ] Set `ADMIN_TRUSTED_ORIGINS` to only the exact HTTPS Preview site origin.
  No wildcard, production origin, path, or unrelated origin.
- [ ] Leave `CLOUDINARY_*`, `RESEND_API_KEY`, `VERCEL_DEPLOY_HOOK_URL`, and
  email recipient/sender settings absent unless their integrations have
  isolated Preview credentials, targets, and test data.
- [ ] From non-secret settings, independently verify service root/build/start/
  health settings, Preview database isolation, trusted origin, and matching
  backend origins. If any item cannot be confirmed, stop; the proxy must return
  `503` and no live credentials or mutations may be tested.

### Production-only configuration reference

The following items describe Production configuration. Do not copy Production
database or admin credentials into Preview; complete the separate Preview
checklist above first.

1. Generate the session secret locally in Windows PowerShell without writing it
   to the terminal or a file:

   ```powershell
   $bytes = New-Object byte[] 32
   $rng = [System.Security.Cryptography.RandomNumberGenerator]::Create()
   $rng.GetBytes($bytes)
   Set-Clipboard -Value ([Convert]::ToBase64String($bytes))
   [Array]::Clear($bytes, 0, $bytes.Length)
   $rng.Dispose()
   ```

   Paste it directly into the backend service's secret environment setting,
   then clear the clipboard. Do not paste it into chat, source, a Vite variable,
   a commit, a screenshot, or an audit log. The Base64 output encodes 32 random
   bytes and satisfies the server's minimum-length check.
2. Set `NODE_ENV=production` and `FLYSTAR_DEPLOYMENT_ENV=production` on the
   production backend. Configure `MONGODB_URI` for its durable database. A
   preview backend must instead set `FLYSTAR_DEPLOYMENT_ENV=preview` and only
   `PREVIEW_MONGODB_URI`; the process ignores `MONGODB_URI` in that mode. Add
   optional Cloudinary, Resend, and deploy-hook variables only for services
   that are deliberately enabled.
3. `backend/package.json` now declares Node `>=20.19.0` and all direct backend
   runtime imports. Set Render Root Directory to `backend`, Build Command to
   `npm ci`, and Start Command to `npm start`; the backend lockfile makes this
   install reproducible. Do not install from the frontend root for this service.
4. The server listens on `0.0.0.0:$PORT`; Render supplies `PORT` (the code's
   local fallback is `5000`). Set the Render health-check path to `/healthz`.
   This readiness route returns `200` only after both MongoDB connections and
   the session/rate-limit TTL indexes are ready; it returns `503` otherwise.
   Legacy `GET /` remains a process response and is not a readiness check. The
   keep-alive request uses Render's automatically supplied
   `RENDER_EXTERNAL_URL`; it never falls back to the production hostname. The
   actual Render configuration has not been inspected; verify it from the
   dashboard before enabling admin access.
5. For an isolated Preview backend, set only the exact preview site origin in
   `ADMIN_TRUSTED_ORIGINS`. The backend CORS allowlist and admin origin guard
   use this same setting. Leave it unset in Production to use the code's
   production defaults; never use `*`.
6. Verify every Render instance in an environment selects the same intended
   database URI. Production uses `flystarDB.admin_sessions` and
   `flystarDB.admin_login_attempts` from `MONGODB_URI`; Preview uses the same
   collection names from its isolated `PREVIEW_MONGODB_URI`. Admin auth fails
   closed when the selected URI or TTL index initialization is unavailable.
7. Login attempts are limited to five per admin account/socket address in a
   rolling 15-minute window. The next attempt receives `429` and `Retry-After`;
   successful login resets that address's counter. Do not load-test this with
   real credentials or production endpoints.

Do not start preview auth testing until the Vercel preview variables, isolated
Render backend/database, clean install, exact preview origin, fresh credentials,
and shared session/rate-limit stores are configured and confirmed. With missing
or invalid preview variables, the proxy returns `503`; once configured, it
routes only to the separately configured preview backend. Store only redacted
status/header evidence; never record passwords, tokens, or cookie values.

### Preview test checklist — all live tests pending

Run these only after preview admin traffic is routed to an authorized, isolated
preview backend and database with disposable blog fixtures. The proxy returns
`503` until valid preview configuration is supplied; do not submit credentials
or attempt mutations until that configuration and the isolated backend/database
have been independently verified. Do not run mutations or repeated login
attempts against production.
Record timestamp, preview URL, request path/method, status, and redacted
response headers/results. Every item remains **PENDING PREVIEW** until actually
tested through the deployed preview.

| # | Test and safe method | Expected result and evidence |
|---|---|---|
| 1 | Submit valid fresh credentials once through the preview login form | `200`; session cookie has `HttpOnly`, `Secure`, `SameSite=Lax`; record attributes only, not its value |
| 2 | Submit one deliberately invalid credential pair | `401` with generic error; confirm no credential details in body or logs |
| 3 | Call `GET /backend-api/api/admin/session` after login | `200` with authenticated status; record status/body without cookie |
| 4 | Request `GET /backend-api/api/admin/blogs` without a cookie | `401`; confirm no private blog data in the body |
| 5 | Send unauthenticated create/update/delete requests using disposable request bodies | `401`; confirm no storage mutation; delete remains disabled and returns `405` with an authorized session |
| 6 | Exercise malformed, tampered, and expired sessions using test-only fixtures or an isolated test clock | `401`; do not wait-test by repeatedly attempting live login |
| 7 | Log out, then replay the old cookie once against the preview session endpoint | Logout returns `204`; replay returns `401`; record no cookie value |
| 8 | Update a disposable preview-only blog with an authenticated session | Expected success; verify only the disposable fixture changed, then remove it using the approved preview data procedure |
| 9 | Request the public blog list and a known public blog detail | `200`; public content remains readable and private fields are absent |
| 10 | Call login/session/blog routes through the Vercel `/backend-api/` proxy | Status and response match the intended Render backend route; record method/path/status and redacted headers |
| 11 | Complete login, then make an authorized request in the same browser | Cookie is sent automatically; no JavaScript access to the `HttpOnly` value |
| 12 | Logout and test expiry through the Vercel proxy | Logout clears the same cookie scope; expired/revoked session is rejected |
| 13 | From an allowed preview origin and an unrelated origin, test login and write requests | Allowed preview succeeds with credentials; unrelated or missing Origin is rejected for login/write; verify CORS response headers |
| 14 | Call the preview Render backend directly without a cookie, then through Vercel | Direct unauthenticated mutations return `401`; proxy does not bypass authorization |
| 15 | Inspect the actual Render database configuration and test session revocation across backend instances | Every instance uses the same intended MongoDB store; logout revocation is effective across instances; save only non-secret configuration evidence |
| 16 | Recheck SEO pages, metadata, redirects, sitemap URLs, and unknown paths on preview | Topic pages and sitemap URLs return expected rendered HTML; canonical/OG agree; salary alias redirects permanently; unknown paths return `404` |
| 17 | Use a dedicated disposable Preview account and make six failed login attempts from one test address | First five return generic `401`; next returns `429` with `Retry-After`; do not use a Production account/address; verify recovery after the 15-minute window or with an approved isolated test fixture |
| 18 | Log in once, route authenticated session checks to two independently identified Preview backend instances, then log out and repeat on both | Both instances accept the same valid session and reject it after revocation; Render configuration or repeated load-balanced requests alone do not prove that distinct instances were reached |
| 19 | Fetch blogs during the Preview build from the isolated Preview backend with an approved disposable fixture | Build report names only the Preview origin; fixture passes the committed approval/hash gate; sitemap/feed/prerender include only intended content; no Production blog content is fetched |
| 20 | Submit contact/application forms with a clearly marked test payload using an isolated database and non-delivering email sink | Expected validation and persistence occur only in Preview; no customer contact or Production collection is touched; verify duplicates/invalid fields are safely handled |
| 21 | Upload one harmless test image using Preview-only Cloudinary credentials and an isolated Preview asset location | Upload and retrieval work; asset is not written to a Production location; remove the disposable Preview asset after recording redacted evidence |
| 22 | Open representative sitemap pages at desktop and mobile viewports, including home, one training guide, one location, contact, and a blog detail | No horizontal overflow or broken primary navigation; key content, images, and CTA render; capture screenshots with no user data or credentials |
| 23 | Inspect raw response HTML and browser metadata on representative routes; follow an alias and request an unknown route | Title, description, canonical, OG/schema agree with route; alias redirects to canonical; prerendered pages load; unknown route returns true `404` |
| 24 | Load sitemap and feed on the Preview deployment and compare to the successful isolated Preview build report | Only approved routes/posts appear; generated URLs return the expected Preview response; no stale/generated Production blog data is included |
| 25 | In a controlled Preview maintenance window, verify missing database/readiness, malformed requests, and unavailable optional providers using approved failure injection | `/healthz` and admin operations fail closed with safe `503`/validation responses; no stack traces, credentials, tokens, or success-shaped fallback appear in responses or logs |

## 3. Build
`npm run build` runs `prebuild`, `vite build`, and `postbuild`. The `prebuild`
blog fetch requires an explicitly configured `BLOG_API_URL` or `VITE_API_URL`;
it never defaults to the Production backend. Without either setting, the fetch
script exits before making a network request or writing generated files. A
Production API origin must never be used for local validation. **Do not run this
command unqualified in a working tree or ordinary CI job.** Validate in a
disposable copy using the isolated Preview backend or a network-restricted local
fixture as described below.

```bash
npm run test
npm run lint
# Run npm run build only in the isolated, disposable setup described below.
# Run npm run smoke only against an explicitly authorized Preview deployment.
```

The full build is three stages:

| Stage | Script | Does |
|---|---|---|
| `prebuild` | `fetch-blogs.mjs`, `generate-sitemap.mjs`, `generate-feed.mjs` | Fetches blog posts from the selected backend through the quality gate; regenerates `public/sitemap.xml` from `routeMeta.ts` and the RSS feed under `public/` |
| `build` | `vite build` | The SPA bundle |
| `postbuild` | `prerender.js` | Writes a static HTML file per route |

A build that skips `postbuild` ships an empty SPA shell to crawlers. A build that
skips `prebuild` ships yesterday's blog posts and a stale sitemap/feed.

`npm run feed` regenerates `public/feed.xml` from the currently available merged
blog data; it does not fetch the backend. The full build's `prebuild` fetches
blogs from the explicitly selected API, then generates the sitemap and feed in
order. Use that isolated full-build workflow when the feed must include fresh
approved database posts.

### Safe full-build validation

The full `npm run build` lifecycle has been run in a sanitized temporary copy
using a loopback-only HTTPS fixture. The fixture accepted only `GET /api/blogs`
and returned an empty disposable dataset; its log showed one request. The copy
had no `.env.production` or `backend/.env`. The prebuild generators, Vite build,
prerender, and admin bundle scan completed; all 85 generated sitemap URLs had
prerendered HTML files. This validates the lifecycle mechanics with an empty
fixture, not fetched Preview blog content, a deployed Preview environment,
Production behavior, or Render/Vercel settings.

For a real Preview-data build, use a disposable clean copy without
`.env.production`, `backend/.env`, or Production credentials. Install with
`npm ci --ignore-scripts`, explicitly set `BLOG_API_URL`, `VITE_API_URL`, and
`PREVIEW_BACKEND_API_ORIGIN` to the isolated Preview backend, and set
`PRODUCTION_BACKEND_API_ORIGIN` only as the comparison guard. Restrict network
egress to the isolated Preview backend and deny the Production backend before
running `npm run build` in that copy. All four variables must be origin-only
URLs without credentials, paths, queries, or fragments. The Preview backend
must use its separate Preview database; the production origin is a comparison
guard and must never be contacted. The command's generators rewrite files
under `public/`, `src/lib/`, and the build output, so review changes only in the
disposable copy. If isolated service configuration and egress controls cannot
be confirmed, do not run a build against any remote service; use the approved
loopback fixture or keep Preview-data validation blocked.

### Blog publishing — how a post actually goes live
There are two publishing paths and they behave differently.

| Path | Lands in | Live when |
|---|---|---|
| Curated repository content | Tracked blog data | When the currently configured deployment workflow builds it; verify its trigger and obtain owner authorization |
| `/admin/blog` | MongoDB, via `POST /api/blogs` | **Only on the next build** |

The second path needs a rebuild to become crawlable, because prerendering happens
at build time. Until a rebuild runs, an admin-published post is served by the SPA
at runtime but has no static HTML, no meta tags and no sitemap entry.

### Canonical URL redirects

`vercel.json` permanently redirects `/pilot-salary-in-india` to the canonical
`https://www.flystar.co.in/pilot-salary-india` URL, redirects the apex host to
HTTPS `www`, and upgrades HTTP requests on `www` to HTTPS. The host redirects
preserve the requested path. Vercel project-level domain assignments or
dashboard redirects can take precedence or add another redirect, so verify the
Preview deployment and custom-domain settings before treating hostname
normalization as live.

**The rebuild trigger is wired.** `backend/server.js` calls the hook after a
successful create or update on `/api/blogs`; deletion through that API is
disabled. To turn it on:

1. In Vercel, create a deploy hook only after confirming the intended deployment
   target and obtaining explicit owner authorization.
2. Set `VERCEL_DEPLOY_HOOK_URL` in the backend environment (Render).

If the variable is unset the call is a no-op and blog writes behave exactly as
before. A hook failure never fails the write — the post is already saved.

Treat the hook URL as a secret; anyone holding it can trigger builds.

**It publishes nothing by itself.** A rebuild only picks up posts on the approval
list whose content hash still matches, so a write by someone else triggers a
build and is still held back.

**Nightly fallback.** The hook fires on database writes, not on approvals.
Whether an approval commit triggers a deployment depends on the repository's
currently configured workflow; do not assume a branch or deployment target.
Configure a nightly rebuild only after verifying its target and obtaining
explicit owner authorization. Example GitHub Actions workflow:

```yaml
# .github/workflows/nightly-rebuild.yml
name: Nightly rebuild
on:
  schedule:
    - cron: "30 19 * * *"   # 01:00 IST
  workflow_dispatch:
jobs:
  rebuild:
    runs-on: ubuntu-latest
    steps:
      - run: curl -fsS -X POST "$HOOK"
        env:
          HOOK: ${{ secrets.VERCEL_DEPLOY_HOOK_URL }}
```

### Snapshots: where they may live
`.gitignore` covers `*-snapshot.json`, but that is a backstop against committing,
not a storage policy.

| File | Where | Why |
|---|---|---|
| `blog-snapshot.json` | Repo folder is fine (ignored) | Post content, already public |
| `contacts-snapshot.json` | **Outside the repo folder** | Real names, phone numbers and email addresses |

The contacts export does not belong in a directory whose habitual verb is
`git add -A`, and it does not belong on a shared machine. Earlier guidance in this
project said to write both into the repo folder; that was wrong for the contacts
file, and this table supersedes it.

The unauthenticated `GET /api/contacts` route has been removed. Any future
contacts export must use an authorized, privacy-preserving database procedure;
do not restore a public API route to make a backup.

### Enquiry notifications
The Express backend's `POST /api/contact` sends one notification email per
enquiry. Configure in the backend environment (Render):

| Variable | Required | Notes |
|---|---|---|
| `RESEND_API_KEY` | yes, to enable | From resend.com |
| `ENQUIRY_NOTIFY_TO` | yes, to enable | Recipient, or a comma-separated list |
| `ENQUIRY_NOTIFY_FROM` | no | Verified sender; defaults to `onboarding@resend.dev` |

The website forms currently post to the same-origin `/api/contact`; the
repository also contains a Vercel Function at `api/contact.js`. That function
does not call the Express notifier. The Resend settings above therefore affect
only requests routed to the Render Express endpoint, not necessarily the
website's current form submissions. Verify the deployed route before claiming
that enquiry emails are enabled. The Vercel function also needs `MONGODB_URI`
in the Vercel Function environment.

The Express endpoint has a honeypot and a per-IP rate limit of 5 in 10 minutes.
The separate `api/contact.js` Vercel Function does not implement those guards;
confirm which handler serves `/api/contact` and apply appropriate protection
before relying on the Express controls.

### Analytics
Dormant until configured. See `docs/ANALYTICS.md` for the GA4-vs-Plausible
comparison and the two variables. Nothing loads until both are set.

### Blog approval — the workflow
Nothing written in `/admin/blog` reaches the public site until you approve it by
name. The approval list is `src/lib/blogApproval.ts`.

```
write in /admin/blog  ->  review it  ->  npm run blogs:approve -- <slug>
                                     ->  commit src/lib/blogApproval.ts
                                     ->  rebuild
```

| Command | Does |
|---|---|
| `npm run blogs:list` | Every post in the database with its state: approved, NOT APPROVED, or CHANGED SINCE APPROVAL |
| `npm run blogs:approve -- <slug>` | Adds the slug and pins the sha256 of its content as it stands now |
| `npm run blogs:approve -- <slug> --note "..."` | Same, with a note recorded beside the approval |

Run these from a machine that can reach the API, then commit the changed file.

**Approve last, not first.** The hash pins whatever exists at the moment you run
the command. If a post still needs an edit — a figure to source, a slug to
repair, a sentence to rewrite — make the edit in `/admin/blog` *first*, then
approve. Approving pre-edit content and fixing it afterwards trips the tamper
alarm on the very next build, and a false alarm on day one is how a real one gets
ignored on day thirty.

**Why an approval allowlist and not a filter.** Server-side admin sessions now
protect the blog create/update endpoints. The approval allowlist is a separate
publication control: unknown or changed content is not approved for the static
site, even when an authorized administrator saved it.

**The content hash.** Approving pins the exact text. If an approved post's
content later differs, `prebuild` **fails the build** and prints both hashes.

**Treat this failure as a tamper alarm, not routine drift.** `PUT /api/blogs/:id`
requires an admin session. A changed hash is evidence to investigate; do not
assume the update was unauthenticated or infer who made it from the hash alone.

The rule:

1. **Do not re-approve a changed hash until a teammate confirms they made the
   edit.** Ask before you run the approve command, not after.
2. **If nobody claims it**, check the backend request logs for `PUT /api/blogs`
   around the time of the change before doing anything else. Render's log
   retention on lower tiers is short, so check within days.
3. Only once the edit is accounted for: re-read the post, run
   `npm run blogs:approve -- <slug>` to re-pin, and commit.

Re-approving first and asking later launders the tamper in — the build goes
green, the changed text publishes, and the one signal that something happened is
gone. The inconvenience of asking is the entire value of the control.

That is why the failure exists: an approval describes specific text, so text that
has changed is not approved.

**Held-back posts are invisible to visitors too**, not just to crawlers.
`Blogs.tsx` and `BlogDetail.tsx` both check the same list, so an unapproved post
does not appear in the listing and does not render at its URL.

### Sanitisation
Post bodies are rendered through `dangerouslySetInnerHTML`. Both paths sanitise:
`src/lib/sanitizeHtml.ts` at runtime, `scripts/sanitize.mjs` at build time, with
`src/test/sanitizeHtml.test.ts` asserting the two agree. Allowlist-based — script
tags, event handlers, `javascript:` URLs, iframes, forms and inline styles are
stripped. Approval is a review of the *text*; sanitisation is what makes the
*markup* safe. Both are needed.

### Blog quality gate (safety net, not the control)
`blog-gate.json` decides which fetched posts may be advertised. A post needs a
title, a usable slug, 300+ words, a unique slug, and no configured spam marker.
Rejected posts still render in the SPA; they get no static file and no sitemap
entry. Check `blog-gate-report.json` after each build to see what was held back
and why — it is gitignored, so read it in the build log or locally.

To publish something the gate is holding: fix the post in `/admin/blog`, or
adjust `blog-gate.json` deliberately. Do not bypass the gate.

### Prerender documentation and alternate script
`PRERENDER.md` documents the wired `postbuild` path: `scripts/prerender.js`
uses `src/lib/routeMeta.ts` and `getBlogRoutes()`. The separate
`scripts/prerender.mjs` remains an alternate legacy command and is not part of
the supported build lifecycle. Do not treat it as equivalent; review and
retire it separately only after confirming no external workflow depends on it.

### Prerendering cannot run everywhere
Chromium must launch. It will not on Windows without
`PRERENDER_EXECUTABLE_PATH`; this candidate's full local fixture build was
verified on Windows with a local Chrome executable. A deployed Vercel or GitHub
Actions build has not been verified as part of this release-readiness work.

## 4. Adding a page — the checklist that matters
A route is live only if **all** of these exist. Missing number 3 produces an
HTTP 404 that looks exactly like a page that was never built.

1. Component in `src/pages/…`
2. `<Route>` in `src/App.tsx` (static routes rank above `:param` routes in React Router 6, so order is not the concern — presence is)
3. **Entry in `src/lib/routeMeta.ts` — THE RENDER GATE**
4. Entry in `src/lib/pageMeta.ts`
5. Schema, if the page type needs more than the default WebPage + BreadcrumbList
6. `<url>` in `public/sitemap.xml`
7. Line in `public/llms.txt`
8. Inbound links from 2–3 related pages
9. `npm run test` — `renderGate.test.ts` fails if 3 and 6 disagree

## 5. Deployment authorization
This document does not authorize a branch change, merge, push, or deployment.
The candidate may be detached or contain uncommitted work; do not infer its
branch or release state from this runbook. Only the repository owner may select
the release branch and separately authorize merge, push, and deployment after
all Preview and credential-rotation gates are complete. Do not use Production
as a build or test target.

Repository workflows may filter or merge selected branches. Inspect their
current configuration before relying on or changing that behavior; this runbook
does not authorize branch changes, pushes, merges, or deployments.

## 6. After the first deploy — do these in order
1. **Spot-check the 15 revived URLs.** Every one should return 200:
   `/courses/cabin-crew` · `/courses/ground-staff` ·
   `/become-a-pilot/commercial-pilot-licence` ·
   `/become-a-pilot/airline-transport-pilot-licence` · `/dgca/computer-number` ·
   `/editorial-policy` · `/locations/{delhi,mumbai,bangalore,hyderabad,india,usa}` ·
   `/pilot-training/{ppl,cpl,maldives,sri-lanka,guide-to-conversion}`.
   Also confirm `/dgca/board-verification` returns a 301, not a 404.
2. **View source, not the rendered page.** Confirm the H1 and body text are in
   the raw HTML. If they only appear after JavaScript runs, prerendering did not
   happen for that route and the SEO work has not landed.
3. **Check the build log for the blog fetch.** `blog-gate-report.json` must show
   `"outcome": "ok"` with a `merged` count. A Preview fetch failure stops its
   build and keeps prior generated data untouched; fix the isolated backend and
   rebuild the Preview. Production fetch failures are reported and may leave the
   feed/sitemap without fresh database posts, so resolve the API issue before
   treating that build as content-complete.
4. **Run the smoke check** — `npm run smoke`. It fetches every sitemap URL and
   fails on anything that is not 200, and verifies declared redirects still 3xx.
   Treat a failure here as a blocker, not a warning.
5. **Google Search Console** — submit `sitemap.xml`, then request indexing on
   `/dgca/computer-number` and the five `/pilot-training/*` pages directly.
6. **Validate structured data** — Rich Results Test on `/dgca/computer-number`
   and one `/pilot-training/*` page. Confirm the FAQ answers in the markup match
   the visible accordion text word for word.
7. **Google Business Profile** — align name, address and phone to §1 of `SEO.md`
   exactly, and confirm the GBP category reflects a training institute. Add the
   `sameAs` URLs already in `index.html`.
8. **Install analytics.** There is none today (see `SEO.md` §6).

## 7. Blocked, needing owner input
| Item | Why it is blocked |
|---|---|
| **Admin deployment gate** | Candidate code now uses server-side sessions and protects blog writes/private reads. A sanitized local backend clean install passed, but Render's configured install boundary, Preview-origin allowlisting, Production environment variables, Vercel cookie forwarding, and cross-instance shared-store behavior remain unverified. Do not enable admin access until the preview gates above pass |
| **Public backend surface** | Public blog reads, contact submission, and metadata routes remain public by design. Blog writes and the admin blog list require server authorization; deletion is disabled. The old `GET /api/contacts` route is removed. Verify deployed endpoints in an authorized preview; CORS is not an authorization control |
| `/privacy-policy`, `/terms` | Drafts complete but hold ~13 `[CONFIRM]` items only the business knows: analytics and pixels in use, third parties receiving data, retention periods, grievance officer, minimum enrolment age, registered MCA address. The footer's links to them were removed rather than left pointing at 404s |
| Canonical email | Two addresses in circulation (`SEO.md` §1) |
| PPL flight-hour minimum | Not verifiable from DGCA's portal, which serves its homepage to non-browser clients. Needs Schedule II, Aircraft Rules 1937, read directly |

## 8. 30 / 60 / 90-day plan

### Days 1–30 — make the repair count
- After the authorized owner clears release blockers and explicitly approves
  release actions, complete §6 end to end.
- Configure fresh admin credentials and a session secret in the backend only
  after the install-boundary, preview-origin, and session-topology blockers are
  resolved; then complete the pending preview checklist.
- Baseline the `GEO_QUERIES.md` prompt set **before** the re-crawl lands, and log it in `GEO_LOG.md`. Without a baseline the next 90 days are unmeasurable.
- Ship the two remaining DGCA drafts already written and sitting in `drafts/`:
  `dgca-olode-vs-regular-exams.md` and `dgca-exam-misconceptions.md`. Both are
  primary-sourced and cost only wiring.
- Resolve the canonical email; propagate to schema, GBP and directories.
- Review whether any external workflow still depends on the legacy
  `scripts/prerender.mjs` command before considering its retirement.

### Days 31–60 — depth on what we own
- `/dgca/board-verification` as a real page. It currently 301s to the Computer
  Number guide, which is right for now, but BVC is a distinct query with real
  volume and the material already exists.
- Author byline and `Person` or `Organization` schema across existing blog posts —
  CLAUDE.md rule 5 is not yet satisfied retroactively.
- RSS/Atom feed at `/feed.xml`. Answer engines and aggregators both use it.
- Blog cadence: one guide a fortnight, from `GEO_CONTENT_CALENDAR.md`. Prefer
  topics where a primary source lets us be *right* where the vertical is wrong —
  that is what earned the PPL Class-Ten and 2.5-year findings.
- Resolve the four empty blog stubs (`_id` 3–6): write them or remove them.

### Days 61–90 — authority and compounding
- Generate `sitemap.xml` from `routeMeta.ts` at build time. `renderGate.test.ts`
  catches drift today; generation makes drift impossible.
- Off-site entity work per `GEO_ENTITY_EXECUTION_KIT.md`: consistent NAP on
  JustDial, Sulekha, IndiaMART, Google Business Profile, LinkedIn. Entity
  consistency is the highest-leverage off-site GEO factor.
- Quarterly fact re-check, per the published editorial policy. First pass due
  December 2026. Start with the computer-number auto-generation question, where
  a press report and DGCA's FAQ disagree.
- Ship `/privacy-policy` and `/terms` once the `[CONFIRM]` list is answered, and
  restore their footer links.
- Then, and only then, consider new commercial pages. Informational depth is what
  earns citations; commercial pages convert the traffic those citations bring.
