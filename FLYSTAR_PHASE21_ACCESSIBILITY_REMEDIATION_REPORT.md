# FLYSTAR Phase 21 Accessibility Remediation Report

**Review date:** 25 November 2026<br>
**Candidate branch:** `geo/phase21-accessibility-remediation`<br>
**Baseline:** `origin/main` at `d5c2c4d160bca8e857dfb4f8a3f12593343221a1`<br>
**Readiness decision:** WCAG 2.2 AA conformance is **not established**.

## Executive summary

This pass addressed two confirmed contrast failures in the isolated candidate:

1. The unresolved CPL slideshow caption was measured on all five desktop slides. Slide 4 failed WCAG 2.2 SC 1.4.3 at **4.29:1** for normal-size white text. A small change to the top stop of its dark gradient raised the lowest measured slide ratio to **4.99:1**.
2. The clean `origin/main` baseline did not contain Phase 19's previously verified dark-theme share-label fix. That fix was reapplied with its existing light/dark theme regression coverage.

The Phase 18 axe export was not recreated and its 44 scans were not repeated. The remaining grouped contexts were not exhaustively audited. At the time this candidate report was prepared, no production verification, commit, push, merge, or deployment had occurred.

## Prior evidence and baseline

### Phase 18 and 19

The Phase 18 report records 11 routes, 44 scans at 375px and 1440px under normal and reduced-motion preferences, zero final automated contrast violations, and 821 axe `color-contrast` incomplete occurrences. Incomplete findings are unresolved, not passes or failures.

The Phase 19 report clarifies the grouping:

| Evidence grouping | Count |
|---|---:|
| Incomplete occurrences | 821 |
| Selector-only groups | 150 |
| Route-selector pairs | 225 |
| Visual contexts grouped by route, selector, foreground, background layers, and axe reason | 237 |
| Representative patterns previously reviewed | 6 |
| Other visual contexts not individually verified | 231 |

Phase 19 sampled four patterns as passes, fixed one confirmed dark share-label failure, and left the CPL image caption unresolved because earlier measurements were inconsistent. This pass used that report and the original Phase 18 export; it did not rescan all routes.

The Phase 18 reason groups remain useful workload context: 635 gradient, 90 short-text, 32 partially obscured, 30 pseudo-element, 28 non-text/special-character, and 6 partially overlapping occurrences. They are not classifications of confirmed defects.

### Earlier local Phase 21 work

`PHASE21_ACCESSIBILITY_REMEDIATION_REPORT.md` documents broader local changes and zero axe violations across 22 route/viewport checks on the dirty original checkout. Those changes are not present in the selected `origin/main` baseline and were not treated as evidence for this isolated candidate. They were not copied wholesale.

## Investigation and corrections

### CPL slideshow caption

The caption is white, 14px, weight 600, and therefore uses the normal-text threshold of **4.5:1**. The slideshow frame is 540×405 CSS pixels at the 1440×1000 viewport; its bottom caption overlay is 76px high.

Measurement method: in the local browser, each source image was mapped to the displayed frame using its `object-fit: cover` crop, then composited with the CSS gradient. A glyph mask was generated from the browser-computed caption font, and WCAG relative luminance was calculated for the resulting background pixels under the glyph mask. The carousel timer was extended only in the browser test harness to stabilize each slide; no timer or runtime behavior was changed.

| Slide asset | Before | After | Criterion | Result |
|---|---:|---:|---|---|
| `slider1.webp` | 5.74:1 | 6.71:1 | 4.5:1, normal text | Pass in sampled state |
| `silder2.webp` | 5.58:1 | 6.52:1 | 4.5:1, normal text | Pass in sampled state |
| `slider3.webp` | 5.34:1 | 6.03:1 | 4.5:1, normal text | Pass in sampled state |
| `slider4.webp` | **4.29:1** | **4.99:1** | 4.5:1, normal text | Confirmed failure; fixed |
| `slider5.webp` | 9.95:1 | 11.09:1 | 4.5:1, normal text | Pass in sampled state |

The failure was caused by the caption text sitting near the transparent top of the original black gradient over a light image. The smallest practical correction preserves the existing 65%-black bottom stop and adds a 15%-black top stop. Browser verification confirmed the resulting gradient and post-change ratios on all five slides.

At 375px, the slideshow is `display: none`; its caption is not rendered visibly at that viewport. This is a layout observation, not a mobile contrast pass.

### Dark-theme share label

The Phase 19 report measured the previous muted-green label at **1.40:1** and **2.02:1** on sampled dark-gradient endpoints. Phase 19's white-at-80% treatment measured approximately **5.38:1–7.73:1** and was checked across three placements. The selected `origin/main` baseline still used `text-muted-foreground`, so the Phase 19 treatment was reapplied: dark theme uses `text-primary-foreground/80`, while light theme retains `text-muted-foreground`.

These are the Phase 19 measurements; this pass did not repeat that browser sampling. The added focused test checks both theme class choices.

