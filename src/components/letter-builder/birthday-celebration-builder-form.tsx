"use client";

import { useState } from "react";
import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import {
  Cake,
  Gift,
  Award,
  Sparkles,
  Heart,
  Scroll,
  Palette,
  Image as ImageIcon,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Check,
} from "lucide-react";
import { Field, Input, Textarea } from "@/components/ui/field";
import { ColorPickerField } from "@/components/ui/color-picker-field";
import { AudioUploadField } from "@/components/ui/audio-upload-field";
import {
  BIRTHDAY_COLOR_PRESETS,
  BACKGROUND_COLOR_PRESETS,
  CARD_COLOR_PRESETS,
  TEXT_COLOR_PRESETS,
} from "@/templates/color-presets";
import { cn } from "@/lib/utils/cn";
import type { LetterFormValues } from "./dynamic-form";

interface BirthdayCelebrationBuilderFormProps {
  register: UseFormRegister<LetterFormValues>;
  setValue: UseFormSetValue<LetterFormValues>;
  watch: UseFormWatch<LetterFormValues>;
  errors: FieldErrors<LetterFormValues>;
  idPrefix?: string;
}

type TabType =
  | "hero"
  | "cake"
  | "gift"
  | "milestone"
  | "gallery"
  | "wishes"
  | "letter"
  | "theme";

const PRESET_BIRTHDAY_PHOTOS = [
  {
    name: "Senyuman Bahagia",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
    thumb: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Pesta Kejutan",
    url: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Tawa di Pantai",
    url: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Kopi Bersama",
    url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=200&q=60",
  },
];

