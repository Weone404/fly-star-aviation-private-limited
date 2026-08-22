# GEO Campaign State
_The campaign's memory. Read first every run; updated at the end of every run._
_Initialized 2026-08-22 (run #1)._

## Branch rules (owner ruling, 2026-08-22)
- **State/doc files** — `GEO_CONTEXT.md`, `GEO_DECISIONS.md`,
  `GEO_CONTENT_CALENDAR.md`, `GEO_LOG.md`, this file, `CAMPAIGN_PROMPT.md` —
  commit **directly to main**. Operational records don't need review cycles.
- **Branches are for reviewable site changes only.**
- ⚠️ Open conflict risk: `GEO_CONTEXT.md` was edited on `geo/tech-p0`
  (commits `d4e0e80`, `4f4c1a1`) before this rule existed. Do NOT edit
  `GEO_CONTEXT.md` on main until `geo/tech-p0` merges, or the merge conflicts.
  New files on main are safe.

## 📌 Justification artifact for `geo/homepage-accuracy` — dated evidence
**2026-08-22.** Running baseline query A1 ("Flying Star Aviator"), the search
engine's own generated summary stated:

> "Flying Star Aviator is India's best **DGCA-approved** CPL & ATPL ground
> classes institute in Delhi."

That sentence was lifted from the homepage H1 and meta title. Query A2
reproduced it. **The unverified approval claim is already being restated as
fact by an automated summary** — no longer a predicted risk, an observed one.
If the DGCA approval cannot be evidenced (facts block item 4), this is a
false claim propagating beyond our control, and the homepage branch is the
remedy. Keep this dated entry as the record of when it was first observed.

## Blocked-work table (as at 2026-08-22, run 8)
No owner inputs were supplied this run — the input block arrived with all five
placeholders unfilled, so per the "skip any left blank" rule nothing was recorded.

| Blocked work | Exact input needed | Where it goes |
|---|---|---|
| ~~Byline~~ | **✅ RESOLVED 2026-08-22** — institutional, "Flying Star Aviator Academics Team"; applied to all 3 drafts | — |
| `/editorial-policy` page | Canonical email + phone (corrections contact) + MCA legal name | `drafts/editorial-policy.md` — **wires first** |
| Phase 4 wiring | `geo/tech-p0` merged | policy page → computer-number → OLODE → misconceptions |
| `geo/truth-hygiene` (item 7) | Canonical phone **and** merge | replaces 9876543210 + wa.me/919355611996 |
| Further drafting (W5 cap) | Top-10 approved or reordered | `GEO_KEYWORD_RESEARCH.md` statuses |
| 6 of 10 calendar topics | `brew install poppler` | see `drafts/research/SOURCE-INDEX.md` |
| Calendar #11 (fees) | Own-fees decision: publish / withhold | article scope |
| W6, W7 | The 7-item facts block | `GEO_CONTEXT.md` |

## Standing rules (added 2026-08-22)

### Research bank first
`drafts/research/` holds primary sources already fetched, each with its source
URL and fetch date. **Grep the bank before running any web search.** A banked
primary source costs zero searches and can carry five articles. Bank every new
authority document fetched (dgca.gov.in, wpc.gov.in, pariksha.dgca.gov.in) in
the same format. This is the project's cheapest and most valuable token asset.

### Quarterly fact-refresh sweep
Fees change, rules get amended, calendars rotate. An evergreen guide that was
right in August is quietly wrong after the next fee revision — and then a
correction-based advantage inverts into a liability.

Every quarter: re-verify every published article's fees, rules and dates
against primary sources, and bump `dateModified` on any change.
**Priority order: any article whose differentiator is a correction**, since
those are the ones where being stale does the most damage. The banked research
files are the instrument — re-fetch them and diff.

### The corrections play
Where a primary source contradicts what ranking pages say, that is the most
citable asset available. State the correct fact with its citation; **never name
or characterise a competitor**. Use the myth-vs-fact format. Full rules in
`.claude/skills/geo-article-writer/SKILL.md`.

## ✅ geo/tech-p0 verification results (run 5, 2026-08-22) — ready to merge
| Check | Result |
|---|---|
| `npm ci` | clean |
| Route parity gate (`prebuild`) | **PASS** — 30 sitemap + 17 llms.txt URLs, all with routeMeta entries, 54 routes |
| `npm run lint` | **14 errors vs main's 16** — this branch reduces them; the rest pre-date it |
| `npm run build` | **exit 0** with `PRERENDER_EXECUTABLE_PATH` set (see PRERENDER.md) |
| Prerender output | **60 routes** written to `dist/` |
| `/courses/cabin-crew` | prerendered — correct title, H1, 4,552 chars body |
| `/courses/ground-staff` | prerendered — correct title, H1, 10,076 chars body |
| The 13 pruned URLs | correctly **absent** from `dist/` |

**Caveat worth knowing:** plain `npm run build` exits 1 on macOS — the bundled
`@sparticuz/chromium` is a Linux binary. `dist/` is still produced but nothing
prerenders, so an unmodified local build does not verify the thing that matters.
Workaround documented in PRERENDER.md. Vercel (Linux) is unaffected.

## Branch ledger
| Branch | State | Contents | Gate |
|---|---|---|---|
| `main` | at `9337929` | Phase 0 only. **Still carries the OLD PRERENDER.md** (wrong route checklist) and settings.json without the We One domains. Never cut a site branch from main until tech-p0 merges. | — |
| `geo/tech-p0` | **8** commits, unmerged, **BUILD VERIFIED + MERGE TESTED CLEAN** | Mojibake fix (19 files), route parity gate, prerender.mjs removal, PRERENDER.md rewrite, 2 pages wired, 13 URLs pruned, nav casing fix, audit report, recon findings | **Owner: build + review + merge** |
| `geo/truth-hygiene` | not cut | Spec below | Needs tech-p0 merged + canonical phone |
| `geo/legal-pages` | not cut | /privacy + /terms fully wired, and restores their two footer links | Cut only AFTER tech-p0 merges; merges only after legal sign-off |
| `geo/homepage-accuracy` | not cut | H1/meta + Organization schema + claims-truth pass | Needs MCA + DGCA-approval facts |

## Standing spec — `geo/truth-hygiene` (mechanical separation only)
_Recorded verbatim so it survives context resets. Requires `geo/tech-p0`
merged to main first._

**Phase A — recon: COMPLETE (2026-08-22).** Result recorded in GEO_CONTEXT.md:
our two interview pages are NOT duplicates of We One's live pages (1.0% and
0.1% eight-word shingle overlap). No cross-domain duplicate-content emergency.

