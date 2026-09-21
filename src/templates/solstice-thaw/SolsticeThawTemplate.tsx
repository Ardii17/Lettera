"use client";

import { Suspense, useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Flame,
  Volume2,
  VolumeX,
  Music,
  Wind,
  Sparkles,
  ThermometerSnowflake,
  Flower2,
  Sun,
  ShieldAlert,
  Snowflake,
  RotateCcw,
} from "lucide-react";
import type { TemplateComponentProps } from "../renderer";

function SolsticeThawInner({ data, className = "" }: TemplateComponentProps) {
  const pathname = usePathname();
  const isThumbnail = pathname === "/templates";

  // State
  const [activeFrostTab, setActiveFrostTab] = useState<number>(0);
  const [warmthLevel, setWarmthLevel] = useState<number>(35); // 35% starting thaw warmth
  const [isMelting, setIsMelting] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioError, setAudioError] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Destructure content with safe fallbacks
  const {
    recipientName = "Clarissa Amanda",
    senderName = "Arkananta",
    freezeRecordNo = "SOLSTICE-THAW-2024",
    coldestHour = "Malam Terdingin Saat Keheningan Membeku",
    frostLocation = "The Frozen Valley of Misunderstandings",
    frostSeverity = "Sub-Zero Bitter Frost (-18°C) • Lingering Silence",
    hearthkeeperPledge = "Bukan badai musim dingin di luar yang membekukan ruang ini, melainkan keangkuhan, kata-kata ceroboh, dan keheninganku yang memadamkan nyala perapian. Aku bertanggung jawab penuh atas dinginnya rasa sakit yang kamu rasakan.",
    letterTitle = "Menghapus Embun Dingin di Antara Kita",
    letterDate = "Fajar Titik Balik Musim Dingin",
    mainMessage = "Ketika jendela di antara kita tertutup rapat dan udara berubah membeku, aku sadar betapa mengerikannya kesunyian yang kuciptakan...",
    letterSignoff = "Dengan jemari hangat yang selalu menantimu di dekat perapian,",
    frost1Title = "The Blizzard of Piercing Words",
    frost1Temp = "-15°C Sharp Frost",
    frost1Confession = "Aku melontarkan kata-kata tajam dengan intonasi meninggi di saat aku seharusnya menurunkan ego dan mendengarkan.",
    frost1Impact = "Membuatmu merasa tidak dihargai, takut berbicara jujur, dan terpaksa menarik diri ke dalam kesedihan.",
    frost2Title = "The Permafrost of Broken Attentiveness",
    frost2Temp = "-22°C Frozen Presence",
    frost2Confession = "Aku terlalu tenggelam dalam layar gadget dan kesibukan duniaku sendiri saat kamu membutuhkan kehadiranku.",
    frost2Impact = "Membuatmu merasa kesepian di tengah kebersamaan kita.",
    frost3Title = "The Glacial Wall of Defensive Pride",
    frost3Temp = "-28°C Impenetrable Glacier",
    frost3Confession = "Saat kamu mengutarakan kekecewaanmu, naluri pertamaku justru memasang dinding pembelaan diri.",
    frost3Impact = "Menghancurkan rasa aman untuk berkomunikasi dan membuat lukamu berlipat ganda.",
    frost4Title = "The Long Polar Night of Silence",
    frost4Temp = "-35°C Polar Freeze",
    frost4Confession = "Aku memilih membisu berjam-jam (silent treatment) dan membiarkan ketegangan menggantung tanpa kepastian.",
    frost4Impact = "Menimbulkan kecemasan berlebih, rasa terasing, dan ketidakpastian batin yang melelahkan.",
    hearthfire1Title = "The Flame of Gentle Tenderness",
    hearthfire1Subtitle = "Komitmen Kelembutan Nada Bicara",
    hearthfire1Promise = "Aku bersumpah tidak akan pernah lagi melontarkan kalimat dengan intonasi tinggi atau nada mencemooh.",
    hearthfire1Action = "Menurunkan nada bicara, menatap matamu dengan penuh kasih, dan selalu memvalidasi perasaanmu.",
    hearthfire2Title = "The Flame of Prompt Warmth",
    hearthfire2Subtitle = "Pantangan Sikap Membisu (No Silent Treatment)",
    hearthfire2Promise = "Aku berjanji tidak akan pernah membiarkan matahari terbenam dengan kesunyian yang membeku.",
    hearthfire2Action = "Komunikasi transparan dalam waktu maksimal 60 menit dan membuka ruang dialog jujur.",
    hearthfire3Title = "The Flame of Patient Thawing",
    hearthfire3Subtitle = "Kesabaran Memulihkan Kepercayaan",
    hearthfire3Promise = "Aku mengerti bahwa es di hatimu membutuhkan waktu untuk meleleh secara alami tanpa paksaan.",
    hearthfire3Action = "Menghargai tempo pemulihan hatimu tanpa keluhan dan konsisten merawat rasa nyaman.",
    snowdrop1Title = "The Radiance of Your Warm Smile",
    snowdrop1Memory = "Saat kita tertawa lepas di kedai kopi hangat di tengah rintik hujan...",
    snowdrop1Meaning = "Senyumanmu adalah nyala api perapian terindah yang tidak rela kubiarkan padam.",
    snowdrop2Title = "The Safe Haven of Our Honest Talks",
    snowdrop2Memory = "Momen larut malam saat kita bisa menceritakan ketakutan terdalam kita...",
    snowdrop2Meaning = "Ruang saling percaya seperti itu terlalu suci untuk dihancurkan oleh dinding ego.",
    snowdrop3Title = "The Frosts We Overcame Before",
    snowdrop3Memory = "Ujian jarak dan ketidakpastian yang berhasil kita lewati bersama...",
    snowdrop3Meaning = "Ikatan kita memiliki akar yang dalam untuk bertumbuh lebih dewasa.",
    snowdrop4Title = "The Blooming Meadow Ahead",
    snowdrop4Memory = "Semua rencana perjalanan, mimpi rumah dengan jendela menghadap fajar...",
    snowdrop4Meaning = "Masa depan indah itu menanti kita di balik musim dingin ini.",
    meltButtonText = "Hembuskan Kehangatan Pelebur Es",
    meltSuccessMessage = "Kehangatan dihantarkan... kristal es mulai meleleh menjadi tetesan embun musim semi.",
  } = data;

  const primaryColor = String(data.primaryColor || "#38bdf8");
  const secondaryColor = String(data.secondaryColor || "#fbbf24");
  const accentColor = String(data.accentColor || "#86efac");
  const musicTrack = data.musicTrack ? String(data.musicTrack) : undefined;

  const frosts = [
    {
      id: 1,
      title: frost1Title,
      temp: frost1Temp,
      confession: frost1Confession,
      impact: frost1Impact,
    },
    {
      id: 2,
      title: frost2Title,
      temp: frost2Temp,
      confession: frost2Confession,
      impact: frost2Impact,
    },
    {
      id: 3,
      title: frost3Title,
      temp: frost3Temp,
      confession: frost3Confession,
      impact: frost3Impact,
    },
    {
      id: 4,
      title: frost4Title,
      temp: frost4Temp,
      confession: frost4Confession,
      impact: frost4Impact,
    },
  ];

  const hearthfires = [
    {
      num: "01",
      title: hearthfire1Title,
      subtitle: hearthfire1Subtitle,
      promise: hearthfire1Promise,
      action: hearthfire1Action,
    },
    {
      num: "02",
      title: hearthfire2Title,
      subtitle: hearthfire2Subtitle,
      promise: hearthfire2Promise,
      action: hearthfire2Action,
    },
    {
      num: "03",
      title: hearthfire3Title,
      subtitle: hearthfire3Subtitle,
      promise: hearthfire3Promise,
      action: hearthfire3Action,
    },
  ];

  const snowdrops = [
    {
      num: "I",
      title: snowdrop1Title,
      memory: snowdrop1Memory,
      meaning: snowdrop1Meaning,
    },
    {
      num: "II",
      title: snowdrop2Title,
      memory: snowdrop2Memory,
      meaning: snowdrop2Meaning,
    },
    {
      num: "III",
      title: snowdrop3Title,
      memory: snowdrop3Memory,
      meaning: snowdrop3Meaning,
    },
    {
      num: "IV",
      title: snowdrop4Title,
      memory: snowdrop4Memory,
      meaning: snowdrop4Meaning,
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

  // Handle melt action
  const handleMelt = () => {
    setIsMelting(true);
    setWarmthLevel((prev) => Math.min(100, prev + 15));
    setTimeout(() => {
      setIsMelting(false);
    }, 1200);
  };

  const handleResetWarmth = () => {
    setWarmthLevel(35);
  };

  return (
    <div
      className={`min-h-screen w-full relative overflow-hidden bg-[#0a1118] text-slate-100 font-sans selection:bg-amber-400/30 selection:text-amber-200 ${className}`}
      style={
        {
          "--primary-color": primaryColor,
          "--secondary-color": secondaryColor,
          "--accent-color": accentColor,
        } as React.CSSProperties
      }
    >
      {/* Background Ambience: Winter Solstice Transition */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Deep midnight ice gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070e17] via-[#0d1b2a] to-[#121c27]" />

        {/* Glowing Hearthfire Gradient in the center bottom */}
        <div
          className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-[140px] opacity-25 transition-opacity duration-1000 pointer-events-none"
          style={{
            backgroundColor: secondaryColor,
            opacity: 0.15 + (warmthLevel / 100) * 0.35,
          }}
        />

        {/* Cold frost glow at top */}
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full blur-[120px] opacity-20 pointer-events-none"
          style={{ backgroundColor: primaryColor }}
        />

        {/* Subtle crystalline frost grid texture */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(56,189,248,0.06)_1px,transparent_1px)] bg-[size:28px_28px] opacity-60" />
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
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-slate-900/90 hover:bg-slate-800 text-sky-200 border border-sky-400/30 backdrop-blur-md shadow-xl text-xs font-medium transition-all hover:scale-105 active:scale-95"
            title={isPlayingAudio ? "Jeda Melodi Pelebur Es" : "Putar Melodi Pelebur Es"}
          >
            {isPlayingAudio ? (
              <>
                <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
                <span className="text-amber-200">Solstice Melody Playing</span>
              </>
            ) : (
              <>
                {audioError ? (
                  <VolumeX className="w-4 h-4 text-rose-400" />
                ) : (
                  <Music className="w-4 h-4 text-sky-400" />
                )}
                <span>Putar Musik Perapian</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Main Container */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20 space-y-16">
        {/* =========================================================================
            BAGIAN 1: Catatan Suhu Beku & Piagam Titik Nol (The Glacial Log)
        ========================================================================= */}
        <header className="relative p-6 sm:p-10 rounded-2xl border border-sky-400/20 bg-slate-900/60 backdrop-blur-xl shadow-2xl overflow-hidden">
          {/* Decorative Frost Corner Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-sky-400/10 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-amber-400/10 via-transparent to-transparent pointer-events-none" />

          {/* Top Banner & Record ID */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-sky-400/15">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-sky-950/80 border border-sky-400/40 text-sky-400 shadow-inner">
                <ThermometerSnowflake className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-sky-400/80 block">
                  Glacial Disconnection Log
                </span>
                <span className="font-mono text-xs font-semibold text-slate-300">
                  {freezeRecordNo}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-sky-400/20 text-[11px] text-sky-300 font-mono">
              <Snowflake className="w-3.5 h-3.5 text-sky-400 animate-spin" style={{ animationDuration: "12s" }} />
              <span>{frostSeverity}</span>
            </div>
          </div>

          {/* Title & Dramatic Theme Introduction */}
          <div className="py-8 text-center space-y-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-medium tracking-wide bg-amber-500/10 text-amber-300 border border-amber-500/30">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              Winter Solstice Reconciliation
            </span>

            <h1 className="text-3xl sm:text-5xl font-serif font-medium tracking-tight text-white">
              Solstice Thaw
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto font-light leading-relaxed">
              Melelehkan kebekuan jarak yang tercipta karena keangkuhan dan kata-kata tajam, menyulut kembali api perapian hangat di antara kita.
            </p>
          </div>

          {/* Frost Coordinates & Involved Parties */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-sky-400/15 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase tracking-wider mb-1">
                The Soul Left in the Cold
              </span>
              <span className="font-serif text-base font-semibold text-sky-200">
                {recipientName}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase tracking-wider mb-1">
                The Remorseful Hearthkeeper
              </span>
              <span className="font-serif text-base font-semibold text-amber-200">
                {senderName}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase tracking-wider mb-1">
                Coldest Hour & Valley
              </span>
              <span className="text-slate-200 font-medium block truncate" title={String(coldestHour)}>
                {coldestHour}
              </span>
              <span className="text-slate-500 text-[10px] block truncate" title={String(frostLocation)}>
                {frostLocation}
              </span>
            </div>
          </div>

          {/* Solemn Accountability Pledge */}
          <div className="mt-6 p-4 rounded-xl bg-amber-950/20 border border-amber-500/20 text-xs sm:text-sm text-amber-200/90 leading-relaxed flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-amber-300 font-semibold block mb-0.5">
                Pengakuan Tanggung Jawab Moral:
              </strong>
              <p className="italic font-serif">{hearthkeeperPledge}</p>
            </div>
          </div>
        </header>

        {/* =========================================================================
            BAGIAN 2: Surat di Kaca Berembun (The Letter on Frosted Glass)
        ========================================================================= */}
        <section className="relative p-7 sm:p-12 rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] backdrop-blur-2xl shadow-2xl">
          {/* Header of the epistle */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-6 border-b border-white/10">
            <div>
              <span className="text-sky-400/80 text-xs uppercase tracking-widest font-mono block">
                The Frosted Glass Epistle
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-white font-normal mt-1">
                {letterTitle}
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-mono italic">
              {letterDate}
            </span>
          </div>

          {/* The main confession body */}
          <div className="py-8 space-y-5 text-slate-200 font-serif text-base sm:text-lg leading-relaxed whitespace-pre-line">
            {mainMessage}
          </div>

          {/* Letter Signoff */}
          <div className="pt-6 border-t border-white/10 flex flex-col items-end text-right">
            <p className="text-xs sm:text-sm text-slate-400 italic">
              {letterSignoff}
            </p>
            <span className="text-lg sm:text-xl font-serif font-semibold text-amber-300 mt-1">
              {senderName}
            </span>
            <span className="text-[10px] text-sky-400/70 font-mono uppercase tracking-wider mt-0.5">
              Menjaga Api Perapian untuk {recipientName}
            </span>
          </div>
        </section>

        {/* =========================================================================
            BAGIAN 3: 4 Kristal Es Kesalahan (The 4 Crystalized Frosts)
        ========================================================================= */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-sky-400">
              <Snowflake className="w-3.5 h-3.5" />
              The Freezing Points
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-medium text-white">
              4 Kristal Es Pembeku Hubungan
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
              Refleksi jujur atas empat peristiwa dan sikap yang membekukan kehangatan serta dampak luka batin yang kurasakan padamu.
            </p>
          </div>

          {/* Interactive Frost Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 rounded-2xl bg-slate-950/80 border border-slate-800">
            {frosts.map((item, index) => {
              const isActive = activeFrostTab === index;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveFrostTab(index)}
                  className={`p-3 rounded-xl text-left transition-all relative overflow-hidden ${
                    isActive
                      ? "bg-slate-800 text-white shadow-lg border border-sky-400/40"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                    <span className={isActive ? "text-sky-300 font-bold" : "text-slate-500"}>
                      Frost 0{index + 1}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-sky-950 text-sky-400 font-mono">
                      {item.temp}
                    </span>
                  </div>
                  <div className="font-serif text-xs font-medium truncate">
                    {item.title}
                  </div>
                  {isActive && (
                    <div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-400 to-amber-400"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Frost Content Card */}
          <div className="p-6 sm:p-8 rounded-2xl border border-sky-400/20 bg-slate-900/70 backdrop-blur-xl shadow-xl transition-all duration-300">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-sky-950 border border-sky-400/30 text-sky-300">
                  <Wind className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-sky-400 uppercase tracking-wider block">
                    Kristal Es #0{activeFrostTab + 1}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif text-white font-medium">
                    {frosts[activeFrostTab].title}
                  </h3>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-sky-950/80 border border-sky-400/30 text-xs font-mono text-sky-300">
                Suhu: {frosts[activeFrostTab].temp}
              </span>
            </div>

            <div className="mt-6 space-y-5">
              <div>
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-400" />
                  Pengakuan Kesalahan:
                </h4>
                <p className="text-sm sm:text-base text-slate-200 font-serif leading-relaxed pl-4 border-l-2 border-sky-400/40">
                  {frosts[activeFrostTab].confession}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/20">
                <h4 className="text-xs font-semibold text-rose-300 uppercase tracking-wider mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                  Dampak Luka Batin Pada {recipientName}:
                </h4>
                <p className="text-xs sm:text-sm text-rose-200/90 font-light leading-relaxed">
                  {frosts[activeFrostTab].impact}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            BAGIAN 4: 3 Api Perapian Pelebur Es (The 3 Warm Hearthfires)
        ========================================================================= */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-amber-400">
              <Flame className="w-3.5 h-3.5" />
              Hearthfire Commitments
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-medium text-white">
              3 Api Perapian Pelebur Es
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
              Komitmen nyata untuk menyalakan kehangatan yang konsisten agar ruang hati ini tak lagi membeku.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {hearthfires.map((fire) => (
              <div
                key={fire.num}
                className="relative p-6 rounded-2xl border border-amber-400/20 bg-gradient-to-b from-amber-950/30 via-slate-900/60 to-slate-950/80 backdrop-blur-xl shadow-xl flex flex-col justify-between group hover:border-amber-400/40 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-bold text-amber-400/30 group-hover:text-amber-400/60 transition-colors">
                      {fire.num}
                    </span>
                    <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300">
                      <Flame className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-lg font-serif font-semibold text-white mb-1">
                    {fire.title}
                  </h3>
                  <span className="text-[11px] font-mono text-amber-300/80 block mb-3">
                    {fire.subtitle}
                  </span>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light mb-4">
                    {fire.promise}
                  </p>
                </div>

                <div className="pt-4 border-t border-amber-400/15">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-amber-400/90 block mb-1">
                    Tindakan Konkret:
                  </span>
                  <p className="text-xs text-amber-200/90 italic font-serif">
                    &ldquo;{fire.action}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            BAGIAN 5: 4 Tunas Bunga Salju (The 4 Snowdrops Breaking Through)
        ========================================================================= */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-emerald-400">
              <Flower2 className="w-3.5 h-3.5" />
              Signs of Spring
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-medium text-white">
              4 Tunas Bunga Salju yang Menanti
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
              Empat kenangan hangat dan harapan masa depan yang membuktikan bahwa musim semi kita terlalu indah untuk dibiarkan terkubur salju.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {snowdrops.map((drop) => (
              <div
                key={drop.num}
                className="p-6 rounded-2xl border border-emerald-500/20 bg-slate-900/60 backdrop-blur-xl shadow-lg relative overflow-hidden group hover:border-emerald-400/40 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-emerald-950/80 border border-emerald-400/30 text-emerald-400">
                      <Flower2 className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono text-emerald-300 font-bold">
                      Snowdrop {drop.num}
                    </span>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-serif font-semibold text-white mb-2">
                  {drop.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light mb-3">
                  {drop.memory}
                </p>

                <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/15 text-xs text-emerald-200/90 font-serif italic">
                  &ldquo;{drop.meaning}&rdquo;
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            BAGIAN 6: Hembusan Kehangatan Pelebur Es & Ambient Warmth Interaction
        ========================================================================= */}
        <section className="relative p-8 sm:p-12 rounded-3xl border border-amber-400/30 bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-950 backdrop-blur-2xl shadow-2xl text-center space-y-6">
          <div className="inline-flex p-3 rounded-2xl bg-amber-500/10 border border-amber-400/30 text-amber-300 shadow-inner">
            <Sun className={`w-8 h-8 ${isMelting ? "animate-spin text-amber-400" : ""}`} />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h2 className="text-2xl sm:text-3xl font-serif text-white font-medium">
              Lelehkan Es di Antara Kita
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
              Kirimkan hembusan kehangatan untuk melunakkan kebekuan dan menyalakan kembali bara perapian kita.
            </p>
          </div>

          {/* Warmth Progress Gauge */}
          <div className="max-w-md mx-auto space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-sky-400 flex items-center gap-1">
                <Snowflake className="w-3.5 h-3.5" />
                Kebekuan Titik Nol
              </span>
              <span className="text-amber-300 font-bold flex items-center gap-1">
                <Flame className="w-3.5 h-3.5" />
                Kehangatan: {warmthLevel}%
              </span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-950 border border-slate-800 overflow-hidden p-0.5">
              <div
                className="h-full rounded-full transition-all duration-700 bg-gradient-to-r from-sky-400 via-amber-400 to-emerald-400"
                style={{ width: `${warmthLevel}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>Sub-Zero Winter</span>
              <span>Early Thaw</span>
              <span>Full Spring Bloom</span>
            </div>
          </div>

          {/* Interactive Melt Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleMelt}
              disabled={isMelting || warmthLevel >= 100}
              className={`px-8 py-4 rounded-full font-serif text-sm sm:text-base font-medium shadow-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                warmthLevel >= 100
                  ? "bg-emerald-600 text-white cursor-default"
                  : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 hover:scale-105 active:scale-95"
              }`}
            >
              {warmthLevel >= 100 ? (
                <>
                  <Sparkles className="w-5 h-5 text-emerald-200" />
                  <span>Es Telah Meleleh Sempurna Menjadi Musim Semi</span>
                </>
              ) : isMelting ? (
                <>
                  <Flame className="w-5 h-5 animate-bounce text-slate-950" />
                  <span>Menghantarkan Hawa Hangat...</span>
                </>
              ) : (
                <>
                  <Flame className="w-5 h-5" />
                  <span>{meltButtonText}</span>
                </>
              )}
            </button>

            {warmthLevel > 35 && (
              <button
                type="button"
                onClick={handleResetWarmth}
                className="p-3 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs transition-colors"
                title="Kembalikan ke Suhu Semula"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Melt Success Notice */}
          {warmthLevel > 35 && (
            <p className="text-xs sm:text-sm text-amber-300/90 font-serif italic animate-fade-in max-w-md mx-auto">
              &ldquo;{meltSuccessMessage}&rdquo;
            </p>
          )}

          {/* Footer Copyright and Blessing */}
          <div className="pt-8 border-t border-slate-800 text-[11px] text-slate-500 font-mono">
            <span>
              Solstice Thaw • Surat Permohonan Maaf &amp; Rekonsiliasi Tulus untuk {recipientName}
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}

export function SolsticeThawTemplate(props: TemplateComponentProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full flex items-center justify-center bg-[#0a1118] text-sky-200 font-mono text-sm">
          Menghangatkan perapian...
        </div>
      }
    >
      <SolsticeThawInner {...props} />
    </Suspense>
  );
}
