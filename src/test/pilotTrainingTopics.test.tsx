import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import PilotTrainingTopic from "@/pages/pilotTraining/topics";

describe("PilotTrainingTopic", () => {
  it("renders a topic from its explicitly registered URL", () => {
    render(
      <MemoryRouter initialEntries={["/pilot-training/ppl"]}>
        <Routes>
          <Route path="/pilot-training/ppl" element={<PilotTrainingTopic />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "PPL Training in India: Eligibility, Exams and What It Does Not Get You",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "What do PPL course fees in India cover?" }),
    ).toBeInTheDocument();
    expect(document.querySelector('time[datetime="2026-11-02"]')).toBeInTheDocument();
  });
});
