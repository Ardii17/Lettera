"use client";

import { useMemo, useRef, useState } from "react";
import {
  Sparkles,
  Pause,
  Play,
  Maximize2,
  X,
  Cake,
  PartyPopper,
  Flame,
  Award,
  Calendar,
  Gift,
  Heart,
  Smile,
  Sun,
  ShieldCheck,
} from "lucide-react";
import { formatDate, toParagraphs } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";
import type { LetterContent } from "@/types/letter";
import { withDefaults } from "../utils";
import { isColorDark } from "../color-presets";

const defaults = {
  primaryColor: "#e8453c",
  backgroundColor: "#fffdf9",
  cardColor: "#ffffff",
  textColor: "#1f1b16",
  bodyTextColor: "#4a3e31",
  recipientName: "Dinda Anandita",
  senderName: "Geng Kosan & Sahabat",
  age: 24,
  greeting: "Selamat Ulang Tahun Ke-24! 🎉",
  heroBadge: "✨ Official Birthday Tribute for Our Favorite Human",
  title: "Merayakan Hari Bahagia Dinda",
  tagline:
    "Terima kasih telah lahir ke dunia, membawa jutaan tawa lepas, dan selalu menjadi alasan kenapa hari-hari biasa terasa begitu berwarna.",
  heroImage:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
  birthDate: "2002-09-21",

  cakeTitle: "Kue Impian & Ritual Tiup Lilin",
  cakeWishPrompt: "Tutup matamu sejenak, buat satu permohonan tulus di hati, lalu tiup lilinnya!",
  secretWishMessage:
    "Semoga di usia 24 tahun ini, setiap impian besar yang kamu simpan dalam doa segera terwujud. Tetaplah menjadi Dinda yang hangat, kuat, dan selalu bangga atas dirimu sendiri! 🎂✨",

  milestoneTitle: "Jejak Langkah & Kisah Berhargamu",
  milestone1Year: "2020",
  milestone1Title: "Awal Petualangan Baru",
  milestone1Desc: "Hari pertama merantau, beradaptasi dengan lingkungan baru dan membuktikan keberanianmu melangkah mandiri.",
  milestone2Year: "2023",
  milestone2Title: "Pencapaian Besar & Karya Terbaik",
  milestone2Desc: "Menyelesaikan tanggung jawab besar dengan senyum bangga dan tekad pantang menyerah.",
  milestone3Year: "2026",
  milestone3Title: "Menyambut Usia Penuh Harapan",
  milestone3Desc: "Melangkah mantap menuju babak kedewasaan yang penuh berkah, karya cemerlang, dan kebahagiaan.",

  galleryTitle: "Galeri Senyuman & Tawa Bersama",
  gallerySubtitle: "Potret-potret kebersamaan yang membuktikan bahwa memiliki kamu adalah anugerah terindah.",
  galleryImg1:
    "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
  galleryCaption1: "Pesta kejutan kecil penuh tawa",
  galleryDate1: "Kosan Ceria, 2024",
  galleryImg2:
    "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80",
  galleryCaption2: "Momen seru liburan akhir tahun",
  galleryDate2: "Pantai Indah, 2024",
  galleryImg3:
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
  galleryCaption3: "Kue pertama buatan sendiri",
  galleryDate3: "Dapur Kosan, 2025",
  galleryImg4:
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
  galleryCaption4: "Konser musik & bernyanyi kencang berdua",
  galleryDate4: "Jakarta, 2025",
  galleryImg5:
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80",
  galleryCaption5: "Senja santai & obrolan masa depan",
  galleryDate5: "Bandung, 2025",
  galleryImg6:
    "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=80",
  galleryCaption6: "Malam syukuran penuh doa",
  galleryDate6: "Rumah Makan, 2026",

  wishesTitle: "Empat Doa Tulus Untukmu di Usia Baru",
  wish1: "Semoga selalu dilimpahi kesehatan raga, ketenangan jiwa, dan tidur malam yang selalu nyenyak.",
  wish2: "Semoga langkah karier dan studimu dibukakan pintu kemudahan seluas-luasnya dengan hasil terbaik.",
  wish3: "Semoga hatimu selalu dipenuhi rasa syukur, dikelilingi orang-orang baik, dan dijauhkan dari beban pikiran.",
  wish4: "Semoga impian terbesar yang sedang kamu perjuangkan tahun ini menjadi kenyataan yang membanggakan.",

  quote: "Semoga tahun ini menjadi tahun yang paling ramah, penuh berkah, dan sebaik tawamu.",
  message:
    "Dua puluh empat tahun yang lalu, semesta menghadirkan orang sehebat kamu ke dunia.\n\nKamu adalah orang yang paling cepat bilang “ayo berangkat” setiap kali ada yang butuh teman bicara, orang yang tulus mendengarkan tanpa menghakimi, dan sosok yang selalu menebarkan energi positif ke mana pun kamu pergi.\n\nDi ulang tahunmu yang ke-24 ini, kami hanya ingin kamu tahu betapa bersyukurnya kami bisa berjalan di sampingmu. Semoga kamu tidak pernah lupa betapa berharganya dirimu, betapa hebatnya setiap langkah yang sudah kamu tempuh, dan betapa banyak orang yang mendoakan kebaikanmu setiap hari.\n\nSelamat bertambah usia, Dinda! Rayakan hari ini dengan senyuman paling lebar.",
  signature: "Dengan tulus & sayang, Teman-teman Kosan",
  letterDate: "2026-09-21",
  musicTitle: "",
  bgMusicUrl: "",
};

