# CONTENT-CALENDAR.md — flystar.co.in
Created 2026-09-04. Source of truth for what gets written and why.
Read with `SEO.md` (keyword map, the facts we own) and the editorial policy.

## The rule this calendar is built on
We do not win this vertical on volume. Every competitor publishes "how to become
a pilot". We win where the vertical is confidently **wrong** and we can cite the
regulator. So topics are ranked by *sourcing strength first, search volume
second* — a 900-word page that settles a disputed number outranks, and out-cites,
a 2,000-word page that repeats what everyone already says.

**Source status** on each entry means:
- **fetched** — we hold the primary document and have quoted it.
- **browser** — the source exists but DGCA's portal serves its homepage to
  non-browser clients. Owner must open it and hand over the document + figure.
- **secondary-only** — repeated widely, no primary source found. These numbers do
  not get published. The sentence is rewritten or the gap is held.

## Primary sources currently in hand
| Document | Gives us |
|---|---|
| DGCA CAR Section 7, Series 'B', Part I (Issue III, Rev 2, 13 Feb 2019) | Exam eligibility per licence, subjects, 70% pass mark, paper validity |
| DGCA CAR Section 7, Series 'G', Part I (Issue II, Rev 4, 9 Sep 2019) | Foreign licence conversion, 10 hrs PIC / 24 months currency |
| DGCA Pariksha Flight Crew FAQ (retrieved 2026-08-22) | Computer number, BVC, document specs, **fee Rs 2,500 per paper**, no max age |
| Civil Aviation Authority of Sri Lanka — CPL | Age 18, Class I medical, ELPC Level 4 |
| Maldives CAA — approved FTO list | Which schools are actually approved |

---

# MONTH 1 — eight entries · **ALL SHIPPED 2026-09-04**

Six shipped as blog posts under `/blog/<slug>` rather than the `/dgca/` paths
originally sketched. Reason: the blog path already carries BlogPosting and
FAQPage schema, feeds the sitemap, the RSS feed and `llms.txt` automatically, and
needs no new React component per article. The two format pages — the FAQ hub and
the glossary — are real pages, because they are site furniture rather than
articles. `/dgca/board-verification` now 301s to the post that answers it instead
of to the computer-number guide.


Two are already written and sitting in `drafts/`, primary-sourced, needing only
wiring. They go first because they are the cheapest real content available.

### 1. `/dgca/olode-exam` — DGCA OLODE vs Regular Sessions
- **Primary:** dgca olode exam
- **Secondary:** dgca on demand exam, olode vs regular dgca, dgca exam booking
- **Intent:** informational · **Length:** ~1,700 · **Pillar:** `/dgca/ground-classes`
- **Source status:** fetched (Pariksha FAQ) — **except the OLODE fee**
- **Note:** draft exists at `drafts/dgca-olode-vs-regular-exams.md`. The widely
  repeated "Rs 5,000 per OLODE paper" is **secondary-only**; DGCA's FAQ 13 states
  Rs 2,500 per paper and names no OLODE-specific fee. The page states 2,500 with
  its citation and says plainly that no separate OLODE fee is published.
  **[UNSOURCED — held]** OLODE-specific fee.

### 2. `/dgca/exam-misconceptions` — What the Rules Actually Say
- **Primary:** dgca exam myths
- **Secondary:** is pcm required for dgca, dgca exam age limit, dgca attempts limit
- **Intent:** informational · **Length:** ~1,600 · **Pillar:** `/dgca`
- **Source status:** fetched. Draft at `drafts/dgca-exam-misconceptions.md`.
- **Why it ranks:** every claim is a correction with a citation. This is the
  single most citable format we have.

### 3. `/dgca/board-verification` — Board Verification Certificate
- **Primary:** dgca board verification certificate
- **Secondary:** bvc for dgca, board verification for computer number, dgca 10th 12th verification
- **Intent:** informational/procedural · **Length:** ~1,000 · **Pillar:** `/dgca/computer-number`
- **Source status:** fetched (Pariksha FAQ)
- **Why now:** this URL currently 301s to the computer-number guide. It is a
  distinct query with its own intent, and we already hold the source. Building it
  retires the redirect and recovers the query.

