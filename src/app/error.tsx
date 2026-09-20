"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Detail teknis hanya dicatat di server log, tidak pernah ditampilkan ke user.
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-dvh items-center justify-center px-5 py-24">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl font-semibold text-ink">
          Ada yang gagal dimuat
        </h1>
        <p className="mt-3 leading-relaxed text-ink-soft">
          Coba muat ulang halaman ini. Kalau masih sama, tunggu sebentar lalu coba lagi.
        </p>
        <Button className="mt-8" onClick={reset}>
          Coba lagi
        </Button>
      </div>
    </main>
  );
}
