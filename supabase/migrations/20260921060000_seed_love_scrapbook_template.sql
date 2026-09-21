-- =============================================================================
-- Seed template baru: Photobooth Love Scrapbook (Kategori Romansa)
-- =============================================================================
insert into public.templates (id, slug, name, description, category, is_active, sort_order)
values (
  '00000000-0000-4000-8000-000000000010',
  'love-scrapbook',
  'Photobooth Love Scrapbook',
  'Buku jurnal scrapbook cinta dengan strip foto photobooth 4-cut vertikal ala Life4Cuts, washi tape pastel, memo sticky notes hal favorit, dan surat tulisan tangan.',
  'Romansa',
  true,
  10
)
on conflict (slug) do update
set
  name = excluded.name,
  description = excluded.description,
  category = excluded.category,
  is_active = excluded.is_active,
  sort_order = excluded.sort_order,
  updated_at = now();
