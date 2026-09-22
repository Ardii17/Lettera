"use client";

import { useState } from "react";
import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import {
  Radio,
  Scroll,
  Music,
  Sparkles,
  Palette,
  Image as ImageIcon,
  Check,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Field, Input, Textarea } from "@/components/ui/field";
import { ColorPickerField } from "@/components/ui/color-picker-field";
import {
  MIXTAPE_COLOR_PRESETS,
  BACKGROUND_COLOR_PRESETS,
  CARD_COLOR_PRESETS,
  TEXT_COLOR_PRESETS,
} from "@/templates/color-presets";
import { cn } from "@/lib/utils/cn";
import type { LetterFormValues } from "./dynamic-form";

interface LoveMixtapeBuilderFormProps {
  register: UseFormRegister<LetterFormValues>;
  setValue: UseFormSetValue<LetterFormValues>;
  watch: UseFormWatch<LetterFormValues>;
  errors: FieldErrors<LetterFormValues>;
  idPrefix?: string;
}

type TabType = "cassette" | "letter" | "memories" | "tracks" | "note" | "theme";

const PRESET_MIXTAPE_PHOTOS = [
  {
    name: "Tawa & Headphone Nostalgia",
    url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1000&q=80",
    thumb: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Genggaman Manis di Perjalanan",
    url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1000&q=80",
    thumb: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Mendengarkan Musik Berdua",
    url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1000&q=80",
    thumb: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Senja Merona Penuh Kenangan",
    url: "https://images.unsplash.com/photo-1513279922550-250c2129b13a?auto=format&fit=crop&w=1000&q=80",
    thumb: "https://images.unsplash.com/photo-1513279922550-250c2129b13a?auto=format&fit=crop&w=200&q=60",
  },
];

