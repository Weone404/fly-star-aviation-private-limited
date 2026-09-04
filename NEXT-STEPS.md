# NEXT-STEPS.md — flystar.co.in
Written 2026-09-04, at the end of the audit and repair session.
Companion to `AUDIT.md` (what was wrong), `CHANGELOG.md` (what changed and why),
`SEO.md` (keyword map, entity, tracking) and `DEPLOYMENT.md` (how to run it).

This file exists because everything below lives in one person's head or in a chat
transcript, and both scroll away. The most expensive defect in this repo was never
technical: fifteen URLs sat dead for weeks, and enquiries arrived into a database
with no read path. Both survived because nothing surfaced them.

---

## Where this actually stands

**Done.** Crawlable architecture with a regression test guarding it · 15 recovered
URLs · five pilot-training pages from primary regulator sources · DGCA Computer
Number guide · editorial policy · honest location pages · generated sitemap ·
robots.txt and llms.txt · per-page schema · DOMPurify sanitisation on both paths ·
approval allowlist with content-hash pinning · two dangerous routes removed.

**Not started.** Analytics · any of the 12 posts fact-checked or approved ·
privacy policy and terms (footer links currently removed) · Google Business
Profile alignment · one email and one customer-facing brand · content cadence.

The traffic and rankings half of the original brief is still almost entirely
ahead, and nearly all of it is gated on decisions rather than code.

---

## 1 · Before merging

- [ ] **Contacts snapshot** — take it while `GET /api/contacts` still answers. Store it **outside this folder**; it is real people's names, phones and emails.
- [ ] **Blog snapshot** — `blog-snapshot.json` in this folder is fine (gitignored). It is also the only backup of the posts collection that exists.
- [ ] **Verify direct MongoDB access** — connection string from Render → service → Environment; connect with `mongosh` or Compass; confirm both `contacts` and `blogs` are visible. **Do this before the merge**, not after: the merge closes the only other read path.

## 2 · Merge day

- [ ] Merge `geo/render-gate-repair` into `main`, push.
- [ ] `curl -s https://fly-star-aviation-private-limited.onrender.com/api/contacts` — a refusal means it is closed. **A JSON dump means the deploy did not happen**: deploy manually in Render, re-check. The merge is not the fix; the deploy is.
- [ ] Submit a test enquiry through the live form, confirm the row lands in Mongo. `POST /api/contact` stays open by design.
- [ ] Log into the admin panel once — delete button gone, everything else working.
- [ ] `npm run smoke` against production.
- [ ] Confirm `blog-gate-report.json` in the build log shows `"outcome": "ok"`, not `"fetch-failed"`.
- [ ] Then `DEPLOYMENT.md` §6 in full.

## 3 · This week

- [ ] **Render request logs** — check the plan's retention first; if it is exhausted, "retention exhausted, no evidence of access" is a legitimate finding to record. Otherwise three filters: `GET /api/contacts` (any IP that is not yours), `POST /api/blogs` around the steel row's `createdAt`, and any `PUT`/`DELETE` on `/api/blogs`. This decides whether the DPDP question stays a documentation exercise.
- [ ] **Open the contacts snapshot and reply to the recent leads.** Every row is someone who asked about pilot training and heard nothing back. This is the business payoff of the whole security arc — not the 405s.
- [ ] Search Console: submit the sitemap, then URL Inspection on the top 4–5 recovered URLs. Not all fifteen at once.
- [ ] Bing Webmaster Tools: import from GSC.

## 4 · Decisions that gate everything else

- [ ] **Analytics** — GA4, or Plausible if you would rather stay cookieless and skip the consent question. Nothing is measurable until this exists, and the privacy policy cannot describe what you run until you have chosen.
- [ ] **One email.** Verify `info@flyingstaraviator.com` actually receives mail before standardising on it; a contact form pointing at a dead mailbox is worse than the gmail. Then use the winner everywhere, including schema and directories.
- [ ] **One customer-facing brand.** Fly Star, Flying Star Aviator and We One Aviation are all in circulation. Pick one for the site and the Google Business Profile; the legal name belongs in policy pages only.
- [ ] **The privacy/terms worksheet** — 13 `[CONFIRM]` items in `drafts/`. Publishable once the contacts fix is live and analytics is chosen. Restore the footer links when they ship.
- [ ] **PPL flight hours** — fetch Schedule II of the Aircraft Rules 1937 in a browser (DGCA's portal serves its homepage to fetchers), then hand over the document URL and the figure so it can be published with a source.

## 5 · The content engine

Blog snapshot → claim audit on the 12 publishable posts → your per-post verdicts →
edits applied → **then** `npm run blogs:approve -- <slug>` → approval build →
grep the live sitemap for an approved slug.

**Approve last.** The hash pins whatever exists when you run the command.
Approving pre-edit content and fixing it afterwards trips the tamper alarm on the
next build — and a false alarm on day one is how a real one gets ignored on day
thirty.

Also queued: the contact-notification change (once the merge is verified live) ·
the two remaining DGCA drafts in `drafts/` · author bylines and Person schema on
existing posts · an RSS feed · repairing the two damaged database rows.

---

## How you will know it worked

Nobody had defined this, so:

**Weeks 1–2 — did the repair land?**
GSC Pages report: the 15 recovered URLs moving off "Not found (404)" toward
indexed. Sitemap status "Success". Hosting logs showing GPTBot, ClaudeBot,
PerplexityBot and OAI-SearchBot fetching, and hits on `/llms.txt`.

**Weeks 4–8 — is anything being read?**
GSC queries report: impressions first, on brand terms and pilot-training
long-tail. Then a monthly ritual — ask ChatGPT, Perplexity, Gemini and Google's
AI Overview the exact questions these pages answer, and log the result in
`GEO_LOG.md`. The sourced corrections were built to be the quotable answer:

- a PPL needs a **Class 10** pass, not 10+2 with Physics and Maths
- a passed PPL paper is valid **two and a half years**, not five
- DGCA ground classes are **not mandatory**
- conversion currency: **10 hours PIC in 24 months**

Watch for those appearing in answers. That is the strategy working.

**One honest expectation.** The original brief asked for number one. That does not
arrive in weeks, for anyone, with any stack. The realistic order is recovered URLs
and brand queries first, informational long-tail second, competitive head terms
only as the content cadence compounds. Informational depth wins the long tail
first — that is the nature of the approach chosen here, and it is why the
sourcing discipline matters more than the volume.