### 4. `/dgca/exam-fees` — DGCA Exam Fees, Payment and Refunds
- **Primary:** dgca exam fees
- **Secondary:** dgca exam fee per paper, is dgca exam fee refundable, dgca exam payment
- **Intent:** transactional-informational · **Length:** ~900 · **Pillar:** `/dgca`
- **Source status:** fetched (FAQ 13, 14)
- **Why it wins:** DGCA states Rs 2,500 per paper, never refundable. The internet
  says a lot of other things. A short, sourced, unambiguous page on a
  money question is exactly what an answer engine quotes.

### 5. `/dgca/exam-subjects` — DGCA Theory Subjects by Licence
- **Primary:** dgca exam subjects
- **Secondary:** cpl subjects dgca, dgca syllabus cpl, atpl subjects india, dgca paper list
- **Intent:** informational · **Length:** ~1,300 · **Pillar:** `/courses/cpl`
- **Source status:** fetched (CAR 7-B-I lists subjects verbatim per licence)
- **Format:** one comparison table across PPL / CPL / ATPL — subjects,
  qualification, pass mark, paper validity. Table-first, which is what gets
  extracted.

### 6. `/become-a-pilot/atpl-eligibility` — ATPL Eligibility in India
- **Primary:** atpl eligibility india
- **Secondary:** atpl requirements dgca, atpl vs cpl, atpl 1500 hours
- **Intent:** informational · **Length:** ~1,200 · **Pillar:** `/courses/atpl`
- **Source status:** fetched (CAR 7-B-I)
- **Facts others miss:** an ATPL applicant must already hold an **Indian CPL**;
  defence personnel may substitute 500 hrs including 200 PIC; **an ATPL is not
  issued on a single-engine aircraft**. That last one is almost never stated.

### 7. `/faq` — FAQ hub
- **Primary:** dgca pilot training faq
- **Secondary:** long-tail question queries across the whole site
- **Intent:** informational · **Length:** ~1,500 · **Pillar:** homepage
- **Source status:** fetched (aggregates only already-cited answers)
- **Why add it:** a format we lack. Every answer is a self-contained sourced
  passage with FAQPage schema, linking to the page that treats it in depth. It is
  the highest-density citable surface we can build, and it costs no new research.
- **Rule:** the hub never introduces a fact. If an answer is not already sourced
  on a page, it does not go in the hub.

### 8. `/glossary` — Indian Pilot Training Glossary
- **Primary:** dgca terms glossary
- **Secondary:** what is cpl, what is atpl, what is rtr, what is a computer number, what is olode, what is bvc, what is an fto
- **Intent:** definitional · **Length:** ~1,400 · **Pillar:** homepage
- **Source status:** fetched
- **Why add it:** definition queries are how answer engines resolve entities, and
  a glossary is the canonical shape for them. Each term gets a 40–60 word
  self-contained definition plus a link to the page that expands it. It also
  disambiguates our own vocabulary for a model reading the site cold.

---

# MONTH 2 — outline

| Slug | Primary keyword | Source status |
|---|---|---|
| `/dgca/class-1-medical-guide` | dgca class 1 medical requirements | **browser** — needs the DGCA medical CAR |
| `/rtr-a-exam-guide` | rtr a exam syllabus | **browser** — WPC Wing is the authority |
| `/blog/dgca-exam-attempts-and-validity` | dgca exam validity | fetched (CAR 7-B-I) |
| `/blog/foreign-licence-conversion-checklist` | dgca conversion documents | fetched (CAR 7-G-I) |
| `/blog/cpl-eligibility-after-12th` | cpl eligibility after 12th | fetched (CAR 7-B-I) |
| `/blog/pilot-training-cost-india` | pilot training cost india | **secondary-only — held.** Every published figure is a school's own quote. Either we publish a cost *framework* with no invented numbers, or we do not publish |

# MONTH 3 — outline

| Slug | Primary keyword | Source status |
|---|---|---|
| `/blog/dgca-vs-faa-vs-easa` | dgca vs faa licence | fetched for the DGCA side; **browser** for FAA/EASA |
| `/blog/type-rating-india` | type rating india | **browser** |
| `/blog/pilot-salary-india` | pilot salary india | **secondary-only — held** pending a citable source |
| `/blog/english-proficiency-pilots-india` | icao english proficiency india | **browser** |
| `/locations/india-flying-schools` | dgca approved flying schools list | **browser** — DGCA publishes an FTO list; needs fetching |

