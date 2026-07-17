import Link from "next/link";
import { entities } from "@/lib/entities";
import { adminList } from "@/lib/admin-actions";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  const data = await Promise.all(
    entities.map(async (e) => {
      const rows = await adminList(e.slug);
      return { e, rows };
    })
  );

  const totalItems = data.reduce((sum, d) => sum + d.rows.length, 0);

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tightest">لوحة التحكم</h1>
          <p className="mt-1.5 text-sm text-white/50">
            إدارة محتوى موقع B_20 من مكان واحد.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="admin-card px-5 py-3 text-center">
            <div className="text-2xl font-bold text-accent">{entities.length}</div>
            <div className="text-xs text-white/40">أقسام</div>
          </div>
          <div className="admin-card px-5 py-3 text-center">
            <div className="text-2xl font-bold text-accent">{totalItems}</div>
            <div className="text-xs text-white/40">عنصر</div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.map(({ e, rows }) => (
          <Link
            key={e.slug}
            href={`/admin/${e.slug}`}
            className="admin-card group flex flex-col p-6 transition-all duration-300 hover:border-accent/40"
          >
            <div className="flex items-start justify-between">
              <div className="text-4xl font-extrabold text-accent">{rows.length}</div>
              <span className="text-white/30 transition-colors group-hover:text-accent">
                ←
              </span>
            </div>
            <div className="mt-3 text-sm font-medium text-white/70">{e.label}</div>
            <div className="mt-0.5 text-xs text-white/35">إدارة {e.label}</div>

            {rows.length > 0 && (
              <div className="mt-4 space-y-1.5 border-t border-white/[0.06] pt-4">
                {rows.slice(0, 3).map((r: any) => (
                  <div
                    key={r.id}
                    className="flex items-center gap-2 text-xs text-white/45"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent/50" />
                    <span className="truncate">{r[e.titleField]}</span>
                  </div>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
