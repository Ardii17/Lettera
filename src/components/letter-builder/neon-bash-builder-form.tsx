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
  Flame,
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

interface NeonBashBuilderFormProps {
  register: UseFormRegister<LetterFormValues>;
  setValue: UseFormSetValue<LetterFormValues>;
  watch: UseFormWatch<LetterFormValues>;
  errors: FieldErrors<LetterFormValues>;
  idPrefix?: string;
}

type TabType = "ticket" | "party" | "event" | "rundown" | "photos" | "guide" | "theme";

const PRESET_PARTY_PHOTOS = [
  {
    name: "Neon Portrait Cyber",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
    thumb: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Night Club Party Crowd",
    url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80",
    thumb: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Laser Confetti Vibes",
    url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80",
    thumb: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Retro Synthwave Lights",
    url: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1000&q=80",
    thumb: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=200&q=60",
  },
];

export function NeonBashBuilderForm({
  register,
  setValue,
  watch,
  errors,
  idPrefix = "neon-bash",
}: NeonBashBuilderFormProps) {
  const [activeTab, setActiveTab] = useState<TabType>("ticket");

  const tabs: Array<{ id: TabType; label: string; icon: typeof Ticket }> = [
    { id: "ticket", label: "Tiket VIP", icon: Ticket },
    { id: "party", label: "Ulang Tahun & Pesan", icon: Sparkles },
    { id: "event", label: "Waktu & Venue", icon: Calendar },
    { id: "rundown", label: "Party Schedule", icon: Clock },
    { id: "photos", label: "Polaroid Foto", icon: ImageIcon },
    { id: "guide", label: "Dress Code & Gift", icon: Flame },
    { id: "theme", label: "Warna & Beats", icon: Palette },
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
              <Icon className={cn("w-3.5 h-3.5", isActive ? "text-fuchsia-600" : "text-stone-400")} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: TIKET VIP & COVER */}
      {activeTab === "ticket" && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          <div className="bg-fuchsia-50/80 border border-fuchsia-200 rounded-xl p-4 text-xs sm:text-sm text-fuchsia-950">
            <p className="font-semibold text-fuchsia-900 mb-1">Tiket Konser VIP & All-Access Pass</p>
            <p className="text-fuchsia-800/80 leading-relaxed">
              Atur kode tiket festival, lencana stempel VIP All-Access, dan nama sahabat yang diundang khusus.
            </p>
          </div>

          <Field
            label="Nama Tamu VIP (Penerima)"
            htmlFor={`${idPrefix}-recipientName`}
            error={errors.recipientName?.message}
            required
            hint="Sapaan dinamis juga dapat diisi lewat URL ?to=NamaSahabat"
          >
            <Input
              id={`${idPrefix}-recipientName`}
              placeholder="Sahabat Terdekat / VIP Guest"
              {...register("recipientName", { required: "Nama tamu wajib diisi" })}
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Kode Tiket VIP Pass"
              htmlFor={`${idPrefix}-ticketCode`}
            >
              <Input
                id={`${idPrefix}-ticketCode`}
                placeholder="NEON-PASS-2026-VIP"
                {...register("ticketCode")}
              />
            </Field>

            <Field
              label="Lencana Stempel VIP"
              htmlFor={`${idPrefix}-vipBadge`}
            >
              <Input
                id={`${idPrefix}-vipBadge`}
                placeholder="ALL ACCESS VIP // LEVEL 17"
                {...register("vipBadge")}
              />
            </Field>
          </div>

          <Field
            label="Subjudul Pesta / Tagline Acara"
            htmlFor={`${idPrefix}-partySub`}
          >
            <Input
              id={`${idPrefix}-partySub`}
              placeholder="Sweet 17 Cyberpunk Odyssey & Rooftop Rave"
              {...register("partySub")}
            />
          </Field>
        </div>
      )}

      {/* TAB 2: ULANG TAHUN & PESAN */}
      {activeTab === "party" && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          <Field
            label="Judul Utama Pesta"
            htmlFor={`${idPrefix}-partyTitle`}
            error={errors.partyTitle?.message}
            required
          >
            <Input
              id={`${idPrefix}-partyTitle`}
              placeholder="NEON ODYSSEY: Natasha's 17th Birthday"
              {...register("partyTitle", { required: "Judul pesta wajib diisi" })}
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Nama Yang Berulang Tahun"
              htmlFor={`${idPrefix}-celebrantName`}
              error={errors.celebrantName?.message}
              required
            >
              <Input
                id={`${idPrefix}-celebrantName`}
                placeholder="Natasha Aurelia"
                {...register("celebrantName", { required: "Nama peraya wajib diisi" })}
              />
            </Field>

            <Field
              label="Usia Perayaan (Milestone)"
              htmlFor={`${idPrefix}-ageCelebration`}
            >
              <Input
                id={`${idPrefix}-ageCelebration`}
                placeholder="Sweet Seventeen (17th)"
                {...register("ageCelebration")}
              />
            </Field>
          </div>

          <Field
            label="Pesan Undangan Pesta"
            htmlFor={`${idPrefix}-partyMessage`}
            error={errors.partyMessage?.message}
            required
          >
            <Textarea
              id={`${idPrefix}-partyMessage`}
              rows={5}
              placeholder="Satu malam penuh cahaya neon, dentuman beat terbaik, dan momen tak terlupakan..."
              {...register("partyMessage", { required: "Pesan pesta wajib diisi" })}
            />
          </Field>

          <Field
            label="Nama Pengundang / Host"
            htmlFor={`${idPrefix}-senderName`}
            error={errors.senderName?.message}
            required
          >
            <Input
              id={`${idPrefix}-senderName`}
              placeholder="Natasha & The Crew"
              {...register("senderName", { required: "Nama pengundang wajib diisi" })}
            />
          </Field>
        </div>
      )}

      {/* TAB 3: WAKTU & VENUE */}
      {activeTab === "event" && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Hari & Tanggal Pesta"
              htmlFor={`${idPrefix}-eventDate`}
              required
            >
              <Input
                id={`${idPrefix}-eventDate`}
                placeholder="Jumat, 13 November 2026"
                {...register("eventDate", { required: "Tanggal acara wajib diisi" })}
              />
            </Field>

            <Field
              label="Waktu Acara"
              htmlFor={`${idPrefix}-eventTime`}
              required
            >
              <Input
                id={`${idPrefix}-eventTime`}
                placeholder="19.00 WIB s.d. Tengah Malam"
                {...register("eventTime", { required: "Waktu pesta wajib diisi" })}
              />
            </Field>
          </div>

          <Field
            label="Waktu ISO untuk Countdown Timer"
            htmlFor={`${idPrefix}-targetDateIso`}
            hint="Format: YYYY-MM-DDTHH:mm:ss (contoh: 2026-11-13T19:00:00). Menggerakkan countdown digital."
          >
            <Input
              id={`${idPrefix}-targetDateIso`}
              placeholder="2026-11-13T19:00:00"
              {...register("targetDateIso")}
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Nama Venue / Rooftop"
              htmlFor={`${idPrefix}-venueName`}
              required
            >
              <Input
                id={`${idPrefix}-venueName`}
                placeholder="Skyline Neon Lounge & Rooftop"
                {...register("venueName", { required: "Nama venue wajib diisi" })}
              />
            </Field>

            <Field
              label="Lantai / Area Khusus"
              htmlFor={`${idPrefix}-venueFloor`}
            >
              <Input
                id={`${idPrefix}-venueFloor`}
                placeholder="32nd Floor Sky Deck & Poolside Foyer"
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
              placeholder="Jl. Jend. Sudirman Kav. 52-53, Kawasan SCBD, Jakarta Selatan"
              {...register("venueAddress", { required: "Alamat venue wajib diisi" })}
            />
          </Field>

          <Field
            label="Tautan Google Maps"
            htmlFor={`${idPrefix}-mapsUrl`}
          >
            <Input
              id={`${idPrefix}-mapsUrl`}
              placeholder="https://maps.google.com/?q=SCBD+Jakarta"
              {...register("mapsUrl")}
            />
          </Field>
        </div>
      )}

      {/* TAB 4: PARTY SCHEDULE (4 SESI) */}
      {activeTab === "rundown" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs sm:text-sm text-stone-700">
            <p className="font-semibold text-stone-900 mb-1">Rundown 4 Sesi Pesta</p>
            <p className="text-stone-500 leading-relaxed">
              Atur urutan acara mulai dari karpet merah & glow face painting, santap santai, pemotongan kue sweet 17, hingga midnight rave finale.
            </p>
          </div>

          {/* Sesi 1 */}
          <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-cyan-600">Sesi 1: Red Carpet & Glow Art</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Judul Sesi 1" htmlFor={`${idPrefix}-session1Title`}>
                <Input id={`${idPrefix}-session1Title`} placeholder="VIP Red Carpet & Neon Face Art" {...register("session1Title")} />
              </Field>
              <Field label="Waktu Sesi 1" htmlFor={`${idPrefix}-session1Time`}>
                <Input id={`${idPrefix}-session1Time`} placeholder="19.00 – 19.45 WIB" {...register("session1Time")} />
              </Field>
            </div>
            <Field label="Keterangan Sesi 1" htmlFor={`${idPrefix}-session1Desc`}>
              <Input id={`${idPrefix}-session1Desc`} placeholder="Registrasi tamu VIP, glow face-painting..." {...register("session1Desc")} />
            </Field>
          </div>

          {/* Sesi 2 */}
          <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-fuchsia-600">Sesi 2: Warm-Up DJ Set & Feast</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Judul Sesi 2" htmlFor={`${idPrefix}-session2Title`}>
                <Input id={`${idPrefix}-session2Title`} placeholder="Warm-Up DJ Set & Finger Food Feast" {...register("session2Title")} />
              </Field>
              <Field label="Waktu Sesi 2" htmlFor={`${idPrefix}-session2Time`}>
                <Input id={`${idPrefix}-session2Time`} placeholder="19.45 – 20.45 WIB" {...register("session2Time")} />
              </Field>
            </div>
            <Field label="Keterangan Sesi 2" htmlFor={`${idPrefix}-session2Desc`}>
              <Input id={`${idPrefix}-session2Desc`} placeholder="Iringan musik synthwave chill, santap gourmet..." {...register("session2Desc")} />
            </Field>
          </div>

          {/* Sesi 3 */}
          <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-600">Sesi 3: Sweet 17 Toast & Laser Show</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Judul Sesi 3" htmlFor={`${idPrefix}-session3Title`}>
                <Input id={`${idPrefix}-session3Title`} placeholder="17th Birthday Toast & Laser Show" {...register("session3Title")} />
              </Field>
              <Field label="Waktu Sesi 3" htmlFor={`${idPrefix}-session3Time`}>
                <Input id={`${idPrefix}-session3Time`} placeholder="20.45 – 21.30 WIB" {...register("session3Time")} />
              </Field>
            </div>
            <Field label="Keterangan Sesi 3" htmlFor={`${idPrefix}-session3Desc`}>
              <Input id={`${idPrefix}-session3Desc`} placeholder="Momen tiup lilin utama ke-17, video kenangan..." {...register("session3Desc")} />
            </Field>
          </div>

          {/* Sesi 4 */}
          <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-emerald-600">Sesi 4: Midnight Rave Finale</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Judul Sesi 4" htmlFor={`${idPrefix}-session4Title`}>
                <Input id={`${idPrefix}-session4Title`} placeholder="Midnight Rave & Dance Floor Finale" {...register("session4Title")} />
              </Field>
              <Field label="Waktu Sesi 4" htmlFor={`${idPrefix}-session4Time`}>
                <Input id={`${idPrefix}-session4Time`} placeholder="21.30 – 23.30 WIB" {...register("session4Time")} />
              </Field>
            </div>
            <Field label="Keterangan Sesi 4" htmlFor={`${idPrefix}-session4Desc`}>
              <Input id={`${idPrefix}-session4Desc`} placeholder="Pesta dansa bersama guest star DJ..." {...register("session4Desc")} />
            </Field>
          </div>
        </div>
      )}

      {/* TAB 5: POLAROID FOTO RETRO GLOW */}
      {activeTab === "photos" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs sm:text-sm text-stone-700">
            <p className="font-semibold text-stone-900 mb-1">3 Foto Polaroid Retro Glow</p>
            <p className="text-stone-500 leading-relaxed">
              Tampilkan foto-foto terbaik berbingkai polaroid gelap dengan aksen neon glow yang memukau.
            </p>
          </div>

          {/* Preset Foto Cepat */}
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-600">
              Pilihan Preset Foto Party Cepat:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {PRESET_PARTY_PHOTOS.map((photo) => {
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
                        ? "border-fuchsia-600 ring-2 ring-fuchsia-500/20"
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
            <h4 className="text-xs font-semibold uppercase tracking-wider text-cyan-600">Foto Polaroid #01</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Keterangan Foto 1" htmlFor={`${idPrefix}-photo1Title`}>
                <Input id={`${idPrefix}-photo1Title`} placeholder="Neon Cyber Rebel" {...register("photo1Title")} />
              </Field>
              <Field label="URL Foto Polaroid 1" htmlFor={`${idPrefix}-photo1Url`}>
                <Input id={`${idPrefix}-photo1Url`} placeholder="https://images.unsplash.com/..." {...register("photo1Url")} />
              </Field>
            </div>
            <Field label="Caption Foto 1" htmlFor={`${idPrefix}-photo1Caption`}>
              <Input id={`${idPrefix}-photo1Caption`} placeholder="Ready to rock the 17th chapter..." {...register("photo1Caption")} />
            </Field>
          </div>

          {/* Form Foto 2 */}
          <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-fuchsia-600">Foto Polaroid #02</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Keterangan Foto 2" htmlFor={`${idPrefix}-photo2Title`}>
                <Input id={`${idPrefix}-photo2Title`} placeholder="City Skyline Glow" {...register("photo2Title")} />
              </Field>
              <Field label="URL Foto Polaroid 2" htmlFor={`${idPrefix}-photo2Url`}>
                <Input id={`${idPrefix}-photo2Url`} placeholder="https://images.unsplash.com/..." {...register("photo2Url")} />
              </Field>
            </div>
            <Field label="Caption Foto 2" htmlFor={`${idPrefix}-photo2Caption`}>
              <Input id={`${idPrefix}-photo2Caption`} placeholder="Midnight conversations under neon towers..." {...register("photo2Caption")} />
            </Field>
          </div>

          {/* Form Foto 3 */}
          <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-600">Foto Polaroid #03</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Keterangan Foto 3" htmlFor={`${idPrefix}-photo3Title`}>
                <Input id={`${idPrefix}-photo3Title`} placeholder="The Best Squad" {...register("photo3Title")} />
              </Field>
              <Field label="URL Foto Polaroid 3" htmlFor={`${idPrefix}-photo3Url`}>
                <Input id={`${idPrefix}-photo3Url`} placeholder="https://images.unsplash.com/..." {...register("photo3Url")} />
              </Field>
            </div>
            <Field label="Caption Foto 3" htmlFor={`${idPrefix}-photo3Caption`}>
              <Input id={`${idPrefix}-photo3Caption`} placeholder="Good vibes only! Can't wait to dance..." {...register("photo3Caption")} />
            </Field>
          </div>
        </div>
      )}

      {/* TAB 6: DRESS CODE & KADO DIGITAL */}
      {activeTab === "guide" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          {/* Dress Code */}
          <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-800">Panduan Busana (Dress Code)</h4>
            <Field label="Tema Dress Code" htmlFor={`${idPrefix}-dressCodeTitle`}>
              <Input id={`${idPrefix}-dressCodeTitle`} placeholder="Y2K Cyberpunk / Neon Glow in the Dark" {...register("dressCodeTitle")} />
            </Field>
            <Field label="Catatan Tambahan Busana" htmlFor={`${idPrefix}-dressCodeNotes`}>
              <Input id={`${idPrefix}-dressCodeNotes`} placeholder="Kenakan busana gelap dengan sentuhan warna neon terang..." {...register("dressCodeNotes")} />
            </Field>

            <div className="space-y-3 pt-2">
              <span className="text-xs font-semibold text-stone-700">Palet Rekomendasi Busana:</span>
              <div className="space-y-3">
                <div className="rounded-xl border border-stone-200 bg-white p-3 sm:p-4 shadow-2xs">
                  <ColorPickerField label="Warna Busana 1" value={(watch("paletteColor1") as string) || "#00f2fe"} onChange={(c) => setValue("paletteColor1", c, { shouldDirty: true })} />
                </div>
                <div className="rounded-xl border border-stone-200 bg-white p-3 sm:p-4 shadow-2xs">
                  <ColorPickerField label="Warna Busana 2" value={(watch("paletteColor2") as string) || "#ff007f"} onChange={(c) => setValue("paletteColor2", c, { shouldDirty: true })} />
                </div>
                <div className="rounded-xl border border-stone-200 bg-white p-3 sm:p-4 shadow-2xs">
                  <ColorPickerField label="Warna Busana 3" value={(watch("paletteColor3") as string) || "#39ff14"} onChange={(c) => setValue("paletteColor3", c, { shouldDirty: true })} />
                </div>
                <div className="rounded-xl border border-stone-200 bg-white p-3 sm:p-4 shadow-2xs">
                  <ColorPickerField label="Warna Busana 4" value={(watch("paletteColor4") as string) || "#12121e"} onChange={(c) => setValue("paletteColor4", c, { shouldDirty: true })} />
                </div>
              </div>
            </div>
          </div>

          {/* Kado Digital E-Wallet */}
          <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-800">Amplop Hadiah Digital / E-Wallet</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Bank / E-Wallet" htmlFor={`${idPrefix}-giftWalletType`}>
                <Input id={`${idPrefix}-giftWalletType`} placeholder="BCA / GoPay / Dana" {...register("giftWalletType")} />
              </Field>
              <Field label="Nomor Rekening / No. HP" htmlFor={`${idPrefix}-giftAccountNo`}>
                <Input id={`${idPrefix}-giftAccountNo`} placeholder="081298765432" {...register("giftAccountNo")} />
              </Field>
            </div>
            <Field label="Nama Pemilik Akun" htmlFor={`${idPrefix}-giftAccountName`}>
              <Input id={`${idPrefix}-giftAccountName`} placeholder="Natasha Aurelia" {...register("giftAccountName")} />
            </Field>
            <Field label="Pesan Kado / Hadiah" htmlFor={`${idPrefix}-giftNote`}>
              <Input id={`${idPrefix}-giftNote`} placeholder="Kehadiran dan kebersamaan kalian adalah kado paling berharga..." {...register("giftNote")} />
            </Field>
          </div>
        </div>
      )}

      {/* TAB 7: WARNA & BEATS */}
      {activeTab === "theme" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          {/* Palet Warna Pesta - Setiap Bagian Memiliki Box Tersendiri Secara Vertikal */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-800 px-1">Palet Warna Pesta</h4>
            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
              <ColorPickerField
                label="Warna Latar Belakang (Dark Deck)"
                value={(watch("backgroundColor") as string) || "#090910"}
                onChange={(c) => setValue("backgroundColor", c, { shouldDirty: true })}
                presets={BACKGROUND_COLOR_PRESETS}
              />
            </div>
            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
              <ColorPickerField
                label="Warna Kartu Pesta"
                value={(watch("cardColor") as string) || "#12121e"}
                onChange={(c) => setValue("cardColor", c, { shouldDirty: true })}
                presets={CARD_COLOR_PRESETS}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-800">Audio Party Synthwave</h4>
            <Field
              label="Judul Musik Party"
              htmlFor={`${idPrefix}-musicTitle`}
            >
              <Input
                id={`${idPrefix}-musicTitle`}
                placeholder="Synthwave Cyber Odyssey Beat"
                {...register("musicTitle")}
              />
            </Field>
            <Field
              label="URL Audio Background (.mp3)"
              htmlFor={`${idPrefix}-musicUrl`}
              hint="Format file audio (.mp3) untuk diputar di kartu pesta"
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
