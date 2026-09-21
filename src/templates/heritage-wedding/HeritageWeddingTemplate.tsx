"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import {
  Clock,
  MapPin,
  Check,
  Copy,
  ExternalLink,
  Sparkles,
  Pause,
  Play,
  Heart,
  Flower2,
  Bookmark,
  Share2,
  Crown,
  Scroll,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { toParagraphs } from "@/lib/utils/format";
import type { LetterContent } from "@/types/letter";
import { withDefaults } from "../utils";

interface HeritageWeddingTemplateProps {
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

const defaults: Record<string, string> = {
  recipientName: "Bapak / Ibu / Sahabat Ingkang Kinurmatan",
  waxSealMonogram: "D & S",
  weddingTagline: "Pawiwahan Ageng & The Sacred Nusantara Matrimony",
  gununganSubtitle: "Serat Uleman Palakrama Adat Jawi Keraton",
  holyVerseQuote:
    "\"Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.\" (QS. Ar-Rum: 21)",
  invitationMessage:
    "Kanthi nyenyuwun lumunturing sih wilasa Dalem Gusti Ingkang Maha Agung, kaparenga kula sakeluwarga ngaturi rawuh panjenengan ing pawiwahan dhauping putra-putri kula.\n\nKehadiran saha doa restu panjenengan sedaya dados tambahing berkah tuwin kamulyan tumrap kalih mempelai anggenipun ngambah gesang bebrayan enggal ingkang sakinah, mawaddah, warahmah.",
  eventDate: "Setu Pahing, 12 Desember 2026",
  targetIsoDate: "2026-12-12T08:00",
  senderFamily: "Keluarga Ageng Bpk. K.R.T. Dananjaya & Bpk. Dr. H. Suryonegoro",

  groomTitle: "Mempelai Kakung",
  groomName: "Raden Mas Dananjaya Bismantara, S.T., M.Sc.",
  groomParents: "Putra kaping kalih saking Bpk. K.R.T. Dananjaya & Ibu Hj. Ratna Ningsih",
  groomPhotoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",

  brideTitle: "Mempelai Putri",
  brideName: "Raden Ajeng Sekar Kusumaningrum, B.A., M.Des.",
  brideParents: "Putri pambayun saking Bpk. Dr. H. Suryonegoro & Ibu Hj. Endang Sri Lestari",
  bridePhotoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",

  session1Time: "Kemis Kliwon, 10 Des 2026 • 09.00 - 12.00 WIB",
  session1Title: "Upacara Siraman & Pasang Bleketepe Tuwuhan",
  session1Desc: "Prosesi sesuci lair batin ngresiki raga, panyuwunan keselamatan dhumateng Gusti Kang Akarya Jagad.",

  session2Time: "Jemuah Legi, 11 Des 2026 • 19.00 - 21.30 WIB",
  session2Title: "Malam Midodareni & Nyantri Penganten",
  session2Desc: "Malam panyuwunan turunipun bidadari kahyangan, seserahan kancing gelung, lan wejangan catur wedha.",

  session3Time: "Setu Pahing, 12 Des 2026 • 08.00 - 10.00 WIB",
  session3Title: "Ijab Qabul Khidmat (Akad Nikah)",
  session3Desc: "Ikrar suci prasetyaning katresnan ing ngarsaning penghulu, wali, lan para saksi pinunjul.",

  session4Time: "Setu Pahing, 12 Des 2026 • 11.00 - 14.30 WIB",
  session4Title: "Upacara Panggih Penganten & Resepsi Ageng",
  session4Desc: "Balangan suruh, wijidadi, sinduran, kacar-kucur, dhahar klimah, dilajengaken ramah tamah dhahar sesarengan.",

  photo1Url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
  photo1Caption: "Rukuning katresnan ingkang kuncara manggala wilasa.",
  photo2Url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
  photo2Caption: "Lumampah sesarengan hanggayuh kasampurnaning gesang.",
  photo3Url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
  photo3Caption: "Nyawiji ing rasa, guyub rukun salaminya.",

  venueName: "Sasana Handrawina Ballroom & Pendopo Ageng Keraton",
  venueHall: "Grand Royal Atrium & Courtyard Taman Asri",
  venueAddress: "Kawasan Candi Keraton, Jl. Mayor Kusmanto No. 99, Surakarta, Jawa Tengah 57111",
  mapsUrl: "https://maps.google.com/?q=Surakarta",

  dressCodeTitle: "Busana Tradisional Ageng / Batik Formal Nusantara",
  dressCodeNote: "Katuran rawuh ngagem busana Beskap Jawi / Kebaya Nasional utawi Batik Tulis Lengan Panjang kanthi nuansa sogan, navy, lan emas.",

  giftInfoTitle: "Tandha Asih & Kado Dhigital (Amplop Digital)",
  giftNote: "Donga puji pangestu panjenengan sami sampun dados peparing ingkang tanpa upami tumrap kalih mempelai.",
  bankName1: "BCA",
  accountNumber1: "8420198811",
  accountHolder1: "Raden Mas Dananjaya",
  bankName2: "Bank Mandiri",
  accountNumber2: "1380029481720",
  accountHolder2: "Raden Ajeng Sekar Kusumaningrum",

  primaryColor: "#c59b27",
  backgroundColor: "#0b1320",
  cardColor: "#121d2f",
  textColor: "#fef3c7",
  musicTitle: "Gamelan Kebo Giro & Seruling Wilasa Syahdu",
  musicUrl: "https://cdn.pixabay.com/download/audio/2022/11/06/audio_c3c3167123.mp3?filename=a-thousand-years-cello-and-piano-orchestra-124991.mp3",
};

function HeritageWeddingTemplateInner({
  data,
  className,
}: HeritageWeddingTemplateProps) {
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

    if (content.musicUrl && audioRef.current && !isThumbnail && pathname !== "/templates") {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }

    setTimeout(() => {
      const target = document.getElementById("heritage-main-content");
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

  const [countdown, setCountdown] = useState<CountdownState>(initialCountdown);

  useEffect(() => {
    if (!content.targetIsoDate) return;
    setCountdown(computeCountdown(content.targetIsoDate));

    const interval = setInterval(() => {
      setCountdown(computeCountdown(content.targetIsoDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [content.targetIsoDate]);

  const paragraphs = toParagraphs(content.invitationMessage);

  const primary = content.primaryColor || "#c59b27";
  const bg = content.backgroundColor || "#0b1320";
  const card = content.cardColor || "#121d2f";
  const textColor = content.textColor || "#fef3c7";

  return (
    <div
      className={cn("relative min-h-screen font-serif selection:bg-amber-900/50 selection:text-amber-100", className)}
      style={{ backgroundColor: bg, color: "#e2e8f0" }}
    >
      {/* Background Batik Parang Texture & Midnight Stardust */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,#c59b2715,transparent_60%),radial-gradient(circle_at_bottom,#1e293b30,transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#c59b270a_1px,transparent_1px),linear-gradient(to_bottom,#c59b270a_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Audio Elemen Tersembunyi */}
      {!isThumbnail && pathname !== "/templates" && content.musicUrl && (
        <audio ref={audioRef} src={content.musicUrl} loop preload="none" />
      )}

      {/* Floating Gending Music Button */}
      {!isThumbnail &&
        !isEditorPreview &&
        pathname !== "/templates" &&
        (isPublicLetter || isFullPreview || isDetailPage) &&
        content.musicUrl &&
        isOpened && (
          <button
            type="button"
            onClick={toggleMusic}
            className="fixed right-5 bottom-6 z-40 flex items-center gap-2 rounded-full border border-amber-500/60 bg-[#0b1320]/95 px-4 py-2.5 shadow-[0_4px_25px_rgba(197,155,39,0.3)] backdrop-blur-md transition-all hover:scale-105"
            style={{ color: primary }}
            aria-label={isPlaying ? "Jeda gending" : "Putar gending gamelan"}
          >
            <Flower2 className={cn("h-4 w-4", isPlaying && "animate-spin text-amber-300")} />
            <span className="text-xs font-sans font-semibold pr-1 text-amber-100">
              {isPlaying ? "Gending Wilasa" : "Alunan Gending"}
            </span>
            {isPlaying ? <Pause className="h-3.5 w-3.5 text-amber-300" /> : <Play className="h-3.5 w-3.5 text-amber-300" />}
          </button>
        )}

      {/* ========================================================================= */}
      {/* 1. COVER / HERO: GAPURA GUNUNGAN WAYANG & SEGAL MONOGRAM 3D               */}
      {/* ========================================================================= */}
      <section
        className={cn(
          "relative flex w-full flex-col items-center justify-center overflow-hidden px-4 text-center transition-all duration-700",
          !isOpened && (isPublicLetter || isFullPreview)
            ? "fixed inset-0 z-50 min-h-screen py-8"
            : !isOpened
              ? "relative min-h-[560px] py-12"
              : "min-h-[500px] sm:min-h-[560px] py-14",
        )}
        style={{
          background: `radial-gradient(ellipse at center, ${primary}18 0%, ${bg} 100%)`,
        }}
      >
        <div className="relative z-10 mx-auto flex w-full max-w-xl flex-col items-center space-y-6">
          {/* Tagline Pawiwahan */}
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-950/40 px-4 py-1.5 text-[11px] font-sans font-medium tracking-widest uppercase text-amber-300 shadow-inner backdrop-blur-sm">
            <Crown className="h-3.5 w-3.5 text-amber-400" />
            <span>{content.weddingTagline || "The Sacred Nusantara Matrimony"}</span>
          </div>

          {/* Gapura Gunungan Folio Card */}
          <div
            className="relative w-full rounded-t-[140px] rounded-b-3xl border-2 p-8 sm:p-12 shadow-2xl text-center backdrop-blur-md overflow-hidden"
            style={{
              backgroundColor: card,
              borderColor: `${primary}40`,
            }}
          >
            {/* Sudut Ukiran Jepara Emas */}
            <div className="absolute top-5 left-5 h-6 w-6 border-t-2 border-l-2 border-amber-400" />
            <div className="absolute top-5 right-5 h-6 w-6 border-t-2 border-r-2 border-amber-400" />
            <div className="absolute bottom-5 left-5 h-6 w-6 border-b-2 border-l-2 border-amber-400" />
            <div className="absolute bottom-5 right-5 h-6 w-6 border-b-2 border-r-2 border-amber-400" />

            {/* Siluet Gunungan Simbolik Atas */}
            <div className="flex flex-col items-center space-y-2 pt-2">
              <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-amber-400/80 font-bold">
                {content.gununganSubtitle || "Serat Uleman Palakrama Adat Jawi"}
              </span>

              <h1
                className="text-3xl sm:text-5xl font-light tracking-wide italic leading-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-400"
              >
                {content.groomName?.split(" ")[0]} & {content.brideName?.split(" ")[0]}
              </h1>

              <p className="text-xs font-sans tracking-wider text-amber-200/80 uppercase font-medium pt-1">
                {content.eventDate}
              </p>
            </div>

            {/* Kotak Uleman Tamu Kehormatan */}
            <div className="my-6 rounded-2xl border border-amber-500/30 bg-[#0a101a]/80 p-5 space-y-1 shadow-inner">
              <p className="text-[10px] font-sans font-semibold tracking-widest uppercase text-amber-400/70">
                Katur Dhumateng Panjenenganipun:
              </p>
              <h3
                className="text-xl sm:text-2xl font-bold tracking-normal text-amber-100"
              >
                {recipientName}
              </h3>
              <p className="text-[11px] text-stone-400 italic">
                Nyuwun lumunturing sih nugraha saha donga pangestu panjenengan
              </p>
            </div>

            {/* Segel Lilin Monogram Surya 3D */}
            <div className="flex flex-col items-center justify-center pt-2">
              <div
                className="relative flex h-24 w-24 items-center justify-center rounded-full shadow-2xl border-4 border-amber-600/40 transition-transform duration-300"
                style={{
                  backgroundColor: "#2c1c08",
                  boxShadow: `0 12px 30px -5px rgba(197,155,39,0.5), inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -3px 6px rgba(0,0,0,0.8)`,
                }}
              >
                <div className="absolute inset-2 rounded-full border border-amber-400/40 flex items-center justify-center">
                  <div className="text-center px-1">
                    <span className="text-xl font-bold tracking-wider text-amber-200 drop-shadow">
                      {content.waxSealMonogram || "D & S"}
                    </span>
                    <p className="text-[7px] font-sans tracking-widest uppercase text-amber-300/80 font-medium">
                      Wilasa
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button Buka Undangan */}
              {isThumbnail ? (
                <div
                  className="mt-6 inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-xs font-sans font-semibold text-stone-950 shadow"
                  style={{ backgroundColor: primary }}
                >
                  <Scroll className="h-3.5 w-3.5" />
                  <span>Serat Pawiwahan Ageng</span>
                </div>
              ) : !isOpened ? (
                <button
                  type="button"
                  onClick={handleOpenInvitation}
                  className="mt-6 inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 text-xs font-sans font-bold tracking-widest uppercase text-stone-950 shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 shadow-[0_0_30px_rgba(197,155,39,0.4)]"
                >
                  <Scroll className="h-4 w-4" />
                  <span>Buka Serat Pawiwahan</span>
                </button>
              ) : (
                <div
                  className="mt-4 flex items-center justify-center gap-1.5 text-xs font-sans font-medium text-amber-300"
                >
                  <Sparkles className="h-4 w-4 text-amber-400" />
                  <span>Serat Pawiwahan Sampun Kabikak</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* ISI UTAMA: 9 SEKSI KAYA DATA & BUDAYA NUSANTARA                           */}
      {/* ========================================================================= */}
      <div
        id="heritage-main-content"
        className="mx-auto max-w-4xl px-4 py-10 sm:px-6 space-y-16"
      >
        {/* 2. SERAT KALUHURAN & AYAT SUCI */}
        <section
          className="rounded-3xl border p-8 sm:p-14 shadow-xl text-center space-y-8 backdrop-blur-sm relative overflow-hidden"
          style={{ backgroundColor: card, borderColor: `${primary}30` }}
        >
          {content.holyVerseQuote && (
            <div className="space-y-4 max-w-2xl mx-auto border-b border-amber-500/20 pb-8">
              <div className="flex items-center justify-center gap-3 text-amber-400/70">
                <span className="h-px w-16 bg-amber-500/30" />
                <Heart className="h-4 w-4 fill-current text-amber-400" />
                <span className="h-px w-16 bg-amber-500/30" />
              </div>
              <p className="text-base sm:text-lg italic text-amber-100 leading-relaxed">
                {content.holyVerseQuote}
              </p>
            </div>
          )}

          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-3xl font-light italic" style={{ color: textColor }}>
              Assalamu’alaikum Warahmatullahi Wabarakatuh
            </h2>
            <div className="space-y-4 text-sm sm:text-base leading-relaxed text-stone-300 font-sans">
              {paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
            {content.senderFamily && (
              <p className="text-xs font-sans text-amber-400/80 pt-2 font-semibold">
                {content.senderFamily}
              </p>
            )}
          </div>
        </section>

        {/* 3. PASANGAN MEMPELAI: PROFIL KAKUNG & PUTRI BERBINGKAI UKIRAN */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-amber-400">
              Pinanganten Sekalian
            </span>
            <h3 className="text-3xl sm:text-4xl font-light italic" style={{ color: textColor }}>
              Mempelai Kakung & Mempelai Putri
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Mempelai Kakung (Pria) */}
            <div
              className="rounded-3xl border-2 p-8 sm:p-10 shadow-lg text-center space-y-5 flex flex-col justify-between"
              style={{ backgroundColor: card, borderColor: `${primary}35` }}
            >
              <div className="space-y-4">
                {content.groomPhotoUrl ? (
                  <div className="relative mx-auto aspect-[4/5] w-48 overflow-hidden rounded-2xl border-2 border-amber-500/40 shadow-md">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={content.groomPhotoUrl}
                      alt={content.groomName}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-2 border-amber-500/40 bg-amber-950/40 text-amber-200 text-3xl font-bold">
                    {content.groomName?.charAt(0) || "D"}
                  </div>
                )}

                <div className="space-y-1">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-amber-400/70">
                    {content.groomTitle || "Mempelai Kakung"}
                  </span>
                  <h4 className="text-2xl font-bold text-amber-100">
                    {content.groomName}
                  </h4>
                </div>
              </div>

              {content.groomParents && (
                <p className="text-xs sm:text-sm text-stone-300 italic font-sans leading-relaxed pt-3 border-t border-amber-500/20">
                  {content.groomParents}
                </p>
              )}
            </div>

            {/* Mempelai Putri (Wanita) */}
            <div
              className="rounded-3xl border-2 p-8 sm:p-10 shadow-lg text-center space-y-5 flex flex-col justify-between"
              style={{ backgroundColor: card, borderColor: `${primary}35` }}
            >
              <div className="space-y-4">
                {content.bridePhotoUrl ? (
                  <div className="relative mx-auto aspect-[4/5] w-48 overflow-hidden rounded-2xl border-2 border-amber-500/40 shadow-md">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={content.bridePhotoUrl}
                      alt={content.brideName}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-2 border-amber-500/40 bg-amber-950/40 text-amber-200 text-3xl font-bold">
                    {content.brideName?.charAt(0) || "S"}
                  </div>
                )}

                <div className="space-y-1">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-amber-400/70">
                    {content.brideTitle || "Mempelai Putri"}
                  </span>
                  <h4 className="text-2xl font-bold text-amber-100">
                    {content.brideName}
                  </h4>
                </div>
              </div>

              {content.brideParents && (
                <p className="text-xs sm:text-sm text-stone-300 italic font-sans leading-relaxed pt-3 border-t border-amber-500/20">
                  {content.brideParents}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* 4. KRONOMETER SURYA MAJAPAHIT (COUNTDOWN TIMER) */}
        <section
          className="rounded-3xl border p-8 sm:p-12 shadow-xl text-center space-y-6"
          style={{ backgroundColor: card, borderColor: `${primary}30` }}
        >
          <div className="space-y-1">
            <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-amber-400">
              Wilasa Titimangsa
            </span>
            <h3 className="text-2xl sm:text-3xl font-light italic" style={{ color: textColor }}>
              Menghitung Waktu Menuju Hari Ijab & Panggih
            </h3>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-2">
            {[
              { val: countdown.days, label: "Dinten", sub: "Hari" },
              { val: countdown.hours, label: "Tabuh", sub: "Jam" },
              { val: countdown.minutes, label: "Menit", sub: "Menit" },
              { val: countdown.seconds, label: "Detik", sub: "Detik" },
            ].map((unit, idx) => (
              <div
                key={idx}
                className="relative flex h-24 w-24 sm:h-28 sm:w-28 flex-col items-center justify-center rounded-full border-2 border-amber-500/50 bg-[#0a101a] shadow-[0_0_20px_rgba(197,155,39,0.15)]"
              >
                <div className="absolute inset-1 rounded-full border border-dashed border-amber-500/20" />
                <span className="text-2xl sm:text-3xl font-light text-amber-200">
                  {String(unit.val).padStart(2, "0")}
                </span>
                <span className="text-[9px] font-sans uppercase font-bold text-amber-400 tracking-wider">
                  {unit.label}
                </span>
                <span className="text-[7px] font-sans text-stone-400 uppercase">
                  {unit.sub}
                </span>
              </div>
            ))}
          </div>

          <p className="text-xs font-sans text-stone-400 italic pt-1">
            Mugi tansah pinaringan berkah lan wilasa saking Gusti Ingkang Maha Agung
          </p>
        </section>

        {/* 5. TATA LAMPAH ADAT: 4 RANGKAIAN PROSESI SAKRAL */}
        <section className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-amber-400">
              Tata Lampahing Adat
            </span>
            <h3 className="text-3xl sm:text-4xl font-light italic" style={{ color: textColor }}>
              Rangkaian Prosesi Adat Jawi
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { time: content.session1Time, title: content.session1Title, desc: content.session1Desc, stage: "PROSESI I // SESUCI LAIR BATIN" },
              { time: content.session2Time, title: content.session2Title, desc: content.session2Desc, stage: "PROSESI II // NYANTRI PENGANTEN" },
              { time: content.session3Time, title: content.session3Title, desc: content.session3Desc, stage: "PROSESI III // IJAB KHIDMAT" },
              { time: content.session4Time, title: content.session4Title, desc: content.session4Desc, stage: "PROSESI IV // PANGGIH & RESEPSI" },
            ].map((sesi, idx) => (
              <div
                key={idx}
                className="rounded-3xl border p-6 sm:p-8 space-y-3 shadow-md hover:border-amber-400 transition-colors flex flex-col justify-between"
                style={{ backgroundColor: card, borderColor: `${primary}30` }}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between font-sans text-xs">
                    <span className="inline-flex items-center gap-1.5 font-semibold text-amber-200 bg-amber-950/60 border border-amber-500/30 px-3 py-1 rounded-full">
                      <Clock className="h-3 w-3 text-amber-400" />
                      <span>{sesi.time}</span>
                    </span>
                    <span className="font-mono text-[9px] tracking-wider uppercase text-amber-400/80">
                      {sesi.stage}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-amber-100 pt-1">
                    {sesi.title}
                  </h4>
                  <p className="font-sans text-xs text-stone-300 leading-relaxed">
                    {sesi.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. PASINAON TRESNA: PREWEDDING HERITAGE GALLERY */}
        {(content.photo1Url || content.photo2Url || content.photo3Url) && (
          <section className="space-y-6">
            <div className="text-center space-y-2">
              <span className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-amber-400">
                Pasinaon Tresna
              </span>
              <h3 className="text-3xl sm:text-4xl font-light italic" style={{ color: textColor }}>
                Dokumentasi Prewedding Adat
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {content.photo1Url && (
                <div
                  className="rounded-3xl border-2 p-4 shadow-xl space-y-3"
                  style={{ backgroundColor: card, borderColor: `${primary}30` }}
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-stone-900 border border-amber-500/30">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={content.photo1Url}
                      alt={content.photo1Caption || "Prewedding Photo 1"}
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                  {content.photo1Caption && (
                    <p className="text-center font-serif text-xs italic text-stone-300 pt-1">
                      &ldquo;{content.photo1Caption}&rdquo;
                    </p>
                  )}
                </div>
              )}

              {content.photo2Url && (
                <div
                  className="rounded-3xl border-2 p-4 shadow-xl space-y-3"
                  style={{ backgroundColor: card, borderColor: `${primary}30` }}
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-stone-900 border border-amber-500/30">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={content.photo2Url}
                      alt={content.photo2Caption || "Prewedding Photo 2"}
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                  {content.photo2Caption && (
                    <p className="text-center font-serif text-xs italic text-stone-300 pt-1">
                      &ldquo;{content.photo2Caption}&rdquo;
                    </p>
                  )}
                </div>
              )}

              {content.photo3Url && (
                <div
                  className="rounded-3xl border-2 p-4 shadow-xl space-y-3"
                  style={{ backgroundColor: card, borderColor: `${primary}30` }}
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-stone-900 border border-amber-500/30">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={content.photo3Url}
                      alt={content.photo3Caption || "Prewedding Photo 3"}
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                  {content.photo3Caption && (
                    <p className="text-center font-serif text-xs italic text-stone-300 pt-1">
                      &ldquo;{content.photo3Caption}&rdquo;
                    </p>
                  )}
                </div>
              )}
            </div>
          </section>
        )}

        {/* 7. SASANA PAWIWAHAN & TATA BUSANA (SPLIT CARDS) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Sasana Pawiwahan (Venue) */}
          <div
            className="rounded-3xl border p-8 shadow-md flex flex-col justify-between space-y-6"
            style={{ backgroundColor: card, borderColor: `${primary}30` }}
          >
            <div className="space-y-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-amber-950/60 text-amber-300 border border-amber-500/30">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-amber-400/80">
                  Sasana Pawiwahan
                </span>
                <h4 className="text-xl sm:text-2xl font-bold text-amber-100">
                  {content.venueName}
                </h4>
                {content.venueHall && (
                  <p className="text-xs font-sans text-amber-300 font-semibold">
                    {content.venueHall}
                  </p>
                )}
                <p className="text-xs sm:text-sm font-sans text-stone-300 leading-relaxed pt-1">
                  {content.venueAddress}
                </p>
              </div>
            </div>

            {content.mapsUrl && (
              <a
                href={content.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-xs font-sans font-bold tracking-wider uppercase text-stone-950 shadow-md transition-all duration-300 hover:scale-105 bg-gradient-to-r from-amber-400 to-yellow-500"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Petunjuk Arah (Google Maps)</span>
              </a>
            )}
          </div>

          {/* Tata Busana (Dress Code) */}
          <div
            className="rounded-3xl border p-8 shadow-md flex flex-col justify-between space-y-6"
            style={{ backgroundColor: card, borderColor: `${primary}30` }}
          >
            <div className="space-y-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-amber-950/60 text-amber-300 border border-amber-500/30">
                <Bookmark className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-amber-400/80">
                  Tata Busana Tamu
                </span>
                <h4 className="text-xl sm:text-2xl font-bold text-amber-100">
                  {content.dressCodeTitle}
                </h4>
                <p className="text-xs sm:text-sm font-sans text-stone-300 leading-relaxed pt-1 italic">
                  {content.dressCodeNote}
                </p>
              </div>
            </div>

            {/* 4 Swatch Warna Adat */}
            <div className="grid grid-cols-2 gap-2 pt-2 font-sans text-xs">
              <div className="flex items-center gap-2.5 bg-[#0a101a] p-3 rounded-xl border border-amber-500/20">
                <span className="h-5 w-5 rounded-full bg-[#8c532b] border border-amber-200 shadow-sm" />
                <span className="text-stone-300 font-medium">Batik Sogan</span>
              </div>
              <div className="flex items-center gap-2.5 bg-[#0a101a] p-3 rounded-xl border border-amber-500/20">
                <span className="h-5 w-5 rounded-full bg-[#0b1320] border border-amber-500/40 shadow-sm" />
                <span className="text-stone-300 font-medium">Midnight Navy</span>
              </div>
              <div className="flex items-center gap-2.5 bg-[#0a101a] p-3 rounded-xl border border-amber-500/20">
                <span className="h-5 w-5 rounded-full bg-[#c59b27] border border-amber-200 shadow-sm" />
                <span className="text-stone-300 font-medium">Antique Gold</span>
              </div>
              <div className="flex items-center gap-2.5 bg-[#0a101a] p-3 rounded-xl border border-amber-500/20">
                <span className="h-5 w-5 rounded-full bg-[#faf7f2] border border-stone-300 shadow-sm" />
                <span className="text-stone-300 font-medium">Gading Daluang</span>
              </div>
            </div>
          </div>
        </section>

        {/* 8. TANDHA TRESNA & KADO DIGITAL (AMPLOP DIGITAL) */}
        {(content.accountNumber1 || content.accountNumber2) && (
          <section
            className="rounded-3xl border-2 p-8 sm:p-12 shadow-xl text-center space-y-6"
            style={{ backgroundColor: card, borderColor: `${primary}35` }}
          >
            <div className="space-y-1">
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-amber-400">
                Tandha Tresna & Asih
              </span>
              <h4 className="text-2xl sm:text-3xl font-light italic" style={{ color: textColor }}>
                {content.giftInfoTitle}
              </h4>
              <p className="text-xs font-sans text-stone-300 max-w-md mx-auto pt-1">
                {content.giftNote}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto pt-2">
              {content.accountNumber1 && (
                <div className="rounded-2xl border border-amber-500/30 bg-[#0a101a] p-5 text-center space-y-2 shadow-inner">
                  <span className="text-xs font-sans font-bold tracking-widest uppercase text-amber-400">
                    {content.bankName1}
                  </span>
                  <p className="font-mono text-lg font-bold tracking-wider text-amber-100">
                    {content.accountNumber1}
                  </p>
                  <p className="text-xs font-sans text-stone-400">a.n. {content.accountHolder1}</p>
                  <button
                    type="button"
                    onClick={() => handleCopy(content.accountNumber1, "rek1")}
                    className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-950/40 px-4 py-1.5 text-xs font-sans font-medium text-amber-200 hover:bg-amber-900/60 transition-colors"
                  >
                    {copiedRek1 ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-amber-300" />
                        <span className="text-amber-200">Nomor Tersalin!</span>
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
                <div className="rounded-2xl border border-amber-500/30 bg-[#0a101a] p-5 text-center space-y-2 shadow-inner">
                  <span className="text-xs font-sans font-bold tracking-widest uppercase text-amber-400">
                    {content.bankName2}
                  </span>
                  <p className="font-mono text-lg font-bold tracking-wider text-amber-100">
                    {content.accountNumber2}
                  </p>
                  <p className="text-xs font-sans text-stone-400">a.n. {content.accountHolder2}</p>
                  <button
                    type="button"
                    onClick={() => handleCopy(content.accountNumber2, "rek2")}
                    className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-950/40 px-4 py-1.5 text-xs font-sans font-medium text-amber-200 hover:bg-amber-900/60 transition-colors"
                  >
                    {copiedRek2 ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-amber-300" />
                        <span className="text-amber-200">Nomor Tersalin!</span>
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

        {/* 9. ATUR PANUWUN & BAGIKAN TAUTAN */}
        <footer
          className="rounded-3xl border p-8 sm:p-12 text-center space-y-6 shadow-md"
          style={{ backgroundColor: card, borderColor: `${primary}30` }}
        >
          <div className="space-y-3 max-w-lg mx-auto">
            <p className="text-sm italic text-stone-300 leading-relaxed">
              Matur nuwun ingkang tanpa pepindhan awit saking sih kawigatosan, karawuhan, saha donga pangestu panjenengan sedaya.
            </p>
            <div className="pt-2">
              <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-amber-400/80">
                Atur Panuwun Saking Panuntun,
              </span>
              <h4 className="text-2xl sm:text-3xl font-light italic pt-1" style={{ color: textColor }}>
                {content.groomName?.split(" ")[0]} & {content.brideName?.split(" ")[0]}
              </h4>
              <p className="font-sans text-xs text-stone-400 pt-1">
                Keluarga Ageng Bpk. K.R.T. Dananjaya & Bpk. Dr. H. Suryonegoro
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-amber-500/20">
            <button
              type="button"
              onClick={() => handleCopy(typeof window !== "undefined" ? window.location.href : "", "link")}
              className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-sans font-medium text-amber-200 border border-amber-500/40 hover:bg-amber-950/60 transition-all"
            >
              {copiedLink ? (
                <>
                  <Check className="h-3.5 w-3.5 text-amber-400" />
                  <span>Tautan Berhasil Disalin!</span>
                </>
              ) : (
                <>
                  <Share2 className="h-3.5 w-3.5" />
                  <span>Bagikan Tautan Undangan</span>
                </>
              )}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

export function HeritageWeddingTemplate({
  data,
  className,
}: HeritageWeddingTemplateProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0b1320]" />}>
      <HeritageWeddingTemplateInner data={data} className={className} />
    </Suspense>
  );
}
