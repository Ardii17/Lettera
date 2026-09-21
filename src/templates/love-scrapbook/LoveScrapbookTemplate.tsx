"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import {
  Play,
  Pause,
  Camera,
  Heart,
  Check,
  Copy,
  Sparkles,
  BookOpen,
  Pin,
  Paperclip,
  Smile,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { toParagraphs } from "@/lib/utils/format";
import type { LetterContent } from "@/types/letter";
import { withDefaults } from "../utils";

const defaults = {
  recipientName: "Alya Zahra",
  senderName: "Arka Pratama",
  journalTitle: "Our Little Moments & Sweet Memories",
  editionBadge: "Vol. 2 • Captured with Love 📸",
  coverPhotoUrl:
    "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=600&q=80",
  photoboothTitle: "Life4Cuts With You • 2024",
  photoboothDate: "14.07.2024 • Seoul Photobox",
  photo1Url:
    "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=600&q=80",
  photo2Url:
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=80",
  photo3Url:
    "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=600&q=80",
  photo4Url:
    "https://images.unsplash.com/photo-1513279922550-250c2129b13a?auto=format&fit=crop&w=600&q=80",
  photoboothCaption: "Empat pose konyol, sejuta rasa bahagia bersamamu.",
  polaroidMemoryUrl:
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80",
  polaroidMemoryCaption: "Hari kita jalan berdua seharian penuh tawa dan senyuman manis.",
  ticketEvent: "Tiket Nonton Bioskop & Es Krim Strawberry 🍦",
  ticketDate: "Sabtu Sore, 14 Juli 2024 • Kursi D1 & D2",
  title: "Halaman Khusus Untuk Pemilik Senyum Manis",
  message:
    "Alya,\n\nAda banyak hal di dunia ini yang cepat pudar, tapi caramu membuatku tertawa selalu terekam abadi di kepalaku. Jurnal ini adalah kumpulan remah-remah kebahagiaan yang kita kumpulkan bersama: dari photobooth acak di mall, tawa di tengah kemacetan kota, sampai obrolan larut malam yang tak pernah ingin kita akhiri.\n\nSetiap foto di strip samping membuktikan bahwa hal-hal sederhana bisa berubah menjadi momen paling berharga jika kulalui bersamamu. Kamu adalah warna paling cerah di buku catatanku yang tadinya biasa saja.\n\nTerima kasih sudah menjadi teman bertualang, pendengar terbaik, dan kekasih paling menyenangkan. Mari isi lembaran-lembaran berikutnya dengan lebih banyak petualangan seru berdua!",
  closingStatement: "Dengan sejuta peluk dan sayang,",
  signature: "Arka Pratama",
  stickyNotesTitle: "Hal-Hal Kecil Favoritku Tentangmu 📌",
  memo1: "Caramu tersenyum malu-malu saat kupuji, matamu selalu menyipit gemas.",
  memo2: "Duduk berdampingan di kafe favorit sambil mendengarkan satu earphone berdua.",
  memo3: "Bagaimana kamu selalu memesan es matcha lalu mencuri kentang gorengku.",
  memo4: "Menciptakan lebih banyak halaman scrapbook kenangan manis bersamamu di masa depan.",
  primaryColor: "#f472b6",
  backgroundColor: "#faf7f2",
  cardColor: "#ffffff",
  textColor: "#27272a",
  bodyTextColor: "#4b5563",
  musicTitle: "",
  bgMusicUrl: "",
};

interface LoveScrapbookTemplateProps {
  data: LetterContent;
  className?: string;
}

