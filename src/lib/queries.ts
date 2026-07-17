import { createSupabasePublicClient } from "./supabase/server";
import type {
  Project,
  Service,
  Testimonial,
  ProcessStep,
  Stat,
  Value,
  Member,
} from "./data";

async function getAll<T>(
  table: string,
  order: string,
  ascending = true
): Promise<T[]> {
  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .order(order, { ascending });
  if (error) {
    console.error(`[supabase] ${table}:`, error.message);
    return [];
  }
  return (data as T[]) || [];
}

export async function getProjects(): Promise<Project[]> {
  return getAll<Project>("projects", "created_at", false);
}
export async function getServices(): Promise<Service[]> {
  return getAll<Service>("services", "sort_order", true);
}
export async function getTestimonials(): Promise<Testimonial[]> {
  return getAll<Testimonial>("testimonials", "sort_order", true);
}
export async function getProcessSteps(): Promise<ProcessStep[]> {
  return getAll<ProcessStep>("process_steps", "sort_order", true);
}
export async function getStats(): Promise<Stat[]> {
  return getAll<Stat>("stats", "sort_order", true);
}
export async function getValues(): Promise<Value[]> {
  return getAll<Value>("values", "sort_order", true);
}
export async function getTeam(): Promise<Member[]> {
  return getAll<Member>("team", "sort_order", true);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const supabase = createSupabasePublicClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error) {
    console.error("[supabase] project:", error.message);
    return null;
  }
  return data as Project;
}
