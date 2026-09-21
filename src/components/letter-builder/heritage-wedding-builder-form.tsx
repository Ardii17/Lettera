"use client";

import { useState } from "react";
import type {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  FieldErrors,
} from "react-hook-form";
import {
  Clock,
  Scroll,
  ImageIcon,
  Sparkles,
  HeartHandshake,
  ChevronRight,
  ChevronLeft,
  Users,
  MapPin,
} from "lucide-react";
import { Field, Input, Textarea } from "@/components/ui/field";
import { ColorPickerField } from "@/components/ui/color-picker-field";
import { BACKGROUND_COLOR_PRESETS } from "@/templates/color-presets";
import { cn } from "@/lib/utils/cn";
import type { LetterFormValues } from "./dynamic-form";

interface HeritageWeddingBuilderFormProps {
  register: UseFormRegister<LetterFormValues>;
  setValue: UseFormSetValue<LetterFormValues>;
  watch: UseFormWatch<LetterFormValues>;
  errors: FieldErrors<LetterFormValues>;
  idPrefix?: string;
}

type TabType = "cover" | "blessing" | "couple" | "itinerary" | "gallery" | "venue" | "gift";

const PRESET_PHOTOS = [
  {
    name: "Adat Jawa 1: Kebaya & Beskap Keraton",
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Adat Jawa 2: Sorot Lampu Pendopo",
    url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Adat Jawa 3: Senyum Bahagia Pengantin",
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Adat Jawa 4: Romansa Klasik",
    url: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=200&q=60",
  },
];

