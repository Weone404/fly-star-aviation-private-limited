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
in AUDIT.md §7. Short version: the Puppeteer prerender already emits full static
HTML per route, so rendering was never the problem — a route registry that 15
URLs were missing from was. The durable fix is to generate `sitemap.xml` *from*
`routeMeta.ts` at build time so a URL can never be advertised without being
rendered. That is queued as P3.
