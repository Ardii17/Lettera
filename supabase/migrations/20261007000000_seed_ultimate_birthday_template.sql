-- Seed the Ultimate Birthday template
insert into public.templates (
    id,
    slug,
    name,
    description,
    category,
    is_active,
    sort_order
) values (
    '00000000-0000-4000-8000-000000000041',
    'ultimate-birthday',
    'Ultimate Joyful Birthday',
    'Merayakan ulang tahun dengan penuh warna, keceriaan, dan animasi yang memukau. Dilengkapi dengan latar belakang animasi balon melayang, foto interaktif, statistik perjalanan usia, kue tiup lilin, dan memori tak terlupakan.',
    'Perayaan',
    true,
    41
)
on conflict (slug) do update
set
  name = excluded.name,
  description = excluded.description,
  category = excluded.category,
  is_active = excluded.is_active,
  sort_order = excluded.sort_order,
  updated_at = now();
