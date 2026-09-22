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
  Coffee,
  Utensils,
  Disc,
  Camera,
  Feather,
  Receipt,
} from "lucide-react";
import {
  FRIENDSHIP_COLOR_PRESETS,
  BACKGROUND_COLOR_PRESETS,
  CARD_COLOR_PRESETS,
  TEXT_COLOR_PRESETS,
} from "@/templates/color-presets";

interface BistroFriendshipBuilderFormProps {
  register: UseFormRegister<LetterFormValues>;
  setValue: UseFormSetValue<LetterFormValues>;
  watch: UseFormWatch<LetterFormValues>;
  errors: FieldErrors<LetterFormValues>;
  idPrefix?: string;
}

type TabType = "hero" | "menu" | "vinyl" | "frames" | "napkin" | "receipt";

export function BistroFriendshipBuilderForm({
  register,
  setValue,
  watch,
  errors,
  idPrefix = "bistro-friendship",
}: BistroFriendshipBuilderFormProps) {
  const [activeTab, setActiveTab] = useState<TabType>("hero");

  // Watch Image URLs
  const heroPhoto = watch("heroPhoto") as string | undefined;
  const frame1Photo = watch("frame1Photo") as string | undefined;
  const frame2Photo = watch("frame2Photo") as string | undefined;
  const frame3Photo = watch("frame3Photo") as string | undefined;
  const frame4Photo = watch("frame4Photo") as string | undefined;

  // Watch Colors
  const primaryColor = (watch("primaryColor") as string) || "#d97706";
  const backgroundColor = (watch("backgroundColor") as string) || "#1a120b";
  const cardColor = (watch("cardColor") as string) || "#2b1e16";
  const textColor = (watch("textColor") as string) || "#fef3c7";
  const bodyTextColor = (watch("bodyTextColor") as string) || "#d6d3d1";

  const tabs = [
    { id: "hero" as TabType, label: "1. Meja Sudut & Kafe", icon: <Coffee className="w-3.5 h-3.5" /> },
    { id: "menu" as TabType, label: "2. The House Menu", icon: <Utensils className="w-3.5 h-3.5" /> },
    { id: "vinyl" as TabType, label: "3. Vinyl Jukebox", icon: <Disc className="w-3.5 h-3.5" /> },
    { id: "frames" as TabType, label: "4. Bingkai Foto Bistro", icon: <Camera className="w-3.5 h-3.5" /> },
    { id: "napkin" as TabType, label: "5. Serbet Warkat", icon: <Feather className="w-3.5 h-3.5" /> },
    { id: "receipt" as TabType, label: "6. Bon & Tatakan", icon: <Receipt className="w-3.5 h-3.5" /> },
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
      {/* TAB 1: MEJA SUDUT & KAFE (HERO, METRIK, WARNA)                           */}
      {/* ========================================================================= */}
      {activeTab === "hero" && (
        <div className="space-y-5 animate-fadeIn">
          {/* Skema Warna - Setiap Bagian Memiliki Box Tersendiri Secara Vertikal */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5 px-1">
              <Coffee className="w-4 h-4" />
              Skema Warna Suasana Bistro & Kedai Kopi
            </h4>
            <div className="space-y-4">
              <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
                <ColorPickerField
                  label="Warna Kuningan & Bohlam Edison"
                  value={primaryColor}
                  onChange={(val) => setValue("primaryColor", val)}
                  presets={FRIENDSHIP_COLOR_PRESETS.map((p) => ({ label: p.label, value: p.value }))}
                  helperText="Warna ornamen kuningan, tombol, dan sorotan utama."
                />
              </div>
              <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
                <ColorPickerField
                  label="Warna Latar Mahogani Gelap"
                  value={backgroundColor}
                  onChange={(val) => setValue("backgroundColor", val)}
                  presets={BACKGROUND_COLOR_PRESETS.map((p) => ({ label: p.label, value: p.value }))}
                  helperText="Warna dasar dinding kayu bistro temaram."
                />
              </div>
              <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
                <ColorPickerField
                  label="Warna Panel Meja & Kartu Menu"
                  value={cardColor}
                  onChange={(val) => setValue("cardColor", val)}
                  presets={CARD_COLOR_PRESETS.map((p) => ({ label: p.label, value: p.value }))}
                  helperText="Warna kartu menu dan panel konten."
                />
              </div>
              <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
                <ColorPickerField
                  label="Warna Teks Judul (Krim Busa)"
                  value={textColor}
                  onChange={(val) => setValue("textColor", val)}
                  presets={TEXT_COLOR_PRESETS.map((p) => ({ label: p.label, value: p.value }))}
                  helperText="Warna judul menu dan nama sahabat."
                />
              </div>
            </div>
          </div>

          {/* Profil Bistro & Sahabat */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Nama Kedai / Bistro" error={errors.bistroName?.message}>
              <Input
                id={`${idPrefix}-bistroName`}
                {...register("bistroName")}
                placeholder="Contoh: Bistro des Âmes Sœurs: Midnight Café"
              />
            </Field>

            <Field label="Nomor Meja Reservasi Kehormatan" error={errors.tableNumber?.message}>
              <Input
                id={`${idPrefix}-tableNumber`}
                {...register("tableNumber")}
                placeholder="Contoh: Table No. 07 • The Cozy Corner Booth"
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Nama Sahabat Terbaik" error={errors.friendName?.message}>
              <Input
                id={`${idPrefix}-friendName`}
                {...register("friendName", { required: "Nama sahabat wajib diisi" })}
                placeholder="Contoh: Nadhira Az-Zahra"
              />
            </Field>

            <Field label="Nama Pengirim" error={errors.senderName?.message}>
              <Input
                id={`${idPrefix}-senderName`}
                {...register("senderName", { required: "Nama pengirim wajib diisi" })}
                placeholder="Contoh: Clarissa Aurelia"
              />
            </Field>
          </div>

          <Field label="Julukan Pelanggan Setia (Duo Title)" error={errors.duoTitle?.message}>
            <Input
              id={`${idPrefix}-duoTitle`}
              {...register("duoTitle")}
              placeholder="Contoh: The Inseparable Regulars & Soul Sisters"
            />
          </Field>

          <Field label="Pesan Sambutan Papan Tulis Kapur (Chalkboard)" error={errors.chalkboardWelcome?.message}>
            <Textarea
              id={`${idPrefix}-chalkboardWelcome`}
              rows={3}
              {...register("chalkboardWelcome")}
              placeholder="Pesan hangat sambutan pembuka bistro..."
            />
          </Field>

          {/* Foto Utama Meja */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-ink-muted uppercase tracking-wider block">
              Foto Utama Meja Sahabat (Hero Photo)
            </label>
            <ImageUploadField
              value={heroPhoto}
              onChange={(url) => setValue("heroPhoto", url)}
              label="Unggah Foto Bersama di Kafe / Meja Nongkrong"
              helperText="Foto momen berdua di kafe. Jika kosong, akan otomatis memakai gambar estetik kedai kopi."
            />
          </div>

          {/* Metrik Bistro */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-paper-deep border border-line">
            <Field label="Tahun Buka (Masa Bersama)" error={errors.servingSince?.message}>
              <Input
                id={`${idPrefix}-servingSince`}
                {...register("servingSince")}
                placeholder="Contoh: Sejak 2016 (9 Tahun)"
              />
            </Field>

            <Field label="Cangkir Dihabiskan" error={errors.coffeeLiters?.message}>
              <Input
                id={`${idPrefix}-coffeeLiters`}
                {...register("coffeeLiters")}
                placeholder="Contoh: 1.250+ Cangkir"
              />
            </Field>

            <Field label="Rekor Obrolan Terlama" error={errors.longestChatHours?.message}>
              <Input
                id={`${idPrefix}-longestChatHours`}
                {...register("longestChatHours")}
                placeholder="Contoh: 7.5 Jam Nonstop"
              />
            </Field>
          </div>

          {/* Audio Musik */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="URL Musik Latar Jazz Lo-Fi (.mp3)" error={errors.musicUrl?.message}>
              <Input
                id={`${idPrefix}-musicUrl`}
                {...register("musicUrl")}
                placeholder="https://.../lofi-jazz.mp3"
              />
            </Field>

            <Field label="Judul Trek Musik" error={errors.musicTitle?.message}>
              <Input
                id={`${idPrefix}-musicTitle`}
                {...register("musicTitle")}
                placeholder="Contoh: Midnight Lo-Fi Coffeehouse & Rain Serenade"
              />
            </Field>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: THE HOUSE MENU                                                     */}
      {/* ========================================================================= */}
      {activeTab === "menu" && (
        <div className="space-y-6 animate-fadeIn">
          <p className="text-xs text-ink-muted leading-relaxed">
            Tuliskan 4 sajian menu metaforis yang mewakili dinamika dan rasa persahabatan kalian berdua.
          </p>

          {/* Menu 1 */}
          <div className="p-4 rounded-2xl bg-paper-deep border border-line space-y-3">
            <span className="text-xs font-mono font-bold text-amber-700 block">☕ MENU #01</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Nama Sajian 1" error={errors.menu1Name?.message}>
                <Input id={`${idPrefix}-menu1Name`} {...register("menu1Name")} />
              </Field>
              <Field label="Nilai Emosional / Harga 1" error={errors.menu1Price?.message}>
                <Input id={`${idPrefix}-menu1Price`} {...register("menu1Price")} />
              </Field>
            </div>
            <Field label="Komposisi Bahan Racikan 1" error={errors.menu1Ingredients?.message}>
              <Input id={`${idPrefix}-menu1Ingredients`} {...register("menu1Ingredients")} />
            </Field>
            <Field label="Catatan Filosofi 1" error={errors.menu1Notes?.message}>
              <Textarea id={`${idPrefix}-menu1Notes`} rows={2} {...register("menu1Notes")} />
            </Field>
          </div>

          {/* Menu 2 */}
          <div className="p-4 rounded-2xl bg-paper-deep border border-line space-y-3">
            <span className="text-xs font-mono font-bold text-amber-700 block">🍟 MENU #02</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Nama Sajian 2" error={errors.menu2Name?.message}>
                <Input id={`${idPrefix}-menu2Name`} {...register("menu2Name")} />
              </Field>
              <Field label="Nilai Emosional / Harga 2" error={errors.menu2Price?.message}>
                <Input id={`${idPrefix}-menu2Price`} {...register("menu2Price")} />
              </Field>
            </div>
            <Field label="Komposisi Bahan Racikan 2" error={errors.menu2Ingredients?.message}>
              <Input id={`${idPrefix}-menu2Ingredients`} {...register("menu2Ingredients")} />
            </Field>
            <Field label="Catatan Filosofi 2" error={errors.menu2Notes?.message}>
              <Textarea id={`${idPrefix}-menu2Notes`} rows={2} {...register("menu2Notes")} />
            </Field>
          </div>

          {/* Menu 3 */}
          <div className="p-4 rounded-2xl bg-paper-deep border border-line space-y-3">
            <span className="text-xs font-mono font-bold text-amber-700 block">🍜 MENU #03</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Nama Sajian 3" error={errors.menu3Name?.message}>
                <Input id={`${idPrefix}-menu3Name`} {...register("menu3Name")} />
              </Field>
              <Field label="Nilai Emosional / Harga 3" error={errors.menu3Price?.message}>
                <Input id={`${idPrefix}-menu3Price`} {...register("menu3Price")} />
              </Field>
            </div>
            <Field label="Komposisi Bahan Racikan 3" error={errors.menu3Ingredients?.message}>
              <Input id={`${idPrefix}-menu3Ingredients`} {...register("menu3Ingredients")} />
            </Field>
            <Field label="Catatan Filosofi 3" error={errors.menu3Notes?.message}>
              <Textarea id={`${idPrefix}-menu3Notes`} rows={2} {...register("menu3Notes")} />
            </Field>
          </div>

          {/* Menu 4 */}
          <div className="p-4 rounded-2xl bg-paper-deep border border-line space-y-3">
            <span className="text-xs font-mono font-bold text-amber-700 block">🍰 MENU #04</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Nama Sajian 4" error={errors.menu4Name?.message}>
                <Input id={`${idPrefix}-menu4Name`} {...register("menu4Name")} />
              </Field>
              <Field label="Nilai Emosional / Harga 4" error={errors.menu4Price?.message}>
                <Input id={`${idPrefix}-menu4Price`} {...register("menu4Price")} />
              </Field>
            </div>
            <Field label="Komposisi Bahan Racikan 4" error={errors.menu4Ingredients?.message}>
              <Input id={`${idPrefix}-menu4Ingredients`} {...register("menu4Ingredients")} />
            </Field>
            <Field label="Catatan Filosofi 4" error={errors.menu4Notes?.message}>
              <Textarea id={`${idPrefix}-menu4Notes`} rows={2} {...register("menu4Notes")} />
            </Field>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: VINYL JUKEBOX                                                      */}
      {/* ========================================================================= */}
      {activeTab === "vinyl" && (
        <div className="space-y-6 animate-fadeIn">
          <p className="text-xs text-ink-muted leading-relaxed">
            Daftarkan 4 piringan hitam lagu kenangan yang selalu dinyanyikan bersama atau menyimpan momen tak terlupakan.
          </p>

          {/* Vinyl 1 */}
          <div className="p-4 rounded-2xl bg-paper-deep border border-line space-y-3">
            <span className="text-xs font-mono font-bold text-amber-700 block">💿 VINYL #01</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Judul Lagu & Artis 1" error={errors.vinyl1Title?.message}>
                <Input id={`${idPrefix}-vinyl1Title`} {...register("vinyl1Title")} />
              </Field>
              <Field label="Tahun / Musim Kenangan 1" error={errors.vinyl1Year?.message}>
                <Input id={`${idPrefix}-vinyl1Year`} {...register("vinyl1Year")} />
              </Field>
            </div>
            <Field label="Memori di Balik Lagu 1" error={errors.vinyl1Memory?.message}>
              <Input id={`${idPrefix}-vinyl1Memory`} {...register("vinyl1Memory")} />
            </Field>
          </div>

          {/* Vinyl 2 */}
          <div className="p-4 rounded-2xl bg-paper-deep border border-line space-y-3">
            <span className="text-xs font-mono font-bold text-amber-700 block">💿 VINYL #02</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Judul Lagu & Artis 2" error={errors.vinyl2Title?.message}>
                <Input id={`${idPrefix}-vinyl2Title`} {...register("vinyl2Title")} />
              </Field>
              <Field label="Tahun / Musim Kenangan 2" error={errors.vinyl2Year?.message}>
                <Input id={`${idPrefix}-vinyl2Year`} {...register("vinyl2Year")} />
              </Field>
            </div>
            <Field label="Memori di Balik Lagu 2" error={errors.vinyl2Memory?.message}>
              <Input id={`${idPrefix}-vinyl2Memory`} {...register("vinyl2Memory")} />
            </Field>
          </div>

          {/* Vinyl 3 */}
          <div className="p-4 rounded-2xl bg-paper-deep border border-line space-y-3">
            <span className="text-xs font-mono font-bold text-amber-700 block">💿 VINYL #03</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Judul Lagu & Artis 3" error={errors.vinyl3Title?.message}>
                <Input id={`${idPrefix}-vinyl3Title`} {...register("vinyl3Title")} />
              </Field>
              <Field label="Tahun / Musim Kenangan 3" error={errors.vinyl3Year?.message}>
                <Input id={`${idPrefix}-vinyl3Year`} {...register("vinyl3Year")} />
              </Field>
            </div>
            <Field label="Memori di Balik Lagu 3" error={errors.vinyl3Memory?.message}>
              <Input id={`${idPrefix}-vinyl3Memory`} {...register("vinyl3Memory")} />
            </Field>
          </div>

          {/* Vinyl 4 */}
          <div className="p-4 rounded-2xl bg-paper-deep border border-line space-y-3">
            <span className="text-xs font-mono font-bold text-amber-700 block">💿 VINYL #04</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Judul Lagu & Artis 4" error={errors.vinyl4Title?.message}>
                <Input id={`${idPrefix}-vinyl4Title`} {...register("vinyl4Title")} />
              </Field>
              <Field label="Tahun / Musim Kenangan 4" error={errors.vinyl4Year?.message}>
                <Input id={`${idPrefix}-vinyl4Year`} {...register("vinyl4Year")} />
              </Field>
            </div>
            <Field label="Memori di Balik Lagu 4" error={errors.vinyl4Memory?.message}>
              <Input id={`${idPrefix}-vinyl4Memory`} {...register("vinyl4Memory")} />
            </Field>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: BINGKAI FOTO BISTRO                                                */}
      {/* ========================================================================= */}
      {activeTab === "frames" && (
        <div className="space-y-6 animate-fadeIn">
          <p className="text-xs text-ink-muted leading-relaxed">
            Unggah 4 foto kenangan berbingkai jati & kuningan.
            Setiap foto memiliki cadangan gambar otomatis yang estetik jika tidak diunggah.
          </p>

          {/* Frame 1 */}
          <div className="p-4 rounded-2xl bg-paper-deep border border-line space-y-3">
            <h5 className="text-xs font-bold text-ink">🖼️ Bingkai #01</h5>
            <ImageUploadField
              value={frame1Photo}
              onChange={(url) => setValue("frame1Photo", url)}
              label="Foto Bingkai 1"
              helperText="Foto awal pertemanan / cangkir pertama."
            />
            <Field label="Judul Momen 1" error={errors.frame1Title?.message}>
              <Input id={`${idPrefix}-frame1Title`} {...register("frame1Title")} />
            </Field>
            <div className="grid grid-cols-2 gap-2">
              <Field label="Tanggal Momen 1" error={errors.frame1Date?.message}>
                <Input id={`${idPrefix}-frame1Date`} {...register("frame1Date")} />
              </Field>
              <Field label="Kutipan Tawa 1" error={errors.frame1Quote?.message}>
                <Input id={`${idPrefix}-frame1Quote`} {...register("frame1Quote")} />
              </Field>
            </div>
          </div>

          {/* Frame 2 */}
          <div className="p-4 rounded-2xl bg-paper-deep border border-line space-y-3">
            <h5 className="text-xs font-bold text-ink">🖼️ Bingkai #02</h5>
            <ImageUploadField
              value={frame2Photo}
              onChange={(url) => setValue("frame2Photo", url)}
              label="Foto Bingkai 2"
              helperText="Foto perjuangan / wisuda / skripsi."
            />
            <Field label="Judul Momen 2" error={errors.frame2Title?.message}>
              <Input id={`${idPrefix}-frame2Title`} {...register("frame2Title")} />
            </Field>
            <div className="grid grid-cols-2 gap-2">
              <Field label="Tanggal Momen 2" error={errors.frame2Date?.message}>
                <Input id={`${idPrefix}-frame2Date`} {...register("frame2Date")} />
              </Field>
              <Field label="Kutipan Tawa 2" error={errors.frame2Quote?.message}>
                <Input id={`${idPrefix}-frame2Quote`} {...register("frame2Quote")} />
              </Field>
            </div>
          </div>

          {/* Frame 3 */}
          <div className="p-4 rounded-2xl bg-paper-deep border border-line space-y-3">
            <h5 className="text-xs font-bold text-ink">🖼️ Bingkai #03</h5>
            <ImageUploadField
              value={frame3Photo}
              onChange={(url) => setValue("frame3Photo", url)}
              label="Foto Bingkai 3"
              helperText="Foto liburan / jalan santai."
            />
            <Field label="Judul Momen 3" error={errors.frame3Title?.message}>
              <Input id={`${idPrefix}-frame3Title`} {...register("frame3Title")} />
            </Field>
            <div className="grid grid-cols-2 gap-2">
              <Field label="Tanggal Momen 3" error={errors.frame3Date?.message}>
                <Input id={`${idPrefix}-frame3Date`} {...register("frame3Date")} />
              </Field>
              <Field label="Kutipan Tawa 3" error={errors.frame3Quote?.message}>
                <Input id={`${idPrefix}-frame3Quote`} {...register("frame3Quote")} />
              </Field>
            </div>
          </div>

          {/* Frame 4 */}
          <div className="p-4 rounded-2xl bg-paper-deep border border-line space-y-3">
            <h5 className="text-xs font-bold text-ink">🖼️ Bingkai #04</h5>
            <ImageUploadField
              value={frame4Photo}
              onChange={(url) => setValue("frame4Photo", url)}
              label="Foto Bingkai 4"
              helperText="Foto perayaan / momen terbaru."
            />
            <Field label="Judul Momen 4" error={errors.frame4Title?.message}>
              <Input id={`${idPrefix}-frame4Title`} {...register("frame4Title")} />
            </Field>
            <div className="grid grid-cols-2 gap-2">
              <Field label="Tanggal Momen 4" error={errors.frame4Date?.message}>
                <Input id={`${idPrefix}-frame4Date`} {...register("frame4Date")} />
              </Field>
              <Field label="Kutipan Tawa 4" error={errors.frame4Quote?.message}>
                <Input id={`${idPrefix}-frame4Quote`} {...register("frame4Quote")} />
              </Field>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: SERBET WARKAT                                                      */}
      {/* ========================================================================= */}
      {activeTab === "napkin" && (
        <div className="space-y-4 animate-fadeIn">
          <Field label="Salam Pembuka Serbet" error={errors.napkinGreeting?.message}>
            <Input id={`${idPrefix}-napkinGreeting`} {...register("napkinGreeting")} />
          </Field>

          <Field label="Paragraf 1 (Saksi Tempat & Waktu)" error={errors.napkinBody1?.message}>
            <Textarea id={`${idPrefix}-napkinBody1`} rows={3} {...register("napkinBody1")} />
          </Field>

          <Field label="Paragraf 2 (Arti Rumah & Penerimaan)" error={errors.napkinBody2?.message}>
            <Textarea id={`${idPrefix}-napkinBody2`} rows={3} {...register("napkinBody2")} />
          </Field>

          <Field label="Paragraf 3 (Janji Masa Depan)" error={errors.napkinBody3?.message}>
            <Textarea id={`${idPrefix}-napkinBody3`} rows={3} {...register("napkinBody3")} />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Salam Penutup" error={errors.napkinClosing?.message}>
              <Input id={`${idPrefix}-napkinClosing`} {...register("napkinClosing")} />
            </Field>

            <Field label="Nama Tanda Tangan" error={errors.napkinSignature?.message}>
              <Input id={`${idPrefix}-napkinSignature`} {...register("napkinSignature")} />
            </Field>
          </div>

          <Field label="Catatan Kaki Serbet (P.S.)" error={errors.napkinPostscript?.message}>
            <Input id={`${idPrefix}-napkinPostscript`} {...register("napkinPostscript")} />
          </Field>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: BON & TATAKAN GELAS                                                */}
      {/* ========================================================================= */}
      {activeTab === "receipt" && (
        <div className="space-y-4 animate-fadeIn">
          <div className="p-4 rounded-2xl bg-paper-deep border border-line space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
              <Receipt className="w-4 h-4" />
              Rincian Bon Kasir Vintage (The Memory Receipt)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Nomor Invoice" error={errors.receiptInvoiceNo?.message}>
                <Input id={`${idPrefix}-receiptInvoiceNo`} {...register("receiptInvoiceNo")} />
              </Field>
              <Field label="Tanggal / Masa Berlaku" error={errors.receiptDate?.message}>
                <Input id={`${idPrefix}-receiptDate`} {...register("receiptDate")} />
              </Field>
            </div>

            <Field label="Item 1: Obrolan" error={errors.receiptItem1?.message}>
              <Input id={`${idPrefix}-receiptItem1`} {...register("receiptItem1")} />
            </Field>

            <Field label="Item 2: Tawa" error={errors.receiptItem2?.message}>
              <Input id={`${idPrefix}-receiptItem2`} {...register("receiptItem2")} />
            </Field>

            <Field label="Item 3: Kesetiaan" error={errors.receiptItem3?.message}>
              <Input id={`${idPrefix}-receiptItem3`} {...register("receiptItem3")} />
            </Field>

            <Field label="Item 4: Garansi" error={errors.receiptItem4?.message}>
              <Input id={`${idPrefix}-receiptItem4`} {...register("receiptItem4")} />
            </Field>

            <Field label="Total Tagihan" error={errors.receiptTotal?.message}>
              <Input id={`${idPrefix}-receiptTotal`} {...register("receiptTotal")} />
            </Field>
          </div>

          <div className="p-4 rounded-2xl bg-amber-600/5 border border-amber-600/20 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
              <Coffee className="w-4 h-4" />
              Tatakan Gelas Interaktif (Cork Coaster)
            </h4>

            <Field label="Ajakan Balik Tatakan Gelas" error={errors.coasterPrompt?.message}>
              <Input id={`${idPrefix}-coasterPrompt`} {...register("coasterPrompt")} />
            </Field>

            <Field label="Pesan Rahasia di Balik Tatakan" error={errors.coasterSecretMessage?.message}>
              <Textarea id={`${idPrefix}-coasterSecretMessage`} rows={3} {...register("coasterSecretMessage")} />
            </Field>
          </div>
        </div>
      )}
    </div>
  );
}
