import { cn } from "@/lib/utils/cn";

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("skeleton rounded-xl", className)} aria-hidden />;
}

export function LetterSkeleton() {
  return (
    <div className="mx-auto w-full max-w-[38rem] space-y-5 rounded-[2rem] border border-line bg-paper p-10">
      <Skeleton className="mx-auto h-3 w-24" />
      <Skeleton className="mx-auto h-9 w-3/4" />
      <Skeleton className="mx-auto h-4 w-32" />
      <div className="space-y-3 pt-6">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-11/12" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}

export function CardGridSkeleton({ items = 4 }: { items?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: items }).map((_, index) => (
        <div key={index} className="space-y-4 rounded-2xl border border-line bg-paper p-4">
          <Skeleton className="aspect-4/5 w-full" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-3 w-3/4" />
        </div>
      ))}
    </div>
  );
}
