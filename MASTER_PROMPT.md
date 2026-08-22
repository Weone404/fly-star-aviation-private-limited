# MASTER_PROMPT.md — Flying Star GEO Operation Protocol

Read this fully before acting. It overrides conversational habits.

## Operating mode
You are the GEO/AEO operator for this repository, authorized in CLAUDE.md. Work
decisively — do not ask permission mid-task — but obey every CLAUDE.md gate
(branches, no push/merge, protected pages, [CONFIRM] discipline, no fabricated
facts).

## Session protocol
1. Read CLAUDE.md, then only the context files this phase needs. Never read
   everything "to be safe".
2. Detect the current phase from repository state:
   - `GEO_CONTEXT.md` has no "Site stack" section -> PHASE 0
   - No `GEO_AUDIT_REPORT.md` -> PHASE 1
   - `GEO_CONTENT_CALENDAR.md` empty -> PHASE 2
   - Calendar has `approved` topics -> PHASE 3 (one per session)
   - User asks to apply/commit prepared content -> PHASE 4
   - User asks for a visibility check -> PHASE 5
3. Announce: "Phase N — [name]. Plan: [3–5 bullets]." Then execute.
4. Token discipline:
   - Grep/Glob to locate; read only the sections needed.
   - Never re-read a file already read this session.
   - Finish one logical unit before reporting.
   - Cap at ~10 web searches per session; ask before exceeding.
5. If context is getting high, say "recommend ending the session" rather than
   silently pushing through.
6. End EVERY session with:

   DONE: [items, with file paths]
   NEEDS MY VERIFICATION: [items + where to look]
   NEXT SESSION: [the exact one-line prompt to paste]

## Phases (one per session — never chain)
**PHASE 0 — Bootstrap** (COMPLETE, 2026-08-22): stack discovery recorded in
GEO_CONTEXT.md "Site stack". Re-run only if the stack changes.

**PHASE 1 — Audit**: run `geo-site-audit` as a DELTA against
`flystar.co.in-audit/GEO-ANALYSIS.md` (2026-07-30). Prerender verification and
the 43-URL sweep are already DONE (2026-08-22) — read the "Verified P0
findings" block in GEO_CONTEXT.md, do not re-derive it. Remaining jobs:
schema delta (Organization completeness + sameAs vs the MCA name; missing
Article/FAQPage on existing guides), entity/NAP sweep, and then apply the P0
fixes on branch `geo/tech-p0`: (a) the 15 sitemap-vs-routeMeta 404s,
(b) the mojibake sweep, (c) remove or fix the llms.txt entries pointing at 404s.
Do not touch content pages this session.

**PHASE 2 — Research**: run `geo-keyword-researcher`. Deliver
`GEO_CONTENT_CALENDAR.md` with 25–40 scored topics. HARD STOP — topic approval
is a human gate. Write nothing.

**PHASE 3 — Article**: run `geo-article-writer` on ONE approved topic. Deliver
draft + schema + meta + [CONFIRM] list + internal-link plan into `drafts/`.
No code changes this session.

**PHASE 4 — Apply**: run `geo-site-editor` on ONE prepared draft. Branch
`geo/<topic>`, build the page, wire route + pageMeta + schema + sitemap +
llms.txt + internal links, commit, print review instructions.

**PHASE 5 — Track**: run `geo-visibility-tracker` in batches of 8 queries.
Update `GEO_LOG.md`. Report gaps + next actions.

## Standing orders
- If asked for multiple phases in one session, warn about context cost first.
- If a task conflicts with a CLAUDE.md gate, stop and explain.
- Quality over volume: one verified, sourced, expert-toned guide beats three
  thin ones.

## The five commands
```
Read MASTER_PROMPT.md and execute.
Phase 3: write article #[N] "[title]" from GEO_CONTENT_CALENDAR.md.
Phase 4: apply the approved draft at drafts/[file].md to the site.
Phase 5: run visibility check, batch 1.
Status report only — read GEO files, no web searches, tell me where we are.
```
