# GEO / AI-Search Analysis — flystar.co.in

**Site:** https://www.flystar.co.in
**Business:** Flying Star Aviator Private Limited — DGCA pilot training + aviation services, Dwarka, New Delhi
**Analysis date:** 2026-07-30
**Framing:** Per Google's AI Optimization Guide (updated 2026-06-29), GEO/AEO is **still SEO** applied to AI-search surfaces. Findings below are SEO fundamentals scored for AI Overviews, AI Mode, ChatGPT, and Perplexity — not a separate discipline.

> ⚠️ **Scope note:** This scores the **live** site. A prerender fix that makes all content server-visible is already **built locally but not yet deployed** (see `PRERENDER.md`). Deploying it is the single biggest GEO lever here and would materially raise the Technical Accessibility and Citability sub-scores.

---

## 1. GEO Readiness Score: **38 / 100**

| Criterion | Weight | Score | Weighted |
|-----------|--------|-------|----------|
| Citability | 25% | 30 | 7.5 |
| Structural Readability | 20% | 55 | 11.0 |
| Multi-Modal Content | 15% | 45 | 6.75 |
| Authority & Brand Signals | 20% | 45 | 9.0 |
| Technical Accessibility | 20% | 20 | 4.0 |
| **Total** | | | **≈ 38** |

**One-line verdict:** Good local reputation and schema, but AI engines literally cannot read the page — the live HTML exposes 27 characters of body text ("Loading Fly Star Aviator...") because everything renders client-side. Fix rendering first; everything else is secondary.

---

## 2. Platform Breakdown

| Platform | Score | Why |
|----------|-------|-----|
| **Google AI Overviews** | 35/100 | Googlebot *can* render JS, so it eventually sees content — but the site doesn't rank for core commercial terms (absent for "DGCA CPL ground classes Dwarka" where 5+ competitors appear) and passages aren't front-loaded or self-contained. AIO cites pages that already rank. |
| **Google AI Mode** (Gemini 2.5) | 30/100 | Broader pool where **freshness + entity authority** outweigh position. No visible publish/update dates, fragmented brand entity, no Reddit — all weak here. |
| **ChatGPT** | 20/100 | Draws heavily on Wikipedia (47.9%) and Reddit (11.3%). Brand has **neither**. GPTBot doesn't execute JS → sees the empty shell. |
| **Perplexity** | 20/100 | Reddit is its #1 source (46.7%). **Zero Reddit footprint** found. Content also JS-hidden. |
| **Bing Copilot** | 25/100 | Bing indexes but barely renders JS → content largely invisible; no IndexNow. |

> Google runs **two distinct citation engines** (AI Overviews and AI Mode share URLs only ~13.7% of the time). Optimize both: rank well *and* keep content fresh with entity authority.

---

## 3. AI Crawler Access Status

Live `robots.txt` ends with `User-agent: *  Allow: /`, so **all AI crawlers are allowed** (nothing is blocked):

| Crawler | Status |
|---------|--------|
| GPTBot (OpenAI) | ✅ Allowed |
| OAI-SearchBot | ✅ Allowed |
| ClaudeBot (Anthropic) | ✅ Allowed |
| PerplexityBot | ✅ Allowed |
| Google-Extended | ✅ Allowed (Gemini grounding not opted out) |
| CCBot / Bytespider (training) | ✅ Allowed |

**Assessment:** Access is fine — but **allowance is meaningless while the content requires JavaScript.** These crawlers reach the page and get an empty `#root`. No robots change needed; the fix is rendering, not permissions.

---

## 4. llms.txt Status

- `/llms.txt` → HTTP **200 but fake**: the SPA catch-all rewrite serves `index.html` for any unknown path, so it's not a real file. Same for `/rsl.xml`.
- **Per Google's guidance, `llms.txt` is *not* a Google Search or AI-feature ranking/citation lever** and Google ignores it. Do **not** treat it as a Google play.
- It *may* help some non-Google AI tools. If you add one, make it a **real static file** (see template in §10) so it isn't shadowed by the SPA fallback — and exclude `llms.txt`/`rsl.xml` from the catch-all rewrite.

---

## 5. Brand Mention Analysis

Brand mentions correlate ~3× more strongly with AI citations than backlinks. Current footprint:

| Platform | Presence | Notes |
|----------|----------|-------|
| **Justdial** | ✅ Strong | ~1,063 ratings, 5/5 — excellent local trust signal |
| **YouTube** | ✅ Channel exists | `Flying Star Aviators` — but needs consistent, mention-rich content (YouTube ~0.737 correlation, strongest signal) |
| **YourStory** | ✅ Company profile | Moderate authority |
| **Facebook / Instagram** | ✅ Present | Social presence |
| **Wikipedia / Wikidata** | ❌ Absent | Biggest ChatGPT gap (Wikipedia = 47.9% of ChatGPT citations) |
| **Reddit** | ❌ Absent | Biggest Perplexity gap (Reddit = 46.7% of Perplexity citations) |
| **LinkedIn** | ⚠️ Not surfaced | Company page unclear |

**Entity fragmentation risk (important):** multiple near-identical brands/domains surface — `flystar.co.in`, `flyingstaraviator.in`, `flystar.in` (a *different* Kerala academy), `flyingstaraviation.com`. AI engines struggle to resolve one canonical entity, diluting authority. Consolidate: one primary domain, consistent NAP + `sameAs`, and clear disambiguation from the unrelated `flystar.in`.

---

## 6. Passage-Level Citability

Optimal AI-citation blocks are **134–167 words, self-contained**, and ~44% of citations come from the **first 30% of a page** — so front-load answers.

