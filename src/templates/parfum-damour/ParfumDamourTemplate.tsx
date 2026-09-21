"use client";

import { Suspense, useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  Volume2,
  VolumeX,
  Music,
  Heart,
  Droplets,
  Clock,
  Wind,
  Flower,
  Flame,
  Award,
  Crown,
  RotateCcw,
} from "lucide-react";
import type { TemplateComponentProps } from "../renderer";

function ParfumDamourInner({ data, className = "" }: TemplateComponentProps) {
  const pathname = usePathname();
  const isThumbnail = pathname === "/templates";

  // State
  const [activeNoteTab, setActiveNoteTab] = useState<"top" | "heart" | "base">("top");
  const [spritzCount, setSpritzCount] = useState<number>(3);
  const [isSpritzing, setIsSpritzing] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioError, setAudioError] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Destructure content with safe fallbacks
  const {
    recipientName = "Aurelia Genevieve",
    senderName = "Julian de Valois",
    flaconBatchNo = "N°07-AMOUR-ETERNEL",
    perfumeName = "L'Éternel Rendez-Vous",
    perfumeConcentration = "Extrait de Parfum • 100% Pure Devotion",
    formulationDate = "Malam Saat Jiwa Ini Terpikat Selamanya",
    atelierLocation = "Atelier de Lettera • Place Vendôme, Paris",
    dedicationQuote = "Untuk jiwa yang kehadirannya adalah wewangian terindah yang pernah dihirup oleh semesta.",
    letterTitle = "Formulasi Rahasia di Balik Setiap Detak Jantungku",
    letterDate = "Paris, Di Bawah Cahaya Rembulan & Semerbak Melati",
    mainMessage = "Aurelia yang teramat kucintai,\n\nMereka berkata bahwa penciuman adalah pintu memori manusia yang paling murni dan tak terbantahkan...",
    letterSignoff = "Dengan seluruh aroma rindu yang tak pernah pudar,",
    topNote1Name = "Bergamot of First Glimpse",
    topNote1Desc = "Kesegaran debaran pertama saat mata kita bersitatap.",
    topNote2Name = "Sparkling Pear of Sweet Laughter",
    topNote2Desc = "Manisnya tawa renyahmu yang selalu mencairkan segala gundah duniaku.",
    topNote3Name = "Pink Pepper of Electric Touch",
    topNote3Desc = "Percikan kehangatan elektrik saat jemari kita pertama kali bertaut erat.",
    heartNote1Name = "Damask Rose of Vulnerable Whispers",
    heartNote1Desc = "Mekarnya kejujuran saat kita saling menceritakan kerapuhan hati.",
    heartNote2Name = "Midnight Jasmine of Safe Embraces",
    heartNote2Desc = "Ketenangan semerbak saat kepalamu bersandar nyaman di bahuku.",
    heartNote3Name = "French Lavender of Peaceful Solace",
    heartNote3Desc = "Rasa damai tak terkatakan saat mengetahui bahwa rumah sejatiku adalah dirimu.",
    baseNote1Name = "Warm Amber of Unshakable Devotion",
    baseNote1Desc = "Bara kesetiaan yang mengakar kuat di palung jiwaku, tak pernah pudar oleh waktu.",
    baseNote2Name = "Cedarwood of Shared Future Dreams",
    baseNote2Desc = "Kekokohan pilar mimpi rumah tangga dan masa depan yang kita bangun berdampingan.",
    baseNote3Name = "Tahitian Vanilla of Sweet Forever",
    baseNote3Desc = "Manisnya janji untuk terus menua bersama hingga hela napas terakhir.",
    vial1Title = "Rainy Wool & Warm Coffee",
    vial1Season = "Autumn Evening • Senja Pertama di Bawah Payung",
    vial1Memory = "Saat kita berdesakan di bawah satu payung kecil di tengah rintik hujan kota...",
    vial1ScentNotes = "Petrichor, Steamed Milk, Espresso & Wool",
    vial2Title = "Sunlit Linen & Morning Whispers",
    vial2Season = "Sunday Dawn • Keheningan Pagi Tanpa Tergesa",
    vial2Memory = "Cahaya matahari pagi yang menerobos tirai tipis, menyinari rambutmu yang terurai...",
    vial2ScentNotes = "White Tea, Crisp Cotton, Chamomile & Honey",
    vial3Title = "Midnight Ocean Breeze & Starlight",
    vial3Season = "Midsummer Night • Liburan Pertama ke Pesisir",
    vial3Memory = "Duduk di dermaga kayu sambil mencelupkan kaki ke air laut yang sejuk...",
    vial3ScentNotes = "Sea Salt, Driftwood, Coastal Sage & Night Sky",
    vial4Title = "Sweet Brioche & Twilight Stroll",
    vial4Season = "Spring Dusk • Menyusuri Lorong Kota Berdua",
    vial4Memory = "Berjalan bergandengan tangan tanpa tujuan jelas, mencium aroma toko kue...",
    vial4ScentNotes = "Golden Brioche, Vanilla Bean, Roasted Almond & Sugar",
    sillageRating = "Enormous • Jejak kehangatanmu memenuhi setiap sudut relung jiwaku",
    longevityRating = "Eternal • Bertahan melampaui usia dan waktu",
    seasonality = "All Seasons • Mekar di musim semi, menghangatkan di musim dingin",
    signatureAccord = "Pure Irreplaceable Love • Cinta Sejati yang Tak Tergantikan",
    spritzButtonText = "Semprotkan Parfum Cinta",
    spritzSuccessMessage = "Kabut wewangian emas merebak... memenuhi semesta dengan aroma kasihmu.",
  } = data;

  const primaryColor = String(data.primaryColor || "#e6c587");
  const secondaryColor = String(data.secondaryColor || "#d47a88");
  const accentColor = String(data.accentColor || "#f59e0b");
  const musicTrack = data.musicTrack ? String(data.musicTrack) : undefined;

  const topNotes = [
    { name: topNote1Name, desc: topNote1Desc },
    { name: topNote2Name, desc: topNote2Desc },
    { name: topNote3Name, desc: topNote3Desc },
  ];

  const heartNotes = [
    { name: heartNote1Name, desc: heartNote1Desc },
    { name: heartNote2Name, desc: heartNote2Desc },
    { name: heartNote3Name, desc: heartNote3Desc },
  ];

  const baseNotes = [
    { name: baseNote1Name, desc: baseNote1Desc },
    { name: baseNote2Name, desc: baseNote2Desc },
    { name: baseNote3Name, desc: baseNote3Desc },
  ];

  const vials = [
    {
      num: "N° I",
      title: vial1Title,
      season: vial1Season,
      memory: vial1Memory,
      notes: vial1ScentNotes,
    },
    {
      num: "N° II",
      title: vial2Title,
      season: vial2Season,
      memory: vial2Memory,
      notes: vial2ScentNotes,
    },
    {
      num: "N° III",
      title: vial3Title,
      season: vial3Season,
      memory: vial3Memory,
      notes: vial3ScentNotes,
    },
    {
      num: "N° IV",
      title: vial4Title,
      season: vial4Season,
      memory: vial4Memory,
      notes: vial4ScentNotes,
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

  // Spritz handler
  const handleSpritz = () => {
    setIsSpritzing(true);
    setSpritzCount((prev) => prev + 1);
    setTimeout(() => {
      setIsSpritzing(false);
    }, 1400);
  };

  return (
    <div
      className={`min-h-screen w-full relative overflow-hidden bg-[#0d070b] text-[#f5eedf] font-sans selection:bg-[#e6c587]/30 selection:text-[#fcedcd] ${className}`}
      style={
        {
          "--primary-color": primaryColor,
          "--secondary-color": secondaryColor,
          "--accent-color": accentColor,
        } as React.CSSProperties
      }
    >
      {/* Background Atmosphere: French Gilded Noir & Subtle Golden Mist */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Deep Parisian Noir Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#12070f] via-[#0d070b] to-[#180914]" />

        {/* Champagne gold ambient glow */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[550px] rounded-full blur-[160px] opacity-15 pointer-events-none"
          style={{ backgroundColor: primaryColor }}
        />

        {/* Dusty Rose Glow */}
        <div
          className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-[650px] h-[450px] rounded-full blur-[140px] opacity-10 pointer-events-none"
          style={{ backgroundColor: secondaryColor }}
        />

        {/* Fine Parisian Vintage Grid Ornament */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(230,197,135,0.07)_1px,transparent_1px)] bg-[size:32px_32px] opacity-70" />
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
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#1e0e18]/90 hover:bg-[#281320] text-[#e6c587] border border-[#e6c587]/40 backdrop-blur-md shadow-2xl text-xs font-medium transition-all hover:scale-105 active:scale-95"
            title={isPlayingAudio ? "Jeda Melodi Paris" : "Putar Melodi Paris"}
          >
            {isPlayingAudio ? (
              <>
                <Volume2 className="w-4 h-4 text-[#e6c587] animate-pulse" />
                <span className="font-serif italic">Paris Romance Waltz Playing</span>
              </>
            ) : (
              <>
                {audioError ? (
                  <VolumeX className="w-4 h-4 text-rose-400" />
                ) : (
                  <Music className="w-4 h-4 text-[#e6c587]" />
                )}
                <span className="font-serif">Putar Melodi Paris</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Main Container */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20 space-y-16">
        {/* =========================================================================
            BAGIAN 1: Etiket Botol Flacon Kristal (The Flacon Master Certificate)
        ========================================================================= */}
        <header className="relative p-7 sm:p-12 rounded-3xl border border-[#e6c587]/30 bg-[#160a12]/80 backdrop-blur-xl shadow-2xl overflow-hidden text-center">
          {/* Ornate Gold Filigree Corners */}
          <div className="absolute top-3 left-3 w-10 h-10 border-t-2 border-l-2 border-[#e6c587]/50 rounded-tl-lg pointer-events-none" />
          <div className="absolute top-3 right-3 w-10 h-10 border-t-2 border-r-2 border-[#e6c587]/50 rounded-tr-lg pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-10 h-10 border-b-2 border-l-2 border-[#e6c587]/50 rounded-bl-lg pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-10 h-10 border-b-2 border-r-2 border-[#e6c587]/50 rounded-br-lg pointer-events-none" />

          {/* Top Brand & Batch Tag */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#e6c587]/20">
            <div className="flex items-center gap-2.5 text-left">
              <div className="p-2 rounded-lg bg-[#25101e] border border-[#e6c587]/40 text-[#e6c587]">
                <Crown className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-serif tracking-[0.2em] text-[#e6c587]/80 block">
                  Maison de Lettera • Paris
                </span>
                <span className="font-mono text-xs text-[#f5eedf] font-semibold">
                  {flaconBatchNo}
                </span>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#25101e] border border-[#e6c587]/30 text-[11px] font-serif text-[#e6c587]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{perfumeConcentration}</span>
            </div>
          </div>

          {/* Perfume Grand Name & Subtitle */}
          <div className="py-8 space-y-4">
            <span className="text-xs uppercase tracking-[0.3em] font-serif text-[#e6c587]/80 block">
              Bespoke Extrait de Parfum
            </span>
            <h1 className="text-4xl sm:text-6xl font-serif font-normal tracking-tight text-[#fdfbf7] italic">
              {perfumeName}
            </h1>
            <p className="text-xs sm:text-sm text-[#e6c587]/90 font-serif italic max-w-lg mx-auto leading-relaxed">
              &ldquo;{dedicationQuote}&rdquo;
            </p>
          </div>

          {/* Parties & Formulation Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#e6c587]/20 text-xs">
            <div className="p-4 rounded-xl bg-[#1d0c18] border border-[#e6c587]/20">
              <span className="text-[#e6c587]/70 block text-[10px] uppercase tracking-wider font-serif mb-1">
                The Ineffable Muse
              </span>
              <span className="font-serif text-lg font-medium text-[#fdfbf7] block">
                {recipientName}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#1d0c18] border border-[#e6c587]/20">
              <span className="text-[#e6c587]/70 block text-[10px] uppercase tracking-wider font-serif mb-1">
                The Master Perfumer
              </span>
              <span className="font-serif text-lg font-medium text-[#e6c587] block">
                {senderName}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[#1d0c18] border border-[#e6c587]/20 text-left sm:text-center">
              <span className="text-[#e6c587]/70 block text-[10px] uppercase tracking-wider font-serif mb-1">
                Formulation Atelier
              </span>
              <span className="text-xs font-serif text-[#f5eedf] block truncate" title={String(atelierLocation)}>
                {atelierLocation}
              </span>
              <span className="text-[10px] text-[#e6c587]/60 block truncate mt-0.5" title={String(formulationDate)}>
                {formulationDate}
              </span>
            </div>
          </div>
        </header>

        {/* =========================================================================
            BAGIAN 2: Jurnal Rahasia Perfumer (The Perfumer's Private Journal)
        ========================================================================= */}
        <section className="relative p-8 sm:p-12 rounded-3xl border border-[#e6c587]/30 bg-[#fdfbf7] text-[#2c1d11] shadow-2xl">
          {/* Subtle watermark / seal in background */}
          <div className="absolute top-8 right-8 opacity-10 pointer-events-none text-[#9c7d42]">
            <Award className="w-32 h-32" />
          </div>

          {/* Letter header */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-6 border-b border-[#9c7d42]/30">
            <div>
              <span className="text-[10px] uppercase font-serif tracking-[0.25em] text-[#9c7d42] block">
                Livre des Formules Secrètes • Journal Intime
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#1e1208] font-normal mt-1">
                {letterTitle}
              </h2>
            </div>
            <span className="text-xs text-[#70583b] font-serif italic">
              {letterDate}
            </span>
          </div>

          {/* Letter message */}
          <div className="py-8 space-y-5 text-[#2c1d11] font-serif text-base sm:text-lg leading-relaxed whitespace-pre-line">
            {mainMessage}
          </div>

          {/* Signoff */}
          <div className="pt-6 border-t border-[#9c7d42]/30 flex flex-col items-end text-right">
            <p className="text-xs sm:text-sm text-[#70583b] font-serif italic">
              {letterSignoff}
            </p>
            <span className="text-xl sm:text-2xl font-serif text-[#9c7d42] italic font-semibold mt-1">
              {senderName}
            </span>
            <span className="text-[10px] text-[#9c7d42]/80 uppercase tracking-widest font-mono mt-0.5">
              Parfumeur Dévoué pour {recipientName}
            </span>
          </div>
        </section>

        {/* =========================================================================
            BAGIAN 3: Piramida Aroma 3 Tingkat (The Olfactory Pyramid)
        ========================================================================= */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-serif uppercase tracking-[0.25em] text-[#e6c587]">
              <Droplets className="w-3.5 h-3.5" />
              La Pyramide Olfactive
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-normal text-white">
              Piramida Aroma Cinta Kita
            </h2>
            <p className="text-xs sm:text-sm text-[#e6c587]/80 max-w-md mx-auto font-serif italic">
              Tiga tingkatan wewangian rasa yang tercium dari saat pertama mata kita bertaut hingga keabadian jiwa.
            </p>
          </div>

          {/* Note Tab Switchers */}
          <div className="grid grid-cols-3 gap-2 p-1.5 rounded-2xl bg-[#1a0c16] border border-[#e6c587]/20">
            <button
              type="button"
              onClick={() => setActiveNoteTab("top")}
              className={`py-3 px-2 rounded-xl text-center transition-all ${
                activeNoteTab === "top"
                  ? "bg-[#2d1526] text-[#e6c587] border border-[#e6c587]/50 shadow-lg font-semibold"
                  : "text-[#f5eedf]/60 hover:text-[#f5eedf] hover:bg-[#200e1b]"
              }`}
            >
              <span className="text-[10px] uppercase tracking-wider block font-mono">15 Menit Awal</span>
              <span className="font-serif text-xs sm:text-sm">Top Notes (Aroma Pembuka)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveNoteTab("heart")}
              className={`py-3 px-2 rounded-xl text-center transition-all ${
                activeNoteTab === "heart"
                  ? "bg-[#2d1526] text-[#e6c587] border border-[#e6c587]/50 shadow-lg font-semibold"
                  : "text-[#f5eedf]/60 hover:text-[#f5eedf] hover:bg-[#200e1b]"
              }`}
            >
              <span className="text-[10px] uppercase tracking-wider block font-mono">Inti Gelora</span>
              <span className="font-serif text-xs sm:text-sm">Heart Notes (Aroma Inti)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveNoteTab("base")}
              className={`py-3 px-2 rounded-xl text-center transition-all ${
                activeNoteTab === "base"
                  ? "bg-[#2d1526] text-[#e6c587] border border-[#e6c587]/50 shadow-lg font-semibold"
                  : "text-[#f5eedf]/60 hover:text-[#f5eedf] hover:bg-[#200e1b]"
              }`}
            >
              <span className="text-[10px] uppercase tracking-wider block font-mono">Fondasi Abadi</span>
              <span className="font-serif text-xs sm:text-sm">Base Notes (Aroma Dasar)</span>
            </button>
          </div>

          {/* Active Note Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(activeNoteTab === "top"
              ? topNotes
              : activeNoteTab === "heart"
              ? heartNotes
              : baseNotes
            ).map((note, index) => (
              <div
                key={note.name}
                className="p-6 rounded-2xl border border-[#e6c587]/20 bg-[#1a0a15]/80 backdrop-blur-xl shadow-lg relative overflow-hidden group hover:border-[#e6c587]/50 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif text-xs uppercase tracking-widest text-[#e6c587]/70">
                    Accord N°0{index + 1}
                  </span>
                  <div className="p-2 rounded-lg bg-[#271020] border border-[#e6c587]/30 text-[#e6c587]">
                    {activeNoteTab === "top" ? (
                      <Wind className="w-4 h-4" />
                    ) : activeNoteTab === "heart" ? (
                      <Flower className="w-4 h-4" />
                    ) : (
                      <Flame className="w-4 h-4" />
                    )}
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-serif font-medium text-[#fdfbf7] mb-2">
                  {note.name}
                </h3>

                <p className="text-xs sm:text-sm text-[#f5eedf]/80 leading-relaxed font-serif italic">
                  &ldquo;{note.desc}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            BAGIAN 4: 4 Botol Kenangan Aroma (The 4 Olfactory Snapshots)
        ========================================================================= */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-serif uppercase tracking-[0.25em] text-[#d47a88]">
              <Heart className="w-3.5 h-3.5" />
              Les Flacons de Mémoire
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-normal text-white">
              4 Botol Kenangan Aroma Berharga
            </h2>
            <p className="text-xs sm:text-sm text-[#e6c587]/80 max-w-md mx-auto font-serif italic">
              Setiap momen indah bersamamu memiliki aroma khas yang terkunci abadi di dalam ingatan jiwaku.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {vials.map((vial) => (
              <div
                key={vial.num}
                className="p-6 rounded-2xl border border-[#e6c587]/20 bg-[#180914]/80 backdrop-blur-xl shadow-xl flex flex-col justify-between group hover:border-[#e6c587]/40 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-[#e6c587] font-semibold">
                      {vial.num}
                    </span>
                    <span className="text-[10px] font-serif italic text-[#d47a88] bg-[#29101f] px-2.5 py-0.5 rounded-full border border-[#d47a88]/30">
                      {vial.season}
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-medium text-[#fdfbf7] mb-2">
                    {vial.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#f5eedf]/85 leading-relaxed font-serif mb-4">
                    {vial.memory}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#e6c587]/15">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#e6c587]/70 block mb-0.5">
                    Scent Accords:
                  </span>
                  <p className="text-xs text-[#e6c587] font-serif italic">
                    {vial.notes}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            BAGIAN 5: Karakteristik & Metrik Daya Tahan (Olfactory Specifications)
        ========================================================================= */}
        <section className="p-6 sm:p-10 rounded-2xl border border-[#e6c587]/30 bg-[#160812]/90 backdrop-blur-xl shadow-xl space-y-6">
          <div className="text-center space-y-1">
            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#e6c587]/80">
              Spécifications de la Création
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-normal text-white">
              Karakteristik &amp; Daya Tahan Racikan
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#220d1c] border border-[#e6c587]/20 flex items-start gap-3">
              <Wind className="w-5 h-5 text-[#e6c587] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#e6c587] block font-serif uppercase tracking-wider text-[11px] mb-0.5">
                  Sillage (Jejak Keharuman Jiwa):
                </strong>
                <p className="text-[#f5eedf]/90 font-serif italic">{sillageRating}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#220d1c] border border-[#e6c587]/20 flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#e6c587] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#e6c587] block font-serif uppercase tracking-wider text-[11px] mb-0.5">
                  Longevity (Daya Tahan Cinta):
                </strong>
                <p className="text-[#f5eedf]/90 font-serif italic">{longevityRating}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#220d1c] border border-[#e6c587]/20 flex items-start gap-3">
              <Flower className="w-5 h-5 text-[#d47a88] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#d47a88] block font-serif uppercase tracking-wider text-[11px] mb-0.5">
                  Kesesuaian Musim:
                </strong>
                <p className="text-[#f5eedf]/90 font-serif italic">{seasonality}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#220d1c] border border-[#e6c587]/20 flex items-start gap-3">
              <Heart className="w-5 h-5 text-[#d47a88] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#d47a88] block font-serif uppercase tracking-wider text-[11px] mb-0.5">
                  Signature Accord:
                </strong>
                <p className="text-[#f5eedf]/90 font-serif italic">{signatureAccord}</p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            BAGIAN 6: Interactive Atomizer Spritz & Paris Romance Interaction
        ========================================================================= */}
        <section className="relative p-8 sm:p-14 rounded-3xl border border-[#e6c587]/40 bg-gradient-to-b from-[#1e0a19] via-[#150711] to-[#0f040b] backdrop-blur-2xl shadow-2xl text-center space-y-6">
          <div className="inline-flex p-3.5 rounded-2xl bg-[#2c1024] border border-[#e6c587]/40 text-[#e6c587] shadow-inner">
            <Sparkles className={`w-8 h-8 ${isSpritzing ? "animate-spin text-amber-300" : ""}`} />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h2 className="text-2xl sm:text-3xl font-serif text-[#fdfbf7] italic font-normal">
              Semprotkan Keharuman Kasih
            </h2>
            <p className="text-xs sm:text-sm text-[#e6c587]/80 font-serif italic leading-relaxed">
              Sentuh botol atomizer untuk menyebarkan kabut emas aroma cinta yang abadi ke seluruh semesta.
            </p>
          </div>

          {/* Spritz Count Indicator */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#270e20] border border-[#e6c587]/30 text-xs font-serif text-[#e6c587]">
            <Droplets className="w-3.5 h-3.5 text-[#e6c587]" />
            <span>
              {spritzCount} Semprotan Cinta Dihantarkan untuk {recipientName}
            </span>
          </div>

          {/* Interactive Spritz Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleSpritz}
              disabled={isSpritzing}
              className="px-8 py-4 rounded-full font-serif text-sm sm:text-base font-medium shadow-2xl transition-all duration-300 flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#e6c587] via-[#d4af37] to-[#e6c587] text-[#1e0d08] hover:scale-105 active:scale-95 hover:shadow-[#e6c587]/20 hover:shadow-lg"
            >
              {isSpritzing ? (
                <>
                  <Sparkles className="w-5 h-5 animate-bounce text-[#1e0d08]" />
                  <span>Menyemprotkan Kabut Emas Wewangian...</span>
                </>
              ) : (
                <>
                  <Droplets className="w-5 h-5" />
                  <span>{spritzButtonText}</span>
                </>
              )}
            </button>

            {spritzCount > 3 && (
              <button
                type="button"
                onClick={() => setSpritzCount(3)}
                className="p-3 rounded-full bg-[#240e1e] hover:bg-[#32132a] text-[#e6c587]/70 hover:text-[#e6c587] text-xs transition-colors"
                title="Reset Jumlah Semprotan"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Success Spritz Notice */}
          {spritzCount > 3 && (
            <p className="text-xs sm:text-sm text-[#e6c587] font-serif italic animate-fade-in max-w-md mx-auto">
              &ldquo;{spritzSuccessMessage}&rdquo;
            </p>
          )}

          {/* Footer Copyright and Blessing */}
          <div className="pt-8 border-t border-[#e6c587]/20 text-[11px] text-[#e6c587]/60 font-serif">
            <span>
              L&apos;Atelier des Parfums • Mahakarya Cinta Abadi untuk {recipientName} &bull; Place Vendôme, Paris
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}

export function ParfumDamourTemplate(props: TemplateComponentProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full flex items-center justify-center bg-[#0d070b] text-[#e6c587] font-serif text-sm">
          Meramu wewangian cinta...
        </div>
      }
    >
      <ParfumDamourInner {...props} />
    </Suspense>
  );
}
