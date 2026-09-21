"use client";

import { Suspense, useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Volume2,
  VolumeX,
  Music,
  Bookmark,
  Feather,
  Sparkles,
  Scroll,
  Library,
  Compass,
  Heart,
  Shield,
  RotateCcw,
} from "lucide-react";
import type { TemplateComponentProps } from "../renderer";

function ExLibrisInner({ data, className = "" }: TemplateComponentProps) {
  const pathname = usePathname();
  const isThumbnail = pathname === "/templates";

  // State
  const [activeChapterTab, setActiveChapterTab] = useState<number>(0);
  const [bookmarkPage, setBookmarkPage] = useState<number>(42);
  const [isBookmarking, setIsBookmarking] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [audioError, setAudioError] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Destructure content with safe fallbacks
  const {
    recipientName = "Seraphina Eleanor",
    senderName = "Theodore Vance",
    bookTitle = "The Chronology of an Unending Devotion",
    bookSubtitle = "An Antiquarian Record of Two Wandering Souls Finding Home",
    editionLimitation = "First & Sole Edition • Copy 01/01 Printed for Eternity",
    printingPress = "Officina Lettera • Florence & London",
    publicationDate = "Malam Saat Kisah Ini Pertama Kali Dituliskan",
    frontispieceEpigraph = "Untukmu, yang kepadanya seluruh aksara dan halaman hidupku kupersembahkan.",
    forewordTitle = "Prolog: Puisi Hidup yang Tak Pernah Usai Kubaca",
    forewordDate = "Musim Gugur, Di Bawah Cahaya Lampu Meja Perpustakaan",
    mainMessage = "Seraphina yang terkasih,\n\nMereka yang mencintai buku tua tahu bahwa nilai sejati sebuah karya bukanlah terletak pada mulusnya sampul kulit...",
    forewordSignoff = "Dengan seluruh tinta jiwa yang tak akan pernah kering,",
    chapter1Title = "The Uncharted Prelude (Halaman Pembuka Takdir)",
    chapter1Epigraph = "Takdir tidak pernah terburu-buru, ia hanya membalik halaman tepat pada waktunya.",
    chapter1Story = "Pertemuan kita bukanlah kebetulan biasa, melainkan simfoni yang telah disusun rapi oleh semesta.",
    chapter1Meaning = "Awal mula dari setiap hal indah yang hari ini kita sebut sebagai rumah.",
    chapter2Title = "The Sanctuary of Whispered Truths (Ruang Suci Kejujuran)",
    chapter2Epigraph = "Cinta sejati dimulai saat dua manusia tak lagi perlu memakai topeng di hadapan satu sama lain.",
    chapter2Story = "Malam-malam panjang saat kita bisa menceritakan luka masa lalu dan impian rahasia tanpa takut dihakimi.",
    chapter2Meaning = "Kedalaman rasa percaya yang menjadi fondasi tak tergoyahkan bagi jiwa kita.",
    chapter3Title = "Weathering the Autumn Tempest (Mengatasi Badai Hidup)",
    chapter3Epigraph = "Angin kencang mungkin merontokkan dedaunan, namun hanya akan memperkokoh akar pohon tua.",
    chapter3Story = "Ketika kehidupan menghadirkan keraguan dan kelelahan, kita tidak saling melepaskan pegangan.",
    chapter3Meaning = "Kekuatan komitmen yang membuktikan bahwa ikatan kita kebal terhadap ujian waktu.",
    chapter4Title = "The Infinite Epilogue (Epilog Abadi yang Menanti)",
    chapter4Epigraph = "Buku terbaik bukanlah buku yang tamat, melainkan yang terus dituliskan hari demi hari.",
    chapter4Story = "Semua halaman kosong di depan kita menunggu untuk diisi bersama hingga rambut kita memutih.",
    chapter4Meaning = "Sebuah janji abadi bahwa epilog kita tidak akan pernah memiliki kata tamat.",
    marginalia1Page = "Halaman 17 • Sudut Kanan Atas",
    marginalia1Note = "Di sudut kedai itu, saat kamu tertawa lepas, aku tahu duniaku telah menemukan porosnya.",
    marginalia1Context = "Kencan pertama di tengah hujan gerimis",
    marginalia2Page = "Halaman 54 • Garis Bawah Paragraf",
    marginalia2Note = "Kamu tertidur di bahuku saat kereta melaju malam itu. Aku menahan napas agar kamu tak terbangun.",
    marginalia2Context = "Perjalanan pulang setelah seharian menjelajah",
    marginalia3Page = "Halaman 108 • Diapit Tanda Bintang",
    marginalia3Note = "Terima kasih telah menggenggam tanganku saat dunia terasa begitu berat dan bising.",
    marginalia3Context = "Hari terberat di tempat kerja yang terobati oleh pelukanmu",
    marginalia4Page = "Halaman 240 • Sudut Terlipat (Dog-Eared)",
    marginalia4Note = "Bahkan jika buku ini memiliki sejuta halaman, namamu akan selalu menjadi kata terindah di setiap barisnya.",
    marginalia4Context = "Janji bisu yang dituliskan di larut malam",
    bindingStyle = "Full Florentine Crimson Morocco Leather with 24k Gold Tooling",
    paperType = "Handmade 100% Cotton Rag Deckle-Edge Paper (Acid-Free)",
    typographyDetails = "Monotype Baskerville & Gilded Hand-Illuminated Drop Caps",
    preservationStatus = "Indestructible • Dilindungi oleh kesetiaan dan cinta abadi",
    bookmarkButtonText = "Sematkan Pita Pembatas Sutra",
    bookmarkSuccessMessage = "Pita sutra burgundy terselip anggun di antara lembaran kisah kita.",
  } = data;

  const primaryColor = String(data.primaryColor || "#d4af37");
  const secondaryColor = String(data.secondaryColor || "#8b1e2d");
  const accentColor = String(data.accentColor || "#be123c");
  const musicTrack = data.musicTrack ? String(data.musicTrack) : undefined;

  const chapters = [
    {
      num: "Caput I",
      title: chapter1Title,
      epigraph: chapter1Epigraph,
      story: chapter1Story,
      meaning: chapter1Meaning,
    },
    {
      num: "Caput II",
      title: chapter2Title,
      epigraph: chapter2Epigraph,
      story: chapter2Story,
      meaning: chapter2Meaning,
    },
    {
      num: "Caput III",
      title: chapter3Title,
      epigraph: chapter3Epigraph,
      story: chapter3Story,
      meaning: chapter3Meaning,
    },
    {
      num: "Caput IV",
      title: chapter4Title,
      epigraph: chapter4Epigraph,
      story: chapter4Story,
      meaning: chapter4Meaning,
    },
  ];

  const marginalia = [
    {
      page: marginalia1Page,
      note: marginalia1Note,
      context: marginalia1Context,
    },
    {
      page: marginalia2Page,
      note: marginalia2Note,
      context: marginalia2Context,
    },
    {
      page: marginalia3Page,
      note: marginalia3Note,
      context: marginalia3Context,
    },
    {
      page: marginalia4Page,
      note: marginalia4Note,
      context: marginalia4Context,
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

  // Bookmark handler
  const handleBookmark = () => {
    setIsBookmarking(true);
    setBookmarkPage((prev) => prev + 18);
    setTimeout(() => {
      setIsBookmarking(false);
    }, 1300);
  };

  return (
    <div
      className={`min-h-screen w-full relative overflow-hidden bg-[#140b0e] text-[#f7f2e7] font-serif selection:bg-[#d4af37]/30 selection:text-[#fef08a] ${className}`}
      style={
        {
          "--primary-color": primaryColor,
          "--secondary-color": secondaryColor,
          "--accent-color": accentColor,
        } as React.CSSProperties
      }
    >
      {/* Background Atmosphere: Leather-bound Library Texture & Golden Amber Glow */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Deep Crimson Morocco Leather Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#18090d] via-[#12070a] to-[#0c0406]" />

        {/* Ambient Warm Bookbinder's Gold Light */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-[150px] opacity-15 pointer-events-none"
          style={{ backgroundColor: primaryColor }}
        />

        {/* Velvet Crimson Ambient Glow */}
        <div
          className="absolute bottom-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[450px] rounded-full blur-[140px] opacity-10 pointer-events-none"
          style={{ backgroundColor: secondaryColor }}
        />

        {/* Subtle Florentine Marbled Book Texture Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(212,175,55,0.06)_1px,transparent_1px)] bg-[size:30px_30px] opacity-60" />
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
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#200c12]/90 hover:bg-[#2c121b] text-[#d4af37] border border-[#d4af37]/40 backdrop-blur-md shadow-2xl text-xs font-sans font-medium transition-all hover:scale-105 active:scale-95"
            title={isPlayingAudio ? "Jeda Melodi Perpustakaan" : "Putar Melodi Perpustakaan"}
          >
            {isPlayingAudio ? (
              <>
                <Volume2 className="w-4 h-4 text-[#d4af37] animate-pulse" />
                <span className="italic font-serif">Library Cello Playing</span>
              </>
            ) : (
              <>
                {audioError ? (
                  <VolumeX className="w-4 h-4 text-rose-400" />
                ) : (
                  <Music className="w-4 h-4 text-[#d4af37]" />
                )}
                <span>Putar Melodi Selo</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Main Container */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20 space-y-16">
        {/* =========================================================================
            BAGIAN 1: Etiket Ex Libris & Halaman Hak Cipta (The Ex Libris Bookplate)
        ========================================================================= */}
        <header className="relative p-7 sm:p-12 rounded-3xl border-2 border-[#d4af37]/40 bg-[#1c0c11]/85 backdrop-blur-xl shadow-2xl overflow-hidden text-center">
          {/* Gilded Book Tooling Border Accents */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-[#d4af37]/60 pointer-events-none" />
          <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-[#d4af37]/60 pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-[#d4af37]/60 pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-[#d4af37]/60 pointer-events-none" />

          {/* Top Ex Libris Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#d4af37]/25">
            <div className="flex items-center gap-2.5 text-left">
              <div className="p-2.5 rounded-lg bg-[#2b1018] border border-[#d4af37]/40 text-[#d4af37]">
                <Library className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-serif tracking-[0.25em] text-[#d4af37]/80 block">
                  Ex Libris Bibliotheca
                </span>
                <span className="font-serif text-sm font-semibold text-[#f7f2e7]">
                  De la bibliothèque de {recipientName}
                </span>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2b1018] border border-[#d4af37]/30 text-[11px] text-[#d4af37] font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{editionLimitation}</span>
            </div>
          </div>

          {/* Book Grand Title & Subtitle */}
          <div className="py-8 space-y-3">
            <span className="text-xs uppercase tracking-[0.3em] font-serif text-[#d4af37]/80 block">
              Volume Unique • First Edition
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-normal tracking-tight text-white italic">
              {bookTitle}
            </h1>
            <p className="text-xs sm:text-sm text-[#d4af37]/90 font-serif italic max-w-md mx-auto">
              {bookSubtitle}
            </p>
            <p className="text-xs sm:text-sm text-slate-300 font-serif italic max-w-xl mx-auto pt-3 border-t border-[#d4af37]/20 leading-relaxed">
              &ldquo;{frontispieceEpigraph}&rdquo;
            </p>
          </div>

          {/* Colophon Press & Dedicated Parties */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-[#d4af37]/25 text-xs">
            <div className="p-3.5 rounded-xl bg-[#240c14] border border-[#d4af37]/20">
              <span className="text-[#d4af37]/70 block text-[10px] uppercase tracking-wider mb-1 font-sans">
                The Inspiring Muse
              </span>
              <span className="font-serif text-base font-medium text-white block">
                {recipientName}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#240c14] border border-[#d4af37]/20">
              <span className="text-[#d4af37]/70 block text-[10px] uppercase tracking-wider mb-1 font-sans">
                The Dedicated Wordsmith
              </span>
              <span className="font-serif text-base font-medium text-[#d4af37] block">
                {senderName}
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-[#240c14] border border-[#d4af37]/20 text-left sm:text-center">
              <span className="text-[#d4af37]/70 block text-[10px] uppercase tracking-wider mb-1 font-sans">
                Officina &amp; Date
              </span>
              <span className="text-xs font-serif text-slate-200 block truncate" title={String(printingPress)}>
                {printingPress}
              </span>
              <span className="text-[10px] text-[#d4af37]/70 block truncate mt-0.5" title={String(publicationDate)}>
                {publicationDate}
              </span>
            </div>
          </div>
        </header>

        {/* =========================================================================
            BAGIAN 2: Kata Pengantar Penulis (The Author's Epistolary Foreword)
        ========================================================================= */}
        <section className="relative p-8 sm:p-14 rounded-3xl border border-[#d4af37]/35 bg-[#fbf8f0] text-[#24130a] shadow-2xl">
          {/* Subtle Quill Watermark in background */}
          <div className="absolute top-10 right-10 opacity-10 pointer-events-none text-[#8c6b2d]">
            <Scroll className="w-36 h-36" />
          </div>

          {/* Foreword Header */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-6 border-b border-[#8c6b2d]/30">
            <div>
              <span className="text-[10px] uppercase font-sans tracking-[0.25em] text-[#8c6b2d] font-bold block">
                Praefatio Auctoris • Kata Pengantar
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#1e0e05] font-normal mt-1">
                {forewordTitle}
              </h2>
            </div>
            <span className="text-xs text-[#6e5323] font-serif italic">
              {forewordDate}
            </span>
          </div>

          {/* Foreword Letter Body */}
          <div className="py-8 space-y-5 text-[#24130a] font-serif text-base sm:text-lg leading-relaxed whitespace-pre-line">
            {mainMessage}
          </div>

          {/* Foreword Signoff */}
          <div className="pt-6 border-t border-[#8c6b2d]/30 flex flex-col items-end text-right">
            <p className="text-xs sm:text-sm text-[#6e5323] font-serif italic">
              {forewordSignoff}
            </p>
            <span className="text-xl sm:text-2xl font-serif text-[#8c6b2d] italic font-semibold mt-1">
              {senderName}
            </span>
            <span className="text-[10px] text-[#8c6b2d]/80 uppercase tracking-widest font-mono mt-0.5">
              Auctor et Scriptor untuk {recipientName}
            </span>
          </div>
        </section>

        {/* =========================================================================
            BAGIAN 3: 4 Bab Utama Kisah Kita (The 4 Narrative Chapters)
        ========================================================================= */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-serif uppercase tracking-[0.25em] text-[#d4af37]">
              <BookOpen className="w-3.5 h-3.5" />
              Capita Narrativa
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-normal text-white">
              4 Bab Cerita Cinta Kita
            </h2>
            <p className="text-xs sm:text-sm text-[#d4af37]/80 max-w-md mx-auto font-serif italic">
              Empat babak kehidupan di mana setiap helai halamannya membuktikan kebesaran takdir yang mempertemukan kita.
            </p>
          </div>

          {/* Chapter Navigation Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 rounded-2xl bg-[#1b090f] border border-[#d4af37]/25">
            {chapters.map((ch, idx) => {
              const isActive = activeChapterTab === idx;
              return (
                <button
                  key={ch.num}
                  type="button"
                  onClick={() => setActiveChapterTab(idx)}
                  className={`p-3 rounded-xl text-left transition-all relative overflow-hidden ${
                    isActive
                      ? "bg-[#2d101a] text-[#d4af37] shadow-lg border border-[#d4af37]/50 font-semibold"
                      : "text-[#f7f2e7]/60 hover:text-[#f7f2e7] hover:bg-[#220c15]"
                  }`}
                >
                  <span className="text-[11px] uppercase font-mono tracking-widest block text-[#d4af37]/80">
                    {ch.num}
                  </span>
                  <span className="text-xs font-serif truncate block mt-0.5">
                    {String(ch.title).split("(")[0]}
                  </span>
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#d4af37] to-amber-200" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Active Chapter Card */}
          <div className="p-6 sm:p-10 rounded-2xl border border-[#d4af37]/30 bg-[#1c0a12]/80 backdrop-blur-xl shadow-xl transition-all duration-300">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#d4af37]/20">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#2e0f1b] border border-[#d4af37]/40 text-[#d4af37]">
                  <Feather className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#d4af37] uppercase tracking-widest block">
                    {chapters[activeChapterTab].num} • Bab Narasi
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif text-white font-medium">
                    {chapters[activeChapterTab].title}
                  </h3>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              {/* Epigraph */}
              <div className="p-3.5 rounded-xl bg-[#2a0e19]/60 border-l-2 border-[#d4af37] text-xs sm:text-sm text-[#d4af37] italic font-serif">
                &ldquo;{chapters[activeChapterTab].epigraph}&rdquo;
              </div>

              {/* Story */}
              <div>
                <h4 className="text-xs font-sans font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#d4af37]" />
                  Narasi Babak:
                </h4>
                <p className="text-sm sm:text-base text-slate-200 font-serif leading-relaxed pl-4 border-l border-slate-700">
                  {chapters[activeChapterTab].story}
                </p>
              </div>

              {/* Meaning */}
              <div className="pt-3 border-t border-[#d4af37]/15">
                <span className="text-[10px] uppercase font-sans tracking-wider text-[#d4af37]/70 block mb-0.5">
                  Makna Filosofis Bab Ini:
                </span>
                <p className="text-xs text-slate-300 font-serif italic">
                  {chapters[activeChapterTab].meaning}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            BAGIAN 4: 4 Catatan Pinggir (Handwritten Marginalia)
        ========================================================================= */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-serif uppercase tracking-[0.25em] text-[#d4af37]">
              <Feather className="w-3.5 h-3.5" />
              Marginalia &amp; Notae
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-normal text-white">
              4 Catatan Pinggir Tinta Sepia
            </h2>
            <p className="text-xs sm:text-sm text-[#d4af37]/80 max-w-md mx-auto font-serif italic">
              Catatan-catatan kecil yang kutuliskan di tepi halaman buku pada momen-momen saat hatiku tergetar olehmu.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {marginalia.map((item, idx) => (
              <div
                key={item.page}
                className="p-6 rounded-2xl border border-[#d4af37]/25 bg-[#18080f]/80 backdrop-blur-xl shadow-xl flex flex-col justify-between group hover:border-[#d4af37]/50 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] font-mono text-[#d4af37] bg-[#270c17] px-2.5 py-0.5 rounded-full border border-[#d4af37]/30">
                      {item.page}
                    </span>
                    <span className="text-[10px] font-sans uppercase tracking-wider text-slate-400">
                      Note N°0{idx + 1}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-[#f7f2e7] leading-relaxed font-serif italic mb-4 pl-3 border-l-2 border-[#d4af37]/50">
                    &ldquo;{item.note}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-[#d4af37]/15">
                  <span className="text-[10px] uppercase font-sans tracking-wider text-[#d4af37]/70 block mb-0.5">
                    Konteks Kenangan:
                  </span>
                  <p className="text-xs text-slate-300 font-serif">
                    {item.context}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            BAGIAN 5: Spesifikasi Penjilidan Buku (Bibliophile Specifications)
        ========================================================================= */}
        <section className="p-6 sm:p-10 rounded-2xl border border-[#d4af37]/35 bg-[#17080e]/90 backdrop-blur-xl shadow-xl space-y-6">
          <div className="text-center space-y-1">
            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#d4af37]/80">
              Collatio Bibliophili • Spesifikasi Fisik
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-normal text-white">
              Kurasi &amp; Seni Penjilidan Buku Langka
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-[#220b14] border border-[#d4af37]/20 flex items-start gap-3">
              <Shield className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#d4af37] block font-serif uppercase tracking-wider text-[11px] mb-0.5">
                  Sampul &amp; Jilidan Kulit (Binding):
                </strong>
                <p className="text-slate-300 font-serif italic">{bindingStyle}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#220b14] border border-[#d4af37]/20 flex items-start gap-3">
              <Scroll className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#d4af37] block font-serif uppercase tracking-wider text-[11px] mb-0.5">
                  Kertas Antik (Paper Stock):
                </strong>
                <p className="text-slate-300 font-serif italic">{paperType}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#220b14] border border-[#d4af37]/20 flex items-start gap-3">
              <Compass className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#d4af37] block font-serif uppercase tracking-wider text-[11px] mb-0.5">
                  Tipografi &amp; Iluminasi:
                </strong>
                <p className="text-slate-300 font-serif italic">{typographyDetails}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#220b14] border border-[#d4af37]/20 flex items-start gap-3">
              <Heart className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-rose-300 block font-serif uppercase tracking-wider text-[11px] mb-0.5">
                  Status Pelestarian:
                </strong>
                <p className="text-slate-300 font-serif italic">{preservationStatus}</p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            BAGIAN 6: Interactive Ribbon Bookmark & Library Romance Interaction
        ========================================================================= */}
        <section className="relative p-8 sm:p-14 rounded-3xl border border-[#d4af37]/40 bg-gradient-to-b from-[#240b15] via-[#18070e] to-[#0f0408] backdrop-blur-2xl shadow-2xl text-center space-y-6">
          <div className="inline-flex p-3.5 rounded-2xl bg-[#320f1e] border border-[#d4af37]/40 text-[#d4af37] shadow-inner">
            <Bookmark className={`w-8 h-8 ${isBookmarking ? "animate-bounce text-amber-300" : ""}`} />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h2 className="text-2xl sm:text-3xl font-serif text-white italic font-normal">
              Sematkan Tanda Kasih Abadi
            </h2>
            <p className="text-xs sm:text-sm text-[#d4af37]/80 font-serif italic leading-relaxed">
              Selipkan pita pembatas buku sutra merah tua untuk menandai bahwa perjalanan membaca kisah kita akan terus berlanjut.
            </p>
          </div>

          {/* Bookmark Page Counter */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#270c17] border border-[#d4af37]/30 text-xs font-serif text-[#d4af37]">
            <Bookmark className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>
              Pita Sutra Tersemat di Halaman {bookmarkPage} • Dibaca Bersama {recipientName}
            </span>
          </div>

          {/* Interactive Bookmark Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleBookmark}
              disabled={isBookmarking}
              className="px-8 py-4 rounded-full font-serif text-sm sm:text-base font-medium shadow-2xl transition-all duration-300 flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#d4af37] text-[#1c090e] hover:scale-105 active:scale-95 hover:shadow-[#d4af37]/20 hover:shadow-lg"
            >
              {isBookmarking ? (
                <>
                  <Sparkles className="w-5 h-5 animate-spin text-[#1c090e]" />
                  <span>Menyelipkan Pita Sutra Burgundy...</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-5 h-5" />
                  <span>{bookmarkButtonText}</span>
                </>
              )}
            </button>

            {bookmarkPage > 42 && (
              <button
                type="button"
                onClick={() => setBookmarkPage(42)}
                className="p-3 rounded-full bg-[#270c17] hover:bg-[#341120] text-[#d4af37]/70 hover:text-[#d4af37] text-xs transition-colors"
                title="Kembalikan ke Halaman Awal"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Success Bookmark Notice */}
          {bookmarkPage > 42 && (
            <p className="text-xs sm:text-sm text-[#d4af37] font-serif italic animate-fade-in max-w-md mx-auto">
              &ldquo;{bookmarkSuccessMessage}&rdquo;
            </p>
          )}

          {/* Footer Copyright and Blessing */}
          <div className="pt-8 border-t border-[#d4af37]/20 text-[11px] text-[#d4af37]/60 font-serif">
            <span>
              Ex Libris • Mahakarya Sastra Abadi untuk {recipientName} &bull; Officina Lettera, Florence &amp; London
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}

export function ExLibrisTemplate(props: TemplateComponentProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full flex items-center justify-center bg-[#140b0e] text-[#d4af37] font-serif text-sm">
          Membuka lembaran buku antik...
        </div>
      }
    >
      <ExLibrisInner {...props} />
    </Suspense>
  );
}
