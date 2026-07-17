import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/icons";
import { getTeam } from "@/lib/queries";

type MemberLinkType = {
  label: string;
  href: string;
  icon: "whatsapp" | "email" | "twitter" | "linkedin" | "github" | "globe";
};

const LINK_STYLES: Record<MemberLinkType["icon"], { cls: string; icon: string }> = {
  whatsapp: { cls: "hover:border-success/50 hover:text-success", icon: "whatsapp" },
  email: { cls: "hover:border-electric/50 hover:text-electric", icon: "send" },
  twitter: { cls: "hover:border-electric/50 hover:text-electric", icon: "twitter" },
  linkedin: { cls: "hover:border-electric/50 hover:text-electric", icon: "external" },
  github: { cls: "hover:border-white/50 hover:text-paper", icon: "github" },
  globe: { cls: "hover:border-accent/50 hover:text-accent", icon: "globe" },
};

function MemberLink({ link }: { link: MemberLinkType }) {
  const cfg = LINK_STYLES[link.icon] ?? LINK_STYLES.globe;
  const external = !link.href.startsWith("mailto:");
  return (
    <a
      href={link.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={link.label}
      title={link.label}
      className={`flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/55 transition-colors duration-300 ${cfg.cls}`}
    >
      <Icon name={cfg.icon as any} className="h-4 w-4" />
    </a>
  );
}

export const revalidate = 60;

export const metadata: Metadata = {
  title: "الفريق — B_20",
  description:
    "تعرف على فريق B_20: الناس اللي بتصمم وتبني المواقع والمنتجات الرقمية بتاعتك.",
};

const FALLBACK_TEAM = [
  {
    name: "أحمد حمدي",
    role: "مؤسس وشريك تقني",
    avatar: "ح",
    bio: "أسس B_20 وبيقود الرؤية التقنية. خبرة في بناء منتجات ويب سريعة وموثوقة من الفكرة للإطلاق.",
    skills: ["Next.js", "Architecture", "DevOps"],
    tone: "from-accent/40 to-accent/10",
    links: [
      { label: "واتساب", href: "https://wa.me/201222239634", icon: "whatsapp" as const },
      { label: "تويتر", href: "https://twitter.com/b202", icon: "twitter" as const },
      { label: "لينكدإن", href: "https://linkedin.com/company/b202", icon: "linkedin" as const },
    ],
  },
  {
    name: "أحمد الجندي",
    role: "مصمم UI/UX",
    avatar: "ج",
    bio: "مصمم UI/UX بيحوّل الأفكار لتجارب بصرية نظيفة ومريحة، مهتم بالتفاصيل والحركة السلسة.",
    skills: ["Figma", "Design Systems", "Motion"],
    tone: "from-electric/40 to-electric/10",
    links: [
      { label: "واتساب", href: "https://wa.me/201222239634", icon: "whatsapp" as const },
      { label: "بريد", href: "mailto:design@b202.dev", icon: "email" as const },
      { label: "لينكدإن", href: "https://linkedin.com/company/b202", icon: "linkedin" as const },
    ],
  },
  {
    name: "الشعراوي",
    role: "مطور واجهات",
    avatar: "ش",
    bio: "مطور واجهات بيبني الواجهات بأحدث التقنيات مع تركيز على الأداء وتجربة المستخدم.",
    skills: ["React", "Tailwind", "Performance"],
    tone: "from-success/40 to-success/10",
    links: [
      { label: "واتساب", href: "https://wa.me/201222239634", icon: "whatsapp" as const },
      { label: "جيتهب", href: "https://github.com/b202", icon: "github" as const },
    ],
  },
];

export default async function TeamPage() {
  const team = await getTeam();
  const members = (team.length ? team : FALLBACK_TEAM) as typeof FALLBACK_TEAM;

  return (
    <main className="page-enter pt-16 md:pt-20">
      <section className="border-t border-white/[0.06] pb-12 pt-16 md:pt-20">
        <div className="container-x">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold tabular-nums text-accent">الفريق</span>
              <span className="section-label">من نحن</span>
            </div>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tightest md:text-6xl">
              الناس اللي <span className="text-accent">ورا الشغل</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-white/55">
              فريق صغير من المصممين والمطورين بنحب الشغل الصح. كل واحد فينا بيكمل
              التاني عشان نوصّل منتج رقمي سريع، حديث، وموثوق.
            </p>
            <Link
              href="/work"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent transition-opacity hover:opacity-80"
            >
              شوف أعمالنا
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-4 w-4 -scale-x-100">
                <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-x">
          <div className="mb-12 flex items-end justify-between gap-4">
            <div>
              <span className="section-label">أعضاء الفريق</span>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tightest md:text-4xl">
                {members.length} شخص بيبنوا معاك
              </h2>
            </div>
            <span className="hidden text-sm text-white/40 sm:block">نبدأ من فكرة… نوصّل لمنتج.</span>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((m, i) => {
              const tone = m.tone ?? "from-accent/25 via-accent/5 to-transparent";
              const links =
                m.links && m.links.length
                  ? m.links
                  : [
                      { label: "واتساب", href: "https://wa.me/201222239634", icon: "whatsapp" as const },
                    ];
              return (
                <article
                  key={m.name}
                  className="spotlight group relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/5"
                  style={{ animation: `fadeUp 0.7s cubic-bezier(0.23,1,0.32,1) ${i * 110}ms both` }}
                >
                  {/* Cover gradient */}
                  <div className={`relative h-28 overflow-hidden bg-gradient-to-br ${tone}`}>
                    <div className="pointer-events-none absolute -right-8 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
                    <div className="pointer-events-none absolute -bottom-12 left-10 h-32 w-32 rounded-full bg-success/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>

                  {/* Avatar overlapping with gradient ring */}
                  <div className="flex justify-center">
                    <div className={`-mt-12 relative flex h-24 w-24 items-center justify-center rounded-full border-4 border-ink bg-gradient-to-br ${tone} text-3xl font-bold text-paper shadow-xl transition-transform duration-500 group-hover:scale-105`}>
                      <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
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

                    {/* Skills — always visible (mobile-friendly) */}
                    {m.skills && m.skills.length > 0 && (
                      <div className="mt-4 flex flex-wrap justify-center gap-2">
                        {m.skills.map((s) => (
                          <span
                            key={s}
                            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[0.7rem] text-white/60"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-auto flex items-center justify-center gap-3 pt-5">
                      {links.map((l) => (
                        <MemberLink key={l.label} link={l} />
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-24 pt-4">
        <div className="container-x">
          <div className="rounded-3xl bg-gradient-to-br from-accent/10 to-transparent px-8 py-12 text-center">
            <h2 className="text-3xl font-extrabold tracking-tightest md:text-4xl">جاهز تبدأ مشروعك؟</h2>
            <p className="mt-3 text-white/55">حكي لنا عن فكرتك وهنرد عليك في أقرب وقت.</p>
            <Link href="/#contact" className="btn-primary mt-7 px-8 py-3.5 text-base">
              ابدأ مشروعك الآن
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
