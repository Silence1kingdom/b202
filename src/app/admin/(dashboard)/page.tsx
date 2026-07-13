import Link from "next/link";
import { entities } from "@/lib/entities";
import { adminList } from "@/lib/admin-actions";

export default async function Dashboard() {
  const counts = await Promise.all(
    entities.map(async (e) => ({ e, count: (await adminList(e.slug)).length }))
  );

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">لوحة التحكم</h1>
      <p className="mt-1 text-sm text-white/50">إدارة محتوى الموقع من مكان واحد.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {counts.map(({ e, count }) => (
          <Link
            key={e.slug}
            href={`/admin/${e.slug}`}
            className="admin-card p-6 transition-colors hover:border-accent/40"
          >
            <div className="text-3xl font-extrabold text-accent">{count}</div>
            <div className="mt-2 text-white/70">{e.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
