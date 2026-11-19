import { render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

import CplPage from "@/pages/Courses/Cpl";
import CplFeesPage from "@/pages/Courses/CplFees";
import AirlinePreparationPage from "@/pages/Courses/airline-preparation";
import CabinCrewPage from "@/pages/Courses/cabin-crew";
import GroundStaffPage from "@/pages/Courses/ground-staff";
import IndiGoPilotInterviewPage from "@/pages/Courses/Indigo-pilot-interview";
import AirIndiaPilotInterviewPage from "@/pages/Courses/Air-india-pilot-interview";
import { buildGraph, PAGE_FAQS } from "@/lib/schema";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("CPL course page", () => {
  it.each([
    ["/courses/cpl", ["Home", "CPL Training"]],
    ["/courses/atpl", ["Home", "ATPL Training"]],
    ["/courses/cpl/fees", ["Home", "CPL Training", "Fees"]],
  ])("omits the nonexistent courses parent and numbers the %s breadcrumbs", (path, names) => {
    const graph = buildGraph(path);
    const nodes = graph?.["@graph"] as Array<Record<string, unknown>>;
    const breadcrumb = nodes.find((node) => node["@type"] === "BreadcrumbList");
    const items = breadcrumb?.itemListElement as Array<{ name: string; item: string; position: number }>;

    expect(items.map((item) => item.name)).toEqual(names);
    expect(items.map((item) => item.position)).toEqual(names.map((_, index) => index + 1));
    expect(items.map((item) => item.item)).not.toContain("https://www.flystar.co.in/courses");
  });

  it("matches the visible CPL fees breadcrumb to its structured trail", () => {
    render(<MemoryRouter><CplFeesPage /></MemoryRouter>);
    const breadcrumb = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(within(breadcrumb).getByRole("link", { name: "CPL Training" })).toHaveAttribute("href", "/courses/cpl");
    expect(within(breadcrumb).getByText("Fees")).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Pilot course fees in India: what you pay for and who sets it" }))
      .toHaveAttribute("tabindex", "0");
  });

  it.each([
    ["/courses/airline-preparation", "Airline Preparation", AirlinePreparationPage],
    ["/courses/cabin-crew", "Cabin Crew", CabinCrewPage],
    ["/courses/ground-staff", "Ground Staff", GroundStaffPage],
    ["/courses/Indigo-pilot-interview", "IndiGo Pilot Interview", IndiGoPilotInterviewPage],
    ["/courses/Air-india-pilot-interview", "Air India Pilot Interview", AirIndiaPilotInterviewPage],
  ])("matches the visible and structured breadcrumbs for %s", (path, label, Page) => {
    vi.stubGlobal("IntersectionObserver", class {
      observe() {}
      unobserve() {}
      disconnect() {}
    });
    render(<MemoryRouter initialEntries={[path]}><Page /></MemoryRouter>);
    const navigation = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(within(navigation).getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(within(navigation).getByText(label)).toBeInTheDocument();

    const nodes = buildGraph(path)?.["@graph"] as Array<Record<string, unknown>>;
    const breadcrumb = nodes.find((node) => node["@type"] === "BreadcrumbList");
    expect(breadcrumb?.itemListElement).toEqual([
      expect.objectContaining({ name: "Home", item: "https://www.flystar.co.in/", position: 1 }),
      expect.objectContaining({ name: label, item: `https://www.flystar.co.in${path}`, position: 2 }),
    ]);
  });

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
