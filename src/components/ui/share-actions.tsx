"use client";

import Link from "next/link";
import { ExternalLink, Share2 } from "lucide-react";
import { Button, buttonStyles } from "./button";
import { CopyLinkButton } from "./copy-link-button";
import { useWebShare } from "@/hooks/use-web-share";

export function ShareActions({
  url,
  letterPath,
  recipient,
}: {
  url: string;
  letterPath: string;
  recipient?: string;
}) {
  const { canShare, share } = useWebShare();

  return (
    <div className="flex flex-wrap gap-3">
      <CopyLinkButton url={url} />
      <Link href={letterPath} className={buttonStyles({ variant: "outline" })}>
        <ExternalLink className="h-4 w-4" aria-hidden />
        Buka surat
      </Link>
      {canShare ? (
        <Button
          variant="outline"
          onClick={() =>
            share({
              title: recipient ? `Surat untuk ${recipient}` : "Sebuah surat untukmu",
              text: "Aku menulis sesuatu untukmu.",
              url,
            })
          }
        >
          <Share2 className="h-4 w-4" aria-hidden />
          Bagikan
        </Button>
      ) : null}
    </div>
  );
}
