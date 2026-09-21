-- =============================================================================
-- Seed template baru: Vintage Love Letter & Wax Seal (Kategori Romansa)
-- =============================================================================
insert into public.templates (id, slug, name, description, category, is_active, sort_order)
values (
  '00000000-0000-4000-8000-000000000007',
  'vintage-love',
  'Vintage Love Letter & Wax Seal',
  'Surat cinta klasik beramplop segel lilin 3D, cap stempel pos retro kota & tanggal kenangan, lembaran kertas perkamen hangat, foto kenangan, dan catatan rahasia tersembunyi.',
  'Romansa',
  true,
  7
)
on conflict (slug) do update
set
  name = excluded.name,
  description = excluded.description,
  category = excluded.category,
  is_active = excluded.is_active,
  sort_order = excluded.sort_order,
  updated_at = now();
