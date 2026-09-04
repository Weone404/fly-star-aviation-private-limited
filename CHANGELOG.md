# CHANGELOG

All entries: what changed, and why. Newest first.

## 2026-09-04 — Render-gate repair, DGCA Computer Number guide, editorial policy

### Fixed: 4 finished pages that had never been crawlable
`src/lib/routeMeta.ts` — added `/courses/cabin-crew`, `/courses/ground-staff`,
`/become-a-pilot/commercial-pilot-licence`,
`/become-a-pilot/airline-transport-pilot-licence`.

**Why:** production serves a route only if `scripts/prerender.js` wrote a file
for it, and that script builds its route list from `routeMeta.ts`. All four had
full page components (2,900 lines between them), entries in `pageMeta.ts`, and
`<Route>` declarations in `App.tsx` — everything except the one line that makes
them render. Verified live: all four returned HTTP 404 while being advertised in
`sitemap.xml`. This was pure plumbing; no content was written or changed.

### New page: `/dgca/computer-number`
`src/pages/dgca/computer-number.tsx` + route + `routeMeta` + `pageMeta` +
FAQPage schema + sitemap + llms.txt.

**Why:** the header navigation has been linking to this URL on every page of the
site, and `llms.txt` listed it as a resource — both pointing at a 404. It is
also a high-intent informational query ("dgca computer number", "how to apply
for dgca computer number") with no strong Indian answer page.

Content is the finished `drafts/dgca-computer-number.md`, sourced entirely from
DGCA's own Pariksha Flight Crew FAQ (banked at
`drafts/research/dgca-pariksha-faq-2026-08-22.md`). No figure came from memory.
Answer-first opening, quick-facts table, NEW-vs-OLD comparison table, exact
photo/signature specs, 8-step process, a misconceptions section, and 14 FAQs.

**Two drafting `[CONFIRM]`s resolved by not answering them:**
- *Processing time* — DGCA publishes no timeline. The page says so and tells the
  reader to track through Candidate Login, rather than repeating the "7–14
  working days" that secondary sources assert without a source.
- *Auto-generation* — a press report describes DGCA auto-generating computer
  numbers; DGCA's own FAQ says it is not automatic. The page follows the primary
  source and this remains the item to re-check first each quarter.

### New page: `/editorial-policy`
`src/pages/editorial-policy.tsx` + route + `routeMeta` + `pageMeta` + sitemap +
llms.txt + footer link.

**Why:** CLAUDE.md rule 5 requires a real byline on every guide, and the
institutional byline "Flying Star Aviator Academics Team" has to link somewhere
that explains what it means. Shipping the article first would have put a byline
link to a 404 on a live page. It is also a direct E-E-A-T signal: an
LLM deciding whether to cite a page about examination rules weighs a visible,
specific sourcing process.

