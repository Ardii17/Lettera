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
  ChevronRight,
  Zap,
  Disc,
  PartyPopper,
  Flame,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { toParagraphs } from "@/lib/utils/format";
import type { LetterContent } from "@/types/letter";
import { withDefaults } from "../utils";

const defaults: Record<string, string> = {
  recipientName: "Sahabat Terdekat & VIP Guest",
  ticketCode: "NEON-PASS-2026-VIP",
  vipBadge: "ALL ACCESS VIP // LEVEL 17",
  partySub: "Sweet 17 Cyberpunk Odyssey & Rooftop Rave",
  partyTitle: "NEON ODYSSEY: Natasha's 17th Birthday",
  celebrantName: "Natasha Aurelia",
  ageCelebration: "Sweet Seventeen (17th)",
  partyMessage:
    "Satu malam penuh cahaya neon, dentuman beat synthwave terbaik, dan momen tak terlupakan! Bergabunglah bersamaku untuk merayakan babak baru ke-17 di bawah gemerlap langit malam kota.\n\nMari menari, tertawa, dan abadikan kenangan terbaik bersama sahabat tercinta. Get your VIP pass ready and light up the dance floor with me!",
  senderName: "Natasha & The Crew",
  eventDate: "Jumat, 13 November 2026",
  eventTime: "19.00 WIB s.d. Tengah Malam",
  targetDateIso: "2026-11-13T19:00:00",
  venueName: "Skyline Neon Lounge & Rooftop",
  venueFloor: "32nd Floor Sky Deck & Poolside Foyer",
  venueAddress: "Jl. Jend. Sudirman Kav. 52-53, Kawasan SCBD, Jakarta Selatan",
  mapsUrl: "https://maps.google.com/?q=SCBD+Jakarta",

  session1Time: "19.00 – 19.45 WIB",
  session1Title: "VIP Red Carpet & Neon Face Art",
  session1Desc: "Registrasi tamu VIP, glow face-painting booth, pembagian gelang LED, dan welcome drink.",
  session2Time: "19.45 – 20.45 WIB",
  session2Title: "Warm-Up DJ Set & Finger Food Feast",
  session2Desc: "Iringan musik synthwave chill, santap gourmet mini-burgers & mocktail bar, serta photo session.",
  session3Time: "20.45 – 21.30 WIB",
  session3Title: "17th Birthday Toast & Laser Show",
  session3Desc: "Momen tiup lilin utama ke-17, video kenangan sahabat, dan spektakel laser hologram.",
  session4Time: "21.30 – 23.30 WIB",
  session4Title: "Midnight Rave & Dance Floor Finale",
  session4Desc: "Pesta dansa bersama guest star DJ, confetti party, dan pembagian hadiah best outfit.",

  photo1Title: "Neon Cyber Rebel",
  photo1Caption: "Ready to rock the 17th chapter with full energy and vibrant lights!",
  photo1Url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",

  photo2Title: "City Skyline Glow",
  photo2Caption: "Midnight conversations under the neon towers of the capital.",
  photo2Url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80",

  photo3Title: "The Best Squad",
  photo3Caption: "Good vibes only! Can't wait to dance the night away with you all.",
  photo3Url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80",

  dressCodeTitle: "Y2K Cyberpunk / Neon Glow in the Dark",
  dressCodeNotes: "Kenakan busana gelap dengan sentuhan warna neon terang yang bersinar di bawah lampu UV ultraviolet.",
  paletteColor1: "#00f2fe",
  paletteName1: "Electric Cyan",
  paletteColor2: "#ff007f",
  paletteName2: "Hot Magenta",
  paletteColor3: "#39ff14",
  paletteName3: "Laser Lime",
  paletteColor4: "#12121e",
  paletteName4: "Pitch Noir",

  giftWalletType: "BCA / GoPay / Dana",
  giftAccountNo: "081298765432",
  giftAccountName: "Natasha Aurelia",
  giftNote: "Kehadiran dan kebersamaan kalian adalah kado paling berharga!",

  backgroundColor: "#090910",
  cardColor: "#12121e",
  textColor: "#f8fafc",
  musicUrl: "https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f792cb.mp3?filename=synthwave-80s-110045.mp3",
  musicTitle: "Synthwave Cyber Odyssey Beat",
};

