# GEO Decisions Log
_Every reversible default taken autonomously during the campaign. Reviewable in
90 seconds; each row says how to reverse. Facts, brands, money pages and
deletions are NEVER defaulted — those become blockers._

| Date | Decision | Default taken | How to reverse |
|---|---|---|---|
| 2026-08-22 | Where to create campaign files given the branch-rules ruling | Created `CAMPAIGN_PROMPT.md`, `GEO_CAMPAIGN_STATE.md`, `GEO_DECISIONS.md` as NEW files on `main` only. Did not touch `GEO_CONTEXT.md` on main — it has unmerged edits on `geo/tech-p0` and editing both sides would force a merge conflict. | After `geo/tech-p0` merges, `GEO_CONTEXT.md` becomes freely editable on main. No file changes needed. |
| 2026-08-22 | Order of run-1 workstreams | Ran W1 (build verify) first because it gates the owner's merge, then W8 (baseline) because it is time-sensitive and must precede the tech-p0 deploy, then W4 (legal drafts). Deferred W3 keyword research to run 2 — it is search-heavy and the baseline should be captured first. | Say "run W3 first" on the next campaign invocation. |
