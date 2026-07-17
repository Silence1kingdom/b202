"use client";

import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import Parallax from "@/components/Parallax";
import Icon from "@/components/icons";
import type { Project } from "@/lib/data";

function screenshotUrl(liveUrl: string) {
  return `https://api.microlink.io/?url=${encodeURIComponent(
    liveUrl
  )}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1024&viewport.height=640&waitUntil=domcontentloaded`;
}

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const { ref, setChildRef } = useScrollReveal({ staggerMs: 100 });

  return (
    <div ref={ref} className="grid gap-6 md:grid-cols-2">
      {projects.map((p, i) => (
        <div
          key={p.slug}
          ref={setChildRef(i + 1)}
          className={`reveal ${i === 0 ? "md:col-span-2" : ""}`}
        >
          <article className="card group overflow-hidden rounded-3xl">
            {/* Preview */}
            <div className={`relative h-60 overflow-hidden bg-gradient-to-br md:h-72 ${p.tone}`}>
              {p.live_url ? (
                <img
                  src={screenshotUrl(p.live_url)}
                  alt={p.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <Parallax speed={40} className="absolute inset-0 flex items-center justify-center">
                  <span className="select-none text-[11rem] font-black leading-none text-white/10 transition-transform duration-500 group-hover:scale-110">
                    {p.title.charAt(0)}
                  </span>
                </Parallax>
              )}
              <div className="absolute inset-0 bg-ink/20" />

              {/* Year */}
              <div className="absolute left-4 top-4 rounded-full bg-ink/60 px-3 py-1 text-xs font-medium text-accent backdrop-blur-sm">
                {p.year}
              </div>

              {/* Visit site button on image */}
              {p.live_url && (
                <a
                  href={p.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-white/25 group-hover:opacity-100"
                >
                  <Icon name="globe" className="h-3.5 w-3.5" />
                  زيارة الموقع
                </a>
              )}

              {/* Hover overlay with tags */}
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink via-ink/50 to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white backdrop-blur-sm"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Body */}
            <Link href={`/work/${p.slug}`} className="block border-t border-white/[0.06] p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs uppercase tracking-widest text-white/40">
                    {p.category}
                  </span>
                  <h3 className="mt-1.5 text-2xl font-bold text-accent">{p.title}</h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-white/55">{p.description}</p>
                </div>
                <span className="mt-1 hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/60 transition-all duration-300 group-hover:border-accent/50 group-hover:bg-accent group-hover:text-ink sm:flex">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-4 w-4 -scale-x-100">
                    <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>

              {p.live_url && (
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-success">
                  <Icon name="check" className="h-3.5 w-3.5" />
                  الموقع متاح للزيارة
                </span>
              )}
            </Link>
          </article>
        </div>
      ))}
    </div>
  );
}
