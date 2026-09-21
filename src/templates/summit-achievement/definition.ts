import type { TemplateMeta } from "../types";

export const summitAchievementTemplate: TemplateMeta = {
  slug: "summit-achievement",
  name: "Summit of Glory",
  category: "Pencapaian",
  description:
    "Piagam sertifikasi penaklukan puncak prestasi hidup bertema ekspedisi pegunungan alpine. Menampilkan plakat elevasi puncak 8,848 MDPL, surat catatan pendaki di atas awan, 4 pos ketinggian ekstrem (High-Altitude Camps), 3 artefak perlengkapan pendaki unggul, 4 cakrawala masa depan, serta interaksi menancapkan bendera kemenangan di puncak.",
  tagline: "The Summit of Glory: Penaklukan Puncak Prestasi & Ekspedisi Kemenangan Hidup",
  cardAccent: "border-cyan-500/40 bg-gradient-to-br from-slate-950 via-sky-950 to-blue-950 text-cyan-200",
  highlights: [
    "Plakat Sertifikasi Penaklukan Puncak & Elevasi Ketinggian Ekspedisi",
    "Surat Catatan Pendaki dari Atas Awan di Kertas Ekspedisi Tahan Cuaca",
    "4 Pos Ketinggian Ekstrem (Base Camp hingga Summit Ridge)",
    "3 Artefak Perlengkapan Pendaki Simbolis (Kompas, Kapak Es, & Tali Pengaman)",
    "4 Cakrawala Puncak Kehidupan Berikutnya (Horizons Beyond Clouds)",
    "Interaksi Menancapkan Bendera Kemenangan & Simfoni Alpine Megah",
  ],
  fields: [
    // Section 1: Sertifikasi Puncak
    {
      name: "recipientName",
      label: "Nama Pendaki Sang Juara (Wisudawan/Tokoh)",
      type: "text",
      placeholder: "Aria Danendra, S.T.",
      required: true,
      isRecipient: true,
      section: "Sertifikasi Puncak",
    },
    {
      name: "senderName",
      label: "Pimpinan Ekspedisi / Keluarga / Mentor",
      type: "text",
      placeholder: "Keluarga Besar & Tim Pendukung Ekspedisi",
      required: true,
      section: "Sertifikasi Puncak",
    },
    {
      name: "expeditionCode",
      label: "Kode Ekspedisi Alpine",
      type: "text",
      placeholder: "EXP-SUMMIT-2024-8848",
      defaultValue: "EXP-SUMMIT-2024-8848",
      section: "Sertifikasi Puncak",
    },
    {
      name: "summitElevation",
      label: "Elevasi Puncak yang Ditaklukkan",
      type: "text",
      placeholder: "8,848 MDPL",
      defaultValue: "8,848 MDPL",
      section: "Sertifikasi Puncak",
    },
    {
      name: "summitTitle",
      label: "Nama Puncak / Gelar Pencapaian",
      type: "text",
      placeholder: "Puncak Sarjana Teknik dengan Predikat Pujian",
      defaultValue: "Puncak Sarjana Teknik dengan Predikat Pujian",
      section: "Sertifikasi Puncak",
    },
    {
      name: "mountainRange",
      label: "Gugusan Pegunungan / Almamater",
      type: "text",
      placeholder: "The Alpine Ridge of Engineering & Innovation",
      defaultValue: "The Alpine Ridge of Engineering & Innovation",
      section: "Sertifikasi Puncak",
    },
    {
      name: "summitDate",
      label: "Tanggal Berhasil Menginjak Puncak",
      type: "text",
      placeholder: "28 September 2024",
      defaultValue: "28 September 2024",
      section: "Sertifikasi Puncak",
    },
    {
      name: "citationSummary",
      label: "Catatan Resmi Dewan Ekspedisi",
      type: "textarea",
      placeholder: "Catatan resmi penaklukan...",
      defaultValue:
        "Telah terbukti menaklukkan tebing terjal, menghadapi badai salju ketidakpastian, dan menginjakkan kaki di titik tertinggi dengan kehormatan mutlak.",
      rows: 2,
      section: "Sertifikasi Puncak",
    },

    // Section 2: Surat Catatan dari Puncak
    {
      name: "salutation",
      label: "Salam Pembuka Catatan",
      type: "text",
      placeholder: "Dari Titik Tertinggi di Atas Samudra Awan,",
      defaultValue: "Dari Titik Tertinggi di Atas Samudra Awan,",
      section: "Catatan dari Puncak",
    },
    {
      name: "message",
      label: "Isi Surat Kemenangan Ekspedisi",
      type: "textarea",
      placeholder: "Tuliskan ungkapan kebanggaan mendalam...",
      rows: 7,
      required: true,
      defaultValue:
        "Saat kau berdiri di titik tertinggi hari ini, pandanglah ke bawah. Lihatlah jurang-jurang terjal dan jalur berliku yang pernah membuat kakimu gemetar. Kau pernah merasa ingin berbalik arah saat badai salju kegagalan menutup jarak pandang, namun langkahmu menolak menyerah.\n\nSetiap malam dingin tanpa tidur di pos peristirahatan, setiap lembar tugas akhir yang kau panggul selayaknya ransel berat di punggung, kini terbayar lunas. Langit biru tak bertepi menyambutmu dengan penuh rasa hormat.\n\nIngatlah bahwa puncak bukanlah akhir dari segalanya, melainkan tempat beristirahat sejenak untuk mensyukuri cinta orang-orang yang setia memegang tali pengamanmu dari bawah. Bernapaslah dalam-dalam, hirup udara kemenanganmu!",
      section: "Catatan dari Puncak",
    },
    {
      name: "signoff",
      label: "Salam Penutup",
      type: "text",
      placeholder: "Dengan rasa bangga dan cinta setinggi langit,",
      defaultValue: "Dengan rasa bangga dan cinta setinggi langit,",
      section: "Catatan dari Puncak",
    },
    {
      name: "sealText",
      label: "Motto Lencana Ekspedisi",
      type: "text",
      placeholder: "ALTISSIMA PETE (Raihlah yang Tertinggi)",
      defaultValue: "ALTISSIMA PETE",
      maxLength: 30,
      section: "Catatan dari Puncak",
    },

    // Section 3: 4 Pos Ketinggian Ekstrem
    {
      name: "camp1_title",
      label: "Pos 1: Nama Pos",
      type: "text",
      defaultValue: "Base Camp: The Inception of Grit",
      section: "Pos Pendakian",
    },
    {
      name: "camp1_elevation",
      label: "Pos 1: Ketinggian",
      type: "text",
      defaultValue: "Elev. 2,500 MDPL • Tahun Pertama",
      section: "Pos Pendakian",
    },
    {
      name: "camp1_challenge",
      label: "Pos 1: Rintangan Medan",
      type: "text",
      defaultValue: "Menata ransel impian dan melangkah di jalur terjal yang asing",
      section: "Pos Pendakian",
    },
    {
      name: "camp1_narrative",
      label: "Pos 1: Catatan Perjalanan",
      type: "textarea",
      defaultValue:
        "Langkah awal dimulai dengan keberanian meninggalkan zona nyaman. Kau mengikat tali sepatu bot pendakian dan menatap puncak di kejauhan dengan penuh tekad.",
      rows: 2,
      section: "Pos Pendakian",
    },

    {
      name: "camp2_title",
      label: "Pos 2: Nama Pos",
      type: "text",
      defaultValue: "Camp I: The Khumbu Icefall",
      section: "Pos Pendakian",
    },
    {
      name: "camp2_elevation",
      label: "Pos 2: Ketinggian",
      type: "text",
      defaultValue: "Elev. 5,300 MDPL • Tahun Kedua",
      section: "Pos Pendakian",
    },
    {
      name: "camp2_challenge",
      label: "Pos 2: Rintangan Medan",
      type: "text",
      defaultValue: "Melintasi retakan jurang es mata kuliah dan praktikum terberat",
      section: "Pos Pendakian",
    },
    {
      name: "camp2_narrative",
      label: "Pos 2: Catatan Perjalanan",
      type: "textarea",
      defaultValue:
        "Medan berbahaya menguji fokus dan keseimbangan mental. Di sinilah mental seorang penjelajah sejati diuji: tidak goyah meski dinding es runtuh di sekeliling.",
      rows: 2,
      section: "Pos Pendakian",
    },

    {
      name: "camp3_title",
      label: "Pos 3: Nama Pos",
      type: "text",
      defaultValue: "Camp II: The Death Zone of Tenacity",
      section: "Pos Pendakian",
    },
    {
      name: "camp3_elevation",
      label: "Pos 3: Ketinggian",
      type: "text",
      defaultValue: "Elev. 7,900 MDPL • Tahun Terakhir",
      section: "Pos Pendakian",
    },
    {
      name: "camp3_challenge",
      label: "Pos 3: Rintangan Medan",
      type: "text",
      defaultValue: "Menghadapi tipisnya oksigen waktu saat pengerjaan tugas akhir skripsi",
      section: "Pos Pendakian",
    },
    {
      name: "camp3_narrative",
      label: "Pos 3: Catatan Perjalanan",
      type: "textarea",
      defaultValue:
        "Zona paling berbahaya di mana kelelahan fisik mencapai puncak. Tapi kau bertahan dengan tabung oksigen doa dan ketekunan yang tak tergoyahkan.",
      rows: 2,
      section: "Pos Pendakian",
    },

    {
      name: "camp4_title",
      label: "Pos 4: Nama Pos",
      type: "text",
      defaultValue: "Summit Ridge: The Final Ridge to Glory",
      section: "Pos Pendakian",
    },
    {
      name: "camp4_elevation",
      label: "Pos 4: Ketinggian",
      type: "text",
      defaultValue: "Elev. 8,848 MDPL • Hari Kelulusan",
      section: "Pos Pendakian",
    },
    {
      name: "camp4_challenge",
      label: "Pos 4: Rintangan Medan",
      type: "text",
      defaultValue: "Sidang akhir terbuka dan melangkah ke panggung penobatan",
      section: "Pos Pendakian",
    },
    {
      name: "camp4_narrative",
      label: "Pos 4: Catatan Perjalanan",
      type: "textarea",
      defaultValue:
        "Sinar fajar keemasan menyambut langkah kakimu yang kokoh di puncak tertinggi. Bendera kebanggaan berkibar di bawah decak kagum semesta.",
      rows: 2,
      section: "Pos Pendakian",
    },

    // Section 4: 3 Artefak Pendaki Unggul
    {
      name: "artifact1_name",
      label: "Artefak 1: Nama Alat",
      type: "text",
      defaultValue: "The Brass Compass of Integrity",
      section: "Perlengkapan Pendaki",
    },
    {
      name: "artifact1_virtue",
      label: "Artefak 1: Nilai Kebajikan",
      type: "text",
      defaultValue: "Arah Moral yang Tak Pernah Tersesat",
      section: "Perlengkapan Pendaki",
    },
    {
      name: "artifact1_note",
      label: "Artefak 1: Catatan Penggunaan",
      type: "textarea",
      defaultValue: "Saat badai kabut tebal meragukan arah langkah, kompas kejujuran selalu membimbing ke jalur yang benar.",
      rows: 2,
      section: "Perlengkapan Pendaki",
    },

    {
      name: "artifact2_name",
      label: "Artefak 2: Nama Alat",
      type: "text",
      defaultValue: "The Forged Ice Axe of Resilience",
      section: "Perlengkapan Pendaki",
    },
    {
      name: "artifact2_virtue",
      label: "Artefak 2: Nilai Kebajikan",
      type: "text",
      defaultValue: "Ketajaman Pikiran & Ketahanan Ekstrem",
      section: "Perlengkapan Pendaki",
    },
    {
      name: "artifact2_note",
      label: "Artefak 2: Catatan Penggunaan",
      type: "textarea",
      defaultValue: "Memahat pijakan kokoh di atas dinding tebing keputusasaan, mengubah setiap batu sandungan menjadi anak tangga kemenangan.",
      rows: 2,
      section: "Perlengkapan Pendaki",
    },

    {
      name: "artifact3_name",
      label: "Artefak 3: Nama Alat",
      type: "text",
      defaultValue: "The Lifeline Climbing Rope",
      section: "Perlengkapan Pendaki",
    },
    {
      name: "artifact3_virtue",
      label: "Artefak 3: Nilai Kebajikan",
      type: "text",
      defaultValue: "Jalinan Doa & Kasih Keluarga",
      section: "Perlengkapan Pendaki",
    },
    {
      name: "artifact3_note",
      label: "Artefak 3: Catatan Penggunaan",
      type: "textarea",
      defaultValue: "Tali keselamatan yang terikat erat dari dasar lembah, menahanmu setiap kali langkahmu goyah dan menarikmu kembali tegak.",
      rows: 2,
      section: "Perlengkapan Pendaki",
    },

    // Section 5: 4 Cakrawala Masa Depan
    {
      name: "horizon1_title",
      label: "Puncak 1: Nama Cakrawala",
      type: "text",
      defaultValue: "The Ridge of Professional Mastery",
      section: "Cakrawala Masa Depan",
    },
    {
      name: "horizon1_desc",
      label: "Puncak 1: Visi & Doa",
      type: "textarea",
      defaultValue: "Menaklukkan dunia profesional nyata dengan integritas dan keahlian mendalam, menjadi pelopor di bidang keilmuanmu.",
      rows: 2,
      section: "Cakrawala Masa Depan",
    },

    {
      name: "horizon2_title",
      label: "Puncak 2: Nama Cakrawala",
      type: "text",
      defaultValue: "The Valley of Generosity",
      section: "Cakrawala Masa Depan",
    },
    {
      name: "horizon2_desc",
      label: "Puncak 2: Visi & Doa",
      type: "textarea",
      defaultValue: "Membawa mata air ilmu dari puncak tertinggi untuk menyuburkan lembah, memberi manfaat nyata dan mengangkat derajat sesama.",
      rows: 2,
      section: "Cakrawala Masa Depan",
    },

    {
      name: "horizon3_title",
      label: "Puncak 3: Nama Cakrawala",
      type: "text",
      defaultValue: "The Summit of Inner Peace",
      section: "Cakrawala Masa Depan",
    },
    {
      name: "horizon3_desc",
      label: "Puncak 3: Visi & Doa",
      type: "textarea",
      defaultValue: "Menjaga kerendahan hati dan kedamaian batin, menyadari bahwa semakin tinggi sebuah puncak, semakin sejuk jiwa yang memandangnya.",
      rows: 2,
      section: "Cakrawala Masa Depan",
    },

    {
      name: "horizon4_title",
      label: "Puncak 4: Nama Cakrawala",
      type: "text",
      defaultValue: "The Infinite Alpine Horizon",
      section: "Cakrawala Masa Depan",
    },
    {
      name: "horizon4_desc",
      label: "Puncak 4: Visi & Doa",
      type: "textarea",
      defaultValue: "Tak pernah takut bermimpi lebih tinggi, karena kini kau tahu di dalam dirimu terdapat kekuatan untuk mendaki gunung apa pun.",
      rows: 2,
      section: "Cakrawala Masa Depan",
    },

    // Colors & Audio
    {
      name: "primaryColor",
      label: "Warna Es Glasial (Glacier Cyan)",
      type: "color",
      defaultValue: "#38bdf8",
      colorPresets: [
        { label: "Glacier Ice Cyan", value: "#38bdf8" },
        { label: "Alpine Sky Blue", value: "#0ea5e9" },
        { label: "Arctic Frost", value: "#67e8f9" },
      ],
      section: "Palet Warna & Audio",
    },
    {
      name: "secondaryColor",
      label: "Warna Emas Puncak (Summit Amber)",
      type: "color",
      defaultValue: "#f59e0b",
      colorPresets: [
        { label: "Alpine Dawn Gold", value: "#f59e0b" },
        { label: "Campfire Flame", value: "#ea580c" },
        { label: "High Altitude Brass", value: "#d97706" },
      ],
      section: "Palet Warna & Audio",
    },
    {
      name: "backgroundColor",
      label: "Warna Latar Belakang (Alpine Twilight)",
      type: "color",
      defaultValue: "#08111e",
      colorPresets: [
        { label: "Glacier Twilight Navy", value: "#08111e" },
        { label: "High Ridge Slate", value: "#0f172a" },
        { label: "Midnight Peak", value: "#050b14" },
      ],
      section: "Palet Warna & Audio",
    },
    {
      name: "audioUrl",
      label: "URL Musik Simfoni Pegunungan (Fanfare)",
      type: "text",
      placeholder: "https://example.com/alpine-epic.mp3",
      defaultValue: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=epic-cinematic-trailer-116035.mp3",
      helperText: "Format MP3 publik. Audio otomatis tidak aktif di thumbnail katalog template.",
      section: "Palet Warna & Audio",
    },
  ],
  sample: {
    recipientName: "Aria Danendra, S.T.",
    senderName: "Keluarga Besar & Tim Pendukung Ekspedisi",
    expeditionCode: "EXP-SUMMIT-2024-8848",
    summitElevation: "8,848 MDPL",
    summitTitle: "Puncak Sarjana Teknik dengan Predikat Pujian",
    mountainRange: "The Alpine Ridge of Engineering & Innovation",
    summitDate: "28 September 2024",
    citationSummary:
      "Telah terbukti menaklukkan tebing terjal, menghadapi badai salju ketidakpastian, dan menginjakkan kaki di titik tertinggi dengan kehormatan mutlak.",
    salutation: "Dari Titik Tertinggi di Atas Samudra Awan,",
    message:
      "Saat kau berdiri di titik tertinggi hari ini, pandanglah ke bawah. Lihatlah jurang-jurang terjal dan jalur berliku yang pernah membuat kakimu gemetar. Kau pernah merasa ingin berbalik arah saat badai salju kegagalan menutup jarak pandang, namun langkahmu menolak menyerah.\n\nSetiap malam dingin tanpa tidur di pos peristirahatan, setiap lembar tugas akhir yang kau panggul selayaknya ransel berat di punggung, kini terbayar lunas. Langit biru tak bertepi menyambutmu dengan penuh rasa hormat.\n\nIngatlah bahwa puncak bukanlah akhir dari segalanya, melainkan tempat beristirahat sejenak untuk mensyukuri cinta orang-orang yang setia memegang tali pengamanmu dari bawah. Bernapaslah dalam-dalam, hirup udara kemenanganmu!",
    signoff: "Dengan rasa bangga dan cinta setinggi langit,",
    sealText: "ALTISSIMA PETE",

    camp1_title: "Base Camp: The Inception of Grit",
    camp1_elevation: "Elev. 2,500 MDPL • Tahun Pertama",
    camp1_challenge: "Menata ransel impian dan melangkah di jalur terjal yang asing",
    camp1_narrative:
      "Langkah awal dimulai dengan keberanian meninggalkan zona nyaman. Kau mengikat tali sepatu bot pendakian dan menatap puncak di kejauhan dengan penuh tekad.",

    camp2_title: "Camp I: The Khumbu Icefall",
    camp2_elevation: "Elev. 5,300 MDPL • Tahun Kedua",
    camp2_challenge: "Melintasi retakan jurang es mata kuliah dan praktikum terberat",
    camp2_narrative:
      "Medan berbahaya menguji fokus dan keseimbangan mental. Di sinilah mental seorang penjelajah sejati diuji: tidak goyah meski dinding es runtuh di sekeliling.",

    camp3_title: "Camp II: The Death Zone of Tenacity",
    camp3_elevation: "Elev. 7,900 MDPL • Tahun Terakhir",
    camp3_challenge: "Menghadapi tipisnya oksigen waktu saat pengerjaan tugas akhir skripsi",
    camp3_narrative:
      "Zona paling berbahaya di mana kelelahan fisik mencapai puncak. Tapi kau bertahan dengan tabung oksigen doa dan ketekunan yang tak tergoyahkan.",

    camp4_title: "Summit Ridge: The Final Ridge to Glory",
    camp4_elevation: "Elev. 8,848 MDPL • Hari Kelulusan",
    camp4_challenge: "Sidang akhir terbuka dan melangkah ke panggung penobatan",
    camp4_narrative:
      "Sinar fajar keemasan menyambut langkah kakimu yang kokoh di puncak tertinggi. Bendera kebanggaan berkibar di bawah decak kagum semesta.",

    artifact1_name: "The Brass Compass of Integrity",
    artifact1_virtue: "Arah Moral yang Tak Pernah Tersesat",
    artifact1_note:
      "Saat badai kabut tebal meragukan arah langkah, kompas kejujuran selalu membimbing ke jalur yang benar.",

    artifact2_name: "The Forged Ice Axe of Resilience",
    artifact2_virtue: "Ketajaman Pikiran & Ketahanan Ekstrem",
    artifact2_note:
      "Memahat pijakan kokoh di atas dinding tebing keputusasaan, mengubah setiap batu sandungan menjadi anak tangga kemenangan.",

    artifact3_name: "The Lifeline Climbing Rope",
    artifact3_virtue: "Jalinan Doa & Kasih Keluarga",
    artifact3_note:
      "Tali keselamatan yang terikat erat dari dasar lembah, menahanmu setiap kali langkahmu goyah dan menarikmu kembali tegak.",

    horizon1_title: "The Ridge of Professional Mastery",
    horizon1_desc:
      "Menaklukkan dunia profesional nyata dengan integritas dan keahlian mendalam, menjadi pelopor di bidang keilmuanmu.",

    horizon2_title: "The Valley of Generosity",
    horizon2_desc:
      "Membawa mata air ilmu dari puncak tertinggi untuk menyuburkan lembah, memberi manfaat nyata dan mengangkat derajat sesama.",

    horizon3_title: "The Summit of Inner Peace",
    horizon3_desc:
      "Menjaga kerendahan hati dan kedamaian batin, menyadari bahwa semakin tinggi sebuah puncak, semakin sejuk jiwa yang memandangnya.",

    horizon4_title: "The Infinite Alpine Horizon",
    horizon4_desc:
      "Tak pernah takut bermimpi lebih tinggi, karena kini kau tahu di dalam dirimu terdapat kekuatan untuk mendaki gunung apa pun.",

    primaryColor: "#38bdf8",
    secondaryColor: "#f59e0b",
    backgroundColor: "#08111e",
    audioUrl:
      "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=epic-cinematic-trailer-116035.mp3",
  },
};
