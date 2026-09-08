/**
 * Analytics loader — dormant until configured.
 *
 * Supports GA4 and Plausible, chosen by environment variable. With neither set,
 * nothing loads, no script tag is injected, no request is made, and no cookie is
 * written. That is the state this ships in: the choice between the two is the
 * owner's and has not been made. See docs/ANALYTICS.md.
 *
 *   VITE_ANALYTICS_PROVIDER   "ga4" | "plausible"   (anything else = off)
 *   VITE_ANALYTICS_ID         GA4 measurement ID (G-XXXXXXXXXX), or the
 *                             Plausible domain (flystar.co.in)
 *
 * Loading is deferred and non-blocking so it cannot affect LCP: the tag is
 * injected after the first paint, async, and never in the critical path.
 */

type Provider = "ga4" | "plausible";

interface AnalyticsConfig {
  provider: Provider | null;
  id: string;
}

export function readAnalyticsConfig(
  env: Record<string, string | undefined> = import.meta.env as Record<string, string | undefined>
): AnalyticsConfig {
  const raw = (env.VITE_ANALYTICS_PROVIDER || "").trim().toLowerCase();
  const id = (env.VITE_ANALYTICS_ID || "").trim();
  const provider: Provider | null = raw === "ga4" || raw === "plausible" ? raw : null;

  // Both halves are required. A provider with no ID is a misconfiguration, not a
  // reason to load a broken tag.
  if (!provider || !id) return { provider: null, id: "" };
  return { provider, id };
}

/** Script attributes for a provider, or null when analytics is off. */
export function analyticsScript(config: AnalyticsConfig): {
  src: string;
  attrs: Record<string, string>;
  inline?: string;
} | null {
  if (!config.provider) return null;

  if (config.provider === "plausible") {
    return {
      src: "https://plausible.io/js/script.js",
      attrs: { defer: "", "data-domain": config.id },
    };
  }

  return {
    src: `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(config.id)}`,
    attrs: { async: "" },
    inline:
      `window.dataLayer=window.dataLayer||[];` +
      `function gtag(){dataLayer.push(arguments);}` +
      `gtag('js',new Date());` +
      `gtag('config','${config.id}');`,
  };
}

let loaded = false;

/**
 * Inject the tag, once, after first paint.
 *
 * Prerendering runs this in a headless browser too, so it guards on `document`
 * and on having already run — a prerendered page must not ship a duplicate tag
 * baked into its static HTML.
 */
export function initAnalytics(
  env?: Record<string, string | undefined>
): { loaded: boolean; provider: Provider | null } {
  if (loaded || typeof document === "undefined") return { loaded: false, provider: null };

  const config = readAnalyticsConfig(env);
  const script = analyticsScript(config);
  if (!script) return { loaded: false, provider: null };

  const inject = () => {
    if (loaded) return;
    loaded = true;

    const el = document.createElement("script");
    el.src = script.src;
    for (const [k, v] of Object.entries(script.attrs)) el.setAttribute(k, v);
    document.head.appendChild(el);

    if (script.inline) {
      const inlineEl = document.createElement("script");
      inlineEl.textContent = script.inline;
      document.head.appendChild(inlineEl);
    }
  };

  // requestIdleCallback where available, so the tag never competes with content
  // for the main thread during the LCP window.
  if (typeof window !== "undefined" && "requestIdleCallback" in window) {
    (window as unknown as { requestIdleCallback: (cb: () => void, o?: object) => void })
      .requestIdleCallback(inject, { timeout: 5000 });
  } else {
    setTimeout(inject, 2000);
  }

  return { loaded: true, provider: config.provider };
}

/** Test seam. */
export function __resetAnalyticsForTests() {
  loaded = false;
}
