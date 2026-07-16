import Link from "next/link";
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
    <div className="mx-auto max-w-2xl">
      <Link
        href={`/admin/${entity.slug}`}
        className="text-xs text-white/40 transition-colors hover:text-accent"
      >
        ← {entity.label}
      </Link>
      <h1 className="mb-6 mt-1.5 text-3xl font-extrabold tracking-tightest">
        تعديل {entity.singular}
      </h1>
      <EntityForm entity={entity} initial={row} action={save} />
    </div>
  );
}
