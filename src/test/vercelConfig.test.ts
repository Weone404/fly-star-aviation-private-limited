import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("Vercel config", () => {
  it("keeps valid SPA routes mapped to index.html while leaving unmatched URLs as real 404s", () => {
    const configPath = resolve(__dirname, "../../vercel.json");
    const config = JSON.parse(readFileSync(configPath, "utf8"));
    const routes = Array.isArray(config.routes) ? config.routes : [];

    const knownSpaRoute = routes.find(
      (route) => route && typeof route === "object" && route.src === "/((?:about|contact|contact-us|services(?:/.*)?|courses(?:/.*)?|dgca(?:/.*)?|pilot-training(?:/.*)?|become-a-pilot(?:/.*)?|locations(?:/.*)?|blogs(?:/.*)?|admin(?:/.*)?|rtr|sitemap|how-to-become-a-pilot(?:/.*)?|how-to-become-a-pilot-in-india(?:-after-12th)?(?:/.*)?|training-in-(?:india|australia|south-africa)(?:/.*)?|air-transport-pilots-license-atpl|best-atpl-classes-in-india|commercial-pilot-training(?:-.*)?|best-cpl-ground-classes|careers|pilot-course|top-aviation-courses-and-careers-after-12th|courses-and-careers|cpl-atpl-ground-classes-2|dgca-ground-classes-training-classes|guide-on-how-to-become-a-pilot))"
    );

    const unmatchedFallback = routes.find(
      (route) => route && typeof route === "object" && route.src === "/(.*)" && route.status === 404
    );

    expect(knownSpaRoute).toBeTruthy();
    expect(unmatchedFallback).toBeTruthy();
  });
});
