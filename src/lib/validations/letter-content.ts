import { z } from "zod";
import type { TemplateField, TemplateMeta } from "@/templates/types";
import type { LetterContent } from "@/types/letter";

/**
 * Mengubah konfigurasi field template menjadi schema Zod.
 *
 * Schema yang sama dipakai di dua tempat: react-hook-form di browser dan
 * server action. Jadi validasi frontend tidak pernah menjadi satu-satunya
 * lapisan — server selalu memvalidasi ulang dengan aturan yang identik.
 */
function fieldSchema(field: TemplateField): z.ZodTypeAny {
  const label = field.label;

  if (field.type === "number") {
    const min = field.min ?? 0;
    const max = field.max ?? 1_000_000;
    const base = z.coerce
      .number({ invalid_type_error: `${label} harus berupa angka.` })
      .int(`${label} harus bilangan bulat.`)
      .min(min, `${label} minimal ${min}.`)
      .max(max, `${label} maksimal ${max}.`);

    if (field.required) return base;
    return z.preprocess(
      (value) => (value === "" || value === null || value === undefined ? undefined : value),
      base.optional(),
    );
  }

  if (field.type === "select") {
    const values = (field.options ?? []).map((option) => option.value);
    if (values.length === 0) return z.string().optional().default("");
    const base = z.enum(values as [string, ...string[]], {
      errorMap: () => ({ message: `Pilihan ${label} tidak valid.` }),
    });
    return field.required
      ? base
      : base.optional().default(String(field.defaultValue ?? values[0]));
  }

  if (field.type === "date") {
    const pattern = /^\d{4}-\d{2}-\d{2}$/;
    const base = z.string().regex(pattern, `${label} harus berformat tanggal.`);
    return field.required
      ? base
      : z.union([z.literal(""), base]).optional().default("");
  }

  const max = field.maxLength ?? 500;
  const base = z.string().trim().max(max, `${label} maksimal ${max} karakter.`);
  return field.required
    ? base.min(1, `${label} wajib diisi.`)
    : base.optional().default("");
}

export function buildContentSchema(fields: TemplateField[]) {
  const shape: Record<string, z.ZodTypeAny> = {};
  for (const field of fields) shape[field.name] = fieldSchema(field);
  // z.object() secara default membuang key yang tidak dikenal — konten yang
  // disimpan tidak akan pernah memuat field liar dari request.
  return z.object(shape);
}

/** Nilai awal form: default template, lalu ditimpa konten yang sudah ada. */
export function buildDefaultValues(
  template: TemplateMeta,
  initial?: LetterContent | null,
): LetterContent {
  const values: LetterContent = {};

  for (const field of template.fields) {
    if (field.defaultValue !== undefined) values[field.name] = field.defaultValue;
    else if (field.type === "select") values[field.name] = field.options?.[0]?.value ?? "";
    else if (field.type === "number") values[field.name] = "" as unknown as number;
    else values[field.name] = "";
  }

  if (initial) {
    for (const field of template.fields) {
      const value = initial[field.name];
      if (typeof value === "string" || typeof value === "number") values[field.name] = value;
    }
  }

  return values;
}

/** Judul otomatis ketika user tidak mengisi judul sendiri. */
export function deriveTitle(template: TemplateMeta, content: LetterContent): string {
  const explicit = typeof content.title === "string" ? content.title.trim() : "";
  if (explicit) return explicit.slice(0, 120);

  const recipientField = template.fields.find((field) => field.isRecipient);
  const recipient = recipientField ? String(content[recipientField.name] ?? "").trim() : "";

  return recipient ? `${template.name} untuk ${recipient}`.slice(0, 120) : template.name;
}

export function recipientOf(template: TemplateMeta, content: LetterContent): string {
  const recipientField = template.fields.find((field) => field.isRecipient);
  if (!recipientField) return "";
  return String(content[recipientField.name] ?? "").trim();
}
