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
  Trees,
  Layers,
  Archive,
  Camera,
  Feather,
  Award,
} from "lucide-react";
import {
  FRIENDSHIP_COLOR_PRESETS,
  BACKGROUND_COLOR_PRESETS,
  CARD_COLOR_PRESETS,
  TEXT_COLOR_PRESETS,
} from "@/templates/color-presets";

interface TreehouseFriendshipBuilderFormProps {
  register: UseFormRegister<LetterFormValues>;
  setValue: UseFormSetValue<LetterFormValues>;
  watch: UseFormWatch<LetterFormValues>;
  errors: FieldErrors<LetterFormValues>;
  idPrefix?: string;
}

type TabType = "hero" | "rings" | "jars" | "railing" | "carved" | "deed";

export function TreehouseFriendshipBuilderForm({
  register,
  setValue,
  watch,
  errors,
  idPrefix = "treehouse-friendship",
}: TreehouseFriendshipBuilderFormProps) {
  const [activeTab, setActiveTab] = useState<TabType>("hero");

  // Watch Image URLs
  const heroPhoto = watch("heroPhoto") as string | undefined;
  const railing1Photo = watch("railing1Photo") as string | undefined;
  const railing2Photo = watch("railing2Photo") as string | undefined;
  const railing3Photo = watch("railing3Photo") as string | undefined;
  const railing4Photo = watch("railing4Photo") as string | undefined;

  // Watch Colors
  const primaryColor = (watch("primaryColor") as string) || "#10b981";
  const backgroundColor = (watch("backgroundColor") as string) || "#06231a";
  const cardColor = (watch("cardColor") as string) || "#0f362a";
  const textColor = (watch("textColor") as string) || "#ecfdf5";
  const bodyTextColor = (watch("bodyTextColor") as string) || "#cbd5e1";

  const tabs = [
    { id: "hero" as TabType, label: "1. Teras & Tangga Tali", icon: <Trees className="w-3.5 h-3.5" /> },
    { id: "rings" as TabType, label: "2. Cincin Tahun Pohon", icon: <Layers className="w-3.5 h-3.5" /> },
    { id: "jars" as TabType, label: "3. Toples Kenangan", icon: <Archive className="w-3.5 h-3.5" /> },
    { id: "railing" as TabType, label: "4. Foto Pagar Kayu", icon: <Camera className="w-3.5 h-3.5" /> },
    { id: "carved" as TabType, label: "5. Warkat Papan Kayu", icon: <Feather className="w-3.5 h-3.5" /> },
    { id: "deed" as TabType, label: "6. Piagam & Pintu Kolong", icon: <Award className="w-3.5 h-3.5" /> },
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
      {/* TAB 1: TERAS & TANGGA TALI (HERO, SANDI, WARNA)                           */}
      {/* ========================================================================= */}
      {activeTab === "hero" && (
        <div className="space-y-5 animate-fadeIn">
          {/* Skema Warna - Setiap Bagian Memiliki Box Tersendiri Secara Vertikal */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5 px-1">
              <Trees className="w-4 h-4" />
              Skema Warna Suasana Rumah Pohon & Alam
            </h4>
            <div className="space-y-4">
              <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
                <ColorPickerField
                  label="Warna Daun Zamrud & Lampu Peri"
                  value={primaryColor}
                  onChange={(val) => setValue("primaryColor", val)}
                  presets={FRIENDSHIP_COLOR_PRESETS.map((p) => ({ label: p.label, value: p.value }))}
                  helperText="Warna ornamen dedaunan, tombol, dan sorotan markas."
                />
              </div>
              <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
                <ColorPickerField
                  label="Warna Hutan Malam (Background)"
                  value={backgroundColor}
                  onChange={(val) => setValue("backgroundColor", val)}
                  presets={BACKGROUND_COLOR_PRESETS.map((p) => ({ label: p.label, value: p.value }))}
                  helperText="Warna kanopi hutan dan latar belakang."
                />
              </div>
              <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
                <ColorPickerField
                  label="Warna Papan Kayu Cedar (Card)"
                  value={cardColor}
                  onChange={(val) => setValue("cardColor", val)}
                  presets={CARD_COLOR_PRESETS.map((p) => ({ label: p.label, value: p.value }))}
                  helperText="Warna papan kayu wadah kartu kenangan."
                />
              </div>
              <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
                <ColorPickerField
                  label="Warna Teks Judul (Krim Daun)"
                  value={textColor}
                  onChange={(val) => setValue("textColor", val)}
                  presets={TEXT_COLOR_PRESETS.map((p) => ({ label: p.label, value: p.value }))}
                  helperText="Warna teks judul dan nama sahabat."
                />
              </div>
            </div>
          </div>

          {/* Profil Markas & Sahabat */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Nama Markas / Rumah Pohon" error={errors.clubhouseName?.message}>
              <Input
                id={`${idPrefix}-clubhouseName`}
                {...register("clubhouseName")}
                placeholder="Contoh: The Canopy Fort: Hideout of Soulmates"
              />
            </Field>

            <Field label="Ketukan & Kata Sandi Rahasia" error={errors.secretPassword?.message}>
              <Input
                id={`${idPrefix}-secretPassword`}
                {...register("secretPassword")}
                placeholder="Contoh: KETUK 3X • KATA SANDI: “SAHABAT SEJATI”"
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Nama Sahabat Terbaik" error={errors.friendName?.message}>
              <Input
                id={`${idPrefix}-friendName`}
                {...register("friendName", { required: "Nama sahabat wajib diisi" })}
                placeholder="Contoh: Alifia Zahra Paramitha"
              />
            </Field>

            <Field label="Nama Pengirim (Pendiri Markas)" error={errors.senderName?.message}>
              <Input
                id={`${idPrefix}-senderName`}
                {...register("senderName", { required: "Nama pengirim wajib diisi" })}
                placeholder="Contoh: Tiara Anindita"
              />
            </Field>
          </div>

          <Field label="Status Anggota Kehormatan (Duo Title)" error={errors.duoTitle?.message}>
            <Input
              id={`${idPrefix}-duoTitle`}
              {...register("duoTitle")}
              placeholder="Contoh: The Treehouse Founders & Lifelong Soul Sisters"
            />
          </Field>

          <Field label="Kutipan Sambutan di Tangga Pohon" error={errors.welcomePlaque?.message}>
            <Textarea
              id={`${idPrefix}-welcomePlaque`}
              rows={3}
              {...register("welcomePlaque")}
              placeholder="Pesan sambutan di gerbang rumah pohon..."
            />
          </Field>

          {/* Foto Utama Teras */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-ink-muted uppercase tracking-wider block">
              Foto Utama di Teras Rumah Pohon (Hero Photo)
            </label>
            <ImageUploadField
              value={heroPhoto}
              onChange={(url) => setValue("heroPhoto", url)}
              label="Unggah Foto Bersama di Alam / Rumah Pohon"
              helperText="Foto berdua di alam terbuka / ayunan. Jika kosong, otomatis memakai gambar estetik alam bebas."
            />
          </div>

          {/* Metrik Markas */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-paper-deep border border-line">
            <Field label="Tahun Didirikan (Masa Bersama)" error={errors.establishedYear?.message}>
              <Input
                id={`${idPrefix}-establishedYear`}
                {...register("establishedYear")}
                placeholder="Contoh: Est. 2015 (10 Tahun Markas)"
              />
            </Field>

            <Field label="Jam Bersembunyi dari Dunia" error={errors.hoursHidden?.message}>
              <Input
                id={`${idPrefix}-hoursHidden`}
                {...register("hoursHidden")}
                placeholder="Contoh: 3.650+ Jam Tawa"
              />
            </Field>

            <Field label="Tingkat Izin Akses" error={errors.securityLevel?.message}>
              <Input
                id={`${idPrefix}-securityLevel`}
                {...register("securityLevel")}
                placeholder="Contoh: Level BFF (Strictly Protected)"
              />
            </Field>
          </div>

          {/* Audio Musik */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="URL Musik Akustik & Lonceng Angin (.mp3)" error={errors.musicUrl?.message}>
              <Input
                id={`${idPrefix}-musicUrl`}
                {...register("musicUrl")}
                placeholder="https://.../windchimes.mp3"
              />
            </Field>

            <Field label="Judul Trek Musik" error={errors.musicTitle?.message}>
              <Input
                id={`${idPrefix}-musicTitle`}
                {...register("musicTitle")}
                placeholder="Contoh: Canopy Breeze & Wind Chimes Melancholy"
              />
            </Field>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: CINCIN TAHUN POHON                                                 */}
      {/* ========================================================================= */}
      {activeTab === "rings" && (
        <div className="space-y-6 animate-fadeIn">
          <p className="text-xs text-ink-muted leading-relaxed">
            Tuliskan 4 lapisan lingkaran pohon yang menggambarkan fase-fase pertumbuhan persahabatan kalian.
          </p>

          {/* Cincin 1 */}
          <div className="p-4 rounded-2xl bg-paper-deep border border-line space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-600 block">🌿 CINCIN 01</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Fase Cincin 1" error={errors.ring1Phase?.message}>
                <Input id={`${idPrefix}-ring1Phase`} {...register("ring1Phase")} />
              </Field>
              <Field label="Periode Waktu 1" error={errors.ring1Period?.message}>
                <Input id={`${idPrefix}-ring1Period`} {...register("ring1Period")} />
              </Field>
            </div>
            <Field label="Judul Momen 1" error={errors.ring1Title?.message}>
              <Input id={`${idPrefix}-ring1Title`} {...register("ring1Title")} />
            </Field>
            <Field label="Cerita Pertumbuhan 1" error={errors.ring1Story?.message}>
              <Textarea id={`${idPrefix}-ring1Story`} rows={2} {...register("ring1Story")} />
            </Field>
          </div>

          {/* Cincin 2 */}
          <div className="p-4 rounded-2xl bg-paper-deep border border-line space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-600 block">🌿 CINCIN 02</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Fase Cincin 2" error={errors.ring2Phase?.message}>
                <Input id={`${idPrefix}-ring2Phase`} {...register("ring2Phase")} />
              </Field>
              <Field label="Periode Waktu 2" error={errors.ring2Period?.message}>
                <Input id={`${idPrefix}-ring2Period`} {...register("ring2Period")} />
              </Field>
            </div>
            <Field label="Judul Momen 2" error={errors.ring2Title?.message}>
              <Input id={`${idPrefix}-ring2Title`} {...register("ring2Title")} />
            </Field>
            <Field label="Cerita Pertumbuhan 2" error={errors.ring2Story?.message}>
              <Textarea id={`${idPrefix}-ring2Story`} rows={2} {...register("ring2Story")} />
            </Field>
          </div>

          {/* Cincin 3 */}
          <div className="p-4 rounded-2xl bg-paper-deep border border-line space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-600 block">🌿 CINCIN 03</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Fase Cincin 3" error={errors.ring3Phase?.message}>
                <Input id={`${idPrefix}-ring3Phase`} {...register("ring3Phase")} />
              </Field>
              <Field label="Periode Waktu 3" error={errors.ring3Period?.message}>
                <Input id={`${idPrefix}-ring3Period`} {...register("ring3Period")} />
              </Field>
            </div>
            <Field label="Judul Momen 3" error={errors.ring3Title?.message}>
              <Input id={`${idPrefix}-ring3Title`} {...register("ring3Title")} />
            </Field>
            <Field label="Cerita Pertumbuhan 3" error={errors.ring3Story?.message}>
              <Textarea id={`${idPrefix}-ring3Story`} rows={2} {...register("ring3Story")} />
            </Field>
          </div>

          {/* Cincin 4 */}
          <div className="p-4 rounded-2xl bg-paper-deep border border-line space-y-3">
            <span className="text-xs font-mono font-bold text-emerald-600 block">🌿 CINCIN 04</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Fase Cincin 4" error={errors.ring4Phase?.message}>
                <Input id={`${idPrefix}-ring4Phase`} {...register("ring4Phase")} />
              </Field>
              <Field label="Periode Waktu 4" error={errors.ring4Period?.message}>
                <Input id={`${idPrefix}-ring4Period`} {...register("ring4Period")} />
              </Field>
            </div>
            <Field label="Judul Momen 4" error={errors.ring4Title?.message}>
              <Input id={`${idPrefix}-ring4Title`} {...register("ring4Title")} />
            </Field>
            <Field label="Cerita Pertumbuhan 4" error={errors.ring4Story?.message}>
              <Textarea id={`${idPrefix}-ring4Story`} rows={2} {...register("ring4Story")} />
            </Field>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: TOPLES KENANGAN (MASON JARS)                                       */}
      {/* ========================================================================= */}
      {activeTab === "jars" && (
        <div className="space-y-6 animate-fadeIn">
          <p className="text-xs text-ink-muted leading-relaxed">
            Tuliskan 4 benda kenangan atau artefak masa muda yang tersimpan rapi di toples kaca markas pohon.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-paper-deep border border-line space-y-2">
              <Field label="Toples 1: Nama Artefak" error={errors.jar1Title?.message}>
                <Input id={`${idPrefix}-jar1Title`} {...register("jar1Title")} />
              </Field>
              <Field label="Toples 1: Cerita Singkat" error={errors.jar1Desc?.message}>
                <Input id={`${idPrefix}-jar1Desc`} {...register("jar1Desc")} />
              </Field>
            </div>

            <div className="p-3.5 rounded-xl bg-paper-deep border border-line space-y-2">
              <Field label="Toples 2: Nama Artefak" error={errors.jar2Title?.message}>
                <Input id={`${idPrefix}-jar2Title`} {...register("jar2Title")} />
              </Field>
              <Field label="Toples 2: Cerita Singkat" error={errors.jar2Desc?.message}>
                <Input id={`${idPrefix}-jar2Desc`} {...register("jar2Desc")} />
              </Field>
            </div>

            <div className="p-3.5 rounded-xl bg-paper-deep border border-line space-y-2">
              <Field label="Toples 3: Nama Artefak" error={errors.jar3Title?.message}>
                <Input id={`${idPrefix}-jar3Title`} {...register("jar3Title")} />
              </Field>
              <Field label="Toples 3: Cerita Singkat" error={errors.jar3Desc?.message}>
                <Input id={`${idPrefix}-jar3Desc`} {...register("jar3Desc")} />
              </Field>
            </div>

            <div className="p-3.5 rounded-xl bg-paper-deep border border-line space-y-2">
              <Field label="Toples 4: Nama Artefak" error={errors.jar4Title?.message}>
                <Input id={`${idPrefix}-jar4Title`} {...register("jar4Title")} />
              </Field>
              <Field label="Toples 4: Cerita Singkat" error={errors.jar4Desc?.message}>
                <Input id={`${idPrefix}-jar4Desc`} {...register("jar4Desc")} />
              </Field>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: FOTO PAGAR KAYU                                                    */}
      {/* ========================================================================= */}
      {activeTab === "railing" && (
        <div className="space-y-6 animate-fadeIn">
          <p className="text-xs text-ink-muted leading-relaxed">
            Unggah 4 foto kenangan yang terpasang dengan paku kayu & washi tape di pagar teras rumah pohon.
            Setiap foto memiliki cadangan gambar otomatis yang estetik jika tidak diunggah.
          </p>

          {/* Railing Photo 1 */}
          <div className="p-4 rounded-2xl bg-paper-deep border border-line space-y-3">
            <h5 className="text-xs font-bold text-ink">📷 Foto Pagar #01</h5>
            <ImageUploadField
              value={railing1Photo}
              onChange={(url) => setValue("railing1Photo", url)}
              label="Foto Pagar 1"
              helperText="Foto ayunan / main bersama."
            />
            <Field label="Judul Momen 1" error={errors.railing1Title?.message}>
              <Input id={`${idPrefix}-railing1Title`} {...register("railing1Title")} />
            </Field>
            <div className="grid grid-cols-2 gap-2">
              <Field label="Tanggal Momen 1" error={errors.railing1Date?.message}>
                <Input id={`${idPrefix}-railing1Date`} {...register("railing1Date")} />
              </Field>
              <Field label="Catatan Kenangan 1" error={errors.railing1Memory?.message}>
                <Input id={`${idPrefix}-railing1Memory`} {...register("railing1Memory")} />
              </Field>
            </div>
          </div>

          {/* Railing Photo 2 */}
          <div className="p-4 rounded-2xl bg-paper-deep border border-line space-y-3">
            <h5 className="text-xs font-bold text-ink">📷 Foto Pagar #02</h5>
            <ImageUploadField
              value={railing2Photo}
              onChange={(url) => setValue("railing2Photo", url)}
              label="Foto Pagar 2"
              helperText="Foto piknik / santai di rumput."
            />
            <Field label="Judul Momen 2" error={errors.railing2Title?.message}>
              <Input id={`${idPrefix}-railing2Title`} {...register("railing2Title")} />
            </Field>
            <div className="grid grid-cols-2 gap-2">
              <Field label="Tanggal Momen 2" error={errors.railing2Date?.message}>
                <Input id={`${idPrefix}-railing2Date`} {...register("railing2Date")} />
              </Field>
              <Field label="Catatan Kenangan 2" error={errors.railing2Memory?.message}>
                <Input id={`${idPrefix}-railing2Memory`} {...register("railing2Memory")} />
              </Field>
            </div>
          </div>

          {/* Railing Photo 3 */}
          <div className="p-4 rounded-2xl bg-paper-deep border border-line space-y-3">
            <h5 className="text-xs font-bold text-ink">📷 Foto Pagar #03</h5>
            <ImageUploadField
              value={railing3Photo}
              onChange={(url) => setValue("railing3Photo", url)}
              label="Foto Pagar 3"
              helperText="Foto kabut fajar / alam bebas."
            />
            <Field label="Judul Momen 3" error={errors.railing3Title?.message}>
              <Input id={`${idPrefix}-railing3Title`} {...register("railing3Title")} />
            </Field>
            <div className="grid grid-cols-2 gap-2">
              <Field label="Tanggal Momen 3" error={errors.railing3Date?.message}>
                <Input id={`${idPrefix}-railing3Date`} {...register("railing3Date")} />
              </Field>
              <Field label="Catatan Kenangan 3" error={errors.railing3Memory?.message}>
                <Input id={`${idPrefix}-railing3Memory`} {...register("railing3Memory")} />
              </Field>
            </div>
          </div>

          {/* Railing Photo 4 */}
          <div className="p-4 rounded-2xl bg-paper-deep border border-line space-y-3">
            <h5 className="text-xs font-bold text-ink">📷 Foto Pagar #04</h5>
            <ImageUploadField
              value={railing4Photo}
              onChange={(url) => setValue("railing4Photo", url)}
              label="Foto Pagar 4"
              helperText="Foto pencapaian / wisuda / dekap erat."
            />
            <Field label="Judul Momen 4" error={errors.railing4Title?.message}>
              <Input id={`${idPrefix}-railing4Title`} {...register("railing4Title")} />
            </Field>
            <div className="grid grid-cols-2 gap-2">
              <Field label="Tanggal Momen 4" error={errors.railing4Date?.message}>
                <Input id={`${idPrefix}-railing4Date`} {...register("railing4Date")} />
              </Field>
              <Field label="Catatan Kenangan 4" error={errors.railing4Memory?.message}>
                <Input id={`${idPrefix}-railing4Memory`} {...register("railing4Memory")} />
              </Field>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: WARKAT PAPAN KAYU                                                  */}
      {/* ========================================================================= */}
      {activeTab === "carved" && (
        <div className="space-y-4 animate-fadeIn">
          <Field label="Salam Pembuka Warkat Ukiran" error={errors.carvedGreeting?.message}>
            <Input id={`${idPrefix}-carvedGreeting`} {...register("carvedGreeting")} />
          </Field>

          <Field label="Paragraf 1 (Saksi Tempat & Pertumbuhan)" error={errors.carvedParagraph1?.message}>
            <Textarea id={`${idPrefix}-carvedParagraph1`} rows={3} {...register("carvedParagraph1")} />
          </Field>

          <Field label="Paragraf 2 (Arti Rumah & Penerimaan Tulus)" error={errors.carvedParagraph2?.message}>
            <Textarea id={`${idPrefix}-carvedParagraph2`} rows={3} {...register("carvedParagraph2")} />
          </Field>

          <Field label="Paragraf 3 (Janji Masa Depan)" error={errors.carvedParagraph3?.message}>
            <Textarea id={`${idPrefix}-carvedParagraph3`} rows={3} {...register("carvedParagraph3")} />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Salam Penutup" error={errors.carvedClosing?.message}>
              <Input id={`${idPrefix}-carvedClosing`} {...register("carvedClosing")} />
            </Field>

            <Field label="Nama Tanda Tangan Ukiran" error={errors.carvedSignature?.message}>
              <Input id={`${idPrefix}-carvedSignature`} {...register("carvedSignature")} />
            </Field>
          </div>

          <Field label="Catatan Kaki (P.S.)" error={errors.carvedPostscript?.message}>
            <Input id={`${idPrefix}-carvedPostscript`} {...register("carvedPostscript")} />
          </Field>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: PIAGAM & PINTU KOLONG                                              */}
      {/* ========================================================================= */}
      {activeTab === "deed" && (
        <div className="space-y-4 animate-fadeIn">
          <div className="p-4 rounded-2xl bg-paper-deep border border-line space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              Piagam Hak Kepemilikan Markas Seumur Hidup
            </h4>

            <Field label="Judul Piagam Markas" error={errors.deedTitle?.message}>
              <Input id={`${idPrefix}-deedTitle`} {...register("deedTitle")} />
            </Field>

            <Field label="Nomor Registrasi / Seri Piagam" error={errors.deedSerial?.message}>
              <Input id={`${idPrefix}-deedSerial`} {...register("deedSerial")} />
            </Field>

            <Field label="Naskah Ikrar Hak Milik Markas" error={errors.deedCovenant?.message}>
              <Textarea id={`${idPrefix}-deedCovenant`} rows={3} {...register("deedCovenant")} />
            </Field>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-600/5 border border-emerald-600/20 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
              <Trees className="w-4 h-4" />
              Pintu Kolong Lantai Kayu (Secret Trapdoor)
            </h4>

            <Field label="Ajakan Angkat Pintu Kolong" error={errors.trapdoorPrompt?.message}>
              <Input id={`${idPrefix}-trapdoorPrompt`} {...register("trapdoorPrompt")} />
            </Field>

            <Field label="Pesan Rahasia di Bawah Lantai Kayu" error={errors.secretFloorboardMessage?.message}>
              <Textarea id={`${idPrefix}-secretFloorboardMessage`} rows={3} {...register("secretFloorboardMessage")} />
            </Field>
          </div>
        </div>
      )}
    </div>
  );
}
