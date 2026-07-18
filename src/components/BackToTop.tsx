"use client";

import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-[calc(2rem+env(safe-area-inset-bottom,0px))] left-8 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-ink/80 text-paper backdrop-blur-md transition-all duration-500 hover:border-white/40 hover:bg-white/10 rtl:right-8 rtl:left-auto ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
      aria-label="العودة للأعلى"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 16V4M10 4L4 10M10 4L16 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
