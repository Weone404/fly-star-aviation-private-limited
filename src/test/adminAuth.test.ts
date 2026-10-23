import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { Server } from "node:http";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

const require = createRequire(import.meta.url);
const env = {
  ADMIN_USERNAME: "test-admin",
  ADMIN_PASSWORD: "test-only-password",
  ADMIN_SESSION_SECRET: "test-only-session-secret-with-at-least-32-bytes",
};
const trustedOrigin = "http://localhost:8080";

let app: { listen: (port: number, host: string, callback: () => void) => Server };
let server: Server;
let baseUrl: string;
let blogStore: {
  createBlog: (...args: unknown[]) => unknown;
  updateBlog: (...args: unknown[]) => unknown;
  getAllBlogs: (...args: unknown[]) => unknown;
};
let originalEnv: Record<string, string | undefined>;
let createBlogSpy: ReturnType<typeof vi.spyOn>;
let updateBlogSpy: ReturnType<typeof vi.spyOn>;
let getAllBlogsSpy: ReturnType<typeof vi.spyOn>;

async function request(path: string, init: RequestInit = {}) {
  return fetch(`${baseUrl}${path}`, init);
}

async function login() {
  const response = await request("/api/admin/session", {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: trustedOrigin },
    body: JSON.stringify({
      username: env.ADMIN_USERNAME,
      password: env.ADMIN_PASSWORD,
    }),
  });
  const setCookie = response.headers.get("set-cookie");
  if (!setCookie) throw new Error("Login did not issue a session cookie.");
  return { response, cookie: setCookie.split(";")[0] };
}

beforeAll(async () => {
  originalEnv = {
    ADMIN_USERNAME: process.env.ADMIN_USERNAME,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
    ADMIN_SESSION_SECRET: process.env.ADMIN_SESSION_SECRET,
    MONGODB_URI: process.env.MONGODB_URI,
    NODE_ENV: process.env.NODE_ENV,
  };
  Object.assign(process.env, env);
  delete process.env.MONGODB_URI;
  process.env.NODE_ENV = "test";

  blogStore = require("../../backend/blogStore.js");
  createBlogSpy = vi.spyOn(blogStore, "createBlog").mockReturnValue({ _id: "created-test-id" });
  updateBlogSpy = vi.spyOn(blogStore, "updateBlog").mockReturnValue({ _id: "updated-test-id" });
  getAllBlogsSpy = vi.spyOn(blogStore, "getAllBlogs").mockReturnValue([{ _id: "public-test-id", title: "Public post" }]);
  app = require("../../backend/server.js");

  await new Promise<void>((resolveReady) => {
    server = app.listen(0, "127.0.0.1", () => resolveReady());
  });
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("Test server did not bind a TCP port.");
  baseUrl = `http://127.0.0.1:${address.port}`;
});

