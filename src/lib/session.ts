// Pure, edge-safe session helpers (no next/headers import so middleware can use them).
export const ADMIN_COOKIE = "b202_admin_session";

export function adminEmail(): string {
  return process.env.ADMIN_EMAIL || "admin@b202.dev";
}

export function adminPassword(): string {
  return process.env.ADMIN_PASSWORD || "b202admin";
}

// HMAC key. In production set ADMIN_SESSION_SECRET to a random secret.
// A deterministic fallback keeps local/dev working but is NOT secure — override it.
function sessionSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || `b202::${adminEmail()}::${adminPassword()}`;
}

export async function sessionToken(): Promise<string> {
  const payload = `b202::${adminEmail()}`;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(sessionSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload)
  );
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
