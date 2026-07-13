"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "./supabase/server";

function adminEmail(): string {
  return (
    process.env.ADMIN_EMAIL || process.env.NEXT_PUBLIC_ADMIN_EMAIL || ""
  );
}

export async function login(formData: FormData): Promise<{ error?: string }> {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  if (!email || !password) return { error: "ادخل الإيميل وكلمة السر." };

  const supabase = createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: error.message };

  redirect("/admin");
}

export async function signup(formData: FormData): Promise<{ error?: string; ok?: boolean; message?: string }> {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (email !== adminEmail()) {
    return { error: "التسجيل متاح للأدمن فقط." };
  }

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return { error: error.message };
  if (data.session) redirect("/admin");
  return { ok: true, message: "تم إنشاء الحساب. فعّل الإيميل من الرسالة اللي وصلتك وبعدين سجّل دخول." };
}

export async function logout(): Promise<void> {
  const supabase = createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
