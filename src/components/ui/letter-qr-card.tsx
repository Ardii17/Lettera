"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import QRCode from "qrcode";
import { Download, QrCode, Sparkles } from "lucide-react";
import { Button } from "./button";

interface LetterQrCardProps {
  url: string;
  templateSlug: string;
  recipient?: string;
}

export function LetterQrCard({ url, templateSlug, recipient }: LetterQrCardProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");

  useEffect(() => {
    let isMounted = true;

    QRCode.toDataURL(url, {
      width: 640,
      margin: 2,
      color: {
        dark: "#4A3527", // Warna Dark Brown Lettera
        light: "#ffffff",
      },
      errorCorrectionLevel: "H",
    })
      .then((dataUrl) => {
        if (isMounted) setQrDataUrl(dataUrl);
      })
      .catch((err) => {
        console.error("Gagal membuat QR Code:", err);
      });

    return () => {
      isMounted = false;
    };
  }, [url]);

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    link.href = qrDataUrl;
    link.download = `qr-lettera-${templateSlug}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="rounded-2xl border border-line bg-paper p-5 sm:p-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-line pb-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-seal-100 text-seal-700">
            <QrCode className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-ink">Kode QR Surat</h3>
            <p className="text-[11px] text-ink-muted">Scan langsung menggunakan kamera HP</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
          <Sparkles className="h-3 w-3" />
          Siap Cetak
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-5">
        {/* QR Code Canvas / Image */}
        <div className="relative h-44 w-44 shrink-0 overflow-hidden rounded-xl border border-line/80 bg-white p-2 shadow-xs">
          {qrDataUrl ? (
            <Image
              src={qrDataUrl}
              alt="Kode QR Surat Digital"
              width={300}
              height={300}
              unoptimized
              className="h-full w-full object-contain"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-50 text-xs text-ink-muted">
              Membuat QR...
            </div>
          )}
        </div>

        {/* Info & Download Action */}
        <div className="flex-1 space-y-3 text-center sm:text-left">
          <p className="text-xs leading-relaxed text-ink-soft">
            {recipient
              ? `Kode QR ini langsung membuka surat digital khusus untuk ${recipient}.`
              : "Kode QR ini langsung membuka surat digital Anda saat di-scan oleh kamera HP apapun."}
          </p>
          <p className="text-[11px] text-ink-muted">
            Bisa diunduh dalam format gambar beresolusi tinggi untuk dicetak di kartu ucapan, diselipkan di kado, buket bunga, atau dikirim lewat chat.
          </p>

          <div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleDownload}
              disabled={!qrDataUrl}
              className="w-full sm:w-auto gap-2 bg-white hover:bg-page text-seal-700 border-seal-200 shadow-2xs font-semibold text-xs"
            >
              <Download className="h-3.5 w-3.5" />
              Unduh Kode QR (Gambar PNG)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
