# CHANGELOG

All entries: what changed, and why. Newest first.

## 2026-09-10 - Verified live, from the owner's machine

The campaign's first VERIFIED LIVE evidence. Every check below is a real
response from the real host, run from the owner's Mac, not from a container
that cannot reach the edge.

**Security verification item: CLOSED.** The merge-day fixes were repo-verified
only, because the environment that checked them could not reach production.
Re-run against production: `/api/contacts` answers 404, not a JSON dump of real
people's names and phone numbers; `DELETE /api/blogs/<id>` answers 405. "Closed
in the repo" and "closed on the internet" are now the same fact.

**Deploy confirmed.** `npm run smoke`: 74 checks passed, 72 sitemap URLs, 2
expected redirects, 19 blog URLs. Live counts match what was committed exactly -
sitemap 72, feed 16, llms.txt 62 links - so Vercel is serving 419a4dc.
`/apply`, `/courses/cpl/fees` and `/atpl/brochure` all answer 200.

**Invariant 5 confirmed on the edge.** `/dgca/computer-number` serves 14
`<details>` elements, and the FAQ answer "Its validity is lifetime" appears
twice in the served HTML: once in the visible FAQ, once in the FAQPage JSON-LD.
That is the schema-to-visible-text parity the invariant demands, and this
morning it was one occurrence - the schema alone, asserting an answer the page
did not contain.

**Provenance relabelled.** Claims previously carried as INDETERMINATE - that the
deploy served, that the sitemap and feed the build produced are the ones on the
edge, that the render gate holds in production - are now VERIFIED LIVE against
the evidence above.

**robots.txt and llms.txt now VERIFIED LIVE too.** Fetched from the host, not
read from the repo: robots.txt matches all four of GPTBot, OAI-SearchBot,
ClaudeBot and PerplexityBot, and llms.txt serves 62 links. That is the agent's
half of the section 9G edge access check done with live evidence rather than
repo evidence. The owner's half - hosting logs showing recent 200 responses to
those four agents - is still outstanding and is a monthly item, not a P0.

## 2026-09-10 - The FAQ answers that were never in the HTML, and three pages that did not exist

**The defect first.** Every non-blog page renders its FAQ through the shared
Accordion, which was built on Radix. Radix unmounts closed content, and
`scripts/prerender.js` serializes the live DOM with `page.content()` without
opening anything. So eighteen pages shipped their FAQ *questions* and none of
their *answers*, while `/dgca/computer-number` published FAQPage schema
asserting answers that were not on the page. The blog path was fixed months ago
with native `<details>`; the page path never was, and nothing tested it.

Proven both ways before and after. Rendering the old Radix component closed put
the question in the markup and left the answer out entirely. The rebuilt
component is native `<details>`/`<summary>`, and the prerendered output now
carries 14 `<details>` on `/dgca/computer-number`, 10 on `/rtr`, 8 on
`/pilot-training/india`, 6 on `/courses/atpl` and `/become-a-pilot/become-pilot`,
5 on `/courses/cpl`, with the answer text present in the served HTML.

The exported names and props are unchanged, so no page JSX moved. `type="single"`
maps to the `<details name>` group; a browser without that support allows more
than one open at a time, which degrades behaviour and never content.
`src/test/faqPrerender.test.tsx` renders a closed item and asserts the answer is
in the markup, and refuses any page that imports a collapsing primitive directly.

**Three pages that were linked but never existed**
- `/apply` - a real enquiry form posting to the existing `/api/contact`, with the
  honeypot the backend already checks. City and qualification travel inside the
  message rather than widening the public write surface with new columns. States
  plainly that it is not a DGCA application and that flying training happens at
  partner FTOs.
- `/courses/cpl/fees` - the absence answer applied to cost. Fifteen components,
  who sets each, whether anyone publishes it, and seven questions that make two
  quotes comparable. **No figures at all**, because every rupee amount in
  circulation traces to a provider quote and DGCA publishes examination charges,
  not training prices.
- `/atpl/brochure` - the brochure as a page rather than a download. Says what the
  ATPL permits, how it differs from a CPL, and what a ground school does not
  provide. Schedule II hour requirements are named as the governing text and
  deliberately not restated, because the banked copy is not citable.

**Repairs found along the way**
- 48 places across 8 files read `DGCA-  `, `FAA-  `, `CASA-  `, `CAA-  ` or
  `SACAA-  ` - an earlier claims pass removed the word "approved" and left the
  sentence broken, including in eight `routeMeta` titles and descriptions that
  Google was serving. Restored as "approved" where it describes a third-party
  organisation, and as "empanelled" for medical examiners, which is the accurate
  term.
- One "Apply Now" button on `/courses/cpl` pointed at `/rtr`. The dead-link
  repair made links resolve without checking they resolved anywhere sensible.
  All 20 Apply CTAs now point at `/apply`; "Get CPL Course Fees" and "Get ATPL
  Course Fees" point at the pages that answer them instead of at `/contact`.

Sitemap 69 to 72 URLs, feed 16 items, 132 tests passing, build and prerender
green. Not pushed - the owner pushes.

## 2026-09-09 — Every remaining regulator citation, checked against what the document actually says

Eleven citation lines across seven pages named DGCA, ICAO, FAA or SACAA and
linked to a **homepage**. A homepage is not a citation: it evidences that an
organisation exists, not the claim above it. Resolved one block at a time
against what is actually banked, rather than swapped wholesale.

**Cited precisely (the document is banked and does state the claim)**
- `/become-a-pilot/become-pilot` — the 10+2 Physics and Mathematics entry
  requirement is CAR Section 7, Series 'B', Part I. Now named in full.
- `/dgca/ground-classes` — the subjects examined per licence, same document.

**Source line removed (the claim is real, the evidence is not in hand)**
- `/courses/cpl` and `/courses/atpl` definition blocks. What a licence *permits*
  is Schedule II of the Aircraft Rules 1937, which is still not banked.
- `/dgca/medical` — Class 1 and Class 2 validity is Rule 39C. The only copy
  banked is current to GSR 11(E) of 2011 and badly OCR'd, so it is not citable.

**Kept, relabelled** — `/dgca/full-form`. The claim is DGCA's own name and parent
ministry, and an official website is legitimate evidence for exactly that. The
label now says so instead of implying a document.

**The worst one: the India / USA / South Africa comparison.** Cost ranges of
Rs 35–50 lakh, Rs 60–85 lakh and Rs 25–40 lakh were attributed to DGCA, FAA and
SACAA. None of the three publishes training prices. Ranges kept and labelled as
market estimates from published school fee schedules; the regulator names stay in
the "Licensing authority" column, which is the part they do evidence. The note
now links to the sourced exam-fee page and the conversion checklist.

**Component change:** `url` is optional on both citation components. CAR 7-B-I has
no stable public URL — the DGCA portal serves its homepage to non-browser clients
— and naming the document beats linking the wrong page.

121 tests passing, build green.

## 2026-09-08 — Blog restructured into topic clusters

The last pass fixed how the posts *looked*. This one fixes how they are
*organised*, which is what was actually making the section feel thin: fourteen
good pages in a flat grid, four category labels, one of which held a single post,
and not a single URL a reader or a crawler could point at for "everything about
the DGCA papers".

### Illustrations: 65 planned, placeholders live, prompts kept out of the HTML
Five images per post across all thirteen — a cover and four inline — including
new covers for the two posts that already had one, so the whole set comes from
one style in one run.

**Live placeholders, without feeding the crawler prompt text.** The request was
to show the prompt placeholder on the site. Rendered naively that puts *"flat
vector illustration, minimal clean style, generous negative space"* five times
into every article's HTML, on pages whose entire value is being quotable. So the
placeholder is a designed figure — an "Illustration in production" block carrying
the caption, which is real content — and the prompt is injected into the DOM only
when someone presses **Show prompt**. Verified in a browser: the served HTML
contains no prompt text before that click and does after it.

**Generic covers now yield to the placeholder.** Ten posts pointed at the same
site-wide hero photograph and one at a stock URL, so "has a cover" was never the
same as "has its own cover". Where the cover is a stand-in, the listing card and
the article show the planned illustration instead. One shared aeroplane photo
repeated down a listing tells a reader nothing.

