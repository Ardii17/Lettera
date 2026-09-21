import type { TemplateMeta } from "../types";

export const grandLaureateTemplate: TemplateMeta = {
  slug: "grand-laureate",
  name: "Grand Laureate",
  category: "Pencapaian",
  description:
    "Piagam penganugerahan kehormatan akademik dan prestasi tertinggi berstandar internasional. Menampilkan piagam Vanguard Citation, pidato kehormatan Commencement Keynote, 4 babak penempaan diri (Epochs of Mastery), 3 medali kehormatan emas interaktif, 4 peta kompas masa depan, serta interaksi Standing Ovation & simfoni kemenangan.",
  tagline: "The Grand Laureate: Penganugerahan Kehormatan Tertinggi atas Dedikasi & Kemenangan",
  cardAccent: "border-amber-500/40 bg-gradient-to-br from-slate-950 via-blue-950 to-amber-950/40 text-amber-200",
  highlights: [
    "Piagam Penganugerahan Kehormatan Vanguard Citation & Segel Emas Timbul",
    "Surat Pidato Penghargaan Commencement Keynote di Kertas Vellum Gading",
    "4 Babak Penempaan Diri & Terobosan Studi (Epochs of Mastery)",
    "3 Medali Kehormatan Emas Interaktif (Triptych of Distinction)",
    "4 Peta Arah Masa Depan & Doa Langkah Baru (Grand Horizons)",
    "Interaksi Standing Ovation dengan Hujan Konfeti & Simfoni Kemenangan",
  ],
  fields: [
    // Section 1: Piagam Kehormatan
    {
      name: "recipientName",
      label: "Nama Tokoh Berprestasi / Wisudawan",
      type: "text",
      placeholder: "Aria Raditya, S.T., M.Sc.",
      required: true,
      isRecipient: true,
      section: "Piagam Kehormatan",
    },
    {
      name: "senderName",
      label: "Nama Penganugerah / Keluarga / Mentor",
      type: "text",
      placeholder: "Keluarga Besar & Dewan Penguji",
      required: true,
      section: "Piagam Kehormatan",
    },
    {
      name: "registryId",
      label: "Nomor Registri Laureate",
      type: "text",
      placeholder: "LAUR-2024-OX",
      defaultValue: "LAUR-2024-OX",
      section: "Piagam Kehormatan",
    },
    {
      name: "conferredTitle",
      label: "Gelar / Penghargaan yang Diraih",
      type: "text",
      placeholder: "Master of Science in Artificial Intelligence with Highest Distinction",
      defaultValue: "Master of Science in Artificial Intelligence with Highest Distinction",
      section: "Piagam Kehormatan",
    },
    {
      name: "institutionName",
      label: "Institusi / Universitas Almamater",
      type: "text",
      placeholder: "Faculty of Informatics & Advanced Engineering",
      defaultValue: "Faculty of Informatics & Advanced Engineering",
      section: "Piagam Kehormatan",
    },
    {
      name: "conferralDate",
      label: "Tanggal Penganugerahan / Wisuda",
      type: "text",
      placeholder: "28 September 2024",
      defaultValue: "28 September 2024",
      section: "Piagam Kehormatan",
    },
    {
      name: "citationTitle",
      label: "Judul Piagam Sitasi",
      type: "text",
      placeholder: "The Vanguard Fellowship Citation",
      defaultValue: "The Vanguard Fellowship Citation",
      section: "Piagam Kehormatan",
    },
    {
      name: "citationSummary",
      label: "Ringkasan Surat Keputusan Dewan Penganugerah",
      type: "textarea",
      placeholder: "Keputusan resmi dewan...",
      defaultValue:
        "Dianugerahkan dengan kehormatan tertinggi atas ketekunan riset tanpa lelah, keunggulan akademik yang gemilang, dan komitmen moral untuk mendedikasikan ilmu bagi kemanusiaan.",
      rows: 2,
      section: "Piagam Kehormatan",
    },

    // Section 2: Surat Pidato Kehormatan Utama
    {
      name: "salutation",
      label: "Salam Pembuka Pidato",
      type: "text",
      placeholder: "Kepada Sang Juara yang Kami Banggakan,",
      defaultValue: "Kepada Sang Juara yang Kami Banggakan,",
      section: "Pidato Kehormatan",
    },
    {
      name: "message",
      label: "Isi Pidato Apresiasi & Kebanggaan",
      type: "textarea",
      placeholder: "Tuliskan ungkapan kebanggaan terdalam...",
      rows: 7,
      required: true,
      defaultValue:
        "Gelar yang kau sandang hari ini bukanlah sekadar rangkaian huruf di belakang namamu. Gelar itu adalah prasasti dari ribuan jam yang kau habiskan saat dunia terlelap, air mata yang kau usap dalam hening, dan tekad baja yang menolak menyerah di hadapan kegagalan.\n\nKami menyaksikan bagaimana setiap rintangan tidak pernah mengecilkan nyalimu, melainkan menempa jiwamu menjadi semakin tangguh dan arif. Dunia di luar sana sedang menanti pemikiran brilian dan sentuhan nuranimu.\n\nMelangkahlah dengan kepala tegak, namun tetaplah membumi dengan kerendahan hati. Kami berdiri di sini dengan dada penuh rasa bangga dan doa tak terputus untuk setiap kejayaan yang akan kau ukir di masa depan.",
      section: "Pidato Kehormatan",
    },
    {
      name: "signoff",
      label: "Salam Penutup Pidato",
      type: "text",
      placeholder: "Dengan rasa bangga dan cinta yang tak terhingga,",
      defaultValue: "Dengan rasa bangga dan cinta yang tak terhingga,",
      section: "Pidato Kehormatan",
    },
    {
      name: "sealText",
      label: "Motto pada Lencana Segel",
      type: "text",
      placeholder: "VERITAS ET EXCELLENTIA",
      defaultValue: "VERITAS ET EXCELLENTIA",
      maxLength: 30,
      section: "Pidato Kehormatan",
    },

    // Section 3: 4 Babak Penempaan Diri (Epochs of Mastery)
    {
      name: "epoch1_title",
      label: "Babak 1: Judul Babak",
      type: "text",
      defaultValue: "The Genesis of Inquiry (Awal Keberanian)",
      section: "Babak Penempaan",
    },
    {
      name: "epoch1_period",
      label: "Babak 1: Periode Waktu",
      type: "text",
      defaultValue: "Tahun Pertama • Menemukan Percikan",
      section: "Babak Penempaan",
    },
    {
      name: "epoch1_breakthrough",
      label: "Babak 1: Titik Balik",
      type: "text",
      defaultValue: "Memilih topik penelitian tersulit yang dihindari banyak orang",
      section: "Babak Penempaan",
    },
    {
      name: "epoch1_narrative",
      label: "Babak 1: Narasi Perjuangan",
      type: "textarea",
      defaultValue:
        "Langkah pertama dimulai dengan rasa cemas namun sarat rasa penasaran. Kau tidak memilih jalan yang mudah, melainkan jalur yang menuntut disiplin mutlak.",
      rows: 2,
      section: "Babak Penempaan",
    },

    {
      name: "epoch2_title",
      label: "Babak 2: Judul Babak",
      type: "text",
      defaultValue: "The Midnight Crucible (Kawah Penempaan Diri)",
      section: "Babak Penempaan",
    },
    {
      name: "epoch2_period",
      label: "Babak 2: Periode Waktu",
      type: "text",
      defaultValue: "Tahun Kedua & Ketiga • Ketahanan Mental",
      section: "Babak Penempaan",
    },
    {
      name: "epoch2_breakthrough",
      label: "Babak 2: Titik Balik",
      type: "text",
      defaultValue: "Eksperimen ke-47 yang akhirnya menunjukkan hasil hipotesis valid",
      section: "Babak Penempaan",
    },
    {
      name: "epoch2_narrative",
      label: "Babak 2: Narasi Perjuangan",
      type: "textarea",
      defaultValue:
        "Malam-malam panjang di depan layar, ratusan revisi, dan rasa lelah yang menguji komitmen. Di kawah penempaan inilah karakter sang juara benar-benar terbentuk.",
      rows: 2,
      section: "Babak Penempaan",
    },

    {
      name: "epoch3_title",
      label: "Babak 3: Judul Babak",
      type: "text",
      defaultValue: "The Defense of the Masterwork (Ujian Sang Master)",
      section: "Babak Penempaan",
    },
    {
      name: "epoch3_period",
      label: "Babak 3: Periode Waktu",
      type: "text",
      defaultValue: "Semester Akhir • Sidang Terbuka",
      section: "Babak Penempaan",
    },
    {
      name: "epoch3_breakthrough",
      label: "Babak 3: Titik Balik",
      type: "text",
      defaultValue: "Apresiasi bulat dan pujian langsung dari dewan profesor penguji",
      section: "Babak Penempaan",
    },
    {
      name: "epoch3_narrative",
      label: "Babak 3: Narasi Perjuangan",
      type: "textarea",
      defaultValue:
        "Berdiri dengan keyakinan penuh memaparkan karya inovatif di hadapan dewan ahli. Setiap argumen kau pertahankan dengan tajam, anggun, dan berbobot.",
      rows: 2,
      section: "Babak Penempaan",
    },

    {
      name: "epoch4_title",
      label: "Babak 4: Judul Babak",
      type: "text",
      defaultValue: "The Conferred Laurels (Penobatan Kemenangan)",
      section: "Babak Penempaan",
    },
    {
      name: "epoch4_period",
      label: "Babak 4: Periode Waktu",
      type: "text",
      defaultValue: "Hari Wisuda • Puncak Kehormatan",
      section: "Babak Penempaan",
    },
    {
      name: "epoch4_breakthrough",
      label: "Babak 4: Titik Balik",
      type: "text",
      defaultValue: "Pengalungan medali kehormatan & senyum bangga orang-orang tercinta",
      section: "Babak Penempaan",
    },
    {
      name: "epoch4_narrative",
      label: "Babak 4: Narasi Perjuangan",
      type: "textarea",
      defaultValue:
        "Tepuk tangan bergemuruh menyambut namamu yang dipanggil ke atas panggung. Bukti sahih bahwa keringat dan doa tak pernah berkhianat pada hasil.",
      rows: 2,
      section: "Babak Penempaan",
    },

    // Section 4: 3 Medali Kehormatan
    {
      name: "medal1_title",
      label: "Medali 1: Nama Medali",
      type: "text",
      defaultValue: "Insignia of Intellectual Tenacity",
      section: "Medali Kehormatan",
    },
    {
      name: "medal1_virtue",
      label: "Medali 1: Nilai Kebajikan",
      type: "text",
      defaultValue: "Ketangguhan Mental & Konsistensi Ekstrem",
      section: "Medali Kehormatan",
    },
    {
      name: "medal1_citation",
      label: "Medali 1: Kutipan Penghargaan",
      type: "textarea",
      defaultValue: "Dianugerahkan atas kemampuan bangkit dari kegagalan eksperimen tanpa kehilangan antusiasme sedikit pun.",
      rows: 2,
      section: "Medali Kehormatan",
    },

    {
      name: "medal2_title",
      label: "Medali 2: Nama Medali",
      type: "text",
      defaultValue: "Order of Creative Brilliance",
      section: "Medali Kehormatan",
    },
    {
      name: "medal2_virtue",
      label: "Medali 2: Nilai Kebajikan",
      type: "text",
      defaultValue: "Orisinalitas Visi & Solusi Inovatif",
      section: "Medali Kehormatan",
    },
    {
      name: "medal2_citation",
      label: "Medali 2: Kutipan Penghargaan",
      type: "textarea",
      defaultValue: "Dianugerahkan atas keberanian merumuskan perspektif baru yang mendobrak kebiasaan lama dan membuka jalan terang.",
      rows: 2,
      section: "Medali Kehormatan",
    },

    {
      name: "medal3_title",
      label: "Medali 3: Nama Medali",
      type: "text",
      defaultValue: "Crown of Noble Character",
      section: "Medali Kehormatan",
    },
    {
      name: "medal3_virtue",
      label: "Medali 3: Nilai Kebajikan",
      type: "text",
      defaultValue: "Integritas Moral & Kerendahan Hati",
      section: "Medali Kehormatan",
    },
    {
      name: "medal3_citation",
      label: "Medali 3: Kutipan Penghargaan",
      type: "textarea",
      defaultValue: "Dianugerahkan karena setinggi apa pun kecerdasan yang dicapai, kebaikan hati dan kepedulian pada sesama selalu menjadi kompas utama.",
      rows: 2,
      section: "Medali Kehormatan",
    },

    // Section 5: 4 Grand Horizons
    {
      name: "horizon1_title",
      label: "Kompas 1: Judul",
      type: "text",
      defaultValue: "The Fellowship of Mastery",
      section: "Peta Masa Depan",
    },
    {
      name: "horizon1_desc",
      label: "Kompas 1: Doa & Panduan",
      type: "textarea",
      defaultValue: "Semoga ilmu yang kau genggam terus bertambah tajam, membimbingmu menjadi pemimpin terdepan yang disegani di bidang keahlianmu.",
      rows: 2,
      section: "Peta Masa Depan",
    },

    {
      name: "horizon2_title",
      label: "Kompas 2: Judul",
      type: "text",
      defaultValue: "The Impact on Humanity",
      section: "Peta Masa Depan",
    },
    {
      name: "horizon2_desc",
      label: "Kompas 2: Doa & Panduan",
      type: "textarea",
      defaultValue: "Semoga setiap inovasi dan langkah profesionalmu memberi manfaat nyata, membuka lapangan harapan, dan meringankan beban sesama.",
      rows: 2,
      section: "Peta Masa Depan",
    },

    {
      name: "horizon3_title",
      label: "Kompas 3: Judul",
      type: "text",
      defaultValue: "The Unshakable Moral Compass",
      section: "Peta Masa Depan",
    },
    {
      name: "horizon3_desc",
      label: "Kompas 3: Doa & Panduan",
      type: "textarea",
      defaultValue: "Tetaplah berdiri kokoh di atas fondasi kejujuran dan etika luhur, tak tergiur jalan pintas saat menghadapi tantangan dunia nyata.",
      rows: 2,
      section: "Peta Masa Depan",
    },

    {
      name: "horizon4_title",
      label: "Kompas 4: Judul",
      type: "text",
      defaultValue: "The Joy of the Odyssey",
      section: "Peta Masa Depan",
    },
    {
      name: "horizon4_desc",
      label: "Kompas 4: Doa & Panduan",
      type: "textarea",
      defaultValue: "Nikmati setiap proses dan petualangan baru di depan sana. Rayakan hidup dengan rasa syukur, tawa bahagia, dan cinta keluarga.",
      rows: 2,
      section: "Peta Masa Depan",
    },

    // Colors & Audio
    {
      name: "primaryColor",
      label: "Warna Emas Kehormatan (Primary)",
      type: "color",
      defaultValue: "#caa64f",
      colorPresets: [
        { label: "Royal Burnished Gold", value: "#caa64f" },
        { label: "Champagne Laurel", value: "#dfc079" },
        { label: "Imperial Bronze", value: "#b58742" },
      ],
      section: "Palet Warna & Fanfare",
    },
    {
      name: "backgroundColor",
      label: "Warna Latar Belakang (Royal Navy)",
      type: "color",
      defaultValue: "#0b1526",
      colorPresets: [
        { label: "Stockholm Royal Navy", value: "#0b1526" },
        { label: "Oxford Deep Slate", value: "#101b2b" },
        { label: "Vanguard Midnight", value: "#070e1a" },
      ],
      section: "Palet Warna & Fanfare",
    },
    {
      name: "audioUrl",
      label: "URL Musik Simfoni Kemenangan",
      type: "text",
      placeholder: "https://example.com/triumph-orchestra.mp3",
      defaultValue: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_b28205efc4.mp3?filename=cinematic-orchestral-109068.mp3",
      helperText: "Format MP3 publik. Audio otomatis tidak aktif di katalog template.",
      section: "Palet Warna & Fanfare",
    },
  ],
  sample: {
    recipientName: "Aria Raditya, S.T., M.Sc.",
    senderName: "Keluarga Besar & Dewan Penguji Almamater",
    registryId: "LAUR-2024-OX",
    conferredTitle: "Master of Science in Artificial Intelligence with Highest Distinction",
    institutionName: "Faculty of Informatics & Advanced Engineering",
    conferralDate: "28 September 2024",
    citationTitle: "The Vanguard Fellowship Citation",
    citationSummary:
      "Dianugerahkan dengan kehormatan tertinggi atas ketekunan riset tanpa lelah, keunggulan akademik yang gemilang, dan komitmen moral untuk mendedikasikan ilmu bagi kemanusiaan.",
    salutation: "Kepada Sang Juara yang Kami Banggakan,",
    message:
      "Gelar yang kau sandang hari ini bukanlah sekadar rangkaian huruf di belakang namamu. Gelar itu adalah prasasti dari ribuan jam yang kau habiskan saat dunia terlelap, air mata yang kau usap dalam hening, dan tekad baja yang menolak menyerah di hadapan kegagalan.\n\nKami menyaksikan bagaimana setiap rintangan tidak pernah mengecilkan nyalimu, melainkan menempa jiwamu menjadi semakin tangguh dan arif. Dunia di luar sana sedang menanti pemikiran brilian dan sentuhan nuranimu.\n\nMelangkahlah dengan kepala tegak, namun tetaplah membumi dengan kerendahan hati. Kami berdiri di sini dengan dada penuh rasa bangga dan doa tak terputus untuk setiap kejayaan yang akan kau ukir di masa depan.",
    signoff: "Dengan rasa bangga dan cinta yang tak terhingga,",
    sealText: "VERITAS ET EXCELLENTIA",

    epoch1_title: "The Genesis of Inquiry (Awal Keberanian)",
    epoch1_period: "Tahun Pertama • Menemukan Percikan",
    epoch1_breakthrough: "Memilih topik penelitian tersulit yang dihindari banyak orang",
    epoch1_narrative:
      "Langkah pertama dimulai dengan rasa cemas namun sarat rasa penasaran. Kau tidak memilih jalan yang mudah, melainkan jalur yang menuntut disiplin mutlak.",

    epoch2_title: "The Midnight Crucible (Kawah Penempaan Diri)",
    epoch2_period: "Tahun Kedua & Ketiga • Ketahanan Mental",
    epoch2_breakthrough: "Eksperimen ke-47 yang akhirnya menunjukkan hasil hipotesis valid",
    epoch2_narrative:
      "Malam-malam panjang di depan layar, ratusan revisi, dan rasa lelah yang menguji komitmen. Di kawah penempaan inilah karakter sang juara benar-benar terbentuk.",

    epoch3_title: "The Defense of the Masterwork (Ujian Sang Master)",
    epoch3_period: "Semester Akhir • Sidang Terbuka",
    epoch3_breakthrough: "Apresiasi bulat dan pujian langsung dari dewan profesor penguji",
    epoch3_narrative:
      "Berdiri dengan keyakinan penuh memaparkan karya inovatif di hadapan dewan ahli. Setiap argumen kau pertahankan dengan tajam, anggun, dan berbobot.",

    epoch4_title: "The Conferred Laurels (Penobatan Kemenangan)",
    epoch4_period: "Hari Wisuda • Puncak Kehormatan",
    epoch4_breakthrough: "Pengalungan medali kehormatan & senyum bangga orang-orang tercinta",
    epoch4_narrative:
      "Tepuk tangan bergemuruh menyambut namamu yang dipanggil ke atas panggung. Bukti sahih bahwa keringat dan doa tak pernah berkhianat pada hasil.",

    medal1_title: "Insignia of Intellectual Tenacity",
    medal1_virtue: "Ketangguhan Mental & Konsistensi Ekstrem",
    medal1_citation:
      "Dianugerahkan atas kemampuan bangkit dari kegagalan eksperimen tanpa kehilangan antusiasme sedikit pun.",

    medal2_title: "Order of Creative Brilliance",
    medal2_virtue: "Orisinalitas Visi & Solusi Inovatif",
    medal2_citation:
      "Dianugerahkan atas keberanian merumuskan perspektif baru yang mendobrak kebiasaan lama dan membuka jalan terang.",

    medal3_title: "Crown of Noble Character",
    medal3_virtue: "Integritas Moral & Kerendahan Hati",
    medal3_citation:
      "Dianugerahkan karena setinggi apa pun kecerdasan yang dicapai, kebaikan hati dan kepedulian pada sesama selalu menjadi kompas utama.",

    horizon1_title: "The Fellowship of Mastery",
    horizon1_desc:
      "Semoga ilmu yang kau genggam terus bertambah tajam, membimbingmu menjadi pemimpin terdepan yang disegani di bidang keahlianmu.",

    horizon2_title: "The Impact on Humanity",
    horizon2_desc:
      "Semoga setiap inovasi dan langkah profesionalmu memberi manfaat nyata, membuka lapangan harapan, dan meringankan beban sesama.",

    horizon3_title: "The Unshakable Moral Compass",
    horizon3_desc:
      "Tetaplah berdiri kokoh di atas fondasi kejujuran dan etika luhur, tak tergiur jalan pintas saat menghadapi tantangan dunia nyata.",

    horizon4_title: "The Joy of the Odyssey",
    horizon4_desc:
      "Nikmati setiap proses dan petualangan baru di depan sana. Rayakan hidup dengan rasa syukur, tawa bahagia, dan cinta keluarga.",

    primaryColor: "#caa64f",
    backgroundColor: "#0b1526",
    audioUrl:
      "https://cdn.pixabay.com/download/audio/2022/03/15/audio_b28205efc4.mp3?filename=cinematic-orchestral-109068.mp3",
  },
};
