"use client";

import { useState } from "react";
import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import {
  Heart,
  Calendar,
  Image as ImageIcon,
  Gift,
  Palette,
  Users,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Field, Input, Textarea } from "@/components/ui/field";
import { ImageUploadField } from "@/components/ui/image-upload-field";
import { ColorPickerField } from "@/components/ui/color-picker-field";
import {
  WEDDING_COLOR_PRESETS,
  BACKGROUND_COLOR_PRESETS,
  CARD_COLOR_PRESETS,
  TEXT_COLOR_PRESETS,
} from "@/templates/color-presets";
import { cn } from "@/lib/utils/cn";
import type { LetterFormValues } from "./dynamic-form";

interface WeddingBuilderFormProps {
  register: UseFormRegister<LetterFormValues>;
  setValue: UseFormSetValue<LetterFormValues>;
  watch: UseFormWatch<LetterFormValues>;
  errors: FieldErrors<LetterFormValues>;
  idPrefix?: string;
}

type TabType = "cover" | "couple" | "events" | "story" | "gift" | "theme";

export function WeddingBuilderForm({
  register,
  setValue,
  watch,
  errors,
  idPrefix = "wedding",
}: WeddingBuilderFormProps) {
  const [activeTab, setActiveTab] = useState<TabType>("cover");

  const tabs: Array<{ id: TabType; label: string; icon: typeof Heart }> = [
    { id: "cover", label: "Cover & Tamu", icon: Heart },
    { id: "couple", label: "Mempelai", icon: Users },
    { id: "events", label: "Acara", icon: Calendar },
    { id: "story", label: "Kisah & Foto", icon: ImageIcon },
    { id: "gift", label: "Amplop Digital", icon: Gift },
    { id: "theme", label: "Warna & Musik", icon: Palette },
  ];

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className="flex gap-1.5 overflow-x-auto rounded-xl border border-line bg-page-deep p-1.5 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition-all",
                isActive
                  ? "bg-paper text-ink shadow-sm ring-1 ring-line"
                  : "text-ink-soft hover:text-ink hover:bg-paper/50",
              )}
            >
              <Icon className={cn("h-3.5 w-3.5", isActive ? "text-amber-600" : "text-ink-muted")} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: COVER & TAMU */}
      {/* ========================================================================= */}
      {activeTab === "cover" && (
        <div className="space-y-5">
          <div className="rounded-xl border border-amber-200/60 bg-amber-50/40 p-4 text-xs text-amber-900">
            <p className="font-semibold">💡 Tips Nama Tamu Personal</p>
            <p className="mt-1 leading-relaxed">
              Nama tamu di bawah ini adalah nama default. Anda juga dapat membagikan undangan dengan nama kustom untuk setiap orang secara instan menggunakan parameter URL <code className="font-mono font-bold">?to=NamaTamu</code>.
            </p>
          </div>

          <Field
            label="Nama Tamu Default (Penerima)"
            htmlFor={`${idPrefix}-recipientName`}
            error={errors.recipientName?.message as string}
            hint="Tampil saat undangan dibuka tanpa query parameter khusus"
            required
          >
            <Input
              id={`${idPrefix}-recipientName`}
              placeholder="Bapak / Ibu / Saudara/i"
              {...register("recipientName")}
            />
          </Field>

          <Field
            label="Judul Undangan"
            htmlFor={`${idPrefix}-weddingTitle`}
            error={errors.weddingTitle?.message as string}
            required
          >
            <Input
              id={`${idPrefix}-weddingTitle`}
              placeholder="The Wedding of Dimas & Annisa"
              {...register("weddingTitle")}
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Panggilan Pria"
              htmlFor={`${idPrefix}-groomNickname`}
              error={errors.groomNickname?.message as string}
              required
            >
              <Input
                id={`${idPrefix}-groomNickname`}
                placeholder="Dimas"
                {...register("groomNickname")}
              />
            </Field>

            <Field
              label="Panggilan Wanita"
              htmlFor={`${idPrefix}-brideNickname`}
              error={errors.brideNickname?.message as string}
              required
            >
              <Input
                id={`${idPrefix}-brideNickname`}
                placeholder="Annisa"
                {...register("brideNickname")}
              />
            </Field>
          </div>

          <Field
            label="Tanggal Pernikahan (untuk Countdown)"
            htmlFor={`${idPrefix}-weddingDate`}
            error={errors.weddingDate?.message as string}
            hint="Format YYYY-MM-DD"
            required
          >
            <Input
              id={`${idPrefix}-weddingDate`}
              type="date"
              {...register("weddingDate")}
            />
          </Field>

          <ImageUploadField
            label="Foto Cover Utama"
            value={(watch("heroImage") as string) || ""}
            onChange={(url) => setValue("heroImage", url, { shouldValidate: true })}
            helperText="Foto beresolusi tinggi sebagai latar belakang sampul depan undangan."
          />

          <Field
            label="Kutipan Ayat Suci / Kata Mutiara"
            htmlFor={`${idPrefix}-weddingQuote`}
            error={errors.weddingQuote?.message as string}
          >
            <Textarea
              id={`${idPrefix}-weddingQuote`}
              rows={3}
              placeholder="Dan di antara tanda-tanda kebesaran-Nya..."
              {...register("weddingQuote")}
            />
          </Field>

          <Field
            label="Sumber Kutipan"
            htmlFor={`${idPrefix}-quoteSource`}
            error={errors.quoteSource?.message as string}
          >
            <Input
              id={`${idPrefix}-quoteSource`}
              placeholder="QS. Ar-Rum: 21"
              {...register("quoteSource")}
            />
          </Field>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: MEMPELAI */}
      {/* ========================================================================= */}
      {activeTab === "couple" && (
        <div className="space-y-6">
          {/* Mempelai Pria */}
          <div className="rounded-2xl border border-line bg-paper p-4 sm:p-5 space-y-4">
            <h4 className="text-sm font-bold text-ink">Mempelai Pria</h4>
            <Field
              label="Nama Lengkap Pria"
              htmlFor={`${idPrefix}-groomFullName`}
              error={errors.groomFullName?.message as string}
              required
            >
              <Input
                id={`${idPrefix}-groomFullName`}
                placeholder="Dimas Arya Prasetya, S.T."
                {...register("groomFullName")}
              />
            </Field>

            <Field
              label="Keterangan Keluarga / Orang Tua"
              htmlFor={`${idPrefix}-groomParents`}
              error={errors.groomParents?.message as string}
            >
              <Input
                id={`${idPrefix}-groomParents`}
                placeholder="Putra pertama dari Bpk. Bambang Prasetya & Ibu Sri Wahyuni"
                {...register("groomParents")}
              />
            </Field>

            <ImageUploadField
              label="Foto Mempelai Pria"
              value={(watch("groomPhoto") as string) || ""}
              onChange={(url) => setValue("groomPhoto", url, { shouldValidate: true })}
            />

            <Field
              label="Instagram Pria (Opsional)"
              htmlFor={`${idPrefix}-groomInstagram`}
              error={errors.groomInstagram?.message as string}
            >
              <Input
                id={`${idPrefix}-groomInstagram`}
                placeholder="@dimasarya"
                {...register("groomInstagram")}
              />
            </Field>
          </div>

          {/* Mempelai Wanita */}
          <div className="rounded-2xl border border-line bg-paper p-4 sm:p-5 space-y-4">
            <h4 className="text-sm font-bold text-ink">Mempelai Wanita</h4>
            <Field
              label="Nama Lengkap Wanita"
              htmlFor={`${idPrefix}-brideFullName`}
              error={errors.brideFullName?.message as string}
              required
            >
              <Input
                id={`${idPrefix}-brideFullName`}
                placeholder="Annisa Putri Larasati, S.Ds."
                {...register("brideFullName")}
              />
            </Field>

            <Field
              label="Keterangan Keluarga / Orang Tua"
              htmlFor={`${idPrefix}-brideParents`}
              error={errors.brideParents?.message as string}
            >
              <Input
                id={`${idPrefix}-brideParents`}
                placeholder="Putri kedua dari Bpk. Hendro Larasati & Ibu Ratna Dewi"
                {...register("brideParents")}
              />
            </Field>

            <ImageUploadField
              label="Foto Mempelai Wanita"
              value={(watch("bridePhoto") as string) || ""}
              onChange={(url) => setValue("bridePhoto", url, { shouldValidate: true })}
            />

            <Field
              label="Instagram Wanita (Opsional)"
              htmlFor={`${idPrefix}-brideInstagram`}
              error={errors.brideInstagram?.message as string}
            >
              <Input
                id={`${idPrefix}-brideInstagram`}
                placeholder="@annisalarasati"
                {...register("brideInstagram")}
              />
            </Field>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: ACARA (AKAD & RESEPSI) */}
      {/* ========================================================================= */}
      {activeTab === "events" && (
        <div className="space-y-6">
          {/* Acara 1: Akad Nikah */}
          <div className="rounded-2xl border border-line bg-paper p-4 sm:p-5 space-y-4">
            <h4 className="text-sm font-bold text-ink">Acara 1: Akad Nikah</h4>
            <Field label="Nama Acara" htmlFor={`${idPrefix}-akadTitle`}>
              <Input id={`${idPrefix}-akadTitle`} placeholder="Akad Nikah" {...register("akadTitle")} />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Hari & Tanggal" htmlFor={`${idPrefix}-akadDate`}>
                <Input id={`${idPrefix}-akadDate`} placeholder="Sabtu, 24 Oktober 2026" {...register("akadDate")} />
              </Field>
              <Field label="Waktu Acara" htmlFor={`${idPrefix}-akadTime`}>
                <Input id={`${idPrefix}-akadTime`} placeholder="08.00 - 10.00 WIB" {...register("akadTime")} />
              </Field>
            </div>
            <Field label="Nama Tempat / Gedung" htmlFor={`${idPrefix}-akadLocation`}>
              <Input id={`${idPrefix}-akadLocation`} placeholder="Masjid Agung Al-Barkah" {...register("akadLocation")} />
            </Field>
            <Field label="Alamat Lengkap" htmlFor={`${idPrefix}-akadAddress`}>
              <Textarea id={`${idPrefix}-akadAddress`} rows={2} placeholder="Jl. Veteran No. 45..." {...register("akadAddress")} />
            </Field>
            <Field label="Tautan Google Maps" htmlFor={`${idPrefix}-akadMapsUrl`}>
              <Input id={`${idPrefix}-akadMapsUrl`} placeholder="https://maps.google.com/?q=..." {...register("akadMapsUrl")} />
            </Field>
          </div>

          {/* Acara 2: Resepsi */}
          <div className="rounded-2xl border border-line bg-paper p-4 sm:p-5 space-y-4">
            <h4 className="text-sm font-bold text-ink">Acara 2: Resepsi Pernikahan</h4>
            <Field label="Nama Acara" htmlFor={`${idPrefix}-resepsiTitle`}>
              <Input id={`${idPrefix}-resepsiTitle`} placeholder="Resepsi Pernikahan" {...register("resepsiTitle")} />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Hari & Tanggal" htmlFor={`${idPrefix}-resepsiDate`}>
                <Input id={`${idPrefix}-resepsiDate`} placeholder="Sabtu, 24 Oktober 2026" {...register("resepsiDate")} />
              </Field>
              <Field label="Waktu Acara" htmlFor={`${idPrefix}-resepsiTime`}>
                <Input id={`${idPrefix}-resepsiTime`} placeholder="11.00 - 15.00 WIB" {...register("resepsiTime")} />
              </Field>
            </div>
            <Field label="Nama Tempat / Gedung" htmlFor={`${idPrefix}-resepsiLocation`}>
              <Input id={`${idPrefix}-resepsiLocation`} placeholder="Grand Ballroom Hotel Horison" {...register("resepsiLocation")} />
            </Field>
            <Field label="Alamat Lengkap" htmlFor={`${idPrefix}-resepsiAddress`}>
              <Textarea id={`${idPrefix}-resepsiAddress`} rows={2} placeholder="Jl. Jenderal Sudirman..." {...register("resepsiAddress")} />
            </Field>
            <Field label="Tautan Google Maps" htmlFor={`${idPrefix}-resepsiMapsUrl`}>
              <Input id={`${idPrefix}-resepsiMapsUrl`} placeholder="https://maps.google.com/?q=..." {...register("resepsiMapsUrl")} />
            </Field>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: KISAH & GALERI */}
      {/* ========================================================================= */}
      {activeTab === "story" && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-line bg-paper p-4 sm:p-5 space-y-4">
            <h4 className="text-sm font-bold text-ink">Linimasa Kisah Cinta</h4>
            <Field label="Judul Linimasa" htmlFor={`${idPrefix}-storyTitle`}>
              <Input id={`${idPrefix}-storyTitle`} placeholder="Perjalanan Kisah Kita" {...register("storyTitle")} />
            </Field>

            {/* Momen 1 */}
            <div className="rounded-xl border border-line p-3 space-y-3">
              <p className="text-xs font-semibold text-ink-soft">Momen 1 (Pertemuan)</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <Input placeholder="12 Januari 2021" {...register("story1Date")} />
                <Input placeholder="Pertemuan Pertama" {...register("story1Title")} />
              </div>
              <Textarea rows={2} placeholder="Cerita singkat pertemuan..." {...register("story1Desc")} />
            </div>

            {/* Momen 2 */}
            <div className="rounded-xl border border-line p-3 space-y-3">
              <p className="text-xs font-semibold text-ink-soft">Momen 2 (Komitmen)</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <Input placeholder="18 Juni 2023" {...register("story2Date")} />
                <Input placeholder="Komitmen Bersama" {...register("story2Title")} />
              </div>
              <Textarea rows={2} placeholder="Cerita singkat komitmen..." {...register("story2Desc")} />
            </div>

            {/* Momen 3 */}
            <div className="rounded-xl border border-line p-3 space-y-3">
              <p className="text-xs font-semibold text-ink-soft">Momen 3 (Lamaran / Menuju Hari H)</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <Input placeholder="15 Januari 2026" {...register("story3Date")} />
                <Input placeholder="Menuju Ikatan Suci" {...register("story3Title")} />
              </div>
              <Textarea rows={2} placeholder="Cerita singkat lamaran..." {...register("story3Desc")} />
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-paper p-4 sm:p-5 space-y-4">
            <h4 className="text-sm font-bold text-ink">Galeri Foto Pre-wedding</h4>
            <Field label="Judul Galeri" htmlFor={`${idPrefix}-galleryTitle`}>
              <Input id={`${idPrefix}-galleryTitle`} placeholder="Galeri Kenangan Indah" {...register("galleryTitle")} />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <ImageUploadField
                label="Foto 1"
                value={(watch("galleryImg1") as string) || ""}
                onChange={(url) => setValue("galleryImg1", url, { shouldValidate: true })}
              />
              <ImageUploadField
                label="Foto 2"
                value={(watch("galleryImg2") as string) || ""}
                onChange={(url) => setValue("galleryImg2", url, { shouldValidate: true })}
              />
              <ImageUploadField
                label="Foto 3"
                value={(watch("galleryImg3") as string) || ""}
                onChange={(url) => setValue("galleryImg3", url, { shouldValidate: true })}
              />
              <ImageUploadField
                label="Foto 4"
                value={(watch("galleryImg4") as string) || ""}
                onChange={(url) => setValue("galleryImg4", url, { shouldValidate: true })}
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: HADIAH & AMPLOP DIGITAL */}
      {/* ========================================================================= */}
      {activeTab === "gift" && (
        <div className="space-y-5">
          <Field label="Judul Amplop Digital" htmlFor={`${idPrefix}-giftTitle`}>
            <Input id={`${idPrefix}-giftTitle`} placeholder="Tanda Kasih & Hadiah Pernikahan" {...register("giftTitle")} />
          </Field>

          <Field label="Catatan Hadiah" htmlFor={`${idPrefix}-giftNote`}>
            <Textarea
              id={`${idPrefix}-giftNote`}
              rows={2}
              placeholder="Doa restu Anda adalah karunia terindah..."
              {...register("giftNote")}
            />
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Rekening 1 */}
            <div className="rounded-xl border border-line p-4 space-y-3 bg-page">
              <p className="text-xs font-bold text-ink">Rekening Bank / E-Wallet 1</p>
              <Input placeholder="Nama Bank (misal: BCA)" {...register("bankName1")} />
              <Input placeholder="Nomor Rekening" {...register("bankAccount1")} />
              <Input placeholder="Atas Nama Pemilik" {...register("bankHolder1")} />
            </div>

            {/* Rekening 2 */}
            <div className="rounded-xl border border-line p-4 space-y-3 bg-page">
              <p className="text-xs font-bold text-ink">Rekening Bank / E-Wallet 2</p>
              <Input placeholder="Nama Bank (misal: Mandiri)" {...register("bankName2")} />
              <Input placeholder="Nomor Rekening" {...register("bankAccount2")} />
              <Input placeholder="Atas Nama Pemilik" {...register("bankHolder2")} />
            </div>
          </div>

          <Field label="Alamat Pengiriman Kado Fisik (Opsional)" htmlFor={`${idPrefix}-giftAddress`}>
            <Textarea
              id={`${idPrefix}-giftAddress`}
              rows={2}
              placeholder="Jl. Veteran No. 45... (Penerima: Dimas & Annisa)"
              {...register("giftAddress")}
            />
          </Field>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: WARNA & MUSIK */}
      {/* ========================================================================= */}
      {activeTab === "theme" && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-line bg-paper p-4 sm:p-5 space-y-4">
            <h4 className="text-sm font-bold text-ink">Audio Musik Latar</h4>
            <Field label="Judul Lagu" htmlFor={`${idPrefix}-musicTitle`}>
              <Input
                id={`${idPrefix}-musicTitle`}
                placeholder="A Thousand Years (Piano Romantic)"
                {...register("musicTitle")}
              />
            </Field>

            <Field
              label="Tautan Audio (.mp3)"
              htmlFor={`${idPrefix}-bgMusicUrl`}
              hint="Masukkan URL langsung ke file .mp3"
            >
              <Input
                id={`${idPrefix}-bgMusicUrl`}
                placeholder="https://cdn.pixabay.com/download/audio/..."
                {...register("bgMusicUrl")}
              />
            </Field>
          </div>

          <div className="rounded-2xl border border-line bg-paper p-4 sm:p-5 space-y-4">
            <h4 className="text-sm font-bold text-ink">Palet Warna</h4>
            <ColorPickerField
              label="Warna Aksen Utama (Gold / Tombol / Monogram)"
              value={(watch("primaryColor") as string) || "#b48c36"}
              onChange={(hex) => setValue("primaryColor", hex, { shouldValidate: true })}
              presets={WEDDING_COLOR_PRESETS}
            />

            <ColorPickerField
              label="Warna Latar Belakang Undangan"
              value={(watch("backgroundColor") as string) || "#faf7f2"}
              onChange={(hex) => setValue("backgroundColor", hex, { shouldValidate: true })}
              presets={BACKGROUND_COLOR_PRESETS}
            />

            <ColorPickerField
              label="Warna Wadah Kartu & Acara"
              value={(watch("cardColor") as string) || "#ffffff"}
              onChange={(hex) => setValue("cardColor", hex, { shouldValidate: true })}
              presets={CARD_COLOR_PRESETS}
            />

            <ColorPickerField
              label="Warna Teks Judul & Nama Mempelai"
              value={(watch("textColor") as string) || "#2a241e"}
              onChange={(hex) => setValue("textColor", hex, { shouldValidate: true })}
              presets={TEXT_COLOR_PRESETS}
            />
          </div>
        </div>
      )}

      {/* Navigasi Next/Prev Tab Cepat */}
      <div className="flex items-center justify-between border-t border-line pt-4">
        {activeTab !== "cover" ? (
          <button
            type="button"
            onClick={() => {
              const idx = tabs.findIndex((t) => t.id === activeTab);
              if (idx > 0) setActiveTab(tabs[idx - 1].id);
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-soft hover:text-ink"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Bagian Sebelumnya</span>
          </button>
        ) : <div />}

        {activeTab !== "theme" ? (
          <button
            type="button"
            onClick={() => {
              const idx = tabs.findIndex((t) => t.id === activeTab);
              if (idx < tabs.length - 1) setActiveTab(tabs[idx + 1].id);
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-seal-600 hover:text-seal-700"
          >
            <span>Lanjut ke Bagian Berikutnya</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        ) : <div />}
      </div>
    </div>
  );
}
