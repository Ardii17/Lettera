import { birthdayTemplate } from "./birthday/definition";
import { friendshipTemplate } from "./friendship/definition";
import { graduationTemplate } from "./graduation/definition";
import { romanticTemplate } from "./romantic/definition";
import type { TemplateMeta } from "./types";

/**
 * Registry template.
 *
 * Menambahkan template baru = tambahkan folder + definition, lalu daftarkan di
 * dua tempat: array ini dan peta komponen di `renderer.tsx`. Tidak ada file lain
 * yang perlu diubah — form, validasi, listing, preview, dan halaman publik
 * semuanya membaca dari registry.
 */
export const TEMPLATES: TemplateMeta[] = [
  romanticTemplate,
  birthdayTemplate,
  graduationTemplate,
  friendshipTemplate,
];

const TEMPLATE_MAP: Record<string, TemplateMeta> = Object.fromEntries(
  TEMPLATES.map((template) => [template.slug, template]),
);

export function listTemplates(): TemplateMeta[] {
  return TEMPLATES;
}

export function getTemplate(slug: string): TemplateMeta | null {
  return TEMPLATE_MAP[slug] ?? null;
}

export function isValidTemplateSlug(slug: string): boolean {
  return Object.prototype.hasOwnProperty.call(TEMPLATE_MAP, slug);
}

export function templateSlugs(): string[] {
  return TEMPLATES.map((template) => template.slug);
}

export function templateCategories(): string[] {
  return Array.from(new Set(TEMPLATES.map((template) => template.category)));
}
