import Link from "next/link";
import { buttonStyles } from "@/components/ui/button";
import { Badge } from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";
import type { TemplateMeta } from "@/templates/types";
import { TemplateThumbnail } from "./template-thumbnail";

export function TemplateCard({ template }: { template: TemplateMeta }) {
  return (
    <article className="group flex flex-col rounded-2xl border border-line bg-paper p-4 transition-colors hover:border-line-strong">
      <div className="relative overflow-hidden rounded-xl">
        <TemplateThumbnail template={template} />
        <Link
          href={`/templates/${template.slug}`}
          className="absolute inset-0 z-10"
          aria-label={`Lihat detail ${template.name}`}
        />
      </div>

      <div className="flex flex-1 flex-col px-1 pt-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-semibold text-ink">
            <Link href={`/templates/${template.slug}`} className="hover:text-seal-600">
              {template.name}
            </Link>
          </h3>
          <Badge className={cn(template.cardAccent)}>{template.category}</Badge>
        </div>

        <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-soft">{template.tagline}</p>

        <div className="mt-5 flex items-center gap-3">
          <Link href={`/create/${template.slug}`} className={buttonStyles({ size: "sm" })}>
            Gunakan template
          </Link>
          <Link
            href={`/templates/${template.slug}`}
            className="text-sm text-ink-muted transition-colors hover:text-ink"
          >
            Detail
          </Link>
        </div>
      </div>
    </article>
  );
}
