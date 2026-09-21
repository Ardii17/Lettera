"use client";

import { useState } from "react";
import type {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  FieldErrors,
} from "react-hook-form";
import {
  Clapperboard,
  Video,
  Film,
  Camera,
  Award,
  Music,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Field, Input, Textarea } from "@/components/ui/field";
import { ColorPickerField } from "@/components/ui/color-picker-field";
import { BACKGROUND_COLOR_PRESETS } from "@/templates/color-presets";
import { cn } from "@/lib/utils/cn";
import type { LetterFormValues } from "./dynamic-form";

interface BirthdayCinemaBuilderFormProps {
  register: UseFormRegister<LetterFormValues>;
  setValue: UseFormSetValue<LetterFormValues>;
  watch: UseFormWatch<LetterFormValues>;
  errors: FieldErrors<LetterFormValues>;
  idPrefix?: string;
}

type TabType =
  | "premiere"
  | "statement"
  | "scenes"
  | "bts"
  | "awards"
  | "theme";

const PRESET_POSTERS = [
  {
    name: "Poster Sinematik 1",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Poster Sinematik 2",
    url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Poster Sinematik 3",
    url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Poster Sinematik 4",
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=200&q=60",
  },
];

export function BirthdayCinemaBuilderForm({
  register,
  setValue,
  watch,
  errors,
  idPrefix = "birthday-cinema",
}: BirthdayCinemaBuilderFormProps) {
  const [activeTab, setActiveTab] = useState<TabType>("premiere");

  const tabs: Array<{ id: TabType; label: string; icon: typeof Clapperboard }> =
    [
      { id: "premiere", label: "Clapboard & Poster", icon: Clapperboard },
      { id: "statement", label: "Surat Sutradara", icon: Video },
      { id: "scenes", label: "Rol Film 35mm", icon: Film },
      { id: "bts", label: "Di Balik Layar", icon: Camera },
      { id: "awards", label: "Piala Laurels", icon: Award },
      { id: "theme", label: "Warna & Soundtrack", icon: Music },
    ];

  const currentTabIndex = tabs.findIndex((t) => t.id === activeTab);
  const currentPoster = watch("posterUrl") as string;

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
                  isActive ? "text-amber-500" : "text-stone-400"
                )}
              />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: CLAPPERBOARD & POSTER PREMIERE */}
      {activeTab === "premiere" && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-xs sm:text-sm text-stone-900">
            <p className="font-semibold mb-1">Papan Clapperboard & Poster Film</p>
            <p className="text-stone-600 leading-relaxed">
              Atur nama bintang utama, nomor babak usia, judul mahakarya film, genre, dan foto poster premiere.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Nama Bintang Utama (Yang Berulang Tahun)"
              error={errors.recipientName?.message}
              id={`${idPrefix}-recipientName`}
            >
              <Input
                id={`${idPrefix}-recipientName`}
                placeholder="Natasha Aurelie"
                {...register("recipientName", {
                  required: "Nama penerima wajib diisi",
                })}
              />
            </Field>

            <Field
              label="Nomor Episode / Angka Usia Baru"
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
            label="Judul Mahakarya Film"
            error={errors.filmTitle?.message}
            id={`${idPrefix}-filmTitle`}
          >
            <Input
              id={`${idPrefix}-filmTitle`}
              placeholder="THE EXTRAORDINARY EXPEDITION: CHAPTER 25"
              {...register("filmTitle", {
                required: "Judul film wajib diisi",
              })}
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Genre Film" id={`${idPrefix}-filmGenre`}>
              <Input
                id={`${idPrefix}-filmGenre`}
                placeholder="Drama, Warm Comedy, Infinite Wonder"
                {...register("filmGenre")}
              />
            </Field>

            <Field
              label="Tanggal Premiere (Hari Ulang Tahun)"
              error={errors.premiereDate?.message}
              id={`${idPrefix}-premiereDate`}
            >
              <Input
                id={`${idPrefix}-premiereDate`}
                placeholder="Gala Premiere // 26 Oktober 2026"
                {...register("premiereDate", {
                  required: "Tanggal premiere wajib diisi",
                })}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Durasi Film" id={`${idPrefix}-runningTime`}>
              <Input
                id={`${idPrefix}-runningTime`}
                placeholder="25 Years of Pure Grace & Laughter"
                {...register("runningTime")}
              />
            </Field>

            <Field label="Rating Kritikus" id={`${idPrefix}-filmRating`}>
              <Input
                id={`${idPrefix}-filmRating`}
                placeholder="100% Certified Masterpiece // Rotten Smiles"
                {...register("filmRating")}
              />
            </Field>
          </div>

          {/* Poster Photo Presets */}
          <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
            <p className="text-xs font-bold text-stone-800 uppercase tracking-wider">
              Foto Poster Premiere
            </p>
            <Field label="URL Foto Poster" id={`${idPrefix}-posterUrl`}>
              <Input
                id={`${idPrefix}-posterUrl`}
                placeholder="https://images.unsplash.com/..."
                {...register("posterUrl")}
              />
            </Field>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              {PRESET_POSTERS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() =>
                    setValue("posterUrl", preset.url, { shouldDirty: true })
                  }
                  className={cn(
                    "p-2 rounded-lg border text-left text-xs transition-all flex flex-col items-center gap-1.5",
                    currentPoster === preset.url
                      ? "border-amber-500 bg-amber-50 font-semibold"
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
            label="Sinopsis Sinematik Kurator"
            id={`${idPrefix}-filmSynopsis`}
            helperText="Ringkasan puitis sinopsis film kehidupan sang tokoh utama"
          >
            <Textarea
              id={`${idPrefix}-filmSynopsis`}
              rows={2}
              placeholder="Sebuah kisah memukau tentang keteguhan jiwa..."
              {...register("filmSynopsis")}
            />
          </Field>
        </div>
      )}

      {/* TAB 2: SURAT NASKAH SUTRADARA */}
      {activeTab === "statement" && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          <div className="bg-stone-100 border border-stone-300 rounded-xl p-4 text-xs sm:text-sm text-stone-900">
            <p className="font-semibold mb-1">Warkat Naskah Sutradara (Screenplay)</p>
            <p className="text-stone-600 leading-relaxed">
              Tuliskan surat apresiasi mendalam berformat naskah skenario film dari sudut pandang sutradara/sahabat.
            </p>
          </div>

          <Field
            label="Judul Catatan Sutradara"
            error={errors.letterTitle?.message}
            id={`${idPrefix}-letterTitle`}
          >
            <Input
              id={`${idPrefix}-letterTitle`}
              placeholder="Director's Note: Sebuah Penghormatan Bagi Pemeran Utama Terbaik"
              {...register("letterTitle", {
                required: "Judul catatan wajib diisi",
              })}
            />
          </Field>

          <Field
            label="Isi Surat Skenario Film"
            error={errors.letterContent?.message}
            id={`${idPrefix}-letterContent`}
            helperText="Gunakan baris baru untuk memisahkan antar adegan dan dialog."
          >
            <Textarea
              id={`${idPrefix}-letterContent`}
              rows={8}
              placeholder="INT. THE THEATER OF LIFE - NIGHT\n\nLampu auditorium meredup perlahan..."
              {...register("letterContent", {
                required: "Isi naskah surat wajib diisi",
              })}
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Nama Sutradara / Pengirim"
              error={errors.directorName?.message}
              id={`${idPrefix}-directorName`}
            >
              <Input
                id={`${idPrefix}-directorName`}
                placeholder="Julian Alistair"
                {...register("directorName", {
                  required: "Nama sutradara wajib diisi",
                })}
              />
            </Field>

            <Field
              label="Peran / Hubungan Pengirim"
              id={`${idPrefix}-directorTitle`}
            >
              <Input
                id={`${idPrefix}-directorTitle`}
                placeholder="Executive Producer & Lifetime Co-Director // Sahabat Sejati"
                {...register("directorTitle")}
              />
            </Field>
          </div>
        </div>
      )}

      {/* TAB 3: ROL FILM 35MM */}
      {activeTab === "scenes" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-stone-100 border border-stone-300 rounded-xl p-4 text-xs sm:text-sm text-stone-900">
            <p className="font-semibold mb-1">Empat Adegan Kunci Rol Film 35mm</p>
            <p className="text-stone-600 leading-relaxed">
              Catat 4 adegan penting perjalanan hidup dengan timecode dan deskripsi sinematik.
            </p>
          </div>

          <div className="space-y-4">
            {/* Scene 1 */}
            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-red-700 uppercase tracking-wider">
                Adegan 1 (The Opening Sequence)
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Timecode" id={`${idPrefix}-scene1Timecode`}>
                  <Input
                    id={`${idPrefix}-scene1Timecode`}
                    placeholder="TC: 00:00:01:00"
                    {...register("scene1Timecode")}
                  />
                </Field>
                <Field label="Judul Adegan" id={`${idPrefix}-scene1Title`}>
                  <Input
                    id={`${idPrefix}-scene1Title`}
                    placeholder="The Opening Sequence: Kelahiran & Kepolosan"
                    {...register("scene1Title")}
                  />
                </Field>
              </div>
              <Field label="Uraian Adegan" id={`${idPrefix}-scene1Desc`}>
                <Textarea
                  id={`${idPrefix}-scene1Desc`}
                  rows={2}
                  placeholder="Awal mula perjalanan dengan mata yang berbinar..."
                  {...register("scene1Desc")}
                />
              </Field>
            </div>

            {/* Scene 2 */}
            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-red-700 uppercase tracking-wider">
                Adegan 2 (The Plot Twist)
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Timecode" id={`${idPrefix}-scene2Timecode`}>
                  <Input
                    id={`${idPrefix}-scene2Timecode`}
                    placeholder="TC: 00:15:20:00"
                    {...register("scene2Timecode")}
                  />
                </Field>
                <Field label="Judul Adegan" id={`${idPrefix}-scene2Title`}>
                  <Input
                    id={`${idPrefix}-scene2Title`}
                    placeholder="The Plot Twist: Badai, Eksplorasi & Kedewasaan"
                    {...register("scene2Title")}
                  />
                </Field>
              </div>
              <Field label="Uraian Adegan" id={`${idPrefix}-scene2Desc`}>
                <Textarea
                  id={`${idPrefix}-scene2Desc`}
                  rows={2}
                  placeholder="Masa-masa penuh tantangan yang menguji karakter..."
                  {...register("scene2Desc")}
                />
              </Field>
            </div>

            {/* Scene 3 */}
            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-red-700 uppercase tracking-wider">
                Adegan 3 (The Climax)
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Timecode" id={`${idPrefix}-scene3Timecode`}>
                  <Input
                    id={`${idPrefix}-scene3Timecode`}
                    placeholder="TC: 00:23:45:00"
                    {...register("scene3Timecode")}
                  />
                </Field>
                <Field label="Judul Adegan" id={`${idPrefix}-scene3Title`}>
                  <Input
                    id={`${idPrefix}-scene3Title`}
                    placeholder="The Climax: Supernova Pencapaian & Karya"
                    {...register("scene3Title")}
                  />
                </Field>
              </div>
              <Field label="Uraian Adegan" id={`${idPrefix}-scene3Desc`}>
                <Textarea
                  id={`${idPrefix}-scene3Desc`}
                  rows={2}
                  placeholder="Titik di mana dedikasi dan kebaikanmu berbuah manis..."
                  {...register("scene3Desc")}
                />
              </Field>
            </div>

            {/* Scene 4 */}
            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-red-700 uppercase tracking-wider">
                Adegan 4 (The Golden Horizon)
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Timecode" id={`${idPrefix}-scene4Timecode`}>
                  <Input
                    id={`${idPrefix}-scene4Timecode`}
                    placeholder="TC: 00:25:00:00"
                    {...register("scene4Timecode")}
                  />
                </Field>
                <Field label="Judul Adegan" id={`${idPrefix}-scene4Title`}>
                  <Input
                    id={`${idPrefix}-scene4Title`}
                    placeholder="The Golden Horizon: Babak Usia Baru"
                    {...register("scene4Title")}
                  />
                </Field>
              </div>
              <Field label="Uraian Adegan" id={`${idPrefix}-scene4Desc`}>
                <Textarea
                  id={`${idPrefix}-scene4Desc`}
                  rows={2}
                  placeholder="Kamera mengarah ke masa depan yang cerah..."
                  {...register("scene4Desc")}
                />
              </Field>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: FOTO DI BALIK LAYAR (BTS) */}
      {activeTab === "bts" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-stone-100 border border-stone-300 rounded-xl p-4 text-xs sm:text-sm text-stone-900">
            <p className="font-semibold mb-1">Galeri Di Balik Layar (Behind-The-Scenes)</p>
            <p className="text-stone-600 leading-relaxed">
              Tampilkan 3 foto candid kenangan syuting kehidupan dengan catatan lensa kamera analog.
            </p>
          </div>

          <div className="space-y-4">
            {/* BTS 1 */}
            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                Foto BTS 1
              </p>
              <Field label="URL Foto 1" id={`${idPrefix}-bts1Photo`}>
                <Input
                  id={`${idPrefix}-bts1Photo`}
                  placeholder="https://images.unsplash.com/..."
                  {...register("bts1Photo")}
                />
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Judul Momen" id={`${idPrefix}-bts1Title`}>
                  <Input
                    id={`${idPrefix}-bts1Title`}
                    placeholder="Tawa Spontan di Luar Skenario"
                    {...register("bts1Title")}
                  />
                </Field>
                <Field label="Catatan Lensa" id={`${idPrefix}-bts1Lens`}>
                  <Input
                    id={`${idPrefix}-bts1Lens`}
                    placeholder="35mm Prime // f/1.4 Soft Light"
                    {...register("bts1Lens")}
                  />
                </Field>
              </div>
              <Field label="Catatan Momen" id={`${idPrefix}-bts1Desc`}>
                <Textarea
                  id={`${idPrefix}-bts1Desc`}
                  rows={2}
                  placeholder="Tawa paling lepas yang tertangkap kamera..."
                  {...register("bts1Desc")}
                />
              </Field>
            </div>

            {/* BTS 2 */}
            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                Foto BTS 2
              </p>
              <Field label="URL Foto 2" id={`${idPrefix}-bts2Photo`}>
                <Input
                  id={`${idPrefix}-bts2Photo`}
                  placeholder="https://images.unsplash.com/..."
                  {...register("bts2Photo")}
                />
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Judul Momen" id={`${idPrefix}-bts2Title`}>
                  <Input
                    id={`${idPrefix}-bts2Title`}
                    placeholder="Eksplorasi Malam Penuh Kilau"
                    {...register("bts2Title")}
                  />
                </Field>
                <Field label="Catatan Lensa" id={`${idPrefix}-bts2Lens`}>
                  <Input
                    id={`${idPrefix}-bts2Lens`}
                    placeholder="50mm Cine // f/1.2 City Lights"
                    {...register("bts2Lens")}
                  />
                </Field>
              </div>
              <Field label="Catatan Momen" id={`${idPrefix}-bts2Desc`}>
                <Textarea
                  id={`${idPrefix}-bts2Desc`}
                  rows={2}
                  placeholder="Momen magis menembus hiruk pikuk kota..."
                  {...register("bts2Desc")}
                />
              </Field>
            </div>

            {/* BTS 3 */}
            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                Foto BTS 3
              </p>
              <Field label="URL Foto 3" id={`${idPrefix}-bts3Photo`}>
                <Input
                  id={`${idPrefix}-bts3Photo`}
                  placeholder="https://images.unsplash.com/..."
                  {...register("bts3Photo")}
                />
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Judul Momen" id={`${idPrefix}-bts3Title`}>
                  <Input
                    id={`${idPrefix}-bts3Title`}
                    placeholder="Pelukan Hangat Rekan Seperjuangan"
                    {...register("bts3Title")}
                  />
                </Field>
                <Field label="Catatan Lensa" id={`${idPrefix}-bts3Lens`}>
                  <Input
                    id={`${idPrefix}-bts3Lens`}
                    placeholder="85mm Portrait // f/1.8 Golden Hour"
                    {...register("bts3Lens")}
                  />
                </Field>
              </div>
              <Field label="Catatan Momen" id={`${idPrefix}-bts3Desc`}>
                <Textarea
                  id={`${idPrefix}-bts3Desc`}
                  rows={2}
                  placeholder="Bukti tak terbantahkan bahwa kehangatan..."
                  {...register("bts3Desc")}
                />
              </Field>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: PIALA GOLDEN LAURELS */}
      {activeTab === "awards" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-xs sm:text-sm text-stone-900">
            <p className="font-semibold mb-1">Empat Piala Penghargaan Golden Laurels</p>
            <p className="text-stone-600 leading-relaxed">
              Anugerahkan 4 piala apresiasi kritikus film terbaik untuk kualitas jiwa sang bintang utama.
            </p>
          </div>

          <div className="space-y-4">
            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-amber-700 uppercase">Piala 1</p>
              <Field label="Kategori" id={`${idPrefix}-award1Category`}>
                <Input
                  id={`${idPrefix}-award1Category`}
                  placeholder="BEST HEART & COMPASSION"
                  {...register("award1Category")}
                />
              </Field>
              <Field label="Nama Penghargaan" id={`${idPrefix}-award1Title`}>
                <Input
                  id={`${idPrefix}-award1Title`}
                  placeholder="Piala Jiwa Paling Menginspirasi"
                  {...register("award1Title")}
                />
              </Field>
              <Field label="Ulasan Kritikus / Doa" id={`${idPrefix}-award1Praise`}>
                <Textarea
                  id={`${idPrefix}-award1Praise`}
                  rows={2}
                  placeholder="Dianugerahi atas kebaikan hati yang tiada henti..."
                  {...register("award1Praise")}
                />
              </Field>
            </div>

            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-amber-700 uppercase">Piala 2</p>
              <Field label="Kategori" id={`${idPrefix}-award2Category`}>
                <Input
                  id={`${idPrefix}-award2Category`}
                  placeholder="MOST RESILIENT CHARACTER"
                  {...register("award2Category")}
                />
              </Field>
              <Field label="Nama Penghargaan" id={`${idPrefix}-award2Title`}>
                <Input
                  id={`${idPrefix}-award2Title`}
                  placeholder="Piala Ketangguhan Melewati Badai"
                  {...register("award2Title")}
                />
              </Field>
              <Field label="Ulasan Kritikus / Doa" id={`${idPrefix}-award2Praise`}>
                <Textarea
                  id={`${idPrefix}-award2Praise`}
                  rows={2}
                  placeholder="Bahkan dalam badai plot twist terberat sekalipun..."
                  {...register("award2Praise")}
                />
              </Field>
            </div>

            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-amber-700 uppercase">Piala 3</p>
              <Field label="Kategori" id={`${idPrefix}-award3Category`}>
                <Input
                  id={`${idPrefix}-award3Category`}
                  placeholder="OUTSTANDING RADIANCE"
                  {...register("award3Category")}
                />
              </Field>
              <Field label="Nama Penghargaan" id={`${idPrefix}-award3Title`}>
                <Input
                  id={`${idPrefix}-award3Title`}
                  placeholder="Piala Senyuman Paling Menyinari"
                  {...register("award3Title")}
                />
              </Field>
              <Field label="Ulasan Kritikus / Doa" id={`${idPrefix}-award3Praise`}>
                <Textarea
                  id={`${idPrefix}-award3Praise`}
                  rows={2}
                  placeholder="Setiap senyumanmu mampu mengubah suasana..."
                  {...register("award3Praise")}
                />
              </Field>
            </div>

            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-amber-700 uppercase">Piala 4</p>
              <Field label="Kategori" id={`${idPrefix}-award4Category`}>
                <Input
                  id={`${idPrefix}-award4Category`}
                  placeholder="LIFETIME OF FORTUNE"
                  {...register("award4Category")}
                />
              </Field>
              <Field label="Nama Penghargaan" id={`${idPrefix}-award4Title`}>
                <Input
                  id={`${idPrefix}-award4Title`}
                  placeholder="Piala Kejayaan Babak Baru"
                  {...register("award4Title")}
                />
              </Field>
              <Field label="Ulasan Kritikus / Doa" id={`${idPrefix}-award4Praise`}>
                <Textarea
                  id={`${idPrefix}-award4Praise`}
                  rows={2}
                  placeholder="Kiranya episode berikutnya dipenuhi kesuksesan..."
                  {...register("award4Praise")}
                />
              </Field>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: TEMA WARNA & SOUNDTRACK FILM */}
      {activeTab === "theme" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-stone-100 border border-stone-300 rounded-xl p-4 text-xs sm:text-sm text-stone-900">
            <p className="font-semibold mb-1">Palet Warna Sinema & Soundtrack Musik</p>
            <p className="text-stone-600 leading-relaxed">
              Sesuaikan warna studio bioskop, aksen golden laurel, serta lagu orkestra film score pengiring premiere.
            </p>
          </div>

          <div className="p-4 border border-stone-200 rounded-xl space-y-4 bg-white">
            <p className="text-xs font-bold text-stone-800 uppercase tracking-wider">
              Film Score Soundtrack
            </p>
            <Field label="Judul Musik" id={`${idPrefix}-musicTitle`}>
              <Input
                id={`${idPrefix}-musicTitle`}
                placeholder="Cinematic Film Score & Acoustic Overture"
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
              Palet Warna Sinema
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ColorPickerField
                label="Warna Aksen Golden Laurel"
                value={(watch("accentColor") as string) || "#e5b869"}
                onChange={(color) =>
                  setValue("accentColor", color, { shouldDirty: true })
                }
              />
              <ColorPickerField
                label="Warna Studio Premiere"
                value={(watch("primaryColor") as string) || "#0d0d11"}
                onChange={(color) =>
                  setValue("primaryColor", color, { shouldDirty: true })
                }
              />
              <ColorPickerField
                label="Warna Latar Sinema"
                value={(watch("backgroundColor") as string) || "#08080a"}
                onChange={(color) =>
                  setValue("backgroundColor", color, { shouldDirty: true })
                }
                presets={BACKGROUND_COLOR_PRESETS}
              />
              <ColorPickerField
                label="Warna Kartu Naskah & Klise"
                value={(watch("cardColor") as string) || "#16171d"}
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
