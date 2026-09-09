# Blog topics published — Fly Star Aviation

The duplicate-topic ledger. **Every scheduled run reads this file first** and must
not pick a topic that overlaps a row below. Overlap means the same *search
intent*, not merely the same words: "CPL fees in India" and "how much does
commercial pilot training cost" are one topic, not two.

Append one row per published post. Never edit or remove an existing row.

## Reserved — do not write as blog posts

These queries belong to page articles already drafted and awaiting wiring
(`drafts/`). A blog post on any of them would cannibalise its own page.

| Reserved query | Owned by |
|---|---|
| DGCA computer number — process, documents, eligibility | `drafts/dgca-computer-number.md` → `/dgca/computer-number` |
| DGCA OLODE vs regular exam sessions | `drafts/dgca-olode-vs-regular-exams.md` → `/dgca/olode` |
| DGCA exam misconceptions, "does DGCA require PCM" | `drafts/dgca-exam-misconceptions.md` |

Once a reserved page ships, strike its row and the query returns to the pool.

## Published

| Date | URL | Title | Category |
|---|---|---|---|
| 2026-08-25 | `/blog/air-hostess-salary-in-india-2026` | Air Hostess Salary in India 2026: Complete Pay Scale Guide | Career |
| 2026-09-01 | `/blog/dgca-ground-classes-vs-self-study` | DGCA Ground Classes vs Self-Study: Which Route Actually Clears the Exams? | DGCA |
| 2026-09-02 | `/blog/how-to-choose-a-flying-school-in-india` | How to Choose a Flying School in India: What to Verify Before You Pay | Training |
| 2026-09-03 | `/blog/how-to-choose-dgca-ground-classes` | How to Choose DGCA Ground Classes: 12 Questions to Ask Before You Pay | DGCA |
| 2026-09-04 | `/blog/dgca-olode-vs-regular-exams` | DGCA OLODE vs Regular Sessions: How On-Demand Flight Crew Exams Work | DGCA |
| 2026-09-04 | `/blog/dgca-exam-misconceptions` | Common Misconceptions About DGCA Exams: What the Rules Actually Say | DGCA |
| 2026-09-04 | `/blog/dgca-board-verification-certificate` | DGCA Board Verification Certificate: What It Is and Who Needs One | DGCA |
| 2026-09-04 | `/blog/dgca-exam-fees` | DGCA Exam Fees: What a Paper Actually Costs, and What Is Not Published | DGCA |
| 2026-09-04 | `/blog/dgca-exam-subjects-by-licence` | DGCA Theory Subjects by Licence: PPL, CPL and ATPL Compared | DGCA |
| 2026-09-04 | `/blog/atpl-eligibility-india` | ATPL Eligibility in India: Why It Is Not a First Licence | Licences & Eligibility |
| 2026-09-05 | `/blog/cpl-eligibility-after-12th` | CPL Eligibility After 12th: What DGCA Actually Requires | Licences & Eligibility |
| 2026-09-05 | `/blog/dgca-exam-attempts-and-validity` | DGCA Exam Validity and Attempts: What Is Published, and What Is Not | DGCA |
| 2026-09-05 | `/blog/foreign-licence-conversion-checklist` | Converting a Foreign Pilot Licence: The Document and Currency Checklist | Licences & Eligibility |
| 2026-09-09 | `/blog/dgca-exam-pass-rate` | DGCA Exam Pass Rate: What the Data Actually Shows | DGCA |

_Rows for 2026-09-04 and 2026-09-05 above (`dgca-olode-vs-regular-exams` through `foreign-licence-conversion-checklist`) were backfilled on 2026-09-09: this session found them already live in `src/lib/blogData.js` and `public/sitemap.xml` but missing from this ledger. The Reserved rows for OLODE and exam misconceptions below were stale as a result — both have already shipped as blog posts, not page articles, so those two Reserved rows are struck through._

## Reserved — do not write as blog posts (updated)

~~DGCA OLODE vs regular exam sessions~~ — shipped as `/blog/dgca-olode-vs-regular-exams`, back in the pool for a page article if still wanted.
~~DGCA exam misconceptions, "does DGCA require PCM"~~ — shipped as `/blog/dgca-exam-misconceptions`, back in the pool for a page article if still wanted.
