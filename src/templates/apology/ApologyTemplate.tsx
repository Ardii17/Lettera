"use client";

import { useEffect, useMemo, useRef, useState, Suspense } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import {
  Heart,
  HeartHandshake,
  Pause,
  Play,
  Mail,
  Calendar,
  Sparkles,
  MessageCircle,
  Check,
  Copy,
  Feather,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { toParagraphs } from "@/lib/utils/format";
import type { LetterContent } from "@/types/letter";
import { withDefaults } from "../utils";

const defaults = {
  recipientName: "Dinda Maharani",
  senderName: "Fikri Ramadhan",
  title: "Untuk Dinda, Dari Lubuk Hatiku yang Terdalam",
  quote:
    "Memaafkan bukan berarti melupakan apa yang telah terjadi, melainkan memilih untuk tidak membiarkan luka masa lalu merusak ikatan berharga yang kita miliki.",
  apologyOpening:
    "Aku menulis pesan ini setelah banyak merenung dan menyadari betapa cerobohnya sikap dan perkataanku tempo hari. Tidak ada pembenaran atas rasa kecewa dan sedih yang kutimbulkan di hatimu.",
  message:
    "Dinda, aku ingin meminta maaf secara tulus atas caraku memperlakukanmu kemarin. Dalam situasi itu, aku membiarkan emosi dan egoku mengambil alih, berbicara tanpa memikirkan bagaimana kalimat-kalimat itu akan melukai perasaanmu.\n\nAku sadar bahwa kata 'maaf' saja tidak akan otomatis menghapus rasa kecewa yang kamu rasakan. Namun, aku ingin kamu tahu bahwa penyesalan ini datang dari tempat yang paling jujur dalam diriku. Aku tidak ingin mencari alasan atau menyalahkan keadaan, karena kesalahan itu sepenuhnya ada padaku.\n\nHubungan baik dan kepercayaan yang telah kita bangun bersama jauh lebih berharga daripada apa pun. Kehilangan rasa nyaman di antara kita karena kecerobohanku sendiri adalah hal yang paling kusesali.",
  valuedAspectsTitle: "Hal yang Selalu Kupelajari & Kuhargai Darimu",
  valuedAspects:
    "Selama mengenalmu, ketulusan, kesabaran, dan caramu selalu mendengarkan orang lain adalah hal-hal yang selalu kukagumi. Kamu selalu memperlakukanku dengan penuh penghargaan, dan menyadari bahwa aku gagal membalasnya dengan kelembutan yang sama membuatku benar-benar tertampar. Aku sangat menghargai kehadiranmu dalam hidupku.",
  commitmentTitle: "Langkah Nyata & Janjiku ke Depan",
  promise1:
    "Belajar mengendalikan emosi, berhenti sejenak, dan sungguh-sungguh mendengarkan sudut pandangmu sebelum bereaksi.",
  promise2:
    "Menghargai batasan dan perasaanmu dengan penuh rasa hormat, tanpa meremehkan hal kecil yang kamu sampaikan.",
  promise3:
    "Berkomunikasi secara jujur, dewasa, dan terbuka tanpa membiarkan asumsi pribadi merusak kehangatan di antara kita.",
  senderPhone: "6281234567890",
  signature: "Dengan segenap ketulusan hati, Fikri",
  letterDate: "2026-09-21",
  primaryColor: "#3b6e5b",
  backgroundColor: "#f7f8f6",
  cardColor: "#ffffff",
  textColor: "#20382e",
  bodyTextColor: "#3e5148",
  musicTitle: "",
  bgMusicUrl: "",
};

interface ApologyTemplateProps {
  data: LetterContent;
  className?: string;
}

function ApologyTemplateInner({ data, className }: ApologyTemplateProps) {
  const content = withDefaults(defaults, data);
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Mode Thumbnail atau Katalog /templates: TIDAK PERNAH menampilkan modal/popup fixed
  const isThumbnail =
    Boolean(data._isThumbnail) ||
    pathname === "/templates" ||
    className?.includes("is-thumbnail") ||
    className?.includes("thumb");

  // Mode Editor Side Preview: ditampilkan langsung terbuka agar nyaman mengedit form
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

  // Nama penerima (bisa diambil dari query ?to=... jika ada, atau default)
  const [recipientName, setRecipientName] = useState<string>(content.recipientName);
  useEffect(() => {
    const queryTo =
      searchParams?.get("to") ||
      searchParams?.get("guest") ||
      searchParams?.get("nama") ||
      searchParams?.get("u");
    if (queryTo && queryTo.trim().length > 0) {
      setRecipientName(queryTo.trim());
      return;
    }
    setRecipientName(content.recipientName || "Seseorang yang Berharga");
  }, [searchParams, content.recipientName]);

  // State buka surat & audio
  const [isOpened, setIsOpened] = useState(!shouldStartClosed);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isThumbnail || isEditorPreview) {
      setIsOpened(true);
    }
  }, [isThumbnail, isEditorPreview]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleOpenLetter = () => {
    setIsOpened(true);
    if (content.bgMusicUrl && audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
    setTimeout(() => {
      document
        .getElementById("apology-main-letter")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 150);
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

  // WhatsApp response link
  const whatsappUrl = useMemo(() => {
    if (!content.senderPhone) return "";
    const cleanPhone = content.senderPhone.replace(/\D/g, "");
    const message = `Halo ${content.senderName || ""}, aku sudah membaca surat permintaan maaf yang kamu kirimkan. Terima kasih atas kejujuran dan ketulusanmu.`;
    return `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(message)}`;
  }, [content.senderPhone, content.senderName]);

  const paragraphs = toParagraphs(content.message);

  // Palet warna dinamis
  const primary = content.primaryColor || "#3b6e5b";
  const bg = content.backgroundColor || "#f7f8f6";
  const card = content.cardColor || "#ffffff";
  const textColor = content.textColor || "#20382e";
  const bodyText = content.bodyTextColor || "#3e5148";

  return (
    <div
      className={cn("relative min-h-screen font-sans selection:bg-teal-100", className)}
      style={{ backgroundColor: bg, color: bodyText }}
    >
      {/* Audio Elemen Tersembunyi (hanya aktif di luar katalog dan jika ada URL) */}
      {!isThumbnail && pathname !== "/templates" && content.bgMusicUrl && (
        <audio ref={audioRef} src={content.bgMusicUrl} loop preload="none" />
      )}

      {/* Floating Music Button (hanya tampil di surat publik / detail) */}
      {!isThumbnail &&
        !isEditorPreview &&
        pathname !== "/templates" &&
        (isPublicLetter || isFullPreview || isDetailPage) &&
        content.bgMusicUrl &&
        isOpened && (
          <button
            type="button"
            onClick={toggleMusic}
            className="fixed right-5 bottom-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-white/40 shadow-xl transition-all hover:scale-105"
            style={{ backgroundColor: primary, color: "#ffffff" }}
            aria-label={isPlaying ? "Jeda musik" : "Putar musik"}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5 animate-pulse" />
            ) : (
              <Play className="h-5 w-5 ml-0.5" />
            )}
          </button>
        )}

      {/* ========================================================================= */}
      {/* 1. COVER AMPLOP REFLEKTIF / PEMBUKA SURAT */}
      {/* ========================================================================= */}
      <section
        className={cn(
          "relative flex w-full flex-col items-center justify-center overflow-hidden px-4 text-center transition-all duration-700",
          !isOpened && (isPublicLetter || isFullPreview)
            ? "fixed inset-0 z-50 min-h-screen py-12"
            : !isOpened
              ? "relative min-h-[480px] py-12"
              : "min-h-[420px] sm:min-h-[500px] py-14",
        )}
        style={{
          background: `linear-gradient(135deg, ${primary}18 0%, ${bg} 100%)`,
        }}
      >
        <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center space-y-6">
          {/* Ikon Lingkaran Hati & Rekonsiliasi */}
          <div
            className="flex h-20 w-20 items-center justify-center rounded-full border shadow-md backdrop-blur-sm"
            style={{
              backgroundColor: card,
              borderColor: `${primary}35`,
            }}
          >
            <HeartHandshake className="h-10 w-10" style={{ color: primary }} />
          </div>

          <p className="text-xs font-semibold tracking-[0.25em] uppercase" style={{ color: primary }}>
            Sebuah Pesan Ketulusan
          </p>

          <h1
            className="font-serif text-3xl font-bold tracking-tight sm:text-4xl"
            style={{ color: textColor }}
          >
            {content.title}
          </h1>

          {/* Kotak Penerima */}
          <div
            className="w-full max-w-md rounded-2xl border p-6 text-center shadow-lg backdrop-blur-md"
            style={{
              backgroundColor: card,
              borderColor: `${primary}25`,
            }}
          >
            <p className="text-xs tracking-wider uppercase text-ink-muted">
              Tertuju Kepada:
            </p>
            <h2
              className="mt-2 font-serif text-2xl font-bold tracking-wide sm:text-3xl"
              style={{ color: primary }}
            >
              {recipientName}
            </h2>
            <p className="mt-1.5 text-xs text-ink-soft">
              Dari: <span className="font-semibold text-ink">{content.senderName}</span>
            </p>

            {isThumbnail ? (
              <div
                className="mt-5 inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-xs font-semibold text-white shadow"
                style={{ backgroundColor: primary }}
              >
                <Feather className="h-3.5 w-3.5" />
                <span>Surat Permintaan Maaf</span>
              </div>
            ) : !isOpened ? (
              <button
                type="button"
                onClick={handleOpenLetter}
                className="mt-6 inline-flex items-center gap-2.5 rounded-full px-7 py-3 text-sm font-semibold tracking-wide text-white shadow-xl transition-all hover:scale-105"
                style={{ backgroundColor: primary }}
              >
                <Mail className="h-4 w-4" />
                <span>Buka Surat Ini</span>
              </button>
            ) : (
              <div
                className="mt-4 flex items-center justify-center gap-1.5 text-xs font-medium"
                style={{ color: primary }}
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Surat Terbuka</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. LEMBARAN SURAT UTAMA */}
      {/* ========================================================================= */}
      <div
        id="apology-main-letter"
        className="mx-auto max-w-3xl px-4 py-12 sm:px-6 space-y-16"
      >
        {/* Lembar Kertas Surat */}
        <article
          className="relative rounded-3xl border p-6 sm:p-12 shadow-sm space-y-8"
          style={{ backgroundColor: card, borderColor: `${primary}25` }}
        >
          {/* Header Surat */}
          <div className="border-b border-line pb-6 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-ink-muted">
              <span className="font-medium tracking-wide">
                Surat Pribadi &amp; Refleksi
              </span>
              {content.letterDate && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{content.letterDate}</span>
                </div>
              )}
            </div>

            <h2 className="font-serif text-2xl font-bold sm:text-3xl" style={{ color: textColor }}>
              Kepada Yth. {recipientName},
            </h2>
          </div>

          {/* Kutipan Reflektif */}
          {content.quote && (
            <div
              className="rounded-2xl border-l-4 p-5 italic text-sm sm:text-base leading-relaxed"
              style={{
                backgroundColor: `${primary}0d`,
                borderColor: primary,
                color: bodyText,
              }}
            >
              &ldquo;{content.quote}&rdquo;
            </div>
          )}

          {/* Paragraf Pembuka */}
          {content.apologyOpening && (
            <p className="text-base sm:text-lg leading-relaxed font-serif font-medium" style={{ color: textColor }}>
              {content.apologyOpening}
            </p>
          )}

          {/* Isi Surat Utama */}
          <div className="space-y-4 text-sm sm:text-base leading-relaxed text-ink-soft">
            {paragraphs.map((par, idx) => (
              <p key={idx}>{par}</p>
            ))}
          </div>

          {/* Seksi: Hal Berharga yang Diapresiasi */}
          {content.valuedAspects && (
            <div
              className="rounded-2xl border p-6 space-y-3"
              style={{
                backgroundColor: bg,
                borderColor: `${primary}20`,
              }}
            >
              <div className="flex items-center gap-2" style={{ color: primary }}>
                <Heart className="h-4 w-4 fill-current" />
                <h3 className="font-serif text-lg font-bold" style={{ color: textColor }}>
                  {content.valuedAspectsTitle || "Hal yang Sangat Kuhargai Darimu"}
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-ink-soft">
                {content.valuedAspects}
              </p>
            </div>
          )}

          {/* Seksi: Komitmen Perbaikan Nyata */}
          {(content.promise1 || content.promise2 || content.promise3) && (
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" style={{ color: primary }} />
                <h3 className="font-serif text-xl font-bold" style={{ color: textColor }}>
                  {content.commitmentTitle || "Langkah Nyata & Janjiku ke Depan"}
                </h3>
              </div>
              <p className="text-xs text-ink-muted">
                Kata-kata tanpa tindakan nyata tidak akan ada artinya. Ini adalah komitmen yang ingin kupegang teguh:
              </p>

              <div className="space-y-3 pt-2">
                {content.promise1 && (
                  <div className="flex items-start gap-3 rounded-xl border border-line bg-page p-4 text-sm">
                    <div
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white mt-0.5"
                      style={{ backgroundColor: primary }}
                    >
                      1
                    </div>
                    <p className="text-ink-soft leading-relaxed">{content.promise1}</p>
                  </div>
                )}
                {content.promise2 && (
                  <div className="flex items-start gap-3 rounded-xl border border-line bg-page p-4 text-sm">
                    <div
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white mt-0.5"
                      style={{ backgroundColor: primary }}
                    >
                      2
                    </div>
                    <p className="text-ink-soft leading-relaxed">{content.promise2}</p>
                  </div>
                )}
                {content.promise3 && (
                  <div className="flex items-start gap-3 rounded-xl border border-line bg-page p-4 text-sm">
                    <div
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white mt-0.5"
                      style={{ backgroundColor: primary }}
                    >
                      3
                    </div>
                    <p className="text-ink-soft leading-relaxed">{content.promise3}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Penutup & Tanda Tangan */}
          <div className="border-t border-line pt-8 space-y-2 text-right">
            <p className="text-xs uppercase tracking-wider text-ink-muted">
              Tertanda dengan tulus,
            </p>
            <p className="font-serif text-2xl font-bold" style={{ color: textColor }}>
              {content.signature}
            </p>
          </div>
        </article>

        {/* ========================================================================= */}
        {/* 3. KOTAK RESPON REKONSILIASI (BALAS KE WHATSAPP / SIMPAN) */}
        {/* ========================================================================= */}
        <section
          className="rounded-3xl border p-6 sm:p-8 text-center space-y-6 shadow-sm"
          style={{ backgroundColor: card, borderColor: `${primary}30` }}
        >
          <div className="max-w-md mx-auto space-y-2">
            <h3 className="font-serif text-xl font-bold sm:text-2xl" style={{ color: textColor }}>
              Tidak Ada Paksaan Untuk Langsung Memaafkan
            </h3>
            <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
              Ambillah waktu sebanyak apa pun yang kamu butuhkan. Jika suatu saat
              kamu merasa siap untuk berbicara kembali, pintu komunikasi selalu
              terbuka untukmu.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {whatsappUrl && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-xs font-semibold text-white shadow-sm transition-all hover:bg-emerald-700"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Balas ke WhatsApp {content.senderName}</span>
              </a>
            )}

            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-page px-5 py-3 text-xs font-semibold text-ink shadow-sm transition-all hover:border-line-strong"
            >
              {copiedLink ? (
                <>
                  <Check className="h-4 w-4 text-emerald-600" />
                  <span>Tautan Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 text-ink-muted" />
                  <span>Salin Tautan Surat</span>
                </>
              )}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export function ApologyTemplate({ data, className }: ApologyTemplateProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-teal-50/30" />}>
      <ApologyTemplateInner data={data} className={className} />
    </Suspense>
  );
}
