# BROWSER-FETCH.md — six documents only you can open
Created 2026-09-04. Ordered by how much they unblock.

## Why this file exists
DGCA's portal and several airline sites serve their homepage, or nothing, to
non-browser clients. Every figure in month 1 that could be fetched, was. These
six could not — so they are held, and the pages that need them say so on their
face rather than repeating what everyone else prints.

Each item below is a two-minute task: **open the URL, find the thing, paste it
back.** Send the document URL plus the exact wording, and the page gets written
with a citation the same day.

**Do not paraphrase.** Copy the sentence as printed. If the document says
something different from what we expect, that is the useful outcome, not a
problem.

---

## 1. Schedule II, Aircraft Rules 1937 — flight-hour minimums
**Unblocks:** `/pilot-training/ppl` · `/blog/atpl-eligibility-india` ·
`/become-a-pilot/airline-transport-pilot-licence` · the month 2 CPL eligibility page

**Highest value on this list.** Three live pages currently either omit an hours
figure or carry one explicitly marked unverified. This is the single document that
settles the most claims.

- **Where:** [dgca.gov.in → Regulations → Aircraft Rules 1937 → Schedule II](https://www.dgca.gov.in/digigov-portal/?dynamicPage=aircraftRules1937%2F1%2F0%2FviewDynamicRulesReq), or the Aircraft Rules 1937 PDF on [indiacode.nic.in](https://www.indiacode.nic.in/)
- **Find:** the Schedule II entries for **Private Pilot's Licence (Aeroplanes)**, **Commercial Pilot's Licence (Aeroplanes)** and **Airline Transport Pilot's Licence (Aeroplanes)**
- **Copy:** for each licence — minimum total flight time, solo/PIC hours, cross-country, instrument and night requirements, plus the licence's period of validity. And the document's revision date.
- **Why it matters:** we currently cannot confirm the 1,500-hour ATPL figure or any PPL hours figure. Both are stated everywhere and sourced nowhere.

## 2. DGCA medical CAR — Class 1 and Class 2
**Unblocks:** month 2 `/dgca/class-1-medical-guide`, and firms up `/dgca/medical`

- **Where:** [dgca.gov.in → Regulations → CAR → Section 7 (Flight Crew Standards), medical series](https://www.dgca.gov.in/digigov-portal/)
- **Find:** the CAR covering medical assessment for flight crew
- **Copy:** the CAR's section/series/part and revision date, validity periods for Class 1 and Class 2 by age band, and which examiners may issue each
- **Why it matters:** medical validity by age is a real search query and it is misstated constantly. It is also the question most likely to change someone's plan.

## 3. OLODE fee — does a separate one exist?
**Unblocks:** closes the correction shipped in month 1

- **Where:** log in at [pariksha.dgca.gov.in](https://pariksha.dgca.gov.in/) and go as far as the payment step for an OLODE slot, or check the portal's notices/circulars section
- **Find:** the fee actually charged for an on-demand paper
- **Copy:** the amount shown, and where it appears (payment screen, notice, user manual)
- **Why it matters:** DGCA's FAQ states Rs 2,500 per paper and names no OLODE fee. We removed the widely repeated Rs 5,000 as unsourced. If the portal shows a different amount, our pages should say so — with your screenshot as the source.

## 4. WPC / RTR(A) syllabus and current examining authority
**Unblocks:** month 2 `/rtr-a-exam-guide`, and firms up `/rtr`

- **Where:** [Wireless Planning & Coordination Wing, Ministry of Communications](https://dot.gov.in/wpc), and any DGCA notice on RTR(A)
- **Find:** who currently conducts RTR(A), the syllabus, and the practical component
- **Copy:** the syllabus headings, the examining authority as named in the document, and the document's date
- **Why it matters:** administration of RTR(A) has moved between authorities. Our pages say "confirm the current authority" because we genuinely do not know. That is honest but not useful.

## 5. DGCA list of approved Flying Training Organisations
**Unblocks:** month 3 `/locations/india-flying-schools`, and strengthens `/blog/how-to-choose-a-flying-school-in-india`

- **Where:** [dgca.gov.in](https://www.dgca.gov.in/digigov-portal/) → Approvals / Flying Training Organisations
- **Find:** the current approved-FTO list
- **Copy:** the list URL and its publication date. **No need to copy the whole list** — the URL and date are enough; the page will link to the regulator's list rather than reproduce it, since a copied list goes stale and ours would be the stale one.
- **Why it matters:** "DGCA approved flying schools" is high-volume, and every competitor publishes an unsourced Top 10. Linking the regulator's own live list beats all of them and never rots.

## 6. Any real figure the business can stand behind
**Unblocks:** the month 2 cost page, currently unwritten

- **Where:** your own records
- **Find:** anything you can publish and defend — your own ground-class fee, a typical total for a student who went through you, a partner FTO's published rate
- **Copy:** the figure and what it covers
- **Why it matters:** "pilot training cost in India" is one of the highest-intent queries in this vertical, and we cannot write it. Every published figure is a school quoting itself. **You are a school** — a figure you publish about your own fees is primary-sourced by definition, and it is the one number on this list you can create rather than find.

---

## When you have any of them
Send the document URL and the copied text. Nothing else is needed — the page,
the citation, the schema and the internal links all follow from that.

Partial is fine. Item 1 alone unblocks three live pages.

---

# Fetch attempt log — 2026-09-05

Every item above was retried from the cloud session before month 3 was written.
Four findings, two of which change this list.

**Item 1 has a route that does not need the DGCA portal.** India Code serves the
complete Aircraft Rules 1937 as a single PDF:
`https://upload.indiacode.nic.in/showfile?actid=AC_CEN_36_0_00013_193422_1523351174422&filename=Aircraft+Rules+1937.pdf&type=rule`
It fetched successfully — the rules text is readable — but **Schedule II sits
past the point where the fetcher's conversion stops**, so the schedule itself
still needs a human to open the PDF and scroll. That is a better instruction than
the one this file carried: one PDF, one scroll, no portal navigation.

**The DGCA portal is confirmed dead to fetchers, again.** Two Schedule II deep
links (`aircraftRulesContent2Req/1/3046/…`, titled *Commercial Pilot's Licence
(Aeroplanes)* in search results, and `…/3055/…`) both returned the DGCA homepage,
not rule text. This matches what `drafts/research/SOURCE-INDEX.md` recorded on
2026-08-22 for the Pariksha deep links. Treat every `dgca.gov.in/digigov-portal`
URL as owner-only. **The two URLs above are worth opening in your browser** — the
search index says they are the CPL and one other Schedule II entry.

**One SOURCE-INDEX assumption is wrong.** The Pariksha "Syllabus" PDF
(`PDFViewer.jsp?pdf=1A745E29…`) was expected to unblock the four per-subject exam
guides. It fetched, and its content is a pointer: *"Refer latest CAR,
Section-7, Series-B"*. It contains no syllabus. Those four topics are blocked on
CAR 7-B-I, which we already have — so they may be writable after all, and the
poppler install that file recommends buys less than it claims.

**FAA rules are fully machine-readable.** eCFR served the text directly, so the
FAA half of `dgca-vs-faa-vs-easa` no longer needs you. Banked below, verbatim as
returned, on 2026-09-05:

- **14 CFR 61.129(a)** — "§ 61.129 Aeronautical experience". Commercial pilot,
  airplane single-engine: "at least 250 hours of flight time as a pilot",
  including "100 hours in powered aircraft, of which 50 hours must be in
  airplanes"; "100 hours of pilot-in-command flight time"; "20 hours of training
  on the areas of operation" including "Ten hours of instrument training"; "Ten
  hours of solo flight time in a single engine airplane".
  Source: `https://www.ecfr.gov/current/title-14/chapter-I/subchapter-D/part-61/subpart-F/section-61.129`
- **14 CFR 61.159** — "§ 61.159 Aeronautical experience: Airplane category
  rating". ATP: "at least 1,500 hours of total time as a pilot", with 500 hours
  cross-country, 100 hours night, 75 hours instrument, 50 hours in the class
  sought, 250 hours as PIC or SIC performing PIC duties, per §61.159(a)(1)–(5).
  Source: `https://www.ecfr.gov/current/title-14/chapter-I/subchapter-D/part-61/subpart-G/section-61.159`
  **The breakdown above is the fetcher's summary, not a verbatim quote.** Quote it
  from the section itself before it is published.

**What is still needed for `dgca-vs-faa-vs-easa`:** the EASA side. Part-FCL is
published as *Easy Access Rules for Flight Crew Licencing (Part-FCL)* at
`https://www.easa.europa.eu/sites/default/files/dfu/Easy_Access_Rules_for_Part-FCL-Aug20.pdf`,
and the regulation itself is Regulation (EU) No 1178/2011 on EUR-Lex. Either one,
opened to the CPL(A) and ATPL(A) experience requirements and to FCL.025 on
theoretical-knowledge validity, finishes the post. **And the DGCA column of that
post is Schedule II — item 1 again.** Item 1 is now the single highest-value
thing on this list by a wide margin.