afterAll(async () => {
  if (server) await new Promise<void>((resolveClosed, reject) => server.close((error) => error ? reject(error) : resolveClosed()));
  createBlogSpy?.mockRestore();
  updateBlogSpy?.mockRestore();
  getAllBlogsSpy?.mockRestore();
  for (const [key, value] of Object.entries(originalEnv || {})) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

describe("admin server authentication", () => {
  it("does not include credential checks in client authentication source", () => {
    const loginSource = readFileSync(resolve(__dirname, "../pages/admin/login/page.tsx"), "utf8");
    const appSource = readFileSync(resolve(__dirname, "../App.tsx"), "utf8");
    const adminSource = readFileSync(resolve(__dirname, "../pages/AdminBlog.tsx"), "utf8");

    for (const source of [loginSource, appSource, adminSource]) {
      expect(source).not.toMatch(/const\s+ADMIN_(?:USERNAME|PASSWORD)\s*=/);
      expect(source).not.toMatch(/sessionStorage|localStorage|document\.cookie/);
    }
  });

  it("sets an HttpOnly, Secure, same-site cookie in production", async () => {
    const auth = require("../../backend/adminAuth.js");
    const store = auth.createInMemoryAdminSessionStore();
    let cookieOptions: Record<string, unknown> | undefined;
    const response = {
      cookie: (_name: string, _value: string, options: Record<string, unknown>) => {
        cookieOptions = options;
        return response;
      },
      status: (status: number) => ({
        json: (body: unknown) => ({ status, body }),
      }),
    };
    const handler = auth.createAdminLoginHandler({
      env,
      production: true,
      store,
      attemptStore: auth.createInMemoryLoginAttemptStore(),
    });

    await handler(
      { body: { username: env.ADMIN_USERNAME, password: env.ADMIN_PASSWORD }, socket: { remoteAddress: "127.0.0.1" } },
      response,
    );

    expect(cookieOptions).toMatchObject({
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    });
  });

  it("fails closed when required backend authentication settings are absent", () => {
    const auth = require("../../backend/adminAuth.js");
    expect(auth.getAdminConfig({})).toBeNull();
    expect(auth.getAdminConfig({
      ADMIN_USERNAME: env.ADMIN_USERNAME,
      ADMIN_PASSWORD: env.ADMIN_PASSWORD,
      ADMIN_SESSION_SECRET: "too-short",
    })).toBeNull();
  });

  it("accepts only exact HTTPS origins from deployment configuration", () => {
    const auth = require("../../backend/adminAuth.js");
    expect(auth.createTrustedOrigins({
      ADMIN_TRUSTED_ORIGINS: "https://preview.flystar.example",
    })).toEqual(new Set(["https://preview.flystar.example"]));
    expect(() => auth.createTrustedOrigins({
      ADMIN_TRUSTED_ORIGINS: "https://preview.flystar.example, *",
    })).toThrow("ADMIN_TRUSTED_ORIGINS must contain exact HTTPS origins.");
  });

  it("does not issue a session when the shared store is unavailable", async () => {
    const auth = require("../../backend/adminAuth.js");
    const errorLog = vi.spyOn(console, "error").mockImplementation(() => undefined);
    let statusCode = 0;
    let cookieIssued = false;
    const response = {
      cookie: () => { cookieIssued = true; },
      status: (status: number) => {
        statusCode = status;
        return { json: () => undefined };
      },
    };

    try {
      await auth.createAdminLoginHandler({
        env,
        store: auth.createMongoAdminSessionStore(() => null),
        attemptStore: auth.createInMemoryLoginAttemptStore(),
      })(
        { body: { username: env.ADMIN_USERNAME, password: env.ADMIN_PASSWORD }, socket: { remoteAddress: "127.0.0.1" } },
        response,
      );
      expect(statusCode).toBe(503);
      expect(cookieIssued).toBe(false);
    } finally {
      errorLog.mockRestore();
    }
  });

  it("rate limits repeated login attempts and recovers after the shared window", async () => {
    const auth = require("../../backend/adminAuth.js");
    const attemptStore = auth.createInMemoryLoginAttemptStore();
    let now = 1_800_000_000_000;

    const submit = async (password: string) => {
      let statusCode = 0;
      let retryAfter: string | undefined;
      let cookieIssued = false;
      const response = {
        set: (_name: string, value: string) => { retryAfter = value; },
        cookie: () => { cookieIssued = true; },
        status: (status: number) => {
          statusCode = status;
          return { json: () => undefined };
        },
      };
      await auth.createAdminLoginHandler({
        env,
        now: () => now,
        store: auth.createInMemoryAdminSessionStore(),
        attemptStore,
      })(
        { body: { username: env.ADMIN_USERNAME, password }, socket: { remoteAddress: "203.0.113.8" } },
        response,
      );
      return { statusCode, retryAfter, cookieIssued };
    };

    for (let attempt = 0; attempt < auth.ADMIN_LOGIN_ATTEMPT_LIMIT; attempt += 1) {
      expect(await submit("incorrect-password")).toMatchObject({ statusCode: 401, cookieIssued: false });
    }
    const blocked = await submit(env.ADMIN_PASSWORD);
    expect(blocked.statusCode).toBe(429);
    expect(Number(blocked.retryAfter)).toBeGreaterThan(0);
    expect(blocked.cookieIssued).toBe(false);

    now += auth.ADMIN_LOGIN_WINDOW_MS;
    expect(await submit("incorrect-password")).toMatchObject({ statusCode: 401, cookieIssued: false });
    expect(await submit(env.ADMIN_PASSWORD)).toMatchObject({ statusCode: 200, cookieIssued: true });
  });

  it("shares Mongo-backed login counters and resets them after the fixed window", async () => {
    const auth = require("../../backend/adminAuth.js");
    type AttemptRecord = { attempts: number; windowStartedAt: Date; expiresAt: Date };
    const records = new Map<string, AttemptRecord>();
    const windowMs = auth.ADMIN_LOGIN_WINDOW_MS;
    const collection = {
      updateOne: vi.fn(async (
        filter: { _id: string },
        update: [{ $set: {
          windowStartedAt: { $cond: [unknown, Date, unknown] };
          attempts: unknown;
          expiresAt: Date;
        } }],
      ) => {
        const set = update[0].$set;
        const requestedStart = set.windowStartedAt.$cond[1];
        const previous = records.get(filter._id);
        const expired = !previous || previous.windowStartedAt.getTime() <= requestedStart.getTime() - windowMs;
        records.set(filter._id, {
          attempts: expired ? 1 : previous.attempts + 1,
          windowStartedAt: expired ? requestedStart : previous.windowStartedAt,
          expiresAt: set.expiresAt,
        });
      }),
      findOne: vi.fn(async (filter: { _id: string }) => records.get(filter._id) || null),
      deleteOne: vi.fn(async (filter: { _id: string }) => { records.delete(filter._id); }),
    };
    const storeA = auth.createMongoLoginAttemptStore(() => collection);
    const storeB = auth.createMongoLoginAttemptStore(() => collection);
    const startedAt = 1_800_000_000_000;

    for (let index = 1; index <= auth.ADMIN_LOGIN_ATTEMPT_LIMIT; index += 1) {
      const store = index % 2 ? storeA : storeB;
      expect(await store.record(env.ADMIN_USERNAME, "203.0.113.12", startedAt, windowMs)).toMatchObject({
        attempts: index,
        windowStartedAt: startedAt,
      });
    }
    expect(await storeB.record(env.ADMIN_USERNAME, "203.0.113.12", startedAt, windowMs)).toMatchObject({
      attempts: auth.ADMIN_LOGIN_ATTEMPT_LIMIT + 1,
    });
    expect([...records.keys()][0]).toMatch(/^[a-f0-9]{64}$/);
    expect([...records.keys()][0]).not.toContain(env.ADMIN_USERNAME);

    const nextWindow = startedAt + windowMs;
    expect(await storeA.record(env.ADMIN_USERNAME, "203.0.113.12", nextWindow, windowMs)).toMatchObject({
      attempts: 1,
      windowStartedAt: nextWindow,
    });
    await storeA.clear(env.ADMIN_USERNAME, "203.0.113.12");
    expect(records.size).toBe(0);
  });

  it("fails login closed when the shared attempt store is unavailable", async () => {
    const auth = require("../../backend/adminAuth.js");
    const errorLog = vi.spyOn(console, "error").mockImplementation(() => undefined);
    let statusCode = 0;
    let cookieIssued = false;
    const response = {
      set: () => undefined,
      cookie: () => { cookieIssued = true; },
      status: (status: number) => {
        statusCode = status;
        return { json: () => undefined };
      },
    };

    try {
      await auth.createAdminLoginHandler({
        env,
        store: auth.createInMemoryAdminSessionStore(),
        attemptStore: auth.createMongoLoginAttemptStore(() => null),
      })(
        { body: { username: env.ADMIN_USERNAME, password: "incorrect-password" }, socket: { remoteAddress: "127.0.0.1" } },
        response,
      );
      expect(statusCode).toBe(503);
      expect(cookieIssued).toBe(false);
    } finally {
      errorLog.mockRestore();
    }
  });

  it("rejects unauthenticated create, update, delete, and admin-read requests", async () => {
    const origin = { Origin: trustedOrigin };
    const create = await request("/api/blogs", { method: "POST", headers: origin });
    const update = await request("/api/blogs/test-id", { method: "PUT", headers: origin });
    const remove = await request("/api/blogs/test-id", { method: "DELETE", headers: origin });
    const privateList = await request("/api/admin/blogs");

    expect(create.status).toBe(401);
    expect(update.status).toBe(401);
    expect(remove.status).toBe(401);
    expect(privateList.status).toBe(401);
    expect(createBlogSpy).not.toHaveBeenCalled();
    expect(updateBlogSpy).not.toHaveBeenCalled();
  });

  it("reports backend dependencies as not ready when MongoDB is unavailable", async () => {
    const response = await request("/healthz");
    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({ status: "not-ready" });
  });

  it("uses only the Render service URL for keep-alive and has no production fallback", () => {
    const backend = require("../../backend/server.js");
    expect(backend.getRenderHealthUrl({})).toBeNull();
    expect(backend.getRenderHealthUrl({
      RENDER_EXTERNAL_URL: "https://preview-backend.onrender.com",
    })).toEqual(new URL("https://preview-backend.onrender.com"));
    expect(backend.getRenderHealthUrl({
      RENDER_EXTERNAL_URL: "http://preview-backend.onrender.com",
    })).toBeNull();
  });

  it("selects only the database URI for the explicitly configured backend environment", () => {
    const backend = require("../../backend/server.js");
    expect(backend.getDatabaseUri({
      NODE_ENV: "production",
      FLYSTAR_DEPLOYMENT_ENV: "preview",
      MONGODB_URI: "mongodb+srv://production.example/db",
    })).toBeNull();
    expect(backend.getDatabaseUri({
      NODE_ENV: "production",
      FLYSTAR_DEPLOYMENT_ENV: "preview",
      MONGODB_URI: "mongodb+srv://production.example/db",
      PREVIEW_MONGODB_URI: "mongodb+srv://preview.example/db",
    })).toBe("mongodb+srv://preview.example/db");
    expect(backend.getDatabaseUri({
      NODE_ENV: "production",
      FLYSTAR_DEPLOYMENT_ENV: "production",
      MONGODB_URI: "mongodb+srv://production.example/db",
      PREVIEW_MONGODB_URI: "mongodb+srv://preview.example/db",
    })).toBe("mongodb+srv://production.example/db");
    expect(backend.getDatabaseUri({
      NODE_ENV: "production",
      MONGODB_URI: "mongodb+srv://production.example/db",
    })).toBeNull();
    expect(backend.getDatabaseUri({
      NODE_ENV: "test",
      MONGODB_URI: "mongodb+srv://production.example/db",
    })).toBeNull();
  });

  it("rejects login attempts from untrusted origins", async () => {
    const response = await request("/api/admin/session", {
      method: "POST",
      headers: { "Content-Type": "application/json", Origin: "https://untrusted.example" },
      body: JSON.stringify({ username: env.ADMIN_USERNAME, password: env.ADMIN_PASSWORD }),
    });
    expect(response.status).toBe(403);
  });

  it("authenticates and permits authorized create and update requests", async () => {
    const { response: loginResponse, cookie } = await login();
    expect(loginResponse.status).toBe(200);
    expect(loginResponse.headers.get("access-control-allow-origin")).toBe(trustedOrigin);
    expect(loginResponse.headers.get("access-control-allow-credentials")).toBe("true");
    expect(loginResponse.headers.get("set-cookie")).toContain("HttpOnly");
    expect(loginResponse.headers.get("set-cookie")).toContain("SameSite=Lax");
    const privateList = await request("/api/admin/blogs", { headers: { Cookie: cookie } });
    expect(privateList.status).toBe(200);

    const boundary = "flystar-admin-test-boundary";
    const formBody = (title: string, content: string) =>
      `--${boundary}\r\nContent-Disposition: form-data; name="title"\r\n\r\n${title}\r\n--${boundary}\r\nContent-Disposition: form-data; name="content"\r\n\r\n${content}\r\n--${boundary}--\r\n`;
    const create = await request("/api/blogs", {
      method: "POST",
      headers: { Origin: trustedOrigin, Cookie: cookie, "Content-Type": `multipart/form-data; boundary=${boundary}` },
      body: formBody("Test", "Test body"),
    });
    const update = await request("/api/blogs/test-id", {
      method: "PUT",
      headers: { Origin: trustedOrigin, Cookie: cookie, "Content-Type": `multipart/form-data; boundary=${boundary}` },
      body: formBody("Updated test", "Updated body"),
    });
    const remove = await request("/api/blogs/test-id", {
      method: "DELETE",
      headers: { Origin: trustedOrigin, Cookie: cookie },
    });

    expect(create.status).toBe(200);
    expect(update.status).toBe(200);
    expect(remove.status).toBe(405);
    expect(createBlogSpy).toHaveBeenCalledOnce();
    expect(updateBlogSpy).toHaveBeenCalledOnce();
  });

  it("rejects authenticated writes from an untrusted origin", async () => {
    const { cookie } = await login();
    createBlogSpy.mockClear();
    const response = await request("/api/blogs", {
      method: "POST",
      headers: { Origin: "https://untrusted.example", Cookie: cookie },
      body: JSON.stringify({ title: "Not allowed", content: "Not allowed" }),
    });
    expect(response.status).toBe(403);
    expect(createBlogSpy).not.toHaveBeenCalled();
  });

  it("clears the server session on logout", async () => {
    const { cookie } = await login();
    const logout = await request("/api/admin/session", {
      method: "DELETE",
      headers: { Origin: trustedOrigin, Cookie: cookie },
    });
    const session = await request("/api/admin/session", { headers: { Cookie: cookie } });

    expect(logout.status).toBe(204);
    expect(logout.headers.get("set-cookie")).toContain("Expires=Thu, 01 Jan 1970");
    expect(session.status).toBe(401);
  });

  it("revokes sessions across handlers using the shared MongoDB store", async () => {
    const auth = require("../../backend/adminAuth.js");
    const documents = new Map<string, { expiresAt: Date }>();
    const collection = {
      updateOne: vi.fn(async (filter: { _id: string }, update: { $set: { expiresAt: Date } }) => {
        documents.set(filter._id, update.$set);
      }),
      findOne: vi.fn(async (filter: { _id: string; expiresAt: { $gt: Date } }) => {
        const session = documents.get(filter._id);
        return session && session.expiresAt > filter.expiresAt.$gt ? { _id: filter._id } : null;
      }),
      deleteOne: vi.fn(async (filter: { _id: string }) => {
        documents.delete(filter._id);
      }),
    };
    const storeA = auth.createMongoAdminSessionStore(() => collection);
    const storeB = auth.createMongoAdminSessionStore(() => collection);
    let token = "";
    const loginResponse = {
      cookie: (_name: string, value: string) => { token = value; },
      status: (status: number) => ({
        json: (body: unknown) => ({ status, body }),
      }),
    };

    await auth.createAdminLoginHandler({
      env,
      store: storeA,
      attemptStore: auth.createInMemoryLoginAttemptStore(),
    })(
      { body: { username: env.ADMIN_USERNAME, password: env.ADMIN_PASSWORD }, socket: { remoteAddress: "127.0.0.1" } },
      loginResponse,
    );

    expect(token).not.toBe("");
    expect([...documents.keys()][0]).toMatch(/^[a-f0-9]{64}$/);
    expect([...documents.keys()][0]).not.toBe(token);

    const checkSession = async () => {
      let authorized = false;
      let status = 0;
      const response = {
        status: (value: number) => {
          status = value;
          return { json: () => undefined };
        },
      };
      await auth.createRequireAdminSession({ env, store: storeB, requireOrigin: false })(
        { headers: { cookie: `${auth.ADMIN_SESSION_COOKIE}=${token}` } },
        response,
        () => { authorized = true; },
      );
      return { authorized, status };
    };

    expect(await checkSession()).toEqual({ authorized: true, status: 0 });
    await auth.createAdminLogoutHandler({ store: storeA })(
      { headers: { cookie: `${auth.ADMIN_SESSION_COOKIE}=${token}` } },
      {
        clearCookie: () => undefined,
        status: () => ({ end: () => undefined, json: () => undefined }),
      },
    );
    expect(await checkSession()).toEqual({ authorized: false, status: 401 });
    expect(documents.size).toBe(0);
  });

  it("creates TTL indexes for shared session and login attempt collections", async () => {
    const auth = require("../../backend/adminAuth.js");
    const createIndex = vi.fn().mockResolvedValue("expiresAt_1");
    const collectionNames: string[] = [];
    const db = {
      collection: vi.fn((name: string) => {
        collectionNames.push(name);
        return { createIndex };
      }),
    };

    await auth.createAdminAuthIndexes(db);

    expect(collectionNames).toEqual([
      "admin_sessions",
      "admin_login_attempts",
    ]);
    expect(createIndex).toHaveBeenCalledTimes(2);
    for (const call of createIndex.mock.calls) {
      expect(call).toEqual([{ expiresAt: 1 }, { expireAfterSeconds: 0 }]);
    }
  });

  it("does not enable auth indexes when MongoDB index creation fails", async () => {
    const auth = require("../../backend/adminAuth.js");
    const db = {
      collection: () => ({ createIndex: vi.fn().mockRejectedValue(new Error("index failure")) }),
    };
    await expect(auth.createAdminAuthIndexes(db)).rejects.toThrow("index failure");
  });

  it("rejects sessions when shared MongoDB validation fails", async () => {
    const auth = require("../../backend/adminAuth.js");
    const errorLog = vi.spyOn(console, "error").mockImplementation(() => undefined);
    const token = auth.createAdminSession(env.ADMIN_USERNAME, env.ADMIN_SESSION_SECRET);
    let statusCode = 0;
    let authorized = false;
    const response = {
      status: (status: number) => {
        statusCode = status;
        return { json: () => undefined };
      },
    };

    try {
      await auth.createRequireAdminSession({
        env,
        requireOrigin: false,
        store: { isActive: async () => { throw new Error("database unavailable"); } },
      })(
        { headers: { cookie: `${auth.ADMIN_SESSION_COOKIE}=${token}` } },
        response,
        () => { authorized = true; },
      );
      expect(statusCode).toBe(503);
      expect(authorized).toBe(false);
    } finally {
      errorLog.mockRestore();
    }
  });

  it("reports logout as unconfirmed when shared revocation fails", async () => {
    const auth = require("../../backend/adminAuth.js");
    const errorLog = vi.spyOn(console, "error").mockImplementation(() => undefined);
    let statusCode = 0;
    let cookieCleared = false;
    const response = {
      clearCookie: () => { cookieCleared = true; },
      status: (status: number) => {
        statusCode = status;
        return { json: () => undefined };
      },
      end: () => undefined,
    };

    try {
      await auth.createAdminLogoutHandler({
        store: { revoke: async () => { throw new Error("database unavailable"); } },
      })(
        { headers: { cookie: `${auth.ADMIN_SESSION_COOKIE}=opaque-test-token` } },
        response,
      );
      expect(statusCode).toBe(503);
      expect(cookieCleared).toBe(true);
    } finally {
      errorLog.mockRestore();
    }
  });

  it("rejects expired session records even before MongoDB TTL cleanup", async () => {
    const auth = require("../../backend/adminAuth.js");
    const expiresAt = new Date(1_800_000_000_000);
    const collection = {
      findOne: vi.fn(async (filter: { expiresAt: { $gt: Date } }) =>
        expiresAt > filter.expiresAt.$gt ? { _id: "session" } : null),
    };
    const store = auth.createMongoAdminSessionStore(() => collection);

    expect(await store.isActive("session", expiresAt.getTime() - 1)).toBe(true);
    expect(await store.isActive("session", expiresAt.getTime())).toBe(false);
    expect(collection.findOne).toHaveBeenCalledTimes(2);
  });

  it("rejects expired and invalid sessions", async () => {
    const auth = require("../../backend/adminAuth.js");
    const config = auth.getAdminConfig(env);
    const expired = auth.createAdminSession(env.ADMIN_USERNAME, env.ADMIN_SESSION_SECRET, Date.now() - 9 * 60 * 60 * 1000);
    const tampered = `${auth.createAdminSession(env.ADMIN_USERNAME, env.ADMIN_SESSION_SECRET)}x`;

    const expiredResponse = await request("/api/admin/blogs", { headers: { Cookie: `${auth.ADMIN_SESSION_COOKIE}=${expired}` } });
    const invalidResponse = await request("/api/admin/blogs", { headers: { Cookie: `${auth.ADMIN_SESSION_COOKIE}=${tampered}` } });

    expect(auth.verifyAdminToken(expired, config)).toBe(false);
    expect(expiredResponse.status).toBe(401);
    expect(invalidResponse.status).toBe(401);
  });

  it("keeps public read-only blog APIs available", async () => {
    getAllBlogsSpy.mockClear();
    const response = await request("/api/blogs");
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual([{ _id: "public-test-id", title: "Public post" }]);
    expect(getAllBlogsSpy).toHaveBeenCalledOnce();
  });
});
