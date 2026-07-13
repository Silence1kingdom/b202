-- ============================================================
-- b202 — Database schema for the admin-managed portfolio
-- Run this in: Supabase Dashboard → SQL Editor → Run
-- ============================================================

-- ---------- Tables ----------

create table if not exists public.projects (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  title       text not null,
  category    text not null default '',
  year        text not null default '',
  desc        text not null default '',
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
  desc        text not null default '',
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
  desc        text not null default '',
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
  desc        text not null default '',
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

-- Public (anon) can read all public content
create policy "public read projects" on public.projects
  for select using (true);
create policy "public read services" on public.services
  for select using (true);
create policy "public read testimonials" on public.testimonials
  for select using (true);
create policy "public read process_steps" on public.process_steps
  for select using (true);
create policy "public read stats" on public.stats
  for select using (true);
create policy "public read values" on public.values
  for select using (true);
create policy "public read team" on public.team
  for select using (true);

-- Public (anon) can submit leads via the contact form
create policy "public insert leads" on public.leads
  for insert with check (true);

-- Authenticated users (the admin) get full access to everything
create policy "admin all projects" on public.projects
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin all services" on public.services
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin all testimonials" on public.testimonials
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin all process_steps" on public.process_steps
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin all stats" on public.stats
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin all values" on public.values
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin all team" on public.team
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin all leads" on public.leads
  for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
