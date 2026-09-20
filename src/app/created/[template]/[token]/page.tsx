import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { buttonStyles } from "@/components/ui/button";
import { ShareActions } from "@/components/ui/share-actions";
import { TemplateThumbnail } from "@/components/templates/template-thumbnail";
import { recipientOf } from "@/lib/validations/letter-content";
import { buildShareUrl, getPublicLetter } from "@/services/letters.service";
import { getTemplate } from "@/templates/registry";

export const metadata: Metadata = {
  title: "Suratmu siap dibagikan",
  robots: { index: false, follow: false },
};

export default async function LetterCreatedPage({
  params,
}: {
  params: Promise<{ template: string; token: string }>;
}) {
  const { template: templateSlug, token } = await params;
  const template = getTemplate(templateSlug);
  const letter = await getPublicLetter(token);

  if (!template || !letter || letter.templateSlug !== templateSlug) notFound();

  const shareUrl = buildShareUrl(templateSlug, token);
  const letterPath = `/letter/${templateSlug}/${token}`;
  const recipient = recipientOf(template, letter.content);

  return (
    <Container className="py-14 sm:py-20">
      <div className="grid items-start gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="text-sm font-medium text-sage">Tersimpan</p>
          <h1 className="mt-3 font-display text-[2.2rem] leading-tight font-semibold tracking-tight text-ink sm:text-[2.8rem]">
            Suratmu siap dibagikan
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            {recipient
              ? `Kirim tautan ini ke ${recipient}. Hanya orang yang memegang tautannya yang bisa membuka surat.`
              : "Kirim tautan ini ke penerimanya. Hanya orang yang memegang tautannya yang bisa membuka surat."}
          </p>

          <div className="mt-8 rounded-2xl border border-line bg-paper p-5">
            <p className="text-sm text-ink-muted">Tautan surat</p>
            <p className="mt-2 break-all font-mono text-sm text-ink">{shareUrl}</p>
          </div>

          <div className="mt-6">
            <ShareActions url={shareUrl} letterPath={letterPath} recipient={recipient} />
          </div>

          <div className="mt-10 flex flex-wrap gap-3 border-t border-line pt-8">
            <Link href="/templates" className={buttonStyles({ variant: "outline" })}>
              Tulis surat lagi
            </Link>
            <Link href={letterPath} className={buttonStyles({ variant: "primary", className: "bg-seal-600 text-white" })}>
              Buka Surat
            </Link>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl">
          <TemplateThumbnail
            template={{ ...template, sample: letter.content }}
            ratio="aspect-10/11"
            className="border border-line shadow-paper"
          />
          <Link
            href={letterPath}
            className="absolute inset-0 z-10"
            aria-label="Lihat surat"
          />
        </div>
      </div>
    </Container>
  );
}
