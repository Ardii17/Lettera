import { Container } from "@/components/ui/container";
import { CardGridSkeleton, Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <Container className="py-14 sm:py-20">
      <Skeleton className="h-10 w-48" />
      <Skeleton className="mt-4 h-5 w-full max-w-xl" />
      <div className="mt-12">
        <CardGridSkeleton items={6} />
      </div>
    </Container>
  );
}
