import type { TemplateMeta } from "../types";
import {
  FRIENDSHIP_COLOR_PRESETS,
  BACKGROUND_COLOR_PRESETS,
  CARD_COLOR_PRESETS,
  TEXT_COLOR_PRESETS,
} from "../color-presets";

export const bistroFriendshipTemplate: TemplateMeta = {
  slug: "bistro-friendship",
  name: "Bistro des Amis: Late-Night Café",
  category: "Pertemanan",
  tagline: "Kedai bistro hangat tengah malam dengan meja sudut kenangan, menu racikan tawa, piringan vinyl, serbet bersurat, dan bon kasir tak ternilai.",
  description:
    "Website persembahan persahabatan bertema kedai kopi dan bistro vintage malam hari (Midnight Diner / Parisian Bistro). Menghadirkan suasana intim meja sudut berdua di bawah temaram bohlam edison, 4 hidangan metaforis racikan persahabatan (The House Menu), dinding piringan hitam lagu kenangan (Vinyl Jukebox), galeri foto dinding berbingkai jati kuningan ber-fallback estetik, warkat surat di atas serbet linen bernoda cangkir kopi, serta bon kasir kenangan dengan tatakan gelas berpesan rahasia.",
  cardAccent: "bg-amber-600/15 text-amber-800",
  highlights: [
    "Atmosfer bistro malam dengan lampu temaram edison, papan kapur, & musik jazz lo-fi",
    "Meja reservasi kehormatan berdua dengan metrik cangkir kopi & rekor jam ngobrol",
    "4 Menu kuliner metaforis persahabatan (House Menu) dengan racikan bahan emosional",
    "Dinding 4 piringan hitam (Vinyl Jukebox) interaktif pemutar lagu kenangan",
    "Galeri 4 foto berbingkai kayu jati & plakat kuningan dengan cadangan foto estetik",
    "Surat reflektif di atas serbet linen & bon kasir kenangan dengan tatakan gelas flip rahasia",
  ],
  fields: [
    // 1. Skema Warna
    {
      name: "primaryColor",
      label: "Warna Aksen Kuningan & Bohlam (Primary Color)",
      type: "color",
      defaultValue: "#d97706",
      helperText: "Warna ornamen kuningan, plakat reservasi, dan tombol aksi.",
      colorPresets: FRIENDSHIP_COLOR_PRESETS,
    },
    {
      name: "backgroundColor",
      label: "Warna Latar Kayu Mahogani Gelap (Background Color)",
      type: "color",
      defaultValue: "#1a120b",
      helperText: "Warna dasar dinding kayu bistro temaram.",
      colorPresets: BACKGROUND_COLOR_PRESETS,
    },
    {
      name: "cardColor",
      label: "Warna Panel Meja & Kartu Menu (Card Color)",
      type: "color",
      defaultValue: "#2b1e16",
      helperText: "Warna wadah kartu menu, bingkai, dan panel warkat.",
      colorPresets: CARD_COLOR_PRESETS,
    },
    {
      name: "textColor",
      label: "Warna Teks Judul & Nama (Krim Kafe)",
      type: "color",
      defaultValue: "#fef3c7",
      helperText: "Warna nama sahabat dan judul menu.",
      colorPresets: TEXT_COLOR_PRESETS,
    },
    {
      name: "bodyTextColor",
      label: "Warna Teks Isi & Cerita",
      type: "color",
      defaultValue: "#d6d3d1",
      helperText: "Warna deskripsi menu dan narasi surat.",
      colorPresets: TEXT_COLOR_PRESETS,
    },

    // 2. Bagian 1: Hero & Table for Two
    {
      name: "bistroName",
      label: "Nama Kedai / Bistro",
      type: "text",
      defaultValue: "Bistro des Âmes Sœurs: Midnight Café",
      helperText: "Nama kedai metaforis tempat persahabatan berlabuh.",
    },
    {
      name: "tableNumber",
      label: "Nomor Meja Reservasi Kehormatan",
      type: "text",
      defaultValue: "Table No. 07 • The Cozy Corner Booth",
      helperText: "Nomor meja khusus kalian berdua.",
    },
    {
      name: "friendName",
      label: "Nama Sahabat Terbaik",
      type: "text",
      defaultValue: "Nadhira Az-Zahra",
      helperText: "Nama sahabat yang menerima persembahan ini.",
    },
    {
      name: "senderName",
      label: "Nama Pengirim / Rekan Secangkir Kopi",
      type: "text",
      defaultValue: "Clarissa Aurelia",
      helperText: "Nama Anda sebagai sahabat karib.",
    },
    {
      name: "duoTitle",
      label: "Status / Julukan Pelanggan Setia",
      type: "text",
      defaultValue: "The Inseparable Regulars & Soul Sisters",
      helperText: "Julukan kompak kalian di bistro ini.",
    },
    {
      name: "chalkboardWelcome",
      label: "Pesan Sambutan Papan Kapur (Chalkboard)",
      type: "textarea",
      defaultValue:
        "“Hujan di luar boleh dingin, dunia boleh riuh melelahkan. Tapi di meja sudut ini, secangkir kopi hangat dan tawa kita tidak pernah mengenal jam tutup.”",
      helperText: "Kutipan sambutan pembuka di gerbang bistro.",
    },
    {
      name: "heroPhoto",
      label: "Foto Utama Meja Sahabat (Hero Photo)",
      type: "text",
      defaultValue:
        "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80",
      helperText: "Foto momen berdua di kafe atau nongkrong. Jika kosong, otomatis memakai gambar estetik kedai kopi.",
    },
    {
      name: "servingSince",
      label: "Tahun Buka (Masa Persahabatan)",
      type: "text",
      defaultValue: "Sejak 2016 (9 Tahun)",
      helperText: "Tahun awal persahabatan dimulai.",
    },
    {
      name: "coffeeLiters",
      label: "Estimasi Cangkir & Teh Bersama",
      type: "text",
      defaultValue: "1.250+ Cangkir",
      helperText: "Berapa banyak minuman yang telah dihabiskan bersama.",
    },
    {
      name: "longestChatHours",
      label: "Rekor Obrolan Terpanjang",
      type: "text",
      defaultValue: "7.5 Jam Nonstop",
      helperText: "Durasi obrolan terlama tanpa jeda.",
    },
    {
      name: "musicUrl",
      label: "URL Musik Latar Jazz Lo-Fi / Akustik Bistro",
      type: "text",
      defaultValue: "https://assets.mixkit.co/music/preview/mixkit-chill-bro-494.mp3",
      helperText: "Tautan audio file .mp3 musik latar bistro santai.",
    },
    {
      name: "musicTitle",
      label: "Judul Musik Latar",
      type: "text",
      defaultValue: "Midnight Lo-Fi Coffeehouse & Rain Serenade",
      helperText: "Judul trek yang diputar.",
    },

    // 3. Bagian 2: The House Menu (4 Menu Metaforis)
    {
      name: "menu1Name",
      label: "Menu 1: Nama Sajian",
      type: "text",
      defaultValue: "Espresso Midnight Confession",
    },
    {
      name: "menu1Ingredients",
      label: "Menu 1: Komposisi Bahan",
      type: "text",
      defaultValue: "100% Ekstrak Curhat Jam 1 Pagi, 0% Gula Kepalsuan, Sentuhan Pelukan Hangat.",
    },
    {
      name: "menu1Notes",
      label: "Menu 1: Catatan Filosofi",
      type: "textarea",
      defaultValue:
        "Paling pas diseduh saat hidup terasa begitu pekat dan kita butuh orang yang mendengar tanpa terburu-buru menghakimi.",
    },
    {
      name: "menu1Price",
      label: "Menu 1: Nilai Emosional",
      type: "text",
      defaultValue: "Tak Ternilai (Priceless)",
    },

    {
      name: "menu2Name",
      label: "Menu 2: Nama Sajian",
      type: "text",
      defaultValue: "Crispy Golden Laughter Fries",
    },
    {
      name: "menu2Ingredients",
      label: "Menu 2: Komposisi Bahan",
      type: "text",
      defaultValue: "Tawa renyah tak terkendali, celetukan spontan, dan kenangan konyol masa lalu.",
    },
    {
      name: "menu2Notes",
      label: "Menu 2: Catatan Filosofi",
      type: "textarea",
      defaultValue:
        "Camilan wajib yang selalu ludes dalam sekejap saat kita mulai menertawakan pilihan-pilihan bodoh di masa remaja.",
    },
    {
      name: "menu2Price",
      label: "Menu 2: Nilai Emosional",
      type: "text",
      defaultValue: "Gratis Seumur Hidup",
    },

    {
      name: "menu3Name",
      label: "Menu 3: Nama Sajian",
      type: "text",
      defaultValue: "Comforting Storm Ramen Bowl",
    },
    {
      name: "menu3Ingredients",
      label: "Menu 3: Komposisi Bahan",
      type: "text",
      defaultValue: "Kaldu empati pekat, semangkuk kesabaran penuh, dan tisu cadangan tanpa batas.",
    },
    {
      name: "menu3Notes",
      label: "Menu 3: Catatan Filosofi",
      type: "textarea",
      defaultValue:
        "Dihidangkan khusus ketika badai hidup atau patah hati datang bertubi-tubi. Menghangatkan dada yang sempat remuk.",
    },
    {
      name: "menu3Price",
      label: "Menu 3: Nilai Emosional",
      type: "text",
      defaultValue: "Selalu Siap Sedia",
    },

    {
      name: "menu4Name",
      label: "Menu 4: Nama Sajian",
      type: "text",
      defaultValue: "Sweet Milestone Soufflé",
    },
    {
      name: "menu4Ingredients",
      label: "Menu 4: Komposisi Bahan",
      type: "text",
      defaultValue: "Krim bangga yang meluap, taburan doa restu, dan tos cangkir perayaan mimpi.",
    },
    {
      name: "menu4Notes",
      label: "Menu 4: Catatan Filosofi",
      type: "textarea",
      defaultValue:
        "Pencuci mulut manis untuk merayakan setiap langkah kecil dan lompatan karir hebat yang berhasil kau taklukkan.",
    },
    {
      name: "menu4Price",
      label: "Menu 4: Nilai Emosional",
      type: "text",
      defaultValue: "Bonus Pelukan Erat",
    },

    // 4. Bagian 3: Jukebox Vinyl Anthems (4 Lagu Bersama)
    {
      name: "vinyl1Title",
      label: "Piringan 1: Judul Lagu & Artis",
      type: "text",
      defaultValue: "Count on Me — Bruno Mars",
    },
    {
      name: "vinyl1Year",
      label: "Piringan 1: Tahun / Musim Kenangan",
      type: "text",
      defaultValue: "Semester 1 • 2016",
    },
    {
      name: "vinyl1Memory",
      label: "Piringan 1: Memori di Balik Lagu",
      type: "text",
      defaultValue: "Lagu yang kita nyanyikan bareng waktu pertama kali pulang bareng naik angkot kehujanan.",
    },

    {
      name: "vinyl2Title",
      label: "Piringan 2: Judul Lagu & Artis",
      type: "text",
      defaultValue: "Kepompong — Sindesa / J-Rocks",
    },
    {
      name: "vinyl2Year",
      label: "Piringan 2: Tahun / Musim Kenangan",
      type: "text",
      defaultValue: "Masa Magang • 2019",
    },
    {
      name: "vinyl2Memory",
      label: "Piringan 2: Memori di Balik Lagu",
      type: "text",
      defaultValue: "Diputar di mobil rental sambil teriak sumbang waktu akhirnya berhasil bayar kos sendiri.",
    },

    {
      name: "vinyl3Title",
      label: "Piringan 3: Judul Lagu & Artis",
      type: "text",
      defaultValue: "Fix You — Coldplay",
    },
    {
      name: "vinyl3Year",
      label: "Piringan 3: Tahun / Musim Kenangan",
      type: "text",
      defaultValue: "Malam Tersuram • 2021",
    },
    {
      name: "vinyl3Memory",
      label: "Piringan 3: Memori di Balik Lagu",
      type: "text",
      defaultValue: "Cuma saling diam mendengarkan lagu ini berdua di rooftop kafe waktu masalah keluarga datang.",
    },

    {
      name: "vinyl4Title",
      label: "Piringan 4: Judul Lagu & Artis",
      type: "text",
      defaultValue: "Good Old Days — Macklemore ft. Kesha",
    },
    {
      name: "vinyl4Year",
      label: "Piringan 4: Tahun / Musim Kenangan",
      type: "text",
      defaultValue: "Reuni Tahunan • 2024",
    },
    {
      name: "vinyl4Memory",
      label: "Piringan 4: Memori di Balik Lagu",
      type: "text",
      defaultValue: "Pengingat bahwa hari-hari muda yang kita lewati bersama ini adalah masa terbaik dalam hidup.",
    },

    // 5. Bagian 4: Framed Moments Gallery (4 Foto Berbingkai)
    {
      name: "frame1Photo",
      label: "Bingkai 1: URL Foto",
      type: "text",
      defaultValue:
        "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80",
      helperText: "URL foto pertama. Otomatis ada fallback estetik cangkir kopi / tawa.",
    },
    {
      name: "frame1Title",
      label: "Bingkai 1: Judul Momen",
      type: "text",
      defaultValue: "Cangkir Pertama di Kafe Tua",
    },
    {
      name: "frame1Date",
      label: "Bingkai 1: Tanggal",
      type: "text",
      defaultValue: "12 September 2016",
    },
    {
      name: "frame1Quote",
      label: "Bingkai 1: Kutipan Tawa",
      type: "text",
      defaultValue: "“Waktu masih canggung manggil 'kamu-aku', sekarang udah saling teriak.”",
    },

    {
      name: "frame2Photo",
      label: "Bingkai 2: URL Foto",
      type: "text",
      defaultValue:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
      helperText: "URL foto kedua.",
    },
    {
      name: "frame2Title",
      label: "Bingkai 2: Judul Momen",
      type: "text",
      defaultValue: "Sidang Skripsi & Mata Panda",
    },
    {
      name: "frame2Date",
      label: "Bingkai 2: Tanggal",
      type: "text",
      defaultValue: "24 Juni 2020",
    },
    {
      name: "frame2Quote",
      label: "Bingkai 2: Kutipan Tawa",
      type: "text",
      defaultValue: "“Tidur cuma 2 jam, tapi senyum lebarnya bertahan seminggu penuh.”",
    },

    {
      name: "frame3Photo",
      label: "Bingkai 3: URL Foto",
      type: "text",
      defaultValue:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
      helperText: "URL foto ketiga.",
    },
    {
      name: "frame3Title",
      label: "Bingkai 3: Judul Momen",
      type: "text",
      defaultValue: "Kabur Liburan ke Pantai",
    },
    {
      name: "frame3Date",
      label: "Bingkai 3: Tanggal",
      type: "text",
      defaultValue: "08 Agustus 2022",
    },
    {
      name: "frame3Quote",
      label: "Bingkai 3: Kutipan Tawa",
      type: "text",
      defaultValue: "“Kacamata hitam, angin laut, dan playlist lagu yang diulang 10 kali.”",
    },

    {
      name: "frame4Photo",
      label: "Bingkai 4: URL Foto",
      type: "text",
      defaultValue:
        "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80",
      helperText: "URL foto keempat.",
    },
    {
      name: "frame4Title",
      label: "Bingkai 4: Judul Momen",
      type: "text",
      defaultValue: "Gala Dinner Ulang Tahun",
    },
    {
      name: "frame4Date",
      label: "Bingkai 4: Tanggal",
      type: "text",
      defaultValue: "17 Januari 2024",
    },
    {
      name: "frame4Quote",
      label: "Bingkai 4: Kutipan Tawa",
      type: "text",
      defaultValue: "“Makin dewasa gayanya, tapi ketawanya tetap kayak anak SD.”",
    },

    // 6. Bagian 5: The Napkin Letter
    {
      name: "napkinGreeting",
      label: "Salam Pembuka Serbet Bistro",
      type: "text",
      defaultValue: "Untuk Sahabat Terhebatku, Nadhira,",
      helperText: "Sapaan akrab di awal warkat serbet.",
    },
    {
      name: "napkinBody1",
      label: "Surat: Paragraf 1 (Saksi Tempat & Waktu)",
      type: "textarea",
      defaultValue:
        "Di meja sudut kecil ini, kita pernah menaruh semua hal: tumpukan buku tugas, laptop dengan baterai sekarat, mimpi-mimpi yang dulu tampak mustahil, hingga air mata yang diam-diam menetes saat dunia terasa terlalu menuntut. Betapa ajaibnya sebuah tempat ketika ia dihuni oleh orang yang tepat.",
      helperText: "Paragraf pembuka tentang memori kedai kopi.",
    },
    {
      name: "napkinBody2",
      label: "Surat: Paragraf 2 (Arti Rumah & Penerimaan)",
      type: "textarea",
      defaultValue:
        "Terima kasih telah menjadi sahabat yang tidak pernah memintaku menjadi orang lain. Di depanmu, aku tidak perlu memakai topeng keberhasilan atau berpura-pura selalu kuat. Kau melihat versi diriku yang paling berantakan, lalu tersenyum dan menuangkan secangkir teh hangat sambil berkata bahwa semuanya akan baik-baik saja.",
      helperText: "Paragraf inti tentang rasa terima kasih mendalam.",
    },
    {
      name: "napkinBody3",
      label: "Surat: Paragraf 3 (Janji Masa Depan)",
      type: "textarea",
      defaultValue:
        "Ke depan, kesibukan mungkin akan mencuri banyak waktu kita, tapi percayalah bahwa meja reservasi ini tidak akan pernah dibatalkan. Kapan pun kau butuh tempat untuk rehat, aku akan selalu ada di kursi seberangmu dengan pesanan favoritmu yang sudah siap.",
      helperText: "Paragraf penutup dan komitmen persahabatan.",
    },
    {
      name: "napkinClosing",
      label: "Salam Penutup Surat",
      type: "text",
      defaultValue: "Teman Secangkir Kopimu Selamanya,",
      helperText: "Salam penutup hangat.",
    },
    {
      name: "napkinSignature",
      label: "Nama Tanda Tangan",
      type: "text",
      defaultValue: "Clarissa Aurelia",
      helperText: "Tanda tangan pengirim.",
    },
    {
      name: "napkinPostscript",
      label: "Catatan Kaki Serbet (P.S.)",
      type: "text",
      defaultValue: "P.S. Jangan lupa minggu ini giliranmu yang traktir kue tart cokelatnya!",
      helperText: "Catatan kecil di sudut serbet.",
    },

    // 7. Bagian 6: The Memory Receipt & Coaster Flip
    {
      name: "receiptInvoiceNo",
      label: "Nomor Invoice Kenangan",
      type: "text",
      defaultValue: "INVOICE #BFF-2016-INFINITY",
      helperText: "Kode bon kasir vintage.",
    },
    {
      name: "receiptDate",
      label: "Tanggal Terbit Bon",
      type: "text",
      defaultValue: "Sepanjang Hayat (Lifetime Validity)",
      helperText: "Masa berlaku bon.",
    },
    {
      name: "receiptItem1",
      label: "Item Bon 1: Jam Obrolan Jujur",
      type: "text",
      defaultValue: "3.280+ Jam Obrolan Tanpa Filter — Rp 0 (Tulus)",
    },
    {
      name: "receiptItem2",
      label: "Item Bon 2: Tawa Menghilangkan Stres",
      type: "text",
      defaultValue: "Ribuan Episode Menertawakan Hal Absurd — Rp 0 (Gratis)",
    },
    {
      name: "receiptItem3",
      label: "Item Bon 3: Kesetiaan di Kala Badai",
      type: "text",
      defaultValue: "Hadir Menggenggam Tangan Saat Rapuh — Rp 0 (Murni)",
    },
    {
      name: "receiptItem4",
      label: "Item Bon 4: Garansi Sahabat Seumur Hidup",
      type: "text",
      defaultValue: "Tidak Ada Tanggal Kedaluwarsa — Terlindungi Hati",
    },
    {
      name: "receiptTotal",
      label: "Total Tagihan Kasir",
      type: "text",
      defaultValue: "TOTAL: TAK TERNILAI (PRICELESS)",
      helperText: "Status pembayaran persahabatan.",
    },
    {
      name: "coasterPrompt",
      label: "Teks Ajakan Membalik Tatakan Gelas",
      type: "text",
      defaultValue: "Balik Tatakan Gelas untuk Membaca Pesan Rahasia",
      helperText: "Instruksi interaksi tatakan gelas.",
    },
    {
      name: "coasterSecretMessage",
      label: "Pesan Rahasia di Bawah Tatakan Gelas",
      type: "textarea",
      defaultValue:
        "“Terima kasih sudah lahir ke dunia dan menjadi sahabat terbaik yang pernah kumiliki. Kamu adalah salah satu alasan kenapa hidup ini terasa begitu layak dijalani.”",
      helperText: "Pesan paling mengharukan yang tersembunyi di balik tatakan gelas.",
    },
  ],
  sample: {
    primaryColor: "#d97706",
    backgroundColor: "#1a120b",
    cardColor: "#2b1e16",
    textColor: "#fef3c7",
    bodyTextColor: "#d6d3d1",

    bistroName: "Bistro des Âmes Sœurs: Midnight Café",
    tableNumber: "Table No. 07 • The Cozy Corner Booth",
    friendName: "Nadhira Az-Zahra",
    senderName: "Clarissa Aurelia",
    duoTitle: "The Inseparable Regulars & Soul Sisters",
    chalkboardWelcome:
      "“Hujan di luar boleh dingin, dunia boleh riuh melelahkan. Tapi di meja sudut ini, secangkir kopi hangat dan tawa kita tidak pernah mengenal jam tutup.”",
    heroPhoto:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80",
    servingSince: "Sejak 2016 (9 Tahun)",
    coffeeLiters: "1.250+ Cangkir",
    longestChatHours: "7.5 Jam Nonstop",
    musicUrl: "https://assets.mixkit.co/music/preview/mixkit-chill-bro-494.mp3",
    musicTitle: "Midnight Lo-Fi Coffeehouse & Rain Serenade",

    menu1Name: "Espresso Midnight Confession",
    menu1Ingredients: "100% Ekstrak Curhat Jam 1 Pagi, 0% Gula Kepalsuan, Sentuhan Pelukan Hangat.",
    menu1Notes:
      "Paling pas diseduh saat hidup terasa begitu pekat dan kita butuh orang yang mendengar tanpa terburu-buru menghakimi.",
    menu1Price: "Tak Ternilai (Priceless)",

    menu2Name: "Crispy Golden Laughter Fries",
    menu2Ingredients: "Tawa renyah tak terkendali, celetukan spontan, dan kenangan konyol masa lalu.",
    menu2Notes:
      "Camilan wajib yang selalu ludes dalam sekejap saat kita mulai menertawakan pilihan-pilihan bodoh di masa remaja.",
    menu2Price: "Gratis Seumur Hidup",

    menu3Name: "Comforting Storm Ramen Bowl",
    menu3Ingredients: "Kaldu empati pekat, semangkuk kesabaran penuh, dan tisu cadangan tanpa batas.",
    menu3Notes:
      "Dihidangkan khusus ketika badai hidup atau patah hati datang bertubi-tubi. Menghangatkan dada yang sempat remuk.",
    menu3Price: "Selalu Siap Sedia",

    menu4Name: "Sweet Milestone Soufflé",
    menu4Ingredients: "Krim bangga yang meluap, taburan doa restu, dan tos cangkir perayaan mimpi.",
    menu4Notes:
      "Pencuci mulut manis untuk merayakan setiap langkah kecil dan lompatan karir hebat yang berhasil kau taklukkan.",
    menu4Price: "Bonus Pelukan Erat",

    vinyl1Title: "Count on Me — Bruno Mars",
    vinyl1Year: "Semester 1 • 2016",
    vinyl1Memory: "Lagu yang kita nyanyikan bareng waktu pertama kali pulang bareng naik angkot kehujanan.",

    vinyl2Title: "Kepompong — Sindesa / J-Rocks",
    vinyl2Year: "Masa Magang • 2019",
    vinyl2Memory: "Diputar di mobil rental sambil teriak sumbang waktu akhirnya berhasil bayar kos sendiri.",

    vinyl3Title: "Fix You — Coldplay",
    vinyl3Year: "Malam Tersuram • 2021",
    vinyl3Memory: "Cuma saling diam mendengarkan lagu ini berdua di rooftop kafe waktu masalah keluarga datang.",

    vinyl4Title: "Good Old Days — Macklemore ft. Kesha",
    vinyl4Year: "Reuni Tahunan • 2024",
    vinyl4Memory: "Pengingat bahwa hari-hari muda yang kita lewati bersama ini adalah masa terbaik dalam hidup.",

    frame1Photo:
      "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80",
    frame1Title: "Cangkir Pertama di Kafe Tua",
    frame1Date: "12 September 2016",
    frame1Quote: "“Waktu masih canggung manggil 'kamu-aku', sekarang udah saling teriak.”",

    frame2Photo:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    frame2Title: "Sidang Skripsi & Mata Panda",
    frame2Date: "24 Juni 2020",
    frame2Quote: "“Tidur cuma 2 jam, tapi senyum lebarnya bertahan seminggu penuh.”",

    frame3Photo:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    frame3Title: "Kabur Liburan ke Pantai",
    frame3Date: "08 Agustus 2022",
    frame3Quote: "“Kacamata hitam, angin laut, dan playlist lagu yang diulang 10 kali.”",

    frame4Photo:
      "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80",
    frame4Title: "Gala Dinner Ulang Tahun",
    frame4Date: "17 Januari 2024",
    frame4Quote: "“Makin dewasa gayanya, tapi ketawanya tetap kayak anak SD.”",

    napkinGreeting: "Untuk Sahabat Terhebatku, Nadhira,",
    napkinBody1:
      "Di meja sudut kecil ini, kita pernah menaruh semua hal: tumpukan buku tugas, laptop dengan baterai sekarat, mimpi-mimpi yang dulu tampak mustahil, hingga air mata yang diam-diam menetes saat dunia terasa terlalu menuntut. Betapa ajaibnya sebuah tempat ketika ia dihuni oleh orang yang tepat.",
    napkinBody2:
      "Terima kasih telah menjadi sahabat yang tidak pernah memintaku menjadi orang lain. Di depanmu, aku tidak perlu memakai topeng keberhasilan atau berpura-pura selalu kuat. Kau melihat versi diriku yang paling berantakan, lalu tersenyum dan menuangkan secangkir teh hangat sambil berkata bahwa semuanya akan baik-baik saja.",
    napkinBody3:
      "Ke depan, kesibukan mungkin akan mencuri banyak waktu kita, tapi percayalah bahwa meja reservasi ini tidak akan pernah dibatalkan. Kapan pun kau butuh tempat untuk rehat, aku akan selalu ada di kursi seberangmu dengan pesanan favoritmu yang sudah siap.",
    napkinClosing: "Teman Secangkir Kopimu Selamanya,",
    napkinSignature: "Clarissa Aurelia",
    napkinPostscript: "P.S. Jangan lupa minggu ini giliranmu yang traktir kue tart cokelatnya!",

    receiptInvoiceNo: "INVOICE #BFF-2016-INFINITY",
    receiptDate: "Sepanjang Hayat (Lifetime Validity)",
    receiptItem1: "3.280+ Jam Obrolan Tanpa Filter — Rp 0 (Tulus)",
    receiptItem2: "Ribuan Episode Menertawakan Hal Absurd — Rp 0 (Gratis)",
    receiptItem3: "Hadir Menggenggam Tangan Saat Rapuh — Rp 0 (Murni)",
    receiptItem4: "Tidak Ada Tanggal Kedaluwarsa — Terlindungi Hati",
    receiptTotal: "TOTAL: TAK TERNILAI (PRICELESS)",
    coasterPrompt: "Balik Tatakan Gelas untuk Membaca Pesan Rahasia",
    coasterSecretMessage:
      "“Terima kasih sudah lahir ke dunia dan menjadi sahabat terbaik yang pernah kumiliki. Kamu adalah salah satu alasan kenapa hidup ini terasa begitu layak dijalani.”",
  },
};
