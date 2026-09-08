/**
 * Enquiry notification email.
 *
 * Built because the read path for enquiries did not exist: GET /api/contacts was
 * removed on 2026-09-04 as a personal-data exposure, and nothing in the frontend
 * had ever called it anyway. Twenty-six enquiries had accumulated in the database
 * with no mechanism telling anyone they had arrived. This is that mechanism.
 *
 * Uses Resend's HTTP API through global fetch rather than an SMTP library, so it
 * adds no dependency to keep patched.
 *
 * ENV (all optional — unset means this is a no-op and blog/contact writes behave
 * exactly as before):
 *   RESEND_API_KEY        Resend API key
 *   ENQUIRY_NOTIFY_TO     recipient, or a comma-separated list
 *   ENQUIRY_NOTIFY_FROM   verified sender (default: onboarding@resend.dev)
 *
 * NEVER throws and never rejects. The enquiry is already saved by the time this
 * runs; a mail outage must not turn a captured lead into an error page.
 */

function escapeHtml(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function buildEnquiryEmail(contact) {
    const rows = [
        ["Name", contact.name],
        ["Phone", contact.phone],
        ["Email", contact.email],
        ["Interested in", contact.interest],
        ["Message", contact.message],
        ["Received", new Date().toISOString()],
    ];

    const text = rows.map(([k, v]) => `${k}: ${v ?? ""}`).join("\n");
    const html =
        `<h2 style="font:600 18px system-ui;margin:0 0 12px">New enquiry — flystar.co.in</h2>` +
        `<table style="font:14px system-ui;border-collapse:collapse">` +
        rows
            .map(
                ([k, v]) =>
                    `<tr><td style="padding:4px 12px 4px 0;font-weight:600;vertical-align:top">${escapeHtml(k)}</td>` +
                    `<td style="padding:4px 0">${escapeHtml(v)}</td></tr>`
            )
            .join("") +
        `</table>`;

    return {
        subject: `New enquiry: ${contact.name || "unknown"} — ${contact.interest || "general"}`,
        text,
        html,
        // The visitor's address, so a reply in the inbox goes to them directly.
        reply_to: contact.email || undefined,
    };
}

function notificationConfig(env = process.env) {
    const apiKey = env.RESEND_API_KEY;
    const to = (env.ENQUIRY_NOTIFY_TO || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    const from = env.ENQUIRY_NOTIFY_FROM || "onboarding@resend.dev";
    return { apiKey, to, from, enabled: Boolean(apiKey && to.length) };
}

/**
 * AbortSignal.timeout is Node 17.3+ and is missing in some test and older
 * runtimes. Falling back keeps the timeout best-effort rather than turning a
 * missing helper into the reason a notification never sends.
 */
function timeoutSignal(ms) {
    try {
        if (typeof AbortSignal !== "undefined" && typeof AbortSignal.timeout === "function") {
            return AbortSignal.timeout(ms);
        }
        if (typeof AbortController === "function") {
            const controller = new AbortController();
            setTimeout(() => controller.abort(), ms).unref?.();
            return controller.signal;
        }
    } catch {
        /* fall through — no signal is better than no email */
    }
    return undefined;
}

async function notifyEnquiry(contact, env = process.env) {
    const { apiKey, to, from, enabled } = notificationConfig(env);
    if (!enabled) return { sent: false, reason: "not configured" };

    try {
        const mail = buildEnquiryEmail(contact);
        const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ from, to, ...mail }),
            signal: timeoutSignal(10000),
        });

        if (!res.ok) {
            const detail = await res.text().catch(() => "");
            console.warn(`[enquiry-mail] Resend returned ${res.status}: ${detail.slice(0, 200)}`);
            return { sent: false, reason: `http ${res.status}` };
        }
        console.log(`[enquiry-mail] notification sent to ${to.length} recipient(s)`);
        return { sent: true };
    } catch (err) {
        // Swallowed on purpose. The enquiry is already in the database.
        console.warn(`[enquiry-mail] send failed: ${err.message}`);
        return { sent: false, reason: err.message };
    }
}

module.exports = { buildEnquiryEmail, notificationConfig, notifyEnquiry, timeoutSignal };
