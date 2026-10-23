import { afterEach, describe, expect, it, vi } from "vitest";
import { adminApiFetch, getAdminSession, logoutAdminSession } from "../lib/adminApi";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("admin API client", () => {
  it("uses the same-origin backend proxy and includes cookies", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 204 }));
    vi.stubGlobal("fetch", fetchMock);

    await adminApiFetch("/api/admin/session", { method: "DELETE" });

    expect(fetchMock).toHaveBeenCalledWith("/backend-api/api/admin/session", {
      method: "DELETE",
      credentials: "include",
    });
  });

  it("treats rejected sessions as unauthenticated", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 401 })));
    await expect(getAdminSession()).resolves.toBe(false);
  });

  it("surfaces server errors instead of treating them as successful logout", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 503 })));
    await expect(logoutAdminSession()).rejects.toThrow("HTTP 503");
  });
});
