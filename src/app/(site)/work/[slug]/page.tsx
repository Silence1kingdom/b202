import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Icon from "@/components/icons";
import { getProjects, getProjectBySlug } from "@/lib/queries";

export const revalidate = 60;

const WHATSAPP = "https://wa.me/201222239634";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) return { title: "المشروع غير موجود" };

  const desc =
    project.description.length > 150
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

function screenshot(liveUrl: string, w: number, h: number) {
  return `https://api.microlink.io/?url=${encodeURIComponent(
    liveUrl
  )}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=${w}&viewport.height=${h}&waitUntil=domcontentloaded&ttl=86400s`;
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
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  const tags = Array.isArray(project.tags) ? project.tags : [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: project.title,
    url: project.live_url ?? "https://b202.vercel.app",
    description: project.description,
    author: { "@type": "Organization", name: "B_20" },
  };

  const whatsappHref = `${WHATSAPP}?text=${encodeURIComponent(
    `مرحباً B_20، شفت مشروع "${project.title}" وعايز أبدأ مشروع مشابه.`
  )}`;

  return (
    <main className="page-enter pt-16 md:pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
            {project.featured && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-bold text-ink">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                  <path d="m12 2 2.9 6.2 6.6.8-4.9 4.5 1.3 6.5L12 17.8 6.1 20.5l1.3-6.5L2.5 9l6.6-.8z" />
                </svg>
                مشروع مميز
              </span>
            )}
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
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost inline-flex px-6 py-3.5 text-base"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.8 14.12c-.24.68-1.4 1.32-1.92 1.36-.5.04-.96.24-3.25-.68-2.77-1.11-4.53-3.96-4.67-4.14-.13-.18-1.1-1.46-1.1-2.79 0-1.32.7-1.97.95-2.24.24-.27.53-.34.7-.34.18 0 .35 0 .5.01.16.01.38-.06.59.45.24.55.83 2.88 1.01 3.46.18.59.3.51.51.84.21.32.43.58.62.83.2.25.41.52.58.79.18.28.38.6.3.93-.07.33-.56 1.41-.76 1.9-.2.5-.41.43-.95.29-.54-.14-2.01-.74-3.83-2.36-.95-.81-1.7-1.83-1.96-2.41-.25-.58-.03-.9.0-.94.03-.04.23-.3.49-.56.26-.25.57-.58.8-.81.24-.24.5-.5.75-.75.24-.25.49-.52.46-.91-.03-.4-.85-2.05-.98-2.5-.13-.46-.27-.4-.55-.41z" />
              </svg>
              ابدأ مشروع مشابه
            </a>
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
                  src={screenshot(project.live_url, 1280, 800)}
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

        {/* Responsive gallery — desktop / tablet / mobile */}
        {project.live_url && (
          <section className="container-x py-12">
            <div className="mb-8 flex items-center gap-3">
              <span className="text-sm font-bold tabular-nums text-accent">لقطات</span>
              <span className="section-label">عرض responsive</span>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              <figure className="card overflow-hidden rounded-2xl">
                <div className="relative h-48 bg-gradient-to-br from-white/5 to-transparent">
                  <img
                    src={screenshot(project.live_url, 1280, 800)}
                    alt={`${project.title} — ديسكتوب`}
                    loading="lazy"
                    decoding="async"
                    width={1280}
                    height={800}
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                </div>
                <figcaption className="flex items-center gap-2 px-4 py-3 text-sm text-white/55">
                  <Icon name="monitor" className="h-4 w-4 text-accent" />
                  ديسكتوب
                </figcaption>
              </figure>

              <figure className="card overflow-hidden rounded-2xl">
                <div className="relative h-48 bg-gradient-to-br from-white/5 to-transparent">
                  <img
                    src={screenshot(project.live_url, 834, 1112)}
                    alt={`${project.title} — تابلت`}
                    loading="lazy"
                    decoding="async"
                    width={834}
                    height={1112}
                    className="absolute inset-0 h-full w-full object-cover object-top"
                  />
                </div>
                <figcaption className="flex items-center gap-2 px-4 py-3 text-sm text-white/55">
                  <Icon name="tablet" className="h-4 w-4 text-accent" />
                  تابلت
                </figcaption>
              </figure>

              <figure className="card overflow-hidden rounded-2xl">
                <div className="relative h-48 bg-gradient-to-br from-white/5 to-transparent">
                  <img
                    src={screenshot(project.live_url, 390, 844)}
                    alt={`${project.title} — موبايل`}
                    loading="lazy"
                    decoding="async"
                    width={390}
                    height={844}
                    className="absolute inset-0 mx-auto h-full w-auto object-cover object-top"
                  />
                </div>
                <figcaption className="flex items-center gap-2 px-4 py-3 text-sm text-white/55">
                  <Icon name="phone" className="h-4 w-4 text-accent" />
                  موبايل
                </figcaption>
              </figure>
            </div>
          </section>
        )}

        <section className="container-x py-8">
          <div className="grid gap-12 md:grid-cols-[1.4fr,1fr]">
            <div>
              <h2 className="text-2xl font-bold">عن المشروع</h2>
              <p className="mt-4 leading-relaxed text-white/55">{project.description}</p>
              <p className="mt-4 leading-relaxed text-white/55">
                اشتغلنا مع العميل على كل التفاصيل من الصفر: التصميم، التطوير، والإطلاق — مع
                تركيز على الأداء وتجربة المستخدم.
              </p>

              <h3 className="mt-10 text-lg font-bold text-accent">أهم ما يميز المشروع</h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {tags.map((t) => (
                  <li key={t} className="flex items-center gap-3 text-white/70">
                    <Icon name="check" className="h-4 w-4 shrink-0 text-accent" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <aside>
              <div className="admin-card p-6">
                <h3 className="text-sm font-semibold uppercase tracking-widest text-white/70">
                  التقنيات المستخدمة
                </h3>
                <ul className="mt-4 space-y-3">
                {tags.map((t) => (
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
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost mt-3 flex w-full items-center justify-center px-6 py-3.5 text-base"
                >
                  ابدأ مشروع مشابه
                </a>
              </div>
            </aside>
          </div>
        </section>

        {/* Strong WhatsApp CTA */}
        <section className="container-x pb-20">
          <div className="relative overflow-hidden rounded-3xl border border-accent/20 bg-gradient-to-br from-accent/10 to-transparent px-8 py-12 text-center">
            <h2 className="text-3xl font-extrabold tracking-tightest md:text-4xl">
              عجبك المشروع؟
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-white/55">
              خلينا نبني لك حاجة شبهها — أو أحسن. حكي لنا فكرتك وهنرد في أقرب وقت.
            </p>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-7 inline-flex px-8 py-3.5 text-base"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.8 14.12c-.24.68-1.4 1.32-1.92 1.36-.5.04-.96.24-3.25-.68-2.77-1.11-4.53-3.96-4.67-4.14-.13-.18-1.1-1.46-1.1-2.79 0-1.32.7-1.97.95-2.24.24-.27.53-.34.7-.34.18 0 .35 0 .5.01.16.01.38-.06.59.45.24.55.83 2.88 1.01 3.46.18.59.3.51.51.84.21.32.43.58.62.83.2.25.41.52.58.79.18.28.38.6.3.93-.07.33-.56 1.41-.76 1.9-.2.5-.41.43-.95.29-.54-.14-2.01-.74-3.83-2.36-.95-.81-1.7-1.83-1.96-2.41-.25-.58-.03-.9.0-.94.03-.04.23-.3.49-.56.26-.25.57-.58.8-.81.24-.24.5-.5.75-.75.24-.25.49-.52.46-.91-.03-.4-.85-2.05-.98-2.5-.13-.46-.27-.4-.55-.41z" />
              </svg>
              تواصل معانا على واتساب
            </a>
          </div>
        </section>

        {/* Prev / Next navigation */}
        <section className="container-x grid gap-4 pb-24 sm:grid-cols-2">
          <Link
            href={`/work/${prev.slug}`}
            className="card group flex items-center gap-4 rounded-2xl p-6"
          >
            <span className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition-all group-hover:border-accent/50 group-hover:text-accent sm:flex">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-4 w-4">
                <path d="M19 12H5m7-7-7 7 7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div>
              <div className="text-xs uppercase tracking-widest text-white/40">المشروع السابق</div>
              <div className="mt-1 text-xl font-bold text-accent">{prev.title}</div>
            </div>
          </Link>

          <Link
            href={`/work/${next.slug}`}
            className="card group flex items-center justify-between gap-4 rounded-2xl p-6 text-left"
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
