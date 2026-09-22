"use client";

import { useRef, useState, Suspense } from "react";
import { usePathname } from "next/navigation";
import {
  Clapperboard,
  Film,
  Sparkles,
  Pause,
  Play,
  Share2,
  Check,
  Star,
  Award,
  Video,
  Volume2,
  VolumeX,
  Camera,
  Heart,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { toParagraphs } from "@/lib/utils/format";
import type { LetterContent } from "@/types/letter";
import { withDefaults } from "../utils";

interface BirthdayCinemaTemplateProps {
  data: LetterContent;
  className?: string;
}

const defaults: Record<string, string> = {
  recipientName: "Natasha Aurelie",
  ageNumber: "25",
  filmTitle: "THE EXTRAORDINARY EXPEDITION: CHAPTER 25",
  filmGenre: "Drama, Warm Comedy, Infinite Wonder",
  premiereDate: "Gala Premiere // 26 Oktober 2026",
  runningTime: "25 Years of Pure Grace & Laughter",
  filmRating: "100% Certified Masterpiece // Rotten Smiles",
  posterUrl:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
  filmSynopsis:
    "Sebuah kisah memukau tentang keteguhan jiwa, senyuman yang menyembuhkan sekelilingnya, dan keberanian melangkah menembus setiap babak waktu dengan penuh keanggunan.",

  letterTitle: "Director's Note: Sebuah Penghormatan Bagi Pemeran Utama Terbaik",
  letterContent:
    "INT. THE THEATER OF LIFE - NIGHT\n\nLampu auditorium meredup perlahan. Seluruh semesta terdiam menantikan adegan berikutnya dimulai.\n\nMemperhatikan caramu melangkah sejauh ini adalah menyaksikan mahakarya yang sesungguhnya. Dalam setiap adegan yang telah berlalu—dari masa-masa kecil yang penuh keajaiban hingga badai plot twist yang kau hadapi dengan kepala tegak—kau tak pernah kehilangan ketulusan hatimu.\n\nTerima kasih telah menjadi tokoh utama yang luar biasa, rekan tertawa yang paling menyenangkan, dan inspirasi bagi siapa pun yang beruntung menyaksikan peranmu di dunia ini. Di episode usiamu yang ke-25 ini, semoga alur ceritamu semakin bertabur kejutan manis, dialog-dialog penuh tawa, dan pencapaian sinematik yang gemilang.\n\nLights, camera, forever action!",
  directorName: "Julian Alistair",
  directorTitle: "Executive Producer & Lifetime Co-Director // Sahabat Sejati",

  scene1Timecode: "TC: 00:00:01:00",
  scene1Title: "The Opening Sequence: Kelahiran & Kepolosan",
  scene1Desc:
    "Awal mula perjalanan dengan mata yang berbinar menatap dunia, menyerap kehangatan pertama tanpa rasa takut.",

  scene2Timecode: "TC: 00:15:20:00",
  scene2Title: "The Plot Twist: Badai, Eksplorasi & Kedewasaan",
  scene2Desc:
    "Masa-masa penuh tantangan yang menguji karakter, namun justru membentukmu menjadi sosok yang luar biasa tangguh.",

  scene3Timecode: "TC: 00:23:45:00",
  scene3Title: "The Climax: Supernova Pencapaian & Karya",
  scene3Desc:
    "Titik di mana dedikasi dan kebaikanmu berbuah manis, menuai tepuk tangan dari mereka yang mencintaimu.",

  scene4Timecode: "TC: 00:25:00:00",
  scene4Title: "The Golden Horizon: Babak Usia Baru",
  scene4Desc:
    "Kamera mengarah ke masa depan yang cerah, menyongsong babak berikutnya dengan hati yang lapang dan optimisme membara.",

  bts1Photo:
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
  bts1Title: "Tawa Spontan di Luar Skenario",
  bts1Lens: "35mm Prime // f/1.4 Soft Light",
  bts1Desc:
    "Tawa paling lepas yang tertangkap kamera saat jeda syuting kehidupan di sudut kafe favorit.",

  bts2Photo:
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
  bts2Title: "Eksplorasi Malam Penuh Kilau",
  bts2Lens: "50mm Cine // f/1.2 City Lights",
  bts2Desc:
    "Momen magis menembus hiruk pikuk kota dengan tatapan penuh semangat dan mimpi yang menyala.",

  bts3Photo:
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
  bts3Title: "Pelukan Hangat Rekan Seperjuangan",
  bts3Lens: "85mm Portrait // f/1.8 Golden Hour",
  bts3Desc:
    "Bukti tak terbantahkan bahwa kehangatan persahabatan adalah piala sesungguhnya dalam setiap episode.",

  award1Category: "BEST HEART & COMPASSION",
  award1Title: "Piala Jiwa Paling Menginspirasi",
  award1Praise:
    "Dianugerahi atas kebaikan hati yang tiada henti menyalakan harapan di sekelilingnya.",

  award2Category: "MOST RESILIENT CHARACTER",
  award2Title: "Piala Ketangguhan Melewati Badai",
  award2Praise:
    "Bahkan dalam badai plot twist terberat sekalipun, senyumanmu selalu kembali dengan kilau lebih megah.",

  award3Category: "OUTSTANDING RADIANCE",
  award3Title: "Piala Senyuman Paling Menyinari",
  award3Praise:
    "Setiap senyumanmu mampu mengubah suasana muram menjadi ruang hangat yang dipenuhi tawa.",

  award4Category: "LIFETIME OF FORTUNE",
  award4Title: "Piala Kejayaan Babak Baru",
  award4Praise:
    "Kiranya episode berikutnya dipenuhi kesuksesan, karya-karya brilian, dan cinta tanpa batas.",

  primaryColor: "#0d0d11",
  accentColor: "#e5b869",
  backgroundColor: "#08080a",
  cardColor: "#16171d",
  textColor: "#f5efeb",
  musicTitle: "Cinematic Film Score & Acoustic Overture",
  musicUrl:
    "https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f792cb.mp3?filename=cinematic-time-lapse-115672.mp3",
};

function BirthdayCinemaTemplateInner({
  data,
  className,
}: BirthdayCinemaTemplateProps) {
  const content = withDefaults(defaults, data);
  const pathname = usePathname();
  const isThumbnail = className?.includes("thumbnail") || false;

  // Interactivity States
  const [isPlayingFilm, setIsPlayingFilm] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [clapperSnapped, setClapperSnapped] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [applauseCount, setApplauseCount] = useState(25);
  const [hasApplauded, setHasApplauded] = useState(false);
  const [activeScene, setActiveScene] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlayingAudio(true);
    }
  };

  const handleClapAction = () => {
    setClapperSnapped(true);
    setTimeout(() => {
      setIsPlayingFilm(true);
      if (audioRef.current && !isPlayingAudio) {
        audioRef.current.play().catch(() => {});
        setIsPlayingAudio(true);
      }
    }, 450);
  };

  const handleApplause = () => {
    setApplauseCount((prev) => prev + 1);
    setHasApplauded(true);
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const paragraphs = toParagraphs(content.letterContent);

  const scenes = [
    {
      timecode: content.scene1Timecode,
      title: content.scene1Title,
      desc: content.scene1Desc,
    },
    {
      timecode: content.scene2Timecode,
      title: content.scene2Title,
      desc: content.scene2Desc,
    },
    {
      timecode: content.scene3Timecode,
      title: content.scene3Title,
      desc: content.scene3Desc,
    },
    {
      timecode: content.scene4Timecode,
      title: content.scene4Title,
      desc: content.scene4Desc,
    },
  ];

  const btsPhotos = [
    {
      photo: content.bts1Photo,
      title: content.bts1Title,
      lens: content.bts1Lens,
      desc: content.bts1Desc,
    },
    {
      photo: content.bts2Photo,
      title: content.bts2Title,
      lens: content.bts2Lens,
      desc: content.bts2Desc,
    },
    {
      photo: content.bts3Photo,
      title: content.bts3Title,
      lens: content.bts3Lens,
      desc: content.bts3Desc,
    },
  ];

  const awards = [
    {
      category: content.award1Category,
      title: content.award1Title,
      praise: content.award1Praise,
    },
    {
      category: content.award2Category,
      title: content.award2Title,
      praise: content.award2Praise,
    },
    {
      category: content.award3Category,
      title: content.award3Title,
      praise: content.award3Praise,
    },
    {
      category: content.award4Category,
      title: content.award4Title,
      praise: content.award4Praise,
    },
  ];

  return (
    <div
      className={cn(
        "relative min-h-screen w-full overflow-x-hidden transition-colors duration-700 font-sans selection:bg-amber-400/20 selection:text-amber-200",
        className
      )}
      style={{
        backgroundColor: content.backgroundColor,
        color: content.textColor,
      }}
    >
      {/* Background Projector Light & Film Grain */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(ellipse at 50% 0%, ${content.accentColor}25 0%, transparent 60%), radial-gradient(circle at 100% 100%, ${content.primaryColor} 0%, transparent 70%)`,
          }}
        />
        {/* Subtle Movie Theater Grid Lines */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff15 1px, transparent 1px), linear-gradient(to bottom, #ffffff15 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* Floating Film Score Audio */}
      {content.musicUrl && !isThumbnail && pathname !== "/templates" && (
        <>
          <audio ref={audioRef} src={content.musicUrl} loop preload="none" />
          <div className="fixed bottom-6 right-6 z-50">
            <button
              type="button"
              onClick={toggleAudio}
              className="flex items-center gap-3 px-4 py-2 rounded-full border border-amber-500/40 bg-stone-900/90 text-amber-200 shadow-2xl backdrop-blur-md hover:bg-stone-800 transition-all cursor-pointer"
              aria-label={isPlayingAudio ? "Jeda musik sinema" : "Putar musik sinema"}
            >
              <div className="relative flex items-center justify-center">
                {isPlayingAudio ? (
                  <>
                    <span className="absolute -inset-1 rounded-full bg-amber-400/30 animate-ping" />
                    <Volume2 className="h-4 w-4 text-amber-300" />
                  </>
                ) : (
                  <VolumeX className="h-4 w-4 text-stone-400" />
                )}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-[10px] uppercase font-mono tracking-widest text-stone-400">
                  {isPlayingAudio ? "Soundtrack Playing" : "Film Soundtrack"}
                </p>
                <p className="text-xs font-semibold text-amber-100 max-w-[130px] truncate">
                  {content.musicTitle}
                </p>
              </div>
              {isPlayingAudio ? (
                <Pause className="h-3.5 w-3.5 text-amber-300" />
              ) : (
                <Play className="h-3.5 w-3.5 text-amber-300 fill-amber-300" />
              )}
            </button>
          </div>
        </>
      )}

      {/* =================================================================== */}
      {/* 1. HERO: INTERACTIVE CLAPPERBOARD                                  */}
      {/* =================================================================== */}
      {!isPlayingFilm && !isThumbnail ? (
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 text-center">
          <div className="w-full max-w-md space-y-6">
            {/* Clapperboard Container */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-stone-600 bg-stone-900 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]">
              {/* Clapper Stick Top (Stripes) */}
              <div
                className={cn(
                  "h-12 w-full border-b-2 border-stone-700 flex origin-bottom-left transition-transform duration-300",
                  clapperSnapped ? "rotate-[-12deg]" : "rotate-0"
                )}
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, #1c1917, #1c1917 24px, #f5f5f4 24px, #f5f5f4 48px)",
                }}
              />

              {/* Clapper Body */}
              <div className="p-6 sm:p-8 space-y-4 text-left font-mono">
                <div className="flex items-center justify-between border-b border-stone-700 pb-3">
                  <span className="text-[10px] uppercase tracking-widest text-amber-400">
                    WORLD PREMIERE CINEMA
                  </span>
                  <span className="text-xs text-stone-400">FPS: 24 // 35MM</span>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] uppercase text-stone-500">PRODUCTION</p>
                  <p className="font-serif font-bold text-lg text-amber-200 truncate">
                    {content.filmTitle}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center py-2 border-y border-stone-700">
                  <div className="p-2 rounded bg-black/40 border border-stone-800">
                    <p className="text-[9px] text-stone-500 uppercase">SCENE</p>
                    <p className="font-bold text-base text-white">EP. {content.ageNumber}</p>
                  </div>
                  <div className="p-2 rounded bg-black/40 border border-stone-800">
                    <p className="text-[9px] text-stone-500 uppercase">TAKE</p>
                    <p className="font-bold text-base text-amber-300">#01</p>
                  </div>
                  <div className="p-2 rounded bg-black/40 border border-stone-800">
                    <p className="text-[9px] text-stone-500 uppercase">ROLL</p>
                    <p className="font-bold text-base text-white">LIFE</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                  <div>
                    <p className="text-[9px] text-stone-500 uppercase">DIRECTOR</p>
                    <p className="text-stone-300 font-serif font-semibold truncate">
                      {content.directorName}
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] text-stone-500 uppercase">STARRING</p>
                    <p className="text-amber-300 font-serif font-bold truncate">
                      {content.recipientName}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Trigger Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleClapAction}
                className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-mono text-xs uppercase tracking-widest font-bold text-stone-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 shadow-[0_0_30px_rgba(229,184,105,0.4)] hover:shadow-[0_0_40px_rgba(229,184,105,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <Clapperboard className="h-4 w-4 text-stone-900 group-hover:rotate-12 transition-transform duration-300" />
                <span>CLAP & ACTION // PUTAR PREMIERE</span>
                <Sparkles className="h-4 w-4 text-stone-900" />
              </button>
            </div>

            <p className="font-mono text-[10px] text-stone-500 tracking-widest">
              GALA SCREENING • {content.premiereDate}
            </p>
          </div>
        </div>
      ) : (
        /* ================================================================= */
        /* 2. THE GRAND CINEMA PREMIERE SCREEN                               */
        /* ================================================================= */
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-16 sm:space-y-24">
          {/* =============================================================== */}
          {/* SEKSI 1: OFFICIAL PREMIERE POSTER & FESTIVAL LAURELS           */}
          {/* =============================================================== */}
          <section className="space-y-6 text-center">
            {/* Festival Laurel Wreath Banner */}
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-amber-500/30 bg-amber-950/20 text-amber-300 font-mono text-xs tracking-widest">
              <span>✦ OFFICIAL SELECTION // CANNES OF LIFE ✦</span>
            </div>

            <div className="space-y-2">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-stone-400">
                A Lifetime Masterpiece Directed With Pure Love
              </p>
              <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-200 to-amber-400">
                {content.recipientName}
              </h1>
              <p className="font-serif italic text-base sm:text-lg text-amber-200/90">
                {content.filmTitle}
              </p>
            </div>

            {/* Cinema Poster & Metadata Card */}
            <div
              className="max-w-3xl mx-auto rounded-3xl border border-stone-800 overflow-hidden shadow-2xl p-6 sm:p-8 backdrop-blur-md grid grid-cols-1 md:grid-cols-12 gap-8 items-center text-left"
              style={{ backgroundColor: `${content.cardColor}dd` }}
            >
              {/* Poster Image */}
              <div className="md:col-span-5 relative aspect-[3/4] rounded-2xl overflow-hidden border border-amber-500/30 shadow-xl bg-black">
                {content.posterUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={content.posterUrl}
                    alt={content.filmTitle}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-mono text-xs text-stone-500">
                    POSTER UNAVAILABLE
                  </div>
                )}
                {/* Poster Lighting Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 right-3 text-center font-mono text-[10px] text-amber-300 tracking-widest uppercase">
                  {`EPISODE #${content.ageNumber} • PREMIERE`}
                </div>
              </div>

              {/* Poster Film Details */}
              <div className="md:col-span-7 space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-mono">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span>{content.filmRating}</span>
                  </div>
                  <h3 className="font-serif font-bold text-2xl text-white">
                    {content.filmTitle}
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs font-mono border-y border-stone-800 py-3">
                  <div>
                    <span className="text-stone-500 uppercase text-[10px]">GENRE</span>
                    <p className="text-stone-300 truncate">{content.filmGenre}</p>
                  </div>
                  <div>
                    <span className="text-stone-500 uppercase text-[10px]">DURASI</span>
                    <p className="text-stone-300 truncate">{content.runningTime}</p>
                  </div>
                </div>

                <p className="font-sans text-xs sm:text-sm text-stone-300 leading-relaxed italic">
                  &ldquo;{content.filmSynopsis}&rdquo;
                </p>

                <div className="pt-2 flex items-center justify-between text-xs font-mono text-stone-400">
                  <span>RELEASE: {content.premiereDate}</span>
                  <div className="flex items-center gap-1 text-amber-400">
                    <Film className="h-3.5 w-3.5" />
                    <span>DIRECTOR&apos;S CUT</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* =============================================================== */}
          {/* SEKSI 2: THE DIRECTOR'S STATEMENT (SURAT NASKAH SUTRADARA)      */}
          {/* =============================================================== */}
          <section className="space-y-6">
            <div className="border-b border-stone-800 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-300 font-mono text-xs tracking-widest uppercase">
                <Video className="h-4 w-4 text-amber-400" />
                <span>DIRECTOR&apos;S STATEMENT // SCREENPLAY</span>
              </div>
              <span className="font-mono text-xs text-stone-500">
                SCENE DRAFT // FINAL
              </span>
            </div>

            <div
              className="rounded-3xl border border-stone-800 p-6 sm:p-10 backdrop-blur-md shadow-2xl relative space-y-6"
              style={{ backgroundColor: `${content.cardColor}ee` }}
            >
              <div className="border-b border-stone-800 pb-4 space-y-1">
                <p className="font-mono text-[11px] text-amber-400 uppercase tracking-widest">
                  WARKAT SUTRADARA
                </p>
                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-amber-100">
                  {content.letterTitle}
                </h3>
              </div>

              {/* Script Text */}
              <div className="font-mono text-xs sm:text-sm text-stone-200 leading-relaxed space-y-4">
                {paragraphs.map((para, idx) => (
                  <p key={idx} className="text-justify sm:text-left">
                    {para}
                  </p>
                ))}
              </div>

              {/* Director Signature */}
              <div className="pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-0.5">
                  <p className="font-mono text-[10px] text-stone-500 uppercase tracking-widest">
                    Disutradarai Sepenuh Hati Oleh
                  </p>
                  <p className="font-serif font-bold text-lg text-amber-200">
                    {content.directorName}
                  </p>
                  <p className="font-sans text-xs text-stone-400">
                    {content.directorTitle}
                  </p>
                </div>

                <div className="px-4 py-2 rounded-xl border border-amber-500/40 bg-amber-950/30 text-amber-300 font-mono text-[10px] tracking-wider uppercase">
                  APPROVED FOR WORLDWIDE SCREENING
                </div>
              </div>
            </div>
          </section>

          {/* =============================================================== */}
          {/* SEKSI 3: 4 FEATURED SCENES IN 35MM FILM STRIP                  */}
          {/* =============================================================== */}
          <section className="space-y-6">
            <div className="border-b border-stone-800 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-300 font-mono text-xs tracking-widest uppercase">
                <Film className="h-4 w-4 text-amber-400" />
                <span>35MM CELLULOID FILM STRIP // TIMELINE</span>
              </div>
              <span className="font-mono text-xs text-stone-500">
                4 CRITICAL SCENES
              </span>
            </div>

            {/* 35mm Film Roll Container */}
            <div className="rounded-3xl border border-stone-800 bg-stone-950 p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
              {/* Top Sprocket Perforations */}
              <div className="flex justify-between items-center overflow-x-hidden opacity-30 select-none pb-2 border-b border-stone-800">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-4 rounded-sm bg-stone-700 border border-stone-600 shrink-0 mx-1"
                  />
                ))}
              </div>

              {/* 4 Scene Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {scenes.map((scene, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveScene(idx)}
                    className={cn(
                      "cursor-pointer rounded-2xl p-4 border transition-all duration-300 flex flex-col justify-between relative overflow-hidden",
                      activeScene === idx
                        ? "border-amber-400 bg-amber-950/20 shadow-[0_0_20px_rgba(229,184,105,0.3)] scale-[1.02]"
                        : "border-stone-800 bg-stone-900/60 hover:border-stone-700"
                    )}
                    style={{ minHeight: "180px" }}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between font-mono text-[10px]">
                        <span className="text-red-400 font-bold">{scene.timecode}</span>
                        <span className="text-stone-500">SCENE 0{idx + 1}</span>
                      </div>

                      <h4 className="font-serif font-bold text-sm text-amber-100">
                        {scene.title}
                      </h4>

                      <p className="font-sans text-xs text-stone-300 leading-relaxed">
                        {scene.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-[10px] font-mono text-stone-500">
                      <span>STATUS: MASTERED</span>
                      <Check className="h-3 w-3 text-emerald-400" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Sprocket Perforations */}
              <div className="flex justify-between items-center overflow-x-hidden opacity-30 select-none pt-2 border-t border-stone-800">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-4 rounded-sm bg-stone-700 border border-stone-600 shrink-0 mx-1"
                  />
                ))}
              </div>
            </div>
          </section>

          {/* =============================================================== */}
          {/* SEKSI 4: BEHIND-THE-SCENES PRODUCTION GALLERY                  */}
          {/* =============================================================== */}
          <section className="space-y-6">
            <div className="border-b border-stone-800 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-300 font-mono text-xs tracking-widest uppercase">
                <Camera className="h-4 w-4 text-amber-400" />
                <span>BEHIND-THE-SCENES // CONTACT SHEET</span>
              </div>
              <span className="font-mono text-xs text-stone-500">
                3 CANDID SHOTS
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {btsPhotos.map((bts, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-stone-800 p-4 space-y-3 shadow-xl backdrop-blur-md relative overflow-hidden group"
                  style={{ backgroundColor: `${content.cardColor}dd` }}
                >
                  {/* Photo with Film Frame */}
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-black border border-stone-700">
                    {bts.photo ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={bts.photo}
                        alt={bts.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-mono text-xs text-stone-600">
                        BTS PHOTO
                      </div>
                    )}
                    {/* Grease Pencil Mark */}
                    <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-black/60 text-amber-300 font-mono text-[9px]">
                      {`ROLL 25 • ${bts.lens}`}
                    </div>
                  </div>

                  {/* Caption */}
                  <div className="space-y-1">
                    <h4 className="font-serif font-bold text-base text-amber-200">
                      {bts.title}
                    </h4>
                    <p className="font-sans text-xs text-stone-300 leading-relaxed">
                      {bts.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* =============================================================== */}
          {/* SEKSI 5: 4 GOLDEN LAURELS ACCOLADES & BLESSINGS                */}
          {/* =============================================================== */}
          <section className="space-y-6">
            <div className="border-b border-stone-800 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-300 font-mono text-xs tracking-widest uppercase">
                <Award className="h-4 w-4 text-amber-400" />
                <span>GOLDEN LAURELS // CRITICS&apos; AWARDS</span>
              </div>
              <span className="font-mono text-xs text-stone-500">
                4 PRESTIGIOUS HONORS
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {awards.map((award, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-stone-800 p-5 space-y-3 backdrop-blur-md relative overflow-hidden"
                  style={{ backgroundColor: `${content.cardColor}ee` }}
                >
                  {/* Category Label */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-amber-400 uppercase tracking-widest px-2 py-0.5 rounded border border-amber-500/30 bg-amber-950/20">
                      {award.category}
                    </span>
                    <Award className="h-4 w-4 text-amber-400" />
                  </div>

                  <div className="space-y-1">
                    <h4 className="font-serif font-bold text-lg text-white">
                      {award.title}
                    </h4>
                    <p className="font-sans text-xs text-stone-300 leading-relaxed">
                      {award.praise}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Standing Ovation Button */}
            <div className="pt-4 text-center">
              <button
                type="button"
                onClick={handleApplause}
                className={cn(
                  "inline-flex items-center gap-2 px-8 py-3 rounded-full font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-300 shadow-xl cursor-pointer",
                  hasApplauded
                    ? "border border-amber-400/50 bg-amber-950/40 text-amber-300"
                    : "border border-stone-700 bg-stone-900 text-stone-200 hover:bg-stone-800 hover:border-amber-400"
                )}
              >
                <Heart className="h-4 w-4 text-rose-400 fill-rose-400" />
                <span>
                  Standing Ovation ({applauseCount} Tepuk Tangan Meriah)
                </span>
              </button>
            </div>
          </section>

          {/* =============================================================== */}
          {/* FOOTER: SHARE PREMIERE                                          */}
          {/* =============================================================== */}
          <footer className="border-t border-stone-800 pt-8 text-center space-y-4">
            <div className="space-y-1">
              <p className="font-serif italic text-stone-400 text-sm">
                &ldquo;Semoga setiap babak berikutnya dalam film kehidupanmu selalu bertabur mahakarya kebahagiaan.&rdquo;
              </p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-stone-500">
                {`THE BIRTHDAY CINÉMATHÈQUE © 2026 • DEDICATED TO ${content.recipientName}`}
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-stone-700 bg-stone-900 text-amber-200 font-mono text-xs uppercase tracking-wider hover:bg-stone-800 transition-colors shadow-md cursor-pointer"
              >
                {copiedLink ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Tautan Film Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="h-3.5 w-3.5" />
                    <span>Bagikan Mahakarya Film Ini</span>
                  </>
                )}
              </button>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
}

export function BirthdayCinemaTemplate({
  data,
  className,
}: BirthdayCinemaTemplateProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#08080a]" />}>
      <BirthdayCinemaTemplateInner data={data} className={className} />
    </Suspense>
  );
}
