"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

export default function EntityRowActions({
  slug,
  id,
  onDelete,
}: {
  slug: string;
  id: string;
  onDelete: (slug: string, id: string) => Promise<{ error?: string }>;
}) {
  const router = useRouter();
  const [isNavigating, startNavigate] = useTransition();
  const [isDeleting, startDelete] = useTransition();

  const handleDelete = () => {
    if (!confirm("متأكد إنك عايز تحذف العنصر ده؟")) return;
    startDelete(async () => {
      const res = await onDelete(slug, id);
      if (res?.error) {
        alert(`فشل الحذف: ${res.error}`);
        return;
      }
      router.refresh();
    });
  };

  return (
    <div className="flex justify-end gap-4">
      <button
        onClick={() => startNavigate(() => router.push(`/admin/${slug}/${id}`))}
        disabled={isNavigating}
        className="text-sm font-medium text-accent transition-opacity hover:opacity-80 disabled:opacity-50"
      >
        {isNavigating ? "..." : "تعديل"}
      </button>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="text-sm text-white/50 transition-colors hover:text-accent disabled:opacity-50"
      >
        {isDeleting ? "جاري الحذف..." : "حذف"}
      </button>
    </div>
  );
}
