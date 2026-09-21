"use client";

import { useState } from "react";
import type {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  FieldErrors,
} from "react-hook-form";
import {
  HeartHandshake,
  Scroll,
  ShieldAlert,
  Sun,
  Heart,
  Palette,
  ChevronRight,
  ChevronLeft,
  Sparkles,
} from "lucide-react";
import { Field, Input, Textarea } from "@/components/ui/field";
import { ColorPickerField } from "@/components/ui/color-picker-field";
import { cn } from "@/lib/utils/cn";
import type { LetterFormValues } from "./dynamic-form";

interface KintsugiRepairBuilderFormProps {
  register: UseFormRegister<LetterFormValues>;
  setValue: UseFormSetValue<LetterFormValues>;
  watch: UseFormWatch<LetterFormValues>;
  errors: FieldErrors<LetterFormValues>;
  idPrefix?: string;
}

type TabType =
  | "fracture_notice"
  | "washi_letter"
  | "fractures"
  | "golden_vows"
  | "treasures"
  | "theme";

export function KintsugiRepairBuilderForm({
  register,
  setValue,
  watch,
  errors,
  idPrefix = "kintsugi-repair",
}: KintsugiRepairBuilderFormProps) {
  const [activeTab, setActiveTab] = useState<TabType>("fracture_notice");

  const tabs: Array<{ id: TabType; label: string; icon: React.ReactNode }> = [
    { id: "fracture_notice", label: "Pengakuan Keretakan", icon: <HeartHandshake className="w-4 h-4" /> },
    { id: "washi_letter", label: "Surat Washi", icon: <Scroll className="w-4 h-4" /> },
    { id: "fractures", label: "4 Titik Keretakan", icon: <ShieldAlert className="w-4 h-4" /> },
    { id: "golden_vows", label: "3 Janji Emas", icon: <Sun className="w-4 h-4" /> },
    { id: "treasures", label: "4 Kenangan Murni", icon: <Heart className="w-4 h-4" /> },
    { id: "theme", label: "Warna & Musik", icon: <Palette className="w-4 h-4" /> },
  ];

  const primaryColor = watch("primaryColor") as string;
  const backgroundColor = watch("backgroundColor") as string;

  const handleApplyPresetFractures = () => {
    setValue("fracture1_name", "The Fracture of Careless Words (Kata-Kata Ceroboh)");
    setValue(
      "fracture1_admit",
      "Aku mengucapkan kalimat tajam bernada dingin saat emosiku sedang tidak terkontrol."
    );
    setValue(
      "fracture1_impact",
      "Aku tahu kata-kata itu meruntuhkan rasa percaya dan membuatmu merasa tidak dihargai."
    );

    setValue("fracture2_name", "The Fracture of Broken Presence (Kelalaian Mendengarkan)");
    setValue(
      "fracture2_admit",
      "Aku terlalu sibuk dengan duniaku sendiri dan gagal memberikan perhatian penuh saat kau butuh."
    );
    setValue(
      "fracture2_impact",
      "Kau merasa diabaikan dan sendirian menanggung rasa cemas di tengah keheningan."
    );

    setValue("fracture3_name", "The Fracture of False Pride (Ego & Keras Kepala)");
    setValue(
      "fracture3_admit",
      "Aku sempat bersikeras membela diri bukannya langsung memeluk dan memahami sudut pandangmu."
    );
    setValue(
      "fracture3_impact",
      "Ego kasarku membuatmu merasa terpojok dan terluka dua kali lipat."
    );

    setValue("fracture4_name", "The Fracture of Lingering Silence (Mendiamkan Masalah)");
    setValue(
      "fracture4_admit",
      "Aku menarik diri dan membiarkan jeda waktu tanpa komunikasi memperlebar jarak di antara kita."
    );
    setValue(
      "fracture4_impact",
      "Keheningan itu bukan memberi kedamaian, melainkan menyiksa hatimu dengan ketidakpastian."
    );
  };

  const handleApplyPresetVows = () => {
    setValue("vow1_title", "The Golden Lacquer of Active Listening");
    setValue("vow1_lacquer", "Mendengar Penuh Tanpa Membela Diri");
    setValue(
      "vow1_action",
      "Setiap kali ada perbedaan pendapat, aku akan meletakkan gawaiku, menatap matamu, dan menyimak apa yang kau rasakan sebelum berbicara sepatah kata pun."
    );

    setValue("vow2_title", "The Golden Lacquer of Radical Honesty");
    setValue("vow2_lacquer", "Transparansi Penuh & Kerentanan Diri");
    setValue(
      "vow2_action",
      "Mengakui kelelahanku sejak awal secara jujur tanpa melampiaskan kekesalan, dan tidak lagi menyembunyikan perasaan di balik topeng diam."
    );

    setValue("vow3_title", "The Golden Lacquer of Patient Reverence");
    setValue("vow3_lacquer", "Menghormati Batasan & Proses Penyembuhan");
    setValue(
      "vow3_action",
      "Aku tidak akan memaksamu untuk langsung tersenyum seolah tidak terjadi apa-apa. Aku akan membuktikan perubahanku lewat ketulusan konsisten."
    );
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

      {/* Tab 1: Pengakuan Keretakan */}
      {activeTab === "fracture_notice" && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-950/10 text-xs text-muted-foreground">
            Piagam pengakuan kesalahan jujur atas ikatan yang retak, mengakui luka tanpa mencari alasan pembelaan diri.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              id={`${idPrefix}-recipientName`}
              label="Nama Penerima Maaf (Sosok yang Terluka)"
              error={errors.recipientName?.message}
              required
            >
              <Input
                id={`${idPrefix}-recipientName`}
                {...register("recipientName", { required: "Nama penerima wajib diisi" })}
                placeholder="Laras Kirana"
              />
            </Field>

            <Field
              id={`${idPrefix}-senderName`}
              label="Nama Pemohon Maaf (Pengirim)"
              error={errors.senderName?.message}
              required
            >
              <Input
                id={`${idPrefix}-senderName`}
                {...register("senderName", { required: "Nama pengirim wajib diisi" })}
                placeholder="Dimas Suryaputra"
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              id={`${idPrefix}-restorationCode`}
              label="Kode Rekonsiliasi Kintsugi"
              error={errors.restorationCode?.message}
            >
              <Input
                id={`${idPrefix}-restorationCode`}
                {...register("restorationCode")}
                placeholder="KINTSUGI-HEAL-2024"
              />
            </Field>

            <Field
              id={`${idPrefix}-incidentDate`}
              label="Waktu Terjadinya Kesalahan"
              error={errors.incidentDate?.message}
            >
              <Input
                id={`${idPrefix}-incidentDate`}
                {...register("incidentDate")}
                placeholder="Momen yang Menggores Hatimu"
              />
            </Field>
          </div>

          <Field
            id={`${idPrefix}-vesselTitle`}
            label="Nama Ikatan / Bejana yang Terluka"
            error={errors.vesselTitle?.message}
          >
            <Input
              id={`${idPrefix}-vesselTitle`}
              {...register("vesselTitle")}
              placeholder="The Vessel of Our Shared Heart & Trust"
            />
          </Field>

          <Field
            id={`${idPrefix}-accountabilityNote`}
            label="Pernyataan Tanggung Jawab Tanpa Pembenaran"
            error={errors.accountabilityNote?.message}
          >
            <Textarea
              id={`${idPrefix}-accountabilityNote`}
              {...register("accountabilityNote")}
              rows={3}
              placeholder="Aku mengakui kesalahanku sepenuhnya..."
            />
          </Field>
        </div>
      )}

      {/* Tab 2: Surat Washi */}
      {activeTab === "washi_letter" && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-stone-500/20 bg-stone-900/40 text-xs text-muted-foreground">
            Surat refleksi penyesalan mendalam di atas kertas washi berstempel Hanko ketulusan (誠).
          </div>

          <Field
            id={`${idPrefix}-salutation`}
            label="Salam Pembuka Surat"
            error={errors.salutation?.message}
          >
            <Input
              id={`${idPrefix}-salutation`}
              {...register("salutation")}
              placeholder="Untukmu yang Hatiku Telah Lukai,"
            />
          </Field>

          <Field
            id={`${idPrefix}-message`}
            label="Isi Surat Refleksi & Penyesalan"
            error={errors.message?.message}
            required
          >
            <Textarea
              id={`${idPrefix}-message`}
              {...register("message", { required: "Isi surat wajib diisi" })}
              rows={8}
              placeholder="Tuliskan penyesalan dan kejujuran dari lubuk hati terdalam..."
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
                placeholder="Dengan segenap penyesalan dan kerendahan hati,"
              />
            </Field>

            <Field
              id={`${idPrefix}-sealKanji`}
              label="Karakter Stempel Segel Hanko"
              error={errors.sealKanji?.message}
            >
              <Input
                id={`${idPrefix}-sealKanji`}
                {...register("sealKanji")}
                placeholder="誠"
                maxLength={10}
              />
            </Field>
          </div>
        </div>
      )}

      {/* Tab 3: 4 Titik Keretakan */}
      {activeTab === "fractures" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-rose-500/20 bg-rose-950/10">
            <div className="text-xs text-muted-foreground">
              4 titik keretakan spesifik dengan pengakuan kesalahan dan kesadaran akan luka yang ditimbulkan.
            </div>
            <button
              type="button"
              onClick={handleApplyPresetFractures}
              className="px-3 py-1.5 rounded-md text-xs bg-muted hover:bg-muted/80 text-foreground font-medium flex items-center gap-1.5 self-start sm:self-auto transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Muat Keretakan Default</span>
            </button>
          </div>

          {/* Fracture 1 */}
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <div className="font-semibold text-xs text-rose-500 uppercase tracking-wider">
              Keretakan 1 (Kata-Kata)
            </div>
            <Field id={`${idPrefix}-fracture1_name`} label="Jenis Kesalahan">
              <Input id={`${idPrefix}-fracture1_name`} {...register("fracture1_name")} placeholder="The Fracture of Careless Words" />
            </Field>
            <Field id={`${idPrefix}-fracture1_admit`} label="Pengakuan Kesalahanku">
              <Textarea id={`${idPrefix}-fracture1_admit`} {...register("fracture1_admit")} rows={2} />
            </Field>
            <Field id={`${idPrefix}-fracture1_impact`} label="Dampak Luka pada Hatimu">
              <Textarea id={`${idPrefix}-fracture1_impact`} {...register("fracture1_impact")} rows={2} />
            </Field>
          </div>

          {/* Fracture 2 */}
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <div className="font-semibold text-xs text-sky-500 uppercase tracking-wider">
              Keretakan 2 (Kelalaian Mendengarkan)
            </div>
            <Field id={`${idPrefix}-fracture2_name`} label="Jenis Kesalahan">
              <Input id={`${idPrefix}-fracture2_name`} {...register("fracture2_name")} placeholder="The Fracture of Broken Presence" />
            </Field>
            <Field id={`${idPrefix}-fracture2_admit`} label="Pengakuan Kesalahanku">
              <Textarea id={`${idPrefix}-fracture2_admit`} {...register("fracture2_admit")} rows={2} />
            </Field>
            <Field id={`${idPrefix}-fracture2_impact`} label="Dampak Luka pada Hatimu">
              <Textarea id={`${idPrefix}-fracture2_impact`} {...register("fracture2_impact")} rows={2} />
            </Field>
          </div>

          {/* Fracture 3 */}
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <div className="font-semibold text-xs text-amber-500 uppercase tracking-wider">
              Keretakan 3 (Ego & Keras Kepala)
            </div>
            <Field id={`${idPrefix}-fracture3_name`} label="Jenis Kesalahan">
              <Input id={`${idPrefix}-fracture3_name`} {...register("fracture3_name")} placeholder="The Fracture of False Pride" />
            </Field>
            <Field id={`${idPrefix}-fracture3_admit`} label="Pengakuan Kesalahanku">
              <Textarea id={`${idPrefix}-fracture3_admit`} {...register("fracture3_admit")} rows={2} />
            </Field>
            <Field id={`${idPrefix}-fracture3_impact`} label="Dampak Luka pada Hatimu">
              <Textarea id={`${idPrefix}-fracture3_impact`} {...register("fracture3_impact")} rows={2} />
            </Field>
          </div>

          {/* Fracture 4 */}
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <div className="font-semibold text-xs text-stone-400 uppercase tracking-wider">
              Keretakan 4 (Mendiamkan Masalah)
            </div>
            <Field id={`${idPrefix}-fracture4_name`} label="Jenis Kesalahan">
              <Input id={`${idPrefix}-fracture4_name`} {...register("fracture4_name")} placeholder="The Fracture of Lingering Silence" />
            </Field>
            <Field id={`${idPrefix}-fracture4_admit`} label="Pengakuan Kesalahanku">
              <Textarea id={`${idPrefix}-fracture4_admit`} {...register("fracture4_admit")} rows={2} />
            </Field>
            <Field id={`${idPrefix}-fracture4_impact`} label="Dampak Luka pada Hatimu">
              <Textarea id={`${idPrefix}-fracture4_impact`} {...register("fracture4_impact")} rows={2} />
            </Field>
          </div>
        </div>
      )}

      {/* Tab 4: 3 Janji Pernis Emas */}
      {activeTab === "golden_vows" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-amber-500/20 bg-amber-950/10">
            <div className="text-xs text-muted-foreground">
              3 janji pernis emas Kintsugi sebagai formula konkret komitmen perbaikan diri.
            </div>
            <button
              type="button"
              onClick={handleApplyPresetVows}
              className="px-3 py-1.5 rounded-md text-xs bg-muted hover:bg-muted/80 text-foreground font-medium flex items-center gap-1.5 self-start sm:self-auto transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Muat Janji Default</span>
            </button>
          </div>

          {/* Vow 1 */}
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <div className="font-semibold text-xs text-amber-500 uppercase tracking-wider">
              Janji Emas 1 (Active Listening)
            </div>
            <Field id={`${idPrefix}-vow1_title`} label="Nama Janji">
              <Input id={`${idPrefix}-vow1_title`} {...register("vow1_title")} placeholder="The Golden Lacquer of Active Listening" />
            </Field>
            <Field id={`${idPrefix}-vow1_lacquer`} label="Formula Komitmen">
              <Input id={`${idPrefix}-vow1_lacquer`} {...register("vow1_lacquer")} placeholder="Mendengar Penuh Tanpa Membela Diri" />
            </Field>
            <Field id={`${idPrefix}-vow1_action`} label="Tindakan Nyata Sehari-hari">
              <Textarea id={`${idPrefix}-vow1_action`} {...register("vow1_action")} rows={2} />
            </Field>
          </div>

          {/* Vow 2 */}
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <div className="font-semibold text-xs text-amber-500 uppercase tracking-wider">
              Janji Emas 2 (Radical Honesty)
            </div>
            <Field id={`${idPrefix}-vow2_title`} label="Nama Janji">
              <Input id={`${idPrefix}-vow2_title`} {...register("vow2_title")} placeholder="The Golden Lacquer of Radical Honesty" />
            </Field>
            <Field id={`${idPrefix}-vow2_lacquer`} label="Formula Komitmen">
              <Input id={`${idPrefix}-vow2_lacquer`} {...register("vow2_lacquer")} placeholder="Transparansi Penuh & Kerentanan Diri" />
            </Field>
            <Field id={`${idPrefix}-vow2_action`} label="Tindakan Nyata Sehari-hari">
              <Textarea id={`${idPrefix}-vow2_action`} {...register("vow2_action")} rows={2} />
            </Field>
          </div>

          {/* Vow 3 */}
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <div className="font-semibold text-xs text-amber-500 uppercase tracking-wider">
              Janji Emas 3 (Patient Reverence)
            </div>
            <Field id={`${idPrefix}-vow3_title`} label="Nama Janji">
              <Input id={`${idPrefix}-vow3_title`} {...register("vow3_title")} placeholder="The Golden Lacquer of Patient Reverence" />
            </Field>
            <Field id={`${idPrefix}-vow3_lacquer`} label="Formula Komitmen">
              <Input id={`${idPrefix}-vow3_lacquer`} {...register("vow3_lacquer")} placeholder="Menghormati Batasan & Waktu" />
            </Field>
            <Field id={`${idPrefix}-vow3_action`} label="Tindakan Nyata Sehari-hari">
              <Textarea id={`${idPrefix}-vow3_action`} {...register("vow3_action")} rows={2} />
            </Field>
          </div>
        </div>
      )}

      {/* Tab 5: 4 Kenangan Murni */}
      {activeTab === "treasures" && (
        <div className="space-y-5">
          <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-950/10 text-xs text-muted-foreground">
            4 kenangan dan nilai murni yang membuktikan mengapa ikatan ini terlalu berharga untuk dilepaskan.
          </div>

          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <Field id={`${idPrefix}-treasure1_title`} label="Kenangan 1: Judul">
              <Input id={`${idPrefix}-treasure1_title`} {...register("treasure1_title")} placeholder="The Warmth of Your Forgiving Smile" />
            </Field>
            <Field id={`${idPrefix}-treasure1_desc`} label="Kenangan 1: Nilai Berharga">
              <Textarea id={`${idPrefix}-treasure1_desc`} {...register("treasure1_desc")} rows={2} />
            </Field>
          </div>

          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <Field id={`${idPrefix}-treasure2_title`} label="Kenangan 2: Judul">
              <Input id={`${idPrefix}-treasure2_title`} {...register("treasure2_title")} placeholder="Our Midnight Safe Haven" />
            </Field>
            <Field id={`${idPrefix}-treasure2_desc`} label="Kenangan 2: Nilai Berharga">
              <Textarea id={`${idPrefix}-treasure2_desc`} {...register("treasure2_desc")} rows={2} />
            </Field>
          </div>

          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <Field id={`${idPrefix}-treasure3_title`} label="Kenangan 3: Judul">
              <Input id={`${idPrefix}-treasure3_title`} {...register("treasure3_title")} placeholder="Shared Dreams Built from Scratch" />
            </Field>
            <Field id={`${idPrefix}-treasure3_desc`} label="Kenangan 3: Nilai Berharga">
              <Textarea id={`${idPrefix}-treasure3_desc`} {...register("treasure3_desc")} rows={2} />
            </Field>
          </div>

          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <Field id={`${idPrefix}-treasure4_title`} label="Kenangan 4: Judul">
              <Input id={`${idPrefix}-treasure4_title`} {...register("treasure4_title")} placeholder="The Unbreakable Bond of Growth" />
            </Field>
            <Field id={`${idPrefix}-treasure4_desc`} label="Kenangan 4: Nilai Berharga">
              <Textarea id={`${idPrefix}-treasure4_desc`} {...register("treasure4_desc")} rows={2} />
            </Field>
          </div>
        </div>
      )}

      {/* Tab 6: Warna & Musik Zen */}
      {activeTab === "theme" && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 text-xs text-muted-foreground">
            Sesuaikan nuansa palet wabi-sabi Kintsugi dan alunan musik meditatif seruling Shakuhachi.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ColorPickerField
              label="Warna Emas Kintsugi"
              value={primaryColor || "#d4af37"}
              onChange={(color) => setValue("primaryColor", color)}
              presets={[
                { label: "Kintsugi Liquid Gold", value: "#d4af37" },
                { label: "Warm Urushi Amber", value: "#caa64f" },
                { label: "Subtle Brass Foil", value: "#c29b61" },
              ]}
            />

            <ColorPickerField
              label="Warna Latar Wabi-Sabi"
              value={backgroundColor || "#0f1318"}
              onChange={(color) => setValue("backgroundColor", color)}
              presets={[
                { label: "Zen Slate Charcoal", value: "#0f1318" },
                { label: "Kyoto Temple Night", value: "#14181f" },
                { label: "Dark Earth Ware", value: "#1a1614" },
              ]}
            />
          </div>

          <Field
            id={`${idPrefix}-audioUrl`}
            label="URL Musik Seruling Zen (Shakuhachi & Koto)"
            error={errors.audioUrl?.message}
            helperText="Format MP3 publik. Audio otomatis tidak aktif di thumbnail katalog template."
          >
            <Input
              id={`${idPrefix}-audioUrl`}
              {...register("audioUrl")}
              placeholder="https://example.com/zen-healing.mp3"
            />
          </Field>
        </div>
      )}

      {/* Bottom Step Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-border/40">
        <button
          type="button"
          disabled={activeTab === "fracture_notice"}
          onClick={() => {
            const idx = tabs.findIndex((t) => t.id === activeTab);
            if (idx > 0) setActiveTab(tabs[idx - 1].id);
          }}
          className={cn(
            "flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors",
            activeTab === "fracture_notice"
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