export function LoveMixtapeBuilderForm({
  register,
  setValue,
  watch,
  errors,
  idPrefix = "love-mixtape",
}: LoveMixtapeBuilderFormProps) {
  const [activeTab, setActiveTab] = useState<TabType>("cassette");

  const tabs: Array<{ id: TabType; label: string; icon: typeof Radio }> = [
    { id: "cassette", label: "Kaset & Label", icon: Radio },
    { id: "letter", label: "Surat Sleeve", icon: Scroll },
    { id: "memories", label: "Foto & Lirik", icon: ImageIcon },
    { id: "tracks", label: "Tracklist Lagu", icon: Music },
    { id: "note", label: "Memo Kaset", icon: Sparkles },
    { id: "theme", label: "Warna & Audio", icon: Palette },
  ];

  const currentTabIndex = tabs.findIndex((t) => t.id === activeTab);
  const currentAlbumCover = watch("albumCoverPhotoUrl") as string;
  const currentSleevePhoto = watch("sleeveMemoryPhotoUrl") as string;

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex overflow-x-auto no-scrollbar gap-1.5 p-1 bg-stone-100/80 rounded-xl border border-stone-200">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex-1 justify-center",
                isActive
                  ? "bg-stone-900 text-rose-300 shadow-sm border border-stone-800"
                  : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/50",
              )}
            >
              <Icon className={cn("w-4 h-4", isActive ? "text-rose-400" : "text-stone-400")} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: KASET & LABEL */}
      {activeTab === "cassette" && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          <div className="bg-rose-50/80 border border-rose-200 rounded-xl p-4 text-xs sm:text-sm text-rose-950">
            <p className="font-medium mb-1">Kaset Pita Mixtape Retro</p>
            <p className="text-rose-900/80 leading-relaxed">
              Atur tampilan stiker label kaset: nama pasangan, judul mixtape kenangan, dan tahun rilis spesial kalian.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Nama Kekasih (Penerima)"
              htmlFor={`${idPrefix}-recipientName`}
              error={errors.recipientName?.message as string}
              required
            >
              <Input
                id={`${idPrefix}-recipientName`}
                placeholder="Contoh: Nadia Safitri"
                {...register("recipientName")}
              />
            </Field>

            <Field
              label="Nama Kamu (Pengirim)"
              htmlFor={`${idPrefix}-senderName`}
              error={errors.senderName?.message as string}
              required
            >
              <Input
                id={`${idPrefix}-senderName`}
                placeholder="Contoh: Dimas Anggara"
                {...register("senderName")}
              />
            </Field>
          </div>

          <Field
            label="Judul Mixtape di Label Kaset"
            htmlFor={`${idPrefix}-tapeTitle`}
            error={errors.tapeTitle?.message as string}
            hint="Judul yang tertulis pada stiker putih kaset."
          >
            <Input
              id={`${idPrefix}-tapeTitle`}
              placeholder="Contoh: Songs That Feel Like You • Vol. 1"
              {...register("tapeTitle")}
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Tahun / Edisi Kaset"
              htmlFor={`${idPrefix}-releaseYear`}
              error={errors.releaseYear?.message as string}
            >
              <Input
                id={`${idPrefix}-releaseYear`}
                placeholder="Contoh: Est. 2022 • Special Edition"
                {...register("releaseYear")}
              />
            </Field>

            <Field
              label="Label Sisi Kaset"
              htmlFor={`${idPrefix}-sideLabel`}
              error={errors.sideLabel?.message as string}
            >
              <Input
                id={`${idPrefix}-sideLabel`}
                placeholder="Contoh: SIDE A • FOR YOUR EARS ONLY"
                {...register("sideLabel")}
              />
            </Field>
          </div>

          <Field
            label="Total Durasi Mixtape"
            htmlFor={`${idPrefix}-totalDuration`}
            error={errors.totalDuration?.message as string}
            hint="Contoh: Side A: 24 Menit • 3 Lagu Penuh Cinta."
          >
            <Input
              id={`${idPrefix}-totalDuration`}
              placeholder="Contoh: Side A: 24 Menit • 3 Lagu Penuh Cinta"
              {...register("totalDuration")}
            />
          </Field>

          {/* Foto Sampul Album Mixtape */}
          <div className="space-y-3 rounded-xl border border-stone-200 bg-white p-4">
            <h4 className="text-sm font-semibold text-stone-800">
              Foto Sampul Album Kaset (Mixtape Artwork)
            </h4>
            <p className="text-xs text-stone-500">
              Foto romantis berdua yang akan dipasang sebagai artwork sampul di sebelah judul kaset pita.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              {PRESET_MIXTAPE_PHOTOS.map((p) => {
                const isSelected = currentAlbumCover === p.url;
                return (
                  <button
                    key={`cover-${p.name}`}
                    type="button"
                    onClick={() =>
                      setValue("albumCoverPhotoUrl", p.url, {
                        shouldValidate: true,
                        shouldDirty: true,
                      })
                    }
                    className={cn(
                      "relative aspect-square overflow-hidden rounded-xl border-2 transition-all text-left",
                      isSelected
                        ? "border-rose-500 ring-2 ring-rose-300"
                        : "border-stone-200 hover:border-stone-300",
                    )}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.thumb} alt={p.name} className="h-full w-full object-cover" />
                    {isSelected && (
                      <span className="absolute top-1 right-1 rounded-full bg-rose-500 p-0.5 text-white">
                        <Check className="h-3 w-3" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <Field
              label="Tautan Foto Sampul Kaset (URL)"
              htmlFor={`${idPrefix}-albumCoverPhotoUrl`}
              error={errors.albumCoverPhotoUrl?.message as string}
            >
              <Input
                id={`${idPrefix}-albumCoverPhotoUrl`}
                placeholder="https://images.unsplash.com/..."
                {...register("albumCoverPhotoUrl")}
              />
            </Field>
          </div>
        </div>
      )}

      {/* TAB 2: SURAT SLEEVE KASET */}
      {activeTab === "letter" && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs sm:text-sm text-stone-700">
            <p className="font-medium text-stone-900 mb-1">Lembaran Surat Di Dalam Sleeve Kaset</p>
            <p className="text-stone-600 leading-relaxed">
              Tuliskan pesan cinta mendalam yang tersimpan rapi di dalam lipatan sleeve kaset (J-Card).
            </p>
          </div>

          <Field
            label="Judul Surat di Sleeve"
            htmlFor={`${idPrefix}-title`}
            error={errors.title?.message as string}
            required
          >
            <Input
              id={`${idPrefix}-title`}
              placeholder="Contoh: Catatan Dari Balik Pita Magnetik"
              {...register("title")}
            />
          </Field>

          <Field
            label="Pengantar Surat"
            htmlFor={`${idPrefix}-introMessage`}
            error={errors.introMessage?.message as string}
            hint="Sapaan manis sebelum isi pesan utama."
          >
            <Input
              id={`${idPrefix}-introMessage`}
              placeholder="Contoh: Untuk seseorang yang melodi tawanya selalu memenuhi kepalaku,"
              {...register("introMessage")}
            />
          </Field>

          <Field
            label="Isi Surat Cinta"
            htmlFor={`${idPrefix}-message`}
            error={errors.message?.message as string}
            required
            hint="Pisahkan setiap paragraf dengan baris kosong agar format lipatan rapi."
          >
            <Textarea
              id={`${idPrefix}-message`}
              rows={10}
              placeholder="Tuliskan surat cintamu di sini..."
              {...register("message")}
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Kalimat Penutup"
              htmlFor={`${idPrefix}-closingStatement`}
              error={errors.closingStatement?.message as string}
            >
              <Input
                id={`${idPrefix}-closingStatement`}
                placeholder="Contoh: Selalu memutar kenangan tentangmu,"
                {...register("closingStatement")}
              />
            </Field>

            <Field
              label="Tanda Tangan"
              htmlFor={`${idPrefix}-signature`}
              error={errors.signature?.message as string}
            >
              <Input
                id={`${idPrefix}-signature`}
                placeholder="Contoh: Dimas Anggara"
                {...register("signature")}
              />
            </Field>
          </div>
        </div>
      )}

      {/* TAB 3: FOTO & LIRIK FAVORIT */}
      {activeTab === "memories" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-rose-50/80 border border-rose-200 rounded-xl p-4 text-xs sm:text-sm text-rose-950">
            <p className="font-medium mb-1">Foto Polaroid di Lipatan Sleeve Kaset</p>
            <p className="text-rose-900/80 leading-relaxed">
              Sertakan foto cetak polaroid yang diselipkan dengan selotip di lipatan sleeve kaset, serta kutipan lirik lagu cinta favorit yang paling berkesan untuk kalian.
            </p>
          </div>

          {/* Foto Polaroid Sleeve */}
          <div className="space-y-4 rounded-xl border border-stone-200 bg-white p-4">
            <h4 className="text-sm font-semibold text-stone-800">
              Foto Kenangan Polaroid di Sleeve
            </h4>
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-600">
                Pilihan Cepat Foto:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PRESET_MIXTAPE_PHOTOS.map((p) => {
                  const isSelected = currentSleevePhoto === p.url;
                  return (
                    <button
                      key={`sleeve-${p.name}`}
                      type="button"
                      onClick={() =>
                        setValue("sleeveMemoryPhotoUrl", p.url, {
                          shouldValidate: true,
                          shouldDirty: true,
                        })
                      }
                      className={cn(
                        "relative aspect-square overflow-hidden rounded-xl border-2 transition-all text-left",
                        isSelected
                          ? "border-rose-500 ring-2 ring-rose-300"
                          : "border-stone-200 hover:border-stone-300",
                      )}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.thumb} alt={p.name} className="h-full w-full object-cover" />
                      {isSelected && (
                        <span className="absolute top-1 right-1 rounded-full bg-rose-500 p-0.5 text-white">
                          <Check className="h-3 w-3" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <Field
              label="Tautan Foto Polaroid (URL)"
              htmlFor={`${idPrefix}-sleeveMemoryPhotoUrl`}
              error={errors.sleeveMemoryPhotoUrl?.message as string}
              hint="Tempel tautan gambar dari Unsplash atau Cloudinary."
            >
              <Input
                id={`${idPrefix}-sleeveMemoryPhotoUrl`}
                placeholder="https://images.unsplash.com/..."
                {...register("sleeveMemoryPhotoUrl")}
              />
            </Field>

            <Field
              label="Keterangan Foto Polaroid (Caption)"
              htmlFor={`${idPrefix}-sleevePhotoCaption`}
              error={errors.sleevePhotoCaption?.message as string}
            >
              <Input
                id={`${idPrefix}-sleevePhotoCaption`}
                placeholder="Contoh: Tawa kita di sore itu, terselip selamanya di antara pita kenangan."
                {...register("sleevePhotoCaption")}
              />
            </Field>
          </div>

          {/* Kutipan Lirik Lagu Favorit */}
          <Field
            label="Kutipan Lirik Lagu Favorit Bersama"
            htmlFor={`${idPrefix}-favoriteLyric`}
            error={errors.favoriteLyric?.message as string}
            hint="Lirik lagu yang paling menggambarkan perasaanmu padanya."
          >
            <Input
              id={`${idPrefix}-favoriteLyric`}
              placeholder="Contoh: Kau adalah melodi yang tak pernah bosan kuputar berulang kali di kepalaku."
              {...register("favoriteLyric")}
            />
          </Field>
        </div>
      )}

      {/* TAB 4: TRACKLIST LAGU KENANGAN */}
      {activeTab === "tracks" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 text-xs sm:text-sm text-amber-950">
            <p className="font-medium mb-1">Daftar Lagu Kenangan Berdua</p>
            <p className="text-amber-900/80 leading-relaxed">
              Tuliskan lagu-lagu spesial yang mewakili perjalanan cinta kalian beserta kisah atau kenangan manis di balik lagu tersebut.
            </p>
          </div>

          <Field
            label="Judul Seksi Tracklist"
            htmlFor={`${idPrefix}-tracklistTitle`}
            error={errors.tracklistTitle?.message as string}
          >
            <Input
              id={`${idPrefix}-tracklistTitle`}
              placeholder="Daftar Lagu di Balik Kisah Kita"
              {...register("tracklistTitle")}
            />
          </Field>

          {/* Track 1 */}
          <div className="rounded-xl border border-stone-200 bg-stone-50/60 p-4 space-y-3">
            <Field
              label="Lagu 1: Judul Lagu & Artis"
              htmlFor={`${idPrefix}-track1Title`}
              error={errors.track1Title?.message as string}
            >
              <Input
                id={`${idPrefix}-track1Title`}
                placeholder="Contoh: Track 01: Reality Club — Anything You Want"
                {...register("track1Title")}
              />
            </Field>
            <Field
              label="Cerita & Kenangan di Balik Lagu 1"
              htmlFor={`${idPrefix}-track1Meaning`}
              error={errors.track1Meaning?.message as string}
            >
              <Input
                id={`${idPrefix}-track1Meaning`}
                placeholder="Lagu yang kita dengarkan berdua saat pertama kali terjebak hujan bersama..."
                {...register("track1Meaning")}
              />
            </Field>
          </div>

          {/* Track 2 */}
          <div className="rounded-xl border border-stone-200 bg-stone-50/60 p-4 space-y-3">
            <Field
              label="Lagu 2: Judul Lagu & Artis"
              htmlFor={`${idPrefix}-track2Title`}
              error={errors.track2Title?.message as string}
            >
              <Input
                id={`${idPrefix}-track2Title`}
                placeholder="Contoh: Track 02: Sheila On 7 — Anugerah Terindah..."
                {...register("track2Title")}
              />
            </Field>
            <Field
              label="Cerita & Kenangan di Balik Lagu 2"
              htmlFor={`${idPrefix}-track2Meaning`}
              error={errors.track2Meaning?.message as string}
            >
              <Input
                id={`${idPrefix}-track2Meaning`}
                placeholder="Lirik yang selalu mengingatkanku betapa bersyukurnya aku bisa memilikimu..."
                {...register("track2Meaning")}
              />
            </Field>
          </div>

          {/* Track 3 */}
          <div className="rounded-xl border border-stone-200 bg-stone-50/60 p-4 space-y-3">
            <Field
              label="Lagu 3: Judul Lagu & Artis"
              htmlFor={`${idPrefix}-track3Title`}
              error={errors.track3Title?.message as string}
            >
              <Input
                id={`${idPrefix}-track3Title`}
                placeholder="Contoh: Track 03: Danilla — Senja di Ambang Pilu"
                {...register("track3Title")}
              />
            </Field>
            <Field
              label="Cerita & Kenangan di Balik Lagu 3"
              htmlFor={`${idPrefix}-track3Meaning`}
              error={errors.track3Meaning?.message as string}
            >
              <Input
                id={`${idPrefix}-track3Meaning`}
                placeholder="Melodi tenang saat kita menikmati senja di kedai kopi..."
                {...register("track3Meaning")}
              />
            </Field>
          </div>
        </div>
      )}

      {/* TAB 4: MEMO KASET */}
      {activeTab === "note" && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 text-xs sm:text-sm text-amber-950">
            <p className="font-medium mb-1">Memo Tulisan Tangan Belakang Kaset</p>
            <p className="text-amber-900/80 leading-relaxed">
              Tuliskan catatan P.S. manis atau pesan rahasia yang ditempel di belakang bodi kaset.
            </p>
          </div>

          <Field
            label="Memo Tulisan Tangan"
            htmlFor={`${idPrefix}-handwrittenNote`}
            error={errors.handwrittenNote?.message as string}
            hint="Pesan manis tulisan tangan bergaya catatan memo retro."
          >
            <Textarea
              id={`${idPrefix}-handwrittenNote`}
              rows={4}
              placeholder="P.S. Jika kaset ini kusut, putar rodanya dengan bolpoin. Tapi cintaku padamu takkan pernah kusut selamanya :)"
              {...register("handwrittenNote")}
            />
          </Field>
        </div>
      )}

      {/* TAB 5: WARNA & AUDIO */}
      {activeTab === "theme" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs sm:text-sm text-stone-700">
            <p className="font-medium text-stone-900 mb-1">Palet Kaset Retro & Audio Pita</p>
            <p className="text-stone-600 leading-relaxed">
              Sesuaikan warna bodi plastik kaset analog dan lagu MP3 yang diputar oleh kaset ini.
            </p>
          </div>

          {/* Pengaturan Warna - Setiap Bagian Memiliki Box Tersendiri Secara Vertikal */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
              <Field label="Warna Bodi Kaset Pita" htmlFor={`${idPrefix}-primaryColor`}>
                <ColorPickerField
                  value={(watch("primaryColor") as string) || "#e15b64"}
                  onChange={(hex) =>
                    setValue("primaryColor", hex, { shouldValidate: true, shouldDirty: true })
                  }
                  presets={MIXTAPE_COLOR_PRESETS}
                  helperText="Warna bodi plastik kaset retro."
                />
              </Field>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
              <Field label="Warna Latar Belakang Halaman" htmlFor={`${idPrefix}-backgroundColor`}>
                <ColorPickerField
                  value={(watch("backgroundColor") as string) || "#fbf8f3"}
                  onChange={(hex) =>
                    setValue("backgroundColor", hex, { shouldValidate: true, shouldDirty: true })
                  }
                  presets={BACKGROUND_COLOR_PRESETS}
                  helperText="Warna kanvas di luar kaset."
                />
              </Field>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
              <Field label="Warna Lembar Sleeve Kaset" htmlFor={`${idPrefix}-cardColor`}>
                <ColorPickerField
                  value={(watch("cardColor") as string) || "#ffffff"}
                  onChange={(hex) =>
                    setValue("cardColor", hex, { shouldValidate: true, shouldDirty: true })
                  }
                  presets={CARD_COLOR_PRESETS}
                  helperText="Warna kertas lipatan sleeve kaset."
                />
              </Field>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
              <Field label="Warna Teks Judul" htmlFor={`${idPrefix}-textColor`}>
                <ColorPickerField
                  value={(watch("textColor") as string) || "#27272a"}
                  onChange={(hex) =>
                    setValue("textColor", hex, { shouldValidate: true, shouldDirty: true })
                  }
                  presets={TEXT_COLOR_PRESETS}
                  helperText="Warna judul surat dan nama di label kaset."
                />
              </Field>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
              <Field label="Warna Teks Isi Paragraf" htmlFor={`${idPrefix}-bodyTextColor`}>
                <ColorPickerField
                  value={(watch("bodyTextColor") as string) || "#4b5563"}
                  onChange={(hex) =>
                    setValue("bodyTextColor", hex, { shouldValidate: true, shouldDirty: true })
                  }
                  presets={TEXT_COLOR_PRESETS}
                  helperText="Warna teks isi paragraf surat."
                />
              </Field>
            </div>
          </div>

          {/* Audio Kaset dalam Box Tersendiri */}
          <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Audio Musik yang Diputar Kaset
            </h4>

            <Field
              label="Judul Musik Kaset"
              htmlFor={`${idPrefix}-musicTitle`}
              error={errors.musicTitle?.message as string}
            >
              <Input
                id={`${idPrefix}-musicTitle`}
                placeholder="Anything You Want (Acoustic Tape)"
                {...register("musicTitle")}
              />
            </Field>

            <Field
              label="Tautan File Audio (.mp3)"
              htmlFor={`${idPrefix}-bgMusicUrl`}
              error={errors.bgMusicUrl?.message as string}
              hint="Tautan langsung ke file audio mp3 yang akan diputar oleh kaset ini."
            >
              <Input
                id={`${idPrefix}-bgMusicUrl`}
                placeholder="https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3"
                {...register("bgMusicUrl")}
              />
            </Field>
          </div>
        </div>
      )}

      {/* Navigasi Antar Tab */}
      <div className="flex items-center justify-between pt-4 border-t border-stone-200">
        {currentTabIndex > 0 ? (
          <button
            type="button"
            onClick={() => setActiveTab(tabs[currentTabIndex - 1].id)}
            className="flex items-center gap-1 text-xs sm:text-sm font-medium text-stone-600 hover:text-stone-900 px-3 py-1.5 rounded-lg border border-stone-300 hover:bg-stone-100 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Sebelumnya: {tabs[currentTabIndex - 1].label}
          </button>
        ) : (
          <div />
        )}

        {currentTabIndex < tabs.length - 1 && (
          <button
            type="button"
            onClick={() => setActiveTab(tabs[currentTabIndex + 1].id)}
            className="flex items-center gap-1 text-xs sm:text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 px-4 py-1.5 rounded-lg transition-colors shadow-sm ml-auto"
          >
            Lanjut: {tabs[currentTabIndex + 1].label}
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
