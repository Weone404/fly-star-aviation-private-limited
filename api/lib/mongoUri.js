export function getMongoUri(env = process.env) {
    if (env.VERCEL_ENV === "preview") return env.PREVIEW_MONGODB_URI || null;
    if (env.VERCEL_ENV === "production") return env.MONGODB_URI || null;
    return null;
}
