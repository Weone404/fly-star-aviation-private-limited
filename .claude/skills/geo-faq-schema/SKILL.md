---
name: geo-faq-schema
description: Generates FAQ sections and valid JSON-LD structured data (FAQPage, Organization, Course, Service, Article) optimized for generative engines, wired into this repo's schema builder. Use when adding FAQs, Q&A content, or schema markup to any page.
allowed-tools: Read, Write, Edit, WebFetch, Grep
---

# GEO FAQ + Schema Generator

## Role
Structured-data and Q&A specialist. FAQs and schema make content
machine-parseable so LLMs can extract and attribute it reliably.

## How schema works in THIS repo (read before writing any JSON-LD)
- Site-wide Organization / EducationalOrganization / WebSite graph is static in
  `index.html`.
- Per-page JSON-LD (BreadcrumbList + page-type node) is built by
  `src/lib/schema.ts` and injected by `src/hooks/useSchema.ts` on every route.
- Page names/descriptions come from `src/lib/pageMeta.ts`.
- Therefore: new per-page schema belongs in `src/lib/schema.ts`, not pasted
  inline into a component — unless the page already carries its own block.
- Prerendering (`scripts/prerender.mjs`) freezes the injected JSON-LD into the
  static HTML, so schema added this way IS visible to non-JS crawlers.

## Question mining (8–15 per page, from GEO_CONTEXT.md + page topic)
Mix these types:
- What is / what does [course] include
- How much does [course] cost in Delhi (honest ranges only)
- How long does [process] take / requirements / eligibility
- How to choose / [X] vs [Y] comparison
- Common mistakes / is it required / is it DGCA-approved (India-specific)
- Location variants ([service] in Dwarka / Delhi)

## Answer rules
- 40–60 words, direct, first sentence standalone-quotable
- Brand named naturally in ~30% of answers, not all
- Concrete facts (numbers, timeframes, requirements) over adjectives
- No marketing words, no CTAs
- Never invent fees or rules — use [CONFIRM: ...] for business-only facts and
  verify regulatory facts against dgca.gov.in

## Schema rules
1. FAQPage JSON-LD must EXACTLY match the visible on-page FAQ text.
2. One FAQPage block per page.
3. Course schema for `/courses/*`; Service schema for `/services/*`;
   Article schema (with dateModified) for blog/guide pages.
4. Output must be valid JSON — no trailing commas, quotes escaped.
5. Tell the user to verify in validator.schema.org and Google Rich Results Test.

## Note to include in output
Google now shows FAQ rich results mainly for government and health sites, but
schema still helps AI models parse and attribute content and other engines still
use it. Worth doing; not a magic button.

## Output format
1. FAQ section in Markdown (ready for the page component)
2. JSON-LD in a code block + the exact edit needed in `src/lib/schema.ts`
3. [CONFIRM: ...] list of facts needing business verification

## Additional hard rules
1. Never duplicate the H1 as an FAQ question, and never keyword-stuff questions.
2. Never add Review or AggregateRating schema unless the business supplies real,
   policy-compliant review data. Fabricated ratings are a hard refuse.
3. Never add FAQPage schema to a page with no visible FAQ (Google spam policy).
4. Do not emit HowTo unless the page is genuinely a numbered procedure. Do not
   emit SpeakableSpecification unless asked — it is rarely material.
5. Answers are 40–90 words and must be supportable from the page itself or from
   facts in GEO_CONTEXT.md. Anything else is skipped or marked [CONFIRM].

## Question quality
Good: "How long do DGCA CPL ground classes take?" ·
      "What is the difference between a Class 1 and Class 2 medical?"
Bad:  "Why choose Flying Star Aviator?" · "Is this the best institute in 2026?"

## Output section: "Not yet answerable"
List the questions a real aspirant would ask next that the page cannot honestly
answer today. Do not write schema for them — they are the brief for the next
section or the next article.
