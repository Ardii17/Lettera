"use client";

import { useState } from "react";
import type {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  FieldErrors,
} from "react-hook-form";
import {
  Crown,
  Scroll,
  Droplets,
  Heart,
  Sliders,
  Palette,
  ChevronRight,
  ChevronLeft,
  Sparkles,
} from "lucide-react";
import { Field, Input, Textarea } from "@/components/ui/field";
import { ColorPickerField } from "@/components/ui/color-picker-field";
import { cn } from "@/lib/utils/cn";
import type { LetterFormValues } from "./dynamic-form";

interface ParfumDamourBuilderFormProps {
  register: UseFormRegister<LetterFormValues>;
  setValue: UseFormSetValue<LetterFormValues>;
  watch: UseFormWatch<LetterFormValues>;
  errors: FieldErrors<LetterFormValues>;
  idPrefix?: string;
}

type TabType =
  | "flacon"
  | "journal"
  | "pyramid"
  | "vials"
  | "specs"
  | "theme";

export function ParfumDamourBuilderForm({
  register,
  setValue,
  watch,
  errors,
  idPrefix = "parfum-damour",
}: ParfumDamourBuilderFormProps) {
  const [activeTab, setActiveTab] = useState<TabType>("flacon");

  const tabs: Array<{ id: TabType; label: string; icon: React.ReactNode }> = [
    { id: "flacon", label: "Etiket Flacon", icon: <Crown className="w-4 h-4" /> },
    { id: "journal", label: "Jurnal Rahasia", icon: <Scroll className="w-4 h-4" /> },
    { id: "pyramid", label: "Piramida Aroma", icon: <Droplets className="w-4 h-4" /> },
    { id: "vials", label: "4 Botol Kenangan", icon: <Heart className="w-4 h-4" /> },
    { id: "specs", label: "Karakteristik & Sillage", icon: <Sliders className="w-4 h-4" /> },
    { id: "theme", label: "Warna & Musik", icon: <Palette className="w-4 h-4" /> },
  ];

  const primaryColor = watch("primaryColor") as string;
  const secondaryColor = watch("secondaryColor") as string;
  const accentColor = watch("accentColor") as string;

  const handleApplyPresetPyramid = () => {
    setValue("topNote1Name", "Bergamot of First Glimpse");
    setValue("topNote1Desc", "Kesegaran debaran pertama saat mata kita bersitatap.");
    setValue("topNote2Name", "Sparkling Pear of Sweet Laughter");
    setValue("topNote2Desc", "Manisnya tawa renyahmu yang selalu mencairkan segala gundah duniaku.");
    setValue("topNote3Name", "Pink Pepper of Electric Touch");
    setValue("topNote3Desc", "Percikan kehangatan elektrik saat jemari kita pertama kali bertaut erat.");

    setValue("heartNote1Name", "Damask Rose of Vulnerable Whispers");
    setValue("heartNote1Desc", "Mekarnya kejujuran saat kita saling menceritakan kerapuhan hati.");
    setValue("heartNote2Name", "Midnight Jasmine of Safe Embraces");
    setValue("heartNote2Desc", "Ketenangan semerbak saat kepalamu bersandar nyaman di bahuku.");
    setValue("heartNote3Name", "French Lavender of Peaceful Solace");
    setValue("heartNote3Desc", "Rasa damai tak terkatakan saat mengetahui bahwa rumah sejatiku adalah dirimu.");

    setValue("baseNote1Name", "Warm Amber of Unshakable Devotion");
    setValue("baseNote1Desc", "Bara kesetiaan yang mengakar kuat di palung jiwaku, tak pernah pudar oleh waktu.");
    setValue("baseNote2Name", "Cedarwood of Shared Future Dreams");
    setValue("baseNote2Desc", "Kekokohan pilar mimpi rumah tangga dan masa depan yang kita bangun berdampingan.");
    setValue("baseNote3Name", "Tahitian Vanilla of Sweet Forever");
    setValue("baseNote3Desc", "Manisnya janji untuk terus menua bersama hingga hela napas terakhir.");
  };

  const getNextTab = (): TabType | null => {
    const currentIndex = tabs.findIndex((t) => t.id === activeTab);
    return currentIndex < tabs.length - 1 ? tabs[currentIndex + 1].id : null;
  };

  const getPrevTab = (): TabType | null => {
    const currentIndex = tabs.findIndex((t) => t.id === activeTab);
    return currentIndex > 0 ? tabs[currentIndex - 1].id : null;
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex overflow-x-auto no-scrollbar gap-1.5 p-1.5 rounded-xl bg-page border border-line">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all",
                isActive
                  ? "bg-surface text-ink font-semibold shadow-xs border border-line"
                  : "text-ink-soft hover:text-ink hover:bg-page-soft"
              )}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Etiket Botol Flacon */}
      {activeTab === "flacon" && (
        <div className="space-y-5">
          <div className="border-b border-line pb-3">
            <h3 className="text-sm font-semibold text-ink flex items-center gap-2">
              <Crown className="w-4 h-4 text-amber-500" />
              Bagian 1: Etiket Botol Flacon Kristal &amp; Sertifikat
            </h3>
            <p className="text-xs text-ink-muted mt-0.5">
              Identitas mahakarya parfum bespoke, nama sang muse, peracik, dan konsentrasi racikan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              id={`${idPrefix}-recipientName`}
              label="Nama Sang Kekasih (The Muse)"
              error={errors.recipientName?.message}
              required
              helperText="Sosok inspirasi di balik seluruh aroma wewangian ini"
            >
              <Input
                id={`${idPrefix}-recipientName`}
                placeholder="Aurelia Genevieve"
                {...register("recipientName")}
              />
            </Field>

            <Field
              id={`${idPrefix}-senderName`}
              label="Nama Peracik (The Master Perfumer)"
              error={errors.senderName?.message}
              required
              helperText="Sosok yang mempersembahkan formulasi parfum ini"
            >
              <Input
                id={`${idPrefix}-senderName`}
                placeholder="Julian de Valois"
                {...register("senderName")}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              id={`${idPrefix}-perfumeName`}
              label="Nama Mahakarya Parfum"
              error={errors.perfumeName?.message}
            >
              <Input
                id={`${idPrefix}-perfumeName`}
                placeholder="L'Éternel Rendez-Vous"
                {...register("perfumeName")}
              />
            </Field>

            <Field
              id={`${idPrefix}-flaconBatchNo`}
              label="Nomor Seri Formula"
              error={errors.flaconBatchNo?.message}
            >
              <Input
                id={`${idPrefix}-flaconBatchNo`}
                placeholder="N°07-AMOUR-ETERNEL"
                {...register("flaconBatchNo")}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field
              id={`${idPrefix}-perfumeConcentration`}
              label="Konsentrasi Racikan"
              error={errors.perfumeConcentration?.message}
            >
              <Input
                id={`${idPrefix}-perfumeConcentration`}
                placeholder="Extrait de Parfum • 100% Pure Devotion"
                {...register("perfumeConcentration")}
              />
            </Field>

            <Field
              id={`${idPrefix}-formulationDate`}
              label="Tanggal Formulasi"
              error={errors.formulationDate?.message}
            >
              <Input
                id={`${idPrefix}-formulationDate`}
                placeholder="Malam Saat Jiwa Ini Terpikat Selamanya"
                {...register("formulationDate")}
              />
            </Field>

            <Field
              id={`${idPrefix}-atelierLocation`}
              label="Lokasi Rumah Parfum"
              error={errors.atelierLocation?.message}
            >
              <Input
                id={`${idPrefix}-atelierLocation`}
                placeholder="Atelier de Lettera • Place Vendôme, Paris"
                {...register("atelierLocation")}
              />
            </Field>
          </div>

          <Field
            id={`${idPrefix}-dedicationQuote`}
            label="Dedikasi Khusus untuk Sang Muse"
            error={errors.dedicationQuote?.message}
            helperText="Kalimat dedikasi puitis yang dicetak pada lempeng emas botol parfum"
          >
            <Textarea
              id={`${idPrefix}-dedicationQuote`}
              rows={2}
              placeholder="Untuk jiwa yang kehadirannya adalah wewangian terindah..."
              {...register("dedicationQuote")}
            />
          </Field>
        </div>
      )}

      {/* Tab 2: Jurnal Rahasia Perfumer */}
      {activeTab === "journal" && (
        <div className="space-y-5">
          <div className="border-b border-line pb-3">
            <h3 className="text-sm font-semibold text-ink flex items-center gap-2">
              <Scroll className="w-4 h-4 text-amber-500" />
              Bagian 2: Jurnal Rahasia Perfumer (The Private Journal)
            </h3>
            <p className="text-xs text-ink-muted mt-0.5">
              Surat cinta mendalam di lembaran kertas linen Paris, merangkai filosofi aroma kehadiran sang kekasih.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              id={`${idPrefix}-letterTitle`}
              label="Judul Surat Jurnal"
              error={errors.letterTitle?.message}
            >
              <Input
                id={`${idPrefix}-letterTitle`}
                placeholder="Formulasi Rahasia di Balik Setiap Detak Jantungku"
                {...register("letterTitle")}
              />
            </Field>

            <Field
              id={`${idPrefix}-letterDate`}
              label="Tanggal Surat Ditulis"
              error={errors.letterDate?.message}
            >
              <Input
                id={`${idPrefix}-letterDate`}
                placeholder="Paris, Di Bawah Cahaya Rembulan & Semerbak Melati"
                {...register("letterDate")}
              />
            </Field>
          </div>

          <Field
            id={`${idPrefix}-mainMessage`}
            label="Isi Surat Cinta Romantis"
            error={errors.mainMessage?.message}
            helperText="Uraikan bagaimana kehadiran, tawa, tatapan, dan debaran cinta sang kekasih meramu formula paling berharga di hidupmu"
          >
            <Textarea
              id={`${idPrefix}-mainMessage`}
              rows={8}
              placeholder="Tuliskan surat cinta romantis..."
              {...register("mainMessage")}
            />
          </Field>

          <Field
            id={`${idPrefix}-letterSignoff`}
            label="Kalimat Penutup Surat"
            error={errors.letterSignoff?.message}
          >
            <Input
              id={`${idPrefix}-letterSignoff`}
              placeholder="Dengan seluruh aroma rindu yang tak pernah pudar,"
              {...register("letterSignoff")}
            />
          </Field>
        </div>
      )}

      {/* Tab 3: Piramida Aroma 3 Tingkat */}
      {activeTab === "pyramid" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-line pb-3">
            <div>
              <h3 className="text-sm font-semibold text-ink flex items-center gap-2">
                <Droplets className="w-4 h-4 text-amber-500" />
                Bagian 3: Piramida Aroma 3 Tingkat (Top, Heart, Base)
              </h3>
              <p className="text-xs text-ink-muted mt-0.5">
                Harmoni aroma pembuka, inti gelora cinta, dan fondasi kesetiaan abadi.
              </p>
            </div>
            <button
              type="button"
              onClick={handleApplyPresetPyramid}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Gunakan Formula Piramida Paris
            </button>
          </div>

          {/* Top Notes */}
          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900 block">
              1. Top Notes (Aroma Pembuka • 15 Menit Pertama)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-2">
                <Field id={`${idPrefix}-topNote1Name`} label="Top Note 1">
                  <Input id={`${idPrefix}-topNote1Name`} {...register("topNote1Name")} />
                </Field>
                <Field id={`${idPrefix}-topNote1Desc`} label="Makna Rasa">
                  <Input id={`${idPrefix}-topNote1Desc`} {...register("topNote1Desc")} />
                </Field>
              </div>

              <div className="space-y-2">
                <Field id={`${idPrefix}-topNote2Name`} label="Top Note 2">
                  <Input id={`${idPrefix}-topNote2Name`} {...register("topNote2Name")} />
                </Field>
                <Field id={`${idPrefix}-topNote2Desc`} label="Makna Rasa">
                  <Input id={`${idPrefix}-topNote2Desc`} {...register("topNote2Desc")} />
                </Field>
              </div>

              <div className="space-y-2">
                <Field id={`${idPrefix}-topNote3Name`} label="Top Note 3">
                  <Input id={`${idPrefix}-topNote3Name`} {...register("topNote3Name")} />
                </Field>
                <Field id={`${idPrefix}-topNote3Desc`} label="Makna Rasa">
                  <Input id={`${idPrefix}-topNote3Desc`} {...register("topNote3Desc")} />
                </Field>
              </div>
            </div>
          </div>

          {/* Heart Notes */}
          <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/40 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-900 block">
              2. Heart Notes (Aroma Inti • Gelora Emosi Mendalam)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-2">
                <Field id={`${idPrefix}-heartNote1Name`} label="Heart Note 1">
                  <Input id={`${idPrefix}-heartNote1Name`} {...register("heartNote1Name")} />
                </Field>
                <Field id={`${idPrefix}-heartNote1Desc`} label="Makna Rasa">
                  <Input id={`${idPrefix}-heartNote1Desc`} {...register("heartNote1Desc")} />
                </Field>
              </div>

              <div className="space-y-2">
                <Field id={`${idPrefix}-heartNote2Name`} label="Heart Note 2">
                  <Input id={`${idPrefix}-heartNote2Name`} {...register("heartNote2Name")} />
                </Field>
                <Field id={`${idPrefix}-heartNote2Desc`} label="Makna Rasa">
                  <Input id={`${idPrefix}-heartNote2Desc`} {...register("heartNote2Desc")} />
                </Field>
              </div>

              <div className="space-y-2">
                <Field id={`${idPrefix}-heartNote3Name`} label="Heart Note 3">
                  <Input id={`${idPrefix}-heartNote3Name`} {...register("heartNote3Name")} />
                </Field>
                <Field id={`${idPrefix}-heartNote3Desc`} label="Makna Rasa">
                  <Input id={`${idPrefix}-heartNote3Desc`} {...register("heartNote3Desc")} />
                </Field>
              </div>
            </div>
          </div>

          {/* Base Notes */}
          <div className="p-4 rounded-xl border border-amber-300 bg-amber-100/40 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-950 block">
              3. Base Notes (Aroma Dasar • Fondasi Keabadian)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-2">
                <Field id={`${idPrefix}-baseNote1Name`} label="Base Note 1">
                  <Input id={`${idPrefix}-baseNote1Name`} {...register("baseNote1Name")} />
                </Field>
                <Field id={`${idPrefix}-baseNote1Desc`} label="Makna Rasa">
                  <Input id={`${idPrefix}-baseNote1Desc`} {...register("baseNote1Desc")} />
                </Field>
              </div>

              <div className="space-y-2">
                <Field id={`${idPrefix}-baseNote2Name`} label="Base Note 2">
                  <Input id={`${idPrefix}-baseNote2Name`} {...register("baseNote2Name")} />
                </Field>
                <Field id={`${idPrefix}-baseNote2Desc`} label="Makna Rasa">
                  <Input id={`${idPrefix}-baseNote2Desc`} {...register("baseNote2Desc")} />
                </Field>
              </div>

              <div className="space-y-2">
                <Field id={`${idPrefix}-baseNote3Name`} label="Base Note 3">
                  <Input id={`${idPrefix}-baseNote3Name`} {...register("baseNote3Name")} />
                </Field>
                <Field id={`${idPrefix}-baseNote3Desc`} label="Makna Rasa">
                  <Input id={`${idPrefix}-baseNote3Desc`} {...register("baseNote3Desc")} />
                </Field>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: 4 Botol Kenangan Aroma */}
      {activeTab === "vials" && (
        <div className="space-y-6">
          <div className="border-b border-line pb-3">
            <h3 className="text-sm font-semibold text-ink flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-500" />
              Bagian 4: 4 Botol Kenangan Aroma (Olfactory Snapshots)
            </h3>
            <p className="text-xs text-ink-muted mt-0.5">
              Empat rekaman memori indah yang memiliki aroma khas tak terlupakan.
            </p>
          </div>

          {/* Vial 1 */}
          <div className="p-4 rounded-xl border border-line bg-page-soft space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-ink block">
              Botol Kenangan I
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field id={`${idPrefix}-vial1Title`} label="Nama Kenangan">
                <Input id={`${idPrefix}-vial1Title`} {...register("vial1Title")} />
              </Field>
              <Field id={`${idPrefix}-vial1Season`} label="Momen / Waktu">
                <Input id={`${idPrefix}-vial1Season`} {...register("vial1Season")} />
              </Field>
            </div>
            <Field id={`${idPrefix}-vial1Memory`} label="Narasi Kenangan">
              <Textarea id={`${idPrefix}-vial1Memory`} rows={2} {...register("vial1Memory")} />
            </Field>
            <Field id={`${idPrefix}-vial1ScentNotes`} label="Jejak Aroma Khas">
              <Input id={`${idPrefix}-vial1ScentNotes`} {...register("vial1ScentNotes")} />
            </Field>
          </div>

          {/* Vial 2 */}
          <div className="p-4 rounded-xl border border-line bg-page-soft space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-ink block">
              Botol Kenangan II
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field id={`${idPrefix}-vial2Title`} label="Nama Kenangan">
                <Input id={`${idPrefix}-vial2Title`} {...register("vial2Title")} />
              </Field>
              <Field id={`${idPrefix}-vial2Season`} label="Momen / Waktu">
                <Input id={`${idPrefix}-vial2Season`} {...register("vial2Season")} />
              </Field>
            </div>
            <Field id={`${idPrefix}-vial2Memory`} label="Narasi Kenangan">
              <Textarea id={`${idPrefix}-vial2Memory`} rows={2} {...register("vial2Memory")} />
            </Field>
            <Field id={`${idPrefix}-vial2ScentNotes`} label="Jejak Aroma Khas">
              <Input id={`${idPrefix}-vial2ScentNotes`} {...register("vial2ScentNotes")} />
            </Field>
          </div>

          {/* Vial 3 */}
          <div className="p-4 rounded-xl border border-line bg-page-soft space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-ink block">
              Botol Kenangan III
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field id={`${idPrefix}-vial3Title`} label="Nama Kenangan">
                <Input id={`${idPrefix}-vial3Title`} {...register("vial3Title")} />
              </Field>
              <Field id={`${idPrefix}-vial3Season`} label="Momen / Waktu">
                <Input id={`${idPrefix}-vial3Season`} {...register("vial3Season")} />
              </Field>
            </div>
            <Field id={`${idPrefix}-vial3Memory`} label="Narasi Kenangan">
              <Textarea id={`${idPrefix}-vial3Memory`} rows={2} {...register("vial3Memory")} />
            </Field>
            <Field id={`${idPrefix}-vial3ScentNotes`} label="Jejak Aroma Khas">
              <Input id={`${idPrefix}-vial3ScentNotes`} {...register("vial3ScentNotes")} />
            </Field>
          </div>

          {/* Vial 4 */}
          <div className="p-4 rounded-xl border border-line bg-page-soft space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-ink block">
              Botol Kenangan IV
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field id={`${idPrefix}-vial4Title`} label="Nama Kenangan">
                <Input id={`${idPrefix}-vial4Title`} {...register("vial4Title")} />
              </Field>
              <Field id={`${idPrefix}-vial4Season`} label="Momen / Waktu">
                <Input id={`${idPrefix}-vial4Season`} {...register("vial4Season")} />
              </Field>
            </div>
            <Field id={`${idPrefix}-vial4Memory`} label="Narasi Kenangan">
              <Textarea id={`${idPrefix}-vial4Memory`} rows={2} {...register("vial4Memory")} />
            </Field>
            <Field id={`${idPrefix}-vial4ScentNotes`} label="Jejak Aroma Khas">
              <Input id={`${idPrefix}-vial4ScentNotes`} {...register("vial4ScentNotes")} />
            </Field>
          </div>
        </div>
      )}

      {/* Tab 5: Karakteristik & Sillage */}
      {activeTab === "specs" && (
        <div className="space-y-5">
          <div className="border-b border-line pb-3">
            <h3 className="text-sm font-semibold text-ink flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-500" />
              Bagian 5: Karakteristik &amp; Daya Tahan Racikan
            </h3>
            <p className="text-xs text-ink-muted mt-0.5">
              Metrik sillage, longevity, dan signature accord cinta abadi.
            </p>
          </div>

          <Field
            id={`${idPrefix}-sillageRating`}
            label="Sillage (Jejak Keharuman Jiwa)"
            error={errors.sillageRating?.message}
            helperText="Bagaimana kehadiran kekasih memenuhi setiap ruang jiwamu"
          >
            <Input id={`${idPrefix}-sillageRating`} {...register("sillageRating")} />
          </Field>

          <Field
            id={`${idPrefix}-longevityRating`}
            label="Longevity (Daya Tahan Cinta)"
            error={errors.longevityRating?.message}
            helperText="Seberapa lama cinta ini akan bertahan"
          >
            <Input id={`${idPrefix}-longevityRating`} {...register("longevityRating")} />
          </Field>

          <Field
            id={`${idPrefix}-seasonality`}
            label="Kesesuaian Musim"
            error={errors.seasonality?.message}
            helperText="Cocok untuk musim apa saja cinta kalian bersemi"
          >
            <Input id={`${idPrefix}-seasonality`} {...register("seasonality")} />
          </Field>

          <Field
            id={`${idPrefix}-signatureAccord`}
            label="Signature Accord Utama"
            error={errors.signatureAccord?.message}
            helperText="Karakteristik aroma paling mendominasi dari ikatan kalian"
          >
            <Input id={`${idPrefix}-signatureAccord`} {...register("signatureAccord")} />
          </Field>
        </div>
      )}

      {/* Tab 6: Warna, Semprotan & Musik */}
      {activeTab === "theme" && (
        <div className="space-y-6">
          <div className="border-b border-line pb-3">
            <h3 className="text-sm font-semibold text-ink flex items-center gap-2">
              <Palette className="w-4 h-4 text-amber-500" />
              Bagian 6: Tombol Semprotan, Warna &amp; Melodi Paris
            </h3>
            <p className="text-xs text-ink-muted mt-0.5">
              Kustomisasi tombol semprotan aroma emas dan pemutar melodi waltz romantis.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              id={`${idPrefix}-spritzButtonText`}
              label="Teks Tombol Semprotan"
              error={errors.spritzButtonText?.message}
            >
              <Input
                id={`${idPrefix}-spritzButtonText`}
                placeholder="Semprotkan Parfum Cinta"
                {...register("spritzButtonText")}
              />
            </Field>

            <Field
              id={`${idPrefix}-spritzSuccessMessage`}
              label="Pesan Saat Semprotan Disentuh"
              error={errors.spritzSuccessMessage?.message}
            >
              <Input
                id={`${idPrefix}-spritzSuccessMessage`}
                placeholder="Kabut wewangian emas merebak..."
                {...register("spritzSuccessMessage")}
              />
            </Field>
          </div>

          {/* Color pickers - Setiap Bagian Memiliki Box Tersendiri Secara Vertikal */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
              <ColorPickerField
                label="Warna Emas Sampanye"
                value={primaryColor || "#e6c587"}
                onChange={(val) => setValue("primaryColor", val)}
                presets={[
                  { label: "Champagne Gold", value: "#e6c587" },
                  { label: "Versailles Gold", value: "#d4af37" },
                  { label: "Amber Glow", value: "#f59e0b" },
                  { label: "Pale Gold", value: "#fef08a" },
                ]}
              />
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
              <ColorPickerField
                label="Warna Mawar Anggun"
                value={secondaryColor || "#d47a88"}
                onChange={(val) => setValue("secondaryColor", val)}
                presets={[
                  { label: "Dusty Rose", value: "#d47a88" },
                  { label: "French Rose", value: "#f43f5e" },
                  { label: "Velvet Crimson", value: "#9f1239" },
                  { label: "Petal Pink", value: "#fda4af" },
                ]}
              />
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
              <ColorPickerField
                label="Warna Aksen Kristal"
                value={accentColor || "#f59e0b"}
                onChange={(val) => setValue("accentColor", val)}
                presets={[
                  { label: "Flacon Amber", value: "#f59e0b" },
                  { label: "Crystal Blue", value: "#93c5fd" },
                  { label: "Emerald Glass", value: "#34d399" },
                  { label: "Gilded Bronze", value: "#b45309" },
                ]}
              />
            </div>
          </div>

          {/* Pengaturan Audio Musik dalam Box Tersendiri */}
          <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs space-y-4">
            <Field
              id={`${idPrefix}-musicTrack`}
              label="URL Audio Musik Waltz Paris (Opsional)"
              error={errors.musicTrack?.message}
              helperText="Tautan file audio MP3/WAV berdurasi tenang untuk menemani proses pembacaan surat"
            >
              <Input
                id={`${idPrefix}-musicTrack`}
                placeholder="https://.../paris-romance-waltz.mp3"
                {...register("musicTrack")}
              />
            </Field>
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-line">
        {getPrevTab() ? (
          <button
            type="button"
            onClick={() => {
              const prev = getPrevTab();
              if (prev) setActiveTab(prev);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-line text-xs font-medium text-ink hover:bg-page transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Sebelumnya
          </button>
        ) : (
          <div />
        )}

        {getNextTab() ? (
          <button
            type="button"
            onClick={() => {
              const next = getNextTab();
              if (next) setActiveTab(next);
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-seal-600 hover:bg-seal-700 text-white text-xs font-medium transition-colors"
          >
            Lanjut
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
