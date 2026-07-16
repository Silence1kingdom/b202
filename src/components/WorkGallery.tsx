"use client";

import { useMemo, useState } from "react";
import ProjectsGrid from "@/components/ProjectsGrid";
import type { Project } from "@/lib/data";

export default function WorkGallery({ projects }: { projects: Project[] }) {
  const categories = useMemo(() => {
    const set = new Set(projects.map((p) => p.category));
    return ["الكل", ...Array.from(set)];
  }, [projects]);

  const [active, setActive] = useState("الكل");

  const filtered = useMemo(
    () => (active === "الكل" ? projects : projects.filter((p) => p.category === active)),
    [active, projects]
  );

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${
              active === c
                ? "border-accent/50 bg-accent/15 text-accent"
                : "border-white/10 text-white/55 hover:border-white/25 hover:text-paper"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <ProjectsGrid projects={filtered} />
      ) : (
        <p className="py-20 text-center text-white/40">لا توجد مشاريع في هذا التصنيف بعد.</p>
      )}
    </div>
  );
}
