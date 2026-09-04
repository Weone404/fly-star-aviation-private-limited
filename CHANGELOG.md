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
