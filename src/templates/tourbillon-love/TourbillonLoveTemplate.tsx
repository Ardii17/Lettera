"use client";

import { Suspense, useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Clock,
  Volume2,
  VolumeX,
  Music,
  Compass,
  Sparkles,
  Moon,
  Bell,
  Sun,
  ShieldCheck,
  Zap,
  RotateCcw,
  Watch,
  Award,
} from "lucide-react";
import type { TemplateComponentProps } from "../renderer";

function TourbillonLoveInner({ data, className = "" }: TemplateComponentProps) {
  const pathname = usePathname();
  const isThumbnail = pathname === "/templates";

  // State
  const [activeComplicationTab, setActiveComplicationTab] = useState<number>(0);
  const [powerReservePercent, setPowerReservePercent] = useState<number>(45);
  const [isWinding, setIsWinding] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioError, setAudioError] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Destructure content with safe fallbacks
  const {
    recipientName = "Genevieve Vivienne",
    senderName = "Alexandre de Montmirail",
    calibreNo = "CALIBRE-ETERNAL-N°12",
    timepieceName = "The Grand Tourbillon of Two Hearts",
    certificationStandard = "Poinçon de Genève • Geneva Seal Quality Standard",
    manufactureLocation = "Manufacture de Lettera • Vallée de Joux, Switzerland",
    synchronizationDate = "Malam Saat Detak Jantung Kita Pertama Kali Selaras",
    dialEngravingQuote = "Di antara miliaran putaran jarum jam di semesta, seluruh detik hidupku kini berdetak hanya untukmu.",
    dispatchTitle = "Cetak Biru Waktu: Presisi Abadi di Setiap Detak Jantungku",
    dispatchDate = "Vallée de Joux, Di Tengah Bunyi Detak Mekanis Jam Meja",
    mainMessage = "Genevieve yang teramat kucintai,\n\nSeorang perakit jam menghabiskan seluruh usianya menatap roda-roda gigi renik...",
    dispatchSignoff = "Dengan seluruh detik jiwa yang terus berputar untukmu,",
    complication1Title = "The Perpetual Tourbillon (Penyeimbang Gravitasi Jiwa)",
    complication1Subtitle = "Penetralisir Efek Gravitasi Bumi pada Detak Jantung",
    complication1Story = "Sebagaimana sangkar tourbillon berputar 360 derajat untuk menetralkan tarikan gravitasi...",
    complication1Meaning = "Kestabilan rasa yang tak akan terpengaruh oleh pasang surut keadaan dunia.",
    complication2Title = "The Astronomical Moon Phase (Fase Rembulan Kerinduan)",
    complication2Subtitle = "Penghitung Siklus 29,5 Hari Pasang Surut Kerinduan",
    complication2Story = "Piringan emas biru lapis lazuli yang melacak wajah bulan di langit malam...",
    complication2Meaning = "Rasa rindu yang setia menemani di setiap fase malam hingga matahari terbit.",
    complication3Title = "The Acoustic Minute Repeater (Denting Lonceng Kejujuran)",
    complication3Subtitle = "Lonceng Katedral Mini Pemukul Jam, Perempat, & Menit",
    complication3Story = "Dua palu baja yang memukul cincin gong emas menghasilkan denting merdu di dalam kegelapan...",
    complication3Meaning = "Kehadiran batin yang selalu merespons setiap desah panggilan hatimu.",
    complication4Title = "The Equation of Time (Persamaan Waktu Relatif)",
    complication4Subtitle = "Penyelarasan Waktu Matahari Sejati & Waktu Mekanis Hati",
    complication4Story = "Komplikasi paling langka yang mengukur selisih antara waktu jam dan waktu matahari nyata...",
    complication4Meaning = "Menghargai setiap detik keberadaanmu sebagai anugerah terbesar hidupku.",
    milestone1Time = "19:42:08 PM • Synchronized Heartbeat",
    milestone1Title = "Saat Jarum Detik Semesta Terhenti",
    milestone1Story = "Detik pertama saat mata kita saling bertemu di tengah riuhnya ruangan...",
    milestone1Precision = "0.00 Detik Deviasi • Kemurnian Mutlak",
    milestone2Time = "02:15:34 AM • The Midnight Confession",
    milestone2Title = "Bisikan di Luar Dimensi Jam",
    milestone2Story = "Larut malam saat kita saling membongkar dinding pertahanan diri di telepon...",
    milestone2Precision = "+0.01 Detik Kehangatan Jiwa",
    milestone3Time = "06:30:12 AM • The Golden Dawn Awakening",
    milestone3Title = "Fajar Rumah Jiwa yang Abadi",
    milestone3Story = "Pagi tenang saat secangkir teh mengepul di meja, melihatmu tersenyum...",
    milestone3Precision = "Kedamaian Fajar Sempurna",
    milestone4Time = "23:59:60 PM • The Perpetual Leap Second",
    milestone4Title = "Detik Kabisat Cinta yang Menolak Berakhir",
    milestone4Story = "Satu detik ekstra yang disisipkan semesta sebelum hari berganti...",
    milestone4Precision = "Keabadian Tanpa Batas Akhir",
    powerReserve = "Infinite Hours • Ditenagai otomatis oleh detak cinta tanpa henti",
    vibrationFrequency = "28,800 VPH • Vibrations of Passion per Hour",
    jewelCount = "32 Sacred Jewels • Menghilangkan segala gesekan ego dalam hubungan",
    waterResistance = "Immersion Proof • Tahan dan kokoh menghadapi segala badai kehidupan",
    windButtonText = "Putar Mahkota Jam Cinta",
    windSuccessMessage = "Roda gigi emas berputar merdu... daya cadangan cinta terisi penuh 100%!",
  } = data;

  const primaryColor = String(data.primaryColor || "#e0a96d");
  const secondaryColor = String(data.secondaryColor || "#38bdf8");
  const accentColor = String(data.accentColor || "#d4af37");
  const musicTrack = data.musicTrack ? String(data.musicTrack) : undefined;

  const complications = [
    {
      id: "comp1",
      num: "N° 01",
      title: complication1Title,
      subtitle: complication1Subtitle,
      story: complication1Story,
      meaning: complication1Meaning,
      icon: <Compass className="w-5 h-5 text-[#e0a96d]" />,
    },
    {
      id: "comp2",
      num: "N° 02",
      title: complication2Title,
      subtitle: complication2Subtitle,
      story: complication2Story,
      meaning: complication2Meaning,
      icon: <Moon className="w-5 h-5 text-[#38bdf8]" />,
    },
    {
      id: "comp3",
      num: "N° 03",
      title: complication3Title,
      subtitle: complication3Subtitle,
      story: complication3Story,
      meaning: complication3Meaning,
      icon: <Bell className="w-5 h-5 text-[#d4af37]" />,
    },
    {
      id: "comp4",
      num: "N° 04",
      title: complication4Title,
      subtitle: complication4Subtitle,
      story: complication4Story,
      meaning: complication4Meaning,
      icon: <Sun className="w-5 h-5 text-amber-400" />,
    },
  ];

  const milestones = [
    {
      time: milestone1Time,
      title: milestone1Title,
      story: milestone1Story,
      precision: milestone1Precision,
    },
    {
      time: milestone2Time,
      title: milestone2Title,
      story: milestone2Story,
      precision: milestone2Precision,
    },
    {
      time: milestone3Time,
      title: milestone3Title,
      story: milestone3Story,
      precision: milestone3Precision,
    },
    {
      time: milestone4Time,
      title: milestone4Title,
      story: milestone4Story,
      precision: milestone4Precision,
    },
  ];

  // Audio Toggle
  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlayingAudio(true);
          setAudioError(false);
        })
        .catch(() => {
          setAudioError(true);
          setIsPlayingAudio(false);
        });
    }
  };

  useEffect(() => {
    const audioEl = audioRef.current;
    return () => {
      if (audioEl) {
        audioEl.pause();
      }
    };
  }, []);

  // Winding handler
  const handleWind = () => {
    setIsWinding(true);
    setPowerReservePercent((prev) => Math.min(100, prev + 20));
    setTimeout(() => {
      setIsWinding(false);
    }, 1300);
  };

  return (
    <div
      className={`min-h-screen w-full relative overflow-hidden bg-[#080d16] text-[#f1f5f9] font-sans selection:bg-[#e0a96d]/30 selection:text-[#fed7aa] ${className}`}
      style={
        {
          "--primary-color": primaryColor,
          "--secondary-color": secondaryColor,
          "--accent-color": accentColor,
        } as React.CSSProperties
      }
    >
      {/* Background Atmosphere: Swiss Midnight Navy & Rose Gold Horological Machinery */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Deep Watchmaker Navy Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#060a12] via-[#09111c] to-[#0d1726]" />

        {/* Polished Rose Gold Ambient Glow */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[550px] rounded-full blur-[160px] opacity-15 pointer-events-none"
          style={{ backgroundColor: primaryColor }}
        />

        {/* Celestial Blued Steel Ambient Glow */}
        <div
          className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-[650px] h-[450px] rounded-full blur-[140px] opacity-10 pointer-events-none"
          style={{ backgroundColor: secondaryColor }}
        />

        {/* Guilloché Engine-Turned Geometric Dial Texture */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(224,169,109,0.07)_1px,transparent_1px)] bg-[size:28px_28px] opacity-70" />
      </div>

      {/* Floating Audio Controller */}
      {!isThumbnail && musicTrack && (
        <div className="fixed bottom-6 right-6 z-50">
          <audio
            ref={audioRef}
            src={musicTrack}
            loop
            preload="metadata"
            onEnded={() => setIsPlayingAudio(false)}
          />
          <button
            type="button"
            onClick={toggleAudio}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#0e1726]/90 hover:bg-[#142034] text-[#e0a96d] border border-[#e0a96d]/40 backdrop-blur-md shadow-2xl text-xs font-medium transition-all hover:scale-105 active:scale-95"
            title={isPlayingAudio ? "Jeda Melodi Kotak Musik" : "Putar Melodi Kotak Musik"}
          >
            {isPlayingAudio ? (
              <>
                <Volume2 className="w-4 h-4 text-[#e0a96d] animate-pulse" />
                <span className="font-serif italic text-amber-200">Music Box Playing</span>
              </>
            ) : (
              <>
                {audioError ? (
                  <VolumeX className="w-4 h-4 text-rose-400" />
                ) : (
                  <Music className="w-4 h-4 text-[#e0a96d]" />
                )}
                <span>Putar Musik Horologi</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Main Container */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20 space-y-16">
        {/* =========================================================================
            BAGIAN 1: Sertifikat Kaliber Jenewa (The Horological Master Certificate)
        ========================================================================= */}
        <header className="relative p-7 sm:p-12 rounded-3xl border-2 border-[#e0a96d]/30 bg-[#0d1522]/85 backdrop-blur-xl shadow-2xl overflow-hidden text-center">
          {/* Guilloché Circular Bezel Edge Accent */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#e0a96d]/80 to-transparent pointer-events-none" />

          {/* Top Brand & Geneva Seal Tag */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#e0a96d]/20">
            <div className="flex items-center gap-2.5 text-left">
              <div className="p-2.5 rounded-lg bg-[#142034] border border-[#e0a96d]/40 text-[#e0a96d]">
                <Watch className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#e0a96d]/80 block">
                  Haute Horlogerie Suisse
                </span>
                <span className="font-mono text-xs text-white font-semibold">
                  {calibreNo}
                </span>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#142034] border border-[#e0a96d]/30 text-[11px] text-[#e0a96d] font-mono">
              <Award className="w-3.5 h-3.5 text-amber-300" />
              <span>{certificationStandard}</span>
            </div>
          </div>

          {/* Grand Timepiece Name & Dedication */}
          <div className="py-8 space-y-3">
            <span className="text-xs uppercase tracking-[0.3em] font-mono text-[#e0a96d]/80 block">
              Grand Complication Chronometer
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-white italic">
              {timepieceName}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 font-serif italic max-w-xl mx-auto pt-3 border-t border-[#e0a96d]/20 leading-relaxed">
              &ldquo;{dialEngravingQuote}&rdquo;
            </p>
          </div>

          {/* Calibre Parties & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#e0a96d]/20 text-xs">
            <div className="p-3.5 rounded-xl bg-[#111c2e] border border-[#e0a96d]/20">
              <span className="text-[#e0a96d]/70 block text-[10px] uppercase tracking-wider mb-1 font-mono">
                The Keeper of My Seconds
              </span>
              <span className="font-serif text-base font-medium text-white block">
                {recipientName}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#111c2e] border border-[#e0a96d]/20">
              <span className="text-[#e0a96d]/70 block text-[10px] uppercase tracking-wider mb-1 font-mono">
                The Master Horologist
              </span>
              <span className="font-serif text-base font-medium text-[#e0a96d] block">
                {senderName}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#111c2e] border border-[#e0a96d]/20 text-left sm:text-center">
              <span className="text-[#e0a96d]/70 block text-[10px] uppercase tracking-wider mb-1 font-mono">
                Manufacture &amp; Date
              </span>
              <span className="text-xs font-serif text-slate-200 block truncate" title={String(manufactureLocation)}>
                {manufactureLocation}
              </span>
              <span className="text-[10px] text-[#e0a96d]/70 block truncate mt-0.5" title={String(synchronizationDate)}>
                {synchronizationDate}
              </span>
            </div>
          </div>
        </header>

        {/* =========================================================================
            BAGIAN 2: Surat di Meja Horologis (The Horologist's Drafting Dispatch)
        ========================================================================= */}
        <section className="relative p-8 sm:p-14 rounded-3xl border border-[#e0a96d]/30 bg-[#f8fafc] text-[#0f172a] shadow-2xl">
          {/* Subtle Gear / Drafting Compass Watermark */}
          <div className="absolute top-10 right-10 opacity-10 pointer-events-none text-[#0284c7]">
            <Clock className="w-36 h-36" />
          </div>

          {/* Dispatch Header */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-6 border-b border-slate-300">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#0284c7] font-bold block">
                Cahier d&apos;Atelier • Cetak Biru Perakit Jam
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#0f172a] font-normal mt-1">
                {dispatchTitle}
              </h2>
            </div>
            <span className="text-xs text-slate-500 font-mono italic">
              {dispatchDate}
            </span>
          </div>

          {/* Dispatch Body */}
          <div className="py-8 space-y-5 text-[#1e293b] font-serif text-base sm:text-lg leading-relaxed whitespace-pre-line">
            {mainMessage}
          </div>

          {/* Dispatch Signoff */}
          <div className="pt-6 border-t border-slate-300 flex flex-col items-end text-right">
            <p className="text-xs sm:text-sm text-slate-500 font-serif italic">
              {dispatchSignoff}
            </p>
            <span className="text-xl sm:text-2xl font-serif text-[#0f172a] italic font-semibold mt-1">
              {senderName}
            </span>
            <span className="text-[10px] text-[#0284c7] uppercase tracking-widest font-mono mt-0.5">
              Horloger Dévoué pour {recipientName}
            </span>
          </div>
        </section>

        {/* =========================================================================
            BAGIAN 3: 4 Komplikasi Mekanisme Waktu Cinta (The 4 Complications)
        ========================================================================= */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.25em] text-[#e0a96d]">
              <Compass className="w-3.5 h-3.5" />
              Les Grandes Complications
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-normal text-white">
              4 Komplikasi Mekanisme Waktu Cinta
            </h2>
            <p className="text-xs sm:text-sm text-[#e0a96d]/80 max-w-md mx-auto font-serif italic">
              Empat modul mesin mekanik yang menjaga agar detak cinta kita selalu presisi, abadi, dan menantang gravitasi kefanaan.
            </p>
          </div>

          {/* Complication Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 rounded-2xl bg-[#0c1422] border border-[#e0a96d]/25">
            {complications.map((comp, idx) => {
              const isActive = activeComplicationTab === idx;
              return (
                <button
                  key={comp.id}
                  type="button"
                  onClick={() => setActiveComplicationTab(idx)}
                  className={`p-3 rounded-xl text-left transition-all relative overflow-hidden ${
                    isActive
                      ? "bg-[#15233a] text-[#e0a96d] shadow-lg border border-[#e0a96d]/50 font-semibold"
                      : "text-[#f1f5f9]/60 hover:text-[#f1f5f9] hover:bg-[#101a2c]"
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                    <span className="text-[#e0a96d]/80">{comp.num}</span>
                    {comp.icon}
                  </div>
                  <span className="text-xs font-serif truncate block mt-0.5">
                    {String(comp.title).split("(")[0]}
                  </span>
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#e0a96d] to-amber-300" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Complication Detail Card */}
          <div className="p-6 sm:p-10 rounded-2xl border border-[#e0a96d]/30 bg-[#0d1624]/85 backdrop-blur-xl shadow-xl transition-all duration-300">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#e0a96d]/20">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#142338] border border-[#e0a96d]/40">
                  {complications[activeComplicationTab].icon}
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#e0a96d] uppercase tracking-widest block">
                    {complications[activeComplicationTab].num} • Komplikasi Kaliber
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif text-white font-medium">
                    {complications[activeComplicationTab].title}
                  </h3>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              {/* Subtitle / Function */}
              <div className="p-3.5 rounded-xl bg-[#132034]/70 border-l-2 border-[#e0a96d] text-xs sm:text-sm text-[#e0a96d] font-mono">
                Fungsi Mekanis: {complications[activeComplicationTab].subtitle}
              </div>

              {/* Story / Philosophy */}
              <div>
                <h4 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#e0a96d]" />
                  Filosofi Romantis:
                </h4>
                <p className="text-sm sm:text-base text-slate-200 font-serif leading-relaxed pl-4 border-l border-slate-700">
                  {complications[activeComplicationTab].story}
                </p>
              </div>

              {/* Meaning */}
              <div className="pt-3 border-t border-[#e0a96d]/15">
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#e0a96d]/70 block mb-0.5">
                  Janji Presisi Waktu:
                </span>
                <p className="text-xs text-slate-300 font-serif italic">
                  {complications[activeComplicationTab].meaning}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            BAGIAN 4: 4 Tonggak Detik Waktu Sakral (Chronometer Milestones)
        ========================================================================= */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.25em] text-[#38bdf8]">
              <Clock className="w-3.5 h-3.5" />
              Repères Chronométriques
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-normal text-white">
              4 Tonggak Detik Waktu Sakral
            </h2>
            <p className="text-xs sm:text-sm text-[#e0a96d]/80 max-w-md mx-auto font-serif italic">
              Empat penanda waktu presisi tinggi yang membuktikan bahwa setiap detik bersamamu terukir abadi di pelat jam semesta.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {milestones.map((item, idx) => (
              <div
                key={item.time}
                className="p-6 rounded-2xl border border-[#e0a96d]/25 bg-[#0b1320]/80 backdrop-blur-xl shadow-xl flex flex-col justify-between group hover:border-[#e0a96d]/50 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono text-[#38bdf8] bg-[#101c2e] px-2.5 py-0.5 rounded-full border border-[#38bdf8]/30">
                      {item.time}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                      Point N°0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-serif font-medium text-white mb-2">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-serif mb-4">
                    {item.story}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#e0a96d]/15">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#e0a96d]/70 block mb-0.5">
                    Tingkat Deviasi Waktu:
                  </span>
                  <p className="text-xs text-[#e0a96d] font-mono">
                    {item.precision}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            BAGIAN 5: Spesifikasi Mesin Kaliber & Metrik Daya (The Calibre Specs)
        ========================================================================= */}
        <section className="p-6 sm:p-10 rounded-2xl border border-[#e0a96d]/35 bg-[#0a121e]/90 backdrop-blur-xl shadow-xl space-y-6">
          <div className="text-center space-y-1">
            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#e0a96d]/80">
              Spécifications du Calibre Mécanique
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-normal text-white">
              Spesifikasi Mesin &amp; Cadangan Daya Kaliber
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#101b2c] border border-[#e0a96d]/20 flex items-start gap-3">
              <Zap className="w-5 h-5 text-[#e0a96d] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#e0a96d] block font-mono uppercase tracking-wider text-[11px] mb-0.5">
                  Cadangan Daya (Power Reserve):
                </strong>
                <p className="text-slate-300 font-serif italic">{powerReserve}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#101b2c] border border-[#e0a96d]/20 flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#38bdf8] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#38bdf8] block font-mono uppercase tracking-wider text-[11px] mb-0.5">
                  Frekuensi Getaran Kaliber:
                </strong>
                <p className="text-slate-300 font-serif italic">{vibrationFrequency}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#101b2c] border border-[#e0a96d]/20 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#d4af37] block font-mono uppercase tracking-wider text-[11px] mb-0.5">
                  Batu Rubi Penahan Gesekan (Jewels):
                </strong>
                <p className="text-slate-300 font-serif italic">{jewelCount}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#101b2c] border border-[#e0a96d]/20 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-emerald-300 block font-mono uppercase tracking-wider text-[11px] mb-0.5">
                  Ketahanan Lingkungan (Water Resistance):
                </strong>
                <p className="text-slate-300 font-serif italic">{waterResistance}</p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            BAGIAN 6: Interactive Crown Winding & Music Box Audio
        ========================================================================= */}
        <section className="relative p-8 sm:p-14 rounded-3xl border border-[#e0a96d]/40 bg-gradient-to-b from-[#131f32] via-[#0b1320] to-[#070b13] backdrop-blur-2xl shadow-2xl text-center space-y-6">
          <div className="inline-flex p-3.5 rounded-2xl bg-[#18263e] border border-[#e0a96d]/40 text-[#e0a96d] shadow-inner">
            <Watch className={`w-8 h-8 ${isWinding ? "animate-spin text-amber-300" : ""}`} />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h2 className="text-2xl sm:text-3xl font-serif text-white italic font-normal">
              Putar Mahkota Waktu Kita
            </h2>
            <p className="text-xs sm:text-sm text-[#e0a96d]/80 font-serif italic leading-relaxed">
              Putar mahkota jam mekanik untuk mengisi kembali cadangan daya cinta abadi yang tak akan pernah berhenti berdetak.
            </p>
          </div>

          {/* Power Reserve Gauge */}
          <div className="max-w-md mx-auto space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-[#38bdf8] flex items-center gap-1">
                <Zap className="w-3.5 h-3.5" />
                Cadangan Daya Jam
              </span>
              <span className="text-[#e0a96d] font-bold">
                {powerReservePercent}% Fully Wound
              </span>
            </div>
            <div className="w-full h-3 rounded-full bg-[#080d16] border border-[#e0a96d]/30 overflow-hidden p-0.5">
              <div
                className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-[#e0a96d] via-[#d4af37] to-[#38bdf8]"
                style={{ width: `${powerReservePercent}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>Low Reserve</span>
              <span>Optimal Precision</span>
              <span>Perpetual Eternity (100%)</span>
            </div>
          </div>

          {/* Interactive Wind Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleWind}
              disabled={isWinding || powerReservePercent >= 100}
              className={`px-8 py-4 rounded-full font-serif text-sm sm:text-base font-medium shadow-2xl transition-all duration-300 flex items-center justify-center gap-2.5 ${
                powerReservePercent >= 100
                  ? "bg-emerald-600 text-white cursor-default"
                  : "bg-gradient-to-r from-[#e0a96d] via-[#e5b882] to-[#e0a96d] text-[#0f172a] hover:scale-105 active:scale-95 hover:shadow-[#e0a96d]/20 hover:shadow-lg"
              }`}
            >
              {powerReservePercent >= 100 ? (
                <>
                  <Sparkles className="w-5 h-5 text-emerald-200" />
                  <span>Cadangan Daya Terisi Penuh Abadi (100%)</span>
                </>
              ) : isWinding ? (
                <>
                  <RotateCcw className="w-5 h-5 animate-spin text-[#0f172a]" />
                  <span>Memutar Roda Gigi Utama...</span>
                </>
              ) : (
                <>
                  <Watch className="w-5 h-5" />
                  <span>{windButtonText}</span>
                </>
              )}
            </button>

            {powerReservePercent > 45 && (
              <button
                type="button"
                onClick={() => setPowerReservePercent(45)}
                className="p-3 rounded-full bg-[#111c2e] hover:bg-[#182740] text-[#e0a96d]/70 hover:text-[#e0a96d] text-xs transition-colors"
                title="Reset Daya Cadangan"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Success Winding Notice */}
          {powerReservePercent > 45 && (
            <p className="text-xs sm:text-sm text-[#e0a96d] font-serif italic animate-fade-in max-w-md mx-auto">
              &ldquo;{windSuccessMessage}&rdquo;
            </p>
          )}

          {/* Footer Copyright and Blessing */}
          <div className="pt-8 border-t border-[#e0a96d]/20 text-[11px] text-[#e0a96d]/60 font-mono">
            <span>
              L&apos;Horlogerie de l&apos;Amour • Mahakarya Detak Abadi untuk {recipientName} &bull; Vallée de Joux, Switzerland
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}

export function TourbillonLoveTemplate(props: TemplateComponentProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full flex items-center justify-center bg-[#080d16] text-[#e0a96d] font-mono text-sm">
          Menyelaraskan kaliber waktu...
        </div>
      }
    >
      <TourbillonLoveInner {...props} />
    </Suspense>
  );
}
