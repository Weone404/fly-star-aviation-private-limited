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

---

## Push day

Four commits sit on local `main` ahead of `origin/main`: `293f4fc` (month-2
skeleton and two shipped fixes), `0b2a2ba` (convention fixes), `9b470da`
(month 2) and the docs commit carrying this section. None have been pushed. Push has to run from the Mac mini terminal — GitHub
credentials live in the macOS keychain and are not reachable from this session.

```bash
cd ~/Desktop/fly-star-aviation-private-limited
git pull --rebase origin main   # remote moved once before; check for conflicts
npm test                        # expect 116 passing
npm run build                   # expect green, including prerender
git push origin main
```

If `git pull --rebase` reports conflicts, resolve them **per conflict, not per
file** — `blogData.js` is one array holding fourteen independent posts, and
`--ours`/`--theirs` on the whole file silently drops someone's work.

### Before you push — three gates

- [ ] **Verify the DGCA figures.** `REVIEW-MONTH-1.md` §1 lists every number with
      its source and its status. The four load-bearing ones, in the order they
      matter: **Rs 2,500** per paper, **Class Ten** as the PPL qualification (not
      10+2 PCM), **2.5 years** PPL paper validity, and the **absence** of any
      published OLODE fee. Those four are quoted on more than one page each; if a
      figure is wrong it is wrong in several places at once. Open CAR 7-B-I and
      the Pariksha FAQ and read them yourself — nobody else in this chain has.
- [ ] **Read the month-1 posts.** Eight entries, all live-facing, none reviewed by
      a human yet. You are the only person here who has sat DGCA papers and run
      the classes; anything that reads wrong to you is wrong.
- [ ] **Read the three month-2 posts.** `cpl-eligibility-after-12th`,
      `dgca-exam-attempts-and-validity`, `foreign-licence-conversion-checklist`.
      Same test. The eligibility post is the one that will get quoted most.

Nothing here needs a decision from anyone else. These three gates are the whole
reason the push is being held.

### After the push — live checks

Give Vercel a couple of minutes, then:

- [ ] `npm run smoke` against production — all checks pass.
- [ ] `curl -s https://www.flystar.co.in/sitemap.xml | grep -c "<url>"` → **63**
- [ ] `curl -s https://www.flystar.co.in/feed.xml | grep -c "<item>"` → **13**
- [ ] `curl -s https://www.flystar.co.in/llms.txt | grep -i "cpl-eligibility"` — the
      new entries reached the AI-facing index, not just the sitemap.
- [ ] `curl -sI https://www.flystar.co.in/blog/cpl-eligibility-after-12th` → **200**,
      and the same for the other two slugs. A 404 here means the post exists in
      `blogData.js` but the route never rendered — the render gate, again.
- [ ] **Open `/courses/cpl` and tap "Talk to Counselor".** It must dial
      **+91 9953536199**. This button held the placeholder `+91 9876543210` for
      weeks; it is worth one tap per deploy for as long as that memory is fresh.
- [ ] Log into the admin panel once — it still works, the delete button is still
      gone.
- [ ] Submit one test enquiry through the live form and confirm the row lands in
      Mongo and the notification email arrives.
- [ ] Confirm `blog-gate-report.json` in the Vercel build log shows
      `"outcome": "ok"` and **0 published** from the remote collection. The
      database has grown to 27 posts; the allowlist is empty on purpose, so 0 is
      the correct number and any other number is a defect.

### Then Search Console

- [ ] Resubmit `sitemap.xml`. Status must read **Success**, and Discovered URLs
      should reach 63.
- [ ] URL Inspection → Request Indexing, in this order, three today and the rest
      as the quota allows:
      1. `/blog/cpl-eligibility-after-12th`
      2. `/blog/dgca-exam-attempts-and-validity`
      3. `/blog/foreign-licence-conversion-checklist`
      4. `/blog/how-to-choose-a-flying-school-in-india` (its FAQ is now visible —
         the previously-emitted schema was unbacked, so this is a genuine change)
      5. `/blog/how-to-choose-dgca-ground-classes` (same reason)
- [ ] Bing Webmaster Tools: re-import from GSC.

### Housekeeping

`.git/_stale/` in this repo holds a few lock files that the cloud session created
and could not remove (the folder mount denies deletes). Nothing in it affects git.
Delete the folder locally whenever convenient: `rm -rf .git/_stale`.
