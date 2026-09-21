"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import { usePathname } from "next/navigation";
import type { TemplateComponentProps } from "../renderer";
import {
  Sparkles,
  Volume2,
  VolumeX,
  Gem,
  Award,
  ShieldCheck,
  CheckCircle,
  Eye,
} from "lucide-react";

// Fallback high-res aesthetic photos so the template is never without imagery
const DEFAULT_MUSE_PHOTO =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80";
const DEFAULT_LOCKET_PHOTO =
  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80";
const DEFAULT_ATELIER_PHOTO =
  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80";

function HauteJoaillerieTemplateContent({
  data,
  className = "",
}: TemplateComponentProps) {
  const pathname = usePathname();
  const isThumbnail = pathname === "/templates";

  // State: Interactive 4 Gemstones tabs
  const [activeGemIndex, setActiveGemIndex] = useState<number>(0);

  // State: Secret velvet drawer opened/closed
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // State: Audio playing
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audioEl = audioRef.current;
    return () => {
      if (audioEl) {
        audioEl.pause();
      }
    };
  }, []);

  const toggleAudio = () => {
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

  // Extract content with defaults
  const jewelTitle =
    (data.jewelTitle as string) || "LE SOLITAIRE D'ÉTERNITÉ N°07";
  const maisonName =
    (data.maisonName as string) ||
    "MAISON DE HAUTE JOAILLERIE • PLACE VENDÔME, PARIS";
  const caratGrade =
    (data.caratGrade as string) || "8.88 CARATS • D-FLAWLESS ROYAL SOLITAIRE";
  const recipientName =
    (data.recipientName as string) || "Lady Aurelia de Montmirail";
  const senderName = (data.senderName as string) || "Henri de Valois";
  const anniversaryDate =
    (data.anniversaryDate as string) || "21 Septembre 2026";
  const openingDedication =
    (data.openingDedication as string) ||
    "Bagi jiwaku yang paling murni: di hadapan semesta yang fana, kupersembahkan kotak beludru ini bukan sekadar sebagai wadah batu mulia, melainkan tempat bersemayamnya seluruh detak kagumku padamu sejak detik pertama kita bersitatap.";

  // Images with guaranteed fallbacks so it is never monotonous
  const museJewelPhotoUrl =
    (data.museJewelPhotoUrl as string)?.trim() || DEFAULT_MUSE_PHOTO;
  const musePhotoCaption =
    (data.musePhotoCaption as string) ||
    "Potret Sang Muse Berbalut Kilau Tiara & Permata Keabadian";

  const locketMomentsPhotoUrl =
    (data.locketMomentsPhotoUrl as string)?.trim() || DEFAULT_LOCKET_PHOTO;
  const locketPhotoCaption =
    (data.locketPhotoCaption as string) ||
    "Detik Sakral yang Terpatri di Dalam Liontin Emas 18 Karat";

  const atelierPhotoUrl =
    (data.atelierPhotoUrl as string)?.trim() || DEFAULT_ATELIER_PHOTO;
  const atelierPhotoCaption =
    (data.atelierPhotoCaption as string) ||
    "Meja Kerja Sang Pandai Emas • Place Vendôme Paris";

  const primaryColor = (data.primaryColor as string) || "#0a1128";
  const accentColor = (data.accentColor as string) || "#d4af37";

  // Section 2: 4Cs
  const certificateNo =
    (data.certificateNo as string) || "GIA-VENDOME-889922-AMOUR";
  const cutGrade =
    (data.cutGrade as string) || "Cœur Brillant Parfait (Potongan Hati Nirwana)";
  const cutDescription =
    (data.cutDescription as string) ||
    "Tiap sudut faset 58 segi memantulkan kembali seluruh cahaya tatapan matamu menjadi ribuan spektrum pelangi di dadaku, tanpa ada setitik pun sinar yang terbuang sia-sia.";
  const clarityGrade =
    (data.clarityGrade as string) ||
    "Internally Flawless (IF - Kemurnian Nir-Cacat)";
  const clarityDescription =
    (data.clarityDescription as string) ||
    "Diperiksa di bawah mikroskop ketulusan 100x pembesaran waktu, tak ditemukan sebutir inklusi keraguan ataupun bayang-bayang kepalsuan dalam sumpah setiaku padamu.";
  const colorGrade =
    (data.colorGrade as string) || "Grade D - Absolute Pure White Soul";
  const colorDescription =
    (data.colorDescription as string) ||
    "Tingkat kemurnian tertinggi di mana tiada prasangka duniawi yang mampu menodai warna putih salju ketulusan jiwamu.";
  const caratWeight =
    (data.caratWeight as string) || "Poids Infini (∞ Carats - Tak Terhingga)";
  const caratDescription =
    (data.caratDescription as string) ||
    "Bobot cinta yang melampaui timbangan neraca gravitasi semesta, mengikat dua jiwa dalam medan magnet kerinduan yang tak akan pernah pudar.";
  const fluorescenceGrade =
    (data.fluorescenceGrade as string) ||
    "Strong Blue Luminescence under Midnight Sky • Excellent Symmetry";

  // Section 3: 4 Gemstones
  const gems = [
    {
      name:
        (data.gem1Name as string) ||
        "Émeraude de Colombie (Zamrud Harapan & Pertemuan Awal)",
      colorHex: (data.gem1ColorHex as string) || "#059669",
      period:
        (data.gem1Period as string) ||
        "Musim Semi 2022 • Hari Pertama Mata Saling Bersitatap",
      poem:
        (data.gem1Poem as string) ||
        "Hijau zamrud di taman Tuileries tak sebanding dengan segarnya binar matamu saat pertama kali menyapaku. Di sanalah benih cinta pertama bertunas, tenang dan penuh pengharapan.",
      icon: "Emerald",
      subtitle: "Batu Permata Fase Pertama",
    },
    {
      name:
        (data.gem2Name as string) ||
        "Saphir Royal de Ceylan (Safir Keteduhan & Kesetiaan Hening)",
      colorHex: (data.gem2ColorHex as string) || "#1d4ed8",
      period:
        (data.gem2Period as string) ||
        "Malam-Malam Panjang • Samudra Kesabaran & Dekapan Tenang",
      poem:
        (data.gem2Poem as string) ||
        "Biru safir terdalam menyimpan rahasia kita. Di saat badai dunia di luar bergemuruh kencang, dekapanmu adalah samudra hening yang selalu menjadi pelabuhan paling damai bagi jiwaku.",
      icon: "Sapphire",
      subtitle: "Batu Permata Fase Kedua",
    },
    {
      name:
        (data.gem3Name as string) ||
        "Rubis Sang-de-Pigeon (Mirah Delima Gairah & Pengorbanan)",
      colorHex: (data.gem3ColorHex as string) || "#b91c1c",
      period:
        (data.gem3Period as string) ||
        "Tahun Ketiga • Ujian Nyala Api & Janji Tak Tergoyahkan",
      poem:
        (data.gem3Poem as string) ||
        "Ditempa dalam panas bara magma bumi, merah delima ini adalah darah cintaku yang menyala. Bukan cinta yang rapuh oleh cobaan, melainkan gairah yang kian mengkristal suci saat diuji.",
      icon: "Ruby",
      subtitle: "Batu Permata Fase Ketiga",
    },
    {
      name:
        (data.gem4Name as string) ||
        "Diamant Éternel (Intan Abadi Mahkota Ikrar Jiwa)",
      colorHex: (data.gem4ColorHex as string) || "#e0e7ff",
      period:
        (data.gem4Period as string) ||
        "Hari Ini & Selamanya • Lingkaran Mahkota Tak Berujung",
      poem:
        (data.gem4Poem as string) ||
        "Kristal murni terkeras di semesta alam: tiada palu waktu yang mampu meretakkan perjanjian suci antara kita berdua. Menjadi mahkota abadi yang menerangi setiap langkah masa depan kita.",
      icon: "Diamond",
      subtitle: "Batu Permata Fase Keempat",
    },
  ];

  // Section 4: Goldsmith & Locket
  const goldsmithNarration =
    (data.goldsmithNarration as string) ||
    "Kekasihku yang kucintai melampaui kata-kata,\n\nDi balik dinding atelier tua di Place Vendôme, setiap malam aku duduk di depan obor api kecil dan kikir baja halus. Menghabiskan ribuan jam bukan untuk sekadar mengasah logam dingin, melainkan merenungkan setiap senyum, tawa, dan tetes air mata bahagia yang telah kita lewati bersama.\n\nEmas murni membutuhkan suhu ribuan derajat untuk melepaskan segala kotorannya; begitu pula cinta kita yang telah disucikan oleh waktu dan kesabaran tanpa batas. Menempa cincin dan liontin ini adalah caraku mengunci keabadian di pergelangan tangan dan lehermu, agar ke mana pun engkau melangkah, engkau selalu dikelilingi oleh perlindungan dan kehangatan seluruh jiwaku.\n\nEngkau adalah mahakarya terindah yang pernah diciptakan Tuhan di semesta ini, dan aku bersumpah akan merawatmu dengan penuh kelembutan, sebagaimana seorang pandai perhiasan menjaga permata paling langka di kerajaannya.";
  const goldsmithAxiom =
    (data.goldsmithAxiom as string) ||
    "« L'or s'épure au feu, et l'amour véritable s'illumine à travers les épreuves du temps. »";

  // Section 5: Mohs scale
  const preciousMetal =
    (data.preciousMetal as string) || "Platine Pur 950 & Or Rose 18K Hand-Forged";
  const mohsHardness =
    (data.mohsHardness as string) ||
    "10.0 / 10.0 Mohs Scale (Indestructible Diamond Standard)";
  const refractiveIndex =
    (data.refractiveIndex as string) ||
    "2.42 RI (Membias Segenap Cahaya Semesta Menjadi Keindahan)";
  const masterHallmark =
    (data.masterHallmark as string) ||
    "Poinçon Tête d'Aigle & Losange du Maître Orfèvre";
  const alchemicalPledge =
    (data.alchemicalPledge as string) ||
    "Kami berikrar di hadapan keabadian bahwa cinta ini tak akan pernah teroksidasi oleh keraguan duniawi, tak akan luntur oleh debu usia, dan akan tetap berpijar menyilaukan hingga akhir zaman.";

  // Section 6: Secret Drawer & Ring
  const ringInscription =
    (data.ringInscription as string) ||
    "Semper Adeste In Corde Meo • Selamanya Bersemayam di Dadaku";
  const secretVowMessage =
    (data.secretVowMessage as string) ||
    "Wahai belahan jiwaku,\n\nJika suatu hari engkau merasa lelah atau dunia terasa terlalu bising, bukalah laci kecil ini dan sentuhlah cincin ini. Ingatlah bahwa di sudut bumi mana pun aku berada, ada satu hati yang telah berjanji untuk selalu pulang kepadamu, melindungimu, dan mencintaimu tanpa syarat apa pun. Engkaulah permata mahkota terindah dalam seluruh hidupku.";
  const signatureTitle =
    (data.signatureTitle as string) || "Maître Joaillier de Ton Cœur • Paris";
  const musicTitle =
    (data.musicTitle as string) ||
    "Gabriel Fauré: Pavane Op. 50 (Romantic Harp & Strings)";
  const audioUrl =
    (data.audioUrl as string) ||
    "https://cdn.freesound.org/previews/612/612089_5674468-lq.mp3";

  return (
    <div
      className={`min-h-screen text-amber-50 font-serif selection:bg-amber-500/30 selection:text-amber-100 relative overflow-hidden ${className}`}
      style={{
        backgroundColor: primaryColor,
        backgroundImage: `radial-gradient(ellipse at 50% 0%, ${accentColor}25 0%, transparent 65%), radial-gradient(ellipse at 50% 100%, ${accentColor}18 0%, transparent 70%), linear-gradient(180deg, ${primaryColor} 0%, #060a17 100%)`,
      }}
    >
      {/* Background Micro Facet Diamond Grid Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(#d4af37 1px, transparent 1px), linear-gradient(to right, #d4af37 1px, transparent 1px), linear-gradient(to bottom, #d4af37 1px, transparent 1px)`,
          backgroundSize: "40px 40px, 80px 80px, 80px 80px",
        }}
      />

      {/* Floating Audio Bar (Only in live view) */}
      {!isThumbnail && audioUrl && (
        <div className="fixed bottom-6 right-6 z-50">
          <audio ref={audioRef} src={audioUrl} loop preload="none" />
          <button
            onClick={toggleAudio}
            aria-label={isPlaying ? "Pause audio" : "Play audio"}
            className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#0a1128]/90 hover:bg-[#121c3b] border border-amber-500/40 text-amber-300 shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer"
          >
            <div className="relative">
              {isPlaying ? (
                <div className="flex items-center gap-0.5">
                  <span className="w-1 h-3 bg-amber-400 animate-pulse" />
                  <span className="w-1 h-4 bg-amber-300 animate-pulse delay-75" />
                  <span className="w-1 h-2 bg-amber-400 animate-pulse delay-150" />
                </div>
              ) : (
                <VolumeX className="w-4 h-4 text-amber-400/70" />
              )}
            </div>
            <div className="text-left">
              <p className="text-[10px] tracking-widest text-amber-400/70 uppercase font-sans font-medium">
                Alunan Harpa
              </p>
              <p className="text-xs text-amber-100 font-serif truncate max-w-[140px]">
                {musicTitle}
              </p>
            </div>
            {isPlaying ? (
              <Volume2 className="w-4 h-4 text-amber-300 ml-1" />
            ) : null}
          </button>
        </div>
      )}

      {/* Main Container */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-20">
        {/* ========================================================= */}
        {/* SECTION 1: KOTAK BELUDRU UTAMA & POTRET INTAN SANG MUSE  */}
        {/* ========================================================= */}
        <section className="relative rounded-2xl p-6 sm:p-12 border border-amber-500/30 bg-gradient-to-b from-[#0f1a3a]/80 via-[#0a1128]/95 to-[#060a17]/90 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-md text-center">
          {/* Top Silk Ribbon Accent */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-amber-400/60" />
            <div className="p-2 rounded-full border border-amber-400/40 bg-amber-500/10 text-amber-300 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
              <Gem className="w-5 h-5 animate-pulse" />
            </div>
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-amber-400/60" />
          </div>

          <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-amber-300/80 font-sans font-semibold mb-2">
            {maisonName}
          </p>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-400 mb-3">
            {jewelTitle}
          </h1>

          <p className="text-xs sm:text-sm tracking-widest text-amber-400/90 font-mono uppercase mb-8">
            ✦ {caratGrade} ✦
          </p>

          {/* DEDICATION NAMES & DATE */}
          <div className="max-w-xl mx-auto py-4 px-6 rounded-xl border border-amber-500/20 bg-amber-500/5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm font-sans">
            <div className="text-center sm:text-left">
              <span className="text-[11px] uppercase tracking-wider text-amber-400/60 block">
                Penerima (La Muse)
              </span>
              <strong className="text-amber-100 font-serif text-base">
                {recipientName}
              </strong>
            </div>
            <div className="h-px w-12 sm:h-8 sm:w-px bg-amber-500/30" />
            <div className="text-center sm:text-center">
              <span className="text-[11px] uppercase tracking-wider text-amber-400/60 block">
                Tanggal Sakral
              </span>
              <span className="text-amber-300 font-mono text-xs">
                {anniversaryDate}
              </span>
            </div>
            <div className="h-px w-12 sm:h-8 sm:w-px bg-amber-500/30" />
            <div className="text-center sm:text-right">
              <span className="text-[11px] uppercase tracking-wider text-amber-400/60 block">
                Sang Pandai Emas
              </span>
              <strong className="text-amber-100 font-serif text-base">
                {senderName}
              </strong>
            </div>
          </div>

          {/* IMAGE 1: PORTRAIT IN DIAMOND HALO OVAL FRAME */}
          <div className="my-8 flex flex-col items-center">
            <div className="relative group">
              {/* Outer Gilded Halo Ring */}
              <div className="absolute -inset-3 rounded-full bg-gradient-to-tr from-amber-500/30 via-yellow-200/20 to-amber-600/40 blur-sm group-hover:blur-md transition-all duration-700 opacity-80" />
              
              {/* Diamond Facets Frame */}
              <div className="relative w-52 h-64 sm:w-64 sm:h-80 rounded-[50%] p-2 border-2 border-amber-400/60 shadow-[0_0_30px_rgba(212,175,55,0.35)] bg-gradient-to-b from-[#1a274e] via-[#0d162f] to-[#080d1e] overflow-hidden flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={museJewelPhotoUrl}
                  alt={musePhotoCaption}
                  className="w-full h-full object-cover rounded-[50%] filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                {/* Gilded Inner Reflection Shimmer */}
                <div className="absolute inset-0 rounded-[50%] pointer-events-none border border-amber-300/30 bg-gradient-to-t from-black/40 via-transparent to-white/10" />
                
                {/* 4 Corner Diamond Sparkles */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 text-amber-300">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                </div>
              </div>
            </div>
            <p className="mt-4 text-xs italic tracking-wider text-amber-300/70 font-sans max-w-md">
              {musePhotoCaption}
            </p>
          </div>

          {/* Opening Dedication Paragraph */}
          <div className="max-w-2xl mx-auto mt-6 text-sm sm:text-base leading-relaxed text-amber-100/90 italic font-serif">
            &ldquo;{openingDedication}&rdquo;
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 2: SERTIFIKAT GEMOLOGI ASMARA (THE 4Cs OF LOVE)   */}
        {/* ========================================================= */}
        <section className="relative rounded-2xl p-6 sm:p-10 border border-amber-500/40 bg-[#0d1633]/90 shadow-2xl backdrop-blur-md">
          {/* Certificate Header Badge */}
          <div className="flex flex-col sm:flex-row items-center justify-between border-b border-amber-500/30 pb-6 mb-8 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-lg border border-amber-400/50 bg-amber-400/10 text-amber-300">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-amber-400/70 block">
                  Laboratoire Gemmologique d&apos;Amour
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-amber-100">
                  Sertifikat Gemologi Keabadian
                </h2>
              </div>
            </div>
            <div className="text-right sm:text-right">
              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400/70 block">
                No. Registrasi Resmi
              </span>
              <span className="font-mono text-xs sm:text-sm text-amber-300 font-bold bg-amber-500/10 px-3 py-1 rounded border border-amber-500/30">
                {certificateNo}
              </span>
            </div>
          </div>

          {/* The 4Cs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. CUT */}
            <div className="p-5 rounded-xl border border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-transparent relative overflow-hidden group hover:border-amber-400/40 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase font-sans font-bold tracking-wider text-amber-400">
                  1. Cut (Faset & Proporsi)
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-200 border border-amber-500/30">
                  58 Facets
                </span>
              </div>
              <h3 className="text-base font-semibold text-amber-100 mb-2 font-serif">
                {cutGrade}
              </h3>
              <p className="text-xs sm:text-sm text-amber-200/70 leading-relaxed font-sans">
                {cutDescription}
              </p>
            </div>

            {/* 2. CLARITY */}
            <div className="p-5 rounded-xl border border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-transparent relative overflow-hidden group hover:border-amber-400/40 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase font-sans font-bold tracking-wider text-amber-400">
                  2. Clarity (Kejernihan Jiwa)
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-200 border border-amber-500/30">
                  100x Magnification
                </span>
              </div>
              <h3 className="text-base font-semibold text-amber-100 mb-2 font-serif">
                {clarityGrade}
              </h3>
              <p className="text-xs sm:text-sm text-amber-200/70 leading-relaxed font-sans">
                {clarityDescription}
              </p>
            </div>

            {/* 3. COLOR */}
            <div className="p-5 rounded-xl border border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-transparent relative overflow-hidden group hover:border-amber-400/40 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase font-sans font-bold tracking-wider text-amber-400">
                  3. Color (Derajat Kemurnian)
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-200 border border-amber-500/30">
                  Grade D • Purest
                </span>
              </div>
              <h3 className="text-base font-semibold text-amber-100 mb-2 font-serif">
                {colorGrade}
              </h3>
              <p className="text-xs sm:text-sm text-amber-200/70 leading-relaxed font-sans">
                {colorDescription}
              </p>
            </div>

            {/* 4. CARAT */}
            <div className="p-5 rounded-xl border border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-transparent relative overflow-hidden group hover:border-amber-400/40 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase font-sans font-bold tracking-wider text-amber-400">
                  4. Carat (Bobot Gravitasi Kasih)
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-200 border border-amber-500/30">
                  ∞ Infinity
                </span>
              </div>
              <h3 className="text-base font-semibold text-amber-100 mb-2 font-serif">
                {caratWeight}
              </h3>
              <p className="text-xs sm:text-sm text-amber-200/70 leading-relaxed font-sans">
                {caratDescription}
              </p>
            </div>
          </div>

          {/* Bottom Security Hologram Footer */}
          <div className="mt-8 pt-4 border-t border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-amber-400/70 font-sans">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Sertifikasi Teruji: {fluorescenceGrade}</span>
            </div>
            <div className="text-amber-300/80 font-mono">
              ✦ SCEAU DE L&apos;ORFEVRE VENDÔME ✦
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 3: 4 PERMATA KISAH ASMARA INTERAKTIF              */}
        {/* ========================================================= */}
        <section className="relative rounded-2xl p-6 sm:p-10 border border-amber-500/30 bg-[#0c142c]/90 shadow-2xl backdrop-blur-md">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs uppercase tracking-[0.3em] text-amber-400/80 font-sans block mb-1">
              Les 4 Gemmes Sacrées
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-amber-100 font-serif">
              4 Batu Mulia Jejak Kisah Asmara
            </h2>
            <p className="text-xs sm:text-sm text-amber-200/70 mt-2 font-sans">
              Ketuk faset batu permata di bawah ini untuk melihat refleksi cahaya dan bait puitis di setiap fase perjalanan cinta kita.
            </p>
          </div>

          {/* Interactive Gemstone Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {gems.map((gem, idx) => {
              const isSelected = activeGemIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveGemIndex(idx)}
                  className={`p-4 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between h-28 cursor-pointer ${
                    isSelected
                      ? "border-amber-400 bg-amber-500/15 shadow-[0_0_20px_rgba(212,175,55,0.25)] scale-[1.02]"
                      : "border-amber-500/20 bg-[#080d1f]/60 hover:border-amber-400/40 hover:bg-amber-500/5 opacity-80 hover:opacity-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="w-3 h-3 rounded-full shadow-[0_0_8px_currentColor]"
                      style={{
                        backgroundColor: gem.colorHex,
                        color: gem.colorHex,
                      }}
                    />
                    <span className="text-[10px] font-mono text-amber-400/60">
                      0{idx + 1}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-amber-400/80 font-sans block uppercase">
                      {gem.subtitle}
                    </span>
                    <strong className="text-xs text-amber-100 font-serif line-clamp-1">
                      {gem.name.split("(")[0]}
                    </strong>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Gemstone Deep Display Card */}
          <div
            className="p-6 sm:p-8 rounded-xl border border-amber-400/40 bg-gradient-to-b from-[#111c3d] to-[#0a1128] relative overflow-hidden transition-all duration-500"
            style={{
              boxShadow: `0 0 35px ${gems[activeGemIndex].colorHex}25`,
            }}
          >
            {/* Ambient Gemstone Glow */}
            <div
              className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-40 transition-colors duration-500"
              style={{ backgroundColor: gems[activeGemIndex].colorHex }}
            />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-500/20 pb-4 mb-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-amber-400/80 block">
                  {gems[activeGemIndex].period}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-amber-100 font-serif mt-1">
                  {gems[activeGemIndex].name}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300">
                  Faset Refraksi: {gems[activeGemIndex].colorHex}
                </span>
              </div>
            </div>

            <p className="text-sm sm:text-base leading-relaxed text-amber-100/90 italic font-serif mt-4">
              &ldquo;{gems[activeGemIndex].poem}&rdquo;
            </p>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 4: LIONTIN FILIGREE EMAS & NARASI PENEMPAAN       */}
        {/* ========================================================= */}
        <section className="relative rounded-2xl p-6 sm:p-10 border border-amber-500/30 bg-[#0c132b]/90 shadow-2xl backdrop-blur-md">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-[0.3em] text-amber-400/80 font-sans block mb-1">
              L&apos;Orfèvrerie & Souvenirs
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-amber-100 font-serif">
              Liontin Filigree Emas & Meja Kerja Sang Pandai Emas
            </h2>
          </div>

          {/* 2 IMAGES SIDE BY SIDE (OR STACKED ON MOBILE) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* IMAGE 2: LOCKET MOMENTS PHOTO */}
            <div className="flex flex-col items-center text-center">
              <div className="relative group w-full max-w-xs">
                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-yellow-300/10 blur group-hover:blur-md transition-all duration-500" />
                <div className="relative h-64 sm:h-72 w-full rounded-2xl p-2.5 border-2 border-amber-400/50 bg-[#142044] shadow-xl overflow-hidden flex flex-col justify-between">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={locketMomentsPhotoUrl}
                    alt={locketPhotoCaption}
                    className="w-full h-full object-cover rounded-xl filter brightness-95 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-2.5 rounded-xl pointer-events-none border border-amber-300/20" />
                </div>
              </div>
              <p className="mt-3 text-xs text-amber-300/80 font-sans italic max-w-xs">
                {locketPhotoCaption}
              </p>
            </div>

            {/* IMAGE 3: ATELIER WORKBENCH PHOTO */}
            <div className="flex flex-col items-center text-center">
              <div className="relative group w-full max-w-xs">
                <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-yellow-300/10 blur group-hover:blur-md transition-all duration-500" />
                <div className="relative h-64 sm:h-72 w-full rounded-2xl p-2.5 border-2 border-amber-400/50 bg-[#142044] shadow-xl overflow-hidden flex flex-col justify-between">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={atelierPhotoUrl}
                    alt={atelierPhotoCaption}
                    className="w-full h-full object-cover rounded-xl filter brightness-95 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-2.5 rounded-xl pointer-events-none border border-amber-300/20" />
                </div>
              </div>
              <p className="mt-3 text-xs text-amber-300/80 font-sans italic max-w-xs">
                {atelierPhotoCaption}
              </p>
            </div>
          </div>

          {/* Goldsmith Narrative Letter */}
          <div className="p-6 sm:p-8 rounded-xl border border-amber-500/20 bg-amber-500/5 text-amber-100/90 leading-relaxed font-serif text-sm sm:text-base space-y-4 whitespace-pre-line">
            {goldsmithNarration}
          </div>

          {/* Goldsmith Axiom Quote Banner */}
          <div className="mt-6 text-center py-4 px-6 rounded-xl border border-amber-400/30 bg-gradient-to-r from-transparent via-amber-500/10 to-transparent">
            <p className="text-xs sm:text-sm italic font-serif text-amber-300">
              {goldsmithAxiom}
            </p>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 5: KARAT KEMURNIAN & SKALA KETAHANAN MOHS SCALE   */}
        {/* ========================================================= */}
        <section className="relative rounded-2xl p-6 sm:p-10 border border-amber-500/30 bg-[#091024]/90 shadow-2xl backdrop-blur-md">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs uppercase tracking-[0.3em] text-amber-400/80 font-sans block mb-1">
              Métallurgie & Dureté
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-amber-100 font-serif">
              Karat Kemurnian & Ketahanan Tak Tergoyahkan
            </h2>
          </div>

          {/* 4 Technical Gemological Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-xl border border-amber-500/20 bg-[#0f1b3b]/60">
              <span className="text-[11px] font-sans uppercase tracking-wider text-amber-400/70 block">
                Paduan Logam Mulia
              </span>
              <strong className="text-sm sm:text-base text-amber-100 font-serif block mt-1">
                {preciousMetal}
              </strong>
            </div>

            <div className="p-4 rounded-xl border border-amber-500/20 bg-[#0f1b3b]/60">
              <span className="text-[11px] font-sans uppercase tracking-wider text-amber-400/70 block">
                Skala Ketahanan Hati
              </span>
              <strong className="text-sm sm:text-base text-amber-100 font-serif block mt-1">
                {mohsHardness}
              </strong>
            </div>

            <div className="p-4 rounded-xl border border-amber-500/20 bg-[#0f1b3b]/60">
              <span className="text-[11px] font-sans uppercase tracking-wider text-amber-400/70 block">
                Indeks Bias Refraksi
              </span>
              <strong className="text-sm sm:text-base text-amber-100 font-serif block mt-1">
                {refractiveIndex}
              </strong>
            </div>

            <div className="p-4 rounded-xl border border-amber-500/20 bg-[#0f1b3b]/60">
              <span className="text-[11px] font-sans uppercase tracking-wider text-amber-400/70 block">
                Cap Stempel Resmi (Hallmark)
              </span>
              <strong className="text-sm sm:text-base text-amber-100 font-serif block mt-1">
                {masterHallmark}
              </strong>
            </div>
          </div>

          {/* Alchemical Covenant Box */}
          <div className="p-5 rounded-xl border border-amber-500/30 bg-amber-500/5 text-center">
            <p className="text-xs sm:text-sm text-amber-200/90 font-serif italic">
              &ldquo;{alchemicalPledge}&rdquo;
            </p>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 6: LACI RAHASIA KOTAK BELUDRU & UKIRAN CINCIN     */}
        {/* ========================================================= */}
        <section className="relative rounded-2xl p-6 sm:p-12 border-2 border-amber-400/40 bg-gradient-to-b from-[#111d3f] via-[#0b1329] to-[#060914] shadow-[0_25px_60px_rgba(0,0,0,0.8)] text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-12 bg-amber-400/50" />
            <span className="text-xs uppercase tracking-[0.35em] text-amber-300 font-sans font-semibold">
              Le Secret du Tiroir en Velours
            </span>
            <span className="h-px w-12 bg-amber-400/50" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-bold text-amber-100 font-serif mb-3">
            Laci Rahasia & Ukiran Cincin Abadi
          </h2>

          <p className="text-xs sm:text-sm text-amber-200/70 font-sans max-w-lg mx-auto mb-8">
            Kotak beludru ini memiliki laci tersembunyi yang terkunci oleh rasa percaya. Sentuh tombol di bawah untuk membuka laci rahasia dan melihat ukiran suci di lingkar dalam cincin.
          </p>

          {/* INTERACTIVE BUTTON: TOGGLE DRAWER */}
          <button
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-xl font-serif text-sm sm:text-base font-semibold text-amber-950 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 hover:from-amber-200 hover:to-amber-300 shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Eye className="w-5 h-5 text-amber-900" />
            {isDrawerOpen
              ? "Tutup Kembali Laci Rahasia"
              : "Buka Laci Rahasia Kotak Beludru"}
          </button>

          {/* DRAWER CONTENT (Reveals when open) */}
          <div
            className={`transition-all duration-700 ease-out overflow-hidden mt-8 ${
              isDrawerOpen
                ? "max-h-[800px] opacity-100 transform translate-y-0"
                : "max-h-0 opacity-0 transform -translate-y-6 pointer-events-none"
            }`}
          >
            <div className="p-6 sm:p-10 rounded-2xl border border-amber-400/60 bg-[#081026]/95 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] relative">
              {/* Ring Visual Presentation */}
              <div className="w-20 h-20 mx-auto mb-6 rounded-full border-4 border-amber-400 flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.5)] bg-gradient-to-tr from-amber-500/20 to-transparent">
                <Gem className="w-8 h-8 text-amber-200 animate-pulse" />
              </div>

              {/* Inscription on Inside of Ring */}
              <div className="inline-block py-2 px-6 rounded-full border border-amber-400/40 bg-amber-500/10 mb-6">
                <span className="text-xs uppercase font-sans tracking-widest text-amber-400/80 block">
                  Ukiran di Lingkar Dalam Cincin
                </span>
                <span className="text-sm sm:text-base font-serif italic text-amber-200 font-bold">
                  &ldquo;{ringInscription}&rdquo;
                </span>
              </div>

              {/* Secret Vow Letter */}
              <div className="max-w-xl mx-auto text-sm sm:text-base text-amber-100 leading-relaxed font-serif whitespace-pre-line text-left bg-[#050b1a]/60 p-6 rounded-xl border border-amber-500/20">
                {secretVowMessage}
              </div>

              {/* Signature Stamp */}
              <div className="mt-8 pt-6 border-t border-amber-500/20 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full border-2 border-amber-400/60 flex items-center justify-center text-amber-300 mb-2">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <p className="text-xs uppercase tracking-widest text-amber-300 font-sans font-bold">
                  {signatureTitle}
                </p>
                <p className="text-[11px] text-amber-400/60 font-mono mt-1">
                  Atelier Place Vendôme • Numéro d&apos;Amour Éternel
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom Elegant Flourish */}
        <div className="text-center py-6 text-amber-500/50 flex items-center justify-center gap-3">
          <span className="h-px w-16 bg-amber-500/20" />
          <span className="text-xs tracking-widest font-mono uppercase">
            ✦ L&apos;ÉCRIN ÉTERNEL ✦
          </span>
          <span className="h-px w-16 bg-amber-500/20" />
        </div>
      </div>
    </div>
  );
}

export function HauteJoaillerieTemplate(props: TemplateComponentProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0a1128] text-amber-200 flex items-center justify-center">
          <span className="text-sm uppercase tracking-widest font-serif">
            Membuka Kotak Perhiasan...
          </span>
        </div>
      }
    >
      <HauteJoaillerieTemplateContent {...props} />
    </Suspense>
  );
}
