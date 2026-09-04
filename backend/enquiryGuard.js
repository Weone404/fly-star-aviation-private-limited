/**
 * Spam guards for the public enquiry endpoint.
 *
 * POST /api/contact is unauthenticated and stays that way, so the only defence
 * is cheap heuristics that cost a real visitor nothing. Both are dependency-free
 * and pure, so src/test/enquiryGuard.test.ts can exercise them without a server.
 */

/**
 * Honeypot. The form renders a field a human never sees and never fills; a bot
 * that walks the DOM and fills everything will.
 *
 * Named "company" rather than something like "hp_field" on purpose: a bot that
 * skips obviously-fake names still fills a plausible one.
 */
const HONEYPOT_FIELD = "company";

function isHoneypotTripped(body) {
  const value = body?.[HONEYPOT_FIELD];
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Per-IP rate limit, in memory.
 *
 * In memory is a deliberate choice, not a shortcut. A shared store would be more
 * correct across instances, but it means another dependency and another service
 * to keep up for a form that takes a handful of enquiries a day. A single
 * instance restarting and forgetting its counters is an acceptable failure for
 * this; adding Redis to a contact form is not.
 */
function createRateLimiter({ max = 5, windowMs = 10 * 60 * 1000, now = () => Date.now() } = {}) {
  const hits = new Map();

  function sweep(t) {
    for (const [key, times] of hits) {
      const kept = times.filter((ts) => t - ts < windowMs);
      if (kept.length) hits.set(key, kept);
      else hits.delete(key);
    }
  }

  return {
    /** @returns {{allowed: boolean, remaining: number, retryAfterMs: number}} */
    check(key) {
      const t = now();
      if (hits.size > 500) sweep(t);

      const times = (hits.get(key) || []).filter((ts) => t - ts < windowMs);
      if (times.length >= max) {
        const retryAfterMs = windowMs - (t - times[0]);
        return { allowed: false, remaining: 0, retryAfterMs };
      }
      times.push(t);
      hits.set(key, times);
      return { allowed: true, remaining: max - times.length, retryAfterMs: 0 };
    },
    reset() {
      hits.clear();
    },
    get size() {
      return hits.size;
    },
  };
}

/** Client IP behind Render's proxy. Falls back to the socket address. */
function clientIp(req) {
  const forwarded = req?.headers?.["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length) {
    return forwarded.split(",")[0].trim();
  }
  return req?.socket?.remoteAddress || req?.ip || "unknown";
}

module.exports = { HONEYPOT_FIELD, isHoneypotTripped, createRateLimiter, clientIp };
