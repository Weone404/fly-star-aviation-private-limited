import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getRouteMeta } from "@/lib/routeMeta";
import { GLOBAL_KEYWORDS } from "@/lib/seoKeywords";
import { httpsImageUrl } from "@/lib/routes";

export function useMeta() {
  const location = useLocation();

  useEffect(() => {
    const { title, description, canonical, ogTitle, ogDescription, ogImage, twitterImage, ogType } = getRouteMeta(location.pathname);

    const titleTags = Array.from(document.head.querySelectorAll("title"));
    const titleTag = titleTags.shift() ?? document.createElement("title");
    titleTags.forEach((duplicate) => duplicate.remove());
    titleTag.textContent = title;
    if (!titleTag.isConnected) document.head.appendChild(titleTag);

    const setMeta = (selector: string, attrName: string, attrValue: string) => {
      const elements = Array.from(document.head.querySelectorAll(selector));
      let element = elements.shift();
      elements.forEach((duplicate) => duplicate.remove());
      if (!element) {
        if (selector.startsWith("link")) {
          element = document.createElement("link");
          element.setAttribute("rel", "canonical");
        } else {
          element = document.createElement("meta");
          const attr = selector.match(/\[(name|property)="([^"]+)"\]/);
          if (attr && attr[1] && attr[2]) {
            element.setAttribute(attr[1], attr[2]);
          }
        }
        document.head.appendChild(element);
      }
      element.setAttribute(attrName, attrValue);
    };

    setMeta('meta[name="description"]', "content", description);
    setMeta('meta[property="og:title"]', "content", ogTitle || title);
    setMeta('meta[property="og:description"]', "content", ogDescription || description);
    setMeta('meta[property="og:url"]', "content", canonical);
    setMeta('meta[property="og:type"]', "content", ogType || "website");
    setMeta('meta[property="og:image"]', "content", httpsImageUrl(ogImage));
    setMeta('meta[name="twitter:card"]', "content", "summary_large_image");
    setMeta('meta[name="twitter:title"]', "content", title);
    setMeta('meta[name="twitter:description"]', "content", description);
    setMeta('meta[name="twitter:image"]', "content", httpsImageUrl(twitterImage || ogImage));
    setMeta('link[rel~="canonical"]', "href", canonical);

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
