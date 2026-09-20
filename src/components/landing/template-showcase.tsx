import Link from "next/link";
import { Container } from "@/components/ui/container";
import { TemplateGrid } from "@/components/templates/template-grid";
import type { TemplateMeta } from "@/templates/types";

export function TemplateShowcase({ templates }: { templates: TemplateMeta[] }) {
  return (
    <section id="template" className="py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Pilih yang paling terdengar seperti kamu
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              Setiap template punya form dan tampilannya sendiri. Kamu tinggal mengisi.
            </p>
          </div>
          <Link
            href="/templates"
            className="text-[0.95rem] font-medium text-seal-600 transition-colors hover:text-seal-700"
          >
            Lihat semua template
          </Link>
        </div>

        <div className="mt-12">
          <TemplateGrid templates={templates} />
        </div>
      </Container>
    </section>
  );
}
