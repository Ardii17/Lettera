import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { buttonStyles } from "@/components/ui/button";
import { ShareActions } from "@/components/ui/share-actions";
import { LetterQrCard } from "@/components/ui/letter-qr-card";
import { headers } from "next/headers";
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

  const headerList = await headers();
  const host = headerList.get("x-forwarded-host") || headerList.get("host");
  const proto = headerList.get("x-forwarded-proto") || "https";
  const origin =
    host && !host.includes("lettera-ivory")
      ? `${proto}://${host}`
      : undefined;

  const shareUrl = buildShareUrl(templateSlug, token, origin);
  const letterPath = `/letter/${templateSlug}/${token}`;
  const recipient = recipientOf(template, letter.content);

  return (
    <Container className="py-12 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <p className="text-sm font-medium text-sage">Tersimpan</p>
        <h1 className="mt-3 font-display text-[2.2rem] leading-tight font-semibold tracking-tight text-ink sm:text-[2.8rem]">
          Suratmu siap dibagikan
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">
          {recipient
            ? `Kirim tautan ini ke ${recipient}. Hanya orang yang memegang tautannya yang bisa membuka surat.`
            : "Kirim tautan ini ke penerimanya. Hanya orang yang memegang tautannya yang bisa membuka surat."}
        </p>

        <div className="mt-8 rounded-2xl border border-line bg-paper p-5 shadow-2xs">
          <p className="text-sm text-ink-muted">Tautan surat</p>
          <p className="mt-2 break-all font-mono text-sm font-medium text-ink">{shareUrl}</p>
        </div>

        <div className="mt-6">
          <ShareActions url={shareUrl} letterPath={letterPath} recipient={recipient} />
        </div>

        <div className="mt-6">
          <LetterQrCard url={shareUrl} templateSlug={templateSlug} recipient={recipient} />
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
    </Container>
  );
}
