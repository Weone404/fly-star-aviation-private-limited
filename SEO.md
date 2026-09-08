# SEO.md — flystar.co.in
Updated 2026-09-04. Companion to `AUDIT.md` (findings) and `CHANGELOG.md` (what changed).

## 1. Entity definition — use this wording everywhere
One definition, repeated identically across the site, schema, llms.txt and every
off-site profile. Entity ambiguity is the main reason a language model declines
to name a business.

> **Flying Star Aviator Private Limited** — a DGCA CPL and ATPL **ground-training**
> institute at C705, Sector 7, Block C, Palam Extension, Dwarka, New Delhi 110077,
> operating since 2008. It also provides B2B aviation services (aircraft
> management, MRO, CAMO, charter). It operates one centre and does not own a
> flying school.

NAP, to be identical everywhere: name as above · that address · **+91 9953536199**.

**Open item:** two email addresses are in circulation —
`flyingstaraviator@gmail.com` (footer, contact popup, and now the editorial
policy) and `info@flyingstaraviator.com` (contact page). Pick one, change the
other, and use only the winner in schema and directories.

## 2. Keyword map
One primary keyword per page. No two pages target the same primary — the
cannibalisation risk here was `/courses/cpl` versus `/pilot-training/cpl`, which
is resolved by intent: ground classes versus the flying half of the licence.

### Pillar and service pages
| Page | Primary | Secondary | Intent |
|---|---|---|---|
| `/` | pilot training institute in delhi | dgca ground classes delhi, cpl coaching delhi | Commercial |
| `/courses/cpl` | cpl ground classes | dgca cpl coaching, cpl classes delhi, cpl ground school | Commercial |
| `/courses/atpl` | atpl ground classes | atpl coaching india, atpl classes | Commercial |
| `/courses/airline-preparation` | airline pilot interview preparation | pilot interview coaching | Commercial |
| `/courses/cabin-crew` | cabin crew course delhi | air hostess course delhi, cabin crew training | Commercial |
| `/courses/ground-staff` | airport ground staff course | ground staff training delhi | Commercial |
| `/dgca/ground-classes` | dgca ground classes | cpl atpl ground classes dwarka | Commercial |
| `/rtr` | rtr a exam preparation | radio telephony licence india | Mixed |
| `/services/*` | *(B2B — aircraft management, MRO, CAMO, charter, sourcing, livery, spares, consultancy)* | | Commercial B2B |

### Informational pages — the AI-citation layer
| Page | Primary | Secondary | Words |
|---|---|---|---|
| `/dgca/computer-number` | dgca computer number | how to apply for dgca computer number, dgca computer number documents, board verification certificate | ~2,000 |
| `/dgca/full-form` | dgca full form | what is dgca, dgca role | existing |
| `/dgca/medical` | dgca class 1 medical | pilot medical requirements india, class 2 medical | existing |
| `/pilot-training/ppl` | ppl requirements india | ppl eligibility, ppl vs cpl, ppl exam subjects | ~1,100 |
| `/pilot-training/cpl` | cpl flight training india | cpl 200 hours, cpl theory papers, flying school vs ground school | ~1,200 |
| `/pilot-training/guide-to-conversion` | foreign pilot licence conversion india | faa to dgca conversion, convert cpl to indian licence, dgca conversion currency | ~1,200 |
| `/pilot-training/maldives` | pilot training maldives | maldives flying school, asian academy of aeronautics | ~1,000 |
| `/pilot-training/sri-lanka` | pilot training sri lanka | caasl cpl requirements, flying school sri lanka | ~1,100 |
| `/become-a-pilot/become-pilot` | how to become a pilot in india | pilot after 12th, pilot eligibility | existing |
| `/become-a-pilot/commercial-pilot-licence` | commercial pilot licence india | cpl requirements, cpl eligibility | existing |
| `/become-a-pilot/airline-transport-pilot-licence` | atpl india | atpl requirements, 1500 hours | existing |
| `/blog/dgca-ground-classes-vs-self-study` | are dgca ground classes mandatory | dgca self study, ground classes worth it | existing |
| `/blog/air-hostess-salary-in-india-2026` | air hostess salary india | cabin crew salary | existing |
| `/blog/how-to-choose-a-flying-school-in-india` | how to choose a flying school india | dgca approved flying school checklist | existing |

