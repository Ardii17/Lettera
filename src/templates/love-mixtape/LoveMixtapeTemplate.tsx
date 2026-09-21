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
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { toParagraphs } from "@/lib/utils/format";
import type { LetterContent } from "@/types/letter";
import { withDefaults } from "../utils";

const defaults = {
  recipientName: "Nadia Safitri",
  senderName: "Dimas Anggara",
  tapeTitle: "Songs That Feel Like You • Vol. 1",
  releaseYear: "Est. 2022 • Special Edition",
  sideLabel: "SIDE A • FOR YOUR EARS ONLY",
  totalDuration: "Side A: 24 Menit • 3 Lagu Penuh Cinta",
  albumCoverPhotoUrl:
    "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80",
  sleeveMemoryPhotoUrl:
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1000&q=80",
  sleevePhotoCaption: "Tawa kita di sore itu, terselip selamanya di antara pita kenangan.",
  favoriteLyric:
    "Kau adalah melodi yang tak pernah bosan kuputar berulang kali di kepalaku.",
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

  // Nama penerima (bisa diambil dari query ?to=... jika ada, atau default)
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

  // Audio Musik Kaset
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
    setIsOpened(true);

    // Otomatis mulai memutar musik kaset saat tombol play ditekan
    if (content.bgMusicUrl && audioRef.current && !isThumbnail && pathname !== "/templates") {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Autoplay dicegah browser
        });
    }

    // Scroll halus ke lembaran sleeve kaset
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
      {/* Audio Elemen Tersembunyi (hanya aktif di luar katalog dan jika ada URL) */}
      {!isThumbnail && pathname !== "/templates" && content.bgMusicUrl && (
        <audio ref={audioRef} src={content.bgMusicUrl} loop preload="auto" />
      )}

      {/* Floating Cassette Music Button (hanya tampil di surat publik / detail / pratinjau penuh) */}
      {!isThumbnail &&
        !isEditorPreview &&
        pathname !== "/templates" &&
        (isPublicLetter || isFullPreview || isDetailPage) &&
        content.bgMusicUrl &&
        isOpened && (
          <button
            type="button"
            onClick={toggleMusic}
            className="fixed right-5 bottom-6 z-40 flex items-center gap-2 rounded-full border border-white/60 px-4 py-2.5 shadow-2xl backdrop-blur-md transition-all hover:scale-105"
            style={{ backgroundColor: primary, color: "#ffffff" }}
            aria-label={isPlaying ? "Jeda pita kaset" : "Putar pita kaset"}
          >
            <Disc3 className={cn("h-4 w-4", isPlaying && "animate-spin")} />
            <span className="text-xs font-semibold pr-1">
              {isPlaying ? "Pita Kaset Berputar" : "Putar Kaset Cinta"}
            </span>
            {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          </button>
        )}

      {/* ========================================================================= */}
      {/* 1. KASET PITA FISIK RETRO 90-AN (HERO / COVER) */}
      {/* ========================================================================= */}
      <section
        className={cn(
          "relative flex w-full flex-col items-center justify-center overflow-hidden px-4 text-center transition-all duration-700",
          !isOpened && (isPublicLetter || isFullPreview)
            ? "fixed inset-0 z-50 min-h-screen py-10"
            : !isOpened
              ? "relative min-h-[520px] py-12"
              : "min-h-[460px] sm:min-h-[520px] py-16",
        )}
        style={{
          background: `radial-gradient(ellipse at center, ${primary}20 0%, ${bg} 100%)`,
        }}
      >
        <div className="relative z-10 mx-auto flex w-full max-w-lg flex-col items-center space-y-6">
          {/* Badge Cassette Tape Header */}
          <div className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white/80 px-4 py-1.5 text-[11px] font-semibold tracking-wider uppercase text-stone-700 backdrop-blur-sm shadow-sm">
            <Radio className="h-3.5 w-3.5" style={{ color: primary }} />
            <span>Analog Magnetic Tape &bull; 60 Min</span>
          </div>

          {/* BODI KASET PITA REALISTIS */}
          <div
            className="relative w-full rounded-2xl border-4 p-5 sm:p-7 shadow-2xl transition-transform"
            style={{
              backgroundColor: primary,
              borderColor: "#18181b",
              boxShadow: `0 20px 40px -10px ${primary}70, 0 4px 6px -2px rgba(0,0,0,0.1), inset 0 2px 4px rgba(255,255,255,0.3)`,
            }}
          >
            {/* 4 Sekrup Kaset di Tiap Sudut */}
            <div className="absolute top-2 left-2 h-2.5 w-2.5 rounded-full border border-stone-800 bg-stone-300 flex items-center justify-center">
              <span className="block h-px w-1.5 bg-stone-700" />
            </div>
            <div className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full border border-stone-800 bg-stone-300 flex items-center justify-center">
              <span className="block h-px w-1.5 bg-stone-700" />
            </div>
            <div className="absolute bottom-2 left-2 h-2.5 w-2.5 rounded-full border border-stone-800 bg-stone-300 flex items-center justify-center">
              <span className="block h-px w-1.5 bg-stone-700" />
            </div>
            <div className="absolute bottom-2 right-2 h-2.5 w-2.5 rounded-full border border-stone-800 bg-stone-300 flex items-center justify-center">
              <span className="block h-px w-1.5 bg-stone-700" />
            </div>

            {/* STIKER LABEL KASET PUTIH (STICKER INSET) */}
            <div className="relative rounded-xl border-2 border-stone-300 bg-white p-4 text-left shadow-inner">
              {/* Header Label: Sisi & Judul */}
              <div className="flex items-center justify-between border-b-2 border-stone-200 pb-2">
                <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-widest text-stone-500 uppercase">
                  <span className="rounded bg-stone-800 px-1.5 py-0.5 text-white">
                    {content.sideLabel || "SIDE A"}
                  </span>
                  <span>{content.releaseYear || "Est. 2022"}</span>
                </div>
                <div className="flex items-center gap-1 text-xs font-bold font-mono text-stone-400">
                  <Music className="h-3 w-3" />
                  <span>NR-STEREO</span>
                </div>
              </div>

              {/* Judul Mixtape, Penerima & Artwork Album Cover */}
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
                    Direkam oleh: <span className="font-semibold text-stone-800">{content.senderName}</span>
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
                    <div className="absolute bottom-0 inset-x-0 bg-stone-950/75 py-0.5 text-center text-[7px] font-mono font-bold tracking-widest text-white uppercase">
                      Album Art
                    </div>
                  </div>
                )}
              </div>

              {/* JENDELA MIKA TRANSPARAN & RODA KASET */}
              <div className="my-2 flex items-center justify-between rounded-lg border-2 border-stone-400/80 bg-stone-900 px-6 py-4 shadow-inner">
                {/* Roda Kiri */}
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-full border-4 border-dashed border-stone-300 bg-stone-800 shadow-md",
                      isPlaying && "animate-spin",
                    )}
                  >
                    <div className="h-4 w-4 rounded-full bg-stone-950 border border-stone-500" />
                  </div>
                </div>

                {/* Jendela Pita Magnetik Tengah */}
                <div className="flex flex-col items-center justify-center px-2">
                  <div className="h-6 w-24 rounded border border-stone-700 bg-amber-950/80 flex items-center justify-center">
                    <span className="font-mono text-[8px] tracking-widest text-amber-200/70 uppercase">
                      Pita 60m
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="font-mono text-[9px] text-stone-400 font-semibold uppercase">
                      {isPlaying ? "Playing" : "Tape Ready"}
                    </span>
                  </div>
                </div>

                {/* Roda Kanan */}
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "flex h-12 w-12 items-center justify-center rounded-full border-4 border-dashed border-stone-300 bg-stone-800 shadow-md",
                      isPlaying && "animate-spin",
                    )}
                  >
                    <div className="h-4 w-4 rounded-full bg-stone-950 border border-stone-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Tombol Interaktif Play Kaset / Buka Sleeve */}
            <div className="mt-5 flex items-center justify-center">
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
                <button
                  type="button"
                  onClick={toggleMusic}
                  className="inline-flex items-center gap-2 rounded-full bg-white/95 px-6 py-2.5 text-xs font-bold text-stone-900 shadow-lg transition-all hover:bg-white"
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
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. LEMBARAN SLEEVE KASET (J-CARD SLEEVE LETTER) */}
      {/* ========================================================================= */}
      <div
        id="mixtape-sleeve-sheet"
        className="mx-auto max-w-3xl px-4 py-12 sm:px-6 space-y-16"
      >
        {/* Lembar Surat J-Card Sleeve */}
        <article
          className="relative rounded-3xl border-2 p-8 sm:p-14 shadow-xl space-y-8 backdrop-blur-sm"
          style={{
            backgroundColor: card,
            borderColor: `${primary}30`,
          }}
        >
          {/* Header Sleeve Kaset */}
          <header className="space-y-4 border-b border-stone-200 pb-6 text-center">
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1 text-xs font-mono font-bold tracking-widest uppercase border" style={{ borderColor: `${primary}40`, color: primary }}>
              <BookOpen className="h-3.5 w-3.5" />
              <span>J-Card Inlay Letter &bull; Insert Sheet</span>
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
          {/* FOTO POLAROID KENANGAN DI DALAM SLEEVE KASET */}
          {/* ======================================================================= */}
          {content.sleeveMemoryPhotoUrl && (
            <div className="my-10 flex flex-col items-center">
              <div
                className="w-full max-w-sm rounded-2xl border-4 bg-white p-4 shadow-xl transition-transform hover:-rotate-1 duration-300 relative"
                style={{ borderColor: "#ece5dd" }}
              >
                {/* Selotip Vintage di Bagian Atas */}
                <div className="mx-auto -mt-6 mb-3 h-5 w-24 rounded bg-amber-200/80 border border-amber-300 shadow-sm opacity-90 rotate-1" />

                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-stone-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={content.sleeveMemoryPhotoUrl}
                    alt={content.sleevePhotoCaption || "Kenangan Sleeve Kaset"}
                    className="h-full w-full object-cover"
                  />
                </div>
                {content.sleevePhotoCaption && (
                  <p className="mt-3 text-center font-serif text-xs italic text-stone-600 sm:text-sm">
                    &ldquo;{content.sleevePhotoCaption}&rdquo;
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Kutipan Lirik Lagu Cinta Favorit */}
          {content.favoriteLyric && (
            <div
              className="my-8 rounded-2xl border-2 p-5 text-center space-y-2 shadow-sm"
              style={{
                backgroundColor: `${primary}0d`,
                borderColor: `${primary}35`,
              }}
            >
              <div
                className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider"
                style={{ color: primary }}
              >
                <Music className="h-3.5 w-3.5" />
                <span>Lirik Lagu Favorit Kita</span>
              </div>
              <p className="font-serif text-base sm:text-lg italic text-stone-800 leading-relaxed max-w-md mx-auto">
                &ldquo;{content.favoriteLyric}&rdquo;
              </p>
            </div>
          )}

          {/* ======================================================================= */}
          {/* 3. TRACKLIST LAGU KENANGAN (SIDE A TRACKS) */}
          {/* ======================================================================= */}
          {(content.track1Title || content.track2Title || content.track3Title) && (
            <div className="my-10 space-y-5 border-t border-stone-200 pt-8">
              <div className="text-center space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold font-mono tracking-widest uppercase" style={{ color: primary }}>
                  <Music className="h-3.5 w-3.5" />
                  <span>Mixtape Tracklist</span>
                </div>
                <h3 className="font-serif text-xl font-bold sm:text-2xl" style={{ color: textColor }}>
                  {content.tracklistTitle || "Daftar Lagu di Balik Kisah Kita"}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-3 pt-2">
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
                    <span className="shrink-0 font-mono text-xs font-semibold text-stone-400">
                      Track 01
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
                    <span className="shrink-0 font-mono text-xs font-semibold text-stone-400">
                      Track 02
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
                    <span className="shrink-0 font-mono text-xs font-semibold text-stone-400">
                      Track 03
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ======================================================================= */}
          {/* 4. MEMO TULISAN TANGAN BELAKANG KASET */}
          {/* ======================================================================= */}
          {content.handwrittenNote && (
            <div className="my-8 rounded-2xl border-2 border-dashed border-amber-300 bg-amber-50/80 p-5 shadow-sm space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold font-mono text-amber-800 uppercase">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Memo Tulisan Tangan</span>
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
            <p className="font-serif text-2xl font-bold tracking-wide sm:text-3xl" style={{ color: textColor }}>
              {content.signature}
            </p>
          </footer>
        </article>

        {/* ========================================================================= */}
        {/* 5. KOTAK KASIH & SALIN TAUTAN */}
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
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-xs font-semibold text-white shadow-md transition-all duration-300 hover:scale-105"
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
