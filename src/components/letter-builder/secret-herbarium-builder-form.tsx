"use client";

import { useState } from "react";
import type {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  FieldErrors,
} from "react-hook-form";
import {
  Flower2,
  Scroll,
  Droplets,
  Sun,
  Palette,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { Field, Input, Textarea } from "@/components/ui/field";
import { ColorPickerField } from "@/components/ui/color-picker-field";
import { BACKGROUND_COLOR_PRESETS } from "@/templates/color-presets";
import { cn } from "@/lib/utils/cn";
import type { LetterFormValues } from "./dynamic-form";

interface SecretHerbariumBuilderFormProps {
  register: UseFormRegister<LetterFormValues>;
  setValue: UseFormSetValue<LetterFormValues>;
  watch: UseFormWatch<LetterFormValues>;
  errors: FieldErrors<LetterFormValues>;
  idPrefix?: string;
}

type TabType =
  | "registry"
  | "letter"
  | "specimens"
  | "elixirs"
  | "vows"
  | "theme";

export function SecretHerbariumBuilderForm({
  register,
  setValue,
  watch,
  errors,
  idPrefix = "secret-herbarium",
}: SecretHerbariumBuilderFormProps) {
  const [activeTab, setActiveTab] = useState<TabType>("registry");

  const tabs: Array<{ id: TabType; label: string; icon: React.ReactNode }> = [
    { id: "registry", label: "Registri Botani", icon: <ShieldCheck className="w-4 h-4" /> },
    { id: "letter", label: "Surat Botanis", icon: <Scroll className="w-4 h-4" /> },
    { id: "specimens", label: "4 Spesimen Bunga", icon: <Flower2 className="w-4 h-4" /> },
    { id: "elixirs", label: "3 Ramuan Apoteker", icon: <Droplets className="w-4 h-4" /> },
    { id: "vows", label: "4 Ikrar Kebun", icon: <Sun className="w-4 h-4" /> },
    { id: "theme", label: "Warna & Musik", icon: <Palette className="w-4 h-4" /> },
  ];

  const primaryColor = watch("primaryColor") as string;
  const secondaryColor = watch("secondaryColor") as string;
  const accentColor = watch("accentColor") as string;

  const handleApplyPresetSpecimens = () => {
    setValue("specimen1_name", "Rosa Aeterna");
    setValue("specimen1_common", "The Awakening Rose");
    setValue("specimen1_floriography", "Kagum yang bersemi perlahan namun mengakar kuat");
    setValue("specimen1_location", "Kedai Kopi Sudut Kota di Bawah Gerimis Senja");
    setValue("specimen1_date", "14 September 2022");
    setValue(
      "specimen1_story",
      "Pertama kali matamu menatapku di balik cangkir teh hangat, seluruh kebisingan kota mereda seketika. Mawar pertama yang mekar di dadaku."
    );

    setValue("specimen2_name", "Myosotis Amoris");
    setValue("specimen2_common", "Forget-Me-Not of Whispers");
    setValue("specimen2_floriography", "Kenangan manis larut malam yang abadi di ingatan");
    setValue("specimen2_location", "Balkon Apartemen Menatap Lampu-Lampu Kota");
    setValue("specimen2_date", "03 Desember 2022");
    setValue(
      "specimen2_story",
      "Obrolan panjang hingga pukul tiga dini hari tentang ketakutan terdalam dan mimpi masa kecil. Di situlah aku tahu jiwamu adalah rumahku."
    );

    setValue("specimen3_name", "Lavandula Serenitatis");
    setValue("specimen3_common", "The Calming Lavender");
    setValue("specimen3_floriography", "Ketenangan jiwa dan perlindungan di tengah badai");
    setValue("specimen3_location", "Perjalanan Pulang Saat Hari Paling Melelahkan");
    setValue("specimen3_date", "19 Juni 2023");
    setValue(
      "specimen3_story",
      "Saat hari-hari terasa berat dan dunia menuntut terlalu banyak, genggaman tanganmu adalah aroma lavender yang menentramkan seluruh badai batinku."
    );

    setValue("specimen4_name", "Jasminum Perpetuum");
    setValue("specimen4_common", "The Everlasting Jasmine");
    setValue("specimen4_floriography", "Keharuman ketulusan dan komitmen tanpa syarat");
    setValue("specimen4_location", "Dermaga Tepi Danau di Bawah Langit Berbintang");
    setValue("specimen4_date", "14 Februari 2024");
    setValue(
      "specimen4_story",
      "Janji sunyi yang kita ucapkan tanpa banyak kata: melangkah berdua, merawat hari esok, dan tetap saling memilih di setiap helaan napas."
    );
  };

  const handleApplyPresetElixirs = () => {
    setValue("elixir1_title", "Tincture of Midnight Solace");
    setValue("elixir1_aroma", "Kelopak chamomile kering, uap teh madu, dan hembusan angin malam");
    setValue("elixir1_ingredients", "70% pelukan hening tanpa penghakiman, 30% tatapan teduh penenang cemas");
    setValue("elixir1_effect", "Menguraikan ketegangan batin dan menyelimuti hati dengan rasa aman mutlak");

    setValue("elixir2_title", "Cordial of Pure Laughter");
    setValue("elixir2_aroma", "Kulit jeruk bergamot segar, sinar matahari sore, dan remah pastry manis");
    setValue("elixir2_ingredients", "Gurauan spontan yang absurd, tawa terpingkal-pingkal di dalam mobil");
    setValue("elixir2_effect", "Seketika menerangi hari-hari kelabu dengan kegembiraan yang tulus dan menular");

    setValue("elixir3_title", "Essence of Unwavering Devotion");
    setValue("elixir3_aroma", "Kayu cendana hangat, getah pinus perenial, dan kelopak melati suci");
    setValue("elixir3_ingredients", "Kejujuran tanpa topeng, kesabaran melewati masa sulit, komitmen setiap fajar");
    setValue("elixir3_effect", "Membentuk perlindungan abadi dari dinginnya dunia luar dan memperdalam akar kasih");
  };

  return (
    <div className="space-y-6">
      {/* Stepper Navigation */}
      <div className="flex overflow-x-auto pb-2 gap-2 border-b border-border/40 scrollbar-none">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Registri Botani */}
      {activeTab === "registry" && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-950/10 text-xs text-muted-foreground">
            Sertifikat pendaftaran arsip botani cinta resmi di rumah kaca klasik (*Royal Botanical Conservatory*).
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              id={`${idPrefix}-recipientName`}
              label="Nama Penerima (Penjaga Bunga)"
              error={errors.recipientName?.message}
              required
            >
              <Input
                id={`${idPrefix}-recipientName`}
                {...register("recipientName", { required: "Nama penerima wajib diisi" })}
                placeholder="Clarissa Aurelia"
              />
            </Field>

            <Field
              id={`${idPrefix}-senderName`}
              label="Nama Pengirim (Sang Botanis)"
              error={errors.senderName?.message}
              required
            >
              <Input
                id={`${idPrefix}-senderName`}
                {...register("senderName", { required: "Nama pengirim wajib diisi" })}
                placeholder="Julian Arkananta"
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              id={`${idPrefix}-archiveNo`}
              label="Nomor Arsip Herbarium"
              error={errors.archiveNo?.message}
            >
              <Input
                id={`${idPrefix}-archiveNo`}
                {...register("archiveNo")}
                placeholder="HB-AMOUR-2024-09"
              />
            </Field>

            <Field
              id={`${idPrefix}-plantingDate`}
              label="Tanggal Pertama Bersemi"
              error={errors.plantingDate?.message}
            >
              <Input
                id={`${idPrefix}-plantingDate`}
                {...register("plantingDate")}
                placeholder="14 September 2022"
              />
            </Field>
          </div>

          <Field
            id={`${idPrefix}-conservatoryWing`}
            label="Sayap / Paviliun Rumah Kaca"
            error={errors.conservatoryWing?.message}
          >
            <Input
              id={`${idPrefix}-conservatoryWing`}
              {...register("conservatoryWing")}
              placeholder="Pavilion des Roses & Orangerie d'Hiver"
            />
          </Field>

          <Field
            id={`${idPrefix}-certificateTitle`}
            label="Judul Piagam Konservatori"
            error={errors.certificateTitle?.message}
          >
            <Input
              id={`${idPrefix}-certificateTitle`}
              {...register("certificateTitle")}
              placeholder="Arsip Botani Cinta Abadi"
            />
          </Field>

          <Field
            id={`${idPrefix}-registryNotes`}
            label="Catatan Kurator Konservatori"
            error={errors.registryNotes?.message}
          >
            <Textarea
              id={`${idPrefix}-registryNotes`}
              {...register("registryNotes")}
              rows={3}
              placeholder="Catatan resmi pengarsipan flora cinta..."
            />
          </Field>
        </div>
      )}

      {/* Tab 2: Surat Botanis */}
      {activeTab === "letter" && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-950/10 text-xs text-muted-foreground">
            Surat utama bernuansa puitis di atas kertas serat tumbuhan alami bertanda tangan dan berstempel lilin.
          </div>

          <Field
            id={`${idPrefix}-salutation`}
            label="Salam Pembuka"
            error={errors.salutation?.message}
          >
            <Input
              id={`${idPrefix}-salutation`}
              {...register("salutation")}
              placeholder="Untuk Penjaga Hatiku yang Terindah,"
            />
          </Field>

          <Field
            id={`${idPrefix}-message`}
            label="Isi Surat Botanis (Pesan Cinta)"
            error={errors.message?.message}
            required
          >
            <Textarea
              id={`${idPrefix}-message`}
              {...register("message", { required: "Isi surat wajib diisi" })}
              rows={8}
              placeholder="Tuliskan ungkapan perasaan terdalammu..."
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              id={`${idPrefix}-signoff`}
              label="Salam Penutup"
              error={errors.signoff?.message}
            >
              <Input
                id={`${idPrefix}-signoff`}
                {...register("signoff")}
                placeholder="Dengan segenap kehangatan kelopak mekar,"
              />
            </Field>

            <Field
              id={`${idPrefix}-sealInitials`}
              label="Inisial Segel Lilin Botani"
              error={errors.sealInitials?.message}
            >
              <Input
                id={`${idPrefix}-sealInitials`}
                {...register("sealInitials")}
                placeholder="J & C"
                maxLength={10}
              />
            </Field>
          </div>
        </div>
      )}

      {/* Tab 3: 4 Spesimen Bunga */}
      {activeTab === "specimens" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-rose-500/20 bg-rose-950/10">
            <div className="text-xs text-muted-foreground">
              4 spesimen bunga kering berpelat nomor dengan bahasa rahasia bunga (*floriography*).
            </div>
            <button
              type="button"
              onClick={handleApplyPresetSpecimens}
              className="px-3 py-1.5 rounded-md text-xs bg-muted hover:bg-muted/80 text-foreground font-medium flex items-center gap-1.5 self-start sm:self-auto transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Muat Spesimen Default</span>
            </button>
          </div>

          {/* Specimen 1 */}
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <div className="font-semibold text-xs text-primary uppercase tracking-wider">
              Spesimen 1 (Plate #01)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field id={`${idPrefix}-specimen1_name`} label="Nama Latin">
                <Input id={`${idPrefix}-specimen1_name`} {...register("specimen1_name")} placeholder="Rosa Aeterna" />
              </Field>
              <Field id={`${idPrefix}-specimen1_common`} label="Gelar Bunga">
                <Input id={`${idPrefix}-specimen1_common`} {...register("specimen1_common")} placeholder="The Awakening Rose" />
              </Field>
            </div>
            <Field id={`${idPrefix}-specimen1_floriography`} label="Makna Floriografi">
              <Input id={`${idPrefix}-specimen1_floriography`} {...register("specimen1_floriography")} placeholder="Kagum yang bersemi..." />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field id={`${idPrefix}-specimen1_location`} label="Lokasi Temuan">
                <Input id={`${idPrefix}-specimen1_location`} {...register("specimen1_location")} placeholder="Kedai kopi..." />
              </Field>
              <Field id={`${idPrefix}-specimen1_date`} label="Tanggal">
                <Input id={`${idPrefix}-specimen1_date`} {...register("specimen1_date")} placeholder="14 September 2022" />
              </Field>
            </div>
            <Field id={`${idPrefix}-specimen1_story`} label="Catatan Herbisida Kenangan">
              <Textarea id={`${idPrefix}-specimen1_story`} {...register("specimen1_story")} rows={2} />
            </Field>
          </div>

          {/* Specimen 2 */}
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <div className="font-semibold text-xs text-primary uppercase tracking-wider">
              Spesimen 2 (Plate #02)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field id={`${idPrefix}-specimen2_name`} label="Nama Latin">
                <Input id={`${idPrefix}-specimen2_name`} {...register("specimen2_name")} placeholder="Myosotis Amoris" />
              </Field>
              <Field id={`${idPrefix}-specimen2_common`} label="Gelar Bunga">
                <Input id={`${idPrefix}-specimen2_common`} {...register("specimen2_common")} placeholder="Forget-Me-Not of Whispers" />
              </Field>
            </div>
            <Field id={`${idPrefix}-specimen2_floriography`} label="Makna Floriografi">
              <Input id={`${idPrefix}-specimen2_floriography`} {...register("specimen2_floriography")} placeholder="Kenangan manis..." />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field id={`${idPrefix}-specimen2_location`} label="Lokasi Temuan">
                <Input id={`${idPrefix}-specimen2_location`} {...register("specimen2_location")} placeholder="Balkon..." />
              </Field>
              <Field id={`${idPrefix}-specimen2_date`} label="Tanggal">
                <Input id={`${idPrefix}-specimen2_date`} {...register("specimen2_date")} placeholder="03 Desember 2022" />
              </Field>
            </div>
            <Field id={`${idPrefix}-specimen2_story`} label="Catatan Herbisida Kenangan">
              <Textarea id={`${idPrefix}-specimen2_story`} {...register("specimen2_story")} rows={2} />
            </Field>
          </div>

          {/* Specimen 3 */}
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <div className="font-semibold text-xs text-primary uppercase tracking-wider">
              Spesimen 3 (Plate #03)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field id={`${idPrefix}-specimen3_name`} label="Nama Latin">
                <Input id={`${idPrefix}-specimen3_name`} {...register("specimen3_name")} placeholder="Lavandula Serenitatis" />
              </Field>
              <Field id={`${idPrefix}-specimen3_common`} label="Gelar Bunga">
                <Input id={`${idPrefix}-specimen3_common`} {...register("specimen3_common")} placeholder="The Calming Lavender" />
              </Field>
            </div>
            <Field id={`${idPrefix}-specimen3_floriography`} label="Makna Floriografi">
              <Input id={`${idPrefix}-specimen3_floriography`} {...register("specimen3_floriography")} placeholder="Ketenangan jiwa..." />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field id={`${idPrefix}-specimen3_location`} label="Lokasi Temuan">
                <Input id={`${idPrefix}-specimen3_location`} {...register("specimen3_location")} placeholder="Perjalanan pulang..." />
              </Field>
              <Field id={`${idPrefix}-specimen3_date`} label="Tanggal">
                <Input id={`${idPrefix}-specimen3_date`} {...register("specimen3_date")} placeholder="19 Juni 2023" />
              </Field>
            </div>
            <Field id={`${idPrefix}-specimen3_story`} label="Catatan Herbisida Kenangan">
              <Textarea id={`${idPrefix}-specimen3_story`} {...register("specimen3_story")} rows={2} />
            </Field>
          </div>

          {/* Specimen 4 */}
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <div className="font-semibold text-xs text-primary uppercase tracking-wider">
              Spesimen 4 (Plate #04)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field id={`${idPrefix}-specimen4_name`} label="Nama Latin">
                <Input id={`${idPrefix}-specimen4_name`} {...register("specimen4_name")} placeholder="Jasminum Perpetuum" />
              </Field>
              <Field id={`${idPrefix}-specimen4_common`} label="Gelar Bunga">
                <Input id={`${idPrefix}-specimen4_common`} {...register("specimen4_common")} placeholder="The Everlasting Jasmine" />
              </Field>
            </div>
            <Field id={`${idPrefix}-specimen4_floriography`} label="Makna Floriografi">
              <Input id={`${idPrefix}-specimen4_floriography`} {...register("specimen4_floriography")} placeholder="Keharuman ketulusan..." />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field id={`${idPrefix}-specimen4_location`} label="Lokasi Temuan">
                <Input id={`${idPrefix}-specimen4_location`} {...register("specimen4_location")} placeholder="Dermaga tepi danau..." />
              </Field>
              <Field id={`${idPrefix}-specimen4_date`} label="Tanggal">
                <Input id={`${idPrefix}-specimen4_date`} {...register("specimen4_date")} placeholder="14 Februari 2024" />
              </Field>
            </div>
            <Field id={`${idPrefix}-specimen4_story`} label="Catatan Herbisida Kenangan">
              <Textarea id={`${idPrefix}-specimen4_story`} {...register("specimen4_story")} rows={2} />
            </Field>
          </div>
        </div>
      )}

      {/* Tab 4: 3 Ramuan Apoteker */}
      {activeTab === "elixirs" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-amber-500/20 bg-amber-950/10">
            <div className="text-xs text-muted-foreground">
              3 ramuan herbal cinta khas apoteker antik lengkap dengan aroma, bahan, dan efek emosional.
            </div>
            <button
              type="button"
              onClick={handleApplyPresetElixirs}
              className="px-3 py-1.5 rounded-md text-xs bg-muted hover:bg-muted/80 text-foreground font-medium flex items-center gap-1.5 self-start sm:self-auto transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Muat Resep Default</span>
            </button>
          </div>

          {/* Elixir 1 */}
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <div className="font-semibold text-xs text-amber-500 uppercase tracking-wider">
              Ramuan 1 (Vial 01)
            </div>
            <Field id={`${idPrefix}-elixir1_title`} label="Nama Ramuan">
              <Input id={`${idPrefix}-elixir1_title`} {...register("elixir1_title")} placeholder="Tincture of Midnight Solace" />
            </Field>
            <Field id={`${idPrefix}-elixir1_aroma`} label="Catatan Aroma">
              <Input id={`${idPrefix}-elixir1_aroma`} {...register("elixir1_aroma")} placeholder="Chamomile kering..." />
            </Field>
            <Field id={`${idPrefix}-elixir1_ingredients`} label="Komposisi Bahan">
              <Input id={`${idPrefix}-elixir1_ingredients`} {...register("elixir1_ingredients")} placeholder="70% pelukan hening..." />
            </Field>
            <Field id={`${idPrefix}-elixir1_effect`} label="Khasiat untuk Jiwa">
              <Input id={`${idPrefix}-elixir1_effect`} {...register("elixir1_effect")} placeholder="Meredakan lelah pikiran..." />
            </Field>
          </div>

          {/* Elixir 2 */}
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <div className="font-semibold text-xs text-emerald-500 uppercase tracking-wider">
              Ramuan 2 (Vial 02)
            </div>
            <Field id={`${idPrefix}-elixir2_title`} label="Nama Ramuan">
              <Input id={`${idPrefix}-elixir2_title`} {...register("elixir2_title")} placeholder="Cordial of Pure Laughter" />
            </Field>
            <Field id={`${idPrefix}-elixir2_aroma`} label="Catatan Aroma">
              <Input id={`${idPrefix}-elixir2_aroma`} {...register("elixir2_aroma")} placeholder="Jeruk bergamot..." />
            </Field>
            <Field id={`${idPrefix}-elixir2_ingredients`} label="Komposisi Bahan">
              <Input id={`${idPrefix}-elixir2_ingredients`} {...register("elixir2_ingredients")} placeholder="Gurauan spontan..." />
            </Field>
            <Field id={`${idPrefix}-elixir2_effect`} label="Khasiat untuk Jiwa">
              <Input id={`${idPrefix}-elixir2_effect`} {...register("elixir2_effect")} placeholder="Menerangi hari kelabu..." />
            </Field>
          </div>

          {/* Elixir 3 */}
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <div className="font-semibold text-xs text-rose-500 uppercase tracking-wider">
              Ramuan 3 (Vial 03)
            </div>
            <Field id={`${idPrefix}-elixir3_title`} label="Nama Ramuan">
              <Input id={`${idPrefix}-elixir3_title`} {...register("elixir3_title")} placeholder="Essence of Unwavering Devotion" />
            </Field>
            <Field id={`${idPrefix}-elixir3_aroma`} label="Catatan Aroma">
              <Input id={`${idPrefix}-elixir3_aroma`} {...register("elixir3_aroma")} placeholder="Kayu cendana..." />
            </Field>
            <Field id={`${idPrefix}-elixir3_ingredients`} label="Komposisi Bahan">
              <Input id={`${idPrefix}-elixir3_ingredients`} {...register("elixir3_ingredients")} placeholder="Kejujuran tanpa topeng..." />
            </Field>
            <Field id={`${idPrefix}-elixir3_effect`} label="Khasiat untuk Jiwa">
              <Input id={`${idPrefix}-elixir3_effect`} {...register("elixir3_effect")} placeholder="Membentuk perlindungan abadi..." />
            </Field>
          </div>
        </div>
      )}

      {/* Tab 5: 4 Ikrar Kebun */}
      {activeTab === "vows" && (
        <div className="space-y-5">
          <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-950/10 text-xs text-muted-foreground">
            4 janji suci pemelihara kebun cinta sejati melintasi segala musim kehidupan.
          </div>

          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <Field id={`${idPrefix}-vow1_title`} label="Ikrar 1: Judul">
              <Input id={`${idPrefix}-vow1_title`} {...register("vow1_title")} placeholder="Nurturing the Roots" />
            </Field>
            <Field id={`${idPrefix}-vow1_desc`} label="Ikrar 1: Janji">
              <Textarea id={`${idPrefix}-vow1_desc`} {...register("vow1_desc")} rows={2} />
            </Field>
          </div>

          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <Field id={`${idPrefix}-vow2_title`} label="Ikrar 2: Judul">
              <Input id={`${idPrefix}-vow2_title`} {...register("vow2_title")} placeholder="Pruning the Doubts" />
            </Field>
            <Field id={`${idPrefix}-vow2_desc`} label="Ikrar 2: Janji">
              <Textarea id={`${idPrefix}-vow2_desc`} {...register("vow2_desc")} rows={2} />
            </Field>
          </div>

          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <Field id={`${idPrefix}-vow3_title`} label="Ikrar 3: Judul">
              <Input id={`${idPrefix}-vow3_title`} {...register("vow3_title")} placeholder="Sheltering the Bloom" />
            </Field>
            <Field id={`${idPrefix}-vow3_desc`} label="Ikrar 3: Janji">
              <Textarea id={`${idPrefix}-vow3_desc`} {...register("vow3_desc")} rows={2} />
            </Field>
          </div>

          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <Field id={`${idPrefix}-vow4_title`} label="Ikrar 4: Judul">
              <Input id={`${idPrefix}-vow4_title`} {...register("vow4_title")} placeholder="Perennial Bloom" />
            </Field>
            <Field id={`${idPrefix}-vow4_desc`} label="Ikrar 4: Janji">
              <Textarea id={`${idPrefix}-vow4_desc`} {...register("vow4_desc")} rows={2} />
            </Field>
          </div>
        </div>
      )}

      {/* Tab 6: Warna & Musik */}
      {activeTab === "theme" && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 text-xs text-muted-foreground">
            Sesuaikan nuansa palet rumah kaca botani dan iringan instrumen petikan harpa akustik.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ColorPickerField
              label="Warna Dominan Konservatori"
              value={primaryColor || "#1a382b"}
              onChange={(color) => setValue("primaryColor", color)}
              presets={BACKGROUND_COLOR_PRESETS}
            />

            <ColorPickerField
              label="Warna Aksen Emas Botani"
              value={secondaryColor || "#c59b58"}
              onChange={(color) => setValue("secondaryColor", color)}
              presets={BACKGROUND_COLOR_PRESETS}
            />

            <ColorPickerField
              label="Warna Aksen Bunga Kering"
              value={accentColor || "#9b435a"}
              onChange={(color) => setValue("accentColor", color)}
              presets={BACKGROUND_COLOR_PRESETS}
            />
          </div>

          <Field
            id={`${idPrefix}-audioUrl`}
            label="URL Musik Latar (Harpa & Hujan)"
            error={errors.audioUrl?.message}
            helperText="Format MP3 publik. Audio otomatis tidak aktif di thumbnail katalog template."
          >
            <Input
              id={`${idPrefix}-audioUrl`}
              {...register("audioUrl")}
              placeholder="https://example.com/botanical-harp.mp3"
            />
          </Field>
        </div>
      )}

      {/* Bottom Step Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-border/40">
        <button
          type="button"
          disabled={activeTab === "registry"}
          onClick={() => {
            const idx = tabs.findIndex((t) => t.id === activeTab);
            if (idx > 0) setActiveTab(tabs[idx - 1].id);
          }}
          className={cn(
            "flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors",
            activeTab === "registry"
              ? "text-muted-foreground/40 cursor-not-allowed"
              : "text-foreground hover:bg-muted"
          )}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Sebelumnya</span>
        </button>

        <button
          type="button"
          disabled={activeTab === "theme"}
          onClick={() => {
            const idx = tabs.findIndex((t) => t.id === activeTab);
            if (idx < tabs.length - 1) setActiveTab(tabs[idx + 1].id);
          }}
          className={cn(
            "flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors",
            activeTab === "theme"
              ? "text-muted-foreground/40 cursor-not-allowed"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          <span>Selanjutnya</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
