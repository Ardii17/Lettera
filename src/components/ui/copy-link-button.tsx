"use client";

import { Check, Link2 } from "lucide-react";
import { Button, type ButtonProps } from "./button";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

export function CopyLinkButton({
  url,
  label = "Salin tautan",
  copiedLabel = "Tautan tersalin",
  ...props
}: { url: string; label?: string; copiedLabel?: string } & Omit<ButtonProps, "onClick" | "children">) {
  const { copied, copy } = useCopyToClipboard();

  return (
    <Button onClick={() => copy(url)} {...props}>
      {copied ? <Check className="h-4 w-4" aria-hidden /> : <Link2 className="h-4 w-4" aria-hidden />}
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </Button>
  );
}
