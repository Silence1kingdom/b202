import Link from "next/link";
import { redirect } from "next/navigation";
import { logout } from "@/lib/auth-actions";
import { isAuthed } from "@/lib/auth";
import { entities } from "@/lib/entities";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminFooter from "@/components/admin/AdminFooter";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAuthed())) redirect("/admin/login");

  return (
    <div className="flex min-h-screen bg-ink text-paper">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 right-0 z-40 flex w-64 flex-col border-l border-white/10 bg-white/[0.02] p-5">
        <Link href="/admin" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-base font-black text-ink">
            b
          </span>
          <span className="text-lg font-extrabold tracking-tightest">
            b202 <span className="text-accent">admin</span>
          </span>
        </Link>

        <nav className="mt-8 flex-1 space-y-1">
          <Link
            href="/admin"
            className="admin-link flex items-center gap-2.5"
          >
            <span className="text-accent">◧</span>
            لوحة التحكم
          </Link>
          <div className="px-3 pb-1 pt-4 text-[0.65rem] uppercase tracking-widest text-white/30">
            المحتوى
          </div>
          {entities.map((e) => (
            <Link key={e.slug} href={`/admin/${e.slug}`} className="admin-link flex items-center gap-2.5">
              <span className="text-white/40">•</span>
              {e.label}
            </Link>
          ))}
        </nav>

        <form action={logout}>
          <button className="admin-link mt-2 w-full text-right text-white/50 hover:text-accent">
            تسجيل الخروج
          </button>
        </form>
      </aside>

      {/* Main */}
      <div className="flex min-h-screen flex-1 flex-col pr-64">
        <AdminHeader />
        <main className="flex-1 px-6 py-8">{children}</main>
        <AdminFooter />
      </div>
    </div>
  );
}
