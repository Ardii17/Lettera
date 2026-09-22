"use client";

import { useState } from "react";
import type {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  FieldErrors,
} from "react-hook-form";
import {
  Calendar,
  Clock,
  Palette,
  Ticket,
  ImageIcon,
  Sparkles,
  HeartHandshake,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Field, Input, Textarea } from "@/components/ui/field";
import { ColorPickerField } from "@/components/ui/color-picker-field";
import {
  BACKGROUND_COLOR_PRESETS,
  CARD_COLOR_PRESETS,
} from "@/templates/color-presets";
import { cn } from "@/lib/utils/cn";
import type { LetterFormValues } from "./dynamic-form";

interface ArtExhibitionBuilderFormProps {
  register: UseFormRegister<LetterFormValues>;
  setValue: UseFormSetValue<LetterFormValues>;
  watch: UseFormWatch<LetterFormValues>;
  errors: FieldErrors<LetterFormValues>;
  idPrefix?: string;
}

type TabType = "ticket" | "curatorial" | "event" | "rundown" | "artworks" | "guide" | "theme";

const PRESET_ARTWORKS = [
  {
    name: "Karya 1: Solitude in Crimson",
    url: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Karya 2: Echoes of the Monolith",
    url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Karya 3: Luminescence No. IV",
    url: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Karya 4: Minimalist Abstract Form",
    url: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=200&q=60",
  },
];

