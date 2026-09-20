import { LETTER_LIMITS } from "@/lib/constants";
import type { LetterContent } from "@/types/letter";

const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

/**
 * Membersihkan teks bebas sebelum disimpan.
 *
 * Konten selalu dirender sebagai text node React (tidak pernah
 * dangerouslySetInnerHTML), jadi fungsi ini fokus pada normalisasi:
 * buang karakter kontrol, samakan line ending, batasi baris kosong beruntun,
 * dan potong panjang berlebih.
 */
export function sanitizeText(value: string, maxLength = LETTER_LIMITS.message): string {
  return value
    .replace(/\r\n?/g, "\n")
    .replace(CONTROL_CHARS, "")
    .replace(/\n{4,}/g, "\n\n\n")
    .trim()
    .slice(0, maxLength);
}

/** Menerapkan sanitizeText pada seluruh field string dari konten surat. */
export function sanitizeContent(content: LetterContent): LetterContent {
  const result: LetterContent = {};
  for (const [key, value] of Object.entries(content).slice(0, LETTER_LIMITS.maxFieldsPerLetter)) {
    if (typeof value === "string") result[key] = sanitizeText(value);
    else if (typeof value === "number" && Number.isFinite(value)) result[key] = value;
  }
  return result;
}
