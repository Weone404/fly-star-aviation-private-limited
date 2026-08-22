# Wiring plan — `/editorial-policy`
**Draft:** `drafts/editorial-policy.md`
**⚠️ WIRES FIRST — before all three articles.** Every article byline links here;
shipping an article first would put a byline link to a 404 on a live page.

**Gates:** `geo/tech-p0` merged · canonical email + phone (facts block item 3)
· MCA legal-name confirmation for the closing line.
**Branch:** `geo/editorial-policy` (or the first commit of `geo/article-batch`).

## 1. Component
`src/pages/editorial-policy.tsx`. This is a plain prose page, not a guide —
model it on the simplest existing content page rather than
`dgca/full-form.tsx`. No hero, no stat tiles, no CTA blocks. The page's
credibility comes from looking like a policy document.

## 2. Route — `src/App.tsx`
```tsx
const EditorialPolicy = lazy(() => import("./pages/editorial-policy"));
<Route path="/editorial-policy" element={<EditorialPolicy />} />
```
Top-level path, no catch-all conflict.

## 3. `src/lib/routeMeta.ts` — **THE RENDER GATE**
```ts
"/editorial-policy": {
  title: "Editorial Policy | Flying Star Aviator",
  description: "How our DGCA guides are researched and verified: primary sources first, unverified figures never stated as fact, quarterly re-checks, and corrections welcomed.",
  canonical: `${BASE_URL}/editorial-policy`,
},
```
Title 44 chars, description 155.

## 4. `src/lib/pageMeta.ts`
```ts
"/editorial-policy": {
  title: "Editorial Policy | Flying Star Aviator",
  description: "How our DGCA guides are researched, verified and corrected.",
},
```

## 5. Schema — `src/lib/schema.ts`
- Add to `LABELS`: `"editorial-policy": "Editorial Policy"`.
- Page type: **`WebPage`**, not `Article` — it is a policy document, not a
  guide. Do not add `FAQPage`; there is no visible FAQ.
- `publisher` should reference the existing Organization node (`#organization`).

## 6. `public/sitemap.xml`
```xml
<url><loc>https://www.flystar.co.in/editorial-policy</loc><lastmod>YYYY-MM-DD</lastmod></url>
```

## 7. `public/llms.txt` — under "## Company"
```
- [Editorial Policy](https://www.flystar.co.in/editorial-policy): How our DGCA guides are researched, sourced, dated and corrected.
```
Worth listing: it tells an AI crawler explicitly what our sourcing standard is.

## 8. Internal links
**In — this is the important direction.** The byline line at the top of every
guide links here:
`**Written by:** [Flying Star Aviator Academics Team](/editorial-policy)`
Already present in all three article drafts.

Also link from the footer, alongside `/privacy` and `/terms` when those ship.

**Out:** `/contact` for corrections, once the canonical contact details are
confirmed.

## 9. Before commit — the honesty check
This page is unique in that its correctness is not factual but procedural.
Before committing, re-read each claim and confirm the campaign actually does it:

| Claim on the page | Where it is actually enforced |
|---|---|
| Primary sources first | `geo-article-writer` skill — research-bank-first rule |
| Research file with URL + retrieval date | `drafts/research/` — see `SOURCE-INDEX.md` |
| Unverified numbers never stated as fact | `[CONFIRM]` discipline, CLAUDE.md rule 4 |
| Unverified figures never in structured data | `geo-article-writer` standing rule |
| Open questions not presented as corrections | myth/fact eligibility gate; "Still unsettled" sections |
| No naming competitors | corrections-play rule; verified zero matches in all 3 drafts |
| As-of anchoring | applied throughout the three drafts |
| Quarterly re-check | `GEO_CAMPAIGN_STATE.md` — quarterly fact-refresh sweep |
| Corrections contact | **needs the canonical email and phone** |

If any row cannot be answered, that sentence comes off the page.

## 10. Verify before commit
`npm run check:routes` · `npm run lint` · `npm run build` with
`PRERENDER_EXECUTABLE_PATH` · confirm `dist/editorial-policy/index.html` renders
· confirm the byline link in each article resolves 200 **before** those articles
go live.

## Publication order (binding)
1. `/editorial-policy` ← this page
2. `/dgca/computer-number` (also ends a site-wide nav 404)
3. `/dgca/olode-exam`
4. `/dgca/exam-misconceptions` (links to both siblings — must be last)