---

## Held for the owner
| # | Item | Blocks |
|---|---|---|
| 1 | **Schedule II, Aircraft Rules 1937** — PPL flight-hour minimum | The hours figure on `/pilot-training/ppl`, month 2 medical page |
| 2 | **DGCA OLODE fee** — is there a separate one? | Entry 1's fee line |
| 3 | **DGCA medical CAR** | Month 2 Class 1 page |
| 4 | **WPC / RTR(A) syllabus** | Month 2 RTR page |
| 5 | **DGCA approved FTO list** | Month 3 flying schools page |
| 6 | **Any real fee/salary data** the business can cite | Cost and salary pages, currently held |

DGCA's portal serves its homepage to non-browser clients, so items 1, 3, 4 and 5
need the owner's browser: open the page, hand over the document URL and the
figure, and the page gets written with a citation.

## Cadence
Two posts a week is the sustainable rate for sourced writing. Month 1's eight
entries are roughly a month at that pace, and entries 1 and 2 are already
drafted, so week 1 is nearly free.


---

# SHIPPED — month 1, 2026-09-04

| # | URL | Words | Sources cited |
|---|---|---|---|
| 1 | `/blog/dgca-olode-vs-regular-exams` | ~670 | Pariksha FAQ, CAR 7-B-I |
| 2 | `/blog/dgca-exam-misconceptions` | ~660 | CAR 7-B-I, Pariksha FAQ |
| 3 | `/blog/dgca-board-verification-certificate` | ~550 | Pariksha FAQ |
| 4 | `/blog/dgca-exam-fees` | ~600 | Pariksha FAQ 13, 14 |
| 5 | `/blog/dgca-exam-subjects-by-licence` | ~565 | CAR 7-B-I |
| 6 | `/blog/atpl-eligibility-india` | ~600 | CAR 7-B-I |
| 7 | `/faq` | ~1,100 | Aggregates only already-sourced answers |
| 8 | `/glossary` | ~1,200 | 14 terms, each linked to its source page |

Posts are shorter than the calendar's target lengths, deliberately. Every
sentence is either sourced or explicitly marked unsourced, and padding a sourced
page to hit a word count is how unsourced sentences get written. Length is an
output of the material, not a target.

## The correction this batch forced
Writing entry 4 meant checking the exam fee against DGCA's FAQ rather than our
own pages. **DGCA states Rs 2,500 per paper and publishes no OLODE-specific fee.**
The Rs 5,000 OLODE figure was published on three of our live pages — and on one
of them, footnoted to the exact DGCA page that does not contain it.

Corrected in `blogData.js` (3 posts, 8 occurrences), `llms.txt` Key facts, and
`SEO.md`. Now stated as: Rs 2,500 per paper, non-refundable, no published OLODE
fee, and the Rs 5,000 figure named as unsourced.

This is the editorial policy working on our own content, which is the only real
test of it.

## Known content debt
`/blog/air-hostess-salary-in-india-2026` carries airline-by-airline salary tables
with no source — "projected" ranges for Air India, IndiGo, Vistara and Akasa. It
predates the editorial policy and is out of this phase's scope, but under the
numbers policy it should either be sourced or rewritten to stop depending on the
figures. Flagged, not changed.

## [UNSOURCED — held] register
| Figure | Page affected | Needs |
|---|---|---|
| PPL flight-hour minimum | `/pilot-training/ppl` | Schedule II, Aircraft Rules 1937 |
| ATPL 1,500 hrs / 500 PIC | `/become-a-pilot/airline-transport-pilot-licence`, `/blog/atpl-eligibility-india` | Schedule II — stated on those pages as unverified |
| OLODE-specific fee | `/blog/dgca-exam-fees`, `/blog/dgca-olode-vs-regular-exams` | A DGCA notice, if one exists |
| Cabin crew / pilot salary bands | `/blog/air-hostess-salary-in-india-2026`, month 3 salary page | Any citable source |
| Pilot training cost | Month 2 cost page | Not written until a source exists |
