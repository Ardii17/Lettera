"use client";

import { useState } from "react";
import type {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  FieldErrors,
} from "react-hook-form";
import {
  Heart,
  Sun,
  Clock,
  MapPin,
  Sparkles,
  Send,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Field, Input, Textarea } from "@/components/ui/field";
import { ColorPickerField } from "@/components/ui/color-picker-field";
import { cn } from "@/lib/utils/cn";
import type { LetterFormValues } from "./dynamic-form";

interface AmalfiWeddingBuilderFormProps {
  register: UseFormRegister<LetterFormValues>;
  setValue: UseFormSetValue<LetterFormValues>;
  watch: UseFormWatch<LetterFormValues>;
  errors: FieldErrors<LetterFormValues>;
  idPrefix?: string;
}

type TabType =
  | "monogram"
  | "story"
  | "itinerary"
  | "venue"
  | "etiquette"
  | "rsvp";

export function AmalfiWeddingBuilderForm({
  register,
  setValue,
  watch,
  errors,
  idPrefix = "amalfi-wedding",
}: AmalfiWeddingBuilderFormProps) {
  const [activeTab, setActiveTab] = useState<TabType>("monogram");

  const tabs: Array<{ id: TabType; label: string; icon: React.ReactNode }> = [
    { id: "monogram", label: "Mempelai & Maklumat", icon: <Heart className="w-4 h-4" /> },
    { id: "story", label: "Kisah Cinta", icon: <Sun className="w-4 h-4" /> },
    { id: "itinerary", label: "4 Babak Acara", icon: <Clock className="w-4 h-4" /> },
    { id: "venue", label: "Lokasi & Peta", icon: <MapPin className="w-4 h-4" /> },
    { id: "etiquette", label: "Dress Code & Etiket", icon: <Sparkles className="w-4 h-4" /> },
    { id: "rsvp", label: "RSVP & Tanda Kasih", icon: <Send className="w-4 h-4" /> },
  ];

  const primaryColor = watch("primaryColor") as string;
  const secondaryColor = watch("secondaryColor") as string;
  const accentColor = watch("accentColor") as string;

  const handleApplyPresetItinerary = () => {
    setValue("act1Time", "09:00 - 11:00 CEST");
    setValue("act1Title", "Atto I: Pemberkatan Suci di Tebing Laut");
    setValue("act1Location", "Terrazza dell'Infinito, Villa d'Amore");
    setValue(
      "act1Desc",
      "Pengucapan janji suci dan pertukaran cincin pernikahan di atas altar marmer terbuka dengan pemandangan 180 derajat birunya laut Tyrrhenian."
    );

    setValue("act2Time", "16:30 - 18:00 CEST");
    setValue("act2Title", "Atto II: Aperitivo Mentari Senja & Live Mandolin");
    setValue("act2Location", "Giardino dei Limoni");
    setValue(
      "act2Desc",
      "Menyambut tamu dengan Limoncello Spritz segar, kudapan canapé khas pesisir Italia, dan alunan melodi serenade petik akustik saat matahari mulai terbenam."
    );

    setValue("act3Time", "18:30 - 20:30 CEST");
    setValue("act3Title", "Atto III: Jamuan Makan Malam di Bawah Pergola");
    setValue("act3Location", "Pergola delle Rose e Limoni");
    setValue(
      "act3Desc",
      "Makan malam romantis dengan sajian pasta buatan tangan dan hidangan laut Mediterania di bawah naungan pergola dedaunan lemon dan lilin temaram."
    );

    setValue("act4Time", "20:30 - Selesai");
    setValue("act4Title", "Atto IV: Pesta Dansa & Kembang Api Teluk");
    setValue("act4Location", "Belvedere sul Mare");
    setValue(
      "act4Desc",
      "Dansa pertama kedua mempelai, pemotongan kue pengantin Millefoglie tradisional, serta selebrasi kembang api spektakuler yang menerangi teluk malam."
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
    { label: "Amalfi Azure & Limoncello", primary: "#eab308", secondary: "#0284c7", accent: "#0f2b48" },
    { label: "Positano Sunset & Terracotta", primary: "#f97316", secondary: "#38bdf8", accent: "#0c1f38" },
    { label: "Ravello Olive & Gold Leaf", primary: "#d4af37", secondary: "#65a30d", accent: "#0a192f" },
    { label: "Capri Sea Glass & Coral", primary: "#14b8a6", secondary: "#fb7185", accent: "#07162c" },
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

      {/* TAB 1: Monogram & Mempelai */}
      {activeTab === "monogram" && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-200">
            <p className="font-semibold mb-0.5">Monogram Villa & Identitas Kedua Mempelai</p>
            <p>
              Tentukan inisial monogram, nama lengkap mempelai pria dan wanita beserta orang tua terhormat, serta ayat/kutipan suci pernikahan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Monogram Inisial Mempelai">
              <Input
                {...register("coupleMonogram")}
                id={`${idPrefix}-coupleMonogram`}
                placeholder="A & L"
              />
            </Field>

            <Field label="Nama Tamu Undangan Terhormat" error={errors.recipientName?.message} required>
              <Input
                {...register("recipientName", { required: "Nama tamu wajib diisi" })}
                id={`${idPrefix}-recipientName`}
                placeholder="Bapak / Ibu / Sahabat Terkasih"
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Judul Undangan Pernikahan">
              <Input
                {...register("weddingTitle")}
                id={`${idPrefix}-weddingTitle`}
                placeholder="The Wedding Celebration of Alessandro & Lucia"
              />
            </Field>

            <Field label="Subjudul Undangan">
              <Input
                {...register("invitationSubtitle")}
                id={`${idPrefix}-invitationSubtitle`}
                placeholder="Con Amore e Gioia • Bersama Berkah Kasih..."
              />
            </Field>
          </div>

          {/* Mempelai Pria */}
          <div className="p-4 rounded-xl border border-border/70 bg-card/60 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Mempelai Pria (The Groom)
            </span>
            <Field label="Nama Lengkap Mempelai Pria" error={errors.groomName?.message} required>
              <Input
                {...register("groomName", { required: "Nama mempelai pria wajib diisi" })}
                id={`${idPrefix}-groomName`}
                placeholder="Alessandro Matteo Moretti"
              />
            </Field>
            <Field label="Orang Tua Mempelai Pria">
              <Input
                {...register("groomParents")}
                id={`${idPrefix}-groomParents`}
                placeholder="Putra pertama dari Bpk. Lorenzo Moretti & Ibu Isabella Rossi"
              />
            </Field>
          </div>

          {/* Mempelai Wanita */}
          <div className="p-4 rounded-xl border border-border/70 bg-card/60 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Mempelai Wanita (The Bride)
            </span>
            <Field label="Nama Lengkap Mempelai Wanita" error={errors.brideName?.message} required>
              <Input
                {...register("brideName", { required: "Nama mempelai wanita wajib diisi" })}
                id={`${idPrefix}-brideName`}
                placeholder="Lucia Caterina De Luca"
              />
            </Field>
            <Field label="Orang Tua Mempelai Wanita">
              <Input
                {...register("brideParents")}
                id={`${idPrefix}-brideParents`}
                placeholder="Putri kedua dari Bpk. Marco De Luca & Ibu Sofia Bianchi"
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Hari & Tanggal Pernikahan">
              <Input
                {...register("weddingDate")}
                id={`${idPrefix}-weddingDate`}
                placeholder="Sabtu, 24 Oktober 2026"
              />
            </Field>

            <Field label="Rentang Waktu Acara">
              <Input
                {...register("weddingTime")}
                id={`${idPrefix}-weddingTime`}
                placeholder="Pukul 09.00 - 23.00 CEST"
              />
            </Field>
          </div>

          <Field label="Ayat Suci / Kutipan Janji Pernikahan">
            <Textarea
              {...register("sacredVerse")}
              id={`${idPrefix}-sacredVerse`}
              rows={3}
              placeholder="Kutipan ayat suci atau janji..."
            />
          </Field>
        </div>
      )}

      {/* TAB 2: Kisah Cinta */}
      {activeTab === "story" && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-xs text-sky-800 dark:text-sky-200">
            <p className="font-semibold mb-0.5">Kisah Dua Hati di Bawah Mentari Riviera</p>
            <p>
              Bagikan kisah awal mula cinta bersemi hingga keputusan sakral untuk mengikat janji suci pernikahan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Judul Kisah Cinta">
              <Input
                {...register("storyTitle")}
                id={`${idPrefix}-storyTitle`}
                placeholder="Kisah Dua Hati di Pesisir Mediterania"
              />
            </Field>

            <Field label="Subjudul Kisah Cinta">
              <Input
                {...register("storySubtitle")}
                id={`${idPrefix}-storySubtitle`}
                placeholder="Bagaimana semesta menautkan langkah kami..."
              />
            </Field>
          </div>

          <Field label="Narasi Perjalanan Cinta (Warkah Utama)" error={errors.mainMessage?.message} required>
            <Textarea
              {...register("mainMessage", { required: "Kisah cinta wajib diisi" })}
              id={`${idPrefix}-mainMessage`}
              rows={7}
              placeholder="Tuliskan kisah perjalanan cinta kedua mempelai..."
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Kutipan Romantis Mempelai">
              <Input
                {...register("coupleQuote")}
                id={`${idPrefix}-coupleQuote`}
                placeholder="Di antara deburan ombak dan hangatnya mentari..."
              />
            </Field>

            <Field label="Tanda Tangan Pengantin">
              <Input
                {...register("senderName")}
                id={`${idPrefix}-senderName`}
                placeholder="Alessandro & Lucia"
              />
            </Field>
          </div>
        </div>
      )}

      {/* TAB 3: 4 Babak Acara */}
      {activeTab === "itinerary" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <div className="text-xs text-amber-800 dark:text-amber-200">
              <p className="font-semibold mb-0.5">Rundown 4 Babak Acara Hari Bahagia</p>
              <p>
                Susunan prosesi dari pemberkatan, aperitivo sunset, jamuan makan malam, hingga pesta dansa.
              </p>
            </div>
            <button
              type="button"
              onClick={handleApplyPresetItinerary}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-amber-600 text-white hover:bg-amber-700 shadow-sm shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Gunakan Rundown Klasik</span>
            </button>
          </div>

          {/* Act 1 */}
          <div className="p-4 rounded-xl border border-border/70 bg-card/60 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Babak 1: Pemberkatan Suci (Holy Matrimony)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Waktu">
                <Input {...register("act1Time")} placeholder="09:00 - 11:00 CEST" />
              </Field>
              <Field label="Nama Prosesi">
                <Input {...register("act1Title")} placeholder="Atto I: Pemberkatan Suci" />
              </Field>
            </div>
            <Field label="Lokasi Area">
              <Input {...register("act1Location")} placeholder="Terrazza dell'Infinito" />
            </Field>
            <Field label="Keterangan Prosesi">
              <Textarea {...register("act1Desc")} rows={2} placeholder="Pengucapan janji suci..." />
            </Field>
          </div>

          {/* Act 2 */}
          <div className="p-4 rounded-xl border border-border/70 bg-card/60 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Babak 2: Aperitivo Mentari Senja (Sunset Cocktail)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Waktu">
                <Input {...register("act2Time")} placeholder="16:30 - 18:00 CEST" />
              </Field>
              <Field label="Nama Prosesi">
                <Input {...register("act2Title")} placeholder="Atto II: Aperitivo Mentari Senja" />
              </Field>
            </div>
            <Field label="Lokasi Area">
              <Input {...register("act2Location")} placeholder="Giardino dei Limoni" />
            </Field>
            <Field label="Keterangan Prosesi">
              <Textarea {...register("act2Desc")} rows={2} placeholder="Menyambut tamu dengan Limoncello Spritz..." />
            </Field>
          </div>

          {/* Act 3 */}
          <div className="p-4 rounded-xl border border-border/70 bg-card/60 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Babak 3: Jamuan Makan Malam Pergola (Wedding Banquet)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Waktu">
                <Input {...register("act3Time")} placeholder="18:30 - 20:30 CEST" />
              </Field>
              <Field label="Nama Prosesi">
                <Input {...register("act3Title")} placeholder="Atto III: Jamuan Makan Malam di Bawah Pergola" />
              </Field>
            </div>
            <Field label="Lokasi Area">
              <Input {...register("act3Location")} placeholder="Pergola delle Rose e Limoni" />
            </Field>
            <Field label="Keterangan Prosesi">
              <Textarea {...register("act3Desc")} rows={2} placeholder="Makan malam romantis dengan sajian pasta..." />
            </Field>
          </div>

          {/* Act 4 */}
          <div className="p-4 rounded-xl border border-border/70 bg-card/60 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
              Babak 4: Pesta Dansa & Kembang Api (After Party)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Waktu">
                <Input {...register("act4Time")} placeholder="20:30 - Selesai" />
              </Field>
              <Field label="Nama Prosesi">
                <Input {...register("act4Title")} placeholder="Atto IV: Pesta Dansa & Kembang Api Teluk" />
              </Field>
            </div>
            <Field label="Lokasi Area">
              <Input {...register("act4Location")} placeholder="Belvedere sul Mare" />
            </Field>
            <Field label="Keterangan Prosesi">
              <Textarea {...register("act4Desc")} rows={2} placeholder="Dansa pertama kedua mempelai..." />
            </Field>
          </div>
        </div>
      )}

      {/* TAB 4: Lokasi & Peta */}
      {activeTab === "venue" && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-lg bg-teal-500/10 border border-teal-500/20 text-xs text-teal-800 dark:text-teal-200">
            <p className="font-semibold mb-0.5">Panduan Lokasi & Navigasi Villa</p>
            <p>
              Tuliskan nama tempat, alamat terperinci, informasi penjemputan shuttle/boat, dan tautan Google Maps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Nama Lokasi Villa">
              <Input
                {...register("venueName")}
                id={`${idPrefix}-venueName`}
                placeholder="Villa d'Amore Cliffside Estate"
              />
            </Field>

            <Field label="Wilayah & Kota Lokasi">
              <Input
                {...register("venueSubname")}
                id={`${idPrefix}-venueSubname`}
                placeholder="Ravello, Costiera Amalfitana, Italia"
              />
            </Field>
          </div>

          <Field label="Alamat Lengkap Venue">
            <Textarea
              {...register("venueAddress")}
              id={`${idPrefix}-venueAddress`}
              rows={2}
              placeholder="Via San Giovanni del Toro, 28, 84010 Ravello SA, Italy"
            />
          </Field>

          <Field label="Catatan Shuttle & Transportasi Tamu">
            <Input
              {...register("venueNotes")}
              id={`${idPrefix}-venueNotes`}
              placeholder="Disediakan shuttle van privat dan perahu boat dari dermaga..."
            />
          </Field>

          <Field label="URL Google Maps Lokasi">
            <Input
              {...register("mapsUrl")}
              id={`${idPrefix}-mapsUrl`}
              placeholder="https://maps.google.com/?q=Ravello+Amalfi+Coast"
            />
          </Field>
        </div>
      )}

      {/* TAB 5: Dress Code & Etiket */}
      {activeTab === "etiquette" && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-200">
            <p className="font-semibold mb-0.5">Panduan Busana Riviera Chic & Etiket Tamu</p>
            <p>
              Berikan inspirasi gaya berpakaian bernuansa pesisir Italia dan catatan kenyamanan bagi para tamu.
            </p>
          </div>

          <Field label="Tema Dress Code">
            <Input
              {...register("dressCodeTheme")}
              id={`${idPrefix}-dressCodeTheme`}
              placeholder="Amalfi Riviera Elegance • Formal Summer Chic"
            />
          </Field>

          <Field label="Deskripsi Panduan Busana">
            <Textarea
              {...register("dressCodeDesc")}
              id={`${idPrefix}-dressCodeDesc`}
              rows={3}
              placeholder="Pria disarankan mengenakan setelan linen..."
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Swatch Warna 1">
              <Input {...register("colorSwatch1")} placeholder="Limoncello Gold (#eab308)" />
            </Field>
            <Field label="Swatch Warna 2">
              <Input {...register("colorSwatch2")} placeholder="Mediterranean Azure (#0284c7)" />
            </Field>
            <Field label="Swatch Warna 3">
              <Input {...register("colorSwatch3")} placeholder="Olive Sage Green (#65a30d)" />
            </Field>
            <Field label="Swatch Warna 4">
              <Input {...register("colorSwatch4")} placeholder="Terracotta Linen (#c2410c)" />
            </Field>
          </div>

          <Field label="Catatan Tambahan untuk Kenyamanan Tamu">
            <Textarea
              {...register("guestEtiquetteNotes")}
              id={`${idPrefix}-guestEtiquetteNotes`}
              rows={2}
              placeholder="Karena sebagian prosesi berlangsung di atas teras batu marmer..."
            />
          </Field>
        </div>
      )}

      {/* TAB 6: RSVP & Tanda Kasih Digital */}
      {activeTab === "rsvp" && (
        <div className="space-y-6">
          <div className="p-3.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-xs text-sky-800 dark:text-sky-200">
            <p className="font-semibold mb-0.5">Konfirmasi RSVP & Rekening Tanda Kasih Digital</p>
            <p>
              Lengkapi nomor rekening bank yang dapat disalin instan oleh tamu serta batas waktu konfirmasi kehadiran.
            </p>
          </div>

          {/* Bank 1 */}
          <div className="p-4 rounded-xl border border-border/70 bg-card/60 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Rekening Bank 1
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Field label="Nama Bank">
                <Input {...register("bank1Name")} placeholder="BCA (Bank Central Asia)" />
              </Field>
              <Field label="Nomor Rekening">
                <Input {...register("bank1AccountNo")} placeholder="8820194821" />
              </Field>
              <Field label="Atas Nama">
                <Input {...register("bank1Holder")} placeholder="Alessandro Matteo Moretti" />
              </Field>
            </div>
          </div>

          {/* Bank 2 */}
          <div className="p-4 rounded-xl border border-border/70 bg-card/60 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
              Rekening Bank 2
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Field label="Nama Bank">
                <Input {...register("bank2Name")} placeholder="Bank Mandiri" />
              </Field>
              <Field label="Nomor Rekening">
                <Input {...register("bank2AccountNo")} placeholder="1370029481023" />
              </Field>
              <Field label="Atas Nama">
                <Input {...register("bank2Holder")} placeholder="Lucia Caterina De Luca" />
              </Field>
            </div>
          </div>

          <Field label="Pesan Pengantar Tanda Kasih (Wedding Gift)">
            <Textarea
              {...register("giftMessage")}
              id={`${idPrefix}-giftMessage`}
              rows={3}
              placeholder="Doa restu dan kehadiran Anda adalah hadiah terindah..."
            />
          </Field>

          <Field label="Batas Waktu Konfirmasi RSVP">
            <Input
              {...register("rsvpDeadline")}
              id={`${idPrefix}-rsvpDeadline`}
              placeholder="Mohon konfirmasi kehadiran sebelum 1 Oktober 2026"
            />
          </Field>

          {/* Palette presets */}
          <div className="space-y-2 pt-2 border-t border-border/50">
            <span className="text-xs font-semibold text-foreground">Preset Warna Tema Villa:</span>
            <div className="grid grid-cols-2 gap-2">
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

          {/* Color pickers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <ColorPickerField
              label="Limoncello Gold"
              value={primaryColor || "#eab308"}
              onChange={(val) => setValue("primaryColor", val)}
              presets={[
                { label: "Limoncello Gold", value: "#eab308" },
                { label: "Citrus Amber", value: "#f59e0b" },
                { label: "Champagne Leaf", value: "#d4af37" },
              ]}
            />
            <ColorPickerField
              label="Mediterranean Azure"
              value={secondaryColor || "#0284c7"}
              onChange={(val) => setValue("secondaryColor", val)}
              presets={[
                { label: "Mediterranean Azure", value: "#0284c7" },
                { label: "Tyrrhenian Sky", value: "#38bdf8" },
                { label: "Amalfi Cobalt", value: "#1d4ed8" },
              ]}
            />
            <ColorPickerField
              label="Tyrrhenian Deep Blue"
              value={accentColor || "#0f2b48"}
              onChange={(val) => setValue("accentColor", val)}
              presets={[
                { label: "Deep Tyrrhenian", value: "#0f2b48" },
                { label: "Midnight Coast", value: "#07172b" },
                { label: "Abyssal Villa", value: "#051120" },
              ]}
            />
          </div>

          <Field label="URL Musik Latar (Melodi Mandolin Italia)">
            <Input
              {...register("musicTrack")}
              id={`${idPrefix}-musicTrack`}
              placeholder="https://cdn.pixabay.com/..."
            />
          </Field>
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

export default AmalfiWeddingBuilderForm;
