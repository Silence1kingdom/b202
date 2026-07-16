"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import ProjectsGrid from "@/components/ProjectsGrid";
import type { Project } from "@/lib/data";

export default function Work({ projects }: { projects: Project[] }) {
  const { setChildRef } = useScrollReveal();

  return (
    <section id="work" className="relative border-t border-white/[0.06] py-24 md:py-32">
      <div className="container-x">
        <div ref={setChildRef(0)} className="reveal mb-14 max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold tabular-nums text-accent">02</span>
            <span className="section-label">أعمالنا</span>
          </div>
          <h2 className="mt-5 text-4xl font-extrabold tracking-tightest md:text-5xl lg:text-6xl">
            أحدث اللي <span className="text-accent">بنيناه</span>
          </h2>
          <p className="mt-4 text-white/55">
            مشاريع حقيقية بنيناها لعملاء حقيقيين. كل مشروع كان تحدي مختلف.
          </p>
        </div>

        <ProjectsGrid projects={projects} />
      </div>
    </section>
  );
}
