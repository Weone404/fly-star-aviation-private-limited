import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

import { buildGraph } from "@/lib/schema";

type JsonLdGraph = {
  "@graph": Record<string, unknown>[];
};

function graphTypes(path: string): unknown[] {
  return ((buildGraph(path) as JsonLdGraph | null)?.["@graph"] ?? []).map(
    (node) => node["@type"],
  );
}

describe("structured data eligibility", () => {
  it("does not describe a CPL fees guide as a Course", () => {
    expect(graphTypes("/courses/cpl")).toContain("Course");
    expect(graphTypes("/courses/cpl/fees")).not.toContain("Course");
  });

  it("does not add FAQPage schema to a page without a visible FAQ", () => {
    expect(graphTypes("/locations")).not.toContain("FAQPage");
  });

  it("uses one education organization and omits the unsupported site-search action", () => {
    const html = readFileSync(resolve(__dirname, "../../index.html"), "utf8");
    const jsonLd = html.match(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
    );
    expect(jsonLd?.[1]).toBeTruthy();

    const { ["@graph"]: nodes } = JSON.parse(jsonLd?.[1] ?? "") as JsonLdGraph;
    expect(
      nodes.filter(
        (node) => node["@id"] === "https://www.flystar.co.in/#organization",
      ),
    ).toHaveLength(1);
    expect(nodes.some((node) => node["@type"] === "SearchAction")).toBe(false);
  });
});
