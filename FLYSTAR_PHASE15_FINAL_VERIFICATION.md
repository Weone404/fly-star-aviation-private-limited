# Phase 15 final verification

Date: 2026-11-19

## Verdict

**BLOCKED for deployment readiness.** The four reported responsive overflow
issues and two sampled ARIA/name review findings have been addressed; tests
and a local production-configured build pass. Many contrast cases remain
unverified. Phase 14 indexing, CTR and CPL offer questions also remain
unresolved. At the time of this assessment no deployment had been attempted.
The owner subsequently authorized a main-branch push despite the outstanding
accessibility verification; the outcome must be verified separately.

## Continuation: accessibility and deployment gate

The closed contact launcher previously referenced a dialog ID that did not
exist until the dialog opened. It now supplies `aria-controls` only when the
dialog is present. A regression test covers closed, open and Escape-closed
states. The offer dismiss control now uses an aria-hidden close icon with its
existing accessible label. Its dismissal still works.

In a browser check, the launcher opened the labelled dialog, Escape restored
focus to the launcher, and the offer could be dismissed. No actual enquiry was
submitted. Contact popup and submission tests passed with mocked services;
this is not evidence that a production lead was delivered.

Fresh results on the current candidate:

- Full tests: `npm test -- --maxWorkers=1` passed 32 files and 256 tests.
  ESLint passed with 0 errors and 9 warnings; both TypeScript checks passed.
- All eight course routes passed at 320, 375, 768, 1024, 1280 and 1440px:
  48 samples, including scroll-time document widths, breadcrumb names and
  canonicals.
- A production-configured scratch build completed, including prerender and
  verification of 54 admin-client bundles. The production API returned two
  posts; neither passed the existing approval gate. The eight sampled course
  pages had matching prerendered breadcrumb and canonical data.
- SHA-256 checks confirmed the scratch build did not alter the candidate's
  existing feed, sitemap, remote blog data, route metadata, schema or prior
  blog-gate report. These files may already differ from the base as recorded
  below; this continuation did not discard or overwrite those differences.
- Eighteen fresh axe scans of the homepage and eight course routes at 375px
  and 1440px reported no violations and no remaining ARIA-value or
  label-content-name incomplete findings. They returned **460 incomplete
  color-contrast node occurrences**: 350 gradients, 38 pseudo-elements,
  30 short-text cases, 18 partially obscured elements, 14 symbol-only cases,
  9 background overlaps and 1 partially obscuring element. These counts are
  occurrences across scans, not unique confirmed failures. They have not all
  been manually verified, so no complete accessibility pass is claimed.
- `vercel.json` parsed successfully. The candidate has no local Vercel
  project link or Vercel CLI available; production deployment access and
  configuration were not fully verified.

At the time of this verification, the user had prohibited deployment while
accessibility issues remained unresolved, so no commit, push or deployment
had been attempted. The owner later explicitly authorized a main-branch push
despite this gate. This report does not establish that a deployment succeeded.

## Continuation: responsive fixes and fresh verification

The earlier responsive findings below are retained as historical evidence and
are superseded by this continuation.

### Changes and before/after evidence

- Cabin crew: the long opportunities link was 407px wide and extended to
  x=439 at a 320px viewport. It can now wrap within its container; its sampled
  bounds are x=32 to x=288.
- Ground staff: the fee card and its non-wrapping link stretched the grid to
  439px at 320px and 375px. The cards can shrink and the link can wrap; its
  sampled bounds at 320px are x=65 to x=255.
- IndiGo interview: the batch cards and link reached 360px at 320px. Cards
  can shrink, the link can wrap, and the entry animation moves vertically
  instead of horizontally.
- Air India interview: long links, horizontal card animations and the
  non-wrapping CTA row caused overflow at 320px and 768px. Long links and
  rows now wrap, cards can shrink, and the card animation is vertical.

Only the four affected course components were changed in this continuation.
The existing breadcrumb, schema, launcher and other Phase 15 changes were
preserved. No business logic, lead handling, API integrations, SEO metadata,
blog content, sitemap or feed was edited.

### Fresh checks

