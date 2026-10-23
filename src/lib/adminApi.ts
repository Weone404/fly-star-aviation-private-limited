const ADMIN_API_BASE = "/backend-api";

export function adminApiFetch(path: string, init: RequestInit = {}) {
    return fetch(`${ADMIN_API_BASE}${path}`, {
        ...init,
        credentials: "include",
    });
}

export async function getAdminSession(): Promise<boolean> {
    const response = await adminApiFetch("/api/admin/session");
    if (response.status === 401) return false;
    if (!response.ok) {
        throw new Error(`Admin session check failed with HTTP ${response.status}.`);
    }
    const result = (await response.json()) as { authenticated?: boolean };
    return result.authenticated === true;
}

export async function logoutAdminSession(): Promise<void> {
    const response = await adminApiFetch("/api/admin/session", { method: "DELETE" });
    if (!response.ok) {
        throw new Error(`Admin logout failed with HTTP ${response.status}.`);
    }
}