**Structured data.** `BlogPosting.image` is now an array of `ImageObject` nodes —
url, dimensions, caption and description per figure, with the cover marked
representative — built only from images that actually exist. A placeholder is
never claimed in schema as an image of the article.

**Style, decided rather than asked:** flat vector, no lettering, and
diagrammatic. What gets pulled into an AI answer is structure — a Venn of shared
exam subjects, a timeline of a PPL pass expiring at half the CPL window, a
balance of money against time. A figure baked into a picture cannot be corrected
or sourced, which is the one thing this site refuses to do.

### The offer banner was floating over every article — and the rule meant to stop it never matched
`App.tsx` already carried a rule to suppress popups on the blog. It tested
`/^\/(blogs|admin)/`, which matches `/blogs` but **not `/blog/<slug>`** — the
canonical URL every post actually lives at. So the fixed-position CPL offer sat
on top of the reading sidebar on all fourteen articles, and on the topic hubs
too. One character: `blogs?`.

The banner itself was rewritten rather than deleted. It was `position: fixed` at
a hard 320px with no close button and no breakpoints — a promotion the reader
cannot dismiss is an obstacle, not a promotion. It now has a real close button
that is remembered for the session, becomes a slim bottom bar on phones and
tablets where there is no free column, and is capped to the viewport instead of a
fixed pixel width. It still runs on non-blog pages; the price is the business's
own published figure, which is the one number this site can state without an
external source.

### A site-wide horizontal scroll at exactly 1024px
Found by driving the real pages in a headless browser at six widths rather than
reading the classes. The header switched to its desktop nav at `lg` (1024px)
before the nav fitted, pushing the document 139px wider than the viewport — on
**every page, including the homepage**, not just the blog. Moved to `xl`, so
1024–1279px uses the menu button. Re-checked at 320, 390, 768, 1024, 1440 and
1920: no horizontal overflow anywhere, on the listing, a hub, an article or the
homepage.

### Space
The post hero was centred on a 3xl measure while the body below ran in a wider
grid, so the H1 started about 250px right of the article it introduced. Hero and
body now share one gutter, with the reading measure kept on an inner block. The
reading column and sidebar grow on large screens (17rem at `lg`, 20rem at `xl`,
container to `max-w-7xl`) instead of stranding a third of a 1920px display, and
every container gained an `sm` gutter for tablets.

### Illustrations: 37 planned, prompts generated from the code
`src/lib/blogImages.js` is the single source for what each image shows, the
prompt that makes it, and where it sits — `after: 2` places it under the second
`<h2>`, so a picture lands with the section it illustrates rather than at the end
of the article. `prepareArticle` now returns the body split at its headings to
make that possible.

**Nothing renders until the file exists.** An entry with `ready: false` renders
nothing in production and a placeholder carrying its own prompt in `npm run dev`,
so the gaps are visible exactly where the pictures will go. A missing picture is
a gap; a broken image on a page whose whole claim is that its figures are checked
is a defect.

`BLOG-IMAGE-PROMPTS.md` is now **generated** by `npm run image-prompts`. The
prompts used to live in the markdown and the filenames in the code, which meant
the two drifted the moment anyone renamed a file.

**No text in any image**, enforced by the house-style line appended to all 37
prompts. Generated lettering is reliably almost-right, and an almost-right number
inside an illustration is precisely the failure this site exists to avoid.

Ten posts currently share one stock cover (`/assets/hero-aircraft-1600w.jpg`) and
one still points at an Unsplash URL. The plan replaces both.

### Topic clusters, and three hub pages
`src/lib/blogTopics.ts` defines three clusters. Membership comes from each post's
`category`, so there is one taxonomy and it cannot drift; `order` fixes a reading
sequence, which is not the publication order.

| Hub | Posts |
|---|---|
| `/blog/topic/dgca-exams` | 6 — subjects, fees, validity, OLODE, misconceptions, BVC |
| `/blog/topic/licences-and-eligibility` | 3 — CPL after 12th, ATPL, foreign conversion |
| `/blog/topic/choosing-training` | 3 — ground classes vs self-study, choosing classes, choosing an FTO |

Posts were re-categorised to match. The old labels were not clusters: `DGCA` held
eight unrelated pages while `Training` held one.

**Careers gets no hub.** It has two posts and one of them is deliberately out of
the sitemap, so a hub there would be a thin page with a nice name. It stays a
labelled group on the listing, and the listing names it after its own category
rather than calling it "More".

Each hub carries orientation prose, the cluster's posts in reading order, the
sourced facts the cluster settles between them, and the documents those facts came
from. **No new claims:** the facts panel is assembled from `keyFacts` the posts
already carry.

### Schema
`CollectionPage` + `ItemList` per hub, with the reading order as positions, and a
breadcrumb that goes Home → Blog → topic rather than walking `/blog` and
`/blog/topic`, neither of which resolves.

**No `FAQPage` on the hubs, on purpose.** Every question in a cluster is already
answered and marked up on the post that answers it. Repeating that markup would
offer two pages as the source of one answer.

### Render gate
Three `routeMeta.ts` entries, which is what makes the hubs prerender and get
advertised — the gate, the sitemap and the prerenderer all read that one file.
**Sitemap 63 → 66.** Feed stays 13: a hub has no date, no author and no body of
its own, so it does not belong in RSS. `renderGate.test.ts` was amended to say
that in one place and now also fails if a hub ever drops out of routeMeta or the
sitemap.

### Post pages
A topic ribbon under the breadcrumbs ("DGCA exams · Part 2 of 6"), previous/next
within the cluster, and a **Sources** block listing every document the page's
figures trace to. That block is generated from `keyFacts`, so it cannot claim a
source the page does not actually cite.

### Presentation
A gradient masthead on the listing and the hubs with a real stat strip — articles,
topics, primary documents cited — every number derived from the data rather than
written down. Cards got a topic accent, a category label and a hover lift. Icons
are three inline SVGs; no icon library, no new font, no new dependency.

### Search terms
Hub H1s are separate from their nav labels so they can carry the terms people
actually search: *DGCA exam guide*, *pilot licence eligibility in India*, *DGCA
ground classes and flying schools in India*. The listing H1 leads with DGCA exams,
CPL and pilot training in India. The `/blogs` title and description were rewritten
from "Aviation Blogs" to name what the section covers.

The hubs were added to `llms.txt` with a line each — the AI-facing index now has
three entry points that group fourteen pages by subject instead of listing them
flat.

**What was not done:** no keyword was inserted into a sentence it did not belong
in, and no volume figure is claimed anywhere. Head terms went into headings and
titles, which is where they earn their keep.

**120 tests passing, `vite build` green, sitemap 66, feed 13, lint 0 errors.**

## 2026-09-05 — Blog experience rebuild

Presentation regenerated; content conventions untouched. The complaint was that
sourced pages still read like plain text, and it was fair.

### W1 — Editorial design system
`src/components/blog/EditorialKit.tsx` and `src/lib/articleHtml.ts`, plus article
typography in `src/index.css`. Every colour is a token, so the pages follow the
theme instead of pinning one palette; interactive targets are 44px.

**The sanitiser was not touched.** Heading anchors for the table of contents are
the obvious reason to add `id` to the allow-list, and that would let post content
name DOM properties — the clobbering class of bug. The ids are generated
downstream instead, from each heading's own text, after sanitisation. Same
anchors, none of the surface, both DOMPurify copies still character-identical.

**FAQs now render as native `<details>` accordions from the `faqs` array**, which
makes the array and the visible text one object rather than two copies. The
answer is in the served HTML whether the accordion is open or shut, so a crawler
reads it without running a script. `prepareArticle` lifts the generated FAQ block
out of the body by matching its own text, and keeps whatever follows.

Tables were promoted to primary content — bordered, with a header band and their
own scroll container so a comparison table can never make the page scroll
sideways on a phone. Ordered lists render as numbered steps. Measure is 68ch.

