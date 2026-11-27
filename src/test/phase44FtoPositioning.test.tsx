import { cleanup, render } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

import ApplyPage from "@/pages/Apply";
import FtoRankingPage from "@/pages/dgca/fto-ranking";
import { buildGraph, PAGE_FAQS } from "@/lib/schema";

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

describe("Phase 44 FTO positioning", () => {
  beforeEach(() => {
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("does not imply Flying Star has partner FTOs on the apply page or in its FAQ schema", () => {
    const { container } = renderWithRouter(<ApplyPage />);
    const text = container.textContent ?? "";

    expect(text).not.toMatch(/partner FTO/i);
    expect(text).toMatch(/aircraft flying training is a separate stage and is not provided by Flying Star/i);
    expect(PAGE_FAQS["/apply"].map(({ a }) => a).join(" ")).not.toMatch(/partner FTO/i);
    expect(JSON.stringify(buildGraph("/apply"))).not.toMatch(/partner FTO/i);
  });

  it("keeps FTO ranking guidance separate from any Flying Star partnership claim", () => {
    const { container } = renderWithRouter(<FtoRankingPage />);
    const text = container.textContent ?? "";

    expect(text).not.toMatch(/partner FTO/i);
    expect(text).toMatch(/Flying Star does not provide aircraft flying training/i);
    expect(text).toMatch(/confirm any separate FTO arrangements directly with the provider/i);
  });
});
