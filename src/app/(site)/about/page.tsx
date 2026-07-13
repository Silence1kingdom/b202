import type { Metadata } from "next";
import AboutContent from "@/components/AboutContent";

export const metadata: Metadata = {
  title: "من نحن — b202",
  description:
    "تعرف على فريق b202: قصتنا، قيمنا، وفريق العمل اللي بيبني مواقع تعيش طويلاً.",
};

export default function AboutPage() {
  return (
    <main className="page-enter pt-16 md:pt-20">
      <AboutContent />
    </main>
  );
}
