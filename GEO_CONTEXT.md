# GEO Context — flystar.co.in
_Single source of truth for every GEO skill. Last updated: 2026-11-18 (Phase 10)._

## Business identity
_Sourced from `index.html` JSON-LD and `public/llms.txt` — verified in-repo, not
guessed. Items marked [CONFIRM] need the owner's answer._

- Legal name: **Flying Star Aviator Private Limited**
- alternateName in schema: "Flying Star Aviators"
- Website: https://www.flystar.co.in
- Primary category: DGCA ground-training institute (CPL / ATPL ground classes,
  RTR(A)) + B2B aviation services (aircraft management, MRO, CAMO, charter)
- Founded: 2008
- Address: C705, Sector 7, Block C, Palam Extension, Dwarka, New Delhi 110077
- Phone: +91 99535 36199
- Google Business Profile: https://maps.google.com/?cid=5225956059607335504
- Other profiles (schema `sameAs`): Facebook /flystar.co.in · Instagram
  /flyingstaraviator · YouTube UCMgPrEdb_0Ckk7ibz7UExUA · YourStory ·
  Justdial (listed there as "Flying Star Aviation Pvt Ltd")

### [CONFIRM] — open questions blocking full precision
1. **NAP name mismatch.** The owner confirmed **Flying Star Aviator Private
   Limited** as the canonical legal organization name for site-owned entity
   data. Justdial still uses "Flying Star Aviation Pvt Ltd"; preserve that
   third-party URL/handle but do not use it as the site's legal organization
   name. MCA/GST evidence can still be used later to reconcile the directory.
2. **DGCA-approved FTO, or ground-training institute?**
   The owner confirmed the current site positioning is **ground-training
   institute only**. Until an official DGCA approved-FTO listing is supplied,
   the writer must not claim FTO status, aircraft flight training, a fleet or
   ownership of flying operations. Aircraft flying is described as taking place
   through appropriately approved FTOs.
3. **Named expert for author bylines** — name + verifiable credentials
   (e.g. "CPL holder, X hours, Y years instructing"). Required by CLAUDE.md
   rule 5 before any guide is published.
4. **Real verifiable numbers** — years operating (2008 = 18 years), students
   trained, DGCA pass rate, batch size, instructor count. Only real ones.
   These become the citation magnets.
5. **vfti.co.in** — competitor benchmark, or owned property? Determines whether
   we compete with it or cross-link.
6. Fee ranges publishable for CPL/ATPL ground classes and RTR(A)?

## Site stack (Phase 0, discovered 2026-08-22)
- Vite + React 18 + TypeScript + Tailwind + shadcn/ui; Vercel deploy
  (`vercel.json`); Express/Mongo backend in `backend/` + `api/` for the blog.
- Routes: `src/App.tsx` (lazy imports). Keyword aliases -> canonical paths in
  `src/lib/routes.ts` (`ALIAS_CANONICAL`).
- Page components: `src/pages/**`. **Reference long-form template:
  `src/pages/dgca/full-form.tsx`** (620 lines). Others: `Courses/Cpl.tsx` (963),
  `dgca/ground-classes.tsx` (693), `dgca/medical.tsx` (560).
- Meta: `src/lib/routeMeta.ts`, applied by `src/hooks/useMeta.ts`; it is also
  the prerender/render gate. Keywords: `src/lib/seoKeywords.ts`.
- Schema: built in `src/lib/schema.ts` (BreadcrumbList + page-type node),
  injected by `src/hooks/useSchema.ts`. Site-wide Organization /
  EducationalOrganization / WebSite / Place graph is static in `index.html`.
- **Prerender / render gate (verified 2026-08-22, corrected):**
  `npm run build` -> `scripts/prerender.js` (postbuild). It parses the
  `routeMeta` object out of **`src/lib/routeMeta.ts`** (52 routes) plus blog
  routes from `blogData.js` — it does NOT read sitemap.xml. `vercel.json` then
  serves filesystem first, a hardcoded path regex -> `/index.html`, and a final
  `/(.*)` -> 404. **A route with no `routeMeta.ts` entry returns HTTP 404.**
- `public/robots.txt`: all AI crawlers explicitly allowed (GPTBot,
  OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended) —
  P0 crawler gate already PASSED.
