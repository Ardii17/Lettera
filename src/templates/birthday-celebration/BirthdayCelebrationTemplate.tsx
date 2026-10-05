"use client";

import { useEffect, useMemo, useRef, useState, Suspense } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import {
  Sparkles,
  Cake,
  Flame,
  Gift,
  Heart,
  PartyPopper,
  Calendar,
  Clock,
  Check,
  Copy,
  Maximize2,
  X,
  Play,
  Pause,
  Disc3,
  Star,
  Award,
  Smile,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { toParagraphs } from "@/lib/utils/format";
import type { LetterContent } from "@/types/letter";
import { withDefaults } from "../utils";

const defaults = {
  recipientName: "Clarissa Aurelia",
  senderName: "Arga & Seluruh Keluarga",
  age: 23,
  birthDate: "2003-10-15",
  heroGreeting: "Happy 23rd Birthday, Sunshine! 🎉",
  heroHeadline: "Merayakan Hadirnya Senyuman Paling Hangat di Dunia",
  heroCoverPhoto:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
  cakeFlavor: "Strawberry Sweet Velvet & Chantilly Cream",
  cakeWishPrompt:
    "Tutup matamu sejenak, bisikkan satu permohonan tulus di hati, lalu klik tombol untuk tiup lilinnya!",
  secretWishMessage:
    "Semoga di usia 23 tahun ini, setiap langkahmu selalu dipeluk rasa aman, setiap impian besarmu didekatkan, dan tawamu tak pernah pudar. Selamat bertambah usia, manusia paling berharga! 🎂✨",
  giftBoxTitle: "Tiket Liburan Berdua & Dinner Spesial Favoritmu 🎁",
  giftBoxMessage:
    "Kado ini disiapkan dengan seluruh cinta! Weekend ini, kita luangkan waktu seharian penuh untuk kulineran, belanja hal favoritmu, dan menikmati senja tanpa gangguan apapun.",
  giftBoxCode: "CLARISSA-SWEET23-TREAT",
  milestoneTitle: "Tiga Babak Indah Menuju Usia Kedewasaan",
  milestone1Year: "2021",
  milestone1Title: "Langkah Berani Memulai Mimpi Baru",
  milestone1Desc: "Saat kamu berani melangkah keluar dari zona nyaman dan membuktikan kemandirianmu.",
  milestone2Year: "2024",
  milestone2Title: "Pencapaian Besar & Karya Membanggakan",
  milestone2Desc: "Menuntaskan tanggung jawab besar dengan senyuman puas dan apresiasi dari banyak orang.",
  milestone3Year: "2026",
  milestone3Title: "Menyambut Era Emas yang Gemilang",
  milestone3Desc: "Memasuki usia 23 dengan hati yang lebih tenang, bijaksana, dan penuh keyakinan diri.",
  galleryPhoto1:
    "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
  galleryCaption1: "Tawa renyah saat perayaan kejutan kecil",
  galleryPhoto2:
    "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80",
  galleryCaption2: "Momen liburan seru di tepi pantai",
  galleryPhoto3:
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
  galleryCaption3: "Menikmati secangkir kopi hangat berdua",
  galleryPhoto4:
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
  galleryCaption4: "Menyanyi lagu favorit sekuat tenaga",
  galleryPhoto5:
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80",
  galleryCaption5: "Senja tenang dengan obrolan masa depan",
  galleryPhoto6:
    "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=80",
  galleryCaption6: "Malam syukuran penuh pelukan hangat",
  wish1Title: "Kesehatan Raga & Jiwa",
  wish1Desc: "Semoga selalu dilimpahi tubuh yang bugar, pikiran yang damai, dan tidur malam yang selalu nyenyak.",
  wish2Title: "Karier & Pintu Rezeki",
  wish2Desc: "Semoga setiap ikhtiar dan cita-citamu dibukakan pintu kemudahan seluas-luasnya dengan hasil terbaik.",
  wish3Title: "Cinta & Ketulusan",
  wish3Desc: "Semoga hatimu selalu hangat, dijauhkan dari rasa kesepian, dan dikelilingi orang yang tulus menyayangimu.",
  wish4Title: "Kemenangan Terbesar",
  wish4Desc: "Semoga impian terbesar yang kamu doakan diam-diam segera diwujudkan semesta di waktu yang tepat.",
  bucketList1: "Menjelajahi kota baru yang selalu ada di daftar impianmu",
  bucketList2: "Menyisihkan waktu luang khusus untuk self-care tanpa rasa bersalah",
  bucketList3: "Mencapai satu target besar yang sedang kamu tekuni saat ini",
  letterTitle: "Sebuah Surat Cinta di Hari Kelahiranmu",
  introMessage: "Untuk seseorang yang kehadirannya selalu menjadi anugerah terindah bagi kami,",
  message:
    "Clarissa,\n\nDua puluh tiga tahun yang lalu, semesta menghadirkan orang sehebat kamu ke dunia—membawa tawa renyah, kebaikan yang tak pernah pamrih, dan kehangatan yang selalu menenangkan siapa pun di dekatmu.\n\nMelihat bagaimana kamu tumbuh, berjuang melewati hari-hari lelah dengan senyuman, dan tetap bertahan menjadi sosok yang lembut adalah kebanggaan terbesar yang kami rasakan. Kamu mungkin sering merasa biasa saja, tapi bagi kami, kamu adalah anugerah luar biasa yang tak tergantikan.\n\nDi hari ulang tahunmu ini, berhentilah sejenak dari segala kesibukan. Nikmati kue manismu, rayakan setiap detik perjalananmu, dan ketahuilah bahwa ada begitu banyak doa yang memelukmu dari dekat maupun jauh.\n\nSelamat ulang tahun ke-23, Clarissa! Semoga langkahmu ke depan semakin terang dan bahagia.",
  closingStatement: "Dengan pelukan paling hangat & doa tanpa henti,",
  signature: "Arga Pranata",
  primaryColor: "#e11d48",
  backgroundColor: "#fffaf7",
  cardColor: "#ffffff",
  textColor: "#1c1917",
  bodyTextColor: "#44403c",
  musicTitle: "",
  bgMusicUrl: "",
};

/** Synthesize celebratory party chime using Web Audio API */
function playCelebrationChime() {
  if (typeof window === "undefined") return;
  try {
    const AudioContext =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (cheerful arpeggio)
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);

      gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + idx * 0.12 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.12 + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.12);
      osc.stop(ctx.currentTime + idx * 0.12 + 0.7);
    });
  } catch {
    // Audio Context not allowed or muted
  }
}

