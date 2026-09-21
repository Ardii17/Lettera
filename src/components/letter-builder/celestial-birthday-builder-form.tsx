"use client";

import { useState } from "react";
import type {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  FieldErrors,
} from "react-hook-form";
import {
  Orbit,
  Radio,
  Compass,
  Sparkles,
  Star,
  Music,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Field, Input, Textarea } from "@/components/ui/field";
import { ColorPickerField } from "@/components/ui/color-picker-field";
import { BACKGROUND_COLOR_PRESETS } from "@/templates/color-presets";
import { cn } from "@/lib/utils/cn";
import type { LetterFormValues } from "./dynamic-form";

interface CelestialBirthdayBuilderFormProps {
  register: UseFormRegister<LetterFormValues>;
  setValue: UseFormSetValue<LetterFormValues>;
  watch: UseFormWatch<LetterFormValues>;
  errors: FieldErrors<LetterFormValues>;
  idPrefix?: string;
}

type TabType =
  | "telemetry"
  | "transmission"
  | "milestones"
  | "memories"
  | "wishes"
  | "theme";

const PRESET_MEMORIES = [
  {
    name: "Nebula Senyuman Pertama",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Ekspedisi Puncak Cahaya",
    url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Detik Penuh Kehangatan",
    url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Bintang Kehidupan",
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=200&q=60",
  },
];

