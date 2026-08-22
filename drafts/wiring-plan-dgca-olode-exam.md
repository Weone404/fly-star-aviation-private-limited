# Wiring plan — `/dgca/olode-exam`
**Draft:** `drafts/dgca-olode-vs-regular-exams.md` · **No code changes yet.**
**Gates:** byline recorded · `geo/tech-p0` merged. Branch: `geo/article-olode`.

## 1. Component
`src/pages/dgca/olode-exam.tsx` — model on `src/pages/dgca/full-form.tsx`
(620 lines, the reference long-form guide). Same layout components, heading
rhythm and Tailwind classes so it is visually indistinguishable.

## 2. Route — `src/App.tsx`
```tsx
const OlodeExam = lazy(() => import("./pages/dgca/olode-exam"));
// inside the DGCA block, BEFORE the "/dgca/:topic" catch-all:
<Route path="/dgca/olode-exam" element={<OlodeExam />} />
```
⚠️ Order matters: `/dgca/:topic` already exists and would swallow this path.

## 3. `src/lib/routeMeta.ts` — **THE RENDER GATE**
Insert alphabetically inside the `/dgca` group:
```ts
"/dgca/olode-exam": {
  title: "DGCA OLODE Exam: On-Demand vs Regular Sessions",
  description: "DGCA OLODE lets you pick your exam date; regular sessions are fixed. Fees, centres, seat rules and which to choose. Regular papers cost Rs 2,500 each.",
  canonical: `${BASE_URL}/dgca/olode-exam`,
},
```
Title 45 chars, description 151. **Without this entry the page 404s.**

## 4. `src/lib/pageMeta.ts`
```ts
"/dgca/olode-exam": {
  title: "DGCA OLODE Exam | Flying Star Aviator",
  description: "On-demand versus regular DGCA Flight Crew examinations: fees, centres and seat allocation.",
},
```

## 5. Schema — `src/lib/schema.ts`
- Add to `LABELS`: `"olode-exam": "OLODE Exam"` (breadcrumb).
- Add the `FAQPage` node from `drafts/dgca-olode-vs-regular-exams.meta.md`
  (7 questions). Text must match the rendered FAQ **exactly**.
- Add an `Article` node with `datePublished`, `dateModified`, `author`.
- The fee question is deliberately excluded until the OLODE figure is verified.

## 6. `public/sitemap.xml`
```xml
<url><loc>https://www.flystar.co.in/dgca/olode-exam</loc><lastmod>YYYY-MM-DD</lastmod></url>
```

## 7. `public/llms.txt` — under "## DGCA guides"
```
- [DGCA OLODE Exam](https://www.flystar.co.in/dgca/olode-exam): On-demand versus regular DGCA Flight Crew examinations — fees, centres and seat allocation.
```

## 8. Internal links
**Out (in the article):** `/dgca/ground-classes` "DGCA CPL and ATPL ground
classes" · `/dgca/full-form` "what DGCA is and what it regulates" ·
`/dgca/medical` "Class 1 and Class 2 medical requirements" · `/rtr` "the RTR(A)
licence".
**In (edit these pages):** `/dgca` hub · `/dgca/ground-classes` ·
`/courses/cpl`.
**Hold:** do not link `/dgca/computer-number` until that article ships — it is
currently a 404.

## 9. Verify before commit
`npm run check:routes` (must pass) · `npm run lint` · `npm run build` with
`PRERENDER_EXECUTABLE_PATH` · confirm `dist/dgca/olode-exam/index.html` exists
with real body text · validate the JSON-LD in Google Rich Results Test.
