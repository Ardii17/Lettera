"use client";

import { useState } from "react";
import type {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  FieldErrors,
} from "react-hook-form";
import {
  ThermometerSnowflake,
  Scroll,
  Snowflake,
  Flame,
  Flower2,
  Palette,
  ChevronRight,
  ChevronLeft,
  Sparkles,
} from "lucide-react";
import { Field, Input, Textarea } from "@/components/ui/field";
import { ColorPickerField } from "@/components/ui/color-picker-field";
import { cn } from "@/lib/utils/cn";
import type { LetterFormValues } from "./dynamic-form";

interface SolsticeThawBuilderFormProps {
  register: UseFormRegister<LetterFormValues>;
  setValue: UseFormSetValue<LetterFormValues>;
  watch: UseFormWatch<LetterFormValues>;
  errors: FieldErrors<LetterFormValues>;
  idPrefix?: string;
}

type TabType =
  | "log"
  | "epistle"
  | "frosts"
  | "hearthfires"
  | "snowdrops"
  | "theme";

export function SolsticeThawBuilderForm({
  register,
  setValue,
  watch,
  errors,
  idPrefix = "solstice-thaw",
}: SolsticeThawBuilderFormProps) {
  const [activeTab, setActiveTab] = useState<TabType>("log");

  const tabs: Array<{ id: TabType; label: string; icon: React.ReactNode }> = [
    { id: "log", label: "Catatan Titik Nol", icon: <ThermometerSnowflake className="w-4 h-4" /> },
    { id: "epistle", label: "Surat di Kaca", icon: <Scroll className="w-4 h-4" /> },
    { id: "frosts", label: "4 Kristal Es", icon: <Snowflake className="w-4 h-4" /> },
    { id: "hearthfires", label: "3 Api Perapian", icon: <Flame className="w-4 h-4" /> },
    { id: "snowdrops", label: "4 Tunas Salju", icon: <Flower2 className="w-4 h-4" /> },
    { id: "theme", label: "Warna & Musik", icon: <Palette className="w-4 h-4" /> },
  ];

  const primaryColor = watch("primaryColor") as string;
  const secondaryColor = watch("secondaryColor") as string;
  const accentColor = watch("accentColor") as string;

  const handleApplyPresetFrosts = () => {
    setValue("frost1Title", "The Blizzard of Piercing Words");
    setValue("frost1Temp", "-15°C Sharp Frost");
    setValue(
      "frost1Confession",
      "Aku melontarkan kata-kata tajam dengan intonasi meninggi di saat aku seharusnya menurunkan ego dan mendengarkan."
    );
    setValue(
      "frost1Impact",
      "Membuatmu merasa tidak dihargai, takut berbicara jujur, dan terpaksa menarik diri ke dalam kesedihan."
    );

    setValue("frost2Title", "The Permafrost of Broken Attentiveness");
    setValue("frost2Temp", "-22°C Frozen Presence");
    setValue(
      "frost2Confession",
      "Aku terlalu tenggelam dalam layar gadget dan kesibukan duniaku sendiri saat kamu membutuhkan kehadiranku."
    );
    setValue(
      "frost2Impact",
      "Membuatmu merasa kesepian di tengah kebersamaan kita dan bebanmu dianggap sepele."
    );

    setValue("frost3Title", "The Glacial Wall of Defensive Pride");
    setValue("frost3Temp", "-28°C Impenetrable Glacier");
    setValue(
      "frost3Confession",
      "Saat kamu mengutarakan kekecewaanmu, naluri pertamaku justru memasang dinding pembelaan diri bukannya merangkul luka."
    );
    setValue(
      "frost3Impact",
      "Menghancurkan rasa aman untuk berkomunikasi dan membuat lukamu berlipat ganda."
    );

    setValue("frost4Title", "The Long Polar Night of Silence");
    setValue("frost4Temp", "-35°C Polar Freeze");
    setValue(
      "frost4Confession",
      "Aku memilih membisu berjam-jam (silent treatment) dan membiarkan ketegangan menggantung tanpa kepastian."
    );
    setValue(
      "frost4Impact",
      "Menimbulkan kecemasan berlebih, rasa terasing, dan ketidakpastian batin yang melelahkan."
    );
  };

  const handleApplyPresetFires = () => {
    setValue("hearthfire1Title", "The Flame of Gentle Tenderness");
    setValue("hearthfire1Subtitle", "Komitmen Kelembutan Nada Bicara");
    setValue(
      "hearthfire1Promise",
      "Aku bersumpah tidak akan pernah lagi melontarkan kalimat dengan intonasi tinggi atau nada mencemooh. Aku hanya akan berbicara dengan kelembutan yang merangkul."
    );
    setValue(
      "hearthfire1Action",
      "Menurunkan nada bicara, menatap matamu dengan penuh kasih, dan selalu memvalidasi perasaanmu."
    );

    setValue("hearthfire2Title", "The Flame of Prompt Warmth");
    setValue("hearthfire2Subtitle", "Pantangan Sikap Membisu (No Silent Treatment)");
    setValue(
      "hearthfire2Promise",
      "Aku berjanji tidak akan pernah membiarkan matahari terbenam dengan kesunyian yang membeku tanpa penyelesaian."
    );
    setValue(
      "hearthfire2Action",
      "Komunikasi transparan dalam waktu maksimal 60 menit, memeluk duluan, dan membuka ruang dialog jujur."
    );

    setValue("hearthfire3Title", "The Flame of Patient Thawing");
    setValue("hearthfire3Subtitle", "Kesabaran Memulihkan Kepercayaan");
    setValue(
      "hearthfire3Promise",
      "Aku mengerti bahwa es di hatimu membutuhkan waktu untuk meleleh secara alami. Aku akan konsisten membuktikan ketulusanku melalui tindakan setiap hari."
    );
    setValue(
      "hearthfire3Action",
      "Menghargai tempo pemulihan hatimu tanpa keluhan, selalu hadir mendampingi, dan konsisten merawat rasa nyaman."
    );
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

      {/* Tab 1: Catatan Titik Nol (Glacial Disconnection Log) */}
      {activeTab === "log" && (
        <div className="space-y-5">
          <div className="border-b border-line pb-3">
            <h3 className="text-sm font-semibold text-ink flex items-center gap-2">
              <ThermometerSnowflake className="w-4 h-4 text-sky-500" />
              Bagian 1: Catatan Suhu Beku &amp; Titik Nol
            </h3>
            <p className="text-xs text-ink-muted mt-0.5">
              Identitas penerima maaf, pemohon maaf, dan pengakuan tanggung jawab penjaga perapian tanpa dalih.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              id={`${idPrefix}-recipientName`}
              label="Nama Penerima Maaf"
              error={errors.recipientName?.message}
              required
              helperText="Sosok yang hatinya terluka dan kedinginan"
            >
              <Input
                id={`${idPrefix}-recipientName`}
                placeholder="Clarissa Amanda"
                {...register("recipientName")}
              />
            </Field>

            <Field
              id={`${idPrefix}-senderName`}
              label="Nama Pemohon Maaf"
              error={errors.senderName?.message}
              required
              helperText="Sosok penjaga perapian yang memohon maaf"
            >
              <Input
                id={`${idPrefix}-senderName`}
                placeholder="Arkananta"
                {...register("senderName")}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field
              id={`${idPrefix}-freezeRecordNo`}
              label="Nomor Catatan Beku"
              error={errors.freezeRecordNo?.message}
            >
              <Input
                id={`${idPrefix}-freezeRecordNo`}
                placeholder="SOLSTICE-THAW-2024"
                {...register("freezeRecordNo")}
              />
            </Field>

            <Field
              id={`${idPrefix}-coldestHour`}
              label="Waktu Terjadinya Kebekuan"
              error={errors.coldestHour?.message}
            >
              <Input
                id={`${idPrefix}-coldestHour`}
                placeholder="Malam Terdingin Saat Keheningan Membeku"
                {...register("coldestHour")}
              />
            </Field>

            <Field
              id={`${idPrefix}-frostSeverity`}
              label="Tingkat Suhu Beku"
              error={errors.frostSeverity?.message}
            >
              <Input
                id={`${idPrefix}-frostSeverity`}
                placeholder="Sub-Zero Bitter Frost (-18°C)"
                {...register("frostSeverity")}
              />
            </Field>
          </div>

          <Field
            id={`${idPrefix}-frostLocation`}
            label="Ranah / Tempat Terjadinya Kebekuan"
            error={errors.frostLocation?.message}
          >
            <Input
              id={`${idPrefix}-frostLocation`}
              placeholder="The Frozen Valley of Misunderstandings"
              {...register("frostLocation")}
            />
          </Field>

          <Field
            id={`${idPrefix}-hearthkeeperPledge`}
            label="Ikrar Tanggung Jawab Penjaga Perapian"
            error={errors.hearthkeeperPledge?.message}
            helperText="Pengakuan kesalahan mutlak tanpa mencari pembenaran cuaca atau situasi luar"
          >
            <Textarea
              id={`${idPrefix}-hearthkeeperPledge`}
              rows={3}
              placeholder="Bukan badai musim dingin di luar yang membekukan ruang ini..."
              {...register("hearthkeeperPledge")}
            />
          </Field>
        </div>
      )}

      {/* Tab 2: Surat di Kaca Berembun (Frosted Glass Epistle) */}
      {activeTab === "epistle" && (
        <div className="space-y-5">
          <div className="border-b border-line pb-3">
            <h3 className="text-sm font-semibold text-ink flex items-center gap-2">
              <Scroll className="w-4 h-4 text-sky-500" />
              Bagian 2: Surat Pengakuan di Balik Kaca Berembun
            </h3>
            <p className="text-xs text-ink-muted mt-0.5">
              Surat penyesalan mendalam bergaya tulisan jemari di atas kaca berembun untuk menghapus jarak dingin.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              id={`${idPrefix}-letterTitle`}
              label="Judul Surat Pengakuan"
              error={errors.letterTitle?.message}
            >
              <Input
                id={`${idPrefix}-letterTitle`}
                placeholder="Menghapus Embun Dingin di Antara Kita"
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
                placeholder="Fajar Titik Balik Musim Dingin"
                {...register("letterDate")}
              />
            </Field>
          </div>

          <Field
            id={`${idPrefix}-mainMessage`}
            label="Isi Surat Penyesalan Terdalam"
            error={errors.mainMessage?.message}
            helperText="Tuliskan refleksi, rasa bersalah, dan permohonan tulus untuk diizinkan menyalakan kembali kehangatan"
          >
            <Textarea
              id={`${idPrefix}-mainMessage`}
              rows={8}
              placeholder="Tuliskan isi surat pengakuanmu..."
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
              placeholder="Dengan jemari hangat yang selalu menantimu di dekat perapian,"
              {...register("letterSignoff")}
            />
          </Field>
        </div>
      )}

      {/* Tab 3: 4 Kristal Es Kesalahan */}
      {activeTab === "frosts" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-line pb-3">
            <div>
              <h3 className="text-sm font-semibold text-ink flex items-center gap-2">
                <Snowflake className="w-4 h-4 text-sky-500" />
                Bagian 3: 4 Kristal Es Pembeku Hubungan &amp; Refleksi Jujur
              </h3>
              <p className="text-xs text-ink-muted mt-0.5">
                Pengakuan 4 peristiwa beku dan analisis luka batin yang dirasakan pasangan.
              </p>
            </div>
            <button
              type="button"
              onClick={handleApplyPresetFrosts}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Gunakan Contoh Kristal Es
            </button>
          </div>

          {/* Frost 1 */}
          <div className="p-4 rounded-xl border border-sky-200 bg-sky-50/40 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700 block">
              Kristal Es 01 (Badai Kata Tajam)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field id={`${idPrefix}-frost1Title`} label="Nama Kesalahan">
                <Input id={`${idPrefix}-frost1Title`} {...register("frost1Title")} />
              </Field>
              <Field id={`${idPrefix}-frost1Temp`} label="Derajat Suhu Beku">
                <Input id={`${idPrefix}-frost1Temp`} {...register("frost1Temp")} />
              </Field>
            </div>
            <Field id={`${idPrefix}-frost1Confession`} label="Pengakuan Kesalahan">
              <Textarea id={`${idPrefix}-frost1Confession`} rows={2} {...register("frost1Confession")} />
            </Field>
            <Field id={`${idPrefix}-frost1Impact`} label="Dampak Luka Batin">
              <Input id={`${idPrefix}-frost1Impact`} {...register("frost1Impact")} />
            </Field>
          </div>

          {/* Frost 2 */}
          <div className="p-4 rounded-xl border border-sky-200 bg-sky-50/40 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700 block">
              Kristal Es 02 (Kelalaian Menyimak)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field id={`${idPrefix}-frost2Title`} label="Nama Kesalahan">
                <Input id={`${idPrefix}-frost2Title`} {...register("frost2Title")} />
              </Field>
              <Field id={`${idPrefix}-frost2Temp`} label="Derajat Suhu Beku">
                <Input id={`${idPrefix}-frost2Temp`} {...register("frost2Temp")} />
              </Field>
            </div>
            <Field id={`${idPrefix}-frost2Confession`} label="Pengakuan Kesalahan">
              <Textarea id={`${idPrefix}-frost2Confession`} rows={2} {...register("frost2Confession")} />
            </Field>
            <Field id={`${idPrefix}-frost2Impact`} label="Dampak Luka Batin">
              <Input id={`${idPrefix}-frost2Impact`} {...register("frost2Impact")} />
            </Field>
          </div>

          {/* Frost 3 */}
          <div className="p-4 rounded-xl border border-sky-200 bg-sky-50/40 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700 block">
              Kristal Es 03 (Dinding Es Ego Membela Diri)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field id={`${idPrefix}-frost3Title`} label="Nama Kesalahan">
                <Input id={`${idPrefix}-frost3Title`} {...register("frost3Title")} />
              </Field>
              <Field id={`${idPrefix}-frost3Temp`} label="Derajat Suhu Beku">
                <Input id={`${idPrefix}-frost3Temp`} {...register("frost3Temp")} />
              </Field>
            </div>
            <Field id={`${idPrefix}-frost3Confession`} label="Pengakuan Kesalahan">
              <Textarea id={`${idPrefix}-frost3Confession`} rows={2} {...register("frost3Confession")} />
            </Field>
            <Field id={`${idPrefix}-frost3Impact`} label="Dampak Luka Batin">
              <Input id={`${idPrefix}-frost3Impact`} {...register("frost3Impact")} />
            </Field>
          </div>

          {/* Frost 4 */}
          <div className="p-4 rounded-xl border border-sky-200 bg-sky-50/40 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700 block">
              Kristal Es 04 (Malam Kutub Membisu / Silent Treatment)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field id={`${idPrefix}-frost4Title`} label="Nama Kesalahan">
                <Input id={`${idPrefix}-frost4Title`} {...register("frost4Title")} />
              </Field>
              <Field id={`${idPrefix}-frost4Temp`} label="Derajat Suhu Beku">
                <Input id={`${idPrefix}-frost4Temp`} {...register("frost4Temp")} />
              </Field>
            </div>
            <Field id={`${idPrefix}-frost4Confession`} label="Pengakuan Kesalahan">
              <Textarea id={`${idPrefix}-frost4Confession`} rows={2} {...register("frost4Confession")} />
            </Field>
            <Field id={`${idPrefix}-frost4Impact`} label="Dampak Luka Batin">
              <Input id={`${idPrefix}-frost4Impact`} {...register("frost4Impact")} />
            </Field>
          </div>
        </div>
      )}

      {/* Tab 4: 3 Api Perapian Pelebur Es */}
      {activeTab === "hearthfires" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-line pb-3">
            <div>
              <h3 className="text-sm font-semibold text-ink flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-500" />
                Bagian 4: 3 Api Perapian Komitmen Perdamaian
              </h3>
              <p className="text-xs text-ink-muted mt-0.5">
                Tiga ikrar nyata penjaga perapian agar hubungan tak lagi dibiarkan membeku.
              </p>
            </div>
            <button
              type="button"
              onClick={handleApplyPresetFires}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Gunakan Contoh Api Perapian
            </button>
          </div>

          {/* Fire 1 */}
          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block">
              Api Perapian 01 (Kelembutan Nada Bicara)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field id={`${idPrefix}-hearthfire1Title`} label="Nama Janji Api">
                <Input id={`${idPrefix}-hearthfire1Title`} {...register("hearthfire1Title")} />
              </Field>
              <Field id={`${idPrefix}-hearthfire1Subtitle`} label="Subjudul Janji">
                <Input id={`${idPrefix}-hearthfire1Subtitle`} {...register("hearthfire1Subtitle")} />
              </Field>
            </div>
            <Field id={`${idPrefix}-hearthfire1Promise`} label="Ikrar Komitmen">
              <Textarea id={`${idPrefix}-hearthfire1Promise`} rows={2} {...register("hearthfire1Promise")} />
            </Field>
            <Field id={`${idPrefix}-hearthfire1Action`} label="Bukti Tindakan Nyata Sehari-hari">
              <Input id={`${idPrefix}-hearthfire1Action`} {...register("hearthfire1Action")} />
            </Field>
          </div>

          {/* Fire 2 */}
          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block">
              Api Perapian 02 (Pantangan Sikap Membisu)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field id={`${idPrefix}-hearthfire2Title`} label="Nama Janji Api">
                <Input id={`${idPrefix}-hearthfire2Title`} {...register("hearthfire2Title")} />
              </Field>
              <Field id={`${idPrefix}-hearthfire2Subtitle`} label="Subjudul Janji">
                <Input id={`${idPrefix}-hearthfire2Subtitle`} {...register("hearthfire2Subtitle")} />
              </Field>
            </div>
            <Field id={`${idPrefix}-hearthfire2Promise`} label="Ikrar Komitmen">
              <Textarea id={`${idPrefix}-hearthfire2Promise`} rows={2} {...register("hearthfire2Promise")} />
            </Field>
            <Field id={`${idPrefix}-hearthfire2Action`} label="Bukti Tindakan Nyata Sehari-hari">
              <Input id={`${idPrefix}-hearthfire2Action`} {...register("hearthfire2Action")} />
            </Field>
          </div>

          {/* Fire 3 */}
          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block">
              Api Perapian 03 (Kesabaran Memulihkan Kepercayaan)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field id={`${idPrefix}-hearthfire3Title`} label="Nama Janji Api">
                <Input id={`${idPrefix}-hearthfire3Title`} {...register("hearthfire3Title")} />
              </Field>
              <Field id={`${idPrefix}-hearthfire3Subtitle`} label="Subjudul Janji">
                <Input id={`${idPrefix}-hearthfire3Subtitle`} {...register("hearthfire3Subtitle")} />
              </Field>
            </div>
            <Field id={`${idPrefix}-hearthfire3Promise`} label="Ikrar Komitmen">
              <Textarea id={`${idPrefix}-hearthfire3Promise`} rows={2} {...register("hearthfire3Promise")} />
            </Field>
            <Field id={`${idPrefix}-hearthfire3Action`} label="Bukti Tindakan Nyata Sehari-hari">
              <Input id={`${idPrefix}-hearthfire3Action`} {...register("hearthfire3Action")} />
            </Field>
          </div>
        </div>
      )}

      {/* Tab 5: 4 Tunas Bunga Salju */}
      {activeTab === "snowdrops" && (
        <div className="space-y-6">
          <div className="border-b border-line pb-3">
            <h3 className="text-sm font-semibold text-ink flex items-center gap-2">
              <Flower2 className="w-4 h-4 text-emerald-500" />
              Bagian 5: 4 Tunas Bunga Salju &amp; Kenangan Hangat
            </h3>
            <p className="text-xs text-ink-muted mt-0.5">
              Empat kenangan dan harapan indah yang membuktikan mengapa ikatan ini pantas untuk diselamatkan.
            </p>
          </div>

          {/* Snowdrop 1 */}
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
              Tunas Salju I
            </span>
            <Field id={`${idPrefix}-snowdrop1Title`} label="Judul Kenangan Hangat">
              <Input id={`${idPrefix}-snowdrop1Title`} {...register("snowdrop1Title")} />
            </Field>
            <Field id={`${idPrefix}-snowdrop1Memory`} label="Narasi Kenangan">
              <Textarea id={`${idPrefix}-snowdrop1Memory`} rows={2} {...register("snowdrop1Memory")} />
            </Field>
            <Field id={`${idPrefix}-snowdrop1Meaning`} label="Makna Penting Kenangan">
              <Input id={`${idPrefix}-snowdrop1Meaning`} {...register("snowdrop1Meaning")} />
            </Field>
          </div>

          {/* Snowdrop 2 */}
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
              Tunas Salju II
            </span>
            <Field id={`${idPrefix}-snowdrop2Title`} label="Judul Kenangan Hangat">
              <Input id={`${idPrefix}-snowdrop2Title`} {...register("snowdrop2Title")} />
            </Field>
            <Field id={`${idPrefix}-snowdrop2Memory`} label="Narasi Kenangan">
              <Textarea id={`${idPrefix}-snowdrop2Memory`} rows={2} {...register("snowdrop2Memory")} />
            </Field>
            <Field id={`${idPrefix}-snowdrop2Meaning`} label="Makna Penting Kenangan">
              <Input id={`${idPrefix}-snowdrop2Meaning`} {...register("snowdrop2Meaning")} />
            </Field>
          </div>

          {/* Snowdrop 3 */}
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
              Tunas Salju III
            </span>
            <Field id={`${idPrefix}-snowdrop3Title`} label="Judul Kenangan Hangat">
              <Input id={`${idPrefix}-snowdrop3Title`} {...register("snowdrop3Title")} />
            </Field>
            <Field id={`${idPrefix}-snowdrop3Memory`} label="Narasi Kenangan">
              <Textarea id={`${idPrefix}-snowdrop3Memory`} rows={2} {...register("snowdrop3Memory")} />
            </Field>
            <Field id={`${idPrefix}-snowdrop3Meaning`} label="Makna Penting Kenangan">
              <Input id={`${idPrefix}-snowdrop3Meaning`} {...register("snowdrop3Meaning")} />
            </Field>
          </div>

          {/* Snowdrop 4 */}
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
              Tunas Salju IV
            </span>
            <Field id={`${idPrefix}-snowdrop4Title`} label="Judul Kenangan Hangat">
              <Input id={`${idPrefix}-snowdrop4Title`} {...register("snowdrop4Title")} />
            </Field>
            <Field id={`${idPrefix}-snowdrop4Memory`} label="Narasi Kenangan">
              <Textarea id={`${idPrefix}-snowdrop4Memory`} rows={2} {...register("snowdrop4Memory")} />
            </Field>
            <Field id={`${idPrefix}-snowdrop4Meaning`} label="Makna Penting Kenangan">
              <Input id={`${idPrefix}-snowdrop4Meaning`} {...register("snowdrop4Meaning")} />
            </Field>
          </div>
        </div>
      )}

      {/* Tab 6: Warna, Suasana & Musik */}
      {activeTab === "theme" && (
        <div className="space-y-6">
          <div className="border-b border-line pb-3">
            <h3 className="text-sm font-semibold text-ink flex items-center gap-2">
              <Palette className="w-4 h-4 text-sky-500" />
              Bagian 6: Tombol Interaktif, Warna &amp; Musik Pelebur Es
            </h3>
            <p className="text-xs text-ink-muted mt-0.5">
              Kustomisasi teks interaksi pencairan es dan alunan musik instrumental.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              id={`${idPrefix}-meltButtonText`}
              label="Teks Tombol Interaktif"
              error={errors.meltButtonText?.message}
            >
              <Input
                id={`${idPrefix}-meltButtonText`}
                placeholder="Hembuskan Kehangatan Pelebur Es"
                {...register("meltButtonText")}
              />
            </Field>

            <Field
              id={`${idPrefix}-meltSuccessMessage`}
              label="Pesan Saat Es Meleleh"
              error={errors.meltSuccessMessage?.message}
            >
              <Input
                id={`${idPrefix}-meltSuccessMessage`}
                placeholder="Kehangatan dihantarkan..."
                {...register("meltSuccessMessage")}
              />
            </Field>
          </div>

          {/* Color pickers - Setiap Bagian Memiliki Box Tersendiri Secara Vertikal */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
              <ColorPickerField
                label="Warna Kristal Es"
                value={primaryColor || "#38bdf8"}
                onChange={(val) => setValue("primaryColor", val)}
                presets={[
                  { label: "Glacial Cyan", value: "#38bdf8" },
                  { label: "Deep Frost", value: "#0284c7" },
                  { label: "Ice Mist", value: "#67e8f9" },
                  { label: "Solstice Blue", value: "#93c5fd" },
                ]}
              />
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
              <ColorPickerField
                label="Warna Api Perapian"
                value={secondaryColor || "#fbbf24"}
                onChange={(val) => setValue("secondaryColor", val)}
                presets={[
                  { label: "Hearth Ember", value: "#fbbf24" },
                  { label: "Warm Fire", value: "#f59e0b" },
                  { label: "Campfire Orange", value: "#f97316" },
                  { label: "Bara Api", value: "#ef4444" },
                ]}
              />
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
              <ColorPickerField
                label="Warna Tunas Musim Semi"
                value={accentColor || "#86efac"}
                onChange={(val) => setValue("accentColor", val)}
                presets={[
                  { label: "Spring Sprout", value: "#86efac" },
                  { label: "Meadow Green", value: "#4ade80" },
                  { label: "Fresh Leaf", value: "#22c55e" },
                  { label: "Pale Mint", value: "#a7f3d0" },
                ]}
              />
            </div>
          </div>

          {/* Pengaturan Audio Musik dalam Box Tersendiri */}
          <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs space-y-4">
            <Field
              id={`${idPrefix}-musicTrack`}
              label="URL Audio Musik Perapian & Musim Semi (Opsional)"
              error={errors.musicTrack?.message}
              helperText="Tautan file audio MP3/WAV berdurasi tenang untuk menemani proses pembacaan surat"
            >
              <Input
                id={`${idPrefix}-musicTrack`}
                placeholder="https://.../piano-spring-thaw.mp3"
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
