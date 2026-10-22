import { afterEach, describe, expect, it, vi } from "vitest";

import { saveContactEnquiry } from "@/lib/saveContactEnquiry";

const payload = {
  name: "Asha",
  phone: "+91 98765 43210",
  email: "asha@example.com",
  interest: "CPL - Commercial Pilot License",
  message: "Please share course details",
  company: "",
};

describe("saveContactEnquiry", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns true only when the API confirms the enquiry was saved", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ success: true }), { status: 200 }),
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(saveContactEnquiry(payload)).resolves.toBe(true);
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/contact",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify(payload),
      }),
    );
  });

  it("returns false for HTTP and application-level failures", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response("Unavailable", { status: 503 }))
      .mockResolvedValueOnce(
        new Response(JSON.stringify({ success: false }), { status: 200 }),
      );
    vi.stubGlobal("fetch", fetchMock);

    await expect(saveContactEnquiry(payload)).resolves.toBe(false);
    await expect(saveContactEnquiry(payload)).resolves.toBe(false);
  });

  it("returns false when the request cannot reach the API", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));

    await expect(saveContactEnquiry(payload)).resolves.toBe(false);
  });
});
