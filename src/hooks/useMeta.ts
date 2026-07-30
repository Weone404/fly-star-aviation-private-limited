import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { PAGE_META } from "@/lib/pageMeta";
import { SITE_ORIGIN, resolvePath, canonicalUrl } from "@/lib/routes";

const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/images/hero-aircraft-1280.webp`;

function upsertMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

export function useMeta() {
  const location = useLocation();

  useEffect(() => {
    const path = resolvePath(location.pathname);
    const canonical = canonicalUrl(path);

    // Canonical + og:url + social image are safe to set on every route.
    upsertCanonical(canonical);
    upsertMeta('meta[property="og:url"]', "property", "og:url", canonical);
    upsertMeta('meta[property="og:image"]', "property", "og:image", DEFAULT_OG_IMAGE);
    upsertMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    upsertMeta('meta[name="twitter:image"]', "name", "twitter:image", DEFAULT_OG_IMAGE);

    // Title/description only for known paths, so pages that manage their own
    // <title> via Helmet (and unmapped routes) are never clobbered with a
    // generic default.
    const meta = PAGE_META[path];
    if (meta) {
      document.title = meta.title;
      upsertMeta('meta[name="description"]', "name", "description", meta.description);
      upsertMeta('meta[property="og:title"]', "property", "og:title", meta.title);
      upsertMeta('meta[property="og:description"]', "property", "og:description", meta.description);
      upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", meta.title);
      upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", meta.description);
    }
  }, [location.pathname]);
}
