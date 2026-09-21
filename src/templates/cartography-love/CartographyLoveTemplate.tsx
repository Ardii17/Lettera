"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import { usePathname } from "next/navigation";
import type { TemplateComponentProps } from "../renderer";
import {
  Compass,
  Anchor,
  Navigation,
  MapPin,
  Sparkles,
  Waves,
  Feather,
  Volume2,
  VolumeX,
  Scroll,
  CheckCircle,
  Eye,
  Crosshair,
  ShieldCheck,
  Wind,
  Layers,
} from "lucide-react";

function CartographyLoveTemplateContent({
  data,
  className = "",
}: TemplateComponentProps) {
  const pathname = usePathname();
  const isThumbnail = pathname === "/templates";
  const canPlayAudio = !isThumbnail;
  const content = data;

  const [activeIsland, setActiveIsland] = useState<number>(0);
  const [isBottleOpen, setIsBottleOpen] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Audio cleanup on unmount
  useEffect(() => {
    const audioEl = audioRef.current;
    return () => {
      if (audioEl) {
        audioEl.pause();
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current || !canPlayAudio) return;
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

  // Safe fallback getters
  const recipient = String(content.recipientName || "Seraphina Clarisse");
  const sender = String(content.senderName || "Captain Julian Vance");
  const sheetNo = String(content.mapSheetNo || "CHART-N°17-AMORIS");
  const cartoucheTitle = String(
    content.royalCartoucheTitle || "NOVA ET ACCURATA TOTIUS AMORIS TABULA"
  );
  const subtitle = String(
    content.chartSubtitle ||
      "Peta Sutra Pelayaran Jiwa Mengarungi Samudra Kasih Menuju Dermaga Keabadian"
  );
  const meetingCoords = String(
    content.initialMeetingCoordinates ||
      "48°51'24\"N • 02°21'07\"E (Titik Awal Jangkar Hati Ditebarkan)"
  );
  const destCoords = String(
    content.destinationCoordinates ||
      "00°00'00\"N • ∞°∞'∞\"E (Dermaga Kasih Tanpa Batas Akhir)"
  );
  const cartographerSeal = String(
    content.cartographerSeal ||
      "Regia Societas Cartographica Amoris • Sigillum Authenticarium"
  );
  const seaCurrent = String(
    content.seaCurrentNote ||
      "Perairan Tenang Bebas Karang Prasangka • Diterangi Bintang Kejora"
  );

  const logDate = String(
    content.logbookDate || "Tengah Malam di Titik Balik Samudra • Malam Berbintang Tenang"
  );
  const logTitle = String(
    content.logbookTitle || "Catatan Warkah Nakhoda di Bawah Cahaya Lentera Kabin"
  );
  const mainMsg = String(
    content.mainMessage ||
      "Seraphina yang selalu menjadi bintang penuntun hidupku,\n\nSeorang pelaut sejati menghabiskan separuh usianya mempelajari pasang surut air laut..."
  );
  const axiom = String(
    content.marinerAxiom ||
      "Kapal mungkin mengarungi seribu samudra bergelora, namun ia hanya membutuhkan satu mercusuar untuk tahu ke mana harus pulang."
  );
  const captainSign = String(
    content.captainSignatureTitle ||
      "Nakhoda yang Selalu Menghadapkan Layarnya ke Arah Hatimu,"
  );

  // 4 Islands Data
  const islands = [
    {
      name: String(
        content.island1Name || "Île de la Première Rencontre (Pulau Pertemuan Pertama)"
      ),
      coords: String(
        content.island1Coordinates || "Lat 14°08'N, Long 60°58'W • Laguna Pasir Emas"
      ),
      sounding: String(
        content.island1Sounding || "Kedalaman 24 Depa • Air Bening Menembus Karang Hati"
      ),
      story: String(
        content.island1Story ||
          "Teluk teduh berpasir putih di mana sauh kapalku pertama kali dijatuhkan..."
      ),
      beacon: String(
        content.island1Beacon || "Sauh Emas Pertama yang Mengunci Rasa"
      ),
      icon: Anchor,
      color: "from-amber-500/20 to-teal-500/20 border-amber-400/40 text-amber-200",
    },
    {
      name: String(
        content.island2Name || "Golfe des Murmures (Teluk Bisikan Kasih)"
      ),
      coords: String(
        content.island2Coordinates || "Lat 21°19'N, Long 157°52'W • Perairan Teduh"
      ),
      sounding: String(
        content.island2Sounding || "Kedalaman 60 Depa • Bebas Dari Riak Gelisah"
      ),
      story: String(
        content.island2Story ||
          "Perairan sunyi di balik teluk pelindung tempat rahasia, impian, dan tawa kita berpadu..."
      ),
      beacon: String(
        content.island2Beacon || "Rembulan Kembar Penuntun Kegelapan Malam"
      ),
      icon: Waves,
      color: "from-teal-500/20 to-blue-500/20 border-teal-400/40 text-teal-200",
    },
    {
      name: String(
        content.island3Name || "Détroit des Tempêtes Vaincues (Selat Badai yang Ditaklukkan)"
      ),
      coords: String(
        content.island3Coordinates || "Lat 35°58'S, Long 138°08'E • Tebing Karang Granit"
      ),
      sounding: String(
        content.island3Sounding || "Kedalaman 120 Depa • Fondasi Karang Abadi"
      ),
      story: String(
        content.island3Story ||
          "Jalur pelayaran sempit berkarang terjal di mana kita pernah diuji oleh badai hidup..."
      ),
      beacon: String(
        content.island3Beacon || "Lentera Mercusuar Granit Abadi Tak Pernah Padam"
      ),
      icon: ShieldCheck,
      color: "from-sky-500/20 to-indigo-500/20 border-sky-400/40 text-sky-200",
    },
    {
      name: String(content.island4Name || "Cap de l'Éternité (Tanjung Keabadian)"),
      coords: String(
        content.island4Coordinates || "Lat 00°00'N, Long 00°00'E • Samudra Terbuka"
      ),
      sounding: String(
        content.island4Sounding || "Kedalaman Samudra Hati (Palung Tanpa Batas Ukuran)"
      ),
      story: String(
        content.island4Story ||
          "Ujung tanjung megah tempat laut dan langit menyatu menjadi satu garis cakrawala keemasan..."
      ),
      beacon: String(
        content.island4Beacon || "Cakrawala Fajar Keemasan Tanpa Batas Waktu"
      ),
      icon: Compass,
      color: "from-emerald-500/20 to-amber-500/20 border-emerald-400/40 text-emerald-200",
    },
  ];

  // 4 Instruments Data
  const instruments = [
    {
      name: String(content.instrument1Name || "The Brass Astrolabe (Astrolab Bintang)"),
      role: String(content.instrument1Role || "Penjajar Posisi Bintang Penuntun Jiwa"),
      desc: String(
        content.instrument1Desc ||
          "Ditempa dari kuningan murni untuk memetakan rasi bintang di langit..."
      ),
      symbol: "✦",
    },
    {
      name: String(content.instrument2Name || "The Mariner's Sextant (Sekstan Maritim)"),
      role: String(content.instrument2Role || "Pengukur Sudut Kemilau Senyuman"),
      desc: String(
        content.instrument2Desc ||
          "Instrumen cermin ganda untuk mengukur sudut elevasi matahari dari garis cakrawala..."
      ),
      symbol: "📐",
    },
    {
      name: String(
        content.instrument3Name || "The Hourglass of Golden Sand (Jam Pasir Emas)"
      ),
      role: String(content.instrument3Role || "Penakar Butiran Waktu Sakral Berdua"),
      desc: String(
        content.instrument3Desc ||
          "Dua labu kaca kristal tertutup dengan pasir pantai keemasan yang menetes tanpa henti..."
      ),
      symbol: "⏳",
    },
    {
      name: String(
        content.instrument4Name || "The Magnetic Compass Rose (Mawar Kompas Magnetik)"
      ),
      role: String(content.instrument4Role || "Penunjuk Kutub Utara Hati Sejati"),
      desc: String(
        content.instrument4Desc ||
          "Jarum besi magnetik yang mengambang bebas di atas mangkuk minyak atsiri..."
      ),
      symbol: "🧭",
    },
  ];

  // Section 5 Data
  const bathymetry = String(
    content.bathymetricDepth || "10,000 Fathoms • Kedalaman Jiwa Tanpa Titik Dasar"
  );
  const tradeWinds = String(
    content.tradeWindName || "Breeze of Constant Tenderness • Selalu Mendorong Kita Maju"
  );
  const current = String(
    content.oceanicCurrent || "Gulf Stream of Eternal Loyalty • Arus Hangat Kesetiaan"
  );
  const anchor = String(
    content.anchorStatus || "Terkunci Rapat di Palung Hatimu • Tak Akan Goyah"
  );
  const oathTitle = String(
    content.admiraltyOathTitle ||
      "The Mariner's Eternal Admiralty Oath (Sumpah Nakhoda di Hadapan Samudra)"
  );
  const oathText = String(
    content.admiraltyOathText ||
      "Di hadapan luasnya samudra raya dan di bawah kesaksian bintang-bintang navigasi langit..."
  );
  const signerTitle = String(
    content.admiraltySignerTitle || "Nakhoda Pelayaran Jiwa & Pelindung Haluan Hidupmu,"
  );

  // Section 6 Data
  const bottleLabel = String(
    content.bottleLabel || "Botol Laut Kaca Zamrud Bersegel Gabus Lilin"
  );
  const bottleBtnText = String(
    content.bottleButtonText || "Buka Sumbat Gabus Botol Laut"
  );
  const bottleSecret = String(
    content.bottleSecretMessage ||
      "Jika surat ini pernah hanyut di ribuan perairan asing, ketahuilah bahwa ombak akan selalu tahu arah untuk mengantarkannya tepat ke tanganmu..."
  );
  const bottleQuote = String(
    content.bottleClosingQuote ||
      "Dihanyutkan di lautan waktu, ditakdirkan untuk berlabuh di genggamanmu selamanya."
  );

  const primaryCol = String(content.primaryColor || "#d4af37");
  const secondaryCol = String(content.secondaryColor || "#2dd4bf");
  const musicUrl = String(
    content.musicTrack ||
      "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c89b7b9cf4.mp3?filename=celestial-music-box-waltz-10928.mp3"
  );

  return (
    <div
      className={`min-h-screen bg-[#06121e] text-[#e8f1f5] relative overflow-hidden font-serif selection:bg-teal-500 selection:text-white ${className}`}
      style={{
        backgroundImage: `
          radial-gradient(ellipse 80% 50% at 50% -20%, ${secondaryCol}33, transparent),
          radial-gradient(circle at 15% 40%, rgba(12, 35, 60, 0.4), transparent),
          radial-gradient(circle at 85% 70%, ${primaryCol}18, transparent)
        `,
      }}
    >
      {/* Audio Element for Music */}
      {canPlayAudio && musicUrl && (
        <audio ref={audioRef} src={musicUrl} loop preload="none" />
      )}

      {/* Floating Audio Controller */}
      {canPlayAudio && musicUrl && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            type="button"
            onClick={toggleMusic}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#0a1b2d]/90 backdrop-blur-md border border-amber-400/40 text-amber-300 hover:text-amber-100 hover:border-amber-300 shadow-xl transition-all duration-300 group hover:scale-105"
            title={isPlaying ? "Jeda Melodi Samudra" : "Putar Melodi Samudra"}
          >
            {isPlaying ? (
              <>
                <Volume2 className="w-4 h-4 text-teal-400 animate-pulse" />
                <span className="text-xs font-sans tracking-widest uppercase font-semibold">
                  Melodi Bahari
                </span>
                <span className="flex space-x-1 items-end h-3">
                  <span className="w-0.5 h-3 bg-amber-400 animate-bounce" />
                  <span className="w-0.5 h-2 bg-teal-400 animate-bounce delay-100" />
                  <span className="w-0.5 h-3 bg-amber-400 animate-bounce delay-200" />
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-amber-400/70 group-hover:text-amber-300" />
                <span className="text-xs font-sans tracking-widest uppercase font-semibold">
                  Putar Melodi
                </span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Decorative Nautical Grid & Rhumb Lines Background */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(to_right,#1b4d5415_1px,transparent_1px),linear-gradient(to_bottom,#1b4d5415_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Subtle Rotating Compass Watermark in Center Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none opacity-5 animate-[spin_180s_linear_infinite]">
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-amber-300/10 fill-none stroke-[0.4]">
          <circle cx="50" cy="50" r="46" />
          <circle cx="50" cy="50" r="42" strokeDasharray="1 2" />
          <circle cx="50" cy="50" r="28" />
          <line x1="50" y1="4" x2="50" y2="96" />
          <line x1="4" y1="50" x2="96" y2="50" />
          <line x1="17" y1="17" x2="83" y2="83" strokeDasharray="2 3" />
          <line x1="17" y1="83" x2="83" y2="17" strokeDasharray="2 3" />
          <polygon points="50,4 53,40 50,45 47,40" fill="rgba(212,175,55,0.08)" />
          <polygon points="50,96 53,60 50,55 47,60" fill="rgba(212,175,55,0.08)" />
          <polygon points="4,50 40,53 45,50 40,47" fill="rgba(212,175,55,0.08)" />
          <polygon points="96,50 60,53 55,50 60,47" fill="rgba(212,175,55,0.08)" />
        </svg>
      </div>

      <main className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        {/* ============================================================
            SECTION 1: THE ROYAL CARTOUCHE & NAVIGATIONAL COORDINATES
        ============================================================ */}
        <section className="relative rounded-2xl p-6 sm:p-10 border border-amber-500/30 bg-[#091b2c]/85 backdrop-blur-md shadow-2xl overflow-hidden">
          {/* Ornate Corner Latitude/Longitude Markers */}
          <div className="absolute top-2 left-3 text-[10px] tracking-widest text-amber-400/50 font-mono">
            LAT 48°51&apos;N
          </div>
          <div className="absolute top-2 right-3 text-[10px] tracking-widest text-amber-400/50 font-mono">
            LONG 02°21&apos;E
          </div>
          <div className="absolute bottom-2 left-3 text-[10px] tracking-widest text-teal-400/50 font-mono">
            DATUM: AMORIS
          </div>
          <div className="absolute bottom-2 right-3 text-[10px] tracking-widest text-teal-400/50 font-mono">
            DEPTH: ∞ FATHOMS
          </div>

          {/* Cartouche Header Badge */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-amber-400/40 bg-amber-950/40 text-amber-300 text-xs tracking-widest font-sans uppercase">
              <Compass className="w-3.5 h-3.5 text-amber-400 animate-[spin_40s_linear_infinite]" />
              <span>{sheetNo}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              <span>{cartographerSeal}</span>
            </div>

            <h1
              className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-300 to-amber-100"
              style={{ fontFamily: "'Cinzel', 'Playfair Display', serif" }}
            >
              {cartoucheTitle}
            </h1>

            <p className="text-sm sm:text-base text-teal-200/90 italic max-w-2xl mx-auto">
              &ldquo;{subtitle}&rdquo;
            </p>

            {/* Brass Separator Line */}
            <div className="flex items-center justify-center gap-3 py-2">
              <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
              <Crosshair className="w-4 h-4 text-amber-400" />
              <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
            </div>

            {/* Recipient & Navigator Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-left">
              <div className="p-4 rounded-xl bg-[#061423]/70 border border-amber-500/20 space-y-1">
                <span className="text-[11px] font-sans tracking-wider uppercase text-amber-400/70 flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-teal-400" />
                  Mercusuar Sanubari (Penerima)
                </span>
                <p className="text-lg font-bold text-amber-100">{recipient}</p>
                <p className="text-xs text-teal-300/80 font-mono tracking-tight">
                  Tujuan Labuhan: {destCoords}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#061423]/70 border border-teal-500/20 space-y-1">
                <span className="text-[11px] font-sans tracking-wider uppercase text-teal-400/70 flex items-center gap-1.5">
                  <Anchor className="w-3.5 h-3.5 text-amber-400" />
                  Nakhoda Pelayaran (Pengirim)
                </span>
                <p className="text-lg font-bold text-teal-100">{sender}</p>
                <p className="text-xs text-amber-300/80 font-mono tracking-tight">
                  Titik Bertolak: {meetingCoords}
                </p>
              </div>
            </div>

            {/* Sea Current & Rhumb Line Advisory */}
            <div className="mt-4 px-4 py-2 rounded-lg bg-[#040e1a]/80 border border-teal-500/20 text-xs text-teal-200/80 flex items-center justify-center gap-2">
              <Wind className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span>{seaCurrent}</span>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 2: THE CAPTAIN'S MIDNIGHT LOGBOOK (WARKAH UTAMA)
        ============================================================ */}
        <section className="relative rounded-2xl p-6 sm:p-10 border border-amber-500/30 bg-[#0e2133]/90 backdrop-blur-md shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-amber-500/20 pb-4 gap-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-400/30 text-amber-300">
                <Feather className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-amber-100">
                  {logTitle}
                </h2>
                <p className="text-xs font-mono text-amber-300/70">{logDate}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-teal-300 font-sans tracking-wider uppercase bg-teal-950/40 px-3 py-1 rounded-full border border-teal-500/30 self-start sm:self-auto">
              <Scroll className="w-3.5 h-3.5" />
              <span>Authentic Ship Log</span>
            </div>
          </div>

          {/* Letter Body with Vintage Drop-cap */}
          <div className="text-base sm:text-lg leading-relaxed text-amber-50/90 whitespace-pre-line space-y-4 font-serif">
            {mainMsg}
          </div>

          {/* Mariner's Axiom Banner */}
          <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-amber-950/40 via-[#061423]/90 to-teal-950/40 border-l-4 border-amber-400 text-amber-200/90 italic text-sm sm:text-base flex items-start gap-3">
            <Compass className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-300 text-xs font-sans tracking-widest uppercase mb-1">
                Aksioma Filosofis Pelaut:
              </p>
              &ldquo;{axiom}&rdquo;
            </div>
          </div>

          {/* Captain's Signature */}
          <div className="pt-4 border-t border-amber-500/20 flex flex-col items-end text-right">
            <p className="text-xs font-sans tracking-widest uppercase text-amber-400/70">
              {captainSign}
            </p>
            <p className="text-xl sm:text-2xl font-bold text-amber-200 mt-1" style={{ fontFamily: "'Cinzel', serif" }}>
              {sender}
            </p>
            <span className="text-[11px] text-teal-400/70 font-mono mt-0.5">
              Master of the Vessel • Voyage of Eternity
            </span>
          </div>
        </section>

        {/* ============================================================
            SECTION 3: INTERACTIVE ARCHIPELAGO (4 KEPULAUAN KASIH)
        ============================================================ */}
        <section className="relative rounded-2xl p-6 sm:p-10 border border-teal-500/30 bg-[#071828]/90 backdrop-blur-md shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal-400/40 bg-teal-950/40 text-teal-300 text-xs tracking-widest font-sans uppercase">
              <MapPin className="w-3.5 h-3.5 text-teal-400" />
              <span>Carte de Tendre • Navigasi Kasih</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-teal-100 tracking-wide">
              Kepulauan Kasih di Samudra Pelayaran
            </h2>
            <p className="text-xs sm:text-sm text-amber-200/70 max-w-xl mx-auto">
              Jelajahi 4 pulau dan perairan sakral tempat pelayaran hati kita berlabuh dan bertumbuh.
            </p>
          </div>

          {/* 4 Interactive Island Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {islands.map((isle, idx) => {
              const IconComp = isle.icon;
              const isActive = activeIsland === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveIsland(idx)}
                  className={`p-3 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between ${
                    isActive
                      ? "bg-[#102d44] border-amber-400 ring-2 ring-amber-400/30 shadow-lg scale-[1.02]"
                      : "bg-[#0a1b2d]/60 border-teal-500/20 hover:bg-[#0d2238] hover:border-teal-400/40"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                        isActive
                          ? "bg-amber-400 text-[#06121e] font-bold"
                          : "bg-teal-950 text-teal-300"
                      }`}
                    >
                      ISLE 0{idx + 1}
                    </span>
                    <IconComp
                      className={`w-4 h-4 ${
                        isActive ? "text-amber-300" : "text-teal-400/60"
                      }`}
                    />
                  </div>
                  <p
                    className={`text-xs font-bold line-clamp-2 ${
                      isActive ? "text-amber-100" : "text-teal-200/80"
                    }`}
                  >
                    {isle.name.split("(")[0]}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Island Detailed Card */}
          {(() => {
            const cur = islands[activeIsland];
            const CurIcon = cur.icon;
            return (
              <div className="rounded-xl p-5 sm:p-7 border border-amber-400/30 bg-gradient-to-br from-[#0b2136] via-[#091b2c] to-[#061423] space-y-4 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-teal-500/20 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-300">
                      <CurIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-amber-200">
                        {cur.name}
                      </h3>
                      <p className="text-xs font-mono text-teal-300/80 mt-0.5">
                        {cur.coords}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-sans uppercase tracking-widest text-amber-400/70 block">
                      Sounding Depth:
                    </span>
                    <span className="text-xs font-semibold text-teal-200">
                      {cur.sounding}
                    </span>
                  </div>
                </div>

                <p className="text-sm sm:text-base leading-relaxed text-amber-50/90 whitespace-pre-line font-serif">
                  {cur.story}
                </p>

                <div className="pt-2 flex items-center justify-between text-xs text-amber-300/90 bg-amber-950/30 px-3.5 py-2 rounded-lg border border-amber-400/20">
                  <span className="flex items-center gap-1.5 font-sans tracking-wider uppercase text-[11px] text-teal-300">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Landmark Jiwa:
                  </span>
                  <span className="font-semibold text-amber-100">{cur.beacon}</span>
                </div>
              </div>
            );
          })()}
        </section>

        {/* ============================================================
            SECTION 4: 4 NAVIGATIONAL INSTRUMENTS OF DEVOTION
        ============================================================ */}
        <section className="relative rounded-2xl p-6 sm:p-10 border border-amber-500/30 bg-[#091b2c]/90 backdrop-blur-md shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-400/40 bg-amber-950/40 text-amber-300 text-xs tracking-widest font-sans uppercase">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>Instrumen Maritim Sakral</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-100 tracking-wide">
              Empat Penuntun Arah Pelayaran Hati
            </h2>
            <p className="text-xs sm:text-sm text-teal-200/70 max-w-xl mx-auto">
              Perangkat kuningan klasik yang memastikan kapal jiwa kita tak pernah kehilangan haluan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {instruments.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl border border-amber-500/20 bg-[#061626]/80 hover:border-amber-400/50 transition-all duration-300 space-y-3 relative overflow-hidden group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-sm text-amber-300">
                      {item.symbol}
                    </span>
                    <h3 className="text-base font-bold text-amber-200">
                      {item.name}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-teal-400/70 uppercase">
                    INST-0{idx + 1}
                  </span>
                </div>

                <div className="inline-block px-2.5 py-0.5 rounded bg-teal-950/50 border border-teal-500/30 text-[11px] text-teal-300 font-sans tracking-wide">
                  {item.role}
                </div>

                <p className="text-xs sm:text-sm text-amber-50/85 leading-relaxed font-serif">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================
            SECTION 5: SOUNDINGS & MARINER'S ADMIRALTY OATH
        ============================================================ */}
        <section className="relative rounded-2xl p-6 sm:p-10 border border-teal-500/30 bg-[#071828]/90 backdrop-blur-md shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal-400/40 bg-teal-950/40 text-teal-300 text-xs tracking-widest font-sans uppercase">
              <Layers className="w-3.5 h-3.5 text-teal-400" />
              <span>Soundings & Admiralty</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-teal-100 tracking-wide">
              Kedalaman Lubuk Hati & Sumpah Nakhoda
            </h2>
          </div>

          {/* Nautical Telemetry Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-center">
            <div className="p-3.5 rounded-xl bg-[#061423] border border-amber-500/20 space-y-1">
              <span className="text-[10px] font-sans uppercase tracking-wider text-amber-400/70">
                Bathymetric Sounding
              </span>
              <p className="text-xs font-bold text-amber-100">{bathymetry}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#061423] border border-teal-500/20 space-y-1">
              <span className="text-[10px] font-sans uppercase tracking-wider text-teal-400/70">
                Prevailing Trade Winds
              </span>
              <p className="text-xs font-bold text-teal-100">{tradeWinds}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#061423] border border-sky-500/20 space-y-1">
              <span className="text-[10px] font-sans uppercase tracking-wider text-sky-400/70">
                Oceanic Drift Current
              </span>
              <p className="text-xs font-bold text-sky-100">{current}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#061423] border border-emerald-500/20 space-y-1">
              <span className="text-[10px] font-sans uppercase tracking-wider text-emerald-400/70">
                Anchor Moor Status
              </span>
              <p className="text-xs font-bold text-emerald-100">{anchor}</p>
            </div>
          </div>

          {/* Admiralty Oath Official Document */}
          <div className="rounded-xl p-6 sm:p-8 border border-amber-500/40 bg-gradient-to-b from-[#0b2034] to-[#081726] shadow-xl relative overflow-hidden space-y-4">
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <h3 className="text-base sm:text-lg font-bold text-amber-200">
                  {oathTitle}
                </h3>
              </div>
              <span className="text-[10px] font-mono uppercase text-amber-400/70 tracking-widest">
                Official Charter
              </span>
            </div>

            <p className="text-sm sm:text-base leading-relaxed text-amber-100/90 italic font-serif">
              &ldquo;{oathText}&rdquo;
            </p>

            <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-amber-500/20">
              <div className="flex items-center gap-2 text-xs text-teal-300">
                <CheckCircle className="w-4 h-4 text-teal-400" />
                <span>Terdaftar & Dikukuhkan dalam Catatan Admiralty Kerajaan</span>
              </div>
              <div className="text-right">
                <p className="text-xs text-amber-400/70 font-sans tracking-wide">
                  {signerTitle}
                </p>
                <p className="text-base font-bold text-amber-200">{sender}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 6: MESSAGE IN A DRIFT BOTTLE & SECRET CONFESSION
        ============================================================ */}
        <section className="relative rounded-2xl p-6 sm:p-10 border border-amber-500/40 bg-gradient-to-br from-[#0a1d30] via-[#091b2c] to-[#05111d] backdrop-blur-md shadow-2xl space-y-6 text-center">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal-400/40 bg-teal-950/40 text-teal-300 text-xs tracking-widest font-sans uppercase">
              <Waves className="w-3.5 h-3.5 text-teal-400" />
              <span>Flotsam of Devotion</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-100 tracking-wide">
              {bottleLabel}
            </h2>
            <p className="text-xs sm:text-sm text-teal-200/70 max-w-md mx-auto">
              Sebuah botol kaca antik yang terombang-ambing di lautan rasa, menyimpan sepucuk pesan paling rahasia.
            </p>
          </div>

          {/* Interactive Bottle Uncork Button */}
          <div className="pt-2">
            {!isBottleOpen ? (
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setIsBottleOpen(true)}
                  className="px-6 py-3.5 rounded-full font-bold text-sm tracking-widest uppercase text-[#06121e] bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200 hover:from-amber-200 hover:to-amber-300 shadow-xl hover:shadow-amber-400/30 transition-all duration-300 hover:scale-105 inline-flex items-center gap-2.5"
                >
                  <Sparkles className="w-4 h-4 text-[#06121e]" />
                  <span>{bottleBtnText}</span>
                  <Eye className="w-4 h-4 text-[#06121e]" />
                </button>
                <p className="text-[11px] text-amber-400/60 font-mono">
                  Klik untuk membuka segel gabus lilin & membaca pesan rahasia
                </p>
              </div>
            ) : (
              <div className="max-w-2xl mx-auto rounded-xl p-6 sm:p-8 border-2 border-amber-400/50 bg-[#061626]/95 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-500 text-left">
                <div className="flex items-center justify-between border-b border-amber-400/30 pb-3">
                  <span className="text-xs font-mono text-amber-300 uppercase tracking-widest flex items-center gap-1.5">
                    <Scroll className="w-3.5 h-3.5 text-amber-400" />
                    Gulungan Rahasia Terbuka
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsBottleOpen(false)}
                    className="text-xs text-amber-400/70 hover:text-amber-200 underline font-sans"
                  >
                    Tutup Kembali
                  </button>
                </div>

                <p className="text-base sm:text-lg leading-relaxed text-amber-50 font-serif italic whitespace-pre-line">
                  &ldquo;{bottleSecret}&rdquo;
                </p>

                <div className="pt-3 border-t border-amber-400/20 text-center">
                  <p className="text-xs text-teal-300/80 font-mono">
                    {bottleQuote}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Nautical Embellishment */}
          <div className="pt-6 border-t border-teal-500/20 flex items-center justify-center gap-2 text-xs text-amber-400/60 font-mono">
            <span>CHART REF: {sheetNo}</span>
            <span>•</span>
            <span>DESTINATION: {recipient}</span>
            <span>•</span>
            <span>NAVIGATOR: {sender}</span>
          </div>
        </section>
      </main>
    </div>
  );
}

export function CartographyLoveTemplate(props: TemplateComponentProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#06121e] flex items-center justify-center text-amber-200 font-serif">
          Mempersiapkan Peta Samudra Renaisans...
        </div>
      }
    >
      <CartographyLoveTemplateContent {...props} />
    </Suspense>
  );
}
export default CartographyLoveTemplate;
