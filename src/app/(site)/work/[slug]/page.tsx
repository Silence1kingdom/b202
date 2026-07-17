import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Icon from "@/components/icons";
import { getProjects, getProjectBySlug } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) return { title: "المشروع غير موجود" };

  const desc = project.description.length > 150
    ? project.description.slice(0, 147) + "…"
    : project.description;

  return {
    title: project.title,
    description: desc,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.title} — B_20`,
      description: desc,
      url: `/work/${project.slug}`,
    },
  };
}

export default async function ProjectDetail({
  params,
}: {
  params: { slug: string };
}) {
  const project = await getProjectBySlug(params.slug);
  if (!project) notFound();

  const projects = await getProjects();
  const index = projects.findIndex((x) => x.slug === params.slug);
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
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
              {project.category}
            </span>
            <span className="text-xs text-white/40">{project.year}</span>
            {project.live_url && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-success/30 bg-success/10 px-3 py-1.5 text-xs font-medium text-success">
                <Icon name="check" className="h-3.5 w-3.5" />
                موقع متاح للزيارة
              </span>
            )}
          </div>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tightest md:text-6xl">
            {project.title}
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/55">
            {project.description}
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex px-6 py-3.5 text-base"
              >
                <Icon name="external" className="h-5 w-5" />
                زيارة الموقع
              </a>
            )}
            <Link href="/#contact" className="btn-ghost inline-flex px-6 py-3.5 text-base">
              ابدأ مشروع مشابه
            </Link>
          </div>
        </header>

        {/* Hero preview — browser mockup */}
        <div className="container-x">
          <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02]">
            <div className="flex items-center gap-2 border-b border-white/[0.06] px-5 py-3">
              <span className="h-3 w-3 rounded-full bg-white/15" />
              <span className="h-3 w-3 rounded-full bg-white/15" />
              <span className="h-3 w-3 rounded-full bg-white/15" />
              <div className="ml-4 flex-1 truncate rounded-md bg-white/5 px-3 py-1 text-xs text-white/40">
                {project.live_url ?? `b202.dev/work/${project.slug}`}
              </div>
            </div>
            <div className={`relative h-72 bg-gradient-to-br md:h-[28rem] ${project.tone}`}>
              {project.live_url ? (
                <img
                  src={`https://api.microlink.io/?url=${encodeURIComponent(
                    project.live_url
                  )}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1280&viewport.height=800&waitUntil=domcontentloaded`}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  width={1280}
                  height={800}
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="select-none text-[14rem] font-black leading-none text-white/10">
                    {project.title.charAt(0)}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-ink/15" />
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/15 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/25"
                >
                  <Icon name="globe" className="h-4 w-4" />
                  افتح الموقع في تاب جديدة
                </a>
              )}
            </div>
          </div>
        </div>

        <section className="container-x py-16">
          <div className="grid gap-12 md:grid-cols-[1.4fr,1fr]">
            <div>
              <h2 className="text-2xl font-bold">عن المشروع</h2>
              <p className="mt-4 leading-relaxed text-white/55">{project.description}</p>
              <p className="mt-4 leading-relaxed text-white/55">
                اشتغلنا مع العميل على كل التفاصيل من الصفر: التصميم، التطوير، والإطلاق — مع
                تركيز على الأداء وتجربة المستخدم.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span key={t} className="rounded-full border border-white/10 px-4 py-1.5 text-xs text-white/60">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <aside>
              <div className="admin-card p-6">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-white/70">
                  التقنيات المستخدمة
                </h3>
                <ul className="mt-4 space-y-3">
                  {project.tags.map((t) => (
                    <li key={t} className="flex items-center gap-3 text-white/70">
                      <Icon name="check" className="h-4 w-4 text-accent" />
                      {t}
                    </li>
                  ))}
                </ul>

                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary mt-8 flex w-full items-center justify-center gap-2 px-6 py-3.5 text-base"
                  >
                    <Icon name="external" className="h-5 w-5" />
                    زيارة الموقع
                  </a>
                )}
                <Link href="/#contact" className="btn-ghost mt-3 flex w-full items-center justify-center px-6 py-3.5 text-base">
                  ابدأ مشروع مشابه
                </Link>
              </div>
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
