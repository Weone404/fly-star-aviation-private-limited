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
| 2026-12-10 | `/blogs/2` | DGCA Written Exams: Subjects, Pattern & Preparation Tips | DGCA |
| 2026-12-15 | `/blogs/1` | How to Become a Commercial Pilot in India – Complete 2026 Guide | CPL Guide |
| 2026-09-02 | `/blog/how-to-choose-a-flying-school-in-india` | How to Choose a Flying School in India: What to Verify Before You Pay | Training |
| 2026-09-03 | `/blog/how-to-choose-dgca-ground-classes` | How to Choose DGCA Ground Classes: 12 Questions to Ask Before You Pay | DGCA |

> Posts `_id` 3–6 in `src/lib/blogData.js` are placeholders with empty content.
> They are **not** published and their titles are **not** reserved — but leave
> the entries themselves untouched.