/** Confetti pieces for background and burst */
const CONFETTI_DOTS = [
  { left: "5%", top: "8%", size: 12, color: "#f59e0b", rotate: 25 },
  { left: "90%", top: "6%", size: 10, color: "#e8453c", rotate: -18 },
  { left: "15%", top: "25%", size: 8, color: "#10b981", rotate: 12 },
  { left: "85%", top: "28%", size: 14, color: "#3b82f6", rotate: 35 },
  { left: "8%", top: "48%", size: 9, color: "#ec4899", rotate: -15 },
  { left: "92%", top: "52%", size: 11, color: "#8b5cf6", rotate: 42 },
  { left: "12%", top: "72%", size: 10, color: "#f59e0b", rotate: -28 },
  { left: "88%", top: "75%", size: 12, color: "#10b981", rotate: 15 },
  { left: "20%", top: "90%", size: 14, color: "#e8453c", rotate: -10 },
  { left: "80%", top: "92%", size: 8, color: "#3b82f6", rotate: 30 },
];

/** Synthesize a festive celebration chime using Web Audio API */
function playCelebrationChime() {
  if (typeof window === "undefined") return;
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (major arpeggio)
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);
      gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + idx * 0.12 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.12 + 0.6);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.12);
      osc.stop(ctx.currentTime + idx * 0.12 + 0.7);
    });
  } catch {
    // Audio context may be restricted before user gesture
  }
}

