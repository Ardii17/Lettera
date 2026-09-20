import Link from "next/link";
import type { ReactNode } from "react";
import { buttonStyles } from "./button";
import { cn } from "@/lib/utils/cn";

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
  icon,
  className,
}: {
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center rounded-2xl border border-dashed border-line-strong bg-paper px-6 py-14 text-center",
        className,
      )}
    >
      {icon ? <div className="mb-5 text-ink-muted">{icon}</div> : null}
      <h3 className="font-display text-xl font-semibold text-ink">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-soft">{description}</p>
      {actionHref && actionLabel ? (
        <Link href={actionHref} className={buttonStyles({ className: "mt-6" })}>
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}

export function ErrorNotice({
  title = "Ada yang tidak berjalan",
  description,
  children,
}: {
  title?: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div role="alert" className="rounded-2xl border border-seal-200 bg-seal-50 px-5 py-4">
      <p className="text-sm font-semibold text-seal-700">{title}</p>
      <p className="mt-1 text-sm leading-relaxed text-seal-600">{description}</p>
      {children ? <div className="mt-4">{children}</div> : null}
    </div>
  );
}
