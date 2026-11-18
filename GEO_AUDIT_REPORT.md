# Phase 10 Technical SEO Audit

**Site:** https://www.flystar.co.in
**Audit date:** 2026-11-18
**Scope:** Technical SEO, metadata, structured data, internal navigation, prerendering, and production-accessible evidence.

## Summary

The local production build and full prerender passed. All 85 sitemap URLs produced static pages with unique titles, descriptions, matching canonicals, one H1, no heading-level skips, and parseable JSON-LD. Confirmed metadata, navigation, heading, and schema issues were corrected. No Search Console, GA4, or field Core Web Vitals data was available, so this audit makes no claim about indexing growth, rankings, traffic, or conversions.

## Confirmed findings and changes

| Priority | Finding | Action and evidence |
|---|---|---|
| P1 | The Courses header linked to `/Courses/cpl`, which redirected to the lowercase canonical URL. | Updated the link in `src/components/layout/Header.tsx`; added a test asserting `/courses/cpl`. |
| P1 | The active metadata source had inaccurate or overly long titles and descriptions on important training, DGCA, location, and guide pages. The unused `src/lib/pageMeta.ts` duplicated/conflicted with that source. | Refined metadata in `src/lib/routeMeta.ts` and blog summaries in `src/lib/blogData.js`; removed the unused duplicate. Generated-output audit confirmed 85 unique titles and descriptions, titles <=60 characters, descriptions <=155 characters, and 85 canonicals matching their routes. |
| P1 | Course schema was emitted for every `/courses/*` URL, including the CPL fees guide. | `src/lib/schema.ts` now uses an explicit course-detail route set. Tests confirm `/courses/cpl` retains Course schema while `/courses/cpl/fees` does not. |
| P1 | The site-wide graph contained two organization entities for the same business and a SearchAction for a search endpoint not implemented by the site. | Consolidated the business entity in `index.html`, linked it to the existing Place, removed the duplicate node and unsupported SearchAction. The static graph and all per-page JSON-LD parsed successfully. |
| P2 | Heading skips were observed in footer headings and card/testimonial sections. | Adjusted semantic heading levels in `Footer.tsx`, `TestimonialsSection.tsx`, `ground-classes.tsx`, and `airline-transport-pilot-licence.tsx` without changing visible text. The generated-page audit found one H1 per route and no heading-level skips. |
| P2 | The production and local `llms.txt` contents differed. | Recorded for reconciliation; the live file listed 68 URLs, all of which returned 2xx without redirects. No `llms.txt` edit was included. |

## Verification evidence

- **Live crawl before publication:** `/robots.txt` and `/sitemap.xml` returned HTTP 200. All 85 URLs in the live sitemap returned HTTP 200 without redirects. The live robots file allowed the checked search and AI crawlers. All 68 URLs listed by the live `llms.txt` returned 2xx.
- **Local production build:** `npm run build` exited 0 with Edge supplied through `PRERENDER_EXECUTABLE_PATH`; the normal blog-fetch, sitemap/feed generation, Vite build, prerender, and admin-client verification all ran. The sitemap generator reported 85 URLs, prerender rendered all 85, and the admin-client check passed across 54 JavaScript bundles.
- **Rendered HTML audit:** 85/85 sitemap pages existed in `dist`; no duplicate sitemap URLs, missing/duplicate/overlong title or description, missing or mismatched canonical, H1 count issue, heading skip, or invalid JSON-LD was found. There were 170 valid JSON-LD blocks across the 85 pages.
- **Tests:** `npm test` passed 31 files and 240 tests.
- **Lint:** `npm run lint` exited 0 with no errors and nine existing `react-refresh/only-export-components` warnings in shared UI/editorial components.
- **Dependency note:** `npm ci` reported 12 dependency vulnerabilities (6 moderate, 6 high). Dependency remediation was not part of this SEO change.

## Remaining risks and limitations

### P1 - access and verification

- Google Search Console was not accessible. The previously supplied figures of 61 indexed and 29,878 non-indexed URLs, indexing categories, manual actions, sitemap processing, and affected URL samples were not independently verified in this run.
- GA4 was not accessible. Organic sessions/users, landing pages, engagement, form enquiries, phone clicks, and WhatsApp clicks are therefore unreported.
- Field Core Web Vitals were unavailable. No LCP, INP, or CLS field result is claimed.
- Production deployment and post-push verification were pending at report creation. Local results do not prove that the changes are live.

### P2 - owner or content review

- A public Justdial result showed address `110075` and phone `09054557842`, differing from the site's `110077` and `+91 99535 36199`. This third-party listing needs owner verification; no off-site listing was changed.
- The `/dgca` and `/dgca/computer-number` pages cover related computer-number intent. Their distinct content and search intent need review before any consolidation or redirect; none was created.
- Existing pages contain regulatory, eligibility, fee, duration, salary, approval, and pass-rate claims that need primary-source and owner verification. They were not rewritten or treated as newly verified.
- The live image crawl observed 334 images: 0 missing `alt`, 16 empty `alt`, 125 lazy-loaded, 209 eager-loaded, 277 with explicit dimensions, and 0 `srcset`. Empty `alt` usage needs visual review; eager loading and responsive image delivery require page-level review before changing behavior.
- The production JS entry bundle was 828.49 kB (209.27 kB gzip); main CSS was 134.25 kB (21.87 kB gzip). These are build artifact sizes, not real-user performance measurements. No broad JavaScript or image-loading changes were made without field data.
- The live `/services/charter-services` page was previously observed to have very little substantive content. Any expansion should follow the separate B2B content track and use owner-confirmed service facts.

### P3 - expected or unmeasured

- No ranking, traffic, indexing, enquiry, or AI-citation improvement can be inferred from technical validation alone.
- The site does not have a verified organic baseline in this audit. Record Search Console and GA4 baselines before measuring future change.

## Recommended next actions

1. Connect Search Console and export page-indexing categories plus query/page performance for the affected URLs. Reconcile the prior 61/29,878 figures before making indexability changes.
2. Obtain GA4 access and verify that the existing conversion events fire; record an organic landing-page and enquiry baseline.
3. Verify the business address and phone against the owner-controlled source of truth, then request corrections to any inconsistent third-party listing.
4. Reconcile local and live `llms.txt`; keep only currently valid, canonical routes.
5. Have an aviation subject-matter reviewer verify regulatory and business claims, then prioritize content improvements using actual query/page data.
6. Review image alt text and responsive delivery visually; use field performance data before changing eager/lazy behavior or code splitting.
7. After publication, verify the production commit and affected routes, then monitor Search Console for crawl, canonical, indexing, and query changes. Do not promise indexing or ranking outcomes.
