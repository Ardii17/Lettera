"use client";

import { useEffect, useMemo, useRef, useState, Suspense } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import {
  Heart,
  Pause,
  Play,
  Mail,
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  Copy,
  Check,
  Share2,
  Maximize2,
  X,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { LetterContent } from "@/types/letter";
import { withDefaults } from "../utils";

const defaults = {
  recipientName: "Bapak / Ibu / Saudara/i",
  weddingTitle: "The Wedding of Dimas & Annisa",
  groomNickname: "Dimas",
  brideNickname: "Annisa",
  weddingDate: "2026-10-24",
  heroImage:
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
  weddingQuote:
    "Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.",
  quoteSource: "QS. Ar-Rum: 21",

  groomFullName: "Dimas Arya Prasetya, S.T.",
  groomParents:
    "Putra pertama dari Bpk. Ir. Bambang Prasetya & Ibu Hj. Sri Wahyuni",
  groomPhoto:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
  groomInstagram: "@dimasarya",

  brideFullName: "Annisa Putri Larasati, S.Ds.",
  brideParents:
    "Putri kedua dari Bpk. Drs. Hendro Larasati & Ibu Dra. Ratna Dewi",
  bridePhoto:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
  brideInstagram: "@annisalarasati",

  akadTitle: "Akad Nikah",
  akadDate: "Sabtu, 24 Oktober 2026",
  akadTime: "08.00 - 10.00 WIB",
  akadLocation: "Masjid Agung Al-Barkah",
  akadAddress: "Jl. Veteran No. 45, Kebayoran Baru, Jakarta Selatan",
  akadMapsUrl: "https://maps.google.com/?q=Jakarta",

  resepsiTitle: "Resepsi Pernikahan",
  resepsiDate: "Sabtu, 24 Oktober 2026",
  resepsiTime: "11.00 - 15.00 WIB",
  resepsiLocation: "Grand Ballroom Hotel Horison",
  resepsiAddress: "Jl. Jenderal Sudirman Kav. 18, Jakarta Pusat",
  resepsiMapsUrl: "https://maps.google.com/?q=Jakarta",

  storyTitle: "Perjalanan Kisah Kita",
  story1Date: "12 Januari 2021",
  story1Title: "Pertemuan Pertama",
  story1Desc:
    "Bertemu tanpa sengaja dalam sebuah seminar kampus, berlanjut obrolan hangat tentang mimpi dan harapan masa depan.",
  story2Date: "18 Juni 2023",
  story2Title: "Komitmen Bersama",
  story2Desc:
    "Memutuskan untuk melangkah bersama melewati suka dan duka, saling menguatkan di setiap tahapan kehidupan.",
  story3Date: "15 Januari 2026",
  story3Title: "Menuju Ikatan Suci",
  story3Desc:
    "Dengan restu kedua orang tua dan keluarga besar, kami memantapkan hati untuk mengikat janji suci sehidup semati.",

  galleryTitle: "Galeri Kenangan Indah",
  galleryImg1:
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80",
  galleryImg2:
    "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80",
  galleryImg3:
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80",
  galleryImg4:
    "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80",

  giftTitle: "Tanda Kasih & Hadiah Pernikahan",
  giftNote:
    "Doa restu Anda adalah karunia terindah bagi kami. Namun jika Anda bermaksud memberikan tanda kasih secara digital, Anda dapat menyalurkannya melalui nomor rekening di bawah ini.",
  bankName1: "BCA",
  bankAccount1: "8271928374",
  bankHolder1: "Dimas Arya Prasetya",
  bankName2: "Mandiri",
  bankAccount2: "1370019283746",
  bankHolder2: "Annisa Putri Larasati",
  giftAddress:
    "Jl. Veteran No. 45, RT 02/RW 04, Kebayoran Baru, Jakarta Selatan 12120 (Penerima: Dimas & Annisa)",

  primaryColor: "#b48c36",
  backgroundColor: "#faf7f2",
  cardColor: "#ffffff",
  textColor: "#2a241e",
  bodyTextColor: "#524b43",
  musicTitle: "",
  bgMusicUrl: "",
};

interface WeddingTemplateProps {
  data: LetterContent;
  className?: string;
}

function WeddingTemplateInner({ data, className }: WeddingTemplateProps) {
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

  // Status dibuka:
  // - Pada thumbnail & editor side preview: langsung dibuka (true)
  // - Pada pratinjau penuh, surat publik (/letter/...), atau pratinjau detail: dimulai dari tertutup (false)
  const shouldStartClosed =
    (isPublicLetter || isFullPreview || isDetailPage) &&
    !isThumbnail &&
    !isEditorPreview;

  // 1. Ambil Nama Tamu dari URL Query (misal: ?to=Nama+Tamu atau ?guest=Nama atau ?nama=Nama)
  const [guestName, setGuestName] = useState<string>(content.recipientName);
  useEffect(() => {
    // Prioritas dari Next.js searchParams
    const queryName =
      searchParams?.get("to") ||
      searchParams?.get("guest") ||
      searchParams?.get("nama") ||
      searchParams?.get("u");

    if (queryName && queryName.trim().length > 0) {
      setGuestName(queryName.trim());
      return;
    }

    // Fallback baca langsung window.location.search jika render sisi client
    if (typeof window !== "undefined") {
      const sp = new URLSearchParams(window.location.search);
      const directParam =
        sp.get("to") || sp.get("guest") || sp.get("nama") || sp.get("u");
      if (directParam && directParam.trim().length > 0) {
        setGuestName(directParam.trim());
        return;
      }
    }

    setGuestName(content.recipientName || "Bapak / Ibu / Saudara/i");
  }, [searchParams, content.recipientName]);

  // 2. Status Buka Undangan & Pemutar Musik
  const [isOpened, setIsOpened] = useState(!shouldStartClosed);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isThumbnail || isEditorPreview) {
      setIsOpened(true);
    }
  }, [isThumbnail, isEditorPreview]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleOpenInvitation = () => {
    setIsOpened(true);
    // Jalankan pemutaran musik begitu tamu menekan tombol buka
    if (content.bgMusicUrl && audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
    // Scroll lembut ke section pertama
    setTimeout(() => {
      document
        .getElementById("wedding-main-content")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  // 3. Countdown Timer Realtime
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date(`${content.weddingDate}T09:00:00`).getTime();
    if (Number.isNaN(targetDate)) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = targetDate - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [content.weddingDate]);

  // 4. Modal Pratinjau Foto (Lightbox)
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // 5. Salin Rekening & Feedback
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(id);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  // 6. Alat Generator Tautan Tamu Khusus
  const [newGuestInput, setNewGuestInput] = useState("");
  const [copiedGuestLink, setCopiedGuestLink] = useState(false);
  const [currentOrigin, setCurrentOrigin] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentOrigin(window.location.origin + window.location.pathname);
    }
  }, []);

  const generatedCustomUrl = useMemo(() => {
    const cleanGuest = newGuestInput.trim();
    if (!currentOrigin || !cleanGuest) return "";
    return `${currentOrigin}?to=${encodeURIComponent(cleanGuest)}`;
  }, [currentOrigin, newGuestInput]);

  const handleCopyGuestLink = () => {
    const targetUrl = generatedCustomUrl || currentOrigin;
    if (!targetUrl) return;
    navigator.clipboard.writeText(targetUrl);
    setCopiedGuestLink(true);
    setTimeout(() => setCopiedGuestLink(false), 2500);
  };

  const handleShareWhatsapp = () => {
    const guestLabel = newGuestInput.trim() || "Bapak/Ibu/Saudara/i";
    const targetUrl = generatedCustomUrl || currentOrigin;
    const message = `Kepada Yth. ${guestLabel},\n\nTanpa mengurangi rasa hormat, kami mengundang Anda untuk menghadiri momen bahagia kami:\n\n*${content.weddingTitle}*\n\nBuka tautan undangan digital Anda di sini:\n${targetUrl}\n\nMerupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.\n\nTerima kasih.`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  // Warna dinamis
  const primary = content.primaryColor || "#b48c36";
  const bg = content.backgroundColor || "#faf7f2";
  const card = content.cardColor || "#ffffff";
  const textColor = content.textColor || "#2a241e";
  const bodyText = content.bodyTextColor || "#524b43";

  const galleryList = [
    content.galleryImg1,
    content.galleryImg2,
    content.galleryImg3,
    content.galleryImg4,
  ].filter(Boolean);

  return (
    <div
      className={cn("relative min-h-screen font-sans selection:bg-amber-200", className)}
      style={{ backgroundColor: bg, color: bodyText }}
    >
      {/* Audio Elemen Tersembunyi (hanya jika ada musik dan bukan thumbnail/katalog) */}
      {!isThumbnail && pathname !== "/templates" && content.bgMusicUrl && (
        <audio ref={audioRef} src={content.bgMusicUrl} loop preload="none" />
      )}

      {/* Floating Music Button (Hanya tampil pada detail pratinjau / surat publik, tidak pernah di halaman katalog) */}
      {!isThumbnail && !isEditorPreview && pathname !== "/templates" && (isPublicLetter || isFullPreview || isDetailPage) && content.bgMusicUrl && isOpened && (
        <button
          type="button"
          onClick={toggleMusic}
          className="fixed right-5 bottom-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-white/40 shadow-xl transition-all hover:scale-105"
          style={{ backgroundColor: primary, color: "#ffffff" }}
          aria-label={isPlaying ? "Jeda musik" : "Putar musik"}
        >
          {isPlaying ? (
            <Pause className="h-5 w-5 animate-pulse" />
          ) : (
            <Play className="h-5 w-5 ml-0.5" />
          )}
        </button>
      )}

      {/* ========================================================================= */}
      {/* 1. COVER SCREEN PEMBUKA / AMPLOP INTERAKTIF */}
      {/* ========================================================================= */}
      <section
        className={cn(
          "relative flex w-full flex-col items-center justify-center overflow-hidden px-4 text-center transition-all duration-700",
          !isOpened && (isPublicLetter || isFullPreview)
            ? "fixed inset-0 z-50 min-h-screen py-12"
            : !isOpened
              ? "relative min-h-[500px] py-12"
              : "min-h-[500px] sm:min-h-screen py-16",
        )}
        style={{
          backgroundImage: content.heroImage
            ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.7)), url(${content.heroImage})`
            : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: content.heroImage ? "#ffffff" : textColor,
        }}
      >
        <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center space-y-6">
          {/* Monogram Inisial */}
          <div
            className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/60 bg-white/10 backdrop-blur-md shadow-lg"
            style={{ borderColor: primary }}
          >
            <span
              className="font-serif text-2xl font-bold tracking-widest"
              style={{ color: content.heroImage ? "#ffffff" : primary }}
            >
              {content.groomNickname?.charAt(0)} &amp; {content.brideNickname?.charAt(0)}
            </span>
          </div>

          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-white/80">
            The Wedding Celebration
          </p>

          <h1 className="font-serif text-3xl font-bold tracking-tight text-white sm:text-5xl">
            {content.groomNickname} &amp; {content.brideNickname}
          </h1>

          <p className="text-sm font-light tracking-widest text-white/90">
            {content.akadDate}
          </p>

          {/* KOTAK PENERIMA KHUSUS DARI QUERY PARAMETER URL (?to=NamaTamu) */}
          <div className="w-full max-w-md rounded-2xl border border-white/30 bg-white/15 p-6 backdrop-blur-md shadow-2xl text-white">
            <p className="text-xs tracking-wider uppercase text-white/75">
              Kepada Yth. Bapak/Ibu/Saudara/i:
            </p>
            <h2 className="mt-2 font-serif text-2xl font-bold tracking-wide text-amber-200 sm:text-3xl">
              {guestName}
            </h2>
            <p className="mt-1.5 text-[11px] text-white/70 italic">
              Mohon maaf bila ada kesalahan penulisan nama/gelar
            </p>

            {isThumbnail ? (
              <div
                className="mt-5 inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-xs font-semibold text-white shadow"
                style={{ backgroundColor: primary }}
              >
                <Mail className="h-3.5 w-3.5" />
                <span>Undangan Pernikahan</span>
              </div>
            ) : !isOpened ? (
              <button
                type="button"
                onClick={handleOpenInvitation}
                className="mt-6 inline-flex items-center gap-2.5 rounded-full px-7 py-3 text-sm font-semibold tracking-wide text-white shadow-xl transition-all hover:scale-105"
                style={{ backgroundColor: primary }}
              >
                <Mail className="h-4 w-4" />
                <span>Buka Undangan</span>
              </button>
            ) : (
              <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-amber-200 font-medium">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Undangan Terbuka</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* KONTEN UTAMA UNDANGAN (MUNCUL SETELAH DIBUKA) */}
      {/* ========================================================================= */}
      <div id="wedding-main-content" className="mx-auto max-w-4xl px-4 py-16 sm:px-6 space-y-24">
        {/* 2. KUTIPAN AYAT & SALAM PEMBUKA */}
        <section className="text-center space-y-6">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-amber-100/60 text-amber-800">
            <Heart className="h-5 w-5" style={{ color: primary }} />
          </div>

          <div className="mx-auto max-w-2xl space-y-4">
            <h2 className="font-serif text-2xl font-semibold tracking-tight sm:text-3xl" style={{ color: textColor }}>
              Assalamu’alaikum Warahmatullahi Wabarakatuh
            </h2>
            <p className="text-sm leading-relaxed sm:text-base">
              Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta’ala, kami
              bermaksud mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara
              pernikahan kami:
            </p>

            {content.weddingQuote && (
              <div
                className="my-8 rounded-2xl border p-6 text-center italic shadow-sm"
                style={{
                  backgroundColor: card,
                  borderColor: `${primary}33`,
                }}
              >
                <p className="text-sm leading-relaxed sm:text-base">&ldquo;{content.weddingQuote}&rdquo;</p>
                {content.quoteSource && (
                  <p className="mt-3 text-xs font-semibold tracking-wider not-italic" style={{ color: primary }}>
                    — {content.quoteSource}
                  </p>
                )}
              </div>
            )}
          </div>
        </section>

        {/* 3. PROFIL KEDUA MEMPELAI */}
        <section className="space-y-12">
          <div className="text-center">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: primary }}>
              Kedua Mempelai
            </p>
            <h3 className="mt-2 font-serif text-3xl font-bold tracking-tight" style={{ color: textColor }}>
              Yang Berbahagia
            </h3>
          </div>

          <div className="grid gap-12 sm:grid-cols-2 sm:gap-8 items-center">
            {/* Mempelai Pria */}
            <div
              className="flex flex-col items-center rounded-3xl border p-8 text-center shadow-sm transition-all hover:shadow-md"
              style={{ backgroundColor: card, borderColor: `${primary}30` }}
            >
              {content.groomPhoto && (
                <div
                  className="relative h-48 w-48 overflow-hidden rounded-full border-4 shadow-md mb-6"
                  style={{ borderColor: primary }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={content.groomPhoto}
                    alt={content.groomFullName}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <h4 className="font-serif text-2xl font-bold" style={{ color: textColor }}>
                {content.groomFullName}
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-ink-soft">
                {content.groomParents}
              </p>
              {content.groomInstagram && (
                <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium" style={{ color: primary }}>
                  <span>{content.groomInstagram}</span>
                </p>
              )}
            </div>

            {/* Mempelai Wanita */}
            <div
              className="flex flex-col items-center rounded-3xl border p-8 text-center shadow-sm transition-all hover:shadow-md"
              style={{ backgroundColor: card, borderColor: `${primary}30` }}
            >
              {content.bridePhoto && (
                <div
                  className="relative h-48 w-48 overflow-hidden rounded-full border-4 shadow-md mb-6"
                  style={{ borderColor: primary }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={content.bridePhoto}
                    alt={content.brideFullName}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <h4 className="font-serif text-2xl font-bold" style={{ color: textColor }}>
                {content.brideFullName}
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-ink-soft">
                {content.brideParents}
              </p>
              {content.brideInstagram && (
                <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium" style={{ color: primary }}>
                  <span>{content.brideInstagram}</span>
                </p>
              )}
            </div>
          </div>
        </section>

        {/* 4. COUNTDOWN TIMER */}
        <section
          className="rounded-3xl border p-8 text-center shadow-sm"
          style={{ backgroundColor: card, borderColor: `${primary}30` }}
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: primary }}>
            Menuju Hari Bahagia
          </p>
          <h3 className="mt-2 font-serif text-2xl font-bold sm:text-3xl" style={{ color: textColor }}>
            Menghitung Waktu
          </h3>

          <div className="mt-8 grid grid-cols-4 gap-3 sm:gap-6 max-w-lg mx-auto">
            <div className="flex flex-col items-center rounded-2xl p-4 shadow-sm" style={{ backgroundColor: bg }}>
              <span className="font-serif text-2xl font-bold sm:text-4xl" style={{ color: primary }}>
                {timeLeft.days}
              </span>
              <span className="mt-1 text-[11px] uppercase tracking-wider text-ink-muted">Hari</span>
            </div>
            <div className="flex flex-col items-center rounded-2xl p-4 shadow-sm" style={{ backgroundColor: bg }}>
              <span className="font-serif text-2xl font-bold sm:text-4xl" style={{ color: primary }}>
                {timeLeft.hours}
              </span>
              <span className="mt-1 text-[11px] uppercase tracking-wider text-ink-muted">Jam</span>
            </div>
            <div className="flex flex-col items-center rounded-2xl p-4 shadow-sm" style={{ backgroundColor: bg }}>
              <span className="font-serif text-2xl font-bold sm:text-4xl" style={{ color: primary }}>
                {timeLeft.minutes}
              </span>
              <span className="mt-1 text-[11px] uppercase tracking-wider text-ink-muted">Menit</span>
            </div>
            <div className="flex flex-col items-center rounded-2xl p-4 shadow-sm" style={{ backgroundColor: bg }}>
              <span className="font-serif text-2xl font-bold sm:text-4xl" style={{ color: primary }}>
                {timeLeft.seconds}
              </span>
              <span className="mt-1 text-[11px] uppercase tracking-wider text-ink-muted">Detik</span>
            </div>
          </div>
        </section>

        {/* 5. JADWAL ACARA (AKAD & RESEPSI) */}
        <section className="space-y-12">
          <div className="text-center">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: primary }}>
              Waktu &amp; Lokasi
            </p>
            <h3 className="mt-2 font-serif text-3xl font-bold tracking-tight" style={{ color: textColor }}>
              Rangkaian Acara
            </h3>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            {/* Acara 1: Akad Nikah */}
            <div
              className="flex flex-col justify-between rounded-3xl border p-8 shadow-sm"
              style={{ backgroundColor: card, borderColor: `${primary}30` }}
            >
              <div className="space-y-4">
                <div
                  className="inline-block rounded-full px-3.5 py-1 text-xs font-semibold tracking-wider uppercase text-white"
                  style={{ backgroundColor: primary }}
                >
                  {content.akadTitle}
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2.5 text-sm font-medium" style={{ color: textColor }}>
                    <Calendar className="h-4 w-4" style={{ color: primary }} />
                    <span>{content.akadDate}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm font-medium" style={{ color: textColor }}>
                    <Clock className="h-4 w-4" style={{ color: primary }} />
                    <span>{content.akadTime}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-line">
                  <div className="flex items-start gap-2.5 text-sm">
                    <MapPin className="h-4 w-4 shrink-0 mt-0.5" style={{ color: primary }} />
                    <div>
                      <p className="font-semibold" style={{ color: textColor }}>
                        {content.akadLocation}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                        {content.akadAddress}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {content.akadMapsUrl && (
                <div className="mt-8 pt-4">
                  <a
                    href={content.akadMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:opacity-95"
                    style={{ backgroundColor: primary }}
                  >
                    <MapPin className="h-3.5 w-3.5" />
                    <span>Buka Google Maps</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}
            </div>

            {/* Acara 2: Resepsi */}
            <div
              className="flex flex-col justify-between rounded-3xl border p-8 shadow-sm"
              style={{ backgroundColor: card, borderColor: `${primary}30` }}
            >
              <div className="space-y-4">
                <div
                  className="inline-block rounded-full px-3.5 py-1 text-xs font-semibold tracking-wider uppercase text-white"
                  style={{ backgroundColor: primary }}
                >
                  {content.resepsiTitle}
                </div>

                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2.5 text-sm font-medium" style={{ color: textColor }}>
                    <Calendar className="h-4 w-4" style={{ color: primary }} />
                    <span>{content.resepsiDate}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-sm font-medium" style={{ color: textColor }}>
                    <Clock className="h-4 w-4" style={{ color: primary }} />
                    <span>{content.resepsiTime}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-line">
                  <div className="flex items-start gap-2.5 text-sm">
                    <MapPin className="h-4 w-4 shrink-0 mt-0.5" style={{ color: primary }} />
                    <div>
                      <p className="font-semibold" style={{ color: textColor }}>
                        {content.resepsiLocation}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                        {content.resepsiAddress}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {content.resepsiMapsUrl && (
                <div className="mt-8 pt-4">
                  <a
                    href={content.resepsiMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:opacity-95"
                    style={{ backgroundColor: primary }}
                  >
                    <MapPin className="h-3.5 w-3.5" />
                    <span>Buka Google Maps</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 6. KISAH CINTA (LOVE STORY) */}
        {content.storyTitle && (
          <section className="space-y-12">
            <div className="text-center">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: primary }}>
                Love Story
              </p>
              <h3 className="mt-2 font-serif text-3xl font-bold tracking-tight" style={{ color: textColor }}>
                {content.storyTitle}
              </h3>
            </div>

            <div className="relative border-l-2 ml-4 sm:ml-32 space-y-10 pl-6 sm:pl-8" style={{ borderColor: `${primary}40` }}>
              {content.story1Title && (
                <div className="relative">
                  <div
                    className="absolute -left-[31px] sm:-left-[39px] top-1.5 h-4 w-4 rounded-full border-2 bg-white"
                    style={{ borderColor: primary }}
                  />
                  <span className="text-xs font-bold tracking-wider" style={{ color: primary }}>
                    {content.story1Date}
                  </span>
                  <h4 className="mt-1 font-serif text-lg font-bold" style={{ color: textColor }}>
                    {content.story1Title}
                  </h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                    {content.story1Desc}
                  </p>
                </div>
              )}

              {content.story2Title && (
                <div className="relative">
                  <div
                    className="absolute -left-[31px] sm:-left-[39px] top-1.5 h-4 w-4 rounded-full border-2 bg-white"
                    style={{ borderColor: primary }}
                  />
                  <span className="text-xs font-bold tracking-wider" style={{ color: primary }}>
                    {content.story2Date}
                  </span>
                  <h4 className="mt-1 font-serif text-lg font-bold" style={{ color: textColor }}>
                    {content.story2Title}
                  </h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                    {content.story2Desc}
                  </p>
                </div>
              )}

              {content.story3Title && (
                <div className="relative">
                  <div
                    className="absolute -left-[31px] sm:-left-[39px] top-1.5 h-4 w-4 rounded-full border-2 bg-white"
                    style={{ borderColor: primary }}
                  />
                  <span className="text-xs font-bold tracking-wider" style={{ color: primary }}>
                    {content.story3Date}
                  </span>
                  <h4 className="mt-1 font-serif text-lg font-bold" style={{ color: textColor }}>
                    {content.story3Title}
                  </h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                    {content.story3Desc}
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* 7. GALERI FOTO */}
        {galleryList.length > 0 && (
          <section className="space-y-8">
            <div className="text-center">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: primary }}>
                Momen Indah
              </p>
              <h3 className="mt-2 font-serif text-3xl font-bold tracking-tight" style={{ color: textColor }}>
                {content.galleryTitle || "Galeri Foto"}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {galleryList.map((imgUrl, idx) => (
                <div
                  key={imgUrl}
                  onClick={() => setPreviewImage(imgUrl)}
                  className="group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-2xl shadow-sm"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imgUrl}
                    alt={`Galeri ${idx + 1}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                    <Maximize2 className="h-6 w-6 text-white" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 8. TANDA KASIH & REKENING HADIAH (AMPLOP DIGITAL) */}
        {(content.bankAccount1 || content.bankAccount2 || content.giftAddress) && (
          <section
            className="rounded-3xl border p-8 text-center shadow-sm space-y-6"
            style={{ backgroundColor: card, borderColor: `${primary}30` }}
          >
            <div className="max-w-xl mx-auto">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: primary }}>
                Tanda Kasih
              </p>
              <h3 className="mt-2 font-serif text-2xl font-bold sm:text-3xl" style={{ color: textColor }}>
                {content.giftTitle}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-ink-soft">
                {content.giftNote}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 max-w-xl mx-auto pt-4">
              {/* Rekening 1 */}
              {content.bankAccount1 && (
                <div className="rounded-2xl border p-5 text-left shadow-sm" style={{ backgroundColor: bg, borderColor: `${primary}20` }}>
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                    Bank {content.bankName1}
                  </p>
                  <p className="mt-2 font-mono text-lg font-bold" style={{ color: textColor }}>
                    {content.bankAccount1}
                  </p>
                  <p className="text-xs text-ink-soft">a.n. {content.bankHolder1}</p>
                  <button
                    type="button"
                    onClick={() => handleCopy(content.bankAccount1, "bank1")}
                    className="mt-4 inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all"
                    style={{
                      backgroundColor: copiedAccount === "bank1" ? "#10b981" : primary,
                      color: "#ffffff",
                    }}
                  >
                    {copiedAccount === "bank1" ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        <span>Tersalin!</span>
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

              {/* Rekening 2 */}
              {content.bankAccount2 && (
                <div className="rounded-2xl border p-5 text-left shadow-sm" style={{ backgroundColor: bg, borderColor: `${primary}20` }}>
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                    Bank {content.bankName2}
                  </p>
                  <p className="mt-2 font-mono text-lg font-bold" style={{ color: textColor }}>
                    {content.bankAccount2}
                  </p>
                  <p className="text-xs text-ink-soft">a.n. {content.bankHolder2}</p>
                  <button
                    type="button"
                    onClick={() => handleCopy(content.bankAccount2, "bank2")}
                    className="mt-4 inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all"
                    style={{
                      backgroundColor: copiedAccount === "bank2" ? "#10b981" : primary,
                      color: "#ffffff",
                    }}
                  >
                    {copiedAccount === "bank2" ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        <span>Tersalin!</span>
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

            {content.giftAddress && (
              <div className="mt-6 border-t border-line pt-6 text-center max-w-md mx-auto">
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  Kirim Kado Fisik ke Alamat:
                </p>
                <p className="mt-2 text-xs leading-relaxed text-ink-soft">
                  {content.giftAddress}
                </p>
              </div>
            )}
          </section>
        )}

        {/* ========================================================================= */}
        {/* 9. ALAT GENERATOR TAUTAN TAMU (FITUR KUSTOM NAMA QUERY DOMAIN) */}
        {/* ========================================================================= */}
        <section
          className="rounded-3xl border p-6 sm:p-8 shadow-sm space-y-6"
          style={{ backgroundColor: card, borderColor: `${primary}40` }}
        >
          <div className="flex items-start gap-4">
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white shadow-md"
              style={{ backgroundColor: primary }}
            >
              <Share2 className="h-6 w-6" />
            </div>
            <div>
              <span className="text-[11px] font-semibold tracking-wider uppercase" style={{ color: primary }}>
                Fitur Kustom Nama Tamu
              </span>
              <h3 className="font-serif text-xl font-bold tracking-tight sm:text-2xl" style={{ color: textColor }}>
                Bagikan Undangan Ini ke Tamu Lain
              </h3>
              <p className="mt-1 text-xs text-ink-soft sm:text-sm">
                Ketik nama tamu di bawah untuk membuat tautan undangan personal
                otomatis (dengan parameter <code className="font-mono font-semibold">?to=NamaTamu</code>).
                Nama tersebut akan tampil anggun di sampul amplop penerima.
              </p>
            </div>
          </div>

          <div className="rounded-2xl p-4 sm:p-6 space-y-4" style={{ backgroundColor: bg }}>
            <div>
              <label htmlFor="guest-input-field" className="block text-xs font-semibold text-ink mb-1.5">
                Nama Tamu yang Diundang:
              </label>
              <div className="flex flex-col sm:flex-row gap-2.5">
                <input
                  id="guest-input-field"
                  type="text"
                  value={newGuestInput}
                  onChange={(e) => setNewGuestInput(e.target.value)}
                  placeholder="Contoh: Bpk. Hendro & Keluarga, dr. Sarah, S.Ked"
                  className="flex-1 rounded-xl border border-line bg-white px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:border-amber-600 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleCopyGuestLink}
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:opacity-95"
                  style={{
                    backgroundColor: copiedGuestLink ? "#10b981" : primary,
                  }}
                >
                  {copiedGuestLink ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      <span>Salin Tautan Tamu</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleShareWhatsapp}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-emerald-700"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Kirim WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Tampilan URL yang dihasilkan */}
            <div className="rounded-xl border border-line/60 bg-white/70 p-3 text-xs text-ink-muted">
              <span className="font-semibold text-ink">Preview Tautan: </span>
              <span className="font-mono text-[11px] text-amber-800 break-all">
                {generatedCustomUrl || "Masukkan nama tamu..."}
              </span>
            </div>
          </div>
        </section>

        {/* 10. PENUTUP & TERIMA KASIH */}
        <section className="text-center space-y-4 pt-8">
          <p className="text-sm leading-relaxed text-ink-soft">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
            Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
          </p>
          <p className="font-serif text-xl font-bold" style={{ color: textColor }}>
            Wassalamu’alaikum Warahmatullahi Wabarakatuh
          </p>
          <p className="font-serif text-2xl font-bold italic pt-4" style={{ color: primary }}>
            {content.groomNickname} &amp; {content.brideNickname}
          </p>
        </section>
      </div>

      {/* Lightbox Modal Pratinjau Foto */}
      {previewImage && (
        <div
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          <div className="relative max-h-[90vh] max-w-2xl overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewImage}
              alt="Pratinjau Foto"
              className="max-h-[85vh] w-auto object-contain"
            />
            <button
              type="button"
              onClick={() => setPreviewImage(null)}
              className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black"
              aria-label="Tutup pratinjau"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function WeddingTemplate({ data, className }: WeddingTemplateProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-amber-50/30" />}>
      <WeddingTemplateInner data={data} className={className} />
    </Suspense>
  );
}
