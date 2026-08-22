# CAMPAIGN_PROMPT.md — End-to-End Autonomous Campaign

Read this fully. Then read CLAUDE.md, GEO_CONTEXT.md, GEO_CONTENT_CALENDAR.md,
GEO_DECISIONS.md (create if absent), GEO_LOG.md, and GEO_CAMPAIGN_STATE.md
(create if absent). This prompt SUPERSEDES the MASTER_PROMPT phase protocol —
skills and CLAUDE.md gates still apply absolutely.

## Mission
Run the full GEO/AEO campaign for flystar.co.in end-to-end: technical hygiene →
entity separation → keyword research → calendar → article production →
application to site → visibility baseline and tracking. Sequence work by your
own dependency analysis. Ask only what truly blocks you. Log every default
you take. Never idle, never guess a fact, never violate a gate.

## Operating contract

### Autonomy
- Authorized per CLAUDE.md. Do not ask permission to edit, branch, or commit.
- Pick the right skill per workstream; follow its process exactly.
- Discover problems mid-campaign (dead links, claims issues, We One traces,
  copied content, mojibake)? Fix mechanical ones immediately; log judgment
  calls in GEO_DECISIONS.md; keep moving.
- Human gates that stay human no matter what: merge/push/deploy, protected
  pages' slugs/titles/H1s, fabrication, legal text sign-off.

### Question protocol — batched, never a stream
- BLOCKER (ask immediately): a fact you must not guess (legal name, phone,
  fees, rules, approvals, "which brand does this belong to"); a decision with
  lasting consequences (delete/keep a live page, restructure a money page);
  any CLAUDE.md conflict. Format: numbered, ≤3 lines each, options + your
  recommendation. Batch ALL current blockers into one block, then STOP that
  workstream and move to the next unblocked one.
- DEFAULT (proceed, log): any reversible choice with a safe conservative
  answer (wording, slug phrasing, FAQ order, table columns). Take the
  default, log one line in GEO_DECISIONS.md: date · decision · default ·
  how to reverse.
- Rule of thumb: if being wrong costs a file edit to fix, default it. If
  being wrong costs trust, a live-page mistake, or a fact — BLOCKER.
- When genuinely uncertain and no safe default exists — that is a BLOCKER.
  Asking is always better than guessing.

### Context discipline
- State lives in files, not chat. After each workstream: write outputs to
  files, commit if on a branch, summarize in ≤10 lines.
- Context running heavy? Finish the current logical unit, update
  GEO_CAMPAIGN_STATE.md (done / in-flight / next / blockers), end with:
  "SESSION LIMIT — paste the campaign command again to resume."

### The loop (every run)
1. Read GEO_CAMPAIGN_STATE.md. Absent → run #1: initialize it, and first
   record the standing geo/truth-hygiene spec from session history into it
   so it survives context resets.
2. Rebuild the execution plan from state files + queue below.
3. Execute the highest-priority UNBLOCKED workstream fully.
4. Repeat until user-blocked, session limit, or all done.
5. End every run with:
   ✅ DONE THIS RUN: [items]
   🚫 BLOCKED ON ME: [numbered — each with the exact answer I owe you]
   📋 DEFAULTS TAKEN: [or "none"]
   ▶ RESUME: "Run the campaign."  ·  or  MY ACTIONS: [list]
6. All work complete → write the campaign-complete report into
   GEO_CAMPAIGN_STATE.md and declare it.

## The queue (dependency-ordered; state file supersedes once populated)
W1. If geo/tech-p0 is unmerged: npm ci && npm run build on it, report
    pass/fail, STOP — merging is mine. Downstream W2/W6 blocked; continue
    with unblocked work.
W2. geo/truth-hygiene per the spec in GEO_CAMPAIGN_STATE.md. Items missing
    canonical facts (phone, NAP) → skip and log blocked. NEVER substitute
    a number or brand on my behalf.
W3. Phase 2 keyword research → GEO_CONTENT_CALENDAR.md: 25–40 topics,
    scored, re-weighted for ground-school positioning. Present top 10 for
    approval; mark the rest provisional.
W4. Draft /privacy and /terms into drafts/ — [LEGAL REVIEW REQUIRED].
W5. Phase 3: draft articles for approved or top provisional topics into
    drafts/ with [CONFIRM] placeholders for byline/numbers. Cap at 3
    drafts before the first approval checkpoint. Article-approval gate is
    Phase 4 wiring, not drafting — but nothing goes live with unconfirmed
    facts.
W6. Interview-page rewrites ×2 (needs W2 merged + facts from me).
W7. geo/homepage-accuracy + Organization schema + site-wide claims-truth
    pass (needs MCA + DGCA-approval facts).
W8. Phase 5 visibility baseline — run EARLY (pre-deploy) if not yet done:
    this is the "before" measurement and it is time-sensitive.
