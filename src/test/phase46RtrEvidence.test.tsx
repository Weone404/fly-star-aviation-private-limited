import { cleanup, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

import RTRPage from "@/pages/rtr";
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

describe("Phase 46 RTR(A) evidence remediation", () => {
  beforeEach(() => {
    vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("renders only the verified 2025 rule framework in the core RTR claims", () => {
    const { container } = renderWithRouter(<RTRPage />);
    const text = container.textContent ?? "";

    expect(text).toMatch(/16 years of age/i);
    expect(text).toMatch(/Class X or equivalent/i);
    expect(text).toMatch(/written examination before appearing for the practical examination/i);
    expect(text).toMatch(/three years/i);
    expect(text).toMatch(/valid until the holder attains 80 years of age/i);
    expect(text).toMatch(/not a verified or complete DGCA RTR\(A\) syllabus/i);
    expect(text).not.toMatch(/18 years old|10\+2 with Physics|6 times per year|Delhi, Mumbai, Chennai|Lifetime|30-45 Minutes|20-30 Minutes|WPC Wing|same attempt|cannot legally fly|globally recognized|cannot obtain CPL/i);
  });

  it("links the exact official 2025 rules and keeps visible FAQ text aligned with schema", () => {
    const { container } = renderWithRouter(<RTRPage />);
    const link = container.querySelector(
      'a[href="https://civilaviation.gov.in/sites/default/files/2025-11/telephone-operator-restricted-certificate-and-licence-rules-2025.pdf"]',
    );

    expect(link).not.toBeNull();
    expect(PAGE_FAQS["/rtr"]).toBeDefined();
    expect(PAGE_FAQS["/rtr"].length).toBeGreaterThanOrEqual(8);

    for (const faq of PAGE_FAQS["/rtr"]) {
      expect(screen.getByText(faq.q)).toBeInTheDocument();
      expect(screen.getByText(faq.a)).toBeInTheDocument();
    }

    const graph = buildGraph("/rtr");
    const nodes = graph?.["@graph"] as Array<Record<string, unknown>> | undefined;
    expect(nodes?.some((node) => node["@type"] === "FAQPage")).toBe(true);
  });

  it("preserves the existing RTR route and removes unsupported exam claims", () => {
    renderWithRouter(<RTRPage />);
    const text = document.body.textContent ?? "";

    expect(screen.getByRole("heading", { level: 1, name: "RTR Full Form – Radio Telephony Restricted" })).toBeInTheDocument();
    expect(text).not.toMatch(/Panel includes DGCA and WPC|both Part 1 and Part 2|exam is held six times|globally recognized|Airlines prefer candidates/i);
  });
});
