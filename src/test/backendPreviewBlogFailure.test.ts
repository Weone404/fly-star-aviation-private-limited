import app from "../../backend/server.js";

describe("backend blog storage environment behavior", () => {
  let server: ReturnType<typeof app.listen>;
  let baseUrl: string;
  let previousDeploymentEnv: string | undefined;

  beforeAll(async () => {
    server = app.listen(0, "127.0.0.1");
    await new Promise<void>((resolve, reject) => {
      server.once("listening", resolve);
      server.once("error", reject);
    });
    const address = server.address();
    if (!address || typeof address === "string") throw new Error("Test server did not bind a TCP port.");
    baseUrl = `http://127.0.0.1:${address.port}`;
  });

  afterAll(async () => {
    await new Promise<void>((resolve, reject) => {
      server.close((error) => error ? reject(error) : resolve());
    });
  });

  beforeEach(() => {
    previousDeploymentEnv = process.env.FLYSTAR_DEPLOYMENT_ENV;
  });

  afterEach(() => {
    if (previousDeploymentEnv === undefined) {
      delete process.env.FLYSTAR_DEPLOYMENT_ENV;
    } else {
      process.env.FLYSTAR_DEPLOYMENT_ENV = previousDeploymentEnv;
    }
  });

  it("fails closed for Preview blog list and detail when MongoDB is unavailable", async () => {
    process.env.FLYSTAR_DEPLOYMENT_ENV = "preview";

    const list = await fetch(`${baseUrl}/api/blogs`);
    const detail = await fetch(`${baseUrl}/api/blogs/sample-preview-post`);

    expect(list.status).toBe(503);
    expect(await list.json()).toMatchObject({ success: false });
    expect(detail.status).toBe(503);
    expect(await detail.json()).toMatchObject({ success: false });
  });

  it("preserves file-based blog reads outside Preview when MongoDB is unavailable", async () => {
    delete process.env.FLYSTAR_DEPLOYMENT_ENV;

    const list = await fetch(`${baseUrl}/api/blogs`);
    expect(list.status).toBe(200);
    const blogs = await list.json();
    expect(Array.isArray(blogs)).toBe(true);

    const slug = blogs[0]?.slug;
    if (slug) {
      const detail = await fetch(`${baseUrl}/api/blogs/${encodeURIComponent(slug)}`);
      expect(detail.status).toBe(200);
    }
  });
});
