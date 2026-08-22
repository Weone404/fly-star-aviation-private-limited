# GEO Entity TODO — off-site decisions
**Created 2026-08-22** from the completed W8 baseline (25/25 queries, pre-deploy).

> **Catalogue and recommendations only. No edits made, none planned from this
> file.** Every item below is an off-site property — a directory listing, a
> social profile, a company record. They are changed by logging into those
> platforms, not by editing this repo. Each needs your decision.

## Why this matters more than the on-site work
The baseline's headline number is that flystar.co.in appears on **3 of 25
queries, all of them brand queries** — and on query A4 it does not even rank
for its own domain name. A weak, fragmented brand entity is the constraint.
Answer engines assemble an entity from consistent name + address + phone
signals across independent sources. Right now those signals contradict each
other in at least seven ways.

---

## 1. Two Instagram accounts

| | |
|---|---|
| **Found** | `@flying_star_aviator` and `@flyingstaraviator` — both live, both ranking on brand queries |
| **In schema** | `sameAs` lists only `instagram.com/flyingstaraviator/` |
| **Question** | Which is canonical? Is the other yours to close or merge? |

**Recommendation:** keep the one with more followers and recent activity, make
it the only one in `sameAs`, and convert the other to a redirect-in-bio pointing
at the canonical handle rather than deleting it (deleting frees the handle for
someone else). If the second is not yours, that is a more serious problem —
tell me and it moves to an impersonation issue.

**Decision needed:** canonical handle · fate of the other

---

## 2. Justdial — at least three listings, two distinct business IDs

| Listing | ID | Name shown | Reviews |
|---|---|---|---|
| A | `…190301143042-S5J4` | Flying Star Aviator Private Limited | — |
| B | `…190301143042-S5J4` | **Flying Star Aviation Pvt Ltd** | 615 / 1201 (two pages disagree) |
| C | `…200128214509-X8N2` | **Flying Star Aviators**, categorised under *Air Hostess Training Institutes* | — |

A and B share one ID under two different names. **C is a separate listing
entirely**, under a category the business may not even serve.

**Recommendation:** claim all three through Justdial's business login, merge C
into the primary ID if Justdial permits, and rename every surviving listing to
the exact MCA legal name. Split reputation is the real cost here — review
equity divided across listings weakens all of them, and the 615-vs-1201
discrepancy suggests the platform itself is confused about which record is
canonical.

**Decision needed:** which ID is primary · is the Air Hostess category correct
· who claims them

---

## 3. `facebook.com/flyspaceaviation` — page titled "FlyingStar Aviators"

The URL slug says *flyspaceaviation*. A separate business, **Fly Space**
(`flyspace.co.in`), also ranks on the brand-review query.

| | |
|---|---|
| **In schema** | `sameAs` lists `facebook.com/flystar.co.in/` — a different page |
| **Question** | Is this page yours under an old name? A third brand? Abandoned? Or an unrelated business? |

**Recommendation:** if it is yours, rename the page and change the vanity URL to
match the canonical brand, then update `sameAs`. If it is not yours, ensure your
actual page is complete and well-linked so it outranks the lookalike. **Do not
leave a page carrying your brand name under a URL belonging to a different
brand** — that is the same fusion pattern as the We One entanglement.

**Decision needed:** ownership · rename or disown

---

## 4. Seven name variants — to be resolved against the MCA record

1. Flying Star Aviator Private Limited *(site schema, Justdial A, MCA)*
2. Flying Star Aviators *(schema `alternateName`, Justdial C, Instagram, YouTube, Internshala)*
3. Flying Star Aviation Pvt Ltd *(Justdial B)*
4. FlyingStar Aviators *(Facebook page title)*
5. Fly Star Aviation *(admin page in this repo)*
6. Fly Space Aviation *(implied by the Facebook vanity URL)*
7. We One Aviation *(two live pages — already scheduled for removal in `geo/truth-hygiene`)*

**A public company record was found this run:**
**CIN `U85499DL2024PTC435001`**, FLYING STAR AVIATOR PRIVATE LIMITED,
registered at C705, 1st Floor, Palam Extn, Ramphal Chowk, Dwarka Sec-7,
Bagdola, South West Delhi, New Delhi 110077.

