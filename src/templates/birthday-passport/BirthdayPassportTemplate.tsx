"use client";

import { useRef, useState, Suspense } from "react";
import { usePathname } from "next/navigation";
import {
  Compass,
  Plane,
  Sparkles,
  Pause,
  Play,
  Share2,
  Check,
  Globe2,
  BookOpen,
  Volume2,
  VolumeX,
  Stamp,
  MapPin,
  ShieldCheck,
  FileText,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { toParagraphs } from "@/lib/utils/format";
import type { LetterContent } from "@/types/letter";
import { withDefaults } from "../utils";

interface BirthdayPassportTemplateProps {
  data: LetterContent;
  className?: string;
}

const defaults: Record<string, string> = {
  recipientName: "Clarissa Valery Putri",
  passportNumber: "EXP-2026-BDAY25",
  nationality: "Citizen of the Universe // Heart of Gold",
  birthDate: "24 Oktober 2001 (Babak Usia ke-25)",
  birthPlace: "Jakarta, Indonesia // Terra Firm",
  issuingAuthority: "Ministry of Joy, Growth & Good Memories",
  bearerPhotoUrl:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
  passportTagline:
    "Diberikan hak penuh untuk mengarungi samudera waktu, memetik kebahagiaan di setiap pelabuhan, dan terus melangkah tanpa rasa takut.",

  visa1Country: "EXP-01 // WONDERLAND",
  visa1Title: "Visa of Innocence & Wonder",
  visa1Date: "ENTRY: MASA KECIL",
  visa1Desc:
    "Masa di mana imajinasi melangit tinggi, tawa mekar tanpa beban, dan setiap sudut dunia tampak penuh keajaiban.",

  visa2Country: "EXP-02 // ADVENTURE",
  visa2Title: "Visa of Courage & Exploration",
  visa2Date: "ENTRY: MASA REMAJA",
  visa2Desc:
    "Keberanian keluar dari zona nyaman, menjajal hal-hal baru, belajar dari kegagalan, dan merajut persahabatan sejati.",

  visa3Country: "EXP-03 // RESILIENCE",
  visa3Title: "Visa of Resilience & Growth",
  visa3Date: "ENTRY: DEWASA AWAL",
  visa3Desc:
    "Mengarungi badai kehidupan dengan keteguhan hati, membuktikan bahwa dirimu jauh lebih tangguh dari yang pernah kau bayangkan.",

  visa4Country: "EXP-04 // FUTURE VOYAGE",
  visa4Title: "Visa of Wisdom & New Horizon",
  visa4Date: "ENTRY: BABAK BARU",
  visa4Desc:
    "Memasuki babak baru dengan kebijaksanaan yang matang, ketenangan batin, dan optimisme tak terbatas menyongsong masa depan.",

  letterTitle: "Warkat Diplomatik: Catatan Terindah Bagi Rekan Seperjalanan",
  letterContent:
    "Kepada sang penjelajah luar biasa yang hari ini merayakan ulang tahunnya,\n\nHidup ini sejatinya adalah ekspedisi panjang yang penuh tikungan tak terduga, panorama menakjubkan, dan kadang kala cuaca berkabut yang menguji kesabaran. Namun memiliki seseorang sepertimu—yang senantiasa memancarkan kehangatan, kebaikan tulus, dan senyuman yang menyinari jalan—membuat setiap mil perjalanan terasa begitu berharga.\n\nMelihatmu tumbuh menapaki babak usia ke-25 adalah kehormatan tersendiri. Terima kasih telah menjadi teman berbagi tawa yang paling tulus, tempat berteduh di kala badai melanda, dan sosok yang tak pernah lelah menyebarkan energi positif kepada siapa pun di sekitarmu.\n\nDi babak baru ini, kiranya semesta membuka gerbang-gerbang petualangan terindah, menjauhkanmu dari segala marabahaya, dan menuntun langkah kakimu menuju destinasi impian yang paling kau dambakan. Selamat ulang tahun, sang pengelana sejati!",
  senderName: "Arya Bimasakti",
  senderTitle: "Chief of Expedition // Sahabat Seperjalanan Seumur Hidup",

  postcard1Photo:
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
  postcard1Location: "Kala Menatap Senja di Sudut Kota",
  postcard1Date: "Postmark // 14 Juli 2024",
  postcard1Note:
    "Secangkir kopi hangat, hembusan angin sejuk sore hari, dan percakapan panjang yang tak pernah kehabisan topik menyenangkan.",

  postcard2Photo:
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
  postcard2Location: "Puncak Bukit Penuh Gelak Tawa",
  postcard2Date: "Postmark // 28 Desember 2024",
  postcard2Note:
    "Tawa renyahmu di tengah lelahnya mendaki adalah bukti nyata bahwa kebahagiaan paling murni ada dalam kesederhanaan bersama.",

  postcard3Photo:
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
  postcard3Location: "Malam Perayaan Penuh Kenangan",
  postcard3Date: "Postmark // 05 Mei 2025",
  postcard3Note:
    "Momen ketika kita tersadar bahwa apa pun yang terjadi di dunia luar, kita selalu memiliki tempat yang hangat untuk pulang.",

  flightNumber: "AERO-BDAY25",
  seatNumber: "01A FIRST CLASS",
  departureChapter: "CHAPTER 24 (PASSED WITH GLORY)",
  arrivalChapter: "CHAPTER 25 (LIMITLESS JOY)",

  wish1Title: "Clear Skies: Ketenangan Jiwa",
  wish1Desc: "Semoga langit batinmu selalu dinaungi ketenangan dan bebas dari kabut kecemasan.",

  wish2Title: "Smooth Flight: Ketangguhan Batin",
  wish2Desc: "Setiap riak tantangan di masa depan dapat kau lalui dengan senyuman dan kepala tegak.",

  wish3Title: "First-Class Fortune: Kelimpahan Berkah",
  wish3Desc: "Pintu-pintu rezeki, karier, dan karya cemerlang terbuka lebar dalam babak usiamu saat ini.",

  wish4Title: "Golden Haven: Kasih yang Tulus",
  wish4Desc: "Selalu dipertemukan dengan orang-orang berhati tulus yang menyayangi dan menjagamu apa adanya.",

  primaryColor: "#0f1e36",
  accentColor: "#d4af37",
  backgroundColor: "#f1ede4",
  paperColor: "#faf8f2",
  textColor: "#1b2533",
  musicTitle: "In-Flight Bossa & Acoustic Voyage",
  musicUrl:
    "https://cdn.pixabay.com/download/audio/2022/05/16/audio_db6591201e.mp3?filename=acoustic-guitars-ambient-111163.mp3",
};

function BirthdayPassportTemplateInner({
  data,
  className,
}: BirthdayPassportTemplateProps) {
  const content = withDefaults(defaults, data);
  const pathname = usePathname();
  const isThumbnail = className?.includes("thumbnail") || false;

  // Interactivity
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [boarded, setBoarded] = useState(false);
  const [activeVisa, setActiveVisa] = useState<number | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleOpenPassport = () => {
    setIsOpen(true);
    if (audioRef.current && !isPlaying) {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const paragraphs = toParagraphs(content.letterContent);

  const visas = [
    {
      id: 1,
      country: content.visa1Country,
      title: content.visa1Title,
      date: content.visa1Date,
      desc: content.visa1Desc,
      borderColor: "border-red-700/80 text-red-800 bg-red-50/50",
      stampColor: "text-red-700 border-red-700",
    },
    {
      id: 2,
      country: content.visa2Country,
      title: content.visa2Title,
      date: content.visa2Date,
      desc: content.visa2Desc,
      borderColor: "border-blue-700/80 text-blue-800 bg-blue-50/50",
      stampColor: "text-blue-700 border-blue-700",
    },
    {
      id: 3,
      country: content.visa3Country,
      title: content.visa3Title,
      date: content.visa3Date,
      desc: content.visa3Desc,
      borderColor: "border-emerald-700/80 text-emerald-800 bg-emerald-50/50",
      stampColor: "text-emerald-700 border-emerald-700",
    },
    {
      id: 4,
      country: content.visa4Country,
      title: content.visa4Title,
      date: content.visa4Date,
      desc: content.visa4Desc,
      borderColor: "border-purple-700/80 text-purple-800 bg-purple-50/50",
      stampColor: "text-purple-700 border-purple-700",
    },
  ];

  const postcards = [
    {
      photo: content.postcard1Photo,
      location: content.postcard1Location,
      date: content.postcard1Date,
      note: content.postcard1Note,
    },
    {
      photo: content.postcard2Photo,
      location: content.postcard2Location,
      date: content.postcard2Date,
      note: content.postcard2Note,
    },
    {
      photo: content.postcard3Photo,
      location: content.postcard3Location,
      date: content.postcard3Date,
      note: content.postcard3Note,
    },
  ];

  const wishes = [
    { title: content.wish1Title, desc: content.wish1Desc },
    { title: content.wish2Title, desc: content.wish2Desc },
    { title: content.wish3Title, desc: content.wish3Desc },
    { title: content.wish4Title, desc: content.wish4Desc },
  ];

  // Generate MRZ Code Lines
  const mrzName = content.recipientName
    .toUpperCase()
    .replace(/[^A-Z]/g, "<")
    .padEnd(30, "<")
    .slice(0, 30);
  const mrzLine1 = `P<IDN${mrzName}`;
  const mrzLine2 = `${content.passportNumber.replace(/[^A-Z0-9]/g, "").slice(0, 9)}<4IDN0110245F2609218<<<<<<<<<<<<02`.slice(
    0,
    39
  );

  return (
    <div
      className={cn(
        "relative min-h-screen w-full overflow-x-hidden transition-colors duration-500 font-sans selection:bg-amber-200 selection:text-blue-950",
        className
      )}
      style={{
        backgroundColor: content.backgroundColor,
        color: content.textColor,
      }}
    >
      {/* Background Travel Desk Atmosphere */}
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 10% 20%, rgba(212, 175, 55, 0.08) 0%, transparent 40%), radial-gradient(circle at 90% 80%, rgba(15, 30, 54, 0.06) 0%, transparent 50%)`,
          }}
        />
        {/* Subtle Map / Grid Lines */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(to right, #0f1e3612 1px, transparent 1px), linear-gradient(to bottom, #0f1e3612 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Floating Travel Lounge Audio */}
      {content.musicUrl && !isThumbnail && pathname !== "/templates" && (
        <>
          <audio ref={audioRef} src={content.musicUrl} loop preload="none" />
          <div className="fixed bottom-6 right-6 z-50">
            <button
              type="button"
              onClick={toggleAudio}
              className="flex items-center gap-3 px-4 py-2 rounded-full border border-amber-500/40 bg-slate-900/90 text-amber-200 shadow-xl backdrop-blur-md hover:bg-slate-800 transition-all cursor-pointer"
              aria-label={isPlaying ? "Jeda musik travel" : "Putar musik travel"}
            >
              <div className="relative flex items-center justify-center">
                {isPlaying ? (
                  <>
                    <span className="absolute -inset-1 rounded-full bg-amber-400/30 animate-ping" />
                    <Volume2 className="h-4 w-4 text-amber-300" />
                  </>
                ) : (
                  <VolumeX className="h-4 w-4 text-slate-400" />
                )}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-[10px] uppercase font-mono tracking-widest text-slate-400">
                  {isPlaying ? "In-Flight Audio Playing" : "In-Flight Audio"}
                </p>
                <p className="text-xs font-semibold text-amber-100 max-w-[130px] truncate">
                  {content.musicTitle}
                </p>
              </div>
              {isPlaying ? (
                <Pause className="h-3.5 w-3.5 text-amber-300" />
              ) : (
                <Play className="h-3.5 w-3.5 text-amber-300 fill-amber-300" />
              )}
            </button>
          </div>
        </>
      )}

      {/* =================================================================== */}
      {/* 1. COVER: LEATHER PASSPORT JACKET WITH EMBOSSED GOLD              */}
      {/* =================================================================== */}
      {!isOpen && !isThumbnail ? (
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 text-center">
          <div
            className="relative w-full max-w-sm sm:max-w-md rounded-2xl p-8 sm:p-12 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] border-2 border-amber-400/40 transition-all duration-500"
            style={{ backgroundColor: content.primaryColor }}
          >
            {/* Leather Texture & Embossed Gold Foil Ornaments */}
            <div className="absolute inset-2 sm:inset-3 border border-amber-400/30 rounded-xl pointer-events-none" />
            <div className="absolute inset-3 sm:inset-4 border border-dashed border-amber-400/20 rounded-lg pointer-events-none" />

            <div className="space-y-6 relative z-10">
              {/* Header Gold Seal */}
              <div className="space-y-1">
                <p className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.3em] text-amber-300/80">
                  REPUBLIC OF WONDER & LIFE
                </p>
                <p className="font-serif text-xs italic text-amber-200/60">
                  Universal Travel Document
                </p>
              </div>

              {/* Passport Emblem / Monogram */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-full border-2 border-amber-400/60 flex items-center justify-center bg-amber-400/5 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-full border border-amber-400/40 flex flex-col items-center justify-center">
                  <Compass className="h-8 w-8 sm:h-10 sm:w-10 text-amber-300 animate-pulse" />
                  <span className="font-mono text-[9px] uppercase tracking-widest text-amber-300 pt-0.5">
                    EXPEDITION
                  </span>
                </div>
              </div>

              {/* Passport Title */}
              <div className="space-y-2">
                <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-[0.2em] text-amber-200 uppercase">
                  PASSPORT
                </h1>
                <div className="h-0.5 w-16 bg-amber-400/60 mx-auto" />
                <p className="font-mono text-xs uppercase tracking-widest text-amber-300/90 pt-1">
                  OFFICIAL BEARER
                </p>
                <p className="font-serif text-xl sm:text-2xl font-bold text-amber-100">
                  {content.recipientName}
                </p>
              </div>

              {/* Passport Number Stamp */}
              <div className="inline-block px-3 py-1 rounded border border-amber-400/30 bg-black/20 font-mono text-xs text-amber-300 tracking-widest">
                NO. {content.passportNumber}
              </div>

              {/* Open Passport Button */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleOpenPassport}
                  className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-mono text-xs uppercase tracking-widest font-bold text-slate-950 bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400 shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:shadow-[0_0_35px_rgba(212,175,55,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                >
                  <BookOpen className="h-4 w-4 text-slate-900 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Buka Paspor Penjelajah</span>
                  <Sparkles className="h-4 w-4 text-slate-900" />
                </button>
              </div>

              <p className="font-mono text-[9px] text-amber-300/60 uppercase tracking-widest">
                IMMIGRATION & TIME TRAVEL CLEARANCE
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* ================================================================= */
        /* 2. PASSPORT BOOK INTERIOR (PAGES & SECTIONS)                      */
        /* ================================================================= */
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-12 sm:space-y-16">
          {/* Passport Book Container */}
          <div
            className="rounded-2xl sm:rounded-3xl shadow-2xl border border-stone-300 overflow-hidden"
            style={{ backgroundColor: content.paperColor }}
          >
            {/* Top Passport Ribbon */}
            <div
              className="p-4 sm:p-5 flex items-center justify-between text-amber-200 text-xs font-mono tracking-widest border-b border-amber-500/30"
              style={{ backgroundColor: content.primaryColor }}
            >
              <div className="flex items-center gap-2">
                <Globe2 className="h-4 w-4 text-amber-400" />
                <span>EXPEDITION PASSPORT // OFFICIAL RECORD</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline text-amber-300/80">PAGE 01 - 05</span>
                <span className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 font-bold">
                  {content.passportNumber}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-10 space-y-12 sm:space-y-16">
              {/* =========================================================== */}
              {/* SEKSI 1: BIODATA PASPOR RESMI & MRZ CODE                    */}
              {/* =========================================================== */}
              <section className="space-y-6">
                <div className="border-b-2 border-stone-300 pb-3 flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-stone-800">
                    <ShieldCheck className="h-5 w-5 text-blue-900" />
                    <h2 className="font-serif font-bold text-xl sm:text-2xl text-stone-900 uppercase tracking-wider">
                      Identity & Biometrics
                    </h2>
                  </div>
                  <span className="font-mono text-xs text-stone-500">
                    AUTHORITY // MINISTRY OF JOY
                  </span>
                </div>

                {/* Passport Card Layout */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-stone-50 p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-inner">
                  {/* Photo Column */}
                  <div className="md:col-span-4 flex flex-col items-center space-y-3">
                    <div className="relative w-40 sm:w-44 aspect-[3/4] rounded-lg overflow-hidden border-2 border-stone-300 shadow-md bg-stone-200">
                      {content.bearerPhotoUrl ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={content.bearerPhotoUrl}
                          alt={content.recipientName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-stone-400 font-mono text-xs">
                          PHOTO UNAVAILABLE
                        </div>
                      )}
                      {/* Holographic Seal Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/10 via-transparent to-cyan-400/10 pointer-events-none" />
                      <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-blue-950/80 text-amber-300 font-mono text-[9px] tracking-wider">
                        VERIFIED
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-stone-500 tracking-widest uppercase">
                      BEARER SIGNATURE: CONFIRMED
                    </span>
                  </div>

                  {/* Biodata Fields Column */}
                  <div className="md:col-span-8 space-y-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs border-b border-stone-200 pb-4">
                      <div>
                        <p className="font-mono text-[10px] uppercase text-stone-400">
                          Tipe / Type
                        </p>
                        <p className="font-mono font-bold text-stone-800">P (PASSPORT)</p>
                      </div>
                      <div>
                        <p className="font-mono text-[10px] uppercase text-stone-400">
                          Kode Negara / Code
                        </p>
                        <p className="font-mono font-bold text-stone-800">IDN</p>
                      </div>
                      <div>
                        <p className="font-mono text-[10px] uppercase text-stone-400">
                          No. Paspor / Passport No.
                        </p>
                        <p className="font-mono font-bold text-blue-900">
                          {content.passportNumber}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3 text-xs">
                      <div>
                        <p className="font-mono text-[10px] uppercase text-stone-400">
                          Nama Pemilik / Bearer Full Name
                        </p>
                        <p className="font-serif font-bold text-lg text-stone-900">
                          {content.recipientName}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <p className="font-mono text-[10px] uppercase text-stone-400">
                            Kebangsaan / Nationality
                          </p>
                          <p className="font-sans font-semibold text-stone-800">
                            {content.nationality}
                          </p>
                        </div>
                        <div>
                          <p className="font-mono text-[10px] uppercase text-stone-400">
                            Tanggal Lahir / Date of Birth
                          </p>
                          <p className="font-sans font-semibold text-stone-800">
                            {content.birthDate}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <p className="font-mono text-[10px] uppercase text-stone-400">
                            Tempat Kelahiran / Place of Origin
                          </p>
                          <p className="font-sans text-stone-700">{content.birthPlace}</p>
                        </div>
                        <div>
                          <p className="font-mono text-[10px] uppercase text-stone-400">
                            Otoritas Penerbit / Issuing Authority
                          </p>
                          <p className="font-sans text-stone-700 truncate">
                            {content.issuingAuthority}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Passport Tagline */}
                    {content.passportTagline && (
                      <div className="p-3 rounded-lg bg-amber-50 border border-amber-200/80 text-amber-950 font-serif italic text-xs leading-relaxed">
                        &ldquo;{content.passportTagline}&rdquo;
                      </div>
                    )}
                  </div>
                </div>

                {/* MRZ Band (Machine Readable Zone) */}
                <div className="bg-stone-200/80 rounded-xl p-3 font-mono text-[11px] sm:text-xs text-stone-700 tracking-[0.2em] overflow-x-auto select-all border border-stone-300">
                  <p className="whitespace-pre">{mrzLine1}</p>
                  <p className="whitespace-pre">{mrzLine2}</p>
                </div>
              </section>

              {/* =========================================================== */}
              {/* SEKSI 2: 4 STEMPEL VISA PERJALANAN HIDUP                    */}
              {/* =========================================================== */}
              <section className="space-y-6">
                <div className="border-b-2 border-stone-300 pb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-stone-800">
                    <Stamp className="h-5 w-5 text-red-800" />
                    <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-900 uppercase tracking-wider">
                      Life Visas & Entry Stamps
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-stone-500">
                    4 IMMIGRATION SEALS
                  </span>
                </div>

                <p className="font-sans text-xs sm:text-sm text-stone-600">
                  Stempel visa resmi dari setiap fase perjalanan hidup yang telah berhasil diarungi dengan gemilang:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {visas.map((visa) => {
                    const isSelected = activeVisa === visa.id;
                    return (
                      <div
                        key={visa.id}
                        onClick={() => setActiveVisa(isSelected ? null : visa.id)}
                        className={cn(
                          "cursor-pointer rounded-2xl p-5 border-2 border-dashed transition-all duration-300 relative overflow-hidden backdrop-blur-sm",
                          visa.borderColor,
                          isSelected ? "scale-[1.02] shadow-md ring-2 ring-stone-400/40" : "hover:scale-[1.01]"
                        )}
                      >
                        {/* Stamp Header */}
                        <div className="flex items-center justify-between pb-2 border-b border-current/20">
                          <span className="font-mono text-xs font-bold tracking-widest uppercase">
                            {visa.country}
                          </span>
                          <span className="font-mono text-[10px] px-2 py-0.5 rounded border border-current font-semibold">
                            {visa.date}
                          </span>
                        </div>

                        <div className="pt-3 space-y-2">
                          <h4 className="font-serif font-bold text-base text-stone-900">
                            {visa.title}
                          </h4>
                          <p className="font-sans text-xs text-stone-700 leading-relaxed">
                            {visa.desc}
                          </p>
                        </div>

                        {/* Stamp Watermark Icon */}
                        <div className="mt-4 pt-2 border-t border-current/10 flex items-center justify-between text-[10px] font-mono">
                          <span>CLEARANCE: GRANTED</span>
                          <Check className="h-3.5 w-3.5" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* =========================================================== */}
              {/* SEKSI 3: THE DIPLOMATIC DISPATCH (SURAT UTAMA)              */}
              {/* =========================================================== */}
              <section className="space-y-6">
                <div className="border-b-2 border-stone-300 pb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-stone-800">
                    <FileText className="h-5 w-5 text-blue-900" />
                    <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-900 uppercase tracking-wider">
                      The Diplomatic Dispatch
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-stone-500">
                    OFFICIAL CORRESPONDENCE
                  </span>
                </div>

                <div className="bg-amber-50/40 p-6 sm:p-10 rounded-2xl border border-stone-300 shadow-sm relative">
                  {/* Decorative Header */}
                  <div className="text-center pb-6 border-b border-stone-300 space-y-1">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-stone-500">
                      MINISTRY OF TIME & FRIENDSHIP // DIPLOMATIC LETTER
                    </p>
                    <h4 className="font-serif font-bold text-xl sm:text-2xl text-stone-900">
                      {content.letterTitle}
                    </h4>
                  </div>

                  {/* Letter Body */}
                  <div className="py-6 space-y-4 font-serif text-sm sm:text-base text-stone-800 leading-relaxed">
                    {paragraphs.map((para, idx) => (
                      <p key={idx} className="text-justify sm:text-left">
                        {para}
                      </p>
                    ))}
                  </div>

                  {/* Signatures */}
                  <div className="pt-6 border-t border-stone-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <p className="font-mono text-[10px] uppercase tracking-widest text-stone-500">
                        Dipancarkan Dengan Kasih Oleh
                      </p>
                      <p className="font-serif font-bold text-lg text-blue-950">
                        {content.senderName}
                      </p>
                      <p className="font-sans text-xs text-stone-600">
                        {content.senderTitle}
                      </p>
                    </div>

                    <div className="px-4 py-2 rounded-xl border-2 border-dashed border-red-700/60 bg-red-50/50 text-red-800 text-center rotate-[-2deg]">
                      <p className="font-mono text-[10px] uppercase font-bold tracking-widest">
                        SEALED & DELIVERED
                      </p>
                      <p className="font-serif text-xs italic">With Endless Love</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* =========================================================== */}
              {/* SEKSI 4: 3 KARTU POS MEMORABILIA                            */}
              {/* =========================================================== */}
              <section className="space-y-6">
                <div className="border-b-2 border-stone-300 pb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-stone-800">
                    <MapPin className="h-5 w-5 text-amber-700" />
                    <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-900 uppercase tracking-wider">
                      Postcards from the Road
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-stone-500">
                    3 TRAVEL MEMOIRS
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {postcards.map((card, idx) => (
                    <div
                      key={idx}
                      className="bg-stone-50 rounded-2xl border border-stone-300 p-4 shadow-sm space-y-3 relative overflow-hidden"
                    >
                      {/* Air Mail Border Header */}
                      <div className="h-2 w-full bg-[repeating-linear-gradient(45deg,#dc2626,#dc2626_10px,#faf8f2_10px,#faf8f2_20px,#1d4ed8_20px,#1d4ed8_30px,#faf8f2_30px,#faf8f2_40px)] rounded-full opacity-80" />

                      {/* Photo */}
                      <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-200 border border-stone-300">
                        {card.photo ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={card.photo}
                            alt={card.location}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center font-mono text-xs text-stone-400">
                            PHOTO MEMOIR
                          </div>
                        )}
                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/60 text-white font-mono text-[9px]">
                          {card.date}
                        </div>
                      </div>

                      {/* Handwritten Style Memo */}
                      <div className="space-y-1 pt-1">
                        <p className="font-mono text-[10px] text-amber-800 font-bold uppercase tracking-wider">
                          {card.location}
                        </p>
                        <p className="font-serif italic text-xs text-stone-700 leading-relaxed">
                          &ldquo;{card.note}&rdquo;
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* =========================================================== */}
              {/* SEKSI 5: FIRST-CLASS BOARDING PASS TO THE NEXT MILESTONE    */}
              {/* =========================================================== */}
              <section className="space-y-6">
                <div className="border-b-2 border-stone-300 pb-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-stone-800">
                    <Plane className="h-5 w-5 text-blue-900" />
                    <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-900 uppercase tracking-wider">
                      First-Class Boarding Pass
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-stone-500">
                    AERO-BIRTHDAY VIP
                  </span>
                </div>

                {/* Boarding Pass Ticket */}
                <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-900 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-amber-400/50 relative overflow-hidden">
                  {/* Decorative Plane Watermark */}
                  <Plane className="absolute -right-8 -bottom-8 h-48 w-48 text-white/5 pointer-events-none" />

                  <div className="space-y-6 relative z-10">
                    {/* Ticket Header */}
                    <div className="flex flex-wrap items-center justify-between pb-4 border-b border-white/20 gap-2">
                      <div className="space-y-0.5">
                        <span className="font-mono text-[10px] tracking-widest text-amber-300 uppercase">
                          AERO-BIRTHDAY // SPECIAL CHARTER
                        </span>
                        <h4 className="font-serif font-bold text-xl text-amber-200">
                          BOARDING PASS: {content.recipientName}
                        </h4>
                      </div>
                      <div className="flex items-center gap-3 font-mono text-xs text-amber-300">
                        <span>FLIGHT: {content.flightNumber}</span>
                        <span className="px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 font-bold">
                          SEAT {content.seatNumber}
                        </span>
                      </div>
                    </div>

                    {/* Flight Route Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                      <div className="p-3.5 rounded-xl bg-white/10 border border-white/10 space-y-1">
                        <p className="text-amber-300 text-[10px] uppercase">
                          TITIK ASAL // DEPARTURE
                        </p>
                        <p className="font-serif font-bold text-sm text-white">
                          {content.departureChapter}
                        </p>
                        <p className="text-stone-300 text-[10px]">
                          Perjalanan Penuh Pencapaian & Pembelajaran
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl bg-white/10 border border-white/10 space-y-1">
                        <p className="text-emerald-300 text-[10px] uppercase">
                          DESTINASI TUJUAN // ARRIVAL
                        </p>
                        <p className="font-serif font-bold text-sm text-white">
                          {content.arrivalChapter}
                        </p>
                        <p className="text-stone-300 text-[10px]">
                          Babak Baru Penuh Harapan & Kebahagiaan
                        </p>
                      </div>
                    </div>

                    {/* 4 Arrival Blessings / Doa Destinasi */}
                    <div className="space-y-3 pt-2">
                      <p className="font-mono text-xs uppercase tracking-wider text-amber-300">
                        4 PILAR DOA DESTINASI PENERBANGAN
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {wishes.map((w, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-xl bg-black/25 border border-white/10 space-y-1"
                          >
                            <div className="flex items-center gap-2 text-amber-300 font-serif font-semibold text-xs">
                              <Sparkles className="h-3.5 w-3.5" />
                              <span>{w.title}</span>
                            </div>
                            <p className="font-sans text-[11px] text-stone-300 leading-relaxed">
                              {w.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Barcode Strip & Boarding Confirmation */}
                    <div className="pt-4 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="font-mono text-[10px] tracking-[0.3em] text-stone-400 select-all">
                        ||| | ||||| || |||||| | |||| ||| |||||||| | |||
                      </div>

                      <button
                        type="button"
                        onClick={() => setBoarded(!boarded)}
                        className={cn(
                          "px-6 py-2.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer",
                          boarded
                            ? "bg-emerald-400 text-slate-950 border border-emerald-300"
                            : "bg-amber-300 hover:bg-amber-200 text-slate-950"
                        )}
                      >
                        {boarded ? "✓ SIAP LEPAS LANDAS (CONFIRMED)" : "KONFIRMASI BOARDING TIKET →"}
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* =========================================================== */}
              {/* FOOTER: BAGIKAN PASPOR & PESAN PENUTUP                      */}
              {/* =========================================================== */}
              <footer className="border-t-2 border-stone-300 pt-8 text-center space-y-4">
                <div className="space-y-1">
                  <p className="font-serif italic text-stone-700 text-sm">
                    &ldquo;Semoga langkah kakimu senantiasa ringan, hatimu selalu tenang, dan dunia terus menyambutmu dengan penuh cinta.&rdquo;
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-stone-500">
                    THE BIRTHDAY PASSPORT EXPEDITION © 2026 // DITERBITKAN KHUSUS UNTUK {content.recipientName}
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-blue-900 bg-blue-950 text-amber-200 font-mono text-xs uppercase tracking-wider hover:bg-blue-900 transition-colors shadow-md cursor-pointer"
                  >
                    {copiedLink ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span>Tautan Paspor Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="h-3.5 w-3.5" />
                        <span>Bagikan Paspor Ulang Tahun Ini</span>
                      </>
                    )}
                  </button>
                </div>
              </footer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function BirthdayPassportTemplate({
  data,
  className,
}: BirthdayPassportTemplateProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f1ede4]" />}>
      <BirthdayPassportTemplateInner data={data} className={className} />
    </Suspense>
  );
}
