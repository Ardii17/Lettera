"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import {
  Heart,
  Pause,
  Play,
  Mail,
  Sparkles,
  Check,
  Copy,
  Feather,
  Disc,
  Lock,
  Unlock,
  Stamp,
  Compass,
  Clock,
  Ticket,
  Milestone,
  Music2,
  Hourglass,
  ArrowRight,
  Volume2,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { toParagraphs } from "@/lib/utils/format";
import type { LetterContent } from "@/types/letter";
import { withDefaults } from "../utils";

const defaults = {
  recipientName: "Adinda Kirana",
  senderName: "Bima Arya",
  postmarkCity: "Bandung, Jawa Barat",
  postmarkDate: "21 September 2024",
  sealInitials: "B & A",
  stampPhotoUrl:
    "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=400&q=80",
  loveAnniversary: "14 Februari 2022 • Hari Pertama Bertemu",
  title: "Sebuah Warkat Kasih Dari Lubuk Hati",
  salutation: "Kepada Pemilik Senyum yang Selalu Kurindukan,",
  letterLocation: "Ditulis dari sudut kedai kopi kenangan kita",
  message:
    "Dinda,\n\nAda rasa hangat yang selalu merayap ke dadaku setiap kali mengingat caramu tertawa. Di antara miliaran manusia yang berjalan di bumi, bertemu dan berjalan bersamamu adalah kebetulan terindah yang paling kusyukuri dalam hidup.\n\nSurat ini kutulis bukan hanya untuk merayakan hari-hari manis yang telah kita lewati, namun juga sebagai pengingat abadi bahwa di setiap langkah esok, ada sepasang mata yang selalu bangga melihatmu dan hati yang selalu mendoakan bahagiamu.\n\nTerima kasih telah menjadi rumah tempatku pulang, dan pelita di kala malam terasa gelap. Aku mencintaimu lebih dari apa yang sanggup dirangkum oleh kata-kata.",
  closingStatement: "Selamanya mengagumi dan menyayangimu,",
  signature: "Bima Arya",

  // 1. Jam Saku Antik (Pocket Watch Counter)
  anniversaryDate: "2022-02-14",
  counterSubtitle: "Detik demi detik bersamamu adalah anugerah terindah yang abadi",

  // 2. Piringan Hitam Vinyl Gramofon
  vinylSongTitle: "Can't Help Falling in Love",
  vinylArtist: "Elvis Presley • Side A Track 01",
  vinylSideNote: "Lagu yang selalu berputar di sanubari setiap kali mengingat senyummu.",

  // 3. Tiket Kereta / Bioskop Klasik
  ticketOrigin: "Pertemuan Pertama di Braga",
  ticketDestination: "Menua Bersama Selamanya",
  ticketDate: "Seumur Hidup & Tak Berujung",
  ticketSeat: "Gerbong Kasih No. 01 (VIP)",
  ticketNote: "Tiket sekali jalan menuju kebahagiaan abadi, berlaku tanpa batas masa.",

  // 4. Warta Berita Cinta (Vintage Herald Newspaper)
  newspaperHeadline: "WARGA GEMPAR: DUA HATI RESMI TERIKAT JANJI SUCI",
  newspaperSub: "Edisi Khusus Romansa • Terbit untuk Mengabadikan Kisah Terindah",
  newspaperDate: "Edisi Kenangan Abadi No. 781",
  newspaperBody:
    "Kabar bahagia mengudara ke seluruh pelosok. Dua insan yang ditakdirkan bersama telah mengukir komitmen suci. Setiap detik yang terlewati menjadi saksi betapa tulusnya cinta yang mereka bangun bersama. Menurut saksi mata, senyum bahagia keduanya merebak bagai musim semi abadi.",

  // 5. Jejak Babak Kasih (4 Chapters Chronicles)
  chapter1Title: "Babak I: Pertemuan Pertama",
  chapter1Year: "14 Februari 2022",
  chapter1Story:
    "Hari di mana tatap mata kita pertama kali bersirobok di kedai kopi itu. Senyum manismu seketika mengubah duniaku menjadi jauh lebih hangat dan berwarna.",

  chapter2Title: "Babak II: Mengikat Janji Kasih",
  chapter2Year: "21 September 2022",
  chapter2Story:
    "Di bawah temaram lampu kota, dua hati akhirnya berani saling mengakui dan berjanji untuk saling menggenggam tangan dalam setiap langkah ke depan.",

  chapter3Title: "Babak III: Badai yang Kita Lewati",
  chapter3Year: "Tahun 2023",
  chapter3Story:
    "Tak selamanya langit cerah, namun setiap kerikil dan badai justru membuktikan betapa kokohnya bahu kita untuk saling bersandar.",

  chapter4Title: "Babak IV: Menua Bersama",
  chapter4Year: "Hari Ini & Selamanya",
  chapter4Story:
    "Kini hingga rambut memutih dan langkah melambat, tanganku akan tetap erat menggenggam tanganmu dengan cinta yang tak pernah berkurang sedikit pun.",

  // 6. Telegram Kilat Mesin Tik
  telegramMessage:
    "BERITA KILAT STOP DUA HATI TELAH RESMI BERPADU STOP TIDAK ADA YANG BISA MEMISAHKAN KITA LAGI STOP TERIMA KASIH TELAH MEMILIHKU STOP SAYANG KAMU SELALU STOP",

  // Foto, Catatan Rahasia & Janji
  photoUrl:
    "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1000&q=80",
  photoCaption: "Kenangan senja saat kita berjanji untuk saling menjaga selamanya.",
  photo2Url:
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1000&q=80",
  photo2Caption: "Tawa lepas di tepi pantai saat kita menyusuri ombak berdua.",
  secretNoteTitle: "Bisikan Rahasia untuk Hatimu ✨",
  secretNoteContent:
    "Jika suatu saat dunia terasa terlalu bising dan melelahkan, ingatlah bahwa kamu tidak pernah sendirian. Genggam tanganku, dan kita akan lalui semuanya bersama-sama.",
  promisesTitle: "Tiga Janji Setia untuk Hari Esok",
  promise1: "Selalu mendengarkan ceritamu dengan penuh ketulusan di setiap hari lelahmu.",
  promise2: "Menjadi tempat pulang yang paling aman dan menghangatkan hatimu.",
  promise3: "Terus memilihmu dan mencintaimu dalam setiap babak perjalanan kita.",

  // Tema & Musik
  primaryColor: "#781d2f",
  backgroundColor: "#f6f1ea",
  cardColor: "#fffdf9",
  textColor: "#3e1b24",
  bodyTextColor: "#4a3b32",
  musicTitle: "",
  bgMusicUrl: "",
};

