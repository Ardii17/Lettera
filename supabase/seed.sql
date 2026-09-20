-- =============================================================================
-- Seed katalog template bawaan.
-- Slug harus sama dengan folder di src/templates (registry di kode).
-- Idempoten: aman dijalankan ulang.
-- =============================================================================
insert into public.templates (id, slug, name, description, category, is_active, sort_order)
values
  (
    '00000000-0000-4000-8000-000000000001',
    'romantic',
    'Romantic Letter',
    'Surat dengan tipografi serif lembut dan aksen segel lilin. Untuk kalimat yang sulit diucapkan langsung.',
    'Romansa',
    true,
    1
  ),
  (
    '00000000-0000-4000-8000-000000000002',
    'birthday',
    'Birthday Letter',
    'Kartu ulang tahun dengan angka usia besar, konfeti, dan warna yang cerah.',
    'Perayaan',
    true,
    2
  ),
  (
    '00000000-0000-4000-8000-000000000003',
    'graduation',
    'Graduation Letter',
    'Surat kelulusan bergaya sertifikat dengan bingkai emas di atas latar biru malam.',
    'Pencapaian',
    true,
    3
  ),
  (
    '00000000-0000-4000-8000-000000000004',
    'friendship',
    'Friendship Letter',
    'Surat pertemanan yang santai dengan selotip kertas dan kotak kenangan.',
    'Pertemanan',
    true,
    4
  )
on conflict (slug) do update
set
  name = excluded.name,
  description = excluded.description,
  category = excluded.category,
  is_active = excluded.is_active,
  sort_order = excluded.sort_order,
  updated_at = now();
