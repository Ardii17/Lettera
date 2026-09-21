-- =============================================================================
-- Seed template baru: Retro Love Mixtape & Cassette (Kategori Romansa)
-- =============================================================================
insert into public.templates (id, slug, name, description, category, is_active, sort_order)
values (
  '00000000-0000-4000-8000-000000000009',
  'love-mixtape',
  'Retro Love Mixtape & Cassette',
  'Kaset pita cinta analog 90-an dengan roda pita berputar saat diputar, label stiker kaset personal, tracklist lagu kenangan, dan surat cinta di dalam sleeve kaset.',
  'Romansa',
  true,
  9
)
on conflict (slug) do update
set
  name = excluded.name,
  description = excluded.description,
  category = excluded.category,
  is_active = excluded.is_active,
  sort_order = excluded.sort_order,
  updated_at = now();
