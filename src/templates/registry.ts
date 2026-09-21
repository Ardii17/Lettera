import { birthdayTemplate } from "./birthday/definition";
import { friendshipTemplate } from "./friendship/definition";
import { graduationTemplate } from "./graduation/definition";
import { grandLaureateTemplate } from "./grand-laureate/definition";
import { summitAchievementTemplate } from "./summit-achievement/definition";
import { romanticTemplate } from "./romantic/definition";
import { parfumDamourTemplate } from "./parfum-damour/definition";
import { exLibrisTemplate } from "./ex-libris/definition";
import { tourbillonLoveTemplate } from "./tourbillon-love/definition";
import { cartographyLoveTemplate } from "./cartography-love/definition";
import { symphonyLoveTemplate } from "./symphony-love/definition";
import { hauteJoaillerieTemplate } from "./haute-joaillerie/definition";
import { weddingTemplate } from "./wedding/definition";
import { apologyTemplate } from "./apology/definition";
import { kintsugiRepairTemplate } from "./kintsugi-repair/definition";
import { safeHarborTemplate } from "./safe-harbor/definition";
import { solsticeThawTemplate } from "./solstice-thaw/definition";
import { vintageLoveTemplate } from "./vintage-love/definition";
import { starlightLoveTemplate } from "./starlight-love/definition";
import { loveMixtapeTemplate } from "./love-mixtape/definition";
import { loveScrapbookTemplate } from "./love-scrapbook/definition";
import { museumOfUsTemplate } from "./museum-of-us/definition";
import { secretHerbariumTemplate } from "./secret-herbarium/definition";
import { royalGardenWeddingTemplate } from "./royal-garden-wedding/definition";
import { artExhibitionTemplate } from "./art-exhibition/definition";
import { neonBashTemplate } from "./neon-bash/definition";
import { galaAwardTemplate } from "./gala-award/definition";
import { heritageWeddingTemplate } from "./heritage-wedding/definition";
import { amalfiWeddingTemplate } from "./amalfi-wedding/definition";
import { chateauWeddingTemplate } from "./chateau-wedding/definition";
import { birthdayGazetteTemplate } from "./birthday-gazette/definition";
import { celestialBirthdayTemplate } from "./celestial-birthday/definition";
import { birthdayPassportTemplate } from "./birthday-passport/definition";
import { birthdayCinemaTemplate } from "./birthday-cinema/definition";
import { birthdayFestivalTemplate } from "./birthday-festival/definition";
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
  museumOfUsTemplate,
  secretHerbariumTemplate,
  parfumDamourTemplate,
  exLibrisTemplate,
  tourbillonLoveTemplate,
  cartographyLoveTemplate,
  symphonyLoveTemplate,
  hauteJoaillerieTemplate,
  birthdayTemplate,
  birthdayGazetteTemplate,
  celestialBirthdayTemplate,
  birthdayPassportTemplate,
  birthdayCinemaTemplate,
  birthdayFestivalTemplate,
  graduationTemplate,
  grandLaureateTemplate,
  summitAchievementTemplate,
  friendshipTemplate,
  weddingTemplate,
  royalGardenWeddingTemplate,
  heritageWeddingTemplate,
  amalfiWeddingTemplate,
  chateauWeddingTemplate,
  artExhibitionTemplate,
  neonBashTemplate,
  galaAwardTemplate,
  apologyTemplate,
  kintsugiRepairTemplate,
  safeHarborTemplate,
  solsticeThawTemplate,
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
