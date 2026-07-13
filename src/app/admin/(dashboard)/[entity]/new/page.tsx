import { notFound } from "next/navigation";
import { getEntity } from "@/lib/entities";
import { adminSave } from "@/lib/admin-actions";
import EntityForm from "@/components/admin/EntityForm";

export default function EntityNew({
  params,
}: {
  params: { entity: string };
}) {
  const entity = getEntity(params.entity);
  if (!entity) notFound();

  const save = adminSave.bind(null, entity.slug);

  return (
    <div className="p-8">
      <h1 className="mb-6 text-2xl font-bold">
        إضافة {entity.singular} جديد
      </h1>
      <EntityForm entity={entity} initial={{}} action={save} />
    </div>
  );
}
