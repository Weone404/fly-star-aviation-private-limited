import https from "node:https";

const PRODUCTION_BACKEND_HOSTNAME = "fly-star-aviation-private-limited.onrender.com";
const HOP_BY_HOP_HEADERS = new Set([
    "connection",
    "keep-alive",
    "proxy-authenticate",
    "proxy-authorization",
    "te",
    "trailer",
    "transfer-encoding",
    "upgrade",
]);

export const config = { api: { bodyParser: false } };

function isHopByHopHeader(name, headers) {
    const connectionHeaders = String(headers.connection || "")
        .split(",")
        .map((header) => header.trim().toLowerCase());
    return HOP_BY_HOP_HEADERS.has(name.toLowerCase()) || connectionHeaders.includes(name.toLowerCase());
}

function getPathSegments(path) {
    if (Array.isArray(path)) return path;
    if (typeof path === "string") return path.split("/");
    return [];
}

function getBackendOrigin() {
    const isProduction = process.env.VERCEL_ENV === "production";
    const isPreview = process.env.VERCEL_ENV === "preview";
    const configuredOrigin = isProduction
        ? process.env.BACKEND_API_ORIGIN
        : isPreview
            ? process.env.PREVIEW_BACKEND_API_ORIGIN
            : null;
    if (!configuredOrigin) return null;

    let origin;
    try {
        origin = new URL(configuredOrigin);
    } catch {
        return null;
    }
    if (isPreview) {
        let productionOrigin;
        try {
            productionOrigin = new URL(process.env.PRODUCTION_BACKEND_API_ORIGIN || "");
        } catch {
            return null;
        }
        if (
            productionOrigin.protocol !== "https:" ||
            productionOrigin.origin !== process.env.PRODUCTION_BACKEND_API_ORIGIN ||
            productionOrigin.username ||
            productionOrigin.password ||
            productionOrigin.pathname !== "/" ||
            productionOrigin.search ||
            productionOrigin.hash ||
            origin.origin === productionOrigin.origin
        ) {
            return null;
        }
    }
    if (
        origin.protocol !== "https:" ||
        origin.username ||
        origin.password ||
        origin.pathname !== "/" ||
        origin.search ||
        origin.hash ||
        (!isProduction && origin.hostname.toLowerCase() === PRODUCTION_BACKEND_HOSTNAME)
    ) {
        return null;
    }
    return origin.origin;
}

export function createBackendProxyHandler(request = (...args) => https.request(...args)) {
    return function handler(req, res) {
        const backendOrigin = getBackendOrigin();
        if (!backendOrigin) return res.status(503).json({ error: "Backend API is not configured for this deployment." });

        const pathSegments = getPathSegments(req.query?.path);
        if (
            pathSegments.length === 0 ||
            pathSegments.some((segment) => typeof segment !== "string" || !segment || segment === "." || segment === "..")
        ) {
            return res.status(404).json({ error: "Backend API route not found." });
        }

        const backendPath = pathSegments.map((segment) => encodeURIComponent(segment)).join("/");
        if (!backendPath.startsWith("api/")) {
            return res.status(404).json({ error: "Backend API route not found." });
        }

        const originalUrl = new URL(req.url || "/", "https://vercel.invalid");
        const target = new URL(`/${backendPath}${originalUrl.search}`, backendOrigin);
        const requestHeaders = {};
        for (const [name, value] of Object.entries(req.headers)) {
            if (name !== "host" && !isHopByHopHeader(name, req.headers)) {
                requestHeaders[name] = value;
            }
        }

        const proxy = request({
            hostname: target.hostname,
            port: target.port || 443,
            method: req.method,
            path: `${target.pathname}${target.search}`,
            headers: requestHeaders,
        }, (upstream) => {
            res.statusCode = upstream.statusCode || 502;
            for (const [name, value] of Object.entries(upstream.headers)) {
                if (value !== undefined && !isHopByHopHeader(name, upstream.headers)) {
                    res.setHeader(name, value);
                }
            }
            upstream.pipe(res);
        });

        proxy.setTimeout(30000, () => proxy.destroy(new Error("Backend request timed out.")));
        proxy.on("error", (error) => {
            console.error("[backend-proxy] request failed:", error.name);
            if (res.headersSent) {
                res.destroy(error);
                return;
            }
            res.statusCode = 502;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Backend request failed." }));
        });
        req.pipe(proxy);
    };
}

export default createBackendProxyHandler();
