"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Script from "next/script";
import Image from "next/image";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  Key,
  QrCode,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  Smartphone,
  Wallet,
  AlertCircle,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";

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
    };
  }
}

interface PaymentCheckoutProps {
  token: string;
  templateSlug: string;
  templateName: string;
  title: string;
  recipient?: string;
  amount: number;
  snapScriptUrl: string;
  clientKey: string;
  isProduction?: boolean;
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
}: PaymentCheckoutProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const [checkingStatus, setCheckingStatus] = useState(false);
  const [simulating, setSimulating] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Dynamic QRIS Snap State dari Midtrans
  const [snapToken, setSnapToken] = useState<string | null>(null);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
  const [isMock, setIsMock] = useState<boolean>(false);
  const [loadingPayment, setLoadingPayment] = useState<boolean>(true);
  const [scriptLoaded, setScriptLoaded] = useState<boolean>(false);

  const { copied: keyCopied, copy: copyKey } = useCopyToClipboard();

  const formattedAmount = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);

  // 1. Inisialisasi Transaksi Midtrans Snap saat halaman dibuka
  useEffect(() => {
    let isMounted = true;

    async function initPayment() {
      try {
        setLoadingPayment(true);
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

        if (data.ok) {
          if (data.snapToken) setSnapToken(data.snapToken);
          if (data.redirectUrl) setRedirectUrl(data.redirectUrl);
          setIsMock(Boolean(data.isMock));
        } else {
          setError(data.error || "Gagal menginisialisasi pembayaran Midtrans.");
        }
      } catch (err) {
        console.error("Gagal menginisialisasi pembayaran:", err);
        setError("Gagal terhubung ke server pembayaran.");
      } finally {
        if (isMounted) setLoadingPayment(false);
      }
    }

    initPayment();

    return () => {
      isMounted = false;
    };
  }, [token, templateSlug, router]);

  // 2. Embed Snap UI jika snapToken & script sudah siap
  useEffect(() => {
    if (!snapToken || isMock) return;

    function doEmbed() {
      if (typeof window !== "undefined" && window.snap && typeof window.snap.embed === "function") {
        try {
          window.snap.embed(snapToken!, {
            embedId: "snap-container",
            onSuccess: () => {
              setPaymentSuccess(true);
              router.push(`/created/${templateSlug}/${token}`);
            },
            onPending: (result) => {
              console.log("Midtrans payment pending:", result);
            },
            onError: (err) => {
              console.error("Midtrans payment error:", err);
            },
          });
        } catch (e) {
          console.error("Gagal melakukan embed Snap:", e);
        }
      }
    }

    if (scriptLoaded || (typeof window !== "undefined" && window.snap)) {
      doEmbed();
    } else {
      const timer = setInterval(() => {
        if (typeof window !== "undefined" && window.snap) {
          clearInterval(timer);
          setScriptLoaded(true);
          doEmbed();
        }
      }, 250);
      return () => clearInterval(timer);
    }
  }, [snapToken, scriptLoaded, isMock, templateSlug, token, router]);

  // 3. Fungsi Periksa Status Pembayaran (Manual & Polling)
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
            "Pembayaran belum terdeteksi masuk. Jika Anda baru saja menyelesaikan pembayaran di m-Banking / e-Wallet, mohon tunggu beberapa detik lalu klik periksa kembali.",
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

  // 4. Background Auto-polling setiap 3.5 detik
  useEffect(() => {
    if (paymentSuccess) return;

    const interval = setInterval(() => {
      checkStatus(false);
    }, 3500);

    return () => clearInterval(interval);
  }, [paymentSuccess, checkStatus]);

  // 5. Buka Popup Snap Modal secara manual jika diinginkan pengguna
  const handleOpenSnapPopup = () => {
    if (snapToken && window.snap && typeof window.snap.pay === "function") {
      window.snap.pay(snapToken, {
        onSuccess: () => {
          setPaymentSuccess(true);
          router.push(`/created/${templateSlug}/${token}`);
        },
      });
    } else if (redirectUrl) {
      window.open(redirectUrl, "_blank");
    }
  };

  // 6. Fitur Simulasi Pembayaran Sukses (Sandbox / Demo)
  const handleSimulateSuccess = async () => {
    setSimulating(true);
    setError(null);
    try {
      const res = await fetch(`/api/payment/status?token=${token}&simulate=true`, {
        cache: "no-store",
      });
      const data = await res.json();

      if (data.isPaid) {
        setPaymentSuccess(true);
        router.push(`/created/${data.templateSlug || templateSlug}/${data.token || token}`);
        router.refresh();
      }
    } catch {
      setError("Gagal melakukan simulasi pembayaran.");
    } finally {
      setSimulating(false);
    }
  };

  return (
    <>
      {/* Load Midtrans Snap JS */}
      {snapScriptUrl && (
        <Script
          id="midtrans-snap-script"
          src={snapScriptUrl}
          data-client-key={clientKey}
          strategy="afterInteractive"
          onLoad={() => setScriptLoaded(true)}
        />
      )}

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
              <div className="inline-flex items-center gap-1.5 rounded-full bg-seal-50 px-3 py-1 text-xs font-semibold text-seal-700 border border-seal-200/60">
                <Sparkles className="h-3.5 w-3.5 text-seal-600" />
                Dynamic QRIS Resmi Midtrans
              </div>
              <h1 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                Selesaikan Pembayaran QRIS
              </h1>
            </div>
            <div className="text-right">
              <span className="text-xs text-ink-muted block">Total Tagihan (Terkunci)</span>
              <span className="font-display text-2xl font-bold text-seal-600 sm:text-3xl">
                {formattedAmount}
              </span>
            </div>
          </div>
        </div>

        {paymentSuccess && (
          <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-center text-emerald-800 shadow-sm animate-in fade-in">
            <div className="flex items-center justify-center gap-2 font-bold text-base">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 animate-bounce" />
              <span>Pembayaran Berhasil Terverifikasi!</span>
            </div>
            <p className="mt-1 text-xs text-emerald-700">
              Sedang mengalihkan Anda ke halaman tautan surat digital...
            </p>
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          {/* Kolom Kiri: Midtrans Dynamic QRIS Container */}
          <div className="rounded-3xl border border-line bg-paper p-5 sm:p-7 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-seal-100 text-seal-700">
                  <QrCode className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-ink uppercase tracking-wide">
                    QRIS Standar Indonesia
                  </h2>
                  <p className="text-xs text-ink-muted">Nominal pas {formattedAmount} (Otomatis)</p>
                </div>
              </div>
              <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 border border-emerald-200">
                Nominal Terkunci
              </span>
            </div>

            {loadingPayment ? (
              <div className="flex flex-col items-center justify-center min-h-[380px] rounded-2xl border border-dashed border-seal-200 bg-slate-50/60 p-6 gap-3">
                <Spinner className="h-8 w-8 text-seal-600" />
                <p className="text-sm font-semibold text-ink">Menyiapkan QRIS Dinamis Midtrans...</p>
                <p className="text-xs text-ink-muted">Mengunci nominal {formattedAmount}</p>
              </div>
            ) : isMock ? (
              /* Fallback / Mock View jika Midtrans key belum diisi */
              <div className="space-y-4">
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
                  <div className="mt-3 w-full rounded-xl bg-seal-50 py-1.5 px-3 text-center border border-seal-100">
                    <span className="text-[11px] text-seal-700 font-semibold">
                      Nominal Terkunci: {formattedAmount}
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl border border-dashed border-seal-300 bg-seal-50/70 p-3 text-center">
                  <p className="text-[11px] font-semibold text-seal-800 mb-1 flex items-center justify-center gap-1">
                    <Zap className="h-3.5 w-3.5 text-amber-500" />
                    Mode Pengujian / Sandbox Aktif
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleSimulateSuccess}
                    disabled={simulating || paymentSuccess}
                    className="mt-1 w-full text-xs font-bold border-seal-300 text-seal-800 hover:bg-seal-100 bg-white"
                  >
                    {simulating ? <Spinner className="h-3.5 w-3.5 mr-1" /> : null}
                    Simulasikan Pembayaran Sukses (Langsung Redirect)
                  </Button>
                </div>
              </div>
            ) : (
              /* Midtrans Snap Official Embed Container */
              <div className="space-y-4">
                <div
                  id="snap-container"
                  className="w-full min-h-[440px] rounded-2xl overflow-hidden border border-line bg-white shadow-2xs"
                />

                <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-1 text-xs text-ink-muted">
                  <span>Jika QRIS di atas belum muncul:</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleOpenSnapPopup}
                    className="gap-1.5 text-xs text-seal-700 hover:bg-seal-50 border-seal-200"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Buka Popup Pembayaran Midtrans
                  </Button>
                </div>
              </div>
            )}

            {/* Supported Providers */}
            <div className="rounded-2xl bg-page p-4 text-xs text-ink-muted leading-relaxed">
              <div className="flex items-center gap-2 font-semibold text-ink mb-1.5">
                <Wallet className="h-4 w-4 text-seal-600" />
                <span>Mendukung Seluruh Aplikasi Finansial Indonesia:</span>
              </div>
              <p>
                BCA Mobile, Mandiri Livin&rsquo;, BRImo, BNI Mobile, GoPay, OVO, Dana, ShopeePay, LinkAja, serta semua aplikasi m-Banking yang memiliki fitur scan QRIS.
              </p>
            </div>
          </div>

          {/* Kolom Kanan: Rincian Pesanan & Tombol Periksa Status (Tanpa Form Identitas) */}
          <div className="space-y-6">
            {/* Rincian Pesanan */}
            <div className="rounded-3xl border border-line bg-paper p-6 shadow-sm">
              <h3 className="text-sm font-bold text-ink uppercase tracking-wider mb-4 border-b border-line pb-3">
                Rincian Pesanan
              </h3>
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-ink-muted">Key Pemesanan:</span>
                  <span className="font-mono text-xs font-semibold text-seal-700 bg-seal-100/70 px-2 py-0.5 rounded-md">
                    {token}
                  </span>
                </div>
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

            {/* Key Pemesanan (ID Verifikasi Admin) Card dengan Tombol Salin */}
            <div className="rounded-3xl border border-seal-200 bg-seal-50/50 p-5 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="order-key-display"
                  className="flex items-center gap-1.5 text-xs font-semibold text-ink"
                >
                  <Key className="h-3.5 w-3.5 text-seal-600" />
                  Key Pemesanan (ID Verifikasi Admin)
                </label>
                <button
                  type="button"
                  onClick={() => copyKey(token)}
                  className="inline-flex items-center gap-1 text-[11px] font-medium text-seal-700 hover:text-seal-900 transition-colors cursor-pointer"
                >
                  {keyCopied ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-600" />
                      <span className="text-emerald-600 font-semibold">Key Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Salin Key</span>
                    </>
                  )}
                </button>
              </div>
              <input
                id="order-key-display"
                type="text"
                value={token}
                disabled
                readOnly
                className="w-full rounded-xl border border-line bg-white/90 px-3.5 py-2 font-mono text-xs font-semibold text-ink-soft select-all cursor-not-allowed shadow-2xs"
              />
              <p className="text-[11px] text-ink-muted leading-relaxed">
                Sertakan key unik ini jika Anda membutuhkan bantuan admin terkait kendala transaksi.
              </p>
            </div>

            {/* Tombol Aksi Utama: Periksa Status Pembayaran */}
            <div className="rounded-3xl border border-line bg-paper p-6 shadow-sm space-y-4">
              <div>
                <h3 className="text-sm font-bold text-ink mb-1">
                  Konfirmasi Pembayaran
                </h3>
                <p className="text-xs text-ink-muted leading-relaxed">
                  Setelah Anda menyelesaikan pembayaran di aplikasi ponsel, tekan tombol di bawah ini atau tunggu beberapa detik hingga sistem mendeteksi secara otomatis.
                </p>
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
                variant="primary"
                size="lg"
                onClick={() => checkStatus(true)}
                disabled={checkingStatus || paymentSuccess}
                className="w-full gap-2 bg-seal-600 hover:bg-seal-700 text-white font-bold shadow-md py-3.5 text-sm"
              >
                {checkingStatus ? (
                  <>
                    <Spinner className="h-4 w-4" />
                    Memeriksa Status Pembayaran...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4" />
                    Periksa Status Pembayaran
                  </>
                )}
              </Button>

              <div className="flex items-center justify-center gap-2 text-xs text-ink-muted">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Pengecekan otomatis aktif di latar belakang (setiap 3.5 detik)</span>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-ink-muted pt-2 border-t border-line">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>Begitu lunas, halaman langsung otomatis membuka surat Anda.</span>
              </div>
            </div>

            {/* Panduan Pembayaran */}
            <div className="rounded-3xl border border-line bg-paper p-6 shadow-sm">
              <h3 className="text-sm font-bold text-ink uppercase tracking-wider mb-3 flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-seal-600" />
                Langkah Pembayaran Singkat:
              </h3>
              <ol className="list-decimal list-inside space-y-1.5 text-xs text-ink-soft leading-relaxed">
                <li>Buka aplikasi m-Banking atau e-Wallet di HP Anda.</li>
                <li>Pilih menu <strong>Scan QRIS</strong>.</li>
                <li>Arahkan kamera ke barcode QRIS di samping.</li>
                <li>Nominal tagihan <strong>{formattedAmount} otomatis muncul</strong>.</li>
                <li>Konfirmasi pembayaran di HP Anda.</li>
                <li>Klik tombol <strong>&ldquo;Periksa Status Pembayaran&rdquo;</strong> di atas untuk langsung membuka link surat.</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
