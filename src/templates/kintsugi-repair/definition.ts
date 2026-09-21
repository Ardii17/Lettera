import type { TemplateMeta } from "../types";

export const kintsugiRepairTemplate: TemplateMeta = {
  slug: "kintsugi-repair",
  name: "Kintsugi Repair",
  category: "Permintaan Maaf",
  description:
    "Surat permohonan maaf dan rekonsiliasi dewasa berlandaskan filosofi Jepang kuno Kintsugi (金継ぎ). Menampilkan piagam pengakuan keretakan, surat penyesalan di atas kertas washi berstempel Hanko, 4 titik keretakan & refleksi jujur, 3 janji pernis emas perbaikan diri, 4 kenangan murni yang dijaga, serta interaksi merekatkan kembali bejana hati.",
  tagline: "Kintsugi: Seni Memperbaiki Hati yang Terluka dengan Ketulusan Emas",
  cardAccent: "border-amber-500/40 bg-gradient-to-br from-stone-950 via-neutral-900 to-amber-950 text-amber-200",
  highlights: [
    "Filosofi Kintsugi: Memperbaiki Hubungan yang Retak dengan Emas Ketulusan",
    "Surat Refleksi Penyesalan Terdalam di Atas Kertas Washi Berstempel Hanko",
    "4 Titik Keretakan & Pengakuan Kesalahan Tanpa Mencari Alasan Pembenaran",
    "3 Janji Pernis Emas (The Golden Lacquer) untuk Perbaikan Diri Nyata",
    "4 Kenangan & Nilai Murni yang Ingin Terus Dijaga Bersama",
    "Interaksi Merekatkan Keretakan Bejana Hati & Alunan Seruling Zen Shakuhachi",
  ],
  fields: [
    // Section 1: Pengakuan Keretakan
    {
      name: "recipientName",
      label: "Nama Penerima Maaf (Sosok yang Terluka)",
      type: "text",
      placeholder: "Laras Kirana",
      required: true,
      isRecipient: true,
      section: "Pengakuan Keretakan",
    },
    {
      name: "senderName",
      label: "Nama Pemohon Maaf (Pengirim)",
      type: "text",
      placeholder: "Dimas Suryaputra",
      required: true,
      section: "Pengakuan Keretakan",
    },
    {
      name: "restorationCode",
      label: "Kode Rekonsiliasi Kintsugi",
      type: "text",
      placeholder: "KINTSUGI-HEAL-2024",
      defaultValue: "KINTSUGI-HEAL-2024",
      section: "Pengakuan Keretakan",
    },
    {
      name: "vesselTitle",
      label: "Nama Ikatan yang Terluka",
      type: "text",
      placeholder: "The Vessel of Our Shared Heart & Trust",
      defaultValue: "The Vessel of Our Shared Heart & Trust",
      section: "Pengakuan Keretakan",
    },
    {
      name: "incidentDate",
      label: "Waktu / Momen Terjadinya Kesalahan",
      type: "text",
      placeholder: "Momen yang Menggores Hatimu",
      defaultValue: "Momen yang Menggores Hatimu",
      section: "Pengakuan Keretakan",
    },
    {
      name: "accountabilityNote",
      label: "Pernyataan Tanggung Jawab Tanpa Pembenaran",
      type: "textarea",
      placeholder: "Pernyataan tanggung jawab jujur...",
      defaultValue:
        "Aku mengakui kesalahanku sepenuhnya tanpa dalih pembelaan diri. Luka dan kekecewaan di hatimu adalah tanggung jawab moral yang ingin kuperbaiki dengan segenap kerendahan hati dan tindakan nyata.",
      rows: 2,
      section: "Pengakuan Keretakan",
    },

    // Section 2: Surat Washi Penyesalan
    {
      name: "salutation",
      label: "Salam Pembuka Surat",
      type: "text",
      placeholder: "Untukmu yang Hatiku Telah Lukai,",
      defaultValue: "Untukmu yang Hatiku Telah Lukai,",
      section: "Surat Washi",
    },
    {
      name: "message",
      label: "Isi Surat Refleksi & Penyesalan Mendalam",
      type: "textarea",
      placeholder: "Tuliskan penyesalan dan kejujuran dari lubuk hati terdalam...",
      rows: 7,
      required: true,
      defaultValue:
        "Menulis surat ini bukanlah untuk menuntutmu segera memaafkan, melainkan untuk mengakui secara jujur betapa cerobohnya sikap dan kata-kataku. Aku membiarkan rasa lelah dan keangkuhan mengambil alih akal sehatku, hingga mengabaikan rasa aman yang selama ini susah payah kita bangun bersama.\n\nDalam seni Kintsugi, pecahan mangkuk keramik tidak pernah dibuang atau disembunyikan kerusakannya. Patahan itu diakui, dibersihkan dengan sabar, dan direkatkan kembali dengan pernis emas cair—menjadikan bejana itu justru lebih kokoh dan anggun dari sebelumnya.\n\nAku tidak ingin menyangkal retakan ini. Aku ingin bersamamu merawatnya dengan kejujuran mutlak, kelemahlembutan, dan perubahan diri yang nyata. Hatimu terlalu berharga untuk kubiarkan merasa sendiri dalam kekecewaan.",
      section: "Surat Washi",
    },
    {
      name: "signoff",
      label: "Salam Penutup",
      type: "text",
      placeholder: "Dengan segenap penyesalan dan kerendahan hati,",
      defaultValue: "Dengan segenap penyesalan dan kerendahan hati,",
      section: "Surat Washi",
    },
    {
      name: "sealKanji",
      label: "Simbol Segel Hanko (Kanji)",
      type: "text",
      placeholder: "誠 (Makoto / Ketulusan)",
      defaultValue: "誠",
      maxLength: 10,
      section: "Surat Washi",
    },

    // Section 3: 4 Titik Keretakan & Refleksi Jujur
    {
      name: "fracture1_name",
      label: "Keretakan 1: Jenis Kesalahan",
      type: "text",
      defaultValue: "The Fracture of Careless Words (Kata-Kata Ceroboh)",
      section: "Titik Keretakan",
    },
    {
      name: "fracture1_admit",
      label: "Keretakan 1: Pengakuan Kesalahan",
      type: "textarea",
      defaultValue: "Aku mengucapkan kalimat tajam bernada dingin saat emosiku sedang tidak terkontrol.",
      rows: 2,
      section: "Titik Keretakan",
    },
    {
      name: "fracture1_impact",
      label: "Keretakan 1: Rasa Sakit yang Disadari",
      type: "textarea",
      defaultValue: "Aku tahu kata-kata itu meruntuhkan rasa percaya dan membuatmu merasa tidak dihargai.",
      rows: 2,
      section: "Titik Keretakan",
    },

    {
      name: "fracture2_name",
      label: "Keretakan 2: Jenis Kesalahan",
      type: "text",
      defaultValue: "The Fracture of Broken Presence (Kelalaian Mendengarkan)",
      section: "Titik Keretakan",
    },
    {
      name: "fracture2_admit",
      label: "Keretakan 2: Pengakuan Kesalahan",
      type: "textarea",
      defaultValue: "Aku terlalu sibuk dengan duniaku sendiri dan gagal memberikan perhatian penuh saat kau membutuhkanku.",
      rows: 2,
      section: "Titik Keretakan",
    },
    {
      name: "fracture2_impact",
      label: "Keretakan 2: Rasa Sakit yang Disadari",
      type: "textarea",
      defaultValue: "Kau merasa diabaikan dan sendirian menanggung rasa cemas di tengah keheningan.",
      rows: 2,
      section: "Titik Keretakan",
    },

    {
      name: "fracture3_name",
      label: "Keretakan 3: Jenis Kesalahan",
      type: "text",
      defaultValue: "The Fracture of False Pride (Ego & Keras Kepala)",
      section: "Titik Keretakan",
    },
    {
      name: "fracture3_admit",
      label: "Keretakan 3: Pengakuan Kesalahan",
      type: "textarea",
      defaultValue: "Aku sempat bersikeras membela diri bukannya langsung memeluk dan memahami sudut pandangmu.",
      rows: 2,
      section: "Titik Keretakan",
    },
    {
      name: "fracture3_impact",
      label: "Keretakan 3: Rasa Sakit yang Disadari",
      type: "textarea",
      defaultValue: "Ego kasarku membuatmu merasa terpojok dan terluka dua kali lipat.",
      rows: 2,
      section: "Titik Keretakan",
    },

    {
      name: "fracture4_name",
      label: "Keretakan 4: Jenis Kesalahan",
      type: "text",
      defaultValue: "The Fracture of Lingering Silence (Mendiamkan Masalah)",
      section: "Titik Keretakan",
    },
    {
      name: "fracture4_admit",
      label: "Keretakan 4: Pengakuan Kesalahan",
      type: "textarea",
      defaultValue: "Aku menarik diri dan membiarkan jeda waktu tanpa komunikasi memperlebar jarak di antara kita.",
      rows: 2,
      section: "Titik Keretakan",
    },
    {
      name: "fracture4_impact",
      label: "Keretakan 4: Rasa Sakit yang Disadari",
      type: "textarea",
      defaultValue: "Keheningan itu bukan memberi kedamaian, melainkan menyiksa hatimu dengan ketidakpastian.",
      rows: 2,
      section: "Titik Keretakan",
    },

    // Section 4: 3 Janji Pernis Emas (The Golden Lacquer)
    {
      name: "vow1_title",
      label: "Pernis Emas 1: Nama Janji",
      type: "text",
      defaultValue: "The Golden Lacquer of Active Listening",
      section: "Janji Pernis Emas",
    },
    {
      name: "vow1_lacquer",
      label: "Pernis Emas 1: Formula Komitmen",
      type: "text",
      defaultValue: "Mendengar Penuh Tanpa Membela Diri",
      section: "Janji Pernis Emas",
    },
    {
      name: "vow1_action",
      label: "Pernis Emas 1: Tindakan Nyata",
      type: "textarea",
      defaultValue: "Setiap kali ada perbedaan pendapat, aku akan meletakkan gawaiku, menatap matamu, dan menyimak apa yang kau rasakan sebelum berbicara sepatah kata pun.",
      rows: 2,
      section: "Janji Pernis Emas",
    },

    {
      name: "vow2_title",
      label: "Pernis Emas 2: Nama Janji",
      type: "text",
      defaultValue: "The Golden Lacquer of Radical Honesty",
      section: "Janji Pernis Emas",
    },
    {
      name: "vow2_lacquer",
      label: "Pernis Emas 2: Formula Komitmen",
      type: "text",
      defaultValue: "Transparansi Penuh & Kerentanan Diri",
      section: "Janji Pernis Emas",
    },
    {
      name: "vow2_action",
      label: "Pernis Emas 2: Tindakan Nyata",
      type: "textarea",
      defaultValue: "Mengakui kelelahanku sejak awal secara jujur tanpa melampiaskan kekesalan, dan tidak lagi menyembunyikan perasaan di balik topeng diam.",
      rows: 2,
      section: "Janji Pernis Emas",
    },

    {
      name: "vow3_title",
      label: "Pernis Emas 3: Nama Janji",
      type: "text",
      defaultValue: "The Golden Lacquer of Patient Reverence",
      section: "Janji Pernis Emas",
    },
    {
      name: "vow3_lacquer",
      label: "Pernis Emas 3: Formula Komitmen",
      type: "text",
      defaultValue: "Menghormati Batasan & Proses Penyembuhan",
      section: "Janji Pernis Emas",
    },
    {
      name: "vow3_action",
      label: "Pernis Emas 3: Tindakan Nyata",
      type: "textarea",
      defaultValue: "Aku tidak akan memaksamu untuk langsung tersenyum seolah tidak terjadi apa-apa. Aku akan setia menemanimu, membuktikan perubahanku lewat waktu dan ketulusan konsisten.",
      rows: 2,
      section: "Janji Pernis Emas",
    },

    // Section 5: 4 Kenangan Suci yang Ingin Dijaga
    {
      name: "treasure1_title",
      label: "Kenangan 1: Judul",
      type: "text",
      defaultValue: "The Warmth of Your Forgiving Smile",
      section: "Kenangan Berharga",
    },
    {
      name: "treasure1_desc",
      label: "Kenangan 1: Catatan",
      type: "textarea",
      defaultValue: "Ketulusan hatimu yang selalu berusaha melihat sisi terbaik dari diriku, bahkan saat aku sendiri meragukannya.",
      rows: 2,
      section: "Kenangan Berharga",
    },

    {
      name: "treasure2_title",
      label: "Kenangan 2: Judul",
      type: "text",
      defaultValue: "Our Midnight Safe Haven",
      section: "Kenangan Berharga",
    },
    {
      name: "treasure2_desc",
      label: "Kenangan 2: Catatan",
      type: "textarea",
      defaultValue: "Ruang aman di mana kita bisa berbagi ketakutan paling rapuh tanpa pernah takut dihakimi.",
      rows: 2,
      section: "Kenangan Berharga",
    },

    {
      name: "treasure3_title",
      label: "Kenangan 3: Judul",
      type: "text",
      defaultValue: "Shared Dreams Built from Scratch",
      section: "Kenangan Berharga",
    },
    {
      name: "treasure3_desc",
      label: "Kenangan 3: Catatan",
      type: "textarea",
      defaultValue: "Rencana-rencana masa depan yang kita rajut perlahan dengan penuh harapan dan komitmen berdua.",
      rows: 2,
      section: "Kenangan Berharga",
    },

    {
      name: "treasure4_title",
      label: "Kenangan 4: Judul",
      type: "text",
      defaultValue: "The Unbreakable Bond of Growth",
      section: "Kenangan Berharga",
    },
    {
      name: "treasure4_desc",
      label: "Kenangan 4: Catatan",
      type: "textarea",
      defaultValue: "Keinginan tulus untuk saling menumbuhkan dan mendewasakan diri bersama melintasi setiap badai.",
      rows: 2,
      section: "Kenangan Berharga",
    },

    // Colors & Audio
    {
      name: "primaryColor",
      label: "Warna Emas Kintsugi (Primary)",
      type: "color",
      defaultValue: "#d4af37",
      colorPresets: [
        { label: "Kintsugi Liquid Gold", value: "#d4af37" },
        { label: "Warm Urushi Amber", value: "#caa64f" },
        { label: "Subtle Brass Foil", value: "#c29b61" },
      ],
      section: "Palet Warna & Audio",
    },
    {
      name: "backgroundColor",
      label: "Warna Latar Wabi-Sabi",
      type: "color",
      defaultValue: "#0f1318",
      colorPresets: [
        { label: "Zen Slate Charcoal", value: "#0f1318" },
        { label: "Kyoto Temple Night", value: "#14181f" },
        { label: "Dark Earth Ware", value: "#1a1614" },
      ],
      section: "Palet Warna & Audio",
    },
    {
      name: "audioUrl",
      label: "URL Musik Seruling Zen (Shakuhachi & Koto)",
      type: "text",
      placeholder: "https://example.com/zen-healing.mp3",
      defaultValue: "https://cdn.pixabay.com/download/audio/2022/02/07/audio_845f0baea3.mp3?filename=japanese-zen-flute-meditation-101140.mp3",
      helperText: "Format MP3 publik. Audio otomatis tidak aktif di katalog template.",
      section: "Palet Warna & Audio",
    },
  ],
  sample: {
    recipientName: "Laras Kirana",
    senderName: "Dimas Suryaputra",
    restorationCode: "KINTSUGI-HEAL-2024",
    vesselTitle: "The Vessel of Our Shared Heart & Trust",
    incidentDate: "Momen saat Keretakan Terjadi",
    accountabilityNote:
      "Aku mengakui kesalahanku sepenuhnya tanpa dalih pembelaan diri. Luka dan kekecewaan di hatimu adalah tanggung jawab moral yang ingin kuperbaiki dengan segenap kerendahan hati dan tindakan nyata.",
    salutation: "Untukmu yang Hatiku Telah Lukai,",
    message:
      "Menulis surat ini bukanlah untuk menuntutmu segera memaafkan, melainkan untuk mengakui secara jujur betapa cerobohnya sikap dan kata-kataku. Aku membiarkan rasa lelah dan keangkuhan mengambil alih akal sehatku, hingga mengabaikan rasa aman yang selama ini susah payah kita bangun bersama.\n\nDalam seni Kintsugi, pecahan mangkuk keramik tidak pernah dibuang atau disembunyikan kerusakannya. Patahan itu diakui, dibersihkan dengan sabar, dan direkatkan kembali dengan pernis emas cair—menjadikan bejana itu justru lebih kokoh dan anggun dari sebelumnya.\n\nAku tidak ingin menyangkal retakan ini. Aku ingin bersamamu merawatnya dengan kejujuran mutlak, kelemahlembutan, dan perubahan diri yang nyata. Hatimu terlalu berharga untuk kubiarkan merasa sendiri dalam kekecewaan.",
    signoff: "Dengan segenap penyesalan dan kerendahan hati,",
    sealKanji: "誠",

    fracture1_name: "The Fracture of Careless Words (Kata-Kata Ceroboh)",
    fracture1_admit: "Aku mengucapkan kalimat tajam bernada dingin saat emosiku sedang tidak terkontrol.",
    fracture1_impact: "Aku tahu kata-kata itu meruntuhkan rasa percaya dan membuatmu merasa tidak dihargai.",

    fracture2_name: "The Fracture of Broken Presence (Kelalaian Mendengarkan)",
    fracture2_admit: "Aku terlalu sibuk dengan duniaku sendiri dan gagal memberikan perhatian penuh saat kau membutuhkanku.",
    fracture2_impact: "Kau merasa diabaikan dan sendirian menanggung rasa cemas di tengah keheningan.",

    fracture3_name: "The Fracture of False Pride (Ego & Keras Kepala)",
    fracture3_admit: "Aku sempat bersikeras membela diri bukannya langsung memeluk dan memahami sudut pandangmu.",
    fracture3_impact: "Ego kasarku membuatmu merasa terpojok dan terluka dua kali lipat.",

    fracture4_name: "The Fracture of Lingering Silence (Mendiamkan Masalah)",
    fracture4_admit: "Aku menarik diri dan membiarkan jeda waktu tanpa komunikasi memperlebar jarak di antara kita.",
    fracture4_impact: "Keheningan itu bukan memberi kedamaian, melainkan menyiksa hatimu dengan ketidakpastian.",

    vow1_title: "The Golden Lacquer of Active Listening",
    vow1_lacquer: "Mendengar Penuh Tanpa Membela Diri",
    vow1_action:
      "Setiap kali ada perbedaan pendapat, aku akan meletakkan gawaiku, menatap matamu, dan menyimak apa yang kau rasakan sebelum berbicara sepatah kata pun.",

    vow2_title: "The Golden Lacquer of Radical Honesty",
    vow2_lacquer: "Transparansi Penuh & Kerentanan Diri",
    vow2_action:
      "Mengakui kelelahanku sejak awal secara jujur tanpa melampiaskan kekesalan, dan tidak lagi menyembunyikan perasaan di balik topeng diam.",

    vow3_title: "The Golden Lacquer of Patient Reverence",
    vow3_lacquer: "Menghormati Batasan & Proses Penyembuhan",
    vow3_action:
      "Aku tidak akan memaksamu untuk langsung tersenyum seolah tidak terjadi apa-apa. Aku akan setia menemanimu, membuktikan perubahanku lewat waktu dan ketulusan konsisten.",

    treasure1_title: "The Warmth of Your Forgiving Smile",
    treasure1_desc:
      "Ketulusan hatimu yang selalu berusaha melihat sisi terbaik dari diriku, bahkan saat aku sendiri meragukannya.",

    treasure2_title: "Our Midnight Safe Haven",
    treasure2_desc:
      "Ruang aman di mana kita bisa berbagi ketakutan paling rapuh tanpa pernah takut dihakimi.",

    treasure3_title: "Shared Dreams Built from Scratch",
    treasure3_desc:
      "Rencana-rencana masa depan yang kita rajut perlahan dengan penuh harapan dan komitmen berdua.",

    treasure4_title: "The Unbreakable Bond of Growth",
    treasure4_desc:
      "Keinginan tulus untuk saling menumbuhkan dan mendewasakan diri bersama melintasi setiap badai.",

    primaryColor: "#d4af37",
    backgroundColor: "#0f1318",
    audioUrl:
      "https://cdn.pixabay.com/download/audio/2022/02/07/audio_845f0baea3.mp3?filename=japanese-zen-flute-meditation-101140.mp3",
  },
};
