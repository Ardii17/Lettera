"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import {
  Clock,
  Check,
  Copy,
  ExternalLink,
  Sparkles,
  Pause,
  Play,
  Ticket,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { toParagraphs } from "@/lib/utils/format";
import type { LetterContent } from "@/types/letter";
import { withDefaults } from "../utils";

const defaults: Record<string, string> = {
  recipientName: "Bapak & Ibu Kolektor Terhormat",
  ticketNumber: "VIP-VERNISSAGE-0842",
  curatorSeal: "CURATORIAL APPROVED // ADMIT ONE",
  exhibitionSub: "Solo Art Exhibition Vernissage & Private Viewing",
  exhibitionTitle: "TRANSCENDENCE: Shadows of the Finite",
  artistName: "Julian Thorne & Studio Lumina",
  curatorName: "Dr. Arisya Danu, M.Sn.",
  curatorialStatement:
    "Sebuah eksplorasi visual tentang batas antara memori, materialitas, dan ruang hening. 'TRANSCENDENCE: Shadows of the Finite' merajut narasi keberadaan manusia di persimpangan zaman material dan dimensi transendental.\n\nMerupakan suatu kehormatan dan kebahagiaan bagi kami untuk menyambut kehadiran Anda dalam malam pembukaan perdana (Vernissage & Private Viewing) ini, merayakan keindahan perenungan estetik bersama para kurator, kolektor, dan penikmat seni rupa.",
  senderName: "Dewan Kurator Lumina Space",
  eventDate: "Sabtu, 24 Oktober 2026",
  eventTime: "18.30 – 22.00 WIB",
  targetDateIso: "2026-10-24T18:30:00",
  venueName: "Lumina Contemporary Art Space",
  venueHall: "Main Atrium & North Pavilion",
  venueAddress: "Jl. Seni Budaya No. 88, Menteng, Jakarta Pusat",
  mapsUrl: "https://maps.google.com/?q=Jakarta+Art+Gallery",

  session1Time: "18.30 – 19.15 WIB",
  session1Title: "VIP Arrival & Welcoming Reception",
  session1Desc: "Registrasi tamu kehormatan, penyerahan katalog edisi khusus, dan signature cocktail di foyer.",
  session2Time: "19.15 – 20.00 WIB",
  session2Title: "Curatorial Tour & Artist Vernissage Speech",
  session2Desc: "Sambutan pembuka oleh Dewan Kurator dilanjutkan tur kuratorial eksklusif bersama seniman.",
  session3Time: "20.00 – 21.00 WIB",
  session3Title: "Private Viewing & Ambient Soundscape",
  session3Desc: "Eksplorasi intim ruang instalasi dengan komposisi live ambient acoustic yang imersif.",
  session4Time: "21.00 – 22.00 WIB",
  session4Title: "Patron Acquisition & Wine Networking",
  session4Desc: "Sesi akuisisi privat bagi kolektor seni, dialog kuratorial santai, dan wine tasting.",

  artwork1Title: "Solitude in Crimson (2026)",
  artwork1Medium: "Oil, textured linen & acrylic on Belgian canvas (160 × 200 cm)",
  artwork1Desc: "Refleksi mendalam mengenai kesunyian di tengah percepatan visual era digital kontemporer.",
  artwork1Url: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",

  artwork2Title: "Echoes of the Monolith (2025)",
  artwork2Medium: "Cast bronze, charred oak & raw volcanic basalt (85 × 60 × 140 cm)",
  artwork2Desc: "Struktur monolitik yang membekukan resonansi geologis bumi dan peradaban kuno.",
  artwork2Url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80",

  artwork3Title: "Luminescence No. IV (2026)",
  artwork3Medium: "Patinated brass sheets, mineral pigments & gold leaf (120 × 120 cm)",
  artwork3Desc: "Permainan gradasi spektrum cahaya yang berubah seiring sudut pandang pengamat.",
  artwork3Url: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=1200&q=80",

  dressCodeTitle: "Avant-Garde Minimalist / All-Black Chic",
  dressCodeNotes: "Tamu disarankan mengenakan busana bernuansa monokrom gelap, arang, atau aksen merah galeri.",
  paletteColor1: "#111111",
  paletteName1: "Obsidian Noir",
  paletteColor2: "#27272a",
  paletteName2: "Graphite Charcoal",
  paletteColor3: "#f4f4f5",
  paletteName3: "Gallery Alabaster",
  paletteColor4: "#dc2626",
  paletteName4: "Curator Vermillion",

  patronBankName: "BCA / Lumina Arts Foundation",
  patronAccountNo: "8820491029",
  patronAccountName: "Yayasan Seni Rupa Lumina",
  patronNote: "Dukungan patron seni untuk penerbitan katalogus resmi & program residensi seniman muda.",

  backgroundColor: "#09090b",
  cardColor: "#18181b",
  textColor: "#fafafa",
  musicUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=ambient-piano-amp-strings-10711.mp3",
  musicTitle: "Ambient Nocturne in D Minor",
};

