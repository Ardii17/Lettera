import "server-only";

import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

/**
 * Client anonim tanpa cookie/session.
 *
 * Dipakai khusus halaman publik (/letter/...) agar halaman tersebut tidak pernah
 * menyentuh sesi pembaca dan tidak bisa bocor ke data user manapun.
 */
export function createAnonClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
