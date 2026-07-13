import { notFound } from "next/navigation";
import { getEntity } from "@/lib/entities";
import { adminSave, adminGet } from "@/lib/admin-actions";
import EntityForm from "@/components/admin/EntityForm";

export default async function EntityEdit({
  params,
}: {
  params: { entity: string; id: string };
}) {
  const entity = getEntity(params.entity);
  if (!entity) notFound();

  const row = await adminGet(params.entity, params.id);
  if (!row) notFound();

  const save = adminSave.bind(null, entity.slug);

  return (
    <div className="p-8">
      <h1 className="mb-6 text-2xl font-bold">تعديل {entity.singular}</h1>
      <EntityForm entity={entity} initial={row} action={save} />
    </div>
  );
}
