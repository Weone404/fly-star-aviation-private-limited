# Hand-off package — `dgca-computer-number`

## 1. Meta

- **Slug:** `/dgca/computer-number` — **revives a URL that currently 404s** and
  was pruned from sitemap.xml in `geo/tech-p0`. Re-add to sitemap and llms.txt
  in the same changeset that wires the page (manifest-honesty rule).
- **Meta title (52 chars):** `DGCA Computer Number: Eligibility, Documents, Steps`
- **Meta description (154 chars):** `DGCA Computer Number explained: 10+2 with Physics and Maths, no age limit, lifetime validity, one per candidate, and the hard copy you must post to CEO.`

## 2. JSON-LD

Per `.claude/skills/geo-faq-schema/SKILL.md`, this belongs in
`src/lib/schema.ts`, not inline. All questions and answers below match the
visible FAQ **exactly**. Every figure here is DGCA's own published text — no
`[CONFIRM]` value appears in the structured data, per the standing rule.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is a DGCA Computer Number?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It is the unique identity allotted to a Flight Crew candidate by the Central Examination Organization, Office of the DGCA, after the candidate's application is approved. It is required to apply for any DGCA pilot examination."
      }
    },
    {
      "@type": "Question",
      "name": "How long is a Computer Number valid?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Its validity is lifetime."
      }
    },
    {
      "@type": "Question",
      "name": "Can I have more than one Computer Number?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. A candidate is authorised to hold only one, and it applies to all Flight Crew examination categories."
      }
    },
    {
      "@type": "Question",
      "name": "What qualification do I need?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Except for the PPL category, applicants must have passed 10+2 with Physics and Mathematics from a recognised board or university, or an equivalent."
      }
    },
    {
      "@type": "Question",
      "name": "Is there a maximum age to register?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. DGCA states there is no maximum age limit to register as a Flight Crew candidate."
      }
    },
    {
      "@type": "Question",
      "name": "Is the Computer Number generated automatically after I submit?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. It is allotted only after DGCA scrutinises the online application against the hard copy posted by the candidate."
      }
    },
    {
      "@type": "Question",
      "name": "What is a Board Verification Certificate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A certificate from the relevant board certifying that your 10th, 10+2, 10+2-equivalent or Diploma mark sheet is authentic. It is mandatory for all NEW candidates."
      }
    },
    {
      "@type": "Question",
      "name": "Can I upload documents as JPEG?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Documents must be PDF. Only the photograph and signature are JPEG/JPG."
      }
    },
    {
      "@type": "Question",
      "name": "Can I add a missing document after Final Submission?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No. Nothing can be uploaded after Final Submit."
      }
    },
    {
      "@type": "Question",
      "name": "How long is the registration email link valid?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "24 hours. If it is not activated in that window, you must register again."
      }
    },
    {
      "@type": "Question",
      "name": "What will my login ID be after allotment?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Your allotted Computer Number with the prefix \"P-\"."
      }
    }
  ]
}
```

## 3. [CONFIRM] list

| # | Item | Why open | How to close |
|---|---|---|---|
| 1 | **Author byline + credentials** | CLAUDE.md rule 5. GEO_CONTEXT fact 3 unanswered. **Blocks every draft.** | Owner supplies name + credentials |
| 2 | **Processing time** | Secondary sources say 7–14 working days. DGCA's FAQ states **no timeline at all**. The article therefore states none. | Portal user manual, or observed timelines |
| 3 | **Is there a fee for the Computer Number itself?** | DGCA's FAQ states a fee only for examinations (₹2,500/paper). It does not mention a Computer Number fee. Secondary sources say "free" — the article claims neither. | Portal application flow |
| 4 | **Auto-generation** | A press report describes DGCA rolling out auto Computer Number generation for flight crew. DGCA's own FAQ 46 says the number is **not** auto-generated. Either the FAQ lags a rollout, or the report overstates it. **The article follows the FAQ.** Re-check before publishing. | pariksha.dgca.gov.in notices / user manual |
| 5 | Publication and updated dates | Set at publish | — |

**Item 4 is the one to watch.** It is exactly the failure mode the quarterly
fact-refresh rule exists for: our differentiator is accuracy, so a stale
primary source is more damaging here than on an ordinary page.

## 4. Internal linking plan

**Out of this article:**

| Target | Anchor text |
|---|---|
| `/dgca/ground-classes` | DGCA CPL and ATPL ground classes |
| `/dgca/medical` | Class 1 and Class 2 medical requirements |
| `/dgca/full-form` | what DGCA is and what it regulates |
| `/dgca/olode-exam` | on-demand and regular exam formats (once topic #1 ships) |

**Into this article:** `/dgca` (hub), `/dgca/ground-classes`, `/courses/cpl`.
The header nav already links to `/dgca/computer-number` — that link has been
pointing at a 404 site-wide, and wiring this page fixes it.

## 5. Why this draft was cheap and accurate

It required **zero web searches**. Every fact came from the banked
`drafts/research/dgca-pariksha-faq-2026-08-22.md`, which was fetched while
researching topic #1. This is the research-bank-first rule paying off on its
first application: one primary source, two articles, and a level of procedural
detail (photo dimensions in millimetres, 70 KB and 20 KB size caps, the 24-hour
link expiry, the "OTHERS" dropdown fallback, the "P-" login prefix) that
secondary-source competitors do not carry.

## 6. Hand-off

Ready for `geo-site-editor` — **after** the byline lands and `geo/tech-p0`
merges. Wiring needs: component in `src/pages/dgca/`, route in `App.tsx`,
`routeMeta.ts` entry (**render gate**), `pageMeta.ts`, schema node,
**re-add to sitemap.xml and llms.txt**, inbound links from 2–3 pages.
