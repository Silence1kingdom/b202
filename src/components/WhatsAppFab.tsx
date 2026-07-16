"use client";

import { useEffect, useState } from "react";
import Icon from "@/components/icons";

const WHATSAPP_NUMBER = "201222239634";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}`;

export default function WhatsAppFab() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل فوري على واتساب"
      title="تواصل فوري على واتساب"
      className={`group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-2xl shadow-emerald-900/40 transition-all duration-500 hover:scale-110 hover:bg-[#1ebe5b] ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-6 opacity-0"
      }`}
    >
      <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75" />
        <span className="relative inline-flex h-3 w-3 rounded-full bg-[#25D366]" />
      </span>
      <Icon name="whatsapp" className="h-7 w-7 text-white" />
    </a>
  );
}
