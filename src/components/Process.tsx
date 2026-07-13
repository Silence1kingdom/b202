"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { processSteps } from "@/lib/data";
import Icon from "@/components/icons";

export default function Process() {
  const { ref, setChildRef } = useScrollReveal({ staggerMs: 120 });

  return (
    <section id="process" className="relative border-t border-white/[0.06] py-24 md:py-32">
      <div className="container-x">
        <div ref={setChildRef(0)} className="reveal mb-14 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold tabular-nums text-accent">03</span>
            <span className="section-label">الخطوات</span>
          </div>
          <h2 className="mt-5 text-4xl font-extrabold tracking-tightest md:text-5xl lg:text-6xl">
            إزاي <span className="text-accent">بنشتغل</span>
          </h2>
          <p className="mt-4 text-white/55">
            أربع خطوات بسيطة توصلك من الفكرة إلى منتج جاهز يشتغل على الإنترنت.
          </p>
        </div>

        <div ref={ref} className="relative grid gap-5 md:grid-cols-4">
          <div className="absolute left-0 right-0 top-16 hidden h-px bg-white/10 md:block" />

          {processSteps.map((ps, i) => (
            <div key={ps.step} ref={setChildRef(i + 1)} className="reveal relative">
              <div className="card group rounded-2xl p-7">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-paper transition-colors duration-300 group-hover:border-accent/40 group-hover:bg-accent group-hover:text-ink">
                    <Icon name={ps.icon} className="h-6 w-6" />
                  </div>
                  <span className="text-sm font-medium tabular-nums text-accent">{ps.step}</span>
                </div>
                <h3 className="mt-5 text-xl font-bold text-accent">{ps.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{ps.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
