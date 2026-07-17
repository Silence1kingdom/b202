import Link from "next/link";
import { notFound } from "next/navigation";
import { getEntity } from "@/lib/entities";
import { adminList, adminDelete } from "@/lib/admin-actions";
import EntityRowActions from "@/components/admin/EntityRowActions";
import AddEntityButton from "@/components/admin/AddEntityButton";

export default async function EntityList({
  params,
}: {
  params: { entity: string };
}) {
  const entity = getEntity(params.entity);
  if (!entity) notFound();

  const rows = await adminList(params.entity);

  return (
    <div>
      <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link href="/admin" className="text-xs text-white/40 transition-colors hover:text-accent">
            ← لوحة التحكم
          </Link>
          <h1 className="mt-1.5 text-3xl font-extrabold tracking-tightest">{entity.label}</h1>
          <p className="mt-1 text-sm text-white/50">{rows.length} عنصر</p>
        </div>
        <AddEntityButton slug={entity.slug} singular={entity.singular} />
      </div>

      <div className="admin-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr>
              <th className="admin-th">{entity.titleField === "label" ? "القيمة" : "العنوان"}</th>
              {entity.subtitleField && <th className="admin-th">تفاصيل</th>}
              <th className="admin-th text-left">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={3} className="admin-td text-center text-white/40">
                  لا يوجد عناصر بعد.
                </td>
              </tr>
            )}
            {rows.map((row: any) => (
              <tr key={row.id} className="transition-colors hover:bg-white/[0.02]">
                <td className="admin-td font-medium">
                  <div className="flex items-center gap-3">
                    {entity.slug === "projects" && row.live_url && (
                      <img
                        src={`https://api.microlink.io/?url=${encodeURIComponent(
                          row.live_url
                        )}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=200&viewport.height=125&waitUntil=domcontentloaded`}
                        alt={row[entity.titleField]}
                        loading="lazy"
                        width={48}
                        height={30}
                        className="hidden h-9 w-14 rounded-md object-cover object-top ring-1 ring-white/10 sm:block"
                      />
                    )}
                    <span className="truncate">{row[entity.titleField]}</span>
                  </div>
                </td>
                {entity.subtitleField && (
                  <td className="admin-td text-white/50">{row[entity.subtitleField]}</td>
                )}
                <td className="admin-td text-left">
                  <EntityRowActions
                    slug={entity.slug}
                    id={String(row.id)}
                    onDelete={adminDelete}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