| Check | Result and scope |
| --- | --- |
| Responsive browser checks | Headless Edge checked all eight previously tested course routes at 320, 375, 768, 1024, 1280 and 1440px: **48/48 passed**. Document and body widths were sampled on load and while scrolling the page; no sample exceeded its viewport. Visible breadcrumb names and canonicals also matched their JSON-LD trail in all 48 samples. |
| Controls | At 320px, the seven previously oversized links on the four affected pages stayed within the viewport, retained their contact destinations and did not exceed their own client width. Four representative links could receive focus and showed a focus-visible outline. |
| Tests | `npm test -- --maxWorkers=1`: **32 files, 256 tests passed**, with the default test timeout. |
| ESLint | `npm run lint`: passed with 0 errors and 9 existing fast-refresh warnings. |
| TypeScript | Both `npx tsc -p tsconfig.app.json --noEmit` and `npx tsc -p tsconfig.node.json --noEmit` passed. |
| Production-configured build | Passed in a fresh scratch snapshot under the candidate's ignored `node_modules`. The configured API returned two posts; both were held by the existing approval gate. Sitemap generation reported 85 URLs, feed generation 25 items, prerender completed and the admin client check passed across 54 bundles. This was not a deployment. |
| Generated files | SHA-256 checks before and after the scratch build confirmed the candidate's feed, sitemap, remote blog data and ignored prior blog-gate report were unchanged. |
| Structured data | Final build HTML for all eight course routes had parseable JSON-LD, matching visible breadcrumb names and canonicals, sequential positions and existing prerendered breadcrumb targets. This is not a site-wide schema certification. |
| Axe | axe-core 4.14.1 scanned the homepage and eight course routes at 375px and 1440px, after scrolling and waiting five seconds: **18 scans, no reported violations**. Every scan still returned incomplete results; these are not passes. |
| Git | `git diff --check` passed; Git reported existing line-ending warnings on the generated XML files. |

### Manual investigation of incomplete accessibility results

The 18 axe scans each flagged the same launcher and offer controls for review.
The closed launcher has `aria-controls="fsa-contact-dialog"` while that ID is
absent from the DOM. Opening it created the labelled dialog, moved focus to
its close button, and Escape closed it and returned focus to the launcher.
The absent closed-state target remains unresolved and should be reviewed
without changing lead handling. The offer close button visibly shows a
multiplication-sign icon and has the accessible label “Dismiss this offer”;
its axe label-content-name review also remains open.

Across the 18 scans, incomplete contrast checks included 341 gradient
occurrences, 48 short-text occurrences, 38 pseudo-element occurrences,
18 partially obscured elements, 14 non-text-symbol cases, 9 background
overlaps and 1 partially obscuring element. These are occurrences across
scans, not unique defects. Representative markup and messages were inspected:
examples included homepage text over a gradient, gradient-filled short text,
an aviation button with a pseudo-element, and text overlapped by another
element. The mobile homepage was also visually inspected. These checks do not
establish contrast compliance for every remaining node or interaction state;
manual contrast and assistive-technology review remains necessary.

## Fixes and evidence

- Course BreadcrumbList markup previously included `/courses`, which returned
  404. The schema builder now omits that intermediate path and numbers the
  remaining entries consecutively. Visible breadcrumbs were added to CPL,
  ATPL and the five other course pages, and the CPL fees trail was corrected.
  Final prerender checks for all eight course URLs found matching visible and
  JSON-LD names, sequential positions, matching canonicals and existing
  prerendered breadcrumb targets. No `/courses` parent is emitted in those
  trails.
- Desktop submenu toggles expose their state and support keyboard operation.
  On the CPL page, actual keyboard testing reached Courses submenu, opened it
  with Space, entered its first child with Tab, and closed it with Escape,
  returning focus to the toggle. Desktop pointer hover and layout at 1280px
  were also checked during the earlier Phase 15 verification.
- The delayed contact launcher used white text on green, measured by axe at
  1.98:1. It now uses dark text. Computed colors yield 7.83:1 normally and
  6.21:1 on hover. Its keyboard focus outline was also changed from yellow on
  white to dark blue on white, yielding 15.54:1 in the sampled state. Only
  launcher styles were changed; form and lead-handling logic were not changed.
- The horizontally scrollable CPL fees table is now a named, keyboard-focusable
  region. An axe `scrollable-region-focusable` violation seen at 375px was
  absent in the final scan.
- The IndiGo interview page's amber badge was measured at 2.96:1 and now uses
  the primary text color; the violation was absent in final sampled scans.
- Earlier Phase 15 changes darkened muted text, corrected affected homepage
  accent text, made inline keyword links persistently distinguishable and
  added a labelled scrollable CPL comparison region.

## Validation results

| Check | Result and scope |
| --- | --- |
| Full tests | `npm test -- --maxWorkers=1 --testTimeout=15000`: 32 files, 256 tests passed on final source. No assertions were changed to bypass a failure. A prior default-timeout run on final source had one `articleHtml.test.ts` timeout at 5 seconds; an earlier one-worker default-timeout run passed 256 tests before the final color-only changes. Other concurrent runs timed out and the first new component test run lacked an IntersectionObserver test stub, which was corrected. |
| ESLint | `npm run lint`: 0 errors, 9 fast-refresh warnings. |
| TypeScript | `npx tsc -p tsconfig.app.json --noEmit` and `npx tsc -p tsconfig.node.json --noEmit`: passed. |
| Production-configured build | Passed with the tracked production API configuration in a fresh scratch snapshot under the candidate's ignored `node_modules` directory. The API returned HTTP 200 and two posts; neither was approved by the existing quality gate, so none was merged. The sitemap generator reported 85 URLs, the feed generator 25 items, prerender completed and the admin client check passed across 54 bundles. This is a local build, not a deployed-production verification. |
| JSON-LD, canonicals and breadcrumb links | Final prerendered HTML for eight course URLs parsed successfully. Names, canonical URLs, positions and breadcrumb targets matched the visible trails. This is a targeted structural check, not Google Rich Results certification or a site-wide schema audit. |
| Browser responsiveness | Edge headless, nine routes at 320, 375, 768, 1024, 1280 and 1440px: 54 samples. All sampled course breadcrumb names and canonicals matched. Seven samples exhibited document overflow, listed below. |
| Axe | axe-core 4.14.1; homepage and eight course routes at 375 and 1440px, after scrolling and waiting five seconds: 18 scans, no reported violations. Each scan still had incomplete color-contrast and other checks requiring manual review; no site-wide WCAG conformance is claimed. |
| Keyboard | Courses submenu Space, Tab and Escape behavior verified in Edge; launcher focus style verified after delayed loading. The mobile fees table is focusable and named. |
| Git whitespace | `git diff --check` passed; Git emitted line-ending warnings for generated XML. |

