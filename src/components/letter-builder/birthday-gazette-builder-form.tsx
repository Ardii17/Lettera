"use client";

import { useState } from "react";
import type {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  FieldErrors,
} from "react-hook-form";
import {
  Newspaper,
  BookOpen,
  BarChart3,
  ImageIcon,
  Sparkles,
  Ticket,
  ChevronRight,
  ChevronLeft,
  Music,
} from "lucide-react";
import { Field, Input, Textarea } from "@/components/ui/field";
import { ColorPickerField } from "@/components/ui/color-picker-field";
import { BACKGROUND_COLOR_PRESETS } from "@/templates/color-presets";
import { cn } from "@/lib/utils/cn";
import type { LetterFormValues } from "./dynamic-form";

interface BirthdayGazetteBuilderFormProps {
  register: UseFormRegister<LetterFormValues>;
  setValue: UseFormSetValue<LetterFormValues>;
  watch: UseFormWatch<LetterFormValues>;
  errors: FieldErrors<LetterFormValues>;
  idPrefix?: string;
}

type TabType = "masthead" | "editorial" | "metrics" | "photos" | "horoscope" | "classifieds" | "theme";

const PRESET_PHOTOS = [
  {
    name: "Potret Vintage 1: Senyuman Hangat",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Potret Vintage 2: Momen Ceria",
    url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Potret Vintage 3: Malam Kota Gemerlap",
    url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Potret Vintage 4: Sahabat & Bahagia",
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=200&q=60",
  },
];

