import type { TemplateMeta } from "../types";

export const celestialBirthdayTemplate: TemplateMeta = {
  slug: "celestial-birthday",
  name: "Celestial Birthday Odyssey",
  category: "Perayaan",
  tagline:
    "Kapsul waktu ulang tahun futuristik antariksa — orbit perjalanan hidup mengelilingi matahari, telemetri zodiak, surat transmisi kosmik, kristal memori holografis, dan doa konstelasi.",
  description:
    "Template perayaan ulang tahun bertema 'Another Trip Around The Sun' yang mewah, sinematik, dan puitis. Memadukan estetika kosmik antariksa dengan teknologi kapsul waktu holografis interaktif. Menampilkan sampul kunci kapsul orbit yang bisa dibuka, telemetri koordinat bintang & rasi zodiak, surat transmisi mendalam dari sang kapten, logbook 4 fase milestone orbit kehidupan, 3 kristal memori masa lalu berhologram, 4 kartu doa & berkah nebula kosmik interaktif, serta alunan musik ambient kosmik yang menenangkan.",
  cardAccent: "bg-slate-950 text-amber-300 ring-1 ring-amber-400/40",
  highlights: [
    "Sampul interaktif kunci kapsul waktu antariksa dengan animasi rotasi cincin orbit",
    "Panel telemetri kosmik dengan hitungan orbit matahari & rasi bintang pelindung",
    "Surat transmisi antarbintang berdesain glassmorphic dengan monogram kosmik",
    "Logbook 4 fase milestone perjalanan orbit kehidupan (horizontal timeline)",
    "Galeri 3 kristal kenangan holografis dengan caption stardate & efek pendar bintang",
    "4 kartu doa nebula kosmik interaktif & tombol frekuensi starlight wish",
    "Pemutar audio kosmik ambient lofi mengambang dengan visualisator frekuensi",
  ],
  fields: [
    // --- SECTION: IDENTITAS & TELEMETRI KOSMIK ---
    {
      name: "recipientName",
      label: "Nama penerima / Bintang utama yang berulang tahun",
      type: "text",
      placeholder: "Astrid Kimberly",
      required: true,
      maxLength: 60,
      isRecipient: true,
      section: "telemetry",
    },
    {
      name: "ageNumber",
      label: "Angka usia baru (Jumlah orbit matahari)",
      type: "text",
      placeholder: "25",
      required: true,
      maxLength: 10,
      section: "telemetry",
    },
    {
      name: "orbitSubtitle",
      label: "Subjudul perayaan orbit",
      type: "text",
      placeholder: "25 Solar Orbits Around The Sun",
      maxLength: 80,
      section: "telemetry",
    },
    {
      name: "birthDate",
      label: "Tanggal kelahiran / Stardate",
      type: "text",
      placeholder: "18 November // Stardate 78912.4",
      required: true,
      maxLength: 60,
      section: "telemetry",
    },
    {
      name: "zodiacSign",
      label: "Rasi bintang / Zodiak pelindung",
      type: "text",
      placeholder: "Scorpio Constellation // Alpha Scorpii",
      maxLength: 80,
      section: "telemetry",
    },
    {
      name: "starCoordinates",
      label: "Koordinat astronomi bintang kelahiran",
      type: "text",
      placeholder: "RA 16h 29m 24s / Dec -26° 25′ 55″",
      maxLength: 80,
      section: "telemetry",
    },
    {
      name: "cosmicQuote",
      label: "Kutipan filosofis kosmik pembuka",
      type: "textarea",
      placeholder:
        "Kau bukan sekadar berada di dalam semesta, melainkan semesta yang sedang hidup, bernafas, dan menjelajahi waktu dengan penuh cahaya.",
      maxLength: 250,
      section: "telemetry",
    },

    // --- SECTION: SURAT TRANSMISI KAPSUL WAKTU ---
    {
      name: "letterTitle",
      label: "Judul surat transmisi",
      type: "text",
      placeholder: "Transmisi Kapsul Waktu: Menemukan Cahaya di Antara Bintang",
      required: true,
      maxLength: 100,
      section: "transmission",
    },
    {
      name: "letterContent",
      label: "Isi surat mendalam untuk yang berulang tahun",
      type: "textarea",
      placeholder:
        "Selamat menyelesaikan satu putaran orbit penuh lainnya mengelilingi sang surya...\n\nMelihatmu tumbuh dan melangkah sejauh ini adalah salah satu pemandangan terindah di alam semesta. Terima kasih telah selalu menjadi kompas kehangatan dan lentera terang bagi orang-orang di sekitarmu.",
      required: true,
      section: "transmission",
    },
    {
      name: "senderName",
      label: "Nama pengirim / Kapten transmisi",
      type: "text",
      placeholder: "Arkan Danu",
      required: true,
      maxLength: 60,
      section: "transmission",
    },
    {
      name: "senderRelation",
      label: "Keterangan / Hubungan pengirim",
      type: "text",
      placeholder: "Co-Pilot Perjalanan Hidup // Sahabat Sejati",
      maxLength: 60,
      section: "transmission",
    },

    // --- SECTION: 4 FASE MILESTONE ORBIT KEHIDUPAN ---
    {
      name: "milestone1Year",
      label: "Fase 1: Periode / Label waktu",
      type: "text",
      placeholder: "Orbit Awal",
      maxLength: 40,
      section: "milestones",
    },
    {
      name: "milestone1Title",
      label: "Fase 1: Nama fase orbit",
      type: "text",
      placeholder: "The Genesis & Cosmic Spark",
      maxLength: 60,
      section: "milestones",
    },
    {
      name: "milestone1Desc",
      label: "Fase 1: Deskripsi pencapaian / momen",
      type: "textarea",
      placeholder:
        "Langkah pertama mengenal dunia, menyerap mimpi-mimpi kecil dengan rasa ingin tahu dan keberanian tanpa batas.",
      maxLength: 200,
      section: "milestones",
    },

    {
      name: "milestone2Year",
      label: "Fase 2: Periode / Label waktu",
      type: "text",
      placeholder: "Orbit Eksplorasi",
      maxLength: 40,
      section: "milestones",
    },
    {
      name: "milestone2Title",
      label: "Fase 2: Nama fase orbit",
      type: "text",
      placeholder: "The Starlight Voyage",
      maxLength: 60,
      section: "milestones",
    },
    {
      name: "milestone2Desc",
      label: "Fase 2: Deskripsi pencapaian / momen",
      type: "textarea",
      placeholder:
        "Menemukan panggilan hati, melewati badai kosmik pertama, dan belajar memahami arti ketangguhan sejati.",
      maxLength: 200,
      section: "milestones",
    },

    {
      name: "milestone3Year",
      label: "Fase 3: Periode / Label waktu",
      type: "text",
      placeholder: "Orbit Kedewasaan",
      maxLength: 40,
      section: "milestones",
    },
    {
      name: "milestone3Title",
      label: "Fase 3: Nama fase orbit",
      type: "text",
      placeholder: "Stellar Breakthrough",
      maxLength: 60,
      section: "milestones",
    },
    {
      name: "milestone3Desc",
      label: "Fase 3: Deskripsi pencapaian / momen",
      type: "textarea",
      placeholder:
        "Titik pembuktian diri di mana dedikasi dan kebaikan hatimu memancarkan kilau supernova yang menginspirasi banyak jiwa.",
      maxLength: 200,
      section: "milestones",
    },

    {
      name: "milestone4Year",
      label: "Fase 4: Periode / Label waktu",
      type: "text",
      placeholder: "Orbit Masa Depan",
      maxLength: 40,
      section: "milestones",
    },
    {
      name: "milestone4Title",
      label: "Fase 4: Nama fase orbit",
      type: "text",
      placeholder: "The Infinite Horizon",
      maxLength: 60,
      section: "milestones",
    },
    {
      name: "milestone4Desc",
      label: "Fase 4: Deskripsi pencapaian / momen",
      type: "textarea",
      placeholder:
        "Memasuki babak orbit baru dengan hati yang lapang, kebijaksanaan yang matang, dan cakrawala harapan yang tak terhingga.",
      maxLength: 200,
      section: "milestones",
    },

    // --- SECTION: KRISTAL MEMORI HOLOGRAFIS (3 FOTO) ---
    {
      name: "memory1Url",
      label: "Foto Kenangan 1 (URL)",
      type: "text",
      placeholder: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
      section: "memories",
    },
    {
      name: "memory1Title",
      label: "Judul Kenangan 1",
      type: "text",
      placeholder: "Nebula Senyuman Pertama",
      maxLength: 60,
      section: "memories",
    },
    {
      name: "memory1Date",
      label: "Stardate / Waktu Kenangan 1",
      type: "text",
      placeholder: "Stardate 2023.08",
      maxLength: 40,
      section: "memories",
    },
    {
      name: "memory1Desc",
      label: "Catatan Kenangan 1",
      type: "textarea",
      placeholder: "Momen ketika senyum manismu menenangkan seisi ruangan di tengah riuhnya waktu.",
      maxLength: 160,
      section: "memories",
    },

    {
      name: "memory2Url",
      label: "Foto Kenangan 2 (URL)",
      type: "text",
      placeholder: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
      section: "memories",
    },
    {
      name: "memory2Title",
      label: "Judul Kenangan 2",
      type: "text",
      placeholder: "Ekspedisi Puncak Cahaya",
      maxLength: 60,
      section: "memories",
    },
    {
      name: "memory2Date",
      label: "Stardate / Waktu Kenangan 2",
      type: "text",
      placeholder: "Stardate 2024.11",
      maxLength: 40,
      section: "memories",
    },
    {
      name: "memory2Desc",
      label: "Catatan Kenangan 2",
      type: "textarea",
      placeholder: "Perjalanan tak terlupakan saat kita menatap bintang bersama dan berjanji terus melangkah maju.",
      maxLength: 160,
      section: "memories",
    },

    {
      name: "memory3Url",
      label: "Foto Kenangan 3 (URL)",
      type: "text",
      placeholder: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
      section: "memories",
    },
    {
      name: "memory3Title",
      label: "Judul Kenangan 3",
      type: "text",
      placeholder: "Detik Penuh Kehangatan",
      maxLength: 60,
      section: "memories",
    },
    {
      name: "memory3Date",
      label: "Stardate / Waktu Kenangan 3",
      type: "text",
      placeholder: "Stardate 2025.06",
      maxLength: 40,
      section: "memories",
    },
    {
      name: "memory3Desc",
      label: "Catatan Kenangan 3",
      type: "textarea",
      placeholder: "Tawa lepas yang membuktikan bahwa hal paling berharga adalah kebersamaan yang tulus.",
      maxLength: 160,
      section: "memories",
    },

    // --- SECTION: 4 KARTU DOA NEBULA KOSMIK ---
    {
      name: "wish1Title",
      label: "Doa 1: Nama Berkah",
      type: "text",
      placeholder: "Doa Cahaya: Ketenangan Jiwa",
      maxLength: 60,
      section: "wishes",
    },
    {
      name: "wish1Desc",
      label: "Doa 1: Isi Pesan & Harapan",
      type: "textarea",
      placeholder: "Semoga hatimu selalu dilimpahi kedamaian yang sejuk, bebas dari rasa ragu dan kecemasan malam.",
      maxLength: 180,
      section: "wishes",
    },

    {
      name: "wish2Title",
      label: "Doa 2: Nama Berkah",
      type: "text",
      placeholder: "Doa Gravitasi: Raga Sehat & Kokoh",
      maxLength: 60,
      section: "wishes",
    },
    {
      name: "wish2Desc",
      label: "Doa 2: Isi Pesan & Harapan",
      type: "textarea",
      placeholder: "Diberkahi kesehatan fisik dan mental yang kokoh untuk menjelajahi setiap sudut keindahan dunia.",
      maxLength: 180,
      section: "wishes",
    },

    {
      name: "wish3Title",
      label: "Doa 3: Nama Berkah",
      type: "text",
      placeholder: "Doa Supernova: Prestasi & Kelimpahan",
      maxLength: 60,
      section: "wishes",
    },
    {
      name: "wish3Desc",
      label: "Doa 3: Isi Pesan & Harapan",
      type: "textarea",
      placeholder: "Setiap usaha dan impian yang kau perjuangkan berbuah manis dan bersinar terang di hadapan banyak orang.",
      maxLength: 180,
      section: "wishes",
    },

    {
      name: "wish4Title",
      label: "Doa 4: Nama Berkah",
      type: "text",
      placeholder: "Doa Konstelasi: Kasih Abadi",
      maxLength: 60,
      section: "wishes",
    },
    {
      name: "wish4Desc",
      label: "Doa 4: Isi Pesan & Harapan",
      type: "textarea",
      placeholder: "Selalu dikelilingi oleh orang-orang berhati tulus yang mencintaimu apa adanya tanpa syarat.",
      maxLength: 180,
      section: "wishes",
    },

    // --- SECTION: PENGATURAN WARNA & MUSIK ---
    {
      name: "primaryColor",
      label: "Aksen Starlight Gold",
      type: "color",
      placeholder: "#f6c86d",
      section: "styling",
    },
    {
      name: "secondaryColor",
      label: "Aksen Nebula Violet",
      type: "color",
      placeholder: "#818cf8",
      section: "styling",
    },
    {
      name: "backgroundColor",
      label: "Warna Latar Kosmik",
      type: "color",
      placeholder: "#0b0e1b",
      section: "styling",
    },
    {
      name: "cardColor",
      label: "Warna Kontainer Kapsul",
      type: "color",
      placeholder: "#13172b",
      section: "styling",
    },
    {
      name: "textColor",
      label: "Warna Teks Utama",
      type: "color",
      placeholder: "#f1f5f9",
      section: "styling",
    },
    {
      name: "musicTitle",
      label: "Judul Musik Latar Kosmik",
      type: "text",
      placeholder: "Celestial Voyage & Cosmic Ambient Lofi",
      maxLength: 60,
      section: "audio",
    },
    {
      name: "musicUrl",
      label: "URL File Musik Audio (MP3)",
      type: "text",
      placeholder: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=space-chillout-14194.mp3",
      section: "audio",
    },
  ],
  sample: {
    recipientName: "Astrid Kimberly",
    ageNumber: "25",
    orbitSubtitle: "25 Solar Orbits Around The Sun",
    birthDate: "18 November // Stardate 78912.4",
    zodiacSign: "Scorpio Constellation // Alpha Scorpii",
    starCoordinates: "RA 16h 29m 24s / Dec -26° 25′ 55″",
    cosmicQuote:
      "Kau bukan sekadar berada di dalam semesta, melainkan semesta yang sedang hidup, bernafas, dan menjelajahi waktu dengan penuh cahaya keindahan.",

    letterTitle: "Transmisi Kapsul Waktu: Menemukan Cahaya di Antara Bintang",
    letterContent:
      "Selamat menyelesaikan satu putaran orbit penuh lainnya mengelilingi sang surya.\n\nDalam hamparan semesta yang begitu luas dan waktu yang tak berujung, kehadiranmu adalah salah satu keajaiban paling berharga. Melihatmu melangkah sejauh ini—dengan segala kegigihan, kelembutan hati, dan senyuman yang tak pernah padam—adalah anugerah luar biasa bagi siapa pun yang mengenalmu.\n\nTerima kasih telah selalu menjadi pelita di saat gulita, kompas penunjuk arah di kala bimbang, dan sahabat terbaik dalam setiap petualangan. Di orbit usiamu yang ke-25 ini, semoga alam semesta berkonspirasi memelukmu dengan segala kebaikan, membuka pintu-pintu keberuntungan baru, dan membimbing langkahmu menuju puncak-puncak impian yang kau dambakan.\n\nTeruslah bersinar, sang bintang penjelajah!",
    senderName: "Arkan Danu",
    senderRelation: "Co-Pilot Perjalanan Hidup // Sahabat Sejati",

    milestone1Year: "Orbit Awal",
    milestone1Title: "The Genesis & Cosmic Spark",
    milestone1Desc:
      "Langkah pertama mengenal dunia, menyerap mimpi-mimpi kecil dengan rasa ingin tahu dan keberanian tanpa batas.",

    milestone2Year: "Orbit Eksplorasi",
    milestone2Title: "The Starlight Voyage",
    milestone2Desc:
      "Menemukan panggilan hati, melewati badai kosmik pertama, dan belajar memahami arti ketangguhan sejati.",

    milestone3Year: "Orbit Kedewasaan",
    milestone3Title: "Stellar Breakthrough",
    milestone3Desc:
      "Titik pembuktian diri di mana dedikasi dan kebaikan hatimu memancarkan kilau supernova yang menginspirasi banyak jiwa.",

    milestone4Year: "Orbit Masa Depan",
    milestone4Title: "The Infinite Horizon",
    milestone4Desc:
      "Memasuki babak orbit baru dengan hati yang lapang, kebijaksanaan yang matang, dan cakrawala harapan yang tak terhingga.",

    memory1Url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    memory1Title: "Nebula Senyuman Pertama",
    memory1Date: "Stardate 2023.08",
    memory1Desc: "Momen ketika senyum manismu menenangkan seisi ruangan di tengah riuhnya waktu.",

    memory2Url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
    memory2Title: "Ekspedisi Puncak Cahaya",
    memory2Date: "Stardate 2024.11",
    memory2Desc: "Perjalanan tak terlupakan saat kita menatap bintang bersama dan berjanji terus melangkah maju.",

    memory3Url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    memory3Title: "Detik Penuh Kehangatan",
    memory3Date: "Stardate 2025.06",
    memory3Desc: "Tawa lepas yang membuktikan bahwa hal paling berharga adalah kebersamaan yang tulus.",

    wish1Title: "Doa Cahaya: Ketenangan Jiwa",
    wish1Desc: "Semoga hatimu selalu dilimpahi kedamaian yang sejuk, bebas dari rasa ragu dan kecemasan malam.",

    wish2Title: "Doa Gravitasi: Raga Sehat & Kokoh",
    wish2Desc: "Diberkahi kesehatan fisik dan mental yang kokoh untuk menjelajahi setiap sudut keindahan dunia.",

    wish3Title: "Doa Supernova: Prestasi & Kelimpahan",
    wish3Desc: "Setiap usaha dan impian yang kau perjuangkan berbuah manis dan bersinar terang di hadapan banyak orang.",

    wish4Title: "Doa Konstelasi: Kasih Abadi",
    wish4Desc: "Selalu dikelilingi oleh orang-orang berhati tulus yang mencintaimu apa adanya tanpa syarat.",

    primaryColor: "#f6c86d",
    secondaryColor: "#818cf8",
    backgroundColor: "#0b0e1b",
    cardColor: "#13172b",
    textColor: "#f1f5f9",
    musicTitle: "Celestial Voyage & Cosmic Ambient Lofi",
    musicUrl: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=space-chillout-14194.mp3",
  },
};
