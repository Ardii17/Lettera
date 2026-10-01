"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import {
  Play,
  Pause,
  Music,
  Disc3,
  Check,
  Copy,
  Sparkles,
  Radio,
  BookOpen,
  RotateCw,
  Heart,
  Clock,
  Headphones,
  Lock,
  Unlock,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { toParagraphs } from "@/lib/utils/format";
import type { LetterContent } from "@/types/letter";
import { withDefaults } from "../utils";

const defaults = {
  recipientName: "Nadia Safitri",
  senderName: "Dimas Anggara",
  tapeTitle: "Songs That Feel Like You • Vol. 1",
  anniversaryDate: "2022-10-14",
  releaseYear: "Est. 2022 • Special Edition",
  sideLabel: "SIDE A • FOR YOUR EARS ONLY",
  sideBTitle: "SIDE B • ACOUSTIC & HIDDEN GEMS",
  totalDuration: "Side A & B: 48 Menit • 6 Lagu Penuh Cinta",
  albumCoverPhotoUrl:
    "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80",
  sleeveMemoryPhotoUrl:
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1000&q=80",
  sleevePhotoCaption: "Tawa kita di sore itu, terselip selamanya di antara pita kenangan.",
  photo2Url:
    "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1000&q=80",
  photo2Caption: "Kala itu kita tertawa lepas tanpa peduli waktu terus berputar.",
  photo3Url:
    "https://images.unsplash.com/photo-1513279922550-250c2129b13a?auto=format&fit=crop&w=1000&q=80",
  photo3Caption: "Senja di pelataran stasiun saat kau tersenyum menatap mataku.",
  lyricSongTitle: "Reality Club — Anything You Want",
  favoriteLyric:
    "Kau adalah melodi yang tak pernah bosan kuputar berulang kali di kepalaku, selamanya.",
  title: "Catatan Dari Balik Pita Magnetik",
  introMessage: "Untuk seseorang yang melodi tawanya selalu memenuhi kepalaku,",
  message:
    "Nadia,\n\nKatanya, orang-orang di masa lalu merekam mixtape untuk orang yang paling mereka cintai—karena memilih lagu dan menyusunnya satu per satu butuh waktu, perhatian, dan ketulusan hati. Kaset digital ini adalah caraku merangkum apa yang kurasakan padamu.\n\nSetiap melodi yang ada di sini punya jejak tawamu, caramu memiringkan kepala saat berpikir, dan bagaimana caramu menggenggam tanganku erat saat kita menyeberang jalan. Bersamamu, hidup yang terkadang bising ini terasa seperti lagu favorit yang tak pernah ingin kuhentikan.\n\nTerima kasih telah mewarnai hari-hariku dengan harmoni yang begitu indah. Kaset ini milikmu, selamanya.",
  closingStatement: "Selalu memutar kenangan tentangmu,",
  signature: "Dimas Anggara",
  tracklistTitle: "Daftar Lagu di Balik Kisah Kita",
  track1Title: "Track 01: Reality Club — Anything You Want",
  track1Meaning: "Lagu yang kita dengarkan berdua saat pertama kali terjebak hujan bersama di mobil.",
  track2Title: "Track 02: Sheila On 7 — Anugerah Terindah yang Pernah Kumiliki",
  track2Meaning: "Lirik yang selalu mengingatkanku betapa bersyukurnya aku bisa memilikimu dalam hidupku.",
  track3Title: "Track 03: Danilla — Senja di Ambang Pilu",
  track3Meaning: "Melodi tenang yang selalu kita dengarkan saat duduk berdua menikmati senja sore di kedai kopi.",
  track4Title: "Track 04: Kings of Convenience — Cayman Islands",
  track4Meaning: "Lagu pengantar tidur ketika kita saling bercerita lewat telepon hingga larut malam.",
  track5Title: "Track 05: Maliq & D'Essentials — Kita Bikin Romantis",
  track5Meaning: "Tentang hal-hal kecil sederhana: sarapan berdua dan caramu tertawa tersipu.",
  track6Title: "Track 06: Pamungkas — To The Bone",
  track6Meaning: "Karena sejak hari pertama bertemu, tak ada lagi yang bisa menggantikan posisimu di hatiku.",
  secretDedication:
    "Bonus Track: Kalau kamu membaca sampai bagian tersembunyi ini, terima kasih sudah menjadi tempat ternyaman untuk pulang. Peluk aku saat kita bertemu nanti, ya!",
  handwrittenNote:
    "P.S. Jika kaset ini kusut, putar rodanya dengan bolpoin. Tapi cintaku padamu takkan pernah kusut selamanya :)",
  primaryColor: "#e15b64",
  backgroundColor: "#fbf8f3",
  cardColor: "#ffffff",
  textColor: "#27272a",
  bodyTextColor: "#4b5563",
  musicTitle: "",
  bgMusicUrl: "",
};

