import type { TemplateMeta } from "../types";

export const birthdayFestivalTemplate: TemplateMeta = {
  slug: "birthday-festival",
  name: "The Birthday Festival",
  category: "Perayaan",
  tagline:
    "Festival musik akbar edisi ulang tahun — gelang VIP all-access interaktif, poster lineup headliner panggung utama, manifesto tur, setlist lagu kehidupan, dan kupon merchandise konser.",
  description:
    "Template perayaan ulang tahun bertema festival konser musik dunia (The Birthday Music Festival // All-Access Life Tour). Merayakan yang berulang tahun sebagai bintang utama (Headliner) panggung festival akbar. Dilengkapi dengan gelang VIP & All-Access Lanyard Pass interaktif, poster festival lineup panggung utama, warkat memo manajer tur yang menyentuh, lembar setlist 4 lagu perjalanan hidup, galeri 3 foto backstage polaroid berlakban gaffer tape di atas road case, 4 kupon merchandise & privilege festival interaktif, serta alunan musik live acoustic festival celebration.",
  cardAccent: "bg-purple-950 text-amber-400 ring-1 ring-amber-400/40",
  highlights: [
    "Gelang festival kain holografis & All-Access VIP Lanyard Pass interaktif",
    "Poster lineup festival musik akbar dengan nama yang berulang tahun sebagai Headliner",
    "Surat warkat manajer tur di atas papan klip (tour clipboard memo)",
    "Lembar setlist konser 4 trek lagu perjalanan hidup dengan durasi & catatan emosional",
    "Galeri 3 foto polaroid backstage berlakban gaffer tape pada road case konser",
    "4 kupon merchandise & privilege festival interaktif yang dapat diklaim penerima",
    "Pemutar audio live festival acoustic celebration mengambang",
  ],
  fields: [
    // --- SECTION: GELANG VIP & POSTER LINEUP ---
    {
      name: "recipientName",
      label: "Nama Headliner Utama (Yang Berulang Tahun)",
      type: "text",
      placeholder: "Clarissa Aurelia",
      required: true,
      maxLength: 60,
      isRecipient: true,
      section: "lineup",
    },
    {
      name: "ageNumber",
      label: "Angka usia baru (Nomor edisi tur)",
      type: "text",
      placeholder: "25",
      required: true,
      maxLength: 10,
      section: "lineup",
    },
    {
      name: "festivalName",
      label: "Nama festival musik",
      type: "text",
      placeholder: "AURELIAFEST // THE 25TH SOLAR TOUR",
      required: true,
      maxLength: 100,
      section: "lineup",
    },
    {
      name: "festivalDate",
      label: "Jadwal & tanggal festival",
      type: "text",
      placeholder: "Saturday, 24 October 2026 // Gates Open 16:00",
      required: true,
      maxLength: 60,
      section: "lineup",
    },
    {
      name: "festivalVenue",
      label: "Lokasi arena panggung konser",
      type: "text",
      placeholder: "The Life Amphitheater & Sunset Arena",
      maxLength: 60,
      section: "lineup",
    },
    {
      name: "specialGuests",
      label: "Musisi pendukung / Special guests (Sahabat & Keluarga)",
      type: "text",
      placeholder: "The Besties Ensemble • Family Choir • Forever Friends",
      maxLength: 100,
      section: "lineup",
    },
    {
      name: "posterPhotoUrl",
      label: "Foto poster headliner utama (URL)",
      type: "text",
      placeholder: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
      section: "lineup",
    },
    {
      name: "festivalTagline",
      label: "Semboyan festival / Motto tur",
      type: "textarea",
      placeholder:
        "Sebuah perayaan tanpa henti untuk merayakan energi, tawa, dan melodi terindah dari sang bintang utama dalam tur mengelilingi matahari.",
      maxLength: 250,
      section: "lineup",
    },

    // --- SECTION: SURAT MANAJER TUR (BACKSTAGE MANIFESTO) ---
    {
      name: "letterTitle",
      label: "Judul memo manajer tur",
      type: "text",
      placeholder: "Tour Manager's Log: Sebuah Catatan Cinta di Balik Panggung Akbar",
      required: true,
      maxLength: 100,
      section: "manifesto",
    },
    {
      name: "letterContent",
      label: "Isi surat utama (Panjang, hangat & menyentuh)",
      type: "textarea",
      placeholder:
        "Kepada sang headliner terbaik di panggung semesta...\n\nMenjadi bagian dari tim pendukungmu dalam setiap babak perjalanan adalah kehormatan terbesar dalam hidupku. Terima kasih telah selalu menyanyikan melodi kebaikan yang menenangkan jiwa siapa pun yang mendengarnya.",
      required: true,
      section: "manifesto",
    },
    {
      name: "tourManagerName",
      label: "Nama manajer tur / Pengirim surat",
      type: "text",
      placeholder: "Rian Danuarta",
      required: true,
      maxLength: 60,
      section: "manifesto",
    },
    {
      name: "tourManagerTitle",
      label: "Peran / Keterangan pengirim",
      type: "text",
      placeholder: "Head of Crew & Lifetime Companion // Sahabat Sejati",
      maxLength: 70,
      section: "manifesto",
    },

    // --- SECTION: 4 TREK LAGU PERJALANAN HIDUP (THE SETLIST) ---
    {
      name: "track1Duration",
      label: "Trek 1: Durasi Lagu",
      type: "text",
      placeholder: "03:45",
      maxLength: 20,
      section: "setlist",
    },
    {
      name: "track1Title",
      label: "Trek 1: Judul Lagu",
      type: "text",
      placeholder: "The Acoustic Intro: Langkah Pertama & Imajinasi",
      maxLength: 60,
      section: "setlist",
    },
    {
      name: "track1Era",
      label: "Trek 1: Era / Album",
      type: "text",
      placeholder: "Era Masa Kecil // Acoustic Roots",
      maxLength: 40,
      section: "setlist",
    },
    {
      name: "track1Desc",
      label: "Trek 1: Catatan Emosional",
      type: "textarea",
      placeholder: "Melodi riang masa kecil di mana setiap mimpi tampak begitu dekat dan dunia terasa penuh nada-nada gembira.",
      maxLength: 180,
      section: "setlist",
    },

    {
      name: "track2Duration",
      label: "Trek 2: Durasi Lagu",
      type: "text",
      placeholder: "04:12",
      maxLength: 20,
      section: "setlist",
    },
    {
      name: "track2Title",
      label: "Trek 2: Judul Lagu",
      type: "text",
      placeholder: "Electric Rebellion: Melodi Keberanian & Persahabatan",
      maxLength: 60,
      section: "setlist",
    },
    {
      name: "track2Era",
      label: "Trek 2: Era / Album",
      type: "text",
      placeholder: "Era Remaja // Indie Rock Spirit",
      maxLength: 40,
      section: "setlist",
    },
    {
      name: "track2Desc",
      label: "Trek 2: Catatan Emosional",
      type: "textarea",
      placeholder: "Ketukan drum yang mengiringi pencarian jati diri, tawa lepas bersama sahabat, dan keberanian mencoba hal baru.",
      maxLength: 180,
      section: "setlist",
    },

    {
      name: "track3Duration",
      label: "Trek 3: Durasi Lagu",
      type: "text",
      placeholder: "04:50",
      maxLength: 20,
      section: "setlist",
    },
    {
      name: "track3Title",
      label: "Trek 3: Judul Lagu",
      type: "text",
      placeholder: "Anthem of Triumph: Supernova Karya & Ketangguhan",
      maxLength: 60,
      section: "setlist",
    },
    {
      name: "track3Era",
      label: "Trek 3: Era / Album",
      type: "text",
      placeholder: "Era Dewasa Awal // Arena Rock",
      maxLength: 40,
      section: "setlist",
    },
    {
      name: "track3Desc",
      label: "Trek 3: Catatan Emosional",
      type: "textarea",
      placeholder: "Harmoni megah saat kau menaklukkan badai kehidupan dan membuktikan kehebatan hatimu di hadapan banyak orang.",
      maxLength: 180,
      section: "setlist",
    },

    {
      name: "track4Duration",
      label: "Trek 4: Durasi Lagu",
      type: "text",
      placeholder: "05:25",
      maxLength: 20,
      section: "setlist",
    },
    {
      name: "track4Title",
      label: "Trek 4: Judul Lagu",
      type: "text",
      placeholder: "The Golden Encore: Babak Usia Baru & Doa Langit",
      maxLength: 60,
      section: "setlist",
    },
    {
      name: "track4Era",
      label: "Trek 4: Era / Album",
      type: "text",
      placeholder: "Babak Usia Baru // Symphony of Hope",
      maxLength: 40,
      section: "setlist",
    },
    {
      name: "track4Desc",
      label: "Trek 4: Catatan Emosional",
      type: "textarea",
      placeholder: "Lagu penutup yang megah menyambut tahun baru dengan kehangatan cinta, kelapangan dada, dan harapan tanpa batas.",
      maxLength: 180,
      section: "setlist",
    },

    // --- SECTION: 3 FOTO BACKSTAGE POLAROID ---
    {
      name: "polaroid1Photo",
      label: "Foto Backstage 1 (URL)",
      type: "text",
      placeholder: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
      section: "backstage",
    },
    {
      name: "polaroid1Title",
      label: "Judul Momen Backstage 1",
      type: "text",
      placeholder: "Soundcheck Tawa Hangat",
      maxLength: 60,
      section: "backstage",
    },
    {
      name: "polaroid1Stage",
      label: "Lokasi Panggung / Tag Momen",
      type: "text",
      placeholder: "GREEN ROOM // PRE-SHOW",
      maxLength: 40,
      section: "backstage",
    },
    {
      name: "polaroid1Desc",
      label: "Catatan Momen Backstage 1",
      type: "textarea",
      placeholder: "Momen sebelum panggung dimulai ketika segelas es kopi dan obrolan santai mampu meredakan segala ketegangan.",
      maxLength: 180,
      section: "backstage",
    },

    {
      name: "polaroid2Photo",
      label: "Foto Backstage 2 (URL)",
      type: "text",
      placeholder: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
      section: "backstage",
    },
    {
      name: "polaroid2Title",
      label: "Judul Momen Backstage 2",
      type: "text",
      placeholder: "Gemerlap Cahaya Sorot Malam",
      maxLength: 60,
      section: "backstage",
    },
    {
      name: "polaroid2Stage",
      label: "Lokasi Panggung / Tag Momen",
      type: "text",
      placeholder: "MAIN STAGE // LIVE CONCERT",
      maxLength: 40,
      section: "backstage",
    },
    {
      name: "polaroid2Desc",
      label: "Catatan Momen Backstage 2",
      type: "textarea",
      placeholder: "Ketika energi positifmu menyala dan seluruh ruangan serempak tersenyum menyaksikan kebahagiaanmu.",
      maxLength: 180,
      section: "backstage",
    },

    {
      name: "polaroid3Photo",
      label: "Foto Backstage 3 (URL)",
      type: "text",
      placeholder: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
      section: "backstage",
    },
    {
      name: "polaroid3Title",
      label: "Judul Momen Backstage 3",
      type: "text",
      placeholder: "Pelukan Usai Konser Akbar",
      maxLength: 60,
      section: "backstage",
    },
    {
      name: "polaroid3Stage",
      label: "Lokasi Panggung / Tag Momen",
      type: "text",
      placeholder: "AFTERSTAGE // CREW CIRCLE",
      maxLength: 40,
      section: "backstage",
    },
    {
      name: "polaroid3Desc",
      label: "Catatan Momen Backstage 3",
      type: "textarea",
      placeholder: "Tanda terima kasih tak terhingga atas setiap detik kebersamaan yang telah kita lalui bersama.",
      maxLength: 180,
      section: "backstage",
    },

    // --- SECTION: 4 KUPON MERCHANDISE & PRIVILEGE FESTIVAL ---
    {
      name: "voucher1Title",
      label: "Kupon 1: Judul Merchandise",
      type: "text",
      placeholder: "Free Coffee Rider Pass",
      maxLength: 60,
      section: "vouchers",
    },
    {
      name: "voucher1Desc",
      label: "Kupon 1: Keterangan Keistimewaan",
      type: "textarea",
      placeholder: "Traktir kopi favorit sepuasnya di cafe pilihanmu kapan pun kau butuh jeda dari padatnya jadwal.",
      maxLength: 160,
      section: "vouchers",
    },

    {
      name: "voucher2Title",
      label: "Kupon 2: Judul Merchandise",
      type: "text",
      placeholder: "24/7 Backstage Curhat Hotline",
      maxLength: 60,
      section: "vouchers",
    },
    {
      name: "voucher2Desc",
      label: "Kupon 2: Keterangan Keistimewaan",
      type: "textarea",
      placeholder: "Akses telepon dan temu kangen darurat kapan pun kau butuh pendengar setia tanpa dihakimi.",
      maxLength: 160,
      section: "vouchers",
    },

    {
      name: "voucher3Title",
      label: "Kupon 3: Judul Merchandise",
      type: "text",
      placeholder: "Festival Roadtrip Companion",
      maxLength: 60,
      section: "vouchers",
    },
    {
      name: "voucher3Desc",
      label: "Kupon 3: Keterangan Keistimewaan",
      type: "textarea",
      placeholder: "Tiket jalan-jalan santai mencari angin segar, hunting kuliner lezat, dan berburu sunset bersama.",
      maxLength: 160,
      section: "vouchers",
    },

    {
      name: "voucher4Title",
      label: "Kupon 4: Judul Merchandise",
      type: "text",
      placeholder: "Secret VIP Birthday Rider Box",
      maxLength: 60,
      section: "vouchers",
    },
    {
      name: "voucher4Desc",
      label: "Kupon 4: Keterangan Keistimewaan",
      type: "textarea",
      placeholder: "Kupon klaim untuk ditukar dengan satu barang impian yang sedang bertengger di wishlist teratasmu.",
      maxLength: 160,
      section: "vouchers",
    },

    // --- SECTION: WARNA & AUDIO KONSER ---
    {
      name: "primaryColor",
      label: "Warna Utama Arena Festival",
      type: "color",
      placeholder: "#180e29",
      section: "styling",
    },
    {
      name: "accentColor",
      label: "Aksen Neon Sunset Orange",
      type: "color",
      placeholder: "#f97316",
      section: "styling",
    },
    {
      name: "backgroundColor",
      label: "Warna Latar Belakang Festival",
      type: "color",
      placeholder: "#0d0718",
      section: "styling",
    },
    {
      name: "cardColor",
      label: "Warna Kontainer Roadcase",
      type: "color",
      placeholder: "#1c122e",
      section: "styling",
    },
    {
      name: "textColor",
      label: "Warna Teks Festival",
      type: "color",
      placeholder: "#faf5ff",
      section: "styling",
    },
    {
      name: "musicTitle",
      label: "Judul Musik Festival Audio",
      type: "text",
      placeholder: "Live Festival Acoustic & Indie Celebration",
      maxLength: 60,
      section: "audio",
    },
    {
      name: "musicUrl",
      label: "URL File Musik Audio (MP3)",
      type: "text",
      placeholder: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=ambient-piano-amp-strings-10711.mp3",
      section: "audio",
    },
  ],
  sample: {
    recipientName: "Clarissa Aurelia",
    ageNumber: "25",
    festivalName: "AURELIAFEST // THE 25TH SOLAR TOUR",
    festivalDate: "Saturday, 24 October 2026 // Gates Open 16:00",
    festivalVenue: "The Life Amphitheater & Sunset Arena",
    specialGuests: "The Besties Ensemble • Family Choir • Forever Friends",
    posterPhotoUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    festivalTagline:
      "Sebuah perayaan tanpa henti untuk merayakan energi, tawa, dan melodi terindah dari sang bintang utama dalam tur mengelilingi matahari.",

    letterTitle: "Tour Manager's Log: Sebuah Catatan Cinta di Balik Panggung Akbar",
    letterContent:
      "Kepada sang headliner paling bersinar di panggung kehidupan...\n\nMenyaksikan caramu melangkah menaklukkan setiap panggung waktu adalah salah satu hal paling menginspirasi yang pernah kusaksikan. Dari awal mula latihan kecil di masa lalu hingga pertunjukan spektakuler babak usia ke-25 ini, kau tak pernah kehilangan ketulusan hatimu.\n\nTerima kasih telah menjadi rekan seperjalanan yang paling luar biasa, sosok yang selalu menyebarkan tawa hangat di ruang tunggu tergelap, dan inspirasi bagi siapa pun yang beruntung berada di orbitmu. Di tur usiamu yang baru ini, semoga setiap nada hidupmu senantiasa selaras dengan kebahagiaan, stadion masa depanmu dipenuhi cinta, dan panggung impianmu tersenyum menyambut langkahmu.\n\nPlay it loud, sang bintang utama!",
    tourManagerName: "Rian Danuarta",
    tourManagerTitle: "Head of Crew & Lifetime Companion // Sahabat Sejati",

    track1Duration: "03:45",
    track1Title: "The Acoustic Intro: Langkah Pertama & Imajinasi",
    track1Era: "Era Masa Kecil // Acoustic Roots",
    track1Desc:
      "Melodi riang masa kecil di mana setiap mimpi tampak begitu dekat dan dunia terasa penuh nada-nada gembira.",

    track2Duration: "04:12",
    track2Title: "Electric Rebellion: Melodi Keberanian & Persahabatan",
    track2Era: "Era Remaja // Indie Rock Spirit",
    track2Desc:
      "Ketukan drum yang mengiringi pencarian jati diri, tawa lepas bersama sahabat, dan keberanian mencoba hal baru.",

    track3Duration: "04:50",
    track3Title: "Anthem of Triumph: Supernova Karya & Ketangguhan",
    track3Era: "Era Dewasa Awal // Arena Rock",
    track3Desc:
      "Harmoni megah saat kau menaklukkan badai kehidupan dan membuktikan kehebatan hatimu di hadapan banyak orang.",

    track4Duration: "05:25",
    track4Title: "The Golden Encore: Babak Usia Baru & Doa Langit",
    track4Era: "Babak Usia Baru // Symphony of Hope",
    track4Desc:
      "Lagu penutup yang megah menyambut tahun baru dengan kehangatan cinta, kelapangan dada, dan harapan tanpa batas.",

    polaroid1Photo:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
    polaroid1Title: "Soundcheck Tawa Hangat",
    polaroid1Stage: "GREEN ROOM // PRE-SHOW",
    polaroid1Desc:
      "Momen sebelum panggung dimulai ketika segelas es kopi dan obrolan santai mampu meredakan segala ketegangan.",

    polaroid2Photo:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    polaroid2Title: "Gemerlap Cahaya Sorot Malam",
    polaroid2Stage: "MAIN STAGE // LIVE CONCERT",
    polaroid2Desc:
      "Ketika energi positifmu menyala dan seluruh ruangan serempak tersenyum menyaksikan kebahagiaanmu.",

    polaroid3Photo:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
    polaroid3Title: "Pelukan Usai Konser Akbar",
    polaroid3Stage: "AFTERSTAGE // CREW CIRCLE",
    polaroid3Desc:
      "Tanda terima kasih tak terhingga atas setiap detik kebersamaan yang telah kita lalui bersama.",

    voucher1Title: "Free Coffee Rider Pass",
    voucher1Desc:
      "Traktir kopi favorit sepuasnya di cafe pilihanmu kapan pun kau butuh jeda dari padatnya jadwal.",

    voucher2Title: "24/7 Backstage Curhat Hotline",
    voucher2Desc:
      "Akses telepon dan temu kangen darurat kapan pun kau butuh pendengar setia tanpa dihakimi.",

    voucher3Title: "Festival Roadtrip Companion",
    voucher3Desc:
      "Tiket jalan-jalan santai mencari angin segar, hunting kuliner lezat, dan berburu sunset bersama.",

    voucher4Title: "Secret VIP Birthday Rider Box",
    voucher4Desc:
      "Kupon klaim untuk ditukar dengan satu barang impian yang sedang bertengger di wishlist teratasmu.",

    primaryColor: "#180e29",
    accentColor: "#f97316",
    backgroundColor: "#0d0718",
    cardColor: "#1c122e",
    textColor: "#faf5ff",
    musicTitle: "Live Festival Acoustic & Indie Celebration",
    musicUrl:
      "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=ambient-piano-amp-strings-10711.mp3",
  },
};
