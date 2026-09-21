"use client";

import { useRef, useState, Suspense } from "react";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  Pause,
  Play,
  Heart,
  Disc3,
  Share2,
  Check,
  Award,
  Sun,
  Ticket,
  Calendar,
  Compass,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { toParagraphs } from "@/lib/utils/format";
import type { LetterContent } from "@/types/letter";
import { withDefaults } from "../utils";

interface BirthdayGazetteTemplateProps {
  data: LetterContent;
  className?: string;
}

const defaults: Record<string, string> = {
  recipientName: "Clarissa Aurelia",
  ageNumber: "24",
  issueVolume: "VOL. XXIV // NO. 10",
  publishDate: "Minggu, 25 Oktober 2026",
  weatherForecast: "100% Cerah, Bertabur Senyuman & Harapan Baru",
  gazetteHeadline: "BREAKING NEWS: Bintang Paling Bersinar Resmi Menginjak Babak Usia ke-24!",
  newspaperSubhead: "Dunia merayakan hari kelahiran sosok luar biasa yang senantiasa membawa kehangatan, tawa, dan inspirasi bagi sekelilingnya.",

  editorialTitle: "Catatan Redaksi: Sebuah Perjalanan Penuh Makna, Tawa, dan Cinta",
  editorialLetter:
    "Hari ini, edisi khusus The Birthday Gazette kami terbitkan secara istimewa sebagai persembahan kecil untuk merayakan hadirmu di dunia.\n\nTidak terasa waktu terus bergulir, membawamu menapaki babak baru yang kian dewasa dan bijaksana. Terima kasih telah menjadi teman berbagi tawa yang paling tulus, pendengar setia di kala badai melanda, dan sosok yang selalu menyalakan cahaya di mana pun kau berada.\n\nSemoga di usia yang baru ini, setiap langkah kakimu senantiasa dinaungi keberkahan, impian-impian besarmu menemukan jalan terindahnya untuk terwujud, dan senyuman manismu tak pernah pudar oleh waktu. Selamat ulang tahun, sang tokoh utama!",
  senderName: "Dimas Arya",
  senderTitle: "Sahabat Sejati // Pemimpin Redaksi Seumur Hidup",

  metric1Value: "8.766",
  metric1Label: "Hari Menerangi Dunia",
  metric2Value: "1.400+",
  metric2Label: "Secangkir Kopi & Tawa Bersama",
  metric3Value: "100%",
  metric3Label: "Kebaikan Hati Tanpa Pamrih",
  metric4Value: "Tak Terhingga",
  metric4Label: "Momen Indah Menanti di Depan",

  photo1Url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
  photo1Caption: "Potret sang tokoh utama saat menatap masa depan dengan senyuman paling memikat.",
  photo1Tag: "LIPUTAN UTAMA",

  photo2Url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
  photo2Caption: "Momen keceriaan spontan yang terekam kamera saat menjelajahi sudut kota favorit.",
  photo2Tag: "MOMEN SPONTAN",

  photo3Url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
  photo3Caption: "Tawa lepas yang membuktikan bahwa kebahagiaan selalu ada dalam setiap detik perjalanan.",
  photo3Tag: "SOROT LENSA",

  horoscopeTitle: "Horoskop & Ramalan Babak Usia Baru",
  horoscopeText:
    "Bintang-bintang meramalkan tahun yang penuh kelimpahan karya, petualangan baru yang mendebarkan, dan kedamaian hati yang melimpah. Segala rintangan di masa lalu kini berubah menjadi batu loncatan kesuksesanmu.",

  wish1Title: "Karier & Karya Cemerlang",
  wish1Desc: "Semoga setiap karya dan langkah besarmu menemukan jalan terbaik dan diakui luas.",
  wish2Title: "Raga Bugar & Hati Tentram",
  wish2Desc: "Diberkahi kesehatan raga yang prima serta kedamaian batin dalam setiap hembusan nafas.",
  wish3Title: "Dikelilingi Kasih Sejati",
  wish3Desc: "Selalu dikelilingi sahabat dan keluarga yang tulus mendukungmu dalam segala keadaan.",
  wish4Title: "Eksplorasi Tanpa Batas",
  wish4Desc: "Semoga babak baru ini membawamu menjelajahi tempat-tempat baru yang kau impikan.",

  voucher1Title: "Kupon Traktir Makan Malam Favorit",
  voucher1Desc: "Berlaku kapan saja di restoran favorit pilihanmu. Sepenuhnya dibiayai oleh pengirim!",
  voucher2Title: "Kupon Bebas Curhat & Dengar 24/7",
  voucher2Desc: "Bebas menelepon atau bertemu kapan pun kau butuh teman berbagi cerita tanpa dihakimi.",
  voucher3Title: "Kupon Jalan-Jalan Santai Sore",
  voucher3Desc: "Jalan santai menikmati sunset, hunting foto, dan minum es kopi tanpa terburu waktu.",
  voucher4Title: "Kupon Hadiah Kejutan Rahasia",
  voucher4Desc: "Bisa ditukar dengan satu barang impian yang sedang masuk dalam wishlist-mu saat ini.",

  primaryColor: "#dc2626",
  backgroundColor: "#f4efe6",
  cardColor: "#fdfbf7",
  textColor: "#1c1917",
  musicTitle: "Vintage Jazz Cafe & Birthday Melody",
  musicUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=ambient-piano-amp-strings-10711.mp3",
};

