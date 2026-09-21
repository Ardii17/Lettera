"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import {
  Calendar,
  Clock,
  MapPin,
  Check,
  Copy,
  ExternalLink,
  Sparkles,
  Pause,
  Play,
  Ticket,
  Eye,
  ChevronRight,
  ShieldCheck,
  HeartHandshake,
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

  // Mode Thumbnail atau Katalog /templates: TIDAK PERNAH menampilkan audio atau popup
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

  // Nama tamu dinamis
  const guestParam = searchParams.get("to");
  const displayedRecipient = guestParam || content.recipientName;

  // State
  const [isOpen, setIsOpen] = useState(!shouldStartClosed);
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [countdown, setCountdown] = useState<CountdownState>(initialCountdown);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Countdown timer effect
  useEffect(() => {
    if (!content.targetDateIso) return;
    setCountdown(computeCountdown(content.targetDateIso));

    const interval = setInterval(() => {
      setCountdown(computeCountdown(content.targetDateIso));
    }, 1000);

    return () => clearInterval(interval);
  }, [content.targetDateIso]);

  // Handle audio play/pause
  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  // Copy account number
  const handleCopyAccount = () => {
    if (!content.patronAccountNo) return;
    navigator.clipboard.writeText(content.patronAccountNo);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Isolasi audio untuk katalog
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
        isThumbnail ? "overflow-hidden text-[11px] p-4" : "p-4 sm:p-6 md:p-12",
        className,
      )}
    >
      {/* Background Subtle Noise & Gallery Grid Lines */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-950/40 to-transparent opacity-80" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#27272a0a_1px,transparent_1px),linear-gradient(to_bottom,#27272a0a_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      <div className="relative mx-auto max-w-3xl space-y-10 sm:space-y-14">
        {/* ============================================================ */}
        {/* HERO SECTION: VIP VERNISSAGE PASS & ADMIT ONE TICKET        */}
        {/* ============================================================ */}
        <section
          style={cardBgStyle}
          className="relative overflow-hidden rounded-2xl border border-zinc-800/80 shadow-2xl backdrop-blur-sm"
        >
          {/* Top Header Tag */}
          <div className="border-b border-zinc-800 px-6 py-4 flex flex-wrap items-center justify-between gap-2 text-xs tracking-widest uppercase font-mono text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-red-600 animate-pulse" />
              <span>{content.exhibitionSub || "Solo Exhibition Vernissage"}</span>
            </div>
            <div className="text-zinc-500 font-semibold">{content.ticketNumber || "VIP-0842"}</div>
          </div>

          {/* Ticket Body Content */}
          <div className="p-6 sm:p-10 space-y-8">
            {/* Curator Badge & Stamp */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.25em] text-red-500 font-mono font-medium">
                  Exclusive Invitation & Private Viewing
                </p>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-white uppercase font-light leading-tight">
                  {content.exhibitionTitle}
                </h1>
                <p className="text-sm sm:text-base text-zinc-400 font-mono">
                  Curated Solo Showcase by <span className="text-zinc-200 font-semibold">{content.artistName}</span>
                </p>
              </div>

              {/* Emboss Curator Stamp */}
              <div className="shrink-0 self-start border border-red-700/60 bg-red-950/20 text-red-400 px-3.5 py-2.5 rounded-lg text-center font-mono text-[10px] tracking-widest uppercase space-y-0.5 ring-1 ring-red-900/40">
                <div className="flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-red-400" />
                  <span className="font-semibold">AUTHENTIC PASS</span>
                </div>
                <div className="text-red-300 font-bold">{content.curatorSeal || "CURATOR APPROVED"}</div>
              </div>
            </div>

            {/* Guest Welcome Banner */}
            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-mono">
                  Tamu Terhormat / Collector
                </span>
                <div className="text-base sm:text-lg font-serif font-medium text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>{displayedRecipient}</span>
                </div>
              </div>

              {!isOpen && !isThumbnail && (
                <button
                  type="button"
                  onClick={() => setIsOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-mono tracking-wider uppercase transition-all duration-300 shadow-lg shadow-red-950/50 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Ticket className="w-4 h-4" />
                  <span>Buka Undangan Galeri</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Ticket Perforation Visual */}
            <div className="relative py-2">
              <div className="border-t border-dashed border-zinc-800" />
              <div className="absolute -left-10 -top-3 w-6 h-6 rounded-full bg-[#09090b] border border-zinc-800" />
              <div className="absolute -right-10 -top-3 w-6 h-6 rounded-full bg-[#09090b] border border-zinc-800" />
            </div>

            {/* Barcode & Meta Specs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1 text-xs text-zinc-500 font-mono">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-zinc-400" />
                <span>{content.eventDate}</span>
                <span className="text-zinc-700">|</span>
                <Clock className="w-4 h-4 text-zinc-400" />
                <span>{content.eventTime}</span>
              </div>
              <div className="flex items-center gap-2 tracking-widest text-[10px] text-zinc-600">
                <span>||||| ||| ||||||| |||| |||||</span>
                <span>{content.ticketNumber}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* INTERACTIVE CONTENT (REVEALED WHEN OPENED OR THUMBNAIL)      */}
        {/* ============================================================ */}
        {(isOpen || isThumbnail) && (
          <div className="space-y-12 sm:space-y-16 animate-in fade-in slide-in-from-bottom-6 duration-700">
            {/* 1. CURATORIAL STATEMENT & ARTIST DIALOGUE */}
            <section
              style={cardBgStyle}
              className="rounded-2xl border border-zinc-800/80 p-6 sm:p-10 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <span className="text-xs uppercase tracking-[0.2em] text-red-400 font-mono">
                  01 // Curatorial Note
                </span>
                {content.curatorName && (
                  <span className="text-xs text-zinc-400 font-mono">
                    Kurator: <span className="text-zinc-200">{content.curatorName}</span>
                  </span>
                )}
              </div>

              <div className="prose prose-invert max-w-none text-zinc-300 font-serif leading-relaxed text-base sm:text-lg space-y-4">
                {toParagraphs(content.curatorialStatement).map((paragraph, idx) => (
                  <p key={idx} className="first-letter:text-3xl first-letter:font-mono first-letter:text-red-500 first-letter:mr-1">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="border-t border-zinc-800 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-zinc-400">
                <div>
                  Hormat kami, <span className="text-zinc-200 font-medium">{content.senderName}</span>
                </div>
                <div className="text-zinc-500">
                  {content.venueName} &bull; {content.venueHall}
                </div>
              </div>
            </section>

            {/* 2. LIVE COUNTDOWN TIMER */}
            {content.targetDateIso && (
              <section
                style={cardBgStyle}
                className="rounded-2xl border border-zinc-800/80 p-6 sm:p-8 space-y-6 text-center"
              >
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-mono">
                    Countdown to Vernissage Opening Night
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif text-white uppercase font-light">
                    Hitung Mundur Pembukaan Pameran
                  </h3>
                </div>

                {countdown.isExpired ? (
                  <div className="inline-block rounded-lg bg-red-950/40 border border-red-800 px-6 py-3 text-red-300 font-mono text-sm">
                    Pameran telah resmi dibuka. Selamat menikmati karya seni kuratorial.
                  </div>
                ) : (
                  <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-lg mx-auto">
                    {[
                      { label: "Hari", value: countdown.days },
                      { label: "Jam", value: countdown.hours },
                      { label: "Menit", value: countdown.minutes },
                      { label: "Detik", value: countdown.seconds },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-3 sm:p-4 text-center"
                      >
                        <div
                          suppressHydrationWarning
                          className="text-2xl sm:text-4xl font-mono font-bold text-white tracking-tight"
                        >
                          {String(item.value).padStart(2, "0")}
                        </div>
                        <div className="text-[10px] sm:text-xs uppercase tracking-wider text-zinc-500 mt-1 font-mono">
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* 3. PREVIEW KARYA SENI KURASI (3 ARTWORKS) */}
            <section className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-zinc-800 pb-4">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-red-400 font-mono">
                    02 // Curatorial Highlights
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif text-white font-light mt-1">
                    Pratinjau Karya Terpilih
                  </h3>
                </div>
                <span className="text-xs text-zinc-500 font-mono">3 Highlights from 28 Artworks</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Artwork 1 */}
                {content.artwork1Url && (
                  <div
                    style={cardBgStyle}
                    className="group rounded-xl border border-zinc-800 overflow-hidden flex flex-col transition-all duration-300 hover:border-zinc-700"
                  >
                    <div className="relative aspect-4/5 overflow-hidden bg-zinc-950">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={content.artwork1Url}
                        alt={content.artwork1Title || "Artwork 1"}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 bg-zinc-950/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-zinc-300 border border-zinc-800">
                        CATALOG #01
                      </div>
                    </div>
                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <h4 className="text-base font-serif text-white font-medium group-hover:text-red-400 transition-colors">
                          {content.artwork1Title}
                        </h4>
                        <p className="text-xs text-zinc-400 font-mono mt-1">{content.artwork1Medium}</p>
                      </div>
                      {content.artwork1Desc && (
                        <p className="text-xs text-zinc-500 line-clamp-3 leading-relaxed border-t border-zinc-800/80 pt-2">
                          {content.artwork1Desc}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Artwork 2 */}
                {content.artwork2Url && (
                  <div
                    style={cardBgStyle}
                    className="group rounded-xl border border-zinc-800 overflow-hidden flex flex-col transition-all duration-300 hover:border-zinc-700"
                  >
                    <div className="relative aspect-4/5 overflow-hidden bg-zinc-950">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={content.artwork2Url}
                        alt={content.artwork2Title || "Artwork 2"}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 bg-zinc-950/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-zinc-300 border border-zinc-800">
                        CATALOG #02
                      </div>
                    </div>
                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <h4 className="text-base font-serif text-white font-medium group-hover:text-red-400 transition-colors">
                          {content.artwork2Title}
                        </h4>
                        <p className="text-xs text-zinc-400 font-mono mt-1">{content.artwork2Medium}</p>
                      </div>
                      {content.artwork2Desc && (
                        <p className="text-xs text-zinc-500 line-clamp-3 leading-relaxed border-t border-zinc-800/80 pt-2">
                          {content.artwork2Desc}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Artwork 3 */}
                {content.artwork3Url && (
                  <div
                    style={cardBgStyle}
                    className="group rounded-xl border border-zinc-800 overflow-hidden flex flex-col transition-all duration-300 hover:border-zinc-700"
                  >
                    <div className="relative aspect-4/5 overflow-hidden bg-zinc-950">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={content.artwork3Url}
                        alt={content.artwork3Title || "Artwork 3"}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 bg-zinc-950/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-zinc-300 border border-zinc-800">
                        CATALOG #03
                      </div>
                    </div>
                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <h4 className="text-base font-serif text-white font-medium group-hover:text-red-400 transition-colors">
                          {content.artwork3Title}
                        </h4>
                        <p className="text-xs text-zinc-400 font-mono mt-1">{content.artwork3Medium}</p>
                      </div>
                      {content.artwork3Desc && (
                        <p className="text-xs text-zinc-500 line-clamp-3 leading-relaxed border-t border-zinc-800/80 pt-2">
                          {content.artwork3Desc}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* 4. RUNDOWN 4 SESI ACARA */}
            <section
              style={cardBgStyle}
              className="rounded-2xl border border-zinc-800/80 p-6 sm:p-10 space-y-8"
            >
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-red-400 font-mono">
                    03 // Vernissage Schedule
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif text-white font-light mt-1">
                    Susunan Acara Malam Pembukaan
                  </h3>
                </div>
                <Clock className="w-5 h-5 text-zinc-500" />
              </div>

              <div className="space-y-6">
                {[
                  {
                    num: "01",
                    time: content.session1Time,
                    title: content.session1Title,
                    desc: content.session1Desc,
                  },
                  {
                    num: "02",
                    time: content.session2Time,
                    title: content.session2Title,
                    desc: content.session2Desc,
                  },
                  {
                    num: "03",
                    time: content.session3Time,
                    title: content.session3Title,
                    desc: content.session3Desc,
                  },
                  {
                    num: "04",
                    time: content.session4Time,
                    title: content.session4Title,
                    desc: content.session4Desc,
                  },
                ].map((s) => (
                  <div
                    key={s.num}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-start border-b border-zinc-800/50 pb-5 last:border-b-0 last:pb-0"
                  >
                    <div className="sm:col-span-3 text-xs font-mono text-red-400 font-medium">
                      {s.time}
                    </div>
                    <div className="sm:col-span-9 space-y-1">
                      <h4 className="text-base font-serif text-white font-medium">{s.title}</h4>
                      <p className="text-xs text-zinc-400 leading-relaxed font-sans">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. VENUE & GOOGLE MAPS NAVIGATION */}
            <section
              style={cardBgStyle}
              className="rounded-2xl border border-zinc-800/80 p-6 sm:p-10 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-red-400 font-mono">
                    04 // Exhibition Venue
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif text-white font-light mt-1">
                    Lokasi & Navigasi Galeri
                  </h3>
                </div>
                <MapPin className="w-5 h-5 text-red-400" />
              </div>

              <div className="space-y-3">
                <div className="text-lg font-serif text-white font-medium">{content.venueName}</div>
                <div className="text-xs font-mono text-zinc-400">{content.venueHall}</div>
                <p className="text-sm text-zinc-400 leading-relaxed font-sans">{content.venueAddress}</p>
              </div>

              {content.mapsUrl && (
                <div className="pt-2">
                  <a
                    href={content.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-mono tracking-wider uppercase transition-all duration-200 border border-zinc-700 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <ExternalLink className="w-4 h-4 text-red-400" />
                    <span>Petunjuk Arah (Google Maps)</span>
                  </a>
                </div>
              )}
            </section>

            {/* 6. DRESS CODE & PATRON SENI / DUKUNGAN DONASI */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* Dress Code Section */}
              <section
                style={cardBgStyle}
                className="rounded-2xl border border-zinc-800/80 p-6 sm:p-8 space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                    <span className="text-xs uppercase tracking-[0.2em] text-red-400 font-mono">
                      05 // Dress Code
                    </span>
                    <Eye className="w-4 h-4 text-zinc-500" />
                  </div>
                  <div>
                    <h4 className="text-lg font-serif text-white font-medium">{content.dressCodeTitle}</h4>
                    <p className="text-xs text-zinc-400 mt-2 leading-relaxed">{content.dressCodeNotes}</p>
                  </div>
                </div>

                {/* Color Swatches */}
                <div className="space-y-2 pt-4 border-t border-zinc-800/80">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500">
                    Recommended Palette
                  </span>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { hex: content.paletteColor1, name: content.paletteName1 },
                      { hex: content.paletteColor2, name: content.paletteName2 },
                      { hex: content.paletteColor3, name: content.paletteName3 },
                      { hex: content.paletteColor4, name: content.paletteName4 },
                    ].map((swatch, i) => (
                      <div key={i} className="space-y-1.5 text-center">
                        <div
                          style={{ backgroundColor: swatch.hex }}
                          className="h-10 w-full rounded-md border border-zinc-700 shadow-sm"
                        />
                        <div className="text-[9px] font-mono text-zinc-400 truncate">{swatch.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Patron & Galeri Support */}
              <section
                style={cardBgStyle}
                className="rounded-2xl border border-zinc-800/80 p-6 sm:p-8 space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                    <span className="text-xs uppercase tracking-[0.2em] text-red-400 font-mono">
                      06 // Arts Patronage
                    </span>
                    <HeartHandshake className="w-4 h-4 text-zinc-500" />
                  </div>
                  <div>
                    <h4 className="text-lg font-serif text-white font-medium">
                      {content.patronBankName || "Arts Foundation"}
                    </h4>
                    <p className="text-xs text-zinc-400 mt-2 leading-relaxed">{content.patronNote}</p>
                  </div>
                </div>

                {/* Bank Account Copy */}
                {content.patronAccountNo && (
                  <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-4 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-mono">
                          Nomor Rekening Patron
                        </div>
                        <div className="text-base font-mono font-bold text-white tracking-wider">
                          {content.patronAccountNo}
                        </div>
                        <div className="text-xs text-zinc-400 font-mono mt-0.5">
                          a.n. {content.patronAccountName}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyAccount}
                        className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono transition-all",
                          copied
                            ? "bg-emerald-950 border border-emerald-700 text-emerald-300"
                            : "bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200",
                        )}
                      >
                        {copied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Tersalin</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Salin</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </section>
            </div>

            {/* FOOTER */}
            <footer className="text-center py-8 space-y-3 border-t border-zinc-900 font-mono text-xs text-zinc-600">
              <p className="tracking-widest uppercase">
                {content.exhibitionTitle} &bull; {content.artistName}
              </p>
              <p className="text-[11px] text-zinc-700">
                Lumina Contemporary Art Space &copy; 2026. All Rights Reserved.
              </p>
            </footer>
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* FLOATING AMBIENT MUSIC PLAYER (ISOLATED FROM /templates)     */}
      {/* ============================================================ */}
      {showFloatingAudio && (
        <aside
          aria-label="Pemutar Audio Pameran"
          className="fixed bottom-5 right-5 z-40 animate-in fade-in slide-in-from-bottom-3 duration-500"
        >
          <audio ref={audioRef} src={content.musicUrl} loop preload="none" />
          <button
            type="button"
            onClick={toggleAudio}
            className="group flex items-center gap-3 bg-zinc-950/90 hover:bg-zinc-900 text-zinc-300 hover:text-white border border-zinc-800 px-4 py-2.5 rounded-full shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 ring-1 ring-zinc-700/50"
          >
            <div className="relative flex items-center justify-center">
              <span
                className={cn(
                  "w-3 h-3 rounded-full bg-red-600 transition-opacity",
                  isPlaying ? "animate-ping opacity-75" : "opacity-0",
                )}
              />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </div>
            <span className="text-xs font-mono tracking-wider max-w-[140px] truncate">
              {content.musicTitle || "Gallery Ambient"}
            </span>
            <div className="p-1 rounded-full bg-zinc-800 group-hover:bg-red-600 transition-colors">
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
            </div>
          </button>
        </aside>
      )}
    </div>
  );
}

export function ArtExhibitionTemplate(props: ArtExhibitionTemplateProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-[400px] flex items-center justify-center bg-zinc-950 text-zinc-500 font-mono text-xs">
          Loading Curatorial Exhibition...
        </div>
      }
    >
      <ArtExhibitionTemplateInner {...props} />
    </Suspense>
  );
}
