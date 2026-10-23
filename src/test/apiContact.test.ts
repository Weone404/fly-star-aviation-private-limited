import { describe, expect, it, vi } from "vitest";
import { createContactHandler } from "../../api/contact.js";

function createResponse() {
  const response = {
    statusCode: 200,
    headers: {} as Record<string, string>,
    body: undefined as unknown,
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    setHeader(name: string, value: string) {
      this.headers[name.toLowerCase()] = value;
    },
    json(body: unknown) {
      this.body = body;
      return this;
    },
  };
  return response;
}

const validBody = {
  name: "  Test Student ",
  email: " student@example.com ",
  phone: "+91 99535 36199",
  interest: " CPL ",
  message: " Please call ",
};

describe("Vercel contact handler", () => {
  it("rate-limits repeated submissions and returns a retry interval", async () => {
    let attempts = 0;
    const save = vi.fn();
    const handler = createContactHandler({
      getUri: () => "mongodb://isolated.test",
      connect: vi.fn(),
      consumeAttempt: async () => {
        attempts += 1;
        return { allowed: attempts <= 5, retryAfterSeconds: 600 };
      },
      save,
    });

    for (let index = 0; index < 5; index += 1) {
      const response = createResponse();
      await handler({ method: "POST", headers: { "x-forwarded-for": "203.0.113.10" }, body: validBody }, response);
      expect(response.statusCode).toBe(201);
    }

    const blocked = createResponse();
    await handler({ method: "POST", headers: { "x-forwarded-for": "203.0.113.10" }, body: validBody }, blocked);
    expect(blocked.statusCode).toBe(429);
    expect(blocked.headers["retry-after"]).toBe("600");
    expect(save).toHaveBeenCalledTimes(5);
  });

  it("saves a validated submission using trimmed fields", async () => {
    const save = vi.fn();
    const handler = createContactHandler({
      getUri: () => "mongodb://isolated.test",
      connect: vi.fn(),
      consumeAttempt: vi.fn().mockResolvedValue({ allowed: true, retryAfterSeconds: 600 }),
      save,
    });
    const response = createResponse();

    await handler({ method: "POST", headers: { "x-forwarded-for": "203.0.113.11" }, body: validBody }, response);

    expect(response.statusCode).toBe(201);
    expect(save).toHaveBeenCalledWith({
      name: "Test Student",
      email: "student@example.com",
      phone: "+91 99535 36199",
      interest: "CPL",
      message: "Please call",
    });
  });

  it("acknowledges a filled honeypot without saving it", async () => {
    const save = vi.fn();
    const consumeAttempt = vi.fn().mockResolvedValue({ allowed: true, retryAfterSeconds: 600 });
    const handler = createContactHandler({
      getUri: () => "mongodb://isolated.test",
      connect: vi.fn(),
      consumeAttempt,
      save,
    });
    const response = createResponse();

    await handler({
      method: "POST",
      headers: { "x-forwarded-for": "203.0.113.12" },
      body: { ...validBody, company: "Automated spam" },
    }, response);

    expect(response.statusCode).toBe(201);
    expect(consumeAttempt).toHaveBeenCalledOnce();
    expect(save).not.toHaveBeenCalled();
  });

  it.each([
    ["invalid email", { ...validBody, email: "not-an-email" }],
    ["oversized message", { ...validBody, message: "x".repeat(2001) }],
  ])("counts and rejects %s without saving it", async (_caseName, body) => {
    const connect = vi.fn();
    const consumeAttempt = vi.fn().mockResolvedValue({ allowed: true, retryAfterSeconds: 600 });
    const save = vi.fn();
    const handler = createContactHandler({
      getUri: () => "mongodb://isolated.test",
      connect,
      consumeAttempt,
      save,
    });
    const response = createResponse();

    await handler({
      method: "POST",
      headers: { "x-forwarded-for": "203.0.113.13" },
      body,
    }, response);

    expect(response.statusCode).toBe(400);
    expect(connect).toHaveBeenCalledOnce();
    expect(consumeAttempt).toHaveBeenCalledOnce();
    expect(save).not.toHaveBeenCalled();
  });

  it("fails closed when shared rate-limit storage is unavailable", async () => {
    const save = vi.fn();
    const handler = createContactHandler({
      getUri: () => "mongodb://isolated.test",
      connect: vi.fn(),
      consumeAttempt: vi.fn().mockRejectedValue(new Error("database unavailable")),
      save,
    });
    const response = createResponse();

    await handler({ method: "POST", headers: { "x-forwarded-for": "203.0.113.14" }, body: validBody }, response);

    expect(response.statusCode).toBe(503);
    expect(response.body).toEqual({ error: "Request protection is temporarily unavailable." });
    expect(save).not.toHaveBeenCalled();
  });

  it("fails closed when the trusted proxy client address is unavailable", async () => {
    const connect = vi.fn();
    const handler = createContactHandler({
      getUri: () => "mongodb://isolated.test",
      connect,
      consumeAttempt: vi.fn(),
      save: vi.fn(),
    });
    const response = createResponse();

    await handler({ method: "POST", headers: {}, body: validBody }, response);

    expect(response.statusCode).toBe(503);
    expect(connect).not.toHaveBeenCalled();
  });
});