interface NeonBashTemplateProps {
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

function NeonBashTemplateInner({ data, className }: NeonBashTemplateProps) {
  const content = withDefaults(defaults, data);
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Mode Thumbnail atau Katalog: isolasi audio & modal fixed
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

  // Countdown effect
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

  // Salin nomor rekening/e-wallet
  const handleCopyAccount = () => {
    if (!content.giftAccountNo) return;
    navigator.clipboard.writeText(content.giftAccountNo);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const showFloatingAudio = !isThumbnail && pathname !== "/templates" && Boolean(content.musicUrl);

  const bgStyle = {
    backgroundColor: content.backgroundColor || "#090910",
    color: content.textColor || "#f8fafc",
  };

  const cardBgStyle = {
    backgroundColor: content.cardColor || "#12121e",
  };

  return (
    <div
      style={bgStyle}
      className={cn(
        "relative min-h-screen w-full font-sans antialiased selection:bg-fuchsia-500 selection:text-white",
        isThumbnail ? "overflow-hidden text-[11px] p-4" : "p-4 sm:p-6 md:p-12",
        className,
      )}
    >
      {/* Cyber Neon Background Lights */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,#ff007f15,transparent_50%),radial-gradient(circle_at_bottom_left,#00f2fe15,transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1e1e3820_1px,transparent_1px),linear-gradient(to_bottom,#1e1e3820_1px,transparent_1px)] bg-[size:3rem_3rem]" />

      <div className="relative mx-auto max-w-3xl space-y-10 sm:space-y-14">
        {/* ============================================================ */}
        {/* HERO SECTION: VIP FESTIVAL PASS & BACKSTAGE LANYARD         */}
        {/* ============================================================ */}
        <section
          style={cardBgStyle}
          className="relative overflow-hidden rounded-2xl border-2 border-fuchsia-500/40 shadow-[0_0_50px_-12px_rgba(255,0,127,0.3)] backdrop-blur-md"
        >
          {/* Lanyard Top Clip Bar */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-16 h-3 rounded-full bg-zinc-800 border border-zinc-700 shadow-inner flex items-center justify-center">
              <div className="w-6 h-1 rounded-full bg-zinc-600" />
            </div>
          </div>

          {/* Top Hologram Strip */}
          <div className="bg-gradient-to-r from-cyan-500/20 via-fuchsia-500/30 to-cyan-500/20 px-6 py-3 flex items-center justify-between border-y border-fuchsia-500/30 text-xs font-mono tracking-widest text-cyan-300">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-fuchsia-400 animate-pulse" />
              <span className="uppercase font-bold">{content.partySub || "Sweet 17 Cyberpunk Odyssey"}</span>
            </div>
            <span className="text-fuchsia-400 font-bold">{content.ticketCode || "NEON-PASS-2026"}</span>
          </div>

          {/* Main Card Content */}
          <div className="p-6 sm:p-10 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-950/80 border border-fuchsia-500/50 text-fuchsia-300 text-xs font-mono font-medium">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>{content.ageCelebration || "Sweet 17"}</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-amber-300 drop-shadow-[0_0_25px_rgba(255,0,127,0.4)]">
                  {content.partyTitle}
                </h1>
                <p className="text-sm sm:text-base text-zinc-300 font-mono">
                  Hosted by <span className="text-cyan-400 font-bold">{content.celebrantName}</span>
                </p>
              </div>

              {/* VIP Glowing Stamp */}
              <div className="shrink-0 self-start border-2 border-dashed border-cyan-400/80 bg-cyan-950/40 text-cyan-300 px-4 py-3 rounded-xl text-center font-mono text-[11px] tracking-widest uppercase space-y-1 shadow-[0_0_20px_rgba(0,242,254,0.3)]">
                <div className="font-bold flex items-center justify-center gap-1">
                  <Disc className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                  <span>VIP PASS</span>
                </div>
                <div className="text-white font-extrabold text-xs">{content.vipBadge || "ALL ACCESS"}</div>
              </div>
            </div>

            {/* Guest Welcome Banner */}
            <div className="rounded-xl border border-fuchsia-500/30 bg-zinc-950/60 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-fuchsia-400/80 font-mono">
                  VIP Guest Access
                </span>
                <div className="text-base sm:text-xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>{displayedRecipient}</span>
                </div>
              </div>

              {!isOpen && !isThumbnail && (
                <button
                  type="button"
                  onClick={() => setIsOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-fuchsia-600 to-cyan-600 hover:from-fuchsia-500 hover:to-cyan-500 text-white text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 shadow-[0_0_25px_rgba(255,0,127,0.5)] hover:scale-105 active:scale-95"
                >
                  <Ticket className="w-4 h-4" />
                  <span>Claim VIP Pass & Enter</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Date & Location Specs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1 text-xs text-zinc-400 font-mono border-t border-zinc-800/80">
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span>{content.eventDate}</span>
                <span className="text-zinc-600">|</span>
                <Clock className="w-4 h-4 text-fuchsia-400" />
                <span>{content.eventTime}</span>
              </div>
              <div className="flex items-center gap-2 tracking-widest text-[10px] text-zinc-500">
                <span>|||| |||||| ||| ||||| ||||</span>
                <span>{content.ticketCode}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* INTERACTIVE CONTENT (REVEALED WHEN OPENED OR THUMBNAIL)      */}
        {/* ============================================================ */}
        {(isOpen || isThumbnail) && (
          <div className="space-y-12 sm:space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* 1. PARTY MESSAGE & CELEBRATION MANIFESTO */}
            <section
              style={cardBgStyle}
              className="rounded-2xl border border-zinc-800 p-6 sm:p-10 space-y-6 relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <span className="text-xs uppercase tracking-[0.2em] text-cyan-400 font-mono font-bold">
                  01 // Celebration Message
                </span>
                <span className="text-xs text-fuchsia-400 font-mono font-semibold">
                  #PartyVibes
                </span>
              </div>

              <div className="prose prose-invert max-w-none text-zinc-200 font-sans leading-relaxed text-base sm:text-lg space-y-4">
                {toParagraphs(content.partyMessage).map((paragraph, idx) => (
                  <p key={idx} className="first-letter:text-3xl first-letter:font-mono first-letter:text-cyan-400 first-letter:mr-1">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="border-t border-zinc-800 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-zinc-400">
                <div>
                  See you on the dance floor! Love, <span className="text-fuchsia-400 font-bold">{content.senderName}</span>
                </div>
                <div className="text-cyan-400">
                  {content.venueName}
                </div>
              </div>
            </section>

            {/* 2. LIVE NEON COUNTDOWN TIMER */}
            {content.targetDateIso && (
              <section
                style={cardBgStyle}
                className="rounded-2xl border-2 border-cyan-500/40 p-6 sm:p-8 space-y-6 text-center shadow-[0_0_35px_-10px_rgba(0,242,254,0.3)]"
              >
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-[0.25em] text-cyan-400 font-mono font-bold">
                    Countdown to Midnight Odyssey
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-tight">
                    Hitung Mundur Pesta Dimulai
                  </h3>
                </div>

                {countdown.isExpired ? (
                  <div className="inline-block rounded-xl bg-fuchsia-950/60 border border-fuchsia-500 px-6 py-3 text-fuchsia-300 font-mono text-sm font-bold animate-pulse">
                    The Party is LIVE NOW! Let&apos;s dance under the neon lights!
                  </div>
                ) : (
                  <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-lg mx-auto">
                    {[
                      { label: "Hari", value: countdown.days, color: "text-cyan-400" },
                      { label: "Jam", value: countdown.hours, color: "text-fuchsia-400" },
                      { label: "Menit", value: countdown.minutes, color: "text-amber-400" },
                      { label: "Detik", value: countdown.seconds, color: "text-emerald-400" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-3 sm:p-4 text-center shadow-inner"
                      >
                        <div
                          suppressHydrationWarning
                          className={cn("text-2xl sm:text-4xl font-mono font-black tracking-tight", item.color)}
                        >
                          {String(item.value).padStart(2, "0")}
                        </div>
                        <div className="text-[10px] sm:text-xs uppercase tracking-wider text-zinc-400 mt-1 font-mono">
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* 3. 3 FOTO POLAROID RETRO GLOW */}
            <section className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-zinc-800 pb-4">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-fuchsia-400 font-mono font-bold">
                    02 // Photo Vault
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight mt-1">
                    Kenangan & Neon Highlights
                  </h3>
                </div>
                <span className="text-xs text-cyan-400 font-mono">3 Polaroid Memories</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    url: content.photo1Url,
                    title: content.photo1Title,
                    caption: content.photo1Caption,
                    glow: "hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,242,254,0.3)]",
                    badge: "VIBE #01",
                  },
                  {
                    url: content.photo2Url,
                    title: content.photo2Title,
                    caption: content.photo2Caption,
                    glow: "hover:border-fuchsia-400 hover:shadow-[0_0_30px_rgba(255,0,127,0.3)]",
                    badge: "VIBE #02",
                  },
                  {
                    url: content.photo3Url,
                    title: content.photo3Title,
                    caption: content.photo3Caption,
                    glow: "hover:border-amber-400 hover:shadow-[0_0_30px_rgba(251,191,36,0.3)]",
                    badge: "VIBE #03",
                  },
                ].map((p, idx) => (
                  <div
                    key={idx}
                    style={cardBgStyle}
                    className={cn(
                      "group rounded-2xl border border-zinc-800 overflow-hidden flex flex-col transition-all duration-300 transform hover:-translate-y-1",
                      p.glow,
                    )}
                  >
                    <div className="relative aspect-4/5 overflow-hidden bg-zinc-950 p-2.5 pb-0">
                      <div className="relative h-full w-full overflow-hidden rounded-xl">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p.url}
                          alt={p.title || "Party Photo"}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-cyan-300 border border-cyan-500/40">
                          {p.badge}
                        </div>
                      </div>
                    </div>
                    <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                          {p.title}
                        </h4>
                        <p className="text-xs text-zinc-400 leading-relaxed mt-1">{p.caption}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. RUNDOWN PESTA (4 SESI ACARA) */}
            <section
              style={cardBgStyle}
              className="rounded-2xl border border-zinc-800 p-6 sm:p-10 space-y-8"
            >
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-cyan-400 font-mono font-bold">
                    03 // Party Timeline
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white uppercase tracking-tight mt-1">
                    Susunan Acara Malam Pesta
                  </h3>
                </div>
                <PartyPopper className="w-5 h-5 text-fuchsia-400" />
              </div>

              <div className="space-y-6">
                {[
                  {
                    num: "01",
                    time: content.session1Time,
                    title: content.session1Title,
                    desc: content.session1Desc,
                    color: "text-cyan-400",
                  },
                  {
                    num: "02",
                    time: content.session2Time,
                    title: content.session2Title,
                    desc: content.session2Desc,
                    color: "text-fuchsia-400",
                  },
                  {
                    num: "03",
                    time: content.session3Time,
                    title: content.session3Title,
                    desc: content.session3Desc,
                    color: "text-amber-400",
                  },
                  {
                    num: "04",
                    time: content.session4Time,
                    title: content.session4Title,
                    desc: content.session4Desc,
                    color: "text-emerald-400",
                  },
                ].map((s) => (
                  <div
                    key={s.num}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-start border-b border-zinc-800/60 pb-5 last:border-b-0 last:pb-0"
                  >
                    <div className={cn("sm:col-span-3 text-xs font-mono font-bold", s.color)}>
                      {s.time}
                    </div>
                    <div className="sm:col-span-9 space-y-1">
                      <h4 className="text-base font-bold text-white">{s.title}</h4>
                      <p className="text-xs text-zinc-400 leading-relaxed font-sans">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. VENUE & GOOGLE MAPS NAVIGATION */}
            <section
              style={cardBgStyle}
              className="rounded-2xl border border-zinc-800 p-6 sm:p-10 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-fuchsia-400 font-mono font-bold">
                    04 // Party Venue
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white uppercase tracking-tight mt-1">
                    Lokasi Rooftop & Peta
                  </h3>
                </div>
                <MapPin className="w-5 h-5 text-cyan-400" />
              </div>

              <div className="space-y-3">
                <div className="text-xl font-bold text-white">{content.venueName}</div>
                <div className="text-xs font-mono text-cyan-300">{content.venueFloor}</div>
                <p className="text-sm text-zinc-400 leading-relaxed">{content.venueAddress}</p>
              </div>

              {content.mapsUrl && (
                <div className="pt-2">
                  <a
                    href={content.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-fuchsia-600 hover:from-cyan-500 hover:to-fuchsia-500 text-white text-xs font-mono font-bold tracking-wider uppercase transition-all duration-300 shadow-[0_0_20px_rgba(0,242,254,0.4)] hover:scale-105 active:scale-95"
                  >
                    <ExternalLink className="w-4 h-4 text-white" />
                    <span>Buka Rute di Google Maps</span>
                  </a>
                </div>
              )}
            </section>

            {/* 6. DRESS CODE & KADO DIGITAL (E-WALLET) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* Dress Code */}
              <section
                style={cardBgStyle}
                className="rounded-2xl border border-zinc-800 p-6 sm:p-8 space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                    <span className="text-xs uppercase tracking-[0.2em] text-cyan-400 font-mono font-bold">
                      05 // Dress Code
                    </span>
                    <Flame className="w-4 h-4 text-fuchsia-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">{content.dressCodeTitle}</h4>
                    <p className="text-xs text-zinc-400 mt-2 leading-relaxed">{content.dressCodeNotes}</p>
                  </div>
                </div>

                {/* Swatches */}
                <div className="space-y-2 pt-4 border-t border-zinc-800">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500">
                    Recommended Neon Swatches
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
                          className="h-10 w-full rounded-lg border border-zinc-700 shadow-md"
                        />
                        <div className="text-[9px] font-mono text-zinc-400 truncate">{swatch.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Kado Digital E-Wallet */}
              <section
                style={cardBgStyle}
                className="rounded-2xl border border-zinc-800 p-6 sm:p-8 space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                    <span className="text-xs uppercase tracking-[0.2em] text-fuchsia-400 font-mono font-bold">
                      06 // Birthday Wish & Gift
                    </span>
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">
                      {content.giftWalletType || "Birthday Gift Fund"}
                    </h4>
                    <p className="text-xs text-zinc-400 mt-2 leading-relaxed">{content.giftNote}</p>
                  </div>
                </div>

                {content.giftAccountNo && (
                  <div className="rounded-xl border border-zinc-800 bg-zinc-950/80 p-4 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-zinc-500 font-mono">
                          Nomor E-Wallet / Rekening
                        </div>
                        <div className="text-base font-mono font-bold text-cyan-400 tracking-wider">
                          {content.giftAccountNo}
                        </div>
                        <div className="text-xs text-zinc-400 font-mono mt-0.5">
                          a.n. {content.giftAccountName}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyAccount}
                        className={cn(
                          "inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono font-bold transition-all",
                          copied
                            ? "bg-emerald-950 border border-emerald-500 text-emerald-300"
                            : "bg-fuchsia-950/80 hover:bg-fuchsia-900 border border-fuchsia-500/50 text-fuchsia-200",
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
                {content.partyTitle} &bull; {content.celebrantName}
              </p>
              <p className="text-[11px] text-zinc-700">
                Lettera Cyberpunk Invitation Engine &copy; 2026. Keep the vibes alive.
              </p>
            </footer>
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* FLOATING SYNTHWAVE AUDIO PLAYER (ISOLATED DARI /templates)   */}
      {/* ============================================================ */}
      {showFloatingAudio && (
        <aside
          aria-label="Pemutar Audio Pesta"
          className="fixed bottom-5 right-5 z-40 animate-in fade-in slide-in-from-bottom-3 duration-500"
        >
          <audio ref={audioRef} src={content.musicUrl} loop preload="none" />
          <button
            type="button"
            onClick={toggleAudio}
            className="group flex items-center gap-3 bg-zinc-950/90 hover:bg-zinc-900 text-zinc-200 border border-fuchsia-500/50 px-4 py-2.5 rounded-full shadow-[0_0_20px_rgba(255,0,127,0.3)] backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 ring-1 ring-cyan-400/40"
          >
            <div className="relative flex items-center justify-center">
              <span
                className={cn(
                  "w-3 h-3 rounded-full bg-cyan-400 transition-opacity",
                  isPlaying ? "animate-ping opacity-75" : "opacity-0",
                )}
              />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-fuchsia-500" />
            </div>
            <span className="text-xs font-mono tracking-wider max-w-[140px] truncate">
              {content.musicTitle || "Synthwave Beat"}
            </span>
            <div className="p-1 rounded-full bg-zinc-800 group-hover:bg-fuchsia-600 transition-colors">
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
            </div>
          </button>
        </aside>
      )}
    </div>
  );
}

export function NeonBashTemplate(props: NeonBashTemplateProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-[400px] flex items-center justify-center bg-zinc-950 text-cyan-400 font-mono text-xs">
          Loading Cyber Odyssey...
        </div>
      }
    >
      <NeonBashTemplateInner {...props} />
    </Suspense>
  );
}
