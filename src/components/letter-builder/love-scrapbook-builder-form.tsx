"use client";

import { useState } from "react";
import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import {
  BookOpen,
  Camera,
  Scroll,
  Pin,
  Palette,
  Image as ImageIcon,
  Check,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Field, Input, Textarea } from "@/components/ui/field";
import { ColorPickerField } from "@/components/ui/color-picker-field";
import {
  SCRAPBOOK_COLOR_PRESETS,
  BACKGROUND_COLOR_PRESETS,
  CARD_COLOR_PRESETS,
  TEXT_COLOR_PRESETS,
} from "@/templates/color-presets";
import { cn } from "@/lib/utils/cn";
import type { LetterFormValues } from "./dynamic-form";

interface LoveScrapbookBuilderFormProps {
  register: UseFormRegister<LetterFormValues>;
  setValue: UseFormSetValue<LetterFormValues>;
  watch: UseFormWatch<LetterFormValues>;
  errors: FieldErrors<LetterFormValues>;
  idPrefix?: string;
}

type TabType = "cover" | "photobooth" | "letter" | "memories" | "memos" | "theme";

const PRESET_PHOTOBOOTHS = [
  {
    name: "Set Foto Romantis 1",
    p1: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=600&q=80",
    p2: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=80",
    p3: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=600&q=80",
    p4: "https://images.unsplash.com/photo-1513279922550-250c2129b13a?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "Set Foto Romantis 2",
    p1: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    p2: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    p3: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    p4: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80",
  },
];

const PRESET_SCRAPBOOK_PHOTOS = [
  {
    name: "Genggaman Romantis",
    url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Tawa Senja Berdua",
    url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Kopi & Senyuman Manis",
    url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Payung Berdua di Tepi Jalan",
    url: "https://images.unsplash.com/photo-1513279922550-250c2129b13a?auto=format&fit=crop&w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1513279922550-250c2129b13a?auto=format&fit=crop&w=200&q=60",
  },
];

