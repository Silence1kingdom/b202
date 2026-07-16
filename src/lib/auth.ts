import { cookies } from "next/headers";
import { ADMIN_COOKIE, sessionToken } from "./session";

export async function isValidSession(value?: string): Promise<boolean> {
  if (!value) return false;
  return value === (await sessionToken());
}

export async function isAuthed(): Promise<boolean> {
  const value = cookies().get(ADMIN_COOKIE)?.value;
  return isValidSession(value);
}
