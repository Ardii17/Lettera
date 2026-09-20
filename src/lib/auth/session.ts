import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { ProfileRow } from "@/types/database";

/** User saat ini (null jika anonim). `cache` mencegah query berulang di satu render. */
export const getCurrentUser = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
});

/** Dipakai server action: memastikan operasi tulis selalu punya user yang terverifikasi. */
export async function requireUser() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return user;
}

export const getProfile = cache(async (): Promise<ProfileRow | null> => {
  const user = await getCurrentUser();
  if (!user) return null;

  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  return data ?? null;
});

export function displayName(profile: ProfileRow | null, fallbackEmail?: string | null) {
  return profile?.name?.trim() || (profile?.email ?? fallbackEmail ?? "").split("@")[0] || "Kamu";
}
