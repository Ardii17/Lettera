"use client";

import { useState } from "react";
import type {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  FieldErrors,
} from "react-hook-form";
import {
  Map,
  Scroll,
  Compass,
  Anchor,
  ShieldCheck,
  Palette,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Waves,
} from "lucide-react";
import { Field, Input, Textarea } from "@/components/ui/field";
import { ColorPickerField } from "@/components/ui/color-picker-field";
import { cn } from "@/lib/utils/cn";
import type { LetterFormValues } from "./dynamic-form";

interface CartographyLoveBuilderFormProps {
  register: UseFormRegister<LetterFormValues>;
  setValue: UseFormSetValue<LetterFormValues>;
  watch: UseFormWatch<LetterFormValues>;
  errors: FieldErrors<LetterFormValues>;
  idPrefix?: string;
}

type TabType =
  | "cartouche"
  | "logbook"
  | "islands"
  | "instruments"
  | "admiralty"
  | "bottle";

export function CartographyLoveBuilderForm({
  register,
  setValue,
  watch,
  errors,
  idPrefix = "cartography-love",
}: CartographyLoveBuilderFormProps) {
  const [activeTab, setActiveTab] = useState<TabType>("cartouche");

  const tabs: Array<{ id: TabType; label: string; icon: React.ReactNode }> = [
    { id: "cartouche", label: "Sertifikat Peta", icon: <Map className="w-4 h-4" /> },
    { id: "logbook", label: "Warkah Nakhoda", icon: <Scroll className="w-4 h-4" /> },
    { id: "islands", label: "4 Kepulauan", icon: <Compass className="w-4 h-4" /> },
    { id: "instruments", label: "4 Instrumen", icon: <Anchor className="w-4 h-4" /> },
    { id: "admiralty", label: "Kedalaman & Sumpah", icon: <ShieldCheck className="w-4 h-4" /> },
    { id: "bottle", label: "Botol Laut & Tema", icon: <Palette className="w-4 h-4" /> },
  ];

  const primaryColor = watch("primaryColor") as string;
  const secondaryColor = watch("secondaryColor") as string;
  const accentColor = watch("accentColor") as string;

  const handleApplyPresetIslands = () => {
    setValue(
      "island1Name",
      "Île de la Première Rencontre (Pulau Pertemuan Pertama)"
    );
    setValue(
      "island1Coordinates",
      "Lat 14°08'N, Long 60°58'W • Laguna Pasir Emas Berair Kristal"
    );
    setValue(
      "island1Sounding",
      "Kedalaman 24 Depa • Air Bening Menembus Dasar Karang Hati"
    );
    setValue(
      "island1Story",
      "Teluk teduh berpasir putih di mana sauh kapalku pertama kali dijatuhkan. Hari saat tatap mata kita saling bersua, seketika gelombang keraguan di jiwaku mereda, digantikan oleh kedamaian yang belum pernah kutemukan di pelabuhan manapun."
    );
    setValue("island1Beacon", "Sauh Emas Pertama yang Mengunci Rasa");

    setValue("island2Name", "Golfe des Murmures (Teluk Bisikan Kasih)");
    setValue(
      "island2Coordinates",
      "Lat 21°19'N, Long 157°52'W • Perairan Teduh Bernaung Bukit Asri"
    );
    setValue(
      "island2Sounding",
      "Kedalaman 60 Depa • Bebas Dari Riak dan Embusan Gelisah"
    );
    setValue(
      "island2Story",
      "Perairan sunyi di balik teluk pelindung tempat rahasia, impian, dan tawa kita berpadu dalam kehangatan malam. Di sini kita belajar saling membuka kerentanan tanpa rasa takut, membiarkan deburan ombak menjadi melodi pengantar tidur bagi jiwa kita."
    );
    setValue("island2Beacon", "Rembulan Kembar Penuntun Kegelapan Malam");

    setValue(
      "island3Name",
      "Détroit des Tempêtes Vaincues (Selat Badai yang Ditaklukkan)"
    );
    setValue(
      "island3Coordinates",
      "Lat 35°58'S, Long 138°08'E • Tebing Karang Granit yang Kokoh"
    );
    setValue(
      "island3Sounding",
      "Kedalaman 120 Depa • Fondasi Karang Abadi Tak Tergoyahkan"
    );
    setValue(
      "island3Story",
      "Jalur pelayaran sempit berkarang terjal di mana kita pernah diuji oleh pasang surut dan badai hidup yang sengit. Namun dengan saling menggenggam tangan erat di atas kemudi, kita berhasil menaklukkan setiap hempasan ombak dan keluar menjadi nahkoda cinta yang jauh lebih tangguh."
    );
    setValue("island3Beacon", "Lentera Mercusuar Granit Abadi Tak Pernah Padam");

    setValue("island4Name", "Cap de l'Éternité (Tanjung Keabadian)");
    setValue(
      "island4Coordinates",
      "Lat 00°00'N, Long 00°00'E • Samudra Terbuka Tanpa Batas Akhir"
    );
    setValue(
      "island4Sounding",
      "Kedalaman Samudra Hati (Palung Tanpa Batas Ukuran)"
    );
    setValue(
      "island4Story",
      "Ujung tanjung megah tempat laut dan langit menyatu menjadi satu garis cakrawala keemasan. Tempat di mana matahari tak pernah terbenam, dan pelayaran kita bukan lagi tentang mencari tanah baru, melainkan menikmati setiap embusan angin berdua selamanya."
    );
    setValue("island4Beacon", "Cakrawala Fajar Keemasan Tanpa Batas Waktu");
  };

  const getNextTab = (): TabType | null => {
    const currentIndex = tabs.findIndex((t) => t.id === activeTab);
    return currentIndex < tabs.length - 1 ? tabs[currentIndex + 1].id : null;
  };

  const getPrevTab = (): TabType | null => {
    const currentIndex = tabs.findIndex((t) => t.id === activeTab);
    return currentIndex > 0 ? tabs[currentIndex - 1].id : null;
  };

  const colorPresets = [
    { label: "Royal Gold & Indigo", primary: "#d4af37", secondary: "#2dd4bf", accent: "#0b1e32" },
    { label: "Antique Brass & Sea Teal", primary: "#e5c07b", secondary: "#14b8a6", accent: "#06121e" },
    { label: "Maritime Navy & Sunburst", primary: "#f59e0b", secondary: "#38bdf8", accent: "#081b2e" },
    { label: "Verdigris & Parchment Amber", primary: "#2dd4bf", secondary: "#fbbf24", accent: "#041525" },
  ];

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className="flex border-b border-border/40 overflow-x-auto gap-1 pb-1 scrollbar-thin">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-t-lg transition-colors whitespace-nowrap border-b-2",
                isActive
                  ? "border-amber-500 text-amber-600 dark:text-amber-400 bg-amber-500/10 font-semibold"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30"
              )}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: Sertifikat Kartografi & Royal Cartouche */}
      {activeTab === "cartouche" && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-200">
            <p className="font-semibold mb-0.5">Sertifikat Kartografi Kerajaan (Royal Cartouche)</p>
            <p>
              Tentukan identitas peta samudra, nomor registrasi piagam, serta koordinat titik awal pertemuan dan tujuan labuhan keabadian.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Nama Sang Mercusuar (Penerima)" error={errors.recipientName?.message} required>
              <Input
                {...register("recipientName", { required: "Nama penerima wajib diisi" })}
                id={`${idPrefix}-recipientName`}
                placeholder="Seraphina Clarisse"
              />
            </Field>

            <Field label="Nama Sang Penjelajah (Pengirim)" error={errors.senderName?.message} required>
              <Input
                {...register("senderName", { required: "Nama pengirim wajib diisi" })}
                id={`${idPrefix}-senderName`}
                placeholder="Captain Julian Vance"
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Nomor Registrasi Peta Kerajaan">
              <Input
                {...register("mapSheetNo")}
                id={`${idPrefix}-mapSheetNo`}
                placeholder="CHART-N°17-AMORIS"
              />
            </Field>

            <Field label="Segel Lembaga Kartografi Resmi">
              <Input
                {...register("cartographerSeal")}
                id={`${idPrefix}-cartographerSeal`}
                placeholder="Regia Societas Cartographica Amoris"
              />
            </Field>
          </div>

          <Field label="Judul Bingkai Cartouche Kerajaan">
            <Input
              {...register("royalCartoucheTitle")}
              id={`${idPrefix}-royalCartoucheTitle`}
              placeholder="NOVA ET ACCURATA TOTIUS AMORIS TABULA"
            />
          </Field>

          <Field label="Subjudul Peta Samudra">
            <Input
              {...register("chartSubtitle")}
              id={`${idPrefix}-chartSubtitle`}
              placeholder="Peta Sutra Pelayaran Jiwa Mengarungi Samudra Kasih..."
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Koordinat Awal Pertemuan (Latitude/Longitude)">
              <Input
                {...register("initialMeetingCoordinates")}
                id={`${idPrefix}-initialMeetingCoordinates`}
                placeholder="48°51'24&quot;N • 02°21'07&quot;E..."
              />
            </Field>

            <Field label="Koordinat Labuhan Tujuan Abadi">
              <Input
                {...register("destinationCoordinates")}
                id={`${idPrefix}-destinationCoordinates`}
                placeholder="00°00'00&quot;N • ∞°∞'∞&quot;E..."
              />
            </Field>
          </div>

          <Field label="Kondisi Perairan & Catatan Rumb Navigasi">
            <Input
              {...register("seaCurrentNote")}
              id={`${idPrefix}-seaCurrentNote`}
              placeholder="Perairan Tenang Bebas Karang Prasangka • Diterangi Bintang Kejora"
            />
          </Field>
        </div>
      )}

      {/* TAB 2: Warkah Pelayaran Nakhoda */}
      {activeTab === "logbook" && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-lg bg-teal-500/10 border border-teal-500/20 text-xs text-teal-800 dark:text-teal-200">
            <p className="font-semibold mb-0.5">Warkah Catatan Jurnal Nakhoda (Captain&apos;s Logbook)</p>
            <p>
              Tuliskan surat cinta naratif yang diibaratkan pelayaran mengarungi gelombang samudera hingga menemukan dermaga sejati pada diri pasangan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Waktu & Posisi Jurnal Pelayaran">
              <Input
                {...register("logbookDate")}
                id={`${idPrefix}-logbookDate`}
                placeholder="Tengah Malam di Titik Balik Samudra • Malam Berbintang"
              />
            </Field>

            <Field label="Judul Catatan Jurnal">
              <Input
                {...register("logbookTitle")}
                id={`${idPrefix}-logbookTitle`}
                placeholder="Catatan Warkah Nakhoda di Bawah Cahaya Lentera Kabin"
              />
            </Field>
          </div>

          <Field label="Isi Warkah Pelayaran Kasih (Warkah Utama)" error={errors.mainMessage?.message} required>
            <Textarea
              {...register("mainMessage", { required: "Isi surat cinta wajib diisi" })}
              id={`${idPrefix}-mainMessage`}
              rows={8}
              placeholder="Tuliskan surat cinta pelayaran yang menyentuh hati..."
            />
          </Field>

          <Field label="Aksioma Filosofis Pelaut Cinta">
            <Input
              {...register("marinerAxiom")}
              id={`${idPrefix}-marinerAxiom`}
              placeholder="Kapal mungkin mengarungi seribu samudra bergelora..."
            />
          </Field>

          <Field label="Sebutan Penutup Tanda Tangan Nakhoda">
            <Input
              {...register("captainSignatureTitle")}
              id={`${idPrefix}-captainSignatureTitle`}
              placeholder="Nakhoda yang Selalu Menghadapkan Layarnya ke Arah Hatimu,"
            />
          </Field>
        </div>
      )}

      {/* TAB 3: 4 Kepulauan Kasih Interaktif */}
      {activeTab === "islands" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <div className="text-xs text-amber-800 dark:text-amber-200">
              <p className="font-semibold mb-0.5">Eksplorasi 4 Kepulauan Kasih (Carte de Tendre)</p>
              <p>
                Empat pulau dan teluk cinta dengan koordinat, kedalaman depa (sounding), dan narasi momen sakral.
              </p>
            </div>
            <button
              type="button"
              onClick={handleApplyPresetIslands}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-amber-600 text-white hover:bg-amber-700 shadow-sm shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Gunakan Narasi Klasik</span>
            </button>
          </div>

          {/* Island 1 */}
          <div className="p-4 rounded-xl border border-border/70 bg-card/60 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Pulau 1: Pertemuan Pertama
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Nama Pulau">
                <Input {...register("island1Name")} placeholder="Île de la Première Rencontre" />
              </Field>
              <Field label="Landmark Jiwa">
                <Input {...register("island1Beacon")} placeholder="Sauh Emas Pertama" />
              </Field>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Koordinat & Topografi">
                <Input {...register("island1Coordinates")} placeholder="Lat 14°08'N, Long 60°58'W" />
              </Field>
              <Field label="Kedalaman Depa (Sounding)">
                <Input {...register("island1Sounding")} placeholder="Kedalaman 24 Depa..." />
              </Field>
            </div>
            <Field label="Catatan Narasi Cinta">
              <Textarea {...register("island1Story")} rows={2} placeholder="Teluk teduh berpasir putih..." />
            </Field>
          </div>

          {/* Island 2 */}
          <div className="p-4 rounded-xl border border-border/70 bg-card/60 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              Pulau 2: Teluk Bisikan Kasih
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Nama Teluk/Perairan">
                <Input {...register("island2Name")} placeholder="Golfe des Murmures" />
              </Field>
              <Field label="Landmark Jiwa">
                <Input {...register("island2Beacon")} placeholder="Rembulan Kembar Penuntun" />
              </Field>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Koordinat & Topografi">
                <Input {...register("island2Coordinates")} placeholder="Lat 21°19'N, Long 157°52'W" />
              </Field>
              <Field label="Kedalaman Depa (Sounding)">
                <Input {...register("island2Sounding")} placeholder="Kedalaman 60 Depa..." />
              </Field>
            </div>
            <Field label="Catatan Narasi Cinta">
              <Textarea {...register("island2Story")} rows={2} placeholder="Perairan sunyi di balik teluk..." />
            </Field>
          </div>

          {/* Island 3 */}
          <div className="p-4 rounded-xl border border-border/70 bg-card/60 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Pulau 3: Selat Badai yang Ditaklukkan
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Nama Selat/Tebing">
                <Input {...register("island3Name")} placeholder="Détroit des Tempêtes Vaincues" />
              </Field>
              <Field label="Landmark Jiwa">
                <Input {...register("island3Beacon")} placeholder="Lentera Mercusuar Granit" />
              </Field>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Koordinat & Topografi">
                <Input {...register("island3Coordinates")} placeholder="Lat 35°58'S, Long 138°08'E" />
              </Field>
              <Field label="Kedalaman Depa (Sounding)">
                <Input {...register("island3Sounding")} placeholder="Kedalaman 120 Depa..." />
              </Field>
            </div>
            <Field label="Catatan Narasi Cinta">
              <Textarea {...register("island3Story")} rows={2} placeholder="Jalur pelayaran sempit berkarang..." />
            </Field>
          </div>

          {/* Island 4 */}
          <div className="p-4 rounded-xl border border-border/70 bg-card/60 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Pulau 4: Tanjung Keabadian
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Nama Tanjung/Samudra">
                <Input {...register("island4Name")} placeholder="Cap de l'Éternité" />
              </Field>
              <Field label="Landmark Jiwa">
                <Input {...register("island4Beacon")} placeholder="Cakrawala Fajar Keemasan" />
              </Field>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Koordinat & Topografi">
                <Input {...register("island4Coordinates")} placeholder="Lat 00°00'N, Long 00°00'E" />
              </Field>
              <Field label="Kedalaman Depa (Sounding)">
                <Input {...register("island4Sounding")} placeholder="Kedalaman Samudra Hati..." />
              </Field>
            </div>
            <Field label="Catatan Narasi Cinta">
              <Textarea {...register("island4Story")} rows={2} placeholder="Ujung tanjung megah tempat laut dan langit..." />
            </Field>
          </div>
        </div>
      )}

      {/* TAB 4: 4 Instrumen Navigasi Sakral Pelaut */}
      {activeTab === "instruments" && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-lg bg-teal-500/10 border border-teal-500/20 text-xs text-teal-800 dark:text-teal-200">
            <p className="font-semibold mb-0.5">Empat Instrumen Navigasi Kuningan Sakral</p>
            <p>
              Instrumen navigasi maritim klasik penuntun arah pelayaran hati agar tak pernah tersesat.
            </p>
          </div>

          {/* Instrument 1 */}
          <div className="p-4 rounded-xl border border-border/70 bg-card/60 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Instrumen 1: Astrolab Bintang (Astrolabe)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Nama Instrumen">
                <Input {...register("instrument1Name")} placeholder="The Brass Astrolabe" />
              </Field>
              <Field label="Fungsi Penuntun">
                <Input {...register("instrument1Role")} placeholder="Penjajar Posisi Bintang Penuntun" />
              </Field>
            </div>
            <Field label="Filosofi Navigasi">
              <Textarea {...register("instrument1Desc")} rows={2} placeholder="Ditempa dari kuningan murni..." />
            </Field>
          </div>

          {/* Instrument 2 */}
          <div className="p-4 rounded-xl border border-border/70 bg-card/60 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              Instrumen 2: Sekstan Maritim (Sextant)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Nama Instrumen">
                <Input {...register("instrument2Name")} placeholder="The Mariner's Sextant" />
              </Field>
              <Field label="Fungsi Penuntun">
                <Input {...register("instrument2Role")} placeholder="Pengukur Sudut Kemilau Senyuman" />
              </Field>
            </div>
            <Field label="Filosofi Navigasi">
              <Textarea {...register("instrument2Desc")} rows={2} placeholder="Instrumen cermin ganda..." />
            </Field>
          </div>

          {/* Instrument 3 */}
          <div className="p-4 rounded-xl border border-border/70 bg-card/60 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Instrumen 3: Jam Pasir Emas (Hourglass)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Nama Instrumen">
                <Input {...register("instrument3Name")} placeholder="The Hourglass of Golden Sand" />
              </Field>
              <Field label="Fungsi Penuntun">
                <Input {...register("instrument3Role")} placeholder="Penakar Butiran Waktu Sakral" />
              </Field>
            </div>
            <Field label="Filosofi Navigasi">
              <Textarea {...register("instrument3Desc")} rows={2} placeholder="Dua labu kaca kristal tertutup..." />
            </Field>
          </div>

          {/* Instrument 4 */}
          <div className="p-4 rounded-xl border border-border/70 bg-card/60 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Instrumen 4: Mawar Kompas Magnetik (Compass Rose)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Nama Instrumen">
                <Input {...register("instrument4Name")} placeholder="The Magnetic Compass Rose" />
              </Field>
              <Field label="Fungsi Penuntun">
                <Input {...register("instrument4Role")} placeholder="Penunjuk Kutub Utara Hati Sejati" />
              </Field>
            </div>
            <Field label="Filosofi Navigasi">
              <Textarea {...register("instrument4Desc")} rows={2} placeholder="Jarum besi magnetik yang mengambang..." />
            </Field>
          </div>
        </div>
      )}

      {/* TAB 5: Kedalaman Lubuk Hati & Sumpah Nakhoda */}
      {activeTab === "admiralty" && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-200">
            <p className="font-semibold mb-0.5">Kedalaman Hidrografi & Sumpah Nakhoda Abadi</p>
            <p>
              Parameter kedalaman depa lubuk hati, arah angin pasat kesetiaan, dan naskah piagam sumpah nakhoda.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Kedalaman Hidrografi Lubuk Hati (Fathoms)">
              <Input
                {...register("bathymetricDepth")}
                id={`${idPrefix}-bathymetricDepth`}
                placeholder="10,000 Fathoms • Kedalaman Jiwa Tanpa Dasar"
              />
            </Field>

            <Field label="Embusan Angin Pasat Utama">
              <Input
                {...register("tradeWindName")}
                id={`${idPrefix}-tradeWindName`}
                placeholder="Breeze of Constant Tenderness"
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Arus Samudra Penjaga Arah">
              <Input
                {...register("oceanicCurrent")}
                id={`${idPrefix}-oceanicCurrent`}
                placeholder="Gulf Stream of Eternal Loyalty"
              />
            </Field>

            <Field label="Status Jangkar dan Dermaga">
              <Input
                {...register("anchorStatus")}
                id={`${idPrefix}-anchorStatus`}
                placeholder="Terkunci Rapat di Palung Hatimu"
              />
            </Field>
          </div>

          <Field label="Judul Piagam Sumpah Nakhoda">
            <Input
              {...register("admiraltyOathTitle")}
              id={`${idPrefix}-admiraltyOathTitle`}
              placeholder="The Mariner's Eternal Admiralty Oath"
            />
          </Field>

          <Field label="Naskah Piagam Sumpah Nakhoda">
            <Textarea
              {...register("admiraltyOathText")}
              id={`${idPrefix}-admiraltyOathText`}
              rows={4}
              placeholder="Di hadapan luasnya samudra raya dan di bawah kesaksian bintang-bintang..."
            />
          </Field>

          <Field label="Gelar Nakhoda yang Menandatangani">
            <Input
              {...register("admiraltySignerTitle")}
              id={`${idPrefix}-admiraltySignerTitle`}
              placeholder="Nakhoda Pelayaran Jiwa & Pelindung Haluan Hidupmu,"
            />
          </Field>
        </div>
      )}

      {/* TAB 6: Botol Laut Kaca & Pengaturan Tema */}
      {activeTab === "bottle" && (
        <div className="space-y-6">
          <div className="p-3.5 rounded-lg bg-teal-500/10 border border-teal-500/20 text-xs text-teal-800 dark:text-teal-200">
            <p className="font-semibold mb-0.5">Pesan Rahasia Botol Hanyut (Message in a Bottle)</p>
            <p>
              Tuliskan pesan rahasia yang paling intim di dalam botol laut antik yang dapat dibuka penerima.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Label Botol Laut">
              <Input
                {...register("bottleLabel")}
                id={`${idPrefix}-bottleLabel`}
                placeholder="Botol Laut Kaca Zamrud Bersegel Gabus Lilin"
              />
            </Field>

            <Field label="Teks Tombol Buka Gabus">
              <Input
                {...register("bottleButtonText")}
                id={`${idPrefix}-bottleButtonText`}
                placeholder="Buka Sumbat Gabus Botol Laut"
              />
            </Field>
          </div>

          <Field label="Pesan Rahasia di Dalam Botol">
            <Textarea
              {...register("bottleSecretMessage")}
              id={`${idPrefix}-bottleSecretMessage`}
              rows={4}
              placeholder="Jika surat ini pernah hanyut di ribuan perairan asing..."
            />
          </Field>

          <Field label="Kutipan Penutup Botol Laut">
            <Input
              {...register("bottleClosingQuote")}
              id={`${idPrefix}-bottleClosingQuote`}
              placeholder="Dihanyutkan di lautan waktu, ditakdirkan untuk berlabuh di genggamanmu..."
            />
          </Field>

          {/* Palette presets */}
          <div className="space-y-2 pt-2 border-t border-border/50">
            <span className="text-xs font-semibold text-foreground">Preset Warna Tema Peta:</span>
            <div className="grid grid-cols-2 gap-2">
              {colorPresets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setValue("primaryColor", preset.primary);
                    setValue("secondaryColor", preset.secondary);
                    setValue("accentColor", preset.accent);
                  }}
                  className="p-2.5 rounded-lg border border-border/70 hover:border-amber-400/60 text-left transition flex items-center justify-between bg-card/50"
                >
                  <span className="text-xs font-medium text-foreground">{preset.label}</span>
                  <div className="flex gap-1">
                    <span className="w-3.5 h-3.5 rounded-full border border-black/20" style={{ backgroundColor: preset.primary }} />
                    <span className="w-3.5 h-3.5 rounded-full border border-black/20" style={{ backgroundColor: preset.secondary }} />
                    <span className="w-3.5 h-3.5 rounded-full border border-black/20" style={{ backgroundColor: preset.accent }} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Color pickers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <ColorPickerField
              label="Aksen Emas / Kuningan"
              value={primaryColor || "#d4af37"}
              onChange={(val) => setValue("primaryColor", val)}
              presets={[
                { label: "Renaissance Gold", value: "#d4af37" },
                { label: "Antique Brass", value: "#e5c07b" },
                { label: "Warm Sunburst", value: "#f59e0b" },
              ]}
            />
            <ColorPickerField
              label="Verdigris / Sea Foam"
              value={secondaryColor || "#2dd4bf"}
              onChange={(val) => setValue("secondaryColor", val)}
              presets={[
                { label: "Sea Foam Teal", value: "#2dd4bf" },
                { label: "Verdigris Jade", value: "#14b8a6" },
                { label: "Ocean Breeze", value: "#38bdf8" },
              ]}
            />
            <ColorPickerField
              label="Deep Maritime Indigo"
              value={accentColor || "#0b1e32"}
              onChange={(val) => setValue("accentColor", val)}
              presets={[
                { label: "Midnight Sea", value: "#0b1e32" },
                { label: "Abyssal Navy", value: "#06121e" },
                { label: "Deep Trench", value: "#041525" },
              ]}
            />
          </div>

          <Field label="URL Musik Latar (Melodi Bahari)">
            <Input
              {...register("musicTrack")}
              id={`${idPrefix}-musicTrack`}
              placeholder="https://cdn.pixabay.com/..."
            />
          </Field>
        </div>
      )}

      {/* Stepper Footer Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-border/40">
        {getPrevTab() ? (
          <button
            type="button"
            onClick={() => {
              const prev = getPrevTab();
              if (prev) setActiveTab(prev);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border border-border bg-background hover:bg-muted transition"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Sebelumnya</span>
          </button>
        ) : (
          <div />
        )}

        {getNextTab() && (
          <button
            type="button"
            onClick={() => {
              const next = getNextTab();
              if (next) setActiveTab(next);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-amber-600 text-white hover:bg-amber-700 transition ml-auto"
          >
            <span>Selanjutnya</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

export default CartographyLoveBuilderForm;
