export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "tags"
  | "boolean"
  | "select";

export interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  options?: string[];
  required?: boolean;
  placeholder?: string;
}

export interface EntityDef {
  slug: string;
  label: string;
  singular: string;
  table: string;
  titleField: string;
  subtitleField?: string;
  orderBy?: string;
  fields: FieldDef[];
}

export const entities: EntityDef[] = [
  {
    slug: "projects",
    label: "المشاريع",
    singular: "مشروع",
    table: "projects",
    titleField: "title",
    subtitleField: "category",
    orderBy: "created_at",
    fields: [
      { name: "title", label: "العنوان", type: "text", required: true },
      { name: "slug", label: "الرابط (slug)", type: "text", required: true, placeholder: "nova-store" },
      { name: "category", label: "التصنيف", type: "text", placeholder: "متجر إلكتروني" },
      { name: "year", label: "السنة", type: "text", placeholder: "2025" },
      { name: "description", label: "الوصف", type: "textarea" },
      { name: "tags", label: "التقنيات (مفصولة بفاصلة)", type: "tags", placeholder: "Next.js, Stripe" },
      { name: "tone", label: "تدرج اللون", type: "text", placeholder: "from-zinc-600 to-zinc-900" },
      { name: "live_url", label: "رابط المشروع", type: "text", placeholder: "https://..." },
      { name: "featured", label: "مشروع مميز", type: "boolean" },
    ],
  },
  {
    slug: "services",
    label: "الخدمات",
    singular: "خدمة",
    table: "services",
    titleField: "title",
    orderBy: "sort_order",
    fields: [
      { name: "title", label: "العنوان", type: "text", required: true },
      { name: "description", label: "الوصف", type: "textarea" },
      { name: "icon", label: "الأيقونة", type: "text", placeholder: "bolt" },
      { name: "sort_order", label: "الترتيب", type: "number" },
    ],
  },
  {
    slug: "testimonials",
    label: "آراء العملاء",
    singular: "رأي",
    table: "testimonials",
    titleField: "name",
    subtitleField: "role",
    orderBy: "sort_order",
    fields: [
      { name: "name", label: "الاسم", type: "text", required: true },
      { name: "role", label: "الوظيفة", type: "text", placeholder: "صاحب متجر إلكتروني" },
      { name: "text", label: "الرأي", type: "textarea" },
      { name: "avatar", label: "حرف الصورة", type: "text", placeholder: "أ" },
      { name: "rating", label: "التقييم (1-5)", type: "number" },
      { name: "sort_order", label: "الترتيب", type: "number" },
    ],
  },
  {
    slug: "process_steps",
    label: "خطوات العمل",
    singular: "خطوة",
    table: "process_steps",
    titleField: "title",
    subtitleField: "step",
    orderBy: "sort_order",
    fields: [
      { name: "step", label: "الرقم", type: "text", placeholder: "01" },
      { name: "title", label: "العنوان", type: "text", required: true },
      { name: "description", label: "الوصف", type: "textarea" },
      { name: "icon", label: "الأيقونة", type: "text", placeholder: "idea" },
      { name: "sort_order", label: "الترتيب", type: "number" },
    ],
  },
  {
    slug: "stats",
    label: "الإحصائيات",
    singular: "إحصائية",
    table: "stats",
    titleField: "label",
    orderBy: "sort_order",
    fields: [
      { name: "value", label: "الرقم", type: "number" },
      { name: "suffix", label: "اللاحقة", type: "text", placeholder: "+" },
      { name: "label", label: "الوصف", type: "text", required: true },
      { name: "sort_order", label: "الترتيب", type: "number" },
    ],
  },
  {
    slug: "values",
    label: "قيمنا",
    singular: "قيمة",
    table: "values",
    titleField: "title",
    orderBy: "sort_order",
    fields: [
      { name: "title", label: "العنوان", type: "text", required: true },
      { name: "description", label: "الوصف", type: "textarea" },
      { name: "icon", label: "الأيقونة", type: "text", placeholder: "check" },
      { name: "sort_order", label: "الترتيب", type: "number" },
    ],
  },
  {
    slug: "team",
    label: "الفريق",
    singular: "عضو",
    table: "team",
    titleField: "name",
    subtitleField: "role",
    orderBy: "sort_order",
    fields: [
      { name: "name", label: "الاسم", type: "text", required: true },
      { name: "role", label: "الوظيفة", type: "text", placeholder: "مؤسس وشريك تقني" },
      { name: "bio", label: "نبذة قصيرة", type: "textarea", placeholder: "خبرة في..." },
      { name: "avatar", label: "حرف الصورة", type: "text", placeholder: "ع" },
      { name: "sort_order", label: "الترتيب", type: "number" },
    ],
  },
  {
    slug: "leads",
    label: "رسائل التواصل",
    singular: "رسالة",
    table: "leads",
    titleField: "name",
    subtitleField: "email",
    orderBy: "created_at",
    fields: [
      { name: "name", label: "الاسم", type: "text", required: true },
      { name: "email", label: "البريد الإلكتروني", type: "text" },
      { name: "budget", label: "الميزانية", type: "text" },
      { name: "message", label: "الرسالة", type: "textarea" },
      { name: "read", label: "مقروءة", type: "boolean" },
    ],
  },
];

export function getEntity(slug: string): EntityDef | undefined {
  return entities.find((e) => e.slug === slug);
}
