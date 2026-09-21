"use client";

import { useRef, useState, Suspense } from "react";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  Pause,
  Play,
  Share2,
  Check,
  Heart,
  Volume2,
  VolumeX,
  Compass,
  Building2,
  Scroll,
  Eye,
  Feather,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { toParagraphs } from "@/lib/utils/format";
import type { LetterContent } from "@/types/letter";
import { withDefaults } from "../utils";

interface MuseumOfUsTemplateProps {
  data: LetterContent;
  className?: string;
}

const defaults: Record<string, string> = {
  recipientName: "Aurelia Beatrice",
  partnerTitle: "My Living Masterpiece & Infinite Muse",
  exhibitionTitle: "THE RETROSPECTIVE OF US: TWO SOULS, ONE CANVAS",
  exhibitionYear: "Collection 2021 – Present • Permanent Archive",
  curatorName: "Adrian Bramantya",
  curatorTitle: "Chief Curator & Devoted Companion // Sahabat Sejiwa",
  heroCoverPhotoUrl:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
  curatorialStatement:
    "Cinta bukanlah karya seni yang selesai dalam semalam, melainkan serangkaian sapuan kuas kesabaran, palet kehangatan, dan ketulusan jiwa yang terpahat abadi dalam sanubari.",

  letterTitle: "From the Curator's Heart: Surat Bagi Mahakarya Terindah di Semesta",
  letterContent:
    "Kepada mahakarya hidupku yang paling kupuja,\n\nDi hadapan lukisan-lukisan terhebat di dunia, tak ada satu pun yang mampu menandingi binar matamu saat memandangku dengan ketulusan yang murni. Setiap kali aku menatapmu, aku diingatkan bahwa hal paling bernilai di dunia ini bukanlah sesuatu yang dipahat dari marmer atau dilukis di atas kanvas emas, melainkan cinta yang kita rawat bersama setiap hari.\n\nTerima kasih telah hadir dalam hidupku, menyalakan kembali warna-warna yang sempat memudar, dan memeluk segala kekuranganku dengan kesabaran luar biasa. Memilikimu di sisiku membuat setiap babak kehidupan terasa seperti mahakarya seni yang sarat makna dan keindahan.\n\nDalam ruang pameran waktu yang tak berbatas ini, janjiku adalah terus mencintaimu, menjagamu dari segala badai, dan menua bersamamu dengan senyuman yang sama hangatnya seperti saat pertama kali kita berjumpa.",
  curatorSignOff: "Selamanya mengagumi dan menjagamu dalam keabadian waktu",

  install1Medium: "Oil on Linen // First Glance",
  install1Title: "The First Palette: Resonansi Pertemuan Pertama",
  install1Year: "Acquired: Musim Semi 2021",
  install1Desc:
    "Detik ketika waktu terasa melambat, tatapan kita bersinggungan, dan semesta membisikkan bahwa petualangan indah baru saja dimulai.",

  install2Medium: "Carved Bronze // Strength in Silence",
  install2Title: "The Sculpture in the Storm: Keteguhan Melewati Ujian",
  install2Year: "Acquired: Musim Hujan 2022",
  install2Desc:
    "Bahkan di saat badai dan ketidakpastian menerpa, genggaman tanganmu adalah jangkar terkuat yang membuatku selalu percaya pada esok hari.",

  install3Medium: "Architectural Light // Pure Harmony",
  install3Title: "The Sanctuary of Light: Kehangatan Rumah Batin",
  install3Year: "Acquired: 2024 – Ongoing",
  install3Desc:
    "Menemukan tempat pulang di dalam pelukanmu, di mana riuhnya dunia luar sirna tergantikan oleh percakapan hangat dan secangkir teh sore.",

  install4Medium: "Gold Leaf & Infinite Prism // Eternity",
  install4Title: "The Infinite Horizon: Kanvas Masa Depan Bersama",
  install4Year: "Acquired: Selamanya",
  install4Desc:
    "Menatap cakrawala esok hari dengan keyakinan penuh bahwa kisah kita akan terus bertumbuh, menua, dan mekar dalam keindahan abadi.",

  artwork1Photo:
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
  artwork1Title: "Senyuman di Bawah Cahaya Sore",
  artwork1Medium: "Natural Light & Pure Joy • Paris, 2023",
  artwork1Desc:
    "Sebuah komposisi sempurna di mana kebahagiaan terpancar tanpa perlu kata-kata tambahan.",

  artwork2Photo:
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
  artwork2Title: "Langkah Berdampingan Menembus Senja",
  artwork2Medium: "Cobblestone Shadows & Heartbeats • 2024",
  artwork2Desc:
    "Menyusuri jalan setapak bersama, menyadari bahwa setiap langkah adalah perjalanan menuju rumah yang sama.",

  artwork3Photo:
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
  artwork3Title: "Dekapan Kehangatan di Kala Hujan",
  artwork3Medium: "Raindrops & Shared Warmth • 2025",
  artwork3Desc:
    "Bukti nyata bahwa di tengah dinginnya dunia, cinta kita selalu memiliki api yang senantiasa menghangatkan.",

  vow1Title: "Vow of Sanctuary: Menjadi Rumah Jiwamu",
  vow1Desc:
    "Aku berjanji akan selalu menjadi tempatmu pulang, ruang aman di mana kau bebas menjadi dirimu seutuhnya tanpa keraguan.",

  vow2Title: "Vow of Tenderness: Merawat dengan Kelembutan",
  vow2Desc:
    "Menjagamu dengan tutur kata yang sejuk, mendengar keluh kesahmu dengan kesabaran, dan memeluk hatimu di hari-hari berat.",

  vow3Title: "Vow of Growth: Tumbuh dan Bermimpi Bersama",
  vow3Desc:
    "Mendukung setiap cita-cita dan potensimu, merayakan kemenangan kecilmu, dan terus belajar menjadi pasangan yang lebih baik setiap hari.",

  vow4Title: "Vow of Eternity: Kesetiaan Melintasi Waktu",
  vow4Desc:
    "Tetap memilihmu di setiap musim kehidupan, menua bersamamu dengan penuh rasa syukur, dan mencintaimu melampaui batas waktu.",

  primaryColor: "#121316",
  accentColor: "#c5a059",
  backgroundColor: "#f7f5f0",
  cardColor: "#ffffff",
  textColor: "#1c1917",
  musicTitle: "Museum Cello & Piano Nocturne",
  musicUrl:
    "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=ambient-piano-amp-strings-10711.mp3",
};

