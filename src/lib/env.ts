/**
 * Akses environment variable terpusat.
 *
 * Variabel NEXT_PUBLIC_* dirujuk secara literal agar Next.js dapat meng-inline
 * nilainya saat build. SUPABASE_SERVICE_ROLE_KEY sengaja hanya dibaca lewat
 * fungsi server-side (lihat lib/supabase/admin.ts) supaya tidak pernah ikut
 * ter-bundle ke browser.
 */
export const publicEnv = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  googleAuthEnabled: process.env.NEXT_PUBLIC_ENABLE_GOOGLE_AUTH === "true",
};

export function assertSupabaseEnv() {
  if (!publicEnv.supabaseUrl || !publicEnv.supabaseAnonKey) {
    throw new Error(
      "Supabase belum dikonfigurasi. Salin .env.example menjadi .env.local lalu isi NEXT_PUBLIC_SUPABASE_URL dan NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    );
  }
}
