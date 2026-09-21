"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import { usePathname } from "next/navigation";
import type { TemplateComponentProps } from "../renderer";
import {
  Music,
  VolumeX,
  Sparkles,
  Feather,
  CheckCircle,
  Play,
  RotateCcw,
} from "lucide-react";

function SymphonyLoveTemplateContent({
  data,
  className = "",
}: TemplateComponentProps) {
  const pathname = usePathname();
  const isThumbnail = pathname === "/templates";
  const canPlayAudio = !isThumbnail;
  const content = data;

  const [activeMovement, setActiveMovement] = useState<number>(0);
  const [isCadencePlayed, setIsCadencePlayed] = useState<boolean>(false);
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

  const handlePlayCadence = () => {
    setIsCadencePlayed(true);
  };

  // Safe fallback values
  const opusNo = String(content.opusNo || "OPUS N°24 IN C-SHARP MINOR");
  const scoreTitle = String(
    content.scoreTitle || "L'AMOUR ÉTERNEL: CONCERTO DI DUE ANIME"
  );
  const tempo = String(
    content.tempoMarking || "Adagio con Amore e Molto Espressivo (♩ = 60)"
  );
  const keySig = String(
    content.keySignature ||
      "4 Sharps (F# - C# - G# - D#) • Simfoni Empat Musim Jiwa"
  );
  const recipient = String(
    content.recipientName || "Éléonore Vivienne de Chantal"
  );
  const sender = String(
    content.senderName || "Maestro Julian de Saint-Germain"
  );
  const dedication = String(
    content.dedicationText ||
      "Dédié avec toute la dévotion de mon âme à ma muse éternelle"
  );

  // Image URLs
  const museImg = String(
    content.musePhotoUrl ||
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80"
  );
  const pianoImg = String(
    content.pianoScorePhotoUrl ||
      "https://images.unsplash.com/photo-1520523839898-50712825e617?auto=format&fit=crop&w=1200&q=80"
  );

  const soliloquyTitle = String(
    content.soliloquyTitle || "Solilokui Malam di Balik Tuts Grand Piano"
  );
  const soliloquyTime = String(
    content.soliloquyTime ||
      "Tengah Malam • Pukul 02:15 di Bawah Temaram Lilin Salon Musik"
  );
  const mainMsg = String(
    content.mainMessage ||
      "Éléonore yang teramat kucintai,\n\nSeorang komposer menghabiskan seluruh umurnya merangkai sunyi menjadi nada..."
  );
  const axiom = String(
    content.musicalAxiom ||
      "Musik dimulai di saat kata-kata tak lagi sanggup mengucapkannya, dan cintaku padamu bernyanyi di saat alam semesta kehabisan bahasa."
  );
  const signatureTitle = String(
    content.composerSignatureTitle ||
      "Komposer yang Seluruh Detak Nadanya Beresonansi Untukmu,"
  );

  // 4 Movements Data
  const movements = [
    {
      tempo: String(content.movement1Tempo || "Movement I: Allegro Vivace • 3/4 Time"),
      title: String(content.movement1Title || "Detak Awal Resonansi Pertemuan"),
      desc: String(
        content.movement1Desc ||
          "Petikan akord riang yang berderap cepat seperti jantung yang berdegup kencang saat mata kita pertama kali bersua..."
      ),
      dynamic: String(
        content.movement1Dynamic || "Crescendo di Gioia (Sukacita yang Terus Bertumbuh)"
      ),
      badge: "Allegro",
      clef: "𝄞",
    },
    {
      tempo: String(content.movement2Tempo || "Movement II: Andante Cantabile • 4/4 Time"),
      title: String(content.movement2Title || "Bisikan Harmoni Sunyi di Larut Malam"),
      desc: String(
        content.movement2Desc ||
          "Melodi lambat nan menghanyutkan dimainkan dalam keheningan solo cello dan piano..."
      ),
      dynamic: String(
        content.movement2Dynamic || "Pianissimo con Tenerezza (Kelembutan Penuh Ketulusan)"
      ),
      badge: "Andante",
      clef: "𝄢",
    },
    {
      tempo: String(content.movement3Tempo || "Movement III: Scherzo con Brio • 6/8 Time"),
      title: String(content.movement3Title || "Tawa & Gelak Canda Menembus Badai"),
      desc: String(
        content.movement3Desc ||
          "Irama dansa waltz penuh warna yang melambangkan hari-hari penuh tawa..."
      ),
      dynamic: String(
        content.movement3Dynamic || "Leggiero e Brillante (Ringan, Hangat, & Bercahaya)"
      ),
      badge: "Scherzo",
      clef: "𝄞",
    },
    {
      tempo: String(content.movement4Tempo || "Movement IV: Finale Maestoso • All'Unisono"),
      title: String(content.movement4Title || "Akord Puncak Perjanjian Keabadian"),
      desc: String(
        content.movement4Desc ||
          "Puncak simfoni di mana seluruh instrumen berdentang serentak dalam satu harmoni agung..."
      ),
      dynamic: String(
        content.movement4Dynamic || "Fortissimo Sforzando (Kekuatan Cinta Paling Kokoh)"
      ),
      badge: "Finale",
      clef: "𝄢",
    },
  ];

  // 4 Instruments Data
  const instruments = [
    {
      name: String(content.instrument1Name || "The Concert Grand Piano (Piano Sayap Emas)"),
      role: String(content.instrument1Role || "Pondasi Harmoni & Rumah Seluruh Nada Jiwa"),
      desc: String(
        content.instrument1Desc ||
          "Tuts gading dan kayu mahoni yang menopang seluruh dinamika simfoni cinta kita..."
      ),
      symbol: "🎹",
    },
    {
      name: String(content.instrument2Name || "The Stradivarius Cello (Selo Akustik Hangat)"),
      role: String(content.instrument2Role || "Resonansi Dekapan & Ketenangan Batin"),
      desc: String(
        content.instrument2Desc ||
          "Gesekan senar bas yang dalam dan hangat, bagaikan dekapan lengan yang selalu siap menyambut kepulanganmu..."
      ),
      symbol: "🎻",
    },
    {
      name: String(content.instrument3Name || "The Concert Harp (Harpa Kristal Langit)"),
      role: String(content.instrument3Role || "Petikan Doa Suci & Kemilau Impian Masa Depan"),
      desc: String(
        content.instrument3Desc ||
          "Untaian dawai emas yang dipetik perlahan menghasilkan gemerlap nada bagai bintang jatuh..."
      ),
      symbol: "🎶",
    },
    {
      name: String(content.instrument4Name || "The Silver Concert Flute (Seruling Perak)"),
      role: String(content.instrument4Role || "Embusan Angin Kesejukan yang Meredakan Gundah"),
      desc: String(
        content.instrument4Desc ||
          "Tiupan melodi perak yang melayang ringan di udara, mengingatkanku pada hembusan nafasmu saat tertidur lelap..."
      ),
      symbol: "🎵",
    },
  ];

  // Harmonics Data
  const freq = String(
    content.tuningFrequency || "432 Hz • Natural Harmonic Resonance of Love"
  );
  const dynamics = String(
    content.dynamicRange || "Pianissimo (Bisikan Rindu) hingga Fortissimo (Pelukan Utuh)"
  );
  const resonance = String(
    content.acousticResonance || "Dua Hati yang Saling Memahami Tanpa Butuh Banyak Kata"
  );
  const codaState = String(
    content.codaStatus || "Da Capo al Infinito • Nada Abadi Tanpa Garis Akhir"
  );
  const covenantTitle = String(
    content.covenantTitle || "The Composer's Sacred Covenant (Ikrar Harmoni Abadi)"
  );
  const covenantText = String(
    content.covenantText ||
      "Di hadapan keindahan seni nada dan di bawah naungan harmoni alam semesta..."
  );

  // Section 6 Data
  const cadenceBtn = String(
    content.cadenceButtonText || "Dentangkan Akord Cinta Terakhir (Play Final Cadence)"
  );
  const secretCoda = String(
    content.secretCodaMessage ||
      "Jika suatu saat seluruh partitur di dunia terbakar dan hening menyelimuti bumi, dengarkanlah detak dadaku..."
  );
  const closingQuote = String(
    content.scoreClosingQuote ||
      "Finis coronat opus • Melodi ini selesai ditulis, namun cinta kita tak akan pernah berakhir."
  );

  const primaryCol = String(content.primaryColor || "#d4af37");
  const secondaryCol = String(content.secondaryColor || "#b45309");
  const musicUrl = String(
    content.musicTrack ||
      "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c89b7b9cf4.mp3?filename=celestial-music-box-waltz-10928.mp3"
  );

  return (
    <div
      className={`min-h-screen bg-[#110b09] text-[#f7eee4] relative overflow-hidden font-serif selection:bg-amber-500 selection:text-black ${className}`}
      style={{
        backgroundImage: `
          radial-gradient(ellipse 75% 45% at 50% -10%, ${secondaryCol}30, transparent),
          radial-gradient(circle at 15% 40%, rgba(50, 25, 15, 0.5), transparent),
          radial-gradient(circle at 85% 70%, ${primaryCol}18, transparent)
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
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#1e130e]/95 backdrop-blur-md border border-amber-400/50 text-amber-300 hover:text-amber-100 hover:border-amber-300 shadow-2xl transition-all duration-300 group hover:scale-105"
            title={isPlaying ? "Jeda Simfoni Piano" : "Putar Simfoni Piano"}
          >
            {isPlaying ? (
              <>
                <Music className="w-4 h-4 text-amber-300 animate-pulse" />
                <span className="text-xs font-sans tracking-widest uppercase font-semibold">
                  Simfoni Cinta
                </span>
                <span className="flex space-x-1 items-end h-3">
                  <span className="w-0.5 h-3 bg-amber-400 animate-bounce" />
                  <span className="w-0.5 h-2 bg-amber-500 animate-bounce delay-100" />
                  <span className="w-0.5 h-3 bg-amber-300 animate-bounce delay-200" />
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

      {/* Decorative Musical Stave Lines (Pentagram) in Background */}
      <div className="absolute inset-0 pointer-events-none opacity-10 flex flex-col justify-around">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-1.5 w-full">
            <div className="h-[1px] bg-amber-400/30 w-full" />
            <div className="h-[1px] bg-amber-400/30 w-full" />
            <div className="h-[1px] bg-amber-400/30 w-full" />
            <div className="h-[1px] bg-amber-400/30 w-full" />
            <div className="h-[1px] bg-amber-400/30 w-full" />
          </div>
        ))}
      </div>

      <main className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        {/* ============================================================
            SECTION 1: THE OPUS SCORE TITLE PAGE & MUSE PORTRAIT
        ============================================================ */}
        <section className="relative rounded-3xl p-6 sm:p-12 border-2 border-amber-400/40 bg-[#1c120c]/90 backdrop-blur-md shadow-2xl overflow-hidden space-y-8 text-center">
          {/* Ornate Clef Watermark */}
          <div className="absolute top-4 left-4 text-4xl text-amber-400/20 font-serif select-none pointer-events-none">
            𝄞
          </div>
          <div className="absolute top-4 right-4 text-4xl text-amber-400/20 font-serif select-none pointer-events-none">
            𝄢
          </div>

          {/* Header Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/40 bg-amber-950/40 text-amber-300 text-xs tracking-widest font-sans uppercase">
            <Music className="w-3.5 h-3.5 text-amber-400" />
            <span>{opusNo}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>{tempo}</span>
          </div>

          <div className="space-y-3 max-w-2xl mx-auto">
            <h1
              className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-300 uppercase"
              style={{ fontFamily: "'Cinzel', 'Playfair Display', serif" }}
            >
              {scoreTitle}
            </h1>
            <p className="text-xs sm:text-sm font-sans tracking-wider text-amber-200/80 font-medium">
              {keySig}
            </p>
            <p className="text-sm sm:text-base italic text-amber-100/90 max-w-xl mx-auto font-serif">
              &ldquo;{dedication}&rdquo;
            </p>
          </div>

          {/* VISUAL IMAGE SHOWCASE: Muse Portrait & Piano Salon */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 max-w-3xl mx-auto">
            {/* Muse Portrait Frame */}
            {museImg && (
              <div className="relative group rounded-2xl p-3 border-2 border-amber-400/50 bg-[#140b07] shadow-xl overflow-hidden flex flex-col items-center">
                <div className="w-full h-64 sm:h-72 rounded-xl overflow-hidden relative">
                  <img
                    src={museImg}
                    alt={recipient}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#140b07] via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-3 inset-x-3 text-center">
                    <span className="text-[10px] font-sans tracking-widest uppercase text-amber-300 font-bold block">
                      Sang Muse Abadi
                    </span>
                    <p className="text-base font-bold text-amber-100 font-serif">
                      {recipient}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Piano Salon & Atmosphere Frame */}
            {pianoImg && (
              <div className="relative group rounded-2xl p-3 border-2 border-amber-400/30 bg-[#140b07] shadow-xl overflow-hidden flex flex-col items-center">
                <div className="w-full h-64 sm:h-72 rounded-xl overflow-hidden relative">
                  <img
                    src={pianoImg}
                    alt="Grand Piano Salon"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#140b07] via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-3 inset-x-3 text-center">
                    <span className="text-[10px] font-sans tracking-widest uppercase text-amber-400/90 font-bold block">
                      Maestro Komposer
                    </span>
                    <p className="text-base font-bold text-amber-100 font-serif">
                      {sender}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ============================================================
            SECTION 2: THE COMPOSER'S MIDNIGHT SOLILOQUY (WARKAH UTAMA)
        ============================================================ */}
        <section className="relative rounded-3xl p-6 sm:p-10 border border-amber-400/30 bg-[#1a100b]/90 backdrop-blur-md shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-amber-400/20 pb-4 gap-2">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-300">
                <Feather className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-amber-100">
                  {soliloquyTitle}
                </h2>
                <p className="text-xs font-mono text-amber-300/70">
                  {soliloquyTime}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-amber-300 font-sans tracking-wider uppercase bg-amber-950/40 px-3 py-1 rounded-full border border-amber-400/30 self-start sm:self-auto">
              <span>Manoscritto Originale</span>
            </div>
          </div>

          {/* Letter Body with Vintage Drop-cap */}
          <div className="text-base sm:text-lg leading-relaxed text-amber-50/90 whitespace-pre-line font-serif space-y-4">
            {mainMsg}
          </div>

          {/* Musical Axiom Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/50 via-[#120a06] to-amber-900/30 border-l-4 border-amber-400 text-amber-200/95 italic text-sm sm:text-base flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-300 text-xs font-sans tracking-widest uppercase mb-1">
                Aksioma Filosofis Musik & Cinta:
              </p>
              &ldquo;{axiom}&rdquo;
            </div>
          </div>

          {/* Composer's Signature */}
          <div className="pt-4 border-t border-amber-400/20 flex flex-col items-end text-right">
            <p className="text-xs font-sans tracking-widest uppercase text-amber-400/80">
              {signatureTitle}
            </p>
            <p
              className="text-xl sm:text-2xl font-bold text-amber-200 mt-1"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              {sender}
            </p>
            <span className="text-[11px] text-amber-400/60 font-mono mt-0.5">
              Con Tutta l&apos;Anima • Da Capo al Fine
            </span>
          </div>
        </section>

        {/* ============================================================
            SECTION 3: 4 MOVEMENTS OF OUR SYMPHONY (GERAKAN SIMFONI)
        ============================================================ */}
        <section className="relative rounded-3xl p-6 sm:p-10 border border-amber-400/30 bg-[#150d09]/90 backdrop-blur-md shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-sans tracking-widest uppercase text-amber-400 font-semibold">
              I Quattro Movimenti della Sinfonia
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-100 tracking-wide">
              Empat Gerakan Simfoni Cinta Kita
            </h2>
            <p className="text-xs sm:text-sm text-amber-200/70 max-w-lg mx-auto">
              Perjalanan cinta dua jiwa yang digubah dalam empat babak orkestrasi agung.
            </p>
          </div>

          {/* 4 Interactive Movement Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            {movements.map((mov, idx) => {
              const isActive = activeMovement === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveMovement(idx)}
                  className={`p-3 sm:p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between ${
                    isActive
                      ? "bg-[#2c1910] border-amber-400 ring-2 ring-amber-400/30 shadow-xl scale-[1.02]"
                      : "bg-[#100805]/70 border-amber-500/20 hover:bg-[#1a0f0a] hover:border-amber-400/40"
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
                      {mov.badge}
                    </span>
                    <span className="text-lg text-amber-400/70 font-serif">
                      {mov.clef}
                    </span>
                  </div>
                  <div>
                    <p className="text-[11px] font-mono text-amber-300/80">
                      {mov.tempo.split("•")[0]}
                    </p>
                    <p
                      className={`text-xs font-bold line-clamp-1 mt-0.5 ${
                        isActive ? "text-amber-100" : "text-amber-200/80"
                      }`}
                    >
                      {mov.title}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Movement Detailed Card */}
          {(() => {
            const cur = movements[activeMovement];
            return (
              <div className="rounded-2xl p-6 sm:p-8 border border-amber-400/40 bg-gradient-to-br from-[#26150e] via-[#1a0e09] to-[#110805] space-y-4 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-400/20 pb-4">
                  <div>
                    <span className="text-xs font-mono text-amber-400 uppercase tracking-wider block">
                      {cur.tempo}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-amber-100 mt-0.5">
                      {cur.title}
                    </h3>
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-xs text-amber-200 bg-amber-950/60 px-3.5 py-1.5 rounded-full border border-amber-400/30 self-start sm:self-auto">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>{cur.dynamic}</span>
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
            SECTION 4: 4 INSTRUMENTS OF DEVOTION (INSTRUMEN HARMONI)
        ============================================================ */}
        <section className="relative rounded-3xl p-6 sm:p-10 border border-amber-400/30 bg-[#1c120c]/90 backdrop-blur-md shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-sans tracking-widest uppercase text-amber-400 font-semibold">
              Gli Strumenti dell&apos;Anima
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-100 tracking-wide">
              Empat Instrumen Harmoni Jiwa
            </h2>
            <p className="text-xs sm:text-sm text-amber-200/70 max-w-lg mx-auto">
              Karakter instrumen musik klasik yang merajut dimensi cinta dan kesetiaan kita.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {instruments.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-amber-400/25 bg-[#120a06]/85 hover:border-amber-400/50 transition-all duration-300 space-y-3 shadow-lg group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-base">
                      {item.symbol}
                    </span>
                    <h3 className="text-base font-bold text-amber-100">
                      {item.name}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-amber-400/70">
                    INST-0{idx + 1}
                  </span>
                </div>

                <div className="inline-block px-2.5 py-0.5 rounded bg-amber-950/60 border border-amber-400/30 text-[11px] text-amber-300 font-sans tracking-wide">
                  {item.role}
                </div>

                <p className="text-xs sm:text-sm text-amber-100/85 leading-relaxed font-serif">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ============================================================
            SECTION 5: ACOUSTIC HARMONICS & SACRED COVENANT
        ============================================================ */}
        <section className="relative rounded-3xl p-6 sm:p-10 border border-amber-400/30 bg-[#160e0a]/90 backdrop-blur-md shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-sans tracking-widest uppercase text-amber-400 font-semibold">
              Acoustic Telemetry & Covenant
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-100 tracking-wide">
              Metrik Resonansi & Piagam Harmoni Abadi
            </h2>
          </div>

          {/* Telemetry Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-center">
            <div className="p-3.5 rounded-2xl bg-[#0f0704] border border-amber-400/25 space-y-1">
              <span className="text-[10px] font-sans uppercase tracking-wider text-amber-400/80">
                Tuning Frequency
              </span>
              <p className="text-xs font-bold text-amber-100">{freq}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0f0704] border border-amber-400/25 space-y-1">
              <span className="text-[10px] font-sans uppercase tracking-wider text-amber-400/80">
                Dynamic Range
              </span>
              <p className="text-xs font-bold text-amber-100">{dynamics}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0f0704] border border-amber-400/25 space-y-1">
              <span className="text-[10px] font-sans uppercase tracking-wider text-amber-400/80">
                Resonance Chamber
              </span>
              <p className="text-xs font-bold text-amber-100">{resonance}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0f0704] border border-amber-400/25 space-y-1">
              <span className="text-[10px] font-sans uppercase tracking-wider text-amber-400/80">
                Coda Progression
              </span>
              <p className="text-xs font-bold text-amber-100">{codaState}</p>
            </div>
          </div>

          {/* Covenant Charter */}
          <div className="rounded-2xl p-6 sm:p-8 border border-amber-400/40 bg-gradient-to-b from-[#22130c] to-[#140b07] shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-amber-400/20 pb-3">
              <div className="flex items-center gap-2">
                <Music className="w-5 h-5 text-amber-400" />
                <h3 className="text-base sm:text-lg font-bold text-amber-100">
                  {covenantTitle}
                </h3>
              </div>
              <span className="text-[10px] font-mono uppercase text-amber-400/70 tracking-widest">
                Official Charter
              </span>
            </div>

            <p className="text-sm sm:text-base leading-relaxed text-amber-100/90 italic font-serif">
              &ldquo;{covenantText}&rdquo;
            </p>

            <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-amber-400/20">
              <div className="flex items-center gap-2 text-xs text-amber-300">
                <CheckCircle className="w-4 h-4 text-amber-400" />
                <span>Tercatat & Diresonansikan dalam Harmoni Jiwa</span>
              </div>
              <div className="text-right">
                <p className="text-xs text-amber-400/70 font-sans tracking-wide">
                  Il Maestro,
                </p>
                <p className="text-base font-bold text-amber-200">{sender}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
            SECTION 6: FINAL CADENCE INTERACTION & SECRET CODA
        ============================================================ */}
        <section className="relative rounded-3xl p-6 sm:p-10 border-2 border-amber-400/40 bg-gradient-to-br from-[#25150e] via-[#1a0e09] to-[#0f0704] backdrop-blur-md shadow-2xl space-y-6 text-center">
          <div className="space-y-2">
            <span className="text-xs font-sans tracking-widest uppercase text-amber-400 font-semibold">
              Cadenza Finale & Melodia Eterna
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-100 tracking-wide">
              Dentang Akord Penutup & Rahasia Koda
            </h2>
            <p className="text-xs sm:text-sm text-amber-200/80 max-w-md mx-auto">
              Sentuh tuts emas untuk memperdengarkan resonansi nada cinta pamungkas.
            </p>
          </div>

          {/* Interactive Cadence Trigger Button */}
          <div className="pt-2">
            {!isCadencePlayed ? (
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handlePlayCadence}
                  className="px-6 py-3.5 rounded-full font-bold text-sm tracking-widest uppercase text-slate-950 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200 hover:from-amber-200 hover:to-amber-300 shadow-xl hover:shadow-amber-400/30 transition-all duration-300 hover:scale-105 inline-flex items-center gap-2.5"
                >
                  <Music className="w-4 h-4 text-slate-950" />
                  <span>{cadenceBtn}</span>
                  <Play className="w-4 h-4 text-slate-950" />
                </button>
                <p className="text-[11px] text-amber-400/60 font-mono">
                  Klik untuk mendengarkan dentangan akord & membuka koda rahasia
                </p>
              </div>
            ) : (
              <div className="max-w-2xl mx-auto rounded-2xl p-6 sm:p-8 border-2 border-amber-400/50 bg-[#120a06]/95 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-500 text-left">
                <div className="flex items-center justify-between border-b border-amber-400/30 pb-3">
                  <span className="text-xs font-mono text-amber-300 uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Coda Segreta Rivelata (Koda Rahasia)
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsCadencePlayed(false)}
                    className="text-xs text-amber-400/70 hover:text-amber-200 underline font-sans flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Ulangi</span>
                  </button>
                </div>

                <p className="text-base sm:text-lg leading-relaxed text-amber-100 font-serif italic whitespace-pre-line">
                  &ldquo;{secretCoda}&rdquo;
                </p>

                <div className="pt-3 border-t border-amber-400/20 text-center">
                  <p className="text-xs text-amber-300/80 font-mono">
                    {closingQuote}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Score Reference */}
          <div className="pt-6 border-t border-amber-400/20 flex items-center justify-center gap-2 text-xs text-amber-400/60 font-mono">
            <span>OPUS: {opusNo}</span>
            <span>•</span>
            <span>MUSE: {recipient}</span>
            <span>•</span>
            <span>MAESTRO: {sender}</span>
          </div>
        </section>
      </main>
    </div>
  );
}

export function SymphonyLoveTemplate(props: TemplateComponentProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#110b09] flex items-center justify-center text-amber-200 font-serif">
          Mempersiapkan Partitur Mahakarya Simfoni Cinta...
        </div>
      }
    >
      <SymphonyLoveTemplateContent {...props} />
    </Suspense>
  );
}

export default SymphonyLoveTemplate;
