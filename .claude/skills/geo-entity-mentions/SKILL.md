---
name: geo-entity-mentions
description: Off-site GEO strategy. Finds where target queries are answered across Reddit, Quora, directories, listicles and review sites, analyzes mention gaps vs competitors, and builds a citation-earning plan. Use for brand mentions, third-party presence, review strategy, or AI visibility beyond the website itself.
allowed-tools: WebSearch, WebFetch, Read, Write
---

# GEO Entity & Mentions (Off-site)

## Why this matters
LLMs synthesize what OTHERS say about a business — Reddit, Quora, reviews,
listicles, directories, news — not just its website. Perplexity draws heavily on
Reddit; ChatGPT leans on Wikipedia and Reddit. A perfectly optimized site can
still never be cited if third-party sources never mention it. The 2026-07-30
audit found zero Reddit footprint for this brand; treat that as the baseline.

## ETHICS RULES (absolute)
- NO fake accounts, NO fake reviews, NO undisclosed promotion. Ever.
- On Reddit/Quora: answer the question genuinely and disclose affiliation when
  recommending the business.
- Fake reviews violate India's Consumer Protection Act and platform rules.

## Process

### Step 1 — Source discovery
Read GEO_QUERIES.md. WebSearch the 5–10 most important queries. For each, log
which of these appear in the top results: Reddit, Quora, Justdial, Sulekha,
IndiaMART, Google Maps, "best flying school in India / Delhi" listicles,
news sites, YouTube.

### Step 2 — Gap analysis
Table: Source | Query | Flying Star present? | Competitors present | Gap size.
Known competitor set to check: IGRUA, NFTI Gondia, Redbird Aviation, Carver
Aviation, Chimes Aviation Academy, Bombay Flying Club, Orient Flights,
Wings Academy/VFTI, and Delhi-NCR ground-class institutes.

### Step 3 — Prioritized action plan (write GEO_MENTIONS_PLAN.md)
1. Google Business Profile — highest priority and fully controllable: every
   field, correct categories, photos, services, posts, owner-answered questions,
   steady genuine reviews.
2. NAP consistency — the brand appears as "Flying Star Aviator", "Flying Star
   Aviation Pvt Ltd" and "Fly Star" across listings. Pick ONE legal name and
   make every directory match it exactly.
3. Review acquisition — ethical post-course asks; reply to every review.
4. Listicle outreach — find ranking "best DGCA ground classes / flying school"
   articles; draft a short pitch offering genuine value (real data, expert
   quote, updated fee info). Include the draft.
5. Reddit/Quora participation — list 10 real threads (r/india, r/delhi,
   r/aviationindia, r/flying, Quora pilot-career topics) the business can
   genuinely answer; draft helpful answer outlines with disclosure.
6. Digital PR — 2–3 newsworthy data/story ideas from REAL business data only
   ([CONFIRM] anything unverifiable).

## Output
GEO_MENTIONS_PLAN.md: gap table, prioritized tasks (impact x effort), owner,
and ready-to-send pitch drafts.

## Gap taxonomy (classify every finding — "missing" is too blunt)
- **Absent** — not mentioned anywhere the category is discussed
- **Misnamed** — listed under a wrong name or wrong category (Justdial's
  "Flying Star Aviation Pvt Ltd" is a live example)
- **Uncited** — the site exists but no third party repeats a specific fact
- **Thin** — a bare directory listing, or identical boilerplate across sites

## Query x source matrix (output this first)
Rows: queries. Columns: Reddit · Quora · Justdial · Sulekha · IndiaMART ·
Google Maps · top 3 listicles · YouTube · trade/news · owned.
Cell: present / absent / hostile / n/a. Use n/a honestly for anything you could
not actually check.

## Who gets cited instead
For each query, name the 3 brands or URLs an answer engine would most likely
lean on, and **why** — original data, thread consensus, domain trust, or plain
specificity. That "why" is the brief for our own work.

## Honesty clause
If Flying Star has no original data, no instructor with a public trail, and no
course detail distinct enough for a stranger to repeat, say so. Off-site GEO is
not a coat of paint. The correct recommendation is then: earn **one** primary
citable fact first — a real pass-rate figure, a syllabus breakdown nobody else
publishes, a fee teardown with sources — and distribute that.

## Execution-kit mode (added 2026-08-22 — PHASE2_CAMPAIGN W12)

Off-site properties — Justdial, Google Business Profile, Instagram, Facebook,
review platforms — require account logins this agent does not have. So the
deliverable is not an edit; it is a **playbook the human executes**, and a
tracker this agent maintains.

When invoked for W12, produce `GEO_ENTITY_EXECUTION_KIT.md` with a
per-platform section. Each section carries: the current observed state, the
recommended action with its reasoning, the literal step-by-step, and a status
box the human ticks.

Required sections:
1. **Justdial** — which of the three listings to keep (recommend the
   1,201-review record), what merge evidence to submit for the duplicate, and
   the category correction from Air Hostess Training to pilot/aviation training.
2. **Google Business Profile** — claim, categories, hours, photos, services,
   and seeding owner-answered Q&A.
3. **Instagram** — which of the two accounts is canonical, and the closure or
   redirect-in-bio steps for the other.
4. **facebook.com/flyspaceaviation** — confirm ownership first, then rebrand
   or close.
5. **NAP sweep table** — all 7 name variants and all 12 phone numbers mapped
   to the single canonical value, platform by platform.
6. **Review replies** — templates. Every review answered; replies are fresh,
   keyword-bearing content that the platform and crawlers both read.
7. **Listicle outreach** — 5 target "best DGCA ground classes Delhi" articles
   with a pitch draft each, offering something genuinely useful (a corrected
   fact, original data) rather than asking for a link.
8. **Quora** — 10 real threads, with disclosed-affiliation answer outlines.

**Priority note, binding:** roughly 60% of AI visibility comes from what other
sources say about the brand. This workstream ranks equal to article production,
never below it. Re-check completion status monthly and report what is still
outstanding — a kit that stays a document has produced nothing.

**Ethics unchanged:** no fake accounts, no fake reviews, no undisclosed
promotion. Disclosure is mandatory wherever the business is recommended.
