"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  Download,
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
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const [pending, startTransition] = useTransition();
  const [checkingStatus, setCheckingStatus] = useState(false);
  const [simulating, setSimulating] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Dynamic QRIS State dari Midtrans
  const [qrUrl, setQrUrl] = useState<string>("/images/qris-code.jpeg");
  const [isMock, setIsMock] = useState<boolean>(true);
  const [loadingQr, setLoadingQr] = useState<boolean>(true);
  const [timeLeft, setTimeLeft] = useState<number>(15 * 60); // 15 menit default

  const { copied: keyCopied, copy: copyKey } = useCopyToClipboard();

  const formattedAmount = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);

  // 1. Fetch Dynamic QRIS dari Midtrans saat halaman pertama kali dibuka
  useEffect(() => {
    let isMounted = true;

    async function initPayment() {
      try {
        setLoadingQr(true);
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

        if (data.ok && data.qrUrl) {
          setQrUrl(data.qrUrl);
          setIsMock(Boolean(data.isMock));
        }
      } catch (err) {
        console.error("Gagal menginisialisasi pembayaran:", err);
      } finally {
        if (isMounted) setLoadingQr(false);
      }
    }

    initPayment();

    return () => {
      isMounted = false;
    };
  }, [token, templateSlug, router]);

  // 2. Countdown Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // 3. Fungsi Cek Status Pembayaran (Manual & Polling)
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
            "Pembayaran belum terdeteksi. Jika baru saja transfer, mohon tunggu 5–10 detik lalu klik cek kembali.",
          );
        }
      } catch {
        if (isManual) {
          setError("Gagal terhubung ke server saat mengecek status. Coba sesaat lagi.");
        }
      } finally {
        if (isManual) {
          setCheckingStatus(false);
        }
      }
    },
    [paymentSuccess, token, router, templateSlug],
  );

  // 4. Background Auto-polling setiap 4 detik untuk mendeteksi pembayaran otomatis
  useEffect(() => {
    if (paymentSuccess) return;

    const interval = setInterval(() => {
      checkStatus(false);
    }, 4000);

    return () => clearInterval(interval);
  }, [paymentSuccess, checkStatus]);

  // 5. Fitur Simulasi Pembayaran (Sandbox / Demo)
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

  const handleDownloadQris = () => {
    const link = document.createElement("a");
    link.href = qrUrl;
    link.download = `qris-lettera-${templateSlug}.png`;
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

      setPaymentSuccess(true);
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
              Dynamic QRIS Midtrans
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
            Sedang menyiapkan dan mengalihkan ke halaman surat digital Anda...
          </p>
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        {/* Left Column: Dynamic QRIS Barcode Card */}
        <div className="rounded-3xl border border-line bg-paper p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-line pb-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-seal-100 text-seal-700">
                <QrCode className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-ink uppercase tracking-wide">
                  QRIS Dinamis Otomatis
                </h2>
                <p className="text-xs text-ink-muted">Nominal pas {formattedAmount} (Tanpa ketik manual)</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-800 border border-amber-200/60">
              <Clock className="h-3.5 w-3.5 text-amber-600" />
              <span>{formatTime(timeLeft)}</span>
            </div>
          </div>

          {/* Dynamic QRIS Code View */}
          <div className="relative mx-auto flex max-w-[320px] flex-col items-center overflow-hidden rounded-2xl border-2 border-dashed border-seal-200 bg-white p-4 shadow-sm">
            <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-50 flex items-center justify-center">
              {loadingQr ? (
                <div className="flex flex-col items-center gap-2">
                  <Spinner className="h-8 w-8 text-seal-600" />
                  <p className="text-xs font-medium text-ink-muted">Membuat Barcode QRIS...</p>
                </div>
              ) : (
                <Image
                  src={qrUrl}
                  alt="Barcode QRIS Dinamis Pembayaran Lettera"
                  fill
                  unoptimized={qrUrl.startsWith("http")}
                  className="object-contain p-2"
                  priority
                />
              )}
            </div>

            {/* Badge Nominal Terkunci */}
            <div className="mt-3 w-full rounded-xl bg-seal-50 py-1.5 px-3 text-center border border-seal-100">
              <span className="text-[11px] text-seal-700 font-semibold">
                Nominal Terkunci: {formattedAmount}
              </span>
            </div>

            {/* Download Button */}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleDownloadQris}
              disabled={loadingQr}
              className="mt-2.5 w-full gap-2 border-line text-xs font-semibold hover:bg-slate-50"
            >
              <Download className="h-3.5 w-3.5 text-seal-600" />
              Unduh Gambar QRIS (Simpan ke Galeri)
            </Button>
          </div>

          {/* Tombol Cek Status Pembayaran Real-time */}
          <div className="space-y-3 pt-2">
            <Button
              type="button"
              variant="primary"
              size="lg"
              onClick={() => checkStatus(true)}
              disabled={checkingStatus || paymentSuccess}
              className="w-full gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-sm py-3 text-sm"
            >
              {checkingStatus ? (
                <>
                  <Spinner className="h-4 w-4" />
                  Mengecek Status Pembayaran...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4" />
                  Cek Status Pembayaran Sekarang
                </>
              )}
            </Button>

            <div className="flex items-center justify-center gap-2 text-xs text-ink-muted">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Sistem otomatis memeriksa pembayaran setiap 4 detik di latar belakang</span>
            </div>

            {infoMessage && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800 flex items-start gap-2 animate-in fade-in">
                <AlertCircle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                <span>{infoMessage}</span>
              </div>
            )}

            {/* Tombol Simulasi Pembayaran Sandbox / Demo */}
            {isMock && (
              <div className="rounded-2xl border border-dashed border-seal-300 bg-seal-50/60 p-3.5 text-center">
                <p className="text-[11px] font-semibold text-seal-800 mb-1.5 flex items-center justify-center gap-1">
                  <Zap className="h-3.5 w-3.5 text-amber-500" />
                  Mode Pengujian Sandbox / Demo Aktif
                </p>
                <p className="text-[11px] text-ink-muted mb-2.5">
                  Anda dapat mencoba alur otomatisasi sukses tanpa perlu transfer uang sungguhan.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleSimulateSuccess}
                  disabled={simulating || paymentSuccess}
                  className="w-full text-xs font-bold border-seal-300 text-seal-800 hover:bg-seal-100 bg-white"
                >
                  {simulating ? <Spinner className="h-3.5 w-3.5 mr-1" /> : null}
                  Simulasikan Pembayaran Sukses
                </Button>
              </div>
            )}
          </div>

          {/* Supported Providers */}
          <div className="rounded-2xl bg-page p-4 text-xs text-ink-muted leading-relaxed">
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
                Arahkan kamera ke barcode di samping (atau unduh gambar lalu unggah dari galeri HP).
              </li>
              <li>
                Nominal <strong>{formattedAmount} otomatis muncul</strong>. Selesaikan pembayaran.
              </li>
              <li>Halaman ini akan otomatis beralih setelah pembayaran berhasil!</li>
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

            {/* Input Key Pemesanan (Disabled untuk verifikasi & aduan admin) */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="order-key"
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
                id="order-key"
                type="text"
                value={token}
                disabled
                readOnly
                className="w-full rounded-xl border border-line bg-slate-100/90 px-3.5 py-2.5 font-mono text-xs font-semibold text-ink-soft select-all cursor-not-allowed opacity-90 shadow-2xs"
              />
              <p className="mt-1.5 text-[11px] text-ink-muted leading-relaxed">
                Key unik ini digunakan admin untuk melacak dan memverifikasi pesanan Anda. Jika terjadi kendala terkait pembayaran, sertakan key ini saat mengadu ke admin agar dapat segera diproses.
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
              disabled={pending || paymentSuccess}
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
