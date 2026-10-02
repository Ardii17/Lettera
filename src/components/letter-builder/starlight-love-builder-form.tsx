"use client";

import { useState } from "react";
import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import {
  Sparkles,
  Scroll,
  Star,
  Flame,
  Palette,
  Image as ImageIcon,
  Check,
  ChevronRight,
  ChevronLeft,
  Lock,
  Award,
} from "lucide-react";
import { Field, Input, Textarea } from "@/components/ui/field";
import { ColorPickerField } from "@/components/ui/color-picker-field";
import { AudioUploadField } from "@/components/ui/audio-upload-field";
import {
  STARLIGHT_COLOR_PRESETS,
  CARD_COLOR_PRESETS,
  TEXT_COLOR_PRESETS,
} from "@/templates/color-presets";
import { cn } from "@/lib/utils/cn";
import type { LetterFormValues } from "./dynamic-form";

interface StarlightLoveBuilderFormProps {
  register: UseFormRegister<LetterFormValues>;
  setValue: UseFormSetValue<LetterFormValues>;
  watch: UseFormWatch<LetterFormValues>;
  errors: FieldErrors<LetterFormValues>;
  idPrefix?: string;
}

type TabType =
  | "constellation"
  | "letter"
  | "memories"
  | "stars"
  | "whisper"
  | "theme";

const PRESET_STARLIGHT_PHOTOS = [
  {
    name: "Lentera & Senyum Malam",
    url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1000&q=80",
    thumb: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Genggaman Bintang Romantis",
    url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1000&q=80",
    thumb: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Berdansa di Bawah Cahaya Senja",
    url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1000&q=80",
    thumb: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Kehangatan di Bawah Langit Malam",
    url: "https://images.unsplash.com/photo-1513279922550-250c2129b13a?auto=format&fit=crop&w=1000&q=80",
    thumb: "https://images.unsplash.com/photo-1513279922550-250c2129b13a?auto=format&fit=crop&w=200&q=60",
  },
];

const BRIGHT_BACKGROUND_PRESETS = [
  { label: "Warm Starlight Ivory", value: "#fdfbf7", description: "Ivory hangat mewah bergradasi lembut" },
  { label: "Pure Celestial Cream", value: "#fffdfa", description: "Krem lembut bersih & elegan" },
  { label: "Champagne Dawn", value: "#fef7ee", description: "Nuansa sampanye fajar keemasan" },
  { label: "Soft Pearl Amber", value: "#fffbeb", description: "Kuning mutiara lembut bercahaya" },
  { label: "Cloud White", value: "#ffffff", description: "Putih bersih minimalis modern" },
];

