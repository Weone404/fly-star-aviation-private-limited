import { describe, expect, it } from "vitest";
// @ts-expect-error — plain .mjs build script, no types
import { assess, tidySlug, plainWords, partition } from "../../scripts/blogGate.mjs";

const gate = {
  minWords: 300,
  denySlugs: [],
  denyIds: [],
  spamMarkers: ["hchcr", "steel flat", "steel supplier"],
};

const body = (words: number) => `<p>${Array(words).fill("word").join(" ")}</p>`;

/**
 * Fixtures mirror what /api/blogs actually returned on 2026-09-04, including the
 * two damaged rows. The API is not reachable from CI or from a sandboxed dev
 * machine, so this suite is the only thing standing between a malformed database
 * row and the sitemap.
 */
describe("blog quality gate", () => {
  it("accepts a normal published post", () => {
    const v = assess({ _id: "a1", slug: "cpl-vs-ppl-which-pilot-license-is-right-for-you", title: "CPL vs PPL", content: body(1700) }, gate);
    expect(v.ok).toBe(true);
    expect(v.slug).toBe("cpl-vs-ppl-which-pilot-license-is-right-for-you");
  });

  it("rejects the steel-supplier spam post", () => {
    const v = assess(
      { _id: "a2", slug: "why-india-needs-more-pilots", title: "Why India Needs More Pilots", content: `<h2>HCHCR Steel Flat Supplier in Delhi</h2>${body(400)}` },
      gate
    );
    expect(v.ok).toBe(false);
    expect(v.reason).toContain("spam marker");
  });

  it("repairs a slug with leading and trailing hyphens", () => {
    expect(tidySlug("-pilot-demand-in-india-through-")).toBe("pilot-demand-in-india-through");
  });

  it("leaves internal double hyphens alone so the API lookup still matches", () => {
    expect(tidySlug("pilot-career-after-12th--eligibility-fees--scope")).toBe(
      "pilot-career-after-12th--eligibility-fees--scope"
    );
  });

  it("rejects a post with no usable slug", () => {
    expect(assess({ _id: "a3", slug: "---", title: "T", content: body(900) }, gate).ok).toBe(false);
    expect(assess({ _id: "a4", title: "T", content: body(900) }, gate).ok).toBe(false);
  });

  it("rejects thin content", () => {
    const v = assess({ _id: "a5", slug: "thin-post", title: "Thin", content: body(120) }, gate);
    expect(v.ok).toBe(false);
    expect(v.reason).toContain("too thin");
  });

  it("rejects an untitled post", () => {
    expect(assess({ _id: "a6", slug: "ok-slug", title: "   ", content: body(900) }, gate).ok).toBe(false);
  });

  it("honours the denylists", () => {
    expect(assess({ _id: "a7", slug: "blocked", title: "T", content: body(900) }, { ...gate, denySlugs: ["blocked"] }).ok).toBe(false);
    expect(assess({ _id: "a8", slug: "fine", title: "T", content: body(900) }, { ...gate, denyIds: ["a8"] }).ok).toBe(false);
  });

  it("counts words from HTML, not markup", () => {
    expect(plainWords({ content: "<p>one two</p><p>three</p>" })).toBe(3);
    expect(plainWords({})).toBe(0);
  });

  it("holds back a duplicate slug rather than emitting it twice", () => {
    const { accepted, rejected } = partition(
      [
        { _id: "b1", slug: "same", title: "First", content: body(900) },
        { _id: "b2", slug: "same", title: "Second", content: body(900) },
      ],
      gate
    );
    expect(accepted).toHaveLength(1);
    expect(rejected[0].reason).toBe("duplicate slug");
  });

  it("partitions the real 2026-09-04 snapshot the way we intend", () => {
    const { accepted, rejected } = partition(
      [
        { _id: "1", slug: "cpl-vs-ppl-which-pilot-license-is-right-for-you", title: "CPL vs PPL", content: body(1700) },
        { _id: "2", slug: "-pilot-demand-in-india-through-", title: "Pilot Demand in India Through 2030", content: body(1600) },
        { _id: "3", slug: "why-india-needs-more-pilots", title: "Why India Needs More Pilots", content: `HCHCR Steel Flat ${body(400)}` },
      ],
      gate
    );
    expect(accepted.map((p: { slug: string }) => p.slug)).toEqual([
      "cpl-vs-ppl-which-pilot-license-is-right-for-you",
      "pilot-demand-in-india-through",
    ]);
    expect(rejected).toHaveLength(1);
    expect(rejected[0].slug).toBe("why-india-needs-more-pilots");
  });
});
