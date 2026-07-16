"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { Service } from "@/lib/data";
import Icon from "@/components/icons";

export default function Services({ services }: { services: Service[] }) {
  const { ref, setChildRef } = useScrollReveal({ staggerMs: 80 });

  return (
    <section id="services" className="relative border-t border-white/[0.06] py-24 md:py-32">
      <div className="container-x">
        <div ref={setChildRef(0)} className="reveal mb-14 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold tabular-nums text-accent">01</span>
            <span className="section-label">خدماتنا</span>
          </div>
          <h2 className="mt-5 text-4xl font-extrabold tracking-tightest md:text-5xl lg:text-6xl">
            كل اللي محتاجه <span className="text-accent">تحت سقف واحد</span>
          </h2>
          <p className="mt-4 text-white/55">
            من التصميم للتطوير للإطلاق — B_20 يغطي كل مرحلة في رحلة موقعك.
          </p>
        </div>

        <div ref={ref} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <div
              key={s.title}
              ref={setChildRef(i + 1)}
              className="card group rounded-2xl p-7"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-paper transition-colors duration-300 group-hover:border-accent/40 group-hover:bg-accent group-hover:text-ink">
                <Icon name={s.icon} className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-accent">{s.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-white/55">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
