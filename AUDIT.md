# AUDIT.md — flystar.co.in
Date: 2026-09-04 · Auditor: Claude (SEO/GEO/AEO + full-stack pass)
Method: full read of `src/`, `public/`, `vercel.json`, build scripts + live HTTP checks against production.

## 1. What the site actually is
- **Entity:** Flying Star Aviator Private Limited — DGCA CPL/ATPL **ground-class** institute, C705 Sector 7 Block C, Palam Extension, Dwarka, New Delhi 110077. Phone +91 9953536199. Operating since 2008.
- **Second business line:** B2B aviation services (aircraft management, MRO, CAMO, charter, sourcing, livery, spares, consultancy).
- **Stack:** Vite 5 + React 18 + TS + Tailwind + shadcn/ui. Express/Mongo backend in `backend/`. Vercel.
- **Rendering:** NOT a naked SPA. `scripts/prerender.js` drives Puppeteer over every route listed in `src/lib/routeMeta.ts` (+ blog routes from `src/lib/blogData.js`) and writes static HTML into `dist/`. Crawlers get real HTML **for prerendered routes only**.

## 2. THE critical finding — the render gate is leaking 15 URLs
Production serves a file only if prerender wrote it. Any route absent from `routeMeta.ts` returns **HTTP 404** — verified live, not inferred.

`sitemap.xml` advertises 48 URLs. **15 of them 404.** That is 31% of the declared site returning dead ends to Googlebot, GPTBot, PerplexityBot and ClaudeBot. `llms.txt` also links one of them (`/dgca/computer-number`), so the AI-entity file points at a 404.

| Dead URL | Component exists? | Verdict |
|---|---|---|
| /become-a-pilot/commercial-pilot-licence | Yes (801 lines) | **FIXED — added to routeMeta** |
| /become-a-pilot/airline-transport-pilot-licence | Yes (763 lines) | **FIXED — added to routeMeta** |
| /courses/cabin-crew | Yes (508 lines) | **FIXED — added to routeMeta** |
| /courses/ground-staff | Yes (851 lines) | **FIXED — added to routeMeta** |
| /dgca/computer-number | No — but full draft in `drafts/` | **FIXED — page built and wired** |
| /dgca/board-verification | No content anywhere | **FIXED — 301 to /dgca/computer-number, removed from sitemap** |
| /locations/{delhi,mumbai,bangalore,hyderabad} | Generic `Locations.tsx`, ~60 unique words each | **FIXED — rebuilt on the confirmed partner model** |
| /pilot-training/{cpl,ppl,maldives,sri-lanka,guide-to-conversion} | No `:topic` branching — all 5 render the identical /pilot-training page | **FIXED — five real pages from regulator sources** |

Four of the fifteen were pure plumbing: 2,900 lines of finished, well-structured page content that has never been crawlable. Those are live-ready in this commit.

## 3. What is already in good shape (do not touch)
- `robots.txt` — Googlebot, Bingbot and every major AI crawler explicitly allowed (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended, CCBot, Applebot-Extended, Amazonbot, meta-externalagent, Bytespider). Sitemap referenced.
- `llms.txt` — genuinely good. Correct llmstxt.org shape, one-line entity summary, sectioned links, and a **Key facts** block with citable, sourced numbers (CAR Section 7 Series B Part I; Rs 2,500 regular / Rs 5,000 OLODE per paper; 70% pass mark; five-year paper validity; 200 flight hours; Class 1 medical). This is the single best AEO asset on the site.
- Alias consolidation — 20 legacy keyword URLs map to canonical paths via `ALIAS_CANONICAL`, so `useMeta`/`useSchema` never emit competing canonicals.
- Schema — `buildGraph()` emits `@graph` with BreadcrumbList + page node on every route, and BlogPosting + FAQPage on posts. New pages inherit it automatically.
- Per-page meta — `pageMeta.ts` already holds titles/descriptions for **all 15 dead routes**. The content was ready; only the render gate was missing.
- Blog engine — slug-based `/blog/<slug>`, canonicalises legacy `/blogs/<id>` to the slug, prerendered, FAQ schema mirrors visible text. Three real posts live.

## 4. RESOLVED — the locations claim (Ground Rule 2)
Owner confirmed on 2026-09-04: **Dwarka is the head office; every other location
is a partner or affiliate relationship.** The centre counts have been removed and
the pages rebuilt to say so plainly. Original finding kept below for the record.

### Original finding
`src/pages/Locations.tsx` publishes, as fact:
- `centers: 3` for Delhi, `2` Mumbai, `2` Hyderabad, `4` Bangalore, `8` USA, `16` India.
- City pages titled "Pilot Training in Mumbai / Bangalore / Hyderabad".

Every other source on the site describes **one** location: Dwarka, New Delhi. If Flying Star Aviator does not operate centres in those cities, these pages are (a) fabricated counts and (b) a local-SEO liability — Google treats unsupported multi-city location pages as doorway pages, and an entity that claims four cities while its NAP says one is exactly the ambiguity that stops an LLM resolving "Fly Star" confidently. **Not publishing these until confirmed.**

## 5b. CRITICAL — stored XSS via the blog API (closed 2026-09-04)
`BlogDetail.tsx` rendered `/api/blogs` content through `dangerouslySetInnerHTML`
with no sanitiser in the project. Combined with an unauthenticated `POST
/api/blogs`, that is stored XSS: arbitrary HTML written to the database executed
in visitors' browsers on this origin.

Closed by sanitising both the runtime and build paths, and by requiring explicit
per-post approval before any database content is rendered or advertised. The
write endpoint itself remains open — that is the accepted auth decision in §6, and
it is why these two controls have to carry the weight.

