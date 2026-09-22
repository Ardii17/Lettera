"use client";

import { useState } from "react";
import { Copy, Check, MessageSquareText } from "lucide-react";

export function ContactFormatCopy() {
  const [copied, setCopied] = useState(false);

  const reportTemplate = `Halo Admin Lettera, saya ingin mengajukan pengaduan/kendala terkait pembuatan surat digital:

- Nama Pengirim: [Tulis Nama Kamu]
- Nama Penerima: [Tulis Nama Penerima]
- Template yang Dipakai: [Misal: Romantic Letter / Birthday]
- Tautan Surat (jika ada): [Tempel link surat]
- Kendala yang Ditemukan: [Jelaskan masalah, misal: Pembayaran QRIS belum otomatis diverifikasi / Foto tidak muncul]

Terima kasih, mohon bantuannya Admin Lettera.`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(reportTemplate);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback if clipboard API is restricted
    }
  };

  return (
    <div className="rounded-3xl border border-line bg-paper p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-line pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-seal-100 text-seal-700">
            <MessageSquareText className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-display text-lg font-bold text-ink">
              Format Pesan Pengaduan Cepat
            </h3>
            <p className="text-xs text-ink-muted">
              Salin format ini lalu tempelkan di chat WhatsApp atau DM TikTok agar admin bisa langsung memproses kendalamu.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all shrink-0 ${
            copied
              ? "bg-emerald-600 text-white"
              : "bg-seal-100 text-seal-800 hover:bg-seal-200"
          }`}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              <span>Berhasil Disalin!</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4" />
              <span>Salin Format Laporan</span>
            </>
          )}
        </button>
      </div>

      <pre className="mt-4 overflow-x-auto rounded-2xl border border-line/70 bg-page/70 p-4 font-mono text-xs leading-relaxed text-ink-soft select-all">
        {reportTemplate}
      </pre>
    </div>
  );
}