interface ArtExhibitionTemplateProps {
  data: LetterContent;
  className?: string;
}

interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

const initialCountdown: CountdownState = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  isExpired: false,
};

function computeCountdown(targetIso?: string): CountdownState {
  if (!targetIso) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: false };
  }
  const target = new Date(targetIso).getTime();
  const now = new Date().getTime();
  const diff = target - now;

  if (isNaN(target) || diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isExpired: false };
}

function ArtExhibitionTemplateInner({
  data,
  className,
}: ArtExhibitionTemplateProps) {
  const content = withDefaults(defaults, data);
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const isThumbnail =
    Boolean(data._isThumbnail) ||
    pathname === "/templates" ||
    className?.includes("is-thumbnail") ||
    className?.includes("thumb");

  const isEditorPreview =
    Boolean(data._isEditorPreview) ||
    className?.includes("is-editor-preview");

  const isPublicLetter = Boolean(pathname?.startsWith("/letter/"));
  const isFullPreview =
    Boolean(data._isFullPreview) ||
    className?.includes("is-full-preview");
  const isDetailPage = Boolean(pathname?.startsWith("/templates/"));

  const shouldStartClosed =
    (isPublicLetter || isFullPreview || isDetailPage) &&
    !isThumbnail &&
    !isEditorPreview;

  const guestParam = searchParams.get("to");
  const displayedRecipient = guestParam || content.recipientName;

  const [isOpen, setIsOpen] = useState(!shouldStartClosed);
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [countdown, setCountdown] = useState<CountdownState>(initialCountdown);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!content.targetDateIso) return;
    setCountdown(computeCountdown(content.targetDateIso));

    const interval = setInterval(() => {
      setCountdown(computeCountdown(content.targetDateIso));
    }, 1000);

    return () => clearInterval(interval);
  }, [content.targetDateIso]);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleCopyAccount = () => {
    if (!content.patronAccountNo) return;
    navigator.clipboard.writeText(content.patronAccountNo);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const showFloatingAudio = !isThumbnail && pathname !== "/templates" && Boolean(content.musicUrl);

  const bgStyle = {
    backgroundColor: content.backgroundColor || "#09090b",
    color: content.textColor || "#fafafa",
  };

  const cardBgStyle = {
    backgroundColor: content.cardColor || "#18181b",
  };

  return (
    <div
      style={bgStyle}
      className={cn(
        "relative min-h-screen w-full font-sans antialiased selection:bg-red-900/60 selection:text-white",
        isThumbnail ? "overflow-hidden text-[11px] p-3" : "p-4 sm:p-8 md:p-14",
        className,
      )}
    >
      {/* Background Architectural Grid Lines */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,#dc262612,transparent_50%)]" />

      {/* Floating Audio Player */}
      {showFloatingAudio && (
        <>
          <audio ref={audioRef} src={content.musicUrl} loop preload="none" />
          <button
            type="button"
            onClick={toggleAudio}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/90 px-4 py-2.5 text-xs text-zinc-300 backdrop-blur-md shadow-2xl hover:border-red-500 hover:text-white transition-all duration-200"
            aria-label={isPlaying ? "Mute soundtrack" : "Play ambient soundtrack"}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                <span className="font-mono text-[11px] tracking-wider uppercase">Audio: On</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-zinc-400" />
                <span className="font-mono text-[11px] tracking-wider uppercase">Soundtrack</span>
              </>
            )}
          </button>
        </>
      )}

      <div className="relative mx-auto max-w-4xl space-y-12">
        {/* ============================================================ */}
        {/* 1. HERO SECTION: AVANT-GARDE POSTER & VIP ADMISSION STUB     */}
        {/* ============================================================ */}
        <section
          style={cardBgStyle}
          className="relative overflow-hidden rounded-none sm:rounded-2xl border-y sm:border border-zinc-800 shadow-2xl"
        >
          {/* Top Swiss Index Header */}
          <div className="border-b border-zinc-800 px-6 sm:px-10 py-3.5 flex items-center justify-between font-mono text-xs text-zinc-400 tracking-widest uppercase">
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-red-600 animate-ping" />
              <span className="text-zinc-300 font-semibold">{content.exhibitionSub || "Solo Vernissage"}</span>
            </div>
            <div className="text-zinc-500 font-medium">CAT. NO. 2026 // {content.ticketNumber}</div>
          </div>

          {/* Main Poster Layout: Typography Left, Tear-off Stub Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-zinc-800">
            {/* Left Poster Typographic Area (8 cols) */}
            <div className="lg:col-span-8 p-6 sm:p-10 space-y-6">
              <div className="space-y-2">
                <span className="inline-block font-mono text-[10px] tracking-[0.3em] uppercase text-red-500 font-semibold">
                  Official Vernissage Pass & Private Viewing
                </span>
                <h1 className="text-3xl sm:text-5xl font-serif font-light uppercase tracking-tight text-white leading-none">
                  {content.exhibitionTitle}
                </h1>
                <p className="font-mono text-sm text-zinc-400 pt-1">
                  Curated Solo Showcase by <span className="text-zinc-200 font-semibold">{content.artistName}</span>
                </p>
              </div>

              {/* Guest Admission Box */}
              <div className="rounded-lg border border-zinc-800 bg-zinc-950/60 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-mono tracking-widest uppercase text-zinc-500">
                    Tamu Terhormat / Collector
                  </p>
                  <p className="text-base sm:text-lg font-serif font-medium text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-red-500" />
                    <span>{displayedRecipient}</span>
                  </p>
                </div>

                {!isOpen && !isThumbnail && (
                  <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded bg-red-600 hover:bg-red-700 text-white font-mono text-xs uppercase tracking-wider transition-all duration-200 shadow-lg shadow-red-950/60 hover:scale-[1.02]"
                  >
                    <Ticket className="w-4 h-4" />
                    <span>Buka Katalog Galeri</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Exhibition Metadata Grid */}
              <div className="grid grid-cols-2 gap-4 pt-2 font-mono text-xs text-zinc-400">
                <div className="space-y-1 border-l-2 border-red-600 pl-3">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">Tanggal Pembukaan</span>
                  <p className="text-zinc-200 font-medium">{content.eventDate}</p>
                </div>
                <div className="space-y-1 border-l-2 border-zinc-700 pl-3">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">Waktu Akses</span>
                  <p className="text-zinc-200 font-medium">{content.eventTime}</p>
                </div>
              </div>
            </div>

            {/* Right Ticket Perforation Stub (4 cols) */}
            <div className="lg:col-span-4 p-6 sm:p-8 bg-zinc-950/40 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Curator Seal Stamp */}
                <div className="border border-red-900/60 bg-red-950/20 p-4 rounded text-center font-mono space-y-1">
                  <ShieldCheck className="w-6 h-6 text-red-500 mx-auto" />
                  <p className="text-[10px] uppercase tracking-widest text-red-400 font-bold">
                    {content.curatorSeal}
                  </p>
                  <p className="text-[9px] text-zinc-500">AUTHENTICATED BY CURATORIAL BOARD</p>
                </div>

                <div className="space-y-1 font-mono text-[11px] text-zinc-400">
                  <div className="flex justify-between border-b border-zinc-800 pb-1">
                    <span className="text-zinc-600 uppercase">Pavilion</span>
                    <span className="text-zinc-300 font-medium">Main Wing</span>
                  </div>
                  <div className="flex justify-between border-b border-zinc-800 py-1">
                    <span className="text-zinc-600 uppercase">Access</span>
                    <span className="text-red-400 font-medium">VIP Collector</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-zinc-600 uppercase">Pass ID</span>
                    <span className="text-zinc-300 font-medium">{content.ticketNumber}</span>
                  </div>
                </div>
              </div>

              {/* Barcode Graphic */}
              <div className="pt-4 border-t border-dashed border-zinc-800 text-center space-y-1">
                <div className="font-mono text-xs tracking-widest text-zinc-600 font-semibold scale-y-125 select-none">
                  ||||| | ||||| || |||||| | ||| |||||||
                </div>
                <p className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest">
                  ADMIT ONE // SCAN AT ENTRY
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 2. SWISS MONOSPACE COUNTDOWN TICKER RIBBON                   */}
        {/* ============================================================ */}
        <section className="border-y border-zinc-800 bg-zinc-950/80 py-4 px-6 font-mono text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-red-500 font-semibold tracking-widest uppercase text-[11px]">
              <Clock className="w-4 h-4" />
              <span>T-Minus // Vernissage Countdown</span>
            </div>
            <div className="flex items-center gap-3 sm:gap-6 text-zinc-200">
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold text-white">{String(countdown.days).padStart(2, "0")}</span>
                <span className="text-[10px] text-zinc-500 uppercase">Hari</span>
              </div>
              <span className="text-zinc-700">:</span>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold text-white">{String(countdown.hours).padStart(2, "0")}</span>
                <span className="text-[10px] text-zinc-500 uppercase">Jam</span>
              </div>
              <span className="text-zinc-700">:</span>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold text-white">{String(countdown.minutes).padStart(2, "0")}</span>
                <span className="text-[10px] text-zinc-500 uppercase">Mnt</span>
              </div>
              <span className="text-zinc-700">:</span>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold text-red-500">{String(countdown.seconds).padStart(2, "0")}</span>
                <span className="text-[10px] text-zinc-500 uppercase">Dtk</span>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* INTERACTIVE CONTENT (REVEALED WHEN OPENED OR THUMBNAIL)      */}
        {/* ============================================================ */}
        {(isOpen || isThumbnail) && (
          <div className="space-y-16 animate-in fade-in duration-700">
            {/* 3. CURATORIAL ESSAY: TWO-COLUMN EDITORIAL SPREAD */}
            <section
              style={cardBgStyle}
              className="rounded-none sm:rounded-2xl border-y sm:border border-zinc-800 p-6 sm:p-12 space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Pull Quote & Curator Credit Left (4 cols) */}
                <div className="lg:col-span-4 space-y-6 lg:border-r border-zinc-800 lg:pr-8">
                  <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-red-500 block">
                    01 // Curatorial Note
                  </span>
                  <blockquote className="font-serif text-xl sm:text-2xl text-zinc-200 italic font-light leading-snug border-l-2 border-red-600 pl-4">
                    &ldquo;Eksplorasi batas antara memori, materialitas, dan ruang hening.&rdquo;
                  </blockquote>
                  {content.curatorName && (
                    <div className="font-mono text-xs text-zinc-400 space-y-0.5 pt-2">
                      <p className="text-zinc-600 uppercase text-[10px]">Kurator Pameran</p>
                      <p className="text-zinc-200 font-semibold">{content.curatorName}</p>
                    </div>
                  )}
                </div>

                {/* Essay Body Right (8 cols) */}
                <div className="lg:col-span-8 space-y-4 font-serif text-base text-zinc-300 leading-relaxed">
                  {toParagraphs(content.curatorialStatement).map((para, idx) => (
                    <p key={idx} className={idx === 0 ? "first-letter:text-4xl first-letter:font-mono first-letter:text-red-500 first-letter:mr-2 first-letter:float-left" : ""}>
                      {para}
                    </p>
                  ))}
                  <div className="pt-6 border-t border-zinc-800 flex items-center justify-between font-mono text-xs text-zinc-500">
                    <span>Hormat Kami, <strong className="text-zinc-300">{content.senderName}</strong></span>
                    <span>LUMINA GALLERY ARCHIVE</span>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. GALLERY EXHIBITION WALL: CENTERPIECE + ASYMMETRIC DIPTYCH */}
            <section className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-zinc-800 pb-4">
                <div>
                  <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-red-500 block">
                    02 // Catalogue Selection
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-light uppercase text-white tracking-wide">
                    Exhibited Masterworks
                  </h3>
                </div>
                <p className="font-mono text-xs text-zinc-500">
                  PRIVATE PREVIEW COLLECTION // 3 WORKS SELECTED
                </p>
              </div>

              {/* Masterwork Centerpiece (Artwork 1) */}
              {content.artwork1Url && (
                <div
                  style={cardBgStyle}
                  className="rounded-none sm:rounded-2xl border-y sm:border border-zinc-800 overflow-hidden shadow-2xl"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-950">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={content.artwork1Url}
                      alt={content.artwork1Title}
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-zinc-950/80 px-3 py-1 rounded font-mono text-[10px] text-red-400 uppercase tracking-widest border border-zinc-800 backdrop-blur-sm">
                      Masterpiece Showcase
                    </div>
                  </div>

                  {/* Museum Wall Plaque */}
                  <div className="p-6 sm:p-8 bg-zinc-950/90 border-t border-zinc-800 flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                    <div className="space-y-1.5 max-w-xl">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                        CATALOGUE NO. 01
                      </span>
                      <h4 className="text-xl sm:text-2xl font-serif text-white font-medium">
                        {content.artwork1Title}
                      </h4>
                      <p className="font-mono text-xs text-zinc-400 italic">
                        {content.artwork1Medium}
                      </p>
                      <p className="font-serif text-sm text-zinc-300 pt-2 leading-relaxed">
                        {content.artwork1Desc}
                      </p>
                    </div>
                    <div className="shrink-0 font-mono text-[11px] text-zinc-500 border-l border-zinc-800 pl-4 space-y-1">
                      <p className="text-zinc-400 font-semibold">Julian Thorne</p>
                      <p>Studio Lumina Edition</p>
                      <p className="text-red-400">Available for Acquisition</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Offset Diptych Pair (Artworks 2 & 3) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {content.artwork2Url && (
                  <div
                    style={cardBgStyle}
                    className="rounded-none sm:rounded-2xl border-y sm:border border-zinc-800 overflow-hidden shadow-lg flex flex-col justify-between"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-950">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={content.artwork2Url}
                        alt={content.artwork2Title}
                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 bg-zinc-950/80 px-2.5 py-0.5 rounded font-mono text-[9px] text-zinc-300 uppercase tracking-widest border border-zinc-800">
                        Sculptural Study
                      </div>
                    </div>
                    <div className="p-6 bg-zinc-950/90 border-t border-zinc-800 space-y-2">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500">
                        CATALOGUE NO. 02
                      </span>
                      <h5 className="text-lg font-serif text-white font-medium">
                        {content.artwork2Title}
                      </h5>
                      <p className="font-mono text-[11px] text-zinc-400 italic">
                        {content.artwork2Medium}
                      </p>
                      <p className="font-serif text-xs text-zinc-400 leading-relaxed pt-1">
                        {content.artwork2Desc}
                      </p>
                    </div>
                  </div>
                )}

                {content.artwork3Url && (
                  <div
                    style={cardBgStyle}
                    className="rounded-none sm:rounded-2xl border-y sm:border border-zinc-800 overflow-hidden shadow-lg flex flex-col justify-between"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-950">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={content.artwork3Url}
                        alt={content.artwork3Title}
                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 bg-zinc-950/80 px-2.5 py-0.5 rounded font-mono text-[9px] text-zinc-300 uppercase tracking-widest border border-zinc-800">
                        Mineral Pigment
                      </div>
                    </div>
                    <div className="p-6 bg-zinc-950/90 border-t border-zinc-800 space-y-2">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500">
                        CATALOGUE NO. 03
                      </span>
                      <h5 className="text-lg font-serif text-white font-medium">
                        {content.artwork3Title}
                      </h5>
                      <p className="font-mono text-[11px] text-zinc-400 italic">
                        {content.artwork3Medium}
                      </p>
                      <p className="font-serif text-xs text-zinc-400 leading-relaxed pt-1">
                        {content.artwork3Desc}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* 5. VERNISSAGE PROGRAM: PROGRAMMATIC SCHEDULE TABLE */}
            <section
              style={cardBgStyle}
              className="rounded-none sm:rounded-2xl border-y sm:border border-zinc-800 p-6 sm:p-10 space-y-6"
            >
              <div className="border-b border-zinc-800 pb-4">
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-red-500 block">
                  03 // Run of Show
                </span>
                <h3 className="text-xl sm:text-2xl font-serif uppercase text-white tracking-wide">
                  Vernissage Evening Program
                </h3>
              </div>

              <div className="divide-y divide-zinc-800 font-mono">
                {[
                  { time: content.session1Time, title: content.session1Title, desc: content.session1Desc, loc: "Foyer Gallery" },
                  { time: content.session2Time, title: content.session2Title, desc: content.session2Desc, loc: "Main Atrium" },
                  { time: content.session3Time, title: content.session3Title, desc: content.session3Desc, loc: "Installation Room" },
                  { time: content.session4Time, title: content.session4Title, desc: content.session4Desc, loc: "Collector Lounge" },
                ].map((item, idx) => (
                  <div key={idx} className="py-4 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline">
                    <div className="sm:col-span-3 text-red-400 text-xs font-semibold">
                      {item.time}
                    </div>
                    <div className="sm:col-span-6 space-y-1">
                      <p className="text-zinc-100 font-serif text-base">{item.title}</p>
                      <p className="text-zinc-400 font-sans text-xs leading-relaxed">{item.desc}</p>
                    </div>
                    <div className="sm:col-span-3 sm:text-right text-[11px] text-zinc-500 uppercase">
                      {item.loc}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 6. LOCATION & PATRON ACQUISITION SPREAD */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Location & Maps */}
              <div
                style={cardBgStyle}
                className="rounded-none sm:rounded-2xl border-y sm:border border-zinc-800 p-6 sm:p-8 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-red-500 block">
                    04 // Venue Specification
                  </span>
                  <h4 className="text-xl font-serif text-white font-medium">
                    {content.venueName}
                  </h4>
                  <p className="font-mono text-xs text-zinc-400">
                    {content.venueHall}
                  </p>
                  <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                    {content.venueAddress}
                  </p>
                </div>

                {content.mapsUrl && (
                  <a
                    href={content.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-xs uppercase tracking-wider border border-zinc-700 transition-all duration-200"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-red-400" />
                    <span>Buka Google Maps Navigator</span>
                  </a>
                )}
              </div>

              {/* Patron Fund Support */}
              <div
                style={cardBgStyle}
                className="rounded-none sm:rounded-2xl border-y sm:border border-zinc-800 p-6 sm:p-8 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-red-500 block">
                    05 // Patron & Foundation
                  </span>
                  <h4 className="text-xl font-serif text-white font-medium">
                    {content.patronBankName}
                  </h4>
                  <div className="bg-zinc-950 p-4 rounded border border-zinc-800 font-mono space-y-1">
                    <p className="text-[10px] text-zinc-500 uppercase">Nomor Rekening Kurasi:</p>
                    <p className="text-lg font-bold text-white tracking-widest">{content.patronAccountNo}</p>
                    <p className="text-xs text-zinc-400">a.n. {content.patronAccountName}</p>
                  </div>
                  <p className="font-sans text-xs text-zinc-400 italic">
                    {content.patronNote}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCopyAccount}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-xs uppercase tracking-wider border border-zinc-700 transition-all duration-200"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-red-400" />
                      <span>Nomor Rekening Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Rekening Patron</span>
                    </>
                  )}
                </button>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}

export function ArtExhibitionTemplate({
  data,
  className,
}: ArtExhibitionTemplateProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#09090b]" />}>
      <ArtExhibitionTemplateInner data={data} className={className} />
    </Suspense>
  );
}
