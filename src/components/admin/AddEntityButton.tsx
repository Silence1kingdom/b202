"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

export default function AddEntityButton({
  slug,
  singular,
}: {
  slug: string;
  singular: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => router.push(`/admin/${slug}/new`))}
      disabled={isPending}
      className="btn-primary px-5 py-2.5 disabled:opacity-70"
    >
      {isPending ? (
        <span className="flex items-center gap-2">
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          جاري الفتح...
        </span>
      ) : (
        `+ إضافة ${singular}`
      )}
    </button>
  );
}
