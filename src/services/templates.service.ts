import "server-only";

import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getTemplate, listTemplates } from "@/templates/registry";
import type { TemplateMeta } from "@/templates/types";
import type { TemplateRow } from "@/types/database";

/**
 * Sumber data template terbagi dua dan itu disengaja:
 * - Database  : id, status aktif, urutan, kategori (bisa dikelola admin nanti).
 * - Registry  : konfigurasi field + komponen React (bagian yang harus di-deploy).
 * Keduanya dijembatani lewat `slug`.
 */
export const getActiveTemplateRows = cache(async (): Promise<TemplateRow[]> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("templates")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("[templates.service] gagal memuat template:", error.message);
    return [];
  }

  return data ?? [];
});

export const getTemplateRowsById = cache(async (): Promise<Map<string, TemplateRow>> => {
  const rows = await getActiveTemplateRows();
  return new Map(rows.map((row) => [row.id, row]));
});

/**
 * Template yang boleh ditampilkan ke user.
 * Sebelum seed dijalankan, tabel masih kosong — kita jatuh kembali ke registry
 * supaya landing page tetap hidup saat setup awal.
 */
export const getAvailableTemplates = cache(async (): Promise<TemplateMeta[]> => {
  const rows = await getActiveTemplateRows();
  if (rows.length === 0) return listTemplates();

  const inactiveSlugs = new Set(rows.filter((r) => !r.is_active).map((r) => r.slug));
  const order = new Map(rows.map((row, index) => [row.slug, index]));

  return listTemplates()
    .filter((template) => !inactiveSlugs.has(template.slug))
    .sort((a, b) => (order.get(a.slug) ?? 999) - (order.get(b.slug) ?? 999));
});

export async function getAvailableTemplate(slug: string): Promise<TemplateMeta | null> {
  const template = getTemplate(slug);
  if (!template) return null;

  const rows = await getActiveTemplateRows();
  if (rows.length === 0) return template;

  const row = rows.find((r) => r.slug === slug);
  if (row) return row.is_active ? template : null;

  // Jika belum ada di tabel database (misal template baru dalam kode sebelum migrasi),
  // tetap izinkan agar template baru langsung bisa digunakan
  return template;
}

const DEFAULT_TEMPLATE_METAS: Record<string, { id: string; sort_order: number }> = {
  romantic: { id: "00000000-0000-4000-8000-000000000001", sort_order: 1 },
  birthday: { id: "00000000-0000-4000-8000-000000000002", sort_order: 2 },
  graduation: { id: "00000000-0000-4000-8000-000000000003", sort_order: 3 },
  friendship: { id: "00000000-0000-4000-8000-000000000004", sort_order: 4 },
  wedding: { id: "00000000-0000-4000-8000-000000000005", sort_order: 5 },
  apology: { id: "00000000-0000-4000-8000-000000000006", sort_order: 6 },
  "vintage-love": { id: "00000000-0000-4000-8000-000000000007", sort_order: 7 },
  "starlight-love": { id: "00000000-0000-4000-8000-000000000008", sort_order: 8 },
  "love-mixtape": { id: "00000000-0000-4000-8000-000000000009", sort_order: 9 },
  "love-scrapbook": { id: "00000000-0000-4000-8000-000000000010", sort_order: 10 },
  "royal-garden-wedding": { id: "00000000-0000-4000-8000-000000000011", sort_order: 11 },
  "art-exhibition": { id: "00000000-0000-4000-8000-000000000012", sort_order: 12 },
  "neon-bash": { id: "00000000-0000-4000-8000-000000000013", sort_order: 13 },
  "gala-award": { id: "00000000-0000-4000-8000-000000000014", sort_order: 14 },
  "museum-of-us": { id: "00000000-0000-4000-8000-000000000015", sort_order: 15 },
  "secret-herbarium": { id: "00000000-0000-4000-8000-000000000016", sort_order: 16 },
  "parfum-damour": { id: "00000000-0000-4000-8000-000000000017", sort_order: 17 },
  "ex-libris": { id: "00000000-0000-4000-8000-000000000018", sort_order: 18 },
  "tourbillon-love": { id: "00000000-0000-4000-8000-000000000019", sort_order: 19 },
  "cartography-love": { id: "00000000-0000-4000-8000-000000000020", sort_order: 20 },
  "symphony-love": { id: "00000000-0000-4000-8000-000000000021", sort_order: 21 },
  "haute-joaillerie": { id: "00000000-0000-4000-8000-000000000022", sort_order: 22 },
  "birthday-gazette": { id: "00000000-0000-4000-8000-000000000023", sort_order: 23 },
  "celestial-birthday": { id: "00000000-0000-4000-8000-000000000024", sort_order: 24 },
  "birthday-passport": { id: "00000000-0000-4000-8000-000000000025", sort_order: 25 },
  "birthday-cinema": { id: "00000000-0000-4000-8000-000000000026", sort_order: 26 },
  "birthday-festival": { id: "00000000-0000-4000-8000-000000000027", sort_order: 27 },
  "grand-laureate": { id: "00000000-0000-4000-8000-000000000028", sort_order: 28 },
  "summit-achievement": { id: "00000000-0000-4000-8000-000000000029", sort_order: 29 },
  "heritage-wedding": { id: "00000000-0000-4000-8000-000000000030", sort_order: 30 },
  "amalfi-wedding": { id: "00000000-0000-4000-8000-000000000031", sort_order: 31 },
  "chateau-wedding": { id: "00000000-0000-4000-8000-000000000032", sort_order: 32 },
  "kintsugi-repair": { id: "00000000-0000-4000-8000-000000000033", sort_order: 33 },
  "safe-harbor": { id: "00000000-0000-4000-8000-000000000034", sort_order: 34 },
  "solstice-thaw": { id: "00000000-0000-4000-8000-000000000035", sort_order: 35 },
};

export async function getTemplateRowBySlug(slug: string): Promise<TemplateRow | null> {
  const rows = await getActiveTemplateRows();
  const existing = rows.find((row) => row.slug === slug);
  if (existing) return existing;

  const template = getTemplate(slug);
  if (!template) return null;

  const fallbackMeta = DEFAULT_TEMPLATE_METAS[slug] ?? {
    id: `00000000-0000-4000-8000-${String(Date.now()).slice(-12).padStart(12, "0")}`,
    sort_order: 99,
  };

  // Coba masukkan row baru ke DB jika belum ada
  try {
    const supabase = process.env.SUPABASE_SERVICE_ROLE_KEY
      ? createAdminClient()
      : await createClient();
    const { data: inserted, error: upsertError } = await supabase
      .from("templates")
      .upsert(
        {
          id: fallbackMeta.id,
          slug: template.slug,
          name: template.name,
          description: template.description,
          category: template.category,
          is_active: true,
          sort_order: fallbackMeta.sort_order,
        },
        { onConflict: "slug" },
      )
      .select()
      .single();

    if (!upsertError && inserted) return inserted;
  } catch {
    // Abaikan error upsert dan gunakan fallback
  }

  return {
    id: fallbackMeta.id,
    slug: template.slug,
    name: template.name,
    description: template.description,
    category: template.category,
    thumbnail_url: null,
    is_active: true,
    sort_order: fallbackMeta.sort_order,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}