**Recommendation:** treat the MCA record as canonical, exactly as you ruled.
Variant 1 appears to match it. Then: one legal name in schema, on every
directory, and on the Google Business Profile; variant 2 may remain as schema
`alternateName` only if it is genuinely used; variants 3–6 get corrected or
disowned at source.

⚠️ **Verify the CIN against mca.gov.in before acting.** RegisterKaro is a
third-party aggregator, and this is exactly the kind of secondary source the
campaign's rules say not to treat as primary.

**Decision needed:** confirm the MCA name and CIN · confirm the registered
address · approve the canonical string

### Phone numbers associated with the brand (as at 2026-08-22)
| Number | Where it appears | Whose? |
|---|---|---|
| +91 99535 36199 | site schema, Contact, Footer — 24 occurrences | Canonical? [CONFIRM] |
| 9953566619 | Contact page and Footer, printed beside the above | [CONFIRM] |
| +91 98765 43210 | "Talk to Counselor" CTA on 8 live pages | **Placeholder — clearly not real** |
| 9355611996 | WhatsApp CTA on `/blogs` | **We One's** |
| 9555291956 · 9717977702 | Air India interview page contact block | **We One's** |
| 9667370747 · 9355566991 | We One's own site | **We One's** |
| 8178366070 · 9315076787 | Internshala company profile | [CONFIRM] — new, found 2026-08-22 |
| 7428897782 · 7428897780 | R1 ATPL component | **Golden Epaulettes'** |

Twelve numbers. One of them is a well-known dummy sitting on the primary
conversion CTA of eight live pages. **Facts block item 3 resolves this.**

---

## 5. The founding-date conflict (new, and it blocks the homepage branch)

| Source | Claim |
|---|---|
| Site schema + `llms.txt` | founded **2008** |
| `/about` | "15+ Years Experience" |
| Justdial | "Established **2016**" |
| CIN `U85499DL**2024**PTC435001` | company incorporated **2024** |

These are reconcilable — a business can trade for years before incorporating a
private limited company — but only with an explanation the site does not
currently give.

**Recommendation:** decide the true trading-start date and state it precisely.
If the business began in 2008 as a proprietorship and incorporated in 2024, the
honest phrasing is something like "training pilots since 2008; incorporated as
Flying Star Aviator Private Limited in 2024." That is both accurate and more
credible than an unexplained round number.

**Decision needed:** the real date, and the wording

---

## 6. Google Business Profile

The Organization schema links a Maps CID (`5225956059607335504`), but the
baseline did not confirm which listing at the Dwarka address is the intended
one — and several competitors occupy the same micro-location.

**Recommendation:** confirm ownership of the CID, verify the profile carries
the canonical name/address/phone, and check for duplicate or unclaimed listings
at the same address. Highest-leverage single off-site action available, and
entirely under your control.

**Decision needed:** which listing is Flying Star's *(facts block item 7)*

---

## 7. Employee-count contradiction (feeds the claims-truth pass, not off-site)

Internshala lists the company at **2–10 employees**. `/about` claims 5000+
trained pilots, 50+ partner airlines and 8 training centres. These cannot all
be true simultaneously, and the contradiction is publicly visible.

**Recommendation:** resolve during `geo/homepage-accuracy` (calendar R3). Real
smaller numbers are more citable than large unverifiable ones — a specific,
checkable figure is what answer engines quote.

---

## Priority order

| # | Item | Impact | Effort | Owner |
|---|---|---|---|---|
| 1 | Google Business Profile (§6) | Highest | Low | You |
| 2 | Justdial consolidation (§2) | High | Medium | You |
| 3 | MCA canonical name (§4) | High — unblocks everything else | Low | You |
| 4 | Founding date (§5) | High — blocks homepage branch | Low | You |
| 5 | Instagram consolidation (§1) | Medium | Low | You |
| 6 | Facebook page (§3) | Medium | Low | You |
| 7 | Employee/claims (§7) | Medium | Medium | Campaign (R3) |

Items 3 and 4 gate the most downstream work: `geo/homepage-accuracy`, the
Organization schema rewrite, and every article byline that names the company.