export function ArtExhibitionBuilderForm({
  register,
  setValue,
  watch,
  errors,
  idPrefix = "art-exhibition",
}: ArtExhibitionBuilderFormProps) {
  const [activeTab, setActiveTab] = useState<TabType>("ticket");

  const tabs: Array<{ id: TabType; label: string; icon: typeof Ticket }> = [
    { id: "ticket", label: "Tiket & Cover", icon: Ticket },
    { id: "curatorial", label: "Kuratorial & Seniman", icon: Palette },
    { id: "event", label: "Waktu & Lokasi", icon: Calendar },
    { id: "rundown", label: "Rundown Acara", icon: Clock },
    { id: "artworks", label: "Preview Karya", icon: ImageIcon },
    { id: "guide", label: "Dress Code & Donasi", icon: HeartHandshake },
    { id: "theme", label: "Warna & Audio", icon: Sparkles },
  ];

  const currentTabIndex = tabs.findIndex((t) => t.id === activeTab);
  const currentArt1 = watch("artwork1Url") as string;

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
                  ? "bg-white text-stone-900 shadow-sm font-semibold"
                  : "text-stone-500 hover:text-stone-900 hover:bg-white/50",
              )}
            >
              <Icon className={cn("w-3.5 h-3.5", isActive ? "text-red-600" : "text-stone-400")} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: TIKET & COVER VIP */}
      {activeTab === "ticket" && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs sm:text-sm text-stone-700">
            <p className="font-semibold text-stone-900 mb-1">Tiket Masuk VIP & Tampilan Sampul</p>
            <p className="text-stone-500 leading-relaxed">
              Atur nomor tiket serial, stempel segel kurator, jenis pembukaan pameran, serta nama kolektor yang diundang.
            </p>
          </div>

          <Field
            label="Nama Kolektor / Tamu Kehormatan"
            htmlFor={`${idPrefix}-recipientName`}
            error={errors.recipientName?.message}
            required
            hint="Sapaan dinamis juga dapat menggunakan parameter URL ?to=NamaTamu"
          >
            <Input
              id={`${idPrefix}-recipientName`}
              placeholder="Bapak / Ibu Kolektor & Rekan Kuratorial"
              {...register("recipientName", { required: "Nama tamu wajib diisi" })}
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Nomor Seri Tiket VIP"
              htmlFor={`${idPrefix}-ticketNumber`}
              hint="Format nomor seri tiket VIP (misal: VIP-VERNISSAGE-0842)"
            >
              <Input
                id={`${idPrefix}-ticketNumber`}
                placeholder="VIP-VERNISSAGE-0842"
                {...register("ticketNumber")}
              />
            </Field>

            <Field
              label="Stempel Kurator (Curator Seal)"
              htmlFor={`${idPrefix}-curatorSeal`}
              hint="Teks stempel lencana kurator resmi"
            >
              <Input
                id={`${idPrefix}-curatorSeal`}
                placeholder="CURATORIAL APPROVED // ADMIT ONE"
                {...register("curatorSeal")}
              />
            </Field>
          </div>

          <Field
            label="Subjudul Undangan / Keterangan Pembukaan"
            htmlFor={`${idPrefix}-exhibitionSub`}
          >
            <Input
              id={`${idPrefix}-exhibitionSub`}
              placeholder="Solo Art Exhibition Vernissage & Private Viewing"
              {...register("exhibitionSub")}
            />
          </Field>
        </div>
      )}

      {/* TAB 2: KURATORIAL & SENIMAN */}
      {activeTab === "curatorial" && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          <Field
            label="Judul Utama Pameran Seni"
            htmlFor={`${idPrefix}-exhibitionTitle`}
            error={errors.exhibitionTitle?.message}
            required
          >
            <Input
              id={`${idPrefix}-exhibitionTitle`}
              placeholder="TRANSCENDENCE: Shadows of the Finite"
              {...register("exhibitionTitle", { required: "Judul pameran wajib diisi" })}
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Nama Seniman / Studio"
              htmlFor={`${idPrefix}-artistName`}
              error={errors.artistName?.message}
              required
            >
              <Input
                id={`${idPrefix}-artistName`}
                placeholder="Julian Thorne & Studio Lumina"
                {...register("artistName", { required: "Nama seniman wajib diisi" })}
              />
            </Field>

            <Field
              label="Nama Kurator Pameran"
              htmlFor={`${idPrefix}-curatorName`}
            >
              <Input
                id={`${idPrefix}-curatorName`}
                placeholder="Dr. Arisya Danu, M.Sn."
                {...register("curatorName")}
              />
            </Field>
          </div>

          <Field
            label="Pengantar Kuratorial / Pesan Undangan"
            htmlFor={`${idPrefix}-curatorialStatement`}
            error={errors.curatorialStatement?.message}
            required
            hint="Tulis pengantar estetika pameran dan undangan hangat untuk para kolektor."
          >
            <Textarea
              id={`${idPrefix}-curatorialStatement`}
              rows={5}
              placeholder="Sebuah eksplorasi visual tentang batas antara memori, materialitas, dan ruang hening..."
              {...register("curatorialStatement", { required: "Pernyataan kuratorial wajib diisi" })}
            />
          </Field>

          <Field
            label="Tuan Rumah / Penyelenggara (Pengirim)"
            htmlFor={`${idPrefix}-senderName`}
            error={errors.senderName?.message}
            required
          >
            <Input
              id={`${idPrefix}-senderName`}
              placeholder="Dewan Kurator Lumina Space"
              {...register("senderName", { required: "Nama penyelenggara wajib diisi" })}
            />
          </Field>
        </div>
      )}

      {/* TAB 3: JADWAL & LOKASI */}
      {activeTab === "event" && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Hari & Tanggal Vernissage"
              htmlFor={`${idPrefix}-eventDate`}
              required
            >
              <Input
                id={`${idPrefix}-eventDate`}
                placeholder="Sabtu, 24 Oktober 2026"
                {...register("eventDate", { required: "Tanggal acara wajib diisi" })}
              />
            </Field>

            <Field
              label="Waktu Pembukaan"
              htmlFor={`${idPrefix}-eventTime`}
              required
            >
              <Input
                id={`${idPrefix}-eventTime`}
                placeholder="18.30 – 22.00 WIB"
                {...register("eventTime", { required: "Waktu acara wajib diisi" })}
              />
            </Field>
          </div>

          <Field
            label="Waktu Target Countdown (Format ISO)"
            htmlFor={`${idPrefix}-targetDateIso`}
            hint="Format: YYYY-MM-DDTHH:mm:ss (contoh: 2026-10-24T18:30:00). Menggerakkan widget countdown."
          >
            <Input
              id={`${idPrefix}-targetDateIso`}
              placeholder="2026-10-24T18:30:00"
              {...register("targetDateIso")}
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Nama Galeri Seni / Venue"
              htmlFor={`${idPrefix}-venueName`}
              required
            >
              <Input
                id={`${idPrefix}-venueName`}
                placeholder="Lumina Contemporary Art Space"
                {...register("venueName", { required: "Nama venue wajib diisi" })}
              />
            </Field>

            <Field
              label="Nama Ruang / Sayap Galeri"
              htmlFor={`${idPrefix}-venueHall`}
            >
              <Input
                id={`${idPrefix}-venueHall`}
                placeholder="Main Atrium & North Pavilion"
                {...register("venueHall")}
              />
            </Field>
          </div>

          <Field
            label="Alamat Lengkap Galeri"
            htmlFor={`${idPrefix}-venueAddress`}
            required
          >
            <Input
              id={`${idPrefix}-venueAddress`}
              placeholder="Jl. Seni Budaya No. 88, Menteng, Jakarta Pusat"
              {...register("venueAddress", { required: "Alamat venue wajib diisi" })}
            />
          </Field>

          <Field
            label="Tautan Google Maps"
            htmlFor={`${idPrefix}-mapsUrl`}
            hint="Link navigasi langsung ke titik lokasi pada Google Maps"
          >
            <Input
              id={`${idPrefix}-mapsUrl`}
              placeholder="https://maps.google.com/?q=Jakarta+Art+Gallery"
              {...register("mapsUrl")}
            />
          </Field>
        </div>
      )}

      {/* TAB 4: RUNDOWN ACARA (4 SESI) */}
      {activeTab === "rundown" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs sm:text-sm text-stone-700">
            <p className="font-semibold text-stone-900 mb-1">Rundown 4 Sesi Acara Vernissage</p>
            <p className="text-stone-500 leading-relaxed">
              Atur urutan acara mulai dari registrasi VIP, tur kuratorial, sesi pameran, hingga networking.
            </p>
          </div>

          {/* Sesi 1 */}
          <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-800">Sesi 1: Registrasi & Welcome Drink</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Judul Sesi 1" htmlFor={`${idPrefix}-session1Title`}>
                <Input id={`${idPrefix}-session1Title`} placeholder="VIP Arrival & Welcoming Reception" {...register("session1Title")} />
              </Field>
              <Field label="Waktu Sesi 1" htmlFor={`${idPrefix}-session1Time`}>
                <Input id={`${idPrefix}-session1Time`} placeholder="18.30 – 19.15 WIB" {...register("session1Time")} />
              </Field>
            </div>
            <Field label="Keterangan Sesi 1" htmlFor={`${idPrefix}-session1Desc`}>
              <Input id={`${idPrefix}-session1Desc`} placeholder="Registrasi tamu kehormatan..." {...register("session1Desc")} />
            </Field>
          </div>

          {/* Sesi 2 */}
          <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-800">Sesi 2: Tur Kuratorial & Sambutan</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Judul Sesi 2" htmlFor={`${idPrefix}-session2Title`}>
                <Input id={`${idPrefix}-session2Title`} placeholder="Curatorial Tour & Artist Vernissage Speech" {...register("session2Title")} />
              </Field>
              <Field label="Waktu Sesi 2" htmlFor={`${idPrefix}-session2Time`}>
                <Input id={`${idPrefix}-session2Time`} placeholder="19.15 – 20.00 WIB" {...register("session2Time")} />
              </Field>
            </div>
            <Field label="Keterangan Sesi 2" htmlFor={`${idPrefix}-session2Desc`}>
              <Input id={`${idPrefix}-session2Desc`} placeholder="Sambutan pembuka oleh dewan kurator..." {...register("session2Desc")} />
            </Field>
          </div>

          {/* Sesi 3 */}
          <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-800">Sesi 3: Private Viewing & Soundscape</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Judul Sesi 3" htmlFor={`${idPrefix}-session3Title`}>
                <Input id={`${idPrefix}-session3Title`} placeholder="Private Viewing & Ambient Soundscape" {...register("session3Title")} />
              </Field>
              <Field label="Waktu Sesi 3" htmlFor={`${idPrefix}-session3Time`}>
                <Input id={`${idPrefix}-session3Time`} placeholder="20.00 – 21.00 WIB" {...register("session3Time")} />
              </Field>
            </div>
            <Field label="Keterangan Sesi 3" htmlFor={`${idPrefix}-session3Desc`}>
              <Input id={`${idPrefix}-session3Desc`} placeholder="Eksplorasi intim ruang instalasi..." {...register("session3Desc")} />
            </Field>
          </div>

          {/* Sesi 4 */}
          <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-800">Sesi 4: Akuisisi Karya & Wine Networking</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Judul Sesi 4" htmlFor={`${idPrefix}-session4Title`}>
                <Input id={`${idPrefix}-session4Title`} placeholder="Patron Acquisition & Wine Networking" {...register("session4Title")} />
              </Field>
              <Field label="Waktu Sesi 4" htmlFor={`${idPrefix}-session4Time`}>
                <Input id={`${idPrefix}-session4Time`} placeholder="21.00 – 22.00 WIB" {...register("session4Time")} />
              </Field>
            </div>
            <Field label="Keterangan Sesi 4" htmlFor={`${idPrefix}-session4Desc`}>
              <Input id={`${idPrefix}-session4Desc`} placeholder="Sesi akuisisi privat bagi kolektor..." {...register("session4Desc")} />
            </Field>
          </div>
        </div>
      )}

      {/* TAB 5: PREVIEW KARYA SENI (3 ARTWORKS) */}
      {activeTab === "artworks" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs sm:text-sm text-stone-700">
            <p className="font-semibold text-stone-900 mb-1">Pratinjau 3 Karya Seni Kurasi</p>
            <p className="text-stone-500 leading-relaxed">
              Tampilkan karya seni terbaik pameran lengkap dengan judul, media, dimensi, dan catatan kurasi.
            </p>
          </div>

          {/* Preset Karya Seni Cepat */}
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-600">
              Pilihan Preset Foto Seni Rupa Cepat:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {PRESET_ARTWORKS.map((art) => {
                const isSelected = currentArt1 === art.url;
                return (
                  <button
                    key={art.name}
                    type="button"
                    onClick={() =>
                      setValue("artwork1Url", art.url, { shouldValidate: true, shouldDirty: true })
                    }
                    className={cn(
                      "relative aspect-square overflow-hidden rounded-xl border-2 transition-all text-left",
                      isSelected
                        ? "border-red-600 ring-2 ring-red-500/20"
                        : "border-stone-200 hover:border-stone-400",
                    )}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={art.thumb} alt={art.name} className="h-full w-full object-cover" />
                    <div className="absolute inset-x-0 bottom-0 bg-stone-900/80 p-1.5 text-[10px] text-white truncate">
                      {art.name}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Karya 1 */}
          <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-800">Karya #01</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Judul Karya 1" htmlFor={`${idPrefix}-artwork1Title`}>
                <Input id={`${idPrefix}-artwork1Title`} placeholder="Solitude in Crimson (2026)" {...register("artwork1Title")} />
              </Field>
              <Field label="Medium & Ukuran 1" htmlFor={`${idPrefix}-artwork1Medium`}>
                <Input id={`${idPrefix}-artwork1Medium`} placeholder="Oil, textured linen & acrylic (160 × 200 cm)" {...register("artwork1Medium")} />
              </Field>
            </div>
            <Field label="URL Foto Karya 1" htmlFor={`${idPrefix}-artwork1Url`}>
              <Input id={`${idPrefix}-artwork1Url`} placeholder="https://images.unsplash.com/..." {...register("artwork1Url")} />
            </Field>
            <Field label="Catatan Kurasi 1" htmlFor={`${idPrefix}-artwork1Desc`}>
              <Input id={`${idPrefix}-artwork1Desc`} placeholder="Refleksi mendalam mengenai kesunyian..." {...register("artwork1Desc")} />
            </Field>
          </div>

          {/* Form Karya 2 */}
          <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-800">Karya #02</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Judul Karya 2" htmlFor={`${idPrefix}-artwork2Title`}>
                <Input id={`${idPrefix}-artwork2Title`} placeholder="Echoes of the Monolith (2025)" {...register("artwork2Title")} />
              </Field>
              <Field label="Medium & Ukuran 2" htmlFor={`${idPrefix}-artwork2Medium`}>
                <Input id={`${idPrefix}-artwork2Medium`} placeholder="Cast bronze & raw basalt (85 × 140 cm)" {...register("artwork2Medium")} />
              </Field>
            </div>
            <Field label="URL Foto Karya 2" htmlFor={`${idPrefix}-artwork2Url`}>
              <Input id={`${idPrefix}-artwork2Url`} placeholder="https://images.unsplash.com/..." {...register("artwork2Url")} />
            </Field>
            <Field label="Catatan Kurasi 2" htmlFor={`${idPrefix}-artwork2Desc`}>
              <Input id={`${idPrefix}-artwork2Desc`} placeholder="Struktur monolitik yang membekukan resonansi..." {...register("artwork2Desc")} />
            </Field>
          </div>

          {/* Form Karya 3 */}
          <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-800">Karya #03</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Judul Karya 3" htmlFor={`${idPrefix}-artwork3Title`}>
                <Input id={`${idPrefix}-artwork3Title`} placeholder="Luminescence No. IV (2026)" {...register("artwork3Title")} />
              </Field>
              <Field label="Medium & Ukuran 3" htmlFor={`${idPrefix}-artwork3Medium`}>
                <Input id={`${idPrefix}-artwork3Medium`} placeholder="Patinated brass & gold leaf (120 × 120 cm)" {...register("artwork3Medium")} />
              </Field>
            </div>
            <Field label="URL Foto Karya 3" htmlFor={`${idPrefix}-artwork3Url`}>
              <Input id={`${idPrefix}-artwork3Url`} placeholder="https://images.unsplash.com/..." {...register("artwork3Url")} />
            </Field>
            <Field label="Catatan Kurasi 3" htmlFor={`${idPrefix}-artwork3Desc`}>
              <Input id={`${idPrefix}-artwork3Desc`} placeholder="Permainan gradasi spektrum cahaya..." {...register("artwork3Desc")} />
            </Field>
          </div>
        </div>
      )}

      {/* TAB 6: DRESS CODE & PATRON SENI */}
      {activeTab === "guide" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          {/* Dress Code */}
          <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-800">Panduan Busana (Dress Code)</h4>
            <Field label="Tema Dress Code" htmlFor={`${idPrefix}-dressCodeTitle`}>
              <Input id={`${idPrefix}-dressCodeTitle`} placeholder="Avant-Garde Minimalist / All-Black Chic" {...register("dressCodeTitle")} />
            </Field>
            <Field label="Catatan Tambahan Busana" htmlFor={`${idPrefix}-dressCodeNotes`}>
              <Input id={`${idPrefix}-dressCodeNotes`} placeholder="Tamu disarankan mengenakan busana monokrom gelap..." {...register("dressCodeNotes")} />
            </Field>

            <div className="space-y-3 pt-2">
              <span className="text-xs font-semibold text-stone-700">Palet Rekomendasi Busana:</span>
              <div className="space-y-3">
                <div className="rounded-xl border border-stone-200 bg-white p-3 sm:p-4 shadow-2xs">
                  <ColorPickerField label="Warna Busana 1" value={(watch("paletteColor1") as string) || "#111111"} onChange={(c) => setValue("paletteColor1", c, { shouldDirty: true })} />
                </div>
                <div className="rounded-xl border border-stone-200 bg-white p-3 sm:p-4 shadow-2xs">
                  <ColorPickerField label="Warna Busana 2" value={(watch("paletteColor2") as string) || "#27272a"} onChange={(c) => setValue("paletteColor2", c, { shouldDirty: true })} />
                </div>
                <div className="rounded-xl border border-stone-200 bg-white p-3 sm:p-4 shadow-2xs">
                  <ColorPickerField label="Warna Busana 3" value={(watch("paletteColor3") as string) || "#f4f4f5"} onChange={(c) => setValue("paletteColor3", c, { shouldDirty: true })} />
                </div>
                <div className="rounded-xl border border-stone-200 bg-white p-3 sm:p-4 shadow-2xs">
                  <ColorPickerField label="Warna Busana 4" value={(watch("paletteColor4") as string) || "#dc2626"} onChange={(c) => setValue("paletteColor4", c, { shouldDirty: true })} />
                </div>
              </div>
            </div>
          </div>

          {/* Patron Seni / Donasi Galeri */}
          <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-800">Dukungan Patron Seni / Reservasi</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Nama Bank / Yayasan" htmlFor={`${idPrefix}-patronBankName`}>
                <Input id={`${idPrefix}-patronBankName`} placeholder="BCA / Lumina Arts Foundation" {...register("patronBankName")} />
              </Field>
              <Field label="Nomor Rekening Patron" htmlFor={`${idPrefix}-patronAccountNo`}>
                <Input id={`${idPrefix}-patronAccountNo`} placeholder="8820491029" {...register("patronAccountNo")} />
              </Field>
            </div>
            <Field label="Nama Pemilik Rekening" htmlFor={`${idPrefix}-patronAccountName`}>
              <Input id={`${idPrefix}-patronAccountName`} placeholder="Yayasan Seni Rupa Lumina" {...register("patronAccountName")} />
            </Field>
            <Field label="Keterangan Program Patronage" htmlFor={`${idPrefix}-patronNote`}>
              <Input id={`${idPrefix}-patronNote`} placeholder="Dukungan patron seni untuk katalogisasi & residensi..." {...register("patronNote")} />
            </Field>
          </div>
        </div>
      )}

      {/* TAB 7: TEMA WARNA & AUDIO */}
      {activeTab === "theme" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          {/* Palet Warna Galeri - Setiap Bagian Memiliki Box Tersendiri Secara Vertikal */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-800 px-1">Palet Warna Galeri</h4>
            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
              <ColorPickerField
                label="Warna Latar Belakang (Canvas)"
                value={(watch("backgroundColor") as string) || "#09090b"}
                onChange={(c) => setValue("backgroundColor", c, { shouldDirty: true })}
                presets={BACKGROUND_COLOR_PRESETS}
              />
            </div>
            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
              <ColorPickerField
                label="Warna Kartu & Frame"
                value={(watch("cardColor") as string) || "#18181b"}
                onChange={(c) => setValue("cardColor", c, { shouldDirty: true })}
                presets={CARD_COLOR_PRESETS}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-800">Audio Ambient Galeri</h4>
            <Field
              label="Judul Musik Ambient"
              htmlFor={`${idPrefix}-musicTitle`}
            >
              <Input
                id={`${idPrefix}-musicTitle`}
                placeholder="Ambient Nocturne in D Minor"
                {...register("musicTitle")}
              />
            </Field>
            <Field
              label="URL Audio Background (.mp3)"
              htmlFor={`${idPrefix}-musicUrl`}
              hint="Format tautan file audio langsung (.mp3) untuk diputar mengambang di undangan."
            >
              <Input
                id={`${idPrefix}-musicUrl`}
                placeholder="https://cdn.pixabay.com/download/audio/..."
                {...register("musicUrl")}
              />
            </Field>
          </div>
        </div>
      )}

      {/* Navigation Buttons Between Tabs */}
      <div className="flex items-center justify-between pt-4 border-t border-stone-200">
        <button
          type="button"
          disabled={currentTabIndex === 0}
          onClick={() => setActiveTab(tabs[currentTabIndex - 1].id)}
          className={cn(
            "flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-colors",
            currentTabIndex === 0
              ? "text-stone-300 cursor-not-allowed"
              : "text-stone-600 hover:text-stone-900 hover:bg-stone-100",
          )}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Sebelumnya</span>
        </button>

        <span className="text-xs text-stone-400">
          Tab {currentTabIndex + 1} dari {tabs.length}
        </span>

        <button
          type="button"
          disabled={currentTabIndex === tabs.length - 1}
          onClick={() => setActiveTab(tabs[currentTabIndex + 1].id)}
          className={cn(
            "flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-colors",
            currentTabIndex === tabs.length - 1
              ? "text-stone-300 cursor-not-allowed"
              : "text-stone-700 hover:text-stone-900 hover:bg-stone-100",
          )}
        >
          <span>Berikutnya</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
