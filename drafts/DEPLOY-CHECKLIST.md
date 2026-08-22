# Deploy checklist
**Written 2026-08-22.** Covers the `geo/tech-p0` merge and, later, the
publication chain. Work top to bottom; each stage assumes the one above passed.

---

# STAGE A — `geo/tech-p0` (ready now)

## A1. Review and merge
Review path: `drafts/TECH-P0-REVIEW.md` — 10 minutes, ordered highest-risk first.
Merge tested clean: exit 0, no conflicts. Real change set is **32 files,
+579/−483** (the raw `main..geo/tech-p0` diffstat reads 117 files because main
separately deleted 68 files this branch predates — ignore it).

```bash
git checkout main
git merge geo/tech-p0
```

## A2. Build before pushing
```bash
npm ci
npm run check:routes                       # parity gate — must PASS
npm run lint                               # expect 14 errors (main had 16)
npx puppeteer browsers install chrome      # one-time, macOS only
export PRERENDER_EXECUTABLE_PATH="$HOME/.cache/puppeteer/chrome/mac_arm-*/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing"
npm run build                              # must exit 0, ~60 routes prerendered
```
A plain `npm run build` exits 1 on macOS — the bundled chromium is a Linux
binary. That is expected and does not affect Vercel. See `PRERENDER.md`.

## A3. Deploy
Push `main`. Vercel runs the default `npm run build`, which now includes the
`prebuild` parity gate. **If the parity gate fails, the deploy fails** — that is
intended. A failed deploy here means a sitemap or llms.txt URL lacks a
`routeMeta.ts` entry; fix the mismatch rather than bypassing the gate.

## A4. Post-deploy verification

**Two pages that should now be live** (both 404 before this deploy):
```bash
for u in /courses/cabin-crew /courses/ground-staff; do
  echo "$(curl -sLo /dev/null -w '%{http_code}' "https://www.flystar.co.in$u")  $u"
done
```
Expect `200 200`.

**Prerendered HTML spot-check** — confirms crawlers see real content, not a shell:
```bash
curl -s -A GPTBot https://www.flystar.co.in/courses/cabin-crew | grep -o '<title>[^<]*</title>'
```
Expect the cabin-crew title, **not** the homepage title. Repeat for ground-staff.

**Sitemap / llms.txt parity on production:**
```bash
grep -o '<loc>[^<]*</loc>' <(curl -s https://www.flystar.co.in/sitemap.xml) \
 | sed 's/<[^>]*>//g' \
 | while read u; do echo "$(curl -sLo /dev/null -w '%{http_code}' "$u") $u"; done | grep -v '^200' 
```
Expect **no output**. Any line printed is a live 404 being advertised.

**The 13 pruned URLs should still 404** — confirm two or three, e.g.
`/locations/delhi`, `/dgca/computer-number`, `/pilot-training/maldives`.
(`/dgca/computer-number` becomes 200 later, in Stage B.)

**Nav check:** the top-level **Courses** menu item previously pointed at
`/Courses/cpl` (capital C, a 404 on every page). Click it — it must land on
`/courses/cpl`.

## A5. Search Console
URL inspection → **Request indexing** for:
- `https://www.flystar.co.in/courses/cabin-crew`
- `https://www.flystar.co.in/courses/ground-staff`

Also worth doing now: submit `https://www.flystar.co.in/sitemap.xml` again so
the 13 removals are picked up.

---

# STAGE B — the publication chain (blocked)

**Gates:** Stage A merged and deployed · canonical **phone and email** recorded
(the policy page's corrections contact). Branch: `geo/publication-1`, one
commit per page, in this binding order:

1. `/editorial-policy` — every article byline links here; it cannot ship second
2. `/dgca/computer-number` — also ends a site-wide nav 404
3. `/dgca/olode-exam`
4. `/dgca/exam-misconceptions` — links to both siblings, must be last

Wiring plans: `drafts/wiring-plan-*.md`. Each page needs component + route +
**`routeMeta.ts` entry (the render gate)** + `pageMeta.ts` + schema node +
`sitemap.xml` + `llms.txt` + inbound links.

## B1. Before committing the policy page
Walk the enforcement table in `drafts/wiring-plan-editorial-policy.md`. Every
sentence on the page maps to a rule that enforces it. **A row that cannot be
answered deletes its sentence** — that is condition 2 of the byline ruling, and
it is checkable, not aspirational.

## B2. Post-deploy verification, per page
```bash
for u in /editorial-policy /dgca/computer-number /dgca/olode-exam /dgca/exam-misconceptions; do
  code=$(curl -sLo /tmp/p -w '%{http_code}' -A GPTBot "https://www.flystar.co.in$u")
  title=$(grep -o '<title>[^<]*</title>' /tmp/p | head -1)
  chars=$(sed 's/<[^>]*>//g' /tmp/p | tr -s ' \n' ' ' | wc -c | tr -d ' ')
  echo "$code  $u  $title  (${chars} chars)"
done
```
Expect 200 for each, a page-specific title, and a body substantially larger
than an empty shell.

**Byline links resolve:** every guide's byline points at `/editorial-policy`.
Confirm it returns 200 **before** the guides are indexed, not after.

**Schema validation:** run each URL through the Google Rich Results Test and
`validator.schema.org`. Confirm the FAQ text in the markup matches the visible
FAQ exactly — a mismatch is a structured-data policy breach.

**Internal links from the misconceptions page** to both siblings must resolve
200. If it shipped last as instructed, they will.

## B3. Search Console
Request indexing for all four new URLs, in publication order. Resubmit the
sitemap.

---

# STAGE C — after publication

- **A4 canary re-run.** Search `flystar.co.in` again and record the result in
  `GEO_LOG.md` under the same date format. Pre-deploy, the site did **not**
  rank first for its own domain name. This is the single cheapest signal that
  the entity is strengthening — re-run monthly, not daily.
- **Manual AI checks.** `GEO_MANUAL_CHECKS.md` — the ⭐ subset (A1, A4, B1, C1,
  D1) in ChatGPT and Perplexity is a 15-minute pass and the only real measure
  of AI visibility. Everything captured so far is a retrieval proxy.
- **Quarterly refresh registration.** Add `/dgca/exam-misconceptions` to the top
  of the refresh list in `GEO_CAMPAIGN_STATE.md`. Its value is that its
  corrections are correct; it decays fastest.
- **Still open, unscheduled:** `geo/truth-hygiene` (needs the phone),
  `geo/homepage-accuracy` (needs the facts block), the entity decisions in
  `GEO_ENTITY_TODO.md`, and the admin-credential fix.

---

# Rollback

Every stage is a normal merge commit on `main`.
```bash
git revert -m 1 <merge-commit>    # undo a merged branch
git push
```
Vercel redeploys from `main`, so a revert plus push restores the previous state.
No database or external state is involved in any of this work.
