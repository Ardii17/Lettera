import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonStyles } from "@/components/ui/button";
import { Badge } from "@/components/ui/card";
import { TemplateRenderer } from "@/templates/renderer";
import { getTemplate, listTemplates } from "@/templates/registry";
import { getAvailableTemplate } from "@/services/templates.service";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return listTemplates().map((template) => ({ slug: template.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const template = getTemplate(slug);
  if (!template) return { title: "Template tidak ditemukan" };

  return {
    title: template.name,
    description: template.description,
    alternates: { canonical: `/templates/${template.slug}` },
    openGraph: {
      title: `${template.name} · Template surat digital`,
      description: template.description,
      url: `/templates/${template.slug}`,
    },
  };
}

export default async function TemplateDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const template = await getAvailableTemplate(slug);
  if (!template) notFound();

  const others = listTemplates().filter((item) => item.slug !== template.slug);

  return (
    <Container className="py-12 sm:py-16">
      <nav aria-label="Remah roti" className="text-sm text-ink-muted">
        <Link href="/templates" className="transition-colors hover:text-ink">
          Template
        </Link>
        <span className="px-2">/</span>
        <span className="text-ink-soft">{template.name}</span>
      </nav>

      <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <div>
          <Badge className={template.cardAccent}>{template.category}</Badge>
          <h1 className="mt-4 font-display text-[2.2rem] leading-tight font-semibold tracking-tight text-ink sm:text-[2.8rem]">
            {template.name}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{template.description}</p>

          <ul className="mt-8 space-y-3">
            {template.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3 text-[0.95rem] text-ink-soft">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-seal-500" aria-hidden />
                {highlight}
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap gap-3">
            <Link href={`/create/${template.slug}`} className={buttonStyles({ size: "lg" })}>
              Gunakan template
            </Link>
            <Link href="/templates" className={buttonStyles({ variant: "outline", size: "lg" })}>
              Lihat template lain
            </Link>
          </div>

          <div className="mt-10 rounded-2xl border border-line bg-paper p-5">
            <h2 className="text-sm font-semibold text-ink">Yang perlu kamu isi</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {template.fields.map((field) => (
                <li
                  key={field.name}
                  className="rounded-full bg-page-deep px-3 py-1 text-xs text-ink-soft"
                >
                  {field.label}
                  {field.required ? " *" : ""}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="overflow-hidden sticky top-20 rounded-2xl border border-line bg-paper shadow-lift">
          <div className="flex items-center justify-between border-b border-line px-4 py-3">
            <p className="text-sm font-medium text-ink">Pratinjau isi contoh</p>
            <p className="text-xs text-ink-muted">Bisa digulir</p>
          </div>
          <div className="max-h-[36rem] overflow-y-auto">
            <TemplateRenderer template={template.slug} data={template.sample} />
          </div>
        </div>
      </div>

      <section className="mt-20">
        <h2 className="font-display text-2xl font-semibold text-ink">Template lainnya</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {others.map((item) => (
            <Link
              key={item.slug}
              href={`/templates/${item.slug}`}
              className="rounded-2xl border border-line bg-paper p-5 transition-colors hover:border-line-strong"
            >
              <p className="font-display text-lg font-semibold text-ink">{item.name}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.tagline}</p>
            </Link>
          ))}
        </div>
      </section>
    </Container>
  );
}
