"use client";

import { useState } from "react";
import type {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import {
  Users,
  Handshake,
  Image as ImageIcon,
  Compass,
  Mail,
  Palette,
  Check,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  HeartHandshake,
} from "lucide-react";
import { Field, Input, Textarea } from "@/components/ui/field";
import { ImageUploadField } from "@/components/ui/image-upload-field";
import { ColorPickerField } from "@/components/ui/color-picker-field";
import {
  FRIENDSHIP_COLOR_PRESETS,
  BACKGROUND_COLOR_PRESETS,
  CARD_COLOR_PRESETS,
  TEXT_COLOR_PRESETS,
} from "@/templates/color-presets";
import { cn } from "@/lib/utils/cn";
import type { LetterFormValues } from "./dynamic-form";

interface FriendshipBuilderFormProps {
  register: UseFormRegister<LetterFormValues>;
  setValue: UseFormSetValue<LetterFormValues>;
  watch: UseFormWatch<LetterFormValues>;
  errors: FieldErrors<LetterFormValues>;
  idPrefix?: string;
}

const PRESET_PHOTOS = [
  {
    name: "Sahabat Tertawa Bahagia",
    url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1000&q=80",
    thumb: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Nongkrong Santai Warung Kopi",
    url: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Road Trip Bareng Kawan",
    url: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Wisuda Bareng Sahabat",
    url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Diskusi & Curhat Santai",
    url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Pesta Kembang Api Malam",
    url: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Reuni Formasi Lengkap",
    url: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=200&q=60",
  },
  {
    name: "Petualangan Alam Bebas",
    url: "https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?auto=format&fit=crop&w=800&q=80",
    thumb: "https://images.unsplash.com/photo-1506869640319-fe1a24fd76dc?auto=format&fit=crop&w=200&q=60",
  },
];

const TABS = [
  { id: "hero", label: "Sahabat & Sampul", icon: Users },
  { id: "fistbump", label: "Tos Sahabat & Janji", icon: Handshake },
  { id: "gallery", label: "Galeri Kenangan", icon: ImageIcon },
  { id: "story", label: "Statistik & Kualitas", icon: Compass },
  { id: "letter", label: "Surat Persahabatan", icon: Mail },
  { id: "theme", label: "Warna & Musik", icon: Palette },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function FriendshipBuilderForm({
  register,
  setValue,
  watch,
  errors,
  idPrefix = "fld",
}: FriendshipBuilderFormProps) {
  const [activeTab, setActiveTab] = useState<TabId>("hero");

  const primaryColor = (watch("primaryColor") as string) || "#2f6f5e";
  const backgroundColor = (watch("backgroundColor") as string) || "#f7f9f6";
  const cardColor = (watch("cardColor") as string) || "#ffffff";
  const textColor = (watch("textColor") as string) || "#1a2e26";
  const bodyTextColor = (watch("bodyTextColor") as string) || "#334155";

  const heroImage = (watch("heroImage") as string) || "";
  const recipientName = (watch("recipientName") as string) || "";

  const goToTab = (id: TabId) => {
    setActiveTab(id);
    const formTop = document.getElementById(`${idPrefix}-tabs-header`);
    if (formTop) {
      formTop.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const currentTabIndex = TABS.findIndex((t) => t.id === activeTab);
  const prevTab = currentTabIndex > 0 ? TABS[currentTabIndex - 1] : null;
  const nextTab = currentTabIndex < TABS.length - 1 ? TABS[currentTabIndex + 1] : null;

  return (
    <div className="space-y-6">
      {/* Header Info Banner */}
      <div
        className="rounded-2xl border p-4 sm:p-5 transition-all shadow-sm"
        style={{
          backgroundColor: `${primaryColor}10`,
          borderColor: `${primaryColor}30`,
        }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 shadow"
              style={{ backgroundColor: primaryColor }}
            >
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold" style={{ color: textColor }}>
                Friendship Tribute Website Builder
              </h3>
              <p className="text-xs" style={{ color: bodyTextColor }}>
                {recipientName
                  ? `Membangun website penghargaan untuk sahabat: ${recipientName}`
                  : "Kreasikan website persahabatan interaktif untuk sahabat terbaikmu"}
              </p>
            </div>
          </div>
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border"
            style={{
              backgroundColor: cardColor,
              color: primaryColor,
              borderColor: `${primaryColor}40`,
            }}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Edisi Persahabatan Premium
          </span>
        </div>
      </div>

      {/* Categorized Tab Bar */}
      <div id={`${idPrefix}-tabs-header`} className="w-full max-w-full overflow-hidden border-b border-border/70 pb-2">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar w-full">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => goToTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all whitespace-nowrap shrink-0",
                  isActive
                    ? "bg-stone-900 text-white shadow-sm dark:bg-stone-100 dark:text-stone-900"
                    : "text-muted-foreground hover:text-foreground hover:bg-stone-100 dark:hover:bg-stone-800"
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Sahabat & Sampul */}
      {activeTab === "hero" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="border-b border-border/50 pb-3">
            <h4 className="text-sm font-semibold text-foreground">
              1. Profil Sahabat & Sampul Utama
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              Identitas sahabat terbaik dan tajuk utama di bagian atas website.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              id={`${idPrefix}-recipientName`}
              label="Nama Sahabat"
              required
              error={errors.recipientName?.message}
              helperText="Nama sahabat yang dituju."
            >
              <Input
                {...register("recipientName", { required: "Nama sahabat wajib diisi" })}
                placeholder="Bagas Adiputra"
                autoComplete="off"
              />
            </Field>

            <Field
              id={`${idPrefix}-nickname`}
              label="Panggilan Akrab / Nickname"
              error={errors.nickname?.message}
              helperText="Panggilan santai atau julukan berdua."
            >
              <Input
                {...register("nickname")}
                placeholder="Bro Bagas / Sobat Kental"
                autoComplete="off"
              />
            </Field>

            <Field
              id={`${idPrefix}-friendsSince`}
              label="Berteman Sejak"
              error={errors.friendsSince?.message}
              helperText="Tahun atau momen awal kalian mulai bersahabat."
            >
              <Input
                {...register("friendsSince")}
                placeholder="2016 • Bangku SMA"
                autoComplete="off"
              />
            </Field>

            <Field
              id={`${idPrefix}-heroBadge`}
              label="Lencana Persahabatan (Badge)"
              error={errors.heroBadge?.message}
              helperText="Teks lencana kecil di atas judul utama."
            >
              <Input
                {...register("heroBadge")}
                placeholder="Partner in Crime Since Day One"
                autoComplete="off"
              />
            </Field>
          </div>

          <div className="space-y-4">
            <Field
              id={`${idPrefix}-title`}
              label="Judul Utama Persembahan"
              error={errors.title?.message}
              helperText="Judul besar pembuka di halaman depan."
            >
              <Input
                {...register("title")}
                placeholder="Untuk Sahabat Terbaik Seumur Hidup"
                autoComplete="off"
              />
            </Field>

            <Field
              id={`${idPrefix}-tagline`}
              label="Kalimat Pembuka / Tagline"
              error={errors.tagline?.message}
              helperText="Pesan ringkas pendukung di bawah judul."
            >
              <Textarea
                {...register("tagline")}
                placeholder="Dari sekadar teman sebangku, sampai jadi orang yang paling tahu isi kepalaku."
                rows={2}
              />
            </Field>
          </div>

          <div className="space-y-3 pt-2">
            <ImageUploadField
              label="Foto Utama Bersama / Potret Sahabat"
              helperText="Unggah foto terbaikmu bersama sahabat (format JPG, PNG, atau WebP)."
              value={heroImage}
              onChange={(url) => setValue("heroImage", url, { shouldDirty: true })}
            />

            {/* Quick Photo Presets */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-medium text-muted-foreground block">
                Atau pilih contoh foto persahabatan:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PRESET_PHOTOS.slice(0, 4).map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setValue("heroImage", p.url, { shouldDirty: true })}
                    className={cn(
                      "relative group rounded-xl overflow-hidden border text-left p-1 transition-all",
                      heroImage === p.url
                        ? "border-emerald-600 ring-2 ring-emerald-500/20"
                        : "border-border hover:border-muted-foreground/50"
                    )}
                  >
                    <img
                      src={p.thumb}
                      alt={p.name}
                      className="w-full h-16 object-cover rounded-lg"
                    />
                    <span className="block text-[10px] font-medium text-muted-foreground mt-1 truncate px-0.5">
                      {p.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Tos Sahabat & Janji */}
      {activeTab === "fistbump" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="border-b border-border/50 pb-3">
            <h4 className="text-sm font-semibold text-foreground">
              2. Interaksi Tos Sahabat (Fist Bump) & Janji Rahasia
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              Fitur interaktif kepalan tangan dengan efek bunyi akord gitar akustik dan pesan janji persahabatan rahasia.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              id={`${idPrefix}-fistBumpTitle`}
              label="Judul Tombol Fist Bump"
              error={errors.fistBumpTitle?.message}
              helperText="Teks judul interaksi tos."
            >
              <Input
                {...register("fistBumpTitle")}
                placeholder="Tos Sahabat / Fist Bump"
                autoComplete="off"
              />
            </Field>

            <Field
              id={`${idPrefix}-fistBumpPrompt`}
              label="Petunjuk Interaksi"
              error={errors.fistBumpPrompt?.message}
              helperText="Ajakan untuk mengetuk tombol kepalan tangan."
            >
              <Input
                {...register("fistBumpPrompt")}
                placeholder="Ketuk kepalan tangan untuk tos & dengarkan bunyi pertemanan!"
                autoComplete="off"
              />
            </Field>
          </div>

          <Field
            id={`${idPrefix}-secretPledgeMessage`}
            label="Janji Sahabat Rahasia (Muncul Setelah Tos)"
            error={errors.secretPledgeMessage?.message}
            helperText="Pesan rahasia atau ikrar persahabatan yang muncul secara magis dengan taburan bintang saat sahabat melakukan tos."
          >
            <Textarea
              {...register("secretPledgeMessage")}
              placeholder="🤝 IKRAR PERSAHABATAN: Apapun yang terjadi di masa depan, entah jarak memisahkan atau kesibukan menenggelamkan, kalau salah satu butuh bantuan jam 2 pagi, pintu rumah selalu terbuka lebar tanpa banyak tanya!"
              rows={4}
            />
          </Field>

          <div className="rounded-xl border border-dashed border-emerald-500/40 bg-emerald-500/5 p-4 text-xs text-emerald-800 dark:text-emerald-300">
            <p className="font-semibold mb-1">✨ Interaktivitas Unik:</p>
            <p>
              Ketika pengunjung mengetuk tombol tos, animasi fist bump akan bergerak dinamis memicu harmoni nada akustik hangat dan memunculkan kotak janji persahabatan rahasia ini.
            </p>
          </div>
        </div>
      )}

      {/* Tab 3: Galeri Kenangan */}
      {activeTab === "gallery" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="border-b border-border/50 pb-3">
            <h4 className="text-sm font-semibold text-foreground">
              3. Galeri Foto Polaroid & Kenangan Bersama
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              Hingga 6 foto kenangan bergaya frame polaroid lengkap dengan teks cerita singkat dan tanggal momen.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              id={`${idPrefix}-galleryTitle`}
              label="Judul Galeri Foto"
              error={errors.galleryTitle?.message}
            >
              <Input
                {...register("galleryTitle")}
                placeholder="Koleksi Momen Terbaik Kita"
                autoComplete="off"
              />
            </Field>

            <Field
              id={`${idPrefix}-gallerySubtitle`}
              label="Sub-judul Galeri"
              error={errors.gallerySubtitle?.message}
            >
              <Input
                {...register("gallerySubtitle")}
                placeholder="Setiap tawa dan kekonyolan yang terekam dalam perjalanan panjang ini."
                autoComplete="off"
              />
            </Field>
          </div>

          {/* 6 Photo slots */}
          <div className="space-y-6 pt-2">
            {[1, 2, 3, 4, 5, 6].map((num) => {
              const imgKey = `galleryImg${num}` as keyof LetterFormValues;
              const captionKey = `galleryCaption${num}` as keyof LetterFormValues;
              const dateKey = `galleryDate${num}` as keyof LetterFormValues;
              const curImg = (watch(imgKey) as string) || "";

              return (
                <div
                  key={num}
                  className="rounded-2xl border border-border/80 bg-stone-50/50 dark:bg-stone-900/40 p-4 sm:p-5 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Foto Kenangan #{num}
                    </span>
                    {curImg && (
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                        <Check className="w-3 h-3" /> Foto Terpasang
                      </span>
                    )}
                  </div>

                  <ImageUploadField
                    label={`Pilih / Unggah Foto #${num}`}
                    value={curImg}
                    onChange={(url) => setValue(imgKey, url, { shouldDirty: true })}
                  />

                  {/* Preset quick picker for this slot */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                    <span className="text-[11px] text-muted-foreground whitespace-nowrap">
                      Pilihan Cepat:
                    </span>
                    {PRESET_PHOTOS.map((p, pIdx) => (
                      <button
                        key={pIdx}
                        type="button"
                        onClick={() => setValue(imgKey, p.url, { shouldDirty: true })}
                        className={cn(
                          "px-2.5 py-1 rounded-lg text-[11px] border shrink-0 transition-all",
                          curImg === p.url
                            ? "bg-emerald-600 text-white border-emerald-600"
                            : "bg-background hover:bg-muted border-border text-foreground"
                        )}
                      >
                        {p.name.split(" ")[0]} {p.name.split(" ")[1] || ""}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <Field
                      id={`${idPrefix}-galleryCaption${num}`}
                      label="Keterangan / Momen Foto"
                    >
                      <Input
                        {...register(captionKey as keyof LetterFormValues)}
                        placeholder={`Keterangan momen foto #${num}`}
                        autoComplete="off"
                      />
                    </Field>

                    <Field
                      id={`${idPrefix}-galleryDate${num}`}
                      label="Bulan / Tahun Foto"
                    >
                      <Input
                        {...register(dateKey as keyof LetterFormValues)}
                        placeholder="Contoh: Juli 2022"
                        autoComplete="off"
                      />
                    </Field>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 4: Statistik & Kualitas Sahabat */}
      {activeTab === "story" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="border-b border-border/50 pb-3">
            <h4 className="text-sm font-semibold text-foreground">
              4. Statistik, Linimasa, & 4 Sifat Terbaik Sahabat
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              Rangkuman angka kebersamaan, 3 tonggak petualangan, serta 4 kualitas yang paling kamu hargai darinya.
            </p>
          </div>

          {/* Section A: Statistik Ringkas */}
          <div className="space-y-3">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Statistik Persahabatan
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Field
                id={`${idPrefix}-totalYears`}
                label="Lama Bersahabat"
                error={errors.totalYears?.message}
              >
                <Input
                  {...register("totalYears")}
                  placeholder="8+ Tahun"
                  autoComplete="off"
                />
              </Field>

              <Field
                id={`${idPrefix}-deepTalks`}
                label="Jam Ngobrol / Deep Talk"
                error={errors.deepTalks?.message}
              >
                <Input
                  {...register("deepTalks")}
                  placeholder="1,200+ Jam"
                  autoComplete="off"
                />
              </Field>

              <Field
                id={`${idPrefix}-zeroSecrets`}
                label="Tingkat Rahasia Bocor"
                error={errors.zeroSecrets?.message}
              >
                <Input
                  {...register("zeroSecrets")}
                  placeholder="0 Rahasia Bocor"
                  autoComplete="off"
                />
              </Field>
            </div>
          </div>

          {/* Section B: Linimasa 3 Tonggak */}
          <div className="space-y-4 pt-3 border-t border-border/50">
            <Field
              id={`${idPrefix}-milestoneTitle`}
              label="Judul Bagian Linimasa"
              error={errors.milestoneTitle?.message}
            >
              <Input
                {...register("milestoneTitle")}
                placeholder="Kilas Balik Perjalanan Persahabatan Kita"
                autoComplete="off"
              />
            </Field>

            <div className="space-y-4">
              {[1, 2, 3].map((m) => {
                const yrKey = `milestone${m}Year` as keyof LetterFormValues;
                const titleKey = `milestone${m}Title` as keyof LetterFormValues;
                const descKey = `milestone${m}Desc` as keyof LetterFormValues;

                return (
                  <div
                    key={m}
                    className="p-4 rounded-xl border border-border/70 bg-stone-50/50 dark:bg-stone-900/30 space-y-3"
                  >
                    <span className="text-xs font-semibold text-muted-foreground">
                      Tonggak Petualangan #{m}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <Field id={`${idPrefix}-m${m}-yr`} label="Tahun">
                        <Input
                          {...register(yrKey as keyof LetterFormValues)}
                          placeholder={m === 1 ? "2016" : m === 2 ? "2019" : "2024"}
                          autoComplete="off"
                        />
                      </Field>
                      <div className="sm:col-span-2">
                        <Field id={`${idPrefix}-m${m}-title`} label="Judul Momen">
                          <Input
                            {...register(titleKey as keyof LetterFormValues)}
                            placeholder={
                              m === 1
                                ? "Pertemuan Pertama"
                                : m === 2
                                ? "Touring Motor Dadakan"
                                : "Menapaki Karier Bersama"
                            }
                            autoComplete="off"
                          />
                        </Field>
                      </div>
                    </div>
                    <Field id={`${idPrefix}-m${m}-desc`} label="Cerita Singkat">
                      <Textarea
                        {...register(descKey as keyof LetterFormValues)}
                        placeholder={`Deskripsi momen #${m}...`}
                        rows={2}
                      />
                    </Field>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section C: 4 Sifat Terbaik Sahabat */}
          <div className="space-y-4 pt-3 border-t border-border/50">
            <Field
              id={`${idPrefix}-wishesTitle`}
              label="Judul Bagian Apresiasi Sifat"
              error={errors.wishesTitle?.message}
            >
              <Input
                {...register("wishesTitle")}
                placeholder="Empat Hal yang Paling Aku Hargai Darimu"
                autoComplete="off"
              />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((q) => {
                const titleKey = `quality${q}Title` as keyof LetterFormValues;
                const descKey = `quality${q}Desc` as keyof LetterFormValues;

                return (
                  <div
                    key={q}
                    className="p-4 rounded-xl border border-border/70 bg-stone-50/50 dark:bg-stone-900/30 space-y-3"
                  >
                    <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                      Sifat Terbaik #{q}
                    </span>
                    <Field id={`${idPrefix}-q${q}-title`} label="Nama Karakter / Sifat">
                      <Input
                        {...register(titleKey as keyof LetterFormValues)}
                        placeholder={
                          q === 1
                            ? "Pendengar Tanpa Menghakimi"
                            : q === 2
                            ? "Paling Loyal & Dapat Diandalkan"
                            : q === 3
                            ? "Sense of Humor Luar Biasa"
                            : "Suporter Paling Garis Keras"
                        }
                        autoComplete="off"
                      />
                    </Field>
                    <Field id={`${idPrefix}-q${q}-desc`} label="Ulasan & Alasan">
                      <Textarea
                        {...register(descKey as keyof LetterFormValues)}
                        placeholder={`Alasan kenapa sifat ini begitu berharga bagimu...`}
                        rows={2}
                      />
                    </Field>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Surat Persahabatan */}
      {activeTab === "letter" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="border-b border-border/50 pb-3">
            <h4 className="text-sm font-semibold text-foreground">
              5. Surat Kebersamaan dari Hati
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              Surat tulus, kutipan persahabatan, tanda tangan, dan tanggal surat.
            </p>
          </div>

          <Field
            id={`${idPrefix}-quote`}
            label="Kutipan Persahabatan (Quote)"
            error={errors.quote?.message}
            helperText="Kutipan indah atau semboyan berdua yang ditampilkan di atas surat."
          >
            <Input
              {...register("quote")}
              placeholder="Sahabat sejati bukan mereka yang tak pernah terpisah, melainkan mereka yang saat berjumpa kembali terasa tak ada satu detik pun yang berubah."
              autoComplete="off"
            />
          </Field>

          <Field
            id={`${idPrefix}-message`}
            label="Isi Surat Persahabatan"
            required
            error={errors.message?.message}
            helperText="Tuliskan semua curahan hati, terima kasih, canda tawa, dan doa untuk perjalanan masa depan bersama."
          >
            <Textarea
              {...register("message", { required: "Isi surat wajib diisi" })}
              placeholder="Bro Bagas,&#10;&#10;Kita jarang sekali ngomong yang sentimental..."
              rows={9}
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field
              id={`${idPrefix}-senderName`}
              label="Nama Pengirim"
              required
              error={errors.senderName?.message}
            >
              <Input
                {...register("senderName", { required: "Nama pengirim wajib diisi" })}
                placeholder="Yudha Pratama"
                autoComplete="off"
              />
            </Field>

            <Field
              id={`${idPrefix}-signature`}
              label="Penutup Tanda Tangan"
              error={errors.signature?.message}
            >
              <Input
                {...register("signature")}
                placeholder="Sahabatmu Selamanya,"
                autoComplete="off"
              />
            </Field>

            <Field
              id={`${idPrefix}-letterDate`}
              label="Tanggal Surat"
              error={errors.letterDate?.message}
            >
              <Input
                type="date"
                {...register("letterDate")}
                autoComplete="off"
              />
            </Field>
          </div>
        </div>
      )}

      {/* Tab 6: Warna & Musik */}
      {activeTab === "theme" && (
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className="border-b border-border/50 pb-3">
            <h4 className="text-sm font-semibold text-foreground">
              6. Palet Warna Elemen & Musik Latar
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              Sesuaikan setiap warna elemen secara bebas untuk menciptakan suasana persahabatan yang tepat.
            </p>
          </div>

          <div className="space-y-5">
            <ColorPickerField
              label="Warna Aksen Sahabat (Primary Color)"
              helperText="Warna tombol fist bump, lencana, aksen tanggal, dan garis batas aktif."
              value={primaryColor}
              onChange={(c) => setValue("primaryColor", c, { shouldDirty: true })}
              presets={FRIENDSHIP_COLOR_PRESETS}
            />

            <ColorPickerField
              label="Warna Latar Belakang Website (Background)"
              helperText="Warna kanvas utama website (dapat bernuansa terang alami atau gelap hangat)."
              value={backgroundColor}
              onChange={(c) => setValue("backgroundColor", c, { shouldDirty: true })}
              presets={BACKGROUND_COLOR_PRESETS}
            />

            <ColorPickerField
              label="Warna Kartu Surat & Wadah (Card Color)"
              helperText="Warna dasar kartu polaroid, kartu linimasa, dan kontainer surat."
              value={cardColor}
              onChange={(c) => setValue("cardColor", c, { shouldDirty: true })}
              presets={CARD_COLOR_PRESETS}
            />

            <ColorPickerField
              label="Warna Teks Judul & Nama"
              helperText="Warna untuk judul besar, nama sahabat, dan tajuk kartu."
              value={textColor}
              onChange={(c) => setValue("textColor", c, { shouldDirty: true })}
              presets={TEXT_COLOR_PRESETS}
            />

            <ColorPickerField
              label="Warna Teks Cerita & Narasi"
              helperText="Warna untuk isi surat, ulasan sifat, dan cerita petualangan."
              value={bodyTextColor}
              onChange={(c) => setValue("bodyTextColor", c, { shouldDirty: true })}
              presets={TEXT_COLOR_PRESETS}
            />
          </div>

          {/* Background Audio Settings */}
          <div className="pt-4 border-t border-border/50 space-y-4">
            <h5 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Pengaturan Musik Latar
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                id={`${idPrefix}-musicTitle`}
                label="Judul Lagu Persahabatan"
                error={errors.musicTitle?.message}
                helperText="Judul lagu kenangan berdua yang ditampilkan di pemutar musik."
              >
                <Input
                  {...register("musicTitle")}
                  placeholder="Count On Me - Acoustic Version"
                  autoComplete="off"
                />
              </Field>

              <Field
                id={`${idPrefix}-bgMusicUrl`}
                label="URL Audio Lagu (MP3 Langsung)"
                error={errors.bgMusicUrl?.message}
                helperText="Tautan file audio MP3 langsung. Jika kosong, lagu melodi akustik terpadu yang damai akan otomatis dimainkan."
              >
                <Input
                  {...register("bgMusicUrl")}
                  placeholder="https://example.com/audio/friendship-song.mp3"
                  autoComplete="off"
                />
              </Field>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons: Prev / Next */}
      <div className="pt-6 border-t border-border/60 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 w-full">
        {prevTab ? (
          <button
            type="button"
            onClick={() => goToTab(prevTab.id)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border text-xs sm:text-sm font-medium hover:bg-muted transition-colors text-foreground"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Sebelumnya: {prevTab.label}</span>
          </button>
        ) : (
          <div />
        )}

        {nextTab ? (
          <button
            type="button"
            onClick={() => goToTab(nextTab.id)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-white text-xs sm:text-sm font-medium shadow-sm transition-all hover:opacity-90 active:scale-[0.99]"
            style={{ backgroundColor: primaryColor }}
          >
            <span>Lanjut: {nextTab.label}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <div className="text-right">
            <span className="text-xs text-muted-foreground flex items-center justify-end gap-1.5">
              <Check className="w-4 h-4 text-emerald-600" /> Semua bagian siap diperiksa di pratinjau!
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
