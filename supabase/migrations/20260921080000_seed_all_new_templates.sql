-- =============================================================================
-- Seed semua template baru yang belum terdaftar di tabel database.
-- Total 18 template baru (sort_order 15-32).
-- Idempoten: aman dijalankan ulang.
-- =============================================================================
insert into public.templates (id, slug, name, description, category, is_active, sort_order)
values
  -- ===================== ROMANSA & CINTA =====================
  (
    '00000000-0000-4000-8000-000000000015',
    'museum-of-us',
    'The Museum of Us: Love Exhibition',
    'Surat cinta bertema pameran museum seni kontemporer dengan ruang-ruang galeri kenangan, plakat dinding, dan arsip digital kasih.',
    'Romansa',
    true,
    15
  ),
  (
    '00000000-0000-4000-8000-000000000016',
    'secret-herbarium',
    'The Secret Herbarium of Love',
    'Surat cinta bertema herbarium rahasia dengan spesimen bunga kering, jurnal botani kasih, dan klasifikasi ilmiah perasaan.',
    'Romansa',
    true,
    16
  ),
  (
    '00000000-0000-4000-8000-000000000017',
    'parfum-damour',
    'Parfum d''Amour: Fragrance Letter',
    'Surat cinta mewah bertema maison parfum haute couture Prancis dengan piramida aroma, sertifikat olfaktori, dan botol kristal.',
    'Surat Romantis',
    true,
    17
  ),
  (
    '00000000-0000-4000-8000-000000000018',
    'ex-libris',
    'Ex Libris Amoris: The Love Library',
    'Surat cinta bertema perpustakaan tua dan manuskrip kuno dengan katalog buku kenangan, stempel ex libris, dan surat rahasia di antara halaman.',
    'Surat Romantis',
    true,
    18
  ),
  (
    '00000000-0000-4000-8000-000000000019',
    'tourbillon-love',
    'Le Grand Tourbillon d''Amour',
    'Surat cinta mewah bertema mahakarya horologi Tourbillon Swiss dengan mekanisme waktu presisi, komplikasi jam tangan haute horlogerie, dan janji abadi.',
    'Surat Romantis',
    true,
    19
  ),
  (
    '00000000-0000-4000-8000-000000000020',
    'cartography-love',
    'Cartographie d''Amour: Love Atlas',
    'Surat cinta bertema peta dan kartografi antik dengan atlas perjalanan cinta, kompas navigasi hati, dan koordinat kenangan sakral.',
    'Surat Romantis',
    true,
    20
  ),
  (
    '00000000-0000-4000-8000-000000000021',
    'symphony-love',
    'La Symphonie Éternelle',
    'Surat cinta mewah bertema naskah partitur musik klasik maestro abad ke-19 dengan 4 babak gerakan simfoni cinta interaktif, 4 instrumen harmoni jiwa, dan akor kadensa penutup.',
    'Surat Romantis',
    true,
    21
  ),
  (
    '00000000-0000-4000-8000-000000000022',
    'haute-joaillerie',
    'L''Écrin Éternel: Haute Joaillerie d''Amour',
    'Surat cinta mewah bertema mahakarya pandai perhiasan dan batu permata kerajaan Place Vendôme Paris dengan sertifikat gemologi 4Cs, tab 4 permata asmara, dan laci rahasia cincin ikrar.',
    'Surat Romantis',
    true,
    22
  ),

  -- ===================== PERAYAAN / ULANG TAHUN =====================
  (
    '00000000-0000-4000-8000-000000000023',
    'birthday-gazette',
    'The Birthday Gazette & Morning Post',
    'Ucapan ulang tahun bertema koran pagi vintage dengan headline berita, kolom editorial kenangan, dan rubrik tahun ini.',
    'Perayaan',
    true,
    23
  ),
  (
    '00000000-0000-4000-8000-000000000024',
    'celestial-birthday',
    'Celestial Birthday: Cosmic Celebration',
    'Ucapan ulang tahun bertema kosmis dan astronomi dengan peta bintang personal, zodiak, dan pesan dari galaksi.',
    'Perayaan',
    true,
    24
  ),
  (
    '00000000-0000-4000-8000-000000000025',
    'birthday-passport',
    'Birthday Passport & World Adventure',
    'Ucapan ulang tahun bertema paspor perjalanan dunia dengan visa stempel kenangan, boarding pass petualangan, dan peta destinasi impian.',
    'Perayaan',
    true,
    25
  ),
  (
    '00000000-0000-4000-8000-000000000026',
    'birthday-cinema',
    'Birthday Cinema: Award Night Gala',
    'Ucapan ulang tahun bertema malam penghargaan bioskop dengan nominasi, piala emas, dan skenario film kehidupan.',
    'Perayaan',
    true,
    26
  ),
  (
    '00000000-0000-4000-8000-000000000027',
    'birthday-festival',
    'Birthday Festival: Music & Art',
    'Ucapan ulang tahun bertema festival musik dan seni dengan lineup artis, tiket VIP, dan peta area festival.',
    'Perayaan',
    true,
    27
  ),

  -- ===================== PENCAPAIAN / KELULUSAN =====================
  (
    '00000000-0000-4000-8000-000000000028',
    'grand-laureate',
    'The Grand Laureate Ceremony',
    'Surat penghargaan prestisius bertema upacara penganugerahan gelar kehormatan dengan medali emas, pidato, dan prosesi akademik megah.',
    'Pencapaian',
    true,
    28
  ),
  (
    '00000000-0000-4000-8000-000000000029',
    'summit-achievement',
    'Summit Achievement: Peak of Excellence',
    'Surat pencapaian bertema pendakian puncak gunung dengan basecamp perjalanan, milestone ketinggian, dan bendera kemenangan di puncak.',
    'Pencapaian',
    true,
    29
  ),

  -- ===================== UNDANGAN / PERNIKAHAN =====================
  (
    '00000000-0000-4000-8000-000000000030',
    'heritage-wedding',
    'Heritage & Cultural Wedding',
    'Undangan pernikahan bertema warisan budaya dan tradisi dengan ornamen batik, ukiran kayu, dan kearifan lokal Nusantara.',
    'Undangan',
    true,
    30
  ),
  (
    '00000000-0000-4000-8000-000000000031',
    'amalfi-wedding',
    'Amalfi Coast Mediterranean Wedding',
    'Undangan pernikahan bertema pantai Mediterania Amalfi Coast Italia dengan lemon grove, keramik Vietri, dan villa tebing laut.',
    'Undangan',
    true,
    31
  ),
  (
    '00000000-0000-4000-8000-000000000032',
    'chateau-wedding',
    'Château de Versailles: Mariage Royal',
    'Undangan pernikahan megah bergaya Istana Kerajaan Prancis Baroque dengan ornamen ukiran emas Rococo, segel wangsa kehormatan, dan 6 bagian arsitektural paviliun istana.',
    'Undangan',
    true,
    32
  ),

  -- ===================== PERMINTAAN MAAF =====================
  (
    '00000000-0000-4000-8000-000000000033',
    'kintsugi-repair',
    'Kintsugi Repair: Golden Mending',
    'Surat permintaan maaf bertema seni Kintsugi Jepang dengan filosofi memperbaiki retakan dengan emas, merangkul ketidaksempurnaan, dan janji perbaikan.',
    'Permintaan Maaf',
    true,
    33
  ),
  (
    '00000000-0000-4000-8000-000000000034',
    'safe-harbor',
    'Safe Harbor: Lighthouse of Hope',
    'Surat permintaan maaf bertema mercusuar pelabuhan aman dengan navigasi kembali ke rumah, peta rekonsiliasi, dan cahaya harapan.',
    'Permintaan Maaf',
    true,
    34
  ),
  (
    '00000000-0000-4000-8000-000000000035',
    'solstice-thaw',
    'Solstice Thaw: Winter to Spring',
    'Surat permintaan maaf bertema perubahan musim dari salju dingin menuju hangatnya musim semi dengan es yang mencair dan bunga yang mekar.',
    'Permintaan Maaf',
    true,
    35
  ),

  -- ===================== PERTEMANAN & SAHABAT =====================
  (
    '00000000-0000-4000-8000-000000000036',
    'campfire-friendship',
    'Campfire Chronicles: Friendship Haven',
    'Jurnal perkemahan hangat di bawah bintang dengan api unggun, jemuran polaroid, kamus lelucon rahasia, dan piagam persahabatan abadi.',
    'Pertemanan',
    true,
    36
  ),
  (
    '00000000-0000-4000-8000-000000000037',
    'bistro-friendship',
    'Bistro des Amis: Late-Night Café',
    'Kedai bistro hangat tengah malam dengan meja sudut kenangan, menu racikan tawa, piringan vinyl, serbet bersurat, dan bon kasir tak ternilai.',
    'Pertemanan',
    true,
    37
  ),
  (
    '00000000-0000-4000-8000-000000000038',
    'roadtrip-friendship',
    'The Great Roadtrip: Highway of Soulmates',
    'Petualangan perjalanan darat melintasi jalan tol tak berujung dengan dashboard mobil retro, rambu kilometer, laci glovebox, dan tiket tol emas.',
    'Pertemanan',
    true,
    38
  ),
  (
    '00000000-0000-4000-8000-000000000039',
    'treehouse-friendship',
    'The Secret Treehouse: Eternal Youth',
    'Markas rahasia rumah pohon di atas dahan rimbun dengan lentera malam, toples kunang-kunang, ukiran dahan kayu, dan kapsul waktu persahabatan.',
    'Pertemanan',
    true,
    39
  )
on conflict (slug) do update
set
  name = excluded.name,
  description = excluded.description,
  category = excluded.category,
  is_active = excluded.is_active,
  sort_order = excluded.sort_order,
  updated_at = now();
