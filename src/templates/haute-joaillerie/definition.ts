import type { TemplateMeta } from "../types";

export const hauteJoaillerieTemplate: TemplateMeta = {
  slug: "haute-joaillerie",
  name: "L'Écrin Éternel",
  category: "Surat Romantis",
  description:
    "Surat cinta mewah bertema mahakarya pandai perhiasan dan batu permata kerajaan Place Vendôme Paris (Haute Joaillerie & Royal Gemology). Menampilkan kotak beludru safir berornamen emas murni, bingkai potret sang muse bertatahkan berlian (Diamond Halo Gilded Frame), sertifikat resmi gemologi asmara 4Cs of Love (Cut, Clarity, Color, Carat), tab interaktif 4 batu mulia fase perjalanan cinta (Zamrud Harapan, Safir Kesetiaan, Mirah Delima Pengorbanan, dan Intan Abadi), bingkai liontin emas filigree kenangan berdua, telemetri kemurnian logam mulia dan skala kekerasan Mohs 10/10, tombol interaktif pembuka laci rahasia kotak beludru yang memancarkan kilau emas dan mengungkap cincin ikrar berukir rahasia, serta alunan melodi harpa klasik Paris yang menyejukkan jiwa.",
  tagline: "L'Écrin Éternel: Menempa Setiap Detik Cinta Menjadi Permata Abadi Tanpa Cacat",
  cardAccent: "border-amber-500/40 bg-gradient-to-br from-[#0a1128] via-[#101b3d] to-[#060b1a] text-amber-200",
  highlights: [
    "Konsep Mahakarya Pandai Emas & Permata Kerajaan Place Vendôme Paris",
    "Kotak Beludru Safir Mewah dengan Bingkai Potret Intan Sang Muse (Diamond Halo Frame)",
    "Sertifikat Gemologi Resmi Asmara (The 4Cs: Cut, Clarity, Color, Carat, & Symmetry)",
    "Tab Interaktif 4 Permata Kisah Asmara (Zamrud Kolombia, Safir Ceylon, Mirah Delima, & Intan Abadi)",
    "Bingkai Liontin Filigree Emas 18K & Galeri Meja Kerja Sang Pandai Emas",
    "Interaksi Buka Laci Rahasia Kotak Beludru (Secret Velvet Drawer) & Ukiran Sakral Cincin",
  ],
  fields: [
    // Section 1: Kotak Beludru Utama & Potret Intan Sang Muse
    {
      name: "jewelTitle",
      label: "Tajuk Mahakarya Perhiasan",
      type: "text",
      placeholder: "LE SOLITAIRE D'ÉTERNITÉ N°07",
      defaultValue: "LE SOLITAIRE D'ÉTERNITÉ N°07",
      section: "Kotak Beludru & Potret Sang Muse",
    },
    {
      name: "maisonName",
      label: "Rumah Perhiasan / Asal Mahakarya",
      type: "text",
      placeholder: "MAISON DE HAUTE JOAILLERIE • PLACE VENDÔME, PARIS",
      defaultValue: "MAISON DE HAUTE JOAILLERIE • PLACE VENDÔME, PARIS",
      section: "Kotak Beludru & Potret Sang Muse",
    },
    {
      name: "caratGrade",
      label: "Spesifikasi Permata Utama",
      type: "text",
      placeholder: "8.88 CARATS • D-FLAWLESS ROYAL SOLITAIRE",
      defaultValue: "8.88 CARATS • D-FLAWLESS ROYAL SOLITAIRE",
      section: "Kotak Beludru & Potret Sang Muse",
    },
    {
      name: "recipientName",
      label: "Nama Sang Muse Pujaan Jiwa (Penerima)",
      type: "text",
      placeholder: "Lady Aurelia de Montmirail",
      required: true,
      isRecipient: true,
      section: "Kotak Beludru & Potret Sang Muse",
    },
    {
      name: "senderName",
      label: "Nama Sang Pandai Emas / Kekasih (Pengirim)",
      type: "text",
      placeholder: "Henri de Valois",
      required: true,
      section: "Kotak Beludru & Potret Sang Muse",
    },
    {
      name: "anniversaryDate",
      label: "Tanggal Penempaan & Perayaan Kasih",
      type: "text",
      placeholder: "21 Septembre 2026",
      defaultValue: "21 Septembre 2026",
      section: "Kotak Beludru & Potret Sang Muse",
    },
    {
      name: "openingDedication",
      label: "Dedikasi Puitis Pembuka Kotak Perhiasan",
      type: "textarea",
      placeholder: "Tuliskan dedikasi pembuka saat kotak beludru diserahkan...",
      defaultValue:
        "Bagi jiwaku yang paling murni: di hadapan semesta yang fana, kupersembahkan kotak beludru ini bukan sekadar sebagai wadah batu mulia, melainkan tempat bersemayamnya seluruh detak kagumku padamu sejak detik pertama kita bersitatap.",
      section: "Kotak Beludru & Potret Sang Muse",
    },
    {
      name: "museJewelPhotoUrl",
      label: "Foto Potret Sang Muse (Bingkai Intan Oval)",
      type: "image",
      placeholder: "Unggah foto potret sang pujaan yang memancarkan keanggunan...",
      section: "Kotak Beludru & Potret Sang Muse",
    },
    {
      name: "musePhotoCaption",
      label: "Keterangan Foto Potret Sang Muse",
      type: "text",
      placeholder: "Potret Sang Muse Berbalut Kilau Tiara & Permata Keabadian",
      defaultValue: "Potret Sang Muse Berbalut Kilau Tiara & Permata Keabadian",
      section: "Kotak Beludru & Potret Sang Muse",
    },
    {
      name: "primaryColor",
      label: "Warna Beludru Utama Kotak Perhiasan",
      type: "color",
      defaultValue: "#0a1128",
      section: "Kotak Beludru & Potret Sang Muse",
    },
    {
      name: "accentColor",
      label: "Warna Aksen Emas & Tatahan Permata",
      type: "color",
      defaultValue: "#d4af37",
      section: "Kotak Beludru & Potret Sang Muse",
    },

    // Section 2: Sertifikat Gemologi Asmara (The 4Cs of Love)
    {
      name: "certificateNo",
      label: "Nomor Registrasi Sertifikat Gemologi",
      type: "text",
      placeholder: "GIA-VENDOME-889922-AMOUR",
      defaultValue: "GIA-VENDOME-889922-AMOUR",
      section: "Sertifikat Gemologi 4Cs",
    },
    {
      name: "cutGrade",
      label: "1. Cut (Potongan & Proporsi Faset)",
      type: "text",
      placeholder: "Cœur Brillant Parfait (Potongan Hati Nirwana)",
      defaultValue: "Cœur Brillant Parfait (Potongan Hati Nirwana)",
      section: "Sertifikat Gemologi 4Cs",
    },
    {
      name: "cutDescription",
      label: "Deskripsi Puitis Nilai Cut",
      type: "textarea",
      placeholder: "Tafsir asmara atas faset dan pantulan cahaya...",
      defaultValue:
        "Tiap sudut faset 58 segi memantulkan kembali seluruh cahaya tatapan matamu menjadi ribuan spektrum pelangi di dadaku, tanpa ada setitik pun sinar yang terbuang sia-sia.",
      section: "Sertifikat Gemologi 4Cs",
    },
    {
      name: "clarityGrade",
      label: "2. Clarity (Kejernihan & Nilai Inklusi)",
      type: "text",
      placeholder: "Internally Flawless (IF - Kemurnian Nir-Cacat)",
      defaultValue: "Internally Flawless (IF - Kemurnian Nir-Cacat)",
      section: "Sertifikat Gemologi 4Cs",
    },
    {
      name: "clarityDescription",
      label: "Deskripsi Puitis Nilai Clarity",
      type: "textarea",
      placeholder: "Tafsir asmara atas kejernihan nurani...",
      defaultValue:
        "Diperiksa di bawah mikroskop ketulusan 100x pembesaran waktu, tak ditemukan sebutir inklusi keraguan ataupun bayang-bayang kepalsuan dalam sumpah setiaku padamu.",
      section: "Sertifikat Gemologi 4Cs",
    },
    {
      name: "colorGrade",
      label: "3. Color (Derajat Kemurnian Warna)",
      type: "text",
      placeholder: "Grade D - Absolute Pure White Soul",
      defaultValue: "Grade D - Absolute Pure White Soul",
      section: "Sertifikat Gemologi 4Cs",
    },
    {
      name: "colorDescription",
      label: "Deskripsi Puitis Nilai Color",
      type: "textarea",
      placeholder: "Tafsir asmara atas warna jiwa...",
      defaultValue:
        "Tingkat kemurnian tertinggi di mana tiada prasangka duniawi yang mampu menodai warna putih salju ketulusan jiwamu.",
      section: "Sertifikat Gemologi 4Cs",
    },
    {
      name: "caratWeight",
      label: "4. Carat (Bobot & Gravitasi Kasih)",
      type: "text",
      placeholder: "Poids Infini (∞ Carats - Tak Terhingga)",
      defaultValue: "Poids Infini (∞ Carats - Tak Terhingga)",
      section: "Sertifikat Gemologi 4Cs",
    },
    {
      name: "caratDescription",
      label: "Deskripsi Puitis Nilai Carat",
      type: "textarea",
      placeholder: "Tafsir asmara atas bobot rasa...",
      defaultValue:
        "Bobot cinta yang melampaui timbangan neraca gravitasi semesta, mengikat dua jiwa dalam medan magnet kerinduan yang tak akan pernah pudar.",
      section: "Sertifikat Gemologi 4Cs",
    },
    {
      name: "fluorescenceGrade",
      label: "Fluoresensi & Simetri Optik",
      type: "text",
      placeholder: "Strong Blue Luminescence under Midnight Sky • Excellent Symmetry",
      defaultValue: "Strong Blue Luminescence under Midnight Sky • Excellent Symmetry",
      section: "Sertifikat Gemologi 4Cs",
    },

    // Section 3: 4 Permata Kisah Asmara Interaktif (Les 4 Gemmes)
    {
      name: "gem1Name",
      label: "Permata 1: Nama & Makna Simbolis",
      type: "text",
      placeholder: "Émeraude de Colombie (Zamrud Harapan & Pertemuan Awal)",
      defaultValue: "Émeraude de Colombie (Zamrud Harapan & Pertemuan Awal)",
      section: "4 Permata Kisah Asmara",
    },
    {
      name: "gem1ColorHex",
      label: "Permata 1: Kode Warna Faset",
      type: "text",
      placeholder: "#059669",
      defaultValue: "#059669",
      section: "4 Permata Kisah Asmara",
    },
    {
      name: "gem1Period",
      label: "Permata 1: Periode Jejak Kisah",
      type: "text",
      placeholder: "Musim Semi 2022 • Hari Pertama Mata Saling Bersitatap",
      defaultValue: "Musim Semi 2022 • Hari Pertama Mata Saling Bersitatap",
      section: "4 Permata Kisah Asmara",
    },
    {
      name: "gem1Poem",
      label: "Permata 1: Bait Puitis Zamrud",
      type: "textarea",
      placeholder: "Bait puitis untuk permata pertama...",
      defaultValue:
        "Hijau zamrud di taman Tuileries tak sebanding dengan segarnya binar matamu saat pertama kali menyapaku. Di sanalah benih cinta pertama bertunas, tenang dan penuh pengharapan.",
      section: "4 Permata Kisah Asmara",
    },

    {
      name: "gem2Name",
      label: "Permata 2: Nama & Makna Simbolis",
      type: "text",
      placeholder: "Saphir Royal de Ceylan (Safir Keteduhan & Kesetiaan Hening)",
      defaultValue: "Saphir Royal de Ceylan (Safir Keteduhan & Kesetiaan Hening)",
      section: "4 Permata Kisah Asmara",
    },
    {
      name: "gem2ColorHex",
      label: "Permata 2: Kode Warna Faset",
      type: "text",
      placeholder: "#1d4ed8",
      defaultValue: "#1d4ed8",
      section: "4 Permata Kisah Asmara",
    },
    {
      name: "gem2Period",
      label: "Permata 2: Periode Jejak Kisah",
      type: "text",
      placeholder: "Malam-Malam Panjang • Samudra Kesabaran & Dekapan Tenang",
      defaultValue: "Malam-Malam Panjang • Samudra Kesabaran & Dekapan Tenang",
      section: "4 Permata Kisah Asmara",
    },
    {
      name: "gem2Poem",
      label: "Permata 2: Bait Puitis Safir",
      type: "textarea",
      placeholder: "Bait puitis untuk permata kedua...",
      defaultValue:
        "Biru safir terdalam menyimpan rahasia kita. Di saat badai dunia di luar bergemuruh kencang, dekapanmu adalah samudra hening yang selalu menjadi pelabuhan paling damai bagi jiwaku.",
      section: "4 Permata Kisah Asmara",
    },

    {
      name: "gem3Name",
      label: "Permata 3: Nama & Makna Simbolis",
      type: "text",
      placeholder: "Rubis Sang-de-Pigeon (Mirah Delima Gairah & Pengorbanan)",
      defaultValue: "Rubis Sang-de-Pigeon (Mirah Delima Gairah & Pengorbanan)",
      section: "4 Permata Kisah Asmara",
    },
    {
      name: "gem3ColorHex",
      label: "Permata 3: Kode Warna Faset",
      type: "text",
      placeholder: "#b91c1c",
      defaultValue: "#b91c1c",
      section: "4 Permata Kisah Asmara",
    },
    {
      name: "gem3Period",
      label: "Permata 3: Periode Jejak Kisah",
      type: "text",
      placeholder: "Tahun Ketiga • Ujian Nyala Api & Janji Tak Tergoyahkan",
      defaultValue: "Tahun Ketiga • Ujian Nyala Api & Janji Tak Tergoyahkan",
      section: "4 Permata Kisah Asmara",
    },
    {
      name: "gem3Poem",
      label: "Permata 3: Bait Puitis Mirah Delima",
      type: "textarea",
      placeholder: "Bait puitis untuk permata ketiga...",
      defaultValue:
        "Ditempa dalam panas bara magma bumi, merah delima ini adalah darah cintaku yang menyala. Bukan cinta yang rapuh oleh cobaan, melainkan gairah yang kian mengkristal suci saat diuji.",
      section: "4 Permata Kisah Asmara",
    },

    {
      name: "gem4Name",
      label: "Permata 4: Nama & Makna Simbolis",
      type: "text",
      placeholder: "Diamant Éternel (Intan Abadi Mahkota Ikrar Jiwa)",
      defaultValue: "Diamant Éternel (Intan Abadi Mahkota Ikrar Jiwa)",
      section: "4 Permata Kisah Asmara",
    },
    {
      name: "gem4ColorHex",
      label: "Permata 4: Kode Warna Faset",
      type: "text",
      placeholder: "#e0e7ff",
      defaultValue: "#e0e7ff",
      section: "4 Permata Kisah Asmara",
    },
    {
      name: "gem4Period",
      label: "Permata 4: Periode Jejak Kisah",
      type: "text",
      placeholder: "Hari Ini & Selamanya • Lingkaran Mahkota Tak Berujung",
      defaultValue: "Hari Ini & Selamanya • Lingkaran Mahkota Tak Berujung",
      section: "4 Permata Kisah Asmara",
    },
    {
      name: "gem4Poem",
      label: "Permata 4: Bait Puitis Intan Abadi",
      type: "textarea",
      placeholder: "Bait puitis untuk permata keempat...",
      defaultValue:
        "Kristal murni terkeras di semesta alam: tiada palu waktu yang mampu meretakkan perjanjian suci antara kita berdua. Menjadi mahkota abadi yang menerangi setiap langkah masa depan kita.",
      section: "4 Permata Kisah Asmara",
    },

    // Section 4: Liontin Filigree Emas & Narasi Penempaan Asmara
    {
      name: "locketMomentsPhotoUrl",
      label: "Foto Kenangan Liontin Filigree Emas (Momen Berdua)",
      type: "image",
      placeholder: "Unggah foto kenangan manis berdua untuk liontin emas klasik...",
      section: "Liontin Emas & Narasi Penempaan",
    },
    {
      name: "locketPhotoCaption",
      label: "Keterangan Foto Liontin Emas",
      type: "text",
      placeholder: "Detik Sakral yang Terpatri di Dalam Liontin Emas 18 Karat",
      defaultValue: "Detik Sakral yang Terpatri di Dalam Liontin Emas 18 Karat",
      section: "Liontin Emas & Narasi Penempaan",
    },
    {
      name: "atelierPhotoUrl",
      label: "Foto Suasana Atelier & Meja Kerja Pandai Emas",
      type: "image",
      placeholder: "Unggah foto atmosfer meja kerja pandai perhiasan...",
      section: "Liontin Emas & Narasi Penempaan",
    },
    {
      name: "atelierPhotoCaption",
      label: "Keterangan Foto Meja Kerja Atelier",
      type: "text",
      placeholder: "Meja Kerja Sang Pandai Emas • Place Vendôme Paris",
      defaultValue: "Meja Kerja Sang Pandai Emas • Place Vendôme Paris",
      section: "Liontin Emas & Narasi Penempaan",
    },
    {
      name: "goldsmithNarration",
      label: "Warkah Narasi Penempaan Asmara",
      type: "textarea",
      placeholder: "Tuliskan pengakuan puitis dari sang pandai emas...",
      defaultValue:
        "Kekasihku yang kucintai melampaui kata-kata,\n\nDi balik dinding atelier tua di Place Vendôme, setiap malam aku duduk di depan obor api kecil dan kikir baja halus. Menghabiskan ribuan jam bukan untuk sekadar mengasah logam dingin, melainkan merenungkan setiap senyum, tawa, dan tetes air mata bahagia yang telah kita lewati bersama.\n\nEmas murni membutuhkan suhu ribuan derajat untuk melepaskan segala kotorannya; begitu pula cinta kita yang telah disucikan oleh waktu dan kesabaran tanpa batas. Menempa cincin dan liontin ini adalah caraku mengunci keabadian di pergelangan tangan dan lehermu, agar ke mana pun engkau melangkah, engkau selalu dikelilingi oleh perlindungan dan kehangatan seluruh jiwaku.\n\nEngkau adalah mahakarya terindah yang pernah diciptakan Tuhan di semesta ini, dan aku bersumpah akan merawatmu dengan penuh kelembutan, sebagaimana seorang pandai perhiasan menjaga permata paling langka di kerajaannya.",
      section: "Liontin Emas & Narasi Penempaan",
    },
    {
      name: "goldsmithAxiom",
      label: "Aksioma Filosofis Pandai Perhiasan",
      type: "text",
      placeholder: "Aksioma singkat tentang cinta yang ditempa...",
      defaultValue:
        "« L'or s'épure au feu, et l'amour véritable s'illumine à travers les épreuves du temps. » (Emas disucikan oleh api, dan cinta sejati bersinar paling terang melewati tempaan waktu.)",
      section: "Liontin Emas & Narasi Penempaan",
    },

    // Section 5: Karat Kemurnian & Skala Ketahanan Asmara (Mohs Scale)
    {
      name: "preciousMetal",
      label: "Paduan Logam Mulia Mahkota",
      type: "text",
      placeholder: "Platine Pur 950 & Or Rose 18K Hand-Forged",
      defaultValue: "Platine Pur 950 & Or Rose 18K Hand-Forged",
      section: "Karat & Ketahanan Mohs Scale",
    },
    {
      name: "mohsHardness",
      label: "Skala Kekerasan Hati (Mohs Scale)",
      type: "text",
      placeholder: "10.0 / 10.0 Mohs Scale (Indestructible Diamond Standard)",
      defaultValue: "10.0 / 10.0 Mohs Scale (Indestructible Diamond Standard)",
      section: "Karat & Ketahanan Mohs Scale",
    },
    {
      name: "refractiveIndex",
      label: "Indeks Refraksi Cahaya Asmara",
      type: "text",
      placeholder: "2.42 RI (Membias Segenap Cahaya Semesta Menjadi Keindahan)",
      defaultValue: "2.42 RI (Membias Segenap Cahaya Semesta Menjadi Keindahan)",
      section: "Karat & Ketahanan Mohs Scale",
    },
    {
      name: "masterHallmark",
      label: "Cap Stempel Resmi Pandai Emas (Hallmark)",
      type: "text",
      placeholder: "Poinçon Tête d'Aigle & Losange du Maître Orfèvre",
      defaultValue: "Poinçon Tête d'Aigle & Losange du Maître Orfèvre",
      section: "Karat & Ketahanan Mohs Scale",
    },
    {
      name: "alchemicalPledge",
      label: "Sumpah Alkimia Cinta Abadi",
      type: "textarea",
      placeholder: "Ikrar keteguhan cinta...",
      defaultValue:
        "Kami berikrar di hadapan keabadian bahwa cinta ini tak akan pernah teroksidasi oleh keraguan duniawi, tak akan luntur oleh debu usia, dan akan tetap berpijar menyilaukan hingga akhir zaman.",
      section: "Karat & Ketahanan Mohs Scale",
    },

    // Section 6: Laci Rahasia Kotak Beludru & Ukiran Cincin Abadi
    {
      name: "ringInscription",
      label: "Ukiran Rahasia di Bagian Dalam Cincin (Gravure)",
      type: "text",
      placeholder: "Semper Adeste In Corde Meo • Selamanya Bersemayam di Dadaku",
      defaultValue: "Semper Adeste In Corde Meo • Selamanya Bersemayam di Dadaku",
      section: "Laci Rahasia & Ukiran Cincin",
    },
    {
      name: "secretVowMessage",
      label: "Pesan Rahasia di Dalam Laci Beludru (Secret Drawer)",
      type: "textarea",
      placeholder: "Pesan intim yang hanya terungkap saat tombol interaktif diklik...",
      defaultValue:
        "Wahai belahan jiwaku,\n\nJika suatu hari engkau merasa lelah atau dunia terasa terlalu bising, bukalah laci kecil ini dan sentuhlah cincin ini. Ingatlah bahwa di sudut bumi mana pun aku berada, ada satu hati yang telah berjanji untuk selalu pulang kepadamu, melindungimu, dan mencintaimu tanpa syarat apa pun. Engkaulah permata mahkota terindah dalam seluruh hidupku.",
      section: "Laci Rahasia & Ukiran Cincin",
    },
    {
      name: "signatureTitle",
      label: "Gelar Tanda Tangan Sang Pembuat",
      type: "text",
      placeholder: "Maître Joaillier de Ton Cœur • Paris",
      defaultValue: "Maître Joaillier de Ton Cœur • Paris",
      section: "Laci Rahasia & Ukiran Cincin",
    },
    {
      name: "musicTitle",
      label: "Judul Alunan Melodi Harpa Romantis",
      type: "text",
      placeholder: "Gabriel Fauré: Pavane Op. 50 (Romantic Harp & Strings)",
      defaultValue: "Gabriel Fauré: Pavane Op. 50 (Romantic Harp & Strings)",
      section: "Laci Rahasia & Ukiran Cincin",
    },
    {
      name: "audioUrl",
      label: "Tautan URL Audio Simfoni Harpa (Opsional)",
      type: "text",
      placeholder: "https://cdn.freesound.org/previews/612/612089_5674468-lq.mp3",
      defaultValue: "https://cdn.freesound.org/previews/612/612089_5674468-lq.mp3",
      section: "Laci Rahasia & Ukiran Cincin",
    },
  ],
  sample: {
    jewelTitle: "LE SOLITAIRE D'ÉTERNITÉ N°07",
    maisonName: "MAISON DE HAUTE JOAILLERIE • PLACE VENDÔME, PARIS",
    caratGrade: "8.88 CARATS • D-FLAWLESS ROYAL SOLITAIRE",
    recipientName: "Lady Aurelia de Montmirail",
    senderName: "Henri de Valois",
    anniversaryDate: "21 Septembre 2026",
    openingDedication:
      "Bagi jiwaku yang paling murni: di hadapan semesta yang fana, kupersembahkan kotak beludru ini bukan sekadar sebagai wadah batu mulia, melainkan tempat bersemayamnya seluruh detak kagumku padamu sejak detik pertama kita bersitatap.",
    museJewelPhotoUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    musePhotoCaption: "Potret Sang Muse Berbalut Kilau Tiara & Permata Keabadian",
    primaryColor: "#0a1128",
    accentColor: "#d4af37",

    certificateNo: "GIA-VENDOME-889922-AMOUR",
    cutGrade: "Cœur Brillant Parfait (Potongan Hati Nirwana)",
    cutDescription:
      "Tiap sudut faset 58 segi memantulkan kembali seluruh cahaya tatapan matamu menjadi ribuan spektrum pelangi di dadaku, tanpa ada setitik pun sinar yang terbuang sia-sia.",
    clarityGrade: "Internally Flawless (IF - Kemurnian Nir-Cacat)",
    clarityDescription:
      "Diperiksa di bawah mikroskop ketulusan 100x pembesaran waktu, tak ditemukan sebutir inklusi keraguan ataupun bayang-bayang kepalsuan dalam sumpah setiaku padamu.",
    colorGrade: "Grade D - Absolute Pure White Soul",
    colorDescription:
      "Tingkat kemurnian tertinggi di mana tiada prasangka duniawi yang mampu menodai warna putih salju ketulusan jiwamu.",
    caratWeight: "Poids Infini (∞ Carats - Tak Terhingga)",
    caratDescription:
      "Bobot cinta yang melampaui timbangan neraca gravitasi semesta, mengikat dua jiwa dalam medan magnet kerinduan yang tak akan pernah pudar.",
    fluorescenceGrade: "Strong Blue Luminescence under Midnight Sky • Excellent Symmetry",

    gem1Name: "Émeraude de Colombie (Zamrud Harapan & Pertemuan Awal)",
    gem1ColorHex: "#059669",
    gem1Period: "Musim Semi 2022 • Hari Pertama Mata Saling Bersitatap",
    gem1Poem:
      "Hijau zamrud di taman Tuileries tak sebanding dengan segarnya binar matamu saat pertama kali menyapaku. Di sanalah benih cinta pertama bertunas, tenang dan penuh pengharapan.",

    gem2Name: "Saphir Royal de Ceylan (Safir Keteduhan & Kesetiaan Hening)",
    gem2ColorHex: "#1d4ed8",
    gem2Period: "Malam-Malam Panjang • Samudra Kesabaran & Dekapan Tenang",
    gem2Poem:
      "Biru safir terdalam menyimpan rahasia kita. Di saat badai dunia di luar bergemuruh kencang, dekapanmu adalah samudra hening yang selalu menjadi pelabuhan paling damai bagi jiwaku.",

    gem3Name: "Rubis Sang-de-Pigeon (Mirah Delima Gairah & Pengorbanan)",
    gem3ColorHex: "#b91c1c",
    gem3Period: "Tahun Ketiga • Ujian Nyala Api & Janji Tak Tergoyahkan",
    gem3Poem:
      "Ditempa dalam panas bara magma bumi, merah delima ini adalah darah cintaku yang menyala. Bukan cinta yang rapuh oleh cobaan, melainkan gairah yang kian mengkristal suci saat diuji.",

    gem4Name: "Diamant Éternel (Intan Abadi Mahkota Ikrar Jiwa)",
    gem4ColorHex: "#e0e7ff",
    gem4Period: "Hari Ini & Selamanya • Lingkaran Mahkota Tak Berujung",
    gem4Poem:
      "Kristal murni terkeras di semesta alam: tiada palu waktu yang mampu meretakkan perjanjian suci antara kita berdua. Menjadi mahkota abadi yang menerangi setiap langkah masa depan kita.",

    locketMomentsPhotoUrl:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80",
    locketPhotoCaption: "Detik Sakral yang Terpatri di Dalam Liontin Emas 18 Karat",
    atelierPhotoUrl:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80",
    atelierPhotoCaption: "Meja Kerja Sang Pandai Emas • Place Vendôme Paris",
    goldsmithNarration:
      "Kekasihku yang kucintai melampaui kata-kata,\n\nDi balik dinding atelier tua di Place Vendôme, setiap malam aku duduk di depan obor api kecil dan kikir baja halus. Menghabiskan ribuan jam bukan untuk sekadar mengasah logam dingin, melainkan merenungkan setiap senyum, tawa, dan tetes air mata bahagia yang telah kita lewati bersama.\n\nEmas murni membutuhkan suhu ribuan derajat untuk melepaskan segala kotorannya; begitu pula cinta kita yang telah disucikan oleh waktu dan kesabaran tanpa batas. Menempa cincin dan liontin ini adalah caraku mengunci keabadian di pergelangan tangan dan lehermu, agar ke mana pun engkau melangkah, engkau selalu dikelilingi oleh perlindungan dan kehangatan seluruh jiwaku.\n\nEngkau adalah mahakarya terindah yang pernah diciptakan Tuhan di semesta ini, dan aku bersumpah akan merawatmu dengan penuh kelembutan, sebagaimana seorang pandai perhiasan menjaga permata paling langka di kerajaannya.",
    goldsmithAxiom:
      "« L'or s'épure au feu, et l'amour véritable s'illumine à travers les épreuves du temps. » (Emas disucikan oleh api, dan cinta sejati bersinar paling terang melewati tempaan waktu.)",

    preciousMetal: "Platine Pur 950 & Or Rose 18K Hand-Forged",
    mohsHardness: "10.0 / 10.0 Mohs Scale (Indestructible Diamond Standard)",
    refractiveIndex: "2.42 RI (Membias Segenap Cahaya Semesta Menjadi Keindahan)",
    masterHallmark: "Poinçon Tête d'Aigle & Losange du Maître Orfèvre",
    alchemicalPledge:
      "Kami berikrar di hadapan keabadian bahwa cinta ini tak akan pernah teroksidasi oleh keraguan duniawi, tak akan luntur oleh debu usia, dan akan tetap berpijar menyilaukan hingga akhir zaman.",

    ringInscription: "Semper Adeste In Corde Meo • Selamanya Bersemayam di Dadaku",
    secretVowMessage:
      "Wahai belahan jiwaku,\n\nJika suatu hari engkau merasa lelah atau dunia terasa terlalu bising, bukalah laci kecil ini dan sentuhlah cincin ini. Ingatlah bahwa di sudut bumi mana pun aku berada, ada satu hati yang telah berjanji untuk selalu pulang kepadamu, melindungimu, dan mencintaimu tanpa syarat apa pun. Engkaulah permata mahkota terindah dalam seluruh hidupku.",
    signatureTitle: "Maître Joaillier de Ton Cœur • Paris",
    musicTitle: "Gabriel Fauré: Pavane Op. 50 (Romantic Harp & Strings)",
    audioUrl: "https://cdn.freesound.org/previews/612/612089_5674468-lq.mp3",
  },
};
