"use client";

import { useState } from "react";
import { login } from "@/lib/auth-actions";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError("");
    const res = await login(formData);
    if (res?.error) setError(res.error);
    setLoading(false);
  }

  return (
    <main className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-ink px-6 py-12">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0 dot-grid opacity-40" />
      <div className="pointer-events-none absolute -top-32 right-0 h-[420px] w-[420px] rounded-full bg-accent/10 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-32 left-0 h-[420px] w-[420px] rounded-full bg-white/[0.05] blur-[130px]" />

      <div className="relative w-full max-w-md">
        {/* Brand */}
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white text-2xl font-black text-ink shadow-xl shadow-accent/20">
            b
          </div>
          <h1 className="mt-5 text-3xl font-extrabold tracking-tightest text-paper">
            B_20 <span className="text-accent">admin</span>
          </h1>
          <p className="mt-2 flex items-center justify-center gap-2 text-sm text-white/50">
            <span className="pulse-dot !h-2 !w-2" />
            لوحة تحكم فريق B_20
          </p>
        </div>

        {/* Card */}
        <form
          action={handleSubmit}
          className="card space-y-5 rounded-3xl p-8 backdrop-blur-sm"
        >
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold tabular-nums text-accent">01</span>
            <span className="section-label">تسجيل الدخول</span>
          </div>

          <div className="field">
            <input name="email" type="email" required placeholder=" " />
            <label>البريد الإلكتروني</label>
          </div>
          <div className="field">
            <input name="password" type="password" required placeholder=" " />
            <label>كلمة السر</label>
          </div>

          {error && (
            <div className="rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-paper">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full py-3.5 text-base disabled:opacity-60"
          >
            {loading ? "جاري الدخول..." : "دخول لوحة التحكم"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-white/35">
          محمي بجلسة موقّعة — صفحة خاصة بفريق B_20 فقط.
        </p>
      </div>
    </main>
  );
}
