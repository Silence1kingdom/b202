"use client";

import { useState } from "react";
import { login, signup } from "@/lib/auth-actions";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");
    setMessage("");
    const res =
      mode === "login"
        ? await login(formData)
        : await signup(formData);
    if (res?.error) setError(res.error);
    if (res?.ok) setMessage(res.message || "تم إنشاء الحساب.");
    setLoading(false);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="text-2xl font-extrabold tracking-tightest text-paper">
            b202 <span className="text-accent">admin</span>
          </div>
          <p className="mt-2 text-sm text-white/50">
            {mode === "login" ? "سجّل دخول لوحة التحكم" : "أنشئ حساب الأدمن"}
          </p>
        </div>

        <form action={handleSubmit} className="card space-y-4 rounded-2xl p-7">
          <div className="field">
            <input name="email" type="email" required placeholder=" " />
            <label>البريد الإلكتروني</label>
          </div>
          <div className="field">
            <input name="password" type="password" required minLength={6} placeholder=" " />
            <label>كلمة السر</label>
          </div>

          {error && (
            <div className="rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-paper">
              {error}
            </div>
          )}
          {message && (
            <div className="rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-paper">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3.5 text-base disabled:opacity-60"
          >
            {loading ? "جاري التنفيذ..." : mode === "login" ? "دخول" : "إنشاء حساب"}
          </button>
        </form>

        <button
          onClick={() => {
            setMode(mode === "login" ? "signup" : "login");
            setError("");
            setMessage("");
          }}
          className="mt-5 w-full text-center text-sm text-white/50 transition-colors hover:text-accent"
        >
          {mode === "login"
            ? "معندكش حساب؟ أنشئ حساب الأدمن"
            : "عندك حساب؟ سجّل دخول"}
        </button>
      </div>
    </main>
  );
}
