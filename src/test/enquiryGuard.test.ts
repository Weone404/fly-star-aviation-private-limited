import { describe, expect, it, vi } from "vitest";
// @ts-expect-error - plain CommonJS backend module, no types
import { isHoneypotTripped, createRateLimiter, clientIp, HONEYPOT_FIELD } from "../../backend/enquiryGuard.js";
// @ts-expect-error - plain CommonJS backend module, no types
import { buildEnquiryEmail, notificationConfig, notifyEnquiry } from "../../backend/notifyEnquiry.js";

/**
 * POST /api/contact is public and stays public. These guards are the only thing
 * between the form and the database, so they are worth testing properly.
 */
describe("enquiry honeypot", () => {
  it("passes a normal submission", () => {
    expect(isHoneypotTripped({ name: "A", email: "a@b.c", phone: "1" })).toBe(false);
  });

  it("passes when the field is present but empty, which is what a real form sends", () => {
    expect(isHoneypotTripped({ [HONEYPOT_FIELD]: "" })).toBe(false);
    expect(isHoneypotTripped({ [HONEYPOT_FIELD]: "   " })).toBe(false);
  });

  it("trips when a bot fills it", () => {
    expect(isHoneypotTripped({ [HONEYPOT_FIELD]: "Acme Ltd" })).toBe(true);
  });

  it("survives a missing or malformed body", () => {
    expect(isHoneypotTripped(undefined)).toBe(false);
    expect(isHoneypotTripped({})).toBe(false);
    expect(isHoneypotTripped({ [HONEYPOT_FIELD]: 42 })).toBe(false);
  });
});

describe("enquiry rate limiter", () => {
  it("allows up to the limit then refuses", () => {
    const rl = createRateLimiter({ max: 3, windowMs: 1000 });
    expect(rl.check("1.1.1.1").allowed).toBe(true);
    expect(rl.check("1.1.1.1").allowed).toBe(true);
    expect(rl.check("1.1.1.1").allowed).toBe(true);
    const blocked = rl.check("1.1.1.1");
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterMs).toBeGreaterThan(0);
  });

  it("counts each IP separately", () => {
    const rl = createRateLimiter({ max: 1, windowMs: 1000 });
    expect(rl.check("1.1.1.1").allowed).toBe(true);
    expect(rl.check("2.2.2.2").allowed).toBe(true);
    expect(rl.check("1.1.1.1").allowed).toBe(false);
  });

  it("forgives once the window has passed", () => {
    let t = 0;
    const rl = createRateLimiter({ max: 1, windowMs: 1000, now: () => t });
    expect(rl.check("1.1.1.1").allowed).toBe(true);
    expect(rl.check("1.1.1.1").allowed).toBe(false);
    t = 1500;
    expect(rl.check("1.1.1.1").allowed).toBe(true);
  });

  it("reads the client IP from x-forwarded-for behind a proxy", () => {
    expect(clientIp({ headers: { "x-forwarded-for": "203.0.113.9, 10.0.0.1" } })).toBe("203.0.113.9");
    expect(clientIp({ headers: {}, socket: { remoteAddress: "10.1.1.1" } })).toBe("10.1.1.1");
    expect(clientIp({})).toBe("unknown");
  });
});

describe("enquiry notification", () => {
  it("is disabled unless both the key and a recipient are set", () => {
    expect(notificationConfig({}).enabled).toBe(false);
    expect(notificationConfig({ RESEND_API_KEY: "k" }).enabled).toBe(false);
    expect(notificationConfig({ ENQUIRY_NOTIFY_TO: "a@b.c" }).enabled).toBe(false);
    expect(notificationConfig({ RESEND_API_KEY: "k", ENQUIRY_NOTIFY_TO: "a@b.c" }).enabled).toBe(true);
  });

  it("accepts a comma-separated recipient list", () => {
    expect(notificationConfig({ RESEND_API_KEY: "k", ENQUIRY_NOTIFY_TO: "a@b.c, d@e.f" }).to).toEqual([
      "a@b.c",
      "d@e.f",
    ]);
  });

  it("no-ops when unconfigured, without touching the network", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    const result = await notifyEnquiry({ name: "A" }, {});
    expect(result.sent).toBe(false);
    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });

  it("never throws when the provider fails — the enquiry is already saved", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("network down"));
    const result = await notifyEnquiry(
      { name: "A", email: "a@b.c" },
      { RESEND_API_KEY: "k", ENQUIRY_NOTIFY_TO: "x@y.z" }
    );
    expect(result.sent).toBe(false);
    expect(result.reason).toContain("network down");
    fetchSpy.mockRestore();
  });

  it("escapes HTML so a submitted script tag cannot run in the inbox", () => {
    const mail = buildEnquiryEmail({ name: '<script>alert(1)</script>', message: 'a & b <b>' });
    expect(mail.html).not.toContain("<script>");
    expect(mail.html).toContain("&lt;script&gt;");
    expect(mail.html).toContain("a &amp; b");
  });

  it("sets reply-to to the enquirer so a reply reaches them", () => {
    expect(buildEnquiryEmail({ name: "A", email: "student@example.com" }).reply_to).toBe(
      "student@example.com"
    );
  });

  it("puts the name and interest in the subject line", () => {
    const mail = buildEnquiryEmail({ name: "Asha", interest: "CPL Ground Classes" });
    expect(mail.subject).toContain("Asha");
    expect(mail.subject).toContain("CPL Ground Classes");
  });
});
