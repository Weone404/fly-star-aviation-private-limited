const crypto = require("node:crypto");

const ADMIN_SESSION_COOKIE = "flystar_admin_session";
const ADMIN_SESSION_TTL_SECONDS = 8 * 60 * 60;
const ADMIN_LOGIN_ATTEMPT_LIMIT = 5;
const ADMIN_LOGIN_WINDOW_MS = 15 * 60 * 1000;
const DEFAULT_TRUSTED_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:8080",
    "https://www.flystar.co.in",
    "https://flystar.co.in",
    "https://fly-star-aviation-private-limited.vercel.app",
];

function createTrustedOrigins(env = process.env) {
    const hasOverride = typeof env.ADMIN_TRUSTED_ORIGINS === "string";
    const origins = new Set(hasOverride ? [] : DEFAULT_TRUSTED_ORIGINS);
    const configured = hasOverride
        ? env.ADMIN_TRUSTED_ORIGINS.split(",").map((origin) => origin.trim()).filter(Boolean)
        : [];
    for (const value of configured) {
        let parsed;
        try {
            parsed = new URL(value);
        } catch {
            throw new Error("ADMIN_TRUSTED_ORIGINS must contain exact HTTPS origins.");
        }
        if (
            parsed.protocol !== "https:" ||
            parsed.origin !== value ||
            parsed.username ||
            parsed.password ||
            parsed.pathname !== "/" ||
            parsed.search ||
            parsed.hash
        ) {
            throw new Error("ADMIN_TRUSTED_ORIGINS must contain exact HTTPS origins.");
        }
        origins.add(value);
    }
    return origins;
}

const TRUSTED_ORIGINS = createTrustedOrigins();
let configuredSessionStore;

function getAdminConfig(env = process.env) {
    const username = env.ADMIN_USERNAME;
    const password = env.ADMIN_PASSWORD;
    const secret = env.ADMIN_SESSION_SECRET;

    if (
        typeof username !== "string" ||
        !username.trim() ||
        typeof password !== "string" ||
        Buffer.byteLength(password, "utf8") < 16 ||
        typeof secret !== "string" ||
        Buffer.byteLength(secret, "utf8") < 32
    ) {
        return null;
    }

    return { username, password, secret };
}

function constantTimeEqual(left, right) {
    const leftHash = crypto.createHash("sha256").update(String(left)).digest();
    const rightHash = crypto.createHash("sha256").update(String(right)).digest();
    return crypto.timingSafeEqual(leftHash, rightHash);
}

function signSession(payload, secret) {
    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
    const signature = crypto
        .createHmac("sha256", secret)
        .update(encodedPayload)
        .digest("base64url");
    return `${encodedPayload}.${signature}`;
}

function sessionKey(token) {
    return crypto.createHash("sha256").update(token).digest("hex");
}

function createAdminSession(username, secret, now = Date.now()) {
    const issuedAt = Math.floor(now / 1000);
    const payload = {
        sub: username,
        iat: issuedAt,
        exp: issuedAt + ADMIN_SESSION_TTL_SECONDS,
        nonce: crypto.randomBytes(16).toString("base64url"),
    };
    return signSession(payload, secret);
}

function readCookie(req, name = ADMIN_SESSION_COOKIE) {
    const cookieHeader = req.headers?.cookie;
    if (typeof cookieHeader !== "string") return null;

    for (const part of cookieHeader.split(";")) {
        const separator = part.indexOf("=");
        if (separator < 0 || part.slice(0, separator).trim() !== name) continue;
        try {
            return decodeURIComponent(part.slice(separator + 1).trim());
        } catch {
            return null;
        }
    }

    return null;
}

function verifyAdminToken(token, config, now = Date.now()) {
    if (typeof token !== "string") return false;
    const parts = token.split(".");
    if (parts.length !== 2 || !parts[0] || !parts[1]) return false;

    let payload;
    try {
        const expected = crypto
            .createHmac("sha256", config.secret)
            .update(parts[0])
            .digest();
        const provided = Buffer.from(parts[1], "base64url");
        if (provided.length !== expected.length || !crypto.timingSafeEqual(provided, expected)) {
            return false;
        }
        payload = JSON.parse(Buffer.from(parts[0], "base64url").toString("utf8"));
    } catch {
        return false;
    }

    const nowSeconds = Math.floor(now / 1000);
    return (
        payload &&
        typeof payload.sub === "string" &&
        constantTimeEqual(payload.sub, config.username) &&
        Number.isInteger(payload.iat) &&
        Number.isInteger(payload.exp) &&
        payload.iat <= nowSeconds + 60 &&
        payload.exp > nowSeconds &&
        payload.exp - payload.iat <= ADMIN_SESSION_TTL_SECONDS
    );
}