Resolved from published site facts, not invented: entity name (already in the
`Organization` schema in `index.html`), phone `+91 9953536199`, email
`flyingstaraviator@gmail.com` (the footer's address).

### FAQ schema for non-blog pages
`src/lib/schema.ts` — added an exported `PAGE_FAQS` registry and `pageFaqNode()`,
now merged into `buildGraph()` for non-blog routes. Previously only blog posts
could carry `FAQPage`.

The page component imports `PAGE_FAQS` rather than holding its own copy, so the
visible FAQ and the structured data are physically the same array and cannot
drift. Schema that carries answers a reader cannot see on the page is a
structured-data violation and Google drops the rich result for it.

### Security: `/admin` closed to crawlers
`public/robots.txt` — `Disallow: /admin` and `Disallow: /api/` added to **every**
user-agent group, not just `*`.

**Why the repetition matters:** a crawler obeys only its single most specific
matching group. The file names fifteen agents individually, each with a bare
`Allow: /`, so a `Disallow` under `User-agent: *` alone would have applied to
none of them — GPTBot, ClaudeBot and PerplexityBot included.

**This is mitigation, not a fix.** `src/pages/admin/login/page.tsx` hardcodes the
admin username and password in client-side source, which ships in the JS bundle
and is readable by anyone. Raised with the owner; fixing it means touching admin
auth, which CLAUDE.md rule 5 gates behind explicit approval.

### Routing
`vercel.json`:
- Added `blog/[^/]+` to the SPA allowlist. Blog posts were reachable only because
  `handle: filesystem` serves the prerendered file first — a post that ever
  missed prerender would have 404'd silently. Now it degrades to the SPA instead.
- Added `editorial-policy`.
- `301 /dgca/board-verification → /dgca/computer-number`. The URL was advertised
  in `sitemap.xml`, had no component and no draft, and returned 404. Board
  Verification Certificates are covered in depth in the Computer Number guide, so
  the redirect sends the equity somewhere that answers the query. Removed from
  `sitemap.xml` in the same change — a manifest should never list a URL that
  cannot be served.

### Footer
`src/components/layout/Footer.tsx` — the bottom row linked to `/privacy` and
`/terms`. Neither route exists in `App.tsx` or `routeMeta.ts`, so both were
site-wide links to 404s. Replaced with `/editorial-policy` and `/sitemap`, which
do exist. The two legal pages are drafted but blocked — see AUDIT.md §5.

### llms.txt
Expanded the Computer Number entry from one clause to a fact-dense description,
added the editorial policy, and added three new citable facts to **Key facts**
(lifetime validity and one-number-per-candidate; no maximum age and Physics +
Mathematics rather than PCM; not auto-generated on submission). These are
written as self-contained, quotable sentences because that block is what an
answer engine lifts verbatim.

### Decision recorded: no Next.js migration
The brief asked whether to migrate. Recommendation is no, and the reasoning is
in AUDIT.md §8. Short version: the Puppeteer prerender already emits full static
HTML per route, so rendering was never the problem — a route registry that 15
URLs were missing from was. The durable fix is to generate `sitemap.xml` *from*
`routeMeta.ts` at build time so a URL can never be advertised without being
rendered. That is queued as P3.

---

## 2026-09-04 (later) — Location model corrected, five pilot-training pages built

### Location pages rebuilt on the real business model
`src/pages/Locations.tsx`, `routeMeta.ts`, `pageMeta.ts`, sitemap, llms.txt.

The page published centre counts — 3 Delhi, 2 Mumbai, 2 Hyderabad, 4 Bangalore,
8 USA, 16 India — that nothing else on the site supports. Owner confirmed the
model: **Dwarka is the head office; everywhere else is a partner or affiliate
relationship.** Every count is gone and must not return.

Each city page now opens by stating plainly whether there is a centre there
("Flying Star Aviator does not operate a centre in Mumbai"), separates the
ground-training half from the flying half, and carries verifiable context in
place of counts. This is better GEO, not just safer copy: an entity claiming
four cities while its NAP names one is precisely the ambiguity that stops a
language model resolving "Fly Star" to a single business, and a page that says
where it *isn't* is more quotable than one that pads.

Also removed `+919876543210` — a placeholder number sitting behind a "Call Local
Office" button on every city page.

All six `/locations/*` routes added to the render gate.

### Five `/pilot-training/*` pages, written from regulator documents
`src/pages/pilotTraining/topics.tsx` (component) +
`src/lib/pilotTrainingTopics.ts` (data) + routes + render gate + schema.

`/pilot-training/{ppl,cpl,maldives,sri-lanka,guide-to-conversion}` were
advertised in the sitemap, had no `:topic` handling so all five rendered the
same overview page, and 404'd in production. Owner chose real pages over
redirects.

Sources, each named on the page:
| Page | Primary source |
|---|---|
| PPL, CPL | DGCA CAR Section 7, Series 'B', Part I (Issue III, Rev 2, 13 Feb 2019) |
| Conversion, Maldives, Sri Lanka | DGCA CAR Section 7, Series 'G', Part I (Issue II, Rev 4, 9 Sep 2019) |
| Sri Lanka | Civil Aviation Authority of Sri Lanka, CPL requirements |
| Maldives | Maldives CAA, published list of approved flight training organisations |

Two facts worth owning, because the vertical states both wrongly:
- **A PPL requires a Class Ten pass, not 10+2 with Physics and Mathematics.**
  The 10+2 PCM rule is the CPL rule. Nearly every Indian training-school page
  conflates them.
- **A passed PPL paper is valid two and a half years, not five.** Five years is
  CPL and ATPL.

**What is deliberately missing:** the PPL flight-hour minimum. Every competitor
page states a number; none sources it, and Schedule II of the Aircraft Rules
1937 could not be read directly from DGCA's portal, which serves its homepage to
non-browser clients. The page says the figure is unverified and tells the reader
to get it from their FTO in writing. This is the editorial policy's first live
test and it decides against publishing.

Topic data sits in `src/lib/` rather than beside the component because
`schema.ts` builds each page's `FAQPage` JSON-LD from the same `faqs` array the
page renders. One array, two consumers, no drift.

### Test suite
- `src/test/renderGate.test.ts` (new) — asserts every `sitemap.xml` URL is
  prerenderable, that redirect sources are never advertised, and that canonicals
  match their own paths. **This is the durable fix.** The 15-dead-URL bug was
  possible because nothing connected the manifest to the gate; now the suite
  fails instead of the site.
- `src/test/vercelConfig.test.ts` — rewritten to assert routing *behaviour*
  against a set of real paths rather than pinning the allowlist regex as a
  literal string, which made every legitimate addition fail for the wrong
  reason.

28 tests passing, `vite build` green, `eslint` clean (8 pre-existing warnings,
no errors).

### Result
`sitemap.xml` advertises 50 URLs. **All 50 are now prerenderable.** At the start
of this session, 15 of 48 returned HTTP 404.


---

## 2026-09-04 (evening) — Blog publishing pipeline, quality gate, generated sitemap

### The gap
Posts written through `/admin/blog` are stored in MongoDB and served by
`/api/blogs`. `Blogs.tsx` and `BlogDetail.tsx` fetch them at runtime.
`scripts/prerender.js` did not: it built its route list from the posts hardcoded
in `src/lib/blogData.js` alone.

So an admin-published post was visible to a human — the SPA fetched it — and
invisible to every crawler: no static file, no title, no meta description, no
sitemap entry. **Fourteen posts were in that state**, twelve of them substantial
(700–2,200 words). Until the `blog/` fix earlier today they were worse than
invisible: `/blog/<slug>` fell through `vercel.json` to the 404 catch-all, so the
admin panel had not been able to publish a reachable post at all.

### The fix
`scripts/fetch-blogs.mjs` (new, runs in `prebuild`) fetches `/api/blogs`, applies
a quality gate, and writes `src/lib/blogData.remote.js`. `blogData.js` merges
that into `BLOG_POSTS`, with committed posts winning any slug collision — a
database row must never silently replace a reviewed article. Because
`routeMeta`, the schema builder, `getBlogRoutes()` and the sitemap generator all
read `BLOG_POSTS`, one merge fixes meta, structured data, prerendering and the
sitemap together.

**It fails soft.** If the API is unreachable — Render cold start, outage, an
egress-restricted build — the previously generated file is kept and the build
continues. A blog outage must not fail a deploy of the whole site.

### The quality gate, and why it exists
`blog-gate.json` holds the rules; `scripts/blogGate.mjs` holds the logic. A post
must have a title, a usable slug, at least 300 words, no duplicate slug, and no
configured spam marker. Failing posts are still served by the SPA at runtime —
they simply are not advertised to crawlers — and every decision is written to
`blog-gate-report.json` (gitignored) so nothing disappears silently.

The gate is not hypothetical. Of the fourteen live posts:
- **"Why India Needs More Pilots"** opens with a section on *"HCHCR Steel Flat
  Supplier in Delhi"*. Held back on a spam marker.
- **"Pilot Demand in India Through 2030"** had the slug
  `-pilot-demand-in-india-through-`. Leading and trailing hyphens are trimmed;
  internal double hyphens are deliberately left alone, because several live posts
  have them and changing one would break the `/api/blogs/:slug` runtime lookup.

Wiring the fetch without the gate would have put both into the sitemap.

### sitemap.xml is now generated
`scripts/generate-sitemap.mjs` builds it from `src/lib/routeMeta.ts` — the render
gate itself — plus the merged blog posts, skipping alias routes, `/admin`, and
posts with no slug or under 300 words. Hand-editing is what let the manifest and
the gate drift into fifteen dead URLs; a generated file cannot drift.
`renderGate.test.ts` now also asserts the generated header is still present.

Excluded on purpose: the legacy `/blogs/1`–`/blogs/6` URLs. Four of those
(`_id` 3–6) are the title-only stubs. They still prerender and still resolve for
anyone holding an old link — a sitemap is a recommendation, not an inventory.

### Post-deploy smoke check
`scripts/smoke.mjs` (`npm run smoke`) fetches every sitemap URL and asserts HTTP
200, and asserts that declared redirect sources return 3xx rather than 200.
Exits non-zero so CI can gate on it. This is the check that would have caught the
original defect on the day it shipped rather than weeks later.

### Tests
`src/test/blogGate.test.ts` (new, 11 cases) covers the gate against fixtures of
the real 2026-09-04 database rows, including the steel-supplier post and the
malformed slug. The gate logic is pure and lives in `scripts/blogGate.mjs`
precisely so it can be tested without the API, which is unreachable from CI
sandboxes. `renderGate.test.ts` now imports `getBlogRoutes()` instead of scraping
`blogData.js` with a regex, so it asks the same question the build does.

**40 tests passing.** `prebuild` + `vite build` green.

### Co-branding, not de-branding
`/courses/Air-india-pilot-interview` and `/courses/Indigo-pilot-interview`
carried only We One Aviation's identity — name, `weoneaviation.in`,
`info@weoneaviation.in`, `+91 9555291956`, `+91 9717977702` — on the
flystar.co.in domain, with meta titles ending "| We One Aviation".

Owner confirmed We One Aviation is also their brand and asked for Flying Star
Aviator's details to be added rather than the We One references removed. Done:
We One Aviation's contacts stay, Flying Star Aviator's NAP is added beside them,
and both pages now state that the programme is run by the two together.

Meta titles now end "| Flying Star Aviator" to match the domain. That is a
judgement call worth flagging: a page served from flystar.co.in whose title names
a different business is the single clearest way to confuse entity resolution, and
titles have no room for two brands. The body text names both. Easy to revert if
the owner prefers otherwise.

### Still open
- Admin auth — accepted as-is by the owner; see AUDIT.md §6.
- The spam row is excluded from the sitemap but not deleted from the database.
- The twelve newly-publishable posts have not been fact-checked against the
  editorial policy. They pre-date it. Worth a pass before they earn citations.


---

## 2026-09-04 (late) — Stored XSS closed, approval allowlist, content-hash pinning

### The finding that reframed the rest
`src/pages/BlogDetail.tsx:191` rendered `blog.content` through
`dangerouslySetInnerHTML`, where `blog` is the response from `/api/blogs/:id`.
No sanitiser existed anywhere in the project.

`POST /api/blogs` accepts unauthenticated writes. So arbitrary HTML could be
written to the database and executed in every visitor's browser on this origin —
**stored XSS**, live. The build-time fetch shipped that morning would have made
it worse: prerendering bakes fetched content into static files served from the
edge, so a payload would execute without any fetch at all, and be cached.

### Sanitisation, both paths
`src/lib/sanitizeHtml.ts` (runtime) and `scripts/sanitize.mjs` (build) strip
script/style/iframe/form/svg with their contents, all `on*` handlers, and unsafe
URL schemes including whitespace- and control-character-obfuscated
`javascript:`. Allowlist-based, because an allowlist fails closed when a new
attack shape appears. No dependency — string operations only, so there is nothing
to keep patched. `src/test/sanitizeHtml.test.ts` asserts the two copies agree
character for character on a shared corpus.

### Allowlist replaces heuristics as the control
`src/lib/blogApproval.ts` holds `APPROVED_POSTS`. A database post is not
prerendered, not in the sitemap, and **not rendered to visitors** unless its slug
is on that list.

The previous quality gate was a filter, not a control — its rules are in this
repo, so anyone who can read them can write content that passes. `blog-gate.json`
remains, demoted in its own comment to a safety net for an approved post that has
since become malformed.

`REFUSED_POSTS` records the steel-supplier row and why, so the rejection stays
visible rather than being an absence someone later "fixes".

### Content-hash pinning
Each approval pins the sha256 of the post's `content` at approval time. If an
approved post's content later differs, `prebuild` **exits non-zero** and prints
both hashes and the remedy. An approval describes specific text; text that has
changed is not approved.

Re-approving after a deliberate edit is `npm run blogs:approve -- <slug>`.
`npm run blogs:list` shows every post as approved / NOT APPROVED / CHANGED SINCE
APPROVAL.

**Consequence, stated plainly:** `APPROVED_POSTS` ships empty, so the twelve
otherwise-publishable posts are off the live site until reviewed and approved.
That is deliberate — they pre-date the editorial policy and their figures are
unverified. The spam post is off the site for visitors too, which it was not
before.

### Fetch failure is now loud and distinguishable
A gate rejection and an unreachable API were previously both just warnings.
`blog-gate-report.json` now carries an `outcome` field (`ok` / `fetch-failed`)
with `merged` counts, and a fetch failure prints a boxed warning. `smoke.mjs`
fails on a `fetch-failed` report and cross-checks the sitemap's blog URL count
against what the build said it merged — smoke can only check URLs that ARE in the
sitemap, never the ones that should have been, so that gap needed its own check.

### Deploy hook (scoped backend change, owner-approved)
`backend/server.js` calls `VERCEL_DEPLOY_HOOK_URL` after a successful blog
create, update or delete. Unset variable is a no-op; a hook failure never fails
the write. It publishes nothing by itself — a rebuild still only picks up
approved, hash-matching posts. A nightly-rebuild workflow is documented in
DEPLOYMENT.md as the fallback. **No other backend change; auth untouched.**

### Slug bug identified, not fixed
`backend/server.js:158` runs `.replace(/\s+/g, "-")` before
`.replace(/[^\w-]/g, "")`. It never strips digits — it strips punctuation and
emoji *after* they have become hyphens, leaving the leftovers. That produces
`pilot-career-after-12th--eligibility-fees--scope` from "12th – Eligibility, Fees
& Scope", and leading/trailing hyphens where a title starts or ends with a
symbol. **A code bug, not manual entry.** The one-line fix is outside the
approved backend scope, so it is recorded in DEPLOYMENT.md §7 rather than
applied.

### Tests
58 passing. New: `sanitizeHtml.test.ts` (11), `blogApproval.test.ts` (7) —
covering an empty allowlist publishing nothing, an approved post publishing, and
an approved post whose content drifted being refused with both hashes reported.


---

## 2026-09-04 (night) — Direct-URL gap closed, sanitiser replaced, slug fix

### The direct-URL question, answered precisely
The review asked whether an unapproved post is still reachable at its own URL,
since the runtime filter was described as living in the listing.

**Checked: the detail route already enforced it.** `BlogDetail.tsx` gates on
`isApproved(data.slug)` before accepting an API response and falls back to the
committed posts, so an unapproved post renders "Article Not Found" and never
shows its text. Arbitrary content was not publishable via direct link.

**But the review was right that it was not properly closed**, for a reason
neither of us had named: that page returned **HTTP 200**. A soft 404. Google can
index a 200, and an externally linked spam URL would have looked like a live page
on this domain.

Two changes:
- `vercel.json` no longer routes `/blog/<slug>` to the SPA. A blog post is served
  only if prerender wrote a file for it, which happens only for approved posts —
  so an unapproved slug now gets a **hard 404 from the edge**. Failing closed
  costs one thing: an approved post that fails to prerender 404s rather than
  degrading to a client render. `renderGate.test.ts` and `smoke.mjs` exist to
  catch that first.
- The legacy `/blogs/<id>` form stays routed to the SPA so old links resolve, and
  its not-found state now carries `<meta name="robots" content="noindex,nofollow">`.

### The sanitiser failed its own bypass suite, and was replaced
`sanitizeBypass.test.ts` covers mutation XSS via recontextualised containers
(noscript, style, template, svg, math), `srcdoc`, `xlink:href`, `data:` URIs,
obfuscated schemes, malformed tags, `formaction`, comment-hidden payloads and
`base`/`meta` redirection — written to fail, against **both** copies.

The hand-rolled sanitiser passed all of it except one vector:

```
<img src=x onerror=alert(1)//
```

An unterminated tag. A regex needs a closing `>` to recognise a tag, so this
passed through as "text" — and the browser's parser then recovers it into a live
`<img>` as soon as any later `>` appears in the document. With an open write
endpoint, an attacker controls what follows.

Per the standing rule, this was **not patched**. Both copies now use
**DOMPurify** — `src/lib/sanitizeHtml.ts` in the browser, `scripts/sanitize.mjs`
over a jsdom window at build time, same config. DOMPurify parses with the same
engine that will render, so this entire category is gone rather than narrowed.

The bypass suite stays. Its job now is to catch a bad config, and to fail loudly
if anyone swaps this back for something clever. All 70 tests pass.

### Backend slug fix (approved, one line)
`backend/server.js` now strips non-alphanumerics **before** hyphenating, then
collapses and trims:

| Title | Before | After |
|---|---|---|
| `12th – Eligibility, Fees & Scope` | `12th--eligibility-fees--scope` | `12th-eligibility-fees-scope` |
| `✈️ Pilot Demand … 2030 🚀` | `-pilot-demand-…-` | `pilot-demand-in-india-through-2030` |

**Affects new posts only.** Slugs already stored are unchanged; the two damaged
rows are repaired in the audit pass.

### Backend endpoint audit (report only, no changes)
Every endpoint in `backend/server.js` is unauthenticated. Beyond the blog write
routes already known:

- `DELETE /api/blogs/:id` — any post permanently deletable by anyone, and no
  backup exists.
- `GET /api/contacts` — returns **every** contact-form submission: name, email,
  phone, interest, message. Personal data under India's DPDP Act, 2023, readable
  by anyone who requests the URL.

The CORS allowlist at `server.js:64` does not mitigate either. CORS governs what
a *browser* will let a page read cross-origin; it has no effect on `curl` or any
server-side request, and was never an access control.

Reported to the owner 2026-09-04. No change made — the standing auth decision
covers the blog admin panel, and `/api/contacts` is the owner's call to weigh
separately.


---

## 2026-09-04 (late night) — Two routes removed, manifest widened

Removals, not access control. No auth middleware was added, the admin login flow
and password are untouched, and `POST /api/contact` and `POST`/`PUT /api/blogs`
are unchanged.

### `GET /api/contacts` removed
Returned every contact-form submission — name, email, phone, interest, message —
to anyone who requested the URL. **Nothing in the frontend called it**, verified
by grep across `src/`, `api/` and `index.html`, so it was deleted rather than
protected.

That absence raises its own question, recorded here because it needs answering:
if no code reads this route, how have enquiries been reaching anyone? Either they
are read straight from the database, or they are not being read at all.

Full incident record, including the DPDP position and the outstanding
log check, is in AUDIT.md §6.

### `DELETE /api/blogs/:id` disabled
Now answers 405. Unauthenticated, it let anyone permanently erase the posts
collection, with no backup in existence. Its only caller was the admin panel's
delete button, removed in the same commit. 405 rather than deletion, so an old
client gets a clear refusal instead of a confusing 404.

### The manifest was pinning too little
An approval pinned a hash of `content` only. But `title` renders as the H1 **and**
the meta title, `excerpt` as the meta description, `coverImage` as the hero and
OG image. `PUT /api/blogs/:id` is unauthenticated — so swapping an approved
post's headline put attacker-chosen text on the site **without tripping the
alarm**. A real gap in a control that had been described as complete.

`postHash()` now covers `slug`, `title`, `excerpt`, `content`, `coverImage` and
`category`, in fixed order and length-prefixed. The length prefixes matter: without
them, moving characters from the end of one field to the start of the next leaves
the concatenation, and therefore the hash, unchanged.

### A vanished approved post now fails the build too
If a slug on the approval list is absent from the API response, `prebuild` exits
non-zero with the same loudness as a hash change. `DELETE` was open until today,
and a post disappearing between builds is exactly what that looks like — a
silently shrinking sitemap would have hidden it.

`contentHash()` is kept and marked deprecated so an approval file written under
the old scheme fails loudly rather than mismatching quietly. `APPROVED_POSTS` is
still empty, so there is nothing to migrate.

75 tests passing, including boundary-shift resistance and per-field tamper cases.
