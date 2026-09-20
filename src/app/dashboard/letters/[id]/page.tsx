import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LetterBuilder } from "@/components/letter-builder/letter-builder";
import { CopyLinkButton } from "@/components/ui/copy-link-button";
import { formatDateShort } from "@/lib/utils/format";
import { getLetterForEdit } from "@/services/letters.service";

export const metadata: Metadata = {
  title: "Ubah surat",
  robots: { index: false, follow: false },
};

export default async function EditLetterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  // RLS memastikan surat milik user lain tidak pernah terambil di sini.
  const letter = await getLetterForEdit(id);
  if (!letter) notFound();

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Link
            href="/dashboard/letters"
            className="text-sm text-ink-muted transition-colors hover:text-ink"
          >
            Semua surat
          </Link>
          <h1 className="mt-2 font-display text-[1.9rem] leading-tight font-semibold tracking-tight text-ink">
            {letter.title}
          </h1>
          <p className="mt-2 text-sm text-ink-soft">
            Dibuat {formatDateShort(letter.createdAt)} · Tautannya tetap sama setelah diubah.
          </p>
        </div>
        <CopyLinkButton url={letter.shareUrl} variant="outline" size="sm" />
      </header>

      <LetterBuilder
        template={letter.template}
        isAuthenticated
        mode="edit"
        letterId={letter.id}
        initialContent={letter.content}
      />
    </div>
  );
}
