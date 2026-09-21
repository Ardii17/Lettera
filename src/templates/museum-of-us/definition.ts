import type { TemplateMeta } from "../types";

export const museumOfUsTemplate: TemplateMeta = {
  slug: "museum-of-us",
  name: "The Museum of Us",
  category: "Romantis",
  tagline:
    "Eksibisi seni rupa kisah cinta abadi — tiket vernissage privat berstempel emas, plakat marmer kuratorial, instalasi 4 mahakarya, lukisan berbingkai museum, dan ikrar pelestarian.",
  description:
    "Template surat cinta bernuansa museum seni rupa modern dan klasik (The Museum of Us: A Curated Love Exhibition). Memperlakukan kehadiran pasangan dan kisah cinta bersama layaknya mahakarya seni tak ternilai yang dipamerkan dalam galeri privat eksklusif. Menampilkan tiket vernissage privat berpendar emas, plakat kuratorial dinding marmer, surat kurator mendalam di atas lembaran katalog seni, garis waktu 4 instalasi seni perjalanan cinta, galeri 3 foto berbingkai museum mewah dengan plakat kuningan (brass plaque), 4 ikrar pelestarian abadi, serta alunan musik selo & piano klasik yang menyentuh hati.",
  cardAccent: "bg-stone-900 text-amber-300 ring-1 ring-amber-400/40",
  highlights: [
    "Tiket masuk pameran privat (Vernissage Ticket) berstempel emas & monogram cinta",
    "Plakat dinding marmer kuratorial dengan judul mahakarya & filosofi seni cinta",
    "Surat warkat kurator puitis di atas lembar katalog seni minimalis kontemporer",
    "4 instalasi seni kisah cinta yang merepresentasikan tahapan perjalanan hati",
    "Galeri 3 foto mahakarya berbingkai museum mewah dengan plakat kuningan (brass plaque)",
    "4 kartu ikrar pelestarian cinta abadi & tombol apresiasi persembahan bunga mawar",
    "Pemutar audio selo & piano klasik museum mengambang",
  ],
  fields: [
    // --- SECTION: TIKET VERNISSAGE & PLAKAT MARMER ---
    {
      name: "recipientName",
      label: "Nama belahan jiwa / Sang mahakarya",
      type: "text",
      placeholder: "Aurelia Beatrice",
      required: true,
      maxLength: 60,
      isRecipient: true,
      section: "plaque",
    },
    {
      name: "partnerTitle",
      label: "Panggilan kehormatan / Gelar kasih",
      type: "text",
      placeholder: "My Living Masterpiece & Infinite Muse",
      maxLength: 60,
      section: "plaque",
    },
    {
      name: "exhibitionTitle",
      label: "Judul pameran seni cinta",
      type: "text",
      placeholder: "THE RETROSPECTIVE OF US: TWO SOULS, ONE CANVAS",
      required: true,
      maxLength: 100,
      section: "plaque",
    },
    {
      name: "exhibitionYear",
      label: "Periode koleksi seni / Tahun perjalanan",
      type: "text",
      placeholder: "Collection 2021 – Present • Permanent Archive",
      maxLength: 60,
      section: "plaque",
    },
    {
      name: "curatorName",
      label: "Nama kurator / Pengirim surat",
      type: "text",
      placeholder: "Adrian Bramantya",
      required: true,
      maxLength: 60,
      section: "plaque",
    },
    {
      name: "curatorTitle",
      label: "Peran kuratorial pengirim",
      type: "text",
      placeholder: "Chief Curator & Devoted Companion // Sahabat Sejiwa",
      maxLength: 70,
      section: "plaque",
    },
    {
      name: "heroCoverPhotoUrl",
      label: "Foto karya agung utama (URL)",
      type: "text",
      placeholder: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
      section: "plaque",
    },
    {
      name: "curatorialStatement",
      label: "Pernyataan kuratorial pembuka (Curatorial Essay)",
      type: "textarea",
      placeholder:
        "Cinta bukanlah karya seni yang selesai dalam semalam, melainkan serangkaian sapuan kuas kesabaran, palet kehangatan, dan ketulusan jiwa yang terpahat abadi dalam sanubari.",
      maxLength: 250,
      section: "plaque",
    },

    // --- SECTION: SURAT WARKAT KURATOR (THE CURATOR'S LETTER) ---
    {
      name: "letterTitle",
      label: "Judul warkat surat kurator",
      type: "text",
      placeholder: "From the Curator's Heart: Surat Bagi Mahakarya Terindah di Semesta",
      required: true,
      maxLength: 100,
      section: "letter",
    },
    {
      name: "letterContent",
      label: "Isi surat cinta mendalam (Panjang & puitis)",
      type: "textarea",
      placeholder:
        "Di hadapan lukisan-lukisan terhebat di dunia, tak ada yang mampu menandingi binar matamu saat memandangku dengan penuh ketulusan...\n\nTerima kasih telah hadir dalam hidupku, menghidupkan warna-warna yang dahulu padam, dan menjadikan setiap detik bersamamu sebagai pengalaman estetika terindah yang pernah kurasakan.",
      required: true,
      section: "letter",
    },
    {
      name: "curatorSignOff",
      label: "Penutup warkat / Janji akhir",
      type: "text",
      placeholder: "Selamanya mengagumi dan menjagamu dalam keabadian waktu",
      maxLength: 80,
      section: "letter",
    },

    // --- SECTION: 4 INSTALASI SENI KISAH CINTA ---
    {
      name: "install1Medium",
      label: "Instalasi 1: Medium Seni",
      type: "text",
      placeholder: "Oil on Linen // First Glance",
      maxLength: 40,
      section: "installations",
    },
    {
      name: "install1Title",
      label: "Instalasi 1: Nama Karya & Babak",
      type: "text",
      placeholder: "The First Palette: Resonansi Pertemuan Pertama",
      maxLength: 60,
      section: "installations",
    },
    {
      name: "install1Year",
      label: "Instalasi 1: Tahun / Label Waktu",
      type: "text",
      placeholder: "Acquired: Musim Semi 2021",
      maxLength: 30,
      section: "installations",
    },
    {
      name: "install1Desc",
      label: "Instalasi 1: Catatan Kurasi Seni",
      type: "textarea",
      placeholder: "Detik ketika waktu terasa melambat, tatapan kita bersinggungan, dan semesta membisikkan bahwa petualangan indah baru saja dimulai.",
      maxLength: 180,
      section: "installations",
    },

    {
      name: "install2Medium",
      label: "Instalasi 2: Medium Seni",
      type: "text",
      placeholder: "Carved Bronze // Strength in Silence",
      maxLength: 40,
      section: "installations",
    },
    {
      name: "install2Title",
      label: "Instalasi 2: Nama Karya & Babak",
      type: "text",
      placeholder: "The Sculpture in the Storm: Keteguhan Melewati Ujian",
      maxLength: 60,
      section: "installations",
    },
    {
      name: "install2Year",
      label: "Instalasi 2: Tahun / Label Waktu",
      type: "text",
      placeholder: "Acquired: Musim Hujan 2022",
      maxLength: 30,
      section: "installations",
    },
    {
      name: "install2Desc",
      label: "Instalasi 2: Catatan Kurasi Seni",
      type: "textarea",
      placeholder: "Bahkan di saat badai dan ketidakpastian menerpa, genggaman tanganmu adalah jangkar terkuat yang membuatku selalu percaya pada esok hari.",
      maxLength: 180,
      section: "installations",
    },

    {
      name: "install3Medium",
      label: "Instalasi 3: Medium Seni",
      type: "text",
      placeholder: "Architectural Light // Pure Harmony",
      maxLength: 40,
      section: "installations",
    },
    {
      name: "install3Title",
      label: "Instalasi 3: Nama Karya & Babak",
      type: "text",
      placeholder: "The Sanctuary of Light: Kehangatan Rumah Batin",
      maxLength: 60,
      section: "installations",
    },
    {
      name: "install3Year",
      label: "Instalasi 3: Tahun / Label Waktu",
      type: "text",
      placeholder: "Acquired: 2024 – Ongoing",
      maxLength: 30,
      section: "installations",
    },
    {
      name: "install3Desc",
      label: "Instalasi 3: Catatan Kurasi Seni",
      type: "textarea",
      placeholder: "Menemukan tempat pulang di dalam pelukanmu, di mana riuhnya dunia luar sirna tergantikan oleh percakapan hangat dan secangkir teh sore.",
      maxLength: 180,
      section: "installations",
    },

    {
      name: "install4Medium",
      label: "Instalasi 4: Medium Seni",
      type: "text",
      placeholder: "Gold Leaf & Infinite Prism // Eternity",
      maxLength: 40,
      section: "installations",
    },
    {
      name: "install4Title",
      label: "Instalasi 4: Nama Karya & Babak",
      type: "text",
      placeholder: "The Infinite Horizon: Kanvas Masa Depan Bersama",
      maxLength: 60,
      section: "installations",
    },
    {
      name: "install4Year",
      label: "Instalasi 4: Tahun / Label Waktu",
      type: "text",
      placeholder: "Acquired: Selamanya",
      maxLength: 30,
      section: "installations",
    },
    {
      name: "install4Desc",
      label: "Instalasi 4: Catatan Kurasi Seni",
      type: "textarea",
      placeholder: "Menatap cakrawala esok hari dengan keyakinan penuh bahwa kisah kita akan terus bertumbuh, menua, dan mekar dalam keindahan abadi.",
      maxLength: 180,
      section: "installations",
    },

    // --- SECTION: THE PERMANENT COLLECTION (3 FOTO BERBINGKAI MUSEUM) ---
    {
      name: "artwork1Photo",
      label: "Foto Koleksi 1 (URL)",
      type: "text",
      placeholder: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
      section: "collection",
    },
    {
      name: "artwork1Title",
      label: "Judul Karya 1",
      type: "text",
      placeholder: "Senyuman di Bawah Cahaya Sore",
      maxLength: 60,
      section: "collection",
    },
    {
      name: "artwork1Medium",
      label: "Plakat Kuningan: Spesifikasi Karya 1",
      type: "text",
      placeholder: "Natural Light & Pure Joy • Paris, 2023",
      maxLength: 60,
      section: "collection",
    },
    {
      name: "artwork1Desc",
      label: "Ulasan Emosional Karya 1",
      type: "textarea",
      placeholder: "Sebuah komposisi sempurna di mana kebahagiaan terpancar tanpa perlu kata-kata tambahan.",
      maxLength: 160,
      section: "collection",
    },

    {
      name: "artwork2Photo",
      label: "Foto Koleksi 2 (URL)",
      type: "text",
      placeholder: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
      section: "collection",
    },
    {
      name: "artwork2Title",
      label: "Judul Karya 2",
      type: "text",
      placeholder: "Langkah Berdampingan Menembus Senja",
      maxLength: 60,
      section: "collection",
    },
    {
      name: "artwork2Medium",
      label: "Plakat Kuningan: Spesifikasi Karya 2",
      type: "text",
      placeholder: "Cobblestone Shadows & Heartbeats • 2024",
      maxLength: 60,
      section: "collection",
    },
    {
      name: "artwork2Desc",
      label: "Ulasan Emosional Karya 2",
      type: "textarea",
      placeholder: "Menyusuri jalan setapak bersama, menyadari bahwa setiap langkah adalah perjalanan menuju rumah yang sama.",
      maxLength: 160,
      section: "collection",
    },

    {
      name: "artwork3Photo",
      label: "Foto Koleksi 3 (URL)",
      type: "text",
      placeholder: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
      section: "collection",
    },
    {
      name: "artwork3Title",
      label: "Judul Karya 3",
      type: "text",
      placeholder: "Dekapan Kehangatan di Kala Hujan",
      maxLength: 60,
      section: "collection",
    },
    {
      name: "artwork3Medium",
      label: "Plakat Kuningan: Spesifikasi Karya 3",
      type: "text",
      placeholder: "Raindrops & Shared Warmth • 2025",
      maxLength: 60,
      section: "collection",
    },
    {
      name: "artwork3Desc",
      label: "Ulasan Emosional Karya 3",
      type: "textarea",
      placeholder: "Bukti nyata bahwa di tengah dinginnya dunia, cinta kita selalu memiliki api yang senantiasa menghangatkan.",
      maxLength: 160,
      section: "collection",
    },

    // --- SECTION: 4 IKRAR PELESTARIAN CINTA ABADI (VOWS OF PRESERVATION) ---
    {
      name: "vow1Title",
      label: "Ikrar 1: Nama Janji Setia",
      type: "text",
      placeholder: "Vow of Sanctuary: Menjadi Rumah Jiwamu",
      maxLength: 60,
      section: "vows",
    },
    {
      name: "vow1Desc",
      label: "Ikrar 1: Uraian Janji",
      type: "textarea",
      placeholder: "Aku berjanji akan selalu menjadi tempatmu pulang, ruang aman di mana kau bebas menjadi dirimu seutuhnya tanpa keraguan.",
      maxLength: 180,
      section: "vows",
    },

    {
      name: "vow2Title",
      label: "Ikrar 2: Nama Janji Setia",
      type: "text",
      placeholder: "Vow of Tenderness: Merawat dengan Kelembutan",
      maxLength: 60,
      section: "vows",
    },
    {
      name: "vow2Desc",
      label: "Ikrar 2: Uraian Janji",
      type: "textarea",
      placeholder: "Menjagamu dengan tutur kata yang sejuk, mendengar keluh kesahmu dengan kesabaran, dan memeluk hatimu di hari-hari berat.",
      maxLength: 180,
      section: "vows",
    },

    {
      name: "vow3Title",
      label: "Ikrar 3: Nama Janji Setia",
      type: "text",
      placeholder: "Vow of Growth: Tumbuh dan Bermimpi Bersama",
      maxLength: 60,
      section: "vows",
    },
    {
      name: "vow3Desc",
      label: "Ikrar 3: Uraian Janji",
      type: "textarea",
      placeholder: "Mendukung setiap cita-cita dan potensimu, merayakan kemenangan kecilmu, dan terus belajar menjadi pasangan yang lebih baik setiap hari.",
      maxLength: 180,
      section: "vows",
    },

    {
      name: "vow4Title",
      label: "Ikrar 4: Nama Janji Setia",
      type: "text",
      placeholder: "Vow of Eternity: Kesetiaan Melintasi Waktu",
      maxLength: 60,
      section: "vows",
    },
    {
      name: "vow4Desc",
      label: "Ikrar 4: Uraian Janji",
      type: "textarea",
      placeholder: "Tetap memilihmu di setiap musim kehidupan, menua bersamamu dengan penuh rasa syukur, dan mencintaimu melampaui batas waktu.",
      maxLength: 180,
      section: "vows",
    },

    // --- SECTION: WARNA & AUDIO SOUNDTRACK MUSEUM ---
    {
      name: "primaryColor",
      label: "Warna Obsidian Galeri",
      type: "color",
      placeholder: "#121316",
      section: "styling",
    },
    {
      name: "accentColor",
      label: "Aksen Plakat Gilded Gold",
      type: "color",
      placeholder: "#c5a059",
      section: "styling",
    },
    {
      name: "backgroundColor",
      label: "Warna Latar Dinding Museum",
      type: "color",
      placeholder: "#f7f5f0",
      section: "styling",
    },
    {
      name: "cardColor",
      label: "Warna Plakat & Marmer",
      type: "color",
      placeholder: "#ffffff",
      section: "styling",
    },
    {
      name: "textColor",
      label: "Warna Teks Kurasi",
      type: "color",
      placeholder: "#1c1917",
      section: "styling",
    },
    {
      name: "musicTitle",
      label: "Judul Audio Soundtrack Museum",
      type: "text",
      placeholder: "Museum Cello & Piano Nocturne",
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
    recipientName: "Aurelia Beatrice",
    partnerTitle: "My Living Masterpiece & Infinite Muse",
    exhibitionTitle: "THE RETROSPECTIVE OF US: TWO SOULS, ONE CANVAS",
    exhibitionYear: "Collection 2021 – Present • Permanent Archive",
    curatorName: "Adrian Bramantya",
    curatorTitle: "Chief Curator & Devoted Companion // Sahabat Sejiwa",
    heroCoverPhotoUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    curatorialStatement:
      "Cinta bukanlah karya seni yang selesai dalam semalam, melainkan serangkaian sapuan kuas kesabaran, palet kehangatan, dan ketulusan jiwa yang terpahat abadi dalam sanubari.",

    letterTitle: "From the Curator's Heart: Surat Bagi Mahakarya Terindah di Semesta",
    letterContent:
      "Kepada mahakarya hidupku yang paling kupuja,\n\nDi hadapan lukisan-lukisan terhebat di dunia, tak ada satu pun yang mampu menandingi binar matamu saat memandangku dengan ketulusan yang murni. Setiap kali aku menatapmu, aku diingatkan bahwa hal paling bernilai di dunia ini bukanlah sesuatu yang dipahat dari marmer atau dilukis di atas kanvas emas, melainkan cinta yang kita rawat bersama setiap hari.\n\nTerima kasih telah hadir dalam hidupku, menyalakan kembali warna-warna yang sempat memudar, dan memeluk segala kekuranganku dengan kesabaran luar biasa. Memilikimu di sisiku membuat setiap babak kehidupan terasa seperti mahakarya seni yang sarat makna dan keindahan.\n\nDalam ruang pameran waktu yang tak berbatas ini, janjiku adalah terus mencintaimu, menjagamu dari segala badai, dan menua bersamamu dengan senyuman yang sama hangatnya seperti saat pertama kali kita berjumpa.",
    curatorSignOff: "Selamanya mengagumi dan menjagamu dalam keabadian waktu",

    install1Medium: "Oil on Linen // First Glance",
    install1Title: "The First Palette: Resonansi Pertemuan Pertama",
    install1Year: "Acquired: Musim Semi 2021",
    install1Desc:
      "Detik ketika waktu terasa melambat, tatapan kita bersinggungan, dan semesta membisikkan bahwa petualangan indah baru saja dimulai.",

    install2Medium: "Carved Bronze // Strength in Silence",
    install2Title: "The Sculpture in the Storm: Keteguhan Melewati Ujian",
    install2Year: "Acquired: Musim Hujan 2022",
    install2Desc:
      "Bahkan di saat badai dan ketidakpastian menerpa, genggaman tanganmu adalah jangkar terkuat yang membuatku selalu percaya pada esok hari.",

    install3Medium: "Architectural Light // Pure Harmony",
    install3Title: "The Sanctuary of Light: Kehangatan Rumah Batin",
    install3Year: "Acquired: 2024 – Ongoing",
    install3Desc:
      "Menemukan tempat pulang di dalam pelukanmu, di mana riuhnya dunia luar sirna tergantikan oleh percakapan hangat dan secangkir teh sore.",

    install4Medium: "Gold Leaf & Infinite Prism // Eternity",
    install4Title: "The Infinite Horizon: Kanvas Masa Depan Bersama",
    install4Year: "Acquired: Selamanya",
    install4Desc:
      "Menatap cakrawala esok hari dengan keyakinan penuh bahwa kisah kita akan terus bertumbuh, menua, dan mekar dalam keindahan abadi.",

    artwork1Photo:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
    artwork1Title: "Senyuman di Bawah Cahaya Sore",
    artwork1Medium: "Natural Light & Pure Joy • Paris, 2023",
    artwork1Desc:
      "Sebuah komposisi sempurna di mana kebahagiaan terpancar tanpa perlu kata-kata tambahan.",

    artwork2Photo:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    artwork2Title: "Langkah Berdampingan Menembus Senja",
    artwork2Medium: "Cobblestone Shadows & Heartbeats • 2024",
    artwork2Desc:
      "Menyusuri jalan setapak bersama, menyadari bahwa setiap langkah adalah perjalanan menuju rumah yang sama.",

    artwork3Photo:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
    artwork3Title: "Dekapan Kehangatan di Kala Hujan",
    artwork3Medium: "Raindrops & Shared Warmth • 2025",
    artwork3Desc:
      "Bukti nyata bahwa di tengah dinginnya dunia, cinta kita selalu memiliki api yang senantiasa menghangatkan.",

    vow1Title: "Vow of Sanctuary: Menjadi Rumah Jiwamu",
    vow1Desc:
      "Aku berjanji akan selalu menjadi tempatmu pulang, ruang aman di mana kau bebas menjadi dirimu seutuhnya tanpa keraguan.",

    vow2Title: "Vow of Tenderness: Merawat dengan Kelembutan",
    vow2Desc:
      "Menjagamu dengan tutur kata yang sejuk, mendengar keluh kesahmu dengan kesabaran, dan memeluk hatimu di hari-hari berat.",

    vow3Title: "Vow of Growth: Tumbuh dan Bermimpi Bersama",
    vow3Desc:
      "Mendukung setiap cita-cita dan potensimu, merayakan kemenangan kecilmu, dan terus belajar menjadi pasangan yang lebih baik setiap hari.",

    vow4Title: "Vow of Eternity: Kesetiaan Melintasi Waktu",
    vow4Desc:
      "Tetap memilihmu di setiap musim kehidupan, menua bersamamu dengan penuh rasa syukur, dan mencintaimu melampaui batas waktu.",

    primaryColor: "#121316",
    accentColor: "#c5a059",
    backgroundColor: "#f7f5f0",
    cardColor: "#ffffff",
    textColor: "#1c1917",
    musicTitle: "Museum Cello & Piano Nocturne",
    musicUrl:
      "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=ambient-piano-amp-strings-10711.mp3",
  },
};