function BirthdayGazetteTemplateInner({
  data,
  className,
}: BirthdayGazetteTemplateProps) {
  const content = withDefaults(defaults, data);
  const pathname = usePathname();

  const isThumbnail =
    Boolean(data._isThumbnail) ||
    pathname === "/templates" ||
    className?.includes("is-thumbnail") ||
    className?.includes("thumb");

  const [claimedVouchers, setClaimedVouchers] = useState<Record<number, boolean>>({});
  const [copiedLink, setCopiedLink] = useState(false);

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

  const toggleClaimVoucher = (idx: number) => {
    setClaimedVouchers((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const paragraphs = toParagraphs(content.editorialLetter);

  const primary = content.primaryColor || "#dc2626";
  const bg = content.backgroundColor || "#f4efe6";
  const card = content.cardColor || "#fdfbf7";
  const textColor = content.textColor || "#1c1917";

  const showFloatingAudio = !isThumbnail && pathname !== "/templates" && Boolean(content.musicUrl);

  return (
    <div
      className={cn("relative min-h-screen font-serif antialiased selection:bg-amber-200 selection:text-stone-900", className)}
      style={{ backgroundColor: bg, color: textColor }}
    >
      {/* Subtle Newsprint Halftone Pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#1c191710_1px,transparent_1px)] bg-[size:16px_16px] opacity-40" />

      {/* Floating Vinyl Music Button */}
      {showFloatingAudio && (
        <>
          <audio ref={audioRef} src={content.musicUrl} loop preload="none" />
          <button
            type="button"
            onClick={toggleMusic}
            className="fixed right-5 bottom-6 z-40 flex items-center gap-2 rounded-full border border-stone-800 bg-[#1c1917] px-4 py-2.5 text-stone-200 shadow-2xl backdrop-blur-md transition-all hover:scale-105"
            aria-label={isPlaying ? "Jeda musik" : "Putar musik koran"}
          >
            <Disc3 className={cn("h-4 w-4", isPlaying && "animate-spin text-amber-400")} />
            <span className="text-xs font-mono font-medium pr-1 text-amber-100">
              {isPlaying ? "Jazz On Air" : "Putar Musik"}
            </span>
            {isPlaying ? <Pause className="h-3.5 w-3.5 text-amber-300" /> : <Play className="h-3.5 w-3.5 text-amber-300" />}
          </button>
        </>
      )}

      {/* Newspaper Container Sheet */}
      <div className="relative mx-auto max-w-4xl p-4 sm:p-8 md:p-12">
        <div
          className="relative border-4 border-double border-stone-800 p-6 sm:p-10 md:p-14 shadow-2xl space-y-8"
          style={{ backgroundColor: card }}
        >
          {/* ========================================================= */}
          {/* 1. MASTHEAD KORAN: THE BIRTHDAY GAZETTE                   */}
          {/* ========================================================= */}
          <header className="border-b-2 border-stone-800 pb-4 space-y-3">
            {/* Top Bar: Weather, Date, Edition, Price */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-300 pb-2 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-stone-600">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-stone-700" />
                <span>{content.publishDate}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sun className="h-3.5 w-3.5 text-amber-600" />
                <span>{content.weatherForecast}</span>
              </div>
              <div className="text-stone-800 font-bold">
                {content.issueVolume} • <span className="text-red-700">PRICELESS</span>
              </div>
            </div>

            {/* Giant Masthead Title */}
            <div className="text-center py-2 space-y-1">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase leading-none font-serif text-stone-950">
                The Birthday Gazette
              </h1>
              <div className="flex items-center justify-center gap-3 pt-1">
                <span className="h-0.5 w-12 sm:w-24 bg-stone-800" />
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.3em] text-stone-600 font-bold">
                  ★ SPECIAL COMMEMORATIVE EDITION ★
                </span>
                <span className="h-0.5 w-12 sm:w-24 bg-stone-800" />
              </div>
            </div>

            {/* Red Breaking News Banner */}
            <div
              className="py-1.5 px-4 text-center text-xs font-mono font-bold tracking-widest text-white uppercase rounded-sm shadow-sm"
              style={{ backgroundColor: primary }}
            >
              EDISI EKSKLUSIF PERAYAAN HARI KELAHIRAN TOKOH UTAMA DUNIA
            </div>
          </header>

          {/* ========================================================= */}
          {/* 2. HEADLINE UTAMA & LEAD ARTICLE SPREAD                  */}
          {/* ========================================================= */}
          <section className="space-y-4 border-b-2 border-stone-800 pb-8">
            <div className="space-y-2 text-center sm:text-left">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight uppercase text-stone-950 font-serif">
                {content.gazetteHeadline}
              </h2>
              <p className="font-serif italic text-base sm:text-xl text-stone-600 max-w-3xl leading-snug">
                &ldquo;{content.newspaperSubhead}&rdquo;
              </p>
            </div>

            {/* Two-Column Broadsheet Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 items-start">
              {/* Kolom Kiri: Surat Tajuk Rencana Redaksi (7 cols) */}
              <div className="lg:col-span-7 space-y-6 lg:border-r border-stone-300 lg:pr-8">
                <div className="border-b border-stone-300 pb-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-red-700 font-bold block">
                    TAJUK RENCANA REDAKSI // EDITORIAL LEAD
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-stone-900 pt-0.5">
                    {content.editorialTitle}
                  </h3>
                </div>

                <div className="space-y-4 text-base sm:text-lg leading-relaxed text-stone-800 text-justify">
                  {paragraphs.map((para, idx) => (
                    <p
                      key={idx}
                      className={idx === 0 ? "first-letter:text-5xl first-letter:font-black first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:text-stone-950" : ""}
                    >
                      {para}
                    </p>
                  ))}
                </div>

                {/* Stempel Tanda Tangan Pemimpin Redaksi */}
                <div className="border-t border-stone-300 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <p className="text-[11px] font-mono uppercase text-stone-500">Tertanda Pemimpin Redaksi,</p>
                    <p className="text-xl font-bold italic text-stone-900">{content.senderName}</p>
                    <p className="text-xs font-mono text-stone-500">{content.senderTitle}</p>
                  </div>

                  <div className="border-2 border-red-800 p-2 text-center font-mono text-[10px] text-red-800 uppercase tracking-widest font-bold rotate-2 inline-block self-start sm:self-center">
                    ★ VERIFIED BIRTHDAY LEGEND ★
                  </div>
                </div>
              </div>

              {/* Kolom Kanan: Foto Berita Utama & Metrik (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                {/* Hero Press Photo 1 */}
                {content.photo1Url && (
                  <div className="border-2 border-stone-800 p-2.5 bg-stone-100 shadow-md space-y-2">
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={content.photo1Url}
                        alt={content.photo1Caption || "Press Photo 1"}
                        className="h-full w-full object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-500"
                      />
                      <div className="absolute top-2 left-2 bg-stone-900 text-white font-mono text-[9px] uppercase px-2 py-0.5 font-bold tracking-widest">
                        {content.photo1Tag || "LIPUTAN UTAMA"}
                      </div>
                    </div>
                    {content.photo1Caption && (
                      <p className="font-sans text-xs text-stone-700 italic leading-snug px-1">
                        <strong>DOKUMENTASI PERS:</strong> {content.photo1Caption}
                      </p>
                    )}
                  </div>
                )}

                {/* Badge Usia Baru */}
                <div className="border border-stone-800 p-4 bg-stone-100 text-center space-y-1 shadow-inner">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-stone-500 font-bold block">
                    EDISI PERAYAAN BABAK USIA
                  </span>
                  <div className="text-5xl font-black text-stone-950 font-serif">
                    {content.ageNumber} <span className="text-xl font-normal italic font-serif">Tahun Penuh Berkah</span>
                  </div>
                  <p className="text-xs font-sans text-stone-600">
                    Merayakan kelahiran <strong className="text-stone-900">{content.recipientName}</strong>
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ========================================================= */}
          {/* 3. METRIK JEJAK KEHIDUPAN (LIFE CHRONICLE METRICS)       */}
          {/* ========================================================= */}
          <section className="border-b-2 border-stone-800 pb-8 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-300 pb-2">
              <span className="font-mono text-xs uppercase tracking-widest text-stone-700 font-bold">
                KILAS STATISTIK PERJALANAN HIDUP // LIFE IN NUMBERS
              </span>
              <span className="font-mono text-[10px] text-stone-500 uppercase">OFFICIAL CHRONICLE DATA</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { val: content.metric1Value, label: content.metric1Label },
                { val: content.metric2Value, label: content.metric2Label },
                { val: content.metric3Value, label: content.metric3Label },
                { val: content.metric4Value, label: content.metric4Label },
              ].map((m, idx) => (
                <div
                  key={idx}
                  className="border border-stone-300 p-4 text-center space-y-1 bg-stone-50/60"
                >
                  <span className="text-2xl sm:text-3xl font-black font-mono text-stone-950 block">
                    {m.val}
                  </span>
                  <p className="text-[11px] font-sans font-medium text-stone-600 uppercase tracking-wider">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ========================================================= */}
          {/* 4. GALERI FOTO PERS: DOKUMENTASI EKSKLUSIF (FOTO 2 & 3)   */}
          {/* ========================================================= */}
          {(content.photo2Url || content.photo3Url) && (
            <section className="border-b-2 border-stone-800 pb-8 space-y-4">
              <div className="flex items-center justify-between border-b border-stone-300 pb-2">
                <span className="font-mono text-xs uppercase tracking-widest text-stone-700 font-bold">
                  SOROT LENSA PERS // PHOTO ARCHIVES
                </span>
                <span className="font-mono text-[10px] text-stone-500 uppercase">EXCLUSIVE CAPTURES</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {content.photo2Url && (
                  <div className="border-2 border-stone-800 p-3 bg-stone-100 shadow-sm space-y-2">
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={content.photo2Url}
                        alt={content.photo2Caption || "Press Photo 2"}
                        className="h-full w-full object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-500"
                      />
                      <div className="absolute top-2 left-2 bg-stone-900 text-white font-mono text-[9px] uppercase px-2 py-0.5 font-bold tracking-widest">
                        {content.photo2Tag || "MOMEN SPONTAN"}
                      </div>
                    </div>
                    {content.photo2Caption && (
                      <p className="font-sans text-xs text-stone-700 italic leading-snug">
                        <strong>DOKUMENTASI:</strong> {content.photo2Caption}
                      </p>
                    )}
                  </div>
                )}

                {content.photo3Url && (
                  <div className="border-2 border-stone-800 p-3 bg-stone-100 shadow-sm space-y-2">
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-200">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={content.photo3Url}
                        alt={content.photo3Caption || "Press Photo 3"}
                        className="h-full w-full object-cover grayscale contrast-110 hover:grayscale-0 transition-all duration-500"
                      />
                      <div className="absolute top-2 left-2 bg-stone-900 text-white font-mono text-[9px] uppercase px-2 py-0.5 font-bold tracking-widest">
                        {content.photo3Tag || "SOROT LENSA"}
                      </div>
                    </div>
                    {content.photo3Caption && (
                      <p className="font-sans text-xs text-stone-700 italic leading-snug">
                        <strong>DOKUMENTASI:</strong> {content.photo3Caption}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* ========================================================= */}
          {/* 5. HOROSKOP & 4 KARTU DOA HARAPAN MASA DEPAN             */}
          {/* ========================================================= */}
          <section className="border-b-2 border-stone-800 pb-8 space-y-6">
            <div className="border-b border-stone-300 pb-2">
              <span className="font-mono text-xs uppercase tracking-widest text-stone-700 font-bold">
                RAMALAN BINTANG & DOA REDAKSI // HOROSCOPE & BLESSINGS
              </span>
            </div>

            {/* Kotak Ramalan Bintang */}
            {content.horoscopeText && (
              <div className="border border-stone-800 p-5 bg-stone-100/70 space-y-2">
                <h4 className="font-serif font-bold text-lg text-stone-900 flex items-center gap-2">
                  <Compass className="h-4 w-4 text-red-700" />
                  <span>{content.horoscopeTitle}</span>
                </h4>
                <p className="font-sans text-xs sm:text-sm text-stone-700 leading-relaxed italic">
                  &ldquo;{content.horoscopeText}&rdquo;
                </p>
              </div>
            )}

            {/* 4 Kartu Doa Pilihan */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: content.wish1Title, desc: content.wish1Desc, icon: Award, cat: "KARIER & KARYA" },
                { title: content.wish2Title, desc: content.wish2Desc, icon: Sparkles, cat: "RAGA & JIWA" },
                { title: content.wish3Title, desc: content.wish3Desc, icon: Heart, cat: "KASIH SEJATI" },
                { title: content.wish4Title, desc: content.wish4Desc, icon: Sun, cat: "PETUALANGAN" },
              ].map((w, idx) => {
                const Icon = w.icon;
                return (
                  <div
                    key={idx}
                    className="border border-stone-300 p-4 space-y-2 bg-stone-50/50 hover:border-stone-800 transition-colors"
                  >
                    <div className="flex items-center justify-between text-stone-600 font-mono text-[10px] uppercase">
                      <span className="font-bold text-red-700">{w.cat}</span>
                      <Icon className="h-3.5 w-3.5 text-stone-600" />
                    </div>
                    <h5 className="font-serif font-bold text-base text-stone-900">{w.title}</h5>
                    <p className="font-sans text-xs text-stone-600 leading-relaxed">{w.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ========================================================= */}
          {/* 6. IKLAN BARIS & KUPON KADO ULANG TAHUN INTERAKTIF        */}
          {/* ========================================================= */}
          <section className="space-y-4">
            <div className="flex items-center justify-between border-b border-stone-300 pb-2">
              <span className="font-mono text-xs uppercase tracking-widest text-stone-700 font-bold">
                IKLAN BARIS SPESIAL: KUPON KADO ULANG TAHUN // BIRTHDAY VOUCHERS
              </span>
              <span className="font-mono text-[10px] text-red-700 font-bold uppercase">KLIK UNTUK KLAIM</span>
            </div>

            <p className="font-sans text-xs text-stone-600 italic">
              Kupon di bawah ini dapat diklaim dan ditukarkan kepada pengirim kapan saja tanpa tanggal kedaluwarsa!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {[
                { title: content.voucher1Title, desc: content.voucher1Desc },
                { title: content.voucher2Title, desc: content.voucher2Desc },
                { title: content.voucher3Title, desc: content.voucher3Desc },
                { title: content.voucher4Title, desc: content.voucher4Desc },
              ].map((v, idx) => {
                const isClaimed = Boolean(claimedVouchers[idx]);
                return (
                  <div
                    key={idx}
                    onClick={() => toggleClaimVoucher(idx)}
                    className={cn(
                      "cursor-pointer border-2 border-dashed p-4 transition-all duration-200 rounded-sm relative select-none",
                      isClaimed
                        ? "border-emerald-700 bg-emerald-50/60 shadow-inner"
                        : "border-stone-400 bg-stone-50 hover:border-stone-800 hover:shadow-md",
                    )}
                  >
                    <div className="flex items-center justify-between font-mono text-[10px] text-stone-500 uppercase pb-1">
                      <div className="flex items-center gap-1 font-bold text-stone-700">
                        <Ticket className="h-3 w-3 text-red-700" />
                        <span>KUPON #{idx + 1}</span>
                      </div>
                      <span className={cn("font-bold text-[9px] px-1.5 py-0.5 rounded", isClaimed ? "bg-emerald-200 text-emerald-800" : "bg-stone-200 text-stone-700")}>
                        {isClaimed ? "TERKLAIM ✓" : "BELUM KLAIM"}
                      </span>
                    </div>

                    <h5 className="font-serif font-bold text-base text-stone-900 pt-0.5">{v.title}</h5>
                    <p className="font-sans text-xs text-stone-600 pt-1 leading-snug">{v.desc}</p>

                    <div className="mt-3 pt-2 border-t border-dotted border-stone-300 flex items-center justify-between text-[10px] font-mono text-stone-500">
                      <span>BERLAKU SEUMUR HIDUP</span>
                      <span className="text-stone-700 font-bold hover:underline">
                        {isClaimed ? "Batalkan Klaim" : "Klaim Kupon Ini →"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ========================================================= */}
          {/* 7. FOOTER REDAKSI & BAGIKAN KORAN                        */}
          {/* ========================================================= */}
          <footer className="border-t-2 border-stone-800 pt-6 space-y-4 text-center">
            <div className="space-y-1">
              <p className="font-serif italic text-xs sm:text-sm text-stone-600">
                &ldquo;Semoga setiap hari dalam babak barumu dipenuhi kisah-kisah hebat yang layak diabadikan.&rdquo;
              </p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-stone-500">
                THE BIRTHDAY GAZETTE © 2026 • DIPRODUKSI KHUSUS DENGAN PENUH CINTA UNTUK {content.recipientName}
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-stone-800 bg-stone-900 text-white font-mono text-xs uppercase tracking-wider hover:bg-stone-800 transition-colors shadow-md"
              >
                {copiedLink ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Tautan Koran Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="h-3.5 w-3.5" />
                    <span>Bagikan Edisi Koran Ini</span>
                  </>
                )}
              </button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export function BirthdayGazetteTemplate({
  data,
  className,
}: BirthdayGazetteTemplateProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f4efe6]" />}>
      <BirthdayGazetteTemplateInner data={data} className={className} />
    </Suspense>
  );
}
