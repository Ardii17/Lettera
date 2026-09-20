/**
 * Standar Preset Warna untuk Template Website & Digital Letter.
 * Setiap template dapat menggunakan preset ini atau mendefinisikan warna default sendiri.
 */

export interface ColorPreset {
  label: string;
  value: string;
  description?: string;
}

export const ROMANTIC_COLOR_PRESETS: ColorPreset[] = [
  { label: "Rose Crimson", value: "#c03a52", description: "Merah mawar klasik nan hangat" },
  { label: "Ruby Velvet", value: "#9f1239", description: "Merah anggur mewah & intim" },
  { label: "Lavender Dream", value: "#7c3aed", description: "Ungu lembut memesona" },
  { label: "Emerald Sage", value: "#059669", description: "Hijau zamrud menenangkan" },
  { label: "Sunset Terracotta", value: "#e11d48", description: "Merah koral cerah bercahaya" },
  { label: "Ocean Indigo", value: "#2563eb", description: "Biru safir malam elegan" },
  { label: "Champagne Gold", value: "#d97706", description: "Emas hangat berkelas" },
  { label: "Sakura Blossom", value: "#db2777", description: "Merah muda manis ceria" },
];

export const BIRTHDAY_COLOR_PRESETS: ColorPreset[] = [
  { label: "Carnival Red", value: "#e8453c", description: "Merah pesta ceria" },
  { label: "Sunny Gold", value: "#f59e0b", description: "Kuning keemasan hangat" },
  { label: "Teal Confetti", value: "#0d9488", description: "Biru toska segar" },
  { label: "Electric Purple", value: "#8b5cf6", description: "Ungu cerah berenergi" },
  { label: "Coral Pink", value: "#f43f5e", description: "Merah muda ceria" },
];

export const GRADUATION_COLOR_PRESETS: ColorPreset[] = [
  { label: "Deep Forest", value: "#1f3329", description: "Hijau lumut wibawa" },
  { label: "Prestige Gold", value: "#b8912f", description: "Emas tanda kehormatan" },
  { label: "Navy Academia", value: "#1e3a8a", description: "Biru dongker almamater" },
  { label: "Burgundy Scholar", value: "#881337", description: "Merah marun elegan" },
];

export const FRIENDSHIP_COLOR_PRESETS: ColorPreset[] = [
  { label: "Sage Harmony", value: "#2f6f5e", description: "Hijau persahabatan tulus" },
  { label: "Warm Amber", value: "#d97706", description: "Jingga hangat persaudaraan" },
  { label: "Sky Denim", value: "#0284c7", description: "Biru langit kebersamaan" },
  { label: "Berry Sweet", value: "#be185d", description: "Merah buah manis" },
];

export const BACKGROUND_COLOR_PRESETS: ColorPreset[] = [
  { label: "Blush Rose", value: "#fdf4f5", description: "Merah muda lembut klasik" },
  { label: "Warm Ivory", value: "#fffdf9", description: "Krem gading hangat" },
  { label: "Champagne Glow", value: "#faf5ee", description: "Champagne keemasan lembut" },
  { label: "Lavender Mist", value: "#f8f5ff", description: "Ungu lavender sejuk" },
  { label: "Pure Pearl", value: "#f8fafc", description: "Putih mutiara bersih" },
  { label: "Midnight Indigo", value: "#0e1326", description: "Biru malam temaram elegan" },
  { label: "Velvet Crimson", value: "#240b13", description: "Merah anggur mewah malam" },
  { label: "Slate Night", value: "#0f172a", description: "Abu-abu gelap modern" },
];

export const CARD_COLOR_PRESETS: ColorPreset[] = [
  { label: "Pure White", value: "#ffffff", description: "Putih bersih terang" },
  { label: "Ivory Paper", value: "#fffcf9", description: "Kertas gading lembut" },
  { label: "Cloud Glass", value: "#f8fafc", description: "Abu-abu putih halus" },
  { label: "Midnight Card", value: "#182042", description: "Biru navy kontras" },
  { label: "Velvet Card", value: "#3d1624", description: "Burgundy pekat kontras" },
  { label: "Slate Dark", value: "#1e293b", description: "Slate gelap kokoh" },
];

export const TEXT_COLOR_PRESETS: ColorPreset[] = [
  { label: "Burgundy Ink", value: "#3e1b24", description: "Tinta anggur gelap" },
  { label: "Deep Charcoal", value: "#1e293b", description: "Abu-abu arang tegas" },
  { label: "Espresso Brown", value: "#292524", description: "Cokelat espresso hangat" },
  { label: "Starlight White", value: "#f8fafc", description: "Putih terang (untuk latar gelap)" },
  { label: "Champagne Text", value: "#fef08a", description: "Kuning keemasan lembut" },
  { label: "Lavender White", value: "#ede9fe", description: "Putih lavender terang" },
];

/**
 * Mendeteksi apakah sebuah kode warna HEX tergolong gelap berdasarkan rumus perceived luminance (YIQ).
 */
export function isColorDark(hex: string): boolean {
  if (!hex) return false;
  const cleanHex = hex.replace("#", "").trim();
  const fullHex =
    cleanHex.length === 3
      ? cleanHex
          .split("")
          .map((c) => c + c)
          .join("")
      : cleanHex;

  if (fullHex.length !== 6) return false;

  const r = parseInt(fullHex.substring(0, 2), 16);
  const g = parseInt(fullHex.substring(2, 4), 16);
  const b = parseInt(fullHex.substring(4, 6), 16);

  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return false;

  // Formula YIQ luminance
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq < 140;
}
