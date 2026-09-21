"use client";

import { useState } from "react";
import type {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  FieldErrors,
} from "react-hook-form";
import {
  Music,
  Feather,
  Disc,
  Heart,
  Sparkles,
  Palette,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Field, Input, Textarea } from "@/components/ui/field";
import { ColorPickerField } from "@/components/ui/color-picker-field";
import { cn } from "@/lib/utils/cn";
import type { LetterFormValues } from "./dynamic-form";

interface SymphonyLoveBuilderFormProps {
  register: UseFormRegister<LetterFormValues>;
  setValue: UseFormSetValue<LetterFormValues>;
  watch: UseFormWatch<LetterFormValues>;
  errors: FieldErrors<LetterFormValues>;
  idPrefix?: string;
}

type TabType =
  | "score"
  | "soliloquy"
  | "movements"
  | "instruments"
  | "harmonics"
  | "cadence";

export function SymphonyLoveBuilderForm({
  register,
  setValue,
  watch,
  errors,
  idPrefix = "symphony-love",
}: SymphonyLoveBuilderFormProps) {
  const [activeTab, setActiveTab] = useState<TabType>("score");

  const tabs: Array<{ id: TabType; label: string; icon: React.ReactNode }> = [
    { id: "score", label: "Partitur & Foto", icon: <Music className="w-4 h-4" /> },
    { id: "soliloquy", label: "Warkah Komposer", icon: <Feather className="w-4 h-4" /> },
    { id: "movements", label: "4 Gerakan Simfoni", icon: <Disc className="w-4 h-4" /> },
    { id: "instruments", label: "4 Instrumen Jiwa", icon: <Heart className="w-4 h-4" /> },
    { id: "harmonics", label: "Metrik & Piagam", icon: <Sparkles className="w-4 h-4" /> },
    { id: "cadence", label: "Akord & Tema", icon: <Palette className="w-4 h-4" /> },
  ];

  const primaryColor = watch("primaryColor") as string;
  const secondaryColor = watch("secondaryColor") as string;
  const accentColor = watch("accentColor") as string;
  const museImgUrl = watch("musePhotoUrl") as string;
  const pianoImgUrl = watch("pianoScorePhotoUrl") as string;

  const handleApplyPresetMovements = () => {
    setValue("movement1Tempo", "Movement I: Allegro Vivace • 3/4 Time");
    setValue("movement1Title", "Detak Awal Resonansi Pertemuan");
    setValue(
      "movement1Desc",
      "Petikan akord riang yang berderap cepat seperti jantung yang berdegup kencang saat mata kita pertama kali bersua. Nada-nada tinggi yang melompat lincah merekam debar bahagia saat kusadari bahwa duniaku tak akan pernah sama lagi."
    );
    setValue("movement1Dynamic", "Crescendo di Gioia (Sukacita yang Terus Bertumbuh)");

    setValue("movement2Tempo", "Movement II: Andante Cantabile • 4/4 Time");
    setValue("movement2Title", "Bisikan Harmoni Sunyi di Larut Malam");
    setValue(
      "movement2Desc",
      "Melodi lambat nan menghanyutkan dimainkan dalam keheningan solo cello dan piano. Momen saat kita saling membuka luka masa lalu dan kerapuhan jiwa, menyadari bahwa pelukan kita adalah tempat teraman untuk beristirahat."
    );
    setValue("movement2Dynamic", "Pianissimo con Tenerezza (Kelembutan Penuh Ketulusan)");

    setValue("movement3Tempo", "Movement III: Scherzo con Brio • 6/8 Time");
    setValue("movement3Title", "Tawa & Gelak Canda Menembus Badai");
    setValue(
      "movement3Desc",
      "Irama dansa waltz penuh warna yang melambangkan hari-hari penuh tawa, lelucon receh di sore hari, dan kemampuan kita mengubah hari terberat sekalipun menjadi melodi riang yang patut disyukuri."
    );
    setValue("movement3Dynamic", "Leggiero e Brillante (Ringan, Hangat, & Bercahaya)");

    setValue("movement4Tempo", "Movement IV: Finale Maestoso • All'Unisono");
    setValue("movement4Title", "Akord Puncak Perjanjian Keabadian");
    setValue(
      "movement4Desc",
      "Puncak simfoni di mana seluruh instrumen berdentang serentak dalam satu harmoni agung. Menegaskan komitmen bahwa cinta kita tidak akan pernah memudar oleh waktu, melainkan bergaung abadi melintasi dimensi semesta."
    );
    setValue("movement4Dynamic", "Fortissimo Sforzando (Kekuatan Cinta Paling Kokoh)");
  };

  const getNextTab = (): TabType | null => {
    const currentIndex = tabs.findIndex((t) => t.id === activeTab);
    return currentIndex < tabs.length - 1 ? tabs[currentIndex + 1].id : null;
  };

  const getPrevTab = (): TabType | null => {
    const currentIndex = tabs.findIndex((t) => t.id === activeTab);
    return currentIndex > 0 ? tabs[currentIndex - 1].id : null;
  };

  const colorPresets = [
    { label: "Candlelight Amber & Mahogany", primary: "#d4af37", secondary: "#b45309", accent: "#1a100c" },
    { label: "Concert Hall Gold & Ebony", primary: "#f59e0b", secondary: "#78350f", accent: "#110a08" },
    { label: "Warm Cello & Antique Brass", primary: "#e5c07b", secondary: "#92400e", accent: "#170e0a" },
    { label: "Grand Piano Ivory & Crimson", primary: "#fde68a", secondary: "#991b1b", accent: "#1c0d08" },
  ];

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className="flex border-b border-border/40 overflow-x-auto gap-1 pb-1 scrollbar-thin">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-t-lg transition-colors whitespace-nowrap border-b-2",
                isActive
                  ? "border-amber-500 text-amber-600 dark:text-amber-400 bg-amber-500/10 font-semibold"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30"
              )}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: Partitur & Foto */}
      {activeTab === "score" && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-200">
            <p className="font-semibold mb-0.5">Lembar Judul Partitur Opus & Foto Potret Sang Muse</p>
            <p>
              Tentukan nomor Opus, judul mahakarya simfoni, nama sang muse abadi, dan sematkan foto potret agar tampilan semakin memikat dan tidak monoton.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Nomor Opus & Tangga Nada">
              <Input
                {...register("opusNo")}
                id={`${idPrefix}-opusNo`}
                placeholder="OPUS N°24 IN C-SHARP MINOR"
              />
            </Field>

            <Field label="Tanda Tempo & Ekspresi">
              <Input
                {...register("tempoMarking")}
                id={`${idPrefix}-tempoMarking`}
                placeholder="Adagio con Amore e Molto Espressivo (♩ = 60)"
              />
            </Field>
          </div>

          <Field label="Judul Mahakarya Partitur Simfoni">
            <Input
              {...register("scoreTitle")}
              id={`${idPrefix}-scoreTitle`}
              placeholder="L'AMOUR ÉTERNEL: CONCERTO DI DUE ANIME"
            />
          </Field>

          <Field label="Tanda Mula & Tangga Nada (Key Signature)">
            <Input
              {...register("keySignature")}
              id={`${idPrefix}-keySignature`}
              placeholder="4 Sharps (F# - C# - G# - D#) • Simfoni Empat Musim Jiwa"
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Nama Sang Muse Abadi (Penerima)" error={errors.recipientName?.message} required>
              <Input
                {...register("recipientName", { required: "Nama penerima wajib diisi" })}
                id={`${idPrefix}-recipientName`}
                placeholder="Éléonore Vivienne de Chantal"
              />
            </Field>

            <Field label="Nama Sang Komposer (Pengirim)" error={errors.senderName?.message} required>
              <Input
                {...register("senderName", { required: "Nama pengirim wajib diisi" })}
                id={`${idPrefix}-senderName`}
                placeholder="Maestro Julian de Saint-Germain"
              />
            </Field>
          </div>

          <Field label="Teks Dedikasi Partitur">
            <Input
              {...register("dedicationText")}
              id={`${idPrefix}-dedicationText`}
              placeholder="Dédié avec toute la dévotion de mon âme à ma muse éternelle"
            />
          </Field>

          {/* Image Upload / URL Fields */}
          <div className="p-4 rounded-xl border border-border/70 bg-card/60 space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Galeri Visual & Foto Potret
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Field label="URL Foto Potret Sang Muse (Wajah Pasangan)">
                  <Input
                    {...register("musePhotoUrl")}
                    id={`${idPrefix}-musePhotoUrl`}
                    placeholder="https://images.unsplash.com/photo-..."
                  />
                </Field>
                {museImgUrl && (
                  <div className="h-28 w-full rounded-lg overflow-hidden border border-border/60">
                    <img src={museImgUrl} alt="Preview Muse" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Field label="URL Foto Grand Piano / Suasana Resonansi">
                  <Input
                    {...register("pianoScorePhotoUrl")}
                    id={`${idPrefix}-pianoScorePhotoUrl`}
                    placeholder="https://images.unsplash.com/photo-..."
                  />
                </Field>
                {pianoImgUrl && (
                  <div className="h-28 w-full rounded-lg overflow-hidden border border-border/60">
                    <img src={pianoImgUrl} alt="Preview Piano" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Warkah Komposer */}
      {activeTab === "soliloquy" && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-200">
            <p className="font-semibold mb-0.5">Warkah Solilokui Malam di Balik Tuts Piano</p>
            <p>
              Tuliskan surat cinta puitis mendalam di mana setiap kata dan kalimat dianalogikan sebagai gubahan harmoni nada.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Judul Solilokui">
              <Input
                {...register("soliloquyTitle")}
                id={`${idPrefix}-soliloquyTitle`}
                placeholder="Solilokui Malam di Balik Tuts Grand Piano"
              />
            </Field>

            <Field label="Waktu Penulisan Warkah">
              <Input
                {...register("soliloquyTime")}
                id={`${idPrefix}-soliloquyTime`}
                placeholder="Tengah Malam • Pukul 02:15 di Bawah Temaram Lilin"
              />
            </Field>
          </div>

          <Field label="Isi Surat Cinta Komposer (Warkah Utama)" error={errors.mainMessage?.message} required>
            <Textarea
              {...register("mainMessage", { required: "Surat cinta wajib diisi" })}
              id={`${idPrefix}-mainMessage`}
              rows={8}
              placeholder="Tuliskan surat cinta puitis komposer..."
            />
          </Field>

          <Field label="Aksioma Filosofis Musik & Cinta">
            <Input
              {...register("musicalAxiom")}
              id={`${idPrefix}-musicalAxiom`}
              placeholder="Musik dimulai di saat kata-kata tak lagi sanggup mengucapkannya..."
            />
          </Field>

          <Field label="Sebutan Penutup Tanda Tangan Komposer">
            <Input
              {...register("composerSignatureTitle")}
              id={`${idPrefix}-composerSignatureTitle`}
              placeholder="Komposer yang Seluruh Detak Nadanya Beresonansi Untukmu,"
            />
          </Field>
        </div>
      )}

      {/* TAB 3: 4 Gerakan Simfoni */}
      {activeTab === "movements" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <div className="text-xs text-amber-800 dark:text-amber-200">
              <p className="font-semibold mb-0.5">Empat Gerakan Simfoni Cinta (The 4 Movements)</p>
              <p>
                Rangkaian babak perjalanan cinta: Allegro pertemuan, Andante bisikan, Scherzo canda, hingga Finale akord abadi.
              </p>
            </div>
            <button
              type="button"
              onClick={handleApplyPresetMovements}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-amber-600 text-white hover:bg-amber-700 shadow-sm shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Gunakan Gerakan Klasik</span>
            </button>
          </div>

          {/* Movement 1 */}
          <div className="p-4 rounded-xl border border-border/70 bg-card/60 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Gerakan 1: Allegro Vivace (Pertemuan Pertama)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Tempo & Birama">
                <Input {...register("movement1Tempo")} placeholder="Movement I: Allegro Vivace • 3/4 Time" />
              </Field>
              <Field label="Judul Bagian">
                <Input {...register("movement1Title")} placeholder="Detak Awal Resonansi Pertemuan" />
              </Field>
            </div>
            <Field label="Dinamika Jiwa">
              <Input {...register("movement1Dynamic")} placeholder="Crescendo di Gioia" />
            </Field>
            <Field label="Narasi Kisah Musikal">
              <Textarea {...register("movement1Desc")} rows={2} placeholder="Petikan akord riang..." />
            </Field>
          </div>

          {/* Movement 2 */}
          <div className="p-4 rounded-xl border border-border/70 bg-card/60 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Gerakan 2: Andante Cantabile (Bisikan Sunyi)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Tempo & Birama">
                <Input {...register("movement2Tempo")} placeholder="Movement II: Andante Cantabile • 4/4 Time" />
              </Field>
              <Field label="Judul Bagian">
                <Input {...register("movement2Title")} placeholder="Bisikan Harmoni Sunyi di Larut Malam" />
              </Field>
            </div>
            <Field label="Dinamika Jiwa">
              <Input {...register("movement2Dynamic")} placeholder="Pianissimo con Tenerezza" />
            </Field>
            <Field label="Narasi Kisah Musikal">
              <Textarea {...register("movement2Desc")} rows={2} placeholder="Melodi lambat nan menghanyutkan..." />
            </Field>
          </div>

          {/* Movement 3 */}
          <div className="p-4 rounded-xl border border-border/70 bg-card/60 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Gerakan 3: Scherzo con Brio (Tawa Bahagia)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Tempo & Birama">
                <Input {...register("movement3Tempo")} placeholder="Movement III: Scherzo con Brio • 6/8 Time" />
              </Field>
              <Field label="Judul Bagian">
                <Input {...register("movement3Title")} placeholder="Tawa & Gelak Canda Menembus Badai" />
              </Field>
            </div>
            <Field label="Dinamika Jiwa">
              <Input {...register("movement3Dynamic")} placeholder="Leggiero e Brillante" />
            </Field>
            <Field label="Narasi Kisah Musikal">
              <Textarea {...register("movement3Desc")} rows={2} placeholder="Irama dansa waltz penuh warna..." />
            </Field>
          </div>

          {/* Movement 4 */}
          <div className="p-4 rounded-xl border border-border/70 bg-card/60 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Gerakan 4: Finale Maestoso (Akord Puncak Abadi)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Tempo & Birama">
                <Input {...register("movement4Tempo")} placeholder="Movement IV: Finale Maestoso • All'Unisono" />
              </Field>
              <Field label="Judul Bagian">
                <Input {...register("movement4Title")} placeholder="Akord Puncak Perjanjian Keabadian" />
              </Field>
            </div>
            <Field label="Dinamika Jiwa">
              <Input {...register("movement4Dynamic")} placeholder="Fortissimo Sforzando" />
            </Field>
            <Field label="Narasi Kisah Musikal">
              <Textarea {...register("movement4Desc")} rows={2} placeholder="Puncak simfoni di mana seluruh instrumen..." />
            </Field>
          </div>
        </div>
      )}

      {/* TAB 4: 4 Instrumen Jiwa */}
      {activeTab === "instruments" && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-200">
            <p className="font-semibold mb-0.5">Empat Instrumen Harmoni Jiwa</p>
            <p>
              Instrumen klasik yang menggambarkan peran dan karakter kasih: Grand Piano, Cello Stradivarius, Harpa Konser, dan Seruling Perak.
            </p>
          </div>

          {/* Instrument 1 */}
          <div className="p-4 rounded-xl border border-border/70 bg-card/60 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Instrumen 1: Grand Piano
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Nama Instrumen">
                <Input {...register("instrument1Name")} placeholder="The Concert Grand Piano" />
              </Field>
              <Field label="Peran Harmoni">
                <Input {...register("instrument1Role")} placeholder="Pondasi Harmoni & Rumah Seluruh Nada" />
              </Field>
            </div>
            <Field label="Filosofi">
              <Textarea {...register("instrument1Desc")} rows={2} placeholder="Tuts gading dan kayu mahoni..." />
            </Field>
          </div>

          {/* Instrument 2 */}
          <div className="p-4 rounded-xl border border-border/70 bg-card/60 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Instrumen 2: Cello Stradivarius
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Nama Instrumen">
                <Input {...register("instrument2Name")} placeholder="The Stradivarius Cello" />
              </Field>
              <Field label="Peran Harmoni">
                <Input {...register("instrument2Role")} placeholder="Resonansi Dekapan & Ketenangan Batin" />
              </Field>
            </div>
            <Field label="Filosofi">
              <Textarea {...register("instrument2Desc")} rows={2} placeholder="Gesekan senar bas yang dalam..." />
            </Field>
          </div>

          {/* Instrument 3 */}
          <div className="p-4 rounded-xl border border-border/70 bg-card/60 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Instrumen 3: Harpa Konser
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Nama Instrumen">
                <Input {...register("instrument3Name")} placeholder="The Concert Harp" />
              </Field>
              <Field label="Peran Harmoni">
                <Input {...register("instrument3Role")} placeholder="Petikan Doa Suci & Kemilau Impian" />
              </Field>
            </div>
            <Field label="Filosofi">
              <Textarea {...register("instrument3Desc")} rows={2} placeholder="Untaian dawai emas yang dipetik..." />
            </Field>
          </div>

          {/* Instrument 4 */}
          <div className="p-4 rounded-xl border border-border/70 bg-card/60 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Instrumen 4: Seruling Perak
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Nama Instrumen">
                <Input {...register("instrument4Name")} placeholder="The Silver Concert Flute" />
              </Field>
              <Field label="Peran Harmoni">
                <Input {...register("instrument4Role")} placeholder="Embusan Angin Kesejukan Meredakan Gundah" />
              </Field>
            </div>
            <Field label="Filosofi">
              <Textarea {...register("instrument4Desc")} rows={2} placeholder="Tiupan melodi perak yang melayang..." />
            </Field>
          </div>
        </div>
      )}

      {/* TAB 5: Metrik Akustik & Piagam */}
      {activeTab === "harmonics" && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-200">
            <p className="font-semibold mb-0.5">Telemetri Akustik & Sumpah Maestro</p>
            <p>
              Parameter frekuensi nada cinta (432 Hz), jangkauan dinamika, serta naskah ikrar kesetiaan komposer.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Frekuensi Penyelarasan (Tuning Pitch)">
              <Input
                {...register("tuningFrequency")}
                id={`${idPrefix}-tuningFrequency`}
                placeholder="432 Hz • Natural Harmonic Resonance"
              />
            </Field>

            <Field label="Jangkauan Dinamika Emosi">
              <Input
                {...register("dynamicRange")}
                id={`${idPrefix}-dynamicRange`}
                placeholder="Pianissimo (Bisikan Rindu) hingga Fortissimo"
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Ruang Resonansi Jiwa">
              <Input
                {...register("acousticResonance")}
                id={`${idPrefix}-acousticResonance`}
                placeholder="Dua Hati yang Saling Memahami"
              />
            </Field>

            <Field label="Status Koda Penutup">
              <Input
                {...register("codaStatus")}
                id={`${idPrefix}-codaStatus`}
                placeholder="Da Capo al Infinito • Nada Abadi"
              />
            </Field>
          </div>

          <Field label="Judul Piagam Sumpah Harmoni">
            <Input
              {...register("covenantTitle")}
              id={`${idPrefix}-covenantTitle`}
              placeholder="The Composer's Sacred Covenant"
            />
          </Field>

          <Field label="Naskah Piagam Sumpah Maestro">
            <Textarea
              {...register("covenantText")}
              id={`${idPrefix}-covenantText`}
              rows={4}
              placeholder="Di hadapan keindahan seni nada..."
            />
          </Field>
        </div>
      )}

      {/* TAB 6: Akord & Tema Musik */}
      {activeTab === "cadence" && (
        <div className="space-y-6">
          <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-200">
            <p className="font-semibold mb-0.5">Dentang Akord Terakhir & Pesan Rahasia Koda</p>
            <p>
              Tuliskan pesan rahasia yang akan terungkap saat pasangan menyentuh tombol dentangan akord penutup.
            </p>
          </div>

          <Field label="Teks Tombol Dentang Akord">
            <Input
              {...register("cadenceButtonText")}
              id={`${idPrefix}-cadenceButtonText`}
              placeholder="Dentangkan Akord Cinta Terakhir (Play Final Cadence)"
            />
          </Field>

          <Field label="Pesan Rahasia Koda Musik (Secret Musical Coda)">
            <Textarea
              {...register("secretCodaMessage")}
              id={`${idPrefix}-secretCodaMessage`}
              rows={4}
              placeholder="Jika suatu saat seluruh partitur di dunia terbakar..."
            />
          </Field>

          <Field label="Kutipan Penutup Partitur">
            <Input
              {...register("scoreClosingQuote")}
              id={`${idPrefix}-scoreClosingQuote`}
              placeholder="Finis coronat opus • Melodi ini selesai ditulis..."
            />
          </Field>

          {/* Palette presets */}
          <div className="space-y-2 pt-2 border-t border-border/50">
            <span className="text-xs font-semibold text-foreground">Preset Warna Tema Partitur:</span>
            <div className="grid grid-cols-2 gap-2">
              {colorPresets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setValue("primaryColor", preset.primary);
                    setValue("secondaryColor", preset.secondary);
                    setValue("accentColor", preset.accent);
                  }}
                  className="p-2.5 rounded-lg border border-border/70 hover:border-amber-400/60 text-left transition flex items-center justify-between bg-card/50"
                >
                  <span className="text-xs font-medium text-foreground">{preset.label}</span>
                  <div className="flex gap-1">
                    <span className="w-3.5 h-3.5 rounded-full border border-black/20" style={{ backgroundColor: preset.primary }} />
                    <span className="w-3.5 h-3.5 rounded-full border border-black/20" style={{ backgroundColor: preset.secondary }} />
                    <span className="w-3.5 h-3.5 rounded-full border border-black/20" style={{ backgroundColor: preset.accent }} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Color pickers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <ColorPickerField
              label="Candlelight Amber Gold"
              value={primaryColor || "#d4af37"}
              onChange={(val) => setValue("primaryColor", val)}
              presets={[
                { label: "Candlelight Amber", value: "#d4af37" },
                { label: "Brass Clef Gold", value: "#f59e0b" },
                { label: "Champagne Score", value: "#e5c07b" },
              ]}
            />
            <ColorPickerField
              label="Nocturne Warm Cello"
              value={secondaryColor || "#b45309"}
              onChange={(val) => setValue("secondaryColor", val)}
              presets={[
                { label: "Warm Cello", value: "#b45309" },
                { label: "Violin Mahogany", value: "#78350f" },
                { label: "Autumn Sonata", value: "#92400e" },
              ]}
            />
            <ColorPickerField
              label="Concert Hall Ebony"
              value={accentColor || "#1a100c"}
              onChange={(val) => setValue("accentColor", val)}
              presets={[
                { label: "Concert Ebony", value: "#1a100c" },
                { label: "Midnight Velvet", value: "#110a08" },
                { label: "Resonance Dark", value: "#0c0806" },
              ]}
            />
          </div>

          <Field label="URL Musik Latar (Simfoni Piano & Selo Klasik)">
            <Input
              {...register("musicTrack")}
              id={`${idPrefix}-musicTrack`}
              placeholder="https://cdn.pixabay.com/..."
            />
          </Field>
        </div>
      )}

      {/* Stepper Footer Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-border/40">
        {getPrevTab() ? (
          <button
            type="button"
            onClick={() => {
              const prev = getPrevTab();
              if (prev) setActiveTab(prev);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border border-border bg-background hover:bg-muted transition"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Sebelumnya</span>
          </button>
        ) : (
          <div />
        )}

        {getNextTab() && (
          <button
            type="button"
            onClick={() => {
              const next = getNextTab();
              if (next) setActiveTab(next);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium bg-amber-600 text-white hover:bg-amber-700 transition ml-auto"
          >
            <span>Selanjutnya</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}

export default SymphonyLoveBuilderForm;
