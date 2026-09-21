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
  { label: "Bubblegum Pink", value: "#ec4899", description: "Merah muda manis meriah" },
  { label: "Royal Indigo", value: "#3b82f6", description: "Biru pesta royal elegan" },
  { label: "Emerald Fiesta", value: "#10b981", description: "Hijau zamrud cerah" },
  { label: "Sunset Coral", value: "#f97316", description: "Jingga senja bersemangat" },
];

export const GRADUATION_COLOR_PRESETS: ColorPreset[] = [
  { label: "Prestige Gold", value: "#caa64f", description: "Emas tanda kehormatan & toga" },
  { label: "Navy Academia", value: "#1e3a8a", description: "Biru dongker almamater megah" },
  { label: "Deep Forest", value: "#1f3329", description: "Hijau lumut almamater wibawa" },
  { label: "Burgundy Scholar", value: "#881337", description: "Merah marun wisuda agung" },
  { label: "Royal Sapphire", value: "#2563eb", description: "Biru safir gelar sarjana" },
  { label: "Champagne Honor", value: "#d97706", description: "Kuning keemasan medali" },
  { label: "Slate Chancellor", value: "#334155", description: "Abu-abu gelap dekanat tegas" },
  { label: "Crimson Magna", value: "#991b1b", description: "Merah menyala cum laude" },
];

export const FRIENDSHIP_COLOR_PRESETS: ColorPreset[] = [
  { label: "Sage Harmony", value: "#2f6f5e", description: "Hijau sage persahabatan tulus & damai" },
  { label: "Warm Amber", value: "#d97706", description: "Kuning jingga hangat persaudaraan" },
  { label: "Sky Denim", value: "#0284c7", description: "Biru langit kebersamaan & petualangan" },
  { label: "Berry Sweet", value: "#be185d", description: "Merah buah manis ceria" },
  { label: "Olive Companion", value: "#4d7c0f", description: "Hijau zaitun kesetiaan abadi" },
  { label: "Sunset Ochre", value: "#ea580c", description: "Jingga senja kenangan masa muda" },
  { label: "Dusty Rose", value: "#e11d48", description: "Merah mawar persahabatan tulus" },
  { label: "Slate Trust", value: "#475569", description: "Abu-abu slate kepercayaan kokoh" },
];

export const WEDDING_COLOR_PRESETS: ColorPreset[] = [
  { label: "Royal Gold", value: "#b48c36", description: "Emas kerajaan anggun dan mewah" },
  { label: "Sage Botanical", value: "#4a6b57", description: "Hijau dedaunan botani alami" },
  { label: "Dusty Rose", value: "#b85d6e", description: "Merah mawar lembut romantis" },
  { label: "Terracotta Sunset", value: "#c05c3b", description: "Tembaga terracotta rustic hangat" },
  { label: "Midnight Navy", value: "#1d2d44", description: "Biru navy malam agung" },
  { label: "Emerald Luxury", value: "#1e4d3b", description: "Hijau zamrud pesta berkelas" },
  { label: "Burgundy Wine", value: "#7a1c30", description: "Merah marun anggur intim" },
  { label: "Champagne Pearl", value: "#c29b38", description: "Kuning champagne kilau mutiara" },
];

export const APOLOGY_COLOR_PRESETS: ColorPreset[] = [
  { label: "Sage Serenity", value: "#3b6e5b", description: "Hijau sage tenang & reflektif" },
  { label: "Calm Eucalyptus", value: "#2d5a49", description: "Hijau eukaliptus damai" },
  { label: "Muted Slate", value: "#475569", description: "Abu-abu teduh penuh ketulusan" },
  { label: "Warm Earth", value: "#785848", description: "Cokelat tanah hangat membumi" },
  { label: "Soft Lavender", value: "#6d597a", description: "Ungu lavender lembut menenangkan" },
  { label: "Deep Teal", value: "#1f5f61", description: "Biru toska tua bijaksana" },
  { label: "Mellow Amber", value: "#926228", description: "Kuning tembaga hangat bersahabat" },
  { label: "Charcoal Honest", value: "#334155", description: "Arang jujur dan tulus" },
];

