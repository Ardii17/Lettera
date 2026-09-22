"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import Image from "next/image";
import type { TemplateComponentProps } from "../renderer";
import {
  Coffee,
  Disc,
  Utensils,
  Receipt,
  Heart,
  Volume2,
  VolumeX,
  Sparkles,
  Clock,
  Calendar,
  CheckCircle2,
  RotateCw,
  Feather,
  Flame,
  Music,
} from "lucide-react";

// Default Aesthetic Fallback Photos
const DEFAULT_HERO_PHOTO =
  "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80";
const DEFAULT_FRAME_1 =
  "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80";
const DEFAULT_FRAME_2 =
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80";
const DEFAULT_FRAME_3 =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80";
const DEFAULT_FRAME_4 =
  "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80";

function BistroFriendshipTemplateContent({
  data,
  className = "",
}: TemplateComponentProps) {
  const letter = data;

  // Colors
  const primaryColor = String(letter.primaryColor || "#d97706");
  const backgroundColor = String(letter.backgroundColor || "#1a120b");
  const cardColor = String(letter.cardColor || "#2b1e16");
  const textColor = String(letter.textColor || "#fef3c7");
  const bodyTextColor = String(letter.bodyTextColor || "#d6d3d1");

  // Hero & Reserved Table
  const bistroName = String(letter.bistroName || "Bistro des Âmes Sœurs: Midnight Café");
  const tableNumber = String(letter.tableNumber || "Table No. 07 • The Cozy Corner Booth");
  const friendName = String(letter.friendName || "Sahabat Terbaik");
  const senderName = String(letter.senderName || "Clarissa");
  const duoTitle = String(letter.duoTitle || "The Inseparable Regulars & Soul Sisters");
  const chalkboardWelcome = String(
    letter.chalkboardWelcome ||
      "“Hujan di luar boleh dingin, dunia boleh riuh melelahkan. Tapi di meja sudut ini, secangkir kopi hangat dan tawa kita tidak pernah mengenal jam tutup.”",
  );
  const heroPhoto = String(letter.heroPhoto || DEFAULT_HERO_PHOTO);
  const servingSince = String(letter.servingSince || "Sejak 2016 (9 Tahun)");
  const coffeeLiters = String(letter.coffeeLiters || "1.250+ Cangkir");
  const longestChatHours = String(letter.longestChatHours || "7.5 Jam Nonstop");

  // Music
  const musicUrl = String(letter.musicUrl || "");
  const musicTitle = String(
    letter.musicTitle || "Midnight Lo-Fi Coffeehouse & Rain Serenade",
  );

  // House Menu (4 items)
  const menuItems = [
    {
      name: String(letter.menu1Name || "Espresso Midnight Confession"),
      ingredients: String(
        letter.menu1Ingredients ||
          "100% Ekstrak Curhat Jam 1 Pagi, 0% Gula Kepalsuan, Sentuhan Pelukan Hangat.",
      ),
      notes: String(
        letter.menu1Notes ||
          "Paling pas diseduh saat hidup terasa begitu pekat dan kita butuh orang yang mendengar tanpa terburu-buru menghakimi.",
      ),
      price: String(letter.menu1Price || "Tak Ternilai (Priceless)"),
      tag: "Signature Blend",
    },
    {
      name: String(letter.menu2Name || "Crispy Golden Laughter Fries"),
      ingredients: String(
        letter.menu2Ingredients ||
          "Tawa renyah tak terkendali, celetukan spontan, dan kenangan konyol masa lalu.",
      ),
      notes: String(
        letter.menu2Notes ||
          "Camilan wajib yang selalu ludes dalam sekejap saat kita mulai menertawakan pilihan-pilihan bodoh di masa remaja.",
      ),
      price: String(letter.menu2Price || "Gratis Seumur Hidup"),
      tag: "Best for Sharing",
    },
    {
      name: String(letter.menu3Name || "Comforting Storm Ramen Bowl"),
      ingredients: String(
        letter.menu3Ingredients ||
          "Kaldu empati pekat, semangkuk kesabaran penuh, dan tisu cadangan tanpa batas.",
      ),
      notes: String(
        letter.menu3Notes ||
          "Dihidangkan khusus ketika badai hidup atau patah hati datang bertubi-tubi. Menghangatkan dada yang sempat remuk.",
      ),
      price: String(letter.menu3Price || "Selalu Siap Sedia"),
      tag: "Comfort Soul Food",
    },
    {
      name: String(letter.menu4Name || "Sweet Milestone Soufflé"),
      ingredients: String(
        letter.menu4Ingredients ||
          "Krim bangga yang meluap, taburan doa restu, dan tos cangkir perayaan mimpi.",
      ),
      notes: String(
        letter.menu4Notes ||
          "Pencuci mulut manis untuk merayakan setiap langkah kecil dan lompatan karir hebat yang berhasil kau taklukkan.",
      ),
      price: String(letter.menu4Price || "Bonus Pelukan Erat"),
      tag: "Celebration Special",
    },
  ];

  // Vinyl Jukebox (4 items)
  const vinyls = [
    {
      title: String(letter.vinyl1Title || "Count on Me — Bruno Mars"),
      year: String(letter.vinyl1Year || "Semester 1 • 2016"),
      memory: String(
        letter.vinyl1Memory ||
          "Lagu yang kita nyanyikan bareng waktu pertama kali pulang bareng naik angkot kehujanan.",
      ),
    },
    {
      title: String(letter.vinyl2Title || "Kepompong — Sindesa / J-Rocks"),
      year: String(letter.vinyl2Year || "Masa Magang • 2019"),
      memory: String(
        letter.vinyl2Memory ||
          "Diputar di mobil rental sambil teriak sumbang waktu akhirnya berhasil bayar kos sendiri.",
      ),
    },
    {
      title: String(letter.vinyl3Title || "Fix You — Coldplay"),
      year: String(letter.vinyl3Year || "Malam Tersuram • 2021"),
      memory: String(
        letter.vinyl3Memory ||
          "Cuma saling diam mendengarkan lagu ini berdua di rooftop kafe waktu masalah keluarga datang.",
      ),
    },
    {
      title: String(letter.vinyl4Title || "Good Old Days — Macklemore ft. Kesha"),
      year: String(letter.vinyl4Year || "Reuni Tahunan • 2024"),
      memory: String(
        letter.vinyl4Memory ||
          "Pengingat bahwa hari-hari muda yang kita lewati bersama ini adalah masa terbaik dalam hidup.",
      ),
    },
  ];

  // Framed Gallery Moments (4 items)
  const frames = [
    {
      photo: String(letter.frame1Photo || DEFAULT_FRAME_1),
      title: String(letter.frame1Title || "Cangkir Pertama di Kafe Tua"),
      date: String(letter.frame1Date || "12 September 2016"),
      quote: String(
        letter.frame1Quote ||
          "“Waktu masih canggung manggil 'kamu-aku', sekarang udah saling teriak.”",
      ),
    },
    {
      photo: String(letter.frame2Photo || DEFAULT_FRAME_2),
      title: String(letter.frame2Title || "Sidang Skripsi & Mata Panda"),
      date: String(letter.frame2Date || "24 Juni 2020"),
      quote: String(
        letter.frame2Quote ||
          "“Tidur cuma 2 jam, tapi senyum lebarnya bertahan seminggu penuh.”",
      ),
    },
    {
      photo: String(letter.frame3Photo || DEFAULT_FRAME_3),
      title: String(letter.frame3Title || "Kabur Liburan ke Pantai"),
      date: String(letter.frame3Date || "08 Agustus 2022"),
      quote: String(
        letter.frame3Quote ||
          "“Kacamata hitam, angin laut, dan playlist lagu yang diulang 10 kali.”",
      ),
    },
    {
      photo: String(letter.frame4Photo || DEFAULT_FRAME_4),
      title: String(letter.frame4Title || "Gala Dinner Ulang Tahun"),
      date: String(letter.frame4Date || "17 Januari 2024"),
      quote: String(
        letter.frame4Quote ||
          "“Makin dewasa gayanya, tapi ketawanya tetap kayak anak SD.”",
      ),
    },
  ];

  // Napkin Letter
  const napkinGreeting = String(
    letter.napkinGreeting || "Untuk Sahabat Terhebatku, Nadhira,",
  );
  const napkinBody1 = String(
    letter.napkinBody1 ||
      "Di meja sudut kecil ini, kita pernah menaruh semua hal: tumpukan buku tugas, laptop dengan baterai sekarat, mimpi-mimpi yang dulu tampak mustahil, hingga air mata yang diam-diam menetes saat dunia terasa terlalu menuntut. Betapa ajaibnya sebuah tempat ketika ia dihuni oleh orang yang tepat.",
  );
  const napkinBody2 = String(
    letter.napkinBody2 ||
      "Terima kasih telah menjadi sahabat yang tidak pernah memintaku menjadi orang lain. Di depanmu, aku tidak perlu memakai topeng keberhasilan atau berpura-pura selalu kuat. Kau melihat versi diriku yang paling berantakan, lalu tersenyum dan menuangkan secangkir teh hangat sambil berkata bahwa semuanya akan baik-baik saja.",
  );
  const napkinBody3 = String(
    letter.napkinBody3 ||
      "Ke depan, kesibukan mungkin akan mencuri banyak waktu kita, tapi percayalah bahwa meja reservasi ini tidak akan pernah dibatalkan. Kapan pun kau butuh tempat untuk rehat, aku akan selalu ada di kursi seberangmu dengan pesanan favoritmu yang sudah siap.",
  );
  const napkinClosing = String(
    letter.napkinClosing || "Teman Secangkir Kopimu Selamanya,",
  );
  const napkinSignature = String(letter.napkinSignature || "Clarissa Aurelia");
  const napkinPostscript = String(
    letter.napkinPostscript ||
      "P.S. Jangan lupa minggu ini giliranmu yang traktir kue tart cokelatnya!",
  );

  // Receipt & Coaster
  const receiptInvoiceNo = String(
    letter.receiptInvoiceNo || "INVOICE #BFF-2016-INFINITY",
  );
  const receiptDate = String(
    letter.receiptDate || "Sepanjang Hayat (Lifetime Validity)",
  );
  const receiptItem1 = String(
    letter.receiptItem1 || "3.280+ Jam Obrolan Tanpa Filter — Rp 0 (Tulus)",
  );
  const receiptItem2 = String(
    letter.receiptItem2 ||
      "Ribuan Episode Menertawakan Hal Absurd — Rp 0 (Gratis)",
  );
  const receiptItem3 = String(
    letter.receiptItem3 || "Hadir Menggenggam Tangan Saat Rapuh — Rp 0 (Murni)",
  );
  const receiptItem4 = String(
    letter.receiptItem4 ||
      "Tidak Ada Tanggal Kedaluwarsa — Terlindungi Hati",
  );
  const receiptTotal = String(
    letter.receiptTotal || "TOTAL: TAK TERNILAI (PRICELESS)",
  );
  const coasterPrompt = String(
    letter.coasterPrompt || "Balik Tatakan Gelas untuk Membaca Pesan Rahasia",
  );
  const coasterSecretMessage = String(
    letter.coasterSecretMessage ||
      "“Terima kasih sudah lahir ke dunia dan menjadi sahabat terbaik yang pernah kumiliki. Kamu adalah salah satu alasan kenapa hidup ini terasa begitu layak dijalani.”",
  );

  // States
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeVinyl, setActiveVinyl] = useState(0);
  const [isCoasterFlipped, setIsCoasterFlipped] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Audio Playback
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  useEffect(() => {
    const currentAudio = audioRef.current;
    return () => {
      if (currentAudio) {
        currentAudio.pause();
      }
    };
  }, []);

  return (
    <div
      className="min-h-screen relative overflow-x-hidden font-sans selection:bg-amber-700/30 selection:text-amber-200"
      style={{ backgroundColor, color: bodyTextColor }}
    >
      {/* Subtle Warm Edison Lamp Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none opacity-30">
        <div className="absolute top-10 left-1/3 w-80 h-80 bg-amber-600/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-700/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(#78350f_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
      </div>

      {/* Floating Lo-Fi Audio Player */}
      {musicUrl && (
        <div className="fixed bottom-6 right-6 z-50">
          <audio ref={audioRef} src={musicUrl} loop preload="none" />
          <button
            onClick={togglePlay}
            className="flex items-center gap-3 px-4 py-2.5 rounded-full shadow-2xl backdrop-blur-md border transition-all duration-300 transform hover:scale-105"
            style={{
              backgroundColor: `${cardColor}ee`,
              borderColor: `${primaryColor}66`,
              color: textColor,
            }}
            title={isPlaying ? "Jeda Musik Bistro" : "Putar Musik Bistro"}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-white transition-transform ${
                isPlaying ? "animate-spin" : ""
              }`}
              style={{ backgroundColor: primaryColor }}
            >
              <Disc className="w-4 h-4 text-white" />
            </div>
            <div className="text-left hidden sm:block max-w-[160px] truncate">
              <p className="text-xs font-semibold leading-tight truncate">{musicTitle}</p>
              <p className="text-[10px] opacity-70">
                {isPlaying ? "Lo-Fi Berputar..." : "Sentuh untuk Musik"}
              </p>
            </div>
            {isPlaying ? (
              <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4 opacity-60" />
            )}
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. HERO ENTRANCE & TABLE FOR TWO                                          */}
      {/* ========================================================================= */}
      <header className="relative pt-16 pb-20 px-4 sm:px-6 max-w-5xl mx-auto text-center">
        {/* Striped Bistro Awning Decoration */}
        <div className="w-48 h-3 mx-auto mb-6 rounded-full bg-gradient-to-r from-amber-800 via-amber-600 to-amber-800 opacity-70 shadow-sm" />

        {/* Reserved Booth Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-serif tracking-widest uppercase shadow-sm mb-4 backdrop-blur-sm"
          style={{
            borderColor: `${primaryColor}55`,
            backgroundColor: `${cardColor}bb`,
            color: primaryColor,
          }}
        >
          <Coffee className="w-3.5 h-3.5 text-amber-400" />
          <span>{tableNumber}</span>
        </div>

        {/* Bistro Name & Duo Status */}
        <p
          className="text-xs sm:text-sm font-mono tracking-widest uppercase mb-2 opacity-80"
          style={{ color: primaryColor }}
        >
          {bistroName}
        </p>

        {/* Hero Title */}
        <h1
          className="text-4xl sm:text-6xl font-serif font-extrabold tracking-tight mb-4"
          style={{ color: textColor }}
        >
          Meja Sudut Kita, <span style={{ color: primaryColor }}>{friendName}</span>
        </h1>

        {/* Duo Subtitle */}
        <p className="text-xs font-mono uppercase tracking-wider mb-6 opacity-70">
          Dedicated to {duoTitle}
        </p>

        {/* Chalkboard Welcome Board */}
        <div
          className="max-w-2xl mx-auto p-5 sm:p-6 rounded-2xl border border-dashed mb-10 shadow-lg relative"
          style={{
            backgroundColor: "#140f0b",
            borderColor: `${primaryColor}44`,
          }}
        >
          <p className="font-serif italic text-base sm:text-lg leading-relaxed text-amber-100/90">
            {chalkboardWelcome}
          </p>
          <span className="block mt-3 text-[11px] font-mono tracking-wider opacity-60 text-amber-300">
            — Catatan Papan Kapur Bistro • Kursi Selalu Tersedia
          </span>
        </div>

        {/* Hero Photo with Brass/Mahogany Frame */}
        <div
          className="relative max-w-2xl mx-auto rounded-3xl p-3 sm:p-4 border shadow-2xl backdrop-blur-sm transition-transform duration-500 hover:scale-[1.01]"
          style={{
            backgroundColor: `${cardColor}cc`,
            borderColor: `${primaryColor}44`,
          }}
        >
          <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-inner">
            <Image
              src={heroPhoto}
              alt={friendName}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 750px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs sm:text-sm">
              <span className="flex items-center gap-1.5 font-serif backdrop-blur-md bg-black/50 px-3 py-1 rounded-full border border-white/10">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                {senderName} & {friendName}
              </span>
              <span className="backdrop-blur-md bg-black/50 px-3 py-1 rounded-full border border-white/10 font-mono text-amber-300">
                {servingSince}
              </span>
            </div>
          </div>
        </div>

        {/* Bistro Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mt-10">
          <div
            className="p-4 rounded-2xl border text-center transition-all hover:border-amber-500/50"
            style={{ backgroundColor: cardColor, borderColor: `${primaryColor}33` }}
          >
            <Calendar className="w-5 h-5 mx-auto mb-2" style={{ color: primaryColor }} />
            <p className="text-xs uppercase font-mono tracking-wider opacity-70">
              Masa Kebersamaan
            </p>
            <p className="text-xl sm:text-2xl font-serif font-bold mt-1" style={{ color: textColor }}>
              {servingSince}
            </p>
          </div>

          <div
            className="p-4 rounded-2xl border text-center transition-all hover:border-amber-500/50"
            style={{ backgroundColor: cardColor, borderColor: `${primaryColor}33` }}
          >
            <Coffee className="w-5 h-5 mx-auto mb-2 text-amber-400" />
            <p className="text-xs uppercase font-mono tracking-wider opacity-70">
              Cangkir Dihabiskan
            </p>
            <p className="text-xl sm:text-2xl font-serif font-bold mt-1" style={{ color: textColor }}>
              {coffeeLiters}
            </p>
          </div>

          <div
            className="col-span-2 sm:col-span-1 p-4 rounded-2xl border text-center transition-all hover:border-amber-500/50"
            style={{ backgroundColor: cardColor, borderColor: `${primaryColor}33` }}
          >
            <Clock className="w-5 h-5 mx-auto mb-2 text-emerald-400" />
            <p className="text-xs uppercase font-mono tracking-wider opacity-70">
              Rekor Obrolan
            </p>
            <p className="text-xl sm:text-2xl font-serif font-bold mt-1" style={{ color: textColor }}>
              {longestChatHours}
            </p>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. THE HOUSE MENU: CULINARY RECIPES OF FRIENDSHIP                         */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-serif uppercase tracking-wider mb-2"
            style={{ backgroundColor: `${primaryColor}22`, color: primaryColor }}
          >
            <Utensils className="w-3.5 h-3.5" />
            The Special House Menu
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold" style={{ color: textColor }}>
            Daftar Menu Racikan Persahabatan
          </h2>
          <p className="text-sm sm:text-base mt-2 max-w-xl mx-auto opacity-80">
            Empat hidangan metaforis yang selalu disajikan tanpa batas setiap kali kita duduk berhadapan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {menuItems.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl border shadow-lg relative overflow-hidden transition-all duration-300 hover:scale-[1.01]"
              style={{ backgroundColor: cardColor, borderColor: `${primaryColor}33` }}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase border"
                  style={{
                    backgroundColor: `${primaryColor}22`,
                    borderColor: `${primaryColor}55`,
                    color: primaryColor,
                  }}
                >
                  {item.tag}
                </span>
                <span className="font-mono text-xs font-bold text-amber-400">
                  {item.price}
                </span>
              </div>

              <h3 className="text-xl font-serif font-bold mb-2" style={{ color: textColor }}>
                {item.name}
              </h3>

              <div
                className="p-3 rounded-xl mb-3 text-xs leading-relaxed"
                style={{ backgroundColor: `${backgroundColor}99` }}
              >
                <span className="font-semibold text-amber-300/90 block mb-0.5">
                  Bahan Racikan:
                </span>
                <p className="opacity-80">{item.ingredients}</p>
              </div>

              <p className="text-xs sm:text-sm font-serif italic leading-relaxed opacity-90 border-l-2 pl-3"
                 style={{ borderColor: primaryColor }}>
                “{item.notes}”
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. THE JUKEBOX & VINYL WALL OF SHARED ANTHEMS                             */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-serif uppercase tracking-wider mb-2"
            style={{ backgroundColor: `${primaryColor}22`, color: primaryColor }}
          >
            <Music className="w-3.5 h-3.5" />
            Café Vinyl Jukebox
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold" style={{ color: textColor }}>
            Dinding Piringan Hitam Lagu Kenangan
          </h2>
          <p className="text-sm sm:text-base mt-2 max-w-xl mx-auto opacity-80">
            Trek musik abadi yang selalu memutar kembali memori tawa dan masa muda kita.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Rotating Vinyl Graphic Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 rounded-3xl border text-center"
               style={{ backgroundColor: cardColor, borderColor: `${primaryColor}44` }}>
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-black border-4 border-amber-900/60 shadow-2xl flex items-center justify-center animate-spin [animation-duration:16s]">
              {/* Vinyl Grooves */}
              <div className="absolute inset-4 rounded-full border border-white/5" />
              <div className="absolute inset-8 rounded-full border border-white/5" />
              <div className="absolute inset-12 rounded-full border border-white/5" />
              {/* Center Vinyl Label */}
              <div
                className="w-16 h-16 rounded-full flex flex-col items-center justify-center text-[8px] font-mono font-bold text-black text-center p-1 shadow-inner"
                style={{ backgroundColor: primaryColor }}
              >
                <span>BISTRO</span>
                <span>SIDE A</span>
              </div>
            </div>

            <p className="mt-6 text-xs font-mono text-amber-300">
              NOW PLAYING TRACK #{activeVinyl + 1}
            </p>
            <h4 className="text-lg font-serif font-bold mt-1" style={{ color: textColor }}>
              {vinyls[activeVinyl].title}
            </h4>
            <p className="text-xs font-serif italic mt-2 opacity-80 max-w-xs">
              “{vinyls[activeVinyl].memory}”
            </p>
          </div>

          {/* Vinyl List Selector */}
          <div className="lg:col-span-7 space-y-3">
            {vinyls.map((v, idx) => (
              <div
                key={idx}
                onClick={() => setActiveVinyl(idx)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex items-center gap-4 ${
                  activeVinyl === idx
                    ? "ring-2 ring-amber-400/80 shadow-lg"
                    : "hover:border-amber-400/40 opacity-80"
                }`}
                style={{
                  backgroundColor: activeVinyl === idx ? `${cardColor}` : `${cardColor}77`,
                  borderColor: `${primaryColor}33`,
                }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-xs shrink-0"
                  style={{
                    backgroundColor: activeVinyl === idx ? primaryColor : `${primaryColor}22`,
                    color: activeVinyl === idx ? "#ffffff" : primaryColor,
                  }}
                >
                  0{idx + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h5 className="font-serif font-bold text-sm truncate" style={{ color: textColor }}>
                      {v.title}
                    </h5>
                    <span className="text-[10px] font-mono opacity-60 ml-2 shrink-0">{v.year}</span>
                  </div>
                  <p className="text-xs opacity-70 truncate mt-0.5">{v.memory}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. THE CAFÉ WALL OF FRAMED MOMENTS                                        */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-serif uppercase tracking-wider mb-2"
            style={{ backgroundColor: `${primaryColor}22`, color: primaryColor }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Framed Moments
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold" style={{ color: textColor }}>
            Dinding Bingkai Foto Bistro
          </h2>
          <p className="text-sm sm:text-base mt-2 max-w-xl mx-auto opacity-80">
            Jepretan momen tulus yang dipajang rapi dengan plakat kuningan kehormatan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {frames.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl border shadow-xl transition-all duration-300 hover:scale-[1.03]"
              style={{
                backgroundColor: cardColor,
                borderColor: `${primaryColor}44`,
              }}
            >
              {/* Photo Frame Container */}
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-3 border border-white/10 shadow-inner">
                <Image
                  src={item.photo}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
              </div>

              {/* Brass-style Plaque */}
              <div
                className="p-2.5 rounded-lg border text-center"
                style={{
                  backgroundColor: `${backgroundColor}99`,
                  borderColor: `${primaryColor}33`,
                }}
              >
                <p className="font-serif font-bold text-xs truncate" style={{ color: textColor }}>
                  {item.title}
                </p>
                <p className="text-[10px] font-mono text-amber-400 mt-0.5">{item.date}</p>
                <p className="text-[11px] font-serif italic text-slate-300 line-clamp-2 mt-1.5 opacity-90">
                  {item.quote}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. THE COFFEE-STAINED NAPKIN LETTER                                       */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 max-w-3xl mx-auto">
        <div
          className="relative p-8 sm:p-12 rounded-3xl border shadow-2xl backdrop-blur-md overflow-hidden"
          style={{
            backgroundColor: "#221710",
            borderColor: `${primaryColor}44`,
          }}
        >
          {/* Subtle Aesthetic Coffee Cup Ring Stain */}
          <div className="absolute top-6 right-8 w-28 h-28 rounded-full border-4 border-amber-900/30 pointer-events-none opacity-40 blur-[0.5px]" />
          <div className="absolute top-8 right-10 w-24 h-24 rounded-full border-2 border-amber-950/40 pointer-events-none opacity-30" />

          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider mb-6 opacity-70 text-amber-300">
            <Feather className="w-4 h-4" />
            Warkat Serbet Linen Kafe
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-6" style={{ color: textColor }}>
            {napkinGreeting}
          </h3>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed opacity-90 font-serif">
            <p>{napkinBody1}</p>
            <p>{napkinBody2}</p>
            <p>{napkinBody3}</p>
          </div>

          <div
            className="mt-8 pt-6 border-t flex flex-col sm:flex-row sm:items-end justify-between gap-4"
            style={{ borderColor: `${primaryColor}33` }}
          >
            <div>
              <p className="text-xs opacity-70 italic">{napkinClosing}</p>
              <p className="text-xl font-serif font-bold mt-1" style={{ color: textColor }}>
                {napkinSignature}
              </p>
            </div>

            {napkinPostscript && (
              <p className="text-xs font-mono text-amber-300/90 max-w-xs italic">
                {napkinPostscript}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. THE MEMORY RECEIPT & INTERACTIVE COASTER FLIP                          */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Vintage Thermal Dot-Matrix Memory Receipt */}
          <div className="lg:col-span-7 bg-amber-50 text-stone-900 p-6 sm:p-8 rounded-sm shadow-2xl font-mono relative border-t-8 border-amber-700">
            {/* Top Receipt Zig-Zag Header */}
            <div className="text-center border-b-2 border-dashed border-stone-400 pb-4 mb-4">
              <div className="flex items-center justify-center gap-2 font-bold text-sm tracking-wider uppercase">
                <Receipt className="w-4 h-4" />
                {bistroName}
              </div>
              <p className="text-[10px] text-stone-600 mt-1">{receiptInvoiceNo}</p>
              <p className="text-[10px] text-stone-600">{receiptDate}</p>
              <p className="text-[10px] text-stone-700 font-semibold mt-1">
                GUEST: {friendName} & {senderName}
              </p>
            </div>

            {/* Receipt Items */}
            <div className="space-y-2.5 text-xs border-b-2 border-dashed border-stone-400 pb-4 mb-4">
              <p className="flex justify-between">{receiptItem1}</p>
              <p className="flex justify-between">{receiptItem2}</p>
              <p className="flex justify-between">{receiptItem3}</p>
              <p className="flex justify-between">{receiptItem4}</p>
            </div>

            {/* Receipt Total */}
            <div className="text-center">
              <p className="font-bold text-sm sm:text-base text-amber-900 tracking-wider">
                {receiptTotal}
              </p>
              <p className="text-[10px] text-stone-500 mt-2 italic">
                “Metode Pembayaran: Kasih Sayang & Kesetiaan Tanpa Syarat”
              </p>
              <div className="mt-4 pt-2 border-t border-stone-300 flex items-center justify-center gap-1.5 text-[10px] text-stone-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Lunas Terbayar Seumur Hidup
              </div>
            </div>
          </div>

          {/* Interactive Cork Coaster Flip */}
          <div className="lg:col-span-5 flex flex-col items-center text-center">
            <div
              onClick={() => setIsCoasterFlipped(!isCoasterFlipped)}
              className="group cursor-pointer relative w-56 h-56 rounded-full border-4 shadow-2xl flex flex-col items-center justify-center p-6 transition-all duration-500 transform hover:scale-105 active:scale-95"
              style={{
                backgroundColor: isCoasterFlipped ? primaryColor : "#3f2e22",
                borderColor: `${primaryColor}`,
                color: isCoasterFlipped ? "#ffffff" : textColor,
              }}
              title="Klik untuk membalik tatakan gelas"
            >
              {!isCoasterFlipped ? (
                <>
                  <Coffee className="w-8 h-8 mb-2 text-amber-400 animate-pulse" />
                  <span className="font-serif font-bold text-xs uppercase tracking-widest block">
                    CORK COASTER
                  </span>
                  <p className="text-[11px] font-mono opacity-80 mt-2">
                    {coasterPrompt}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-[10px] font-mono text-amber-300">
                    <RotateCw className="w-3 h-3" /> Sentuh untuk Balik
                  </span>
                </>
              ) : (
                <div className="animate-fadeIn">
                  <span className="text-[10px] font-mono uppercase tracking-wider opacity-80 block mb-1 text-amber-200">
                    SECRET NOTE:
                  </span>
                  <p className="font-serif italic text-xs leading-relaxed text-white">
                    {coasterSecretMessage}
                  </p>
                  <span className="mt-3 block text-[9px] font-mono opacity-80">
                    — Tersimpan di Meja Sudut Ini
                  </span>
                </div>
              )}
            </div>

            <p className="text-xs font-mono opacity-60 mt-4">
              Tatakan gelas gabus meja nomor 07
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-12 border-t text-center text-xs font-mono opacity-60"
        style={{ borderColor: `${primaryColor}22` }}
      >
        <p>Bistro des Amis • Didedikasikan untuk sahabat terbaik {friendName}</p>
      </footer>
    </div>
  );
}

export function BistroFriendshipTemplate(props: TemplateComponentProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#1a120b]" />}>
      <BistroFriendshipTemplateContent {...props} />
    </Suspense>
  );
}