- `public/llms.txt`: exists, well-formed, includes a "Key facts" block.
- Blog: `src/pages/Blogs.tsx` renders the unified slug-based dataset from
  `src/lib/blogData.js`; `BlogDetail.tsx` still supports API-backed post lookups.
  **Not prerendered and no per-post meta — unfit for GEO content.** New guides
  ship as real routed pages instead.

## Prior work (do not redo)
`flystar.co.in-audit/` — full audit dated 2026-07-30: GEO-ANALYSIS.md (GEO
readiness 38/100 on the then-live site), FULL-AUDIT-REPORT.md, ACTION-PLAN.md,
IMPLEMENTATION-SUMMARY.md, Lighthouse JSONs in repo root. Its headline finding —
live HTML exposed only "Loading Fly Star Aviator..." because everything rendered
client-side — is the reason the prerenderer exists (`PRERENDER.md`).
**ANSWERED 2026-08-22 — prerendering IS deployed and working.** Fetched as
GPTBot: every prerendered route serves real HTML (one H1, 6–15 H2s, 6k–19k
chars of body text). The 2026-07-30 "Loading Fly Star Aviator..." failure is
fixed. Technical Accessibility should be rescored upward in Phase 1.

### Verified P0 findings (2026-08-22 curl sweep of all 43 sitemap URLs)
1. **15 of 43 sitemap URLs return HTTP 404.** Root cause proven: they are
   listed in `public/sitemap.xml` but have no entry in `src/lib/routeMeta.ts`,
   so they are never prerendered and `vercel.json`'s catch-all 404s them. The
   two sets match exactly. Dead URLs:
   `/become-a-pilot/commercial-pilot-licence`,
   `/become-a-pilot/airline-transport-pilot-licence`, `/courses/cabin-crew`,
   `/courses/ground-staff`, `/dgca/computer-number`, `/dgca/board-verification`,
   `/locations/{delhi,mumbai,bangalore,hyderabad}`,
   `/pilot-training/{cpl,ppl,maldives,sri-lanka,guide-to-conversion}`.
   Note `/dgca/computer-number` and the two become-a-pilot pages are also
   advertised in `public/llms.txt` — we are pointing AI crawlers at 404s.
   Fix = add routeMeta entries (page components exist for several), or remove
   the URLs from sitemap.xml + llms.txt where no page is planned. P0.
2. **Mojibake in 10+ page components.** UTF-8 en-dashes/apostrophes stored as
   Latin-1 bytes, rendering as `â€"` in crawler-visible text. Confirmed in
   source, not introduced by prerender. Live example: `/rtr` H1 renders
   "RTR Full Form â€" Radio Telephony Restricted". Affects `rtr.tsx`,
   `DGCA.tsx`, `Cpl.tsx`, `become-pilot.tsx`, `airline-preparation.tsx`,
   `australia.tsx`, `Air-india-pilot-interview.tsx`,
   `commercial-pilot-license.tsx`, `airline-transport-pilot-licence.tsx`,
   `admin/login/page.tsx`. P0, mechanical, zero ranking risk.
3. `/services/charter-services` renders only ~1.7k chars — thinnest real page.
4. Homepage H1 is "Best Pilot Training Institute in India..." and the meta
   title says "DGCA-Approved Pilot Training". If we are a ground school and not
   an FTO, both are accuracy risks. H1/meta are protected — flag for the owner,
   do not edit unilaterally.

## Targeting
- Primary audience: Class 12 (PCM) students and graduates in Delhi NCR planning
  a commercial pilot career; CPL holders preparing ATPL/RTR(A); [CONFIRM] B2B
  aircraft owners/operators for the services side.
- Top pages: `/courses/cpl`, `/courses/atpl`, `/dgca/ground-classes`,
  `/dgca/medical`, `/dgca/full-form`, `/rtr`,
  `/become-a-pilot/become-pilot`, `/pilot-training/*`
- Competitors [CONFIRM the real local set]: IGRUA, NFTI Gondia, Redbird
  Aviation, Carver Aviation, Chimes Aviation Academy, Bombay Flying Club,
  vfti.co.in, plus Delhi-NCR ground-class institutes.

## Rules
- Do-not-touch pages (rewrite only with explicit approval): [CONFIRM which pages
  currently rank / drive enquiries — until answered, treat `/courses/cpl`,
  `/dgca/ground-classes` and `/` as protected].
- Approved sources for facts: dgca.gov.in, wpc.gov.in (RTR), official airline
  cadet pages, MoCA. Never memory.
- Verifiable brand facts/USPs: founded 2008; Dwarka, New Delhi;
  [CONFIRM the rest].

