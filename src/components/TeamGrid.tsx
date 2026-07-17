"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

type Member = {
  name: string;
  role: string;
  bio?: string;
  skills?: string[];
  avatar: string;
  tone?: string;
};

export default function TeamGrid({ members }: { members: Member[] }) {
  const { ref, setChildRef } = useScrollReveal({ staggerMs: 110 });

  return (
    <div ref={ref} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((m, i) => (
        <article
          key={m.name}
          ref={setChildRef(i + 1)}
          className="group reveal relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/5"
        >
          {/* Cover gradient */}
          <div className={`relative h-28 overflow-hidden bg-gradient-to-br ${m.tone ?? "from-accent/25 via-accent/5 to-transparent"}`}>
            <div className="pointer-events-none absolute -right-8 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-12 left-10 h-32 w-32 rounded-full bg-success/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </div>

          {/* Avatar overlapping */}
          <div className="flex justify-center">
            <div className={`-mt-12 flex h-24 w-24 items-center justify-center rounded-full border-4 border-ink bg-gradient-to-br ${m.tone ?? "from-accent/30 to-accent/5"} text-3xl font-bold text-paper shadow-xl transition-transform duration-500 group-hover:scale-105`}>
              {m.avatar}
            </div>
          </div>

          <div className="flex flex-1 flex-col px-6 pb-7 pt-4 text-center">
            <h3 className="text-xl font-bold text-paper">{m.name}</h3>
            <div className="mt-1 inline-flex items-center justify-center rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
              {m.role}
            </div>

            {m.bio && (
              <p className="mt-4 text-sm leading-relaxed text-white/50">{m.bio}</p>
            )}

            {/* Skills revealed on hover */}
            <div className="mt-4 flex flex-wrap justify-center gap-2 opacity-0 transition-all duration-500 group-hover:opacity-100">
              {(m.skills ?? []).map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[0.7rem] text-white/60"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="mt-auto flex items-center justify-center gap-3 pt-5">
              <a
                href="https://wa.me/201222239634"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="واتساب"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/55 transition-colors duration-300 hover:border-success/50 hover:text-success"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.8 14.12c-.24.68-1.4 1.32-1.92 1.36-.5.04-.96.24-3.25-.68-2.77-1.11-4.53-3.96-4.67-4.14-.13-.18-1.1-1.46-1.1-2.79 0-1.32.7-1.97.95-2.24.24-.27.53-.34.7-.34.18 0 .35 0 .5.01.16.01.38-.06.59.45.24.55.83 2.88 1.01 3.46.18.59.3.51.51.84.21.32.43.58.62.83.2.25.41.52.58.79.18.28.38.6.3.93-.07.33-.56 1.41-.76 1.9-.2.5-.41.43-.95.29-.54-.14-2.01-.74-3.83-2.36-.95-.81-1.7-1.83-1.96-2.41-.25-.58-.03-.9.0-.94.03-.04.23-.3.49-.56.26-.25.57-.58.8-.81.24-.24.5-.5.75-.75.24-.25.49-.52.46-.91-.03-.4-.85-2.05-.98-2.5-.13-.46-.27-.4-.55-.41z" />
                </svg>
              </a>
              <a
                href="mailto:hello@b202.dev"
                aria-label="بريد"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/55 transition-colors duration-300 hover:border-electric/50 hover:text-electric"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-4 w-4">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="m3 7 9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
