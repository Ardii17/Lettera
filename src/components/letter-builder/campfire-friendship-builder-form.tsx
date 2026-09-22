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
  Flame,
  Star,
  Shield,
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

interface CampfireFriendshipBuilderFormProps {
  register: UseFormRegister<LetterFormValues>;
  setValue: UseFormSetValue<LetterFormValues>;
  watch: UseFormWatch<LetterFormValues>;
  errors: FieldErrors<LetterFormValues>;
  idPrefix?: string;
}

type TabType = "hero" | "memories" | "survival" | "polaroid" | "letter" | "vault";

export function CampfireFriendshipBuilderForm({
  register,
  setValue,
  watch,
  errors,
  idPrefix = "campfire-friendship",
}: CampfireFriendshipBuilderFormProps) {
  const [activeTab, setActiveTab] = useState<TabType>("hero");

  // Watch Image URLs
  const heroPhoto = watch("heroPhoto") as string | undefined;
  const polaroid1Photo = watch("polaroid1Photo") as string | undefined;
  const polaroid2Photo = watch("polaroid2Photo") as string | undefined;
  const polaroid3Photo = watch("polaroid3Photo") as string | undefined;
  const polaroid4Photo = watch("polaroid4Photo") as string | undefined;

  // Watch Colors
  const primaryColor = (watch("primaryColor") as string) || "#d97706";
  const backgroundColor = (watch("backgroundColor") as string) || "#0f172a";
  const cardColor = (watch("cardColor") as string) || "#1e293b";
  const textColor = (watch("textColor") as string) || "#fef3c7";
  const bodyTextColor = (watch("bodyTextColor") as string) || "#cbd5e1";

  const tabs = [
    { id: "hero" as TabType, label: "1. Tenda & Api Unggun", icon: <Flame className="w-3.5 h-3.5" /> },
    { id: "memories" as TabType, label: "2. 4 Bintang Kenangan", icon: <Star className="w-3.5 h-3.5" /> },
    { id: "survival" as TabType, label: "3. Survival Kit & Jokes", icon: <Shield className="w-3.5 h-3.5" /> },
    { id: "polaroid" as TabType, label: "4. Jemuran Polaroid", icon: <Camera className="w-3.5 h-3.5" /> },
    { id: "letter" as TabType, label: "5. Warkat Tengah Malam", icon: <Feather className="w-3.5 h-3.5" /> },
    { id: "vault" as TabType, label: "6. Piagam & Brankas", icon: <Award className="w-3.5 h-3.5" /> },
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
      {/* TAB 1: TENDA & API UNGGUN (HERO, KOORDINAT & WARNA)                       */}
      {/* ========================================================================= */}
      {activeTab === "hero" && (
        <div className="space-y-5 animate-fadeIn">
          {/* Skema Warna - Setiap Bagian Memiliki Box Tersendiri Secara Vertikal */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5 px-1">
              <Flame className="w-4 h-4" />
              Skema Warna Suasana Perkemahan
            </h4>
            <div className="space-y-4">
              <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
                <ColorPickerField
                  label="Warna Aksen Api Unggun"
                  value={primaryColor}
                  onChange={(val) => setValue("primaryColor", val)}
                  presets={FRIENDSHIP_COLOR_PRESETS.map((p) => ({ label: p.label, value: p.value }))}
                  helperText="Warna tombol, lencana, dan sorotan utama."
                />
              </div>
              <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
                <ColorPickerField
                  label="Warna Latar Belakang Malam"
                  value={backgroundColor}
                  onChange={(val) => setValue("backgroundColor", val)}
                  presets={BACKGROUND_COLOR_PRESETS.map((p) => ({ label: p.label, value: p.value }))}
                  helperText="Warna langit malam perkemahan."
                />
              </div>
              <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
                <ColorPickerField
                  label="Warna Tenda & Kartu"
                  value={cardColor}
                  onChange={(val) => setValue("cardColor", val)}
                  presets={CARD_COLOR_PRESETS.map((p) => ({ label: p.label, value: p.value }))}
                  helperText="Warna wadah kartu dan panel kenangan."
                />
              </div>
              <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
                <ColorPickerField
                  label="Warna Teks Judul & Nama"
                  value={textColor}
                  onChange={(val) => setValue("textColor", val)}
                  presets={TEXT_COLOR_PRESETS.map((p) => ({ label: p.label, value: p.value }))}
                  helperText="Warna teks judul dan bintang."
                />
              </div>
            </div>
          </div>

          {/* Profil Sahabat & Pengirim */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Nama Sahabat Terbaik" error={errors.friendName?.message}>
              <Input
                id={`${idPrefix}-friendName`}
                {...register("friendName", { required: "Nama sahabat wajib diisi" })}
                placeholder="Contoh: Dimas Arya Pratama"
              />
            </Field>

            <Field label="Nama Pengirim" error={errors.senderName?.message}>
              <Input
                id={`${idPrefix}-senderName`}
                {...register("senderName", { required: "Nama pengirim wajib diisi" })}
                placeholder="Contoh: Rian Aditya"
              />
            </Field>
          </div>

          <Field label="Julukan Kompak (Duo Moniker)" error={errors.friendshipMoniker?.message}>
            <Input
              id={`${idPrefix}-friendshipMoniker`}
              {...register("friendshipMoniker")}
              placeholder="Contoh: The Midnight Trailblazers & Partners in Crime"
            />
          </Field>

          <Field label="Subjudul Sambutan Malam Perkemahan" error={errors.heroSubtitle?.message}>
            <Textarea
              id={`${idPrefix}-heroSubtitle`}
              rows={3}
              {...register("heroSubtitle")}
              placeholder="Pesan pembuka suasana perkemahan sahabat..."
            />
          </Field>

          {/* Foto Utama Hero */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-ink-muted uppercase tracking-wider block">
              Foto Utama Persahabatan (Hero Photo)
            </label>
            <ImageUploadField
              value={heroPhoto}
              onChange={(url) => setValue("heroPhoto", url)}
              label="Unggah Foto Bersama Sahabat"
              helperText="Foto momen terbaik kalian berdua. Jika kosong, akan otomatis memakai gambar estetik petualangan."
            />
          </div>

          {/* Koordinat Persahabatan */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-paper-deep border border-line">
            <Field label="Lama Mengenal (Tahun)" error={errors.yearsKnown?.message}>
              <Input
                id={`${idPrefix}-yearsKnown`}
                {...register("yearsKnown")}
                placeholder="Contoh: 8 Tahun"
              />
            </Field>

            <Field label="Estimasi Hari Penuh Tawa" error={errors.daysLaughed?.message}>
              <Input
                id={`${idPrefix}-daysLaughed`}
                {...register("daysLaughed")}
                placeholder="Contoh: 2.900+ Hari"
              />
            </Field>

            <Field label="Markas / Titik Nongkrong" error={errors.hqLocation?.message}>
              <Input
                id={`${idPrefix}-hqLocation`}
                {...register("hqLocation")}
                placeholder="Contoh: Kopi Sudut & Tenda"
              />
            </Field>
          </div>

          {/* Audio Musik Latar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="URL Musik Akustik (.mp3)" error={errors.musicUrl?.message}>
              <Input
                id={`${idPrefix}-musicUrl`}
                {...register("musicUrl")}
                placeholder="https://.../acoustic-campfire.mp3"
              />
            </Field>

            <Field label="Judul Musik Latar" error={errors.musicTitle?.message}>
              <Input
                id={`${idPrefix}-musicTitle`}
                {...register("musicTitle")}
                placeholder="Contoh: Acoustic Campfire & Ember Serenade"
              />
            </Field>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: 4 BINTANG KENANGAN                                                 */}
      {/* ========================================================================= */}
      {activeTab === "memories" && (
        <div className="space-y-6 animate-fadeIn">
          <p className="text-xs text-ink-muted leading-relaxed">
            Tuliskan 4 titik balik petualangan atau memori paling berkesan bersama sahabatmu.
          </p>

          {/* Kenangan 1 */}
          <div className="p-4 rounded-2xl bg-paper-deep border border-line space-y-3">
            <span className="text-xs font-mono font-bold text-amber-600 block">⭐ BINTANG 01</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Judul Momen 1" error={errors.memory1Title?.message}>
                <Input id={`${idPrefix}-memory1Title`} {...register("memory1Title")} />
              </Field>
              <Field label="Waktu / Koordinat 1" error={errors.memory1Date?.message}>
                <Input id={`${idPrefix}-memory1Date`} {...register("memory1Date")} />
              </Field>
            </div>
            <Field label="Cerita Petualangan 1" error={errors.memory1Story?.message}>
              <Textarea id={`${idPrefix}-memory1Story`} rows={2} {...register("memory1Story")} />
            </Field>
            <Field label="Label Hikmah 1" error={errors.memory1Tag?.message}>
              <Input id={`${idPrefix}-memory1Tag`} {...register("memory1Tag")} />
            </Field>
          </div>

          {/* Kenangan 2 */}
          <div className="p-4 rounded-2xl bg-paper-deep border border-line space-y-3">
            <span className="text-xs font-mono font-bold text-amber-600 block">⭐ BINTANG 02</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Judul Momen 2" error={errors.memory2Title?.message}>
                <Input id={`${idPrefix}-memory2Title`} {...register("memory2Title")} />
              </Field>
              <Field label="Waktu / Koordinat 2" error={errors.memory2Date?.message}>
                <Input id={`${idPrefix}-memory2Date`} {...register("memory2Date")} />
              </Field>
            </div>
            <Field label="Cerita Petualangan 2" error={errors.memory2Story?.message}>
              <Textarea id={`${idPrefix}-memory2Story`} rows={2} {...register("memory2Story")} />
            </Field>
            <Field label="Label Hikmah 2" error={errors.memory2Tag?.message}>
              <Input id={`${idPrefix}-memory2Tag`} {...register("memory2Tag")} />
            </Field>
          </div>

          {/* Kenangan 3 */}
          <div className="p-4 rounded-2xl bg-paper-deep border border-line space-y-3">
            <span className="text-xs font-mono font-bold text-amber-600 block">⭐ BINTANG 03</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Judul Momen 3" error={errors.memory3Title?.message}>
                <Input id={`${idPrefix}-memory3Title`} {...register("memory3Title")} />
              </Field>
              <Field label="Waktu / Koordinat 3" error={errors.memory3Date?.message}>
                <Input id={`${idPrefix}-memory3Date`} {...register("memory3Date")} />
              </Field>
            </div>
            <Field label="Cerita Petualangan 3" error={errors.memory3Story?.message}>
              <Textarea id={`${idPrefix}-memory3Story`} rows={2} {...register("memory3Story")} />
            </Field>
            <Field label="Label Hikmah 3" error={errors.memory3Tag?.message}>
              <Input id={`${idPrefix}-memory3Tag`} {...register("memory3Tag")} />
            </Field>
          </div>

          {/* Kenangan 4 */}
          <div className="p-4 rounded-2xl bg-paper-deep border border-line space-y-3">
            <span className="text-xs font-mono font-bold text-amber-600 block">⭐ BINTANG 04</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Judul Momen 4" error={errors.memory4Title?.message}>
                <Input id={`${idPrefix}-memory4Title`} {...register("memory4Title")} />
              </Field>
              <Field label="Waktu / Koordinat 4" error={errors.memory4Date?.message}>
                <Input id={`${idPrefix}-memory4Date`} {...register("memory4Date")} />
              </Field>
            </div>
            <Field label="Cerita Petualangan 4" error={errors.memory4Story?.message}>
              <Textarea id={`${idPrefix}-memory4Story`} rows={2} {...register("memory4Story")} />
            </Field>
            <Field label="Label Hikmah 4" error={errors.memory4Tag?.message}>
              <Input id={`${idPrefix}-memory4Tag`} {...register("memory4Tag")} />
            </Field>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: SURVIVAL KIT & INSIDE JOKES CODEX                                   */}
      {/* ========================================================================= */}
      {activeTab === "survival" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Survival Kit */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-muted flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-amber-600" />
              4 Perlengkapan Bertahan Hidup (Survival Kit)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-paper-deep border border-line space-y-2">
                <Field label="Item 1: Nama" error={errors.survival1Title?.message}>
                  <Input id={`${idPrefix}-survival1Title`} {...register("survival1Title")} />
                </Field>
                <Field label="Item 1: Deskripsi" error={errors.survival1Desc?.message}>
                  <Input id={`${idPrefix}-survival1Desc`} {...register("survival1Desc")} />
                </Field>
              </div>

              <div className="p-3.5 rounded-xl bg-paper-deep border border-line space-y-2">
                <Field label="Item 2: Nama" error={errors.survival2Title?.message}>
                  <Input id={`${idPrefix}-survival2Title`} {...register("survival2Title")} />
                </Field>
                <Field label="Item 2: Deskripsi" error={errors.survival2Desc?.message}>
                  <Input id={`${idPrefix}-survival2Desc`} {...register("survival2Desc")} />
                </Field>
              </div>

              <div className="p-3.5 rounded-xl bg-paper-deep border border-line space-y-2">
                <Field label="Item 3: Nama" error={errors.survival3Title?.message}>
                  <Input id={`${idPrefix}-survival3Title`} {...register("survival3Title")} />
                </Field>
                <Field label="Item 3: Deskripsi" error={errors.survival3Desc?.message}>
                  <Input id={`${idPrefix}-survival3Desc`} {...register("survival3Desc")} />
                </Field>
              </div>

              <div className="p-3.5 rounded-xl bg-paper-deep border border-line space-y-2">
                <Field label="Item 4: Nama" error={errors.survival4Title?.message}>
                  <Input id={`${idPrefix}-survival4Title`} {...register("survival4Title")} />
                </Field>
                <Field label="Item 4: Deskripsi" error={errors.survival4Desc?.message}>
                  <Input id={`${idPrefix}-survival4Desc`} {...register("survival4Desc")} />
                </Field>
              </div>
            </div>
          </div>

          {/* Inside Jokes */}
          <div className="space-y-4 pt-4 border-t border-line">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-muted flex items-center gap-1.5">
              <span className="text-amber-500">😂</span>
              Kamus Frasa Rahasia (Inside Jokes Codex)
            </h4>

            {/* Joke 1 */}
            <div className="p-3.5 rounded-xl bg-paper-deep border border-line space-y-2">
              <Field label="Lelucon 1: Frasa Khas" error={errors.joke1Phrase?.message}>
                <Input id={`${idPrefix}-joke1Phrase`} {...register("joke1Phrase")} />
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Field label="Arti Sebenarnya" error={errors.joke1Meaning?.message}>
                  <Input id={`${idPrefix}-joke1Meaning`} {...register("joke1Meaning")} />
                </Field>
                <Field label="Asal-Usul Kejadian" error={errors.joke1Origin?.message}>
                  <Input id={`${idPrefix}-joke1Origin`} {...register("joke1Origin")} />
                </Field>
              </div>
            </div>

            {/* Joke 2 */}
            <div className="p-3.5 rounded-xl bg-paper-deep border border-line space-y-2">
              <Field label="Lelucon 2: Frasa Khas" error={errors.joke2Phrase?.message}>
                <Input id={`${idPrefix}-joke2Phrase`} {...register("joke2Phrase")} />
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Field label="Arti Sebenarnya" error={errors.joke2Meaning?.message}>
                  <Input id={`${idPrefix}-joke2Meaning`} {...register("joke2Meaning")} />
                </Field>
                <Field label="Asal-Usul Kejadian" error={errors.joke2Origin?.message}>
                  <Input id={`${idPrefix}-joke2Origin`} {...register("joke2Origin")} />
                </Field>
              </div>
            </div>

            {/* Joke 3 */}
            <div className="p-3.5 rounded-xl bg-paper-deep border border-line space-y-2">
              <Field label="Lelucon 3: Frasa Khas" error={errors.joke3Phrase?.message}>
                <Input id={`${idPrefix}-joke3Phrase`} {...register("joke3Phrase")} />
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Field label="Arti Sebenarnya" error={errors.joke3Meaning?.message}>
                  <Input id={`${idPrefix}-joke3Meaning`} {...register("joke3Meaning")} />
                </Field>
                <Field label="Asal-Usul Kejadian" error={errors.joke3Origin?.message}>
                  <Input id={`${idPrefix}-joke3Origin`} {...register("joke3Origin")} />
                </Field>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: JEMURAN POLAROID                                                   */}
      {/* ========================================================================= */}
      {activeTab === "polaroid" && (
        <div className="space-y-6 animate-fadeIn">
          <p className="text-xs text-ink-muted leading-relaxed">
            Unggah 4 foto kenangan petualangan bersama sahabat untuk digantung pada tali jemuran polaroid.
            Setiap foto memiliki cadangan gambar otomatis yang estetik jika tidak diunggah.
          </p>

          {/* Polaroid 1 */}
          <div className="p-4 rounded-2xl bg-paper-deep border border-line space-y-3">
            <h5 className="text-xs font-bold text-ink">📸 Polaroid #01</h5>
            <ImageUploadField
              value={polaroid1Photo}
              onChange={(url) => setValue("polaroid1Photo", url)}
              label="Foto Polaroid 1"
              helperText="Foto momen pantai/bukit/nongkrong."
            />
            <Field label="Catatan Tulisan Tangan 1" error={errors.polaroid1Caption?.message}>
              <Input id={`${idPrefix}-polaroid1Caption`} {...register("polaroid1Caption")} />
            </Field>
            <div className="grid grid-cols-2 gap-2">
              <Field label="Lokasi" error={errors.polaroid1Location?.message}>
                <Input id={`${idPrefix}-polaroid1Location`} {...register("polaroid1Location")} />
              </Field>
              <Field label="Tanggal" error={errors.polaroid1Date?.message}>
                <Input id={`${idPrefix}-polaroid1Date`} {...register("polaroid1Date")} />
              </Field>
            </div>
          </div>

          {/* Polaroid 2 */}
          <div className="p-4 rounded-2xl bg-paper-deep border border-line space-y-3">
            <h5 className="text-xs font-bold text-ink">📸 Polaroid #02</h5>
            <ImageUploadField
              value={polaroid2Photo}
              onChange={(url) => setValue("polaroid2Photo", url)}
              label="Foto Polaroid 2"
              helperText="Foto santai akustik/teras/rumah."
            />
            <Field label="Catatan Tulisan Tangan 2" error={errors.polaroid2Caption?.message}>
              <Input id={`${idPrefix}-polaroid2Caption`} {...register("polaroid2Caption")} />
            </Field>
            <div className="grid grid-cols-2 gap-2">
              <Field label="Lokasi" error={errors.polaroid2Location?.message}>
                <Input id={`${idPrefix}-polaroid2Location`} {...register("polaroid2Location")} />
              </Field>
              <Field label="Tanggal" error={errors.polaroid2Date?.message}>
                <Input id={`${idPrefix}-polaroid2Date`} {...register("polaroid2Date")} />
              </Field>
            </div>
          </div>

          {/* Polaroid 3 */}
          <div className="p-4 rounded-2xl bg-paper-deep border border-line space-y-3">
            <h5 className="text-xs font-bold text-ink">📸 Polaroid #03</h5>
            <ImageUploadField
              value={polaroid3Photo}
              onChange={(url) => setValue("polaroid3Photo", url)}
              label="Foto Polaroid 3"
              helperText="Foto touring/jalan-jalan/perjalanan."
            />
            <Field label="Catatan Tulisan Tangan 3" error={errors.polaroid3Caption?.message}>
              <Input id={`${idPrefix}-polaroid3Caption`} {...register("polaroid3Caption")} />
            </Field>
            <div className="grid grid-cols-2 gap-2">
              <Field label="Lokasi" error={errors.polaroid3Location?.message}>
                <Input id={`${idPrefix}-polaroid3Location`} {...register("polaroid3Location")} />
              </Field>
              <Field label="Tanggal" error={errors.polaroid3Date?.message}>
                <Input id={`${idPrefix}-polaroid3Date`} {...register("polaroid3Date")} />
              </Field>
            </div>
          </div>

          {/* Polaroid 4 */}
          <div className="p-4 rounded-2xl bg-paper-deep border border-line space-y-3">
            <h5 className="text-xs font-bold text-ink">📸 Polaroid #04</h5>
            <ImageUploadField
              value={polaroid4Photo}
              onChange={(url) => setValue("polaroid4Photo", url)}
              label="Foto Polaroid 4"
              helperText="Foto kafe/kedai kopi/kebersamaan hangat."
            />
            <Field label="Catatan Tulisan Tangan 4" error={errors.polaroid4Caption?.message}>
              <Input id={`${idPrefix}-polaroid4Caption`} {...register("polaroid4Caption")} />
            </Field>
            <div className="grid grid-cols-2 gap-2">
              <Field label="Lokasi" error={errors.polaroid4Location?.message}>
                <Input id={`${idPrefix}-polaroid4Location`} {...register("polaroid4Location")} />
              </Field>
              <Field label="Tanggal" error={errors.polaroid4Date?.message}>
                <Input id={`${idPrefix}-polaroid4Date`} {...register("polaroid4Date")} />
              </Field>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: WARKAT TENGAH MALAM                                                */}
      {/* ========================================================================= */}
      {activeTab === "letter" && (
        <div className="space-y-4 animate-fadeIn">
          <Field label="Salam Pembuka Warkat" error={errors.letterGreeting?.message}>
            <Input id={`${idPrefix}-letterGreeting`} {...register("letterGreeting")} />
          </Field>

          <Field label="Paragraf 1 (Refleksi Waktu)" error={errors.letterParagraph1?.message}>
            <Textarea id={`${idPrefix}-letterParagraph1`} rows={3} {...register("letterParagraph1")} />
          </Field>

          <Field label="Paragraf 2 (Terima Kasih Tulus)" error={errors.letterParagraph2?.message}>
            <Textarea id={`${idPrefix}-letterParagraph2`} rows={3} {...register("letterParagraph2")} />
          </Field>

          <Field label="Paragraf 3 (Janji Masa Depan)" error={errors.letterParagraph3?.message}>
            <Textarea id={`${idPrefix}-letterParagraph3`} rows={3} {...register("letterParagraph3")} />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Salam Penutup" error={errors.letterClosing?.message}>
              <Input id={`${idPrefix}-letterClosing`} {...register("letterClosing")} />
            </Field>

            <Field label="Nama Tanda Tangan" error={errors.letterSignature?.message}>
              <Input id={`${idPrefix}-letterSignature`} {...register("letterSignature")} />
            </Field>
          </div>

          <Field label="Catatan Kaki (P.S.)" error={errors.letterPostscript?.message}>
            <Input id={`${idPrefix}-letterPostscript`} {...register("letterPostscript")} />
          </Field>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: PIAGAM & BRANKAS WAKTU                                             */}
      {/* ========================================================================= */}
      {activeTab === "vault" && (
        <div className="space-y-4 animate-fadeIn">
          <Field label="Teks Tombol Buka Gembok Brankas" error={errors.vaultPrompt?.message}>
            <Input id={`${idPrefix}-vaultPrompt`} {...register("vaultPrompt")} />
          </Field>

          <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-700 flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              Isi Piagam Persahabatan Seumur Hidup
            </h4>

            <Field label="Judul Sertifikat" error={errors.pactCertificateTitle?.message}>
              <Input id={`${idPrefix}-pactCertificateTitle`} {...register("pactCertificateTitle")} />
            </Field>

            <Field label="Nomor Seri / Kode Registrasi Ikrar" error={errors.pactSerialNumber?.message}>
              <Input id={`${idPrefix}-pactSerialNumber`} {...register("pactSerialNumber")} />
            </Field>

            <Field label="Naskah Sumpah / Ikrar Bersama" error={errors.pactPledge?.message}>
              <Textarea id={`${idPrefix}-pactPledge`} rows={3} {...register("pactPledge")} />
            </Field>

            <Field label="Pesan Rahasia Dari Hati (Secret Message)" error={errors.pactSecretMessage?.message}>
              <Textarea id={`${idPrefix}-pactSecretMessage`} rows={2} {...register("pactSecretMessage")} />
            </Field>
          </div>
        </div>
      )}
    </div>
  );
}
