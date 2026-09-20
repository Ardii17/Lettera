import "server-only";

import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
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

  const order = new Map(rows.map((row, index) => [row.slug, index]));
  return listTemplates()
    .filter((template) => order.has(template.slug))
    .sort((a, b) => (order.get(a.slug) ?? 0) - (order.get(b.slug) ?? 0));
});

export async function getAvailableTemplate(slug: string): Promise<TemplateMeta | null> {
  const template = getTemplate(slug);
  if (!template) return null;

  const rows = await getActiveTemplateRows();
  if (rows.length === 0) return template;

  return rows.some((row) => row.slug === slug) ? template : null;
}

export async function getTemplateRowBySlug(slug: string): Promise<TemplateRow | null> {
  const rows = await getActiveTemplateRows();
  return rows.find((row) => row.slug === slug) ?? null;
}
