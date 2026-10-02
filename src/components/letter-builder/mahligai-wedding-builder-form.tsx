"use client";

import { useState } from "react";
import type {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  FieldErrors,
} from "react-hook-form";
import type { LetterFormValues } from "./dynamic-form";
import { Field, Input, Textarea } from "@/components/ui/field";
import { ImageUploadField } from "@/components/ui/image-upload-field";
import { ColorPickerField } from "@/components/ui/color-picker-field";
import { AudioUploadField } from "@/components/ui/audio-upload-field";
import { cn } from "@/lib/utils/cn";
import {
  Heart,
  Calendar,
  Users,
  Camera,
  Gift,
  BookOpen,
  Palette,
  Sparkles,
  Music,
} from "lucide-react";
import {
  WEDDING_COLOR_PRESETS,
  BACKGROUND_COLOR_PRESETS,
  CARD_COLOR_PRESETS,
  TEXT_COLOR_PRESETS,
} from "@/templates/color-presets";

interface MahligaiWeddingBuilderFormProps {
  register: UseFormRegister<LetterFormValues>;
  setValue: UseFormSetValue<LetterFormValues>;
  watch: UseFormWatch<LetterFormValues>;
  errors: FieldErrors<LetterFormValues>;
  idPrefix?: string;
}

type TabType =
  | "hero"
  | "verse"
  | "couple"
  | "events"
  | "story"
  | "gallery"
  | "gift"
  | "closing_style";

