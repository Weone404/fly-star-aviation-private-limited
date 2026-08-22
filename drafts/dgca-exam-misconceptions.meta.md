# Hand-off package — `dgca-exam-misconceptions`

## 1. Meta
- **Slug:** `/dgca/exam-misconceptions`
- **Meta title (56 chars):** `DGCA Exam Misconceptions: What the Rules Actually Say`
- **Meta description (152 chars):** `DGCA does not require Chemistry, sets no maximum age, and issues one lifetime Computer Number. Seven common beliefs checked against DGCA's own text.`

## 2. Eligibility gate — what was included and what was held back

**Included as myth/fact pairs (7).** Each verified against DGCA's published
Flight Crew FAQ, banked at `drafts/research/dgca-pariksha-faq-2026-08-22.md`:
PCM vs Physics+Maths · no maximum age · lifetime validity · one number per
candidate · online submission is not the whole process · passport not required
for Indian candidates · fee never refundable.

**Held back into "Still unsettled" (3).** Per the standing rule, an open
question is not a correction:
- **Computer Number auto-generation** — press coverage vs FAQ 46. Genuinely
  unresolved. Presented with as-of framing and an instruction to check the
  portal, never as a settled correction.
- **Regular examination session months** — circulating schedules disagree; the
  official calendar is the only authority.
- **The OLODE fee** — DGCA states ₹2,500 for the online examination and gives
  no separate on-demand figure.

**As-of anchoring** is applied throughout: "As of August 2026, DGCA's own
published FAQ states…". A dated claim survives a later rollout — it stays true
as stated — and it is what the quarterly refresh sweep keys on.

**No competitor is named anywhere.** Beliefs are described as widely held, and
the correction carries the authority. Verified: zero matches for competitor
names or "other sites"-style phrasing.

## 3. JSON-LD

Belongs in `src/lib/schema.ts`, not inline. All 10 questions and answers match
the visible FAQ exactly. No `[CONFIRM]` value appears in the structured data.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "Does DGCA require Chemistry at 10+2?", "acceptedAnswer": { "@type": "Answer", "text": "No. Except for the PPL category, DGCA states the requirement as 10+2 with Physics and Mathematics from a recognised board or university, or its equivalent." } },
    { "@type": "Question", "name": "Is there a maximum age to register for DGCA exams?", "acceptedAnswer": { "@type": "Answer", "text": "No. DGCA states there is no maximum age limit to register as a Flight Crew candidate. Age limits that exist in cadet programmes and airline recruitment are set by the airline, not by DGCA." } },
    { "@type": "Question", "name": "Does the DGCA Computer Number expire?", "acceptedAnswer": { "@type": "Answer", "text": "No. Its validity is lifetime, and one number covers every Flight Crew examination category." } },
    { "@type": "Question", "name": "Can I hold two Computer Numbers?", "acceptedAnswer": { "@type": "Answer", "text": "No. A candidate is authorised to hold only one." } },
    { "@type": "Question", "name": "Is the online application the whole process?", "acceptedAnswer": { "@type": "Answer", "text": "Not for NEW candidates. The application is allotted only after DGCA scrutinises the online submission against a hard copy sent by Speed Post or Registered Post to the Central Examination Organization in New Delhi." } },
    { "@type": "Question", "name": "Do I need a passport to register as an Indian candidate?", "acceptedAnswer": { "@type": "Answer", "text": "No. A passport is mandatory for foreign candidates, and for candidates from Nepal and Bhutan, but not for Indian candidates." } },
    { "@type": "Question", "name": "Will I get my examination fee back if my form is rejected?", "acceptedAnswer": { "@type": "Answer", "text": "No. DGCA states the fee paid once is not refundable under any circumstances." } },
    { "@type": "Question", "name": "What format do documents have to be in?", "acceptedAnswer": { "@type": "Answer", "text": "Documents must be PDF. The photograph and signature must be JPEG or JPG." } },
    { "@type": "Question", "name": "Can I upload a document I forgot, after submitting?", "acceptedAnswer": { "@type": "Answer", "text": "No. Nothing can be uploaded after Final Submission." } },
    { "@type": "Question", "name": "What if my school board is not in the dropdown list?", "acceptedAnswer": { "@type": "Answer", "text": "DGCA advises selecting \"OTHERS\" and proceeding with registration." } }
  ]
}
```

## 4. [CONFIRM] list
| # | Item | How to close |
|---|---|---|
| 1 | **Author byline + credentials** — blocks publication | Owner supplies name + credentials |
| 2 | Retrieval date for the source citation | Set at publish; re-fetch the FAQ that day |
| 3 | Publication / updated dates | Set at publish |

Note there are **no unverified facts in the body** — the eligibility gate moved
all three open questions into "Still unsettled", where they are framed as open.

## 5. Internal linking plan
The trio cross-links naturally:

| Target | Anchor text |
|---|---|
| `/dgca/computer-number` | how the Computer Number is applied for |
| `/dgca/olode-exam` | on-demand and regular exam formats |
| `/dgca/ground-classes` | DGCA CPL and ATPL ground classes |
| `/dgca/medical` | Class 1 and Class 2 medical requirements |

Inbound: `/dgca` (hub), `/dgca/ground-classes`, `/become-a-pilot/become-pilot`.

## 6. Refresh priority — HIGHEST in the calendar
Per the quarterly sweep rule, this page ranks first for re-verification. Its
entire value is that its corrections are right; a stale correction here inverts
the advantage and damages the credibility the other two articles borrow from
it. Re-fetch the FAQ, diff against the banked copy, and bump `dateModified`
on any change.

## 7. Hand-off
Ready for `geo-site-editor` after the byline lands and `geo/tech-p0` merges.
This completes the checkpoint trio: **procedure** (Computer Number),
**comparison** (OLODE vs Regular), **corrections hub** (this page) — one
working specimen of each archetype the calendar reuses.
