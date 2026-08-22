# Hand-off package — `dgca-olode-vs-regular-exams`

## 1. Meta

- **Slug:** `/dgca/olode-exam`
- **Meta title (54 chars):** `DGCA OLODE Exam: On-Demand vs Regular Sessions`
- **Meta description (151 chars):** `DGCA OLODE lets you pick your exam date; regular sessions are fixed. Fees, centres, seat rules and which to choose. Regular papers cost Rs 2,500 each.`

Both fit the repo's limits (title ≤60, description ≤155) and carry a number,
which is what gets quoted.

## 2. JSON-LD

Per `.claude/skills/geo-faq-schema/SKILL.md`, per-page schema belongs in
`src/lib/schema.ts`, not pasted inline. The FAQ text below matches the visible
FAQ in the article **exactly** — if the article's FAQ wording changes, this must
change with it, or it breaches Google's structured-data policy.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is an OLODE pass worth the same as a regular session pass?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. Both are Flight Crew Licence examinations conducted by DGCA's Central Examination Organization under Rule 41A of the Aircraft Rules, 1937. The format affects when you sit the paper, not what the pass is worth."
      }
    },
    {
      "@type": "Question",
      "name": "Can I get a refund if my exam form is rejected?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. DGCA states the fee paid once is not refundable under any circumstances. Verify your eligibility and documents before paying."
      }
    },
    {
      "@type": "Question",
      "name": "Where are OLODE exams conducted?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "At designated centres in New Delhi, Mumbai, Chennai, Kolkata and Bengaluru."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need a Computer Number before booking OLODE?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. The Computer Number is a unique lifetime identifier allotted by the CEO after your application is approved, and it is required for every DGCA Flight Crew examination."
      }
    },
    {
      "@type": "Question",
      "name": "Can I hold more than one Computer Number?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. DGCA authorises only one Computer Number per candidate."
      }
    },
    {
      "@type": "Question",
      "name": "How early should I reach the exam centre?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "At least 15 minutes before your scheduled time. Entry closes 30 minutes before the examination starts."
      }
    },
    {
      "@type": "Question",
      "name": "Does OLODE improve my chances of passing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. It changes only your exam date. Preparation determines the outcome, and the fee is non-refundable whichever format you choose."
      }
    }
  ]
}
```

The fee FAQ is **deliberately excluded** from the schema because its answer
still carries a `[CONFIRM]`. Add it once the OLODE fee is verified.

An `Article` node with `datePublished` / `dateModified` / `author` is also
needed — blocked on the byline (fact 3).

## 3. [CONFIRM] list — nothing publishes until these clear

| # | Item | Why it is open | How to close it |
|---|---|---|---|
| 1 | **Author byline + credentials** | CLAUDE.md rule 5 requires a real named author on every guide. GEO_CONTEXT fact 3 is unanswered. | Owner supplies name + verifiable credentials |
| 2 | **OLODE fee (reported ₹5,000/paper)** | Multiple secondary sources agree, but DGCA's own Pariksha FAQ states only ₹2,500 for "Flight Crew Licence online examination" and gives no OLODE-specific figure. | Check the OLODE application flow on pariksha.dgca.gov.in, or the current user manual |
| 3 | **Regular session months** | Two secondary sources conflict — Jan/Apr/Jul/Oct vs Mar/Jun/Sep/Dec. The article deliberately states no months. | Read the official examination calendar PDF on pariksha.dgca.gov.in |
| 4 | **Publication / updated dates** | Set at publish time | — |

### Verified facts used (safe to cite)
All from **pariksha.dgca.gov.in/Form/PLT_FAQs**, fetched 2026-08-22, saved at
`drafts/research/dgca-pariksha-faq-2026-08-22.md`:
Rule 41A of Aircraft Rules 1937 · ₹2,500 per paper · fee never refundable ·
CEO at East Block III, R.K. Puram, New Delhi 110066 · one Computer Number per
candidate, valid for life · 10+2 with **Physics and Mathematics** · no maximum
age limit.

Centres, the 15-minute reporting rule and the 30-minute entry cutoff come from
DGCA notices reported by secondary aviation press — solid, but re-verify at
publish time.

## 4. Internal linking plan

**Links out of this article** (all verified live and prerendered):

| Target | Anchor text |
|---|---|
| `/dgca/ground-classes` | DGCA CPL and ATPL ground classes |
| `/dgca/full-form` | what DGCA is and what it regulates |
| `/dgca/medical` | Class 1 and Class 2 medical requirements |
| `/rtr` | the RTR(A) licence |

**Links into this article** — add from 2–3 related pages when wiring:
`/dgca` (hub), `/dgca/ground-classes`, `/courses/cpl`.

> Do **not** link to `/dgca/computer-number` yet. It is currently a 404 and was
> pruned from the sitemap in `geo/tech-p0`. Once top-10 topic #3 ships and that
> route is wired, add the link — the two articles are natural partners.

## 5. Why this topic was chosen first

Ranked #1 of the top 10 in `GEO_KEYWORD_RESEARCH.md`: the only genuinely
under-owned topic found in W3. Competitors cover DGCA exams heavily but treat
OLODE as a footnote. It is pure procedure, so it carries no claims risk, needs
no business facts beyond the byline, and it let this session pull primary-source
facts from DGCA that correct errors on competitor pages — the kind of
verifiable specificity answer engines quote.

## 6. Hand-off

Ready for `geo-site-editor` to template and commit — **after** the byline lands
and `geo/tech-p0` merges. Wiring requires: component in `src/pages/dgca/`,
route in `App.tsx`, entry in `routeMeta.ts` (**the render gate**), `pageMeta.ts`,
schema node, `sitemap.xml`, `llms.txt`, and inbound links from 2–3 pages.