## Byline ruling (owner, 2026-08-22) — RESOLVED

**Byline: institutional — "Flying Star Aviator Academics Team."**

Rationale, recorded because it governs future decisions: E-E-A-T is not one
signal. *Experience* and *expertise* carry weight when a claim rests on personal
authority. The claims in the current three articles rest on **DGCA's own
published text** — the fee, the eligibility rule, the document specifications —
so authority transfers through citation. For reference-grade procedural content
the operative letter is **trust**, and trust comes from visible process.

**Three binding conditions:**
1. **The editorial-policy page wires FIRST.** Every article byline links to it;
   shipping bylines that point at a 404 is the same error class as the
   misconceptions hub linking to unpublished siblings.
2. **The policy page describes the real process and nothing more.** Any claim
   on it that is not actually true of how this campaign operates does not ship.
   Same defensible-to-a-journalist test as every other page.
3. **The named-byline door stays open.** Experience and judgment topics later
   in the calendar get a real named author if one exists. Mixed bylines are a
   mature editorial pattern, not an inconsistency.

**Publication gate is now: the `geo/tech-p0` merge, and one canonical phone
number.**

## Standing decisions (owner, 2026-08-22)
- **Blog listing:** numeric seed posts were removed from the listing dataset.
  Existing slugged posts remain available, while new GEO guides continue to
  ship as real routed pages instead of blog entries.
- **B2B (MRO / CAMO / charter / aircraft management) is a deliberately later,
  separate track.** Aircraft operators and CPL aspirants are different
  audiences — never mix them on a page or score them in the same cluster. B2B
  AI visibility is won through service pages, inclusion in "top CAMO/MRO
  providers in India" lists, and LinkedIn/directory presence, not article
  volume. Parked until the ground-classes engine is running.
- **Keyword re-weighting, to apply in Phase 2 once answer #2 lands as
  "ground institute":** drop the "flying school" clusters (wrong intent,
  not honestly winnable); promote to money cluster — DGCA ground classes Delhi,
  CPL/ATPL ground classes, per-subject classes (Air Navigation, Aviation
  Meteorology, Air Regulations, Technical General, RTR(A)), DGCA exam coaching
  Dwarka, online ground classes; keep the exam-guide cluster as-is (we teach
  these exams, so it is *more* relevant to us than to an FTO) and the
  career/cost cluster (it funnels aspirants into ground classes); add a
  cadet-program prep cluster (IndiGo/Air India cadet 2026, cadet vs CPL route,
  assessment prep) — ground schools own that funnel.
- **Off-site skill set from ~/Downloads/grok: discarded.** Reviewed 2026-08-22;
  the unique material (Princeton GEO evidence anchor, fuller banned-phrase list,
  voice tests, tone-veto, Absent/Misnamed/Uncited/Thin gap taxonomy,
  Cited/Present/Absent/Misattributed scoring, measurement-hygiene rules) was
  merged into the eight skills here. The zips were then removed.

## Tone
Informational, expert, plain English — a senior flight instructor explaining
things to a serious aspirant. Never a salesperson.

## Delta audit (2026-09-28)
The July 30, 2026 baseline identified client-side rendering and 404s for
sitemap URLs as the dominant technical risks. A live verification on
2026-09-28 found:

- `https://www.flystar.co.in/robots.txt` returns 200 and explicitly allows
  GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot,
  Google-Extended, Applebot-Extended, CCBot, Amazonbot and
  meta-externalagent. No blocked AI crawler was observed.
- `https://www.flystar.co.in/llms.txt` returns 200. All 68 unique URLs listed
  in the local `public/llms.txt` returned HTTP 200 in the verification sweep.
- All 83 URLs in `public/sitemap.xml` returned HTTP 200. The previous
  routeMeta/render-gate failures were not reproduced in this sweep.
- GPTBot requests to `/`, `/courses/cpl` and `/dgca/ground-classes` returned
  prerendered HTML with approximately 32,928, 23,254 and 16,612 characters of
  visible body text respectively. The July “Loading Fly Star Aviator” shell
  finding is therefore closed for the currently tested routes.
- The CPL page now has a visible review date (`2026-09-25`), answer-first
  content, source links, a ground-school/FTO distinction and unique FAQ data.
  Its remaining verification risks are the unqualified “200 hours” table value,
  the “high DGCA exam pass rate” claim, and named faculty-experience claims in
  `src/pages/Courses/Cpl.tsx`; no supporting evidence for those claims was
  found in the repository.