### W2 — Blog detail template
Rebuilt on the kit. Database-path posts keep the plain layout: the editorial
treatment reads as a claim about how carefully a page was checked, and that claim
is only true for posts sourced in this repo.

**Post pages had no header and no footer.** Every blog post was a dead end with
no site navigation at all — added.

The hero is text-first and the cover image is lazy, which moves LCP from an image
to the H1.

### W3 — Blog listing
Featured post chosen by search value rather than recency (a `featured` flag;
`/blog/dgca-exam-fees` carries it). Category filter chips replace the client-side
search. Everything renders in the prerendered HTML — the filter only hides what is
already there, so a crawler and a visitor without JavaScript see the full list.

### W4 — Depth pass
`keyFacts` on ten posts, three to four each, rendered as React text so the field
never becomes markup and never reaches the sanitiser. Each carries the document
it came from, linked where a stable URL exists. **Every figure was checked back
against the post's own body before commit** — a script traced each one, and the
run is clean.

`correction` pull-quotes on the three posts carrying the sourced corrections:
Rs 2,500 with no OLODE fee, Class Ten for the PPL, two and a half years of PPL
validity. These are the differentiator and they now look like it.

**No new claims.** Everything in `keyFacts` restates something the post already
said with a source behind it.

### `/blog/commercial-pilot-vs-airline-pilot`: still excluded, and now for a
### stated reason
The rewrite was attempted and abandoned on the material. What separates a
commercial pilot from an airline pilot is the **privileges** of each licence, and
privileges live in Schedule II — the one document still out of reach. Everything
that can be sourced today (exam subjects, the ATPL-requires-a-CPL relationship,
validity) is already covered by `/blog/dgca-exam-subjects-by-licence` and
`/blog/atpl-eligibility-india`, so writing it from banked sources would produce a
near-duplicate competing with two live pages.

It stays at 192 words, out of the sitemap and out of the feed. **Sitemap 63, not
64.** When Schedule II lands it becomes writable in an afternoon.

### Two unsourced claims removed from the blog surfaces
- `/blogs` displayed **"7+ Categories"** and **"100% Free"** as statistics. The
  category count is now derived from the posts; the other is gone.
- Every post page closed with **"Join thousands of students"**. Removed. It is
  exactly the kind of sentence the numbers policy exists to stop, and it was
  sitting under fourteen carefully sourced articles.

### One thing left for the owner to decide
The blog CTA pointed at WhatsApp on **+91 9355611996**, which is not the number in
the Organization schema, the header, the footer or `llms.txt` (`+91 9953536199`).
Rather than propagate a second number or silently switch it, the CTA now links to
`/contact`. If 9355611996 is a real second line, say so and it goes back.

### New test
`src/test/articleHtml.test.ts` — a judgement call, since this phase said new files
only for site code. It earned its place: it caught two defects during the build.
The first version of the FAQ split deleted the reference footer on every post
whose FAQ is the last section; the second lost a table's scroll wrapper. Neither
showed up in a green build. Delete it if the rule matters more than the cover.

**119 tests passing, `vite build` green, sitemap 63, feed 13.**

## 2026-09-05 — Month 3 is not writable, and final QA found a defect in my own work

### W1 — Month 3: zero posts, five skips
Every entry in the calendar's month-3 table was retried against primary sources
before being skipped. None is writable under the numbers policy:

- `dgca-vs-faa-vs-easa` — **now half-sourced.** eCFR served 14 CFR 61.129 and
  61.159 directly, so the FAA column is banked in `BROWSER-FETCH.md`. The DGCA
  column is Schedule II and the EASA column is Part-FCL; both still need a
  browser. Closest to writable of the five.
- `type-rating-india` — needs the DGCA type-rating CAR. Portal serves fetchers
  its homepage.
- `english-proficiency-pilots-india` — needs the DGCA language-proficiency CAR.
  Same portal, same result.
- `/locations/india-flying-schools` — needs the DGCA approved-FTO list URL. Same.
- `pilot-salary-india` — held by the numbers policy, not by a fetch. No airline
  publishes this and no secondary figure is citable. It stays held until the
  business has a figure of its own.

**No post was written.** Three sourced posts in month 2 and none in month 3 is the
correct output of a rule that says every figure carries a source, not a shortfall
against a calendar written before the sources were tested.

### Fetch findings, recorded in `BROWSER-FETCH.md`
- **India Code serves the whole Aircraft Rules 1937 as one PDF** and it fetches.
  Schedule II sits past the conversion limit, so it still needs a human — but the
  instruction is now "open one PDF and scroll", not "navigate the DGCA portal".
- **Two DGCA Schedule II deep links confirmed dead to fetchers** (both returned
  the homepage), matching the 2026-08-22 finding for the Pariksha deep links.
  Both URLs are recorded — they are worth opening in a browser.
- **A `SOURCE-INDEX.md` assumption is wrong.** The Pariksha "Syllabus" PDF was
  expected to unblock the four per-subject exam guides. Its content is a pointer:
  *"Refer latest CAR, Section-7, Series-B"* — a document we already hold. Those
  four topics may be writable without any fetch at all, and the poppler install
  that file recommends buys less than it claims.

### W7 — Final QA, and the defect it found
Parity re-run across all 14 posts by importing the module rather than grepping it.
seoTitle ≤ 60: clean. Description ≤ 155: clean. **Orphan FAQ entries: zero.**

But the reference footer added in the 2026-09-05 convention pass was missing from
**five** posts, including **the three month-2 posts written the same day**. The
earlier "missing 0" claim came from a check that only looked at the nine posts the
pass had edited — it verified the edit, not the invariant. That is the same class
of error as the orphan schema: the check agreed with the intent instead of
testing the rule. Footer added to all five; parity re-run from the module, clean.

`/blog/commercial-pilot-vs-airline-pilot--whats-the-difference` has no FAQ section
at all. It is 192 words and the sitemap generator already declines to advertise
it, so it emits no schema and orphans nothing. Left alone and recorded: it is a
thin legacy page needing a rewrite, not a convention violation.

Sitemap 63 URLs, feed 13 items — unchanged, as expected.

### Second fetch pass — one DGCA URL shape does work
Going after Schedule II found something better. `dgca.gov.in/digigov-portal/
Upload?flag=iframeAttachView&attachId=<id>` **serves real CAR PDFs to a fetcher**;
`?dynamicPage=` and `?page=` return the homepage. Two CARs were read cold through
it — Section 7 Series 'B' Part VI (ATPL exam syllabus, 16 Jun 2011) and Section 7
Series 'J' Part III (FDTL, Rev 1, 8 Jan 2024).

**This changes the ask.** The owner no longer transcribes figures out of DGCA
documents — they copy the frame URL of a document they have open and send that.
Recorded in `BROWSER-FETCH.md` with the two working URLs as examples.

Three `SOURCE-INDEX.md` entries were also corrected: the Pariksha "Flight Crew
MANUAL" is the portal's **user manual**, the "Reference Book – FC" is a **study-
material list**, and the "Syllabus" PDF is a pointer to CAR 7-B-I. Three of that
file's four highest-value blocked PDFs are worth less than it estimated.

Medical retargeted: the validity figures are in **Rule 39C of the Aircraft
Rules**, not a CAR.

Schedule II is still unreachable — India Code's and the Ministry's copies both
fetch and both stop before the schedules, a length limit rather than a block.

### Third pass — Rule 39C found, read, and not usable
The prompt asked whether the rules text was already in hand. It was not: the
fetcher answers a question against a page, it does not hand over or save a
document, so nothing had been banked. But the point held — the rules precede the
schedules, so the part that converts is the part 39C lives in. The Ministry of
Civil Aviation's copy of the Aircraft Rules was re-read and **Rule 39C came back
in full**, table and sub-rules.

**It is banked and it is not citable**, for two independent reasons:

- **Stale.** The latest amendment visible anywhere in it is **GSR No. 11(E) dated
  10-01-2011**. Fifteen years of possible amendment unaccounted for.
