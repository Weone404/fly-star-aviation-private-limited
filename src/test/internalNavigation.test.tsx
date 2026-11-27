import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import type { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { CTASection } from "@/components/home/CTASection";
import { WorldMapSection } from "@/components/home/WorldMapSection";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import PilotTrainingPage from "@/pages/pilotTraining/PilotTraining";
import ServicesPage from "@/pages/Services";
import AircraftShowcase from "@/pages/services/charter-services";

class MockIntersectionObserver {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
  takeRecords = vi.fn(() => []);
  root = null;
  rootMargin = "";
  thresholds: number[] = [];

  constructor(_callback: IntersectionObserverCallback) {}
}

function renderWithRouter(ui: ReactNode) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe("internal navigation", () => {
  beforeEach(() => {
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it("uses existing destinations for the homepage eligibility and salary links", () => {
    renderWithRouter(<CTASection />);

    expect(screen.getByRole("link", { name: "CPL Eligibility" })).toHaveAttribute(
      "href",
      "/become-a-pilot/become-pilot",
    );
    expect(screen.getByRole("link", { name: "Pilot Salary in India" })).toHaveAttribute(
      "href",
      "/pilot-salary-india",
    );
  });

  it("uses the lowercase canonical CPL URL in the Courses navigation", () => {
    renderWithRouter(<Header />);

    expect(screen.getByRole("link", { name: "Courses" })).toHaveAttribute(
      "href",
      "/courses/cpl",
    );
  });

  it("opens and closes the desktop submenu with keyboard-accessible controls", () => {
    renderWithRouter(<Header />);

    const toggle = screen.getByRole("button", { name: "Courses submenu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("link", { name: "Adapt test IndiGo" })).not.toBeInTheDocument();

    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    const child = screen.getByRole("link", { name: "Adapt test IndiGo" });
    expect(child).toHaveAttribute("href", "/courses/Indigo-pilot-interview");
    child.focus();
    fireEvent.keyDown(child, { key: "Escape" });
    expect(toggle).toHaveFocus();
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("link", { name: "Adapt test IndiGo" })).not.toBeInTheDocument();
  });

  it("preserves pointer access to the course submenu", () => {
    renderWithRouter(<Header />);

    const toggle = screen.getByRole("button", { name: "Courses submenu" });
    const group = toggle.parentElement?.parentElement;
    if (!group) throw new Error("Course navigation group missing");
    fireEvent.mouseEnter(group);
    expect(screen.getByRole("link", { name: "Adapt test Air India" })).toBeInTheDocument();
    fireEvent.mouseLeave(group);
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("uses section-level headings for the footer groups", () => {
    const { container } = renderWithRouter(<Footer />);

    expect(container.querySelectorAll("footer h2")).toHaveLength(4);
    expect(container.querySelector("footer h4")).toBeNull();
  });

  it("does not render a map marker for the unavailable Canada guide", () => {
    const { container } = renderWithRouter(<WorldMapSection />);
    const markers = container.querySelectorAll<SVGGElement>('svg > g[style*="cursor: pointer"]');

    const markerLabels = Array.from(markers, (marker) => {
      fireEvent.mouseEnter(marker);
      return marker.textContent ?? "";
    });

    expect(markers).toHaveLength(7);
    expect(markerLabels.some((label) => /Canada|Canda/.test(label))).toBe(false);
  });

  it("links service cards only to available pages and omits the unconfirmed aircraft-management card", () => {
    renderWithRouter(<ServicesPage />);

    const destinations = screen
      .getAllByRole("link", { name: "Learn More" })
      .map((link) => link.getAttribute("href"));

    expect(destinations).toEqual([
      "/dgca/ground-classes",
      "/dgca",
      "/courses/airline-preparation",
      "/services/charter-services",
      "/services/aircraft-sourcing-sale",
    ]);
    expect(
      screen.queryByRole("heading", { name: "Aircraft Management" }),
    ).not.toBeInTheDocument();
    expect(
      screen.getByText(
        (_, element) =>
          element?.tagName === "P" &&
          element.textContent?.replace(/\s+/g, " ").trim() ===
            "CPL and ATPL ground classes for DGCA theory preparation. Aircraft flying training is separate; verify current DGCA requirements and any selected FTO's approval and scope.",
      ),
    ).toBeInTheDocument();
    expect(screen.queryByText(/success rate exceeds 95%/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/guaranteed job assistance|direct placement support/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Job placement or employment is not guaranteed/)).toBeInTheDocument();
    expect(screen.queryByText(/24\/7 across India|medical evacuation|global inventory|complete documentation and legal support/i))
      .not.toBeInTheDocument();
  });

  it("uses existing CPL, PPL, eligibility, and syllabus destinations on pilot training", () => {
    renderWithRouter(<PilotTrainingPage />);

    expect(
      screen.getAllByRole("link", { name: "Learn More" }).map((link) => link.getAttribute("href")),
    ).toEqual(["/courses/cpl", "/pilot-training/ppl"]);
    expect(screen.getByRole("link", { name: "Check Full Eligibility" })).toHaveAttribute(
      "href",
      "/become-a-pilot/become-pilot",
    );
    expect(screen.getByRole("link", { name: "View Complete Syllabus" })).toHaveAttribute(
      "href",
      "/courses/cpl",
    );
    expect(screen.getByRole("link", { name: "DGCA ground classes" })).toHaveAttribute(
      "href",
      "/dgca/ground-classes",
    );
    expect(screen.getByRole("link", { name: "DGCA Computer Number" })).toHaveAttribute(
      "href",
      "/dgca/computer-number",
    );
    expect(screen.getByRole("link", { name: "DGCA medical requirements" })).toHaveAttribute(
      "href",
      "/dgca/medical",
    );
    expect(screen.getByRole("link", { name: "Understand the CPL ground and flying stages" })).toHaveAttribute(
      "href",
      "/pilot-training/cpl",
    );
    expect(screen.queryByText("Most Popular")).not.toBeInTheDocument();
    const routeTable = screen.getByRole("region", {
      name: "Pilot training routes: India, USA and South Africa",
    });
    expect(within(routeTable).getAllByRole("columnheader")).toHaveLength(2);
    expect(within(routeTable).queryByText(/₹|months|Lower cost|hour-building/i)).not.toBeInTheDocument();
  });

  it("provides a stable charter heading and accessible, user-controlled carousel", () => {
    renderWithRouter(<AircraftShowcase />);

    expect(screen.getByRole("heading", { name: "Charter Services", level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "King Air B200", level: 2 })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Aircraft management" })).toHaveAttribute(
      "href",
      "/services/aircraft-management",
    );
    expect(screen.getByRole("link", { name: "Aircraft sourcing and sale" })).toHaveAttribute(
      "href",
      "/services/aircraft-sourcing-sale",
    );

    fireEvent.click(screen.getByRole("button", { name: "Next aircraft" }));
    expect(screen.getByRole("heading", { name: "King Air C-90", level: 2 })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Show King Air C-90" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );

    const rotation = screen.getByRole("button", { name: "Start automatic rotation" });
    expect(rotation).toHaveAttribute("aria-pressed", "false");
    fireEvent.click(rotation);
    expect(screen.getByRole("button", { name: "Pause automatic rotation" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });
});