export function BirthdayGazetteBuilderForm({
  register,
  setValue,
  watch,
  errors,
  idPrefix = "birthday-gazette",
}: BirthdayGazetteBuilderFormProps) {
  const [activeTab, setActiveTab] = useState<TabType>("masthead");

  const tabs: Array<{ id: TabType; label: string; icon: typeof Newspaper }> = [
    { id: "masthead", label: "Masthead & Headline", icon: Newspaper },
    { id: "editorial", label: "Surat Redaksi", icon: BookOpen },
    { id: "metrics", label: "Metrik Usia", icon: BarChart3 },
    { id: "photos", label: "Galeri Pers", icon: ImageIcon },
    { id: "horoscope", label: "Horoskop & Doa", icon: Sparkles },
    { id: "classifieds", label: "Kupon Kado", icon: Ticket },
    { id: "theme", label: "Warna & Musik", icon: Music },
  ];

  const currentTabIndex = tabs.findIndex((t) => t.id === activeTab);
  const currentPhoto1 = watch("photo1Url") as string;

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex overflow-x-auto no-scrollbar gap-1.5 p-1 bg-stone-100/80 rounded-xl border border-stone-200">
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
                  : "text-stone-500 hover:text-stone-900 hover:bg-white/50",
              )}
            >
              <Icon className={cn("w-3.5 h-3.5", isActive ? "text-red-700" : "text-stone-400")} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: MASTHEAD & HEADLINE */}
      {activeTab === "masthead" && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          <div className="bg-stone-100 border border-stone-300 rounded-xl p-4 text-xs sm:text-sm text-stone-900">
            <p className="font-semibold mb-1">Masthead & Headline Koran Ulang Tahun</p>
            <p className="text-stone-600 leading-relaxed">
              Atur nama tokoh utama yang berulang tahun, usia baru, tanggal cetak edisi, prakiraan cuaca, serta headline berita utama.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Nama Tokoh Utama (Yang Berulang Tahun)"
              error={errors.recipientName?.message}
              id={`${idPrefix}-recipientName`}
            >
              <Input
                id={`${idPrefix}-recipientName`}
                placeholder="Clarissa Aurelia"
                {...register("recipientName", { required: "Nama penerima wajib diisi" })}
              />
            </Field>

            <Field
              label="Angka Usia Baru"
              error={errors.ageNumber?.message}
              id={`${idPrefix}-ageNumber`}
            >
              <Input
                id={`${idPrefix}-ageNumber`}
                placeholder="24"
                {...register("ageNumber", { required: "Usia wajib diisi" })}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Tanggal Cetak Edisi (Hari Ulang Tahun)"
              error={errors.publishDate?.message}
              id={`${idPrefix}-publishDate`}
            >
              <Input
                id={`${idPrefix}-publishDate`}
                placeholder="Minggu, 25 Oktober 2026"
                {...register("publishDate", { required: "Tanggal terbit wajib diisi" })}
              />
            </Field>

            <Field
              label="Nomor Volume / Edisi Koran"
              error={errors.issueVolume?.message}
              id={`${idPrefix}-issueVolume`}
            >
              <Input
                id={`${idPrefix}-issueVolume`}
                placeholder="VOL. XXIV // NO. 10"
                {...register("issueVolume")}
              />
            </Field>
          </div>

          <Field
            label="Prakiraan Cuaca Hari Ulang Tahun"
            error={errors.weatherForecast?.message}
            id={`${idPrefix}-weatherForecast`}
          >
            <Input
              id={`${idPrefix}-weatherForecast`}
              placeholder="100% Cerah, Bertabur Senyuman & Harapan Baru"
              {...register("weatherForecast")}
            />
          </Field>

          <Field
            label="Headline Berita Utama"
            error={errors.gazetteHeadline?.message}
            id={`${idPrefix}-gazetteHeadline`}
          >
            <Input
              id={`${idPrefix}-gazetteHeadline`}
              placeholder="BREAKING NEWS: Bintang Paling Bersinar Resmi Menginjak Babak Usia ke-24!"
              {...register("gazetteHeadline", { required: "Headline wajib diisi" })}
            />
          </Field>

          <Field
            label="Subjudul Berita Utama"
            error={errors.newspaperSubhead?.message}
            id={`${idPrefix}-newspaperSubhead`}
          >
            <Input
              id={`${idPrefix}-newspaperSubhead`}
              placeholder="Dunia merayakan hari kelahiran sosok luar biasa..."
              {...register("newspaperSubhead")}
            />
          </Field>
        </div>
      )}

      {/* TAB 2: SURAT REDAKSI (EDITORIAL LETTER) */}
      {activeTab === "editorial" && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          <div className="bg-stone-100 border border-stone-300 rounded-xl p-4 text-xs sm:text-sm text-stone-900">
            <p className="font-semibold mb-1">Tajuk Rencana Redaksi (Surat Utama)</p>
            <p className="text-stone-600 leading-relaxed">
              Tuliskan surat apresiasi dan ucapan ulang tahun mendalam bergaya editorial surat kabar dari pengirim untuk penerima.
            </p>
          </div>

          <Field
            label="Judul Surat Editorial"
            error={errors.editorialTitle?.message}
            id={`${idPrefix}-editorialTitle`}
          >
            <Input
              id={`${idPrefix}-editorialTitle`}
              placeholder="Catatan Redaksi: Sebuah Perjalanan Penuh Makna, Tawa, dan Cinta"
              {...register("editorialTitle", { required: "Judul editorial wajib diisi" })}
            />
          </Field>

          <Field
            label="Isi Surat Utama (Editorial Panjang)"
            error={errors.editorialLetter?.message}
            id={`${idPrefix}-editorialLetter`}
          >
            <Textarea
              id={`${idPrefix}-editorialLetter`}
              rows={7}
              placeholder="Hari ini, edisi khusus The Birthday Gazette kami terbitkan..."
              {...register("editorialLetter", { required: "Isi surat wajib diisi" })}
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Nama Pengirim / Pemimpin Redaksi"
              error={errors.senderName?.message}
              id={`${idPrefix}-senderName`}
            >
              <Input
                id={`${idPrefix}-senderName`}
                placeholder="Dimas Arya"
                {...register("senderName", { required: "Nama pengirim wajib diisi" })}
              />
            </Field>

            <Field
              label="Jabatan Pengirim di Redaksi"
              error={errors.senderTitle?.message}
              id={`${idPrefix}-senderTitle`}
            >
              <Input
                id={`${idPrefix}-senderTitle`}
                placeholder="Sahabat Sejati // Pemimpin Redaksi Seumur Hidup"
                {...register("senderTitle")}
              />
            </Field>
          </div>
        </div>
      )}

      {/* TAB 3: METRIK USIA (LIFE CHRONICLE METRICS) */}
      {activeTab === "metrics" && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          <div className="bg-stone-100 border border-stone-300 rounded-xl p-4 text-xs sm:text-sm text-stone-900">
            <p className="font-semibold mb-1">Kilas Statistik Perjalanan Hidup</p>
            <p className="text-stone-600 leading-relaxed">
              Atur angka dan label statistik kehidupan yang unik dan berkesan bagi yang berulang tahun.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold uppercase tracking-wider text-stone-800">Metrik 1</p>
              <Field label="Nilai Metrik" id={`${idPrefix}-metric1Value`}><Input id={`${idPrefix}-metric1Value`} placeholder="8.766" {...register("metric1Value")} /></Field>
              <Field label="Label Metrik" id={`${idPrefix}-metric1Label`}><Input id={`${idPrefix}-metric1Label`} placeholder="Hari Menerangi Dunia" {...register("metric1Label")} /></Field>
            </div>

            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold uppercase tracking-wider text-stone-800">Metrik 2</p>
              <Field label="Nilai Metrik" id={`${idPrefix}-metric2Value`}><Input id={`${idPrefix}-metric2Value`} placeholder="1.400+" {...register("metric2Value")} /></Field>
              <Field label="Label Metrik" id={`${idPrefix}-metric2Label`}><Input id={`${idPrefix}-metric2Label`} placeholder="Secangkir Kopi & Tawa Bersama" {...register("metric2Label")} /></Field>
            </div>

            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold uppercase tracking-wider text-stone-800">Metrik 3</p>
              <Field label="Nilai Metrik" id={`${idPrefix}-metric3Value`}><Input id={`${idPrefix}-metric3Value`} placeholder="100%" {...register("metric3Value")} /></Field>
              <Field label="Label Metrik" id={`${idPrefix}-metric3Label`}><Input id={`${idPrefix}-metric3Label`} placeholder="Kebaikan Hati Tanpa Pamrih" {...register("metric3Label")} /></Field>
            </div>

            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold uppercase tracking-wider text-stone-800">Metrik 4</p>
              <Field label="Nilai Metrik" id={`${idPrefix}-metric4Value`}><Input id={`${idPrefix}-metric4Value`} placeholder="Tak Terhingga" {...register("metric4Value")} /></Field>
              <Field label="Label Metrik" id={`${idPrefix}-metric4Label`}><Input id={`${idPrefix}-metric4Label`} placeholder="Momen Indah Menanti di Masa Depan" {...register("metric4Label")} /></Field>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: GALERI PERS (3 FOTO) */}
      {activeTab === "photos" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-stone-100 border border-stone-300 rounded-xl p-4 text-xs sm:text-sm text-stone-900">
            <p className="font-semibold mb-1">Galeri Foto Liputan Pers (3 Foto Berita)</p>
            <p className="text-stone-600 leading-relaxed">
              Pilih foto preset vintage atau masukkan URL foto pribadi beserta tag dan caption bergaya jurnalistik koran.
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium text-stone-700">Pilihan Cepat Foto Bertema Vintage:</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {PRESET_PHOTOS.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setValue("photo1Url", p.url, { shouldDirty: true })}
                  className={cn(
                    "group relative aspect-[4/3] rounded-lg overflow-hidden border-2 text-left transition-all",
                    currentPhoto1 === p.url ? "border-red-700 ring-2 ring-red-500/30" : "border-stone-200 hover:border-stone-400",
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.thumb} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform grayscale" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-1.5 flex items-end">
                    <span className="text-[10px] text-white font-medium line-clamp-1">{p.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Foto 1 */}
          <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
            <p className="text-xs font-bold text-stone-900 uppercase tracking-wider">Foto Pers 1 (Foto Berita Utama)</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <Field label="URL Foto 1" id={`${idPrefix}-photo1Url`}>
                  <Input id={`${idPrefix}-photo1Url`} placeholder="https://..." {...register("photo1Url")} />
                </Field>
              </div>
              <Field label="Tag Berita 1" id={`${idPrefix}-photo1Tag`}>
                <Input id={`${idPrefix}-photo1Tag`} placeholder="LIPUTAN UTAMA" {...register("photo1Tag")} />
              </Field>
            </div>
            <Field label="Caption Berita Foto 1" id={`${idPrefix}-photo1Caption`}>
              <Input id={`${idPrefix}-photo1Caption`} placeholder="Potret sang tokoh utama..." {...register("photo1Caption")} />
            </Field>
          </div>

          {/* Foto 2 */}
          <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
            <p className="text-xs font-bold text-stone-900 uppercase tracking-wider">Foto Pers 2</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <Field label="URL Foto 2" id={`${idPrefix}-photo2Url`}>
                  <Input id={`${idPrefix}-photo2Url`} placeholder="https://..." {...register("photo2Url")} />
                </Field>
              </div>
              <Field label="Tag Berita 2" id={`${idPrefix}-photo2Tag`}>
                <Input id={`${idPrefix}-photo2Tag`} placeholder="MOMEN SPONTAN" {...register("photo2Tag")} />
              </Field>
            </div>
            <Field label="Caption Berita Foto 2" id={`${idPrefix}-photo2Caption`}>
              <Input id={`${idPrefix}-photo2Caption`} placeholder="Momen keceriaan spontan..." {...register("photo2Caption")} />
            </Field>
          </div>

          {/* Foto 3 */}
          <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
            <p className="text-xs font-bold text-stone-900 uppercase tracking-wider">Foto Pers 3</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <Field label="URL Foto 3" id={`${idPrefix}-photo3Url`}>
                  <Input id={`${idPrefix}-photo3Url`} placeholder="https://..." {...register("photo3Url")} />
                </Field>
              </div>
              <Field label="Tag Berita 3" id={`${idPrefix}-photo3Tag`}>
                <Input id={`${idPrefix}-photo3Tag`} placeholder="SOROT LENSA" {...register("photo3Tag")} />
              </Field>
            </div>
            <Field label="Caption Berita Foto 3" id={`${idPrefix}-photo3Caption`}>
              <Input id={`${idPrefix}-photo3Caption`} placeholder="Tawa lepas yang membuktikan..." {...register("photo3Caption")} />
            </Field>
          </div>
        </div>
      )}

      {/* TAB 5: HOROSKOP & KARTU DOA */}
      {activeTab === "horoscope" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-stone-100 border border-stone-300 rounded-xl p-4 text-xs sm:text-sm text-stone-900">
            <p className="font-semibold mb-1">Horoskop & 4 Kartu Doa Pilihan</p>
            <p className="text-stone-600 leading-relaxed">
              Atur ramalan bintang positif serta 4 pesan doa terbaik untuk menyambut babak usia baru.
            </p>
          </div>

          <Field label="Judul Ramalan Horoskop" id={`${idPrefix}-horoscopeTitle`}>
            <Input id={`${idPrefix}-horoscopeTitle`} placeholder="Horoskop & Ramalan Babak Usia Baru" {...register("horoscopeTitle")} />
          </Field>

          <Field label="Teks Ramalan Bintang" id={`${idPrefix}-horoscopeText`}>
            <Textarea id={`${idPrefix}-horoscopeText`} rows={3} placeholder="Bintang-bintang meramalkan tahun yang penuh kelimpahan..." {...register("horoscopeText")} />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-red-700 uppercase tracking-wider">Doa 1: Karier & Karya</p>
              <Field label="Judul Doa 1" id={`${idPrefix}-wish1Title`}><Input id={`${idPrefix}-wish1Title`} placeholder="Karier & Karya Cemerlang" {...register("wish1Title")} /></Field>
              <Field label="Pesan Doa 1" id={`${idPrefix}-wish1Desc`}><Input id={`${idPrefix}-wish1Desc`} placeholder="Semoga karya besarmu..." {...register("wish1Desc")} /></Field>
            </div>

            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-red-700 uppercase tracking-wider">Doa 2: Raga & Jiwa</p>
              <Field label="Judul Doa 2" id={`${idPrefix}-wish2Title`}><Input id={`${idPrefix}-wish2Title`} placeholder="Raga Bugar & Hati Tentram" {...register("wish2Title")} /></Field>
              <Field label="Pesan Doa 2" id={`${idPrefix}-wish2Desc`}><Input id={`${idPrefix}-wish2Desc`} placeholder="Diberkahi kesehatan raga..." {...register("wish2Desc")} /></Field>
            </div>

            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-red-700 uppercase tracking-wider">Doa 3: Kasih Sejati</p>
              <Field label="Judul Doa 3" id={`${idPrefix}-wish3Title`}><Input id={`${idPrefix}-wish3Title`} placeholder="Dikelilingi Kasih Sejati" {...register("wish3Title")} /></Field>
              <Field label="Pesan Doa 3" id={`${idPrefix}-wish3Desc`}><Input id={`${idPrefix}-wish3Desc`} placeholder="Selalu didukung sahabat..." {...register("wish3Desc")} /></Field>
            </div>

            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-red-700 uppercase tracking-wider">Doa 4: Petualangan</p>
              <Field label="Judul Doa 4" id={`${idPrefix}-wish4Title`}><Input id={`${idPrefix}-wish4Title`} placeholder="Eksplorasi Tanpa Batas" {...register("wish4Title")} /></Field>
              <Field label="Pesan Doa 4" id={`${idPrefix}-wish4Desc`}><Input id={`${idPrefix}-wish4Desc`} placeholder="Membawamu ke tempat impian..." {...register("wish4Desc")} /></Field>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: IKLAN BARIS & KUPON KADO */}
      {activeTab === "classifieds" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-stone-100 border border-stone-300 rounded-xl p-4 text-xs sm:text-sm text-stone-900">
            <p className="font-semibold mb-1">Iklan Baris: 4 Kupon Kado Ulang Tahun</p>
            <p className="text-stone-600 leading-relaxed">
              Atur 4 kupon hadiah unik yang dapat diklaim dan ditukarkan oleh yang berulang tahun kapan saja!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-stone-800 uppercase tracking-wider">Kupon 1</p>
              <Field label="Judul Kupon 1" id={`${idPrefix}-voucher1Title`}><Input id={`${idPrefix}-voucher1Title`} placeholder="Kupon Traktir Makan Malam" {...register("voucher1Title")} /></Field>
              <Field label="Deskripsi Kupon 1" id={`${idPrefix}-voucher1Desc`}><Textarea id={`${idPrefix}-voucher1Desc`} rows={2} placeholder="Berlaku kapan saja..." {...register("voucher1Desc")} /></Field>
            </div>

            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-stone-800 uppercase tracking-wider">Kupon 2</p>
              <Field label="Judul Kupon 2" id={`${idPrefix}-voucher2Title`}><Input id={`${idPrefix}-voucher2Title`} placeholder="Kupon Bebas Curhat 24/7" {...register("voucher2Title")} /></Field>
              <Field label="Deskripsi Kupon 2" id={`${idPrefix}-voucher2Desc`}><Textarea id={`${idPrefix}-voucher2Desc`} rows={2} placeholder="Bebas telepon kapan saja..." {...register("voucher2Desc")} /></Field>
            </div>

            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-stone-800 uppercase tracking-wider">Kupon 3</p>
              <Field label="Judul Kupon 3" id={`${idPrefix}-voucher3Title`}><Input id={`${idPrefix}-voucher3Title`} placeholder="Kupon Jalan-Jalan Sore" {...register("voucher3Title")} /></Field>
              <Field label="Deskripsi Kupon 3" id={`${idPrefix}-voucher3Desc`}><Textarea id={`${idPrefix}-voucher3Desc`} rows={2} placeholder="Jalan santai sore..." {...register("voucher3Desc")} /></Field>
            </div>

            <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
              <p className="text-xs font-bold text-stone-800 uppercase tracking-wider">Kupon 4</p>
              <Field label="Judul Kupon 4" id={`${idPrefix}-voucher4Title`}><Input id={`${idPrefix}-voucher4Title`} placeholder="Kupon Hadiah Kejutan" {...register("voucher4Title")} /></Field>
              <Field label="Deskripsi Kupon 4" id={`${idPrefix}-voucher4Desc`}><Textarea id={`${idPrefix}-voucher4Desc`} rows={2} placeholder="Satu barang impian..." {...register("voucher4Desc")} /></Field>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: TEMA WARNA & MUSIK */}
      {activeTab === "theme" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-stone-100 border border-stone-300 rounded-xl p-4 text-xs sm:text-sm text-stone-900">
            <p className="font-semibold mb-1">Palet Warna Koran & Audio Perayaan</p>
            <p className="text-stone-600 leading-relaxed">
              Sesuaikan warna aksen headline serta lagu jazz/akustik pengiring perayaan.
            </p>
          </div>

          <div className="p-4 border border-stone-200 rounded-xl space-y-4 bg-white">
            <p className="text-xs font-bold text-stone-800 uppercase tracking-wider">Audio Piringan Hitam Koran</p>
            <Field label="Judul Musik" id={`${idPrefix}-musicTitle`}><Input id={`${idPrefix}-musicTitle`} placeholder="Vintage Jazz Cafe & Birthday Melody" {...register("musicTitle")} /></Field>
            <Field label="URL File Audio (MP3)" id={`${idPrefix}-musicUrl`}><Input id={`${idPrefix}-musicUrl`} placeholder="https://..." {...register("musicUrl")} /></Field>
          </div>

          <div className="p-4 border border-stone-200 rounded-xl space-y-4 bg-white">
            <p className="text-xs font-bold text-stone-800 uppercase tracking-wider">Palet Warna Koran</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ColorPickerField
                label="Warna Aksen Redline / Headline"
                value={(watch("primaryColor") as string) || "#dc2626"}
                onChange={(color) => setValue("primaryColor", color, { shouldDirty: true })}
              />
              <ColorPickerField
                label="Warna Kertas Koran"
                value={(watch("backgroundColor") as string) || "#f4efe6"}
                onChange={(color) => setValue("backgroundColor", color, { shouldDirty: true })}
                presets={BACKGROUND_COLOR_PRESETS}
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
              : "text-stone-700 hover:bg-stone-100",
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
              : "bg-stone-900 text-white hover:bg-stone-800 shadow-sm",
          )}
        >
          <span>Lanjutkan</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
