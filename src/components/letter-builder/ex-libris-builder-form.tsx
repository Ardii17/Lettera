"use client";

import { useState } from "react";
import type {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  FieldErrors,
} from "react-hook-form";
import {
  Library,
  Scroll,
  BookOpen,
  Feather,
  Shield,
  Palette,
  ChevronRight,
  ChevronLeft,
  Sparkles,
} from "lucide-react";
import { Field, Input, Textarea } from "@/components/ui/field";
import { ColorPickerField } from "@/components/ui/color-picker-field";
import { cn } from "@/lib/utils/cn";
import type { LetterFormValues } from "./dynamic-form";

interface ExLibrisBuilderFormProps {
  register: UseFormRegister<LetterFormValues>;
  setValue: UseFormSetValue<LetterFormValues>;
  watch: UseFormWatch<LetterFormValues>;
  errors: FieldErrors<LetterFormValues>;
  idPrefix?: string;
}

type TabType =
  | "colophon"
  | "foreword"
  | "chapters"
  | "marginalia"
  | "binding"
  | "theme";

export function ExLibrisBuilderForm({
  register,
  setValue,
  watch,
  errors,
  idPrefix = "ex-libris",
}: ExLibrisBuilderFormProps) {
  const [activeTab, setActiveTab] = useState<TabType>("colophon");

  const tabs: Array<{ id: TabType; label: string; icon: React.ReactNode }> = [
    { id: "colophon", label: "Etiket Ex Libris", icon: <Library className="w-4 h-4" /> },
    { id: "foreword", label: "Kata Pengantar", icon: <Scroll className="w-4 h-4" /> },
    { id: "chapters", label: "4 Bab Cerita", icon: <BookOpen className="w-4 h-4" /> },
    { id: "marginalia", label: "4 Catatan Pinggir", icon: <Feather className="w-4 h-4" /> },
    { id: "binding", label: "Kurasi Jilid Kulit", icon: <Shield className="w-4 h-4" /> },
    { id: "theme", label: "Warna & Musik", icon: <Palette className="w-4 h-4" /> },
  ];

  const primaryColor = watch("primaryColor") as string;
  const secondaryColor = watch("secondaryColor") as string;
  const accentColor = watch("accentColor") as string;

  const handleApplyPresetChapters = () => {
    setValue("chapter1Title", "The Uncharted Prelude (Halaman Pembuka Takdir)");
    setValue(
      "chapter1Epigraph",
      "Takdir tidak pernah terburu-buru, ia hanya membalik halaman tepat pada waktunya."
    );
    setValue(
      "chapter1Story",
      "Pertemuan kita bukanlah kebetulan biasa, melainkan simfoni yang telah disusun rapi oleh semesta. Di tengah keramaian kota, kehadiranmu menyala dengan keanggunan tenang yang langsung mencuri seluruh fokus duniaku."
    );
    setValue("chapter1Meaning", "Awal mula dari setiap hal indah yang hari ini kita sebut sebagai rumah.");

    setValue("chapter2Title", "The Sanctuary of Whispered Truths (Ruang Suci Kejujuran)");
    setValue(
      "chapter2Epigraph",
      "Cinta sejati dimulai saat dua manusia tak lagi perlu memakai topeng di hadapan satu sama lain."
    );
    setValue(
      "chapter2Story",
      "Malam-malam panjang saat kita bisa menceritakan luka masa lalu, ketakutan terdalam, dan impian paling rahasia tanpa takut dihakimi. Di matamu, aku menemukan ruang aman di mana aku bisa menjadi diriku yang seutuhnya."
    );
    setValue("chapter2Meaning", "Kedalaman rasa percaya yang menjadi fondasi tak tergoyahkan bagi jiwa kita.");

    setValue("chapter3Title", "Weathering the Autumn Tempest (Mengatasi Badai Hidup)");
    setValue(
      "chapter3Epigraph",
      "Angin kencang mungkin merontokkan dedaunan, namun hanya akan memperkokoh akar pohon tua."
    );
    setValue(
      "chapter3Story",
      "Ketika kehidupan menghadirkan keraguan, kelelahan, dan jarak, kita tidak saling melepaskan pegangan. Kita belajar bahwa cinta bukanlah ketiadaan badai, melainkan keberanian untuk berlayar menembusnya berdampingan."
    );
    setValue("chapter3Meaning", "Kekuatan komitmen yang membuktikan bahwa ikatan kita kebal terhadap ujian waktu.");

    setValue("chapter4Title", "The Infinite Epilogue (Epilog Abadi yang Menanti)");
    setValue(
      "chapter4Epigraph",
      "Buku terbaik bukanlah buku yang tamat, melainkan yang terus dituliskan hari demi hari."
    );
    setValue(
      "chapter4Story",
      "Semua halaman kosong di depan kita menunggu untuk diisi: rumah yang hangat, tawa anak cucu, perjalanan melintasi benua, dan saat rambut kita mulai memutih bersama. Janjiku adalah tetap menatapmu dengan rasa cinta yang sama seperti halaman pertama."
    );
    setValue("chapter4Meaning", "Sebuah janji abadi bahwa epilog kita tidak akan pernah memiliki kata 'tamat'.");
  };

  const getNextTab = (): TabType | null => {
    const currentIndex = tabs.findIndex((t) => t.id === activeTab);
    return currentIndex < tabs.length - 1 ? tabs[currentIndex + 1].id : null;
  };

  const getPrevTab = (): TabType | null => {
    const currentIndex = tabs.findIndex((t) => t.id === activeTab);
    return currentIndex > 0 ? tabs[currentIndex - 1].id : null;
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex overflow-x-auto no-scrollbar gap-1.5 p-1.5 rounded-xl bg-page border border-line">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all",
                isActive
                  ? "bg-surface text-ink font-semibold shadow-xs border border-line"
                  : "text-ink-soft hover:text-ink hover:bg-page-soft"
              )}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Etiket Ex Libris & Hak Cipta */}
      {activeTab === "colophon" && (
        <div className="space-y-5">
          <div className="border-b border-line pb-3">
            <h3 className="text-sm font-semibold text-ink flex items-center gap-2">
              <Library className="w-4 h-4 text-amber-500" />
              Bagian 1: Etiket Ex Libris &amp; Halaman Hak Cipta Kolektor
            </h3>
            <p className="text-xs text-ink-muted mt-0.5">
              Etiket kepemilikan buku pribadi, nama sang muse, penulis, judul mahakarya, dan nomor edisi.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              id={`${idPrefix}-recipientName`}
              label="Nama Sang Muse (Pemilik Ex Libris)"
              error={errors.recipientName?.message}
              required
              helperText="Sosok yang namanya tertera pada etiket cap perpustakaan pribadi"
            >
              <Input
                id={`${idPrefix}-recipientName`}
                placeholder="Seraphina Eleanor"
                {...register("recipientName")}
              />
            </Field>

            <Field
              id={`${idPrefix}-senderName`}
              label="Nama Penulis (The Wordsmith)"
              error={errors.senderName?.message}
              required
              helperText="Sosok penulis yang mendedikasikan buku mahakarya ini"
            >
              <Input
                id={`${idPrefix}-senderName`}
                placeholder="Theodore Vance"
                {...register("senderName")}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              id={`${idPrefix}-bookTitle`}
              label="Judul Buku Mahakarya"
              error={errors.bookTitle?.message}
            >
              <Input
                id={`${idPrefix}-bookTitle`}
                placeholder="The Chronology of an Unending Devotion"
                {...register("bookTitle")}
              />
            </Field>

            <Field
              id={`${idPrefix}-bookSubtitle`}
              label="Subjudul Buku"
              error={errors.bookSubtitle?.message}
            >
              <Input
                id={`${idPrefix}-bookSubtitle`}
                placeholder="An Antiquarian Record of Two Wandering Souls Finding Home"
                {...register("bookSubtitle")}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field
              id={`${idPrefix}-editionLimitation`}
              label="Keterangan Edisi Terbatas"
              error={errors.editionLimitation?.message}
            >
              <Input
                id={`${idPrefix}-editionLimitation`}
                placeholder="First & Sole Edition • Copy 01/01 Printed for Eternity"
                {...register("editionLimitation")}
              />
            </Field>

            <Field
              id={`${idPrefix}-publicationDate`}
              label="Tanggal Terbit / Penulisan"
              error={errors.publicationDate?.message}
            >
              <Input
                id={`${idPrefix}-publicationDate`}
                placeholder="Malam Saat Kisah Ini Pertama Kali Dituliskan"
                {...register("publicationDate")}
              />
            </Field>

            <Field
              id={`${idPrefix}-printingPress`}
              label="Percetakan Klasik (Colophon)"
              error={errors.printingPress?.message}
            >
              <Input
                id={`${idPrefix}-printingPress`}
                placeholder="Officina Lettera • Florence & London"
                {...register("printingPress")}
              />
            </Field>
          </div>

          <Field
            id={`${idPrefix}-frontispieceEpigraph`}
            label="Kutipan Epigraph di Halaman Depan"
            error={errors.frontispieceEpigraph?.message}
            helperText="Kutipan sastrawi yang dicetak pada halaman muka berbingkai emas"
          >
            <Textarea
              id={`${idPrefix}-frontispieceEpigraph`}
              rows={2}
              placeholder="Untukmu, yang kepadanya seluruh aksara hidupku kupersembahkan..."
              {...register("frontispieceEpigraph")}
            />
          </Field>
        </div>
      )}

      {/* Tab 2: Kata Pengantar Penulis */}
      {activeTab === "foreword" && (
        <div className="space-y-5">
          <div className="border-b border-line pb-3">
            <h3 className="text-sm font-semibold text-ink flex items-center gap-2">
              <Scroll className="w-4 h-4 text-amber-500" />
              Bagian 2: Kata Pengantar Penulis (The Author&apos;s Foreword)
            </h3>
            <p className="text-xs text-ink-muted mt-0.5">
              Surat kata pengantar puitis di atas kertas berserat katun klasik berhuruf inisial emas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              id={`${idPrefix}-forewordTitle`}
              label="Judul Kata Pengantar"
              error={errors.forewordTitle?.message}
            >
              <Input
                id={`${idPrefix}-forewordTitle`}
                placeholder="Prolog: Puisi Hidup yang Tak Pernah Usai Kubaca"
                {...register("forewordTitle")}
              />
            </Field>

            <Field
              id={`${idPrefix}-forewordDate`}
              label="Waktu &amp; Tempat Penulisan"
              error={errors.forewordDate?.message}
            >
              <Input
                id={`${idPrefix}-forewordDate`}
                placeholder="Musim Gugur, Di Bawah Cahaya Lampu Meja Perpustakaan"
                {...register("forewordDate")}
              />
            </Field>
          </div>

          <Field
            id={`${idPrefix}-mainMessage`}
            label="Isi Surat Kata Pengantar"
            error={errors.mainMessage?.message}
            helperText="Ungkapkan rasa syukur, kekaguman, dan janji kesetiaan yang mengalir di setiap kalimat"
          >
            <Textarea
              id={`${idPrefix}-mainMessage`}
              rows={8}
              placeholder="Tuliskan kata pengantar cinta yang puitis..."
              {...register("mainMessage")}
            />
          </Field>

          <Field
            id={`${idPrefix}-forewordSignoff`}
            label="Kalimat Penutup Kata Pengantar"
            error={errors.forewordSignoff?.message}
          >
            <Input
              id={`${idPrefix}-forewordSignoff`}
              placeholder="Dengan seluruh tinta jiwa yang tak akan pernah kering,"
              {...register("forewordSignoff")}
            />
          </Field>
        </div>
      )}

      {/* Tab 3: 4 Bab Cerita Cinta */}
      {activeTab === "chapters" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-line pb-3">
            <div>
              <h3 className="text-sm font-semibold text-ink flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-500" />
                Bagian 3: 4 Bab Cerita Cinta (Caput I-IV)
              </h3>
              <p className="text-xs text-ink-muted mt-0.5">
                Rangkaian narasi perjalanan cinta: Pertemuan, Kerapuhan, Ujian Hidup, dan Janji Masa Depan.
              </p>
            </div>
            <button
              type="button"
              onClick={handleApplyPresetChapters}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Gunakan Kisah 4 Bab Contoh
            </button>
          </div>

          {/* Chapter 1 */}
          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900 block">
              Caput I (Halaman Pembuka Takdir)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field id={`${idPrefix}-chapter1Title`} label="Judul Bab I">
                <Input id={`${idPrefix}-chapter1Title`} {...register("chapter1Title")} />
              </Field>
              <Field id={`${idPrefix}-chapter1Epigraph`} label="Kutipan Pembuka (Epigraph)">
                <Input id={`${idPrefix}-chapter1Epigraph`} {...register("chapter1Epigraph")} />
              </Field>
            </div>
            <Field id={`${idPrefix}-chapter1Story`} label="Narasi Babak">
              <Textarea id={`${idPrefix}-chapter1Story`} rows={2} {...register("chapter1Story")} />
            </Field>
            <Field id={`${idPrefix}-chapter1Meaning`} label="Makna Filosofis">
              <Input id={`${idPrefix}-chapter1Meaning`} {...register("chapter1Meaning")} />
            </Field>
          </div>

          {/* Chapter 2 */}
          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900 block">
              Caput II (Ruang Suci Kejujuran)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field id={`${idPrefix}-chapter2Title`} label="Judul Bab II">
                <Input id={`${idPrefix}-chapter2Title`} {...register("chapter2Title")} />
              </Field>
              <Field id={`${idPrefix}-chapter2Epigraph`} label="Kutipan Pembuka (Epigraph)">
                <Input id={`${idPrefix}-chapter2Epigraph`} {...register("chapter2Epigraph")} />
              </Field>
            </div>
            <Field id={`${idPrefix}-chapter2Story`} label="Narasi Babak">
              <Textarea id={`${idPrefix}-chapter2Story`} rows={2} {...register("chapter2Story")} />
            </Field>
            <Field id={`${idPrefix}-chapter2Meaning`} label="Makna Filosofis">
              <Input id={`${idPrefix}-chapter2Meaning`} {...register("chapter2Meaning")} />
            </Field>
          </div>

          {/* Chapter 3 */}
          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900 block">
              Caput III (Mengatasi Badai Hidup)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field id={`${idPrefix}-chapter3Title`} label="Judul Bab III">
                <Input id={`${idPrefix}-chapter3Title`} {...register("chapter3Title")} />
              </Field>
              <Field id={`${idPrefix}-chapter3Epigraph`} label="Kutipan Pembuka (Epigraph)">
                <Input id={`${idPrefix}-chapter3Epigraph`} {...register("chapter3Epigraph")} />
              </Field>
            </div>
            <Field id={`${idPrefix}-chapter3Story`} label="Narasi Babak">
              <Textarea id={`${idPrefix}-chapter3Story`} rows={2} {...register("chapter3Story")} />
            </Field>
            <Field id={`${idPrefix}-chapter3Meaning`} label="Makna Filosofis">
              <Input id={`${idPrefix}-chapter3Meaning`} {...register("chapter3Meaning")} />
            </Field>
          </div>

          {/* Chapter 4 */}
          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900 block">
              Caput IV (Epilog Abadi yang Menanti)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field id={`${idPrefix}-chapter4Title`} label="Judul Bab IV">
                <Input id={`${idPrefix}-chapter4Title`} {...register("chapter4Title")} />
              </Field>
              <Field id={`${idPrefix}-chapter4Epigraph`} label="Kutipan Pembuka (Epigraph)">
                <Input id={`${idPrefix}-chapter4Epigraph`} {...register("chapter4Epigraph")} />
              </Field>
            </div>
            <Field id={`${idPrefix}-chapter4Story`} label="Narasi Babak">
              <Textarea id={`${idPrefix}-chapter4Story`} rows={2} {...register("chapter4Story")} />
            </Field>
            <Field id={`${idPrefix}-chapter4Meaning`} label="Makna Filosofis">
              <Input id={`${idPrefix}-chapter4Meaning`} {...register("chapter4Meaning")} />
            </Field>
          </div>
        </div>
      )}

      {/* Tab 4: 4 Catatan Pinggir (Marginalia) */}
      {activeTab === "marginalia" && (
        <div className="space-y-6">
          <div className="border-b border-line pb-3">
            <h3 className="text-sm font-semibold text-ink flex items-center gap-2">
              <Feather className="w-4 h-4 text-amber-500" />
              Bagian 4: 4 Catatan Pinggir (Handwritten Marginalia)
            </h3>
            <p className="text-xs text-ink-muted mt-0.5">
              Catatan-catatan kecil bertinta sepia di tepi halaman buku saat hatimu tersentuh olehnya.
            </p>
          </div>

          {/* Note 1 */}
          <div className="p-4 rounded-xl border border-line bg-page-soft space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-ink block">
              Catatan Pinggir I
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field id={`${idPrefix}-marginalia1Page`} label="Lokasi Halaman">
                <Input id={`${idPrefix}-marginalia1Page`} {...register("marginalia1Page")} />
              </Field>
              <Field id={`${idPrefix}-marginalia1Context`} label="Konteks Kenangan">
                <Input id={`${idPrefix}-marginalia1Context`} {...register("marginalia1Context")} />
              </Field>
            </div>
            <Field id={`${idPrefix}-marginalia1Note`} label="Isi Catatan Tinta Sepia">
              <Input id={`${idPrefix}-marginalia1Note`} {...register("marginalia1Note")} />
            </Field>
          </div>

          {/* Note 2 */}
          <div className="p-4 rounded-xl border border-line bg-page-soft space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-ink block">
              Catatan Pinggir II
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field id={`${idPrefix}-marginalia2Page`} label="Lokasi Halaman">
                <Input id={`${idPrefix}-marginalia2Page`} {...register("marginalia2Page")} />
              </Field>
              <Field id={`${idPrefix}-marginalia2Context`} label="Konteks Kenangan">
                <Input id={`${idPrefix}-marginalia2Context`} {...register("marginalia2Context")} />
              </Field>
            </div>
            <Field id={`${idPrefix}-marginalia2Note`} label="Isi Catatan Tinta Sepia">
              <Input id={`${idPrefix}-marginalia2Note`} {...register("marginalia2Note")} />
            </Field>
          </div>

          {/* Note 3 */}
          <div className="p-4 rounded-xl border border-line bg-page-soft space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-ink block">
              Catatan Pinggir III
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field id={`${idPrefix}-marginalia3Page`} label="Lokasi Halaman">
                <Input id={`${idPrefix}-marginalia3Page`} {...register("marginalia3Page")} />
              </Field>
              <Field id={`${idPrefix}-marginalia3Context`} label="Konteks Kenangan">
                <Input id={`${idPrefix}-marginalia3Context`} {...register("marginalia3Context")} />
              </Field>
            </div>
            <Field id={`${idPrefix}-marginalia3Note`} label="Isi Catatan Tinta Sepia">
              <Input id={`${idPrefix}-marginalia3Note`} {...register("marginalia3Note")} />
            </Field>
          </div>

          {/* Note 4 */}
          <div className="p-4 rounded-xl border border-line bg-page-soft space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-ink block">
              Catatan Pinggir IV
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field id={`${idPrefix}-marginalia4Page`} label="Lokasi Halaman">
                <Input id={`${idPrefix}-marginalia4Page`} {...register("marginalia4Page")} />
              </Field>
              <Field id={`${idPrefix}-marginalia4Context`} label="Konteks Kenangan">
                <Input id={`${idPrefix}-marginalia4Context`} {...register("marginalia4Context")} />
              </Field>
            </div>
            <Field id={`${idPrefix}-marginalia4Note`} label="Isi Catatan Tinta Sepia">
              <Input id={`${idPrefix}-marginalia4Note`} {...register("marginalia4Note")} />
            </Field>
          </div>
        </div>
      )}

      {/* Tab 5: Kurasi Jilid Kulit */}
      {activeTab === "binding" && (
        <div className="space-y-5">
          <div className="border-b border-line pb-3">
            <h3 className="text-sm font-semibold text-ink flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-500" />
              Bagian 5: Spesifikasi Kurasi Penjilidan Buku Langka
            </h3>
            <p className="text-xs text-ink-muted mt-0.5">
              Rincian fisik material sampul kulit maroko, kertas buatan tangan, dan status pelestarian arsip.
            </p>
          </div>

          <Field
            id={`${idPrefix}-bindingStyle`}
            label="Sampul &amp; Jilidan Kulit (Binding)"
            error={errors.bindingStyle?.message}
            helperText="Material sampul buku langka"
          >
            <Input id={`${idPrefix}-bindingStyle`} {...register("bindingStyle")} />
          </Field>

          <Field
            id={`${idPrefix}-paperType`}
            label="Jenis Kertas Antik (Paper Stock)"
            error={errors.paperType?.message}
            helperText="Karakteristik kertas katun antik bebas asam"
          >
            <Input id={`${idPrefix}-paperType`} {...register("paperType")} />
          </Field>

          <Field
            id={`${idPrefix}-typographyDetails`}
            label="Tipografi &amp; Iluminasi Huruf"
            error={errors.typographyDetails?.message}
            helperText="Font klasik dan drop cap emas"
          >
            <Input id={`${idPrefix}-typographyDetails`} {...register("typographyDetails")} />
          </Field>

          <Field
            id={`${idPrefix}-preservationStatus`}
            label="Status Pelestarian Arsip"
            error={errors.preservationStatus?.message}
            helperText="Kekekalan cinta yang melindungi buku ini"
          >
            <Input id={`${idPrefix}-preservationStatus`} {...register("preservationStatus")} />
          </Field>
        </div>
      )}

      {/* Tab 6: Warna & Musik */}
      {activeTab === "theme" && (
        <div className="space-y-6">
          <div className="border-b border-line pb-3">
            <h3 className="text-sm font-semibold text-ink flex items-center gap-2">
              <Palette className="w-4 h-4 text-amber-500" />
              Bagian 6: Tombol Pita Pembatas, Warna &amp; Musik Selo
            </h3>
            <p className="text-xs text-ink-muted mt-0.5">
              Kustomisasi interaksi pita pembatas buku sutra dan melodi selo perpustakaan kuno.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field
              id={`${idPrefix}-bookmarkButtonText`}
              label="Teks Tombol Pita Pembatas"
              error={errors.bookmarkButtonText?.message}
            >
              <Input
                id={`${idPrefix}-bookmarkButtonText`}
                placeholder="Sematkan Pita Pembatas Sutra"
                {...register("bookmarkButtonText")}
              />
            </Field>

            <Field
              id={`${idPrefix}-bookmarkSuccessMessage`}
              label="Pesan Saat Pita Disematkan"
              error={errors.bookmarkSuccessMessage?.message}
            >
              <Input
                id={`${idPrefix}-bookmarkSuccessMessage`}
                placeholder="Pita sutra burgundy terselip anggun..."
                {...register("bookmarkSuccessMessage")}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <ColorPickerField
              label="Warna Emas Penjilid"
              value={primaryColor || "#d4af37"}
              onChange={(val) => setValue("primaryColor", val)}
              presets={[
                { label: "Bookbinder Gold", value: "#d4af37" },
                { label: "Florentine Gilt", value: "#eab308" },
                { label: "Antique Ochre", value: "#b45309" },
                { label: "Champagne Warm", value: "#e6c587" },
              ]}
            />

            <ColorPickerField
              label="Warna Kulit Maroko Merah"
              value={secondaryColor || "#8b1e2d"}
              onChange={(val) => setValue("secondaryColor", val)}
              presets={[
                { label: "Crimson Morocco", value: "#8b1e2d" },
                { label: "Deep Burgundy", value: "#6b1420" },
                { label: "Oxblood Leather", value: "#500724" },
                { label: "Velvet Plum", value: "#4c0519" },
              ]}
            />

            <ColorPickerField
              label="Warna Pita Sutra"
              value={accentColor || "#be123c"}
              onChange={(val) => setValue("accentColor", val)}
              presets={[
                { label: "Burgundy Silk", value: "#be123c" },
                { label: "Ruby Ribbon", value: "#e11d48" },
                { label: "Scarlet Weave", value: "#9f1239" },
                { label: "Rose Petal", value: "#fb7185" },
              ]}
            />
          </div>

          <Field
            id={`${idPrefix}-musicTrack`}
            label="URL Audio Musik Selo Perpustakaan Kuno (Opsional)"
            error={errors.musicTrack?.message}
            helperText="Tautan file audio MP3/WAV klasik yang tenang dan hangat"
          >
            <Input
              id={`${idPrefix}-musicTrack`}
              placeholder="https://.../antiquarian-cello.mp3"
              {...register("musicTrack")}
            />
          </Field>
        </div>
      )}

      {/* Navigation Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-line">
        {getPrevTab() ? (
          <button
            type="button"
            onClick={() => {
              const prev = getPrevTab();
              if (prev) setActiveTab(prev);
            }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-line text-xs font-medium text-ink hover:bg-page transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Sebelumnya
          </button>
        ) : (
          <div />
        )}

        {getNextTab() ? (
          <button
            type="button"
            onClick={() => {
              const next = getNextTab();
              if (next) setActiveTab(next);
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-seal-600 hover:bg-seal-700 text-white text-xs font-medium transition-colors"
          >
            Lanjut
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
