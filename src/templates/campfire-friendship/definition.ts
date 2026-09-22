import type { TemplateMeta } from "../types";
import {
  FRIENDSHIP_COLOR_PRESETS,
  BACKGROUND_COLOR_PRESETS,
  CARD_COLOR_PRESETS,
  TEXT_COLOR_PRESETS,
} from "../color-presets";

export const campfireFriendshipTemplate: TemplateMeta = {
  slug: "campfire-friendship",
  name: "Campfire Chronicles: Friendship Haven",
  category: "Pertemanan",
  tagline: "Jurnal perkemahan hangat di bawah bintang dengan api unggun, jemuran polaroid, kamus lelucon rahasia, dan piagam persahabatan abadi.",
  description:
    "Website persembahan persahabatan bertema malam perkemahan dan langit berbintang (Campfire & Starlight). Menampilkan potret api unggun dengan kompas koordinat persahabatan, 4 konstelasi memori tak terlupakan, perlengkapan bertahan hidup (Friendship Survival Kit) dan kamus lelucon rahasia (Inside Jokes Codex), jemuran foto polaroid petualangan yang kaya gambar estetik, warkat surat reflektif dari lubuk hati, serta brankas waktu berisi Sertifikat Persahabatan Seumur Hidup.",
  cardAccent: "bg-amber-500/15 text-amber-700",
  highlights: [
    "Suasana malam perkemahan dengan partikel api unggun & pemutar musik akustik",
    "Kompas koordinat persahabatan: tahun awal kenal, hari tertawa, & markas nongkrong",
    "4 Konstelasi kenangan bintang tak terlupakan & cerita di balik layar",
    "Friendship Survival Kit & Kamus Inside Jokes Codex yang lucu & personal",
    "Jemuran 4 foto polaroid gantung dengan jepit kayu & caption tulisan tangan",
    "Brankas rahasia interaktif pembuka Piagam Persahabatan Seumur Hidup berstempel resmi",
  ],
  fields: [
    // 1. Skema Warna
    {
      name: "primaryColor",
      label: "Warna Nyala Api & Aksen Utama (Primary Color)",
      type: "color",
      defaultValue: "#d97706",
      helperText: "Warna lencana api unggun, garis aksen hangat, dan tombol aksi.",
      colorPresets: FRIENDSHIP_COLOR_PRESETS,
    },
    {
      name: "backgroundColor",
      label: "Warna Latar Malam Hutan (Background Color)",
      type: "color",
      defaultValue: "#0f172a",
      helperText: "Warna dasar langit malam dan suasana perkemahan.",
      colorPresets: BACKGROUND_COLOR_PRESETS,
    },
    {
      name: "cardColor",
      label: "Warna Tenda & Kartu Kenangan (Card Color)",
      type: "color",
      defaultValue: "#1e293b",
      helperText: "Warna wadah kartu polaroid, konstelasi, dan panel warkat.",
      colorPresets: CARD_COLOR_PRESETS,
    },
    {
      name: "textColor",
      label: "Warna Teks Judul & Bintang",
      type: "color",
      defaultValue: "#fef3c7",
      helperText: "Warna judul utama, nama sahabat, dan angka koordinat.",
      colorPresets: TEXT_COLOR_PRESETS,
    },
    {
      name: "bodyTextColor",
      label: "Warna Teks Isi & Cerita",
      type: "color",
      defaultValue: "#cbd5e1",
      helperText: "Warna narasi kenangan dan paragraf surat.",
      colorPresets: TEXT_COLOR_PRESETS,
    },

    // 2. Bagian 1: Hero & Campfire Compass
    {
      name: "friendName",
      label: "Nama Sahabat Karib",
      type: "text",
      defaultValue: "Dimas Arya Pratama",
      helperText: "Nama sahabat terbaik yang menerima persembahan ini.",
      placeholder: "Contoh: Dimas Arya Pratama",
    },
    {
      name: "senderName",
      label: "Nama Pengirim / Sahabat Petualang",
      type: "text",
      defaultValue: "Rian Aditya",
      helperText: "Nama Anda sebagai sahabat karib.",
      placeholder: "Contoh: Rian Aditya",
    },
    {
      name: "friendshipMoniker",
      label: "Julukan Kompak / Duo Moniker",
      type: "text",
      defaultValue: "The Midnight Trailblazers & Partners in Crime",
      helperText: "Julukan seru duet kalian berdua.",
      placeholder: "Contoh: The Midnight Trailblazers",
    },
    {
      name: "heroSubtitle",
      label: "Subjudul Sambutan Malam Perkemahan",
      type: "textarea",
      defaultValue:
        "Di bawah hamparan galaksi dan hangatnya kobaran api unggun, ini adalah catatan sakral tentang sebuah persahabatan yang menolak pudar oleh jarak dan waktu.",
      helperText: "Pesan pembuka di gerbang perkemahan.",
    },
    {
      name: "heroPhoto",
      label: "Foto Utama Sahabat di Api Unggun (Hero Photo)",
      type: "text",
      defaultValue:
        "https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=1200&q=80",
      helperText: "URL foto momen terbaik kalian berdua di alam bebas atau nongkrong.",
    },
    {
      name: "badgeText",
      label: "Teks Lencana Persahabatan",
      type: "text",
      defaultValue: "🏕️ Official Campfire Brotherhood • Est. 2017",
      helperText: "Lencana status persahabatan di bagian atas.",
    },
    {
      name: "yearsKnown",
      label: "Lama Mengenal (Tahun Kebersamaan)",
      type: "text",
      defaultValue: "8 Tahun",
      helperText: "Misal: 8 Tahun atau Sejak 2017.",
    },
    {
      name: "daysLaughed",
      label: "Estimasi Hari Penuh Tawa",
      type: "text",
      defaultValue: "2.900+ Hari",
      helperText: "Jumlah hari tawa atau petualangan bersama.",
    },
    {
      name: "hqLocation",
      label: "Markas / Tempat Nongkrong Favorit",
      type: "text",
      defaultValue: "Kopi Sudut Tenda & Bukit Bintang",
      helperText: "Lokasi legendaris tempat kalian sering mengobrol.",
    },
    {
      name: "musicUrl",
      label: "URL Musik Akustik / Audio Ambient",
      type: "text",
      defaultValue: "https://assets.mixkit.co/music/preview/mixkit-acoustic-guitar-chill-1033.mp3",
      helperText: "Tautan audio file .mp3 musik latar akustik santai.",
    },
    {
      name: "musicTitle",
      label: "Judul Musik Latar",
      type: "text",
      defaultValue: "Acoustic Campfire & Ember Serenade",
      helperText: "Judul trek yang diputar.",
    },

    // 3. Bagian 2: Constellations of Memories (4 Bintang Kenangan)
    {
      name: "memory1Title",
      label: "Kenangan 1: Judul Momen",
      type: "text",
      defaultValue: "Malam Tersesat di Puncak Kabut",
      helperText: "Judul petualangan pertama.",
    },
    {
      name: "memory1Date",
      label: "Kenangan 1: Waktu / Koordinat",
      type: "text",
      defaultValue: "Agustus 2019 • Puncak Gn. Prau",
      helperText: "Waktu atau koordinat lokasi kejadian.",
    },
    {
      name: "memory1Story",
      label: "Kenangan 1: Cerita Petualangan",
      type: "textarea",
      defaultValue:
        "Bahan bakar kompor habis, hujan gerimis turun, tapi kita justru tertawa terpingkal-pingkal membagi sebungkus mie instan mentah sambil memandang lampu kota di kejauhan.",
      helperText: "Kisah di balik momen tersebut.",
    },
    {
      name: "memory1Tag",
      label: "Kenangan 1: Label Hikmah",
      type: "text",
      defaultValue: "Survival Level: 100",
    },

    {
      name: "memory2Title",
      label: "Kenangan 2: Judul Momen",
      type: "text",
      defaultValue: "Proyek Begadang & Kopi Basi Jam 3 Pagi",
      helperText: "Judul petualangan kedua.",
    },
    {
      name: "memory2Date",
      label: "Kenangan 2: Waktu / Koordinat",
      type: "text",
      defaultValue: "November 2021 • Kost Nomor 14",
      helperText: "Waktu atau koordinat lokasi kejadian.",
    },
    {
      name: "memory2Story",
      label: "Kenangan 2: Cerita Petualangan",
      type: "textarea",
      defaultValue:
        "Laptop sempat error sejam sebelum deadline, kita saling tatap lemas, lalu sepakat beli roti bakar dulu daripada pusing. Akhirnya tugas selesai dengan nilai A minus.",
      helperText: "Kisah di balik momen tersebut.",
    },
    {
      name: "memory2Tag",
      label: "Kenangan 2: Label Hikmah",
      type: "text",
      defaultValue: "Clutch Moment of Glory",
    },

    {
      name: "memory3Title",
      label: "Kenangan 3: Judul Momen",
      type: "text",
      defaultValue: "Roadtrip Spontan Tanpa Rencana",
      helperText: "Judul petualangan ketiga.",
    },
    {
      name: "memory3Date",
      label: "Kenangan 3: Waktu / Koordinat",
      type: "text",
      defaultValue: "Juli 2023 • Jalur Pantai Selatan",
      helperText: "Waktu atau koordinat lokasi kejadian.",
    },
    {
      name: "memory3Story",
      label: "Kenangan 3: Cerita Petualangan",
      type: "textarea",
      defaultValue:
        "Niat awal cuma beli bensin ke minimarket, berujung berkendara 200 km sampai ke tepi pantai hanya demi makan kelapa muda dan melihat matahari terbenam bersama.",
      helperText: "Kisah di balik momen tersebut.",
    },
    {
      name: "memory3Tag",
      label: "Kenangan 3: Label Hikmah",
      type: "text",
      defaultValue: "Wanderlust Brothers",
    },

    {
      name: "memory4Title",
      label: "Kenangan 4: Judul Momen",
      type: "text",
      defaultValue: "Hening di Tengah Badai Hidup",
      helperText: "Judul petualangan keempat.",
    },
    {
      name: "memory4Date",
      label: "Kenangan 4: Waktu / Koordinat",
      type: "text",
      defaultValue: "Maret 2024 • Jembatan Sungai Kota",
      helperText: "Waktu atau koordinat lokasi kejadian.",
    },
    {
      name: "memory4Story",
      label: "Kenangan 4: Cerita Petualangan",
      type: "textarea",
      defaultValue:
        "Ketika salah satu dari kita sedang dihantam kabar terberat dalam hidup, tidak banyak nasihat klise yang kau berikan—hanya tepukan bahu kokoh dan kehadiran tanpa jeda.",
      helperText: "Kisah di balik momen tersebut.",
    },
    {
      name: "memory4Tag",
      label: "Kenangan 4: Label Hikmah",
      type: "text",
      defaultValue: "Unbreakable Anchor",
    },

    // 4. Bagian 3: Survival Kit & Inside Jokes Codex
    {
      name: "survival1Title",
      label: "Survival Kit 1: Nama Item",
      type: "text",
      defaultValue: "Kopi Hitam Jam 2 Pagi",
      helperText: "Item penopang persahabatan 1.",
    },
    {
      name: "survival1Desc",
      label: "Survival Kit 1: Deskripsi",
      type: "text",
      defaultValue: "Penawar kantuk saat curhat tentang mimpi-mimpi gila yang belum tercapai.",
    },

    {
      name: "survival2Title",
      label: "Survival Kit 2: Nama Item",
      type: "text",
      defaultValue: "Meme Absurd Tanpa Konteks",
      helperText: "Item penopang persahabatan 2.",
    },
    {
      name: "survival2Desc",
      label: "Survival Kit 2: Deskripsi",
      type: "text",
      defaultValue: "Senjata paling ampuh mengubah hari yang suram menjadi tawa tak terkendali.",
    },

    {
      name: "survival3Title",
      label: "Survival Kit 3: Nama Item",
      type: "text",
      defaultValue: "Kunci Helm & Motor Cadangan",
      helperText: "Item penopang persahabatan 3.",
    },
    {
      name: "survival3Desc",
      label: "Survival Kit 3: Deskripsi",
      type: "text",
      defaultValue: "Siap jemput kapan pun dan di mana pun saat situasi sedang darurat.",
    },

    {
      name: "survival4Title",
      label: "Survival Kit 4: Nama Item",
      type: "text",
      defaultValue: "Kejujuran Pahit yang Menyelamatkan",
      helperText: "Item penopang persahabatan 4.",
    },
    {
      name: "survival4Desc",
      label: "Survival Kit 4: Deskripsi",
      type: "text",
      defaultValue: "Orang pertama yang menegur saat kita salah jalan, tapi tak pernah meninggalkan.",
    },

    // Inside Jokes
    {
      name: "joke1Phrase",
      label: "Inside Joke 1: Frasa Khas",
      type: "text",
      defaultValue: "“Aman, gas dulu aja!”",
      helperText: "Lelucon atau kata rahasia 1.",
    },
    {
      name: "joke1Meaning",
      label: "Inside Joke 1: Arti Sebenarnya",
      type: "text",
      defaultValue: "Sama sekali tidak aman, tapi kita tetap nekat maju bersama.",
    },
    {
      name: "joke1Origin",
      label: "Inside Joke 1: Asal-Usul Kejadian",
      type: "text",
      defaultValue: "Tragedi ban bocor di tengah kebun teh waktu magrib.",
    },

    {
      name: "joke2Phrase",
      label: "Inside Joke 2: Frasa Khas",
      type: "text",
      defaultValue: "“5 Menit Lagi Sampai”",
      helperText: "Lelucon atau kata rahasia 2.",
    },
    {
      name: "joke2Meaning",
      label: "Inside Joke 2: Arti Sebenarnya",
      type: "text",
      defaultValue: "Baru selesai mandi dan masih bingung mau pakai baju apa.",
    },
    {
      name: "joke2Origin",
      label: "Inside Joke 2: Asal-Usul Kejadian",
      type: "text",
      defaultValue: "Setiap janji nongkrong sejak tahun 2018 tanpa terkecuali.",
    },

    {
      name: "joke3Phrase",
      label: "Inside Joke 3: Frasa Khas",
      type: "text",
      defaultValue: "“Pangsit Tambahan Misterius”",
      helperText: "Lelucon atau kata rahasia 3.",
    },
    {
      name: "joke3Meaning",
      label: "Inside Joke 3: Arti Sebenarnya",
      type: "text",
      defaultValue: "Taktik jitu mengambil lauk sahabat saat dia sedang lengah mengobrol.",
    },
    {
      name: "joke3Origin",
      label: "Inside Joke 3: Asal-Usul Kejadian",
      type: "text",
      defaultValue: "Warung Bakso Pak Kumis malam minggu.",
    },

    // 5. Bagian 4: Polaroid Clothesline Gallery (4 Foto Estetik)
    {
      name: "polaroid1Photo",
      label: "Polaroid 1: URL Foto",
      type: "text",
      defaultValue:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
      helperText: "URL foto pertama pada jemuran polaroid.",
    },
    {
      name: "polaroid1Caption",
      label: "Polaroid 1: Catatan Tulisan Tangan",
      type: "text",
      defaultValue: "Tertawa lepas di tepian tebing sebelum matahari tenggelam.",
    },
    {
      name: "polaroid1Location",
      label: "Polaroid 1: Lokasi",
      type: "text",
      defaultValue: "Bukit Senja Parangtritis",
    },
    {
      name: "polaroid1Date",
      label: "Polaroid 1: Tanggal",
      type: "text",
      defaultValue: "14 Okt 2020",
    },

    {
      name: "polaroid2Photo",
      label: "Polaroid 2: URL Foto",
      type: "text",
      defaultValue:
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
      helperText: "URL foto kedua pada jemuran polaroid.",
    },
    {
      name: "polaroid2Caption",
      label: "Polaroid 2: Catatan Tulisan Tangan",
      type: "text",
      defaultValue: "Gitar akustik sumbang dan obrolan tentang masa depan.",
    },
    {
      name: "polaroid2Location",
      label: "Polaroid 2: Lokasi",
      type: "text",
      defaultValue: "Teras Belakang Rumah",
    },
    {
      name: "polaroid2Date",
      label: "Polaroid 2: Tanggal",
      type: "text",
      defaultValue: "22 Des 2021",
    },

    {
      name: "polaroid3Photo",
      label: "Polaroid 3: URL Foto",
      type: "text",
      defaultValue:
        "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=800&q=80",
      helperText: "URL foto ketiga pada jemuran polaroid.",
    },
    {
      name: "polaroid3Caption",
      label: "Polaroid 3: Catatan Tulisan Tangan",
      type: "text",
      defaultValue: "Pose paling sok keren setelah touring ratusan kilometer.",
    },
    {
      name: "polaroid3Location",
      label: "Polaroid 3: Lokasi",
      type: "text",
      defaultValue: "Rest Area KM 97",
    },
    {
      name: "polaroid3Date",
      label: "Polaroid 3: Tanggal",
      type: "text",
      defaultValue: "05 Mei 2023",
    },

    {
      name: "polaroid4Photo",
      label: "Polaroid 4: URL Foto",
      type: "text",
      defaultValue:
        "https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&w=800&q=80",
      helperText: "URL foto keempat pada jemuran polaroid.",
    },
    {
      name: "polaroid4Caption",
      label: "Polaroid 4: Catatan Tulisan Tangan",
      type: "text",
      defaultValue: "Sahabat yang selalu ada, dari seragam hingga lembar kerja.",
    },
    {
      name: "polaroid4Location",
      label: "Polaroid 4: Lokasi",
      type: "text",
      defaultValue: "Kedai Kopi Kota Tua",
    },
    {
      name: "polaroid4Date",
      label: "Polaroid 4: Tanggal",
      type: "text",
      defaultValue: "19 Feb 2024",
    },

    // 6. Bagian 5: Midnight Heartfelt Letter
    {
      name: "letterGreeting",
      label: "Salam Pembuka Warkat",
      type: "text",
      defaultValue: "Untuk Sahabat Terbaikku, Dimas,",
      helperText: "Panggilan akrab di awal surat.",
    },
    {
      name: "letterParagraph1",
      label: "Surat: Paragraf 1 (Refleksi Perjalanan)",
      type: "textarea",
      defaultValue:
        "Malam ini, saat menuliskan surat ini di antara heningnya malam dan kenangan yang melintas, aku tersadar betapa beruntungnya aku memiliki seorang sahabat sepertimu. Waktu berlari begitu cepat tanpa permisi; kita yang dulu hanya dua anak muda dengan mimpi yang tampak mustahil, kini perlahan meniti jalan hidup masing-masing.",
      helperText: "Paragraf pembuka tentang refleksi persahabatan.",
    },
    {
      name: "letterParagraph2",
      label: "Surat: Paragraf 2 (Terima Kasih Tulus)",
      type: "textarea",
      defaultValue:
        "Terima kasih untuk setiap tawa yang kau hadirkan saat duniaku sedang runtuh. Terima kasih karena tidak pernah menghakimi kekuranganku, namun selalu ada menjadi jangkar yang kokoh ketika aku hampir kehilangan arah. Persahabatan ini bukan sekadar tentang seberapa sering kita bertemu, tapi tentang keyakinan bahwa sejauh apa pun langkah kita, ikatan ini tak akan pernah meregang.",
      helperText: "Paragraf inti ucapan terima kasih tulus.",
    },
    {
      name: "letterParagraph3",
      label: "Surat: Paragraf 3 (Janji Masa Depan)",
      type: "textarea",
      defaultValue:
        "Semoga langkah kakimu ke depan selalu diberkahi keberanian, kesuksesan, dan kebahagiaan sejati. Ingatlah, pintu rumahku dan telingaku akan selalu terbuka untukmu, apa pun keadaannya. Kita akan menua bersama dengan segudang cerita hebat untuk diceritakan kembali.",
      helperText: "Paragraf doa dan harapan masa depan.",
    },
    {
      name: "letterClosing",
      label: "Kalimat Penutup Surat",
      type: "text",
      defaultValue: "Sahabat Sejatimu Selamanya,",
      helperText: "Salam penutup hangat.",
    },
    {
      name: "letterSignature",
      label: "Nama Tanda Tangan Surat",
      type: "text",
      defaultValue: "Rian Aditya",
      helperText: "Tanda tangan pengirim surat.",
    },
    {
      name: "letterPostscript",
      label: "Catatan Kaki (P.S.)",
      type: "text",
      defaultValue: "P.S. Jangan lupa akhir pekan ini tetap jatah kopi dan mie rebus di tempat biasa!",
      helperText: "Pesan santai pengingat janji.",
    },

    // 7. Bagian 6: Lifetime Friendship Pact & Time Vault
    {
      name: "vaultPrompt",
      label: "Ajakan Membuka Brankas Waktu",
      type: "text",
      defaultValue: "Sentuh Gembok untuk Membuka Piagam Sumpah Persahabatan",
      helperText: "Teks tombol interaktif pembuka rahasia.",
    },
    {
      name: "pactCertificateTitle",
      label: "Judul Sertifikat Persahabatan",
      type: "text",
      defaultValue: "PIAGAM KEHORMATAN SAHABAT SEJATI SEUMUR HIDUP",
      helperText: "Judul resmi di dalam piagam.",
    },
    {
      name: "pactSerialNumber",
      label: "Nomor Registrasi Ikrar Sahabat",
      type: "text",
      defaultValue: "PACT-BFF-2017-FOREVER-001",
      helperText: "Nomor seri unik piagam persahabatan.",
    },
    {
      name: "pactPledge",
      label: "Naskah Ikrar Sumpah Sahabat",
      type: "textarea",
      defaultValue:
        "Dengan ini dideklarasikan bahwa ikatan persahabatan ini sah secara hati nurani, tahan terhadap ujian jarak, waktu, dan segala dinamika kehidupan. Saling mendukung di masa jaya, saling merengkuh di masa duka, dan tak akan pernah membiarkan yang lain berjuang sendirian.",
      helperText: "Teks deklarasi resmi persahabatan seumur hidup.",
    },
    {
      name: "pactSecretMessage",
      label: "Pesan Rahasia dari Lubuk Hati (Secret Message)",
      type: "textarea",
      defaultValue:
        "“Jika dunia di luar sana terlalu bising dan melelahkan, kembalilah ke tenda ini. Api unggun persahabatan kita tidak akan pernah padam.”",
      helperText: "Pesan paling menyentuh yang terungkap di dalam brankas.",
    },
  ],
  sample: {
    primaryColor: "#d97706",
    backgroundColor: "#0f172a",
    cardColor: "#1e293b",
    textColor: "#fef3c7",
    bodyTextColor: "#cbd5e1",

    friendName: "Dimas Arya Pratama",
    senderName: "Rian Aditya",
    friendshipMoniker: "The Midnight Trailblazers & Partners in Crime",
    heroSubtitle:
      "Di bawah hamparan galaksi dan hangatnya kobaran api unggun, ini adalah catatan sakral tentang sebuah persahabatan yang menolak pudar oleh jarak dan waktu.",
    heroPhoto:
      "https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=1200&q=80",
    badgeText: "🏕️ Official Campfire Brotherhood • Est. 2017",
    yearsKnown: "8 Tahun",
    daysLaughed: "2.900+ Hari",
    hqLocation: "Kopi Sudut Tenda & Bukit Bintang",
    musicUrl: "https://assets.mixkit.co/music/preview/mixkit-acoustic-guitar-chill-1033.mp3",
    musicTitle: "Acoustic Campfire & Ember Serenade",

    memory1Title: "Malam Tersesat di Puncak Kabut",
    memory1Date: "Agustus 2019 • Puncak Gn. Prau",
    memory1Story:
      "Bahan bakar kompor habis, hujan gerimis turun, tapi kita justru tertawa terpingkal-pingkal membagi sebungkus mie instan mentah sambil memandang lampu kota di kejauhan.",
    memory1Tag: "Survival Level: 100",

    memory2Title: "Proyek Begadang & Kopi Basi Jam 3 Pagi",
    memory2Date: "November 2021 • Kost Nomor 14",
    memory2Story:
      "Laptop sempat error sejam sebelum deadline, kita saling tatap lemas, lalu sepakat beli roti bakar dulu daripada pusing. Akhirnya tugas selesai dengan nilai A minus.",
    memory2Tag: "Clutch Moment of Glory",

    memory3Title: "Roadtrip Spontan Tanpa Rencana",
    memory3Date: "Juli 2023 • Jalur Pantai Selatan",
    memory3Story:
      "Niat awal cuma beli bensin ke minimarket, berujung berkendara 200 km sampai ke tepi pantai hanya demi makan kelapa muda dan melihat matahari terbenam bersama.",
    memory3Tag: "Wanderlust Brothers",

    memory4Title: "Hening di Tengah Badai Hidup",
    memory4Date: "Maret 2024 • Jembatan Sungai Kota",
    memory4Story:
      "Ketika salah satu dari kita sedang dihantam kabar terberat dalam hidup, tidak banyak nasihat klise yang kau berikan—hanya tepukan bahu kokoh dan kehadiran tanpa jeda.",
    memory4Tag: "Unbreakable Anchor",

    survival1Title: "Kopi Hitam Jam 2 Pagi",
    survival1Desc: "Penawar kantuk saat curhat tentang mimpi-mimpi gila yang belum tercapai.",

    survival2Title: "Meme Absurd Tanpa Konteks",
    survival2Desc: "Senjata paling ampuh mengubah hari yang suram menjadi tawa tak terkendali.",

    survival3Title: "Kunci Helm & Motor Cadangan",
    survival3Desc: "Siap jemput kapan pun dan di mana pun saat situasi sedang darurat.",

    survival4Title: "Kejujuran Pahit yang Menyelamatkan",
    survival4Desc: "Orang pertama yang menegur saat kita salah jalan, tapi tak pernah meninggalkan.",

    joke1Phrase: "“Aman, gas dulu aja!”",
    joke1Meaning: "Sama sekali tidak aman, tapi kita tetap nekat maju bersama.",
    joke1Origin: "Tragedi ban bocor di tengah kebun teh waktu magrib.",

    joke2Phrase: "“5 Menit Lagi Sampai”",
    joke2Meaning: "Baru selesai mandi dan masih bingung mau pakai baju apa.",
    joke2Origin: "Setiap janji nongkrong sejak tahun 2018 tanpa terkecuali.",

    joke3Phrase: "“Pangsit Tambahan Misterius”",
    joke3Meaning: "Taktik jitu mengambil lauk sahabat saat dia sedang lengah mengobrol.",
    joke3Origin: "Warung Bakso Pak Kumis malam minggu.",

    polaroid1Photo:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
    polaroid1Caption: "Tertawa lepas di tepian tebing sebelum matahari tenggelam.",
    polaroid1Location: "Bukit Senja Parangtritis",
    polaroid1Date: "14 Okt 2020",

    polaroid2Photo:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
    polaroid2Caption: "Gitar akustik sumbang dan obrolan tentang masa depan.",
    polaroid2Location: "Teras Belakang Rumah",
    polaroid2Date: "22 Des 2021",

    polaroid3Photo:
      "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=800&q=80",
    polaroid3Caption: "Pose paling sok keren setelah touring ratusan kilometer.",
    polaroid3Location: "Rest Area KM 97",
    polaroid3Date: "05 Mei 2023",

    polaroid4Photo:
      "https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&w=800&q=80",
    polaroid4Caption: "Sahabat yang selalu ada, dari seragam hingga lembar kerja.",
    polaroid4Location: "Kedai Kopi Kota Tua",
    polaroid4Date: "19 Feb 2024",

    letterGreeting: "Untuk Sahabat Terbaikku, Dimas,",
    letterParagraph1:
      "Malam ini, saat menuliskan surat ini di antara heningnya malam dan kenangan yang melintas, aku tersadar betapa beruntungnya aku memiliki seorang sahabat sepertimu. Waktu berlari begitu cepat tanpa permisi; kita yang dulu hanya dua anak muda dengan mimpi yang tampak mustahil, kini perlahan meniti jalan hidup masing-masing.",
    letterParagraph2:
      "Terima kasih untuk setiap tawa yang kau hadirkan saat duniaku sedang runtuh. Terima kasih karena tidak pernah menghakimi kekuranganku, namun selalu ada menjadi jangkar yang kokoh ketika aku hampir kehilangan arah. Persahabatan ini bukan sekadar tentang seberapa sering kita bertemu, tapi tentang keyakinan bahwa sejauh apa pun langkah kita, ikatan ini tak akan pernah meregang.",
    letterParagraph3:
      "Semoga langkah kakimu ke depan selalu diberkahi keberanian, kesuksesan, dan kebahagiaan sejati. Ingatlah, pintu rumahku dan telingaku akan selalu terbuka untukmu, apa pun keadaannya. Kita akan menua bersama dengan segudang cerita hebat untuk diceritakan kembali.",
    letterClosing: "Sahabat Sejatimu Selamanya,",
    letterSignature: "Rian Aditya",
    letterPostscript: "P.S. Jangan lupa akhir pekan ini tetap jatah kopi dan mie rebus di tempat biasa!",

    vaultPrompt: "Sentuh Gembok untuk Membuka Piagam Sumpah Persahabatan",
    pactCertificateTitle: "PIAGAM KEHORMATAN SAHABAT SEJATI SEUMUR HIDUP",
    pactSerialNumber: "PACT-BFF-2017-FOREVER-001",
    pactPledge:
      "Dengan ini dideklarasikan bahwa ikatan persahabatan ini sah secara hati nurani, tahan terhadap ujian jarak, waktu, dan segala dinamika kehidupan. Saling mendukung di masa jaya, saling merengkuh di masa duka, dan tak akan pernah membiarkan yang lain berjuang sendirian.",
    pactSecretMessage:
      "“Jika dunia di luar sana terlalu bising dan melelahkan, kembalilah ke tenda ini. Api unggun persahabatan kita tidak akan pernah padam.”",
  },
};
