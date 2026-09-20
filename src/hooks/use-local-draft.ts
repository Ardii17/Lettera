"use client";

import { useCallback } from "react";

/**
 * Draft sementara di localStorage.
 *
 * Dipakai builder supaya isian tidak hilang saat refresh atau saat user
 * diarahkan ke halaman login di tengah proses menulis.
 */
export function useLocalDraft<T>(key: string) {
  const load = useCallback((): T | null => {
    if (typeof window === "undefined") return null;
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch {
      return null;
    }
  }, [key]);

  const save = useCallback(
    (value: T) => {
      if (typeof window === "undefined") return;
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch {
        // Kuota penuh atau storage diblokir: draft memang bersifat best-effort.
      }
    },
    [key],
  );

  const clear = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.removeItem(key);
    } catch {
      // diabaikan
    }
  }, [key]);

  return { load, save, clear };
}
