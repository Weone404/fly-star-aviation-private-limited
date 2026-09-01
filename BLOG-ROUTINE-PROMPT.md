# Scheduled blog routine — canonical prompt

This is the exact text the daily Fly Star blog task should carry. It lives in the
repo so that a change to the code which invalidates the prompt shows up as a diff
here, in the same commit.

**Why this file exists.** The 2026-09-01 run could not finish: its Step 5 gate
required `BlogPosting` in `src/lib/schema.ts` while forbidding edits to that
file, and no such code existed; its Step 6 described a GitHub Action that had
never been created; and `.claude/settings.json` denied `git push` outright. The
prompt below matches what the repository actually does as of commit `3a2b27b`.

**To apply:** open the scheduled task in the Claude app and replace its prompt
with everything between the markers.

<!-- BEGIN ROUTINE PROMPT -->
You are publishing one new blog post for Fly Star Aviation (https://www.flystar.co.in), a DGCA-approved pilot training institute in Delhi.

This is a Vite + React + TypeScript SPA, not Next.js. The default branch is main. Do not apply Next.js patterns here.

Work ONLY inside the blog data and its supporting files. Do not touch any component, route, config or page outside the paths listed under "Files you may change". If a task seems to require editing something else, stop and explain instead.

## Step 1 - Pick a unique topic

Read, in this order:

- BLOG-TOPICS-PUBLISHED.md - the ledger of every topic already used, and its "Reserved" table
- the BLOG_POSTS array in src/lib/blogData.js
- GEO_KEYWORDS.md and GEO_CONTENT_CALENDAR.md in the repo root, if they name target queries not yet covered

The new topic must not duplicate or substantially overlap any published row. Overlap means the same search intent, not just the same words.

The "Reserved" table at the top of BLOG-TOPICS-PUBLISHED.md lists queries owned by page articles drafted in drafts/ and awaiting wiring. Do not write a blog post on a reserved query - it would cannibalise its own page. If a reserved row has been struck through, that query is back in the pool.

Posts _id 3, 4, 5 and 6 in blogData.js have empty content. Leave them exactly as they are. Their titles are not reserved.

Choose a topic a prospective Indian pilot or cabin-crew candidate would search, with clear informational intent: DGCA subjects and exam mechanics, licence requirements, medicals, RTR, ground school, cabin crew and ground staff careers, salaries, airline preparation, type ratings, training abroad. Prefer specific long-tail questions over broad pillar topics.

Do a web search first to confirm the topic is current and to gather real facts.

## Step 2 - Write the post

Append one object to the BLOG_POSTS array in src/lib/blogData.js, following the shape of the newest entry (dgca-ground-classes-vs-self-study):

```js
{
  slug: '<lowercase-hyphenated-keyword-slug>',
  title: '<human title>',
  seoTitle: '<...>',                            // 55-60 chars INCLUDING any brand suffix
  metaDescription: '<...>',                     // 140-160 chars
  tags: ['<primary keyword>', '<variant>', '<variant>'],
  category: '<Career | DGCA | Training | Medical | CPL Guide | After 12th>',
  author: 'Flying Star Aviator Academics Team',
  authorRole: 'DGCA CPL & ATPL ground instruction, Dwarka, New Delhi',
  createdAt: '<YYYY-MM-DD>',                    // ISO, not "Dec 15, 2026"
  updatedAt: '<YYYY-MM-DD>',                    // same as createdAt on first publish
  coverImage: '/assets/hero-aircraft-1600w.jpg',
  excerpt: 'TL;DR: <the direct answer in 40-60 words>',
  intro: '<2-4 sentence opening paragraph>',
  faqs: [
    { q: '<...>', a: '<...>' },                 // 4-8 entries
  ],
  content: `<HTML string>`,
}
```

Field notes - these are the real names the code reads, verified against src/lib/schema.ts:

- faqs entries may use {q, a} or {question, answer}; the schema builder accepts both. Prefer {q, a} to match existing entries.
- The modified-date field is updatedAt; dateModified is also accepted. Either becomes dateModified in BlogPosting schema.
- Use slug. Do not add an _id to a new post - a slug alone gives /blog/<slug>. Existing entries carry _id for historical reasons; a slugged post canonicalises to its slug URL either way, but new posts should not grow the legacy shape.
- author and authorRole render as the byline and feed BlogPosting.author. Keep the institutional byline unless GEO_CONTEXT.md records a named author.
- Reading time is computed from the body at 200 wpm. Do not write a read-time figure into the post.

### The content HTML

Length: 1200-1800 words. Not more.

- Open with a single <p> that answers the title question in 40-60 words. This is the block answer engines quote - it must stand alone without the heading above it.
- <h2> for each main section, <h3> beneath where needed. No <h1> - the page renders its own.
- At least one <table> of the post's core data. Tables get cited; prose does not.
- <ul>/<ol> for anything enumerable.
- 2-3 internal links to existing pages: <a href="/courses/cpl">, /dgca, /blog/<existing-slug>. Use real routes only - check src/lib/routeMeta.ts, which is the render gate and therefore the true list of live routes.
- Use a template literal (backticks) for the content string so apostrophes need no escaping. Ensure the body contains no backtick and no ${ sequence.
- The faqs array feeds the FAQPage schema. Also render those same questions as an <h2>Frequently asked questions</h2> section at the end of content, so the visible page matches the structured data.

Tone - read CLAUDE.md and follow it. Expert, plain, a senior instructor rather than a salesperson. Banned: leading, best-in-class, world-class, revolutionary, unlock, elevate, seamless, delve, crucial, vital, landscape, moreover, furthermore, in conclusion, exclamation marks. One CTA, at the end only.

### Facts - hard rule

This repo has no facts module and no claims gate, so the discipline is yours to keep.

- Every figure - salary, fee, hour requirement, age limit, pass mark, timeline - needs a primary source: dgca.gov.in or pariksha.dgca.gov.in, a DGCA CAR or circular, an airline's own careers page, or a published government release. Link it inline in the HTML.
- drafts/research/dgca-pariksha-faq-2026-08-22.md holds DGCA's own text banked by an earlier session. It is a valid primary source - cite it with as-of framing ("as of August 2026").
- If the network blocks the primary source you need, say so in your summary and either write from the banked research or drop the figure. Do not substitute a competitor blog's number for a primary source. Web search results summarising other coaching sites are not sources.
- Where a figure genuinely varies, say it varies and give the range with its source. Never estimate, never round an unsourced number into a specific one.
- Never write placement or success percentages, "India's #1", "best", "oldest", guaranteed-job or guaranteed-salary claims, testimonials, or named faculty.
- Do not copy figures from existing posts in blogData.js - several are unsourced. Verify independently or leave them out.

## Step 3 - Cover image placeholder

Do NOT generate images. Set coverImage: '/assets/hero-aircraft-1600w.jpg' - the site-wide fallback, so nothing breaks - and append an entry to BLOG-IMAGE-PROMPTS.md following the format of the entry already in that file: intended file /blog/<slug>.webp, dimensions 1200 x 630, a specific literal alt text, then the prompt as a blockquote detailed enough to paste straight into ChatGPT - subject, composition, what sits left/right/centre, mood, and what must not appear. End every prompt with the house style line at the top of that file.

Once the image is generated by hand and dropped at public/blog/<slug>.webp, the coverImage field gets pointed at it - a manual step, not yours.

## Step 4 - Sitemap and ledger

public/sitemap.xml is a static file with no generator. Append one line before the closing </urlset>:

```xml
<url><loc>https://www.flystar.co.in/blog/<slug></loc><lastmod><YYYY-MM-DD></lastmod></url>
```

CI fails the run if a prerendered post is missing from the sitemap, so do not skip this.

Append one row to the Published table in BLOG-TOPICS-PUBLISHED.md: date, URL, title, category.

## Step 5 - Verify before pushing

Run, in order, and fix anything that fails:

```
npm ci
npm run lint
npm test
npm run build
```

lint is clean on main (0 errors, 8 known warnings) and all tests pass. If either goes red, your change caused it - fix it rather than reporting it as pre-existing.

npm run build runs the puppeteer prerender via scripts/prerender.js. If Chromium will not launch in this environment, say so in your summary and continue - CI runs the prerender with a real Chromium and will catch a genuine prerender failure. Do not treat a local Chromium launch failure as a reason to stop.

If the build did produce dist/, confirm your route prerendered:

```
ls dist/blog/<slug>/index.html
grep -o '"@type":"BlogPosting"' dist/blog/<slug>/index.html
```

src/test/blogSchema.test.ts asserts the same thing without needing a browser, so a passing npm test already proves the schema wiring. If that test fails, stop and report it rather than pushing - the schema builder is broken, and fixing src/lib/schema.ts is outside your file list.

## Step 6 - Push

Commit and push to a branch named claude/blog-YYYY-MM-DD using today's date. Commit message: blog: <title>. Push is permitted to claude/* branches; pushing to main is not.

.github/workflows/blog-publish.yml then re-runs npm ci, lint, test and the full build with a real Chromium, asserts every prerendered blog page carries BlogPosting schema and a canonical link and appears in sitemap.xml, and only then fast-forwards main. Vercel deploys from main. Do not open a pull request and do not push to main.

If the workflow refuses because main has moved, rebase onto origin/main and push again. Never force-push.

## Files you may change

- src/lib/blogData.js (append one object to BLOG_POSTS only)
- public/sitemap.xml (append one <url> line only)
- BLOG-TOPICS-PUBLISHED.md (append one Published row only)
- BLOG-IMAGE-PROMPTS.md (append only)

Nothing else. In particular: do not edit src/pages/BlogDetail.tsx, src/lib/schema.ts, src/lib/routeMeta.ts, .github/workflows/, or any component.

Finish with a short summary: the topic and why it is not a duplicate, the sources you cited, the branch name, whether lint and tests were green, and anything you could not verify.
<!-- END ROUTINE PROMPT -->
