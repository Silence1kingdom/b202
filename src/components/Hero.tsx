"use client";

import { useInView } from "@/hooks/useScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";
import type { Stat } from "@/lib/data";

function StatCounter({ target, suffix }: { target: number; suffix: string }) {
  const { ref, inView } = useInView();
  const count = useCountUp(target, 1800, inView);
  return (
    <span ref={ref} className="tabular-nums text-accent">
      {count}
      {suffix}
    </span>
  );
}

export default function Hero({ stats }: { stats: Stat[] }) {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-60" />
      <div className="absolute -top-40 right-0 h-[420px] w-[420px] rounded-full bg-white/[0.04] blur-[120px]" />
      <div className="absolute -bottom-40 left-0 h-[420px] w-[420px] rounded-full bg-white/[0.03] blur-[120px]" />

      <div className="container-x relative pt-28 pb-20 md:pt-32">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5">
            <span className="pulse-dot !h-2 !w-2" />
            <span className="text-xs text-white/70">فريق b202 — متاح للعمل الآن</span>
          </div>

          <h1 className="mt-8 text-5xl font-extrabold leading-[1.1] tracking-tightest md:text-7xl lg:text-8xl">
            نبني{" "}
            <span className="box-decoration-clone rounded-lg bg-accent px-3 py-1 text-ink">
              مواقع
            </span>
            <br />
            تعيش طويلاً
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/55">
            فريق b202 يصمم ويطور تجارب رقمية سريعة وحديثة وموثوقة — من فكرة
            بسيطة إلى منتج حقيقي على Vercel.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#contact" className="btn-primary px-8 py-3.5 text-base">
              ابدأ مشروعك الآن
            </a>
            <a href="#work" className="btn-ghost px-8 py-3.5 text-base">
              شوف أعمالنا
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-4 w-4 rotate-180">
                <path d="M19 12H5m7-7-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          <div className="mt-12 flex flex-wrap gap-2">
            {["Next.js", "React", "TypeScript", "Tailwind", "Supabase", "Vercel"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 px-4 py-1.5 text-xs text-white/50"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] md:mt-20 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-ink/60 p-6 text-center backdrop-blur-sm">
              <div className="text-3xl font-bold tabular-nums md:text-4xl">
                <StatCounter target={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-2 text-sm text-white/50">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
