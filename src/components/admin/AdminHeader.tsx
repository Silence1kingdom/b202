import Link from "next/link";
import { logout } from "@/lib/auth-actions";

export default function AdminHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-ink/80 px-6 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/15 bg-white text-sm font-black text-ink">
          b
        </span>
        <div className="leading-tight">
          <div className="text-sm font-bold text-paper">لوحة تحكم B_20</div>
          <div className="text-[0.65rem] text-white/40">إدارة محتوى الموقع</div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Link
          href="/"
          target="_blank"
          className="hidden items-center gap-1.5 rounded-xl border border-white/10 px-3.5 py-2 text-xs font-medium text-white/60 transition-all duration-300 hover:border-accent/40 hover:text-accent sm:flex"
        >
          زيارة الموقع
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-3.5 w-3.5">
            <path d="M14 4h6v6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20 4 10 14" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <form action={logout}>
          <button className="flex items-center gap-1.5 rounded-xl border border-white/10 px-3.5 py-2 text-xs font-medium text-white/60 transition-all duration-300 hover:border-accent/40 hover:text-accent">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-3.5 w-3.5">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M16 17l5-5-5-5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M21 12H9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            تسجيل الخروج
          </button>
        </form>
      </div>
    </header>
  );
}
