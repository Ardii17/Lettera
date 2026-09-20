import type { LetterContent } from "@/types/letter";

export type TemplateFieldType = "text" | "textarea" | "date" | "select" | "number";

export interface TemplateFieldOption {
  label: string;
  value: string;
}

/** Definisi satu field pada form builder. Sumber tunggal untuk form + validasi Zod. */
export interface TemplateField {
  name: string;
  label: string;
  type: TemplateFieldType;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  maxLength?: number;
  rows?: number;
  min?: number;
  max?: number;
  options?: TemplateFieldOption[];
  defaultValue?: string | number;
  /** Field ini dipakai membentuk judul otomatis ("Surat untuk ..."). */
  isRecipient?: boolean;
}

/**
 * Metadata template. Sengaja tidak memuat komponen React supaya file ini
 * murah diimpor dari Server Component maupun Client Component.
 * Pemetaan slug -> komponen ada di `templates/renderer.tsx`.
 */
export interface TemplateMeta {
  slug: string;
  name: string;
  category: string;
  description: string;
  /** Kalimat pendek untuk kartu dan halaman detail. */
  tagline: string;
  /** Warna aksen kartu (class Tailwind) agar listing terasa berbeda per template. */
  cardAccent: string;
  highlights: string[];
  fields: TemplateField[];
  sample: LetterContent;
}
