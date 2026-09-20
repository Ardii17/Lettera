"use client";

import { useState } from "react";
import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import {
  PartyPopper,
  Flame,
  Image as ImageIcon,
  Sparkles,
  Mail,
  Palette,
  Check,
  ChevronRight,
  ChevronLeft,
  Cake,
} from "lucide-react";
import { Field, Input, Textarea } from "@/components/ui/field";
import { ImageUploadField } from "@/components/ui/image-upload-field";
import { ColorPickerField } from "@/components/ui/color-picker-field";
import {
  BIRTHDAY_COLOR_PRESETS,
  BACKGROUND_COLOR_PRESETS,
  CARD_COLOR_PRESETS,
  TEXT_COLOR_PRESETS,
} from "@/templates/color-presets";
import { cn } from "@/lib/utils/cn";
import type { LetterFormValues } from "./dynamic-form";

interface BirthdayBuilderFormProps {
  register: UseFormRegister<LetterFormValues>;
  setValue: UseFormSetValue<LetterFormValues>;
  watch: UseFormWatch<LetterFormValues>;
  errors: FieldErrors<LetterFormValues>;
  idPrefix?: string;
}

const PRESET_PHOTOS = [
  {
    name: "Potret Senyum Bahagia",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
    thumb: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Pesta Konfeti Meriah",
    url: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Lilin Kue Ulang Tahun",
    url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Tawa Hangat Bersama Sahabat",
    url: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Balon Emas & Kado Pesta",
    url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Momen Ceria & Sparkler",
    url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Cangkir Kopi & Bunga",
    url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Malam Selebrasi Penuh Doa",
    url: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=200&q=60",
  },
];

