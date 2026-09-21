import "server-only";

import { cache } from "react";
import { siteConfig } from "@/lib/constants";
import { createAnonClient } from "@/lib/supabase/anon";
import { createClient } from "@/lib/supabase/server";
import { isValidPublicToken } from "@/lib/utils/token";
import { recipientOf } from "@/lib/validations/letter-content";
import { getTemplate } from "@/templates/registry";
import type { LetterContent, LetterStats, LetterSummary, PublicLetter } from "@/types/letter";
import type { LetterRow } from "@/types/database";
import { getTemplateRowsById } from "./templates.service";

function asContent(value: unknown): LetterContent {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const result: LetterContent = {};
  for (const [key, item] of Object.entries(value as Record<string, unknown>)) {
    if (typeof item === "string" || typeof item === "number") result[key] = item;
  }
  return result;
}

export function buildShareUrl(templateSlug: string, token: string, baseUrl?: string) {
  const origin = baseUrl ? baseUrl.replace(/\/+$/, "") : siteConfig.url;
  return `${origin}/letter/${templateSlug}/${token}`;
}

async function toSummary(rows: LetterRow[]): Promise<LetterSummary[]> {
  const templateRows = await getTemplateRowsById();

  return rows.map((row) => {
    const templateRow = templateRows.get(row.template_id);
    const slug = templateRow?.slug ?? "";
    const meta = slug ? getTemplate(slug) : null;
    const content = asContent(row.content);

    return {
      id: row.id,
      publicToken: row.public_token,
      title: row.title ?? meta?.name ?? "Digital letter",
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      templateSlug: slug,
      templateName: meta?.name ?? templateRow?.name ?? "Template",
      recipient: meta ? recipientOf(meta, content) : "",
      shareUrl: buildShareUrl(slug, row.public_token),
    };
  });
}

/** Surat milik user yang sedang login. RLS memastikan hanya miliknya yang kembali. */
export const getUserLetters = cache(async (limit?: number): Promise<LetterSummary[]> => {
  const supabase = await createClient();
  let query = supabase.from("letters").select("*").order("created_at", { ascending: false });
  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error) {
    console.error("[letters.service] gagal memuat daftar surat:", error.message);
    return [];
  }

  return toSummary(data ?? []);
});

export async function getLetterStats(): Promise<LetterStats> {
  const letters = await getUserLetters();
  const now = new Date();

  const thisMonth = letters.filter((letter) => {
    const created = new Date(letter.createdAt);
    return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
  }).length;

  return {
    total: letters.length,
    thisMonth,
    templatesUsed: new Set(letters.map((letter) => letter.templateSlug)).size,
    lastCreatedAt: letters[0]?.createdAt ?? null,
  };
}

export async function getLetterForEdit(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("letters").select("*").eq("id", id).maybeSingle();

  if (error || !data) return null;

  const templateRows = await getTemplateRowsById();
  const slug = templateRows.get(data.template_id)?.slug ?? "";
  const template = slug ? getTemplate(slug) : null;
  if (!template) return null;

  return {
    id: data.id,
    publicToken: data.public_token,
    title: data.title ?? template.name,
    createdAt: data.created_at,
    template,
    content: asContent(data.content),
    shareUrl: buildShareUrl(slug, data.public_token),
  };
}

/**
 * Surat publik.
 *
 * Memakai RPC `get_public_letter` (SECURITY DEFINER) lewat client anonim tanpa
 * session: pembaca tidak pernah mendapat akses tabel `letters`, dan kolom
 * sensitif (id, user_id) tidak ikut dikembalikan.
 */
export async function getPublicLetter(token: string): Promise<PublicLetter | null> {
  if (!isValidPublicToken(token)) return null;

  const supabase = createAnonClient();
  const { data, error } = await supabase.rpc("get_public_letter", { p_token: token });

  if (error) {
    console.error("[letters.service] gagal memuat surat publik:", error.message);
    return null;
  }

  const row = Array.isArray(data) ? data[0] : null;
  if (!row) return null;

  return {
    publicToken: row.public_token,
    templateSlug: row.template_slug,
    templateName: row.template_name,
    title: row.title ?? row.template_name,
    content: asContent(row.content),
    createdAt: row.created_at,
  };
}

/**
 * Memuat informasi surat untuk halaman pembayaran checkout.
 */
export async function getLetterForPayment(token: string) {
  if (!isValidPublicToken(token)) return null;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("letters")
    .select("*")
    .eq("public_token", token)
    .maybeSingle();

  if (error || !data) return null;

  const templateRows = await getTemplateRowsById();
  const templateRow = templateRows.get(data.template_id);
  const slug = templateRow?.slug ?? "";
  const meta = slug ? getTemplate(slug) : null;

  return {
    id: data.id,
    publicToken: data.public_token,
    templateSlug: slug,
    templateName: meta?.name ?? templateRow?.name ?? "Digital Letter",
    title: data.title ?? meta?.name ?? "Digital Letter",
    amount: data.amount ?? 15000,
    paymentStatus: data.payment_status ?? "pending",
    payerName: data.payer_name ?? "",
    payerEmail: data.payer_email ?? "",
    content: asContent(data.content),
    recipient: meta ? recipientOf(meta, asContent(data.content)) : "",
  };
}
