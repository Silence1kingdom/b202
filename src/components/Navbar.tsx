"use client";

import { useEffect, useState, useCallback } from "react";

const links = [
  { href: "/#services", label: "خدماتنا" },
  { href: "/work", label: "أعمالنا" },
  { href: "/about", label: "من نحن" },
  { href: "/team", label: "الفريق" },
  { href: "/#process", label: "الخطوات" },
  { href: "/#testimonials", label: "آراء العملاء" },
  { href: "/#contact", label: "تواصل" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
      const onScroll = () => {
        setScrolled(window.scrollY > 24);
        if (window.location.pathname === "/team") {
          setActive("/team");
          return;
        }
        const sections = links.map((l) => l.href.split("#")[1] ?? "");
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActive("#" + sections[i]);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    window.dispatchEvent(new CustomEvent(mobileOpen ? "lenis:stop" : "lenis:start"));
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-white/[0.08] bg-ink/80 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <nav className="container-x flex h-16 items-center justify-between md:h-20">
          <a href="/" className="group flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 bg-white text-sm font-extrabold text-ink transition-transform duration-300 group-hover:scale-105">
              b
            </span>
            <span className="text-lg font-bold tracking-tight text-paper">B_20</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`relative rounded-lg px-4 py-2 text-sm transition-colors duration-300 ${
                    active === l.href ? "text-accent" : "text-white/55 hover:text-paper"
                  }`}
                >
                  {active === l.href && (
                    <span className="absolute inset-0 rounded-lg bg-white/10" />
                  )}
                  <span className="relative z-10">{l.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <a href="#contact" className="btn-primary hidden px-5 py-2.5 text-sm md:inline-flex">
            ابدأ مشروعك
          </a>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="relative z-50 flex h-10 w-10 items-center justify-center text-paper md:hidden"
            aria-label="القائمة"
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={`block h-0.5 w-6 rounded-full bg-paper transition-all duration-300 ${
                  mobileOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 rounded-full bg-paper transition-all duration-300 ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-6 rounded-full bg-paper transition-all duration-300 ${
                  mobileOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-ink transition-opacity duration-500 md:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex h-full flex-col items-center justify-center gap-8">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={closeMobile}
              className={`text-3xl font-semibold transition-all duration-500 ${
                active === l.href ? "text-accent" : "text-white/70"
              }`}
              style={{
                transitionDelay: mobileOpen ? `${i * 70}ms` : "0ms",
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? "translateY(0)" : "translateY(16px)",
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={closeMobile}
            className="btn-primary mt-4 px-10 py-3 text-lg"
            style={{
              transitionDelay: mobileOpen ? `${links.length * 70}ms` : "0ms",
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? "translateY(0)" : "translateY(16px)",
            }}
          >
            ابدأ مشروعك
          </a>
        </div>
      </div>
    </>
  );
}