export function StarlightLoveBuilderForm({
  register,
  setValue,
  watch,
  errors,
  idPrefix = "starlight-love",
}: StarlightLoveBuilderFormProps) {
  const [activeTab, setActiveTab] = useState<TabType>("constellation");

  const tabs: Array<{ id: TabType; label: string; icon: typeof Sparkles }> = [
    { id: "constellation", label: "Penerima & Sertifikat", icon: Award },
    { id: "letter", label: "Surat Semesta", icon: Scroll },
    { id: "memories", label: "Galeri 4 Foto", icon: ImageIcon },
    { id: "stars", label: "5 Janji Semesta", icon: Star },
    { id: "whisper", label: "Bisikan & Lentera", icon: Flame },
    { id: "theme", label: "Warna Cerah & Musik", icon: Palette },
  ];

  const currentTabIndex = tabs.findIndex((t) => t.id === activeTab);
  const currentPhoto1 = watch("starlightPhotoUrl") as string;
  const currentPhoto2 = watch("secondPhotoUrl") as string;
  const currentPhoto3 = watch("photo3Url") as string;
  const currentPhoto4 = watch("photo4Url") as string;

  return (
    <div className="space-y-6">
      {/* Tab Navigation Bar */}
      <div className="flex overflow-x-auto no-scrollbar gap-1.5 p-1 bg-stone-100/90 rounded-2xl border border-stone-200">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex-1 justify-center",
                isActive
                  ? "bg-amber-500 text-white shadow-md border border-amber-600"
                  : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/60"
              )}
            >
              <Icon className={cn("w-4 h-4", isActive ? "text-white" : "text-amber-600")} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: PENERIMA & SERTIFIKAT BINTANG RESMI */}
      {/* ========================================================================= */}
      {activeTab === "constellation" && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 text-xs sm:text-sm text-stone-700">
            <p className="font-bold text-amber-900 mb-1">
              ✨ Sertifikat Dedikasi Bintang Resmi & Live Counter Waktu Cinta
            </p>
            <p className="text-stone-600 leading-relaxed">
              Daftarkan bintang abadi di langit semesta atas nama kekasihmu. Dilengkapi koordinat astronomis, tingkat magnitudo cahaya, nomor registrasi resmi, dan live counter waktu kebersamaan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Nama Kekasih (Penerima Surat)"
              htmlFor={`${idPrefix}-recipientName`}
              error={errors.recipientName?.message as string}
              required
            >
              <Input
                id={`${idPrefix}-recipientName`}
                placeholder="Clarissa Aurelia"
                {...register("recipientName")}
              />
            </Field>

            <Field
              label="Nama Kamu (Pengirim Surat)"
              htmlFor={`${idPrefix}-senderName`}
              error={errors.senderName?.message as string}
              required
            >
              <Input
                id={`${idPrefix}-senderName`}
                placeholder="Reyhan Danendra"
                {...register("senderName")}
              />
            </Field>
          </div>

          <Field
            label="Nama Rasi Bintang Kenangan"
            htmlFor={`${idPrefix}-constellationTitle`}
            error={errors.constellationTitle?.message as string}
            hint="Nama puitis untuk gugusan bintang momen cinta kalian."
          >
            <Input
              id={`${idPrefix}-constellationTitle`}
              placeholder="Constellation of Our First Spark ✨"
              {...register("constellationTitle")}
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Tanggal Pertemuan / Momen Spesial"
              htmlFor={`${idPrefix}-specialDate`}
              error={errors.specialDate?.message as string}
              hint="Teks tanggal yang tertulis di sertifikat bintang."
            >
              <Input
                id={`${idPrefix}-specialDate`}
                placeholder="14 Februari 2023"
                {...register("specialDate")}
              />
            </Field>

            <Field
              label="Tanggal Awal Kisah / Jadian (YYYY-MM-DD)"
              htmlFor={`${idPrefix}-anniversaryDate`}
              error={errors.anniversaryDate?.message as string}
              hint="Format: YYYY-MM-DD. Digunakan untuk menghitung detik, menit, dan hari bersama secara live."
            >
              <Input
                id={`${idPrefix}-anniversaryDate`}
                placeholder="2023-02-14"
                {...register("anniversaryDate")}
              />
            </Field>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-white p-4 sm:p-5 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
              Dokumen Registrasi Bintang Abadi
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="Nama Bintang yang Didedikasikan"
                htmlFor={`${idPrefix}-starName`}
                error={errors.starName?.message as string}
              >
                <Input
                  id={`${idPrefix}-starName`}
                  placeholder="Stella Clarissa Majoris ✨"
                  {...register("starName")}
                />
              </Field>

              <Field
                label="Koordinat Astronomis Bintang"
                htmlFor={`${idPrefix}-starCoordinate`}
                error={errors.starCoordinate?.message as string}
              >
                <Input
                  id={`${idPrefix}-starCoordinate`}
                  placeholder="RA 05h 35m • Dec -05° 23′ (Celestial Orion)"
                  {...register("starCoordinate")}
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="Tingkat Magnitudo Cahaya"
                htmlFor={`${idPrefix}-starMagnitude`}
                error={errors.starMagnitude?.message as string}
              >
                <Input
                  id={`${idPrefix}-starMagnitude`}
                  placeholder="Magnitude 1.0 (Bintang Terang Utama)"
                  {...register("starMagnitude")}
                />
              </Field>

              <Field
                label="Nomor Registrasi Kosmik"
                htmlFor={`${idPrefix}-starRegistryId`}
                error={errors.starRegistryId?.message as string}
              >
                <Input
                  id={`${idPrefix}-starRegistryId`}
                  placeholder="STAR-LOVE-2023-CLARISSA"
                  {...register("starRegistryId")}
                />
              </Field>
            </div>

            <Field
              label="Kutipan Janji pada Sertifikat Bintang"
              htmlFor={`${idPrefix}-starDedicationQuote`}
              error={errors.starDedicationQuote?.message as string}
            >
              <Input
                id={`${idPrefix}-starDedicationQuote`}
                placeholder="Didaftarkan abadi di hamparan galaksi, bersinar selamanya hanya untukmu."
                {...register("starDedicationQuote")}
              />
            </Field>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: SURAT SEMESTA */}
      {/* ========================================================================= */}
      {activeTab === "letter" && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 text-xs sm:text-sm text-stone-700">
            <p className="font-bold text-stone-900 mb-1">Warkah Hati di Bawah Langit Semesta</p>
            <p className="text-stone-600 leading-relaxed">
              Ungkapkan isi hatimu yang terdalam. Lembaran surat didesain dengan kertas mewah berpita keemasan yang nyaman dibaca dan sangat romantis.
            </p>
          </div>

          <Field
            label="Judul Surat Cinta"
            htmlFor={`${idPrefix}-title`}
            error={errors.title?.message as string}
            required
          >
            <Input
              id={`${idPrefix}-title`}
              placeholder="Di Antara Miliaran Bintang di Langit Semesta"
              {...register("title")}
            />
          </Field>

          <Field
            label="Kutipan Puitis Pembuka"
            htmlFor={`${idPrefix}-openingQuote`}
            error={errors.openingQuote?.message as string}
            hint="Kutipan pembuka puitis bertema bintang atau takdir semesta."
          >
            <Textarea
              id={`${idPrefix}-openingQuote`}
              rows={2}
              placeholder="Jika setiap bintang di langit adalah alasan mengapa aku mencintaimu, maka seluruh galaksi ini pun tak akan cukup..."
              {...register("openingQuote")}
            />
          </Field>

          <Field
            label="Isi Surat Cinta Lengkap"
            htmlFor={`${idPrefix}-message`}
            error={errors.message?.message as string}
            required
            hint="Pisahkan setiap paragraf dengan menekan Enter dua kali (baris kosong)."
          >
            <Textarea
              id={`${idPrefix}-message`}
              rows={11}
              placeholder="Tuliskan seluruh isi hatimu di sini..."
              {...register("message")}
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Kalimat Penutup"
              htmlFor={`${idPrefix}-closingWord`}
              error={errors.closingWord?.message as string}
            >
              <Input
                id={`${idPrefix}-closingWord`}
                placeholder="Mencintaimu hingga ke ujung galaksi terluar,"
                {...register("closingWord")}
              />
            </Field>

            <Field
              label="Tanda Tangan Pengirim"
              htmlFor={`${idPrefix}-signature`}
              error={errors.signature?.message as string}
            >
              <Input
                id={`${idPrefix}-signature`}
                placeholder="Reyhan Danendra"
                {...register("signature")}
              />
            </Field>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: GALERI 4 FOTO POLAROID */}
      {/* ========================================================================= */}
      {activeTab === "memories" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 text-xs sm:text-sm text-stone-700">
            <p className="font-bold text-amber-900 mb-1">Galeri 4 Foto Polaroid Berselotip Emas</p>
            <p className="text-stone-600 leading-relaxed">
              Pajang hingga 4 foto kenangan manis. Foto akan disajikan dengan gaya polaroid berselotip bintang emas lengkap dengan efek lightbox interaktif saat diklik.
            </p>
          </div>

          {/* Preset Foto Cepat */}
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Pilihan Cepat Foto Inspirasi Romantis:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {PRESET_STARLIGHT_PHOTOS.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setValue("starlightPhotoUrl", p.url, { shouldValidate: true, shouldDirty: true });
                  }}
                  className="relative aspect-square overflow-hidden rounded-xl border border-stone-200 hover:border-amber-400 transition-all text-left group"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.thumb} alt={p.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-stone-900/40 p-2 flex items-end">
                    <span className="text-[10px] font-medium text-white line-clamp-1">{p.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Form Foto 1 */}
          <div className="rounded-2xl border border-stone-200 bg-white p-4 space-y-3 shadow-2xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
              Foto Polaroid 1 (Portal Bintang Utama)
            </h4>
            <Field label="URL Foto 1" htmlFor={`${idPrefix}-starlightPhotoUrl`}>
              <Input
                id={`${idPrefix}-starlightPhotoUrl`}
                placeholder="https://images.unsplash.com/..."
                {...register("starlightPhotoUrl")}
              />
            </Field>
            <Field label="Keterangan Foto 1 (Caption)" htmlFor={`${idPrefix}-starlightPhotoCaption`}>
              <Input
                id={`${idPrefix}-starlightPhotoCaption`}
                placeholder="Pertama kali menatap gemintang bersama di atas bukit."
                {...register("starlightPhotoCaption")}
              />
            </Field>
          </div>

          {/* Form Foto 2 */}
          <div className="rounded-2xl border border-stone-200 bg-white p-4 space-y-3 shadow-2xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
              Foto Polaroid 2 (Nebula Kasih)
            </h4>
            <Field label="URL Foto 2" htmlFor={`${idPrefix}-secondPhotoUrl`}>
              <Input
                id={`${idPrefix}-secondPhotoUrl`}
                placeholder="https://images.unsplash.com/..."
                {...register("secondPhotoUrl")}
              />
            </Field>
            <Field label="Keterangan Foto 2 (Caption)" htmlFor={`${idPrefix}-secondPhotoCaption`}>
              <Input
                id={`${idPrefix}-secondPhotoCaption`}
                placeholder="Genggaman jemari yang selalu menghangatkan dinginnya malam."
                {...register("secondPhotoCaption")}
              />
            </Field>
          </div>

          {/* Form Foto 3 */}
          <div className="rounded-2xl border border-stone-200 bg-white p-4 space-y-3 shadow-2xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
              Foto Polaroid 3 (Senja Keemasan)
            </h4>
            <Field label="URL Foto 3" htmlFor={`${idPrefix}-photo3Url`}>
              <Input
                id={`${idPrefix}-photo3Url`}
                placeholder="https://images.unsplash.com/..."
                {...register("photo3Url")}
              />
            </Field>
            <Field label="Keterangan Foto 3 (Caption)" htmlFor={`${idPrefix}-photo3Caption`}>
              <Input
                id={`${idPrefix}-photo3Caption`}
                placeholder="Tawa renyahmu di bawah cahaya senja keemasan."
                {...register("photo3Caption")}
              />
            </Field>
          </div>

          {/* Form Foto 4 */}
          <div className="rounded-2xl border border-stone-200 bg-white p-4 space-y-3 shadow-2xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900">
              Foto Polaroid 4 (Galaksi Berdua)
            </h4>
            <Field label="URL Foto 4" htmlFor={`${idPrefix}-photo4Url`}>
              <Input
                id={`${idPrefix}-photo4Url`}
                placeholder="https://images.unsplash.com/..."
                {...register("photo4Url")}
              />
            </Field>
            <Field label="Keterangan Foto 4 (Caption)" htmlFor={`${idPrefix}-photo4Caption`}>
              <Input
                id={`${idPrefix}-photo4Caption`}
                placeholder="Saat dunia di luar sana terasa sunyi dan hanya ada kita berdua."
                {...register("photo4Caption")}
              />
            </Field>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: 5 JANJI SEMESTA & RASI BINTANG */}
      {/* ========================================================================= */}
      {activeTab === "stars" && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 text-xs sm:text-sm text-stone-700">
            <p className="font-bold text-amber-900 mb-1">5 Janji Semesta Abadi (Peta Rasi Interaktif)</p>
            <p className="text-stone-600 leading-relaxed">
              Tuliskan kisah rasi bintang kenangan dan 5 pilar janji suci yang akan bersinar abadi di langit masa depan kalian berdua.
            </p>
          </div>

          <Field
            label="Kisah di Balik Rasi Bintang Kenangan"
            htmlFor={`${idPrefix}-constellationStory`}
            error={errors.constellationStory?.message as string}
            hint="Narasi puitis pengantar peta rasi bintang kenangan."
          >
            <Textarea
              id={`${idPrefix}-constellationStory`}
              rows={2}
              placeholder="Rasi bintang ini tercipta dari jalinan kenangan manis kita: tatap mata pertama, tawa bersama..."
              {...register("constellationStory")}
            />
          </Field>

          <div className="space-y-4 pt-2">
            <Field
              label="Bintang 1 • Janji Kedamaian"
              htmlFor={`${idPrefix}-star1`}
              error={errors.star1?.message as string}
            >
              <Input
                id={`${idPrefix}-star1`}
                placeholder="Bintang Kedamaian: Selalu menjadi pelabuhan paling tenang dan aman saat harimu lelah."
                {...register("star1")}
              />
            </Field>

            <Field
              label="Bintang 2 • Janji Ketulusan"
              htmlFor={`${idPrefix}-star2`}
              error={errors.star2?.message as string}
            >
              <Input
                id={`${idPrefix}-star2`}
                placeholder="Bintang Ketulusan: Menjagamu dengan kejujuran, kehangatan, dan kesetiaan yang tak luntur."
                {...register("star2")}
              />
            </Field>

            <Field
              label="Bintang 3 • Janji Kehangatan"
              htmlFor={`${idPrefix}-star3`}
              error={errors.star3?.message as string}
            >
              <Input
                id={`${idPrefix}-star3`}
                placeholder="Bintang Kehangatan: Menjadi selimut di kala dingin dan pelukan paling tulus di setiap senja."
                {...register("star3")}
              />
            </Field>

            <Field
              label="Bintang 4 • Janji Senyuman"
              htmlFor={`${idPrefix}-star4`}
              error={errors.star4?.message as string}
            >
              <Input
                id={`${idPrefix}-star4`}
                placeholder="Bintang Tawa: Mengukir senyuman di wajahmu bahkan di saat hari-hari terasa berat."
                {...register("star4")}
              />
            </Field>

            <Field
              label="Bintang 5 • Janji Keabadian"
              htmlFor={`${idPrefix}-star5`}
              error={errors.star5?.message as string}
            >
              <Input
                id={`${idPrefix}-star5`}
                placeholder="Bintang Keabadian: Terus menggenggam jemarimu dan menatap langit masa depan bersama."
                {...register("star5")}
              />
            </Field>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: BISIKAN RAHASIA & LENTERA */}
      {/* ========================================================================= */}
      {activeTab === "whisper" && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 text-xs sm:text-sm text-stone-700">
            <p className="font-bold text-amber-900 mb-1">Bisikan Bintang Rahasia & Lentera Harapan</p>
            <p className="text-stone-600 leading-relaxed">
              Bisikan rahasia akan terkunci dan baru terbuka ketika pasanganmu mengklik tombol interaktif. Lentera harapan melambangkan doa hangat yang terus membakar cinta kalian.
            </p>
          </div>

          <Field
            label="Bisikan Bintang Rahasia Tersembunyi (Hidden Whisper)"
            htmlFor={`${idPrefix}-secretStarlightWhisper`}
            error={errors.secretStarlightWhisper?.message as string}
            hint="Pesan emosional tersembunyi yang terkunci dengan gembok interaktif."
          >
            <Textarea
              id={`${idPrefix}-secretStarlightWhisper`}
              rows={4}
              placeholder="Dari triliunan kemungkinan di semesta ini, tidak ada satu detik pun yang kusesali saat memilihmu..."
              {...register("secretStarlightWhisper")}
            />
          </Field>

          <div className="pt-2 border-t border-stone-200 space-y-4">
            <Field
              label="Judul Lentera Harapan"
              htmlFor={`${idPrefix}-lanternTitle`}
              error={errors.lanternTitle?.message as string}
            >
              <Input
                id={`${idPrefix}-lanternTitle`}
                placeholder="Lentera Harapan yang Tak Pernah Padam 🏮"
                {...register("lanternTitle")}
              />
            </Field>

            <Field
              label="Isi Doa pada Lentera"
              htmlFor={`${idPrefix}-lanternMessage`}
              error={errors.lanternMessage?.message as string}
            >
              <Textarea
                id={`${idPrefix}-lanternMessage`}
                rows={3}
                placeholder="Lentera ini membawa doa dan rasa syukurku atas hadirnya dirimu..."
                {...register("lanternMessage")}
              />
            </Field>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: WARNA CERAH MEWAH & MUSIK */}
      {/* ========================================================================= */}
      {activeTab === "theme" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-amber-50/80 border border-amber-200/80 rounded-2xl p-4 text-xs sm:text-sm text-stone-700">
            <p className="font-bold text-amber-900 mb-1">Palet Cerah Menawan & Audio Malam</p>
            <p className="text-stone-600 leading-relaxed">
              Tema Celestial Starlight Romance kini menggunakan latar cerah berkelas (Warm Ethereal Luxury) dengan aksen emas bintang yang mewah.
            </p>
          </div>

          {/* Pengaturan Warna - Masing-masing dalam Box Terpisah */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
              <Field label="Warna Aksen Bintang & Lentera (Primary)" htmlFor={`${idPrefix}-primaryColor`}>
                <ColorPickerField
                  value={(watch("primaryColor") as string) || "#d97706"}
                  onChange={(hex) =>
                    setValue("primaryColor", hex, { shouldValidate: true, shouldDirty: true })
                  }
                  presets={STARLIGHT_COLOR_PRESETS}
                  helperText="Warna ornamen bintang berkilau, tombol buka surat, dan aksen emas sertifikat."
                />
              </Field>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
              <Field label="Warna Latar Belakang (Tema Cerah)" htmlFor={`${idPrefix}-backgroundColor`}>
                <ColorPickerField
                  value={(watch("backgroundColor") as string) || "#fdfbf7"}
                  onChange={(hex) =>
                    setValue("backgroundColor", hex, { shouldValidate: true, shouldDirty: true })
                  }
                  presets={BRIGHT_BACKGROUND_PRESETS}
                  helperText="Warna kanvas cerah yang bersih, hangat, dan sangat nyaman dipandang."
                />
              </Field>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
              <Field label="Warna Wadah Kartu & Kertas Surat" htmlFor={`${idPrefix}-cardColor`}>
                <ColorPickerField
                  value={(watch("cardColor") as string) || "#ffffff"}
                  onChange={(hex) =>
                    setValue("cardColor", hex, { shouldValidate: true, shouldDirty: true })
                  }
                  presets={CARD_COLOR_PRESETS}
                  helperText="Warna dasar sertifikat resmi, kotak pembuka mengapung, dan kartu surat cinta."
                />
              </Field>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
              <Field label="Warna Teks Judul Utama" htmlFor={`${idPrefix}-textColor`}>
                <ColorPickerField
                  value={(watch("textColor") as string) || "#1c1917"}
                  onChange={(hex) =>
                    setValue("textColor", hex, { shouldValidate: true, shouldDirty: true })
                  }
                  presets={TEXT_COLOR_PRESETS}
                  helperText="Warna judul surat dan nama pasangan (kontras tinggi, tegas & jelas)."
                />
              </Field>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
              <Field label="Warna Isi Paragraf Surat" htmlFor={`${idPrefix}-bodyTextColor`}>
                <ColorPickerField
                  value={(watch("bodyTextColor") as string) || "#44403c"}
                  onChange={(hex) =>
                    setValue("bodyTextColor", hex, { shouldValidate: true, shouldDirty: true })
                  }
                  presets={TEXT_COLOR_PRESETS}
                  helperText="Warna isi paragraf surat cinta."
                />
              </Field>
            </div>
          </div>

          {/* Musik Romantis */}
          <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Audio Melodi Romantis (Opsional)
            </h4>

            <Field
              label="Judul Musik Pengiring"
              htmlFor={`${idPrefix}-musicTitle`}
              error={errors.musicTitle?.message as string}
            >
              <Input
                id={`${idPrefix}-musicTitle`}
                placeholder="Starlight Lofi Piano & Music Box"
                {...register("musicTitle")}
              />
            </Field>

            <AudioUploadField
              id={`${idPrefix}-bgMusicUrl`}
              label="Unggah File Audio Musik (.mp3, .wav, .m4a)"
              value={(watch("bgMusicUrl") as string) || ""}
              onChange={(url) =>
                setValue("bgMusicUrl", url, { shouldValidate: true, shouldDirty: true })
              }
              helperText="Pilih file lagu romantis dari perangkat Anda. Kosongkan jika tanpa musik."
            />
          </div>
        </div>
      )}

      {/* Navigasi Antar Tab */}
      <div className="flex items-center justify-between pt-4 border-t border-stone-200">
        {currentTabIndex > 0 ? (
          <button
            type="button"
            onClick={() => setActiveTab(tabs[currentTabIndex - 1].id)}
            className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-stone-600 hover:text-stone-900 px-3.5 py-2 rounded-xl border border-stone-300 hover:bg-stone-100 transition-colors"
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
            className="flex items-center gap-1 text-xs sm:text-sm font-bold text-white bg-amber-500 hover:bg-amber-600 px-5 py-2 rounded-xl transition-all shadow-md ml-auto"
          >
            Lanjut: {tabs[currentTabIndex + 1].label}
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
