import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({
  src: [
    { path: "./fonts/Inter-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Inter-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Inter-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/Inter-700.woff2", weight: "700", style: "normal" },
    { path: "./fonts/Inter-800.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
});

const tajawal = localFont({
  src: [
    { path: "./fonts/Tajawal-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Tajawal-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Tajawal-700.woff2", weight: "700", style: "normal" },
    { path: "./fonts/Tajawal-800.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-tajawal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "B_20 — نبني مواقع تعيش طويلاً",
  description:
    "فريق B_20 لبناء المواقع والمنتجات الرقمية. نصمم ونبني تجارب رقمية سريعة، حديثة، وموثوقة. مبني بـ Next.js + Supabase + Vercel.",
  keywords: ["مواقع ويب", "تصميم مواقع", "تطوير مواقع", "B_20", "Next.js", "Supabase", "Vercel"],
  openGraph: {
    title: "B_20 — Web Studio",
    description: "فريق B_20 لبناء المواقع والمنتجات الرقمية.",
    type: "website",
    locale: "ar_SA",
  },
  twitter: {
    card: "summary_large_image",
    title: "B_20 — Web Studio",
    description: "فريق B_20 لبناء المواقع والمنتجات الرقمية.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={`${inter.variable} ${tajawal.variable}`}>
      <body className="bg-ink font-sans text-paper antialiased">{children}</body>
    </html>
  );
}