### Accessibility comparison and limitations

The initial Phase 15 sampled axe run found 106 desktop and 104 mobile
homepage contrast nodes, 60 at each width on CPL, and 8 at each width on
ATPL. The final sampled scans reported no violations on those pages. Scan
timing and loaded states differed, so these counts are not a controlled
site-wide comparison. The delayed launcher failure and the mobile fees table
failure were independently reproduced before correction.

The final scans returned incomplete color-contrast nodes on every sampled
page, plus incomplete `aria-valid-attr-value` and
`label-content-name-mismatch` checks. Automated axe output does not establish
full accessibility, including all interaction states, contrast, screen-reader
behavior or keyboard paths.

### Remaining responsive findings

The browser samples showed overflow at:

- 320px: cabin crew, ground staff, IndiGo interview and Air India interview.
- 375px: cabin crew and ground staff.
- 768px: Air India interview.

Hiding the new breadcrumbs did not remove the observed overflow. The cabin
crew call-to-action and ground staff layout were among the overflowing
elements; animated interview-page elements also extended beyond the viewport.
These existing layout issues were not redesigned as part of this targeted
remediation and require further investigation and correction.

## Generated files and production data

The earlier isolated build regenerated `public/feed.xml` and
`public/sitemap.xml`. The feed has 11 changed lines versus the base, generated
from the candidate's static blog data; its bytes match the later build using
the production API. This establishes generation provenance, not independent
editorial verification of its contents. The sitemap's Git-normalized object
hash matches the base, and its bytes match the production-configured scratch
build; Git nevertheless reports it modified and warns about line endings.
Neither existing file was discarded.

The candidate's existing generated remote blog set and the fresh
production-configured scratch output both contain an empty approved remote
set; their generated comments and timestamps differ. The quality gate
rejected the two returned posts as not on the approval list. No published data
was fabricated or manually replaced. The build wrote its generated outputs
only in scratch, preserving the existing candidate files and ignored prior
blog-gate report.

## Changed files

The following paths are relative to this candidate worktree:

- `src/components/CitableAnswer.tsx`
- `src/components/CitableTable.tsx`
- `src/components/home/CTASection.tsx`
- `src/components/home/ServicesSection.tsx`
- `src/components/home/TestimonialsSection.tsx`
- `src/components/home/WhyChooseUsSection.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/layout/Header.tsx`
- `src/components/layout/KeywordLinkify.tsx`
- `src/components/ui/breadcrumb-nav.tsx`
- `src/components/ui/button.tsx`
- `src/index.css`
- `src/lib/schema.ts`
- `src/pages/Contactpopup.tsx`
- `src/pages/Courses/Air-india-pilot-interview.tsx`
- `src/pages/Courses/Atpl.tsx`
- `src/pages/Courses/Cpl.tsx`
- `src/pages/Courses/CplFees.tsx`
- `src/pages/Courses/Indigo-pilot-interview.tsx`
- `src/pages/Courses/airline-preparation.tsx`
- `src/pages/Courses/cabin-crew.tsx`
- `src/pages/Courses/ground-staff.tsx`
- `src/test/cplPageSchema.test.tsx`
- `src/test/internalNavigation.test.tsx`
- `public/feed.xml` and `public/sitemap.xml`: generated changes described above.
- `FLYSTAR_PHASE15_FINAL_VERIFICATION.md`: this new report.

## Git safety

- Candidate branch: `geo/phase15-technical-fixes`.
- Candidate HEAD and last verified `origin/main`:
  `5d04ed576af2b9673cd464faa9a3471f623dcf1b`.
- Original worktree: `geo/site-audit` at
  `9716d6d5878b9d46853fc1facab0594e59593597`; status counts remained 77
  tracked modifications and 87 untracked files. Counts alone do not prove
  byte-for-byte identity; no original-worktree edits were made by this work.
- Stash hashes remained `a696daadc58f9b93bc2cd2b86ffd50be0becab66` and
  `35807f198830971a43b01be6640e29869755b115`.
- At the time of the checks above, no commit, push, merge, PR or deployment
  had occurred. Phase 13 was not resumed.
