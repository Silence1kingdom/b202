"use client";

import { useEffect, useRef, useState } from "react";

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  staggerMs?: number;
}

export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseScrollRevealOptions = {}
) {
  const { threshold = 0.12, rootMargin = "0px 0px -40px 0px", staggerMs = 80 } = options;
  const childrenRef = useRef<(T | null)[]>([]);

  useEffect(() => {
    const els = childrenRef.current.filter(Boolean) as HTMLElement[];
    const observers = els.map((el, i) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            el.style.transitionDelay = `${i * staggerMs}ms`;
            el.classList.add("revealed");
            observer.unobserve(el);
          }
        },
        { threshold, rootMargin }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [threshold, rootMargin, staggerMs]);

  const setChildRef = (index: number) => (el: T | null) => {
    childrenRef.current[index] = el;
  };

  return { ref: undefined as React.RefObject<T> | undefined, setChildRef };
}

export function useInView(options: IntersectionObserverInit = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}
