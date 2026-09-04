import React from "react";
import ReactDOM from "react-dom/client";
import { initAnalytics } from "./lib/analytics";
import App from "./App";
import "./index.css"; // keep whatever imports you already have
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// ✅ Hide loader once React mounts
const loader = document.getElementById("initial-loader");
if (loader) {
    loader.style.opacity = "0";
    setTimeout(() => loader.remove(), 400);
}

// Dormant unless VITE_ANALYTICS_PROVIDER and VITE_ANALYTICS_ID are both set.
// Injected after first paint so it cannot affect LCP. See docs/ANALYTICS.md.
initAnalytics();
