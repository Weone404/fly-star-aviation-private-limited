# Scheduled blog routine - canonical prompt (v2, autonomous)

The exact text the daily Fly Star blog task carries. Versioned here so a code
change that invalidates the prompt shows up as a diff in the same commit.

**Loop:** the routine researches, writes, verifies, commits and pushes a
`claude/blog-YYYY-MM-DD` branch. `.github/workflows/blog-publish.yml` re-runs
the checks and fast-forwards `main`. Vercel deploys. No human step.

**Setup, once:** in the routine form, pick the repository
`Weone404/fly-star-aviation-private-limited` under *Select a repository* -
that is what injects the push credential. Schedule daily. Leave notifications on
so a failed run reaches you.

<!-- BEGIN ROUTINE PROMPT -->
You publish one new blog post for Fly Star Aviation (https://www.flystar.co.in) and take it live yourself. No human reviews this run. Finish the whole loop: research, write, verify, commit, push. The GitHub Action merges to main and Vercel deploys.

Repo: Weone404/fly-star-aviation-private-limited. Default branch main. Stack: Vite + React 18 + TypeScript + Tailwind + shadcn, prerendered at build time. NOT Next.js — do not apply Next.js patterns.

Read CLAUDE.md before writing. Its tone rules and no-fabrication rules bind this run.

=========================================================
STEP 1 — KEYWORD RESEARCH, THEN TOPIC
=========================================================
Read in this order:
1. BLOG-TOPICS-PUBLISHED.md — every topic already used, plus its "Reserved" table
2. the BLOG_POSTS array in src/lib/blogData.js
3. GEO_KEYWORDS.md and GEO_KEYWORD_RESEARCH.md

Do not pick a topic from memory. Run at least four web searches first and write down what you find:
- the head term and its long-tail variants people actually type
- which sites currently rank, and how stale their pages are (a 2025 slug on a 2026 query is an opening)
- the "People also ask" questions around the term
- whether the query has a clear informational intent you can answer factually

Choose the topic with the best combination of real search demand and winnable competition. A specific long-tail question beats a broad pillar term — the broad ones are taken.

Hard exclusions:
- anything overlapping a published row. Overlap means same search intent, not same words.
- anything in the Reserved table (those queries belong to page articles in drafts/). If a reserved row is struck through, it is back in the pool.
- posts _id 3-6 in blogData.js are empty placeholders. Leave them untouched. Their titles are not reserved.

Every heading and every sentence must earn its place against the query you picked. No filler paragraphs written to reach a word count.

=========================================================
STEP 2 — SOURCE EVERY FACT
=========================================================
This repo has no facts module and no claims gate. The discipline is yours.

Primary sources only, linked inline in the HTML:
- dgca.gov.in and pariksha.dgca.gov.in
- a DGCA CAR, circular, or public notice
- an airline's own careers page
- a published government release (PIB, ministry sites)
- drafts/research/dgca-pariksha-faq-2026-08-22.md — DGCA's own text banked by an earlier session. Valid, but cite it with as-of framing ("as of August 2026").

Never acceptable as a source: another coaching site, an aggregator blog, or a web-search snippet summarising one. If a search result is the only place a number appears, the number does not go in the post.

If the network blocks a primary source, say so in your summary and either write from the banked research or drop the figure entirely. Do not estimate. Do not round an unsourced number into a specific one. Where a figure genuinely varies, say it varies and give the range with its source.

Facts already verified against DGCA CAR Section 7 Series B Part I and the Pariksha portal, reusable without re-verification:
- CPL theory eligibility: a computer number from the Central Examination Organisation plus 10+2 with Physics and Mathematics. Ground school attendance is not required.
- Pass mark: 70% per paper. No aggregate.
- A cleared CPL or ATPL paper stays valid five years.
- CPL papers: Air Navigation, Aviation Meteorology, Air Regulation, Technical General, Technical Specific. ATPL adds Radio Aids and Instruments.
- Exam fee: Rs 2,500 per paper in a regular session, Rs 5,000 per paper via OLODE.

Never write: placement or success percentages, "India's #1", "best", "oldest", guaranteed job or salary claims, testimonials, named faculty, or student counts. Do not copy figures from existing posts in blogData.js — several are unsourced.

=========================================================
STEP 3 — WRITE THE POST
=========================================================
Append ONE object to the BLOG_POSTS array in src/lib/blogData.js, matching the newest entry (dgca-ground-classes-vs-self-study):

{
  slug: '<lowercase-hyphenated-keyword-slug>',
  title: '<human title>',
  seoTitle: '<...>',                       // 55-60 characters, including any brand suffix
  metaDescription: '<...>',                // 145-158 characters
  tags: ['<primary keyword>', '<variant>', '<variant>'],
  category: '<Career | DGCA | Training | Medical | CPL Guide | After 12th>',
  author: 'Flying Star Aviator Academics Team',
  authorRole: 'DGCA CPL & ATPL ground instruction, Dwarka, New Delhi',
  createdAt: '<YYYY-MM-DD>',
  updatedAt: '<YYYY-MM-DD>',
  coverImage: '/assets/hero-aircraft-1600w.jpg',
  excerpt: 'TL;DR: <the direct answer in 40-60 words>',
  intro: '<2-4 sentence opening>',
  faqs: [ { q: '<...>', a: '<...>' } ],    // 6-10 entries
  content: `<HTML string>`,
}

Field rules, verified against src/lib/schema.ts:
- faqs accepts {q,a} or {question,answer}. Use {q,a}.
- updatedAt is the modified-date field (dateModified also works). It becomes dateModified in BlogPosting schema.
- Use slug only. Do NOT add an _id — a slug alone gives /blog/<slug>.
- Reading time is computed from the body at 200 wpm. Never write a read-time figure into the post.
- Use a template literal (backticks) for content. Ensure the body contains no backtick and no ${ sequence.

LENGTH: 2000-4000 words of body copy. That is 10-20 minutes of reading. Depth must come from specifics — procedures, dates, thresholds, worked examples, edge cases — never from padding. If you cannot fill 2000 words with sourced substance, the topic is too thin: pick a better one.

STRUCTURE (this is the AEO surface, follow it exactly):
- Open with ONE <p> answering the title question in 40-60 words. It must stand alone without the heading above it. This is the block answer engines quote.
- <h2> for every main section, phrased as the exact question a candidate would type. No <h1> — the page renders its own.
- Immediately under each <h2>, a direct 40-60 word answer in one paragraph, then the detail.
- <h3> beneath where a section needs sub-parts.
- At least THREE <table> elements carrying the post's core data. Tables get cited; prose does not. Give every table a real <thead>.
- <ul>/<ol> for anything enumerable.
- A "Frequently asked questions" section is NOT written into content — the faqs array renders it, and writing it twice duplicates every question on the page. The build strips an in-body FAQ automatically, but do not write one.
- 3-5 internal links to real routes: /courses/cpl, /dgca, /dgca/ground-classes, /rtr, /blog/<existing-slug>. Check src/lib/routeMeta.ts for the live route list before linking — a link to a route absent from that file is a 404.
- Close with a short "The short version" section, not a "Conclusion".

TONE: a senior flight instructor explaining something plainly. Active voice. Mix short sentences with longer data-carrying ones. Grade 9-10 readability. One CTA, at the very end only.
BANNED WORDS: delve, tapestry, bustling, realm, crucial, vital, navigate, landscape, synergy, leverage, moreover, furthermore, in conclusion, leading, best-in-class, world-class, revolutionary, unlock, elevate, seamless, and exclamation marks.

=========================================================
STEP 4 — IMAGES
=========================================================
You cannot generate images. Do not try, and do not link to a file that does not exist.

Cover: leave coverImage: '/assets/hero-aircraft-1600w.jpg' (the site-wide fallback, so nothing breaks).

Inline: place 3-5 image slots at the points where a diagram genuinely helps — a process flow, a comparison, a timeline, a cost breakdown. Insert each as:

<figure class="img-slot" data-src="/blog/<slug>/<descriptive-name>.webp" data-dimensions="1200x675">
  <span>&lt;the alt text, written out&gt;</span>
</figure>

That renders as a clean labelled placeholder, not a broken image. When the artwork is later dropped at public/blog/<slug>/<name>.webp, the figure is swapped for a real <img>. That swap is a manual step, not yours.

Then append ONE section to BLOG-IMAGE-PROMPTS.md, following the format already in that file. For every slot plus the cover, record: intended file path, dimensions, the exact alt text used in the markup, then the prompt as a blockquote.

Each prompt must be specific enough to paste into ChatGPT and get a usable image first try: name the subject, the composition, what sits left/centre/right, the mood, and what must NOT appear. End every prompt with the house style line at the top of that file.

=========================================================
STEP 5 — SITEMAP AND LEDGER
=========================================================
public/sitemap.xml has no generator. Append one line before </urlset>:
<url><loc>https://www.flystar.co.in/blog/<slug></loc><lastmod><YYYY-MM-DD></lastmod></url>
CI fails the run if a prerendered post is missing from the sitemap.

Append one row to the Published table in BLOG-TOPICS-PUBLISHED.md: date, URL, title, category.

=========================================================
STEP 6 — VERIFY
=========================================================
Run in order and fix anything that fails:
  npm ci
  npm run lint
  npm test
  npm run build

main is clean: 0 lint errors (8 known warnings) and all tests pass. If either goes red, your change caused it. Fix it.

src/test/blogSchema.test.ts proves the BlogPosting and FAQPage wiring without a browser. If THAT test fails, stop and report — the schema builder is broken and fixing src/lib/schema.ts is outside your file list.

If Chromium will not launch for the prerender locally, note it and continue. CI runs the prerender with a real Chromium and will catch a genuine failure.

Self-check before committing:
- word count 2000-4000, counted on the rendered text
- every figure carries an inline primary-source link
- no banned word appears
- 3+ tables, 6-10 FAQ entries, 3-5 internal links, 3-5 image slots
- the topic does not overlap any published row

=========================================================
STEP 7 — SHIP IT
=========================================================
  git checkout -b claude/blog-YYYY-MM-DD
  git add -A
  git commit -m "blog: <title>"
  git push -u origin claude/blog-YYYY-MM-DD

Pushing to claude/* branches is permitted. Pushing to main is NOT — the Action does that.

.github/workflows/blog-publish.yml then re-runs npm ci, lint, test and the full build with a real Chromium, asserts every prerendered blog page carries BlogPosting schema, a canonical link and a sitemap entry, and only then fast-forwards main. Vercel deploys from main.

If the Action refuses because main moved, rebase onto origin/main and push again. Never force-push. Do not open a pull request.

=========================================================
FILES YOU MAY CHANGE
=========================================================
  src/lib/blogData.js          (append one object to BLOG_POSTS)
  public/sitemap.xml           (append one <url> line)
  BLOG-TOPICS-PUBLISHED.md     (append one Published row)
  BLOG-IMAGE-PROMPTS.md        (append one section)

Nothing else. Never edit src/pages/, src/lib/schema.ts, src/lib/routeMeta.ts, src/components/, src/index.css, or .github/workflows/.

STOP CONDITIONS — report and push nothing:
- every candidate topic overlaps something published or reserved
- you cannot source the figures the topic needs
- blogSchema.test.ts fails
- lint or tests were red before your change

Finish with: the topic and why it is not a duplicate, the keyword evidence, every source you cited, word count, the branch name, lint/test status, and anything you could not verify.

<!-- END ROUTINE PROMPT -->
