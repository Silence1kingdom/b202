import Link from "next/link";

export const metadata = {
  title: "404 — الصفحة مش موجودة | B_20",
};

export default function NotFound() {
  return (
    <main className="page-enter flex min-h-[100dvh] flex-col items-center justify-center px-6 pt-20 text-center">
      <span className="text-sm font-bold tabular-nums text-accent">خطأ</span>
      <h1 className="mt-4 text-7xl font-extrabold tracking-tightest md:text-9xl">404</h1>
      <p className="mt-4 max-w-md text-white/55">
        الصفحة اللي بتدور عليها مش موجودة أو اتنقلت. تعالى نرجعك للصفحة الرئيسية.
      </p>
      <Link href="/" className="btn-primary mt-8 px-8 py-3.5 text-base">
        الرجوع للرئيسية
      </Link>
    </main>
  );
}
