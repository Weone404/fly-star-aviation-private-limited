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
| W1 | Build-verify `geo/tech-p0` | run #1 | — |
| W2 | `geo/truth-hygiene` | not started | tech-p0 merge + canonical phone (fact 3) |
| W3 | Phase 2 keyword research | not started | — **unblocked** |
| W4 | /privacy + /terms drafts → `drafts/` | not started | — **unblocked** (wiring waits for tech-p0 merge) |
| W5 | Article drafts (cap 3) | not started | W3 |
| W6 | Interview-page rewrites ×2 | not started | W2 merged + facts 3, 6 |
| W7 | `geo/homepage-accuracy` + Org schema + claims-truth | not started | facts 1, 2, 4, 5, 7 |
| W8 | Visibility baseline (**time-sensitive, pre-deploy**) | not started | — **unblocked** |

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
| 1 | 2026-08-22 | init, W1, W8, W4 | see below |
