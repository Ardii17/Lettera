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
  ),
  (
    '00000000-0000-4000-8000-000000000005',
    'wedding',
    'Royal Wedding Invitation',
    'Undangan pernikahan digital eksklusif dengan nama tamu dinamis via URL query parameter, hitung mundur, audio musik latar, dan amplop digital.',
    'Undangan',
    true,
    5
  ),
  (
    '00000000-0000-4000-8000-000000000006',
    'apology',
    'Sincere Apology & Reconciliation',
    'Surat permintaan maaf yang tulus dan mendalam dengan pengakuan jujur, komitmen perbaikan diri nyata, serta tombol rekonsiliasi ke WhatsApp pengirim.',
    'Permintaan Maaf',
    true,
    6
  ),
  (
    '00000000-0000-4000-8000-000000000007',
    'vintage-love',
    'Vintage Love Letter & Wax Seal',
    'Surat cinta klasik beramplop segel lilin 3D, cap stempel pos retro kota & tanggal kenangan, lembaran kertas perkamen hangat, foto kenangan, dan catatan rahasia tersembunyi.',
    'Romansa',
    true,
    7
  ),
  (
    '00000000-0000-4000-8000-000000000008',
    'starlight-love',
    'Celestial Starlight Romance',
    'Surat cinta langit malam bertabur bintang (dark celestial luxury) dengan rasi bintang kenangan, lentera cinta bercahaya, dan tiga janji semesta.',
    'Romansa',
    true,
    8
  ),
  (
    '00000000-0000-4000-8000-000000000009',
    'love-mixtape',
    'Retro Love Mixtape & Cassette',
    'Kaset pita cinta analog 90-an dengan roda pita berputar saat diputar, label stiker kaset personal, tracklist lagu kenangan, dan surat cinta di dalam sleeve kaset.',
    'Romansa',
    true,
    9
  ),
  (
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
