# IDENTITY-SHEET.md — every identity string in circulation
Compiled 2026-09-04. **Report, not a change set** — except one fix noted below,
which was a broken placeholder rather than an identity decision.

This is the pre-decision artifact for the brand/email/entity call and for Google
Business Profile setup. GBP requires one name, one address, one phone, and will
cross-check them against the site. Today the site cannot answer that
consistently.

---

## 1. Business name — 5 variants

| Variant | Occurrences | Where |
|---|---|---|
| **Flying Star Aviator** | 169 | Everywhere — headers, footers, page copy, meta titles |
| **Flying Star Aviator Private Limited** | 13 | Organization schema, llms.txt, editorial policy, legal-ish contexts |
| **Fly Star Aviation** | 8 | Admin console titles, some blog meta defaults |
| **Flying Star Aviators** *(plural)* | 1 | `alternateName` in the Organization schema |
| **FlyStar** | 1 | Incidental |

**Conflict:** the domain is `flystar.co.in`, the schema entity is *Flying Star
Aviator Private Limited*, and the dominant on-page name is *Flying Star Aviator*.
None of these is wrong, but GBP wants one, and the closer the GBP name is to the
schema `name`, the cleaner the entity resolves.

**Note:** *Fly Star Aviation* appears in blog meta defaults (`"… | Fly Star
Aviation Blog"`), so some blog titles carry a different brand from the rest of
the site.

---

## 2. Email — 3 addresses, and a split

| Address | Surfaces |
|---|---|
| **flyingstaraviator@gmail.com** | Footer, contact popup, editorial policy, both interview pages |
| **info@flyingstaraviator.com** | Contact page only |
| **info@weoneaviation.in** | Both interview pages (We One Aviation's own address) |

**Conflicts:**
1. The contact page shows a **different address from the footer** on the same
   page load.
2. `info@flyingstaraviator.com` is on the **`.com` domain**, while the site is
   `.co.in`. Nothing in the repo verifies that mailbox receives.
3. The two interview pages carry **two organisations' addresses side by side** —
   intended, since both are the owner's brands, but it means those pages present
   two contact identities.

**This is the decision the mailbox test settles.** Once chosen, the standardising
pass covers: `Footer.tsx`, `Contact.tsx`, `Contactpopup.tsx`,
`editorial-policy.tsx`, both interview pages, `llms.txt`, and the Organization
schema in `index.html`.

---

## 3. Phone — 5 numbers, one of them fake

| Number | Where | Status |
|---|---|---|
| **+91 9953536199** | Header, footer, contact page, popup, CTA, floating buttons, schema, llms.txt, routeMeta, pageMeta | **Canonical** |
| **+91 7428897780 / +91 7428897782** | `/become-a-pilot/airline-transport-pilot-licence` | Unexplained. Two numbers on one page, nowhere else on the site |
| **+91 9555291956 / +91 9717977702** | Both interview pages | We One Aviation's numbers — intended under co-branding |
| **wa.me/919355611996** | `/blogs` and `/blog/<slug>` WhatsApp buttons | Differs from the canonical WhatsApp number used by the floating buttons (`919953536199`) |
| **~~+91 9876543210~~** | 7 pages | **FIXED — see below** |

### The one thing changed in this pass
`+91 9876543210` is a placeholder — the canonical "example" mobile number. It was
live behind **"Talk to Counselor"** and **"Talk to Expert"** buttons on:

- `/courses/cpl`
- `/courses/atpl`
- `/courses/airline-preparation`
- `/courses/ground-staff`
- `/courses/Indigo-pilot-interview`
- `/become-a-pilot/become-pilot`
- `/pilot-training`

Two of those are the highest commercial-intent pages on the site. A visitor ready
to enrol tapped the button and called a number that does not exist.

All seven now point at `+91 9953536199`, the number already published in the
Organization schema, the header, the footer, the contact page and `llms.txt`.
**This is not an entity decision** — no new value was chosen, and no frozen
surface was touched. It replaced a placeholder with the site's own already-declared
number. The same placeholder was removed from the location pages on 2026-09-04;
this pass found the rest.

**Still open for the owner:** the ATPL page's two numbers and the blog WhatsApp
number. Both may be real second lines, so they are reported, not changed.

---

## 4. Address — consistent

| Surface | Value |
|---|---|
| `index.html` (schema + visible) | C705, Sector 7, Block C, Palam Extension, Dwarka, New Delhi 110077 |
| `llms.txt` | Same |
| Location pages | Same |
| Contact page | Same |

No conflict. This is the one identity element already consistent, and it should
be the anchor for GBP.

---

## 5. What GBP will need

| Field | Recommended | Blocked on |
|---|---|---|
| Name | Match the schema `name` exactly | The brand decision |
| Address | C705, Sector 7, Block C, Palam Extension, Dwarka, New Delhi 110077 | Nothing — ready |
| Phone | +91 9953536199 | Nothing — ready |
| Website | https://www.flystar.co.in | Nothing — ready |
| Email | — | The mailbox test |
| Category | A pilot-training / aviation-school category | Nothing |

Two of six are blocked, and both resolve from the same decision.

---

## 6. Recommended order
1. **Test the mailbox.** Send to `info@flyingstaraviator.com` from any account. Delivery or bounce decides the canonical address.
2. **Pick the customer-facing name.** Whatever is chosen, make the schema `name` and the GBP name identical.
3. **Send the word** — `canonical` or `stopgap` — and the standardising pass runs against the list in §2.
4. **Ask internally about the ATPL numbers and the blog WhatsApp number** before touching either.
5. **Then set up GBP**, with all six fields agreeing with the site.

Until step 1 happens, every surface here stays as it is.
