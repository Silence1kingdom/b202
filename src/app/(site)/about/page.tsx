import type { Metadata } from "next";
import AboutContent from "@/components/AboutContent";
import { getValues, getTeam, getStats } from "@/lib/queries";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "من نحن — b202",
  description:
    "تعرف على فريق b202: قصتنا، قيمنا، وفريق العمل اللي بيبني مواقع تعيش طويلاً.",
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
    </main>
  );
}
