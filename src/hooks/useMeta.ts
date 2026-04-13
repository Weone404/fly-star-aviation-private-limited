import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BACKEND_URL = "https://fly-star-aviation-private-limited.onrender.com";

export function useMeta() {
  const location = useLocation();

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/meta?path=${location.pathname}`)
      .then((res) => res.json())
      .then((meta) => {
        document.title = meta.title;

        let desc = document.querySelector('meta[name="description"]');
        if (!desc) {
          desc = document.createElement("meta");
          desc.setAttribute("name", "description");
          document.head.appendChild(desc);
        }
        desc.setAttribute("content", meta.description);
      })
      .catch(() => {});
  }, [location.pathname]);
}