---
name: geo-site-audit
description: Site-wide GEO/AEO technical and content audit for flystar.co.in. Checks AI-crawler access, llms.txt, schema markup, prerender coverage, entity consistency, and content structure, then updates GEO_CONTEXT.md and writes a prioritized roadmap. Use when starting GEO work, auditing the site, or checking AI-visibility readiness.
allowed-tools: WebFetch, WebSearch, Bash, Read, Write, Grep, Glob
---

# GEO Site Audit — flystar.co.in

## Role
Senior technical SEO + Generative Engine Optimization auditor. Goal: make this
site maximally citable by ChatGPT, Claude, Perplexity, Google AI Overviews and
Gemini — WITHOUT damaging existing Google rankings.

## Start here (do not skip)
A full audit already exists at `flystar.co.in-audit/` (GEO-ANALYSIS.md,
FULL-AUDIT-REPORT.md, ACTION-PLAN.md, IMPLEMENTATION-SUMMARY.md, dated
2026-07-30). Read GEO-ANALYSIS.md first and treat it as the previous baseline.
Your job is a DELTA audit: what has changed, what was implemented, what is
still open. Never re-derive findings that file already establishes.

## Process

### Phase 1 — Technical AI access (pass/fail gates)
1. Read `public/robots.txt` locally AND fetch https://www.flystar.co.in/robots.txt
   (they can drift — the live file is what crawlers see).
2. Flag any of these as BLOCKED: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot,
   anthropic-ai, PerplexityBot, Perplexity-User, Google-Extended,
   Applebot-Extended, CCBot, Amazonbot, meta-externalagent.
   Absence from robots.txt = allowed. None may be disallowed.
3. Check `public/llms.txt` vs the live URL. Verify every listed URL still exists
   as a route in `src/App.tsx` and returns 200 live.
4. RENDERING GATE — settled 2026-08-22, do not re-derive:
   prerendering IS live. `scripts/prerender.js` reads its route list from
   `src/lib/routeMeta.ts`; `vercel.json` 404s anything not prerendered and not
   in its path regex. Sitemap-listed URLs with no `routeMeta.ts` entry return
   **HTTP 404**. Re-run the sweep to check current state:

   ```bash
   grep -o '<loc>[^<]*</loc>' public/sitemap.xml | sed 's/<[^>]*>//g' \
     | while read u; do echo "$(curl -sLo /dev/null -w '%{http_code}' "$u") $u"; done
   ```
   Then diff sitemap paths against `routeMeta.ts` keys to explain every failure.
5. Check `public/sitemap.xml` covers every canonical route in `src/App.tsx`
   (aliases in `src/lib/routes.ts` should NOT be listed separately) AND that
   every listed URL has a `routeMeta.ts` entry.

### Phase 2 — Page-level review
For the homepage + up to 10 key pages, record: title/description (from
`src/lib/pageMeta.ts`), H1, H2s, schema emitted by `src/lib/schema.ts`,
whether the first ~60 words answer the page's main question, FAQ present,
sourced statistics present, visible date/author, internal anchor quality.

### Phase 3 — Entity & NAP consistency
1. Check the Organization/EducationalOrganization graph in `index.html`
   (name, address, phone, sameAs).
2. WebSearch the brand ("Flying Star Aviator", "Flying Star Aviation Dwarka").
   Log every directory/listing found and any NAP variation. The brand appears
   under multiple names — every variant mismatch is a finding.

### Phase 4 — Score & report
| Category | Weight | Signal |
|---|---|---|
| AI crawler access | gate | No AI bots blocked |
| Server-visible content | gate | Prerendered HTML has real body text |
| llms.txt | 5 | Exists, accurate, all URLs 200 |
| Structured data | 15 | Org/Course/Service/FAQ schema correct per page |
| Entity & NAP consistency | 15 | sameAs, directories, GBP |
| Content format | 25 | Answer-first, quotable, sourced stats, FAQs |
| Freshness & expertise | 10 | Dates, author bylines, E-E-A-T |
| Off-site presence | 20 | Mentions on sources LLMs cite |

## Outputs
1. Update GEO_CONTEXT.md with discovered facts (mark [CONFIRM] items).
2. Write `GEO_AUDIT_REPORT.md` in repo root — delta vs the 2026-07-30 baseline,
   scores, evidence, per-page notes.
3. Prioritized roadmap: P0 technical → P1 content → P2 off-site.
   Each item: what, why, exact change, effort (S/M/L).

## Rules
- Never fabricate findings. If a fetch fails, say so and retry once.
- Every claim cites the evidence observed (file path or fetched URL).
- Present the report, then ASK before rewriting any page content.

## Scoring honesty
- The Princeton GEO study (Aggarwal et al., KDD 2024) is the evidence base:
  citations, statistics and quotations lift generative-engine visibility ~30–40%;
  keyword stuffing hurts. Weight findings accordingly.
- `llms.txt` is documentation, not a ranking lever. Note its accuracy; never
  present it as a major lever. (This site already has a good one.)
- Never invent a crisis so there is more work. If the site is fundamentally
  sound and needs three fixes, the report says three fixes. Under-cite the drama.
- Never report a score you did not compute from something you actually fetched.
