-- Storage Policies (Run this to fix the upload error)

-- 1. Insert into storage.buckets (if creating via SQL is needed, but better to do it in UI)
-- insert into storage.buckets (id, name, public) values ('project-files', 'project-files', true);

-- 2. Enable RLS on objects
-- alter table storage.objects enable row level security;

-- 3. Policy: Allow Public Read Access (for everyone)
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'project-files' );

-- 4. Policy: Allow Authenticated Uploads
create policy "Authenticated Uploads"
on storage.objects for insert
to authenticated
with check ( bucket_id = 'project-files' );

-- 5. Policy: Allow Authenticated Updates/Deletes (optional)
create policy "Authenticated Update"
on storage.objects for update
to authenticated
using ( bucket_id = 'project-files' );

create policy "Authenticated Delete"
on storage.objects for delete
to authenticated
using ( bucket_id = 'project-files' );
