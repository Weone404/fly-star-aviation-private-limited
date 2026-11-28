import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { getRouteMeta } from "@/lib/routeMeta";
import { BLOG_POSTS, getBlogPost, getBlogRoutes } from "@/lib/blogData.js";
import { buildGraph, PAGE_FAQS } from "@/lib/schema";
import {
  PILOT_AFTER_12TH_FAQS,
  PILOT_AFTER_12TH_LAST_MODIFIED,
  PILOT_AFTER_12TH_PUBLISHED,
  PILOT_AFTER_12TH_PATH,
} from "@/lib/pilotAfter12thContent";

type JsonLdNode = Record<string, unknown>;
const ROOT = resolve(__dirname, "../..");

describe("pilot-after-12th guide", () => {
  it("uses unique, self-canonical metadata with indexing enabled", () => {
    const meta = getRouteMeta(`${PILOT_AFTER_12TH_PATH}/`);

    expect(meta.title.length).toBeLessThanOrEqual(60);
    expect(meta.description.length).toBeLessThanOrEqual(155);
    expect(meta.canonical).toBe(`https://www.flystar.co.in${PILOT_AFTER_12TH_PATH}`);
    expect(meta.ogUrl).toBe(meta.canonical);
    expect(meta.ogType).toBe("article");
    expect(meta.ogImage).toBe("/assets/hero-aircraft-1600w.jpg");
    expect(meta.robots).toBe("index,follow");
  });

  it("emits BlogPosting, BreadcrumbList and matching visible FAQ schema", () => {
    const graph = JSON.parse(JSON.stringify(buildGraph(PILOT_AFTER_12TH_PATH))) as {
      "@graph": JsonLdNode[];
    };
    const article = graph["@graph"].find((node) => node["@type"] === "BlogPosting");
    const breadcrumb = graph["@graph"].find((node) => node["@type"] === "BreadcrumbList");
    const faqPage = graph["@graph"].find((node) => node["@type"] === "FAQPage");

    expect(article).toMatchObject({
      headline: "How to Become a Pilot After 12th in India",
      datePublished: PILOT_AFTER_12TH_PUBLISHED,
      dateModified: PILOT_AFTER_12TH_LAST_MODIFIED,
      image: "https://www.flystar.co.in/assets/hero-aircraft-1600w.jpg",
    });
    expect(breadcrumb).toBeDefined();

    const questions = (faqPage?.mainEntity as JsonLdNode[]).map((question) => ({
      q: question.name,
      a: (question.acceptedAnswer as JsonLdNode).text,
    }));
    expect(questions).toEqual(PILOT_AFTER_12TH_FAQS);
    expect(PAGE_FAQS[PILOT_AFTER_12TH_PATH]).toEqual(PILOT_AFTER_12TH_FAQS);
  });

  it("keeps the superseded blog entry out of public blog routes", () => {
    expect(getBlogPost("how-to-become-a-pilot")).toBeNull();
    expect(BLOG_POSTS.some((post) => post.slug === "how-to-become-a-pilot")).toBe(false);
  });

  it("links only to routes present in the site render inventory", () => {
    const page = readFileSync(resolve(ROOT, "src/pages/PilotAfter12th.tsx"), "utf8");
    const routeMeta = readFileSync(resolve(ROOT, "src/lib/routeMeta.ts"), "utf8");
    const renderPaths = new Set([
      ...[...routeMeta.matchAll(/^\s*"(\/[^"]+)": \{/gm)].map((match) => match[1]),
      ...getBlogRoutes(),
    ]);
    const internalLinks = [...page.matchAll(/(?:to|href)="(\/[^"]+)"/g)].map((match) => match[1]);

    expect([...new Set(internalLinks.filter((path) => !renderPaths.has(path)))]).toEqual([]);
  });
});
