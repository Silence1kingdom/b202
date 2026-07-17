"use client";

import { useState } from "react";
import { getSupabase } from "@/lib/supabase";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Icon from "@/components/icons";

const WHATSAPP_NUMBER = "201222239634";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

const info = [
  { icon: "send", label: "البريد الإلكتروني", value: "hello@b202.dev" },
  { icon: "whatsapp", label: "واتساب مباشر", value: "+20 122 223 9634" },
  { icon: "check", label: "مدة الرد", value: "خلال 24 ساعة" },
];

const socials = [
  { label: "GitHub", name: "github" },
  { label: "Twitter", name: "twitter" },
  { label: "Instagram", name: "instagram" },
];

const budgetOptions = [
  { value: "< 5k", label: "أقل من 5,000", hint: "موقع تعريفي / هبوط" },
  { value: "5k-15k", label: "5,000 - 15,000", hint: "متجر / SaaS" },
  { value: "15k+", label: "أكثر من 15,000", hint: "مشروع متكامل" },
  { value: "custom", label: "قيمة مخصصة", hint: "حدد ميزانيتك" },
];

const BUDGET_LABELS: Record<string, string> = {
  "< 5k": "أقل من 5,000 جنيه",
  "5k-15k": "5,000 - 15,000 جنيه",
  "15k+": "أكثر من 15,000 جنيه",
};

