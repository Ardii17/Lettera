"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import Image from "next/image";
import type { TemplateComponentProps } from "../renderer";
import {
  Trees,
  Leaf,
  Volume2,
  VolumeX,
  Sparkles,
  Award,
  KeyRound,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Unlock,
  Feather,
  Clock,
  Calendar,
  Layers,
  Archive,
  Compass,
  Heart,
} from "lucide-react";

// Default Aesthetic Fallback Photos
const DEFAULT_HERO_PHOTO =
  "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?auto=format&fit=crop&w=1200&q=80";
const DEFAULT_RAILING_1 =
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80";
const DEFAULT_RAILING_2 =
  "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80";
const DEFAULT_RAILING_3 =
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80";
const DEFAULT_RAILING_4 =
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80";

function TreehouseFriendshipTemplateContent({
  data,
  className = "",
}: TemplateComponentProps) {
  const letter = data;

  // Colors
  const primaryColor = String(letter.primaryColor || "#10b981");
  const backgroundColor = String(letter.backgroundColor || "#06231a");
  const cardColor = String(letter.cardColor || "#0f362a");
  const textColor = String(letter.textColor || "#ecfdf5");
  const bodyTextColor = String(letter.bodyTextColor || "#cbd5e1");

  // Hero & Gateway
  const clubhouseName = String(
    letter.clubhouseName || "The Canopy Fort: Hideout of Soulmates",
  );
  const secretPassword = String(
    letter.secretPassword || "KETUK 3X • KATA SANDI: “SAHABAT SEJATI”",
  );
  const friendName = String(letter.friendName || "Sahabat Terbaik");
  const senderName = String(letter.senderName || "Tiara");
  const duoTitle = String(
    letter.duoTitle || "The Treehouse Founders & Lifelong Soul Sisters",
  );
  const welcomePlaque = String(
    letter.welcomePlaque ||
      "“Tinggalkan sepatu dan topeng kedewasaanmu di bawah tangga tali. Di atas dahan rindang ini, kita selamanya adalah anak-anak polos yang menolak ditaklukkan kerasnya dunia.”",
  );
  const heroPhoto = String(letter.heroPhoto || DEFAULT_HERO_PHOTO);
  const establishedYear = String(
    letter.establishedYear || "Est. 2015 (10 Tahun Markas)",
  );
  const hoursHidden = String(letter.hoursHidden || "3.650+ Jam Tawa");
  const securityLevel = String(
    letter.securityLevel || "Level BFF (Strictly Protected)",
  );

  // Music
  const musicUrl = String(letter.musicUrl || "");
  const musicTitle = String(
    letter.musicTitle || "Canopy Breeze & Wind Chimes Melancholy",
  );

  // Tree-Ring Milestones (4 items)
  const treeRings = [
    {
      phase: String(letter.ring1Phase || "CINCIN 01 • BENIH & TUNAS AWAL"),
      title: String(
        letter.ring1Title || "Bertukar Bekal & Janji Tangga Tali",
      ),
      period: String(letter.ring1Period || "Tahun 2015 • Bangku SMP"),
      story: String(
        letter.ring1Story ||
          "Dua anak perempuan pemalu yang berebut bangku pojok kelas, berakhir saling mencicipi bekal nasi goreng dan berjanji membuat kode rahasia yang tak boleh diketahui guru.",
      ),
    },
    {
      phase: String(letter.ring2Phase || "CINCIN 02 • DAHAN YANG MENGUAT"),
      title: String(
        letter.ring2Title || "Menghadapi Ujian & Kenakalan Remaja",
      ),
      period: String(letter.ring2Period || "Tahun 2018 • Masa Putih Abu-Abu"),
      story: String(
        letter.ring2Story ||
          "PR matematika yang dikerjakan 15 menit sebelum bel berbunyi, curhat tentang cowok yang tidak peka, dan tawa terbahak-bahak saat tertangkap basah makan camilan di jam pelajaran.",
      ),
    },
    {
      phase: String(letter.ring3Phase || "CINCIN 03 • AKAR YANG MENGHUNJAM"),
      title: String(
        letter.ring3Title || "Badai Pertama di Gerbang Kedewasaan",
      ),
      period: String(
        letter.ring3Period || "Tahun 2021 • Fase Kuliah & Krisis Quarter-Life",
      ),
      story: String(
        letter.ring3Story ||
          "Ketika kita sama-sama mulai dihantam kenyataan hidup yang tak seindah impian masa kecil. Duduk berjam-jam di teras markas ini tanpa kata, saling menguatkan akar agar tak tumbang oleh angin kencang.",
      ),
    },
    {
      phase: String(letter.ring4Phase || "CINCIN 04 • TAJUK RINDANG ABADI"),
      title: String(letter.ring4Title || "Tempat Bernaung Selamanya"),
      period: String(
        letter.ring4Period || "Tahun 2025 & Selamanya • Masa Depan",
      ),
      story: String(
        letter.ring4Story ||
          "Pohon persahabatan ini kini telah tumbuh menjulang kokoh. Sejauh apa pun kita merantau, dahan rindang markas ini akan selalu siap meneduhkan kita dari terik panasnya dunia.",
      ),
    },
  ];

  // Memorabilia Mason Jars (4 items)
  const jars = [
    {
      title: String(
        letter.jar1Title || "Kelereng Bening & Karcis Bioskop Pertama",
      ),
      desc: String(
        letter.jar1Desc ||
          "Sisa kenangan menonton film kartun hari minggu dan berebut popcorn karamel.",
      ),
    },
    {
      title: String(
        letter.jar2Title || "Kertas Lipat Origami Surat Rahasia",
      ),
      desc: String(
        letter.jar2Desc ||
          "Kertas bergaris yang dilempar saat jam ujian berisi kode contekan dan gambar doodle lucu.",
      ),
    },
    {
      title: String(
        letter.jar3Title || "Gantungan Kunci Persahabatan Kembar",
      ),
      desc: String(
        letter.jar3Desc ||
          "Dibeli di pasar malam dengan uang saku terakhir, warnanya pudar tapi nilainya abadi.",
      ),
    },
    {
      title: String(
        letter.jar4Title || "Batu Kerikil Doa dari Puncak Bukit",
      ),
      desc: String(
        letter.jar4Desc ||
          "Batu kecil saksi bisu janji kita berdua bahwa kita akan sukses dan bahagia bersama.",
      ),
    },
  ];

  // Wooden Railing Photos (4 items)
  const railingPhotos = [
    {
      photo: String(letter.railing1Photo || DEFAULT_RAILING_1),
      title: String(
        letter.railing1Title || "Tertawa Bebas di Atas Ayunan Tali",
      ),
      date: String(letter.railing1Date || "08 Mei 2016"),
      memory: String(
        letter.railing1Memory ||
          "“Kaki mengayun tinggi ke langit, merasa dunia ini milik kita berdua saja.”",
      ),
      rotation: "-rotate-2",
    },
    {
      photo: String(letter.railing2Photo || DEFAULT_RAILING_2),
      title: String(
        letter.railing2Title || "Piknik Spontan di Bawah Pohon Rindang",
      ),
      date: String(letter.railing2Date || "14 November 2019"),
      memory: String(
        letter.railing2Memory ||
          "“Bermodal sebotol teh manis dan sekotak kue basah, obrolan mengalir sampai magrib.”",
      ),
      rotation: "rotate-2",
    },
    {
      photo: String(letter.railing3Photo || DEFAULT_RAILING_3),
      title: String(
        letter.railing3Title || "Matahari Terbit Menembus Kabut Daun",
      ),
      date: String(letter.railing3Date || "22 September 2022"),
      memory: String(
        letter.railing3Memory ||
          "“Kedinginan dibalut satu selimut tebal berdua sambil menatap fajar merekah.”",
      ),
      rotation: "-rotate-1",
    },
    {
      photo: String(letter.railing4Photo || DEFAULT_RAILING_4),
      title: String(letter.railing4Title || "Dekap Erat Hari Kelulusan"),
      date: String(letter.railing4Date || "10 Agustus 2024"),
      memory: String(
        letter.railing4Memory ||
          "“Kita yang dulu cuma anak kecil pohon, kini melangkah anggun menatap dunia luas.”",
      ),
      rotation: "rotate-3",
    },
  ];

  // Carved Letter
  const carvedGreeting = String(
    letter.carvedGreeting || "Untuk Sahabat Hatiku, Alifia,",
  );
  const carvedParagraph1 = String(
    letter.carvedParagraph1 ||
      "Di dahan pohon beringin tua ini, sepuluh tahun yang lalu kita pernah memanjat tinggi dengan lutut lecet dan baju kotor berdebu. Kita mengukir nama kita di batang kayu ini, tanpa tahu bahwa persahabatan yang kita mulai dari kepolosan itu akan menjadi harta paling berharga dalam seluruh perjalanan hidupku.",
  );
  const carvedParagraph2 = String(
    letter.carvedParagraph2 ||
      "Dunia di luar sana menuntut kita menjadi dewasa begitu cepat, menuntut kesempurnaan, dan sering kali membuat dada terasa sesak. Tapi setiap kali aku berbicara denganmu, aku selalu merasa kembali ke rumah pohon ini—tempat di mana aku boleh menangis tanpa rasa malu, boleh bercerita tanpa takut dihakimi, dan boleh tertawa lepas menjadi diriku yang seutuhnya.",
  );
  const carvedParagraph3 = String(
    letter.carvedParagraph3 ||
      "Terima kasih telah tumbuh bersamaku. Berapa pun usia kita nanti, rambut kita mungkin akan memutih dan langkah kita melambat, tapi janji markas ini tak akan pernah lapuk oleh cuaca. Pintu rumah pohon ini akan selalu terbuka menyambutmu pulang.",
  );
  const carvedClosing = String(
    letter.carvedClosing || "Sahabat Jiwamu Sepanjang Hayat,",
  );
  const carvedSignature = String(
    letter.carvedSignature || "Tiara Anindita",
  );
  const carvedPostscript = String(
    letter.carvedPostscript ||
      "P.S. Tangga tali ini tidak akan pernah ditarik ke atas untukmu!",
  );

  // Deed & Trapdoor
  const deedTitle = String(
    letter.deedTitle || "PIAGAM HAK KEPEMILIKAN MARKAS RAHASIA SEUMUR HIDUP",
  );
  const deedSerial = String(
    letter.deedSerial || "CLUBHOUSE-DEED-TREE-2015-ETERNAL",
  );
  const deedCovenant = String(
    letter.deedCovenant ||
      "Diberikan hak perlindungan mutlak, hak singgah tanpa batas, dan kepemilikan abadi atas markas rahasia ini. Tidak ada kekuatan dunia yang dapat membatalkan persaudaraan hati ini.",
  );
  const trapdoorPrompt = String(
    letter.trapdoorPrompt ||
      "Angkat Pintu Kolong Lantai Kayu untuk Membaca Pesan Rahasia",
  );
  const secretFloorboardMessage = String(
    letter.secretFloorboardMessage ||
      "“Jika suatu hari nanti kau merasa dunia melupakanmu atau kau merasa sendirian, ingatlah: di markas ini ada seseorang yang selalu berdoa untuk kebahagiaanmu setiap hari.”",
  );

  // States
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeRingIndex, setActiveRingIndex] = useState(0);
  const [isTrapdoorOpen, setIsTrapdoorOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Audio Playback
  const togglePlay = () => {
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

  useEffect(() => {
    const currentAudio = audioRef.current;
    return () => {
      if (currentAudio) {
        currentAudio.pause();
      }
    };
  }, []);

  return (
    <div
      className="min-h-screen relative overflow-x-hidden font-sans selection:bg-emerald-600/30 selection:text-emerald-200"
      style={{ backgroundColor, color: bodyTextColor }}
    >
      {/* Forest Canopy Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none opacity-25">
        <div className="absolute top-10 right-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:32px_32px] opacity-15" />
      </div>

      {/* Floating Wind Chimes Audio Player */}
      {musicUrl && (
        <div className="fixed bottom-6 right-6 z-50">
          <audio ref={audioRef} src={musicUrl} loop preload="none" />
          <button
            onClick={togglePlay}
            className="flex items-center gap-3 px-4 py-2.5 rounded-full shadow-2xl backdrop-blur-md border transition-all duration-300 transform hover:scale-105"
            style={{
              backgroundColor: `${cardColor}ee`,
              borderColor: `${primaryColor}66`,
              color: textColor,
            }}
            title={isPlaying ? "Jeda Lonceng Angin" : "Putar Musik Pohon"}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-slate-900 transition-transform ${
                isPlaying ? "animate-spin" : ""
              }`}
              style={{ backgroundColor: primaryColor }}
            >
              <Leaf className="w-4 h-4 text-slate-950" />
            </div>
            <div className="text-left hidden sm:block max-w-[160px] truncate">
              <p className="text-xs font-semibold leading-tight truncate">{musicTitle}</p>
              <p className="text-[10px] opacity-70">
                {isPlaying ? "Lonceng Angin Berbunyi..." : "Sentuh untuk Musik"}
              </p>
            </div>
            {isPlaying ? (
              <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4 opacity-60" />
            )}
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. HERO GATEWAY & SECRET PASSWORD                                         */}
      {/* ========================================================================= */}
      <header className="relative pt-16 pb-20 px-4 sm:px-6 max-w-5xl mx-auto text-center">
        {/* Secret Password Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-mono font-bold tracking-widest uppercase shadow-sm mb-4 backdrop-blur-sm"
          style={{
            borderColor: `${primaryColor}55`,
            backgroundColor: `${cardColor}bb`,
            color: primaryColor,
          }}
        >
          <Trees className="w-3.5 h-3.5 text-emerald-400" />
          <span>{secretPassword}</span>
        </div>

        {/* Clubhouse Duo Title */}
        <p
          className="text-xs sm:text-sm font-mono tracking-widest uppercase mb-2 opacity-80"
          style={{ color: primaryColor }}
        >
          {clubhouseName} • {duoTitle}
        </p>

        {/* Hero Title */}
        <h1
          className="text-4xl sm:text-6xl font-serif font-extrabold tracking-tight mb-4"
          style={{ color: textColor }}
        >
          Markas Rahasia Kita, <span style={{ color: primaryColor }}>{friendName}</span>
        </h1>

        {/* Welcome Plaque */}
        <div
          className="max-w-2xl mx-auto p-5 sm:p-6 rounded-2xl border border-dashed mb-10 shadow-lg relative"
          style={{
            backgroundColor: `${cardColor}99`,
            borderColor: `${primaryColor}44`,
          }}
        >
          <p className="font-serif italic text-base sm:text-lg leading-relaxed text-emerald-100/90">
            {welcomePlaque}
          </p>
          <span className="block mt-3 text-[11px] font-mono tracking-wider opacity-60 text-emerald-300">
            — Terukir di Papan Tangga Tali • Est. {establishedYear}
          </span>
        </div>

        {/* Hero Photo with Cedar Wood Frame */}
        <div
          className="relative max-w-2xl mx-auto rounded-3xl p-3 sm:p-4 border shadow-2xl backdrop-blur-sm transition-transform duration-500 hover:scale-[1.01]"
          style={{
            backgroundColor: `${cardColor}cc`,
            borderColor: `${primaryColor}44`,
          }}
        >
          <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-inner">
            <Image
              src={heroPhoto}
              alt={friendName}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 750px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs sm:text-sm">
              <span className="flex items-center gap-1.5 font-medium backdrop-blur-md bg-black/50 px-3 py-1 rounded-full border border-white/10">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                {senderName} & {friendName}
              </span>
              <span className="backdrop-blur-md bg-black/50 px-3 py-1 rounded-full border border-white/10 font-mono text-emerald-300">
                {securityLevel}
              </span>
            </div>
          </div>
        </div>

        {/* Treehouse Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mt-10">
          <div
            className="p-4 rounded-2xl border text-center transition-all hover:border-emerald-500/50"
            style={{ backgroundColor: cardColor, borderColor: `${primaryColor}33` }}
          >
            <Calendar className="w-5 h-5 mx-auto mb-2" style={{ color: primaryColor }} />
            <p className="text-xs uppercase font-mono tracking-wider opacity-70">
              Tahun Didirikan
            </p>
            <p className="text-xl sm:text-2xl font-serif font-bold mt-1" style={{ color: textColor }}>
              {establishedYear}
            </p>
          </div>

          <div
            className="p-4 rounded-2xl border text-center transition-all hover:border-emerald-500/50"
            style={{ backgroundColor: cardColor, borderColor: `${primaryColor}33` }}
          >
            <Clock className="w-5 h-5 mx-auto mb-2 text-emerald-400" />
            <p className="text-xs uppercase font-mono tracking-wider opacity-70">
              Jam Sembunyi
            </p>
            <p className="text-xl sm:text-2xl font-serif font-bold mt-1" style={{ color: textColor }}>
              {hoursHidden}
            </p>
          </div>

          <div
            className="col-span-2 sm:col-span-1 p-4 rounded-2xl border text-center transition-all hover:border-emerald-500/50"
            style={{ backgroundColor: cardColor, borderColor: `${primaryColor}33` }}
          >
            <ShieldCheck className="w-5 h-5 mx-auto mb-2 text-amber-400" />
            <p className="text-xs uppercase font-mono tracking-wider opacity-70">
              Izin Masuk
            </p>
            <p className="text-sm sm:text-base font-bold mt-2 truncate" style={{ color: textColor }}>
              {securityLevel}
            </p>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. TREE-RING MILESTONES (LINGKARAN TAHUN POHON PERSAHABATAN)               */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-2"
            style={{ backgroundColor: `${primaryColor}22`, color: primaryColor }}
          >
            <Layers className="w-3.5 h-3.5" />
            Tree-Ring Growth
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold" style={{ color: textColor }}>
            Lingkaran Tahun Pohon Persahabatan
          </h2>
          <p className="text-sm sm:text-base mt-2 max-w-xl mx-auto opacity-80">
            Empat lapisan cincin kayu yang mencatat setiap musim pertumbuhan akar dan dahan persahabatan kita.
          </p>
        </div>

        {/* Ring Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {treeRings.map((ring, idx) => (
            <button
              key={idx}
              onClick={() => setActiveRingIndex(idx)}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-bold transition-all duration-200 border"
              style={{
                backgroundColor: activeRingIndex === idx ? primaryColor : `${cardColor}aa`,
                borderColor: activeRingIndex === idx ? primaryColor : `${primaryColor}33`,
                color: activeRingIndex === idx ? "#06231a" : textColor,
              }}
            >
              Cincin 0{idx + 1}
            </button>
          ))}
        </div>

        {/* Active Ring Highlight Card */}
        <div
          className="p-6 sm:p-8 rounded-3xl border shadow-xl relative overflow-hidden transition-all duration-300"
          style={{ backgroundColor: cardColor, borderColor: `${primaryColor}44` }}
        >
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <span
              className="px-3 py-1 rounded-lg text-xs font-mono font-bold border"
              style={{
                backgroundColor: `${primaryColor}25`,
                borderColor: `${primaryColor}66`,
                color: primaryColor,
              }}
            >
              {treeRings[activeRingIndex].phase}
            </span>
            <span className="flex items-center gap-1.5 text-xs font-mono opacity-70">
              <Calendar className="w-3.5 h-3.5" />
              {treeRings[activeRingIndex].period}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-4" style={{ color: textColor }}>
            {treeRings[activeRingIndex].title}
          </h3>

          <p
            className="text-base sm:text-lg leading-relaxed opacity-90 border-l-4 pl-4 py-1 font-serif"
            style={{ borderColor: primaryColor }}
          >
            “{treeRings[activeRingIndex].story}”
          </p>

          <div
            className="mt-6 pt-4 border-t flex items-center justify-between text-xs opacity-70 font-mono"
            style={{ borderColor: `${primaryColor}22` }}
          >
            <span>Lapisan Serat Kayu Markas • Arsip 0{activeRingIndex + 1}</span>
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" /> Tumbuh Menjulang Abadi
            </span>
          </div>
        </div>

        {/* 4 Mini Rings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {treeRings.map((ring, idx) => (
            <div
              key={idx}
              onClick={() => setActiveRingIndex(idx)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${
                activeRingIndex === idx
                  ? "ring-2 ring-emerald-400/80"
                  : "hover:border-emerald-400/40"
              }`}
              style={{
                backgroundColor: `${cardColor}99`,
                borderColor: `${primaryColor}25`,
              }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono font-bold" style={{ color: primaryColor }}>
                  Ring #0{idx + 1}
                </span>
                <span className="text-[11px] font-mono opacity-60 truncate">{ring.period}</span>
              </div>
              <h4 className="font-bold text-sm truncate" style={{ color: textColor }}>
                {ring.title}
              </h4>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. MEMORABILIA MASON JARS (TOPLES KENANGAN ARTEFAK)                       */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-2"
            style={{ backgroundColor: `${primaryColor}22`, color: primaryColor }}
          >
            <Archive className="w-3.5 h-3.5" />
            Mason Jar Artifacts
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold" style={{ color: textColor }}>
            Toples Kenangan & Artefak Markas
          </h2>
          <p className="text-sm sm:text-base mt-2 max-w-xl mx-auto opacity-80">
            Benda-benda kecil saksi masa muda yang kita simpan rapi di sudut rak kayu rumah pohon.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {jars.map((jar, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl border shadow-lg relative overflow-hidden transition-all duration-300 hover:scale-[1.02]"
              style={{
                backgroundColor: cardColor,
                borderColor: `${primaryColor}33`,
              }}
            >
              {/* Mason Jar Graphic Accent */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 shadow-inner"
                style={{
                  backgroundColor: `${primaryColor}25`,
                  color: primaryColor,
                }}
              >
                <Archive className="w-5 h-5" />
              </div>

              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block mb-1">
                TOPLES KACA 0{idx + 1}
              </span>

              <h4 className="font-serif font-bold text-sm mb-2" style={{ color: textColor }}>
                {jar.title}
              </h4>

              <p className="text-xs leading-relaxed opacity-80">
                {jar.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. THE WOODEN RAILING PHOTO GALLERY                                       */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-2"
            style={{ backgroundColor: `${primaryColor}22`, color: primaryColor }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Wooden Railing Gallery
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold" style={{ color: textColor }}>
            Galeri Foto Pagar Kayu Teras
          </h2>
          <p className="text-sm sm:text-base mt-2 max-w-xl mx-auto opacity-80">
            Jepretan momen tawa masa muda yang terpasang di pagar kayu teras markas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {railingPhotos.map((item, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-sm bg-white text-slate-900 shadow-xl transition-all duration-300 hover:scale-105 hover:rotate-0 ${item.rotation}`}
            >
              {/* Washi Tape Graphic */}
              <div className="w-16 h-3 bg-emerald-700/60 mx-auto -mt-5 mb-2 rounded-xs shadow-xs" />

              <div className="relative w-full aspect-[4/5] bg-slate-100 overflow-hidden mb-3 shadow-inner">
                <Image
                  src={item.photo}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
              </div>

              <div className="px-1 text-center font-serif">
                <p className="font-bold text-xs text-slate-800 truncate">
                  {item.title}
                </p>
                <p className="text-[10px] font-mono text-emerald-800 mt-0.5">{item.date}</p>
                <p className="text-[11px] italic text-slate-600 line-clamp-2 mt-1.5 leading-snug">
                  {item.memory}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. THE CARVED WOODEN PLANK LETTER                                         */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 max-w-3xl mx-auto">
        <div
          className="relative p-8 sm:p-12 rounded-3xl border shadow-2xl backdrop-blur-md overflow-hidden"
          style={{
            backgroundColor: cardColor,
            borderColor: `${primaryColor}44`,
          }}
        >
          {/* Leaf Resin Stamp */}
          <div className="absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center border-2 border-emerald-300/30 text-emerald-400 font-serif font-bold text-xs"
               style={{ backgroundColor: `${primaryColor}22` }}>
            <Leaf className="w-6 h-6 fill-current text-emerald-400" />
          </div>

          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider mb-6 opacity-70 text-emerald-300">
            <Feather className="w-4 h-4" />
            Warkat Surat Terukir di Papan Kayu
          </div>

          <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-6" style={{ color: textColor }}>
            {carvedGreeting}
          </h3>

          <div className="space-y-4 text-sm sm:text-base leading-relaxed opacity-90 font-serif">
            <p>{carvedParagraph1}</p>
            <p>{carvedParagraph2}</p>
            <p>{carvedParagraph3}</p>
          </div>

          <div
            className="mt-8 pt-6 border-t flex flex-col sm:flex-row sm:items-end justify-between gap-4"
            style={{ borderColor: `${primaryColor}33` }}
          >
            <div>
              <p className="text-xs opacity-70 italic">{carvedClosing}</p>
              <p className="text-xl font-serif font-bold mt-1" style={{ color: textColor }}>
                {carvedSignature}
              </p>
            </div>

            {carvedPostscript && (
              <p className="text-xs font-mono text-emerald-300/90 max-w-xs italic">
                {carvedPostscript}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. CLUBHOUSE DEED & SECRET TRAPDOOR                                       */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 max-w-4xl mx-auto text-center">
        <div
          className="p-8 sm:p-12 rounded-3xl border relative overflow-hidden shadow-2xl"
          style={{ backgroundColor: cardColor, borderColor: `${primaryColor}55` }}
        >
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider mb-4 border"
            style={{
              backgroundColor: `${primaryColor}25`,
              borderColor: `${primaryColor}55`,
              color: primaryColor,
            }}
          >
            <Award className="w-4 h-4" />
            Hak Milik Markas Abadi
          </div>

          <h3 className="text-2xl sm:text-4xl font-serif font-bold mb-3" style={{ color: textColor }}>
            Piagam Kepemilikan Markas Rahasia
          </h3>
          <p className="text-sm max-w-xl mx-auto opacity-80 mb-8">
            Sebuah sumpah persaudaraan yang mengikat kita seumur hidup di bawah dahan rindang markas ini.
          </p>

          {/* Trapdoor Interactive Button */}
          {!isTrapdoorOpen ? (
            <button
              onClick={() => setIsTrapdoorOpen(true)}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-sm sm:text-base text-slate-950 shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
              style={{ backgroundColor: primaryColor }}
            >
              <Lock className="w-5 h-5 animate-pulse" />
              <span>{trapdoorPrompt}</span>
            </button>
          ) : (
            <div className="space-y-6 animate-fadeIn">
              {/* Unlocked Clubhouse Deed */}
              <div
                className="relative p-6 sm:p-10 rounded-2xl border-2 border-dashed text-left shadow-2xl backdrop-blur-md"
                style={{
                  backgroundColor: `${backgroundColor}ee`,
                  borderColor: primaryColor,
                }}
              >
                <div
                  className="flex items-center justify-between border-b pb-4 mb-6"
                  style={{ borderColor: `${primaryColor}33` }}
                >
                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase opacity-60">
                      REGISTRATION SERIAL
                    </span>
                    <p className="font-mono text-xs sm:text-sm font-bold text-emerald-400">
                      {deedSerial}
                    </p>
                  </div>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center border text-emerald-400"
                    style={{
                      borderColor: `${primaryColor}55`,
                      backgroundColor: `${primaryColor}22`,
                    }}
                  >
                    <Unlock className="w-5 h-5" />
                  </div>
                </div>

                <h4
                  className="text-center font-serif font-bold text-lg sm:text-2xl tracking-wider mb-4"
                  style={{ color: textColor }}
                >
                  {deedTitle}
                </h4>

                <p className="text-sm sm:text-base leading-relaxed text-center italic max-w-xl mx-auto mb-6 opacity-90 font-serif">
                  “{deedCovenant}”
                </p>

                {/* Secret Message Under Floorboard */}
                <div
                  className="p-5 rounded-xl border text-center my-6"
                  style={{
                    backgroundColor: `${cardColor}ee`,
                    borderColor: `${primaryColor}44`,
                  }}
                >
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block mb-1">
                    PESAN RAHASIA DI BAWAH PAPAN LANTAI KAYU
                  </span>
                  <p className="text-base sm:text-lg font-serif font-bold text-white leading-relaxed">
                    {secretFloorboardMessage}
                  </p>
                </div>

                <div
                  className="grid grid-cols-2 gap-4 border-t pt-4 text-center text-xs font-mono opacity-80"
                  style={{ borderColor: `${primaryColor}33` }}
                >
                  <div>
                    <span className="block opacity-50 text-[10px]">PENDIRI PERTAMA</span>
                    <p className="font-bold mt-1 text-slate-200">{senderName}</p>
                  </div>
                  <div>
                    <span className="block opacity-50 text-[10px]">PENDIRI KEDUA</span>
                    <p className="font-bold mt-1 text-slate-200">{friendName}</p>
                  </div>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                Pintu Kolong Terbuka • Hak Singgah Markas Aktif Selamanya
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer
        className="py-12 border-t text-center text-xs font-mono opacity-60"
        style={{ borderColor: `${primaryColor}22` }}
      >
        <p>The Secret Treehouse Clubhouse • Didedikasikan untuk {friendName}</p>
      </footer>
    </div>
  );
}

export function TreehouseFriendshipTemplate(props: TemplateComponentProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#06231a]" />}>
      <TreehouseFriendshipTemplateContent {...props} />
    </Suspense>
  );
}
