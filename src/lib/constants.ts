export const siteConfig = {
  name: "Lettera",
  tagline: "Create Something They'll Remember.",
  description:
    "Tulis surat digital dengan template yang indah, lihat hasilnya secara langsung, lalu bagikan lewat satu tautan.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL &&
    !process.env.NEXT_PUBLIC_SITE_URL.includes("lettera-ivory")
      ? process.env.NEXT_PUBLIC_SITE_URL
      : "https://lettera.my.id",
  locale: "id_ID",
} as const;

export const LETTER_LIMITS = {
  shortText: 120,
  quote: 240,
  message: 4000,
  maxFieldsPerLetter: 80,
} as const;

/** Route privat (kosong karena auth dihapus). */
export const PROTECTED_PREFIXES = [] as const;
