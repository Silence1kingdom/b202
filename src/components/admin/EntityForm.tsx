"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(() => action(formData));
  };

  return (
    <form action={handleSubmit} className="admin-card space-y-5 p-6">
      <input type="hidden" name="id" value={initial.id || ""} />

      {entity.fields.map((f) => (
        <div key={f.name}>
          <label className="mb-1.5 block text-sm text-white/60">
            {f.label}
            {f.required && <span className="text-accent"> *</span>}
          </label>

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

          {f.placeholder && f.type !== "boolean" && (
            <p className="mt-1 text-xs text-white/30">مثال: {f.placeholder}</p>
          )}
        </div>
      ))}

      <div className="flex items-center gap-3 pt-2">
        <button type="submit" disabled={isPending} className="btn-primary px-6 py-3 disabled:opacity-70">
          {isPending ? (
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              جاري الحفظ...
            </span>
          ) : (
            "حفظ"
          )}
        </button>
        <button
          type="button"
          onClick={() => router.push(`/admin/${entity.slug}`)}
          disabled={isPending}
          className="btn-ghost px-6 py-3 disabled:opacity-70"
        >
          إلغاء
        </button>
      </div>
    </form>
  );
}