export function MahligaiWeddingBuilderForm({
  register,
  setValue,
  watch,
  errors,
  idPrefix = "mahligai-wedding",
}: MahligaiWeddingBuilderFormProps) {
  const [activeTab, setActiveTab] = useState<TabType>("hero");

  // Watch Media & Colors
  const coverPhoto = watch("coverPhoto") as string | undefined;
  const bridePhoto = watch("bridePhoto") as string | undefined;
  const groomPhoto = watch("groomPhoto") as string | undefined;
  const photo1 = watch("photo1") as string | undefined;
  const photo2 = watch("photo2") as string | undefined;
  const photo3 = watch("photo3") as string | undefined;
  const photo4 = watch("photo4") as string | undefined;
  const qrisPhoto = watch("qrisPhoto") as string | undefined;
  const audioUrl = watch("audioUrl") as string | undefined;

  const primaryColor = (watch("primaryColor") as string) || "#c59a3f";
  const backgroundColor = (watch("backgroundColor") as string) || "#fdfbf7";
  const cardColor = (watch("cardColor") as string) || "#ffffff";
  const textColor = (watch("textColor") as string) || "#332a1f";

  const tabs: Array<{ id: TabType; label: string; icon: React.ReactNode }> = [
    { id: "hero", label: "Cover & Judul", icon: <Heart className="w-4 h-4" /> },
    { id: "verse", label: "Ayat & Salam", icon: <BookOpen className="w-4 h-4" /> },
    { id: "couple", label: "Kedua Mempelai", icon: <Users className="w-4 h-4" /> },
    { id: "events", label: "Akad & Resepsi", icon: <Calendar className="w-4 h-4" /> },
    { id: "story", label: "Kisah Kasih", icon: <Sparkles className="w-4 h-4" /> },
    { id: "gallery", label: "Galeri & Video", icon: <Camera className="w-4 h-4" /> },
    { id: "gift", label: "Amplop Digital", icon: <Gift className="w-4 h-4" /> },
    { id: "closing_style", label: "Penutup & Gaya", icon: <Palette className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin border-b border-stone-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all",
              activeTab === tab.id
                ? "bg-amber-600 text-white shadow-sm"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200",
            )}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: COVER & HERO */}
      {/* ========================================================================= */}
      {activeTab === "hero" && (
        <div className="space-y-4 animate-fade-in">
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 leading-relaxed">
            💡 <strong>Cover Pembuka:</strong> Tamu akan disambut dengan nama mereka secara
            personal lewat tautan <code>?to=NamaTamu</code> beserta tombol &quot;Buka
            Undangan&quot;.
          </div>

          <Field
            label="Nama Tamu Undangan Default"
            error={errors.recipientName?.message}
            helperText="Digunakan saat link dibuka tanpa parameter ?to=Nama."
          >
            <Input
              {...register("recipientName")}
              placeholder="Bapak / Ibu / Saudara/i"
            />
          </Field>

          <Field
            label="Judul Cover Undangan"
            error={errors.weddingTitle?.message}
          >
            <Input
              {...register("weddingTitle")}
              placeholder="The Wedding Celebration of"
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              label="Nama Panggilan Mempelai Pria"
              error={errors.groomNickname?.message}
            >
              <Input {...register("groomNickname")} placeholder="Rama" />
            </Field>

            <Field
              label="Nama Panggilan Mempelai Wanita"
              error={errors.brideNickname?.message}
            >
              <Input {...register("brideNickname")} placeholder="Shinta" />
            </Field>
          </div>

          <Field
            label="Teks Tanggal Pernikahan"
            error={errors.weddingDateText?.message}
          >
            <Input
              {...register("weddingDateText")}
              placeholder="Minggu, 24 Oktober 2026"
            />
          </Field>

          <ImageUploadField
            label="Foto Sampul Utama Prewedding"
            value={coverPhoto}
            onChange={(url) => setValue("coverPhoto", url)}
            helperText="Disarankan foto portrait berbusana cerah/pastel."
          />

          <Field
            label="Teks Tombol Buka Undangan"
            error={errors.openButtonText?.message}
          >
            <Input
              {...register("openButtonText")}
              placeholder="Buka Undangan"
            />
          </Field>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: AYAT & SALAM PEMBUKA */}
      {/* ========================================================================= */}
      {activeTab === "verse" && (
        <div className="space-y-4 animate-fade-in">
          <Field
            label="Teks Kaligrafi / Basmalah"
            error={errors.basmalahText?.message}
          >
            <Input
              {...register("basmalahText")}
              placeholder="بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ"
            />
          </Field>

          <Field
            label="Kutipan Ayat Pernikahan / Janji Suci"
            error={errors.verseQuote?.message}
          >
            <Textarea
              {...register("verseQuote")}
              rows={4}
              placeholder="Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu..."
            />
          </Field>

          <Field
            label="Sumber Ayat / Kutipan"
            error={errors.verseSource?.message}
          >
            <Input {...register("verseSource")} placeholder="QS. Ar-Rum: 21" />
          </Field>

          <Field
            label="Salam & Kata Pengantar Undangan"
            error={errors.greetingText?.message}
          >
            <Textarea
              {...register("greetingText")}
              rows={4}
              placeholder="Assalamu'alaikum Warahmatullahi Wabarakatuh..."
            />
          </Field>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: KEDUA MEMPELAI */}
      {/* ========================================================================= */}
      {activeTab === "couple" && (
        <div className="space-y-6 animate-fade-in">
          {/* Mempelai Pria */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
            <h4 className="font-semibold text-sm text-stone-800 flex items-center gap-2">
              <span>🤵</span>
              <span>Profil Mempelai Pria</span>
            </h4>

            <Field
              label="Nama Lengkap Beserta Gelar (Pria)"
              error={errors.groomFullName?.message}
            >
              <Input
                {...register("groomFullName")}
                placeholder="Rama Adiputra Pratama, M.Kom."
              />
            </Field>

            <Field
              label="Silsilah Orang Tua (Pria)"
              error={errors.groomParents?.message}
            >
              <Input
                {...register("groomParents")}
                placeholder="Putra bungsu dari Bpk. Drs. H. Bambang Suryono & Ibu Hj. Sri Rahayu"
              />
            </Field>

            <Field
              label="Akun Instagram (Pria)"
              error={errors.groomInstagram?.message}
            >
              <Input {...register("groomInstagram")} placeholder="@ramapratama" />
            </Field>

            <ImageUploadField
              label="Foto Potret Mempelai Pria"
              value={groomPhoto}
              onChange={(url) => setValue("groomPhoto", url)}
            />
          </div>

          {/* Mempelai Wanita */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
            <h4 className="font-semibold text-sm text-stone-800 flex items-center gap-2">
              <span>👰</span>
              <span>Profil Mempelai Wanita</span>
            </h4>

            <Field
              label="Nama Lengkap Beserta Gelar (Wanita)"
              error={errors.brideFullName?.message}
            >
              <Input
                {...register("brideFullName")}
                placeholder="Shinta Kirana Maharani, S.Ds."
              />
            </Field>

            <Field
              label="Silsilah Orang Tua (Wanita)"
              error={errors.brideParents?.message}
            >
              <Input
                {...register("brideParents")}
                placeholder="Putri pertama dari Bpk. Ir. Hendra Gunawan & Ibu Hj. Ratna Dewi"
              />
            </Field>

            <Field
              label="Akun Instagram (Wanita)"
              error={errors.brideInstagram?.message}
            >
              <Input
                {...register("brideInstagram")}
                placeholder="@shintakirana"
              />
            </Field>

            <ImageUploadField
              label="Foto Potret Mempelai Wanita"
              value={bridePhoto}
              onChange={(url) => setValue("bridePhoto", url)}
            />
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: AKAD & RESEPSI */}
      {/* ========================================================================= */}
      {activeTab === "events" && (
        <div className="space-y-6 animate-fade-in">
          {/* Akad Nikah */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
            <h4 className="font-semibold text-sm text-stone-800 flex items-center gap-2">
              <span>🕌</span>
              <span>Sesi 1: Akad Nikah / Pemberkatan</span>
            </h4>

            <Field label="Judul Sesi 1" error={errors.akadTitle?.message}>
              <Input {...register("akadTitle")} placeholder="Akad Nikah" />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Hari & Tanggal" error={errors.akadDayDate?.message}>
                <Input
                  {...register("akadDayDate")}
                  placeholder="Minggu, 24 Oktober 2026"
                />
              </Field>

              <Field label="Waktu Pelaksanaan" error={errors.akadTime?.message}>
                <Input
                  {...register("akadTime")}
                  placeholder="Pukul 08.00 - 10.00 WIB"
                />
              </Field>
            </div>

            <Field label="Nama Tempat / Masjid" error={errors.akadVenue?.message}>
              <Input
                {...register("akadVenue")}
                placeholder="Masjid Agung Al-Barkah"
              />
            </Field>

            <Field label="Alamat Lengkap" error={errors.akadAddress?.message}>
              <Textarea
                {...register("akadAddress")}
                rows={2}
                placeholder="Jl. Veteran No. 12, Kebayoran Baru, Jakarta Selatan"
              />
            </Field>

            <Field
              label="Tautan Google Maps Lokasi Akad"
              error={errors.akadMapsUrl?.message}
            >
              <Input
                {...register("akadMapsUrl")}
                placeholder="https://maps.google.com/?q=..."
              />
            </Field>
          </div>

          {/* Resepsi */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
            <h4 className="font-semibold text-sm text-stone-800 flex items-center gap-2">
              <span>🎉</span>
              <span>Sesi 2: Resepsi Pernikahan</span>
            </h4>

            <Field label="Judul Sesi 2" error={errors.resepsiTitle?.message}>
              <Input
                {...register("resepsiTitle")}
                placeholder="Resepsi Pernikahan"
              />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="Hari & Tanggal"
                error={errors.resepsiDayDate?.message}
              >
                <Input
                  {...register("resepsiDayDate")}
                  placeholder="Minggu, 24 Oktober 2026"
                />
              </Field>

              <Field
                label="Waktu Pelaksanaan"
                error={errors.resepsiTime?.message}
              >
                <Input
                  {...register("resepsiTime")}
                  placeholder="Pukul 11.00 - 14.00 WIB"
                />
              </Field>
            </div>

            <Field
              label="Nama Tempat / Ballroom"
              error={errors.resepsiVenue?.message}
            >
              <Input
                {...register("resepsiVenue")}
                placeholder="Grand Ballroom Balai Kartini"
              />
            </Field>

            <Field label="Alamat Lengkap" error={errors.resepsiAddress?.message}>
              <Textarea
                {...register("resepsiAddress")}
                rows={2}
                placeholder="Jl. Gatot Subroto No. 37, Kuningan Barat, Jakarta Selatan"
              />
            </Field>

            <Field
              label="Tautan Google Maps Lokasi Resepsi"
              error={errors.resepsiMapsUrl?.message}
            >
              <Input
                {...register("resepsiMapsUrl")}
                placeholder="https://maps.google.com/?q=..."
              />
            </Field>
          </div>

          <Field
            label="Tanggal Kalender (Format YYYY-MM-DD)"
            error={errors.calendarEventDate?.message}
            helperText="Dipakai untuk sinkronisasi tombol Tambah ke Google Calendar."
          >
            <Input {...register("calendarEventDate")} placeholder="2026-10-24" />
          </Field>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: KISAH KASIH & COUNTDOWN */}
      {/* ========================================================================= */}
      {activeTab === "story" && (
        <div className="space-y-6 animate-fade-in">
          {/* Countdown Setup */}
          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-4">
            <h4 className="font-semibold text-sm text-stone-800 flex items-center gap-2">
              <span>⏳</span>
              <span>Pengaturan Live Countdown</span>
            </h4>

            <Field
              label="Waktu Target Acara (Format ISO)"
              error={errors.targetDate?.message}
              helperText="Format: YYYY-MM-DDTHH:mm:ss (contoh: 2026-10-24T08:00:00)"
            >
              <Input
                {...register("targetDate")}
                placeholder="2026-10-24T08:00:00"
              />
            </Field>

            <Field
              label="Judul Countdown"
              error={errors.countdownTitle?.message}
            >
              <Input
                {...register("countdownTitle")}
                placeholder="Menghitung Hari Bahagia"
              />
            </Field>

            <Field
              label="Kutipan / Deskripsi Countdown"
              error={errors.countdownSubtitle?.message}
            >
              <Input
                {...register("countdownSubtitle")}
                placeholder="Tiada yang lebih indah selain menanti waktu..."
              />
            </Field>
          </div>

          {/* 4 Babak Kisah Kasih */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm text-stone-800 flex items-center gap-2">
              <span>📜</span>
              <span>4 Babak Perjalanan Cinta</span>
            </h4>

            {/* Babak 1 */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1">
                  <Field label="Tahun">
                    <Input {...register("story1Year")} placeholder="2019" />
                  </Field>
                </div>
                <div className="col-span-2">
                  <Field label="Judul Fase 1">
                    <Input
                      {...register("story1Title")}
                      placeholder="Pertemuan Pertama"
                    />
                  </Field>
                </div>
              </div>
              <Field label="Deskripsi Fase 1">
                <Textarea
                  {...register("story1Desc")}
                  rows={2}
                  placeholder="Berawal dari perkenalan sederhana di bangku perkuliahan..."
                />
              </Field>
            </div>

            {/* Babak 2 */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1">
                  <Field label="Tahun">
                    <Input {...register("story2Year")} placeholder="2021" />
                  </Field>
                </div>
                <div className="col-span-2">
                  <Field label="Judul Fase 2">
                    <Input
                      {...register("story2Title")}
                      placeholder="Merajut Janji Bersama"
                    />
                  </Field>
                </div>
              </div>
              <Field label="Deskripsi Fase 2">
                <Textarea
                  {...register("story2Desc")}
                  rows={2}
                  placeholder="Kami memutuskan untuk saling mendampingi di setiap suka dan duka..."
                />
              </Field>
            </div>

            {/* Babak 3 */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1">
                  <Field label="Tahun">
                    <Input {...register("story3Year")} placeholder="2024" />
                  </Field>
                </div>
                <div className="col-span-2">
                  <Field label="Judul Fase 3">
                    <Input
                      {...register("story3Title")}
                      placeholder="Ikrar Khitbah"
                    />
                  </Field>
                </div>
              </div>
              <Field label="Deskripsi Fase 3">
                <Textarea
                  {...register("story3Desc")}
                  rows={2}
                  placeholder="Dengan restu tulus kedua orang tua dan keluarga besar..."
                />
              </Field>
            </div>

            {/* Babak 4 */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-1">
                  <Field label="Tahun">
                    <Input {...register("story4Year")} placeholder="2026" />
                  </Field>
                </div>
                <div className="col-span-2">
                  <Field label="Judul Fase 4">
                    <Input
                      {...register("story4Title")}
                      placeholder="Mahligai Rumah Tangga"
                    />
                  </Field>
                </div>
              </div>
              <Field label="Deskripsi Fase 4">
                <Textarea
                  {...register("story4Desc")}
                  rows={2}
                  placeholder="Insya Allah, ikrar suci akan kami ikrarkan di hadapan Sang Maha Pencipta..."
                />
              </Field>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: GALERI & VIDEO */}
      {/* ========================================================================= */}
      {activeTab === "gallery" && (
        <div className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Judul Galeri" error={errors.galleryTitle?.message}>
              <Input
                {...register("galleryTitle")}
                placeholder="Potret Bahagia Kami"
              />
            </Field>

            <Field
              label="Subjudul Galeri"
              error={errors.gallerySubtitle?.message}
            >
              <Input
                {...register("gallerySubtitle")}
                placeholder="Kumpulan momen hangat..."
              />
            </Field>
          </div>

          {/* 4 Foto Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <ImageUploadField
                label="Foto Galeri 1"
                value={photo1}
                onChange={(url) => setValue("photo1", url)}
              />
              <Field label="Keterangan Foto 1">
                <Input
                  {...register("photo1Caption")}
                  placeholder="Janji dalam Pandangan"
                />
              </Field>
            </div>

            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <ImageUploadField
                label="Foto Galeri 2 (Cincin / Detail)"
                value={photo2}
                onChange={(url) => setValue("photo2", url)}
              />
              <Field label="Keterangan Foto 2">
                <Input
                  {...register("photo2Caption")}
                  placeholder="Simbol Ikatan Abadi"
                />
              </Field>
            </div>

            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <ImageUploadField
                label="Foto Galeri 3"
                value={photo3}
                onChange={(url) => setValue("photo3", url)}
              />
              <Field label="Keterangan Foto 3">
                <Input
                  {...register("photo3Caption")}
                  placeholder="Langkah Seirama"
                />
              </Field>
            </div>

            <div className="p-3 rounded-2xl bg-stone-50 border border-stone-200 space-y-2">
              <ImageUploadField
                label="Foto Galeri 4"
                value={photo4}
                onChange={(url) => setValue("photo4", url)}
              />
              <Field label="Keterangan Foto 4">
                <Input
                  {...register("photo4Caption")}
                  placeholder="Menatap Hari Esok Bersama"
                />
              </Field>
            </div>
          </div>

          <Field
            label="Tautan Video Teaser YouTube (Opsional)"
            error={errors.videoUrl?.message}
            helperText="Masukkan URL video YouTube yang dapat diputar langsung di undangan."
          >
            <Input
              {...register("videoUrl")}
              placeholder="https://www.youtube.com/watch?v=..."
            />
          </Field>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 7: AMPLOP DIGITAL */}
      {/* ========================================================================= */}
      {activeTab === "gift" && (
        <div className="space-y-6 animate-fade-in">
          <Field
            label="Kutipan Pengantar Tanda Kasih"
            error={errors.giftSubtitle?.message}
          >
            <Textarea
              {...register("giftSubtitle")}
              rows={3}
              placeholder="Doa restu Anda adalah karunia yang paling berharga bagi kami..."
            />
          </Field>

          {/* Rekening 1 */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
            <h4 className="font-semibold text-sm text-stone-800 flex items-center gap-2">
              <span>💳</span>
              <span>Rekening Bank 1</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Nama Bank 1">
                <Input
                  {...register("bank1Name")}
                  placeholder="Bank Central Asia (BCA)"
                />
              </Field>

              <Field label="Nomor Rekening 1">
                <Input {...register("bank1Number")} placeholder="5420987654" />
              </Field>
            </div>

            <Field label="Nama Pemilik Rekening 1">
              <Input
                {...register("bank1AccountName")}
                placeholder="Shinta Kirana Maharani"
              />
            </Field>
          </div>

          {/* Rekening 2 */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
            <h4 className="font-semibold text-sm text-stone-800 flex items-center gap-2">
              <span>💳</span>
              <span>Rekening Bank 2</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Nama Bank 2">
                <Input
                  {...register("bank2Name")}
                  placeholder="Bank Mandiri / BSI"
                />
              </Field>

              <Field label="Nomor Rekening 2">
                <Input
                  {...register("bank2Number")}
                  placeholder="1270009876543"
                />
              </Field>
            </div>

            <Field label="Nama Pemilik Rekening 2">
              <Input
                {...register("bank2AccountName")}
                placeholder="Rama Adiputra Pratama"
              />
            </Field>
          </div>

          {/* QRIS & Alamat */}
          <ImageUploadField
            label="Foto Barcode QRIS (Opsional)"
            value={qrisPhoto}
            onChange={(url) => setValue("qrisPhoto", url)}
            helperText="Upload gambar barcode QRIS untuk mempermudah transfer lewat e-wallet."
          />

          <Field
            label="Alamat Pengiriman Kado Fisik (Opsional)"
            error={errors.giftAddress?.message}
          >
            <Textarea
              {...register("giftAddress")}
              rows={3}
              placeholder="Perumahan Griya Indah Asri Blok C-12, Jl. Kenanga No. 5..."
            />
          </Field>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 8: PENUTUP & TAMPILAN GAYA */}
      {/* ========================================================================= */}
      {activeTab === "closing_style" && (
        <div className="space-y-6 animate-fade-in">
          {/* Ucapan Penutup */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
            <h4 className="font-semibold text-sm text-stone-800 flex items-center gap-2">
              <span>🕊️</span>
              <span>Pesan Penutup &amp; Terima Kasih</span>
            </h4>

            <Field
              label="Pesan Doa & Terima Kasih"
              error={errors.closingMessage?.message}
            >
              <Textarea
                {...register("closingMessage")}
                rows={3}
                placeholder="Atas kehadiran, perhatian, serta doa restu yang tulus..."
              />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Keluarga Besar Pria">
                <Input
                  {...register("closingFamilyGroom")}
                  placeholder="Keluarga Besar Bpk. Drs. H. Bambang Suryono & Ibu Hj. Sri Rahayu"
                />
              </Field>

              <Field label="Keluarga Besar Wanita">
                <Input
                  {...register("closingFamilyBride")}
                  placeholder="Keluarga Besar Bpk. Ir. Hendra Gunawan & Ibu Hj. Ratna Dewi"
                />
              </Field>
            </div>

            <Field label="Tanda Tangan Kedua Mempelai">
              <Input
                {...register("closingSignature")}
                placeholder="Rama & Shinta"
              />
            </Field>

            <AudioUploadField
              label="Lagu Musik Latar Romantis (MP3)"
              value={audioUrl}
              onChange={(url) => setValue("audioUrl", url)}
            />
          </div>

          {/* Palet Warna Cerah */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
            <h4 className="font-semibold text-sm text-stone-800 flex items-center gap-2">
              <span>🎨</span>
              <span>Kustomisasi Palet Warna Cerah</span>
            </h4>

            <ColorPickerField
              label="Warna Aksen Utama (Gold / Rose / Sage)"
              value={primaryColor}
              onChange={(val) => setValue("primaryColor", val)}
              presets={WEDDING_COLOR_PRESETS}
            />

            <ColorPickerField
              label="Warna Latar Belakang (Cerah Hangat)"
              value={backgroundColor}
              onChange={(val) => setValue("backgroundColor", val)}
              presets={BACKGROUND_COLOR_PRESETS}
            />

            <ColorPickerField
              label="Warna Kartu Kontainer"
              value={cardColor}
              onChange={(val) => setValue("cardColor", val)}
              presets={CARD_COLOR_PRESETS}
            />

            <ColorPickerField
              label="Warna Teks Utama"
              value={textColor}
              onChange={(val) => setValue("textColor", val)}
              presets={TEXT_COLOR_PRESETS}
            />
          </div>
        </div>
      )}
    </div>
  );
}
