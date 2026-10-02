"use client";

import React, { useState, useEffect, useRef, useMemo, Suspense } from "react";
import { useSearchParams, useParams } from "next/navigation";
import type { TemplateComponentProps } from "../renderer";
import {
  Heart,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  VolumeX,
  Volume2,
  Copy,
  Check,
  ExternalLink,
  Send,
  Camera,
  Instagram,
  Gift,
  Users,
  ChevronRight,
  BookOpen,
  MessageCircle,
  Play,
  Loader2,
  Share2,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

// --- ANIMASI KELOPAK BUNGA JATUH (FLOATING PETALS) ---
function FloatingFlowerPetals() {
  const petals = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: `${(i * 5.8 + 3) % 96}%`,
      delay: `${(i * 0.7) % 6}s`,
      duration: `${7 + (i % 5) * 1.8}s`,
      size: `${12 + (i % 4) * 5}px`,
      rotation: `${(i * 35) % 360}deg`,
      opacity: 0.35 + (i % 4) * 0.15,
    }));
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden" aria-hidden="true">
      <style>{`
        @keyframes driftDown {
          0% {
            transform: translateY(-40px) rotate(0deg) translateX(0px);
            opacity: 0;
          }
          15% {
            opacity: var(--petal-op, 0.6);
          }
          85% {
            opacity: var(--petal-op, 0.6);
          }
          100% {
            transform: translateY(105vh) rotate(420deg) translateX(30px);
            opacity: 0;
          }
        }
      `}</style>
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute text-amber-200/70"
          style={
            {
              left: p.left,
              top: "-30px",
              fontSize: p.size,
              animation: `driftDown ${p.duration} linear infinite`,
              animationDelay: p.delay,
              transform: `rotate(${p.rotation})`,
              "--petal-op": p.opacity,
            } as React.CSSProperties
          }
        >
          🌸
        </div>
      ))}
    </div>
  );
}

// --- HITUNG MUNDUR LIVE ---
function CountdownTimerLive({
  targetDate,
  primaryColor,
}: {
  targetDate: string;
  primaryColor: string;
}) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    function calculate() {
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, target - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const units = [
    { label: "Hari", value: timeLeft.days },
    { label: "Jam", value: timeLeft.hours },
    { label: "Menit", value: timeLeft.minutes },
    { label: "Detik", value: timeLeft.seconds },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-lg mx-auto my-6">
      {units.map((u, i) => (
        <div
          key={i}
          className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-white/80 backdrop-blur-md shadow-md border border-amber-100"
        >
          <span
            className="text-2xl sm:text-4xl font-serif font-bold tracking-tight"
            style={{ color: primaryColor }}
          >
            {String(u.value).padStart(2, "0")}
          </span>
          <span className="text-[11px] sm:text-xs uppercase font-medium tracking-wider text-stone-500 mt-1">
            {u.label}
          </span>
        </div>
      ))}
    </div>
  );
}

