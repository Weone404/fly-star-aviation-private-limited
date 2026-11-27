import { fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import PilotSalaryIndiaPage from "@/pages/PilotSalaryIndia";
import { PILOT_SALARY_FAQS } from "@/lib/pilotSalaryFaqs";
import { buildGraph } from "@/lib/schema";
import { getRouteMeta } from "@/lib/routeMeta";

const PATH = "/pilot-salary-in-india";

describe("Pilot salary in India guide", () => {
  it("renders the complete guide, responsive tables, and working contents anchors", () => {
    const { container } = render(
      <MemoryRouter initialEntries={[PATH]}>
        <PilotSalaryIndiaPage />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", {
      level: 1,
      name: "Pilot Salary in India 2026 – Monthly Earnings, Airline-Wise Pay and Career Growth",
    })).toBeInTheDocument();
    expect(container.querySelectorAll("h1")).toHaveLength(1);
    expect(container.querySelectorAll("table")).toHaveLength(3);

    const anchors = [...container.querySelectorAll('a[href^="#"]')];
    expect(anchors.length).toBeGreaterThan(0);
    for (const anchor of anchors) {
      const targetId = anchor.getAttribute("href")?.slice(1);
      expect(targetId && container.querySelector(`#${targetId}`)).not.toBeNull();
    }

    expect(container.textContent).toContain("Pawan Hans");
    expect(container.textContent).toContain("Female Pilot Salary in India");
    expect(container.textContent).toContain("Pilot Training Cost and Return on Investment");
  });

  it("keeps all visible FAQ text aligned with one FAQPage and Article schema", () => {
    const { container } = render(
      <MemoryRouter initialEntries={[PATH]}>
        <PilotSalaryIndiaPage />
      </MemoryRouter>,
    );
    const graph = buildGraph(PATH);

    expect(graph).not.toBeNull();
    if (!graph || !Array.isArray(graph["@graph"])) {
      throw new Error("Pilot salary schema graph is missing");
    }

    const nodes = graph["@graph"] as Record<string, unknown>[];
    const faq = nodes.find((node) => node["@type"] === "FAQPage");
    const article = nodes.find((node) => node["@type"] === "Article");
    const visibleText = container.textContent ?? "";

    expect(nodes.filter((node) => node["@type"] === "FAQPage")).toHaveLength(1);
    expect(article).toMatchObject({
      headline: "Pilot Salary in India 2026 – Monthly Earnings, Airline-Wise Pay and Career Growth",
      datePublished: "2026-11-27",
      dateModified: "2026-11-27",
    });
    expect(faq?.mainEntity).toEqual(
      PILOT_SALARY_FAQS.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    );
    for (const { q, a } of PILOT_SALARY_FAQS) {
      expect(visibleText).toContain(q);
      expect(visibleText).toContain(a);
    }
  });

  it("uses the requested canonical URL and redirects the old slug to it", () => {
    expect(getRouteMeta(PATH).canonical).toBe(`https://www.flystar.co.in${PATH}`);
    expect(getRouteMeta("/pilot-salary-india").canonical).toBe(`https://www.flystar.co.in${PATH}`);
    expect(getRouteMeta(PATH).title).toBe(
      "Pilot Salary in India 2026 – Monthly Pay, Airlines & Career Growth | Flying Star Aviator",
    );
    expect(getRouteMeta(PATH).description).toBe(
      "Explore pilot salary in India in 2026, including airline-wise pay, First Officer and Captain earnings, starting salary, career growth and pilot training costs.",
    );
  });

  it("allows the mobile contents panel to open and navigate", () => {
    const { container } = render(
      <MemoryRouter initialEntries={[PATH]}>
        <PilotSalaryIndiaPage />
      </MemoryRouter>,
    );
    const mobileContents = container.querySelector("details");

    expect(mobileContents).not.toBeNull();
    if (!mobileContents) return;
    fireEvent.click(screen.getByText("Table of contents"));
    expect(mobileContents.open).toBe(true);
    expect(within(mobileContents).getByRole("link", { name: /Introduction/ })).toHaveAttribute("href", "#introduction");
  });
});