- Entity accuracy remains open. `index.html` describes the organization as
  providing “DGCA CPL Flight Training” and uses “Best”/“leading” language,
  while the verified business context currently identifies the company as a
  ground-training institute unless DGCA’s approved FTO list confirms otherwise.
  Justdial uses the variant “Flying Star Aviation Pvt Ltd”; the MCA record is
  still required to establish the canonical legal name.
- The thinnest live page observed in the sample was
  `https://www.flystar.co.in/services/charter-services`, whose extracted
  content was only a phone number. This remains a content-quality risk even
  though the URL is technically live.

These observations are evidence for the 2026-09-28 delta report, not a
replacement for the `[CONFIRM]` items above. No page content was rewritten as
part of this audit.

### Phase 10 local production verification (2026-11-18)

- `npm run build` completed with Chromium prerendering enabled: 85 sitemap
  URLs were generated and rendered, and the admin-client check passed across
  54 JavaScript bundles.
- An audit of the generated HTML found one title and description per route,
  unique titles and descriptions, titles no longer than 60 characters,
  descriptions no longer than 155 characters, and one matching canonical per
  URL. All 85 pages had one H1, no heading-level skips, and valid JSON-LD
  (170 parsable blocks total).
- `npm test`: 31 test files and 240 tests passed. `npm run lint` exited 0 with
  nine existing Fast Refresh warnings and no errors.
- The production JS entry bundle was 828.49 kB (209.27 kB gzip); the main CSS
  bundle was 134.25 kB (21.87 kB gzip). These are build artifacts, not field
  Core Web Vitals measurements.
- The live image crawl observed 334 images: none missing `alt`, 16 with empty
  `alt`, 125 lazy-loaded, 209 eager-loaded, 277 with explicit dimensions, and
  no `srcset`. Empty `alt` usage and loading behavior need visual review before
  broad changes.
- Production source publication and post-push verification were still pending
  when these local checks were recorded. Search Console, GA4 and field CWV
  access remained unavailable.
- Vercel subsequently reported success for `71d3d61b8409257d5db026e7ea6d3eeecbb0442c`;
  a live crawl verified 85/85 sitemap routes returned HTTP 200 without
  redirects and served the revised SEO metadata.
- A production browser check found a 12px overflow in the `/courses/cpl` final
  CTA at 320px. Responsive padding was added; the rebuilt output passed 32
  browser checks across four key routes and eight widths (320-1440px). The
  follow-up commit still requires a production deployment check.

## Phase 10 technical SEO delta (2026-11-18)

- Live checks: `/robots.txt` and `/sitemap.xml` returned 200; all 85 sitemap
  URLs returned 200 without redirects. All 68 URLs in live `llms.txt` returned
  2xx, with no redirects. The local and live `llms.txt` differed; the local
  version should be reconciled before a later content release.
- Every sitemap URL had one title, description and canonical; titles and
  descriptions were unique, canonical URLs matched their page URLs, and no
  invalid JSON-LD was observed. No sitemap page was orphaned in the rendered
  internal-link graph. One header link used `/Courses/cpl` and redirected to
  `/courses/cpl`; the navigation now links to the canonical lowercase path.
- All 85 pages had one H1. Heading-level skips were attributable to footer
  headings and three page sections; those heading levels were corrected without
  changing visible wording. Rendered images had no missing `alt` attributes;
  16 used empty alt text and need visual review to confirm they are decorative.
- Duplicate per-page metadata in the unused `src/lib/pageMeta.ts` was removed.
  `src/lib/routeMeta.ts` is the sole active metadata source and render gate.
- The site-wide JSON-LD had two organization nodes for the same company and an
  unimplemented `SearchAction`. These were consolidated to one
  `EducationalOrganization` linked to the existing `Place`.
- A public Justdial result showed address `110075` and phone `09054557842`,
  which differ from the site's `110077` and `+91 99535 36199`. This third-party
  NAP listing requires owner review; no off-site listing was changed.
- Search Console, GA4 and field Core Web Vitals data were not accessible in this
  run. No indexing, traffic or conversion conclusions are drawn from their
  absence. The integrated browser connection timed out; local build/prerender
  and production HTML checks are the verification path.
- Several pages still contain unsourced regulatory, fee, duration, salary,
  approval and pass-rate claims. Those require primary-source and owner review;
  this technical change did not rewrite or endorse them.
