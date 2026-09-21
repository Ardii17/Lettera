"use client";

import { useEffect, useRef, useState, Suspense } from "react";
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
  starCoordinate: "RA 05h 35m • Dec -05° 23′ (Celestial Orion)",
  starName: "Stella Clarissa Majoris ✨",
  anniversaryDate: "14 Februari 2023 • Malam Langit Sejajar",
  starlightPhotoUrl:
    "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1000&q=80",
  starlightPhotoCaption: "Malam pertama kita menatap gemintang bersama di atas bukit.",
  secondPhotoUrl:
    "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1000&q=80",
  secondPhotoCaption: "Genggaman jemari yang selalu menghangatkan dinginnya malam.",
  title: "Di Antara Miliaran Bintang di Langit Semesta",
  openingQuote:
    "Jika setiap bintang di langit malam adalah alasan mengapa aku mencintaimu, maka seluruh galaksi ini pun tak akan cukup untuk menghitungnya.",
  message:
    "Clarissa,\n\nSetiap kali aku menatap langit malam, aku selalu terpana menyadari betapa luas dan megahnya alam semesta ini. Namun di tengah keheningan kosmik yang tak berujung, hatiku menemukan tempat berlabuh yang paling hangat: dirimu.\n\nKehadiranmu dalam hidupku bukan sekadar kebetulan, melainkan takdir terindah yang digariskan bintang. Senyumanmu adalah fajar yang selalu menepis gelap, dan tawamu adalah melodi paling merdu yang menenangkan setiap kekhawatiranku.\n\nDi malam yang hening ini, aku ingin menegaskan kembali rasa cintaku padamu. Tak peduli sejauh apa roda waktu berputar atau seberapa dingin malam merayap, rasa kagum dan sayangku padamu akan tetap bersinar abadi, seperti bintang utara yang tak pernah bergeser dari porosnya.",
  closingWord: "Mencintaimu hingga ke ujung galaksi terluar,",
  signature: "Reyhan Danendra",
  wishesTitle: "Tiga Bintang Harapan di Bawah Langit Malam",
  star1: "Bintang Kedamaian: Selalu menjadi pelabuhan paling tenang dan aman saat harimu terasa lelah.",
  star2: "Bintang Ketulusan: Menjagamu dengan kejujuran, kehangatan, dan kesetiaan yang tak luntur oleh waktu.",
  star3: "Bintang Keabadian: Terus menggenggam jemarimu dan menatap langit masa depan bersama-sama.",
  lanternTitle: "Lentera Harapan yang Tak Pernah Padam 🏮",
  lanternMessage:
    "Lentera ini membawa doa dan rasa syukurku atas hadirnya dirimu. Semoga hangatnya cahaya cinta kita selalu menerangi setiap lorong waktu yang kita lalui bersama.",
  primaryColor: "#f5c542",
  backgroundColor: "#0b0f19",
  cardColor: "#131b2e",
  textColor: "#fef3c7",
  bodyTextColor: "#cbd5e1",
  musicTitle: "",
  bgMusicUrl: "",
};

interface StarlightLoveTemplateProps {
  data: LetterContent;
  className?: string;
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
    setIsOpened(true);

