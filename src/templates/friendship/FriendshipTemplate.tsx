"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import {
  Sparkles,
  X,
  Users,
  Handshake,
  Calendar,
  Heart,
  Music,
  Smile,
  ShieldCheck,
  Zap,
  Coffee,
  type LucideIcon,
} from "lucide-react";
import { formatDate, toParagraphs } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";
import type { LetterContent } from "@/types/letter";
import { withDefaults } from "../utils";
import { isColorDark } from "../color-presets";

const defaults = {
  primaryColor: "#2f6f5e",
  backgroundColor: "#f7f9f6",
  cardColor: "#ffffff",
  textColor: "#1a2e26",
  bodyTextColor: "#334155",
  recipientName: "Bagas Adiputra",
  nickname: "Bro Bagas",
  friendsSince: "2016 • Bangku SMA",
  heroBadge: "Partner in Crime Since Day One",
  title: "Untuk Sahabat Terbaik Seumur Hidup",
  tagline:
    "Dari sekadar teman sebangku, sampai jadi orang yang paling tahu isi kepala dan rahasia terbesarku.",
  heroImage:
    "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80",

  fistBumpTitle: "Tos Sahabat / Fist Bump",
  fistBumpPrompt: "Ketuk kepalan tangan di bawah untuk tos & dengarkan bunyi pertemanan kita!",
  secretPledgeMessage:
    "🤝 IKRAR PERSAHABATAN: Apapun yang terjadi di masa depan, entah jarak memisahkan atau kesibukan menenggelamkan, kalau salah satu butuh bantuan jam 2 pagi, pintu rumah selalu terbuka lebar tanpa banyak tanya!",

  totalYears: "8+ Tahun",
  deepTalks: "1,200+ Jam",
  zeroSecrets: "0 Rahasia Bocor",
  milestoneTitle: "Kilas Balik Perjalanan Persahabatan Kita",
  milestone1Year: "2016",
  milestone1Title: "Pertemuan Pertama",
  milestone1Desc:
    "Waktu orientasi sekolah, kita sama-sama telat dan dihukum push up bareng di lapangan.",
  milestone2Year: "2019",
  milestone2Title: "Touring Motor Dadakan",
  milestone2Desc:
    "Motor mogok pas hujan badai di pegunungan, tapi kita malah ketawa sambil dorong bareng.",
  milestone3Year: "2024 - Sekarang",
  milestone3Title: "Menapaki Karier Masing-Masing",
  milestone3Desc:
    "Meskipun beda kantor dan sering lembur, obrolan kita selalu nyambung layaknya kemarin sore.",

  galleryTitle: "Koleksi Momen Terbaik Kita",
  gallerySubtitle: "Setiap tawa dan kekonyolan yang terekam dalam perjalanan panjang ini.",
  galleryImg1:
    "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
  galleryCaption1: "Ngopi santai sampai larut malam",
  galleryDate1: "Oktober 2018",
  galleryImg2:
    "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=800&q=80",
  galleryCaption2: "Road trip seru ke pantai selatan",
  galleryDate2: "Juli 2020",
  galleryImg3:
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
  galleryCaption3: "Selebrasi bareng wisuda sarjana",
  galleryDate3: "September 2022",
  galleryImg4:
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
  galleryCaption4: "Kerja kelompok yang berujung gaming",
  galleryDate4: "Mei 2023",
  galleryImg5:
    "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80",
  galleryCaption5: "Pesta kembang api akhir tahun",
  galleryDate5: "Desember 2023",
  galleryImg6:
    "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80",
  galleryCaption6: "Reuni dadakan formasi lengkap",
  galleryDate6: "Agustus 2024",

  wishesTitle: "Empat Hal yang Paling Aku Hargai Darimu",
  quality1Title: "Pendengar Tanpa Menghakimi",
  quality1Desc:
    "Selalu siap jadi tempat berkeluh kesah tanpa pernah memotong atau langsung memojokkan.",
  quality2Title: "Paling Loyal & Dapat Diandalkan",
  quality2Desc:
    "Tak peduli jam berapa ditelepon, kalau darurat kamu selalu jadi orang pertama yang merespons.",
  quality3Title: "Sense of Humor yang Luar Biasa",
  quality3Desc:
    "Bahkan di masa-masa terpuruk, candaan recehmu selalu berhasil memecah ketegangan.",
  quality4Title: "Suporter Paling Garis Keras",
  quality4Desc:
    "Ketika semua orang meragukan ide gilaku, kamu satu-satunya yang percaya dan ikut berjuang.",

  quote:
    "Sahabat sejati bukan mereka yang tak pernah terpisah, melainkan mereka yang saat berjumpa kembali terasa tak ada satu detik pun yang berubah.",
  message:
    "Bro Bagas,\n\nKita jarang sekali ngomong yang sentimental atau terlalu serius, jadi anggap saja surat ini adalah salah satu momen langka yang perlu diabadikan.\n\nTerima kasih banyak sudah jadi sahabat terbaik selama lebih dari delapan tahun ini. Dari zaman kita masih bingung mau kuliah di mana, pontang-panting nyari kerja, sampai sekarang kita sama-sama menapaki jalan karier masing-masing.\n\nTerima kasih sudah selalu ada saat aku butuh orang untuk ngobrol tanpa topeng. Sukses selalu buat semua impian dan target barumu. Tetap jadi Bagas yang jujur, kocak, dan rendah hati. Pintu rumahku selalu terbuka buat lu kapan saja!",
  senderName: "Yudha Pratama",
  signature: "Sahabatmu Selamanya,",
  letterDate: "2026-09-20",
  musicTitle: "Acoustic Friendship Melody",
  bgMusicUrl: "",
};