- **Badly scanned.** The OCR renders "1937" as "1997" and "39C" as "29C" — and, in
  the clause that matters most, the item references in sub-rule (5) as
  **"items () and (i)"**. That is the clause halving medical validity after age
  forty, which is where every "Class 1 medical validity after 40" search lands.
  The obvious reading is the two twelve-month categories. The obvious reading is
  not a source.

Banked at `drafts/research/aircraft-rules-1937-moca-copy-2026-09-05.md` with the
garbles preserved rather than tidied, because a cleaned-up transcript of a bad
scan is a fabrication with good manners.

**What it bought:** the medical page is no longer blocked on a document hunt. It
is blocked on two specific facts from one rule on one page — which items sub-rule
(5) names, and what amendment the copy is current to. `BROWSER-FETCH.md` item 3 is
rewritten accordingly, and item 1 answers both for free, since Schedule II and
Rule 39C are in the same maintained document.

India Code served that document cleanly this morning and then began failing
robots.txt with connect timeouts. **Retry it before assuming a browser is needed.**

### Method change, ratified
`BROWSER-FETCH.md` now asks for **URLs, not transcribed text**: a CAR's frame
address (`Upload?flag=iframeAttachView&attachId=…`), or a PDF saved into the repo
folder. Documents read through an `attachId` URL are **archived into
`drafts/research/` at read time** — those tokens are of unknown stability, so the
public URL goes in the citation and the saved copy is the source of record.

### Nothing writable remains
No workstream in this phase had its trigger filled: mailbox word, snapshot path,
Render logs, analytics decision, fetched sources and the privacy/terms worksheet
were all blank. Those six workstreams are untouched and waiting.

## 2026-09-05 — Month 2 (three of six), convention fixes on the older posts

### W1 — Month 2, static path only
Three entries written into `src/lib/blogData.js`, sourced from CAR 7-B-I and the
DGCA Pariksha Flight Crew FAQ — the same two documents month 1 was built on.

- **`/blog/cpl-eligibility-after-12th`** — 957 words, 6 FAQs. The load-bearing
  point: CAR 7-B-I asks for 10+2 with **Physics and Mathematics**, which is not
  the same as PCM, and names no maximum age. Both are asked constantly and
  answered wrongly almost everywhere, including by people selling courses.
- **`/blog/dgca-exam-attempts-and-validity`** — 843 words, 6 FAQs. Attempts, the
  2.5-year PPL / 5-year CPL–ATPL validity split, and the non-refundable Rs 2,500
  per paper. Rs 10,000 appears once as four papers × Rs 2,500, shown as the
  arithmetic it is rather than as a published figure.
- **`/blog/foreign-licence-conversion-checklist`** — 854 words, 6 FAQs. Currency
  stated as 10 hours PIC in the preceding 24 months.

All three: title ≤ 60, description ≤ 155, visible FAQ generated from the `faqs`
array, zero orphan schema.

**Three entries skipped, not stubbed.** `dgca-class-1-medical-guide`,
`rtr-a-exam-guide` and `pilot-training-cost-india` are each gated on a
`BROWSER-FETCH.md` item that has not landed. A stub would put a thin URL into the
sitemap and into the feed on the strength of a topic name — that is exactly the
page an AI Overview quotes back with nothing behind it. Month 2 is three posts,
and that is the correct outcome, not a shortfall.

### W2 — Convention fixes on the pre-month-1 content
The month-1 review found orphan FAQ schema on the six new posts and fixed it
there. Applying the same check to everything older found the same defect,
worse, on posts that have been live for weeks:

- **`how-to-choose-a-flying-school-in-india`** — 8 FAQs in schema, **no visible
  FAQ section at all**. Generated one from the array. Description 157 → shortened.
- **`how-to-choose-dgca-ground-classes`** — 8 FAQs in schema, **no visible FAQ
  section**. Generated one.
- **`dgca-ground-classes-vs-self-study`** — 1 orphan: the visible text had drifted
  from the array. Replaced the visible section with the generated one, so the two
  are one source again. Description 158 → shortened.
- **`dgca-board-verification-certificate`** — description 169 → 144.
- **Reference footer added to 9 posts**, pointing at `/faq`, `/glossary` and
  `/editorial-policy`. Internal links from the corpus back to the three pages
  that carry the sourcing were the missing half of that structure.

Final verification across all 14 posts: **over-length descriptions 0, orphan FAQ
entries 0, posts missing the reference footer 0.** Sitemap regenerated to 63 URLs,
feed to 13 items.

### W3 — Push day
`NEXT-STEPS.md` gained a **Push day** section: the command, the gates that must
clear before it, and the live checks after it. Deliberately not a separate file —
a checklist nobody opens is the failure mode this repo already has one example of.

### Tests
**116 passing**, `vite build` green, eslint 8 warnings / 0 errors. The full
`npm run build` cannot complete in the cloud container because prerender fetches
Google Fonts and egress is blocked; that step runs on Vercel and on the owner's
Mac, where it is already green.

### Not done, by design
Nothing was created outside existing files. No report pack, no review file, no
new directory.

## 2026-09-04 — Render-gate repair, DGCA Computer Number guide, editorial policy

### Fixed: 4 finished pages that had never been crawlable
`src/lib/routeMeta.ts` — added `/courses/cabin-crew`, `/courses/ground-staff`,
`/become-a-pilot/commercial-pilot-licence`,
`/become-a-pilot/airline-transport-pilot-licence`.

**Why:** production serves a route only if `scripts/prerender.js` wrote a file
for it, and that script builds its route list from `routeMeta.ts`. All four had
full page components (2,900 lines between them), entries in `pageMeta.ts`, and
`<Route>` declarations in `App.tsx` — everything except the one line that makes
them render. Verified live: all four returned HTTP 404 while being advertised in
`sitemap.xml`. This was pure plumbing; no content was written or changed.

### New page: `/dgca/computer-number`
`src/pages/dgca/computer-number.tsx` + route + `routeMeta` + `pageMeta` +
FAQPage schema + sitemap + llms.txt.

**Why:** the header navigation has been linking to this URL on every page of the
site, and `llms.txt` listed it as a resource — both pointing at a 404. It is
also a high-intent informational query ("dgca computer number", "how to apply
for dgca computer number") with no strong Indian answer page.

Content is the finished `drafts/dgca-computer-number.md`, sourced entirely from
DGCA's own Pariksha Flight Crew FAQ (banked at
`drafts/research/dgca-pariksha-faq-2026-08-22.md`). No figure came from memory.
Answer-first opening, quick-facts table, NEW-vs-OLD comparison table, exact
photo/signature specs, 8-step process, a misconceptions section, and 14 FAQs.

**Two drafting `[CONFIRM]`s resolved by not answering them:**
- *Processing time* — DGCA publishes no timeline. The page says so and tells the
  reader to track through Candidate Login, rather than repeating the "7–14
  working days" that secondary sources assert without a source.
- *Auto-generation* — a press report describes DGCA auto-generating computer
  numbers; DGCA's own FAQ says it is not automatic. The page follows the primary
  source and this remains the item to re-check first each quarter.

### New page: `/editorial-policy`
`src/pages/editorial-policy.tsx` + route + `routeMeta` + `pageMeta` + sitemap +
llms.txt + footer link.

**Why:** CLAUDE.md rule 5 requires a real byline on every guide, and the
institutional byline "Flying Star Aviator Academics Team" has to link somewhere
that explains what it means. Shipping the article first would have put a byline
link to a 404 on a live page. It is also a direct E-E-A-T signal: an
LLM deciding whether to cite a page about examination rules weighs a visible,
specific sourcing process.

