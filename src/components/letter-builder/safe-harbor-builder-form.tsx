"use client";

import { useState } from "react";
import type {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  FieldErrors,
} from "react-hook-form";
import {
  Ship,
  Scroll,
  Waves,
  Anchor,
  Compass,
  Palette,
  ChevronRight,
  ChevronLeft,
  Sparkles,
} from "lucide-react";
import { Field, Input, Textarea } from "@/components/ui/field";
import { ColorPickerField } from "@/components/ui/color-picker-field";
import { cn } from "@/lib/utils/cn";
import type { LetterFormValues } from "./dynamic-form";

interface SafeHarborBuilderFormProps {
  register: UseFormRegister<LetterFormValues>;
  setValue: UseFormSetValue<LetterFormValues>;
  watch: UseFormWatch<LetterFormValues>;
  errors: FieldErrors<LetterFormValues>;
  idPrefix?: string;
}

type TabType =
  | "logbook"
  | "dispatch"
  | "waves"
  | "anchors"
  | "calm_waters"
  | "theme";

export function SafeHarborBuilderForm({
  register,
  setValue,
  watch,
  errors,
  idPrefix = "safe-harbor",
}: SafeHarborBuilderFormProps) {
  const [activeTab, setActiveTab] = useState<TabType>("logbook");

  const tabs: Array<{ id: TabType; label: string; icon: React.ReactNode }> = [
    { id: "logbook", label: "Log Navigasi", icon: <Ship className="w-4 h-4" /> },
    { id: "dispatch", label: "Surat Mercusuar", icon: <Scroll className="w-4 h-4" /> },
    { id: "waves", label: "4 Gelombang", icon: <Waves className="w-4 h-4" /> },
    { id: "anchors", label: "3 Jangkar", icon: <Anchor className="w-4 h-4" /> },
    { id: "calm_waters", label: "4 Perairan Tenang", icon: <Compass className="w-4 h-4" /> },
    { id: "theme", label: "Warna & Musik", icon: <Palette className="w-4 h-4" /> },
  ];

  const primaryColor = watch("primaryColor") as string;
  const secondaryColor = watch("secondaryColor") as string;
  const backgroundColor = watch("backgroundColor") as string;

  const handleApplyPresetWaves = () => {
    setValue("wave1_name", "The Gale of Careless Anger (Badai Emosi Sesaat)");
    setValue(
      "wave1_admit",
      "Aku membiarkan rasa frustrasi melahirkan kata-kata tajam yang menghantam perasaanmu tanpa ampun."
    );
    setValue(
      "wave1_impact",
      "Kau merasa takut, tidak aman, dan terkejut melihat sisi diriku yang kehilangan kelembutan."
    );

    setValue("wave2_name", "The Hidden Reef of Misplaced Pride (Karang Tersembunyi Ego)");
    setValue(
      "wave2_admit",
      "Aku menolak menurunkan layar gengsi dan bersikeras mencari pembenaran atas kesalahanku."
    );
    setValue(
      "wave2_impact",
      "Kau merasa suaramu tidak didengar dan seolah-olah kemenangan argumen lebih kuutamakan daripada hatimu."
    );

    setValue("wave3_name", "The Drifting Current of Inattention (Arus Kelalaian Menjaga)");
    setValue(
      "wave3_admit",
      "Aku terlalu sibuk menatap ombak di luar hingga lalai memperhatikan bahwa air laut sudah merembes ke geladak hatimu."
    );
    setValue(
      "wave3_impact",
      "Kau merasa lelah berjuang sendirian menjaga keutuhan kapal ini saat aku terlena."
    );

    setValue("wave4_name", "The Cold Fog of Silence (Kabut Dingin Keterpisahan)");
    setValue(
      "wave4_admit",
      "Aku memilih menutup diri dan diam berhari-hari bukannya segera mendayung mendekat untuk memelukmu."
    );
    setValue(
      "wave4_impact",
      "Keheningan itu membuatmu merasa terasing di tengah lautan luas yang gelap dan dingin."
    );
  };

  const handleApplyPresetAnchors = () => {
    setValue("anchor1_name", "The Anchor of Absolute Humility");
    setValue("anchor1_virtue", "Menurunkan Gengsi & Menghentikan Debat");
    setValue(
      "anchor1_action",
      "Aku tidak akan lagi mencari siapa yang salah atau benar. Aku memilih mengalah dan merangkul perasaanmu dengan kelembutan penuh."
    );

    setValue("anchor2_name", "The Anchor of Gentle Harbor");
    setValue("anchor2_virtue", "Menjadikan Diri Ruang Aman Penuh Kasih");
    setValue(
      "anchor2_action",
      "Menciptakan suasana rumah dan pelukan di mana kau bebas menangis, mengeluh, dan mengungkapkan rasa kecewamu tanpa takut dihakimi."
    );

    setValue("anchor3_name", "The Steadfast Beacon of Patience");
    setValue("anchor3_virtue", "Kesetiaan Menunggu Tanpa Menuntut");
    setValue(
      "anchor3_action",
      "Aku tidak akan menuntutmu segera memaafkanku. Aku akan terus menjaga nyala api kebaikan dan perhatian kecil setiap hari hingga hatimu benar-benar pulih."
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

      {/* Tab 1: Log Navigasi Badai */}
      {activeTab === "logbook" && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-950/10 text-xs text-muted-foreground">
            Buku log navigasi maritim resmi yang mencatat badai dan mengakui kelalaian tanpa menyalahkan arah angin.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              id={`${idPrefix}-recipientName`}
              label="Nama Nahkoda (Penerima Maaf)"
              error={errors.recipientName?.message}
              required
            >
              <Input
                id={`${idPrefix}-recipientName`}
                {...register("recipientName", { required: "Nama penerima wajib diisi" })}
                placeholder="Clarissa Amanda"
              />
            </Field>

            <Field
              id={`${idPrefix}-senderName`}
              label="Penjaga Mercusuar (Pengirim)"
              error={errors.senderName?.message}
              required
            >
              <Input
                id={`${idPrefix}-senderName`}
                {...register("senderName", { required: "Nama pengirim wajib diisi" })}
                placeholder="Arkananta"
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              id={`${idPrefix}-logbookNo`}
              label="Nomor Log Navigasi"
              error={errors.logbookNo?.message}
            >
              <Input
                id={`${idPrefix}-logbookNo`}
                {...register("logbookNo")}
                placeholder="HARBOR-RESTORE-2024"
              />
            </Field>

            <Field
              id={`${idPrefix}-vesselName`}
              label="Nama Bahtera Hubungan"
              error={errors.vesselName?.message}
            >
              <Input
                id={`${idPrefix}-vesselName`}
                {...register("vesselName")}
                placeholder="The Voyage of Us"
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              id={`${idPrefix}-stormDate`}
              label="Waktu Badai Memuncak"
              error={errors.stormDate?.message}
            >
              <Input
                id={`${idPrefix}-stormDate`}
                {...register("stormDate")}
                placeholder="Malam Saat Badai Mengguncang"
              />
            </Field>

            <Field
              id={`${idPrefix}-stormLocation`}
              label="Koordinat / Wilayah Perairan"
              error={errors.stormLocation?.message}
            >
              <Input
                id={`${idPrefix}-stormLocation`}
                {...register("stormLocation")}
                placeholder="The Turbulent Waters of Misunderstanding"
              />
            </Field>
          </div>

          <Field
            id={`${idPrefix}-accountabilityNote`}
            label="Pernyataan Tanggung Jawab atas Badai"
            error={errors.accountabilityNote?.message}
          >
            <Textarea
              id={`${idPrefix}-accountabilityNote`}
              {...register("accountabilityNote")}
              rows={3}
              placeholder="Aku mengakui bahwa keegoisanku telah mengguncang bahtera..."
            />
          </Field>
        </div>
      )}

      {/* Tab 2: Surat Mercusuar */}
      {activeTab === "dispatch" && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-sky-500/20 bg-sky-950/10 text-xs text-muted-foreground">
            Surat rekonsiliasi yang ditulis dari balik temaram lentera mercusuar di atas kertas perkamen logbook tahan cuaca.
          </div>

          <Field
            id={`${idPrefix}-salutation`}
            label="Salam Pembuka Surat"
            error={errors.salutation?.message}
          >
            <Input
              id={`${idPrefix}-salutation`}
              {...register("salutation")}
              placeholder="Untuk Nahkoda yang Paling Kucintai di Tengah Badai,"
            />
          </Field>

          <Field
            id={`${idPrefix}-message`}
            label="Isi Surat Penjaga Mercusuar (Pesan Rekonsiliasi)"
            error={errors.message?.message}
            required
          >
            <Textarea
              id={`${idPrefix}-message`}
              {...register("message", { required: "Isi surat wajib diisi" })}
              rows={8}
              placeholder="Tuliskan penyesalan dan pesan damai dari lubuk hati terdalam..."
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
                placeholder="Dari dermaga yang selalu menunggumu pulang dengan damai,"
              />
            </Field>

            <Field
              id={`${idPrefix}-sealInitials`}
              label="Inisial Stempel Kompas Mercusuar"
              error={errors.sealInitials?.message}
            >
              <Input
                id={`${idPrefix}-sealInitials`}
                {...register("sealInitials")}
                placeholder="A & C"
                maxLength={10}
              />
            </Field>
          </div>
        </div>
      )}

      {/* Tab 3: 4 Gelombang Badai */}
      {activeTab === "waves" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-rose-500/20 bg-rose-950/10">
            <div className="text-xs text-muted-foreground">
              4 guncangan ombak badai yang diakui dengan jujur beserta dampaknya pada perasaan pasangan.
            </div>
            <button
              type="button"
              onClick={handleApplyPresetWaves}
              className="px-3 py-1.5 rounded-md text-xs bg-muted hover:bg-muted/80 text-foreground font-medium flex items-center gap-1.5 self-start sm:self-auto transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Muat Gelombang Default</span>
            </button>
          </div>

          {/* Wave 1 */}
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <div className="font-semibold text-xs text-rose-500 uppercase tracking-wider">
              Gelombang 1 (Emosi Sesaat)
            </div>
            <Field id={`${idPrefix}-wave1_name`} label="Nama Gelombang">
              <Input id={`${idPrefix}-wave1_name`} {...register("wave1_name")} placeholder="The Gale of Careless Anger" />
            </Field>
            <Field id={`${idPrefix}-wave1_admit`} label="Kelalaian / Kesalahanku">
              <Textarea id={`${idPrefix}-wave1_admit`} {...register("wave1_admit")} rows={2} />
            </Field>
            <Field id={`${idPrefix}-wave1_impact`} label="Guncangan yang Kau Rasakan">
              <Textarea id={`${idPrefix}-wave1_impact`} {...register("wave1_impact")} rows={2} />
            </Field>
          </div>

          {/* Wave 2 */}
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <div className="font-semibold text-xs text-amber-500 uppercase tracking-wider">
              Gelombang 2 (Karang Ego)
            </div>
            <Field id={`${idPrefix}-wave2_name`} label="Nama Gelombang">
              <Input id={`${idPrefix}-wave2_name`} {...register("wave2_name")} placeholder="The Hidden Reef of Misplaced Pride" />
            </Field>
            <Field id={`${idPrefix}-wave2_admit`} label="Kelalaian / Kesalahanku">
              <Textarea id={`${idPrefix}-wave2_admit`} {...register("wave2_admit")} rows={2} />
            </Field>
            <Field id={`${idPrefix}-wave2_impact`} label="Guncangan yang Kau Rasakan">
              <Textarea id={`${idPrefix}-wave2_impact`} {...register("wave2_impact")} rows={2} />
            </Field>
          </div>

          {/* Wave 3 */}
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <div className="font-semibold text-xs text-cyan-500 uppercase tracking-wider">
              Gelombang 3 (Kelalaian Menjaga)
            </div>
            <Field id={`${idPrefix}-wave3_name`} label="Nama Gelombang">
              <Input id={`${idPrefix}-wave3_name`} {...register("wave3_name")} placeholder="The Drifting Current of Inattention" />
            </Field>
            <Field id={`${idPrefix}-wave3_admit`} label="Kelalaian / Kesalahanku">
              <Textarea id={`${idPrefix}-wave3_admit`} {...register("wave3_admit")} rows={2} />
            </Field>
            <Field id={`${idPrefix}-wave3_impact`} label="Guncangan yang Kau Rasakan">
              <Textarea id={`${idPrefix}-wave3_impact`} {...register("wave3_impact")} rows={2} />
            </Field>
          </div>

          {/* Wave 4 */}
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <div className="font-semibold text-xs text-slate-400 uppercase tracking-wider">
              Gelombang 4 (Kabut Diam)
            </div>
            <Field id={`${idPrefix}-wave4_name`} label="Nama Gelombang">
              <Input id={`${idPrefix}-wave4_name`} {...register("wave4_name")} placeholder="The Cold Fog of Silence" />
            </Field>
            <Field id={`${idPrefix}-wave4_admit`} label="Kelalaian / Kesalahanku">
              <Textarea id={`${idPrefix}-wave4_admit`} {...register("wave4_admit")} rows={2} />
            </Field>
            <Field id={`${idPrefix}-wave4_impact`} label="Guncangan yang Kau Rasakan">
              <Textarea id={`${idPrefix}-wave4_impact`} {...register("wave4_impact")} rows={2} />
            </Field>
          </div>
        </div>
      )}

      {/* Tab 4: 3 Jangkar Perdamaian */}
      {activeTab === "anchors" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-amber-500/20 bg-amber-950/10">
            <div className="text-xs text-muted-foreground">
              3 jangkar kokoh untuk menghentikan guncangan dan menenangkan suasana perairan.
            </div>
            <button
              type="button"
              onClick={handleApplyPresetAnchors}
              className="px-3 py-1.5 rounded-md text-xs bg-muted hover:bg-muted/80 text-foreground font-medium flex items-center gap-1.5 self-start sm:self-auto transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Muat Jangkar Default</span>
            </button>
          </div>

          {/* Anchor 1 */}
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <div className="font-semibold text-xs text-amber-500 uppercase tracking-wider">
              Jangkar 1 (Kerendahan Hati)
            </div>
            <Field id={`${idPrefix}-anchor1_name`} label="Nama Jangkar">
              <Input id={`${idPrefix}-anchor1_name`} {...register("anchor1_name")} placeholder="The Anchor of Absolute Humility" />
            </Field>
            <Field id={`${idPrefix}-anchor1_virtue`} label="Formula Perdamaian">
              <Input id={`${idPrefix}-anchor1_virtue`} {...register("anchor1_virtue")} placeholder="Menurunkan Gengsi & Menghentikan Debat" />
            </Field>
            <Field id={`${idPrefix}-anchor1_action`} label="Tindakan Nyata Sehari-hari">
              <Textarea id={`${idPrefix}-anchor1_action`} {...register("anchor1_action")} rows={2} />
            </Field>
          </div>

          {/* Anchor 2 */}
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <div className="font-semibold text-xs text-amber-500 uppercase tracking-wider">
              Jangkar 2 (Ruang Aman)
            </div>
            <Field id={`${idPrefix}-anchor2_name`} label="Nama Jangkar">
              <Input id={`${idPrefix}-anchor2_name`} {...register("anchor2_name")} placeholder="The Anchor of Gentle Harbor" />
            </Field>
            <Field id={`${idPrefix}-anchor2_virtue`} label="Formula Perdamaian">
              <Input id={`${idPrefix}-anchor2_virtue`} {...register("anchor2_virtue")} placeholder="Menjadikan Diri Ruang Aman" />
            </Field>
            <Field id={`${idPrefix}-anchor2_action`} label="Tindakan Nyata Sehari-hari">
              <Textarea id={`${idPrefix}-anchor2_action`} {...register("anchor2_action")} rows={2} />
            </Field>
          </div>

          {/* Anchor 3 */}
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <div className="font-semibold text-xs text-amber-500 uppercase tracking-wider">
              Jangkar 3 (Kesabaran Tanpa Menuntut)
            </div>
            <Field id={`${idPrefix}-anchor3_name`} label="Nama Jangkar">
              <Input id={`${idPrefix}-anchor3_name`} {...register("anchor3_name")} placeholder="The Steadfast Beacon of Patience" />
            </Field>
            <Field id={`${idPrefix}-anchor3_virtue`} label="Formula Perdamaian">
              <Input id={`${idPrefix}-anchor3_virtue`} {...register("anchor3_virtue")} placeholder="Kesetiaan Menunggu Tanpa Menuntut" />
            </Field>
            <Field id={`${idPrefix}-anchor3_action`} label="Tindakan Nyata Sehari-hari">
              <Textarea id={`${idPrefix}-anchor3_action`} {...register("anchor3_action")} rows={2} />
            </Field>
          </div>
        </div>
      )}

      {/* Tab 5: 4 Perairan Tenang */}
      {activeTab === "calm_waters" && (
        <div className="space-y-5">
          <div className="p-4 rounded-xl border border-cyan-500/20 bg-cyan-950/10 text-xs text-muted-foreground">
            4 kenangan teduh dan perairan tenang yang menjadi tujuan kita berlayar kembali.
          </div>

          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <Field id={`${idPrefix}-calm1_title`} label="Perairan 1: Judul Momen">
              <Input id={`${idPrefix}-calm1_title`} {...register("calm1_title")} placeholder="The Sunlit Morning Waters" />
            </Field>
            <Field id={`${idPrefix}-calm1_desc`} label="Perairan 1: Kenangan Teduh">
              <Textarea id={`${idPrefix}-calm1_desc`} {...register("calm1_desc")} rows={2} />
            </Field>
          </div>

          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <Field id={`${idPrefix}-calm2_title`} label="Perairan 2: Judul Momen">
              <Input id={`${idPrefix}-calm2_title`} {...register("calm2_title")} placeholder="The Harbor of Honest Laughter" />
            </Field>
            <Field id={`${idPrefix}-calm2_desc`} label="Perairan 2: Kenangan Teduh">
              <Textarea id={`${idPrefix}-calm2_desc`} {...register("calm2_desc")} rows={2} />
            </Field>
          </div>

          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <Field id={`${idPrefix}-calm3_title`} label="Perairan 3: Judul Momen">
              <Input id={`${idPrefix}-calm3_title`} {...register("calm3_title")} placeholder="The Starlit Anchorage" />
            </Field>
            <Field id={`${idPrefix}-calm3_desc`} label="Perairan 3: Kenangan Teduh">
              <Textarea id={`${idPrefix}-calm3_desc`} {...register("calm3_desc")} rows={2} />
            </Field>
          </div>

          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <Field id={`${idPrefix}-calm4_title`} label="Perairan 4: Judul Momen">
              <Input id={`${idPrefix}-calm4_title`} {...register("calm4_title")} placeholder="The Horizon of Tomorrow" />
            </Field>
            <Field id={`${idPrefix}-calm4_desc`} label="Perairan 4: Kenangan Teduh">
              <Textarea id={`${idPrefix}-calm4_desc`} {...register("calm4_desc")} rows={2} />
            </Field>
          </div>
        </div>
      )}

      {/* Tab 6: Warna & Musik Ombak */}
      {activeTab === "theme" && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 text-xs text-muted-foreground">
            Sesuaikan nuansa lentera mercusuar dan alunan musik deburan ombak malam hari yang menenangkan.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ColorPickerField
              label="Warna Lentera (Amber)"
              value={primaryColor || "#f59e0b"}
              onChange={(color) => setValue("primaryColor", color)}
              presets={[
                { label: "Lantern Beacon Amber", value: "#f59e0b" },
                { label: "Warm Harbor Gold", value: "#eab308" },
                { label: "Flame Brass", value: "#d97706" },
              ]}
            />

            <ColorPickerField
              label="Warna Ombak (Cyan)"
              value={secondaryColor || "#38bdf8"}
              onChange={(color) => setValue("secondaryColor", color)}
              presets={[
                { label: "Glacial Seafoam", value: "#38bdf8" },
                { label: "Oceanic Mist", value: "#0ea5e9" },
                { label: "Coastal Teal", value: "#14b8a6" },
              ]}
            />

            <ColorPickerField
              label="Warna Samudra (Navy)"
              value={backgroundColor || "#07101d"}
              onChange={(color) => setValue("backgroundColor", color)}
              presets={[
                { label: "Deep Storm Navy", value: "#07101d" },
                { label: "Midnight Anchorage", value: "#0b1626" },
                { label: "Abyssal Slate", value: "#050b14" },
              ]}
            />
          </div>

          <Field
            id={`${idPrefix}-audioUrl`}
            label="URL Musik Deburan Ombak Damai (Cello & Waves)"
            error={errors.audioUrl?.message}
            helperText="Format MP3 publik. Audio otomatis tidak aktif di thumbnail katalog template."
          >
            <Input
              id={`${idPrefix}-audioUrl`}
              {...register("audioUrl")}
              placeholder="https://example.com/ocean-lullaby.mp3"
            />
          </Field>
        </div>
      )}

      {/* Bottom Step Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-border/40">
        <button
          type="button"
          disabled={activeTab === "logbook"}
          onClick={() => {
            const idx = tabs.findIndex((t) => t.id === activeTab);
            if (idx > 0) setActiveTab(tabs[idx - 1].id);
          }}
          className={cn(
            "flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors",
            activeTab === "logbook"
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
