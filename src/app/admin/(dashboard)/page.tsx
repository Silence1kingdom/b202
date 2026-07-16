import Link from "next/link";
import { entities } from "@/lib/entities";
import { adminList } from "@/lib/admin-actions";

export default async function Dashboard() {
  const counts = await Promise.all(
    entities.map(async (e) => ({ e, count: (await adminList(e.slug)).length }))
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tightest">لوحة التحكم</h1>
        <p className="mt-1.5 text-sm text-white/50">
          إدارة محتوى موقع B_20 من مكان واحد.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {counts.map(({ e, count }) => (
          <Link
            key={e.slug}
            href={`/admin/${e.slug}`}
            className="admin-card group p-6 transition-all duration-300 hover:border-accent/40"
          >
            <div className="flex items-start justify-between">
              <div className="text-4xl font-extrabold text-accent">{count}</div>
              <span className="text-white/30 transition-colors group-hover:text-accent">
                ←
              </span>
            </div>
            <div className="mt-3 text-sm font-medium text-white/70">{e.label}</div>
            <div className="mt-0.5 text-xs text-white/35">إدارة {e.label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
