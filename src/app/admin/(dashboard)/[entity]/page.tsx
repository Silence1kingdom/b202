import Link from "next/link";
import { notFound } from "next/navigation";
import { getEntity } from "@/lib/entities";
import { adminList, adminDelete } from "@/lib/admin-actions";

export default async function EntityList({
  params,
}: {
  params: { entity: string };
}) {
  const entity = getEntity(params.entity);
  if (!entity) notFound();

  const rows = await adminList(params.entity);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{entity.label}</h1>
          <p className="mt-1 text-sm text-white/50">{rows.length} عنصر</p>
        </div>
        <Link href={`/admin/${entity.slug}/new`} className="btn-primary px-5 py-2.5">
          + إضافة {entity.singular}
        </Link>
      </div>

      <div className="admin-card mt-6 overflow-hidden">
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
              <tr key={row.id}>
                <td className="admin-td">{row[entity.titleField]}</td>
                {entity.subtitleField && (
                  <td className="admin-td text-white/50">{row[entity.subtitleField]}</td>
                )}
                <td className="admin-td text-left">
                  <div className="flex justify-end gap-3">
                    <Link
                      href={`/admin/${entity.slug}/${row.id}`}
                      className="text-sm text-accent hover:opacity-80"
                    >
                      تعديل
                    </Link>
                    <form action={adminDelete.bind(null, entity.slug, row.id)}>
                      <button className="text-sm text-white/50 hover:text-accent">
                        حذف
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
