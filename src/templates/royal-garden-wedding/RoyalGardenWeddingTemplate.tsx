"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import {
  Heart,
  Clock,
  MapPin,
  Check,
  Copy,
  Disc3,
  ExternalLink,
  Sparkles,
  Pause,
  Play,
  Mail,
  Flower2,
  Bookmark,
  Share2,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { toParagraphs } from "@/lib/utils/format";
import type { LetterContent } from "@/types/letter";
import { withDefaults } from "../utils";

const defaults = {
  recipientName: "Bapak / Ibu / Sahabat Terkasih",
  waxSealMonogram: "R & A",
  weddingTagline: "The Holy Matrimony & Wedding Reception",
  groomName: "Raden Arya Daniswara, S.T.",
  groomParents: "Putra dari Bpk. Ir. Daniswara & Ibu Hj. Ratna Sari",
  brideName: "Anindita Kirana Putri, B.Des.",
  brideParents: "Putri dari Bpk. Dr. H. Suryo Kusumo & Ibu Siti Rahmawati",
  holyVerseQuote:
    "\"Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.\" (QS. Ar-Rum: 21)",
  invitationMessage:
    "Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta'ala, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu pada hari bahagia pernikahan putra-putri kami.",
  eventDate: "Sabtu, 28 Desember 2024",
  targetIsoDate: "2024-12-28T09:00",
  venueName: "The Royal Glasshouse & Botanical Garden",
  venueAddress: "Jl. Dago Giri No. 88, Lembang, Bandung, Jawa Barat 40391",
  mapsUrl: "https://maps.google.com/?q=Bandung",
  session1Title: "Akad Nikah / Pemberkatan",
  session1Time: "08.00 - 10.00 WIB",
  session1Desc: "Prosesi ijab qabul khidmat bersama keluarga inti & kerabat dekat.",
  session2Title: "Resepsi Pernikahan (Grand Reception)",
  session2Time: "11.00 - 14.00 WIB",
  session2Desc: "Santap siang bersama, ramah tamah, dan sesi foto bersama kedua mempelai.",
  session3Title: "Sunset Celebration & After Party",
  session3Time: "16.00 - 18.00 WIB",
  session3Desc: "Pertunjukan live acoustic & pelepasan lentera harapan di taman botani.",
  photo1Url:
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80",
  photo1Caption: "Dua hati yang bersatu dalam ikatan suci cinta abadi.",
  photo2Url:
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80",
  photo2Caption: "Melangkah bersama menatap masa depan yang cerah.",
  photo3Url:
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80",
  photo3Caption: "Senyum kebahagiaan yang akan kami jaga selamanya.",
  dressCodeTitle: "Botanical Formal / Royal Emerald & Gold",
  dressCodeNote: "Disarankan mengenakan busana formal bernuansa hijau zamrud, sage, champagne, atau putih gading.",
  giftInfoTitle: "Tanda Kasih & Doa Restu (Amplop Digital)",
  bankName1: "BCA",
  accountNumber1: "8420192831",
  accountHolder1: "Raden Arya Daniswara",
  bankName2: "Bank Mandiri",
  accountNumber2: "1320098472910",
  accountHolder2: "Anindita Kirana Putri",
  primaryColor: "#064e3b",
  backgroundColor: "#f4f7f4",
  cardColor: "#ffffff",
  textColor: "#064e3b",
  bodyTextColor: "#374151",
  musicTitle: "A Thousand Years (Cello & Piano Orchestra)",
  bgMusicUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
};

interface RoyalGardenWeddingTemplateProps {
  data: LetterContent;
  className?: string;
}

