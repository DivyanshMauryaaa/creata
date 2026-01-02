-- Run this in your Supabase SQL Editor

-- 1. Create Assets Table
create table if not exists project_assets (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references projects(id) on delete cascade not null,
  name text not null,
  type text not null check (type in ('video', 'audio', 'image', 'text')),
  url text not null,
  duration float default 0,
  metadata jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Create Tracks Table
create table if not exists project_tracks (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references projects(id) on delete cascade not null,
  name text not null,
  type text not null check (type in ('video', 'audio', 'text')),
  "order" integer not null default 0,
  is_muted boolean default false,
  is_locked boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Create Clips Table
create table if not exists project_clips (
  id uuid default uuid_generate_v4() primary key,
  track_id uuid references project_tracks(id) on delete cascade not null,
  asset_id uuid references project_assets(id) on delete set null,
  name text,
  start_time float not null,
  duration float not null,
  "offset" float default 0,
  properties jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Enable Row Level Security (RLS)
-- Optional: If you want to restrict access to own projects
alter table project_assets enable row level security;
alter table project_tracks enable row level security;
alter table project_clips enable row level security;

-- Simple policy: allow everything for authenticated users for now (or implement complex Logic)
-- For rapid dev, you might just want this:
create policy "Enable all for authenticated" on project_assets for all using (auth.role() = 'authenticated');
create policy "Enable all for authenticated" on project_tracks for all using (auth.role() = 'authenticated');
create policy "Enable all for authenticated" on project_clips for all using (auth.role() = 'authenticated');

-- IMPORTANT: You also need to create a Storage Bucket named 'project-files'
-- Go to Storage -> New Bucket -> Name: 'project-files' -> Public: true (or handle signed URLs)
