import { describe, expect, it } from "vitest";

import { BLOG_POSTS, getBlogRoutes, getReadingMinutes, getWordCount, sortBlogsByDate } from "@/lib/blogData.js";
import { buildGraph } from "@/lib/schema";
import { getRouteMeta } from "@/lib/routeMeta";

type Node = Record<string, unknown>;

const written = (BLOG_POSTS as Node[]).filter((p) => p.slug && p.content);
const nodesFor = (path: string): Node[] =>
  ((buildGraph(path) as Node | null)?.["@graph"] as Node[]) ?? [];
const typeOf = (nodes: Node[], t: string) => nodes.find((n) => n["@type"] === t);

describe("blog post structured data", () => {
  it("keeps the listing dataset slug-based and sorted newest first", () => {
    const routes = getBlogRoutes();
    expect(routes.some((route) => /^\/blogs\/\d+$/.test(route))).toBe(false);

    const dates = sortBlogsByDate(BLOG_POSTS).map((post) =>
      new Date(post.createdAt || post.updatedAt || post.publishedAt || post.date || 0).getTime()
    );
    expect(dates.every((date, index) => index === 0 || date <= dates[index - 1])).toBe(true);
  });

  it("has at least one written, slugged post to guard", () => {
    expect(written.length).toBeGreaterThan(0);
  });

  it.each(written.map((p) => [p.slug as string]))(
    "/blog/%s emits BlogPosting and a breadcrumb",
    (slug) => {
      const nodes = nodesFor(`/blog/${slug}`);
      const article = typeOf(nodes, "BlogPosting");

      // This is the assertion the scheduled routine's Step 5 gate relies on.
      // If it fails, the prerendered page ships without BlogPosting.
      expect(article, "BlogPosting missing — schema.ts blog branch is broken").toBeTruthy();
      expect((article as Node).headline).toBeTruthy();
      expect((article as Node).author).toBeTruthy();
      expect((article as Node).publisher).toBeTruthy();
      expect((article as Node).datePublished as string).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect((article as Node).dateModified as string).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect((article as Node).wordCount as number).toBeGreaterThan(0);
      expect((article as Node).timeRequired as string).toMatch(/^PT\d+M$/);
      expect(typeOf(nodes, "BreadcrumbList")).toBeTruthy();
      expect(JSON.parse(JSON.stringify(buildGraph(`/blog/${slug}`)))).toBeTruthy();
    }
  );

  it("emits FAQPage for any post carrying faqs, in either field shape", () => {
    const withFaqs = written.filter((p) => Array.isArray(p.faqs) && p.faqs.length);
    for (const post of withFaqs) {
      const faq = typeOf(nodesFor(`/blog/${post.slug}`), "FAQPage");
      expect(faq, `FAQPage missing for ${post.slug}`).toBeTruthy();
      expect((faq!.mainEntity as Node[]).length).toBe((post.faqs as unknown[]).length);
      for (const entry of faq!.mainEntity as Node[]) {
        expect(entry.name, "a FAQ question came through empty").toBeTruthy();
        expect((entry.acceptedAnswer as Node).text, "a FAQ answer came through empty").toBeTruthy();
      }
    }
  });

  it("pins the legacy /blogs/<id> URL to the slug canonical, not itself", () => {
    for (const post of written.filter((p) => p._id)) {
      const legacy = `/blogs/${post._id}`;
      const expected = `https://www.flystar.co.in/blog/${post.slug}`;
      expect(getRouteMeta(legacy)?.canonical).toBe(expected);
      expect(typeOf(nodesFor(legacy), "BlogPosting")?.["@id"]).toBe(`${expected}#article`);
    }
  });

  it("reports reading time from the body rather than a fixed number", () => {
    const minutes = written.map((p) => getReadingMinutes(p));
    expect(new Set(minutes).size, "every post reports the same reading time").toBeGreaterThan(1);
    for (const post of written) {
      expect(getWordCount(post)).toBeGreaterThan(100);
    }
  });
});