interface VintageLoveTemplateProps {
  data: LetterContent;
  className?: string;
}

function VintageLoveTemplateInner({ data, className }: VintageLoveTemplateProps) {
  const content = withDefaults(defaults, data);
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Mode Thumbnail atau Katalog /templates: TIDAK PERNAH menampilkan modal/popup fixed
  const isThumbnail =
    Boolean(data._isThumbnail) ||
    pathname === "/templates" ||
    className?.includes("is-thumbnail") ||
    className?.includes("thumb");

  // Mode Editor Side Preview: ditampilkan langsung terbuka agar mudah mengedit form
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

  // Nama penerima
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

  // Status amplop terbuka/tertutup
  const [isOpened, setIsOpened] = useState<boolean>(!shouldStartClosed);

  // Status catatan rahasia terbuka/tertutup
  const [isSecretRevealed, setIsSecretRevealed] = useState<boolean>(false);

  // Audio Musik Pengiring
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

  const handleOpenLetter = () => {
    setIsOpened(true);

    if (content.bgMusicUrl && audioRef.current && !isThumbnail && pathname !== "/templates") {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          // Autoplay dicegah browser
        });
    }

    setTimeout(() => {
      const target = document.getElementById("vintage-letter-sheet");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }, 250);
  };

  // State Salin Tautan
  const [copiedLink, setCopiedLink] = useState(false);
  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Hitungan Waktu Jam Saku Real-Time
  const [elapsed, setElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const rawDate = content.anniversaryDate || "2022-02-14";
    const calculateTime = () => {
      const startTime = new Date(rawDate).getTime();
      if (isNaN(startTime)) return;
      const now = Date.now();
      const diff = Math.max(0, now - startTime);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setElapsed({ days, hours, minutes, seconds });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [content.anniversaryDate]);

  const paragraphs = toParagraphs(content.message);

  // Palet warna dinamis
  const primary = content.primaryColor || "#781d2f";
  const bg = content.backgroundColor || "#f6f1ea";
  const card = content.cardColor || "#fffdf9";
  const textColor = content.textColor || "#3e1b24";
  const bodyText = content.bodyTextColor || "#4a3b32";

  return (
    <div
      className={cn("relative min-h-screen font-sans selection:bg-rose-100", className)}
      style={{ backgroundColor: bg, color: bodyText }}
    >
      {/* Audio Elemen Tersembunyi */}
      {!isThumbnail && pathname !== "/templates" && content.bgMusicUrl && (
        <audio ref={audioRef} src={content.bgMusicUrl} loop preload="none" />
      )}

      {/* Floating Vinyl Music Button */}
      {!isThumbnail &&
        !isEditorPreview &&
        pathname !== "/templates" &&
        (isPublicLetter || isFullPreview || isDetailPage) &&
        content.bgMusicUrl &&
        isOpened && (
          <button
            type="button"
            onClick={toggleMusic}
            className="fixed right-5 bottom-6 z-40 flex items-center gap-2 rounded-full border border-white/40 px-3.5 py-2.5 shadow-2xl backdrop-blur-md transition-all hover:scale-105 active:scale-95"
            style={{ backgroundColor: primary, color: "#ffffff" }}
            aria-label={isPlaying ? "Jeda musik" : "Putar musik"}
          >
            <Disc className={cn("h-5 w-5", isPlaying && "animate-spin")} />
            <span className="text-xs font-semibold pr-1">
              {isPlaying ? "Memutar Melodi Kasih" : "Putar Musik"}
            </span>
            {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          </button>
        )}

      {/* ========================================================================= */}
      {/* 1. AMPLOP KLASIK BERSEGEL LILIN (HERO / COVER) */}
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
          background: `radial-gradient(ellipse at center, ${primary}15 0%, ${bg} 100%)`,
        }}
      >
        <div className="relative z-10 mx-auto flex w-full max-w-lg flex-col items-center space-y-6">
          {/* Header Air Mail / Cap Pos Klasik */}
          <div className="inline-flex items-center gap-2 rounded-full border border-stone-300/80 bg-white/70 px-4 py-1.5 text-[11px] font-semibold tracking-widest uppercase text-stone-600 backdrop-blur-sm shadow-sm">
            <Compass className="h-3.5 w-3.5 text-stone-500 animate-[spin_20s_linear_infinite]" />
            <span>Warkat Pos Kasih &bull; Par Avion</span>
          </div>

          {/* Kartu Amplop Vintage Retro */}
          <div
            className="relative w-full rounded-2xl border-2 p-6 sm:p-8 text-left shadow-2xl backdrop-blur-md overflow-hidden transition-all duration-500 hover:shadow-3xl"
            style={{
              backgroundColor: card,
              borderColor: `${primary}35`,
            }}
          >
            {/* Garis batas ornamen retro tepi atas */}
            <div
              className="absolute top-0 left-0 right-0 h-2 bg-repeat-x opacity-70"
              style={{
                background: `repeating-linear-gradient(45deg, ${primary}, ${primary} 12px, #ffffff 12px, #ffffff 18px, #29406b 18px, #29406b 30px, #ffffff 30px, #ffffff 36px)`,
              }}
            />

            {/* Baris Atas: Prangko Vintage & Cap Pos */}
            <div className="mt-2 flex items-start justify-between border-b border-stone-200/80 pb-5">
              {/* Cap Pos Tanggal & Kota */}
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-stone-500">
                  <Stamp className="h-4 w-4" style={{ color: primary }} />
                  <span>{content.postmarkCity || "Cap Pos Kenangan"}</span>
                </div>
                <p className="font-serif text-sm italic text-stone-700">
                  {content.postmarkDate || "21 September 2024"}
                </p>
                {content.loveAnniversary && (
                  <div className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-rose-50/90 px-2.5 py-0.5 text-[10px] font-medium text-stone-700 border border-rose-200/60">
                    <Heart className="h-2.5 w-2.5 fill-rose-500 text-rose-500 animate-pulse" />
                    <span>{content.loveAnniversary}</span>
                  </div>
                )}
              </div>

              {/* Prangko Kertas Vintage dengan Foto Pasangan */}
              <div
                className="group relative flex h-20 w-16 shrink-0 flex-col items-center justify-between rounded border-2 border-dashed bg-rose-50/90 p-1 text-center shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:rotate-2"
                style={{ borderColor: primary }}
              >
                {content.stampPhotoUrl ? (
                  <>
                    <div className="relative h-12 w-full overflow-hidden rounded bg-stone-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={content.stampPhotoUrl}
                        alt="Prangko Cinta"
                        className="h-full w-full object-cover sepia-[0.2]"
                      />
                    </div>
                    <div className="flex w-full items-center justify-between px-0.5 pt-0.5 text-[8px] font-bold tracking-tighter uppercase text-stone-700">
                      <span>POS</span>
                      <Heart className="h-2 w-2 fill-current text-rose-600" />
                      <span>LOVE</span>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <Heart className="h-5 w-5 fill-current animate-pulse" style={{ color: primary }} />
                    <span className="mt-1 text-[9px] font-bold tracking-tighter uppercase text-stone-700">
                      Love 1984
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Nama Penerima (Kepada) */}
            <div className="my-6 space-y-1">
              <p className="text-[11px] font-medium tracking-widest uppercase text-stone-400">
                Tertuju Untuk Kekasih Hati:
              </p>
              <h2
                className="font-serif text-3xl font-bold tracking-wide sm:text-4xl"
                style={{ color: textColor }}
              >
                {recipientName}
              </h2>
              <p className="text-xs text-stone-500 pt-0.5">
                Pengirim: <span className="font-semibold text-stone-800">{content.senderName}</span>
              </p>
            </div>

            {/* Segel Lilin 3D (Wax Seal) */}
            <div className="flex flex-col items-center justify-center pt-2 pb-2">
              <div
                className="group relative flex h-24 w-24 items-center justify-center rounded-full shadow-2xl border-4 border-amber-900/20 transition-all duration-500 hover:rotate-6 hover:scale-105"
                style={{
                  backgroundColor: primary,
                  boxShadow: `0 10px 25px -5px ${primary}80, inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -3px 6px rgba(0,0,0,0.5)`,
                }}
              >
                {/* Garis Lingkar Cap Segel */}
                <div className="absolute inset-2 rounded-full border border-white/30 flex items-center justify-center">
                  <div className="text-center px-1">
                    <span className="font-serif text-lg font-extrabold tracking-wider text-amber-100 drop-shadow">
                      {content.sealInitials || "B & A"}
                    </span>
                    <p className="text-[7px] tracking-widest uppercase text-amber-200/90 font-medium">
                      With Love
                    </p>
                  </div>
                </div>
              </div>

              {/* Tombol Interaktif Buka Amplop */}
              {isThumbnail ? (
                <div
                  className="mt-5 inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-xs font-semibold text-white shadow"
                  style={{ backgroundColor: primary }}
                >
                  <Feather className="h-3.5 w-3.5" />
                  <span>Surat Cinta Vintage</span>
                </div>
              ) : !isOpened ? (
                <button
                  type="button"
                  onClick={handleOpenLetter}
                  className="mt-6 inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 text-sm font-semibold tracking-wide text-white shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 animate-bounce"
                  style={{ backgroundColor: primary }}
                >
                  <Mail className="h-4 w-4" />
                  <span>Buka Surat Cinta Ini</span>
                </button>
              ) : (
                <div
                  className="mt-4 flex items-center justify-center gap-1.5 text-xs font-semibold"
                  style={{ color: primary }}
                >
                  <Sparkles className="h-4 w-4 animate-spin" />
                  <span>Segel Telah Terbuka</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. LEMBARAN SURAT & FITUR-FITUR NOSTALGIA MEWAH */}
      {/* ========================================================================= */}
      <div
        id="vintage-letter-sheet"
        className="mx-auto max-w-3xl px-4 py-12 sm:px-6 space-y-16"
      >
        {/* ======================================================================= */}
        {/* MODULE 1: LEMBARAN SURAT PERKAMEN UTAMA */}
        {/* ======================================================================= */}
        <article
          className="relative rounded-3xl border-2 px-5 py-8 sm:px-12 sm:py-14 pb-16 sm:pb-24 shadow-2xl space-y-8 backdrop-blur-sm transition-all overflow-hidden"
          style={{
            backgroundColor: card,
            borderColor: `${primary}30`,
          }}
        >
          {/* Ornamen Tepi Ganda Halus */}
          <div
            className="pointer-events-none absolute inset-3 sm:inset-5 rounded-2xl border border-dashed opacity-40"
            style={{ borderColor: primary }}
          />

          {/* Tajuk Surat */}
          <header className="space-y-4 border-b border-stone-200/80 pb-6 text-center">
            <div className="flex items-center justify-center gap-2 text-stone-400">
              <span className="h-px w-12 bg-stone-300" />
              <Heart className="h-4 w-4 fill-current animate-pulse" style={{ color: primary }} />
              <span className="h-px w-12 bg-stone-300" />
            </div>

            <h1
              className="font-serif text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl"
              style={{ color: textColor }}
            >
              {content.title}
            </h1>

            <p className="font-serif text-base italic text-stone-600 sm:text-lg">
              {content.salutation}
            </p>

            {content.letterLocation && (
              <div className="inline-flex items-center gap-1.5 text-xs text-stone-500 italic pt-1">
                <Compass className="h-3.5 w-3.5 text-stone-400" />
                <span>{content.letterLocation}</span>
              </div>
            )}
          </header>

          {/* Paragraf Surat Cinta Utama */}
          <div className="space-y-6 font-serif text-base sm:text-lg leading-relaxed sm:leading-loose text-stone-800">
            {paragraphs.map((para, idx) => (
              <p key={idx} className="indent-6 sm:indent-8">
                {para}
              </p>
            ))}
          </div>

          {/* Foto Kenangan Analog / Vintage Photo Frames */}
          {(content.photoUrl || content.photo2Url) && (
            <div className="my-10">
              {content.photoUrl && content.photo2Url ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 items-center max-w-2xl mx-auto">
                  {/* Foto 1 */}
                  <div
                    className="group rounded-2xl border-4 bg-white p-3.5 shadow-lg transition-all duration-300 hover:-rotate-2 hover:scale-[1.02]"
                    style={{ borderColor: "#ece5dd" }}
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-stone-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={content.photoUrl}
                        alt={content.photoCaption || "Foto kenangan 1"}
                        className="h-full w-full object-cover sepia-[0.15] contrast-[1.05] transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    {content.photoCaption && (
                      <p className="mt-2.5 text-center font-serif text-xs italic text-stone-600">
                        &ldquo;{content.photoCaption}&rdquo;
                      </p>
                    )}
                  </div>

                  {/* Foto 2 */}
                  <div
                    className="group rounded-2xl border-4 bg-white p-3.5 shadow-lg transition-all duration-300 hover:rotate-2 hover:scale-[1.02]"
                    style={{ borderColor: "#ece5dd" }}
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-stone-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={content.photo2Url}
                        alt={content.photo2Caption || "Foto kenangan 2"}
                        className="h-full w-full object-cover sepia-[0.15] contrast-[1.05] transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    {content.photo2Caption && (
                      <p className="mt-2.5 text-center font-serif text-xs italic text-stone-600">
                        &ldquo;{content.photo2Caption}&rdquo;
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <div
                    className="w-full max-w-md rounded-2xl border-4 bg-white p-4 shadow-lg transition-transform hover:rotate-1 duration-300"
                    style={{ borderColor: "#ece5dd" }}
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-stone-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={content.photoUrl || content.photo2Url}
                        alt={content.photoCaption || content.photo2Caption || "Foto kenangan berdua"}
                        className="h-full w-full object-cover sepia-[0.15] contrast-[1.05]"
                      />
                    </div>
                    {(content.photoCaption || content.photo2Caption) && (
                      <p className="mt-3 text-center font-serif text-xs italic text-stone-600 sm:text-sm">
                        &ldquo;{content.photoCaption || content.photo2Caption}&rdquo;
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Penutup & Tanda Tangan Kaligrafi */}
          <footer className="border-t border-stone-200/80 pt-6 sm:pt-8 text-right space-y-1.5 pb-2 pr-2 sm:pr-4">
            <p className="font-serif text-xs sm:text-sm italic text-stone-500">
              {content.closingStatement || "Selamanya mengagumi dan menyayangimu,"}
            </p>
            <p className="font-serif text-xl sm:text-3xl font-bold tracking-wide break-words" style={{ color: textColor }}>
              {content.signature}
            </p>
          </footer>
        </article>

        {/* ======================================================================= */}
        {/* MODULE 2: JAM SAKU ANTIK (POCKET WATCH REAL-TIME LOVE COUNTER) */}
        {/* ======================================================================= */}
        <section
          className="relative overflow-hidden rounded-3xl border-2 p-6 sm:p-10 shadow-xl transition-all duration-300"
          style={{
            backgroundColor: card,
            borderColor: `${primary}35`,
          }}
        >
          {/* Ornamen Ring Jam Saku di Atas */}
          <div className="flex justify-center -mt-3 mb-4">
            <div className="flex flex-col items-center">
              <div
                className="h-7 w-12 rounded-t-full border-4 border-b-0 shadow-inner"
                style={{ borderColor: primary }}
              />
              <div
                className="h-2 w-5 rounded-full"
                style={{ backgroundColor: primary }}
              />
            </div>
          </div>

          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-stone-500">
              <Clock className="h-4 w-4 animate-[spin_10s_linear_infinite]" style={{ color: primary }} />
              <span>Jam Saku Waktu Abadi</span>
            </div>
            <h3
              className="font-serif text-2xl sm:text-3xl font-bold"
              style={{ color: textColor }}
            >
              Menghitung Setiap Detik Bersamamu
            </h3>
            <p className="text-xs sm:text-sm font-serif italic text-stone-500 max-w-md mx-auto">
              {content.counterSubtitle || "Detik demi detik bersamamu adalah anugerah terindah"}
            </p>
          </div>

          {/* Grid Ticker Jam Saku */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-xl mx-auto">
            {/* Hari */}
            <div
              className="flex flex-col items-center justify-center rounded-2xl border p-4 shadow-inner backdrop-blur-sm transition-transform hover:scale-105"
              style={{
                backgroundColor: `${primary}08`,
                borderColor: `${primary}25`,
              }}
            >
              <span
                className="font-serif text-3xl sm:text-4xl font-black tracking-tight"
                style={{ color: primary }}
              >
                {elapsed.days}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-stone-500 mt-1">
                Hari
              </span>
            </div>

            {/* Jam */}
            <div
              className="flex flex-col items-center justify-center rounded-2xl border p-4 shadow-inner backdrop-blur-sm transition-transform hover:scale-105"
              style={{
                backgroundColor: `${primary}08`,
                borderColor: `${primary}25`,
              }}
            >
              <span
                className="font-serif text-3xl sm:text-4xl font-black tracking-tight"
                style={{ color: primary }}
              >
                {String(elapsed.hours).padStart(2, "0")}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-stone-500 mt-1">
                Jam
              </span>
            </div>

            {/* Menit */}
            <div
              className="flex flex-col items-center justify-center rounded-2xl border p-4 shadow-inner backdrop-blur-sm transition-transform hover:scale-105"
              style={{
                backgroundColor: `${primary}08`,
                borderColor: `${primary}25`,
              }}
            >
              <span
                className="font-serif text-3xl sm:text-4xl font-black tracking-tight"
                style={{ color: primary }}
              >
                {String(elapsed.minutes).padStart(2, "0")}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-stone-500 mt-1">
                Menit
              </span>
            </div>

            {/* Detik (dengan efek denyut live) */}
            <div
              className="relative flex flex-col items-center justify-center rounded-2xl border p-4 shadow-inner backdrop-blur-sm transition-transform hover:scale-105"
              style={{
                backgroundColor: `${primary}12`,
                borderColor: `${primary}35`,
              }}
            >
              <span
                className="font-serif text-3xl sm:text-4xl font-black tracking-tight animate-pulse"
                style={{ color: primary }}
              >
                {String(elapsed.seconds).padStart(2, "0")}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-stone-500 mt-1 flex items-center gap-1">
                <span>Detik</span>
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
              </span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-stone-400">
              <Hourglass className="h-3 w-3" />
              <span>Sejak {content.anniversaryDate || "14 Februari 2022"} &bull; Waktu cinta terus bergulir</span>
            </span>
          </div>
        </section>

        {/* ======================================================================= */}
        {/* MODULE 3: PIRINGAN HITAM VINYL GRAMOFON (INTERACTIVE TURNTABLE) */}
        {/* ======================================================================= */}
        {Boolean(content.bgMusicUrl) && (
          <section
            className="relative overflow-hidden rounded-3xl border-2 p-6 sm:p-10 shadow-xl transition-all"
            style={{
              backgroundColor: card,
              borderColor: `${primary}35`,
            }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* Sisi Kiri: Piringan Hitam Vinyl Realistis dengan Alur Jarum */}
              <div className="relative flex items-center justify-center shrink-0">
                {/* Piringan Hitam Berputar */}
                <div
                  className={cn(
                    "relative h-48 w-48 sm:h-56 sm:w-56 rounded-full border-4 border-stone-800 shadow-2xl flex items-center justify-center transition-all duration-700",
                    isPlaying ? "animate-[spin_4s_linear_infinite]" : "rotate-12",
                  )}
                  style={{
                    background:
                      "radial-gradient(circle, #1a1a1a 0%, #2a2a2a 20%, #111111 40%, #262626 60%, #0d0d0d 80%, #222222 100%)",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.4), inset 0 0 15px rgba(255,255,255,0.1)",
                  }}
                >
                  {/* Garis Alur Vinyl (Grooves) */}
                  <div className="absolute inset-4 rounded-full border border-stone-700/40 pointer-events-none" />
                  <div className="absolute inset-8 rounded-full border border-stone-700/30 pointer-events-none" />
                  <div className="absolute inset-12 rounded-full border border-stone-700/40 pointer-events-none" />

                  {/* Label Tengah Vinyl (Vintage Center Label) */}
                  <div
                    className="relative h-20 w-20 sm:h-22 sm:w-22 rounded-full border-2 border-stone-800 flex flex-col items-center justify-center p-2 text-center shadow-lg"
                    style={{ backgroundColor: primary }}
                  >
                    <Heart className="h-4 w-4 fill-white text-white mb-0.5 animate-pulse" />
                    <span className="text-[8px] font-bold tracking-wider uppercase text-white/90">
                      SIDE A
                    </span>
                    <span className="text-[7px] font-serif italic text-amber-100/90 truncate max-w-[65px]">
                      {content.recipientName}
                    </span>
                    {/* Lubang Spindle */}
                    <div className="mt-1 h-3 w-3 rounded-full bg-stone-900 border border-amber-200/50 shadow-inner" />
                  </div>
                </div>

                {/* Jarum Gramofon (Tonearm) */}
                <div
                  className={cn(
                    "absolute -top-3 -right-2 w-14 h-24 origin-top transition-transform duration-700 pointer-events-none z-10",
                    isPlaying ? "rotate-[28deg]" : "rotate-0",
                  )}
                >
                  <div className="h-4 w-4 rounded-full bg-amber-700 border-2 border-amber-900 shadow-md" />
                  <div className="h-20 w-1.5 bg-gradient-to-b from-stone-400 to-stone-600 rounded-full mx-auto -mt-1 shadow" />
                  <div className="h-4 w-3 bg-amber-800 rounded-sm mx-auto -mt-1 shadow-sm" />
                </div>
              </div>

              {/* Sisi Kanan: Detail Lagu & Kontrol Putar */}
              <div className="flex-1 text-center md:text-left space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-600">
                  <Music2 className="h-3.5 w-3.5" style={{ color: primary }} />
                  <span>Piringan Hitam Nostalgia</span>
                </div>

                <div className="space-y-1">
                  <h3
                    className="font-serif text-2xl sm:text-3xl font-bold tracking-wide"
                    style={{ color: textColor }}
                  >
                    {content.vinylSongTitle || "Can't Help Falling in Love"}
                  </h3>
                  <p className="font-serif text-sm italic text-stone-600">
                    {content.vinylArtist || "Elvis Presley • Side A Track 01"}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-serif">
                  &ldquo;{content.vinylSideNote || "Lagu yang selalu berputar di sanubari setiap kali mengingat senyummu."}&rdquo;
                </p>

                {/* Tombol Interaktif Putar / Jeda */}
                <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <button
                    type="button"
                    onClick={toggleMusic}
                    className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                    style={{ backgroundColor: primary }}
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="h-4 w-4" />
                        <span>Jeda Putaran Vinyl</span>
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4" />
                        <span>Putar Piringan Hitam</span>
                      </>
                    )}
                  </button>

                  <span className="text-[11px] font-mono text-stone-400 flex items-center gap-1">
                    <Volume2 className="h-3.5 w-3.5" />
                    <span>33 ⅓ RPM Hi-Fi Sound</span>
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ======================================================================= */}
        {/* MODULE 4: TIKET KERETA / BIOSKOP KLASIK (VINTAGE EXPRESS TICKET) */}
        {/* ======================================================================= */}
        <section
          className="relative overflow-hidden rounded-3xl border-2 shadow-xl"
          style={{
            backgroundColor: card,
            borderColor: `${primary}35`,
          }}
        >
          {/* Pola Baris Tiket Berlubang (Perforated Edge Stub) */}
          <div className="relative p-6 sm:p-8">
            {/* Header Tiket */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-dashed border-stone-300 pb-4">
              <div className="flex items-center gap-2">
                <Ticket className="h-5 w-5" style={{ color: primary }} />
                <span className="font-serif text-xs sm:text-sm font-bold tracking-widest uppercase text-stone-700">
                  L&apos;Express d&apos;Amour &bull; Tiket Perjalanan Cinta
                </span>
              </div>
              <span className="rounded bg-rose-100/80 px-2 py-0.5 font-mono text-[10px] font-bold text-rose-900 border border-rose-200">
                № 781-LOVE-99
              </span>
            </div>

            {/* Rute Perjalanan Tiket (Origin -> Destination) */}
            <div className="my-6 grid grid-cols-1 sm:grid-cols-3 items-center gap-4 text-center sm:text-left">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                  Titik Berangkat (Origin)
                </span>
                <p className="font-serif text-lg font-bold sm:text-xl" style={{ color: textColor }}>
                  {content.ticketOrigin || "Pertemuan Pertama"}
                </p>
                <span className="text-xs text-stone-500 font-serif italic">Stasiun Awal Rasa</span>
              </div>

              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center gap-1 text-stone-300">
                  <span className="h-px w-8 bg-stone-300" />
                  <Heart className="h-4 w-4 fill-current animate-pulse" style={{ color: primary }} />
                  <ArrowRight className="h-4 w-4 text-stone-400" />
                  <span className="h-px w-8 bg-stone-300" />
                </div>
                <span className="mt-1 text-[9px] font-bold uppercase tracking-widest text-stone-400">
                  Non-Stop Journey
                </span>
              </div>

              <div className="sm:text-right">
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                  Tujuan Akhir (Destination)
                </span>
                <p className="font-serif text-lg font-bold sm:text-xl" style={{ color: textColor }}>
                  {content.ticketDestination || "Menua Bersama Selamanya"}
                </p>
                <span className="text-xs text-stone-500 font-serif italic">Hingga Akhir Waktu</span>
              </div>
            </div>

            {/* Info Kursi & Masa Berlaku */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 border-t-2 border-dashed border-stone-300 pt-4 text-xs font-mono">
              <div>
                <span className="text-stone-400 text-[10px] block">NOMOR KURSI</span>
                <span className="font-bold text-stone-700">{content.ticketSeat || "Gerbong Kasih No. 01"}</span>
              </div>
              <div>
                <span className="text-stone-400 text-[10px] block">MASA BERLAKU</span>
                <span className="font-bold text-stone-700">{content.ticketDate || "Seumur Hidup"}</span>
              </div>
              <div className="col-span-2 sm:col-span-1 text-left sm:text-right">
                <span className="text-stone-400 text-[10px] block">STATUS</span>
                <span className="font-bold uppercase tracking-wider" style={{ color: primary }}>
                  TERKONFIRMASI ABADI
                </span>
              </div>
            </div>

            {/* Pesan Kecil Tiket */}
            <p className="mt-4 text-center font-serif text-xs italic text-stone-500 max-w-md mx-auto">
              &ldquo;{content.ticketNote || "Tiket sekali jalan menuju kebahagiaan abadi, berlaku tanpa batas masa."}&rdquo;
            </p>

            {/* Cap Stempel Validasi Vintage */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-200 pt-4">
              {/* Garis Barcode Simulasi */}
              <div className="flex items-center gap-1 h-8 opacity-60">
                {[4, 2, 6, 1, 3, 5, 2, 7, 3, 1, 4, 8, 2, 5, 3, 6, 2, 4, 1, 5].map((w, i) => (
                  <span
                    key={i}
                    className="h-full bg-stone-700 inline-block"
                    style={{ width: `${w}px` }}
                  />
                ))}
              </div>

              {/* Stempel Bergaris Merah */}
              <div
                className="rotate-[-4deg] rounded-lg border-2 border-dashed px-3 py-1 text-center font-mono text-[10px] font-black uppercase tracking-widest shadow-sm transition-transform hover:rotate-0"
                style={{
                  borderColor: primary,
                  color: primary,
                }}
              >
                ★ RESMI DIVALIDASI OLEH TAKDIR ★
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================================= */}
        {/* MODULE 5: WARTA BERITA CINTA (VINTAGE DAILY HERALD NEWSPAPER) */}
        {/* ======================================================================= */}
        <section
          className="relative overflow-hidden rounded-3xl border-2 p-6 sm:p-10 shadow-xl transition-all"
          style={{
            backgroundColor: "#f5eee4",
            borderColor: `${primary}35`,
          }}
        >
          {/* Header Koran Klasik / Masthead */}
          <div className="border-b-4 border-double border-stone-800 pb-3 text-center space-y-1">
            <div className="flex items-center justify-between text-[9px] font-serif uppercase tracking-widest text-stone-600 border-b border-stone-400 pb-1">
              <span>VOL. LXXVIII NO. 14</span>
              <span>{content.newspaperDate || "Edisi Kenangan Abadi"}</span>
              <span>HARGA: KETULUSAN HATI</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-black tracking-tight text-stone-900 uppercase">
              The Daily Romance
            </h2>
            <p className="text-[10px] sm:text-xs font-serif italic text-stone-700">
              Warta Kabar Terhangat Seputar Cinta, Kasih, dan Kesetiaan Sejati
            </p>
          </div>

          {/* Headline Berita Utama */}
          <div className="mt-6 space-y-2 text-center border-b border-stone-400 pb-4">
            <h3
              className="font-serif text-xl sm:text-3xl font-extrabold uppercase tracking-tight text-stone-900 leading-tight"
            >
              {content.newspaperHeadline || "WARGA GEMPAR: DUA HATI RESMI TERIKAT JANJI SUCI"}
            </h3>
            <p className="font-serif text-xs sm:text-sm italic text-stone-700 max-w-lg mx-auto">
              {content.newspaperSub || "Edisi Khusus Romansa • Terbit untuk Mengabadikan Kisah Terindah"}
            </p>
          </div>

          {/* Kolom Berita Gaya Editorial Klasik dengan Drop Cap */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6 font-serif text-xs sm:text-sm text-stone-800 leading-relaxed text-justify">
            <div className="space-y-3">
              <p>
                <span
                  className="float-left mr-2 font-serif text-4xl font-black leading-none"
                  style={{ color: primary }}
                >
                  K
                </span>
                {content.newspaperBody
                  ? content.newspaperBody
                  : "Kabar bahagia mengudara ke seluruh pelosok. Dua insan yang ditakdirkan bersama telah mengukir komitmen suci. Setiap detik yang terlewati menjadi saksi betapa tulusnya cinta yang mereka bangun bersama. Menurut saksi mata, senyum bahagia keduanya merebak bagai musim semi abadi."}
              </p>
            </div>

            <div className="space-y-3 border-t sm:border-t-0 sm:border-l border-stone-300 pt-3 sm:pt-0 sm:pl-6">
              <div className="rounded-xl border border-stone-400/80 bg-stone-100/80 p-3 italic text-stone-700 text-center space-y-1">
                <QuoteIcon className="h-4 w-4 mx-auto text-stone-400" />
                <p className="text-xs">
                  &ldquo;Di hadapan waktu yang terus melaju, janji mereka tegak berdiri layaknya karang di tengah samudra.&rdquo;
                </p>
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block">
                  — Redaksi Kasih Karsa
                </span>
              </div>
              <p className="text-[11px] text-stone-600">
                Diberitakan pula bahwa warkat ini telah dicatat dalam arsip sejarah romansa abadi, tidak dapat dibatalkan oleh jarak maupun waktu.
              </p>
            </div>
          </div>
        </section>

        {/* ======================================================================= */}
        {/* MODULE 6: JEJAK BABAK KASIH (THE CHRONICLES OF US - 4 CHAPTERS) */}
        {/* ======================================================================= */}
        <section
          className="relative overflow-hidden rounded-3xl border-2 p-6 sm:p-10 shadow-xl transition-all"
          style={{
            backgroundColor: card,
            borderColor: `${primary}35`,
          }}
        >
          <div className="text-center space-y-1 mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-stone-500">
              <Milestone className="h-4 w-4" style={{ color: primary }} />
              <span>The Chronicles of Us</span>
            </div>
            <h3
              className="font-serif text-2xl sm:text-3xl font-bold"
              style={{ color: textColor }}
            >
              Empat Babak Kisah Perjalanan Kita
            </h3>
            <p className="text-xs sm:text-sm font-serif italic text-stone-500 max-w-md mx-auto">
              Setiap babak memiliki kenangan, setiap langkah memperdalam rasa
            </p>
          </div>

          {/* Garis Babak Kasih (Timeline Ornate) */}
          <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2 sm:before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-300">
            {/* Babak 1 */}
            <div className="relative group transition-all">
              <div
                className="absolute -left-[23px] sm:-left-[27px] top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white shadow-md text-[10px] font-bold text-white transition-transform group-hover:scale-125"
                style={{ backgroundColor: primary }}
              >
                I
              </div>
              <div
                className="rounded-2xl border p-4 sm:p-5 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:translate-x-1"
                style={{
                  backgroundColor: `${primary}05`,
                  borderColor: `${primary}20`,
                }}
              >
                <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                  <h4 className="font-serif text-base sm:text-lg font-bold text-stone-900">
                    {content.chapter1Title || "Babak I: Pertemuan Pertama"}
                  </h4>
                  <span className="rounded-full bg-white px-2.5 py-0.5 font-mono text-[10px] font-semibold text-stone-500 border border-stone-200">
                    {content.chapter1Year || "Awal Pertemuan"}
                  </span>
                </div>
                <p className="font-serif text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {content.chapter1Story ||
                    "Hari di mana tatap mata kita pertama kali bersirobok di kedai kopi itu. Senyum manismu seketika mengubah duniaku menjadi jauh lebih hangat dan berwarna."}
                </p>
              </div>
            </div>

            {/* Babak 2 */}
            <div className="relative group transition-all">
              <div
                className="absolute -left-[23px] sm:-left-[27px] top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white shadow-md text-[10px] font-bold text-white transition-transform group-hover:scale-125"
                style={{ backgroundColor: primary }}
              >
                II
              </div>
              <div
                className="rounded-2xl border p-4 sm:p-5 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:translate-x-1"
                style={{
                  backgroundColor: `${primary}05`,
                  borderColor: `${primary}20`,
                }}
              >
                <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                  <h4 className="font-serif text-base sm:text-lg font-bold text-stone-900">
                    {content.chapter2Title || "Babak II: Mengikat Janji Kasih"}
                  </h4>
                  <span className="rounded-full bg-white px-2.5 py-0.5 font-mono text-[10px] font-semibold text-stone-500 border border-stone-200">
                    {content.chapter2Year || "Hari Jadian"}
                  </span>
                </div>
                <p className="font-serif text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {content.chapter2Story ||
                    "Di bawah temaram lampu kota, dua hati akhirnya berani saling mengakui dan berjanji untuk saling menggenggam tangan dalam setiap langkah ke depan."}
                </p>
              </div>
            </div>

            {/* Babak 3 */}
            <div className="relative group transition-all">
              <div
                className="absolute -left-[23px] sm:-left-[27px] top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white shadow-md text-[10px] font-bold text-white transition-transform group-hover:scale-125"
                style={{ backgroundColor: primary }}
              >
                III
              </div>
              <div
                className="rounded-2xl border p-4 sm:p-5 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:translate-x-1"
                style={{
                  backgroundColor: `${primary}05`,
                  borderColor: `${primary}20`,
                }}
              >
                <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                  <h4 className="font-serif text-base sm:text-lg font-bold text-stone-900">
                    {content.chapter3Title || "Babak III: Badai yang Kita Lewati"}
                  </h4>
                  <span className="rounded-full bg-white px-2.5 py-0.5 font-mono text-[10px] font-semibold text-stone-500 border border-stone-200">
                    {content.chapter3Year || "Ujian & Kedewasaan"}
                  </span>
                </div>
                <p className="font-serif text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {content.chapter3Story ||
                    "Tak selamanya langit cerah, namun setiap kerikil dan badai justru membuktikan betapa kokohnya bahu kita untuk saling bersandar."}
                </p>
              </div>
            </div>

            {/* Babak 4 */}
            <div className="relative group transition-all">
              <div
                className="absolute -left-[23px] sm:-left-[27px] top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white shadow-md text-[10px] font-bold text-white transition-transform group-hover:scale-125"
                style={{ backgroundColor: primary }}
              >
                IV
              </div>
              <div
                className="rounded-2xl border p-4 sm:p-5 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:translate-x-1"
                style={{
                  backgroundColor: `${primary}08`,
                  borderColor: `${primary}30`,
                }}
              >
                <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                  <h4 className="font-serif text-base sm:text-lg font-bold text-stone-900">
                    {content.chapter4Title || "Babak IV: Menua Bersama"}
                  </h4>
                  <span className="rounded-full bg-white px-2.5 py-0.5 font-mono text-[10px] font-semibold text-rose-700 border border-rose-200">
                    {content.chapter4Year || "Hari Ini & Selamanya"}
                  </span>
                </div>
                <p className="font-serif text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {content.chapter4Story ||
                    "Kini hingga rambut memutih dan langkah melambat, tanganku akan tetap erat menggenggam tanganmu dengan cinta yang tak pernah berkurang sedikit pun."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================================= */}
        {/* MODULE 7: SURAT TELEGRAM KILAT MESIN TIK (TYPEWRITER TELEGRAM) */}
        {/* ======================================================================= */}
        <section
          className="relative overflow-hidden rounded-3xl border-2 p-6 sm:p-10 shadow-xl transition-all"
          style={{
            backgroundColor: "#fdf8ee",
            borderColor: "#d5cbb8",
          }}
        >
          {/* Header Telegram Vintage */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-stone-800 pb-3">
            <div className="space-y-0.5">
              <span className="font-mono text-xs font-black tracking-widest uppercase text-stone-900 block">
                TELEGRAM KAWAT KILAT &bull; POS DAN TELEKOMUNIKASI
              </span>
              <span className="font-mono text-[10px] text-stone-500 block">
                KLASIFIKASI: SANGAT RAHASIA &bull; PRIORITAS UTAMA
              </span>
            </div>

            <div className="rotate-2 rounded border border-rose-700 bg-rose-50 px-2.5 py-1 font-mono text-[10px] font-black uppercase tracking-wider text-rose-800">
              URGENT / PRIORITY
            </div>
          </div>

          {/* Info Pengirim Telegram */}
          <div className="my-4 grid grid-cols-2 gap-2 font-mono text-[10px] text-stone-600 border-b border-dashed border-stone-300 pb-3">
            <div>
              <span className="text-stone-400 block">DARI:</span>
              <span className="font-bold text-stone-800">{content.senderName}</span>
            </div>
            <div>
              <span className="text-stone-400 block">KEPADA:</span>
              <span className="font-bold text-stone-800">{recipientName}</span>
            </div>
          </div>

          {/* Isi Pesan Telegram Huruf Mesin Tik Klasik */}
          <div className="my-6 rounded-xl border border-stone-300 bg-white/60 p-4 sm:p-6 font-mono text-xs sm:text-sm font-semibold tracking-wide text-stone-800 leading-relaxed uppercase">
            <p>
              {content.telegramMessage ||
                "BERITA KILAT STOP DUA HATI TELAH RESMI BERPADU STOP TIDAK ADA YANG BISA MEMISAHKAN KITA LAGI STOP TERIMA KASIH TELAH MEMILIHKU STOP SAYANG KAMU SELALU STOP"}
              <span className="inline-block h-3.5 w-2 bg-stone-900 ml-1 animate-pulse" />
            </p>
          </div>

          <div className="flex items-center justify-between font-mono text-[9px] text-stone-400">
            <span>OFFICIAL CABLE TRANSMISSION</span>
            <span>NO REFUND • RECEIVED WITH LOVE</span>
          </div>
        </section>

        {/* ======================================================================= */}
        {/* MODULE 8: KARTU CATATAN RAHASIA (SECRET LOVE NOTE) */}
        {/* ======================================================================= */}
        {content.secretNoteContent && (
          <section
            className="rounded-3xl border-2 p-6 sm:p-8 transition-all shadow-md"
            style={{
              backgroundColor: `${primary}08`,
              borderColor: `${primary}35`,
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 animate-pulse" style={{ color: primary }} />
                <h4 className="font-serif text-base font-bold sm:text-lg" style={{ color: textColor }}>
                  {content.secretNoteTitle || "Bisikan Rahasia untuk Hatimu ✨"}
                </h4>
              </div>

              <button
                type="button"
                onClick={() => setIsSecretRevealed(!isSecretRevealed)}
                className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold shadow-sm transition-all hover:scale-105 active:scale-95"
                style={{
                  backgroundColor: isSecretRevealed ? "#ffffff" : primary,
                  color: isSecretRevealed ? primary : "#ffffff",
                  border: `1px solid ${primary}40`,
                }}
              >
                {isSecretRevealed ? (
                  <>
                    <Unlock className="h-3.5 w-3.5" />
                    <span>Sembunyikan</span>
                  </>
                ) : (
                  <>
                    <Lock className="h-3.5 w-3.5" />
                    <span>Buka Bisikan</span>
                  </>
                )}
              </button>
            </div>

            {isSecretRevealed ? (
              <div
                className="mt-5 border-t border-dashed pt-4 font-serif text-sm sm:text-base italic leading-relaxed animate-in fade-in-50 duration-300"
                style={{ borderColor: `${primary}30` }}
              >
                <p className="text-stone-800">{content.secretNoteContent}</p>
              </div>
            ) : (
              <p className="mt-3 text-xs text-stone-500 italic">
                Ketuk tombol &ldquo;Buka Bisikan&rdquo; di atas untuk membuka pesan rahasia yang tersembunyi...
              </p>
            )}
          </section>
        )}

        {/* ======================================================================= */}
        {/* MODULE 9: TIGA JANJI CINTA UNTUK HARI ESOK */}
        {/* ======================================================================= */}
        {(content.promise1 || content.promise2 || content.promise3) && (
          <section
            className="rounded-3xl border-2 p-6 sm:p-10 shadow-xl space-y-6"
            style={{
              backgroundColor: card,
              borderColor: `${primary}35`,
            }}
          >
            <div className="text-center space-y-1">
              <h3 className="font-serif text-xl font-bold sm:text-2xl" style={{ color: textColor }}>
                {content.promisesTitle || "Tiga Janji Setia untuk Hari Esok"}
              </h3>
              <p className="text-xs text-stone-500 font-serif italic">
                Terukir dalam warkat ini untuk kita rawat dan jaga selamanya
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 pt-2">
              {content.promise1 && (
                <div className="flex items-start gap-3 rounded-2xl border border-stone-200/80 bg-stone-50/60 p-4 text-sm font-serif transition-transform hover:scale-[1.01]">
                  <div
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white mt-0.5 shadow-sm"
                    style={{ backgroundColor: primary }}
                  >
                    1
                  </div>
                  <p className="text-stone-800 leading-relaxed">{content.promise1}</p>
                </div>
              )}
              {content.promise2 && (
                <div className="flex items-start gap-3 rounded-2xl border border-stone-200/80 bg-stone-50/60 p-4 text-sm font-serif transition-transform hover:scale-[1.01]">
                  <div
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white mt-0.5 shadow-sm"
                    style={{ backgroundColor: primary }}
                  >
                    2
                  </div>
                  <p className="text-stone-800 leading-relaxed">{content.promise2}</p>
                </div>
              )}
              {content.promise3 && (
                <div className="flex items-start gap-3 rounded-2xl border border-stone-200/80 bg-stone-50/60 p-4 text-sm font-serif transition-transform hover:scale-[1.01]">
                  <div
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white mt-0.5 shadow-sm"
                    style={{ backgroundColor: primary }}
                  >
                    3
                  </div>
                  <p className="text-stone-800 leading-relaxed">{content.promise3}</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* ======================================================================= */}
        {/* MODULE 10: SIMPAN & SALIN TAUTAN SURAT CINTA */}
        {/* ======================================================================= */}
        <section
          className="rounded-3xl border-2 p-6 sm:p-8 text-center space-y-4 shadow-xl"
          style={{ backgroundColor: card, borderColor: `${primary}30` }}
        >
          <div className="max-w-md mx-auto space-y-1.5">
            <h3 className="font-serif text-lg font-bold sm:text-xl" style={{ color: textColor }}>
              Simpan & Abadikan Warkat Kasih Ini
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
              Tautan ini dapat diakses kapan saja oleh pasanganmu sebagai pengingat manis akan rasa cinta yang telah terukir.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-xs font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 active:scale-95"
              style={{ backgroundColor: primary }}
            >
              {copiedLink ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>Tautan Surat Berhasil Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Salin Tautan Surat Cinta</span>
                </>
              )}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

// Icon pembantu kutipan
function QuoteIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
    </svg>
  );
}

export function VintageLoveTemplate({ data, className }: VintageLoveTemplateProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-rose-50/20" />}>
      <VintageLoveTemplateInner data={data} className={className} />
    </Suspense>
  );
}
