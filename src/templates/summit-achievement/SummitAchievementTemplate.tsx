"use client";

import { Suspense, useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Mountain,
  Flag,
  Compass,
  Volume2,
  VolumeX,
  Music,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  Wind,
  MapPin,
} from "lucide-react";
import type { TemplateComponentProps } from "../renderer";

function SummitAchievementInner({ data, className = "" }: TemplateComponentProps) {
  const pathname = usePathname();
  const isThumbnail = pathname === "/templates";

  // Data fields with graceful defaults
  const recipientName = (data.recipientName as string) || "Sang Pendaki Juara";
  const senderName = (data.senderName as string) || "Keluarga & Tim Ekspedisi";
  const expeditionCode = (data.expeditionCode as string) || "EXP-SUMMIT-2024-8848";
  const summitElevation = (data.summitElevation as string) || "8,848 MDPL";
  const summitTitle =
    (data.summitTitle as string) || "Puncak Sarjana Teknik dengan Predikat Pujian";
  const mountainRange =
    (data.mountainRange as string) || "The Alpine Ridge of Engineering & Innovation";
  const summitDate = (data.summitDate as string) || "28 September 2024";
  const citationSummary =
    (data.citationSummary as string) ||
    "Telah terbukti menaklukkan tebing terjal, menghadapi badai salju ketidakpastian, dan menginjakkan kaki di titik tertinggi dengan kehormatan mutlak.";

  const salutation =
    (data.salutation as string) || "Dari Titik Tertinggi di Atas Samudra Awan,";
  const message =
    (data.message as string) ||
    "Saat kau berdiri di titik tertinggi hari ini, pandanglah ke bawah. Setiap malam dingin dan tanjakan terjal yang kau lewati kini terbayar lunas. Langit biru menyambut kemenanganmu.";
  const signoff = (data.signoff as string) || "Dengan rasa bangga dan cinta setinggi langit,";
  const sealText = (data.sealText as string) || "ALTISSIMA PETE";

  // 4 High-Altitude Camps
  const camps = [
    {
      title: (data.camp1_title as string) || "Base Camp: The Inception of Grit",
      elevation: (data.camp1_elevation as string) || "Elev. 2,500 MDPL • Tahun Pertama",
      challenge:
        (data.camp1_challenge as string) || "Menata ransel impian dan melangkah di jalur terjal yang asing",
      narrative:
        (data.camp1_narrative as string) ||
        "Langkah awal dimulai dengan keberanian meninggalkan zona nyaman dan mengikat tali sepatu bot pendakian dengan tekad baja.",
      icon: "⛺",
      color: "border-sky-500/40 text-sky-300 bg-sky-950/30",
    },
    {
      title: (data.camp2_title as string) || "Camp I: The Khumbu Icefall",
      elevation: (data.camp2_elevation as string) || "Elev. 5,300 MDPL • Tahun Kedua",
      challenge:
        (data.camp2_challenge as string) || "Melintasi retakan jurang es mata kuliah dan praktikum terberat",
      narrative:
        (data.camp2_narrative as string) ||
        "Medan berbahaya menguji fokus dan keseimbangan mental. Tidak goyah meski dinding es keraguan runtuh di sekeliling.",
      icon: "🧗",
      color: "border-cyan-500/40 text-cyan-300 bg-cyan-950/30",
    },
    {
      title: (data.camp3_title as string) || "Camp II: The Death Zone of Tenacity",
      elevation: (data.camp3_elevation as string) || "Elev. 7,900 MDPL • Tahun Terakhir",
      challenge:
        (data.camp3_challenge as string) || "Menghadapi tipisnya oksigen waktu saat pengerjaan tugas akhir skripsi",
      narrative:
        (data.camp3_narrative as string) ||
        "Zona paling ekstrem di mana kelelahan fisik mencapai puncak. Tapi kau bertahan dengan tabung oksigen doa keluarga.",
      icon: "❄️",
      color: "border-indigo-500/40 text-indigo-300 bg-indigo-950/30",
    },
    {
      title: (data.camp4_title as string) || "Summit Ridge: The Final Ridge to Glory",
      elevation: (data.camp4_elevation as string) || "Elev. 8,848 MDPL • Hari Kelulusan",
      challenge:
        (data.camp4_challenge as string) || "Sidang akhir terbuka dan melangkah ke panggung penobatan",
      narrative:
        (data.camp4_narrative as string) ||
        "Sinar fajar keemasan menyambut langkah kakimu di puncak tertinggi. Bendera kemenangan berkibar gagah.",
      icon: "🏔️",
      color: "border-amber-400 text-amber-200 bg-amber-900/40",
    },
  ];

  // 3 Lifeline Artifacts
  const artifacts = [
    {
      name: (data.artifact1_name as string) || "The Brass Compass of Integrity",
      virtue: (data.artifact1_virtue as string) || "Arah Moral yang Tak Pernah Tersesat",
      note:
        (data.artifact1_note as string) ||
        "Saat badai kabut tebal meragukan arah langkah, kompas kejujuran selalu membimbing ke jalur yang benar.",
      icon: "🧭",
      accent: "border-amber-500/40 bg-gradient-to-b from-amber-950/30 to-slate-950/80",
    },
    {
      name: (data.artifact2_name as string) || "The Forged Ice Axe of Resilience",
      virtue: (data.artifact2_virtue as string) || "Ketajaman Pikiran & Ketahanan Ekstrem",
      note:
        (data.artifact2_note as string) ||
        "Memahat pijakan kokoh di atas dinding tebing keputusasaan, mengubah setiap batu sandungan menjadi anak tangga kemenangan.",
      icon: "⛏️",
      accent: "border-cyan-500/40 bg-gradient-to-b from-cyan-950/30 to-slate-950/80",
    },
    {
      name: (data.artifact3_name as string) || "The Lifeline Climbing Rope",
      virtue: (data.artifact3_virtue as string) || "Jalinan Doa & Kasih Keluarga",
      note:
        (data.artifact3_note as string) ||
        "Tali keselamatan yang terikat erat dari dasar lembah, menahanmu setiap kali langkahmu goyah dan menarikmu kembali tegak.",
      icon: "🪢",
      accent: "border-blue-500/40 bg-gradient-to-b from-blue-950/30 to-slate-950/80",
    },
  ];

  // 4 Horizons
  const horizons = [
    {
      title: (data.horizon1_title as string) || "The Ridge of Professional Mastery",
      desc:
        (data.horizon1_desc as string) ||
        "Menaklukkan dunia profesional nyata dengan integritas dan keahlian mendalam.",
    },
    {
      title: (data.horizon2_title as string) || "The Valley of Generosity",
      desc:
        (data.horizon2_desc as string) ||
        "Membawa mata air ilmu dari puncak tertinggi untuk menyuburkan lembah dan memberi manfaat bagi sesama.",
    },
    {
      title: (data.horizon3_title as string) || "The Summit of Inner Peace",
      desc:
        (data.horizon3_desc as string) ||
        "Menjaga kerendahan hati dan kedamaian batin, menyadari semakin tinggi puncak semakin sejuk jiwanya.",
    },
    {
      title: (data.horizon4_title as string) || "The Infinite Alpine Horizon",
      desc:
        (data.horizon4_desc as string) ||
        "Tak pernah takut bermimpi lebih tinggi, karena kini kau tahu kekuatan pendaki sejati ada dalam dirimu.",
    },
  ];

  // Audio & Interactive Flag Planting
  const audioUrl = (data.audioUrl as string) || "";
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [flagPlanted, setFlagPlanted] = useState(false);
  const [summitTributes, setSummitTributes] = useState(89);
  const [activeCampIndex, setActiveCampIndex] = useState(0);

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

  const handlePlantFlag = () => {
    if (!flagPlanted) {
      setSummitTributes((prev) => prev + 1);
      setFlagPlanted(true);
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
      className={`min-h-screen relative overflow-hidden font-sans selection:bg-cyan-900 selection:text-cyan-100 ${className}`}
      style={{
        backgroundColor: "#060d17",
        color: "#edf4fc",
      }}
    >
      {/* Background Glacial Twilight Mountain Mesh */}
      <div
        className="fixed inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 10%, rgba(56, 189, 248, 0.15) 0%, transparent 60%),
            linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 64px 64px, 64px 64px",
        }}
      />

      {/* Subtle Alpine Blizzard Snow Embers */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-1/5 left-1/4 w-80 h-80 rounded-full bg-cyan-600/10 blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl animate-pulse"
          style={{ animationDuration: "8s" }}
        />
      </div>

      {/* Floating Audio Player (Isolated for Full Page Only) */}
      {!isThumbnail && audioUrl && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#0a1526]/95 backdrop-blur-md border border-cyan-500/40 px-4 py-2.5 rounded-full shadow-2xl shadow-sky-950/80 text-cyan-200">
          <audio ref={audioRef} src={audioUrl} loop preload="none" />
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause fanfare" : "Play fanfare"}
            className="flex items-center gap-2 text-xs font-sans tracking-widest uppercase hover:text-cyan-100 transition-colors"
          >
            {isPlaying ? (
              <span className="flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                <span>Pause Anthem</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-cyan-400/80" />
                <span>Play Anthem</span>
              </span>
            )}
          </button>
          {isPlaying && (
            <button
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute" : "Mute"}
              className="text-cyan-300/70 hover:text-cyan-100 ml-1 p-1"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>
      )}

      {/* Main Container */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20 flex flex-col gap-16 md:gap-24">
        {/* ========================================================================= */}
        {/* SECTION 1: THE SUMMIT CONQUEST CERTIFICATION & ELEVATION PLAQUE           */}
        {/* ========================================================================= */}
        <header className="relative">
          {/* Alpine Summit Badge Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-400/40 bg-gradient-to-r from-sky-950/50 via-slate-900 to-sky-950/50 text-cyan-300 text-xs tracking-widest uppercase mb-4 shadow-lg shadow-sky-950/30">
              <Mountain className="w-3.5 h-3.5 text-cyan-400" />
              <span>Alpine Expedition Registry • High Achievement Conquest</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-light tracking-wide text-cyan-50 font-serif">
              {summitTitle}
            </h1>
            <p className="mt-2 text-cyan-300/70 text-xs sm:text-sm tracking-widest uppercase">
              {mountainRange}
            </p>
          </div>

          {/* Elevation & Conquest Board */}
          <div className="relative p-6 sm:p-10 rounded-2xl bg-gradient-to-b from-[#0d1c31] to-[#07111f] border-2 border-cyan-500/40 shadow-2xl shadow-sky-950/90 overflow-hidden">
            {/* Top Right Elevation Stamp */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/40 text-cyan-300 text-xs font-mono">
              <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
              <span>{summitElevation}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center pt-4 sm:pt-2">
              {/* Left Column: Expedition Badge */}
              <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-black/40 border border-cyan-500/30 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 via-sky-600 to-blue-800 p-0.5 shadow-xl shadow-cyan-950/80 flex items-center justify-center mb-3">
                  <div className="w-full h-full rounded-full bg-[#071322] border border-cyan-300/50 flex flex-col items-center justify-center text-cyan-200">
                    <Flag className="w-7 h-7 text-cyan-400 mb-0.5" />
                    <span className="text-[9px] font-mono tracking-widest text-cyan-300/90">SUMMIT</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono tracking-widest text-cyan-300 uppercase block">
                  {expeditionCode}
                </span>
                <span className="text-[11px] text-slate-300/80 mt-1">Conquest Verified</span>
              </div>

              {/* Right Column: Climber Credentials */}
              <div className="md:col-span-2 space-y-4 text-sm">
                <div>
                  <span className="text-cyan-400/80 uppercase text-[11px] tracking-wider block font-semibold">
                    The Victorious Climber
                  </span>
                  <span className="text-2xl font-serif text-cyan-50 font-normal">{recipientName}</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-cyan-500/20 pt-3 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 uppercase text-[10px] block">Expedition Leader / Family</span>
                    <span className="text-slate-200 font-medium">{senderName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 uppercase text-[10px] block">Date Summit Reached</span>
                    <span className="text-amber-300 font-mono">{summitDate}</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-cyan-950/20 border border-cyan-500/20 text-xs italic text-cyan-100/90 font-serif leading-relaxed">
                  &ldquo;{citationSummary}&rdquo;
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* SECTION 2: THE CLIMBER'S SUMMIT DISPATCH (SURAT DARI ATAS AWAN)           */}
        {/* ========================================================================= */}
        <section className="relative">
          <div className="flex items-center gap-3 mb-6">
            <Wind className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl sm:text-2xl font-light tracking-wide text-cyan-100 font-serif">
              The Climber&apos;s Summit Dispatch
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/40 via-sky-800/40 to-transparent" />
          </div>

          {/* Weatherproof Alpine Vellum Dispatch */}
          <div
            className="relative p-8 sm:p-12 md:p-14 rounded-2xl shadow-2xl border-2 border-cyan-500/30 text-stone-900 overflow-hidden"
            style={{
              backgroundColor: "#f7f9fc",
              backgroundImage: `
                radial-gradient(circle at 10% 10%, rgba(56, 189, 248, 0.06) 0%, transparent 40%),
                radial-gradient(circle at 90% 90%, rgba(15, 23, 42, 0.05) 0%, transparent 40%)
              `,
            }}
          >
            {/* Header of the Dispatch */}
            <div className="flex items-center justify-between border-b border-stone-300/80 pb-4 mb-8">
              <div className="flex items-center gap-2 text-stone-600 text-xs uppercase tracking-widest">
                <MapPin className="w-4 h-4 text-sky-700" />
                <span>Field Log • Elevation 8,848m Above Clouds</span>
              </div>
              <div className="text-xs font-mono text-stone-500">{summitDate}</div>
            </div>

            {/* Salutation */}
            <h3 className="text-lg sm:text-xl font-medium text-sky-950 mb-6 font-serif italic">
              {salutation}
            </h3>

            {/* Body */}
            <div className="space-y-4 text-stone-800 text-base sm:text-lg leading-relaxed font-serif whitespace-pre-line text-justify">
              {message}
            </div>

            {/* Signoff & Seal */}
            <div className="mt-10 pt-6 border-t border-stone-300/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <p className="text-stone-600 italic text-sm font-serif">{signoff}</p>
                <p className="text-sky-950 font-semibold text-lg mt-1 font-serif">{senderName}</p>
              </div>

              {/* Alpine Seal */}
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-600 via-sky-700 to-blue-900 border-2 border-cyan-300/80 shadow-md flex items-center justify-center text-cyan-100 text-[10px] font-mono font-bold tracking-wider text-center p-1">
                  {sealText.split(" ")[0] || "ALTISSIMA"}
                </div>
                <div className="text-xs text-stone-500 uppercase tracking-widest">
                  Expedition Seal
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: THE 4 HIGH-ALTITUDE CAMPS (4 POS PENDAKIAN EKSTREM)            */}
        {/* ========================================================================= */}
        <section className="relative">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle2 className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl sm:text-2xl font-light tracking-wide text-cyan-100 font-serif">
              The 4 High-Altitude Camps
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/40 via-sky-800/40 to-transparent" />
          </div>
          <p className="text-slate-300/70 text-sm mb-8">
            Empat pos ketinggian ekstrem dari awal mengemas ransel di Base Camp hingga menaklukkan puncak Summit Ridge.
          </p>

          {/* Camp Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {camps.map((camp, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCampIndex(idx)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  activeCampIndex === idx
                    ? "bg-cyan-500/20 border-cyan-400 text-cyan-100 shadow-xl shadow-cyan-950/40 scale-[1.02]"
                    : "bg-[#0b182b]/60 border-slate-800 text-slate-300/70 hover:border-cyan-500/30 hover:text-cyan-200"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-lg">{camp.icon}</span>
                  <span className="text-[10px] font-mono text-cyan-400/90 tracking-wider">
                    CAMP 0{idx + 1}
                  </span>
                </div>
                <div className="font-serif italic text-sm font-semibold truncate text-cyan-100">
                  {camp.title}
                </div>
                <div className="text-[11px] truncate text-slate-400 mt-0.5">{camp.elevation}</div>
              </button>
            ))}
          </div>

          {/* Active Camp Details */}
          {camps[activeCampIndex] && (
            <div className="relative p-6 sm:p-10 rounded-2xl bg-gradient-to-b from-[#0d1e34] to-[#071221] border border-cyan-500/40 shadow-2xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan-500/20 pb-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{camps[activeCampIndex].icon}</span>
                    <h3 className="text-xl sm:text-2xl font-serif text-cyan-100">
                      {camps[activeCampIndex].title}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-cyan-400/80 uppercase tracking-widest">
                    {camps[activeCampIndex].elevation}
                  </span>
                </div>

                <div className={`px-4 py-2 rounded-full border text-xs ${camps[activeCampIndex].color}`}>
                  <span>Ketinggian Berhasil Ditaklukkan</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-black/30 border border-sky-900/30">
                  <span className="text-xs uppercase tracking-wider text-cyan-400/90 block mb-1">
                    Rintangan Medan yang Dihadapi
                  </span>
                  <p className="text-base font-serif italic text-cyan-200">
                    &ldquo;{camps[activeCampIndex].challenge}&rdquo;
                  </p>
                </div>

                <div>
                  <span className="text-xs uppercase tracking-wider text-slate-400 block mb-2">
                    Catatan Perjuangan & Ketahanan Mental
                  </span>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-serif">
                    {camps[activeCampIndex].narrative}
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: THE 3 LIFELINE ARTIFACTS (3 PERLENGKAPAN PENDAKI UNGGUL)       */}
        {/* ========================================================================= */}
        <section className="relative">
          <div className="flex items-center gap-3 mb-4">
            <Compass className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl sm:text-2xl font-light tracking-wide text-cyan-100 font-serif">
              The 3 Essential Lifeline Artifacts
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/40 via-sky-800/40 to-transparent" />
          </div>
          <p className="text-slate-300/70 text-sm mb-8">
            Tiga perlengkapan pendakian simbolis yang memandu langkah, memahat tebing es, dan menjaga keselamatan hingga puncak.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {artifacts.map((artifact, idx) => (
              <div
                key={idx}
                className={`relative p-6 rounded-2xl border ${artifact.accent} shadow-xl flex flex-col justify-between hover:scale-[1.02] transition-transform`}
              >
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                  <span className="text-xs font-mono uppercase tracking-widest text-cyan-300/80">
                    Gear #0{idx + 1}
                  </span>
                  <span className="text-2xl">{artifact.icon}</span>
                </div>

                <div className="mb-4">
                  <h3 className="text-lg font-serif font-medium text-cyan-100 mb-1">
                    {artifact.name}
                  </h3>
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-[11px]">
                    {artifact.virtue}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 text-xs text-slate-300 font-serif leading-relaxed italic">
                  &ldquo;{artifact.note}&rdquo;
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 5: THE 4 HORIZONS BEYOND THE CLOUDS (PUNCAK MASA DEPAN)           */}
        {/* ========================================================================= */}
        <section className="relative">
          <div className="flex items-center gap-3 mb-4">
            <Mountain className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl sm:text-2xl font-light tracking-wide text-cyan-100 font-serif">
              The 4 Horizons Beyond the Clouds
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/40 via-sky-800/40 to-transparent" />
          </div>
          <p className="text-slate-300/70 text-sm mb-8">
            Empat cakrawala puncak kehidupan berikutnya yang siap ditaklukkan dengan tekad dan kerendahan hati.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {horizons.map((horizon, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-gradient-to-b from-[#0d1d33] to-[#071221] border border-cyan-500/30 shadow-lg hover:border-cyan-400/50 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-cyan-300 font-mono text-xs">
                    0{idx + 1}
                  </div>
                  <h3 className="font-serif font-medium text-cyan-100 text-base">{horizon.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300/80 font-serif leading-relaxed italic pl-10">
                  &ldquo;{horizon.desc}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 6: INTERACTIVE PLANT THE VICTOR'S FLAG & FANFARE                  */}
        {/* ========================================================================= */}
        <footer className="relative text-center pt-8 pb-12 border-t border-cyan-500/30">
          <div className="max-w-md mx-auto p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#0e213b] to-[#071322] border border-cyan-500/40 shadow-2xl">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-3xl animate-bounce">
              🚩
            </div>
            <h3 className="text-xl font-light text-cyan-100 mb-2 font-serif">
              Tancapkan Bendera di Puncak
            </h3>
            <p className="text-xs text-slate-300/80 mb-6">
              Abadikan momen kemenangan penaklukan puncak prestasi ini dengan menancapkan bendera kehormatan.
            </p>

            <div className="flex flex-col items-center gap-3">
              <button
                onClick={handlePlantFlag}
                className={`px-6 py-3 rounded-full text-xs uppercase tracking-widest font-semibold flex items-center gap-2 transition-all ${
                  flagPlanted
                    ? "bg-cyan-800/60 border border-cyan-400 text-cyan-200 cursor-default"
                    : "bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-slate-950 shadow-xl shadow-cyan-950/60 scale-100 hover:scale-105 active:scale-95"
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>{flagPlanted ? "Bendera Telah Tertancap Gagah! 🏔️" : "Tancapkan Bendera Kemenangan"}</span>
              </button>

              <div className="text-xs font-mono text-cyan-400/90 mt-1">
                Total Bendera & Ucapan Penghormatan: <span className="font-bold text-cyan-200">{summitTributes}</span> Kali
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-center gap-2 text-xs text-slate-400 tracking-widest uppercase">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Didedikasikan Khusus untuk {recipientName}</span>
            </div>
            <span>Oleh {senderName} • The Alpine Summit Expedition</span>
          </div>
        </footer>
      </main>
    </div>
  );
}

export function SummitAchievementTemplate(props: TemplateComponentProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#060d17] flex items-center justify-center text-cyan-200 text-sm font-serif">
          Mempersiapkan Puncak Ekspedisi Summit of Glory...
        </div>
      }
    >
      <SummitAchievementInner {...props} />
    </Suspense>
  );
}
