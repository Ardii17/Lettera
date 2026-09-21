"use client";

import { useState } from "react";
import type {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  FieldErrors,
} from "react-hook-form";
import {
  Mountain,
  Scroll,
  Compass,
  CheckCircle2,
  Palette,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { Field, Input, Textarea } from "@/components/ui/field";
import { ColorPickerField } from "@/components/ui/color-picker-field";
import { cn } from "@/lib/utils/cn";
import type { LetterFormValues } from "./dynamic-form";

interface SummitAchievementBuilderFormProps {
  register: UseFormRegister<LetterFormValues>;
  setValue: UseFormSetValue<LetterFormValues>;
  watch: UseFormWatch<LetterFormValues>;
  errors: FieldErrors<LetterFormValues>;
  idPrefix?: string;
}

type TabType =
  | "summit"
  | "dispatch"
  | "camps"
  | "artifacts"
  | "horizons"
  | "theme";

export function SummitAchievementBuilderForm({
  register,
  setValue,
  watch,
  errors,
  idPrefix = "summit-achievement",
}: SummitAchievementBuilderFormProps) {
  const [activeTab, setActiveTab] = useState<TabType>("summit");

  const tabs: Array<{ id: TabType; label: string; icon: React.ReactNode }> = [
    { id: "summit", label: "Sertifikasi Puncak", icon: <TrendingUp className="w-4 h-4" /> },
    { id: "dispatch", label: "Surat Ekspedisi", icon: <Scroll className="w-4 h-4" /> },
    { id: "camps", label: "4 Pos Pendakian", icon: <CheckCircle2 className="w-4 h-4" /> },
    { id: "artifacts", label: "3 Perlengkapan", icon: <Compass className="w-4 h-4" /> },
    { id: "horizons", label: "4 Cakrawala", icon: <Mountain className="w-4 h-4" /> },
    { id: "theme", label: "Warna & Musik", icon: <Palette className="w-4 h-4" /> },
  ];

  const primaryColor = watch("primaryColor") as string;
  const secondaryColor = watch("secondaryColor") as string;
  const backgroundColor = watch("backgroundColor") as string;

  const handleApplyPresetCamps = () => {
    setValue("camp1_title", "Base Camp: The Inception of Grit");
    setValue("camp1_elevation", "Elev. 2,500 MDPL • Tahun Pertama");
    setValue("camp1_challenge", "Menata ransel impian dan melangkah di jalur terjal yang asing");
    setValue(
      "camp1_narrative",
      "Langkah awal dimulai dengan keberanian meninggalkan zona nyaman dan mengikat tali sepatu bot pendakian dengan tekad baja."
    );

    setValue("camp2_title", "Camp I: The Khumbu Icefall");
    setValue("camp2_elevation", "Elev. 5,300 MDPL • Tahun Kedua");
    setValue("camp2_challenge", "Melintasi retakan jurang es mata kuliah dan praktikum terberat");
    setValue(
      "camp2_narrative",
      "Medan berbahaya menguji fokus dan keseimbangan mental. Tidak goyah meski dinding es keraguan runtuh di sekeliling."
    );

    setValue("camp3_title", "Camp II: The Death Zone of Tenacity");
    setValue("camp3_elevation", "Elev. 7,900 MDPL • Tahun Terakhir");
    setValue("camp3_challenge", "Menghadapi tipisnya oksigen waktu saat pengerjaan tugas akhir skripsi");
    setValue(
      "camp3_narrative",
      "Zona paling ekstrem di mana kelelahan fisik mencapai puncak. Tapi kau bertahan dengan tabung oksigen doa keluarga."
    );

    setValue("camp4_title", "Summit Ridge: The Final Ridge to Glory");
    setValue("camp4_elevation", "Elev. 8,848 MDPL • Hari Kelulusan");
    setValue("camp4_challenge", "Sidang akhir terbuka dan melangkah ke panggung penobatan");
    setValue(
      "camp4_narrative",
      "Sinar fajar keemasan menyambut langkah kakimu di puncak tertinggi. Bendera kemenangan berkibar gagah."
    );
  };

  const handleApplyPresetArtifacts = () => {
    setValue("artifact1_name", "The Brass Compass of Integrity");
    setValue("artifact1_virtue", "Arah Moral yang Tak Pernah Tersesat");
    setValue(
      "artifact1_note",
      "Saat badai kabut tebal meragukan arah langkah, kompas kejujuran selalu membimbing ke jalur yang benar."
    );

    setValue("artifact2_name", "The Forged Ice Axe of Resilience");
    setValue("artifact2_virtue", "Ketajaman Pikiran & Ketahanan Ekstrem");
    setValue(
      "artifact2_note",
      "Memahat pijakan kokoh di atas dinding tebing keputusasaan, mengubah setiap batu sandungan menjadi anak tangga kemenangan."
    );

    setValue("artifact3_name", "The Lifeline Climbing Rope");
    setValue("artifact3_virtue", "Jalinan Doa & Kasih Keluarga");
    setValue(
      "artifact3_note",
      "Tali keselamatan yang terikat erat dari dasar lembah, menahanmu setiap kali langkahmu goyah dan menarikmu kembali tegak."
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

      {/* Tab 1: Sertifikasi Puncak */}
      {activeTab === "summit" && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-cyan-500/20 bg-cyan-950/10 text-xs text-muted-foreground">
            Piagam sertifikasi penaklukan puncak tertinggi ekspedisi prestasi hidup berstandar alpine.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              id={`${idPrefix}-recipientName`}
              label="Nama Pendaki Sang Juara (Penerima)"
              error={errors.recipientName?.message}
              required
            >
              <Input
                id={`${idPrefix}-recipientName`}
                {...register("recipientName", { required: "Nama penerima wajib diisi" })}
                placeholder="Aria Danendra, S.T."
              />
            </Field>

            <Field
              id={`${idPrefix}-senderName`}
              label="Pimpinan Ekspedisi / Keluarga"
              error={errors.senderName?.message}
              required
            >
              <Input
                id={`${idPrefix}-senderName`}
                {...register("senderName", { required: "Nama penganugerah wajib diisi" })}
                placeholder="Keluarga Besar & Tim Pendukung Ekspedisi"
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              id={`${idPrefix}-expeditionCode`}
              label="Kode Ekspedisi Alpine"
              error={errors.expeditionCode?.message}
            >
              <Input
                id={`${idPrefix}-expeditionCode`}
                {...register("expeditionCode")}
                placeholder="EXP-SUMMIT-2024-8848"
              />
            </Field>

            <Field
              id={`${idPrefix}-summitElevation`}
              label="Elevasi Puncak yang Ditaklukkan"
              error={errors.summitElevation?.message}
            >
              <Input
                id={`${idPrefix}-summitElevation`}
                {...register("summitElevation")}
                placeholder="8,848 MDPL"
              />
            </Field>
          </div>

          <Field
            id={`${idPrefix}-summitTitle`}
            label="Nama Puncak / Gelar Pencapaian"
            error={errors.summitTitle?.message}
          >
            <Input
              id={`${idPrefix}-summitTitle`}
              {...register("summitTitle")}
              placeholder="Puncak Sarjana Teknik dengan Predikat Pujian"
            />
          </Field>

          <Field
            id={`${idPrefix}-mountainRange`}
            label="Gugusan Pegunungan / Almamater"
            error={errors.mountainRange?.message}
          >
            <Input
              id={`${idPrefix}-mountainRange`}
              {...register("mountainRange")}
              placeholder="The Alpine Ridge of Engineering & Innovation"
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              id={`${idPrefix}-summitDate`}
              label="Tanggal Penaklukan Puncak"
              error={errors.summitDate?.message}
            >
              <Input
                id={`${idPrefix}-summitDate`}
                {...register("summitDate")}
                placeholder="28 September 2024"
              />
            </Field>
          </div>

          <Field
            id={`${idPrefix}-citationSummary`}
            label="Catatan Resmi Dewan Ekspedisi"
            error={errors.citationSummary?.message}
          >
            <Textarea
              id={`${idPrefix}-citationSummary`}
              {...register("citationSummary")}
              rows={2}
              placeholder="Catatan resmi penaklukan puncak..."
            />
          </Field>
        </div>
      )}

      {/* Tab 2: Surat Catatan dari Puncak */}
      {activeTab === "dispatch" && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-sky-500/20 bg-sky-950/10 text-xs text-muted-foreground">
            Surat catatan kemenangan yang ditulis dari atas samudra awan di titik puncak tertinggi.
          </div>

          <Field
            id={`${idPrefix}-salutation`}
            label="Salam Pembuka Catatan"
            error={errors.salutation?.message}
          >
            <Input
              id={`${idPrefix}-salutation`}
              {...register("salutation")}
              placeholder="Dari Titik Tertinggi di Atas Samudra Awan,"
            />
          </Field>

          <Field
            id={`${idPrefix}-message`}
            label="Isi Surat Kemenangan Ekspedisi"
            error={errors.message?.message}
            required
          >
            <Textarea
              id={`${idPrefix}-message`}
              {...register("message", { required: "Isi surat wajib diisi" })}
              rows={8}
              placeholder="Tuliskan ungkapan rasa bangga atas penaklukan tebing terjal..."
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
                placeholder="Dengan rasa bangga dan cinta setinggi langit,"
              />
            </Field>

            <Field
              id={`${idPrefix}-sealText`}
              label="Motto Lencana Ekspedisi"
              error={errors.sealText?.message}
            >
              <Input
                id={`${idPrefix}-sealText`}
                {...register("sealText")}
                placeholder="ALTISSIMA PETE"
                maxLength={30}
              />
            </Field>
          </div>
        </div>
      )}

      {/* Tab 3: 4 Pos Pendakian */}
      {activeTab === "camps" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-cyan-500/20 bg-cyan-950/10">
            <div className="text-xs text-muted-foreground">
              4 pos pendakian ketinggian ekstrem menembus batas hingga ke puncak.
            </div>
            <button
              type="button"
              onClick={handleApplyPresetCamps}
              className="px-3 py-1.5 rounded-md text-xs bg-muted hover:bg-muted/80 text-foreground font-medium flex items-center gap-1.5 self-start sm:self-auto transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Muat Pos Default</span>
            </button>
          </div>

          {/* Camp 1 */}
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <div className="font-semibold text-xs text-cyan-400 uppercase tracking-wider">
              Pos 1 (Base Camp)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field id={`${idPrefix}-camp1_title`} label="Nama Pos">
                <Input id={`${idPrefix}-camp1_title`} {...register("camp1_title")} placeholder="Base Camp: The Inception" />
              </Field>
              <Field id={`${idPrefix}-camp1_elevation`} label="Ketinggian / Waktu">
                <Input id={`${idPrefix}-camp1_elevation`} {...register("camp1_elevation")} placeholder="Elev. 2,500 MDPL..." />
              </Field>
            </div>
            <Field id={`${idPrefix}-camp1_challenge`} label="Rintangan Medan">
              <Input id={`${idPrefix}-camp1_challenge`} {...register("camp1_challenge")} placeholder="Menata ransel impian..." />
            </Field>
            <Field id={`${idPrefix}-camp1_narrative`} label="Catatan Perjalanan">
              <Textarea id={`${idPrefix}-camp1_narrative`} {...register("camp1_narrative")} rows={2} />
            </Field>
          </div>

          {/* Camp 2 */}
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <div className="font-semibold text-xs text-cyan-400 uppercase tracking-wider">
              Pos 2 (Camp I)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field id={`${idPrefix}-camp2_title`} label="Nama Pos">
                <Input id={`${idPrefix}-camp2_title`} {...register("camp2_title")} placeholder="Camp I: The Khumbu Icefall" />
              </Field>
              <Field id={`${idPrefix}-camp2_elevation`} label="Ketinggian / Waktu">
                <Input id={`${idPrefix}-camp2_elevation`} {...register("camp2_elevation")} placeholder="Elev. 5,300 MDPL..." />
              </Field>
            </div>
            <Field id={`${idPrefix}-camp2_challenge`} label="Rintangan Medan">
              <Input id={`${idPrefix}-camp2_challenge`} {...register("camp2_challenge")} placeholder="Melintasi jurang es..." />
            </Field>
            <Field id={`${idPrefix}-camp2_narrative`} label="Catatan Perjalanan">
              <Textarea id={`${idPrefix}-camp2_narrative`} {...register("camp2_narrative")} rows={2} />
            </Field>
          </div>

          {/* Camp 3 */}
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <div className="font-semibold text-xs text-cyan-400 uppercase tracking-wider">
              Pos 3 (Camp II)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field id={`${idPrefix}-camp3_title`} label="Nama Pos">
                <Input id={`${idPrefix}-camp3_title`} {...register("camp3_title")} placeholder="Camp II: Death Zone" />
              </Field>
              <Field id={`${idPrefix}-camp3_elevation`} label="Ketinggian / Waktu">
                <Input id={`${idPrefix}-camp3_elevation`} {...register("camp3_elevation")} placeholder="Elev. 7,900 MDPL..." />
              </Field>
            </div>
            <Field id={`${idPrefix}-camp3_challenge`} label="Rintangan Medan">
              <Input id={`${idPrefix}-camp3_challenge`} {...register("camp3_challenge")} placeholder="Tipisnya oksigen waktu..." />
            </Field>
            <Field id={`${idPrefix}-camp3_narrative`} label="Catatan Perjalanan">
              <Textarea id={`${idPrefix}-camp3_narrative`} {...register("camp3_narrative")} rows={2} />
            </Field>
          </div>

          {/* Camp 4 */}
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <div className="font-semibold text-xs text-cyan-400 uppercase tracking-wider">
              Pos 4 (Summit Ridge)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field id={`${idPrefix}-camp4_title`} label="Nama Pos">
                <Input id={`${idPrefix}-camp4_title`} {...register("camp4_title")} placeholder="Summit Ridge" />
              </Field>
              <Field id={`${idPrefix}-camp4_elevation`} label="Ketinggian / Waktu">
                <Input id={`${idPrefix}-camp4_elevation`} {...register("camp4_elevation")} placeholder="Elev. 8,848 MDPL..." />
              </Field>
            </div>
            <Field id={`${idPrefix}-camp4_challenge`} label="Rintangan Medan">
              <Input id={`${idPrefix}-camp4_challenge`} {...register("camp4_challenge")} placeholder="Sidang akhir terbuka..." />
            </Field>
            <Field id={`${idPrefix}-camp4_narrative`} label="Catatan Perjalanan">
              <Textarea id={`${idPrefix}-camp4_narrative`} {...register("camp4_narrative")} rows={2} />
            </Field>
          </div>
        </div>
      )}

      {/* Tab 4: 3 Perlengkapan Pendaki */}
      {activeTab === "artifacts" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-amber-500/20 bg-amber-950/10">
            <div className="text-xs text-muted-foreground">
              3 perlengkapan pendakian simbolis: Kompas Integritas, Kapak Es Daya Tahan, dan Tali Pengaman Keluarga.
            </div>
            <button
              type="button"
              onClick={handleApplyPresetArtifacts}
              className="px-3 py-1.5 rounded-md text-xs bg-muted hover:bg-muted/80 text-foreground font-medium flex items-center gap-1.5 self-start sm:self-auto transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Muat Alat Default</span>
            </button>
          </div>

          {/* Artifact 1 */}
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <div className="font-semibold text-xs text-amber-500 uppercase tracking-wider">
              Perlengkapan 1 (Kompas)
            </div>
            <Field id={`${idPrefix}-artifact1_name`} label="Nama Alat">
              <Input id={`${idPrefix}-artifact1_name`} {...register("artifact1_name")} placeholder="The Brass Compass of Integrity" />
            </Field>
            <Field id={`${idPrefix}-artifact1_virtue`} label="Nilai Kebajikan">
              <Input id={`${idPrefix}-artifact1_virtue`} {...register("artifact1_virtue")} placeholder="Arah Moral yang Tak Pernah Tersesat" />
            </Field>
            <Field id={`${idPrefix}-artifact1_note`} label="Catatan Penggunaan">
              <Textarea id={`${idPrefix}-artifact1_note`} {...register("artifact1_note")} rows={2} />
            </Field>
          </div>

          {/* Artifact 2 */}
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <div className="font-semibold text-xs text-cyan-400 uppercase tracking-wider">
              Perlengkapan 2 (Kapak Es)
            </div>
            <Field id={`${idPrefix}-artifact2_name`} label="Nama Alat">
              <Input id={`${idPrefix}-artifact2_name`} {...register("artifact2_name")} placeholder="The Forged Ice Axe of Resilience" />
            </Field>
            <Field id={`${idPrefix}-artifact2_virtue`} label="Nilai Kebajikan">
              <Input id={`${idPrefix}-artifact2_virtue`} {...register("artifact2_virtue")} placeholder="Ketajaman Pikiran & Ketahanan" />
            </Field>
            <Field id={`${idPrefix}-artifact2_note`} label="Catatan Penggunaan">
              <Textarea id={`${idPrefix}-artifact2_note`} {...register("artifact2_note")} rows={2} />
            </Field>
          </div>

          {/* Artifact 3 */}
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <div className="font-semibold text-xs text-blue-400 uppercase tracking-wider">
              Perlengkapan 3 (Tali Pengaman)
            </div>
            <Field id={`${idPrefix}-artifact3_name`} label="Nama Alat">
              <Input id={`${idPrefix}-artifact3_name`} {...register("artifact3_name")} placeholder="The Lifeline Climbing Rope" />
            </Field>
            <Field id={`${idPrefix}-artifact3_virtue`} label="Nilai Kebajikan">
              <Input id={`${idPrefix}-artifact3_virtue`} {...register("artifact3_virtue")} placeholder="Jalinan Doa & Kasih Keluarga" />
            </Field>
            <Field id={`${idPrefix}-artifact3_note`} label="Catatan Penggunaan">
              <Textarea id={`${idPrefix}-artifact3_note`} {...register("artifact3_note")} rows={2} />
            </Field>
          </div>
        </div>
      )}

      {/* Tab 5: 4 Cakrawala Masa Depan */}
      {activeTab === "horizons" && (
        <div className="space-y-5">
          <div className="p-4 rounded-xl border border-cyan-500/20 bg-cyan-950/10 text-xs text-muted-foreground">
            4 puncak kehidupan berikutnya di cakrawala yang siap dijelajahi dan ditaklukkan.
          </div>

          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <Field id={`${idPrefix}-horizon1_title`} label="Puncak 1: Nama Cakrawala">
              <Input id={`${idPrefix}-horizon1_title`} {...register("horizon1_title")} placeholder="The Ridge of Professional Mastery" />
            </Field>
            <Field id={`${idPrefix}-horizon1_desc`} label="Puncak 1: Visi & Doa">
              <Textarea id={`${idPrefix}-horizon1_desc`} {...register("horizon1_desc")} rows={2} />
            </Field>
          </div>

          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <Field id={`${idPrefix}-horizon2_title`} label="Puncak 2: Nama Cakrawala">
              <Input id={`${idPrefix}-horizon2_title`} {...register("horizon2_title")} placeholder="The Valley of Generosity" />
            </Field>
            <Field id={`${idPrefix}-horizon2_desc`} label="Puncak 2: Visi & Doa">
              <Textarea id={`${idPrefix}-horizon2_desc`} {...register("horizon2_desc")} rows={2} />
            </Field>
          </div>

          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <Field id={`${idPrefix}-horizon3_title`} label="Puncak 3: Nama Cakrawala">
              <Input id={`${idPrefix}-horizon3_title`} {...register("horizon3_title")} placeholder="The Summit of Inner Peace" />
            </Field>
            <Field id={`${idPrefix}-horizon3_desc`} label="Puncak 3: Visi & Doa">
              <Textarea id={`${idPrefix}-horizon3_desc`} {...register("horizon3_desc")} rows={2} />
            </Field>
          </div>

          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <Field id={`${idPrefix}-horizon4_title`} label="Puncak 4: Nama Cakrawala">
              <Input id={`${idPrefix}-horizon4_title`} {...register("horizon4_title")} placeholder="The Infinite Alpine Horizon" />
            </Field>
            <Field id={`${idPrefix}-horizon4_desc`} label="Puncak 4: Visi & Doa">
              <Textarea id={`${idPrefix}-horizon4_desc`} {...register("horizon4_desc")} rows={2} />
            </Field>
          </div>
        </div>
      )}

      {/* Tab 6: Warna & Musik */}
      {activeTab === "theme" && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 text-xs text-muted-foreground">
            Sesuaikan nuansa warna lanskap pegunungan glasial dan musik simfoni petualangan alpine.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ColorPickerField
              label="Warna Es Glasial (Cyan)"
              value={primaryColor || "#38bdf8"}
              onChange={(color) => setValue("primaryColor", color)}
              presets={[
                { label: "Glacier Ice Cyan", value: "#38bdf8" },
                { label: "Alpine Sky Blue", value: "#0ea5e9" },
                { label: "Arctic Frost", value: "#67e8f9" },
              ]}
            />

            <ColorPickerField
              label="Warna Emas Puncak (Amber)"
              value={secondaryColor || "#f59e0b"}
              onChange={(color) => setValue("secondaryColor", color)}
              presets={[
                { label: "Alpine Dawn Gold", value: "#f59e0b" },
                { label: "Campfire Flame", value: "#ea580c" },
                { label: "High Altitude Brass", value: "#d97706" },
              ]}
            />

            <ColorPickerField
              label="Warna Latar (Twilight Navy)"
              value={backgroundColor || "#08111e"}
              onChange={(color) => setValue("backgroundColor", color)}
              presets={[
                { label: "Glacier Twilight Navy", value: "#08111e" },
                { label: "High Ridge Slate", value: "#0f172a" },
                { label: "Midnight Peak", value: "#050b14" },
              ]}
            />
          </div>

          <Field
            id={`${idPrefix}-audioUrl`}
            label="URL Musik Simfoni Pegunungan (Fanfare)"
            error={errors.audioUrl?.message}
            helperText="Format MP3 publik. Audio otomatis tidak aktif di thumbnail katalog template."
          >
            <Input
              id={`${idPrefix}-audioUrl`}
              {...register("audioUrl")}
              placeholder="https://example.com/alpine-epic.mp3"
            />
          </Field>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-border/40">
        <button
          type="button"
          disabled={activeTab === "summit"}
          onClick={() => {
            const idx = tabs.findIndex((t) => t.id === activeTab);
            if (idx > 0) setActiveTab(tabs[idx - 1].id);
          }}
          className={cn(
            "flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors",
            activeTab === "summit"
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
