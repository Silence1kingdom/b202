"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, adminEmail, adminPassword, sessionToken } from "./session";

export async function login(
  formData: FormData
): Promise<{ error?: string }> {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!email || !password) return { error: "ادخل الإيميل وكلمة السر." };

  if (email !== adminEmail() || password !== adminPassword()) {
    return { error: "الإيميل أو كلمة السر غلط." };
  }

  const token = await sessionToken();
  cookies().set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/admin");
}

export async function logout(): Promise<void> {
  cookies().delete(ADMIN_COOKIE);
  redirect("/admin/login");
}
