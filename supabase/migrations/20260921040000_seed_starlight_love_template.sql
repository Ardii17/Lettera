-- =============================================================================
-- Seed template baru: Celestial Starlight Romance (Kategori Romansa)
-- =============================================================================
insert into public.templates (id, slug, name, description, category, is_active, sort_order)
values (
  '00000000-0000-4000-8000-000000000008',
  'starlight-love',
  'Celestial Starlight Romance',
  'Surat cinta langit malam bertabur bintang (dark celestial luxury) dengan rasi bintang kenangan, lentera cinta bercahaya, dan tiga janji semesta.',
  'Romansa',
  true,
  8
)
on conflict (slug) do update
set
  name = excluded.name,
  description = excluded.description,
  category = excluded.category,
  is_active = excluded.is_active,
  sort_order = excluded.sort_order,
  updated_at = now();