interface LoveMixtapeTemplateProps {
  data: LetterContent;
  className?: string;
}

interface DurationBreakdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function LoveMixtapeTemplateInner({ data, className }: LoveMixtapeTemplateProps) {
  const content = withDefaults(defaults, data);
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Mode Thumbnail atau Katalog /templates: TIDAK PERNAH menampilkan modal/popup fixed
  const isThumbnail =
    Boolean(data._isThumbnail) ||
    pathname === "/templates" ||
    className?.includes("is-thumbnail") ||
    className?.includes("thumb");

  // Mode Editor Side Preview: ditampilkan langsung terbuka agar nyaman mengedit form
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

  // Status kaset / sleeve terbuka
  const [isOpened, setIsOpened] = useState<boolean>(!shouldStartClosed);

  // Status Flip Kaset Fisik (Side A / Side B)
  const [tapeSide, setTapeSide] = useState<"A" | "B">("A");

  // Status Tab Tracklist (Side A / Side B)
  const [activeTrackTab, setActiveTrackTab] = useState<"A" | "B">("A");

  // Status Rahasia Hidden Track
  const [secretUnlocked, setSecretUnlocked] = useState(false);

  // Audio Musik Kaset
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Tape Counter Simulasi
  const [tapeCounter, setTapeCounter] = useState(42);

  // Real-time Love Duration
  const [loveDuration, setLoveDuration] = useState<DurationBreakdown | null>(null);

  useEffect(() => {
    if (!content.anniversaryDate) return;

    const calculateDuration = () => {
      const start = new Date(content.anniversaryDate);
      if (isNaN(start.getTime())) return;
      const now = new Date();
      const diffMs = Math.max(0, now.getTime() - start.getTime());

      const totalSec = Math.floor(diffMs / 1000);
      const days = Math.floor(totalSec / 86400);
      const hours = Math.floor((totalSec % 86400) / 3600);
      const minutes = Math.floor((totalSec % 3600) / 60);
      const seconds = totalSec % 60;

      setLoveDuration({ days, hours, minutes, seconds });
    };

    calculateDuration();
    const interval = setInterval(calculateDuration, 1000);
    return () => clearInterval(interval);
  }, [content.anniversaryDate]);

