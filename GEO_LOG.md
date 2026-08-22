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

| 2026-08-22 | B4 Air Navigation DGCA exam preparation | websearch | No | — | — | airshipaviation ×2, fmsaviation ×2, aeropilotsacademy, cpacpilots ×2 | — |
| 2026-08-22 | B5 Aviation Meteorology DGCA exam | websearch | No | — | — | pilot18 ×2, fmsaviation ×3, aeropilotsacademy, cpacpilots | Scribd |
| 2026-08-22 | B6 Air Regulations DGCA exam preparation | websearch | No | — | — | **goldenepaulettes (Dwarka, #1)**, fmsaviation ×3, pilotcourse.in, airshipaviation, thepilotscompass | — |
| 2026-08-22 | B7 Technical General DGCA preparation | websearch | No | — | — | cosmoipilot, aeropilotsacademy, wingmanlog, thepilotscompass, dgcacplgroundclasses, cpacpilots | **Quora (#1)** |
| 2026-08-22 | B8 RTR(A) exam preparation India | websearch (captured during W3 research, same date) | No | — | — | aivr, aviatorcloud, wingmanlog, airshipaviation, fmsaviation ×2, airlineprepschool, cpacpilots, pioneerflyingacademy | — |
| 2026-08-22 | B10 DGCA computer number process | websearch (captured during W3 research, same date) | No | — | — | topcrewaviation, wingmanlog, dgcacomputernumber.com ×2, flywithgati, fmsaviation, aviationsierra, mgavia | — |
| 2026-08-22 | A1 Flying Star Aviator | websearch | **YES** | ~6 | `/` (homepage) | — (brand query) | 2× Instagram, 2× Justdial, Facebook, Wikipedia + "aviator" game noise |
| 2026-08-22 | A3 Flying Star Aviation reviews | websearch | **No** | — | — | goldenepaulettes ("Top 10 DGCA-approved flying schools"), Star Aviation Academy, Fly Space | **Justdial ×3 (dominates)**, Sulekha |

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
   it; ground-class programmes run 4–6 months.
   ⚠️ **CORRECTION (W3, same day):** this row originally logged "DGCA exams
   held in January, April, July and October". W3 research found sources stating
   Regular Flight Crew sessions run **March, June, September, December**, plus
   on-demand OLODE windows. Two secondary sources disagree —
   **[CONFIRM] against the official programme of examinations on
   `pariksha.dgca.gov.in`.** Neither figure may be published until verified.


### Batch 2 additions (2026-08-22, same pre-deploy window)
7. **Per-subject exam queries are uniformly lost.** Absent from all four
   (Navigation, Meteorology, Air Regulations, Technical General) despite
   `/dgca/ground-classes` being live. FMS Aviation Academy ranks on *every*
   one, often multiple times — it has built a page per subject. That is the
   playbook the calendar's cluster-1 topics replicate.
8. **Quora ranks #1 for Technical General.** Second confirmation that
   third-party surfaces beat institute pages on preparation queries.
9. **Sourced (secondary, needs [CONFIRM]):** DGCA theory papers are
   computer-based MCQ with a **70% pass mark**; subject prep runs 4–6 weeks
   each; Air Regulations centres on ICAO Annexes 1, 2, 6 and 11.

### ⚠️ Entity findings from the brand queries — this is the important part
The brand query is the only one where flystar.co.in appears (~position 6), and
what surrounds it is the entity-fusion problem made visible:

- **Two Instagram accounts**: `@flying_star_aviator` and `@flyingstaraviator`.
  The Organization schema's `sameAs` lists only the second.
- **Two Justdial listings for the same business ID**
  (`011PXX11-XX11-190301143042-S5J4_BZDET`) under **different names** —
  "Flying Star Aviator Private Limited" and "Flying Star Aviation Pvt Ltd" —
  reporting **different review counts (615 vs 1201)**. One business, split
  reputation.
- **A Facebook page "FlyingStar Aviators" at `facebook.com/flyspaceaviation`** —
  a further brand string. The schema `sameAs` lists `facebook.com/flystar.co.in`.
- **Name variants now at seven**: Flying Star Aviator Private Limited · Flying
  Star Aviators · Flying Star Aviation Pvt Ltd · FlyingStar Aviators · Fly Star
  Aviation · Fly Space Aviation · We One Aviation.
- **Similarly-named third parties compete for the brand query**: Star Aviation
  Academy (two domains) and Fly Space (flyspace.co.in).
- **Generic noise**: "Aviator" gambling apps and the 2004 film crowd the SERP.

**And the claim is already propagating.** The search engine's own summary of
the brand query asserts Flying Star is "India's best **DGCA-approved** CPL &
ATPL ground classes institute" — lifted from the homepage. The unverified
approval claim is being restated as fact by an automated summary. That is
precisely the mechanism the homepage-accuracy branch exists to stop, now
observed rather than predicted.

### Manual AI check — OWED BY OWNER (this is the half that actually counts)
Run these same 8 queries yourself in **ChatGPT (search on), Perplexity, Gemini,
and Google AI Overviews**, and record cited / mentioned / absent per engine.
Web search cannot substitute for it — nothing above is evidence of what an AI
engine says. Add rows here under the same date with source `manual`.

### Next
Batch 2 (B4–B8, C3, C5, D4) and batch 3 (B9, B10, D3, D5, A1–A5) still to run.
Re-run the **same** frozen set after the content engine has been producing for
a quarter; never swap a query silently.
