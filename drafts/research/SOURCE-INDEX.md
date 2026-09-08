# Primary-source index
**Built 2026-08-22.** Read this before any web search — the research-bank-first
rule. It records what is already banked, what is reachable, and what is blocked.

## ✅ Banked and reusable

| File | Source | Fetched | Covers |
|---|---|---|---|
| `dgca-pariksha-faq-2026-08-22.md` | `pariksha.dgca.gov.in/Form/PLT_FAQs` | 2026-08-22 | Computer Number (eligibility, validity, one-per-candidate, NEW vs OLD, hard copy, BVC, photo/signature specs, upload formats, rejection flow, profile updates), exam fee ₹2,500/paper, non-refundability, Rule 41A / Rule 47A, CEO address, foreign-national requirements, AIU equivalency |

That one file carried **three articles** with zero additional searches. It is
the model.

## Added 2026-09-05

**The DGCA portal has one working door.**
`www.dgca.gov.in/digigov-portal/Upload?flag=iframeAttachView&attachId=<id>`
serves real CAR PDFs to a plain fetcher. `?dynamicPage=` and `?page=…​.pdf` both
return the homepage — that is the distinction this file was missing. Two CARs were
read cold through it on 2026-09-05: Section 7 Series 'B' Part VI (ATPL examination
syllabus, Issue III, 16 Jun 2011) and Section 7 Series 'J' Part III (FDTL, Issue
III Rev 1, 8 Jan 2024). **Archive anything read this way at read time** — the
`attachId` tokens are of unknown stability.

**Banked:** `aircraft-rules-1937-moca-copy-2026-09-05.md` — the Ministry's copy of
the Aircraft Rules 1937, Parts I–V, including Rule 39C. **Not citable**: current
only to GSR 11(E) of 10-01-2011, and badly OCR'd. See the file's own warning.

### Three corrections to the PDF table below
- **"Flight Crew MANUAL"** (`6F8C326F…`) is the **Pariksha portal user manual**. It
  will not settle the OLODE-fee or Computer-Number auto-generation questions.
- **"Reference Book – FC"** (`C9FAE7D8…`) is a **list of study material** for PPL,
  CPL and ATPL exams — a reading list, not a source of pass rates.
- **"Syllabus"** (`1A745E29…`) fetches, and its content is a pointer: *"Refer
  latest CAR, Section-7, Series-B"* — a document already held.

Three of the four documents this file called highest-value are therefore worth
less than it estimated, and the `brew install poppler` recommendation below buys
correspondingly little. **Medical validity is Rule 39C of the Aircraft Rules, not
a CAR** — see `BROWSER-FETCH.md` item 3.

## 🟡 Reachable but low-yield (HTML)

| URL | Status | Notes |
|---|---|---|
| `pariksha.dgca.gov.in/home` | 200 HTML | Portal landing. Useful only as the link index that produced this file. |
| `pariksha.dgca.gov.in/home/Notice_Board_General_PLT` | 200 — **CLOSED, see below** | Not reachable without candidate credentials |
| `pariksha.dgca.gov.in/home/fc_olode_seat_count` | 200 — **CLOSED, see below** | Same |
| `www.dgca.gov.in/digigov-portal/` | 200 HTML (208 KB) | Main DGCA portal. Not yet mined. |
| `www.nios.ac.in` | 200 HTML | For calendar topic #19 ("pilot without maths" — the NIOS route). Not yet mined. |
| `www.wpc.gov.in` | **000 — did not resolve** | The RTR(A) authority. Retry later; blocks primary sourcing for RTR topics. |

### Ruled out with evidence (2026-08-22) — do not retry without credentials
Both deep links were re-fetched with a **real headless Chrome** (the binary
installed for build verification), `waitUntil: networkidle2`, plus a 3-second
settle for late XHR. Both returned the **identical 457-character landing page**,
zero tables, no notice content, no seat data.

So they are **not** JS-gated — they are server-side aliases that do not serve
content to unauthenticated visitors. Rendering will never help. The only routes
in are a logged-in candidate session or the PDF documents.

