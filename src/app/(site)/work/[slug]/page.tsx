import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/lib/data";
import Icon from "@/components/icons";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = projects.find((x) => x.slug === params.slug);
  if (!p) return { title: "مشروع غير موجود — b202" };
  return { title: `${p.title} — b202`, description: p.desc };
}

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  const index = projects.findIndex((x) => x.slug === params.slug);
  if (index === -1) notFound();
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  return (
    <main className="page-enter pt-16 md:pt-20">
      <article>
        <div className="container-x pt-8">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm text-white/55 transition-colors hover:text-accent"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-4 w-4 -scale-x-100">
              <path d="M19 12H5m7-7-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            كل الأعمال
          </Link>
        </div>

        <header className="container-x pb-10 pt-8">
          <span className="text-xs uppercase tracking-widest text-white/40">{project.category}</span>
          <h1 className="mt-2 text-4xl font-extrabold tracking-tightest md:text-6xl">{project.title}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/55">{project.desc}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
              {project.year}
            </span>
            {project.tags.map((t) => (
              <span key={t} className="rounded-full border border-white/10 px-4 py-1.5 text-xs text-white/60">
                {t}
              </span>
            ))}
          </div>
        </header>

        <div className="container-x">
          <div className={`relative h-72 rounded-3xl bg-gradient-to-br ${project.tone} md:h-96`}>
            <div className="absolute inset-0 bg-ink/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="select-none text-9xl font-black text-white/10">
                {project.title.charAt(0)}
              </span>
            </div>
          </div>
        </div>

        <section className="container-x py-16">
          <div className="grid gap-12 md:grid-cols-[1.4fr,1fr]">
            <div>
              <h2 className="text-2xl font-bold">عن المشروع</h2>
              <p className="mt-4 leading-relaxed text-white/55">{project.desc}</p>
              <p className="mt-4 leading-relaxed text-white/55">
                اشتغلنا مع العميل على كل التفاصيل من الصفر: التصميم، التطوير، والإطلاق — مع
                تركيز على الأداء وتجربة المستخدم.
              </p>
            </div>
            <aside>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-white/70">التقنيات</h3>
              <ul className="mt-4 space-y-3">
                {project.tags.map((t) => (
                  <li key={t} className="flex items-center gap-3 text-white/70">
                    <Icon name="check" className="h-4 w-4 text-accent" />
                    {t}
                  </li>
                ))}
              </ul>
              <Link href="/#contact" className="btn-primary mt-8 w-full px-6 py-3.5 text-base">
                ابدأ مشروع مشابه
              </Link>
            </aside>
          </div>
        </section>

        <section className="container-x pb-24">
          <Link
            href={`/work/${next.slug}`}
            className="card group flex items-center justify-between rounded-2xl p-6"
          >
            <div>
              <div className="text-xs uppercase tracking-widest text-white/40">المشروع التالي</div>
              <div className="mt-1 text-xl font-bold text-accent">{next.title}</div>
            </div>
            <span className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition-all group-hover:border-accent/50 group-hover:text-accent sm:flex">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-4 w-4 -scale-x-100">
                <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </section>
      </article>
    </main>
  );
}
