/**
 * Shared route helpers used by useMeta (canonical + metadata) and useSchema
 * (structured data). Single source of truth for the canonical origin and the
 * keyword-alias → primary-path map so the two hooks never drift.
 */
export const SITE_ORIGIN = "https://www.flystar.co.in";

// Keyword-alias routes (see App.tsx) render the same component as a primary
// page. Map each alias to its canonical path so duplicate content consolidates.
export const ALIAS_CANONICAL: Record<string, string> = {
  "/contact-us": "/contact",
  "/air-transport-pilots-license-atpl": "/courses/atpl",
  "/best-atpl-classes-in-india": "/courses/atpl",
  "/commercial-pilot-training": "/courses/cpl",
  "/best-cpl-ground-classes": "/courses/cpl",
  "/commercial-pilot-training-in-dwarka": "/courses/cpl",
  "/courses-and-careers": "/courses/cpl",
  "/commercial-pilot-training-cpl": "/courses/cpl",
  "/pilot-course": "/courses/airline-preparation",
  "/top-aviation-courses-and-careers-after-12th": "/courses/airline-preparation",
  "/careers": "/courses/airline-preparation",
  "/dgca-ground-classes-training-classes": "/dgca/ground-classes",
  "/cpl-atpl-ground-classes-2": "/dgca/ground-classes",
  "/training-in-australia": "/pilot-training/australia",
  "/training-in-south-africa": "/pilot-training/south-africa",
  "/training-in-india": "/pilot-training",
  "/how-to-become-a-pilot": "/become-a-pilot/become-pilot",
  "/how-to-become-a-pilot-in-india": "/become-a-pilot/become-pilot",
  "/how-to-become-a-pilot-in-india-after-12th": "/become-a-pilot/become-pilot",
  "/guide-on-how-to-become-a-pilot": "/become-a-pilot/become-pilot",
};

/** Resolve a raw pathname to its canonical path (trailing slash + alias normalized). */
export function resolvePath(pathname: string): string {
  const stripped = pathname.replace(/\/+$/, "") || "/";
  return ALIAS_CANONICAL[stripped] || stripped;
}

/** Absolute canonical URL for a resolved path. */
export function canonicalUrl(path: string): string {
  return path === "/" ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`;
}