**Consequence:** the **Computer Number auto-generation** question cannot be
settled from the public web. It stays `[CONFIRM]` in the Computer Number
article and in the "Still unsettled" section of the misconceptions article
until either the Flight Crew MANUAL PDF is readable (needs poppler) or someone
with a Pariksha login checks the notice board directly.

**New primary fact banked from the portal landing page:** Pariksha is described
as an integration of DGCA's former **'VIMAN' and 'UDAAN'** systems, all
Computer Number holders must register on it for any future examination, it is
built and maintained by **NIELIT**, and the site itself carries a **"under beta
testing"** disclaimer. That last point is genuinely useful context for any
article describing the portal as authoritative.

## 🔴 PDF-only — BLOCKED until poppler is installed

These are the highest-value remaining sources and every one is a PDF. They are
served through `PDFViewer.jsp` with opaque hash parameters, and they use
Identity-encoded font subsets, so text cannot be extracted without a real PDF
tool. `brew install poppler` unblocks all of them at once.

| Document | URL | Unblocks calendar topic |
|---|---|---|
| **Exam Calendar 2026** | `https://pariksha.dgca.gov.in/PDFViewer.jsp?pdf=027F234C1243D44B5BF5C787082CDCC8` | **#1** — and settles the session-months conflict flagged in `GEO_LOG.md` |
| **Syllabus** | `https://pariksha.dgca.gov.in/PDFViewer.jsp?pdf=1A745E291DDC1E1BDC7FD70AEC52B711` | **#4, #5, #6, #7** — all four per-subject exam guides |
| **Flight Crew MANUAL** | `https://pariksha.dgca.gov.in/PDFViewer.jsp?pdf=6F8C326FEC34C153B92877E1A963F221` | **#2** — and resolves the auto-generation and OLODE-fee `[CONFIRM]`s |
| **Reference Book – FC** | `https://pariksha.dgca.gov.in/PDFViewer.jsp?pdf=C9FAE7D86796081D3AA68DC41AF53315` | **#4–#7**, and #23 (pass rates) |
| **FAQ Flight Crew (PDF)** | `https://pariksha.dgca.gov.in/PDFViewer.jsp?pdf=01BA8FB2105DBF5FA48E2F8D89E1E054` | Cross-check against the HTML FAQ already banked |
| Exam Calendar 2025 | `https://pariksha.dgca.gov.in/PDFViewer.jsp?pdf=D936F869AD694C2A939DA28FD78DFE1F` | Historical comparison only |

⚠️ **These hash URLs are likely to rotate** when DGCA republishes a document.
Re-derive them from `pariksha.dgca.gov.in/home` rather than assuming they persist.

### The fetch command, ready to run once poppler is in
```bash
cd drafts/research
curl -sL -A "Mozilla/5.0" \
  "https://pariksha.dgca.gov.in/PDFViewer.jsp?pdf=027F234C1243D44B5BF5C787082CDCC8" \
  -o dgca-exam-calendar-2026.pdf
pdftotext -layout dgca-exam-calendar-2026.pdf dgca-exam-calendar-2026.txt
```
Then bank the text with the same header format as the FAQ file: source URL,
fetch date, and a "corrections this source forces" section.

## Impact of the poppler gap on the calendar

Of the ten approved-pending topics, **six are materially blocked** on these
PDFs: #1 (exam calendar), #4, #5, #6, #7 (per-subject syllabi), #2 (partly).
Writing them from secondary sources would mean building correction-based
articles on unverified foundations — precisely the inversion the quarterly
refresh rule exists to prevent.

The topics that remain fully writable without poppler: **#21** (how to choose
ground classes — advisory), **#19** (pilot without maths — NIOS is HTML),
**#22** (ground classes vs self-study — advisory), **#28** (cadet vs
self-sponsored — advisory). All four are cluster-5 advisor pieces, which is
convenient: that cluster is the moat anyway.
