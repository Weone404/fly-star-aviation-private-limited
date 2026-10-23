export const PRODUCTION_BACKEND_HOSTNAME = "fly-star-aviation-private-limited.onrender.com";

export function parseBlogApiOrigin(value) {
  if (typeof value !== "string" || !value) return null;

  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    return null;
  }

  if (
    parsed.username ||
    parsed.password ||
    parsed.pathname !== "/" ||
    parsed.search ||
    parsed.hash ||
    parsed.origin !== value ||
    parsed.protocol !== "https:"
  ) {
    return null;
  }

  return parsed.origin;
}

export function isIsolatedPreviewBlogApiOrigin(apiOrigin, previewOrigin, productionOrigin) {
  const api = parseBlogApiOrigin(apiOrigin);
  const preview = previewOrigin === undefined ? api : parseBlogApiOrigin(previewOrigin);
  const production = productionOrigin === undefined ? null : parseBlogApiOrigin(productionOrigin);
  return Boolean(
    api &&
      preview &&
      api === preview &&
      (productionOrigin === undefined || production) &&
      api !== production &&
      new URL(api).hostname.toLowerCase() !== PRODUCTION_BACKEND_HOSTNAME,
  );
}
