"use client";

import { useEffect, useRef, useState } from "react";
import { Button, type ButtonProps } from "./button";
import { Spinner } from "./spinner";

/**
 * Tombol dua langkah untuk aksi merusak.
 * Klik pertama meminta konfirmasi di tempat, klik kedua menjalankan aksi.
 */
export function ConfirmButton({
  onConfirm,
  children,
  confirmLabel = "Yakin hapus?",
  pending = false,
  ...props
}: {
  onConfirm: () => void;
  confirmLabel?: string;
  pending?: boolean;
} & Omit<ButtonProps, "onClick">) {
  const [armed, setArmed] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  return (
    <Button
      {...props}
      aria-live="polite"
      disabled={pending || props.disabled}
      onClick={() => {
        if (!armed) {
          setArmed(true);
          timer.current = setTimeout(() => setArmed(false), 4000);
          return;
        }
        if (timer.current) clearTimeout(timer.current);
        setArmed(false);
        onConfirm();
      }}
    >
      {pending ? <Spinner /> : null}
      {armed ? confirmLabel : children}
    </Button>
  );
}
