"use client";

import { useMemo, useRef, useState } from "react";
import {
  Sparkles,
  Pause,
  Play,
  Maximize2,
  X,
  GraduationCap,
  Award,
  BookOpen,
  Calendar,
  Heart,
  Briefcase,
  Compass,
  Star,
  Layers,
} from "lucide-react";
import { formatDate, toParagraphs } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";
import type { LetterContent } from "@/types/letter";
import { withDefaults } from "../utils";
import { isColorDark } from "../color-presets";

const defaults = {
  primaryColor: "#caa64f",
  backgroundColor: "#141a30",
  cardColor: "#1b2340",
  textColor: "#f8f4e6",
  bodyTextColor: "#d5ceba",
  recipientName: "Alifa Rahmadani, S.Kom.",
  senderName: "Ayah, Ibu & Keluarga Besar",
  achievement: "Sarjana Ilmu Komputer (S.Kom.)",
  institution: "Universitas Brawijaya",
  faculty: "Fakultas Ilmu Komputer",
  honorBadge: "🏆 Predikat Cum Laude · IPK 3.88",
  heroBadge: "✨ Official Graduation Tribute & Celebration",
  title: "Merayakan Kelulusan & Gelar Sarjana Alifa",
  tagline:
    "Sebuah persembahan bangga atas setiap tetes keringat, malam-malam panjang bimbingan skripsi, dan tekad baja hingga toga ini tersemat indah di kepalamu.",
  heroImage:
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80",
  graduationDate: "2026-09-21",

  capTitle: "Pelepasan Toga & Sorak Kemenangan",
  capPrompt: "Tekan tombol di bawah untuk melambungkan toga kelulusanmu ke angkasa!",
  secretToastMessage:
    "Selamat melangkah ke dunia nyata, Sarjana! Kami percaya kamu akan menaklukkan setiap tantangan dengan penuh integritas, keberanian, dan senyuman bangga. Pintu masa depan yang gilang-gemilang kini terbuka lebar untukmu! 🎓✨",

  totalCredits: "144 SKS",
  studyDuration: "3.5 Tahun",
  thesisTitle:
    "Penerapan Algoritma Deep Learning untuk Deteksi Dini Penyakit Tanaman Pangan Berbasis Citra Multispektral",
  milestoneTitle: "Jejak Langkah & Perjuangan Menuju Toga",
  milestone1Year: "2022",
  milestone1Title: "Awal Langkah Mahasiswa Baru",
  milestone1Desc:
    "Menginjakkan kaki pertama kali di gerbang kampus dengan mimpi besar dan tekad membanggakan keluarga.",
  milestone2Year: "2025",
  milestone2Title: "Ujian Sidang Skripsi Tuntas",
  milestone2Desc:
    "Menyajikan hasil riset di hadapan dewan penguji dengan penuh percaya diri dan meraih nilai A bulat.",
  milestone3Year: "2026",
  milestone3Title: "Pelantikan & Pengukuhan Gelar Resmi",
  milestone3Desc:
    "Toga dipindahkan dari kiri ke kanan, menandai lahirnya seorang intelektual muda yang siap memberi dampak nyata.",

  galleryTitle: "Galeri Kenangan Kampus & Momen Wisuda",
  gallerySubtitle:
    "Dokumentasi senyum kebersamaan, bimbingan dosen, dan pelukan hangat keluarga tercinta.",
  galleryImg1:
    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
  galleryCaption1: "Senyum bangga setelah prosesi pemindahan kuncir toga",
  galleryDate1: "Gedung Samantha Krida, 2026",
  galleryImg2:
    "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
  galleryCaption2: "Pelukan hangat orang tua tercinta",
  galleryDate2: "Halaman Rektorat, 2026",
  galleryImg3:
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
  galleryCaption3: "Sahabat seperjuangan dari semester satu",
  galleryDate3: "Gedung FILKOM, 2026",
  galleryImg4:
    "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=800&q=80",
  galleryCaption4: "Hari penuh haru setelah pengumuman kelulusan sidang",
  galleryDate4: "Ruang Sidang Utama, 2025",
  galleryImg5:
    "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80",
  galleryCaption5: "Diskusi proyek akhir di perpustakaan kampus",
  galleryDate5: "Perpustakaan Pusat, 2025",
  galleryImg6:
    "https://images.unsplash.com/photo-1525921429624-479b6a26d84d?auto=format&fit=crop&w=800&q=80",
  galleryCaption6: "Buket bunga dan doa terbaik dari rekan-rekan",
  galleryDate6: "Boulevard Kampus, 2026",

  wishesTitle: "Empat Doa Terbaik untuk Langkah Masa Depanmu",
  wish1:
    "Semoga langkah awal kariermu dibukakan pintu kesempatan terbaik dan menemukan tempat berkarya yang menghargai potensimu.",
  wish2:
    "Semoga ilmu yang diperoleh menjadi berkah yang bermanfaat luas, serta senantiasa memegang teguh integritas dan kejujuran.",
  wish3:
    "Semoga selalu dilimpahi kesehatan raga, ketenangan batin, serta kecukupan rezeki yang halal dan melimpah.",
  wish4:
    "Semoga setiap impian besar yang kamu tuju selalu didekatkan dan diberi kelancaran oleh Tuhan Yang Maha Esa.",

  quote:
    "Yang sulit itu memulai, yang luar biasa itu menuntaskan. Dan hari ini, kamu telah membuktikannya kepada dunia.",
  message:
    "Alifa putri kami tersayang,\n\nKami masih ingat betul hari pertama kamu melangkah masuk ke gerbang universitas dengan tas ransel dan mata yang berbinar penuh rasa ingin tahu.\n\nKami tahu betul perjuanganmu tidaklah mudah. Ada malam-malam panjang di mana kamu harus menukar waktu tidurmu dengan cangkir kopi demi menyelesaikan revisi skripsi. Ada saat-saat kamu merasa lelah, namun kamu memilih untuk tetap bangun dan melangkah maju.\n\nHari ini, saat melihat kuncir togamu dipindahkan dan namamu dipanggil dengan gelar Sarjana Komputer di belakangnya, dada kami bergemuruh penuh haru dan rasa bangga yang teramat dalam.\n\nGelar ini bukan sekadar huruf di belakang namamu, melainkan bukti nyata dari ketekunan, kejujuran, dan kegigihanmu. Melangkahlah ke dunia luar dengan kepala tegak. Apa pun yang kamu tuju setelah ini, restu dan doa kami akan selalu menyertaimu di setiap hembusan nafas.",
  signature: "Dengan cinta & rasa bangga tak terhingga, Ayah & Ibu",
  letterDate: "2026-09-21",
  musicTitle: "",
  bgMusicUrl: "",
};

