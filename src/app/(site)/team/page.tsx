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
  { name: "أحمد حمدي", role: "مؤسس وشريك تقني", avatar: "ح" },
  { name: "أحمد الجندي", role: "مصمم UI/UX", avatar: "ج" },
  { name: "الشعراوي", role: "مطور واجهات", avatar: "ش" },
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
              <div
                key={m.name}
                className="card reveal group flex items-center gap-5 rounded-2xl p-7"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-white/15 bg-gradient-to-br from-accent/20 to-accent/5 text-xl font-bold text-accent transition-transform duration-300 group-hover:scale-105">
                  {m.avatar}
                  <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-ink bg-emerald-400" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-paper">{m.name}</div>
                  <div className="mt-0.5 text-sm text-white/45">{m.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 pt-4">
        <div className="container-x">
          <div className="card reveal rounded-3xl px-8 py-12 text-center">
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
