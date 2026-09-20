"use client";

import { useCallback, useEffect, useState } from "react";

/** Web Share API hanya tersedia di sebagian perangkat; dicek setelah mount agar hidrasi konsisten. */
export function useWebShare() {
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
  }, []);

  const share = useCallback(async (data: ShareData) => {
    try {
      await navigator.share(data);
      return true;
    } catch {
      return false;
    }
  }, []);

  return { canShare, share };
}
