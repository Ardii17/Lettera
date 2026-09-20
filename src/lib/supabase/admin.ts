import "server-only";

import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

/**
 * Client service role — MELEWATI RLS.
 *
 * Hanya boleh dipanggil dari server (server action / route handler) dan hanya
 * untuk pekerjaan administratif (mis. seeding template, tooling admin).
 * Alur normal aplikasi memakai client biasa + RLS.
 */
export function createAdminClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY tidak tersedia di environment server.");
  }

  return createSupabaseClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL!, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
