"use client";

import { useRef, useState } from "react";
import imageCompression from "browser-image-compression";
import {
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Trash2,
  Sparkles,
} from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils/cn";

interface ImageUploadFieldProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  helperText?: string;
  className?: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(0)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

export function ImageUploadField({
  value,
  onChange,
  label,
  helperText,
  className,
}: ImageUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [status, setStatus] = useState<"idle" | "compressing" | "uploading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [compressionStats, setCompressionStats] = useState<{
    originalSize: string;
    compressedSize: string;
  } | null>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset status & error
    setErrorMessage(null);
    setCompressionStats(null);

    // Validasi tipe file
    if (!file.type.startsWith("image/")) {
      setStatus("error");
      setErrorMessage("File harus berupa gambar (JPG, PNG, atau WebP).");
      return;
    }

    try {
      // 1. Kompresi gambar di browser
      setStatus("compressing");
      const originalSizeFormatted = formatBytes(file.size);

      const compressionOptions = {
        maxSizeMB: 1, // Maksimal 1MB
        maxWidthOrHeight: 1920, // Full HD maksimal lebar/tinggi, sangat tajam
        useWebWorker: true,
        initialQuality: 0.85, // Kualitas visual dipertahankan tinggi
      };

      const compressedFile = await imageCompression(file, compressionOptions);
      const compressedSizeFormatted = formatBytes(compressedFile.size);

      setCompressionStats({
        originalSize: originalSizeFormatted,
        compressedSize: compressedSizeFormatted,
      });

      // 2. Unggah file hasil kompresi ke Supabase Storage via backend route
      setStatus("uploading");
      const formData = new FormData();
      formData.append("file", compressedFile, compressedFile.name || "photo.jpg");

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Gagal mengunggah foto ke storage.");
      }

      // Berhasil, simpan URL publik ke state form
      onChange(result.url);
      setStatus("idle");
    } catch (err: unknown) {
      console.error("[ImageUploadField] Upload error:", err);
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Terjadi kesalahan saat memproses foto.",
      );
    } finally {
      // Reset input agar bisa memilih file yang sama jika diinginkan
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const isBusy = status === "compressing" || status === "uploading";

  return (
    <div className={cn("space-y-2", className)}>
      {label && <label className="block text-xs font-bold uppercase tracking-wider text-seal-700">{label}</label>}

      {/* Hidden native file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        disabled={isBusy}
        className="hidden"
      />

      {/* Case 1: Foto sudah ada (terunggah) */}
      {value ? (
        <div className="relative rounded-2xl border border-seal-200/80 bg-white p-3 shadow-xs transition-all overflow-hidden">
          {/* Loading overlay saat user mengganti foto */}
          {isBusy && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/90 backdrop-blur-xs gap-2 p-3 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-seal-100">
                <Spinner className="h-5 w-5 text-seal-700" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-seal-900">
                  {status === "compressing"
                    ? "Sedang mengompres foto..."
                    : "Sedang mengunggah foto..."}
                </p>
                <p className="text-[11px] text-seal-700 font-medium">
                  {status === "compressing"
                    ? "Menjaga resolusi foto tetap tajam & jernih..."
                    : "Proses upload sedang berjalan, mohon tunggu sebentar..."}
                </p>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-3.5">
            {/* Thumbnail preview */}
            <div className="relative h-20 w-24 sm:h-16 sm:w-20 shrink-0 overflow-hidden rounded-xl border border-line bg-neutral-100 shadow-inner">
              <img
                src={value}
                alt="Uploaded preview"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Info and Actions */}
            <div className="min-w-0 flex-1 w-full overflow-hidden">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                <span className="truncate">Foto berhasil diunggah</span>
              </div>

              {compressionStats && (
                <p className="mt-1 flex flex-wrap items-center gap-1 text-[11px] text-seal-700 font-medium">
                  <Sparkles className="h-3 w-3 shrink-0 text-amber-500" />
                  <span className="break-all">
                    Dikompres: {compressionStats.originalSize} ➔ {compressionStats.compressedSize}
                  </span>
                </p>
              )}

              <p className="truncate text-[11px] text-ink-muted mt-0.5">{value}</p>

              {/* Action buttons */}
              <div className="mt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isBusy}
                  className="inline-flex items-center gap-1 text-xs font-medium text-seal-700 hover:text-seal-900 transition-colors disabled:opacity-50"
                >
                  <RefreshCw className="h-3 w-3 shrink-0" />
                  Ganti Foto
                </button>
                <span className="text-line-strong">•</span>
                <button
                  type="button"
                  onClick={() => {
                    onChange("");
                    setCompressionStats(null);
                  }}
                  disabled={isBusy}
                  className="inline-flex items-center gap-1 text-xs font-medium text-rose-600 hover:text-rose-800 transition-colors disabled:opacity-50"
                >
                  <Trash2 className="h-3 w-3 shrink-0" />
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Case 2: Belum ada foto - Dropzone / Upload button */
        <div
          onClick={() => !isBusy && fileInputRef.current?.click()}
          className={cn(
            "group relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-4 sm:p-5 text-center transition-all overflow-hidden",
            isBusy
              ? "border-seal-400 bg-seal-50/70 cursor-wait ring-2 ring-seal-200"
              : "border-seal-200/80 bg-[#fdf8f9] hover:border-seal-400 hover:bg-[#fbf0f2]",
          )}
        >
          {isBusy ? (
            <div className="flex flex-col items-center gap-2.5 py-3 px-2 text-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-seal-100/90 shadow-xs">
                <Spinner className="h-6 w-6 text-seal-700" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-seal-900 break-words">
                  {status === "compressing"
                    ? "Sedang mengompres foto..."
                    : "Sedang mengunggah foto..."}
                </p>
                <p className="text-[11px] text-seal-700 font-medium">
                  {status === "compressing"
                    ? "Menjaga kualitas tetap jernih & resolusi tajam..."
                    : "Proses upload sedang berjalan, mohon tunggu sebentar..."}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 py-1 px-2 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-seal-100 text-seal-700 transition-transform group-hover:scale-110">
                <UploadCloud className="h-5 w-5 shrink-0" />
              </div>
              <div className="w-full">
                <p className="text-xs font-bold text-seal-800 group-hover:text-seal-900 break-words">
                  Klik untuk pilih foto dari galeri / perangkat
                </p>
                <p className="mt-0.5 text-[11px] text-ink-soft break-words">
                  Format JPG, PNG, atau WebP. Otomatis dikompresi cerdas tanpa mengurangi kualitas.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Error message notice */}
      {errorMessage && (
        <div className="flex items-center gap-1.5 text-xs text-rose-600">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {helperText && !errorMessage && !value && (
        <p className="text-[11px] text-ink-muted">{helperText}</p>
      )}
    </div>
  );
}
