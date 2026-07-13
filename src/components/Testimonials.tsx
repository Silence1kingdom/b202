"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { testimonials } from "@/lib/data";
import Icon from "@/components/icons";

export default function Testimonials() {
  const { ref, setChildRef } = useScrollReveal({ staggerMs: 100 });

  return (
    <section id="testimonials" className="relative border-t border-white/[0.06] py-24 md:py-32">
      <div className="container-x">
        <div ref={setChildRef(0)} className="reveal mb-14 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold tabular-nums text-accent">04</span>
            <span className="section-label">آراء العملاء</span>
          </div>
          <h2 className="mt-5 text-4xl font-extrabold tracking-tightest md:text-5xl lg:text-6xl">
            العملاء <span className="text-accent">بيقولوا إيه</span>
          </h2>
        </div>

        <div ref={ref} className="grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div key={t.name} ref={setChildRef(i + 1)} className="card reveal rounded-2xl p-7">
              <div className="flex gap-1 text-accent">
                {[...Array(5)].map((_, j) => (
                  <Icon key={j} name="star" className="h-4 w-4" />
                ))}
              </div>

              <p className="mt-4 text-sm leading-relaxed text-white/75">"{t.text}"</p>

              <div className="mt-6 flex items-center gap-3 border-t border-white/[0.06] pt-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-sm font-bold text-accent">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold text-accent">{t.name}</div>
                  <div className="text-xs text-white/45">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
