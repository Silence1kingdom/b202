"use client";

import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { Value, Member, Stat } from "@/lib/data";
import Icon from "@/components/icons";

export default function AboutContent({
  values,
  team,
  stats,
}: {
  values: Value[];
  team: Member[];
  stats: Stat[];
}) {
  const story = useScrollReveal();
  const valHook = useScrollReveal({ staggerMs: 80 });
  const teamHook = useScrollReveal({ staggerMs: 80 });
  const statsHook = useScrollReveal();

  const timeline = [
    { year: "2023", title: "البداية", text: "بدأت الفكرة: فريق صغير يبني مواقع سريعة وموثوقة من غير تعقيد." },
    { year: "2024", title: "أول المشاريع", text: "سلّمنا متاجر ومنتجات SaaS لعملاء حقيقيين بتركيز على الأداء." },
    { year: "2025", title: "B_20", text: "وحّدنا شغلنا تحت اسم B_20 — تصميم، تطوير، وإطلاق في مكان واحد." },
  ];

  return (
    <>
      <section className="border-t border-white/[0.06] pb-12 pt-16 md:pt-20">
        <div className="container-x" ref={story.ref}>
          <div ref={story.setChildRef(0)} className="reveal max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold tabular-nums text-accent">من نحن</span>
              <span className="section-label">عن الفريق</span>
            </div>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tightest md:text-6xl">
              فريق B_20 يبني <span className="text-accent">مواقع تعيش طويلاً</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-white/55">
              إحنا فريق صغير من المصممين والمطورين بنحب الشغل الصح. بنبدأ من فكرة بسيطة
              ونوصلها لمنتج رقمي سريع، حديث، وموثوق — من غير تعقيد ولا حشو.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link href="/work" className="inline-flex items-center gap-2 text-sm font-medium text-accent transition-opacity hover:opacity-80">
                شوف أعمالنا
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-4 w-4 -scale-x-100">
                  <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="/team" className="inline-flex items-center gap-2 text-sm font-medium text-white/55 transition-opacity hover:text-paper">
                تعرف على الفريق
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-4 w-4 -scale-x-100">
                  <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Story timeline */}
      <section className="py-16 md:py-20">
        <div className="container-x">
          <div className="mb-12 max-w-2xl">
            <span className="section-label">قصتنا</span>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tightest md:text-4xl">
              من فكرة لـ <span className="text-accent">واقع</span>
            </h2>
          </div>
          <div className="relative space-y-6 border-r border-white/10 pr-8">
            {timeline.map((t) => (
              <div key={t.year} className="relative">
                <span className="absolute -right-[2.35rem] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-accent bg-ink" />
                <div className="flex items-baseline gap-4">
                  <span className="text-sm font-bold tabular-nums text-accent">{t.year}</span>
                  <h3 className="text-lg font-bold">{t.title}</h3>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-white/55">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-x">
          <div ref={valHook.setChildRef(0)} className="reveal mb-12 max-w-2xl">
            <span className="section-label">قيمنا</span>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tightest md:text-4xl">
              اللي بنتمسك بيه
            </h2>
          </div>
          <div ref={valHook.ref} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <div key={v.title} ref={valHook.setChildRef(i + 1)} className="card reveal rounded-2xl p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-accent">
                  <Icon name={v.icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-x">
          <div ref={teamHook.setChildRef(0)} className="reveal mb-12 max-w-2xl">
            <span className="section-label">الفريق</span>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tightest md:text-4xl">
              الناس اللي ورا الشغل
            </h2>
          </div>
          <div ref={teamHook.ref} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m, i) => (
              <div key={m.name} ref={teamHook.setChildRef(i + 1)} className="card reveal flex items-center gap-4 rounded-2xl p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-sm font-bold text-accent">
                  {m.avatar}
                </div>
                <div>
                  <div className="text-base font-semibold">{m.name}</div>
                  <div className="text-xs text-white/45">{m.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-x">
          <div ref={statsHook.ref} className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] md:grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.label} ref={statsHook.setChildRef(i)} className="reveal bg-ink/60 p-6 text-center backdrop-blur-sm">
                <div className="text-3xl font-bold tabular-nums text-accent md:text-4xl">
                  {s.value}
                  {s.suffix}
                </div>
                <div className="mt-2 text-sm text-white/50">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 pt-4">
        <div className="container-x">
          <div className="card reveal rounded-3xl px-8 py-12 text-center">
            <h2 className="text-3xl font-extrabold tracking-tightest md:text-4xl">جاهز تبدأ مشروعك؟</h2>
            <p className="mt-3 text-white/55">حكي لنا عن فكرتك وهنرد عليك في أقرب وقت.</p>
            <Link href="/#contact" className="btn-primary mt-7 px-8 py-3.5 text-base">
              ابدأ مشروعك الآن
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
