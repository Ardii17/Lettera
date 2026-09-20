import type { LetterContent } from "@/types/letter";

/**
 * Menggabungkan konten tersimpan dengan nilai default template.
 * Membuat komponen template tahan terhadap field kosong, hilang, atau
 * konten lama dari versi template sebelumnya.
 */
export function withDefaults<T extends Record<string, string | number>>(
  defaults: T,
  data?: LetterContent | null,
): T {
  const result: Record<string, string | number> = { ...defaults };
  if (!data) return result as T;

  for (const key of Object.keys(defaults)) {
    const value = data[key];
    if (typeof value === "string" && value.trim() !== "") result[key] = value;
    if (typeof value === "number" && Number.isFinite(value)) result[key] = value;
  }

  return result as T;
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}
