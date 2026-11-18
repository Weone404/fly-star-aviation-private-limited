import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";

import CadetPilotProgrammePage from "@/pages/CadetPilotProgramme";
import CplFeesPage from "@/pages/Courses/CplFees";
import DgcaFtoRankingPage from "@/pages/dgca/fto-ranking";
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
});
