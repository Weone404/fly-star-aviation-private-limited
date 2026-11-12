import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { CTASection } from "@/components/home/CTASection";
import { WorldMapSection } from "@/components/home/WorldMapSection";
import PilotTrainingPage from "@/pages/pilotTraining/PilotTraining";
import ServicesPage from "@/pages/Services";

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
  });
});