Resolved from published site facts, not invented: entity name (already in the
`Organization` schema in `index.html`), phone `+91 9953536199`, email
`flyingstaraviator@gmail.com` (the footer's address).

### FAQ schema for non-blog pages
`src/lib/schema.ts` — added an exported `PAGE_FAQS` registry and `pageFaqNode()`,
now merged into `buildGraph()` for non-blog routes. Previously only blog posts
could carry `FAQPage`.

The page component imports `PAGE_FAQS` rather than holding its own copy, so the
visible FAQ and the structured data are physically the same array and cannot
drift. Schema that carries answers a reader cannot see on the page is a
structured-data violation and Google drops the rich result for it.

### Security: `/admin` closed to crawlers
`public/robots.txt` — `Disallow: /admin` and `Disallow: /api/` added to **every**
user-agent group, not just `*`.

**Why the repetition matters:** a crawler obeys only its single most specific
matching group. The file names fifteen agents individually, each with a bare
`Allow: /`, so a `Disallow` under `User-agent: *` alone would have applied to
none of them — GPTBot, ClaudeBot and PerplexityBot included.

**This is mitigation, not a fix.** `src/pages/admin/login/page.tsx` hardcodes the
admin username and password in client-side source, which ships in the JS bundle
and is readable by anyone. Raised with the owner; fixing it means touching admin
auth, which CLAUDE.md rule 5 gates behind explicit approval.

### Routing
`vercel.json`:
- Added `blog/[^/]+` to the SPA allowlist. Blog posts were reachable only because
  `handle: filesystem` serves the prerendered file first — a post that ever
  missed prerender would have 404'd silently. Now it degrades to the SPA instead.
- Added `editorial-policy`.
- `301 /dgca/board-verification → /dgca/computer-number`. The URL was advertised
  in `sitemap.xml`, had no component and no draft, and returned 404. Board
  Verification Certificates are covered in depth in the Computer Number guide, so
  the redirect sends the equity somewhere that answers the query. Removed from
  `sitemap.xml` in the same change — a manifest should never list a URL that
  cannot be served.

### Footer
`src/components/layout/Footer.tsx` — the bottom row linked to `/privacy` and
`/terms`. Neither route exists in `App.tsx` or `routeMeta.ts`, so both were
site-wide links to 404s. Replaced with `/editorial-policy` and `/sitemap`, which
do exist. The two legal pages are drafted but blocked — see AUDIT.md §5.

### llms.txt
Expanded the Computer Number entry from one clause to a fact-dense description,
added the editorial policy, and added three new citable facts to **Key facts**
(lifetime validity and one-number-per-candidate; no maximum age and Physics +
Mathematics rather than PCM; not auto-generated on submission). These are
written as self-contained, quotable sentences because that block is what an
answer engine lifts verbatim.

### Decision recorded: no Next.js migration
The brief asked whether to migrate. Recommendation is no, and the reasoning is
in AUDIT.md §8. Short version: the Puppeteer prerender already emits full static
HTML per route, so rendering was never the problem — a route registry that 15
URLs were missing from was. The durable fix is to generate `sitemap.xml` *from*
`routeMeta.ts` at build time so a URL can never be advertised without being
rendered. That is queued as P3.

---

## 2026-09-04 (later) — Location model corrected, five pilot-training pages built

### Location pages rebuilt on the real business model
`src/pages/Locations.tsx`, `routeMeta.ts`, `pageMeta.ts`, sitemap, llms.txt.

The page published centre counts — 3 Delhi, 2 Mumbai, 2 Hyderabad, 4 Bangalore,
8 USA, 16 India — that nothing else on the site supports. Owner confirmed the
model: **Dwarka is the head office; everywhere else is a partner or affiliate
relationship.** Every count is gone and must not return.

Each city page now opens by stating plainly whether there is a centre there
("Flying Star Aviator does not operate a centre in Mumbai"), separates the
ground-training half from the flying half, and carries verifiable context in
place of counts. This is better GEO, not just safer copy: an entity claiming
four cities while its NAP names one is precisely the ambiguity that stops a
language model resolving "Fly Star" to a single business, and a page that says
where it *isn't* is more quotable than one that pads.

Also removed `+919876543210` — a placeholder number sitting behind a "Call Local
Office" button on every city page.

All six `/locations/*` routes added to the render gate.

### Five `/pilot-training/*` pages, written from regulator documents
`src/pages/pilotTraining/topics.tsx` (component) +
`src/lib/pilotTrainingTopics.ts` (data) + routes + render gate + schema.

`/pilot-training/{ppl,cpl,maldives,sri-lanka,guide-to-conversion}` were
advertised in the sitemap, had no `:topic` handling so all five rendered the
same overview page, and 404'd in production. Owner chose real pages over
redirects.

Sources, each named on the page:
| Page | Primary source |
|---|---|
| PPL, CPL | DGCA CAR Section 7, Series 'B', Part I (Issue III, Rev 2, 13 Feb 2019) |
| Conversion, Maldives, Sri Lanka | DGCA CAR Section 7, Series 'G', Part I (Issue II, Rev 4, 9 Sep 2019) |
| Sri Lanka | Civil Aviation Authority of Sri Lanka, CPL requirements |
| Maldives | Maldives CAA, published list of approved flight training organisations |

Two facts worth owning, because the vertical states both wrongly:
- **A PPL requires a Class Ten pass, not 10+2 with Physics and Mathematics.**
  The 10+2 PCM rule is the CPL rule. Nearly every Indian training-school page
  conflates them.
- **A passed PPL paper is valid two and a half years, not five.** Five years is
  CPL and ATPL.

**What is deliberately missing:** the PPL flight-hour minimum. Every competitor
page states a number; none sources it, and Schedule II of the Aircraft Rules
1937 could not be read directly from DGCA's portal, which serves its homepage to
non-browser clients. The page says the figure is unverified and tells the reader
to get it from their FTO in writing. This is the editorial policy's first live
test and it decides against publishing.

Topic data sits in `src/lib/` rather than beside the component because
`schema.ts` builds each page's `FAQPage` JSON-LD from the same `faqs` array the
page renders. One array, two consumers, no drift.

### Test suite
- `src/test/renderGate.test.ts` (new) — asserts every `sitemap.xml` URL is
  prerenderable, that redirect sources are never advertised, and that canonicals
  match their own paths. **This is the durable fix.** The 15-dead-URL bug was
  possible because nothing connected the manifest to the gate; now the suite
  fails instead of the site.
- `src/test/vercelConfig.test.ts` — rewritten to assert routing *behaviour*
  against a set of real paths rather than pinning the allowlist regex as a
  literal string, which made every legitimate addition fail for the wrong
  reason.

28 tests passing, `vite build` green, `eslint` clean (8 pre-existing warnings,
no errors).

### Result
`sitemap.xml` advertises 50 URLs. **All 50 are now prerenderable.** At the start
of this session, 15 of 48 returned HTTP 404.


---

## 2026-09-04 (evening) — Blog publishing pipeline, quality gate, generated sitemap

### The gap
Posts written through `/admin/blog` are stored in MongoDB and served by
`/api/blogs`. `Blogs.tsx` and `BlogDetail.tsx` fetch them at runtime.
`scripts/prerender.js` did not: it built its route list from the posts hardcoded
in `src/lib/blogData.js` alone.

So an admin-published post was visible to a human — the SPA fetched it — and
invisible to every crawler: no static file, no title, no meta description, no
sitemap entry. **Fourteen posts were in that state**, twelve of them substantial
(700–2,200 words). Until the `blog/` fix earlier today they were worse than
invisible: `/blog/<slug>` fell through `vercel.json` to the 404 catch-all, so the
admin panel had not been able to publish a reachable post at all.

### The fix
`scripts/fetch-blogs.mjs` (new, runs in `prebuild`) fetches `/api/blogs`, applies
a quality gate, and writes `src/lib/blogData.remote.js`. `blogData.js` merges
that into `BLOG_POSTS`, with committed posts winning any slug collision — a
database row must never silently replace a reviewed article. Because
`routeMeta`, the schema builder, `getBlogRoutes()` and the sitemap generator all
read `BLOG_POSTS`, one merge fixes meta, structured data, prerendering and the
sitemap together.

**It fails soft.** If the API is unreachable — Render cold start, outage, an
egress-restricted build — the previously generated file is kept and the build
continues. A blog outage must not fail a deploy of the whole site.

### The quality gate, and why it exists
`blog-gate.json` holds the rules; `scripts/blogGate.mjs` holds the logic. A post
must have a title, a usable slug, at least 300 words, no duplicate slug, and no
configured spam marker. Failing posts are still served by the SPA at runtime —
they simply are not advertised to crawlers — and every decision is written to
`blog-gate-report.json` (gitignored) so nothing disappears silently.

The gate is not hypothetical. Of the fourteen live posts:
- **"Why India Needs More Pilots"** opens with a section on *"HCHCR Steel Flat
  Supplier in Delhi"*. Held back on a spam marker.
- **"Pilot Demand in India Through 2030"** had the slug
  `-pilot-demand-in-india-through-`. Leading and trailing hyphens are trimmed;
  internal double hyphens are deliberately left alone, because several live posts
  have them and changing one would break the `/api/blogs/:slug` runtime lookup.

Wiring the fetch without the gate would have put both into the sitemap.

### sitemap.xml is now generated
`scripts/generate-sitemap.mjs` builds it from `src/lib/routeMeta.ts` — the render
gate itself — plus the merged blog posts, skipping alias routes, `/admin`, and
posts with no slug or under 300 words. Hand-editing is what let the manifest and
the gate drift into fifteen dead URLs; a generated file cannot drift.
`renderGate.test.ts` now also asserts the generated header is still present.

Excluded on purpose: the legacy `/blogs/1`–`/blogs/6` URLs. Four of those
(`_id` 3–6) are the title-only stubs. They still prerender and still resolve for
anyone holding an old link — a sitemap is a recommendation, not an inventory.

### Post-deploy smoke check
`scripts/smoke.mjs` (`npm run smoke`) fetches every sitemap URL and asserts HTTP
200, and asserts that declared redirect sources return 3xx rather than 200.
Exits non-zero so CI can gate on it. This is the check that would have caught the
original defect on the day it shipped rather than weeks later.

### Tests
`src/test/blogGate.test.ts` (new, 11 cases) covers the gate against fixtures of
the real 2026-09-04 database rows, including the steel-supplier post and the
malformed slug. The gate logic is pure and lives in `scripts/blogGate.mjs`
precisely so it can be tested without the API, which is unreachable from CI
sandboxes. `renderGate.test.ts` now imports `getBlogRoutes()` instead of scraping
`blogData.js` with a regex, so it asks the same question the build does.

**40 tests passing.** `prebuild` + `vite build` green.

### Co-branding, not de-branding
`/courses/Air-india-pilot-interview` and `/courses/Indigo-pilot-interview`
carried only We One Aviation's identity — name, `weoneaviation.in`,
`info@weoneaviation.in`, `+91 9555291956`, `+91 9717977702` — on the
flystar.co.in domain, with meta titles ending "| We One Aviation".

Owner confirmed We One Aviation is also their brand and asked for Flying Star
Aviator's details to be added rather than the We One references removed. Done:
We One Aviation's contacts stay, Flying Star Aviator's NAP is added beside them,
and both pages now state that the programme is run by the two together.

Meta titles now end "| Flying Star Aviator" to match the domain. That is a
judgement call worth flagging: a page served from flystar.co.in whose title names
a different business is the single clearest way to confuse entity resolution, and
titles have no room for two brands. The body text names both. Easy to revert if
the owner prefers otherwise.

### Still open
- Admin auth — accepted as-is by the owner; see AUDIT.md §6.
- The spam row is excluded from the sitemap but not deleted from the database.
- The twelve newly-publishable posts have not been fact-checked against the
  editorial policy. They pre-date it. Worth a pass before they earn citations.


---

## 2026-09-04 (late) — Stored XSS closed, approval allowlist, content-hash pinning

### The finding that reframed the rest
`src/pages/BlogDetail.tsx:191` rendered `blog.content` through
`dangerouslySetInnerHTML`, where `blog` is the response from `/api/blogs/:id`.
No sanitiser existed anywhere in the project.

`POST /api/blogs` accepts unauthenticated writes. So arbitrary HTML could be
written to the database and executed in every visitor's browser on this origin —
**stored XSS**, live. The build-time fetch shipped that morning would have made
it worse: prerendering bakes fetched content into static files served from the
edge, so a payload would execute without any fetch at all, and be cached.

### Sanitisation, both paths
`src/lib/sanitizeHtml.ts` (runtime) and `scripts/sanitize.mjs` (build) strip
script/style/iframe/form/svg with their contents, all `on*` handlers, and unsafe
URL schemes including whitespace- and control-character-obfuscated
`javascript:`. Allowlist-based, because an allowlist fails closed when a new
attack shape appears. No dependency — string operations only, so there is nothing
to keep patched. `src/test/sanitizeHtml.test.ts` asserts the two copies agree
character for character on a shared corpus.

### Allowlist replaces heuristics as the control
`src/lib/blogApproval.ts` holds `APPROVED_POSTS`. A database post is not
prerendered, not in the sitemap, and **not rendered to visitors** unless its slug
is on that list.

The previous quality gate was a filter, not a control — its rules are in this
repo, so anyone who can read them can write content that passes. `blog-gate.json`
remains, demoted in its own comment to a safety net for an approved post that has
since become malformed.

`REFUSED_POSTS` records the steel-supplier row and why, so the rejection stays
visible rather than being an absence someone later "fixes".

### Content-hash pinning
Each approval pins the sha256 of the post's `content` at approval time. If an
approved post's content later differs, `prebuild` **exits non-zero** and prints
both hashes and the remedy. An approval describes specific text; text that has
changed is not approved.

Re-approving after a deliberate edit is `npm run blogs:approve -- <slug>`.
`npm run blogs:list` shows every post as approved / NOT APPROVED / CHANGED SINCE
APPROVAL.

**Consequence, stated plainly:** `APPROVED_POSTS` ships empty, so the twelve
otherwise-publishable posts are off the live site until reviewed and approved.
That is deliberate — they pre-date the editorial policy and their figures are
unverified. The spam post is off the site for visitors too, which it was not
before.

### Fetch failure is now loud and distinguishable
A gate rejection and an unreachable API were previously both just warnings.
`blog-gate-report.json` now carries an `outcome` field (`ok` / `fetch-failed`)
with `merged` counts, and a fetch failure prints a boxed warning. `smoke.mjs`
fails on a `fetch-failed` report and cross-checks the sitemap's blog URL count
against what the build said it merged — smoke can only check URLs that ARE in the
sitemap, never the ones that should have been, so that gap needed its own check.

### Deploy hook (scoped backend change, owner-approved)
`backend/server.js` calls `VERCEL_DEPLOY_HOOK_URL` after a successful blog
create, update or delete. Unset variable is a no-op; a hook failure never fails
the write. It publishes nothing by itself — a rebuild still only picks up
approved, hash-matching posts. A nightly-rebuild workflow is documented in
DEPLOYMENT.md as the fallback. **No other backend change; auth untouched.**

### Slug bug identified, not fixed
`backend/server.js:158` runs `.replace(/\s+/g, "-")` before
`.replace(/[^\w-]/g, "")`. It never strips digits — it strips punctuation and
emoji *after* they have become hyphens, leaving the leftovers. That produces
`pilot-career-after-12th--eligibility-fees--scope` from "12th – Eligibility, Fees
& Scope", and leading/trailing hyphens where a title starts or ends with a
symbol. **A code bug, not manual entry.** The one-line fix is outside the
approved backend scope, so it is recorded in DEPLOYMENT.md §7 rather than
applied.

### Tests
58 passing. New: `sanitizeHtml.test.ts` (11), `blogApproval.test.ts` (7) —
covering an empty allowlist publishing nothing, an approved post publishing, and
an approved post whose content drifted being refused with both hashes reported.


---

## 2026-09-04 (night) — Direct-URL gap closed, sanitiser replaced, slug fix

### The direct-URL question, answered precisely
The review asked whether an unapproved post is still reachable at its own URL,
since the runtime filter was described as living in the listing.

**Checked: the detail route already enforced it.** `BlogDetail.tsx` gates on
`isApproved(data.slug)` before accepting an API response and falls back to the
committed posts, so an unapproved post renders "Article Not Found" and never
shows its text. Arbitrary content was not publishable via direct link.

**But the review was right that it was not properly closed**, for a reason
neither of us had named: that page returned **HTTP 200**. A soft 404. Google can
index a 200, and an externally linked spam URL would have looked like a live page
on this domain.

Two changes:
- `vercel.json` no longer routes `/blog/<slug>` to the SPA. A blog post is served
  only if prerender wrote a file for it, which happens only for approved posts —
  so an unapproved slug now gets a **hard 404 from the edge**. Failing closed
  costs one thing: an approved post that fails to prerender 404s rather than
  degrading to a client render. `renderGate.test.ts` and `smoke.mjs` exist to
  catch that first.
- The legacy `/blogs/<id>` form stays routed to the SPA so old links resolve, and
  its not-found state now carries `<meta name="robots" content="noindex,nofollow">`.

### The sanitiser failed its own bypass suite, and was replaced
`sanitizeBypass.test.ts` covers mutation XSS via recontextualised containers
(noscript, style, template, svg, math), `srcdoc`, `xlink:href`, `data:` URIs,
obfuscated schemes, malformed tags, `formaction`, comment-hidden payloads and
`base`/`meta` redirection — written to fail, against **both** copies.

The hand-rolled sanitiser passed all of it except one vector:

```
<img src=x onerror=alert(1)//
```

An unterminated tag. A regex needs a closing `>` to recognise a tag, so this
passed through as "text" — and the browser's parser then recovers it into a live
`<img>` as soon as any later `>` appears in the document. With an open write
endpoint, an attacker controls what follows.

Per the standing rule, this was **not patched**. Both copies now use
**DOMPurify** — `src/lib/sanitizeHtml.ts` in the browser, `scripts/sanitize.mjs`
over a jsdom window at build time, same config. DOMPurify parses with the same
engine that will render, so this entire category is gone rather than narrowed.

The bypass suite stays. Its job now is to catch a bad config, and to fail loudly
if anyone swaps this back for something clever. All 70 tests pass.

### Backend slug fix (approved, one line)
`backend/server.js` now strips non-alphanumerics **before** hyphenating, then
collapses and trims:

| Title | Before | After |
|---|---|---|
| `12th – Eligibility, Fees & Scope` | `12th--eligibility-fees--scope` | `12th-eligibility-fees-scope` |
| `✈️ Pilot Demand … 2030 🚀` | `-pilot-demand-…-` | `pilot-demand-in-india-through-2030` |

**Affects new posts only.** Slugs already stored are unchanged; the two damaged
rows are repaired in the audit pass.

### Backend endpoint audit (report only, no changes)
Every endpoint in `backend/server.js` is unauthenticated. Beyond the blog write
routes already known:

- `DELETE /api/blogs/:id` — any post permanently deletable by anyone, and no
  backup exists.
- `GET /api/contacts` — returns **every** contact-form submission: name, email,
  phone, interest, message. Personal data under India's DPDP Act, 2023, readable
  by anyone who requests the URL.

The CORS allowlist at `server.js:64` does not mitigate either. CORS governs what
a *browser* will let a page read cross-origin; it has no effect on `curl` or any
server-side request, and was never an access control.

Reported to the owner 2026-09-04. No change made — the standing auth decision
covers the blog admin panel, and `/api/contacts` is the owner's call to weigh
separately.


---

## 2026-09-04 (late night) — Two routes removed, manifest widened

Removals, not access control. No auth middleware was added, the admin login flow
and password are untouched, and `POST /api/contact` and `POST`/`PUT /api/blogs`
are unchanged.

### `GET /api/contacts` removed
Returned every contact-form submission — name, email, phone, interest, message —
to anyone who requested the URL. **Nothing in the frontend called it**, verified
by grep across `src/`, `api/` and `index.html`, so it was deleted rather than
protected.

That absence raises its own question, recorded here because it needs answering:
if no code reads this route, how have enquiries been reaching anyone? Either they
are read straight from the database, or they are not being read at all.

Full incident record, including the DPDP position and the outstanding
log check, is in AUDIT.md §6.

### `DELETE /api/blogs/:id` disabled
Now answers 405. Unauthenticated, it let anyone permanently erase the posts
collection, with no backup in existence. Its only caller was the admin panel's
delete button, removed in the same commit. 405 rather than deletion, so an old
client gets a clear refusal instead of a confusing 404.

### The manifest was pinning too little
An approval pinned a hash of `content` only. But `title` renders as the H1 **and**
the meta title, `excerpt` as the meta description, `coverImage` as the hero and
OG image. `PUT /api/blogs/:id` is unauthenticated — so swapping an approved
post's headline put attacker-chosen text on the site **without tripping the
alarm**. A real gap in a control that had been described as complete.

`postHash()` now covers `slug`, `title`, `excerpt`, `content`, `coverImage` and
`category`, in fixed order and length-prefixed. The length prefixes matter: without
them, moving characters from the end of one field to the start of the next leaves
the concatenation, and therefore the hash, unchanged.

### A vanished approved post now fails the build too
If a slug on the approval list is absent from the API response, `prebuild` exits
non-zero with the same loudness as a hash change. `DELETE` was open until today,
and a post disappearing between builds is exactly what that looks like — a
silently shrinking sitemap would have hidden it.

`contentHash()` is kept and marked deprecated so an approval file written under
the old scheme fails loudly rather than mismatching quietly. `APPROVED_POSTS` is
still empty, so there is nothing to migrate.

75 tests passing, including boundary-shift resistance and per-field tamper cases.


---

## 2026-09-04 — Content engine month 1, enquiry notifications, analytics loader

Four workstreams. Full detail in `CONTENT-CALENDAR.md`, `docs/ANALYTICS.md` and
`IDENTITY-SHEET.md`; this is what changed and why.

### W1 — Enquiry notification email
`POST /api/contact` now sends one notification per enquiry.
`backend/notifyEnquiry.js` posts to Resend over `fetch`, so it adds no
dependency. Fire-and-forget with an internal catch: the enquiry is already saved
when it runs, and a mail outage must never turn a captured lead into an error
page. Unset env vars mean a complete no-op — same pattern as the deploy hook, so
deploys work before anything is configured.

**Why this exists:** the read path for enquiries did not. `GET /api/contacts` was
removed as a PII exposure, and nothing in the frontend had ever called it. 26
enquiries had accumulated with no mechanism telling anyone. This is that
mechanism.

`backend/enquiryGuard.js` adds the two guards the endpoint needs while staying
public: a honeypot field (`company`, named plausibly — a bot that skips obviously
fake field names still fills a plausible one) and a per-IP rate limit, 5 per 10
minutes, in memory. In memory is deliberate: a shared store means another
dependency and another service for a form taking a handful of enquiries a day.
A honeypot trip answers 201, not an error — telling a bot it was detected teaches
it which field to leave alone.

Both forms render the honeypot off-screen rather than `display:none`, which some
bots detect.

`timeoutSignal()` falls back to `AbortController` where `AbortSignal.timeout` is
missing — found by a test, and a real robustness gap rather than a test artifact.

### W2 — Analytics loader, dormant
`src/lib/analytics.ts` supports GA4 and Plausible, selected by
`VITE_ANALYTICS_PROVIDER` and `VITE_ANALYTICS_ID`. With neither set it injects no
script, makes no request and writes no cookie — the tests assert exactly that,
because "off" has to mean nothing loads, not a tag that fails.

Injection is on `requestIdleCallback` after first paint, so it cannot enter the
LCP window. Half a config (provider without ID) is treated as off rather than
loading a broken tag.

`docs/ANALYTICS.md` is the honest comparison and the two variables to set. It
recommends Plausible unless budget decides it — the GSC integration is GA4's only
real advantage here, and against it sits a consent banner, a longer privacy
policy and a processor to name. **The choice stays the owner's; the code prefers
neither.**

### W3 — Content, month 1
Eight entries, all shipped. Six as blog posts, plus an FAQ hub and a glossary.

Blog posts rather than the `/dgca/` paths first sketched: that path already
carries BlogPosting and FAQPage schema, and flows into the sitemap, the feed and
`llms.txt` with no per-article component. `/dgca/board-verification` now 301s to
the post that answers it rather than to the nearest-adjacent guide.

The FAQ hub and glossary are formats the site lacked. Both are pure aggregation —
the hub introduces **no** fact that is not already sourced on the page it links
to, because an aggregator that invents an answer is worse than none once FAQPage
schema makes it quotable. The glossary exists because definition queries are how
answer engines resolve entities, and terms like *computer number*, *OLODE* and
*BVC* are Indian regulatory specifics a model has nothing else to anchor against.

Both read their questions from `src/lib/faqHub.ts` and `src/lib/glossary.ts`,
which `schema.ts` also reads — one source, two consumers.

**The correction this batch forced.** Writing the fees page meant checking the
number against DGCA rather than against our own pages. DGCA's Flight Crew FAQ
states **Rs 2,500 per paper** and publishes **no OLODE-specific fee**. We had
Rs 5,000 on three live pages, and on one of them footnoted to the very DGCA page
that does not contain it.

Corrected across `blogData.js`, `llms.txt` Key facts and `SEO.md`, and now stated
as what it is: Rs 2,500, non-refundable, no published OLODE fee, and the
Rs 5,000 figure named as unsourced. The pages say plainly that the portal is the
authority and not to budget from a blog, ours included.

Posts run 550–670 words against calendar targets of 900–1,700. That is
deliberate. Padding a sourced page to a word count is precisely how unsourced
sentences get written. Length is an output of the material.

### W3b — Plumbing
- **RSS feed** at `/feed.xml`, generated by `scripts/generate-feed.mjs` in
  `prebuild` from the same `BLOG_POSTS` everything else reads. Discovery link in
  `index.html`, route in `vercel.json`, noted in `robots.txt`.
- **Verified automatic:** all eight new entries appeared in the generated sitemap
  with no manual step. The plumbing needed no fixing, which was the thing to
  confirm.
- **Render-gate coverage extended:** `/faq`, `/glossary` and `/editorial-policy`
  must be in `routeMeta`; the feed must keep its generated header; and every blog
  URL in the sitemap must also be in the feed.
- OG and Twitter cards already derive per-post from `coverImage` via `useMeta`.

### W4 — Identity sheet, and one fix
`IDENTITY-SHEET.md` reports every identity string: 5 name variants, 3 email
addresses, 5 phone numbers, and a consistent address. Report only — except one.

**`+91 9876543210` was live on seven pages**, behind "Talk to Counselor" and
"Talk to Expert" buttons, including `/courses/cpl` and `/courses/atpl` — the two
highest commercial-intent pages on the site. It is the canonical placeholder
mobile number. Anyone ready to enrol who tapped that button called nothing.

All seven now use `+91 9953536199`, the number already in the Organization
schema, header, footer, contact page and `llms.txt`. **Not an entity decision:**
no new value was chosen and no frozen surface was touched — a placeholder was
replaced with the site's own declared number. The same placeholder was removed
from the location pages earlier today; this pass found the rest.

Left alone and reported: two unexplained numbers on the ATPL page, and a blog
WhatsApp number differing from the site's. Both may be real second lines.

### Tests
**113 passing**, build green, lint clean. New: `enquiryGuard.test.ts` (15),
`analytics.test.ts` (8), plus render-gate and vercel-config additions.

Test runs moved to an isolated clone in the cloud container. The device VM shares
`node_modules` with the owner's Mac through the folder mount, so installing there
replaced macOS binaries with Linux ones and broke their local build. That will
not happen again.


### Review pass (same day) — two defects found before merge

Preparing the fact-check pack found two things the writing pass missed. Both are
fixed in the working tree; `REVIEW-MONTH-1.md` is the artifact.

**Orphan FAQPage schema.** All six new posts emitted `FAQPage` structured data
from their `faqs` array while rendering **none of it on the page**. The site's
existing convention embeds the FAQ visibly inside `content` and mirrors it in
`faqs`; the new posts had only the array. Schema asserting answers a reader
cannot see is a structured-data violation and breaks the rule this repo documents
in SEO.md §5.

Fixed by generating each post's visible FAQ HTML **from its own `faqs` array**, so
the two remain one source rather than two copies. Verified verbatim afterwards
across all six: zero orphans. Word counts rose to 744–938.

**Four meta descriptions over 155 characters** (160–169). Shortened.

Both were found by demanding evidence rather than restating intent — the review
asked for a figure-by-figure table and a parity check, and the parity check
failed. Worth keeping as the shape of future content review.


---

## 2026-09-04 (post-merge) — Salary post repaired, two shipped defects fixed

### Two defects the deploy surfaced
**Duplicate object key in `schema.ts`.** esbuild warned: `Duplicate key
"computer-number" in object literal`. Introduced in the first session by adding a
LABELS entry that already existed 20 lines below. Same value, so no behaviour
change, but it shipped. Removed; LABELS now has 50 unique keys and zero
duplicates.

**Share buttons pointed at localhost on every prerendered page.** Flagged by a
fetch of the live blog post, not by any test. `SocialShareButtons` built its URL
from `window.location.href` — and prerendering runs in a headless browser served
from `http://localhost:4173`, so **`localhost` share links were baked into the
static HTML of every prerendered page.** Hydration corrects it for a visitor with
working JS; crawlers and answer engines read the static HTML, and so does anyone
whose JS is slow or blocked.

Now built from `SITE_ORIGIN` plus the live pathname. The pathname was always
right; only the origin was wrong. Pre-existing, not from this batch.

### W1 — `/blog/air-hostess-salary-in-india-2026` repaired
Same slug, same URL, `dateModified` bumped, no redirect.

**What we tried first:** sourcing the figures. No Indian airline publishes cabin
crew pay. Air India's own cabin crew careers page states only *"competitive
salary: attractive compensation package with performance-linked incentives"*. The
job posting carries no figure. Search returns aggregator sites (self-reported,
unaudited) and training institutes (selling courses). There is no primary source
to cite, for any airline.

So under the numbers policy the airline-by-airline tables — Air India, IndiGo,
Vistara, Akasa — are **deleted, not softened**. Rupee figures on the page: zero.

What replaced them is sourced and, we think, more useful:
- What cabin crew pay is **made of** — base, flying allowance, layover allowance,
  international component — which holds across carriers even though amounts do
  not, and explains why any single monthly figure misleads.
- **Air India's published eligibility**, in full and cited: nationality, age
  bands, Class 12 with 50%, height, BMI, vision, tattoos, languages, experience,
  basing. This is what the airlines *do* publish.
- How to read the figures found online, by source type — including naming our own
  incentive as a training institute, which is exactly why the page carries none.
- Five questions to ask before accepting an offer, which actually determine pay.

The page now opens by saying no airline publishes this and explains why the
previous version's tables were removed. 1,196 words, 6 FAQs, zero orphans.

**Judgement call, flagged:** this is a large character change to an indexed page
targeting a high-volume commercial query. It may lose traffic that wanted a
number. It cannot lose credibility, and being quoted by an AI Overview on
invented salary tables was the likeliest way this campaign could damage the
business it is meant to help.

### W2 — `BROWSER-FETCH.md`
Six held items converted into two-minute tasks: exact URL, what to find, what to
copy, which pages it unblocks, ordered by value. Item 1 (Schedule II) alone
unblocks three live pages.

Item 6 is the one worth noticing: the cost page is blocked on *any* citable
figure, and the business is itself a school — a fee Flying Star publishes about
Flying Star is primary-sourced by definition. It is the only item on the list
that can be created rather than found.

### W3 — Month 2 detailed
Six entries, checked against all 60 live URLs: **zero slug or primary-keyword
collisions.** Three writable today from CAR 7-B-I and CAR 7-G-I; three dark until
`BROWSER-FETCH.md` items land. Cannibalization notes recorded per entry where a
pillar page targets an adjacent query.

If no browser items land, month 2 is three posts. That is the correct outcome
rather than three more written on secondary sources.

### W4 — Small wins
- **`DefinedTermSet` schema on `/glossary`**, built from the same `GLOSSARY`
  array the page renders. A `<dl>` is unambiguous to a person and ambiguous to a
  parser; this states explicitly that these are terms and these are their
  definitions. No visible change.
- `/faq` meta description 158 → 148 characters.

113 tests passing, build green, no esbuild warnings.
