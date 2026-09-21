"use client";

import { useEffect } from "react";
import { AlertTriangle, ArrowLeft, CheckCircle2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { TemplateRenderer } from "@/templates/renderer";
import type { LetterContent } from "@/types/letter";

interface FinalPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  templateSlug: string;
  templateName: string;
  data: LetterContent;
  isPending: boolean;
  mode?: "create" | "edit";
}

export function FinalPreviewModal({
  isOpen,
  onClose,
  onConfirm,
  templateSlug,
  templateName,
  data,
  isPending,
  mode = "create",
}: FinalPreviewModalProps) {
  // Lock background scroll while modal is open
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && !isPending) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isPending, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="preview-modal-title"
      className="fixed inset-0 z-50 flex flex-col bg-page overflow-y-auto animate-in fade-in duration-200"
    >
      {/* ================= STICKY TOP CONFIRMATION BAR (DESKTOP / TABLET ONLY) ================= */}
      <header className="hidden sm:block sticky top-0 z-50 border-b border-line bg-white/95 px-4 py-3 shadow-md backdrop-blur-md dark:bg-neutral-900/95 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          
          {/* Warning disclaimer info */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span id="preview-modal-title" className="text-sm font-bold text-ink">
                  Pratinjau Final: {templateName}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
                  <Lock className="h-3 w-3" />
                  Ketetapan Data
                </span>
              </div>
              <p className="text-xs text-ink-muted">
                Periksa kembali foto, nama, & teks. Setelah pembayaran QRIS diverifikasi, surat langsung diterbitkan.
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onClose}
              disabled={isPending}
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali Edit Data
            </Button>

            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={onConfirm}
              disabled={isPending}
              className="bg-seal-600 hover:bg-seal-700 text-white shadow-sm"
            >
              {isPending ? <Spinner className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
              {mode === "create" ? "Lanjut ke Pembayaran QRIS" : "Simpan Perubahan"}
            </Button>
          </div>

        </div>
      </header>

      {/* ================= FULL TEMPLATE RENDER CONTAINER ================= */}
      <main className="flex-1 w-full">
        <TemplateRenderer
          template={templateSlug}
          data={{ ...data, _isFullPreview: "true" }}
          className="is-full-preview"
        />
      </main>

      {/* ================= BOTTOM CONFIRMATION FLOATING BAR (MOBILE FRIENDLY) ================= */}
      <footer className="sticky bottom-0 z-40 border-t border-line bg-white/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-lg backdrop-blur-md dark:bg-neutral-900/95 sm:hidden">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            disabled={isPending}
            className="flex-1"
          >
            <ArrowLeft className="h-4 w-4" />
            Edit
          </Button>

          <Button
            type="button"
            variant="primary"
            size="sm"
            onClick={onConfirm}
            disabled={isPending}
            className="flex-2 bg-seal-600 text-white"
          >
            {isPending ? <Spinner className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
            {mode === "create" ? "Bayar QRIS" : "Simpan"}
          </Button>
        </div>
      </footer>
    </div>
  );
}
