# FLYSTAR PHASE 26 — LEGACY URL REDIRECT REMEDIATION REPORT

**Date:** 2026-11-25

**Verdict:** READY FOR PRODUCTION REVIEW
**Production status at validation time:** Not deployed; live source URLs returned 404.

This is a pre-release verification snapshot. It records checks completed before a later, separately authorized push; post-push deployment and live status are not covered here.

## 1. Objective and baseline

Remediate the 11 confirmed legacy URL failures with exact, permanent HTTP 301 redirects to relevant existing canonical pages.

- **Baseline:** `origin/main` at `760410e6260b4c4b9351847340bf5d46cf6f11da`
- **Branch:** `geo/phase26-legacy-redirects`
- **Isolated worktree:** `D:\fly-star-aviation-private-limited-phase26-redirects`
- **Worktree HEAD:** `760410e6260b4c4b9351847340bf5d46cf6f11da`
- **At report generation:** No commit, push, merge, or deployment had occurred; changes were uncommitted and local.

`origin/main` was fetched and confirmed unchanged at the stated baseline before creating the worktree.

## 2. Live URL checks and candidate mappings

Each source was requested from production without following redirects, both before implementation and again after the local changes. All 11 returned **404 with no `Location` header**. No production change had been made when those checks were performed.

Each unique destination was requested directly from production without following redirects. All 10 returned **200 with no `Location` header**. The destination paths also resolve to matching canonical route metadata in the candidate.

| Legacy path | Production source status (before / latest) | Candidate response | Destination live result |
|---|---:|---|---:|
| `/air-hostess-salary-india` | 404 / 404, no `Location` | 301 → `https://www.flystar.co.in/blog/air-hostess-salary-in-india-2026` | 200, no redirect |
| `/airline-cadet-pilot-programme` | 404 / 404, no `Location` | 301 → `https://www.flystar.co.in/cadet-pilot-programme` | 200, no redirect |
| `/airline-cadet-pilot-programme-fees` | 404 / 404, no `Location` | 301 → `https://www.flystar.co.in/cadet-pilot-programme` | 200, no redirect |
| `/aviation-courses-india` | 404 / 404, no `Location` | 301 → `https://www.flystar.co.in/pilot-training` | 200, no redirect |
| `/commercial-pilot-course` | 404 / 404, no `Location` | 301 → `https://www.flystar.co.in/courses/cpl` | 200, no redirect |
| `/dgca-class-1-class-2-medical` | 404 / 404, no `Location` | 301 → `https://www.flystar.co.in/dgca/medical` | 200, no redirect |
| `/dgca-exam-syllabus` | 404 / 404, no `Location` | 301 → `https://www.flystar.co.in/blog/dgca-exam-subjects-by-licence` | 200, no redirect |
| `/indigo-pilot-salary` | 404 / 404, no `Location` | 301 → `https://www.flystar.co.in/pilot-salary-india` | 200, no redirect |
| `/pilot-course-fees-india` | 404 / 404, no `Location` | 301 → `https://www.flystar.co.in/courses/cpl/fees` | 200, no redirect |
| `/pilot-duty-time-fdtl-india` | 404 / 404, no `Location` | 301 → `https://www.flystar.co.in/glossary` | 200, no redirect |
| `/top-pilot-training-institutes-india` | 404 / 404, no `Location` | 301 → `https://www.flystar.co.in/dgca/fto-ranking` | 200, no redirect |

No URL is redirected to the homepage. The cadet-fees destination discusses how to verify programme fees; it does not invent or promise a fee amount.

The candidate uses Vercel's top-level `redirects` configuration with `statusCode: 301` and absolute HTTPS/www destinations. The exact-path rules precede host-wide normalization rules. This makes the intended response a single redirect directly to the canonical host and avoids an apex/HTTP-to-www hop followed by a path redirect. The rules do not match on or replace query parameters. [Vercel's configuration reference](https://vercel.com/docs/project-configuration/vercel-json#redirects) documents query-string pass-through for configuration redirects.

The local regression tests verify the configured 301 and direct destination; they are not an HTTP test of Vercel's edge runtime. No Vercel CLI/runtime is installed in this environment. Therefore, a production `Location` header, live query-string pass-through, and actual edge redirect-chain count remain **unverified until deployment**.

Five existing production paths were also checked directly and returned 200 without redirects: `/`, `/contact`, `/courses/cpl`, `/dgca/ground-classes`, and `/pilot-salary-india`. The regression test ensures these working paths are not added as exact redirect sources.

## 3. Implementation

Changed only:

1. [`vercel.json`](./vercel.json) — added 11 exact top-level redirects with `statusCode: 301`; destinations are absolute HTTPS/www canonical URLs.
2. [`src/lib/routes.ts`](./src/lib/routes.ts) — added the matching legacy-to-canonical aliases used by route metadata normalization and sitemap exclusion.
3. [`src/test/vercelConfig.test.ts`](./src/test/vercelConfig.test.ts) — added regression coverage for all 11 exact sources, 301 status, destination, ordering ahead of host normalization, route metadata, absence of redirect chains, and representative working paths.
4. This report.

No sitemap, feed, blog data, page metadata, or unrelated source files were changed.

## 4. Validation results

- **Focused redirect tests:** `src/test/vercelConfig.test.ts` — 13 passed.
- **Full tests:** 34 test files, 266 tests passed with `--maxWorkers=2 --testTimeout=20000`.
- **TypeScript:** `npx tsc --noEmit` passed.
- **ESLint:** `npm run lint` exited successfully; 0 errors and 9 Fast Refresh warnings in unrelated component files.
- **Production build:** Vite production build passed.
- **Prerender:** completed with local Chrome using `PRERENDER_EXECUTABLE_PATH`; no prerender error.
- **Post-build verification:** `scripts/verify-admin-client.mjs` passed across 54 JavaScript bundles.
- **Diff hygiene:** `git diff --check` passed.
- **Generated-file protection:** npm prebuild data-generation hooks were deliberately skipped; the production build, prerender and post-build verification were run separately. No sitemap/feed/blog source files were modified.

## 5. Diff summary

The tracked source diff is **143 insertions and 2 deletions across 3 files**:

```text
src/lib/routes.ts             | 11 +++++++
src/test/vercelConfig.test.ts | 79 +++++++++++++++++++++++++++++++++++++++++--
vercel.json                   | 55 +++++++++++++++++++++++++++++++
```

The report is an additional untracked deliverable. Nothing was staged or committed.

## 6. Worktree and safety status

- The primary checkout at `D:\fly-star-aviation-private-limited` remained on `geo/phase17-seo-performance-growth`; its 256 pre-existing status entries were unchanged.
- The existing Phase 20 worktree at `D:\fly-star-aviation-private-limited-phase20-redirects` was not edited; its 3 existing changes remained unchanged.
- All implementation work and dependency installation were confined to the new Phase 26 worktree.
- `node_modules` and build output are isolated to the Phase 26 worktree.
- At report generation, no commit, push, merge, or deployment had been performed. A later push was separately authorized; its result and any resulting deployment are outside this report's validation snapshot.

## 7. Deployment readiness

**READY FOR PRODUCTION REVIEW** as of this pre-release assessment. The focused and full tests, type check, lint, production bundle, and prerender checks passed. The candidate contained only the requested redirect fix, alias-map alignment, tests, and this report.

This verdict is not a claim that production has been fixed. At the time of the pre-release checks, all 11 sources returned 404. After deployment, verify each source returns one HTTP 301 with its intended `Location`, preserves a representative query string, and reaches the live 200 destination without a chain. Do not mark the remediation live until those checks pass.
