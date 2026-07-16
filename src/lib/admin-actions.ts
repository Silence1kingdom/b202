"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "./supabase/server";
import { createSupabaseAdminClient } from "./supabase/admin";
import { getEntity } from "./entities";
import { isAuthed } from "./auth";

async function requireAdmin() {
  if (!(await isAuthed())) redirect("/admin/login");
  return createSupabaseAdminClient() || createSupabaseServerClient();
}

export async function adminList(slug: string): Promise<any[]> {
  const supabase = await requireAdmin();
  const entity = getEntity(slug);
  if (!entity) return [];
  const order = entity.orderBy || "created_at";
  const ascending = order === "sort_order";
  const { data, error } = await supabase
    .from(entity.table)
    .select("*")
    .order(order, { ascending });
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
  revalidatePath(`/admin/${slug}`);
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/work");
  redirect(`/admin/${slug}`);
}

export async function adminDelete(slug: string, id: string): Promise<{ error?: string }> {
  const supabase = await requireAdmin();
  const entity = getEntity(slug);
  if (!entity) return { error: "كيان غير معروف" };

  const { error } = await supabase.from(entity.table).delete().eq("id", id);
  if (error) return { error: error.message };

  revalidatePath(`/admin/${slug}`);
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/work");
  return {};
}
