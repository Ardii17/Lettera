"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function LetterError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-dvh items-center justify-center bg-page px-5 py-20">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl font-semibold text-ink">Surat gagal dimuat</h1>
        <p className="mt-3 leading-relaxed text-ink-soft">
          Koneksi ke server sedang bermasalah. Coba muat ulang sebentar lagi.
        </p>
        <Button className="mt-8" onClick={reset}>
          Coba lagi
        </Button>
      </div>
    </main>
  );
}