const TABS = [
  { id: "hero", label: "Yang Ultah & Cover", icon: PartyPopper },
  { id: "cake", label: "Kue & Tiup Lilin", icon: Flame },
  { id: "gallery", label: "Galeri Kenangan", icon: ImageIcon },
  { id: "story", label: "Babak Usia & Doa", icon: Sparkles },
  { id: "letter", label: "Surat Ucapan", icon: Mail },
  { id: "theme", label: "Desain & Musik", icon: Palette },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function BirthdayBuilderForm({
  register,
  setValue,
  watch,
  errors,
  idPrefix = "birthday",
}: BirthdayBuilderFormProps) {
  const [activeTab, setActiveTab] = useState<TabId>("hero");

  const heroImage = watch("heroImage");
  const currentTabIdx = TABS.findIndex((t) => t.id === activeTab);

  const goToNextTab = () => {
    if (currentTabIdx < TABS.length - 1) {
      setActiveTab(TABS[currentTabIdx + 1].id);
    }
  };

  const goToPrevTab = () => {
    if (currentTabIdx > 0) {
      setActiveTab(TABS[currentTabIdx - 1].id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Category Tabs */}
      <div className="flex overflow-x-auto no-scrollbar scrollbar-none sm:flex-wrap gap-1.5 rounded-2xl border border-amber-200/70 bg-[#fffbeb] p-1.5 shadow-xs max-w-full">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex shrink-0 items-center gap-1.5 sm:gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition-all sm:text-sm whitespace-nowrap",
                isActive
                  ? "bg-white text-amber-900 shadow-sm border border-amber-300"
                  : "text-amber-800/75 hover:text-amber-950 hover:bg-white/60",
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 shrink-0",
                  isActive ? "text-amber-600" : "text-amber-400",
                )}
              />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ================= TAB 1: YANG ULTAH & COVER ================= */}
      {activeTab === "hero" && (
        <div className="space-y-5 animate-in fade-in duration-300">
          <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
            <h3 className="font-display font-semibold text-amber-900 flex items-center gap-2">
              <PartyPopper className="h-4 w-4 text-amber-600" />
              Identitas yang Berulang Tahun & Cover Pembuka
            </h3>
            <p className="mt-1 text-xs text-amber-700">
              Informasi penerima, usia yang dirayakan, dan pesan sambutan di puncak website.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Nama yang Berulang Tahun"
              htmlFor={`${idPrefix}-recipientName`}
              error={errors.recipientName?.message as string}
              required
            >
              <Input
                id={`${idPrefix}-recipientName`}
                placeholder="Dinda Anandita"
                maxLength={60}
                {...register("recipientName")}
              />
            </Field>

            <Field
              label="Nama Pengirim / Dari"
              htmlFor={`${idPrefix}-senderName`}
              error={errors.senderName?.message as string}
              required
            >
              <Input
                id={`${idPrefix}-senderName`}
                placeholder="Geng Kosan & Sahabat"
                maxLength={60}
                {...register("senderName")}
              />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Usia yang Dirayakan"
              htmlFor={`${idPrefix}-age`}
              error={errors.age?.message as string}
              hint="Angka usia dirayakan dengan badge kilau emas"
              required
            >
              <Input
                type="number"
                id={`${idPrefix}-age`}
                placeholder="24"
                min={1}
                max={120}
                {...register("age", { valueAsNumber: true })}
              />
            </Field>

            <Field
              label="Sapaan Pembuka"
              htmlFor={`${idPrefix}-greeting`}
              hint="Misal: Selamat Ulang Tahun Ke-24! 🎉"
              required
            >
              <Input
                id={`${idPrefix}-greeting`}
                placeholder="Selamat Ulang Tahun Ke-24! 🎉"
                maxLength={80}
                {...register("greeting")}
              />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Badge Perayaan Atas"
              htmlFor={`${idPrefix}-heroBadge`}
              hint="Teks kecil di atas judul utama"
            >
              <Input
                id={`${idPrefix}-heroBadge`}
                placeholder="✨ Official Birthday Tribute for Our Favorite Human"
                maxLength={80}
                {...register("heroBadge")}
              />
            </Field>

            <Field
              label="Tanggal Lahir / Hari H"
              htmlFor={`${idPrefix}-birthDate`}
              hint="Opsional: untuk menghitung total hari-hari berharga"
            >
              <Input
                type="date"
                id={`${idPrefix}-birthDate`}
                {...register("birthDate")}
              />
            </Field>
          </div>

          <Field
            label="Judul Utama Perayaan"
            htmlFor={`${idPrefix}-title`}
            error={errors.title?.message as string}
            required
          >
            <Input
              id={`${idPrefix}-title`}
              placeholder="Merayakan Hari Bahagia Dinda"
              maxLength={100}
              {...register("title")}
            />
          </Field>

          <Field
            label="Tagline / Sambutan Hangat Pembuka"
            htmlFor={`${idPrefix}-tagline`}
            hint="Kalimat menyentuh pembuka hati saat pertama kali membuka website"
          >
            <Textarea
              id={`${idPrefix}-tagline`}
              placeholder="Terima kasih telah lahir ke dunia, membawa tawa yang menular, dan selalu menyinari hari-hari orang di sekitarmu."
              rows={3}
              maxLength={300}
              {...register("tagline")}
            />
          </Field>

          {/* Hero Portrait Photo */}
          <div className="space-y-4 rounded-2xl border border-line bg-page p-4 overflow-hidden">
            <ImageUploadField
              label="Foto Potret Utama yang Berulang Tahun"
              value={typeof heroImage === "string" ? heroImage : ""}
              onChange={(url) => setValue("heroImage", url, { shouldDirty: true })}
              helperText="Pilih foto terbaik dari galeri perangkat (otomatis dikompresi cerdas & disimpan aman)"
            />

            {/* Presets for Hero Photo */}
            <div className="pt-1">
              <p className="text-xs font-semibold text-ink-soft mb-2">
                Atau pilih dari koleksi foto perayaan pilihan:
              </p>
              <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                {PRESET_PHOTOS.slice(0, 4).map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() =>
                      setValue("heroImage", preset.url, { shouldDirty: true })
                    }
                    className={cn(
                      "group relative aspect-4/3 overflow-hidden rounded-lg border text-left transition-all hover:ring-2 hover:ring-amber-500",
                      heroImage === preset.url
                        ? "ring-2 ring-amber-600"
                        : "border-line",
                    )}
                  >
                    <img
                      src={preset.thumb}
                      alt={preset.name}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                    />
                    {heroImage === preset.url && (
                      <span className="absolute right-1 top-1 rounded-full bg-amber-600 p-0.5 text-white">
                        <Check className="h-3 w-3" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: KUE & TIUP LILIN ================= */}
      {activeTab === "cake" && (
        <div className="space-y-5 animate-in fade-in duration-300">
          <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
            <h3 className="font-display font-semibold text-amber-900 flex items-center gap-2">
              <Cake className="h-4 w-4 text-amber-600" />
              Kue Ulang Tahun & Fitur Interaktif Tiup Lilin
            </h3>
            <p className="mt-1 text-xs text-amber-700">
              Penerima dapat menekan tombol untuk meniup lilin kue ulang tahun di layar, memicu ledakan konfeti dan membuka pesan kejutan rahasia!
            </p>
          </div>

          <Field
            label="Judul Bagian Kue Ulang Tahun"
            htmlFor={`${idPrefix}-cakeTitle`}
            hint="Misal: Kue Impian & Ritual Tiup Lilin"
          >
            <Input
              id={`${idPrefix}-cakeTitle`}
              placeholder="Kue Impian & Ritual Tiup Lilin"
              maxLength={80}
              {...register("cakeTitle")}
            />
          </Field>

          <Field
            label="Instruksi / Ajakan Membuat Permohonan"
            htmlFor={`${idPrefix}-cakeWishPrompt`}
            hint="Teks ajakan yang terlihat sebelum lilin ditiup"
          >
            <Input
              id={`${idPrefix}-cakeWishPrompt`}
              placeholder="Tutup matamu sejenak, buat satu permohonan tulus di hati, lalu tiup lilinnya!"
              maxLength={120}
              {...register("cakeWishPrompt")}
            />
          </Field>

          <Field
            label="Pesan Kejutan Rahasia (Muncul Sesaat Setelah Lilin Ditiup)"
            htmlFor={`${idPrefix}-secretWishMessage`}
            hint="Kotak hadiah kejutan akan terbuka dengan animasi konfeti dan menampilkan pesan ini"
          >
            <Textarea
              id={`${idPrefix}-secretWishMessage`}
              rows={4}
              maxLength={350}
              placeholder="Semoga di usia baru ini setiap impian besarmu didekatkan, langkahmu dimudahkan, dan kebahagiaan selalu memelukmu tanpa henti! 🎂✨"
              {...register("secretWishMessage")}
            />
          </Field>
        </div>
      )}

      {/* ================= TAB 3: GALERI KENANGAN ================= */}
      {activeTab === "gallery" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
            <h3 className="font-display font-semibold text-amber-900 flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-amber-600" />
              Galeri Foto Kenangan Polaroid (Maks. 6 Foto)
            </h3>
            <p className="mt-1 text-xs text-amber-700">
              Foto ditampilkan dengan bingkai polaroid estetik, label tahun/lokasi, dan dapat diklik untuk diperbesar (lightbox viewer).
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Judul Galeri" htmlFor={`${idPrefix}-galleryTitle`}>
              <Input
                id={`${idPrefix}-galleryTitle`}
                placeholder="Galeri Senyuman & Tawa Bersama"
                maxLength={80}
                {...register("galleryTitle")}
              />
            </Field>

            <Field label="Subjudul Galeri" htmlFor={`${idPrefix}-gallerySubtitle`}>
              <Input
                id={`${idPrefix}-gallerySubtitle`}
                placeholder="Kumpulan detik-detik berharga yang membuktikan betapa indahnya perjalananmu."
                maxLength={160}
                {...register("gallerySubtitle")}
              />
            </Field>
          </div>

          {/* Preset Photo Grid Picker */}
          <div className="rounded-xl border border-line bg-page p-4">
            <p className="text-xs font-semibold text-ink-soft mb-2">
              Pilihan Cepat: Klik salah satu preset untuk mengisi slot galeri kosong:
            </p>
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2 sm:grid-cols-8">
              {PRESET_PHOTOS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  title={`Gunakan: ${preset.name}`}
                  onClick={() => {
                    for (let slot = 1; slot <= 6; slot++) {
                      const cur = watch(`galleryImg${slot}` as keyof LetterFormValues);
                      if (!cur) {
                        setValue(`galleryImg${slot}` as keyof LetterFormValues, preset.url, { shouldDirty: true });
                        return;
                      }
                    }
                    setValue("galleryImg1", preset.url, { shouldDirty: true });
                  }}
                  className="group aspect-square overflow-hidden rounded-lg border border-line hover:ring-2 hover:ring-amber-500 transition-all"
                >
                  <img
                    src={preset.thumb}
                    alt={preset.name}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* 6 Photo slots */}
          <div className="space-y-5">
            {[1, 2, 3, 4, 5, 6].map((idx) => {
              const currentImg = watch(`galleryImg${idx}` as keyof LetterFormValues);
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-amber-200/80 bg-white p-4 shadow-xs transition-all hover:border-amber-400 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-amber-800 font-bold">
                        {idx}
                      </span>
                      Foto Kenangan #{idx}
                    </span>
                    {typeof currentImg === "string" && currentImg.trim() ? (
                      <button
                        type="button"
                        onClick={() => {
                          setValue(`galleryImg${idx}` as keyof LetterFormValues, "", { shouldDirty: true });
                          setValue(`galleryCaption${idx}` as keyof LetterFormValues, "", { shouldDirty: true });
                          setValue(`galleryDate${idx}` as keyof LetterFormValues, "", { shouldDirty: true });
                        }}
                        className="text-xs text-rose-500 hover:underline font-medium"
                      >
                        Hapus Slot Ini
                      </button>
                    ) : null}
                  </div>

                  <ImageUploadField
                    value={typeof currentImg === "string" ? currentImg : ""}
                    onChange={(url) => {
                      setValue(`galleryImg${idx}` as keyof LetterFormValues, url, { shouldDirty: true });
                    }}
                    helperText="Pilih foto langsung dari galeri HP/laptop (otomatis dikompresi tanpa mengurangi kejernihan)"
                  />

                  <div className="grid gap-3 sm:grid-cols-[1fr_130px] pt-1">
                    <Input
                      placeholder="Caption foto (misal: Pesta kejutan penuh tawa)"
                      maxLength={100}
                      {...register(`galleryCaption${idx}` as keyof LetterFormValues)}
                    />
                    <Input
                      placeholder="Tahun / Lokasi"
                      maxLength={50}
                      {...register(`galleryDate${idx}` as keyof LetterFormValues)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= TAB 4: BABAK USIA & DOA ================= */}
      {activeTab === "story" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
            <h3 className="font-display font-semibold text-amber-900 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-600" />
              Linimasa Jejak Usia & 4 Doa Terbaik
            </h3>
            <p className="mt-1 text-xs text-amber-700">
              Ceritakan babak membanggakan dalam hidupnya dan titipkan 4 doa terindah untuk masa depannya.
            </p>
          </div>

          <Field label="Judul Linimasa Babak Usia" htmlFor={`${idPrefix}-milestoneTitle`}>
            <Input
              id={`${idPrefix}-milestoneTitle`}
              placeholder="Jejak Langkah & Kisah Berhargamu"
              maxLength={80}
              {...register("milestoneTitle")}
            />
          </Field>

          {/* 3 Milestones */}
          {[1, 2, 3].map((num) => (
            <div key={num} className="rounded-2xl border border-line bg-paper p-4 sm:p-5 space-y-3">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-white">
                  {num}
                </span>
                <h4 className="font-display font-semibold text-ink">
                  Babak Berharga #{num}
                </h4>
              </div>

              <div className="grid gap-3 sm:grid-cols-[110px_1fr]">
                <Input
                  placeholder="Tahun (2023)"
                  maxLength={30}
                  {...register(`milestone${num}Year` as keyof LetterFormValues)}
                />
                <Input
                  placeholder="Judul babak (misal: Awal Petualangan Baru)"
                  maxLength={80}
                  {...register(`milestone${num}Title` as keyof LetterFormValues)}
                />
              </div>

              <Textarea
                placeholder="Cerita singkat pencapaian atau kenangan berkesan..."
                rows={2}
                maxLength={300}
                {...register(`milestone${num}Desc` as keyof LetterFormValues)}
              />
            </div>
          ))}

          {/* 4 Wishes Section */}
          <div className="mt-8 space-y-4">
            <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
              <h3 className="font-display font-semibold text-amber-900">
                Empat Doa & Harapan Terindah
              </h3>
              <p className="mt-1 text-xs text-amber-700">
                Poin doa menyentuh yang ditampilkan dalam kartu-kartu harapan elegan.
              </p>
            </div>

            <Field label="Judul Bagian Doa" htmlFor={`${idPrefix}-wishesTitle`}>
              <Input
                id={`${idPrefix}-wishesTitle`}
                placeholder="Empat Doa Tulus Untukmu di Usia Baru"
                maxLength={80}
                {...register("wishesTitle")}
              />
            </Field>

            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                placeholder="Doa 1: Kesehatan jiwa, raga, dan tidur nyenyak..."
                maxLength={160}
                {...register("wish1")}
              />
              <Input
                placeholder="Doa 2: Kemudahan langkah karier, karya, dan studi..."
                maxLength={160}
                {...register("wish2")}
              />
              <Input
                placeholder="Doa 3: Hati yang dipenuhi damai dan rasa syukur..."
                maxLength={160}
                {...register("wish3")}
              />
              <Input
                placeholder="Doa 4: Terwujudnya impian terbesar tahun ini..."
                maxLength={160}
                {...register("wish4")}
              />
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 5: SURAT UCAPAN ================= */}
      {activeTab === "letter" && (
        <div className="space-y-5 animate-in fade-in duration-300">
          <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
            <h3 className="font-display font-semibold text-amber-900 flex items-center gap-2">
              <Mail className="h-4 w-4 text-amber-600" />
              Surat Ucapan Ulang Tahun Bermakna
            </h3>
            <p className="mt-1 text-xs text-amber-700">
              Surat personal yang disajikan dengan kehangatan kertas surat selebrasi dan pita kado.
            </p>
          </div>

          <Field
            label="Kutipan Doa / Harapan Pembuka"
            htmlFor={`${idPrefix}-quote`}
            hint="Kutipan yang ditampilkan mencolok di atas surat"
          >
            <Input
              id={`${idPrefix}-quote`}
              placeholder="Semoga tahun ini menjadi tahun yang paling ramah, penuh berkah, dan sebaik tawamu."
              maxLength={160}
              {...register("quote")}
            />
          </Field>

          <Field
            label="Isi Surat Ucapan Lengkap"
            htmlFor={`${idPrefix}-message`}
            error={errors.message?.message as string}
            hint="Pisahkan paragraf dengan baris kosong untuk tata letak yang rapi dan elegan."
            required
          >
            <Textarea
              id={`${idPrefix}-message`}
              rows={12}
              maxLength={4000}
              placeholder="Tuliskan curahan terima kasih, cerita kebersamaan, dan harapan tulusmu di sini..."
              {...register("message")}
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Tanda Tangan Penutup"
              htmlFor={`${idPrefix}-signature`}
              hint="Ditampilkan dengan gaya font tulisan tangan"
            >
              <Input
                id={`${idPrefix}-signature`}
                placeholder="Dengan tulus & sayang, Teman-teman Kosan"
                maxLength={80}
                {...register("signature")}
              />
            </Field>

            <Field label="Tanggal Surat" htmlFor={`${idPrefix}-letterDate`}>
              <Input
                type="date"
                id={`${idPrefix}-letterDate`}
                {...register("letterDate")}
              />
            </Field>
          </div>
        </div>
      )}

      {/* ================= TAB 6: DESAIN & MUSIK ================= */}
      {activeTab === "theme" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
            <h3 className="font-display font-semibold text-amber-900 flex items-center gap-2">
              <Palette className="h-4 w-4 text-amber-600" />
              Kustomisasi Warna Desain & Musik Perayaan
            </h3>
            <p className="mt-1 text-xs text-amber-700">
              Kustomisasi independen setiap elemen warna: latar website, kartu konten, warna teks, hingga aksen tombol pesta.
            </p>
          </div>

          {/* Mini Live Palette Preview Card */}
          <div
            className="rounded-2xl border p-3.5 sm:p-4 shadow-sm transition-all overflow-hidden"
            style={{
              backgroundColor: (watch("backgroundColor") as string) || "#fffdf9",
              borderColor: "rgba(0,0,0,0.1)",
            }}
          >
            <p className="text-[11px] font-bold uppercase tracking-wider mb-2 opacity-70">
              Pratinjau Kombinasi Palet Terpilih:
            </p>
            <div
              className="rounded-xl p-3 sm:p-4 shadow-sm border flex flex-col sm:flex-row sm:items-center justify-between gap-3 overflow-hidden"
              style={{
                backgroundColor: (watch("cardColor") as string) || "#ffffff",
                borderColor: "rgba(0,0,0,0.08)",
              }}
            >
              <div className="min-w-0">
                <h5
                  className="font-display text-base font-bold truncate"
                  style={{ color: (watch("textColor") as string) || "#1f1b16" }}
                >
                  Judul Website Contoh
                </h5>
                <p
                  className="text-xs mt-0.5 line-clamp-2"
                  style={{ color: (watch("bodyTextColor") as string) || "#4a3e31" }}
                >
                  Ini adalah contoh teks isi narasi dan surat ucapan ulang tahunmu.
                </p>
              </div>
              <span
                className="inline-flex items-center justify-center rounded-full px-3 py-1.5 text-xs font-semibold text-white shadow-sm shrink-0 self-start sm:self-auto"
                style={{
                  backgroundColor: (watch("primaryColor") as string) || "#e8453c",
                }}
              >
                Aksen Pesta & Lilin
              </span>
            </div>
          </div>

          {/* 1. Warna Aksen Utama */}
          <div className="rounded-2xl border border-line bg-page p-4">
            <ColorPickerField
              label="1. Warna Aksen Utama (Primary Color)"
              helperText="Dipakai untuk tombol pesta, api lilin kue, badge perayaan, angka usia, dan pita kado."
              value={(watch("primaryColor") as string) || "#e8453c"}
              onChange={(hex) =>
                setValue("primaryColor", hex, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
              presets={BIRTHDAY_COLOR_PRESETS}
            />
          </div>

          {/* 2. Warna Latar Belakang Website */}
          <div className="rounded-2xl border border-line bg-page p-4">
            <ColorPickerField
              label="2. Warna Latar Belakang Website (Background)"
              helperText="Warna kanvas latar belakang seluruh halaman perayaan (pilih warna pesta cerah atau malam mewah)."
              value={(watch("backgroundColor") as string) || "#fffdf9"}
              onChange={(hex) =>
                setValue("backgroundColor", hex, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
              presets={BACKGROUND_COLOR_PRESETS}
            />
          </div>

          {/* 3. Warna Kartu Kontainer */}
          <div className="rounded-2xl border border-line bg-page p-4">
            <ColorPickerField
              label="3. Warna Kartu Konten (Card Container Color)"
              helperText="Warna dasar kotak kue ulang tahun, bingkai foto polaroid, kartu doa, dan amplop surat."
              value={(watch("cardColor") as string) || "#ffffff"}
              onChange={(hex) =>
                setValue("cardColor", hex, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
              presets={CARD_COLOR_PRESETS}
            />
          </div>

          {/* 4. Warna Teks Judul */}
          <div className="rounded-2xl border border-line bg-page p-4">
            <ColorPickerField
              label="4. Warna Teks Judul (Heading Text Color)"
              helperText="Warna untuk headline nama yang berulang tahun dan judul-judul perayaan."
              value={(watch("textColor") as string) || "#1f1b16"}
              onChange={(hex) =>
                setValue("textColor", hex, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
              presets={TEXT_COLOR_PRESETS}
            />
          </div>

          {/* 5. Warna Teks Isi & Doa */}
          <div className="rounded-2xl border border-line bg-page p-4">
            <ColorPickerField
              label="5. Warna Teks Isi & Doa (Body Text Color)"
              helperText="Warna untuk teks cerita linimasa, paragraf doa harapan, dan pesan surat utama."
              value={(watch("bodyTextColor") as string) || "#4a3e31"}
              onChange={(hex) =>
                setValue("bodyTextColor", hex, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
              presets={TEXT_COLOR_PRESETS}
            />
          </div>

          {/* Background Music */}
          <div className="space-y-4 rounded-2xl border border-line bg-page p-4">
            <h4 className="text-sm font-semibold text-ink">
              Pemutar Musik Perayaan (Celebration Audio)
            </h4>

            <Field
              label="Judul Lagu / Musik Pesta"
              htmlFor={`${idPrefix}-musicTitle`}
              hint="Nama lagu yang muncul di pemutar audio melayang"
            >
              <Input
                id={`${idPrefix}-musicTitle`}
                placeholder="Happy Birthday Upbeat Celebration Melody"
                maxLength={80}
                {...register("musicTitle")}
              />
            </Field>

            <Field
              label="Tautan Audio Langsung (Direct MP3 URL)"
              htmlFor={`${idPrefix}-bgMusicUrl`}
              hint="Masukkan link file .mp3 langsung agar musik dapat dimainkan"
            >
              <Input
                id={`${idPrefix}-bgMusicUrl`}
                placeholder="https://cdn.pixabay.com/download/audio/..."
                maxLength={1000}
                {...register("bgMusicUrl")}
              />
            </Field>

            {/* Quick preset audio */}
            <div>
              <p className="text-xs font-semibold text-ink-soft mb-2">
                Preset Musik Ulang Tahun Bebas Royalti:
              </p>
              <button
                type="button"
                onClick={() => {
                  setValue(
                    "bgMusicUrl",
                    "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3",
                    { shouldDirty: true },
                  );
                  setValue("musicTitle", "Happy Birthday Upbeat Melodies", {
                    shouldDirty: true,
                  });
                }}
                className="flex items-center gap-2 rounded-xl border border-amber-200 bg-white px-3 py-2 text-xs font-medium text-amber-900 shadow-sm hover:bg-amber-50 w-full sm:w-auto text-left"
              >
                <Sparkles className="h-4 w-4 text-amber-500 shrink-0" />
                <span className="truncate">Pakai Preset: Happy Birthday Upbeat Melodies (.mp3)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab Navigation Footer (Prev / Next Buttons) */}
      <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 border-t border-line pt-4">
        {currentTabIdx > 0 ? (
          <button
            type="button"
            onClick={goToPrevTab}
            className="inline-flex items-center justify-center sm:justify-start gap-1.5 text-xs font-semibold text-ink-soft hover:text-ink py-1.5"
          >
            <ChevronLeft className="h-4 w-4 shrink-0" />
            <span className="truncate">Kembali ke {TABS[currentTabIdx - 1].label}</span>
          </button>
        ) : (
          <div />
        )}

        {currentTabIdx < TABS.length - 1 ? (
          <button
            type="button"
            onClick={goToNextTab}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-amber-300 bg-amber-50 px-3.5 py-2 sm:py-1.5 text-xs font-semibold text-amber-900 transition-colors hover:bg-amber-100 w-full sm:w-auto"
          >
            <span className="truncate">Lanjut ke {TABS[currentTabIdx + 1].label}</span>
            <ChevronRight className="h-4 w-4 shrink-0" />
          </button>
        ) : null}
      </div>
    </div>
  );
}
