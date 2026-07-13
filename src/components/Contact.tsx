"use client";

import { useState } from "react";
import { getSupabase } from "@/lib/supabase";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Icon from "@/components/icons";

const info = [
  { icon: "send", label: "البريد الإلكتروني", value: "hello@b202.dev" },
  { icon: "twitter", label: "تابعنا على X", value: "@b202team" },
  { icon: "check", label: "مدة الرد", value: "خلال 24 ساعة" },
];

const socials = [
  { label: "GitHub", name: "github" },
  { label: "Twitter", name: "twitter" },
  { label: "Instagram", name: "instagram" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", budget: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const { ref, setChildRef } = useScrollReveal({ staggerMs: 100 });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    const supabase = getSupabase();
    if (!supabase) {
      setStatus("error");
      setError("إعدادات Supabase غير موجودة. تأكد من متغيرات البيئة.");
      return;
    }

    const { error: dbError } = await supabase.from("leads").insert([
      { name: form.name, email: form.email, budget: form.budget, message: form.message },
    ]);

    if (dbError) {
      setStatus("error");
      setError(dbError.message);
      return;
    }
    setStatus("success");
    setForm({ name: "", email: "", budget: "", message: "" });
  };

  return (
    <section id="contact" className="relative border-t border-white/[0.06] py-24 md:py-32">
      <div className="container-x">
        <div ref={ref} className="grid gap-12 lg:grid-cols-[0.9fr,1.1fr] lg:gap-16">
          {/* Info column */}
          <div ref={setChildRef(0)} className="reveal">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold tabular-nums text-accent">05</span>
              <span className="section-label">تواصل معنا</span>
            </div>
            <h2 className="mt-5 text-4xl font-extrabold tracking-tightest md:text-5xl">
              خلينا نبني <span className="text-accent">حاجتك</span>
            </h2>
            <p className="mt-4 max-w-md text-white/55">
              حكي لنا عن مشروعك وهنرد عليك في أقرب وقت. البيانات محفوظة في Supabase بشكل آمن.
            </p>

            <ul className="mt-10 space-y-5">
              {info.map((item) => (
                <li key={item.label} className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-accent">
                    <Icon name={item.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-xs text-white/45">{item.label}</div>
                    <div className="text-sm font-medium text-paper">{item.value}</div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white/60 transition-all duration-300 hover:border-accent/50 hover:text-accent"
                >
                  <Icon name={s.name} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Form column */}
          <div ref={setChildRef(1)} className="card reveal rounded-3xl p-7 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div className="field">
                  <input name="name" required value={form.name} onChange={handleChange} placeholder=" " />
                  <label>الاسم الكامل</label>
                </div>
                <div className="field">
                  <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder=" " />
                  <label>البريد الإلكتروني</label>
                </div>
              </div>

              <div className="field">
                <select name="budget" value={form.budget} onChange={handleChange} required>
                  <option value="" disabled hidden></option>
                  <option value="< 5k">أقل من 5,000</option>
                  <option value="5k-15k">5,000 - 15,000</option>
                  <option value="15k+">أكثر من 15,000</option>
                </select>
                <label>الميزانية المتوقعة</label>
              </div>

              <div className="field">
                <textarea name="message" required rows={5} value={form.message} onChange={handleChange} placeholder=" " maxLength={500} />
                <label>رسالتك — حكي لنا عن فكرتك</label>
                <div className="mt-1 text-left text-xs text-white/40">{form.message.length}/500</div>
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-primary w-full py-4 text-base disabled:opacity-60"
              >
                {status === "loading" ? (
                  <span className="flex items-center gap-2">
                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    جاري الإرسال...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    ابعت الطلب
                    <Icon name="send" className="h-4 w-4" />
                  </span>
                )}
              </button>
            </form>

            {status === "success" && (
              <div className="mt-5 flex items-center gap-3 rounded-xl border border-accent/40 bg-accent/10 px-5 py-4 text-sm text-paper">
                <Icon name="check" className="h-5 w-5 shrink-0 text-accent" />
                تم استلام طلبك بنجاح! هنتواصل معاك في أقرب وقت.
              </div>
            )}

            {status === "error" && (
              <div className="mt-5 flex items-center gap-3 rounded-xl border border-accent/40 bg-accent/10 px-5 py-4 text-sm text-paper">
                <Icon name="alert" className="h-5 w-4 shrink-0 text-accent" />
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
