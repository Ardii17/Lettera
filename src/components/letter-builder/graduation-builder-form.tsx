"use client";

import { useState } from "react";
import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import {
  GraduationCap,
  Award,
  Image as ImageIcon,
  BookOpen,
  Mail,
  Palette,
  Check,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Scroll,
} from "lucide-react";
import { Field, Input, Textarea } from "@/components/ui/field";
import { ImageUploadField } from "@/components/ui/image-upload-field";
import { ColorPickerField } from "@/components/ui/color-picker-field";
import {
  GRADUATION_COLOR_PRESETS,
  BACKGROUND_COLOR_PRESETS,
  CARD_COLOR_PRESETS,
  TEXT_COLOR_PRESETS,
} from "@/templates/color-presets";
import { cn } from "@/lib/utils/cn";
import type { LetterFormValues } from "./dynamic-form";

interface GraduationBuilderFormProps {
  register: UseFormRegister<LetterFormValues>;
  setValue: UseFormSetValue<LetterFormValues>;
  watch: UseFormWatch<LetterFormValues>;
  errors: FieldErrors<LetterFormValues>;
  idPrefix?: string;
}

const PRESET_PHOTOS = [
  {
    name: "Potret Toga Senyum Bahagia",
    url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80",
    thumb: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Pelukan Hangat Keluarga",
    url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Sahabat Seperjuangan Wisuda",
    url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Gedung Kampus & Toga Megah",
    url: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Diskusi Skripsi di Perpustakaan",
    url: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Buket Bunga & Selempang Cum Laude",
    url: "https://images.unsplash.com/photo-1525921429624-479b6a26d84d?auto=format&fit=crop&w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1525921429624-479b6a26d84d?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Lempar Toga ke Langit",
    url: "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?auto=format&fit=crop&w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1523287562758-66c7fc58967f?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Momen Haru Penerimaan Ijazah",
    url: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?auto=format&fit=crop&w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?auto=format&fit=crop&w=200&q=60",
  },
];

