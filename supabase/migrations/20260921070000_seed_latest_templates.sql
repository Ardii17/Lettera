-- =============================================================================
-- Seed 4 template baru:
-- 11. royal-garden-wedding
-- 12. art-exhibition
-- 13. neon-bash
-- 14. gala-award
-- =============================================================================
insert into public.templates (id, slug, name, description, category, is_active, sort_order)
values
  (
    '00000000-0000-4000-8000-000000000011',
    'royal-garden-wedding',
    'The Royal Botanical & Garden Wedding',
    'Undangan pernikahan botani kerajaan nan agung dengan wax seal monogram kustom, hitung mundur, audio musik latar, dan amplop digital.',
    'Undangan',
    true,
    11
  ),
  (
    '00000000-0000-4000-8000-000000000012',
    'art-exhibition',
    'Curatorial Art Exhibition & Vernissage',
    'Undangan eksibisi seni rupa & malam pembukaan vernissage privat bergaya avant-garde editorial modern.',
    'Undangan',
    true,
    12
  ),
  (
    '00000000-0000-4000-8000-000000000013',
    'neon-bash',
    'Retro Neon Cyber Wave Birthday Bash',
    'Undangan pesta ulang tahun bernuansa retro 80s arcade neon glow dengan countdown, dress code, dan musik latar.',
    'Perayaan',
    true,
    13
  ),
  (
    '00000000-0000-4000-8000-000000000014',
    'gala-award',
    'The Grand Horizon Awards & Charity Gala',
    'Undangan gala amal & malam penganugerahan prestisius dengan nuansa kemewahan obsidian gold, tiket VIP, dan donasi.',
    'Perayaan',
    true,
    14
  )
on conflict (slug) do update
set
  name = excluded.name,
  description = excluded.description,
  category = excluded.category,
  is_active = excluded.is_active,
  sort_order = excluded.sort_order,
  updated_at = now();
