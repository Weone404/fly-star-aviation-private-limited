import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getRouteMeta } from "@/lib/routeMeta";
import { GLOBAL_KEYWORDS } from "@/lib/seoKeywords";

export function useMeta() {
  const location = useLocation();

  useEffect(() => {
    const { title, description, canonical, ogTitle, ogDescription, ogImage, twitterImage } = getRouteMeta(location.pathname);

    document.title = title;

    const setMeta = (selector: string, attrName: string, attrValue: string) => {
      let element = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
      if (!element) {
        if (selector.startsWith("link")) {
          element = document.createElement("link");
          element.setAttribute("rel", "canonical");
          document.head.appendChild(element);
        } else {
          element = document.createElement("meta");
          const attr = selector.match(/\[(name|property)="([^"]+)"\]/);
          if (attr && attr[1] && attr[2]) {
            element.setAttribute(attr[1], attr[2]);
          }
          document.head.appendChild(element);
        }
      }
      element.setAttribute(attrName, attrValue);
    };

    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", ogTitle || title);
    setMeta('meta[property="og:description"]', "content", ogDescription || description);
    setMeta('meta[property="og:url"]', "content", canonical);
    setMeta('meta[property="og:type"]', "content", "website");
    setMeta('meta[property="og:image"]', "content", ogImage || "/assets/hero-aircraft-1600w.jpg");
    setMeta('meta[name="twitter:card"]', "content", "summary_large_image");
    setMeta('meta[name="twitter:image"]', "content", twitterImage || ogImage || "/assets/hero-aircraft-1600w.jpg");

    const canonicalLink = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonicalLink) {
      canonicalLink.setAttribute("href", canonical);
    } else {
      const link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      link.setAttribute("href", canonical);
      document.head.appendChild(link);
    }

    const keywords = document.querySelector('meta[name="keywords"]');
    if (keywords) {
      keywords.setAttribute("content", GLOBAL_KEYWORDS.join(", "));
    } else {
      const keyword = document.createElement("meta");
      keyword.setAttribute("name", "keywords");
      keyword.setAttribute("content", GLOBAL_KEYWORDS.join(", "));
      document.head.appendChild(keyword);
    }
  }, [location.pathname]);
}
