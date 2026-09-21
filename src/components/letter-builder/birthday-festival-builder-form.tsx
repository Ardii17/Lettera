"use client";

import { useState } from "react";
import type {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  FieldErrors,
} from "react-hook-form";
import {
  Ticket,
  Music2,
  Disc3,
  Flame,
  Award,
  Radio,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Field, Input, Textarea } from "@/components/ui/field";
import { ColorPickerField } from "@/components/ui/color-picker-field";
import { BACKGROUND_COLOR_PRESETS } from "@/templates/color-presets";
import { cn } from "@/lib/utils/cn";
import type { LetterFormValues } from "./dynamic-form";

interface BirthdayFestivalBuilderFormProps {
  register: UseFormRegister<LetterFormValues>;
  setValue: UseFormSetValue<LetterFormValues>;
  watch: UseFormWatch<LetterFormValues>;
  errors: FieldErrors<LetterFormValues>;
  idPrefix?: string;
}

type TabType =
  | "lineup"
  | "manifesto"
  | "setlist"
  | "backstage"
  | "vouchers"
  | "theme";

const PRESET_POSTERS = [
  {
    name: "Poster Festival 1",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Poster Festival 2",
    url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Poster Festival 3",
    url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Poster Festival 4",
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=200&q=60",
  },
];