**Phase B — mechanical separation:**
1. Delete R1 (`src/pages/BecomeAPilot/airline-transport-pilot-licence.tsx`) and
   any imports/routes referencing it. Parity check must stay green.
2. `WorldMapSection.tsx` — remove the `weoneaviation.com` outbound link.
3. Replace `wa.me/919355611996` and `+91 9876543210` (8 pages) with the
   canonical phone from GEO_CONTEXT.md. **If the canonical phone is not
   recorded, SKIP and say so — never choose a number.** Three of the numbers
   currently on the site are provably We One's.
4. `routeMeta.ts` — rebrand both interview-page titles from
   "| We One Aviation" to Flying Star.
5. Public-surface We One sweep: components, meta, JSON-LD, llms.txt, footer.
   Strip or rebrand every hit. **Leave admin auth and backend internals
   untouched** — separate security pass, owner's call.
6. Footer — remove the dead `/locations/<city>` link block, **including the
   `/privacy` and `/terms` links** (geo/legal-pages restores those two in the
   same changeset that wires the pages; never leave dead links live).
7. `GEO_CONTENT_CALENDAR.md`, status "approved": ATPL ground-classes guide
   (the deleted R1 topic), interview-page rewrite ×2 (keep slugs, informational
   form), and verify the Build bucket is present.

**Phase C — REMOVED.** /privacy and /terms moved to `geo/legal-pages` per the
owner ruling: "DO NOT MERGE" content must never sit on a branch whose purpose
is to merge.