export function LoveScrapbookBuilderForm({
  register,
  setValue,
  watch,
  errors,
  idPrefix = "love-scrapbook",
}: LoveScrapbookBuilderFormProps) {
  const [activeTab, setActiveTab] = useState<TabType>("cover");

  const tabs: Array<{ id: TabType; label: string; icon: typeof BookOpen }> = [
    { id: "cover", label: "Sampul Jurnal", icon: BookOpen },
    { id: "photobooth", label: "Strip Photobooth", icon: Camera },
    { id: "letter", label: "Surat Jurnal", icon: Scroll },
    { id: "memories", label: "Polaroid & Tiket", icon: ImageIcon },
    { id: "memos", label: "Memo Hal Favorit", icon: Pin },
    { id: "theme", label: "Warna & Musik", icon: Palette },
  ];

  const currentTabIndex = tabs.findIndex((t) => t.id === activeTab);
  const currentCoverPhoto = watch("coverPhotoUrl") as string;
  const currentPolaroid = watch("polaroidMemoryUrl") as string;

  const applyPresetSet = (set: (typeof PRESET_PHOTOBOOTHS)[0]) => {
    setValue("photo1Url", set.p1, { shouldValidate: true, shouldDirty: true });
    setValue("photo2Url", set.p2, { shouldValidate: true, shouldDirty: true });
    setValue("photo3Url", set.p3, { shouldValidate: true, shouldDirty: true });
    setValue("photo4Url", set.p4, { shouldValidate: true, shouldDirty: true });
  };

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
                  ? "bg-white text-pink-700 shadow-sm border border-stone-200 font-bold"
                  : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/50",
              )}
            >
              <Icon className={cn("w-4 h-4", isActive ? "text-pink-600" : "text-stone-400")} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: SAMPUL JURNAL */}
      {activeTab === "cover" && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          <div className="bg-pink-50/80 border border-pink-200 rounded-xl p-4 text-xs sm:text-sm text-pink-950">
            <p className="font-medium mb-1">Sampul Buku Jurnal Kenangan</p>
            <p className="text-pink-900/80 leading-relaxed">
              Atur judul jurnal scrapbook, nama kekasih yang dituju, serta lencana edisi kenangan berdua.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Nama Kekasih (Penerima)"
              htmlFor={`${idPrefix}-recipientName`}
              error={errors.recipientName?.message as string}
              required
            >
              <Input
                id={`${idPrefix}-recipientName`}
                placeholder="Contoh: Alya Zahra"
                {...register("recipientName")}
              />
            </Field>

            <Field
              label="Nama Kamu (Pengirim)"
              htmlFor={`${idPrefix}-senderName`}
              error={errors.senderName?.message as string}
              required
            >
              <Input
                id={`${idPrefix}-senderName`}
                placeholder="Contoh: Arka Pratama"
                {...register("senderName")}
              />
            </Field>
          </div>

          <Field
            label="Judul Jurnal Scrapbook"
            htmlFor={`${idPrefix}-journalTitle`}
            error={errors.journalTitle?.message as string}
            hint="Judul utama yang tertempel di sampul depan buku."
          >
            <Input
              id={`${idPrefix}-journalTitle`}
              placeholder="Contoh: Our Little Moments & Sweet Memories"
              {...register("journalTitle")}
            />
          </Field>

          <Field
            label="Badge Edisi Jurnal"
            htmlFor={`${idPrefix}-editionBadge`}
            error={errors.editionBadge?.message as string}
            hint="Keterangan kecil di atas judul (misal: Vol. 2 • Captured with Love 📸)."
          >
            <Input
              id={`${idPrefix}-editionBadge`}
              placeholder="Contoh: Vol. 2 • Captured with Love 📸"
              {...register("editionBadge")}
            />
          </Field>

          {/* Foto Polaroid Sampul */}
          <div className="space-y-3 rounded-xl border border-stone-200 bg-white p-4">
            <h4 className="text-sm font-semibold text-stone-800">
              Foto Polaroid Sampul Depan Jurnal
            </h4>
            <p className="text-xs text-stone-500">
              Foto polaroid manis yang tertempel dengan washi tape di sampul buku scrapbook.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              {PRESET_SCRAPBOOK_PHOTOS.map((p) => {
                const isSelected = currentCoverPhoto === p.url;
                return (
                  <button
                    key={`cover-${p.name}`}
                    type="button"
                    onClick={() =>
                      setValue("coverPhotoUrl", p.url, {
                        shouldValidate: true,
                        shouldDirty: true,
                      })
                    }
                    className={cn(
                      "relative aspect-square overflow-hidden rounded-xl border-2 transition-all text-left",
                      isSelected
                        ? "border-pink-500 ring-2 ring-pink-300"
                        : "border-stone-200 hover:border-stone-300",
                    )}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.thumb} alt={p.name} className="h-full w-full object-cover" />
                    {isSelected && (
                      <span className="absolute top-1 right-1 rounded-full bg-pink-500 p-0.5 text-white">
                        <Check className="h-3 w-3" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <Field
              label="Tautan Foto Sampul (URL)"
              htmlFor={`${idPrefix}-coverPhotoUrl`}
              error={errors.coverPhotoUrl?.message as string}
            >
              <Input
                id={`${idPrefix}-coverPhotoUrl`}
                placeholder="https://images.unsplash.com/..."
                {...register("coverPhotoUrl")}
              />
            </Field>
          </div>
        </div>
      )}

      {/* TAB 2: STRIP PHOTOBOOTH 4-CUT */}
      {activeTab === "photobooth" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 text-xs sm:text-sm text-amber-950">
            <p className="font-medium mb-1">Strip Photobooth 4-Frame (Life4Cuts)</p>
            <p className="text-amber-900/80 leading-relaxed">
              Masukkan 4 foto kenangan dari atas ke bawah untuk membentuk strip foto vertikal yang khas seperti hasil cetak photobox.
            </p>
          </div>

          {/* Preset Cepat */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-stone-600">Gunakan Set Foto Sampel:</span>
            <button
              type="button"
              onClick={() => applyPresetSet(PRESET_PHOTOBOOTHS[0])}
              className="text-xs bg-pink-100 text-pink-700 hover:bg-pink-200 px-3 py-1 rounded-full font-medium transition-colors"
            >
              Set Romantis 1
            </button>
            <button
              type="button"
              onClick={() => applyPresetSet(PRESET_PHOTOBOOTHS[1])}
              className="text-xs bg-stone-100 text-stone-700 hover:bg-stone-200 px-3 py-1 rounded-full font-medium transition-colors"
            >
              Set Romantis 2
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Judul Atas Photobooth"
              htmlFor={`${idPrefix}-photoboothTitle`}
              error={errors.photoboothTitle?.message as string}
            >
              <Input
                id={`${idPrefix}-photoboothTitle`}
                placeholder="Contoh: Life4Cuts With You • 2024"
                {...register("photoboothTitle")}
              />
            </Field>

            <Field
              label="Tanggal / Lokasi Cetak"
              htmlFor={`${idPrefix}-photoboothDate`}
              error={errors.photoboothDate?.message as string}
            >
              <Input
                id={`${idPrefix}-photoboothDate`}
                placeholder="Contoh: 14.07.2024 • Seoul Photobox"
                {...register("photoboothDate")}
              />
            </Field>
          </div>

          <div className="space-y-4 border-t border-stone-200 pt-4">
            <Field
              label="Foto 1: Frame Paling Atas (URL)"
              htmlFor={`${idPrefix}-photo1Url`}
              error={errors.photo1Url?.message as string}
            >
              <Input
                id={`${idPrefix}-photo1Url`}
                placeholder="https://images.unsplash.com/..."
                {...register("photo1Url")}
              />
            </Field>

            <Field
              label="Foto 2: Frame Kedua (URL)"
              htmlFor={`${idPrefix}-photo2Url`}
              error={errors.photo2Url?.message as string}
            >
              <Input
                id={`${idPrefix}-photo2Url`}
                placeholder="https://images.unsplash.com/..."
                {...register("photo2Url")}
              />
            </Field>

            <Field
              label="Foto 3: Frame Ketiga (URL)"
              htmlFor={`${idPrefix}-photo3Url`}
              error={errors.photo3Url?.message as string}
            >
              <Input
                id={`${idPrefix}-photo3Url`}
                placeholder="https://images.unsplash.com/..."
                {...register("photo3Url")}
              />
            </Field>

            <Field
              label="Foto 4: Frame Paling Bawah (URL)"
              htmlFor={`${idPrefix}-photo4Url`}
              error={errors.photo4Url?.message as string}
            >
              <Input
                id={`${idPrefix}-photo4Url`}
                placeholder="https://images.unsplash.com/..."
                {...register("photo4Url")}
              />
            </Field>
          </div>

          <Field
            label="Catatan di Bawah Strip Foto"
            htmlFor={`${idPrefix}-photoboothCaption`}
            error={errors.photoboothCaption?.message as string}
          >
            <Input
              id={`${idPrefix}-photoboothCaption`}
              placeholder="Contoh: Empat pose konyol, sejuta rasa bahagia bersamamu."
              {...register("photoboothCaption")}
            />
          </Field>
        </div>
      )}

      {/* TAB 3: SURAT JURNAL */}
      {activeTab === "letter" && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs sm:text-sm text-stone-700">
            <p className="font-medium text-stone-900 mb-1">Lembar Surat Kertas Grid Journal</p>
            <p className="text-stone-600 leading-relaxed">
              Tuliskan pesan cinta manis yang tertempel di samping strip foto photobooth.
            </p>
          </div>

          <Field
            label="Judul Surat Jurnal"
            htmlFor={`${idPrefix}-title`}
            error={errors.title?.message as string}
            required
          >
            <Input
              id={`${idPrefix}-title`}
              placeholder="Contoh: Halaman Khusus Untuk Pemilik Senyum Manis"
              {...register("title")}
            />
          </Field>

          <Field
            label="Isi Surat Cinta"
            htmlFor={`${idPrefix}-message`}
            error={errors.message?.message as string}
            required
            hint="Pisahkan setiap paragraf dengan baris kosong agar format kertas jurnal rapi."
          >
            <Textarea
              id={`${idPrefix}-message`}
              rows={11}
              placeholder="Tuliskan isi surat cintamu di sini..."
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
                placeholder="Contoh: Dengan sejuta peluk dan sayang,"
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
                placeholder="Contoh: Arka Pratama"
                {...register("signature")}
              />
            </Field>
          </div>
        </div>
      )}

      {/* TAB 4: POLAROID & TIKET KENANGAN */}
      {activeTab === "memories" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-pink-50/80 border border-pink-200 rounded-xl p-4 text-xs sm:text-sm text-pink-950">
            <p className="font-medium mb-1">Foto Polaroid Ekstra & Tiket Kencan</p>
            <p className="text-pink-900/80 leading-relaxed">
              Sertakan satu foto polaroid kenangan manis yang disematkan dengan washi tape di lembar jurnal, serta tiket kencan kenangan berdua (seperti tiket bioskop, konser, atau kafe).
            </p>
          </div>

          {/* Foto Polaroid Jurnal */}
          <div className="space-y-4 rounded-xl border border-stone-200 bg-white p-4">
            <h4 className="text-sm font-semibold text-stone-800">
              Foto Polaroid Kenangan di Lembar Jurnal
            </h4>
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-600">
                Pilihan Cepat Foto Polaroid:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PRESET_SCRAPBOOK_PHOTOS.map((p) => {
                  const isSelected = currentPolaroid === p.url;
                  return (
                    <button
                      key={`polaroid-${p.name}`}
                      type="button"
                      onClick={() =>
                        setValue("polaroidMemoryUrl", p.url, {
                          shouldValidate: true,
                          shouldDirty: true,
                        })
                      }
                      className={cn(
                        "relative aspect-square overflow-hidden rounded-xl border-2 transition-all text-left",
                        isSelected
                          ? "border-pink-500 ring-2 ring-pink-300"
                          : "border-stone-200 hover:border-stone-300",
                      )}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.thumb} alt={p.name} className="h-full w-full object-cover" />
                      {isSelected && (
                        <span className="absolute top-1 right-1 rounded-full bg-pink-500 p-0.5 text-white">
                          <Check className="h-3 w-3" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <Field
              label="Tautan Foto Polaroid (URL)"
              htmlFor={`${idPrefix}-polaroidMemoryUrl`}
              error={errors.polaroidMemoryUrl?.message as string}
              hint="Tempel tautan gambar dari Unsplash atau Cloudinary."
            >
              <Input
                id={`${idPrefix}-polaroidMemoryUrl`}
                placeholder="https://images.unsplash.com/..."
                {...register("polaroidMemoryUrl")}
              />
            </Field>

            <Field
              label="Keterangan Foto Polaroid (Caption)"
              htmlFor={`${idPrefix}-polaroidMemoryCaption`}
              error={errors.polaroidMemoryCaption?.message as string}
            >
              <Input
                id={`${idPrefix}-polaroidMemoryCaption`}
                placeholder="Contoh: Hari kita jalan berdua seharian penuh tawa."
                {...register("polaroidMemoryCaption")}
              />
            </Field>
          </div>

          {/* Tiket Kencan Kenangan */}
          <div className="space-y-4 rounded-xl border border-pink-200 bg-pink-50/40 p-4">
            <h4 className="text-sm font-semibold text-pink-900">
              Tiket Kencan Berdua (Ticket Stub)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="Nama Acara / Tiket Kencan"
                htmlFor={`${idPrefix}-ticketEvent`}
                error={errors.ticketEvent?.message as string}
                hint="Misal: Tiket Nonton Bioskop & Popcorn 🍿"
              >
                <Input
                  id={`${idPrefix}-ticketEvent`}
                  placeholder="Contoh: Tiket Nonton Bioskop & Es Krim Strawberry 🍦"
                  {...register("ticketEvent")}
                />
              </Field>

              <Field
                label="Tanggal / Detail Tiket"
                htmlFor={`${idPrefix}-ticketDate`}
                error={errors.ticketDate?.message as string}
                hint="Misal: Sabtu Sore, 14 Juli 2024 • Kursi D1 & D2"
              >
                <Input
                  id={`${idPrefix}-ticketDate`}
                  placeholder="Contoh: Sabtu Sore, 14 Juli 2024 • Kursi D1 & D2"
                  {...register("ticketDate")}
                />
              </Field>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: MEMO HAL FAVORIT */}
      {activeTab === "memos" && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          <div className="bg-pink-50/80 border border-pink-200 rounded-xl p-4 text-xs sm:text-sm text-pink-950">
            <p className="font-medium mb-1">Empat Memo Sticky Notes Pastel</p>
            <p className="text-pink-900/80 leading-relaxed">
              Tuliskan 4 hal kecil yang paling kamu sukai tentang pasanganmu. Kartu-kartu ini akan tampil miring manis layaknya sticky notes di jurnal.
            </p>
          </div>

          <Field
            label="Judul Seksi Memo"
            htmlFor={`${idPrefix}-stickyNotesTitle`}
            error={errors.stickyNotesTitle?.message as string}
          >
            <Input
              id={`${idPrefix}-stickyNotesTitle`}
              placeholder="Hal-Hal Kecil Favoritku Tentangmu 📌"
              {...register("stickyNotesTitle")}
            />
          </Field>

          <Field
            label="Memo 1: Senyuman / Tatapan Mata"
            htmlFor={`${idPrefix}-memo1`}
            error={errors.memo1?.message as string}
          >
            <Input
              id={`${idPrefix}-memo1`}
              placeholder="Caramu tersenyum malu-malu saat kupuji, matamu selalu menyipit gemas."
              {...register("memo1")}
            />
          </Field>

          <Field
            label="Memo 2: Momen Berdua Favorit"
            htmlFor={`${idPrefix}-memo2`}
            error={errors.memo2?.message as string}
          >
            <Input
              id={`${idPrefix}-memo2`}
              placeholder="Duduk berdampingan di kafe favorit sambil mendengarkan satu earphone berdua."
              {...register("memo2")}
            />
          </Field>

          <Field
            label="Memo 3: Kebiasaan Lucu"
            htmlFor={`${idPrefix}-memo3`}
            error={errors.memo3?.message as string}
          >
            <Input
              id={`${idPrefix}-memo3`}
              placeholder="Bagaimana kamu selalu memesan es matcha lalu mencuri kentang gorengku."
              {...register("memo3")}
            />
          </Field>

          <Field
            label="Memo 4: Harapan Manis Esok Hari"
            htmlFor={`${idPrefix}-memo4`}
            error={errors.memo4?.message as string}
          >
            <Input
              id={`${idPrefix}-memo4`}
              placeholder="Menciptakan lebih banyak halaman scrapbook kenangan manis bersamamu."
              {...register("memo4")}
            />
          </Field>
        </div>
      )}

      {/* TAB 5: WARNA & MUSIK */}
      {activeTab === "theme" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs sm:text-sm text-stone-700">
            <p className="font-medium text-stone-900 mb-1">Palet Scrapbook & Melodi Akustik</p>
            <p className="text-stone-600 leading-relaxed">
              Atur warna selotip washi tape, latar belakang meja jurnal, dan lagu akustik pengiring.
            </p>
          </div>

          {/* Pengaturan Warna - Setiap Bagian Memiliki Box Tersendiri Secara Vertikal */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
              <Field label="Warna Aksen Washi Tape & Pita" htmlFor={`${idPrefix}-primaryColor`}>
                <ColorPickerField
                  value={(watch("primaryColor") as string) || "#f472b6"}
                  onChange={(hex) =>
                    setValue("primaryColor", hex, { shouldValidate: true, shouldDirty: true })
                  }
                  presets={SCRAPBOOK_COLOR_PRESETS}
                  helperText="Warna selotip washi tape pastel, stiker cinta, dan tombol interaktif."
                />
              </Field>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
              <Field label="Warna Meja / Kanvas Luar" htmlFor={`${idPrefix}-backgroundColor`}>
                <ColorPickerField
                  value={(watch("backgroundColor") as string) || "#faf7f2"}
                  onChange={(hex) =>
                    setValue("backgroundColor", hex, { shouldValidate: true, shouldDirty: true })
                  }
                  presets={BACKGROUND_COLOR_PRESETS}
                  helperText="Warna kanvas di luar buku jurnal."
                />
              </Field>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
              <Field label="Warna Kertas Jurnal (Grid Sheet)" htmlFor={`${idPrefix}-cardColor`}>
                <ColorPickerField
                  value={(watch("cardColor") as string) || "#ffffff"}
                  onChange={(hex) =>
                    setValue("cardColor", hex, { shouldValidate: true, shouldDirty: true })
                  }
                  presets={CARD_COLOR_PRESETS}
                  helperText="Warna lembaran kertas jurnal."
                />
              </Field>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
              <Field label="Warna Teks Judul" htmlFor={`${idPrefix}-textColor`}>
                <ColorPickerField
                  value={(watch("textColor") as string) || "#27272a"}
                  onChange={(hex) =>
                    setValue("textColor", hex, { shouldValidate: true, shouldDirty: true })
                  }
                  presets={TEXT_COLOR_PRESETS}
                  helperText="Warna teks judul jurnal dan surat."
                />
              </Field>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
              <Field label="Warna Teks Isi Paragraf" htmlFor={`${idPrefix}-bodyTextColor`}>
                <ColorPickerField
                  value={(watch("bodyTextColor") as string) || "#4b5563"}
                  onChange={(hex) =>
                    setValue("bodyTextColor", hex, { shouldValidate: true, shouldDirty: true })
                  }
                  presets={TEXT_COLOR_PRESETS}
                  helperText="Warna teks isi paragraf surat."
                />
              </Field>
            </div>
          </div>

          {/* Audio Musik dalam Box Tersendiri */}
          <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Audio Melodi Akustik Scrapbook
            </h4>

            <Field
              label="Judul Musik"
              htmlFor={`${idPrefix}-musicTitle`}
              error={errors.musicTitle?.message as string}
            >
              <Input
                id={`${idPrefix}-musicTitle`}
                placeholder="Acoustic Ukulele & Coffee Morning"
                {...register("musicTitle")}
              />
            </Field>

            <Field
              label="Tautan File Audio (.mp3)"
              htmlFor={`${idPrefix}-bgMusicUrl`}
              error={errors.bgMusicUrl?.message as string}
              hint="Tautan langsung ke file audio mp3 akustik lo-fi (misal dari Pixabay)."
            >
              <Input
                id={`${idPrefix}-bgMusicUrl`}
                placeholder="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3"
                {...register("bgMusicUrl")}
              />
            </Field>
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
            className="flex items-center gap-1 text-xs sm:text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 px-4 py-1.5 rounded-lg transition-colors shadow-sm ml-auto font-semibold"
          >
            Lanjut: {tabs[currentTabIndex + 1].label}
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
