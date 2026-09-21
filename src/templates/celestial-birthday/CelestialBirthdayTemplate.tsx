"use client";

import { useRef, useState, Suspense } from "react";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  Pause,
  Play,
  Share2,
  Check,
  Compass,
  Radio,
  Orbit,
  Star,
  Globe2,
  Lock,
  Unlock,
  Volume2,
  VolumeX,
  Send,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { toParagraphs } from "@/lib/utils/format";
import type { LetterContent } from "@/types/letter";
import { withDefaults } from "../utils";

interface CelestialBirthdayTemplateProps {
  data: LetterContent;
  className?: string;
}

const defaults: Record<string, string> = {
  recipientName: "Astrid Kimberly",
  ageNumber: "25",
  orbitSubtitle: "25 Solar Orbits Around The Sun",
  birthDate: "18 November // Stardate 78912.4",
  zodiacSign: "Scorpio Constellation // Alpha Scorpii",
  starCoordinates: "RA 16h 29m 24s / Dec -26° 25′ 55″",
  cosmicQuote:
    "Kau bukan sekadar berada di dalam semesta, melainkan semesta yang sedang hidup, bernafas, dan menjelajahi waktu dengan penuh cahaya keindahan.",

  letterTitle: "Transmisi Kapsul Waktu: Menemukan Cahaya di Antara Bintang",
  letterContent:
    "Selamat menyelesaikan satu putaran orbit penuh lainnya mengelilingi sang surya.\n\nDalam hamparan semesta yang begitu luas dan waktu yang tak berujung, kehadiranmu adalah salah satu keajaiban paling berharga. Melihatmu melangkah sejauh ini—dengan segala kegigihan, kelembutan hati, dan senyuman yang tak pernah padam—adalah anugerah luar biasa bagi siapa pun yang mengenalmu.\n\nTerima kasih telah selalu menjadi pelita di saat gulita, kompas penunjuk arah di kala bimbang, dan sahabat terbaik dalam setiap petualangan. Di orbit usiamu yang ke-25 ini, semoga alam semesta berkonspirasi memelukmu dengan segala kebaikan, membuka pintu-pintu keberuntungan baru, dan membimbing langkahmu menuju puncak-puncak impian yang kau dambakan.\n\nTeruslah bersinar, sang bintang penjelajah!",
  senderName: "Arkan Danu",
  senderRelation: "Co-Pilot Perjalanan Hidup // Sahabat Sejati",

  milestone1Year: "Orbit Awal",
  milestone1Title: "The Genesis & Cosmic Spark",
  milestone1Desc:
    "Langkah pertama mengenal dunia, menyerap mimpi-mimpi kecil dengan rasa ingin tahu dan keberanian tanpa batas.",

  milestone2Year: "Orbit Eksplorasi",
  milestone2Title: "The Starlight Voyage",
  milestone2Desc:
    "Menemukan panggilan hati, melewati badai kosmik pertama, dan belajar memahami arti ketangguhan sejati.",

  milestone3Year: "Orbit Kedewasaan",
  milestone3Title: "Stellar Breakthrough",
  milestone3Desc:
    "Titik pembuktian diri di mana dedikasi dan kebaikan hatimu memancarkan kilau supernova yang menginspirasi banyak jiwa.",

  milestone4Year: "Orbit Masa Depan",
  milestone4Title: "The Infinite Horizon",
  milestone4Desc:
    "Memasuki babak orbit baru dengan hati yang lapang, kebijaksanaan yang matang, dan cakrawala harapan yang tak terhingga.",

  memory1Url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
  memory1Title: "Nebula Senyuman Pertama",
  memory1Date: "Stardate 2023.08",
  memory1Desc: "Momen ketika senyum manismu menenangkan seisi ruangan di tengah riuhnya waktu.",

  memory2Url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
  memory2Title: "Ekspedisi Puncak Cahaya",
  memory2Date: "Stardate 2024.11",
  memory2Desc: "Perjalanan tak terlupakan saat kita menatap bintang bersama dan berjanji terus melangkah maju.",

  memory3Url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
  memory3Title: "Detik Penuh Kehangatan",
  memory3Date: "Stardate 2025.06",
  memory3Desc: "Tawa lepas yang membuktikan bahwa hal paling berharga adalah kebersamaan yang tulus.",

  wish1Title: "Doa Cahaya: Ketenangan Jiwa",
  wish1Desc: "Semoga hatimu selalu dilimpahi kedamaian yang sejuk, bebas dari rasa ragu dan kecemasan malam.",

  wish2Title: "Doa Gravitasi: Raga Sehat & Kokoh",
  wish2Desc: "Diberkahi kesehatan fisik dan mental yang kokoh untuk menjelajahi setiap sudut keindahan dunia.",

  wish3Title: "Doa Supernova: Prestasi & Kelimpahan",
  wish3Desc: "Setiap usaha dan impian yang kau perjuangkan berbuah manis dan bersinar terang di hadapan banyak orang.",

  wish4Title: "Doa Konstelasi: Kasih Abadi",
  wish4Desc: "Selalu dikelilingi oleh orang-orang berhati tulus yang mencintaimu apa adanya tanpa syarat.",

  primaryColor: "#f6c86d",
  secondaryColor: "#818cf8",
  backgroundColor: "#0b0e1b",
  cardColor: "#13172b",
  textColor: "#f1f5f9",
  musicTitle: "Celestial Voyage & Cosmic Ambient Lofi",
  musicUrl: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=space-chillout-14194.mp3",
};

