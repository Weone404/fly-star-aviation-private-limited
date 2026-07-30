import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { resolvePath } from "@/lib/routes";
import { buildGraph } from "@/lib/schema";

const SCRIPT_ID = "page-schema-jsonld";

/**
 * Injects per-page JSON-LD (BreadcrumbList + page-type node) into <head> and
 * updates it on every route change. Runs alongside useMeta in AppInner so all
 * routes — including prerendered ones — carry correct structured data.
 */
export function useSchema() {
  const location = useLocation();

  useEffect(() => {
    const path = resolvePath(location.pathname);
    const graph = buildGraph(path);
    const existing = document.getElementById(SCRIPT_ID);

    if (!graph) {
      existing?.remove();
      return;
    }

    let el = existing as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement("script");
      el.type = "application/ld+json";
      el.id = SCRIPT_ID;
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(graph);
  }, [location.pathname]);
}