export function BirthdayTemplate({
  data,
  className,
}: {
  data: LetterContent;
  className?: string;
}) {
  const letter = withDefaults(defaults, data);
  const primaryColor = String(letter.primaryColor || "#e8453c");
  const backgroundColor = String(letter.backgroundColor || "#fffdf9");
  const cardColor = String(letter.cardColor || "#ffffff");
  const textColor = String(letter.textColor || "#1f1b16");
  const bodyTextColor = String(letter.bodyTextColor || "#4a3e31");

  const isDarkBg = useMemo(() => isColorDark(backgroundColor), [backgroundColor]);
  const isDarkCard = useMemo(() => isColorDark(cardColor), [cardColor]);

  // Candle blowing state
  const [isCandleBlown, setIsCandleBlown] = useState(false);
  const [showConfettiBurst, setShowConfettiBurst] = useState(false);

  // Photo Lightbox state
  const [lightboxPhoto, setLightboxPhoto] = useState<{
    url: string;
    caption: string;
    date: string;
  } | null>(null);

  // Audio state
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
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

  const handleBlowCandle = () => {
    if (!isCandleBlown) {
      setIsCandleBlown(true);
      setShowConfettiBurst(true);
      playCelebrationChime();
      setTimeout(() => setShowConfettiBurst(false), 3500);
    } else {
      setIsCandleBlown(false);
    }
  };

  const letterRecord = letter as Record<string, unknown>;

  // Gallery photos list
  const galleryItems = useMemo(() => {
    const items: Array<{ url: string; caption: string; date: string }> = [];
    for (let i = 1; i <= 6; i++) {
      const url = letterRecord[`galleryImg${i}`];
      if (typeof url === "string" && url.trim().length > 0) {
        items.push({
          url,
          caption: String(letterRecord[`galleryCaption${i}`] || ""),
          date: String(letterRecord[`galleryDate${i}`] || ""),
        });
      }
    }
    return items;
  }, [letterRecord]);

  // Milestones list
  const milestones = useMemo(() => {
    const list: Array<{ year: string; title: string; desc: string }> = [];
    for (let i = 1; i <= 3; i++) {
      const title = letterRecord[`milestone${i}Title`];
      if (typeof title === "string" && title.trim().length > 0) {
        list.push({
          year: String(letterRecord[`milestone${i}Year`] || `Babak ${i}`),
          title,
          desc: String(letterRecord[`milestone${i}Desc`] || ""),
        });
      }
    }
    return list;
  }, [letterRecord]);

  // Wishes list
  const wishes = useMemo(() => {
    const list: string[] = [];
    for (let i = 1; i <= 4; i++) {
      const w = letterRecord[`wish${i}`];
      if (typeof w === "string" && w.trim().length > 0) {
        list.push(w);
      }
    }
    return list;
  }, [letterRecord]);

  const paragraphs = toParagraphs(String(letter.message));
  const age = Number(letter.age) || 0;
  const daysLived = age > 0 ? Math.floor(age * 365.25) : 8760;

  return (
    <article
      className={cn(
        "relative w-full overflow-hidden transition-colors duration-500 selection:bg-amber-100",
        className,
      )}
      style={{ backgroundColor }}
    >
      {/* ================= AMBIENT BACKGROUND PARTICLES ================= */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {CONFETTI_DOTS.map((piece, index) => (
          <span
            key={index}
            className="absolute block rounded-full opacity-60 animate-pulse"
            style={{
              left: piece.left,
              top: piece.top,
              width: piece.size,
              height: piece.size,
              backgroundColor: piece.color,
              transform: `rotate(${piece.rotate}deg)`,
              animationDuration: `${3 + (index % 4)}s`,
            }}
          />
        ))}

        {/* Ambient Gradient Glows */}
        <div
          className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full blur-3xl pointer-events-none"
          style={{
            backgroundColor: `${primaryColor}18`,
          }}
        />
        <div
          className="absolute top-1/3 -right-20 h-80 w-80 rounded-full blur-3xl pointer-events-none"
          style={{
            backgroundColor: `${primaryColor}12`,
          }}
        />
      </div>

      {/* ================= FLOATING CELEBRATION MUSIC PLAYER ================= */}
      {Boolean(String(letter.bgMusicUrl || "").trim()) &&
      !data._isThumbnail &&
      !className?.includes("is-thumbnail") ? (
        <>
          <audio
            ref={audioRef}
            src={String(letter.bgMusicUrl)}
            loop
            preload="metadata"
          />
          <div className="fixed bottom-6 right-6 z-40 max-w-[calc(100vw-3rem)]">
            <button
              type="button"
              onClick={toggleAudio}
              className={cn(
                "group flex items-center gap-2.5 rounded-full border px-4 py-2.5 shadow-xl backdrop-blur-md transition-all hover:scale-105",
                isDarkBg
                  ? "bg-slate-900/90 border-slate-700 text-white"
                  : "bg-white/95 border-amber-200 text-amber-950",
              )}
              style={{
                boxShadow: `0 8px 24px -4px ${primaryColor}35`,
              }}
            >
              <span
                className="flex h-8 w-8 items-center justify-center rounded-full text-white shadow-md transition-transform group-hover:rotate-12"
                style={{ backgroundColor: primaryColor }}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4 ml-0.5" />
                )}
              </span>

              <div className="min-w-0 pr-1 text-left">
                <p className="text-[10px] font-bold uppercase tracking-wider opacity-60">
                  {isPlaying ? "Sedang Memutar" : "Musik Perayaan"}
                </p>
                <p className="truncate text-xs font-semibold max-w-[150px] sm:max-w-[200px]">
                  {String(letter.musicTitle || "Happy Birthday Melody")}
                </p>
              </div>

              {/* Animated Soundwave Equalizer Bars */}
              {isPlaying && (
                <div className="flex items-end gap-0.5 h-3.5 pr-1" aria-hidden>
                  <span className="w-0.5 bg-amber-500 rounded-full animate-bounce h-2" style={{ animationDuration: "0.6s" }} />
                  <span className="w-0.5 bg-amber-500 rounded-full animate-bounce h-3.5" style={{ animationDuration: "0.4s" }} />
                  <span className="w-0.5 bg-amber-500 rounded-full animate-bounce h-2.5" style={{ animationDuration: "0.5s" }} />
                </div>
              )}
            </button>
          </div>
        </>
      ) : null}

      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative px-5 pt-12 pb-16 sm:px-8 sm:pt-20 sm:pb-24">
        <div className="mx-auto max-w-4xl text-center">
          {/* Hero Badge */}
          {String(letter.heroBadge).trim() && (
            <div className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold shadow-xs mb-6"
              style={{
                backgroundColor: `${primaryColor}14`,
                borderColor: `${primaryColor}30`,
                color: primaryColor,
              }}
            >
              <PartyPopper className="h-3.5 w-3.5" />
              <span>{String(letter.heroBadge)}</span>
            </div>
          )}

          {/* Sapaan & Nama Penerima */}
          <p
            className="text-base sm:text-lg font-bold tracking-wide uppercase"
            style={{ color: primaryColor }}
          >
            {String(letter.greeting)}
          </p>

          <h1
            className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-6xl sm:leading-[1.15]"
            style={{ color: textColor }}
          >
            {String(letter.recipientName)}
          </h1>

          <p
            className="mt-2 font-display text-xl sm:text-2xl font-semibold opacity-90"
            style={{ color: textColor }}
          >
            {String(letter.title)}
          </p>

          {String(letter.tagline).trim() && (
            <p
              className="mx-auto mt-4 max-w-2xl text-sm sm:text-base leading-relaxed"
              style={{ color: bodyTextColor }}
            >
              {String(letter.tagline)}
            </p>
          )}

          {/* Hero Portrait Photo Frame with Festive Glow */}
          {String(letter.heroImage).trim() && (
            <div className="mt-10 flex justify-center">
              <div className="relative group">
                {/* Glow ring */}
                <div
                  className="absolute -inset-2.5 rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-75 transition-opacity"
                  style={{ backgroundColor: primaryColor }}
                />

                {/* Outer frame */}
                <div
                  className="relative h-64 w-64 sm:h-80 sm:w-80 overflow-hidden rounded-[2rem] border-4 p-2 shadow-2xl transition-transform group-hover:scale-[1.02]"
                  style={{
                    backgroundColor: cardColor,
                    borderColor: primaryColor,
                  }}
                >
                  <img
                    src={String(letter.heroImage)}
                    alt={String(letter.recipientName)}
                    className="h-full w-full object-cover rounded-[1.4rem]"
                  />

                  {/* Age Badge Ribbon */}
                  {age > 0 && (
                    <div
                      className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full px-3.5 py-1.5 shadow-lg text-white text-xs sm:text-sm font-bold backdrop-blur-xs"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Usia ke-{age}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Quick CTA to interactive cake */}
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("kue-ulang-tahun");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
              style={{ backgroundColor: primaryColor }}
            >
              <Cake className="h-4 w-4" />
              <span>Tiup Lilin & Mulai Perayaan</span>
            </button>
          </div>
        </div>
      </section>

      {/* ================= 2. INTERACTIVE BIRTHDAY CAKE & BLOW CANDLE ================= */}
      <section id="kue-ulang-tahun" className="relative px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-2xl">
          <div
            className="relative overflow-hidden rounded-3xl border p-6 sm:p-10 text-center shadow-xl transition-all"
            style={{
              backgroundColor: cardColor,
              borderColor: isDarkCard ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)",
            }}
          >
            {/* Confetti Burst Overlay when candle blown */}
            {showConfettiBurst && (
              <div
                aria-hidden
                className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center overflow-hidden animate-in fade-in zoom-in duration-300"
              >
                {CONFETTI_DOTS.map((c, i) => (
                  <span
                    key={i}
                    className="absolute block rounded-full animate-ping"
                    style={{
                      left: c.left,
                      top: c.top,
                      width: c.size * 1.5,
                      height: c.size * 1.5,
                      backgroundColor: c.color,
                      animationDuration: "1s",
                    }}
                  />
                ))}
              </div>
            )}

            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider mb-4"
              style={{
                backgroundColor: `${primaryColor}14`,
                color: primaryColor,
              }}
            >
              <Flame className="h-3.5 w-3.5" />
              Ritual Ulang Tahun
            </span>

            <h2
              className="font-display text-2xl sm:text-3xl font-bold"
              style={{ color: textColor }}
            >
              {String(letter.cakeTitle || "Kue Impian & Doa Terindah")}
            </h2>

            <p
              className="mx-auto mt-2 max-w-md text-xs sm:text-sm leading-relaxed"
              style={{ color: bodyTextColor }}
            >
              {!isCandleBlown
                ? String(letter.cakeWishPrompt)
                : "✨ Lilin telah padam! Semua doa dan harapan baikmu sedang terbang menuju langit."}
            </p>

            {/* ================= THE INTERACTIVE CAKE GRAPHIC ================= */}
            <div className="mt-8 flex flex-col items-center justify-center">
              <div className="relative flex flex-col items-center">
                
                {/* CANDLE FLAME (Animated Flicker Glow) */}
                <div className="relative mb-1 flex flex-col items-center">
                  {!isCandleBlown ? (
                    <div className="relative flex flex-col items-center animate-bounce" style={{ animationDuration: "1.8s" }}>
                      {/* Outer flame glow */}
                      <span
                        className="absolute -top-3 h-8 w-6 rounded-full blur-xs opacity-75 animate-pulse"
                        style={{ backgroundColor: "#f59e0b" }}
                      />
                      {/* Inner bright flame */}
                      <span className="relative z-10 h-6 w-3.5 rounded-full bg-gradient-to-t from-amber-500 via-yellow-300 to-white shadow-md shadow-amber-300" />
                    </div>
                  ) : (
                    /* Smoke puff when blown */
                    <div className="h-6 flex items-center justify-center animate-in fade-in duration-500">
                      <span className="text-lg opacity-60">💨</span>
                    </div>
                  )}

                  {/* Candle Stick */}
                  <div
                    className="h-10 w-3 rounded-t-sm shadow-inner"
                    style={{
                      backgroundColor: primaryColor,
                      backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(255,255,255,0.4) 4px, rgba(255,255,255,0.4) 8px)",
                    }}
                  />
                </div>

                {/* CAKE TOP TIER */}
                <div
                  className="relative h-12 w-32 rounded-t-2xl border-b-2 border-amber-900/10 shadow-md flex items-center justify-center"
                  style={{
                    backgroundColor: isDarkCard ? "#334155" : "#fef08a",
                  }}
                >
                  {/* Frosting drips */}
                  <div className="absolute -top-1 inset-x-2 flex justify-between">
                    <span className="h-2 w-4 rounded-b-full bg-white shadow-xs" />
                    <span className="h-3 w-5 rounded-b-full bg-white shadow-xs" />
                    <span className="h-2.5 w-4 rounded-b-full bg-white shadow-xs" />
                    <span className="h-3 w-5 rounded-b-full bg-white shadow-xs" />
                  </div>
                  <span className="text-xs font-bold tracking-wider" style={{ color: textColor }}>
                    {age > 0 ? `${age} th` : "HBD"}
                  </span>
                </div>

                {/* CAKE BOTTOM TIER */}
                <div
                  className="relative h-16 w-48 rounded-t-2xl border-t-2 border-amber-900/10 shadow-lg flex items-center justify-center"
                  style={{
                    backgroundColor: isDarkCard ? "#1e293b" : "#fed7aa",
                  }}
                >
                  <div className="absolute inset-x-3 -top-1.5 flex justify-between">
                    <span className="h-2.5 w-5 rounded-b-full bg-white shadow-xs" />
                    <span className="h-3.5 w-6 rounded-b-full bg-white shadow-xs" />
                    <span className="h-2.5 w-5 rounded-b-full bg-white shadow-xs" />
                    <span className="h-3.5 w-6 rounded-b-full bg-white shadow-xs" />
                    <span className="h-2.5 w-5 rounded-b-full bg-white shadow-xs" />
                  </div>
                  <p className="text-[11px] font-bold uppercase tracking-widest opacity-75" style={{ color: textColor }}>
                    Happy Birthday
                  </p>
                </div>

                {/* CAKE PLATE */}
                <div
                  className="h-3 w-56 rounded-full shadow-md -mt-0.5 border"
                  style={{
                    backgroundColor: isDarkCard ? "#475569" : "#ffffff",
                    borderColor: "rgba(0,0,0,0.1)",
                  }}
                />
              </div>

              {/* ACTION BUTTON: TIUP LILIN */}
              <div className="mt-8">
                <button
                  type="button"
                  onClick={handleBlowCandle}
                  className="group relative inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 active:scale-95"
                  style={{ backgroundColor: primaryColor }}
                >
                  <Flame className="h-4 w-4 transition-transform group-hover:scale-125" />
                  <span>
                    {!isCandleBlown
                      ? "Tiup Lilin Ulang Tahun 🎂💨"
                      : "Lilin Padam! Nyalakan Kembali 🕯️"}
                  </span>
                </button>
              </div>

              {/* ================= SECRET WISH REVEAL CARD ================= */}
              {isCandleBlown && String(letter.secretWishMessage).trim() && (
                <div
                  className="mt-8 w-full rounded-2xl border p-5 sm:p-6 text-left shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500"
                  style={{
                    backgroundColor: `${primaryColor}10`,
                    borderColor: `${primaryColor}35`,
                  }}
                >
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2" style={{ color: primaryColor }}>
                    <Gift className="h-4 w-4" />
                    <span>Doa & Harapan Kejutan Untukmu:</span>
                  </div>
                  <p
                    className="text-sm sm:text-base leading-relaxed font-medium"
                    style={{ color: textColor }}
                  >
                    “{String(letter.secretWishMessage)}”
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3. AGE STATS & MILESTONES ================= */}
      <section className="relative px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-4xl">
          {/* 3 Quick Stat Metric Cards */}
          <div className="grid gap-4 sm:grid-cols-3">
            {/* Stat 1: Usia */}
            <div
              className="rounded-2xl border p-5 text-center shadow-sm"
              style={{
                backgroundColor: cardColor,
                borderColor: isDarkCard ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)",
              }}
            >
              <div
                className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl mb-3"
                style={{ backgroundColor: `${primaryColor}18`, color: primaryColor }}
              >
                <Award className="h-5 w-5" />
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold font-display" style={{ color: primaryColor }}>
                {age > 0 ? `${age} Tahun` : "Spesial"}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider" style={{ color: textColor }}>
                Perjalanan Hidup Bermakna
              </p>
            </div>

            {/* Stat 2: Hari-hari hidup */}
            <div
              className="rounded-2xl border p-5 text-center shadow-sm"
              style={{
                backgroundColor: cardColor,
                borderColor: isDarkCard ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)",
              }}
            >
              <div
                className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl mb-3"
                style={{ backgroundColor: `${primaryColor}18`, color: primaryColor }}
              >
                <Calendar className="h-5 w-5" />
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold font-display" style={{ color: primaryColor }}>
                {daysLived.toLocaleString("id-ID")}+ Hari
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider" style={{ color: textColor }}>
                Hari Membawa Kebaikan
              </p>
            </div>

            {/* Stat 3: Cinta & Cerita */}
            <div
              className="rounded-2xl border p-5 text-center shadow-sm"
              style={{
                backgroundColor: cardColor,
                borderColor: isDarkCard ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)",
              }}
            >
              <div
                className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl mb-3"
                style={{ backgroundColor: `${primaryColor}18`, color: primaryColor }}
              >
                <Heart className="h-5 w-5" />
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold font-display" style={{ color: primaryColor }}>
                Tak Terhitung
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider" style={{ color: textColor }}>
                Tawa & Cerita Indah
              </p>
            </div>
          </div>

          {/* 3 Milestones Timeline */}
          {milestones.length > 0 && (
            <div className="mt-12">
              <div className="text-center mb-8">
                <span
                  className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider"
                  style={{ color: primaryColor }}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Jejak Perjalanan
                </span>
                <h2
                  className="mt-1 font-display text-2xl sm:text-3xl font-bold"
                  style={{ color: textColor }}
                >
                  {String(letter.milestoneTitle || "Babak-Babak Berharga")}
                </h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {milestones.map((m, idx) => (
                  <div
                    key={idx}
                    className="relative rounded-2xl border p-5 shadow-xs transition-all hover:shadow-md"
                    style={{
                      backgroundColor: cardColor,
                      borderColor: isDarkCard ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)",
                    }}
                  >
                    <span
                      className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold text-white shadow-xs"
                      style={{ backgroundColor: primaryColor }}
                    >
                      {m.year}
                    </span>
                    <h3
                      className="mt-3 font-display text-base font-bold"
                      style={{ color: textColor }}
                    >
                      {m.title}
                    </h3>
                    {m.desc && (
                      <p
                        className="mt-1.5 text-xs leading-relaxed"
                        style={{ color: bodyTextColor }}
                      >
                        {m.desc}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ================= 4. POLAROID PHOTO GALLERY (UP TO 6 PHOTOS) ================= */}
      {galleryItems.length > 0 && (
        <section className="relative px-5 py-12 sm:px-8 sm:py-16">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-10">
              <span
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
                style={{ color: primaryColor }}
              >
                <PartyPopper className="h-3.5 w-3.5" />
                Momen Kebersamaan
              </span>
              <h2
                className="mt-1 font-display text-2xl sm:text-4xl font-bold"
                style={{ color: textColor }}
              >
                {String(letter.galleryTitle || "Galeri Kenangan Kita")}
              </h2>
              {String(letter.gallerySubtitle).trim() && (
                <p
                  className="mx-auto mt-2 max-w-xl text-xs sm:text-sm"
                  style={{ color: bodyTextColor }}
                >
                  {String(letter.gallerySubtitle)}
                </p>
              )}
            </div>

            {/* Polaroid Grid with slight organic tilt */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {galleryItems.map((item, idx) => {
                const tilts = ["-rotate-1", "rotate-1", "-rotate-2", "rotate-2", "-rotate-1", "rotate-1"];
                const tiltClass = tilts[idx % tilts.length];

                return (
                  <div
                    key={idx}
                    onClick={() => setLightboxPhoto(item)}
                    className={cn(
                      "group cursor-pointer rounded-2xl border bg-white p-3.5 shadow-md transition-all hover:scale-105 hover:shadow-xl hover:z-10",
                      tiltClass,
                    )}
                    style={{
                      borderColor: "rgba(0,0,0,0.08)",
                    }}
                  >
                    {/* Image frame */}
                    <div className="relative aspect-4/3 overflow-hidden rounded-xl bg-neutral-100">
                      <img
                        src={item.url}
                        alt={item.caption || `Kenangan ${idx + 1}`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="rounded-full bg-white/90 p-2 text-neutral-800 shadow-md">
                          <Maximize2 className="h-4 w-4" />
                        </span>
                      </div>
                    </div>

                    {/* Polaroid Bottom Caption */}
                    <div className="mt-3 px-1">
                      <p className="font-hand text-lg font-bold text-neutral-800 truncate">
                        {item.caption || "Momen Indah Bersama"}
                      </p>
                      {item.date && (
                        <p className="text-[11px] font-medium text-neutral-500">
                          {item.date}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ================= 5. FOUR BEST WISHES / DOA TERBAIK ================= */}
      {wishes.length > 0 && (
        <section className="relative px-5 py-12 sm:px-8 sm:py-16">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-8">
              <span
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
                style={{ color: primaryColor }}
              >
                <Gift className="h-3.5 w-3.5" />
                Untaian Doa Tulus
              </span>
              <h2
                className="mt-1 font-display text-2xl sm:text-3xl font-bold"
                style={{ color: textColor }}
              >
                {String(letter.wishesTitle || "Empat Doa & Harapan Terindah")}
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {wishes.map((w, idx) => {
                const icons = [ShieldCheck, Sun, Smile, Sparkles];
                const IconComponent = icons[idx % icons.length];

                return (
                  <div
                    key={idx}
                    className="flex items-start gap-3.5 rounded-2xl border p-4 sm:p-5 shadow-xs transition-all hover:shadow-md"
                    style={{
                      backgroundColor: cardColor,
                      borderColor: isDarkCard ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)",
                    }}
                  >
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl shadow-xs"
                      style={{
                        backgroundColor: `${primaryColor}18`,
                        color: primaryColor,
                      }}
                    >
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <p
                      className="text-xs sm:text-sm leading-relaxed font-medium"
                      style={{ color: textColor }}
                    >
                      {w}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ================= 6. HEARTFELT BIRTHDAY LETTER ================= */}
      <section className="relative px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <div
            className="relative rounded-[2.5rem] border px-6 py-10 sm:px-12 sm:py-14 shadow-paper transition-all"
            style={{
              backgroundColor: cardColor,
              borderColor: isDarkCard ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)",
            }}
          >
            {/* Wax Seal / Gift Ribbon Badge */}
            <div className="flex justify-center -mt-16 sm:-mt-20 mb-6">
              <div
                className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full shadow-xl border-4 text-white"
                style={{
                  backgroundColor: primaryColor,
                  borderColor: cardColor,
                }}
              >
                <Gift className="h-7 w-7 sm:h-9 sm:w-9" />
              </div>
            </div>

            <p
              className="text-center text-xs font-bold uppercase tracking-wider"
              style={{ color: primaryColor }}
            >
              Surat Ulang Tahun Dari Hati
            </p>

            <h2
              className="mt-1 text-center font-display text-2xl sm:text-3xl font-bold"
              style={{ color: textColor }}
            >
              Untuk {String(letter.recipientName)}
            </h2>

            {/* Quote Callout */}
            {String(letter.quote).trim() && (
              <div
                className="mt-6 rounded-2xl border p-4 text-center text-xs sm:text-sm font-medium italic leading-relaxed"
                style={{
                  backgroundColor: `${primaryColor}0d`,
                  borderColor: `${primaryColor}25`,
                  color: primaryColor,
                }}
              >
                “{String(letter.quote)}”
              </div>
            )}

            {/* Letter Body Paragraphs */}
            <div
              className="mt-8 space-y-5 text-sm sm:text-base leading-[1.85]"
              style={{ color: bodyTextColor }}
            >
              {paragraphs.length > 0 ? (
                paragraphs.map((para, i) => <p key={i}>{para}</p>)
              ) : (
                <p className="opacity-60 italic">Tulisan ucapanmu akan muncul di sini.</p>
              )}
            </div>

            {/* Letter Signature & Date */}
            <footer
              className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t pt-6"
              style={{
                borderColor: isDarkCard ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
              }}
            >
              <div>
                <p className="text-[11px] uppercase tracking-wider opacity-60" style={{ color: textColor }}>
                  Dengan tulus dari:
                </p>
                <p
                  className="font-hand text-2xl font-bold mt-0.5"
                  style={{ color: primaryColor }}
                >
                  {String(letter.senderName)}
                </p>
              </div>

              {letter.letterDate ? (
                <span className="text-xs font-medium opacity-70" style={{ color: textColor }}>
                  {formatDate(String(letter.letterDate))}
                </span>
              ) : null}
            </footer>
          </div>
        </div>
      </section>

      {/* ================= 7. FOOTER TRIBUTE ================= */}
      <footer className="relative border-t py-8 text-center" style={{ borderColor: isDarkBg ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)" }}>
        <p className="text-xs font-medium opacity-60" style={{ color: textColor }}>
          Website Tribut Ulang Tahun Spesial · Dibuat dengan penuh cinta untuk {String(letter.recipientName)}
        </p>
      </footer>

      {/* ================= PHOTO LIGHTBOX MODAL ================= */}
      {lightboxPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxPhoto(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-3xl w-full overflow-hidden rounded-2xl bg-white shadow-2xl animate-in zoom-in-95 duration-200"
          >
            <button
              type="button"
              onClick={() => setLightboxPhoto(null)}
              className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black transition-colors"
            >
              <X className="h-4 w-4" />
            </button>

            <img
              src={lightboxPhoto.url}
              alt={lightboxPhoto.caption}
              className="max-h-[75vh] w-full object-contain bg-neutral-900"
            />

            {(lightboxPhoto.caption || lightboxPhoto.date) && (
              <div className="p-4 bg-white text-neutral-900">
                <p className="font-hand text-xl font-bold">
                  {lightboxPhoto.caption || "Momen Kenangan Indah"}
                </p>
                {lightboxPhoto.date && (
                  <p className="text-xs text-neutral-500 mt-0.5">
                    {lightboxPhoto.date}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </article>
  );
}