interface BirthdayCelebrationTemplateProps {
  data: LetterContent;
  className?: string;
}

function BirthdayCelebrationTemplateInner({
  data,
  className,
}: BirthdayCelebrationTemplateProps) {
  const content = withDefaults(defaults, data);
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Mode Thumbnail atau Katalog /templates: TIDAK PERNAH menampilkan modal/popup fixed
  const isThumbnail =
    Boolean(data._isThumbnail) ||
    pathname === "/templates" ||
    className?.includes("is-thumbnail") ||
    className?.includes("thumb");

  // Mode Editor Side Preview
  const isEditorPreview =
    Boolean(data._isEditorPreview) ||
    className?.includes("is-editor-preview");

  // Mode Pratinjau Penuh atau Hasil Link Generate Surat Publik
  const isPublicLetter = Boolean(pathname?.startsWith("/letter/"));
  const isFullPreview =
    Boolean(data._isFullPreview) ||
    className?.includes("is-full-preview");
  const isDetailPage = Boolean(pathname?.startsWith("/templates/"));

  const shouldStartClosed =
    (isPublicLetter || isFullPreview || isDetailPage) &&
    !isThumbnail &&
    !isEditorPreview;

  // Nama penerima
  const [recipientName, setRecipientName] = useState<string>(content.recipientName);
  useEffect(() => {
    const queryTo =
      searchParams?.get("to") ||
      searchParams?.get("guest") ||
      searchParams?.get("nama") ||
      searchParams?.get("u");
    if (queryTo && queryTo.trim().length > 0) {
      setRecipientName(queryTo.trim());
    } else {
      setRecipientName(content.recipientName);
    }
  }, [searchParams, content.recipientName]);

  // Status Surat / Pesta Terbuka
  const [isOpened, setIsOpened] = useState<boolean>(!shouldStartClosed);

  // Status Lilin Bolu Ulang Tahun
  const [isCandleBlown, setIsCandleBlown] = useState<boolean>(false);
  const [showConfettiBurst, setShowConfettiBurst] = useState<boolean>(false);

  // Status Kado Kejutan
  const [isGiftOpened, setIsGiftOpened] = useState<boolean>(false);

  // Status Bucket List Checked
  const [checkedBucket, setCheckedBucket] = useState<Record<number, boolean>>({});

  // Lightbox Galeri Foto
  const [lightboxImg, setLightboxImg] = useState<{ url: string; caption: string } | null>(null);

  // Audio Pemutar Lagu Pesta
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const toggleMusic = () => {
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

  // Tiup Lilin
  const handleBlowCandle = () => {
    setIsCandleBlown(true);
    setShowConfettiBurst(true);
    playCelebrationChime();

    setTimeout(() => {
      setShowConfettiBurst(false);
    }, 4500);
  };

  // Nyalakan Lilin Kembali
  const handleRelightCandle = () => {
    setIsCandleBlown(false);
  };

  // Buka Surat Utama
  const handleOpenParty = () => {
    setIsOpened(true);

    if (content.bgMusicUrl && audioRef.current && !isThumbnail && pathname !== "/templates") {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }

    setTimeout(() => {
      const target = document.getElementById("birthday-cake-stage");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }, 250);
  };

  // Salin Tautan
  const [copiedLink, setCopiedLink] = useState(false);
  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Hitung Hari Kebahagiaan
  const totalDaysAlive = useMemo(() => {
    if (!content.birthDate) {
      return Number(content.age || 23) * 365;
    }
    const birth = new Date(content.birthDate);
    if (isNaN(birth.getTime())) return Number(content.age || 23) * 365;
    const now = new Date();
    const diffMs = Math.max(0, now.getTime() - birth.getTime());
    return Math.floor(diffMs / (1000 * 60 * 60 * 24));
  }, [content.birthDate, content.age]);

  const paragraphs = toParagraphs(content.message);

  // Palet Warna Dinamis
  const primary = content.primaryColor || "#e11d48";
  const bg = content.backgroundColor || "#fffaf7";
  const card = content.cardColor || "#ffffff";
  const textColor = content.textColor || "#1c1917";
  const bodyText = content.bodyTextColor || "#44403c";

  // Konfeti floating statis di latar belakang
  const backgroundConfetti = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: `${(i * 5.8) % 96}%`,
      top: `${(i * 7.3) % 94}%`,
      size: 8 + (i % 6) * 2,
      rotate: (i * 35) % 360,
      color: [
        primary,
        "#f59e0b",
        "#10b981",
        "#3b82f6",
        "#ec4899",
        "#8b5cf6",
      ][i % 6],
    }));
  }, [primary]);

  return (
    <div
      className={cn("relative min-h-screen font-sans selection:bg-rose-100", className)}
      style={{ backgroundColor: bg, color: bodyText }}
    >
      {/* Background Floating Confetti Dots */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
        {backgroundConfetti.map((c) => (
          <div
            key={c.id}
            className="absolute rounded-sm"
            style={{
              left: c.left,
              top: c.top,
              width: `${c.size}px`,
              height: `${c.size}px`,
              backgroundColor: c.color,
              transform: `rotate(${c.rotate}deg)`,
            }}
          />
        ))}
      </div>

      {/* Audio Elemen Tersembunyi */}
      {!isThumbnail && pathname !== "/templates" && content.bgMusicUrl && (
        <audio ref={audioRef} src={content.bgMusicUrl} loop preload="none" />
      )}

      {/* Floating Music Button */}
      {!isThumbnail &&
        !isEditorPreview &&
        pathname !== "/templates" &&
        (isPublicLetter || isFullPreview || isDetailPage) &&
        content.bgMusicUrl &&
        isOpened && (
          <button
            type="button"
            onClick={toggleMusic}
            className="fixed right-5 bottom-6 z-40 flex items-center gap-2 rounded-full border border-white/60 px-4 py-2.5 shadow-2xl backdrop-blur-md transition-all hover:scale-105 active:scale-95"
            style={{ backgroundColor: primary, color: "#ffffff" }}
            aria-label={isPlaying ? "Jeda musik pesta" : "Putar lagu pesta"}
          >
            <Disc3 className={cn("h-4 w-4", isPlaying && "animate-spin")} />
            <span className="text-xs font-semibold pr-1">
              {isPlaying ? "Musik Pesta Mengalun" : "Putar Lagu Pesta"}
            </span>
            {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          </button>
        )}

      {/* ========================================================================= */}
      {/* 1. JENDELA PEMBUKA MENGAPUNG (FLOATING OPENING WINDOW BOX - SOLID)        */}
      {/* Hanya tampil saat surat pertama kali dibuka (!isOpened di FullPreview/Public) */}
      {/* ========================================================================= */}
      {!isOpened && (isPublicLetter || isFullPreview) ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-300"
          style={{
            backgroundColor: "rgba(15, 12, 12, 0.85)",
            backdropFilter: "blur(12px)",
          }}
        >
          {/* BOX JENDELA PEMBUKA MENGAPUNG DENGAN BACKGROUND SOLID */}
          <div
            className="relative w-full max-w-lg rounded-3xl border-2 p-6 sm:p-10 text-center shadow-2xl overflow-hidden my-auto animate-in zoom-in-95 duration-400"
            style={{
              backgroundColor: card,
              borderColor: `${primary}50`,
              boxShadow: `0 25px 60px -15px ${primary}40, 0 10px 25px -5px rgba(0, 0, 0, 0.4)`,
            }}
          >
            {/* Garis Pita Pesta Bagian Atas */}
            <div
              className="absolute top-0 inset-x-0 h-2.5"
              style={{
                background: `linear-gradient(90deg, ${primary}, #f59e0b, #ec4899, ${primary})`,
              }}
            />

            {/* Aksen Emoji Sudut */}
            <div className="absolute top-4 left-4 text-sm select-none">🎈</div>
            <div className="absolute top-4 right-4 text-sm select-none">🎉</div>

            {/* Badge Pembuka */}
            <div
              className="inline-flex items-center gap-1.5 rounded-full border px-4 py-1 text-xs font-bold uppercase tracking-wider shadow-2xs"
              style={{
                borderColor: `${primary}30`,
                backgroundColor: `${primary}10`,
                color: primary,
              }}
            >
              <PartyPopper className="h-3.5 w-3.5" />
              <span>{content.heroGreeting || `Happy ${content.age}th Birthday!`}</span>
            </div>

            {/* Foto Potret Utama & Badge Usia */}
            {content.heroCoverPhoto && (
              <div className="relative mx-auto my-4 flex justify-center">
                <div
                  className="relative h-32 w-32 sm:h-40 sm:w-40 overflow-hidden rounded-full border-4 shadow-xl"
                  style={{ borderColor: primary }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={content.heroCoverPhoto}
                    alt={recipientName}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div
                  className="absolute bottom-0 right-1/2 translate-x-12 sm:translate-x-16 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border-2 border-white text-white font-serif text-base sm:text-lg font-bold shadow-md"
                  style={{ backgroundColor: primary }}
                >
                  {content.age}th
                </div>
              </div>
            )}

            {/* Nama & Headline */}
            <div className="space-y-2 pt-1">
              <p className="font-mono text-[11px] uppercase tracking-widest text-stone-500 font-semibold">
                Hari Spesial Untuk Orang Paling Berharga
              </p>
              <h1
                className="font-serif text-2xl sm:text-4xl font-extrabold tracking-tight"
                style={{ color: textColor }}
              >
                {recipientName}
              </h1>
              {content.heroHeadline && (
                <p className="text-xs sm:text-sm text-stone-600 font-medium italic max-w-sm mx-auto leading-relaxed">
                  &ldquo;{content.heroHeadline}&rdquo;
                </p>
              )}
              <p className="text-[11px] text-stone-500 pt-1">
                Dipersembahkan dengan penuh cinta oleh:{" "}
                <span className="font-semibold text-stone-800">{content.senderName}</span>
              </p>
            </div>

            {/* Tombol Utama Buka Surat & Pesta */}
            <div className="pt-5">
              <button
                type="button"
                onClick={handleOpenParty}
                className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm sm:text-base font-bold tracking-wide text-white shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 w-full sm:w-auto"
                style={{ backgroundColor: primary }}
              >
                <Cake className="h-5 w-5" />
                <span>Mulai Perayaan & Buka Surat 🎂</span>
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* ========================================================================= */}
      {/* 2. HERO BANNER ATAS (Tampil di Halaman Surat Saat Terbuka / Editor Preview)*/}
      {/* ========================================================================= */}
      <section
        className={cn(
          "relative flex w-full flex-col items-center justify-center overflow-hidden px-4 text-center py-12 sm:py-16 transition-all duration-700",
          !isOpened && (isPublicLetter || isFullPreview) && "hidden",
        )}
        style={{
          background: `radial-gradient(ellipse at center, ${primary}18 0%, ${bg} 100%)`,
        }}
      >
        <div className="relative z-10 mx-auto flex w-full max-w-xl flex-col items-center space-y-5">
          {/* Badge Pesta */}
          <div className="inline-flex items-center gap-2 rounded-full border border-stone-200 bg-white/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider shadow-xs backdrop-blur-sm">
            <PartyPopper className="h-3.5 w-3.5" style={{ color: primary }} />
            <span style={{ color: primary }}>
              {content.heroGreeting || `Happy ${content.age}th Birthday!`}
            </span>
          </div>

          {/* Potret Utama / Birthday Star */}
          {content.heroCoverPhoto && (
            <div className="relative">
              <div
                className="relative h-32 w-32 sm:h-40 sm:w-40 overflow-hidden rounded-full border-4 shadow-2xl transition-transform hover:scale-105"
                style={{ borderColor: primary }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={content.heroCoverPhoto}
                  alt={recipientName}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Angka Usia Badge */}
              <div
                className="absolute -bottom-2 -right-2 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border-2 border-white text-white font-serif text-base sm:text-lg font-bold shadow-lg"
                style={{ backgroundColor: primary }}
              >
                {content.age}th
              </div>
            </div>
          )}

          {/* Nama Penerima & Headline */}
          <div className="space-y-1.5 max-w-lg">
            <p className="font-mono text-[11px] uppercase tracking-widest text-stone-500 font-semibold">
              Hari Spesial Untuk Orang Paling Berharga
            </p>
            <h1
              className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight"
              style={{ color: textColor }}
            >
              {recipientName}
            </h1>
            <p className="text-sm sm:text-base text-stone-600 font-medium leading-relaxed">
              &ldquo;{content.heroHeadline}&rdquo;
            </p>
            <p className="text-xs text-stone-500 pt-0.5">
              Dipersembahkan dengan penuh cinta oleh:{" "}
              <span className="font-semibold text-stone-800">{content.senderName}</span>
            </p>
          </div>

          {isThumbnail ? (
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-xs font-bold text-stone-800 shadow-sm border border-stone-200">
              <Cake className="h-4 w-4 text-rose-500" />
              <span>Pesta Ulang Tahun & Kue</span>
            </div>
          ) : null}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. AREA KONTEN UTAMA PERAYAAN (SELEBRASI KLASIK)                           */}
      {/* Tersembunyi saat !isOpened di FullPreview/Public sehingga tidak bertumpuk  */}
      {/* ========================================================================= */}
      <div
        className={cn(
          "mx-auto max-w-4xl px-4 py-12 sm:px-6 space-y-20 transition-all duration-500",
          !isOpened && (isPublicLetter || isFullPreview) && "hidden",
        )}
      >
        {/* ======================================================================= */}
        {/* 2A. BOLU ULANG TAHUN INTERAKTIF & TIUP LILIN */}
        {/* ======================================================================= */}
        <section
          id="birthday-cake-stage"
          className="relative rounded-3xl border-2 p-6 sm:p-10 shadow-xl text-center space-y-6 overflow-hidden backdrop-blur-sm"
          style={{ backgroundColor: card, borderColor: `${primary}30` }}
        >
          {/* Ledakan Konfeti Ketika Lilin Ditiup */}
          {showConfettiBurst && (
            <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center overflow-hidden">
              <div className="animate-ping text-5xl">🎉 🎂 ✨ 🎊</div>
            </div>
          )}

          <div className="space-y-1">
            <div
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest"
              style={{ color: primary }}
            >
              <Cake className="h-4 w-4" />
              <span>Make A Wish & Candle Ritual</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold" style={{ color: textColor }}>
              Kue Bolu Ulang Tahun Spesial
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Varian: <span className="font-semibold text-stone-700">{content.cakeFlavor}</span>
            </p>
          </div>

          {/* VISUAL KUE BOLU DENGAN LILIN */}
          <div className="relative mx-auto my-6 flex flex-col items-center justify-center max-w-xs">
            {/* Lilin Ulang Tahun */}
            <div className="relative z-10 flex items-end justify-center gap-4 mb-1">
              {[1, 2, 3].map((candleIndex) => (
                <div key={candleIndex} className="flex flex-col items-center">
                  {/* Api Lilin */}
                  {!isCandleBlown ? (
                    <div className="relative flex flex-col items-center">
                      <div className="h-5 w-3 rounded-full bg-amber-400 blur-2xs animate-pulse" />
                      <div className="absolute top-1 h-3 w-1.5 rounded-full bg-white" />
                      <span className="h-2 w-0.5 bg-stone-700" />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      {/* Asap Lilin */}
                      <span className="text-[10px] text-stone-400 font-mono animate-bounce opacity-70">
                        ~
                      </span>
                      <span className="h-2 w-0.5 bg-stone-700" />
                    </div>
                  )}

                  {/* Batang Lilin Garis-Garis */}
                  <div
                    className="h-14 w-3.5 rounded-t-sm shadow-sm border border-stone-200"
                    style={{
                      background: `repeating-linear-gradient(45deg, #ffffff, #ffffff 4px, ${primary} 4px, ${primary} 8px)`,
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Tingkat Kue Atas */}
            <div
              className="relative h-14 w-44 rounded-t-2xl border-2 border-b-0 shadow-md flex items-center justify-center"
              style={{
                backgroundColor: "#fff1f2",
                borderColor: "#fecdd3",
              }}
            >
              {/* Lelehan Krim / Icing Droplets */}
              <div className="absolute top-0 inset-x-2 flex justify-between">
                {[1, 2, 3, 4, 5].map((d) => (
                  <span
                    key={d}
                    className="h-3 w-3 rounded-full bg-white shadow-2xs -mt-1"
                  />
                ))}
              </div>
              <span className="font-serif text-xs font-bold text-rose-800 tracking-wider">
                {content.age} YEARS OF JOY
              </span>
            </div>

            {/* Tingkat Kue Bawah */}
            <div
              className="relative h-20 w-60 rounded-2xl border-2 shadow-lg flex items-center justify-center"
              style={{
                backgroundColor: "#ffe4e6",
                borderColor: "#fecdd3",
              }}
            >
              <div className="flex items-center gap-1.5">
                <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-rose-900">
                  {recipientName}
                </span>
                <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
              </div>
            </div>

            {/* Piring Kue Emas / Tatakan */}
            <div className="h-3 w-72 rounded-full bg-amber-300 border border-amber-400 shadow-md -mt-1" />
          </div>

          {/* Teks Instruksi Tiup Lilin / Pesan Rahasia */}
          {!isCandleBlown ? (
            <div className="space-y-4 max-w-md mx-auto">
              <p className="text-xs sm:text-sm text-stone-600 italic leading-relaxed">
                &ldquo;{content.cakeWishPrompt}&rdquo;
              </p>
              <button
                type="button"
                suppressHydrationWarning
                onClick={handleBlowCandle}
                className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-xs sm:text-sm font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
                style={{ backgroundColor: primary }}
              >
                <Flame className="h-4 w-4" />
                <span>Tiup Lilin Ulang Tahun 💨🎂</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4 max-w-lg mx-auto pt-2 animate-in fade-in zoom-in-95 duration-500">
              <div className="rounded-2xl border-2 border-amber-200 bg-amber-50/90 p-5 text-center shadow-md space-y-2">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold font-mono text-amber-900 uppercase">
                  <Sparkles className="h-4 w-4 text-amber-600 animate-spin" />
                  <span>Permohonan Terkabul & Pesan Rahasia</span>
                </div>
                <p className="font-serif text-sm sm:text-base italic text-amber-950 leading-relaxed">
                  &ldquo;{content.secretWishMessage}&rdquo;
                </p>
              </div>

              <button
                type="button"
                onClick={handleRelightCandle}
                className="inline-flex items-center gap-1.5 rounded-full border border-stone-300 bg-white hover:bg-stone-50 px-4 py-1.5 text-xs font-semibold text-stone-700 shadow-2xs transition-colors"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Nyalakan Lilin Lagi</span>
              </button>
            </div>
          )}
        </section>

        {/* ======================================================================= */}
        {/* 2B. STATISTIK KEBAHAGIAAN & HARI-HARI PENUH TAWA */}
        {/* ======================================================================= */}
        <section className="space-y-6 text-center">
          <div className="space-y-1">
            <div
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest"
              style={{ color: primary }}
            >
              <Clock className="h-3.5 w-3.5" />
              <span>Life & Joy Journey</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold" style={{ color: textColor }}>
              Perjalanan Menakjubkan Hingga Usia {content.age}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Kartu 1: Hari */}
            <div
              className="rounded-2xl border-2 p-5 text-center shadow-xs"
              style={{ backgroundColor: card, borderColor: `${primary}25` }}
            >
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-stone-500">
                Hari Penuh Tawa & Langkah Hebat
              </p>
              <p className="font-serif text-3xl sm:text-4xl font-extrabold mt-1" style={{ color: primary }}>
                ±{totalDaysAlive.toLocaleString()}
              </p>
              <p className="text-[11px] text-stone-500 mt-1">Hari membawa kebahagiaan bagi sekitarmu</p>
            </div>

            {/* Kartu 2: Senyuman */}
            <div
              className="rounded-2xl border-2 p-5 text-center shadow-xs"
              style={{ backgroundColor: card, borderColor: `${primary}25` }}
            >
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-stone-500">
                Senyuman yang Ditebarkan
              </p>
              <p className="font-serif text-3xl sm:text-4xl font-extrabold mt-1 text-amber-500">
                Tak Terhingga
              </p>
              <p className="text-[11px] text-stone-500 mt-1">Menghangatkan hati setiap orang yang kamu temui</p>
            </div>

            {/* Kartu 3: Babak Baru */}
            <div
              className="rounded-2xl border-2 p-5 text-center shadow-xs"
              style={{ backgroundColor: card, borderColor: `${primary}25` }}
            >
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-stone-500">
                Status Perayaan Usia
              </p>
              <p className="font-serif text-3xl sm:text-4xl font-extrabold mt-1 text-emerald-600">
                Tingkat {content.age}
              </p>
              <p className="text-[11px] text-stone-500 mt-1">Siap menaklukkan impian-impian baru</p>
            </div>
          </div>
        </section>

        {/* ======================================================================= */}
        {/* 2C. KOTAK KADO KEJUTAN INTERAKTIF */}
        {/* ======================================================================= */}
        <section
          className="rounded-3xl border-2 p-6 sm:p-10 shadow-lg text-center space-y-6"
          style={{ backgroundColor: card, borderColor: `${primary}30` }}
        >
          <div className="space-y-1">
            <div
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest"
              style={{ color: primary }}
            >
              <Gift className="h-4 w-4" />
              <span>Special Birthday Present</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold" style={{ color: textColor }}>
              Ada Kado Spesial Untukmu! 🎁
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Sebuah kejutan kecil yang disiapkan khusus untuk hari bahagiamu.
            </p>
          </div>

          <div className="py-2">
            {!isGiftOpened ? (
              <div className="flex flex-col items-center space-y-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsGiftOpened(true);
                    playCelebrationChime();
                  }}
                  className="group relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-rose-300 bg-rose-50/60 hover:bg-rose-50 transition-all hover:scale-105 active:scale-95 shadow-sm"
                >
                  <div className="relative">
                    <Gift className="h-16 w-16 text-rose-500 animate-bounce" />
                    <Sparkles className="absolute -top-1 -right-2 h-5 w-5 text-amber-500 animate-spin" />
                  </div>
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-rose-900 mt-3">
                    Klik Untuk Membuka Kotak Kado
                  </span>
                </button>
              </div>
            ) : (
              <div className="max-w-md mx-auto rounded-2xl border-2 border-rose-200 bg-rose-50/80 p-6 text-center space-y-3 animate-in fade-in zoom-in-95 duration-300 shadow-inner">
                <div className="flex items-center justify-center gap-1.5 text-xs font-bold font-mono text-rose-800 uppercase">
                  <Award className="h-4 w-4 text-rose-600" />
                  <span>Kado Terbuka!</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-rose-950">
                  {content.giftBoxTitle}
                </h3>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                  &ldquo;{content.giftBoxMessage}&rdquo;
                </p>

                {content.giftBoxCode && (
                  <div className="pt-2">
                    <div className="inline-flex items-center gap-2 rounded-lg bg-white border border-rose-200 px-3 py-1.5 shadow-2xs font-mono text-xs font-bold text-rose-600">
                      <span>KODE: {content.giftBoxCode}</span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* ======================================================================= */}
        {/* 2D. LINIMASA MILESTONE & BABAK KEHIDUPAN */}
        {/* ======================================================================= */}
        {(content.milestone1Title || content.milestone2Title || content.milestone3Title) && (
          <section className="space-y-6">
            <div className="text-center space-y-1">
              <div
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest"
                style={{ color: primary }}
              >
                <Award className="h-3.5 w-3.5" />
                <span>Life Milestones</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold" style={{ color: textColor }}>
                {content.milestoneTitle || "Tiga Babak Indah Menuju Usia Kedewasaan"}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {/* Milestone 1 */}
              {content.milestone1Title && (
                <div
                  className="rounded-2xl border-2 p-5 shadow-xs flex flex-col justify-between space-y-3"
                  style={{ backgroundColor: card, borderColor: `${primary}20` }}
                >
                  <div className="space-y-2">
                    <span
                      className="inline-block rounded-full px-2.5 py-0.5 text-xs font-mono font-bold text-white shadow-2xs"
                      style={{ backgroundColor: primary }}
                    >
                      {content.milestone1Year || "Chapter 1"}
                    </span>
                    <h3 className="font-serif text-base font-bold text-stone-900">
                      {content.milestone1Title}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {content.milestone1Desc}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-stone-400 pt-2 border-t border-stone-100">
                    <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                    <span>Langkah Keberanian</span>
                  </div>
                </div>
              )}

              {/* Milestone 2 */}
              {content.milestone2Title && (
                <div
                  className="rounded-2xl border-2 p-5 shadow-xs flex flex-col justify-between space-y-3"
                  style={{ backgroundColor: card, borderColor: `${primary}20` }}
                >
                  <div className="space-y-2">
                    <span
                      className="inline-block rounded-full px-2.5 py-0.5 text-xs font-mono font-bold text-white shadow-2xs"
                      style={{ backgroundColor: primary }}
                    >
                      {content.milestone2Year || "Chapter 2"}
                    </span>
                    <h3 className="font-serif text-base font-bold text-stone-900">
                      {content.milestone2Title}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {content.milestone2Desc}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-stone-400 pt-2 border-t border-stone-100">
                    <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                    <span>Karya Terbaik</span>
                  </div>
                </div>
              )}

              {/* Milestone 3 */}
              {content.milestone3Title && (
                <div
                  className="rounded-2xl border-2 p-5 shadow-xs flex flex-col justify-between space-y-3"
                  style={{ backgroundColor: card, borderColor: `${primary}20` }}
                >
                  <div className="space-y-2">
                    <span
                      className="inline-block rounded-full px-2.5 py-0.5 text-xs font-mono font-bold text-white shadow-2xs"
                      style={{ backgroundColor: primary }}
                    >
                      {content.milestone3Year || "Chapter 3"}
                    </span>
                    <h3 className="font-serif text-base font-bold text-stone-900">
                      {content.milestone3Title}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {content.milestone3Desc}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-stone-400 pt-2 border-t border-stone-100">
                    <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
                    <span>Era Gemilang</span>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ======================================================================= */}
        {/* 2E. GALERI FOTO POLAROID KENANGAN (6 FOTO) */}
        {/* ======================================================================= */}
        {(content.galleryPhoto1 || content.galleryPhoto2 || content.galleryPhoto3) && (
          <section className="space-y-6">
            <div className="text-center space-y-1">
              <div
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest"
                style={{ color: primary }}
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Memory Polaroid Strip</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold" style={{ color: textColor }}>
                Potret Momen & Senyuman Terbaik
              </h2>
              <p className="text-xs sm:text-sm text-stone-500">
                Klik foto untuk melihat dalam resolusi penuh.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 pt-2">
              {[
                { url: content.galleryPhoto1, caption: content.galleryCaption1 },
                { url: content.galleryPhoto2, caption: content.galleryCaption2 },
                { url: content.galleryPhoto3, caption: content.galleryCaption3 },
                { url: content.galleryPhoto4, caption: content.galleryCaption4 },
                { url: content.galleryPhoto5, caption: content.galleryCaption5 },
                { url: content.galleryPhoto6, caption: content.galleryCaption6 },
              ]
                .filter((item) => Boolean(item.url))
                .map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div
                      onClick={() => setLightboxImg({ url: item.url, caption: item.caption || "" })}
                      className="group cursor-pointer w-full rounded-2xl border-4 bg-white p-2.5 sm:p-3 shadow-md hover:shadow-xl transition-all duration-300 relative border-[#f1eae2] hover:-translate-y-1"
                    >
                      {/* Selotip Vintage Kecil */}
                      <div className="mx-auto -mt-4 mb-2 h-3.5 w-16 rounded bg-amber-200/90 border border-amber-300 shadow-2xs rotate-1" />
                      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-stone-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.url}
                          alt={item.caption || `Kenangan ${idx + 1}`}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      {item.caption && (
                        <p className="mt-2 text-center font-serif text-[11px] sm:text-xs italic text-stone-700 leading-snug truncate">
                          &ldquo;{item.caption}&rdquo;
                        </p>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          </section>
        )}

        {/* ======================================================================= */}
        {/* 2F. 4 KARTU DOA & HARAPAN TERINDAH */}
        {/* ======================================================================= */}
        {(content.wish1Title || content.wish2Title) && (
          <section className="space-y-6">
            <div className="text-center space-y-1">
              <div
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest"
                style={{ color: primary }}
              >
                <Heart className="h-3.5 w-3.5" />
                <span>Blessings & Prayers</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold" style={{ color: textColor }}>
                Empat Doa Tulus Untukmu di Usia Baru
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {content.wish1Title && (
                <div
                  className="rounded-2xl border-2 p-5 shadow-xs space-y-1.5"
                  style={{ backgroundColor: card, borderColor: `${primary}20` }}
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    <h3 className="font-serif text-base font-bold text-stone-900">
                      {content.wish1Title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {content.wish1Desc}
                  </p>
                </div>
              )}

              {content.wish2Title && (
                <div
                  className="rounded-2xl border-2 p-5 shadow-xs space-y-1.5"
                  style={{ backgroundColor: card, borderColor: `${primary}20` }}
                >
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-amber-600" />
                    <h3 className="font-serif text-base font-bold text-stone-900">
                      {content.wish2Title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {content.wish2Desc}
                  </p>
                </div>
              )}

              {content.wish3Title && (
                <div
                  className="rounded-2xl border-2 p-5 shadow-xs space-y-1.5"
                  style={{ backgroundColor: card, borderColor: `${primary}20` }}
                >
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-rose-500 fill-rose-500" />
                    <h3 className="font-serif text-base font-bold text-stone-900">
                      {content.wish3Title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {content.wish3Desc}
                  </p>
                </div>
              )}

              {content.wish4Title && (
                <div
                  className="rounded-2xl border-2 p-5 shadow-xs space-y-1.5"
                  style={{ backgroundColor: card, borderColor: `${primary}20` }}
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-purple-600" />
                    <h3 className="font-serif text-base font-bold text-stone-900">
                      {content.wish4Title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {content.wish4Desc}
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ======================================================================= */}
        {/* 2G. BUCKET LIST & RESOLUSI USIA BARU */}
        {/* ======================================================================= */}
        {(content.bucketList1 || content.bucketList2 || content.bucketList3) && (
          <section
            className="rounded-3xl border-2 p-6 sm:p-8 shadow-md space-y-5"
            style={{ backgroundColor: card, borderColor: `${primary}25` }}
          >
            <div className="text-center space-y-1">
              <div
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest"
                style={{ color: primary }}
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>New Age Manifestation</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold" style={{ color: textColor }}>
                Target & Impian Manis di Usia {content.age}
              </h2>
              <p className="text-xs text-stone-500">
                Klik untuk menandai impian yang akan kita wujudkan bersama!
              </p>
            </div>

            <div className="space-y-2.5 max-w-lg mx-auto pt-1">
              {[content.bucketList1, content.bucketList2, content.bucketList3]
                .filter(Boolean)
                .map((item, idx) => {
                  const isChecked = Boolean(checkedBucket[idx]);
                  return (
                    <div
                      key={idx}
                      onClick={() =>
                        setCheckedBucket((prev) => ({ ...prev, [idx]: !prev[idx] }))
                      }
                      className={cn(
                        "flex items-center gap-3 p-3.5 rounded-xl border transition-all cursor-pointer select-none",
                        isChecked
                          ? "bg-rose-50/80 border-rose-300 text-rose-950"
                          : "bg-stone-50/80 border-stone-200 text-stone-800 hover:bg-stone-100",
                      )}
                    >
                      <div
                        className={cn(
                          "h-5 w-5 rounded-md border flex items-center justify-center transition-colors",
                          isChecked
                            ? "bg-rose-600 border-rose-600 text-white"
                            : "border-stone-300 bg-white",
                        )}
                      >
                        {isChecked && <Check className="h-3.5 w-3.5" />}
                      </div>
                      <span
                        className={cn(
                          "text-xs sm:text-sm font-medium",
                          isChecked && "line-through opacity-80",
                        )}
                      >
                        {item}
                      </span>
                    </div>
                  );
                })}
            </div>
          </section>
        )}

        {/* ======================================================================= */}
        {/* 2H. LEMBARAN SURAT ULANG TAHUN UTAMA */}
        {/* ======================================================================= */}
        <article
          className="relative rounded-3xl border-2 p-7 sm:p-12 shadow-xl space-y-8 backdrop-blur-sm"
          style={{
            backgroundColor: card,
            borderColor: `${primary}30`,
          }}
        >
          {/* Header Surat */}
          <header className="space-y-3 border-b border-stone-200 pb-6 text-center">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-mono font-bold tracking-widest uppercase border"
              style={{ borderColor: `${primary}40`, color: primary }}
            >
              <PartyPopper className="h-3.5 w-3.5" />
              <span>Official Birthday Letter</span>
            </div>

            <h2
              className="font-serif text-2xl sm:text-4xl font-bold tracking-tight"
              style={{ color: textColor }}
            >
              {content.letterTitle}
            </h2>

            {content.introMessage && (
              <p className="font-mono text-xs sm:text-sm italic text-stone-600 max-w-xl mx-auto">
                &ldquo;{content.introMessage}&rdquo;
              </p>
            )}
          </header>

          {/* Paragraf Surat */}
          <div className="space-y-6 font-serif text-base sm:text-lg leading-relaxed sm:leading-loose text-stone-800">
            {paragraphs.map((para, idx) => (
              <p key={idx} className="indent-6 sm:indent-8">
                {para}
              </p>
            ))}
          </div>

          {/* Penutup & Tanda Tangan */}
          <footer className="border-t border-stone-200 pt-7 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-stone-500">
              <Cake className="h-4 w-4 text-rose-500" />
              <span>Dirayakan Selamanya dalam Cinta</span>
            </div>
            <div className="text-right space-y-1">
              <p className="font-mono text-xs uppercase tracking-wider text-stone-400">
                {content.closingStatement}
              </p>
              <p
                className="font-serif text-2xl font-bold tracking-wide sm:text-3xl"
                style={{ color: textColor }}
              >
                {content.signature}
              </p>
            </div>
          </footer>
        </article>
      </div>

      {/* Lightbox Modal Pratinjau Foto */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-lg w-full bg-white rounded-2xl p-4 shadow-2xl space-y-3"
          >
            <button
              type="button"
              onClick={() => setLightboxImg(null)}
              className="absolute top-2 right-2 h-8 w-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-700"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-stone-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={lightboxImg.url}
                alt={lightboxImg.caption}
                className="h-full w-full object-cover"
              />
            </div>
            {lightboxImg.caption && (
              <p className="text-center font-serif text-sm italic text-stone-700">
                &ldquo;{lightboxImg.caption}&rdquo;
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function BirthdayCelebrationTemplate({
  data,
  className,
}: BirthdayCelebrationTemplateProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-rose-50/20" />}>
      <BirthdayCelebrationTemplateInner data={data} className={className} />
    </Suspense>
  );
}
