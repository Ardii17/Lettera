"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import Image from "next/image";
import type { TemplateComponentProps } from "../renderer";
import {
  Flame,
  Sparkles,
  Compass,
  MapPin,
  Calendar,
  Clock,
  Volume2,
  VolumeX,
  Lock,
  Unlock,
  Shield,
  Award,
  Coffee,
  Laugh,
  HelpCircle,
  CheckCircle2,
  Heart,
  Star,
  Feather,
} from "lucide-react";

const DEFAULT_HERO_PHOTO =
  "https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=1200&q=80";
const DEFAULT_POLAROID_1 =
  "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80";
const DEFAULT_POLAROID_2 =
  "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80";
const DEFAULT_POLAROID_3 =
  "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=800&q=80";
const DEFAULT_POLAROID_4 =
  "https://images.unsplash.com/photo-1543807535-eceef0bc6599?auto=format&fit=crop&w=800&q=80";

function CampfireFriendshipTemplateContent({
  data,
  className = "",
}: TemplateComponentProps) {
  const letter = data;
  // --- Styling Properties & Fallbacks ---
  const primaryColor = String(letter.primaryColor || "#d97706");
  const backgroundColor = String(letter.backgroundColor || "#0f172a");
  const cardColor = String(letter.cardColor || "#1e293b");
  const textColor = String(letter.textColor || "#fef3c7");
  const bodyTextColor = String(letter.bodyTextColor || "#cbd5e1");

  // Hero & Coordinates
  const friendName = String(letter.friendName || "Sahabat Terbaik");
  const senderName = String(letter.senderName || "Sahabat Karib");
  const friendshipMoniker = String(
    letter.friendshipMoniker || "The Midnight Trailblazers & Partners in Crime",
  );
  const heroSubtitle = String(
    letter.heroSubtitle ||
      "Di bawah hamparan galaksi dan hangatnya kobaran api unggun, ini adalah catatan sakral tentang sebuah persahabatan yang menolak pudar oleh jarak dan waktu.",
  );
  const heroPhoto = String(letter.heroPhoto || DEFAULT_HERO_PHOTO);
  const badgeText = String(letter.badgeText || "🏕️ Official Campfire Brotherhood • Est. 2017");
  const yearsKnown = String(letter.yearsKnown || "8 Tahun");
  const daysLaughed = String(letter.daysLaughed || "2.900+ Hari");
  const hqLocation = String(letter.hqLocation || "Kopi Sudut Tenda & Bukit Bintang");

  // Audio Music
  const musicUrl = String(letter.musicUrl || "");
  const musicTitle = String(letter.musicTitle || "Acoustic Campfire & Ember Serenade");

  // Constellation Memories
  const memory1Title = String(letter.memory1Title || "Malam Tersesat di Puncak Kabut");
  const memory1Date = String(letter.memory1Date || "Agustus 2019 • Puncak Gn. Prau");
  const memory1Story = String(
    letter.memory1Story ||
      "Bahan bakar kompor habis, hujan gerimis turun, tapi kita justru tertawa terpingkal-pingkal membagi sebungkus mie instan mentah sambil memandang lampu kota di kejauhan.",
  );
  const memory1Tag = String(letter.memory1Tag || "Survival Level: 100");

  const memory2Title = String(letter.memory2Title || "Proyek Begadang & Kopi Basi Jam 3 Pagi");
  const memory2Date = String(letter.memory2Date || "November 2021 • Kost Nomor 14");
  const memory2Story = String(
    letter.memory2Story ||
      "Laptop sempat error sejam sebelum deadline, kita saling tatap lemas, lalu sepakat beli roti bakar dulu daripada pusing. Akhirnya tugas selesai dengan nilai A minus.",
  );
  const memory2Tag = String(letter.memory2Tag || "Clutch Moment of Glory");

  const memory3Title = String(letter.memory3Title || "Roadtrip Spontan Tanpa Rencana");
  const memory3Date = String(letter.memory3Date || "Juli 2023 • Jalur Pantai Selatan");
  const memory3Story = String(
    letter.memory3Story ||
      "Niat awal cuma beli bensin ke minimarket, berujung berkendara 200 km sampai ke tepi pantai hanya demi makan kelapa muda dan melihat matahari terbenam bersama.",
  );
  const memory3Tag = String(letter.memory3Tag || "Wanderlust Brothers");

  const memory4Title = String(letter.memory4Title || "Hening di Tengah Badai Hidup");
  const memory4Date = String(letter.memory4Date || "Maret 2024 • Jembatan Sungai Kota");
  const memory4Story = String(
    letter.memory4Story ||
      "Ketika salah satu dari kita sedang dihantam kabar terberat dalam hidup, tidak banyak nasihat klise yang kau berikan—hanya tepukan bahu kokoh dan kehadiran tanpa jeda.",
  );
  const memory4Tag = String(letter.memory4Tag || "Unbreakable Anchor");

  // Survival Kit Items
  const survivalItems = [
    {
      title: String(letter.survival1Title || "Kopi Hitam Jam 2 Pagi"),
      desc: String(
        letter.survival1Desc ||
          "Penawar kantuk saat curhat tentang mimpi-mimpi gila yang belum tercapai.",
      ),
      icon: Coffee,
    },
    {
      title: String(letter.survival2Title || "Meme Absurd Tanpa Konteks"),
      desc: String(
        letter.survival2Desc ||
          "Senjata paling ampuh mengubah hari yang suram menjadi tawa tak terkendali.",
      ),
      icon: Laugh,
    },
    {
      title: String(letter.survival3Title || "Kunci Helm & Motor Cadangan"),
      desc: String(
        letter.survival3Desc || "Siap jemput kapan pun dan di mana pun saat situasi sedang darurat.",
      ),
      icon: Shield,
    },
    {
      title: String(letter.survival4Title || "Kejujuran Pahit yang Menyelamatkan"),
      desc: String(
        letter.survival4Desc ||
          "Orang pertama yang menegur saat kita salah jalan, tapi tak pernah meninggalkan.",
      ),
      icon: Heart,
    },
  ];

  // Inside Jokes Codex
  const insideJokes = [
    {
      phrase: String(letter.joke1Phrase || "“Aman, gas dulu aja!”"),
      meaning: String(
        letter.joke1Meaning || "Sama sekali tidak aman, tapi kita tetap nekat maju bersama.",
      ),
      origin: String(
        letter.joke1Origin || "Tragedi ban bocor di tengah kebun teh waktu magrib.",
      ),
    },
    {
      phrase: String(letter.joke2Phrase || "“5 Menit Lagi Sampai”"),
      meaning: String(
        letter.joke2Meaning || "Baru selesai mandi dan masih bingung mau pakai baju apa.",
      ),
      origin: String(
        letter.joke2Origin || "Setiap janji nongkrong sejak tahun 2018 tanpa terkecuali.",
      ),
    },
    {
      phrase: String(letter.joke3Phrase || "“Pangsit Tambahan Misterius”"),
      meaning: String(
        letter.joke3Meaning || "Taktik jitu mengambil lauk sahabat saat dia sedang lengah mengobrol.",
      ),
      origin: String(letter.joke3Origin || "Warung Bakso Pak Kumis malam minggu."),
    },
  ];

  // Polaroids
  const polaroids = [
    {
      photo: String(letter.polaroid1Photo || DEFAULT_POLAROID_1),
      caption: String(
        letter.polaroid1Caption || "Tertawa lepas di tepian tebing sebelum matahari tenggelam.",
      ),
      loc: String(letter.polaroid1Location || "Bukit Senja Parangtritis"),
      date: String(letter.polaroid1Date || "14 Okt 2020"),
      rotation: "-rotate-2",
    },
    {
      photo: String(letter.polaroid2Photo || DEFAULT_POLAROID_2),
      caption: String(
        letter.polaroid2Caption || "Gitar akustik sumbang dan obrolan tentang masa depan.",
      ),
      loc: String(letter.polaroid2Location || "Teras Belakang Rumah"),
      date: String(letter.polaroid2Date || "22 Des 2021"),
      rotation: "rotate-2",
    },
    {
      photo: String(letter.polaroid3Photo || DEFAULT_POLAROID_3),
      caption: String(
        letter.polaroid3Caption || "Pose paling sok keren setelah touring ratusan kilometer.",
      ),
      loc: String(letter.polaroid3Location || "Rest Area KM 97"),
      date: String(letter.polaroid3Date || "05 Mei 2023"),
      rotation: "-rotate-1",
    },
    {
      photo: String(letter.polaroid4Photo || DEFAULT_POLAROID_4),
      caption: String(
        letter.polaroid4Caption || "Sahabat yang selalu ada, dari seragam hingga lembar kerja.",
      ),
      loc: String(letter.polaroid4Location || "Kedai Kopi Kota Tua"),
      date: String(letter.polaroid4Date || "19 Feb 2024"),
      rotation: "rotate-3",
    },
  ];

  // Heartfelt Letter
  const letterGreeting = String(letter.letterGreeting || "Untuk Sahabat Terbaikku, Dimas,");
  const letterParagraph1 = String(
    letter.letterParagraph1 ||
      "Malam ini, saat menuliskan surat ini di antara heningnya malam dan kenangan yang melintas, aku tersadar betapa beruntungnya aku memiliki seorang sahabat sepertimu. Waktu berlari begitu cepat tanpa permisi; kita yang dulu hanya dua anak muda dengan mimpi yang tampak mustahil, kini perlahan meniti jalan hidup masing-masing.",
  );
  const letterParagraph2 = String(
    letter.letterParagraph2 ||
      "Terima kasih untuk setiap tawa yang kau hadirkan saat duniaku sedang runtuh. Terima kasih karena tidak pernah menghakimi kekuranganku, namun selalu ada menjadi jangkar yang kokoh ketika aku hampir kehilangan arah. Persahabatan ini bukan sekadar tentang seberapa sering kita bertemu, tapi tentang keyakinan bahwa sejauh apa pun langkah kita, ikatan ini tak akan pernah meregang.",
  );
  const letterParagraph3 = String(
    letter.letterParagraph3 ||
      "Semoga langkah kakimu ke depan selalu diberkahi keberanian, kesuksesan, dan kebahagiaan sejati. Ingatlah, pintu rumahku dan telingaku akan selalu terbuka untukmu, apa pun keadaannya. Kita akan menua bersama dengan segudang cerita hebat untuk diceritakan kembali.",
  );
  const letterClosing = String(letter.letterClosing || "Sahabat Sejatimu Selamanya,");
  const letterSignature = String(letter.letterSignature || "Rian Aditya");
  const letterPostscript = String(
    letter.letterPostscript ||
      "P.S. Jangan lupa akhir pekan ini tetap jatah kopi dan mie rebus di tempat biasa!",
  );

  // Lifetime Pact & Time Vault
  const vaultPrompt = String(
    letter.vaultPrompt || "Sentuh Gembok untuk Membuka Piagam Sumpah Persahabatan",
  );
  const pactCertificateTitle = String(
    letter.pactCertificateTitle || "PIAGAM KEHORMATAN SAHABAT SEJATI SEUMUR HIDUP",
  );
  const pactSerialNumber = String(letter.pactSerialNumber || "PACT-BFF-2017-FOREVER-001");
  const pactPledge = String(
    letter.pactPledge ||
      "Dengan ini dideklarasikan bahwa ikatan persahabatan ini sah secara hati nurani, tahan terhadap ujian jarak, waktu, dan segala dinamika kehidupan. Saling mendukung di masa jaya, saling merengkuh di masa duka, dan tak akan pernah membiarkan yang lain berjuang sendirian.",
  );
  const pactSecretMessage = String(
    letter.pactSecretMessage ||
      "“Jika dunia di luar sana terlalu bising dan melelahkan, kembalilah ke tenda ini. Api unggun persahabatan kita tidak akan pernah padam.”",
  );

  // States
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVaultUnlocked, setIsVaultUnlocked] = useState(false);
  const [activeMemoryTab, setActiveMemoryTab] = useState(0);
  const [expandedJoke, setExpandedJoke] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Audio Playback Handler
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

  const memories = [
    { title: memory1Title, date: memory1Date, story: memory1Story, tag: memory1Tag },
    { title: memory2Title, date: memory2Date, story: memory2Story, tag: memory2Tag },
    { title: memory3Title, date: memory3Date, story: memory3Story, tag: memory3Tag },
    { title: memory4Title, date: memory4Date, story: memory4Story, tag: memory4Tag },
  ];

  return (
    <div
      className="min-h-screen relative overflow-x-hidden font-sans selection:bg-amber-500/30 selection:text-amber-200"
      style={{ backgroundColor, color: bodyTextColor }}
    >
      {/* Background Starry Sky & Forest Atmosphere */}
      <div className="fixed inset-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:32px_32px] opacity-20" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl" />
      </div>

      {/* Persistent Audio Player Bar */}
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
            title={isPlaying ? "Jeda Musik" : "Putar Musik Akustik"}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-white transition-transform ${
                isPlaying ? "animate-spin" : ""
              }`}
              style={{ backgroundColor: primaryColor }}
            >
              <Flame className="w-4 h-4 text-white" />
            </div>
            <div className="text-left hidden sm:block max-w-[150px] truncate">
              <p className="text-xs font-semibold leading-tight truncate">{musicTitle}</p>
              <p className="text-[10px] opacity-70">
                {isPlaying ? "Memutar Akustik..." : "Sentuh untuk Putar"}
              </p>
            </div>
            {isPlaying ? (
              <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4 opacity-60" />
            )}
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. HERO GATEWAY & CAMPFIRE COMPASS                                        */}
      {/* ========================================================================= */}
      <header className="relative pt-16 pb-20 px-4 sm:px-6 max-w-5xl mx-auto text-center">
        {/* Campfire Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-medium tracking-wide uppercase shadow-sm mb-6 backdrop-blur-sm"
             style={{ borderColor: `${primaryColor}55`, backgroundColor: `${cardColor}99`, color: primaryColor }}>
          <Flame className="w-4 h-4 animate-bounce text-amber-400" />
          <span>{badgeText}</span>
        </div>

        {/* Dynamic Duo Moniker */}
        <p className="text-sm sm:text-base font-mono tracking-widest uppercase mb-2 opacity-80"
           style={{ color: primaryColor }}>
          {friendshipMoniker}
        </p>

        {/* Main Hero Title */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4"
            style={{ color: textColor }}>
          Sahabat Sejati, <span style={{ color: primaryColor }}>{friendName}</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg leading-relaxed mb-10 opacity-90">
          {heroSubtitle}
        </p>

        {/* Hero Photo with Campfire Glow Ring */}
        <div className="relative max-w-2xl mx-auto rounded-3xl p-3 border shadow-2xl backdrop-blur-sm transition-transform duration-500 hover:scale-[1.01]"
             style={{ backgroundColor: `${cardColor}88`, borderColor: `${primaryColor}44` }}>
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
              <span className="flex items-center gap-1.5 font-medium backdrop-blur-md bg-black/40 px-3 py-1 rounded-full border border-white/10">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                {hqLocation}
              </span>
              <span className="backdrop-blur-md bg-black/40 px-3 py-1 rounded-full border border-white/10 font-mono text-amber-300">
                {senderName} & {friendName}
              </span>
            </div>
          </div>
        </div>

        {/* Friendship Coordinates Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mt-10">
          <div className="p-4 rounded-2xl border text-center transition-all hover:border-amber-500/50"
               style={{ backgroundColor: cardColor, borderColor: `${primaryColor}33` }}>
            <Calendar className="w-5 h-5 mx-auto mb-2" style={{ color: primaryColor }} />
            <p className="text-xs uppercase font-mono tracking-wider opacity-70">Lama Mengenal</p>
            <p className="text-xl sm:text-2xl font-bold mt-1" style={{ color: textColor }}>{yearsKnown}</p>
          </div>

          <div className="p-4 rounded-2xl border text-center transition-all hover:border-amber-500/50"
               style={{ backgroundColor: cardColor, borderColor: `${primaryColor}33` }}>
            <Sparkles className="w-5 h-5 mx-auto mb-2 text-amber-400" />
            <p className="text-xs uppercase font-mono tracking-wider opacity-70">Hari Penuh Tawa</p>
            <p className="text-xl sm:text-2xl font-bold mt-1" style={{ color: textColor }}>{daysLaughed}</p>
          </div>

          <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl border text-center transition-all hover:border-amber-500/50"
               style={{ backgroundColor: cardColor, borderColor: `${primaryColor}33` }}>
            <Compass className="w-5 h-5 mx-auto mb-2 text-emerald-400" />
            <p className="text-xs uppercase font-mono tracking-wider opacity-70">Titik Kumpul</p>
            <p className="text-sm font-semibold mt-2 truncate" style={{ color: textColor }}>{hqLocation}</p>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. CONSTELLATIONS OF UNFORGETTABLE MEMORIES                               */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider mb-2"
               style={{ backgroundColor: `${primaryColor}22`, color: primaryColor }}>
            <Star className="w-3.5 h-3.5 fill-current" />
            Peta Bintang & Jejak Petualangan
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: textColor }}>
            Konstelasi Kenangan Tak Tergantikan
          </h2>
          <p className="text-sm sm:text-base mt-2 max-w-xl mx-auto opacity-80">
            Empat titik balik memori yang membuktikan bahwa setiap badai selalu berujung tawa saat dihadapi berdua.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {memories.map((mem, idx) => (
            <button
              key={idx}
              onClick={() => setActiveMemoryTab(idx)}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 border"
              style={{
                backgroundColor: activeMemoryTab === idx ? primaryColor : `${cardColor}aa`,
                borderColor: activeMemoryTab === idx ? primaryColor : `${primaryColor}33`,
                color: activeMemoryTab === idx ? "#ffffff" : textColor,
              }}
            >
              Bintang 0{idx + 1}
            </button>
          ))}
        </div>

        {/* Active Memory Highlight Card */}
        <div className="p-6 sm:p-8 rounded-3xl border shadow-xl relative overflow-hidden transition-all duration-300"
             style={{ backgroundColor: cardColor, borderColor: `${primaryColor}44` }}>
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-20"
               style={{ backgroundColor: primaryColor }} />
          
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium border"
                  style={{ backgroundColor: `${primaryColor}22`, borderColor: `${primaryColor}55`, color: primaryColor }}>
              {memories[activeMemoryTab].tag}
            </span>
            <span className="flex items-center gap-1.5 text-xs font-mono opacity-70">
              <Clock className="w-3.5 h-3.5" />
              {memories[activeMemoryTab].date}
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: textColor }}>
            {memories[activeMemoryTab].title}
          </h3>

          <p className="text-base sm:text-lg leading-relaxed opacity-90 border-l-2 pl-4 py-1"
             style={{ borderColor: primaryColor }}>
            “{memories[activeMemoryTab].story}”
          </p>

          <div className="mt-6 pt-4 border-t flex items-center justify-between text-xs opacity-70"
               style={{ borderColor: `${primaryColor}22` }}>
            <span>Jurnal Catatan Sahabat • Arsip 0{activeMemoryTab + 1}</span>
            <span className="flex items-center gap-1 text-amber-400">
              <CheckCircle2 className="w-3.5 h-3.5" /> Terpatri Abadi
            </span>
          </div>
        </div>

        {/* 4 Mini Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          {memories.map((mem, idx) => (
            <div
              key={idx}
              onClick={() => setActiveMemoryTab(idx)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${
                activeMemoryTab === idx ? "ring-2 ring-amber-400/60" : "hover:border-amber-400/40"
              }`}
              style={{ backgroundColor: `${cardColor}99`, borderColor: `${primaryColor}25` }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono font-bold" style={{ color: primaryColor }}>
                  #0{idx + 1}
                </span>
                <span className="text-[11px] opacity-60 truncate">{mem.date}</span>
              </div>
              <h4 className="font-semibold text-sm truncate" style={{ color: textColor }}>
                {mem.title}
              </h4>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. FRIENDSHIP SURVIVAL KIT & INSIDE JOKES CODEX                          */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Survival Kit (Pilar Persahabatan) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider mb-2"
                   style={{ backgroundColor: `${primaryColor}22`, color: primaryColor }}>
                <Shield className="w-3.5 h-3.5" />
                The Survival Kit
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold" style={{ color: textColor }}>
                Perlengkapan Bertahan Sahabat
              </h3>
              <p className="text-xs sm:text-sm mt-1 opacity-80">
                Empat fondasi tak kasat mata yang membuat ikatan kita selalu kokoh menembus tahun.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {survivalItems.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl border transition-all hover:scale-[1.02]"
                    style={{ backgroundColor: cardColor, borderColor: `${primaryColor}33` }}
                  >
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 shadow-inner"
                         style={{ backgroundColor: `${primaryColor}25`, color: primaryColor }}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-sm mb-1" style={{ color: textColor }}>
                      {item.title}
                    </h4>
                    <p className="text-xs leading-relaxed opacity-80">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Inside Jokes Codex (Kamus Rahasia) */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-3xl border shadow-lg"
               style={{ backgroundColor: cardColor, borderColor: `${primaryColor}44` }}>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider mb-2"
                   style={{ backgroundColor: `${primaryColor}22`, color: primaryColor }}>
                <Laugh className="w-3.5 h-3.5 text-amber-400" />
                Inside Jokes Codex
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2" style={{ color: textColor }}>
                Kamus Frasa Rahasia
              </h3>
              <p className="text-xs opacity-80 mb-6">
                Kode bahasa yang kalau diucapkan di depan orang lain, mereka cuma bisa geleng-geleng kepala.
              </p>

              <div className="space-y-3">
                {insideJokes.map((joke, idx) => (
                  <div
                    key={idx}
                    onClick={() => setExpandedJoke(expandedJoke === idx ? null : idx)}
                    className="p-3.5 rounded-xl border cursor-pointer transition-all hover:border-amber-400/50"
                    style={{
                      backgroundColor: `${backgroundColor}66`,
                      borderColor: `${primaryColor}25`,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-sm font-bold text-amber-300">
                        {joke.phrase}
                      </p>
                      <HelpCircle className="w-4 h-4 opacity-50" />
                    </div>

                    {expandedJoke === idx ? (
                      <div className="mt-3 pt-2 border-t text-xs space-y-1 animate-fadeIn"
                           style={{ borderColor: `${primaryColor}22` }}>
                        <p className="text-slate-200">
                          <span className="font-semibold text-amber-400">Arti Harfiah:</span> {joke.meaning}
                        </p>
                        <p className="text-slate-400 italic">
                          <span className="font-semibold text-slate-300">Konteks:</span> {joke.origin}
                        </p>
                      </div>
                    ) : (
                      <p className="text-[11px] opacity-60 mt-1">Sentuh untuk bedah artinya...</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t text-center text-[11px] font-mono opacity-60"
                 style={{ borderColor: `${primaryColor}22` }}>
              Terdaftar secara resmi dalam Konvensi Humor Antar Sahabat
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. THE POLAROID CLOTHESLINE GALLERY                                       */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider mb-2"
               style={{ backgroundColor: `${primaryColor}22`, color: primaryColor }}>
            <Sparkles className="w-3.5 h-3.5" />
            Jemuran Memori Tepi Tenda
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: textColor }}>
            Galeri Polaroid Petualangan
          </h2>
          <p className="text-sm sm:text-base mt-2 max-w-xl mx-auto opacity-80">
            Jepretan momen spontan tanpa sandiwara. Setiap lembar membawa cerita tawa yang tak akan pernah pudar.
          </p>
        </div>

        {/* The Hanging Clothesline Visual Rope */}
        <div className="relative">
          <div className="absolute top-4 left-4 right-4 h-1 bg-gradient-to-r from-amber-700/20 via-amber-600/40 to-amber-700/20 rounded-full hidden sm:block" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
            {polaroids.map((item, idx) => (
              <div
                key={idx}
                className={`group relative bg-white text-slate-900 p-3.5 rounded-sm shadow-xl transition-all duration-300 hover:scale-105 hover:z-20 hover:rotate-0 ${item.rotation}`}
              >
                {/* Wooden Peg / Clothespin Graphic */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-7 bg-amber-800 rounded-sm shadow-md border-b-2 border-amber-950 z-30 opacity-90" />

                {/* Photo Container */}
                <div className="relative w-full aspect-[4/5] bg-slate-100 overflow-hidden mb-3 shadow-inner">
                  <Image
                    src={item.photo}
                    alt={item.caption}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                </div>

                {/* Handwritten-style Caption */}
                <div className="px-1 text-center font-serif">
                  <p className="text-xs leading-snug font-medium text-slate-800 line-clamp-2 italic">
                    “{item.caption}”
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-500 font-sans">
                    <span className="truncate max-w-[100px]">{item.loc}</span>
                    <span className="font-mono">{item.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. MIDNIGHT CONFESSION & HEARTFELT LETTER                                 */}
      {/* ========================================================================= */}
      <section className="py-16 px-4 sm:px-6 max-w-3xl mx-auto">
        <div className="relative p-8 sm:p-12 rounded-3xl border shadow-2xl backdrop-blur-md"
             style={{ backgroundColor: cardColor, borderColor: `${primaryColor}44` }}>
          {/* Decorative Corner Wax Seal */}
          <div className="absolute -top-6 -right-6 w-14 h-14 rounded-full flex items-center justify-center shadow-xl border-2 border-amber-300/30 text-white font-serif font-bold text-xs"
               style={{ backgroundColor: primaryColor }}>
            <Flame className="w-6 h-6 fill-current text-white" />
          </div>

          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider mb-6 opacity-70">
            <Feather className="w-4 h-4 text-amber-400" />
            Warkat Surat Malam Dari Hati
          </div>

          {/* Letter Greeting */}
          <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-6" style={{ color: textColor }}>
            {letterGreeting}
          </h3>

          {/* Letter Body Paragraphs */}
          <div className="space-y-4 text-sm sm:text-base leading-relaxed opacity-90 font-serif">
            <p>{letterParagraph1}</p>
            <p>{letterParagraph2}</p>
            <p>{letterParagraph3}</p>
          </div>

          {/* Closing & Signature */}
          <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row sm:items-end justify-between gap-4"
               style={{ borderColor: `${primaryColor}33` }}>
            <div>
              <p className="text-xs opacity-70 italic">{letterClosing}</p>
              <p className="text-xl font-bold font-serif mt-1" style={{ color: textColor }}>
                {letterSignature}
              </p>
            </div>

            {letterPostscript && (
              <p className="text-xs font-mono text-amber-300/90 max-w-xs italic">
                {letterPostscript}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. LIFETIME FRIENDSHIP PACT & THE TIME VAULT REVEAL                        */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 max-w-4xl mx-auto text-center">
        <div className="p-8 sm:p-12 rounded-3xl border relative overflow-hidden shadow-2xl"
             style={{ backgroundColor: cardColor, borderColor: `${primaryColor}55` }}>
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 border"
               style={{ backgroundColor: `${primaryColor}25`, borderColor: `${primaryColor}55`, color: primaryColor }}>
            <Award className="w-4 h-4" />
            Brankas Waktu Sahabat
          </div>

          <h3 className="text-2xl sm:text-4xl font-extrabold mb-3" style={{ color: textColor }}>
            Piagam Sumpah Persahabatan Seumur Hidup
          </h3>
          <p className="text-sm max-w-xl mx-auto opacity-80 mb-8">
            Sebuah janji yang disegel di bawah hangatnya api unggun dan disaksikan oleh ribuan bintang di langit malam.
          </p>

          {/* Vault Unlock Button */}
          {!isVaultUnlocked ? (
            <button
              onClick={() => setIsVaultUnlocked(true)}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-sm sm:text-base text-white shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
              style={{ backgroundColor: primaryColor }}
            >
              <Lock className="w-5 h-5 animate-pulse" />
              <span>{vaultPrompt}</span>
            </button>
          ) : (
            <div className="space-y-6 animate-fadeIn">
              {/* Unlocked Certificate Box */}
              <div className="relative p-6 sm:p-10 rounded-2xl border-2 border-dashed text-left shadow-2xl backdrop-blur-md"
                   style={{
                     backgroundColor: `${backgroundColor}cc`,
                     borderColor: primaryColor,
                   }}>
                <div className="flex items-center justify-between border-b pb-4 mb-6"
                     style={{ borderColor: `${primaryColor}33` }}>
                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase opacity-60">REGISTRY CODE</span>
                    <p className="font-mono text-xs sm:text-sm font-bold text-amber-400">{pactSerialNumber}</p>
                  </div>
                  <div className="w-10 h-10 rounded-full flex items-center justify-center border text-amber-400"
                       style={{ borderColor: `${primaryColor}55`, backgroundColor: `${primaryColor}22` }}>
                    <Unlock className="w-5 h-5" />
                  </div>
                </div>

                <h4 className="text-center font-serif text-lg sm:text-2xl font-bold tracking-wider mb-4"
                    style={{ color: textColor }}>
                  {pactCertificateTitle}
                </h4>

                <p className="text-sm sm:text-base leading-relaxed text-center italic max-w-xl mx-auto mb-6 opacity-90">
                  “{pactPledge}”
                </p>

                {/* Secret Message Reveal */}
                <div className="p-4 rounded-xl border text-center my-6"
                     style={{ backgroundColor: `${cardColor}ee`, borderColor: `${primaryColor}44` }}>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 block mb-1">
                    PESAN RAHASIA DARI HATI
                  </span>
                  <p className="text-base sm:text-lg font-serif font-semibold text-white">
                    {pactSecretMessage}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t pt-4 text-center text-xs font-mono opacity-80"
                     style={{ borderColor: `${primaryColor}33` }}>
                  <div>
                    <span className="block opacity-50 text-[10px]">PIHAK PERTAMA</span>
                    <p className="font-bold mt-1 text-slate-200">{senderName}</p>
                  </div>
                  <div>
                    <span className="block opacity-50 text-[10px]">PIHAK KEDUA</span>
                    <p className="font-bold mt-1 text-slate-200">{friendName}</p>
                  </div>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                Sumpah Persahabatan Aktif & Terlindungi Selamanya
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t text-center text-xs font-mono opacity-60"
              style={{ borderColor: `${primaryColor}22` }}>
        <p>Dibuat dengan segenap rasa terima kasih untuk {friendName} • Campfire Chronicles</p>
      </footer>
    </div>
  );
}

export function CampfireFriendshipTemplate(props: TemplateComponentProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0f172a]" />}>
      <CampfireFriendshipTemplateContent {...props} />
    </Suspense>
  );
}
