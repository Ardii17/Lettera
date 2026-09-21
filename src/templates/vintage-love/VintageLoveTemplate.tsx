"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import {
  Heart,
  Pause,
  Play,
  Mail,
  Sparkles,
  Check,
  Copy,
  Feather,
  Disc,
  Lock,
  Unlock,
  Stamp,
  Compass,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { toParagraphs } from "@/lib/utils/format";
import type { LetterContent } from "@/types/letter";
import { withDefaults } from "../utils";

const defaults = {
  recipientName: "Adinda Kirana",
  senderName: "Bima Arya",
  postmarkCity: "Bandung, Jawa Barat",
  postmarkDate: "21 September 2024",
  sealInitials: "B & A",
  stampPhotoUrl:
    "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=400&q=80",
  loveAnniversary: "14 Februari 2022 • Hari Pertama Bertemu",
  title: "Sebuah Warkat Kasih Dari Lubuk Hati",
  salutation: "Kepada Pemilik Senyum yang Selalu Kurindukan,",
  letterLocation: "Ditulis dari sudut kedai kopi kenangan kita",
  message:
    "Dinda,\n\nAda rasa hangat yang selalu merayap ke dadaku setiap kali mengingat caramu tertawa. Di antara miliaran manusia yang berjalan di bumi, bertemu dan berjalan bersamamu adalah kebetulan terindah yang paling kusyukuri dalam hidup.\n\nSurat ini kutulis bukan hanya untuk merayakan hari-hari manis yang telah kita lewati, namun juga sebagai pengingat abadi bahwa di setiap langkah esok, ada sepasang mata yang selalu bangga melihatmu dan hati yang selalu mendoakan bahagiamu.\n\nTerima kasih telah menjadi rumah tempatku pulang, dan pelita di kala malam terasa gelap. Aku mencintaimu lebih dari apa yang sanggup dirangkum oleh kata-kata.",
  closingStatement: "Selamanya mengagumi dan menyayangimu,",
  signature: "Bima Arya",
  photoUrl:
    "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1000&q=80",
  photoCaption: "Kenangan senja saat kita berjanji untuk saling menjaga selamanya.",
  photo2Url:
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1000&q=80",
  photo2Caption: "Tawa lepas kita di tepi dermaga sore itu.",
  secretNoteTitle: "Bisikan Rahasia untuk Hatimu ✨",
  secretNoteContent:
    "Jika suatu saat dunia terasa terlalu bising dan melelahkan, ingatlah bahwa kamu tidak pernah sendirian. Genggam tanganku, dan kita akan lalui semuanya bersama-sama.",
  promisesTitle: "Tiga Janji Setia untuk Hari Esok",
  promise1: "Selalu mendengarkan ceritamu dengan penuh ketulusan di setiap hari lelahmu.",
  promise2: "Menjadi tempat pulang yang paling aman dan menghangatkan hatimu.",
  promise3: "Terus memilihmu dan mencintaimu dalam setiap babak perjalanan kita.",
  primaryColor: "#781d2f",
  backgroundColor: "#f6f1ea",
  cardColor: "#fffdf9",
  textColor: "#3e1b24",
  bodyTextColor: "#4a3b32",
  musicTitle: "",
  bgMusicUrl: "",
};

interface VintageLoveTemplateProps {
  data: LetterContent;
  className?: string;
}

