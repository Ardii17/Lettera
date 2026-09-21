"use client";

import { useState } from "react";
import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import {
  HeartHandshake,
  MessageSquareQuote,
  Sparkles,
  ShieldCheck,
  Palette,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Field, Input, Textarea } from "@/components/ui/field";
import { ColorPickerField } from "@/components/ui/color-picker-field";
import {
  APOLOGY_COLOR_PRESETS,
  BACKGROUND_COLOR_PRESETS,
  CARD_COLOR_PRESETS,
  TEXT_COLOR_PRESETS,
} from "@/templates/color-presets";
import { cn } from "@/lib/utils/cn";
import type { LetterFormValues } from "./dynamic-form";

interface ApologyBuilderFormProps {
  register: UseFormRegister<LetterFormValues>;
  setValue: UseFormSetValue<LetterFormValues>;
  watch: UseFormWatch<LetterFormValues>;
  errors: FieldErrors<LetterFormValues>;
  idPrefix?: string;
}

type TabType = "intro" | "message" | "reflection" | "commitments" | "theme";

export function ApologyBuilderForm({
  register,
  setValue,
  watch,
  errors,
  idPrefix = "apology",
}: ApologyBuilderFormProps) {
  const [activeTab, setActiveTab] = useState<TabType>("intro");

  const tabs: Array<{ id: TabType; label: string; icon: typeof HeartHandshake }> = [
    { id: "intro", label: "Penerima & Judul", icon: HeartHandshake },
    { id: "message", label: "Isi & Penyesalan", icon: MessageSquareQuote },
    { id: "reflection", label: "Hal Berharga", icon: Sparkles },
    { id: "commitments", label: "Komitmen Perbaikan", icon: ShieldCheck },
    { id: "theme", label: "Tampilan & Musik", icon: Palette },
  ];

  const currentTabIndex = tabs.findIndex((t) => t.id === activeTab);

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
                  ? "bg-white text-emerald-950 shadow-sm border border-stone-200"
                  : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/50",
              )}
            >
              <Icon className={cn("w-4 h-4", isActive ? "text-emerald-700" : "text-stone-400")} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: PENERIMA & JUDUL */}
      {activeTab === "intro" && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-4 text-xs sm:text-sm text-emerald-900">
            <p className="font-medium mb-1">Membuka Langkah Rekonsiliasi</p>
            <p className="text-emerald-800/80 leading-relaxed">
              Tentukan kepada siapa pesan tulus ini ditujukan. Judul dan kutipan perenungan akan menyambut penerima dengan rasa hormat dan kerendahan hati.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Nama Penerima Maaf"
              htmlFor={`${idPrefix}-recipientName`}
              error={errors.recipientName?.message as string}
              required
            >
              <Input
                id={`${idPrefix}-recipientName`}
                placeholder="Contoh: Dinda Maharani"
                {...register("recipientName")}
              />
            </Field>

            <Field
              label="Nama Pengirim (Kamu)"
              htmlFor={`${idPrefix}-senderName`}
              error={errors.senderName?.message as string}
              required
            >
              <Input
                id={`${idPrefix}-senderName`}
                placeholder="Contoh: Fikri Ramadhan"
                {...register("senderName")}
              />
            </Field>
          </div>

          <Field
            label="Judul Surat"
            htmlFor={`${idPrefix}-title`}
            error={errors.title?.message as string}
            required
            hint="Judul utama surat yang akan tampak di bagian atas lembar perenungan."
          >
            <Input
              id={`${idPrefix}-title`}
              placeholder="Contoh: Untuk Dinda, Dari Lubuk Hatiku yang Terdalam"
              {...register("title")}
            />
          </Field>

          <Field
            label="Kutipan / Perenungan Pembuka"
            htmlFor={`${idPrefix}-quote`}
            error={errors.quote?.message as string}
            hint="Kutipan reflektif tentang kerendahan hati atau memaafkan."
          >
            <Textarea
              id={`${idPrefix}-quote`}
              rows={2}
              placeholder="Contoh: Memaafkan bukan berarti melupakan apa yang telah terjadi, melainkan memilih untuk tidak membiarkan luka merusak ikatan yang berharga."
              {...register("quote")}
            />
          </Field>
        </div>
      )}

      {/* TAB 2: ISI & PENYESALAN */}
      {activeTab === "message" && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs sm:text-sm text-stone-700">
            <p className="font-medium text-stone-900 mb-1">Ungkapan Kejujuran & Pengakuan</p>
            <p className="text-stone-600 leading-relaxed">
              Tuliskan perasaanmu apa adanya tanpa mencari pembenaran atau dalih. Ketulusan terasa paling kuat ketika kita berani bertanggung jawab penuh.
            </p>
          </div>

          <Field
            label="Salam & Paragraf Pembuka"
            htmlFor={`${idPrefix}-apologyOpening`}
            error={errors.apologyOpening?.message as string}
            hint="Paragraf sambutan yang mengawali pengakuan sebelum masuk ke surat lengkap."
          >
            <Textarea
              id={`${idPrefix}-apologyOpening`}
              rows={3}
              placeholder="Aku menulis pesan ini setelah banyak merenung dan menyadari betapa cerobohnya sikap dan perkataanku kemarin..."
              {...register("apologyOpening")}
            />
          </Field>

          <Field
            label="Isi Surat Pengakuan & Penyesalan Utama"
            htmlFor={`${idPrefix}-message`}
            error={errors.message?.message as string}
            required
            hint="Pisahkan setiap paragraf dengan baris kosong agar mudah dibaca."
          >
            <Textarea
              id={`${idPrefix}-message`}
              rows={10}
              placeholder="Tuliskan seluruh isi penyesalan, kejujuran hatimu, dan pengakuan salah di sini..."
              {...register("message")}
            />
          </Field>
        </div>
      )}

      {/* TAB 3: HAL BERHARGA */}
      {activeTab === "reflection" && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 text-xs sm:text-sm text-amber-900">
            <p className="font-medium mb-1">Apresiasi & Kenangan Berharga</p>
            <p className="text-amber-800/80 leading-relaxed">
              Tunjukkan bahwa kamu sangat menghargai hubungan ini dan tidak menganggap sepele kebaikan yang selama ini telah diberikan olehnya.
            </p>
          </div>

          <Field
            label="Judul Seksi Apresiasi"
            htmlFor={`${idPrefix}-valuedAspectsTitle`}
            error={errors.valuedAspectsTitle?.message as string}
          >
            <Input
              id={`${idPrefix}-valuedAspectsTitle`}
              placeholder="Contoh: Hal yang Sangat Kuhargai Darimu"
              {...register("valuedAspectsTitle")}
            />
          </Field>

          <Field
            label="Uraian Hal Berharga Tentang Penerima"
            htmlFor={`${idPrefix}-valuedAspects`}
            error={errors.valuedAspects?.message as string}
            hint="Ceritakan apa saja sifat, momen, atau kebaikan darinya yang sangat kamu syukuri dan tak ingin kamu sia-siakan."
          >
            <Textarea
              id={`${idPrefix}-valuedAspects`}
              rows={5}
              placeholder="Kebaikan hatimu, kesabaranmu selama ini, dan bagaimana kamu selalu ada untukku adalah hal-hal yang sangat berharga dan tidak ingin kuhancurkan karena egoku..."
              {...register("valuedAspects")}
            />
          </Field>
        </div>
      )}

      {/* TAB 4: KOMITMEN PERBAIKAN */}
      {activeTab === "commitments" && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          <div className="bg-teal-50/70 border border-teal-200/80 rounded-xl p-4 text-xs sm:text-sm text-teal-900">
            <p className="font-medium mb-1">Tiga Langkah Nyata Perubahan Diri</p>
            <p className="text-teal-800/80 leading-relaxed">
              Kata maaf terasa kosong tanpa komitmen nyata. Berikan 3 poin perubahan sikap konkrit yang siap kamu jalankan demi memperbaiki hubungan.
            </p>
          </div>

          <Field
            label="Judul Komitmen Perbaikan"
            htmlFor={`${idPrefix}-commitmentTitle`}
            error={errors.commitmentTitle?.message as string}
          >
            <Input
              id={`${idPrefix}-commitmentTitle`}
              placeholder="Contoh: Langkah Nyata & Janjiku ke Depan"
              {...register("commitmentTitle")}
            />
          </Field>

          <Field
            label="Komitmen 1"
            htmlFor={`${idPrefix}-promise1`}
            error={errors.promise1?.message as string}
            hint="Langkah pertama terkait pengendalian diri / komunikasi."
          >
            <Input
              id={`${idPrefix}-promise1`}
              placeholder="Contoh: Belajar lebih sabar dan sungguh-sungguh mendengarkan sebelum bereaksi."
              {...register("promise1")}
            />
          </Field>

          <Field
            label="Komitmen 2"
            htmlFor={`${idPrefix}-promise2`}
            error={errors.promise2?.message as string}
            hint="Langkah kedua terkait empati dan rasa hormat."
          >
            <Input
              id={`${idPrefix}-promise2`}
              placeholder="Contoh: Menjaga batasan, menghormati perasaanmu, dan tidak mengabaikan sudut pandangmu."
              {...register("promise2")}
            />
          </Field>

          <Field
            label="Komitmen 3"
            htmlFor={`${idPrefix}-promise3`}
            error={errors.promise3?.message as string}
            hint="Langkah ketiga terkait keterbukaan dan konsistensi masa depan."
          >
            <Input
              id={`${idPrefix}-promise3`}
              placeholder="Contoh: Berkomunikasi secara jujur dan terbuka tanpa membiarkan asumsi merusak segalanya."
              {...register("promise3")}
            />
          </Field>
        </div>
      )}

      {/* TAB 5: TAMPILAN, MUSIK & REKONSILIASI */}
      {activeTab === "theme" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs sm:text-sm text-stone-700">
            <p className="font-medium text-stone-900 mb-1">Akses Komunikasi & Suasana</p>
            <p className="text-stone-600 leading-relaxed">
              Sertakan nomor WhatsApp agar penerima dapat menekan tombol respon untuk memulai kembali percakapan hangat denganmu.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Nomor WhatsApp Pengirim"
              htmlFor={`${idPrefix}-senderPhone`}
              error={errors.senderPhone?.message as string}
              hint="Format angka kode negara, misal: 6281234567890."
            >
              <Input
                id={`${idPrefix}-senderPhone`}
                placeholder="6281234567890"
                {...register("senderPhone")}
              />
            </Field>

            <Field
              label="Tanggal Surat"
              htmlFor={`${idPrefix}-letterDate`}
              error={errors.letterDate?.message as string}
            >
              <Input
                type="date"
                id={`${idPrefix}-letterDate`}
                {...register("letterDate")}
              />
            </Field>
          </div>

          <Field
            label="Tanda Tangan Penutup"
            htmlFor={`${idPrefix}-signature`}
            error={errors.signature?.message as string}
          >
            <Input
              id={`${idPrefix}-signature`}
              placeholder="Contoh: Dengan segenap ketulusan hati, Fikri"
              {...register("signature")}
            />
          </Field>

          {/* Pengaturan Warna */}
          <div className="border-t border-stone-200 pt-5 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Palet Warna Surat
            </h4>

            <div className="space-y-4">
              <Field label="Warna Aksen Utama" htmlFor={`${idPrefix}-primaryColor`}>
                <ColorPickerField
                  value={(watch("primaryColor") as string) || "#3b6e5b"}
                  onChange={(hex) =>
                    setValue("primaryColor", hex, { shouldValidate: true, shouldDirty: true })
                  }
                  presets={APOLOGY_COLOR_PRESETS}
                  helperText="Warna tombol, batas ornamen, dan penanda komitmen."
                />
              </Field>

              <Field label="Warna Latar Belakang Surat" htmlFor={`${idPrefix}-backgroundColor`}>
                <ColorPickerField
                  value={(watch("backgroundColor") as string) || "#f7f8f6"}
                  onChange={(hex) =>
                    setValue("backgroundColor", hex, { shouldValidate: true, shouldDirty: true })
                  }
                  presets={BACKGROUND_COLOR_PRESETS}
                  helperText="Warna kanvas layar di luar kertas surat."
                />
              </Field>

              <Field label="Warna Kertas Surat" htmlFor={`${idPrefix}-cardColor`}>
                <ColorPickerField
                  value={(watch("cardColor") as string) || "#ffffff"}
                  onChange={(hex) =>
                    setValue("cardColor", hex, { shouldValidate: true, shouldDirty: true })
                  }
                  presets={CARD_COLOR_PRESETS}
                  helperText="Warna lembaran kertas perenungan."
                />
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Warna Teks Judul" htmlFor={`${idPrefix}-textColor`}>
                  <ColorPickerField
                    value={(watch("textColor") as string) || "#20382e"}
                    onChange={(hex) =>
                      setValue("textColor", hex, { shouldValidate: true, shouldDirty: true })
                    }
                    presets={TEXT_COLOR_PRESETS}
                    helperText="Warna judul dan nama penerima."
                  />
                </Field>

                <Field label="Warna Teks Paragraf" htmlFor={`${idPrefix}-bodyTextColor`}>
                  <ColorPickerField
                    value={(watch("bodyTextColor") as string) || "#3e5148"}
                    onChange={(hex) =>
                      setValue("bodyTextColor", hex, { shouldValidate: true, shouldDirty: true })
                    }
                    presets={TEXT_COLOR_PRESETS}
                    helperText="Warna isi paragraf narasi."
                  />
                </Field>
              </div>
            </div>
          </div>

          {/* Pengaturan Audio */}
          <div className="border-t border-stone-200 pt-5 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Audio Musik Latar
            </h4>

            <Field
              label="Judul Musik"
              htmlFor={`${idPrefix}-musicTitle`}
              error={errors.musicTitle?.message as string}
            >
              <Input
                id={`${idPrefix}-musicTitle`}
                placeholder="Peaceful Piano Reflections"
                {...register("musicTitle")}
              />
            </Field>

            <Field
              label="Tautan File Audio (.mp3)"
              htmlFor={`${idPrefix}-bgMusicUrl`}
              error={errors.bgMusicUrl?.message as string}
              hint="Tautan langsung ke file audio mp3 yang tenang (misal dari Pixabay / hosting sendiri)."
            >
              <Input
                id={`${idPrefix}-bgMusicUrl`}
                placeholder="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3"
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
            className="flex items-center gap-1 text-xs sm:text-sm font-medium text-white bg-emerald-800 hover:bg-emerald-900 px-4 py-1.5 rounded-lg transition-colors shadow-sm ml-auto"
          >
            Lanjut: {tabs[currentTabIndex + 1].label}
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
