import { describe, expect, it, beforeEach } from "vitest";
import {
  readAnalyticsConfig,
  analyticsScript,
  initAnalytics,
  __resetAnalyticsForTests,
} from "../lib/analytics";

/**
 * The point of these is the OFF state. The loader ships dormant because the
 * GA4-vs-Plausible choice is the owner's and has not been made, and "dormant"
 * has to mean no script, no request, no cookie — not a tag that happens to fail.
 */
describe("analytics loader", () => {
  beforeEach(() => __resetAnalyticsForTests());

  it("is off when nothing is configured", () => {
    expect(readAnalyticsConfig({}).provider).toBeNull();
    expect(analyticsScript(readAnalyticsConfig({}))).toBeNull();
  });

  it("is off when only half is configured", () => {
    expect(readAnalyticsConfig({ VITE_ANALYTICS_PROVIDER: "ga4" }).provider).toBeNull();
    expect(readAnalyticsConfig({ VITE_ANALYTICS_ID: "G-ABC123" }).provider).toBeNull();
  });

  it("is off for an unknown provider", () => {
    expect(
      readAnalyticsConfig({ VITE_ANALYTICS_PROVIDER: "matomo", VITE_ANALYTICS_ID: "x" }).provider
    ).toBeNull();
  });

  it("injects nothing into the document while off", () => {
    const before = document.head.querySelectorAll("script").length;
    const result = initAnalytics({});
    expect(result.loaded).toBe(false);
    expect(document.head.querySelectorAll("script").length).toBe(before);
  });

  it("builds a GA4 tag with the gtag bootstrap", () => {
    const s = analyticsScript(
      readAnalyticsConfig({ VITE_ANALYTICS_PROVIDER: "ga4", VITE_ANALYTICS_ID: "G-ABC123" })
    );
    expect(s?.src).toContain("googletagmanager.com/gtag/js?id=G-ABC123");
    expect(s?.attrs).toHaveProperty("async");
    expect(s?.inline).toContain("gtag('config','G-ABC123')");
  });

  it("builds a Plausible tag with the domain and no inline bootstrap", () => {
    const s = analyticsScript(
      readAnalyticsConfig({ VITE_ANALYTICS_PROVIDER: "plausible", VITE_ANALYTICS_ID: "flystar.co.in" })
    );
    expect(s?.src).toBe("https://plausible.io/js/script.js");
    expect(s?.attrs["data-domain"]).toBe("flystar.co.in");
    expect(s?.inline).toBeUndefined();
  });

  it("tolerates whitespace and case in the provider", () => {
    expect(
      readAnalyticsConfig({ VITE_ANALYTICS_PROVIDER: "  GA4 ", VITE_ANALYTICS_ID: " G-X " })
    ).toEqual({ provider: "ga4", id: "G-X" });
  });

  it("escapes the id in the GA4 URL", () => {
    const s = analyticsScript(
      readAnalyticsConfig({ VITE_ANALYTICS_PROVIDER: "ga4", VITE_ANALYTICS_ID: "G-A&B" })
    );
    expect(s?.src).toContain("G-A%26B");
  });
});
