# Wiring plan — `/dgca/exam-misconceptions`
**Draft:** `drafts/dgca-exam-misconceptions.md` · **No code changes yet.**
**Gates:** byline recorded · `geo/tech-p0` merged. Branch: `geo/article-misconceptions`.

> Wire this one **last** of the three. It cross-links to both siblings, so
> shipping it first would create two internal links to 404s.

## 1. Component
`src/pages/dgca/exam-misconceptions.tsx` — model on `src/pages/dgca/full-form.tsx`.
Structure note: the "Quick reference" myth/fact table belongs high on the page,
directly under the intro. It is the most quotable element and should not sit
below the fold.

## 2. Route — `src/App.tsx`
```tsx
const ExamMisconceptions = lazy(() => import("./pages/dgca/exam-misconceptions"));
<Route path="/dgca/exam-misconceptions" element={<ExamMisconceptions />} />
```
Before the `/dgca/:topic` catch-all.

## 3. `src/lib/routeMeta.ts` — **THE RENDER GATE**
```ts
"/dgca/exam-misconceptions": {
  title: "DGCA Exam Misconceptions: What the Rules Actually Say",
  description: "DGCA does not require Chemistry, sets no maximum age, and issues one lifetime Computer Number. Seven common beliefs checked against DGCA's own text.",
  canonical: `${BASE_URL}/dgca/exam-misconceptions`,
},
```
Title 56 chars, description 152.

## 4. `src/lib/pageMeta.ts`
```ts
"/dgca/exam-misconceptions": {
  title: "DGCA Exam Misconceptions | Flying Star Aviator",
  description: "Seven widely held beliefs about DGCA Flight Crew exams, checked against DGCA's published requirements.",
},
```

## 5. Schema — `src/lib/schema.ts`
- Add to `LABELS`: `"exam-misconceptions": "Common Misconceptions"`.
- Add the `FAQPage` node (10 questions) from the meta package.
- Add an `Article` node with dates and author.

## 6. `public/sitemap.xml`
```xml
<url><loc>https://www.flystar.co.in/dgca/exam-misconceptions</loc><lastmod>YYYY-MM-DD</lastmod></url>
```

## 7. `public/llms.txt` — under "## DGCA guides"
```
- [Common DGCA Exam Misconceptions](https://www.flystar.co.in/dgca/exam-misconceptions): Seven widely held beliefs checked against DGCA's published requirements.
```

## 8. Internal links
**Out:** `/dgca/computer-number` "how the Computer Number is applied for" ·
`/dgca/olode-exam` "on-demand and regular exam formats" ·
`/dgca/ground-classes` · `/dgca/medical`.
**In:** `/dgca` hub · `/dgca/ground-classes` · `/become-a-pilot/become-pilot`.

## 9. Verify before commit
As per the other two, plus: confirm both sibling links resolve 200 (they must
already be live), and that the "Still unsettled" section renders as prose and
is **not** in the FAQ schema.

## 10. Refresh registration
On publish, add this page to the top of the quarterly fact-refresh list in
`GEO_CAMPAIGN_STATE.md`. Its value is that its corrections are correct; it
degrades faster than any other page on the site.
