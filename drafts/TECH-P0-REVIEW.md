# `geo/tech-p0` — merge review aid
**Prepared 2026-08-22.** 8 commits. **Merge tested: clean, exit 0, zero conflicts.**

> **Correction to an earlier report:** I previously said "9 commits." It is 8.
> `git log --oneline main..geo/tech-p0` is the authority.

## Read this first: the diffstat lies

`git diff --stat main..geo/tech-p0` reports **117 files, +34,595**. Ignore that
number. It is inflated because `main` separately deleted 68 unused files (the
11.3 MB cleanup, commit `35ecf9b`) that this branch was cut before. Diffing the
two branches shows those as "added" on the branch side.

**The real merge result is 32 files, +579 / −483.** Verify it yourself:

```bash
git checkout main
git merge --no-commit --no-ff geo/tech-p0
git diff --cached --stat HEAD        # <- this is the truth: 32 files
git merge --abort                    # undo; nothing committed
```

I ran exactly that. Exit code 0, no conflicts, no modify/delete collisions.

## The 10-minute review path

Review in this order — highest risk first, and stop early if satisfied:

```bash
# 1. The gate that prevents the whole bug class recurring  (2 min)
git diff main..geo/tech-p0 -- scripts/check-route-parity.js package.json

# 2. What actually changed about which URLs exist          (3 min)
git diff main..geo/tech-p0 -- public/sitemap.xml public/llms.txt src/lib/routeMeta.ts

# 3. The one behavioural nav change                        (1 min)
git diff main..geo/tech-p0 -- src/components/layout/Header.tsx

# 4. Spot-check the character-only claim on any one file   (2 min)
git diff main..geo/tech-p0 -- src/pages/rtr.tsx

# 5. Everything else is docs                               (2 min)
git diff --stat main..geo/tech-p0 -- '*.md'
```

## Local verification (already run, reproducible)

```bash
npm ci
npm run check:routes     # parity gate — expect PASS
npm run lint             # expect 14 errors (main has 16; this branch fixes 2)

# Full build needs a native Chrome on macOS — the bundled chromium is a Linux
# binary and postbuild dies with spawn ENOEXEC. One-time setup:
npx puppeteer browsers install chrome
export PRERENDER_EXECUTABLE_PATH="$HOME/.cache/puppeteer/chrome/mac_arm-*/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing"
npm run build            # expect exit 0, 60 routes prerendered
```

Results when I ran them: parity **PASS** (30 sitemap + 17 llms.txt URLs) ·
lint **14 vs main's 16** · build **exit 0, 60 routes** ·
`/courses/cabin-crew` and `/courses/ground-staff` both prerendered with correct
titles, H1s and bodies · all 13 pruned URLs correctly absent from `dist/`.

---

## The 8 commits

### 1. `8acca15` Fix UTF-8 mojibake across 19 page components
**What:** 162 user-visible characters had been saved as Latin-1/CP1252 and were
rendering as garbage — including **58 rupee signs inside fee tables**, 19 emoji
on live pages, and the `/rtr` H1. Plus 1,485 box-drawing characters in comments.
**Why:** garbled text in fee tables is garbled precisely where an answer engine
looks for pricing.
**Risk: very low.** All 204 changed lines were verified to have identical ASCII
skeletons — character substitutions only, no structural edits.

### 2. `79d89c1` Add route parity gate; remove duplicate prerender script
**What:** adds `scripts/check-route-parity.js`, wired as `prebuild`, which fails
the build if any `sitemap.xml` or `llms.txt` URL lacks a `routeMeta.ts` entry.
Deletes `scripts/prerender.mjs` and its two npm scripts. Rewrites `PRERENDER.md`.
**Why:** the 404s were architectural — two sources of truth for routes with
nothing enforcing sync, plus a second prerender script that read the wrong one
and never ran. `PRERENDER.md`'s "adding a new route" checklist omitted
`routeMeta.ts` entirely, which is what produced the drift.
**Risk: low, but this is the commit to read.** It changes the build pipeline.
If the gate is wrong, builds fail loudly rather than shipping silently-broken
routes — the safe failure direction. `prerender.mjs` was dead code: `postbuild`
runs `prerender.js`.

### 3. `c788647` Wire 2 pages, prune 13 dead URLs from sitemap/llms.txt
**What:** adds `routeMeta.ts` entries for `/courses/cabin-crew` and
`/courses/ground-staff` (both previously 404). Removes 13 URLs from
`sitemap.xml` that had no page behind them. Removes the `/dgca/computer-number`
line from `llms.txt`. Fixes the top-level **Courses** nav item, which pointed at
`/Courses/cpl` — capital C, a 404 on every page.
**Why:** stop advertising URLs that 404; ship the two that have real, audited
content.
**Risk: low, one judgement call.** The 13 pruned URLs are already 404 in
production, so removing them loses nothing. **The judgement:** I did *not* wire
`/become-a-pilot/airline-transport-pilot-licence` (contains another company's
copy) or `/become-a-pilot/commercial-pilot-licence` (near-duplicate of the live
`/courses/cpl`). Both stay 404 and are logged as calendar items. Reverse that by
adding routeMeta entries if you disagree.

### 4. `4ec54e2` Add Phase 1 audit report and seed the content calendar
**What:** `GEO_AUDIT_REPORT.md` and the Build/Remediation buckets in
`GEO_CONTENT_CALENDAR.md`. **Docs only. Risk: none.**

### 5. `d4e0e80` Link Phase 1 results into GEO_CONTEXT, log 6 NAP variants
**Docs only. Risk: none.**

### 6. `4f4c1a1` Record entity-separation recon; allow WebFetch on We One domains
**What:** recon findings in `GEO_CONTEXT.md`, plus two `WebFetch` domains in
`.claude/settings.json`.
**Risk: none to the site.** The settings change only affects what I may fetch.

### 7. `e795f4a` Fix 7 residual mojibake runs the first sweep missed
**What:** ⚠️ and ✈️ emoji with variation selectors, on `/rtr` and both
interview pages. My first sweep's detector missed runs mixing a CP1252-mapped
character with a raw C1 character.
**Why:** it also clears a real pre-existing lint error, `rtr.tsx:412
no-irregular-whitespace`.
**Risk: very low.** Same character-substitution class as commit 1.

### 8. `c03fbd2` Document the macOS prerender workaround
**Docs only. Risk: none.** But read it — it explains why a plain
`npm run build` exits 1 on your machine while production is fine.

---

## What this branch does NOT do
- No content rewritten. No H1, meta title or slug changed on any existing page.
- No We One removal — that is `geo/truth-hygiene`, still blocked on the phone.
- No homepage claim changes — that is `geo/homepage-accuracy`, blocked on facts.
- No analytics, form, backend, payment or admin code touched.

## After merging
1. Deploy.
2. Verify: `curl -s https://www.flystar.co.in/courses/cabin-crew | grep -i "<title>"`
   should return the cabin-crew title, not the homepage's.
3. Search Console → URL inspection → **request indexing** for
   `/courses/cabin-crew` and `/courses/ground-staff`.
4. Optional but useful: re-check two or three of the 13 pruned URLs and confirm
   they still 404 rather than half-existing.
