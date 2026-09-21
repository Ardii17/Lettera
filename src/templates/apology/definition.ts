import type { TemplateMeta } from "../types";
import {
  APOLOGY_COLOR_PRESETS,
  BACKGROUND_COLOR_PRESETS,
  CARD_COLOR_PRESETS,
  TEXT_COLOR_PRESETS,
} from "../color-presets";

export const apologyTemplate: TemplateMeta = {
  slug: "apology",
  name: "Sincere Apology & Reconciliation",
  category: "Permintaan Maaf",
  tagline:
    "Surat permintaan maaf dan rekonsiliasi tulus dengan pengakuan jujur, komitmen perbaikan, dan ruang bicara hangat.",
  description:
    "Sebuah ruang ungkapan penyesalan yang tenang, dewasa, dan mendalam. Dirancang dengan tipografi bernuansa teduh, pengakuan kesalahan yang jujur tanpa pembenaran, apresiasi hal berharga dalam hubungan, komitmen perbaikan nyata, dan tombol dialog damai.",
  cardAccent: "bg-teal-50 text-teal-700 ring-1 ring-teal-200",
  highlights: [
    "Tata letak surat reflektif yang tulus dan menenangkan",
    "Pengakuan jujur tanpa mencari alasan pembenaran diri",
    "Seksi hal berharga & kenangan yang tak ingin disia-siakan",
    "Tiga butir komitmen nyata untuk langkah perbaikan diri",
    "Tombol respon damai untuk memulai kembali dialog via WhatsApp",
    "Pemutar audio instrumental piano yang menenangkan jiwa",
  ],
  fields: [
    // --- SECTION: IDENTITAS & PEMBUKA ---
    {
      name: "recipientName",
      label: "Nama penerima maaf",
      type: "text",
      placeholder: "Dinda Maharani",
      required: true,
      maxLength: 60,
      isRecipient: true,
      section: "header",
    },
    {
      name: "senderName",
      label: "Nama kamu (pengirim)",
      type: "text",
      placeholder: "Fikri Ramadhan",
      required: true,
      maxLength: 60,
      section: "header",
    },
    {
      name: "title",
      label: "Judul surat",
      type: "text",
      placeholder: "Untuk Dinda, Dari Lubuk Hatiku yang Terdalam",
      required: true,
      maxLength: 100,
      section: "header",
    },
    {
      name: "quote",
      label: "Kutipan / Perenungan pembuka",
      type: "textarea",
      placeholder:
        "Memaafkan bukan berarti melupakan apa yang telah terjadi, melainkan memilih untuk tidak membiarkan luka masa lalu merusak ikatan yang berharga.",
      maxLength: 300,
      rows: 2,
      section: "header",
    },

    // --- SECTION: PESAN UTAMA & PENGAKUAN ---
    {
      name: "apologyOpening",
      label: "Salam & Paragraf pembuka",
      type: "textarea",
      placeholder:
        "Aku menulis pesan ini setelah banyak merenung dan menyadari betapa cerobohnya sikap dan perkataanku kemarin. Tidak ada alasan yang membenarkan rasa sakit yang kutimbulkan untukmu.",
      maxLength: 500,
      rows: 3,
      section: "message",
    },
    {
      name: "message",
      label: "Isi surat pengakuan & penyesalan utama",
      type: "textarea",
      placeholder:
        "Tuliskan seluruh isi penyesalan, kejujuran hatimu, dan pengakuan salah di sini...",
      helperText: "Pisahkan setiap paragraf dengan baris kosong untuk kerapian tampilan.",
      required: true,
      maxLength: 4000,
      rows: 9,
      section: "message",
    },

    // --- SECTION: HAL BERHARGA YANG DIAPRESIASI ---
    {
      name: "valuedAspectsTitle",
      label: "Judul seksi apresiasi",
      type: "text",
      placeholder: "Hal yang Sangat Kuhargai Darimu",
      maxLength: 80,
      section: "reflection",
    },
    {
      name: "valuedAspects",
      label: "Uraian hal berharga tentang penerima",
      type: "textarea",
      placeholder:
        "Kebaikan hatimu, kesabaranmu selama ini, dan bagaimana kamu selalu ada untukku adalah hal-hal yang sangat berharga dan tidak ingin kuhancurkan karena egoku.",
      maxLength: 1000,
      rows: 4,
      section: "reflection",
    },

    // --- SECTION: KOMITMEN PERBAIKAN DIRI ---
    {
      name: "commitmentTitle",
      label: "Judul komitmen perbaikan",
      type: "text",
      placeholder: "Langkah Nyata & Janjiku ke Depan",
      maxLength: 80,
      section: "promises",
    },
    {
      name: "promise1",
      label: "Komitmen 1",
      type: "text",
      placeholder: "Belajar lebih sabar dan sungguh-sungguh mendengarkan sebelum bereaksi.",
      maxLength: 180,
      section: "promises",
    },
    {
      name: "promise2",
      label: "Komitmen 2",
      type: "text",
      placeholder: "Menjaga batasan, menghormati perasaanmu, dan tidak mengabaikan sudut pandangmu.",
      maxLength: 180,
      section: "promises",
    },
    {
      name: "promise3",
      label: "Komitmen 3",
      type: "text",
      placeholder: "Berkomunikasi secara jujur dan terbuka tanpa membiarkan asumsi merusak segalanya.",
      maxLength: 180,
      section: "promises",
    },

    // --- SECTION: REKONSILIASI & PENUTUP ---
    {
      name: "senderPhone",
      label: "Nomor WhatsApp pengirim (opsional)",
      type: "text",
      placeholder: "6281234567890",
      helperText:
        "Gunakan format angka dengan kode negara (misal: 62812xxx) agar penerima dapat langsung membalas pesanmu.",
      maxLength: 20,
      section: "closing",
    },
    {
      name: "signature",
      label: "Tanda tangan penutup",
      type: "text",
      placeholder: "Dengan segenap ketulusan hati, Fikri",
      maxLength: 60,
      section: "closing",
    },
    {
      name: "letterDate",
      label: "Tanggal surat dibuat",
      type: "date",
      section: "closing",
    },

    // --- SECTION: TEMA & MUSIK ---
    {
      name: "primaryColor",
      label: "Warna aksen utama",
      type: "color",
      defaultValue: "#3b6e5b",
      helperText: "Warna tombol, garis hiasan, dan ornamen reflektif.",
      colorPresets: APOLOGY_COLOR_PRESETS,
      section: "theme",
    },
    {
      name: "backgroundColor",
      label: "Warna latar belakang surat",
      type: "color",
      defaultValue: "#f7f8f6",
      helperText: "Warna kanvas dasar halaman surat.",
      colorPresets: BACKGROUND_COLOR_PRESETS,
      section: "theme",
    },
    {
      name: "cardColor",
      label: "Warna kertas surat & wadah kartu",
      type: "color",
      defaultValue: "#ffffff",
      helperText: "Warna lembar kertas surat dan kotak komitmen.",
      colorPresets: CARD_COLOR_PRESETS,
      section: "theme",
    },
    {
      name: "textColor",
      label: "Warna teks judul",
      type: "color",
      defaultValue: "#20382e",
      helperText: "Warna judul besar dan nama penerima.",
      colorPresets: TEXT_COLOR_PRESETS,
      section: "theme",
    },
    {
      name: "bodyTextColor",
      label: "Warna teks isi surat",
      type: "color",
      defaultValue: "#3e5148",
      helperText: "Warna teks paragraf narasi.",
      colorPresets: TEXT_COLOR_PRESETS,
      section: "theme",
    },
    {
      name: "musicTitle",
      label: "Judul audio latar (opsional)",
      type: "text",
      placeholder: "Peaceful Piano Reflections",
      maxLength: 80,
      section: "theme",
    },
    {
      name: "bgMusicUrl",
      label: "Tautan audio latar (.mp3)",
      type: "text",
      placeholder: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3",
      helperText: "Tautan langsung ke file audio mp3 yang menenangkan.",
      maxLength: 1000,
      section: "theme",
    },
  ],
  sample: {
    recipientName: "Dinda Maharani",
    senderName: "Fikri Ramadhan",
    title: "Untuk Dinda, Dari Lubuk Hatiku yang Terdalam",
    quote:
      "Memaafkan bukan berarti melupakan apa yang telah terjadi, melainkan memilih untuk tidak membiarkan luka masa lalu merusak ikatan berharga yang kita miliki.",
    apologyOpening:
      "Aku menulis pesan ini setelah banyak merenung dan menyadari betapa cerobohnya sikap dan perkataanku tempo hari. Tidak ada pembenaran atas rasa kecewa dan sedih yang kutimbulkan di hatimu.",
    message:
      "Dinda, aku ingin meminta maaf secara tulus atas caraku memperlakukanmu kemarin. Dalam situasi itu, aku membiarkan emosi dan egoku mengambil alih, berbicara tanpa memikirkan bagaimana kalimat-kalimat itu akan melukai perasaanmu.\n\nAku sadar bahwa kata 'maaf' saja tidak akan otomatis menghapus rasa kecewa yang kamu rasakan. Namun, aku ingin kamu tahu bahwa penyesalan ini datang dari tempat yang paling jujur dalam diriku. Aku tidak ingin mencari alasan atau menyalahkan keadaan, karena kesalahan itu sepenuhnya ada padaku.\n\nHubungan baik dan kepercayaan yang telah kita bangun bersama jauh lebih berharga daripada apa pun. Kehilangan rasa nyaman di antara kita karena kecerobohanku sendiri adalah hal yang paling kusesali.",
    valuedAspectsTitle: "Hal yang Selalu Kupelajari & Kuhargai Darimu",
    valuedAspects:
      "Selama mengenalmu, ketulusan, kesabaran, dan caramu selalu mendengarkan orang lain adalah hal-hal yang selalu kukagumi. Kamu selalu memperlakukanku dengan penuh penghargaan, dan menyadari bahwa aku gagal membalasnya dengan kelembutan yang sama membuatku benar-benar tertampar. Aku sangat menghargai kehadiranmu dalam hidupku.",
    commitmentTitle: "Langkah Nyata & Janjiku ke Depan",
    promise1:
      "Belajar mengendalikan emosi, berhenti sejenak, dan sungguh-sungguh mendengarkan sudut pandangmu sebelum bereaksi.",
    promise2:
      "Menghargai batasan dan perasaanmu dengan penuh rasa hormat, tanpa meremehkan hal kecil yang kamu sampaikan.",
    promise3:
      "Berkomunikasi secara jujur, dewasa, dan terbuka tanpa membiarkan asumsi pribadi merusak kehangatan di antara kita.",
    senderPhone: "6281234567890",
    signature: "Dengan segenap ketulusan hati, Fikri",
    letterDate: "2026-09-21",
    primaryColor: "#3b6e5b",
    backgroundColor: "#f7f8f6",
    cardColor: "#ffffff",
    textColor: "#20382e",
    bodyTextColor: "#3e5148",
    musicTitle: "Peaceful Piano Reflections",
    bgMusicUrl:
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
};