export const VINTAGE_LOVE_COLOR_PRESETS: ColorPreset[] = [
  { label: "Antique Burgundy", value: "#781d2f", description: "Merah marun anggur antik segel lilin" },
  { label: "Vintage Mahogany", value: "#622929", description: "Cokelat mahoni tua surat klasik" },
  { label: "Aged Parchment", value: "#9c6644", description: "Cokelat perkamen tua hangat" },
  { label: "Emerald Epistle", value: "#1d4e3b", description: "Hijau botol klasik perpustakaan tua" },
  { label: "Royal Navy Ink", value: "#1c2b42", description: "Biru navy tinta pulpen antik" },
  { label: "Golden Wax", value: "#b38738", description: "Emas cap pos kerajaan" },
  { label: "Dusty Terracotta", value: "#a04a37", description: "Tembaga kusam klasik" },
  { label: "Midnight Velvet", value: "#3b192b", description: "Beludru malam anggun dan intim" },
];

export const STARLIGHT_COLOR_PRESETS: ColorPreset[] = [
  { label: "Starlight Gold", value: "#f5c542", description: "Kuning emas bintang sampanye berkilau" },
  { label: "Celestial Rose", value: "#e28698", description: "Merah muda nebula kosmik lembut" },
  { label: "Aurora Sky Blue", value: "#38bdf8", description: "Biru langit aurora malam" },
  { label: "Cosmic Amethyst", value: "#a78bfa", description: "Ungu galaksi mistis mempesona" },
  { label: "Moonlit Silver", value: "#cbd5e1", description: "Perak sinar rembulan jernih" },
  { label: "Amber Starlight", value: "#fbbf24", description: "Kuning temaram lentera cinta" },
  { label: "Emerald Comet", value: "#34d399", description: "Hijau komet zamrud cemerlang" },
  { label: "Solar Flare", value: "#f97316", description: "Jingga hangat kobaran cinta abadi" },
];

export const MIXTAPE_COLOR_PRESETS: ColorPreset[] = [
  { label: "Retro Coral", value: "#e15b64", description: "Merah koral kaset 90-an ceria" },
  { label: "Vintage Teal", value: "#2a9d8f", description: "Toska kaset analog klasik" },
  { label: "Vaporwave Lilac", value: "#8b5cf6", description: "Ungu synthwave nostalgia manis" },
  { label: "Sunset Tangerine", value: "#f97316", description: "Jingga senja retro hangat" },
  { label: "Cobalt Blue Tape", value: "#2563eb", description: "Biru kobalt kaset Walkman" },
  { label: "Mustard Gold 80s", value: "#d97706", description: "Kuning mustar kaset nostalgia" },
  { label: "Emerald Studio", value: "#059669", description: "Hijau studio rekaman analog" },
  { label: "Classic Charcoal Tape", value: "#1f2937", description: "Hitam arang kaset magnetik otentik" },
];

export const SCRAPBOOK_COLOR_PRESETS: ColorPreset[] = [
  { label: "Pastel Blossom Pink", value: "#f472b6", description: "Merah muda pastel bunga manis" },
  { label: "Matcha Journal", value: "#84cc16", description: "Hijau matcha buku jurnal hangat" },
  { label: "Warm Honey Scrapbook", value: "#f59e0b", description: "Kuning madu washi tape ceria" },
  { label: "Soft Lavender", value: "#a855f7", description: "Ungu lavender stiker pastel" },
  { label: "Baby Sky Blue", value: "#38bdf8", description: "Biru langit cerah scrapbook" },
  { label: "Classic Kraft Paper", value: "#b45309", description: "Cokelat kertas kraft buku kenangan" },
  { label: "Cherry Jam", value: "#e11d48", description: "Merah ceri stiker hati gemas" },
  { label: "Slate Pencil", value: "#475569", description: "Abu-abu pensil sketsa kenangan" },
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
