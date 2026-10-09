"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import {
  Sparkles,
  Pause,
  Play,
  Heart,
  Star,
  Cake,
  PartyPopper,
  Flame,
  Award,
  Calendar,
  Gift,
  Smile,
  Music,
  Camera,
  CheckCircle,
  Quote
} from "lucide-react";
import { toParagraphs } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";
import type { LetterContent } from "@/types/letter";
import { withDefaults } from "../utils";
import { isColorDark } from "../color-presets";

const defaults = {
  primaryColor: "#FF5E7E",
  backgroundColor: "#FFF5F7",
  cardColor: "#FFFFFF",
  textColor: "#2D3748",
  bodyTextColor: "#4A5568",
  recipientName: "Dinda Anandita",
  senderName: "Keluarga & Sahabat",
  age: 24,
  greeting: "Selamat Ulang Tahun! 🎉",
  heroBadge: "✨ Hari Paling Spesial di Tahun Ini",
  title: "Merayakan Hari Kelahiranmu",
  tagline:
    "Hari ini semesta ikut bersukacita merayakan bertambahnya usiamu. Terima kasih telah menjadi sosok yang luar biasa bagi kami semua.",
  heroImage:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",

  messageTitle: "Surat Kecil Untukmu",
  message:
    "Selamat ulang tahun! Di hari yang sangat istimewa ini, kami ingin mengungkapkan betapa berharganya dirimu bagi kami. Kamu selalu bisa membuat suasana menjadi lebih ceria dan hangat.\n\nSemoga di usia yang baru ini, kamu semakin dewasa, semakin bijaksana, dan segala yang kamu cita-citakan dapat segera tercapai. Jangan pernah lelah untuk terus menebar kebaikan dan menjadi versi terbaik dari dirimu sendiri.\n\nKami selalu mendoakan yang terbaik untukmu dan akan selalu ada di sampingmu dalam setiap langkah perjalananmu.",

  qualityTitle: "Alasan Kami Menyayangimu",
  quality1: "Senyum Manismu",
  quality1Desc: "Selalu bisa menularkan energi positif di manapun kamu berada.",
  quality2: "Hati yang Tulus",
  quality2Desc: "Pendengar yang baik dan selalu peduli pada orang di sekitarmu.",
  quality3: "Ketangguhanmu",
  quality3Desc: "Tidak pernah menyerah dalam menghadapi setiap tantangan hidup.",
  quality4: "Keceriaanmu",
  quality4Desc: "Membawa tawa dan kebahagiaan di setiap suasana bersama kami.",

  milestoneTitle: "Perjalanan Luar Biasamu",
  milestone1Year: "Masa Kecil",
  milestone1Title: "Awal yang Ceria",
  milestone1Desc: "Membawa kebahagiaan sejak hari pertama hadir di dunia.",
  milestone2Year: "Masa Remaja",
  milestone2Title: "Mencari Jati Diri",
  milestone2Desc: "Tumbuh menjadi pribadi yang penuh semangat dan ambisi.",
  milestone3Year: "Dewasa Muda",
  milestone3Title: "Mengejar Mimpi",
  milestone3Desc: "Berani mengambil langkah besar untuk mencapai cita-cita.",
  milestone4Year: "Hari Ini",
  milestone4Title: "Semakin Bersinar",
  milestone4Desc: "Menjadi sosok inspiratif yang membanggakan kami semua.",

  cakeTitle: "Tiup Lilin Impianmu!",
  cakeWishPrompt: "Tutup matamu, ucapkan doa terbaikmu dalam hati, lalu tiup lilinnya!",
  secretWishMessage:
    "Semoga tahun ini membawa banyak kejutan indah, rezeki yang berkah, kesehatan yang prima, dan kebahagiaan yang tak berkesudahan! 🎂✨",

  galleryTitle: "Memori Indah Kita",
  gallerySubtitle: "Setiap momen bersamamu adalah kenangan berharga yang tak terlupakan.",
  galleryImg1:
    "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
  galleryCaption1: "Pesta Kejutan Spesial",
  galleryImg2:
    "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80",
  galleryCaption2: "Liburan Tak Terlupakan",
  galleryImg3:
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
  galleryCaption3: "Kue Manis Untukmu",
  galleryImg4:
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
  galleryCaption4: "Tawa Lepas Bersama",
  galleryImg5:
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80",
  galleryCaption5: "Senja & Obrolan Hangat",
  galleryImg6:
    "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=80",
  galleryCaption6: "Malam Syukuran",

  wishesTitle: "Doa & Harapan Tulus Kami",
  wish1: "Kesehatan yang sempurna dan umur yang panjang penuh berkah.",
  wish2: "Kesuksesan luar biasa dalam setiap langkah dan karirmu.",
  wish3: "Kebahagiaan yang melimpah dan senyum yang tak pernah pudar.",
  wish4: "Dikelilingi oleh cinta dan orang-orang baik di sepanjang hidupmu.",

  quote: "Count your age by friends, not years. Count your life by smiles, not tears.",
  signature: "Dengan pelukan hangat,\nKeluarga & Sahabat",
  bgMusicUrl: "",
  musicTitle: "Happy Birthday Melody",
};