function CelestialBirthdayTemplateInner({
  data,
  className,
}: CelestialBirthdayTemplateProps) {
  const content = withDefaults(defaults, data);
  const pathname = usePathname();
  const isThumbnail = className?.includes("thumbnail") || false;

  // Interactivity States
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeWish, setActiveWish] = useState<number | null>(null);
  const [starlightCount, setStarlightCount] = useState(25);
  const [hasSentWish, setHasSentWish] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeMilestone, setActiveMilestone] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleUnlock = () => {
    setIsUnlocked(true);
    // Auto-play audio when unlocked if permitted
    if (audioRef.current && !isPlaying) {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleSendWish = () => {
    if (!hasSentWish) {
      setStarlightCount((prev) => prev + 1);
      setHasSentWish(true);
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const paragraphs = toParagraphs(content.letterContent);

  const milestones = [
    {
      period: content.milestone1Year,
      title: content.milestone1Title,
      desc: content.milestone1Desc,
    },
    {
      period: content.milestone2Year,
      title: content.milestone2Title,
      desc: content.milestone2Desc,
    },
    {
      period: content.milestone3Year,
      title: content.milestone3Title,
      desc: content.milestone3Desc,
    },
    {
      period: content.milestone4Year,
      title: content.milestone4Title,
      desc: content.milestone4Desc,
    },
  ];

  const memories = [
    {
      url: content.memory1Url,
      title: content.memory1Title,
      date: content.memory1Date,
      desc: content.memory1Desc,
    },
    {
      url: content.memory2Url,
      title: content.memory2Title,
      date: content.memory2Date,
      desc: content.memory2Desc,
    },
    {
      url: content.memory3Url,
      title: content.memory3Title,
      date: content.memory3Date,
      desc: content.memory3Desc,
    },
  ];

  const wishes = [
    { id: 1, title: content.wish1Title, desc: content.wish1Desc },
    { id: 2, title: content.wish2Title, desc: content.wish2Desc },
    { id: 3, title: content.wish3Title, desc: content.wish3Desc },
    { id: 4, title: content.wish4Title, desc: content.wish4Desc },
  ];

  return (
    <div
      className={cn(
        "relative min-h-screen w-full overflow-x-hidden transition-colors duration-700 selection:bg-amber-400/30 selection:text-amber-200 font-sans",
        className
      )}
      style={{
        backgroundColor: content.backgroundColor,
        color: content.textColor,
      }}
    >
      {/* Background Starfield & Nebula Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 20%, ${content.secondaryColor}33 0%, transparent 60%), radial-gradient(circle at 80% 80%, ${content.primaryColor}22 0%, transparent 50%)`,
          }}
        />
        {/* Subtle Constellation Grid Background */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* Floating Audio Element */}
      {content.musicUrl && !isThumbnail && pathname !== "/templates" && (
        <>
          <audio ref={audioRef} src={content.musicUrl} loop preload="none" />
          <div className="fixed bottom-6 right-6 z-50">
            <button
              type="button"
              onClick={toggleAudio}
              className="flex items-center gap-3 px-4 py-2.5 rounded-full border border-amber-400/30 bg-slate-900/90 text-amber-200 shadow-2xl backdrop-blur-md hover:bg-slate-800/90 hover:border-amber-400/60 transition-all duration-300"
              aria-label={isPlaying ? "Jeda musik kosmik" : "Putar musik kosmik"}
            >
              <div className="relative flex items-center justify-center">
                {isPlaying ? (
                  <>
                    <span className="absolute -inset-1 rounded-full bg-amber-400/30 animate-ping" />
                    <Volume2 className="h-4 w-4 text-amber-300" />
                  </>
                ) : (
                  <VolumeX className="h-4 w-4 text-slate-400" />
                )}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-[10px] uppercase font-mono tracking-widest text-slate-400">
                  {isPlaying ? "Orbit Audio Playing" : "Orbit Audio"}
                </p>
                <p className="text-xs font-medium text-amber-100 max-w-[140px] truncate">
                  {content.musicTitle}
                </p>
              </div>
              {isPlaying ? (
                <Pause className="h-3.5 w-3.5 text-amber-300" />
              ) : (
                <Play className="h-3.5 w-3.5 text-amber-300 fill-amber-300" />
              )}
            </button>
          </div>
        </>
      )}

      {/* =================================================================== */}
      {/* HERO / INTERACTIVE CAPSULE UNLOCK SCREEN                          */}
      {/* =================================================================== */}
      {!isUnlocked && !isThumbnail ? (
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 text-center">
          {/* Cosmic Orbital Rings Animation */}
          <div className="relative mb-10 flex items-center justify-center">
            {/* Outer Ring */}
            <div className="absolute w-72 h-72 sm:w-88 sm:h-88 rounded-full border border-amber-400/20 animate-spin [animation-duration:35s]" />
            {/* Mid Ring */}
            <div className="absolute w-56 h-56 sm:w-68 sm:h-68 rounded-full border border-dashed border-indigo-400/30 animate-spin [animation-duration:20s] [animation-direction:reverse]" />
            {/* Inner Ring */}
            <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full border border-amber-300/40 bg-slate-900/80 shadow-[0_0_50px_rgba(246,200,109,0.2)] flex flex-col items-center justify-center backdrop-blur-md relative overflow-hidden">
              <Orbit className="h-10 w-10 text-amber-300 animate-pulse mb-1" />
              <span className="font-mono text-[10px] tracking-widest text-amber-200/80 uppercase">
                Orbit #{content.ageNumber}
              </span>
              <span className="font-serif text-xs text-slate-300 font-semibold">
                {content.recipientName}
              </span>
            </div>
          </div>

          <div className="max-w-md space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-400/30 bg-indigo-950/40 text-indigo-300 text-xs font-mono tracking-wider">
              <Lock className="h-3.5 w-3.5" />
              <span>TIME CAPSULE // ENCRYPTED IN SPACE</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl text-amber-100 font-bold tracking-tight">
              {content.recipientName}
            </h1>

            <p className="font-mono text-xs sm:text-sm text-slate-300 tracking-wide">
              {content.orbitSubtitle}
            </p>

            <p className="text-xs text-slate-400 italic max-w-sm mx-auto">
              &ldquo;Sebuah kapsul waktu transmisi antarbintang telah siap didekripsi untuk merayakan perjalanan usiamu.&rdquo;
            </p>

            <div className="pt-4">
              <button
                type="button"
                onClick={handleUnlock}
                className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-mono text-xs uppercase tracking-widest font-bold text-slate-950 bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 shadow-[0_0_30px_rgba(246,200,109,0.5)] hover:shadow-[0_0_40px_rgba(246,200,109,0.8)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <Unlock className="h-4 w-4 text-slate-900 group-hover:rotate-12 transition-transform duration-300" />
                <span>Buka Kapsul Waktu Kosmik</span>
                <Sparkles className="h-4 w-4 text-slate-900 animate-spin [animation-duration:4s]" />
              </button>
            </div>

            <p className="font-mono text-[10px] text-slate-500 tracking-widest pt-2">
              STARDATE // {content.birthDate}
            </p>
          </div>
        </div>
      ) : (
        /* ================================================================= */
        /* FULL COSMIC TIME CAPSULE CONTENTS                                 */
        /* ================================================================= */
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-16 sm:space-y-24">
          {/* =============================================================== */}
          {/* HEADER MASTHEAD & COSMIC TELEMETRY                             */}
          {/* =============================================================== */}
          <header className="text-center space-y-6 pt-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/30 bg-amber-950/20 text-amber-300 text-xs font-mono tracking-widest">
              <Radio className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
              <span>TRANSMISSION ACTIVE // ORBIT #{content.ageNumber}</span>
            </div>

            <div className="space-y-2">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate-400">
                Another Trip Around The Sun
              </p>
              <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-200 to-amber-400">
                {content.recipientName}
              </h1>
              <p className="font-sans text-sm sm:text-base text-slate-300 max-w-lg mx-auto">
                {content.orbitSubtitle}
              </p>
            </div>

            {/* Orbit Telemetry Badges Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto pt-4 text-left">
              <div
                className="p-3.5 rounded-xl border border-white/10 backdrop-blur-md space-y-1"
                style={{ backgroundColor: `${content.cardColor}aa` }}
              >
                <div className="flex items-center gap-2 text-amber-300 font-mono text-[11px] tracking-wider uppercase">
                  <Star className="h-3.5 w-3.5" />
                  <span>Rasi Pelindung</span>
                </div>
                <p className="font-sans text-xs font-semibold text-slate-200">
                  {content.zodiacSign}
                </p>
              </div>

              <div
                className="p-3.5 rounded-xl border border-white/10 backdrop-blur-md space-y-1"
                style={{ backgroundColor: `${content.cardColor}aa` }}
              >
                <div className="flex items-center gap-2 text-indigo-300 font-mono text-[11px] tracking-wider uppercase">
                  <Globe2 className="h-3.5 w-3.5" />
                  <span>Stardate Kelahiran</span>
                </div>
                <p className="font-sans text-xs font-semibold text-slate-200">
                  {content.birthDate}
                </p>
              </div>

              <div
                className="p-3.5 rounded-xl border border-white/10 backdrop-blur-md space-y-1"
                style={{ backgroundColor: `${content.cardColor}aa` }}
              >
                <div className="flex items-center gap-2 text-sky-300 font-mono text-[11px] tracking-wider uppercase">
                  <Compass className="h-3.5 w-3.5" />
                  <span>Koordinat Langit</span>
                </div>
                <p className="font-sans text-xs font-semibold text-slate-200 truncate">
                  {content.starCoordinates}
                </p>
              </div>
            </div>

            {/* Cosmic Quote Banner */}
            {content.cosmicQuote && (
              <div className="max-w-2xl mx-auto p-4 rounded-xl border border-amber-400/20 bg-amber-950/10 backdrop-blur-sm">
                <p className="font-serif italic text-xs sm:text-sm text-amber-200/90 leading-relaxed">
                  &ldquo;{content.cosmicQuote}&rdquo;
                </p>
              </div>
            )}
          </header>

          {/* =============================================================== */}
          {/* SEKSI 2: INTERSTELLAR TRANSMISSION LETTER                       */}
          {/* =============================================================== */}
          <section className="relative">
            <div
              className="relative rounded-2xl border border-amber-400/30 p-6 sm:p-10 backdrop-blur-md shadow-[0_0_40px_rgba(0,0,0,0.6)]"
              style={{ backgroundColor: `${content.cardColor}cc` }}
            >
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-amber-400 rounded-tl-sm" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-amber-400 rounded-tr-sm" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-amber-400 rounded-bl-sm" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-amber-400 rounded-br-sm" />

              {/* Terminal Header */}
              <div className="flex flex-wrap items-center justify-between pb-6 mb-6 border-b border-white/10 text-xs font-mono text-slate-400">
                <div className="flex items-center gap-2">
                  <Radio className="h-4 w-4 text-emerald-400 animate-pulse" />
                  <span className="text-emerald-400 uppercase tracking-widest font-semibold">
                    TRANSMISSION DECODED
                  </span>
                </div>
                <div className="text-[11px] tracking-wider text-slate-400">
                  FREQ: 1420.405 MHz // ENCRYPTION: 0-LAT
                </div>
              </div>

              {/* Letter Title */}
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-amber-200 mb-6 tracking-wide">
                {content.letterTitle}
              </h2>

              {/* Letter Body */}
              <div className="space-y-4 font-sans text-sm sm:text-base text-slate-200 leading-relaxed">
                {paragraphs.map((para, index) => (
                  <p key={index} className="text-justify sm:text-left">
                    {para}
                  </p>
                ))}
              </div>

              {/* Letter Signature / Pilot Info */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-slate-400">
                    Transmitted With Love By
                  </p>
                  <p className="font-serif text-lg font-bold text-amber-200">
                    {content.senderName}
                  </p>
                  <p className="font-sans text-xs text-indigo-300">
                    {content.senderRelation}
                  </p>
                </div>

                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-amber-400/20 bg-amber-950/30 font-mono text-[10px] text-amber-300 uppercase tracking-widest">
                  <Sparkles className="h-3 w-3" />
                  <span>SEALED IN CELESTIAL ARCHIVE</span>
                </div>
              </div>
            </div>
          </section>

          {/* =============================================================== */}
          {/* SEKSI 3: LIFE ORBIT MILESTONE LOGBOOK                           */}
          {/* =============================================================== */}
          <section className="space-y-6">
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-indigo-300">
                <Orbit className="h-3.5 w-3.5" />
                <span>LOGBOOK PERJALANAN HIDUP</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100">
                Fase Orbit & Lintasan Waktu
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                Setiap fase adalah batu loncatan yang membentuk bintang terang dirimu hari ini.
              </p>
            </div>

            {/* Stepper Grid Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {milestones.map((milestone, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveMilestone(idx)}
                  className={cn(
                    "cursor-pointer rounded-xl p-5 border transition-all duration-300 flex flex-col justify-between backdrop-blur-md relative overflow-hidden",
                    activeMilestone === idx
                      ? "border-amber-400 bg-amber-950/20 shadow-[0_0_25px_rgba(246,200,109,0.25)] scale-[1.02]"
                      : "border-white/10 hover:border-white/20 bg-slate-900/60"
                  )}
                  style={{ minHeight: "180px" }}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full border border-indigo-400/30 text-indigo-300 bg-indigo-950/40">
                        {milestone.period}
                      </span>
                      <span className="font-mono text-xs font-bold text-amber-300">
                        0{idx + 1}
                      </span>
                    </div>
                    <h4 className="font-serif font-bold text-base text-amber-100">
                      {milestone.title}
                    </h4>
                    <p className="font-sans text-xs text-slate-300 leading-relaxed">
                      {milestone.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400">
                    <span>STATUS: DILALUI</span>
                    <Check className="h-3 w-3 text-emerald-400" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* =============================================================== */}
          {/* SEKSI 4: HOLOGRAM MEMORY VAULT (3 FOTO)                         */}
          {/* =============================================================== */}
          <section className="space-y-6">
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-sky-300">
                <Eye className="h-3.5 w-3.5" />
                <span>KRISTAL KENANGAN KOSMIK</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100">
                Hologram Memory Vault
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                Momen-momen cahaya abadi yang tersimpan rapi dalam memori semesta.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {memories.map((mem, idx) => (
                <div
                  key={idx}
                  className="group rounded-2xl border border-white/10 hover:border-amber-400/40 p-4 transition-all duration-300 backdrop-blur-md space-y-3 relative overflow-hidden"
                  style={{ backgroundColor: `${content.cardColor}dd` }}
                >
                  {/* Photo Container */}
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-950 border border-white/10">
                    {mem.url ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={mem.url}
                        alt={mem.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-600 font-mono text-xs">
                        NO IMAGE AVAILABLE
                      </div>
                    )}
                    {/* Hologram Scanline Effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent pointer-events-none opacity-40 group-hover:opacity-70 transition-opacity" />
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full border border-sky-400/30 bg-slate-900/80 font-mono text-[10px] text-sky-300 tracking-wider">
                      {mem.date}
                    </div>
                  </div>

                  {/* Caption */}
                  <div className="space-y-1">
                    <h4 className="font-serif font-bold text-base text-amber-100 group-hover:text-amber-300 transition-colors">
                      {mem.title}
                    </h4>
                    <p className="font-sans text-xs text-slate-300 leading-relaxed">
                      {mem.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* =============================================================== */}
          {/* SEKSI 5: 4 NEBULA WISHES & BLESSINGS CARDS                     */}
          {/* =============================================================== */}
          <section className="space-y-6">
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-amber-300">
                <Sparkles className="h-3.5 w-3.5" />
                <span>DOA & KONSTELASI BERKAH</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-amber-100">
                Empat Pilar Doa Nebula
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
                Klik kartu berkah untuk mengaktifkan pancaran energi kebaikan di orbit barumu.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {wishes.map((wish) => {
                const isSelected = activeWish === wish.id;
                return (
                  <div
                    key={wish.id}
                    onClick={() => setActiveWish(isSelected ? null : wish.id)}
                    className={cn(
                      "cursor-pointer p-5 rounded-2xl border transition-all duration-300 backdrop-blur-md relative overflow-hidden",
                      isSelected
                        ? "border-amber-300 bg-amber-950/30 shadow-[0_0_25px_rgba(246,200,109,0.3)] scale-[1.01]"
                        : "border-white/10 hover:border-amber-400/30 bg-slate-900/60"
                    )}
                  >
                    <div className="flex items-start gap-3.5">
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-colors",
                          isSelected
                            ? "border-amber-300 bg-amber-400 text-slate-950 font-bold"
                            : "border-amber-400/30 text-amber-300 bg-amber-950/40"
                        )}
                      >
                        <Sparkles className="h-4 w-4" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="font-serif font-bold text-base text-amber-100">
                          {wish.title}
                        </h4>
                        <p className="font-sans text-xs text-slate-300 leading-relaxed">
                          {wish.desc}
                        </p>
                        <p className="font-mono text-[10px] text-amber-300/80 pt-1">
                          {isSelected ? "✦ PANCARAN DOA AKTIF" : "Klik untuk membaca & mengaktifkan →"}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Send Starlight Wish Interactive Button */}
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={handleSendWish}
                disabled={hasSentWish}
                className={cn(
                  "inline-flex items-center gap-2 px-6 py-3 rounded-full font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-lg cursor-pointer",
                  hasSentWish
                    ? "border border-emerald-400/50 bg-emerald-950/40 text-emerald-300 cursor-default"
                    : "border border-amber-400/40 bg-slate-900 text-amber-200 hover:bg-slate-800 hover:border-amber-400"
                )}
              >
                {hasSentWish ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-400" />
                    <span>Frekuensi Doa Terkirim ({starlightCount} Bintang Berpendar)</span>
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 text-amber-300" />
                    <span>Kirim Frekuensi Doa Bintang ({starlightCount})</span>
                  </>
                )}
              </button>
            </div>
          </section>

          {/* =============================================================== */}
          {/* FOOTER & SHARE TRANSMISSION                                     */}
          {/* =============================================================== */}
          <footer className="border-t border-white/10 pt-10 pb-6 text-center space-y-6">
            <div className="space-y-1.5">
              <p className="font-serif italic text-sm text-amber-200/90">
                &ldquo;Semoga setiap putaran harimu selalu dihiasi kehangatan, cinta, dan bintang-bintang penuntun.&rdquo;
              </p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
                CELESTIAL TIME CAPSULE ODYSSEY // CREATED WITH LOVE FOR {content.recipientName}
              </p>
            </div>

            <div>
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-amber-400/30 bg-slate-900/80 text-amber-200 font-mono text-xs uppercase tracking-wider hover:bg-slate-800 hover:border-amber-400 transition-colors shadow-md cursor-pointer"
              >
                {copiedLink ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Tautan Kapsul Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="h-3.5 w-3.5" />
                    <span>Bagikan Kapsul Waktu Ini</span>
                  </>
                )}
              </button>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}

export function CelestialBirthdayTemplate({
  data,
  className,
}: CelestialBirthdayTemplateProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0b0e1b]" />}>
      <CelestialBirthdayTemplateInner data={data} className={className} />
    </Suspense>
  );
}
