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
} from "lucide-react";
import { Field, Input, Textarea } from "@/components/ui/field";
import { ColorPickerField } from "@/components/ui/color-picker-field";
import {
  STARLIGHT_COLOR_PRESETS,
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

type TabType = "constellation" | "letter" | "memories" | "stars" | "lantern" | "theme";

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
    name: "Berdansa di Bawah Cahaya Kota",
    url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1000&q=80",
    thumb: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Kehangatan di Bawah Langit Malam",
    url: "https://images.unsplash.com/photo-1513279922550-250c2129b13a?auto=format&fit=crop&w=1000&q=80",
    thumb: "https://images.unsplash.com/photo-1513279922550-250c2129b13a?auto=format&fit=crop&w=200&q=60",
  },
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
    { id: "constellation", label: "Penerima & Konstelasi", icon: Sparkles },
    { id: "letter", label: "Surat Semesta", icon: Scroll },
    { id: "memories", label: "Portal Foto Bintang", icon: ImageIcon },
    { id: "stars", label: "3 Bintang Harapan", icon: Star },
    { id: "lantern", label: "Lentera Cahaya", icon: Flame },
    { id: "theme", label: "Warna & Musik", icon: Palette },
  ];

  const currentTabIndex = tabs.findIndex((t) => t.id === activeTab);
  const currentPhoto1 = watch("starlightPhotoUrl") as string;
  const currentPhoto2 = watch("secondPhotoUrl") as string;

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
                  ? "bg-slate-900 text-amber-300 shadow-sm border border-slate-800"
                  : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/50",
              )}
            >
              <Icon className={cn("w-4 h-4", isActive ? "text-amber-400" : "text-stone-400")} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: PENERIMA & KONSTELASI */}
      {activeTab === "constellation" && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs sm:text-sm text-slate-200">
            <p className="font-medium text-amber-300 mb-1">Gugusan Bintang Kenangan Berdua</p>
            <p className="text-slate-400 leading-relaxed">
              Tentukan nama pasangan, judul rasi bintang cinta kalian, serta tanggal atau koordinat simbolik pertemuan yang ingin diabadikan di langit semesta.
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
                placeholder="Contoh: Clarissa Aurelia"
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
                placeholder="Contoh: Reyhan Danendra"
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
              placeholder="Contoh: Constellation of Our First Spark ✨"
              {...register("constellationTitle")}
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Tanggal Pertemuan / Kenangan"
              htmlFor={`${idPrefix}-specialDate`}
              error={errors.specialDate?.message as string}
            >
              <Input
                id={`${idPrefix}-specialDate`}
                placeholder="Contoh: 14 Februari 2023"
                {...register("specialDate")}
              />
            </Field>

            <Field
              label="Koordinat Simbolik"
              htmlFor={`${idPrefix}-starCoordinate`}
              error={errors.starCoordinate?.message as string}
              hint="Koordinat rasi bintang atau lokasi kota."
            >
              <Input
                id={`${idPrefix}-starCoordinate`}
                placeholder="Contoh: RA 05h 35m • Dec -05° 23′ (Celestial Orion)"
                {...register("starCoordinate")}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Nama Bintang Simbolik Khusus"
              htmlFor={`${idPrefix}-starName`}
              error={errors.starName?.message as string}
              hint="Nama bintang yang kamu dedikasikan untuk pasangan."
            >
              <Input
                id={`${idPrefix}-starName`}
                placeholder="Contoh: Stella Clarissa Majoris ✨"
                {...register("starName")}
              />
            </Field>

            <Field
              label="Momen / Tanggal Perayaan Langit"
              htmlFor={`${idPrefix}-anniversaryDate`}
              error={errors.anniversaryDate?.message as string}
              hint="Tanggal jadian atau momen spesial."
            >
              <Input
                id={`${idPrefix}-anniversaryDate`}
                placeholder="Contoh: 14 Februari 2023 • Malam Langit Sejajar"
                {...register("anniversaryDate")}
              />
            </Field>
          </div>
        </div>
      )}

      {/* TAB 2: SURAT SEMESTA */}
      {activeTab === "letter" && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs sm:text-sm text-stone-700">
            <p className="font-medium text-stone-900 mb-1">Surat Cinta Kaca Temaram</p>
            <p className="text-stone-600 leading-relaxed">
              Ungkapkan perasaan cintamu di bawah keheningan malam. Tipografi emas yang hangat di atas latar kaca temaram akan memberikan sentuhan yang intim dan mewah.
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
              placeholder="Contoh: Di Antara Miliaran Bintang di Langit Semesta"
              {...register("title")}
            />
          </Field>

          <Field
            label="Kutipan Puitis Pembuka"
            htmlFor={`${idPrefix}-openingQuote`}
            error={errors.openingQuote?.message as string}
            hint="Kutipan romantis bertema bintang atau semesta."
          >
            <Textarea
              id={`${idPrefix}-openingQuote`}
              rows={2}
              placeholder="Jika setiap bintang di langit malam adalah alasan mengapa aku mencintaimu, maka seluruh galaksi ini pun tak akan cukup..."
              {...register("openingQuote")}
            />
          </Field>

          <Field
            label="Isi Surat Cinta"
            htmlFor={`${idPrefix}-message`}
            error={errors.message?.message as string}
            required
            hint="Pisahkan setiap paragraf dengan baris kosong untuk kerapian tampilan."
          >
            <Textarea
              id={`${idPrefix}-message`}
              rows={10}
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
                placeholder="Contoh: Mencintaimu hingga ke ujung galaksi terluar,"
                {...register("closingWord")}
              />
            </Field>

            <Field
              label="Tanda Tangan"
              htmlFor={`${idPrefix}-signature`}
              error={errors.signature?.message as string}
            >
              <Input
                id={`${idPrefix}-signature`}
                placeholder="Contoh: Reyhan Danendra"
                {...register("signature")}
              />
            </Field>
          </div>
        </div>
      )}

      {/* TAB 3: PORTAL FOTO BINTANG */}
      {activeTab === "memories" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs sm:text-sm text-slate-200">
            <p className="font-medium text-amber-300 mb-1">Portal Foto Kenangan Kosmik</p>
            <p className="text-slate-400 leading-relaxed">
              Pajang hingga dua foto kenangan romantis berdua yang akan ditampilkan dengan bingkai portal bintang ber-aura cahaya emas di dalam surat kaca temaram.
            </p>
          </div>

          {/* FOTO 1 */}
          <div className="space-y-4 rounded-xl border border-stone-200 bg-white p-4">
            <h4 className="text-sm font-semibold text-stone-800">Foto Utama (Portal Bintang)</h4>
            {/* Pilihan Foto Cepat */}
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-600">
                Pilihan Cepat Foto 1:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PRESET_STARLIGHT_PHOTOS.map((p) => {
                  const isSelected = currentPhoto1 === p.url;
                  return (
                    <button
                      key={`star1-${p.name}`}
                      type="button"
                      onClick={() =>
                        setValue("starlightPhotoUrl", p.url, {
                          shouldValidate: true,
                          shouldDirty: true,
                        })
                      }
                      className={cn(
                        "relative aspect-square overflow-hidden rounded-xl border-2 transition-all text-left",
                        isSelected
                          ? "border-amber-500 ring-2 ring-amber-300"
                          : "border-stone-200 hover:border-stone-300",
                      )}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.thumb} alt={p.name} className="h-full w-full object-cover" />
                      {isSelected && (
                        <span className="absolute top-1 right-1 rounded-full bg-amber-500 p-0.5 text-slate-950">
                          <Check className="h-3 w-3" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <Field
              label="Tautan Foto 1 (URL)"
              htmlFor={`${idPrefix}-starlightPhotoUrl`}
              error={errors.starlightPhotoUrl?.message as string}
              hint="Tempel tautan gambar dari Unsplash atau Cloudinary."
            >
              <Input
                id={`${idPrefix}-starlightPhotoUrl`}
                placeholder="https://images.unsplash.com/..."
                {...register("starlightPhotoUrl")}
              />
            </Field>

            <Field
              label="Keterangan Foto 1 (Caption)"
              htmlFor={`${idPrefix}-starlightPhotoCaption`}
              error={errors.starlightPhotoCaption?.message as string}
            >
              <Input
                id={`${idPrefix}-starlightPhotoCaption`}
                placeholder="Contoh: Malam pertama kita menatap gemintang bersama di atas bukit."
                {...register("starlightPhotoCaption")}
              />
            </Field>
          </div>

          {/* FOTO 2 */}
          <div className="space-y-4 rounded-xl border border-stone-200 bg-white p-4">
            <h4 className="text-sm font-semibold text-stone-800">Foto Kedua (Nebula Kasih - Opsional)</h4>
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-600">
                Pilihan Cepat Foto 2:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PRESET_STARLIGHT_PHOTOS.map((p) => {
                  const isSelected = currentPhoto2 === p.url;
                  return (
                    <button
                      key={`star2-${p.name}`}
                      type="button"
                      onClick={() =>
                        setValue("secondPhotoUrl", p.url, {
                          shouldValidate: true,
                          shouldDirty: true,
                        })
                      }
                      className={cn(
                        "relative aspect-square overflow-hidden rounded-xl border-2 transition-all text-left",
                        isSelected
                          ? "border-amber-500 ring-2 ring-amber-300"
                          : "border-stone-200 hover:border-stone-300",
                      )}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.thumb} alt={p.name} className="h-full w-full object-cover" />
                      {isSelected && (
                        <span className="absolute top-1 right-1 rounded-full bg-amber-500 p-0.5 text-slate-950">
                          <Check className="h-3 w-3" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <Field
              label="Tautan Foto 2 (URL)"
              htmlFor={`${idPrefix}-secondPhotoUrl`}
              error={errors.secondPhotoUrl?.message as string}
            >
              <Input
                id={`${idPrefix}-secondPhotoUrl`}
                placeholder="https://images.unsplash.com/..."
                {...register("secondPhotoUrl")}
              />
            </Field>

            <Field
              label="Keterangan Foto 2 (Caption)"
              htmlFor={`${idPrefix}-secondPhotoCaption`}
              error={errors.secondPhotoCaption?.message as string}
            >
              <Input
                id={`${idPrefix}-secondPhotoCaption`}
                placeholder="Contoh: Genggaman jemari yang selalu menghangatkan dinginnya malam."
                {...register("secondPhotoCaption")}
              />
            </Field>
          </div>
        </div>
      )}

      {/* TAB 4: TIGA BINTANG HARAPAN */}
      {activeTab === "stars" && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 text-xs sm:text-sm text-amber-950">
            <p className="font-medium mb-1">Tiga Ikrar Cinta di Bawah Langit Malam</p>
            <p className="text-amber-900/80 leading-relaxed">
              Tuliskan 3 harapan dan janji setia yang ingin kamu jaga bersama pasanganmu di masa depan.
            </p>
          </div>

          <Field
            label="Judul Seksi Harapan"
            htmlFor={`${idPrefix}-wishesTitle`}
            error={errors.wishesTitle?.message as string}
          >
            <Input
              id={`${idPrefix}-wishesTitle`}
              placeholder="Tiga Bintang Harapan di Bawah Langit Malam"
              {...register("wishesTitle")}
            />
          </Field>

          <Field
            label="Bintang 1 (Harapan Pertama)"
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
            label="Bintang 2 (Harapan Kedua)"
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
            label="Bintang 3 (Harapan Ketiga)"
            htmlFor={`${idPrefix}-star3`}
            error={errors.star3?.message as string}
          >
            <Input
              id={`${idPrefix}-star3`}
              placeholder="Bintang Keabadian: Terus menggenggam jemarimu dan menatap langit masa depan bersama-sama."
              {...register("star3")}
            />
          </Field>
        </div>
      )}

      {/* TAB 4: LENTERA CAHAYA */}
      {activeTab === "lantern" && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-xs sm:text-sm text-slate-200">
            <p className="font-medium text-amber-300 mb-1">Kartu Lentera Cinta Bercahaya</p>
            <p className="text-slate-400 leading-relaxed">
              Sertakan sebuah pesan doa atau lentera harapan yang melambangkan hangatnya rasa cinta yang tak pernah padam.
            </p>
          </div>

          <Field
            label="Judul Kartu Lentera"
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
            label="Isi Pesan Lentera"
            htmlFor={`${idPrefix}-lanternMessage`}
            error={errors.lanternMessage?.message as string}
            hint="Pesan manis yang bersinar di bagian bawah surat cinta."
          >
            <Textarea
              id={`${idPrefix}-lanternMessage`}
              rows={4}
              placeholder="Lentera ini membawa doa dan rasa syukurku atas hadirnya dirimu..."
              {...register("lanternMessage")}
            />
          </Field>
        </div>
      )}

      {/* TAB 5: WARNA & MUSIK MALAM */}
      {activeTab === "theme" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs sm:text-sm text-stone-700">
            <p className="font-medium text-stone-900 mb-1">Kilau Kosmik & Melodi Malam</p>
            <p className="text-stone-600 leading-relaxed">
              Sesuaikan warna kilauan bintang dan audio instrumen malam yang menenangkan.
            </p>
          </div>

          {/* Pengaturan Warna - Setiap Bagian Memiliki Box Tersendiri Secara Vertikal */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
              <Field label="Warna Aksen Bintang & Lentera" htmlFor={`${idPrefix}-primaryColor`}>
                <ColorPickerField
                  value={(watch("primaryColor") as string) || "#f5c542"}
                  onChange={(hex) =>
                    setValue("primaryColor", hex, { shouldValidate: true, shouldDirty: true })
                  }
                  presets={STARLIGHT_COLOR_PRESETS}
                  helperText="Warna ornamen bintang berkilau, tombol lentera, dan ikon konstelasi."
                />
              </Field>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
              <Field label="Warna Langit Malam (Latar)" htmlFor={`${idPrefix}-backgroundColor`}>
                <ColorPickerField
                  value={(watch("backgroundColor") as string) || "#0b0f19"}
                  onChange={(hex) =>
                    setValue("backgroundColor", hex, { shouldValidate: true, shouldDirty: true })
                  }
                  presets={[
                    { label: "Deep Midnight Navy", value: "#0b0f19", description: "Biru dongker pekat malam kosmik" },
                    { label: "Obsidian Black", value: "#09090b", description: "Hitam obsidian pekat luar angkasa" },
                    { label: "Dark Indigo", value: "#0f172a", description: "Indigo malam berbintang" },
                    { label: "Velvet Nebula", value: "#1e112a", description: "Ungu tua nebula misterius" },
                    { label: "Abyssal Slate", value: "#0f141c", description: "Abu-abu laut malam gelap" },
                  ]}
                  helperText="Warna dasar kanvas malam."
                />
              </Field>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
              <Field label="Warna Wadah Kaca Temaram" htmlFor={`${idPrefix}-cardColor`}>
                <ColorPickerField
                  value={(watch("cardColor") as string) || "#131b2e"}
                  onChange={(hex) =>
                    setValue("cardColor", hex, { shouldValidate: true, shouldDirty: true })
                  }
                  presets={[
                    { label: "Midnight Glass", value: "#131b2e", description: "Kaca navy malam elegan" },
                    { label: "Obsidian Card", value: "#18181b", description: "Kaca gelap arang pekat" },
                    { label: "Nebula Glass", value: "#231535", description: "Kaca ungu velvet temaram" },
                  ]}
                  helperText="Warna kartu surat kaca (dark glassmorphism)."
                />
              </Field>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
              <Field label="Warna Teks Judul Emas" htmlFor={`${idPrefix}-textColor`}>
                <ColorPickerField
                  value={(watch("textColor") as string) || "#fef3c7"}
                  onChange={(hex) =>
                    setValue("textColor", hex, { shouldValidate: true, shouldDirty: true })
                  }
                  presets={TEXT_COLOR_PRESETS}
                  helperText="Warna judul surat dan nama penerima."
                />
              </Field>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
              <Field label="Warna Isi Paragraf" htmlFor={`${idPrefix}-bodyTextColor`}>
                <ColorPickerField
                  value={(watch("bodyTextColor") as string) || "#cbd5e1"}
                  onChange={(hex) =>
                    setValue("bodyTextColor", hex, { shouldValidate: true, shouldDirty: true })
                  }
                  presets={TEXT_COLOR_PRESETS}
                  helperText="Warna teks paragraf surat."
                />
              </Field>
            </div>
          </div>

          {/* Audio Pengiring dalam Box Tersendiri */}
          <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Audio Melodi Malam Romantis
            </h4>

            <Field
              label="Judul Musik Malam"
              htmlFor={`${idPrefix}-musicTitle`}
              error={errors.musicTitle?.message as string}
            >
              <Input
                id={`${idPrefix}-musicTitle`}
                placeholder="Starlight Lofi Piano & Music Box"
                {...register("musicTitle")}
              />
            </Field>

            <Field
              label="Tautan File Audio (.mp3)"
              htmlFor={`${idPrefix}-bgMusicUrl`}
              error={errors.bgMusicUrl?.message as string}
              hint="Tautan langsung ke file audio mp3 malam yang menenangkan (misal dari Pixabay)."
            >
              <Input
                id={`${idPrefix}-bgMusicUrl`}
                placeholder="https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f792cb.mp3"
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
            className="flex items-center gap-1 text-xs sm:text-sm font-medium text-slate-950 bg-amber-400 hover:bg-amber-300 px-4 py-1.5 rounded-lg transition-colors shadow-sm ml-auto font-semibold"
          >
            Lanjut: {tabs[currentTabIndex + 1].label}
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
