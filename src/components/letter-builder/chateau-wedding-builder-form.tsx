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
  Shield,
  Sparkles,
  MapPin,
  Award,
  Send,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Field, Input, Textarea } from "@/components/ui/field";
import { ColorPickerField } from "@/components/ui/color-picker-field";
import { cn } from "@/lib/utils/cn";
import type { LetterFormValues } from "./dynamic-form";

interface ChateauWeddingBuilderFormProps {
  register: UseFormRegister<LetterFormValues>;
  setValue: UseFormSetValue<LetterFormValues>;
  watch: UseFormWatch<LetterFormValues>;
  errors: FieldErrors<LetterFormValues>;
  idPrefix?: string;
}

type TabType =
  | "proclamation"
  | "chronicle"
  | "salons"
  | "logistics"
  | "etiquette"
  | "rsvp";

export function ChateauWeddingBuilderForm({
  register,
  setValue,
  watch,
  errors,
  idPrefix = "chateau-wedding",
}: ChateauWeddingBuilderFormProps) {
  const [activeTab, setActiveTab] = useState<TabType>("proclamation");

  const tabs: Array<{ id: TabType; label: string; icon: React.ReactNode }> = [
    { id: "proclamation", label: "Titah & Mempelai", icon: <Crown className="w-4 h-4" /> },
    { id: "chronicle", label: "Kisah Asmara", icon: <Shield className="w-4 h-4" /> },
    { id: "salons", label: "4 Paviliun Istana", icon: <Sparkles className="w-4 h-4" /> },
    { id: "logistics", label: "Lokasi & Protokol", icon: <MapPin className="w-4 h-4" /> },
    { id: "etiquette", label: "Dress Code & Etiket", icon: <Award className="w-4 h-4" /> },
    { id: "rsvp", label: "RSVP & Tanda Kasih", icon: <Send className="w-4 h-4" /> },
  ];

  const primaryColor = watch("primaryColor") as string;
  const secondaryColor = watch("secondaryColor") as string;
  const accentColor = watch("accentColor") as string;

  const handleApplyPresetSalons = () => {
    setValue("salon1Time", "10:00 - 12:00 CET");
    setValue("salon1Title", "Salon de Vénus: Pemberkatan & Ikrar Janji Suci");
    setValue("salon1Location", "Chapelle Royale, Château de Versailles");
    setValue(
      "salon1Desc",
      "Upacara sakral pengucapan janji suci di hadapan altar emas berlapis beludru kirmizi dengan iringan paduan suara katedral dan pertukaran cincin pusaka wangsa."
    );

    setValue("salon2Time", "16:30 - 18:30 CET");
    setValue("salon2Title", "Galerie des Glaces: Pawai Sampanye di Lorong Cermin");
    setValue("salon2Location", "La Grande Galerie des Glaces");
    setValue(
      "salon2Desc",
      "Sambutan kehormatan para bangsawan di lorong cermin kristal legendaris dengan sajian sampanye vintage dan alunan harpa klasik Prancis."
    );

    setValue("salon3Time", "19:00 - 21:00 CET");
    setValue("salon3Title", "Grand Couvert Royal: Jamuan Makan Malam Kenegaraan");
    setValue("salon3Location", "Salon d'Hercule & Grand Vestibule");
    setValue(
      "salon3Desc",
      "Jamuan makan malam fine dining haute cuisine klasik Prancis di bawah gemerlap cahaya 50 chandelier kristal dan set meja porselen istana."
    );

    setValue("salon4Time", "21:00 - Selesai");
    setValue("salon4Title", "Parterre d'Eau: Dansa Waltz & Kembang Api Megah");
    setValue("salon4Location", "Terrasse du Grand Parterre & Les Fontaines");
    setValue(
      "salon4Desc",
      "Dansa waltz pertama kedua mempelai diiringi orkestra simfoni kerajaan, pemotongan kue pengantin mahkota, dan pertunjukan kembang api spektakuler di atas kolam air mancur istana."
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

  const colorPresets = [
    { label: "Burgundy Velvet & Versailles Gold", primary: "#d4af37", secondary: "#991b1b", accent: "#24060f" },
    { label: "Royal Midnight Navy & Gold Leaf", primary: "#e5c07b", secondary: "#1e3a8a", accent: "#0a0f1d" },
    { label: "Palace Emerald & Gilded Ormolu", primary: "#f59e0b", secondary: "#065f46", accent: "#041b14" },
    { label: "Crimson Velvet & Baroque Brocade", primary: "#fbbf24", secondary: "#b91c1c", accent: "#1a040b" },
  ];

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
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

      {/* TAB 1: Titah Proklamasi & Mempelai */}
      {activeTab === "proclamation" && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-200">
            <p className="font-semibold mb-0.5">Maklumat Titah Kerajaan & Monogram Wangsa</p>
            <p>
              Tentukan monogram mahkota inisial mempelai, tajuk proklamasi resmi, serta silsilah kehormatan keluarga kedua mempelai.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Monogram Mahkota Inisial Mempelai">
              <Input
                {...register("coupleMonogram")}
                id={`${idPrefix}-coupleMonogram`}
                placeholder="H & C"
              />
            </Field>

            <Field label="Tajuk Maklumat Titah Kerajaan">
              <Input
                {...register("royalProclamationHeader")}
                id={`${idPrefix}-royalProclamationHeader`}
                placeholder="DE PAR LE ROI • PROCLAMATION ROYALE"
              />
            </Field>
          </div>

          <Field label="Nama Tamu Undangan Terhormat" error={errors.recipientName?.message} required>
            <Input
              {...register("recipientName", { required: "Nama tamu wajib diisi" })}
              id={`${idPrefix}-recipientName`}
              placeholder="Yang Mulia Tamu Undangan Kehormatan"
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Judul Undangan Pernikahan Kerajaan">
              <Input
                {...register("weddingTitle")}
                id={`${idPrefix}-weddingTitle`}
                placeholder="Le Grand Mariage Royal de Henri & Camille"
              />
            </Field>

            <Field label="Subjudul Undangan Kehormatan">
              <Input
                {...register("invitationSubtitle")}
                id={`${idPrefix}-invitationSubtitle`}
                placeholder="Dengan Memohon Berkah & Rahmat Illahi..."
              />
            </Field>
          </div>

          {/* Mempelai Pria */}
          <div className="p-4 rounded-xl border border-border/70 bg-card/60 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Mempelai Pria Bangsawan
            </span>
            <Field label="Nama Lengkap & Gelar Mempelai Pria" error={errors.groomName?.message} required>
              <Input
                {...register("groomName", { required: "Nama mempelai pria wajib diisi" })}
                id={`${idPrefix}-groomName`}
                placeholder="Lord Henri Alexandre de Valois"
              />
            </Field>
            <Field label="Silsilah Orang Tua Mempelai Pria">
              <Input
                {...register("groomParents")}
                id={`${idPrefix}-groomParents`}
                placeholder="Putra Sulung dari Duc Lorenzo de Valois..."
              />
            </Field>
          </div>

          {/* Mempelai Wanita */}
          <div className="p-4 rounded-xl border border-border/70 bg-card/60 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              Mempelai Wanita Bangsawan
            </span>
            <Field label="Nama Lengkap & Gelar Mempelai Wanita" error={errors.brideName?.message} required>
              <Input
                {...register("brideName", { required: "Nama mempelai wanita wajib diisi" })}
                id={`${idPrefix}-brideName`}
                placeholder="Lady Camille Geneviève de Bourbon"
              />
            </Field>
            <Field label="Silsilah Orang Tua Mempelai Wanita">
              <Input
                {...register("brideParents")}
                id={`${idPrefix}-brideParents`}
                placeholder="Putri Kedua dari Marquis François de Bourbon..."
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Hari & Tanggal Pernikahan">
              <Input
                {...register("weddingDate")}
                id={`${idPrefix}-weddingDate`}
                placeholder="Minggu, 15 November 2026"
              />
            </Field>

            <Field label="Rentang Waktu Acara">
              <Input
                {...register("weddingTime")}
                id={`${idPrefix}-weddingTime`}
                placeholder="Pukul 10.00 - 23.30 CET"
              />
            </Field>
          </div>

          <Field label="Ayat Suci / Deklarasi Ikrar Perjanjian">
            <Textarea
              {...register("sacredVerse")}
              id={`${idPrefix}-sacredVerse`}
              rows={3}
              placeholder="Kutipan ayat suci atau sumpah perkawinan..."
            />
          </Field>
        </div>
      )}

      {/* TAB 2: Kisah Asmara Kerajaan */}
      {activeTab === "chronicle" && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs text-rose-800 dark:text-rose-200">
            <p className="font-semibold mb-0.5">Kisah Asmara Dua Hati di Balik Gerbang Versailles</p>
            <p>
              Tuliskan kisah asmara bangsawan yang sarat akan kehormatan dan komitmen suci seumur hidup.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Judul Kisah Asmara">
              <Input
                {...register("storyTitle")}
                id={`${idPrefix}-storyTitle`}
                placeholder="Asmara Dua Hati di Balik Gerbang Versailles"
              />
            </Field>

            <Field label="Subjudul Kisah Asmara">
              <Input
                {...register("storySubtitle")}
                id={`${idPrefix}-storySubtitle`}
                placeholder="Menyatukan Dua Wangsa di Bawah Kilau Lentera Emas..."
              />
            </Field>
          </div>

          <Field label="Narasi Kisah Cinta (Warkah Utama)" error={errors.mainMessage?.message} required>
            <Textarea
              {...register("mainMessage", { required: "Narasi kisah cinta wajib diisi" })}
              id={`${idPrefix}-mainMessage`}
              rows={7}
              placeholder="Tuliskan narasi perjalanan cinta kedua mempelai..."
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Aksioma Filosofis Asmara Istana">
              <Input
                {...register("royalAxiom")}
                id={`${idPrefix}-royalAxiom`}
                placeholder="Cinta sejati adalah mahkota tertinggi..."
              />
            </Field>

            <Field label="Tanda Tangan Pengantin">
              <Input
                {...register("senderName")}
                id={`${idPrefix}-senderName`}
                placeholder="Henri & Camille"
              />
            </Field>
          </div>
        </div>
      )}

      {/* TAB 3: 4 Paviliun Acara Istana */}
      {activeTab === "salons" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <div className="text-xs text-amber-800 dark:text-amber-200">
              <p className="font-semibold mb-0.5">Empat Paviliun Perayaan Istana (Les 4 Grands Salons)</p>
              <p>
                Rangkaian prosesi dari Chapelle Royale, Galerie des Glaces, Grand Couvert, hingga Parterre d&apos;Eau.
              </p>
            </div>
            <button
              type="button"
              onClick={handleApplyPresetSalons}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-amber-600 text-white hover:bg-amber-700 shadow-sm shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Gunakan Rundown Istana</span>
            </button>
          </div>

          {/* Salon 1 */}
          <div className="p-4 rounded-xl border border-border/70 bg-card/60 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Paviliun 1: Chapelle Royale (Pemberkatan Suci)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Waktu">
                <Input {...register("salon1Time")} placeholder="10:00 - 12:00 CET" />
              </Field>
              <Field label="Nama Prosesi">
                <Input {...register("salon1Title")} placeholder="Salon de Vénus: Pemberkatan" />
              </Field>
            </div>
            <Field label="Lokasi Area">
              <Input {...register("salon1Location")} placeholder="Chapelle Royale, Château de Versailles" />
            </Field>
            <Field label="Keterangan Prosesi">
              <Textarea {...register("salon1Desc")} rows={2} placeholder="Upacara sakral pengucapan janji suci..." />
            </Field>
          </div>

          {/* Salon 2 */}
          <div className="p-4 rounded-xl border border-border/70 bg-card/60 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              Paviliun 2: Galerie des Glaces (Pawai Sampanye Lorong Cermin)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Waktu">
                <Input {...register("salon2Time")} placeholder="16:30 - 18:30 CET" />
              </Field>
              <Field label="Nama Prosesi">
                <Input {...register("salon2Title")} placeholder="Galerie des Glaces: Pawai Sampanye" />
              </Field>
            </div>
            <Field label="Lokasi Area">
              <Input {...register("salon2Location")} placeholder="La Grande Galerie des Glaces" />
            </Field>
            <Field label="Keterangan Prosesi">
              <Textarea {...register("salon2Desc")} rows={2} placeholder="Sambutan kehormatan para bangsawan..." />
            </Field>
          </div>

          {/* Salon 3 */}
          <div className="p-4 rounded-xl border border-border/70 bg-card/60 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Paviliun 3: Grand Couvert Royal (Jamuan Kenegaraan)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Waktu">
                <Input {...register("salon3Time")} placeholder="19:00 - 21:00 CET" />
              </Field>
              <Field label="Nama Prosesi">
                <Input {...register("salon3Title")} placeholder="Grand Couvert Royal: Jamuan Makan Malam" />
              </Field>
            </div>
            <Field label="Lokasi Area">
              <Input {...register("salon3Location")} placeholder="Salon d'Hercule & Grand Vestibule" />
            </Field>
            <Field label="Keterangan Prosesi">
              <Textarea {...register("salon3Desc")} rows={2} placeholder="Jamuan makan malam fine dining..." />
            </Field>
          </div>

          {/* Salon 4 */}
          <div className="p-4 rounded-xl border border-border/70 bg-card/60 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              Paviliun 4: Parterre d&apos;Eau (Dansa Waltz & Kembang Api)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Waktu">
                <Input {...register("salon4Time")} placeholder="21:00 - Selesai" />
              </Field>
              <Field label="Nama Prosesi">
                <Input {...register("salon4Title")} placeholder="Parterre d'Eau: Dansa Waltz & Kembang Api" />
              </Field>
            </div>
            <Field label="Lokasi Area">
              <Input {...register("salon4Location")} placeholder="Terrasse du Grand Parterre" />
            </Field>
            <Field label="Keterangan Prosesi">
              <Textarea {...register("salon4Desc")} rows={2} placeholder="Dansa waltz pertama kedua mempelai..." />
            </Field>
          </div>
        </div>
      )}

      {/* TAB 4: Lokasi & Protokol Kedatangan */}
      {activeTab === "logistics" && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-200">
            <p className="font-semibold mb-0.5">Domaine Royal & Protokol Gerbang Istana</p>
            <p>
              Tuliskan nama istana, alamat gerbang kehormatan, rincian protokol kereta kencana, serta tautan Google Maps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Nama Istana / Domaine Royal">
              <Input
                {...register("chateauName")}
                id={`${idPrefix}-chateauName`}
                placeholder="Château de Versailles • Domaine Royal"
              />
            </Field>

            <Field label="Wilayah & Kota Istana">
              <Input
                {...register("chateauSubname")}
                id={`${idPrefix}-chateauSubname`}
                placeholder="Place d'Armes, 78000 Versailles, France"
              />
            </Field>
          </div>

          <Field label="Alamat Lengkap Gerbang Kehormatan">
            <Textarea
              {...register("chateauAddress")}
              id={`${idPrefix}-chateauAddress`}
              rows={2}
              placeholder="Place d'Armes, 78000 Versailles, Île-de-France, France"
            />
          </Field>

          <Field label="Protokol Kereta Kencana & Akses Tamu">
            <Textarea
              {...register("carriageProtocol")}
              id={`${idPrefix}-carriageProtocol`}
              rows={2}
              placeholder="Tamu kehormatan disambut melalui Grille d'Honneur..."
            />
          </Field>

          <Field label="URL Google Maps Lokasi">
            <Input
              {...register("mapsUrl")}
              id={`${idPrefix}-mapsUrl`}
              placeholder="https://maps.google.com/?q=Château+de+Versailles"
            />
          </Field>
        </div>
      )}

      {/* TAB 5: Dress Code & Etiket Bangsawan */}
      {activeTab === "etiquette" && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs text-rose-800 dark:text-rose-200">
            <p className="font-semibold mb-0.5">Panduan Busana Haute Couture & Etiket Kehormatan</p>
            <p>
              Panduan gaya berbusana ningrat serta tata tertib kehormatan istana bagi para tamu undangan.
            </p>
          </div>

          <Field label="Tema Dress Code">
            <Input
              {...register("dressCodeTheme")}
              id={`${idPrefix}-dressCodeTheme`}
              placeholder="Black Tie Baroque Elegance • Haute Couture Royale"
            />
          </Field>

          <Field label="Deskripsi Panduan Busana">
            <Textarea
              {...register("dressCodeDesc")}
              id={`${idPrefix}-dressCodeDesc`}
              rows={3}
              placeholder="Para pria disarankan mengenakan setelan tuxedo..."
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Swatch Warna 1">
              <Input {...register("colorSwatch1")} placeholder="Imperial Burgundy Velvet (#500724)" />
            </Field>
            <Field label="Swatch Warna 2">
              <Input {...register("colorSwatch2")} placeholder="Versailles Gold Leaf (#d4af37)" />
            </Field>
            <Field label="Swatch Warna 3">
              <Input {...register("colorSwatch3")} placeholder="Midnight King's Navy (#0f172a)" />
            </Field>
            <Field label="Swatch Warna 4">
              <Input {...register("colorSwatch4")} placeholder="Fleur-de-Lis Silk Ivory (#f8fafc)" />
            </Field>
          </div>

          <Field label="Catatan Protokol Kehormatan Istana">
            <Textarea
              {...register("courtEtiquetteNotes")}
              id={`${idPrefix}-courtEtiquetteNotes`}
              rows={2}
              placeholder="Demi menjaga keluhuran suasana istana bersejarah..."
            />
          </Field>
        </div>
      )}

      {/* TAB 6: RSVP & Tanda Kasih Kerajaan */}
      {activeTab === "rsvp" && (
        <div className="space-y-6">
          <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-200">
            <p className="font-semibold mb-0.5">RSVP de la Cour & Vault Tanda Kasih Digital</p>
            <p>
              Lengkapi nomor rekening bank yang dapat disalin satu-klik serta batas waktu konfirmasi kehadiran para bangsawan.
            </p>
          </div>

          {/* Bank 1 */}
          <div className="p-4 rounded-xl border border-border/70 bg-card/60 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Rekening Bank Kehormatan 1
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Field label="Nama Bank">
                <Input {...register("bank1Name")} placeholder="BCA (Bank Central Asia)" />
              </Field>
              <Field label="Nomor Rekening">
                <Input {...register("bank1AccountNo")} placeholder="8820912411" />
              </Field>
              <Field label="Atas Nama">
                <Input {...register("bank1Holder")} placeholder="Lord Henri Alexandre de Valois" />
              </Field>
            </div>
          </div>

          {/* Bank 2 */}
          <div className="p-4 rounded-xl border border-border/70 bg-card/60 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              Rekening Bank Kehormatan 2
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Field label="Nama Bank">
                <Input {...register("bank2Name")} placeholder="Bank Mandiri" />
              </Field>
              <Field label="Nomor Rekening">
                <Input {...register("bank2AccountNo")} placeholder="1370098231044" />
              </Field>
              <Field label="Atas Nama">
                <Input {...register("bank2Holder")} placeholder="Lady Camille Geneviève de Bourbon" />
              </Field>
            </div>
          </div>

          <Field label="Pesan Pengantar Tanda Kasih (Vault of Blessings)">
            <Textarea
              {...register("giftMessage")}
              id={`${idPrefix}-giftMessage`}
              rows={3}
              placeholder="Kehadiran dan doa restu Yang Terhormat adalah anugerah terbesar..."
            />
          </Field>

          <Field label="Batas Waktu Konfirmasi RSVP">
            <Input
              {...register("rsvpDeadline")}
              id={`${idPrefix}-rsvpDeadline`}
              placeholder="Mohon konfirmasi kehadiran sebelum 20 Oktober 2026"
            />
          </Field>

          {/* Palette presets */}
          <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs space-y-3">
            <span className="text-xs font-semibold text-foreground">Preset Warna Tema Istana:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {colorPresets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setValue("primaryColor", preset.primary);
                    setValue("secondaryColor", preset.secondary);
                    setValue("accentColor", preset.accent);
                  }}
                  className="p-2.5 rounded-lg border border-border/70 hover:border-amber-400/60 text-left transition flex items-center justify-between bg-card/50"
                >
                  <span className="text-xs font-medium text-foreground">{preset.label}</span>
                  <div className="flex gap-1">
                    <span className="w-3.5 h-3.5 rounded-full border border-black/20" style={{ backgroundColor: preset.primary }} />
                    <span className="w-3.5 h-3.5 rounded-full border border-black/20" style={{ backgroundColor: preset.secondary }} />
                    <span className="w-3.5 h-3.5 rounded-full border border-black/20" style={{ backgroundColor: preset.accent }} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Color pickers - Setiap Bagian Memiliki Box Tersendiri Secara Vertikal */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
              <ColorPickerField
                label="Versailles Gold Leaf"
                value={primaryColor || "#d4af37"}
                onChange={(val) => setValue("primaryColor", val)}
                presets={[
                  { label: "Versailles Gold", value: "#d4af37" },
                  { label: "Champagne Ormolu", value: "#e5c07b" },
                  { label: "Sunburst Gold", value: "#f59e0b" },
                ]}
              />
            </div>
            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
              <ColorPickerField
                label="Imperial Burgundy Velvet"
                value={secondaryColor || "#991b1b"}
                onChange={(val) => setValue("secondaryColor", val)}
                presets={[
                  { label: "Burgundy Velvet", value: "#991b1b" },
                  { label: "Royal Crimson", value: "#b91c1c" },
                  { label: "Deep Garnet", value: "#7f1d1d" },
                ]}
              />
            </div>
            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
              <ColorPickerField
                label="Velvet Deep Wine"
                value={accentColor || "#24060f"}
                onChange={(val) => setValue("accentColor", val)}
                presets={[
                  { label: "Velvet Deep Wine", value: "#24060f" },
                  { label: "Obsidian Burgundy", value: "#1a040b" },
                  { label: "Midnight Palace", value: "#0e0206" },
                ]}
              />
            </div>
          </div>

          {/* Pengaturan Musik dalam Box Tersendiri */}
          <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs space-y-4">
            <Field label="URL Musik Latar (Simfoni Waltz Istana Versailles)">
              <Input
                {...register("musicTrack")}
                id={`${idPrefix}-musicTrack`}
                placeholder="https://cdn.pixabay.com/..."
              />
            </Field>
          </div>
        </div>
      )}

      {/* Stepper Footer Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-border/40">
        {getPrevTab() ? (
          <button
            type="button"
            onClick={() => {
              const prev = getPrevTab();
              if (prev) setActiveTab(prev);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border border-border bg-background hover:bg-muted transition"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Sebelumnya</span>
          </button>
        ) : (
          <div />
        )}

        {getNextTab() && (
          <button
            type="button"
            onClick={() => {
              const next = getNextTab();
              if (next) setActiveTab(next);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-amber-600 text-white hover:bg-amber-700 transition ml-auto"
          >
            <span>Selanjutnya</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

export default ChateauWeddingBuilderForm;
