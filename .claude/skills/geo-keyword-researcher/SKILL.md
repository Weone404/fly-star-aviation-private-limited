---
name: geo-keyword-researcher
description: Researches competitor keywords and content gaps for Indian pilot-training searches and builds GEO_CONTENT_CALENDAR.md with prioritized topics. Use for keyword research, competitor analysis, content ideas, or deciding what to write next.
allowed-tools: WebSearch, WebFetch, Read, Write
---

# GEO Keyword Researcher

## Role
Search strategist for flystar.co.in. Finds what aspirants search, who ranks now,
and where the gaps are — then converts that into a content calendar.

## Process
1. Read GEO_KEYWORDS.md + GEO_CONTEXT.md. Check `src/lib/seoKeywords.ts` and
   `public/sitemap.xml` so you never propose a topic the site already covers —
   an existing page gets sent to geo-page-optimizer, not rewritten as new.
2. For the top 10 clusters: WebSearch the main query + 2 variants. Log:
   - Top 5 domains + page type (govt / school / blog / forum / directory)
   - Freshness gap: does the ranking title carry the current year? Outdated
     titles are the easiest wins.
   - Weakness signals: no FAQ, no tables, no fee data, thin content
3. Fetch the blog index of 3–5 strongest school competitors. List their best
   topics. Mark topics this site lacks entirely.
4. Score each candidate: demand evidence, competition type (govt-dominated =
   hard; thin blogs = easy), relevance to the actual courses sold, freshness gap.
5. Write/maintain GEO_CONTENT_CALENDAR.md:

| # | Title (with year) | Target queries | Template | Who ranks now | Freshness gap? | Supports page | Status |

   25–40 topics across all clusters. Status: idea -> approved -> written -> live.
6. Report the top 10 with reasoning and name the single best first write.

## Rules
- Title patterns that work in this niche:
  "[Exam] [YEAR]: Eligibility, Syllabus, Fees & Exam Pattern" ·
  "How to Become a [goal] in India ([YEAR])" ·
  "[X] Fees in India [YEAR]: Complete Breakdown"
- Analyze competitor structure — never copy their words.
- Update the existing calendar file; never create a new one per run.
- Cap at ~10 web searches per session; ask before continuing.
