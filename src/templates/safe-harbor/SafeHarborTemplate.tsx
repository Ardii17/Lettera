"use client";

import { Suspense, useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Anchor,
  Compass,
  Volume2,
  VolumeX,
  Music,
  Wind,
  Waves,
  Sparkles,
  MapPin,
  Ship,
  Sun,
} from "lucide-react";
import type { TemplateComponentProps } from "../renderer";

function SafeHarborInner({ data, className = "" }: TemplateComponentProps) {
  const pathname = usePathname();
  const isThumbnail = pathname === "/templates";

  // Data fields with graceful defaults
  const recipientName = (data.recipientName as string) || "Nahkoda Hatiku";
  const senderName = (data.senderName as string) || "Penjaga Mercusuar";
  const logbookNo = (data.logbookNo as string) || "HARBOR-RESTORE-2024";
  const vesselName = (data.vesselName as string) || "The Voyage of Us";
  const stormDate = (data.stormDate as string) || "Malam Saat Badai Mengguncang";
  const stormLocation =
    (data.stormLocation as string) || "The Turbulent Waters of Misunderstanding";
  const accountabilityNote =
    (data.accountabilityNote as string) ||
    "Aku mengakui bahwa keegoisan dan kelalaianku telah menjadi angin kencang yang mengguncang bahtera kita. Rasa cemas di hatimu adalah akibat dari ketidakmampuanku menjaga kemudi dengan bijak.";

  const salutation =
    (data.salutation as string) || "Untuk Nahkoda yang Paling Kucintai di Tengah Badai,";
  const message =
    (data.message as string) ||
    "Menulis surat ini dari balik kaca mercusuar, aku melihat bahtera kita terombang-ambing oleh ombak yang kubuat sendiri. Tugas lenteraku adalah memancarkan cahaya hangat menembus malam, memberi tahu bahwa teluk ini aman dan tenang, kapan pun kau merasa siap untuk pulang.";
  const signoff =
    (data.signoff as string) || "Dari dermaga yang selalu menunggumu pulang dengan damai,";
  const sealInitials = (data.sealInitials as string) || "A & C";

  // 4 Waves
  const waves = [
    {
      name:
        (data.wave1_name as string) ||
        "The Gale of Careless Anger (Badai Emosi Sesaat)",
      admit:
        (data.wave1_admit as string) ||
        "Aku membiarkan rasa frustrasi melahirkan kata-kata tajam yang menghantam perasaanmu tanpa ampun.",
      impact:
        (data.wave1_impact as string) ||
        "Kau merasa takut, tidak aman, dan terkejut melihat sisi diriku yang kehilangan kelembutan.",
      icon: "⛈️",
      accent: "border-rose-800/40 bg-rose-950/20 text-rose-300",
    },
    {
      name:
        (data.wave2_name as string) ||
        "The Hidden Reef of Misplaced Pride (Karang Tersembunyi Ego)",
      admit:
        (data.wave2_admit as string) ||
        "Aku menolak menurunkan layar gengsi dan bersikeras mencari pembenaran atas kesalahanku.",
      impact:
        (data.wave2_impact as string) ||
        "Kau merasa suaramu tidak didengar dan seolah-olah kemenangan argumen lebih kuutamakan daripada hatimu.",
      icon: "🪨",
      accent: "border-amber-800/40 bg-amber-950/20 text-amber-300",
    },
    {
      name:
        (data.wave3_name as string) ||
        "The Drifting Current of Inattention (Arus Kelalaian Menjaga)",
      admit:
        (data.wave3_admit as string) ||
        "Aku terlalu sibuk menatap ombak di luar hingga lalai memperhatikan bahwa air laut sudah merembes ke geladak hatimu.",
      impact:
        (data.wave3_impact as string) ||
        "Kau merasa lelah berjuang sendirian menjaga keutuhan kapal ini saat aku terlena.",
      icon: "🌊",
      accent: "border-cyan-800/40 bg-cyan-950/20 text-cyan-300",
    },
    {
      name:
        (data.wave4_name as string) ||
        "The Cold Fog of Silence (Kabut Dingin Keterpisahan)",
      admit:
        (data.wave4_admit as string) ||
        "Aku memilih menutup diri dan diam berhari-hari bukannya segera mendayung mendekat untuk memelukmu.",
      impact:
        (data.wave4_impact as string) ||
        "Keheningan itu membuatmu merasa terasing di tengah lautan luas yang gelap dan dingin.",
      icon: "🌫️",
      accent: "border-slate-700/40 bg-slate-900/30 text-slate-300",
    },
  ];

  // 3 Anchors
  const anchors = [
    {
      name:
        (data.anchor1_name as string) || "The Anchor of Absolute Humility",
      virtue:
        (data.anchor1_virtue as string) || "Menurunkan Gengsi & Menghentikan Debat",
      action:
        (data.anchor1_action as string) ||
        "Aku tidak akan lagi mencari siapa yang salah atau benar. Aku memilih mengalah dan merangkul perasaanmu dengan kelembutan penuh.",
      icon: "⚓",
    },
    {
      name:
        (data.anchor2_name as string) || "The Anchor of Gentle Harbor",
      virtue:
        (data.anchor2_virtue as string) || "Menjadikan Diri Ruang Aman Penuh Kasih",
      action:
        (data.anchor2_action as string) ||
        "Menciptakan suasana rumah dan pelukan di mana kau bebas menangis, mengeluh, dan mengungkapkan rasa kecewamu tanpa takut dihakimi.",
      icon: "🏡",
    },
    {
      name:
        (data.anchor3_name as string) || "The Steadfast Beacon of Patience",
      virtue:
        (data.anchor3_virtue as string) || "Kesetiaan Menunggu Tanpa Menuntut",
      action:
        (data.anchor3_action as string) ||
        "Aku tidak akan menuntutmu segera memaafkanku. Aku akan terus menjaga nyala api kebaikan dan perhatian kecil setiap hari hingga hatimu benar-benar pulih.",
      icon: "🕯️",
    },
  ];

  // 4 Calm Waters
  const calmWaters = [
    {
      title: (data.calm1_title as string) || "The Sunlit Morning Waters",
      desc:
        (data.calm1_desc as string) ||
        "Pagi-pagi hening saat kita menikmati secangkir kopi bersama tanpa perlu berkata-kata, hanya rasa nyaman yang mengisi ruangan.",
    },
    {
      title: (data.calm2_title as string) || "The Harbor of Honest Laughter",
      desc:
        (data.calm2_desc as string) ||
        "Tawa renyah kita saat hal-hal sederhana terjadi di luar rencana, saling menatap dan tahu kita saling memiliki seutuhnya.",
    },
    {
      title: (data.calm3_title as string) || "The Starlit Anchorage",
      desc:
        (data.calm3_desc as string) ||
        "Obrolan larut malam di mana kita saling menceritakan mimpi dan rapuhnya hati kita tanpa keraguan sedikit pun.",
    },
    {
      title: (data.calm4_title as string) || "The Horizon of Tomorrow",
      desc:
        (data.calm4_desc as string) ||
        "Keyakinan mendalam bahwa bahtera ini ditakdirkan untuk berlayar jauh melintasi waktu, tumbuh semakin kokoh setelah melewati badai.",
    },
  ];

  // Audio & Interactive Beacon
  const audioUrl = (data.audioUrl as string) || "";
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isBeaconLit, setIsBeaconLit] = useState(false);
  const [beaconCount, setBeaconCount] = useState(58);
  const [activeWaveIndex, setActiveWaveIndex] = useState(0);

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

  const handleLightBeacon = () => {
    if (!isBeaconLit) {
      setBeaconCount((prev) => prev + 1);
      setIsBeaconLit(true);
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
      className={`min-h-screen relative overflow-hidden font-sans selection:bg-amber-900 selection:text-amber-100 ${className}`}
      style={{
        backgroundColor: "#060e19",
        color: "#ebf2fa",
      }}
    >
      {/* Background Stormy Oceanic Mesh & Ambient Light */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 12%, rgba(245, 158, 11, 0.15) 0%, transparent 65%),
            linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 60px 60px, 60px 60px",
        }}
      />

      {/* Rotating / Pulsing Beacon Beam Visual when Lit */}
      {isBeaconLit && (
        <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber-400/25 via-cyan-900/10 to-transparent transition-all duration-1000 animate-pulse" />
      )}

      {/* Floating Audio Player (Isolated for Full Page Only) */}
      {!isThumbnail && audioUrl && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#0c1626]/95 backdrop-blur-md border border-amber-500/40 px-4 py-2.5 rounded-full shadow-2xl shadow-slate-950/90 text-amber-200">
          <audio ref={audioRef} src={audioUrl} loop preload="none" />
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause music" : "Play music"}
            className="flex items-center gap-2 text-xs font-sans tracking-widest uppercase hover:text-amber-100 transition-colors"
          >
            {isPlaying ? (
              <span className="flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5 animate-spin text-amber-400" />
                <span>Pause Melody</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-amber-400/80" />
                <span>Play Melody</span>
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
        {/* SECTION 1: THE NAVIGATIONAL STORM LOG & HARBOR COORDINATES                */}
        {/* ========================================================================= */}
        <header className="relative">
          {/* Beacon Title Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/40 bg-gradient-to-r from-amber-950/40 via-slate-900 to-amber-950/40 text-amber-300 text-xs tracking-widest uppercase mb-4 shadow-lg shadow-amber-950/20">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>The Lighthouse Sanctuary • Guiding Light in the Storm</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-light tracking-wide text-amber-100 font-serif">
              Safe Harbor
            </h1>
            <p className="mt-2 text-cyan-300/80 text-xs sm:text-sm tracking-widest uppercase">
              Buku Log Navigasi Badai & Teluk Perdamaian
            </p>
          </div>

          {/* Navigational Board */}
          <div className="relative p-6 sm:p-10 rounded-2xl bg-gradient-to-b from-[#0f1d31] to-[#081220] border-2 border-amber-500/40 shadow-2xl shadow-slate-950/90 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {/* Left Column: Lighthouse Emblem */}
              <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-black/40 border border-slate-800 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 via-amber-600 to-yellow-800 p-0.5 shadow-xl shadow-amber-950/80 flex items-center justify-center mb-3">
                  <div className="w-full h-full rounded-full bg-[#081524] border border-amber-300/50 flex flex-col items-center justify-center text-amber-200">
                    <Sun className="w-7 h-7 text-amber-400 mb-0.5" />
                    <span className="text-[9px] font-mono tracking-widest text-amber-300/90">BEACON</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono tracking-widest text-amber-300 uppercase block">
                  {logbookNo}
                </span>
                <span className="text-[11px] text-slate-300/80 mt-1">{vesselName}</span>
              </div>

              {/* Right Column: Log Coordinates */}
              <div className="md:col-span-2 space-y-4 text-sm">
                <div>
                  <span className="text-amber-400/80 uppercase text-[11px] tracking-wider block font-semibold">
                    Nahkoda yang Menghadapi Badai (Penerima Maaf)
                  </span>
                  <span className="text-2xl font-serif text-amber-100 font-normal">{recipientName}</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-slate-800 pt-3 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 uppercase text-[10px] block">Penjaga Mercusuar (Pengirim)</span>
                    <span className="text-slate-200 font-medium">{senderName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 uppercase text-[10px] block">Waktu Badai Memuncak</span>
                    <span className="text-amber-300 font-mono">{stormDate}</span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 uppercase text-[10px] block">Koordinat Perairan</span>
                  <span className="text-cyan-300 font-mono text-xs">{stormLocation}</span>
                </div>

                <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/20 text-xs italic text-amber-100/90 font-serif leading-relaxed">
                  &ldquo;{accountabilityNote}&rdquo;
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* SECTION 2: THE KEEPER'S MIDNIGHT DISPATCH (SURAT DARI MERCUSUAR)          */}
        {/* ========================================================================= */}
        <section className="relative">
          <div className="flex items-center gap-3 mb-6">
            <Wind className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-light tracking-wide text-amber-100 font-serif">
              The Keeper&apos;s Midnight Dispatch
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-amber-500/40 via-slate-800 to-transparent" />
          </div>

          {/* Logbook Parchment Paper */}
          <div
            className="relative p-8 sm:p-12 md:p-14 rounded-2xl shadow-2xl border-2 border-amber-600/30 text-stone-900 overflow-hidden"
            style={{
              backgroundColor: "#f7f5ee",
              backgroundImage: `
                radial-gradient(circle at 10% 10%, rgba(245, 158, 11, 0.06) 0%, transparent 40%),
                radial-gradient(circle at 90% 90%, rgba(8, 18, 32, 0.05) 0%, transparent 40%)
              `,
            }}
          >
            {/* Header of the Dispatch */}
            <div className="flex items-center justify-between border-b border-stone-300/80 pb-4 mb-8">
              <div className="flex items-center gap-2 text-stone-600 text-xs uppercase tracking-widest">
                <MapPin className="w-4 h-4 text-amber-700" />
                <span>Station Dispatch • Lighthouse Tower #01</span>
              </div>
              <div className="text-xs font-mono text-stone-500">{stormDate}</div>
            </div>

            {/* Salutation */}
            <h3 className="text-lg sm:text-xl font-medium text-slate-950 mb-6 font-serif italic">
              {salutation}
            </h3>

            {/* Body */}
            <div className="space-y-4 text-stone-800 text-base sm:text-lg leading-relaxed font-serif whitespace-pre-line text-justify">
              {message}
            </div>

            {/* Signoff & Nautical Seal */}
            <div className="mt-10 pt-6 border-t border-stone-300/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <p className="text-stone-600 italic text-sm font-serif">{signoff}</p>
                <p className="text-slate-950 font-semibold text-lg mt-1 font-serif">{senderName}</p>
              </div>

              {/* Compass Seal */}
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-600 via-yellow-700 to-amber-900 border-2 border-amber-300/80 shadow-md flex items-center justify-center text-amber-100 text-xs font-mono font-bold tracking-wider text-center p-1">
                  {sealInitials}
                </div>
                <div className="text-xs text-stone-500 uppercase tracking-widest">
                  Lighthouse Compass Seal
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: THE 4 TURBULENT WAVES (4 GELOMBANG BADAI YANG DIAKUI)          */}
        {/* ========================================================================= */}
        <section className="relative">
          <div className="flex items-center gap-3 mb-4">
            <Waves className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl sm:text-2xl font-light tracking-wide text-amber-100 font-serif">
              The 4 Turbulent Waves
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/40 via-slate-800 to-transparent" />
          </div>
          <p className="text-slate-300/70 text-sm mb-8">
            Empat guncangan ombak yang kuakui telah membahayakan ketenanganmu, tanpa dalih menyalahkan arah angin.
          </p>

          {/* Stepper Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {waves.map((wave, idx) => (
              <button
                key={idx}
                onClick={() => setActiveWaveIndex(idx)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  activeWaveIndex === idx
                    ? "bg-amber-500/20 border-amber-400 text-amber-100 shadow-xl shadow-amber-950/40 scale-[1.02]"
                    : "bg-[#0b1728]/60 border-slate-800 text-slate-300/70 hover:border-amber-500/30 hover:text-amber-200"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-lg">{wave.icon}</span>
                  <span className="text-[10px] font-mono text-amber-400/90 tracking-wider">
                    WAVE 0{idx + 1}
                  </span>
                </div>
                <div className="font-serif italic text-sm font-semibold truncate text-amber-100">
                  {wave.name.split("(")[0]}
                </div>
                <div className="text-[11px] truncate text-slate-400 mt-0.5">Refleksi Ombak</div>
              </button>
            ))}
          </div>

          {/* Active Wave Details */}
          {waves[activeWaveIndex] && (
            <div className="relative p-6 sm:p-10 rounded-2xl bg-gradient-to-b from-[#101f34] to-[#081220] border border-amber-500/30 shadow-2xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{waves[activeWaveIndex].icon}</span>
                    <h3 className="text-xl sm:text-2xl font-serif text-amber-100">
                      {waves[activeWaveIndex].name}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-amber-400/80 uppercase tracking-widest">
                    Penyebab Badai yang Kuakui Sepenuhnya
                  </span>
                </div>

                <div className={`px-4 py-2 rounded-full border text-xs ${waves[activeWaveIndex].accent}`}>
                  <span>Pengakuan Terbuka Tanpa Dalih</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-black/30 border border-slate-800">
                  <span className="text-xs uppercase tracking-wider text-amber-400/90 block mb-1">
                    Kelalaian / Kesalahanku yang Menciptakan Ombak
                  </span>
                  <p className="text-base font-serif italic text-amber-100">
                    &ldquo;{waves[activeWaveIndex].admit}&rdquo;
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800">
                  <span className="text-xs uppercase tracking-wider text-cyan-400/90 block mb-1">
                    Guncangan & Rasa Takut yang Kau Rasakan
                  </span>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-serif">
                    {waves[activeWaveIndex].impact}
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: THE 3 ANCHORS OF PEACE (3 JANGKAR PERDAMAIAN)                  */}
        {/* ========================================================================= */}
        <section className="relative">
          <div className="flex items-center gap-3 mb-4">
            <Anchor className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-light tracking-wide text-amber-100 font-serif">
              The 3 Anchors of Peace
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-amber-500/40 via-slate-800 to-transparent" />
          </div>
          <p className="text-slate-300/70 text-sm mb-8">
            Tiga jangkar kokoh yang diturunkan untuk menenangkan air dan memberi rasa aman di teluk pelabuhan.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {anchors.map((anchor, idx) => (
              <div
                key={idx}
                className="relative p-6 rounded-2xl bg-gradient-to-b from-[#101e32] to-[#091322] border border-amber-500/30 shadow-xl flex flex-col justify-between hover:border-amber-400/60 hover:scale-[1.02] transition-all"
              >
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                  <span className="text-xs font-mono uppercase tracking-widest text-amber-300/90">
                    Anchor #0{idx + 1}
                  </span>
                  <span className="text-2xl">{anchor.icon}</span>
                </div>

                <div className="mb-4">
                  <h3 className="text-lg font-serif font-medium text-amber-100 mb-1">
                    {anchor.name}
                  </h3>
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-[11px]">
                    {anchor.virtue}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 text-xs text-slate-300 font-serif leading-relaxed italic">
                  &ldquo;{anchor.action}&rdquo;
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 5: 4 CALM WATERS WE LONG TO RETURN TO (4 PERAIRAN DAMAI)          */}
        {/* ========================================================================= */}
        <section className="relative">
          <div className="flex items-center gap-3 mb-4">
            <Compass className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-light tracking-wide text-amber-100 font-serif">
              Calm Waters We Long to Return To
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-amber-500/40 via-slate-800 to-transparent" />
          </div>
          <p className="text-slate-300/70 text-sm mb-8">
            Empat perairan tenang yang membuktikan bahwa bahtera ini layak dirawat melintasi setiap badai.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {calmWaters.map((calm, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-gradient-to-b from-[#0f1d30] to-[#081220] border border-slate-800 shadow-lg hover:border-amber-500/30 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-300 font-mono text-xs">
                    0{idx + 1}
                  </div>
                  <h3 className="font-serif font-medium text-amber-100 text-base">{calm.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300/80 font-serif leading-relaxed italic pl-10">
                  &ldquo;{calm.desc}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 6: INTERACTIVE ILLUMINATE THE BEACON                              */}
        {/* ========================================================================= */}
        <footer className="relative text-center pt-8 pb-12 border-t border-amber-500/30">
          <div className="max-w-md mx-auto p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#11233d] to-[#081425] border border-amber-500/40 shadow-2xl">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-3xl animate-bounce">
              🏮
            </div>
            <h3 className="text-xl font-light text-amber-100 mb-2 font-serif">
              Nyalakan Lentera Mercusuar
            </h3>
            <p className="text-xs text-slate-300/80 mb-6">
              Sentuh tombol ini bila hatimu ingin melihat sinar lentera yang menembus pekatnya malam, memandu bahtera kembali ke pelabuhan damai.
            </p>

            <div className="flex flex-col items-center gap-3">
              <button
                onClick={handleLightBeacon}
                className={`px-6 py-3 rounded-full text-xs uppercase tracking-widest font-semibold flex items-center gap-2 transition-all ${
                  isBeaconLit
                    ? "bg-amber-600/70 border border-amber-400 text-amber-100 cursor-default"
                    : "bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 shadow-xl shadow-amber-950/60 scale-100 hover:scale-105 active:scale-95"
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>{isBeaconLit ? "Lentera Perdamaian Menyala Terang ✨" : "Nyalakan Lentera Mercusuar"}</span>
              </button>

              <div className="text-xs font-mono text-amber-400/90 mt-1">
                Lentera Perdamaian Dihidupkan: <span className="font-bold text-amber-200">{beaconCount}</span> Kali
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-center gap-2 text-xs text-slate-400 tracking-widest uppercase">
            <div className="flex items-center gap-2">
              <Ship className="w-3.5 h-3.5 text-amber-400" />
              <span>Darmaga Cinta untuk {recipientName}</span>
            </div>
            <span>Oleh {senderName} • Safe Harbor Sanctuary</span>
          </div>
        </footer>
      </main>
    </div>
  );
}

export function SafeHarborTemplate(props: TemplateComponentProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#060e19] flex items-center justify-center text-amber-200 text-sm font-serif">
          Mempersiapkan Pelabuhan Damai Safe Harbor...
        </div>
      }
    >
      <SafeHarborInner {...props} />
    </Suspense>
  );
}
