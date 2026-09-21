"use client";

import { useState } from "react";
import type {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  FieldErrors,
} from "react-hook-form";
import {
  Building2,
  Scroll,
  Compass,
  Eye,
  Heart,
  Music,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Field, Input, Textarea } from "@/components/ui/field";
import { ColorPickerField } from "@/components/ui/color-picker-field";
import { BACKGROUND_COLOR_PRESETS } from "@/templates/color-presets";
import { cn } from "@/lib/utils/cn";
import type { LetterFormValues } from "./dynamic-form";

interface MuseumOfUsBuilderFormProps {
  register: UseFormRegister<LetterFormValues>;
  setValue: UseFormSetValue<LetterFormValues>;
  watch: UseFormWatch<LetterFormValues>;
  errors: FieldErrors<LetterFormValues>;
  idPrefix?: string;
}

type TabType =
  | "plaque"
  | "letter"
  | "installations"
  | "collection"
  | "vows"
  | "theme";

const PRESET_ARTWORKS = [
  {
    name: "Lukisan Koleksi 1",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Lukisan Koleksi 2",
    url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Lukisan Koleksi 3",
    url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Lukisan Koleksi 4",
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=200&q=60",
  },
];

export function MuseumOfUsBuilderForm({
  register,
  setValue,
  watch,
  errors,
  idPrefix = "museum-of-us",
}: MuseumOfUsBuilderFormProps) {
  const [activeTab, setActiveTab] = useState<TabType>("plaque");

  const tabs: Array<{ id: TabType; label: string; icon: typeof Building2 }> = [
    { id: "plaque", label: "Tiket & Plakat", icon: Building2 },
    { id: "letter", label: "Surat Kurator", icon: Scroll },
    { id: "installations", label: "Instalasi Seni", icon: Compass },
    { id: "collection", label: "Koleksi Lukisan", icon: Eye },
    { id: "vows", label: "Ikrar Pelestarian", icon: Heart },
    { id: "theme", label: "Warna & Audio", icon: Music },
  ];

  const currentTabIndex = tabs.findIndex((t) => t.id === activeTab);
  const currentHeroPhoto = watch("heroCoverPhotoUrl") as string;

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex overflow-x-auto no-scrollbar gap-1.5 p-1 bg-stone-100 rounded-xl border border-stone-200">
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
                  ? "bg-white text-stone-900 shadow-sm font-semibold ring-1 ring-stone-900/10"
                  : "text-stone-500 hover:text-stone-900 hover:bg-white/50"
              )}
            >
              <Icon
                className={cn(
                  "w-3.5 h-3.5",
                  isActive ? "text-amber-700" : "text-stone-400"
                )}
              />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: TIKET VERNISSAGE & PLAKAT MARMER */}
      {activeTab === "plaque" && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-4 text-xs sm:text-sm text-amber-950">
            <p className="font-semibold mb-1">Tiket Vernissage & Plakat Kuratorial</p>
            <p className="text-amber-800/80 leading-relaxed">
              Atur nama sang belahan jiwa, gelar kasih, judul retrospeksi pameran, periode koleksi, dan pernyataan seni pembuka.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Nama Belahan Jiwa (Sang Mahakarya)"
              error={errors.recipientName?.message}
              id={`${idPrefix}-recipientName`}
            >
              <Input
                id={`${idPrefix}-recipientName`}
                placeholder="Aurelia Beatrice"
                {...register("recipientName", {
                  required: "Nama pasangan wajib diisi",
                })}
              />
            </Field>

            <Field label="Panggilan Kehormatan / Gelar Kasih" id={`${idPrefix}-partnerTitle`}>
              <Input
                id={`${idPrefix}-partnerTitle`}
                placeholder="My Living Masterpiece & Infinite Muse"
                {...register("partnerTitle")}
              />
            </Field>
          </div>

          <Field
            label="Judul Retrospeksi Pameran Seni"
            error={errors.exhibitionTitle?.message}
            id={`${idPrefix}-exhibitionTitle`}
          >
            <Input
              id={`${idPrefix}-exhibitionTitle`}
              placeholder="THE RETROSPECTIVE OF US: TWO SOULS, ONE CANVAS"
              {...register("exhibitionTitle", {
                required: "Judul pameran wajib diisi",
              })}
            />
          </Field>

          <Field label="Periode Koleksi Seni" id={`${idPrefix}-exhibitionYear`}>
            <Input
              id={`${idPrefix}-exhibitionYear`}
              placeholder="Collection 2021 – Present • Permanent Archive"
              {...register("exhibitionYear")}
            />
          </Field>

          {/* Hero Artwork Photo Presets */}
          <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
            <p className="text-xs font-bold text-stone-800 uppercase tracking-wider">
              Foto Mahakarya Utama
            </p>
            <Field label="URL Foto Utama" id={`${idPrefix}-heroCoverPhotoUrl`}>
              <Input
                id={`${idPrefix}-heroCoverPhotoUrl`}
                placeholder="https://images.unsplash.com/..."
                {...register("heroCoverPhotoUrl")}
              />
            </Field>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              {PRESET_ARTWORKS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() =>
                    setValue("heroCoverPhotoUrl", preset.url, {
                      shouldDirty: true,
                    })
                  }
                  className={cn(
                    "p-2 rounded-lg border text-left text-xs transition-all flex flex-col items-center gap-1.5",
                    currentHeroPhoto === preset.url
                      ? "border-amber-700 bg-amber-50 font-semibold"
                      : "border-stone-200 hover:border-stone-300"
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={preset.thumb}
                    alt={preset.name}
                    className="w-full aspect-[3/4] object-cover rounded"
                  />
                  <span className="text-[10px] text-stone-700 truncate w-full text-center">
                    {preset.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <Field
            label="Pernyataan Kuratorial Pembuka"
            id={`${idPrefix}-curatorialStatement`}
            helperText="Esai singkat tentang filosofi keindahan cinta yang dipamerkan"
          >
            <Textarea
              id={`${idPrefix}-curatorialStatement`}
              rows={2}
              placeholder="Cinta bukanlah karya seni yang selesai dalam semalam..."
              {...register("curatorialStatement")}
            />
          </Field>
        </div>
      )}

      {/* TAB 2: SURAT KURATOR */}
      {activeTab === "letter" && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          <div className="bg-stone-100 border border-stone-300 rounded-xl p-4 text-xs sm:text-sm text-stone-900">
            <p className="font-semibold mb-1">Warkat Kurator Kepala</p>
            <p className="text-stone-600 leading-relaxed">
              Tuliskan surat cinta panjang, mendalam, dan puitis di atas kertas katalog seni.
            </p>
          </div>

          <Field
            label="Judul Warkat Surat"
            error={errors.letterTitle?.message}
            id={`${idPrefix}-letterTitle`}
          >
            <Input
              id={`${idPrefix}-letterTitle`}
              placeholder="From the Curator's Heart: Surat Bagi Mahakarya Terindah di Semesta"
              {...register("letterTitle", {
                required: "Judul surat wajib diisi",
              })}
            />
          </Field>

          <Field
            label="Isi Surat Cinta Kurator"
            error={errors.letterContent?.message}
            id={`${idPrefix}-letterContent`}
            helperText="Gunakan baris baru untuk memisahkan antar paragraf warkat."
          >
            <Textarea
              id={`${idPrefix}-letterContent`}
              rows={8}
              placeholder="Kepada mahakarya hidupku yang paling kupuja...\n\nDi hadapan lukisan-lukisan terhebat di dunia..."
              {...register("letterContent", {
                required: "Isi surat wajib diisi",
              })}
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Nama Pengirim (Kurator)"
              error={errors.curatorName?.message}
              id={`${idPrefix}-curatorName`}
            >
              <Input
                id={`${idPrefix}-curatorName`}
                placeholder="Adrian Bramantya"
                {...register("curatorName", {
                  required: "Nama kurator wajib diisi",
                })}
              />
            </Field>

            <Field label="Keterangan Peran Pengirim" id={`${idPrefix}-curatorTitle`}>
              <Input
                id={`${idPrefix}-curatorTitle`}
                placeholder="Chief Curator & Devoted Companion // Sahabat Sejiwa"
                {...register("curatorTitle")}
              />
            </Field>
          </div>

          <Field label="Kalimat Penutup / Janji Akhir" id={`${idPrefix}-curatorSignOff`}>
            <Input
              id={`${idPrefix}-curatorSignOff`}
              placeholder="Selamanya mengagumi dan menjagamu dalam keabadian waktu"
              {...register("curatorSignOff")}
            />
          </Field>
        </div>
      )}

      {/* TAB 3: 4 INSTALASI SENI */}
      {activeTab === "installations" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-stone-100 border border-stone-300 rounded-xl p-4 text-xs sm:text-sm text-stone-900">
            <p className="font-semibold mb-1">Empat Instalasi Seni Perjalanan Cinta</p>
            <p className="text-stone-600 leading-relaxed">
              Catat 4 babak penting kisah cinta layaknya instalasi seni museum dengan medium dan catatan kurasi.
            </p>
          </div>

          <div className="space-y-4">
            {/* Install 1 */}
            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                Instalasi 01 (Pertemuan Pertama)
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Field label="Medium Seni" id={`${idPrefix}-install1Medium`}>
                  <Input
                    id={`${idPrefix}-install1Medium`}
                    placeholder="Oil on Linen // First Glance"
                    {...register("install1Medium")}
                  />
                </Field>
                <Field label="Nama Karya" id={`${idPrefix}-install1Title`}>
                  <Input
                    id={`${idPrefix}-install1Title`}
                    placeholder="The First Palette: Resonansi Pertemuan Pertama"
                    {...register("install1Title")}
                  />
                </Field>
                <Field label="Tahun / Periode" id={`${idPrefix}-install1Year`}>
                  <Input
                    id={`${idPrefix}-install1Year`}
                    placeholder="Acquired: Musim Semi 2021"
                    {...register("install1Year")}
                  />
                </Field>
              </div>
              <Field label="Catatan Kurasi" id={`${idPrefix}-install1Desc`}>
                <Textarea
                  id={`${idPrefix}-install1Desc`}
                  rows={2}
                  placeholder="Detik ketika waktu terasa melambat..."
                  {...register("install1Desc")}
                />
              </Field>
            </div>

            {/* Install 2 */}
            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                Instalasi 02 (Keteguhan Ujian)
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Field label="Medium Seni" id={`${idPrefix}-install2Medium`}>
                  <Input
                    id={`${idPrefix}-install2Medium`}
                    placeholder="Carved Bronze // Strength in Silence"
                    {...register("install2Medium")}
                  />
                </Field>
                <Field label="Nama Karya" id={`${idPrefix}-install2Title`}>
                  <Input
                    id={`${idPrefix}-install2Title`}
                    placeholder="The Sculpture in the Storm: Keteguhan Melewati Ujian"
                    {...register("install2Title")}
                  />
                </Field>
                <Field label="Tahun / Periode" id={`${idPrefix}-install2Year`}>
                  <Input
                    id={`${idPrefix}-install2Year`}
                    placeholder="Acquired: Musim Hujan 2022"
                    {...register("install2Year")}
                  />
                </Field>
              </div>
              <Field label="Catatan Kurasi" id={`${idPrefix}-install2Desc`}>
                <Textarea
                  id={`${idPrefix}-install2Desc`}
                  rows={2}
                  placeholder="Bahkan di saat badai dan ketidakpastian menerpa..."
                  {...register("install2Desc")}
                />
              </Field>
            </div>

            {/* Install 3 */}
            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                Instalasi 03 (Rumah Batin)
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Field label="Medium Seni" id={`${idPrefix}-install3Medium`}>
                  <Input
                    id={`${idPrefix}-install3Medium`}
                    placeholder="Architectural Light // Pure Harmony"
                    {...register("install3Medium")}
                  />
                </Field>
                <Field label="Nama Karya" id={`${idPrefix}-install3Title`}>
                  <Input
                    id={`${idPrefix}-install3Title`}
                    placeholder="The Sanctuary of Light: Kehangatan Rumah Batin"
                    {...register("install3Title")}
                  />
                </Field>
                <Field label="Tahun / Periode" id={`${idPrefix}-install3Year`}>
                  <Input
                    id={`${idPrefix}-install3Year`}
                    placeholder="Acquired: 2024 – Ongoing"
                    {...register("install3Year")}
                  />
                </Field>
              </div>
              <Field label="Catatan Kurasi" id={`${idPrefix}-install3Desc`}>
                <Textarea
                  id={`${idPrefix}-install3Desc`}
                  rows={2}
                  placeholder="Menemukan tempat pulang di dalam pelukanmu..."
                  {...register("install3Desc")}
                />
              </Field>
            </div>

            {/* Install 4 */}
            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                Instalasi 04 (Kanvas Masa Depan)
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Field label="Medium Seni" id={`${idPrefix}-install4Medium`}>
                  <Input
                    id={`${idPrefix}-install4Medium`}
                    placeholder="Gold Leaf & Infinite Prism // Eternity"
                    {...register("install4Medium")}
                  />
                </Field>
                <Field label="Nama Karya" id={`${idPrefix}-install4Title`}>
                  <Input
                    id={`${idPrefix}-install4Title`}
                    placeholder="The Infinite Horizon: Kanvas Masa Depan Bersama"
                    {...register("install4Title")}
                  />
                </Field>
                <Field label="Tahun / Periode" id={`${idPrefix}-install4Year`}>
                  <Input
                    id={`${idPrefix}-install4Year`}
                    placeholder="Acquired: Selamanya"
                    {...register("install4Year")}
                  />
                </Field>
              </div>
              <Field label="Catatan Kurasi" id={`${idPrefix}-install4Desc`}>
                <Textarea
                  id={`${idPrefix}-install4Desc`}
                  rows={2}
                  placeholder="Menatap cakrawala esok hari dengan keyakinan penuh..."
                  {...register("install4Desc")}
                />
              </Field>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: KOLEKSI LUKISAN (THE PERMANENT COLLECTION) */}
      {activeTab === "collection" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-stone-100 border border-stone-300 rounded-xl p-4 text-xs sm:text-sm text-stone-900">
            <p className="font-semibold mb-1">Koleksi Tetap (The Permanent Collection)</p>
            <p className="text-stone-600 leading-relaxed">
              Tampilkan 3 lukisan kenangan berbingkai museum mewah lengkap dengan plakat kuningan (brass plaque).
            </p>
          </div>

          <div className="space-y-4">
            {/* Artwork 1 */}
            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                Karya Seni 01
              </p>
              <Field label="URL Foto Lukisan" id={`${idPrefix}-artwork1Photo`}>
                <Input
                  id={`${idPrefix}-artwork1Photo`}
                  placeholder="https://images.unsplash.com/..."
                  {...register("artwork1Photo")}
                />
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Judul Karya" id={`${idPrefix}-artwork1Title`}>
                  <Input
                    id={`${idPrefix}-artwork1Title`}
                    placeholder="Senyuman di Bawah Cahaya Sore"
                    {...register("artwork1Title")}
                  />
                </Field>
                <Field label="Plakat Kuningan: Medium" id={`${idPrefix}-artwork1Medium`}>
                  <Input
                    id={`${idPrefix}-artwork1Medium`}
                    placeholder="Natural Light & Pure Joy • Paris, 2023"
                    {...register("artwork1Medium")}
                  />
                </Field>
              </div>
              <Field label="Ulasan Emosional" id={`${idPrefix}-artwork1Desc`}>
                <Textarea
                  id={`${idPrefix}-artwork1Desc`}
                  rows={2}
                  placeholder="Sebuah komposisi sempurna di mana kebahagiaan terpancar..."
                  {...register("artwork1Desc")}
                />
              </Field>
            </div>

            {/* Artwork 2 */}
            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                Karya Seni 02
              </p>
              <Field label="URL Foto Lukisan" id={`${idPrefix}-artwork2Photo`}>
                <Input
                  id={`${idPrefix}-artwork2Photo`}
                  placeholder="https://images.unsplash.com/..."
                  {...register("artwork2Photo")}
                />
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Judul Karya" id={`${idPrefix}-artwork2Title`}>
                  <Input
                    id={`${idPrefix}-artwork2Title`}
                    placeholder="Langkah Berdampingan Menembus Senja"
                    {...register("artwork2Title")}
                  />
                </Field>
                <Field label="Plakat Kuningan: Medium" id={`${idPrefix}-artwork2Medium`}>
                  <Input
                    id={`${idPrefix}-artwork2Medium`}
                    placeholder="Cobblestone Shadows & Heartbeats • 2024"
                    {...register("artwork2Medium")}
                  />
                </Field>
              </div>
              <Field label="Ulasan Emosional" id={`${idPrefix}-artwork2Desc`}>
                <Textarea
                  id={`${idPrefix}-artwork2Desc`}
                  rows={2}
                  placeholder="Menyusuri jalan setapak bersama..."
                  {...register("artwork2Desc")}
                />
              </Field>
            </div>

            {/* Artwork 3 */}
            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                Karya Seni 03
              </p>
              <Field label="URL Foto Lukisan" id={`${idPrefix}-artwork3Photo`}>
                <Input
                  id={`${idPrefix}-artwork3Photo`}
                  placeholder="https://images.unsplash.com/..."
                  {...register("artwork3Photo")}
                />
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Judul Karya" id={`${idPrefix}-artwork3Title`}>
                  <Input
                    id={`${idPrefix}-artwork3Title`}
                    placeholder="Dekapan Kehangatan di Kala Hujan"
                    {...register("artwork3Title")}
                  />
                </Field>
                <Field label="Plakat Kuningan: Medium" id={`${idPrefix}-artwork3Medium`}>
                  <Input
                    id={`${idPrefix}-artwork3Medium`}
                    placeholder="Raindrops & Shared Warmth • 2025"
                    {...register("artwork3Medium")}
                  />
                </Field>
              </div>
              <Field label="Ulasan Emosional" id={`${idPrefix}-artwork3Desc`}>
                <Textarea
                  id={`${idPrefix}-artwork3Desc`}
                  rows={2}
                  placeholder="Bukti nyata bahwa di tengah dinginnya dunia..."
                  {...register("artwork3Desc")}
                />
              </Field>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: IKRAR PELESTARIAN (VOWS OF PRESERVATION) */}
      {activeTab === "vows" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-4 text-xs sm:text-sm text-amber-950">
            <p className="font-semibold mb-1">Empat Ikrar Pelestarian Cinta Abadi</p>
            <p className="text-amber-800/80 leading-relaxed">
              Tuliskan 4 komitmen sakral untuk menjaga dan merawat mahakarya cinta sepanjang masa.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-amber-800 uppercase">Ikrar 01</p>
              <Field label="Nama Janji Setia" id={`${idPrefix}-vow1Title`}>
                <Input
                  id={`${idPrefix}-vow1Title`}
                  placeholder="Vow of Sanctuary: Menjadi Rumah Jiwamu"
                  {...register("vow1Title")}
                />
              </Field>
              <Field label="Uraian Janji" id={`${idPrefix}-vow1Desc`}>
                <Textarea
                  id={`${idPrefix}-vow1Desc`}
                  rows={2}
                  placeholder="Aku berjanji akan selalu menjadi tempatmu pulang..."
                  {...register("vow1Desc")}
                />
              </Field>
            </div>

            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-amber-800 uppercase">Ikrar 02</p>
              <Field label="Nama Janji Setia" id={`${idPrefix}-vow2Title`}>
                <Input
                  id={`${idPrefix}-vow2Title`}
                  placeholder="Vow of Tenderness: Merawat dengan Kelembutan"
                  {...register("vow2Title")}
                />
              </Field>
              <Field label="Uraian Janji" id={`${idPrefix}-vow2Desc`}>
                <Textarea
                  id={`${idPrefix}-vow2Desc`}
                  rows={2}
                  placeholder="Menjagamu dengan tutur kata yang sejuk..."
                  {...register("vow2Desc")}
                />
              </Field>
            </div>

            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-amber-800 uppercase">Ikrar 03</p>
              <Field label="Nama Janji Setia" id={`${idPrefix}-vow3Title`}>
                <Input
                  id={`${idPrefix}-vow3Title`}
                  placeholder="Vow of Growth: Tumbuh dan Bermimpi Bersama"
                  {...register("vow3Title")}
                />
              </Field>
              <Field label="Uraian Janji" id={`${idPrefix}-vow3Desc`}>
                <Textarea
                  id={`${idPrefix}-vow3Desc`}
                  rows={2}
                  placeholder="Mendukung setiap cita-cita dan potensimu..."
                  {...register("vow3Desc")}
                />
              </Field>
            </div>

            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-amber-800 uppercase">Ikrar 04</p>
              <Field label="Nama Janji Setia" id={`${idPrefix}-vow4Title`}>
                <Input
                  id={`${idPrefix}-vow4Title`}
                  placeholder="Vow of Eternity: Kesetiaan Melintasi Waktu"
                  {...register("vow4Title")}
                />
              </Field>
              <Field label="Uraian Janji" id={`${idPrefix}-vow4Desc`}>
                <Textarea
                  id={`${idPrefix}-vow4Desc`}
                  rows={2}
                  placeholder="Tetap memilihmu di setiap musim kehidupan..."
                  {...register("vow4Desc")}
                />
              </Field>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: TEMA WARNA & AUDIO SOUNDTRACK */}
      {activeTab === "theme" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-stone-100 border border-stone-300 rounded-xl p-4 text-xs sm:text-sm text-stone-900">
            <p className="font-semibold mb-1">Palet Warna Galeri & Audio Selo</p>
            <p className="text-stone-600 leading-relaxed">
              Sesuaikan warna marmer, aksen emas plakat kuningan, serta alunan musik selo & piano pengiring galeri.
            </p>
          </div>

          <div className="p-4 border border-stone-200 rounded-xl space-y-4 bg-white">
            <p className="text-xs font-bold text-stone-800 uppercase tracking-wider">
              Soundtrack Ruang Pameran
            </p>
            <Field label="Judul Musik" id={`${idPrefix}-musicTitle`}>
              <Input
                id={`${idPrefix}-musicTitle`}
                placeholder="Museum Cello & Piano Nocturne"
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

          <div className="p-4 border border-stone-200 rounded-xl space-y-4 bg-white">
            <p className="text-xs font-bold text-stone-800 uppercase tracking-wider">
              Palet Warna Galeri
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ColorPickerField
                label="Warna Aksen Plakat Gilded Gold"
                value={(watch("accentColor") as string) || "#c5a059"}
                onChange={(color) =>
                  setValue("accentColor", color, { shouldDirty: true })
                }
              />
              <ColorPickerField
                label="Warna Obsidian Galeri"
                value={(watch("primaryColor") as string) || "#121316"}
                onChange={(color) =>
                  setValue("primaryColor", color, { shouldDirty: true })
                }
              />
              <ColorPickerField
                label="Warna Latar Dinding Museum"
                value={(watch("backgroundColor") as string) || "#f7f5f0"}
                onChange={(color) =>
                  setValue("backgroundColor", color, { shouldDirty: true })
                }
                presets={BACKGROUND_COLOR_PRESETS}
              />
              <ColorPickerField
                label="Warna Plakat & Marmer"
                value={(watch("cardColor") as string) || "#ffffff"}
                onChange={(color) =>
                  setValue("cardColor", color, { shouldDirty: true })
                }
              />
            </div>
          </div>
        </div>
      )}

      {/* Bottom Step Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-stone-200">
        <button
          type="button"
          disabled={currentTabIndex === 0}
          onClick={() => setActiveTab(tabs[currentTabIndex - 1].id)}
          className={cn(
            "inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-colors",
            currentTabIndex === 0
              ? "text-stone-300 cursor-not-allowed"
              : "text-stone-700 hover:bg-stone-100"
          )}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Sebelumnya</span>
        </button>

        <span className="text-xs text-stone-400 font-mono">
          Bagian {currentTabIndex + 1} dari {tabs.length}
        </span>

        <button
          type="button"
          disabled={currentTabIndex === tabs.length - 1}
          onClick={() => setActiveTab(tabs[currentTabIndex + 1].id)}
          className={cn(
            "inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-colors",
            currentTabIndex === tabs.length - 1
              ? "text-stone-300 cursor-not-allowed"
              : "bg-stone-900 text-white hover:bg-stone-800 shadow-sm"
          )}
        >
          <span>Lanjutkan</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
