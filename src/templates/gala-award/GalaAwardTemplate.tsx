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
  Award,
  ChevronRight,
  ShieldAlert,
  HeartHandshake,
  Crown,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { toParagraphs } from "@/lib/utils/format";
import type { LetterContent } from "@/types/letter";
import { withDefaults } from "../utils";

const defaults: Record<string, string> = {
  recipientName: "Yang Terhormat Bapak & Ibu Kolega",
  invitationNo: "INV-GALA-2026-009",
  goldenCrestTitle: "HONORIS CAUSA // EXCELLENCE",
  galaTagline: "The 12th Annual Distinction Awards & Charity Gala",
  galaTitle: "THE GOLDEN PINNACLE GALA 2026",
  hostCommittee: "The Board of Trustees & Foundation Council",
  chairpersonName: "Lord Arthur Vance & Elizabeth Sterling",
  invitationLetter:
    "Merupakan suatu kehormatan agung bagi Dewan Pembina dan Panitia Pelaksana untuk mengundang kehadiran Anda dalam Malam Penganugerahan Penghargaan Tahunan dan Gala Amal Eksklusif.\n\nSebuah malam perayaan yang didedikasikan untuk mengapresiasi dedikasi luar biasa para visioner bangsa, sekaligus menghimpun komitmen filantropi demi masa depan pendidikan generasi penerus.",
  senderName: "Dewan Pembina Yayasan & Komite Acara",
  eventDate: "Sabtu, 19 Desember 2026",
  eventTime: "18.30 – 23.00 WIB",
  targetDateIso: "2026-12-19T18:30:00",
  venueName: "The Grand Ballroom, The Langham Jakarta",
  venueFloor: "Main Tower Grand Ballroom & Crystal Foyer",
  venueAddress: "District 8, SCBD Lot 28, Senayan, Jakarta Selatan",
  mapsUrl: "https://maps.google.com/?q=The+Langham+Jakarta",

  session1Time: "18.30 – 19.30 WIB",
  session1Title: "Red Carpet Arrival & Vintage Champagne Soirée",
  session1Desc: "Penyambutan tamu kehormatan, pemotretan di karpet merah, dan toast pembuka di foyer kristal.",
  session2Time: "19.30 – 20.45 WIB",
  session2Title: "Five-Course Imperial Dinner & Keynote Address",
  session2Desc: "Santap malam megah kurasi Master Chef dilanjutkan pidato kehormatan oleh Dewan Pembina.",
  session3Time: "20.45 – 21.45 WIB",
  session3Title: "The Annual Excellence Awards Conferment",
  session3Desc: "Penganugerahan trofi emas piala penghargaan bagi para inovator dan tokoh filantropi bangsa.",
  session4Time: "21.45 – 23.00 WIB",
  session4Title: "Charity Auction & Symphony Orchestra Waltz",
  session4Desc: "Lelang karya seni filantropi dan malam ramah tamah elegan diiringi alunan simfoni klasik.",

  photo1Title: "The Golden Pinnacle Trophy",
  photo1Caption: "Simbol keagungan dedikasi tanpa henti bagi kemajuan peradaban dan kemanusiaan.",
  photo1Url: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",

  photo2Title: "The Crystal Grand Ballroom",
  photo2Caption: "Kemegahan lampu gantung kristal yang siap menyambut kehadiran para tokoh terkemuka.",
  photo2Url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",

  photo3Title: "A Prestigious Gathering",
  photo3Caption: "Momen perayaan kebersamaan para pemimpin visioner dan sahabat filantropi tanah air.",
  photo3Url: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=80",

  dressCodeTitle: "Strictly Black Tie & Golden Glamour",
  dressCodeNotes: "Tuxedo hitam dasi kupu-kupu bagi pria dan gaun malam panjang (formal evening gown) bagi wanita.",
  paletteColor1: "#d4af37",
  paletteName1: "24K Champagne",
  paletteColor2: "#0a0a0c",
  paletteName2: "Midnight Obsidian",
  paletteColor3: "#581c25",
  paletteName3: "Imperial Burgundy",
  paletteColor4: "#fbfbf7",
  paletteName4: "Starlight Pearl",

  charityBankName: "BCA / The Langham Philanthropy Fund",
  charityAccountNo: "8820192837",
  charityAccountName: "Yayasan Peduli Nusantara Mandiri",
  charityNote: "Seluruh donasi dialokasikan untuk beasiswa pendidikan dan program sanitasi desa terpencil.",

  backgroundColor: "#0a0a0e",
  cardColor: "#14141c",
  textColor: "#fdfcf7",
  musicUrl: "https://cdn.pixabay.com/download/audio/2022/11/06/audio_c3c3167123.mp3?filename=a-thousand-years-cello-and-piano-orchestra-124991.mp3",
  musicTitle: "Grand Imperial Waltz Symphony",
};

