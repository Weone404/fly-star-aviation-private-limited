# CLAUDE.md — Flying Star Aviator website

## Authorization
The repository owner is the site admin. Claude Code is authorized to read,
create, edit, restructure and commit any file in this repository **on feature
branches**. Do not ask permission for ordinary edits — follow the gates below.

## Project
Website: https://www.flystar.co.in — Flying Star Aviator Private Limited,
DGCA CPL/ATPL ground training + B2B aviation services, Dwarka, New Delhi.
Stack: Vite + React 18 + TypeScript + Tailwind + shadcn/ui, prerendered at build
time (`scripts/prerender.js` reads routes from `src/lib/routeMeta.ts`), on Vercel.
Goal: visibility in Google AND AI engines (ChatGPT, Perplexity, Claude, Gemini,
AI Overviews) via technical fixes, page restructuring and new guide content.

## Ground rules
1. FACTS: DGCA rules, flight-hour minimums, eligibility and fees change. Never
   write a number or rule from memory — verify (prefer dgca.gov.in, wpc.gov.in)
   or mark `[CONFIRM: ...]`.
2. TONE: expert, informational, plain — a senior flight instructor, not a
   salesperson. Banned: leading, best-in-class, world-class, revolutionary,
   unlock, elevate, seamless, exclamation marks, "chase your dreams". One CTA,
   end of page only.
3. PROTECTED: never change route slugs, meta title intent or H1 intent of pages
   listed as protected in GEO_CONTEXT.md. Never delete existing Q&A passages —
   reposition instead.
4. NO FABRICATION: no invented fees, statistics, student counts, reviews, quotes
   or dates. Business-only facts get `[CONFIRM]` placeholders.
5. AUTHORSHIP: every new guide gets a real author byline + credentials from
   GEO_CONTEXT.md (or `[CONFIRM AUTHOR]`), plus datePublished and dateModified.
6. RENDER GATE: any new route MUST get an entry in `src/lib/routeMeta.ts`.
   `scripts/prerender.js` builds its route list from that file — a route absent
   from it is never prerendered, falls through `vercel.json` to the catch-all,
   and returns **HTTP 404** to users and crawlers. Verified 2026-08-22: 15 of
   43 sitemap URLs are dead this way. sitemap.xml is the advertisement;
   routeMeta.ts is the gate. A URL needs both.

## Workflow gates
1. One page/feature per branch: `geo/<topic>`.
2. Small commits: `[GEO] what, on which page`.
3. NEVER merge to main, push, or trigger a deploy unless explicitly told to in
   the conversation.
4. Adding a page = component + route in App.tsx + `routeMeta.ts` entry
   (render gate) + `pageMeta.ts` + schema + sitemap.xml + llms.txt + internal
   links from 2–3 related pages. Verify the new URL is not 404 after deploy.
5. Never touch analytics, contact/lead forms, `backend/`, `api/`, or admin auth
   unless the task requires it and you say so first.
6. Run `npm run lint` (and `npm run build` when practical) before committing.
7. If a request conflicts with these rules, stop and explain — never silently
   comply.

## File map
`MASTER_PROMPT.md` session protocol · `GEO_CONTEXT.md` business + stack facts ·
`GEO_KEYWORDS.md` seeds · `GEO_CONTENT_CALENDAR.md` pipeline · `GEO_QUERIES.md`
+ `GEO_LOG.md` tracking · `flystar.co.in-audit/` prior audit (2026-07-30) ·
`.claude/skills/` GEO skills