function createMongoAdminSessionStore(getCollection) {
    function collection() {
        const value = getCollection();
        if (!value) throw new Error("Admin session store is unavailable.");
        return value;
    }

    return {
        async create(key, expiresAt) {
            await collection().updateOne(
                { _id: key },
                { $set: { expiresAt: new Date(expiresAt) } },
                { upsert: true },
            );
        },
        async isActive(key, now) {
            return Boolean(await collection().findOne({
                _id: key,
                expiresAt: { $gt: new Date(now) },
            }, { projection: { _id: 1 } }));
        },
        async revoke(key) {
            await collection().deleteOne({ _id: key });
        },
    };
}

function loginAttemptKey(username, remoteAddress) {
    return crypto.createHash("sha256").update(`${username}\0${remoteAddress}`).digest("hex");
}

function createMongoLoginAttemptStore(getCollection) {
    function collection() {
        const value = getCollection();
        if (!value) throw new Error("Admin login attempt store is unavailable.");
        return value;
    }

    return {
        async record(username, remoteAddress, now, windowMs) {
            const key = loginAttemptKey(username, remoteAddress);
            const currentWindowExpired = {
                $or: [
                    { $eq: [{ $ifNull: ["$windowStartedAt", null] }, null] },
                    { $lte: ["$windowStartedAt", new Date(now - windowMs)] },
                ],
            };
            await collection().updateOne(
                { _id: key },
                [{
                    $set: {
                        windowStartedAt: {
                            $cond: [currentWindowExpired, new Date(now), "$windowStartedAt"],
                        },
                        attempts: {
                            $cond: [currentWindowExpired, 1, { $add: [{ $ifNull: ["$attempts", 0] }, 1] }],
                        },
                        expiresAt: new Date(now + windowMs),
                    },
                }],
                { upsert: true },
            );
            const record = await collection().findOne(
                { _id: key },
                { projection: { attempts: 1, windowStartedAt: 1 } },
            );
            if (!record) throw new Error("Admin login attempt record was not persisted.");
            return { attempts: record.attempts, windowStartedAt: record.windowStartedAt.getTime() };
        },
        async clear(username, remoteAddress) {
            const key = loginAttemptKey(username, remoteAddress);
            await collection().deleteOne({ _id: key });
        },
    };
}

function createInMemoryAdminSessionStore() {
    const sessions = new Map();
    return {
        async create(key, expiresAt) {
            sessions.set(key, expiresAt);
        },
        async isActive(key, now) {
            return sessions.get(key) > now;
        },
        async revoke(key) {
            sessions.delete(key);
        },
    };
}

function createInMemoryLoginAttemptStore() {
    const attempts = new Map();
    return {
        async record(username, remoteAddress, now, windowMs) {
            const key = loginAttemptKey(username, remoteAddress);
            const current = attempts.get(key);
            const entry = !current || current.windowStartedAt <= now - windowMs
                ? { attempts: 1, windowStartedAt: now }
                : { attempts: current.attempts + 1, windowStartedAt: current.windowStartedAt };
            attempts.set(key, entry);
            return entry;
        },
        async clear(username, remoteAddress) {
            attempts.delete(loginAttemptKey(username, remoteAddress));
        },
    };
}

function createAdminAuthIndexes(db) {
    return Promise.all([
        db.collection("admin_sessions").createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
        db.collection("admin_login_attempts").createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
    ]);
}

function configureAdminSessionStore(store) {
    configuredSessionStore = store;
}

function getSessionStore(store) {
    const value = store || configuredSessionStore;
    if (!value) throw new Error("Admin session store is unavailable.");
    return value;
}

async function verifyAdminSession(token, config, store, now = Date.now()) {
    if (!verifyAdminToken(token, config, now)) return false;
    return getSessionStore(store).isActive(sessionKey(token), now);
}

function reportSessionStoreFailure(error) {
    console.error(
        "[admin-auth] shared store operation failed:",
        error instanceof Error ? error.name : "UnknownError",
    );
}

function isTrustedOrigin(req) {
    const origin = req.get ? req.get("origin") : req.headers?.origin;
    return typeof origin === "string" && TRUSTED_ORIGINS.has(origin);
}

function requireTrustedOrigin(req, res, next) {
    if (!isTrustedOrigin(req)) {
        return res.status(403).json({ success: false, message: "Untrusted request origin." });
    }
    return next();
}

function createRequireAdminSession({
    env = process.env,
    now = Date.now,
    requireOrigin = true,
    store,
} = {}) {
    return async (req, res, next) => {
        const config = getAdminConfig(env);
        if (!config) {
            return res.status(503).json({
                success: false,
                message: "Admin authentication is not configured.",
            });
        }
        if (requireOrigin && !isTrustedOrigin(req)) {
            return res.status(403).json({ success: false, message: "Untrusted request origin." });
        }
        try {
            if (!await verifyAdminSession(readCookie(req), config, store, now())) {
                return res.status(401).json({ success: false, message: "Admin authentication required." });
            }
        } catch (error) {
            reportSessionStoreFailure(error);
            return res.status(503).json({ success: false, message: "Admin authentication is temporarily unavailable." });
        }

        req.admin = { username: config.username };
        return next();
    };
}