/** Ambient confetti / sparks */
const FRIENDSHIP_SPARKS = [
  { left: "10%", top: "8%", size: 10, rotate: 12 },
  { left: "88%", top: "14%", size: 8, rotate: -20 },
  { left: "5%", top: "35%", size: 12, rotate: 45 },
  { left: "92%", top: "42%", size: 9, rotate: -15 },
  { left: "12%", top: "65%", size: 11, rotate: 30 },
  { left: "85%", top: "72%", size: 8, rotate: -35 },
  { left: "8%", top: "88%", size: 10, rotate: 25 },
  { left: "90%", top: "92%", size: 12, rotate: -10 },
];

/** Synthesizes an acoustic arpeggio chime chord */
function playAcousticChord() {
  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    // Notes: C4, E4, G4, B4, C5 (warm acoustic strum)
    const notes = [261.63, 329.63, 392.0, 493.88, 523.25];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

      gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + idx * 0.08 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.08 + 0.9);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.08);
      osc.stop(ctx.currentTime + idx * 0.08 + 1.0);
    });
  } catch {
    // AudioContext might be restricted by browser policy
  }
}

export function FriendshipTemplate({
  data,
  className,
}: {
  data: LetterContent;
  className?: string;
}) {
  const letter = withDefaults(defaults, data);
  const primaryColor = String(letter.primaryColor || "#2f6f5e");
  const backgroundColor = String(letter.backgroundColor || "#f7f9f6");
  const cardColor = String(letter.cardColor || "#ffffff");
  const textColor = String(letter.textColor || "#1a2e26");
  const bodyTextColor = String(letter.bodyTextColor || "#334155");

  const isDarkBg = useMemo(() => isColorDark(backgroundColor), [backgroundColor]);
  const isDarkCard = useMemo(() => isColorDark(cardColor), [cardColor]);

  // Fist bump state
  const [isBumped, setIsBumped] = useState(false);
  const [showSparks, setShowSparks] = useState(false);

  // Lightbox state
  const [lightboxPhoto, setLightboxPhoto] = useState<{
    url: string;
    caption: string;
    date: string;
  } | null>(null);

  // Audio player state
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Fallback Web Audio Ambient Looper when bgMusicUrl is not set
  const ambientCtxRef = useRef<AudioContext | null>(null);
  const ambientIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const toggleAudio = () => {
    const url = String(letter.bgMusicUrl || "").trim();
    if (url) {
      if (!audioRef.current) {
        audioRef.current = new Audio(url);
        audioRef.current.loop = true;
      }
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    } else {
      // Toggle soft ambient chimes
      if (isPlaying) {
        if (ambientIntervalRef.current) clearInterval(ambientIntervalRef.current);
        if (ambientCtxRef.current) {
          ambientCtxRef.current.close().catch(() => {});
          ambientCtxRef.current = null;
        }
        setIsPlaying(false);
      } else {
        try {
          const AudioContextClass =
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
          if (!AudioContextClass) return;
          const ctx = new AudioContextClass();
          ambientCtxRef.current = ctx;

          const playPluck = () => {
            if (ctx.state === "suspended") ctx.resume();
            const scale = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25];
            const note = scale[Math.floor(Math.random() * scale.length)];
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = "sine";
            osc.frequency.setValueAtTime(note, ctx.currentTime);
            gain.gain.setValueAtTime(0.0001, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 1.3);
          };

          playPluck();
          ambientIntervalRef.current = setInterval(playPluck, 1800);
          setIsPlaying(true);
        } catch {
          setIsPlaying(false);
        }
      }
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (ambientIntervalRef.current) clearInterval(ambientIntervalRef.current);
      if (ambientCtxRef.current) {
        ambientCtxRef.current.close().catch(() => {});
        ambientCtxRef.current = null;
      }
    };
  }, []);

  const handleFistBump = () => {
    if (!isBumped) {
      setIsBumped(true);
      setShowSparks(true);
      playAcousticChord();
      setTimeout(() => setShowSparks(false), 3000);
    } else {
      setIsBumped(false);
    }
  };

  const letterRecord = letter as Record<string, unknown>;

  // Gallery photos
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

  // Milestones
  const milestones = useMemo(() => {
    const list: Array<{ year: string; title: string; desc: string }> = [];
    for (let i = 1; i <= 3; i++) {
      const title = letterRecord[`milestone${i}Title`];
      if (typeof title === "string" && title.trim().length > 0) {
        list.push({
          year: String(letterRecord[`milestone${i}Year`] || `Tahap ${i}`),
          title,
          desc: String(letterRecord[`milestone${i}Desc`] || ""),
        });
      }
    }
    return list;
  }, [letterRecord]);

  // Qualities
  const qualities = useMemo(() => {
    const list: Array<{ title: string; desc: string; icon: LucideIcon }> = [];
    const icons = [Smile, ShieldCheck, Zap, Heart];
    for (let i = 1; i <= 4; i++) {
      const title = letterRecord[`quality${i}Title`];
      if (typeof title === "string" && title.trim().length > 0) {
        list.push({
          title,
          desc: String(letterRecord[`quality${i}Desc`] || ""),
          icon: icons[i - 1] || Smile,
        });
      }
    }
    return list;
  }, [letterRecord]);

  const paragraphs = toParagraphs(String(letter.message));

  return (
    <article
      className={cn(
        "relative w-full overflow-hidden transition-colors duration-500 selection:bg-emerald-500/20",
        className
      )}
      style={{ backgroundColor }}
    >
      {/* ================= AMBIENT PARTICLES & SPARKS ================= */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {FRIENDSHIP_SPARKS.map((s, idx) => (
          <span
            key={idx}
            className="absolute rounded-full transition-opacity duration-1000 opacity-20 dark:opacity-30"
            style={{
              left: s.left,
              top: s.top,
              width: `${s.size}px`,
              height: `${s.size}px`,
              backgroundColor: primaryColor,
              transform: `rotate(${s.rotate}deg)`,
              boxShadow: `0 0 12px ${primaryColor}`,
            }}
          />
        ))}
      </div>

      {/* ================= 1. HERO & SAHABAT COVER ================= */}
      <section className="relative px-5 pt-12 pb-14 sm:px-8 sm:pt-20 sm:pb-20 text-center">
        <div className="mx-auto max-w-3xl space-y-6">
          {/* Friendship Badge */}
          {String(letter.heroBadge).trim() && (
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider border shadow-sm transition-all">
              <span
                className="h-2 w-2 rounded-full animate-pulse"
                style={{ backgroundColor: primaryColor }}
              />
              <span style={{ color: primaryColor }}>
                {String(letter.heroBadge)}
              </span>
            </div>
          )}

          {/* Title & Recipient Name */}
          <div className="space-y-3">
            <h2
              className="text-xs sm:text-sm font-semibold uppercase tracking-widest opacity-75"
              style={{ color: primaryColor }}
            >
              {String(letter.title || "Untuk Sahabat Terbaik Seumur Hidup")}
            </h2>
            <h1
              className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight"
              style={{ color: textColor }}
            >
              {String(letter.recipientName)}
            </h1>
            {String(letter.nickname).trim() && (
              <p
                className="font-hand text-xl sm:text-2xl font-medium"
                style={{ color: primaryColor }}
              >
                “{String(letter.nickname)}”
              </p>
            )}
          </div>

          {/* Friends Since Pill */}
          {String(letter.friendsSince).trim() && (
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-medium border"
              style={{
                backgroundColor: `${primaryColor}12`,
                borderColor: `${primaryColor}25`,
                color: primaryColor,
              }}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Berteman Sejak {String(letter.friendsSince)}</span>
            </div>
          )}

          {/* Tagline */}
          {String(letter.tagline).trim() && (
            <p
              className="mx-auto max-w-xl text-sm sm:text-base leading-relaxed"
              style={{ color: bodyTextColor }}
            >
              {String(letter.tagline)}
            </p>
          )}

          {/* Portrait Photo Frame with Washi Tape */}
          {String(letter.heroImage).trim() && (
            <div className="relative mx-auto mt-8 max-w-md pt-3">
              {/* Paper Washi Tape Accents */}
              <span
                aria-hidden
                className="absolute -top-1 left-12 h-5 w-24 -rotate-3 rounded-sm shadow-sm opacity-80 z-10"
                style={{ backgroundColor: `${primaryColor}40` }}
              />
              <span
                aria-hidden
                className="absolute -top-1 right-12 h-5 w-20 rotate-4 rounded-sm shadow-sm opacity-80 z-10"
                style={{ backgroundColor: `${primaryColor}40` }}
              />

              <div
                className="group relative overflow-hidden rounded-3xl border-4 p-2 shadow-2xl transition-all duration-500 hover:scale-[1.01]"
                style={{
                  backgroundColor: cardColor,
                  borderColor: cardColor,
                  boxShadow: `0 20px 40px -15px ${primaryColor}30`,
                }}
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-stone-100 dark:bg-stone-800">
                  <img
                    src={String(letter.heroImage)}
                    alt={String(letter.recipientName)}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center bg-black/30 backdrop-blur-[2px] cursor-pointer"
                    onClick={() =>
                      setLightboxPhoto({
                        url: String(letter.heroImage),
                        caption: String(letter.recipientName),
                        date: String(letter.friendsSince),
                      })
                    }
                  >
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 text-stone-900 text-xs font-semibold shadow">
                      Perbesar Foto
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ================= 2. FIST BUMP & SECRET PLEDGE ================= */}
      <section className="relative px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-xl text-center">
          <div
            className="relative rounded-3xl border p-6 sm:p-8 shadow-xl transition-all duration-500"
            style={{
              backgroundColor: cardColor,
              borderColor: isDarkCard ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)",
            }}
          >
            <div className="space-y-2">
              <h3
                className="text-base sm:text-lg font-bold"
                style={{ color: textColor }}
              >
                {String(letter.fistBumpTitle || "Tos Sahabat / Fist Bump")}
              </h3>
              <p className="text-xs sm:text-sm" style={{ color: bodyTextColor }}>
                {String(
                  letter.fistBumpPrompt ||
                    "Ketuk kepalan tangan di bawah untuk tos & dengarkan bunyi pertemanan kita!"
                )}
              </p>
            </div>

            {/* Interactive Fist Bump Button */}
            <div className="relative my-6 flex justify-center items-center">
              {showSparks && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                  <div className="animate-ping absolute h-24 w-24 rounded-full bg-emerald-400/40" />
                  <span className="text-3xl animate-bounce">⚡</span>
                </div>
              )}

              <button
                type="button"
                onClick={handleFistBump}
                className={cn(
                  "relative flex items-center justify-center gap-3 px-6 py-4 rounded-2xl text-white font-bold text-base sm:text-lg shadow-xl transition-all duration-300 transform active:scale-95",
                  isBumped
                    ? "ring-4 ring-emerald-400/50 scale-105"
                    : "hover:scale-105 hover:shadow-2xl"
                )}
                style={{ backgroundColor: primaryColor }}
              >
                <span className={cn("text-2xl transition-transform duration-300", isBumped && "rotate-12")}>
                  👊
                </span>
                <Handshake className="w-5 h-5" />
                <span>{isBumped ? "Fist Bump Terkoneksi!" : "Beri Tos Sahabat"}</span>
                <span className={cn("text-2xl transition-transform duration-300", isBumped && "-rotate-12")}>
                  🤛
                </span>
              </button>
            </div>

            {/* Secret Friendship Pledge Reveal */}
            {isBumped && String(letter.secretPledgeMessage).trim() && (
              <div
                className="rounded-2xl border p-5 text-left text-xs sm:text-sm leading-relaxed animate-in fade-in zoom-in-95 duration-500 shadow-sm"
                style={{
                  backgroundColor: `${primaryColor}0d`,
                  borderColor: `${primaryColor}30`,
                  color: textColor,
                }}
              >
                <div className="flex items-center gap-2 font-bold mb-1.5" style={{ color: primaryColor }}>
                  <Sparkles className="w-4 h-4" />
                  <span>Janji Persahabatan Sejati Terbuka:</span>
                </div>
                <p className="font-sans leading-relaxed opacity-95">
                  {String(letter.secretPledgeMessage)}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= 3. STATS & PETUALANGAN ================= */}
      <section className="relative px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-4xl space-y-10">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div
              className="rounded-2xl border p-5 text-center shadow-md transition-transform hover:-translate-y-1"
              style={{
                backgroundColor: cardColor,
                borderColor: isDarkCard ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
              }}
            >
              <div
                className="w-10 h-10 mx-auto mb-3 rounded-xl flex items-center justify-center text-white shadow-sm"
                style={{ backgroundColor: primaryColor }}
              >
                <Calendar className="w-5 h-5" />
              </div>
              <p className="text-xl sm:text-2xl font-bold" style={{ color: textColor }}>
                {String(letter.totalYears || "8+ Tahun")}
              </p>
              <p className="text-xs mt-1" style={{ color: bodyTextColor }}>
                Kebersamaan Tanpa Henti
              </p>
            </div>

            <div
              className="rounded-2xl border p-5 text-center shadow-md transition-transform hover:-translate-y-1"
              style={{
                backgroundColor: cardColor,
                borderColor: isDarkCard ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
              }}
            >
              <div
                className="w-10 h-10 mx-auto mb-3 rounded-xl flex items-center justify-center text-white shadow-sm"
                style={{ backgroundColor: primaryColor }}
              >
                <Coffee className="w-5 h-5" />
              </div>
              <p className="text-xl sm:text-2xl font-bold" style={{ color: textColor }}>
                {String(letter.deepTalks || "1,200+ Jam")}
              </p>
              <p className="text-xs mt-1" style={{ color: bodyTextColor }}>
                Deep Talk & Cangkir Kopi
              </p>
            </div>

            <div
              className="rounded-2xl border p-5 text-center shadow-md transition-transform hover:-translate-y-1"
              style={{
                backgroundColor: cardColor,
                borderColor: isDarkCard ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
              }}
            >
              <div
                className="w-10 h-10 mx-auto mb-3 rounded-xl flex items-center justify-center text-white shadow-sm"
                style={{ backgroundColor: primaryColor }}
              >
                <ShieldCheck className="w-5 h-5" />
              </div>
              <p className="text-xl sm:text-2xl font-bold" style={{ color: textColor }}>
                {String(letter.zeroSecrets || "0 Rahasia Bocor")}
              </p>
              <p className="text-xs mt-1" style={{ color: bodyTextColor }}>
                Kepercayaan 100% Solid
              </p>
            </div>
          </div>

          {/* 3 Milestones Timeline */}
          {milestones.length > 0 && (
            <div className="space-y-6 pt-4">
              <div className="text-center space-y-1">
                <h3
                  className="font-serif text-2xl sm:text-3xl font-bold"
                  style={{ color: textColor }}
                >
                  {String(letter.milestoneTitle || "Kilas Balik Petualangan Kita")}
                </h3>
                <p className="text-xs sm:text-sm" style={{ color: bodyTextColor }}>
                  Jejak langkah yang membentuk arti persahabatan kita hari ini.
                </p>
              </div>

              <div className="relative pl-6 sm:pl-8 border-l-2 space-y-8" style={{ borderColor: `${primaryColor}40` }}>
                {milestones.map((m, idx) => (
                  <div key={idx} className="relative group">
                    {/* Timeline Node */}
                    <span
                      className="absolute -left-[31px] sm:-left-[39px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full border-2 text-white shadow-sm"
                      style={{
                        backgroundColor: primaryColor,
                        borderColor: backgroundColor,
                      }}
                    >
                      <span className="h-2 w-2 rounded-full bg-white" />
                    </span>

                    <div
                      className="rounded-2xl border p-5 shadow-sm transition-all duration-300 hover:shadow-md"
                      style={{
                        backgroundColor: cardColor,
                        borderColor: isDarkCard ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
                      }}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                        <h4 className="text-base font-bold" style={{ color: textColor }}>
                          {m.title}
                        </h4>
                        <span
                          className="px-2.5 py-0.5 rounded-full text-xs font-semibold border"
                          style={{
                            backgroundColor: `${primaryColor}14`,
                            borderColor: `${primaryColor}30`,
                            color: primaryColor,
                          }}
                        >
                          {m.year}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm leading-relaxed" style={{ color: bodyTextColor }}>
                        {m.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ================= 4. GALERI KENANGAN POLAROID ================= */}
      {galleryItems.length > 0 && (
        <section className="relative px-5 py-12 sm:px-8 sm:py-16">
          <div className="mx-auto max-w-5xl space-y-8">
            <div className="text-center space-y-1">
              <p
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: primaryColor }}
              >
                Kenangan Abadi
              </p>
              <h3
                className="font-serif text-2xl sm:text-3xl font-bold"
                style={{ color: textColor }}
              >
                {String(letter.galleryTitle || "Koleksi Momen Terbaik Kita")}
              </h3>
              {String(letter.gallerySubtitle).trim() && (
                <p className="text-xs sm:text-sm max-w-xl mx-auto" style={{ color: bodyTextColor }}>
                  {String(letter.gallerySubtitle)}
                </p>
              )}
            </div>

            {/* Polaroid Masonry Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              {galleryItems.map((item, idx) => {
                const tilts = ["-rotate-1", "rotate-1", "-rotate-2", "rotate-2", "rotate-0", "-rotate-1"];
                const tilt = tilts[idx % tilts.length];

                return (
                  <div
                    key={idx}
                    onClick={() => setLightboxPhoto(item)}
                    className={cn(
                      "group relative cursor-pointer rounded-2xl bg-white p-3.5 pb-6 shadow-lg transition-all duration-300 hover:scale-[1.03] hover:rotate-0 hover:shadow-2xl dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800",
                      tilt
                    )}
                  >
                    {/* Washi tape sticker */}
                    <div
                      className="absolute -top-3 left-1/2 -translate-x-1/2 h-4 w-16 -rotate-1 rounded-sm bg-stone-300/80 dark:bg-stone-700/80 shadow-xs z-10"
                    />

                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-stone-100 dark:bg-stone-800">
                      <img
                        src={item.url}
                        alt={item.caption || `Kenangan #${idx + 1}`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    <div className="mt-4 px-1 text-center">
                      <p className="font-hand text-lg font-bold text-stone-900 dark:text-stone-100 line-clamp-1">
                        {item.caption || "Momen Bahagia"}
                      </p>
                      {item.date && (
                        <p className="text-[11px] font-medium text-stone-500 dark:text-stone-400 mt-0.5">
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

      {/* ================= 5. 4 SIFAT TERBAIK SAHABAT ================= */}
      {qualities.length > 0 && (
        <section className="relative px-5 py-12 sm:px-8 sm:py-16">
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="text-center space-y-1">
              <p
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: primaryColor }}
              >
                Apresiasi Tulus
              </p>
              <h3
                className="font-serif text-2xl sm:text-3xl font-bold"
                style={{ color: textColor }}
              >
                {String(letter.wishesTitle || "Empat Hal yang Paling Aku Hargai Darimu")}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {qualities.map((q, idx) => {
                const IconComponent = q.icon;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border p-5 sm:p-6 shadow-sm transition-all duration-300 hover:shadow-md"
                    style={{
                      backgroundColor: cardColor,
                      borderColor: isDarkCard ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
                    }}
                  >
                    <div className="flex items-start gap-3.5">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm"
                        style={{ backgroundColor: primaryColor }}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-base font-bold" style={{ color: textColor }}>
                          {q.title}
                        </h4>
                        <p className="text-xs sm:text-sm leading-relaxed" style={{ color: bodyTextColor }}>
                          {q.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ================= 6. HEARTFELT FRIENDSHIP LETTER ================= */}
      <section className="relative px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-2xl">
          <div
            className="relative rounded-3xl border px-6 py-10 sm:px-12 sm:py-14 shadow-2xl transition-all"
            style={{
              backgroundColor: cardColor,
              borderColor: isDarkCard ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)",
            }}
          >
            {/* Wax Seal / Friendship Badge */}
            <div className="flex justify-center -mt-16 sm:-mt-20 mb-6">
              <div
                className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full shadow-xl border-4 text-white"
                style={{
                  backgroundColor: primaryColor,
                  borderColor: cardColor,
                }}
              >
                <Heart className="h-7 w-7 sm:h-9 sm:w-9" />
              </div>
            </div>

            <p
              className="text-center text-xs font-bold uppercase tracking-wider"
              style={{ color: primaryColor }}
            >
              Surat Persahabatan Dari Hati
            </p>

            <h2
              className="mt-1 text-center font-serif text-2xl sm:text-3xl font-bold"
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
              className="mt-8 space-y-4 text-sm sm:text-base leading-relaxed"
              style={{ color: bodyTextColor }}
            >
              {paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Signature & Date */}
            <div className="mt-10 pt-6 border-t border-dashed flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4"
              style={{ borderColor: isDarkCard ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)" }}
            >
              <div>
                <p className="text-xs uppercase tracking-wider opacity-75" style={{ color: bodyTextColor }}>
                  {String(letter.signature || "Sahabatmu Selamanya,")}
                </p>
                <p
                  className="font-hand text-2xl sm:text-3xl font-bold mt-1"
                  style={{ color: primaryColor }}
                >
                  {String(letter.senderName)}
                </p>
              </div>

              {letter.letterDate && (
                <p className="text-xs font-medium opacity-70" style={{ color: bodyTextColor }}>
                  {formatDate(String(letter.letterDate))}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= 7. FOOTER TRIBUTE ================= */}
      <footer
        className="relative border-t py-8 text-center"
        style={{
          borderColor: isDarkBg ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
        }}
      >
        <p className="text-xs font-medium opacity-60" style={{ color: textColor }}>
          Website Persembahan Persahabatan · Dibuat dengan bangga untuk {String(letter.recipientName)}
        </p>
      </footer>

      {/* ================= 8. FLOATING AUDIO PLAYER ================= */}
      <div className="fixed bottom-5 right-5 z-40 sm:bottom-8 sm:right-8">
        <button
          type="button"
          onClick={toggleAudio}
          title={isPlaying ? "Jeda musik latar" : "Putar musik persahabatan"}
          aria-label={isPlaying ? "Jeda musik latar" : "Putar musik persahabatan"}
          className={cn(
            "group flex items-center gap-3 rounded-full border px-4 py-2.5 shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-105",
            isPlaying
              ? "ring-2 ring-emerald-500"
              : "opacity-85 hover:opacity-100"
          )}
          style={{
            backgroundColor: cardColor,
            borderColor: isDarkCard ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.1)",
          }}
        >
          <span
            className={cn(
              "flex h-8 w-8 items-center justify-center rounded-full text-white shadow-md transition-transform",
              isPlaying && "animate-spin [animation-duration:8s]"
            )}
            style={{ backgroundColor: primaryColor }}
          >
            <Music className="h-4 w-4" />
          </span>
          <div className="hidden text-left sm:block">
            <p className="text-xs font-semibold" style={{ color: textColor }}>
              {String(letter.musicTitle || "Friendship Melody")}
            </p>
            <p className="text-[10px]" style={{ color: bodyTextColor }}>
              {isPlaying ? "Sedang Dimainkan" : "Ketuk untuk Memutar"}
            </p>
          </div>
        </button>
      </div>

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
                  {lightboxPhoto.caption || "Momen Kenangan Sahabat"}
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
