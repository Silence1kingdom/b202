"use client";

import { useScroll } from "@/hooks/useScroll";

export default function ScrollProgress() {
  const { progress } = useScroll();
  return (
    <div className="scroll-progress-container">
      <div
        className="scroll-progress-bar"
        style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
      />
    </div>
  );
}
