"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import {
  Calendar,
  Clock,
  Check,
  Copy,
  ExternalLink,
  Sparkles,
  Pause,
  Play,
  Award,
  ChevronRight,
  ShieldCheck,
  Crown,
  Scroll,
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
  musicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
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
        isThumbnail ? "overflow-hidden text-[11px] p-3" : "p-4 sm:p-8 md:p-14",
        className,
      )}
    >
      {/* Background Obsidian Stardust & Filigree Lights */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,#d4af3715,transparent_60%),radial-gradient(circle_at_bottom,#581c2518,transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#d4af370a_1px,transparent_1px),linear-gradient(to_bottom,#d4af370a_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Floating Audio Player */}
      {showFloatingAudio && (
        <>
          <audio ref={audioRef} src={content.musicUrl} loop preload="none" />
          <button
            type="button"
            onClick={toggleAudio}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-amber-500/60 bg-[#0a0a0e]/95 px-4 py-2.5 text-xs text-amber-200 backdrop-blur-md shadow-[0_4px_25px_rgba(212,175,55,0.3)] hover:scale-105 transition-all duration-200"
            aria-label={isPlaying ? "Jeda orkestra" : "Putar orkestra waltz"}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span className="font-sans text-[11px] font-semibold tracking-wider uppercase">Orchestra: On</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-sans text-[11px] font-semibold tracking-wider uppercase">Play Orchestra</span>
              </>
            )}
          </button>
        </>
      )}

      <div className="relative mx-auto max-w-4xl space-y-12">
        {/* ============================================================ */}
        {/* 1. HERO SECTION: OBSIDIAN & LIQUID GOLD IMPERIAL FOLIO       */}
        {/* ============================================================ */}
        <section
          style={cardBgStyle}
          className="relative overflow-hidden rounded-3xl border-2 border-amber-500/50 shadow-[0_20px_60px_-15px_rgba(212,175,55,0.3)] backdrop-blur-md p-6 sm:p-12 space-y-8"
        >
          {/* 24K Gold Corner Accents */}
          <div className="pointer-events-none absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-amber-400" />
          <div className="pointer-events-none absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-amber-400" />
          <div className="pointer-events-none absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-amber-400" />
          <div className="pointer-events-none absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-amber-400" />

          {/* Crest & Latin Honor Header */}
          <div className="flex flex-col items-center text-center space-y-3 pt-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-950/40 px-4 py-1.5 text-[10px] font-sans tracking-[0.3em] uppercase text-amber-300 shadow-inner">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>{content.goldenCrestTitle || "HONORIS CAUSA // EXCELLENCE"}</span>
            </div>

            <p className="font-sans text-xs tracking-[0.25em] text-amber-400/80 uppercase font-medium">
              {content.galaTagline}
            </p>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extralight tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-400 uppercase leading-tight pt-1">
              {content.galaTitle}
            </h1>

            <p className="font-sans text-xs text-stone-400">
              Diselenggarakan oleh <span className="text-amber-200 font-semibold">{content.hostCommittee}</span>
            </p>
          </div>

          {/* Guest Dignitary Admission Parchment */}
          <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-b from-[#181824] to-[#0e0e14] p-6 text-center space-y-4 max-w-xl mx-auto shadow-inner">
            <div className="space-y-1">
              <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-amber-500/70 font-semibold">
                Undangan Kehormatan Diberikan Kepada:
              </span>
              <h3 className="text-2xl sm:text-3xl font-normal text-amber-100 italic">
                {displayedRecipient}
              </h3>
              <p className="font-sans text-xs text-stone-400">
                Atas dedikasi, kontribusi, dan komitmen kemanusiaan yang luhur
              </p>
            </div>

            {!isOpen && !isThumbnail ? (
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-600 text-stone-950 font-sans font-bold text-xs uppercase tracking-widest shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-105 active:scale-95 transition-all"
              >
                <Award className="w-4 h-4" />
                <span>Buka Lembaran Titah Gala</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="inline-flex items-center gap-1.5 text-xs font-sans text-amber-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Protokol Gala Telah Diaktifkan</span>
              </div>
            )}
          </div>

          {/* Footer Metadata */}
          <div className="border-t border-amber-500/20 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 font-sans text-xs text-stone-400">
            <div className="flex items-center gap-3 text-amber-300/80">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>{content.eventDate}</span>
              <span className="text-amber-500/40">•</span>
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{content.eventTime}</span>
            </div>
            <span className="font-mono text-[11px] text-amber-500/60">{content.invitationNo}</span>
          </div>
        </section>

        {/* ============================================================ */}
        {/* 2. LUXURY GOLDEN CHRONOMETER COUNTDOWN DIALS                 */}
        {/* ============================================================ */}
        <section className="rounded-3xl border border-amber-500/30 bg-[#0e0e14] p-8 text-center space-y-6 shadow-lg">
          <div className="space-y-1">
            <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-amber-400 font-semibold">
              Chronometer Kehormatan
            </span>
            <h3 className="text-2xl sm:text-3xl font-light text-amber-100 italic">
              Menghitung Waktu Menuju Malam Penganugerahan
            </h3>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-2">
            {[
              { val: countdown.days, label: "Hari", latin: "DIES" },
              { val: countdown.hours, label: "Jam", latin: "HORAE" },
              { val: countdown.minutes, label: "Menit", latin: "MINUTA" },
              { val: countdown.seconds, label: "Detik", latin: "SECUNDA" },
            ].map((unit, idx) => (
              <div
                key={idx}
                className="relative flex h-24 w-24 sm:h-28 sm:w-28 flex-col items-center justify-center rounded-full border-2 border-amber-500/50 bg-gradient-to-b from-[#181822] to-[#0c0c12] shadow-[0_0_20px_rgba(212,175,55,0.15)]"
              >
                <div className="absolute inset-1 rounded-full border border-amber-400/20" />
                <span className="text-2xl sm:text-3xl font-light text-amber-200">
                  {String(unit.val).padStart(2, "0")}
                </span>
                <span className="font-sans text-[9px] uppercase tracking-wider text-amber-400/80 font-bold">
                  {unit.label}
                </span>
                <span className="font-mono text-[7px] tracking-widest text-stone-500">
                  {unit.latin}
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
            {/* 3. EXECUTIVE INVITATION LETTERHEAD & DECREE */}
            <section
              style={cardBgStyle}
              className="rounded-3xl border border-amber-500/30 p-8 sm:p-14 space-y-8 relative overflow-hidden"
            >
              <div className="text-center space-y-2 border-b border-amber-500/20 pb-6">
                <Scroll className="w-6 h-6 text-amber-400 mx-auto" />
                <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-amber-400/80 block">
                  Surat Titah Resmi Dewan Pembina
                </span>
                <h3 className="text-2xl sm:text-3xl font-light text-amber-100">
                  Keputusan & Undangan Kehormatan
                </h3>
              </div>

              <div className="space-y-4 text-base sm:text-lg leading-relaxed text-stone-300 max-w-3xl mx-auto">
                {toParagraphs(content.invitationLetter).map((para, idx) => (
                  <p key={idx} className={idx === 0 ? "first-letter:text-4xl first-letter:text-amber-400 first-letter:float-left first-letter:mr-2" : ""}>
                    {para}
                  </p>
                ))}
              </div>

              <div className="border-t border-amber-500/20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                <div className="space-y-0.5">
                  <p className="font-sans text-xs text-stone-400">Atas Nama Komite Kehormatan,</p>
                  <p className="text-lg text-amber-200 font-semibold">{content.chairpersonName}</p>
                  <p className="font-sans text-[11px] text-stone-500">The Board of Trustees & Foundation Council</p>
                </div>
                <div className="shrink-0 flex items-center gap-2 rounded-full border border-amber-500/40 px-4 py-1.5 font-sans text-xs text-amber-300">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Verified Executive Decree</span>
                </div>
              </div>
            </section>

            {/* 4. DIPLOMATIC FIVE-COURSE BANQUET ITINERARY */}
            <section className="space-y-6">
              <div className="text-center space-y-2">
                <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-amber-400 font-bold block">
                  Susunan Agenda Malam
                </span>
                <h3 className="text-3xl sm:text-4xl font-light text-amber-100 italic">
                  Imperial Banquet & Ceremony Program
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { time: content.session1Time, title: content.session1Title, desc: content.session1Desc, course: "COURSE I // SOIRÉE" },
                  { time: content.session2Time, title: content.session2Title, desc: content.session2Desc, course: "COURSE II // IMPERIAL DINNER" },
                  { time: content.session3Time, title: content.session3Title, desc: content.session3Desc, course: "COURSE III // AWARD CONFERMENT" },
                  { time: content.session4Time, title: content.session4Title, desc: content.session4Desc, course: "COURSE IV // CHARITY WALTZ" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    style={cardBgStyle}
                    className="rounded-3xl border border-amber-500/30 p-6 sm:p-8 space-y-3 shadow-md hover:border-amber-400 transition-colors flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between font-sans text-xs">
                        <span className="font-semibold text-amber-300 bg-amber-950/60 border border-amber-500/30 px-3 py-1 rounded-full">
                          {item.time}
                        </span>
                        <span className="font-mono text-[10px] tracking-wider uppercase text-stone-400">
                          {item.course}
                        </span>
                      </div>
                      <h4 className="text-xl font-normal text-amber-100 pt-1">
                        {item.title}
                      </h4>
                      <p className="font-sans text-xs text-stone-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. HALL OF DISTINCTION: FRAMED HONOREES GALLERY */}
            {(content.photo1Url || content.photo2Url || content.photo3Url) && (
              <section className="space-y-6">
                <div className="text-center space-y-2">
                  <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-amber-400 font-bold block">
                    Galeri Kemegahan Malam
                  </span>
                  <h3 className="text-3xl sm:text-4xl font-light text-amber-100 italic">
                    The Hall of Distinction & Heritage
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {content.photo1Url && (
                    <div className="rounded-3xl bg-[#0f0f15] border-2 border-amber-500/50 p-4 shadow-[0_10px_30px_rgba(212,175,55,0.2)] space-y-3">
                      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-stone-900 border border-amber-500/30">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={content.photo1Url}
                          alt={content.photo1Title || "Photo 1"}
                          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                      </div>
                      <div className="bg-[#181822] p-3 rounded-xl border border-amber-500/20 text-center space-y-1">
                        <p className="text-sm font-semibold text-amber-200">{content.photo1Title}</p>
                        <p className="font-sans text-[11px] text-stone-400 italic">&ldquo;{content.photo1Caption}&rdquo;</p>
                      </div>
                    </div>
                  )}

                  {content.photo2Url && (
                    <div className="rounded-3xl bg-[#0f0f15] border-2 border-amber-500/50 p-4 shadow-[0_10px_30px_rgba(212,175,55,0.2)] space-y-3">
                      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-stone-900 border border-amber-500/30">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={content.photo2Url}
                          alt={content.photo2Title || "Photo 2"}
                          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                      </div>
                      <div className="bg-[#181822] p-3 rounded-xl border border-amber-500/20 text-center space-y-1">
                        <p className="text-sm font-semibold text-amber-200">{content.photo2Title}</p>
                        <p className="font-sans text-[11px] text-stone-400 italic">&ldquo;{content.photo2Caption}&rdquo;</p>
                      </div>
                    </div>
                  )}

                  {content.photo3Url && (
                    <div className="rounded-3xl bg-[#0f0f15] border-2 border-amber-500/50 p-4 shadow-[0_10px_30px_rgba(212,175,55,0.2)] space-y-3">
                      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-stone-900 border border-amber-500/30">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={content.photo3Url}
                          alt={content.photo3Title || "Photo 3"}
                          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                      </div>
                      <div className="bg-[#181822] p-3 rounded-xl border border-amber-500/20 text-center space-y-1">
                        <p className="text-sm font-semibold text-amber-200">{content.photo3Title}</p>
                        <p className="font-sans text-[11px] text-stone-400 italic">&ldquo;{content.photo3Caption}&rdquo;</p>
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* 6. STRICT BLACK-TIE PROTOCOL & VENUE SPREAD */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Dress Code Protocol */}
              <div
                style={cardBgStyle}
                className="rounded-3xl border border-amber-500/30 p-8 space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-amber-400 font-bold block">
                    Protokol Busana Resmi
                  </span>
                  <h4 className="text-2xl font-light text-amber-100">
                    {content.dressCodeTitle}
                  </h4>
                  <p className="font-sans text-xs text-stone-400 leading-relaxed">
                    {content.dressCodeNotes}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 font-sans text-xs">
                  <div className="flex items-center gap-2.5 bg-[#0e0e14] p-3 rounded-xl border border-amber-500/20">
                    <span className="h-5 w-5 rounded-full bg-[#d4af37] border border-amber-200 shadow-sm" />
                    <span className="text-stone-300 font-medium">24K Gold</span>
                  </div>
                  <div className="flex items-center gap-2.5 bg-[#0e0e14] p-3 rounded-xl border border-amber-500/20">
                    <span className="h-5 w-5 rounded-full bg-[#0a0a0c] border border-stone-600 shadow-sm" />
                    <span className="text-stone-300 font-medium">Obsidian</span>
                  </div>
                  <div className="flex items-center gap-2.5 bg-[#0e0e14] p-3 rounded-xl border border-amber-500/20">
                    <span className="h-5 w-5 rounded-full bg-[#581c25] border border-stone-600 shadow-sm" />
                    <span className="text-stone-300 font-medium">Burgundy</span>
                  </div>
                  <div className="flex items-center gap-2.5 bg-[#0e0e14] p-3 rounded-xl border border-amber-500/20">
                    <span className="h-5 w-5 rounded-full bg-[#fbfbf7] border border-stone-300 shadow-sm" />
                    <span className="text-stone-300 font-medium">Pearl White</span>
                  </div>
                </div>
              </div>

              {/* Venue & Coordinates */}
              <div
                style={cardBgStyle}
                className="rounded-3xl border border-amber-500/30 p-8 space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-amber-400 font-bold block">
                    Lokasi Perhelatan
                  </span>
                  <h4 className="text-2xl font-light text-amber-100">
                    {content.venueName}
                  </h4>
                  <p className="font-sans text-xs text-amber-300 font-semibold">
                    {content.venueFloor}
                  </p>
                  <p className="font-sans text-xs text-stone-400 leading-relaxed">
                    {content.venueAddress}
                  </p>
                </div>

                {content.mapsUrl && (
                  <a
                    href={content.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-yellow-600 text-stone-950 font-sans font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:scale-105 transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Petunjuk Lokasi (Google Maps)</span>
                  </a>
                )}
              </div>
            </section>

            {/* 7. PHILANTHROPY ENDOWMENT FUND CARD */}
            {content.charityAccountNo && (
              <section
                style={cardBgStyle}
                className="rounded-3xl border-2 border-amber-500/40 p-8 sm:p-12 text-center space-y-6 max-w-2xl mx-auto shadow-[0_0_40px_rgba(212,175,55,0.2)]"
              >
                <div className="space-y-1">
                  <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-amber-400 font-bold">
                    Dana Amal & Filantropi Pendidikan
                  </span>
                  <h4 className="text-2xl sm:text-3xl font-light text-amber-100 italic">
                    {content.charityBankName}
                  </h4>
                  <p className="font-sans text-xs text-stone-400 max-w-md mx-auto pt-1">
                    {content.charityNote}
                  </p>
                </div>

                <div className="bg-[#0c0c12] p-5 rounded-2xl border border-amber-500/30 font-mono space-y-1 max-w-md mx-auto">
                  <p className="text-xl font-bold text-amber-200 tracking-widest">{content.charityAccountNo}</p>
                  <p className="font-sans text-xs text-stone-400">a.n. {content.charityAccountName}</p>
                </div>

                <button
                  type="button"
                  onClick={handleCopyAccount}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-amber-950/80 hover:bg-amber-900 border border-amber-500/50 text-amber-200 font-sans text-xs uppercase tracking-wider transition-all"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-amber-400" />
                      <span>Nomor Rekening Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Salin Rekening Filantropi</span>
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

export function GalaAwardTemplate({
  data,
  className,
}: GalaAwardTemplateProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0e]" />}>
      <GalaAwardTemplateInner data={data} className={className} />
    </Suspense>
  );
}
