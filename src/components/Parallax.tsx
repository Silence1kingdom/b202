"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";

interface ParallaxItem {
  el: HTMLElement;
  speed: number;
  fade: boolean;
}

const ParallaxContext = createContext<((item: ParallaxItem) => () => void) | null>(
  null
);

// Single shared scroll/raf loop for ALL parallax items on the page.
function ParallaxProvider({ children }: { children: ReactNode }) {
  const items = useRef<ParallaxItem[]>([]);
  const rafId = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (reduce || touch) return; // native scroll is better on touch / reduced-motion

    const update = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      for (const it of items.current) {
        const rect = it.el.getBoundingClientRect();
        const progress = (vh - rect.top) / (vh + rect.height);
        const clamped = Math.min(1, Math.max(0, progress));
        const translate = (0.5 - clamped) * it.speed;
        it.el.style.transform = `translate3d(0, ${translate.toFixed(2)}px, 0)`;
        if (it.fade) {
          it.el.style.opacity = Math.min(1, Math.max(0, clamped * 1.4)).toFixed(3);
        }
      }
      ticking.current = false;
    };
    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        rafId.current = requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const register = (item: ParallaxItem) => {
    items.current.push(item);
    return () => {
      items.current = items.current.filter((i) => i.el !== item.el);
    };
  };

  return <ParallaxContext.Provider value={register}>{children}</ParallaxContext.Provider>;
}

export default function Parallax({
  children,
  speed = 60,
  fade = false,
  className = "",
}: {
  children?: ReactNode;
  speed?: number;
  fade?: boolean;
  className?: string;
}) {
  const register = useContext(ParallaxContext);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!register || !ref.current) return;
    const unregister = register({ el: ref.current, speed, fade });
    return unregister;
  }, [register, speed, fade]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}

export { ParallaxProvider };