export function CelestialBirthdayBuilderForm({
  register,
  setValue,
  watch,
  errors,
  idPrefix = "celestial-birthday",
}: CelestialBirthdayBuilderFormProps) {
  const [activeTab, setActiveTab] = useState<TabType>("telemetry");

  const tabs: Array<{ id: TabType; label: string; icon: typeof Orbit }> = [
    { id: "telemetry", label: "Identitas & Orbit", icon: Orbit },
    { id: "transmission", label: "Surat Transmisi", icon: Radio },
    { id: "milestones", label: "Milestone Orbit", icon: Compass },
    { id: "memories", label: "Kristal Kenangan", icon: Sparkles },
    { id: "wishes", label: "Doa Nebula", icon: Star },
    { id: "theme", label: "Warna & Musik", icon: Music },
  ];

  const currentTabIndex = tabs.findIndex((t) => t.id === activeTab);
  const currentMemory1 = watch("memory1Url") as string;

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex overflow-x-auto no-scrollbar gap-1.5 p-1 bg-slate-900/5 rounded-xl border border-slate-200">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200",
                isActive
                  ? "bg-white text-slate-900 shadow-sm font-semibold ring-1 ring-slate-900/10"
                  : "text-slate-500 hover:text-slate-900 hover:bg-white/50"
              )}
            >
              <Icon
                className={cn(
                  "w-3.5 h-3.5",
                  isActive ? "text-amber-500" : "text-slate-400"
                )}
              />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: IDENTITAS & TELEMETRI KOSMIK */}
      {activeTab === "telemetry" && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          <div className="bg-indigo-50/50 border border-indigo-200/60 rounded-xl p-4 text-xs sm:text-sm text-indigo-950">
            <p className="font-semibold mb-1">Identitas Kosmik & Hitungan Orbit</p>
            <p className="text-indigo-800/80 leading-relaxed">
              Atur nama penerima, jumlah orbit (usia), rasi bintang pelindung, serta kutipan filosofis kosmik pembuka.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Nama Sang Bintang (Yang Berulang Tahun)"
              error={errors.recipientName?.message}
              id={`${idPrefix}-recipientName`}
            >
              <Input
                id={`${idPrefix}-recipientName`}
                placeholder="Astrid Kimberly"
                {...register("recipientName", {
                  required: "Nama penerima wajib diisi",
                })}
              />
            </Field>

            <Field
              label="Angka Usia Baru (Orbit Mengelilingi Matahari)"
              error={errors.ageNumber?.message}
              id={`${idPrefix}-ageNumber`}
            >
              <Input
                id={`${idPrefix}-ageNumber`}
                placeholder="25"
                {...register("ageNumber", { required: "Usia wajib diisi" })}
              />
            </Field>
          </div>

          <Field
            label="Subjudul Perayaan Orbit"
            id={`${idPrefix}-orbitSubtitle`}
            helperText="Deskripsi ringkas perjalanan orbit"
          >
            <Input
              id={`${idPrefix}-orbitSubtitle`}
              placeholder="25 Solar Orbits Around The Sun"
              {...register("orbitSubtitle")}
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Tanggal Kelahiran / Stardate"
              error={errors.birthDate?.message}
              id={`${idPrefix}-birthDate`}
            >
              <Input
                id={`${idPrefix}-birthDate`}
                placeholder="18 November // Stardate 78912.4"
                {...register("birthDate", {
                  required: "Tanggal kelahiran wajib diisi",
                })}
              />
            </Field>

            <Field
              label="Rasi Bintang / Zodiak Pelindung"
              id={`${idPrefix}-zodiacSign`}
            >
              <Input
                id={`${idPrefix}-zodiacSign`}
                placeholder="Scorpio Constellation // Alpha Scorpii"
                {...register("zodiacSign")}
              />
            </Field>
          </div>

          <Field
            label="Koordinat Langit Astronomi"
            id={`${idPrefix}-starCoordinates`}
            helperText="Koordinat fiktif atau nyata posisi rasi bintang di langit malam"
          >
            <Input
              id={`${idPrefix}-starCoordinates`}
              placeholder="RA 16h 29m 24s / Dec -26° 25′ 55″"
              {...register("starCoordinates")}
            />
          </Field>

          <Field
            label="Kutipan Filosofis Kosmik Pembuka"
            id={`${idPrefix}-cosmicQuote`}
            helperText="Kutipan puitis tentang keindahan waktu dan semesta"
          >
            <Textarea
              id={`${idPrefix}-cosmicQuote`}
              rows={3}
              placeholder="Kau bukan sekadar berada di dalam semesta..."
              {...register("cosmicQuote")}
            />
          </Field>
        </div>
      )}

      {/* TAB 2: SURAT TRANSMISI KAPSUL WAKTU */}
      {activeTab === "transmission" && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          <div className="bg-amber-50/50 border border-amber-200/60 rounded-xl p-4 text-xs sm:text-sm text-amber-950">
            <p className="font-semibold mb-1">Surat Transmisi Antarbintang</p>
            <p className="text-amber-800/80 leading-relaxed">
              Tuliskan pesan yang tulus dan mendalam tentang perjalanan usia baru serta apresiasi kehadiran sosoknya.
            </p>
          </div>

          <Field
            label="Judul Surat Transmisi"
            error={errors.letterTitle?.message}
            id={`${idPrefix}-letterTitle`}
          >
            <Input
              id={`${idPrefix}-letterTitle`}
              placeholder="Transmisi Kapsul Waktu: Menemukan Cahaya di Antara Bintang"
              {...register("letterTitle", {
                required: "Judul surat wajib diisi",
              })}
            />
          </Field>

          <Field
            label="Isi Surat Utama (Transmisi Dekripsi)"
            error={errors.letterContent?.message}
            id={`${idPrefix}-letterContent`}
            helperText="Gunakan baris baru untuk memisahkan paragraf."
          >
            <Textarea
              id={`${idPrefix}-letterContent`}
              rows={8}
              placeholder="Selamat menyelesaikan satu putaran orbit penuh lainnya mengelilingi sang surya..."
              {...register("letterContent", {
                required: "Isi surat wajib diisi",
              })}
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Nama Pengirim (Kapten Transmisi)"
              error={errors.senderName?.message}
              id={`${idPrefix}-senderName`}
            >
              <Input
                id={`${idPrefix}-senderName`}
                placeholder="Arkan Danu"
                {...register("senderName", {
                  required: "Nama pengirim wajib diisi",
                })}
              />
            </Field>

            <Field
              label="Peran / Hubungan Pengirim"
              id={`${idPrefix}-senderRelation`}
            >
              <Input
                id={`${idPrefix}-senderRelation`}
                placeholder="Co-Pilot Perjalanan Hidup // Sahabat Sejati"
                {...register("senderRelation")}
              />
            </Field>
          </div>
        </div>
      )}

      {/* TAB 3: MILESTONE ORBIT KEHIDUPAN */}
      {activeTab === "milestones" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-indigo-50/50 border border-indigo-200/60 rounded-xl p-4 text-xs sm:text-sm text-indigo-950">
            <p className="font-semibold mb-1">Empat Fase Milestone Orbit</p>
            <p className="text-indigo-800/80 leading-relaxed">
              Catat 4 fase penting perjalanan hidup yang telah dilalui menuju babak kedewasaan saat ini.
            </p>
          </div>

          <div className="space-y-4">
            {/* Phase 1 */}
            <div className="p-4 border border-slate-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                Fase 1: Orbit Awal
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Label Periode" id={`${idPrefix}-milestone1Year`}>
                  <Input
                    id={`${idPrefix}-milestone1Year`}
                    placeholder="Orbit Awal"
                    {...register("milestone1Year")}
                  />
                </Field>
                <Field label="Nama Fase" id={`${idPrefix}-milestone1Title`}>
                  <Input
                    id={`${idPrefix}-milestone1Title`}
                    placeholder="The Genesis & Cosmic Spark"
                    {...register("milestone1Title")}
                  />
                </Field>
              </div>
              <Field
                label="Deskripsi Fase 1"
                id={`${idPrefix}-milestone1Desc`}
              >
                <Textarea
                  id={`${idPrefix}-milestone1Desc`}
                  rows={2}
                  placeholder="Langkah pertama mengenal dunia..."
                  {...register("milestone1Desc")}
                />
              </Field>
            </div>

            {/* Phase 2 */}
            <div className="p-4 border border-slate-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                Fase 2: Orbit Eksplorasi
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Label Periode" id={`${idPrefix}-milestone2Year`}>
                  <Input
                    id={`${idPrefix}-milestone2Year`}
                    placeholder="Orbit Eksplorasi"
                    {...register("milestone2Year")}
                  />
                </Field>
                <Field label="Nama Fase" id={`${idPrefix}-milestone2Title`}>
                  <Input
                    id={`${idPrefix}-milestone2Title`}
                    placeholder="The Starlight Voyage"
                    {...register("milestone2Title")}
                  />
                </Field>
              </div>
              <Field
                label="Deskripsi Fase 2"
                id={`${idPrefix}-milestone2Desc`}
              >
                <Textarea
                  id={`${idPrefix}-milestone2Desc`}
                  rows={2}
                  placeholder="Menemukan panggilan hati..."
                  {...register("milestone2Desc")}
                />
              </Field>
            </div>

            {/* Phase 3 */}
            <div className="p-4 border border-slate-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                Fase 3: Orbit Kedewasaan
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Label Periode" id={`${idPrefix}-milestone3Year`}>
                  <Input
                    id={`${idPrefix}-milestone3Year`}
                    placeholder="Orbit Kedewasaan"
                    {...register("milestone3Year")}
                  />
                </Field>
                <Field label="Nama Fase" id={`${idPrefix}-milestone3Title`}>
                  <Input
                    id={`${idPrefix}-milestone3Title`}
                    placeholder="Stellar Breakthrough"
                    {...register("milestone3Title")}
                  />
                </Field>
              </div>
              <Field
                label="Deskripsi Fase 3"
                id={`${idPrefix}-milestone3Desc`}
              >
                <Textarea
                  id={`${idPrefix}-milestone3Desc`}
                  rows={2}
                  placeholder="Titik pembuktian diri..."
                  {...register("milestone3Desc")}
                />
              </Field>
            </div>

            {/* Phase 4 */}
            <div className="p-4 border border-slate-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                Fase 4: Orbit Masa Depan
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Label Periode" id={`${idPrefix}-milestone4Year`}>
                  <Input
                    id={`${idPrefix}-milestone4Year`}
                    placeholder="Orbit Masa Depan"
                    {...register("milestone4Year")}
                  />
                </Field>
                <Field label="Nama Fase" id={`${idPrefix}-milestone4Title`}>
                  <Input
                    id={`${idPrefix}-milestone4Title`}
                    placeholder="The Infinite Horizon"
                    {...register("milestone4Title")}
                  />
                </Field>
              </div>
              <Field
                label="Deskripsi Fase 4"
                id={`${idPrefix}-milestone4Desc`}
              >
                <Textarea
                  id={`${idPrefix}-milestone4Desc`}
                  rows={2}
                  placeholder="Memasuki babak orbit baru..."
                  {...register("milestone4Desc")}
                />
              </Field>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: KRISTAL MEMORI HOLOGRAFIS */}
      {activeTab === "memories" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-sky-50/50 border border-sky-200/60 rounded-xl p-4 text-xs sm:text-sm text-sky-950">
            <p className="font-semibold mb-1">Kristal Memori Holografis</p>
            <p className="text-sky-800/80 leading-relaxed">
              Tampilkan 3 foto momen penting dan berharga dengan bingkai kosmik dan penanda stardate.
            </p>
          </div>

          {/* Quick Presets */}
          <div className="p-4 border border-slate-200 rounded-xl space-y-3 bg-white">
            <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Pilihan Cepat Foto Kosmik
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {PRESET_MEMORIES.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() =>
                    setValue("memory1Url", preset.url, { shouldDirty: true })
                  }
                  className={cn(
                    "p-2 rounded-lg border text-left text-xs transition-all flex flex-col items-center gap-1.5",
                    currentMemory1 === preset.url
                      ? "border-amber-500 bg-amber-50 font-semibold"
                      : "border-slate-200 hover:border-slate-300"
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={preset.thumb}
                    alt={preset.name}
                    className="w-full aspect-video object-cover rounded"
                  />
                  <span className="text-[11px] text-slate-700 truncate w-full text-center">
                    {preset.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {/* Memory 1 */}
            <div className="p-4 border border-slate-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                Kristal Memori 1
              </p>
              <Field label="URL Foto 1" id={`${idPrefix}-memory1Url`}>
                <Input
                  id={`${idPrefix}-memory1Url`}
                  placeholder="https://images.unsplash.com/..."
                  {...register("memory1Url")}
                />
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Judul Kenangan" id={`${idPrefix}-memory1Title`}>
                  <Input
                    id={`${idPrefix}-memory1Title`}
                    placeholder="Nebula Senyuman Pertama"
                    {...register("memory1Title")}
                  />
                </Field>
                <Field label="Stardate / Tanggal" id={`${idPrefix}-memory1Date`}>
                  <Input
                    id={`${idPrefix}-memory1Date`}
                    placeholder="Stardate 2023.08"
                    {...register("memory1Date")}
                  />
                </Field>
              </div>
              <Field label="Catatan Kenangan" id={`${idPrefix}-memory1Desc`}>
                <Textarea
                  id={`${idPrefix}-memory1Desc`}
                  rows={2}
                  placeholder="Momen ketika senyum manismu..."
                  {...register("memory1Desc")}
                />
              </Field>
            </div>

            {/* Memory 2 */}
            <div className="p-4 border border-slate-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                Kristal Memori 2
              </p>
              <Field label="URL Foto 2" id={`${idPrefix}-memory2Url`}>
                <Input
                  id={`${idPrefix}-memory2Url`}
                  placeholder="https://images.unsplash.com/..."
                  {...register("memory2Url")}
                />
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Judul Kenangan" id={`${idPrefix}-memory2Title`}>
                  <Input
                    id={`${idPrefix}-memory2Title`}
                    placeholder="Ekspedisi Puncak Cahaya"
                    {...register("memory2Title")}
                  />
                </Field>
                <Field label="Stardate / Tanggal" id={`${idPrefix}-memory2Date`}>
                  <Input
                    id={`${idPrefix}-memory2Date`}
                    placeholder="Stardate 2024.11"
                    {...register("memory2Date")}
                  />
                </Field>
              </div>
              <Field label="Catatan Kenangan" id={`${idPrefix}-memory2Desc`}>
                <Textarea
                  id={`${idPrefix}-memory2Desc`}
                  rows={2}
                  placeholder="Perjalanan tak terlupakan..."
                  {...register("memory2Desc")}
                />
              </Field>
            </div>

            {/* Memory 3 */}
            <div className="p-4 border border-slate-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                Kristal Memori 3
              </p>
              <Field label="URL Foto 3" id={`${idPrefix}-memory3Url`}>
                <Input
                  id={`${idPrefix}-memory3Url`}
                  placeholder="https://images.unsplash.com/..."
                  {...register("memory3Url")}
                />
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Judul Kenangan" id={`${idPrefix}-memory3Title`}>
                  <Input
                    id={`${idPrefix}-memory3Title`}
                    placeholder="Detik Penuh Kehangatan"
                    {...register("memory3Title")}
                  />
                </Field>
                <Field label="Stardate / Tanggal" id={`${idPrefix}-memory3Date`}>
                  <Input
                    id={`${idPrefix}-memory3Date`}
                    placeholder="Stardate 2025.06"
                    {...register("memory3Date")}
                  />
                </Field>
              </div>
              <Field label="Catatan Kenangan" id={`${idPrefix}-memory3Desc`}>
                <Textarea
                  id={`${idPrefix}-memory3Desc`}
                  rows={2}
                  placeholder="Tawa lepas yang membuktikan..."
                  {...register("memory3Desc")}
                />
              </Field>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: DOA & BERKAH NEBULA */}
      {activeTab === "wishes" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-amber-50/50 border border-amber-200/60 rounded-xl p-4 text-xs sm:text-sm text-amber-950">
            <p className="font-semibold mb-1">Empat Pilar Doa Nebula</p>
            <p className="text-amber-800/80 leading-relaxed">
              Tuliskan 4 doa & harapan terbaik yang dipancarkan ke semesta untuk sang tokoh utama.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 border border-slate-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                Pilar Doa 1
              </p>
              <Field label="Nama Berkah / Doa" id={`${idPrefix}-wish1Title`}>
                <Input
                  id={`${idPrefix}-wish1Title`}
                  placeholder="Doa Cahaya: Ketenangan Jiwa"
                  {...register("wish1Title")}
                />
              </Field>
              <Field label="Pesan Harapan" id={`${idPrefix}-wish1Desc`}>
                <Textarea
                  id={`${idPrefix}-wish1Desc`}
                  rows={2}
                  placeholder="Semoga hatimu selalu dilimpahi..."
                  {...register("wish1Desc")}
                />
              </Field>
            </div>

            <div className="p-4 border border-slate-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                Pilar Doa 2
              </p>
              <Field label="Nama Berkah / Doa" id={`${idPrefix}-wish2Title`}>
                <Input
                  id={`${idPrefix}-wish2Title`}
                  placeholder="Doa Gravitasi: Raga Sehat & Kokoh"
                  {...register("wish2Title")}
                />
              </Field>
              <Field label="Pesan Harapan" id={`${idPrefix}-wish2Desc`}>
                <Textarea
                  id={`${idPrefix}-wish2Desc`}
                  rows={2}
                  placeholder="Diberkahi kesehatan fisik..."
                  {...register("wish2Desc")}
                />
              </Field>
            </div>

            <div className="p-4 border border-slate-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                Pilar Doa 3
              </p>
              <Field label="Nama Berkah / Doa" id={`${idPrefix}-wish3Title`}>
                <Input
                  id={`${idPrefix}-wish3Title`}
                  placeholder="Doa Supernova: Prestasi & Kelimpahan"
                  {...register("wish3Title")}
                />
              </Field>
              <Field label="Pesan Harapan" id={`${idPrefix}-wish3Desc`}>
                <Textarea
                  id={`${idPrefix}-wish3Desc`}
                  rows={2}
                  placeholder="Setiap usaha dan impian..."
                  {...register("wish3Desc")}
                />
              </Field>
            </div>

            <div className="p-4 border border-slate-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                Pilar Doa 4
              </p>
              <Field label="Nama Berkah / Doa" id={`${idPrefix}-wish4Title`}>
                <Input
                  id={`${idPrefix}-wish4Title`}
                  placeholder="Doa Konstelasi: Kasih Abadi"
                  {...register("wish4Title")}
                />
              </Field>
              <Field label="Pesan Harapan" id={`${idPrefix}-wish4Desc`}>
                <Textarea
                  id={`${idPrefix}-wish4Desc`}
                  rows={2}
                  placeholder="Selalu dikelilingi sahabat tulus..."
                  {...register("wish4Desc")}
                />
              </Field>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: TEMA WARNA & MUSIK KOSMIK */}
      {activeTab === "theme" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-slate-900/5 border border-slate-200 rounded-xl p-4 text-xs sm:text-sm text-slate-800">
            <p className="font-semibold mb-1">Palet Warna Kosmik & Audio Ambient</p>
            <p className="text-slate-600 leading-relaxed">
              Sesuaikan warna pendar starlight gold, nebula violet, serta alunan musik ambient pengiring penjelajahan.
            </p>
          </div>

          <div className="p-4 border border-slate-200 rounded-xl space-y-4 bg-white">
            <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Audio Ambient Antariksa
            </p>
            <Field label="Judul Musik" id={`${idPrefix}-musicTitle`}>
              <Input
                id={`${idPrefix}-musicTitle`}
                placeholder="Celestial Voyage & Cosmic Ambient Lofi"
                {...register("musicTitle")}
              />
            </Field>
            <Field label="URL File Audio (MP3)" id={`${idPrefix}-musicUrl`}>
              <Input
                id={`${idPrefix}-musicUrl`}
                placeholder="https://..."
                {...register("musicUrl")}
              />
            </Field>
          </div>

          <div className="p-4 border border-slate-200 rounded-xl space-y-4 bg-white">
            <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Palet Warna Antariksa
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ColorPickerField
                label="Warna Aksen Starlight Gold"
                value={(watch("primaryColor") as string) || "#f6c86d"}
                onChange={(color) =>
                  setValue("primaryColor", color, { shouldDirty: true })
                }
              />
              <ColorPickerField
                label="Warna Aksen Nebula Violet"
                value={(watch("secondaryColor") as string) || "#818cf8"}
                onChange={(color) =>
                  setValue("secondaryColor", color, { shouldDirty: true })
                }
              />
              <ColorPickerField
                label="Warna Latar Kosmik"
                value={(watch("backgroundColor") as string) || "#0b0e1b"}
                onChange={(color) =>
                  setValue("backgroundColor", color, { shouldDirty: true })
                }
                presets={BACKGROUND_COLOR_PRESETS}
              />
              <ColorPickerField
                label="Warna Kontainer Kapsul"
                value={(watch("cardColor") as string) || "#13172b"}
                onChange={(color) =>
                  setValue("cardColor", color, { shouldDirty: true })
                }
              />
            </div>
          </div>
        </div>
      )}

      {/* Bottom Step Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
        <button
          type="button"
          disabled={currentTabIndex === 0}
          onClick={() => setActiveTab(tabs[currentTabIndex - 1].id)}
          className={cn(
            "inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-colors",
            currentTabIndex === 0
              ? "text-slate-300 cursor-not-allowed"
              : "text-slate-700 hover:bg-slate-100"
          )}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Sebelumnya</span>
        </button>

        <span className="text-xs text-slate-400 font-mono">
          Bagian {currentTabIndex + 1} dari {tabs.length}
        </span>

        <button
          type="button"
          disabled={currentTabIndex === tabs.length - 1}
          onClick={() => setActiveTab(tabs[currentTabIndex + 1].id)}
          className={cn(
            "inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-colors",
            currentTabIndex === tabs.length - 1
              ? "text-slate-300 cursor-not-allowed"
              : "bg-slate-900 text-white hover:bg-slate-800 shadow-sm"
          )}
        >
          <span>Lanjutkan</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