## 5. Other gaps found
- **No legal pages live.** `/privacy-policy`, `/terms`, `/editorial-policy` exist as drafts only. Missing privacy/terms weakens E-E-A-T and trips Google's YMYL-adjacent trust signals for a fee-charging education business.
- **Thin `/pilot-training/:topic`.** Five sitemap URLs collapse onto one page.
- **`vercel.json` regex allows paths that 404 anyway** — the allowlist includes `courses/.*`, `locations/.*`, `pilot-training/.*`, but `blog/` (singular) is absent. Blog posts survive only because `handle: filesystem` serves the prerendered file first. Fragile: a blog route that ever misses prerender 404s silently.
- **`routes` + `cleanUrls` + `trailingSlash` + `headers` in one `vercel.json`** is an unsupported combination in Vercel's schema. Works today; a platform tightening would break routing.
- **No RSS/Atom feed** for the blog.
- **No author byline / Person schema** — CLAUDE.md Rule 5 requires one; posts currently have none, costing E-E-A-T and the "who says this" signal LLMs weigh.

## 6. CRITICAL — client-side admin credentials
`src/pages/admin/login/page.tsx` declares `ADMIN_USERNAME` and `ADMIN_PASSWORD`
as module constants. This is client-side code: both values ship inside the
public JavaScript bundle and are readable by anyone who opens developer tools on
flystar.co.in. `/admin/login` is prerendered and was crawlable.

Mitigated so far: `Disallow: /admin` added to every user-agent group in
`robots.txt`. That hides the door; it does not lock it.

**Owner decision, 2026-09-04: accepted as-is.** The password stays and the auth
stays client-side. Recorded here so the choice is deliberate and visible, not
forgotten. Not to be re-raised.

**Related finding, same day.** `GET /api/blogs` returned a post titled "Why India
Needs More Pilots" whose body opens with a block on "HCHCR Steel Flat Supplier in
Delhi" — SEO spam for an unrelated industrial product, sitting in the production
database. The admin API has no server-side authentication, so `POST /api/blogs`
accepts writes from anyone, with or without the client-side login. Whether this
row was injected or pasted in error is not established. It is excluded from the
sitemap by the build-time gate in `blog-gate.json`; it has not been deleted,
because deleting production data is the owner's call.
- **Two We One Aviation-branded pages on flystar.co.in.** `/courses/Air-india-pilot-interview` and `/courses/Indigo-pilot-interview` carried We One Aviation's name, website, email and phone numbers, and meta titles ending "| We One Aviation", on the Fly Star domain. Owner confirmed both are their brands; pages are now co-branded with Flying Star Aviator's NAP added and titles matching the domain. See CHANGELOG 2026-09-04 (later).
- **No analytics installed.** No GA4, GTM, Meta Pixel or Clarity tag in `index.html`. Nothing on this site is currently measurable.
- **Four empty blog stubs** (`_id` 3–6) with titles and no bodies — indexable thin content if ever routed.

## 7. Priority plan (impact × effort)
| # | Action | Impact | Effort | Status |
|---|---|---|---|---|
| P0 | Add 4 finished pages to the render gate | High | Trivial | **Done** |
| P0 | Resolve locations question | High | Med | **Done** — partner model confirmed and shipped |
| P0 | **Hardcoded admin credentials in client-side source** | Critical | Med | **Raised with owner** — robots.txt mitigated only |
| P1 | Wire `/dgca/computer-number` from existing draft | High | Low | **Done** |
| P1 | Build the 5 `/pilot-training/*` pages | High | Med | **Done** |
| P1 | Ship editorial-policy | Med-High | Low | **Done** |
| P1 | Ship privacy-policy + terms | Med-High | Low | **Blocked** — ~13 `[CONFIRM]`s only the business can answer |
| P1 | Test that guards the render gate | High | Low | **Done** — `src/test/renderGate.test.ts` |
| P2 | Author byline + Person schema on existing posts | Med | Low | Queued |
| P2 | Add `blog/` to `vercel.json` allowlist | Med | Trivial | **Done** |
| P2 | RSS feed at `/feed.xml` | Med | Low | Queued |
| P2 | Install analytics — there is none | High | Low | Queued |
| P3 | Ship remaining 2 DGCA drafts (OLODE, exam misconceptions) | Med | Low | Queued |
| P3 | Sitemap generated at build from `routeMeta.ts` | Med | Med | Queued |

## 8. Judgment call, documented
The brief asked whether to migrate to Next.js. **Recommendation: do not.** The existing Puppeteer prerender already emits full static HTML per route, which is what Google and every AI crawler need — the SEO problem here was never rendering, it was a route registry that 15 URLs were missing from. A Next.js migration would spend the entire budget re-achieving the status quo while risking the Express/Mongo backend, admin auth and lead forms. The higher-return move is to make the route registry self-verifying: generate `sitemap.xml` **from** `routeMeta.ts` at build time, so a URL can never be advertised without being rendered. That closes this class of bug permanently, in a fraction of the effort.


---

## 9. Status at end of session, 2026-09-04
`sitemap.xml` advertises **50 URLs and all 50 are prerenderable.** At the start of
this session, 15 of 48 returned HTTP 404 to Google and to every AI crawler.

Two new pages written from primary sources (`/dgca/computer-number`,
`/editorial-policy`), five built for previously-dead URLs
(`/pilot-training/*`), six location pages rebuilt on the real business model, and
a regression test that makes this class of bug fail the suite rather than the
site. 28 tests passing, build green, lint clean.

Three commits on `geo/render-gate-repair`, unpushed and undeployed. Nothing above
is live until that branch merges to `main`.

**The most urgent item in this file is not an SEO item.** It is §6, the
client-side admin credentials.
