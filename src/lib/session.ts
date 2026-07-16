// Pure, edge-safe session helpers (no next/headers import so middleware can use them).
export const ADMIN_COOKIE = "b202_admin_session";

export function adminEmail(): string {
  return process.env.ADMIN_EMAIL || "admin@b202.dev";
}

export function adminPassword(): string {
  return process.env.ADMIN_PASSWORD || "b202admin";
}

export async function sessionToken(): Promise<string> {
  const payload = `b202::${adminEmail()}::${adminPassword()}`;
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(payload)
  );
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
