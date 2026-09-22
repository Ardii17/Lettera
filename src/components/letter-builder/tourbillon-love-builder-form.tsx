"use client";

import { useState } from "react";
import type {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  FieldErrors,
} from "react-hook-form";
import {
  Watch,
  Scroll,
  Compass,
  Clock,
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

interface TourbillonLoveBuilderFormProps {
  register: UseFormRegister<LetterFormValues>;
  setValue: UseFormSetValue<LetterFormValues>;
  watch: UseFormWatch<LetterFormValues>;
  errors: FieldErrors<LetterFormValues>;
  idPrefix?: string;
}

type TabType =
  | "calibre"
  | "dispatch"
  | "complications"
  | "milestones"
  | "specs"
  | "theme";

export function TourbillonLoveBuilderForm({
  register,
  setValue,
  watch,
  errors,
  idPrefix = "tourbillon-love",
}: TourbillonLoveBuilderFormProps) {
  const [activeTab, setActiveTab] = useState<TabType>("calibre");

  const tabs: Array<{ id: TabType; label: string; icon: React.ReactNode }> = [
    { id: "calibre", label: "Sertifikat Kaliber", icon: <Watch className="w-4 h-4" /> },
    { id: "dispatch", label: "Surat Horologis", icon: <Scroll className="w-4 h-4" /> },
    { id: "complications", label: "4 Komplikasi", icon: <Compass className="w-4 h-4" /> },
    { id: "milestones", label: "4 Detik Sakral", icon: <Clock className="w-4 h-4" /> },
    { id: "specs", label: "Spesifikasi Kaliber", icon: <Sliders className="w-4 h-4" /> },
    { id: "theme", label: "Warna & Musik", icon: <Palette className="w-4 h-4" /> },
  ];

  const primaryColor = watch("primaryColor") as string;
  const secondaryColor = watch("secondaryColor") as string;
  const accentColor = watch("accentColor") as string;

  const handleApplyPresetComplications = () => {
    setValue("complication1Title", "The Perpetual Tourbillon (Penyeimbang Gravitasi Jiwa)");
    setValue("complication1Subtitle", "Penetralisir Efek Gravitasi Bumi pada Detak Jantung");
    setValue(
      "complication1Story",
      "Sebagaimana sangkar tourbillon berputar 360 derajat untuk menetralkan tarikan gravitasi agar jam tetap berdetak akurat, demikianlah komitmenku untuk selalu menjaga keseimbangan emosi dan ego agar keharmonisan kita tak pernah runtuh."
    );
    setValue("complication1Meaning", "Kestabilan rasa yang tak akan terpengaruh oleh pasang surut keadaan dunia.");

    setValue("complication2Title", "The Astronomical Moon Phase (Fase Rembulan Kerinduan)");
    setValue("complication2Subtitle", "Penghitung Siklus 29,5 Hari Pasang Surut Kerinduan");
    setValue(
      "complication2Story",
      "Piringan emas biru lapis lazuli yang melacak wajah bulan di langit malam. Di saat bulan sabit ataupun purnama sempurna, hatiku selalu tahu bahwa kita memandang langit yang sama dan merawat kerinduan yang sama."
    );
    setValue("complication2Meaning", "Rasa rindu yang setia menemani di setiap fase malam hingga matahari terbit.");

    setValue("complication3Title", "The Acoustic Minute Repeater (Denting Lonceng Kejujuran)");
    setValue("complication3Subtitle", "Lonceng Katedral Mini Pemukul Jam, Perempat, & Menit");
    setValue(
      "complication3Story",
      "Dua palu baja yang memukul cincin gong emas menghasilkan denting merdu di dalam kegelapan. Mekanisme ini berbunyi setiap kali dua jiwa saling memanggil dalam doa, membuktikan bahwa kita tidak pernah sendirian."
    );
    setValue("complication3Meaning", "Kehadiran batin yang selalu merespons setiap desah panggilan hatimu.");

    setValue("complication4Title", "The Equation of Time (Persamaan Waktu Relatif)");
    setValue("complication4Subtitle", "Penyelarasan Waktu Matahari Sejati & Waktu Mekanis Hati");
    setValue(
      "complication4Story",
      "Komplikasi paling langka yang mengukur selisih antara waktu jam dan waktu matahari nyata. Karena cinta memiliki hukum relativitasnya sendiri: satu jam bersamamu terasa berlalu sekejap, dan satu hari tanpamu terasa bagai satu abad."
    );
    setValue("complication4Meaning", "Menghargai setiap detik keberadaanmu sebagai anugerah terbesar hidupku.");
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

      {/* Tab 1: Sertifikat Kaliber Jam */}
      {activeTab === "calibre" && (
        <div className="space-y-5">
          <div className="border-b border-line pb-3">
            <h3 className="text-sm font-semibold text-ink flex items-center gap-2">
              <Watch className="w-4 h-4 text-amber-500" />
              Bagian 1: Sertifikat Kaliber Jam &amp; Geneva Seal
            </h3>
            <p className="text-xs text-ink-muted mt-0.5">
              Identitas mahakarya jam tangan mekanik, nama pemilik detik, pembuat jam, dan kutipan grafir pelat jam.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              id={`${idPrefix}-recipientName`}
              label="Nama Pemilik Detik (The Keeper of Seconds)"
              error={errors.recipientName?.message}
              required
              helperText="Sosok yang menguasai seluruh detak waktu hidupmu"
            >
              <Input
                id={`${idPrefix}-recipientName`}
                placeholder="Genevieve Vivienne"
                {...register("recipientName")}
              />
            </Field>

            <Field
              id={`${idPrefix}-senderName`}
              label="Nama Pembuat Jam (The Master Horologist)"
              error={errors.senderName?.message}
              required
              helperText="Sosok perakit kaliber jam cinta ini"
            >
              <Input
                id={`${idPrefix}-senderName`}
                placeholder="Alexandre de Montmirail"
                {...register("senderName")}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              id={`${idPrefix}-timepieceName`}
              label="Nama Mahakarya Jam"
              error={errors.timepieceName?.message}
            >
              <Input
                id={`${idPrefix}-timepieceName`}
                placeholder="The Grand Tourbillon of Two Hearts"
                {...register("timepieceName")}
              />
            </Field>

            <Field
              id={`${idPrefix}-calibreNo`}
              label="Nomor Seri Kaliber"
              error={errors.calibreNo?.message}
            >
              <Input
                id={`${idPrefix}-calibreNo`}
                placeholder="CALIBRE-ETERNAL-N°12"
                {...register("calibreNo")}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field
              id={`${idPrefix}-certificationStandard`}
              label="Sertifikasi Presisi"
              error={errors.certificationStandard?.message}
            >
              <Input
                id={`${idPrefix}-certificationStandard`}
                placeholder="Poinçon de Genève • Geneva Seal"
                {...register("certificationStandard")}
              />
            </Field>

            <Field
              id={`${idPrefix}-synchronizationDate`}
              label="Tanggal Sinkronisasi Waktu"
              error={errors.synchronizationDate?.message}
            >
              <Input
                id={`${idPrefix}-synchronizationDate`}
                placeholder="Malam Saat Detak Jantung Kita Pertama Kali Selaras"
                {...register("synchronizationDate")}
              />
            </Field>

            <Field
              id={`${idPrefix}-manufactureLocation`}
              label="Lokasi Bengkel Horologi"
              error={errors.manufactureLocation?.message}
            >
              <Input
                id={`${idPrefix}-manufactureLocation`}
                placeholder="Manufacture de Lettera • Vallée de Joux, Switzerland"
                {...register("manufactureLocation")}
              />
            </Field>
          </div>

          <Field
            id={`${idPrefix}-dialEngravingQuote`}
            label="Kutipan Grafir pada Pelat Jam (Dial Engraving)"
            error={errors.dialEngravingQuote?.message}
            helperText="Kutipan puitis yang digrafir indah pada lempengan emas mesin jam"
          >
            <Textarea
              id={`${idPrefix}-dialEngravingQuote`}
              rows={2}
              placeholder="Di antara miliaran putaran jarum jam di semesta..."
              {...register("dialEngravingQuote")}
            />
          </Field>
        </div>
      )}

      {/* Tab 2: Surat di Meja Horologis */}
      {activeTab === "dispatch" && (
        <div className="space-y-5">
          <div className="border-b border-line pb-3">
            <h3 className="text-sm font-semibold text-ink flex items-center gap-2">
              <Scroll className="w-4 h-4 text-amber-500" />
              Bagian 2: Surat Pengakuan di Meja Horologis
            </h3>
            <p className="text-xs text-ink-muted mt-0.5">
              Surat cinta sastrawi di atas lembaran cetak biru horologi perakit jam.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              id={`${idPrefix}-dispatchTitle`}
              label="Judul Surat Horologis"
              error={errors.dispatchTitle?.message}
            >
              <Input
                id={`${idPrefix}-dispatchTitle`}
                placeholder="Cetak Biru Waktu: Presisi Abadi di Setiap Detak Jantungku"
                {...register("dispatchTitle")}
              />
            </Field>

            <Field
              id={`${idPrefix}-dispatchDate`}
              label="Waktu &amp; Tempat Penulisan"
              error={errors.dispatchDate?.message}
            >
              <Input
                id={`${idPrefix}-dispatchDate`}
                placeholder="Vallée de Joux, Di Tengah Bunyi Detak Mekanis Jam Meja"
                {...register("dispatchDate")}
              />
            </Field>
          </div>

          <Field
            id={`${idPrefix}-mainMessage`}
            label="Isi Surat Cinta Horologis"
            error={errors.mainMessage?.message}
            helperText="Uraikan bagaimana kehadiran sang kekasih memberi arti sejati pada setiap detik kehidupan"
          >
            <Textarea
              id={`${idPrefix}-mainMessage`}
              rows={8}
              placeholder="Tuliskan isi surat cinta perakit jam..."
              {...register("mainMessage")}
            />
          </Field>

          <Field
            id={`${idPrefix}-dispatchSignoff`}
            label="Kalimat Penutup Surat"
            error={errors.dispatchSignoff?.message}
          >
            <Input
              id={`${idPrefix}-dispatchSignoff`}
              placeholder="Dengan seluruh detik jiwa yang terus berputar untukmu,"
              {...register("dispatchSignoff")}
            />
          </Field>
        </div>
      )}

      {/* Tab 3: 4 Komplikasi Waktu */}
      {activeTab === "complications" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-line pb-3">
            <div>
              <h3 className="text-sm font-semibold text-ink flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-500" />
                Bagian 3: 4 Komplikasi Mekanisme Waktu Cinta
              </h3>
              <p className="text-xs text-ink-muted mt-0.5">
                Modul mekanik penjaga keharmonisan: Tourbillon, Moon Phase, Minute Repeater, dan Equation of Time.
              </p>
            </div>
            <button
              type="button"
              onClick={handleApplyPresetComplications}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Gunakan 4 Komplikasi Contoh
            </button>
          </div>

          {/* Complication 1 */}
          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900 block">
              Komplikasi N°01 (The Perpetual Tourbillon)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field id={`${idPrefix}-complication1Title`} label="Nama Komplikasi">
                <Input id={`${idPrefix}-complication1Title`} {...register("complication1Title")} />
              </Field>
              <Field id={`${idPrefix}-complication1Subtitle`} label="Fungsi Mekanis">
                <Input id={`${idPrefix}-complication1Subtitle`} {...register("complication1Subtitle")} />
              </Field>
            </div>
            <Field id={`${idPrefix}-complication1Story`} label="Filosofi Romantis">
              <Textarea id={`${idPrefix}-complication1Story`} rows={2} {...register("complication1Story")} />
            </Field>
            <Field id={`${idPrefix}-complication1Meaning`} label="Janji Presisi Waktu">
              <Input id={`${idPrefix}-complication1Meaning`} {...register("complication1Meaning")} />
            </Field>
          </div>

          {/* Complication 2 */}
          <div className="p-4 rounded-xl border border-sky-200 bg-sky-50/40 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-900 block">
              Komplikasi N°02 (The Astronomical Moon Phase)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field id={`${idPrefix}-complication2Title`} label="Nama Komplikasi">
                <Input id={`${idPrefix}-complication2Title`} {...register("complication2Title")} />
              </Field>
              <Field id={`${idPrefix}-complication2Subtitle`} label="Fungsi Mekanis">
                <Input id={`${idPrefix}-complication2Subtitle`} {...register("complication2Subtitle")} />
              </Field>
            </div>
            <Field id={`${idPrefix}-complication2Story`} label="Filosofi Romantis">
              <Textarea id={`${idPrefix}-complication2Story`} rows={2} {...register("complication2Story")} />
            </Field>
            <Field id={`${idPrefix}-complication2Meaning`} label="Janji Presisi Waktu">
              <Input id={`${idPrefix}-complication2Meaning`} {...register("complication2Meaning")} />
            </Field>
          </div>

          {/* Complication 3 */}
          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900 block">
              Komplikasi N°03 (The Acoustic Minute Repeater)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field id={`${idPrefix}-complication3Title`} label="Nama Komplikasi">
                <Input id={`${idPrefix}-complication3Title`} {...register("complication3Title")} />
              </Field>
              <Field id={`${idPrefix}-complication3Subtitle`} label="Fungsi Mekanis">
                <Input id={`${idPrefix}-complication3Subtitle`} {...register("complication3Subtitle")} />
              </Field>
            </div>
            <Field id={`${idPrefix}-complication3Story`} label="Filosofi Romantis">
              <Textarea id={`${idPrefix}-complication3Story`} rows={2} {...register("complication3Story")} />
            </Field>
            <Field id={`${idPrefix}-complication3Meaning`} label="Janji Presisi Waktu">
              <Input id={`${idPrefix}-complication3Meaning`} {...register("complication3Meaning")} />
            </Field>
          </div>

          {/* Complication 4 */}
          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900 block">
              Komplikasi N°04 (The Equation of Time)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field id={`${idPrefix}-complication4Title`} label="Nama Komplikasi">
                <Input id={`${idPrefix}-complication4Title`} {...register("complication4Title")} />
              </Field>
              <Field id={`${idPrefix}-complication4Subtitle`} label="Fungsi Mekanis">
                <Input id={`${idPrefix}-complication4Subtitle`} {...register("complication4Subtitle")} />
              </Field>
            </div>
            <Field id={`${idPrefix}-complication4Story`} label="Filosofi Romantis">
              <Textarea id={`${idPrefix}-complication4Story`} rows={2} {...register("complication4Story")} />
            </Field>
            <Field id={`${idPrefix}-complication4Meaning`} label="Janji Presisi Waktu">
              <Input id={`${idPrefix}-complication4Meaning`} {...register("complication4Meaning")} />
            </Field>
          </div>
        </div>
      )}

      {/* Tab 4: 4 Tonggak Detik Waktu Sakral */}
      {activeTab === "milestones" && (
        <div className="space-y-6">
          <div className="border-b border-line pb-3">
            <h3 className="text-sm font-semibold text-ink flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-500" />
              Bagian 4: 4 Tonggak Detik Waktu Sakral (Chronometer Milestones)
            </h3>
            <p className="text-xs text-ink-muted mt-0.5">
              Empat penanda waktu presisi tinggi yang mengabadikan memori sakral di pelat jam semesta.
            </p>
          </div>

          {/* Milestone 1 */}
          <div className="p-4 rounded-xl border border-line bg-page-soft space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-ink block">
              Detik Sakral I
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field id={`${idPrefix}-milestone1Time`} label="Waktu Presisi (Jam:Menit:Detik)">
                <Input id={`${idPrefix}-milestone1Time`} {...register("milestone1Time")} />
              </Field>
              <Field id={`${idPrefix}-milestone1Title`} label="Nama Momen">
                <Input id={`${idPrefix}-milestone1Title`} {...register("milestone1Title")} />
              </Field>
            </div>
            <Field id={`${idPrefix}-milestone1Story`} label="Narasi Detik Waktu">
              <Textarea id={`${idPrefix}-milestone1Story`} rows={2} {...register("milestone1Story")} />
            </Field>
            <Field id={`${idPrefix}-milestone1Precision`} label="Tingkat Deviasi Waktu">
              <Input id={`${idPrefix}-milestone1Precision`} {...register("milestone1Precision")} />
            </Field>
          </div>

          {/* Milestone 2 */}
          <div className="p-4 rounded-xl border border-line bg-page-soft space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-ink block">
              Detik Sakral II
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field id={`${idPrefix}-milestone2Time`} label="Waktu Presisi (Jam:Menit:Detik)">
                <Input id={`${idPrefix}-milestone2Time`} {...register("milestone2Time")} />
              </Field>
              <Field id={`${idPrefix}-milestone2Title`} label="Nama Momen">
                <Input id={`${idPrefix}-milestone2Title`} {...register("milestone2Title")} />
              </Field>
            </div>
            <Field id={`${idPrefix}-milestone2Story`} label="Narasi Detik Waktu">
              <Textarea id={`${idPrefix}-milestone2Story`} rows={2} {...register("milestone2Story")} />
            </Field>
            <Field id={`${idPrefix}-milestone2Precision`} label="Tingkat Deviasi Waktu">
              <Input id={`${idPrefix}-milestone2Precision`} {...register("milestone2Precision")} />
            </Field>
          </div>

          {/* Milestone 3 */}
          <div className="p-4 rounded-xl border border-line bg-page-soft space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-ink block">
              Detik Sakral III
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field id={`${idPrefix}-milestone3Time`} label="Waktu Presisi (Jam:Menit:Detik)">
                <Input id={`${idPrefix}-milestone3Time`} {...register("milestone3Time")} />
              </Field>
              <Field id={`${idPrefix}-milestone3Title`} label="Nama Momen">
                <Input id={`${idPrefix}-milestone3Title`} {...register("milestone3Title")} />
              </Field>
            </div>
            <Field id={`${idPrefix}-milestone3Story`} label="Narasi Detik Waktu">
              <Textarea id={`${idPrefix}-milestone3Story`} rows={2} {...register("milestone3Story")} />
            </Field>
            <Field id={`${idPrefix}-milestone3Precision`} label="Tingkat Deviasi Waktu">
              <Input id={`${idPrefix}-milestone3Precision`} {...register("milestone3Precision")} />
            </Field>
          </div>

          {/* Milestone 4 */}
          <div className="p-4 rounded-xl border border-line bg-page-soft space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-ink block">
              Detik Sakral IV
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field id={`${idPrefix}-milestone4Time`} label="Waktu Presisi (Jam:Menit:Detik)">
                <Input id={`${idPrefix}-milestone4Time`} {...register("milestone4Time")} />
              </Field>
              <Field id={`${idPrefix}-milestone4Title`} label="Nama Momen">
                <Input id={`${idPrefix}-milestone4Title`} {...register("milestone4Title")} />
              </Field>
            </div>
            <Field id={`${idPrefix}-milestone4Story`} label="Narasi Detik Waktu">
              <Textarea id={`${idPrefix}-milestone4Story`} rows={2} {...register("milestone4Story")} />
            </Field>
            <Field id={`${idPrefix}-milestone4Precision`} label="Tingkat Deviasi Waktu">
              <Input id={`${idPrefix}-milestone4Precision`} {...register("milestone4Precision")} />
            </Field>
          </div>
        </div>
      )}

      {/* Tab 5: Spesifikasi Mesin Kaliber */}
      {activeTab === "specs" && (
        <div className="space-y-5">
          <div className="border-b border-line pb-3">
            <h3 className="text-sm font-semibold text-ink flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-500" />
              Bagian 5: Spesifikasi Mesin Kaliber &amp; Metrik Daya
            </h3>
            <p className="text-xs text-ink-muted mt-0.5">
              Rincian cadangan daya abadi, frekuensi getaran, batu rubi penahan gesekan, dan ketahanan jam.
            </p>
          </div>

          <Field
            id={`${idPrefix}-powerReserve`}
            label="Cadangan Daya (Power Reserve)"
            error={errors.powerReserve?.message}
            helperText="Kekekalan daya cinta yang menggerakkan jam"
          >
            <Input id={`${idPrefix}-powerReserve`} {...register("powerReserve")} />
          </Field>

          <Field
            id={`${idPrefix}-vibrationFrequency`}
            label="Frekuensi Getaran Kaliber (VPH)"
            error={errors.vibrationFrequency?.message}
            helperText="Frekuensi detak getaran cinta per jam"
          >
            <Input id={`${idPrefix}-vibrationFrequency`} {...register("vibrationFrequency")} />
          </Field>

          <Field
            id={`${idPrefix}-jewelCount`}
            label="Batu Rubi Penahan Gesekan (Jewels)"
            error={errors.jewelCount?.message}
            helperText="Batu permata kenangan yang menghilangkan gesekan ego"
          >
            <Input id={`${idPrefix}-jewelCount`} {...register("jewelCount")} />
          </Field>

          <Field
            id={`${idPrefix}-waterResistance`}
            label="Ketahanan Lingkungan (Water Resistance)"
            error={errors.waterResistance?.message}
            helperText="Kemampuan bertahan menghadapi badai hidup"
          >
            <Input id={`${idPrefix}-waterResistance`} {...register("waterResistance")} />
          </Field>
        </div>
      )}

      {/* Tab 6: Warna, Mahkota Jam & Musik */}
      {activeTab === "theme" && (
        <div className="space-y-6">
          <div className="border-b border-line pb-3">
            <h3 className="text-sm font-semibold text-ink flex items-center gap-2">
              <Palette className="w-4 h-4 text-amber-500" />
              Bagian 6: Tombol Putar Mahkota, Warna &amp; Musik Mekanik
            </h3>
            <p className="text-xs text-ink-muted mt-0.5">
              Kustomisasi interaksi pemutar mahkota jam dan melodi kotak musik romantis.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              id={`${idPrefix}-windButtonText`}
              label="Teks Tombol Pemutar Mahkota"
              error={errors.windButtonText?.message}
            >
              <Input
                id={`${idPrefix}-windButtonText`}
                placeholder="Putar Mahkota Jam Cinta"
                {...register("windButtonText")}
              />
            </Field>

            <Field
              id={`${idPrefix}-windSuccessMessage`}
              label="Pesan Saat Mahkota Diputar"
              error={errors.windSuccessMessage?.message}
            >
              <Input
                id={`${idPrefix}-windSuccessMessage`}
                placeholder="Roda gigi emas berputar merdu..."
                {...register("windSuccessMessage")}
              />
            </Field>
          </div>

          {/* Color pickers - Setiap Bagian Memiliki Box Tersendiri Secara Vertikal */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
              <ColorPickerField
                label="Warna Emas Mawar (Rose Gold)"
                value={primaryColor || "#e0a96d"}
                onChange={(val) => setValue("primaryColor", val)}
                presets={[
                  { label: "Rose Gold", value: "#e0a96d" },
                  { label: "Champagne Gilt", value: "#fcd34d" },
                  { label: "Warm Bronze", value: "#b45309" },
                  { label: "Copper Gleam", value: "#ea580c" },
                ]}
              />
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
              <ColorPickerField
                label="Warna Jarum Baja Biru"
                value={secondaryColor || "#38bdf8"}
                onChange={(val) => setValue("secondaryColor", val)}
                presets={[
                  { label: "Blued Steel", value: "#38bdf8" },
                  { label: "Lapis Lazuli", value: "#2563eb" },
                  { label: "Midnight Blue", value: "#1e3a8a" },
                  { label: "Cyan Glaze", value: "#06b6d4" },
                ]}
              />
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
              <ColorPickerField
                label="Warna Kuningan Horologi"
                value={accentColor || "#d4af37"}
                onChange={(val) => setValue("accentColor", val)}
                presets={[
                  { label: "Horological Brass", value: "#d4af37" },
                  { label: "Golden Gear", value: "#eab308" },
                  { label: "Jeweled Ruby", value: "#e11d48" },
                  { label: "Polished Steel", value: "#94a3b8" },
                ]}
              />
            </div>
          </div>

          {/* Pengaturan Audio Musik dalam Box Tersendiri */}
          <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs space-y-4">
            <Field
              id={`${idPrefix}-musicTrack`}
              label="URL Audio Musik Kotak Mekanik Jam / Harpsichord (Opsional)"
              error={errors.musicTrack?.message}
              helperText="Tautan file audio MP3/WAV kotak musik mekanik yang tenang dan romantis"
            >
              <Input
                id={`${idPrefix}-musicTrack`}
                placeholder="https://.../mechanical-music-box.mp3"
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
