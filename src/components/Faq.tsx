"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "إيه الخدمات اللي بتقدموها؟",
    a: "بنصمم ونطور مواقع ويب كاملة — متاجر إلكترونية، منتجات SaaS، مواقع تعريفية، ومنصات تعليمية. وبنغطي كل حاجة من التصميم للبرمجة للإطلاق.",
  },
  {
    q: "بستخدموا إيه في التطوير؟",
    a: "بنبني بمزيج حديث: Next.js و React و TypeScript للواجهة، Tailwind للستايل، Supabase لقواعد البيانات، و Vercel للاستضافة والنشر التلقائي.",
  },
  {
    q: "الموقع بياخد وقت قد إيه؟",
    a: "المشروع البسيط من أسبوعين لـ ٤ أسابيع، والمشاريع الأكبر (متجر أو SaaS) من شهر لـ شهرين حسب التفاصيل والمحتوى.",
  },
  {
    q: "الأسعار بتتحسب إزاي؟",
    a: "بنحسب السعر حسب حجم المشروع والمميزات. ابعتلنا فكرتك من فورم التواصل وهنبعتلك عرض سعر واضح ومفصل بدون تكاليف مخفية.",
  },
  {
    q: "تضمنوا الأداء والسرعة؟",
    a: "أه، الأداء أولوية عندنا. كل المواقع بنبنيها محسّنة للسرعة (Core Web Vitals) وتتعرض كـ static حيث ما يُمكن، عشان تفتح أسرع عند الزوار.",
  },
  {
    q: "توفروا صيانة بعد الإطلاق؟",
    a: "أكيد. بعد الإطلاق بنقدر نوفر دعم وصيانة دورية — تحديثات، إضافات، وإصلاح أي مشكلة تظهر بسرعة.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl">
      <div className="space-y-3">
        {FAQS.map((item, i) => {
          const isOpen = open === i;
          return (
            <div
              key={item.q}
              className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] transition-colors duration-300 hover:border-white/15"
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-right"
              >
                <span className="text-base font-semibold text-paper">{item.q}</span>
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 text-accent transition-transform duration-300 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
                    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
              <div
                className="grid transition-all duration-300 ease-out"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-5 text-sm leading-relaxed text-white/55">{item.a}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
