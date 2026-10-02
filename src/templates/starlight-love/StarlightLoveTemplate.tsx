"use client";

import { useEffect, useRef, useState, useMemo, Suspense } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import {
  Sparkles,
  Pause,
  Play,
  Check,
  Copy,
  Star,
  Flame,
  Orbit,
  Moon,
  Compass,
  Heart,
  Lock,
  Unlock,
  Calendar,
  Clock,
  X,
  Award,
  Share2,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { toParagraphs } from "@/lib/utils/format";
import type { LetterContent } from "@/types/letter";
import { withDefaults } from "../utils";

const defaults = {
  recipientName: "Clarissa Aurelia",
  senderName: "Reyhan Danendra",
  constellationTitle: "Constellation of Our First Spark ✨",
  specialDate: "14 Februari 2023",
  anniversaryDate: "2023-02-14",
  starName: "Stella Clarissa Majoris ✨",
  starCoordinate: "RA 05h 35m • Dec -05° 23′ (Celestial Orion)",
  starMagnitude: "Magnitude 1.0 (Bintang Terang Utama)",
  starRegistryId: "STAR-LOVE-2023-CLARISSA",
  starDedicationQuote:
    "Didaftarkan abadi di hamparan galaksi, bersinar selamanya hanya untukmu.",
  constellationStory:
    "Rasi bintang ini tercipta dari jalinan kenangan manis kita: tatap mata pertama di bawah temaram senja, tawa saat kehujanan bersama di pelataran kafe, dan janji suci untuk saling menggenggam tangan selamanya.",
  star1: "Bintang Kedamaian: Selalu menjadi pelabuhan paling tenang dan aman saat harimu terasa lelah.",
  star2: "Bintang Ketulusan: Menjagamu dengan kejujuran, kehangatan, dan kesetiaan yang tak luntur oleh waktu.",
  star3: "Bintang Kehangatan: Menjadi selimut di kala dingin dan pelukan paling tulus di setiap senja.",
  star4: "Bintang Tawa: Mengukir senyuman di wajahmu bahkan di saat hari-hari terasa berat.",
  star5: "Bintang Keabadian: Terus menggenggam jemarimu dan menatap langit masa depan bersama-sama hingga menua.",
  starlightPhotoUrl:
    "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1000&q=80",
  starlightPhotoCaption: "Pertama kali menatap gemintang bersama di atas bukit.",
  secondPhotoUrl:
    "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1000&q=80",
  secondPhotoCaption: "Genggaman jemari yang selalu menghangatkan dinginnya malam.",
  photo3Url:
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1000&q=80",
  photo3Caption: "Tawa renyahmu di bawah cahaya senja keemasan.",
  photo4Url:
    "https://images.unsplash.com/photo-1513279922550-250c2129b13a?auto=format&fit=crop&w=1000&q=80",
  photo4Caption: "Saat dunia di luar sana terasa sunyi dan hanya ada kita berdua.",
  secretStarlightWhisper:
    "Bisikan Rahasia: Dari triliunan kemungkinan di semesta ini, tidak ada satu detik pun yang kusesali saat memilihmu. Kamu adalah keajaiban terindah dalam hidupku. Aku mencintaimu, hari ini dan selamanya.",
  lanternTitle: "Lentera Harapan yang Tak Pernah Padam 🏮",
  lanternMessage:
    "Lentera ini membawa doa dan rasa syukurku atas hadirnya dirimu. Semoga hangatnya cahaya cinta kita selalu menerangi setiap lorong waktu yang kita lalui bersama.",
  title: "Di Antara Miliaran Bintang di Langit Semesta",
  openingQuote:
    "Jika setiap bintang di langit adalah alasan mengapa aku mencintaimu, maka seluruh galaksi ini pun tak akan cukup untuk menghitungnya.",
  message:
    "Clarissa,\n\nSetiap kali aku menatap bentangan langit, aku selalu terpana menyadari betapa luas dan megahnya alam semesta ini. Namun di tengah keheningan kosmik yang tak berujung, hatiku menemukan tempat berlabuh yang paling hangat: dirimu.\n\nKehadiranmu dalam hidupku bukan sekadar kebetulan, melainkan takdir terindah yang digariskan semesta. Senyumanmu adalah fajar yang selalu menepis gelap, dan tawamu adalah melodi paling merdu yang menenangkan setiap kekhawatiranku.\n\nDi hari yang indah ini, aku ingin menegaskan kembali rasa cintaku padamu. Tak peduli sejauh apa roda waktu berputar atau seberapa jauh jalan yang harus kita tempuh, rasa kagum dan sayangku padamu akan tetap bersinar abadi, seperti bintang utara yang tak pernah bergeser dari porosnya.\n\nTerima kasih telah menjadi bagian paling bersinar dalam galaksi hidupku.",
  closingWord: "Mencintaimu hingga ke ujung galaksi terluar,",
  signature: "Reyhan Danendra",
  primaryColor: "#d97706",
  backgroundColor: "#fdfbf7",
  cardColor: "#ffffff",
  textColor: "#1c1917",
  bodyTextColor: "#44403c",
  musicTitle: "",
  bgMusicUrl: "",
};

interface StarlightLoveTemplateProps {
  data: LetterContent;
  className?: string;
}

// Bunyi chime bintang ethereal via Web Audio API murni
function playCelestialChime() {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const freqs = [523.25, 659.25, 783.99, 1046.5, 1318.51]; // C5, E5, G5, C6, E6
    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.1);
      gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.1);
      gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + idx * 0.1 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.1 + 1.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.1);
      osc.stop(ctx.currentTime + idx * 0.1 + 1.25);
    });
  } catch {
    // browser audio restrictions
  }
}

