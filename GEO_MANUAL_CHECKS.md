# GEO Manual AI Checks — the half that actually counts

**Created 2026-08-22.** Web search is a *proxy* for what answer engines
retrieve. It is not evidence of what they say. This sheet is.

## How to run it
For each query, ask the engine the query **as written** and record what happens
to flystar.co.in. Do not add "Flying Star" to a non-brand query — that measures
recall of a leading question, not organic citation.

Run in: **ChatGPT (search enabled)** · **Perplexity** · **Gemini** ·
**Google AI Overviews** (plain Google search, read the AI panel).

## Scoring — four states, not two
| Code | Meaning |
|---|---|
| **C** | **Cited** — flystar.co.in named or linked unprompted |
| **M** | **Mentioned** — our URL used as a source but the brand not named |
| **A** | **Absent** — neither |
| **X** | **Misattributed** — a fact that originates on our site credited to someone else |
| **–** | Not run |

`X` is the most actionable result: the content works, the entity does not.
Those route to off-site work, never to a rewrite.

## If you only have 15 minutes
Run the **five priority queries** marked ⭐ below, in ChatGPT and Perplexity
only. They span brand, domain, money, local and informational intent — enough
to establish the shape.

## Baseline for comparison (web search, 2026-08-22, pre-deploy)
flystar.co.in appeared in **3 of 25** — brand queries A1, A2, A5 only. Zero of
the 20 non-brand queries. Expect the AI results to be no better, and treat any
`C` as a genuine surprise worth investigating.

---

| # | Query | ⭐ | ChatGPT | Perplexity | Gemini | AI Overviews | Notes |
|---|---|---|---|---|---|---|---|
| A1 | Flying Star Aviator | ⭐ |  |  |  |  |  |
| A2 | Flying Star Aviator Dwarka |  |  |  |  |  |  |
| A3 | Flying Star Aviation reviews |  |  |  |  |  |  |
| A4 | flystar.co.in | ⭐ |  |  |  |  |  |
| A5 | Flying Star Aviator fees |  |  |  |  |  |  |
| B1 | DGCA CPL ground classes | ⭐ |  |  |  |  |  |
| B2 | DGCA ground classes online |  |  |  |  |  |  |
| B3 | CPL ground classes fees India |  |  |  |  |  |  |
| B4 | Air Navigation DGCA exam preparation |  |  |  |  |  |  |
| B5 | Aviation Meteorology DGCA exam |  |  |  |  |  |  |
| B6 | Air Regulations DGCA exam preparation |  |  |  |  |  |  |
| B7 | Technical General DGCA preparation |  |  |  |  |  |  |
| B8 | RTR(A) exam preparation India |  |  |  |  |  |  |
| B9 | ATPL ground classes India |  |  |  |  |  |  |
| B10 | DGCA computer number process |  |  |  |  |  |  |
| C1 | DGCA ground classes in Dwarka | ⭐ |  |  |  |  |  |
| C2 | CPL classes in Delhi |  |  |  |  |  |  |
| C3 | pilot training institute in Delhi NCR |  |  |  |  |  |  |
| C4 | ATPL ground classes Delhi |  |  |  |  |  |  |
| C5 | RTR(A) classes Delhi |  |  |  |  |  |  |
| D1 | how to become a pilot in India after 12th | ⭐ |  |  |  |  |  |
| D2 | CPL fees in India 2026 |  |  |  |  |  |  |
| D3 | CPL vs ATPL difference |  |  |  |  |  |  |
| D4 | DGCA ground classes vs self study |  |  |  |  |  |  |
| D5 | IndiGo cadet pilot programme 2026 |  |  |  |  |  |  |

---

## After filling this in
1. Copy each completed row into `GEO_LOG.md` under today's date with source
   `manual` — that is what makes it part of the trend record.
2. Any `X` (misattributed) goes straight to `GEO_ENTITY_TODO.md`.
3. Re-run the **same** queries after the content engine has been producing for
   a quarter. Never swap a query silently; add new ones and keep the old rows,
   or the comparison breaks.

## Honest caveats
- A handful of prompts is anecdotal. It cannot establish share of voice.
- Answers vary by account, region, session and time. Note anything unusual.
- For real longitudinal tracking, a dedicated tool (Otterly.ai, Peec AI,
  Scrunch, Semrush AI Toolkit) exports this automatically. Paste an export here
  and it becomes the source of truth over anything hand-recorded.