function LoveScrapbookTemplateInner({ data, className }: LoveScrapbookTemplateProps) {
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

  // Status jurnal terbuka/tertutup
  const [isOpened, setIsOpened] = useState<boolean>(!shouldStartClosed);

  // Audio Musik Scrapbook
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

    // Otomatis mulai memutar musik saat jurnal dibuka
    if (content.bgMusicUrl && audioRef.current && !isThumbnail && pathname !== "/templates") {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Autoplay dicegah browser
        });
    }

    // Scroll halus ke lembaran jurnal
    setTimeout(() => {
      const target = document.getElementById("scrapbook-journal-sheet");
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
  const primary = content.primaryColor || "#f472b6";
  const bg = content.backgroundColor || "#faf7f2";
  const card = content.cardColor || "#ffffff";
  const textColor = content.textColor || "#27272a";
  const bodyText = content.bodyTextColor || "#4b5563";

  return (
    <div
      className={cn("relative min-h-screen font-sans selection:bg-pink-100", className)}
      style={{ backgroundColor: bg, color: bodyText }}
    >
      {/* Audio Elemen Tersembunyi (hanya aktif di luar katalog dan jika ada URL) */}
      {!isThumbnail && pathname !== "/templates" && content.bgMusicUrl && (
        <audio ref={audioRef} src={content.bgMusicUrl} loop preload="none" />
      )}

      {/* Floating Enamel Pin Music Button (hanya tampil di surat publik / detail / pratinjau penuh) */}
      {!isThumbnail &&
        !isEditorPreview &&
        pathname !== "/templates" &&
        (isPublicLetter || isFullPreview || isDetailPage) &&
        content.bgMusicUrl &&
        isOpened && (
          <button
            type="button"
            onClick={toggleMusic}
            className="fixed right-5 bottom-6 z-40 flex items-center gap-2 rounded-full border-2 border-stone-800 bg-white px-4 py-2.5 shadow-2xl transition-all hover:scale-105"
            style={{ color: "#18181b" }}
            aria-label={isPlaying ? "Jeda melodi scrapbook" : "Putar melodi scrapbook"}
          >
            <Pin className={cn("h-4 w-4", isPlaying && "animate-bounce text-pink-500")} />
            <span className="text-xs font-bold pr-1">
              {isPlaying ? "Memutar Melodi Manis" : "Putar Musik Jurnal"}
            </span>
            {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          </button>
        )}

      {/* ========================================================================= */}
      {/* 1. SAMPUL BUKU JURNAL SCRAPBOOK (HERO / COVER) */}
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
          {/* Badge Scrapbook Header */}
          <div className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white/90 px-4 py-1.5 text-[11px] font-bold tracking-wider uppercase text-stone-700 shadow-sm backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5" style={{ color: primary }} />
            <span>{content.editionBadge || "Vol. 2 • Captured with Love 📸"}</span>
          </div>

          {/* SAMPUL BUKU JURNAL SCRAPBOOK */}
          <div
            className="relative w-full rounded-3xl border-4 p-7 sm:p-9 shadow-2xl transition-transform"
            style={{
              backgroundColor: card,
              borderColor: "#e5e7eb",
              boxShadow: `0 20px 40px -15px ${primary}50, 0 8px 16px -4px rgba(0,0,0,0.06)`,
            }}
          >
            {/* Hiasan Washi Tape di Atas Sampul */}
            <div
              className="absolute -top-3 left-1/2 -translate-x-1/2 h-6 w-32 rounded-sm shadow-sm opacity-90 rotate-1"
              style={{
                backgroundColor: `${primary}99`,
                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.4) 10px, rgba(255,255,255,0.4) 20px)`,
              }}
            />

            {/* Klip Kertas Kiri Atas */}
            <div className="absolute top-3 left-4 text-stone-400">
              <Paperclip className="h-6 w-6 rotate-45" />
            </div>

            {/* Header Sampul: Judul Jurnal */}
            <div className="pt-2 text-center space-y-2">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-pink-100 text-pink-600 mb-1">
                <Camera className="h-6 w-6" />
              </div>

              <h1
                className="font-serif text-2xl font-bold tracking-tight sm:text-3xl"
                style={{ color: textColor }}
              >
                {content.journalTitle || "Our Little Moments & Sweet Memories"}
              </h1>

              <p className="text-xs text-stone-400 font-medium tracking-wider uppercase">
                Buku Jurnal Kenangan Cinta
              </p>
            </div>

            {/* Foto Polaroid Sampul Depan Jurnal */}
            {content.coverPhotoUrl && (
              <div className="my-4 flex flex-col items-center">
                <div className="relative w-36 sm:w-44 rounded-xl border-4 bg-white p-2 shadow-lg -rotate-2 hover:rotate-0 transition-transform duration-300">
                  {/* Washi tape di atas foto */}
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 h-4 w-16 shadow-sm opacity-90 rotate-3"
                    style={{ backgroundColor: `${primary}99` }}
                  />
                  <div className="relative aspect-square w-full overflow-hidden rounded bg-stone-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={content.coverPhotoUrl}
                      alt="Foto Sampul Scrapbook"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <p className="mt-1.5 text-center font-mono text-[9px] font-bold tracking-widest text-stone-500 uppercase">
                    Our Sweet Story
                  </p>
                </div>
              </div>
            )}

            {/* Kotak Nama Penerima Berstiker */}
            <div className="my-6 rounded-2xl border-2 border-dashed border-stone-300 bg-stone-50/70 p-5 text-center">
              <p className="text-[11px] font-bold tracking-wider uppercase text-stone-400">
                Teruntuk Orang Paling Spesial:
              </p>
              <h2
                className="mt-1.5 font-serif text-2xl font-extrabold sm:text-3xl"
                style={{ color: primary }}
              >
                {recipientName}
              </h2>
              <p className="mt-1 text-xs text-stone-600">
                Dari: <span className="font-bold text-stone-800">{content.senderName}</span>
              </p>
            </div>

            {/* Tombol Interaktif Buka Jurnal */}
            <div className="flex flex-col items-center justify-center pt-2">
              {isThumbnail ? (
                <div
                  className="inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-xs font-bold text-white shadow"
                  style={{ backgroundColor: primary }}
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>Jurnal Scrapbook</span>
                </div>
              ) : !isOpened ? (
                <button
                  type="button"
                  onClick={handleOpenLetter}
                  className="group inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 text-sm font-bold tracking-wide text-white shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
                  style={{ backgroundColor: primary }}
                >
                  <BookOpen className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                  <span>Buka Jurnal Cinta Ini</span>
                </button>
              ) : (
                <div
                  className="flex items-center justify-center gap-1.5 text-xs font-bold"
                  style={{ color: primary }}
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Halaman Jurnal Terbuka</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. LEMBARAN KERTAS JURNAL & PHOTOBOOTH STRIP */}
      {/* ========================================================================= */}
      <div
        id="scrapbook-journal-sheet"
        className="mx-auto max-w-4xl px-4 py-12 sm:px-6 space-y-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* KOLOM KIRI: STRIP FOTO PHOTOBOOTH 4-CUT */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-[280px] bg-white p-3.5 shadow-2xl border-2 border-stone-200 rounded-sm">
              {/* Washi Tape Penjepit Atas */}
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 h-5 w-24 shadow-sm opacity-90 -rotate-2"
                style={{
                  backgroundColor: `${primary}99`,
                }}
              />

              {/* Header Photobooth */}
              <div className="text-center py-2 border-b border-stone-200">
                <p className="font-mono text-[10px] font-extrabold tracking-widest uppercase text-stone-700">
                  {content.photoboothTitle || "Life4Cuts With You • 2024"}
                </p>
              </div>

              {/* 4 Foto Vertikal */}
              <div className="my-3 space-y-2.5">
                {/* Frame 1 */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 border border-stone-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={content.photo1Url}
                    alt="Photobooth pose 1"
                    className="h-full w-full object-cover contrast-105"
                  />
                </div>

                {/* Frame 2 */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 border border-stone-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={content.photo2Url}
                    alt="Photobooth pose 2"
                    className="h-full w-full object-cover contrast-105"
                  />
                </div>

                {/* Frame 3 */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 border border-stone-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={content.photo3Url}
                    alt="Photobooth pose 3"
                    className="h-full w-full object-cover contrast-105"
                  />
                </div>

                {/* Frame 4 */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 border border-stone-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={content.photo4Url}
                    alt="Photobooth pose 4"
                    className="h-full w-full object-cover contrast-105"
                  />
                </div>
              </div>

              {/* Footer Photobooth: Tanggal & Barcode Khas */}
              <div className="pt-2 text-center border-t border-stone-200 space-y-1">
                <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono font-bold text-stone-500">
                  <Heart className="h-3 w-3 fill-current text-pink-500" />
                  <span>{content.photoboothDate || "14.07.2024 • Seoul Photobox"}</span>
                  <Heart className="h-3 w-3 fill-current text-pink-500" />
                </div>
                {content.photoboothCaption && (
                  <p className="font-serif text-[11px] italic text-stone-600 px-1 pt-1">
                    &ldquo;{content.photoboothCaption}&rdquo;
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* KOLOM KANAN: LEMBARAN KERTAS JURNAL GRID (SURAT CINTA) */}
          <article
            className="lg:col-span-7 relative rounded-3xl border-2 p-7 sm:p-10 shadow-xl space-y-6"
            style={{
              backgroundColor: card,
              borderColor: "#e5e7eb",
              backgroundImage: `linear-gradient(#f1f5f9 1px, transparent 1px), linear-gradient(90deg, #f1f5f9 1px, transparent 1px)`,
              backgroundSize: "20px 20px",
            }}
          >
            {/* Washi Tape Sudut Kanan Atas */}
            <div
              className="absolute -top-3 right-6 h-5 w-24 shadow-sm opacity-90 rotate-6"
              style={{ backgroundColor: `${primary}80` }}
            />

            <header className="border-b border-stone-200 pb-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase" style={{ color: primary }}>
                <Smile className="h-4 w-4" />
                <span>Journal Entry &bull; Dear You</span>
              </div>
              <h2
                className="font-serif text-2xl font-bold tracking-tight sm:text-3xl"
                style={{ color: textColor }}
              >
                {content.title}
              </h2>
            </header>

            {/* Paragraf Surat Cinta */}
            <div className="space-y-5 font-serif text-base sm:text-lg leading-relaxed text-stone-800">
              {paragraphs.map((para, idx) => (
                <p key={idx} className="indent-6 sm:indent-8">
                  {para}
                </p>
              ))}
            </div>

            {/* Foto Polaroid Kenangan Tambahan & Tiket Kencan Berdua */}
            {(content.polaroidMemoryUrl || content.ticketEvent) && (
              <div className="my-6 pt-4 border-t border-dashed border-stone-300 space-y-5">
                {content.polaroidMemoryUrl && (
                  <div className="flex flex-col items-center">
                    <div className="relative w-full max-w-xs rounded-2xl border-4 bg-white p-3 shadow-md rotate-1 hover:rotate-0 transition-transform duration-300">
                      {/* Selotip washi tape */}
                      <div
                        className="absolute -top-3 left-1/2 -translate-x-1/2 h-4 w-20 shadow-sm opacity-90 -rotate-2"
                        style={{ backgroundColor: `${primary}80` }}
                      />
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded bg-stone-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={content.polaroidMemoryUrl}
                          alt={content.polaroidMemoryCaption || "Kenangan Manis"}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      {content.polaroidMemoryCaption && (
                        <p className="mt-2 text-center font-serif text-xs italic text-stone-600">
                          &ldquo;{content.polaroidMemoryCaption}&rdquo;
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {content.ticketEvent && (
                  <div className="rounded-xl border-2 border-dashed border-pink-300 bg-pink-50/70 p-4 relative overflow-hidden">
                    <div className="flex items-center justify-between gap-2 border-b border-pink-200 pb-2">
                      <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-pink-700">
                        <Pin className="h-3 w-3" />
                        <span>Date Memory Ticket Stub</span>
                      </div>
                      <span className="font-mono text-[9px] font-bold text-pink-500 uppercase">
                        ADMIT TWO • ❤️
                      </span>
                    </div>
                    <div className="pt-2">
                      <p className="font-serif text-sm font-bold text-stone-900">
                        {content.ticketEvent}
                      </p>
                      {content.ticketDate && (
                        <p className="font-mono text-xs text-stone-600 pt-0.5">
                          {content.ticketDate}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Penutup & Tanda Tangan */}
            <footer className="border-t border-stone-200 pt-6 text-right space-y-1">
              <p className="font-serif text-xs italic text-stone-500">
                {content.closingStatement || "Dengan sejuta peluk dan sayang,"}
              </p>
              <p className="font-serif text-2xl font-bold tracking-wide" style={{ color: textColor }}>
                {content.signature}
              </p>
            </footer>
          </article>
        </div>

        {/* ========================================================================= */}
        {/* 3. HAL-HAL KECIL FAVORITKU (4 MEMO STICKY NOTES) */}
        {/* ========================================================================= */}
        <section className="space-y-6 pt-6">
          <div className="text-center space-y-1">
            <h3 className="font-serif text-2xl font-bold sm:text-3xl" style={{ color: textColor }}>
              {content.stickyNotesTitle || "Hal-Hal Kecil Favoritku Tentangmu 📌"}
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 font-serif italic">
              Catatan kecil yang selalu membuatku tersenyum setiap kali mengingatmu
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {/* Memo 1 */}
            {content.memo1 && (
              <div className="relative rounded-2xl bg-amber-100 p-5 shadow-md border border-amber-200 rotate-1 transition-transform hover:rotate-0">
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 h-4 w-12 bg-amber-300/80 rounded-sm" />
                <p className="text-[10px] font-mono font-bold uppercase text-amber-800 tracking-wider mb-2">
                  #1 Senyuman
                </p>
                <p className="font-serif text-sm text-stone-800 leading-relaxed">
                  {content.memo1}
                </p>
              </div>
            )}

            {/* Memo 2 */}
            {content.memo2 && (
              <div className="relative rounded-2xl bg-pink-100 p-5 shadow-md border border-pink-200 -rotate-1 transition-transform hover:rotate-0">
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 h-4 w-12 bg-pink-300/80 rounded-sm" />
                <p className="text-[10px] font-mono font-bold uppercase text-pink-800 tracking-wider mb-2">
                  #2 Momen Berdua
                </p>
                <p className="font-serif text-sm text-stone-800 leading-relaxed">
                  {content.memo2}
                </p>
              </div>
            )}

            {/* Memo 3 */}
            {content.memo3 && (
              <div className="relative rounded-2xl bg-emerald-100 p-5 shadow-md border border-emerald-200 rotate-2 transition-transform hover:rotate-0">
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 h-4 w-12 bg-emerald-300/80 rounded-sm" />
                <p className="text-[10px] font-mono font-bold uppercase text-emerald-800 tracking-wider mb-2">
                  #3 Kebiasaan Lucu
                </p>
                <p className="font-serif text-sm text-stone-800 leading-relaxed">
                  {content.memo3}
                </p>
              </div>
            )}

            {/* Memo 4 */}
            {content.memo4 && (
              <div className="relative rounded-2xl bg-sky-100 p-5 shadow-md border border-sky-200 -rotate-2 transition-transform hover:rotate-0">
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 h-4 w-12 bg-sky-300/80 rounded-sm" />
                <p className="text-[10px] font-mono font-bold uppercase text-sky-800 tracking-wider mb-2">
                  #4 Harapan Manis
                </p>
                <p className="font-serif text-sm text-stone-800 leading-relaxed">
                  {content.memo4}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. KOTAK SIMPAN & SALIN TAUTAN */}
        {/* ========================================================================= */}
        <section
          className="rounded-3xl border-2 p-6 sm:p-8 text-center space-y-4 shadow-sm"
          style={{ backgroundColor: card, borderColor: `${primary}30` }}
        >
          <div className="max-w-md mx-auto space-y-1.5">
            <h3 className="font-serif text-lg font-bold sm:text-xl" style={{ color: textColor }}>
              Simpan Halaman Jurnal Kenangan Ini
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
              Tautan scrapbook ini dapat dibuka kapan pun untuk melihat kembali kenangan manis berdua.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 rounded-full px-7 py-3 text-xs font-bold text-white shadow-md transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: primary }}
            >
              {copiedLink ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Tautan Scrapbook Berhasil Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Salin Tautan Jurnal Cinta</span>
                </>
              )}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export function LoveScrapbookTemplate({ data, className }: LoveScrapbookTemplateProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-pink-50/30" />}>
      <LoveScrapbookTemplateInner data={data} className={className} />
    </Suspense>
  );
}