export function BirthdayCelebrationBuilderForm({
  register,
  setValue,
  watch,
  errors,
  idPrefix = "bday-party",
}: BirthdayCelebrationBuilderFormProps) {
  const [activeTab, setActiveTab] = useState<TabType>("hero");

  const tabs: Array<{ id: TabType; label: string; icon: typeof Cake }> = [
    { id: "hero", label: "Penerima & Usia", icon: Sparkles },
    { id: "cake", label: "Kue & Lilin", icon: Cake },
    { id: "gift", label: "Kado Kejutan", icon: Gift },
    { id: "milestone", label: "Linimasa Usia", icon: Award },
    { id: "gallery", label: "Galeri Foto", icon: ImageIcon },
    { id: "wishes", label: "Doa & Target", icon: Heart },
    { id: "letter", label: "Surat Ucapan", icon: Scroll },
    { id: "theme", label: "Warna & Musik", icon: Palette },
  ];

  const currentTabIndex = tabs.findIndex((t) => t.id === activeTab);
  const currentCover = watch("heroCoverPhoto") as string;

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
                  ? "bg-stone-900 text-rose-300 shadow-xs border border-stone-800"
                  : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/50",
              )}
            >
              <Icon className={cn("w-4 h-4", isActive ? "text-rose-400" : "text-stone-400")} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: PENERIMA & USIA */}
      {activeTab === "hero" && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          <div className="bg-rose-50/80 border border-rose-200 rounded-xl p-4 text-xs sm:text-sm text-rose-950">
            <p className="font-medium mb-1">Informasi Perayaan Ulang Tahun</p>
            <p className="text-rose-900/80 leading-relaxed">
              Tentukan siapa yang berulang tahun, usia baru yang dirayakan, tanggal lahir (untuk menghitung otomatis hari-hari penuh tawa), dan foto potret utama.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Nama yang Berulang Tahun"
              htmlFor={`${idPrefix}-recipientName`}
              error={errors.recipientName?.message as string}
              required
            >
              <Input
                id={`${idPrefix}-recipientName`}
                placeholder="Contoh: Clarissa Aurelia"
                {...register("recipientName")}
              />
            </Field>

            <Field
              label="Nama Kamu / Pengirim Ucapan"
              htmlFor={`${idPrefix}-senderName`}
              error={errors.senderName?.message as string}
              required
            >
              <Input
                id={`${idPrefix}-senderName`}
                placeholder="Contoh: Arga & Seluruh Sahabat"
                {...register("senderName")}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Usia Baru yang Dirayakan (Angka)"
              htmlFor={`${idPrefix}-age`}
              error={errors.age?.message as string}
              required
            >
              <Input
                id={`${idPrefix}-age`}
                type="number"
                placeholder="23"
                {...register("age", { valueAsNumber: true })}
              />
            </Field>

            <Field
              label="Tanggal Lahir (YYYY-MM-DD)"
              htmlFor={`${idPrefix}-birthDate`}
              error={errors.birthDate?.message as string}
              hint="Contoh: 2003-10-15. Untuk menghitung total hari kebahagiaan."
            >
              <div className="relative">
                <Input
                  id={`${idPrefix}-birthDate`}
                  placeholder="2003-10-15"
                  {...register("birthDate")}
                />
                <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-stone-400 pointer-events-none" />
              </div>
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Sapaan Pembuka Perayaan"
              htmlFor={`${idPrefix}-heroGreeting`}
              error={errors.heroGreeting?.message as string}
            >
              <Input
                id={`${idPrefix}-heroGreeting`}
                placeholder="Happy 23rd Birthday, Sunshine! 🎉"
                {...register("heroGreeting")}
              />
            </Field>

            <Field
              label="Headline Perayaan"
              htmlFor={`${idPrefix}-heroHeadline`}
              error={errors.heroHeadline?.message as string}
            >
              <Input
                id={`${idPrefix}-heroHeadline`}
                placeholder="Merayakan Hadirnya Senyuman Paling Hangat di Dunia"
                {...register("heroHeadline")}
              />
            </Field>
          </div>

          {/* Foto Potret Utama */}
          <div className="space-y-3 rounded-xl border border-stone-200 bg-white p-4">
            <h4 className="text-sm font-semibold text-stone-800">
              Foto Potret Utama yang Berulang Tahun
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {PRESET_BIRTHDAY_PHOTOS.map((p) => {
                const isSelected = currentCover === p.url;
                return (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() =>
                      setValue("heroCoverPhoto", p.url, {
                        shouldValidate: true,
                        shouldDirty: true,
                      })
                    }
                    className={cn(
                      "relative aspect-square overflow-hidden rounded-xl border-2 transition-all text-left",
                      isSelected
                        ? "border-rose-500 ring-2 ring-rose-300"
                        : "border-stone-200 hover:border-stone-300",
                    )}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.thumb} alt={p.name} className="h-full w-full object-cover" />
                    {isSelected && (
                      <span className="absolute top-1 right-1 rounded-full bg-rose-500 p-0.5 text-white">
                        <Check className="h-3 w-3" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <Field
              label="Tautan Foto Potret Utama (URL)"
              htmlFor={`${idPrefix}-heroCoverPhoto`}
              error={errors.heroCoverPhoto?.message as string}
            >
              <Input
                id={`${idPrefix}-heroCoverPhoto`}
                placeholder="https://images.unsplash.com/..."
                {...register("heroCoverPhoto")}
              />
            </Field>
          </div>
        </div>
      )}

      {/* TAB 2: KUE & TIUP LILIN */}
      {activeTab === "cake" && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 text-xs sm:text-sm text-amber-950">
            <p className="font-medium mb-1">Ritual Tiup Lilin & Permohonan (Make a Wish)</p>
            <p className="text-amber-900/80 leading-relaxed">
              Atur kue bolu ulang tahun interaktif. Penerima dapat menekan tombol tiup lilin yang akan memadamkan lilin, memunculkan suara selebrasi, ledakan konfeti, serta membuka pesan rahasia di bawah ini.
            </p>
          </div>

          <Field
            label="Varian Rasa Kue Bolu Ulang Tahun"
            htmlFor={`${idPrefix}-cakeFlavor`}
            error={errors.cakeFlavor?.message as string}
          >
            <Input
              id={`${idPrefix}-cakeFlavor`}
              placeholder="Contoh: Strawberry Sweet Velvet & Chantilly Cream"
              {...register("cakeFlavor")}
            />
          </Field>

          <Field
            label="Panduan Make A Wish Sebelum Tiup Lilin"
            htmlFor={`${idPrefix}-cakeWishPrompt`}
            error={errors.cakeWishPrompt?.message as string}
          >
            <Input
              id={`${idPrefix}-cakeWishPrompt`}
              placeholder="Tutup matamu sejenak, bisikkan satu permohonan tulus di hati..."
              {...register("cakeWishPrompt")}
            />
          </Field>

          <Field
            label="Pesan Rahasia Tersembunyi (Terbuka Saat Lilin Ditiup)"
            htmlFor={`${idPrefix}-secretWishMessage`}
            error={errors.secretWishMessage?.message as string}
            hint="Pesan penuh cinta dan kejutan yang akan muncul otomatis setelah penerima meniup lilin."
          >
            <Textarea
              id={`${idPrefix}-secretWishMessage`}
              rows={3}
              placeholder="Semoga di usia 23 tahun ini, setiap langkahmu selalu dipeluk rasa aman..."
              {...register("secretWishMessage")}
            />
          </Field>
        </div>
      )}

      {/* TAB 3: KADO KEJUTAN */}
      {activeTab === "gift" && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          <div className="bg-rose-50/80 border border-rose-200 rounded-xl p-4 text-xs sm:text-sm text-rose-950">
            <p className="font-medium mb-1">Kotak Kado Ulang Tahun Interaktif</p>
            <p className="text-rose-900/80 leading-relaxed">
              Sebuah kotak kado kejutan yang dapat diklik untuk dibuka oleh penerima. Anda bisa mengisinya dengan janji traktiran, tiket liburan, hadiah spesial, ataupun kode voucher traktiran.
            </p>
          </div>

          <Field
            label="Judul Hadiah / Voucher Kejutan"
            htmlFor={`${idPrefix}-giftBoxTitle`}
            error={errors.giftBoxTitle?.message as string}
          >
            <Input
              id={`${idPrefix}-giftBoxTitle`}
              placeholder="Contoh: Tiket Liburan Berdua & Dinner Spesial Favoritmu 🎁"
              {...register("giftBoxTitle")}
            />
          </Field>

          <Field
            label="Pesan Isi Kotak Kado"
            htmlFor={`${idPrefix}-giftBoxMessage`}
            error={errors.giftBoxMessage?.message as string}
          >
            <Textarea
              id={`${idPrefix}-giftBoxMessage`}
              rows={3}
              placeholder="Kado ini disiapkan dengan seluruh cinta! Weekend ini kita luangkan waktu seharian..."
              {...register("giftBoxMessage")}
            />
          </Field>

          <Field
            label="Kode Kado / Voucher Traktiran (Opsional)"
            htmlFor={`${idPrefix}-giftBoxCode`}
            error={errors.giftBoxCode?.message as string}
            hint="Kode unik kejutan (misal: BDAY-TREAT-23)."
          >
            <Input
              id={`${idPrefix}-giftBoxCode`}
              placeholder="CLARISSA-SWEET23-TREAT"
              {...register("giftBoxCode")}
            />
          </Field>
        </div>
      )}

      {/* TAB 4: LINIMASA USIA */}
      {activeTab === "milestone" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 text-xs sm:text-sm text-amber-950">
            <p className="font-medium mb-1">Linimasa Tiga Babak Kehidupan Emas</p>
            <p className="text-amber-900/80 leading-relaxed">
              Catat perjalanan dan momen-momen membanggakan yang telah dilalui hingga mencapai usia saat ini.
            </p>
          </div>

          <Field
            label="Judul Seksi Linimasa"
            htmlFor={`${idPrefix}-milestoneTitle`}
            error={errors.milestoneTitle?.message as string}
          >
            <Input
              id={`${idPrefix}-milestoneTitle`}
              placeholder="Tiga Babak Indah Menuju Usia Kedewasaan"
              {...register("milestoneTitle")}
            />
          </Field>

          {/* Milestone 1 */}
          <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-600">
              Babak 1 (Awal Perjalanan)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Field label="Tahun" htmlFor={`${idPrefix}-milestone1Year`}>
                <Input
                  id={`${idPrefix}-milestone1Year`}
                  placeholder="2021"
                  {...register("milestone1Year")}
                />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Judul Momen" htmlFor={`${idPrefix}-milestone1Title`}>
                  <Input
                    id={`${idPrefix}-milestone1Title`}
                    placeholder="Langkah Berani Memulai Mimpi Baru"
                    {...register("milestone1Title")}
                  />
                </Field>
              </div>
            </div>
            <Field label="Cerita & Makna" htmlFor={`${idPrefix}-milestone1Desc`}>
              <Input
                id={`${idPrefix}-milestone1Desc`}
                placeholder="Saat kamu berani keluar dari zona nyaman..."
                {...register("milestone1Desc")}
              />
            </Field>
          </div>

          {/* Milestone 2 */}
          <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-600">
              Babak 2 (Pencapaian & Karya)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Field label="Tahun" htmlFor={`${idPrefix}-milestone2Year`}>
                <Input
                  id={`${idPrefix}-milestone2Year`}
                  placeholder="2024"
                  {...register("milestone2Year")}
                />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Judul Momen" htmlFor={`${idPrefix}-milestone2Title`}>
                  <Input
                    id={`${idPrefix}-milestone2Title`}
                    placeholder="Pencapaian Besar & Karya Membanggakan"
                    {...register("milestone2Title")}
                  />
                </Field>
              </div>
            </div>
            <Field label="Cerita & Makna" htmlFor={`${idPrefix}-milestone2Desc`}>
              <Input
                id={`${idPrefix}-milestone2Desc`}
                placeholder="Menuntaskan tanggung jawab besar dengan senyuman puas..."
                {...register("milestone2Desc")}
              />
            </Field>
          </div>

          {/* Milestone 3 */}
          <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-600">
              Babak 3 (Menyambut Era Emas)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Field label="Tahun" htmlFor={`${idPrefix}-milestone3Year`}>
                <Input
                  id={`${idPrefix}-milestone3Year`}
                  placeholder="2026"
                  {...register("milestone3Year")}
                />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Judul Momen" htmlFor={`${idPrefix}-milestone3Title`}>
                  <Input
                    id={`${idPrefix}-milestone3Title`}
                    placeholder="Menyambut Era Emas yang Gemilang"
                    {...register("milestone3Title")}
                  />
                </Field>
              </div>
            </div>
            <Field label="Cerita & Makna" htmlFor={`${idPrefix}-milestone3Desc`}>
              <Input
                id={`${idPrefix}-milestone3Desc`}
                placeholder="Memasuki usia baru dengan hati yang lebih tenang..."
                {...register("milestone3Desc")}
              />
            </Field>
          </div>
        </div>
      )}

      {/* TAB 5: GALERI POLAROID */}
      {activeTab === "gallery" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-rose-50/80 border border-rose-200 rounded-xl p-4 text-xs sm:text-sm text-rose-950">
            <p className="font-medium mb-1">Galeri Foto Polaroid Kenangan (Hingga 6 Foto)</p>
            <p className="text-rose-900/80 leading-relaxed">
              Tampilkan foto-foto momen terindah bersama yang berulang tahun lengkap dengan keterangan manis.
            </p>
          </div>

          {/* Foto 1 & 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-3">
              <h4 className="text-xs font-bold uppercase text-stone-700">Foto Polaroid 1</h4>
              <Field label="Tautan Foto (URL)" htmlFor={`${idPrefix}-galleryPhoto1`}>
                <Input
                  id={`${idPrefix}-galleryPhoto1`}
                  placeholder="https://images.unsplash.com/..."
                  {...register("galleryPhoto1")}
                />
              </Field>
              <Field label="Keterangan Foto" htmlFor={`${idPrefix}-galleryCaption1`}>
                <Input
                  id={`${idPrefix}-galleryCaption1`}
                  placeholder="Tawa renyah saat perayaan kecil"
                  {...register("galleryCaption1")}
                />
              </Field>
            </div>

            <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-3">
              <h4 className="text-xs font-bold uppercase text-stone-700">Foto Polaroid 2</h4>
              <Field label="Tautan Foto (URL)" htmlFor={`${idPrefix}-galleryPhoto2`}>
                <Input
                  id={`${idPrefix}-galleryPhoto2`}
                  placeholder="https://images.unsplash.com/..."
                  {...register("galleryPhoto2")}
                />
              </Field>
              <Field label="Keterangan Foto" htmlFor={`${idPrefix}-galleryCaption2`}>
                <Input
                  id={`${idPrefix}-galleryCaption2`}
                  placeholder="Momen liburan seru di pantai"
                  {...register("galleryCaption2")}
                />
              </Field>
            </div>
          </div>

          {/* Foto 3 & 4 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-3">
              <h4 className="text-xs font-bold uppercase text-stone-700">Foto Polaroid 3</h4>
              <Field label="Tautan Foto (URL)" htmlFor={`${idPrefix}-galleryPhoto3`}>
                <Input
                  id={`${idPrefix}-galleryPhoto3`}
                  placeholder="https://images.unsplash.com/..."
                  {...register("galleryPhoto3")}
                />
              </Field>
              <Field label="Keterangan Foto" htmlFor={`${idPrefix}-galleryCaption3`}>
                <Input
                  id={`${idPrefix}-galleryCaption3`}
                  placeholder="Menikmati kopi hangat berdua"
                  {...register("galleryCaption3")}
                />
              </Field>
            </div>

            <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-3">
              <h4 className="text-xs font-bold uppercase text-stone-700">Foto Polaroid 4</h4>
              <Field label="Tautan Foto (URL)" htmlFor={`${idPrefix}-galleryPhoto4`}>
                <Input
                  id={`${idPrefix}-galleryPhoto4`}
                  placeholder="https://images.unsplash.com/..."
                  {...register("galleryPhoto4")}
                />
              </Field>
              <Field label="Keterangan Foto" htmlFor={`${idPrefix}-galleryCaption4`}>
                <Input
                  id={`${idPrefix}-galleryCaption4`}
                  placeholder="Menyanyi lagu favorit sekuat tenaga"
                  {...register("galleryCaption4")}
                />
              </Field>
            </div>
          </div>

          {/* Foto 5 & 6 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-3">
              <h4 className="text-xs font-bold uppercase text-stone-700">Foto Polaroid 5</h4>
              <Field label="Tautan Foto (URL)" htmlFor={`${idPrefix}-galleryPhoto5`}>
                <Input
                  id={`${idPrefix}-galleryPhoto5`}
                  placeholder="https://images.unsplash.com/..."
                  {...register("galleryPhoto5")}
                />
              </Field>
              <Field label="Keterangan Foto" htmlFor={`${idPrefix}-galleryCaption5`}>
                <Input
                  id={`${idPrefix}-galleryCaption5`}
                  placeholder="Senja tenang dengan obrolan masa depan"
                  {...register("galleryCaption5")}
                />
              </Field>
            </div>

            <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-3">
              <h4 className="text-xs font-bold uppercase text-stone-700">Foto Polaroid 6</h4>
              <Field label="Tautan Foto (URL)" htmlFor={`${idPrefix}-galleryPhoto6`}>
                <Input
                  id={`${idPrefix}-galleryPhoto6`}
                  placeholder="https://images.unsplash.com/..."
                  {...register("galleryPhoto6")}
                />
              </Field>
              <Field label="Keterangan Foto" htmlFor={`${idPrefix}-galleryCaption6`}>
                <Input
                  id={`${idPrefix}-galleryCaption6`}
                  placeholder="Malam syukuran penuh pelukan hangat"
                  {...register("galleryCaption6")}
                />
              </Field>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: DOA & TARGET BUCKET LIST */}
      {activeTab === "wishes" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 text-xs sm:text-sm text-amber-950">
            <p className="font-medium mb-1">Empat Doa Tulus & Tiga Target Usia Baru</p>
            <p className="text-amber-900/80 leading-relaxed">
              Tuliskan empat pilar doa untuk kesehatan, karier, cinta, dan impian terbesarnya, serta tiga wishlist yang ingin dicapai bersama.
            </p>
          </div>

          {/* Doa 1 & 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-4 space-y-2">
              <Field label="Judul Doa 1" htmlFor={`${idPrefix}-wish1Title`}>
                <Input
                  id={`${idPrefix}-wish1Title`}
                  placeholder="Kesehatan Raga & Jiwa"
                  {...register("wish1Title")}
                />
              </Field>
              <Field label="Isi Harapan Doa 1" htmlFor={`${idPrefix}-wish1Desc`}>
                <Input
                  id={`${idPrefix}-wish1Desc`}
                  placeholder="Semoga selalu dilimpahi tubuh yang bugar..."
                  {...register("wish1Desc")}
                />
              </Field>
            </div>

            <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-4 space-y-2">
              <Field label="Judul Doa 2" htmlFor={`${idPrefix}-wish2Title`}>
                <Input
                  id={`${idPrefix}-wish2Title`}
                  placeholder="Karier & Pintu Rezeki"
                  {...register("wish2Title")}
                />
              </Field>
              <Field label="Isi Harapan Doa 2" htmlFor={`${idPrefix}-wish2Desc`}>
                <Input
                  id={`${idPrefix}-wish2Desc`}
                  placeholder="Semoga setiap ikhtiar dibukakan jalan..."
                  {...register("wish2Desc")}
                />
              </Field>
            </div>
          </div>

          {/* Doa 3 & 4 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-4 space-y-2">
              <Field label="Judul Doa 3" htmlFor={`${idPrefix}-wish3Title`}>
                <Input
                  id={`${idPrefix}-wish3Title`}
                  placeholder="Cinta & Ketulusan"
                  {...register("wish3Title")}
                />
              </Field>
              <Field label="Isi Harapan Doa 3" htmlFor={`${idPrefix}-wish3Desc`}>
                <Input
                  id={`${idPrefix}-wish3Desc`}
                  placeholder="Semoga hatimu selalu hangat..."
                  {...register("wish3Desc")}
                />
              </Field>
            </div>

            <div className="rounded-xl border border-stone-200 bg-stone-50/70 p-4 space-y-2">
              <Field label="Judul Doa 4" htmlFor={`${idPrefix}-wish4Title`}>
                <Input
                  id={`${idPrefix}-wish4Title`}
                  placeholder="Kemenangan Terbesar"
                  {...register("wish4Title")}
                />
              </Field>
              <Field label="Isi Harapan Doa 4" htmlFor={`${idPrefix}-wish4Desc`}>
                <Input
                  id={`${idPrefix}-wish4Desc`}
                  placeholder="Semoga impian terbesar yang kamu semogakan..."
                  {...register("wish4Desc")}
                />
              </Field>
            </div>
          </div>

          {/* Bucket List */}
          <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Target & Wishlist di Usia Baru (Bisa Dicentang Interaktif)
            </h4>
            <Field label="Target 1" htmlFor={`${idPrefix}-bucketList1`}>
              <Input
                id={`${idPrefix}-bucketList1`}
                placeholder="Menjelajahi kota baru yang ada di wishlist"
                {...register("bucketList1")}
              />
            </Field>
            <Field label="Target 2" htmlFor={`${idPrefix}-bucketList2`}>
              <Input
                id={`${idPrefix}-bucketList2`}
                placeholder="Menyisihkan waktu luang untuk self-care"
                {...register("bucketList2")}
              />
            </Field>
            <Field label="Target 3" htmlFor={`${idPrefix}-bucketList3`}>
              <Input
                id={`${idPrefix}-bucketList3`}
                placeholder="Mencapai satu target besar yang ditekuni"
                {...register("bucketList3")}
              />
            </Field>
          </div>
        </div>
      )}

      {/* TAB 7: SURAT UCAPAN */}
      {activeTab === "letter" && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs sm:text-sm text-stone-700">
            <p className="font-medium text-stone-900 mb-1">Surat Ucapan Ulang Tahun Resmi</p>
            <p className="text-stone-600 leading-relaxed">
              Tuliskan pesan cinta mendalam, apresiasi atas perjuangannya, dan doa yang menyentuh hati di hari kelahirannya.
            </p>
          </div>

          <Field
            label="Judul Surat Ucapan"
            htmlFor={`${idPrefix}-letterTitle`}
            error={errors.letterTitle?.message as string}
            required
          >
            <Input
              id={`${idPrefix}-letterTitle`}
              placeholder="Sebuah Surat Cinta di Hari Kelahiranmu"
              {...register("letterTitle")}
            />
          </Field>

          <Field
            label="Pengantar Surat"
            htmlFor={`${idPrefix}-introMessage`}
            error={errors.introMessage?.message as string}
          >
            <Input
              id={`${idPrefix}-introMessage`}
              placeholder="Untuk seseorang yang kehadirannya selalu menjadi anugerah terindah..."
              {...register("introMessage")}
            />
          </Field>

          <Field
            label="Isi Surat Ulang Tahun Utama"
            htmlFor={`${idPrefix}-message`}
            error={errors.message?.message as string}
            required
            hint="Pisahkan setiap paragraf dengan baris kosong."
          >
            <Textarea
              id={`${idPrefix}-message`}
              rows={10}
              placeholder="Tuliskan surat cinta & apresiasi terdalammu di sini..."
              {...register("message")}
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Kalimat Penutup"
              htmlFor={`${idPrefix}-closingStatement`}
              error={errors.closingStatement?.message as string}
            >
              <Input
                id={`${idPrefix}-closingStatement`}
                placeholder="Dengan pelukan paling hangat & doa tanpa henti,"
                {...register("closingStatement")}
              />
            </Field>

            <Field
              label="Tanda Tangan"
              htmlFor={`${idPrefix}-signature`}
              error={errors.signature?.message as string}
            >
              <Input
                id={`${idPrefix}-signature`}
                placeholder="Arga Pranata"
                {...register("signature")}
              />
            </Field>
          </div>
        </div>
      )}

      {/* TAB 8: WARNA & AUDIO */}
      {activeTab === "theme" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs sm:text-sm text-stone-700">
            <p className="font-medium text-stone-900 mb-1">Palet Warna Pesta & Audio</p>
            <p className="text-stone-600 leading-relaxed">
              Sesuaikan warna aksen kue perayaan, latar belakang, kartu surat, dan lagu pesta MP3.
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
              <Field label="Warna Aksen Pesta (Bolu, Tombol, Lilin)" htmlFor={`${idPrefix}-primaryColor`}>
                <ColorPickerField
                  value={(watch("primaryColor") as string) || "#e11d48"}
                  onChange={(hex) =>
                    setValue("primaryColor", hex, { shouldValidate: true, shouldDirty: true })
                  }
                  presets={BIRTHDAY_COLOR_PRESETS}
                  helperText="Warna aksen utama kue dan tombol."
                />
              </Field>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
              <Field label="Warna Latar Belakang Perayaan" htmlFor={`${idPrefix}-backgroundColor`}>
                <ColorPickerField
                  value={(watch("backgroundColor") as string) || "#fffaf7"}
                  onChange={(hex) =>
                    setValue("backgroundColor", hex, { shouldValidate: true, shouldDirty: true })
                  }
                  presets={BACKGROUND_COLOR_PRESETS}
                  helperText="Warna kanvas seluruh halaman."
                />
              </Field>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
              <Field label="Warna Kartu & Kertas Surat" htmlFor={`${idPrefix}-cardColor`}>
                <ColorPickerField
                  value={(watch("cardColor") as string) || "#ffffff"}
                  onChange={(hex) =>
                    setValue("cardColor", hex, { shouldValidate: true, shouldDirty: true })
                  }
                  presets={CARD_COLOR_PRESETS}
                  helperText="Warna dasar kotak kue dan amplop surat."
                />
              </Field>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
              <Field label="Warna Teks Judul" htmlFor={`${idPrefix}-textColor`}>
                <ColorPickerField
                  value={(watch("textColor") as string) || "#1c1917"}
                  onChange={(hex) =>
                    setValue("textColor", hex, { shouldValidate: true, shouldDirty: true })
                  }
                  presets={TEXT_COLOR_PRESETS}
                  helperText="Warna nama dan judul-judul perayaan."
                />
              </Field>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
              <Field label="Warna Teks Isi & Doa" htmlFor={`${idPrefix}-bodyTextColor`}>
                <ColorPickerField
                  value={(watch("bodyTextColor") as string) || "#44403c"}
                  onChange={(hex) =>
                    setValue("bodyTextColor", hex, { shouldValidate: true, shouldDirty: true })
                  }
                  presets={TEXT_COLOR_PRESETS}
                  helperText="Warna isi paragraf surat dan kartu doa."
                />
              </Field>
            </div>
          </div>

          {/* Audio Pesta */}
          <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Audio Musik Perayaan Ulang Tahun
            </h4>

            <Field
              label="Judul Musik Pesta"
              htmlFor={`${idPrefix}-musicTitle`}
              error={errors.musicTitle?.message as string}
            >
              <Input
                id={`${idPrefix}-musicTitle`}
                placeholder="Happy Birthday Joyful Chimes"
                {...register("musicTitle")}
              />
            </Field>

            <AudioUploadField
              id={`${idPrefix}-bgMusicUrl`}
              label="Unggah File Musik / Audio (.mp3, .wav)"
              value={(watch("bgMusicUrl") as string) || ""}
              onChange={(url) =>
                setValue("bgMusicUrl", url, { shouldValidate: true, shouldDirty: true })
              }
              helperText="Pilih lagu pesta dari perangkat Anda. Kosongkan jika tanpa musik."
            />
          </div>
        </div>
      )}

      {/* Navigasi Antar Tab */}
      <div className="flex items-center justify-between pt-4 border-t border-stone-200">
        {currentTabIndex > 0 ? (
          <button
            type="button"
            onClick={() => setActiveTab(tabs[currentTabIndex - 1].id)}
            className="flex items-center gap-1 text-xs sm:text-sm font-medium text-stone-600 hover:text-stone-900 px-3 py-1.5 rounded-lg border border-stone-300 hover:bg-stone-100 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Sebelumnya: {tabs[currentTabIndex - 1].label}
          </button>
        ) : (
          <div />
        )}

        {currentTabIndex < tabs.length - 1 && (
          <button
            type="button"
            onClick={() => setActiveTab(tabs[currentTabIndex + 1].id)}
            className="flex items-center gap-1 text-xs sm:text-sm font-medium text-white bg-stone-900 hover:bg-stone-800 px-4 py-1.5 rounded-lg transition-colors shadow-xs ml-auto"
          >
            Lanjut: {tabs[currentTabIndex + 1].label}
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
