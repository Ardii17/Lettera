"use client";

import { Suspense, useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  Volume2,
  VolumeX,
  Music,
  Heart,
  ShieldAlert,
  Feather,
  Sun,
  Layers,
  HeartHandshake,
} from "lucide-react";
import type { TemplateComponentProps } from "../renderer";

function KintsugiRepairInner({ data, className = "" }: TemplateComponentProps) {
  const pathname = usePathname();
  const isThumbnail = pathname === "/templates";

  // Data fields with graceful defaults
  const recipientName = (data.recipientName as string) || "Sosok yang Terluka";
  const senderName = (data.senderName as string) || "Pemohon Maaf";
  const restorationCode = (data.restorationCode as string) || "KINTSUGI-HEAL-2024";
  const vesselTitle =
    (data.vesselTitle as string) || "The Vessel of Our Shared Heart & Trust";
  const incidentDate = (data.incidentDate as string) || "Momen saat Keretakan Terjadi";
  const accountabilityNote =
    (data.accountabilityNote as string) ||
    "Aku mengakui kesalahanku sepenuhnya tanpa dalih pembelaan diri. Luka di hatimu adalah tanggung jawab yang ingin kuperbaiki dengan ketulusan nyata.";

  const salutation =
    (data.salutation as string) || "Untukmu yang Hatiku Telah Lukai,";
  const message =
    (data.message as string) ||
    "Dalam seni Kintsugi, patahan keramik tidak pernah disembunyikan. Patahan itu diakui dan direkatkan dengan pernis emas cair—menjadikannya lebih kuat dan anggun. Aku ingin merawat retakan ini bersamamu dengan kejujuran mutlak.";
  const signoff =
    (data.signoff as string) || "Dengan segenap penyesalan dan kerendahan hati,";
  const sealKanji = (data.sealKanji as string) || "誠";

  // 4 Fractures
  const fractures = [
    {
      name:
        (data.fracture1_name as string) ||
        "The Fracture of Careless Words (Kata-Kata Ceroboh)",
      admit:
        (data.fracture1_admit as string) ||
        "Aku mengucapkan kalimat tajam bernada dingin saat emosiku sedang tidak terkontrol.",
      impact:
        (data.fracture1_impact as string) ||
        "Aku tahu kata-kata itu meruntuhkan rasa percaya dan membuatmu merasa tidak dihargai.",
      icon: "🥀",
      borderAccent: "border-rose-800/40 bg-rose-950/20 text-rose-300",
    },
    {
      name:
        (data.fracture2_name as string) ||
        "The Fracture of Broken Presence (Kelalaian Mendengarkan)",
      admit:
        (data.fracture2_admit as string) ||
        "Aku terlalu sibuk dengan duniaku sendiri dan gagal memberikan perhatian penuh saat kau butuh.",
      impact:
        (data.fracture2_impact as string) ||
        "Kau merasa diabaikan dan sendirian menanggung rasa cemas di tengah keheningan.",
      icon: "🌧️",
      borderAccent: "border-sky-800/40 bg-sky-950/20 text-sky-300",
    },
    {
      name:
        (data.fracture3_name as string) ||
        "The Fracture of False Pride (Ego & Keras Kepala)",
      admit:
        (data.fracture3_admit as string) ||
        "Aku sempat bersikeras membela diri bukannya langsung memeluk dan memahami sudut pandangmu.",
      impact:
        (data.fracture3_impact as string) ||
        "Ego kasarku membuatmu merasa terpojok dan terluka dua kali lipat.",
      icon: "⚡",
      borderAccent: "border-amber-800/40 bg-amber-950/20 text-amber-300",
    },
    {
      name:
        (data.fracture4_name as string) ||
        "The Fracture of Lingering Silence (Mendiamkan Masalah)",
      admit:
        (data.fracture4_admit as string) ||
        "Aku menarik diri dan membiarkan jeda waktu tanpa komunikasi memperlebar jarak di antara kita.",
      impact:
        (data.fracture4_impact as string) ||
        "Keheningan itu bukan memberi kedamaian, melainkan menyiksa hatimu dengan ketidakpastian.",
      icon: "🍂",
      borderAccent: "border-stone-700/40 bg-stone-900/30 text-stone-300",
    },
  ];

  // 3 Golden Vows
  const vows = [
    {
      title:
        (data.vow1_title as string) || "The Golden Lacquer of Active Listening",
      lacquer:
        (data.vow1_lacquer as string) || "Mendengar Penuh Tanpa Membela Diri",
      action:
        (data.vow1_action as string) ||
        "Setiap kali ada perbedaan pendapat, aku akan meletakkan gawaiku, menatap matamu, dan menyimak apa yang kau rasakan sebelum berbicara sepatah kata pun.",
      icon: "🍵",
    },
    {
      title:
        (data.vow2_title as string) || "The Golden Lacquer of Radical Honesty",
      lacquer:
        (data.vow2_lacquer as string) || "Transparansi Penuh & Kerentanan Diri",
      action:
        (data.vow2_action as string) ||
        "Mengakui kelelahanku sejak awal secara jujur tanpa melampiaskan kekesalan, dan tidak lagi menyembunyikan perasaan di balik topeng diam.",
      icon: "🕯️",
    },
    {
      title:
        (data.vow3_title as string) || "The Golden Lacquer of Patient Reverence",
      lacquer:
        (data.vow3_lacquer as string) || "Menghormati Batasan & Proses Penyembuhan",
      action:
        (data.vow3_action as string) ||
        "Aku tidak akan memaksamu untuk langsung tersenyum seolah tidak terjadi apa-apa. Aku akan membuktikan perubahanku lewat ketulusan konsisten.",
      icon: "🌱",
    },
  ];

  // 4 Preserved Treasures
  const treasures = [
    {
      title: (data.treasure1_title as string) || "The Warmth of Your Forgiving Smile",
      desc:
        (data.treasure1_desc as string) ||
        "Ketulusan hatimu yang selalu berusaha melihat sisi terbaik dari diriku.",
    },
    {
      title: (data.treasure2_title as string) || "Our Midnight Safe Haven",
      desc:
        (data.treasure2_desc as string) ||
        "Ruang aman di mana kita bisa berbagi ketakutan paling rapuh tanpa dihakimi.",
    },
    {
      title: (data.treasure3_title as string) || "Shared Dreams Built from Scratch",
      desc:
        (data.treasure3_desc as string) ||
        "Rencana-rencana masa depan yang kita rajut perlahan dengan penuh harapan.",
    },
    {
      title: (data.treasure4_title as string) || "The Unbreakable Bond of Growth",
      desc:
        (data.treasure4_desc as string) ||
        "Keinginan tulus untuk saling menumbuhkan dan mendewasakan diri bersama.",
    },
  ];

  // Audio & Interactive Golden Mending
  const audioUrl = (data.audioUrl as string) || "";
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isMended, setIsMended] = useState(false);
  const [mendedCount, setMendedCount] = useState(42);
  const [activeFractureIndex, setActiveFractureIndex] = useState(0);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleApplyMending = () => {
    if (!isMended) {
      setMendedCount((prev) => prev + 1);
      setIsMended(true);
    }
  };

  // Safe audio cleanup
  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, []);

  return (
    <div
      className={`min-h-screen relative overflow-hidden font-serif selection:bg-amber-900 selection:text-amber-100 ${className}`}
      style={{
        backgroundColor: "#0d1014",
        color: "#f0ebe1",
      }}
    >
      {/* Background Wabi-Sabi Ceramic Texture with Gold Vein Highlights */}
      <div
        className="fixed inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 15%, rgba(212, 175, 55, 0.12) 0%, transparent 65%),
            linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 54px 54px, 54px 54px",
        }}
      />

      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-1/4 left-1/5 w-80 h-80 rounded-full bg-amber-700/10 blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-stone-700/10 blur-3xl animate-pulse"
          style={{ animationDuration: "8s" }}
        />
      </div>

      {/* Floating Audio Player (Isolated for Full Page Only) */}
      {!isThumbnail && audioUrl && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#12161c]/95 backdrop-blur-md border border-amber-500/40 px-4 py-2.5 rounded-full shadow-2xl shadow-stone-950/90 text-amber-200">
          <audio ref={audioRef} src={audioUrl} loop preload="none" />
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause zen music" : "Play zen music"}
            className="flex items-center gap-2 text-xs font-sans tracking-widest uppercase hover:text-amber-100 transition-colors"
          >
            {isPlaying ? (
              <span className="flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5 animate-spin text-amber-400" />
                <span>Pause Shakuhachi</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-amber-400/80" />
                <span>Play Shakuhachi</span>
              </span>
            )}
          </button>
          {isPlaying && (
            <button
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute" : "Mute"}
              className="text-amber-300/70 hover:text-amber-100 ml-1 p-1"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>
      )}

      {/* Main Container */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20 flex flex-col gap-16 md:gap-24">
        {/* ========================================================================= */}
        {/* SECTION 1: THE VESSEL OF TRUST & FRACTURE NOTICE                          */}
        {/* ========================================================================= */}
        <header className="relative">
          {/* Header Title Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-stone-900/60 text-amber-300 text-xs tracking-widest uppercase mb-4 shadow-lg shadow-amber-950/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Kintsugi • 金継ぎ • The Art of Golden Mending</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-light tracking-wide text-amber-100">
              {vesselTitle}
            </h1>
            <p className="mt-2 text-amber-300/70 text-xs sm:text-sm tracking-widest uppercase font-sans">
              Pengakuan Kesalahan & Komitmen Rekonsiliasi Tulus
            </p>
          </div>

          {/* Ceramic Plaque Board with Golden Seam Visual */}
          <div
            className={`relative p-6 sm:p-10 rounded-2xl bg-gradient-to-b from-[#141920] to-[#0d1015] border-2 transition-all duration-700 shadow-2xl shadow-stone-950/90 overflow-hidden ${
              isMended
                ? "border-amber-400 shadow-amber-900/40"
                : "border-stone-700/60"
            }`}
          >
            {/* Golden Seam Illuminations */}
            {isMended && (
              <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-400/20 via-transparent to-transparent animate-pulse" />
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {/* Left Column: Hanko & Code */}
              <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-black/40 border border-stone-800 text-center">
                <div className="w-18 h-18 w-16 h-16 rounded-xl bg-gradient-to-br from-red-800 to-red-950 border-2 border-red-600/60 shadow-lg shadow-red-950/80 flex items-center justify-center text-red-100 text-2xl font-serif font-bold mb-3">
                  {sealKanji}
                </div>
                <span className="text-[10px] font-mono tracking-widest text-amber-300 uppercase block">
                  {restorationCode}
                </span>
                <span className="text-[11px] text-stone-400 mt-1 font-sans">Makoto (Ketulusan)</span>
              </div>

              {/* Right Column: Accountability Credentials */}
              <div className="md:col-span-2 space-y-4 text-sm font-sans">
                <div>
                  <span className="text-amber-400/80 uppercase text-[11px] tracking-wider block font-semibold">
                    Kepada yang Hatiku Telah Lukai
                  </span>
                  <span className="text-2xl font-serif text-amber-100 font-normal">{recipientName}</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-stone-800 pt-3 gap-2 text-xs">
                  <div>
                    <span className="text-stone-400 uppercase text-[10px] block">Pemohon Maaf</span>
                    <span className="text-stone-200 font-medium">{senderName}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 uppercase text-[10px] block">Momen Keretakan</span>
                    <span className="text-amber-300/90 font-mono">{incidentDate}</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/20 text-xs italic text-amber-100/90 font-serif leading-relaxed">
                  &ldquo;{accountabilityNote}&rdquo;
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* SECTION 2: THE CONFESSION OF REGRET (SURAT WASHI)                         */}
        {/* ========================================================================= */}
        <section className="relative">
          <div className="flex items-center gap-3 mb-6">
            <Feather className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-light tracking-wide text-amber-100">
              The Confession of Regret
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-amber-500/40 via-stone-700/40 to-transparent" />
          </div>

          {/* Wabi-Sabi Washi Paper Texture */}
          <div
            className="relative p-8 sm:p-12 md:p-14 rounded-2xl shadow-2xl border-2 border-stone-300/30 text-stone-900 overflow-hidden"
            style={{
              backgroundColor: "#f6f3eb",
              backgroundImage: `
                radial-gradient(circle at 10% 10%, rgba(212, 175, 55, 0.05) 0%, transparent 40%),
                radial-gradient(circle at 90% 90%, rgba(26, 22, 20, 0.04) 0%, transparent 40%)
              `,
            }}
          >
            {/* Header of Washi Letter */}
            <div className="flex items-center justify-between border-b border-stone-300/80 pb-4 mb-8">
              <div className="flex items-center gap-2 text-stone-600 text-xs uppercase tracking-widest font-sans">
                <span>Wabi-Sabi Epistle • Sincere Penance</span>
              </div>
              <div className="text-xs font-mono text-stone-500">{incidentDate}</div>
            </div>

            {/* Salutation */}
            <h3 className="text-lg sm:text-xl font-medium text-stone-950 mb-6 font-serif italic">
              {salutation}
            </h3>

            {/* Letter Body */}
            <div className="space-y-4 text-stone-800 text-base sm:text-lg leading-relaxed font-serif whitespace-pre-line text-justify">
              {message}
            </div>

            {/* Signoff & Hanko Seal */}
            <div className="mt-10 pt-6 border-t border-stone-300/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <p className="text-stone-600 italic text-sm">{signoff}</p>
                <p className="text-stone-950 font-semibold text-lg mt-1 font-serif">{senderName}</p>
              </div>

              {/* Japanese Red Seal Stamp */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-red-800/90 border border-red-600 flex items-center justify-center text-amber-100 text-lg font-bold shadow-md">
                  {sealKanji}
                </div>
                <div className="text-xs font-sans text-stone-500 uppercase tracking-widest">
                  Sealed with Sincerity
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: THE 4 FRACTURES & HONEST REFLECTIONS (PENGAKUAN KERETAKAN)      */}
        {/* ========================================================================= */}
        <section className="relative">
          <div className="flex items-center gap-3 mb-4">
            <ShieldAlert className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-light tracking-wide text-amber-100">
              The 4 Fractures & Honest Reflections
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-amber-500/40 via-stone-700/40 to-transparent" />
          </div>
          <p className="text-stone-300/70 text-sm mb-8 font-sans">
            Empat titik keretakan yang kuakui dengan jujur, tanpa dalih pembenaran diri dan dengan kesadaran penuh akan lukamu.
          </p>

          {/* Stepper Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {fractures.map((fracture, idx) => (
              <button
                key={idx}
                onClick={() => setActiveFractureIndex(idx)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  activeFractureIndex === idx
                    ? "bg-amber-500/20 border-amber-400 text-amber-100 shadow-xl shadow-amber-950/40 scale-[1.02]"
                    : "bg-[#11161d]/60 border-stone-800 text-stone-300/70 hover:border-amber-500/30 hover:text-amber-200"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-lg">{fracture.icon}</span>
                  <span className="text-[10px] font-mono text-amber-400/90 tracking-wider">
                    FRACTURE 0{idx + 1}
                  </span>
                </div>
                <div className="font-serif italic text-sm font-semibold truncate text-stone-100">
                  {fracture.name.split("(")[0]}
                </div>
                <div className="text-[11px] font-sans truncate text-stone-400 mt-0.5">
                  Refleksi Jujur
                </div>
              </button>
            ))}
          </div>

          {/* Active Fracture Details */}
          {fractures[activeFractureIndex] && (
            <div className="relative p-6 sm:p-10 rounded-2xl bg-gradient-to-b from-[#131922] to-[#0c1015] border border-stone-700/60 shadow-2xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-800 pb-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{fractures[activeFractureIndex].icon}</span>
                    <h3 className="text-xl sm:text-2xl font-serif text-amber-100">
                      {fractures[activeFractureIndex].name}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-amber-400/80 uppercase tracking-widest">
                    Titik Keretakan yang Kuakui Sepenuhnya
                  </span>
                </div>

                <div className={`px-4 py-2 rounded-full border text-xs font-sans ${fractures[activeFractureIndex].borderAccent}`}>
                  <span>Pengakuan Mutlak Tanpa Pembelaan</span>
                </div>
              </div>

              <div className="space-y-5">
                <div className="p-4 rounded-xl bg-black/40 border border-stone-800">
                  <span className="text-xs uppercase tracking-wider font-sans text-amber-400/90 block mb-1">
                    Pengakuan Kesalahanku
                  </span>
                  <p className="text-base font-serif italic text-amber-100">
                    &ldquo;{fractures[activeFractureIndex].admit}&rdquo;
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-stone-900/40 border border-stone-800/80">
                  <span className="text-xs uppercase tracking-wider font-sans text-rose-400/90 block mb-1">
                    Dampak Luka yang Kusadari Terjadi Padamu
                  </span>
                  <p className="text-sm sm:text-base text-stone-200 leading-relaxed font-serif">
                    {fractures[activeFractureIndex].impact}
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: THE GOLDEN LACQUER: 3 VOWS OF MENDING (3 JANJI EMAS)            */}
        {/* ========================================================================= */}
        <section className="relative">
          <div className="flex items-center gap-3 mb-4">
            <Sun className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-light tracking-wide text-amber-100">
              The Golden Lacquer: 3 Vows of Mending
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-amber-500/40 via-stone-700/40 to-transparent" />
          </div>
          <p className="text-stone-300/70 text-sm mb-8 font-sans">
            Tiga formula pernis emas Kintsugi sebagai komitmen konkret perbaikan diri agar ikatan kita menjadi lebih kuat dan kokoh.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {vows.map((vow, idx) => (
              <div
                key={idx}
                className="relative p-6 rounded-2xl bg-gradient-to-b from-[#141a22] to-[#0d1116] border border-amber-500/30 shadow-xl flex flex-col justify-between hover:border-amber-400/60 hover:scale-[1.02] transition-all"
              >
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-amber-500/20">
                  <span className="text-xs font-mono uppercase tracking-widest text-amber-300/90">
                    Lacquer #0{idx + 1}
                  </span>
                  <span className="text-2xl">{vow.icon}</span>
                </div>

                <div className="mb-4">
                  <h3 className="text-lg font-serif font-medium text-amber-100 mb-1">
                    {vow.title}
                  </h3>
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-[11px] font-sans">
                    {vow.lacquer}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 text-xs text-stone-300 font-serif leading-relaxed italic">
                  &ldquo;{vow.action}&rdquo;
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 5: THE PRESERVED ESSENCE (4 KENANGAN BERHARGA)                     */}
        {/* ========================================================================= */}
        <section className="relative">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-light tracking-wide text-amber-100">
              The Preserved Essence
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-amber-500/40 via-stone-700/40 to-transparent" />
          </div>
          <p className="text-stone-300/70 text-sm mb-8 font-sans">
            Empat nilai suci dan kenangan murni yang menjadi alasan mengapa bejana hubungan ini terlalu berharga untuk dibiarkan hancur.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {treasures.map((treasure, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-gradient-to-b from-[#131920] to-[#0c1015] border border-stone-800 shadow-lg hover:border-amber-500/30 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-300 font-mono text-xs">
                    0{idx + 1}
                  </div>
                  <h3 className="font-serif font-medium text-amber-100 text-base">{treasure.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-stone-300/80 font-serif leading-relaxed italic pl-10">
                  &ldquo;{treasure.desc}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 6: APPLY THE GOLDEN MENDING & RECONCILIATION                      */}
        {/* ========================================================================= */}
        <footer className="relative text-center pt-8 pb-12 border-t border-amber-500/30">
          <div className="max-w-md mx-auto p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#141a23] to-[#0c1016] border border-amber-500/40 shadow-2xl">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-3xl animate-bounce">
              ✨
            </div>
            <h3 className="text-xl font-light text-amber-100 mb-2">
              Goreskan Emas Perdamaian
            </h3>
            <p className="text-xs text-stone-300/80 font-sans mb-6">
              Bila hatimu telah siap, sentuh tombol di bawah untuk merekatkan kembali retakan bejana dengan cahaya emas ketulusan.
            </p>

            <div className="flex flex-col items-center gap-3">
              <button
                onClick={handleApplyMending}
                className={`px-6 py-3 rounded-full font-sans text-xs uppercase tracking-widest font-semibold flex items-center gap-2 transition-all ${
                  isMended
                    ? "bg-amber-600/60 border border-amber-400 text-amber-100 cursor-default"
                    : "bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-stone-950 shadow-xl shadow-amber-950/60 scale-100 hover:scale-105 active:scale-95"
                }`}
              >
                <HeartHandshake className="w-4 h-4" />
                <span>{isMended ? "Emas Perdamaian Telah Digoreskan 🍶" : "Goreskan Emas Perdamaian"}</span>
              </button>

              <div className="text-xs font-mono text-amber-400/90 mt-1">
                Ikrar Rekonsiliasi Tertaut: <span className="font-bold text-amber-200">{mendedCount}</span> Kali
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-center gap-2 text-xs font-sans text-stone-400 tracking-widest uppercase">
            <div className="flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span>Dipersiapkan Khusus untuk {recipientName}</span>
            </div>
            <span>Oleh {senderName} • The Kintsugi Sanctuary</span>
          </div>
        </footer>
      </main>
    </div>
  );
}

export function KintsugiRepairTemplate(props: TemplateComponentProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0d1014] flex items-center justify-center text-amber-200 text-sm font-serif">
          Mempersiapkan Ruang Rekonsiliasi Kintsugi...
        </div>
      }
    >
      <KintsugiRepairInner {...props} />
    </Suspense>
  );
}