## Workstream status
| # | Workstream | Status | Blocked by |
|---|---|---|---|
| W1 | Build-verify `geo/tech-p0` | **✅ PASSED (run 5)** | — **Ready to merge.** See verification results below. |
| W2 | `geo/truth-hygiene` | not started | tech-p0 merge + canonical phone (fact 3) |
| W3 | Phase 2 keyword research | **DONE (run 2)** — 30 topics in `GEO_KEYWORD_RESEARCH.md` | Top 10 awaiting owner approval before W5 drafting |
| W4 | /privacy + /terms drafts → `drafts/` | **DRAFTED** (run 1) | Wiring waits for tech-p0 merge + `geo/legal-pages`; text waits for legal review + facts 1, 3, 4 |
| W5 | Article drafts (cap 3) | **✅ 3 of 3 — CHECKPOINT REACHED** (runs 3, 4, 6): #1 OLODE, #3 Computer Number, #31 Misconceptions | **Owner review required.** Cap reached; no further drafting until the top 10 is approved. Byline blocks publication of all three. |
| W6 | Interview-page rewrites ×2 | not started | W2 merged + facts 3, 6 |
| W7 | `geo/homepage-accuracy` + Org schema + claims-truth | not started | facts 1, 2, 4, 5, 7 |
| W8 | Visibility baseline | **✅ COMPLETE — 25/25, all captured pre-deploy** (runs 1, 5, 6) | Manual AI checks still owed by owner — see below |

## Facts owed by the owner (the canonical block)
1. MCA — Flying Star Aviator Private Limited: legal name / CIN / registered address
2. MCA — We One: legal name / CIN / registered address
3. Canonical Flying Star NAP: phone + email. Replaces `+91 9876543210`,
   `wa.me/919355611996`, and every other number site-wide. **None of We One's
   five numbers** (9667370747, 9355611996, 9355566991, 9717977702, 9555291956)
   may be used.
4. DGCA approvals Flying Star actually holds, or "none — ground-training institute"
5. Real numbers: students trained / batches per year / instructors / honest
   pass-rate description
6. Does Flying Star actually run airline interview / cadet prep classes?
   If yes: Flying Star's OWN programme names — must NOT match We One's
   ("CPL Holder Preparation Program", "Type Rated Pilot Program A320"),
   because identical names on two live domains rebuild the fusion at the
   product layer.
7. Google Maps at the Dwarka address: which listings exist, which is Flying Star's

**Consequences already determined by fact 6:** *no* → interview rewrites go
fully informational with no course CTA, and `/courses/airline-preparation`
joins the claims-truth pass as a page describing services not delivered.
*yes* → pages rebuild around Flying Star's own programme names.

## Owner's permanent queue (never automated)
Merge + deploy · the MCA/DGCA lookups and real numbers · GSC indexing requests
· GSC impressions for the two interview URLs · the admin-credentials fix.

