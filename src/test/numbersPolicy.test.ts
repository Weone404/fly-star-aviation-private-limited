import { describe, it, expect } from "vitest";
import { STATIC_BLOG_POSTS } from "@/lib/blogData";

/**
 * The numbers policy, as machinery instead of a habit.
 *
 * The blog routine publishes posts unattended. Until this test existed, the only
 * thing standing between an unsourced figure and a live page was somebody
 * remembering to read the post afterwards — and a check that runs on memory is
 * not a control. This is the same lesson as the render gate: the invariant
 * becomes a test, or it eventually stops holding.
 *
 * The rule: a post that states a figure must show where the figure came from.
 * It can do that three ways, and any one is enough —
 *   1. a `keyFacts` entry naming a source,
 *   2. a "Source:" line in the body,
 *   3. an explicit declaration that no source exists, which is how this site
 *      handles claims like the DGCA pass rate that circulate without any
 *      document behind them.
 *
 * A post with no figures is unaffected. The test never judges whether a figure
 * is *correct* — only that the page is honest about its provenance.
 */

type Post = {
  slug?: string;
  content?: string;
  keyFacts?: { fact: string; source: string; href?: string }[];
};

/** Currency amounts, percentages, and quantities of hours / months / years. */
const FIGURE =
  /(?:Rs\.?\s?[\d,]+|₹\s?[\d,]+|\b\d+(?:\.\d+)?\s?%|\b\d+\s?(?:hours?|hrs?|months?|years?)\b|\btwo and a half years\b)/gi;

/** Phrases this site uses when it publishes a figure it deliberately cannot source. */
const NO_SOURCE_DECLARATION = [
  "no dgca document found",
  "does not publish",
  "publishes no",
  "no separate",
  "could not find a primary source",
  "not publicly",
  "no source",
];

const visibleText = (html: string) =>
  html
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\s+/g, " ");

describe("numbers policy", () => {
  const posts = (STATIC_BLOG_POSTS as Post[]).filter((p) => p.slug && p.content);

  it("every post that states a figure shows where the figure came from", () => {
    const offenders: string[] = [];

    for (const post of posts) {
      const text = visibleText(post.content as string);
      const figures = [...new Set(text.match(FIGURE) || [])];
      if (figures.length === 0) continue;

      const hasKeyFactSource = (post.keyFacts || []).some((f) => f.source && f.source.trim().length > 0);
      const hasSourceLine = /\bSources?\s*:/i.test(text);
      const lower = text.toLowerCase();
      const declaresNoSource = NO_SOURCE_DECLARATION.some((phrase) => lower.includes(phrase));

      if (!hasKeyFactSource && !hasSourceLine && !declaresNoSource) {
        offenders.push(`${post.slug} — states ${figures.slice(0, 4).join(", ")} with no source, no Source: line, and no "not published" declaration`);
      }
    }

    expect(offenders, `Numbers policy breach:\n  ${offenders.join("\n  ")}`).toEqual([]);
  });

  it("no key fact is filed without naming its source", () => {
    const unnamed = posts
      .flatMap((p) => (p.keyFacts || []).map((f) => ({ slug: p.slug, f })))
      .filter(({ f }) => !f.source || !f.source.trim())
      .map(({ slug, f }) => `${slug} — "${f.fact.slice(0, 50)}..."`);

    expect(unnamed, `Key facts with no source:\n  ${unnamed.join("\n  ")}`).toEqual([]);
  });
});
