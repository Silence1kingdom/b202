-- ============================================================
-- b202 setup: schema + seed
-- Run this WHOLE file in Supabase -> SQL Editor -> Run
-- Safe to run more than once.
-- ============================================================

-- ---------- Tables ----------
create table if not exists public.projects (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  title       text not null,
  category    text not null default '',
  year        text not null default '',
  description text not null default '',
  tags        text[] not null default '{}',
  tone        text not null default 'from-zinc-600 to-zinc-900',
  live_url    text not null default '',
  featured    boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table if not exists public.services (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  description text not null default '',
  icon        text not null default '',
  sort_order  int not null default 0,
  created_at  timestamptz not null default now()
);

create table if not exists public.testimonials (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  role        text not null default '',
  text        text not null default '',
  avatar      text not null default '',
  rating      int not null default 5,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now()
);

create table if not exists public.process_steps (
  id          uuid primary key default gen_random_uuid(),
  step        text not null default '',
  icon        text not null default '',
  title       text not null,
  description text not null default '',
  sort_order  int not null default 0,
  created_at  timestamptz not null default now()
);

create table if not exists public.stats (
  id          uuid primary key default gen_random_uuid(),
  value       int not null default 0,
  suffix      text not null default '',
  label       text not null default '',
  sort_order  int not null default 0,
  created_at  timestamptz not null default now()
);

create table if not exists public.values (
  id          uuid primary key default gen_random_uuid(),
  icon        text not null default '',
  title       text not null,
  description text not null default '',
  sort_order  int not null default 0,
  created_at  timestamptz not null default now()
);

create table if not exists public.team (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  role        text not null default '',
  avatar      text not null default '',
  sort_order  int not null default 0,
  created_at  timestamptz not null default now()
);

create table if not exists public.leads (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text not null,
  budget      text not null default '',
  message     text not null default '',
  read        boolean not null default false,
  created_at  timestamptz not null default now()
);

-- ---------- updated_at trigger ----------
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_projects_updated on public.projects;
create trigger trg_projects_updated before update on public.projects
  for each row execute function public.set_updated_at();

-- ---------- Row Level Security ----------
alter table public.projects      enable row level security;
alter table public.services      enable row level security;
alter table public.testimonials  enable row level security;
alter table public.process_steps enable row level security;
alter table public.stats         enable row level security;
alter table public.values        enable row level security;
alter table public.team          enable row level security;
alter table public.leads         enable row level security;

drop policy if exists "public read projects" on public.projects;
create policy "public read projects" on public.projects for select using (true);
drop policy if exists "public read services" on public.services;
create policy "public read services" on public.services for select using (true);
drop policy if exists "public read testimonials" on public.testimonials;
create policy "public read testimonials" on public.testimonials for select using (true);
drop policy if exists "public read process_steps" on public.process_steps;
create policy "public read process_steps" on public.process_steps for select using (true);
drop policy if exists "public read stats" on public.stats;
create policy "public read stats" on public.stats for select using (true);
drop policy if exists "public read values" on public.values;
create policy "public read values" on public.values for select using (true);
drop policy if exists "public read team" on public.team;
create policy "public read team" on public.team for select using (true);
drop policy if exists "public insert leads" on public.leads;
create policy "public insert leads" on public.leads for insert with check (true);

drop policy if exists "admin all projects" on public.projects;
create policy "admin all projects" on public.projects for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
drop policy if exists "admin all services" on public.services;
create policy "admin all services" on public.services for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
drop policy if exists "admin all testimonials" on public.testimonials;
create policy "admin all testimonials" on public.testimonials for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
drop policy if exists "admin all process_steps" on public.process_steps;
create policy "admin all process_steps" on public.process_steps for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
drop policy if exists "admin all stats" on public.stats;
create policy "admin all stats" on public.stats for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
drop policy if exists "admin all values" on public.values;
create policy "admin all values" on public.values for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
drop policy if exists "admin all team" on public.team;
create policy "admin all team" on public.team for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
drop policy if exists "admin all leads" on public.leads;
create policy "admin all leads" on public.leads for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- ---------- Seed data ----------
delete from public.projects;
delete from public.services;
delete from public.stats;
delete from public.process_steps;
delete from public.testimonials;
delete from public.values;
delete from public.team;

insert into public.projects (slug, title, category, year, description, tags, tone) values
('nova-store', 'Nova Store', 'متجر إلكتروني', '2025', 'منصة تجارة إلكترونية كاملة مع دفع آمن ولوحة تحكم وتحليلات مبيعات.', '{Next.js,Stripe,Supabase}', 'from-zinc-600 to-zinc-900'),
('folio-ai', 'Folio AI', 'منتج SaaS', '2025', 'أداة توليد محتوى بالذكاء الاصطناعي مع لوحة تحليلات وتتبع استخدام.', '{React,OpenAI,Tailwind}', 'from-zinc-500 to-zinc-800'),
('zohour-restaurant', 'مطعم زهور', 'موقع تعريفي', '2024', 'موقع عربي أنيق لعرض القائمة والحجوزات مع خريطة تفاعلية.', '{Next.js,i18n,CMS}', 'from-zinc-700 to-zinc-900'),
('eduplus', 'EduPlus', 'منصة تعليمية', '2024', 'منصة دورات تفاعلية مع فيديو واختبارات وشهادات إتمام.', '{Next.js,Supabase,Stripe}', 'from-zinc-600 to-zinc-900');

insert into public.services (title, description, icon, sort_order) values
('مواقع سريعة', 'مواقع محسنة للأداء بدرجة 100 على Lighthouse. السرعة تعني مبيعات أكثر.', 'bolt', 1),
('تصميم مخصص', 'هوية بصرية وتصميم يعبر عن براندك فعلياً ويكسب من أول نظرة.', 'palette', 2),
('متاجر إلكترونية', 'تجارة إلكترونية جاهزة للبيع من أول يوم مع دفع آمن.', 'cart', 3),
('تكامل ذكاء اصطناعي', 'أضف ميزات الذكاء الاصطناعي لموقعك أو منتجك بسهولة وسرعة.', 'sparkles', 4),
('تحسين محركات البحث', 'SEO سليم يوصلك لعملاء أكثر بدون إنفاق على إعلانات.', 'chart', 5),
('صيانة ودعم', 'دعم مستمر وتحديثات آمنة بعد الإطلاق على مدار الساعة.', 'wrench', 6);

insert into public.stats (value, suffix, label, sort_order) values
(50, '+', 'مشروع منجز', 1),
(100, '%', 'رضا العملاء', 2),
(3, 'x', 'أسرع من المتوسط', 3),
(24, '/7', 'دعم ومتابعة', 4);

insert into public.process_steps (step, icon, title, description, sort_order) values
('01', 'idea', 'الفكرة', 'نسمعك ونفهم هدفك وجمهورك المستهدف بالتفصيل.', 1),
('02', 'pen', 'التصميم', 'نصمم واجهة تخطف الأنظار وتجربة مستخدم مريحة.', 2),
('03', 'code', 'التطوير', 'نبني بأحدث التقنيات والمعايير مع اختبارات جودة.', 3),
('04', 'rocket', 'الإطلاق', 'نرفع الموقع على Vercel وجاهز للعالم في دقائق.', 4);

insert into public.testimonials (name, role, text, avatar, rating, sort_order) values
('أحمد', 'صاحب متجر إلكتروني', 'فريق b202 بنا لي متجري في أسبوع بس. المبيعات زادت 3x من أول شهر!', 'أ', 5, 1),
('سارة', 'مؤسسة SaaS', 'التصميم احترافي والكود نظيف. أحسن استثمار عملته لمشروعي.', 'س', 5, 2),
('محمد', 'مدير تسويق', 'السرعة والجودة ما لقيتهم في أي فريق تاني. أنصح فيهم بقوة.', 'م', 5, 3);

insert into public.values (icon, title, description, sort_order) values
('check', 'جودة بلا تنازل', 'كود نظيف وتصميم مدروس، لأن التفاصيل هي اللي بتفرق فعلياً.', 1),
('bolt', 'سرعة وأداء', 'مواقع سريعة بدرجة 100 على Lighthouse — السرعة تعني مبيعات أكثر.', 2),
('send', 'شفافية تامة', 'بنوضح لك كل خطوة وكل تكلفة من غير مفاجآت أو لف ودوران.', 3),
('wrench', 'دعم مستمر', 'بنفضل معاك بعد الإطلاق بصيانة وتحديثات آمنة على مدار الساعة.', 4);

insert into public.team (name, role, avatar, sort_order) values
('عمر', 'مؤسس وشريك تقني', 'ع', 1),
('ليلى', 'مصممة UI/UX', 'ل', 2),
('يوسف', 'مطور واجهات', 'ي', 3),
('نور', 'مديرة مشاريع', 'ن', 4);
