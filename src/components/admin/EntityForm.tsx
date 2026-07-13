"use client";

import type { EntityDef } from "@/lib/entities";

function initialValue(initial: Record<string, any>, name: string): string {
  const v = initial[name];
  if (v === null || v === undefined) return "";
  if (Array.isArray(v)) return v.join(", ");
  if (typeof v === "boolean") return v ? "on" : "";
  return String(v);
}

export default function EntityForm({
  entity,
  initial,
  action,
}: {
  entity: EntityDef;
  initial: Record<string, any>;
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="admin-card space-y-5 p-6">
      <input type="hidden" name="id" value={initial.id || ""} />

      {entity.fields.map((f) => (
        <div key={f.name}>
          <label className="mb-1.5 block text-sm text-white/60">{f.label}</label>

          {f.type === "textarea" ? (
            <textarea
              name={f.name}
              defaultValue={initialValue(initial, f.name)}
              placeholder={f.placeholder}
              rows={4}
              className="admin-textarea"
            />
          ) : f.type === "boolean" ? (
            <input
              type="checkbox"
              name={f.name}
              defaultChecked={initial[f.name] === true}
              className="h-5 w-5 accent-[var(--accent)]"
            />
          ) : f.type === "number" ? (
            <input
              type="number"
              name={f.name}
              defaultValue={initialValue(initial, f.name)}
              placeholder={f.placeholder}
              required={f.required}
              className="admin-input"
            />
          ) : (
            <input
              type="text"
              name={f.name}
              defaultValue={initialValue(initial, f.name)}
              placeholder={f.placeholder}
              required={f.required}
              className="admin-input"
            />
          )}
        </div>
      ))}

      <div className="flex gap-3 pt-2">
        <button type="submit" className="btn-primary px-6 py-3">
          حفظ
        </button>
      </div>
    </form>
  );
}
