import type { ComponentType } from "react";
import type { LetterContent } from "@/types/letter";
import { BirthdayTemplate } from "./birthday/BirthdayTemplate";
import { FriendshipTemplate } from "./friendship/FriendshipTemplate";
import { GraduationTemplate } from "./graduation/GraduationTemplate";
import { GrandLaureateTemplate } from "./grand-laureate/GrandLaureateTemplate";
import { SummitAchievementTemplate } from "./summit-achievement/SummitAchievementTemplate";
import { RomanticTemplate } from "./romantic/RomanticTemplate";
import { WeddingTemplate } from "./wedding/WeddingTemplate";
import { ApologyTemplate } from "./apology/ApologyTemplate";
import { KintsugiRepairTemplate } from "./kintsugi-repair/KintsugiRepairTemplate";
import { SafeHarborTemplate } from "./safe-harbor/SafeHarborTemplate";
import { SolsticeThawTemplate } from "./solstice-thaw/SolsticeThawTemplate";
import { VintageLoveTemplate } from "./vintage-love/VintageLoveTemplate";
import { StarlightLoveTemplate } from "./starlight-love/StarlightLoveTemplate";
import { LoveMixtapeTemplate } from "./love-mixtape/LoveMixtapeTemplate";
import { LoveScrapbookTemplate } from "./love-scrapbook/LoveScrapbookTemplate";
import { MuseumOfUsTemplate } from "./museum-of-us/MuseumOfUsTemplate";
import { SecretHerbariumTemplate } from "./secret-herbarium/SecretHerbariumTemplate";
import { ParfumDamourTemplate } from "./parfum-damour/ParfumDamourTemplate";
import { ExLibrisTemplate } from "./ex-libris/ExLibrisTemplate";
import { TourbillonLoveTemplate } from "./tourbillon-love/TourbillonLoveTemplate";
import { CartographyLoveTemplate } from "./cartography-love/CartographyLoveTemplate";
import { SymphonyLoveTemplate } from "./symphony-love/SymphonyLoveTemplate";
import { HauteJoaillerieTemplate } from "./haute-joaillerie/HauteJoaillerieTemplate";
import { RoyalGardenWeddingTemplate } from "./royal-garden-wedding/RoyalGardenWeddingTemplate";
import { ArtExhibitionTemplate } from "./art-exhibition/ArtExhibitionTemplate";
import { NeonBashTemplate } from "./neon-bash/NeonBashTemplate";
import { GalaAwardTemplate } from "./gala-award/GalaAwardTemplate";
import { HeritageWeddingTemplate } from "./heritage-wedding/HeritageWeddingTemplate";
import { AmalfiWeddingTemplate } from "./amalfi-wedding/AmalfiWeddingTemplate";
import { ChateauWeddingTemplate } from "./chateau-wedding/ChateauWeddingTemplate";
import { BirthdayGazetteTemplate } from "./birthday-gazette/BirthdayGazetteTemplate";
import { CelestialBirthdayTemplate } from "./celestial-birthday/CelestialBirthdayTemplate";
import { BirthdayPassportTemplate } from "./birthday-passport/BirthdayPassportTemplate";
import { BirthdayCinemaTemplate } from "./birthday-cinema/BirthdayCinemaTemplate";
import { BirthdayFestivalTemplate } from "./birthday-festival/BirthdayFestivalTemplate";

export interface TemplateComponentProps {
  data: LetterContent;
  className?: string;
}

/**
 * Peta slug -> komponen render.
 *
 * Template adalah komponen React murni (tanpa state/hook), sehingga komponen
 * yang sama dipakai untuk preview, thumbnail, dan halaman publik. Database
 * hanya menyimpan identifier template + konten, tidak pernah HTML.
 */
const TEMPLATE_COMPONENTS: Record<string, ComponentType<TemplateComponentProps>> = {
  romantic: RomanticTemplate,
  "vintage-love": VintageLoveTemplate,
  "starlight-love": StarlightLoveTemplate,
  "love-mixtape": LoveMixtapeTemplate,
  "love-scrapbook": LoveScrapbookTemplate,
  "museum-of-us": MuseumOfUsTemplate,
  "secret-herbarium": SecretHerbariumTemplate,
  "parfum-damour": ParfumDamourTemplate,
  "ex-libris": ExLibrisTemplate,
  "tourbillon-love": TourbillonLoveTemplate,
  "cartography-love": CartographyLoveTemplate,
  "symphony-love": SymphonyLoveTemplate,
  "haute-joaillerie": HauteJoaillerieTemplate,
  birthday: BirthdayTemplate,
  "birthday-gazette": BirthdayGazetteTemplate,
  "celestial-birthday": CelestialBirthdayTemplate,
  "birthday-passport": BirthdayPassportTemplate,
  "birthday-cinema": BirthdayCinemaTemplate,
  "birthday-festival": BirthdayFestivalTemplate,
  graduation: GraduationTemplate,
  "grand-laureate": GrandLaureateTemplate,
  "summit-achievement": SummitAchievementTemplate,
  friendship: FriendshipTemplate,
  wedding: WeddingTemplate,
  "royal-garden-wedding": RoyalGardenWeddingTemplate,
  "heritage-wedding": HeritageWeddingTemplate,
  "amalfi-wedding": AmalfiWeddingTemplate,
  "chateau-wedding": ChateauWeddingTemplate,
  "art-exhibition": ArtExhibitionTemplate,
  "neon-bash": NeonBashTemplate,
  "gala-award": GalaAwardTemplate,
  apology: ApologyTemplate,
  "kintsugi-repair": KintsugiRepairTemplate,
  "safe-harbor": SafeHarborTemplate,
  "solstice-thaw": SolsticeThawTemplate,
};

export function hasTemplateComponent(slug: string): boolean {
  return Object.prototype.hasOwnProperty.call(TEMPLATE_COMPONENTS, slug);
}

export function TemplateRenderer({
  template,
  data,
  className,
}: {
  template: string;
  data: LetterContent;
  className?: string;
}) {
  const Template = TEMPLATE_COMPONENTS[template];

  if (!Template) {
    return (
      <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-line bg-paper text-sm text-ink-muted">
        Template &ldquo;{template}&rdquo; belum tersedia.
      </div>
    );
  }

  return <Template data={data} className={className} />;
}
