import type { TemplateMeta } from "../types";
import {
  GRADUATION_COLOR_PRESETS,
  BACKGROUND_COLOR_PRESETS,
  CARD_COLOR_PRESETS,
  TEXT_COLOR_PRESETS,
} from "../color-presets";

export const graduationTemplate: TemplateMeta = {
  slug: "graduation",
  name: "Graduation Tribute Website",
  category: "Pencapaian",
  tagline: "Website perayaan kelulusan berwibawa dengan interaksi lempar toga, linimasa skripsi, galeri kenangan kampus, dan doa karier.",
  description:
    "Website perayaan kelulusan dan gelar sarjana yang prestisius dan membanggakan. Menampilkan foto toga wisudawan, interaksi lempar toga (cap toss) dengan konfeti emas & fanfare kemenangan, linimasa perjuangan tugas akhir, galeri polaroid kenangan kampus, kartu doa karier masa depan, piagam surat kelulusan elegan, serta alunan musik perayaan.",
  cardAccent: "bg-amber-500/15 text-amber-600",
  highlights: [
    "Interaksi lempar topi toga (cap toss) & hujan konfeti emas",
    "Pajangan potret wisudawan dengan predikat kehormatan / IPK",
    "Linimasa perjuangan kuliah & tuntasnya tugas akhir skripsi",
    "Galeri polaroid kenangan wisuda & kampus dengan lightbox",
    "4 kartu doa karier masa depan & surat kebanggaan keluarga",
  ],
  fields: [
    // 1. Warna Multi-Elemen
    {
      name: "primaryColor",
      label: "Warna Aksen Kehormatan (Primary Color)",
      type: "color",
      defaultValue: "#caa64f",
      helperText: "Warna emas toga, rumbai topi, lencana medali, dan tombol selebrasi.",
      colorPresets: GRADUATION_COLOR_PRESETS,
    },
    {
      name: "backgroundColor",
      label: "Warna Latar Belakang Website (Background)",
      type: "color",
      defaultValue: "#141a30",
      helperText: "Warna kanvas seluruh halaman (pilihan biru malam almamater atau kertas gading terang).",
      colorPresets: BACKGROUND_COLOR_PRESETS,
    },
    {
      name: "cardColor",
      label: "Warna Kartu Piagam & Konten (Card Container)",
      type: "color",
      defaultValue: "#1b2340",
      helperText: "Warna dasar piagam kelulusan, kartu linimasa, dan amplop surat.",
      colorPresets: CARD_COLOR_PRESETS,
    },
    {
      name: "textColor",
      label: "Warna Teks Judul & Nama",
      type: "color",
      defaultValue: "#f8f4e6",
      helperText: "Warna nama wisudawan dan judul-judul perayaan.",
      colorPresets: TEXT_COLOR_PRESETS,
    },
    {
      name: "bodyTextColor",
      label: "Warna Teks Isi & Doa",
      type: "color",
      defaultValue: "#d5ceba",
      helperText: "Warna narasi paragraf skripsi, doa karier, dan isi surat kebanggaan.",
      colorPresets: TEXT_COLOR_PRESETS,
    },

    // 2. Wisudawan & Cover (Hero)
    {
      name: "recipientName",
      label: "Nama Wisudawan & Gelar Lengkap",
      type: "text",
      placeholder: "Alifa Rahmadani, S.Kom.",
      required: true,
      maxLength: 80,
      isRecipient: true,
    },
    {
      name: "senderName",
      label: "Nama Pengirim / Dari",
      type: "text",
      placeholder: "Ayah, Ibu & Keluarga Besar",
      required: true,
      maxLength: 80,
    },
    {
      name: "achievement",
      label: "Gelar & Program Studi",
      type: "text",
      placeholder: "Sarjana Ilmu Komputer (S.Kom.)",
      required: true,
      maxLength: 80,
      defaultValue: "Sarjana Komputer",
    },
    {
      name: "institution",
      label: "Nama Universitas / Perguruan Tinggi",
      type: "text",
      placeholder: "Universitas Brawijaya",
      required: true,
      maxLength: 90,
    },
    {
      name: "faculty",
      label: "Fakultas / Departemen",
      type: "text",
      placeholder: "Fakultas Ilmu Komputer",
      maxLength: 90,
    },
    {
      name: "honorBadge",
      label: "Predikat Kehormatan / IPK",
      type: "text",
      placeholder: "🏆 Predikat Cum Laude · IPK 3.88",
      maxLength: 80,
      defaultValue: "🏆 Predikat Cum Laude",
    },
    {
      name: "heroBadge",
      label: "Badge Atas Perayaan",
      type: "text",
      placeholder: "✨ Official Graduation Tribute & Celebration",
      maxLength: 80,
      defaultValue: "✨ Official Graduation Tribute",
    },
    {
      name: "title",
      label: "Judul Perayaan Kelulusan",
      type: "text",
      placeholder: "Merayakan Kelulusan & Pengukuhan Gelar Alifa",
      required: true,
      maxLength: 100,
      defaultValue: "Merayakan Hari Kelulusan Terbaikmu",
    },
    {
      name: "tagline",
      label: "Pesan Pembuka / Sambutan Kebanggaan",
      type: "textarea",
      placeholder: "Sebuah persembahan bangga atas setiap tetes keringat, malam begadang, dan tekad baja hingga toga ini tersemat indah di kepalamu.",
      maxLength: 350,
      rows: 3,
    },
    {
      name: "heroImage",
      label: "Foto Potret Wisudawan (Toga / Kebaya)",
      type: "text",
      placeholder: "https://...",
      helperText: "Foto terbaik wisudawan memakai toga atau kebaya wisuda.",
    },
    {
      name: "graduationDate",
      label: "Tanggal Wisuda / Pelantikan",
      type: "date",
    },

    // 3. Lempar Toga & Selebrasi Interaktif
    {
      name: "capTitle",
      label: "Judul Ritual Lempar Toga",
      type: "text",
      placeholder: "Pelepasan Toga & Sorak Kemenangan",
      maxLength: 80,
      defaultValue: "Pelepasan Toga & Sorak Kemenangan",
    },
    {
      name: "capPrompt",
      label: "Instruksi Lempar Toga",
      type: "text",
      placeholder: "Tekan tombol di bawah untuk melambungkan toga kelulusanmu ke angkasa!",
      maxLength: 120,
      defaultValue: "Tekan tombol di bawah untuk melambungkan toga kelulusanmu ke angkasa!",
    },
    {
      name: "secretToastMessage",
      label: "Pesan Kejutan Bangga (Muncul Setelah Toga Dilempar)",
      type: "textarea",
      placeholder: "Selamat melangkah ke dunia nyata, Sarjana! Kami percaya kamu akan menaklukkan setiap tantangan dengan penuh integritas, keberanian, dan senyuman bangga! 🎓✨",
      maxLength: 350,
      rows: 3,
      defaultValue: "Selamat melangkah ke dunia nyata, Sarjana! Kami percaya kamu akan menaklukkan setiap tantangan dengan penuh integritas, keberanian, dan senyuman bangga! 🎓✨",
    },

    // 4. Statistik Perjuangan & Linimasa Kampus
    {
      name: "totalCredits",
      label: "Total SKS yang Dituntaskan",
      type: "text",
      placeholder: "144 SKS",
      maxLength: 30,
      defaultValue: "144 SKS",
    },
    {
      name: "studyDuration",
      label: "Masa Studi",
      type: "text",
      placeholder: "3.5 Tahun",
      maxLength: 30,
      defaultValue: "3.5 Tahun",
    },
    {
      name: "thesisTitle",
      label: "Judul Tugas Akhir / Skripsi",
      type: "text",
      placeholder: "Pengembangan Model AI untuk Deteksi Dini Penyakit Tanaman Pangan",
      maxLength: 200,
    },
    {
      name: "milestoneTitle",
      label: "Judul Linimasa Kampus",
      type: "text",
      placeholder: "Jejak Langkah & Perjuangan Menuju Toga",
      maxLength: 80,
      defaultValue: "Jejak Perjalanan & Perjuangan Menuju Toga",
    },
    { name: "milestone1Year", label: "Tahun/Tahap 1", type: "text", maxLength: 30 },
    { name: "milestone1Title", label: "Judul Babak 1", type: "text", maxLength: 80 },
    { name: "milestone1Desc", label: "Deskripsi Babak 1", type: "textarea", maxLength: 300, rows: 2 },
    { name: "milestone2Year", label: "Tahun/Tahap 2", type: "text", maxLength: 30 },
    { name: "milestone2Title", label: "Judul Babak 2", type: "text", maxLength: 80 },
    { name: "milestone2Desc", label: "Deskripsi Babak 2", type: "textarea", maxLength: 300, rows: 2 },
    { name: "milestone3Year", label: "Tahun/Tahap 3", type: "text", maxLength: 30 },
    { name: "milestone3Title", label: "Judul Babak 3", type: "text", maxLength: 80 },
    { name: "milestone3Desc", label: "Deskripsi Babak 3", type: "textarea", maxLength: 300, rows: 2 },

    // 5. Galeri Kenangan Kampus & Wisuda
    {
      name: "galleryTitle",
      label: "Judul Galeri Kenangan",
      type: "text",
      placeholder: "Potret Kenangan Kampus & Momen Wisuda",
      maxLength: 80,
      defaultValue: "Galeri Kenangan Kampus & Momen Wisuda",
    },
    {
      name: "gallerySubtitle",
      label: "Subjudul Galeri",
      type: "text",
      placeholder: "Dokumentasi senyum kebersamaan, bimbingan dosen, dan pelukan hangat keluarga tercinta.",
      maxLength: 160,
    },
    { name: "galleryImg1", label: "Foto 1", type: "text" },
    { name: "galleryCaption1", label: "Caption 1", type: "text", maxLength: 100 },
    { name: "galleryDate1", label: "Tahun/Lokasi 1", type: "text", maxLength: 50 },
    { name: "galleryImg2", label: "Foto 2", type: "text" },
    { name: "galleryCaption2", label: "Caption 2", type: "text", maxLength: 100 },
    { name: "galleryDate2", label: "Tahun/Lokasi 2", type: "text", maxLength: 50 },
    { name: "galleryImg3", label: "Foto 3", type: "text" },
    { name: "galleryCaption3", label: "Caption 3", type: "text", maxLength: 100 },
    { name: "galleryDate3", label: "Tahun/Lokasi 3", type: "text", maxLength: 50 },
    { name: "galleryImg4", label: "Foto 4", type: "text" },
    { name: "galleryCaption4", label: "Caption 4", type: "text", maxLength: 100 },
    { name: "galleryDate4", label: "Tahun/Lokasi 4", type: "text", maxLength: 50 },
    { name: "galleryImg5", label: "Foto 5", type: "text" },
    { name: "galleryCaption5", label: "Caption 5", type: "text", maxLength: 100 },
    { name: "galleryDate5", label: "Tahun/Lokasi 5", type: "text", maxLength: 50 },
    { name: "galleryImg6", label: "Foto 6", type: "text" },
    { name: "galleryCaption6", label: "Caption 6", type: "text", maxLength: 100 },
    { name: "galleryDate6", label: "Tahun/Lokasi 6", type: "text", maxLength: 50 },

    // 6. Doa Karier & Masa Depan
    {
      name: "wishesTitle",
      label: "Judul Bagian Doa Karier",
      type: "text",
      placeholder: "Doa & Harapan Terbaik untuk Langkah Masa Depanmu",
      maxLength: 80,
      defaultValue: "Doa & Harapan Terbaik untuk Masa Depanmu",
    },
    { name: "wish1", label: "Doa 1 (Langkah Karier & Karya)", type: "text", maxLength: 160 },
    { name: "wish2", label: "Doa 2 (Integritas & Kepemimpinan)", type: "text", maxLength: 160 },
    { name: "wish3", label: "Doa 3 (Keberkahan Rezeki & Kesehatan)", type: "text", maxLength: 160 },
    { name: "wish4", label: "Doa 4 (Manfaat Luas bagi Sesama)", type: "text", maxLength: 160 },

    // 7. Surat Kebanggaan Utama
    {
      name: "quote",
      label: "Kutipan Inspiratif Pembuka",
      type: "text",
      placeholder: "Yang sulit itu memulai, yang luar biasa itu menuntaskan. Kamu telah membuktikannya hari ini.",
      maxLength: 180,
    },
    {
      name: "message",
      label: "Isi Surat Kebanggaan Lengkap",
      type: "textarea",
      placeholder: "Tuliskan curahan rasa bangga, apresiasi atas kerja kerasnya, dan pesan hangat dari hati...",
      required: true,
      maxLength: 4000,
      rows: 10,
    },
    {
      name: "signature",
      label: "Tanda Tangan Pengirim",
      type: "text",
      placeholder: "Dengan rasa bangga tak terhingga, Ayah & Ibu",
      maxLength: 80,
    },
    { name: "letterDate", label: "Tanggal Surat", type: "date" },

    // 8. Musik Latar
    {
      name: "musicTitle",
      label: "Judul Musik Wisuda",
      type: "text",
      placeholder: "Triumphant Graduation Fanfare & Symphony",
      maxLength: 80,
    },
    {
      name: "bgMusicUrl",
      label: "Tautan Langsung Audio (.mp3)",
      type: "text",
      maxLength: 1000,
    },
  ],
  sample: {
    primaryColor: "#caa64f",
    backgroundColor: "#141a30",
    cardColor: "#1b2340",
    textColor: "#f8f4e6",
    bodyTextColor: "#d5ceba",
    recipientName: "Alifa Rahmadani, S.Kom.",
    senderName: "Ayah, Ibu & Keluarga Besar",
    achievement: "Sarjana Ilmu Komputer (S.Kom.)",
    institution: "Universitas Brawijaya",
    faculty: "Fakultas Ilmu Komputer",
    honorBadge: "🏆 Predikat Cum Laude · IPK 3.88",
    heroBadge: "✨ Official Graduation Tribute & Celebration",
    title: "Merayakan Kelulusan & Gelar Sarjana Alifa",
    tagline:
      "Sebuah persembahan bangga atas setiap tetes keringat, malam-malam panjang bimbingan skripsi, dan tekad baja hingga toga ini tersemat indah di kepalamu.",
    heroImage:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80",
    graduationDate: "2026-09-21",

    capTitle: "Pelepasan Toga & Sorak Kemenangan",
    capPrompt: "Tekan tombol di bawah untuk melambungkan toga kelulusanmu ke angkasa!",
    secretToastMessage:
      "Selamat melangkah ke dunia nyata, Sarjana! Kami percaya kamu akan menaklukkan setiap tantangan dengan penuh integritas, keberanian, dan senyuman bangga. Pintu masa depan yang gilang-gemilang kini terbuka lebar untukmu! 🎓✨",

    totalCredits: "144 SKS",
    studyDuration: "3.5 Tahun",
    thesisTitle:
      "Penerapan Algoritma Deep Learning untuk Deteksi Dini Penyakit Tanaman Pangan Berbasis Citra Multispektral",
    milestoneTitle: "Jejak Langkah & Perjuangan Menuju Toga",
    milestone1Year: "2022",
    milestone1Title: "Awal Langkah Mahasiswa Baru",
    milestone1Desc:
      "Menginjakkan kaki pertama kali di gerbang kampus dengan mimpi besar dan tekad membanggakan keluarga.",
    milestone2Year: "2025",
    milestone2Title: "Ujian Sidang Skripsi Tuntas",
    milestone2Desc:
      "Menyajikan hasil riset di hadapan dewan penguji dengan penuh percaya diri dan meraih nilai A bulat.",
    milestone3Year: "2026",
    milestone3Title: "Pelantikan & Pengukuhan Gelar Resmi",
    milestone3Desc:
      "Toga dipindahkan dari kiri ke kanan, menandai lahirnya seorang intelektual muda yang siap memberi dampak nyata.",

    galleryTitle: "Galeri Kenangan Kampus & Momen Wisuda",
    gallerySubtitle:
      "Dokumentasi senyum kebersamaan, bimbingan dosen, dan pelukan hangat keluarga tercinta.",
    galleryImg1:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
    galleryCaption1: "Senyum bangga setelah prosesi pemindahan kuncir toga",
    galleryDate1: "Gedung Samantha Krida, 2026",
    galleryImg2:
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
    galleryCaption2: "Pelukan hangat orang tua tercinta",
    galleryDate2: "Halaman Rektorat, 2026",
    galleryImg3:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
    galleryCaption3: "Sahabat seperjuangan dari semester satu",
    galleryDate3: "Gedung FILKOM, 2026",
    galleryImg4:
      "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=800&q=80",
    galleryCaption4: "Hari penuh haru setelah pengumuman kelulusan sidang",
    galleryDate4: "Ruang Sidang Utama, 2025",
    galleryImg5:
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80",
    galleryCaption5: "Diskusi proyek akhir di perpustakaan kampus",
    galleryDate5: "Perpustakaan Pusat, 2025",
    galleryImg6:
      "https://images.unsplash.com/photo-1525921429624-479b6a26d84d?auto=format&fit=crop&w=800&q=80",
    galleryCaption6: "Buket bunga dan doa terbaik dari rekan-rekan",
    galleryDate6: "Boulevard Kampus, 2026",

    wishesTitle: "Empat Doa Terbaik untuk Langkah Masa Depanmu",
    wish1:
      "Semoga langkah awal kariermu dibukakan pintu kesempatan terbaik dan menemukan tempat berkarya yang menghargai potensimu.",
    wish2:
      "Semoga ilmu yang diperoleh menjadi berkah yang bermanfaat luas, serta senantiasa memegang teguh integritas dan kejujuran.",
    wish3:
      "Semoga selalu dilimpahi kesehatan raga, ketenangan batin, serta kecukupan rezeki yang halal dan melimpah.",
    wish4:
      "Semoga setiap impian besar yang kamu tuju selalu didekatkan dan diberi kelancaran oleh Tuhan Yang Maha Esa.",

    quote:
      "Yang sulit itu memulai, yang luar biasa itu menuntaskan. Dan hari ini, kamu telah membuktikannya kepada dunia.",
    message:
      "Alifa putri kami tersayang,\n\nKami masih ingat betul hari pertama kamu melangkah masuk ke gerbang universitas dengan tas ransel dan mata yang berbinar penuh rasa ingin tahu.\n\nKami tahu betul perjuanganmu tidaklah mudah. Ada malam-malam panjang di mana kamu harus menukar waktu tidurmu dengan cangkir kopi demi menyelesaikan revisi skripsi. Ada saat-saat kamu merasa lelah, namun kamu memilih untuk tetap bangun dan melangkah maju.\n\nHari ini, saat melihat kuncir togamu dipindahkan dan namamu dipanggil dengan gelar Sarjana Komputer di belakangnya, dada kami bergemuruh penuh haru dan rasa bangga yang teramat dalam.\n\nGelar ini bukan sekadar huruf di belakang namamu, melainkan bukti nyata dari ketekunan, kejujuran, dan kegigihanmu. Melangkahlah ke dunia luar dengan kepala tegak. Apa pun yang kamu tuju setelah ini, restu dan doa kami akan selalu menyertaimu di setiap hembusan nafas.",
    signature: "Dengan cinta & rasa bangga tak terhingga, Ayah & Ibu",
    letterDate: "2026-09-21",
    musicTitle: "",
    bgMusicUrl: "",
  },
};