/** Golden celebration sparks */
const GOLD_SPARKS = [
  { left: "8%", top: "10%", size: 10, rotate: 15 },
  { left: "92%", top: "12%", size: 8, rotate: -25 },
  { left: "14%", top: "30%", size: 12, rotate: 45 },
  { left: "86%", top: "34%", size: 9, rotate: -15 },
  { left: "6%", top: "55%", size: 11, rotate: 30 },
  { left: "94%", top: "58%", size: 13, rotate: -40 },
  { left: "10%", top: "80%", size: 8, rotate: 20 },
  { left: "90%", top: "82%", size: 10, rotate: -10 },
];

/** Synthesize triumphant graduation fanfare using Web Audio API */
function playFanfareChime() {
  if (typeof window === "undefined") return;
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    // Triumphant fanfare motif: G4, C5, E5, G5
    const notes = [392.0, 523.25, 659.25, 783.99];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.15);
      gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.15);
      gain.gain.exponentialRampToValueAtTime(0.18, ctx.currentTime + idx * 0.15 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.15 + 0.7);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.15);
      osc.stop(ctx.currentTime + idx * 0.15 + 0.8);
    });
  } catch {
    // Audio context may be restricted
  }
}

export function GraduationTemplate({
  data,
  className,
}: {
  data: LetterContent;
  className?: string;
}) {
  const letter = withDefaults(defaults, data);
  const primaryColor = String(letter.primaryColor || "#caa64f");
  const backgroundColor = String(letter.backgroundColor || "#141a30");
  const cardColor = String(letter.cardColor || "#1b2340");
  const textColor = String(letter.textColor || "#f8f4e6");
  const bodyTextColor = String(letter.bodyTextColor || "#d5ceba");

  const isDarkBg = useMemo(() => isColorDark(backgroundColor), [backgroundColor]);
  const isDarkCard = useMemo(() => isColorDark(cardColor), [cardColor]);

  // Cap toss state
  const [isCapTossed, setIsCapTossed] = useState(false);
  const [showGoldConfetti, setShowGoldConfetti] = useState(false);

  // Photo Lightbox state
  const [lightboxPhoto, setLightboxPhoto] = useState<{
    url: string;
    caption: string;
    date: string;
  } | null>(null);

  // Audio player state
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

  const handleTossCap = () => {
    if (!isCapTossed) {
      setIsCapTossed(true);
      setShowGoldConfetti(true);
      playFanfareChime();
      setTimeout(() => setShowGoldConfetti(false), 3500);
    } else {
      setIsCapTossed(false);
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
          year: String(letterRecord[`milestone${i}Year`] || `Tahap ${i}`),
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

  return (
    <article
      className={cn(
        "relative w-full overflow-hidden transition-colors duration-500 selection:bg-amber-500/20",
        className,
      )}
      style={{ backgroundColor }}
    >
      {/* ================= AMBIENT GOLD SPARKS & PARTICLES ================= */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {GOLD_SPARKS.map((s, idx) => (
          <span
            key={idx}
            className="absolute block rounded-sm opacity-50 animate-pulse"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size * 0.5,
              backgroundColor: primaryColor,
              transform: `rotate(${s.rotate}deg)`,
              animationDuration: `${3 + (idx % 3)}s`,
            }}
          />
        ))}

        {/* Ambient Warm Golden Glows */}
        <div
          className="absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full blur-3xl pointer-events-none"
          style={{ backgroundColor: `${primaryColor}22` }}
        />
        <div
          className="absolute top-1/2 -left-20 h-80 w-80 rounded-full blur-3xl pointer-events-none"
          style={{ backgroundColor: `${primaryColor}14` }}
        />
      </div>

      {/* ================= FLOATING GRADUATION FANFARE MUSIC PLAYER ================= */}
      {letter.bgMusicUrl ? (
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
                  ? "bg-slate-900/90 border-amber-500/30 text-white"
                  : "bg-white/95 border-amber-300 text-amber-950",
              )}
              style={{
                boxShadow: `0 8px 24px -4px ${primaryColor}40`,
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
                  {isPlaying ? "Memutar Simfoni" : "Musik Wisuda"}
                </p>
                <p className="truncate text-xs font-semibold max-w-[150px] sm:max-w-[200px]">
                  {String(letter.musicTitle || "Graduation Fanfare")}
                </p>
              </div>

              {isPlaying && (
                <div className="flex items-end gap-0.5 h-3.5 pr-1" aria-hidden>
                  <span className="w-0.5 rounded-full animate-bounce h-2" style={{ backgroundColor: primaryColor, animationDuration: "0.6s" }} />
                  <span className="w-0.5 rounded-full animate-bounce h-3.5" style={{ backgroundColor: primaryColor, animationDuration: "0.4s" }} />
                  <span className="w-0.5 rounded-full animate-bounce h-2.5" style={{ backgroundColor: primaryColor, animationDuration: "0.5s" }} />
                </div>
              )}
            </button>
          </div>
        </>
      ) : null}

      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative px-5 pt-12 pb-16 sm:px-8 sm:pt-20 sm:pb-24">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge Kehormatan Atas */}
          {String(letter.heroBadge).trim() && (
            <div
              className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold shadow-xs mb-6"
              style={{
                backgroundColor: `${primaryColor}18`,
                borderColor: `${primaryColor}40`,
                color: primaryColor,
              }}
            >
              <GraduationCap className="h-4 w-4" />
              <span>{String(letter.heroBadge)}</span>
            </div>
          )}

          {/* Nama Institusi & Fakultas */}
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider opacity-80" style={{ color: primaryColor }}>
            <span>{String(letter.institution)}</span>
            {letter.faculty && (
              <>
                <span>•</span>
                <span>{String(letter.faculty)}</span>
              </>
            )}
          </div>

          {/* Nama Wisudawan & Gelar */}
          <h1
            className="mt-3 font-display text-4xl font-extrabold tracking-tight sm:text-6xl sm:leading-[1.15]"
            style={{ color: textColor }}
          >
            {String(letter.recipientName)}
          </h1>

          {/* Gelar & Program Studi */}
          <p
            className="mt-2 font-display text-xl sm:text-2xl font-semibold italic"
            style={{ color: primaryColor }}
          >
            {String(letter.achievement)}
          </p>

          {/* Predikat Kehormatan / IPK Badge */}
          {String(letter.honorBadge).trim() && (
            <div className="mt-4 flex justify-center">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-1 text-xs sm:text-sm font-bold shadow-md text-white"
                style={{ backgroundColor: primaryColor }}
              >
                <Award className="h-4 w-4" />
                <span>{String(letter.honorBadge)}</span>
              </span>
            </div>
          )}

          {/* Tagline / Pesan Pembuka */}
          {String(letter.tagline).trim() && (
            <p
              className="mx-auto mt-6 max-w-2xl text-sm sm:text-base leading-relaxed font-medium"
              style={{ color: bodyTextColor }}
            >
              {String(letter.tagline)}
            </p>
          )}

          {/* Foto Potret Toga dengan Frame Emas Laurel */}
          {String(letter.heroImage).trim() && (
            <div className="mt-10 flex justify-center">
              <div className="relative group">
                {/* Glow ring */}
                <div
                  className="absolute -inset-3 rounded-[2.5rem] blur-xl opacity-40 group-hover:opacity-65 transition-opacity"
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

                  {/* Date badge */}
                  {letter.graduationDate && (
                    <div
                      className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold text-white shadow-lg backdrop-blur-xs"
                      style={{ backgroundColor: primaryColor }}
                    >
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{formatDate(String(letter.graduationDate))}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* CTA Lempar Toga */}
          <div className="mt-8 flex justify-center">
            <a
              href="#lempar-toga"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
              style={{ backgroundColor: primaryColor }}
            >
              <GraduationCap className="h-4 w-4" />
              <span>Rayakan & Lempar Toga 🎓</span>
            </a>
          </div>
        </div>
      </section>

      {/* ================= 2. INTERACTIVE CAP TOSS (LEMPAR TOGA) ================= */}
      <section id="lempar-toga" className="relative px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-2xl">
          <div
            className="relative overflow-hidden rounded-3xl border p-6 sm:p-10 text-center shadow-xl transition-all"
            style={{
              backgroundColor: cardColor,
              borderColor: isDarkCard ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.08)",
            }}
          >
            {/* Confetti Burst Overlay */}
            {showGoldConfetti && (
              <div
                aria-hidden
                className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center overflow-hidden animate-in fade-in zoom-in duration-300"
              >
                {GOLD_SPARKS.map((c, i) => (
                  <span
                    key={i}
                    className="absolute block rounded-sm animate-ping"
                    style={{
                      left: c.left,
                      top: c.top,
                      width: c.size * 2,
                      height: c.size,
                      backgroundColor: primaryColor,
                      animationDuration: "1.2s",
                    }}
                  />
                ))}
              </div>
            )}

            <span
              className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider mb-4"
              style={{
                backgroundColor: `${primaryColor}18`,
                color: primaryColor,
              }}
            >
              <Award className="h-3.5 w-3.5" />
              Ritual Kelulusan
            </span>

            <h2
              className="font-display text-2xl sm:text-3xl font-bold"
              style={{ color: textColor }}
            >
              {String(letter.capTitle || "Pelepasan Toga & Sorak Kemenangan")}
            </h2>

            <p
              className="mx-auto mt-2 max-w-md text-xs sm:text-sm leading-relaxed"
              style={{ color: bodyTextColor }}
            >
              {!isCapTossed
                ? String(letter.capPrompt)
                : "🎓 Toga telah melambung tinggi ke angkasa! Babak baru perjalanan hidupmu resmi dimulai."}
            </p>

            {/* MORTARBOARD CAP GRAPHIC */}
            <div className="mt-8 flex flex-col items-center justify-center">
              <div className="relative flex flex-col items-center h-32 justify-end">
                {/* Mortarboard icon with CSS flight animation */}
                <div
                  className={cn(
                    "transition-all duration-700 transform flex flex-col items-center",
                    isCapTossed
                      ? "-translate-y-12 rotate-[-12deg] scale-125"
                      : "translate-y-0 rotate-0 hover:scale-105",
                  )}
                >
                  <div
                    className="flex h-20 w-20 items-center justify-center rounded-2xl shadow-xl border-2 text-white"
                    style={{
                      backgroundColor: primaryColor,
                      borderColor: "#ffffff40",
                    }}
                  >
                    <GraduationCap className="h-12 w-12 drop-shadow-md" />
                  </div>
                  {isCapTossed && (
                    <span className="text-xs mt-1 font-bold text-amber-400 animate-pulse">
                      ✨ Woo-hoo! Wisuda! ✨
                    </span>
                  )}
                </div>
              </div>

              {/* ACTION BUTTON */}
              <div className="mt-6">
                <button
                  type="button"
                  onClick={handleTossCap}
                  className="group relative inline-flex items-center gap-2.5 rounded-full px-7 py-3 text-sm font-bold text-white shadow-lg transition-all hover:scale-105 active:scale-95"
                  style={{ backgroundColor: primaryColor }}
                >
                  <GraduationCap className="h-4 w-4 transition-transform group-hover:-translate-y-1" />
                  <span>
                    {!isCapTossed
                      ? "Lempar Toga Kelulusan! 🎓✨"
                      : "Toga Telah Dilempar! (Ulangi 🎓)"}
                  </span>
                </button>
              </div>

              {/* SECRET TOAST REVEAL CARD */}
              {isCapTossed && String(letter.secretToastMessage).trim() && (
                <div
                  className="mt-8 w-full rounded-2xl border p-5 sm:p-6 text-left shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500"
                  style={{
                    backgroundColor: `${primaryColor}12`,
                    borderColor: `${primaryColor}40`,
                  }}
                >
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2" style={{ color: primaryColor }}>
                    <Sparkles className="h-4 w-4" />
                    <span>Pesan Kebanggaan & Harapan Masa Depan:</span>
                  </div>
                  <p
                    className="text-sm sm:text-base leading-relaxed font-medium"
                    style={{ color: textColor }}
                  >
                    “{String(letter.secretToastMessage)}”
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3. CAMPUS STATS & ACADEMIC MILESTONES ================= */}
      <section className="relative px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-4xl">
          {/* 3 Metric Cards */}
          <div className="grid gap-4 sm:grid-cols-3">
            {/* Stat 1: SKS */}
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
                <Layers className="h-5 w-5" />
              </div>
              <p className="text-2xl sm:text-3xl font-extrabold font-display" style={{ color: primaryColor }}>
                {String(letter.totalCredits || "144 SKS")}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider" style={{ color: textColor }}>
                Beban Studi Dituntaskan
              </p>
            </div>

            {/* Stat 2: Masa Studi */}
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
                {String(letter.studyDuration || "3.5 Tahun")}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider" style={{ color: textColor }}>
                Masa Perjuangan Kuliah
              </p>
            </div>

            {/* Stat 3: Dedikasi */}
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
                100% Tuntas
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider" style={{ color: textColor }}>
                Komitmen & Tekad Baja
              </p>
            </div>
          </div>

          {/* Skripsi Showcase Card */}
          {String(letter.thesisTitle).trim() && (
            <div
              className="mt-6 rounded-2xl border p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4"
              style={{
                backgroundColor: cardColor,
                borderColor: `${primaryColor}35`,
              }}
            >
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${primaryColor}20`, color: primaryColor }}
              >
                <BookOpen className="h-6 w-6" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-wider" style={{ color: primaryColor }}>
                  Karya Tugas Akhir / Skripsi:
                </p>
                <p className="mt-1 font-display text-sm sm:text-base font-semibold leading-relaxed" style={{ color: textColor }}>
                  “{String(letter.thesisTitle)}”
                </p>
              </div>
            </div>
          )}

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
                  {String(letter.milestoneTitle || "Jejak Langkah Menuju Toga")}
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
                <Award className="h-3.5 w-3.5" />
                Momen Berharga
              </span>
              <h2
                className="mt-1 font-display text-2xl sm:text-4xl font-bold"
                style={{ color: textColor }}
              >
                {String(letter.galleryTitle || "Galeri Kenangan Kampus & Wisuda")}
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
                        alt={item.caption || `Kenangan Wisuda ${idx + 1}`}
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
                        {item.caption || "Momen Indah Wisuda"}
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

      {/* ================= 5. FOUR CAREER & LIFE WISHES ================= */}
      {wishes.length > 0 && (
        <section className="relative px-5 py-12 sm:px-8 sm:py-16">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-8">
              <span
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
                style={{ color: primaryColor }}
              >
                <Briefcase className="h-3.5 w-3.5" />
                Langkah Masa Depan
              </span>
              <h2
                className="mt-1 font-display text-2xl sm:text-3xl font-bold"
                style={{ color: textColor }}
              >
                {String(letter.wishesTitle || "Empat Doa Terbaik untuk Langkah Masa Depanmu")}
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {wishes.map((w, idx) => {
                const icons = [Briefcase, Compass, Star, Heart];
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

      {/* ================= 6. CERTIFICATE-STYLE HEARTFELT LETTER ================= */}
      <section className="relative px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-2xl">
          {/* Certificate Double Border Wrapper */}
          <div
            className="relative rounded-[2rem] border-2 p-2 shadow-paper transition-all"
            style={{
              borderColor: `${primaryColor}66`,
              backgroundColor: cardColor,
            }}
          >
            <div
              className="rounded-[1.6rem] border p-6 sm:p-12"
              style={{
                borderColor: `${primaryColor}33`,
              }}
            >
              {/* Wax Seal / Golden Laurel Medal Badge */}
              <div className="flex justify-center -mt-14 sm:-mt-18 mb-6">
                <div
                  className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full shadow-xl border-4 text-white"
                  style={{
                    backgroundColor: primaryColor,
                    borderColor: cardColor,
                  }}
                >
                  <Award className="h-8 w-8 sm:h-10 sm:w-10" />
                </div>
              </div>

              <p
                className="text-center text-xs font-bold uppercase tracking-wider"
                style={{ color: primaryColor }}
              >
                Piagam Kebanggaan & Ucapan Selamat
              </p>

              <h2
                className="mt-1 text-center font-display text-2xl sm:text-3xl font-bold"
                style={{ color: textColor }}
              >
                Untuk {String(letter.recipientName)}
              </h2>

              <p className="text-center text-xs sm:text-sm mt-1 opacity-80 italic" style={{ color: primaryColor }}>
                {String(letter.achievement)} · {String(letter.institution)}
              </p>

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

              {/* Letter Paragraphs */}
              <div
                className="mt-8 space-y-5 text-sm sm:text-base leading-[1.95]"
                style={{ color: bodyTextColor }}
              >
                {paragraphs.length > 0 ? (
                  paragraphs.map((para, i) => <p key={i}>{para}</p>)
                ) : (
                  <p className="opacity-60 italic">Tulisan ucapan banggamu akan muncul di sini.</p>
                )}
              </div>

              {/* Signature & Date */}
              <footer
                className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t pt-6"
                style={{
                  borderColor: isDarkCard ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
                }}
              >
                <div>
                  <p className="text-[11px] uppercase tracking-wider opacity-60" style={{ color: textColor }}>
                    Dengan rasa bangga tak terhingga:
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
          Website Perayaan Kelulusan & Pengukuhan Gelar · Dibuat dengan bangga untuk {String(letter.recipientName)}
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
                  {lightboxPhoto.caption || "Momen Kenangan Wisuda"}
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