  // Counter bertambah saat lagu diputar
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setTapeCounter((prev) => (prev >= 999 ? 1 : prev + 1));
    }, 1500);
    return () => clearInterval(interval);
  }, [isPlaying]);

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
    setIsOpened(true);

    if (content.bgMusicUrl && audioRef.current && !isThumbnail && pathname !== "/templates") {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }

    setTimeout(() => {
      const target = document.getElementById("mixtape-sleeve-sheet");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }, 250);
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

  const paragraphs = toParagraphs(content.message);

  // Palet warna dinamis
  const primary = content.primaryColor || "#e15b64";
  const bg = content.backgroundColor || "#fbf8f3";
  const card = content.cardColor || "#ffffff";
  const textColor = content.textColor || "#27272a";
  const bodyText = content.bodyTextColor || "#4b5563";

  return (
    <div
      className={cn("relative min-h-screen font-sans selection:bg-rose-100", className)}
      style={{ backgroundColor: bg, color: bodyText }}
    >
      {/* Audio Elemen Tersembunyi */}
      {!isThumbnail && pathname !== "/templates" && content.bgMusicUrl && (
        <audio ref={audioRef} src={content.bgMusicUrl} loop preload="none" />
      )}

      {/* Floating Cassette Music Button */}
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
            aria-label={isPlaying ? "Jeda pita kaset" : "Putar pita kaset"}
          >
            <Disc3 className={cn("h-4 w-4", isPlaying && "animate-spin")} />
            <span className="text-xs font-semibold pr-1">
              {isPlaying ? "Pita Berputar" : "Putar Kaset"}
            </span>
            {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          </button>
        )}

      {/* ========================================================================= */}
      {/* 1. HERO KASET PITA FISIK RETRO 90-AN (SIDE A & SIDE B) */}
      {/* ========================================================================= */}
      <section
        className={cn(
          "relative flex w-full flex-col items-center justify-center overflow-hidden px-4 text-center transition-all duration-700",
          !isOpened && (isPublicLetter || isFullPreview)
            ? "fixed inset-0 z-50 min-h-screen py-10"
            : !isOpened
              ? "relative min-h-[540px] py-12"
              : "min-h-[480px] sm:min-h-[540px] py-16",
        )}
        style={{
          background: `radial-gradient(ellipse at center, ${primary}25 0%, ${bg} 100%)`,
        }}
      >
        <div className="relative z-10 mx-auto flex w-full max-w-lg flex-col items-center space-y-5">
          {/* Header Badges & Deck Status */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-stone-300 bg-white/90 px-3.5 py-1 text-[11px] font-semibold tracking-wider uppercase text-stone-700 backdrop-blur-sm shadow-xs">
              <Radio className="h-3.5 w-3.5" style={{ color: primary }} />
              <span>C-60 Analog Magnetic Tape</span>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-stone-300 bg-stone-900 px-3 py-1 font-mono text-[10px] font-bold text-amber-300 shadow-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>COUNTER: {String(tapeCounter).padStart(3, "0")}</span>
            </div>
          </div>

          {/* BODI KASET PITA REALISTIS */}
          <div
            className="relative w-full rounded-2xl border-4 p-5 sm:p-7 shadow-2xl transition-all duration-500"
            style={{
              backgroundColor: primary,
              borderColor: "#18181b",
              boxShadow: `0 20px 40px -10px ${primary}70, 0 4px 6px -2px rgba(0,0,0,0.1), inset 0 2px 4px rgba(255,255,255,0.35)`,
            }}
          >
            {/* 4 Sekrup Kaset Logam */}
            <div className="absolute top-2 left-2 h-2.5 w-2.5 rounded-full border border-stone-800 bg-stone-300 flex items-center justify-center shadow-xs">
              <span className="block h-px w-1.5 bg-stone-700" />
            </div>
            <div className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full border border-stone-800 bg-stone-300 flex items-center justify-center shadow-xs">
              <span className="block h-px w-1.5 bg-stone-700" />
            </div>
            <div className="absolute bottom-2 left-2 h-2.5 w-2.5 rounded-full border border-stone-800 bg-stone-300 flex items-center justify-center shadow-xs">
              <span className="block h-px w-1.5 bg-stone-700" />
            </div>
            <div className="absolute bottom-2 right-2 h-2.5 w-2.5 rounded-full border border-stone-800 bg-stone-300 flex items-center justify-center shadow-xs">
              <span className="block h-px w-1.5 bg-stone-700" />
            </div>

            {/* STIKER LABEL KASET PUTIH RETRO */}
            <div className="relative rounded-xl border-2 border-stone-300 bg-white p-4 text-left shadow-inner transition-all duration-300">
              {/* Header Label: Sisi & NR-Stereo */}
              <div className="flex items-center justify-between border-b-2 border-stone-200 pb-2">
                <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-widest text-stone-600 uppercase">
                  <span className="rounded bg-stone-900 px-2 py-0.5 text-white">
                    {tapeSide === "A" ? "SIDE A" : "SIDE B"}
                  </span>
                  <span>{content.releaseYear || "Est. 2022"}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold font-mono text-stone-500">
                  <Headphones className="h-3 w-3" />
                  <span>HI-FI STEREO</span>
                </div>
              </div>

              {/* Konten Label Bergantung Sisi Kaset (Side A vs Side B) */}
              {tapeSide === "A" ? (
                <div className="py-3 flex items-center justify-between gap-3">
                  <div className="space-y-1 min-w-0 flex-1">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-stone-400">
                      Mixtape Khusus Untuk:
                    </p>
                    <h2
                      className="font-serif text-2xl font-bold tracking-wide sm:text-3xl truncate"
                      style={{ color: textColor }}
                    >
                      {recipientName}
                    </h2>
                    <p className="font-mono text-xs text-stone-600 truncate font-semibold">
                      &ldquo;{content.tapeTitle || "Songs That Feel Like You"}&rdquo;
                    </p>
                    <p className="text-[11px] text-stone-500">
                      Direkam oleh:{" "}
                      <span className="font-semibold text-stone-800">{content.senderName}</span>
                    </p>
                    {content.totalDuration && (
                      <p className="font-mono text-[10px] font-semibold text-stone-600 pt-0.5">
                        ⏱️ {content.totalDuration}
                      </p>
                    )}
                  </div>

                  {content.albumCoverPhotoUrl && (
                    <div className="shrink-0 relative h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-lg border-2 border-stone-300 shadow-md bg-stone-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={content.albumCoverPhotoUrl}
                        alt="Mixtape Album Cover"
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute bottom-0 inset-x-0 bg-stone-950/80 py-0.5 text-center text-[7px] font-mono font-bold tracking-widest text-white uppercase">
                        Cover Art
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-3 flex items-center justify-between gap-3">
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="inline-flex items-center gap-1 rounded bg-amber-100 px-1.5 py-0.5 text-[9px] font-mono font-bold text-amber-900">
                      <Sparkles className="h-2.5 w-2.5" />
                      <span>B-SIDE ACOUSTIC & HIDDEN GEMS</span>
                    </div>
                    <h2
                      className="font-serif text-xl font-bold tracking-wide sm:text-2xl truncate"
                      style={{ color: textColor }}
                    >
                      {content.sideBTitle || "SIDE B • DEEP CUTS"}
                    </h2>
                    <p className="font-mono text-[11px] text-stone-600 leading-snug">
                      Tiga lagu pelengkap perjalanan rahasia & sebuah pesan tersembunyi.
                    </p>
                    <p className="font-mono text-[10px] text-rose-600 font-semibold pt-1">
                      🎧 &ldquo;Putar saat larut malam dan rindu datang&rdquo;
                    </p>
                  </div>

                  <div className="shrink-0 flex flex-col items-center justify-center h-20 w-20 sm:h-24 sm:w-24 rounded-lg border-2 border-dashed border-amber-300 bg-amber-50/80 p-2 text-center">
                    <Heart className="h-6 w-6 text-rose-500 animate-pulse mb-1" />
                    <span className="font-mono text-[8px] font-bold uppercase tracking-wider text-amber-950">
                      Side B
                    </span>
                    <span className="text-[7px] text-stone-500">Unreleased</span>
                  </div>
                </div>
              )}

              {/* JENDELA MIKA TRANSPARAN & RODA KASET */}
              <div className="my-2 rounded-lg border-2 border-stone-500/80 bg-stone-950 px-4 py-3 shadow-inner">
                <div className="flex items-center justify-between">
                  {/* Roda Kiri */}
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border-4 border-dashed border-stone-300 bg-stone-800 shadow-md transition-all",
                        isPlaying && "animate-spin",
                      )}
                    >
                      <div className="h-4 w-4 rounded-full bg-stone-950 border border-stone-500" />
                    </div>
                    <span className="font-mono text-[7px] uppercase tracking-wider text-stone-500 mt-1">
                      Feed
                    </span>
                  </div>

                  {/* Visualizer Spektrum Audio & Indikator LED */}
                  <div className="flex flex-col items-center justify-center px-3 space-y-1.5">
                    {/* Equalizer Bars */}
                    <div className="flex items-end gap-1 h-7 px-2">
                      {[
                        "h-3",
                        "h-6",
                        "h-4",
                        "h-7",
                        "h-5",
                        "h-6",
                        "h-3",
                        "h-5",
                      ].map((h, idx) => (
                        <span
                          key={idx}
                          className={cn(
                            "w-1 rounded-t transition-all duration-300",
                            isPlaying
                              ? `${h} bg-rose-500 animate-pulse`
                              : "h-1.5 bg-stone-700",
                          )}
                          style={{
                            animationDelay: `${idx * 120}ms`,
                          }}
                        />
                      ))}
                    </div>

                    {/* Status Play / Standby */}
                    <div className="flex items-center gap-1.5">
                      <span
                        className={cn(
                          "h-2 w-2 rounded-full",
                          isPlaying ? "bg-emerald-400 animate-ping" : "bg-amber-400",
                        )}
                      />
                      <span className="font-mono text-[9px] text-stone-400 font-bold uppercase tracking-wider">
                        {isPlaying ? "Tape Rolling" : "Stereo Deck Ready"}
                      </span>
                    </div>
                  </div>

                  {/* Roda Kanan */}
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        "flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border-4 border-dashed border-stone-300 bg-stone-800 shadow-md transition-all",
                        isPlaying && "animate-spin",
                      )}
                    >
                      <div className="h-4 w-4 rounded-full bg-stone-950 border border-stone-500" />
                    </div>
                    <span className="font-mono text-[7px] uppercase tracking-wider text-stone-500 mt-1">
                      Take-up
                    </span>
                  </div>
                </div>
              </div>

              {/* Tombol Flip Side A / Side B */}
              <div className="pt-1 flex items-center justify-between">
                <span className="font-mono text-[9px] text-stone-500 uppercase">
                  Magnetic Ribbon &bull; Stereo Inlay
                </span>
                <button
                  type="button"
                  onClick={() => setTapeSide(tapeSide === "A" ? "B" : "A")}
                  className="inline-flex items-center gap-1 rounded-md border border-stone-300 bg-stone-100 hover:bg-stone-200 px-2.5 py-1 text-[10px] font-mono font-bold text-stone-800 transition-colors shadow-2xs"
                >
                  <RotateCw className="h-2.5 w-2.5" />
                  <span>Balik ke SIDE {tapeSide === "A" ? "B" : "A"}</span>
                </button>
              </div>
            </div>

            {/* Kontrol Interaktif Play & Buka Surat */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              {isThumbnail ? (
                <div className="inline-flex items-center gap-1.5 rounded-full bg-white px-5 py-2 text-xs font-bold text-stone-800 shadow">
                  <Disc3 className="h-3.5 w-3.5 text-rose-600" />
                  <span>Kaset Mixtape Cinta</span>
                </div>
              ) : !isOpened ? (
                <button
                  type="button"
                  onClick={handleOpenLetter}
                  className="inline-flex items-center gap-2.5 rounded-full bg-stone-900 px-8 py-3.5 text-sm font-bold tracking-wide text-white shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border border-white/20"
                >
                  <Play className="h-4 w-4 fill-current text-rose-400" />
                  <span>Putar Kaset & Buka Surat</span>
                </button>
              ) : (
                <>
                  {content.bgMusicUrl ? (
                    <button
                      type="button"
                      onClick={toggleMusic}
                      className="inline-flex items-center gap-2 rounded-full bg-white/95 px-6 py-2.5 text-xs font-bold text-stone-900 shadow-lg transition-all hover:bg-white active:scale-95"
                    >
                      {isPlaying ? (
                        <>
                          <Pause className="h-4 w-4 text-rose-600" />
                          <span>Jeda Pemutaran Pita</span>
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 fill-current text-rose-600" />
                          <span>Lanjutkan Putar Kaset</span>
                        </>
                      )}
                    </button>
                  ) : null}

                  <button
                    type="button"
                    onClick={() => {
                      const target = document.getElementById("mixtape-sleeve-sheet");
                      if (target) {
                        target.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full bg-stone-900/80 hover:bg-stone-900 px-4 py-2.5 text-xs font-semibold text-white shadow-md transition-all border border-white/20"
                  >
                    <BookOpen className="h-3.5 w-3.5 text-rose-300" />
                    <span>Lihat Lipatan Surat Sleeve</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. LEMBARAN SLEEVE KASET (J-CARD INSERT SHEET) */}
      {/* ========================================================================= */}
      <div
        id="mixtape-sleeve-sheet"
        className="mx-auto max-w-3xl px-4 py-12 sm:px-6 space-y-16"
      >
        {/* Lembar Surat J-Card Sleeve */}
        <article
          className="relative rounded-3xl border-2 p-7 sm:p-14 shadow-xl space-y-9 backdrop-blur-sm"
          style={{
            backgroundColor: card,
            borderColor: `${primary}30`,
          }}
        >
          {/* Header Sleeve Kaset */}
          <header className="space-y-4 border-b border-stone-200 pb-7 text-center">
            <div
              className="inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-mono font-bold tracking-widest uppercase border"
              style={{ borderColor: `${primary}40`, color: primary }}
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>J-Card Inlay Letter &bull; Fold-Out Sleeve</span>
            </div>

            <h1
              className="font-serif text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
              style={{ color: textColor }}
            >
              {content.title}
            </h1>

            {content.introMessage && (
              <p className="font-mono text-sm sm:text-base italic text-stone-600 max-w-xl mx-auto">
                &ldquo;{content.introMessage}&rdquo;
              </p>
            )}

            {/* LIVE TAPE COUNTER / DURASI CINTA */}
            {loveDuration && (
              <div className="pt-3">
                <div className="inline-flex flex-col items-center rounded-2xl border border-stone-300 bg-stone-900 px-5 py-3 text-white shadow-md max-w-md w-full">
                  <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-amber-300 font-bold mb-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    <span>Pita Rekaman Cinta Telah Berputar:</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 sm:gap-3 font-mono text-sm sm:text-base font-bold text-amber-400">
                    <div className="flex flex-col items-center">
                      <span className="text-base sm:text-xl text-white">{loveDuration.days}</span>
                      <span className="text-[9px] uppercase tracking-wider text-stone-400">Hari</span>
                    </div>
                    <span className="text-stone-500">:</span>
                    <div className="flex flex-col items-center">
                      <span className="text-base sm:text-xl text-white">{String(loveDuration.hours).padStart(2, "0")}</span>
                      <span className="text-[9px] uppercase tracking-wider text-stone-400">Jam</span>
                    </div>
                    <span className="text-stone-500">:</span>
                    <div className="flex flex-col items-center">
                      <span className="text-base sm:text-xl text-white">{String(loveDuration.minutes).padStart(2, "0")}</span>
                      <span className="text-[9px] uppercase tracking-wider text-stone-400">Mnt</span>
                    </div>
                    <span className="text-stone-500">:</span>
                    <div className="flex flex-col items-center">
                      <span className="text-base sm:text-xl text-white">{String(loveDuration.seconds).padStart(2, "0")}</span>
                      <span className="text-[9px] uppercase tracking-wider text-stone-400">Dtk</span>
                    </div>
                  </div>
                  <p className="mt-2 text-[10px] text-stone-400 italic">
                    Setiap detik terekam abadi di dalam kaset ini.
                  </p>
                </div>
              </div>
            )}
          </header>

          {/* Paragraf Surat Cinta Utama */}
          <div className="space-y-6 font-serif text-base sm:text-lg leading-relaxed sm:leading-loose text-stone-800">
            {paragraphs.map((para, idx) => (
              <p key={idx} className="indent-6 sm:indent-8">
                {para}
              </p>
            ))}
          </div>

          {/* ======================================================================= */}
          {/* 3. GALERI 3 FOTO POLAROID SLEEVE KASET BERSERTA SELOTIP RETRO */}
          {/* ======================================================================= */}
          {(content.sleeveMemoryPhotoUrl || content.photo2Url || content.photo3Url) && (
            <div className="my-12 border-t border-b border-stone-200 py-10 space-y-6">
              <div className="text-center space-y-1">
                <div
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest"
                  style={{ color: primary }}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Sleeve Photo Reel &bull; Polaroid Inlay</span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold" style={{ color: textColor }}>
                  Momen di Antara Putaran Pita
                </h3>
              </div>

              {/* Grid 3 Foto Polaroid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-2">
                {/* Polaroid 1 */}
                {content.sleeveMemoryPhotoUrl && (
                  <div className="flex flex-col items-center">
                    <div className="w-full rounded-2xl border-4 bg-white p-3.5 shadow-xl transition-transform hover:-rotate-1 duration-300 relative border-[#ece5dd]">
                      <div className="mx-auto -mt-6 mb-2.5 h-4 w-20 rounded bg-amber-200/80 border border-amber-300/80 shadow-xs rotate-1" />
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-stone-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={content.sleeveMemoryPhotoUrl}
                          alt={content.sleevePhotoCaption || "Kenangan 1"}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      {content.sleevePhotoCaption && (
                        <p className="mt-2.5 text-center font-serif text-xs italic text-stone-600 leading-snug">
                          &ldquo;{content.sleevePhotoCaption}&rdquo;
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Polaroid 2 */}
                {content.photo2Url && (
                  <div className="flex flex-col items-center">
                    <div className="w-full rounded-2xl border-4 bg-white p-3.5 shadow-xl transition-transform hover:rotate-1 duration-300 relative border-[#ece5dd]">
                      <div className="mx-auto -mt-6 mb-2.5 h-4 w-20 rounded bg-amber-200/80 border border-amber-300/80 shadow-xs -rotate-2" />
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-stone-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={content.photo2Url}
                          alt={content.photo2Caption || "Kenangan 2"}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      {content.photo2Caption && (
                        <p className="mt-2.5 text-center font-serif text-xs italic text-stone-600 leading-snug">
                          &ldquo;{content.photo2Caption}&rdquo;
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Polaroid 3 */}
                {content.photo3Url && (
                  <div className="flex flex-col items-center sm:col-span-2 md:col-span-1">
                    <div className="w-full max-w-sm md:max-w-none rounded-2xl border-4 bg-white p-3.5 shadow-xl transition-transform hover:-rotate-1 duration-300 relative border-[#ece5dd]">
                      <div className="mx-auto -mt-6 mb-2.5 h-4 w-20 rounded bg-amber-200/80 border border-amber-300/80 shadow-xs rotate-2" />
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-stone-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={content.photo3Url}
                          alt={content.photo3Caption || "Kenangan 3"}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      {content.photo3Caption && (
                        <p className="mt-2.5 text-center font-serif text-xs italic text-stone-600 leading-snug">
                          &ldquo;{content.photo3Caption}&rdquo;
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ======================================================================= */}
          {/* 4. BOOKLET LIRIK LAGU CINTA FAVORIT */}
          {/* ======================================================================= */}
          {content.favoriteLyric && (
            <div
              className="my-8 rounded-2xl border-2 p-6 text-center space-y-3 shadow-xs"
              style={{
                backgroundColor: `${primary}0a`,
                borderColor: `${primary}35`,
              }}
            >
              <div
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider"
                style={{ color: primary }}
              >
                <Music className="h-3.5 w-3.5" />
                <span>
                  {content.lyricSongTitle
                    ? `Lirik Pilihan: ${content.lyricSongTitle}`
                    : "Lirik Lagu Favorit Berdua"}
                </span>
              </div>
              <p className="font-serif text-base sm:text-lg italic text-stone-800 leading-relaxed max-w-lg mx-auto">
                &ldquo;{content.favoriteLyric}&rdquo;
              </p>
            </div>
          )}

          {/* ======================================================================= */}
          {/* 5. TRACKLIST LENGKAP 6 LAGU (SIDE A & SIDE B INTERAKTIF) */}
          {/* ======================================================================= */}
          <div className="my-10 space-y-6 pt-6">
            <div className="text-center space-y-1.5">
              <div
                className="inline-flex items-center gap-1.5 text-xs font-bold font-mono tracking-widest uppercase"
                style={{ color: primary }}
              >
                <Music className="h-3.5 w-3.5" />
                <span>Mixtape Song Journey</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold" style={{ color: textColor }}>
                {content.tracklistTitle || "Daftar Lagu di Balik Kisah Kita"}
              </h3>
              <p className="text-xs sm:text-sm text-stone-500">
                Pilih sisi kaset untuk menjelajahi cerita di balik setiap melodi.
              </p>
            </div>

            {/* Toggle Tab Side A / Side B */}
            <div className="flex justify-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setActiveTrackTab("A")}
                className={cn(
                  "px-5 py-2 rounded-full font-mono text-xs font-bold uppercase transition-all shadow-2xs border",
                  activeTrackTab === "A"
                    ? "bg-stone-900 text-white border-stone-800"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200 border-stone-300",
                )}
              >
                Side A (Classics)
              </button>
              <button
                type="button"
                onClick={() => setActiveTrackTab("B")}
                className={cn(
                  "px-5 py-2 rounded-full font-mono text-xs font-bold uppercase transition-all shadow-2xs border",
                  activeTrackTab === "B"
                    ? "bg-stone-900 text-white border-stone-800"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200 border-stone-300",
                )}
              >
                Side B (Acoustic & Gems)
              </button>
            </div>

            {/* List Lagu Side A */}
            {activeTrackTab === "A" && (
              <div className="grid grid-cols-1 gap-3 pt-2 animate-in fade-in duration-200">
                {content.track1Title && (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-2xl border border-stone-200 bg-stone-50/70 p-4 transition-all hover:bg-stone-50">
                    <div className="space-y-1">
                      <p className="font-mono text-sm font-bold text-stone-900">
                        {content.track1Title}
                      </p>
                      {content.track1Meaning && (
                        <p className="text-xs sm:text-sm text-stone-600 italic">
                          &ldquo;{content.track1Meaning}&rdquo;
                        </p>
                      )}
                    </div>
                    <span className="shrink-0 font-mono text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                      Track A-01
                    </span>
                  </div>
                )}

                {content.track2Title && (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-2xl border border-stone-200 bg-stone-50/70 p-4 transition-all hover:bg-stone-50">
                    <div className="space-y-1">
                      <p className="font-mono text-sm font-bold text-stone-900">
                        {content.track2Title}
                      </p>
                      {content.track2Meaning && (
                        <p className="text-xs sm:text-sm text-stone-600 italic">
                          &ldquo;{content.track2Meaning}&rdquo;
                        </p>
                      )}
                    </div>
                    <span className="shrink-0 font-mono text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                      Track A-02
                    </span>
                  </div>
                )}

                {content.track3Title && (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-2xl border border-stone-200 bg-stone-50/70 p-4 transition-all hover:bg-stone-50">
                    <div className="space-y-1">
                      <p className="font-mono text-sm font-bold text-stone-900">
                        {content.track3Title}
                      </p>
                      {content.track3Meaning && (
                        <p className="text-xs sm:text-sm text-stone-600 italic">
                          &ldquo;{content.track3Meaning}&rdquo;
                        </p>
                      )}
                    </div>
                    <span className="shrink-0 font-mono text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                      Track A-03
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* List Lagu Side B */}
            {activeTrackTab === "B" && (
              <div className="grid grid-cols-1 gap-3 pt-2 animate-in fade-in duration-200">
                {content.track4Title && (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-2xl border border-stone-200 bg-amber-50/50 p-4 transition-all hover:bg-amber-50">
                    <div className="space-y-1">
                      <p className="font-mono text-sm font-bold text-stone-900">
                        {content.track4Title}
                      </p>
                      {content.track4Meaning && (
                        <p className="text-xs sm:text-sm text-stone-600 italic">
                          &ldquo;{content.track4Meaning}&rdquo;
                        </p>
                      )}
                    </div>
                    <span className="shrink-0 font-mono text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                      Track B-04
                    </span>
                  </div>
                )}

                {content.track5Title && (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-2xl border border-stone-200 bg-amber-50/50 p-4 transition-all hover:bg-amber-50">
                    <div className="space-y-1">
                      <p className="font-mono text-sm font-bold text-stone-900">
                        {content.track5Title}
                      </p>
                      {content.track5Meaning && (
                        <p className="text-xs sm:text-sm text-stone-600 italic">
                          &ldquo;{content.track5Meaning}&rdquo;
                        </p>
                      )}
                    </div>
                    <span className="shrink-0 font-mono text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                      Track B-05
                    </span>
                  </div>
                )}

                {content.track6Title && (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-2xl border border-stone-200 bg-amber-50/50 p-4 transition-all hover:bg-amber-50">
                    <div className="space-y-1">
                      <p className="font-mono text-sm font-bold text-stone-900">
                        {content.track6Title}
                      </p>
                      {content.track6Meaning && (
                        <p className="text-xs sm:text-sm text-stone-600 italic">
                          &ldquo;{content.track6Meaning}&rdquo;
                        </p>
                      )}
                    </div>
                    <span className="shrink-0 font-mono text-xs font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                      Track B-06
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ======================================================================= */}
          {/* 6. PESAN RAHASIA TERSEMBUNYI (HIDDEN BONUS TRACK) */}
          {/* ======================================================================= */}
          {content.secretDedication && (
            <div className="my-8 rounded-2xl border-2 border-stone-300 bg-stone-950 p-5 text-white shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-rose-500 animate-ping" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-rose-400">
                    Hidden Bonus Track (Side B Secret)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSecretUnlocked(!secretUnlocked)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-stone-800 hover:bg-stone-700 px-3 py-1 text-[11px] font-mono text-stone-200 transition-colors border border-stone-700"
                >
                  {secretUnlocked ? (
                    <>
                      <Unlock className="h-3 w-3 text-emerald-400" />
                      <span>Kunci Pesan</span>
                    </>
                  ) : (
                    <>
                      <Lock className="h-3 w-3 text-amber-400" />
                      <span>Buka Pesan Rahasia</span>
                    </>
                  )}
                </button>
              </div>

              {secretUnlocked ? (
                <div className="pt-1 animate-in fade-in zoom-in-95 duration-300 space-y-2">
                  <p className="font-serif text-base italic text-amber-100 leading-relaxed">
                    &ldquo;{content.secretDedication}&rdquo;
                  </p>
                  <p className="font-mono text-[10px] text-stone-400">
                    *Hanya tersimpan di bagian paling ujung pita kaset ini.
                  </p>
                </div>
              ) : (
                <div className="py-4 text-center space-y-2">
                  <Sparkles className="h-5 w-5 text-amber-400 mx-auto animate-bounce" />
                  <p className="font-mono text-xs text-stone-400">
                    Ada pesan rahasia yang tersembunyi di akhir rekaman pita Side B.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSecretUnlocked(true)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-rose-600 hover:bg-rose-500 px-4 py-1.5 text-xs font-bold text-white transition-all shadow-sm"
                  >
                    <span>Klik Untuk Mendengarkan Bisikan Ini</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ======================================================================= */}
          {/* 7. MEMO TULISAN TANGAN BELAKANG KASET */}
          {/* ======================================================================= */}
          {content.handwrittenNote && (
            <div className="my-8 rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50/80 p-5 shadow-xs space-y-2 relative">
              {/* Selotip Vintage Kecil di Sudut */}
              <div className="absolute -top-2.5 right-6 h-4 w-16 rounded bg-amber-200/90 border border-amber-300/80 rotate-3 shadow-2xs" />
              <div className="flex items-center gap-1.5 text-xs font-bold font-mono text-amber-800 uppercase">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Memo Tulisan Tangan di Belakang Kaset</span>
              </div>
              <p className="font-serif text-sm sm:text-base italic text-amber-950 leading-relaxed">
                {content.handwrittenNote}
              </p>
            </div>
          )}

          {/* Penutup & Tanda Tangan */}
          <footer className="border-t border-stone-200 pt-8 text-right space-y-2">
            <p className="font-mono text-xs uppercase tracking-wider text-stone-400">
              {content.closingStatement || "Selalu memutar kenangan tentangmu,"}
            </p>
            <p
              className="font-serif text-2xl font-bold tracking-wide sm:text-3xl"
              style={{ color: textColor }}
            >
              {content.signature}
            </p>
          </footer>
        </article>

        {/* ========================================================================= */}
        {/* 8. KOTAK KASIH & SALIN TAUTAN */}
        {/* ========================================================================= */}
        <section
          className="rounded-3xl border-2 p-6 sm:p-8 text-center space-y-4 shadow-sm"
          style={{ backgroundColor: card, borderColor: `${primary}30` }}
        >
          <div className="max-w-md mx-auto space-y-1.5">
            <h3 className="font-serif text-lg font-bold sm:text-xl" style={{ color: textColor }}>
              Bagikan Kaset Mixtape Cinta Ini
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
              Tautan mixtape ini abadi dan dapat diputar kapan saja oleh orang tersayangmu.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-xs font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
              style={{ backgroundColor: primary }}
            >
              {copiedLink ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Tautan Kaset Berhasil Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Salin Tautan Kaset Mixtape</span>
                </>
              )}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export function LoveMixtapeTemplate({ data, className }: LoveMixtapeTemplateProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-rose-50/30" />}>
      <LoveMixtapeTemplateInner data={data} className={className} />
    </Suspense>
  );
}
