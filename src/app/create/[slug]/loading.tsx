import { Container } from "@/components/ui/container";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Container className="py-8 sm:py-12">
      <Skeleton className="h-9 w-56" />
      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="space-y-5 rounded-2xl border border-line bg-paper p-6">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-3.5 w-28" />
              <Skeleton className="h-12 w-full" />
            </div>
          ))}
        </div>
        <Skeleton className="h-[32rem] w-full rounded-2xl" />
      </div>
    </Container>
  );
}
