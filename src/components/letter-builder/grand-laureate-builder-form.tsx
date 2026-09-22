"use client";

import { useState } from "react";
import type {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  FieldErrors,
} from "react-hook-form";
import {
  Award,
  Scroll,
  Medal,
  Compass,
  Palette,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { Field, Input, Textarea } from "@/components/ui/field";
import { ColorPickerField } from "@/components/ui/color-picker-field";
import { cn } from "@/lib/utils/cn";
import type { LetterFormValues } from "./dynamic-form";

interface GrandLaureateBuilderFormProps {
  register: UseFormRegister<LetterFormValues>;
  setValue: UseFormSetValue<LetterFormValues>;
  watch: UseFormWatch<LetterFormValues>;
  errors: FieldErrors<LetterFormValues>;
  idPrefix?: string;
}

type TabType =
  | "citation"
  | "keynote"
  | "epochs"
  | "medals"
  | "horizons"
  | "theme";

export function GrandLaureateBuilderForm({
  register,
  setValue,
  watch,
  errors,
  idPrefix = "grand-laureate",
}: GrandLaureateBuilderFormProps) {
  const [activeTab, setActiveTab] = useState<TabType>("citation");

  const tabs: Array<{ id: TabType; label: string; icon: React.ReactNode }> = [
    { id: "citation", label: "Piagam Kehormatan", icon: <Award className="w-4 h-4" /> },
    { id: "keynote", label: "Surat Pidato", icon: <Scroll className="w-4 h-4" /> },
    { id: "epochs", label: "4 Babak Penempaan", icon: <CheckCircle2 className="w-4 h-4" /> },
    { id: "medals", label: "3 Medali Kehormatan", icon: <Medal className="w-4 h-4" /> },
    { id: "horizons", label: "4 Peta Masa Depan", icon: <Compass className="w-4 h-4" /> },
    { id: "theme", label: "Warna & Musik", icon: <Palette className="w-4 h-4" /> },
  ];

  const primaryColor = watch("primaryColor") as string;
  const backgroundColor = watch("backgroundColor") as string;

  const handleApplyPresetEpochs = () => {
    setValue("epoch1_title", "The Genesis of Inquiry (Awal Keberanian)");
    setValue("epoch1_period", "Tahun Pertama • Menemukan Percikan");
    setValue("epoch1_breakthrough", "Memilih topik penelitian tersulit yang dihindari banyak orang");
    setValue(
      "epoch1_narrative",
      "Langkah pertama dimulai dengan rasa cemas namun sarat rasa penasaran. Kau tidak memilih jalan yang mudah, melainkan jalur yang menuntut disiplin mutlak."
    );

    setValue("epoch2_title", "The Midnight Crucible (Kawah Penempaan Diri)");
    setValue("epoch2_period", "Tahun Kedua & Ketiga • Ketahanan Mental");
    setValue("epoch2_breakthrough", "Eksperimen ke-47 yang akhirnya menunjukkan hasil hipotesis valid");
    setValue(
      "epoch2_narrative",
      "Malam-malam panjang di depan layar, ratusan revisi, dan rasa lelah yang menguji komitmen. Di kawah penempaan inilah karakter sang juara benar-benar terbentuk."
    );

    setValue("epoch3_title", "The Defense of the Masterwork (Ujian Sang Master)");
    setValue("epoch3_period", "Semester Akhir • Sidang Terbuka");
    setValue("epoch3_breakthrough", "Apresiasi bulat dan pujian langsung dari dewan profesor penguji");
    setValue(
      "epoch3_narrative",
      "Berdiri dengan keyakinan penuh memaparkan karya inovatif di hadapan dewan ahli. Setiap argumen kau pertahankan dengan tajam, anggun, dan berbobot."
    );

    setValue("epoch4_title", "The Conferred Laurels (Penobatan Kemenangan)");
    setValue("epoch4_period", "Hari Wisuda • Puncak Kehormatan");
    setValue("epoch4_breakthrough", "Pengalungan medali kehormatan & senyum bangga orang-orang tercinta");
    setValue(
      "epoch4_narrative",
      "Tepuk tangan bergemuruh menyambut namamu yang dipanggil ke atas panggung. Bukti sahih bahwa keringat dan doa tak pernah berkhianat pada hasil."
    );
  };

  const handleApplyPresetMedals = () => {
    setValue("medal1_title", "Insignia of Intellectual Tenacity");
    setValue("medal1_virtue", "Ketangguhan Mental & Konsistensi");
    setValue(
      "medal1_citation",
      "Dianugerahkan atas kemampuan bangkit dari kegagalan eksperimen tanpa kehilangan antusiasme sedikit pun."
    );

    setValue("medal2_title", "Order of Creative Brilliance");
    setValue("medal2_virtue", "Orisinalitas Visi & Solusi Inovatif");
    setValue(
      "medal2_citation",
      "Dianugerahkan atas keberanian merumuskan perspektif baru yang mendobrak kebiasaan lama dan membuka jalan terang."
    );

    setValue("medal3_title", "Crown of Noble Character");
    setValue("medal3_virtue", "Integritas Moral & Kerendahan Hati");
    setValue(
      "medal3_citation",
      "Dianugerahkan karena setinggi apa pun kecerdasan yang dicapai, kebaikan hati dan kepedulian pada sesama selalu menjadi kompas utama."
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

      {/* Tab 1: Piagam Kehormatan */}
      {activeTab === "citation" && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-950/10 text-xs text-muted-foreground">
            Piagam penganugerahan kehormatan resmi Vanguard Citation berstandar konvokasi internasional.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              id={`${idPrefix}-recipientName`}
              label="Nama Tokoh / Wisudawan Berprestasi"
              error={errors.recipientName?.message}
              required
            >
              <Input
                id={`${idPrefix}-recipientName`}
                {...register("recipientName", { required: "Nama penerima wajib diisi" })}
                placeholder="Aria Raditya, S.T., M.Sc."
              />
            </Field>

            <Field
              id={`${idPrefix}-senderName`}
              label="Nama Penganugerah / Keluarga / Dewan Penguji"
              error={errors.senderName?.message}
              required
            >
              <Input
                id={`${idPrefix}-senderName`}
                {...register("senderName", { required: "Nama penganugerah wajib diisi" })}
                placeholder="Keluarga Besar & Dewan Penguji Almamater"
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              id={`${idPrefix}-registryId`}
              label="Nomor Registri Laureate"
              error={errors.registryId?.message}
            >
              <Input
                id={`${idPrefix}-registryId`}
                {...register("registryId")}
                placeholder="LAUR-2024-OX"
              />
            </Field>

            <Field
              id={`${idPrefix}-conferralDate`}
              label="Tanggal Penganugerahan / Wisuda"
              error={errors.conferralDate?.message}
            >
              <Input
                id={`${idPrefix}-conferralDate`}
                {...register("conferralDate")}
                placeholder="28 September 2024"
              />
            </Field>
          </div>

          <Field
            id={`${idPrefix}-conferredTitle`}
            label="Gelar / Penghargaan yang Diraih"
            error={errors.conferredTitle?.message}
          >
            <Input
              id={`${idPrefix}-conferredTitle`}
              {...register("conferredTitle")}
              placeholder="Master of Science in Artificial Intelligence with Highest Distinction"
            />
          </Field>

          <Field
            id={`${idPrefix}-institutionName`}
            label="Institusi / Universitas Almamater"
            error={errors.institutionName?.message}
          >
            <Input
              id={`${idPrefix}-institutionName`}
              {...register("institutionName")}
              placeholder="Faculty of Informatics & Advanced Engineering"
            />
          </Field>

          <Field
            id={`${idPrefix}-citationTitle`}
            label="Judul Piagam Sitasi"
            error={errors.citationTitle?.message}
          >
            <Input
              id={`${idPrefix}-citationTitle`}
              {...register("citationTitle")}
              placeholder="The Vanguard Fellowship Citation"
            />
          </Field>

          <Field
            id={`${idPrefix}-citationSummary`}
            label="Ringkasan Surat Keputusan Dewan Penganugerah"
            error={errors.citationSummary?.message}
          >
            <Textarea
              id={`${idPrefix}-citationSummary`}
              {...register("citationSummary")}
              rows={3}
              placeholder="Kutipan keputusan resmi dewan..."
            />
          </Field>
        </div>
      )}

      {/* Tab 2: Surat Pidato Kehormatan */}
      {activeTab === "keynote" && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-950/10 text-xs text-muted-foreground">
            Surat apresiasi mendalam di atas kertas vellum gading, mengabadikan ribuan jam kerja keras dan doa restu.
          </div>

          <Field
            id={`${idPrefix}-salutation`}
            label="Salam Pembuka Pidato"
            error={errors.salutation?.message}
          >
            <Input
              id={`${idPrefix}-salutation`}
              {...register("salutation")}
              placeholder="Kepada Sang Juara yang Kami Banggakan,"
            />
          </Field>

          <Field
            id={`${idPrefix}-message`}
            label="Isi Pidato Apresiasi & Kebanggaan"
            error={errors.message?.message}
            required
          >
            <Textarea
              id={`${idPrefix}-message`}
              {...register("message", { required: "Isi pidato wajib diisi" })}
              rows={8}
              placeholder="Tuliskan ungkapan rasa bangga terdalam..."
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              id={`${idPrefix}-signoff`}
              label="Salam Penutup Pidato"
              error={errors.signoff?.message}
            >
              <Input
                id={`${idPrefix}-signoff`}
                {...register("signoff")}
                placeholder="Dengan rasa bangga dan cinta yang tak terhingga,"
              />
            </Field>

            <Field
              id={`${idPrefix}-sealText`}
              label="Motto pada Lencana Segel Emas"
              error={errors.sealText?.message}
            >
              <Input
                id={`${idPrefix}-sealText`}
                {...register("sealText")}
                placeholder="VERITAS ET EXCELLENTIA"
                maxLength={30}
              />
            </Field>
          </div>
        </div>
      )}

      {/* Tab 3: 4 Babak Penempaan Diri */}
      {activeTab === "epochs" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-amber-500/20 bg-amber-950/10">
            <div className="text-xs text-muted-foreground">
              4 babak kronologis perjalanan akademik & penempaan diri hingga meraih kelulusan.
            </div>
            <button
              type="button"
              onClick={handleApplyPresetEpochs}
              className="px-3 py-1.5 rounded-md text-xs bg-muted hover:bg-muted/80 text-foreground font-medium flex items-center gap-1.5 self-start sm:self-auto transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Muat Babak Default</span>
            </button>
          </div>

          {/* Epoch 1 */}
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <div className="font-semibold text-xs text-amber-500 uppercase tracking-wider">
              Babak 1 (Epoch 01)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field id={`${idPrefix}-epoch1_title`} label="Judul Babak">
                <Input id={`${idPrefix}-epoch1_title`} {...register("epoch1_title")} placeholder="The Genesis of Inquiry" />
              </Field>
              <Field id={`${idPrefix}-epoch1_period`} label="Periode Waktu">
                <Input id={`${idPrefix}-epoch1_period`} {...register("epoch1_period")} placeholder="Tahun Pertama..." />
              </Field>
            </div>
            <Field id={`${idPrefix}-epoch1_breakthrough`} label="Titik Balik / Terobosan">
              <Input id={`${idPrefix}-epoch1_breakthrough`} {...register("epoch1_breakthrough")} placeholder="Memilih topik penelitian..." />
            </Field>
            <Field id={`${idPrefix}-epoch1_narrative`} label="Narasi Perjuangan">
              <Textarea id={`${idPrefix}-epoch1_narrative`} {...register("epoch1_narrative")} rows={2} />
            </Field>
          </div>

          {/* Epoch 2 */}
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <div className="font-semibold text-xs text-amber-500 uppercase tracking-wider">
              Babak 2 (Epoch 02)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field id={`${idPrefix}-epoch2_title`} label="Judul Babak">
                <Input id={`${idPrefix}-epoch2_title`} {...register("epoch2_title")} placeholder="The Midnight Crucible" />
              </Field>
              <Field id={`${idPrefix}-epoch2_period`} label="Periode Waktu">
                <Input id={`${idPrefix}-epoch2_period`} {...register("epoch2_period")} placeholder="Tahun Kedua..." />
              </Field>
            </div>
            <Field id={`${idPrefix}-epoch2_breakthrough`} label="Titik Balik / Terobosan">
              <Input id={`${idPrefix}-epoch2_breakthrough`} {...register("epoch2_breakthrough")} placeholder="Eksperimen ke-47..." />
            </Field>
            <Field id={`${idPrefix}-epoch2_narrative`} label="Narasi Perjuangan">
              <Textarea id={`${idPrefix}-epoch2_narrative`} {...register("epoch2_narrative")} rows={2} />
            </Field>
          </div>

          {/* Epoch 3 */}
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <div className="font-semibold text-xs text-amber-500 uppercase tracking-wider">
              Babak 3 (Epoch 03)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field id={`${idPrefix}-epoch3_title`} label="Judul Babak">
                <Input id={`${idPrefix}-epoch3_title`} {...register("epoch3_title")} placeholder="The Defense of the Masterwork" />
              </Field>
              <Field id={`${idPrefix}-epoch3_period`} label="Periode Waktu">
                <Input id={`${idPrefix}-epoch3_period`} {...register("epoch3_period")} placeholder="Semester Akhir..." />
              </Field>
            </div>
            <Field id={`${idPrefix}-epoch3_breakthrough`} label="Titik Balik / Terobosan">
              <Input id={`${idPrefix}-epoch3_breakthrough`} {...register("epoch3_breakthrough")} placeholder="Apresiasi bulat penguji..." />
            </Field>
            <Field id={`${idPrefix}-epoch3_narrative`} label="Narasi Perjuangan">
              <Textarea id={`${idPrefix}-epoch3_narrative`} {...register("epoch3_narrative")} rows={2} />
            </Field>
          </div>

          {/* Epoch 4 */}
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <div className="font-semibold text-xs text-amber-500 uppercase tracking-wider">
              Babak 4 (Epoch 04)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field id={`${idPrefix}-epoch4_title`} label="Judul Babak">
                <Input id={`${idPrefix}-epoch4_title`} {...register("epoch4_title")} placeholder="The Conferred Laurels" />
              </Field>
              <Field id={`${idPrefix}-epoch4_period`} label="Periode Waktu">
                <Input id={`${idPrefix}-epoch4_period`} {...register("epoch4_period")} placeholder="Hari Wisuda..." />
              </Field>
            </div>
            <Field id={`${idPrefix}-epoch4_breakthrough`} label="Titik Balik / Terobosan">
              <Input id={`${idPrefix}-epoch4_breakthrough`} {...register("epoch4_breakthrough")} placeholder="Pengalungan medali..." />
            </Field>
            <Field id={`${idPrefix}-epoch4_narrative`} label="Narasi Perjuangan">
              <Textarea id={`${idPrefix}-epoch4_narrative`} {...register("epoch4_narrative")} rows={2} />
            </Field>
          </div>
        </div>
      )}

      {/* Tab 4: 3 Medali Kehormatan */}
      {activeTab === "medals" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-blue-500/20 bg-blue-950/10">
            <div className="text-xs text-muted-foreground">
              Tiga medali kehormatan tertinggi atas ketangguhan, kreativitas, dan integritas.
            </div>
            <button
              type="button"
              onClick={handleApplyPresetMedals}
              className="px-3 py-1.5 rounded-md text-xs bg-muted hover:bg-muted/80 text-foreground font-medium flex items-center gap-1.5 self-start sm:self-auto transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Muat Medali Default</span>
            </button>
          </div>

          {/* Medal 1 */}
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <div className="font-semibold text-xs text-primary uppercase tracking-wider">
              Medali 1 (Tenacity)
            </div>
            <Field id={`${idPrefix}-medal1_title`} label="Nama Medali">
              <Input id={`${idPrefix}-medal1_title`} {...register("medal1_title")} placeholder="Insignia of Intellectual Tenacity" />
            </Field>
            <Field id={`${idPrefix}-medal1_virtue`} label="Nilai Kebajikan">
              <Input id={`${idPrefix}-medal1_virtue`} {...register("medal1_virtue")} placeholder="Ketangguhan Mental..." />
            </Field>
            <Field id={`${idPrefix}-medal1_citation`} label="Kutipan Penghargaan">
              <Textarea id={`${idPrefix}-medal1_citation`} {...register("medal1_citation")} rows={2} />
            </Field>
          </div>

          {/* Medal 2 */}
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <div className="font-semibold text-xs text-primary uppercase tracking-wider">
              Medali 2 (Brilliance)
            </div>
            <Field id={`${idPrefix}-medal2_title`} label="Nama Medali">
              <Input id={`${idPrefix}-medal2_title`} {...register("medal2_title")} placeholder="Order of Creative Brilliance" />
            </Field>
            <Field id={`${idPrefix}-medal2_virtue`} label="Nilai Kebajikan">
              <Input id={`${idPrefix}-medal2_virtue`} {...register("medal2_virtue")} placeholder="Orisinalitas Visi..." />
            </Field>
            <Field id={`${idPrefix}-medal2_citation`} label="Kutipan Penghargaan">
              <Textarea id={`${idPrefix}-medal2_citation`} {...register("medal2_citation")} rows={2} />
            </Field>
          </div>

          {/* Medal 3 */}
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <div className="font-semibold text-xs text-primary uppercase tracking-wider">
              Medali 3 (Character)
            </div>
            <Field id={`${idPrefix}-medal3_title`} label="Nama Medali">
              <Input id={`${idPrefix}-medal3_title`} {...register("medal3_title")} placeholder="Crown of Noble Character" />
            </Field>
            <Field id={`${idPrefix}-medal3_virtue`} label="Nilai Kebajikan">
              <Input id={`${idPrefix}-medal3_virtue`} {...register("medal3_virtue")} placeholder="Integritas Moral..." />
            </Field>
            <Field id={`${idPrefix}-medal3_citation`} label="Kutipan Penghargaan">
              <Textarea id={`${idPrefix}-medal3_citation`} {...register("medal3_citation")} rows={2} />
            </Field>
          </div>
        </div>
      )}

      {/* Tab 5: 4 Peta Masa Depan */}
      {activeTab === "horizons" && (
        <div className="space-y-5">
          <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-950/10 text-xs text-muted-foreground">
            4 kompas panduan masa depan dan doa restu menyongsong babak kehidupan selanjutnya.
          </div>

          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <Field id={`${idPrefix}-horizon1_title`} label="Kompas 1: Judul">
              <Input id={`${idPrefix}-horizon1_title`} {...register("horizon1_title")} placeholder="The Fellowship of Mastery" />
            </Field>
            <Field id={`${idPrefix}-horizon1_desc`} label="Kompas 1: Doa & Panduan">
              <Textarea id={`${idPrefix}-horizon1_desc`} {...register("horizon1_desc")} rows={2} />
            </Field>
          </div>

          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <Field id={`${idPrefix}-horizon2_title`} label="Kompas 2: Judul">
              <Input id={`${idPrefix}-horizon2_title`} {...register("horizon2_title")} placeholder="The Impact on Humanity" />
            </Field>
            <Field id={`${idPrefix}-horizon2_desc`} label="Kompas 2: Doa & Panduan">
              <Textarea id={`${idPrefix}-horizon2_desc`} {...register("horizon2_desc")} rows={2} />
            </Field>
          </div>

          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <Field id={`${idPrefix}-horizon3_title`} label="Kompas 3: Judul">
              <Input id={`${idPrefix}-horizon3_title`} {...register("horizon3_title")} placeholder="The Unshakable Moral Compass" />
            </Field>
            <Field id={`${idPrefix}-horizon3_desc`} label="Kompas 3: Doa & Panduan">
              <Textarea id={`${idPrefix}-horizon3_desc`} {...register("horizon3_desc")} rows={2} />
            </Field>
          </div>

          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 space-y-3">
            <Field id={`${idPrefix}-horizon4_title`} label="Kompas 4: Judul">
              <Input id={`${idPrefix}-horizon4_title`} {...register("horizon4_title")} placeholder="The Joy of the Odyssey" />
            </Field>
            <Field id={`${idPrefix}-horizon4_desc`} label="Kompas 4: Doa & Panduan">
              <Textarea id={`${idPrefix}-horizon4_desc`} {...register("horizon4_desc")} rows={2} />
            </Field>
          </div>
        </div>
      )}

      {/* Tab 6: Warna & Musik */}
      {activeTab === "theme" && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl border border-border/60 bg-muted/20 text-xs text-muted-foreground">
            Sesuaikan nuansa palet konvokasi kehormatan dan musik simfoni kemenangan.
          </div>

          {/* Color pickers - Setiap Bagian Memiliki Box Tersendiri Secara Vertikal */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
              <ColorPickerField
                label="Warna Emas Kehormatan"
                value={primaryColor || "#caa64f"}
                onChange={(color) => setValue("primaryColor", color)}
                presets={[
                  { label: "Royal Burnished Gold", value: "#caa64f" },
                  { label: "Champagne Laurel", value: "#dfc079" },
                  { label: "Imperial Bronze", value: "#b58742" },
                ]}
              />
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
              <ColorPickerField
                label="Warna Latar Belakang (Royal Navy)"
                value={backgroundColor || "#0b1526"}
                onChange={(color) => setValue("backgroundColor", color)}
                presets={[
                  { label: "Stockholm Royal Navy", value: "#0b1526" },
                  { label: "Oxford Deep Slate", value: "#101b2b" },
                  { label: "Vanguard Midnight", value: "#070e1a" },
                ]}
              />
            </div>
          </div>

          {/* Pengaturan Audio dalam Box Tersendiri */}
          <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs space-y-4">
            <Field
              id={`${idPrefix}-audioUrl`}
              label="URL Musik Simfoni Kemenangan (Fanfare)"
              error={errors.audioUrl?.message}
              helperText="Format MP3 publik. Audio otomatis tidak aktif di thumbnail katalog template."
            >
              <Input
                id={`${idPrefix}-audioUrl`}
                {...register("audioUrl")}
                placeholder="https://example.com/triumph-orchestra.mp3"
              />
            </Field>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-border/40">
        <button
          type="button"
          disabled={activeTab === "citation"}
          onClick={() => {
            const idx = tabs.findIndex((t) => t.id === activeTab);
            if (idx > 0) setActiveTab(tabs[idx - 1].id);
          }}
          className={cn(
            "flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors",
            activeTab === "citation"
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
