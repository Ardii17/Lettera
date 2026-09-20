"use client";

import { useState } from "react";
import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import {
  Heart,
  Clock,
  Image as ImageIcon,
  BookOpen,
  Mail,
  Palette,
  Sparkles,
  Check,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Field, Input, Textarea } from "@/components/ui/field";
import { ImageUploadField } from "@/components/ui/image-upload-field";
import { ColorPickerField } from "@/components/ui/color-picker-field";
import {
  ROMANTIC_COLOR_PRESETS,
  BACKGROUND_COLOR_PRESETS,
  CARD_COLOR_PRESETS,
  TEXT_COLOR_PRESETS,
} from "@/templates/color-presets";
import { cn } from "@/lib/utils/cn";
import type { LetterFormValues } from "./dynamic-form";

interface RomanticBuilderFormProps {
  register: UseFormRegister<LetterFormValues>;
  setValue: UseFormSetValue<LetterFormValues>;
  watch: UseFormWatch<LetterFormValues>;
  errors: FieldErrors<LetterFormValues>;
  idPrefix?: string;
}

const PRESET_PHOTOS = [
  {
    name: "Genggaman Tangan Hangat",
    url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1200&q=80",
    thumb:
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Senja Tepi Pantai",
    url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80",
    thumb:
      "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Cahaya Hati & Lentera",
    url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80",
    thumb:
      "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Senyum Manis Pasangan",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    thumb:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Buket Bunga Cantik",
    url: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80",
    thumb:
      "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Kencan Kopi Berdua",
    url: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=80",
    thumb:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Malam Berbintang Romantis",
    url: "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?auto=format&fit=crop&w=800&q=80",
    thumb:
      "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Lilin Makan Malam Intim",
    url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    thumb:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=60",
  },
];

