"use client";

import { cn } from "@/lib/utils/cn";
import { TemplateRenderer } from "@/templates/renderer";
import type { LetterContent } from "@/types/letter";

/**
 * Preview memakai komponen template yang sama persis dengan halaman publik,
 * sehingga tidak ada perbedaan antara yang dilihat penulis dan penerima.
 */
export function PreviewPanel({
  template,
  data,
  className,
}: {
  template: string;
  data: LetterContent;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-line bg-paper shadow-lift",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <p className="text-sm font-medium text-ink">Pratinjau</p>
        <p className="text-xs text-ink-muted">Persis seperti yang akan dilihat penerima</p>
      </div>
      <div className="max-h-[70vh] overflow-y-auto overscroll-contain">
        <TemplateRenderer template={template} data={data} />
      </div>
    </div>
  );
}