function StarlightLoveTemplateInner({ data, className }: StarlightLoveTemplateProps) {
  const content = withDefaults(defaults, data);
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Mode Thumbnail atau Katalog /templates: TIDAK PERNAH menampilkan modal/popup fixed
  const isThumbnail =
    Boolean(data._isThumbnail) ||
    pathname === "/templates" ||
    className?.includes("is-thumbnail") ||
    className?.includes("thumb");

  // Mode Editor Side Preview: ditampilkan langsung terbuka agar mudah mengedit form
  const isEditorPreview =
    Boolean(data._isEditorPreview) || className?.includes("is-editor-preview");

  // Mode Pratinjau Penuh atau Hasil Link Generate Surat Publik
  const isPublicLetter = Boolean(pathname?.startsWith("/letter/"));
  const isFullPreview =
    Boolean(data._isFullPreview) || className?.includes("is-full-preview");
  const isDetailPage = Boolean(pathname?.startsWith("/templates/"));

  const shouldStartClosed =
    (isPublicLetter || isFullPreview || isDetailPage) &&
    !isThumbnail &&
    !isEditorPreview;

  // Nama penerima dinamis dari parameter URL (?to=...)
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

  // Status surat terbuka/tertutup
  const [isOpened, setIsOpened] = useState<boolean>(!shouldStartClosed);

  // Audio Musik Pengiring
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

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

  const handleOpenLetter = () => {
    playCelestialChime();
    setIsOpened(true);

    if (content.bgMusicUrl && audioRef.current && !isThumbnail && pathname !== "/templates") {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Autoplay dicegah oleh browser
        });
    }

    setTimeout(() => {
      const target = document.getElementById("celestial-certificate-section");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }, 280);
  };

  // State Salin Tautan
  const [copiedLink, setCopiedLink] = useState(false);
  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // State Pesan Rahasia Terkunci
  const [isWhisperRevealed, setIsWhisperRevealed] = useState(false);

  // State Lightbox Galeri Foto
  const [lightboxImg, setLightboxImg] = useState<{ url: string; caption?: string } | null>(null);

  // State Interaktif 5 Bintang Rasi
  const [activeStarIdx, setActiveStarIdx] = useState<number>(0);

  // Live Counter Waktu Cinta di Bawah Langit yang Sama
  const [timeTogether, setTimeTogether] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const rawDate = content.anniversaryDate || content.specialDate;
    if (!rawDate) return;

    function updateCounter() {
      // Normalisasi tanggal (mendukung format YYYY-MM-DD atau parseable date)
      const parseable = rawDate.match(/^\d{4}-\d{2}-\d{2}/)
        ? rawDate.substring(0, 10)
        : rawDate;
      const start = new Date(parseable).getTime();
      if (isNaN(start)) {
        setTimeTogether({ days: 365, hours: 12, minutes: 30, seconds: 0 });
        return;
      }
      const now = Date.now();
      const diff = Math.max(0, now - start);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeTogether({ days, hours, minutes, seconds });
    }

    updateCounter();
    const interval = setInterval(updateCounter, 1000);
    return () => clearInterval(interval);
  }, [content.anniversaryDate, content.specialDate]);

  const paragraphs = toParagraphs(content.message);

  // Palet warna dinamis cerah mewah
  const primary = content.primaryColor || "#d97706";
  const bg = content.backgroundColor || "#fdfbf7";
  const card = content.cardColor || "#ffffff";
  const textColor = content.textColor || "#1c1917";
  const bodyText = content.bodyTextColor || "#44403c";

  // Array 5 Bintang Janji Semesta
  const vows = useMemo(
    () => [
      {
        id: 1,
        title: "Bintang 1 • Janji Kedamaian",
        text: content.star1,
        icon: Moon,
        coord: "RA 04h 28m • α Tauri",
      },
      {
        id: 2,
        title: "Bintang 2 • Janji Ketulusan",
        text: content.star2,
        icon: Heart,
        coord: "RA 05h 14m • β Orionis",
      },
      {
        id: 3,
        title: "Bintang 3 • Janji Kehangatan",
        text: content.star3,
        icon: Flame,
        coord: "RA 06h 45m • α Canis",
      },
      {
        id: 4,
        title: "Bintang 4 • Janji Senyuman",
        text: content.star4,
        icon: Sparkles,
        coord: "RA 07h 34m • β Geminorum",
      },
      {
        id: 5,
        title: "Bintang 5 • Janji Keabadian",
        text: content.star5,
        icon: Orbit,
        coord: "RA 08h 12m • Stella Polaris",
      },
    ],
    [content.star1, content.star2, content.star3, content.star4, content.star5]
  );

  // Galeri 4 Foto Polaroid
  const polaroids = useMemo(() => {
    const list: Array<{ url: string; caption?: string; rotate: string; label: string }> = [];
    if (content.starlightPhotoUrl) {
      list.push({
        url: content.starlightPhotoUrl,
        caption: content.starlightPhotoCaption || "Pertama kali menatap gemintang bersama.",
        rotate: "-rotate-2",
        label: "Portal Bintang 01",
      });
    }
    if (content.secondPhotoUrl) {
      list.push({
        url: content.secondPhotoUrl,
        caption: content.secondPhotoCaption || "Genggaman jemari yang selalu menghangatkan malam.",
        rotate: "rotate-2",
        label: "Nebula Kasih 02",
      });
    }
    if (content.photo3Url) {
      list.push({
        url: content.photo3Url,
        caption: content.photo3Caption || "Tawa renyahmu di bawah cahaya senja keemasan.",
        rotate: "-rotate-1",
        label: "Senja Keemasan 03",
      });
    }
    if (content.photo4Url) {
      list.push({
        url: content.photo4Url,
        caption: content.photo4Caption || "Saat dunia sunyi dan hanya ada kita berdua.",
        rotate: "rotate-1.5",
        label: "Galaksi Kita 04",
      });
    }
    return list;
  }, [
    content.starlightPhotoUrl,
    content.starlightPhotoCaption,
    content.secondPhotoUrl,
    content.secondPhotoCaption,
    content.photo3Url,
    content.photo3Caption,
    content.photo4Url,
    content.photo4Caption,
  ]);

  return (
    <div
      className={cn(
        "relative min-h-screen font-sans selection:bg-amber-100 selection:text-amber-900 transition-colors duration-500",
        className
      )}
      style={{ backgroundColor: bg, color: bodyText }}
    >
      {/* Audio Elemen Tersembunyi */}
      {!isThumbnail && pathname !== "/templates" && content.bgMusicUrl && (
        <audio ref={audioRef} src={content.bgMusicUrl} loop preload="none" />
      )}

      {/* Floating Starlight Music Button */}
      {!isThumbnail &&
        !isEditorPreview &&
        pathname !== "/templates" &&
        (isPublicLetter || isFullPreview || isDetailPage) &&
        content.bgMusicUrl &&
        isOpened && (
          <button
            type="button"
            onClick={toggleMusic}
            className="fixed right-5 bottom-6 z-40 flex items-center gap-2 rounded-full border border-amber-300 bg-white/95 px-4 py-2.5 shadow-xl backdrop-blur-md transition-all hover:scale-105 active:scale-95 text-stone-800"
            style={{ borderColor: `${primary}60` }}
            aria-label={isPlaying ? "Jeda alunan musik" : "Putar alunan musik"}
          >
            <Orbit className={cn("h-4 w-4", isPlaying && "animate-spin text-amber-600")} />
            <span className="text-xs font-semibold pr-1 text-stone-800">
              {isPlaying ? "Alunan Mengalun ✨" : "Putar Musik 🎵"}
            </span>
            {isPlaying ? (
              <Pause className="h-3.5 w-3.5 text-stone-600" />
            ) : (
              <Play className="h-3.5 w-3.5 text-stone-600" />
            )}
          </button>
        )}

      {/* Lightbox Modal untuk Preview Foto */}
      {lightboxImg && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/80 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setLightboxImg(null)}
        >
          <div
            className="relative max-w-2xl w-full rounded-3xl bg-white p-4 sm:p-6 shadow-2xl space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxImg(null)}
              className="absolute top-3 right-3 rounded-full bg-stone-100 p-2 text-stone-600 hover:bg-stone-200 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-stone-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={lightboxImg.url}
                alt={lightboxImg.caption || "Foto Bintang Kenangan"}
                className="h-full w-full object-cover"
              />
            </div>
            {lightboxImg.caption && (
              <p className="text-center font-serif text-sm italic text-stone-700 pt-1">
                &ldquo;{lightboxImg.caption}&rdquo;
              </p>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL JENDELA PEMBUKA MENGAPUNG (SOLID BACKGROUND, ANTI-BOCOR) */}
      {/* ========================================================================= */}
      {!isOpened && (isPublicLetter || isFullPreview) && !isThumbnail && !isEditorPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-900/60 backdrop-blur-md overflow-y-auto animate-in fade-in duration-300">
          <div
            className="relative w-full max-w-lg rounded-3xl p-6 sm:p-9 text-center shadow-2xl border transition-all duration-300 my-auto"
            style={{
              backgroundColor: card,
              borderColor: `${primary}40`,
              boxShadow: `0 20px 50px rgba(217, 119, 6, 0.15)`,
            }}
          >
            {/* Pita Dekorasi Emas Atas */}
            <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50/90 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-amber-800 shadow-xs">
              <Sparkles className="h-3.5 w-3.5 text-amber-600" />
              <span>{content.constellationTitle || "Celestial Starlight Romance"}</span>
            </div>

            {/* Lambang Stempel Semesta Lilin Emas */}
            <div className="mx-auto my-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 via-amber-200 to-amber-400 p-1 shadow-lg ring-4 ring-amber-100">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-white shadow-inner">
                <Star className="h-9 w-9 text-amber-600 fill-amber-500 animate-pulse" />
              </div>
            </div>

            <p className="text-xs font-semibold tracking-wider uppercase text-amber-800/80">
              Persembahan Bintang Langit Untuk:
            </p>
            <h2
              className="mt-2 font-serif text-3xl font-extrabold tracking-wide sm:text-4xl"
              style={{ color: textColor }}
            >
              {recipientName}
            </h2>
            <p className="mt-1 text-xs text-stone-500 font-medium">
              Dari Kekasih Jiwa: <span className="font-semibold text-stone-800">{content.senderName}</span>
            </p>

            {/* Nama Bintang & Koordinat Singkat */}
            <div className="mt-5 rounded-2xl border border-amber-100 bg-amber-50/60 p-4 text-xs text-stone-600 space-y-1">
              <div className="font-serif font-bold text-amber-900 text-sm">
                ✦ {content.starName || "Stella Clarissa Majoris"} ✦
              </div>
              <p className="text-[11px] font-mono text-stone-500">{content.starCoordinate}</p>
              <p className="text-[11px] italic text-amber-800/80 pt-1 font-serif">
                &ldquo;{content.starDedicationQuote}&rdquo;
              </p>
            </div>

            {/* Tombol Buka Surat Semesta */}
            <div className="mt-7">
              <button
                type="button"
                onClick={handleOpenLetter}
                className="group relative inline-flex w-full items-center justify-center gap-2.5 rounded-2xl py-4 px-6 text-sm sm:text-base font-bold text-white shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-98"
                style={{
                  backgroundColor: primary,
                  boxShadow: `0 10px 25px ${primary}50`,
                }}
              >
                <Flame className="h-5 w-5 text-amber-100 group-hover:scale-110 transition-transform" />
                <span>Nyalakan Lentera & Buka Surat Semesta 🏮</span>
              </button>
            </div>

            <p className="mt-4 text-[11px] text-stone-400 font-serif italic">
              ✨ Nyalakan audio perangkat untuk alunan musik & gemerincing bintang
            </p>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ISI UTAMA TEMPLATE (TERSEMBUNYI JIKA BELUM DIBUKA PADA MODE SURAT PUBLIK) */}
      {/* ========================================================================= */}
      <div
        className={cn(
          "transition-opacity duration-700",
          !isOpened && (isPublicLetter || isFullPreview) && !isThumbnail && !isEditorPreview
            ? "hidden opacity-0"
            : "opacity-100"
        )}
      >
        {/* ======================================================================= */}
        {/* 1. HERO BANNER CERAH BERKILAU (BRIGHT CELESTIAL DAWN) */}
        {/* ======================================================================= */}
        <section
          className="relative flex w-full flex-col items-center justify-center overflow-hidden px-4 text-center py-16 sm:py-20"
          style={{
            background: `radial-gradient(ellipse at top, ${primary}18 0%, #fff7ed 40%, ${bg} 100%)`,
          }}
        >
          {/* Ornamen Bintang Emas Berkelap-kelip Latar Belakang */}
          <div className="pointer-events-none absolute inset-0 opacity-40">
            <div className="absolute top-1/6 left-1/6 h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
            <div className="absolute top-1/4 right-1/4 h-2.5 w-2.5 rounded-full bg-amber-300 shadow-[0_0_10px_#fbbf24]" />
            <div className="absolute top-2/3 left-1/4 h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_#f59e0b]" />
            <div className="absolute top-1/2 right-1/6 h-2 w-2 rounded-full bg-amber-200 shadow-[0_0_8px_#fde68a]" />
            <div className="absolute bottom-1/5 right-1/3 h-2.5 w-2.5 rounded-full bg-amber-400 shadow-[0_0_10px_#f59e0b]" />
          </div>

          <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center space-y-6">
            {/* Badge Rasi Bintang */}
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200/90 bg-white/90 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-amber-800 shadow-sm backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-amber-600" />
              <span>{content.constellationTitle || "Celestial Starlight Romance"}</span>
            </div>

            {/* Judul Hero & Dedikasi */}
            <div className="space-y-3">
              <h1
                className="font-serif text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl leading-tight"
                style={{ color: textColor }}
              >
                Langit Cinta Untuk {recipientName}
              </h1>
              <p className="font-serif text-sm sm:text-base italic text-amber-900/80 max-w-lg mx-auto">
                &ldquo;{content.openingQuote}&rdquo;
              </p>
            </div>

            {/* =================================================================== */}
            {/* LIVE COUNTER: WAKTU DI BAWAH LANGIT YANG SAMA */}
            {/* =================================================================== */}
            <div className="w-full max-w-xl rounded-3xl border border-amber-200/80 bg-white/95 p-5 sm:p-6 shadow-xl shadow-amber-500/5 backdrop-blur-md space-y-3">
              <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800">
                <Clock className="h-4 w-4 text-amber-600" />
                <span>Waktu Bersama di Bawah Langit yang Sama</span>
              </div>

              <div className="grid grid-cols-4 gap-2 sm:gap-3 pt-2">
                <div className="flex flex-col items-center justify-center rounded-2xl bg-amber-50/70 border border-amber-100 p-2 sm:p-3">
                  <span className="font-mono text-xl sm:text-3xl font-extrabold text-amber-900">
                    {timeTogether.days}
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    Hari
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center rounded-2xl bg-amber-50/70 border border-amber-100 p-2 sm:p-3">
                  <span className="font-mono text-xl sm:text-3xl font-extrabold text-amber-900">
                    {timeTogether.hours}
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    Jam
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center rounded-2xl bg-amber-50/70 border border-amber-100 p-2 sm:p-3">
                  <span className="font-mono text-xl sm:text-3xl font-extrabold text-amber-900">
                    {timeTogether.minutes}
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    Menit
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center rounded-2xl bg-amber-50/70 border border-amber-100 p-2 sm:p-3">
                  <span className="font-mono text-xl sm:text-3xl font-extrabold text-amber-900">
                    {timeTogether.seconds}
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold text-stone-500 uppercase tracking-wider">
                    Detik
                  </span>
                </div>
              </div>

              <p className="text-[11px] text-stone-500 font-serif italic text-center pt-1">
                Sejak pertemuan suci: <span className="font-semibold text-amber-900">{content.specialDate}</span>
              </p>
            </div>
          </div>
        </section>

        {/* CONTAINER KONTEN UTAMA */}
        <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 space-y-16">
          {/* ===================================================================== */}
          {/* 2. SERTIFIKAT DEDIKASI BINTANG RESMI (OFFICIAL STAR CERTIFICATE) */}
          {/* ===================================================================== */}
          <section id="celestial-certificate-section" className="space-y-4">
            <div className="text-center space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
                ✦ Dokumen Registrasi Kosmik ✦
              </span>
              <h2 className="font-serif text-2xl font-bold sm:text-3xl" style={{ color: textColor }}>
                Sertifikat Dedikasi Bintang Abadi
              </h2>
            </div>

            {/* Kartu Sertifikat Mewah */}
            <div
              className="relative rounded-3xl border-2 border-amber-300/80 bg-white p-6 sm:p-12 shadow-2xl shadow-amber-500/10 overflow-hidden"
              style={{
                backgroundImage: `radial-gradient(circle at center, #ffffff 60%, #fffbeb 100%)`,
              }}
            >
              {/* Garis Border Ornamen Ganda Vintage Luxury */}
              <div className="pointer-events-none absolute inset-3 rounded-2xl border border-amber-200/90" />
              <div className="pointer-events-none absolute top-4 left-4 text-amber-300">✦</div>
              <div className="pointer-events-none absolute top-4 right-4 text-amber-300">✦</div>
              <div className="pointer-events-none absolute bottom-4 left-4 text-amber-300">✦</div>
              <div className="pointer-events-none absolute bottom-4 right-4 text-amber-300">✦</div>

              <div className="relative z-10 space-y-6 text-center">
                {/* Header Sertifikat */}
                <div className="space-y-1">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-800 ring-4 ring-amber-50">
                    <Award className="h-6 w-6" />
                  </div>
                  <p className="text-[11px] font-bold tracking-widest uppercase text-amber-800">
                    International Celestial Registry
                  </p>
                  <p className="text-xs text-stone-500 font-serif italic">
                    Dengan ini dicatatkan secara abadi di hamparan tata surya:
                  </p>
                </div>

                {/* Nama Bintang & Penerima */}
                <div className="py-2 border-y border-amber-200/70 space-y-2">
                  <p className="text-xs uppercase tracking-wider text-stone-500">Nama Bintang Dedikasi:</p>
                  <h3 className="font-serif text-3xl font-extrabold sm:text-4xl text-amber-800 tracking-wide">
                    {content.starName || "Stella Clarissa Majoris ✨"}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 font-serif">
                    Didedikasikan seutuhnya untuk: <strong className="text-stone-900">{recipientName}</strong>
                  </p>
                </div>

                {/* Detail Astronomis Koordinat & Magnitudo */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                  <div className="rounded-2xl border border-amber-100 bg-amber-50/50 p-3.5 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
                      Koordinat Langit
                    </span>
                    <p className="text-xs font-mono font-medium text-stone-800">
                      {content.starCoordinate}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-amber-100 bg-amber-50/50 p-3.5 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
                      Kecerahan (Magnitudo)
                    </span>
                    <p className="text-xs font-mono font-medium text-stone-800">
                      {content.starMagnitude}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-amber-100 bg-amber-50/50 p-3.5 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
                      Nomor Registrasi
                    </span>
                    <p className="text-xs font-mono font-medium text-amber-900">
                      {content.starRegistryId}
                    </p>
                  </div>
                </div>

                {/* Kutipan Janji Dedikasi */}
                {content.starDedicationQuote && (
                  <p className="font-serif text-sm sm:text-base italic text-amber-900/90 leading-relaxed max-w-lg mx-auto bg-amber-50/40 p-3 rounded-2xl border border-amber-100/60">
                    &ldquo;{content.starDedicationQuote}&rdquo;
                  </p>
                )}

                {/* Cap Stempel & Tanda Tangan */}
                <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-amber-200/60 text-xs text-stone-600 gap-4">
                  <div className="text-left flex items-center gap-3">
                    <div className="h-14 w-14 rounded-full border-2 border-dashed border-amber-400 flex flex-col items-center justify-center p-1 text-[9px] font-bold text-amber-800 uppercase tracking-tighter text-center">
                      <span>OFFICIAL</span>
                      <span>CELESTIAL</span>
                      <span>SEAL</span>
                    </div>
                    <div>
                      <p className="font-semibold text-stone-800">Tanggal Terbit Sertifikat:</p>
                      <p className="text-stone-500 font-mono">{content.specialDate}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="italic text-stone-500 font-serif">Didaftarkan penuh cinta oleh:</p>
                    <p className="font-serif text-lg font-bold text-stone-900">{content.senderName}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ===================================================================== */}
          {/* 3. PETA RASI BINTANG INTERAKTIF (5 BINTANG KENANGAN KITA) */}
          {/* ===================================================================== */}
          <section className="space-y-6">
            <div className="text-center space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
                ✦ Interactive Star Map ✦
              </span>
              <h2 className="font-serif text-2xl font-bold sm:text-3xl" style={{ color: textColor }}>
                Peta Rasi 5 Bintang Kenangan Kita
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 font-serif max-w-lg mx-auto">
                {content.constellationStory}
              </p>
            </div>

            {/* Wadah Peta Rasi Interaktif Berwarna Cerah */}
            <div className="rounded-3xl border border-amber-200 bg-white p-6 sm:p-8 shadow-xl shadow-amber-500/5 space-y-6">
              {/* Tab Tombol 5 Bintang */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {vows.map((vow, idx) => {
                  const Icon = vow.icon;
                  const isActive = activeStarIdx === idx;
                  return (
                    <button
                      key={vow.id}
                      type="button"
                      onClick={() => {
                        playCelestialChime();
                        setActiveStarIdx(idx);
                      }}
                      className={cn(
                        "flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all duration-300",
                        isActive
                          ? "bg-amber-500 text-white border-amber-600 shadow-md scale-[1.03]"
                          : "bg-amber-50/50 hover:bg-amber-100/60 border-amber-200/70 text-stone-700"
                      )}
                    >
                      <Icon className={cn("h-5 w-5 mb-1.5", isActive ? "text-white" : "text-amber-600")} />
                      <span className="text-xs font-bold tracking-tight">Bintang {idx + 1}</span>
                      <span className="text-[10px] opacity-80 line-clamp-1">{vow.title.split("•")[1] || ""}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tampilan Detail Bintang yang Dipilih */}
              <div className="rounded-2xl border border-amber-200/90 bg-gradient-to-r from-amber-50/80 via-white to-amber-50/80 p-6 sm:p-8 text-center space-y-3 animate-in fade-in-50 duration-300">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 border border-amber-300 px-3.5 py-1 text-xs font-bold text-amber-900">
                  <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                  <span>{vows[activeStarIdx]?.title}</span>
                </div>

                <p className="font-serif text-base sm:text-xl font-medium text-stone-800 leading-relaxed max-w-2xl mx-auto">
                  &ldquo;{vows[activeStarIdx]?.text}&rdquo;
                </p>

                <p className="text-[11px] font-mono text-stone-400">
                  Koordinat Bintang: {vows[activeStarIdx]?.coord}
                </p>
              </div>
            </div>
          </section>

          {/* ===================================================================== */}
          {/* 4. GALERI 4 FOTO POLAROID KOSMIK (STARLIGHT POLAROID MEMORIES) */}
          {/* ===================================================================== */}
          {polaroids.length > 0 && (
            <section className="space-y-6">
              <div className="text-center space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
                  ✦ Starlight Photo Gallery ✦
                </span>
                <h2 className="font-serif text-2xl font-bold sm:text-3xl" style={{ color: textColor }}>
                  Galeri Jejak Kenangan di Bawah Gemintang
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 font-serif">
                  Potret momen indah yang tersimpan abadi di antara gugusan bintang kita
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
                {polaroids.map((photo, i) => (
                  <div
                    key={i}
                    onClick={() => setLightboxImg({ url: photo.url, caption: photo.caption })}
                    className={cn(
                      "group cursor-pointer rounded-2xl border border-stone-200 bg-white p-3.5 pb-5 shadow-lg shadow-stone-200/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-amber-300 hover:z-20",
                      photo.rotate
                    )}
                  >
                    {/* Washi Tape Ornamen Emas Bintang */}
                    <div className="mx-auto -mt-6 mb-2.5 h-4 w-16 rounded-xs bg-amber-200/70 border border-amber-300/80 shadow-2xs rotate-1" />

                    <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-stone-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={photo.url}
                        alt={photo.caption || photo.label}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute top-2 right-2 rounded-full bg-white/90 p-1 text-amber-600 shadow-sm backdrop-blur-xs">
                        <Star className="h-3.5 w-3.5 fill-amber-500" />
                      </div>
                    </div>

                    <div className="pt-3 text-center space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block">
                        {photo.label}
                      </span>
                      <p className="font-serif text-xs italic text-stone-700 line-clamp-2">
                        &ldquo;{photo.caption}&rdquo;
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ===================================================================== */}
          {/* 5. BISIKAN RAHASIA TERSEMBUNYI (SECRET STARLIGHT WHISPER) */}
          {/* ===================================================================== */}
          {content.secretStarlightWhisper && (
            <section className="space-y-4">
              <div className="rounded-3xl border border-amber-300/80 bg-gradient-to-br from-amber-50/90 via-white to-amber-100/60 p-6 sm:p-10 shadow-xl text-center space-y-5">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 text-white shadow-md">
                  {isWhisperRevealed ? <Unlock className="h-6 w-6" /> : <Lock className="h-6 w-6" />}
                </div>

                <div className="space-y-1">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold" style={{ color: textColor }}>
                    ✦ Bisikan Bintang Rahasia Tersembunyi ✦
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 font-serif">
                    Pesan rahasia terdalam yang hanya bisa didengar oleh pemilik rasi bintang ini.
                  </p>
                </div>

                {isWhisperRevealed ? (
                  <div className="rounded-2xl border border-amber-300 bg-white p-5 sm:p-7 shadow-inner space-y-3 animate-in fade-in-50 duration-500">
                    <p className="font-serif text-base sm:text-lg italic text-amber-950 leading-relaxed max-w-xl mx-auto">
                      &ldquo;{content.secretStarlightWhisper}&rdquo;
                    </p>
                    <p className="text-xs font-semibold text-amber-700">
                      — Dibisikkan dengan sepenuh jiwa oleh {content.senderName}
                    </p>
                  </div>
                ) : (
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        playCelestialChime();
                        setIsWhisperRevealed(true);
                      }}
                      className="inline-flex items-center gap-2 rounded-full bg-stone-900 hover:bg-stone-800 text-amber-300 px-6 py-3 text-xs sm:text-sm font-bold shadow-lg transition-all hover:scale-105 active:scale-95"
                    >
                      <Sparkles className="h-4 w-4" />
                      <span>Buka Bisikan Rahasia Ini ✨</span>
                    </button>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* ===================================================================== */}
          {/* 6. LEMBARAN SURAT CINTA SEMESTA UTAMA (OFFICIAL LOVE LETTER SHEET) */}
          {/* ===================================================================== */}
          <section id="starlight-letter-sheet" className="space-y-4">
            <div className="text-center space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
                ✦ Surat Cinta Semesta ✦
              </span>
              <h2 className="font-serif text-2xl font-bold sm:text-3xl" style={{ color: textColor }}>
                Warkah Hati di Bawah Langit Malam
              </h2>
            </div>

            <article
              className="relative rounded-3xl border border-amber-200/90 bg-white p-8 sm:p-14 shadow-2xl shadow-amber-500/10 space-y-8"
              style={{
                backgroundImage: `linear-gradient(to bottom, #ffffff, #fffdfa)`,
              }}
            >
              {/* Ornamen Pemisah Bintang */}
              <div className="flex items-center justify-center gap-3 text-amber-500">
                <span className="h-px w-20 bg-gradient-to-r from-transparent to-amber-300" />
                <Star className="h-4 w-4 fill-amber-500" />
                <span className="h-px w-20 bg-gradient-to-l from-transparent to-amber-300" />
              </div>

              {/* Judul & Kutipan Pembuka */}
              <header className="space-y-3 text-center">
                <h3
                  className="font-serif text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl leading-tight"
                  style={{ color: textColor }}
                >
                  {content.title}
                </h3>
                {content.openingQuote && (
                  <p className="font-serif text-sm sm:text-base italic text-amber-900/80 max-w-xl mx-auto leading-relaxed">
                    &ldquo;{content.openingQuote}&rdquo;
                  </p>
                )}
              </header>

              {/* Paragraf Surat Cinta */}
              <div
                className="space-y-6 font-serif text-base sm:text-lg leading-relaxed sm:leading-loose"
                style={{ color: bodyText }}
              >
                {paragraphs.map((para, idx) => (
                  <p key={idx} className="indent-6 sm:indent-8">
                    {para}
                  </p>
                ))}
              </div>

              {/* Penutup & Tanda Tangan */}
              <footer className="border-t border-amber-200/70 pt-8 text-right space-y-2">
                <p className="font-serif text-sm italic text-stone-500">
                  {content.closingWord || "Mencintaimu hingga ke ujung galaksi terluar,"}
                </p>
                <p
                  className="font-serif text-2xl font-bold tracking-wide sm:text-3xl"
                  style={{ color: textColor }}
                >
                  {content.signature}
                </p>
              </footer>
            </article>
          </section>

          {/* ===================================================================== */}
          {/* 7. KARTU LENTERA HARAPAN BERSINAR (GLOWING LOVE LANTERN) */}
          {/* ===================================================================== */}
          {content.lanternMessage && (
            <section className="space-y-4">
              <div
                className="relative rounded-3xl border border-amber-200/80 bg-gradient-to-br from-amber-50/80 via-white to-amber-100/50 p-6 sm:p-10 text-center space-y-4 shadow-xl"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-500 text-white shadow-lg ring-4 ring-amber-100">
                  <Flame className="h-7 w-7 animate-pulse text-amber-100" />
                </div>
                <h4 className="font-serif text-xl font-bold sm:text-2xl" style={{ color: textColor }}>
                  {content.lanternTitle || "Lentera Harapan yang Tak Pernah Padam 🏮"}
                </h4>
                <p className="font-serif text-sm sm:text-base italic text-stone-700 leading-relaxed max-w-xl mx-auto">
                  &ldquo;{content.lanternMessage}&rdquo;
                </p>
              </div>
            </section>
          )}

          {/* ===================================================================== */}
          {/* 8. KOTAK KASIH & SALIN TAUTAN (SHARE TO BELOVED) */}
          {/* ===================================================================== */}
          <section className="rounded-3xl border border-amber-200 bg-white p-6 sm:p-8 text-center space-y-4 shadow-xl">
            <div className="max-w-md mx-auto space-y-1.5">
              <h3 className="font-serif text-lg font-bold sm:text-xl" style={{ color: textColor }}>
                Bagikan Bintang Cinta Ini
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
                Tautan ini abadi dan dapat dibuka kembali kapan saja di bawah gemerlap langit semesta.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-2 rounded-full px-8 py-3 text-xs sm:text-sm font-bold text-white shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: primary,
                  boxShadow: `0 10px 25px ${primary}40`,
                }}
              >
                {copiedLink ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Tautan Surat Bintang Berhasil Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Salin Tautan Surat Bintang</span>
                  </>
                )}
              </button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export function StarlightLoveTemplate({ data, className }: StarlightLoveTemplateProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-stone-50" />}>
      <StarlightLoveTemplateInner data={data} className={className} />
    </Suspense>
  );
}
