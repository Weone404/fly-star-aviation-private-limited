# REVIEW-MONTH-1.md — fact-check pack
Prepared 2026-09-04 for owner review before merge. Commit `8893f1d` + review fixes.

**Two defects were found by preparing this pack.** Both are fixed; see §7.

---

## 1. Every numeric figure, by post

Verify the DGCA links yourself. Two documents cover almost all of it:
**CAR 7-B-I** = CAR Section 7, Series 'B', Part I (Issue III, 24 Mar 2017, Rev 2, 13 Feb 2019) ·
**FAQ** = [DGCA Pariksha Flight Crew FAQ](https://pariksha.dgca.gov.in/Form/PLT_FAQs)

### `/blog/dgca-exam-fees`
| Figure | Claim | Source | Status |
|---|---|---|---|
| Rs 2,500 | Fee per paper, Flight Crew Licence online examination | FAQ Q13 | **Verify** |
| Non-refundable | Fee not refundable under any circumstances, incl. rejected form | FAQ Q14 | **Verify** |
| No OLODE fee | DGCA publishes no separate OLODE figure | FAQ — absence | **Verify the absence** |
| Rs 5,000 | Named as *unsourced*, not asserted | — | Deliberate |
| Rs 10,000 | 4 × Rs 2,500, our arithmetic | Derived | Safe |
| Rule 48, Aircraft Rules 1937 | Legal basis for the fee | CAR 7-B-I | Verify |

### `/blog/dgca-exam-subjects-by-licence`
| Figure | Claim | Source | Status |
|---|---|---|---|
| Class Ten | PPL qualification to appear | CAR 7-B-I | **Verify — this is a headline claim** |
| 10+2 with Physics & Maths | CPL qualification | CAR 7-B-I | **Verify** |
| 70% | Pass mark per paper, no aggregate | CAR 7-B-I | **Verify** |
| 70% oral | ATPL oral also requires 70% | CAR 7-B-I | Verify |
| 2.5 years | PPL paper validity | CAR 7-B-I | **Verify — headline claim** |
| 5 years | CPL/ATPL paper validity | CAR 7-B-I | **Verify** |
| 500 hrs / 200 PIC | Defence alternative to holding a CPL | CAR 7-B-I | Verify |
| Single-engine | ATPL not issued on single-engine aircraft | CAR 7-B-I | Verify |

### `/blog/atpl-eligibility-india`
Same CAR 7-B-I figures as above, plus:

| Figure | Claim | Source | Status |
|---|---|---|---|
| 1,500 hrs / 500 PIC | **Explicitly marked unverified on the page.** We say we have not read Schedule II and tell the reader to get it in writing | None | **Held — by design** |

### `/blog/dgca-olode-vs-regular-exams`
| Figure | Claim | Source | Status |
|---|---|---|---|
| Rs 2,500 | Fee per paper | FAQ Q13 | **Verify** |
| No OLODE fee published | Stated as absence | FAQ | **Verify** |
| 70% | Pass mark, identical on both routes | CAR 7-B-I | Verify |
| 5 yrs / 2.5 yrs | Validity unchanged by route | CAR 7-B-I | Verify |
| 75% | *Our advice*, not a rule — mock-test threshold | Ours | Clearly framed as advice |

### `/blog/dgca-exam-misconceptions`
| Figure | Claim | Source | Status |
|---|---|---|---|
| Class Ten (PPL) | Not 10+2 PCM | CAR 7-B-I | **Verify** |
| No maximum age | To register as Flight Crew | FAQ | **Verify** |
| 2.5 / 5 years | Validity split | CAR 7-B-I | Verify |
| Rs 2,500 | Per attempt, non-refundable | FAQ Q13, Q14 | Verify |
| 70% | Per paper, no aggregate | CAR 7-B-I | Verify |
| Attempt cap | **Stated as NOT published** — we decline to claim either way | — | Deliberate |

### `/blog/dgca-board-verification-certificate`
| Figure | Claim | Source | Status |
|---|---|---|---|
| Mandatory for NEW candidates | Before registration | FAQ | **Verify** |
| OLD candidates exempt | Allotted before the portal launched | FAQ | Verify |
| 24 hours | Registration email link validity | FAQ | Verify |
| AIU, 16 Kotla Marg, New Delhi 110022 | Equivalency authority + address | FAQ | Verify |
| PDF only / JPEG for photo | Document formats | FAQ | Verify |
| Board turnaround time | **Deliberately absent.** Differs by board; we refuse to publish one | — | Held |

### `/faq` and `/glossary`
**No new figures.** Both aggregate claims already sourced on the pages they link
to. The hub introduces nothing; the glossary's definitions restate sourced facts.

---

## 2. FAQPage schema — visible-text parity

| Surface | Schema source | Visible source | Mirrors? |
|---|---|---|---|
| 6 new blog posts | `post.faqs` via `faqNode()` | FAQ section in `post.content` | **Yes — verified verbatim, programmatically** |
| `/faq` | `FAQ_HUB_QUESTIONS` | `FAQ_SECTIONS` | **Yes — the schema array is derived from the rendered array** |
| `/glossary` | *No FAQPage emitted* | — | Correct: a definition list, not Q&A |
| `/dgca/computer-number` | `PAGE_FAQS` | Same array | Yes (pre-existing) |
| `/pilot-training/*` | `PILOT_TRAINING_TOPICS[t].faqs` | Same array | Yes (pre-existing) |

Verification run: for each of the six posts, every `faqs[].q` and `faqs[].a`
was asserted present verbatim in `content`. **0 orphans.**

---

## 3. Titles and meta descriptions

| Slug | Title | Len | Desc len |
|---|---|---|---|
| dgca-olode-vs-regular-exams | DGCA OLODE vs Regular Exams: What Actually Differs | 50 | 149 |
| dgca-exam-misconceptions | DGCA Exam Myths: What the Rules Actually Say | 44 | 154 |
| dgca-board-verification-certificate | DGCA Board Verification Certificate: Who Needs One | 50 | 155 |
| dgca-exam-fees | DGCA Exam Fees: Rs 2,500 Per Paper, Non-Refundable | 50 | 151 |
| dgca-exam-subjects-by-licence | DGCA Exam Subjects: PPL vs CPL vs ATPL | 38 | 155 |
| atpl-eligibility-india | ATPL Eligibility in India: Requirements Explained | 49 | 153 |
| /faq | DGCA & Pilot Training FAQ \| Flying Star Aviator | 47 | 158 |
| /glossary | Indian Pilot Training Glossary \| Flying Star Aviator | 52 | 143 |

All titles ≤60, primary keyword front-loaded. All descriptions ≤155 except
`/faq` at 158 — 3 over, in a page title suffix, judged not worth degrading the
sentence.

**Pre-existing, not fixed:** `/blog/air-hostess-salary-in-india-2026` has an
83-character title and **0 FAQs**. Same page as the salary-table debt in §6.

---

## 4. Phone numbers — the internal questions

| Number | Appears on | Question for the team |
|---|---|---|
| **+91 7428897780** and **+91 7428897782** | `/become-a-pilot/airline-transport-pilot-licence` only | Two numbers, one page, nowhere else on the site. Are these real lines, an old vendor's, or copied from another site? |
| **wa.me/919355611996** | `/blogs`, `/blog/<slug>` WhatsApp buttons | The floating WhatsApp button site-wide uses `919953536199`. Is 9355611996 a real second WhatsApp line, or stale? |
| +91 9555291956 / +91 9717977702 | Both interview pages | We One Aviation's numbers — intended under co-branding. No action unless you disagree. |

None changed. All three need a person, not a grep.

---

## 5. Frozen surfaces — verified untouched

| Surface | Result |
|---|---|
| `Organization` schema in `index.html` | **Untouched.** The only `index.html` change is one line: the RSS `<link rel="alternate">` after `</script>` |
| `llms.txt` entity block (H1, summary, NAP) | **Untouched.** Diff shows no change to the name, address, phone or summary lines |
| `llms.txt` Company section | Untouched |

Changes to `llms.txt` are confined to the article list, a new Reference section,
and the Key facts block — including the fee correction.

---

## 6. Diff beyond content and the placeholder fix

41 files. Categorised so nothing hides in the total:

**New content (10):** `faqHub.ts`, `glossary.ts`, `faq.tsx`, `glossary.tsx`, and the 6 posts inside `blogData.js`

**Plumbing, generated (4):** `sitemap.xml`, `feed.xml`, `generate-feed.mjs`, `package.json` (prebuild + 2 scripts)

**Plumbing, wiring (6):** `App.tsx` (+4 lines: 2 lazy imports, 2 routes) · `routeMeta.ts` (+10: /faq, /glossary) · `pageMeta.ts` (+10) · `schema.ts` (+4: FAQ hub + 2 breadcrumb labels) · `vercel.json` (+8: faq, glossary, feed.xml routes; BVC redirect retargeted) · `robots.txt` (+3: feed comment)

**W1 backend (3):** `enquiryGuard.js` (new) · `notifyEnquiry.js` (new) · `server.js` (+31: 2 requires, limiter, honeypot check, rate check, notify call)

**W2 analytics (3):** `analytics.ts` (new) · `main.tsx` (+7: import + `initAnalytics()`) · `index.html` (+1: RSS link)

**Forms (2):** `Contact.tsx`, `Contactpopup.tsx` — honeypot field + state, `company` added to the POST body

**Placeholder fix (7):** one line each in `Cpl.tsx`, `Atpl.tsx`, `airline-preparation.tsx`, `ground-staff.tsx`, `Indigo-pilot-interview.tsx`, `become-pilot.tsx`, `PilotTraining.tsx`

**Tests (4):** `analytics.test.ts`, `enquiryGuard.test.ts` (new) · `renderGate.test.ts` (+21), `vercelConfig.test.ts` (+12)

**Docs (5):** `CHANGELOG.md`, `CONTENT-CALENDAR.md`, `IDENTITY-SHEET.md`, `docs/ANALYTICS.md`, `DEPLOYMENT.md` (+22)

**Corrections (2):** `blogData.js` fee lines across 3 existing posts · `SEO.md` (1 line, the facts table)

Nothing outside those categories.

---

## 7. Two defects this review pass found

**1. Orphan FAQ schema — serious, now fixed.**
All six new posts carried `FAQPage` schema built from their `faqs` array, but the
FAQ text was **not rendered on the page**. The existing convention embeds the FAQ
visibly inside `content` HTML and mirrors it in `faqs`; the new posts had only the
array. That is schema asserting answers a reader cannot see — a structured-data
violation, and against our own documented rule.

Fixed by generating the visible FAQ HTML **from each post's own `faqs` array**, so
the two are one source. Verified verbatim afterwards: 0 orphans. Post word counts
rose to 744–938 as a result.

**2. Four meta descriptions over 155 characters** (160–169). Shortened; all six
now ≤155.

Both were caught because the review pack asked for evidence rather than
assurances. Worth noting for how future batches are checked.

---

## 8. Known debt, not fixed
`/blog/air-hostess-salary-in-india-2026` — airline-by-airline salary tables with
no source, an 83-character title, and no FAQ section. Pre-dates the editorial
policy. Under the numbers policy it should be sourced or rewritten to stop
depending on the figures. **Recommend scheduling it in the month-1 tail:** it is
exactly the kind of page an AI Overview quotes, and being quoted on unsourced
salary figures is the worst version of this campaign working.
