process.env.NODE_ENV = "test";

const assert = require("node:assert/strict");
const { after, before, test } = require("node:test");
const express = require("express");
const app = require("../server");
const dormantBlogRouter = require("../routes/blogs");

let server;
let baseUrl;
let originalDeploymentEnv;

before(async () => {
    originalDeploymentEnv = process.env.FLYSTAR_DEPLOYMENT_ENV;
    server = app.listen(0, "127.0.0.1");
    await new Promise((resolve, reject) => {
        server.once("listening", resolve);
        server.once("error", reject);
    });
    const address = server.address();
    assert.ok(address && typeof address !== "string");
    baseUrl = `http://127.0.0.1:${address.port}`;
});

after(async () => {
    if (originalDeploymentEnv === undefined) {
        delete process.env.FLYSTAR_DEPLOYMENT_ENV;
    } else {
        process.env.FLYSTAR_DEPLOYMENT_ENV = originalDeploymentEnv;
    }
    await new Promise((resolve, reject) => {
        server.close((error) => error ? reject(error) : resolve());
    });
});

test("Preview blog reads fail closed when MongoDB is unavailable", async () => {
    process.env.FLYSTAR_DEPLOYMENT_ENV = "preview";

    const list = await fetch(`${baseUrl}/api/blogs`);
    const detail = await fetch(`${baseUrl}/api/blogs/sample-preview-post`);

    assert.equal(list.status, 503);
    assert.equal(detail.status, 503);
});

test("blog deletion remains disabled", async () => {
    const isolatedApp = express();
    isolatedApp.use("/api/blogs", dormantBlogRouter);
    const isolatedServer = isolatedApp.listen(0, "127.0.0.1");

    try {
        await new Promise((resolve, reject) => {
            isolatedServer.once("listening", resolve);
            isolatedServer.once("error", reject);
        });
        const address = isolatedServer.address();
        assert.ok(address && typeof address !== "string");
        const response = await fetch(`http://127.0.0.1:${address.port}/api/blogs/sample-post`, {
            method: "DELETE",
        });

        assert.equal(response.status, 405);
        assert.deepEqual(await response.json(), {
            success: false,
            message: "Deleting posts through the API is disabled. Delete directly in the database.",
        });
    } finally {
        await new Promise((resolve, reject) => {
            isolatedServer.close((error) => error ? reject(error) : resolve());
        });
    }
});

test("local development preserves file-based blog reads when MongoDB is unavailable", async () => {
    delete process.env.FLYSTAR_DEPLOYMENT_ENV;

    const response = await fetch(`${baseUrl}/api/blogs`);
    assert.equal(response.status, 200);
    assert.ok(Array.isArray(await response.json()));
});