function MuseumOfUsTemplateInner({
  data,
  className,
}: MuseumOfUsTemplateProps) {
  const content = withDefaults(defaults, data);
  const pathname = usePathname();
  const isThumbnail = className?.includes("thumbnail") || false;

  // Interactivity States
  const [hasEntered, setHasEntered] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [roseCount, setRoseCount] = useState(25);
  const [hasGivenRose, setHasGivenRose] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeInstall, setActiveInstall] = useState<number | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlayingAudio(true);
    }
  };

  const handleEnterGallery = () => {
    setHasEntered(true);
    if (audioRef.current && !isPlayingAudio) {
      audioRef.current.play().catch(() => {});
      setIsPlayingAudio(true);
    }
  };

  const handleGiveRose = () => {
    setRoseCount((prev) => prev + 1);
    setHasGivenRose(true);
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const paragraphs = toParagraphs(content.letterContent);

  const installations = [
    {
      medium: content.install1Medium,
      title: content.install1Title,
      year: content.install1Year,
      desc: content.install1Desc,
    },
    {
      medium: content.install2Medium,
      title: content.install2Title,
      year: content.install2Year,
      desc: content.install2Desc,
    },
    {
      medium: content.install3Medium,
      title: content.install3Title,
      year: content.install3Year,
      desc: content.install3Desc,
    },
    {
      medium: content.install4Medium,
      title: content.install4Title,
      year: content.install4Year,
      desc: content.install4Desc,
    },
  ];

  const artworks = [
    {
      photo: content.artwork1Photo,
      title: content.artwork1Title,
      medium: content.artwork1Medium,
      desc: content.artwork1Desc,
    },
    {
      photo: content.artwork2Photo,
      title: content.artwork2Title,
      medium: content.artwork2Medium,
      desc: content.artwork2Desc,
    },
    {
      photo: content.artwork3Photo,
      title: content.artwork3Title,
      medium: content.artwork3Medium,
      desc: content.artwork3Desc,
    },
  ];

  const vows = [
    { title: content.vow1Title, desc: content.vow1Desc },
    { title: content.vow2Title, desc: content.vow2Desc },
    { title: content.vow3Title, desc: content.vow3Desc },
    { title: content.vow4Title, desc: content.vow4Desc },
  ];

  return (
    <div
      className={cn(
        "relative min-h-screen w-full overflow-x-hidden transition-colors duration-700 font-sans selection:bg-amber-400/20 selection:text-amber-900",
        className
      )}
      style={{
        backgroundColor: content.backgroundColor,
        color: content.textColor,
      }}
    >
      {/* Background Museum Architecture Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 10%, ${content.accentColor}18 0%, transparent 60%), radial-gradient(circle at 90% 90%, ${content.primaryColor}10 0%, transparent 50%)`,
          }}
        />
        {/* Subtle Fine Art Gallery Lines */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(to right, #12131615 1px, transparent 1px), linear-gradient(to bottom, #12131615 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Floating Museum Soundtrack Audio */}
      {content.musicUrl && !isThumbnail && pathname !== "/templates" && (
        <>
          <audio ref={audioRef} src={content.musicUrl} loop preload="none" />
          <div className="fixed bottom-6 right-6 z-50">
            <button
              type="button"
              onClick={toggleAudio}
              className="flex items-center gap-3 px-4 py-2 rounded-full border border-amber-600/30 bg-stone-900/90 text-amber-200 shadow-xl backdrop-blur-md hover:bg-stone-800 transition-all cursor-pointer"
              aria-label={isPlayingAudio ? "Jeda musik museum" : "Putar musik museum"}
            >
              <div className="relative flex items-center justify-center">
                {isPlayingAudio ? (
                  <>
                    <span className="absolute -inset-1 rounded-full bg-amber-400/30 animate-ping" />
                    <Volume2 className="h-4 w-4 text-amber-300" />
                  </>
                ) : (
                  <VolumeX className="h-4 w-4 text-stone-400" />
                )}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-[10px] uppercase font-mono tracking-widest text-stone-400">
                  {isPlayingAudio ? "Gallery Audio Playing" : "Museum Audio"}
                </p>
                <p className="text-xs font-semibold text-amber-100 max-w-[130px] truncate">
                  {content.musicTitle}
                </p>
              </div>
              {isPlayingAudio ? (
                <Pause className="h-3.5 w-3.5 text-amber-300" />
              ) : (
                <Play className="h-3.5 w-3.5 text-amber-300 fill-amber-300" />
              )}
            </button>
          </div>
        </>
      )}

      {/* =================================================================== */}
      {/* 1. HERO: INTERACTIVE VERNISSAGE PRIVATE VIEWING TICKET             */}
      {/* =================================================================== */}
      {!hasEntered && !isThumbnail ? (
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 text-center">
          <div className="w-full max-w-sm sm:max-w-md space-y-6">
            {/* Museum Vernissage Ticket */}
            <div
              className="relative rounded-3xl p-8 sm:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] border-2 border-amber-600/30 backdrop-blur-md overflow-hidden text-center"
              style={{ backgroundColor: content.cardColor }}
            >
              {/* Gold Filigree Corner Borders */}
              <div className="absolute inset-2 border border-amber-600/20 rounded-2xl pointer-events-none" />
              <div className="absolute inset-3 border border-dashed border-amber-600/10 rounded-xl pointer-events-none" />

              <div className="space-y-6 relative z-10">
                {/* Museum Monogram Seal */}
                <div className="w-18 h-18 sm:w-20 sm:h-20 mx-auto rounded-full border border-amber-600/40 flex flex-col items-center justify-center bg-amber-50 shadow-inner">
                  <Building2 className="h-8 w-8 text-amber-700 mb-0.5" />
                  <span className="font-mono text-[8px] uppercase tracking-widest text-amber-800 font-bold">
                    MUSEUM OF US
                  </span>
                </div>

                <div className="space-y-1">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-amber-800 font-semibold">
                    PRIVATE VIEWING • VERNISSAGE
                  </p>
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                    {content.recipientName}
                  </h1>
                  <p className="font-serif italic text-xs sm:text-sm text-stone-600">
                    {content.partnerTitle}
                  </p>
                </div>

                {/* Exhibition Title Plaque */}
                <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs font-mono space-y-1">
                  <p className="text-[9px] uppercase tracking-widest text-stone-400">
                    CURATED RETROSPECTIVE
                  </p>
                  <p className="font-serif font-bold text-sm text-stone-800">
                    {content.exhibitionTitle}
                  </p>
                  <p className="text-stone-500 text-[10px] pt-0.5">
                    {content.exhibitionYear}
                  </p>
                </div>

                {/* Admission Info */}
                <div className="pt-1 flex items-center justify-between font-mono text-[10px] text-stone-400 border-t border-stone-200">
                  <span>ADMIT: ONE SOULMATE</span>
                  <span className="text-amber-700 font-bold">INVITATION EXCLUSIVE</span>
                </div>
              </div>
            </div>

            {/* Enter Gallery Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleEnterGallery}
                className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-mono text-xs uppercase tracking-widest font-bold text-white bg-stone-900 shadow-[0_0_25px_rgba(0,0,0,0.3)] hover:bg-stone-800 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border border-amber-600/30"
              >
                <Eye className="h-4 w-4 text-amber-400 group-hover:rotate-12 transition-transform duration-300" />
                <span>Masuk ke Ruang Pameran</span>
                <Sparkles className="h-4 w-4 text-amber-400" />
              </button>
            </div>

            <p className="font-mono text-[10px] text-stone-500 tracking-widest">
              CURATED WITH LOVE • FOR YOUR EYES ONLY
            </p>
          </div>
        </div>
      ) : (
        /* ================================================================= */
        /* 2. THE PRIVATE EXHIBITION HALL                                    */
        /* ================================================================= */
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-16 sm:space-y-24">
          {/* =============================================================== */}
          {/* SEKSI 1: CURATORIAL STATEMENT & MASTERPIECE REGISTRY            */}
          {/* =============================================================== */}
          <section className="space-y-8 text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-stone-300 bg-white shadow-sm text-stone-700 font-mono text-xs tracking-widest">
              <Compass className="h-3.5 w-3.5 text-amber-700" />
              <span>THE PERMANENT RETROSPECTIVE • GALLERY HALL</span>
            </div>

            <div className="space-y-2">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-stone-500">
                A Curated Exhibition of Timeless Love
              </p>
              <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-stone-900">
                {content.recipientName}
              </h1>
              <p className="font-serif italic text-base sm:text-lg text-amber-800">
                {content.partnerTitle}
              </p>
            </div>

            {/* Marble Plaque & Hero Canvas */}
            <div
              className="max-w-3xl mx-auto rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-xl backdrop-blur-md grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left"
              style={{ backgroundColor: content.cardColor }}
            >
              {/* Hero Canvas Artwork */}
              <div className="md:col-span-5 relative aspect-[3/4] rounded-2xl overflow-hidden border-4 border-amber-700/40 shadow-2xl bg-stone-900">
                {content.heroCoverPhotoUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={content.heroCoverPhotoUrl}
                    alt={content.recipientName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-mono text-xs text-stone-400">
                    MASTERPIECE ARCHIVE
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 text-center font-mono text-[10px] text-amber-200 tracking-widest uppercase">
                  THE LIVING MASTERPIECE
                </div>
              </div>

              {/* Gallery Plaque Text */}
              <div className="md:col-span-7 space-y-4">
                <div className="space-y-1">
                  <span className="font-mono text-[10px] text-amber-800 uppercase tracking-widest font-bold">
                    EXHIBIT SPECIFICATIONS
                  </span>
                  <h3 className="font-serif font-bold text-xl text-stone-900">
                    {content.exhibitionTitle}
                  </h3>
                </div>

                <div className="space-y-2 text-xs font-mono border-y border-stone-200 py-3 text-stone-600">
                  <div>
                    <span className="text-stone-400 text-[9px] uppercase">
                      MEDIUM & COMPOSITION
                    </span>
                    <p className="text-stone-800 font-semibold text-[11px]">
                      Shared Tears, Pure Laughter, Endless Devotion
                    </p>
                  </div>
                  <div>
                    <span className="text-stone-400 text-[9px] uppercase">
                      COLLECTION PERIOD
                    </span>
                    <p className="text-stone-800 font-semibold text-[11px]">
                      {content.exhibitionYear}
                    </p>
                  </div>
                </div>

                <p className="font-serif text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                  &ldquo;{content.curatorialStatement}&rdquo;
                </p>

                <div className="pt-1 flex items-center justify-between text-[11px] font-mono text-stone-500">
                  <span>CURATOR: {content.curatorName}</span>
                  <span className="text-amber-800 font-bold">ACQUISITION: PRICELESS</span>
                </div>
              </div>
            </div>
          </section>

          {/* =============================================================== */}
          {/* SEKSI 2: THE CURATOR'S LOVE LETTER (WARKAT KURATOR)             */}
          {/* =============================================================== */}
          <section className="space-y-6">
            <div className="border-b border-stone-300 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-stone-800 font-mono text-xs tracking-widest uppercase">
                <Scroll className="h-4 w-4 text-amber-700" />
                <span>FROM THE CURATOR&apos;S HEART // LOVE LETTER</span>
              </div>
              <span className="font-mono text-xs text-stone-500">
                CURATORIAL ESSAY
              </span>
            </div>

            <div
              className="rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-lg relative space-y-6"
              style={{ backgroundColor: content.cardColor }}
            >
              {/* Top Accent Stamp */}
              <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                <div className="space-y-0.5">
                  <p className="font-mono text-[10px] text-amber-800 uppercase tracking-widest font-bold">
                    WARKAT CINTA KURATOR
                  </p>
                  <h3 className="font-serif font-bold text-2xl sm:text-3xl text-stone-900">
                    {content.letterTitle}
                  </h3>
                </div>
                <Feather className="h-6 w-6 text-amber-700 opacity-60" />
              </div>

              {/* Letter Paragraphs */}
              <div className="space-y-4 font-serif text-sm sm:text-base text-stone-800 leading-relaxed">
                {paragraphs.map((para, idx) => (
                  <p key={idx} className="text-justify sm:text-left">
                    {para}
                  </p>
                ))}
              </div>

              {/* Curator Sign Off */}
              <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <p className="font-mono text-[10px] text-stone-500 uppercase tracking-widest">
                    Ditulis Penuh Kekaguman Oleh
                  </p>
                  <p className="font-serif font-bold text-lg text-amber-800">
                    {content.curatorName}
                  </p>
                  <p className="font-sans text-xs text-stone-600">
                    {content.curatorTitle}
                  </p>
                </div>

                <div className="px-4 py-2 rounded-xl border border-amber-600/30 bg-amber-50 text-amber-900 font-serif italic text-xs text-center">
                  &ldquo;{content.curatorSignOff}&rdquo;
                </div>
              </div>
            </div>
          </section>

          {/* =============================================================== */}
          {/* SEKSI 3: 4 CURATED INSTALLATIONS OF LOVE (4 INSTALASI)          */}
          {/* =============================================================== */}
          <section className="space-y-6">
            <div className="border-b border-stone-300 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-stone-800 font-mono text-xs tracking-widest uppercase">
                <Building2 className="h-4 w-4 text-amber-700" />
                <span>4 CURATED INSTALLATIONS // CHAPTERS OF LOVE</span>
              </div>
              <span className="font-mono text-xs text-stone-500">
                RETROSPECTIVE ROOMS
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {installations.map((item, idx) => {
                const isActive = activeInstall === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveInstall(isActive ? null : idx)}
                    className={cn(
                      "cursor-pointer rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between shadow-sm relative overflow-hidden",
                      isActive
                        ? "border-amber-600 bg-amber-50/70 shadow-md scale-[1.01]"
                        : "border-stone-200 bg-white hover:border-amber-600/40"
                    )}
                    style={{ minHeight: "180px" }}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between font-mono text-xs">
                        <span className="text-amber-800 font-bold uppercase tracking-wider">
                          INSTALLATION 0{idx + 1}
                        </span>
                        <span className="text-stone-400 text-[11px]">{item.year}</span>
                      </div>

                      <div className="space-y-0.5">
                        <span className="font-mono text-[10px] uppercase text-stone-500">
                          {item.medium}
                        </span>
                        <h4 className="font-serif font-bold text-base text-stone-900">
                          {item.title}
                        </h4>
                      </div>

                      <p className="font-sans text-xs text-stone-700 leading-relaxed pt-1">
                        {item.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-[10px] font-mono text-stone-500">
                      <span>PRESERVED IN TIME</span>
                      <Check className="h-3 w-3 text-amber-700" />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* =============================================================== */}
          {/* SEKSI 4: THE PERMANENT COLLECTION (3 FOTO BERBINGKAI MUSEUM)    */}
          {/* =============================================================== */}
          <section className="space-y-6">
            <div className="border-b border-stone-300 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-stone-800 font-mono text-xs tracking-widest uppercase">
                <Eye className="h-4 w-4 text-amber-700" />
                <span>THE PERMANENT COLLECTION // FRAMED WORKS</span>
              </div>
              <span className="font-mono text-xs text-stone-500">
                3 OIL & LIGHT MEMORIES
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {artworks.map((art, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border-4 border-amber-800/30 p-4 space-y-3 shadow-xl bg-white relative overflow-hidden group"
                >
                  {/* Ornate Frame Inner Box */}
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-900 border-2 border-amber-600/30">
                    {art.photo ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={art.photo}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-mono text-xs text-stone-500">
                        COLLECTION WORK
                      </div>
                    )}
                  </div>

                  {/* Brass Plaque Beneath Painting */}
                  <div className="p-3 rounded-lg bg-amber-50/80 border border-amber-600/20 text-center space-y-1">
                    <h4 className="font-serif font-bold text-sm text-stone-900">
                      {art.title}
                    </h4>
                    <p className="font-mono text-[9px] uppercase tracking-wider text-amber-800 font-semibold">
                      {art.medium}
                    </p>
                    <p className="font-serif italic text-xs text-stone-600 pt-0.5 leading-snug">
                      &ldquo;{art.desc}&rdquo;
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* =============================================================== */}
          {/* SEKSI 5: 4 VOWS OF PRESERVATION & ENDOWMENT (IKRAR CINTA)       */}
          {/* =============================================================== */}
          <section className="space-y-6">
            <div className="border-b border-stone-300 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-stone-800 font-mono text-xs tracking-widest uppercase">
                <Heart className="h-4 w-4 text-rose-600" />
                <span>VOWS OF PRESERVATION // 4 COVENANTS</span>
              </div>
              <span className="font-mono text-xs text-stone-500">
                ENDURING DEVOTION
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {vows.map((vow, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-stone-200 p-5 space-y-2 bg-white shadow-sm"
                >
                  <div className="flex items-center justify-between pb-1 border-b border-stone-100">
                    <span className="font-mono text-[10px] text-amber-800 uppercase tracking-widest font-bold">
                      COVENANT #{idx + 1}
                    </span>
                    <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
                  </div>

                  <h4 className="font-serif font-bold text-base text-stone-900">
                    {vow.title}
                  </h4>
                  <p className="font-sans text-xs text-stone-600 leading-relaxed">
                    {vow.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Leave a Rose Tribute Button */}
            <div className="pt-4 text-center">
              <button
                type="button"
                onClick={handleGiveRose}
                className={cn(
                  "inline-flex items-center gap-2 px-8 py-3 rounded-full font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-md cursor-pointer",
                  hasGivenRose
                    ? "border border-rose-400 bg-rose-50 text-rose-800"
                    : "border border-stone-300 bg-white text-stone-800 hover:bg-stone-50 hover:border-amber-600"
                )}
              >
                <Heart className="h-4 w-4 text-rose-600 fill-rose-600" />
                <span>
                  {`Persembahkan Bunga Mawar (${roseCount} Mawar Keabadian)`}
                </span>
              </button>
            </div>
          </section>

          {/* =============================================================== */}
          {/* FOOTER: SHARE EXHIBITION                                        */}
          {/* =============================================================== */}
          <footer className="border-t border-stone-300 pt-8 text-center space-y-4">
            <div className="space-y-1">
              <p className="font-serif italic text-stone-600 text-sm">
                &ldquo;Karya seni terindah di semesta ini adalah kemampuan dua jiwa untuk saling mencintai tanpa batas waktu.&rdquo;
              </p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-stone-400">
                {`THE MUSEUM OF US © 2026 • DEDICATED TO ${content.recipientName}`}
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-stone-300 bg-white text-stone-800 font-mono text-xs uppercase tracking-wider hover:bg-stone-100 transition-colors shadow-sm cursor-pointer"
              >
                {copiedLink ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Tautan Pameran Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="h-3.5 w-3.5" />
                    <span>Bagikan Pameran Cinta Ini</span>
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

export function MuseumOfUsTemplate({
  data,
  className,
}: MuseumOfUsTemplateProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f7f5f0]" />}>
      <MuseumOfUsTemplateInner data={data} className={className} />
    </Suspense>
  );
}
