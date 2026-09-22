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
  Flower2,
  ShieldCheck,
  Feather,
  Sun,
  Scroll,
} from "lucide-react";
import type { TemplateComponentProps } from "../renderer";

function SecretHerbariumInner({ data, className = "" }: TemplateComponentProps) {
  const pathname = usePathname();
  const isThumbnail = pathname === "/templates";

  // Data fields with graceful defaults
  const recipientName = (data.recipientName as string) || "Penjaga Bungaku";
  const senderName = (data.senderName as string) || "Sang Botanis";
  const archiveNo = (data.archiveNo as string) || "HB-AMOUR-2024-09";
  const conservatoryWing = (data.conservatoryWing as string) || "Pavilion des Roses & Orangerie";
  const plantingDate = (data.plantingDate as string) || "14 September 2022";
  const certificateTitle = (data.certificateTitle as string) || "Arsip Botani Cinta Abadi";
  const registryNotes =
    (data.registryNotes as string) ||
    "Telah diklasifikasikan sebagai flora cinta perenial yang langka dan berharga, dipelihara dengan ketulusan hati tanpa henti.";

  const salutation = (data.salutation as string) || "Untuk Penjaga Hatiku yang Terindah,";
  const message =
    (data.message as string) ||
    "Pertemuan kita adalah benih kecil yang jatuh di tanah paling subur. Mencintaimu adalah perjalanan merawat akar dan mekar bersama sepanjang musim.";
  const signoff = (data.signoff as string) || "Dengan segenap kehangatan kelopak mekar,";
  const sealInitials = (data.sealInitials as string) || "J & C";

  // 4 Botanical Specimens
  const specimen1 = {
    name: (data.specimen1_name as string) || "Rosa Aeterna",
    common: (data.specimen1_common as string) || "The Awakening Rose",
    floriography: (data.specimen1_floriography as string) || "Kagum yang bersemi perlahan namun mengakar kuat",
    location: (data.specimen1_location as string) || "Kedai Kopi Sudut Kota",
    date: (data.specimen1_date as string) || "14 September 2022",
    story:
      (data.specimen1_story as string) ||
      "Pertama kali matamu menatapku di balik cangkir teh hangat, seluruh kebisingan kota mereda seketika.",
    accent: "from-rose-500/20 to-rose-950/40 border-rose-500/40 text-rose-300",
    flowerIcon: "🌹",
  };

  const specimen2 = {
    name: (data.specimen2_name as string) || "Myosotis Amoris",
    common: (data.specimen2_common as string) || "Forget-Me-Not of Whispers",
    floriography: (data.specimen2_floriography as string) || "Kenangan manis larut malam yang abadi di ingatan",
    location: (data.specimen2_location as string) || "Balkon Apartemen Menatap Lampu Kota",
    date: (data.specimen2_date as string) || "03 Desember 2022",
    story:
      (data.specimen2_story as string) ||
      "Obrolan panjang hingga larut dini hari tentang mimpi dan ketakutan terdalam kita.",
    accent: "from-sky-500/20 to-blue-950/40 border-sky-500/40 text-sky-300",
    flowerIcon: "🪻",
  };

  const specimen3 = {
    name: (data.specimen3_name as string) || "Lavandula Serenitatis",
    common: (data.specimen3_common as string) || "The Calming Lavender",
    floriography: (data.specimen3_floriography as string) || "Ketenangan jiwa dan perlindungan di tengah badai",
    location: (data.specimen3_location as string) || "Perjalanan Pulang Melewati Gerimis",
    date: (data.specimen3_date as string) || "19 Juni 2023",
    story:
      (data.specimen3_story as string) ||
      "Saat dunia terasa terlalu bising dan berat, kehadiranmu adalah aroma lavender yang menenangkan.",
    accent: "from-purple-500/20 to-indigo-950/40 border-purple-500/40 text-purple-300",
    flowerIcon: "🌿",
  };

  const specimen4 = {
    name: (data.specimen4_name as string) || "Jasminum Perpetuum",
    common: (data.specimen4_common as string) || "The Everlasting Jasmine",
    floriography: (data.specimen4_floriography as string) || "Keharuman ketulusan dan komitmen tanpa syarat",
    location: (data.specimen4_location as string) || "Dermaga Tepi Danau di Bawah Bintang",
    date: (data.specimen4_date as string) || "14 Februari 2024",
    story:
      (data.specimen4_story as string) ||
      "Janji sunyi untuk selalu saling memilih dan menjaga kehangatan hingga akhir masa.",
    accent: "from-amber-400/20 to-stone-950/40 border-amber-400/40 text-amber-200",
    flowerIcon: "🌼",
  };

  const specimens = [specimen1, specimen2, specimen3, specimen4];

  // 3 Apothecary Elixirs
  const elixir1 = {
    title: (data.elixir1_title as string) || "Tincture of Midnight Solace",
    aroma: (data.elixir1_aroma as string) || "Chamomile kering, embun fajar, dan pelukan tenang",
    ingredients: (data.elixir1_ingredients as string) || "70% pelukan hening, 30% tatapan teduh penenang cemas",
    effect: (data.elixir1_effect as string) || "Meredakan lelah pikiran dan menghadirkan rasa aman mutlak",
    bottleColor: "border-amber-600/40 bg-gradient-to-b from-amber-950/50 to-stone-950/70",
    glowColor: "text-amber-400",
  };

  const elixir2 = {
    title: (data.elixir2_title as string) || "Cordial of Pure Laughter",
    aroma: (data.elixir2_aroma as string) || "Jeruk bergamot segar, mentari sore, dan pastry hangat",
    ingredients: (data.elixir2_ingredients as string) || "Gurauan spontan yang absurd, tawa terpingkal-pingkal",
    effect: (data.elixir2_effect as string) || "Seketika menerangi hari-hari kelabu dengan sukacita menular",
    bottleColor: "border-emerald-600/40 bg-gradient-to-b from-emerald-950/50 to-stone-950/70",
    glowColor: "text-emerald-400",
  };

  const elixir3 = {
    title: (data.elixir3_title as string) || "Essence of Unwavering Devotion",
    aroma: (data.elixir3_aroma as string) || "Kayu cendana hangat, getah pinus perenial, dan melati suci",
    ingredients: (data.elixir3_ingredients as string) || "Kejujuran tanpa topeng, kesabaran melewati badai",
    effect: (data.elixir3_effect as string) || "Membentuk perlindungan abadi dan memperdalam akar kasih",
    bottleColor: "border-rose-600/40 bg-gradient-to-b from-rose-950/50 to-stone-950/70",
    glowColor: "text-rose-400",
  };

  const elixirs = [elixir1, elixir2, elixir3];

  // 4 Vows
  const vow1 = {
    title: (data.vow1_title as string) || "Nurturing the Roots (Merawat Akar)",
    desc:
      (data.vow1_desc as string) ||
      "Aku berjanji merawat fondasi kejujuran dan rasa saling percaya kita setiap hari.",
  };
  const vow2 = {
    title: (data.vow2_title as string) || "Pruning the Doubts (Memangkas Keraguan)",
    desc:
      (data.vow2_desc as string) ||
      "Aku berjanji segera memangkas praduga buruk lewat dialog lembut dan ketulusan hati.",
  };
  const vow3 = {
    title: (data.vow3_title as string) || "Sheltering the Bloom (Melindungi Mekar)",
    desc:
      (data.vow3_desc as string) ||
      "Aku berjanji menjadi atap kaca yang kokoh di tengah terpaan hujan deras dan embun beku.",
  };
  const vow4 = {
    title: (data.vow4_title as string) || "Perennial Bloom (Mekar Abadi)",
    desc:
      (data.vow4_desc as string) ||
      "Aku berjanji terus memilihmu, jatuh cinta lagi dan lagi melintasi setiap musim kehidupan.",
  };

  const vows = [vow1, vow2, vow3, vow4];

  // Audio & Interactive Dewdrop
  const audioUrl = (data.audioUrl as string) || "";
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [dewdropCount, setDewdropCount] = useState(74);
  const [hasWatered, setHasWatered] = useState(false);
  const [selectedSpecimen, setSelectedSpecimen] = useState<number>(0);

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

  const handleWaterTerrarium = () => {
    if (!hasWatered) {
      setDewdropCount((prev) => prev + 1);
      setHasWatered(true);
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
      className={`min-h-screen relative overflow-hidden font-serif selection:bg-emerald-900 selection:text-emerald-100 ${className}`}
      style={{
        backgroundColor: "#0d1b14",
        color: "#ede7dd",
      }}
    >
      {/* Background Victorian Glasshouse Grid & Foliage Silhouettes */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 20%, rgba(197, 155, 88, 0.15) 0%, transparent 60%),
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 48px 48px, 48px 48px",
        }}
      />

      {/* Subtle Floating Embers / Pollen Dust */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-1/4 left-1/5 w-72 h-72 rounded-full bg-emerald-700/10 blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-amber-600/10 blur-3xl animate-pulse"
          style={{ animationDuration: "6s" }}
        />
      </div>

      {/* Floating Audio Player (Isolated for Full Page Only) */}
      {!isThumbnail && audioUrl && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#12241b]/90 backdrop-blur-md border border-amber-500/30 px-4 py-2.5 rounded-full shadow-2xl shadow-emerald-950/80 text-amber-200">
          <audio ref={audioRef} src={audioUrl} loop preload="none" />
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause audio" : "Play audio"}
            className="flex items-center gap-2 text-xs font-sans tracking-widest uppercase hover:text-amber-100 transition-colors"
          >
            {isPlaying ? (
              <span className="flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5 animate-spin text-amber-400" />
                <span>Pause Harp</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-amber-400/80" />
                <span>Play Harp</span>
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
        {/* SECTION 1: GLASSHOUSE HERBARIUM REGISTRY & CERTIFICATE                    */}
        {/* ========================================================================= */}
        <header className="relative">
          {/* Victorian Conservatory Arch Top Frame */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-emerald-950/40 text-amber-300 text-xs tracking-widest uppercase mb-4">
              <Flower2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Royal Botanical Conservatory • Herbarium d&apos;Amour</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-amber-100">
              {certificateTitle}
            </h1>
            <p className="mt-2 text-emerald-300/70 text-sm tracking-wider uppercase font-sans">
              Conservatory Archive Registry & Specimen Collection
            </p>
          </div>

          {/* Certificate Board */}
          <div className="relative p-6 sm:p-10 rounded-2xl bg-gradient-to-b from-[#182f24] to-[#101e17] border border-amber-500/40 shadow-2xl shadow-emerald-950/90 overflow-hidden">
            {/* Corner Brass Ornaments */}
            <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-amber-400/50" />
            <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-amber-400/50" />
            <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-amber-400/50" />
            <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-amber-400/50" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Left Details */}
              <div className="space-y-4 text-sm font-sans">
                <div className="flex items-center justify-between border-b border-emerald-800/40 pb-2">
                  <span className="text-emerald-400/70 uppercase text-xs tracking-wider">Archive Identifier</span>
                  <span className="font-mono text-amber-300 font-semibold tracking-wider">{archiveNo}</span>
                </div>
                <div className="flex items-center justify-between border-b border-emerald-800/40 pb-2">
                  <span className="text-emerald-400/70 uppercase text-xs tracking-wider">Conservatory Wing</span>
                  <span className="text-amber-100 font-serif italic text-right">{conservatoryWing}</span>
                </div>
                <div className="flex items-center justify-between border-b border-emerald-800/40 pb-2">
                  <span className="text-emerald-400/70 uppercase text-xs tracking-wider">Keeper of the Flora</span>
                  <span className="text-amber-200 font-medium">{recipientName}</span>
                </div>
                <div className="flex items-center justify-between border-b border-emerald-800/40 pb-2">
                  <span className="text-emerald-400/70 uppercase text-xs tracking-wider">Botanist Curator</span>
                  <span className="text-amber-200 font-medium">{senderName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-emerald-400/70 uppercase text-xs tracking-wider">First Planting Date</span>
                  <span className="text-emerald-200">{plantingDate}</span>
                </div>
              </div>

              {/* Right Seal & Statement */}
              <div className="flex flex-col items-center justify-center p-5 rounded-xl bg-black/30 border border-emerald-800/30 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-600 via-amber-700 to-amber-900 flex items-center justify-center border-2 border-amber-300/60 shadow-lg shadow-amber-900/40 mb-3">
                  <span className="font-serif font-bold text-amber-100 text-lg tracking-wider">
                    {sealInitials}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-amber-400/90 text-xs uppercase tracking-widest font-sans mb-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Officially Documented</span>
                </div>
                <p className="text-xs text-emerald-200/80 italic font-serif leading-relaxed">
                  &ldquo;{registryNotes}&rdquo;
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* SECTION 2: THE BOTANIST'S EPISTOLARY (SURAT UTAMA)                         */}
        {/* ========================================================================= */}
        <section className="relative">
          <div className="flex items-center gap-3 mb-6">
            <Scroll className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-light tracking-wide text-amber-100">
              The Botanist&apos;s Epistolary
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-amber-500/40 via-emerald-800/40 to-transparent" />
          </div>

          {/* Seeded Handmade Parchment Paper Effect */}
          <div
            className="relative p-8 sm:p-12 md:p-14 rounded-2xl shadow-2xl border border-amber-600/30 text-stone-900 overflow-hidden"
            style={{
              backgroundColor: "#faf6ee",
              backgroundImage: `
                radial-gradient(circle at 10% 10%, rgba(163, 140, 96, 0.06) 0%, transparent 40%),
                radial-gradient(circle at 90% 85%, rgba(45, 74, 62, 0.05) 0%, transparent 40%)
              `,
            }}
          >
            {/* Vintage Deckle Edge & Botanical Emboss Header */}
            <div className="flex items-center justify-between border-b border-stone-300/80 pb-4 mb-8">
              <div className="flex items-center gap-2 text-stone-600 text-xs uppercase tracking-widest font-sans">
                <Feather className="w-4 h-4 text-emerald-800" />
                <span>Handwritten Dispatch • Specimen Log #01</span>
              </div>
              <div className="text-xs font-mono text-stone-500">{plantingDate}</div>
            </div>

            {/* Salutation */}
            <h3 className="text-lg sm:text-xl font-medium text-emerald-950 mb-6 font-serif italic">
              {salutation}
            </h3>

            {/* Letter Body */}
            <div className="space-y-4 text-stone-800 text-base sm:text-lg leading-relaxed font-serif whitespace-pre-line text-justify">
              {message}
            </div>

            {/* Signoff & Seal */}
            <div className="mt-10 pt-6 border-t border-stone-300/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <p className="text-stone-600 italic text-sm">{signoff}</p>
                <p className="text-stone-950 font-semibold text-lg mt-1 font-serif">{senderName}</p>
              </div>

              {/* Wax Botanical Seal */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-800 via-red-900 to-rose-950 border-2 border-red-700/50 shadow-md flex items-center justify-center text-amber-200 text-sm font-serif font-bold">
                  {sealInitials}
                </div>
                <div className="text-xs font-sans text-stone-500 tracking-wider uppercase">
                  Verified Botanical Seal
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: HERBARIUM SPECIMEN FOLIO (4 LEMBAR SPESIMEN BUNGA KERING)       */}
        {/* ========================================================================= */}
        <section className="relative">
          <div className="flex items-center gap-3 mb-4">
            <Flower2 className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-light tracking-wide text-amber-100">
              Herbarium Specimen Folio
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-amber-500/40 via-emerald-800/40 to-transparent" />
          </div>
          <p className="text-emerald-300/70 text-sm mb-8 font-sans">
            Koleksi 4 spesimen bunga pres bersejarah yang mengabadikan bahasa rahasia cinta (*floriography*).
          </p>

          {/* Specimen Navigation Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {specimens.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedSpecimen(idx)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedSpecimen === idx
                    ? "bg-amber-500/20 border-amber-400 text-amber-100 shadow-lg shadow-amber-950/40 scale-[1.02]"
                    : "bg-[#14261d]/60 border-emerald-800/40 text-emerald-300/70 hover:border-emerald-600/50 hover:text-emerald-100"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-lg">{item.flowerIcon}</span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400/80">
                    Plate #{idx + 1}
                  </span>
                </div>
                <div className="font-serif italic text-sm font-semibold truncate">{item.name}</div>
                <div className="text-[11px] font-sans truncate text-emerald-400/60">{item.common}</div>
              </button>
            ))}
          </div>

          {/* Active Specimen Card */}
          {specimens[selectedSpecimen] && (
            <div className="relative p-6 sm:p-10 rounded-2xl bg-gradient-to-b from-[#162a20] to-[#0f1d16] border border-amber-500/40 shadow-2xl">
              {/* Herbarium Mounting Tape Visuals */}
              <div className="absolute top-4 left-8 w-14 h-4 bg-amber-200/20 rotate-[-4deg] border border-amber-300/30 rounded-sm" />
              <div className="absolute top-4 right-8 w-14 h-4 bg-amber-200/20 rotate-[3deg] border border-amber-300/30 rounded-sm" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                {/* Specimen Badge & Icon */}
                <div className="flex flex-col items-center justify-center p-8 rounded-xl bg-black/40 border border-amber-500/20 text-center">
                  <div className="text-6xl mb-4 transform hover:scale-110 transition-transform">
                    {specimens[selectedSpecimen].flowerIcon}
                  </div>
                  <div className="font-serif italic text-xl text-amber-200 mb-1">
                    {specimens[selectedSpecimen].name}
                  </div>
                  <div className="text-xs font-sans tracking-widest uppercase text-emerald-400/80 mb-4">
                    {specimens[selectedSpecimen].common}
                  </div>
                  <div className="w-full pt-3 border-t border-emerald-800/40 text-[11px] font-mono text-emerald-300/60 space-y-1">
                    <div>DATE: {specimens[selectedSpecimen].date}</div>
                    <div className="truncate">LOC: {specimens[selectedSpecimen].location}</div>
                  </div>
                </div>

                {/* Floriography & Narrative */}
                <div className="md:col-span-2 space-y-5">
                  <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-700/30">
                    <span className="text-xs uppercase tracking-wider font-sans text-amber-400 block mb-1">
                      Floriography • Bahasa Rahasia Bunga
                    </span>
                    <p className="text-base sm:text-lg font-serif italic text-amber-100">
                      &ldquo;{specimens[selectedSpecimen].floriography}&rdquo;
                    </p>
                  </div>

                  <div>
                    <span className="text-xs uppercase tracking-wider font-sans text-emerald-400/80 block mb-2">
                      Catatan Herbisida Kenangan
                    </span>
                    <p className="text-sm sm:text-base text-emerald-100/90 leading-relaxed font-serif">
                      {specimens[selectedSpecimen].story}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-sans text-amber-300/80 pt-2 border-t border-emerald-800/30">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Diawetkan dengan cermat di bawah perlindungan rumah kaca abadi.</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: THE APOTHECARY OF AFFECTION (3 RAMUAN ELIXIR HERBAL)            */}
        {/* ========================================================================= */}
        <section className="relative">
          <div className="flex items-center gap-3 mb-4">
            <Droplets className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-light tracking-wide text-amber-100">
              The Apothecary of Affection
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-amber-500/40 via-emerald-800/40 to-transparent" />
          </div>
          <p className="text-emerald-300/70 text-sm mb-8 font-sans">
            Tiga botol ramuan cinta herbal khas apoteker antik, diramu untuk menyembuhkan resah dan menghangatkan jiwa.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {elixirs.map((elixir, idx) => (
              <div
                key={idx}
                className={`relative p-6 rounded-2xl border ${elixir.bottleColor} shadow-xl flex flex-col justify-between hover:scale-[1.02] transition-transform`}
              >
                {/* Bottle Cap & Neck Visual */}
                <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-amber-700/60 border border-amber-400/40" />
                    <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300/80">
                      Vial 0{idx + 1}
                    </span>
                  </div>
                  <span className="text-xs">🧪</span>
                </div>

                {/* Title */}
                <div className="mb-4">
                  <h3 className={`text-lg font-serif font-medium ${elixir.glowColor} mb-1`}>
                    {elixir.title}
                  </h3>
                </div>

                {/* Details */}
                <div className="space-y-3 text-xs font-sans text-emerald-200/90 leading-relaxed">
                  <div>
                    <span className="text-emerald-400/60 uppercase text-[10px] tracking-wider block">
                      Catatan Aroma
                    </span>
                    <span className="font-serif italic text-emerald-100">{elixir.aroma}</span>
                  </div>

                  <div>
                    <span className="text-emerald-400/60 uppercase text-[10px] tracking-wider block">
                      Komposisi Bahan
                    </span>
                    <span>{elixir.ingredients}</span>
                  </div>

                  <div className="pt-2 border-t border-white/10">
                    <span className="text-amber-400/80 uppercase text-[10px] tracking-wider block mb-0.5">
                      Khasiat untuk Jiwa
                    </span>
                    <span className="font-serif italic text-amber-100/90">{elixir.effect}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 5: THE 4 PERENNIAL GARDEN VOWS (4 IKRAR PEMELIHARA KEBUN)          */}
        {/* ========================================================================= */}
        <section className="relative">
          <div className="flex items-center gap-3 mb-4">
            <Sun className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-light tracking-wide text-amber-100">
              The Perennial Garden Vows
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-amber-500/40 via-emerald-800/40 to-transparent" />
          </div>
          <p className="text-emerald-300/70 text-sm mb-8 font-sans">
            Empat ikrar cinta yang dirumuskan selayaknya komitmen suci seorang pemelihara kebun botani abadi.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {vows.map((vow, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-gradient-to-b from-[#15281e] to-[#0f1d16] border border-amber-500/30 shadow-lg hover:border-amber-400/50 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-300 font-mono text-xs">
                    {idx + 1}
                  </div>
                  <h3 className="font-serif font-medium text-amber-100 text-base">{vow.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-emerald-200/80 font-serif leading-relaxed italic pl-10">
                  &ldquo;{vow.desc}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 6: INTERACTIVE TERRARIUM DEWDROP & CLOSING                         */}
        {/* ========================================================================= */}
        <footer className="relative text-center pt-8 pb-12 border-t border-amber-500/30">
          <div className="max-w-md mx-auto p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#172e22] to-[#101f17] border border-emerald-600/40 shadow-2xl">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-2xl animate-bounce">
              🌱
            </div>
            <h3 className="text-xl font-light text-amber-100 mb-2">Siram Terarium Abadi</h3>
            <p className="text-xs text-emerald-300/80 font-sans mb-6">
              Beri setetes embun kasih untuk memastikan kuncup bunga cinta kita selalu segar dan mekar abadi.
            </p>

            <div className="flex flex-col items-center gap-3">
              <button
                onClick={handleWaterTerrarium}
                disabled={hasWatered}
                className={`px-6 py-3 rounded-full font-sans text-xs uppercase tracking-widest font-semibold flex items-center gap-2 transition-all ${
                  hasWatered
                    ? "bg-emerald-800/50 border border-emerald-600 text-emerald-300 cursor-default"
                    : "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 shadow-lg shadow-amber-950/60 scale-100 hover:scale-105 active:scale-95"
                }`}
              >
                <Droplets className="w-4 h-4" />
                <span>{hasWatered ? "Embun Telah Diberikan ✨" : "Beri Setetes Embun Kasih"}</span>
              </button>

              <div className="text-xs font-mono text-amber-400/80 mt-1">
                Total Embun Terkumpul: <span className="font-bold text-amber-200">{dewdropCount}</span> Tetes
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-center gap-2 text-xs font-sans text-emerald-400/60 tracking-widest uppercase">
            <div className="flex items-center gap-2">
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/40" />
              <span>Dipersiapkan Khusus untuk {recipientName}</span>
            </div>
            <span>Oleh {senderName} • Conservatory of Eternal Devotion</span>
          </div>
        </footer>
      </main>
    </div>
  );
}

export function SecretHerbariumTemplate(props: TemplateComponentProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0d1b14] flex items-center justify-center text-emerald-300 text-sm font-serif">
          Membuka Pintu Rumah Kaca Botani...
        </div>
      }
    >
      <SecretHerbariumInner {...props} />
    </Suspense>
  );
}
