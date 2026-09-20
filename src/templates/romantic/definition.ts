import type { TemplateMeta } from "../types";
import {
  ROMANTIC_COLOR_PRESETS,
  BACKGROUND_COLOR_PRESETS,
  CARD_COLOR_PRESETS,
  TEXT_COLOR_PRESETS,
} from "../color-presets";

export const romanticTemplate: TemplateMeta = {
  slug: "romantic",
  name: "Romantic Website",
  category: "Romansa",
  tagline:
    "Website tribut cinta eksklusif — galeri foto kenangan, love counter, timeline kisah, dan surat intim.",
  description:
    "Bukan sekadar surat digital biasa. Template website romantis lengkap siap jual dengan hero banner foto, penghitung hari cinta real-time, galeri kenangan bergaya polaroid, linimasa perjalanan kisah, kartu alasan cinta, dan surat bersegel lilin.",
  cardAccent: "bg-seal-100 text-seal-700",
  highlights: [
    "Website romantis interaktif lengkap (multi-section)",
    "Love Duration Counter (menghitung hari bersama real-time)",
    "Galeri foto kenangan polaroid dengan lightbox preview",
    "Timeline linimasa kisah cinta (Our Milestones)",
    "Pemutar musik romantis latar & animasi partikel cinta",
  ],
  fields: [
    // --- SECTION: HERO & PASANGAN ---
    {
      name: "recipientName",
      label: "Nama pasangan (penerima)",
      type: "text",
      placeholder: "Sarah Putri",
      required: true,
      maxLength: 60,
      isRecipient: true,
      section: "hero",
    },
    {
      name: "senderName",
      label: "Nama kamu (pengirim)",
      type: "text",
      placeholder: "Raka Aditya",
      required: true,
      maxLength: 60,
      section: "hero",
    },
    {
      name: "coupleNickname",
      label: "Nama panggilan / julukan berdua",
      type: "text",
      placeholder: "Raka & Sarah",
      maxLength: 60,
      section: "hero",
    },
    {
      name: "heroBadge",
      label: "Badge ucapan perayaan",
      type: "text",
      placeholder: "Happy 3rd Anniversary, My Love ✨",
      maxLength: 80,
      section: "hero",
    },
    {
      name: "title",
      label: "Judul website",
      type: "text",
      placeholder: "Untuk Kamu yang Selalu Pulang",
      required: true,
      maxLength: 100,
      section: "hero",
    },
    {
      name: "tagline",
      label: "Pesan pembuka / subjudul hero",
      type: "textarea",
      placeholder:
        "Sebuah ruang kecil yang kuciptakan khusus untuk merayakan setiap tawa, perjalanan, dan rasa syukur memilikimu.",
      maxLength: 300,
      rows: 3,
      section: "hero",
    },
    {
      name: "heroImage",
      label: "Foto utama cover (URL)",
      type: "text",
      placeholder:
        "https://images.unsplash.com/photo-1518199266791-5375a83190b7",
      maxLength: 1000,
      section: "hero",
    },

    // --- SECTION: LOVE COUNTER ---
    {
      name: "anniversaryDate",
      label: "Tanggal mulai bersama / jadian",
      type: "date",
      helperText:
        "Dipakai untuk menghitung otomatis hari, jam, dan waktu kalian bersama.",
      section: "counter",
    },
    {
      name: "counterTitle",
      label: "Judul penghitung hari",
      type: "text",
      placeholder: "Hari-Hari Indah Bersamamu",
      maxLength: 80,
      section: "counter",
    },
    {
      name: "counterSubtitle",
      label: "Catatan manis love counter",
      type: "text",
      placeholder:
        "Dan setiap detik berikutnya masih ingin kulewatkan bersamamu.",
      maxLength: 200,
      section: "counter",
    },

    // --- SECTION: OUR STORY (MILESTONES) ---
    {
      name: "storyTitle",
      label: "Judul linimasa kisah",
      type: "text",
      placeholder: "Babak Indah Perjalanan Kita",
      maxLength: 80,
      section: "story",
    },
    {
      name: "milestone1Date",
      label: "Tanggal momen 1",
      type: "text",
      placeholder: "15 Oktober 2022",
      maxLength: 40,
      section: "story",
    },
    {
      name: "milestone1Title",
      label: "Judul momen 1",
      type: "text",
      placeholder: "Pertama Kali Kita Bertemu",
      maxLength: 80,
      section: "story",
    },
    {
      name: "milestone1Desc",
      label: "Cerita singkat momen 1",
      type: "textarea",
      placeholder:
        "Secangkir kopi di sudut kafe sore itu, obrolan canggung yang mendadak terasa begitu hangat.",
      maxLength: 400,
      rows: 2,
      section: "story",
    },
    {
      name: "milestone2Date",
      label: "Tanggal momen 2",
      type: "text",
      placeholder: "14 Februari 2023",
      maxLength: 40,
      section: "story",
    },
    {
      name: "milestone2Title",
      label: "Judul momen 2",
      type: "text",
      placeholder: "Hari Kita Memulai Semuanya",
      maxLength: 80,
      section: "story",
    },
    {
      name: "milestone2Desc",
      label: "Cerita singkat momen 2",
      type: "textarea",
      placeholder:
        "Di bawah lampu jalanan malam itu, kamu tersenyum dan kita berjanji untuk saling melengkapi.",
      maxLength: 400,
      rows: 2,
      section: "story",
    },
    {
      name: "milestone3Date",
      label: "Tanggal momen 3",
      type: "text",
      placeholder: "20 September 2024",
      maxLength: 40,
      section: "story",
    },
    {
      name: "milestone3Title",
      label: "Judul momen 3",
      type: "text",
      placeholder: "Perjalanan Terbaik Bersama",
      maxLength: 80,
      section: "story",
    },
    {
      name: "milestone3Desc",
      label: "Cerita singkat momen 3",
      type: "textarea",
      placeholder:
        "Melihat senja di tepi pantai berdua, menyadari bahwa rumah yang kucari selama ini adalah dirimu.",
      maxLength: 400,
      rows: 2,
      section: "story",
    },

    // --- SECTION: PHOTO GALLERY (HANYA IMAGE) ---
    {
      name: "galleryTitle",
      label: "Judul galeri foto",
      type: "text",
      placeholder: "Galeri Kenangan Kita",
      maxLength: 80,
      section: "gallery",
    },
    {
      name: "gallerySubtitle",
      label: "Subjudul galeri foto",
      type: "text",
      placeholder:
        "Potret senyuman dan detik-detik yang ingin kusimpan selamanya.",
      maxLength: 160,
      section: "gallery",
    },
    // Foto 1
    {
      name: "galleryImg1",
      label: "Foto 1 (URL)",
      type: "text",
      placeholder:
        "https://images.unsplash.com/photo-1522673607200-164d1b6ce486",
      maxLength: 1000,
      section: "gallery",
    },
    {
      name: "galleryCaption1",
      label: "Caption foto 1",
      type: "text",
      placeholder: "Senja pertama kita di tepi pantai",
      maxLength: 100,
      section: "gallery",
    },
    {
      name: "galleryDate1",
      label: "Tanggal foto 1",
      type: "text",
      placeholder: "Pantai Kuta, 2023",
      maxLength: 50,
      section: "gallery",
    },
    // Foto 2
    {
      name: "galleryImg2",
      label: "Foto 2 (URL)",
      type: "text",
      placeholder:
        "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2",
      maxLength: 1000,
      section: "gallery",
    },
    {
      name: "galleryCaption2",
      label: "Caption foto 2",
      type: "text",
      placeholder: "Tertawa tanpa jeda di pasar malam",
      maxLength: 100,
      section: "gallery",
    },
    {
      name: "galleryDate2",
      label: "Tanggal foto 2",
      type: "text",
      placeholder: "Yogyakarta, 2023",
      maxLength: 50,
      section: "gallery",
    },
    // Foto 3
    {
      name: "galleryImg3",
      label: "Foto 3 (URL)",
      type: "text",
      placeholder:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
      maxLength: 1000,
      section: "gallery",
    },
    {
      name: "galleryCaption3",
      label: "Caption foto 3",
      type: "text",
      placeholder: "Senyuman terindah yang selalu menenangkan",
      maxLength: 100,
      section: "gallery",
    },
    {
      name: "galleryDate3",
      label: "Tanggal foto 3",
      type: "text",
      placeholder: "Bandung, 2024",
      maxLength: 50,
      section: "gallery",
    },
    // Foto 4
    {
      name: "galleryImg4",
      label: "Foto 4 (URL)",
      type: "text",
      placeholder:
        "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8",
      maxLength: 1000,
      section: "gallery",
    },
    {
      name: "galleryCaption4",
      label: "Caption foto 4",
      type: "text",
      placeholder: "Bunga favoritmu di hari ulang tahun",
      maxLength: 100,
      section: "gallery",
    },
    {
      name: "galleryDate4",
      label: "Tanggal foto 4",
      type: "text",
      placeholder: "Jakarta, 2024",
      maxLength: 50,
      section: "gallery",
    },
    // Foto 5
    {
      name: "galleryImg5",
      label: "Foto 5 (URL)",
      type: "text",
      placeholder:
        "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce",
      maxLength: 1000,
      section: "gallery",
    },
    {
      name: "galleryCaption5",
      label: "Caption foto 5",
      type: "text",
      placeholder: "Kopi pagi & cerita panjang tanpa habis",
      maxLength: 100,
      section: "gallery",
    },
    {
      name: "galleryDate5",
      label: "Tanggal foto 5",
      type: "text",
      placeholder: "Kedai Kopi, 2025",
      maxLength: 50,
      section: "gallery",
    },
    // Foto 6
    {
      name: "galleryImg6",
      label: "Foto 6 (URL)",
      type: "text",
      placeholder:
        "https://images.unsplash.com/photo-1474552226712-ac0f0961a954",
      maxLength: 1000,
      section: "gallery",
    },
    {
      name: "galleryCaption6",
      label: "Caption foto 6",
      type: "text",
      placeholder: "Malam berbintang dengan harapan kita",
      maxLength: 100,
      section: "gallery",
    },
    {
      name: "galleryDate6",
      label: "Tanggal foto 6",
      type: "text",
      placeholder: "Bromo, 2025",
      maxLength: 50,
      section: "gallery",
    },

    // --- SECTION: REASONS WHY I LOVE YOU ---
    {
      name: "reasonsTitle",
      label: "Judul alasan mencintaimu",
      type: "text",
      placeholder: "Hal-Hal Kecil yang Membuatku Jatuh Cinta",
      maxLength: 80,
      section: "reasons",
    },
    {
      name: "reason1",
      label: "Alasan 1",
      type: "text",
      placeholder: "Caramu tertawa lepas saat mendengar leluconku yang garing.",
      maxLength: 160,
      section: "reasons",
    },
    {
      name: "reason2",
      label: "Alasan 2",
      type: "text",
      placeholder:
        "Ketulusan hatimu dan kelembutan caramu memperlakukan semua orang di sekitarmu.",
      maxLength: 160,
      section: "reasons",
    },
    {
      name: "reason3",
      label: "Alasan 3",
      type: "text",
      placeholder:
        "Rasa tenang dan aman yang selalu hadir setiap kali tangan kita saling menggenggam.",
      maxLength: 160,
      section: "reasons",
    },
    {
      name: "reason4",
      label: "Alasan 4",
      type: "text",
      placeholder:
        "Caramu selalu mempercayaiku dan menjadi pendukung terbesarku dalam segala hal.",
      maxLength: 160,
      section: "reasons",
    },

    // --- SECTION: THE GRAND LOVE LETTER ---
    {
      name: "quote",
      label: "Kutipan romantis",
      type: "text",
      placeholder:
        "Dan dari jutaan kemungkinan di alam semesta, aku bersyukur semesta memilihkan kamu.",
      maxLength: 240,
      section: "letter",
    },
    {
      name: "message",
      label: "Isi surat utama",
      type: "textarea",
      placeholder: "Tulis isi surat hatimu di sini…",
      helperText:
        "Pisahkan paragraf dengan baris kosong untuk tata letak rapi.",
      required: true,
      maxLength: 4000,
      rows: 10,
      section: "letter",
    },
    {
      name: "signature",
      label: "Tanda tangan penutup",
      type: "text",
      placeholder: "Selamanya milikmu, Raka",
      maxLength: 60,
      section: "letter",
    },
    {
      name: "letterDate",
      label: "Tanggal surat dibuat",
      type: "date",
      section: "letter",
    },

    {
      name: "primaryColor",
      label: "Warna Aksen Utama",
      type: "color",
      defaultValue: "#c03a52",
      helperText: "Tombol, ikon hati, badge, angka countdown, dan segel lilin.",
      colorPresets: ROMANTIC_COLOR_PRESETS,
      section: "theme",
    },
    {
      name: "backgroundColor",
      label: "Warna Latar Belakang Website",
      type: "color",
      defaultValue: "#fdf4f5",
      helperText: "Warna kanvas latar belakang seluruh halaman tribut.",
      colorPresets: BACKGROUND_COLOR_PRESETS,
      section: "theme",
    },
    {
      name: "cardColor",
      label: "Warna Kartu & Wadah Konten",
      type: "color",
      defaultValue: "#ffffff",
      helperText: "Latar kotak love counter, bingkai galeri polaroid, dan kartu linimasa.",
      colorPresets: CARD_COLOR_PRESETS,
      section: "theme",
    },
    {
      name: "textColor",
      label: "Warna Teks Judul",
      type: "color",
      defaultValue: "#3e1b24",
      helperText: "Warna teks judul besar, headline, dan nama pasangan.",
      colorPresets: TEXT_COLOR_PRESETS,
      section: "theme",
    },
    {
      name: "bodyTextColor",
      label: "Warna Teks Paragraf & Surat",
      type: "color",
      defaultValue: "#54333b",
      helperText: "Warna teks narasi, catatan manis, dan isi surat cinta.",
      colorPresets: TEXT_COLOR_PRESETS,
      section: "theme",
    },
    {
      name: "musicTitle",
      label: "Nama lagu / audio latar",
      type: "text",
      placeholder: "Can't Help Falling in Love (Piano Instrumental)",
      maxLength: 80,
      section: "theme",
    },
    {
      name: "bgMusicUrl",
      label: "Tautan audio latar (MP3 URL)",
      type: "text",
      placeholder:
        "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3",
      helperText:
        "Masukkan tautan file audio langsung (.mp3) untuk musik latar interaktif.",
      maxLength: 1000,
      section: "theme",
    },
  ],
  sample: {
    recipientName: "Sarah Putri",
    senderName: "Raka Aditya",
    coupleNickname: "Raka & Sarah",
    heroBadge: "Happy 3rd Anniversary, My Love ✨",
    title: "Untuk Kamu yang Selalu Pulang",
    tagline:
      "Sebuah ruang kecil yang kuciptakan khusus untuk merayakan setiap tawa, perjalanan, dan rasa syukur memilikimu.",
    heroImage:
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1200&q=80",

    anniversaryDate: "2023-02-14",
    counterTitle: "Hari-Hari Indah Bersamamu",
    counterSubtitle:
      "Dan setiap detik berikutnya masih ingin kulewatkan bersamamu.",

    storyTitle: "Babak Indah Perjalanan Kita",
    milestone1Date: "15 Oktober 2022",
    milestone1Title: "Pertama Kali Kita Bertemu",
    milestone1Desc:
      "Secangkir kopi di sudut kafe sore itu, obrolan canggung yang mendadak terasa begitu hangat.",
    milestone2Date: "14 Februari 2023",
    milestone2Title: "Hari Kita Memulai Semuanya",
    milestone2Desc:
      "Di bawah lampu jalanan malam itu, kamu tersenyum dan kita berjanji untuk saling melengkapi.",
    milestone3Date: "20 September 2024",
    milestone3Title: "Perjalanan Terbaik Bersama",
    milestone3Desc:
      "Melihat senja di tepi pantai berdua, menyadari bahwa rumah yang kucari selama ini adalah dirimu.",

    galleryTitle: "Galeri Kenangan Kita",
    gallerySubtitle:
      "Potret senyuman dan detik-detik manis yang ingin kusimpan selamanya.",
    galleryImg1:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80",
    galleryCaption1: "Senja pertama kita di tepi pantai",
    galleryDate1: "Pantai Kuta, 2023",
    galleryImg2:
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80",
    galleryCaption2: "Tertawa tanpa jeda di pasar malam",
    galleryDate2: "Yogyakarta, 2023",
    galleryImg3:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    galleryCaption3: "Senyuman terindah yang selalu menenangkan",
    galleryDate3: "Bandung, 2024",
    galleryImg4:
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80",
    galleryCaption4: "Bunga favoritmu di hari ulang tahun",
    galleryDate4: "Jakarta, 2024",
    galleryImg5:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80",
    galleryCaption5: "Kopi pagi & cerita panjang tanpa habis",
    galleryDate5: "Kedai Kopi, 2025",
    galleryImg6:
      "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?auto=format&fit=crop&w=800&q=80",
    galleryCaption6: "Malam berbintang dengan harapan kita",
    galleryDate6: "Bromo, 2025",

    reasonsTitle: "Hal-Hal Kecil yang Membuatku Jatuh Cinta",
    reason1: "Caramu tertawa lepas saat mendengar leluconku yang garing.",
    reason2:
      "Ketulusan hatimu dan kelembutan caramu memperlakukan semua orang di sekitarmu.",
    reason3:
      "Rasa tenang dan aman yang selalu hadir setiap kali tangan kita saling menggenggam.",
    reason4:
      "Caramu selalu mempercayaiku dan menjadi pendukung terbesarku dalam segala hal.",

    quote:
      "Dan dari jutaan kemungkinan di alam semesta, aku bersyukur semesta memilihkan kamu.",
    message:
      "Aku menulis ini di jam yang biasanya kita habiskan untuk bercerita tentang hal-hal kecil hari ini. Ternyata benar kata orang, rumah itu bukan sebuah bangunan atau alamat di atas peta. Rumah itu adalah kamu, yang selalu menyambutku dengan tatapan hangat saat hari terasa begitu panjang.\n\nTerima kasih sudah memilih bertahan, tertawa bersamaku di saat gembira, dan menggenggam jemariku di hari-hari yang tidak selalu mudah. Bersamamu, aku belajar bahwa mencintai bukan tentang menemukan seseorang yang sempurna, melainkan tentang belajar melihat ketidaksempurnaan dengan cara yang begitu istimewa.\n\nAku tidak bisa berjanji bahwa hari-hari ke depan akan selalu tanpa badai. Tapi satu hal yang pasti kupegang: apa pun yang terjadi esok, aku akan selalu memilihmu, berkali-kali, dan selalu pulang ke pelukanmu.",
    signature: "Selalu & selamanya, Raka",
    letterDate: "2026-09-20",
    primaryColor: "#c03a52",
    backgroundColor: "#fdf4f5",
    cardColor: "#ffffff",
    textColor: "#3e1b24",
    bodyTextColor: "#54333b",
    musicTitle: "Can't Help Falling in Love (Romantic Piano)",
    bgMusicUrl:
      "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3",
  },
};