**Current state:** Once rendered, the homepage has an FAQ schema block and reasonable marketing copy, but:
- No **"X is…"** definition in the first 60 words of key pages (e.g. "A Commercial Pilot Licence (CPL) is…").
- No **specific statistics with sources** (pass rates, hours required, DGCA fees, batch sizes).
- Answers are marketing-toned, not extractable Q&A.
- Content is **not visible pre-JS**, so citability for non-rendering engines ≈ 0.

**Highest-value pages to make citable:** `/dgca/medical`, `/dgca/computer-number`, `/become-a-pilot/become-pilot`, `/courses/cpl`, `/courses/atpl`, `/dgca/full-form` — these map to informational "what/how" queries AI engines answer.

---

## 7. Server-Side Rendering Check

**This is the dominant finding.**

- Live raw HTML body text: **27 characters** ("Loading Fly Star Aviator…").
- `is_spa: true`; all content injected by React after load.
- **AI crawlers do not execute JavaScript** → GPTBot, PerplexityBot, ClaudeBot, Bytespider, and Bing see essentially an empty page. Only Googlebot (which renders) eventually sees content.

**Fix (already built locally, pending deploy):** the prerender pipeline in `scripts/prerender.mjs` writes full static HTML for all 43 sitemap routes. Post-deploy, `/services/mro`, `/courses/atpl`, etc. serve real content + per-page title/description/canonical/OG with **no JS required**. Deploy this before any other GEO work — it unblocks every AI surface at once.

---

## 8. Top 5 Highest-Impact Changes

1. **Deploy the prerender build** (`npm run build:prerender` in CI). Converts a 27-char shell into full HTML for every route — the prerequisite for all AI visibility. *(Built; needs deploy.)*
2. **Front-load citable answer blocks** on the DGCA/CPL/ATPL pages: open each with a 40–60 word "X is…" definition, then a 134–167 word self-contained answer with **specific, sourced facts** (hours, fees, eligibility, DGCA references).
3. **Build Reddit + Wikipedia/Wikidata presence.** Authentic participation in r/flying, r/aviationindia, etc.; a Wikidata entity for the company. These are the top ChatGPT/Perplexity citation sources and the brand has neither.
4. **Add visible publish + "last updated" dates** and a quarterly refresh program. Content <3 months old is ~3× more likely to be cited; 6-month-stale pages lose eligibility.
5. **Consolidate the brand entity.** Pick one canonical domain, align NAP + `sameAs` everywhere, and disambiguate from the unrelated `flystar.in` (Kerala) to stop AI engines merging/confusing entities.

---

## 9. Schema Recommendations (for AI discoverability)

- **Fix per-page schema** — the homepage `@graph` (Organization + "CPL Training" breadcrumb + CPL/ATPL Course) is hardcoded in `index.html` and currently appears on *every* page. Emit page-type schema per route.
- **`Course` schema** on each course page with `provider`, `hasCourseInstance`, `courseMode`, and (where possible) `offers`/price and `timeRequired`.
- **`FAQPage`** on informational DGCA pages (mirroring visible on-page Q&A).
- **`Person` schema** for named instructors with `jobTitle`/credentials + `sameAs` (LinkedIn) — feeds E-E-A-T and author authority.
- **`Article`/`BlogPosting`** with `datePublished`/`dateModified` on blog posts (also powers the freshness signal in §8.4).
- **`Review`/`AggregateRating`** reflecting the Justdial reputation (with genuine, policy-compliant sourcing).
- Keep `Organization`/`WebSite` site-wide; ensure `sameAs` lists Justdial, YouTube, YourStory, LinkedIn, Wikidata once created.

---

## 10. Content Reformatting Suggestions

**Pattern to apply on `/courses/cpl` (example):**

> **Current:** marketing intro ("Dreaming of flying for leading airlines?…")
>
> **Recommended opening (citable):**
> "A Commercial Pilot Licence (CPL) is a DGCA-issued licence that lets you fly aircraft for hire and reward in India. To qualify you need 200 hours of flight time, a Class 1 medical, and passes in DGCA theory subjects (Air Navigation, Meteorology, Air Regulations, Technical General). At Flying Star Aviator, CPL ground classes in Dwarka, Delhi have run since 2008…"
> *(Then a question-based H2: "How long does it take to get a CPL in India?" → 134–167 word answer with specific numbers.)*

**Reusable checklist per key page:**
- [ ] First 60 words contain a direct "X is…" definition
- [ ] Question-based H2/H3 headings matching real queries
- [ ] One 134–167 word self-contained answer block near the top
- [ ] At least one comparison/spec **table** (e.g. CPL vs ATPL requirements; DGCA subject list)
- [ ] Specific numbers with sources (hours, fees, timelines, pass criteria)
- [ ] Visible "Last updated: <date>"

---

## Summary

The brand has real-world authority (reviews, longevity, YouTube) that AI engines currently can't see or attribute cleanly. Priority order:

1. **Deploy prerendering** → makes content AI-readable (already built).
2. **Rewrite key pages for citability** → definitions, sourced facts, tables, dates.
3. **Off-site entity building** → Reddit, Wikidata/Wikipedia, entity consolidation.
4. **Per-page schema + Person/Course/FAQ** → machine-readable authority.

Do #1 first; without it, #2–#4 are invisible to every non-Google AI crawler.

**Sources:** [Justdial reviews](https://www.justdial.com/Delhi/Flying-Star-Aviator-Near-Ram-Pal-Chowk-Dwarka-Sector-7/011PXX11-XX11-190301143042-S5J4_BZDET/reviews) · [YouTube channel](https://www.youtube.com/channel/UCMgPrEdb_0Ckk7ibz7UExUA) · Google AI Optimization Guide (developers.google.com/search/docs/fundamentals/ai-optimization-guide)
