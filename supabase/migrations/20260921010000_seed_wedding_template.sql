-- =============================================================================
-- Seed template baru: Royal Wedding Invitation (Kategori Undangan)
-- =============================================================================
insert into public.templates (id, slug, name, description, category, is_active, sort_order)
values (
  '00000000-0000-4000-8000-000000000005',
  'wedding',
  'Royal Wedding Invitation',
  'Undangan pernikahan digital eksklusif dengan nama tamu dinamis via URL query parameter, hitung mundur, audio musik latar, dan amplop digital.',
  'Undangan',
  true,
  5
)
on conflict (slug) do update
set
  name = excluded.name,
  description = excluded.description,
  category = excluded.category,
  is_active = excluded.is_active,
  sort_order = excluded.sort_order,
  updated_at = now();
