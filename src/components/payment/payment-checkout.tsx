"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  CheckCircle2,
  Download,
  QrCode,
  ShieldCheck,
  Sparkles,
  Smartphone,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { confirmPaymentAction } from "@/services/letters.actions";

interface PaymentCheckoutProps {
  token: string;
  templateSlug: string;
  templateName: string;
  title: string;
  recipient?: string;
  amount: number;
}

export function PaymentCheckout({
  token,
  templateSlug,
  templateName,
  title,
  recipient,
  amount,
}: PaymentCheckoutProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const formattedAmount = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);

  const handleDownloadQris = () => {
    const link = document.createElement("a");
    link.href = "/images/qris-code.jpeg";
    link.download = `qris-lettera-${templateSlug}.jpeg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleConfirmPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Nama pemesan wajib diisi.");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setError("Email aktif wajib diisi untuk menerima bukti pembayaran dan tautan surat.");
      return;
    }

    startTransition(async () => {
      const result = await confirmPaymentAction({
        token,
        payerName: name.trim(),
        payerEmail: email.trim(),
      });

      if (!result.ok) {
        setError(result.error);
        return;
      }

      router.push(`/created/${result.data.templateSlug}/${result.data.token}`);
      router.refresh();
    });
  };

  return (
    <div className="mx-auto max-w-4xl py-6 sm:py-10">
      {/* Navigation & Header */}
      <div className="mb-8">
        <Link
          href={`/create/${templateSlug}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted hover:text-ink transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Pengeditan Form
        </Link>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-seal-50 px-3 py-1 text-xs font-semibold text-seal-700">
              <Sparkles className="h-3.5 w-3.5" />
              Langkah Pembayaran
            </div>
            <h1 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Selesaikan Pembayaran QRIS
            </h1>
          </div>
          <div className="text-right">
            <span className="text-xs text-ink-muted block">Total Tagihan</span>
            <span className="font-display text-2xl font-bold text-seal-600 sm:text-3xl">
              {formattedAmount}
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        {/* Left Column: QRIS Barcode Card */}
        <div className="rounded-3xl border border-line bg-paper p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between border-b border-line pb-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-seal-100 text-seal-700">
                <QrCode className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-ink uppercase tracking-wide">
                  QRIS Standar Indonesia
                </h2>
                <p className="text-xs text-ink-muted">LETTERA DIGITAL STATIONERY</p>
              </div>
            </div>
            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
              Otomatis Terverifikasi
            </span>
          </div>

          {/* Real QRIS Code Image from public/images/qris-code.jpeg */}
          <div className="relative mx-auto flex max-w-[320px] flex-col items-center overflow-hidden rounded-2xl border-2 border-dashed border-seal-200 bg-white p-4 shadow-sm">
            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-50">
              <Image
                src="/images/qris-code.jpeg"
                alt="Barcode QRIS Pembayaran Lettera"
                fill
                className="object-contain"
                sizes="(max-width: 640px) 280px, 320px"
                priority
              />
            </div>

            {/* Download Button */}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleDownloadQris}
              className="mt-4 w-full gap-2 border-line text-xs font-semibold hover:bg-slate-50"
            >
              <Download className="h-4 w-4 text-seal-600" />
              Unduh Gambar QRIS (Simpan ke Galeri)
            </Button>
          </div>

          {/* Supported Providers */}
          <div className="mt-6 rounded-2xl bg-page p-4 text-xs text-ink-muted leading-relaxed">
            <div className="flex items-center gap-2 font-semibold text-ink mb-1.5">
              <Wallet className="h-4 w-4 text-seal-600" />
              <span>Dukungan Aplikasi Pembayaran:</span>
            </div>
            <p>
              BCA Mobile, Mandiri Livin, BRImo, BNI Mobile, GoPay, OVO, Dana, ShopeePay, LinkAja, serta semua aplikasi m-Banking yang mendukung scan QRIS.
            </p>
          </div>
        </div>

        {/* Right Column: Order Details & Payer Confirmation Form */}
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="rounded-3xl border border-line bg-paper p-6 shadow-sm">
            <h3 className="text-sm font-bold text-ink uppercase tracking-wider mb-4 border-b border-line pb-3">
              Rincian Pesanan
            </h3>
            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-ink-muted">Template Surat:</span>
                <span className="font-medium text-ink">{templateName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ink-muted">Judul / Peruntukan:</span>
                <span className="font-medium text-ink truncate max-w-[200px]">{title}</span>
              </div>
              {recipient ? (
                <div className="flex justify-between">
                  <span className="text-ink-muted">Penerima:</span>
                  <span className="font-medium text-ink">{recipient}</span>
                </div>
              ) : null}
              <div className="border-t border-line pt-2.5 flex justify-between font-semibold">
                <span className="text-ink">Biaya Penerbitan:</span>
                <span className="text-seal-600 font-bold">{formattedAmount}</span>
              </div>
            </div>
          </div>

          {/* Payment Steps Instructions */}
          <div className="rounded-3xl border border-line bg-paper p-6 shadow-sm">
            <h3 className="text-sm font-bold text-ink uppercase tracking-wider mb-3 flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-seal-600" />
              Cara Membayar via Ponsel:
            </h3>
            <ol className="list-decimal list-inside space-y-1.5 text-xs text-ink-soft leading-relaxed">
              <li>Buka aplikasi m-Banking atau e-Wallet di HP Anda.</li>
              <li>Pilih menu <strong>Scan QRIS</strong>.</li>
              <li>
                Arahkan kamera ke barcode di samping, atau pilih tombol <strong>&ldquo;Unduh Gambar QRIS&rdquo;</strong> lalu unggah gambar dari galeri HP Anda.
              </li>
              <li>Periksa nominal sesuai ({formattedAmount}), lalu selesaikan pembayaran.</li>
            </ol>
          </div>

          {/* Payer Form & Confirm Action */}
          <form
            onSubmit={handleConfirmPayment}
            className="rounded-3xl border border-seal-200 bg-seal-50/40 p-6 shadow-sm space-y-4"
          >
            <div>
              <h3 className="text-sm font-bold text-ink mb-1">
                Konfirmasi Identitas Pembeli
              </h3>
              <p className="text-xs text-ink-muted">
                Untuk pengiriman bukti pembayaran & cadangan link surat rahasia.
              </p>
            </div>

            <div>
              <label htmlFor="payer-name" className="block text-xs font-semibold text-ink">
                Nama Pemesan <span className="text-seal-500">*</span>
              </label>
              <input
                id="payer-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Budi Santoso"
                className="mt-1 w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:border-seal-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label htmlFor="payer-email" className="block text-xs font-semibold text-ink">
                Email Aktif <span className="text-seal-500">*</span>
              </label>
              <input
                id="payer-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="mt-1 w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-muted focus:border-seal-500 focus:outline-none"
                required
              />
            </div>

            {error ? (
              <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-700" role="alert">
                {error}
              </div>
            ) : null}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={pending}
              className="w-full gap-2 bg-seal-600 hover:bg-seal-700 text-white font-semibold shadow-md py-3"
            >
              {pending ? (
                <>
                  <Spinner className="h-4 w-4" />
                  Memverifikasi Pembayaran...
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  Saya Sudah Bayar via QRIS
                </>
              )}
            </Button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-ink-muted pt-1">
              <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Surat digital langsung aktif seketika setelah pembayaran terkonfirmasi.</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
