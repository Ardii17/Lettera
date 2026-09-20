import type { ComponentType } from "react";
import type { LetterContent } from "@/types/letter";
import { BirthdayTemplate } from "./birthday/BirthdayTemplate";
import { FriendshipTemplate } from "./friendship/FriendshipTemplate";
import { GraduationTemplate } from "./graduation/GraduationTemplate";
import { RomanticTemplate } from "./romantic/RomanticTemplate";

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
  birthday: BirthdayTemplate,
  graduation: GraduationTemplate,
  friendship: FriendshipTemplate,
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
      <div className="flex min-h-64 w-full items-center justify-center bg-page px-6 py-16 text-center">
        <p className="max-w-sm text-ink-soft">
          Template ini belum tersedia. Pilih template lain untuk melanjutkan.
        </p>
      </div>
    );
  }

  return <Template data={data} className={className} />;
}
