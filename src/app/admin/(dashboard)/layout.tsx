import Link from "next/link";
import { redirect } from "next/navigation";
import { logout } from "@/lib/auth-actions";
import { isAuthed } from "@/lib/auth";
import { entities } from "@/lib/entities";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAuthed())) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-ink text-paper">
      <aside className="fixed inset-y-0 right-0 w-64 border-l border-white/10 bg-white/[0.02] p-5">
        <Link href="/admin" className="block text-xl font-extrabold tracking-tightest">
          b202 <span className="text-accent">admin</span>
        </Link>
        <nav className="mt-8 space-y-1">
          <Link href="/admin" className="admin-link">
            لوحة التحكم
          </Link>
          {entities.map((e) => (
            <Link key={e.slug} href={`/admin/${e.slug}`} className="admin-link">
              {e.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-5 right-5 left-5">
          <form action={logout}>
            <button className="admin-link w-full text-right text-white/50 hover:text-accent">
              تسجيل الخروج
            </button>
          </form>
        </div>
      </aside>

      <div className="pr-64">{children}</div>
    </div>
  );
}
