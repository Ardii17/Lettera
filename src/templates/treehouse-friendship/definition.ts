import type { TemplateMeta } from "../types";
import {
  FRIENDSHIP_COLOR_PRESETS,
  BACKGROUND_COLOR_PRESETS,
  CARD_COLOR_PRESETS,
  TEXT_COLOR_PRESETS,
} from "../color-presets";

export const treehouseFriendshipTemplate: TemplateMeta = {
  slug: "treehouse-friendship",
  name: "The Secret Treehouse: Eternal Youth",
  category: "Pertemanan",
  tagline: "Markas rahasia rumah pohon masa muda di dahan rindang dengan lingkaran cincin kayu, toples kenangan, warkat papan terukir, dan pintu kolong rahasia.",
  description:
    "Website persembahan persahabatan bertema rumah pohon nostalgia dan markas persembunyian rahasia (The Secret Treehouse Clubhouse). Menghadirkan tangga tali rimbun dengan lencana kata sandi rahasia, 4 lingkaran cincin pohon (Tree-Ring Milestones) saksi pertumbuhan ikatan, toples kaca memorabilia artefak masa kecil, galeri foto terpasang di pagar kayu teras ber-fallback estetik, warkat surat terukir di atas serat kayu pohon ek, serta Piagam Kepemilikan Markas dengan pintu kolong rahasia di lantai kayu yang mengungkap pesan terdalam sahabat.",
  cardAccent: "bg-emerald-600/15 text-emerald-800",
  highlights: [
    "Atmosfer rumah pohon rindang dengan lampu peri hangat & lonceng angin bambu",
    "Kata sandi rahasia masuk markas & metrik ribuan jam bersembunyi dari bisingnya dunia",
    "4 Lingkaran tahun pohon (Tree-Ring Milestones) penanda evolusi persahabatan",
    "4 Toples kaca memorabilia (Mason Jars) penyimpan benda berharga masa muda",
    "Galeri 4 foto pagar kayu teras ber-fallback estetik alam bebas berkualitas tinggi",
    "Warkat surat terukir di papan kayu & pintu kolong lantai rahasia pembuka pesan hati",
  ],
  fields: [
    // 1. Skema Warna
    {
      name: "primaryColor",
      label: "Warna Daun Hutan & Lampu Peri (Primary Color)",
      type: "color",
      defaultValue: "#10b981",
      helperText: "Warna aksen dedaunan hijau zamrud, tombol aksi, dan sorotan markas.",
      colorPresets: FRIENDSHIP_COLOR_PRESETS,
    },
    {
      name: "backgroundColor",
      label: "Warna Latar Hutan Malam (Background Color)",
      type: "color",
      defaultValue: "#06231a",
      helperText: "Warna dasar kanopi hutan dan malam persembunyian.",
      colorPresets: BACKGROUND_COLOR_PRESETS,
    },
    {
      name: "cardColor",
      label: "Warna Papan Kayu Cedar (Card Color)",
      type: "color",
      defaultValue: "#0f362a",
      helperText: "Warna wadah papan rumah pohon dan panel toples kenangan.",
      colorPresets: CARD_COLOR_PRESETS,
    },
    {
      name: "textColor",
      label: "Warna Teks Judul (Krim Dedaunan)",
      type: "color",
      defaultValue: "#ecfdf5",
      helperText: "Warna judul utama, nama sahabat, dan angka cincin tahun.",
      colorPresets: TEXT_COLOR_PRESETS,
    },
    {
      name: "bodyTextColor",
      label: "Warna Teks Isi & Cerita",
      type: "color",
      defaultValue: "#cbd5e1",
      helperText: "Warna narasi kenangan dan paragraf surat ukiran kayu.",
      colorPresets: TEXT_COLOR_PRESETS,
    },

    // 2. Bagian 1: Hero & Clubhouse Gateway
    {
      name: "clubhouseName",
      label: "Nama Markas / Rumah Pohon",
      type: "text",
      defaultValue: "The Canopy Fort: Hideout of Soulmates",
      helperText: "Nama markas persembunyian rahasia kalian.",
    },
    {
      name: "secretPassword",
      label: "Ketukan & Kata Sandi Rahasia Masuk",
      type: "text",
      defaultValue: "KETUK 3X • KATA SANDI: “SAHABAT SEJATI”",
      helperText: "Sandi rahasia menaiki tangga tali.",
    },
    {
      name: "friendName",
      label: "Nama Sahabat Karib",
      type: "text",
      defaultValue: "Alifia Zahra Paramitha",
      helperText: "Nama sahabat terbaik penerima persembahan.",
    },
    {
      name: "senderName",
      label: "Nama Pengirim / Pendiri Markas",
      type: "text",
      defaultValue: "Tiara Anindita",
      helperText: "Nama Anda sebagai rekan pendiri markas.",
    },
    {
      name: "duoTitle",
      label: "Status Anggota Kehormatan",
      type: "text",
      defaultValue: "The Treehouse Founders & Lifelong Soul Sisters",
      helperText: "Julukan kompak kalian di markas ini.",
    },
    {
      name: "welcomePlaque",
      label: "Kutipan Sambutan di Tangga Rumah Pohon",
      type: "textarea",
      defaultValue:
        "“Tinggalkan sepatu dan topeng kedewasaanmu di bawah tangga tali. Di atas dahan rindang ini, kita selamanya adalah anak-anak polos yang menolak ditaklukkan kerasnya dunia.”",
      helperText: "Pesan pembuka di gerbang rumah pohon.",
    },
    {
      name: "heroPhoto",
      label: "Foto Utama di Teras Rumah Pohon (Hero Photo)",
      type: "text",
      defaultValue:
        "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=1200&q=80",
      helperText: "Foto momen terbaik berdua di alam / rumah pohon. Otomatis ada fallback estetik.",
    },
    {
      name: "establishedYear",
      label: "Tahun Didirikan (Masa Bersama)",
      type: "text",
      defaultValue: "Est. 2015 (10 Tahun Markas)",
      helperText: "Tahun awal persahabatan dimulai.",
    },
    {
      name: "hoursHidden",
      label: "Total Jam Bersembunyi dari Dunia",
      type: "text",
      defaultValue: "3.650+ Jam Tawa",
      helperText: "Estimasi waktu berkualitas yang dihabiskan bersama.",
    },
    {
      name: "securityLevel",
      label: "Tingkat Izin Masuk Markas",
      type: "text",
      defaultValue: "Level BFF (Strictly Protected)",
      helperText: "Tingkat keamanan markas rahasia.",
    },
    {
      name: "musicUrl",
      label: "URL Musik Akustik & Lonceng Angin (.mp3)",
      type: "text",
      defaultValue: "https://assets.mixkit.co/music/preview/mixkit-valley-sunset-127.mp3",
      helperText: "Tautan audio file .mp3 musik latar angin dan alam santai.",
    },
    {
      name: "musicTitle",
      label: "Judul Musik Latar",
      type: "text",
      defaultValue: "Canopy Breeze & Wind Chimes Melancholy",
      helperText: "Judul trek yang diputar.",
    },

    // 3. Bagian 2: Tree-Ring Milestones (4 Lingkaran Cincin Pohon)
    {
      name: "ring1Phase",
      label: "Cincin 1: Fase Pertumbuhan",
      type: "text",
      defaultValue: "CINCIN 01 • BENIH & TUNAS AWAL",
    },
    {
      name: "ring1Title",
      label: "Cincin 1: Judul Momen",
      type: "text",
      defaultValue: "Bertukar Bekal & Janji Tangga Tali",
    },
    {
      name: "ring1Period",
      label: "Cincin 1: Periode Momen",
      type: "text",
      defaultValue: "Tahun 2015 • Bangku SMP",
    },
    {
      name: "ring1Story",
      label: "Cincin 1: Cerita Pertumbuhan",
      type: "textarea",
      defaultValue:
        "Dua anak perempuan pemalu yang berebut bangku pojok kelas, berakhir saling mencicipi bekal nasi goreng dan berjanji membuat kode rahasia yang tak boleh diketahui guru.",
    },

    {
      name: "ring2Phase",
      label: "Cincin 2: Fase Pertumbuhan",
      type: "text",
      defaultValue: "CINCIN 02 • DAHAN YANG MENGUAT",
    },
    {
      name: "ring2Title",
      label: "Cincin 2: Judul Momen",
      type: "text",
      defaultValue: "Menghadapi Ujian & Kenakalan Remaja",
    },
    {
      name: "ring2Period",
      label: "Cincin 2: Periode Momen",
      type: "text",
      defaultValue: "Tahun 2018 • Masa Putih Abu-Abu",
    },
    {
      name: "ring2Story",
      label: "Cincin 2: Cerita Pertumbuhan",
      type: "textarea",
      defaultValue:
        "PR matematika yang dikerjakan 15 menit sebelum bel berbunyi, curhat tentang cowok yang tidak peka, dan tawa terbahak-bahak saat tertangkap basah makan camilan di jam pelajaran.",
    },

    {
      name: "ring3Phase",
      label: "Cincin 3: Fase Pertumbuhan",
      type: "text",
      defaultValue: "CINCIN 03 • AKAR YANG MENGHUNJAM",
    },
    {
      name: "ring3Title",
      label: "Cincin 3: Judul Momen",
      type: "text",
      defaultValue: "Badai Pertama di Gerbang Kedewasaan",
    },
    {
      name: "ring3Period",
      label: "Cincin 3: Periode Momen",
      type: "text",
      defaultValue: "Tahun 2021 • Fase Kuliah & Krisis Quarter-Life",
    },
    {
      name: "ring3Story",
      label: "Cincin 3: Cerita Pertumbuhan",
      type: "textarea",
      defaultValue:
        "Ketika kita sama-sama mulai dihantam kenyataan hidup yang tak seindah impian masa kecil. Duduk berjam-jam di teras markas ini tanpa kata, saling menguatkan akar agar tak tumbang oleh angin kencang.",
    },

    {
      name: "ring4Phase",
      label: "Cincin 4: Fase Pertumbuhan",
      type: "text",
      defaultValue: "CINCIN 04 • TAJUK RINDANG ABADI",
    },
    {
      name: "ring4Title",
      label: "Cincin 4: Judul Momen",
      type: "text",
      defaultValue: "Tempat Bernaung Selamanya",
    },
    {
      name: "ring4Period",
      label: "Cincin 4: Periode Momen",
      type: "text",
      defaultValue: "Tahun 2025 & Selamanya • Masa Depan",
    },
    {
      name: "ring4Story",
      label: "Cincin 4: Cerita Pertumbuhan",
      type: "textarea",
      defaultValue:
        "Pohon persahabatan ini kini telah tumbuh menjulang kokoh. Sejauh apa pun kita merantau, dahan rindang markas ini akan selalu siap meneduhkan kita dari terik panasnya dunia.",
    },

    // 4. Bagian 3: Memorabilia Mason Jars (4 Toples Kenangan)
    {
      name: "jar1Title",
      label: "Toples 1: Nama Artefak",
      type: "text",
      defaultValue: "Kelereng Bening & Karcis Bioskop Pertama",
    },
    {
      name: "jar1Desc",
      label: "Toples 1: Deskripsi",
      type: "text",
      defaultValue: "Sisa kenangan menonton film kartun hari minggu dan berebut popcorn karamel.",
    },

    {
      name: "jar2Title",
      label: "Toples 2: Nama Artefak",
      type: "text",
      defaultValue: "Kertas Lipat Origami Surat Rahasia",
    },
    {
      name: "jar2Desc",
      label: "Toples 2: Deskripsi",
      type: "text",
      defaultValue: "Kertas bergaris yang dilempar saat jam ujian berisi kode contekan dan gambar doodle lucu.",
    },

    {
      name: "jar3Title",
      label: "Toples 3: Nama Artefak",
      type: "text",
      defaultValue: "Gantungan Kunci Persahabatan Kembar",
    },
    {
      name: "jar3Desc",
      label: "Toples 3: Deskripsi",
      type: "text",
      defaultValue: "Dibeli di pasar malam dengan uang saku terakhir, warnanya pudar tapi nilainya abadi.",
    },

    {
      name: "jar4Title",
      label: "Toples 4: Nama Artefak",
      type: "text",
      defaultValue: "Batu Kerikil Doa dari Puncak Bukit",
    },
    {
      name: "jar4Desc",
      label: "Toples 4: Deskripsi",
      type: "text",
      defaultValue: "Batu kecil saksi bisu janji kita berdua bahwa kita akan sukses dan bahagia bersama.",
    },

    // 5. Bagian 4: Wooden Railing Photo Gallery (4 Foto)
    {
      name: "railing1Photo",
      label: "Foto 1: URL Foto Pagar Kayu",
      type: "text",
      defaultValue:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
      helperText: "URL foto pertama. Otomatis ada fallback estetik tawa alam bebas.",
    },
    {
      name: "railing1Title",
      label: "Foto 1: Judul Momen",
      type: "text",
      defaultValue: "Tertawa Bebas di Atas Ayunan Tali",
    },
    {
      name: "railing1Date",
      label: "Foto 1: Tanggal",
      type: "text",
      defaultValue: "08 Mei 2016",
    },
    {
      name: "railing1Memory",
      label: "Foto 1: Catatan Kenangan",
      type: "text",
      defaultValue: "“Kaki mengayun tinggi ke langit, merasa dunia ini milik kita berdua saja.”",
    },

    {
      name: "railing2Photo",
      label: "Foto 2: URL Foto Pagar Kayu",
      type: "text",
      defaultValue:
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
      helperText: "URL foto kedua.",
    },
    {
      name: "railing2Title",
      label: "Foto 2: Judul Momen",
      type: "text",
      defaultValue: "Piknik Spontan di Bawah Pohon Rindang",
    },
    {
      name: "railing2Date",
      label: "Foto 2: Tanggal",
      type: "text",
      defaultValue: "14 November 2019",
    },
    {
      name: "railing2Memory",
      label: "Foto 2: Catatan Kenangan",
      type: "text",
      defaultValue: "“Bermodal sebotol teh manis dan sekotak kue basah, obrolan mengalir sampai magrib.”",
    },

    {
      name: "railing3Photo",
      label: "Foto 3: URL Foto Pagar Kayu",
      type: "text",
      defaultValue:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
      helperText: "URL foto ketiga.",
    },
    {
      name: "railing3Title",
      label: "Foto 3: Judul Momen",
      type: "text",
      defaultValue: "Matahari Terbit Menembus Kabut Daun",
    },
    {
      name: "railing3Date",
      label: "Foto 3: Tanggal",
      type: "text",
      defaultValue: "22 September 2022",
    },
    {
      name: "railing3Memory",
      label: "Foto 3: Catatan Kenangan",
      type: "text",
      defaultValue: "“Kedinginan dibalut satu selimut tebal berdua sambil menatap fajar merekah.”",
    },

    {
      name: "railing4Photo",
      label: "Foto 4: URL Foto Pagar Kayu",
      type: "text",
      defaultValue:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
      helperText: "URL foto keempat.",
    },
    {
      name: "railing4Title",
      label: "Foto 4: Judul Momen",
      type: "text",
      defaultValue: "Dekap Erat Hari Kelulusan",
    },
    {
      name: "railing4Date",
      label: "Foto 4: Tanggal",
      type: "text",
      defaultValue: "10 Agustus 2024",
    },
    {
      name: "railing4Memory",
      label: "Foto 4: Catatan Kenangan",
      type: "text",
      defaultValue: "“Kita yang dulu cuma anak kecil pohon, kini melangkah anggun menatap dunia luas.”",
    },

    // 6. Bagian 5: Carved Wooden Plank Letter
    {
      name: "carvedGreeting",
      label: "Salam Pembuka Ukiran Kayu",
      type: "text",
      defaultValue: "Untuk Sahabat Hatiku, Alifia,",
      helperText: "Sapaan akrab di awal warkat papan kayu.",
    },
    {
      name: "carvedParagraph1",
      label: "Ukiran: Paragraf 1 (Saksi Tempat & Pertumbuhan)",
      type: "textarea",
      defaultValue:
        "Di dahan pohon beringin tua ini, sepuluh tahun yang lalu kita pernah memanjat tinggi dengan lutut lecet dan baju kotor berdebu. Kita mengukir nama kita di batang kayu ini, tanpa tahu bahwa persahabatan yang kita mulai dari kepolosan itu akan menjadi harta paling berharga dalam seluruh perjalanan hidupku.",
      helperText: "Paragraf pembuka refleksi tempat masa kecil.",
    },
    {
      name: "carvedParagraph2",
      label: "Ukiran: Paragraf 2 (Arti Rumah & Penerimaan Tulus)",
      type: "textarea",
      defaultValue:
        "Dunia di luar sana menuntut kita menjadi dewasa begitu cepat, menuntut kesempurnaan, dan sering kali membuat dada terasa sesak. Tapi setiap kali aku berbicara denganmu, aku selalu merasa kembali ke rumah pohon ini—tempat di mana aku boleh menangis tanpa rasa malu, boleh bercerita tanpa takut dihakimi, dan boleh tertawa lepas menjadi diriku yang seutuhnya.",
      helperText: "Paragraf inti tentang rasa syukur persahabatan mendalam.",
    },
    {
      name: "carvedParagraph3",
      label: "Ukiran: Paragraf 3 (Janji Masa Depan)",
      type: "textarea",
      defaultValue:
        "Terima kasih telah tumbuh bersamaku. Berapa pun usia kita nanti, rambut kita mungkin akan memutih dan langkah kita melambat, tapi janji markas ini tak akan pernah lapuk oleh cuaca. Pintu rumah pohon ini akan selalu terbuka menyambutmu pulang.",
      helperText: "Paragraf penutup doa dan komitmen menua bersama.",
    },
    {
      name: "carvedClosing",
      label: "Kalimat Penutup Surat",
      type: "text",
      defaultValue: "Sahabat Jiwamu Sepanjang Hayat,",
      helperText: "Salam penutup hangat.",
    },
    {
      name: "carvedSignature",
      label: "Nama Tanda Tangan Ukiran",
      type: "text",
      defaultValue: "Tiara Anindita",
      helperText: "Tanda tangan pengirim.",
    },
    {
      name: "carvedPostscript",
      label: "Catatan Kaki (P.S.)",
      type: "text",
      defaultValue: "P.S. Tangga tali ini tidak akan pernah ditarik ke atas untukmu!",
      helperText: "Catatan kecil ukiran papan.",
    },

    // 7. Bagian 6: Clubhouse Deed & Trapdoor Secret
    {
      name: "deedTitle",
      label: "Judul Piagam Kepemilikan Markas",
      type: "text",
      defaultValue: "PIAGAM HAK KEPEMILIKAN MARKAS RAHASIA SEUMUR HIDUP",
      helperText: "Judul resmi piagam rumah pohon.",
    },
    {
      name: "deedSerial",
      label: "Nomor Registrasi Piagam Markas",
      type: "text",
      defaultValue: "CLUBHOUSE-DEED-TREE-2015-ETERNAL",
      helperText: "Nomor seri unik piagam rumah pohon.",
    },
    {
      name: "deedCovenant",
      label: "Naskah Ikrar Hak Milik Markas",
      type: "textarea",
      defaultValue:
        "Diberikan hak perlindungan mutlak, hak singgah tanpa batas, dan kepemilikan abadi atas markas rahasia ini. Tidak ada kekuatan dunia yang dapat membatalkan persaudaraan hati ini.",
      helperText: "Naskah deklarasi piagam.",
    },
    {
      name: "trapdoorPrompt",
      label: "Teks Tombol Pintu Kolong Lantai Kayu",
      type: "text",
      defaultValue: "Angkat Pintu Kolong Lantai Kayu untuk Membaca Pesan Rahasia",
      helperText: "Instruksi interaksi pintu kolong.",
    },
    {
      name: "secretFloorboardMessage",
      label: "Pesan Rahasia di Bawah Lantai Kayu",
      type: "textarea",
      defaultValue:
        "“Jika suatu hari nanti kau merasa dunia melupakanmu atau kau merasa sendirian, ingatlah: di markas ini ada seseorang yang selalu berdoa untuk kebahagiaanmu setiap hari.”",
      helperText: "Pesan paling menyentuh yang tersembunyi di bawah lantai papan kayu.",
    },
  ],
  sample: {
    primaryColor: "#10b981",
    backgroundColor: "#06231a",
    cardColor: "#0f362a",
    textColor: "#ecfdf5",
    bodyTextColor: "#cbd5e1",

    clubhouseName: "The Canopy Fort: Hideout of Soulmates",
    secretPassword: "KETUK 3X • KATA SANDI: “SAHABAT SEJATI”",
    friendName: "Alifia Zahra Paramitha",
    senderName: "Tiara Anindita",
    duoTitle: "The Treehouse Founders & Lifelong Soul Sisters",
    welcomePlaque:
      "“Tinggalkan sepatu dan topeng kedewasaanmu di bawah tangga tali. Di atas dahan rindang ini, kita selamanya adalah anak-anak polos yang menolak ditaklukkan kerasnya dunia.”",
    heroPhoto:
      "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=1200&q=80",
    establishedYear: "Est. 2015 (10 Tahun Markas)",
    hoursHidden: "3.650+ Jam Tawa",
    securityLevel: "Level BFF (Strictly Protected)",
    musicUrl: "https://assets.mixkit.co/music/preview/mixkit-valley-sunset-127.mp3",
    musicTitle: "Canopy Breeze & Wind Chimes Melancholy",

    ring1Phase: "CINCIN 01 • BENIH & TUNAS AWAL",
    ring1Title: "Bertukar Bekal & Janji Tangga Tali",
    ring1Period: "Tahun 2015 • Bangku SMP",
    ring1Story:
      "Dua anak perempuan pemalu yang berebut bangku pojok kelas, berakhir saling mencicipi bekal nasi goreng dan berjanji membuat kode rahasia yang tak boleh diketahui guru.",

    ring2Phase: "CINCIN 02 • DAHAN YANG MENGUAT",
    ring2Title: "Menghadapi Ujian & Kenakalan Remaja",
    ring2Period: "Tahun 2018 • Masa Putih Abu-Abu",
    ring2Story:
      "PR matematika yang dikerjakan 15 menit sebelum bel berbunyi, curhat tentang cowok yang tidak peka, dan tawa terbahak-bahak saat tertangkap basah makan camilan di jam pelajaran.",

    ring3Phase: "CINCIN 03 • AKAR YANG MENGHUNJAM",
    ring3Title: "Badai Pertama di Gerbang Kedewasaan",
    ring3Period: "Tahun 2021 • Fase Kuliah & Krisis Quarter-Life",
    ring3Story:
      "Ketika kita sama-sama mulai dihantam kenyataan hidup yang tak seindah impian masa kecil. Duduk berjam-jam di teras markas ini tanpa kata, saling menguatkan akar agar tak tumbang oleh angin kencang.",

    ring4Phase: "CINCIN 04 • TAJUK RINDANG ABADI",
    ring4Title: "Tempat Bernaung Selamanya",
    ring4Period: "Tahun 2025 & Selamanya • Masa Depan",
    ring4Story:
      "Pohon persahabatan ini kini telah tumbuh menjulang kokoh. Sejauh apa pun kita merantau, dahan rindang markas ini akan selalu siap meneduhkan kita dari terik panasnya dunia.",

    jar1Title: "Kelereng Bening & Karcis Bioskop Pertama",
    jar1Desc: "Sisa kenangan menonton film kartun hari minggu dan berebut popcorn karamel.",

    jar2Title: "Kertas Lipat Origami Surat Rahasia",
    jar2Desc: "Kertas bergaris yang dilempar saat jam ujian berisi kode contekan dan gambar doodle lucu.",

    jar3Title: "Gantungan Kunci Persahabatan Kembar",
    jar3Desc: "Dibeli di pasar malam dengan uang saku terakhir, warnanya pudar tapi nilainya abadi.",

    jar4Title: "Batu Kerikil Doa dari Puncak Bukit",
    jar4Desc: "Batu kecil saksi bisu janji kita berdua bahwa kita akan sukses dan bahagia bersama.",

    railing1Photo:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80",
    railing1Title: "Tertawa Bebas di Atas Ayunan Tali",
    railing1Date: "08 Mei 2016",
    railing1Memory: "“Kaki mengayun tinggi ke langit, merasa dunia ini milik kita berdua saja.”",

    railing2Photo:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
    railing2Title: "Piknik Spontan di Bawah Pohon Rindang",
    railing2Date: "14 November 2019",
    railing2Memory: "“Bermodal sebotol teh manis dan sekotak kue basah, obrolan mengalir sampai magrib.”",

    railing3Photo:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    railing3Title: "Matahari Terbit Menembus Kabut Daun",
    railing3Date: "22 September 2022",
    railing3Memory: "“Kedinginan dibalut satu selimut tebal berdua sambil menatap fajar merekah.”",

    railing4Photo:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    railing4Title: "Dekap Erat Hari Kelulusan",
    railing4Date: "10 Agustus 2024",
    railing4Memory: "“Kita yang dulu cuma anak kecil pohon, kini melangkah anggun menatap dunia luas.”",

    carvedGreeting: "Untuk Sahabat Hatiku, Alifia,",
    carvedParagraph1:
      "Di dahan pohon beringin tua ini, sepuluh tahun yang lalu kita pernah memanjat tinggi dengan lutut lecet dan baju kotor berdebu. Kita mengukir nama kita di batang kayu ini, tanpa tahu bahwa persahabatan yang kita mulai dari kepolosan itu akan menjadi harta paling berharga dalam seluruh perjalanan hidupku.",
    carvedParagraph2:
      "Dunia di luar sana menuntut kita menjadi dewasa begitu cepat, menuntut kesempurnaan, dan sering kali membuat dada terasa sesak. Tapi setiap kali aku berbicara denganmu, aku selalu merasa kembali ke rumah pohon ini—tempat di mana aku boleh menangis tanpa rasa malu, boleh bercerita tanpa takut dihakimi, dan boleh tertawa lepas menjadi diriku yang seutuhnya.",
    carvedParagraph3:
      "Terima kasih telah tumbuh bersamaku. Berapa pun usia kita nanti, rambut kita mungkin akan memutih dan langkah kita melambat, tapi janji markas ini tak akan pernah lapuk oleh cuaca. Pintu rumah pohon ini akan selalu terbuka menyambutmu pulang.",
    carvedClosing: "Sahabat Jiwamu Sepanjang Hayat,",
    carvedSignature: "Tiara Anindita",
    carvedPostscript: "P.S. Tangga tali ini tidak akan pernah ditarik ke atas untukmu!",

    deedTitle: "PIAGAM HAK KEPEMILIKAN MARKAS RAHASIA SEUMUR HIDUP",
    deedSerial: "CLUBHOUSE-DEED-TREE-2015-ETERNAL",
    deedCovenant:
      "Diberikan hak perlindungan mutlak, hak singgah tanpa batas, dan kepemilikan abadi atas markas rahasia ini. Tidak ada kekuatan dunia yang dapat membatalkan persaudaraan hati ini.",
    trapdoorPrompt: "Angkat Pintu Kolong Lantai Kayu untuk Membaca Pesan Rahasia",
    secretFloorboardMessage:
      "“Jika suatu hari nanti kau merasa dunia melupakanmu atau kau merasa sendirian, ingatlah: di markas ini ada seseorang yang selalu berdoa untuk kebahagiaanmu setiap hari.”",
  },
};