const TABS = [
  { id: "hero", label: "Wisudawan & Cover", icon: GraduationCap },
  { id: "cap", label: "Lempar Toga & Selebrasi", icon: Award },
  { id: "gallery", label: "Galeri Kenangan", icon: ImageIcon },
  { id: "journey", label: "Perjalanan & Doa Karier", icon: BookOpen },
  { id: "letter", label: "Surat Kebanggaan", icon: Mail },
  { id: "theme", label: "Warna & Musik", icon: Palette },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function GraduationBuilderForm({
  register,
  setValue,
  watch,
  errors,
  idPrefix = "graduation",
}: GraduationBuilderFormProps) {
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
      <div className="flex overflow-x-auto no-scrollbar scrollbar-none sm:flex-wrap gap-1.5 rounded-2xl border border-amber-300/60 bg-[#fbf8f0] p-1.5 shadow-xs max-w-full">
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
                  ? "bg-white text-amber-950 shadow-sm border border-amber-300"
                  : "text-amber-900/70 hover:text-amber-950 hover:bg-white/60",
              )}
            >
              <Icon
                className={cn(
                  "h-4 w-4 shrink-0",
                  isActive ? "text-amber-600" : "text-amber-500/70",
                )}
              />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ================= TAB 1: WISUDAWAN & COVER ================= */}
      {activeTab === "hero" && (
        <div className="space-y-5 animate-in fade-in duration-300">
          <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
            <h3 className="font-display font-semibold text-amber-950 flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-amber-600" />
              Identitas Wisudawan & Cover Kelulusan
            </h3>
            <p className="mt-1 text-xs text-amber-800/80">
              Informasi wisudawan, gelar akademik, nama universitas, dan pesan pembuka penuh wibawa.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Nama Wisudawan & Gelar"
              htmlFor={`${idPrefix}-recipientName`}
              error={errors.recipientName?.message as string}
              hint="Cantumkan nama lengkap beserta gelar"
              required
            >
              <Input
                id={`${idPrefix}-recipientName`}
                placeholder="Alifa Rahmadani, S.Kom."
                maxLength={80}
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
                placeholder="Ayah, Ibu & Keluarga Besar"
                maxLength={80}
                {...register("senderName")}
              />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Gelar & Program Studi"
              htmlFor={`${idPrefix}-achievement`}
              error={errors.achievement?.message as string}
              required
            >
              <Input
                id={`${idPrefix}-achievement`}
                placeholder="Sarjana Ilmu Komputer (S.Kom.)"
                maxLength={80}
                {...register("achievement")}
              />
            </Field>

            <Field
              label="Nama Universitas / Institusi"
              htmlFor={`${idPrefix}-institution`}
              error={errors.institution?.message as string}
              required
            >
              <Input
                id={`${idPrefix}-institution`}
                placeholder="Universitas Brawijaya"
                maxLength={90}
                {...register("institution")}
              />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Fakultas / Departemen"
              htmlFor={`${idPrefix}-faculty`}
              hint="Misal: Fakultas Ilmu Komputer"
            >
              <Input
                id={`${idPrefix}-faculty`}
                placeholder="Fakultas Ilmu Komputer"
                maxLength={90}
                {...register("faculty")}
              />
            </Field>

            <Field
              label="Predikat Kehormatan / IPK"
              htmlFor={`${idPrefix}-honorBadge`}
              hint="Misal: 🏆 Predikat Cum Laude · IPK 3.88"
            >
              <Input
                id={`${idPrefix}-honorBadge`}
                placeholder="🏆 Predikat Cum Laude · IPK 3.88"
                maxLength={80}
                {...register("honorBadge")}
              />
            </Field>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Badge Atas Perayaan"
              htmlFor={`${idPrefix}-heroBadge`}
              hint="Teks kecil di atas judul utama"
            >
              <Input
                id={`${idPrefix}-heroBadge`}
                placeholder="✨ Official Graduation Tribute & Celebration"
                maxLength={80}
                {...register("heroBadge")}
              />
            </Field>

            <Field
              label="Tanggal Wisuda / Pelantikan"
              htmlFor={`${idPrefix}-graduationDate`}
            >
              <Input
                type="date"
                id={`${idPrefix}-graduationDate`}
                {...register("graduationDate")}
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
              placeholder="Merayakan Kelulusan & Gelar Sarjana Alifa"
              maxLength={100}
              {...register("title")}
            />
          </Field>

          <Field
            label="Pesan Pembuka / Sambutan Kebanggaan"
            htmlFor={`${idPrefix}-tagline`}
            hint="Kalimat sambutan hangat atas perjuangan panjangnya hingga meraih toga"
          >
            <Textarea
              id={`${idPrefix}-tagline`}
              placeholder="Sebuah persembahan bangga atas setiap tetes keringat, malam begadang, dan tekad baja hingga toga ini tersemat indah di kepalamu."
              rows={3}
              maxLength={350}
              {...register("tagline")}
            />
          </Field>

          {/* Hero Toga Photo Frame */}
          <div className="space-y-4 rounded-2xl border border-line bg-page p-4 overflow-hidden">
            <ImageUploadField
              label="Foto Potret Wisudawan (Toga / Kebaya)"
              value={typeof heroImage === "string" ? heroImage : ""}
              onChange={(url) => setValue("heroImage", url, { shouldDirty: true })}
              helperText="Pilih foto terbaik saat wisuda/sidang dari galeri HP atau laptop (otomatis dikompresi cerdas & disimpan aman)"
            />

            {/* Presets for Hero Photo */}
            <div className="pt-1">
              <p className="text-xs font-semibold text-ink-soft mb-2">
                Atau pilih dari koleksi preset foto wisuda berkualitas:
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

      {/* ================= TAB 2: LEMPAR TOGA & SELEBRASI ================= */}
      {activeTab === "cap" && (
        <div className="space-y-5 animate-in fade-in duration-300">
          <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
            <h3 className="font-display font-semibold text-amber-950 flex items-center gap-2">
              <Award className="h-4 w-4 text-amber-600" />
              Ritual Lempar Toga & Pesan Kebanggaan Tersembunyi
            </h3>
            <p className="mt-1 text-xs text-amber-800/80">
              Penerima dapat menekan tombol untuk melambungkan topi toga ke udara, memicu ledakan konfeti emas, nada fanfare kemenangan, dan membuka pesan kebanggaan rahasia!
            </p>
          </div>

          <Field
            label="Judul Bagian Lempar Toga"
            htmlFor={`${idPrefix}-capTitle`}
            hint="Misal: Pelepasan Toga & Sorak Kemenangan"
          >
            <Input
              id={`${idPrefix}-capTitle`}
              placeholder="Pelepasan Toga & Sorak Kemenangan"
              maxLength={80}
              {...register("capTitle")}
            />
          </Field>

          <Field
            label="Instruksi Ajakan Melempar Toga"
            htmlFor={`${idPrefix}-capPrompt`}
            hint="Teks ajakan yang terlihat sebelum tombol ditekan"
          >
            <Input
              id={`${idPrefix}-capPrompt`}
              placeholder="Tekan tombol di bawah untuk melambungkan toga kelulusanmu ke angkasa!"
              maxLength={120}
              {...register("capPrompt")}
            />
          </Field>

          <Field
            label="Pesan Kejutan Bangga (Muncul Sesaat Setelah Toga Dilempar)"
            htmlFor={`${idPrefix}-secretToastMessage`}
            hint="Kotak pesan kehormatan akan terbuka dengan animasi selebrasi emas dan menampilkan pesan ini"
          >
            <Textarea
              id={`${idPrefix}-secretToastMessage`}
              rows={4}
              maxLength={350}
              placeholder="Selamat melangkah ke dunia nyata, Sarjana! Kami percaya kamu akan menaklukkan setiap tantangan dengan penuh integritas, keberanian, dan senyuman bangga! 🎓✨"
              {...register("secretToastMessage")}
            />
          </Field>
        </div>
      )}

      {/* ================= TAB 3: GALERI KENANGAN ================= */}
      {activeTab === "gallery" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
            <h3 className="font-display font-semibold text-amber-950 flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-amber-600" />
              Galeri Kenangan Kampus & Momen Wisuda (Maks. 6 Foto)
            </h3>
            <p className="mt-1 text-xs text-amber-800/80">
              Koleksi foto wisuda bersama keluarga, teman seperjuangan, serta momen berharga selama perkuliahan dengan popup lightbox layar penuh.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Judul Galeri" htmlFor={`${idPrefix}-galleryTitle`}>
              <Input
                id={`${idPrefix}-galleryTitle`}
                placeholder="Galeri Kenangan Kampus & Momen Wisuda"
                maxLength={80}
                {...register("galleryTitle")}
              />
            </Field>

            <Field label="Subjudul Galeri" htmlFor={`${idPrefix}-gallerySubtitle`}>
              <Input
                id={`${idPrefix}-gallerySubtitle`}
                placeholder="Dokumentasi senyum kebersamaan, bimbingan dosen, dan pelukan hangat keluarga tercinta."
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
                    <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-100 text-amber-900 font-bold">
                        {idx}
                      </span>
                      Foto Kenangan Wisuda #{idx}
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
                    helperText="Pilih foto langsung dari galeri HP/laptop (otomatis dikompresi tanpa mengurangi kualitas)"
                  />

                  <div className="grid gap-3 sm:grid-cols-[1fr_130px] pt-1">
                    <Input
                      placeholder="Caption foto (misal: Pelukan hangat orang tua setelah pelantikan)"
                      maxLength={100}
                      {...register(`galleryCaption${idx}` as keyof LetterFormValues)}
                    />
                    <Input
                      placeholder="Gedung / Tahun"
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

      {/* ================= TAB 4: PERJALANAN & DOA KARIER ================= */}
      {activeTab === "journey" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
            <h3 className="font-display font-semibold text-amber-950 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-amber-600" />
              Statistik Kampus, Linimasa Skripsi & Doa Karier Masa Depan
            </h3>
            <p className="mt-1 text-xs text-amber-800/80">
              Dokumentasikan judul karya tugas akhir, 3 babak perjuangan kuliah, dan 4 doa terbaik untuk masa depan profesionalnya.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Total SKS yang Dituntaskan" htmlFor={`${idPrefix}-totalCredits`}>
              <Input
                id={`${idPrefix}-totalCredits`}
                placeholder="144 SKS"
                maxLength={30}
                {...register("totalCredits")}
              />
            </Field>

            <Field label="Masa Studi Perkuliahan" htmlFor={`${idPrefix}-studyDuration`}>
              <Input
                id={`${idPrefix}-studyDuration`}
                placeholder="3.5 Tahun"
                maxLength={30}
                {...register("studyDuration")}
              />
            </Field>
          </div>

          <Field label="Judul Tugas Akhir / Skripsi" htmlFor={`${idPrefix}-thesisTitle`}>
            <Textarea
              id={`${idPrefix}-thesisTitle`}
              rows={2}
              maxLength={200}
              placeholder="Penerapan Algoritma Deep Learning untuk Deteksi Dini Penyakit Tanaman Pangan..."
              {...register("thesisTitle")}
            />
          </Field>

          <Field label="Judul Linimasa Kampus" htmlFor={`${idPrefix}-milestoneTitle`}>
            <Input
              id={`${idPrefix}-milestoneTitle`}
              placeholder="Jejak Langkah & Perjuangan Menuju Toga"
              maxLength={80}
              {...register("milestoneTitle")}
            />
          </Field>

          {/* 3 Milestones */}
          {[1, 2, 3].map((num) => (
            <div key={num} className="rounded-2xl border border-line bg-paper p-4 sm:p-5 space-y-3">
              <div className="flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-600 text-xs font-bold text-white">
                  {num}
                </span>
                <h4 className="font-display font-semibold text-ink">
                  Babak Perjuangan #{num}
                </h4>
              </div>

              <div className="grid gap-3 sm:grid-cols-[110px_1fr]">
                <Input
                  placeholder="Tahun / Tahap"
                  maxLength={30}
                  {...register(`milestone${num}Year` as keyof LetterFormValues)}
                />
                <Input
                  placeholder="Judul babak (misal: Ujian Sidang Skripsi Tuntas)"
                  maxLength={80}
                  {...register(`milestone${num}Title` as keyof LetterFormValues)}
                />
              </div>

              <Textarea
                placeholder="Cerita singkat perjuangan atau kenangan berkesan..."
                rows={2}
                maxLength={300}
                {...register(`milestone${num}Desc` as keyof LetterFormValues)}
              />
            </div>
          ))}

          {/* 4 Career Wishes */}
          <div className="mt-8 space-y-4">
            <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
              <h3 className="font-display font-semibold text-amber-950">
                Empat Doa & Harapan Karier Masa Depan
              </h3>
              <p className="mt-1 text-xs text-amber-800/80">
                Poin doa menyentuh untuk kesuksesan langkah berikutnya di dunia profesional.
              </p>
            </div>

            <Field label="Judul Bagian Doa Karier" htmlFor={`${idPrefix}-wishesTitle`}>
              <Input
                id={`${idPrefix}-wishesTitle`}
                placeholder="Empat Doa Terbaik untuk Langkah Masa Depanmu"
                maxLength={80}
                {...register("wishesTitle")}
              />
            </Field>

            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                placeholder="Doa 1: Langkah awal karier & peluang kerja impian..."
                maxLength={160}
                {...register("wish1")}
              />
              <Input
                placeholder="Doa 2: Kebijaksanaan, integritas & kepemimpinan..."
                maxLength={160}
                {...register("wish2")}
              />
              <Input
                placeholder="Doa 3: Keberkahan rezeki, kesehatan & kemudahan..."
                maxLength={160}
                {...register("wish3")}
              />
              <Input
                placeholder="Doa 4: Dampak dan manfaat luas bagi masyarakat..."
                maxLength={160}
                {...register("wish4")}
              />
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 5: SURAT KEBANGGAAN ================= */}
      {activeTab === "letter" && (
        <div className="space-y-5 animate-in fade-in duration-300">
          <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
            <h3 className="font-display font-semibold text-amber-950 flex items-center gap-2">
              <Scroll className="h-4 w-4 text-amber-600" />
              Surat Piagam Kebanggaan & Keberhasilan
            </h3>
            <p className="mt-1 text-xs text-amber-800/80">
              Surat personal bergaya piagam kehormatan yang mengungkapkan rasa bangga tak terhingga atas kelulusannya.
            </p>
          </div>

          <Field
            label="Kutipan Inspiratif Pembuka"
            htmlFor={`${idPrefix}-quote`}
            hint="Kutipan berwibawa yang disorot di atas surat"
          >
            <Input
              id={`${idPrefix}-quote`}
              placeholder="Yang sulit itu memulai, yang luar biasa itu menuntaskan. Dan hari ini, kamu telah membuktikannya kepada dunia."
              maxLength={180}
              {...register("quote")}
            />
          </Field>

          <Field
            label="Isi Surat Kebanggaan Lengkap"
            htmlFor={`${idPrefix}-message`}
            error={errors.message?.message as string}
            hint="Pisahkan paragraf dengan baris kosong untuk tata letak piagam yang berwibawa."
            required
          >
            <Textarea
              id={`${idPrefix}-message`}
              rows={12}
              maxLength={4000}
              placeholder="Tuliskan curahan rasa bangga, apresiasi atas setiap kerja kerasnya, dan restu doa dari hati..."
              {...register("message")}
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Tanda Tangan Pengirim"
              htmlFor={`${idPrefix}-signature`}
              hint="Ditampilkan dengan gaya font tulisan tangan"
            >
              <Input
                id={`${idPrefix}-signature`}
                placeholder="Dengan cinta & rasa bangga tak terhingga, Ayah & Ibu"
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

      {/* ================= TAB 6: WARNA & MUSIK ================= */}
      {activeTab === "theme" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
            <h3 className="font-display font-semibold text-amber-950 flex items-center gap-2">
              <Palette className="h-4 w-4 text-amber-600" />
              Kustomisasi Warna Kehormatan & Musik Wisuda
            </h3>
            <p className="mt-1 text-xs text-amber-800/80">
              Kustomisasi independen setiap elemen warna: kanvas latar, piagam kartu, teks judul, dan aksen emas toga.
            </p>
          </div>

          {/* Mini Live Palette Preview Card */}
          <div
            className="rounded-2xl border p-3.5 sm:p-4 shadow-sm transition-all overflow-hidden"
            style={{
              backgroundColor: (watch("backgroundColor") as string) || "#141a30",
              borderColor: "rgba(255,255,255,0.15)",
            }}
          >
            <p className="text-[11px] font-bold uppercase tracking-wider mb-2 text-white/70">
              Pratinjau Kombinasi Palet Terpilih:
            </p>
            <div
              className="rounded-xl p-3 sm:p-4 shadow-sm border flex flex-col sm:flex-row sm:items-center justify-between gap-3 overflow-hidden"
              style={{
                backgroundColor: (watch("cardColor") as string) || "#1b2340",
                borderColor: "rgba(255,255,255,0.12)",
              }}
            >
              <div className="min-w-0">
                <h5
                  className="font-display text-base font-bold truncate"
                  style={{ color: (watch("textColor") as string) || "#f8f4e6" }}
                >
                  Alifa Rahmadani, S.Kom.
                </h5>
                <p
                  className="text-xs mt-0.5 line-clamp-2"
                  style={{ color: (watch("bodyTextColor") as string) || "#d5ceba" }}
                >
                  Ini adalah contoh teks piagam kelulusan dan doa kebanggaanmu.
                </p>
              </div>
              <span
                className="inline-flex items-center justify-center rounded-full px-3 py-1.5 text-xs font-semibold text-white shadow-sm shrink-0 self-start sm:self-auto"
                style={{
                  backgroundColor: (watch("primaryColor") as string) || "#caa64f",
                }}
              >
                Aksen Emas Toga
              </span>
            </div>
          </div>

          {/* 1. Warna Aksen Utama */}
          <div className="rounded-2xl border border-line bg-page p-4">
            <ColorPickerField
              label="1. Warna Aksen Kehormatan (Primary Color)"
              helperText="Dipakai untuk bingkai emas piagam, rumbai toga, medali kehormatan, dan tombol lempar toga."
              value={(watch("primaryColor") as string) || "#caa64f"}
              onChange={(hex) =>
                setValue("primaryColor", hex, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
              presets={GRADUATION_COLOR_PRESETS}
            />
          </div>

          {/* 2. Warna Latar Belakang Website */}
          <div className="rounded-2xl border border-line bg-page p-4">
            <ColorPickerField
              label="2. Warna Latar Belakang Website (Background)"
              helperText="Warna kanvas seluruh halaman wisuda (pilihan biru malam almamater atau kertas gading terang)."
              value={(watch("backgroundColor") as string) || "#141a30"}
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
              label="3. Warna Kartu Piagam & Konten (Card Container Color)"
              helperText="Warna dasar kotak piagam kelulusan, bingkai foto polaroid, kartu doa, dan amplop surat."
              value={(watch("cardColor") as string) || "#1b2340"}
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
              label="4. Warna Teks Judul & Nama (Heading Text Color)"
              helperText="Warna untuk nama wisudawan, gelar, dan judul-judul perayaan."
              value={(watch("textColor") as string) || "#f8f4e6"}
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
              helperText="Warna untuk narasi linimasa skripsi, poin doa karier, dan isi pesan surat."
              value={(watch("bodyTextColor") as string) || "#d5ceba"}
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
              Pemutar Musik Wisuda & Simfoni (Graduation Anthem)
            </h4>

            <Field
              label="Judul Lagu / Musik Wisuda"
              htmlFor={`${idPrefix}-musicTitle`}
              hint="Nama musik yang muncul di pemutar audio melayang"
            >
              <Input
                id={`${idPrefix}-musicTitle`}
                placeholder="Triumphant Graduation Fanfare & Symphony"
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
                Preset Musik Wisuda Bebas Royalti:
              </p>
              <button
                type="button"
                onClick={() => {
                  setValue(
                    "bgMusicUrl",
                    "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3",
                    { shouldDirty: true },
                  );
                  setValue("musicTitle", "Triumphant Graduation Fanfare", {
                    shouldDirty: true,
                  });
                }}
                className="flex items-center gap-2 rounded-xl border border-amber-300 bg-white px-3 py-2 text-xs font-medium text-amber-950 shadow-sm hover:bg-amber-50 w-full sm:w-auto text-left"
              >
                <Sparkles className="h-4 w-4 text-amber-600 shrink-0" />
                <span className="truncate">Pakai Preset: Triumphant Graduation Fanfare (.mp3)</span>
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
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-amber-300 bg-amber-50 px-3.5 py-2 sm:py-1.5 text-xs font-semibold text-amber-950 transition-colors hover:bg-amber-100 w-full sm:w-auto"
          >
            <span className="truncate">Lanjut ke {TABS[currentTabIdx + 1].label}</span>
            <ChevronRight className="h-4 w-4 shrink-0" />
          </button>
        ) : null}
      </div>
    </div>
  );
}
