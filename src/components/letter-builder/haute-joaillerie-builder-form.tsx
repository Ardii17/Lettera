"use client";

import { useState } from "react";
import type {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  FieldErrors,
} from "react-hook-form";
import type { LetterFormValues } from "./dynamic-form";
import { Field, Input, Textarea } from "@/components/ui/field";
import { ImageUploadField } from "@/components/ui/image-upload-field";
import { ColorPickerField } from "@/components/ui/color-picker-field";
import { cn } from "@/lib/utils/cn";
import {
  Gem,
  Award,
  Sparkles,
  ScrollText,
  Shield,
  KeyRound,
  RotateCcw,
} from "lucide-react";

interface HauteJoaillerieBuilderFormProps {
  register: UseFormRegister<LetterFormValues>;
  setValue: UseFormSetValue<LetterFormValues>;
  watch: UseFormWatch<LetterFormValues>;
  errors: FieldErrors<LetterFormValues>;
  idPrefix?: string;
}

type TabType = "box" | "cert" | "gems" | "locket" | "metals" | "secret";

export function HauteJoaillerieBuilderForm({
  register,
  setValue,
  watch,
  errors,
  idPrefix = "haute-joaillerie",
}: HauteJoaillerieBuilderFormProps) {
  const [activeTab, setActiveTab] = useState<TabType>("box");

  const museJewelPhotoUrl = watch("museJewelPhotoUrl") as string | undefined;
  const locketMomentsPhotoUrl = watch("locketMomentsPhotoUrl") as
    | string
    | undefined;
  const atelierPhotoUrl = watch("atelierPhotoUrl") as string | undefined;

  const primaryColor = (watch("primaryColor") as string) || "#0a1128";
  const accentColor = (watch("accentColor") as string) || "#d4af37";

  const tabs = [
    { id: "box" as TabType, label: "1. Kotak Beludru & Muse", icon: <Gem className="w-3.5 h-3.5" /> },
    { id: "cert" as TabType, label: "2. Sertifikat 4Cs", icon: <Award className="w-3.5 h-3.5" /> },
    { id: "gems" as TabType, label: "3. 4 Permata Kisah", icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: "locket" as TabType, label: "4. Liontin & Atelier", icon: <ScrollText className="w-3.5 h-3.5" /> },
    { id: "metals" as TabType, label: "5. Logam & Ketahanan", icon: <Shield className="w-3.5 h-3.5" /> },
    { id: "secret" as TabType, label: "6. Laci Rahasia Cincin", icon: <KeyRound className="w-3.5 h-3.5" /> },
  ];

  // Pre-fill classic 4 gemstones helper
  const handleLoadClassicGems = () => {
    setValue(
      "gem1Name",
      "Émeraude de Colombie (Zamrud Harapan & Pertemuan Awal)",
    );
    setValue("gem1ColorHex", "#059669");
    setValue(
      "gem1Period",
      "Musim Semi 2022 • Hari Pertama Mata Saling Bersitatap",
    );
    setValue(
      "gem1Poem",
      "Hijau zamrud di taman Tuileries tak sebanding dengan segarnya binar matamu saat pertama kali menyapaku. Di sanalah benih cinta pertama bertunas, tenang dan penuh pengharapan.",
    );

    setValue(
      "gem2Name",
      "Saphir Royal de Ceylan (Safir Keteduhan & Kesetiaan Hening)",
    );
    setValue("gem2ColorHex", "#1d4ed8");
    setValue(
      "gem2Period",
      "Malam-Malam Panjang • Samudra Kesabaran & Dekapan Tenang",
    );
    setValue(
      "gem2Poem",
      "Biru safir terdalam menyimpan rahasia kita. Di saat badai dunia di luar bergemuruh kencang, dekapanmu adalah samudra hening yang selalu menjadi pelabuhan paling damai bagi jiwaku.",
    );

    setValue(
      "gem3Name",
      "Rubis Sang-de-Pigeon (Mirah Delima Gairah & Pengorbanan)",
    );
    setValue("gem3ColorHex", "#b91c1c");
    setValue(
      "gem3Period",
      "Tahun Ketiga • Ujian Nyala Api & Janji Tak Tergoyahkan",
    );
    setValue(
      "gem3Poem",
      "Ditempa dalam panas bara magma bumi, merah delima ini adalah darah cintaku yang menyala. Bukan cinta yang rapuh oleh cobaan, melainkan gairah yang kian mengkristal suci saat diuji.",
    );

    setValue(
      "gem4Name",
      "Diamant Éternel (Intan Abadi Mahkota Ikrar Jiwa)",
    );
    setValue("gem4ColorHex", "#e0e7ff");
    setValue(
      "gem4Period",
      "Hari Ini & Selamanya • Lingkaran Mahkota Tak Berujung",
    );
    setValue(
      "gem4Poem",
      "Kristal murni terkeras di semesta alam: tiada palu waktu yang mampu meretakkan perjanjian suci antara kita berdua. Menjadi mahkota abadi yang menerangi setiap langkah masa depan kita.",
    );
  };

  return (
    <div className="space-y-6">
      {/* 6 Tabs Stepper */}
      <div className="flex border-b border-border/40 overflow-x-auto gap-1 pb-1 scrollbar-thin">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-t-lg transition-colors whitespace-nowrap border-b-2",
                isActive
                  ? "border-amber-500 text-amber-600 dark:text-amber-400 bg-amber-500/10 font-semibold"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30"
              )}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* TAB 1: KOTAK BELUDRU & FOTO SANG MUSE                     */}
      {/* ========================================================= */}
      {activeTab === "box" && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-200">
            <p className="font-semibold mb-0.5">Kotak Beludru Safir & Potret Intan Sang Muse</p>
            <p>
              Atur tajuk mahakarya perhiasan, pasangan asmara, tanggal sakral, dedikasi pembuka, dan unggah foto potret sang muse di dalam bingkai oval intan bercahaya (anti-monoton).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Tajuk Mahakarya Perhiasan">
              <Input
                {...register("jewelTitle")}
                id={`${idPrefix}-jewelTitle`}
                placeholder="LE SOLITAIRE D'ÉTERNITÉ N°07"
              />
            </Field>
            <Field label="Rumah Perhiasan / Asal Mahakarya">
              <Input
                {...register("maisonName")}
                id={`${idPrefix}-maisonName`}
                placeholder="MAISON DE HAUTE JOAILLERIE • PLACE VENDÔME, PARIS"
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Spesifikasi Permata Utama">
              <Input
                {...register("caratGrade")}
                id={`${idPrefix}-caratGrade`}
                placeholder="8.88 CARATS • D-FLAWLESS ROYAL SOLITAIRE"
              />
            </Field>
            <Field label="Tanggal Penempaan & Perayaan">
              <Input
                {...register("anniversaryDate")}
                id={`${idPrefix}-anniversaryDate`}
                placeholder="21 Septembre 2026"
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Nama Sang Muse (Penerima)" error={errors.recipientName?.message} required>
              <Input
                {...register("recipientName", { required: "Nama penerima wajib diisi" })}
                id={`${idPrefix}-recipientName`}
                placeholder="Lady Aurelia de Montmirail"
              />
            </Field>
            <Field label="Nama Sang Pandai Emas (Pengirim)" error={errors.senderName?.message} required>
              <Input
                {...register("senderName", { required: "Nama pengirim wajib diisi" })}
                id={`${idPrefix}-senderName`}
                placeholder="Henri de Valois"
              />
            </Field>
          </div>

          <Field label="Dedikasi Puitis Pembuka Kotak Perhiasan">
            <Textarea
              {...register("openingDedication")}
              id={`${idPrefix}-openingDedication`}
              rows={3}
              placeholder="Tuliskan dedikasi pembuka saat kotak perhiasan diserahkan..."
            />
          </Field>

          {/* IMAGE UPLOAD 1: MUSE JEWEL PHOTO */}
          <div className="space-y-3 p-4 rounded-xl border border-line bg-parchment-50">
            <div className="text-xs font-semibold text-ink-base">
              Foto Potret Sang Muse (Bingkai Intan Oval)
            </div>
            <p className="text-[11px] text-ink-muted">
              Unggah foto sang pujaan untuk ditampilkan di bingkai oval bertatahkan intan (akan otomatis menampilkan foto klasik berkualitas tinggi jika tidak diunggah).
            </p>
            <ImageUploadField
              label="Unggah Foto Sang Muse"
              value={museJewelPhotoUrl}
              onChange={(url) => setValue("museJewelPhotoUrl", url)}
            />
            <Field label="Keterangan Foto Potret Sang Muse">
              <Input
                {...register("musePhotoCaption")}
                id={`${idPrefix}-musePhotoCaption`}
                placeholder="Potret Sang Muse Berbalut Kilau Tiara & Permata Keabadian"
              />
            </Field>
          </div>

          {/* Pengaturan Warna - Setiap Bagian Memiliki Box Tersendiri Secara Vertikal */}
          <div className="space-y-4 pt-2">
            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
              <ColorPickerField
                label="Warna Beludru Kotak Perhiasan"
                value={primaryColor}
                onChange={(val) => setValue("primaryColor", val)}
                presets={[
                  { label: "Midnight Sapphire", value: "#0a1128" },
                  { label: "Royal Emerald", value: "#061a14" },
                  { label: "Imperial Ruby Velvet", value: "#1a080c" },
                  { label: "Noir Vendôme", value: "#0a0a0a" },
                ]}
              />
            </div>
            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
              <ColorPickerField
                label="Warna Aksen Emas & Tatahan"
                value={accentColor}
                onChange={(val) => setValue("accentColor", val)}
                presets={[
                  { label: "Or de Paris (24K Gold)", value: "#d4af37" },
                  { label: "Champagne Gold", value: "#e5c158" },
                  { label: "Rose Gold Vendôme", value: "#e0a899" },
                  { label: "Platinum Glow", value: "#e2e8f0" },
                ]}
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: SERTIFIKAT GEMOLOGI 4Cs                             */}
      {/* ========================================================= */}
      {activeTab === "cert" && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-200">
            <p className="font-semibold mb-0.5">Sertifikat Gemologi Asmara (The 4Cs of Love)</p>
            <p>
              Rincian pengujian laboratorium permata cinta resmi: Cut (Proporsi Faset), Clarity (Kejernihan Nurani), Color (Warna Jiwa), dan Carat (Bobot Kasih).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Nomor Registrasi Sertifikat">
              <Input
                {...register("certificateNo")}
                id={`${idPrefix}-certificateNo`}
                placeholder="GIA-VENDOME-889922-AMOUR"
              />
            </Field>
            <Field label="Fluoresensi & Simetri Optik">
              <Input
                {...register("fluorescenceGrade")}
                id={`${idPrefix}-fluorescenceGrade`}
                placeholder="Strong Blue Luminescence under Midnight Sky • Excellent Symmetry"
              />
            </Field>
          </div>

          <div className="p-4 rounded-xl border border-line bg-parchment-50 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-base">
              1. Cut (Potongan & Proporsi Faset)
            </h4>
            <Field label="Predikat Nilai Cut">
              <Input
                {...register("cutGrade")}
                id={`${idPrefix}-cutGrade`}
                placeholder="Cœur Brillant Parfait (Potongan Hati Nirwana)"
              />
            </Field>
            <Field label="Tafsir Puitis Nilai Cut">
              <Textarea
                {...register("cutDescription")}
                id={`${idPrefix}-cutDescription`}
                rows={2}
                placeholder="Tafsir asmara atas faset dan pantulan cahaya..."
              />
            </Field>
          </div>

          <div className="p-4 rounded-xl border border-line bg-parchment-50 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-base">
              2. Clarity (Kejernihan & Nilai Inklusi)
            </h4>
            <Field label="Predikat Nilai Clarity">
              <Input
                {...register("clarityGrade")}
                id={`${idPrefix}-clarityGrade`}
                placeholder="Internally Flawless (IF - Kemurnian Nir-Cacat)"
              />
            </Field>
            <Field label="Tafsir Puitis Nilai Clarity">
              <Textarea
                {...register("clarityDescription")}
                id={`${idPrefix}-clarityDescription`}
                rows={2}
                placeholder="Tafsir asmara atas kejernihan nurani..."
              />
            </Field>
          </div>

          <div className="p-4 rounded-xl border border-line bg-parchment-50 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-base">
              3. Color (Derajat Kemurnian Warna)
            </h4>
            <Field label="Predikat Nilai Color">
              <Input
                {...register("colorGrade")}
                id={`${idPrefix}-colorGrade`}
                placeholder="Grade D - Absolute Pure White Soul"
              />
            </Field>
            <Field label="Tafsir Puitis Nilai Color">
              <Textarea
                {...register("colorDescription")}
                id={`${idPrefix}-colorDescription`}
                rows={2}
                placeholder="Tafsir asmara atas warna jiwa..."
              />
            </Field>
          </div>

          <div className="p-4 rounded-xl border border-line bg-parchment-50 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-base">
              4. Carat (Bobot & Gravitasi Kasih)
            </h4>
            <Field label="Predikat Nilai Carat">
              <Input
                {...register("caratWeight")}
                id={`${idPrefix}-caratWeight`}
                placeholder="Poids Infini (∞ Carats - Tak Terhingga)"
              />
            </Field>
            <Field label="Tafsir Puitis Nilai Carat">
              <Textarea
                {...register("caratDescription")}
                id={`${idPrefix}-caratDescription`}
                rows={2}
                placeholder="Tafsir asmara atas bobot rasa..."
              />
            </Field>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: 4 PERMATA KISAH ASMARA INTERAKTIF                   */}
      {/* ========================================================= */}
      {activeTab === "gems" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-200 flex-1 mr-4">
              <p className="font-semibold mb-0.5">4 Batu Mulia Jejak Kisah Asmara</p>
              <p>
                Tahapan kisah cinta yang dipersonifikasikan menjadi 4 batu permata berfaset dan saling bercahaya.
              </p>
            </div>
            <button
              type="button"
              onClick={handleLoadClassicGems}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg border border-amber-500/40 bg-amber-50 text-amber-900 hover:bg-amber-100 transition-colors whitespace-nowrap cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Muat 4 Permata Klasik</span>
            </button>
          </div>

          {/* Gem 1 */}
          <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-50/20 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
              Permata 1: Zamrud Harapan
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <Field label="Nama & Makna Permata">
                  <Input
                    {...register("gem1Name")}
                    id={`${idPrefix}-gem1Name`}
                    placeholder="Émeraude de Colombie (Zamrud Harapan)"
                  />
                </Field>
              </div>
              <Field label="Kode Warna Hex">
                <Input
                  {...register("gem1ColorHex")}
                  id={`${idPrefix}-gem1ColorHex`}
                  placeholder="#059669"
                />
              </Field>
            </div>
            <Field label="Periode Jejak Kisah">
              <Input
                {...register("gem1Period")}
                id={`${idPrefix}-gem1Period`}
                placeholder="Musim Semi 2022 • Hari Pertama Mata Saling Bersitatap"
              />
            </Field>
            <Field label="Bait Puitis Zamrud">
              <Textarea
                {...register("gem1Poem")}
                id={`${idPrefix}-gem1Poem`}
                rows={2}
                placeholder="Bait puitis untuk permata pertama..."
              />
            </Field>
          </div>

          {/* Gem 2 */}
          <div className="p-4 rounded-xl border border-blue-500/30 bg-blue-50/20 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-800 block">
              Permata 2: Safir Kesetiaan
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <Field label="Nama & Makna Permata">
                  <Input
                    {...register("gem2Name")}
                    id={`${idPrefix}-gem2Name`}
                    placeholder="Saphir Royal de Ceylan (Safir Keteduhan)"
                  />
                </Field>
              </div>
              <Field label="Kode Warna Hex">
                <Input
                  {...register("gem2ColorHex")}
                  id={`${idPrefix}-gem2ColorHex`}
                  placeholder="#1d4ed8"
                />
              </Field>
            </div>
            <Field label="Periode Jejak Kisah">
              <Input
                {...register("gem2Period")}
                id={`${idPrefix}-gem2Period`}
                placeholder="Malam-Malam Panjang • Samudra Kesabaran & Dekapan Tenang"
              />
            </Field>
            <Field label="Bait Puitis Safir">
              <Textarea
                {...register("gem2Poem")}
                id={`${idPrefix}-gem2Poem`}
                rows={2}
                placeholder="Bait puitis untuk permata kedua..."
              />
            </Field>
          </div>

          {/* Gem 3 */}
          <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-50/20 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-800 block">
              Permata 3: Mirah Delima Gairah
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <Field label="Nama & Makna Permata">
                  <Input
                    {...register("gem3Name")}
                    id={`${idPrefix}-gem3Name`}
                    placeholder="Rubis Sang-de-Pigeon (Mirah Delima Gairah)"
                  />
                </Field>
              </div>
              <Field label="Kode Warna Hex">
                <Input
                  {...register("gem3ColorHex")}
                  id={`${idPrefix}-gem3ColorHex`}
                  placeholder="#b91c1c"
                />
              </Field>
            </div>
            <Field label="Periode Jejak Kisah">
              <Input
                {...register("gem3Period")}
                id={`${idPrefix}-gem3Period`}
                placeholder="Tahun Ketiga • Ujian Nyala Api & Janji Tak Tergoyahkan"
              />
            </Field>
            <Field label="Bait Puitis Mirah Delima">
              <Textarea
                {...register("gem3Poem")}
                id={`${idPrefix}-gem3Poem`}
                rows={2}
                placeholder="Bait puitis untuk permata ketiga..."
              />
            </Field>
          </div>

          {/* Gem 4 */}
          <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-50/20 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 block">
              Permata 4: Intan Abadi Mahkota
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <Field label="Nama & Makna Permata">
                  <Input
                    {...register("gem4Name")}
                    id={`${idPrefix}-gem4Name`}
                    placeholder="Diamant Éternel (Intan Abadi Mahkota Ikrar Jiwa)"
                  />
                </Field>
              </div>
              <Field label="Kode Warna Hex">
                <Input
                  {...register("gem4ColorHex")}
                  id={`${idPrefix}-gem4ColorHex`}
                  placeholder="#e0e7ff"
                />
              </Field>
            </div>
            <Field label="Periode Jejak Kisah">
              <Input
                {...register("gem4Period")}
                id={`${idPrefix}-gem4Period`}
                placeholder="Hari Ini & Selamanya • Lingkaran Mahkota Tak Berujung"
              />
            </Field>
            <Field label="Bait Puitis Intan Abadi">
              <Textarea
                {...register("gem4Poem")}
                id={`${idPrefix}-gem4Poem`}
                rows={2}
                placeholder="Bait puitis untuk permata keempat..."
              />
            </Field>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 4: LIONTIN EMAS & ATELIER PANDAI EMAS                  */}
      {/* ========================================================= */}
      {activeTab === "locket" && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-200">
            <p className="font-semibold mb-0.5">Liontin Filigree Emas & Meja Kerja Atelier</p>
            <p>
              Unggah 2 foto estetika: foto kenangan berdua untuk liontin emas klasik dan foto suasana meja kerja sang pandai perhiasan (keduanya bergaransi fallback estetis).
            </p>
          </div>

          {/* IMAGE UPLOAD 2: LOCKET MOMENTS PHOTO */}
          <div className="p-4 rounded-xl border border-line bg-parchment-50 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-base">
              Foto 2: Kenangan di Dalam Liontin Emas (Momen Berdua)
            </h4>
            <ImageUploadField
              label="Unggah Foto Kenangan Liontin"
              value={locketMomentsPhotoUrl}
              onChange={(url) => setValue("locketMomentsPhotoUrl", url)}
            />
            <Field label="Keterangan Foto Liontin Emas">
              <Input
                {...register("locketPhotoCaption")}
                id={`${idPrefix}-locketPhotoCaption`}
                placeholder="Detik Sakral yang Terpatri di Dalam Liontin Emas 18 Karat"
              />
            </Field>
          </div>

          {/* IMAGE UPLOAD 3: ATELIER WORKBENCH PHOTO */}
          <div className="p-4 rounded-xl border border-line bg-parchment-50 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-base">
              Foto 3: Suasana Meja Kerja & Kotak Perhiasan (Atelier)
            </h4>
            <ImageUploadField
              label="Unggah Foto Suasana Atelier"
              value={atelierPhotoUrl}
              onChange={(url) => setValue("atelierPhotoUrl", url)}
            />
            <Field label="Keterangan Foto Meja Kerja Atelier">
              <Input
                {...register("atelierPhotoCaption")}
                id={`${idPrefix}-atelierPhotoCaption`}
                placeholder="Meja Kerja Sang Pandai Emas • Place Vendôme Paris"
              />
            </Field>
          </div>

          <Field label="Warkah Narasi Penempaan Asmara">
            <Textarea
              {...register("goldsmithNarration")}
              id={`${idPrefix}-goldsmithNarration`}
              rows={5}
              placeholder="Tuliskan pengakuan puitis dari sang pandai emas..."
            />
          </Field>

          <Field label="Aksioma Filosofis Pandai Perhiasan">
            <Input
              {...register("goldsmithAxiom")}
              id={`${idPrefix}-goldsmithAxiom`}
              placeholder="Aksioma singkat tentang cinta yang ditempa..."
            />
          </Field>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 5: LOGAM MULIA & KETAHANAN MOHS SCALE                 */}
      {/* ========================================================= */}
      {activeTab === "metals" && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-200">
            <p className="font-semibold mb-0.5">Logam Mulia & Skala Ketahanan Asmara</p>
            <p>
              Spesifikasi paduan logam mulia mahkota, skala kekerasan Mohs 10/10, indeks bias cahaya, dan sumpah keteguhan cinta.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Paduan Logam Mulia Mahkota">
              <Input
                {...register("preciousMetal")}
                id={`${idPrefix}-preciousMetal`}
                placeholder="Platine Pur 950 & Or Rose 18K Hand-Forged"
              />
            </Field>
            <Field label="Skala Kekerasan Hati (Mohs Scale)">
              <Input
                {...register("mohsHardness")}
                id={`${idPrefix}-mohsHardness`}
                placeholder="10.0 / 10.0 Mohs Scale (Indestructible Diamond Standard)"
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Indeks Refraksi Cahaya Asmara">
              <Input
                {...register("refractiveIndex")}
                id={`${idPrefix}-refractiveIndex`}
                placeholder="2.42 RI (Membias Segenap Cahaya Semesta Menjadi Keindahan)"
              />
            </Field>
            <Field label="Cap Stempel Resmi (Hallmark)">
              <Input
                {...register("masterHallmark")}
                id={`${idPrefix}-masterHallmark`}
                placeholder="Poinçon Tête d'Aigle & Losange du Maître Orfèvre"
              />
            </Field>
          </div>

          <Field label="Sumpah Alkimia Cinta Abadi">
            <Textarea
              {...register("alchemicalPledge")}
              id={`${idPrefix}-alchemicalPledge`}
              rows={3}
              placeholder="Ikrar keteguhan cinta..."
            />
          </Field>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 6: LACI RAHASIA & UKIRAN CINCIN                       */}
      {/* ========================================================= */}
      {activeTab === "secret" && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-200">
            <p className="font-semibold mb-0.5">Laci Rahasia Kotak Beludru & Ukiran Cincin</p>
            <p>
              Pesan tersembunyi yang hanya terbuka ketika tombol interaktif diklik, ukiran rahasia cincin, dan alunan melodi harpa klasik.
            </p>
          </div>

          <Field label="Ukiran Rahasia di Bagian Dalam Cincin (Gravure)">
            <Input
              {...register("ringInscription")}
              id={`${idPrefix}-ringInscription`}
              placeholder="Semper Adeste In Corde Meo • Selamanya Bersemayam di Dadaku"
            />
          </Field>

          <Field label="Pesan Rahasia di Dalam Laci Beludru (Secret Drawer)">
            <Textarea
              {...register("secretVowMessage")}
              id={`${idPrefix}-secretVowMessage`}
              rows={4}
              placeholder="Pesan intim yang hanya terungkap saat tombol interaktif diklik..."
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Gelar Tanda Tangan Sang Pembuat">
              <Input
                {...register("signatureTitle")}
                id={`${idPrefix}-signatureTitle`}
                placeholder="Maître Joaillier de Ton Cœur • Paris"
              />
            </Field>
            <Field label="Judul Alunan Melodi Harpa">
              <Input
                {...register("musicTitle")}
                id={`${idPrefix}-musicTitle`}
                placeholder="Gabriel Fauré: Pavane Op. 50 (Romantic Harp & Strings)"
              />
            </Field>
          </div>

          <Field label="Tautan URL Audio Simfoni Harpa (Opsional)">
            <Input
              {...register("audioUrl")}
              id={`${idPrefix}-audioUrl`}
              placeholder="https://cdn.freesound.org/previews/612/612089_5674468-lq.mp3"
            />
          </Field>
        </div>
      )}
    </div>
  );
}
