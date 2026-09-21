"use client";

import { useState } from "react";
import type {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  FieldErrors,
} from "react-hook-form";
import {
  ShieldCheck,
  Stamp,
  FileText,
  MapPin,
  Plane,
  Music,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Field, Input, Textarea } from "@/components/ui/field";
import { ColorPickerField } from "@/components/ui/color-picker-field";
import { BACKGROUND_COLOR_PRESETS } from "@/templates/color-presets";
import { cn } from "@/lib/utils/cn";
import type { LetterFormValues } from "./dynamic-form";

interface BirthdayPassportBuilderFormProps {
  register: UseFormRegister<LetterFormValues>;
  setValue: UseFormSetValue<LetterFormValues>;
  watch: UseFormWatch<LetterFormValues>;
  errors: FieldErrors<LetterFormValues>;
  idPrefix?: string;
}

type TabType =
  | "passport_bio"
  | "visas"
  | "dispatch"
  | "postcards"
  | "boarding_pass"
  | "theme";

const PRESET_PHOTOS = [
  {
    name: "Potret Paspor 1",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Potret Paspor 2",
    url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Potret Paspor 3",
    url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Potret Paspor 4",
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=200&q=60",
  },
];

export function BirthdayPassportBuilderForm({
  register,
  setValue,
  watch,
  errors,
  idPrefix = "birthday-passport",
}: BirthdayPassportBuilderFormProps) {
  const [activeTab, setActiveTab] = useState<TabType>("passport_bio");

  const tabs: Array<{ id: TabType; label: string; icon: typeof ShieldCheck }> = [
    { id: "passport_bio", label: "Biodata Paspor", icon: ShieldCheck },
    { id: "visas", label: "Stempel Visa", icon: Stamp },
    { id: "dispatch", label: "Surat Warkat", icon: FileText },
    { id: "postcards", label: "Kartu Pos", icon: MapPin },
    { id: "boarding_pass", label: "Boarding Pass", icon: Plane },
    { id: "theme", label: "Warna & Musik", icon: Music },
  ];

  const currentTabIndex = tabs.findIndex((t) => t.id === activeTab);
  const currentBearerPhoto = watch("bearerPhotoUrl") as string;

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex overflow-x-auto no-scrollbar gap-1.5 p-1 bg-stone-100 rounded-xl border border-stone-200">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200",
                isActive
                  ? "bg-white text-stone-900 shadow-sm font-semibold ring-1 ring-stone-900/10"
                  : "text-stone-500 hover:text-stone-900 hover:bg-white/50"
              )}
            >
              <Icon
                className={cn(
                  "w-3.5 h-3.5",
                  isActive ? "text-blue-900" : "text-stone-400"
                )}
              />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: BIODATA PASPOR RESMI */}
      {activeTab === "passport_bio" && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-4 text-xs sm:text-sm text-blue-950">
            <p className="font-semibold mb-1">Identitas Resmi & Biometrik Paspor</p>
            <p className="text-blue-800/80 leading-relaxed">
              Atur nama pemilik paspor, nomor paspor, kebangsaan, tanggal lahir, dan foto resmi berstempel verifikasi.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Nama Lengkap Pemilik Paspor"
              error={errors.recipientName?.message}
              id={`${idPrefix}-recipientName`}
            >
              <Input
                id={`${idPrefix}-recipientName`}
                placeholder="Clarissa Valery Putri"
                {...register("recipientName", {
                  required: "Nama pemilik wajib diisi",
                })}
              />
            </Field>

            <Field
              label="Nomor Paspor Kehidupan"
              id={`${idPrefix}-passportNumber`}
            >
              <Input
                id={`${idPrefix}-passportNumber`}
                placeholder="EXP-2026-BDAY25"
                {...register("passportNumber")}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Tanggal Lahir & Usia Baru"
              error={errors.birthDate?.message}
              id={`${idPrefix}-birthDate`}
            >
              <Input
                id={`${idPrefix}-birthDate`}
                placeholder="24 Oktober 2001 (Babak Usia ke-25)"
                {...register("birthDate", {
                  required: "Tanggal lahir wajib diisi",
                })}
              />
            </Field>

            <Field
              label="Kebangsaan / Identitas Jiwa"
              id={`${idPrefix}-nationality`}
            >
              <Input
                id={`${idPrefix}-nationality`}
                placeholder="Citizen of the Universe // Heart of Gold"
                {...register("nationality")}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Tempat Kelahiran / Asal"
              id={`${idPrefix}-birthPlace`}
            >
              <Input
                id={`${idPrefix}-birthPlace`}
                placeholder="Jakarta, Indonesia // Terra Firm"
                {...register("birthPlace")}
              />
            </Field>

            <Field
              label="Otoritas Penerbit"
              id={`${idPrefix}-issuingAuthority`}
            >
              <Input
                id={`${idPrefix}-issuingAuthority`}
                placeholder="Ministry of Joy, Growth & Good Memories"
                {...register("issuingAuthority")}
              />
            </Field>
          </div>

          {/* Bearer Photo */}
          <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
            <p className="text-xs font-bold text-stone-800 uppercase tracking-wider">
              Foto Resmi Paspor
            </p>
            <Field label="URL Foto" id={`${idPrefix}-bearerPhotoUrl`}>
              <Input
                id={`${idPrefix}-bearerPhotoUrl`}
                placeholder="https://images.unsplash.com/..."
                {...register("bearerPhotoUrl")}
              />
            </Field>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              {PRESET_PHOTOS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() =>
                    setValue("bearerPhotoUrl", preset.url, { shouldDirty: true })
                  }
                  className={cn(
                    "p-2 rounded-lg border text-left text-xs transition-all flex flex-col items-center gap-1.5",
                    currentBearerPhoto === preset.url
                      ? "border-blue-700 bg-blue-50 font-semibold"
                      : "border-stone-200 hover:border-stone-300"
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={preset.thumb}
                    alt={preset.name}
                    className="w-full aspect-[3/4] object-cover rounded"
                  />
                  <span className="text-[10px] text-stone-700 truncate w-full text-center">
                    {preset.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <Field
            label="Motto Penjelajah / Semboyan Paspor"
            id={`${idPrefix}-passportTagline`}
            helperText="Pesan filosofis singkat yang dicetak pada halaman identitas paspor"
          >
            <Textarea
              id={`${idPrefix}-passportTagline`}
              rows={2}
              placeholder="Diberikan hak penuh untuk mengarungi samudera waktu..."
              {...register("passportTagline")}
            />
          </Field>
        </div>
      )}

      {/* TAB 2: STEMPEL VISA PERJALANAN HIDUP */}
      {activeTab === "visas" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-red-50/60 border border-red-200 rounded-xl p-4 text-xs sm:text-sm text-red-950">
            <p className="font-semibold mb-1">Empat Stempel Visa Perjalanan Hidup</p>
            <p className="text-red-800/80 leading-relaxed">
              Tentukan 4 stempel visa imigrasi yang mencerminkan fase-fase penting yang telah dilalui sang tokoh utama.
            </p>
          </div>

          <div className="space-y-4">
            {/* Visa 1 */}
            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-red-700 uppercase tracking-wider">
                Stempel Visa 1 (Masa Awal)
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Field label="Kode Imigrasi" id={`${idPrefix}-visa1Country`}>
                  <Input
                    id={`${idPrefix}-visa1Country`}
                    placeholder="EXP-01 // WONDERLAND"
                    {...register("visa1Country")}
                  />
                </Field>
                <Field label="Nama Visa" id={`${idPrefix}-visa1Title`}>
                  <Input
                    id={`${idPrefix}-visa1Title`}
                    placeholder="Visa of Innocence & Wonder"
                    {...register("visa1Title")}
                  />
                </Field>
                <Field label="Periode" id={`${idPrefix}-visa1Date`}>
                  <Input
                    id={`${idPrefix}-visa1Date`}
                    placeholder="ENTRY: MASA KECIL"
                    {...register("visa1Date")}
                  />
                </Field>
              </div>
              <Field label="Catatan Perjalanan" id={`${idPrefix}-visa1Desc`}>
                <Textarea
                  id={`${idPrefix}-visa1Desc`}
                  rows={2}
                  placeholder="Masa di mana imajinasi melangit tinggi..."
                  {...register("visa1Desc")}
                />
              </Field>
            </div>

            {/* Visa 2 */}
            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-blue-700 uppercase tracking-wider">
                Stempel Visa 2 (Eksplorasi)
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Field label="Kode Imigrasi" id={`${idPrefix}-visa2Country`}>
                  <Input
                    id={`${idPrefix}-visa2Country`}
                    placeholder="EXP-02 // ADVENTURE"
                    {...register("visa2Country")}
                  />
                </Field>
                <Field label="Nama Visa" id={`${idPrefix}-visa2Title`}>
                  <Input
                    id={`${idPrefix}-visa2Title`}
                    placeholder="Visa of Courage & Exploration"
                    {...register("visa2Title")}
                  />
                </Field>
                <Field label="Periode" id={`${idPrefix}-visa2Date`}>
                  <Input
                    id={`${idPrefix}-visa2Date`}
                    placeholder="ENTRY: MASA REMAJA"
                    {...register("visa2Date")}
                  />
                </Field>
              </div>
              <Field label="Catatan Perjalanan" id={`${idPrefix}-visa2Desc`}>
                <Textarea
                  id={`${idPrefix}-visa2Desc`}
                  rows={2}
                  placeholder="Keberanian keluar dari zona nyaman..."
                  {...register("visa2Desc")}
                />
              </Field>
            </div>

            {/* Visa 3 */}
            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                Stempel Visa 3 (Ketangguhan)
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Field label="Kode Imigrasi" id={`${idPrefix}-visa3Country`}>
                  <Input
                    id={`${idPrefix}-visa3Country`}
                    placeholder="EXP-03 // RESILIENCE"
                    {...register("visa3Country")}
                  />
                </Field>
                <Field label="Nama Visa" id={`${idPrefix}-visa3Title`}>
                  <Input
                    id={`${idPrefix}-visa3Title`}
                    placeholder="Visa of Resilience & Growth"
                    {...register("visa3Title")}
                  />
                </Field>
                <Field label="Periode" id={`${idPrefix}-visa3Date`}>
                  <Input
                    id={`${idPrefix}-visa3Date`}
                    placeholder="ENTRY: DEWASA AWAL"
                    {...register("visa3Date")}
                  />
                </Field>
              </div>
              <Field label="Catatan Perjalanan" id={`${idPrefix}-visa3Desc`}>
                <Textarea
                  id={`${idPrefix}-visa3Desc`}
                  rows={2}
                  placeholder="Mengarungi badai kehidupan dengan keteguhan hati..."
                  {...register("visa3Desc")}
                />
              </Field>
            </div>

            {/* Visa 4 */}
            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-purple-700 uppercase tracking-wider">
                Stempel Visa 4 (Babak Baru)
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Field label="Kode Imigrasi" id={`${idPrefix}-visa4Country`}>
                  <Input
                    id={`${idPrefix}-visa4Country`}
                    placeholder="EXP-04 // FUTURE VOYAGE"
                    {...register("visa4Country")}
                  />
                </Field>
                <Field label="Nama Visa" id={`${idPrefix}-visa4Title`}>
                  <Input
                    id={`${idPrefix}-visa4Title`}
                    placeholder="Visa of Wisdom & New Horizon"
                    {...register("visa4Title")}
                  />
                </Field>
                <Field label="Periode" id={`${idPrefix}-visa4Date`}>
                  <Input
                    id={`${idPrefix}-visa4Date`}
                    placeholder="ENTRY: BABAK BARU"
                    {...register("visa4Date")}
                  />
                </Field>
              </div>
              <Field label="Catatan Perjalanan" id={`${idPrefix}-visa4Desc`}>
                <Textarea
                  id={`${idPrefix}-visa4Desc`}
                  rows={2}
                  placeholder="Memasuki babak baru dengan kebijaksanaan..."
                  {...register("visa4Desc")}
                />
              </Field>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: SURAT DIPLOMATIK PENJELAJAH */}
      {activeTab === "dispatch" && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          <div className="bg-amber-50/60 border border-amber-200 rounded-xl p-4 text-xs sm:text-sm text-amber-950">
            <p className="font-semibold mb-1">Warkat Diplomatik (Surat Utama)</p>
            <p className="text-amber-800/80 leading-relaxed">
              Tuliskan surat panjang, mendalam, dan reflektif dari rekan seperjalanan hidup untuk sang penerima.
            </p>
          </div>

          <Field
            label="Judul Surat Warkat"
            error={errors.letterTitle?.message}
            id={`${idPrefix}-letterTitle`}
          >
            <Input
              id={`${idPrefix}-letterTitle`}
              placeholder="Warkat Diplomatik: Catatan Terindah Bagi Rekan Seperjalanan"
              {...register("letterTitle", {
                required: "Judul surat wajib diisi",
              })}
            />
          </Field>

          <Field
            label="Isi Surat Utama"
            error={errors.letterContent?.message}
            id={`${idPrefix}-letterContent`}
            helperText="Gunakan baris baru untuk memisahkan antar paragraf."
          >
            <Textarea
              id={`${idPrefix}-letterContent`}
              rows={8}
              placeholder="Kepada sang penjelajah luar biasa yang hari ini merayakan ulang tahunnya..."
              {...register("letterContent", {
                required: "Isi surat wajib diisi",
              })}
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Nama Pengirim"
              error={errors.senderName?.message}
              id={`${idPrefix}-senderName`}
            >
              <Input
                id={`${idPrefix}-senderName`}
                placeholder="Arya Bimasakti"
                {...register("senderName", {
                  required: "Nama pengirim wajib diisi",
                })}
              />
            </Field>

            <Field
              label="Peran / Hubungan Pengirim"
              id={`${idPrefix}-senderTitle`}
            >
              <Input
                id={`${idPrefix}-senderTitle`}
                placeholder="Chief of Expedition // Sahabat Seperjalanan Seumur Hidup"
                {...register("senderTitle")}
              />
            </Field>
          </div>
        </div>
      )}

      {/* TAB 4: 3 KARTU POS MEMORABILIA */}
      {activeTab === "postcards" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-stone-100 border border-stone-300 rounded-xl p-4 text-xs sm:text-sm text-stone-900">
            <p className="font-semibold mb-1">Galeri 3 Kartu Pos Memorabilia</p>
            <p className="text-stone-600 leading-relaxed">
              Sertakan 3 foto kartu pos kenangan perjalanan bersama dengan lokasi, stempel pos, dan catatan tangan.
            </p>
          </div>

          <div className="space-y-4">
            {/* Postcard 1 */}
            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                Kartu Pos 1
              </p>
              <Field label="URL Foto 1" id={`${idPrefix}-postcard1Photo`}>
                <Input
                  id={`${idPrefix}-postcard1Photo`}
                  placeholder="https://images.unsplash.com/..."
                  {...register("postcard1Photo")}
                />
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Lokasi / Momen" id={`${idPrefix}-postcard1Location`}>
                  <Input
                    id={`${idPrefix}-postcard1Location`}
                    placeholder="Kala Menatap Senja di Sudut Kota"
                    {...register("postcard1Location")}
                  />
                </Field>
                <Field label="Cap Pos / Tanggal" id={`${idPrefix}-postcard1Date`}>
                  <Input
                    id={`${idPrefix}-postcard1Date`}
                    placeholder="Postmark // 14 Juli 2024"
                    {...register("postcard1Date")}
                  />
                </Field>
              </div>
              <Field label="Catatan Tangan" id={`${idPrefix}-postcard1Note`}>
                <Textarea
                  id={`${idPrefix}-postcard1Note`}
                  rows={2}
                  placeholder="Secangkir kopi hangat, hembusan angin..."
                  {...register("postcard1Note")}
                />
              </Field>
            </div>

            {/* Postcard 2 */}
            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                Kartu Pos 2
              </p>
              <Field label="URL Foto 2" id={`${idPrefix}-postcard2Photo`}>
                <Input
                  id={`${idPrefix}-postcard2Photo`}
                  placeholder="https://images.unsplash.com/..."
                  {...register("postcard2Photo")}
                />
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Lokasi / Momen" id={`${idPrefix}-postcard2Location`}>
                  <Input
                    id={`${idPrefix}-postcard2Location`}
                    placeholder="Puncak Bukit Penuh Gelak Tawa"
                    {...register("postcard2Location")}
                  />
                </Field>
                <Field label="Cap Pos / Tanggal" id={`${idPrefix}-postcard2Date`}>
                  <Input
                    id={`${idPrefix}-postcard2Date`}
                    placeholder="Postmark // 28 Desember 2024"
                    {...register("postcard2Date")}
                  />
                </Field>
              </div>
              <Field label="Catatan Tangan" id={`${idPrefix}-postcard2Note`}>
                <Textarea
                  id={`${idPrefix}-postcard2Note`}
                  rows={2}
                  placeholder="Tawa renyahmu di tengah lelahnya..."
                  {...register("postcard2Note")}
                />
              </Field>
            </div>

            {/* Postcard 3 */}
            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                Kartu Pos 3
              </p>
              <Field label="URL Foto 3" id={`${idPrefix}-postcard3Photo`}>
                <Input
                  id={`${idPrefix}-postcard3Photo`}
                  placeholder="https://images.unsplash.com/..."
                  {...register("postcard3Photo")}
                />
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Lokasi / Momen" id={`${idPrefix}-postcard3Location`}>
                  <Input
                    id={`${idPrefix}-postcard3Location`}
                    placeholder="Malam Perayaan Penuh Kenangan"
                    {...register("postcard3Location")}
                  />
                </Field>
                <Field label="Cap Pos / Tanggal" id={`${idPrefix}-postcard3Date`}>
                  <Input
                    id={`${idPrefix}-postcard3Date`}
                    placeholder="Postmark // 05 Mei 2025"
                    {...register("postcard3Date")}
                  />
                </Field>
              </div>
              <Field label="Catatan Tangan" id={`${idPrefix}-postcard3Note`}>
                <Textarea
                  id={`${idPrefix}-postcard3Note`}
                  rows={2}
                  placeholder="Momen ketika kita tersadar..."
                  {...register("postcard3Note")}
                />
              </Field>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: BOARDING PASS & 4 DOA DESTINASI */}
      {activeTab === "boarding_pass" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-4 text-xs sm:text-sm text-blue-950">
            <p className="font-semibold mb-1">Tiket Boarding Pass & Doa Penerbangan</p>
            <p className="text-blue-800/80 leading-relaxed">
              Atur detail penerbangan babak usia baru serta 4 pilar doa destinasi untuk sang tokoh utama.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Nomor Penerbangan" id={`${idPrefix}-flightNumber`}>
              <Input
                id={`${idPrefix}-flightNumber`}
                placeholder="AERO-BDAY25"
                {...register("flightNumber")}
              />
            </Field>
            <Field label="Nomor Kursi VIP" id={`${idPrefix}-seatNumber`}>
              <Input
                id={`${idPrefix}-seatNumber`}
                placeholder="01A FIRST CLASS"
                {...register("seatNumber")}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Titik Asal (Babak Lalu)"
              id={`${idPrefix}-departureChapter`}
            >
              <Input
                id={`${idPrefix}-departureChapter`}
                placeholder="CHAPTER 24 (PASSED WITH GLORY)"
                {...register("departureChapter")}
              />
            </Field>
            <Field
              label="Destinasi Tujuan (Babak Baru)"
              id={`${idPrefix}-arrivalChapter`}
            >
              <Input
                id={`${idPrefix}-arrivalChapter`}
                placeholder="CHAPTER 25 (LIMITLESS JOY)"
                {...register("arrivalChapter")}
              />
            </Field>
          </div>

          {/* 4 Destination Blessings */}
          <div className="space-y-4 pt-2">
            <p className="text-xs font-bold text-stone-800 uppercase tracking-wider">
              4 Pilar Doa Destinasi
            </p>

            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-amber-700 uppercase">Doa 1</p>
              <Field label="Judul Doa 1" id={`${idPrefix}-wish1Title`}>
                <Input
                  id={`${idPrefix}-wish1Title`}
                  placeholder="Clear Skies: Ketenangan Jiwa"
                  {...register("wish1Title")}
                />
              </Field>
              <Field label="Pesan Doa 1" id={`${idPrefix}-wish1Desc`}>
                <Textarea
                  id={`${idPrefix}-wish1Desc`}
                  rows={2}
                  placeholder="Semoga langit batinmu selalu dinaungi..."
                  {...register("wish1Desc")}
                />
              </Field>
            </div>

            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-amber-700 uppercase">Doa 2</p>
              <Field label="Judul Doa 2" id={`${idPrefix}-wish2Title`}>
                <Input
                  id={`${idPrefix}-wish2Title`}
                  placeholder="Smooth Flight: Ketangguhan Batin"
                  {...register("wish2Title")}
                />
              </Field>
              <Field label="Pesan Doa 2" id={`${idPrefix}-wish2Desc`}>
                <Textarea
                  id={`${idPrefix}-wish2Desc`}
                  rows={2}
                  placeholder="Setiap riak tantangan di masa depan..."
                  {...register("wish2Desc")}
                />
              </Field>
            </div>

            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-amber-700 uppercase">Doa 3</p>
              <Field label="Judul Doa 3" id={`${idPrefix}-wish3Title`}>
                <Input
                  id={`${idPrefix}-wish3Title`}
                  placeholder="First-Class Fortune: Kelimpahan Berkah"
                  {...register("wish3Title")}
                />
              </Field>
              <Field label="Pesan Doa 3" id={`${idPrefix}-wish3Desc`}>
                <Textarea
                  id={`${idPrefix}-wish3Desc`}
                  rows={2}
                  placeholder="Pintu-pintu rezeki, karier, dan karya..."
                  {...register("wish3Desc")}
                />
              </Field>
            </div>

            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-amber-700 uppercase">Doa 4</p>
              <Field label="Judul Doa 4" id={`${idPrefix}-wish4Title`}>
                <Input
                  id={`${idPrefix}-wish4Title`}
                  placeholder="Golden Haven: Kasih yang Tulus"
                  {...register("wish4Title")}
                />
              </Field>
              <Field label="Pesan Doa 4" id={`${idPrefix}-wish4Desc`}>
                <Textarea
                  id={`${idPrefix}-wish4Desc`}
                  rows={2}
                  placeholder="Selalu dipertemukan dengan orang-orang tulus..."
                  {...register("wish4Desc")}
                />
              </Field>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: TEMA WARNA & MUSIK TRAVEL */}
      {activeTab === "theme" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-stone-100 border border-stone-300 rounded-xl p-4 text-xs sm:text-sm text-stone-900">
            <p className="font-semibold mb-1">Palet Warna Paspor & Audio Lounge</p>
            <p className="text-stone-600 leading-relaxed">
              Sesuaikan warna kulit paspor, aksen emas, serta musik bossa nova/jazz akustik pengiring perjalanan.
            </p>
          </div>

          <div className="p-4 border border-stone-200 rounded-xl space-y-4 bg-white">
            <p className="text-xs font-bold text-stone-800 uppercase tracking-wider">
              Audio Lounge Penerbangan
            </p>
            <Field label="Judul Musik" id={`${idPrefix}-musicTitle`}>
              <Input
                id={`${idPrefix}-musicTitle`}
                placeholder="In-Flight Bossa & Acoustic Voyage"
                {...register("musicTitle")}
              />
            </Field>
            <Field label="URL File Audio (MP3)" id={`${idPrefix}-musicUrl`}>
              <Input
                id={`${idPrefix}-musicUrl`}
                placeholder="https://..."
                {...register("musicUrl")}
              />
            </Field>
          </div>

          <div className="p-4 border border-stone-200 rounded-xl space-y-4 bg-white">
            <p className="text-xs font-bold text-stone-800 uppercase tracking-wider">
              Palet Warna Dokumen
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ColorPickerField
                label="Warna Sampul Kulit Paspor"
                value={(watch("primaryColor") as string) || "#0f1e36"}
                onChange={(color) =>
                  setValue("primaryColor", color, { shouldDirty: true })
                }
              />
              <ColorPickerField
                label="Warna Emboss Emas"
                value={(watch("accentColor") as string) || "#d4af37"}
                onChange={(color) =>
                  setValue("accentColor", color, { shouldDirty: true })
                }
              />
              <ColorPickerField
                label="Warna Latar Meja"
                value={(watch("backgroundColor") as string) || "#f1ede4"}
                onChange={(color) =>
                  setValue("backgroundColor", color, { shouldDirty: true })
                }
                presets={BACKGROUND_COLOR_PRESETS}
              />
              <ColorPickerField
                label="Warna Kertas Paspor"
                value={(watch("paperColor") as string) || "#faf8f2"}
                onChange={(color) =>
                  setValue("paperColor", color, { shouldDirty: true })
                }
              />
            </div>
          </div>
        </div>
      )}

      {/* Bottom Step Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-stone-200">
        <button
          type="button"
          disabled={currentTabIndex === 0}
          onClick={() => setActiveTab(tabs[currentTabIndex - 1].id)}
          className={cn(
            "inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-colors",
            currentTabIndex === 0
              ? "text-stone-300 cursor-not-allowed"
              : "text-stone-700 hover:bg-stone-100"
          )}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Sebelumnya</span>
        </button>

        <span className="text-xs text-stone-400 font-mono">
          Bagian {currentTabIndex + 1} dari {tabs.length}
        </span>

        <button
          type="button"
          disabled={currentTabIndex === tabs.length - 1}
          onClick={() => setActiveTab(tabs[currentTabIndex + 1].id)}
          className={cn(
            "inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-colors",
            currentTabIndex === tabs.length - 1
              ? "text-stone-300 cursor-not-allowed"
              : "bg-stone-900 text-white hover:bg-stone-800 shadow-sm"
          )}
        >
          <span>Lanjutkan</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