// --- KOMPONEN UTAMA BERKONTEN ---
function MahligaiWeddingContent({ data }: TemplateComponentProps) {
  const searchParams = useSearchParams();
  const params = useParams();
  const letterToken = typeof params?.token === "string" ? params.token : null;
  const letter = data;

  // Nama penerima tamu dari parameter URL (?to=Nama) atau fallback
  const recipientParam = searchParams.get("to");
  const guestName =
    recipientParam && recipientParam.trim().length > 0
      ? recipientParam.trim()
      : (letter.recipientName as string) || "Tamu Undangan Terhormat";

  // State Cover Pembuka
  const [isOpened, setIsOpened] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // State Salin Nomor Rekening
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  // State Modal Lightbox Galeri Foto
  const [selectedPhoto, setSelectedPhoto] = useState<{ url: string; caption?: string } | null>(
    null,
  );

  // State Buku Tamu / RSVP
  const [rsvpList, setRsvpList] = useState<
    Array<{ name: string; presence: string; message: string; time: string }>
  >([
    {
      name: "Keluarga Besar Bpk. Hendrawan",
      presence: "Hadir",
      message:
        "Selamat atas pernikahan Rama & Shinta! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah serta senantiasa dalam berkah Allah.",
      time: "Baru saja",
    },
    {
      name: "Anissa & Dimas",
      presence: "Hadir",
      message:
        "Barakallahu lakum wa baraka alaikum! Bahagia selalu sampai kakek nenek, lancar seluruh rangkaian acaranya ya!",
      time: "1 jam lalu",
    },
    {
      name: "Rizky & Nadia",
      presence: "Hadir",
      message:
        "Masya Allah selamat menempuh hidup baru sahabatku! Doa terbaik untuk mahligai cinta kalian berdua.",
      time: "3 jam lalu",
    },
  ]);
  const [rsvpName, setRsvpName] = useState("");
  const [rsvpPresence, setRsvpPresence] = useState("Hadir");
  const [rsvpGuestCount, setRsvpGuestCount] = useState("2");
  const [rsvpMessage, setRsvpMessage] = useState("");
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [isSubmittingRsvp, setIsSubmittingRsvp] = useState(false);

  // Ambil data RSVP dari database jika sedang membuka surat dengan token
  useEffect(() => {
    if (!letterToken) return;
    let isMounted = true;

    async function loadRsvps() {
      try {
        const res = await fetch(`/api/rsvp?letterToken=${encodeURIComponent(letterToken!)}`);
        const json = await res.json();
        if (isMounted && json.ok && Array.isArray(json.data) && json.data.length > 0) {
          const dbItems = json.data.map(
            (item: {
              guest_name: string;
              presence: string;
              message: string;
              created_at: string;
            }) => ({
              name: item.guest_name,
              presence: item.presence,
              message: item.message,
              time: new Date(item.created_at).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
                year: "numeric",
              }),
            }),
          );
          setRsvpList(dbItems);
        }
      } catch (err) {
        console.error("Gagal memuat RSVP dari database:", err);
      }
    }

    loadRsvps();
    return () => {
      isMounted = false;
    };
  }, [letterToken]);

  // Palet Warna & Nilai Bawaan
  const primaryColor = (letter.primaryColor as string) || "#c59a3f";
  const backgroundColor = (letter.backgroundColor as string) || "#fdfbf7";
  const cardColor = (letter.cardColor as string) || "#ffffff";
  const textColor = (letter.textColor as string) || "#332a1f";

  // Data Gambar Ber-fallback Estetik Unsplash
  const coverPhoto =
    (letter.coverPhoto as string) ||
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80";
  const bridePhoto =
    (letter.bridePhoto as string) ||
    "https://images.unsplash.com/photo-1594552072238-b8a33785b261?auto=format&fit=crop&w=800&q=80";
  const groomPhoto =
    (letter.groomPhoto as string) ||
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80";

  const photo1 =
    (letter.photo1 as string) ||
    "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80";
  const photo2 =
    (letter.photo2 as string) ||
    "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80";
  const photo3 =
    (letter.photo3 as string) ||
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80";
  const photo4 =
    (letter.photo4 as string) ||
    "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=800&q=80";

  const audioUrl =
    (letter.audioUrl as string) ||
    "https://assets.mixkit.co/music/preview/mixkit-romantic-moment-1100.mp3";

  // Handle Buka Undangan
  const handleOpenInvitation = () => {
    setIsOpened(true);
    if (audioRef.current) {
      audioRef.current.play().then(() => setIsPlayingAudio(true)).catch(() => {
        // Autoplay may be blocked by browser policy
      });
    }
  };

  // Toggle Audio
  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current.play().then(() => setIsPlayingAudio(true)).catch(() => {});
    }
  };

  // Salin Nomor Rekening
  const copyToClipboard = (accountNumber: string, label: string) => {
    navigator.clipboard.writeText(accountNumber);
    setCopiedAccount(label);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  // Kirim RSVP ke API database
  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim() || !rsvpMessage.trim() || isSubmittingRsvp) return;

    setIsSubmittingRsvp(true);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          letterToken,
          guestName: rsvpName.trim(),
          presence: rsvpPresence,
          guestCount: rsvpGuestCount,
          message: rsvpMessage.trim(),
        }),
      });

      const json = await res.json();
      if (json.ok && json.data) {
        setRsvpList((prev) => [
          {
            name: json.data.guest_name,
            presence: json.data.presence,
            message: json.data.message,
            time: "Baru saja",
          },
          ...prev,
        ]);
      } else {
        // Fallback visual update
        setRsvpList((prev) => [
          {
            name: rsvpName.trim(),
            presence: rsvpPresence,
            message: rsvpMessage.trim(),
            time: "Baru saja",
          },
          ...prev,
        ]);
      }
      setRsvpSubmitted(true);
      setRsvpName("");
      setRsvpMessage("");
    } catch (err) {
      console.error("Gagal mengirim RSVP:", err);
      // Tetap tampilkan secara visual agar pengunjung tidak bingung
      setRsvpList((prev) => [
        {
          name: rsvpName.trim(),
          presence: rsvpPresence,
          message: rsvpMessage.trim(),
          time: "Baru saja",
        },
        ...prev,
      ]);
      setRsvpSubmitted(true);
      setRsvpName("");
      setRsvpMessage("");
    } finally {
      setIsSubmittingRsvp(false);
    }
  };

  // Scroll to section
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className="min-h-screen relative font-sans text-stone-800 antialiased overflow-x-hidden transition-colors duration-500 selection:bg-amber-200 selection:text-amber-900"
      style={{
        backgroundColor,
        color: textColor,
      }}
    >
      {/* Audio Element */}
      {audioUrl && <audio ref={audioRef} src={audioUrl} loop preload="auto" />}

      {/* Floating Petals */}
      <FloatingFlowerPetals />

      {/* ========================================================================= */}
      {/* 1. COVER SCREEN PEMBUKA INTERAKTIF (OVERLAY JIKA BELUM DIBUKA) */}
      {/* ========================================================================= */}
      {!isOpened && (
        <section className="fixed inset-0 z-50 flex flex-col items-center justify-between p-6 sm:p-10 text-center bg-gradient-to-b from-stone-50 via-amber-50/40 to-stone-100 overflow-y-auto">
          {/* Ornamen Floral Atas */}
          <div className="pt-4 animate-fade-in">
            <span className="text-3xl">🕊️</span>
            <p className="text-xs uppercase tracking-[0.25em] text-amber-700/80 font-medium mt-2">
              {(letter.weddingTitle as string) || "The Wedding Celebration of"}
            </p>
            <h1
              className="text-4xl sm:text-6xl font-serif font-bold tracking-wide mt-2"
              style={{ color: primaryColor }}
            >
              {(letter.groomNickname as string) || "Rama"} &amp;{" "}
              {(letter.brideNickname as string) || "Shinta"}
            </h1>
          </div>

          {/* Bingkai Foto Prewedding Cover */}
          <div className="relative my-6 max-w-xs sm:max-w-sm w-full mx-auto">
            <div className="relative aspect-[3/4] rounded-t-full rounded-b-3xl overflow-hidden shadow-2xl border-4 border-white ring-2 ring-amber-200/70">
              <img
                src={coverPhoto}
                alt="Foto Cover Undangan"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 inset-x-0 text-white px-4">
                <p className="text-xs uppercase tracking-widest text-amber-200 font-medium">
                  Janji Suci Mahligai
                </p>
                <p className="text-sm sm:text-base font-serif font-medium mt-0.5">
                  {(letter.weddingDateText as string) || "Minggu, 24 Oktober 2026"}
                </p>
              </div>
            </div>
          </div>

          {/* Kartu Kepada Tamu & Tombol Buka */}
          <div className="w-full max-w-sm pb-6">
            <div className="p-4 sm:p-5 rounded-2xl bg-white/90 backdrop-blur-md shadow-lg border border-amber-100 mb-5">
              <p className="text-[11px] uppercase tracking-wider text-stone-500 font-medium">
                Kepada Yth. Bapak/Ibu/Saudara/i:
              </p>
              <h2
                className="text-xl sm:text-2xl font-serif font-bold mt-1 text-stone-800"
                style={{ color: primaryColor }}
              >
                {guestName}
              </h2>
              <p className="text-xs text-stone-500 mt-1 italic">
                *Mohon maaf bila ada kesalahan penulisan nama/gelar
              </p>
            </div>

            <button
              onClick={handleOpenInvitation}
              className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-white font-medium text-base shadow-xl transform active:scale-95 hover:shadow-2xl transition-all duration-300 group"
              style={{
                backgroundColor: primaryColor,
                boxShadow: `0 10px 25px -5px ${primaryColor}66`,
              }}
            >
              <Heart className="w-5 h-5 fill-white text-white group-hover:scale-125 transition-transform" />
              <span>{(letter.openButtonText as string) || "Buka Undangan"}</span>
            </button>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 2. FLOATING CONTROL BAR (AUDIO & BOTTOM NAV) */}
      {/* ========================================================================= */}
      {isOpened && (
        <>
          {/* Tombol Audio Mengambang */}
          <button
            onClick={toggleAudio}
            className="fixed top-5 right-5 z-40 p-3 rounded-full bg-white/90 backdrop-blur-md shadow-lg border border-amber-200 text-stone-700 hover:text-amber-600 transition-all active:scale-90"
            title={isPlayingAudio ? "Jeda Musik" : "Putar Musik"}
          >
            {isPlayingAudio ? (
              <Volume2 className="w-5 h-5 text-amber-600 animate-pulse" />
            ) : (
              <VolumeX className="w-5 h-5 text-stone-400" />
            )}
          </button>

          {/* Bottom Navigation Dock */}
          <nav className="fixed bottom-4 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
            <div className="pointer-events-auto flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 rounded-full bg-white/90 backdrop-blur-md shadow-xl border border-amber-200/80 text-xs font-medium text-stone-600">
              <button
                onClick={() => scrollTo("section-hero")}
                className="px-2.5 py-1.5 rounded-full hover:bg-amber-50 hover:text-amber-700 transition-colors"
              >
                Awal
              </button>
              <button
                onClick={() => scrollTo("section-couple")}
                className="px-2.5 py-1.5 rounded-full hover:bg-amber-50 hover:text-amber-700 transition-colors"
              >
                Mempelai
              </button>
              <button
                onClick={() => scrollTo("section-events")}
                className="px-2.5 py-1.5 rounded-full hover:bg-amber-50 hover:text-amber-700 transition-colors"
              >
                Acara
              </button>
              <button
                onClick={() => scrollTo("section-story")}
                className="px-2.5 py-1.5 rounded-full hover:bg-amber-50 hover:text-amber-700 transition-colors"
              >
                Kisah
              </button>
              <button
                onClick={() => scrollTo("section-gallery")}
                className="px-2.5 py-1.5 rounded-full hover:bg-amber-50 hover:text-amber-700 transition-colors"
              >
                Galeri
              </button>
              <button
                onClick={() => scrollTo("section-gift")}
                className="px-2.5 py-1.5 rounded-full hover:bg-amber-50 hover:text-amber-700 transition-colors"
              >
                Hadiah
              </button>
              <button
                onClick={() => scrollTo("section-rsvp")}
                className="px-2.5 py-1.5 rounded-full hover:bg-amber-50 hover:text-amber-700 transition-colors"
              >
                RSVP
              </button>
            </div>
          </nav>
        </>
      )}

      {/* ========================================================================= */}
      {/* 3. HERO & OPENING BLESSING SECTION */}
      {/* ========================================================================= */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 pt-12 pb-32 space-y-16">
        {/* Hero Section */}
        <section id="section-hero" className="text-center pt-8 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/70 border border-amber-200/80 text-xs font-medium text-amber-800 tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Undangan Pernikahan Digital</span>
          </div>

          <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-stone-500 font-medium">
            {(letter.weddingTitle as string) || "The Wedding Celebration of"}
          </p>

          <h1
            className="text-4xl sm:text-6xl font-serif font-bold tracking-wide"
            style={{ color: primaryColor }}
          >
            {(letter.groomNickname as string) || "Rama"} &amp;{" "}
            {(letter.brideNickname as string) || "Shinta"}
          </h1>

          <p className="text-sm sm:text-base font-serif text-stone-600">
            {(letter.weddingDateText as string) || "Minggu, 24 Oktober 2026"}
          </p>

          {/* Frame Foto Utama Hero */}
          <div className="relative max-w-sm mx-auto my-8">
            <div className="aspect-[4/5] rounded-t-full rounded-b-3xl overflow-hidden shadow-2xl border-4 border-white ring-2 ring-amber-200">
              <img
                src={coverPhoto}
                alt="Foto Utama Mempelai"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Ayat Suci & Doa Pembuka */}
        <section className="text-center space-y-6 p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-md shadow-xl border border-amber-100">
          <p className="text-2xl sm:text-3xl font-serif text-amber-800/90 leading-relaxed font-arabic">
            {(letter.basmalahText as string) || "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"}
          </p>

          <div className="w-16 h-0.5 mx-auto bg-amber-300 rounded-full" />

          <p className="text-xs sm:text-sm text-stone-600 italic leading-relaxed max-w-xl mx-auto">
            &ldquo;
            {(letter.verseQuote as string) ||
              "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri..."}
            &rdquo;
          </p>
          <p
            className="text-xs font-serif font-semibold tracking-wider uppercase"
            style={{ color: primaryColor }}
          >
            {(letter.verseSource as string) || "QS. Ar-Rum: 21"}
          </p>

          <p className="text-xs sm:text-sm text-stone-600 whitespace-pre-line leading-relaxed pt-2">
            {(letter.greetingText as string) ||
              "Assalamu'alaikum Warahmatullahi Wabarakatuh\nDengan memohon rahmat dan ridho Allah Subhanahu Wa Ta'ala, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk menghadiri dan memberikan doa restu pada hari pernikahan kami:"}
          </p>
        </section>

        {/* ========================================================================= */}
        {/* 4. PROFIL KEDUA MEMPELAI (THE BRIDE & GROOM) */}
        {/* ========================================================================= */}
        <section id="section-couple" className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-2xl">💍</span>
            <h2
              className="text-3xl sm:text-4xl font-serif font-bold tracking-tight"
              style={{ color: primaryColor }}
            >
              Kedua Mempelai
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto">
              Dua hati yang dipersatukan oleh takdir, melangkah bersama dalam cinta dan rida ilahi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mempelai Pria */}
            <div className="flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-md shadow-xl border border-amber-100 hover:shadow-2xl transition-all">
              <div className="relative w-36 h-48 sm:w-44 sm:h-56 mb-4 rounded-full overflow-hidden shadow-lg border-4 border-white ring-2 ring-amber-200">
                <img
                  src={groomPhoto}
                  alt="Mempelai Pria"
                  className="w-full h-full object-cover"
                />
              </div>

              <h3
                className="text-xl sm:text-2xl font-serif font-bold mt-2"
                style={{ color: primaryColor }}
              >
                {(letter.groomFullName as string) || "Rama Adiputra Pratama, M.Kom."}
              </h3>

              <p className="text-xs sm:text-sm text-stone-600 mt-2 font-medium leading-relaxed">
                {(letter.groomParents as string) ||
                  "Putra bungsu dari Bpk. Drs. H. Bambang Suryono & Ibu Hj. Sri Rahayu"}
              </p>

              {letter.groomInstagram && (
                <a
                  href={`https://instagram.com/${String(letter.groomInstagram).replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-800 text-xs font-medium hover:bg-amber-100 transition-colors mt-4"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>{letter.groomInstagram as string}</span>
                </a>
              )}
            </div>

            {/* Mempelai Wanita */}
            <div className="flex flex-col items-center text-center p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-md shadow-xl border border-amber-100 hover:shadow-2xl transition-all">
              <div className="relative w-36 h-48 sm:w-44 sm:h-56 mb-4 rounded-full overflow-hidden shadow-lg border-4 border-white ring-2 ring-amber-200">
                <img
                  src={bridePhoto}
                  alt="Mempelai Wanita"
                  className="w-full h-full object-cover"
                />
              </div>

              <h3
                className="text-xl sm:text-2xl font-serif font-bold mt-2"
                style={{ color: primaryColor }}
              >
                {(letter.brideFullName as string) || "Shinta Kirana Maharani, S.Ds."}
              </h3>

              <p className="text-xs sm:text-sm text-stone-600 mt-2 font-medium leading-relaxed">
                {(letter.brideParents as string) ||
                  "Putri pertama dari Bpk. Ir. Hendra Gunawan & Ibu Hj. Ratna Dewi"}
              </p>

              {letter.brideInstagram && (
                <a
                  href={`https://instagram.com/${String(letter.brideInstagram).replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 text-amber-800 text-xs font-medium hover:bg-amber-100 transition-colors mt-4"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>{letter.brideInstagram as string}</span>
                </a>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. RANGKAIAN ACARA SAKRAL (AKAD & RESEPSI) */}
        {/* ========================================================================= */}
        <section id="section-events" className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-2xl">🕌</span>
            <h2
              className="text-3xl sm:text-4xl font-serif font-bold tracking-tight"
              style={{ color: primaryColor }}
            >
              Rangkaian Acara
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto">
              Dengan penuh hormat, kami mengharapkan kehadiran Bapak/Ibu/Saudara/i pada:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Akad Nikah */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-md shadow-xl border border-amber-100 flex flex-col justify-between text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-bl-full -z-0 opacity-60" />
              <div className="relative z-10 space-y-4">
                <span className="inline-block px-3 py-1 rounded-full bg-amber-100/70 text-amber-800 text-xs uppercase tracking-wider font-semibold">
                  Sesi Sakral
                </span>
                <h3
                  className="text-2xl font-serif font-bold"
                  style={{ color: primaryColor }}
                >
                  {(letter.akadTitle as string) || "Akad Nikah"}
                </h3>

                <div className="space-y-2 text-stone-600 text-sm">
                  <div className="flex items-center justify-center gap-2 font-medium">
                    <Calendar className="w-4 h-4 text-amber-600" />
                    <span>{(letter.akadDayDate as string) || "Minggu, 24 Oktober 2026"}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 font-medium">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span>{(letter.akadTime as string) || "Pukul 08.00 - 10.00 WIB"}</span>
                  </div>
                  <div className="pt-2">
                    <p className="font-semibold text-stone-800">
                      {(letter.akadVenue as string) || "Masjid Agung Al-Barkah"}
                    </p>
                    <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                      {(letter.akadAddress as string) ||
                        "Jl. Veteran No. 12, Kebayoran Baru, Jakarta Selatan"}
                    </p>
                  </div>
                </div>
              </div>

              {letter.akadMapsUrl && (
                <div className="mt-6 pt-4 border-t border-stone-100 relative z-10">
                  <a
                    href={letter.akadMapsUrl as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium text-white shadow-md hover:shadow-lg transition-all"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Buka Google Maps</span>
                  </a>
                </div>
              )}
            </div>

            {/* Resepsi Pernikahan */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-md shadow-xl border border-amber-100 flex flex-col justify-between text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-bl-full -z-0 opacity-60" />
              <div className="relative z-10 space-y-4">
                <span className="inline-block px-3 py-1 rounded-full bg-amber-100/70 text-amber-800 text-xs uppercase tracking-wider font-semibold">
                  Perayaan Bahagia
                </span>
                <h3
                  className="text-2xl font-serif font-bold"
                  style={{ color: primaryColor }}
                >
                  {(letter.resepsiTitle as string) || "Resepsi Pernikahan"}
                </h3>

                <div className="space-y-2 text-stone-600 text-sm">
                  <div className="flex items-center justify-center gap-2 font-medium">
                    <Calendar className="w-4 h-4 text-amber-600" />
                    <span>{(letter.resepsiDayDate as string) || "Minggu, 24 Oktober 2026"}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 font-medium">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span>{(letter.resepsiTime as string) || "Pukul 11.00 - 14.00 WIB"}</span>
                  </div>
                  <div className="pt-2">
                    <p className="font-semibold text-stone-800">
                      {(letter.resepsiVenue as string) || "Grand Ballroom Balai Kartini"}
                    </p>
                    <p className="text-xs text-stone-500 mt-1 leading-relaxed">
                      {(letter.resepsiAddress as string) ||
                        "Jl. Gatot Subroto No. 37, Kuningan Barat, Jakarta Selatan"}
                    </p>
                  </div>
                </div>
              </div>

              {letter.resepsiMapsUrl && (
                <div className="mt-6 pt-4 border-t border-stone-100 relative z-10">
                  <a
                    href={letter.resepsiMapsUrl as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium text-white shadow-md hover:shadow-lg transition-all"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Buka Google Maps</span>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Tombol Simpan ke Kalender */}
          {letter.calendarEventDate && (
            <div className="text-center pt-2">
              <a
                href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pernikahan+${encodeURIComponent(
                  String(letter.groomNickname || "Rama") +
                    " & " +
                    String(letter.brideNickname || "Shinta"),
                )}&dates=${String(letter.calendarEventDate).replace(/-/g, "")}T010000Z/${String(
                  letter.calendarEventDate,
                ).replace(/-/g, "")}T070000Z&details=Undangan+Pernikahan&location=${encodeURIComponent(
                  String(letter.akadVenue || "Jakarta"),
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-amber-300 text-stone-800 text-xs font-semibold shadow hover:bg-amber-50 hover:border-amber-400 transition-all"
              >
                <Calendar className="w-4 h-4 text-amber-600" />
                <span>Simpan Tanggal ke Google Calendar</span>
              </a>
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* 6. HITUNG MUNDUR ACARA (LIVE COUNTDOWN) */}
        {/* ========================================================================= */}
        <section className="text-center p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-amber-50/70 to-white/90 backdrop-blur-md shadow-xl border border-amber-100">
          <span className="text-2xl">⏳</span>
          <h2
            className="text-2xl sm:text-3xl font-serif font-bold tracking-tight mt-2"
            style={{ color: primaryColor }}
          >
            {(letter.countdownTitle as string) || "Menghitung Hari Bahagia"}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto mt-2 leading-relaxed">
            {(letter.countdownSubtitle as string) ||
              "Tiada yang lebih indah selain menanti waktu dipersatukannya dua insan dalam ikatan suci mahligai pernikahan."}
          </p>

          <CountdownTimerLive
            targetDate={(letter.targetDate as string) || "2026-10-24T08:00:00"}
            primaryColor={primaryColor}
          />
        </section>

        {/* ========================================================================= */}
        {/* 7. PERJALANAN CINTA (OUR LOVE JOURNEY) */}
        {/* ========================================================================= */}
        <section id="section-story" className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-2xl">📜</span>
            <h2
              className="text-3xl sm:text-4xl font-serif font-bold tracking-tight"
              style={{ color: primaryColor }}
            >
              {(letter.storyTitle as string) || "Kisah Kasih Kami"}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto">
              {(letter.storySubtitle as string) ||
                "Sebuah perjalanan indah yang dirajut oleh takdir, doa, dan kesetiaan."}
            </p>
          </div>

          <div className="relative border-l-2 border-amber-200/80 ml-4 sm:ml-8 space-y-8 pl-6 sm:pl-8">
            {/* Titik 1 */}
            <div className="relative group">
              <div
                className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 border-white shadow ring-2"
                style={{ backgroundColor: primaryColor }}
              />
              <div className="p-5 rounded-2xl bg-white/90 backdrop-blur-md shadow-md border border-amber-100">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900">
                  {(letter.story1Year as string) || "2019"}
                </span>
                <h4
                  className="text-lg font-serif font-bold mt-2"
                  style={{ color: primaryColor }}
                >
                  {(letter.story1Title as string) || "Pertemuan Pertama"}
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                  {(letter.story1Desc as string) ||
                    "Berawal dari perkenalan sederhana di bangku perkuliahan, percakapan hangat yang mengalir tanpa canggung menjadi awal mula getaran rasa yang kami simpan di dalam dada."}
                </p>
              </div>
            </div>

            {/* Titik 2 */}
            <div className="relative group">
              <div
                className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 border-white shadow ring-2"
                style={{ backgroundColor: primaryColor }}
              />
              <div className="p-5 rounded-2xl bg-white/90 backdrop-blur-md shadow-md border border-amber-100">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900">
                  {(letter.story2Year as string) || "2021"}
                </span>
                <h4
                  className="text-lg font-serif font-bold mt-2"
                  style={{ color: primaryColor }}
                >
                  {(letter.story2Title as string) || "Merajut Janji Bersama"}
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                  {(letter.story2Desc as string) ||
                    "Kami memutuskan untuk saling mendampingi di setiap suka dan duka. Belajar saling memahami kekurangan dan bertumbuh bersama menjadi pribadi yang lebih dewasa."}
                </p>
              </div>
            </div>

            {/* Titik 3 */}
            <div className="relative group">
              <div
                className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 border-white shadow ring-2"
                style={{ backgroundColor: primaryColor }}
              />
              <div className="p-5 rounded-2xl bg-white/90 backdrop-blur-md shadow-md border border-amber-100">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900">
                  {(letter.story3Year as string) || "2024"}
                </span>
                <h4
                  className="text-lg font-serif font-bold mt-2"
                  style={{ color: primaryColor }}
                >
                  {(letter.story3Title as string) || "Ikrar Khitbah & Restu Orang Tua"}
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                  {(letter.story3Desc as string) ||
                    "Dengan diiringi restu tulus kedua orang tua dan keluarga besar, langkah serius kami mantapkan dalam ikatan pertunangan suci yang penuh haru dan kebahagiaan."}
                </p>
              </div>
            </div>

            {/* Titik 4 */}
            <div className="relative group">
              <div
                className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 border-white shadow ring-2"
                style={{ backgroundColor: primaryColor }}
              />
              <div className="p-5 rounded-2xl bg-white/90 backdrop-blur-md shadow-md border border-amber-100">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900">
                  {(letter.story4Year as string) || "2026"}
                </span>
                <h4
                  className="text-lg font-serif font-bold mt-2"
                  style={{ color: primaryColor }}
                >
                  {(letter.story4Title as string) || "Mahligai Rumah Tangga"}
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
                  {(letter.story4Desc as string) ||
                    "Insya Allah, ikrar suci akan kami ikrarkan di hadapan Sang Maha Pencipta untuk mengarungi bahtera kehidupan bersama hingga akhir hayat dalam sakinah, mawaddah, warahmah."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. GALERI FOTO PREWEDDING & VIDEO SINEMATIK */}
        {/* ========================================================================= */}
        <section id="section-gallery" className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-2xl">📸</span>
            <h2
              className="text-3xl sm:text-4xl font-serif font-bold tracking-tight"
              style={{ color: primaryColor }}
            >
              {(letter.galleryTitle as string) || "Potret Bahagia Kami"}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto">
              {(letter.gallerySubtitle as string) ||
                "Kumpulan momen hangat dan senyuman tulus menyambut hari suci."}
            </p>
          </div>

          {/* Grid 4 Foto Prewedding Cerah */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div
              onClick={() =>
                setSelectedPhoto({
                  url: photo1,
                  caption: (letter.photo1Caption as string) || "Janji dalam Pandangan",
                })
              }
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md cursor-pointer border-2 border-white ring-1 ring-amber-100"
            >
              <img
                src={photo1}
                alt="Foto Prewedding 1"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-stone-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <span className="text-white text-xs font-medium">
                  {(letter.photo1Caption as string) || "Perbesar"}
                </span>
              </div>
            </div>

            <div
              onClick={() =>
                setSelectedPhoto({
                  url: photo2,
                  caption: (letter.photo2Caption as string) || "Simbol Ikatan Abadi",
                })
              }
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md cursor-pointer border-2 border-white ring-1 ring-amber-100"
            >
              <img
                src={photo2}
                alt="Foto Prewedding 2"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-stone-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <span className="text-white text-xs font-medium">
                  {(letter.photo2Caption as string) || "Perbesar"}
                </span>
              </div>
            </div>

            <div
              onClick={() =>
                setSelectedPhoto({
                  url: photo3,
                  caption: (letter.photo3Caption as string) || "Langkah Seirama",
                })
              }
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md cursor-pointer border-2 border-white ring-1 ring-amber-100"
            >
              <img
                src={photo3}
                alt="Foto Prewedding 3"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-stone-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <span className="text-white text-xs font-medium">
                  {(letter.photo3Caption as string) || "Perbesar"}
                </span>
              </div>
            </div>

            <div
              onClick={() =>
                setSelectedPhoto({
                  url: photo4,
                  caption: (letter.photo4Caption as string) || "Menatap Hari Esok Bersama",
                })
              }
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md cursor-pointer border-2 border-white ring-1 ring-amber-100"
            >
              <img
                src={photo4}
                alt="Foto Prewedding 4"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-stone-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <span className="text-white text-xs font-medium">
                  {(letter.photo4Caption as string) || "Perbesar"}
                </span>
              </div>
            </div>
          </div>

          {/* Video Teaser YouTube (Opsional) */}
          {letter.videoUrl && (
            <div className="mt-8 p-4 rounded-3xl bg-white/90 backdrop-blur-md shadow-xl border border-amber-100">
              <div className="aspect-video rounded-2xl overflow-hidden bg-black shadow-inner">
                {String(letter.videoUrl).includes("youtube") ||
                String(letter.videoUrl).includes("youtu.be") ? (
                  <iframe
                    src={
                      String(letter.videoUrl).includes("embed")
                        ? (letter.videoUrl as string)
                        : `https://www.youtube-nocookie.com/embed/${
                            String(letter.videoUrl).split("v=")[1]?.split("&")[0] ||
                            String(letter.videoUrl).split("/").pop()
                          }`
                    }
                    title="Video Teaser Prewedding"
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-white text-sm">
                    <a
                      href={letter.videoUrl as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-600 text-white font-medium hover:bg-amber-700 transition"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      <span>Tonton Video Prewedding</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* 9. TANDA KASIH & AMPLOP DIGITAL */}
        {/* ========================================================================= */}
        <section id="section-gift" className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-2xl">🎁</span>
            <h2
              className="text-3xl sm:text-4xl font-serif font-bold tracking-tight"
              style={{ color: primaryColor }}
            >
              {(letter.giftTitle as string) || "Tanda Kasih & Amplop Digital"}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto leading-relaxed">
              {(letter.giftSubtitle as string) ||
                "Doa restu Anda adalah karunia yang paling berharga bagi kami. Namun jika Anda berkenan memberikan tanda kasih sebagai hadiah pernikahan, dapat disalurkan melalui rekening berikut:"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Rekening Bank 1 */}
            {letter.bank1Number && (
              <div className="p-6 rounded-3xl bg-white/95 backdrop-blur-md shadow-xl border border-amber-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-amber-800 text-lg">
                      {(letter.bank1Name as string) || "BCA"}
                    </span>
                    <Gift className="w-5 h-5 text-amber-500" />
                  </div>
                  <p className="text-xs text-stone-500 mt-4 uppercase tracking-wider font-medium">
                    Nomor Rekening
                  </p>
                  <p className="text-2xl font-mono font-bold tracking-wider text-stone-800 mt-1">
                    {letter.bank1Number as string}
                  </p>
                  <p className="text-xs text-stone-600 mt-1 font-medium">
                    a.n. {(letter.bank1AccountName as string) || "Shinta Kirana M"}
                  </p>
                </div>

                <button
                  onClick={() =>
                    copyToClipboard(letter.bank1Number as string, "rekening1")
                  }
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium text-white shadow hover:shadow-md transition-all active:scale-95"
                  style={{ backgroundColor: primaryColor }}
                >
                  {copiedAccount === "rekening1" ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Berhasil Disalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Salin Nomor Rekening</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Rekening Bank 2 */}
            {letter.bank2Number && (
              <div className="p-6 rounded-3xl bg-white/95 backdrop-blur-md shadow-xl border border-amber-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-amber-800 text-lg">
                      {(letter.bank2Name as string) || "Bank Mandiri"}
                    </span>
                    <Gift className="w-5 h-5 text-amber-500" />
                  </div>
                  <p className="text-xs text-stone-500 mt-4 uppercase tracking-wider font-medium">
                    Nomor Rekening
                  </p>
                  <p className="text-2xl font-mono font-bold tracking-wider text-stone-800 mt-1">
                    {letter.bank2Number as string}
                  </p>
                  <p className="text-xs text-stone-600 mt-1 font-medium">
                    a.n. {(letter.bank2AccountName as string) || "Rama Adiputra P"}
                  </p>
                </div>

                <button
                  onClick={() =>
                    copyToClipboard(letter.bank2Number as string, "rekening2")
                  }
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium text-white shadow hover:shadow-md transition-all active:scale-95"
                  style={{ backgroundColor: primaryColor }}
                >
                  {copiedAccount === "rekening2" ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Berhasil Disalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Salin Nomor Rekening</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* QRIS / Alamat Kado Fisik */}
          {(letter.qrisPhoto || letter.giftAddress) && (
            <div className="p-6 rounded-3xl bg-white/95 backdrop-blur-md shadow-xl border border-amber-100 text-center space-y-4">
              {letter.qrisPhoto && (
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-stone-600">
                    QRIS Digital Gift
                  </h4>
                  <div className="max-w-[200px] mx-auto p-2 bg-white rounded-2xl shadow border border-stone-200">
                    <img
                      src={letter.qrisPhoto as string}
                      alt="QRIS Digital"
                      className="w-full h-auto object-contain rounded-xl"
                    />
                  </div>
                  <p className="text-[11px] text-stone-500">
                    Scan via GoPay, OVO, ShopeePay, Dana, atau BCA Mobile
                  </p>
                </div>
              )}

              {letter.giftAddress && (
                <div className="pt-4 border-t border-stone-100 text-left">
                  <p className="text-xs uppercase tracking-wider font-semibold text-amber-800 mb-1">
                    Kirim Kado Fisik ke Alamat:
                  </p>
                  <p className="text-xs sm:text-sm text-stone-600 whitespace-pre-line leading-relaxed">
                    {letter.giftAddress as string}
                  </p>
                  <button
                    onClick={() =>
                      copyToClipboard(letter.giftAddress as string, "alamat")
                    }
                    className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-medium hover:bg-amber-100 transition"
                  >
                    {copiedAccount === "alamat" ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Alamat Disalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Alamat</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* 10. BUKU TAMU, KONFIRMASI RSVP & UCAPAN DOA RESTU */}
        {/* ========================================================================= */}
        <section id="section-rsvp" className="space-y-8">
          <div className="text-center space-y-2">
            <span className="text-2xl">✍️</span>
            <h2
              className="text-3xl sm:text-4xl font-serif font-bold tracking-tight"
              style={{ color: primaryColor }}
            >
              {(letter.rsvpTitle as string) || "Buku Tamu & Doa Restu"}
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto leading-relaxed">
              {(letter.rsvpSubtitle as string) ||
                "Merupakan kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir serta melantunkan doa restu untuk mahligai suci kami."}
            </p>
          </div>

          {/* Form RSVP */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white/95 backdrop-blur-md shadow-xl border border-amber-100">
            {rsvpSubmitted ? (
              <div className="text-center py-8 space-y-3">
                <span className="text-4xl">💌</span>
                <h4
                  className="text-xl font-serif font-bold"
                  style={{ color: primaryColor }}
                >
                  Terima Kasih Atas Konfirmasi &amp; Doa Restunya!
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
                  Doa dan kehadiran Bapak/Ibu/Saudara/i sangat berarti bagi lembaran baru kehidupan
                  kami berdua.
                </p>
                <button
                  onClick={() => setRsvpSubmitted(false)}
                  className="mt-2 text-xs font-semibold underline text-amber-700 hover:text-amber-800"
                >
                  Kirim ucapan lainnya
                </button>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    value={rsvpName}
                    onChange={(e) => setRsvpName(e.target.value)}
                    placeholder="Tuliskan nama Anda"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-stone-50/50"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                      Konfirmasi Kehadiran
                    </label>
                    <select
                      value={rsvpPresence}
                      onChange={(e) => setRsvpPresence(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-stone-50/50"
                    >
                      <option value="Hadir">Insya Allah Hadir</option>
                      <option value="Tidak Hadir">Mohon Maaf Belum Bisa Hadir</option>
                      <option value="Masih Ragu">Belum Pasti (Menyusul)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                      Jumlah Tamu
                    </label>
                    <select
                      value={rsvpGuestCount}
                      onChange={(e) => setRsvpGuestCount(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-stone-50/50"
                    >
                      <option value="1">1 Orang</option>
                      <option value="2">2 Orang</option>
                      <option value="3">3 Orang</option>
                      <option value="4+">4 Orang atau lebih</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Untaian Doa &amp; Ucapan Selamat
                  </label>
                  <textarea
                    rows={3}
                    value={rsvpMessage}
                    onChange={(e) => setRsvpMessage(e.target.value)}
                    placeholder="Tuliskan untaian doa restu untuk kedua mempelai..."
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 bg-stone-50/50"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingRsvp}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-white font-medium text-sm shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-75 disabled:cursor-not-allowed"
                  style={{ backgroundColor: primaryColor }}
                >
                  {isSubmittingRsvp ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Menyimpan ke Buku Tamu...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Kirim Konfirmasi &amp; Doa Restu</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* List Ucapan Tamu */}
            <div className="mt-8 pt-6 border-t border-stone-100 space-y-3 max-h-80 overflow-y-auto pr-1">
              <p className="text-xs uppercase tracking-wider font-semibold text-stone-500 mb-2">
                Untaian Doa dari Kerabat &amp; Sahabat ({rsvpList.length})
              </p>
              {rsvpList.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100/80 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-stone-800">{item.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-amber-800 border border-amber-200">
                      {item.presence}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">{item.message}</p>
                  <span className="text-[10px] text-stone-400 block pt-0.5">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 11. UNGKAPAN TERIMA KASIH & PENUTUP KELUARGA BESAR */}
        {/* ========================================================================= */}
        <section className="text-center p-8 sm:p-12 rounded-3xl bg-white/95 backdrop-blur-md shadow-2xl border border-amber-100 space-y-6">
          <span className="text-3xl">🕊️</span>
          <h2
            className="text-3xl sm:text-4xl font-serif font-bold tracking-tight"
            style={{ color: primaryColor }}
          >
            {(letter.closingTitle as string) || "Terima Kasih"}
          </h2>

          <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto leading-relaxed whitespace-pre-line">
            {(letter.closingMessage as string) ||
              "Atas kehadiran, perhatian, serta doa restu yang tulus dari Bapak/Ibu/Saudara/i sekalian, kami sekeluarga besar menghaturkan sembah sujud dan terima kasih yang tiada terhingga."}
          </p>

          <p className="text-xs text-stone-500 font-serif italic">
            {(letter.closingSalutation as string) ||
              "Wassalamu'alaikum Warahmatullahi Wabarakatuh\nKami yang berbahagia,"}
          </p>

          <div className="space-y-2 pt-2 text-xs sm:text-sm text-stone-700 font-medium">
            <p>{(letter.closingFamilyGroom as string) || "Keluarga Besar Bpk. Drs. H. Bambang Suryono & Ibu Hj. Sri Rahayu"}</p>
            <p>{(letter.closingFamilyBride as string) || "Keluarga Besar Bpk. Ir. Hendra Gunawan & Ibu Hj. Ratna Dewi"}</p>
          </div>

          <div className="pt-4">
            <p
              className="text-2xl sm:text-3xl font-serif font-bold"
              style={{ color: primaryColor }}
            >
              {(letter.closingSignature as string) || "Rama & Shinta"}
            </p>
          </div>
        </section>
      </main>

      {/* ========================================================================= */}
      {/* 12. MODAL LIGHTBOX FOTO PREWEDDING */}
      {/* ========================================================================= */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm transition-opacity"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-lg w-full bg-white rounded-3xl overflow-hidden shadow-2xl p-2 border border-amber-200"
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-stone-900/60 text-white hover:bg-stone-900 transition"
            >
              ✕
            </button>
            <div className="aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden">
              <img
                src={selectedPhoto.url}
                alt="Foto Lightbox"
                className="w-full h-full object-cover"
              />
            </div>
            {selectedPhoto.caption && (
              <p className="text-center text-xs font-serif font-medium text-stone-700 py-3">
                {selectedPhoto.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Wrapper Suspense untuk useSearchParams di App Router
export function MahligaiWeddingTemplate(props: TemplateComponentProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-stone-50 text-stone-500 font-serif">
          Menyiapkan Undangan Mahligai Cinta...
        </div>
      }
    >
      <MahligaiWeddingContent {...props} />
    </Suspense>
  );
}