function escapeWhatsapp(value: string) {
  return value.replace(/[*_~`]/g, (m) => `\u200b${m}`).trim();
}

function buildWhatsappMessage(form: {
  name: string;
  email: string;
  budget: string;
  message: string;
}) {
  const now = new Date();
  const date = now.toLocaleDateString("en-GB");
  const time = now.toLocaleTimeString("ar-EG", { hour: "2-digit", minute: "2-digit" });
  const name = escapeWhatsapp(form.name);
  const budget = BUDGET_LABELS[form.budget]
    || (form.budget ? `${escapeWhatsapp(form.budget)} جنيه` : "لم تحدد");

  return `━━━ B_20 ━━━
*مرحباً* ${name} 
*عندك طلب جديد، وده تفاصيله:*

*الاسم:>>* ${name}.
*البريد:>>* ${escapeWhatsapp(form.email)}.
*الميزانية:>>* ${budget}.
*الرسالة:>>*
${escapeWhatsapp(form.message)}.
*التاريخ:>>* ${date}.
*الوقت:>>* ${time}.

 <<*سوف يتم الرد في اقرب وقت*>>
`;
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", budget: "", message: "" });
  const [customBudget, setCustomBudget] = useState(false);
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

    const text = encodeURIComponent(buildWhatsappMessage(form));
    window.open(`${WHATSAPP_LINK}?text=${text}`, "_blank", "noopener,noreferrer");

    // Save the lead in the background — never block the UI on DB latency.
    (async () => {
      try {
        const supabase = getSupabase();
        if (!supabase) return;
        const save = supabase.from("leads").insert([
          {
            name: form.name.trim(),
            email: form.email.trim(),
            budget: form.budget.trim(),
            message: form.message.trim(),
            read: false,
          },
        ]);
        const timeout = new Promise((_, rej) =>
          setTimeout(() => rej(new Error("timeout")), 4000)
        );
        const { error: dbError } = (await Promise.race([save, timeout])) as any;
        if (dbError) console.error("[leads] insert:", dbError.message);
      } catch (err) {
        console.error("[leads] insert failed:", err);
      }
    })();

    setStatus("success");
    setForm({ name: "", email: "", budget: "", message: "" });
    setCustomBudget(false);
  };

  const isFilled = form.name && form.email && form.message;

  return (
    <section id="contact" className="relative overflow-hidden border-t border-white/[0.06] py-24 md:py-32">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -top-24 right-10 h-80 w-80 rounded-full bg-accent/10 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-24 left-10 h-80 w-80 rounded-full bg-success/10 blur-[140px]" />

      <div className="container-x relative">
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
              حكي لنا عن مشروعك وهنرد عليك في أقرب وقت — على الواتساب مباشرة.
            </p>

            <ul className="mt-10 space-y-5">
              {info.map((item) => (
                <li key={item.label} className="flex items-center gap-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-accent">
                    <Icon name={item.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-xs text-white/45">{item.label}</div>
                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-paper transition-colors hover:text-accent"
                    >
                      {item.value}
                    </a>
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
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="واتساب"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white/60 transition-all duration-300 hover:border-accent/50 hover:text-accent"
              >
                <Icon name="whatsapp" className="h-4 w-4" />
              </a>
            </div>

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-10 flex items-center justify-center gap-2 rounded-2xl border border-accent/30 bg-accent/10 px-6 py-4 font-semibold text-accent transition-all duration-300 hover:border-accent/60 hover:bg-accent/20"
            >
              <Icon name="whatsapp" className="h-5 w-5" />
              تواصل فوري على واتساب
            </a>
          </div>

          {/* Form column */}
          <div ref={setChildRef(1)} className="reveal">
            <div className="card group relative overflow-hidden rounded-3xl p-7 md:p-10">
              {/* glow ring on hover */}
              <div className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br from-accent/30 via-transparent to-success/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude", padding: "1px" }} />

              <div className="relative">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-paper">أطلب مشروعك</h3>
                  <span className="flex items-center gap-1.5 rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">
                    <span className="h-1.5 w-1.5 rounded-full bg-success" />
                    واتساب
                  </span>
                </div>

                {status === "success" ? (
                   <div className="flex flex-col items-center py-10 text-center" role="status" aria-live="polite">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/15 text-accent">
                      <Icon name="check" className="h-8 w-8" />
                    </div>
                    <h4 className="mt-5 text-xl font-bold text-paper">اتفتح لك واتساب ✅</h4>
                    <p className="mt-2 max-w-xs text-sm text-white/50">
                      الرسالة جاهزة — اضغط إرسال ونحنا نرد عليك في أقرب وقت.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="btn-ghost mt-6 px-6 py-2.5 text-sm"
                    >
                      ابعت طلب تاني
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 md:grid-cols-2">
                       <div className="field">
                         <input name="name" required value={form.name} onChange={handleChange} placeholder=" " aria-label="الاسم الكامل" />
                         <label>الاسم الكامل</label>
                       </div>
                       <div className="field">
                         <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder=" " aria-label="البريد الإلكتروني" />
                         <label>البريد الإلكتروني</label>
                       </div>
                    </div>

                    {/* Budget chips */}
                    <div>
                      <span className="mb-2 block text-xs text-white/45">الميزانية المتوقعة</span>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                        {budgetOptions.map((b) => {
                          const isCustom = b.value === "custom";
                          const active = isCustom ? customBudget : !customBudget && form.budget === b.value;
                          return (
                            <button
                              type="button"
                              key={b.value}
                              onClick={() => {
                                if (isCustom) {
                                  setCustomBudget(true);
                                  setForm({ ...form, budget: "" });
                                } else {
                                  setCustomBudget(false);
                                  setForm({ ...form, budget: b.value });
                                }
                              }}
                              className={`rounded-xl border px-3 py-2.5 text-center text-sm transition-all duration-300 ${
                                active
                                  ? "border-accent/50 bg-accent/15 text-accent"
                                  : "border-white/10 text-white/55 hover:border-white/25"
                              }`}
                            >
                              <div className="font-semibold">{b.label}</div>
                              <div className="mt-0.5 text-[0.65rem] text-white/40">{b.hint}</div>
                            </button>
                          );
                        })}
                      </div>

                      {customBudget && (
                        <div className="field mt-3">
                          <input
                            name="budget"
                            inputMode="numeric"
                            value={form.budget}
                            onChange={handleChange}
                            placeholder=" "
                            autoFocus
                          />
                          <label>الميزانية بالجنيه (مثال: 25,000)</label>
                        </div>
                      )}
                    </div>

                     <div className="field">
                       <textarea name="message" required rows={5} value={form.message} onChange={handleChange} placeholder=" " maxLength={500} aria-label="رسالتك" />
                       <label>رسالتك — حكي لنا عن فكرتك</label>
                      <div className="mt-1 flex items-center justify-between text-xs">
                        <span className="text-white/40">{form.message.length}/500</span>
                        {isFilled && <span className="text-success">جاهز للإرسال 🚀</span>}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="btn-primary flex w-full items-center justify-center gap-2 py-4 text-base disabled:opacity-70"
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
                          ابعت الطلب على واتساب
                          <Icon name="whatsapp" className="h-5 w-5" />
                        </span>
                      )}
                    </button>

                    <p className="text-center text-xs text-white/40">
                      هيتفتح لك واتساب مع الرسالة جاهزة — بس تضغط إرسال.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
