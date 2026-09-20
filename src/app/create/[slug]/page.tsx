import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { LetterBuilder } from "@/components/letter-builder/letter-builder";
import { getAvailableTemplate } from "@/services/templates.service";
import { getTemplate } from "@/templates/registry";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const template = getTemplate(slug);

  return {
    title: template ? `Tulis ${template.name}` : "Tulis surat",
    description: template?.description,
    robots: { index: false, follow: false },
  };
}

export default async function CreateLetterPage({ params }: PageProps) {
  const { slug } = await params;
  const template = await getAvailableTemplate(slug);

  if (!template) notFound();

  return (
    <Container className="py-8 sm:py-12">
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-[1.9rem] leading-tight font-semibold tracking-tight text-ink sm:text-[2.3rem]">
            Tulis suratmu
          </h1>
          <p className="mt-2 text-ink-soft">
            Isi form di kiri, lihat hasilnya di kanan. Semua bisa diubah sebelum dikirim.
          </p>
        </div>
        <Link
          href={`/templates/${template.slug}`}
          className="text-sm text-ink-muted transition-colors hover:text-ink"
        >
          Detail template
        </Link>
      </header>

      <LetterBuilder template={template} />
    </Container>
  );
}
