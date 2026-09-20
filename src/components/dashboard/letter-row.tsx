"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ExternalLink, Pencil, Trash2 } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";
import { ConfirmButton } from "@/components/ui/confirm-button";
import { CopyLinkButton } from "@/components/ui/copy-link-button";
import { formatDateShort } from "@/lib/utils/format";
import { deleteLetterAction } from "@/services/letters.actions";
import type { LetterSummary } from "@/types/letter";

export function LetterRow({ letter }: { letter: LetterSummary }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const onDelete = () => {
    setError(null);
    startTransition(async () => {
      const result = await deleteLetterAction(letter.id);
      if (!result.ok) {
        setError(result.error);
        return;
      }
      router.refresh();
    });
  };

  return (
    <article className="rounded-2xl border border-line bg-paper p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs text-ink-muted">{letter.templateName}</p>
          <h3 className="mt-1 truncate font-display text-lg font-semibold text-ink">
            {letter.title}
          </h3>
          <p className="mt-1 text-sm text-ink-soft">
            {letter.recipient ? `Untuk ${letter.recipient} · ` : ""}
            {formatDateShort(letter.createdAt)}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <CopyLinkButton url={letter.shareUrl} variant="outline" size="sm" label="Salin" />
          <Link
            href={`/letter/${letter.templateSlug}/${letter.publicToken}`}
            className={buttonStyles({ variant: "outline", size: "sm" })}
          >
            <ExternalLink className="h-4 w-4" aria-hidden />
            Buka
          </Link>
          <Link
            href={`/dashboard/letters/${letter.id}`}
            className={buttonStyles({ variant: "outline", size: "sm" })}
          >
            <Pencil className="h-4 w-4" aria-hidden />
            Ubah
          </Link>
          <ConfirmButton variant="danger" size="sm" pending={pending} onConfirm={onDelete}>
            <Trash2 className="h-4 w-4" aria-hidden />
            Hapus
          </ConfirmButton>
        </div>
      </div>

      {error ? (
        <p role="alert" className="mt-3 text-sm text-seal-600">
          {error}
        </p>
      ) : null}
    </article>
  );
}
