import { z } from "zod";
import { templateSlugs } from "@/templates/registry";

export const letterIdSchema = z.string().uuid("Id surat tidak valid.");

export const templateSlugSchema = z
  .string()
  .refine((slug) => templateSlugs().includes(slug), "Template tidak dikenali.");

export const createLetterSchema = z.object({
  templateSlug: templateSlugSchema,
  content: z.record(z.union([z.string(), z.number()])),
});

export const updateLetterSchema = createLetterSchema.extend({
  id: letterIdSchema,
});
