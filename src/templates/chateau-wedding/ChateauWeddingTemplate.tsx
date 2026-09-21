"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import { usePathname } from "next/navigation";
import type { TemplateComponentProps } from "../renderer";
import {
  Crown,
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  Copy,
  Check,
  Send,
  VolumeX,
  Music,
  Wine,
  Utensils,
  Info,
} from "lucide-react";

function ChateauWeddingTemplateContent({
  data,
  className = "",
}: TemplateComponentProps) {
  const pathname = usePathname();
  const isThumbnail = pathname === "/templates";
  const canPlayAudio = !isThumbnail;
  const content = data;

  const [activeSalon, setActiveSalon] = useState<number>(0);
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
  const monogram = String(content.coupleMonogram || "H & C");
  const weddingTitle = String(
    content.weddingTitle || "Le Grand Mariage Royal de Henri & Camille"
  );
  const royalHeader = String(
    content.royalProclamationHeader || "DE PAR LE ROI • PROCLAMATION ROYALE"
  );
  const subtitle = String(
    content.invitationSubtitle ||
      "Dengan Memohon Berkah & Rahmat Illahi, Kami Menitahkan Kehadiran Anda"
  );
  const recipient = String(
    content.recipientName || "Yang Mulia Tamu Undangan Kehormatan"
  );
  const dateStr = String(content.weddingDate || "Minggu, 15 November 2026");
  const timeStr = String(content.weddingTime || "Pukul 10.00 - 23.30 CET");
  const groom = String(content.groomName || "Lord Henri Alexandre de Valois");
  const groomParents = String(
    content.groomParents ||
      "Putra Sulung dari Duc Lorenzo de Valois & Duchesse Vivienne de Montmirail"
  );
  const bride = String(content.brideName || "Lady Camille Geneviève de Bourbon");
  const brideParents = String(
    content.brideParents ||
      "Putri Kedua dari Marquis François de Bourbon & Marquise Hélène de La Tour"
  );
  const verse = String(
    content.sacredVerse ||
      "“Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri...”"
  );

  const storyTitle = String(
    content.storyTitle || "Asmara Dua Hati di Balik Gerbang Versailles"
  );
  const storySubtitle = String(
    content.storySubtitle ||
      "Menyatukan Dua Wangsa di Bawah Kilau Lentera Emas dan Alunan Harpa Prancis"
  );
  const mainMsg = String(
    content.mainMessage ||
      "Pertemuan kami terukir di sebuah malam perayaan di taman air mancur Versailles..."
  );
  const royalAxiom = String(
    content.royalAxiom ||
      "Cinta sejati adalah mahkota tertinggi yang tidak akan pernah pudar oleh pergantian takhta zaman."
  );
  const sender = String(content.senderName || "Henri & Camille");

  // 4 Salons Data
  const salons = [
    {
      time: String(content.salon1Time || "10:00 - 12:00 CET"),
      title: String(
        content.salon1Title || "Salon de Vénus: Pemberkatan & Ikrar Janji Suci"
      ),
      location: String(
        content.salon1Location || "Chapelle Royale, Château de Versailles"
      ),
      desc: String(
        content.salon1Desc ||
          "Upacara sakral pengucapan janji suci di hadapan altar emas berlapis beludru kirmizi..."
      ),
      icon: Crown,
      badge: "Chapelle Royale",
    },
    {
      time: String(content.salon2Time || "16:30 - 18:30 CET"),
      title: String(
        content.salon2Title || "Galerie des Glaces: Pawai Sampanye di Lorong Cermin"
      ),
      location: String(
        content.salon2Location || "La Grande Galerie des Glaces"
      ),
      desc: String(
        content.salon2Desc ||
          "Sambutan kehormatan para bangsawan di lorong cermin kristal legendaris dengan sajian sampanye vintage..."
      ),
      icon: Wine,
      badge: "Hall of Mirrors",
    },
    {
      time: String(content.salon3Time || "19:00 - 21:00 CET"),
      title: String(
        content.salon3Title || "Grand Couvert Royal: Jamuan Makan Malam Kenegaraan"
      ),
      location: String(
        content.salon3Location || "Salon d'Hercule & Grand Vestibule"
      ),
      desc: String(
        content.salon3Desc ||
          "Jamuan makan malam fine dining haute cuisine klasik Prancis di bawah gemerlap 50 chandelier kristal..."
      ),
      icon: Utensils,
      badge: "Grand Couvert",
    },
    {
      time: String(content.salon4Time || "21:00 - Selesai"),
      title: String(
        content.salon4Title || "Parterre d'Eau: Dansa Waltz & Kembang Api Megah"
      ),
      location: String(
        content.salon4Location || "Terrasse du Grand Parterre & Les Fontaines"
      ),
      desc: String(
        content.salon4Desc ||
          "Dansa waltz pertama kedua mempelai diiringi orkestra simfoni kerajaan dan kembang api spektakuler..."
      ),
      icon: Sparkles,
      badge: "Grand Feu d'Artifice",
    },
  ];

  // Logistics Data
  const chateau = String(
    content.chateauName || "Château de Versailles • Domaine Royal"
  );
  const chateauSub = String(
    content.chateauSubname || "Place d'Armes, 78000 Versailles, France"
  );
  const chateauAddr = String(
    content.chateauAddress ||
      "Place d'Armes, 78000 Versailles, Île-de-France, France"
  );
  const carriageProtocol = String(
    content.carriageProtocol ||
      "Tamu kehormatan disambut melalui Grille d'Honneur (Gerbang Kehormatan Utama)..."
  );
  const mapsUrl = String(
    content.mapsUrl || "https://maps.google.com/?q=Château+de+Versailles"
  );

  // Dress Code Data
  const dressTheme = String(
    content.dressCodeTheme || "Black Tie Baroque Elegance • Haute Couture Royale"
  );
  const dressDesc = String(
    content.dressCodeDesc ||
      "Para pria disarankan mengenakan setelan tuxedo hitam klasik atau velvet smoking jacket..."
  );
  const swatch1 = String(
    content.colorSwatch1 || "Imperial Burgundy Velvet (#500724)"
  );
  const swatch2 = String(
    content.colorSwatch2 || "Versailles Gold Leaf (#d4af37)"
  );
  const swatch3 = String(
    content.colorSwatch3 || "Midnight King's Navy (#0f172a)"
  );
  const swatch4 = String(
    content.colorSwatch4 || "Fleur-de-Lis Silk Ivory (#f8fafc)"
  );
  const etiquetteNotes = String(
    content.courtEtiquetteNotes ||
      "Demi menjaga keluhuran suasana istana bersejarah, para tamu dimohon untuk tiba di Grille d'Honneur 30 menit sebelum prosesi dimulai..."
  );

  // Bank Data
  const bank1Name = String(content.bank1Name || "BCA (Bank Central Asia)");
  const bank1No = String(content.bank1AccountNo || "8820912411");
  const bank1Holder = String(
    content.bank1Holder || "Lord Henri Alexandre de Valois"
  );
  const bank2Name = String(content.bank2Name || "Bank Mandiri");
  const bank2No = String(content.bank2AccountNo || "1370098231044");
  const bank2Holder = String(
    content.bank2Holder || "Lady Camille Geneviève de Bourbon"
  );
  const giftMsg = String(
    content.giftMessage ||
      "Kehadiran dan doa restu Yang Terhormat adalah anugerah terbesar dalam penyatuan suci wangsa kami..."
  );
  const rsvpDeadline = String(
    content.rsvpDeadline || "Mohon konfirmasi kehadiran sebelum 20 Oktober 2026"
  );

  const primaryCol = String(content.primaryColor || "#d4af37");
  const secondaryCol = String(content.secondaryColor || "#991b1b");
  const musicUrl = String(
    content.musicTrack ||
      "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c89b7b9cf4.mp3?filename=celestial-music-box-waltz-10928.mp3"
  );

  return (
    <div
      className={`min-h-screen bg-[#180309] text-[#fbf7f4] relative overflow-hidden font-serif selection:bg-amber-500 selection:text-black ${className}`}
      style={{
        backgroundImage: `
          radial-gradient(ellipse 80% 50% at 50% -10%, ${secondaryCol}35, transparent),
          radial-gradient(circle at 15% 45%, rgba(60, 8, 22, 0.6), transparent),
          radial-gradient(circle at 85% 75%, ${primaryCol}18, transparent)
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
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#2a0611]/90 backdrop-blur-md border border-amber-400/50 text-amber-300 hover:text-amber-100 hover:border-amber-300 shadow-2xl transition-all duration-300 group hover:scale-105"
            title={isPlaying ? "Jeda Simfoni Istana" : "Putar Simfoni Istana"}
          >
            {isPlaying ? (
              <>
                <Music className="w-4 h-4 text-amber-300 animate-pulse" />
                <span className="text-xs font-sans tracking-widest uppercase font-semibold">
                  Waltz Versailles
                </span>
                <span className="flex space-x-1 items-end h-3">
                  <span className="w-0.5 h-3 bg-amber-400 animate-bounce" />
                  <span className="w-0.5 h-2 bg-rose-400 animate-bounce delay-100" />
                  <span className="w-0.5 h-3 bg-amber-400 animate-bounce delay-200" />
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-amber-400/70 group-hover:text-amber-300" />
                <span className="text-xs font-sans tracking-widest uppercase font-semibold">
                  Putar Simfoni
                </span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Decorative French Rococo Boiserie Pattern Background */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px),radial-gradient(#991b1b_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [background-position:0_0,1.75rem_1.75rem]" />

      <main className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        {/* ============================================================
            SECTION 1: ROYAL PROCLAMATION & HERALDIC MONOGRAM
        ============================================================ */}
        <section className="relative rounded-3xl p-6 sm:p-12 border-2 border-amber-400/40 bg-[#25050f]/90 backdrop-blur-md shadow-2xl overflow-hidden text-center space-y-6">
          {/* Rococo Corner Ornaments */}
          <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-amber-400/70 rounded-tl-lg pointer-events-none" />
          <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-amber-400/70 rounded-tr-lg pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-amber-400/70 rounded-bl-lg pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-amber-400/70 rounded-br-lg pointer-events-none" />

          {/* Crown & Heraldic Sovereign Monogram */}
          <div className="inline-flex flex-col items-center justify-center">
            <div className="p-2.5 rounded-full bg-amber-500/10 border border-amber-400/40 text-amber-300 mb-1">
              <Crown className="w-8 h-8 text-amber-400" />
            </div>
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-amber-400/60 bg-gradient-to-b from-amber-500/15 via-[#3d0817]/90 to-[#1e030b] flex items-center justify-center p-2 shadow-inner">
              <span
                className="text-3xl sm:text-4xl font-extrabold text-amber-200 tracking-wider"
                style={{ fontFamily: "'Cinzel Decorative', 'Playfair Display', serif" }}
              >
                {monogram}
              </span>
            </div>
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mt-2" />
          </div>

          <div className="space-y-2 max-w-2xl mx-auto">
            <p className="text-xs sm:text-sm font-sans tracking-widest uppercase text-amber-400 font-bold">
              {royalHeader}
            </p>
            <h1
              className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-300"
              style={{ fontFamily: "'Cinzel', 'Playfair Display', serif" }}
            >
              {weddingTitle}
            </h1>
            <p className="text-xs sm:text-sm text-amber-200/90 italic">
              {subtitle}
            </p>
          </div>

          {/* Honored Guest Badge */}
          <div className="inline-block px-5 py-2 rounded-full bg-amber-950/60 border border-amber-400/40 text-amber-200 text-xs sm:text-sm font-sans tracking-wider shadow-md">
            Menitahkan Kehadiran: <span className="font-bold text-amber-100">{recipient}</span>
          </div>

          {/* Bride & Groom Noble Presentation Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 text-center">
            <div className="p-6 rounded-2xl bg-[#1a030a]/80 border border-amber-400/30 space-y-2 shadow-lg">
              <span className="text-xs font-sans tracking-widest uppercase text-amber-400/90 font-semibold">
                Mempelai Pria Bangsawan
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-amber-100">
                {groom}
              </h2>
              <p className="text-xs text-amber-100/80 leading-relaxed font-sans">
                {groomParents}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#1a030a]/80 border border-amber-400/30 space-y-2 shadow-lg">
              <span className="text-xs font-sans tracking-widest uppercase text-amber-400/90 font-semibold">
                Mempelai Wanita Bangsawan
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-amber-100">
                {bride}
              </h2>
              <p className="text-xs text-amber-100/80 leading-relaxed font-sans">
                {brideParents}
              </p>
            </div>
          </div>

          {/* Sacred Verse / Quote */}
          <div className="pt-2 max-w-2xl mx-auto">
            <p className="text-xs sm:text-sm italic text-amber-100/85 leading-relaxed font-serif">
              {verse}
            </p>
          </div>

          {/* Date & Time Badges */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-sans">
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#180309] border border-amber-400/40 text-amber-200 font-semibold shadow-inner">
              <Calendar className="w-4 h-4 text-amber-400" />
              {dateStr}
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#180309] border border-amber-400/40 text-amber-200 font-semibold shadow-inner">
              <Clock className="w-4 h-4 text-amber-400" />
              {timeStr}
            </span>
          </div>
        </section>

        {/* ============================================================
            SECTION 2: THE ROYAL COURT CHRONICLE (ASMARA ISTANA)
        ============================================================ */}
        <section className="relative rounded-3xl p-6 sm:p-10 border border-amber-400/30 bg-[#24050f]/90 backdrop-blur-md shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-amber-400/20 pb-4">
            <div className="space-y-1">
              <span className="text-xs font-sans uppercase tracking-widest text-amber-400 font-semibold flex items-center gap-1.5">
                <Crown className="w-4 h-4 text-amber-400" />
                The Royal Court Chronicle
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-amber-100">
                {storyTitle}
              </h2>
            </div>
            <span className="text-xs text-amber-300/80 font-mono hidden sm:inline-block">
              Versailles Estate
            </span>
          </div>

          <p className="text-xs sm:text-sm italic text-amber-200/90 font-serif">
            &ldquo;{storySubtitle}&rdquo;
          </p>

          <div className="text-base sm:text-lg leading-relaxed text-amber-50/90 whitespace-pre-line font-serif space-y-4">
            {mainMsg}
          </div>

          {/* Royal Axiom Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/60 via-[#1a040b] to-rose-950/60 border-l-4 border-amber-400 text-amber-200/95 italic text-sm sm:text-base flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-300 text-xs font-sans tracking-widest uppercase mb-1">
                Maxime d&apos;Amour Royal:
              </p>
              &ldquo;{royalAxiom}&rdquo;
            </div>
          </div>

          <div className="pt-2 flex justify-end text-right">
            <div>
              <p className="text-xs font-sans tracking-widest uppercase text-amber-400/80">
                Signature des Époux (Tanda Tangan Pengantin),
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
            SECTION 3: 4 GRAND SALONS (LES 4 GRANDS SALONS)
        ============================================================ */}
        <section className="relative rounded-3xl p-6 sm:p-10 border border-amber-400/30 bg-[#1c040b]/90 backdrop-blur-md shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-sans tracking-widest uppercase text-amber-400 font-semibold">
              Les 4 Grands Salons de Versailles
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-100 tracking-wide">
              Empat Paviliun Perayaan Istana
            </h2>
            <p className="text-xs sm:text-sm text-amber-200/70 max-w-lg mx-auto">
              Jelajahi rangkaian prosesi agung yang bertempat di aula dan paviliun kemuliaan istana kerajaan.
            </p>
          </div>

          {/* 4 Interactive Salon Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {salons.map((salon, idx) => {
              const IconComp = salon.icon;
              const isActive = activeSalon === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveSalon(idx)}
                  className={`p-3 sm:p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between ${
                    isActive
                      ? "bg-[#330816] border-amber-400 ring-2 ring-amber-400/30 shadow-xl scale-[1.02]"
                      : "bg-[#140207]/70 border-amber-500/20 hover:bg-[#20050e] hover:border-amber-400/40"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                        isActive
                          ? "bg-amber-400 text-slate-950 font-bold"
                          : "bg-amber-950 text-amber-300"
                      }`}
                    >
                      {salon.badge}
                    </span>
                    <IconComp
                      className={`w-4 h-4 ${
                        isActive ? "text-amber-300" : "text-amber-400/60"
                      }`}
                    />
                  </div>
                  <div>
                    <p className="text-[11px] font-mono text-amber-300/80">
                      {salon.time.split(" ")[0]}
                    </p>
                    <p
                      className={`text-xs font-bold line-clamp-1 mt-0.5 ${
                        isActive ? "text-amber-100" : "text-amber-200/80"
                      }`}
                    >
                      {salon.title.split(":")[1] || salon.title}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Salon Detailed Card */}
          {(() => {
            const cur = salons[activeSalon];
            const CurIcon = cur.icon;
            return (
              <div className="rounded-2xl p-6 sm:p-8 border border-amber-400/40 bg-gradient-to-br from-[#2a0611] via-[#20040d] to-[#140207] space-y-4 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-400/20 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-400/30 text-amber-300">
                      <CurIcon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-amber-100">
                        {cur.title}
                      </h3>
                      <p className="text-xs font-mono text-amber-300 mt-0.5 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {cur.time}
                      </p>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-xs text-amber-200 bg-amber-950/60 px-3 py-1.5 rounded-full border border-amber-400/30 self-start sm:self-auto">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{cur.location}</span>
                  </div>
                </div>

                <p className="text-sm sm:text-base leading-relaxed text-amber-50/90 whitespace-pre-line font-serif">
                  {cur.desc}
                </p>
              </div>
            );
          })()}
        </section>

        {/* ============================================================
            SECTION 4: LOGISTICS & CARRIAGE ROUTE (LOKASI ISTANA)
        ============================================================ */}
        <section className="relative rounded-3xl p-6 sm:p-10 border border-amber-400/30 bg-[#25050f]/90 backdrop-blur-md shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-400/20 pb-4">
            <div className="space-y-1">
              <span className="text-xs font-sans tracking-widest uppercase text-amber-400 font-semibold flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-400" />
                Domaine Royal & Navigasi Kereta Kencana
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-amber-100">
                {chateau}
              </h2>
              <p className="text-xs text-amber-200/80 font-mono">{chateauSub}</p>
            </div>

            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-sans font-bold uppercase tracking-wider shadow-lg transition-all hover:scale-105 self-start sm:self-auto"
            >
              <span>Petunjuk Rute Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-sans">
            <div className="p-4 rounded-2xl bg-[#17030a]/80 border border-amber-400/20 space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-amber-400/80 font-semibold">
                Alamat Gerbang Kehormatan
              </span>
              <p className="text-amber-50 font-medium">{chateauAddr}</p>
            </div>

            <div className="p-4 rounded-2xl bg-[#17030a]/80 border border-amber-400/20 space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-amber-400/80 font-semibold">
                Protokol Kereta & Kendaraan
              </span>
              <p className="text-amber-100/90 text-xs leading-relaxed">
                {carriageProtocol}
              </p>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 5: NOBLE ETIQUETTE & HAUTE COUTURE DRESS CODE
        ============================================================ */}
        <section className="relative rounded-3xl p-6 sm:p-10 border border-amber-400/30 bg-[#1c040b]/90 backdrop-blur-md shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-sans tracking-widest uppercase text-amber-400 font-semibold">
              Étiquette de la Cour & Attire
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-100 tracking-wide">
              {dressTheme}
            </h2>
            <p className="text-xs sm:text-sm text-amber-100/85 max-w-xl mx-auto leading-relaxed">
              {dressDesc}
            </p>
          </div>

          {/* 4 Swatch Palette Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: swatch1, hex: "#500724", name: "Imperial Burgundy" },
              { label: swatch2, hex: "#d4af37", name: "Versailles Gold Leaf" },
              { label: swatch3, hex: "#0f172a", name: "Midnight King's Navy" },
              { label: swatch4, hex: "#f8fafc", name: "Fleur-de-Lis Ivory" },
            ].map((swatch, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-[#140207] border border-amber-400/25 text-center space-y-2 shadow-md"
              >
                <div
                  className="w-full h-10 rounded-xl shadow-inner border border-amber-400/30"
                  style={{ backgroundColor: swatch.hex }}
                />
                <div>
                  <p className="text-xs font-bold text-amber-100">
                    {swatch.name}
                  </p>
                  <p className="text-[10px] font-mono text-amber-400/70">
                    {swatch.hex}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Court Etiquette Advisory */}
          <div className="p-4 rounded-2xl bg-[#140207]/90 border border-amber-400/30 flex items-start gap-3 text-xs text-amber-100/95 font-sans shadow-md">
            <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p>{etiquetteNotes}</p>
          </div>
        </section>

        {/* ============================================================
            SECTION 6: ROYAL RSVP & DIGITAL VAULT OF BLESSINGS
        ============================================================ */}
        <section className="relative rounded-3xl p-6 sm:p-10 border-2 border-amber-400/40 bg-gradient-to-b from-[#2b0612] via-[#20040d] to-[#120207] backdrop-blur-md shadow-2xl space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-sans tracking-widest uppercase text-amber-400 font-semibold">
              RSVP de la Cour & Tanda Kasih Kerajaan
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-100 tracking-wide">
              Konfirmasi Kehadiran & Doa Restu
            </h2>
            <p className="text-xs sm:text-sm text-amber-300/80 font-mono">
              {rsvpDeadline}
            </p>
          </div>

          {/* Interactive Royal RSVP Form Simulation */}
          <div className="max-w-xl mx-auto p-6 rounded-2xl bg-[#140207]/95 border border-amber-400/40 space-y-4 shadow-xl">
            {!rsvpSubmitted ? (
              <form onSubmit={handleRsvpSubmit} className="space-y-4 font-sans text-xs">
                <div>
                  <label className="block text-amber-200 font-semibold mb-2">
                    Apakah Anda akan berkenan hadir di perayaan agung kami?
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRsvpAttending("yes")}
                      className={`py-2 px-3 rounded-xl border font-medium text-center transition ${
                        rsvpAttending === "yes"
                          ? "bg-amber-400 text-slate-950 border-amber-300 font-bold shadow-md"
                          : "bg-[#25050f] text-amber-200 border-amber-400/30"
                      }`}
                    >
                      Oui, Hadir Penuh Kehormatan
                    </button>
                    <button
                      type="button"
                      onClick={() => setRsvpAttending("no")}
                      className={`py-2 px-3 rounded-xl border font-medium text-center transition ${
                        rsvpAttending === "no"
                          ? "bg-rose-600 text-white border-rose-400 font-bold shadow-md"
                          : "bg-[#25050f] text-amber-200 border-amber-400/30"
                      }`}
                    >
                      Berhalangan Hadir
                    </button>
                  </div>
                </div>

                {rsvpAttending === "yes" && (
                  <div>
                    <label className="block text-amber-200 font-semibold mb-1">
                      Jumlah Kursi Kehormatan (Reservasi Meja):
                    </label>
                    <select
                      value={rsvpGuestCount}
                      onChange={(e) => setRsvpGuestCount(e.target.value)}
                      className="w-full bg-[#25050f] border border-amber-400/40 rounded-xl py-2 px-3 text-amber-100 focus:outline-none focus:border-amber-300"
                    >
                      <option value="1">1 Kursi Kehormatan</option>
                      <option value="2">2 Kursi Kehormatan</option>
                      <option value="3">3 Kursi Kehormatan</option>
                      <option value="4">4 Kursi Kehormatan (Rombongan)</option>
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-amber-200 font-semibold mb-1">
                    Doa & Titah Ucapan Selamat untuk Mempelai:
                  </label>
                  <textarea
                    rows={3}
                    value={rsvpWishes}
                    onChange={(e) => setRsvpWishes(e.target.value)}
                    placeholder="Tuliskan titah doa restu kehormatan..."
                    className="w-full bg-[#25050f] border border-amber-400/40 rounded-xl p-3 text-amber-100 focus:outline-none focus:border-amber-300 font-serif"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold tracking-wider uppercase transition shadow-lg flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirimkan Konfirmasi Kerajaan</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-amber-400/20 border border-amber-400 flex items-center justify-center mx-auto text-amber-300">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-amber-200 font-serif">
                  Merci Infiniment! Konfirmasi Kehormatan Telah Diterima
                </h4>
                <p className="text-xs text-amber-100/80 font-sans">
                  Suatu kehormatan besar bagi kami untuk menyambut Yang Mulia di Château de Versailles!
                </p>
              </div>
            )}
          </div>

          {/* Digital Wedding Gift Accounts */}
          <div className="space-y-4 pt-4 border-t border-amber-400/30 text-center">
            <p className="text-xs sm:text-sm text-amber-200/90 italic max-w-lg mx-auto font-serif">
              &ldquo;{giftMsg}&rdquo;
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto pt-2 text-left font-sans">
              {/* Bank 1 */}
              <div className="p-4 rounded-2xl bg-[#140207] border border-amber-400/40 space-y-2 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300 uppercase">
                    {bank1Name}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyAccount(bank1No, "bank1")}
                    className="inline-flex items-center gap-1 text-[11px] text-amber-300 hover:text-amber-100 font-semibold"
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
                <p className="text-lg font-mono font-bold text-amber-100">
                  {bank1No}
                </p>
                <p className="text-xs text-amber-400/70">a.n. {bank1Holder}</p>
              </div>

              {/* Bank 2 */}
              <div className="p-4 rounded-2xl bg-[#140207] border border-amber-400/40 space-y-2 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-300 uppercase">
                    {bank2Name}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyAccount(bank2No, "bank2")}
                    className="inline-flex items-center gap-1 text-[11px] text-amber-300 hover:text-amber-100 font-semibold"
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
                <p className="text-lg font-mono font-bold text-amber-100">
                  {bank2No}
                </p>
                <p className="text-xs text-amber-400/70">a.n. {bank2Holder}</p>
              </div>
            </div>
          </div>

          {/* Footer Monogram & Closing */}
          <div className="pt-6 border-t border-amber-400/20 text-center space-y-2">
            <p
              className="text-2xl sm:text-3xl font-bold text-amber-200"
              style={{ fontFamily: "'Cinzel Decorative', serif" }}
            >
              {monogram}
            </p>
            <p className="text-xs font-sans tracking-widest uppercase text-amber-400/80">
              Château de Versailles • Domaine Royal de France
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export function ChateauWeddingTemplate(props: TemplateComponentProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#180309] flex items-center justify-center text-amber-200 font-serif">
          Mempersiapkan Titah Perayaan Château de Versailles...
        </div>
      }
    >
      <ChateauWeddingTemplateContent {...props} />
    </Suspense>
  );
}

export default ChateauWeddingTemplate;
