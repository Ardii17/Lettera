"use client";

import { useState } from "react";
import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import {
  Mail,
  Heart,
  Calendar,
  Clock,
  Image as ImageIcon,
  Gift,
  Palette,
  Check,
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

interface RoyalGardenWeddingBuilderFormProps {
  register: UseFormRegister<LetterFormValues>;
  setValue: UseFormSetValue<LetterFormValues>;
  watch: UseFormWatch<LetterFormValues>;
  errors: FieldErrors<LetterFormValues>;
  idPrefix?: string;
}

type TabType = "envelope" | "couple" | "event" | "rundown" | "photos" | "gift" | "theme";

const PRESET_WEDDING_PHOTOS = [
  {
    name: "Prewedding 1: Pelukan di Kebun",
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80",
    thumb: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Prewedding 2: Gaun Putih Elegan",
    url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80",
    thumb: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Prewedding 3: Senyum Bahagia",
    url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1000&q=80",
    thumb: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Prewedding 4: Cincin & Mawar",
    url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1000&q=80",
    thumb: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=200&q=60",
  },
];

export function RoyalGardenWeddingBuilderForm({
  register,
  setValue,
  watch,
  errors,
  idPrefix = "royal-garden-wedding",
}: RoyalGardenWeddingBuilderFormProps) {
  const [activeTab, setActiveTab] = useState<TabType>("envelope");

  const tabs: Array<{ id: TabType; label: string; icon: typeof Mail }> = [
    { id: "envelope", label: "Amplop & Cover", icon: Mail },
    { id: "couple", label: "Mempelai & Pesan", icon: Heart },
    { id: "event", label: "Waktu & Peta", icon: Calendar },
    { id: "rundown", label: "Rundown Acara", icon: Clock },
    { id: "photos", label: "Galeri Foto", icon: ImageIcon },
    { id: "gift", label: "Amplop Digital", icon: Gift },
    { id: "theme", label: "Warna & Musik", icon: Palette },
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
                "flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all flex-1 justify-center",
                isActive
                  ? "bg-white text-emerald-900 shadow-sm border border-stone-200 font-bold"
                  : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/50",
              )}
            >
              <Icon className={cn("w-4 h-4", isActive ? "text-emerald-700" : "text-stone-400")} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: AMPLOP & COVER */}
      {activeTab === "envelope" && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-4 text-xs sm:text-sm text-emerald-950">
            <p className="font-medium mb-1">Amplop Kerajaan Bersegel Lilin Monogram</p>
            <p className="text-emerald-900/80 leading-relaxed">
              Atur inisial mempelai pada segel lilin 3D, sapaan default tamu undangan, serta subjudul acara.
            </p>
          </div>

          <Field
            label="Inisial Monogram Segel Lilin"
            htmlFor={`${idPrefix}-waxSealMonogram`}
            error={errors.waxSealMonogram?.message as string}
            hint="Maksimal 10 karakter (misal: R & A)."
          >
            <Input
              id={`${idPrefix}-waxSealMonogram`}
              placeholder="Contoh: R & A"
              {...register("waxSealMonogram")}
            />
          </Field>

          <Field
            label="Sapaan Tamu Undangan Default"
            htmlFor={`${idPrefix}-recipientName`}
            error={errors.recipientName?.message as string}
            required
            hint="Dapat diganti otomatis melalui parameter tautan misal: ?to=NamaTamu."
          >
            <Input
              id={`${idPrefix}-recipientName`}
              placeholder="Contoh: Bapak / Ibu / Sahabat Terkasih"
              {...register("recipientName")}
            />
          </Field>

          <Field
            label="Subjudul Undangan / Tagline"
            htmlFor={`${idPrefix}-weddingTagline`}
            error={errors.weddingTagline?.message as string}
          >
            <Input
              id={`${idPrefix}-weddingTagline`}
              placeholder="Contoh: The Holy Matrimony & Wedding Reception"
              {...register("weddingTagline")}
            />
          </Field>
        </div>
      )}

      {/* TAB 2: MEMPELAI & PESAN */}
      {activeTab === "couple" && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs sm:text-sm text-stone-700">
            <p className="font-medium text-stone-900 mb-1">Profil Kedua Mempelai</p>
            <p className="text-stone-600 leading-relaxed">
              Lengkapi nama lengkap kedua mempelai beserta nama orang tua masing-masing.
            </p>
          </div>

          {/* Mempelai Pria */}
          <div className="space-y-4 rounded-xl border border-stone-200 bg-white p-4">
            <h4 className="text-sm font-semibold text-stone-800">Mempelai Pria</h4>
            <Field
              label="Nama Lengkap Mempelai Pria"
              htmlFor={`${idPrefix}-groomName`}
              error={errors.groomName?.message as string}
              required
            >
              <Input
                id={`${idPrefix}-groomName`}
                placeholder="Contoh: Raden Arya Daniswara, S.T."
                {...register("groomName")}
              />
            </Field>

            <Field
              label="Orang Tua Mempelai Pria"
              htmlFor={`${idPrefix}-groomParents`}
              error={errors.groomParents?.message as string}
            >
              <Input
                id={`${idPrefix}-groomParents`}
                placeholder="Contoh: Putra dari Bpk. Ir. Daniswara & Ibu Hj. Ratna Sari"
                {...register("groomParents")}
              />
            </Field>
          </div>

          {/* Mempelai Wanita */}
          <div className="space-y-4 rounded-xl border border-stone-200 bg-white p-4">
            <h4 className="text-sm font-semibold text-stone-800">Mempelai Wanita</h4>
            <Field
              label="Nama Lengkap Mempelai Wanita"
              htmlFor={`${idPrefix}-brideName`}
              error={errors.brideName?.message as string}
              required
            >
              <Input
                id={`${idPrefix}-brideName`}
                placeholder="Contoh: Anindita Kirana Putri, B.Des."
                {...register("brideName")}
              />
            </Field>

            <Field
              label="Orang Tua Mempelai Wanita"
              htmlFor={`${idPrefix}-brideParents`}
              error={errors.brideParents?.message as string}
            >
              <Input
                id={`${idPrefix}-brideParents`}
                placeholder="Contoh: Putri dari Bpk. Dr. H. Suryo Kusumo & Ibu Siti Rahmawati"
                {...register("brideParents")}
              />
            </Field>
          </div>

          <Field
            label="Kutipan Suci / Ayat Cinta Pernikahan"
            htmlFor={`${idPrefix}-holyVerseQuote`}
            error={errors.holyVerseQuote?.message as string}
            hint="Kutipan ayat Al-Qur'an, Alkitab, atau puisi cinta pernikahan."
          >
            <Textarea
              id={`${idPrefix}-holyVerseQuote`}
              rows={3}
              placeholder="Tuliskan ayat suci atau kutipan cinta di sini..."
              {...register("holyVerseQuote")}
            />
          </Field>

          <Field
            label="Pesan Pembuka Undangan"
            htmlFor={`${idPrefix}-invitationMessage`}
            error={errors.invitationMessage?.message as string}
            hint="Kata sambutan penuh rasa syukur kepada para tamu undangan."
          >
            <Textarea
              id={`${idPrefix}-invitationMessage`}
              rows={4}
              placeholder="Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta'ala..."
              {...register("invitationMessage")}
            />
          </Field>
        </div>
      )}

      {/* TAB 3: WAKTU & LOKASI MAPS */}
      {activeTab === "event" && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-4 text-xs sm:text-sm text-emerald-950">
            <p className="font-medium mb-1">Hari H & Peta Navigasi</p>
            <p className="text-emerald-900/80 leading-relaxed">
              Atur tanggal acara, target waktu untuk countdown timer, serta tautan pin Google Maps venue.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Hari & Tanggal Acara"
              htmlFor={`${idPrefix}-eventDate`}
              error={errors.eventDate?.message as string}
              required
            >
              <Input
                id={`${idPrefix}-eventDate`}
                placeholder="Contoh: Sabtu, 28 Desember 2024"
                {...register("eventDate")}
              />
            </Field>

            <Field
              label="Tanggal Target Countdown (ISO)"
              htmlFor={`${idPrefix}-targetIsoDate`}
              error={errors.targetIsoDate?.message as string}
              hint="Format YYYY-MM-DDTHH:mm (misal: 2024-12-28T09:00)."
            >
              <Input
                id={`${idPrefix}-targetIsoDate`}
                placeholder="2024-12-28T09:00"
                {...register("targetIsoDate")}
              />
            </Field>
          </div>

          <Field
            label="Nama Gedung / Tempat Acara"
            htmlFor={`${idPrefix}-venueName`}
            error={errors.venueName?.message as string}
            required
          >
            <Input
              id={`${idPrefix}-venueName`}
              placeholder="Contoh: The Royal Glasshouse & Botanical Garden"
              {...register("venueName")}
            />
          </Field>

          <Field
            label="Alamat Lengkap Venue"
            htmlFor={`${idPrefix}-venueAddress`}
            error={errors.venueAddress?.message as string}
          >
            <Textarea
              id={`${idPrefix}-venueAddress`}
              rows={2}
              placeholder="Contoh: Jl. Dago Giri No. 88, Lembang, Bandung, Jawa Barat 40391"
              {...register("venueAddress")}
            />
          </Field>

          <Field
            label="Tautan Google Maps"
            htmlFor={`${idPrefix}-mapsUrl`}
            error={errors.mapsUrl?.message as string}
            hint="Tautan pin Google Maps yang dibuka saat tamu menekan tombol navigasi."
          >
            <Input
              id={`${idPrefix}-mapsUrl`}
              placeholder="https://maps.google.com/?q=..."
              {...register("mapsUrl")}
            />
          </Field>
        </div>
      )}

      {/* TAB 4: RUNDOWN ACARA */}
      {activeTab === "rundown" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs sm:text-sm text-stone-700">
            <p className="font-medium text-stone-900 mb-1">Susunan Sesi Acara Pernikahan</p>
            <p className="text-stone-600 leading-relaxed">
              Tentukan judul, jam pelaksanaan, dan deskripsi singkat untuk tiap sesi acara.
            </p>
          </div>

          {/* Sesi 1 */}
          <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-3">
            <h4 className="text-sm font-semibold text-stone-800">Sesi 1: Akad Nikah / Pemberkatan</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Judul Sesi 1" htmlFor={`${idPrefix}-session1Title`}>
                <Input id={`${idPrefix}-session1Title`} placeholder="Akad Nikah" {...register("session1Title")} />
              </Field>
              <Field label="Waktu Sesi 1" htmlFor={`${idPrefix}-session1Time`}>
                <Input id={`${idPrefix}-session1Time`} placeholder="08.00 - 10.00 WIB" {...register("session1Time")} />
              </Field>
            </div>
            <Field label="Keterangan Sesi 1" htmlFor={`${idPrefix}-session1Desc`}>
              <Input id={`${idPrefix}-session1Desc`} placeholder="Prosesi ijab qabul khidmat..." {...register("session1Desc")} />
            </Field>
          </div>

          {/* Sesi 2 */}
          <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-3">
            <h4 className="text-sm font-semibold text-stone-800">Sesi 2: Resepsi Pernikahan</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Judul Sesi 2" htmlFor={`${idPrefix}-session2Title`}>
                <Input id={`${idPrefix}-session2Title`} placeholder="Resepsi Pernikahan" {...register("session2Title")} />
              </Field>
              <Field label="Waktu Sesi 2" htmlFor={`${idPrefix}-session2Time`}>
                <Input id={`${idPrefix}-session2Time`} placeholder="11.00 - 14.00 WIB" {...register("session2Time")} />
              </Field>
            </div>
            <Field label="Keterangan Sesi 2" htmlFor={`${idPrefix}-session2Desc`}>
              <Input id={`${idPrefix}-session2Desc`} placeholder="Santap siang bersama & ramah tamah..." {...register("session2Desc")} />
            </Field>
          </div>

          {/* Sesi 3 */}
          <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-3">
            <h4 className="text-sm font-semibold text-stone-800">Sesi 3: Ramah Tamah / After Party</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Judul Sesi 3" htmlFor={`${idPrefix}-session3Title`}>
                <Input id={`${idPrefix}-session3Title`} placeholder="Sunset Celebration" {...register("session3Title")} />
              </Field>
              <Field label="Waktu Sesi 3" htmlFor={`${idPrefix}-session3Time`}>
                <Input id={`${idPrefix}-session3Time`} placeholder="16.00 - 18.00 WIB" {...register("session3Time")} />
              </Field>
            </div>
            <Field label="Keterangan Sesi 3" htmlFor={`${idPrefix}-session3Desc`}>
              <Input id={`${idPrefix}-session3Desc`} placeholder="Live music & pelepasan lentera..." {...register("session3Desc")} />
            </Field>
          </div>
        </div>
      )}

      {/* TAB 5: GALERI PREWEDDING */}
      {activeTab === "photos" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-4 text-xs sm:text-sm text-emerald-950">
            <p className="font-medium mb-1">Galeri Foto Prewedding (3 Foto)</p>
            <p className="text-emerald-900/80 leading-relaxed">
              Tampilkan hingga 3 foto prewedding terbaik berbingkai emas mewah lengkap dengan caption manis.
            </p>
          </div>

          {/* Preset Foto Cepat */}
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-600">
              Pilihan Preset Foto Prewedding:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {PRESET_WEDDING_PHOTOS.map((p) => {
                const isSelected = currentPhoto1 === p.url;
                return (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() =>
                      setValue("photo1Url", p.url, { shouldValidate: true, shouldDirty: true })
                    }
                    className={cn(
                      "relative aspect-square overflow-hidden rounded-xl border-2 transition-all text-left",
                      isSelected
                        ? "border-emerald-600 ring-2 ring-emerald-300"
                        : "border-stone-200 hover:border-stone-300",
                    )}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.thumb} alt={p.name} className="h-full w-full object-cover" />
                    {isSelected && (
                      <span className="absolute top-1 right-1 rounded-full bg-emerald-600 p-0.5 text-white">
                        <Check className="h-3 w-3" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Foto 1 */}
          <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-3">
            <h4 className="text-sm font-semibold text-stone-800">Foto 1 (Utama)</h4>
            <Field label="Tautan Foto 1 (URL)" htmlFor={`${idPrefix}-photo1Url`}>
              <Input id={`${idPrefix}-photo1Url`} placeholder="https://images.unsplash.com/..." {...register("photo1Url")} />
            </Field>
            <Field label="Keterangan Foto 1" htmlFor={`${idPrefix}-photo1Caption`}>
              <Input id={`${idPrefix}-photo1Caption`} placeholder="Dua hati yang bersatu..." {...register("photo1Caption")} />
            </Field>
          </div>

          {/* Foto 2 */}
          <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-3">
            <h4 className="text-sm font-semibold text-stone-800">Foto 2</h4>
            <Field label="Tautan Foto 2 (URL)" htmlFor={`${idPrefix}-photo2Url`}>
              <Input id={`${idPrefix}-photo2Url`} placeholder="https://images.unsplash.com/..." {...register("photo2Url")} />
            </Field>
            <Field label="Keterangan Foto 2" htmlFor={`${idPrefix}-photo2Caption`}>
              <Input id={`${idPrefix}-photo2Caption`} placeholder="Melangkah bersama..." {...register("photo2Caption")} />
            </Field>
          </div>

          {/* Foto 3 */}
          <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-3">
            <h4 className="text-sm font-semibold text-stone-800">Foto 3</h4>
            <Field label="Tautan Foto 3 (URL)" htmlFor={`${idPrefix}-photo3Url`}>
              <Input id={`${idPrefix}-photo3Url`} placeholder="https://images.unsplash.com/..." {...register("photo3Url")} />
            </Field>
            <Field label="Keterangan Foto 3" htmlFor={`${idPrefix}-photo3Caption`}>
              <Input id={`${idPrefix}-photo3Caption`} placeholder="Senyum kebahagiaan..." {...register("photo3Caption")} />
            </Field>
          </div>
        </div>
      )}

      {/* TAB 6: DRESS CODE & AMPLOP DIGITAL */}
      {activeTab === "gift" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-4 text-xs sm:text-sm text-emerald-950">
            <p className="font-medium mb-1">Panduan Tamu & Amplop Digital</p>
            <p className="text-emerald-900/80 leading-relaxed">
              Atur dress code busana tamu serta rekening tanda kasih (amplop digital) dengan tombol salin instan.
            </p>
          </div>

          {/* Dress code */}
          <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-3">
            <h4 className="text-sm font-semibold text-stone-800">Panduan Busana Tamu</h4>
            <Field label="Tema Dress Code" htmlFor={`${idPrefix}-dressCodeTitle`}>
              <Input id={`${idPrefix}-dressCodeTitle`} placeholder="Botanical Formal / Royal Emerald & Gold" {...register("dressCodeTitle")} />
            </Field>
            <Field label="Catatan Dress Code" htmlFor={`${idPrefix}-dressCodeNote`}>
              <Input id={`${idPrefix}-dressCodeNote`} placeholder="Disarankan mengenakan busana bernuansa hijau zamrud..." {...register("dressCodeNote")} />
            </Field>
          </div>

          {/* Amplop Digital Rekening 1 & 2 */}
          <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-4">
            <h4 className="text-sm font-semibold text-stone-800">Rekening Tanda Kasih 1</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Nama Bank / e-Wallet 1" htmlFor={`${idPrefix}-bankName1`}>
                <Input id={`${idPrefix}-bankName1`} placeholder="BCA" {...register("bankName1")} />
              </Field>
              <Field label="Nomor Rekening 1" htmlFor={`${idPrefix}-accountNumber1`}>
                <Input id={`${idPrefix}-accountNumber1`} placeholder="8420192831" {...register("accountNumber1")} />
              </Field>
            </div>
            <Field label="Atas Nama Rekening 1" htmlFor={`${idPrefix}-accountHolder1`}>
              <Input id={`${idPrefix}-accountHolder1`} placeholder="Raden Arya Daniswara" {...register("accountHolder1")} />
            </Field>
          </div>

          <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-4">
            <h4 className="text-sm font-semibold text-stone-800">Rekening Tanda Kasih 2 (Opsional)</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Nama Bank / e-Wallet 2" htmlFor={`${idPrefix}-bankName2`}>
                <Input id={`${idPrefix}-bankName2`} placeholder="Bank Mandiri" {...register("bankName2")} />
              </Field>
              <Field label="Nomor Rekening 2" htmlFor={`${idPrefix}-accountNumber2`}>
                <Input id={`${idPrefix}-accountNumber2`} placeholder="1320098472910" {...register("accountNumber2")} />
              </Field>
            </div>
            <Field label="Atas Nama Rekening 2" htmlFor={`${idPrefix}-accountHolder2`}>
              <Input id={`${idPrefix}-accountHolder2`} placeholder="Anindita Kirana Putri" {...register("accountHolder2")} />
            </Field>
          </div>
        </div>
      )}

      {/* TAB 7: WARNA & MUSIK */}
      {activeTab === "theme" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs sm:text-sm text-stone-700">
            <p className="font-medium text-stone-900 mb-1">Palet Nuansa & Musik Pernikahan</p>
            <p className="text-stone-600 leading-relaxed">
              Pilih warna aksen hijau zamrud/emas dan tautan audio pengiring suasana pernikahan.
            </p>
          </div>

          {setValue && watch && (
            <div className="space-y-5">
              <ColorPickerField
                label="Warna Aksen Utama"
                value={(watch("primaryColor") as string) || "#064e3b"}
                onChange={(val) => setValue("primaryColor", val, { shouldDirty: true })}
                presets={[
                  { label: "Royal Emerald", value: "#064e3b", description: "Hijau zamrud botani" },
                  { label: "Imperial Gold", value: "#92400e", description: "Emas tembaga kemewahan" },
                  { label: "Midnight Sage", value: "#14532d", description: "Hijau lumut hutan" },
                  { label: "Burgundy Velvet", value: "#701a75", description: "Ungu tua velvet" },
                  { label: "Sapphire Royal", value: "#1e3a8a", description: "Biru safir megah" },
                ]}
              />

              <ColorPickerField
                label="Warna Latar Belakang Halaman"
                value={(watch("backgroundColor") as string) || "#f4f7f4"}
                onChange={(val) => setValue("backgroundColor", val, { shouldDirty: true })}
                presets={BACKGROUND_COLOR_PRESETS}
              />

              <ColorPickerField
                label="Warna Lembaran Kartu Undangan"
                value={(watch("cardColor") as string) || "#ffffff"}
                onChange={(val) => setValue("cardColor", val, { shouldDirty: true })}
                presets={CARD_COLOR_PRESETS}
              />
            </div>
          )}

          <div className="space-y-4 border-t border-stone-200 pt-4">
            <Field label="Judul Musik Pengiring" htmlFor={`${idPrefix}-musicTitle`}>
              <Input id={`${idPrefix}-musicTitle`} placeholder="A Thousand Years (Cello & Piano Orchestra)" {...register("musicTitle")} />
            </Field>

            <Field
              label="Tautan Audio (.mp3)"
              htmlFor={`${idPrefix}-bgMusicUrl`}
              hint="File mp3 yang berputar otomatis saat tamu membuka undangan."
            >
              <Input id={`${idPrefix}-bgMusicUrl`} placeholder="https://cdn.pixabay.com/..." {...register("bgMusicUrl")} />
            </Field>
          </div>
        </div>
      )}

      {/* Navigasi Bawah */}
      <div className="flex items-center justify-between border-t border-stone-200 pt-4">
        <button
          type="button"
          onClick={() => {
            if (currentTabIndex > 0) setActiveTab(tabs[currentTabIndex - 1].id);
          }}
          disabled={currentTabIndex === 0}
          className="inline-flex items-center gap-1 text-xs font-semibold text-stone-600 disabled:opacity-30 hover:text-stone-900"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Sebelumnya</span>
        </button>

        <span className="text-xs text-stone-400 font-medium">
          Langkah {currentTabIndex + 1} dari {tabs.length}
        </span>

        <button
          type="button"
          onClick={() => {
            if (currentTabIndex < tabs.length - 1) setActiveTab(tabs[currentTabIndex + 1].id);
          }}
          disabled={currentTabIndex === tabs.length - 1}
          className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 disabled:opacity-30 hover:text-emerald-950"
        >
          <span>Selanjutnya</span>
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