/** Floating Elements (Balloons, Stars, Confetti) */
const FLOATING_ELEMENTS = Array.from({ length: 15 }).map((_, i) => ({
  id: i,
  left: `${Math.random() * 90 + 5}%`,
  top: `${Math.random() * 90 + 5}%`,
  size: Math.random() * 15 + 10,
  delay: Math.random() * 5,
  duration: Math.random() * 4 + 4,
  rotate: Math.random() * 360,
  type: i % 3 === 0 ? "star" : i % 3 === 1 ? "circle" : "square",
}));

function playCelebrationChime() {
  if (typeof window === "undefined") return;
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.15);
      gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.15);
      gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + idx * 0.15 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.15 + 0.8);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.15);
      osc.stop(ctx.currentTime + idx * 0.15 + 1);
    });
  } catch {
    // Ignore audio errors
  }
}

export function UltimateBirthdayTemplate({
  data,
  className,
}: {
  data: LetterContent;
  className?: string;
}) {
  const letter = withDefaults(defaults, data);
  const primaryColor = String(letter.primaryColor || "#FF5E7E");
  const backgroundColor = String(letter.backgroundColor || "#FFF5F7");
  const cardColor = String(letter.cardColor || "#FFFFFF");
  const textColor = String(letter.textColor || "#2D3748");
  const bodyTextColor = String(letter.bodyTextColor || "#4A5568");

  const isDarkBg = useMemo(() => isColorDark(backgroundColor), [backgroundColor]);
  const isDarkCard = useMemo(() => isColorDark(cardColor), [cardColor]);

  const [isCandleBlown, setIsCandleBlown] = useState(false);
  const [showConfettiBurst, setShowConfettiBurst] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

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
      setTimeout(() => setShowConfettiBurst(false), 4000);
    } else {
      setIsCandleBlown(false);
    }
  };

  const letterRecord = letter as Record<string, unknown>;

  const galleryItems = useMemo(() => {
    const items: Array<{ url: string; caption: string }> = [];
    for (let i = 1; i <= 6; i++) {
      const url = letterRecord[`galleryImg${i}`];
      if (typeof url === "string" && url.trim().length > 0) {
        items.push({
          url,
          caption: String(letterRecord[`galleryCaption${i}`] || ""),
        });
      }
    }
    return items;
  }, [letterRecord]);

  const milestones = useMemo(() => {
    const list: Array<{ year: string; title: string; desc: string }> = [];
    for (let i = 1; i <= 4; i++) {
      const title = letterRecord[`milestone${i}Title`];
      if (typeof title === "string" && title.trim().length > 0) {
        list.push({
          year: String(letterRecord[`milestone${i}Year`] || `Periode ${i}`),
          title,
          desc: String(letterRecord[`milestone${i}Desc`] || ""),
        });
      }
    }
    return list;
  }, [letterRecord]);

  const qualities = useMemo(() => {
    const list: Array<{ title: string; desc: string }> = [];
    for (let i = 1; i <= 4; i++) {
      const title = letterRecord[`quality${i}`];
      if (typeof title === "string" && title.trim().length > 0) {
        list.push({
          title,
          desc: String(letterRecord[`quality${i}Desc`] || ""),
        });
      }
    }
    return list;
  }, [letterRecord]);

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
        "relative w-full overflow-hidden transition-colors duration-700 font-sans",
        className
      )}
      style={{ backgroundColor }}
    >
      {/* 0. AMBIENT ANIMATED BACKGROUND */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden opacity-50">
        {isMounted &&
          FLOATING_ELEMENTS.map((el) => (
            <div
              key={el.id}
              className="absolute animate-bounce"
              style={{
                left: el.left,
                top: el.top,
                animationDelay: `${el.delay}s`,
                animationDuration: `${el.duration}s`,
              }}
            >
              <div
                className="opacity-40"
                style={{
                  width: el.size,
                  height: el.size,
                  backgroundColor: el.type !== "star" ? primaryColor : "transparent",
                  borderRadius: el.type === "circle" ? "50%" : el.type === "square" ? "4px" : "0",
                  transform: `rotate(${el.rotate}deg)`,
                }}
              >
                {el.type === "star" && (
                  <Star className="h-full w-full" style={{ color: primaryColor, fill: primaryColor }} />
                )}
              </div>
            </div>
          ))}
      </div>

      {/* FLOATING AUDIO PLAYER */}
      {Boolean(String(letter.bgMusicUrl || "").trim()) &&
      !data._isThumbnail &&
      !className?.includes("is-thumbnail") ? (
        <>
          <audio ref={audioRef} src={String(letter.bgMusicUrl)} loop preload="none" />
          <div className="fixed bottom-6 right-6 z-40">
            <button
              onClick={toggleAudio}
              className="flex items-center gap-3 rounded-full px-5 py-3 shadow-2xl backdrop-blur-md transition-all hover:scale-105"
              style={{
                backgroundColor: isDarkBg ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.8)",
                color: textColor,
                border: `1px solid ${primaryColor}40`,
              }}
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full text-white shadow-md"
                style={{ backgroundColor: primaryColor }}
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-1" />}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-bold uppercase opacity-60">Musik</p>
                <p className="text-sm font-semibold max-w-[150px] truncate">
                  {String(letter.musicTitle || "Happy Birthday")}
                </p>
              </div>
            </button>
          </div>
        </>
      ) : null}

      {/* 1. HERO SECTION (Cover) */}
      <section className="relative px-6 pt-16 pb-20 sm:pt-24 sm:pb-28 flex flex-col items-center justify-center min-h-[90vh]">
        <div className="text-center max-w-3xl mx-auto z-10">
          {String(letter.heroBadge).trim() && (
            <div
              className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold shadow-md mb-8 animate-in slide-in-from-top-10 duration-700"
              style={{
                backgroundColor: cardColor,
                color: primaryColor,
                border: `2px solid ${primaryColor}30`,
              }}
            >
              <PartyPopper className="h-4 w-4" />
              <span>{String(letter.heroBadge)}</span>
            </div>
          )}

          <p
            className="text-lg sm:text-xl font-bold tracking-widest uppercase mb-4 animate-in fade-in zoom-in duration-700 delay-100"
            style={{ color: primaryColor }}
          >
            {String(letter.greeting)}
          </p>

          <h1
            className="font-display text-5xl sm:text-7xl font-extrabold tracking-tight mb-6 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-200 drop-shadow-sm"
            style={{ color: textColor }}
          >
            {String(letter.recipientName)}
          </h1>

          <p
            className="text-2xl sm:text-3xl font-medium mb-8 animate-in fade-in duration-700 delay-300"
            style={{ color: textColor, opacity: 0.9 }}
          >
            {String(letter.title)}
          </p>

          {String(letter.heroImage).trim() && (
            <div className="relative mx-auto mt-12 mb-10 group animate-in fade-in zoom-in duration-1000 delay-500">
              <div
                className="absolute inset-0 rounded-full blur-2xl opacity-40 group-hover:opacity-60 transition-opacity"
                style={{ backgroundColor: primaryColor }}
              />
              <div
                className="relative h-64 w-64 sm:h-80 sm:w-80 overflow-hidden rounded-full border-8 shadow-2xl mx-auto transform transition-transform duration-500 hover:scale-105 hover:rotate-3"
                style={{ borderColor: cardColor }}
              >
                <img
                  src={String(letter.heroImage)}
                  alt="Birthday Person"
                  className="h-full w-full object-cover"
                />
              </div>
              {age > 0 && (
                <div
                  className="absolute bottom-2 right-4 sm:right-10 flex h-20 w-20 items-center justify-center rounded-full border-4 shadow-xl transform rotate-12"
                  style={{
                    backgroundColor: primaryColor,
                    borderColor: cardColor,
                    color: "#fff",
                  }}
                >
                  <div className="text-center">
                    <span className="block text-2xl font-bold leading-none">{age}</span>
                    <span className="block text-[10px] font-bold uppercase tracking-wider">Tahun</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {String(letter.tagline).trim() && (
            <p
              className="max-w-2xl mx-auto text-lg leading-relaxed font-medium animate-in fade-in duration-1000 delay-700"
              style={{ color: bodyTextColor }}
            >
              {String(letter.tagline)}
            </p>
          )}
        </div>
      </section>

      {/* 2. STATS & FUN FACTS SECTION */}
      <section className="relative px-6 py-16 sm:py-20 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: Calendar, value: `${daysLived.toLocaleString()}`, label: "Hari Penuh Makna" },
              { icon: Smile, value: "Tak Terhingga", label: "Senyum & Tawa" },
              { icon: Heart, value: "100%", label: "Dicintai Banyak Orang" },
              { icon: Star, value: `${age} Tahun`, label: "Perjalanan Hebat" },
            ].map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center p-6 rounded-3xl shadow-lg transform transition-transform hover:-translate-y-2"
                style={{ backgroundColor: cardColor }}
              >
                <div
                  className="p-4 rounded-full mb-4"
                  style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
                >
                  <stat.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-center mb-1" style={{ color: textColor }}>
                  {stat.value}
                </h3>
                <p className="text-xs font-semibold text-center uppercase tracking-wide opacity-80" style={{ color: bodyTextColor }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. HEARTFELT LETTER SECTION */}
      <section className="relative px-6 py-16 sm:py-24 z-10">
        <div className="max-w-3xl mx-auto">
          <div
            className="p-8 sm:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden"
            style={{ backgroundColor: cardColor }}
          >
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Quote className="h-32 w-32" style={{ color: primaryColor }} />
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold mb-8 flex items-center gap-3" style={{ color: textColor }}>
              <span className="p-2 rounded-xl" style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}>
                <CheckCircle className="h-6 w-6" />
              </span>
              {String(letter.messageTitle)}
            </h2>
            
            <div className="space-y-6 text-lg leading-relaxed relative z-10" style={{ color: bodyTextColor }}>
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. FAVORITE QUALITIES SECTION */}
      {qualities.length > 0 && (
        <section className="relative px-6 py-16 sm:py-20">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl sm:text-5xl font-bold mb-4" style={{ color: textColor }}>
              {String(letter.qualityTitle || "Alasan Kami Menyayangimu")}
            </h2>
            <div className="h-1 w-20 mx-auto rounded-full mb-12" style={{ backgroundColor: primaryColor }} />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {qualities.map((q, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-3xl shadow-xl transition-all hover:scale-105"
                  style={{ backgroundColor: cardColor }}
                >
                  <div
                    className="h-14 w-14 rounded-full flex items-center justify-center text-xl font-bold mb-6 mx-auto shadow-inner"
                    style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}
                  >
                    {idx + 1}
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: textColor }}>{q.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: bodyTextColor }}>{q.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. INTERACTIVE CAKE & WISH SECTION */}
      <section className="relative px-6 py-20 z-10">
        <div className="max-w-2xl mx-auto">
          <div
            className="relative overflow-hidden rounded-[3rem] p-10 sm:p-16 text-center shadow-2xl border-4"
            style={{
              backgroundColor: cardColor,
              borderColor: `${primaryColor}30`,
            }}
          >
            {showConfettiBurst && (
              <div aria-hidden className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full animate-ping"
                    style={{
                      left: `${40 + Math.random() * 20}%`,
                      top: `${40 + Math.random() * 20}%`,
                      width: Math.random() * 20 + 10,
                      height: Math.random() * 20 + 10,
                      backgroundColor: [primaryColor, "#FBBF24", "#34D399", "#60A5FA"][i % 4],
                      animationDuration: `${0.5 + Math.random() * 1}s`,
                    }}
                  />
                ))}
              </div>
            )}

            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold uppercase tracking-widest mb-6"
              style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
            >
              <Cake className="h-4 w-4" />
              Momen Spesial
            </span>

            <h2 className="text-3xl sm:text-5xl font-bold mb-4" style={{ color: textColor }}>
              {String(letter.cakeTitle)}
            </h2>

            <p className="text-lg font-medium opacity-80 max-w-md mx-auto mb-12" style={{ color: bodyTextColor }}>
              {!isCandleBlown ? String(letter.cakeWishPrompt) : "✨ Doamu telah terbang ke langit. Semoga segera terwujud!"}
            </p>

            {/* THE CAKE ILLUSTRATION */}
            <div className="flex flex-col items-center justify-center mb-12">
              <div className="relative flex flex-col items-center">
                {/* Flame & Candle */}
                <div className="relative mb-1 flex flex-col items-center">
                  {!isCandleBlown ? (
                    <div className="relative flex flex-col items-center animate-pulse" style={{ animationDuration: "1s" }}>
                      <span className="absolute -top-4 h-10 w-8 rounded-full blur-md opacity-80" style={{ backgroundColor: "#FBBF24" }} />
                      <span className="relative z-10 h-8 w-4 rounded-full bg-gradient-to-t from-amber-500 to-yellow-100 shadow-lg" />
                    </div>
                  ) : (
                    <div className="h-8 flex items-center justify-center animate-in fade-in duration-500">
                      <span className="text-2xl opacity-50">💨</span>
                    </div>
                  )}
                  <div
                    className="h-12 w-4 rounded-sm shadow-inner mt-1"
                    style={{ backgroundColor: primaryColor }}
                  />
                </div>

                {/* Cake Tiers */}
                <div
                  className="relative h-14 w-36 rounded-t-3xl shadow-lg border-b-4 border-black/5"
                  style={{ backgroundColor: "#FDE68A" }}
                >
                  <div className="absolute inset-x-0 -top-2 flex justify-around">
                    {[1,2,3,4,5].map(i => <div key={i} className="h-4 w-6 bg-white rounded-b-full shadow-sm" />)}
                  </div>
                </div>
                
                <div
                  className="relative h-20 w-56 rounded-t-3xl shadow-xl flex items-center justify-center border-t-4 border-white/40"
                  style={{ backgroundColor: "#FBCFE8" }}
                >
                  <div className="absolute inset-x-2 -top-2 flex justify-around">
                    {[1,2,3,4,5,6,7].map(i => <div key={i} className="h-5 w-6 bg-white rounded-b-full shadow-sm" />)}
                  </div>
                  <span className="font-bold text-xl uppercase tracking-widest text-pink-500 opacity-70 mt-2">
                    HBD
                  </span>
                </div>

                <div className="h-4 w-64 rounded-full shadow-xl -mt-1 bg-gray-200" />
              </div>
            </div>

            <button
              onClick={handleBlowCandle}
              className="group inline-flex items-center gap-3 rounded-full px-8 py-4 text-lg font-bold text-white shadow-xl transition-all hover:scale-110 active:scale-95"
              style={{ backgroundColor: primaryColor }}
            >
              <Flame className="h-5 w-5 transition-transform group-hover:scale-125" />
              <span>{!isCandleBlown ? "Tiup Lilin Sekarang 🎂" : "Nyalakan Lagi 🕯️"}</span>
            </button>

            {isCandleBlown && String(letter.secretWishMessage).trim() && (
              <div
                className="mt-10 rounded-2xl p-6 text-center shadow-lg animate-in fade-in slide-in-from-bottom-5 duration-700"
                style={{ backgroundColor: `${primaryColor}10`, border: `1px solid ${primaryColor}30` }}
              >
                <Gift className="h-8 w-8 mx-auto mb-3" style={{ color: primaryColor }} />
                <p className="text-lg font-bold" style={{ color: textColor }}>
                  {String(letter.secretWishMessage)}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 6. MILESTONES (Journey) */}
      {milestones.length > 0 && (
        <section className="relative px-6 py-16 sm:py-24 bg-black/5 z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-bold mb-16 text-center" style={{ color: textColor }}>
              {String(letter.milestoneTitle || "Perjalanan Luar Biasamu")}
            </h2>
            
            <div className="relative border-l-4 ml-4 sm:ml-0 sm:border-l-0 sm:border-t-4 pt-8 sm:pt-0 border-opacity-30" style={{ borderColor: primaryColor }}>
              <div className="sm:flex sm:justify-between sm:pt-8 gap-8 space-y-12 sm:space-y-0">
                {milestones.map((m, idx) => (
                  <div key={idx} className="relative pl-8 sm:pl-0 sm:w-1/4 sm:text-center group">
                    {/* Timeline Node */}
                    <div
                      className="absolute left-[-11px] sm:left-1/2 top-0 sm:top-[-45px] sm:-translate-x-1/2 h-5 w-5 rounded-full border-4 shadow-md transition-transform group-hover:scale-150"
                      style={{ backgroundColor: cardColor, borderColor: primaryColor }}
                    />
                    
                    <div
                      className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                      style={{ backgroundColor: cardColor }}
                    >
                      <span
                        className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-3"
                        style={{ backgroundColor: primaryColor }}
                      >
                        {m.year}
                      </span>
                      <h3 className="text-lg font-bold mb-2" style={{ color: textColor }}>{m.title}</h3>
                      <p className="text-sm opacity-80" style={{ color: bodyTextColor }}>{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 7. GALLERY SECTION */}
      {galleryItems.length > 0 && (
        <section className="relative px-6 py-16 sm:py-24 z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-5xl font-bold mb-4" style={{ color: textColor }}>
                {String(letter.galleryTitle || "Galeri Kenangan Kita")}
              </h2>
              <p className="text-lg opacity-80 max-w-2xl mx-auto" style={{ color: bodyTextColor }}>
                {String(letter.gallerySubtitle)}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {galleryItems.map((item, idx) => {
                const rotation = idx % 2 === 0 ? "rotate-2" : "-rotate-2";
                return (
                  <div
                    key={idx}
                    className={cn(
                      "p-4 pb-6 rounded-sm shadow-xl transform transition-transform hover:scale-105 hover:z-20 cursor-pointer",
                      rotation
                    )}
                    style={{ backgroundColor: "#FFFFFF" }}
                  >
                    <div className="aspect-square overflow-hidden mb-4 rounded-sm bg-gray-100">
                      <img src={item.url} alt={item.caption} className="w-full h-full object-cover" />
                    </div>
                    <p className="text-center font-display text-xl text-gray-800 font-medium">
                      {item.caption}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 8. WISHES GRID */}
      {wishes.length > 0 && (
        <section className="relative px-6 py-16 sm:py-20 z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12" style={{ color: textColor }}>
              {String(letter.wishesTitle || "Doa & Harapan Kami")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {wishes.map((wish, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-6 rounded-2xl shadow-md transition-colors hover:shadow-lg"
                  style={{ backgroundColor: cardColor }}
                >
                  <div
                    className="p-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
                  >
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <p className="text-lg font-medium leading-relaxed pt-1" style={{ color: bodyTextColor }}>
                    {wish}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 9. FOOTER / CLOSING */}
      <section className="relative px-6 py-24 z-10 text-center">
        <div className="max-w-2xl mx-auto">
          {String(letter.quote).trim() && (
            <p
              className="text-2xl sm:text-3xl font-serif italic font-medium mb-10 opacity-90 leading-relaxed"
              style={{ color: textColor }}
            >
              "{String(letter.quote)}"
            </p>
          )}
          
          <div className="h-1 w-24 mx-auto rounded-full mb-10 opacity-30" style={{ backgroundColor: textColor }} />
          
          <p className="text-xl sm:text-2xl font-bold tracking-wide" style={{ color: primaryColor }}>
            {String(letter.signature)}
          </p>
        </div>
      </section>
    </article>
  );
}
