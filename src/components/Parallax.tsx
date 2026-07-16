"use client";

import { useEffect, useRef } from "react";

interface ParallaxProps {
  children?: React.ReactNode;
  /** total travel range in px (element moves ±speed/2) */
  speed?: number;
  /** fade element as it leaves the viewport */
  fade?: boolean;
  className?: string;
}

export default function Parallax({
  children,
  speed = 60,
  fade = false,
  className = "",
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const progress = (vh - rect.top) / (vh + rect.height);
      const clamped = Math.min(1, Math.max(0, progress));
      const translate = (0.5 - clamped) * speed;
      el.style.transform = `translate3d(0, ${translate.toFixed(2)}px, 0)`;
      if (fade) {
        const opacity = Math.min(1, Math.max(0, clamped * 1.4));
        el.style.opacity = opacity.toFixed(3);
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [speed, fade]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