## Run history
| Run | Date | Workstreams | Outcome |
|---|---|---|---|
| 9 | 2026-08-22 | Byline ruling applied; editorial-policy page drafted | Byline resolved as institutional. Applied to all three drafts as a link to `/editorial-policy`, and stale "byline unresolved" headers cleared. Drafted the policy page from the campaign's **actual** operating rules, with a claim-by-claim enforcement table in its wiring plan so condition 2 is checkable rather than assumed. Publication order fixed: policy → computer-number → OLODE → misconceptions. Confirmed poppler still not installed and tech-p0 still unmerged. |
| 8 | 2026-08-22 | Merge-prep, wiring plans, manual-check sheet, source index | No owner inputs supplied (all placeholders blank) — items 1, 6, 7 skipped per the rule. **Tested the merge: clean, exit 0, no conflicts**; real change set is 32 files (+579/−483), not the 117/+34,595 the raw diffstat implies. Wrote `drafts/TECH-P0-REVIEW.md` (8 commits, risk each, 10-minute review path), 3 wiring plans, `GEO_MANUAL_CHECKS.md` (25 queries × 4 engines), and `drafts/research/SOURCE-INDEX.md`. Established that **6 of 10 top topics are blocked on poppler** — every high-value DGCA source is a PDF. |
| 7 | 2026-08-22 | A4 verification, W5 draft 3 | Re-ran A4 on request: reproduced exactly, but **flystars.co.in does not resolve** — corrected my "lookalike competitor" reading; the underlying finding (site does not rank #1 for its own domain) stands. Found two more phone numbers; built a 12-number inventory in the entity TODO. **Drafted #31 Misconceptions — the checkpoint trio is complete.** Eligibility gate held back 3 open questions into a "Still unsettled" section rather than presenting them as corrections. |
| 6 | 2026-08-22 | W8 completion, entity TODO | **Baseline COMPLETE, 25/25, all pre-deploy.** Final presence rate **3 of 25** — brand queries only; zero of 20 non-brand queries. Query A4 shows the site does not rank for its own domain (`flystars.co.in` does). Found the public company record: **CIN U85499DL2024PTC435001**, indicating incorporation in **2024** against the site's "since 2008". Created `GEO_ENTITY_TODO.md` — 7 numbered off-site decisions with recommendations. Draft #31 deferred: the baseline was correctly ordered first and consumed the run. |
| 5 | 2026-08-22 | W1 verification, W8 batch 2, mojibake follow-up |
| 4 | 2026-08-22 | W5 (draft 2 of 3), editorial rulings | Institutionalised three rulings: research-bank-first, no unverified numbers in JSON-LD, and the corrections play (state the fact, never name the rival, use myth-vs-fact). Added a `Common misconceptions` section type to the writer skill and to the OLODE draft. **Drafted #3 Computer Number with ZERO web searches** — entirely from the banked DGCA FAQ. Added topic #31 "Common Misconceptions About DGCA Exams" to the calendar as a P1. |
| 3 | 2026-08-22 | W5 (draft 1 of 3), repo cleanup | Drafted top-10 #1 (OLODE) with hand-off package: validated FAQPage JSON-LD, meta, linking plan, [CONFIRM] list. **Pulled primary-source facts directly from DGCA's Pariksha FAQ** — saved to `drafts/research/`. That source corrects two errors repeated on competitor pages (qualification is Physics + Maths, not PCM; there is no maximum registration age). Also removed 68 unused files / 11.3 MB from the repo. |
| 2 | 2026-08-22 | W1 (still blocked), W3 | Disk still full (757Mi) — W1 not retried. **W3 complete: 30 scored topics, top 10 proposed.** Found a fact conflict on DGCA exam session months and corrected the W8 log; both figures now [CONFIRM] pending the official pariksha.dgca.gov.in calendar. |
| 1 | 2026-08-22 | init, W1 (failed), W8 batch 1, W4 | Campaign initialized on main. W1 blocked: disk full — `npm ci` died at ENOSPC; the partial `node_modules` it left behind was removed, freeing 700Mi (still far short). **W8 baseline captured pre-deploy: flystar.co.in absent from all 8 queries.** Golden Epaulettes Aviation identified as competitor #1 (5/8 queries, based in Dwarka — and the source of R1's copied content). W4 drafts written to `drafts/`. |

## Competitive picture (from the W8 baseline — feeds W3 scoring)
- **Competitor #1: Golden Epaulettes Aviation** (Dwarka, Delhi) — 5 of 8 queries.
- **Dwarka micro-cluster also ranking:** Airborne Aviation (Sector 7),
  FMS Aviation Academy (Ramphal Chowk centre), CEA Aviation, 70knotsaviation.
  Local intent is contested, not open.
- **vfti.co.in confirmed a real competitor** — closes that Phase 0 [CONFIRM].
- **Third-party surfaces already ranking** (the `geo-entity-mentions` target
  list, named not hypothesised): Quora (commercialpilotindia), youyooz.com,
  merithub.com, findglocal.com, Facebook.
- **Sourced market data for future articles:** ground classes ₹1.5–3 lakh;
  total CPL ₹55–90 lakh (2026), flying ~70% of it; programmes 4–6 months;
  DGCA exams in January, April, July, October.
