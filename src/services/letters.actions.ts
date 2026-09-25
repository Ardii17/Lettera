"use server";

import { createClient } from "@/lib/supabase/server";
import { sanitizeContent } from "@/lib/utils/sanitize";
import { generatePublicToken } from "@/lib/utils/token";
import { buildContentSchema, deriveTitle } from "@/lib/validations/letter-content";
import { createLetterSchema, letterIdSchema, updateLetterSchema } from "@/lib/validations/letter";
import { getTemplate } from "@/templates/registry";
import type { ActionResult } from "@/types";
import type { LetterContent } from "@/types/letter";
import { getTemplateRowBySlug, getTemplateRowsById } from "./templates.service";
import { getUniqueAmount } from "@/lib/payment/qris-static";

const GENERIC_ERROR = "Surat gagal disimpan. Coba lagi sebentar lagi.";

/**
 * Semua validasi diulang di server. Data dari browser tidak pernah dipercaya:
 * slug template dicek ke registry, konten divalidasi ulang dengan schema Zod
 * milik template tersebut, lalu dibersihkan sebelum masuk database.
 */
function validateContent(templateSlug: string, rawContent: unknown) {
  const template = getTemplate(templateSlug);
  if (!template) {
    return { error: "Template tidak ditemukan." as const, template: null, content: null };
  }

  const parsed = buildContentSchema(template.fields).safeParse(rawContent);
  if (!parsed.success) {
    return {
      error: "Beberapa isian belum sesuai. Periksa kembali form." as const,
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      template,
      content: null,
    };
  }

  return {
    error: null,
    template,
    content: sanitizeContent(parsed.data as LetterContent),
  };
}

export async function createLetterAction(
  input: unknown,
): Promise<ActionResult<{ templateSlug: string; token: string }>> {
  const parsedInput = createLetterSchema.safeParse(input);
  if (!parsedInput.success) return { ok: false, error: "Permintaan tidak valid." };

  const { error, fieldErrors, template, content } = validateContent(
    parsedInput.data.templateSlug,
    parsedInput.data.content,
  );
  if (error || !template || !content) return { ok: false, error: error ?? GENERIC_ERROR, fieldErrors };

  const templateRow = await getTemplateRowBySlug(template.slug);
  if (!templateRow) {
    return { ok: false, error: "Template belum aktif. Jalankan seed database terlebih dahulu." };
  }

  const supabase = await createClient();
  const title = deriveTitle(template, content);

  // Token unik: peluang bentrok sangat kecil, tapi tetap dicoba ulang bila terjadi.
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const publicToken = generatePublicToken();
    const { data, error: insertError } = await supabase
      .from("letters")
      .insert({
        user_id: null,
        payer_name: parsedInput.data.payerName || null,
        payer_email: parsedInput.data.payerEmail || null,
        payment_status: "pending",
        amount: getUniqueAmount(15000, publicToken),
        template_id: templateRow.id,
        public_token: publicToken,
        title,
        content,
        status: "draft",
      })
      .select("public_token")
      .single();

    if (!insertError && data) {
      return { ok: true, data: { templateSlug: template.slug, token: data.public_token } };
    }

    if (insertError?.code !== "23505") {
      console.error("[letters.actions] gagal membuat surat:", insertError?.message);
      return { ok: false, error: GENERIC_ERROR };
    }
  }

  return { ok: false, error: GENERIC_ERROR };
}

export async function confirmPaymentAction(input: {
  token: string;
  payerName: string;
  payerEmail: string;
}): Promise<ActionResult<{ templateSlug: string; token: string }>> {
  if (!input.token || typeof input.token !== "string") {
    return { ok: false, error: "Token surat tidak valid." };
  }
  if (!input.payerName?.trim()) {
    return { ok: false, error: "Nama pemesan wajib diisi." };
  }
  if (!input.payerEmail?.trim() || !input.payerEmail.includes("@")) {
    return { ok: false, error: "Alamat email aktif wajib diisi." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("letters")
    .update({
      payment_status: "paid",
      status: "published",
      payer_name: input.payerName.trim(),
      payer_email: input.payerEmail.trim(),
    })
    .eq("public_token", input.token)
    .select("public_token, template_id")
    .maybeSingle();

  if (error || !data) {
    console.error("[letters.actions] gagal konfirmasi pembayaran:", error?.message);
    return { ok: false, error: "Gagal memverifikasi pembayaran. Silakan coba lagi." };
  }

  const templateRows = await getTemplateRowsById();
  const templateRow = templateRows.get(data.template_id);
  const templateSlug = templateRow?.slug || "romantic";

  return { ok: true, data: { templateSlug, token: data.public_token } };
}

export async function updateLetterAction(input: unknown): Promise<ActionResult<{ id: string }>> {
  const parsedInput = updateLetterSchema.safeParse(input);
  if (!parsedInput.success) return { ok: false, error: "Permintaan tidak valid." };

  const { error, fieldErrors, template, content } = validateContent(
    parsedInput.data.templateSlug,
    parsedInput.data.content,
  );
  if (error || !template || !content) return { ok: false, error: error ?? GENERIC_ERROR, fieldErrors };

  const supabase = await createClient();
  const { data, error: updateError } = await supabase
    .from("letters")
    .update({ title: deriveTitle(template, content), content })
    .eq("id", parsedInput.data.id)
    .select("id")
    .maybeSingle();

  if (updateError || !data) {
    console.error("[letters.actions] gagal memperbarui surat:", updateError?.message);
    return { ok: false, error: "Surat tidak ditemukan." };
  }

  return { ok: true, data: { id: data.id } };
}

export async function deleteLetterAction(id: string): Promise<ActionResult<{ id: string }>> {
  const parsedId = letterIdSchema.safeParse(id);
  if (!parsedId.success) return { ok: false, error: "Id surat tidak valid." };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("letters")
    .delete()
    .eq("id", parsedId.data)
    .select("id")
    .maybeSingle();

  if (error || !data) {
    return { ok: false, error: "Surat tidak ditemukan." };
  }

  return { ok: true, data: { id: data.id } };
}
