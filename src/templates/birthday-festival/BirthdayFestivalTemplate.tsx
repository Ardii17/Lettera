"use client";

import { useRef, useState, Suspense } from "react";
import { usePathname } from "next/navigation";
import {
  Ticket,
  Music2,
  Sparkles,
  Pause,
  Play,
  Share2,
  Check,
  Disc3,
  Volume2,
  VolumeX,
  Radio,
  Heart,
  Flame,
  Award,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { toParagraphs } from "@/lib/utils/format";
import type { LetterContent } from "@/types/letter";
import { withDefaults } from "../utils";

interface BirthdayFestivalTemplateProps {
  data: LetterContent;
  className?: string;
}

const defaults: Record<string, string> = {
  recipientName: "Clarissa Aurelia",
  ageNumber: "25",
  festivalName: "AURELIAFEST // THE 25TH SOLAR TOUR",
  festivalDate: "Saturday, 24 October 2026 // Gates Open 16:00",
  festivalVenue: "The Life Amphitheater & Sunset Arena",
  specialGuests: "The Besties Ensemble • Family Choir • Forever Friends",
  posterPhotoUrl:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
  festivalTagline:
    "Sebuah perayaan tanpa henti untuk merayakan energi, tawa, dan melodi terindah dari sang bintang utama dalam tur mengelilingi matahari.",

  letterTitle: "Tour Manager's Log: Sebuah Catatan Cinta di Balik Panggung Akbar",
  letterContent:
    "Kepada sang headliner paling bersinar di panggung kehidupan...\n\nMenyaksikan caramu melangkah menaklukkan setiap panggung waktu adalah salah satu hal paling menginspirasi yang pernah kusaksikan. Dari awal mula latihan kecil di masa lalu hingga pertunjukan spektakuler babak usia ke-25 ini, kau tak pernah kehilangan ketulusan hatimu.\n\nTerima kasih telah menjadi rekan seperjalanan yang paling luar biasa, sosok yang selalu menyebarkan tawa hangat di ruang tunggu tergelap, dan inspirasi bagi siapa pun yang beruntung berada di orbitmu. Di tur usiamu yang baru ini, semoga setiap nada hidupmu senantiasa selaras dengan kebahagiaan, stadion masa depanmu dipenuhi cinta, dan panggung impianmu tersenyum menyambut langkahmu.\n\nPlay it loud, sang bintang utama!",
  tourManagerName: "Rian Danuarta",
  tourManagerTitle: "Head of Crew & Lifetime Companion // Sahabat Sejati",

  track1Duration: "03:45",
  track1Title: "The Acoustic Intro: Langkah Pertama & Imajinasi",
  track1Era: "Era Masa Kecil // Acoustic Roots",
  track1Desc:
    "Melodi riang masa kecil di mana setiap mimpi tampak begitu dekat dan dunia terasa penuh nada-nada gembira.",

  track2Duration: "04:12",
  track2Title: "Electric Rebellion: Melodi Keberanian & Persahabatan",
  track2Era: "Era Remaja // Indie Rock Spirit",
  track2Desc:
    "Ketukan drum yang mengiringi pencarian jati diri, tawa lepas bersama sahabat, dan keberanian mencoba hal baru.",

  track3Duration: "04:50",
  track3Title: "Anthem of Triumph: Supernova Karya & Ketangguhan",
  track3Era: "Era Dewasa Awal // Arena Rock",
  track3Desc:
    "Harmoni megah saat kau menaklukkan badai kehidupan dan membuktikan kehebatan hatimu di hadapan banyak orang.",

  track4Duration: "05:25",
  track4Title: "The Golden Encore: Babak Usia Baru & Doa Langit",
  track4Era: "Babak Usia Baru // Symphony of Hope",
  track4Desc:
    "Lagu penutup yang megah menyambut tahun baru dengan kehangatan cinta, kelapangan dada, dan harapan tanpa batas.",

  polaroid1Photo:
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
  polaroid1Title: "Soundcheck Tawa Hangat",
  polaroid1Stage: "GREEN ROOM // PRE-SHOW",
  polaroid1Desc:
    "Momen sebelum panggung dimulai ketika segelas es kopi dan obrolan santai mampu meredakan segala ketegangan.",

  polaroid2Photo:
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
  polaroid2Title: "Gemerlap Cahaya Sorot Malam",
  polaroid2Stage: "MAIN STAGE // LIVE CONCERT",
  polaroid2Desc:
    "Ketika energi positifmu menyala dan seluruh ruangan serempak tersenyum menyaksikan kebahagiaanmu.",

  polaroid3Photo:
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
  polaroid3Title: "Pelukan Usai Konser Akbar",
  polaroid3Stage: "AFTERSTAGE // CREW CIRCLE",
  polaroid3Desc:
    "Tanda terima kasih tak terhingga atas setiap detik kebersamaan yang telah kita lalui bersama.",

  voucher1Title: "Free Coffee Rider Pass",
  voucher1Desc:
    "Traktir kopi favorit sepuasnya di cafe pilihanmu kapan pun kau butuh jeda dari padatnya jadwal.",

  voucher2Title: "24/7 Backstage Curhat Hotline",
  voucher2Desc:
    "Akses telepon dan temu kangen darurat kapan pun kau butuh pendengar setia tanpa dihakimi.",

  voucher3Title: "Festival Roadtrip Companion",
  voucher3Desc:
    "Tiket jalan-jalan santai mencari angin segar, hunting kuliner lezat, dan berburu sunset bersama.",

  voucher4Title: "Secret VIP Birthday Rider Box",
  voucher4Desc:
    "Kupon klaim untuk ditukar dengan satu barang impian yang sedang bertengger di wishlist teratasmu.",

  primaryColor: "#180e29",
  accentColor: "#f97316",
  backgroundColor: "#0d0718",
  cardColor: "#1c122e",
  textColor: "#faf5ff",
  musicTitle: "Live Festival Acoustic & Indie Celebration",
  musicUrl:
    "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=ambient-piano-amp-strings-10711.mp3",
};

function BirthdayFestivalTemplateInner({
  data,
  className,
}: BirthdayFestivalTemplateProps) {
  const content = withDefaults(defaults, data);
  const pathname = usePathname();
  const isThumbnail = className?.includes("thumbnail") || false;

  // Interactivity States
  const [hasEntered, setHasEntered] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [claimedVouchers, setClaimedVouchers] = useState<Record<number, boolean>>({});
  const [cheerCount, setCheerCount] = useState(25);
  const [hasCheered, setHasCheered] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTrack, setActiveTrack] = useState<number | null>(null);

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

  const handleEnterFestival = () => {
    setHasEntered(true);
    if (audioRef.current && !isPlayingAudio) {
      audioRef.current.play().catch(() => {});
      setIsPlayingAudio(true);
    }
  };

  const toggleClaimVoucher = (idx: number) => {
    setClaimedVouchers((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const handleCheer = () => {
    setCheerCount((prev) => prev + 1);
    setHasCheered(true);
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const paragraphs = toParagraphs(content.letterContent);

  const tracks = [
    {
      duration: content.track1Duration,
      title: content.track1Title,
      era: content.track1Era,
      desc: content.track1Desc,
    },
    {
      duration: content.track2Duration,
      title: content.track2Title,
      era: content.track2Era,
      desc: content.track2Desc,
    },
    {
      duration: content.track3Duration,
      title: content.track3Title,
      era: content.track3Era,
      desc: content.track3Desc,
    },
    {
      duration: content.track4Duration,
      title: content.track4Title,
      era: content.track4Era,
      desc: content.track4Desc,
    },
  ];

  const polaroids = [
    {
      photo: content.polaroid1Photo,
      title: content.polaroid1Title,
      stage: content.polaroid1Stage,
      desc: content.polaroid1Desc,
    },
    {
      photo: content.polaroid2Photo,
      title: content.polaroid2Title,
      stage: content.polaroid2Stage,
      desc: content.polaroid2Desc,
    },
    {
      photo: content.polaroid3Photo,
      title: content.polaroid3Title,
      stage: content.polaroid3Stage,
      desc: content.polaroid3Desc,
    },
  ];

  const vouchers = [
    { title: content.voucher1Title, desc: content.voucher1Desc },
    { title: content.voucher2Title, desc: content.voucher2Desc },
    { title: content.voucher3Title, desc: content.voucher3Desc },
    { title: content.voucher4Title, desc: content.voucher4Desc },
  ];

  return (
    <div
      className={cn(
        "relative min-h-screen w-full overflow-x-hidden transition-colors duration-700 font-sans selection:bg-orange-500/30 selection:text-orange-200",
        className
      )}
      style={{
        backgroundColor: content.backgroundColor,
        color: content.textColor,
      }}
    >
      {/* Background Concert Spotlight & Neon Gradients */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(ellipse at 50% 0%, ${content.accentColor}33 0%, transparent 60%), radial-gradient(circle at 100% 100%, ${content.primaryColor} 0%, transparent 70%)`,
          }}
        />
        {/* Subtle Stage Grid Lines */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff15 1px, transparent 1px), linear-gradient(to bottom, #ffffff15 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Floating Concert Audio Player */}
      {content.musicUrl && !isThumbnail && pathname !== "/templates" && (
        <>
          <audio ref={audioRef} src={content.musicUrl} loop preload="none" />
          <div className="fixed bottom-6 right-6 z-50">
            <button
              type="button"
              onClick={toggleAudio}
              className="flex items-center gap-3 px-4 py-2 rounded-full border border-orange-500/50 bg-stone-950/90 text-orange-200 shadow-2xl backdrop-blur-md hover:bg-stone-900 transition-all cursor-pointer"
              aria-label={isPlayingAudio ? "Jeda musik festival" : "Putar musik festival"}
            >
              <div className="relative flex items-center justify-center">
                {isPlayingAudio ? (
                  <>
                    <span className="absolute -inset-1 rounded-full bg-orange-400/30 animate-ping" />
                    <Volume2 className="h-4 w-4 text-orange-400" />
                  </>
                ) : (
                  <VolumeX className="h-4 w-4 text-stone-400" />
                )}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-[10px] uppercase font-mono tracking-widest text-stone-400">
                  {isPlayingAudio ? "Live Audio Playing" : "Festival Audio"}
                </p>
                <p className="text-xs font-semibold text-orange-100 max-w-[130px] truncate">
                  {content.musicTitle}
                </p>
              </div>
              {isPlayingAudio ? (
                <Pause className="h-3.5 w-3.5 text-orange-300" />
              ) : (
                <Play className="h-3.5 w-3.5 text-orange-300 fill-orange-300" />
              )}
            </button>
          </div>
        </>
      )}

      {/* =================================================================== */}
      {/* 1. HERO: ALL-ACCESS VIP LANYARD PASS & WRISTBAND                    */}
      {/* =================================================================== */}
      {!hasEntered && !isThumbnail ? (
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 text-center">
          <div className="w-full max-w-sm sm:max-w-md space-y-6">
            {/* Lanyard Top Strap */}
            <div className="w-16 h-8 mx-auto bg-gradient-to-r from-orange-500 via-amber-400 to-orange-600 rounded-t-lg shadow-md border-x-2 border-stone-800" />

            {/* VIP Pass Card Container */}
            <div
              className="relative rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border-2 border-orange-500/40 backdrop-blur-md overflow-hidden text-left"
              style={{ backgroundColor: content.cardColor }}
            >
              {/* Holographic Watermark Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-5 relative z-10 font-mono">
                {/* Badge Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-1.5 text-orange-400 text-xs font-bold tracking-widest uppercase">
                    <Flame className="h-4 w-4" />
                    <span>WORLD TOUR // VIP</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 text-[10px] font-bold">
                    EDITION #{content.ageNumber}
                  </span>
                </div>

                {/* Festival Name & Headliner */}
                <div className="space-y-1">
                  <p className="text-[10px] uppercase text-stone-400">
                    HEADLINER ARTIST
                  </p>
                  <h1 className="font-serif font-bold text-3xl sm:text-4xl text-white tracking-wide">
                    {content.recipientName}
                  </h1>
                  <p className="font-mono text-xs text-orange-300 pt-0.5">
                    {content.festivalName}
                  </p>
                </div>

                {/* Event Schedule Info */}
                <div className="grid grid-cols-2 gap-2 text-xs border-y border-white/10 py-3">
                  <div>
                    <span className="text-stone-400 text-[9px] uppercase">
                      DATE & SCHEDULE
                    </span>
                    <p className="text-stone-200 text-[11px] truncate">
                      {content.festivalDate}
                    </p>
                  </div>
                  <div>
                    <span className="text-stone-400 text-[9px] uppercase">
                      ARENA VENUE
                    </span>
                    <p className="text-stone-200 text-[11px] truncate">
                      {content.festivalVenue}
                    </p>
                  </div>
                </div>

                {/* Barcode Strip */}
                <div className="pt-1 flex items-center justify-between text-stone-500 text-[10px] tracking-[0.25em] select-none">
                  <span>||||| ||| ||||||| |||| |||||| |||||</span>
                  <span className="font-mono text-[9px] text-orange-400 font-bold">
                    ALL-ACCESS PASS
                  </span>
                </div>
              </div>
            </div>

            {/* Enter Festival Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleEnterFestival}
                className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-mono text-xs uppercase tracking-widest font-bold text-stone-950 bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:shadow-[0_0_40px_rgba(249,115,22,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <Ticket className="h-4 w-4 text-stone-900 group-hover:rotate-12 transition-transform duration-300" />
                <span>Klaim Gelang VIP • Masuk Arena</span>
                <Sparkles className="h-4 w-4 text-stone-900" />
              </button>
            </div>

            <p className="font-mono text-[10px] text-stone-400 tracking-widest">
              OFFICIAL WRISTBAND • SPECIAL EDITION
            </p>
          </div>
        </div>
      ) : (
        /* ================================================================= */
        /* 2. MAIN FESTIVAL GROUNDS & STAGES                                 */
        /* ================================================================= */
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-16 sm:space-y-24">
          {/* =============================================================== */}
          {/* SEKSI 1: MAIN STAGE HEADLINER LINEUP POSTER                     */}
          {/* =============================================================== */}
          <section className="space-y-6 text-center">
            {/* Festival Stage Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-orange-500/40 bg-orange-950/30 text-orange-300 font-mono text-xs tracking-widest">
              <Radio className="h-3.5 w-3.5 text-orange-400 animate-pulse" />
              <span>MAIN STAGE LIVE • WORLD TOUR 2026</span>
            </div>

            <div className="space-y-2">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-orange-400">
                Presents The Annual Celebration
              </p>
              <h1 className="font-serif text-5xl sm:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-orange-100 to-orange-400">
                {content.recipientName}
              </h1>
              <p className="font-mono text-sm sm:text-base text-stone-300 uppercase tracking-wider">
                {content.festivalName}
              </p>
            </div>

            {/* Festival Poster Display */}
            <div
              className="max-w-3xl mx-auto rounded-3xl border border-stone-800 p-6 sm:p-8 backdrop-blur-md shadow-2xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left"
              style={{ backgroundColor: `${content.cardColor}dd` }}
            >
              {/* Headliner Photo */}
              <div className="md:col-span-5 relative aspect-[3/4] rounded-2xl overflow-hidden border border-orange-500/30 shadow-xl bg-black">
                {content.posterPhotoUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={content.posterPhotoUrl}
                    alt={content.recipientName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-mono text-xs text-stone-500">
                    HEADLINER PHOTO
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 text-center font-mono text-[10px] text-orange-300 tracking-widest uppercase">
                  {`MAIN STAGE HEADLINER • EPISODE #${content.ageNumber}`}
                </div>
              </div>

              {/* Lineup & Festival Metadata */}
              <div className="md:col-span-7 space-y-4 font-mono">
                <div className="space-y-1">
                  <span className="text-[10px] text-orange-400 uppercase tracking-widest">
                    SUPPORTING ACTS & SPECIAL GUESTS
                  </span>
                  <p className="font-serif font-bold text-lg text-white">
                    {content.specialGuests}
                  </p>
                </div>

                <div className="space-y-2 text-xs border-y border-white/10 py-3">
                  <div>
                    <span className="text-stone-400 text-[10px] uppercase">
                      VENUE & STAGE
                    </span>
                    <p className="text-stone-200 text-xs">{content.festivalVenue}</p>
                  </div>
                  <div>
                    <span className="text-stone-400 text-[10px] uppercase">
                      DATE & SCHEDULE
                    </span>
                    <p className="text-stone-200 text-xs">{content.festivalDate}</p>
                  </div>
                </div>

                <p className="font-sans text-xs sm:text-sm text-stone-300 leading-relaxed italic">
                  &ldquo;{content.festivalTagline}&rdquo;
                </p>

                <div className="pt-1 flex items-center justify-between text-[11px] text-orange-300">
                  <span>STATUS: SOLD OUT</span>
                  <span>ALL-ACCESS VIP GRANTED</span>
                </div>
              </div>
            </div>
          </section>

          {/* =============================================================== */}
          {/* SEKSI 2: BACKSTAGE TOUR MANIFESTO (SURAT MANAJER TUR)           */}
          {/* =============================================================== */}
          <section className="space-y-6">
            <div className="border-b border-stone-800 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-orange-400 font-mono text-xs tracking-widest uppercase">
                <Music2 className="h-4 w-4" />
                <span>TOUR MANAGER&apos;S MANIFESTO // DISPATCH</span>
              </div>
              <span className="font-mono text-xs text-stone-500">
                OFFICIAL ROAD LOG
              </span>
            </div>

            <div
              className="rounded-3xl border border-stone-800 p-6 sm:p-10 backdrop-blur-md shadow-2xl relative space-y-6"
              style={{ backgroundColor: `${content.cardColor}ee` }}
            >
              {/* Metallic Clipboard Header */}
              <div className="w-16 h-3 mx-auto bg-stone-700 rounded-full border border-stone-600 mb-2" />

              <div className="border-b border-white/10 pb-4 space-y-1">
                <p className="font-mono text-[10px] text-orange-400 uppercase tracking-widest">
                  MEMO KHUSUS DARI RUANG MANAJER TUR
                </p>
                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-white">
                  {content.letterTitle}
                </h3>
              </div>

              {/* Letter Paragraphs */}
              <div className="space-y-4 font-sans text-sm sm:text-base text-stone-200 leading-relaxed">
                {paragraphs.map((para, idx) => (
                  <p key={idx} className="text-justify sm:text-left">
                    {para}
                  </p>
                ))}
              </div>

              {/* Signature */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <p className="font-mono text-[10px] text-stone-400 uppercase tracking-widest">
                    Ditulis Penuh Bangga Oleh
                  </p>
                  <p className="font-serif font-bold text-lg text-orange-300">
                    {content.tourManagerName}
                  </p>
                  <p className="font-sans text-xs text-stone-400">
                    {content.tourManagerTitle}
                  </p>
                </div>

                <div className="px-4 py-2 rounded-xl border border-orange-500/30 bg-orange-950/20 text-orange-300 font-mono text-[10px] tracking-wider uppercase">
                  VERIFIED TOUR COMPANION
                </div>
              </div>
            </div>
          </section>

          {/* =============================================================== */}
          {/* SEKSI 3: THE SETLIST OF LIFE (4 TREK LAGU)                      */}
          {/* =============================================================== */}
          <section className="space-y-6">
            <div className="border-b border-stone-800 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-orange-400 font-mono text-xs tracking-widest uppercase">
                <Disc3 className="h-4 w-4" />
                <span>THE SETLIST OF LIFE // 4 ERA TRACKS</span>
              </div>
              <span className="font-mono text-xs text-stone-500">
                LIVE STAGE RUNNING ORDER
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tracks.map((track, idx) => {
                const isActive = activeTrack === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setActiveTrack(isActive ? null : idx)}
                    className={cn(
                      "cursor-pointer rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between backdrop-blur-md relative overflow-hidden",
                      isActive
                        ? "border-orange-500 bg-orange-950/20 shadow-[0_0_20px_rgba(249,115,22,0.3)] scale-[1.02]"
                        : "border-stone-800 bg-stone-900/60 hover:border-stone-700"
                    )}
                    style={{ minHeight: "170px" }}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between font-mono text-xs">
                        <span className="text-orange-400 font-bold">
                          TRACK 0{idx + 1}
                        </span>
                        <span className="text-stone-400">{track.duration}</span>
                      </div>

                      <div className="space-y-0.5">
                        <span className="font-mono text-[10px] uppercase text-stone-400">
                          {track.era}
                        </span>
                        <h4 className="font-serif font-bold text-base text-white">
                          {track.title}
                        </h4>
                      </div>

                      <p className="font-sans text-xs text-stone-300 leading-relaxed pt-1">
                        {track.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-stone-500">
                      <span>STATUS: PERFORMED WITH GLORY</span>
                      <Check className="h-3 w-3 text-emerald-400" />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* =============================================================== */}
          {/* SEKSI 4: BACKSTAGE POLAROID LAMINATES (3 FOTO)                  */}
          {/* =============================================================== */}
          <section className="space-y-6">
            <div className="border-b border-stone-800 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-orange-400 font-mono text-xs tracking-widest uppercase">
                <Flame className="h-4 w-4" />
                <span>BACKSTAGE ACCESS // POLAROIDS</span>
              </div>
              <span className="font-mono text-xs text-stone-500">
                3 ROAD CASE MEMOIRS
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {polaroids.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-stone-800 p-4 space-y-3 shadow-xl backdrop-blur-md relative overflow-hidden group"
                  style={{ backgroundColor: `${content.cardColor}dd` }}
                >
                  {/* Faux Gaffer Tape Effect Top */}
                  <div className="w-16 h-4 mx-auto bg-stone-500/40 rounded-sm border-x border-stone-400 -mt-2 rotate-[-2deg]" />

                  {/* Polaroid Photo Box */}
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-black border border-stone-700">
                    {item.photo ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={item.photo}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-mono text-xs text-stone-600">
                        POLAROID PHOTO
                      </div>
                    )}
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/70 text-orange-400 font-mono text-[9px]">
                      {item.stage}
                    </div>
                  </div>

                  {/* Caption */}
                  <div className="space-y-1">
                    <h4 className="font-serif font-bold text-base text-white">
                      {item.title}
                    </h4>
                    <p className="font-sans text-xs text-stone-300 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* =============================================================== */}
          {/* SEKSI 5: 4 FESTIVAL MERCH & PRIVILEGE VOUCHERS                  */}
          {/* =============================================================== */}
          <section className="space-y-6">
            <div className="border-b border-stone-800 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-orange-400 font-mono text-xs tracking-widest uppercase">
                <Award className="h-4 w-4" />
                <span>VIP MERCH RIDER // 4 PRIVILEGES</span>
              </div>
              <span className="font-mono text-xs text-stone-500">
                INTERACTIVE VOUCHERS
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {vouchers.map((voucher, idx) => {
                const isClaimed = claimedVouchers[idx];
                return (
                  <div
                    key={idx}
                    onClick={() => toggleClaimVoucher(idx)}
                    className={cn(
                      "cursor-pointer rounded-2xl p-5 border transition-all duration-300 backdrop-blur-md relative overflow-hidden",
                      isClaimed
                        ? "border-emerald-500 bg-emerald-950/20 shadow-[0_0_20px_rgba(16,185,129,0.25)]"
                        : "border-stone-800 bg-stone-900/60 hover:border-orange-500/40"
                    )}
                  >
                    <div className="flex items-start justify-between pb-2 border-b border-white/10">
                      <span className="font-mono text-[10px] text-orange-400 uppercase tracking-widest">
                        FESTIVAL PASS #{idx + 1}
                      </span>
                      <span
                        className={cn(
                          "px-2 py-0.5 rounded text-[10px] font-mono font-bold",
                          isClaimed
                            ? "bg-emerald-500/20 text-emerald-300"
                            : "bg-white/10 text-stone-400"
                        )}
                      >
                        {isClaimed ? "TERKLAIM" : "BELUM DIKLAIM"}
                      </span>
                    </div>

                    <div className="pt-3 space-y-1">
                      <h4 className="font-serif font-bold text-base text-white">
                        {voucher.title}
                      </h4>
                      <p className="font-sans text-xs text-stone-300 leading-relaxed">
                        {voucher.desc}
                      </p>
                    </div>

                    <div className="mt-4 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono">
                      <span className="text-stone-500">SEUMUR HIDUP</span>
                      <span className="text-orange-400 font-bold hover:underline">
                        {isClaimed ? "Batalkan Klaim" : "Klaim Voucher Ini →"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Standing Ovation / Crowd Cheer Button */}
            <div className="pt-4 text-center">
              <button
                type="button"
                onClick={handleCheer}
                className={cn(
                  "inline-flex items-center gap-2 px-8 py-3 rounded-full font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-xl cursor-pointer",
                  hasCheered
                    ? "border border-orange-400/50 bg-orange-950/40 text-orange-300"
                    : "border border-stone-700 bg-stone-900 text-stone-200 hover:bg-stone-800 hover:border-orange-400"
                )}
              >
                <Heart className="h-4 w-4 text-rose-400 fill-rose-400" />
                <span>
                  {`Crowd Applause (${cheerCount} Sorakan Penonton)`}
                </span>
              </button>
            </div>
          </section>

          {/* =============================================================== */}
          {/* FOOTER: SHARE FESTIVAL                                          */}
          {/* =============================================================== */}
          <footer className="border-t border-stone-800 pt-8 text-center space-y-4">
            <div className="space-y-1">
              <p className="font-serif italic text-stone-400 text-sm">
                &ldquo;Semoga setiap nada dalam babak tur kehidupan barumu selalu melantunkan harmoni kebahagiaan tanpa akhir.&rdquo;
              </p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-stone-500">
                {`THE BIRTHDAY FESTIVAL TOUR © 2026 • CREATED WITH LOVE FOR ${content.recipientName}`}
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-stone-700 bg-stone-900 text-orange-200 font-mono text-xs uppercase tracking-wider hover:bg-stone-800 transition-colors shadow-md cursor-pointer"
              >
                {copiedLink ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Tautan Tiket Festival Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="h-3.5 w-3.5" />
                    <span>Bagikan Tiket Festival Ini</span>
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

export function BirthdayFestivalTemplate({
  data,
  className,
}: BirthdayFestivalTemplateProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0d0718]" />}>
      <BirthdayFestivalTemplateInner data={data} className={className} />
    </Suspense>
  );
}
