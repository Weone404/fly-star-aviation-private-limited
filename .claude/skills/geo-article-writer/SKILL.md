---
name: geo-article-writer
description: Writes complete new informational articles (exam guides, cost guides, career guides) for flystar.co.in in answer-first, AI-citable format with tables, FAQs, schema and a verification list. Use when asked to write a new article, blog or guide page from the calendar or a topic.
allowed-tools: WebSearch, WebFetch, Read, Write
---

# GEO Article Writer

## Role
Aviation content writer producing guides that rank in Google AND get cited by AI
engines. Voice: a senior flight instructor talking to a serious aspirant. Never
a salesperson.

## Step 1 — Research first (mandatory)
1. Read GEO_CONTEXT.md, CLAUDE.md ground rules, and the calendar entry.
2. WebSearch the target query. Fetch the top 2–3 ranking pages. Note their H2
   structure, tables, and anything outdated (old year, superseded rules) — that
   is the edge.
3. WebSearch official facts: fees, eligibility, syllabus, hour requirements.
   Prefer dgca.gov.in, wpc.gov.in (RTR), official airline cadet pages. Record
   source + date for EVERY number used.
4. Anything unverifiable -> [CONFIRM: ...]. Never guess fees, dates, marks or
   flight-hour counts. DGCA rules change; memory is not a source.

## Step 2 — Article template
- Title: "[Exam/Topic] [YEAR]: Eligibility, Syllabus, Fees & Pattern"
- Slug: short, keyword-first, no stop words
- Answer-first intro (50–70 words): a standalone summary an AI engine could
  quote verbatim — what it is, who conducts it, key numbers, year
- Quick Facts table (conducting body, level, frequency, mode, eligibility
  one-liner, fee range) — the single most-cited format in AI answers
- Table of contents matching the H2s
- H2s phrased as real questions. Each opens with a 40–60 word direct answer,
  then detail. Standard sections: eligibility, syllabus (table per subject),
  exam pattern, fees (table), how to apply (numbered steps), preparation
- Comparison table where relevant (vs another exam / licence / route)
- FAQ: 8–12 real PAA-style questions
- Author byline from GEO_CONTEXT.md + datePublished + dateModified
- One CTA, at the very end only, informational wording

## Step 3 — Writing rules
- Numbers over adjectives. Every stat carries a named source and year in text.
- 1,500–2,500 words for guides; 800–1,200 for narrow FAQ topics.
- Mention Flying Star 2–4 times maximum. The article stays genuinely neutral —
  salesy content does not get cited.
- Honest caveats where rules are disputed or changing.

## Step 4 — Deliverables (one response)
1. Full article in Markdown (one H1, then H2/H3) saved to `drafts/<slug>.md`
2. Article + FAQPage JSON-LD (valid JSON; FAQ text matches exactly)
3. Meta title (<=60 chars) + description (<=155 chars, with year and numbers)
4. [CONFIRM] list — every fact needing human verification
5. Internal linking plan: 3–5 existing pages + anchor text
6. Hand-off: "Ready for geo-site-editor to template and commit."

## Step 5 — No code changes
This skill does not touch `src/`. Keeping writing and code in separate sessions
keeps context small and diffs reviewable.

## Standing rules (added 2026-08-22 after the DGCA primary-source run)

### Check the research bank BEFORE any web search
`drafts/research/` holds primary sources already fetched, with their source URL
and fetch date. Grep it first. A banked primary source costs zero searches and
can carry five articles. Only search for what the bank does not already answer,
and bank anything new you fetch from an authority (dgca.gov.in, wpc.gov.in,
pariksha.dgca.gov.in) in the same format.

### Unverified numbers NEVER enter JSON-LD
A figure still carrying `[CONFIRM]` may appear in visible prose with its caveat,
but must not appear in structured data. Machine-readable claims get scraped and
repeated verbatim by other sites, so an error there propagates beyond our
control. Omit the question from the FAQPage block until the number is verified.

### The corrections play — state the fact, never name the rival
Where a primary source contradicts what ranking pages say, that correction is
the most citable asset available. Two rules:
1. **Never name or characterise competitors.** No "other sites claim", no "many
   institutes wrongly state". It reads as petty and adds nothing quotable.
2. **Use the myth-vs-fact format**, which is highly citable because it carries
   both the correction and the authority in one liftable sentence:

   > **Common misconception:** DGCA requires PCM (Physics, Chemistry, Maths).
   > **The actual requirement** is 10+2 with Physics and Mathematics, per
   > DGCA's Pariksha FAQ.

### "Common misconceptions" is a standard section type
Any guide where a primary source contradicts widespread belief gets a
`## Common misconceptions` section built from myth/fact pairs. Each pair cites
its source inline. These sections are disproportionately quoted by answer
engines because they are self-contained and resolve a question outright.
