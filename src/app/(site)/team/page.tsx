import type { Metadata } from "next";
import Link from "next/link";
import { getTeam } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "الفريق — B_20",
  description:
    "تعرف على فريق B_20: الناس اللي بتصمم وتبني المواقع والمنتجات الرقمية بتاعتك.",
};

const FALLBACK_TEAM = [
  { name: "أحمد حمدي", role: "مؤسس وشريك تقني", avatar: "ح", bio: "أسس B_20 وبيقود الرؤية التقنية. خبرة في بناء منتجات ويب سريعة وموثوقة من الفكرة للإطلاق." },
  { name: "أحمد الجندي", role: "مصمم UI/UX", avatar: "ج", bio: "مصمم UI/UX بيحوّل الأفكار لتجارب بصرية نظيفة ومريحة، مهتم بالتفاصيل والحركة السلسة." },
  { name: "الشعراوي", role: "مطور واجهات", avatar: "ش", bio: "مطور واجهات بيبني الواجهات بأحدث التقنيات مع تركيز على الأداء وتجربة المستخدم." },
];

export default async function TeamPage() {
  const team = await getTeam();
  const members = team.length ? team : FALLBACK_TEAM;

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
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((m, i) => (
              <article
                key={m.name}
                className="group relative overflow-hidden rounded-3xl border border-white/[0.06] bg-white/[0.02] transition-all duration-500 hover:-translate-y-1 hover:border-accent/30"
              >
                {/* Cover gradient */}
                <div className="relative h-28 overflow-hidden bg-gradient-to-br from-accent/25 via-accent/5 to-transparent">
                  <div className="pointer-events-none absolute -right-8 -top-10 h-40 w-40 rounded-full bg-accent/15 blur-3xl" />
                  <div className="pointer-events-none absolute -bottom-12 left-10 h-32 w-32 rounded-full bg-success/10 blur-3xl" />
                </div>

                {/* Avatar overlapping */}
                <div className="flex justify-center">
                  <div className="-mt-12 flex h-24 w-24 items-center justify-center rounded-full border-4 border-ink bg-gradient-to-br from-accent/30 to-accent/5 text-3xl font-bold text-accent shadow-xl transition-transform duration-500 group-hover:scale-105">
                    {m.avatar}
                  </div>
                </div>

                <div className="px-6 pb-7 pt-4 text-center">
                  <h3 className="text-xl font-bold text-paper">{m.name}</h3>
                  <div className="mt-1 inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                    {m.role}
                  </div>
                  {m.bio && (
                    <p className="mt-4 text-sm leading-relaxed text-white/50">{m.bio}</p>
                  )}

                  <div className="mt-5 flex items-center justify-center gap-3">
                    <a
                      href="https://wa.me/201222239634"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="واتساب"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/55 transition-colors duration-300 hover:border-accent/50 hover:text-accent"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm5.8 14.12c-.24.68-1.4 1.32-1.92 1.36-.5.04-.96.24-3.25-.68-2.77-1.11-4.53-3.96-4.67-4.14-.13-.18-1.1-1.46-1.1-2.79 0-1.32.7-1.97.95-2.24.24-.27.53-.34.7-.34.18 0 .35 0 .5.01.16.01.38-.06.59.45.24.55.83 2.88 1.01 3.46.18.59.3.51.51.84.21.32.43.58.62.83.2.25.41.52.58.79.18.28.38.6.3.93-.07.33-.56 1.41-.76 1.9-.2.5-.41.43-.95.29-.54-.14-2.01-.74-3.83-2.36-.95-.81-1.7-1.83-1.96-2.41-.25-.58-.03-.9.0-.94.03-.04.23-.3.49-.56.26-.25.57-.58.8-.81.24-.24.5-.5.75-.75.24-.25.49-.52.46-.91-.03-.4-.85-2.05-.98-2.5-.13-.46-.27-.4-.55-.41z" />
                      </svg>
                    </a>
                    <a
                      href="#"
                      aria-label="بريد"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/55 transition-colors duration-300 hover:border-accent/50 hover:text-accent"
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