export function BirthdayFestivalBuilderForm({
  register,
  setValue,
  watch,
  errors,
  idPrefix = "birthday-festival",
}: BirthdayFestivalBuilderFormProps) {
  const [activeTab, setActiveTab] = useState<TabType>("lineup");

  const tabs: Array<{ id: TabType; label: string; icon: typeof Ticket }> = [
    { id: "lineup", label: "Gelang & Lineup", icon: Ticket },
    { id: "manifesto", label: "Memo Manajer Tur", icon: Music2 },
    { id: "setlist", label: "Setlist Lagu", icon: Disc3 },
    { id: "backstage", label: "Foto Backstage", icon: Flame },
    { id: "vouchers", label: "Kupon Merch", icon: Award },
    { id: "theme", label: "Warna & Audio", icon: Radio },
  ];

  const currentTabIndex = tabs.findIndex((t) => t.id === activeTab);
  const currentPoster = watch("posterPhotoUrl") as string;

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex overflow-x-auto no-scrollbar gap-1.5 p-1 bg-stone-900/5 rounded-xl border border-stone-200">
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
                  ? "bg-white text-stone-950 shadow-sm font-semibold ring-1 ring-stone-950/10"
                  : "text-stone-500 hover:text-stone-950 hover:bg-white/50"
              )}
            >
              <Icon
                className={cn(
                  "w-3.5 h-3.5",
                  isActive ? "text-orange-500" : "text-stone-400"
                )}
              />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: GELANG VIP & POSTER LINEUP */}
      {activeTab === "lineup" && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 text-xs sm:text-sm text-stone-900">
            <p className="font-semibold mb-1">Gelang VIP & Lineup Poster Festival</p>
            <p className="text-stone-600 leading-relaxed">
              Atur nama headliner utama, nomor edisi tur (usia baru), nama festival, musisi pendukung, dan foto poster utama.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Nama Headliner Utama (Yang Berulang Tahun)"
              error={errors.recipientName?.message}
              id={`${idPrefix}-recipientName`}
            >
              <Input
                id={`${idPrefix}-recipientName`}
                placeholder="Clarissa Aurelia"
                {...register("recipientName", {
                  required: "Nama headliner wajib diisi",
                })}
              />
            </Field>

            <Field
              label="Angka Usia Baru (Nomor Edisi Tur)"
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
            label="Nama Festival Musik"
            error={errors.festivalName?.message}
            id={`${idPrefix}-festivalName`}
          >
            <Input
              id={`${idPrefix}-festivalName`}
              placeholder="AURELIAFEST // THE 25TH SOLAR TOUR"
              {...register("festivalName", {
                required: "Nama festival wajib diisi",
              })}
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Jadwal & Tanggal Konser"
              error={errors.festivalDate?.message}
              id={`${idPrefix}-festivalDate`}
            >
              <Input
                id={`${idPrefix}-festivalDate`}
                placeholder="Saturday, 24 October 2026 // Gates Open 16:00"
                {...register("festivalDate", {
                  required: "Tanggal festival wajib diisi",
                })}
              />
            </Field>

            <Field label="Lokasi Arena Panggung" id={`${idPrefix}-festivalVenue`}>
              <Input
                id={`${idPrefix}-festivalVenue`}
                placeholder="The Life Amphitheater & Sunset Arena"
                {...register("festivalVenue")}
              />
            </Field>
          </div>

          <Field
            label="Musisi Pendukung (Special Guests)"
            id={`${idPrefix}-specialGuests`}
            helperText="Daftar nama sahabat, keluarga, atau orang-orang terdekat"
          >
            <Input
              id={`${idPrefix}-specialGuests`}
              placeholder="The Besties Ensemble • Family Choir • Forever Friends"
              {...register("specialGuests")}
            />
          </Field>

          {/* Poster Photo Presets */}
          <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
            <p className="text-xs font-bold text-stone-800 uppercase tracking-wider">
              Foto Poster Headliner
            </p>
            <Field label="URL Foto Poster" id={`${idPrefix}-posterPhotoUrl`}>
              <Input
                id={`${idPrefix}-posterPhotoUrl`}
                placeholder="https://images.unsplash.com/..."
                {...register("posterPhotoUrl")}
              />
            </Field>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              {PRESET_POSTERS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() =>
                    setValue("posterPhotoUrl", preset.url, {
                      shouldDirty: true,
                    })
                  }
                  className={cn(
                    "p-2 rounded-lg border text-left text-xs transition-all flex flex-col items-center gap-1.5",
                    currentPoster === preset.url
                      ? "border-orange-500 bg-orange-50 font-semibold"
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
            label="Semboyan Festival / Motto Tur"
            id={`${idPrefix}-festivalTagline`}
            helperText="Pesan singkat pembuka semangat tur kehidupan"
          >
            <Textarea
              id={`${idPrefix}-festivalTagline`}
              rows={2}
              placeholder="Sebuah perayaan tanpa henti untuk merayakan energi..."
              {...register("festivalTagline")}
            />
          </Field>
        </div>
      )}

      {/* TAB 2: SURAT MANAJER TUR */}
      {activeTab === "manifesto" && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          <div className="bg-stone-100 border border-stone-300 rounded-xl p-4 text-xs sm:text-sm text-stone-900">
            <p className="font-semibold mb-1">Memo Khusus Manajer Tur</p>
            <p className="text-stone-600 leading-relaxed">
              Tuliskan surat apresiasi mendalam dari sudut pandang manajer tur panggung kehidupan.
            </p>
          </div>

          <Field
            label="Judul Catatan Memo"
            error={errors.letterTitle?.message}
            id={`${idPrefix}-letterTitle`}
          >
            <Input
              id={`${idPrefix}-letterTitle`}
              placeholder="Tour Manager's Log: Sebuah Catatan Cinta di Balik Panggung Akbar"
              {...register("letterTitle", {
                required: "Judul memo wajib diisi",
              })}
            />
          </Field>

          <Field
            label="Isi Surat Utama"
            error={errors.letterContent?.message}
            id={`${idPrefix}-letterContent`}
            helperText="Gunakan baris baru untuk memisahkan antar paragraf."
          >
            <Textarea
              id={`${idPrefix}-letterContent`}
              rows={8}
              placeholder="Kepada sang headliner paling bersinar di panggung kehidupan..."
              {...register("letterContent", {
                required: "Isi surat wajib diisi",
              })}
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Nama Manajer Tur / Pengirim"
              error={errors.tourManagerName?.message}
              id={`${idPrefix}-tourManagerName`}
            >
              <Input
                id={`${idPrefix}-tourManagerName`}
                placeholder="Rian Danuarta"
                {...register("tourManagerName", {
                  required: "Nama manajer tur wajib diisi",
                })}
              />
            </Field>

            <Field
              label="Peran / Hubungan Pengirim"
              id={`${idPrefix}-tourManagerTitle`}
            >
              <Input
                id={`${idPrefix}-tourManagerTitle`}
                placeholder="Head of Crew & Lifetime Companion // Sahabat Sejati"
                {...register("tourManagerTitle")}
              />
            </Field>
          </div>
        </div>
      )}

      {/* TAB 3: THE SETLIST OF LIFE */}
      {activeTab === "setlist" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-stone-100 border border-stone-300 rounded-xl p-4 text-xs sm:text-sm text-stone-900">
            <p className="font-semibold mb-1">The Setlist of Life (4 Trek Lagu)</p>
            <p className="text-stone-600 leading-relaxed">
              Rancang daftar 4 trek lagu yang merefleksikan fase perjalanan usia sang headliner.
            </p>
          </div>

          <div className="space-y-4">
            {/* Track 1 */}
            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                Trek 01 (Masa Awal)
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Field label="Durasi" id={`${idPrefix}-track1Duration`}>
                  <Input
                    id={`${idPrefix}-track1Duration`}
                    placeholder="03:45"
                    {...register("track1Duration")}
                  />
                </Field>
                <Field label="Judul Lagu" id={`${idPrefix}-track1Title`}>
                  <Input
                    id={`${idPrefix}-track1Title`}
                    placeholder="The Acoustic Intro: Langkah Pertama & Imajinasi"
                    {...register("track1Title")}
                  />
                </Field>
                <Field label="Era / Album" id={`${idPrefix}-track1Era`}>
                  <Input
                    id={`${idPrefix}-track1Era`}
                    placeholder="Era Masa Kecil // Acoustic Roots"
                    {...register("track1Era")}
                  />
                </Field>
              </div>
              <Field label="Catatan Emosional" id={`${idPrefix}-track1Desc`}>
                <Textarea
                  id={`${idPrefix}-track1Desc`}
                  rows={2}
                  placeholder="Melodi riang masa kecil di mana setiap mimpi..."
                  {...register("track1Desc")}
                />
              </Field>
            </div>

            {/* Track 2 */}
            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                Trek 02 (Eksplorasi)
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Field label="Durasi" id={`${idPrefix}-track2Duration`}>
                  <Input
                    id={`${idPrefix}-track2Duration`}
                    placeholder="04:12"
                    {...register("track2Duration")}
                  />
                </Field>
                <Field label="Judul Lagu" id={`${idPrefix}-track2Title`}>
                  <Input
                    id={`${idPrefix}-track2Title`}
                    placeholder="Electric Rebellion: Melodi Keberanian & Persahabatan"
                    {...register("track2Title")}
                  />
                </Field>
                <Field label="Era / Album" id={`${idPrefix}-track2Era`}>
                  <Input
                    id={`${idPrefix}-track2Era`}
                    placeholder="Era Remaja // Indie Rock Spirit"
                    {...register("track2Era")}
                  />
                </Field>
              </div>
              <Field label="Catatan Emosional" id={`${idPrefix}-track2Desc`}>
                <Textarea
                  id={`${idPrefix}-track2Desc`}
                  rows={2}
                  placeholder="Ketukan drum yang mengiringi pencarian jati diri..."
                  {...register("track2Desc")}
                />
              </Field>
            </div>

            {/* Track 3 */}
            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                Trek 03 (Kedewasaan)
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Field label="Durasi" id={`${idPrefix}-track3Duration`}>
                  <Input
                    id={`${idPrefix}-track3Duration`}
                    placeholder="04:50"
                    {...register("track3Duration")}
                  />
                </Field>
                <Field label="Judul Lagu" id={`${idPrefix}-track3Title`}>
                  <Input
                    id={`${idPrefix}-track3Title`}
                    placeholder="Anthem of Triumph: Supernova Karya & Ketangguhan"
                    {...register("track3Title")}
                  />
                </Field>
                <Field label="Era / Album" id={`${idPrefix}-track3Era`}>
                  <Input
                    id={`${idPrefix}-track3Era`}
                    placeholder="Era Dewasa Awal // Arena Rock"
                    {...register("track3Era")}
                  />
                </Field>
              </div>
              <Field label="Catatan Emosional" id={`${idPrefix}-track3Desc`}>
                <Textarea
                  id={`${idPrefix}-track3Desc`}
                  rows={2}
                  placeholder="Harmoni megah saat kau menaklukkan badai kehidupan..."
                  {...register("track3Desc")}
                />
              </Field>
            </div>

            {/* Track 4 */}
            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                Trek 04 (Babak Usia Baru)
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Field label="Durasi" id={`${idPrefix}-track4Duration`}>
                  <Input
                    id={`${idPrefix}-track4Duration`}
                    placeholder="05:25"
                    {...register("track4Duration")}
                  />
                </Field>
                <Field label="Judul Lagu" id={`${idPrefix}-track4Title`}>
                  <Input
                    id={`${idPrefix}-track4Title`}
                    placeholder="The Golden Encore: Babak Usia Baru & Doa Langit"
                    {...register("track4Title")}
                  />
                </Field>
                <Field label="Era / Album" id={`${idPrefix}-track4Era`}>
                  <Input
                    id={`${idPrefix}-track4Era`}
                    placeholder="Babak Usia Baru // Symphony of Hope"
                    {...register("track4Era")}
                  />
                </Field>
              </div>
              <Field label="Catatan Emosional" id={`${idPrefix}-track4Desc`}>
                <Textarea
                  id={`${idPrefix}-track4Desc`}
                  rows={2}
                  placeholder="Lagu penutup yang megah menyambut tahun baru..."
                  {...register("track4Desc")}
                />
              </Field>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: BACKSTAGE POLAROIDS */}
      {activeTab === "backstage" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-stone-100 border border-stone-300 rounded-xl p-4 text-xs sm:text-sm text-stone-900">
            <p className="font-semibold mb-1">Galeri Backstage Polaroid</p>
            <p className="text-stone-600 leading-relaxed">
              Tampilkan 3 foto polaroid candid di balik panggung dengan tag panggung dan memo hangat.
            </p>
          </div>

          <div className="space-y-4">
            {/* Polaroid 1 */}
            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                Polaroid 1
              </p>
              <Field label="URL Foto 1" id={`${idPrefix}-polaroid1Photo`}>
                <Input
                  id={`${idPrefix}-polaroid1Photo`}
                  placeholder="https://images.unsplash.com/..."
                  {...register("polaroid1Photo")}
                />
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Judul Momen" id={`${idPrefix}-polaroid1Title`}>
                  <Input
                    id={`${idPrefix}-polaroid1Title`}
                    placeholder="Soundcheck Tawa Hangat"
                    {...register("polaroid1Title")}
                  />
                </Field>
                <Field label="Tag Panggung" id={`${idPrefix}-polaroid1Stage`}>
                  <Input
                    id={`${idPrefix}-polaroid1Stage`}
                    placeholder="GREEN ROOM // PRE-SHOW"
                    {...register("polaroid1Stage")}
                  />
                </Field>
              </div>
              <Field label="Catatan Momen" id={`${idPrefix}-polaroid1Desc`}>
                <Textarea
                  id={`${idPrefix}-polaroid1Desc`}
                  rows={2}
                  placeholder="Momen sebelum panggung dimulai..."
                  {...register("polaroid1Desc")}
                />
              </Field>
            </div>

            {/* Polaroid 2 */}
            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                Polaroid 2
              </p>
              <Field label="URL Foto 2" id={`${idPrefix}-polaroid2Photo`}>
                <Input
                  id={`${idPrefix}-polaroid2Photo`}
                  placeholder="https://images.unsplash.com/..."
                  {...register("polaroid2Photo")}
                />
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Judul Momen" id={`${idPrefix}-polaroid2Title`}>
                  <Input
                    id={`${idPrefix}-polaroid2Title`}
                    placeholder="Gemerlap Cahaya Sorot Malam"
                    {...register("polaroid2Title")}
                  />
                </Field>
                <Field label="Tag Panggung" id={`${idPrefix}-polaroid2Stage`}>
                  <Input
                    id={`${idPrefix}-polaroid2Stage`}
                    placeholder="MAIN STAGE // LIVE CONCERT"
                    {...register("polaroid2Stage")}
                  />
                </Field>
              </div>
              <Field label="Catatan Momen" id={`${idPrefix}-polaroid2Desc`}>
                <Textarea
                  id={`${idPrefix}-polaroid2Desc`}
                  rows={2}
                  placeholder="Ketika energi positifmu menyala..."
                  {...register("polaroid2Desc")}
                />
              </Field>
            </div>

            {/* Polaroid 3 */}
            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                Polaroid 3
              </p>
              <Field label="URL Foto 3" id={`${idPrefix}-polaroid3Photo`}>
                <Input
                  id={`${idPrefix}-polaroid3Photo`}
                  placeholder="https://images.unsplash.com/..."
                  {...register("polaroid3Photo")}
                />
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Judul Momen" id={`${idPrefix}-polaroid3Title`}>
                  <Input
                    id={`${idPrefix}-polaroid3Title`}
                    placeholder="Pelukan Usai Konser Akbar"
                    {...register("polaroid3Title")}
                  />
                </Field>
                <Field label="Tag Panggung" id={`${idPrefix}-polaroid3Stage`}>
                  <Input
                    id={`${idPrefix}-polaroid3Stage`}
                    placeholder="AFTERSTAGE // CREW CIRCLE"
                    {...register("polaroid3Stage")}
                  />
                </Field>
              </div>
              <Field label="Catatan Momen" id={`${idPrefix}-polaroid3Desc`}>
                <Textarea
                  id={`${idPrefix}-polaroid3Desc`}
                  rows={2}
                  placeholder="Tanda terima kasih tak terhingga..."
                  {...register("polaroid3Desc")}
                />
              </Field>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: KUPON MERCH & PRIVILEGE */}
      {activeTab === "vouchers" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 text-xs sm:text-sm text-stone-900">
            <p className="font-semibold mb-1">Empat Kupon Merchandise & Privilege VIP</p>
            <p className="text-stone-600 leading-relaxed">
              Berikan 4 kupon hadiah eksklusif yang bisa diklaim penerima kapan saja seumur hidup.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-orange-600 uppercase">Kupon 1</p>
              <Field label="Judul Kupon" id={`${idPrefix}-voucher1Title`}>
                <Input
                  id={`${idPrefix}-voucher1Title`}
                  placeholder="Free Coffee Rider Pass"
                  {...register("voucher1Title")}
                />
              </Field>
              <Field label="Keterangan Hadiah" id={`${idPrefix}-voucher1Desc`}>
                <Textarea
                  id={`${idPrefix}-voucher1Desc`}
                  rows={2}
                  placeholder="Traktir kopi favorit sepuasnya..."
                  {...register("voucher1Desc")}
                />
              </Field>
            </div>

            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-orange-600 uppercase">Kupon 2</p>
              <Field label="Judul Kupon" id={`${idPrefix}-voucher2Title`}>
                <Input
                  id={`${idPrefix}-voucher2Title`}
                  placeholder="24/7 Backstage Curhat Hotline"
                  {...register("voucher2Title")}
                />
              </Field>
              <Field label="Keterangan Hadiah" id={`${idPrefix}-voucher2Desc`}>
                <Textarea
                  id={`${idPrefix}-voucher2Desc`}
                  rows={2}
                  placeholder="Akses telepon dan temu kangen darurat..."
                  {...register("voucher2Desc")}
                />
              </Field>
            </div>

            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-orange-600 uppercase">Kupon 3</p>
              <Field label="Judul Kupon" id={`${idPrefix}-voucher3Title`}>
                <Input
                  id={`${idPrefix}-voucher3Title`}
                  placeholder="Festival Roadtrip Companion"
                  {...register("voucher3Title")}
                />
              </Field>
              <Field label="Keterangan Hadiah" id={`${idPrefix}-voucher3Desc`}>
                <Textarea
                  id={`${idPrefix}-voucher3Desc`}
                  rows={2}
                  placeholder="Tiket jalan-jalan santai mencari angin segar..."
                  {...register("voucher3Desc")}
                />
              </Field>
            </div>

            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-orange-600 uppercase">Kupon 4</p>
              <Field label="Judul Kupon" id={`${idPrefix}-voucher4Title`}>
                <Input
                  id={`${idPrefix}-voucher4Title`}
                  placeholder="Secret VIP Birthday Rider Box"
                  {...register("voucher4Title")}
                />
              </Field>
              <Field label="Keterangan Hadiah" id={`${idPrefix}-voucher4Desc`}>
                <Textarea
                  id={`${idPrefix}-voucher4Desc`}
                  rows={2}
                  placeholder="Kupon klaim untuk ditukar dengan barang impian..."
                  {...register("voucher4Desc")}
                />
              </Field>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: TEMA WARNA & AUDIO FESTIVAL */}
      {activeTab === "theme" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-stone-100 border border-stone-300 rounded-xl p-4 text-xs sm:text-sm text-stone-900">
            <p className="font-semibold mb-1">Palet Warna Festival & Musik Konser</p>
            <p className="text-stone-600 leading-relaxed">
              Sesuaikan warna neon sunset festival, road case, serta musik akustik perayaan pengiring konser.
            </p>
          </div>

          <div className="p-4 border border-stone-200 rounded-xl space-y-4 bg-white">
            <p className="text-xs font-bold text-stone-800 uppercase tracking-wider">
              Audio Musik Festival
            </p>
            <Field label="Judul Musik" id={`${idPrefix}-musicTitle`}>
              <Input
                id={`${idPrefix}-musicTitle`}
                placeholder="Live Festival Acoustic & Indie Celebration"
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
              Palet Warna Arena
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ColorPickerField
                label="Warna Aksen Neon Sunset"
                value={(watch("accentColor") as string) || "#f97316"}
                onChange={(color) =>
                  setValue("accentColor", color, { shouldDirty: true })
                }
              />
              <ColorPickerField
                label="Warna Utama Arena"
                value={(watch("primaryColor") as string) || "#180e29"}
                onChange={(color) =>
                  setValue("primaryColor", color, { shouldDirty: true })
                }
              />
              <ColorPickerField
                label="Warna Latar Belakang"
                value={(watch("backgroundColor") as string) || "#0d0718"}
                onChange={(color) =>
                  setValue("backgroundColor", color, { shouldDirty: true })
                }
                presets={BACKGROUND_COLOR_PRESETS}
              />
              <ColorPickerField
                label="Warna Kotak Roadcase"
                value={(watch("cardColor") as string) || "#1c122e"}
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