function RoyalGardenWeddingTemplateInner({
  data,
  className,
}: RoyalGardenWeddingTemplateProps) {
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

  const [isOpened, setIsOpened] = useState<boolean>(!shouldStartClosed);

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

  const handleOpenInvitation = () => {
    setIsOpened(true);

    if (content.bgMusicUrl && audioRef.current && !isThumbnail && pathname !== "/templates") {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }

    setTimeout(() => {
      const target = document.getElementById("wedding-folio-content");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }, 250);
  };

  const [copiedRek1, setCopiedRek1] = useState(false);
  const [copiedRek2, setCopiedRek2] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopy = (text: string, type: "rek1" | "rek2" | "link") => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(text);
      if (type === "rek1") {
        setCopiedRek1(true);
        setTimeout(() => setCopiedRek1(false), 2500);
      } else if (type === "rek2") {
        setCopiedRek2(true);
        setTimeout(() => setCopiedRek2(false), 2500);
      } else if (type === "link") {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
      }
    }
  };

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = content.targetIsoDate
      ? new Date(content.targetIsoDate).getTime()
      : new Date("2024-12-28T09:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [content.targetIsoDate]);

  const paragraphs = toParagraphs(content.invitationMessage);

  const primary = content.primaryColor || "#064e3b";
  const bg = content.backgroundColor || "#f4f7f4";
  const card = content.cardColor || "#ffffff";
  const textColor = content.textColor || "#064e3b";
  const bodyText = content.bodyTextColor || "#374151";

  return (
    <div
      className={cn("relative min-h-screen font-serif selection:bg-emerald-100", className)}
      style={{ backgroundColor: bg, color: bodyText }}
    >
      {/* Audio Elemen Tersembunyi */}
      {!isThumbnail && pathname !== "/templates" && content.bgMusicUrl && (
        <audio ref={audioRef} src={content.bgMusicUrl} loop preload="none" />
      )}

      {/* Floating Music Button */}
      {!isThumbnail &&
        !isEditorPreview &&
        pathname !== "/templates" &&
        (isPublicLetter || isFullPreview || isDetailPage) &&
        content.bgMusicUrl &&
        isOpened && (
          <button
            type="button"
            onClick={toggleMusic}
            className="fixed right-5 bottom-6 z-40 flex items-center gap-2 rounded-full border border-amber-300/40 px-4 py-2.5 shadow-2xl backdrop-blur-md transition-all hover:scale-105"
            style={{ backgroundColor: primary, color: "#ffffff" }}
            aria-label={isPlaying ? "Jeda alunan musik" : "Putar alunan musik"}
          >
            <Disc3 className={cn("h-4 w-4", isPlaying && "animate-spin text-amber-300")} />
            <span className="text-xs font-sans font-semibold pr-1">
              {isPlaying ? "Alunan Syahdu" : "Putar Alunan"}
            </span>
            {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          </button>
        )}

      {/* ========================================================================= */}
      {/* COVER / HERO: ARCHED BOTANICAL GATEWAY WITH WAX SEAL FOLIO               */}
      {/* ========================================================================= */}
      <section
        className={cn(
          "relative flex w-full flex-col items-center justify-center overflow-hidden px-4 text-center transition-all duration-700",
          !isOpened && (isPublicLetter || isFullPreview)
            ? "fixed inset-0 z-50 min-h-screen py-8"
            : !isOpened
              ? "relative min-h-[540px] py-12"
              : "min-h-[480px] sm:min-h-[540px] py-14",
        )}
        style={{
          background: `radial-gradient(ellipse at center, ${primary}15 0%, ${bg} 100%)`,
        }}
      >
        {/* Botanical Foliage Watermark */}
        <div className="pointer-events-none absolute inset-0 opacity-10 flex items-center justify-between px-10">
          <Flower2 className="h-96 w-96 text-emerald-950 -rotate-12 transform -translate-x-12" />
          <Flower2 className="h-96 w-96 text-emerald-950 rotate-12 transform translate-x-12" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-xl flex-col items-center space-y-6">
          {/* Royal Botanical Crest Banner */}
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-white/90 px-4 py-1.5 text-[11px] font-sans font-medium tracking-widest uppercase text-emerald-900 shadow-sm backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
            <span>{content.weddingTagline || "The Holy Matrimony & Wedding Reception"}</span>
          </div>

          {/* Arched Folio Cover Card */}
          <div
            className="relative w-full rounded-t-[120px] rounded-b-3xl border-2 p-8 sm:p-12 shadow-2xl text-center backdrop-blur-md overflow-hidden"
            style={{
              backgroundColor: card,
              borderColor: `${primary}35`,
            }}
          >
            {/* Corner Filigrees */}
            <div className="absolute top-6 left-6 h-6 w-6 border-t-2 border-l-2 border-amber-600/70" />
            <div className="absolute top-6 right-6 h-6 w-6 border-t-2 border-r-2 border-amber-600/70" />
            <div className="absolute bottom-6 left-6 h-6 w-6 border-b-2 border-l-2 border-amber-600/70" />
            <div className="absolute bottom-6 right-6 h-6 w-6 border-b-2 border-r-2 border-amber-600/70" />

            {/* Arched Crest Header */}
            <div className="pt-4 pb-2 space-y-3">
              <span className="text-[11px] font-sans tracking-[0.25em] uppercase text-stone-500">
                Pernikahan Suci & Walimah
              </span>
              <h1
                className="text-3xl sm:text-5xl font-light tracking-wide italic leading-tight"
                style={{ color: textColor }}
              >
                {content.groomName?.split(" ")[0]} & {content.brideName?.split(" ")[0]}
              </h1>
              <p className="text-xs font-sans tracking-wider text-stone-600 uppercase font-medium">
                {content.eventDate || "Sabtu, 28 Desember 2024"}
              </p>
            </div>

            {/* Guest Parchment Voucher */}
            <div className="my-6 rounded-2xl border border-stone-200 bg-stone-50/80 p-5 space-y-1 shadow-inner">
              <p className="text-[10px] font-sans font-semibold tracking-widest uppercase text-stone-400">
                Kepada Yth. Tamu Kehormatan:
              </p>
              <h3
                className="text-xl sm:text-2xl font-bold tracking-normal"
                style={{ color: primary }}
              >
                {recipientName}
              </h3>
              <p className="text-[11px] text-stone-500 italic">
                Kami haturkan undangan penuh hormat untuk merayakan ikrar suci kami
              </p>
            </div>

            {/* 3D Wax Seal Monogram Badge */}
            <div className="flex flex-col items-center justify-center pt-2">
              <div
                className="relative flex h-24 w-24 items-center justify-center rounded-full shadow-2xl border-4 border-amber-900/30 transition-transform duration-300"
                style={{
                  backgroundColor: primary,
                  boxShadow: `0 12px 30px -5px ${primary}80, inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -3px 6px rgba(0,0,0,0.5)`,
                }}
              >
                <div className="absolute inset-2 rounded-full border border-amber-300/40 flex items-center justify-center">
                  <div className="text-center px-1">
                    <span className="text-xl font-bold tracking-wider text-amber-100 drop-shadow">
                      {content.waxSealMonogram || "R & A"}
                    </span>
                    <p className="text-[8px] font-sans tracking-widest uppercase text-amber-200/90 font-medium">
                      Seal
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              {isThumbnail ? (
                <div
                  className="mt-6 inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-xs font-sans font-semibold text-white shadow"
                  style={{ backgroundColor: primary }}
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>Undangan Botanical</span>
                </div>
              ) : !isOpened ? (
                <button
                  type="button"
                  onClick={handleOpenInvitation}
                  className="mt-6 inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 text-xs font-sans font-semibold tracking-widest uppercase text-white shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
                  style={{ backgroundColor: primary }}
                >
                  <Mail className="h-4 w-4" />
                  <span>Buka Lembaran Undangan</span>
                </button>
              ) : (
                <div
                  className="mt-4 flex items-center justify-center gap-1.5 text-xs font-sans font-medium"
                  style={{ color: primary }}
                >
                  <Sparkles className="h-4 w-4 text-amber-600" />
                  <span>Lembaran Telah Terbuka</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* FOLIO CONTENT: EDITORIAL LAYOUT WITH INTERTWINED VINE & CIRCULAR CLOCK     */}
      {/* ========================================================================= */}
      <div
        id="wedding-folio-content"
        className="mx-auto max-w-4xl px-4 py-10 sm:px-6 space-y-16"
      >
        {/* Ayat Suci & Salam Pembuka */}
        <section
          className="rounded-3xl border p-8 sm:p-14 shadow-lg text-center space-y-8 backdrop-blur-sm"
          style={{ backgroundColor: card, borderColor: `${primary}25` }}
        >
          {content.holyVerseQuote && (
            <div className="space-y-4 max-w-2xl mx-auto border-b border-stone-200/80 pb-8">
              <div className="flex items-center justify-center gap-3 text-amber-700/60">
                <span className="h-px w-16 bg-amber-500/30" />
                <Heart className="h-4 w-4 fill-current text-amber-700" />
                <span className="h-px w-16 bg-amber-500/30" />
              </div>
              <p className="text-base sm:text-lg italic text-stone-700 leading-relaxed">
                {content.holyVerseQuote}
              </p>
            </div>
          )}

          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl font-light italic" style={{ color: textColor }}>
              Assalamu’alaikum Warahmatullahi Wabarakatuh
            </h2>
            <div className="space-y-4 text-sm sm:text-base leading-relaxed text-stone-600 font-sans">
              {paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>
        </section>

        {/* 1. THE COUPLE SHOWCASE: DUAL BIOGRAPHY WITH ORNATE AMPERSAND */}
        <section className="relative">
          <div className="text-center space-y-2 mb-10">
            <span className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-emerald-800">
              Kedua Mempelai Yang Berbahagia
            </span>
            <h3 className="text-3xl sm:text-4xl font-light italic" style={{ color: textColor }}>
              Mempelai Pria & Wanita
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative items-center">
            {/* Mempelai Pria */}
            <div
              className="rounded-3xl border-2 p-8 sm:p-10 shadow-md text-center space-y-4 transition-all duration-300 hover:shadow-xl"
              style={{ backgroundColor: card, borderColor: `${primary}30` }}
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-amber-600/30 bg-emerald-50/60 text-emerald-900 shadow-sm">
                <span className="text-2xl font-bold italic">
                  {content.groomName?.charAt(0) || "R"}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-stone-400">
                  Mempelai Pria
                </span>
                <h4 className="text-2xl sm:text-3xl font-bold" style={{ color: textColor }}>
                  {content.groomName}
                </h4>
              </div>
              {content.groomParents && (
                <p className="text-xs sm:text-sm text-stone-600 italic font-sans leading-relaxed pt-2 border-t border-stone-100">
                  {content.groomParents}
                </p>
              )}
            </div>

            {/* Mempelai Wanita */}
            <div
              className="rounded-3xl border-2 p-8 sm:p-10 shadow-md text-center space-y-4 transition-all duration-300 hover:shadow-xl"
              style={{ backgroundColor: card, borderColor: `${primary}30` }}
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 border-amber-600/30 bg-emerald-50/60 text-emerald-900 shadow-sm">
                <span className="text-2xl font-bold italic">
                  {content.brideName?.charAt(0) || "A"}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-stone-400">
                  Mempelai Wanita
                </span>
                <h4 className="text-2xl sm:text-3xl font-bold" style={{ color: textColor }}>
                  {content.brideName}
                </h4>
              </div>
              {content.brideParents && (
                <p className="text-xs sm:text-sm text-stone-600 italic font-sans leading-relaxed pt-2 border-t border-stone-100">
                  {content.brideParents}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* 2. CIRCULAR ANTIQUE DIALS COUNTDOWN TIMER */}
        <section
          className="rounded-3xl border p-8 sm:p-12 shadow-lg text-center space-y-6"
          style={{ backgroundColor: card, borderColor: `${primary}25` }}
        >
          <div className="space-y-1">
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-emerald-800">
              Menghitung Waktu
            </span>
            <h3 className="text-2xl sm:text-3xl font-light italic" style={{ color: textColor }}>
              Menuju Hari Penyatuan Hati
            </h3>
          </div>

          {/* Antique Ring Dials */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-2">
            {[
              { val: timeLeft.days, label: "Hari" },
              { val: timeLeft.hours, label: "Jam" },
              { val: timeLeft.minutes, label: "Menit" },
              { val: timeLeft.seconds, label: "Detik" },
            ].map((unit, idx) => (
              <div
                key={idx}
                className="relative flex h-24 w-24 sm:h-28 sm:w-28 flex-col items-center justify-center rounded-full border-2 border-amber-600/40 bg-white shadow-md"
              >
                <div className="absolute inset-1 rounded-full border border-dashed border-emerald-800/20" />
                <span className="text-2xl sm:text-3xl font-bold" style={{ color: primary }}>
                  {unit.val}
                </span>
                <span className="text-[9px] sm:text-[10px] font-sans font-semibold uppercase tracking-wider text-stone-500">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          <p className="text-xs font-sans text-stone-500 italic pt-1">
            Insya Allah dilaksanakan pada {content.eventDate}
          </p>
        </section>

        {/* 3. SACRED ITINERARY: VERTICAL INTERTWINED VINE TIMELINE */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-emerald-800">
              Agenda Acara
            </span>
            <h3 className="text-3xl sm:text-4xl font-light italic" style={{ color: textColor }}>
              Rangkaian Prosesi Suci
            </h3>
          </div>

          <div className="relative mx-auto max-w-2xl py-4">
            {/* Central Botanical Stem Line */}
            <div
              className="absolute left-6 sm:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 rounded-full"
              style={{ backgroundColor: `${primary}30` }}
            />

            <div className="space-y-10">
              {/* Session 1 */}
              <div className="relative flex flex-col sm:flex-row items-start sm:items-center">
                <div className="hidden sm:block w-1/2 pr-8 text-right">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-sans font-semibold text-emerald-900 border border-emerald-200">
                    <Clock className="h-3 w-3" />
                    <span>{content.session1Time}</span>
                  </div>
                </div>
                <div
                  className="z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-white text-white shadow-md ml-0 sm:mx-auto"
                  style={{ backgroundColor: primary }}
                >
                  <span className="font-sans text-sm font-bold">1</span>
                </div>
                <div className="w-full sm:w-1/2 pl-12 sm:pl-8 pt-2 sm:pt-0">
                  <div className="sm:hidden mb-1.5 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-sans font-semibold text-emerald-900 border border-emerald-200">
                    <Clock className="h-3 w-3" />
                    <span>{content.session1Time}</span>
                  </div>
                  <div
                    className="rounded-2xl border p-5 shadow-sm space-y-1"
                    style={{ backgroundColor: card, borderColor: `${primary}25` }}
                  >
                    <h4 className="text-lg font-bold" style={{ color: textColor }}>
                      {content.session1Title}
                    </h4>
                    <p className="text-xs font-sans text-stone-600 leading-relaxed">
                      {content.session1Desc}
                    </p>
                  </div>
                </div>
              </div>

              {/* Session 2 */}
              <div className="relative flex flex-col sm:flex-row items-start sm:items-center">
                <div className="w-full sm:w-1/2 pl-12 sm:pl-0 sm:pr-8 pt-2 sm:pt-0 order-2 sm:order-1 text-left sm:text-right">
                  <div className="sm:hidden mb-1.5 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-sans font-semibold text-emerald-900 border border-emerald-200">
                    <Clock className="h-3 w-3" />
                    <span>{content.session2Time}</span>
                  </div>
                  <div
                    className="rounded-2xl border p-5 shadow-sm space-y-1"
                    style={{ backgroundColor: card, borderColor: `${primary}25` }}
                  >
                    <h4 className="text-lg font-bold" style={{ color: textColor }}>
                      {content.session2Title}
                    </h4>
                    <p className="text-xs font-sans text-stone-600 leading-relaxed">
                      {content.session2Desc}
                    </p>
                  </div>
                </div>
                <div
                  className="z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-white text-white shadow-md ml-0 sm:mx-auto order-1 sm:order-2"
                  style={{ backgroundColor: primary }}
                >
                  <span className="font-sans text-sm font-bold">2</span>
                </div>
                <div className="hidden sm:block w-1/2 pl-8 order-3">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-sans font-semibold text-emerald-900 border border-emerald-200">
                    <Clock className="h-3 w-3" />
                    <span>{content.session2Time}</span>
                  </div>
                </div>
              </div>

              {/* Session 3 */}
              <div className="relative flex flex-col sm:flex-row items-start sm:items-center">
                <div className="hidden sm:block w-1/2 pr-8 text-right">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-sans font-semibold text-emerald-900 border border-emerald-200">
                    <Clock className="h-3 w-3" />
                    <span>{content.session3Time}</span>
                  </div>
                </div>
                <div
                  className="z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-white text-white shadow-md ml-0 sm:mx-auto"
                  style={{ backgroundColor: primary }}
                >
                  <span className="font-sans text-sm font-bold">3</span>
                </div>
                <div className="w-full sm:w-1/2 pl-12 sm:pl-8 pt-2 sm:pt-0">
                  <div className="sm:hidden mb-1.5 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-sans font-semibold text-emerald-900 border border-emerald-200">
                    <Clock className="h-3 w-3" />
                    <span>{content.session3Time}</span>
                  </div>
                  <div
                    className="rounded-2xl border p-5 shadow-sm space-y-1"
                    style={{ backgroundColor: card, borderColor: `${primary}25` }}
                  >
                    <h4 className="text-lg font-bold" style={{ color: textColor }}>
                      {content.session3Title}
                    </h4>
                    <p className="text-xs font-sans text-stone-600 leading-relaxed">
                      {content.session3Desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. ASYMMETRICAL HEIRLOOM SCRAPBOOK GALLERY */}
        {(content.photo1Url || content.photo2Url || content.photo3Url) && (
          <section className="space-y-6">
            <div className="text-center space-y-2">
              <span className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-emerald-800">
                Dokumentasi & Kenangan
              </span>
              <h3 className="text-3xl sm:text-4xl font-light italic" style={{ color: textColor }}>
                Our Prewedding Album
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
              {/* Feature Portrait Photo on Left (7 cols) */}
              {content.photo1Url && (
                <div
                  className="md:col-span-7 rounded-3xl border-4 p-4 shadow-xl flex flex-col justify-between"
                  style={{ backgroundColor: card, borderColor: `${primary}20` }}
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-stone-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={content.photo1Url}
                      alt={content.photo1Caption || "Prewedding Photo 1"}
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                  {content.photo1Caption && (
                    <p className="pt-4 pb-2 text-center text-sm italic text-stone-600">
                      &ldquo;{content.photo1Caption}&rdquo;
                    </p>
                  )}
                </div>
              )}

              {/* Stacked Right Photos (5 cols) */}
              <div className="md:col-span-5 flex flex-col gap-6 justify-between">
                {content.photo2Url && (
                  <div
                    className="rounded-3xl border-4 p-3.5 shadow-md"
                    style={{ backgroundColor: card, borderColor: `${primary}20` }}
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-stone-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={content.photo2Url}
                        alt={content.photo2Caption || "Prewedding Photo 2"}
                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                    {content.photo2Caption && (
                      <p className="pt-2 text-center text-xs italic text-stone-600">
                        &ldquo;{content.photo2Caption}&rdquo;
                      </p>
                    )}
                  </div>
                )}

                {content.photo3Url && (
                  <div
                    className="rounded-3xl border-4 p-3.5 shadow-md"
                    style={{ backgroundColor: card, borderColor: `${primary}20` }}
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-stone-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={content.photo3Url}
                        alt={content.photo3Caption || "Prewedding Photo 3"}
                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                    {content.photo3Caption && (
                      <p className="pt-2 text-center text-xs italic text-stone-600">
                        &ldquo;{content.photo3Caption}&rdquo;
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* 5. ROYAL GLASSHOUSE VENUE & DRESS CODE SPLIT CARDS */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Venue Card */}
          <div
            className="rounded-3xl border p-8 shadow-md flex flex-col justify-between space-y-6"
            style={{ backgroundColor: card, borderColor: `${primary}25` }}
          >
            <div className="space-y-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-stone-400">
                  Lokasi Kehormatan
                </span>
                <h4 className="text-xl sm:text-2xl font-bold" style={{ color: textColor }}>
                  {content.venueName}
                </h4>
                <p className="text-xs sm:text-sm font-sans text-stone-600 leading-relaxed pt-1">
                  {content.venueAddress}
                </p>
              </div>
            </div>

            {content.mapsUrl && (
              <a
                href={content.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-xs font-sans font-semibold tracking-wider uppercase text-white shadow-md transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: primary }}
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>Buka Petunjuk Arah (Maps)</span>
              </a>
            )}
          </div>

          {/* Dress Code Card */}
          <div
            className="rounded-3xl border p-8 shadow-md flex flex-col justify-between space-y-6"
            style={{ backgroundColor: card, borderColor: `${primary}25` }}
          >
            <div className="space-y-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-amber-50 text-amber-900 border border-amber-200">
                <Bookmark className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-stone-400">
                  Panduan Busana Tamu
                </span>
                <h4 className="text-xl sm:text-2xl font-bold" style={{ color: textColor }}>
                  {content.dressCodeTitle}
                </h4>
                <p className="text-xs sm:text-sm font-sans text-stone-600 leading-relaxed pt-1 italic">
                  {content.dressCodeNote}
                </p>
              </div>
            </div>

            {/* Circular Swatches */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex flex-col items-center gap-1">
                <span className="h-7 w-7 rounded-full bg-[#064e3b] border-2 border-white shadow" />
                <span className="text-[9px] font-sans text-stone-500 font-medium">Emerald</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="h-7 w-7 rounded-full bg-[#047857] border-2 border-white shadow" />
                <span className="text-[9px] font-sans text-stone-500 font-medium">Sage</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="h-7 w-7 rounded-full bg-[#fef3c7] border-2 border-white shadow" />
                <span className="text-[9px] font-sans text-stone-500 font-medium">Champagne</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="h-7 w-7 rounded-full bg-[#f8fafc] border-2 border-stone-200 shadow" />
                <span className="text-[9px] font-sans text-stone-500 font-medium">Ivory</span>
              </div>
            </div>
          </div>
        </section>

        {/* 6. ROYAL TREASURY: DIGITAL ENVELOPE */}
        {(content.accountNumber1 || content.accountNumber2) && (
          <section
            className="rounded-3xl border-2 p-8 sm:p-12 shadow-lg text-center space-y-6"
            style={{ backgroundColor: card, borderColor: `${primary}30` }}
          >
            <div className="space-y-1">
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-emerald-800">
                Tanda Kasih & Doa Restu
              </span>
              <h4 className="text-2xl sm:text-3xl font-light italic" style={{ color: textColor }}>
                {content.giftInfoTitle}
              </h4>
              <p className="text-xs font-sans text-stone-500 max-w-md mx-auto">
                Bagi sanak keluarga dan sahabat yang berkenan mengirimkan tanda kasih secara digital:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto pt-2">
              {content.accountNumber1 && (
                <div className="rounded-2xl border border-stone-200 bg-stone-50/70 p-5 text-center space-y-2 shadow-sm">
                  <span className="text-xs font-sans font-bold tracking-widest uppercase text-emerald-900">
                    {content.bankName1}
                  </span>
                  <p className="font-mono text-lg font-bold tracking-wider text-stone-900">
                    {content.accountNumber1}
                  </p>
                  <p className="text-xs font-sans text-stone-500">a.n. {content.accountHolder1}</p>
                  <button
                    type="button"
                    onClick={() => handleCopy(content.accountNumber1, "rek1")}
                    className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-stone-300 bg-white px-4 py-1.5 text-xs font-sans font-medium text-stone-700 hover:bg-stone-100 transition-colors"
                  >
                    {copiedRek1 ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                        <span className="text-emerald-800">Nomor Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Salin Rekening</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {content.accountNumber2 && (
                <div className="rounded-2xl border border-stone-200 bg-stone-50/70 p-5 text-center space-y-2 shadow-sm">
                  <span className="text-xs font-sans font-bold tracking-widest uppercase text-emerald-900">
                    {content.bankName2}
                  </span>
                  <p className="font-mono text-lg font-bold tracking-wider text-stone-900">
                    {content.accountNumber2}
                  </p>
                  <p className="text-xs font-sans text-stone-500">a.n. {content.accountHolder2}</p>
                  <button
                    type="button"
                    onClick={() => handleCopy(content.accountNumber2, "rek2")}
                    className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-stone-300 bg-white px-4 py-1.5 text-xs font-sans font-medium text-stone-700 hover:bg-stone-100 transition-colors"
                  >
                    {copiedRek2 ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" />
                        <span className="text-emerald-800">Nomor Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Salin Rekening</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </section>
        )}

        {/* 7. CLOSING BLESSING & SHARE */}
        <footer
          className="rounded-3xl border p-8 sm:p-12 text-center space-y-6 shadow-sm"
          style={{ backgroundColor: card, borderColor: `${primary}20` }}
        >
          <div className="space-y-3 max-w-lg mx-auto">
            <p className="text-sm italic text-stone-600">
              Merupakan kehormatan serta kebahagiaan yang tak terhingga bagi kami sekeluarga atas kehadiran dan iringan doa restu Bapak/Ibu/Saudara/i sekalian.
            </p>
            <div className="pt-2">
              <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-stone-400">
                Keluarga Besar Kami,
              </span>
              <h4 className="text-2xl sm:text-3xl font-light italic pt-1" style={{ color: textColor }}>
                {content.groomName?.split(" ")[0]} & {content.brideName?.split(" ")[0]}
              </h4>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-200/60">
            <button
              type="button"
              onClick={() => handleCopy(typeof window !== "undefined" ? window.location.href : "", "link")}
              className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-sans font-medium text-stone-700 border border-stone-300 hover:bg-stone-50 transition-all"
            >
              {copiedLink ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Tautan Berhasil Disalin</span>
                </>
              ) : (
                <>
                  <Share2 className="h-3.5 w-3.5" />
                  <span>Salin Tautan Undangan</span>
                </>
              )}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

export function RoyalGardenWeddingTemplate({
  data,
  className,
}: RoyalGardenWeddingTemplateProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-emerald-50/20" />}>
      <RoyalGardenWeddingTemplateInner data={data} className={className} />
    </Suspense>
  );
}
