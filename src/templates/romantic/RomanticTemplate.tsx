"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Heart,
  Music,
  Pause,
  Play,
  Sparkles,
  Maximize2,
  X,
  Clock,
} from "lucide-react";
import { formatDate, toParagraphs } from "@/lib/utils/format";
import { cn } from "@/lib/utils/cn";
import type { LetterContent } from "@/types/letter";
import { withDefaults } from "../utils";
import { isColorDark } from "../color-presets";

const defaults = {
  recipientName: "Sarah Putri",
  senderName: "Raka Aditya",
  coupleNickname: "Raka & Sarah",
  heroBadge: "Happy Anniversary, My Love ✨",
  title: "Untuk Kamu yang Selalu Pulang",
  tagline:
    "Sebuah ruang kecil yang kuciptakan khusus untuk merayakan setiap tawa, perjalanan, dan rasa syukur memilikimu.",
  heroImage:
    "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1200&q=80",

  anniversaryDate: "2023-02-14",
  counterTitle: "Hari-Hari Indah Bersamamu",
  counterSubtitle:
    "Dan setiap detik berikutnya masih ingin kulewatkan bersamamu.",

  storyTitle: "Babak Indah Perjalanan Kita",
  milestone1Date: "15 Oktober 2022",
  milestone1Title: "Pertama Kali Kita Bertemu",
  milestone1Desc:
    "Secangkir kopi di sudut kafe sore itu, obrolan canggung yang mendadak terasa begitu hangat.",
  milestone2Date: "14 Februari 2023",
  milestone2Title: "Hari Kita Memulai Semuanya",
  milestone2Desc:
    "Di bawah lampu jalanan malam itu, kamu tersenyum dan kita berjanji untuk saling melengkapi.",
  milestone3Date: "20 September 2024",
  milestone3Title: "Perjalanan Terbaik Bersama",
  milestone3Desc:
    "Melihat senja di tepi pantai berdua, menyadari bahwa rumah yang kucari selama ini adalah dirimu.",

  galleryTitle: "Galeri Kenangan Kita",
  gallerySubtitle:
    "Potret senyuman dan detik-detik manis yang ingin kusimpan selamanya.",
  galleryImg1:
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80",
  galleryCaption1: "Senja pertama kita di tepi pantai",
  galleryDate1: "Pantai Kuta, 2023",
  galleryImg2:
    "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80",
  galleryCaption2: "Tertawa tanpa jeda di pasar malam",
  galleryDate2: "Yogyakarta, 2023",
  galleryImg3:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
  galleryCaption3: "Senyuman terindah yang selalu menenangkan",
  galleryDate3: "Bandung, 2024",
  galleryImg4:
    "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80",
  galleryCaption4: "Bunga favoritmu di hari ulang tahun",
  galleryDate4: "Jakarta, 2024",
  galleryImg5:
    "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80",
  galleryCaption5: "Kopi pagi & cerita panjang tanpa habis",
  galleryDate5: "Kedai Kopi, 2025",
  galleryImg6:
    "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?auto=format&fit=crop&w=800&q=80",
  galleryCaption6: "Malam berbintang dengan harapan kita",
  galleryDate6: "Bromo, 2025",

  reasonsTitle: "Hal-Hal Kecil yang Membuatku Jatuh Cinta",
  reason1: "Caramu tertawa lepas saat mendengar leluconku yang garing.",
  reason2:
    "Ketulusan hatimu dan kelembutan caramu memperlakukan semua orang di sekitarmu.",
  reason3:
    "Rasa tenang dan aman yang selalu hadir setiap kali tangan kita saling menggenggam.",
  reason4:
    "Caramu selalu mempercayaiku dan menjadi pendukung terbesarku dalam segala hal.",

  quote:
    "Dan dari jutaan kemungkinan di alam semesta, aku bersyukur semesta memilihkan kamu.",
  message: "Tulisanmu akan muncul di sini.",
  signature: "Selalu, Raka",
  letterDate: "",

  primaryColor: "#c03a52",
  backgroundColor: "#fdf4f5",
  cardColor: "#ffffff",
  textColor: "#3e1b24",
  bodyTextColor: "#54333b",
  musicTitle: "",
  bgMusicUrl: "",
};

/** Menghitung durasi hari sejak tanggal mulai */
function useDurationSince(dateString: string) {
  const [time, setTime] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (!dateString) return;
    const target = new Date(dateString).getTime();
    if (Number.isNaN(target)) return;

    function update() {
      const now = new Date().getTime();
      const diff = Math.max(0, now - target);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTime({ days, hours, minutes, seconds });
    }

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [dateString]);

  return time;
}

