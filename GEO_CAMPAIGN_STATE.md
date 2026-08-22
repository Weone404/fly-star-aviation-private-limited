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

## Branch ledger
| Branch | State | Contents | Gate |
|---|---|---|---|
| `main` | at `9337929` | Phase 0 only. **Still carries the OLD PRERENDER.md** (wrong route checklist) and settings.json without the We One domains. Never cut a site branch from main until tech-p0 merges. | — |
| `geo/tech-p0` | 6 commits, unmerged | Mojibake fix (19 files), route parity gate, prerender.mjs removal, PRERENDER.md rewrite, 2 pages wired, 13 URLs pruned, nav casing fix, audit report, recon findings | **Owner: build + review + merge** |
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
| W1 | Build-verify `geo/tech-p0` | **FAILED — disk full** | **Disk space.** `npm ci` needs GBs; 700Mi free. Owner must free space, then retry. |
| W2 | `geo/truth-hygiene` | not started | tech-p0 merge + canonical phone (fact 3) |
| W3 | Phase 2 keyword research | **DONE (run 2)** — 30 topics in `GEO_KEYWORD_RESEARCH.md` | Top 10 awaiting owner approval before W5 drafting |
| W4 | /privacy + /terms drafts → `drafts/` | **DRAFTED** (run 1) | Wiring waits for tech-p0 merge + `geo/legal-pages`; text waits for legal review + facts 1, 3, 4 |
| W5 | Article drafts (cap 3) | **2 of 3 drafted** (runs 3–4): #1 OLODE, #3 Computer Number | Byline (fact 3) blocks publication of **every** draft. One more may be drafted before the checkpoint. |
| W6 | Interview-page rewrites ×2 | not started | W2 merged + facts 3, 6 |
| W7 | `geo/homepage-accuracy` + Org schema + claims-truth | not started | facts 1, 2, 4, 5, 7 |
| W8 | Visibility baseline (**time-sensitive, pre-deploy**) | **BATCH 1 CAPTURED** (run 1) — 0/8 presence | Batches 2–3 pending; manual AI checks owed by owner |

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