    // Otomatis mulai memutar musik saat lentera diterbangkan
    if (content.bgMusicUrl && audioRef.current && !isThumbnail && pathname !== "/templates") {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Autoplay dicegah browser
        });
    }

    // Scroll halus ke lembaran surat kaca
    setTimeout(() => {
      const target = document.getElementById("starlight-letter-sheet");
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
  const primary = content.primaryColor || "#f5c542";
  const bg = content.backgroundColor || "#0b0f19";
  const card = content.cardColor || "#131b2e";
  const textColor = content.textColor || "#fef3c7";
  const bodyText = content.bodyTextColor || "#cbd5e1";

  return (
    <div
      className={cn("relative min-h-screen font-sans selection:bg-amber-900/40 text-slate-200", className)}
      style={{ backgroundColor: bg, color: bodyText }}
    >
      {/* Audio Elemen Tersembunyi (hanya aktif di luar katalog dan jika ada URL) */}
      {!isThumbnail && pathname !== "/templates" && content.bgMusicUrl && (
        <audio ref={audioRef} src={content.bgMusicUrl} loop preload="none" />
      )}

      {/* Floating Starlight Music Button (hanya tampil di surat publik / detail / pratinjau penuh) */}
      {!isThumbnail &&
        !isEditorPreview &&
        pathname !== "/templates" &&
        (isPublicLetter || isFullPreview || isDetailPage) &&
        content.bgMusicUrl &&
        isOpened && (
          <button
            type="button"
            onClick={toggleMusic}
            className="fixed right-5 bottom-6 z-40 flex items-center gap-2 rounded-full border border-amber-400/40 px-4 py-2.5 shadow-2xl backdrop-blur-md transition-all hover:scale-105"
            style={{ backgroundColor: `${card}dd`, color: primary }}
            aria-label={isPlaying ? "Jeda musik malam" : "Putar musik malam"}
          >
            <Orbit className={cn("h-4 w-4", isPlaying && "animate-spin text-amber-300")} />
            <span className="text-xs font-semibold pr-1 text-amber-100">
              {isPlaying ? "Alunan Bintang Mengalun" : "Putar Musik Malam"}
            </span>
            {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          </button>
        )}

      {/* ========================================================================= */}
      {/* 1. LANGIT MALAM BERBINTANG & PETA RASI BINTANG (HERO / COVER) */}
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
          background: `radial-gradient(ellipse at top, ${primary}20 0%, ${bg} 80%)`,
        }}
      >
        {/* Ornamen Bintang Berkelap-kelip Latar Belakang */}
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute top-1/4 left-1/6 h-1 w-1 rounded-full bg-white shadow-[0_0_8px_#fff]" />
          <div className="absolute top-1/3 right-1/4 h-1.5 w-1.5 rounded-full bg-amber-200 shadow-[0_0_10px_#f5c542]" />
          <div className="absolute top-2/3 left-1/3 h-1 w-1 rounded-full bg-white shadow-[0_0_6px_#fff]" />
          <div className="absolute top-1/2 right-1/6 h-1 w-1 rounded-full bg-sky-200 shadow-[0_0_8px_#38bdf8]" />
          <div className="absolute bottom-1/4 right-1/3 h-1.5 w-1.5 rounded-full bg-amber-100 shadow-[0_0_10px_#fef08a]" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-lg flex-col items-center space-y-6">
          {/* Badge Peta Bintang Kenangan */}
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-slate-950/60 px-4 py-1.5 text-[11px] font-semibold tracking-widest uppercase text-amber-200 backdrop-blur-md shadow-lg">
            <Moon className="h-3.5 w-3.5 text-amber-400" />
            <span>{content.constellationTitle || "Gugusan Bintang Kenangan"}</span>
          </div>

          {/* Kartu Rasi Bintang Emas */}
          <div
            className="relative w-full rounded-3xl border p-6 sm:p-8 text-center shadow-2xl backdrop-blur-xl overflow-hidden"
            style={{
              backgroundColor: `${card}cc`,
              borderColor: `${primary}35`,
            }}
          >
            {/* Ornamen Garis Konstelasi */}
            <div className="flex items-center justify-center gap-3 text-amber-300/80 mb-2">
              <Star className="h-3 w-3 fill-current" />
              <span className="h-px w-8 bg-amber-400/30" />
              <Sparkles className="h-5 w-5 text-amber-300 animate-pulse" />
              <span className="h-px w-8 bg-amber-400/30" />
              <Star className="h-3 w-3 fill-current" />
            </div>

            {/* Nama Penerima (Tertuju Untuk) */}
            <p className="text-[11px] font-medium tracking-widest uppercase text-amber-200/70 pt-2">
              Ditujukan Kepada Bintang Hatiku:
            </p>
            <h2
              className="mt-2 font-serif text-3xl font-extrabold tracking-wide sm:text-4xl text-transparent bg-clip-text"
              style={{
                backgroundImage: `linear-gradient(to bottom, #ffffff, ${textColor})`,
              }}
            >
              {recipientName}
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Dari: <span className="font-semibold text-slate-200">{content.senderName}</span>
            </p>

            {/* Nama Bintang Simbolik */}
            {content.starName && (
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1 text-xs font-serif text-amber-200">
                <Star className="h-3 w-3 fill-amber-300 text-amber-300" />
                <span>Bintang Khusus: <span className="font-semibold text-amber-100">{content.starName}</span></span>
              </div>
            )}

            {/* Koordinat & Tanggal Kenangan */}
            <div className="mt-6 inline-flex flex-col items-center gap-1 rounded-2xl border border-amber-400/20 bg-slate-900/50 px-5 py-3 text-center">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-300">
                <Compass className="h-3.5 w-3.5" />
                <span>{content.specialDate || "14 Februari 2023"}</span>
              </div>
              <p className="text-[11px] font-mono text-slate-400 tracking-wider">
                {content.starCoordinate || "RA 05h 35m • Dec -05° 23′"}
              </p>
              {content.anniversaryDate && (
                <p className="text-[10px] text-amber-200/80 pt-0.5 font-serif italic">
                  ✨ {content.anniversaryDate}
                </p>
              )}
            </div>

            {/* Tombol Interaktif Terbangkan Lentera */}
            <div className="mt-6 flex flex-col items-center justify-center">
              {isThumbnail ? (
                <div
                  className="inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-xs font-semibold text-slate-950 shadow-lg"
                  style={{ backgroundColor: primary }}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Surat Bintang Semesta</span>
                </div>
              ) : !isOpened ? (
                <button
                  type="button"
                  onClick={handleOpenLetter}
                  className="group inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 text-sm font-semibold tracking-wide text-slate-950 shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
                  style={{
                    backgroundColor: primary,
                    boxShadow: `0 0 25px ${primary}80`,
                  }}
                >
                  <Flame className="h-4 w-4 text-amber-900 group-hover:animate-bounce" />
                  <span>Nyalakan Lentera & Buka Surat</span>
                </button>
              ) : (
                <div
                  className="flex items-center justify-center gap-1.5 text-xs font-medium"
                  style={{ color: primary }}
                >
                  <Sparkles className="h-4 w-4 animate-pulse" />
                  <span>Lentera Cinta Telah Bersinar</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. LEMBARAN SURAT KACA TEMARAM (DARK GLASSMORPHISM) */}
      {/* ========================================================================= */}
      <div
        id="starlight-letter-sheet"
        className="mx-auto max-w-3xl px-4 py-12 sm:px-6 space-y-16"
      >
        {/* Lembar Surat Utama */}
        <article
          className="relative rounded-3xl border p-8 sm:p-14 shadow-2xl space-y-8 backdrop-blur-xl"
          style={{
            backgroundColor: `${card}d9`,
            borderColor: `${primary}35`,
          }}
        >
          {/* Garis ornamen kilau bintang */}
          <div className="flex items-center justify-center gap-2 text-amber-300/60">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-amber-400/40" />
            <Star className="h-4 w-4 fill-current text-amber-300" />
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-amber-400/40" />
          </div>

          <header className="space-y-4 text-center">
            <h1
              className="font-serif text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
              style={{ color: textColor }}
            >
              {content.title}
            </h1>

            {content.openingQuote && (
              <p className="font-serif text-sm sm:text-base italic text-amber-200/80 max-w-xl mx-auto leading-relaxed">
                &ldquo;{content.openingQuote}&rdquo;
              </p>
            )}
          </header>

          {/* Paragraf Surat Cinta Utama */}
          <div className="space-y-6 font-serif text-base sm:text-lg leading-relaxed sm:leading-loose text-slate-300">
            {paragraphs.map((para, idx) => (
              <p key={idx} className="indent-6 sm:indent-8">
                {para}
              </p>
            ))}
          </div>

          {/* ======================================================================= */}
          {/* PORTAL FOTO KOSMIK KENANGAN (STARLIGHT MEMORIES) */}
          {/* ======================================================================= */}
          {(content.starlightPhotoUrl || content.secondPhotoUrl) && (
            <div className="my-10 space-y-4">
              {content.starlightPhotoUrl && content.secondPhotoUrl ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                  {/* Foto 1: Portal Bintang Utama */}
                  <div
                    className="group relative rounded-2xl border p-3 backdrop-blur-md transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      backgroundColor: `${card}b0`,
                      borderColor: `${primary}40`,
                      boxShadow: `0 0 25px ${primary}20`,
                    }}
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-950">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={content.starlightPhotoUrl}
                        alt={content.starlightPhotoCaption || "Foto Bintang Kenangan"}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-2 right-2 rounded-full bg-slate-950/70 p-1 backdrop-blur-sm border border-amber-400/30">
                        <Star className="h-3 w-3 fill-amber-300 text-amber-300" />
                      </div>
                    </div>
                    {content.starlightPhotoCaption && (
                      <p className="mt-2.5 text-center font-serif text-xs italic text-amber-200/90">
                        &ldquo;{content.starlightPhotoCaption}&rdquo;
                      </p>
                    )}
                  </div>

                  {/* Foto 2: Nebula Kasih */}
                  <div
                    className="group relative rounded-2xl border p-3 backdrop-blur-md transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      backgroundColor: `${card}b0`,
                      borderColor: `${primary}40`,
                      boxShadow: `0 0 25px ${primary}20`,
                    }}
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-950">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={content.secondPhotoUrl}
                        alt={content.secondPhotoCaption || "Foto Nebula Kenangan"}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-2 right-2 rounded-full bg-slate-950/70 p-1 backdrop-blur-sm border border-amber-400/30">
                        <Sparkles className="h-3 w-3 text-amber-300" />
                      </div>
                    </div>
                    {content.secondPhotoCaption && (
                      <p className="mt-2.5 text-center font-serif text-xs italic text-amber-200/90">
                        &ldquo;{content.secondPhotoCaption}&rdquo;
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="mx-auto max-w-md">
                  <div
                    className="group relative rounded-2xl border p-4 backdrop-blur-md transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      backgroundColor: `${card}b0`,
                      borderColor: `${primary}40`,
                      boxShadow: `0 0 30px ${primary}25`,
                    }}
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-950">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={content.starlightPhotoUrl || content.secondPhotoUrl}
                        alt={content.starlightPhotoCaption || content.secondPhotoCaption || "Foto Bintang Kenangan"}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-2.5 right-2.5 rounded-full bg-slate-950/70 p-1.5 backdrop-blur-sm border border-amber-400/30">
                        <Star className="h-3.5 w-3.5 fill-amber-300 text-amber-300" />
                      </div>
                    </div>
                    {(content.starlightPhotoCaption || content.secondPhotoCaption) && (
                      <p className="mt-3 text-center font-serif text-xs italic text-amber-200/90 sm:text-sm">
                        &ldquo;{content.starlightPhotoCaption || content.secondPhotoCaption}&rdquo;
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ======================================================================= */}
          {/* 3. TIGA BINTANG HARAPAN & JANJI SEMESTA */}
          {/* ======================================================================= */}
          {(content.star1 || content.star2 || content.star3) && (
            <div className="my-10 space-y-4 border-t border-amber-400/20 pt-8">
              <div className="text-center space-y-1">
                <h3 className="font-serif text-xl font-bold sm:text-2xl" style={{ color: textColor }}>
                  {content.wishesTitle || "Tiga Bintang Harapan di Bawah Langit Malam"}
                </h3>
                <p className="text-xs text-slate-400 font-serif italic">
                  Tiga ikrar cinta yang bersinar abadi di antara rasi bintang kita
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 pt-3">
                {content.star1 && (
                  <div className="flex items-start gap-3 rounded-2xl border border-amber-400/20 bg-slate-900/70 p-4 text-sm font-serif">
                    <div
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-slate-950 mt-0.5 shadow-[0_0_10px_#f5c542]"
                      style={{ backgroundColor: primary }}
                    >
                      ★
                    </div>
                    <p className="text-slate-200 leading-relaxed">{content.star1}</p>
                  </div>
                )}
                {content.star2 && (
                  <div className="flex items-start gap-3 rounded-2xl border border-amber-400/20 bg-slate-900/70 p-4 text-sm font-serif">
                    <div
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-slate-950 mt-0.5 shadow-[0_0_10px_#f5c542]"
                      style={{ backgroundColor: primary }}
                    >
                      ★
                    </div>
                    <p className="text-slate-200 leading-relaxed">{content.star2}</p>
                  </div>
                )}
                {content.star3 && (
                  <div className="flex items-start gap-3 rounded-2xl border border-amber-400/20 bg-slate-900/70 p-4 text-sm font-serif">
                    <div
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-slate-950 mt-0.5 shadow-[0_0_10px_#f5c542]"
                      style={{ backgroundColor: primary }}
                    >
                      ★
                    </div>
                    <p className="text-slate-200 leading-relaxed">{content.star3}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ======================================================================= */}
          {/* 4. KARTU LENTERA CAHAYA BERSINAR (GLOWING LOVE LANTERN) */}
          {/* ======================================================================= */}
          {content.lanternMessage && (
            <div
              className="my-8 rounded-2xl border p-6 text-center space-y-3 shadow-xl backdrop-blur-md"
              style={{
                backgroundColor: `${card}90`,
                borderColor: `${primary}40`,
                boxShadow: `0 0 30px ${primary}15`,
              }}
            >
              <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300">
                <Flame className="h-5 w-5 animate-pulse" />
              </div>
              <h4 className="font-serif text-base font-bold sm:text-lg" style={{ color: textColor }}>
                {content.lanternTitle || "Lentera Harapan yang Tak Pernah Padam 🏮"}
              </h4>
              <p className="font-serif text-sm sm:text-base italic text-slate-300 leading-relaxed max-w-lg mx-auto">
                {content.lanternMessage}
              </p>
            </div>
          )}

          {/* Penutup & Tanda Tangan */}
          <footer className="border-t border-amber-400/20 pt-8 text-right space-y-2">
            <p className="font-serif text-sm italic text-slate-400">
              {content.closingWord || "Mencintaimu hingga ke ujung galaksi terluar,"}
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
          className="rounded-3xl border p-6 sm:p-8 text-center space-y-4 shadow-xl backdrop-blur-md"
          style={{ backgroundColor: `${card}c0`, borderColor: `${primary}30` }}
        >
          <div className="max-w-md mx-auto space-y-1.5">
            <h3 className="font-serif text-lg font-bold sm:text-xl" style={{ color: textColor }}>
              Bagikan Bintang Cinta Ini
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Tautan ini abadi dan dapat dibuka setiap saat di bawah gemerlap bintang malam.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-xs font-semibold text-slate-950 shadow-xl transition-all duration-300 hover:scale-105"
              style={{
                backgroundColor: primary,
                boxShadow: `0 0 20px ${primary}60`,
              }}
            >
              {copiedLink ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Tautan Bintang Berhasil Tersalin!</span>
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
      </div>
    </div>
  );
}

export function StarlightLoveTemplate({ data, className }: StarlightLoveTemplateProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
      <StarlightLoveTemplateInner data={data} className={className} />
    </Suspense>
  );
}
