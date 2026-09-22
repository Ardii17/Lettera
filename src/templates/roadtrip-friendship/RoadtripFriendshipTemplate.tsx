"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import Image from "next/image";
import type { TemplateComponentProps } from "../renderer";
import {
  Navigation,
  Compass,
  Gauge,
  Fuel,
  Volume2,
  VolumeX,
  KeyRound,
  ShieldCheck,
  Award,
  Sparkles,
  MapPin,
  Clock,
  Calendar,
  CheckCircle2,
  FileText,
  AlertTriangle,
  Radio,
  Car,
  Flag,
  RotateCw,
} from "lucide-react";

// Default Aesthetic Fallback Photos
const DEFAULT_HERO_PHOTO =
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80";
const DEFAULT_BILLBOARD_1 =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80";
const DEFAULT_BILLBOARD_2 =
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80";
const DEFAULT_BILLBOARD_3 =
  "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80";
const DEFAULT_BILLBOARD_4 =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80";

function RoadtripFriendshipTemplateContent({
  data,
  className = "",
}: TemplateComponentProps) {
  const letter = data;

  // Colors
  const primaryColor = String(letter.primaryColor || "#f59e0b");
  const backgroundColor = String(letter.backgroundColor || "#0f172a");
  const cardColor = String(letter.cardColor || "#1e293b");
  const textColor = String(letter.textColor || "#fef08a");
  const bodyTextColor = String(letter.bodyTextColor || "#cbd5e1");

  // Hero & Dashboard
  const routeCode = String(
    letter.routeCode || "ROUTE BFF-INFINITY • COAST TO COAST HIGHWAY",
  );
  const friendName = String(letter.friendName || "Sahabat / Co-Pilot");
  const senderName = String(letter.senderName || "Driver");
  const duoMoniker = String(
    letter.duoMoniker || "The Endless Highway Drifters & Soul Brothers",
  );
  const heroSubtitle = String(
    letter.heroSubtitle ||
      "Berapa ratus kilometer pun aspal yang telah kita lalui, tidak pernah ada jalan buntu jika kau yang memegang peta navigasi di kursi samping.",
  );
  const heroPhoto = String(letter.heroPhoto || DEFAULT_HERO_PHOTO);
  const totalDistance = String(letter.totalDistance || "12.500+ KM");
  const pitStopsCount = String(letter.pitStopsCount || "84 Pit-Stops");
  const fuelStatus = String(letter.fuelStatus || "Full Tank (100% Loyal)");

  // Music
  const musicUrl = String(letter.musicUrl || "");
  const musicTitle = String(
    letter.musicTitle || "Highway Mixtape: Sunset Cruise & Open Windows",
  );

  // Milemarker Milestones (4 items)
  const milemarkers = [
    {
      km: String(letter.mile1Km || "KM 000 • Titik Nol"),
      title: String(letter.mile1Title || "Gerbang Tol Pertemuan Pertama"),
      date: String(letter.mile1Date || "September 2017 • Gerbang Kampus"),
      story: String(
        letter.mile1Story ||
          "Dua orang asing dengan tas ransel kumal yang sama-sama tersesat mencari ruang kelas, lalu memutuskan bolos bareng ke warung kopi terdekat. Itulah hari di mana mesin perjalanan ini dinyalakan.",
      ),
    },
    {
      km: String(letter.mile2Km || "KM 450 • Jalur Berkelok"),
      title: String(
        letter.mile2Title || "Tragedi Ban Kempes di Hutan Tanpa Sinyal",
      ),
      date: String(letter.mile2Date || "Juli 2020 • Jalur Lintas Selatan"),
      story: String(
        letter.mile2Story ||
          "Ban motor bocor jam 6 sore di tengah hutan pinus sunyi. Alih-alih panik, kita malah buka bungkus biskuit dan menertawakan nasib sambil nunggu truk pick-up yang mau menolong.",
      ),
    },
    {
      km: String(letter.mile3Km || "KM 1.800 • Tanjakan Curam"),
      title: String(
        letter.mile3Title || "Menembus Badai Skripsi & Krisis Karir",
      ),
      date: String(
        letter.mile3Date || "Oktober 2022 • Kamar Kost Penuh Kertas",
      ),
      story: String(
        letter.mile3Story ||
          "Tanjakan hidup paling terjal: penolakan kerja, skripsi dibantai dosen, dan rekening nyaris nol. Tapi kursi samping tidak pernah kosong; kau selalu ada memastikan mesin mental kita tidak mogok.",
      ),
    },
    {
      km: String(letter.mile4Km || "KM 5.000 • Garis Pantai"),
      title: String(
        letter.mile4Title || "Melihat Sunset Kemenangan Bersama",
      ),
      date: String(letter.mile4Date || "Februari 2024 • Tebing Pantai Barat"),
      story: String(
        letter.mile4Story ||
          "Duduk di atas kap mobil dengan angin laut yang menerpa wajah, menatap langit jingga keemasan. Kita menoleh satu sama lain dan bergumam: 'Gila ya, akhirnya kita bisa sampai di titik ini.'",
      ),
    },
  ];

  // Glovebox Stash (4 items)
  const stashItems = [
    {
      title: String(letter.stash1Title || "Kaset Mixtape Jalanan Rusak"),
      desc: String(
        letter.stash1Desc ||
          "Kaset pita dengan lagu-lagu nostalgia yang selalu diputar berulang meski suaranya sudah agak mendem.",
      ),
      icon: Radio,
    },
    {
      title: String(letter.stash2Title || "Kacamata Hitam Kembar"),
      desc: String(
        letter.stash2Desc ||
          "Senjata andalan untuk bergaya sok keren di kaca spion saat menyalip truk gandeng di jalan tol.",
      ),
      icon: Sparkles,
    },
    {
      title: String(
        letter.stash3Title || "Permen Kopi Darurat Jam 3 Pagi",
      ),
      desc: String(
        letter.stash3Desc ||
          "Penyelamat nyawa agar driver tidak mengantuk saat menembus kabut tebal jalanan lintas provinsi.",
      ),
      icon: Clock,
    },
    {
      title: String(letter.stash4Title || "Koin Tol & Kunci Pas Cadangan"),
      desc: String(
        letter.stash4Desc ||
          "Bukti kesiapan kita menghadapi segala rintangan teknis apa pun yang menghadang di depan mata.",
      ),
      icon: ShieldCheck,
    },
  ];

  // Highway Rules (3 items)
  const highwayRules = [
    {
      title: String(
        letter.rule1Title || "“Yang duduk di samping dilarang tidur duluan!”",
      ),
      desc: String(
        letter.rule1Desc ||
          "Tugas co-pilot adalah menjaga driver tetap waras dengan playlist seru dan obrolan random.",
      ),
    },
    {
      title: String(
        letter.rule2Title || "“Hak prerogatif musik ada di tangan Co-Pilot.”",
      ),
      desc: String(
        letter.rule2Desc ||
          "Driver fokus setir, co-pilot yang jadi DJ. Tidak boleh ada komplain kalau lagunya dangdut tiba-tiba.",
      ),
    },
    {
      title: String(
        letter.rule3Title || "“Berhenti mendadak kalau lihat pemandangan keren.”",
      ),
      desc: String(
        letter.rule3Desc ||
          "Tujuan perjalanan bukan soal cepat sampai, tapi soal menikmati setiap meter aspal bersama.",
      ),
    },
  ];

  // Billboards (4 items)
  const billboards = [
    {
      photo: String(letter.billboard1Photo || DEFAULT_BILLBOARD_1),
      title: String(
        letter.billboard1Title || "Kabur Sejenak Menembus Lembah",
      ),
      loc: String(letter.billboard1Location || "Jalur Puncak Dingin"),
      quote: String(
        letter.billboard1Quote ||
          "“Kaca jendela dibuka selebar-lebarnya, teriak bareng melepas penat beban hidup.”",
      ),
    },
    {
      photo: String(letter.billboard2Photo || DEFAULT_BILLBOARD_2),
      title: String(
        letter.billboard2Title || "Istirahat di Bawah Langit Senja",
      ),
      loc: String(
        letter.billboard2Location || "Rest Area KM 260 Heritage",
      ),
      quote: String(
        letter.billboard2Quote ||
          "“Kopi sachet plastik dan gorengan hangat terasa kayak hidangan bintang lima.”",
      ),
    },
    {
      photo: String(letter.billboard3Photo || DEFAULT_BILLBOARD_3),
      title: String(
        letter.billboard3Title || "Batas Akhir Aspal di Tepi Samudra",
      ),
      loc: String(letter.billboard3Location || "Jalur Pantai Karang"),
      quote: String(
        letter.billboard3Quote ||
          "“Mobil kotor penuh debu pasir, tapi hati kita luar biasa bersih dan plong.”",
      ),
    },
    {
      photo: String(letter.billboard4Photo || DEFAULT_BILLBOARD_4),
      title: String(
        letter.billboard4Title || "Kembali Pulang dengan Segudang Cerita",
      ),
      loc: String(letter.billboard4Location || "Gerbang Tol Utama Kota"),
      quote: String(
        letter.billboard4Quote ||
          "“Badan boleh pegal-pegal, tapi besoknya udah nanya: 'Kapan jalan lagi bro?'”",
      ),
    },
  ];

  // Logbook Letter
  const logbookGreeting = String(
    letter.logbookGreeting || "Untuk Sahabat & Co-Pilot Terbaikku, Bagas,",
  );
  const logbookEntry1 = String(
    letter.logbookEntry1 ||
      "Menuliskan lembaran ini membuatku menengok kembali ke kaca spion perjalanan hidup kita. Rasanya baru kemarin kita cuma dua anak muda yang bingung mau melangkah ke mana, dengan motor butut dan bensin pas-pasan. Sekarang, ribuan kilometer aspal kehidupan sudah kita taklukkan bersama.",
  );
  const logbookEntry2 = String(
    letter.logbookEntry2 ||
      "Terima kasih telah menjadi co-pilot paling tangguh. Di saat jalanku sedang tertutup kabut tebal keraguan, kau tidak pernah panik menarik rem tangan, melainkan menyalakan lampu sorot optimisme dan membimbingku tetap maju. Persahabatan ini membuktikan bahwa kita tidak butuh peta yang sempurna, selama kita memiliki rekan berkendara yang tepat.",
  );
  const logbookEntry3 = String(
    letter.logbookEntry3 ||
      "Jalan raya di depan sana mungkin masih menyimpan banyak tikungan tajam dan tanjakan ekstrem, tapi selama kursi samping ini terisi olehmu, aku tidak pernah takut menekan pedal gas. Kita akan terus melaju hingga garis finis kehidupan, membawa segudang kisah hebat untuk dikenang.",
  );
  const logbookClosing = String(
    letter.logbookClosing || "Rekan Pengemudi Sejatimu Selamanya,",
  );
  const logbookSignature = String(
    letter.logbookSignature || "Farhan Mahendra",
  );
  const logbookPostscript = String(
    letter.logbookPostscript ||
      "P.S. Jangan lupa cek tekanan ban akhir pekan ini, jadwal kita eksplor rute baru!",
  );

  // Golden Pass & Ignition
  const passTitle = String(
    letter.passTitle || "LIFETIME GOLDEN HIGHWAY PASS & BROTHERHOOD PACT",
  );
  const passSerial = String(
    letter.passSerial || "TOLL-PASS-BFF-UNLIMITED-001",
  );
  const passTerms = String(
    letter.passTerms ||
      "Tiket ini memberikan hak akses tanpa batas bagi pemegangnya untuk melintasi segala badai dan rute kehidupan tanpa perlu membayar biaya sepeser pun. Selalu berlaku 24 jam sehari, 7 hari seminggu, seumur hidup.",
  );
  const ignitionPrompt = String(
    letter.ignitionPrompt ||
      "Putar Kunci Kontak untuk Mendengar Pesan Rahasia Co-Pilot",
  );
  const secretCoPilotMessage = String(
    letter.secretCoPilotMessage ||
      "“Jika suatu saat jalananmu terasa gelap dan kau kelelahan menyetir sendirian, tepikan mobilmu. Aku yang akan ambil alih kemudi dan membawamu pulang dengan selamat.”",
  );

  // States
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeMileIndex, setActiveMileIndex] = useState(0);
  const [isIgnitionOn, setIsIgnitionOn] = useState(false);
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
      className="min-h-screen relative overflow-x-hidden font-sans selection:bg-amber-500/30 selection:text-amber-200"
      style={{ backgroundColor, color: bodyTextColor }}
    >
      {/* Background Highway Lines & Asphalt Vibes */}
      <div className="fixed inset-0 pointer-events-none opacity-25">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl" />
      </div>

      {/* Floating Mixtape Audio Player */}
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
            title={isPlaying ? "Jeda Mixtape" : "Putar Mixtape Jalanan"}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-slate-900 transition-transform ${
                isPlaying ? "animate-spin" : ""
              }`}
              style={{ backgroundColor: primaryColor }}
            >
              <Car className="w-4 h-4 text-slate-900" />
            </div>
            <div className="text-left hidden sm:block max-w-[160px] truncate">
              <p className="text-xs font-semibold leading-tight truncate">{musicTitle}</p>
              <p className="text-[10px] opacity-70">
                {isPlaying ? "Mixtape Menyala..." : "Sentuh untuk Mixtape"}
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
      {/* 1. HERO GATEWAY & CO-PILOT DASHBOARD                                      */}
      {/* ========================================================================= */}
      <header className="relative pt-16 pb-20 px-4 sm:px-6 max-w-5xl mx-auto text-center">
        {/* Highway Route Code Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-mono font-bold tracking-widest uppercase shadow-sm mb-4 backdrop-blur-sm"
          style={{
            borderColor: `${primaryColor}55`,
            backgroundColor: `${cardColor}bb`,
            color: primaryColor,
          }}
        >
          <Navigation className="w-3.5 h-3.5 text-amber-400" />
          <span>{routeCode}</span>
        </div>

        {/* Duo Moniker */}
        <p className="text-xs sm:text-sm font-mono tracking-widest uppercase mb-2 opacity-80"
           style={{ color: primaryColor }}>
          {duoMoniker}
        </p>

        {/* Hero Title */}
        <h1
          className="text-4xl sm:text-6xl font-black tracking-tight mb-4 uppercase font-sans"
          style={{ color: textColor }}
        >
          Co-Pilot Terbaik, <span style={{ color: primaryColor }}>{friendName}</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg leading-relaxed mb-10 opacity-90">
          {heroSubtitle}
        </p>

        {/* Hero Photo with Windshield / Rearview Mirror Styling */}
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Rearview Reflection Overlay */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs sm:text-sm">
              <span className="flex items-center gap-1.5 font-medium backdrop-blur-md bg-black/50 px-3 py-1 rounded-full border border-white/10">
                <Car className="w-3.5 h-3.5 text-amber-400" />
                Driver: {senderName} & Co-Pilot: {friendName}
              </span>
              <span className="backdrop-blur-md bg-black/50 px-3 py-1 rounded-full border border-white/10 font-mono text-amber-300">
                Route BFF • Nonstop
              </span>
            </div>
          </div>
        </div>

        {/* Roadtrip Dashboard Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mt-10">
          <div
            className="p-4 rounded-2xl border text-center transition-all hover:border-amber-500/50"
            style={{ backgroundColor: cardColor, borderColor: `${primaryColor}33` }}
          >
            <Gauge className="w-5 h-5 mx-auto mb-2" style={{ color: primaryColor }} />
            <p className="text-xs uppercase font-mono tracking-wider opacity-70">
              Jarak Tertawa
            </p>
            <p className="text-xl sm:text-2xl font-black mt-1" style={{ color: textColor }}>
              {totalDistance}
            </p>
          </div>

          <div
            className="p-4 rounded-2xl border text-center transition-all hover:border-amber-500/50"
            style={{ backgroundColor: cardColor, borderColor: `${primaryColor}33` }}
          >
            <MapPin className="w-5 h-5 mx-auto mb-2 text-amber-400" />
            <p className="text-xs uppercase font-mono tracking-wider opacity-70">
              Pit-Stop Singgah
            </p>
            <p className="text-xl sm:text-2xl font-black mt-1" style={{ color: textColor }}>
              {pitStopsCount}
            </p>
          </div>

          <div
            className="col-span-2 sm:col-span-1 p-4 rounded-2xl border text-center transition-all hover:border-amber-500/50"
            style={{ backgroundColor: cardColor, borderColor: `${primaryColor}33` }}
          >
            <Fuel className="w-5 h-5 mx-auto mb-2 text-emerald-400" />
            <p className="text-xs uppercase font-mono tracking-wider opacity-70">
              Kapasitas Tangki
            </p>
            <p className="text-sm sm:text-base font-bold mt-2" style={{ color: textColor }}>
              {fuelStatus}
            </p>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. THE MILEMARKER MILESTONES (RAMBU KILOMETER PERJALANAN)                 */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-2"
            style={{ backgroundColor: `${primaryColor}22`, color: primaryColor }}
          >
            <Flag className="w-3.5 h-3.5" />
            Highway Milemarkers
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight" style={{ color: textColor }}>
            Tonggak Rambu Kilometer Perjalanan
          </h2>
          <p className="text-sm sm:text-base mt-2 max-w-xl mx-auto opacity-80">
            Empat titik balik jalan raya yang membuktikan bahwa setiap tikungan tajam hidup selalu berhasil kita lewati bersama.
          </p>
        </div>

        {/* Milemarker Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {milemarkers.map((mile, idx) => (
            <button
              key={idx}
              onClick={() => setActiveMileIndex(idx)}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all duration-200 border"
              style={{
                backgroundColor: activeMileIndex === idx ? primaryColor : `${cardColor}aa`,
                borderColor: activeMileIndex === idx ? primaryColor : `${primaryColor}33`,
                color: activeMileIndex === idx ? "#0f172a" : textColor,
              }}
            >
              {mile.km.split("•")[0].trim()}
            </button>
          ))}
        </div>

        {/* Active Milemarker Signboard */}
        <div
          className="p-6 sm:p-8 rounded-3xl border shadow-xl relative overflow-hidden transition-all duration-300"
          style={{ backgroundColor: cardColor, borderColor: `${primaryColor}44` }}
        >
          {/* Reflective Sign Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <span
              className="px-3.5 py-1 rounded-lg text-xs font-mono font-black border"
              style={{
                backgroundColor: `${primaryColor}25`,
                borderColor: `${primaryColor}66`,
                color: primaryColor,
              }}
            >
              {milemarkers[activeMileIndex].km}
            </span>
            <span className="flex items-center gap-1.5 text-xs font-mono opacity-70">
              <Clock className="w-3.5 h-3.5" />
              {milemarkers[activeMileIndex].date}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black mb-4" style={{ color: textColor }}>
            {milemarkers[activeMileIndex].title}
          </h3>

          <p
            className="text-base sm:text-lg leading-relaxed opacity-90 border-l-4 pl-4 py-1"
            style={{ borderColor: primaryColor }}
          >
            “{milemarkers[activeMileIndex].story}”
          </p>

          <div
            className="mt-6 pt-4 border-t flex items-center justify-between text-xs opacity-70 font-mono"
            style={{ borderColor: `${primaryColor}22` }}
          >
            <span>Navigasi Jalur Darat • Titik Catatan #{activeMileIndex + 1}</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" /> Rute Selesai Ditaklukkan
            </span>
          </div>
        </div>

        {/* 4 Mini Highway Signs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {milemarkers.map((mile, idx) => (
            <div
              key={idx}
              onClick={() => setActiveMileIndex(idx)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${
                activeMileIndex === idx
                  ? "ring-2 ring-amber-400/80"
                  : "hover:border-amber-400/40"
              }`}
              style={{
                backgroundColor: `${cardColor}99`,
                borderColor: `${primaryColor}25`,
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono font-bold" style={{ color: primaryColor }}>
                  {mile.km}
                </span>
                <span className="text-[11px] font-mono opacity-60 truncate">{mile.date}</span>
              </div>
              <h4 className="font-bold text-sm truncate" style={{ color: textColor }}>
                {mile.title}
              </h4>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. THE GLOVEBOX STASH & HIGHWAY RULES                                     */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Glovebox Stash (Isi Laci Mobil) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="mb-6">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-2"
                style={{ backgroundColor: `${primaryColor}22`, color: primaryColor }}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                The Glovebox Stash
              </div>
              <h3 className="text-2xl sm:text-3xl font-black" style={{ color: textColor }}>
                Perlengkapan Laci Dashboard
              </h3>
              <p className="text-xs sm:text-sm mt-1 opacity-80">
                Empat barang esensial yang tak pernah absen menemani kita menembus ribuan mil perjalanan.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {stashItems.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl border transition-all hover:scale-[1.02]"
                    style={{ backgroundColor: cardColor, borderColor: `${primaryColor}33` }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 shadow-inner"
                      style={{
                        backgroundColor: `${primaryColor}25`,
                        color: primaryColor,
                      }}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-sm mb-1" style={{ color: textColor }}>
                      {item.title}
                    </h4>
                    <p className="text-xs leading-relaxed opacity-80">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Unwritten Highway Rules */}
          <div
            className="lg:col-span-5 flex flex-col justify-between p-6 rounded-3xl border shadow-lg"
            style={{ backgroundColor: cardColor, borderColor: `${primaryColor}44` }}
          >
            <div>
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-2"
                style={{ backgroundColor: `${primaryColor}22`, color: primaryColor }}
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                Highway Codex
              </div>
              <h3 className="text-xl sm:text-2xl font-black mb-2" style={{ color: textColor }}>
                Aturan Jalan Raya Tak Tertulis
              </h3>
              <p className="text-xs opacity-80 mb-6">
                Protokol resmi berkendara persahabatan yang disepakati tanpa perlu tanda tangan materai.
              </p>

              <div className="space-y-3">
                {highwayRules.map((rule, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border"
                    style={{
                      backgroundColor: `${backgroundColor}77`,
                      borderColor: `${primaryColor}25`,
                    }}
                  >
                    <p className="font-bold text-xs sm:text-sm text-amber-300">
                      {rule.title}
                    </p>
                    <p className="text-[11px] opacity-80 mt-1 leading-relaxed">
                      {rule.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="mt-6 pt-4 border-t text-center text-[11px] font-mono opacity-60"
              style={{ borderColor: `${primaryColor}22` }}
            >
              Berlaku di Semua Jalur Tol & Lintas Provinsi
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. THE HIGHWAY BILLBOARDS & TRUNK GALLERY                                 */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-2"
            style={{ backgroundColor: `${primaryColor}22`, color: primaryColor }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Highway Billboards
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight" style={{ color: textColor }}>
            Galeri Reklame Tepi Jalan Tol
          </h2>
          <p className="text-sm sm:text-base mt-2 max-w-xl mx-auto opacity-80">
            Jepretan momen spontan dari balik kaca mobil dan pemberhentian rest area.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {billboards.map((item, idx) => (
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

              {/* Billboard Caption Plaque */}
              <div
                className="p-2.5 rounded-lg border text-center"
                style={{
                  backgroundColor: `${backgroundColor}99`,
                  borderColor: `${primaryColor}33`,
                }}
              >
                <p className="font-bold text-xs truncate" style={{ color: textColor }}>
                  {item.title}
                </p>
                <p className="text-[10px] font-mono text-amber-400 mt-0.5">{item.loc}</p>
                <p className="text-[11px] italic text-slate-300 line-clamp-2 mt-1.5 opacity-90">
                  {item.quote}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. THE CO-PILOT'S LOGBOOK LETTER                                          */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 max-w-3xl mx-auto">
        <div
          className="relative p-8 sm:p-12 rounded-3xl border shadow-2xl backdrop-blur-md overflow-hidden"
          style={{
            backgroundColor: cardColor,
            borderColor: `${primaryColor}44`,
          }}
        >
          {/* Highway Toll Stamp Stamp Graphic */}
          <div className="absolute top-6 right-6 border-2 border-dashed border-amber-400/40 rounded-xl px-3 py-1 text-center font-mono text-[10px] text-amber-300/80 -rotate-6 pointer-events-none">
            TOLL CLEARED • ROUTE BFF
          </div>

          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider mb-6 opacity-70 text-amber-300">
            <FileText className="w-4 h-4" />
            Warkat Buku Logbook Pengemudi
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold mb-6 font-sans" style={{ color: textColor }}>
            {logbookGreeting}
          </h3>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed opacity-90">
            <p>{logbookEntry1}</p>
            <p>{logbookEntry2}</p>
            <p>{logbookEntry3}</p>
          </div>

          <div
            className="mt-8 pt-6 border-t flex flex-col sm:flex-row sm:items-end justify-between gap-4"
            style={{ borderColor: `${primaryColor}33` }}
          >
            <div>
              <p className="text-xs opacity-70 italic">{logbookClosing}</p>
              <p className="text-xl font-bold mt-1" style={{ color: textColor }}>
                {logbookSignature}
              </p>
            </div>

            {logbookPostscript && (
              <p className="text-xs font-mono text-amber-300/90 max-w-xs italic">
                {logbookPostscript}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. THE GOLDEN HIGHWAY PASS & IGNITION SECRET                              */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 max-w-4xl mx-auto text-center">
        <div
          className="p-8 sm:p-12 rounded-3xl border relative overflow-hidden shadow-2xl"
          style={{ backgroundColor: cardColor, borderColor: `${primaryColor}55` }}
        >
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-4 border"
            style={{
              backgroundColor: `${primaryColor}25`,
              borderColor: `${primaryColor}55`,
              color: primaryColor,
            }}
          >
            <Award className="w-4 h-4" />
            Akses Tol Seumur Hidup
          </div>

          <h3 className="text-2xl sm:text-4xl font-black mb-3" style={{ color: textColor }}>
            Tiket Tol Emas & Ikrar Co-Pilot
          </h3>
          <p className="text-sm max-w-xl mx-auto opacity-80 mb-8">
            Sebuah tiket perjalanan tanpa batas yang menjamin kita tidak akan pernah membiarkan yang lain tersesat sendirian.
          </p>

          {/* Ignition Key Button */}
          {!isIgnitionOn ? (
            <button
              onClick={() => setIsIgnitionOn(true)}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-sm sm:text-base text-slate-900 shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
              style={{ backgroundColor: primaryColor }}
            >
              <KeyRound className="w-5 h-5 animate-pulse" />
              <span>{ignitionPrompt}</span>
            </button>
          ) : (
            <div className="space-y-6 animate-fadeIn">
              {/* Unlocked Highway Pass Card */}
              <div
                className="relative p-6 sm:p-10 rounded-2xl border-2 border-dashed text-left shadow-2xl backdrop-blur-md"
                style={{
                  backgroundColor: `${backgroundColor}ee`,
                  borderColor: primaryColor,
                }}
              >
                <div
                  className="flex items-center justify-between border-b pb-4 mb-6"
                  style={{ borderColor: `${primaryColor}33` }}
                >
                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase opacity-60">
                      REGISTRATION SERIAL
                    </span>
                    <p className="font-mono text-xs sm:text-sm font-bold text-amber-400">
                      {passSerial}
                    </p>
                  </div>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center border text-amber-400"
                    style={{
                      borderColor: `${primaryColor}55`,
                      backgroundColor: `${primaryColor}22`,
                    }}
                  >
                    <Car className="w-5 h-5" />
                  </div>
                </div>

                <h4
                  className="text-center font-black text-lg sm:text-2xl tracking-wider mb-4 uppercase"
                  style={{ color: textColor }}
                >
                  {passTitle}
                </h4>

                <p className="text-sm sm:text-base leading-relaxed text-center italic max-w-xl mx-auto mb-6 opacity-90">
                  “{passTerms}”
                </p>

                {/* Secret Co-Pilot Message */}
                <div
                  className="p-5 rounded-xl border text-center my-6"
                  style={{
                    backgroundColor: `${cardColor}ee`,
                    borderColor: `${primaryColor}44`,
                  }}
                >
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 block mb-1">
                    PESAN RAHASIA DARI KURSI KEMUDI
                  </span>
                  <p className="text-base sm:text-lg font-bold text-white leading-relaxed">
                    {secretCoPilotMessage}
                  </p>
                </div>

                <div
                  className="grid grid-cols-2 gap-4 border-t pt-4 text-center text-xs font-mono opacity-80"
                  style={{ borderColor: `${primaryColor}33` }}
                >
                  <div>
                    <span className="block opacity-50 text-[10px]">PENGEMUDI (DRIVER)</span>
                    <p className="font-bold mt-1 text-slate-200">{senderName}</p>
                  </div>
                  <div>
                    <span className="block opacity-50 text-[10px]">NAVIGATOR (CO-PILOT)</span>
                    <p className="font-bold mt-1 text-slate-200">{friendName}</p>
                  </div>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                Mesin Perjalanan Hidup Dinyalakan • Tanpa Batas Kecepatan
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-12 border-t text-center text-xs font-mono opacity-60"
        style={{ borderColor: `${primaryColor}22` }}
      >
        <p>The Great Roadtrip Chronicle • Co-Pilot Terbaik {friendName}</p>
      </footer>
    </div>
  );
}

export function RoadtripFriendshipTemplate(props: TemplateComponentProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0f172a]" />}>
      <RoadtripFriendshipTemplateContent {...props} />
    </Suspense>
  );
}
