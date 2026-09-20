const ID_MONTHS = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

/** Format tanggal ISO/`yyyy-mm-dd` menjadi "20 September 2026". Aman untuk input kosong. */
export function formatDate(value?: string | null): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return `${date.getUTCDate()} ${ID_MONTHS[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
}

/** Format tanggal singkat untuk tabel/dashboard: "20 Sep 2026". */
export function formatDateShort(value?: string | null): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return `${date.getDate()} ${ID_MONTHS[date.getMonth()].slice(0, 3)} ${date.getFullYear()}`;
}

/** Memecah teks multiline menjadi paragraf agar dirender sebagai node teks (bukan HTML). */
export function toParagraphs(value?: string | null): string[] {
  if (!value) return [];
  return value
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

export function truncate(value: string, max = 80): string {
  return value.length <= max ? value : `${value.slice(0, max - 1).trimEnd()}…`;
}
