import type { TemplateMeta } from "../types";

export const birthdayCinemaTemplate: TemplateMeta = {
  slug: "birthday-cinema",
  name: "The Birthday Cinémathèque",
  category: "Perayaan",
  tagline:
    "Pemutaran perdana film biografi ulang tahun — papan clapperboard interaktif, poster film berlapis mahkota daun emas, naskah sutradara, rol seluloid 35mm, dan piala Golden Laurels.",
  description:
    "Template perayaan ulang tahun bertema festival film bioskop independen (The Director's Cut: Premiering Episode [Age]). Mengabadikan setiap babak kehidupan sebagai karya sinematik kelas dunia. Dilengkapi dengan papan clapperboard interaktif dengan aksi ketukan sutradara, poster premiere film dengan mahkota Golden Laurels & rating 100% Certified Masterpiece, surat sutradara bergaya naskah skenario film, 4 adegan penting dalam pita rol film 35mm dengan timecode, galeri 3 foto di balik layar berbingkai lembar kontak cetak, 4 piala apresiasi kritikus, serta alunan musik orkestra film score yang megah.",
  cardAccent: "bg-stone-900 text-amber-400 ring-1 ring-amber-500/40",
  highlights: [
    "Papan clapperboard sutradara interaktif dengan tombol aksi ketukan 'CLAP & ACTION'",
    "Poster film premiere eksklusif dengan mahkota festival Golden Laurels & rating sinematik",
    "Surat warkat sutradara mendalam berformat naskah skrip skenario film",
    "Garis waktu 4 adegan penting hidup dalam bingkai rol seluloid film 35mm berpita timecode",
    "Galeri 3 foto di balik layar (BTS) berbingkai lembar kontak cetak film analog",
    "4 kartu penghargaan piala Golden Laurels interaktif & tombol standing ovation penonton",
    "Pemutar audio orkestra film score mengambang dengan visualisator pemutaran bioskop",
  ],
  fields: [
    // --- SECTION: CLAPPERBOARD & POSTER PREMIERE ---
    {
      name: "recipientName",
      label: "Nama bintang utama film (Yang berulang tahun)",
      type: "text",
      placeholder: "Natasha Aurelie",
      required: true,
      maxLength: 60,
      isRecipient: true,
      section: "premiere",
    },
    {
      name: "ageNumber",
      label: "Nomor episode / Angka usia baru",
      type: "text",
      placeholder: "25",
      required: true,
      maxLength: 10,
      section: "premiere",
    },
    {
      name: "filmTitle",
      label: "Judul mahakarya film",
      type: "text",
      placeholder: "THE EXTRAORDINARY EXPEDITION: CHAPTER 25",
      required: true,
      maxLength: 100,
      section: "premiere",
    },
    {
      name: "filmGenre",
      label: "Genre film",
      type: "text",
      placeholder: "Drama, Warm Comedy, Infinite Wonder",
      maxLength: 60,
      section: "premiere",
    },
    {
      name: "premiereDate",
      label: "Tanggal pemutaran perdana (Hari ulang tahun)",
      type: "text",
      placeholder: "Gala Premiere // 26 Oktober 2026",
      required: true,
      maxLength: 60,
      section: "premiere",
    },
    {
      name: "runningTime",
      label: "Durasi penayangan",
      type: "text",
      placeholder: "25 Years of Pure Grace & Laughter",
      maxLength: 50,
      section: "premiere",
    },
    {
      name: "filmRating",
      label: "Rating kurator kritikus",
      type: "text",
      placeholder: "100% Certified Masterpiece // Rotten Smiles",
      maxLength: 60,
      section: "premiere",
    },
    {
      name: "posterUrl",
      label: "Foto poster premiere utama (URL)",
      type: "text",
      placeholder: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
      section: "premiere",
    },
    {
      name: "filmSynopsis",
      label: "Sinopsis sinematik kurator",
      type: "textarea",
      placeholder:
        "Sebuah kisah memukau tentang keteguhan jiwa, senyuman yang menyembuhkan sekelilingnya, dan keberanian melangkah menembus setiap babak waktu dengan penuh keanggunan.",
      maxLength: 250,
      section: "premiere",
    },

    // --- SECTION: SURAT NASKAH SUTRADARA (DIRECTOR'S STATEMENT) ---
    {
      name: "letterTitle",
      label: "Judul catatan sutradara",
      type: "text",
      placeholder: "Director's Note: Sebuah Penghormatan Bagi Pemeran Utama Terbaik",
      required: true,
      maxLength: 100,
      section: "statement",
    },
    {
      name: "letterContent",
      label: "Isi surat mendalam bergaya skenario",
      type: "textarea",
      placeholder:
        "INT. THE THEATER OF LIFE - NIGHT\n\nLampu sorot meredup perlahan. Seluruh semesta terdiam menantikan adegan berikutnya...\n\nMemperhatikan caramu melangkah sejauh ini adalah menyaksikan mahakarya hidup yang sesungguhnya.",
      required: true,
      section: "statement",
    },
    {
      name: "directorName",
      label: "Nama sutradara / Pengirim surat",
      type: "text",
      placeholder: "Julian Alistair",
      required: true,
      maxLength: 60,
      section: "statement",
    },
    {
      name: "directorTitle",
      label: "Peran / Keterangan sutradara",
      type: "text",
      placeholder: "Executive Producer & Lifetime Co-Director // Sahabat Sejati",
      maxLength: 70,
      section: "statement",
    },

    // --- SECTION: 4 ADEGAN PENTING ROL FILM 35MM ---
    {
      name: "scene1Timecode",
      label: "Adegan 1: Timecode",
      type: "text",
      placeholder: "TC: 00:00:01:00",
      maxLength: 30,
      section: "scenes",
    },
    {
      name: "scene1Title",
      label: "Adegan 1: Nama Adegan",
      type: "text",
      placeholder: "The Opening Sequence: Kelahiran & Kepolosan",
      maxLength: 60,
      section: "scenes",
    },
    {
      name: "scene1Desc",
      label: "Adegan 1: Uraian Adegan",
      type: "textarea",
      placeholder: "Awal mula perjalanan dengan mata yang berbinar menatap dunia, menyerap kehangatan pertama.",
      maxLength: 180,
      section: "scenes",
    },

    {
      name: "scene2Timecode",
      label: "Adegan 2: Timecode",
      type: "text",
      placeholder: "TC: 00:15:20:00",
      maxLength: 30,
      section: "scenes",
    },
    {
      name: "scene2Title",
      label: "Adegan 2: Nama Adegan",
      type: "text",
      placeholder: "The Plot Twist: Badai, Eksplorasi & Kedewasaan",
      maxLength: 60,
      section: "scenes",
    },
    {
      name: "scene2Desc",
      label: "Adegan 2: Uraian Adegan",
      type: "textarea",
      placeholder: "Masa-masa penuh tantangan yang menguji karakter, namun justru membentukmu menjadi sosok yang luar biasa tangguh.",
      maxLength: 180,
      section: "scenes",
    },

    {
      name: "scene3Timecode",
      label: "Adegan 3: Timecode",
      type: "text",
      placeholder: "TC: 00:23:45:00",
      maxLength: 30,
      section: "scenes",
    },
    {
      name: "scene3Title",
      label: "Adegan 3: Nama Adegan",
      type: "text",
      placeholder: "The Climax: Supernova Pencapaian & Karya",
      maxLength: 60,
      section: "scenes",
    },
    {
      name: "scene3Desc",
      label: "Adegan 3: Uraian Adegan",
      type: "textarea",
      placeholder: "Titik di mana dedikasi dan kebaikanmu berbuah manis, menuai tepuk tangan dari mereka yang mencintaimu.",
      maxLength: 180,
      section: "scenes",
    },

    {
      name: "scene4Timecode",
      label: "Adegan 4: Timecode",
      type: "text",
      placeholder: "TC: 00:25:00:00",
      maxLength: 30,
      section: "scenes",
    },
    {
      name: "scene4Title",
      label: "Adegan 4: Nama Adegan",
      type: "text",
      placeholder: "The Golden Horizon: Babak Usia Baru",
      maxLength: 60,
      section: "scenes",
    },
    {
      name: "scene4Desc",
      label: "Adegan 4: Uraian Adegan",
      type: "textarea",
      placeholder: "Kamera mengarah ke masa depan yang cerah, menyongsong babak berikutnya dengan hati yang lapang dan optimisme membara.",
      maxLength: 180,
      section: "scenes",
    },

    // --- SECTION: 3 FOTO DI BALIK LAYAR (BEHIND THE SCENES) ---
    {
      name: "bts1Photo",
      label: "Foto BTS 1 (URL)",
      type: "text",
      placeholder: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
      section: "bts",
    },
    {
      name: "bts1Title",
      label: "Judul Momen BTS 1",
      type: "text",
      placeholder: "Tawa Spontan di Luar Skenario",
      maxLength: 60,
      section: "bts",
    },
    {
      name: "bts1Lens",
      label: "Catatan Lensa / Kamera",
      type: "text",
      placeholder: "35mm Prime // f/1.4 Soft Light",
      maxLength: 40,
      section: "bts",
    },
    {
      name: "bts1Desc",
      label: "Catatan Momen BTS 1",
      type: "textarea",
      placeholder: "Tawa paling lepas yang tertangkap kamera saat jeda syuting kehidupan di sudut kafe favorit.",
      maxLength: 180,
      section: "bts",
    },

    {
      name: "bts2Photo",
      label: "Foto BTS 2 (URL)",
      type: "text",
      placeholder: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
      section: "bts",
    },
    {
      name: "bts2Title",
      label: "Judul Momen BTS 2",
      type: "text",
      placeholder: "Eksplorasi Malam Penuh Kilau",
      maxLength: 60,
      section: "bts",
    },
    {
      name: "bts2Lens",
      label: "Catatan Lensa / Kamera",
      type: "text",
      placeholder: "50mm Cine // f/1.2 City Lights",
      maxLength: 40,
      section: "bts",
    },
    {
      name: "bts2Desc",
      label: "Catatan Momen BTS 2",
      type: "textarea",
      placeholder: "Momen magis menembus hiruk pikuk kota dengan tatapan penuh semangat dan mimpi yang menyala.",
      maxLength: 180,
      section: "bts",
    },

    {
      name: "bts3Photo",
      label: "Foto BTS 3 (URL)",
      type: "text",
      placeholder: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
      section: "bts",
    },
    {
      name: "bts3Title",
      label: "Judul Momen BTS 3",
      type: "text",
      placeholder: "Pelukan Hangat Rekan Seperjuangan",
      maxLength: 60,
      section: "bts",
    },
    {
      name: "bts3Lens",
      label: "Catatan Lensa / Kamera",
      type: "text",
      placeholder: "85mm Portrait // f/1.8 Golden Hour",
      maxLength: 40,
      section: "bts",
    },
    {
      name: "bts3Desc",
      label: "Catatan Momen BTS 3",
      type: "textarea",
      placeholder: "Bukti tak terbantahkan bahwa kehangatan persahabatan adalah piala sesungguhnya dalam setiap episode.",
      maxLength: 180,
      section: "bts",
    },

    // --- SECTION: 4 PIALA GOLDEN LAURELS ACCOLADES ---
    {
      name: "award1Category",
      label: "Penghargaan 1: Kategori",
      type: "text",
      placeholder: "BEST HEART & COMPASSION",
      maxLength: 50,
      section: "awards",
    },
    {
      name: "award1Title",
      label: "Penghargaan 1: Nama Penghargaan",
      type: "text",
      placeholder: "Piala Jiwa Paling Menginspirasi",
      maxLength: 60,
      section: "awards",
    },
    {
      name: "award1Praise",
      label: "Penghargaan 1: Ulasan Kritikus & Doa",
      type: "textarea",
      placeholder: "Dianugerahi atas kebaikan hati yang tiada henti menyalakan harapan di sekelilingnya.",
      maxLength: 160,
      section: "awards",
    },

    {
      name: "award2Category",
      label: "Penghargaan 2: Kategori",
      type: "text",
      placeholder: "MOST RESILIENT CHARACTER",
      maxLength: 50,
      section: "awards",
    },
    {
      name: "award2Title",
      label: "Penghargaan 2: Nama Penghargaan",
      type: "text",
      placeholder: "Piala Ketangguhan Melewati Badai",
      maxLength: 60,
      section: "awards",
    },
    {
      name: "award2Praise",
      label: "Penghargaan 2: Ulasan Kritikus & Doa",
      type: "textarea",
      placeholder: "Bahkan dalam badai plot twist terberat sekalipun, senyumanmu selalu kembali dengan kilau lebih megah.",
      maxLength: 160,
      section: "awards",
    },

    {
      name: "award3Category",
      label: "Penghargaan 3: Kategori",
      type: "text",
      placeholder: "OUTSTANDING RADIANCE",
      maxLength: 50,
      section: "awards",
    },
    {
      name: "award3Title",
      label: "Penghargaan 3: Nama Penghargaan",
      type: "text",
      placeholder: "Piala Senyuman Paling Menyinari",
      maxLength: 60,
      section: "awards",
    },
    {
      name: "award3Praise",
      label: "Penghargaan 3: Ulasan Kritikus & Doa",
      type: "textarea",
      placeholder: "Setiap senyumanmu mampu mengubah suasana muram menjadi ruang hangat yang dipenuhi tawa.",
      maxLength: 160,
      section: "awards",
    },

    {
      name: "award4Category",
      label: "Penghargaan 4: Kategori",
      type: "text",
      placeholder: "LIFETIME OF FORTUNE",
      maxLength: 50,
      section: "awards",
    },
    {
      name: "award4Title",
      label: "Penghargaan 4: Nama Penghargaan",
      type: "text",
      placeholder: "Piala Kejayaan Babak Baru",
      maxLength: 60,
      section: "awards",
    },
    {
      name: "award4Praise",
      label: "Penghargaan 4: Ulasan Kritikus & Doa",
      type: "textarea",
      placeholder: "Kiranya episode berikutnya dipenuhi kesuksesan, karya-karya brilian, dan cinta tanpa batas.",
      maxLength: 160,
      section: "awards",
    },

    // --- SECTION: WARNA & SOUNDTRACK FILM ---
    {
      name: "primaryColor",
      label: "Warna Studio Premiere",
      type: "color",
      placeholder: "#0d0d11",
      section: "styling",
    },
    {
      name: "accentColor",
      label: "Aksen Golden Laurel",
      type: "color",
      placeholder: "#e5b869",
      section: "styling",
    },
    {
      name: "backgroundColor",
      label: "Warna Latar Sinema",
      type: "color",
      placeholder: "#08080a",
      section: "styling",
    },
    {
      name: "cardColor",
      label: "Warna Kartu Naskah & Klise",
      type: "color",
      placeholder: "#16171d",
      section: "styling",
    },
    {
      name: "textColor",
      label: "Warna Teks Sinematik",
      type: "color",
      placeholder: "#f5efeb",
      section: "styling",
    },
    {
      name: "musicTitle",
      label: "Judul Film Score Soundtrack",
      type: "text",
      placeholder: "Cinematic Film Score & Acoustic Overture",
      maxLength: 60,
      section: "audio",
    },
    {
      name: "musicUrl",
      label: "URL File Musik Audio (MP3)",
      type: "text",
      placeholder: "https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f792cb.mp3?filename=cinematic-time-lapse-115672.mp3",
      section: "audio",
    },
  ],
  sample: {
    recipientName: "Natasha Aurelie",
    ageNumber: "25",
    filmTitle: "THE EXTRAORDINARY EXPEDITION: CHAPTER 25",
    filmGenre: "Drama, Warm Comedy, Infinite Wonder",
    premiereDate: "Gala Premiere // 26 Oktober 2026",
    runningTime: "25 Years of Pure Grace & Laughter",
    filmRating: "100% Certified Masterpiece // Rotten Smiles",
    posterUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    filmSynopsis:
      "Sebuah kisah memukau tentang keteguhan jiwa, senyuman yang menyembuhkan sekelilingnya, dan keberanian melangkah menembus setiap babak waktu dengan penuh keanggunan.",

    letterTitle: "Director's Note: Sebuah Penghormatan Bagi Pemeran Utama Terbaik",
    letterContent:
      "INT. THE THEATER OF LIFE - NIGHT\n\nLampu auditorium meredup perlahan. Seluruh semesta terdiam menantikan adegan berikutnya dimulai.\n\nMemperhatikan caramu melangkah sejauh ini adalah menyaksikan mahakarya yang sesungguhnya. Dalam setiap adegan yang telah berlalu—dari masa-masa kecil yang penuh keajaiban hingga badai plot twist yang kau hadapi dengan kepala tegak—kau tak pernah kehilangan ketulusan hatimu.\n\nTerima kasih telah menjadi tokoh utama yang luar biasa, rekan tertawa yang paling menyenangkan, dan inspirasi bagi siapa pun yang beruntung menyaksikan peranmu di dunia ini. Di episode usiamu yang ke-25 ini, semoga alur ceritamu semakin bertabur kejutan manis, dialog-dialog penuh tawa, dan pencapaian sinematik yang gemilang.\n\nLights, camera, forever action!",
    directorName: "Julian Alistair",
    directorTitle: "Executive Producer & Lifetime Co-Director // Sahabat Sejati",

    scene1Timecode: "TC: 00:00:01:00",
    scene1Title: "The Opening Sequence: Kelahiran & Kepolosan",
    scene1Desc:
      "Awal mula perjalanan dengan mata yang berbinar menatap dunia, menyerap kehangatan pertama tanpa rasa takut.",

    scene2Timecode: "TC: 00:15:20:00",
    scene2Title: "The Plot Twist: Badai, Eksplorasi & Kedewasaan",
    scene2Desc:
      "Masa-masa penuh tantangan yang menguji karakter, namun justru membentukmu menjadi sosok yang luar biasa tangguh.",

    scene3Timecode: "TC: 00:23:45:00",
    scene3Title: "The Climax: Supernova Pencapaian & Karya",
    scene3Desc:
      "Titik di mana dedikasi dan kebaikanmu berbuah manis, menuai tepuk tangan dari mereka yang mencintaimu.",

    scene4Timecode: "TC: 00:25:00:00",
    scene4Title: "The Golden Horizon: Babak Usia Baru",
    scene4Desc:
      "Kamera mengarah ke masa depan yang cerah, menyongsong babak berikutnya dengan hati yang lapang dan optimisme membara.",

    bts1Photo:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
    bts1Title: "Tawa Spontan di Luar Skenario",
    bts1Lens: "35mm Prime // f/1.4 Soft Light",
    bts1Desc:
      "Tawa paling lepas yang tertangkap kamera saat jeda syuting kehidupan di sudut kafe favorit.",

    bts2Photo:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    bts2Title: "Eksplorasi Malam Penuh Kilau",
    bts2Lens: "50mm Cine // f/1.2 City Lights",
    bts2Desc:
      "Momen magis menembus hiruk pikuk kota dengan tatapan penuh semangat dan mimpi yang menyala.",

    bts3Photo:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
    bts3Title: "Pelukan Hangat Rekan Seperjuangan",
    bts3Lens: "85mm Portrait // f/1.8 Golden Hour",
    bts3Desc:
      "Bukti tak terbantahkan bahwa kehangatan persahabatan adalah piala sesungguhnya dalam setiap episode.",

    award1Category: "BEST HEART & COMPASSION",
    award1Title: "Piala Jiwa Paling Menginspirasi",
    award1Praise:
      "Dianugerahi atas kebaikan hati yang tiada henti menyalakan harapan di sekelilingnya.",

    award2Category: "MOST RESILIENT CHARACTER",
    award2Title: "Piala Ketangguhan Melewati Badai",
    award2Praise:
      "Bahkan dalam badai plot twist terberat sekalipun, senyumanmu selalu kembali dengan kilau lebih megah.",

    award3Category: "OUTSTANDING RADIANCE",
    award3Title: "Piala Senyuman Paling Menyinari",
    award3Praise:
      "Setiap senyumanmu mampu mengubah suasana muram menjadi ruang hangat yang dipenuhi tawa.",

    award4Category: "LIFETIME OF FORTUNE",
    award4Title: "Piala Kejayaan Babak Baru",
    award4Praise:
      "Kiranya episode berikutnya dipenuhi kesuksesan, karya-karya brilian, dan cinta tanpa batas.",

    primaryColor: "#0d0d11",
    accentColor: "#e5b869",
    backgroundColor: "#08080a",
    cardColor: "#16171d",
    textColor: "#f5efeb",
    musicTitle: "Cinematic Film Score & Acoustic Overture",
    musicUrl:
      "https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f792cb.mp3?filename=cinematic-time-lapse-115672.mp3",
  },
};
