import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import { STATIC_BLOG_POSTS } from "@/lib/blogData";
import { getRouteMeta } from "@/lib/routeMeta";
import CadetPilotProgrammePage from "@/pages/CadetPilotProgramme";
import CplFeesPage from "@/pages/Courses/CplFees";
import DgcaFtoRankingPage from "@/pages/dgca/fto-ranking";
import DGCAMedicalGuidePage from "@/pages/dgca/medical";
import PilotSalaryIndiaPage from "@/pages/PilotSalaryIndia";

function renderPage(page: React.ReactElement) {
  return render(<MemoryRouter>{page}</MemoryRouter>);
}

describe("keyword expansion", () => {
  it("explains monthly pay and qualifies airline-specific estimates", () => {
    renderPage(<PilotSalaryIndiaPage />);

    expect(screen.getByRole("heading", { name: /pilot salary in india per month/i })).toBeInTheDocument();
    const section = screen.getByRole("heading", { name: /assess an indigo pilot salary estimate/i }).closest("section");
    if (!section) throw new Error("IndiGo salary section was not rendered");
    expect(within(section).getByText(/have not verified a current/i)).toBeInTheDocument();
  });

  it("links fee comparisons to IGRUA and distinguishes course fee from total", () => {
    const { unmount } = renderPage(<CplFeesPage />);
    expect(screen.getByRole("link", { name: /igrua comparison/i })).toHaveAttribute("href", "/dgca/fto-ranking#igrua");
    unmount();

    renderPage(<DgcaFtoRankingPage />);
    const section = screen.getByRole("heading", { name: /compare igrua/i }).closest("section");
    if (!section) throw new Error("IGRUA section was not rendered");
    expect(within(section).getByRole("link", { name: /official course page/i })).toHaveAttribute("href", "https://igrua.gov.in/approved-courses");
    expect(within(section).getByText(/not a complete budget/i)).toBeInTheDocument();
  });

  it("does not present an unverified Air India cadet fee as a price", () => {
    renderPage(<CadetPilotProgrammePage />);
    const section = screen.getByRole("heading", { name: /air india cadet pilot programme fees/i }).closest("section");
    if (!section) throw new Error("Air India fee section was not rendered");
    expect(within(section).getByText(/have not independently verified/i)).toBeInTheDocument();
    expect(within(section).getByRole("link", { name: /air india's programme information/i })).toHaveAttribute("href", expect.stringContaining("airindia.com"));
  });

  it("qualifies the ambiguous Medical 2 phrase as a Class 2 medical query", () => {
    renderPage(<DGCAMedicalGuidePage />);

    expect(screen.getByText(/if by "Medical 2" you mean the pilot medical category/i))
      .toHaveTextContent(/official term, Class 2 Medical/i);
  });

  it("keeps the keyword-targeted metadata within search snippet limits", () => {
    const routeMetadata = [
      { route: "/pilot-training", meta: getRouteMeta("/pilot-training") },
      { route: "/pilot-training/india", meta: getRouteMeta("/pilot-training/india") },
      { route: "/pilot-salary-india", meta: getRouteMeta("/pilot-salary-india") },
      { route: "/cadet-pilot-programme", meta: getRouteMeta("/cadet-pilot-programme") },
      { route: "/dgca/fto-ranking", meta: getRouteMeta("/dgca/fto-ranking") },
      { route: "/courses/cpl/fees", meta: getRouteMeta("/courses/cpl/fees") },
      { route: "/glossary", meta: getRouteMeta("/glossary") },
    ];
    const blogMetadata = [
      STATIC_BLOG_POSTS.find((post) => post.slug === "air-hostess-salary-in-india-2026"),
      STATIC_BLOG_POSTS.find((post) => post.slug === "dgca-exam-subjects-by-licence"),
    ];

    expect(getRouteMeta("/pilot-training").title).toMatch(/aviation courses after 12th/i);
    expect(getRouteMeta("/courses/cpl/fees").title).toMatch(/pilot course fees in india/i);
    expect(getRouteMeta("/pilot-salary-india").description).toMatch(/commercial pilot salary/i);
    expect(getRouteMeta("/cadet-pilot-programme").description).toMatch(/air india fee terms/i);
    expect(getRouteMeta("/dgca/fto-ranking").description).toMatch(/top-10 pilot-training fee list/i);
    expect(getRouteMeta("/glossary").description).toMatch(/duty time/i);
    expect(blogMetadata.every(Boolean)).toBe(true);

    for (const { route, meta } of routeMetadata) {
      expect(meta.title.length, `${route} title exceeds 60 characters`).toBeLessThanOrEqual(60);
      expect(meta.description.length, `${route} description exceeds 155 characters`).toBeLessThanOrEqual(155);
    }

    for (const post of blogMetadata) {
      if (!post) throw new Error("Expected keyword-targeted blog metadata was not found");
      expect(post.seoTitle.length).toBeLessThanOrEqual(60);
      expect(post.metaDescription.length).toBeLessThanOrEqual(155);
    }
  });
});
