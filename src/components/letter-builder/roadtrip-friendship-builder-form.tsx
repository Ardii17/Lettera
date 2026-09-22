"use client";

import { useState } from "react";
import type {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  FieldErrors,
} from "react-hook-form";
import type { LetterFormValues } from "./dynamic-form";
import { Field, Input, Textarea } from "@/components/ui/field";
import { ImageUploadField } from "@/components/ui/image-upload-field";
import { ColorPickerField } from "@/components/ui/color-picker-field";
import { cn } from "@/lib/utils/cn";
import {
  Car,
  Navigation,
  ShieldCheck,
  Camera,
  FileText,
  KeyRound,
} from "lucide-react";
import {
  FRIENDSHIP_COLOR_PRESETS,
  BACKGROUND_COLOR_PRESETS,
  CARD_COLOR_PRESETS,
  TEXT_COLOR_PRESETS,
} from "@/templates/color-presets";

interface RoadtripFriendshipBuilderFormProps {
  register: UseFormRegister<LetterFormValues>;
  setValue: UseFormSetValue<LetterFormValues>;
  watch: UseFormWatch<LetterFormValues>;
  errors: FieldErrors<LetterFormValues>;
  idPrefix?: string;
}

type TabType = "hero" | "milemarkers" | "glovebox" | "billboards" | "logbook" | "pass";

