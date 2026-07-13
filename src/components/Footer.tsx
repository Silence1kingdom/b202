"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import Icon from "@/components/icons";

const socials = [
  { label: "GitHub", name: "github" },
  { label: "Twitter", name: "twitter" },
  { label: "Instagram", name: "instagram" },
];

export default function Footer() {
  const { ref, setChildRef } = useScrollReveal();

  return (
    <footer className="relative border-t border-white/[0.06] pt-16 pb-8">
      <div ref={ref} className="container-x">
        <div ref={setChildRef(0)} className="reveal grid gap-12 pb-12 md:grid-cols-[1.6fr,1fr,1fr]">
          <div>
            <a href="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-white text-sm font-extrabold text-ink">
                b
              </span>
              <span className="text-xl font-bold tracking-tight text-paper">b202</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/45">
              فريق b202 لبناء المواقع والمنتجات الرقمية. نحول أفكاركم إلى واقع رقمي سريع وجميل.
            </p>

            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white/60 transition-all duration-300 hover:border-white/40 hover:text-paper"
                >
                  <Icon name={s.name} className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-widest text-white/70">روابط سريعة</h4>
            <ul className="space-y-3">
              {[
                { href: "/#services", label: "خدماتنا" },
                { href: "/work", label: "أعمالنا" },
                { href: "/about", label: "من نحن" },
                { href: "/#process", label: "خطوات الشغل" },
                { href: "/#contact", label: "تواصل معنا" },
              ].map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-white/45 transition-colors duration-300 hover:text-accent">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-widest text-white/70">معلومات التواصل</h4>
            <ul className="space-y-3 text-sm text-white/45">
              <li className="flex items-center gap-2">
                <Icon name="send" className="h-4 w-4 text-white/60" />
                hello@b202.dev
              </li>
              <li className="flex items-center gap-2">
                <Icon name="twitter" className="h-4 w-4 text-white/60" />
                @b202team
              </li>
              <li className="flex items-center gap-2">
                <span className="pulse-dot !h-2 !w-2" />
                نرد خلال 24 ساعة
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 md:flex-row">
          <p className="text-xs text-white/40">© {new Date().getFullYear()} b202. مبني بـ Next.js + Supabase + Vercel.</p>
          <div className="flex items-center gap-2 text-xs text-white/40">
            <span className="pulse-dot !h-2 !w-2" />
            <span>جميع الأنظمة تعمل بشكل طبيعي</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
