# DEPLOYMENT.md — flystar.co.in
Updated 2026-09-04.

## 1. Stack
Vite 5 · React 18 · TypeScript · Tailwind · shadcn/ui · Express + Mongoose
backend in `backend/` · Vercel.

## 2. Environment variables
| Variable | Where | Notes |
|---|---|---|
| `VITE_API_URL` | `.env.production`, Vercel project settings | Backend base URL for the blog/admin API |
| `PRERENDER_EXECUTABLE_PATH` | CI only, optional | Path to a stock Chrome/Chromium. When unset, the bundled `@sparticuz/chromium` is used |
| `PRERENDER_PORT` | optional | Defaults to 4173 |

## 3. Build
```bash
npm run build          # prebuild -> vite build -> postbuild
npm run test           # vitest — 40 tests
npm run lint           # eslint
npm run smoke          # post-deploy: every sitemap URL must return 200
```

The full build is three stages:

| Stage | Script | Does |
|---|---|---|
| `prebuild` | `fetch-blogs.mjs`, `generate-sitemap.mjs` | Pulls admin-published posts from `/api/blogs` through the quality gate; regenerates `public/sitemap.xml` from `routeMeta.ts` |
| `build` | `vite build` | The SPA bundle |
| `postbuild` | `prerender.js` | Writes a static HTML file per route |

A build that skips `postbuild` ships an empty SPA shell to crawlers. A build that
skips `prebuild` ships yesterday's blog posts and a stale sitemap.

### Blog publishing — how a post actually goes live
There are two publishing paths and they behave differently.

| Path | Lands in | Live when |
|---|---|---|
| Daily Claude routine | commit to `blogData.js` → `claude/blog-*` branch → GitHub Action → merge to `main` | Vercel builds on the merge |
| `/admin/blog` | MongoDB, via `POST /api/blogs` | **Only on the next build** |

The second path needs a rebuild to become crawlable, because prerendering happens
at build time. Until a rebuild runs, an admin-published post is served by the SPA
at runtime but has no static HTML, no meta tags and no sitemap entry.

**The rebuild trigger is wired.** `backend/server.js` calls the hook after a
successful create, update or delete on `/api/blogs`. To turn it on:

1. Vercel → Settings → Git → Deploy Hooks → create a hook for `main`.
2. Set `VERCEL_DEPLOY_HOOK_URL` in the backend environment (Render).

If the variable is unset the call is a no-op and blog writes behave exactly as
before. A hook failure never fails the write — the post is already saved.

Treat the hook URL as a secret; anyone holding it can trigger builds.

**It publishes nothing by itself.** A rebuild only picks up posts on the approval
list whose content hash still matches, so a write by someone else triggers a
build and is still held back.

**Nightly fallback.** The hook fires on database writes, not on approvals — you
approve by committing a file, and a commit to `main` already rebuilds. Add a
nightly rebuild anyway so an approval that missed a deploy, or a hook that failed
silently, still lands within a day. GitHub Actions:

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

Take the contacts snapshot **before** the `GET /api/contacts` removal deploys —
afterwards, the only read path is the database directly.

### Enquiry notifications
`POST /api/contact` sends one notification email per enquiry. Configure in the
backend environment (Render):

| Variable | Required | Notes |
|---|---|---|
| `RESEND_API_KEY` | yes, to enable | From resend.com |
| `ENQUIRY_NOTIFY_TO` | yes, to enable | Recipient, or a comma-separated list |
| `ENQUIRY_NOTIFY_FROM` | no | Verified sender; defaults to `onboarding@resend.dev` |

With `RESEND_API_KEY` or `ENQUIRY_NOTIFY_TO` unset it is a complete no-op and the
form behaves exactly as before. A send failure never fails the enquiry — the row
is already saved. `reply_to` is set to the enquirer, so replying in the inbox
reaches them directly.

Spam guards, both dependency-free: a honeypot field (`company`) that answers 201
and discards, and a per-IP rate limit of 5 in 10 minutes returning 429.

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

**Why an allowlist and not a filter.** `POST /api/blogs` accepts unauthenticated
writes, and post bodies are rendered as HTML. A heuristic filter's rules live in
this repo, so anyone who can read them can write content that passes. An
allowlist inverts the default: unknown content is not published, full stop.

