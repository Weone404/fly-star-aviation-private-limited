import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ContactPopup from "@/pages/Contactpopup";
import ContactPage from "@/pages/Contact";
import type { ReactNode } from "react";

const { toastMock } = vi.hoisted(() => ({ toastMock: vi.fn() }));

vi.mock("@/hooks/use-toast", () => ({
  useToast: () => ({ toast: toastMock }),
}));

vi.mock("@/components/layout/Layout", () => ({
  Layout: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

beforeEach(() => {
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(_callback: IntersectionObserverCallback) {}
      observe() {}
      unobserve() {}
      disconnect() {}
      takeRecords() {
        return [];
      }
    },
  );
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  toastMock.mockReset();
});

function fillForm() {
  fireEvent.change(screen.getByPlaceholderText("Rahul Sharma"), {
    target: { value: "Asha" },
  });
  fireEvent.change(screen.getByPlaceholderText("+91 XXXXX XXXXX"), {
    target: { value: "+91 98765 43210" },
  });
  fireEvent.change(screen.getByPlaceholderText("rahul@email.com"), {
    target: { value: "asha@example.com" },
  });
}

async function submitForm() {
  await act(async () => {
    fireEvent.click(screen.getByRole("button", { name: "Send via WhatsApp" }));
    await Promise.resolve();
    await Promise.resolve();
  });
  await act(async () => {
    await vi.advanceTimersByTimeAsync(1200);
  });
}

describe("contact popup", () => {
  it("opens from its explicit launcher and keeps a WhatsApp fallback when the popup is blocked", async () => {
    vi.useFakeTimers();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ success: true }), { status: 200 }),
      ),
    );
    vi.spyOn(window, "open").mockReturnValue(null);
    render(<ContactPopup />);

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    const launcher = screen.getByRole("button", { name: "Enquire now" });
    fireEvent.click(launcher);
    const dialog = screen.getByRole("dialog", { name: "Send Us a Message" });
    expect(dialog).toBeInTheDocument();
    expect(dialog).toContainElement(document.activeElement as HTMLElement);
    fillForm();
    await submitForm();

    expect(screen.getByRole("heading", { name: "Continue in WhatsApp" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Continue in WhatsApp" })).toHaveFocus();
    expect(screen.getByRole("link", { name: "Open WhatsApp" })).toHaveAttribute("href", expect.stringContaining("https://wa.me/"));
    expect(toastMock).toHaveBeenCalledWith(
      expect.objectContaining({ title: "WhatsApp did not open", variant: "destructive" }),
    );
  });

  it("cycles only through visible, enabled, tabbable controls", async () => {
    render(<ContactPopup />);
    fireEvent.click(screen.getByRole("button", { name: "Enquire now" }));

    const dialog = screen.getByRole("dialog", { name: "Send Us a Message" });
    const sidebar = dialog.querySelector<HTMLElement>(".fsa-sidebar");
    const close = screen.getByRole("button", { name: "Close enquiry form" });
    const name = screen.getByPlaceholderText("Rahul Sharma");
    const phone = screen.getByPlaceholderText("+91 XXXXX XXXXX");
    const email = screen.getByPlaceholderText("rahul@email.com");

    expect(dialog).toContainElement(document.activeElement as HTMLElement);
    await act(async () => {
      dialog.focus();
      sidebar!.style.display = "none";
      close.setAttribute("disabled", "");
      name.tabIndex = -1;
      phone.setAttribute("disabled", "");
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    act(() => { fireEvent.keyDown(document, { key: "Tab" }); });
    expect(email).toHaveFocus();
    act(() => { fireEvent.keyDown(document, { key: "Tab", shiftKey: true }); });
    expect(screen.getByRole("button", { name: "Send via WhatsApp" })).toHaveFocus();
    expect(dialog).toContainElement(document.activeElement as HTMLElement);
  });

  it("keeps focus contained when the focused control is disabled or removed", async () => {
    render(<ContactPopup />);
    fireEvent.click(screen.getByRole("button", { name: "Enquire now" }));

    const dialog = screen.getByRole("dialog", { name: "Send Us a Message" });
    const name = screen.getByPlaceholderText("Rahul Sharma") as HTMLInputElement;
    const email = screen.getByPlaceholderText("rahul@email.com");

    act(() => { name.focus(); });
    await act(async () => {
      name.disabled = true;
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(dialog).toContainElement(document.activeElement as HTMLElement);
    expect(document.activeElement).not.toBe(name);

    act(() => { email.focus(); });
    await act(async () => {
      email.remove();
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
    expect(dialog).toContainElement(document.activeElement as HTMLElement);
    expect(document.activeElement).not.toBe(document.body);
  });

  it("contains focus when there are zero or one tabbable controls", async () => {
    render(<ContactPopup />);
    fireEvent.click(screen.getByRole("button", { name: "Enquire now" }));

    const dialog = screen.getByRole("dialog", { name: "Send Us a Message" });
    const controls = dialog.querySelectorAll<HTMLElement>(
      "a[href], area[href], button, input:not([type='hidden']), select, textarea, iframe, object, embed, [contenteditable='true'], [tabindex]",
    );
    controls.forEach((control) => { control.tabIndex = -1; });
    await act(async () => { await Promise.resolve(); });

    act(() => { fireEvent.keyDown(document, { key: "Tab" }); });
    expect(dialog).toHaveFocus();

    const close = screen.getByRole("button", { name: "Close enquiry form" });
    close.tabIndex = 0;
    act(() => { fireEvent.keyDown(document, { key: "Tab" }); });
    expect(close).toHaveFocus();
    act(() => { fireEvent.keyDown(document, { key: "Tab", shiftKey: true }); });
    expect(close).toHaveFocus();
  });

  it("closes on Escape and restores focus to the launcher", () => {
    render(<ContactPopup />);
    const launcher = screen.getByRole("button", { name: "Enquire now" });
    fireEvent.click(launcher);
    const dialog = screen.getByRole("dialog", { name: "Send Us a Message" });

    fireEvent.keyDown(document.activeElement as HTMLElement, { key: "Escape" });

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(launcher).toHaveFocus();
    expect(dialog).not.toBeInTheDocument();
  });

  it("restores focus to the launcher when closed with the close control", () => {
    render(<ContactPopup />);
    const launcher = screen.getByRole("button", { name: "Enquire now" });
    fireEvent.click(launcher);

    fireEvent.click(screen.getByRole("button", { name: "Close enquiry form" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(launcher).toHaveFocus();
  });

  it("confirms a saved contact-page enquiry when WhatsApp opens", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ success: true }), { status: 200 }),
      ),
    );
    vi.spyOn(window, "open").mockReturnValue(window);
    render(<ContactPage />);

    fillForm();
    fireEvent.click(screen.getByRole("button", { name: "Send via WhatsApp" }));

    expect(await screen.findByRole("heading", { name: "Continue in WhatsApp" }, { timeout: 3000 })).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(toastMock).toHaveBeenCalledWith(
      expect.objectContaining({ title: "Continue in WhatsApp" }),
    );
    expect(screen.getByRole("link", { name: "Open WhatsApp" })).toHaveAttribute("href", expect.stringContaining("https://wa.me/"));
  });

  it("shows an explicit save failure while preserving the manual WhatsApp fallback", async () => {
    vi.useFakeTimers();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ success: false }), { status: 200 }),
      ),
    );
    vi.spyOn(window, "open").mockReturnValue(null);
    render(<ContactPopup />);

    fireEvent.click(screen.getByRole("button", { name: "Enquire now" }));
    fillForm();
    await submitForm();

    expect(screen.getByRole("alert")).toHaveTextContent("We could not save your enquiry online");
    expect(screen.getByRole("heading", { name: "Continue in WhatsApp" })).toHaveFocus();
    expect(screen.getByRole("link", { name: "Open WhatsApp" })).toHaveAttribute("href", expect.stringContaining("https://wa.me/"));
    expect(toastMock).toHaveBeenCalledWith(
      expect.objectContaining({ title: "Your enquiry was not saved online", variant: "destructive" }),
    );
  });

  it("keeps focus inside while submitting and moves it to the success view", async () => {
    vi.useFakeTimers();
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ success: true }), { status: 200 }),
      ),
    );
    vi.spyOn(window, "open").mockReturnValue(window);
    render(<ContactPopup />);
    fireEvent.click(screen.getByRole("button", { name: "Enquire now" }));
    fillForm();

    const dialog = screen.getByRole("dialog", { name: "Send Us a Message" });
    const submit = screen.getByRole("button", { name: "Send via WhatsApp" });
    submit.focus();
    await act(async () => {
      fireEvent.click(submit);
      await Promise.resolve();
      await Promise.resolve();
      await Promise.resolve();
    });

    expect(submit).toBeDisabled();
    expect(dialog).toContainElement(document.activeElement as HTMLElement);
    const outside = document.createElement("button");
    document.body.appendChild(outside);
    outside.focus();
    expect(dialog).toContainElement(document.activeElement as HTMLElement);

    await act(async () => {
      await vi.advanceTimersByTimeAsync(1200);
    });
    expect(screen.getByRole("heading", { name: "Continue in WhatsApp" })).toHaveFocus();
    outside.remove();
  });

  it("shows a page-form save failure and fallback when the WhatsApp popup is blocked", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("Unavailable", { status: 503 })),
    );
    vi.spyOn(window, "open").mockReturnValue(null);
    render(<ContactPage />);

    fireEvent.change(screen.getByPlaceholderText("Rahul Sharma"), {
      target: { value: "Asha" },
    });
    fireEvent.change(screen.getByPlaceholderText("+91 XXXXX XXXXX"), {
      target: { value: "+91 98765 43210" },
    });
    fireEvent.change(screen.getByPlaceholderText("rahul@email.com"), {
      target: { value: "asha@example.com" },
    });
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: "Send via WhatsApp" }));
    });

    expect(await screen.findByRole("alert", {}, { timeout: 3000 })).toHaveTextContent("We could not save your enquiry online");
    expect(screen.getByRole("link", { name: "Open WhatsApp" })).toHaveAttribute("href", expect.stringContaining("https://wa.me/"));
    expect(toastMock).toHaveBeenCalledWith(
      expect.objectContaining({ title: "Your enquiry was not saved online", variant: "destructive" }),
    );
  });
});
