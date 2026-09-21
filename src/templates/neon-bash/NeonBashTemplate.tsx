"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import {
  Check,
  Copy,
  ExternalLink,
  Sparkles,
  Play,
  ChevronRight,
  Zap,
  Disc,
  Flame,
  Radio,
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
        isThumbnail ? "overflow-hidden text-[11px] p-3" : "p-4 sm:p-8 md:p-14",
        className,
      )}
    >
      {/* Cyber Neon Background Aura & Glow Grids */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,#ff007f18,transparent_50%),radial-gradient(ellipse_at_bottom,#00f2fe18,transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#00f2fe08_1px,transparent_1px),linear-gradient(to_bottom,#ff007f08_1px,transparent_1px)] bg-[size:3rem_3rem]" />

      {/* Floating Audio Beats Button */}
      {showFloatingAudio && (
        <>
          <audio ref={audioRef} src={content.musicUrl} loop preload="none" />
          <button
            type="button"
            onClick={toggleAudio}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-cyan-400 bg-zinc-950/90 px-4 py-2.5 text-xs text-cyan-300 backdrop-blur-md shadow-[0_0_20px_rgba(0,242,254,0.4)] hover:scale-105 transition-all duration-200"
            aria-label={isPlaying ? "Mute synthwave" : "Play synthwave beat"}
          >
            {isPlaying ? (
              <>
                <Disc className="w-4 h-4 text-fuchsia-400 animate-spin" />
                <span className="font-mono text-[11px] font-bold tracking-wider uppercase">Beats: ON</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 text-cyan-400" />
                <span className="font-mono text-[11px] font-bold tracking-wider uppercase">Drop Beat</span>
              </>
            )}
          </button>
        </>
      )}

      <div className="relative mx-auto max-w-4xl space-y-12">
        {/* ============================================================ */}
        {/* 1. HERO SECTION: VIP FESTIVAL LANYARD & HOLOGRAPHIC PASS    */}
        {/* ============================================================ */}
        <section className="relative mx-auto max-w-xl">
          {/* Lanyard Fabric Strap Visual Hanging Down */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-10 bg-gradient-to-b from-fuchsia-600 to-cyan-500 rounded-t-sm shadow-md flex items-center justify-center">
              <div className="w-4 h-6 border-x-2 border-zinc-900/40" />
            </div>
            <div className="w-20 h-4 bg-zinc-800 rounded-md border border-zinc-700 shadow-inner flex items-center justify-center">
              <div className="w-8 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f2fe]" />
            </div>
          </div>

          {/* Holographic Lanyard Badge Card */}
          <div
            style={cardBgStyle}
            className="relative overflow-hidden rounded-3xl border-2 border-fuchsia-500/60 shadow-[0_0_60px_-10px_rgba(255,0,127,0.4)] backdrop-blur-md p-6 sm:p-10 space-y-6 -mt-1"
          >
            {/* Top Pass Status */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4 font-mono text-xs">
              <div className="inline-flex items-center gap-2 rounded-full bg-fuchsia-950/60 border border-fuchsia-500/50 px-3 py-1 text-fuchsia-300 font-bold tracking-widest text-[10px] uppercase shadow-[0_0_10px_rgba(255,0,127,0.3)]">
                <Zap className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>{content.vipBadge}</span>
              </div>
              <span className="text-cyan-400 font-bold tracking-widest text-[11px]">{content.ticketCode}</span>
            </div>

            {/* Title & Celebrant Heading */}
            <div className="text-center space-y-2">
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-400 font-semibold block">
                {content.partySub}
              </span>
              <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white italic drop-shadow-[0_0_25px_rgba(0,242,254,0.4)]">
                {content.partyTitle}
              </h1>
              <p className="font-mono text-sm text-fuchsia-400 font-bold">
                Starring <span className="text-white underline decoration-cyan-400 decoration-2">{content.celebrantName}</span>
              </p>
            </div>

            {/* VIP Guest Pass Barcode Stub */}
            <div className="rounded-2xl border border-dashed border-cyan-500/40 bg-zinc-950/80 p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-center sm:text-left">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-500">
                    VIP Guestlist Attendee
                  </span>
                  <p className="text-lg font-bold text-cyan-300 flex items-center justify-center sm:justify-start gap-2">
                    <Sparkles className="w-4 h-4 text-fuchsia-400" />
                    <span>{displayedRecipient}</span>
                  </p>
                </div>
                <div className="font-mono text-[10px] text-zinc-400 sm:text-right">
                  <p className="text-fuchsia-400 font-bold">ACCESS: ALL AREAS</p>
                  <p>{content.eventDate}</p>
                </div>
              </div>

              {!isOpen && !isThumbnail && (
                <button
                  type="button"
                  onClick={() => setIsOpen(true)}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-fuchsia-600 via-pink-600 to-cyan-500 text-white font-mono font-bold text-xs uppercase tracking-widest shadow-[0_0_25px_rgba(255,0,127,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <Flame className="w-4 h-4 text-amber-300" />
                  <span>Tap to Activate VIP Wristband</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Barcode Strip */}
            <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between font-mono text-[10px] text-zinc-500">
              <span className="tracking-widest">||| |||| || | ||||| |||</span>
              <span className="uppercase text-cyan-400 font-semibold">{content.eventTime}</span>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 2. NEON LED STAGE DIGITAL COUNTDOWN TIMER                     */}
        {/* ============================================================ */}
        <section className="rounded-2xl border-2 border-cyan-500/30 bg-zinc-950/90 p-6 shadow-[0_0_30px_-5px_rgba(0,242,254,0.2)] text-center space-y-4">
          <div className="flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold">
            <Radio className="w-4 h-4 text-fuchsia-400 animate-pulse" />
            <span>Festival Stage Countdown Clock</span>
          </div>

          <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-lg mx-auto">
            {[
              { val: countdown.days, label: "DAYS" },
              { val: countdown.hours, label: "HOURS" },
              { val: countdown.minutes, label: "MINS" },
              { val: countdown.seconds, label: "SECS" },
            ].map((unit, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-fuchsia-500/30 bg-zinc-900/80 p-3 sm:p-4 shadow-[inset_0_0_15px_rgba(255,0,127,0.15)] flex flex-col items-center justify-center"
              >
                <span className="font-mono text-2xl sm:text-4xl font-black text-white drop-shadow-[0_0_12px_#00f2fe]">
                  {String(unit.val).padStart(2, "0")}
                </span>
                <span className="font-mono text-[9px] sm:text-[10px] uppercase font-bold text-fuchsia-400 tracking-wider mt-1">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================ */}
        {/* INTERACTIVE CONTENT (REVEALED WHEN OPENED OR THUMBNAIL)      */}
        {/* ============================================================ */}
        {(isOpen || isThumbnail) && (
          <div className="space-y-16 animate-in fade-in duration-700">
            {/* 3. BIRTHDAY MESSAGE CALLOUT */}
            <section
              style={cardBgStyle}
              className="rounded-3xl border border-zinc-800 p-6 sm:p-10 space-y-6 relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-fuchsia-600/10 rounded-full blur-2xl" />
              <div className="space-y-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-400 font-semibold block">
                  A Message From The Celebrant
                </span>
                <h3 className="text-2xl sm:text-3xl font-black uppercase text-white italic">
                  Let’s Light Up The Night!
                </h3>
              </div>

              <div className="space-y-4 font-sans text-base text-zinc-300 leading-relaxed max-w-2xl">
                {toParagraphs(content.partyMessage).map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              <div className="pt-4 border-t border-zinc-800 flex items-center justify-between font-mono text-xs text-zinc-400">
                <span>With Love, <strong className="text-fuchsia-400">{content.senderName}</strong></span>
                <span className="text-cyan-400">#NatashaSweet17</span>
              </div>
            </section>

            {/* 4. FESTIVAL STAGE LINEUP & SET TIMES TIMETABLE */}
            <section className="space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="space-y-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-fuchsia-400 font-bold block">
                    Festival Run of Show
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black uppercase text-white italic">
                    Stage Schedule & Set Times
                  </h3>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 font-mono text-xs text-cyan-400">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                  <span>LIVE ROOFTOP STAGE</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { time: content.session1Time, title: content.session1Title, desc: content.session1Desc, stage: "STAGE 01 // WELCOME FOYER", color: "border-cyan-500/40 text-cyan-300" },
                  { time: content.session2Time, title: content.session2Title, desc: content.session2Desc, stage: "STAGE 02 // BEATS & BITES", color: "border-fuchsia-500/40 text-fuchsia-300" },
                  { time: content.session3Time, title: content.session3Title, desc: content.session3Desc, stage: "STAGE 03 // MAIN HIGHLIGHT", color: "border-amber-400/40 text-amber-300" },
                  { time: content.session4Time, title: content.session4Title, desc: content.session4Desc, stage: "STAGE 04 // MIDNIGHT RAVE", color: "border-pink-500/40 text-pink-300" },
                ].map((set, idx) => (
                  <div
                    key={idx}
                    style={cardBgStyle}
                    className={cn(
                      "rounded-2xl border p-5 space-y-2 shadow-lg hover:border-cyan-400 transition-colors",
                      set.color.split(" ")[0],
                    )}
                  >
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="font-bold text-white bg-zinc-950 px-2.5 py-1 rounded border border-zinc-800">
                        {set.time}
                      </span>
                      <span className={cn("text-[10px] tracking-wider uppercase font-semibold", set.color.split(" ")[1])}>
                        {set.stage}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-white pt-1">{set.title}</h4>
                    <p className="font-sans text-xs text-zinc-400 leading-relaxed">{set.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. POLAROID PARTY MEMORY REEL (DIAGONAL ANGLED STRIP) */}
            {(content.photo1Url || content.photo2Url || content.photo3Url) && (
              <section className="space-y-6">
                <div className="space-y-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-400 font-bold block">
                    Party Visual Reel
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black uppercase text-white italic">
                    Memories & Vibes
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {content.photo1Url && (
                    <div className="group rounded-2xl bg-zinc-900 border-2 border-cyan-500/40 p-3 shadow-[0_0_20px_rgba(0,242,254,0.2)] hover:-translate-y-2 transition-transform duration-300">
                      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-zinc-950">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={content.photo1Url}
                          alt={content.photo1Title || "Photo 1"}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-2 text-center space-y-0.5">
                        <p className="font-mono text-xs font-bold text-cyan-300">{content.photo1Title}</p>
                        <p className="font-sans text-[11px] text-zinc-400 italic">&ldquo;{content.photo1Caption}&rdquo;</p>
                      </div>
                    </div>
                  )}

                  {content.photo2Url && (
                    <div className="group rounded-2xl bg-zinc-900 border-2 border-fuchsia-500/40 p-3 shadow-[0_0_20px_rgba(255,0,127,0.2)] hover:-translate-y-2 transition-transform duration-300">
                      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-zinc-950">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={content.photo2Url}
                          alt={content.photo2Title || "Photo 2"}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-2 text-center space-y-0.5">
                        <p className="font-mono text-xs font-bold text-fuchsia-300">{content.photo2Title}</p>
                        <p className="font-sans text-[11px] text-zinc-400 italic">&ldquo;{content.photo2Caption}&rdquo;</p>
                      </div>
                    </div>
                  )}

                  {content.photo3Url && (
                    <div className="group rounded-2xl bg-zinc-900 border-2 border-emerald-400/40 p-3 shadow-[0_0_20px_rgba(57,255,20,0.2)] hover:-translate-y-2 transition-transform duration-300">
                      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-zinc-950">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={content.photo3Url}
                          alt={content.photo3Title || "Photo 3"}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-2 text-center space-y-0.5">
                        <p className="font-mono text-xs font-bold text-emerald-300">{content.photo3Title}</p>
                        <p className="font-sans text-[11px] text-zinc-400 italic">&ldquo;{content.photo3Caption}&rdquo;</p>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* 6. DRESS CODE & VIP PERKS + ROOFTOP LOCATION & GIFT WALLET */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Dress Code & Neon Palette */}
              <div
                style={cardBgStyle}
                className="rounded-3xl border border-zinc-800 p-6 sm:p-8 space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-fuchsia-400 font-bold block">
                    Dress Code Protocol
                  </span>
                  <h4 className="text-xl font-bold text-white">
                    {content.dressCodeTitle}
                  </h4>
                  <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                    {content.dressCodeNotes}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 font-mono text-[10px]">
                  <div className="flex items-center gap-2 bg-zinc-950 p-2.5 rounded-lg border border-zinc-800">
                    <span className="h-4 w-4 rounded-full bg-[#00f2fe] shadow-[0_0_8px_#00f2fe]" />
                    <span className="text-zinc-300">Cyan Glow</span>
                  </div>
                  <div className="flex items-center gap-2 bg-zinc-950 p-2.5 rounded-lg border border-zinc-800">
                    <span className="h-4 w-4 rounded-full bg-[#ff007f] shadow-[0_0_8px_#ff007f]" />
                    <span className="text-zinc-300">Hot Magenta</span>
                  </div>
                  <div className="flex items-center gap-2 bg-zinc-950 p-2.5 rounded-lg border border-zinc-800">
                    <span className="h-4 w-4 rounded-full bg-[#39ff14] shadow-[0_0_8px_#39ff14]" />
                    <span className="text-zinc-300">Laser Lime</span>
                  </div>
                  <div className="flex items-center gap-2 bg-zinc-950 p-2.5 rounded-lg border border-zinc-800">
                    <span className="h-4 w-4 rounded-full bg-[#12121e] border border-zinc-700" />
                    <span className="text-zinc-300">Pitch Noir</span>
                  </div>
                </div>
              </div>

              {/* Venue & Maps */}
              <div
                style={cardBgStyle}
                className="rounded-3xl border border-zinc-800 p-6 sm:p-8 space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-400 font-bold block">
                    Venue Radar Coordinates
                  </span>
                  <h4 className="text-xl font-bold text-white">
                    {content.venueName}
                  </h4>
                  <p className="font-mono text-xs text-fuchsia-400 font-bold">
                    {content.venueFloor}
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
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-mono text-xs uppercase font-bold tracking-wider shadow-[0_0_20px_rgba(0,242,254,0.3)] hover:scale-105 transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open Radar Maps</span>
                  </a>
                )}
              </div>
            </section>

            {/* 7. VIP GIFT WALLET CARD */}
            {content.giftAccountNo && (
              <section
                style={cardBgStyle}
                className="rounded-3xl border border-cyan-500/30 p-6 sm:p-8 text-center space-y-4 max-w-xl mx-auto shadow-[0_0_30px_rgba(0,242,254,0.15)]"
              >
                <div className="space-y-1">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-fuchsia-400 font-bold">
                    Birthday Token of Love
                  </span>
                  <h4 className="text-xl font-bold text-white">
                    {content.giftWalletType} Digital Gift
                  </h4>
                  <p className="font-sans text-xs text-zinc-400">{content.giftNote}</p>
                </div>

                <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 font-mono space-y-1">
                  <p className="text-lg font-bold text-cyan-300 tracking-widest">{content.giftAccountNo}</p>
                  <p className="text-xs text-zinc-400">a.n. {content.giftAccountName}</p>
                </div>

                <button
                  type="button"
                  onClick={handleCopyAccount}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-mono text-xs uppercase tracking-wider transition-all"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Nomor Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Nomor E-Wallet</span>
                    </>
                  )}
                </button>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function NeonBashTemplate({
  data,
  className,
}: NeonBashTemplateProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#090910]" />}>
      <NeonBashTemplateInner data={data} className={className} />
    </Suspense>
  );
}
