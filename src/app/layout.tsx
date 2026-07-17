import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
  metadataBase: new URL("https://b202.vercel.app"),
  title: {
    default: "B_20 — نبني مواقع تعيش طويلاً",
    template: "%s — B_20",
  },
  description:
    "فريق B_20 لبناء المواقع والمنتجات الرقمية. نصمم ونبني تجارب رقمية سريعة، حديثة، وموثوقة. مبني بـ Next.js + Supabase + Vercel.",
  keywords: ["مواقع ويب", "تصميم مواقع", "تطوير مواقع", "B_20", "Next.js", "Supabase", "Vercel", "استوديو رقمي"],
  authors: [{ name: "B_20" }],
  creator: "B_20",
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: "https://b202.vercel.app",
    siteName: "B_20",
    title: "B_20 — Web Studio",
    description: "فريق B_20 لبناء المواقع والمنتجات الرقمية. نصمم ونبني تجارب رقمية سريعة وحديثة وموثوقة.",
  },
  twitter: {
    card: "summary_large_image",
    title: "B_20 — Web Studio",
    description: "فريق B_20 لبناء المواقع والمنتجات الرقمية.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "B_20",
  url: "https://b202.vercel.app",
  description:
    "فريق B_20 لبناء المواقع والمنتجات الرقمية. نصمم ونبني تجارب رقمية سريعة وحديثة وموثوقة.",
  sameAs: ["https://wa.me/201222239634"],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+201222239634",
    contactType: "sales",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={`${inter.variable} ${tajawal.variable}`}>
      <body className="bg-ink font-sans text-paper antialiased">
        <a href="#main" className="skip-link">تخطّي لل content</a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
