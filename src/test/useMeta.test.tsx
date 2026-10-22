import { afterEach, describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useMeta } from "@/hooks/useMeta";
import { getRouteMeta } from "@/lib/routeMeta";

const originalHead = document.head.innerHTML;

function MetaHarness() {
  useMeta();
  return null;
}

afterEach(() => {
  document.head.innerHTML = originalHead;
});

describe("useMeta", () => {
  it("deduplicates page metadata and applies route-specific values", () => {
    document.head.innerHTML = [
      "<title>Old title</title>",
      "<title>Conflicting page title</title>",
      '<meta name="description" content="Old description">',
      '<meta name="description" content="Conflicting page description">',
      '<link rel="canonical" href="https://www.flystar.co.in/old">',
      '<link rel="canonical" href="https://www.flystar.co.in/conflicting">',
      '<meta property="og:title" content="Old social title">',
      '<meta property="og:title" content="Conflicting social title">',
      '<meta name="twitter:description" content="Old social description">',
      '<meta name="twitter:description" content="Conflicting social description">',
    ].join("");

    render(
      <MemoryRouter initialEntries={["/dgca/ground-classes"]}>
        <MetaHarness />
      </MemoryRouter>,
    );

    const expected = getRouteMeta("/dgca/ground-classes");
    expect(document.head.querySelectorAll("title")).toHaveLength(1);
    expect(document.title).toBe(expected.title);
    expect(document.head.querySelectorAll('meta[name="description"]')).toHaveLength(1);
    expect(document.head.querySelector('meta[name="description"]')?.getAttribute("content")).toBe(expected.description);
    expect(document.head.querySelectorAll('link[rel~="canonical"]')).toHaveLength(1);
    expect(document.head.querySelector('link[rel~="canonical"]')?.getAttribute("href")).toBe(expected.canonical);
    expect(document.head.querySelectorAll('meta[property="og:title"]')).toHaveLength(1);
    expect(document.head.querySelector('meta[property="og:title"]')?.getAttribute("content")).toBe(expected.ogTitle ?? expected.title);
    expect(document.head.querySelectorAll('meta[name="twitter:description"]')).toHaveLength(1);
    expect(document.head.querySelector('meta[name="twitter:description"]')?.getAttribute("content")).toBe(expected.description);
  });
});
