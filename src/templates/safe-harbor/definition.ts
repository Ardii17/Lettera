import type { TemplateMeta } from "../types";

export const safeHarborTemplate: TemplateMeta = {
  slug: "safe-harbor",
  name: "Safe Harbor",
  category: "Permintaan Maaf",
  description:
    "Surat permohonan maaf dan rekonsiliasi maritim bertema mercusuar di tengah badai samudra. Menampilkan logbook navigasi badai, surat penjaga mercusuar di bawah temaram lentera, 4 gelombang badai & refleksi arus, 3 jangkar perdamaian (Anchor of Humility), 4 perairan tenang masa depan, serta interaksi menyalakan lentera mercusuar pemandu pulang.",
  tagline: "Safe Harbor: Menyalakan Lentera Mercusuar & Menenangkan Badai di Lautan Hati",
  cardAccent: "border-amber-500/40 bg-gradient-to-br from-slate-950 via-sky-950 to-blue-950 text-amber-200",
  highlights: [
    "Metafora Mercusuar di Tengah Badai: Menghadirkan Ruang Damai Tanpa Paksaan",
    "Buku Log Navigasi Maritim & Pengakuan Badai Tanpa Menyalahkan Arah Angin",
    "Surat dari Penjaga Mercusuar (The Keeper's Dispatch) di Kertas Logbook Tahan Cuaca",
    "4 Gelombang Badai (Turbulent Waves) & Pengakuan Terbuka Atas Guncangan Perahu",
    "3 Jangkar Perdamaian (Anchors of Peace) untuk Menstabilkan Kembali Hubungan",
    "Interaksi Menyalakan Lentera Mercusuar & Alunan Musik Malam Samudra yang Damai",
  ],
  fields: [
    // Section 1: Log Navigasi Badai
    {
      name: "recipientName",
      label: "Nama Nahkoda (Penerima Maaf)",
      type: "text",
      placeholder: "Clarissa Amanda",
      required: true,
      isRecipient: true,
      section: "Log Navigasi Badai",
    },
    {
      name: "senderName",
      label: "Nama Penjaga Mercusuar (Pengirim)",
      type: "text",
      placeholder: "Arkananta",
      required: true,
      section: "Log Navigasi Badai",
    },
    {
      name: "logbookNo",
      label: "Nomor Log Navigasi",
      type: "text",
      placeholder: "HARBOR-RESTORE-2024",
      defaultValue: "HARBOR-RESTORE-2024",
      section: "Log Navigasi Badai",
    },
    {
      name: "vesselName",
      label: "Nama Bahtera Hubungan",
      type: "text",
      placeholder: "The Voyage of Us",
      defaultValue: "The Voyage of Us",
      section: "Log Navigasi Badai",
    },
    {
      name: "stormDate",
      label: "Waktu Terjadinya Badai",
      type: "text",
      placeholder: "Malam Saat Badai Mengguncang",
      defaultValue: "Malam Saat Badai Mengguncang",
      section: "Log Navigasi Badai",
    },
    {
      name: "stormLocation",
      label: "Koordinat Laut / Perairan Badai",
      type: "text",
      placeholder: "The Turbulent Waters of Misunderstanding",
      defaultValue: "The Turbulent Waters of Misunderstanding",
      section: "Log Navigasi Badai",
    },
    {
      name: "accountabilityNote",
      label: "Pernyataan Tanggung Jawab atas Badai",
      type: "textarea",
      placeholder: "Pengakuan jujur atas badai...",
      defaultValue:
        "Aku mengakui bahwa keegoisan dan kelalaianku telah menjadi angin kencang yang mengguncang bahtera kita. Aku tidak menyalahkan ombak atau arah angin; rasa cemas di hatimu adalah akibat dari ketidakmampuanku menjaga kemudi dengan bijak.",
      rows: 2,
      section: "Log Navigasi Badai",
    },

    // Section 2: Surat dari Penjaga Mercusuar
    {
      name: "salutation",
      label: "Salam Pembuka Surat",
      type: "text",
      placeholder: "Untuk Nahkoda yang Paling Kucintai di Tengah Badai,",
      defaultValue: "Untuk Nahkoda yang Paling Kucintai di Tengah Badai,",
      section: "Surat Mercusuar",
    },
    {
      name: "message",
      label: "Isi Surat Penjaga Mercusuar (Pesan Rekonsiliasi)",
      type: "textarea",
      placeholder: "Tuliskan isi surat dari lubuk hati terdalam...",
      rows: 7,
      required: true,
      defaultValue:
        "Menulis surat ini dari balik kaca mercusuar yang dibasahi hujan lebat, aku melihat bahtera kita terombang-ambing oleh ombak yang kubuat sendiri. Betapa menyesalnya aku karena telah meninggikan suara bukannya mendengarkan, dan membiarkan amarah sesaat menggelapkan pandangan kita.\n\nMercusuar ini tidak pernah meminta kapal untuk menerobos karang tergesa-gesa. Tugas lenteraku hanyalah satu: memancarkan cahaya hangat menembus pekatnya malam, memberi tahu bahwa teluk ini aman dan tenang, dan bahwa ada tempat bersandar yang selalu menantimu kapan pun kau merasa siap.\n\nAmbillah waktu sebanyak apa pun yang kau butuhkan untuk menenangkan hatimu. Aku akan tetap berdiri di sini menjaga api lentera ini agar tak padam sedikit pun, membuktikan bahwa penyesalanku adalah komitmen nyata untuk menjadi pelabuhan yang lebih teduh bagimu.",
      section: "Surat Mercusuar",
    },
    {
      name: "signoff",
      label: "Salam Penutup",
      type: "text",
      placeholder: "Dari dermaga yang selalu menunggumu pulang dengan damai,",
      defaultValue: "Dari dermaga yang selalu menunggumu pulang dengan damai,",
      section: "Surat Mercusuar",
    },
    {
      name: "sealInitials",
      label: "Inisial Kompas Mercusuar",
      type: "text",
      placeholder: "A & C",
      defaultValue: "A & C",
      maxLength: 10,
      section: "Surat Mercusuar",
    },

    // Section 3: 4 Gelombang Badai
    {
      name: "wave1_name",
      label: "Gelombang 1: Nama Gelombang",
      type: "text",
      defaultValue: "The Gale of Careless Anger (Badai Emosi Sesaat)",
      section: "Gelombang Badai",
    },
    {
      name: "wave1_admit",
      label: "Gelombang 1: Pengakuan Kesalahan",
      type: "textarea",
      defaultValue: "Aku membiarkan rasa frustrasi melahirkan kata-kata tajam yang menghantam perasaanmu tanpa ampun.",
      rows: 2,
      section: "Gelombang Badai",
    },
    {
      name: "wave1_impact",
      label: "Gelombang 1: Guncangan yang Kau Rasakan",
      type: "textarea",
      defaultValue: "Kau merasa takut, tidak aman, dan terkejut melihat sisi diriku yang kehilangan kelembutan.",
      rows: 2,
      section: "Gelombang Badai",
    },

    {
      name: "wave2_name",
      label: "Gelombang 2: Nama Gelombang",
      type: "text",
      defaultValue: "The Hidden Reef of Misplaced Pride (Karang Tersembunyi Ego)",
      section: "Gelombang Badai",
    },
    {
      name: "wave2_admit",
      label: "Gelombang 2: Pengakuan Kesalahan",
      type: "textarea",
      defaultValue: "Aku menolak menurunkan layar gengsi dan bersikeras mencari pembenaran atas kesalahanku.",
      rows: 2,
      section: "Gelombang Badai",
    },
    {
      name: "wave2_impact",
      label: "Gelombang 2: Guncangan yang Kau Rasakan",
      type: "textarea",
      defaultValue: "Kau merasa suaramu tidak didengar dan seolah-olah kemenangan argumen lebih kuutamakan daripada hatimu.",
      rows: 2,
      section: "Gelombang Badai",
    },

    {
      name: "wave3_name",
      label: "Gelombang 3: Nama Gelombang",
      type: "text",
      defaultValue: "The Drifting Current of Inattention (Arus Kelalaian Menjaga)",
      section: "Gelombang Badai",
    },
    {
      name: "wave3_admit",
      label: "Gelombang 3: Pengakuan Kesalahan",
      type: "textarea",
      defaultValue: "Aku terlalu sibuk menatap ombak di luar hingga lalai memperhatikan bahwa air laut sudah merembes ke geladak hatimu.",
      rows: 2,
      section: "Gelombang Badai",
    },
    {
      name: "wave3_impact",
      label: "Gelombang 3: Guncangan yang Kau Rasakan",
      type: "textarea",
      defaultValue: "Kau merasa lelah berjuang sendirian menjaga keutuhan kapal ini saat aku terlena.",
      rows: 2,
      section: "Gelombang Badai",
    },

    {
      name: "wave4_name",
      label: "Gelombang 4: Nama Gelombang",
      type: "text",
      defaultValue: "The Cold Fog of Silence (Kabut Dingin Keterpisahan)",
      section: "Gelombang Badai",
    },
    {
      name: "wave4_admit",
      label: "Gelombang 4: Pengakuan Kesalahan",
      type: "textarea",
      defaultValue: "Aku memilih menutup diri dan diam berhari-hari bukannya segera mendayung mendekat untuk memelukmu.",
      rows: 2,
      section: "Gelombang Badai",
    },
    {
      name: "wave4_impact",
      label: "Gelombang 4: Guncangan yang Kau Rasakan",
      type: "textarea",
      defaultValue: "Keheningan itu membuatmu merasa terasing di tengah lautan luas yang gelap dan dingin.",
      rows: 2,
      section: "Gelombang Badai",
    },

    // Section 4: 3 Jangkar Perdamaian
    {
      name: "anchor1_name",
      label: "Jangkar 1: Nama Jangkar",
      type: "text",
      defaultValue: "The Anchor of Absolute Humility",
      section: "Jangkar Perdamaian",
    },
    {
      name: "anchor1_virtue",
      label: "Jangkar 1: Formula Perdamaian",
      type: "text",
      defaultValue: "Menurunkan Gengsi & Menghentikan Debat",
      section: "Jangkar Perdamaian",
    },
    {
      name: "anchor1_action",
      label: "Jangkar 1: Tindakan Nyata",
      type: "textarea",
      defaultValue: "Aku tidak akan lagi mencari siapa yang salah atau benar. Aku memilih mengalah dan merangkul perasaanmu dengan kelembutan penuh.",
      rows: 2,
      section: "Jangkar Perdamaian",
    },

    {
      name: "anchor2_name",
      label: "Jangkar 2: Nama Jangkar",
      type: "text",
      defaultValue: "The Anchor of Gentle Harbor",
      section: "Jangkar Perdamaian",
    },
    {
      name: "anchor2_virtue",
      label: "Jangkar 2: Formula Perdamaian",
      type: "text",
      defaultValue: "Menjadikan Diri Ruang Aman Penuh Kasih",
      section: "Jangkar Perdamaian",
    },
    {
      name: "anchor2_action",
      label: "Jangkar 2: Tindakan Nyata",
      type: "textarea",
      defaultValue: "Menciptakan suasana rumah dan pelukan di mana kau bebas menangis, mengeluh, dan mengungkapkan rasa kecewamu tanpa takut dihakimi.",
      rows: 2,
      section: "Jangkar Perdamaian",
    },

    {
      name: "anchor3_name",
      label: "Jangkar 3: Nama Jangkar",
      type: "text",
      defaultValue: "The Steadfast Beacon of Patience",
      section: "Jangkar Perdamaian",
    },
    {
      name: "anchor3_virtue",
      label: "Jangkar 3: Formula Perdamaian",
      type: "text",
      defaultValue: "Kesetiaan Menunggu Tanpa Menuntut",
      section: "Jangkar Perdamaian",
    },
    {
      name: "anchor3_action",
      label: "Jangkar 3: Tindakan Nyata",
      type: "textarea",
      defaultValue: "Aku tidak akan menuntutmu segera memaafkanku. Aku akan terus menjaga nyala api kebaikan dan perhatian kecil setiap hari hingga hatimu benar-benar pulih.",
      rows: 2,
      section: "Jangkar Perdamaian",
    },

    // Section 5: 4 Perairan Tenang
    {
      name: "calm1_title",
      label: "Perairan 1: Momen Damai",
      type: "text",
      defaultValue: "The Sunlit Morning Waters",
      section: "Perairan Tenang",
    },
    {
      name: "calm1_desc",
      label: "Perairan 1: Kenangan Teduh",
      type: "textarea",
      defaultValue: "Pagi-pagi hening saat kita menikmati secangkir kopi bersama tanpa perlu berkata-kata, hanya rasa nyaman yang mengisi ruangan.",
      rows: 2,
      section: "Perairan Tenang",
    },

    {
      name: "calm2_title",
      label: "Perairan 2: Momen Damai",
      type: "text",
      defaultValue: "The Harbor of Honest Laughter",
      section: "Perairan Tenang",
    },
    {
      name: "calm2_desc",
      label: "Perairan 2: Kenangan Teduh",
      type: "textarea",
      defaultValue: "Tawa renyah kita saat hal-hal sederhana terjadi di luar rencana, saling menatap dan tahu kita saling memiliki seutuhnya.",
      rows: 2,
      section: "Perairan Tenang",
    },

    {
      name: "calm3_title",
      label: "Perairan 3: Momen Damai",
      type: "text",
      defaultValue: "The Starlit Anchorage",
      section: "Perairan Tenang",
    },
    {
      name: "calm3_desc",
      label: "Perairan 3: Kenangan Teduh",
      type: "textarea",
      defaultValue: "Obrolan larut malam di mana kita saling menceritakan mimpi dan rapuhnya hati kita tanpa keraguan sedikit pun.",
      rows: 2,
      section: "Perairan Tenang",
    },

    {
      name: "calm4_title",
      label: "Perairan 4: Momen Damai",
      type: "text",
      defaultValue: "The Horizon of Tomorrow",
      section: "Perairan Tenang",
    },
    {
      name: "calm4_desc",
      label: "Perairan 4: Kenangan Teduh",
      type: "textarea",
      defaultValue: "Keyakinan mendalam bahwa bahtera ini ditakdirkan untuk berlayar jauh melintasi waktu, tumbuh semakin kokoh setelah melewati badai.",
      rows: 2,
      section: "Perairan Tenang",
    },

    // Colors & Audio
    {
      name: "primaryColor",
      label: "Warna Lentera Emas (Beacon Gold)",
      type: "color",
      defaultValue: "#f59e0b",
      colorPresets: [
        { label: "Lantern Beacon Amber", value: "#f59e0b" },
        { label: "Warm Harbor Gold", value: "#eab308" },
        { label: "Flame Brass", value: "#d97706" },
      ],
      section: "Palet Warna & Audio",
    },
    {
      name: "secondaryColor",
      label: "Warna Busa Ombak (Seafoam Cyan)",
      type: "color",
      defaultValue: "#38bdf8",
      colorPresets: [
        { label: "Glacial Seafoam", value: "#38bdf8" },
        { label: "Oceanic Mist", value: "#0ea5e9" },
        { label: "Coastal Teal", value: "#14b8a6" },
      ],
      section: "Palet Warna & Audio",
    },
    {
      name: "backgroundColor",
      label: "Warna Samudra Badai (Oceanic Navy)",
      type: "color",
      defaultValue: "#07101d",
      colorPresets: [
        { label: "Deep Storm Navy", value: "#07101d" },
        { label: "Midnight Anchorage", value: "#0b1626" },
        { label: "Abyssal Slate", value: "#050b14" },
      ],
      section: "Palet Warna & Audio",
    },
    {
      name: "audioUrl",
      label: "URL Musik Deburan Ombak Damai (Cello & Waves)",
      type: "text",
      placeholder: "https://example.com/ocean-lullaby.mp3",
      defaultValue: "https://cdn.pixabay.com/download/audio/2022/05/16/audio_c976939fc9.mp3?filename=gentle-ocean-waves-birdsong-and-acoustic-guitar-111406.mp3",
      helperText: "Format MP3 publik. Audio otomatis tidak aktif di thumbnail katalog template.",
      section: "Palet Warna & Audio",
    },
  ],
  sample: {
    recipientName: "Clarissa Amanda",
    senderName: "Arkananta",
    logbookNo: "HARBOR-RESTORE-2024",
    vesselName: "The Voyage of Us",
    stormDate: "Malam Saat Badai Mengguncang",
    stormLocation: "The Turbulent Waters of Misunderstanding",
    accountabilityNote:
      "Aku mengakui bahwa keegoisan dan kelalaianku telah menjadi angin kencang yang mengguncang bahtera kita. Aku tidak menyalahkan ombak atau arah angin; rasa cemas di hatimu adalah akibat dari ketidakmampuanku menjaga kemudi dengan bijak.",
    salutation: "Untuk Nahkoda yang Paling Kucintai di Tengah Badai,",
    message:
      "Menulis surat ini dari balik kaca mercusuar yang dibasahi hujan lebat, aku melihat bahtera kita terombang-ambing oleh ombak yang kubuat sendiri. Betapa menyesalnya aku karena telah meninggikan suara bukannya mendengarkan, dan membiarkan amarah sesaat menggelapkan pandangan kita.\n\nMercusuar ini tidak pernah meminta kapal untuk menerobos karang tergesa-gesa. Tugas lenteraku hanyalah satu: memancarkan cahaya hangat menembus pekatnya malam, memberi tahu bahwa teluk ini aman dan tenang, dan bahwa ada tempat bersandar yang selalu menantimu kapan pun kau merasa siap.\n\nAmbillah waktu sebanyak apa pun yang kau butuhkan untuk menenangkan hatimu. Aku akan tetap berdiri di sini menjaga api lentera ini agar tak padam sedikit pun, membuktikan bahwa penyesalanku adalah komitmen nyata untuk menjadi pelabuhan yang lebih teduh bagimu.",
    signoff: "Dari dermaga yang selalu menunggumu pulang dengan damai,",
    sealInitials: "A & C",

    wave1_name: "The Gale of Careless Anger (Badai Emosi Sesaat)",
    wave1_admit: "Aku membiarkan rasa frustrasi melahirkan kata-kata tajam yang menghantam perasaanmu tanpa ampun.",
    wave1_impact: "Kau merasa takut, tidak aman, dan terkejut melihat sisi diriku yang kehilangan kelembutan.",

    wave2_name: "The Hidden Reef of Misplaced Pride (Karang Tersembunyi Ego)",
    wave2_admit: "Aku menolak menurunkan layar gengsi dan bersikeras mencari pembenaran atas kesalahanku.",
    wave2_impact: "Kau merasa suaramu tidak didengar dan seolah-olah kemenangan argumen lebih kuutamakan daripada hatimu.",

    wave3_name: "The Drifting Current of Inattention (Arus Kelalaian Menjaga)",
    wave3_admit:
      "Aku terlalu sibuk menatap ombak di luar hingga lalai memperhatikan bahwa air laut sudah merembes ke geladak hatimu.",
    wave3_impact: "Kau merasa lelah berjuang sendirian menjaga keutuhan kapal ini saat aku terlena.",

    wave4_name: "The Cold Fog of Silence (Kabut Dingin Keterpisahan)",
    wave4_admit: "Aku memilih menutup diri dan diam berhari-hari bukannya segera mendayung mendekat untuk memelukmu.",
    wave4_impact: "Keheningan itu membuatmu merasa terasing di tengah lautan luas yang gelap dan dingin.",

    anchor1_name: "The Anchor of Absolute Humility",
    anchor1_virtue: "Menurunkan Gengsi & Menghentikan Debat",
    anchor1_action:
      "Aku tidak akan lagi mencari siapa yang salah atau benar. Aku memilih mengalah dan merangkul perasaanmu dengan kelembutan penuh.",

    anchor2_name: "The Anchor of Gentle Harbor",
    anchor2_virtue: "Menjadikan Diri Ruang Aman Penuh Kasih",
    anchor2_action:
      "Menciptakan suasana rumah dan pelukan di mana kau bebas menangis, mengeluh, dan mengungkapkan rasa kecewamu tanpa takut dihakimi.",

    anchor3_name: "The Steadfast Beacon of Patience",
    anchor3_virtue: "Kesetiaan Menunggu Tanpa Menuntut",
    anchor3_action:
      "Aku tidak akan menuntutmu segera memaafkanku. Aku akan terus menjaga nyala api kebaikan dan perhatian kecil setiap hari hingga hatimu benar-benar pulih.",

    calm1_title: "The Sunlit Morning Waters",
    calm1_desc:
      "Pagi-pagi hening saat kita menikmati secangkir kopi bersama tanpa perlu berkata-kata, hanya rasa nyaman yang mengisi ruangan.",

    calm2_title: "The Harbor of Honest Laughter",
    calm2_desc:
      "Tawa renyah kita saat hal-hal sederhana terjadi di luar rencana, saling menatap dan tahu kita saling memiliki seutuhnya.",

    calm3_title: "The Starlit Anchorage",
    calm3_desc:
      "Obrolan larut malam di mana kita saling menceritakan mimpi dan rapuhnya hati kita tanpa keraguan sedikit pun.",

    calm4_title: "The Horizon of Tomorrow",
    calm4_desc:
      "Keyakinan mendalam bahwa bahtera ini ditakdirkan untuk berlayar jauh melintasi waktu, tumbuh semakin kokoh setelah melewati badai.",

    primaryColor: "#f59e0b",
    secondaryColor: "#38bdf8",
    backgroundColor: "#07101d",
    audioUrl:
      "https://cdn.pixabay.com/download/audio/2022/05/16/audio_c976939fc9.mp3?filename=gentle-ocean-waves-birdsong-and-acoustic-guitar-111406.mp3",
  },
};
