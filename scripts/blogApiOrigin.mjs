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
  const preview = parseBlogApiOrigin(previewOrigin);
  const production = parseBlogApiOrigin(productionOrigin);
  return Boolean(
    api &&
      preview &&
      production &&
      api === preview &&
      api !== production &&
      new URL(api).hostname.toLowerCase() !== "fly-star-aviation-private-limited.onrender.com",
  );
}
