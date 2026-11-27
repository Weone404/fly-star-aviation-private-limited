import { cleanup, render } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it } from "vitest";
import { MemoryRouter } from "react-router-dom";

import CadetPilotProgrammePage from "@/pages/CadetPilotProgramme";
import PilotSalaryIndiaPage from "@/pages/PilotSalaryIndia";
import CplFeesPage from "@/pages/Courses/CplFees";
import ComputerNumberPage from "@/pages/dgca/computer-number";
import ExamCalendarPage from "@/pages/dgca/exam-calendar";
import FtoRankingPage from "@/pages/dgca/fto-ranking";
import { buildGraph, PAGE_FAQS } from "@/lib/schema";

afterEach(cleanup);

function renderWithRouter(ui: ReactNode) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe("Phase 45 evidence-led claim corrections", () => {
  it("uses the DGCA online Computer Number process and accurately qualifies exam-fee refunds", () => {
    const { container } = renderWithRouter(<ComputerNumberPage />);
    const text = container.textContent ?? "";

    expect(text).toMatch(/no hard copy is required for Computer Number or profile-update applications/i);
    expect(text).toMatch(/refund request for a successful payment transaction where the examination form was not submitted successfully/i);
    expect(text).not.toMatch(/hard copy you post to Delhi|against the posted hard copy|Annexure A, submitted in quintuplicate by post|not refundable under any circumstances/i);
    expect(text).toMatch(/the FAQ does not state that this form must be sent in quintuplicate by post/i);
    expect(JSON.stringify(buildGraph("/dgca/computer-number"))).not.toMatch(/hard copy posted by the candidate/i);
  });

  it("does not extend the 2026 exam calendar into unsupported process or validity rules", () => {
    const { container } = renderWithRouter(<ExamCalendarPage />);
    const text = container.textContent ?? "";

    expect(text).toMatch(/does not establish whether eligibility, examination format, fees or pass rules are identical/i);
    expect(text).toMatch(/does not state pass-validity periods or attempt limits/i);
    expect(text).not.toMatch(/same papers and same rules|hard copy posted to Delhi|spread.*protects the ones already banked/i);
    expect(JSON.stringify(PAGE_FAQS["/dgca/exam-calendar"])).not.toMatch(/Eligibility and rules are the same|No institute can apply on your behalf/i);
  });

  it("retains first-ranking evidence without unverified later-ranking or pilot-demand figures", () => {
    const { container } = renderWithRouter(<FtoRankingPage />);
    const text = container.textContent ?? "";

    expect(text).toMatch(/thirteen organisations were in band B and twenty-two in band C/i);
    expect(text).toMatch(/175 flying hours.*not a CPL minimum/i);
    expect(text).not.toMatch(/24 April 2026|Avyanna Aviation|2\.5 times|30,000 additional pilots/i);
    expect(JSON.stringify(PAGE_FAQS["/dgca/fto-ranking"])).not.toMatch(/second ranking|Avyanna Aviation|24 April 2026/i);
  });

  it("qualifies unverified CPL cost components and avoids unsupported training sequences", () => {
    const { container } = renderWithRouter(<CplFeesPage />);
    const text = container.textContent ?? "";

    expect(text).toMatch(/A charge was not verified in this review/i);
    expect(text).toMatch(/Required class and current fee were not verified here/i);
    expect(text).not.toMatch(/cheaper per hour than the aircraft|same rate as the first attempt|Medical first, then the computer number|Class 1 assessment is comparatively inexpensive|DGCA papers do not require flying hours/i);
    expect(JSON.stringify(PAGE_FAQS["/courses/cpl/fees"])).not.toMatch(/computer number application, and licence issue|cheapest step/i);
  });

  it("does not publish unverified airline cadet criteria or imply guaranteed employment", () => {
    const { container: cadetContainer } = renderWithRouter(<CadetPilotProgrammePage />);
    const { container: salaryContainer } = renderWithRouter(<PilotSalaryIndiaPage />);
    const combinedText = `${cadetContainer.textContent ?? ""} ${salaryContainer.textContent ?? ""}`;

    expect(combinedText).toMatch(/not verified in this review/i);
    expect(combinedText).toMatch(/does not by itself establish employment/i);
    expect(combinedText).not.toMatch(/18 to 32|22 months|four-month ground school|15 days of training|two attempts per stage/i);
    expect(JSON.stringify(PAGE_FAQS["/cadet-pilot-programme"])).not.toMatch(/18 to 32|22 months|two attempts per stage/i);
    expect(JSON.stringify(PAGE_FAQS["/pilot-salary-india"])).not.toMatch(/18 to 32|Physics and Mathematics for its cadet/i);
  });
});
