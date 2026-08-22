---
name: geo-visibility-tracker
description: Tracks AI-visibility progress for flystar.co.in. Runs the target query set via web search, logs which sources and competitors appear, and produces monthly reports with next actions. Use when checking AI visibility, tracking citations, running the monthly GEO review, or creating the baseline.
allowed-tools: WebSearch, WebFetch, Read, Write
---

# GEO Visibility Tracker

## Honesty first (state this to the user every run)
Claude Code cannot query ChatGPT/Perplexity/Gemini directly. This skill tracks a
strong PROXY: whether flystar.co.in and its mentions appear in the web sources
those engines retrieve. For true AI-answer measurement the user must ALSO run
the same queries manually in ChatGPT (search on), Perplexity, Gemini and Google
AI Overviews — or use a dedicated tracker (Otterly.ai, Peec AI, Scrunch).
Both together = real data.

## Process

### Step 1 — Ensure GEO_QUERIES.md is populated
If empty, generate 20–30 queries from GEO_CONTEXT.md in 5 groups:
- Brand (5): "Flying Star Aviator", "Flying Star Aviation Dwarka", reviews
- Course (10): how aspirants actually search CPL/ATPL ground classes, RTR(A)
- Local (5): "DGCA ground classes in Dwarka", "pilot training institute Delhi"
- Comparison/informational (5–10): "CPL vs ATPL", "cost to become a pilot India"
Have the user approve the list before proceeding.

### Step 2 — Run the check
Per query: WebSearch, examine the top 10. Record whether flystar.co.in appears,
at what position, which page; which competitors appear; which third-party
sources appear (Reddit/Quora/directories/listicles).

### Step 3 — Log
Append to GEO_LOG.md:
| Date | Query | In top 10? | Position | Page | Competitors | Third-party sources |

### Step 4 — Manual AI check list (give to user)
Same queries in ChatGPT (search on), Perplexity, Gemini, Google AI Overviews.
Record cited / mentioned / absent. Add under the same date in GEO_LOG.md.

### Step 5 — Monthly report (GEO_REPORT_YYYY-MM.md)
- Presence-rate trend vs previous months
- Top 5 gaps (queries where competitors appear and we don't)
- 3 highest-priority next actions, mapped to the right skill

## Rules
- Run queries in batches of ~8 to manage usage; ask before continuing.
- NEVER mark a query "cited in AI" from web search alone — only the user's
  manual checks count as actual AI citations.

## Scoring each query (four states, not two)
- **Cited** — flystar.co.in named unprompted in the answer
- **Present** — our URL used as a source but the brand not named
- **Absent** — neither
- **Misattributed** — a fact that originates on our site credited to someone else

Misattributed is the most actionable state: the content is working and the
entity is not. Route those to `geo-entity-mentions`, never to a rewrite.

## Measurement hygiene
1. Label every web-search finding **anecdotal** unless it came from a tracker
   export the user pasted. A pasted export is the source of truth.
2. Never claim a model "always" or "never" cites us from n < 20 prompts.
3. Never say you "checked ChatGPT" — say exactly which tool produced each row.
4. Never measure with a branded leading question ("Does Flying Star do X?").
   That measures recall of the prompt, not organic citation. Brand queries are
   scored in their own group, for entity recognition only.

## After-change protocol (returning runs)
- Re-run the **same** query set. Never silently swap queries — that destroys
  the trend.
- Diff Cited / Present / Absent / Misattributed against the last run.
- Attribute changes cautiously: a listicle refresh, seasonality, or a tracker
  blip can dwarf an on-page edit. Never declare a win from one query flipping.