function createAdminLoginHandler({
    env = process.env,
    now = Date.now,
    production = process.env.NODE_ENV === "production",
    store,
    attemptStore,
    maxAttempts = ADMIN_LOGIN_ATTEMPT_LIMIT,
    windowMs = ADMIN_LOGIN_WINDOW_MS,
} = {}) {
    return async (req, res) => {
        const config = getAdminConfig(env);
        if (!config) {
            return res.status(503).json({
                success: false,
                message: "Admin authentication is not configured.",
            });
        }

        const issuedAt = now();
        const remoteAddress = req.socket?.remoteAddress || req.ip || "unknown";
        let attempt;
        try {
            attempt = await attemptStore.record(config.username, remoteAddress, issuedAt, windowMs);
        } catch (error) {
            reportSessionStoreFailure(error);
            return res.status(503).json({ success: false, message: "Admin authentication is temporarily unavailable." });
        }
        if (attempt.attempts > maxAttempts) {
            const retryAfter = Math.max(1, Math.ceil((attempt.windowStartedAt + windowMs - issuedAt) / 1000));
            res.set("Retry-After", String(retryAfter));
            return res.status(429).json({ success: false, message: "Too many login attempts. Try again later." });
        }

        const username = typeof req.body?.username === "string" ? req.body.username : "";
        const password = typeof req.body?.password === "string" ? req.body.password : "";
        if (!constantTimeEqual(username, config.username) || !constantTimeEqual(password, config.password)) {
            return res.status(401).json({ success: false, message: "Invalid username or password." });
        }

        try {
            await attemptStore.clear(config.username, remoteAddress);
        } catch (error) {
            reportSessionStoreFailure(error);
            return res.status(503).json({ success: false, message: "Admin authentication is temporarily unavailable." });
        }

        const token = createAdminSession(config.username, config.secret, issuedAt);
        const expiresAt = (Math.floor(issuedAt / 1000) + ADMIN_SESSION_TTL_SECONDS) * 1000;
        try {
            await getSessionStore(store).create(sessionKey(token), expiresAt);
        } catch (error) {
            reportSessionStoreFailure(error);
            return res.status(503).json({ success: false, message: "Admin authentication is temporarily unavailable." });
        }

        res.cookie(ADMIN_SESSION_COOKIE, token, {
            httpOnly: true,
            secure: production,
            sameSite: "lax",
            path: "/",
            maxAge: ADMIN_SESSION_TTL_SECONDS * 1000,
        });
        return res.status(200).json({ success: true });
    };
}

function createAdminSessionStatusHandler({ env = process.env, now = Date.now, store } = {}) {
    return async (req, res) => {
        const config = getAdminConfig(env);
        if (!config) {
            return res.status(503).json({
                success: false,
                message: "Admin authentication is not configured.",
            });
        }
        try {
            if (!await verifyAdminSession(readCookie(req), config, store, now())) {
                return res.status(401).json({ success: false, message: "Admin authentication required." });
            }
        } catch (error) {
            reportSessionStoreFailure(error);
            return res.status(503).json({ success: false, message: "Admin authentication is temporarily unavailable." });
        }
        return res.status(200).json({ authenticated: true });
    };
}

function createAdminLogoutHandler({ production = process.env.NODE_ENV === "production", store } = {}) {
    return async (req, res) => {
        const token = readCookie(req);
        res.clearCookie(ADMIN_SESSION_COOKIE, {
            httpOnly: true,
            secure: production,
            sameSite: "lax",
            path: "/",
        });
        if (token) {
            try {
                await getSessionStore(store).revoke(sessionKey(token));
            } catch (error) {
                reportSessionStoreFailure(error);
                return res.status(503).json({ success: false, message: "Admin logout could not be confirmed." });
            }
        }
        return res.status(204).end();
    };
}

module.exports = {
    ADMIN_SESSION_COOKIE,
    ADMIN_SESSION_TTL_SECONDS,
    ADMIN_LOGIN_ATTEMPT_LIMIT,
    ADMIN_LOGIN_WINDOW_MS,
    TRUSTED_ORIGINS,
    configureAdminSessionStore,
    createInMemoryAdminSessionStore,
    createAdminLoginHandler,
    createAdminLogoutHandler,
    createMongoAdminSessionStore,
    createMongoLoginAttemptStore,
    createInMemoryLoginAttemptStore,
    createAdminSession,
    createAdminAuthIndexes,
    createTrustedOrigins,
    createAdminSessionStatusHandler,
    createRequireAdminSession,
    getAdminConfig,
    isTrustedOrigin,
    readCookie,
    requireTrustedOrigin,
    verifyAdminSession,
    verifyAdminToken,
};
