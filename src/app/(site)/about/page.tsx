import type { Metadata } from "next";
import AboutContent from "@/components/AboutContent";
import Faq from "@/components/Faq";
import { getValues, getTeam, getStats } from "@/lib/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "من نحن — B_20",
  description:
    "تعرف على فريق B_20: قصتنا، قيمنا، وفريق العمل اللي بيبني مواقع تعيش طويلاً.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "من نحن — B_20",
    description: "تعرف على فريق B_20: قصتنا، قيمنا، وفريق العمل.",
    url: "/about",
  },
};

export default async function AboutPage() {
  const [values, team, stats] = await Promise.all([
    getValues(),
    getTeam(),
    getStats(),
  ]);
  return (
    <main className="page-enter pt-16 md:pt-20">
      <AboutContent values={values} team={team} stats={stats} />

      <section className="border-t border-white/[0.06] py-24 md:py-28">
        <div className="container-x">
          <div className="mb-12 text-center">
            <span className="section-label">أسئلة شائعة</span>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tightest md:text-4xl">
              عندك سؤال؟ <span className="text-accent">إحنا جاوبنا</span>
            </h2>
          </div>
          <Faq />
        </div>
      </section>
    </main>
  );
}
