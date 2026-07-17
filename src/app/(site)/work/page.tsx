import type { Metadata } from "next";
import Link from "next/link";
import WorkGallery from "@/components/WorkGallery";
import { getProjects } from "@/lib/queries";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "الأعمال — B_20",
  description:
    "معرض أعمال فريق B_20: متاجر إلكترونية، منتجات SaaS، مواقع تعريفية، ومنصات تعليمية.",
  alternates: { canonical: "/work" },
  openGraph: {
    title: "الأعمال — B_20",
    description: "معرض أعمال فريق B_20: متاجر إلكترونية، منتجات SaaS، مواقع تعريفية.",
    url: "/work",
  },
};

export default async function WorkPage() {
  const projects = await getProjects();
  return (
    <main className="page-enter pt-16 md:pt-20">
      <section className="border-t border-white/[0.06] pb-12 pt-16 md:pt-20">
        <div className="container-x">
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold tabular-nums text-accent">الأعمال</span>
            <span className="section-label">معرض الأعمال</span>
          </div>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tightest md:text-6xl">
            كل المشاريع <span className="text-accent">اللي بنيناه</span>
          </h1>
          <p className="mt-4 max-w-xl text-white/55">
            مشاريع حقيقية بنيناها لعملاء حقيقيين. فلتر حسب النوع، واضغط أي مشروع
            عشان تشوف تفاصيله وتزور الموقع.
          </p>
          <Link
            href="/about"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent transition-opacity hover:opacity-80"
          >
            تعرف علينا
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-4 w-4 -scale-x-100">
              <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x">
          <WorkGallery projects={projects} />
        </div>
      </section>
    </main>
  );
}
