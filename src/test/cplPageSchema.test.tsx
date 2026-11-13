import { render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

import CplPage from "@/pages/Courses/Cpl";
import { buildGraph, PAGE_FAQS } from "@/lib/schema";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("CPL course page", () => {
  it("keeps the Course schema without FAQPage markup", () => {
    const graph = buildGraph("/courses/cpl");
    const nodes = graph?.["@graph"] as Array<Record<string, unknown>> | undefined;
    const course = nodes?.find((node) => node["@type"] === "Course");

    expect(course).toBeDefined();
    expect(course).not.toHaveProperty("hasCourseInstance");
    expect(nodes?.some((node) => node["@type"] === "FAQPage")).toBe(false);
  });

  it("uses the current four-paper grouping and links to updated exam guidance", () => {
    vi.stubGlobal("IntersectionObserver", class {
      observe() {}
      unobserve() {}
      disconnect() {}
    });

    const { container } = render(
      <MemoryRouter>
        <CplPage />
      </MemoryRouter>,
    );
    const section = screen.getByRole("heading", { name: "DGCA CPL Ground Training Subjects" }).closest("section");

    if (!section) throw new Error("CPL subject section was not rendered");

    expect(within(section).getAllByRole("row")).toHaveLength(5);
    expect(within(section).getByText("Aircraft and Engine / Instruments")).toBeInTheDocument();
    expect(within(section).queryByText("Technical Specific")).not.toBeInTheDocument();
    expect(container.querySelector('a[href="/blog/dgca-exam-subjects-by-licence"]')).not.toBeNull();
    expect(container.querySelector('a[href="/blog/rtr-a-exam-dgca-takeover-2026"]')).not.toBeNull();
  });

  it("does not describe RTR(A) as a WPC-administered CPL theory paper", () => {
    const faqs = PAGE_FAQS["/courses/cpl"];
    const subjectsAnswer = faqs.find((faq) => faq.q === "What subjects are covered in CPL ground classes?")?.a;
    const rtrAnswer = faqs.find((faq) => faq.q === "What is RTR(A) and why is it required?")?.a;

    expect(subjectsAnswer).toContain("RTR(A) is a separate radio-telephony requirement");
    expect(rtrAnswer).toContain("changed under the 2025 rules");
    expect(subjectsAnswer).not.toContain("WPC Wing");
    expect(rtrAnswer).not.toContain("WPC Wing");
  });
});
