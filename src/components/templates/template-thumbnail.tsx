import { cn } from "@/lib/utils/cn";
import { TemplateRenderer } from "@/templates/renderer";
import type { TemplateMeta } from "@/templates/types";

/**
 * Pratinjau kecil yang memakai komponen template asli (bukan gambar statis),
 * diskalakan mengikuti lebar container lewat CSS container query — tanpa JS.
 */
export function TemplateThumbnail({
  template,
  className,
  ratio = "aspect-4/5",
}: {
  template: TemplateMeta;
  className?: string;
  ratio?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn("thumb-frame relative overflow-hidden rounded-xl bg-page-deep", ratio, className)}
    >
      <div className="thumb-canvas absolute top-0 left-0">
        <TemplateRenderer template={template.slug} data={template.sample} />
      </div>
    </div>
  );
}
