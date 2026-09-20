"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { publicEnv } from "@/lib/env";
import { createClient } from "@/lib/supabase/client";

/** Opsional: hanya tampil bila provider Google sudah diaktifkan di Supabase. */
export function GoogleButton({ next }: { next: string }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!publicEnv.googleAuthEnabled) return null;

  const onClick = async () => {
    setPending(true);
    setError(null);
    const supabase = createClient();
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });

    if (oauthError) {
      setError("Masuk dengan Google sedang tidak tersedia.");
      setPending(false);
    }
  };

  return (
    <div className="space-y-3">
      <Button variant="outline" className="w-full" onClick={onClick} disabled={pending}>
        {pending ? <Spinner /> : null}
        Lanjut dengan Google
      </Button>
      {error ? (
        <p role="alert" className="text-sm text-seal-600">
          {error}
        </p>
      ) : null}
      <div className="flex items-center gap-3 text-xs text-ink-muted">
        <span className="h-px flex-1 bg-line" aria-hidden />
        atau pakai email
        <span className="h-px flex-1 bg-line" aria-hidden />
      </div>
    </div>
  );
}