const TABS = [
  { id: "hero", label: "Pasangan & Hero", icon: Heart },
  { id: "counter", label: "Love Counter", icon: Clock },
  { id: "gallery", label: "Galeri Foto", icon: ImageIcon },
  { id: "story", label: "Kisah Cinta", icon: BookOpen },
  { id: "letter", label: "Surat Inti", icon: Mail },
  { id: "theme", label: "Tema & Musik", icon: Palette },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function RomanticBuilderForm({
  register,
  setValue,
  watch,
  errors,
  idPrefix = "romantic",
}: RomanticBuilderFormProps) {
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
      <div className="flex overflow-x-auto no-scrollbar scrollbar-none sm:flex-wrap gap-1.5 rounded-2xl border border-seal-200/70 bg-[#fdf2f4] p-1.5 shadow-xs max-w-full">
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
                  ? "bg-white text-seal-700 shadow-sm border border-seal-200"
                  : "text-seal-800/70 hover:text-seal-900 hover:bg-white/60",
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 shrink-0",
                  isActive ? "text-seal-600" : "text-seal-400",
                )}
              />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ================= TAB 1: PASANGAN & HERO ================= */}
      {activeTab === "hero" && (
        <div className="space-y-5 animate-in fade-in duration-300">
          <div className="rounded-xl border border-seal-100 bg-seal-50/50 p-4">
            <h3 className="font-display font-semibold text-seal-800">
              Identitas Pasangan & Cover
            </h3>
            <p className="mt-1 text-xs text-seal-700">
              Informasi ini ditampilkan di bagian paling atas website romantis.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Nama Pasangan (Penerima)"
              htmlFor={`${idPrefix}-recipientName`}
              error={errors.recipientName?.message as string}
              required
            >
              <Input
                id={`${idPrefix}-recipientName`}
                placeholder="Sarah Putri"
                maxLength={60}
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
                placeholder="Raka Aditya"
                maxLength={60}
                {...register("senderName")}
              />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Panggilan / Nickname Bersama"
              htmlFor={`${idPrefix}-coupleNickname`}
              hint="Misal: Raka & Sarah atau My Universe"
            >
              <Input
                id={`${idPrefix}-coupleNickname`}
                placeholder="Raka & Sarah"
                maxLength={60}
                {...register("coupleNickname")}
              />
            </Field>

            <Field
              label="Badge Hari Bahagia"
              htmlFor={`${idPrefix}-heroBadge`}
              hint="Badge kecil di atas judul cover"
            >
              <Input
                id={`${idPrefix}-heroBadge`}
                placeholder="Happy 3rd Anniversary, My Love ✨"
                maxLength={80}
                {...register("heroBadge")}
              />
            </Field>
          </div>

          <Field
            label="Judul Utama Website"
            htmlFor={`${idPrefix}-title`}
            error={errors.title?.message as string}
            required
          >
            <Input
              id={`${idPrefix}-title`}
              placeholder="Untuk Kamu yang Selalu Pulang"
              maxLength={100}
              {...register("title")}
            />
          </Field>

          <Field
            label="Pesan Pembuka / Tagline Cover"
            htmlFor={`${idPrefix}-tagline`}
            hint="Kalimat manis penyambut pasangan saat membuka website"
          >
            <Textarea
              id={`${idPrefix}-tagline`}
              placeholder="Sebuah ruang kecil yang kuciptakan khusus untuk merayakan setiap tawa, perjalanan, dan rasa syukur memilikimu."
              rows={3}
              maxLength={300}
              {...register("tagline")}
            />
          </Field>

          {/* Hero Image Section */}
          <div className="space-y-4 rounded-2xl border border-line bg-page p-4">
            <ImageUploadField
              label="Foto Utama Cover"
              value={typeof heroImage === "string" ? heroImage : ""}
              onChange={(url) => setValue("heroImage", url, { shouldDirty: true })}
              helperText="Pilih foto terbaik berdua langsung dari galeri media / perangkat (otomatis dikompresi cerdas & disimpan ke Supabase)"
            />

            {/* Quick Presets for Hero Photo */}
            <div className="pt-1">
              <p className="text-xs font-semibold text-ink-soft mb-2">
                Atau pilih dari koleksi preset foto romantis:
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
                      "group relative aspect-4/3 overflow-hidden rounded-lg border text-left transition-all hover:ring-2 hover:ring-seal-500",
                      heroImage === preset.url
                        ? "ring-2 ring-seal-600"
                        : "border-line",
                    )}
                  >
                    <img
                      src={preset.thumb}
                      alt={preset.name}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform"
                    />
                    {heroImage === preset.url && (
                      <span className="absolute right-1 top-1 rounded-full bg-seal-600 p-0.5 text-white">
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

      {/* ================= TAB 2: LOVE COUNTER ================= */}
      {activeTab === "counter" && (
        <div className="space-y-5 animate-in fade-in duration-300">
          <div className="rounded-xl border border-seal-100 bg-seal-50/50 p-4">
            <h3 className="font-display font-semibold text-seal-800">
              Love Duration Counter
            </h3>
            <p className="mt-1 text-xs text-seal-700">
              Menghitung durasi hari, jam, dan menit perjalanan cinta kalian
              secara real-time.
            </p>
          </div>

          <Field
            label="Tanggal Mulai Bersama / Jadian"
            htmlFor={`${idPrefix}-anniversaryDate`}
            hint="Format: YYYY-MM-DD. Hitungan hari bersama akan dihitung otomatis dari tanggal ini."
          >
            <Input
              type="date"
              id={`${idPrefix}-anniversaryDate`}
              {...register("anniversaryDate")}
            />
          </Field>

          <Field
            label="Judul Penghitung Waktu"
            htmlFor={`${idPrefix}-counterTitle`}
            hint="Misal: Hari-Hari Indah Bersamamu"
          >
            <Input
              id={`${idPrefix}-counterTitle`}
              placeholder="Hari-Hari Indah Bersamamu"
              maxLength={80}
              {...register("counterTitle")}
            />
          </Field>

          <Field
            label="Catatan Manis Love Counter"
            htmlFor={`${idPrefix}-counterSubtitle`}
            hint="Kutipan kecil di bawah kotak angka"
          >
            <Input
              id={`${idPrefix}-counterSubtitle`}
              placeholder="Dan setiap detik berikutnya masih ingin kulewatkan bersamamu."
              maxLength={200}
              {...register("counterSubtitle")}
            />
          </Field>
        </div>
      )}

      {/* ================= TAB 3: GALERI FOTO (HANYA IMAGE) ================= */}
      {activeTab === "gallery" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="rounded-xl border border-seal-100 bg-seal-50/50 p-4">
            <h3 className="font-display font-semibold text-seal-800">
              Galeri Foto Kenangan (Maks. 6 Foto)
            </h3>
            <p className="mt-1 text-xs text-seal-700">
              Foto ditampilkan dalam gaya polaroid dengan efek kemiringan
              estetik dan lightbox popup interaktif.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Judul Galeri" htmlFor={`${idPrefix}-galleryTitle`}>
              <Input
                id={`${idPrefix}-galleryTitle`}
                placeholder="Galeri Kenangan Kita"
                maxLength={80}
                {...register("galleryTitle")}
              />
            </Field>

            <Field
              label="Subjudul Galeri"
              htmlFor={`${idPrefix}-gallerySubtitle`}
            >
              <Input
                id={`${idPrefix}-gallerySubtitle`}
                placeholder="Potret senyuman dan detik-detik manis yang ingin kusimpan selamanya."
                maxLength={160}
                {...register("gallerySubtitle")}
              />
            </Field>
          </div>

          {/* Quick preset selector for gallery */}
          <div className="rounded-xl border border-line bg-page p-4">
            <p className="text-xs font-semibold text-ink-soft mb-2">
              Pilihan Cepat: Klik preset di bawah untuk mengisi salah satu foto:
            </p>
            <div className="grid grid-cols-4 gap-1.5 sm:gap-2 sm:grid-cols-8">
              {PRESET_PHOTOS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  title={`Gunakan: ${preset.name}`}
                  onClick={() => {
                    // Cari slot pertama yang kosong, atau isi slot 1
                    for (let slot = 1; slot <= 6; slot++) {
                      const cur = watch(
                        `galleryImg${slot}` as keyof LetterFormValues,
                      );
                      if (!cur) {
                        setValue(
                          `galleryImg${slot}` as keyof LetterFormValues,
                          preset.url,
                          { shouldDirty: true },
                        );
                        return;
                      }
                    }
                    setValue("galleryImg1", preset.url, { shouldDirty: true });
                  }}
                  className="group aspect-square overflow-hidden rounded-lg border border-line hover:ring-2 hover:ring-seal-500 transition-all"
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
              const currentImg = watch(
                `galleryImg${idx}` as keyof LetterFormValues,
              );
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-seal-100 bg-white p-4 shadow-xs transition-all hover:border-seal-300 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-seal-700">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-seal-100 text-seal-700 font-bold">
                        {idx}
                      </span>
                      Foto Kenangan #{idx}
                    </span>
                    {typeof currentImg === "string" && currentImg.trim() ? (
                      <button
                        type="button"
                        onClick={() => {
                          setValue(
                            `galleryImg${idx}` as keyof LetterFormValues,
                            "",
                            { shouldDirty: true },
                          );
                          setValue(
                            `galleryCaption${idx}` as keyof LetterFormValues,
                            "",
                            { shouldDirty: true },
                          );
                          setValue(
                            `galleryDate${idx}` as keyof LetterFormValues,
                            "",
                            { shouldDirty: true },
                          );
                        }}
                        className="text-xs text-rose-500 hover:underline font-medium"
                      >
                        Hapus Slot Ini
                      </button>
                    ) : null}
                  </div>

                  {/* Upload Field */}
                  <ImageUploadField
                    value={typeof currentImg === "string" ? currentImg : ""}
                    onChange={(url) => {
                      setValue(
                        `galleryImg${idx}` as keyof LetterFormValues,
                        url,
                        { shouldDirty: true },
                      );
                    }}
                    helperText="Pilih foto langsung dari galeri HP/laptop (otomatis dikompresi tanpa mengurangi kualitas)"
                  />

                  {/* Caption & Date Inputs */}
                  <div className="grid gap-3 sm:grid-cols-[1fr_130px] pt-1">
                    <Input
                      placeholder="Caption foto (misal: Senja pertama kita di pantai)"
                      maxLength={100}
                      {...register(
                        `galleryCaption${idx}` as keyof LetterFormValues,
                      )}
                    />
                    <Input
                      placeholder="Lokasi / Tahun"
                      maxLength={50}
                      {...register(
                        `galleryDate${idx}` as keyof LetterFormValues,
                      )}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= TAB 4: KISAH CINTA (MILESTONES) ================= */}
      {activeTab === "story" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="rounded-xl border border-seal-100 bg-seal-50/50 p-4">
            <h3 className="font-display font-semibold text-seal-800">
              Linimasa Kisah Cinta (Our Milestones)
            </h3>
            <p className="mt-1 text-xs text-seal-700">
              Ceritakan babak-babak paling berharga dalam hubungan kalian.
            </p>
          </div>

          <Field label="Judul Linimasa" htmlFor={`${idPrefix}-storyTitle`}>
            <Input
              id={`${idPrefix}-storyTitle`}
              placeholder="Babak Indah Perjalanan Kita"
              maxLength={80}
              {...register("storyTitle")}
            />
          </Field>

          {/* 3 Milestones */}
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className="rounded-2xl border border-line bg-paper p-5 space-y-3"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-seal-600 text-xs font-bold text-white">
                  {num}
                </span>
                <h4 className="font-display font-semibold text-ink">
                  Momen Istimewa #{num}
                </h4>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Input
                  placeholder="Tanggal momen (misal: 15 Oktober 2022)"
                  maxLength={40}
                  {...register(`milestone${num}Date` as keyof LetterFormValues)}
                />
                <Input
                  placeholder="Judul momen (misal: Pertama Kali Bertemu)"
                  maxLength={80}
                  {...register(
                    `milestone${num}Title` as keyof LetterFormValues,
                  )}
                />
              </div>

              <Textarea
                placeholder="Cerita singkat momen ini..."
                rows={2}
                maxLength={400}
                {...register(`milestone${num}Desc` as keyof LetterFormValues)}
              />
            </div>
          ))}

          {/* Reasons Section */}
          <div className="mt-8 space-y-4">
            <div className="rounded-xl border border-seal-100 bg-seal-50/50 p-4">
              <h3 className="font-display font-semibold text-seal-800">
                Hal-Hal Kecil yang Membuat Jatuh Cinta
              </h3>
              <p className="mt-1 text-xs text-seal-700">
                Poin-poin kejujuran yang bikin pasangan tersenyum haru.
              </p>
            </div>

            <Field
              label="Judul Bagian Alasan"
              htmlFor={`${idPrefix}-reasonsTitle`}
            >
              <Input
                id={`${idPrefix}-reasonsTitle`}
                placeholder="Hal-Hal Kecil yang Membuatku Jatuh Cinta"
                maxLength={80}
                {...register("reasonsTitle")}
              />
            </Field>

            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                placeholder="Alasan 1: Caramu tertawa saat mendengar leluconku..."
                maxLength={160}
                {...register("reason1")}
              />
              <Input
                placeholder="Alasan 2: Ketulusan hatimu kepada semua orang..."
                maxLength={160}
                {...register("reason2")}
              />
              <Input
                placeholder="Alasan 3: Rasa tenang setiap kali tangan kita saling genggam..."
                maxLength={160}
                {...register("reason3")}
              />
              <Input
                placeholder="Alasan 4: Caramu selalu mempercayaiku..."
                maxLength={160}
                {...register("reason4")}
              />
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 5: SURAT INTI (THE LOVE LETTER) ================= */}
      {activeTab === "letter" && (
        <div className="space-y-5 animate-in fade-in duration-300">
          <div className="rounded-xl border border-seal-100 bg-seal-50/50 p-4">
            <h3 className="font-display font-semibold text-seal-800">
              Surat Cinta Inti (The Love Letter)
            </h3>
            <p className="mt-1 text-xs text-seal-700">
              Surat emosional yang ditampilkan dengan estetika kertas klasik dan
              segel lilin wax seal.
            </p>
          </div>

          <Field
            label="Kutipan Romantis Pembuka"
            htmlFor={`${idPrefix}-quote`}
            hint="Kutipan yang ditampilkan mencolok di atas surat"
          >
            <Input
              id={`${idPrefix}-quote`}
              placeholder="Dan dari jutaan kemungkinan di alam semesta, aku bersyukur semesta memilihkan kamu."
              maxLength={240}
              {...register("quote")}
            />
          </Field>

          <Field
            label="Isi Surat Lengkap"
            htmlFor={`${idPrefix}-message`}
            error={errors.message?.message as string}
            hint="Pisahkan paragraf dengan baris kosong untuk tata letak yang indah."
            required
          >
            <Textarea
              id={`${idPrefix}-message`}
              rows={12}
              maxLength={4000}
              placeholder="Tuliskan curahan hatimu di sini..."
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
                placeholder="Selamanya milikmu, Raka"
                maxLength={60}
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
          <div className="rounded-xl border border-seal-100 bg-seal-50/50 p-4">
            <h3 className="font-display font-semibold text-seal-800">
              Kustomisasi Warna Desain & Musik Latar
            </h3>
            <p className="mt-1 text-xs text-seal-700">
              Tentukan kombinasi warna setiap elemen website sesukamu — mulai dari latar belakang, kartu, warna teks, hingga aksen tombol cinta.
            </p>
          </div>

          {/* Mini Live Palette Preview Card */}
          <div
            className="rounded-2xl border p-3.5 sm:p-4 shadow-sm transition-all overflow-hidden"
            style={{
              backgroundColor: (watch("backgroundColor") as string) || "#fdf4f5",
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
                  style={{ color: (watch("textColor") as string) || "#3e1b24" }}
                >
                  Judul Website Contoh
                </h5>
                <p
                  className="text-xs mt-0.5 line-clamp-2"
                  style={{ color: (watch("bodyTextColor") as string) || "#54333b" }}
                >
                  Ini adalah contoh teks isi narasi dan surat cintamu.
                </p>
              </div>
              <span
                className="inline-flex items-center justify-center rounded-full px-3 py-1.5 text-xs font-semibold text-white shadow-sm shrink-0 self-start sm:self-auto"
                style={{
                  backgroundColor: (watch("primaryColor") as string) || "#c03a52",
                }}
              >
                Aksen Tombol & Segel
              </span>
            </div>
          </div>

          {/* 1. Warna Aksen Utama */}
          <div className="rounded-2xl border border-line bg-page p-4">
            <ColorPickerField
              label="1. Warna Aksen Utama (Primary Color)"
              helperText="Dipakai untuk tombol audio, ikon hati, badge perayaan, angka countdown, dan segel lilin wax seal."
              value={(watch("primaryColor") as string) || "#c03a52"}
              onChange={(hex) =>
                setValue("primaryColor", hex, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
              presets={ROMANTIC_COLOR_PRESETS}
            />
          </div>

          {/* 2. Warna Latar Belakang Website */}
          <div className="rounded-2xl border border-line bg-page p-4">
            <ColorPickerField
              label="2. Warna Latar Belakang Halaman (Website Background)"
              helperText="Warna kanvas latar belakang seluruh website tribut (pilih warna terang atau gelap elegan)."
              value={(watch("backgroundColor") as string) || "#fdf4f5"}
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
              helperText="Warna dasar kotak love counter, bingkai polaroid foto, kartu linimasa, dan amplop surat."
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
              helperText="Warna untuk headline judul utama, judul babak perjalanan, dan nama pasangan."
              value={(watch("textColor") as string) || "#3e1b24"}
              onChange={(hex) =>
                setValue("textColor", hex, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
              presets={TEXT_COLOR_PRESETS}
            />
          </div>

          {/* 5. Warna Teks Isi & Surat */}
          <div className="rounded-2xl border border-line bg-page p-4">
            <ColorPickerField
              label="5. Warna Teks Isi & Surat (Body Text Color)"
              helperText="Warna untuk teks narasi paragraf, kutipan cinta, dan pesan isi surat utama."
              value={(watch("bodyTextColor") as string) || "#54333b"}
              onChange={(hex) =>
                setValue("bodyTextColor", hex, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
              presets={TEXT_COLOR_PRESETS}
            />
          </div>

          <div className="space-y-4 rounded-2xl border border-line bg-page p-4">
            <h4 className="text-sm font-semibold text-ink">
              Pemutar Musik Latar (Romantic Audio)
            </h4>

            <Field
              label="Judul Lagu / Soundtrack"
              htmlFor={`${idPrefix}-musicTitle`}
              hint="Nama lagu yang muncul di pemutar audio melayang"
            >
              <Input
                id={`${idPrefix}-musicTitle`}
                placeholder="Can't Help Falling in Love (Piano Instrumental)"
                maxLength={80}
                {...register("musicTitle")}
              />
            </Field>

            <Field
              label="Tautan Audio Langsung (Direct MP3 URL)"
              htmlFor={`${idPrefix}-bgMusicUrl`}
              hint="Masukkan link file .mp3 langsung agar dapat diputar"
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
                Preset Musik Romantis Bebas Royalti:
              </p>
              <button
                type="button"
                onClick={() => {
                  setValue(
                    "bgMusicUrl",
                    "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3",
                    { shouldDirty: true },
                  );
                  setValue("musicTitle", "Romantic Piano Melody", {
                    shouldDirty: true,
                  });
                }}
                className="flex items-center gap-2 rounded-xl border border-seal-200 bg-white px-3 py-2 text-xs font-medium text-seal-800 shadow-sm hover:bg-seal-50 w-full sm:w-auto text-left"
              >
                <Sparkles className="h-4 w-4 text-seal-500 shrink-0" />
                <span className="truncate">Pakai Preset: Romantic Piano Melody (.mp3)</span>
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
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-seal-200/70 bg-seal-50 px-3.5 py-2 sm:py-1.5 text-xs font-semibold text-seal-700 transition-colors hover:bg-seal-100 w-full sm:w-auto"
          >
            <span className="truncate">Lanjut ke {TABS[currentTabIdx + 1].label}</span>
            <ChevronRight className="h-4 w-4 shrink-0" />
          </button>
        ) : null}
      </div>
    </div>
  );
}
