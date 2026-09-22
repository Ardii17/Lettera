import type { TemplateMeta } from "../types";
import {
  FRIENDSHIP_COLOR_PRESETS,
  BACKGROUND_COLOR_PRESETS,
  CARD_COLOR_PRESETS,
  TEXT_COLOR_PRESETS,
} from "../color-presets";

export const roadtripFriendshipTemplate: TemplateMeta = {
  slug: "roadtrip-friendship",
  name: "The Great Roadtrip: Highway of Soulmates",
  category: "Pertemanan",
  tagline: "Petualangan perjalanan darat melintasi jalan tol tak berujung dengan dashboard mobil retro, rambu kilometer, laci glovebox, dan tiket tol emas.",
  description:
    "Website persembahan persahabatan bertema petualangan perjalanan darat dan penjelajahan lintas kota (Epic Roadtrip Adventure). Menampilkan dashboard kemudi retro dengan speedometer persahabatan, 4 tonggak rambu kilometer (Milemarkers) sejarah persahabatan, perlengkapan laci dashboard (Glovebox Stash) serta aturan jalan raya tak tertulis, galeri foto papan reklame vintage tepi jalan tol, warkat buku logbook pengemudi, serta tiket tol emas seumur hidup dengan tombol kunci kontak interaktif yang mengungkap pesan rahasia sang co-pilot.",
  cardAccent: "bg-amber-500/15 text-amber-700",
  highlights: [
    "Dashboard mobil retro dengan speedometer persahabatan, status bensin, & mixtape jalanan",
    "4 Rambu kilometer (Milemarkers) penanda fase-fase petualangan hidup",
    "Glovebox Stash (isi laci mobil) & Aturan Jalan Raya persahabatan tak tertulis",
    "Galeri 4 foto papan reklame jalan tol (*Highway Billboards*) ber-fallback estetik",
    "Warkat lembar logbook pengemudi dengan stempel pos jalan tol",
    "Tiket Tol Emas seumur hidup dengan tombol putar kunci kontak rahasia",
  ],
  fields: [
    // 1. Skema Warna
    {
      name: "primaryColor",
      label: "Warna Rambu & Lampu Jalan (Primary Color)",
      type: "color",
      defaultValue: "#f59e0b",
      helperText: "Warna rambu jalan kuning retro, tombol kontak, dan aksen kecepatan.",
      colorPresets: FRIENDSHIP_COLOR_PRESETS,
    },
    {
      name: "backgroundColor",
      label: "Warna Aspal Malam & Langit Gelap (Background Color)",
      type: "color",
      defaultValue: "#0f172a",
      helperText: "Warna dasar aspal jalan raya dan malam perjalanan.",
      colorPresets: BACKGROUND_COLOR_PRESETS,
    },
    {
      name: "cardColor",
      label: "Warna Dashboard & Rambu (Card Color)",
      type: "color",
      defaultValue: "#1e293b",
      helperText: "Warna wadah panel speedometer, kartu rambu, dan logbook.",
      colorPresets: CARD_COLOR_PRESETS,
    },
    {
      name: "textColor",
      label: "Warna Teks Judul & Angka Rambu",
      type: "color",
      defaultValue: "#fef08a",
      helperText: "Warna judul utama, angka kilometer, dan nama sahabat.",
      colorPresets: TEXT_COLOR_PRESETS,
    },
    {
      name: "bodyTextColor",
      label: "Warna Teks Isi & Cerita",
      type: "color",
      defaultValue: "#cbd5e1",
      helperText: "Warna narasi petualangan dan paragraf logbook.",
      colorPresets: TEXT_COLOR_PRESETS,
    },

    // 2. Bagian 1: Hero & Dashboard Kemudi
    {
      name: "routeCode",
      label: "Kode Rute Perjalanan",
      type: "text",
      defaultValue: "ROUTE BFF-INFINITY • COAST TO COAST HIGHWAY",
      helperText: "Nomor jalur jalan tol persahabatan.",
    },
    {
      name: "friendName",
      label: "Nama Sahabat / Co-Pilot Terbaik",
      type: "text",
      defaultValue: "Bagas Satria Pratama",
      helperText: "Nama sahabat yang duduk di kursi co-pilot.",
    },
    {
      name: "senderName",
      label: "Nama Pengirim / Driver",
      type: "text",
      defaultValue: "Farhan Mahendra",
      helperText: "Nama Anda sebagai rekan petualang di balik kemudi.",
    },
    {
      name: "duoMoniker",
      label: "Julukan Duet Petualang",
      type: "text",
      defaultValue: "The Endless Highway Drifters & Soul Brothers",
      helperText: "Julukan seru duet kalian di perjalanan.",
    },
    {
      name: "heroSubtitle",
      label: "Subjudul Sambutan Gerbang Tol",
      type: "textarea",
      defaultValue:
        "Berapa ratus kilometer pun aspal yang telah kita lalui, tidak pernah ada jalan buntu jika kau yang memegang peta navigasi di kursi samping.",
      helperText: "Pesan pembuka suasana perjalanan.",
    },
    {
      name: "heroPhoto",
      label: "Foto Utama di Dashboard / Kap Mobil (Hero Photo)",
      type: "text",
      defaultValue:
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
      helperText: "URL foto petualangan jalan raya kalian. Otomatis memiliki fallback foto mobil klasik tepi pantai.",
    },
    {
      name: "totalDistance",
      label: "Total Jarak Tertawa (KM)",
      type: "text",
      defaultValue: "12.500+ KM",
      helperText: "Estimasi kilometer perjalanan & tawa bersama.",
    },
    {
      name: "pitStopsCount",
      label: "Jumlah Pit-Stop / Rest Area",
      type: "text",
      defaultValue: "84 Pit-Stops",
      helperText: "Berapa banyak tempat berhenti dan ngopi di jalan.",
    },
    {
      name: "fuelStatus",
      label: "Status Tangki Persahabatan",
      type: "text",
      defaultValue: "Full Tank (100% Loyal)",
      helperText: "Kapasitas energi dan kesetiaan persahabatan.",
    },
    {
      name: "musicUrl",
      label: "URL Musik Mixtape Jalanan (.mp3)",
      type: "text",
      defaultValue: "https://assets.mixkit.co/music/preview/mixkit-driving-ambience-1088.mp3",
      helperText: "Tautan audio file .mp3 musik latar roadtrip santai.",
    },
    {
      name: "musicTitle",
      label: "Judul Musik Latar",
      type: "text",
      defaultValue: "Highway Mixtape: Sunset Cruise & Open Windows",
      helperText: "Judul trek yang diputar.",
    },

    // 3. Bagian 2: Milemarker Milestones (4 Rambu Kilometer)
    {
      name: "mile1Km",
      label: "Rambu 1: Penanda Kilometer",
      type: "text",
      defaultValue: "KM 000 • Titik Nol",
    },
    {
      name: "mile1Title",
      label: "Rambu 1: Judul Momen",
      type: "text",
      defaultValue: "Gerbang Tol Pertemuan Pertama",
    },
    {
      name: "mile1Date",
      label: "Rambu 1: Waktu & Lokasi",
      type: "text",
      defaultValue: "September 2017 • Gerbang Kampus",
    },
    {
      name: "mile1Story",
      label: "Rambu 1: Cerita Petualangan",
      type: "textarea",
      defaultValue:
        "Dua orang asing dengan tas ransel kumal yang sama-sama tersesat mencari ruang kelas, lalu memutuskan bolos bareng ke warung kopi terdekat. Itulah hari di mana mesin perjalanan ini dinyalakan.",
    },

    {
      name: "mile2Km",
      label: "Rambu 2: Penanda Kilometer",
      type: "text",
      defaultValue: "KM 450 • Jalur Berkelok",
    },
    {
      name: "mile2Title",
      label: "Rambu 2: Judul Momen",
      type: "text",
      defaultValue: "Tragedi Ban Kempes di Hutan Tanpa Sinyal",
    },
    {
      name: "mile2Date",
      label: "Rambu 2: Waktu & Lokasi",
      type: "text",
      defaultValue: "Juli 2020 • Jalur Lintas Selatan",
    },
    {
      name: "mile2Story",
      label: "Rambu 2: Cerita Petualangan",
      type: "textarea",
      defaultValue:
        "Ban motor bocor jam 6 sore di tengah hutan pinus sunyi. Alih-alih panik, kita malah buka bungkus biskuit dan menertawakan nasib sambil nunggu truk pick-up yang mau menolong.",
    },

    {
      name: "mile3Km",
      label: "Rambu 3: Penanda Kilometer",
      type: "text",
      defaultValue: "KM 1.800 • Tanjakan Curam",
    },
    {
      name: "mile3Title",
      label: "Rambu 3: Judul Momen",
      type: "text",
      defaultValue: "Menembus Badai Skripsi & Krisis Karir",
    },
    {
      name: "mile3Date",
      label: "Rambu 3: Waktu & Lokasi",
      type: "text",
      defaultValue: "Oktober 2022 • Kamar Kost Penuh Kertas",
    },
    {
      name: "mile3Story",
      label: "Rambu 3: Cerita Petualangan",
      type: "textarea",
      defaultValue:
        "Tanjakan hidup paling terjal: penolakan kerja, skripsi dibantai dosen, dan rekening nyaris nol. Tapi kursi samping tidak pernah kosong; kau selalu ada memastikan mesin mental kita tidak mogok.",
    },

    {
      name: "mile4Km",
      label: "Rambu 4: Penanda Kilometer",
      type: "text",
      defaultValue: "KM 5.000 • Garis Pantai",
    },
    {
      name: "mile4Title",
      label: "Rambu 4: Judul Momen",
      type: "text",
      defaultValue: "Melihat Sunset Kemenangan Bersama",
    },
    {
      name: "mile4Date",
      label: "Rambu 4: Waktu & Lokasi",
      type: "text",
      defaultValue: "Februari 2024 • Tebing Pantai Barat",
    },
    {
      name: "mile4Story",
      label: "Rambu 4: Cerita Petualangan",
      type: "textarea",
      defaultValue:
        "Duduk di atas kap mobil dengan angin laut yang menerpa wajah, menatap langit jingga keemasan. Kita menoleh satu sama lain dan bergumam: 'Gila ya, akhirnya kita bisa sampai di titik ini.'",
    },

    // 4. Bagian 3: Glovebox Stash & Highway Rules
    {
      name: "stash1Title",
      label: "Isi Laci 1: Nama Benda",
      type: "text",
      defaultValue: "Kaset Mixtape Jalanan Rusak",
    },
    {
      name: "stash1Desc",
      label: "Isi Laci 1: Deskripsi",
      type: "text",
      defaultValue: "Kaset pita dengan lagu-lagu nostalgia yang selalu diputar berulang meski suaranya sudah agak mendem.",
    },

    {
      name: "stash2Title",
      label: "Isi Laci 2: Nama Benda",
      type: "text",
      defaultValue: "Kacamata Hitam Kembar",
    },
    {
      name: "stash2Desc",
      label: "Isi Laci 2: Deskripsi",
      type: "text",
      defaultValue: "Senjata andalan untuk bergaya sok keren di kaca spion saat menyalip truk gandeng di jalan tol.",
    },

    {
      name: "stash3Title",
      label: "Isi Laci 3: Nama Benda",
      type: "text",
      defaultValue: "Permen Kopi Darurat Jam 3 Pagi",
    },
    {
      name: "stash3Desc",
      label: "Isi Laci 3: Deskripsi",
      type: "text",
      defaultValue: "Penyelamat nyawa agar driver tidak mengantuk saat menembus kabut tebal jalanan lintas provinsi.",
    },

    {
      name: "stash4Title",
      label: "Isi Laci 4: Nama Benda",
      type: "text",
      defaultValue: "Koin Tol & Kunci Pas Cadangan",
    },
    {
      name: "stash4Desc",
      label: "Isi Laci 4: Deskripsi",
      type: "text",
      defaultValue: "Bukti kesiapan kita menghadapi segala rintangan teknis apa pun yang menghadang di depan mata.",
    },

    // Aturan Jalan Raya
    {
      name: "rule1Title",
      label: "Aturan Jalan 1",
      type: "text",
      defaultValue: "“Yang duduk di samping dilarang tidur duluan!”",
    },
    {
      name: "rule1Desc",
      label: "Deskripsi Aturan 1",
      type: "text",
      defaultValue: "Tugas co-pilot adalah menjaga driver tetap waras dengan playlist seru dan obrolan random.",
    },

    {
      name: "rule2Title",
      label: "Aturan Jalan 2",
      type: "text",
      defaultValue: "“Hak prerogatif musik ada di tangan Co-Pilot.”",
    },
    {
      name: "rule2Desc",
      label: "Deskripsi Aturan 2",
      type: "text",
      defaultValue: "Driver fokus setir, co-pilot yang jadi DJ. Tidak boleh ada komplain kalau lagunya dangdut tiba-tiba.",
    },

    {
      name: "rule3Title",
      label: "Aturan Jalan 3",
      type: "text",
      defaultValue: "“Berhenti mendadak kalau lihat pemandangan keren.”",
    },
    {
      name: "rule3Desc",
      label: "Deskripsi Aturan 3",
      type: "text",
      defaultValue: "Tujuan perjalanan bukan soal cepat sampai, tapi soal menikmati setiap meter aspal bersama.",
    },

    // 5. Bagian 4: Highway Billboards & Trunk Gallery (4 Foto)
    {
      name: "billboard1Photo",
      label: "Reklame 1: URL Foto",
      type: "text",
      defaultValue:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      helperText: "URL foto pertama. Otomatis ada fallback foto pemandangan jalan raya estetik.",
    },
    {
      name: "billboard1Title",
      label: "Reklame 1: Judul Momen",
      type: "text",
      defaultValue: "Kabur Sejenak Menembus Lembah",
    },
    {
      name: "billboard1Location",
      label: "Reklame 1: Lokasi & Jalur",
      type: "text",
      defaultValue: "Jalur Puncak Dingin",
    },
    {
      name: "billboard1Quote",
      label: "Reklame 1: Catatan Tawa",
      type: "text",
      defaultValue: "“Kaca jendela dibuka selebar-lebarnya, teriak bareng melepas penat beban hidup.”",
    },

    {
      name: "billboard2Photo",
      label: "Reklame 2: URL Foto",
      type: "text",
      defaultValue:
        "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
      helperText: "URL foto kedua.",
    },
    {
      name: "billboard2Title",
      label: "Reklame 2: Judul Momen",
      type: "text",
      defaultValue: "Istirahat di Bawah Langit Senja",
    },
    {
      name: "billboard2Location",
      label: "Reklame 2: Lokasi & Jalur",
      type: "text",
      defaultValue: "Rest Area KM 260 Heritage",
    },
    {
      name: "billboard2Quote",
      label: "Reklame 2: Catatan Tawa",
      type: "text",
      defaultValue: "“Kopi sachet plastik dan gorengan hangat terasa kayak hidangan bintang lima.”",
    },

    {
      name: "billboard3Photo",
      label: "Reklame 3: URL Foto",
      type: "text",
      defaultValue:
        "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80",
      helperText: "URL foto ketiga.",
    },
    {
      name: "billboard3Title",
      label: "Reklame 3: Judul Momen",
      type: "text",
      defaultValue: "Batas Akhir Aspal di Tepi Samudra",
    },
    {
      name: "billboard3Location",
      label: "Reklame 3: Lokasi & Jalur",
      type: "text",
      defaultValue: "Jalur Pantai Karang",
    },
    {
      name: "billboard3Quote",
      label: "Reklame 3: Catatan Tawa",
      type: "text",
      defaultValue: "“Mobil kotor penuh debu pasir, tapi hati kita luar biasa bersih dan plong.”",
    },

    {
      name: "billboard4Photo",
      label: "Reklame 4: URL Foto",
      type: "text",
      defaultValue:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      helperText: "URL foto keempat.",
    },
    {
      name: "billboard4Title",
      label: "Reklame 4: Judul Momen",
      type: "text",
      defaultValue: "Kembali Pulang dengan Segudang Cerita",
    },
    {
      name: "billboard4Location",
      label: "Reklame 4: Lokasi & Jalur",
      type: "text",
      defaultValue: "Gerbang Tol Utama Kota",
    },
    {
      name: "billboard4Quote",
      label: "Reklame 4: Catatan Tawa",
      type: "text",
      defaultValue: "“Badan boleh pegal-pegal, tapi besoknya udah nanya: 'Kapan jalan lagi bro?'”",
    },

    // 6. Bagian 5: The Co-Pilot's Logbook Letter
    {
      name: "logbookGreeting",
      label: "Salam Pembuka Logbook",
      type: "text",
      defaultValue: "Untuk Sahabat & Co-Pilot Terbaikku, Bagas,",
      helperText: "Sapaan akrab di awal lembar logbook.",
    },
    {
      name: "logbookEntry1",
      label: "Logbook: Paragraf 1 (Refleksi Jarak & Waktu)",
      type: "textarea",
      defaultValue:
        "Menuliskan lembaran ini membuatku menengok kembali ke kaca spion perjalanan hidup kita. Rasanya baru kemarin kita cuma dua anak muda yang bingung mau melangkah ke mana, dengan motor butut dan bensin pas-pasan. Sekarang, ribuan kilometer aspal kehidupan sudah kita taklukkan bersama.",
      helperText: "Paragraf pembuka refleksi perjalanan.",
    },
    {
      name: "logbookEntry2",
      label: "Logbook: Paragraf 2 (Arti Kehadiran Co-Pilot)",
      type: "textarea",
      defaultValue:
        "Terima kasih telah menjadi co-pilot paling tangguh. Di saat jalanku sedang tertutup kabut tebal keraguan, kau tidak pernah panik menarik rem tangan, melainkan menyalakan lampu sorot optimisme dan membimbingku tetap maju. Persahabatan ini membuktikan bahwa kita tidak butuh peta yang sempurna, selama kita memiliki rekan berkendara yang tepat.",
      helperText: "Paragraf inti tentang rasa terima kasih tulus.",
    },
    {
      name: "logbookEntry3",
      label: "Logbook: Paragraf 3 (Janji Rute Masa Depan)",
      type: "textarea",
      defaultValue:
        "Jalan raya di depan sana mungkin masih menyimpan banyak tikungan tajam dan tanjakan ekstrem, tapi selama kursi samping ini terisi olehmu, aku tidak pernah takut menekan pedal gas. Kita akan terus melaju hingga garis finis kehidupan, membawa segudang kisah hebat untuk dikenang.",
      helperText: "Paragraf penutup tentang komitmen petualangan masa depan.",
    },
    {
      name: "logbookClosing",
      label: "Kalimat Penutup Logbook",
      type: "text",
      defaultValue: "Rekan Pengemudi Sejatimu Selamanya,",
      helperText: "Salam penutup hangat.",
    },
    {
      name: "logbookSignature",
      label: "Nama Tanda Tangan",
      type: "text",
      defaultValue: "Farhan Mahendra",
      helperText: "Tanda tangan pengirim.",
    },
    {
      name: "logbookPostscript",
      label: "Catatan Kaki (P.S.)",
      type: "text",
      defaultValue: "P.S. Jangan lupa cek tekanan ban akhir pekan ini, jadwal kita eksplor rute baru!",
      helperText: "Catatan kecil di akhir logbook.",
    },

    // 7. Bagian 6: Golden Highway Pass & Ignition Secret
    {
      name: "passTitle",
      label: "Judul Tiket Tol Emas",
      type: "text",
      defaultValue: "LIFETIME GOLDEN HIGHWAY PASS & BROTHERHOOD PACT",
      helperText: "Judul resmi pada tiket tol emas.",
    },
    {
      name: "passSerial",
      label: "Nomor Seri Tiket Tol",
      type: "text",
      defaultValue: "TOLL-PASS-BFF-UNLIMITED-001",
      helperText: "Kode registrasi tiket tol.",
    },
    {
      name: "passTerms",
      label: "Ketentuan Tiket Tol Persahabatan",
      type: "textarea",
      defaultValue:
        "Tiket ini memberikan hak akses tanpa batas bagi pemegangnya untuk melintasi segala badai dan rute kehidupan tanpa perlu membayar biaya sepeser pun. Selalu berlaku 24 jam sehari, 7 hari seminggu, seumur hidup.",
      helperText: "Naskah komitmen tiket tol.",
    },
    {
      name: "ignitionPrompt",
      label: "Teks Tombol Kunci Kontak Mobil",
      type: "text",
      defaultValue: "Putar Kunci Kontak untuk Mendengar Pesan Rahasia Co-Pilot",
      helperText: "Instruksi tombol interaktif kontak mobil.",
    },
    {
      name: "secretCoPilotMessage",
      label: "Pesan Rahasia dari Lubuk Hati Co-Pilot",
      type: "textarea",
      defaultValue:
        "“Jika suatu saat jalananmu terasa gelap dan kau kelelahan menyetir sendirian, tepikan mobilmu. Aku yang akan ambil alih kemudi dan membawamu pulang dengan selamat.”",
      helperText: "Pesan paling menyentuh hati yang terungkap saat kunci kontak diputar.",
    },
  ],
  sample: {
    primaryColor: "#f59e0b",
    backgroundColor: "#0f172a",
    cardColor: "#1e293b",
    textColor: "#fef08a",
    bodyTextColor: "#cbd5e1",

    routeCode: "ROUTE BFF-INFINITY • COAST TO COAST HIGHWAY",
    friendName: "Bagas Satria Pratama",
    senderName: "Farhan Mahendra",
    duoMoniker: "The Endless Highway Drifters & Soul Brothers",
    heroSubtitle:
      "Berapa ratus kilometer pun aspal yang telah kita lalui, tidak pernah ada jalan buntu jika kau yang memegang peta navigasi di kursi samping.",
    heroPhoto:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
    totalDistance: "12.500+ KM",
    pitStopsCount: "84 Pit-Stops",
    fuelStatus: "Full Tank (100% Loyal)",
    musicUrl: "https://assets.mixkit.co/music/preview/mixkit-driving-ambience-1088.mp3",
    musicTitle: "Highway Mixtape: Sunset Cruise & Open Windows",

    mile1Km: "KM 000 • Titik Nol",
    mile1Title: "Gerbang Tol Pertemuan Pertama",
    mile1Date: "September 2017 • Gerbang Kampus",
    mile1Story:
      "Dua orang asing dengan tas ransel kumal yang sama-sama tersesat mencari ruang kelas, lalu memutuskan bolos bareng ke warung kopi terdekat. Itulah hari di mana mesin perjalanan ini dinyalakan.",

    mile2Km: "KM 450 • Jalur Berkelok",
    mile2Title: "Tragedi Ban Kempes di Hutan Tanpa Sinyal",
    mile2Date: "Juli 2020 • Jalur Lintas Selatan",
    mile2Story:
      "Ban motor bocor jam 6 sore di tengah hutan pinus sunyi. Alih-alih panik, kita malah buka bungkus biskuit dan menertawakan nasib sambil nunggu truk pick-up yang mau menolong.",

    mile3Km: "KM 1.800 • Tanjakan Curam",
    mile3Title: "Menembus Badai Skripsi & Krisis Karir",
    mile3Date: "Oktober 2022 • Kamar Kost Penuh Kertas",
    mile3Story:
      "Tanjakan hidup paling terjal: penolakan kerja, skripsi dibantai dosen, dan rekening nyaris nol. Tapi kursi samping tidak pernah kosong; kau selalu ada memastikan mesin mental kita tidak mogok.",

    mile4Km: "KM 5.000 • Garis Pantai",
    mile4Title: "Melihat Sunset Kemenangan Bersama",
    mile4Date: "Februari 2024 • Tebing Pantai Barat",
    mile4Story:
      "Duduk di atas kap mobil dengan angin laut yang menerpa wajah, menatap langit jingga keemasan. Kita menoleh satu sama lain dan bergumam: 'Gila ya, akhirnya kita bisa sampai di titik ini.'",

    stash1Title: "Kaset Mixtape Jalanan Rusak",
    stash1Desc: "Kaset pita dengan lagu-lagu nostalgia yang selalu diputar berulang meski suaranya sudah agak mendem.",

    stash2Title: "Kacamata Hitam Kembar",
    stash2Desc: "Senjata andalan untuk bergaya sok keren di kaca spion saat menyalip truk gandeng di jalan tol.",

    stash3Title: "Permen Kopi Darurat Jam 3 Pagi",
    stash3Desc: "Penyelamat nyawa agar driver tidak mengantuk saat menembus kabut tebal jalanan lintas provinsi.",

    stash4Title: "Koin Tol & Kunci Pas Cadangan",
    stash4Desc: "Bukti kesiapan kita menghadapi segala rintangan teknis apa pun yang menghadang di depan mata.",

    rule1Title: "“Yang duduk di samping dilarang tidur duluan!”",
    rule1Desc: "Tugas co-pilot adalah menjaga driver tetap waras dengan playlist seru dan obrolan random.",

    rule2Title: "“Hak prerogatif musik ada di tangan Co-Pilot.”",
    rule2Desc: "Driver fokus setir, co-pilot yang jadi DJ. Tidak boleh ada komplain kalau lagunya dangdut tiba-tiba.",

    rule3Title: "“Berhenti mendadak kalau lihat pemandangan keren.”",
    rule3Desc: "Tujuan perjalanan bukan soal cepat sampai, tapi soal menikmati setiap meter aspal bersama.",

    billboard1Photo:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    billboard1Title: "Kabur Sejenak Menembus Lembah",
    billboard1Location: "Jalur Puncak Dingin",
    billboard1Quote: "“Kaca jendela dibuka selebar-lebarnya, teriak bareng melepas penat beban hidup.”",

    billboard2Photo:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
    billboard2Title: "Istirahat di Bawah Langit Senja",
    billboard2Location: "Rest Area KM 260 Heritage",
    billboard2Quote: "“Kopi sachet plastik dan gorengan hangat terasa kayak hidangan bintang lima.”",

    billboard3Photo:
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80",
    billboard3Title: "Batas Akhir Aspal di Tepi Samudra",
    billboard3Location: "Jalur Pantai Karang",
    billboard3Quote: "“Mobil kotor penuh debu pasir, tapi hati kita luar biasa bersih dan plong.”",

    billboard4Photo:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    billboard4Title: "Kembali Pulang dengan Segudang Cerita",
    billboard4Location: "Gerbang Tol Utama Kota",
    billboard4Quote: "“Badan boleh pegal-pegal, tapi besoknya udah nanya: 'Kapan jalan lagi bro?'”",

    logbookGreeting: "Untuk Sahabat & Co-Pilot Terbaikku, Bagas,",
    logbookEntry1:
      "Menuliskan lembaran ini membuatku menengok kembali ke kaca spion perjalanan hidup kita. Rasanya baru kemarin kita cuma dua anak muda yang bingung mau melangkah ke mana, dengan motor butut dan bensin pas-pasan. Sekarang, ribuan kilometer aspal kehidupan sudah kita taklukkan bersama.",
    logbookEntry2:
      "Terima kasih telah menjadi co-pilot paling tangguh. Di saat jalanku sedang tertutup kabut tebal keraguan, kau tidak pernah panik menarik rem tangan, melainkan menyalakan lampu sorot optimisme dan membimbingku tetap maju. Persahabatan ini membuktikan bahwa kita tidak butuh peta yang sempurna, selama kita memiliki rekan berkendara yang tepat.",
    logbookEntry3:
      "Jalan raya di depan sana mungkin masih menyimpan banyak tikungan tajam dan tanjakan ekstrem, tapi selama kursi samping ini terisi olehmu, aku tidak pernah takut menekan pedal gas. Kita akan terus melaju hingga garis finis kehidupan, membawa segudang kisah hebat untuk dikenang.",
    logbookClosing: "Rekan Pengemudi Sejatimu Selamanya,",
    logbookSignature: "Farhan Mahendra",
    logbookPostscript: "P.S. Jangan lupa cek tekanan ban akhir pekan ini, jadwal kita eksplor rute baru!",

    passTitle: "LIFETIME GOLDEN HIGHWAY PASS & BROTHERHOOD PACT",
    passSerial: "TOLL-PASS-BFF-UNLIMITED-001",
    passTerms:
      "Tiket ini memberikan hak akses tanpa batas bagi pemegangnya untuk melintasi segala badai dan rute kehidupan tanpa perlu membayar biaya sepeser pun. Selalu berlaku 24 jam sehari, 7 hari seminggu, seumur hidup.",
    ignitionPrompt: "Putar Kunci Kontak untuk Mendengar Pesan Rahasia Co-Pilot",
    secretCoPilotMessage:
      "“Jika suatu saat jalananmu terasa gelap dan kau kelelahan menyetir sendirian, tepikan mobilmu. Aku yang akan ambil alih kemudi dan membawamu pulang dengan selamat.”",
  },
};
