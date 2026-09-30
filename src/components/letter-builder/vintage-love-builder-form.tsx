"use client";

import { useState } from "react";
import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import {
  Compass,
  Image as ImageIcon,
  Scroll,
  Lock,
  Palette,
  ChevronRight,
  ChevronLeft,
  Check,
  Clock,
  Disc,
  Ticket,
  Newspaper,
  Milestone,
  Send,
} from "lucide-react";
import { Field, Input, Textarea } from "@/components/ui/field";
import { ColorPickerField } from "@/components/ui/color-picker-field";
import { AudioUploadField } from "@/components/ui/audio-upload-field";
import {
  VINTAGE_LOVE_COLOR_PRESETS,
  BACKGROUND_COLOR_PRESETS,
  CARD_COLOR_PRESETS,
  TEXT_COLOR_PRESETS,
} from "@/templates/color-presets";
import { cn } from "@/lib/utils/cn";
import type { LetterFormValues } from "./dynamic-form";

interface VintageLoveBuilderFormProps {
  register: UseFormRegister<LetterFormValues>;
  setValue: UseFormSetValue<LetterFormValues>;
  watch: UseFormWatch<LetterFormValues>;
  errors: FieldErrors<LetterFormValues>;
  idPrefix?: string;
}

type TabType =
  | "envelope"
  | "letter"
  | "vintage_features"
  | "journal"
  | "memories"
  | "theme";

const PRESET_VINTAGE_PHOTOS = [
  {
    name: "Genggaman Tangan Hangat",
    url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1000&q=80",
    thumb: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Senja Tepi Pantai Romantis",
    url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1000&q=80",
    thumb: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Lentera & Senyum Manis",
    url: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=1000&q=80",
    thumb: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Pelukan di Bawah Hujan",
    url: "https://images.unsplash.com/photo-1513279922550-250c2129b13a?auto=format&fit=crop&w=1000&q=80",
    thumb: "https://images.unsplash.com/photo-1513279922550-250c2129b13a?auto=format&fit=crop&w=200&q=60",
  },
];