function VintageLoveTemplateInner({ data, className }: VintageLoveTemplateProps) {
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

  // Status amplop terbuka/tertutup
  const [isOpened, setIsOpened] = useState<boolean>(!shouldStartClosed);

  // Status catatan rahasia terbuka/tertutup
  const [isSecretRevealed, setIsSecretRevealed] = useState<boolean>(false);

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

    // Otomatis mulai memutar musik romantis saat amplop dibuka
    if (content.bgMusicUrl && audioRef.current && !isThumbnail && pathname !== "/templates") {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Autoplay dicegah browser
        });
    }

    // Scroll halus ke lembaran surat
    setTimeout(() => {
      const target = document.getElementById("vintage-letter-sheet");
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
  const primary = content.primaryColor || "#781d2f";
  const bg = content.backgroundColor || "#f6f1ea";
  const card = content.cardColor || "#fffdf9";
  const textColor = content.textColor || "#3e1b24";
  const bodyText = content.bodyTextColor || "#4a3b32";

  return (
    <div
      className={cn("relative min-h-screen font-sans selection:bg-rose-100", className)}
      style={{ backgroundColor: bg, color: bodyText }}
    >
      {/* Audio Elemen Tersembunyi (hanya aktif di luar katalog dan jika ada URL) */}
      {!isThumbnail && pathname !== "/templates" && content.bgMusicUrl && (
        <audio ref={audioRef} src={content.bgMusicUrl} loop preload="none" />
      )}

      {/* Floating Vinyl Music Button (hanya tampil di surat publik / detail / pratinjau penuh) */}
      {!isThumbnail &&
        !isEditorPreview &&
        pathname !== "/templates" &&
        (isPublicLetter || isFullPreview || isDetailPage) &&
        content.bgMusicUrl &&
        isOpened && (
          <button
            type="button"
            onClick={toggleMusic}
            className="fixed right-5 bottom-6 z-40 flex items-center gap-2 rounded-full border border-white/40 px-3.5 py-2.5 shadow-xl backdrop-blur-md transition-all hover:scale-105"
            style={{ backgroundColor: primary, color: "#ffffff" }}
            aria-label={isPlaying ? "Jeda musik" : "Putar musik"}
          >
            <Disc className={cn("h-5 w-5", isPlaying && "animate-spin")} />
            <span className="text-xs font-semibold pr-1">
              {isPlaying ? "Memutar Warkat Romansa" : "Putar Musik"}
            </span>
            {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          </button>
        )}

      {/* ========================================================================= */}
      {/* 1. AMPLOP KLASIK BERSEGEL LILIN (HERO / COVER) */}
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
          background: `radial-gradient(ellipse at center, ${primary}15 0%, ${bg} 100%)`,
        }}
      >
        <div className="relative z-10 mx-auto flex w-full max-w-lg flex-col items-center space-y-6">
          {/* Header Air Mail / Cap Pos Klasik */}
          <div className="inline-flex items-center gap-2 rounded-full border border-stone-300/80 bg-white/70 px-4 py-1.5 text-[11px] font-semibold tracking-widest uppercase text-stone-600 backdrop-blur-sm shadow-sm">
            <Compass className="h-3.5 w-3.5 text-stone-500" />
            <span>Warkat Pos Kasih &bull; Par Avion</span>
          </div>

          {/* Kartu Amplop Vintage Retro */}
          <div
            className="relative w-full rounded-2xl border-2 p-6 sm:p-8 text-left shadow-2xl backdrop-blur-md overflow-hidden"
            style={{
              backgroundColor: card,
              borderColor: `${primary}35`,
            }}
          >
            {/* Garis batas ornamen retro tepi atas */}
            <div
              className="absolute top-0 left-0 right-0 h-2 bg-repeat-x opacity-70"
              style={{
                background: `repeating-linear-gradient(45deg, ${primary}, ${primary} 12px, #ffffff 12px, #ffffff 18px, #29406b 18px, #29406b 30px, #ffffff 30px, #ffffff 36px)`,
              }}
            />

            {/* Baris Atas: Prangko Vintage & Cap Pos */}
            <div className="mt-2 flex items-start justify-between border-b border-stone-200/80 pb-5">
              {/* Cap Pos Tanggal & Kota */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-stone-500">
                  <Stamp className="h-4 w-4" style={{ color: primary }} />
                  <span>{content.postmarkCity || "Cap Pos Kenangan"}</span>
                </div>
                <p className="font-serif text-sm italic text-stone-700">
                  {content.postmarkDate || "21 September 2024"}
                </p>
                {content.loveAnniversary && (
                  <div className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-rose-50/90 px-2.5 py-0.5 text-[10px] font-medium text-stone-700 border border-rose-200/60">
                    <Heart className="h-2.5 w-2.5 fill-rose-500 text-rose-500" />
                    <span>{content.loveAnniversary}</span>
                  </div>
                )}
              </div>

              {/* Prangko Kertas Vintage dengan Foto Pasangan */}
              <div
                className="group relative flex h-20 w-16 shrink-0 flex-col items-center justify-between rounded border-2 border-dashed bg-rose-50/90 p-1 text-center shadow-md overflow-hidden transition-transform hover:scale-105"
                style={{ borderColor: primary }}
              >
                {content.stampPhotoUrl ? (
                  <>
                    <div className="relative h-12 w-full overflow-hidden rounded bg-stone-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={content.stampPhotoUrl}
                        alt="Prangko Cinta"
                        className="h-full w-full object-cover sepia-[0.2]"
                      />
                    </div>
                    <div className="flex w-full items-center justify-between px-0.5 pt-0.5 text-[8px] font-bold tracking-tighter uppercase text-stone-700">
                      <span>POS</span>
                      <Heart className="h-2 w-2 fill-current text-rose-600" />
                      <span>LOVE</span>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <Heart className="h-5 w-5 fill-current" style={{ color: primary }} />
                    <span className="mt-1 text-[9px] font-bold tracking-tighter uppercase text-stone-700">
                      Love 1984
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Nama Penerima (Kepada) */}
            <div className="my-6 space-y-1">
              <p className="text-[11px] font-medium tracking-widest uppercase text-stone-400">
                Tertuju Untuk Kekasih Hati:
              </p>
              <h2
                className="font-serif text-3xl font-bold tracking-wide sm:text-4xl"
                style={{ color: textColor }}
              >
                {recipientName}
              </h2>
              <p className="text-xs text-stone-500 pt-0.5">
                Pengirim: <span className="font-semibold text-stone-800">{content.senderName}</span>
              </p>
            </div>

            {/* Segel Lilin 3D (Wax Seal) */}
            <div className="flex flex-col items-center justify-center pt-2 pb-2">
              <div
                className="group relative flex h-24 w-24 items-center justify-center rounded-full shadow-2xl border-4 border-amber-900/20 transition-transform duration-300"
                style={{
                  backgroundColor: primary,
                  boxShadow: `0 10px 25px -5px ${primary}80, inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -3px 6px rgba(0,0,0,0.5)`,
                }}
              >
                {/* Garis Lingkar Cap Segel */}
                <div className="absolute inset-2 rounded-full border border-white/30 flex items-center justify-center">
                  <div className="text-center px-1">
                    <span className="font-serif text-lg font-extrabold tracking-wider text-amber-100 drop-shadow">
                      {content.sealInitials || "B & A"}
                    </span>
                    <p className="text-[7px] tracking-widest uppercase text-amber-200/90">
                      With Love
                    </p>
                  </div>
                </div>
              </div>

              {/* Tombol Interaktif Buka Amplop */}
              {isThumbnail ? (
                <div
                  className="mt-5 inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-xs font-semibold text-white shadow"
                  style={{ backgroundColor: primary }}
                >
                  <Feather className="h-3.5 w-3.5" />
                  <span>Surat Cinta Vintage</span>
                </div>
              ) : !isOpened ? (
                <button
                  type="button"
                  onClick={handleOpenLetter}
                  className="mt-6 inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 text-sm font-semibold tracking-wide text-white shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
                  style={{ backgroundColor: primary }}
                >
                  <Mail className="h-4 w-4" />
                  <span>Buka Surat Cinta Ini</span>
                </button>
              ) : (
                <div
                  className="mt-4 flex items-center justify-center gap-1.5 text-xs font-semibold"
                  style={{ color: primary }}
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Segel Telah Terbuka</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. LEMBARAN SURAT PERKAMEN (MAIN LETTER SHEET) */}
      {/* ========================================================================= */}
      <div
        id="vintage-letter-sheet"
        className="mx-auto max-w-3xl px-4 py-12 sm:px-6 space-y-16"
      >
        {/* Lembaran Kertas Perkamen Klasik */}
        <article
          className="relative rounded-3xl border-2 p-8 sm:p-14 shadow-xl space-y-8 backdrop-blur-sm"
          style={{
            backgroundColor: card,
            borderColor: `${primary}30`,
          }}
        >
          {/* Ornamen Tepi Ganda Halus */}
          <div
            className="pointer-events-none absolute inset-3 rounded-2xl border border-dashed opacity-40"
            style={{ borderColor: primary }}
          />

          {/* Tajuk Surat */}
          <header className="space-y-4 border-b border-stone-200/80 pb-6 text-center">
            <div className="flex items-center justify-center gap-2 text-stone-400">
              <span className="h-px w-12 bg-stone-300" />
              <Heart className="h-4 w-4 fill-current" style={{ color: primary }} />
              <span className="h-px w-12 bg-stone-300" />
            </div>

            <h1
              className="font-serif text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
              style={{ color: textColor }}
            >
              {content.title}
            </h1>

            <p className="font-serif text-base italic text-stone-600 sm:text-lg">
              {content.salutation}
            </p>

            {content.letterLocation && (
              <div className="inline-flex items-center gap-1.5 text-xs text-stone-500 italic pt-1">
                <Compass className="h-3.5 w-3.5 text-stone-400" />
                <span>{content.letterLocation}</span>
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

          {/* Foto Kenangan Analog / Vintage Photo Frames (Ganda atau Tunggal) */}
          {(content.photoUrl || content.photo2Url) && (
            <div className="my-10">
              {content.photoUrl && content.photo2Url ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 items-center max-w-2xl mx-auto">
                  {/* Foto 1 */}
                  <div
                    className="group rounded-2xl border-4 bg-white p-3.5 shadow-lg transition-transform hover:-rotate-1 duration-300"
                    style={{ borderColor: "#ece5dd" }}
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-stone-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={content.photoUrl}
                        alt={content.photoCaption || "Foto kenangan 1"}
                        className="h-full w-full object-cover sepia-[0.15] contrast-[1.05]"
                      />
                    </div>
                    {content.photoCaption && (
                      <p className="mt-2.5 text-center font-serif text-xs italic text-stone-600">
                        &ldquo;{content.photoCaption}&rdquo;
                      </p>
                    )}
                  </div>

                  {/* Foto 2 */}
                  <div
                    className="group rounded-2xl border-4 bg-white p-3.5 shadow-lg transition-transform hover:rotate-1 duration-300"
                    style={{ borderColor: "#ece5dd" }}
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-stone-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={content.photo2Url}
                        alt={content.photo2Caption || "Foto kenangan 2"}
                        className="h-full w-full object-cover sepia-[0.15] contrast-[1.05]"
                      />
                    </div>
                    {content.photo2Caption && (
                      <p className="mt-2.5 text-center font-serif text-xs italic text-stone-600">
                        &ldquo;{content.photo2Caption}&rdquo;
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div
                    className="w-full max-w-md rounded-2xl border-4 bg-white p-4 shadow-lg transition-transform hover:rotate-1"
                    style={{ borderColor: "#ece5dd" }}
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-stone-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={content.photoUrl || content.photo2Url}
                        alt={content.photoCaption || content.photo2Caption || "Foto kenangan berdua"}
                        className="h-full w-full object-cover sepia-[0.15] contrast-[1.05]"
                      />
                    </div>
                    {(content.photoCaption || content.photo2Caption) && (
                      <p className="mt-3 text-center font-serif text-xs italic text-stone-600 sm:text-sm">
                        &ldquo;{content.photoCaption || content.photo2Caption}&rdquo;
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ======================================================================= */}
          {/* 3. KARTU CATATAN RAHASIA (SECRET LOVE NOTE) */}
          {/* ======================================================================= */}
          {content.secretNoteContent && (
            <div
              className="my-8 rounded-2xl border-2 p-6 transition-all shadow-sm"
              style={{
                backgroundColor: `${primary}08`,
                borderColor: `${primary}35`,
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4" style={{ color: primary }} />
                  <h4 className="font-serif text-base font-bold sm:text-lg" style={{ color: textColor }}>
                    {content.secretNoteTitle || "Bisikan Rahasia untuk Hatimu ✨"}
                  </h4>
                </div>

                <button
                  type="button"
                  onClick={() => setIsSecretRevealed(!isSecretRevealed)}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold shadow-sm transition-all"
                  style={{
                    backgroundColor: isSecretRevealed ? "#ffffff" : primary,
                    color: isSecretRevealed ? primary : "#ffffff",
                    border: `1px solid ${primary}40`,
                  }}
                >
                  {isSecretRevealed ? (
                    <>
                      <Unlock className="h-3 w-3" />
                      <span>Sembunyikan</span>
                    </>
                  ) : (
                    <>
                      <Lock className="h-3 w-3" />
                      <span>Buka Bisikan</span>
                    </>
                  )}
                </button>
              </div>

              {isSecretRevealed ? (
                <div className="mt-4 border-t border-dashed pt-4 font-serif text-sm sm:text-base italic leading-relaxed animate-in fade-in-50 duration-300" style={{ borderColor: `${primary}30` }}>
                  <p>{content.secretNoteContent}</p>
                </div>
              ) : (
                <p className="mt-2 text-xs text-stone-500 italic">
                  Ketuk tombol di atas untuk membaca pesan rahasia yang tersembunyi...
                </p>
              )}
            </div>
          )}

          {/* ======================================================================= */}
          {/* 4. TIGA JANJI CINTA UNTUK HARI ESOK */}
          {/* ======================================================================= */}
          {(content.promise1 || content.promise2 || content.promise3) && (
            <div className="my-10 space-y-4 border-t border-stone-200/80 pt-8">
              <div className="text-center space-y-1">
                <h3 className="font-serif text-xl font-bold sm:text-2xl" style={{ color: textColor }}>
                  {content.promisesTitle || "Tiga Janji Setia untuk Hari Esok"}
                </h3>
                <p className="text-xs text-stone-500 font-serif italic">
                  Terukir dalam warkat ini untuk kita jaga selamanya
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 pt-2">
                {content.promise1 && (
                  <div className="flex items-start gap-3 rounded-xl border border-stone-200/80 bg-stone-50/60 p-4 text-sm font-serif">
                    <div
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white mt-0.5"
                      style={{ backgroundColor: primary }}
                    >
                      1
                    </div>
                    <p className="text-stone-800 leading-relaxed">{content.promise1}</p>
                  </div>
                )}
                {content.promise2 && (
                  <div className="flex items-start gap-3 rounded-xl border border-stone-200/80 bg-stone-50/60 p-4 text-sm font-serif">
                    <div
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white mt-0.5"
                      style={{ backgroundColor: primary }}
                    >
                      2
                    </div>
                    <p className="text-stone-800 leading-relaxed">{content.promise2}</p>
                  </div>
                )}
                {content.promise3 && (
                  <div className="flex items-start gap-3 rounded-xl border border-stone-200/80 bg-stone-50/60 p-4 text-sm font-serif">
                    <div
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white mt-0.5"
                      style={{ backgroundColor: primary }}
                    >
                      3
                    </div>
                    <p className="text-stone-800 leading-relaxed">{content.promise3}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Penutup & Tanda Tangan Klasik */}
          <footer className="border-t border-stone-200/80 pt-8 text-right space-y-2">
            <p className="font-serif text-sm italic text-stone-500">
              {content.closingStatement || "Selamanya mengagumi dan menyayangimu,"}
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
              Simpan & Abadikan Warkat Kasih Ini
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
              Tautan ini dapat diakses kapan saja sebagai pengingat manis akan rasa cinta yang telah terukir.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-semibold text-white shadow-md transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: primary }}
            >
              {copiedLink ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Tautan Surat Berhasil Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Salin Tautan Surat Cinta</span>
                </>
              )}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export function VintageLoveTemplate({ data, className }: VintageLoveTemplateProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-rose-50/20" />}>
      <VintageLoveTemplateInner data={data} className={className} />
    </Suspense>
  );
}