### Location pages — deliberately not local-commercial
`/locations/{delhi,mumbai,bangalore,hyderabad,usa,india}` do **not** target
"pilot training in <city>" as a commercial term, because the business has one
centre. Delhi targets the real local term; the rest answer *"does Flying Star
train in <city>"* honestly and route the reader to the national route. Chasing
the commercial term in cities with no centre would be a doorway-page pattern.

## 3. The facts we own
The GEO strategy is not volume, it is being right where the vertical is wrong.
Each of these is sourced, stated in a self-contained sentence, and repeated in
`llms.txt`'s Key facts block:

| Fact | Source | Why it wins |
|---|---|---|
| PPL needs a **Class Ten** pass, not 10+2 PCM | CAR 7-B-I | Almost universally misstated |
| A passed **PPL** paper is valid **2.5 years**, CPL/ATPL five | CAR 7-B-I | Rarely stated at all |
| DGCA ground classes are **not mandatory** | CAR 7-B-I | We say it on a page selling ground classes |
| Conversion currency: **10 hrs PIC in 24 months** | CAR 7-G-I | The rule people discover too late |
| Computer number: **lifetime, one per candidate, not auto-generated** | DGCA Pariksha FAQ | Procedural depth competitors lack |
| No **maximum age** to register with DGCA | DGCA Pariksha FAQ | Corrects a common myth |
| Exam fee **Rs 2,500 per paper**, non-refundable; **no OLODE fee is published** | DGCA Pariksha FAQ 13, 14 | The Rs 5,000 OLODE figure everyone repeats has no primary source |

## 4. Per-page meta
Source of truth is `src/lib/routeMeta.ts` (which is also the render gate) with
`src/lib/pageMeta.ts` mirroring it for client-side navigation. Rules in force:
titles ≤ 60 characters with the primary keyword front-loaded; descriptions ≤ 155
characters carrying the keyword and a reason to click; canonical on every route;
aliases resolved through `ALIAS_CANONICAL` in `src/lib/routes.ts`.

## 5. Structured data
`src/lib/schema.ts` emits an `@graph` per route referencing the site-wide
`Organization` and `WebSite` nodes in `index.html`.

| Node | Where |
|---|---|
| Organization, WebSite | `index.html`, site-wide |
| BreadcrumbList | every route |
| Course | `/courses/*` |
| Service | `/services/*` |
| WebPage | everything else |
| BlogPosting | `/blog/<slug>` |
| FAQPage | blog posts with FAQs, `/dgca/computer-number`, all five `/pilot-training/*` topics |

**Rule that must not be broken:** FAQ schema is generated from the same array the
page renders. `PAGE_FAQS` in `schema.ts` and `PILOT_TRAINING_TOPICS` in
`pilotTrainingTopics.ts` are the single sources. Never hand-write a JSON-LD
answer that is not visible on the page.

## 6. Tracking plan
**No analytics is currently installed.** `index.html` contains no GA4, GTM, Meta
Pixel or Clarity tag. Nothing on this site is measurable today — this is the
largest gap after the security item.

Install, in this order:
1. **Google Search Console** — verify, submit `https://www.flystar.co.in/sitemap.xml`, then use the Removals/Coverage report to confirm the 15 previously-404 URLs are being re-crawled.
2. **GA4** — and update `/privacy-policy` to name it, once that page ships.
3. **Bing Webmaster Tools** — feeds Copilot.

Then watch monthly:

| Metric | Where | What good looks like |
|---|---|---|
| Indexed pages | GSC Coverage | Rising toward 50; zero "Not found (404)" from the sitemap |
| Impressions on the 7 owned facts | GSC, query filter | Growth on "dgca computer number", "ppl requirements", "licence conversion" |
| AI citations | Manual prompt set in `GEO_QUERIES.md` | flystar.co.in named in ChatGPT / Perplexity / AI Overviews answers |
| Position for `dgca computer number` | GSC | Top 10 within 90 days |
| CTR on informational pages | GSC | Above 3% — if lower, the meta description is the lever |

Re-run the `GEO_QUERIES.md` prompt set monthly and log results in `GEO_LOG.md`.
Baseline first, before the re-crawl lands, or the improvement is unmeasurable.
