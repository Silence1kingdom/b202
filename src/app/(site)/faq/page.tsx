import type { Metadata } from "next";
import Link from "next/link";
import Faq from "@/components/Faq";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "الأسئلة الشائعة — B_20",
  description:
    "إجابات على أشهر الأسئلة عن خدمات B_20: التصميم، التطوير، المدة، الأسعار، والأداء.",
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "الأسئلة الشائعة — B_20",
    description: "إجابات على أشهر الأسئلة عن خدمات وباقات B_20.",
    url: "/faq",
  },
};

export default function FaqPage() {
  return (
    <main className="page-enter pt-16 md:pt-20">
      <section className="border-t border-white/[0.06] py-16 md:py-20">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex items-center justify-center gap-3">
              <span className="text-sm font-bold tabular-nums text-accent">الأسئلة</span>
              <span className="section-label">شائعة</span>
            </div>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tightest md:text-6xl">
              عندك سؤال؟ <span className="text-accent">إحنا جاوبنا</span>
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-white/55">
              مجموعة من أشهر الأسئلة عن شغلنا والخطوات والأسعار. لو لسه عندك سؤال،
              تواصل معانا على الواتساب.
            </p>
          </div>

          <div className="mt-14">
            <Faq />
          </div>

          <div className="mt-16 text-center">
            <Link href="/#contact" className="btn-primary px-8 py-3.5 text-base">
              اسألنا عن مشروعك
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
