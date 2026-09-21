import { birthdayTemplate } from "./birthday/definition";
import { friendshipTemplate } from "./friendship/definition";
import { graduationTemplate } from "./graduation/definition";
import { romanticTemplate } from "./romantic/definition";
import { weddingTemplate } from "./wedding/definition";
import { apologyTemplate } from "./apology/definition";
import { vintageLoveTemplate } from "./vintage-love/definition";
import { starlightLoveTemplate } from "./starlight-love/definition";
import { loveMixtapeTemplate } from "./love-mixtape/definition";
import { loveScrapbookTemplate } from "./love-scrapbook/definition";
import { royalGardenWeddingTemplate } from "./royal-garden-wedding/definition";
import { artExhibitionTemplate } from "./art-exhibition/definition";
import { neonBashTemplate } from "./neon-bash/definition";
import { galaAwardTemplate } from "./gala-award/definition";
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
  vintageLoveTemplate,
  starlightLoveTemplate,
  loveMixtapeTemplate,
  loveScrapbookTemplate,
  birthdayTemplate,
  graduationTemplate,
  friendshipTemplate,
  weddingTemplate,
  royalGardenWeddingTemplate,
  artExhibitionTemplate,
  neonBashTemplate,
  galaAwardTemplate,
  apologyTemplate,
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
