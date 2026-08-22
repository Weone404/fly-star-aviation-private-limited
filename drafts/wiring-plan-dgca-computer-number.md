# Wiring plan — `/dgca/computer-number`
**Draft:** `drafts/dgca-computer-number.md` · **No code changes yet.**
**Gates:** byline recorded · `geo/tech-p0` merged. Branch: `geo/article-computer-number`.

> **This one is special: the slug already exists as a 404 that the site links
> to.** `src/components/layout/Header.tsx` has a "DGCA Computer Number" nav
> item pointing here, so the link is broken on **every page of the site**.
> Wiring this page fixes a site-wide dead link, not just adds a page.
> It was pruned from `sitemap.xml` in `geo/tech-p0`, so it must be **re-added**.

## 1. Component
`src/pages/dgca/computer-number.tsx` — model on `src/pages/dgca/full-form.tsx`.
Content is procedural: use tables for the photo/signature specs and the
NEW-vs-OLD comparison, and a numbered list for the 8 application steps.

## 2. Route — `src/App.tsx`
```tsx
const ComputerNumber = lazy(() => import("./pages/dgca/computer-number"));
<Route path="/dgca/computer-number" element={<ComputerNumber />} />
```
⚠️ Must precede the `/dgca/:topic` catch-all, which currently renders the
generic DGCA page for this path in dev.

## 3. `src/lib/routeMeta.ts` — **THE RENDER GATE**
```ts
"/dgca/computer-number": {
  title: "DGCA Computer Number: Eligibility, Documents, Steps",
  description: "DGCA Computer Number explained: 10+2 with Physics and Maths, no age limit, lifetime validity, one per candidate, and the hard copy you must post to CEO.",
  canonical: `${BASE_URL}/dgca/computer-number`,
},
```
Title 52 chars, description 154.

## 4. `src/lib/pageMeta.ts`
An entry **already exists** for this path (it was added before the route ever
worked). Check it and align it with the routeMeta title above rather than
adding a duplicate key.

## 5. Schema — `src/lib/schema.ts`
- `LABELS` already contains `"computer-number": "Computer Number"` — no change.
- Add the `FAQPage` node from the meta package (11 questions, all values
  DGCA-sourced, no `[CONFIRM]` in the structured data).
- Add an `Article` node with dates and author.

## 6. `public/sitemap.xml` — **RE-ADD**
```xml
<url><loc>https://www.flystar.co.in/dgca/computer-number</loc><lastmod>YYYY-MM-DD</lastmod></url>
```

## 7. `public/llms.txt` — **RE-ADD** under "## DGCA guides"
```
- [DGCA Computer Number](https://www.flystar.co.in/dgca/computer-number): Eligibility, documents, application steps and what DGCA actually requires.
```
This line was removed in `geo/tech-p0` because it pointed at a 404. Manifest
honesty: it returns in the same changeset that makes the page real.

## 8. Internal links
**Out:** `/dgca/ground-classes` · `/dgca/medical` · `/dgca/full-form` ·
`/dgca/olode-exam` (only once that article ships).
**In:** `/dgca` hub · `/dgca/ground-classes` · `/courses/cpl`.
**Already inbound:** the header nav link, which starts working on deploy.

## 9. Verify before commit
As per the OLODE plan, plus: confirm the header nav link now resolves 200, and
that `npm run check:routes` passes with the re-added sitemap and llms.txt lines.