export function VintageLoveBuilderForm({
  register,
  setValue,
  watch,
  errors,
  idPrefix = "vintage-love",
}: VintageLoveBuilderFormProps) {
  const [activeTab, setActiveTab] = useState<TabType>("envelope");

  const tabs: Array<{ id: TabType; label: string; icon: typeof Compass }> = [
    { id: "envelope", label: "Amplop", icon: Compass },
    { id: "letter", label: "Warkat Utama", icon: Scroll },
    { id: "vintage_features", label: "Jam & Piringan", icon: Clock },
    { id: "journal", label: "Koran & Babak", icon: Newspaper },
    { id: "memories", label: "Foto & Janji", icon: ImageIcon },
    { id: "theme", label: "Warna & Musik", icon: Palette },
  ];

  const currentTabIndex = tabs.findIndex((t) => t.id === activeTab);
  const currentPhotoUrl = watch("photoUrl") as string;

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
                  ? "bg-white text-rose-950 shadow-sm border border-stone-200"
                  : "text-stone-600 hover:text-stone-900 hover:bg-stone-200/50",
              )}
            >
              <Icon className={cn("w-4 h-4", isActive ? "text-rose-700" : "text-stone-400")} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: AMPLOP & CAP POS */}
      {activeTab === "envelope" && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          <div className="bg-rose-50/70 border border-rose-200/80 rounded-xl p-4 text-xs sm:text-sm text-rose-950">
            <p className="font-medium mb-1">Amplop Klasik & Segel Lilin</p>
            <p className="text-rose-900/80 leading-relaxed">
              Atur tampilan luar amplop vintage: nama pasanganmu, stempel cap pos kota & tanggal kenangan, serta inisial di atas segel lilin 3D.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Nama Kekasih (Penerima)"
              htmlFor={`${idPrefix}-recipientName`}
              error={errors.recipientName?.message as string}
              required
              hint="Nama yang terukir di bagian depan amplop surat."
            >
              <Input
                id={`${idPrefix}-recipientName`}
                placeholder="Contoh: Adinda Kirana"
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
                placeholder="Contoh: Bima Arya"
                {...register("senderName")}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Kota Kenangan Cap Pos"
              htmlFor={`${idPrefix}-postmarkCity`}
              error={errors.postmarkCity?.message as string}
              hint="Kota tempat kenangan indah terukir."
            >
              <Input
                id={`${idPrefix}-postmarkCity`}
                placeholder="Contoh: Bandung, Jawa Barat"
                {...register("postmarkCity")}
              />
            </Field>

            <Field
              label="Tanggal Cap Pos"
              htmlFor={`${idPrefix}-postmarkDate`}
              error={errors.postmarkDate?.message as string}
              hint="Tanggal spesial atau anniversary."
            >
              <Input
                id={`${idPrefix}-postmarkDate`}
                placeholder="Contoh: 21 September 2024"
                {...register("postmarkDate")}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Inisial Segel Lilin (Wax Seal)"
              htmlFor={`${idPrefix}-sealInitials`}
              error={errors.sealInitials?.message as string}
              hint="Maksimal 10 karakter (misal: B & A atau ❤️)."
            >
              <Input
                id={`${idPrefix}-sealInitials`}
                placeholder="Contoh: B & A"
                {...register("sealInitials")}
              />
            </Field>

            <Field
              label="Hari Jadian / Perayaan Cinta"
              htmlFor={`${idPrefix}-loveAnniversary`}
              error={errors.loveAnniversary?.message as string}
              hint="Ditampilkan di samping cap pos amplop."
            >
              <Input
                id={`${idPrefix}-loveAnniversary`}
                placeholder="Contoh: 14 Februari 2022 • Hari Pertama Bertemu"
                {...register("loveAnniversary")}
              />
            </Field>
          </div>

          <Field
            label="Foto Pribadi Prangko Amplop (URL)"
            htmlFor={`${idPrefix}-stampPhotoUrl`}
            error={errors.stampPhotoUrl?.message as string}
            hint="Foto mini pasangan yang tercetak di sudut prangko retro amplop."
          >
            <Input
              id={`${idPrefix}-stampPhotoUrl`}
              placeholder="https://images.unsplash.com/..."
              {...register("stampPhotoUrl")}
            />
          </Field>
        </div>
      )}

      {/* TAB 2: WARKAT CINTA (SURAT UTAMA) */}
      {activeTab === "letter" && (
        <div className="space-y-5 animate-in fade-in-50 duration-200">
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs sm:text-sm text-stone-700">
            <p className="font-medium text-stone-900 mb-1">Lembaran Perkamen Klasik</p>
            <p className="text-stone-600 leading-relaxed">
              Tuliskan isi surat cinta penuh perasaan. Tata letak tipografi serif akan membuatnya tampil seperti tulisan pena di atas kertas perkamen klasik.
            </p>
          </div>

          <Field
            label="Judul Surat Cinta"
            htmlFor={`${idPrefix}-title`}
            error={errors.title?.message as string}
            required
          >
            <Input
              id={`${idPrefix}-title`}
              placeholder="Contoh: Sebuah Warkat Kasih Dari Lubuk Hati"
              {...register("title")}
            />
          </Field>

          <Field
            label="Salam Pembuka Mesra"
            htmlFor={`${idPrefix}-salutation`}
            error={errors.salutation?.message as string}
            required
            hint="Sapaan manis mengawali surat."
          >
            <Input
              id={`${idPrefix}-salutation`}
              placeholder="Contoh: Kepada Pemilik Senyum yang Selalu Kurindukan,"
              {...register("salutation")}
            />
          </Field>

          <Field
            label="Lokasi Penulisan Warkat"
            htmlFor={`${idPrefix}-letterLocation`}
            error={errors.letterLocation?.message as string}
            hint="Contoh: Ditulis dari sudut kedai kopi kenangan kita."
          >
            <Input
              id={`${idPrefix}-letterLocation`}
              placeholder="Contoh: Ditulis dari sudut kedai kopi kenangan kita"
              {...register("letterLocation")}
            />
          </Field>

          <Field
            label="Isi Surat Cinta"
            htmlFor={`${idPrefix}-message`}
            error={errors.message?.message as string}
            required
            hint="Pisahkan setiap paragraf dengan baris kosong agar format perkamen rapi."
          >
            <Textarea
              id={`${idPrefix}-message`}
              rows={11}
              placeholder="Tuliskan kata-kata puitis, rasa rindu, dan pengakuan cintamu di sini..."
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
                placeholder="Contoh: Selamanya mengagumi dan menyayangimu,"
                {...register("closingStatement")}
              />
            </Field>

            <Field
              label="Tanda Tangan Pengirim"
              htmlFor={`${idPrefix}-signature`}
              error={errors.signature?.message as string}
            >
              <Input
                id={`${idPrefix}-signature`}
                placeholder="Contoh: Bima Arya"
                {...register("signature")}
              />
            </Field>
          </div>
        </div>
      )}

      {/* TAB 3: JAM SAKU, PIRINGAN HITAM & TIKET VINTAGE */}
      {activeTab === "vintage_features" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          {/* Jam Saku Waktu Abadi */}
          <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
              <Clock className="h-4 w-4 text-rose-800" />
              <h4 className="text-sm font-semibold text-stone-800">
                1. Jam Saku Antik (Pocket Watch Real-time Counter)
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="Tanggal Mulai Hubungan / Jadian"
                htmlFor={`${idPrefix}-anniversaryDate`}
                error={errors.anniversaryDate?.message as string}
                hint="Format YYYY-MM-DD (misal: 2022-02-14) untuk menghitung detik cinta secara live."
              >
                <Input
                  id={`${idPrefix}-anniversaryDate`}
                  placeholder="2022-02-14"
                  {...register("anniversaryDate")}
                />
              </Field>

              <Field
                label="Kutipan Romantis Jam Saku"
                htmlFor={`${idPrefix}-counterSubtitle`}
                error={errors.counterSubtitle?.message as string}
              >
                <Input
                  id={`${idPrefix}-counterSubtitle`}
                  placeholder="Detik demi detik bersamamu adalah anugerah terindah"
                  {...register("counterSubtitle")}
                />
              </Field>
            </div>
          </div>

          {/* Piringan Hitam Vinyl Gramofon */}
          <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
              <Disc className="h-4 w-4 text-rose-800" />
              <h4 className="text-sm font-semibold text-stone-800">
                2. Piringan Hitam Vinyl Gramofon (Interactive Turntable)
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="Judul Lagu Favorit Berdua"
                htmlFor={`${idPrefix}-vinylSongTitle`}
                error={errors.vinylSongTitle?.message as string}
              >
                <Input
                  id={`${idPrefix}-vinylSongTitle`}
                  placeholder="Can't Help Falling in Love"
                  {...register("vinylSongTitle")}
                />
              </Field>

              <Field
                label="Penyanyi / Komponis"
                htmlFor={`${idPrefix}-vinylArtist`}
                error={errors.vinylArtist?.message as string}
              >
                <Input
                  id={`${idPrefix}-vinylArtist`}
                  placeholder="Elvis Presley • Side A Track 01"
                  {...register("vinylArtist")}
                />
              </Field>
            </div>

            <Field
              label="Catatan Tepi Lagu (Side Note)"
              htmlFor={`${idPrefix}-vinylSideNote`}
              error={errors.vinylSideNote?.message as string}
            >
              <Input
                id={`${idPrefix}-vinylSideNote`}
                placeholder="Lagu yang selalu berputar di sanubari setiap kali mengingat senyummu."
                {...register("vinylSideNote")}
              />
            </Field>
          </div>

          {/* Tiket Kereta / Bioskop Klasik */}
          <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
              <Ticket className="h-4 w-4 text-rose-800" />
              <h4 className="text-sm font-semibold text-stone-800">
                3. Tiket Perjalanan Cinta Klasik (Vintage Boarding Pass)
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="Titik Berangkat (Origin)"
                htmlFor={`${idPrefix}-ticketOrigin`}
                error={errors.ticketOrigin?.message as string}
              >
                <Input
                  id={`${idPrefix}-ticketOrigin`}
                  placeholder="Pertemuan Pertama di Braga"
                  {...register("ticketOrigin")}
                />
              </Field>

              <Field
                label="Tujuan Akhir (Destination)"
                htmlFor={`${idPrefix}-ticketDestination`}
                error={errors.ticketDestination?.message as string}
              >
                <Input
                  id={`${idPrefix}-ticketDestination`}
                  placeholder="Menua Bersama Selamanya"
                  {...register("ticketDestination")}
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="Nomor Kursi / Gerbong"
                htmlFor={`${idPrefix}-ticketSeat`}
                error={errors.ticketSeat?.message as string}
              >
                <Input
                  id={`${idPrefix}-ticketSeat`}
                  placeholder="Gerbong Kasih No. 01 (VIP)"
                  {...register("ticketSeat")}
                />
              </Field>

              <Field
                label="Masa Berlaku Tiket"
                htmlFor={`${idPrefix}-ticketDate`}
                error={errors.ticketDate?.message as string}
              >
                <Input
                  id={`${idPrefix}-ticketDate`}
                  placeholder="Seumur Hidup & Tak Berujung"
                  {...register("ticketDate")}
                />
              </Field>
            </div>

            <Field
              label="Pesan Tiket (Catatan Khusus)"
              htmlFor={`${idPrefix}-ticketNote`}
              error={errors.ticketNote?.message as string}
            >
              <Input
                id={`${idPrefix}-ticketNote`}
                placeholder="Tiket sekali jalan menuju kebahagiaan abadi, berlaku tanpa batas masa."
                {...register("ticketNote")}
              />
            </Field>
          </div>
        </div>
      )}

      {/* TAB 4: KORAN CINTA, 4 BABAK KASIH & TELEGRAM */}
      {activeTab === "journal" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          {/* Warta Berita Cinta (Kliping Koran Klasik) */}
          <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
              <Newspaper className="h-4 w-4 text-rose-800" />
              <h4 className="text-sm font-semibold text-stone-800">
                4. Warta Berita Cinta (The Daily Romance Herald)
              </h4>
            </div>

            <Field
              label="Tajuk Utama Berita (Headline Koran)"
              htmlFor={`${idPrefix}-newspaperHeadline`}
              error={errors.newspaperHeadline?.message as string}
            >
              <Input
                id={`${idPrefix}-newspaperHeadline`}
                placeholder="WARGA GEMPAR: DUA HATI RESMI TERIKAT JANJI SUCI"
                {...register("newspaperHeadline")}
              />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="Sub-tajuk Berita"
                htmlFor={`${idPrefix}-newspaperSub`}
                error={errors.newspaperSub?.message as string}
              >
                <Input
                  id={`${idPrefix}-newspaperSub`}
                  placeholder="Edisi Khusus Romansa • Terbit untuk Mengabadikan Kisah Terindah"
                  {...register("newspaperSub")}
                />
              </Field>

              <Field
                label="Tanggal / Edisi Koran"
                htmlFor={`${idPrefix}-newspaperDate`}
                error={errors.newspaperDate?.message as string}
              >
                <Input
                  id={`${idPrefix}-newspaperDate`}
                  placeholder="Edisi Kenangan Abadi No. 781"
                  {...register("newspaperDate")}
                />
              </Field>
            </div>

            <Field
              label="Isi Artikel Berita Koran"
              htmlFor={`${idPrefix}-newspaperBody`}
              error={errors.newspaperBody?.message as string}
              hint="Kisah berita cinta ala artikel koran tempo dulu."
            >
              <Textarea
                id={`${idPrefix}-newspaperBody`}
                rows={3}
                placeholder="Kabar bahagia mengudara ke seluruh pelosok..."
                {...register("newspaperBody")}
              />
            </Field>
          </div>

          {/* The Chronicles of Us (4 Babak Perjalanan Cinta) */}
          <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-2xs space-y-5">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
              <Milestone className="h-4 w-4 text-rose-800" />
              <h4 className="text-sm font-semibold text-stone-800">
                5. Jejak Babak Kasih (The Chronicles of Us &bull; 4 Chapters)
              </h4>
            </div>

            {/* Babak 1 */}
            <div className="rounded-xl border border-stone-200/90 bg-stone-50/50 p-3.5 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Babak I - Judul" htmlFor={`${idPrefix}-chapter1Title`}>
                  <Input
                    id={`${idPrefix}-chapter1Title`}
                    placeholder="Babak I: Pertemuan Pertama"
                    {...register("chapter1Title")}
                  />
                </Field>
                <Field label="Babak I - Waktu / Momen" htmlFor={`${idPrefix}-chapter1Year`}>
                  <Input
                    id={`${idPrefix}-chapter1Year`}
                    placeholder="14 Februari 2022"
                    {...register("chapter1Year")}
                  />
                </Field>
              </div>
              <Field label="Babak I - Kisah Kenangan" htmlFor={`${idPrefix}-chapter1Story`}>
                <Input
                  id={`${idPrefix}-chapter1Story`}
                  placeholder="Hari di mana tatap mata kita pertama kali bersirobok..."
                  {...register("chapter1Story")}
                />
              </Field>
            </div>

            {/* Babak 2 */}
            <div className="rounded-xl border border-stone-200/90 bg-stone-50/50 p-3.5 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Babak II - Judul" htmlFor={`${idPrefix}-chapter2Title`}>
                  <Input
                    id={`${idPrefix}-chapter2Title`}
                    placeholder="Babak II: Mengikat Janji Kasih"
                    {...register("chapter2Title")}
                  />
                </Field>
                <Field label="Babak II - Waktu / Momen" htmlFor={`${idPrefix}-chapter2Year`}>
                  <Input
                    id={`${idPrefix}-chapter2Year`}
                    placeholder="21 September 2022"
                    {...register("chapter2Year")}
                  />
                </Field>
              </div>
              <Field label="Babak II - Kisah Kenangan" htmlFor={`${idPrefix}-chapter2Story`}>
                <Input
                  id={`${idPrefix}-chapter2Story`}
                  placeholder="Di bawah temaram lampu kota, dua hati akhirnya berani saling mengakui..."
                  {...register("chapter2Story")}
                />
              </Field>
            </div>

            {/* Babak 3 */}
            <div className="rounded-xl border border-stone-200/90 bg-stone-50/50 p-3.5 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Babak III - Judul" htmlFor={`${idPrefix}-chapter3Title`}>
                  <Input
                    id={`${idPrefix}-chapter3Title`}
                    placeholder="Babak III: Badai yang Kita Lewati"
                    {...register("chapter3Title")}
                  />
                </Field>
                <Field label="Babak III - Waktu / Momen" htmlFor={`${idPrefix}-chapter3Year`}>
                  <Input
                    id={`${idPrefix}-chapter3Year`}
                    placeholder="Tahun 2023"
                    {...register("chapter3Year")}
                  />
                </Field>
              </div>
              <Field label="Babak III - Kisah Kenangan" htmlFor={`${idPrefix}-chapter3Story`}>
                <Input
                  id={`${idPrefix}-chapter3Story`}
                  placeholder="Tak selamanya langit cerah, namun setiap kerikil justru memperkokoh kasih kita..."
                  {...register("chapter3Story")}
                />
              </Field>
            </div>

            {/* Babak 4 */}
            <div className="rounded-xl border border-stone-200/90 bg-stone-50/50 p-3.5 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Babak IV - Judul" htmlFor={`${idPrefix}-chapter4Title`}>
                  <Input
                    id={`${idPrefix}-chapter4Title`}
                    placeholder="Babak IV: Menua Bersama"
                    {...register("chapter4Title")}
                  />
                </Field>
                <Field label="Babak IV - Waktu / Momen" htmlFor={`${idPrefix}-chapter4Year`}>
                  <Input
                    id={`${idPrefix}-chapter4Year`}
                    placeholder="Hari Ini & Selamanya"
                    {...register("chapter4Year")}
                  />
                </Field>
              </div>
              <Field label="Babak IV - Kisah Kenangan" htmlFor={`${idPrefix}-chapter4Story`}>
                <Input
                  id={`${idPrefix}-chapter4Story`}
                  placeholder="Kini hingga rambut memutih dan langkah melambat..."
                  {...register("chapter4Story")}
                />
              </Field>
            </div>
          </div>

          {/* Telegram Kilat Mesin Tik */}
          <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
              <Send className="h-4 w-4 text-rose-800" />
              <h4 className="text-sm font-semibold text-stone-800">
                6. Surat Telegram Kilat Mesin Tik (Typewriter Telegram)
              </h4>
            </div>

            <Field
              label="Isi Kawat Telegram"
              htmlFor={`${idPrefix}-telegramMessage`}
              error={errors.telegramMessage?.message as string}
              hint="Gunakan kata STOP antar kalimat untuk nuansa telegram kawat vintage autentik."
            >
              <Textarea
                id={`${idPrefix}-telegramMessage`}
                rows={3}
                placeholder="BERITA KILAT STOP DUA HATI TELAH RESMI BERPADU STOP TIDAK ADA YANG BISA MEMISAHKAN KITA LAGI STOP SAYANG KAMU SELALU STOP"
                {...register("telegramMessage")}
              />
            </Field>
          </div>
        </div>
      )}

      {/* TAB 5: FOTO KENANGAN & JANJI */}
      {activeTab === "memories" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          {/* FOTO 1 */}
          <div className="space-y-4 rounded-2xl border border-stone-200 bg-white p-5 shadow-2xs">
            <h4 className="text-sm font-semibold text-stone-800">Foto Kenangan Utama (Pertama)</h4>
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-600">
                Pilihan Cepat Foto 1:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PRESET_VINTAGE_PHOTOS.map((p) => {
                  const isSelected = currentPhotoUrl === p.url;
                  return (
                    <button
                      key={p.name}
                      type="button"
                      onClick={() =>
                        setValue("photoUrl", p.url, { shouldValidate: true, shouldDirty: true })
                      }
                      className={cn(
                        "relative aspect-square overflow-hidden rounded-xl border-2 transition-all text-left",
                        isSelected
                          ? "border-rose-600 ring-2 ring-rose-300"
                          : "border-stone-200 hover:border-stone-300",
                      )}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.thumb} alt={p.name} className="h-full w-full object-cover" />
                      {isSelected && (
                        <span className="absolute top-1 right-1 rounded-full bg-rose-600 p-0.5 text-white">
                          <Check className="h-3 w-3" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <Field
              label="Tautan Foto 1 (URL)"
              htmlFor={`${idPrefix}-photoUrl`}
              error={errors.photoUrl?.message as string}
              hint="Tempel tautan gambar (misal dari Unsplash / Cloudinary)."
            >
              <Input
                id={`${idPrefix}-photoUrl`}
                placeholder="https://images.unsplash.com/..."
                {...register("photoUrl")}
              />
            </Field>

            <Field
              label="Keterangan Foto 1 (Caption)"
              htmlFor={`${idPrefix}-photoCaption`}
              error={errors.photoCaption?.message as string}
            >
              <Input
                id={`${idPrefix}-photoCaption`}
                placeholder="Contoh: Kenangan senja saat kita berjanji untuk saling menjaga selamanya."
                {...register("photoCaption")}
              />
            </Field>
          </div>

          {/* FOTO 2 */}
          <div className="space-y-4 rounded-2xl border border-stone-200 bg-white p-5 shadow-2xs">
            <h4 className="text-sm font-semibold text-stone-800">Foto Kenangan Kedua (Opsional)</h4>
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-600">
                Pilihan Cepat Foto 2:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PRESET_VINTAGE_PHOTOS.map((p) => {
                  const currentPhoto2 = watch("photo2Url") as string;
                  const isSelected = currentPhoto2 === p.url;
                  return (
                    <button
                      key={`photo2-${p.name}`}
                      type="button"
                      onClick={() =>
                        setValue("photo2Url", p.url, { shouldValidate: true, shouldDirty: true })
                      }
                      className={cn(
                        "relative aspect-square overflow-hidden rounded-xl border-2 transition-all text-left",
                        isSelected
                          ? "border-rose-600 ring-2 ring-rose-300"
                          : "border-stone-200 hover:border-stone-300",
                      )}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.thumb} alt={p.name} className="h-full w-full object-cover" />
                      {isSelected && (
                        <span className="absolute top-1 right-1 rounded-full bg-rose-600 p-0.5 text-white">
                          <Check className="h-3 w-3" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <Field
              label="Tautan Foto 2 (URL)"
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
              label="Keterangan Foto 2 (Caption)"
              htmlFor={`${idPrefix}-photo2Caption`}
              error={errors.photo2Caption?.message as string}
            >
              <Input
                id={`${idPrefix}-photo2Caption`}
                placeholder="Contoh: Tawa lepas kita di tepi dermaga sore itu."
                {...register("photo2Caption")}
              />
            </Field>
          </div>

          {/* BISIKAN RAHASIA */}
          <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
              <Lock className="h-4 w-4 text-rose-800" />
              <h4 className="text-sm font-semibold text-stone-800">Catatan Rahasia Tersembunyi</h4>
            </div>

            <Field
              label="Judul Catatan Rahasia"
              htmlFor={`${idPrefix}-secretNoteTitle`}
              error={errors.secretNoteTitle?.message as string}
            >
              <Input
                id={`${idPrefix}-secretNoteTitle`}
                placeholder="Bisikan Rahasia untuk Hatimu ✨"
                {...register("secretNoteTitle")}
              />
            </Field>

            <Field
              label="Isi Catatan Rahasia (Terkunci)"
              htmlFor={`${idPrefix}-secretNoteContent`}
              error={errors.secretNoteContent?.message as string}
              hint="Pesan manis atau bisikan cinta yang hanya terbuka saat tombol diklik."
            >
              <Textarea
                id={`${idPrefix}-secretNoteContent`}
                rows={3}
                placeholder="Jika suatu saat dunia terasa terlalu bising dan melelahkan, ingatlah bahwa kamu tidak pernah sendirian..."
                {...register("secretNoteContent")}
              />
            </Field>
          </div>

          {/* TIGA JANJI SETIA */}
          <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-2xs space-y-4">
            <h4 className="text-sm font-semibold text-stone-800">Tiga Janji Setia untuk Hari Esok</h4>

            <Field
              label="Judul Seksi Janji"
              htmlFor={`${idPrefix}-promisesTitle`}
              error={errors.promisesTitle?.message as string}
            >
              <Input
                id={`${idPrefix}-promisesTitle`}
                placeholder="Tiga Janji Setia untuk Hari Esok"
                {...register("promisesTitle")}
              />
            </Field>

            <Field
              label="Janji 1"
              htmlFor={`${idPrefix}-promise1`}
              error={errors.promise1?.message as string}
            >
              <Input
                id={`${idPrefix}-promise1`}
                placeholder="Selalu mendengarkan ceritamu dengan penuh ketulusan di setiap hari lelahmu."
                {...register("promise1")}
              />
            </Field>

            <Field
              label="Janji 2"
              htmlFor={`${idPrefix}-promise2`}
              error={errors.promise2?.message as string}
            >
              <Input
                id={`${idPrefix}-promise2`}
                placeholder="Menjadi tempat pulang yang paling aman dan menghangatkan hatimu."
                {...register("promise2")}
              />
            </Field>

            <Field
              label="Janji 3"
              htmlFor={`${idPrefix}-promise3`}
              error={errors.promise3?.message as string}
            >
              <Input
                id={`${idPrefix}-promise3`}
                placeholder="Terus memilihmu dan mencintaimu dalam setiap babak perjalanan kita."
                {...register("promise3")}
              />
            </Field>
          </div>
        </div>
      )}

      {/* TAB 6: WARNA & MUSIK */}
      {activeTab === "theme" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs sm:text-sm text-stone-700">
            <p className="font-medium text-stone-900 mb-1">Atmosfer Visual & Musik Klasik</p>
            <p className="text-stone-600 leading-relaxed">
              Pilih perpaduan warna segel lilin dan alunan musik instrumental untuk mengiringi warkat kasih ini.
            </p>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
              <Field label="Warna Segel Lilin & Cap Pos" htmlFor={`${idPrefix}-primaryColor`}>
                <ColorPickerField
                  value={(watch("primaryColor") as string) || "#781d2f"}
                  onChange={(hex) =>
                    setValue("primaryColor", hex, { shouldValidate: true, shouldDirty: true })
                  }
                  presets={VINTAGE_LOVE_COLOR_PRESETS}
                  helperText="Warna stempel cap lilin 3D, garis ornamen, dan aksen cinta."
                />
              </Field>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
              <Field label="Warna Latar Belakang Halaman" htmlFor={`${idPrefix}-backgroundColor`}>
                <ColorPickerField
                  value={(watch("backgroundColor") as string) || "#f6f1ea"}
                  onChange={(hex) =>
                    setValue("backgroundColor", hex, { shouldValidate: true, shouldDirty: true })
                  }
                  presets={BACKGROUND_COLOR_PRESETS}
                  helperText="Warna kanvas di luar amplop."
                />
              </Field>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
              <Field label="Warna Kertas Perkamen" htmlFor={`${idPrefix}-cardColor`}>
                <ColorPickerField
                  value={(watch("cardColor") as string) || "#fffdf9"}
                  onChange={(hex) =>
                    setValue("cardColor", hex, { shouldValidate: true, shouldDirty: true })
                  }
                  presets={CARD_COLOR_PRESETS}
                  helperText="Warna lembaran surat perkamen."
                />
              </Field>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
              <Field label="Warna Teks Judul & Cap" htmlFor={`${idPrefix}-textColor`}>
                <ColorPickerField
                  value={(watch("textColor") as string) || "#3e1b24"}
                  onChange={(hex) =>
                    setValue("textColor", hex, { shouldValidate: true, shouldDirty: true })
                  }
                  presets={TEXT_COLOR_PRESETS}
                  helperText="Warna judul surat dan cap pos."
                />
              </Field>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs">
              <Field label="Warna Teks Isi Surat" htmlFor={`${idPrefix}-bodyTextColor`}>
                <ColorPickerField
                  value={(watch("bodyTextColor") as string) || "#4a3b32"}
                  onChange={(hex) =>
                    setValue("bodyTextColor", hex, { shouldValidate: true, shouldDirty: true })
                  }
                  presets={TEXT_COLOR_PRESETS}
                  helperText="Warna tulisan paragraf perkamen."
                />
              </Field>
            </div>
          </div>

          <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5 shadow-2xs space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
              Audio Musik Pengiring (Piringan Hitam)
            </h4>

            <Field
              label="Judul Musik"
              htmlFor={`${idPrefix}-musicTitle`}
              error={errors.musicTitle?.message as string}
            >
              <Input
                id={`${idPrefix}-musicTitle`}
                placeholder="Romantic Music Box & Cello"
                {...register("musicTitle")}
              />
            </Field>

            <AudioUploadField
              id={`${idPrefix}-bgMusicUrl`}
              label="Unggah File Musik Pengiring (Opsional)"
              value={(watch("bgMusicUrl") as string) || ""}
              onChange={(url) =>
                setValue("bgMusicUrl", url, { shouldValidate: true, shouldDirty: true })
              }
              helperText="Pilih lagu cinta dari perangkat Anda (.mp3, .wav, .m4a). Kosongkan jika tidak ingin memutar musik."
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
            className="flex items-center gap-1 text-xs sm:text-sm font-medium text-white bg-rose-800 hover:bg-rose-900 px-4 py-1.5 rounded-lg transition-colors shadow-sm ml-auto"
          >
            Lanjut: {tabs[currentTabIndex + 1].label}
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