interface GalaAwardTemplateProps {
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

function GalaAwardTemplateInner({ data, className }: GalaAwardTemplateProps) {
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

  // Salin nomor rekening donasi
  const handleCopyAccount = () => {
    if (!content.charityAccountNo) return;
    navigator.clipboard.writeText(content.charityAccountNo);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const showFloatingAudio = !isThumbnail && pathname !== "/templates" && Boolean(content.musicUrl);

  const bgStyle = {
    backgroundColor: content.backgroundColor || "#0a0a0e",
    color: content.textColor || "#fdfcf7",
  };

  const cardBgStyle = {
    backgroundColor: content.cardColor || "#14141c",
  };

  return (
    <div
      style={bgStyle}
      className={cn(
        "relative min-h-screen w-full font-serif antialiased selection:bg-amber-500/40 selection:text-white",
        isThumbnail ? "overflow-hidden text-[11px] p-4" : "p-4 sm:p-6 md:p-12",
        className,
      )}
    >
      {/* Background Subtle Gold Dust & Velvet Texture */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent opacity-80" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#d4af3708_1px,transparent_1px),linear-gradient(to_bottom,#d4af3708_1px,transparent_1px)] bg-[size:5rem_5rem]" />

      <div className="relative mx-auto max-w-3xl space-y-10 sm:space-y-14">
        {/* ============================================================ */}
        {/* HERO SECTION: BLACK VELVET & GOLDEN CREST SEAL CARD         */}
        {/* ============================================================ */}
        <section
          style={cardBgStyle}
          className="relative overflow-hidden rounded-2xl border-2 border-amber-500/40 shadow-[0_15px_50px_-10px_rgba(212,175,55,0.25)] backdrop-blur-md p-6 sm:p-10 space-y-8"
        >
          {/* Art Deco Geometric Corner Ornaments */}
          <div className="pointer-events-none absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-400/60" />
          <div className="pointer-events-none absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-400/60" />
          <div className="pointer-events-none absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-400/60" />
          <div className="pointer-events-none absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-400/60" />

          {/* Top Invitation Tagline */}
          <div className="border-b border-amber-500/20 pb-4 flex flex-wrap items-center justify-between gap-2 text-xs tracking-[0.25em] uppercase font-sans text-amber-300/80">
            <div className="flex items-center gap-2">
              <Crown className="w-4 h-4 text-amber-400" />
              <span>{content.galaTagline || "Annual Distinction Awards"}</span>
            </div>
            <span className="text-amber-500/60 font-mono text-[11px]">{content.invitationNo || "INV-GALA-001"}</span>
          </div>

          {/* Card Body */}
          <div className="space-y-6 text-center pt-2">
            {/* Golden Crest Seal */}
            <div className="inline-flex flex-col items-center justify-center">
              <div className="relative w-20 h-20 rounded-full border-2 border-amber-400 bg-gradient-to-br from-amber-300 via-amber-600 to-amber-900 flex items-center justify-center shadow-[0_0_25px_rgba(212,175,55,0.4)] ring-4 ring-amber-500/20">
                <Award className="w-10 h-10 text-zinc-950 drop-shadow-sm" />
              </div>
              <div className="mt-3 text-[10px] tracking-[0.3em] uppercase text-amber-300/90 font-sans font-semibold">
                {content.goldenCrestTitle || "EXCELLENCE // DISTINCTION"}
              </div>
            </div>

            <div className="space-y-2 max-w-xl mx-auto">
              <p className="text-xs uppercase tracking-[0.3em] text-amber-400/80 font-sans">
                The Board of Trustees Cordially Invites
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight text-white uppercase font-light leading-tight">
                {content.galaTitle}
              </h1>
              <p className="text-sm sm:text-base text-zinc-400 font-sans">
                Under the Esteemed Patronage of <span className="text-amber-200 font-medium">{content.chairpersonName}</span>
              </p>
            </div>

            {/* Guest Welcome Banner */}
            <div className="rounded-xl border border-amber-500/30 bg-zinc-950/70 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-widest text-amber-400/70 font-sans">
                  Tamu Kehormatan / Honored Guest
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
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-zinc-950 text-xs font-sans font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:scale-105 active:scale-95"
                >
                  <span>Buka Undangan Gala</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Date & Location Specs */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 text-xs text-zinc-400 font-sans border-t border-amber-500/20">
              <div className="flex items-center gap-3 mx-auto sm:mx-0">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>{content.eventDate}</span>
                <span className="text-zinc-600">|</span>
                <Clock className="w-4 h-4 text-amber-400" />
                <span>{content.eventTime}</span>
              </div>
              <div className="text-amber-400/70 text-xs font-sans tracking-wider mx-auto sm:mx-0">
                {content.venueName}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================ */}
        {/* INTERACTIVE CONTENT (REVEALED WHEN OPENED OR THUMBNAIL)      */}
        {/* ============================================================ */}
        {(isOpen || isThumbnail) && (
          <div className="space-y-12 sm:space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* 1. SAMBUTAN RESMI DEWAN PEMBINA */}
            <section
              style={cardBgStyle}
              className="rounded-2xl border border-amber-500/30 p-6 sm:p-10 space-y-6 relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-4">
                <span className="text-xs uppercase tracking-[0.25em] text-amber-400 font-sans font-semibold">
                  01 // Formal Address
                </span>
                <span className="text-xs text-zinc-400 font-sans">
                  {content.hostCommittee}
                </span>
              </div>

              <div className="prose prose-invert max-w-none text-zinc-300 font-serif leading-relaxed text-base sm:text-lg space-y-4">
                {toParagraphs(content.invitationLetter).map((paragraph, idx) => (
                  <p key={idx} className="first-letter:text-4xl first-letter:font-serif first-letter:text-amber-400 first-letter:float-left first-letter:mr-2">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="border-t border-amber-500/20 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-sans text-zinc-400">
                <div>
                  Hormat kami, <span className="text-amber-300 font-medium">{content.senderName}</span>
                </div>
                <div className="text-zinc-500">
                  {content.venueFloor}
                </div>
              </div>
            </section>

            {/* 2. LIVE GOLDEN COUNTDOWN TIMER */}
            {content.targetDateIso && (
              <section
                style={cardBgStyle}
                className="rounded-2xl border-2 border-amber-500/40 p-6 sm:p-8 space-y-6 text-center shadow-[0_0_35px_-10px_rgba(212,175,55,0.2)]"
              >
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-[0.25em] text-amber-400 font-sans font-semibold">
                    Countdown to the Grand Soirée
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif text-white uppercase font-light">
                    Hitung Mundur Menuju Malam Gala
                  </h3>
                </div>

                {countdown.isExpired ? (
                  <div className="inline-block rounded-lg bg-amber-950/60 border border-amber-600 px-6 py-3 text-amber-200 font-sans text-sm">
                    Malam penganugerahan telah resmi berlangsung. Selamat menikmati resepsi agung.
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
                        className="rounded-xl border border-amber-500/30 bg-zinc-950/80 p-3 sm:p-4 text-center shadow-inner"
                      >
                        <div
                          suppressHydrationWarning
                          className="text-2xl sm:text-4xl font-serif font-bold text-amber-300 tracking-tight"
                        >
                          {String(item.value).padStart(2, "0")}
                        </div>
                        <div className="text-[10px] sm:text-xs uppercase tracking-wider text-zinc-400 mt-1 font-sans">
                          {item.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* 3. GALERI 3 FOTO RED CARPET & BALLROOM */}
            <section className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-amber-500/20 pb-4">
                <div>
                  <span className="text-xs uppercase tracking-[0.25em] text-amber-400 font-sans font-semibold">
                    02 // Gala Highlights
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif text-white font-light mt-1">
                    Kemegahan Malam Penganugerahan
                  </h3>
                </div>
                <span className="text-xs text-amber-400/80 font-sans">3 Prestigious Frames</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    url: content.photo1Url,
                    title: content.photo1Title,
                    caption: content.photo1Caption,
                    badge: "PINNACLE #01",
                  },
                  {
                    url: content.photo2Url,
                    title: content.photo2Title,
                    caption: content.photo2Caption,
                    badge: "PINNACLE #02",
                  },
                  {
                    url: content.photo3Url,
                    title: content.photo3Title,
                    caption: content.photo3Caption,
                    badge: "PINNACLE #03",
                  },
                ].map((p, idx) => (
                  <div
                    key={idx}
                    style={cardBgStyle}
                    className="group rounded-xl border border-amber-500/30 overflow-hidden flex flex-col transition-all duration-300 hover:border-amber-400 hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]"
                  >
                    <div className="relative aspect-4/5 overflow-hidden bg-zinc-950">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.url}
                        alt={p.title || "Gala Photo"}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 bg-zinc-950/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-sans text-amber-300 border border-amber-500/40">
                        {p.badge}
                      </div>
                    </div>
                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <h4 className="text-base font-serif text-white font-medium group-hover:text-amber-300 transition-colors">
                          {p.title}
                        </h4>
                        <p className="text-xs text-zinc-400 font-sans leading-relaxed mt-2 border-t border-amber-500/20 pt-2">
                          {p.caption}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. RUNDOWN 4 SESI ACARA GALA */}
            <section
              style={cardBgStyle}
              className="rounded-2xl border border-amber-500/30 p-6 sm:p-10 space-y-8"
            >
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-4">
                <div>
                  <span className="text-xs uppercase tracking-[0.25em] text-amber-400 font-sans font-semibold">
                    03 // Order of Proceedings
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif text-white font-light mt-1">
                    Susunan Acara Malam Gala
                  </h3>
                </div>
                <Clock className="w-5 h-5 text-amber-400" />
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
                    className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-start border-b border-amber-500/20 pb-5 last:border-b-0 last:pb-0"
                  >
                    <div className="sm:col-span-3 text-xs font-sans text-amber-400 font-bold tracking-wider">
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
              className="rounded-2xl border border-amber-500/30 p-6 sm:p-10 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-4">
                <div>
                  <span className="text-xs uppercase tracking-[0.25em] text-amber-400 font-sans font-semibold">
                    04 // Grand Ballroom Venue
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif text-white font-light mt-1">
                    Lokasi & Peta Navigasi
                  </h3>
                </div>
                <MapPin className="w-5 h-5 text-amber-400" />
              </div>

              <div className="space-y-3">
                <div className="text-xl font-serif text-white font-medium">{content.venueName}</div>
                <div className="text-xs font-sans text-amber-300/80">{content.venueFloor}</div>
                <p className="text-sm text-zinc-400 leading-relaxed font-sans">{content.venueAddress}</p>
              </div>

              {content.mapsUrl && (
                <div className="pt-2">
                  <a
                    href={content.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-amber-600 to-amber-800 hover:from-amber-500 hover:to-amber-700 text-white text-xs font-sans tracking-widest uppercase transition-all duration-300 border border-amber-400/40 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                  >
                    <ExternalLink className="w-4 h-4 text-amber-200" />
                    <span>Petunjuk Rute (Google Maps)</span>
                  </a>
                </div>
              )}
            </section>

            {/* 6. DRESS CODE & DONASI YAYASAN AMAL */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* Dress Code Section */}
              <section
                style={cardBgStyle}
                className="rounded-2xl border border-amber-500/30 p-6 sm:p-8 space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
                    <span className="text-xs uppercase tracking-[0.25em] text-amber-400 font-sans font-semibold">
                      05 // Dress Code
                    </span>
                    <ShieldAlert className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-serif text-white font-medium">{content.dressCodeTitle}</h4>
                    <p className="text-xs text-zinc-400 mt-2 leading-relaxed font-sans">{content.dressCodeNotes}</p>
                  </div>
                </div>

                {/* Swatches */}
                <div className="space-y-2 pt-4 border-t border-amber-500/20">
                  <span className="text-[10px] uppercase font-sans tracking-widest text-zinc-500">
                    Recommended Attire Palette
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
                          className="h-10 w-full rounded-md border border-amber-500/40 shadow-sm"
                        />
                        <div className="text-[9px] font-sans text-zinc-400 truncate">{swatch.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Donasi Filantropi */}
              <section
                style={cardBgStyle}
                className="rounded-2xl border border-amber-500/30 p-6 sm:p-8 space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
                    <span className="text-xs uppercase tracking-[0.25em] text-amber-400 font-sans font-semibold">
                      06 // Philanthropy Pledge
                    </span>
                    <HeartHandshake className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-serif text-white font-medium">
                      {content.charityBankName || "Philanthropy Fund"}
                    </h4>
                    <p className="text-xs text-zinc-400 mt-2 leading-relaxed font-sans">{content.charityNote}</p>
                  </div>
                </div>

                {content.charityAccountNo && (
                  <div className="rounded-xl border border-amber-500/30 bg-zinc-950/80 p-4 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-amber-400/80 font-sans">
                          Nomor Rekening Donasi
                        </div>
                        <div className="text-base font-mono font-bold text-white tracking-wider">
                          {content.charityAccountNo}
                        </div>
                        <div className="text-xs text-zinc-400 font-sans mt-0.5">
                          a.n. {content.charityAccountName}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyAccount}
                        className={cn(
                          "inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-sans font-bold transition-all",
                          copied
                            ? "bg-emerald-950 border border-emerald-600 text-emerald-300"
                            : "bg-amber-950/80 hover:bg-amber-900 border border-amber-500/50 text-amber-200",
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
            <footer className="text-center py-8 space-y-3 border-t border-amber-500/20 font-sans text-xs text-zinc-500">
              <p className="tracking-widest uppercase">
                {content.galaTitle} &bull; {content.hostCommittee}
              </p>
              <p className="text-[11px] text-zinc-600">
                Lettera Prestige Invitation Engine &copy; 2026. All Rights Reserved.
              </p>
            </footer>
          </div>
        )}
      </div>

      {/* ============================================================ */}
      {/* FLOATING ORCHESTRA AUDIO PLAYER (ISOLATED DARI /templates)   */}
      {/* ============================================================ */}
      {showFloatingAudio && (
        <aside
          aria-label="Pemutar Audio Gala"
          className="fixed bottom-5 right-5 z-40 animate-in fade-in slide-in-from-bottom-3 duration-500"
        >
          <audio ref={audioRef} src={content.musicUrl} loop preload="none" />
          <button
            type="button"
            onClick={toggleAudio}
            className="group flex items-center gap-3 bg-zinc-950/90 hover:bg-zinc-900 text-amber-200 border border-amber-500/40 px-4 py-2.5 rounded-full shadow-[0_0_25px_rgba(212,175,55,0.3)] backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 ring-1 ring-amber-400/40"
          >
            <div className="relative flex items-center justify-center">
              <span
                className={cn(
                  "w-3 h-3 rounded-full bg-amber-400 transition-opacity",
                  isPlaying ? "animate-ping opacity-75" : "opacity-0",
                )}
              />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
            </div>
            <span className="text-xs font-sans tracking-wider max-w-[140px] truncate">
              {content.musicTitle || "Orchestral Symphony"}
            </span>
            <div className="p-1 rounded-full bg-zinc-800 group-hover:bg-amber-500 group-hover:text-zinc-950 transition-colors">
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
            </div>
          </button>
        </aside>
      )}
    </div>
  );
}

export function GalaAwardTemplate(props: GalaAwardTemplateProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-[400px] flex items-center justify-center bg-zinc-950 text-amber-400 font-serif text-sm">
          Loading Grand Gala Invitation...
        </div>
      }
    >
      <GalaAwardTemplateInner {...props} />
    </Suspense>
  );
}
