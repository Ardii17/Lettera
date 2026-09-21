"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import { usePathname } from "next/navigation";
import type { TemplateComponentProps } from "../renderer";
import {
  Heart,
  MapPin,
  Calendar,
  Clock,
  VolumeX,
  Sparkles,
  Copy,
  Check,
  ExternalLink,
  Wine,
  Music,
  Utensils,
  PartyPopper,
  Send,
  Sun,
  Info,
} from "lucide-react";

function AmalfiWeddingTemplateContent({
  data,
  className = "",
}: TemplateComponentProps) {
  const pathname = usePathname();
  const isThumbnail = pathname === "/templates";
  const canPlayAudio = !isThumbnail;
  const content = data;

  const [activeAct, setActiveAct] = useState<number>(0);
  const [copiedBank, setCopiedBank] = useState<string | null>(null);
  const [rsvpAttending, setRsvpAttending] = useState<string>("yes");
  const [rsvpGuestCount, setRsvpGuestCount] = useState<string>("2");
  const [rsvpWishes, setRsvpWishes] = useState<string>("");
  const [rsvpSubmitted, setRsvpSubmitted] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Audio cleanup on unmount
  useEffect(() => {
    const audioEl = audioRef.current;
    return () => {
      if (audioEl) {
        audioEl.pause();
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current || !canPlayAudio) return;
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

  const handleCopyAccount = (text: string, bankKey: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(bankKey);
    setTimeout(() => {
      setCopiedBank(null);
    }, 2500);
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpSubmitted(true);
  };

  // Safe fallback values
  const monogram = String(content.coupleMonogram || "A & L");
  const weddingTitle = String(
    content.weddingTitle || "The Wedding Celebration of Alessandro & Lucia"
  );
  const subtitle = String(
    content.invitationSubtitle ||
      "Con Amore e Gioia • Bersama Berkah Kasih & Rahmat Illahi"
  );
  const recipient = String(
    content.recipientName || "Bapak / Ibu / Sahabat Terkasih"
  );
  const dateStr = String(content.weddingDate || "Sabtu, 24 Oktober 2026");
  const timeStr = String(content.weddingTime || "Pukul 09.00 - 23.00 CEST");
  const groom = String(content.groomName || "Alessandro Matteo Moretti");
  const groomParents = String(
    content.groomParents ||
      "Putra pertama dari Bpk. Lorenzo Moretti & Ibu Isabella Rossi"
  );
  const bride = String(content.brideName || "Lucia Caterina De Luca");
  const brideParents = String(
    content.brideParents ||
      "Putri kedua dari Bpk. Marco De Luca & Ibu Sofia Bianchi"
  );
  const verse = String(
    content.sacredVerse ||
      "“Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri...”"
  );

  const storyTitle = String(
    content.storyTitle || "Kisah Dua Hati di Pesisir Mediterania"
  );
  const storySubtitle = String(
    content.storySubtitle ||
      "Bagaimana semesta menautkan langkah kami di bawah keteduhan pohon lemon Ravello"
  );
  const mainMsg = String(
    content.mainMessage ||
      "Pertemuan kami bermula dari obrolan sederhana di sebuah kafe tepi tebing di Positano..."
  );
  const coupleQuote = String(
    content.coupleQuote ||
      "Di antara deburan ombak dan hangatnya mentari, kami menemukan rumah satu sama lain untuk selamanya."
  );
  const sender = String(content.senderName || "Alessandro & Lucia");

  // 4 Acts Data
  const acts = [
    {
      time: String(content.act1Time || "09:00 - 11:00 CEST"),
      title: String(
        content.act1Title || "Atto I: Pemberkatan Suci di Tebing Laut"
      ),
      location: String(
        content.act1Location || "Terrazza dell'Infinito, Villa d'Amore"
      ),
      desc: String(
        content.act1Desc ||
          "Pengucapan janji suci dan pertukaran cincin pernikahan di atas altar marmer terbuka..."
      ),
      icon: Heart,
      badge: "Holy Matrimony",
    },
    {
      time: String(content.act2Time || "16:30 - 18:00 CEST"),
      title: String(
        content.act2Title || "Atto II: Aperitivo Mentari Senja & Live Mandolin"
      ),
      location: String(content.act2Location || "Giardino dei Limoni"),
      desc: String(
        content.act2Desc ||
          "Menyambut tamu dengan Limoncello Spritz segar, kudapan canapé khas pesisir Italia..."
      ),
      icon: Wine,
      badge: "Sunset Cocktail",
    },
    {
      time: String(content.act3Time || "18:30 - 20:30 CEST"),
      title: String(
        content.act3Title || "Atto III: Jamuan Makan Malam di Bawah Pergola"
      ),
      location: String(
        content.act3Location || "Pergola delle Rose e Limoni"
      ),
      desc: String(
        content.act3Desc ||
          "Makan malam romantis dengan sajian pasta buatan tangan dan hidangan laut Mediterania..."
      ),
      icon: Utensils,
      badge: "Alfresco Banquet",
    },
    {
      time: String(content.act4Time || "20:30 - Selesai"),
      title: String(
        content.act4Title || "Atto IV: Pesta Dansa & Kembang Api Teluk"
      ),
      location: String(content.act4Location || "Belvedere sul Mare"),
      desc: String(
        content.act4Desc ||
          "Dansa pertama kedua mempelai, pemotongan kue Millefoglie tradisional, dan kembang api..."
      ),
      icon: PartyPopper,
      badge: "Midnight Celebration",
    },
  ];

  // Venue Data
  const venue = String(
    content.venueName || "Villa d'Amore Cliffside Estate"
  );
  const venueSub = String(
    content.venueSubname || "Ravello, Costiera Amalfitana, Italia"
  );
  const venueAddr = String(
    content.venueAddress ||
      "Via San Giovanni del Toro, 28, 84010 Ravello SA, Italy"
  );
  const venueNotes = String(
    content.venueNotes ||
      "Disediakan layanan shuttle van privat dan perahu boat dari dermaga utama Amalfi..."
  );
  const mapsUrl = String(
    content.mapsUrl || "https://maps.google.com/?q=Ravello+Amalfi+Coast"
  );

  // Dress Code Data
  const dressTheme = String(
    content.dressCodeTheme || "Amalfi Riviera Elegance • Formal Summer Chic"
  );
  const dressDesc = String(
    content.dressCodeDesc ||
      "Pria disarankan mengenakan setelan jas linen atau kemeja rapi bernuansa terang..."
  );
  const swatch1 = String(
    content.colorSwatch1 || "Limoncello Gold (#eab308)"
  );
  const swatch2 = String(
    content.colorSwatch2 || "Mediterranean Azure (#0284c7)"
  );
  const swatch3 = String(
    content.colorSwatch3 || "Olive Sage Green (#65a30d)"
  );
  const swatch4 = String(
    content.colorSwatch4 || "Terracotta Linen (#c2410c)"
  );
  const etiquetteNotes = String(
    content.guestEtiquetteNotes ||
      "Karena sebagian prosesi berlangsung di atas teras marmer bertingkat..."
  );

  // Bank Data
  const bank1Name = String(content.bank1Name || "BCA (Bank Central Asia)");
  const bank1No = String(content.bank1AccountNo || "8820194821");
  const bank1Holder = String(
    content.bank1Holder || "Alessandro Matteo Moretti"
  );
  const bank2Name = String(content.bank2Name || "Bank Mandiri");
  const bank2No = String(content.bank2AccountNo || "1370029481023");
  const bank2Holder = String(
    content.bank2Holder || "Lucia Caterina De Luca"
  );
  const giftMsg = String(
    content.giftMessage ||
      "Doa restu dan kehadiran Anda adalah hadiah terindah dalam babak baru hidup kami..."
  );
  const rsvpDeadline = String(
    content.rsvpDeadline || "Mohon konfirmasi kehadiran sebelum 1 Oktober 2026"
  );

  const primaryCol = String(content.primaryColor || "#eab308");
  const secondaryCol = String(content.secondaryColor || "#0284c7");
  const musicUrl = String(
    content.musicTrack ||
      "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c89b7b9cf4.mp3?filename=celestial-music-box-waltz-10928.mp3"
  );

  return (
    <div
      className={`min-h-screen bg-[#07172b] text-[#f8fafc] relative overflow-hidden font-serif selection:bg-amber-500 selection:text-slate-900 ${className}`}
      style={{
        backgroundImage: `
          radial-gradient(ellipse 70% 40% at 50% -10%, ${secondaryCol}28, transparent),
          radial-gradient(circle at 10% 35%, rgba(15, 43, 72, 0.5), transparent),
          radial-gradient(circle at 90% 75%, ${primaryCol}18, transparent)
        `,
      }}
    >
      {/* Audio Element */}
      {canPlayAudio && musicUrl && (
        <audio ref={audioRef} src={musicUrl} loop preload="none" />
      )}

      {/* Floating Audio Controller */}
      {canPlayAudio && musicUrl && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            type="button"
            onClick={toggleMusic}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#0a1e36]/90 backdrop-blur-md border border-amber-400/40 text-amber-300 hover:text-amber-100 hover:border-amber-300 shadow-2xl transition-all duration-300 group hover:scale-105"
            title={isPlaying ? "Jeda Melodi Italia" : "Putar Melodi Italia"}
          >
            {isPlaying ? (
              <>
                <Music className="w-4 h-4 text-amber-300 animate-pulse" />
                <span className="text-xs font-sans tracking-widest uppercase font-semibold">
                  Serenade Italia
                </span>
                <span className="flex space-x-1 items-end h-3">
                  <span className="w-0.5 h-3 bg-amber-400 animate-bounce" />
                  <span className="w-0.5 h-2 bg-sky-400 animate-bounce delay-100" />
                  <span className="w-0.5 h-3 bg-amber-400 animate-bounce delay-200" />
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-amber-400/70 group-hover:text-amber-300" />
                <span className="text-xs font-sans tracking-widest uppercase font-semibold">
                  Putar Melodi
                </span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Decorative Italian Majolica Ceramic Mosaic Pattern Background */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#eab308_1px,transparent_1px),radial-gradient(#0284c7_1px,transparent_1px)] bg-[size:3rem_3rem] [background-position:0_0,1.5rem_1.5rem]" />

      <main className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        {/* ============================================================
            SECTION 1: THE VILLA MONOGRAM & SACRED INVITATION DISPATCH
        ============================================================ */}
        <section className="relative rounded-3xl p-6 sm:p-12 border-2 border-amber-400/30 bg-[#0b223d]/90 backdrop-blur-md shadow-2xl overflow-hidden text-center space-y-6">
          {/* Majolica Border Corner Flourishes */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-400/60 rounded-tl-lg pointer-events-none" />
          <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-400/60 rounded-tr-lg pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-400/60 rounded-bl-lg pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-400/60 rounded-br-lg pointer-events-none" />

          {/* Romanesque Arch Monogram */}
          <div className="inline-flex flex-col items-center justify-center">
            <div className="w-20 h-28 sm:w-24 sm:h-32 rounded-t-full border-2 border-amber-400/60 bg-gradient-to-b from-amber-500/10 via-[#0f3258]/80 to-transparent flex items-center justify-center p-2 shadow-inner">
              <span
                className="text-3xl sm:text-4xl font-extrabold text-amber-200 tracking-wider"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {monogram}
              </span>
            </div>
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mt-1" />
          </div>

          <div className="space-y-2 max-w-2xl mx-auto">
            <p className="text-xs sm:text-sm font-sans tracking-widest uppercase text-sky-300 font-semibold">
              {subtitle}
            </p>
            <h1
              className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-300"
              style={{ fontFamily: "'Cinzel', 'Playfair Display', serif" }}
            >
              {weddingTitle}
            </h1>
          </div>

          {/* Honored Guest Badge */}
          <div className="inline-block px-5 py-2 rounded-full bg-amber-950/40 border border-amber-400/30 text-amber-200 text-xs sm:text-sm font-sans tracking-wider">
            Kepada Yth. <span className="font-bold text-amber-100">{recipient}</span>
          </div>

          {/* Bride & Groom Couple Presentation Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 text-center">
            <div className="p-6 rounded-2xl bg-[#071c33]/80 border border-amber-400/20 space-y-2">
              <span className="text-xs font-sans tracking-widest uppercase text-sky-300">
                Mempelai Pria
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-amber-200">
                {groom}
              </h2>
              <p className="text-xs text-slate-300/85 leading-relaxed font-sans">
                {groomParents}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#071c33]/80 border border-sky-400/20 space-y-2">
              <span className="text-xs font-sans tracking-widest uppercase text-amber-300">
                Mempelai Wanita
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-sky-100">
                {bride}
              </h2>
              <p className="text-xs text-slate-300/85 leading-relaxed font-sans">
                {brideParents}
              </p>
            </div>
          </div>

          {/* Sacred Verse / Quote */}
          <div className="pt-2 max-w-2xl mx-auto">
            <p className="text-xs sm:text-sm italic text-amber-100/80 leading-relaxed font-serif">
              {verse}
            </p>
          </div>

          {/* Date & Time Badges */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-sans">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#081a30] border border-amber-400/30 text-amber-200 font-semibold">
              <Calendar className="w-4 h-4 text-amber-400" />
              {dateStr}
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#081a30] border border-sky-400/30 text-sky-200 font-semibold">
              <Clock className="w-4 h-4 text-sky-400" />
              {timeStr}
            </span>
          </div>
        </section>

        {/* ============================================================
            SECTION 2: THE ROMANCE CHRONICLE (KISAH DUA HATI)
        ============================================================ */}
        <section className="relative rounded-3xl p-6 sm:p-10 border border-amber-400/30 bg-[#0d2644]/90 backdrop-blur-md shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-amber-400/20 pb-4">
            <div className="space-y-1">
              <span className="text-xs font-sans uppercase tracking-widest text-sky-300 font-semibold flex items-center gap-1.5">
                <Sun className="w-4 h-4 text-amber-400" />
                The Romance Chronicle
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-amber-100">
                {storyTitle}
              </h2>
            </div>
            <span className="text-xs text-amber-300/80 font-mono hidden sm:inline-block">
              Positano to Ravello
            </span>
          </div>

          <p className="text-xs sm:text-sm italic text-sky-200/90 font-serif">
            &ldquo;{storySubtitle}&rdquo;
          </p>

          <div className="text-base sm:text-lg leading-relaxed text-slate-100/90 whitespace-pre-line font-serif space-y-4">
            {mainMsg}
          </div>

          {/* Couple Romantic Quote Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-[#071c33] to-sky-950/40 border-l-4 border-amber-400 text-amber-200/95 italic text-sm sm:text-base flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>&ldquo;{coupleQuote}&rdquo;</div>
          </div>

          <div className="pt-2 flex justify-end text-right">
            <div>
              <p className="text-xs font-sans tracking-widest uppercase text-sky-300">
                Con Tutto il Cuore (Dengan Penuh Kasih),
              </p>
              <p
                className="text-xl sm:text-2xl font-bold text-amber-200 mt-1"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {sender}
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 3: 4 ACTS OF CELEBRATION (L'ITINERARIO DELLA FESTA)
        ============================================================ */}
        <section className="relative rounded-3xl p-6 sm:p-10 border border-sky-400/30 bg-[#092039]/90 backdrop-blur-md shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-sans tracking-widest uppercase text-amber-400 font-semibold">
              L&apos;Itinerario della Celebrazione
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-sky-100 tracking-wide">
              Empat Babak Hari Bahagia
            </h2>
            <p className="text-xs sm:text-sm text-slate-300/80 max-w-lg mx-auto">
              Rangkaian prosesi suci dan selebrasi sukacita yang kami persembahkan untuk dinikmati bersama.
            </p>
          </div>

          {/* 4 Interactive Act Stepper Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {acts.map((act, idx) => {
              const IconComp = act.icon;
              const isActive = activeAct === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveAct(idx)}
                  className={`p-3 sm:p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between ${
                    isActive
                      ? "bg-[#103459] border-amber-400 ring-2 ring-amber-400/30 shadow-xl scale-[1.02]"
                      : "bg-[#071a2f]/70 border-sky-500/20 hover:bg-[#0c2744] hover:border-sky-400/40"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        isActive
                          ? "bg-amber-400 text-slate-900 font-bold"
                          : "bg-sky-950 text-sky-300"
                      }`}
                    >
                      {act.badge}
                    </span>
                    <IconComp
                      className={`w-4 h-4 ${
                        isActive ? "text-amber-300" : "text-sky-400/60"
                      }`}
                    />
                  </div>
                  <div>
                    <p className="text-[11px] font-mono text-sky-300/80">
                      {act.time.split(" ")[0]}
                    </p>
                    <p
                      className={`text-xs font-bold line-clamp-1 mt-0.5 ${
                        isActive ? "text-amber-100" : "text-slate-200"
                      }`}
                    >
                      {act.title.split(":")[1] || act.title}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Act Detailed Card */}
          {(() => {
            const cur = acts[activeAct];
            const CurIcon = cur.icon;
            return (
              <div className="rounded-2xl p-6 sm:p-8 border border-amber-400/30 bg-gradient-to-br from-[#0e2c4d] via-[#0b2440] to-[#07192d] space-y-4 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sky-400/20 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-400/30 text-amber-300">
                      <CurIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-amber-100">
                        {cur.title}
                      </h3>
                      <p className="text-xs font-mono text-sky-300 mt-0.5 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {cur.time}
                      </p>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-xs text-amber-200 bg-amber-950/40 px-3 py-1.5 rounded-full border border-amber-400/30 self-start sm:self-auto">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{cur.location}</span>
                  </div>
                </div>

                <p className="text-sm sm:text-base leading-relaxed text-slate-100/90 whitespace-pre-line font-serif">
                  {cur.desc}
                </p>
              </div>
            );
          })()}
        </section>

        {/* ============================================================
            SECTION 4: VENUE LOGISTICS & NAVIGATION MAPS
        ============================================================ */}
        <section className="relative rounded-3xl p-6 sm:p-10 border border-amber-400/30 bg-[#0b223d]/90 backdrop-blur-md shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-400/20 pb-4">
            <div className="space-y-1">
              <span className="text-xs font-sans tracking-widest uppercase text-sky-300 font-semibold flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-400" />
                Lokasi & Petunjuk Perjalanan
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-amber-100">
                {venue}
              </h2>
              <p className="text-xs text-sky-200/80 font-mono">{venueSub}</p>
            </div>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-sans font-bold uppercase tracking-wider shadow-lg transition-all hover:scale-105 self-start sm:self-auto"
            >
              <span>Petunjuk Arah Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-sans">
            <div className="p-4 rounded-2xl bg-[#06182c]/80 border border-amber-400/20 space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-amber-400/70 font-semibold">
                Alamat Lengkap
              </span>
              <p className="text-slate-100 font-medium">{venueAddr}</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#06182c]/80 border border-sky-400/20 space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-sky-400/70 font-semibold">
                Layanan Shuttle & Boat
              </span>
              <p className="text-slate-200 text-xs leading-relaxed">
                {venueNotes}
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 5: ETIQUETTE & RIVIERA DRESS CODE SWATCHES
        ============================================================ */}
        <section className="relative rounded-3xl p-6 sm:p-10 border border-sky-400/30 bg-[#092039]/90 backdrop-blur-md shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-sans tracking-widest uppercase text-amber-400 font-semibold">
              Guest Etiquette & Attire
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-sky-100 tracking-wide">
              {dressTheme}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300/85 max-w-xl mx-auto leading-relaxed">
              {dressDesc}
            </p>
          </div>

          {/* 4 Swatch Palette Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: swatch1, hex: "#eab308", name: "Limoncello Gold" },
              { label: swatch2, hex: "#0284c7", name: "Mediterranean Azure" },
              { label: swatch3, hex: "#65a30d", name: "Olive Sage" },
              { label: swatch4, hex: "#c2410c", name: "Terracotta Linen" },
            ].map((swatch, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-[#06182c] border border-sky-400/20 text-center space-y-2"
              >
                <div
                  className="w-full h-10 rounded-xl shadow-inner border border-white/20"
                  style={{ backgroundColor: swatch.hex }}
                />
                <div>
                  <p className="text-xs font-bold text-amber-100">
                    {swatch.name}
                  </p>
                  <p className="text-[10px] font-mono text-slate-400">
                    {swatch.hex}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Footwear & Comfort Advisory */}
          <div className="p-4 rounded-2xl bg-[#06182c]/80 border border-amber-400/20 flex items-start gap-3 text-xs text-amber-100/90 font-sans">
            <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p>{etiquetteNotes}</p>
          </div>
        </section>

        {/* ============================================================
            SECTION 6: DIGITAL RSVP & DIGITAL WEDDING GIFT
        ============================================================ */}
        <section className="relative rounded-3xl p-6 sm:p-10 border-2 border-amber-400/40 bg-gradient-to-b from-[#0e2947] to-[#07192d] backdrop-blur-md shadow-2xl space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-sans tracking-widest uppercase text-sky-300 font-semibold">
              RSVP & Tanda Kasih Digital
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-100 tracking-wide">
              Konfirmasi Kehadiran & Doa Restu
            </h2>
            <p className="text-xs sm:text-sm text-sky-200/80 font-mono">
              {rsvpDeadline}
            </p>
          </div>

          {/* Interactive RSVP Form Simulation */}
          <div className="max-w-xl mx-auto p-6 rounded-2xl bg-[#06172a]/90 border border-amber-400/30 space-y-4">
            {!rsvpSubmitted ? (
              <form onSubmit={handleRsvpSubmit} className="space-y-4 font-sans text-xs">
                <div>
                  <label className="block text-amber-200 font-semibold mb-2">
                    Apakah Anda akan hadir di perayaan kami?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRsvpAttending("yes")}
                      className={`py-2 px-3 rounded-xl border font-medium text-center transition ${
                        rsvpAttending === "yes"
                          ? "bg-amber-400 text-slate-900 border-amber-300 font-bold"
                          : "bg-[#0b2440] text-slate-300 border-sky-400/30"
                      }`}
                    >
                      Sì, Hadir Penuh Sukacita
                    </button>
                    <button
                      type="button"
                      onClick={() => setRsvpAttending("no")}
                      className={`py-2 px-3 rounded-xl border font-medium text-center transition ${
                        rsvpAttending === "no"
                          ? "bg-rose-500 text-white border-rose-400 font-bold"
                          : "bg-[#0b2440] text-slate-300 border-sky-400/30"
                      }`}
                    >
                      Berhalangan Hadir
                    </button>
                  </div>
                </div>

                {rsvpAttending === "yes" && (
                  <div>
                    <label className="block text-amber-200 font-semibold mb-1">
                      Jumlah Tamu (Reservasi Kursi):
                    </label>
                    <select
                      value={rsvpGuestCount}
                      onChange={(e) => setRsvpGuestCount(e.target.value)}
                      className="w-full bg-[#0b2440] border border-sky-400/30 rounded-xl py-2 px-3 text-slate-200 focus:outline-none focus:border-amber-400"
                    >
                      <option value="1">1 Orang Tamu</option>
                      <option value="2">2 Orang Tamu</option>
                      <option value="3">3 Orang Tamu</option>
                      <option value="4">4 Orang Tamu (Keluarga)</option>
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-amber-200 font-semibold mb-1">
                    Doa & Pesan Hangat untuk Mempelai:
                  </label>
                  <textarea
                    rows={3}
                    value={rsvpWishes}
                    onChange={(e) => setRsvpWishes(e.target.value)}
                    placeholder="Tuliskan ucapan selamat atau doa tulus..."
                    className="w-full bg-[#0b2440] border border-sky-400/30 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-amber-400 font-serif"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold tracking-wider uppercase transition shadow-lg flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Konfirmasi Kehadiran</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-amber-400/20 border border-amber-400 flex items-center justify-center mx-auto text-amber-300">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-amber-200 font-serif">
                  Grazie Mille! Konfirmasi Berhasil Tersimpan
                </h4>
                <p className="text-xs text-slate-300 font-sans">
                  Terima kasih atas konfirmasi Anda. Kami tak sabar menyambut Anda di Villa d&apos;Amore!
                </p>
              </div>
            )}
          </div>

          {/* Digital Wedding Gift Accounts */}
          <div className="space-y-4 pt-4 border-t border-amber-400/20 text-center">
            <p className="text-xs sm:text-sm text-slate-300 italic max-w-lg mx-auto font-serif">
              &ldquo;{giftMsg}&rdquo;
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto pt-2 text-left font-sans">
              {/* Bank 1 */}
              <div className="p-4 rounded-2xl bg-[#06182c] border border-amber-400/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300 uppercase">
                    {bank1Name}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyAccount(bank1No, "bank1")}
                    className="inline-flex items-center gap-1 text-[11px] text-sky-300 hover:text-amber-200 font-semibold"
                  >
                    {copiedBank === "bank1" ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Rekening</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-lg font-mono font-bold text-slate-100">
                  {bank1No}
                </p>
                <p className="text-xs text-slate-400">a.n. {bank1Holder}</p>
              </div>

              {/* Bank 2 */}
              <div className="p-4 rounded-2xl bg-[#06182c] border border-sky-400/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-sky-300 uppercase">
                    {bank2Name}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyAccount(bank2No, "bank2")}
                    className="inline-flex items-center gap-1 text-[11px] text-sky-300 hover:text-amber-200 font-semibold"
                  >
                    {copiedBank === "bank2" ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Rekening</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-lg font-mono font-bold text-slate-100">
                  {bank2No}
                </p>
                <p className="text-xs text-slate-400">a.n. {bank2Holder}</p>
              </div>
            </div>
          </div>

          {/* Footer Monogram & Closing */}
          <div className="pt-6 border-t border-sky-400/20 text-center space-y-2">
            <p
              className="text-2xl sm:text-3xl font-bold text-amber-200"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {monogram}
            </p>
            <p className="text-xs font-sans tracking-widest uppercase text-sky-300/80">
              Villa d&apos;Amore • Ravello, Costiera Amalfitana
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export function AmalfiWeddingTemplate(props: TemplateComponentProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#07172b] flex items-center justify-center text-amber-200 font-serif">
          Mempersiapkan Undangan Villa d&apos;Amore...
        </div>
      }
    >
      <AmalfiWeddingTemplateContent {...props} />
    </Suspense>
  );
}

export default AmalfiWeddingTemplate;
