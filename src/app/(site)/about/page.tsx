import type { Metadata } from "next";
import AboutContent from "@/components/AboutContent";
import { getValues, getTeam, getStats } from "@/lib/queries";

export const revalidate = 60;

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
    </main>
  );
}