export function RomanticTemplate({
  data,
  className,
}: {
  data: LetterContent;
  className?: string;
}) {
  const letter = withDefaults(defaults, data);
  const primaryColor = String(letter.primaryColor || "#c03a52");
  const backgroundColor = String(letter.backgroundColor || "#fdf4f5");
  const cardColor = String(letter.cardColor || "#ffffff");
  const textColor = String(letter.textColor || "#3e1b24");
  const bodyTextColor = String(letter.bodyTextColor || "#54333b");

  const isDark = isColorDark(backgroundColor);
  const isCardDark = isColorDark(cardColor);
  const mutedTextColor = isDark
    ? "rgba(255, 255, 255, 0.7)"
    : "rgba(60, 25, 35, 0.65)";
  const borderColor = isCardDark
    ? "rgba(255, 255, 255, 0.12)"
    : "rgba(0, 0, 0, 0.08)";
  const glowShadow = `0 20px 60px -15px ${primaryColor}25`;

  const paragraphs = toParagraphs(String(letter.message));
  const date = formatDate(String(letter.letterDate));
  const duration = useDurationSince(String(letter.anniversaryDate));

  // Audio player state
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const url = String(letter.bgMusicUrl || "").trim();
    if (!url) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setIsPlaying(false);
      return;
    }

    const audio = new Audio(url);
    audio.loop = true;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [letter.bgMusicUrl]);

  const toggleAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Autoplay policy or error
        });
    }
  };

  // Lightbox modal state
  const [lightboxImg, setLightboxImg] = useState<{
    url: string;
    caption: string;
    date: string;
  } | null>(null);

  // Cast to record for dynamic string index
  const content = letter as Record<string, string | number>;

  // Parse gallery items
  const galleryItems = useMemo(() => {
    const items: Array<{
      url: string;
      caption: string;
      date: string;
      id: number;
    }> = [];
    for (let i = 1; i <= 6; i++) {
      const url = String(content[`galleryImg${i}`] || "").trim();
      if (url) {
        items.push({
          id: i,
          url,
          caption: String(content[`galleryCaption${i}`] || ""),
          date: String(content[`galleryDate${i}`] || ""),
        });
      }
    }
    return items;
  }, [content]);

  // Parse milestones
  const milestones = useMemo(() => {
    const list: Array<{
      title: string;
      date: string;
      desc: string;
      num: number;
    }> = [];
    for (let i = 1; i <= 3; i++) {
      const title = String(content[`milestone${i}Title`] || "").trim();
      const desc = String(content[`milestone${i}Desc`] || "").trim();
      const mDate = String(content[`milestone${i}Date`] || "").trim();
      if (title || desc || mDate) {
        list.push({ title, desc, date: mDate, num: i });
      }
    }
    return list;
  }, [content]);

  // Parse reasons
  const reasons = useMemo(() => {
    const list: string[] = [];
    for (let i = 1; i <= 4; i++) {
      const r = String(content[`reason${i}`] || "").trim();
      if (r) list.push(r);
    }
    return list;
  }, [content]);

  return (
    <article
      className={cn(
        "relative min-h-screen w-full overflow-hidden transition-colors duration-500",
        className,
      )}
      style={{ backgroundColor }}
    >
      {/* Subtle Floating Ambient Hearts & Sparkles */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-40"
      >
        <div className="absolute top-[10%] left-[8%] animate-pulse">
          <Heart
            className="h-6 w-6 fill-current opacity-30"
            style={{ color: primaryColor }}
          />
        </div>
        <div className="absolute top-[25%] right-[12%] animate-bounce [animation-duration:4s]">
          <Heart
            className="h-8 w-8 fill-current opacity-25"
            style={{ color: primaryColor }}
          />
        </div>
        <div className="absolute top-[55%] left-[5%] animate-pulse [animation-duration:3s]">
          <Sparkles className="h-5 w-5 opacity-30" style={{ color: primaryColor }} />
        </div>
        <div className="absolute top-[75%] right-[8%] animate-pulse [animation-duration:5s]">
          <Heart
            className="h-7 w-7 fill-current opacity-20"
            style={{ color: primaryColor }}
          />
        </div>
      </div>

      {/* Floating Romantic Music Player (if music provided and not a thumbnail) */}
      {String(letter.bgMusicUrl || "").trim() &&
      !data._isThumbnail &&
      !className?.includes("is-thumbnail") ? (
        <div className="fixed bottom-5 right-5 z-40 sm:bottom-8 sm:right-8">
          <button
            type="button"
            onClick={toggleAudio}
            title={isPlaying ? "Jeda musik" : "Putar musik romantis"}
            aria-label={isPlaying ? "Jeda musik" : "Putar musik romantis"}
            className={cn(
              "group flex items-center gap-3 rounded-full border px-4 py-2.5 shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-105",
              isPlaying
                ? "ring-2 ring-seal-400"
                : "opacity-80 hover:opacity-100",
            )}
            style={{
              backgroundColor: cardColor,
              borderColor,
            }}
          >
            <span
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-white shadow-md transition-transform",
                isPlaying && "animate-spin [animation-duration:6s]",
              )}
              style={{ backgroundColor: primaryColor }}
            >
              <Music className="h-4 w-4" />
            </span>
            <div className="hidden text-left sm:block">
              <p
                className="text-xs font-semibold leading-tight"
                style={{ color: textColor }}
              >
                {String(letter.musicTitle || "Romantic Soundtrack")}
              </p>
              <p className="text-[11px] leading-tight" style={{ color: mutedTextColor }}>
                {isPlaying ? "Sedang memutar..." : "Klik untuk memutar"}
              </p>
            </div>
            <span className="ml-1" style={{ color: primaryColor }}>
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4 fill-current" />
              )}
            </span>
          </button>
        </div>
      ) : null}

      {/* MAIN CONTAINER */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-16 lg:px-8">
        {/* ================= HERO COVER SECTION ================= */}
        <header className="text-center">
          {/* Badge */}
          {String(letter.heroBadge).trim() ? (
            <div
              className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-wide uppercase shadow-sm"
              style={{ borderColor }}
            >
              <span
                className="inline-block rounded-full border px-3 py-1 font-medium"
                style={{
                  color: primaryColor,
                  backgroundColor: `${primaryColor}18`,
                  borderColor: `${primaryColor}35`,
                }}
              >
                {String(letter.heroBadge)}
              </span>
            </div>
          ) : null}

          {/* Headline Title */}
          <h1
            className="mt-6 font-display text-3xl leading-[1.15] font-bold tracking-tight sm:text-5xl lg:text-6xl"
            style={{ color: textColor }}
          >
            {String(letter.title)}
          </h1>

          {/* Couple Nickname / Subtitle */}
          <p
            className="mt-4 font-display text-xl italic sm:text-2xl"
            style={{ color: primaryColor }}
          >
            {String(
              letter.coupleNickname ||
                `${letter.senderName} & ${letter.recipientName}`,
            )}
          </p>

          {/* Tagline / Opening text */}
          {String(letter.tagline).trim() ? (
            <p
              className="mx-auto mt-4 max-w-2xl text-base leading-relaxed sm:text-lg"
              style={{ color: bodyTextColor }}
            >
              {String(letter.tagline)}
            </p>
          ) : null}

          {/* Hero Couple Photo in Luxury Frame */}
          {String(letter.heroImage).trim() ? (
            <div className="relative mx-auto mt-10 max-w-2xl">
              <div
                className="relative aspect-16/10 overflow-hidden rounded-[2.5rem] border p-2.5 sm:aspect-16/9 sm:p-3 transition-transform duration-500 hover:scale-[1.01]"
                style={{
                  backgroundColor: cardColor,
                  borderColor,
                  boxShadow: glowShadow,
                }}
              >
                <div className="relative h-full w-full overflow-hidden rounded-[2rem]">
                  <img
                    src={String(letter.heroImage)}
                    alt={String(letter.coupleNickname || "Our Story")}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  {/* Gentle gradient overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-6 flex items-center gap-2 text-white drop-shadow-md">
                    <Heart className="h-5 w-5 fill-seal-500 text-seal-500" />
                    <span className="font-display text-lg font-medium">
                      {String(letter.recipientName)} &{" "}
                      {String(letter.senderName)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </header>

        {/* ================= LOVE COUNTER SECTION ================= */}
        {String(letter.anniversaryDate).trim() ? (
          <section className="mt-16 sm:mt-24">
            <div
              className="rounded-[2.5rem] border p-7 text-center sm:p-12 shadow-lg"
              style={{
                backgroundColor: cardColor,
                borderColor,
                boxShadow: glowShadow,
              }}
            >
              <div
                className="mx-auto flex h-12 w-12 items-center justify-center rounded-full"
                style={{
                  backgroundColor: `${primaryColor}18`,
                  color: primaryColor,
                }}
              >
                <Clock className="h-6 w-6" />
              </div>

              <h2
                className="mt-4 font-display text-2xl font-bold tracking-tight sm:text-3xl"
                style={{ color: textColor }}
              >
                {String(letter.counterTitle || "Hari-Hari Indah Bersamamu")}
              </h2>

              <p className="mt-2 text-sm sm:text-base" style={{ color: mutedTextColor }}>
                Sejak {formatDate(String(letter.anniversaryDate))}
              </p>

              {/* Time Blocks Grid */}
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                {[
                  { label: "Hari", value: duration.days },
                  { label: "Jam", value: duration.hours },
                  { label: "Menit", value: duration.minutes },
                  { label: "Detik", value: duration.seconds },
                ].map((block) => (
                  <div
                    key={block.label}
                    className="flex flex-col items-center justify-center rounded-2xl border p-4 sm:p-6"
                    style={{
                      backgroundColor: isCardDark
                        ? "rgba(255,255,255,0.06)"
                        : "rgba(0,0,0,0.03)",
                      borderColor,
                    }}
                  >
                    <span
                      className="font-display text-3xl font-bold tracking-tight sm:text-4xl"
                      style={{ color: primaryColor }}
                    >
                      {block.value}
                    </span>
                    <span
                      className="mt-1 text-xs font-medium uppercase tracking-wider"
                      style={{ color: mutedTextColor }}
                    >
                      {block.label}
                    </span>
                  </div>
                ))}
              </div>

              {String(letter.counterSubtitle).trim() ? (
                <p
                  className="mt-6 font-display text-base italic sm:text-lg"
                  style={{ color: bodyTextColor }}
                >
                  &ldquo;{String(letter.counterSubtitle)}&rdquo;
                </p>
              ) : null}
            </div>
          </section>
        ) : null}

        {/* ================= PHOTO MEMORIES GALLERY ================= */}
        {galleryItems.length > 0 ? (
          <section className="mt-16 sm:mt-24">
            <div className="text-center">
              <span
                className="font-display text-sm font-semibold tracking-widest uppercase"
                style={{ color: primaryColor }}
              >
                Memories & Moments
              </span>
              <h2
                className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-4xl"
                style={{ color: textColor }}
              >
                {String(letter.galleryTitle || "Galeri Kenangan Kita")}
              </h2>
              {String(letter.gallerySubtitle).trim() ? (
                <p
                  className="mx-auto mt-2 max-w-xl text-sm sm:text-base"
                  style={{ color: mutedTextColor }}
                >
                  {String(letter.gallerySubtitle)}
                </p>
              ) : null}
            </div>

            {/* Gallery Grid (Polaroid Style) */}
            <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {galleryItems.map((item, idx) => {
                // Alternating subtle tilts
                const tilts = [
                  "-rotate-1",
                  "rotate-1",
                  "-rotate-2",
                  "rotate-2",
                  "-rotate-1",
                  "rotate-1",
                ];
                const tilt = tilts[idx % tilts.length];

                return (
                  <div
                    key={item.id}
                    onClick={() => setLightboxImg(item)}
                    className={cn(
                      "group relative cursor-pointer rounded-2xl border p-3.5 shadow-md transition-all duration-300 hover:z-20 hover:scale-[1.03] hover:rotate-0 hover:shadow-2xl",
                      tilt,
                    )}
                    style={{
                      backgroundColor: cardColor,
                      borderColor,
                    }}
                  >
                    {/* Polaroid Image */}
                    <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl bg-neutral-100">
                      <img
                        src={item.url}
                        alt={item.caption || "Kenangan"}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
                        <span className="rounded-full bg-white/80 p-2 text-ink shadow-md backdrop-blur-sm">
                          <Maximize2 className="h-4 w-4" />
                        </span>
                      </div>
                    </div>

                    {/* Polaroid Caption & Date */}
                    <div className="pt-3.5 pb-1 px-1">
                      {item.caption ? (
                        <p
                          className="font-display text-sm font-medium leading-snug"
                          style={{ color: textColor }}
                        >
                          {item.caption}
                        </p>
                      ) : null}
                      {item.date ? (
                        <p
                          className="mt-1 font-hand text-base"
                          style={{ color: primaryColor }}
                        >
                          {item.date}
                        </p>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ) : null}

        {/* ================= OUR STORY TIMELINE ================= */}
        {milestones.length > 0 ? (
          <section className="mt-16 sm:mt-24">
            <div className="text-center">
              <span
                className="font-display text-sm font-semibold tracking-widest uppercase"
                style={{ color: primaryColor }}
              >
                Our Journey
              </span>
              <h2
                className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-4xl"
                style={{ color: textColor }}
              >
                {String(letter.storyTitle || "Babak Indah Perjalanan Kita")}
              </h2>
            </div>

            <div className="relative mx-auto mt-12 max-w-2xl">
              {/* Timeline Center/Left Line */}
              <div
                className="absolute left-4 top-4 bottom-4 w-0.5 sm:left-1/2 sm:-ml-px"
                style={{ backgroundColor: `${primaryColor}40` }}
                aria-hidden
              />

              <div className="space-y-8 sm:space-y-12">
                {milestones.map((m, idx) => {
                  const isEven = idx % 2 === 0;
                  return (
                    <div
                      key={m.num}
                      className={cn(
                        "relative flex items-start gap-6 sm:gap-0",
                        isEven ? "sm:flex-row-reverse" : "sm:flex-row",
                      )}
                    >
                      {/* Timeline Marker Dot */}
                      <div
                        className="absolute left-4 -ml-2.5 mt-2 flex h-5 w-5 items-center justify-center rounded-full shadow-md sm:left-1/2"
                        style={{ backgroundColor: cardColor }}
                      >
                        <span
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: primaryColor }}
                        />
                      </div>

                      {/* Content Card */}
                      <div
                        className={cn(
                          "ml-10 w-full sm:ml-0 sm:w-[45%]",
                          isEven
                            ? "sm:pr-8 sm:text-right"
                            : "sm:pl-8 sm:text-left",
                        )}
                      >
                        <div
                          className="rounded-2xl border p-5 shadow-sm transition-all hover:shadow-md"
                          style={{
                            backgroundColor: cardColor,
                            borderColor,
                          }}
                        >
                          {m.date ? (
                            <span
                              className="inline-block rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider"
                              style={{
                                color: primaryColor,
                                backgroundColor: `${primaryColor}18`,
                                borderColor: `${primaryColor}35`,
                              }}
                            >
                              {m.date}
                            </span>
                          ) : null}
                          <h3
                            className="mt-2 font-display text-lg font-bold leading-snug"
                            style={{ color: textColor }}
                          >
                            {m.title}
                          </h3>
                          {m.desc ? (
                            <p
                              className="mt-2 text-sm leading-relaxed"
                              style={{ color: bodyTextColor }}
                            >
                              {m.desc}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        ) : null}

        {/* ================= REASONS WHY I LOVE YOU ================= */}
        {reasons.length > 0 ? (
          <section className="mt-16 sm:mt-24">
            <div className="text-center">
              <span
                className="font-display text-sm font-semibold tracking-widest uppercase"
                style={{ color: primaryColor }}
              >
                From The Heart
              </span>
              <h2
                className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-4xl"
                style={{ color: textColor }}
              >
                {String(
                  letter.reasonsTitle ||
                    "Hal-Hal Kecil yang Membuatku Jatuh Cinta",
                )}
              </h2>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {reasons.map((reason, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 rounded-2xl border p-5 shadow-sm transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    backgroundColor: cardColor,
                    borderColor,
                  }}
                >
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white shadow-sm"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <Heart className="h-4 w-4 fill-current" />
                  </div>
                  <div>
                    <span
                      className="text-xs font-semibold tracking-wider uppercase"
                      style={{ color: primaryColor }}
                    >
                      Alasan #{idx + 1}
                    </span>
                    <p
                      className="mt-1 text-sm sm:text-base leading-relaxed font-medium"
                      style={{ color: bodyTextColor }}
                    >
                      {reason}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {/* ================= THE GRAND LOVE LETTER ================= */}
        <section id="letter" className="mt-16 sm:mt-24">
          <div
            className="relative mx-auto max-w-2xl rounded-[2.5rem] border p-7 sm:p-14 shadow-paper transition-all"
            style={{
              backgroundColor: cardColor,
              borderColor,
              boxShadow: glowShadow,
            }}
          >
            {/* Wax Seal Medallion Decoration */}
            <div className="flex items-center justify-center gap-3">
              <span
                className="h-px w-12 sm:w-16 opacity-40"
                style={{ backgroundColor: isDark ? "#ffffff" : primaryColor }}
                aria-hidden
              />
              <div
                className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold uppercase shadow-inner text-white"
                style={{ backgroundColor: primaryColor }}
              >
                <Heart className="h-4 w-4 fill-current" />
              </div>
              <span
                className="h-px w-12 sm:w-16 opacity-40"
                style={{ backgroundColor: isDark ? "#ffffff" : primaryColor }}
                aria-hidden
              />
            </div>

            {/* Letter Header */}
            <header className="mt-8 text-center">
              <p
                className="font-display text-sm tracking-widest uppercase font-semibold"
                style={{ color: primaryColor }}
              >
                Surat Cinta Untukmu
              </p>
              <h2
                className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight"
                style={{ color: textColor }}
              >
                Untuk {String(letter.recipientName)}
              </h2>
            </header>

            {/* Quote Callout */}
            {String(letter.quote).trim() ? (
              <blockquote
                className="mt-8 border-y py-5 text-center font-display text-base sm:text-lg italic leading-relaxed"
                style={{ borderColor, color: textColor }}
              >
                &ldquo;{String(letter.quote)}&rdquo;
              </blockquote>
            ) : null}

            {/* Main Letter Body */}
            <div
              className="mt-8 space-y-5 font-display text-base sm:text-[1.05rem] leading-[1.95]"
              style={{ color: bodyTextColor }}
            >
              {paragraphs.length > 0 ? (
                paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))
              ) : (
                <p style={{ color: mutedTextColor }}>Tulisanmu akan muncul di sini.</p>
              )}
            </div>

            {/* Letter Footer */}
            <footer
              className="mt-12 flex flex-wrap items-end justify-between gap-6 border-t pt-6"
              style={{ borderColor }}
            >
              <div>
                <p
                  className="text-xs tracking-wider uppercase"
                  style={{ color: mutedTextColor }}
                >
                  Tertanggal
                </p>
                <p className="mt-0.5 text-sm font-medium" style={{ color: bodyTextColor }}>
                  {date || "Hari yang Istimewa"}
                </p>
              </div>
              <div className="text-right">
                {String(letter.signature).trim() ? (
                  <p
                    className="font-hand text-3xl sm:text-4xl leading-none"
                    style={{ color: textColor }}
                  >
                    {String(letter.signature)}
                  </p>
                ) : null}
                <p
                  className="mt-2 text-xs tracking-wider uppercase"
                  style={{ color: mutedTextColor }}
                >
                  Dengan segenap cinta, {String(letter.senderName)}
                </p>
              </div>
            </footer>
          </div>
        </section>

        {/* ================= ROMANTIC CLOSING OUTRO ================= */}
        <footer className="mt-16 text-center sm:mt-24">
          <div className="flex items-center justify-center gap-2">
            <Heart className="h-4 w-4 fill-current" style={{ color: primaryColor }} />
            <span
              className="font-display text-sm tracking-widest uppercase font-semibold"
              style={{ color: primaryColor }}
            >
              Forever & Always
            </span>
            <Heart className="h-4 w-4 fill-current" style={{ color: primaryColor }} />
          </div>
          <p
            className="mt-2 font-display text-lg font-medium"
            style={{ color: textColor }}
          >
            {String(
              letter.coupleNickname ||
                `${letter.senderName} & ${letter.recipientName}`,
            )}
          </p>
          <p className="mt-1 text-xs" style={{ color: mutedTextColor }}>
            Dibuat dengan cinta tak terhingga.
          </p>
        </footer>
      </div>

      {/* ================= LIGHTBOX MODAL ================= */}
      {lightboxImg ? (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          onClick={() => setLightboxImg(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-3xl overflow-hidden rounded-2xl bg-black p-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightboxImg(null)}
              className="absolute right-4 top-4 z-10 rounded-full bg-black/60 p-2 text-white transition-colors hover:bg-black"
              aria-label="Tutup foto"
            >
              <X className="h-5 w-5" />
            </button>
            <img
              src={lightboxImg.url}
              alt={lightboxImg.caption || "Foto kenangan"}
              className="max-h-[75vh] w-auto rounded-xl object-contain mx-auto"
            />
            {(lightboxImg.caption || lightboxImg.date) && (
              <div className="p-4 text-center text-white">
                {lightboxImg.caption && (
                  <p className="font-display text-lg font-semibold">
                    {lightboxImg.caption}
                  </p>
                )}
                {lightboxImg.date && (
                  <p className="mt-1 text-sm text-neutral-400 font-hand text-xl">
                    {lightboxImg.date}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      ) : null}
    </article>
  );
}
