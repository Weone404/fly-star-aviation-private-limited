# PHASE2_CAMPAIGN.md — The Remaining Work: Execution Campaign

Supersedes the W-queue in CAMPAIGN_PROMPT.md. CLAUDE.md gates, all 8 skills,
the question protocol (BLOCKER vs DEFAULT), token discipline, and session
handoff blocks carry over unchanged. Every run: read CLAUDE.md →
GEO_CAMPAIGN_STATE.md → this file → only the context files the current
workstream needs.

## Mission
Take flystar.co.in from foundation-complete-but-undeployed (3/25 visibility,
zero non-brand) to measurably increased Google + AI visibility: everything
built is LIVE, the site tells one true story, a 50+ page corpus is running,
the entity layer is consistent, and the measurement loop is turning.

## Reality model (drives all prioritization)
- ~40% of AI visibility is on-site content; ~60% is what OTHERS say about
  the brand (listings, reviews, mentions). On-site alone caps at ~40%.
- Visibility order: indexing → impressions → clicks → rankings → AI
  citations. Never misread "no clicks yet" as failure if impressions exist.
- The moat: being demonstrably right where ranking competitors are wrong
  (PCM myth, age limit, fees). Every workstream serves this or the entity
  layer — nothing else ships.

## Stage map (dependency order — always work the earliest unblocked stage)
STAGE 1 GO LIVE — deploy everything that exists (W1–W4)
STAGE 2 TRUTH — one true story site-wide (W5–W9; needs facts block)
STAGE 3 CORPUS — the article engine at full rate (W10–W11)
STAGE 4 ENTITY — off-site consistency (W12; kits for the human)
STAGE 5 LOOP — measure, refresh, iterate (W13–W15, ongoing forever)

## Inputs protocol (first action of every run)
Check GEO_CONTEXT.md for: tech-p0 merged? · corrections contact? · canonical
phone? · facts block (MCA ×2, DGCA approvals, real numbers, interview-prep
yes/no, predecessor/start year, GBP listing)? · top-10 approved? · own-fees
decision? · poppler installed? Record any user-supplied inputs first, then
work the earliest unblocked workstream. NEVER guess a fact, brand, number,
or approval. Missing inputs → batch into the blockers list at run end.

---

## WORKSTREAMS

### W0 — Skill alignment (first run only)
Patch geo-entity-mentions: add execution-kit mode (W12 spec below).
Patch geo-visibility-tracker: A4 canary re-check + manual-check reminders
into every run. Record this roadmap into GEO_CAMPAIGN_STATE.md. Done when:
skills match this file.

### STAGE 1 — GO LIVE

**W1 — Deploy assist + verification.** Trigger: user states tech-p0 merged
and deployed. Actions: run DEPLOY-CHECKLIST.md Stage A verification
(production sitemap sweep — pass = zero non-200 lines; /Courses/cpl nav
check; /rtr H1 clean; prerendered spot-checks). Re-run query A4 canary.
Hand the user the exact GSC indexing-request URL list. Log all to GEO_LOG.md.

**W2 — Publication chain.** Inputs: tech-p0 merged + corrections contact.
Wire on ONE branch geo/publication-1, binding order: /editorial-policy →
/dgca/computer-number → /dgca/olode-exam → /dgca/exam-misconceptions.
Register routes BEFORE the /dgca/:topic catch-all. Align the existing
pageMeta key for computer-number — do not duplicate. Policy page: every
claim must pass its enforcement-table row at commit time or the sentence
comes off. Lint + parity + build. Then DEPLOY-CHECKLIST Stage B. Post-merge:
GSC requests for all four URLs. Done when: four URLs 200 in production.