export function HeritageWeddingBuilderForm({
  register,
  setValue,
  watch,
  errors,
  idPrefix = "heritage-wedding",
}: HeritageWeddingBuilderFormProps) {
  const [activeTab, setActiveTab] = useState<TabType>("cover");

  const tabs: Array<{ id: TabType; label: string; icon: typeof Scroll }> = [
    { id: "cover", label: "Gapura & Uleman", icon: Scroll },
    { id: "blessing", label: "Serat Suci & Doa", icon: Sparkles },
    { id: "couple", label: "Mempelai Pinanganten", icon: Users },
    { id: "itinerary", label: "Tata Lampah Adat", icon: Clock },
    { id: "gallery", label: "Pasinaon Tresna", icon: ImageIcon },
    { id: "venue", label: "Sasana & Busana", icon: MapPin },
    { id: "gift", label: "Tandha Tresna & Gending", icon: HeartHandshake },
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
                  ? "bg-white text-amber-950 shadow-sm font-semibold ring-1 ring-amber-500/20"
                  : "text-stone-500 hover:text-stone-900 hover:bg-white/50",
              )}
            >
              <Icon className={cn("w-3.5 h-3.5", isActive ? "text-amber-600" : "text-stone-400")} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: GAPURA & ULEMAN */}
      {activeTab === "cover" && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs sm:text-sm text-amber-950">
            <p className="font-semibold mb-1">Gapura Gunungan Wayang & Uleman Tamu</p>
            <p className="text-amber-800/80 leading-relaxed">
              Atur sapaan tamu kehormatan (mendukung pembacaan dinamis via tautan ?to=), segel monogram surya, serta tajuk serat pawiwahan.
            </p>
          </div>

          <Field
            label="Nama Tamu Uleman Kehormatan"
            error={errors.recipientName?.message}
            id={`${idPrefix}-recipientName`}
            helperText="Nama ini akan tampil di kotak uleman kehormatan pada sampul Gapura Gunungan."
          >
            <Input
              id={`${idPrefix}-recipientName`}
              placeholder="Bapak / Ibu / Sahabat Ingkang Kinurmatan"
              {...register("recipientName", { required: "Nama tamu wajib diisi" })}
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Inisial Monogram Segel Surya"
              error={errors.waxSealMonogram?.message}
              id={`${idPrefix}-waxSealMonogram`}
              helperText="Inisial kedua mempelai (contoh: D & S)."
            >
              <Input
                id={`${idPrefix}-waxSealMonogram`}
                placeholder="D & S"
                {...register("waxSealMonogram")}
              />
            </Field>

            <Field
              label="Subjudul Gapura Adat"
              error={errors.gununganSubtitle?.message}
              id={`${idPrefix}-gununganSubtitle`}
            >
              <Input
                id={`${idPrefix}-gununganSubtitle`}
                placeholder="Serat Uleman Palakrama Adat Jawi Keraton"
                {...register("gununganSubtitle")}
              />
            </Field>
          </div>

          <Field
            label="Tagline Acara / Serat Pawiwahan"
            error={errors.weddingTagline?.message}
            id={`${idPrefix}-weddingTagline`}
          >
            <Input
              id={`${idPrefix}-weddingTagline`}
              placeholder="Pawiwahan Ageng & The Sacred Nusantara Matrimony"
              {...register("weddingTagline")}
            />
          </Field>
        </div>
      )}

      {/* TAB 2: SERAT SUCI & DOA */}
      {activeTab === "blessing" && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs sm:text-sm text-amber-950">
            <p className="font-semibold mb-1">Kutipan Serat Suci, Pesan & Waktu Pawiwahan</p>
            <p className="text-amber-800/80 leading-relaxed">
              Tuliskan ayat suci pernikahan, permohonan doa restu, serta tanggal pelaksanaan dan target hitung mundur.
            </p>
          </div>

          <Field
            label="Kutipan Ayat Suci / Serat Piwulang"
            error={errors.holyVerseQuote?.message}
            id={`${idPrefix}-holyVerseQuote`}
          >
            <Textarea
              id={`${idPrefix}-holyVerseQuote`}
              rows={3}
              placeholder='"Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu..." (QS. Ar-Rum: 21)'
              {...register("holyVerseQuote")}
            />
          </Field>

          <Field
            label="Serat Uleman Pambuka (Pesan Undangan)"
            error={errors.invitationMessage?.message}
            id={`${idPrefix}-invitationMessage`}
          >
            <Textarea
              id={`${idPrefix}-invitationMessage`}
              rows={4}
              placeholder="Kanthi nyenyuwun lumunturing sih wilasa Dalem Gusti Ingkang Maha Agung..."
              {...register("invitationMessage")}
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Hari & Tanggal Utama Pawiwahan"
              error={errors.eventDate?.message}
              id={`${idPrefix}-eventDate`}
            >
              <Input
                id={`${idPrefix}-eventDate`}
                placeholder="Setu Pahing, 12 Desember 2026"
                {...register("eventDate", { required: "Tanggal acara wajib diisi" })}
              />
            </Field>

            <Field
              label="Target ISO Countdown (YYYY-MM-DDTHH:mm)"
              error={errors.targetIsoDate?.message}
              id={`${idPrefix}-targetIsoDate`}
              helperText="Contoh: 2026-12-12T08:00"
            >
              <Input
                id={`${idPrefix}-targetIsoDate`}
                placeholder="2026-12-12T08:00"
                {...register("targetIsoDate")}
              />
            </Field>
          </div>

          <Field
            label="Keluarga Besar Pengundang"
            error={errors.senderFamily?.message}
            id={`${idPrefix}-senderFamily`}
          >
            <Input
              id={`${idPrefix}-senderFamily`}
              placeholder="Keluarga Ageng Bpk. K.R.T. Dananjaya & Bpk. Dr. H. Suryonegoro"
              {...register("senderFamily")}
            />
          </Field>
        </div>
      )}

      {/* TAB 3: KEDUA MEMPELAI */}
      {activeTab === "couple" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs sm:text-sm text-amber-950">
            <p className="font-semibold mb-1">Mempelai Kakung & Mempelai Putri</p>
            <p className="text-amber-800/80 leading-relaxed">
              Masukkan nama lengkap, gelar, silsilah keluarga nama orang tua, serta tautan foto adat kedua mempelai.
            </p>
          </div>

          {/* Mempelai Kakung (Pria) */}
          <div className="p-4 border border-stone-200 rounded-xl space-y-4 bg-white">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-700">Mempelai Kakung (Pria)</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Sebutan Mempelai" id={`${idPrefix}-groomTitle`}>
                <Input
                  id={`${idPrefix}-groomTitle`}
                  placeholder="Mempelai Kakung"
                  {...register("groomTitle")}
                />
              </Field>
              <Field
                label="Nama Lengkap & Gelar"
                error={errors.groomName?.message}
                id={`${idPrefix}-groomName`}
              >
                <Input
                  id={`${idPrefix}-groomName`}
                  placeholder="Raden Mas Dananjaya Bismantara, S.T., M.Sc."
                  {...register("groomName", { required: "Nama mempelai pria wajib diisi" })}
                />
              </Field>
            </div>
            <Field label="Putra Dari (Nama Orang Tua)" id={`${idPrefix}-groomParents`}>
              <Input
                id={`${idPrefix}-groomParents`}
                placeholder="Putra kaping kalih saking Bpk. K.R.T. Dananjaya & Ibu Hj. Ratna Ningsih"
                {...register("groomParents")}
              />
            </Field>
            <Field label="URL Foto Mempelai Pria (Adat)" id={`${idPrefix}-groomPhotoUrl`}>
              <Input
                id={`${idPrefix}-groomPhotoUrl`}
                placeholder="https://images.unsplash.com/photo-..."
                {...register("groomPhotoUrl")}
              />
            </Field>
          </div>

          {/* Mempelai Putri (Wanita) */}
          <div className="p-4 border border-stone-200 rounded-xl space-y-4 bg-white">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-700">Mempelai Putri (Wanita)</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Sebutan Mempelai" id={`${idPrefix}-brideTitle`}>
                <Input
                  id={`${idPrefix}-brideTitle`}
                  placeholder="Mempelai Putri"
                  {...register("brideTitle")}
                />
              </Field>
              <Field
                label="Nama Lengkap & Gelar"
                error={errors.brideName?.message}
                id={`${idPrefix}-brideName`}
              >
                <Input
                  id={`${idPrefix}-brideName`}
                  placeholder="Raden Ajeng Sekar Kusumaningrum, B.A., M.Des."
                  {...register("brideName", { required: "Nama mempelai wanita wajib diisi" })}
                />
              </Field>
            </div>
            <Field label="Putri Dari (Nama Orang Tua)" id={`${idPrefix}-brideParents`}>
              <Input
                id={`${idPrefix}-brideParents`}
                placeholder="Putri pambayun saking Bpk. Dr. H. Suryonegoro & Ibu Hj. Endang Sri Lestari"
                {...register("brideParents")}
              />
            </Field>
            <Field label="URL Foto Mempelai Wanita (Adat)" id={`${idPrefix}-bridePhotoUrl`}>
              <Input
                id={`${idPrefix}-bridePhotoUrl`}
                placeholder="https://images.unsplash.com/photo-..."
                {...register("bridePhotoUrl")}
              />
            </Field>
          </div>
        </div>
      )}

      {/* TAB 4: TATA LAMPAH ADAT (4 SESI) */}
      {activeTab === "itinerary" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs sm:text-sm text-amber-950">
            <p className="font-semibold mb-1">Tata Lampahing Adat (4 Rangkaian Sakral)</p>
            <p className="text-amber-800/80 leading-relaxed">
              Atur waktu dan deskripsi prosesi Siraman & Bleketepe, Malam Midodareni, Ijab Qabul, dan Upacara Panggih & Resepsi Ageng.
            </p>
          </div>

          {/* Sesi 1 */}
          <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
            <p className="text-xs font-bold text-amber-800 uppercase tracking-wider">Prosesi I: Siraman & Bleketepe</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Waktu Prosesi" id={`${idPrefix}-session1Time`}>
                <Input id={`${idPrefix}-session1Time`} {...register("session1Time")} />
              </Field>
              <Field label="Nama Prosesi" id={`${idPrefix}-session1Title`}>
                <Input id={`${idPrefix}-session1Title`} {...register("session1Title")} />
              </Field>
            </div>
            <Field label="Deskripsi Makna Prosesi" id={`${idPrefix}-session1Desc`}>
              <Textarea id={`${idPrefix}-session1Desc`} rows={2} {...register("session1Desc")} />
            </Field>
          </div>

          {/* Sesi 2 */}
          <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
            <p className="text-xs font-bold text-amber-800 uppercase tracking-wider">Prosesi II: Malam Midodareni</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Waktu Prosesi" id={`${idPrefix}-session2Time`}>
                <Input id={`${idPrefix}-session2Time`} {...register("session2Time")} />
              </Field>
              <Field label="Nama Prosesi" id={`${idPrefix}-session2Title`}>
                <Input id={`${idPrefix}-session2Title`} {...register("session2Title")} />
              </Field>
            </div>
            <Field label="Deskripsi Makna Prosesi" id={`${idPrefix}-session2Desc`}>
              <Textarea id={`${idPrefix}-session2Desc`} rows={2} {...register("session2Desc")} />
            </Field>
          </div>

          {/* Sesi 3 */}
          <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
            <p className="text-xs font-bold text-amber-800 uppercase tracking-wider">Prosesi III: Ijab Qabul Khidmat</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Waktu Prosesi" id={`${idPrefix}-session3Time`}>
                <Input id={`${idPrefix}-session3Time`} {...register("session3Time")} />
              </Field>
              <Field label="Nama Prosesi" id={`${idPrefix}-session3Title`}>
                <Input id={`${idPrefix}-session3Title`} {...register("session3Title")} />
              </Field>
            </div>
            <Field label="Deskripsi Makna Prosesi" id={`${idPrefix}-session3Desc`}>
              <Textarea id={`${idPrefix}-session3Desc`} rows={2} {...register("session3Desc")} />
            </Field>
          </div>

          {/* Sesi 4 */}
          <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
            <p className="text-xs font-bold text-amber-800 uppercase tracking-wider">Prosesi IV: Panggih & Resepsi Ageng</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Waktu Prosesi" id={`${idPrefix}-session4Time`}>
                <Input id={`${idPrefix}-session4Time`} {...register("session4Time")} />
              </Field>
              <Field label="Nama Prosesi" id={`${idPrefix}-session4Title`}>
                <Input id={`${idPrefix}-session4Title`} {...register("session4Title")} />
              </Field>
            </div>
            <Field label="Deskripsi Makna Prosesi" id={`${idPrefix}-session4Desc`}>
              <Textarea id={`${idPrefix}-session4Desc`} rows={2} {...register("session4Desc")} />
            </Field>
          </div>
        </div>
      )}

      {/* TAB 5: PASINAON TRESNA (GALERI) */}
      {activeTab === "gallery" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs sm:text-sm text-amber-950">
            <p className="font-semibold mb-1">Galeri Pasinaon Tresna (3 Foto Prewedding Adat)</p>
            <p className="text-amber-800/80 leading-relaxed">
              Pilih foto preset bertema adat atau masukkan URL foto Anda sendiri beserta kutipan puitis.
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-medium text-stone-700">Pilihan Cepat Foto Bertema Adat Nusantara:</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {PRESET_PHOTOS.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setValue("photo1Url", p.url, { shouldDirty: true })}
                  className={cn(
                    "group relative aspect-[4/3] rounded-lg overflow-hidden border-2 text-left transition-all",
                    currentPhoto1 === p.url ? "border-amber-600 ring-2 ring-amber-500/30" : "border-stone-200 hover:border-stone-400",
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.thumb} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-1.5 flex items-end">
                    <span className="text-[10px] text-white font-medium line-clamp-1">{p.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Foto 1 */}
          <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
            <p className="text-xs font-bold text-amber-800 uppercase tracking-wider">Foto Dokumentasi 1</p>
            <Field label="URL Foto 1" id={`${idPrefix}-photo1Url`}>
              <Input id={`${idPrefix}-photo1Url`} placeholder="https://..." {...register("photo1Url")} />
            </Field>
            <Field label="Keterangan Foto 1" id={`${idPrefix}-photo1Caption`}>
              <Input id={`${idPrefix}-photo1Caption`} placeholder="Kutipan puitis kebersamaan..." {...register("photo1Caption")} />
            </Field>
          </div>

          {/* Foto 2 */}
          <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
            <p className="text-xs font-bold text-amber-800 uppercase tracking-wider">Foto Dokumentasi 2</p>
            <Field label="URL Foto 2" id={`${idPrefix}-photo2Url`}>
              <Input id={`${idPrefix}-photo2Url`} placeholder="https://..." {...register("photo2Url")} />
            </Field>
            <Field label="Keterangan Foto 2" id={`${idPrefix}-photo2Caption`}>
              <Input id={`${idPrefix}-photo2Caption`} placeholder="Kutipan puitis kebersamaan..." {...register("photo2Caption")} />
            </Field>
          </div>

          {/* Foto 3 */}
          <div className="p-4 border border-stone-200 rounded-xl space-y-3 bg-white">
            <p className="text-xs font-bold text-amber-800 uppercase tracking-wider">Foto Dokumentasi 3</p>
            <Field label="URL Foto 3" id={`${idPrefix}-photo3Url`}>
              <Input id={`${idPrefix}-photo3Url`} placeholder="https://..." {...register("photo3Url")} />
            </Field>
            <Field label="Keterangan Foto 3" id={`${idPrefix}-photo3Caption`}>
              <Input id={`${idPrefix}-photo3Caption`} placeholder="Kutipan puitis kebersamaan..." {...register("photo3Caption")} />
            </Field>
          </div>
        </div>
      )}

      {/* TAB 6: SASANA & BUSANA */}
      {activeTab === "venue" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs sm:text-sm text-amber-950">
            <p className="font-semibold mb-1">Sasana Pawiwahan & Panduan Busana Tamu</p>
            <p className="text-amber-800/80 leading-relaxed">
              Atur lokasi gedung/pendopo, alamat lengkap, tautan Google Maps, serta panduan busana formal/batik bagi para tamu.
            </p>
          </div>

          <div className="p-4 border border-stone-200 rounded-xl space-y-4 bg-white">
            <p className="text-xs font-bold text-amber-800 uppercase tracking-wider">Lokasi Gedung / Sasana</p>
            <Field label="Nama Sasana / Gedung" id={`${idPrefix}-venueName`}>
              <Input
                id={`${idPrefix}-venueName`}
                placeholder="Sasana Handrawina Ballroom & Pendopo Ageng Keraton"
                {...register("venueName", { required: "Nama sasana wajib diisi" })}
              />
            </Field>
            <Field label="Nama Paviliun / Hall" id={`${idPrefix}-venueHall`}>
              <Input
                id={`${idPrefix}-venueHall`}
                placeholder="Grand Royal Atrium & Courtyard Taman Asri"
                {...register("venueHall")}
              />
            </Field>
            <Field label="Alamat Lengkap" id={`${idPrefix}-venueAddress`}>
              <Textarea
                id={`${idPrefix}-venueAddress`}
                rows={2}
                placeholder="Jl. Mayor Kusmanto No. 99, Surakarta, Jawa Tengah 57111"
                {...register("venueAddress", { required: "Alamat venue wajib diisi" })}
              />
            </Field>
            <Field label="Tautan Rute Google Maps" id={`${idPrefix}-mapsUrl`}>
              <Input
                id={`${idPrefix}-mapsUrl`}
                placeholder="https://maps.google.com/?q=Surakarta"
                {...register("mapsUrl")}
              />
            </Field>
          </div>

          <div className="p-4 border border-stone-200 rounded-xl space-y-4 bg-white">
            <p className="text-xs font-bold text-amber-800 uppercase tracking-wider">Panduan Busana Tamu (Dress Code)</p>
            <Field label="Judul Panduan Busana" id={`${idPrefix}-dressCodeTitle`}>
              <Input
                id={`${idPrefix}-dressCodeTitle`}
                placeholder="Busana Tradisional Ageng / Batik Formal Nusantara"
                {...register("dressCodeTitle")}
              />
            </Field>
            <Field label="Catatan Panduan Busana" id={`${idPrefix}-dressCodeNote`}>
              <Textarea
                id={`${idPrefix}-dressCodeNote`}
                rows={2}
                placeholder="Katuran rawuh ngagem busana Beskap Jawi / Kebaya Nasional utawi Batik Tulis Lengan Panjang..."
                {...register("dressCodeNote")}
              />
            </Field>
          </div>
        </div>
      )}

      {/* TAB 7: TANDHA TRESNA & GENDING */}
      {activeTab === "gift" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-xs sm:text-sm text-amber-950">
            <p className="font-semibold mb-1">Amplop Digital & Musik Gending Penganten</p>
            <p className="text-amber-800/80 leading-relaxed">
              Atur nomor rekening untuk tanda kasih serta alunan gending gamelan penganten yang syahdu.
            </p>
          </div>

          <div className="p-4 border border-stone-200 rounded-xl space-y-4 bg-white">
            <p className="text-xs font-bold text-amber-800 uppercase tracking-wider">Amplop Digital (Tandha Asih)</p>
            <Field label="Judul Seksi Amplop" id={`${idPrefix}-giftInfoTitle`}>
              <Input id={`${idPrefix}-giftInfoTitle`} placeholder="Tandha Asih & Kado Dhigital" {...register("giftInfoTitle")} />
            </Field>
            <Field label="Pesan Doa Restu" id={`${idPrefix}-giftNote`}>
              <Textarea id={`${idPrefix}-giftNote`} rows={2} {...register("giftNote")} />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-3 border border-stone-200 rounded-lg space-y-2 bg-stone-50/60">
                <p className="text-[11px] font-bold text-stone-700">Rekening 1</p>
                <Field label="Bank 1" id={`${idPrefix}-bankName1`}><Input id={`${idPrefix}-bankName1`} {...register("bankName1")} /></Field>
                <Field label="Nomor Rekening 1" id={`${idPrefix}-accountNumber1`}><Input id={`${idPrefix}-accountNumber1`} {...register("accountNumber1")} /></Field>
                <Field label="Nama Pemilik 1" id={`${idPrefix}-accountHolder1`}><Input id={`${idPrefix}-accountHolder1`} {...register("accountHolder1")} /></Field>
              </div>

              <div className="p-3 border border-stone-200 rounded-lg space-y-2 bg-stone-50/60">
                <p className="text-[11px] font-bold text-stone-700">Rekening 2</p>
                <Field label="Bank 2" id={`${idPrefix}-bankName2`}><Input id={`${idPrefix}-bankName2`} {...register("bankName2")} /></Field>
                <Field label="Nomor Rekening 2" id={`${idPrefix}-accountNumber2`}><Input id={`${idPrefix}-accountNumber2`} {...register("accountNumber2")} /></Field>
                <Field label="Nama Pemilik 2" id={`${idPrefix}-accountHolder2`}><Input id={`${idPrefix}-accountHolder2`} {...register("accountHolder2")} /></Field>
              </div>
            </div>
          </div>

          <div className="p-4 border border-stone-200 rounded-xl space-y-4 bg-white">
            <p className="text-xs font-bold text-amber-800 uppercase tracking-wider">Alunan Gending Penganten</p>
            <Field label="Judul Gending" id={`${idPrefix}-musicTitle`}>
              <Input id={`${idPrefix}-musicTitle`} placeholder="Gamelan Kebo Giro & Seruling Wilasa Syahdu" {...register("musicTitle")} />
            </Field>
            <Field label="URL Audio Musik (MP3)" id={`${idPrefix}-musicUrl`}>
              <Input id={`${idPrefix}-musicUrl`} placeholder="https://..." {...register("musicUrl")} />
            </Field>
          </div>

          <div className="p-4 border border-stone-200 rounded-xl space-y-4 bg-white">
            <p className="text-xs font-bold text-amber-800 uppercase tracking-wider">Palet Warna Template</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ColorPickerField
                label="Warna Aksen Emas"
                value={(watch("primaryColor") as string) || "#c59b27"}
                onChange={(color) => setValue("primaryColor", color, { shouldDirty: true })}
              />
              <ColorPickerField
                label="Warna Latar (Deep Navy)"
                value={(watch("backgroundColor") as string) || "#0b1320"}
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
              : "bg-amber-600 text-white hover:bg-amber-700 shadow-sm",
          )}
        >
          <span>Lanjutkan</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
