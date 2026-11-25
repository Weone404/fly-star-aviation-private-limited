import type { ReactNode } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

import CplPage from "@/pages/Courses/Cpl";

vi.mock("@/components/layout/Layout", () => ({
  Layout: ({ children }: { children: ReactNode }) => children,
}));

describe("CPL slider caption contrast", () => {
  it("keeps a dark gradient stop behind white captions", () => {
    const markup = renderToStaticMarkup(<MemoryRouter><CplPage /></MemoryRouter>);

    expect(markup).toContain("Pilot beside a light aircraft");
    expect(markup).toContain("rgba(0,0,0,0.15)");
  });
});
