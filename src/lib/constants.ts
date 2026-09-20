export const siteConfig = {
  name: "Lettera",
  tagline: "Create Something They'll Remember.",
  description:
    "Tulis surat digital dengan template yang indah, lihat hasilnya secara langsung, lalu bagikan lewat satu tautan.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "id_ID",
} as const;

export const LETTER_LIMITS = {
  shortText: 120,
  quote: 240,
  message: 4000,
  maxFieldsPerLetter: 80,
} as const;

/** Route yang membutuhkan sesi login. Dipakai middleware + layout dashboard. */
export const PROTECTED_PREFIXES = ["/dashboard"] as const;
