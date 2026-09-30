"use client";

import { useRef, useState } from "react";
import {
  UploadCloud,
  CheckCircle2,
  AlertCircle,
  Play,
  Pause,
  Trash2,
  Music,
  RefreshCw,
  Volume2,
} from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils/cn";

interface AudioUploadFieldProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  helperText?: string;
  className?: string;
  id?: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(0)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

export function AudioUploadField({
  value,
  onChange,
  label,
  helperText,
  className,
  id,
}: AudioUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const audioPreviewRef = useRef<HTMLAudioElement | null>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [fileSizeInfo, setFileSizeInfo] = useState<string | null>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMessage(null);
    setFileSizeInfo(formatBytes(file.size));

    // Validasi ekstensi/tipe file
    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    const isAudio =
      file.type.startsWith("audio/") ||
      ["mp3", "wav", "m4a", "ogg", "aac", "webm", "flac"].includes(ext);

    if (!isAudio) {
      setStatus("error");
      setErrorMessage("File harus berupa audio musik (.mp3, .wav, .m4a, atau .ogg).");
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      setStatus("error");
      setErrorMessage("Ukuran file audio melebihi batas maksimal (25MB).");
      return;
    }

    try {
      setStatus("uploading");
      const formData = new FormData();
      formData.append("file", file, file.name);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.error || "Gagal mengunggah file musik.");
      }

      onChange(result.url);
      setStatus("idle");
      setIsPlaying(false);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Terjadi kesalahan saat mengunggah audio.";
      setStatus("error");
      setErrorMessage(message);
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleTogglePlay = () => {
    if (!audioPreviewRef.current) return;
    if (isPlaying) {
      audioPreviewRef.current.pause();
      setIsPlaying(false);
    } else {
      audioPreviewRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  const handleRemove = () => {
    if (audioPreviewRef.current) {
      audioPreviewRef.current.pause();
    }
    setIsPlaying(false);
    onChange("");
    setErrorMessage(null);
  };

  const hasValue = Boolean(value && value.trim().length > 0);

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-stone-800">
          {label}
        </label>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*,.mp3,.wav,.m4a,.ogg,.aac"
        onChange={handleFileSelect}
        className="hidden"
        id={id}
      />

      {/* Audio Player Elemen Tersembunyi untuk Preview */}
      {hasValue && (
        <audio
          ref={audioPreviewRef}
          src={value}
          onEnded={() => setIsPlaying(false)}
          onError={() => setIsPlaying(false)}
          preload="none"
        />
      )}

      {/* JIKA SUDAH ADA AUDIO: TAMPILKAN KARTU PREVIEW AUDIO */}
      {hasValue ? (
        <div className="rounded-2xl border-2 border-stone-200 bg-gradient-to-r from-stone-50 to-white p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              {/* Tombol Play/Pause Preview */}
              <button
                type="button"
                onClick={handleTogglePlay}
                className={cn(
                  "flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white shadow-md transition-all hover:scale-105 active:scale-95",
                  isPlaying ? "bg-amber-600 animate-pulse" : "bg-rose-700 hover:bg-rose-800",
                )}
                title={isPlaying ? "Jeda pratinjau" : "Putar pratinjau lagu"}
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
              </button>

              <div className="min-w-0 space-y-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-stone-800 truncate">
                    {isPlaying ? "Sedang Memutar Pratinjau..." : "Musik Latar Siap Diputar"}
                  </span>
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                </div>
                <p className="text-[11px] text-stone-500 truncate font-mono">
                  {fileSizeInfo ? `Ukuran: ${fileSizeInfo} • ` : ""}
                  Tersimpan di media server
                </p>
              </div>
            </div>

            {/* Tombol Aksi: Ganti & Hapus */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={status === "uploading"}
                className="inline-flex items-center gap-1 rounded-lg border border-stone-300 bg-white px-2.5 py-1.5 text-xs font-medium text-stone-700 shadow-2xs hover:bg-stone-50 transition-colors"
                title="Ganti dengan file audio lain"
              >
                <RefreshCw className="h-3.5 w-3.5 text-stone-500" />
                <span className="hidden sm:inline">Ganti Lagu</span>
              </button>

              <button
                type="button"
                onClick={handleRemove}
                disabled={status === "uploading"}
                className="inline-flex items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1.5 text-xs font-medium text-rose-700 hover:bg-rose-100 transition-colors"
                title="Hapus musik ini"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Hapus</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-stone-600 bg-amber-50/80 rounded-lg px-2.5 py-1 border border-amber-200/60">
            <Volume2 className="h-3.5 w-3.5 text-amber-700 shrink-0" />
            <span>
              Musik ini akan otomatis dapat diputar saat penerima membuka surat.
            </span>
          </div>
        </div>
      ) : (
        /* JIKA BELUM ADA AUDIO: TAMPILKAN DROPZONE UNGGAH AUDIO */
        <div
          onClick={() => status !== "uploading" && fileInputRef.current?.click()}
          className={cn(
            "group relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-6 text-center transition-all cursor-pointer",
            status === "uploading"
              ? "border-rose-400 bg-rose-50/30 cursor-wait"
              : status === "error"
                ? "border-rose-400 bg-rose-50/40 hover:border-rose-500"
                : "border-stone-300 bg-stone-50/50 hover:border-rose-400 hover:bg-rose-50/20",
          )}
        >
          {status === "uploading" ? (
            <div className="flex flex-col items-center space-y-2 py-2">
              <Spinner className="h-8 w-8 text-rose-700 animate-spin" />
              <p className="text-xs font-semibold text-rose-900">
                Sedang mengunggah audio ke media server...
              </p>
              <p className="text-[11px] text-rose-700">Mohon tunggu beberapa saat</p>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2 py-1">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100/80 text-rose-800 transition-transform group-hover:scale-110">
                <Music className="h-6 w-6" />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs sm:text-sm font-semibold text-stone-800 group-hover:text-rose-900 transition-colors">
                  Klik untuk Memilih File Musik dari Perangkat
                </p>
                <p className="text-[11px] text-stone-500">
                  Mendukung format MP3, WAV, atau M4A (Maksimal 25MB)
                </p>
              </div>
              <div className="inline-flex items-center gap-1 rounded-full bg-stone-200/60 px-3 py-0.5 text-[10px] font-medium text-stone-600">
                <UploadCloud className="h-3 w-3" />
                <span>Unggah dari Galeri / Dokumen Anda</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Error Message */}
      {status === "error" && errorMessage && (
        <div className="flex items-center gap-1.5 text-xs text-rose-700 pt-1">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Helper text */}
      {helperText && status !== "error" && (
        <p className="text-xs text-stone-500 leading-relaxed">{helperText}</p>
      )}
    </div>
  );
}