## Other state checks and remaining evidence gaps

- **Reduced motion:** at 1440px, the browser reported `prefers-reduced-motion: reduce` and a computed image transition duration of `1e-05s`. The test harness paused autoplay to measure individual slides. The current source starts a 4.5-second interval without a reduced-motion guard, which conflicts with the earlier Phase 18 report's slider observation. Autoplay under reduced motion remains unverified here and was not changed because this pass is scoped to contrast.
- **Keyboard:** keyboard navigation reached the “Next slide” button; the browser reported its user-agent `outline: auto`. Focus-indicator contrast was not measured.
- **Other interactive states:** arrow/dot contrast and hover-state contrast were not established in this pass.
- **Remaining manual work:** the 231 visual contexts not individually checked in Phase 19 remain unverified. This pass did not manually reassess other hero/CTA gradients, cards, navigation/footer text, forms/errors, pseudo-elements, or obscured content. Prior sampled passes do not establish whole-page compliance.
- No new axe scans were run. No production browser check was performed.

## Files changed

- `src/pages/Courses/Cpl.tsx` — strengthened the caption gradient's top stop.
- `src/components/SocialShareButtons.tsx` — restored the previously verified dark-theme label color while preserving the light theme.
- `src/test/CplCaptionContrast.test.tsx` — regression check for caption text and the dark gradient stop.
- `src/test/socialShareButtons.test.tsx` — dark- and light-theme label regression tests.
- `FLYSTAR_PHASE21_ACCESSIBILITY_REMEDIATION_REPORT.md` — this report.

No sitemap, feed, blog data, route metadata, schema, Vercel configuration, analytics, lead form, or backend files were modified.

## Validation

| Check | Result |
|---|---|
| Focused contrast tests | 2 files, 3 tests passed |
| Full Vitest, default parallel run | 9 unrelated 5-second timeouts in `articleHtml.test.ts` and `fetchBlogsConfig.test.ts` while other checks ran concurrently |
| Full Vitest, bounded retry | `npm test -- --maxWorkers=2 --testTimeout=20000` — **34 files, 265 tests passed** |
| TypeScript | `npx tsc --noEmit` — passed |
| ESLint | `npm run lint` — 0 errors, 9 Fast Refresh warnings in unrelated files |
| Production bundle | Direct `npx vite build --outDir ... --emptyOutDir` — passed; temporary output removed |
| Whitespace | `git diff --check` — passed |

The package lifecycle `prebuild` and `postbuild` were deliberately bypassed to avoid regenerating blog data, sitemap, feed, or prerendered output.

### Protected-file integrity

SHA-256 values captured before and after the source/test changes matched:

| Protected file | SHA-256 |
|---|---|
| `public/sitemap.xml` | `BA92C3F94D9D6ADE30275FD8EAB716108D210179DC7DE6F8D83290444A56BCD6` |
| `public/feed.xml` | `47D5C66F227841B3D0819E59958461AED38DD49AB1499CB2B1A566A42CF33807` |
| `src/lib/blogData.js` | `1E99A0EFF8C5E7D6234519F058AC0D378A60762B0D30BB724B13C25925CC8052` |
| `src/lib/routeMeta.ts` | `F9316C807CB26F132E844D1D551DD848FE12F6EF10FFD6A41ADAA3F034534C5A` |
| `src/lib/schema.ts` | `6B5F465B684872CAB3555F1256671EFE6FFF15A9B740A392A6CE9EDBA234D968` |
| `vercel.json` | `1889EA16D608DD1619C5E1C0E1DF306DACFA2BFDCD08790F184153A01F2ED066` |

## Git, worktrees, and deployment

- Phase 21 uses a new isolated worktree because the Phase 20 candidate contains uncommitted redirect-only changes and does not include the local accessibility fixes. The new branch was created from verified `origin/main`.
- New worktree: `D:\fly-star-aviation-private-limited-phase21-contrast`
- Branch: `geo/phase21-accessibility-remediation`
- `HEAD` and local `origin/main`: `d5c2c4d160bca8e857dfb4f8a3f12593343221a1`
- Final candidate changes: two modified tracked source files and two untracked regression tests, plus this untracked report. No files are staged.
- The original checkout remains on `geo/phase17-seo-performance-growth` at `1bd16f3562ef2abc73728c312646b10bf1ba696d`, with its pre-existing 108 tracked modifications, 147 untracked files, and two stashes. It was not edited.
- The Phase 20 worktree remains on `geo/phase20-redirect-remediation` at `d5c2c4d`, with its pre-existing two modified tracked files and one untracked report. It was not edited.
- At the time this candidate report was prepared, nothing had been committed, pushed, merged, or deployed. Production behavior remained unverified.

## Final decision

Two confirmed failure classes are corrected in this local candidate. The CPL caption is verified across its five desktop slide images, and the known Phase 19 share-label correction is present again. The wider incomplete-node workload, other interactive contrast states, and production behavior remain unresolved. **Do not claim WCAG 2.2 AA compliance.**