export function RoadtripFriendshipBuilderForm({
  register,
  setValue,
  watch,
  errors,
  idPrefix = "roadtrip-friendship",
}: RoadtripFriendshipBuilderFormProps) {
  const [activeTab, setActiveTab] = useState<TabType>("hero");

  // Watch Image URLs
  const heroPhoto = watch("heroPhoto") as string | undefined;
  const billboard1Photo = watch("billboard1Photo") as string | undefined;
  const billboard2Photo = watch("billboard2Photo") as string | undefined;
  const billboard3Photo = watch("billboard3Photo") as string | undefined;
  const billboard4Photo = watch("billboard4Photo") as string | undefined;

  // Watch Colors
  const primaryColor = (watch("primaryColor") as string) || "#f59e0b";
  const backgroundColor = (watch("backgroundColor") as string) || "#0f172a";
  const cardColor = (watch("cardColor") as string) || "#1e293b";
  const textColor = (watch("textColor") as string) || "#fef08a";
  const bodyTextColor = (watch("bodyTextColor") as string) || "#cbd5e1";

  const tabs = [
    { id: "hero" as TabType, label: "1. Dashboard & Rute", icon: <Car className="w-3.5 h-3.5" /> },
    { id: "milemarkers" as TabType, label: "2. Rambu Kilometer", icon: <Navigation className="w-3.5 h-3.5" /> },
    { id: "glovebox" as TabType, label: "3. Laci & Aturan", icon: <ShieldCheck className="w-3.5 h-3.5" /> },
    { id: "billboards" as TabType, label: "4. Reklame Jalan Tol", icon: <Camera className="w-3.5 h-3.5" /> },
    { id: "logbook" as TabType, label: "5. Logbook Pengemudi", icon: <FileText className="w-3.5 h-3.5" /> },
    { id: "pass" as TabType, label: "6. Tiket Tol & Kontak", icon: <KeyRound className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-1.5 p-1.5 bg-paper-deep rounded-2xl border border-line">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150",
              activeTab === tab.id
                ? "bg-white text-ink shadow-xs font-semibold"
                : "text-ink-muted hover:text-ink hover:bg-white/50",
            )}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: DASHBOARD & RUTE (HERO, METRIK, WARNA)                             */}
      {/* ========================================================================= */}
      {activeTab === "hero" && (
        <div className="space-y-5 animate-fadeIn">
          {/* Skema Warna */}
          <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
              <Car className="w-4 h-4" />
              Skema Warna Suasana Jalan Raya & Dashboard
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ColorPickerField
                label="Warna Rambu & Lampu Jalan"
                value={primaryColor}
                onChange={(val) => setValue("primaryColor", val)}
                presets={FRIENDSHIP_COLOR_PRESETS.map((p) => ({ label: p.label, value: p.value }))}
                helperText="Warna rambu kuning jalan, tombol kontak, dan aksen kecepatan."
              />
              <ColorPickerField
                label="Warna Aspal Malam & Langit"
                value={backgroundColor}
                onChange={(val) => setValue("backgroundColor", val)}
                presets={BACKGROUND_COLOR_PRESETS.map((p) => ({ label: p.label, value: p.value }))}
                helperText="Warna dasar aspal dan latar belakang."
              />
              <ColorPickerField
                label="Warna Dashboard & Rambu"
                value={cardColor}
                onChange={(val) => setValue("cardColor", val)}
                presets={CARD_COLOR_PRESETS.map((p) => ({ label: p.label, value: p.value }))}
                helperText="Warna wadah panel speedometer dan kartu rambu."
              />
              <ColorPickerField
                label="Warna Teks Judul & Angka"
                value={textColor}
                onChange={(val) => setValue("textColor", val)}
                presets={TEXT_COLOR_PRESETS.map((p) => ({ label: p.label, value: p.value }))}
                helperText="Warna judul utama dan angka kilometer."
              />
            </div>
          </div>

          {/* Profil Driver & Co-Pilot */}
          <Field label="Kode Rute Perjalanan" error={errors.routeCode?.message}>
            <Input
              id={`${idPrefix}-routeCode`}
              {...register("routeCode")}
              placeholder="Contoh: ROUTE BFF-INFINITY • COAST TO COAST HIGHWAY"
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Nama Sahabat (Co-Pilot)" error={errors.friendName?.message}>
              <Input
                id={`${idPrefix}-friendName`}
                {...register("friendName", { required: "Nama co-pilot wajib diisi" })}
                placeholder="Contoh: Bagas Satria Pratama"
              />
            </Field>

            <Field label="Nama Pengirim (Driver)" error={errors.senderName?.message}>
              <Input
                id={`${idPrefix}-senderName`}
                {...register("senderName", { required: "Nama driver wajib diisi" })}
                placeholder="Contoh: Farhan Mahendra"
              />
            </Field>
          </div>

          <Field label="Julukan Duet Petualang (Duo Moniker)" error={errors.duoMoniker?.message}>
            <Input
              id={`${idPrefix}-duoMoniker`}
              {...register("duoMoniker")}
              placeholder="Contoh: The Endless Highway Drifters & Soul Brothers"
            />
          </Field>

          <Field label="Subjudul Sambutan Gerbang Tol" error={errors.heroSubtitle?.message}>
            <Textarea
              id={`${idPrefix}-heroSubtitle`}
              rows={3}
              {...register("heroSubtitle")}
              placeholder="Pesan pembuka perjalanan di jalan raya..."
            />
          </Field>

          {/* Foto Utama Dashboard */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-ink-muted uppercase tracking-wider block">
              Foto Utama di Dashboard / Kap Mobil (Hero Photo)
            </label>
            <ImageUploadField
              value={heroPhoto}
              onChange={(url) => setValue("heroPhoto", url)}
              label="Unggah Foto Roadtrip Bersama"
              helperText="Foto di mobil / pemandangan jalan. Jika kosong, akan otomatis memakai gambar estetik mobil tepi pantai."
            />
          </div>

          {/* Metrik Perjalanan */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-paper-deep border border-line">
            <Field label="Total Jarak Tertawa" error={errors.totalDistance?.message}>
              <Input
                id={`${idPrefix}-totalDistance`}
                {...register("totalDistance")}
                placeholder="Contoh: 12.500+ KM"
              />
            </Field>

            <Field label="Jumlah Pit-Stop / Rest Area" error={errors.pitStopsCount?.message}>
              <Input
                id={`${idPrefix}-pitStopsCount`}
                {...register("pitStopsCount")}
                placeholder="Contoh: 84 Pit-Stops"
              />
            </Field>

            <Field label="Status Tangki Bensin" error={errors.fuelStatus?.message}>
              <Input
                id={`${idPrefix}-fuelStatus`}
                {...register("fuelStatus")}
                placeholder="Contoh: Full Tank (100% Loyal)"
              />
            </Field>
          </div>

          {/* Audio Mixtape */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="URL Musik Mixtape Jalanan (.mp3)" error={errors.musicUrl?.message}>
              <Input
                id={`${idPrefix}-musicUrl`}
                {...register("musicUrl")}
                placeholder="https://.../highway-mixtape.mp3"
              />
            </Field>

            <Field label="Judul Trek Musik" error={errors.musicTitle?.message}>
              <Input
                id={`${idPrefix}-musicTitle`}
                {...register("musicTitle")}
                placeholder="Contoh: Highway Mixtape: Sunset Cruise & Open Windows"
              />
            </Field>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: RAMBU KILOMETER (MILEMARKERS)                                      */}
      {/* ========================================================================= */}
      {activeTab === "milemarkers" && (
        <div className="space-y-6 animate-fadeIn">
          <p className="text-xs text-ink-muted leading-relaxed">
            Tuliskan 4 tonggak kilometer penanda fase-fase penting dan petualangan berharga bersama sahabatmu.
          </p>

          {/* Rambu 1 */}
          <div className="p-4 rounded-2xl bg-paper-deep border border-line space-y-3">
            <span className="text-xs font-mono font-bold text-amber-600 block">🚩 RAMBU 01</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Penanda KM 1" error={errors.mile1Km?.message}>
                <Input id={`${idPrefix}-mile1Km`} {...register("mile1Km")} />
              </Field>
              <Field label="Waktu & Lokasi 1" error={errors.mile1Date?.message}>
                <Input id={`${idPrefix}-mile1Date`} {...register("mile1Date")} />
              </Field>
            </div>
            <Field label="Judul Momen 1" error={errors.mile1Title?.message}>
              <Input id={`${idPrefix}-mile1Title`} {...register("mile1Title")} />
            </Field>
            <Field label="Cerita Petualangan 1" error={errors.mile1Story?.message}>
              <Textarea id={`${idPrefix}-mile1Story`} rows={2} {...register("mile1Story")} />
            </Field>
          </div>

          {/* Rambu 2 */}
          <div className="p-4 rounded-2xl bg-paper-deep border border-line space-y-3">
            <span className="text-xs font-mono font-bold text-amber-600 block">🚩 RAMBU 02</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Penanda KM 2" error={errors.mile2Km?.message}>
                <Input id={`${idPrefix}-mile2Km`} {...register("mile2Km")} />
              </Field>
              <Field label="Waktu & Lokasi 2" error={errors.mile2Date?.message}>
                <Input id={`${idPrefix}-mile2Date`} {...register("mile2Date")} />
              </Field>
            </div>
            <Field label="Judul Momen 2" error={errors.mile2Title?.message}>
              <Input id={`${idPrefix}-mile2Title`} {...register("mile2Title")} />
            </Field>
            <Field label="Cerita Petualangan 2" error={errors.mile2Story?.message}>
              <Textarea id={`${idPrefix}-mile2Story`} rows={2} {...register("mile2Story")} />
            </Field>
          </div>

          {/* Rambu 3 */}
          <div className="p-4 rounded-2xl bg-paper-deep border border-line space-y-3">
            <span className="text-xs font-mono font-bold text-amber-600 block">🚩 RAMBU 03</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Penanda KM 3" error={errors.mile3Km?.message}>
                <Input id={`${idPrefix}-mile3Km`} {...register("mile3Km")} />
              </Field>
              <Field label="Waktu & Lokasi 3" error={errors.mile3Date?.message}>
                <Input id={`${idPrefix}-mile3Date`} {...register("mile3Date")} />
              </Field>
            </div>
            <Field label="Judul Momen 3" error={errors.mile3Title?.message}>
              <Input id={`${idPrefix}-mile3Title`} {...register("mile3Title")} />
            </Field>
            <Field label="Cerita Petualangan 3" error={errors.mile3Story?.message}>
              <Textarea id={`${idPrefix}-mile3Story`} rows={2} {...register("mile3Story")} />
            </Field>
          </div>

          {/* Rambu 4 */}
          <div className="p-4 rounded-2xl bg-paper-deep border border-line space-y-3">
            <span className="text-xs font-mono font-bold text-amber-600 block">🚩 RAMBU 04</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Penanda KM 4" error={errors.mile4Km?.message}>
                <Input id={`${idPrefix}-mile4Km`} {...register("mile4Km")} />
              </Field>
              <Field label="Waktu & Lokasi 4" error={errors.mile4Date?.message}>
                <Input id={`${idPrefix}-mile4Date`} {...register("mile4Date")} />
              </Field>
            </div>
            <Field label="Judul Momen 4" error={errors.mile4Title?.message}>
              <Input id={`${idPrefix}-mile4Title`} {...register("mile4Title")} />
            </Field>
            <Field label="Cerita Petualangan 4" error={errors.mile4Story?.message}>
              <Textarea id={`${idPrefix}-mile4Story`} rows={2} {...register("mile4Story")} />
            </Field>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: LACI GLOVEBOX & ATURAN JALAN                                       */}
      {/* ========================================================================= */}
      {activeTab === "glovebox" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Glovebox Stash */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-muted flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              4 Perlengkapan Wajib di Laci Dashboard (Glovebox)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-paper-deep border border-line space-y-2">
                <Field label="Item 1: Nama Benda" error={errors.stash1Title?.message}>
                  <Input id={`${idPrefix}-stash1Title`} {...register("stash1Title")} />
                </Field>
                <Field label="Item 1: Deskripsi" error={errors.stash1Desc?.message}>
                  <Input id={`${idPrefix}-stash1Desc`} {...register("stash1Desc")} />
                </Field>
              </div>

              <div className="p-3.5 rounded-xl bg-paper-deep border border-line space-y-2">
                <Field label="Item 2: Nama Benda" error={errors.stash2Title?.message}>
                  <Input id={`${idPrefix}-stash2Title`} {...register("stash2Title")} />
                </Field>
                <Field label="Item 2: Deskripsi" error={errors.stash2Desc?.message}>
                  <Input id={`${idPrefix}-stash2Desc`} {...register("stash2Desc")} />
                </Field>
              </div>

              <div className="p-3.5 rounded-xl bg-paper-deep border border-line space-y-2">
                <Field label="Item 3: Nama Benda" error={errors.stash3Title?.message}>
                  <Input id={`${idPrefix}-stash3Title`} {...register("stash3Title")} />
                </Field>
                <Field label="Item 3: Deskripsi" error={errors.stash3Desc?.message}>
                  <Input id={`${idPrefix}-stash3Desc`} {...register("stash3Desc")} />
                </Field>
              </div>

              <div className="p-3.5 rounded-xl bg-paper-deep border border-line space-y-2">
                <Field label="Item 4: Nama Benda" error={errors.stash4Title?.message}>
                  <Input id={`${idPrefix}-stash4Title`} {...register("stash4Title")} />
                </Field>
                <Field label="Item 4: Deskripsi" error={errors.stash4Desc?.message}>
                  <Input id={`${idPrefix}-stash4Desc`} {...register("stash4Desc")} />
                </Field>
              </div>
            </div>
          </div>

          {/* Aturan Jalan Raya */}
          <div className="space-y-4 pt-4 border-t border-line">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-muted flex items-center gap-1.5">
              <span className="text-amber-500">⚠️</span>
              3 Aturan Jalan Raya Tak Tertulis (Highway Rules)
            </h4>

            <div className="p-3.5 rounded-xl bg-paper-deep border border-line space-y-2">
              <Field label="Aturan 1" error={errors.rule1Title?.message}>
                <Input id={`${idPrefix}-rule1Title`} {...register("rule1Title")} />
              </Field>
              <Field label="Deskripsi Aturan 1" error={errors.rule1Desc?.message}>
                <Input id={`${idPrefix}-rule1Desc`} {...register("rule1Desc")} />
              </Field>
            </div>

            <div className="p-3.5 rounded-xl bg-paper-deep border border-line space-y-2">
              <Field label="Aturan 2" error={errors.rule2Title?.message}>
                <Input id={`${idPrefix}-rule2Title`} {...register("rule2Title")} />
              </Field>
              <Field label="Deskripsi Aturan 2" error={errors.rule2Desc?.message}>
                <Input id={`${idPrefix}-rule2Desc`} {...register("rule2Desc")} />
              </Field>
            </div>

            <div className="p-3.5 rounded-xl bg-paper-deep border border-line space-y-2">
              <Field label="Aturan 3" error={errors.rule3Title?.message}>
                <Input id={`${idPrefix}-rule3Title`} {...register("rule3Title")} />
              </Field>
              <Field label="Deskripsi Aturan 3" error={errors.rule3Desc?.message}>
                <Input id={`${idPrefix}-rule3Desc`} {...register("rule3Desc")} />
              </Field>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: REKLAME JALAN TOL (BILLBOARDS)                                     */}
      {/* ========================================================================= */}
      {activeTab === "billboards" && (
        <div className="space-y-6 animate-fadeIn">
          <p className="text-xs text-ink-muted leading-relaxed">
            Unggah 4 foto petualangan jalan raya bergaya papan reklame vintage.
            Setiap foto memiliki cadangan gambar otomatis yang estetik jika tidak diunggah.
          </p>

          {/* Billboard 1 */}
          <div className="p-4 rounded-2xl bg-paper-deep border border-line space-y-3">
            <h5 className="text-xs font-bold text-ink">🛣️ Reklame #01</h5>
            <ImageUploadField
              value={billboard1Photo}
              onChange={(url) => setValue("billboard1Photo", url)}
              label="Foto Reklame 1"
              helperText="Foto kabur / puncak / pegunungan."
            />
            <Field label="Judul Momen 1" error={errors.billboard1Title?.message}>
              <Input id={`${idPrefix}-billboard1Title`} {...register("billboard1Title")} />
            </Field>
            <div className="grid grid-cols-2 gap-2">
              <Field label="Lokasi & Jalur 1" error={errors.billboard1Location?.message}>
                <Input id={`${idPrefix}-billboard1Location`} {...register("billboard1Location")} />
              </Field>
              <Field label="Catatan Tawa 1" error={errors.billboard1Quote?.message}>
                <Input id={`${idPrefix}-billboard1Quote`} {...register("billboard1Quote")} />
              </Field>
            </div>
          </div>

          {/* Billboard 2 */}
          <div className="p-4 rounded-2xl bg-paper-deep border border-line space-y-3">
            <h5 className="text-xs font-bold text-ink">🛣️ Reklame #02</h5>
            <ImageUploadField
              value={billboard2Photo}
              onChange={(url) => setValue("billboard2Photo", url)}
              label="Foto Reklame 2"
              helperText="Foto rest area / santai senja."
            />
            <Field label="Judul Momen 2" error={errors.billboard2Title?.message}>
              <Input id={`${idPrefix}-billboard2Title`} {...register("billboard2Title")} />
            </Field>
            <div className="grid grid-cols-2 gap-2">
              <Field label="Lokasi & Jalur 2" error={errors.billboard2Location?.message}>
                <Input id={`${idPrefix}-billboard2Location`} {...register("billboard2Location")} />
              </Field>
              <Field label="Catatan Tawa 2" error={errors.billboard2Quote?.message}>
                <Input id={`${idPrefix}-billboard2Quote`} {...register("billboard2Quote")} />
              </Field>
            </div>
          </div>

          {/* Billboard 3 */}
          <div className="p-4 rounded-2xl bg-paper-deep border border-line space-y-3">
            <h5 className="text-xs font-bold text-ink">🛣️ Reklame #03</h5>
            <ImageUploadField
              value={billboard3Photo}
              onChange={(url) => setValue("billboard3Photo", url)}
              label="Foto Reklame 3"
              helperText="Foto pantai / tepi laut."
            />
            <Field label="Judul Momen 3" error={errors.billboard3Title?.message}>
              <Input id={`${idPrefix}-billboard3Title`} {...register("billboard3Title")} />
            </Field>
            <div className="grid grid-cols-2 gap-2">
              <Field label="Lokasi & Jalur 3" error={errors.billboard3Location?.message}>
                <Input id={`${idPrefix}-billboard3Location`} {...register("billboard3Location")} />
              </Field>
              <Field label="Catatan Tawa 3" error={errors.billboard3Quote?.message}>
                <Input id={`${idPrefix}-billboard3Quote`} {...register("billboard3Quote")} />
              </Field>
            </div>
          </div>

          {/* Billboard 4 */}
          <div className="p-4 rounded-2xl bg-paper-deep border border-line space-y-3">
            <h5 className="text-xs font-bold text-ink">🛣️ Reklame #04</h5>
            <ImageUploadField
              value={billboard4Photo}
              onChange={(url) => setValue("billboard4Photo", url)}
              label="Foto Reklame 4"
              helperText="Foto gerbang tol / kepulangan."
            />
            <Field label="Judul Momen 4" error={errors.billboard4Title?.message}>
              <Input id={`${idPrefix}-billboard4Title`} {...register("billboard4Title")} />
            </Field>
            <div className="grid grid-cols-2 gap-2">
              <Field label="Lokasi & Jalur 4" error={errors.billboard4Location?.message}>
                <Input id={`${idPrefix}-billboard4Location`} {...register("billboard4Location")} />
              </Field>
              <Field label="Catatan Tawa 4" error={errors.billboard4Quote?.message}>
                <Input id={`${idPrefix}-billboard4Quote`} {...register("billboard4Quote")} />
              </Field>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: LOGBOOK PENGEMUDI                                                  */}
      {/* ========================================================================= */}
      {activeTab === "logbook" && (
        <div className="space-y-4 animate-fadeIn">
          <Field label="Salam Pembuka Logbook" error={errors.logbookGreeting?.message}>
            <Input id={`${idPrefix}-logbookGreeting`} {...register("logbookGreeting")} />
          </Field>

          <Field label="Entri 1 (Refleksi Jarak & Waktu)" error={errors.logbookEntry1?.message}>
            <Textarea id={`${idPrefix}-logbookEntry1`} rows={3} {...register("logbookEntry1")} />
          </Field>

          <Field label="Entri 2 (Arti Kehadiran Co-Pilot)" error={errors.logbookEntry2?.message}>
            <Textarea id={`${idPrefix}-logbookEntry2`} rows={3} {...register("logbookEntry2")} />
          </Field>

          <Field label="Entri 3 (Janji Rute Masa Depan)" error={errors.logbookEntry3?.message}>
            <Textarea id={`${idPrefix}-logbookEntry3`} rows={3} {...register("logbookEntry3")} />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Salam Penutup" error={errors.logbookClosing?.message}>
              <Input id={`${idPrefix}-logbookClosing`} {...register("logbookClosing")} />
            </Field>

            <Field label="Nama Tanda Tangan" error={errors.logbookSignature?.message}>
              <Input id={`${idPrefix}-logbookSignature`} {...register("logbookSignature")} />
            </Field>
          </div>

          <Field label="Catatan Kaki Logbook (P.S.)" error={errors.logbookPostscript?.message}>
            <Input id={`${idPrefix}-logbookPostscript`} {...register("logbookPostscript")} />
          </Field>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: TIKET TOL & KONTAK MOBIL                                           */}
      {/* ========================================================================= */}
      {activeTab === "pass" && (
        <div className="space-y-4 animate-fadeIn">
          <div className="p-4 rounded-2xl bg-paper-deep border border-line space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
              <KeyRound className="w-4 h-4" />
              Tiket Tol Emas Seumur Hidup
            </h4>

            <Field label="Judul Tiket Tol Emas" error={errors.passTitle?.message}>
              <Input id={`${idPrefix}-passTitle`} {...register("passTitle")} />
            </Field>

            <Field label="Nomor Registrasi / Seri Tiket" error={errors.passSerial?.message}>
              <Input id={`${idPrefix}-passSerial`} {...register("passSerial")} />
            </Field>

            <Field label="Ketentuan Tiket Tol" error={errors.passTerms?.message}>
              <Textarea id={`${idPrefix}-passTerms`} rows={3} {...register("passTerms")} />
            </Field>
          </div>

          <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
              <Car className="w-4 h-4" />
              Kunci Kontak Mobil Interaktif
            </h4>

            <Field label="Ajakan Putar Kunci Kontak" error={errors.ignitionPrompt?.message}>
              <Input id={`${idPrefix}-ignitionPrompt`} {...register("ignitionPrompt")} />
            </Field>

            <Field label="Pesan Rahasia dari Kursi Kemudi" error={errors.secretCoPilotMessage?.message}>
              <Textarea id={`${idPrefix}-secretCoPilotMessage`} rows={3} {...register("secretCoPilotMessage")} />
            </Field>
          </div>
        </div>
      )}
    </div>
  );
}
