import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // keep whatever imports you already have

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