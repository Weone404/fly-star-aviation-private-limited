# GEO Visibility Log
_Appended by `geo-visibility-tracker`. Web-search rows are a PROXY for AI
retrieval. Only rows marked source `manual` are actual AI-answer citations._

---

## BASELINE — 2026-08-22, batch 1 (8 of 25 queries)
**Captured BEFORE the `geo/tech-p0` deploy.** This is the "before" picture; it
cannot be retaken. Source: web search, top ~10 organic results per query.
Method: anecdotal proxy, not a tracker export. No AI engine was queried directly.

**Headline: flystar.co.in appears in ZERO of the 8 queries. Presence rate 0/8.**

| Date | Query | Source | In top 10? | Position | Page | Competitors seen | Third-party surfaces |
|---|---|---|---|---|---|---|---|
| 2026-08-22 | B1 DGCA CPL ground classes | websearch | No | — | — | goldenepaulettes ×2, topcrewaviation, redbirdaviation, skyjet, herculesaviation, dgcacplgroundclasses, flywithgati, captainaviationacademy | — |
| 2026-08-22 | B2 DGCA ground classes online | websearch | No | — | — | topcrewaviation ×2, goldenepaulettes, aviatorcloud, airshipaviation, cntaaonline, thepilot.in, dreamworksaviation, dgcacplgroundclasses | — |
| 2026-08-22 | B3 CPL ground classes fees India | websearch | No | — | — | herculesaviation, dgcacplgroundclasses, dgcacomputernumber, airlineprepschool, redbirdaviation, fmsaviation, pilottraininginstitute, pilotcet, poeticpilot | — |
| 2026-08-22 | C1 DGCA ground classes in Dwarka | websearch | No | — | — | ceaaviation, **goldenepaulettes (Dwarka)**, 70knotsaviation, **airborneaviation (Sector 7 Dwarka)**, airrath, **fmsaviation (Ramphal Chowk)**, groundschoolforaviators | youyooz.com ×2 |
| 2026-08-22 | C2 CPL classes in Delhi | websearch | No | — | — | goldenepaulettes, cplgroundclasses (Capt Ahluwalia) ×2, airborneaviation, captsahilkhurana, aviationsierra, hmaviation | merithub.com |
| 2026-08-22 | C4 ATPL ground classes Delhi | websearch | No | — | — | goldenepaulettes ×3, captsahilkhurana, groundschoolforaviators, fmsaviation, airrath | **Quora** (commercialpilotindia), findglocal, Facebook |
| 2026-08-22 | D1 how to become a pilot in India after 12th | websearch | No | — | — | wayman.edu, aviationjobsearch, topcrewaviation, redbirdaviation, fmsaviation, dunesaviation, maverickaviation, wingpath | — |
| 2026-08-22 | D2 CPL fees in India 2026 | websearch | No | — | — | selectyouruniversity, goldenepaulettes, airlineprepschool, infinifly, fmsaviation ×2, poeticpilot, **vfti.co.in**, thepilot.in, pilotcet | — |

### Patterns
1. **Absent everywhere, including home turf.** `/dgca/ground-classes`,
   `/courses/cpl`, `/courses/atpl` and `/become-a-pilot/become-pilot` are all
   live and prerendered, and none surfaces — not even for "DGCA ground classes
   in Dwarka", where the business is physically located.
2. **Golden Epaulettes Aviation is the dominant competitor: 5 of 8 queries,
   often multiple results.** It is based in **Dwarka, Delhi** — the same
   micro-location. It is also the company whose marketing copy is sitting in
   this repo (calendar item R1). Treat it as competitor #1 in all future work.
3. **The micro-location is crowded.** Airborne Aviation (Sector 7, Dwarka),
   FMS Aviation Academy (Dwarka–Ramphal Chowk centre — Flying Star's own
   Justdial address is "Near Ramphal Chowk Road"), CEA Aviation and
   70knotsaviation all rank locally. Local intent is contested, not open.
4. **vfti.co.in confirmed as a real competitor** (ranks for the fee cluster) —
   answers the open [CONFIRM] from Phase 0 in the competitor direction.
5. **Third-party surfaces already rank** for these queries: Quora, youyooz.com
   (twice), merithub, findglocal, Facebook. These are concrete, named targets
   for `geo-entity-mentions` — not hypotheses.
6. **Market fee data for future articles** (sourced, cite on use): DGCA ground
   classes ₹1.5–3 lakh; total CPL ₹55–90 lakh in 2026, flying training ~70% of
   it; ground-class programmes run 4–6 months; DGCA exams held in January,
   April, July and October.

### Manual AI check — OWED BY OWNER (this is the half that actually counts)
Run these same 8 queries yourself in **ChatGPT (search on), Perplexity, Gemini,
and Google AI Overviews**, and record cited / mentioned / absent per engine.
Web search cannot substitute for it — nothing above is evidence of what an AI
engine says. Add rows here under the same date with source `manual`.

### Next
Batch 2 (B4–B8, C3, C5, D4) and batch 3 (B9, B10, D3, D5, A1–A5) still to run.
Re-run the **same** frozen set after the content engine has been producing for
a quarter; never swap a query silently.