**W3 — Truth hygiene.** Branch geo/truth-hygiene (needs tech-p0 merged):
1. Delete R1 (airline-transport-pilot-licence.tsx) + imports.
2. Interview pages ×2: strip ALL We One branding/contacts. Until the W8
   rewrite, replace with a minimal honest placeholder (title + "full guide
   coming soon" + link to /dgca/ground-classes). Never a naked dead link.
3. routeMeta.ts: rebrand both titles. 4. WorldMapSection.tsx: remove We One
   link. 5. Replace wa.me/919355611996 + dummy 9876543210 with canonical
   phone IF recorded — else skip and log. 6. Remove all 38 dead footer
   links EXCEPT /privacy and /terms (W4 restores those). 7. Resolve
   bun.lockb vs package-lock.json (recommend deleting bun.lockb if npm is
   the real manager; verify Vercel build settings first).
Gates: grep-verify zero public "We One"/"weone" traces remain (admin
internals excluded — W14 scope).

**W4 — Legal pages.** Trigger: user confirms legal review done. Branch
geo/legal-pages: wire /privacy + /terms from drafts/, restore their footer
links, parity must stay green.

### STAGE 2 — TRUTH (all gated on the facts block)

**W5 — Homepage accuracy.** Inputs: DGCA-approval answer + MCA name.
If approval documented: cite it precisely ("DGCA-approved [what]"). If not:
H1 → "DGCA CPL & ATPL Ground Classes in Delhi" (or the real positioning),
meta aligned. Protected-page override: AUTHORIZED by the facts block + the
two justification artifacts in campaign state. One commit, own branch
geo/homepage-accuracy.

**W6 — Claims-truth pass.** Inputs: real numbers + start year + MCA name.
Create src/lib/claims.ts exporting every public number as a constant.
Reconcile /about, /services/mro, /locations, /dgca/ground-classes: every
claim either maps to a claims.ts constant or is deleted. "Since [year]"
pattern over "N+ years" (never goes stale). Test per claim: defensible to
a journalist. Log every replacement in GEO_DECISIONS.md.

**W7 — Organization schema + canonical NAP.** Inputs: MCA name, canonical
phone/email, consolidated profile list. LocalBusiness/Organization JSON-LD:
name = MCA string exactly, address, phone, sameAs = only verified-owned
profiles. This schema is what AI engines read as the entity's identity.

**W8 — Interview rewrites ×2 + ATPL guide.** Inputs: W3 merged + facts
item 6. Keep slugs. If no interview-prep service: pure informational
guides on IndiGo/Air India selection processes, zero service claims, one
end CTA only if a real service exists. Fix "IndiGo" capitalization in
H1/title. ATPL ground-classes guide = fresh calendar article (R1 topic).

**W9 — /locations/delhi.** The local money page: ground classes in
Dwarka, honest Ramphal Chowk context, batch info, how to reach. Real facts
only ([CONFIRM] what's unknown). LocalBusiness schema. Internal links from
all course pages.

### STAGE 3 — CORPUS

**W10 — PDF source bank.** Input: poppler installed. Bank per
SOURCE-INDEX.md: Flight Crew Manual FIRST (may settle computer-number
auto-generation), then exam calendar, syllabi, CARs. Each with URL +
extraction date. Update SOURCE-INDEX.md status column.

**W11 — Article engine (the permanent loop).** Input: top-10 approved.
Cadence 2–3/week, per article: Phase 3 draft (all standing rules:
research-bank-first, as-of anchoring, no unverified numbers in schema,
myth/fact eligibility gate, misconceptions section type, no competitor
naming, corrections > coverage) → user [CONFIRM] review → Phase 4 wire →
deploy → GSC request → register in quarterly refresh queue with priority
= correction-differentiation. Cap 3 drafts pending review. When calendar
top 10 done, present next 10 (never self-approve beyond provisional).

### STAGE 4 — ENTITY (human executes; you prepare and track)

**W12 — Entity execution kit.** Write GEO_ENTITY_EXECUTION_KIT.md:
per-platform step-by-steps for the HUMAN (accounts need logins you don't
have): 1. Justdial: which listing to keep (recommend: the 1,201-review
one), merge evidence to submit, category correction (air-hostess →
pilot/aviation training). 2. GBP: claim, categories, hours, photos,
services, Q&A seeding. 3. Instagram: which account canonical, closure
steps for the other. 4. flyspaceaviation Facebook: confirm ownership →
rebrand or close. 5. NAP sweep table: all 7 name variants + 12 numbers →
canonical value per platform. 6. Review-reply templates (every review
answered, fresh keyword-bearing replies). 7. Listicle outreach: 5 target
"best DGCA ground classes Delhi" articles + pitch drafts. 8. Disclosed
Quora answer outlines for 10 real threads. Status-tracked; you re-check
completion monthly. This workstream is ~60% of AI visibility — treat it
as equal priority to W11, never as optional.

### STAGE 5 — LOOP (permanent)

**W13 — Measurement.** Monthly: web tracker batch (≤8 searches), remind
user of manual AI checks (priority subset A1/A4/B1/C1/D1 first), A4 canary.
Day 90 after first deploy: full 25-query re-run + 4-engine manual checks →
GEO_REPORT vs sealed baseline → gaps feed the calendar.

**W14 — Security (only on explicit authorization).** Admin credentials
move server-side (env vars, backend-enforced auth). CLAUDE.md gate stays
until user amends it in writing.

**W15 — Quarterly refresh sweep.** Every published article: re-verify
fees/rules/dates against primary sources, bump dateModified on change.
Priority order: correction articles first (their value is being right).
Pariksha beta status and auto-generation question re-checked each sweep.

---

## Permanent human gates (never assume, never default)
Merges, pushes, deploys · GSC actions · the facts block · legal sign-off ·
all off-site account actions (W12) · Pariksha login checks · manual AI
checks · admin-security authorization · fee publication.

## Completion definition (the honest bar)
"Done" = all stages live + 50+ page corpus + entity kit executed by the
human + presence in half the 25 baseline queries + first verified AI
citations logged + refresh loop running. Not a date — an operational state.

## Token discipline (unchanged, restated)
One workstream per session where possible · state in files, never chat ·
grep before reading · ≤10 web searches per run · no filler work when
gated — report and stop.
