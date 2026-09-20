import { LetterSkeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <main className="min-h-dvh bg-page px-5 py-16">
      <LetterSkeleton />
    </main>
  );
}
