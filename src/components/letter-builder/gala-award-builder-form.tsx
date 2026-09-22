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
  Award,
  ImageIcon,
  Sparkles,
  HeartHandshake,
  Crown,
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

interface GalaAwardBuilderFormProps {
  register: UseFormRegister<LetterFormValues>;
  setValue: UseFormSetValue<LetterFormValues>;
  watch: UseFormWatch<LetterFormValues>;
  errors: FieldErrors<LetterFormValues>;
  idPrefix?: string;
}

type TabType = "cover" | "committee" | "event" | "rundown" | "photos" | "guide" | "theme";

const PRESET_GALA_PHOTOS = [
  {
    name: "Trophy Kehormatan Emas",
    url: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Crystal Grand Ballroom",
    url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Red Carpet Gala Dinner",
    url: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Champagne Glass Toast",
    url: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80",
    thumb: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=200&q=60",
  },
];

export function GalaAwardBuilderForm({
  register,
  setValue,
  watch,
  errors,
  idPrefix = "gala-award",
}: GalaAwardBuilderFormProps) {
  const [activeTab, setActiveTab] = useState<TabType>("cover");

  const tabs: Array<{ id: TabType; label: string; icon: typeof Crown }> = [
    { id: "cover", label: "Sampul & Segel", icon: Crown },
    { id: "committee", label: "Komite & Sambutan", icon: Award },
    { id: "event", label: "Waktu & Ballroom", icon: Calendar },
    { id: "rundown", label: "Program Acara", icon: Clock },
    { id: "photos", label: "Foto Red Carpet", icon: ImageIcon },
    { id: "guide", label: "Dress Code & Donasi", icon: HeartHandshake },
    { id: "theme", label: "Warna & Musik", icon: Sparkles },
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
                  ? "bg-white text-stone-900 shadow-sm font-semibold"
                  : "text-stone-500 hover:text-stone-900 hover:bg-white/50",
              )}
            >
              <Icon className={cn("w-3.5 h-3.5", isActive ? "text-amber-600" : "text-stone-400")} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: SAMPUL & SEGEL EMAS */}
      {activeTab === "cover" && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 text-xs sm:text-sm text-amber-950">
            <p className="font-semibold text-amber-900 mb-1">Kartu Undangan Beludru & Segel Lambang Emas</p>
            <p className="text-amber-900/80 leading-relaxed">
              Atur nomor resmi undangan gala, teks lambang segel emas (*embossed crest*), subjudul acara, dan nama tamu kehormatan.
            </p>
          </div>

          <Field
            label="Nama Tamu Kehormatan (Penerima)"
            htmlFor={`${idPrefix}-recipientName`}
            error={errors.recipientName?.message}
            required
            hint="Sapaan dinamis juga dapat dipersonalisasi via URL ?to=NamaTamu"
          >
            <Input
              id={`${idPrefix}-recipientName`}
              placeholder="Yang Terhormat Bapak / Ibu Pemimpin & Kolega"
              {...register("recipientName", { required: "Nama tamu kehormatan wajib diisi" })}
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Nomor Resmi Undangan"
              htmlFor={`${idPrefix}-invitationNo`}
            >
              <Input
                id={`${idPrefix}-invitationNo`}
                placeholder="INV-GALA-2026-009"
                {...register("invitationNo")}
              />
            </Field>

            <Field
              label="Teks Lambang Segel Emas"
              htmlFor={`${idPrefix}-goldenCrestTitle`}
            >
              <Input
                id={`${idPrefix}-goldenCrestTitle`}
                placeholder="HONORIS CAUSA // EXCELLENCE"
                {...register("goldenCrestTitle")}
              />
            </Field>
          </div>

          <Field
            label="Subjudul Penganugerahan / Tagline"
            htmlFor={`${idPrefix}-galaTagline`}
          >
            <Input
              id={`${idPrefix}-galaTagline`}
              placeholder="The 12th Annual Distinction Awards & Charity Gala"
              {...register("galaTagline")}
            />
          </Field>
        </div>
      )}

      {/* TAB 2: KOMITE & SAMBUTAN */}
      {activeTab === "committee" && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          <Field
            label="Nama Resmi Malam Gala"
            htmlFor={`${idPrefix}-galaTitle`}
            error={errors.galaTitle?.message}
            required
          >
            <Input
              id={`${idPrefix}-galaTitle`}
              placeholder="THE GOLDEN PINNACLE GALA 2026"
              {...register("galaTitle", { required: "Nama gala wajib diisi" })}
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Dewan Penyelenggara / Yayasan"
              htmlFor={`${idPrefix}-hostCommittee`}
              error={errors.hostCommittee?.message}
              required
            >
              <Input
                id={`${idPrefix}-hostCommittee`}
                placeholder="The Board of Trustees & Foundation Council"
                {...register("hostCommittee", { required: "Dewan penyelenggara wajib diisi" })}
              />
            </Field>

            <Field
              label="Ketua Dewan Kehormatan / Tuan Rumah"
              htmlFor={`${idPrefix}-chairpersonName`}
            >
              <Input
                id={`${idPrefix}-chairpersonName`}
                placeholder="Lord Arthur Vance & Elizabeth Sterling"
                {...register("chairpersonName")}
              />
            </Field>
          </div>

          <Field
            label="Naskah Surat Undangan Resmi"
            htmlFor={`${idPrefix}-invitationLetter`}
            error={errors.invitationLetter?.message}
            required
            hint="Tulis naskah surat undangan formal dan khidmat untuk para tamu kehormatan."
          >
            <Textarea
              id={`${idPrefix}-invitationLetter`}
              rows={5}
              placeholder="Merupakan suatu kehormatan agung bagi kami untuk mengundang kehadiran Anda..."
              {...register("invitationLetter", { required: "Naskah undangan wajib diisi" })}
            />
          </Field>

          <Field
            label="Nama Penutup Pengundang"
            htmlFor={`${idPrefix}-senderName`}
            error={errors.senderName?.message}
            required
          >
            <Input
              id={`${idPrefix}-senderName`}
              placeholder="Dewan Pembina Yayasan & Komite Acara"
              {...register("senderName", { required: "Nama pengundang wajib diisi" })}
            />
          </Field>
        </div>
      )}

      {/* TAB 3: WAKTU & BALLROOM */}
      {activeTab === "event" && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Hari & Tanggal Malam Gala"
              htmlFor={`${idPrefix}-eventDate`}
              required
            >
              <Input
                id={`${idPrefix}-eventDate`}
                placeholder="Sabtu, 19 Desember 2026"
                {...register("eventDate", { required: "Tanggal gala wajib diisi" })}
              />
            </Field>

            <Field
              label="Waktu Pelaksanaan"
              htmlFor={`${idPrefix}-eventTime`}
              required
            >
              <Input
                id={`${idPrefix}-eventTime`}
                placeholder="18.30 – 23.00 WIB"
                {...register("eventTime", { required: "Waktu acara wajib diisi" })}
              />
            </Field>
          </div>

          <Field
            label="Waktu Target Countdown (Format ISO)"
            htmlFor={`${idPrefix}-targetDateIso`}
            hint="Format: YYYY-MM-DDTHH:mm:ss (contoh: 2026-12-19T18:30:00). Menggerakkan countdown emas."
          >
            <Input
              id={`${idPrefix}-targetDateIso`}
              placeholder="2026-12-19T18:30:00"
              {...register("targetDateIso")}
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Nama Venue / Ballroom Hotel"
              htmlFor={`${idPrefix}-venueName`}
              required
            >
              <Input
                id={`${idPrefix}-venueName`}
                placeholder="The Grand Ballroom, The Langham Jakarta"
                {...register("venueName", { required: "Nama venue wajib diisi" })}
              />
            </Field>

            <Field
              label="Lantai / Sayap Khusus"
              htmlFor={`${idPrefix}-venueFloor`}
            >
              <Input
                id={`${idPrefix}-venueFloor`}
                placeholder="Main Tower Grand Ballroom & Crystal Foyer"
                {...register("venueFloor")}
              />
            </Field>
          </div>

          <Field
            label="Alamat Lengkap Venue"
            htmlFor={`${idPrefix}-venueAddress`}
            required
          >
            <Input
              id={`${idPrefix}-venueAddress`}
              placeholder="District 8, SCBD Lot 28, Senayan, Jakarta Selatan"
              {...register("venueAddress", { required: "Alamat venue wajib diisi" })}
            />
          </Field>

          <Field
            label="Tautan Google Maps"
            htmlFor={`${idPrefix}-mapsUrl`}
          >
            <Input
              id={`${idPrefix}-mapsUrl`}
              placeholder="https://maps.google.com/?q=The+Langham+Jakarta"
              {...register("mapsUrl")}
            />
          </Field>
        </div>
      )}

      {/* TAB 4: PROGRAM ACARA (4 SESI) */}
      {activeTab === "rundown" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs sm:text-sm text-stone-700">
            <p className="font-semibold text-stone-900 mb-1">Susunan Acara Malam Gala (4 Sesi)</p>
            <p className="text-stone-500 leading-relaxed">
              Atur urutan acara mulai dari Red Carpet & Champagne Soirée, santap malam Imperial, sesi awarding trofi kehormatan, hingga lelang amal dan simfoni waltz.
            </p>
          </div>

          {/* Sesi 1 */}
          <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-700">Sesi 1: Red Carpet & Champagne Soirée</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Judul Sesi 1" htmlFor={`${idPrefix}-session1Title`}>
                <Input id={`${idPrefix}-session1Title`} placeholder="Red Carpet Arrival & Vintage Champagne Soirée" {...register("session1Title")} />
              </Field>
              <Field label="Waktu Sesi 1" htmlFor={`${idPrefix}-session1Time`}>
                <Input id={`${idPrefix}-session1Time`} placeholder="18.30 – 19.30 WIB" {...register("session1Time")} />
              </Field>
            </div>
            <Field label="Keterangan Sesi 1" htmlFor={`${idPrefix}-session1Desc`}>
              <Input id={`${idPrefix}-session1Desc`} placeholder="Penyambutan tamu kehormatan, red carpet..." {...register("session1Desc")} />
            </Field>
          </div>

          {/* Sesi 2 */}
          <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-700">Sesi 2: Five-Course Dinner & Address</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Judul Sesi 2" htmlFor={`${idPrefix}-session2Title`}>
                <Input id={`${idPrefix}-session2Title`} placeholder="Five-Course Imperial Dinner & Keynote Address" {...register("session2Title")} />
              </Field>
              <Field label="Waktu Sesi 2" htmlFor={`${idPrefix}-session2Time`}>
                <Input id={`${idPrefix}-session2Time`} placeholder="19.30 – 20.45 WIB" {...register("session2Time")} />
              </Field>
            </div>
            <Field label="Keterangan Sesi 2" htmlFor={`${idPrefix}-session2Desc`}>
              <Input id={`${idPrefix}-session2Desc`} placeholder="Santap malam megah kurasi Master Chef..." {...register("session2Desc")} />
            </Field>
          </div>

          {/* Sesi 3 */}
          <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-700">Sesi 3: Annual Award Conferment</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Judul Sesi 3" htmlFor={`${idPrefix}-session3Title`}>
                <Input id={`${idPrefix}-session3Title`} placeholder="The Annual Excellence Awards Conferment" {...register("session3Title")} />
              </Field>
              <Field label="Waktu Sesi 3" htmlFor={`${idPrefix}-session3Time`}>
                <Input id={`${idPrefix}-session3Time`} placeholder="20.45 – 21.45 WIB" {...register("session3Time")} />
              </Field>
            </div>
            <Field label="Keterangan Sesi 3" htmlFor={`${idPrefix}-session3Desc`}>
              <Input id={`${idPrefix}-session3Desc`} placeholder="Penganugerahan trofi emas penghargaan..." {...register("session3Desc")} />
            </Field>
          </div>

          {/* Sesi 4 */}
          <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-700">Sesi 4: Charity Auction & Waltz</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Judul Sesi 4" htmlFor={`${idPrefix}-session4Title`}>
                <Input id={`${idPrefix}-session4Title`} placeholder="Charity Auction & Symphony Orchestra Waltz" {...register("session4Title")} />
              </Field>
              <Field label="Waktu Sesi 4" htmlFor={`${idPrefix}-session4Time`}>
                <Input id={`${idPrefix}-session4Time`} placeholder="21.45 – 23.00 WIB" {...register("session4Time")} />
              </Field>
            </div>
            <Field label="Keterangan Sesi 4" htmlFor={`${idPrefix}-session4Desc`}>
              <Input id={`${idPrefix}-session4Desc`} placeholder="Lelang karya seni filantropi dan alunan simfoni..." {...register("session4Desc")} />
            </Field>
          </div>
        </div>
      )}

      {/* TAB 5: FOTO RED CARPET & BALLROOM */}
      {activeTab === "photos" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs sm:text-sm text-stone-700">
            <p className="font-semibold text-stone-900 mb-1">3 Bingkai Foto Red Carpet & Ballroom</p>
            <p className="text-stone-500 leading-relaxed">
              Tampilkan foto piala kehormatan, kemegahan venue ballroom, dan momen prestisius dengan bingkai foil emas.
            </p>
          </div>

          {/* Preset Foto Cepat */}
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-600">
              Pilihan Preset Foto Gala & Red Carpet Cepat:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {PRESET_GALA_PHOTOS.map((photo) => {
                const isSelected = currentPhoto1 === photo.url;
                return (
                  <button
                    key={photo.name}
                    type="button"
                    onClick={() =>
                      setValue("photo1Url", photo.url, { shouldValidate: true, shouldDirty: true })
                    }
                    className={cn(
                      "relative aspect-square overflow-hidden rounded-xl border-2 transition-all text-left",
                      isSelected
                        ? "border-amber-500 ring-2 ring-amber-500/20"
                        : "border-stone-200 hover:border-stone-400",
                    )}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photo.thumb} alt={photo.name} className="h-full w-full object-cover" />
                    <div className="absolute inset-x-0 bottom-0 bg-stone-900/80 p-1.5 text-[10px] text-white truncate">
                      {photo.name}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Foto 1 */}
          <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-700">Bingkai Emas #01</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Keterangan Foto 1" htmlFor={`${idPrefix}-photo1Title`}>
                <Input id={`${idPrefix}-photo1Title`} placeholder="The Golden Pinnacle Trophy" {...register("photo1Title")} />
              </Field>
              <Field label="URL Foto 1" htmlFor={`${idPrefix}-photo1Url`}>
                <Input id={`${idPrefix}-photo1Url`} placeholder="https://images.unsplash.com/..." {...register("photo1Url")} />
              </Field>
            </div>
            <Field label="Takarir Foto 1" htmlFor={`${idPrefix}-photo1Caption`}>
              <Input id={`${idPrefix}-photo1Caption`} placeholder="Simbol keagungan dedikasi tanpa henti..." {...register("photo1Caption")} />
            </Field>
          </div>

          {/* Form Foto 2 */}
          <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-700">Bingkai Emas #02</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Keterangan Foto 2" htmlFor={`${idPrefix}-photo2Title`}>
                <Input id={`${idPrefix}-photo2Title`} placeholder="The Crystal Grand Ballroom" {...register("photo2Title")} />
              </Field>
              <Field label="URL Foto 2" htmlFor={`${idPrefix}-photo2Url`}>
                <Input id={`${idPrefix}-photo2Url`} placeholder="https://images.unsplash.com/..." {...register("photo2Url")} />
              </Field>
            </div>
            <Field label="Takarir Foto 2" htmlFor={`${idPrefix}-photo2Caption`}>
              <Input id={`${idPrefix}-photo2Caption`} placeholder="Kemegahan lampu gantung kristal..." {...register("photo2Caption")} />
            </Field>
          </div>

          {/* Form Foto 3 */}
          <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-700">Bingkai Emas #03</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Keterangan Foto 3" htmlFor={`${idPrefix}-photo3Title`}>
                <Input id={`${idPrefix}-photo3Title`} placeholder="A Prestigious Gathering" {...register("photo3Title")} />
              </Field>
              <Field label="URL Foto 3" htmlFor={`${idPrefix}-photo3Url`}>
                <Input id={`${idPrefix}-photo3Url`} placeholder="https://images.unsplash.com/..." {...register("photo3Url")} />
              </Field>
            </div>
            <Field label="Takarir Foto 3" htmlFor={`${idPrefix}-photo3Caption`}>
              <Input id={`${idPrefix}-photo3Caption`} placeholder="Momen perayaan kebersamaan para pemimpin..." {...register("photo3Caption")} />
            </Field>
          </div>
        </div>
      )}

      {/* TAB 6: DRESS CODE & DONASI AMAL */}
      {activeTab === "guide" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          {/* Dress Code */}
          <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-800">Pedoman Busana (Dress Code)</h4>
            <Field label="Tema Busana" htmlFor={`${idPrefix}-dressCodeTitle`}>
              <Input id={`${idPrefix}-dressCodeTitle`} placeholder="Strictly Black Tie & Golden Glamour" {...register("dressCodeTitle")} />
            </Field>
            <Field label="Catatan Tambahan Busana" htmlFor={`${idPrefix}-dressCodeNotes`}>
              <Input id={`${idPrefix}-dressCodeNotes`} placeholder="Tuxedo hitam dasi kupu-kupu bagi pria..." {...register("dressCodeNotes")} />
            </Field>

            <div className="space-y-3 pt-2">
              <span className="text-xs font-semibold text-stone-700">Palet Rekomendasi Busana:</span>
              <div className="space-y-3">
                <div className="rounded-xl border border-stone-200 bg-white p-3 sm:p-4 shadow-2xs">
                  <ColorPickerField label="Warna Busana 1" value={(watch("paletteColor1") as string) || "#d4af37"} onChange={(c) => setValue("paletteColor1", c, { shouldDirty: true })} />
                </div>
                <div className="rounded-xl border border-stone-200 bg-white p-3 sm:p-4 shadow-2xs">
                  <ColorPickerField label="Warna Busana 2" value={(watch("paletteColor2") as string) || "#0a0a0c"} onChange={(c) => setValue("paletteColor2", c, { shouldDirty: true })} />
                </div>
                <div className="rounded-xl border border-stone-200 bg-white p-3 sm:p-4 shadow-2xs">
                  <ColorPickerField label="Warna Busana 3" value={(watch("paletteColor3") as string) || "#581c25"} onChange={(c) => setValue("paletteColor3", c, { shouldDirty: true })} />
                </div>
                <div className="rounded-xl border border-stone-200 bg-white p-3 sm:p-4 shadow-2xs">
                  <ColorPickerField label="Warna Busana 4" value={(watch("paletteColor4") as string) || "#fbfbf7"} onChange={(c) => setValue("paletteColor4", c, { shouldDirty: true })} />
                </div>
              </div>
            </div>
          </div>

          {/* Donasi Filantropi */}
          <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-800">Donasi Filantropi & Beasiswa</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Bank / Lembaga Amal" htmlFor={`${idPrefix}-charityBankName`}>
                <Input id={`${idPrefix}-charityBankName`} placeholder="BCA / The Langham Philanthropy Fund" {...register("charityBankName")} />
              </Field>
              <Field label="Nomor Rekening Donasi" htmlFor={`${idPrefix}-charityAccountNo`}>
                <Input id={`${idPrefix}-charityAccountNo`} placeholder="8820192837" {...register("charityAccountNo")} />
              </Field>
            </div>
            <Field label="Nama Pemilik Rekening" htmlFor={`${idPrefix}-charityAccountName`}>
              <Input id={`${idPrefix}-charityAccountName`} placeholder="Yayasan Peduli Nusantara Mandiri" {...register("charityAccountName")} />
            </Field>
            <Field label="Tujuan Program Donasi" htmlFor={`${idPrefix}-charityNote`}>
              <Input id={`${idPrefix}-charityNote`} placeholder="Seluruh donasi dialokasikan untuk beasiswa pendidikan..." {...register("charityNote")} />
            </Field>
          </div>
        </div>
      )}

      {/* TAB 7: WARNA & ORKESTRA */}
      {activeTab === "theme" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          {/* Palet Warna Kemewahan - Setiap Bagian Memiliki Box Tersendiri Secara Vertikal */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-800 px-1">Palet Warna Kemewahan</h4>
            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
              <ColorPickerField
                label="Warna Latar Belakang (Obsidian)"
                value={(watch("backgroundColor") as string) || "#0a0a0e"}
                onChange={(c) => setValue("backgroundColor", c, { shouldDirty: true })}
                presets={BACKGROUND_COLOR_PRESETS}
              />
            </div>
            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
              <ColorPickerField
                label="Warna Kartu & Frame"
                value={(watch("cardColor") as string) || "#14141c"}
                onChange={(c) => setValue("cardColor", c, { shouldDirty: true })}
                presets={CARD_COLOR_PRESETS}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-800">Audio Orkestra Simfoni</h4>
            <Field
              label="Judul Musik Orkestra"
              htmlFor={`${idPrefix}-musicTitle`}
            >
              <Input
                id={`${idPrefix}-musicTitle`}
                placeholder="Grand Imperial Waltz Symphony"
                {...register("musicTitle")}
              />
            </Field>
            <Field
              label="URL Audio Background (.mp3)"
              htmlFor={`${idPrefix}-musicUrl`}
              hint="Format tautan file audio (.mp3) untuk diputar di kartu gala"
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
