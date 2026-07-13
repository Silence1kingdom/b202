"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "./supabase/server";
import { getEntity } from "./entities";

async function requireAdmin() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  return supabase;
}

export async function adminList(slug: string): Promise<any[]> {
  const supabase = await requireAdmin();
  const entity = getEntity(slug);
  if (!entity) return [];
  const order = entity.orderBy || "created_at";
  const { data, error } = await supabase
    .from(entity.table)
    .select("*")
    .order(order, { ascending: false });
  if (error) return [];
  return data as any[];
}

export async function adminGet(slug: string, id: string): Promise<any | null> {
  const supabase = await requireAdmin();
  const entity = getEntity(slug);
  if (!entity) return null;
  const { data, error } = await supabase
    .from(entity.table)
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return data as any;
}

export async function adminSave(
  slug: string,
  formData: FormData
): Promise<{ error?: string }> {
  const supabase = await requireAdmin();
  const entity = getEntity(slug);
  if (!entity) return { error: "كيان غير معروف" };

  const id = String(formData.get("id") || "").trim();
  const row: Record<string, unknown> = {};

  for (const f of entity.fields) {
    const raw = formData.get(f.name);
    if (raw === null) {
      if (f.required) row[f.name] = "";
      continue;
    }
    if (f.type === "number") {
      row[f.name] = String(raw).trim() === "" ? null : Number(raw);
    } else if (f.type === "boolean") {
      row[f.name] = raw === "on" || raw === "true";
    } else if (f.type === "tags") {
      row[f.name] = String(raw)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    } else {
      row[f.name] = String(raw);
    }
  }

  let error;
  if (id) {
    error = (await supabase.from(entity.table).update(row).eq("id", id)).error;
  } else {
    error = (await supabase.from(entity.table).insert(row)).error;
  }
  if (error) return { error: error.message };
  redirect(`/admin/${slug}`);
}

export async function adminDelete(slug: string, id: string): Promise<void> {
  const supabase = await requireAdmin();
  const entity = getEntity(slug);
  if (!entity) return;
  await supabase.from(entity.table).delete().eq("id", id);
  redirect(`/admin/${slug}`);
}
