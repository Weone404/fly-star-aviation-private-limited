import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";

import ApplyPage from "@/pages/Apply";

const { toastMock } = vi.hoisted(() => ({ toastMock: vi.fn() }));

vi.mock("@/hooks/use-toast", () => ({
  useToast: () => ({ toast: toastMock }),
}));

vi.mock("@/components/layout/Layout", () => ({
  Layout: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  toastMock.mockReset();
});

function renderApplyPage() {
  render(
    <MemoryRouter>
      <ApplyPage />
    </MemoryRouter>,
  );
}

function fillRequiredFields() {
  fireEvent.change(screen.getByLabelText("Full name"), {
    target: { value: "Asha" },
  });
  fireEvent.change(screen.getByLabelText("Phone"), {
    target: { value: "+91 98765 43210" },
  });
  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: "asha@example.com" },
  });
}

function submitForm() {
  fireEvent.click(screen.getByRole("button", { name: /Send enquiry/ }));
}

describe("Apply form submission", () => {
  it("shows confirmation only after the API explicitly confirms success", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ success: true }), { status: 201 }),
    );
    vi.stubGlobal("fetch", fetchMock);
    renderApplyPage();
    fillRequiredFields();

    submitForm();

    expect(await screen.findByRole("heading", { name: "Received" })).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/contact",
      expect.objectContaining({ method: "POST" }),
    );
  });

  it.each([
    ["malformed JSON", new Response("not JSON", { status: 201 })],
    ["missing success flag", new Response(JSON.stringify({ message: "Saved" }), { status: 201 })],
    ["explicit failure", new Response(JSON.stringify({ success: false }), { status: 201 })],
  ])("keeps the form open for an API response with %s", async (_case, response) => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response));
    renderApplyPage();
    fillRequiredFields();

    submitForm();

    expect(screen.queryByRole("heading", { name: "Received" })).not.toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /Send enquiry/ })).toBeEnabled();
      expect(toastMock).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "That did not go through",
          variant: "destructive",
        }),
      );
    });
  });

  it.each([
    ["an HTTP error", () => Promise.resolve(new Response("Unavailable", { status: 503 }))],
    ["a network error", () => Promise.reject(new Error("offline"))],
  ])("keeps the form open after %s", async (_case, response) => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.stubGlobal("fetch", vi.fn().mockImplementation(response));
    renderApplyPage();
    fillRequiredFields();

    submitForm();

    expect(screen.queryByRole("heading", { name: "Received" })).not.toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /Send enquiry/ })).toBeEnabled();
      expect(toastMock).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "That did not go through",
          variant: "destructive",
        }),
      );
    });
  });

  it("does not send a request when required fields are invalid", () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    renderApplyPage();

    submitForm();

    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.getByText("Name is required")).toBeInTheDocument();
    expect(screen.getByText("Phone is required")).toBeInTheDocument();
    expect(screen.getByText("Email is required")).toBeInTheDocument();
  });
});