**The content hash.** Approving pins the exact text. If an approved post's
content later differs, `prebuild` **fails the build** and prints both hashes.

**Treat this failure as a tamper alarm, not routine drift.** `PUT /api/blogs/:id`
is unauthenticated, so an approved post's hash changing is exactly how an edit by
someone outside the team would surface. It is the only alarm you have for that.

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

### Documentation drift, worth fixing
`PRERENDER.md` says prerendering reads `<loc>` entries from `dist/sitemap.xml`
via `scripts/prerender.mjs`. **That is not what runs.** `package.json`'s
`postbuild` calls `scripts/prerender.js`, which builds its route list from
`src/lib/routeMeta.ts` plus `getBlogRoutes()`. Both scripts exist; only the
second is wired.

This gap is almost certainly *why* 15 sitemap URLs sat dead for weeks — anyone
reading the documentation would reasonably conclude that adding a URL to
`sitemap.xml` was sufficient to get it rendered. It is not.
`src/test/renderGate.test.ts` now enforces the real rule; `PRERENDER.md` should
be corrected to match, or `prerender.mjs` deleted so there is one script.

### Prerendering cannot run everywhere
Chromium must launch. It will not on Windows without
`PRERENDER_EXECUTABLE_PATH`, and it does not run in the sandboxed Linux VM used
for remote editing. Vercel and GitHub Actions are the environments where the
full build is verified.

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

## 5. Deploying
Vercel builds from `main`. Pushes happen from the repository owner's terminal.
Current work sits on `geo/render-gate-repair` — **not yet merged, not yet
deployed.**

```bash
git checkout main
git merge geo/render-gate-repair
npm run test && npm run build
git push origin main
```

`.github/workflows/blog-publish.yml` auto-merges `claude/blog-*` branches on
green checks; it does not cover `geo/*` branches.

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
   `"outcome": "ok"` with a `merged` count. If it shows `"fetch-failed"`, the API
   was unreachable and the sitemap may be short — rebuild once it is up. The
   build prints a boxed warning in that case; smoke also fails on it, because a
   URL that never entered the sitemap cannot be caught by checking the sitemap.
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
| **Stored XSS surface** | `BlogDetail.tsx` renders post content as HTML and the write endpoint is open. Sanitisation now runs on both paths, which stops a payload executing; it does not stop anyone writing to the database. The approval list is what keeps unreviewed content off the site |
| **Unauthenticated backend** | Every endpoint in `backend/server.js` is open, including `DELETE /api/blogs/:id` (any post deletable by anyone, no backup exists) and `GET /api/contacts` (returns every lead's name, email, phone and message). CORS restricts browsers, not `curl` — it is not an access control. Reported 2026-09-04; owner's call |
| **Admin auth** | Owner reviewed and accepted as-is on 2026-09-04. Credentials remain client-side. Not to be re-raised. See AUDIT.md §6 for the accepted risk and the related spam row found in the database |
| `/privacy-policy`, `/terms` | Drafts complete but hold ~13 `[CONFIRM]` items only the business knows: analytics and pixels in use, third parties receiving data, retention periods, grievance officer, minimum enrolment age, registered MCA address. The footer's links to them were removed rather than left pointing at 404s |
| Canonical email | Two addresses in circulation (`SEO.md` §1) |
| PPL flight-hour minimum | Not verifiable from DGCA's portal, which serves its homepage to non-browser clients. Needs Schedule II, Aircraft Rules 1937, read directly |

## 8. 30 / 60 / 90-day plan

### Days 1–30 — make the repair count
- Merge, deploy, and complete §6 end to end.
- Rotate the admin password. Decide on the server-side auth fix.
- Baseline the `GEO_QUERIES.md` prompt set **before** the re-crawl lands, and log it in `GEO_LOG.md`. Without a baseline the next 90 days are unmeasurable.
- Ship the two remaining DGCA drafts already written and sitting in `drafts/`:
  `dgca-olode-vs-regular-exams.md` and `dgca-exam-misconceptions.md`. Both are
  primary-sourced and cost only wiring.
- Resolve the canonical email; propagate to schema, GBP and directories.
- Fix `PRERENDER.md`, or delete `prerender.mjs`.

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
