import type { LetterStatus } from "./database";

/** Konten surat disimpan sebagai JSONB: pasangan field -> nilai. */
export type LetterContent = Record<string, string | number>;

/** Bentuk surat yang dipakai di dashboard (tanpa data internal yang tidak perlu). */
export interface LetterSummary {
  id: string;
  publicToken: string;
  title: string;
  status: LetterStatus;
  createdAt: string;
  updatedAt: string;
  templateSlug: string;
  templateName: string;
  recipient: string;
  shareUrl: string;
}

/** Surat yang ditampilkan di halaman publik. Tidak memuat user_id maupun id baris. */
export interface PublicLetter {
  publicToken: string;
  templateSlug: string;
  templateName: string;
  title: string;
  content: LetterContent;
  createdAt: string;
}

export interface LetterStats {
  total: number;
  thisMonth: number;
  templatesUsed: number;
  lastCreatedAt: string | null;
}
