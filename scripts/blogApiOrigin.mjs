export function parseBlogApiOrigin(value, { requireHttps = false } = {}) {
  if (typeof value !== "string" || !value) return null;

  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    return null;
  }

  const localHttpHost = ["localhost", "127.0.0.1", "[::1]"].includes(parsed.hostname.toLowerCase());
  if (
    parsed.username ||
    parsed.password ||
    parsed.pathname !== "/" ||
    parsed.search ||
    parsed.hash ||
    parsed.origin !== value ||
    (parsed.protocol !== "https:" && !(parsed.protocol === "http:" && localHttpHost && !requireHttps)) ||
    (requireHttps && parsed.protocol !== "https:")
  ) {
    return null;
  }

  return parsed.origin;
}
