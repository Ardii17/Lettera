"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import {
  Heart,
  Calendar,
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
  bgMusicUrl: "https://cdn.pixabay.com/download/audio/2022/11/06/audio_c3c3167123.mp3",
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

  // Nama tamu undangan
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

  // Status undangan terbuka/tertutup
  const [isOpened, setIsOpened] = useState<boolean>(!shouldStartClosed);

  // Audio Musik Pernikahan
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
      const target = document.getElementById("wedding-main-content");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }, 250);
  };

  // State Salin Rekening 1 & 2
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

  // Countdown Timer
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

  // Palet Warna Dinamis
  const primary = content.primaryColor || "#064e3b";
  const bg = content.backgroundColor || "#f4f7f4";
  const card = content.cardColor || "#ffffff";
  const textColor = content.textColor || "#064e3b";
  const bodyText = content.bodyTextColor || "#374151";

  return (
    <div
      className={cn("relative min-h-screen font-sans selection:bg-emerald-100", className)}
      style={{ backgroundColor: bg, color: bodyText }}
    >
      {/* Audio Elemen Tersembunyi */}
      {!isThumbnail && pathname !== "/templates" && content.bgMusicUrl && (
        <audio ref={audioRef} src={content.bgMusicUrl} loop preload="auto" />
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
            className="fixed right-5 bottom-6 z-40 flex items-center gap-2 rounded-full border border-white/60 px-4 py-2.5 shadow-2xl backdrop-blur-md transition-all hover:scale-105"
            style={{ backgroundColor: primary, color: "#ffffff" }}
            aria-label={isPlaying ? "Jeda musik" : "Putar musik"}
          >
            <Disc3 className={cn("h-4 w-4", isPlaying && "animate-spin text-amber-300")} />
            <span className="text-xs font-semibold pr-1">
              {isPlaying ? "Alunan Pernikahan" : "Putar Musik"}
            </span>
            {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          </button>
        )}

      {/* ========================================================================= */}
      {/* 1. AMPLOP BOTANIKAL KERAJAAN BERSEGEL LILIN MONOGRAM (HERO / COVER) */}
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
          background: `radial-gradient(ellipse at center, ${primary}18 0%, ${bg} 100%)`,
        }}
      >
        {/* Ornamen Daun Botani Latar Belakang */}
        <div className="pointer-events-none absolute inset-0 opacity-15">
          <div className="absolute top-10 left-10 h-32 w-32 rounded-full border-4 border-emerald-800" />
          <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full border-2 border-emerald-900" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-lg flex-col items-center space-y-6">
          {/* Badge Tagline Pernikahan */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/85 px-4 py-1.5 text-[11px] font-semibold tracking-widest uppercase text-emerald-900 shadow-sm backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-amber-600" />
            <span>{content.weddingTagline || "The Holy Matrimony & Wedding Reception"}</span>
          </div>

          {/* Kartu Amplop Linen Kerajaan */}
          <div
            className="relative w-full rounded-3xl border-2 p-7 sm:p-9 shadow-2xl text-center backdrop-blur-md overflow-hidden"
            style={{
              backgroundColor: card,
              borderColor: `${primary}35`,
            }}
          >
            {/* Border ornamen sudut emas */}
            <div className="absolute top-3 left-3 h-4 w-4 border-t-2 border-l-2 border-amber-600" />
            <div className="absolute top-3 right-3 h-4 w-4 border-t-2 border-r-2 border-amber-600" />
            <div className="absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-amber-600" />
            <div className="absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-amber-600" />

            {/* Inisial & Judul Pasangan */}
            <div className="pt-2 space-y-2">
              <p className="font-serif text-sm italic tracking-widest text-stone-500 uppercase">
                Undangan Pernikahan
              </p>
              <h1
                className="font-serif text-3xl sm:text-4xl font-extrabold tracking-wide"
                style={{ color: textColor }}
              >
                {content.groomName?.split(" ")[0]} & {content.brideName?.split(" ")[0]}
              </h1>
              <p className="text-xs font-serif italic text-stone-600">
                {content.eventDate || "Sabtu, 28 Desember 2024"}
              </p>
            </div>

            {/* Kotak Nama Tamu Yang Berbahagia */}
            <div className="my-6 rounded-2xl border border-dashed border-emerald-300 bg-emerald-50/50 p-4 space-y-1">
              <p className="text-[10px] font-bold tracking-widest uppercase text-stone-400">
                Kepada Yth. Bapak/Ibu/Saudara/i:
              </p>
              <h3
                className="font-serif text-xl sm:text-2xl font-bold tracking-wide"
                style={{ color: primary }}
              >
                {recipientName}
              </h3>
              <p className="text-[10px] text-stone-500 italic">
                Tanpa mengurangi rasa hormat, kami mengundang Anda untuk hadir
              </p>
            </div>

            {/* Segel Lilin Monogram 3D */}
            <div className="flex flex-col items-center justify-center pt-1 pb-2">
              <div
                className="group relative flex h-24 w-24 items-center justify-center rounded-full shadow-2xl border-4 border-amber-900/25 transition-transform duration-300"
                style={{
                  backgroundColor: primary,
                  boxShadow: `0 10px 25px -5px ${primary}80, inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -3px 6px rgba(0,0,0,0.5)`,
                }}
              >
                <div className="absolute inset-2 rounded-full border border-white/30 flex items-center justify-center">
                  <div className="text-center px-1">
                    <span className="font-serif text-lg font-extrabold tracking-wider text-amber-100 drop-shadow">
                      {content.waxSealMonogram || "R & A"}
                    </span>
                    <p className="text-[7px] tracking-widest uppercase text-amber-200/90 font-mono">
                      Wedding
                    </p>
                  </div>
                </div>
              </div>

              {/* Tombol Interaktif Buka Undangan */}
              {isThumbnail ? (
                <div
                  className="mt-6 inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-xs font-semibold text-white shadow"
                  style={{ backgroundColor: primary }}
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>Undangan Botanical</span>
                </div>
              ) : !isOpened ? (
                <button
                  type="button"
                  onClick={handleOpenInvitation}
                  className="mt-6 inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 text-sm font-semibold tracking-wide text-white shadow-xl transition-all duration-300 hover:scale-105 active:scale-95"
                  style={{ backgroundColor: primary }}
                >
                  <Mail className="h-4 w-4" />
                  <span>Buka Undangan Pernikahan</span>
                </button>
              ) : (
                <div
                  className="mt-4 flex items-center justify-center gap-1.5 text-xs font-semibold"
                  style={{ color: primary }}
                >
                  <Sparkles className="h-4 w-4 text-amber-600" />
                  <span>Undangan Telah Terbuka</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. ISI UTAMA UNDANGAN PERNIKAHAN */}
      {/* ========================================================================= */}
      <div
        id="wedding-main-content"
        className="mx-auto max-w-3xl px-4 py-12 sm:px-6 space-y-16"
      >
        {/* Lembar Kartu Utama */}
        <article
          className="relative rounded-3xl border-2 p-8 sm:p-14 shadow-xl space-y-12 backdrop-blur-sm"
          style={{
            backgroundColor: card,
            borderColor: `${primary}30`,
          }}
        >
          {/* Ayat Suci Pernikahan */}
          {content.holyVerseQuote && (
            <div className="text-center space-y-3 border-b border-stone-200 pb-8">
              <div className="flex items-center justify-center gap-2 text-stone-300">
                <span className="h-px w-12 bg-stone-300" />
                <Heart className="h-4 w-4 fill-current" style={{ color: primary }} />
                <span className="h-px w-12 bg-stone-300" />
              </div>
              <p className="font-serif text-sm sm:text-base italic text-stone-700 leading-relaxed max-w-xl mx-auto">
                {content.holyVerseQuote}
              </p>
            </div>
          )}

          {/* Pesan Pembuka */}
          <div className="text-center space-y-4 max-w-xl mx-auto">
            <h2 className="font-serif text-2xl sm:text-3xl font-bold" style={{ color: textColor }}>
              Assalamu’alaikum Wr. Wb.
            </h2>
            <div className="space-y-4 font-serif text-base sm:text-lg leading-relaxed text-stone-700">
              {paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>

          {/* Profil Kedua Mempelai */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center text-center py-4 border-y border-stone-200">
            {/* Mempelai Pria */}
            <div className="space-y-2">
              <p className="text-[11px] font-bold tracking-widest uppercase text-stone-400">
                Mempelai Pria
              </p>
              <h3
                className="font-serif text-2xl sm:text-3xl font-extrabold"
                style={{ color: textColor }}
              >
                {content.groomName}
              </h3>
              {content.groomParents && (
                <p className="font-serif text-xs italic text-stone-600 max-w-xs mx-auto">
                  {content.groomParents}
                </p>
              )}
            </div>

            {/* Mempelai Wanita */}
            <div className="space-y-2">
              <p className="text-[11px] font-bold tracking-widest uppercase text-stone-400">
                Mempelai Wanita
              </p>
              <h3
                className="font-serif text-2xl sm:text-3xl font-extrabold"
                style={{ color: textColor }}
              >
                {content.brideName}
              </h3>
              {content.brideParents && (
                <p className="font-serif text-xs italic text-stone-600 max-w-xs mx-auto">
                  {content.brideParents}
                </p>
              )}
            </div>
          </div>

          {/* ======================================================================= */}
          {/* 3. WIDGET COUNTDOWN TIMER INTERAKTIF */}
          {/* ======================================================================= */}
          <div className="rounded-2xl border p-6 text-center space-y-4 bg-stone-50/70 border-stone-200">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-500">
              <Calendar className="h-3.5 w-3.5" style={{ color: primary }} />
              <span>Menghitung Hari Menuju Ikrar Suci</span>
            </div>

            <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
              <div className="rounded-xl bg-white border border-stone-200 p-3 shadow-sm">
                <span className="font-serif text-2xl sm:text-3xl font-bold" style={{ color: primary }}>
                  {timeLeft.days}
                </span>
                <p className="text-[10px] sm:text-xs font-semibold uppercase text-stone-500 mt-1">Hari</p>
              </div>
              <div className="rounded-xl bg-white border border-stone-200 p-3 shadow-sm">
                <span className="font-serif text-2xl sm:text-3xl font-bold" style={{ color: primary }}>
                  {timeLeft.hours}
                </span>
                <p className="text-[10px] sm:text-xs font-semibold uppercase text-stone-500 mt-1">Jam</p>
              </div>
              <div className="rounded-xl bg-white border border-stone-200 p-3 shadow-sm">
                <span className="font-serif text-2xl sm:text-3xl font-bold" style={{ color: primary }}>
                  {timeLeft.minutes}
                </span>
                <p className="text-[10px] sm:text-xs font-semibold uppercase text-stone-500 mt-1">Menit</p>
              </div>
              <div className="rounded-xl bg-white border border-stone-200 p-3 shadow-sm">
                <span className="font-serif text-2xl sm:text-3xl font-bold" style={{ color: primary }}>
                  {timeLeft.seconds}
                </span>
                <p className="text-[10px] sm:text-xs font-semibold uppercase text-stone-500 mt-1">Detik</p>
              </div>
            </div>
          </div>

          {/* ======================================================================= */}
          {/* 4. RUNDOWN SUSUNAN ACARA (TIMELINE) */}
          {/* ======================================================================= */}
          <div className="space-y-6">
            <div className="text-center space-y-1">
              <p className="text-xs font-bold font-mono tracking-widest uppercase" style={{ color: primary }}>
                Susunan Rangkaian Acara
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold" style={{ color: textColor }}>
                Waktu & Tempat Pelaksanaan
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {/* Sesi 1 */}
              <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm space-y-2 text-center">
                <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-emerald-50 text-emerald-800 font-bold text-xs">
                  1
                </div>
                <h4 className="font-serif font-bold text-base text-stone-900">
                  {content.session1Title || "Akad Nikah"}
                </h4>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50/80 px-2.5 py-1 rounded-full">
                  <Clock className="h-3 w-3" />
                  <span>{content.session1Time || "08.00 - 10.00 WIB"}</span>
                </div>
                {content.session1Desc && (
                  <p className="text-xs text-stone-600 leading-relaxed pt-1">
                    {content.session1Desc}
                  </p>
                )}
              </div>

              {/* Sesi 2 */}
              <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm space-y-2 text-center">
                <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-emerald-50 text-emerald-800 font-bold text-xs">
                  2
                </div>
                <h4 className="font-serif font-bold text-base text-stone-900">
                  {content.session2Title || "Resepsi Pernikahan"}
                </h4>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50/80 px-2.5 py-1 rounded-full">
                  <Clock className="h-3 w-3" />
                  <span>{content.session2Time || "11.00 - 14.00 WIB"}</span>
                </div>
                {content.session2Desc && (
                  <p className="text-xs text-stone-600 leading-relaxed pt-1">
                    {content.session2Desc}
                  </p>
                )}
              </div>

              {/* Sesi 3 */}
              <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm space-y-2 text-center">
                <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-emerald-50 text-emerald-800 font-bold text-xs">
                  3
                </div>
                <h4 className="font-serif font-bold text-base text-stone-900">
                  {content.session3Title || "Sunset Celebration"}
                </h4>
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50/80 px-2.5 py-1 rounded-full">
                  <Clock className="h-3 w-3" />
                  <span>{content.session3Time || "16.00 - 18.00 WIB"}</span>
                </div>
                {content.session3Desc && (
                  <p className="text-xs text-stone-600 leading-relaxed pt-1">
                    {content.session3Desc}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ======================================================================= */}
          {/* 5. LOKASI VENUE & TOMBOL GOOGLE MAPS */}
          {/* ======================================================================= */}
          <div className="rounded-2xl border border-stone-200 bg-stone-50/70 p-6 sm:p-8 text-center space-y-4">
            <div className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-emerald-100 text-emerald-800 mb-1">
              <MapPin className="h-5 w-5" />
            </div>
            <div className="space-y-1 max-w-md mx-auto">
              <h4 className="font-serif text-xl font-bold text-stone-900">
                {content.venueName}
              </h4>
              <p className="font-serif text-xs sm:text-sm text-stone-600 leading-relaxed">
                {content.venueAddress}
              </p>
            </div>

            {content.mapsUrl && (
              <div className="pt-2">
                <a
                  href={content.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-semibold text-white shadow-md transition-all duration-300 hover:scale-105"
                  style={{ backgroundColor: primary }}
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Buka Petunjuk Arah (Google Maps)</span>
                </a>
              </div>
            )}
          </div>

          {/* ======================================================================= */}
          {/* 6. GALERI FOTO PREWEDDING (3 FOTO MEWAH) */}
          {/* ======================================================================= */}
          {(content.photo1Url || content.photo2Url || content.photo3Url) && (
            <div className="space-y-6 pt-4">
              <div className="text-center space-y-1">
                <p className="text-xs font-bold font-mono tracking-widest uppercase" style={{ color: primary }}>
                  Galeri Momen Kasih
                </p>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold" style={{ color: textColor }}>
                  Our Prewedding Journey
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {content.photo1Url && (
                  <div className="group rounded-2xl border-4 bg-white p-3 shadow-lg transition-transform hover:-translate-y-1 duration-300 border-stone-200">
                    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-stone-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={content.photo1Url}
                        alt={content.photo1Caption || "Prewedding photo 1"}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    {content.photo1Caption && (
                      <p className="mt-2.5 text-center font-serif text-xs italic text-stone-600">
                        &ldquo;{content.photo1Caption}&rdquo;
                      </p>
                    )}
                  </div>
                )}

                {content.photo2Url && (
                  <div className="group rounded-2xl border-4 bg-white p-3 shadow-lg transition-transform hover:-translate-y-1 duration-300 border-stone-200">
                    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-stone-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={content.photo2Url}
                        alt={content.photo2Caption || "Prewedding photo 2"}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    {content.photo2Caption && (
                      <p className="mt-2.5 text-center font-serif text-xs italic text-stone-600">
                        &ldquo;{content.photo2Caption}&rdquo;
                      </p>
                    )}
                  </div>
                )}

                {content.photo3Url && (
                  <div className="group rounded-2xl border-4 bg-white p-3 shadow-lg transition-transform hover:-translate-y-1 duration-300 border-stone-200">
                    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-stone-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={content.photo3Url}
                        alt={content.photo3Caption || "Prewedding photo 3"}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    {content.photo3Caption && (
                      <p className="mt-2.5 text-center font-serif text-xs italic text-stone-600">
                        &ldquo;{content.photo3Caption}&rdquo;
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ======================================================================= */}
          {/* 7. DRESS CODE & PALET WARNA BUSANA */}
          {/* ======================================================================= */}
          {(content.dressCodeTitle || content.dressCodeNote) && (
            <div className="rounded-2xl border border-stone-200 bg-white p-6 text-center space-y-3 shadow-sm">
              <p className="text-[11px] font-bold uppercase tracking-widest text-stone-400">
                Panduan Busana Tamu
              </p>
              <h4 className="font-serif text-xl font-bold text-stone-900">
                {content.dressCodeTitle || "Botanical Formal / Royal Emerald & Gold"}
              </h4>
              {content.dressCodeNote && (
                <p className="text-xs sm:text-sm text-stone-600 font-serif italic max-w-md mx-auto">
                  {content.dressCodeNote}
                </p>
              )}

              {/* 4 Swatch Palet Warna */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <div className="flex flex-col items-center gap-1">
                  <span className="h-7 w-7 rounded-full bg-emerald-900 border border-stone-300 shadow-sm" />
                  <span className="text-[9px] font-mono text-stone-500">Emerald</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="h-7 w-7 rounded-full bg-emerald-600 border border-stone-300 shadow-sm" />
                  <span className="text-[9px] font-mono text-stone-500">Sage</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="h-7 w-7 rounded-full bg-amber-200 border border-stone-300 shadow-sm" />
                  <span className="text-[9px] font-mono text-stone-500">Champagne</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="h-7 w-7 rounded-full bg-stone-100 border border-stone-300 shadow-sm" />
                  <span className="text-[9px] font-mono text-stone-500">Pearl White</span>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================================= */}
          {/* 8. TANDA KASIH & AMPLOP DIGITAL */}
          {/* ======================================================================= */}
          {(content.accountNumber1 || content.accountNumber2) && (
            <div className="rounded-2xl border-2 border-dashed border-emerald-300 bg-emerald-50/40 p-6 sm:p-8 text-center space-y-6">
              <div className="space-y-1">
                <h4 className="font-serif text-xl font-bold text-stone-900">
                  {content.giftInfoTitle || "Tanda Kasih & Doa Restu (Amplop Digital)"}
                </h4>
                <p className="text-xs text-stone-500 max-w-md mx-auto">
                  Bagi keluarga dan sahabat yang berkenan memberikan tanda kasih, dapat mengirimkan melalui rekening berikut:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto">
                {/* Rekening 1 */}
                {content.accountNumber1 && (
                  <div className="rounded-xl border border-stone-200 bg-white p-4 text-center space-y-2 shadow-sm">
                    <p className="text-xs font-bold tracking-widest text-emerald-800 uppercase">
                      {content.bankName1 || "BCA"}
                    </p>
                    <p className="font-mono text-base font-bold text-stone-900">
                      {content.accountNumber1}
                    </p>
                    <p className="text-xs text-stone-500">a.n. {content.accountHolder1}</p>
                    <button
                      type="button"
                      onClick={() => handleCopy(content.accountNumber1, "rek1")}
                      className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-stone-300 px-3 py-1 text-[11px] font-semibold text-stone-700 hover:bg-stone-50 transition-colors"
                    >
                      {copiedRek1 ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-600" />
                          <span className="text-emerald-700">Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Salin No. Rekening</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* Rekening 2 */}
                {content.accountNumber2 && (
                  <div className="rounded-xl border border-stone-200 bg-white p-4 text-center space-y-2 shadow-sm">
                    <p className="text-xs font-bold tracking-widest text-emerald-800 uppercase">
                      {content.bankName2 || "Bank Mandiri"}
                    </p>
                    <p className="font-mono text-base font-bold text-stone-900">
                      {content.accountNumber2}
                    </p>
                    <p className="text-xs text-stone-500">a.n. {content.accountHolder2}</p>
                    <button
                      type="button"
                      onClick={() => handleCopy(content.accountNumber2, "rek2")}
                      className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-stone-300 px-3 py-1 text-[11px] font-semibold text-stone-700 hover:bg-stone-50 transition-colors"
                    >
                      {copiedRek2 ? (
                        <>
                          <Check className="h-3 w-3 text-emerald-600" />
                          <span className="text-emerald-700">Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          <span>Salin No. Rekening</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Penutup Doa & Hormat Kami */}
          <footer className="border-t border-stone-200 pt-8 text-center space-y-2">
            <p className="font-serif text-sm italic text-stone-500">
              Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
            </p>
            <p className="font-serif text-xs uppercase tracking-widest text-stone-400 pt-2">
              Hormat Kami yang Mengundang,
            </p>
            <p
              className="font-serif text-2xl font-bold tracking-wide sm:text-3xl"
              style={{ color: textColor }}
            >
              {content.groomName?.split(" ")[0]} & {content.brideName?.split(" ")[0]}
            </p>
            <p className="font-serif text-xs text-stone-500">Beserta Keluarga Besar Kedua Mempelai</p>
          </footer>
        </article>

        {/* Bagikan Undangan */}
        <section
          className="rounded-3xl border-2 p-6 sm:p-8 text-center space-y-4 shadow-sm"
          style={{ backgroundColor: card, borderColor: `${primary}30` }}
        >
          <div className="max-w-md mx-auto space-y-1.5">
            <h3 className="font-serif text-lg font-bold sm:text-xl" style={{ color: textColor }}>
              Simpan & Bagikan Undangan Ini
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
              Tautan ini dapat diakses kapan saja untuk memeriksa rute maps, jadwal acara, dan countdown hari H.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => handleCopy(typeof window !== "undefined" ? window.location.href : "", "link")}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-semibold text-white shadow-md transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: primary }}
            >
              {copiedLink ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Tautan Undangan Berhasil Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Salin Tautan Undangan</span>
                </>
              )}
            </button>
          </div>
        </section>
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
