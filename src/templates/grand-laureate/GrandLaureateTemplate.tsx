"use client";

import { Suspense, useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  Award,
  Medal,
  Sparkles,
  Volume2,
  VolumeX,
  Music,
  Compass,
  CheckCircle2,
  BookmarkCheck,
  GraduationCap,
  Flame,
} from "lucide-react";
import type { TemplateComponentProps } from "../renderer";

function GrandLaureateInner({ data, className = "" }: TemplateComponentProps) {
  const pathname = usePathname();
  const isThumbnail = pathname === "/templates";

  // Data fields with graceful defaults
  const recipientName = (data.recipientName as string) || "Sang Wisudawan";
  const senderName = (data.senderName as string) || "Keluarga & Dewan Penguji";
  const registryId = (data.registryId as string) || "LAUR-2024-OX";
  const conferredTitle =
    (data.conferredTitle as string) ||
    "Master of Science in Artificial Intelligence with Highest Distinction";
  const institutionName =
    (data.institutionName as string) || "Faculty of Informatics & Advanced Engineering";
  const conferralDate = (data.conferralDate as string) || "28 September 2024";
  const citationTitle = (data.citationTitle as string) || "The Vanguard Fellowship Citation";
  const citationSummary =
    (data.citationSummary as string) ||
    "Dianugerahkan dengan kehormatan tertinggi atas ketekunan riset tanpa lelah, keunggulan akademik yang gemilang, dan komitmen moral untuk mendedikasikan ilmu bagi kemanusiaan.";

  const salutation = (data.salutation as string) || "Kepada Sang Juara yang Kami Banggakan,";
  const message =
    (data.message as string) ||
    "Gelar yang kau sandang hari ini adalah prasasti dari ribuan jam yang kau habiskan saat dunia terlelap. Kami berdiri di sini dengan dada penuh rasa bangga atas perjuanganmu.";
  const signoff = (data.signoff as string) || "Dengan rasa bangga dan cinta yang tak terhingga,";
  const sealText = (data.sealText as string) || "VERITAS ET EXCELLENTIA";

  // 4 Epochs of Mastery
  const epochs = [
    {
      title: (data.epoch1_title as string) || "The Genesis of Inquiry",
      period: (data.epoch1_period as string) || "Tahun Pertama • Menemukan Percikan",
      breakthrough:
        (data.epoch1_breakthrough as string) || "Memilih topik penelitian tersulit yang dihindari banyak orang",
      narrative:
        (data.epoch1_narrative as string) ||
        "Langkah pertama dimulai dengan rasa cemas namun sarat rasa penasaran. Kau memilih jalur yang menuntut disiplin mutlak.",
      icon: "🌱",
      badgeColor: "border-sky-500/40 text-sky-300 bg-sky-950/30",
    },
    {
      title: (data.epoch2_title as string) || "The Midnight Crucible",
      period: (data.epoch2_period as string) || "Tahun Kedua & Ketiga • Ketahanan Mental",
      breakthrough:
        (data.epoch2_breakthrough as string) || "Eksperimen ke-47 yang akhirnya menunjukkan hasil hipotesis valid",
      narrative:
        (data.epoch2_narrative as string) ||
        "Malam-malam panjang di depan layar, ratusan revisi, dan rasa lelah yang menguji komitmen.",
      icon: "⚡",
      badgeColor: "border-amber-500/40 text-amber-300 bg-amber-950/30",
    },
    {
      title: (data.epoch3_title as string) || "The Defense of the Masterwork",
      period: (data.epoch3_period as string) || "Semester Akhir • Sidang Terbuka",
      breakthrough:
        (data.epoch3_breakthrough as string) || "Apresiasi bulat dan pujian langsung dari dewan profesor penguji",
      narrative:
        (data.epoch3_narrative as string) ||
        "Berdiri dengan keyakinan penuh memaparkan karya inovatif di hadapan dewan ahli dengan tajam dan berbobot.",
      icon: "🛡️",
      badgeColor: "border-purple-500/40 text-purple-300 bg-purple-950/30",
    },
    {
      title: (data.epoch4_title as string) || "The Conferred Laurels",
      period: (data.epoch4_period as string) || "Hari Wisuda • Puncak Kehormatan",
      breakthrough:
        (data.epoch4_breakthrough as string) || "Pengalungan medali kehormatan & senyum bangga orang-orang tercinta",
      narrative:
        (data.epoch4_narrative as string) ||
        "Tepuk tangan bergemuruh menyambut namamu di atas panggung kehormatan tertinggi.",
      icon: "👑",
      badgeColor: "border-amber-400 text-amber-200 bg-amber-900/40",
    },
  ];

  // 3 Medals of Distinction
  const medals = [
    {
      title: (data.medal1_title as string) || "Insignia of Intellectual Tenacity",
      virtue: (data.medal1_virtue as string) || "Ketangguhan Mental & Konsistensi",
      citation:
        (data.medal1_citation as string) ||
        "Dianugerahkan atas kemampuan bangkit dari kegagalan eksperimen tanpa kehilangan antusiasme sedikit pun.",
      ribbonColor: "from-blue-600 to-indigo-900",
      medalEmoji: "🥇",
    },
    {
      title: (data.medal2_title as string) || "Order of Creative Brilliance",
      virtue: (data.medal2_virtue as string) || "Orisinalitas Visi & Inovasi",
      citation:
        (data.medal2_citation as string) ||
        "Dianugerahkan atas keberanian merumuskan perspektif baru yang mendobrak kebiasaan lama.",
      ribbonColor: "from-amber-600 to-yellow-900",
      medalEmoji: "🌟",
    },
    {
      title: (data.medal3_title as string) || "Crown of Noble Character",
      virtue: (data.medal3_virtue as string) || "Integritas Moral & Kerendahan Hati",
      citation:
        (data.medal3_citation as string) ||
        "Dianugerahkan karena setinggi apa pun kecerdasan yang dicapai, kebaikan hati selalu menjadi kompas utama.",
      ribbonColor: "from-emerald-600 to-teal-900",
      medalEmoji: "🕊️",
    },
  ];

  // 4 Grand Horizons
  const horizons = [
    {
      title: (data.horizon1_title as string) || "The Fellowship of Mastery",
      desc:
        (data.horizon1_desc as string) ||
        "Semoga ilmu yang kau genggam terus bertambah tajam, membimbingmu menjadi pemimpin terdepan.",
    },
    {
      title: (data.horizon2_title as string) || "The Impact on Humanity",
      desc:
        (data.horizon2_desc as string) ||
        "Semoga setiap inovasi dan langkah profesionalmu memberi manfaat nyata bagi sesama.",
    },
    {
      title: (data.horizon3_title as string) || "The Unshakable Moral Compass",
      desc:
        (data.horizon3_desc as string) ||
        "Tetaplah berdiri kokoh di atas fondasi kejujuran dan etika luhur di tengah arus dunia nyata.",
    },
    {
      title: (data.horizon4_title as string) || "The Joy of the Odyssey",
      desc:
        (data.horizon4_desc as string) ||
        "Nikmati setiap proses dan petualangan baru di depan sana dengan rasa syukur dan tawa bahagia.",
    },
  ];

  // Audio & Interactive Standing Ovation
  const audioUrl = (data.audioUrl as string) || "";
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [applauseCount, setApplauseCount] = useState(128);
  const [hasApplauded, setHasApplauded] = useState(false);
  const [activeEpochIndex, setActiveEpochIndex] = useState(0);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleStandingOvation = () => {
    setApplauseCount((prev) => prev + 1);
    setHasApplauded(true);
  };

  // Safe audio cleanup
  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, []);

  return (
    <div
      className={`min-h-screen relative overflow-hidden font-serif selection:bg-amber-900 selection:text-amber-100 ${className}`}
      style={{
        backgroundColor: "#08101d",
        color: "#f6f2e9",
      }}
    >
      {/* Background Royal Swedish Navy Mesh & Stately Gold Embers */}
      <div
        className="fixed inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 15%, rgba(202, 166, 79, 0.2) 0%, transparent 65%),
            linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: "100% 100%, 60px 60px, 60px 60px",
        }}
      />

      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-1/6 left-1/4 w-96 h-96 rounded-full bg-amber-600/10 blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl animate-pulse"
          style={{ animationDuration: "7s" }}
        />
      </div>

      {/* Floating Audio Player (Isolated for Full Page Only) */}
      {!isThumbnail && audioUrl && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#0c182a]/95 backdrop-blur-md border border-amber-500/40 px-4 py-2.5 rounded-full shadow-2xl shadow-blue-950/80 text-amber-200">
          <audio ref={audioRef} src={audioUrl} loop preload="none" />
          <button
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause fanfare" : "Play fanfare"}
            className="flex items-center gap-2 text-xs font-sans tracking-widest uppercase hover:text-amber-100 transition-colors"
          >
            {isPlaying ? (
              <span className="flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5 animate-spin text-amber-400" />
                <span>Pause Fanfare</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5 text-amber-400/80" />
                <span>Play Fanfare</span>
              </span>
            )}
          </button>
          {isPlaying && (
            <button
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute" : "Mute"}
              className="text-amber-300/70 hover:text-amber-100 ml-1 p-1"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          )}
        </div>
      )}

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12 md:py-20 flex flex-col gap-16 md:gap-24">
        {/* ========================================================================= */}
        {/* SECTION 1: THE VANGUARD LAUREATE CITATION (PIAGAM KEHORMATAN)             */}
        {/* ========================================================================= */}
        <header className="relative">
          {/* Academy Laurels Badge */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/40 bg-gradient-to-r from-amber-950/40 via-blue-950/60 to-amber-950/40 text-amber-300 text-xs tracking-widest uppercase mb-4 shadow-lg shadow-amber-950/20">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>The Grand Laureate Fellowship of High Honors</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-light tracking-wide text-amber-100">
              {citationTitle}
            </h1>
            <p className="mt-2 text-amber-300/70 text-xs sm:text-sm tracking-widest uppercase font-sans">
              Convocation & Conferred Laurels Ceremony
            </p>
          </div>

          {/* Stately Diploma & Citation Plaque */}
          <div className="relative p-6 sm:p-10 rounded-2xl bg-gradient-to-b from-[#112038] to-[#0a1424] border-2 border-amber-500/50 shadow-2xl shadow-blue-950/90 overflow-hidden">
            {/* Gilded Border Corners */}
            <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-amber-400" />
            <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-amber-400" />
            <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-amber-400" />
            <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-amber-400" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {/* Left Column: Medal Seal */}
              <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-black/40 border border-amber-500/30 text-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 via-amber-600 to-amber-800 p-0.5 shadow-xl shadow-amber-900/50 flex items-center justify-center mb-3">
                  <div className="w-full h-full rounded-full bg-[#0d1a2d] border border-amber-300/60 flex flex-col items-center justify-center text-amber-200">
                    <GraduationCap className="w-8 h-8 text-amber-400 mb-0.5" />
                    <span className="text-[9px] font-mono tracking-widest text-amber-300/90">LAUREATE</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono tracking-widest text-amber-300 uppercase block">
                  {registryId}
                </span>
                <span className="text-[11px] font-sans text-slate-300/80 mt-1">Conferred in Honor</span>
              </div>

              {/* Right Column: Laureate Credentials */}
              <div className="md:col-span-2 space-y-4 text-sm font-sans">
                <div>
                  <span className="text-amber-400/80 uppercase text-[11px] tracking-wider block font-semibold">
                    Honored Laureate Recipient
                  </span>
                  <span className="text-2xl font-serif text-amber-100 font-normal">{recipientName}</span>
                </div>

                <div>
                  <span className="text-amber-400/80 uppercase text-[11px] tracking-wider block font-semibold">
                    Conferred Degree & Title
                  </span>
                  <span className="text-base text-amber-200/90 font-serif italic">{conferredTitle}</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-amber-500/20 pt-3 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 uppercase text-[10px] block">Alma Mater / Academy</span>
                    <span className="text-slate-200 font-medium">{institutionName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 uppercase text-[10px] block">Date of Conferral</span>
                    <span className="text-amber-300 font-mono">{conferralDate}</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/20 text-xs italic text-amber-200/90 font-serif">
                  &ldquo;{citationSummary}&rdquo;
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* SECTION 2: THE COMMENCEMENT KEYNOTE (SURAT PIDATO KEHORMATAN)             */}
        {/* ========================================================================= */}
        <section className="relative">
          <div className="flex items-center gap-3 mb-6">
            <BookmarkCheck className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-light tracking-wide text-amber-100">
              The Commencement Keynote
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-amber-500/40 via-blue-800/40 to-transparent" />
          </div>

          {/* Vellum Parchment Scroll */}
          <div
            className="relative p-8 sm:p-12 md:p-14 rounded-2xl shadow-2xl border-2 border-amber-500/30 text-stone-900 overflow-hidden"
            style={{
              backgroundColor: "#faf6ee",
              backgroundImage: `
                radial-gradient(circle at 15% 15%, rgba(202, 166, 79, 0.08) 0%, transparent 40%),
                radial-gradient(circle at 85% 85%, rgba(13, 26, 45, 0.06) 0%, transparent 40%)
              `,
            }}
          >
            {/* Header of the Keynote */}
            <div className="flex items-center justify-between border-b border-stone-300/80 pb-4 mb-8">
              <div className="flex items-center gap-2 text-stone-600 text-xs uppercase tracking-widest font-sans">
                <Flame className="w-4 h-4 text-amber-700" />
                <span>Commencement Address • Laureate Commendation</span>
              </div>
              <div className="text-xs font-mono text-stone-500">{conferralDate}</div>
            </div>

            {/* Salutation */}
            <h3 className="text-lg sm:text-xl font-medium text-blue-950 mb-6 font-serif italic">
              {salutation}
            </h3>

            {/* Speech Body */}
            <div className="space-y-4 text-stone-800 text-base sm:text-lg leading-relaxed font-serif whitespace-pre-line text-justify">
              {message}
            </div>

            {/* Signoff & Official Seal */}
            <div className="mt-10 pt-6 border-t border-stone-300/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <p className="text-stone-600 italic text-sm">{signoff}</p>
                <p className="text-blue-950 font-semibold text-lg mt-1 font-serif">{senderName}</p>
              </div>

              {/* Gold Embossed Seal */}
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 via-amber-600 to-amber-800 border-2 border-amber-300/80 shadow-md flex items-center justify-center text-amber-100 text-[10px] font-mono font-bold tracking-wider text-center p-1">
                  {sealText.split(" ")[0] || "VERITAS"}
                </div>
                <div className="text-xs font-sans text-stone-500 uppercase tracking-widest">
                  Official Keynote Seal
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: THE 4 EPOCHS OF MASTERY (BABAK PERJUANGAN & TEROBOSAN)         */}
        {/* ========================================================================= */}
        <section className="relative">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle2 className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-light tracking-wide text-amber-100">
              The 4 Epochs of Mastery
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-amber-500/40 via-blue-800/40 to-transparent" />
          </div>
          <p className="text-slate-300/70 text-sm mb-8 font-sans">
            Empat babak penempaan diri dari hari pertama hingga puncak penobatan kehormatan.
          </p>

          {/* Stepper Timeline Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {epochs.map((epoch, idx) => (
              <button
                key={idx}
                onClick={() => setActiveEpochIndex(idx)}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  activeEpochIndex === idx
                    ? "bg-amber-500/20 border-amber-400 text-amber-100 shadow-xl shadow-amber-950/40 scale-[1.02]"
                    : "bg-[#0e1c31]/60 border-blue-900/40 text-slate-300/70 hover:border-amber-500/30 hover:text-amber-200"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-lg">{epoch.icon}</span>
                  <span className="text-[10px] font-mono text-amber-400/90 tracking-wider">
                    EPOCH 0{idx + 1}
                  </span>
                </div>
                <div className="font-serif italic text-sm font-semibold truncate text-amber-100">
                  {epoch.title}
                </div>
                <div className="text-[11px] font-sans truncate text-slate-400 mt-0.5">{epoch.period}</div>
              </button>
            ))}
          </div>

          {/* Active Epoch Details */}
          {epochs[activeEpochIndex] && (
            <div className="relative p-6 sm:p-10 rounded-2xl bg-gradient-to-b from-[#101f36] to-[#091322] border border-amber-500/40 shadow-2xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-500/20 pb-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{epochs[activeEpochIndex].icon}</span>
                    <h3 className="text-xl sm:text-2xl font-serif text-amber-100">
                      {epochs[activeEpochIndex].title}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-amber-400/80 uppercase tracking-widest">
                    {epochs[activeEpochIndex].period}
                  </span>
                </div>

                <div className={`px-4 py-2 rounded-full border text-xs font-sans ${epochs[activeEpochIndex].badgeColor}`}>
                  <span>Tahap Kemenangan Terverifikasi</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-black/30 border border-blue-900/30">
                  <span className="text-xs uppercase tracking-wider font-sans text-amber-400/90 block mb-1">
                    Titik Balik & Terobosan
                  </span>
                  <p className="text-base font-serif italic text-amber-200">
                    &ldquo;{epochs[activeEpochIndex].breakthrough}&rdquo;
                  </p>
                </div>

                <div>
                  <span className="text-xs uppercase tracking-wider font-sans text-slate-400 block mb-2">
                    Catatan Perjuangan & Ketahanan
                  </span>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-serif">
                    {epochs[activeEpochIndex].narrative}
                  </p>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: THE TRIPTYCH OF DISTINCTION (3 MEDALI KEHORMATAN EMAS 3D)      */}
        {/* ========================================================================= */}
        <section className="relative">
          <div className="flex items-center gap-3 mb-4">
            <Medal className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-light tracking-wide text-amber-100">
              The Triptych of Distinction
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-amber-500/40 via-blue-800/40 to-transparent" />
          </div>
          <p className="text-slate-300/70 text-sm mb-8 font-sans">
            Tiga medali kehormatan tertinggi atas kebajikan intelektual, kreativitas, dan integritas kepribadian.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {medals.map((medal, idx) => (
              <div
                key={idx}
                className="relative p-6 rounded-2xl bg-gradient-to-b from-[#12233c] to-[#0a1424] border border-amber-500/40 shadow-xl flex flex-col justify-between hover:scale-[1.02] transition-transform"
              >
                {/* Ribbon Header */}
                <div className="flex items-center justify-between mb-6 pb-3 border-b border-amber-500/20">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-6 rounded-sm bg-gradient-to-b ${medal.ribbonColor} shadow`} />
                    <span className="text-[10px] font-mono tracking-widest text-amber-300 uppercase">
                      Honor Medallion
                    </span>
                  </div>
                  <span className="text-2xl">{medal.medalEmoji}</span>
                </div>

                {/* Medal Title & Virtue */}
                <div className="mb-4">
                  <h3 className="text-lg font-serif font-medium text-amber-100 mb-1">
                    {medal.title}
                  </h3>
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-[11px] font-sans">
                    {medal.virtue}
                  </div>
                </div>

                {/* Citation */}
                <div className="pt-3 border-t border-white/5 text-xs text-slate-300 font-serif leading-relaxed italic">
                  &ldquo;{medal.citation}&rdquo;
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 5: THE 4 GRAND HORIZONS (PETA KOMPAS MASA DEPAN)                  */}
        {/* ========================================================================= */}
        <section className="relative">
          <div className="flex items-center gap-3 mb-4">
            <Compass className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl sm:text-2xl font-light tracking-wide text-amber-100">
              The 4 Grand Horizons
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-amber-500/40 via-blue-800/40 to-transparent" />
          </div>
          <p className="text-slate-300/70 text-sm mb-8 font-sans">
            Empat peta kompas panduan dan doa restu untuk menyongsong babak karier dan kontribusi nyata.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {horizons.map((horizon, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-gradient-to-b from-[#102038] to-[#091322] border border-amber-500/30 shadow-lg hover:border-amber-400/50 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-300 font-mono text-xs">
                    0{idx + 1}
                  </div>
                  <h3 className="font-serif font-medium text-amber-100 text-base">{horizon.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300/80 font-serif leading-relaxed italic pl-10">
                  &ldquo;{horizon.desc}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 6: STANDING OVATION & TRIUMPH FANFARE                             */}
        {/* ========================================================================= */}
        <footer className="relative text-center pt-8 pb-12 border-t border-amber-500/30">
          <div className="max-w-md mx-auto p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#11233e] to-[#0a1526] border border-amber-500/40 shadow-2xl">
            <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-2xl animate-bounce">
              👏
            </div>
            <h3 className="text-xl font-light text-amber-100 mb-2">Berikan Standing Ovation</h3>
            <p className="text-xs text-slate-300/80 font-sans mb-6">
              Sampaikan tepuk tangan penghormatan tertinggi atas dedikasi dan kemenangan yang telah diraih.
            </p>

            <div className="flex flex-col items-center gap-3">
              <button
                onClick={handleStandingOvation}
                className="px-6 py-3 rounded-full font-sans text-xs uppercase tracking-widest font-semibold flex items-center gap-2 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 shadow-xl shadow-amber-950/60 scale-100 hover:scale-105 active:scale-95 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>{hasApplauded ? "Ovation Diberikan! ✨" : "Beri Standing Ovation 🎓"}</span>
              </button>

              <div className="text-xs font-mono text-amber-400/90 mt-1">
                Total Tepuk Tangan Penghormatan: <span className="font-bold text-amber-200">{applauseCount}</span> Kali
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-center gap-2 text-xs font-sans text-slate-400 tracking-widest uppercase">
            <div className="flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Dianugerahkan Khusus untuk {recipientName}</span>
            </div>
            <span>Oleh {senderName} • The Grand Laureate Convocation</span>
          </div>
        </footer>
      </main>
    </div>
  );
}

export function GrandLaureateTemplate(props: TemplateComponentProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#08101d] flex items-center justify-center text-amber-200 text-sm font-serif">
          Menyiapkan Upacara Kehormatan Grand Laureate...
        </div>
      }
    >
      <GrandLaureateInner {...props} />
    </Suspense>
  );
}
