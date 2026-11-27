import { act, cleanup, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

import SpecialOfferBanner from "@/pages/Specialofferbanner";
import PilotTrainingPage from "@/pages/pilotTraining/PilotTraining";
import BecomePilotPage from "@/pages/BecomeAPilot/become-pilot";
import DGCAGroundClassesPage from "@/pages/dgca/ground-classes";

class MockIntersectionObserver {
  observe() {}
  disconnect() {}
  unobserve() {}
  takeRecords() { return []; }
  root = null;
  rootMargin = "";
  thresholds: number[] = [];

  constructor(_callback: IntersectionObserverCallback) {}
}

function renderWithRouter(ui: ReactNode) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe("Phase 43 factual claims", () => {
  beforeEach(() => {
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
    sessionStorage.clear();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("shows a ground-classes enquiry without unsupported price or complete-training claims", () => {
    vi.useFakeTimers();
    renderWithRouter(<SpecialOfferBanner />);

    act(() => {
      vi.advanceTimersByTime(250);
    });

    expect(screen.getByText("CPL ground classes")).toBeInTheDocument();
    expect(screen.getByText("Ask about classes")).toBeInTheDocument();
    expect(screen.getByText(/Ground classes only; aircraft flying training is separate/i)).toBeInTheDocument();
    expect(screen.queryByText(/29–32 Lakhs|Complete CPL training/i)).not.toBeInTheDocument();
  });

  it("does not present unverified eligibility values or aircraft practice as Flying Star training", () => {
    const { container } = renderWithRouter(<PilotTrainingPage />);
    const pageText = container.textContent ?? "";

    expect(pageText).toMatch(/Check current DGCA criteria for the licence sought/i);
    expect(pageText).toMatch(/Flying Star Aviator provides ground-based academic preparation/i);
    expect(pageText).toMatch(/does not describe aircraft flight instruction/i);
    expect(pageText).not.toMatch(/17 years \(PPL\)|18 years \(CPL\)|ICAO Level 4|6\/6 \(correctable\)|No specific requirement/i);
    expect(pageText).not.toMatch(/aviation theory and practice/i);
  });

  it("does not publish unverified pilot eligibility, flight-hour, fee or salary figures", () => {
    const { container } = renderWithRouter(<BecomePilotPage />);
    const pageText = container.textContent ?? "";

    expect(pageText).toMatch(/verify age, education, medical, language, examination/i);
    expect(pageText).toMatch(/No estimate published/);
    expect(pageText).not.toMatch(/200 (?:flight|flying) hours|₹\s?\d|18 to 36 months|ICAO Level 4|50% aggregate|Class 1 Medical: Mandatory/i);
    expect(pageText).not.toMatch(/employment letter of intent|fully funded training|huge demand for pilots/i);
  });

  it("does not claim a DGCA pass rate, fixed ground-class fee, approval or exam pass mark", () => {
    const { container } = renderWithRouter(<DGCAGroundClassesPage />);
    const pageText = container.textContent ?? "";

    expect(pageText).toMatch(/Request a current written quotation/i);
    expect(pageText).toMatch(/current official rules and notices/i);
    expect(pageText).not.toMatch(/100%.*Pass Rate|₹1\.5\s?[-–]\s?3\.5 Lakhs|DGCA\s+Approved|70%|WPC Wing|Join thousands of other pilots/i);
  });
});
