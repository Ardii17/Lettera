"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import Image from "next/image";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Copy,
  Download,
  ExternalLink,
  Key,
  QrCode,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  AlertCircle,
  MessageCircle,
  HelpCircle,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import {
  ADMIN_WHATSAPP_NUMBER,
  generateWhatsAppConfirmationUrl,
  splitAmountForDisplay,
} from "@/lib/payment/qris-static";

declare global {
  interface Window {
    snap?: {
      embed: (
        token: string,
        options: {
          embedId: string;
          onSuccess?: (result: unknown) => void;
          onPending?: (result: unknown) => void;
          onError?: (result: unknown) => void;
          onClose?: () => void;
        },
      ) => void;
      pay: (
        token: string,
        options?: {
          onSuccess?: (result: unknown) => void;
          onPending?: (result: unknown) => void;
          onError?: (result: unknown) => void;
          onClose?: () => void;
        },
      ) => void;
      hide?: () => void;
      show?: () => void;
    };
  }
}

interface PaymentCheckoutProps {
  token: string;
  templateSlug: string;
  templateName: string;
  title: string;
  recipient: string;
  amount: number;
  snapScriptUrl: string;
  clientKey: string;
  isProduction: boolean;
}

export function PaymentCheckout({
  token,
  templateSlug,
  templateName,
  title,
  recipient,
  amount,
  snapScriptUrl,
  clientKey,
  isProduction,
}: PaymentCheckoutProps) {
  const router = useRouter();

  // Mode pembayaran: default ke "static" (QRIS Statis + Kode Unik)
  const [paymentMode, setPaymentMode] = useState<"static" | "midtrans">("static");

  const [error, setError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [checkingStatus, setCheckingStatus] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [copiedNominal, setCopiedNominal] = useState(false);

  // Dynamic QRIS Snap State dari Midtrans (untuk mode fallback)
  const [snapToken, setSnapToken] = useState<string | null>(null);
  const [loadingMidtrans, setLoadingMidtrans] = useState<boolean>(false);
  const [scriptLoaded, setScriptLoaded] = useState<boolean>(() => {
    return typeof window !== "undefined" && Boolean(window.snap);
  });
  const embeddedTokenRef = useRef<string | null>(null);

  const { copied: keyCopied, copy: copyKey } = useCopyToClipboard();

  // Format nominal dengan 3 digit unik
  const amountDisplay = splitAmountForDisplay(amount);

  // URL WhatsApp terisi otomatis
  const whatsappUrl = generateWhatsAppConfirmationUrl({
    token,
    amount,
    templateName,
    title,
    recipient,
  });

  // Salin nominal presisi angka murni (misal: 15132) agar user tidak salah ketik di m-banking
  const handleCopyExactNominal = async () => {
    try {
      await navigator.clipboard.writeText(amount.toString());
      setCopiedNominal(true);
      setTimeout(() => setCopiedNominal(false), 2500);
    } catch {
      // fallback
    }
  };

  // 1. Fungsi Periksa Status Pembayaran (Manual & Polling)
  const checkStatus = useCallback(
    async (isManual = false) => {
      if (paymentSuccess) return;

      if (isManual) {
        setCheckingStatus(true);
        setError(null);
        setInfoMessage(null);
      }

      try {
        const res = await fetch(`/api/payment/status?token=${token}`, {
          cache: "no-store",
        });
        const data = await res.json();

        if (data.isPaid) {
          setPaymentSuccess(true);
          router.push(`/created/${data.templateSlug || templateSlug}/${data.token || token}`);
          router.refresh();
          return;
        }

        if (isManual) {
          setInfoMessage(
            "Pembayaran belum terdeteksi masuk. Setelah Anda melakukan transfer, klik tombol 'Konfirmasi via WhatsApp' di bawah agar admin langsung memverifikasi.",
          );
        }
      } catch {
        if (isManual) {
          setError("Gagal menghubungi server untuk verifikasi status. Silakan coba kembali.");
        }
      } finally {
        if (isManual) {
          setCheckingStatus(false);
        }
      }
    },
    [paymentSuccess, token, router, templateSlug],
  );

  // 2. Background Auto-polling setiap 3 detik
  // Saat admin mengklik "Konfirmasi & Aktifkan" di panel admin, pembeli akan langsung dialihkan otomatis!
  useEffect(() => {
    if (paymentSuccess) return;

    const interval = setInterval(() => {
      checkStatus(false);
    }, 3000);

    return () => clearInterval(interval);
  }, [paymentSuccess, checkStatus]);

  // 3. Lazy Inisialisasi Midtrans hanya jika user beralih ke tab Midtrans
  useEffect(() => {
    if (paymentMode !== "midtrans") return;

    let isMounted = true;
    async function initMidtrans() {
      try {
        setLoadingMidtrans(true);
        const res = await fetch("/api/payment/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        });
        const data = await res.json();

        if (!isMounted) return;

        if (data.isPaid) {
          setPaymentSuccess(true);
          router.push(`/created/${data.templateSlug || templateSlug}/${data.token || token}`);
          return;
        }

        if (data.ok && data.snapToken) {
          setSnapToken(data.snapToken);
        }
      } catch (err) {
        console.error("Gagal inisialisasi Midtrans:", err);
      } finally {
        if (isMounted) setLoadingMidtrans(false);
      }
    }

    initMidtrans();
    return () => {
      isMounted = false;
    };
  }, [paymentMode, token, templateSlug, router]);

  // 4. Embed Midtrans Snap UI jika mode midtrans aktif
  useEffect(() => {
    if (paymentMode !== "midtrans" || !snapToken || loadingMidtrans) return;

    const container = document.getElementById("snap-container");
    if (!container) return;

    if (embeddedTokenRef.current === snapToken && container.children.length > 0) return;

    if (typeof window !== "undefined" && window.snap && typeof window.snap.embed === "function") {
      try {
        container.innerHTML = "";
        window.snap.embed(snapToken, {
          embedId: "snap-container",
          onSuccess: () => {
            setPaymentSuccess(true);
            router.push(`/created/${templateSlug}/${token}`);
          },
        });
        embeddedTokenRef.current = snapToken;
      } catch (e) {
        console.error("Gagal embed Snap:", e);
      }
    }
  }, [paymentMode, snapToken, loadingMidtrans, templateSlug, token, router]);

  return (
    <>
      {snapScriptUrl && paymentMode === "midtrans" && (
        <Script
          id="midtrans-snap-script"
          src={snapScriptUrl}
          data-client-key={clientKey}
          strategy="afterInteractive"
          onLoad={() => setScriptLoaded(true)}
          onReady={() => setScriptLoaded(true)}
        />
      )}

      <div className="mx-auto w-full max-w-4xl py-4 sm:py-8 min-w-0">
        {/* Navigation & Header */}
        <div className="mb-6 sm:mb-8">
          <Link
            href={`/create/${templateSlug}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-ink-muted hover:text-ink transition-colors mb-3 sm:mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Pengeditan Form
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-seal-100 px-3 py-1 text-xs font-semibold text-seal-800 mb-1.5">
                <QrCode className="h-3.5 w-3.5 text-seal-600" />
                QRIS Pembayaran Resmi
              </span>
              <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-ink">
                Selesaikan Pembayaran Surat
              </h1>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xs text-ink-muted block">Total Tagihan (Tepat Termasuk Kode Unik):</span>
              <div className="flex items-baseline gap-1 sm:justify-end">
                <span className="font-display text-2xl sm:text-3xl font-bold text-ink">
                  Rp 15.
                </span>
                <span className="font-display text-2xl sm:text-3xl font-black text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded-lg border border-amber-300">
                  {amountDisplay.uniqueCode}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Notifikasi Pembayaran Berhasil */}
        {paymentSuccess && (
          <div className="mb-6 rounded-3xl border border-emerald-200 bg-emerald-50 p-5 text-center text-emerald-900 shadow-sm animate-in fade-in">
            <div className="flex items-center justify-center gap-2 font-bold text-base sm:text-lg">
              <CheckCircle2 className="h-6 w-6 text-emerald-600 animate-bounce" />
              <span>Pembayaran Berhasil Dikonfirmasi!</span>
            </div>
            <p className="mt-1 text-xs sm:text-sm text-emerald-700">
              Surat digital Anda telah aktif. Mengalihkan ke halaman tautan surat siap bagikan...
            </p>
          </div>
        )}

        {/* Kotak Pengumuman Kode Unik Penting */}
        <div className="mb-6 rounded-2xl border-2 border-amber-300/80 bg-amber-50/90 p-4 sm:p-5 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500 text-white shrink-0 mt-0.5">
              <Key className="h-4 w-4" />
            </div>
            <div className="flex-1 text-xs sm:text-sm leading-relaxed text-amber-950">
              <strong className="font-bold text-amber-900 block mb-0.5">
                PENTING: Masukkan Nominal Tepat Hingga 3 Digit Terakhir
              </strong>
              <span>
                Mohon transfer sebesar{" "}
                <strong className="bg-white px-2 py-0.5 rounded font-mono text-amber-800 border border-amber-200 font-bold">
                  Rp 15.{amountDisplay.uniqueCode}
                </strong>
                . Tiga digit terakhir (<strong>{amountDisplay.uniqueCode}</strong>) merupakan kode verifikasi unik pesanan Anda agar dapat diaktivasi dengan cepat.
              </span>
            </div>
          </div>
        </div>

        <div className="grid w-full min-w-0 max-w-full gap-6 sm:gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          {/* Kolom Kiri: Barcode QRIS & Panduan Scan */}
          <div className="min-w-0 w-full max-w-full rounded-3xl border border-line bg-paper p-5 sm:p-7 shadow-sm space-y-5 overflow-hidden">
            {paymentMode === "static" ? (
              <>
                {/* Header Barcode */}
                <div className="flex items-center justify-between border-b border-line pb-4 gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-seal-100 text-seal-700 shrink-0">
                      <QrCode className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-sm font-bold text-ink uppercase tracking-wide">
                        QRIS Standar Nasional
                      </h2>
                      <p className="text-xs text-ink-muted">Bisa di-scan dari semua m-Banking & e-Wallet</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 border border-emerald-200 shrink-0">
                    Aktif & Siap Scan
                  </span>
                </div>

                {/* Tampilan Gambar QRIS Statis */}
                <div className="relative mx-auto flex max-w-[340px] flex-col items-center overflow-hidden rounded-2xl border-2 border-line/80 bg-white p-4 shadow-xs">
                  <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-50">
                    <Image
                      src="/images/qris-code.jpeg"
                      alt="Barcode QRIS Pembayaran Lettera"
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 300px, 340px"
                      priority
                    />
                  </div>

                  {/* Tombol Unduh QRIS (Berguna bagi user HP yang scan dari galeri) */}
                  <div className="mt-3.5 flex w-full gap-2">
                    <a
                      href="/images/qris-code.jpeg"
                      download="QRIS-Lettera.jpeg"
                      className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-line bg-page-deep/60 py-2 px-3 text-xs font-semibold text-ink hover:bg-page transition-colors text-center"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Unduh Barcode</span>
                    </a>
                    <a
                      href="/images/qris-code.jpeg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center rounded-xl border border-line bg-page-deep/60 px-3 py-2 text-xs font-semibold text-ink hover:bg-page transition-colors"
                      title="Perbesar Barcode"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>

                {/* Panel Nominal Presisi dengan Tombol Salin */}
                <div className="rounded-2xl border border-seal-200 bg-seal-50/70 p-4 text-center space-y-2">
                  <span className="text-xs text-ink-muted block">Jumlah yang Harus Ditransfer:</span>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="font-display text-3xl font-bold text-ink">Rp 15.</span>
                    <span className="font-display text-3xl font-black text-amber-700 bg-amber-100/90 px-2 py-0.5 rounded-lg border border-amber-300">
                      {amountDisplay.uniqueCode}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyExactNominal}
                    className={`mt-1 inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-xs font-bold transition-all shadow-2xs cursor-pointer ${
                      copiedNominal
                        ? "bg-emerald-600 text-white"
                        : "bg-white text-seal-800 border border-seal-300 hover:bg-seal-100"
                    }`}
                  >
                    {copiedNominal ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        <span>Nominal Rp {amount} Berhasil Disalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Salin Nominal Presisi ({amount})</span>
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-ink-muted">
                    Salin angka ini lalu tempelkan di kolom nominal m-Banking Anda.
                  </p>
                </div>

                {/* Panduan 4 Langkah Singkat */}
                <div className="space-y-2 pt-2 border-t border-line text-xs text-ink-soft">
                  <h4 className="font-bold text-ink flex items-center gap-1.5">
                    <Smartphone className="h-4 w-4 text-seal-600" />
                    Cara Pembayaran Mudah:
                  </h4>
                  <ol className="list-decimal list-inside space-y-1.5 leading-relaxed pl-1 text-ink-soft">
                    <li>Buka aplikasi m-Banking (BCA, Mandiri, BRI, dll) atau e-Wallet (GoPay, OVO, Dana, ShopeePay).</li>
                    <li>Pilih menu <strong>Scan QRIS</strong> (atau unggah gambar barcode jika membuka dari HP).</li>
                    <li>Ketikkan nominal tepat <strong>Rp {amount.toLocaleString("id-ID")}</strong> (jangan dibulatkan).</li>
                    <li>Selesaikan pembayaran dan konfirmasi via tombol WhatsApp di samping.</li>
                  </ol>
                </div>
              </>
            ) : (
              /* Midtrans Container (Optional Switch) */
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-line pb-3">
                  <h3 className="font-bold text-ink text-sm">Pembayaran via Midtrans Gateway</h3>
                  <button
                    type="button"
                    onClick={() => setPaymentMode("static")}
                    className="text-xs text-seal-600 underline font-semibold"
                  >
                    ← Kembali ke QRIS Statis
                  </button>
                </div>
                {loadingMidtrans ? (
                  <div className="flex flex-col items-center justify-center min-h-[350px] gap-2">
                    <Spinner className="h-8 w-8 text-seal-600" />
                    <p className="text-sm font-semibold text-ink">Menghubungkan ke Midtrans...</p>
                  </div>
                ) : (
                  <div id="snap-container" className="min-h-[400px] border rounded-2xl overflow-hidden" />
                )}
              </div>
            )}
          </div>

          {/* Kolom Kanan: Rincian Pesanan, Konfirmasi WhatsApp, & Status */}
          <div className="space-y-5 min-w-0 w-full max-w-full">
            {/* Rincian Pesanan */}
            <div className="rounded-3xl border border-line bg-paper p-5 sm:p-6 shadow-sm min-w-0 overflow-hidden">
              <h3 className="text-xs font-bold text-ink uppercase tracking-wider mb-4 border-b border-line pb-3">
                Rincian Pesanan Surat
              </h3>
              <div className="space-y-2.5 text-xs sm:text-sm">
                <div className="flex justify-between items-center gap-2">
                  <span className="text-ink-muted">Kode Pesanan:</span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs font-semibold text-seal-700 bg-seal-100/70 px-2 py-0.5 rounded-md">
                      {token}
                    </span>
                    <button
                      type="button"
                      onClick={() => copyKey(token)}
                      className="text-ink-muted hover:text-ink cursor-pointer"
                      title="Salin Kode"
                    >
                      {keyCopied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="flex justify-between gap-2">
                  <span className="text-ink-muted">Template:</span>
                  <span className="font-medium text-ink truncate text-right">{templateName}</span>
                </div>

                <div className="flex justify-between gap-2">
                  <span className="text-ink-muted">Judul Surat:</span>
                  <span className="font-medium text-ink truncate text-right max-w-[200px]">{title}</span>
                </div>

                {recipient ? (
                  <div className="flex justify-between gap-2">
                    <span className="text-ink-muted">Penerima:</span>
                    <span className="font-medium text-ink truncate text-right">{recipient}</span>
                  </div>
                ) : null}

                <div className="border-t border-line pt-2.5 flex justify-between font-semibold">
                  <span className="text-ink">Total Tagihan:</span>
                  <div className="text-right">
                    <span className="text-seal-700 font-bold text-base">Rp {amount.toLocaleString("id-ID")}</span>
                    <span className="text-[10px] text-ink-muted block font-normal">Termasuk kode unik verifikasi</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tombol Utama: Konfirmasi Pembayaran via WhatsApp (085210358521) */}
            <div className="rounded-3xl border-2 border-emerald-500/40 bg-emerald-50/50 p-5 sm:p-6 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-emerald-800">
                <MessageCircle className="h-5 w-5 text-emerald-600 shrink-0" />
                <h3 className="text-sm font-bold">Konfirmasi Pembayaran Cepat</h3>
              </div>

              <p className="text-xs text-ink-soft leading-relaxed">
                Sudah selesai scan dan transfer? Klik tombol di bawah untuk mengirim bukti transfer ke WhatsApp Admin agar surat Anda langsung diaktivasi seketika:
              </p>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3.5 text-xs sm:text-sm font-bold text-white shadow-xs hover:bg-emerald-700 hover:shadow-md transition-all active:scale-[0.98] text-center"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Konfirmasi via WhatsApp ({ADMIN_WHATSAPP_NUMBER})</span>
              </a>

              <p className="text-[11px] text-ink-muted text-center">
                Pesan WhatsApp sudah terisi otomatis dengan Kode Pesanan &amp; Nominal Anda.
              </p>
            </div>

            {/* Pengecekan Status & Auto-Polling */}
            <div className="rounded-3xl border border-line bg-paper p-5 sm:p-6 shadow-sm space-y-3.5">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-ink uppercase tracking-wide">
                  Status Pembayaran
                </h3>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-bold text-amber-800 border border-amber-200">
                  <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                  Menunggu Verifikasi
                </span>
              </div>

              {error && (
                <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700 flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {infoMessage && (
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800 flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>{infoMessage}</span>
                </div>
              )}

              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={() => checkStatus(true)}
                disabled={checkingStatus || paymentSuccess}
                className="w-full gap-2 text-xs font-bold text-ink border-line hover:bg-page py-3"
              >
                {checkingStatus ? (
                  <>
                    <Spinner className="h-4 w-4" />
                    Memeriksa Status...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4 text-seal-600" />
                    Periksa Status Manual
                  </>
                )}
              </Button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-ink-muted text-center pt-1 border-t border-line">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Layar otomatis berpindah ke surat begitu pembayaran terverifikasi.</span>
              </div>
            </div>

            {/* Opsi Switcher jika ingin mencoba Midtrans */}
            <div className="text-center pt-1">
              {paymentMode === "static" ? (
                <button
                  type="button"
                  onClick={() => setPaymentMode("midtrans")}
                  className="text-[11px] text-ink-muted hover:text-ink underline transition-colors"
                >
                  Coba alur pembayaran Midtrans Snap otomatis →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setPaymentMode("static")}
                  className="text-[11px] text-ink-muted hover:text-ink underline transition-colors"
                >
                  ← Kembali ke QRIS Statis + Kode Unik
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
