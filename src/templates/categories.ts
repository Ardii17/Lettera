export interface CategoryMeta {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  icon: "Heart" | "PartyPopper" | "GraduationCap" | "Sparkles" | "Mail" | "HeartHandshake";
  colorClass: {
    badge: string;
    iconBg: string;
    iconColor: string;
    border: string;
  };
  /** Template category names dari database atau template meta yang cocok dengan kategori ini */
  matchNames: string[];
}

export const TEMPLATE_CATEGORIES: CategoryMeta[] = [
  {
    id: "romance",
    slug: "romance",
    name: "Romansa & Cinta",
    tagline: "Surat & website tribut penuh perasaan",
    description:
      "Ekspresikan perasaan terdalam, rayakan anniversary, atau kirim surat cinta digital dengan sentuhan personal yang intim.",
    icon: "Heart",
    colorClass: {
      badge: "bg-rose-50 text-rose-700 ring-1 ring-rose-200",
      iconBg: "bg-rose-100 text-rose-600",
      iconColor: "text-rose-600",
      border: "border-rose-100",
    },
    matchNames: [
      "Romansa",
      "romance",
      "romantic",
      "Cinta",
      "Surat Romantis",
      "Romantis",
      "Love",
    ],
  },
  {
    id: "birthday",
    slug: "birthday",
    name: "Ulang Tahun & Perayaan",
    tagline: "Momen spesial hari kelahiran & selebrasi",
    description:
      "Ucapan selamat ulang tahun interaktif, countdown bertambah usia, pesan hangat, dan foto kenangan ceria.",
    icon: "PartyPopper",
    colorClass: {
      badge: "bg-amber-50 text-amber-700 ring-1 ring-amber-200",
      iconBg: "bg-amber-100 text-amber-600",
      iconColor: "text-amber-600",
      border: "border-amber-100",
    },
    matchNames: ["Perayaan", "birthday", "Ulang Tahun", "Ulang Tahun & Perayaan"],
  },
  {
    id: "graduation",
    slug: "graduation",
    name: "Kelulusan & Prestasi",
    tagline: "Apresiasi pencapaian & langkah baru",
    description:
      "Beri penghormatan atas kerja keras dan dedikasi kelulusan sekolah, wisuda kampus, atau pencapaian karir penting.",
    icon: "GraduationCap",
    colorClass: {
      badge: "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200",
      iconBg: "bg-indigo-100 text-indigo-600",
      iconColor: "text-indigo-600",
      border: "border-indigo-100",
    },
    matchNames: ["Pencapaian", "graduation", "Kelulusan", "Kelulusan & Prestasi", "Prestasi"],
  },
  {
    id: "friendship",
    slug: "friendship",
    name: "Pertemanan & Sahabat",
    tagline: "Kenangan hangat dan tawa bersama",
    description:
      "Koleksi momen manis bersama sahabat, pesan terima kasih, cerita seru, dan album persahabatan tak terlupakan.",
    icon: "Sparkles",
    colorClass: {
      badge: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200",
      iconBg: "bg-emerald-100 text-emerald-600",
      iconColor: "text-emerald-600",
      border: "border-emerald-100",
    },
    matchNames: ["Pertemanan", "friendship", "Sahabat", "Pertemanan & Sahabat"],
  },
  {
    id: "wedding",
    slug: "wedding",
    name: "Undangan & Momen Spesial",
    tagline: "Kabar bahagia pernikahan & pertunangan",
    description:
      "Undangan digital estetik, save the date, dan reservasi momen suci pernikahan dengan kemudahan berbagi tautan.",
    icon: "Mail",
    colorClass: {
      badge: "bg-amber-50 text-amber-800 ring-1 ring-amber-300",
      iconBg: "bg-amber-100 text-amber-700",
      iconColor: "text-amber-700",
      border: "border-amber-100",
    },
    matchNames: ["Undangan", "wedding", "Pernikahan", "Undangan Pernikahan", "Undangan & Momen Spesial"],
  },
  {
    id: "apology",
    slug: "apology",
    name: "Permintaan Maaf & Rekonsiliasi",
    tagline: "Kejujuran hati dan kata yang menenangkan",
    description:
      "Ungkapkan penyesalan dan harapan tulus untuk memperbaiki hubungan yang berharga lewat pesan yang mendalam.",
    icon: "HeartHandshake",
    colorClass: {
      badge: "bg-teal-50 text-teal-700 ring-1 ring-teal-200",
      iconBg: "bg-teal-100 text-teal-600",
      iconColor: "text-teal-600",
      border: "border-teal-100",
    },
    matchNames: ["Permintaan Maaf", "Maaf", "apology", "Rekonsiliasi", "Permintaan Maaf & Rekonsiliasi"],
  },
];

/**
 * Mencari metadata kategori berdasarkan nama atau slug kategori dari TemplateMeta.
 */
export function getCategoryMeta(categoryName: string): CategoryMeta {
  const norm = (categoryName || "").toLowerCase().trim();
  const found = TEMPLATE_CATEGORIES.find(
    (cat) =>
      cat.id === norm ||
      cat.slug === norm ||
      cat.name.toLowerCase() === norm ||
      cat.matchNames.some((m) => {
        const mNorm = m.toLowerCase().trim();
        return mNorm === norm || norm.includes(mNorm) || mNorm.includes(norm);
      }),
  );

  if (found) return found;

  // Fallback jika ada kategori baru di luar daftar default
  return {
    id: categoryName.toLowerCase().replace(/\s+/g, "-"),
    slug: categoryName.toLowerCase().replace(/\s+/g, "-"),
    name: categoryName,
    tagline: `Koleksi template ${categoryName}`,
    description: `Beragam pilihan tema layout untuk momen ${categoryName}.`,
    icon: "Mail",
    colorClass: {
      badge: "bg-paper-deep text-ink-soft ring-1 ring-line",
      iconBg: "bg-paper-deep text-ink-soft",
      iconColor: "text-ink-soft",
      border: "border-line",
    },
    matchNames: [categoryName],
  };
}
