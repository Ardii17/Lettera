"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import {
  Key,
  RefreshCw,
  Search,
  CheckCircle2,
  Clock,
  ExternalLink,
  ShieldCheck,
  Check,
  Copy,
  AlertCircle,
  Eye,
  Filter,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { ADMIN_DEFAULT_SECRET } from "@/lib/payment/qris-static";

interface LetterItem {
  id: string;
  publicToken: string;
  title: string;
  templateName: string;
  templateSlug: string;
  recipient: string;
  payerName: string;
  amount: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
}

export default function AdminActivatePage() {
  const [secret, setSecret] = useState<string>("");
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [letters, setLetters] = useState<LetterItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterTab, setFilterTab] = useState<"pending" | "paid" | "all">("pending");
  const [activatingToken, setActivatingToken] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  // Load saved secret from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("lettera_admin_secret");
    if (saved) {
      setSecret(saved);
      setIsUnlocked(true);
    } else {
      // Default convenience fallback
      setSecret(ADMIN_DEFAULT_SECRET);
    }
  }, []);

  const fetchLetters = useCallback(async (adminSecret: string) => {
    if (!adminSecret) return;
    setLoading(true);
    setFeedback(null);
    try {
      const res = await fetch(`/api/admin/activate?secret=${encodeURIComponent(adminSecret)}&action=list`);
      const data = await res.json();

      if (data.ok) {
        setLetters(data.letters || []);
        setIsUnlocked(true);
        localStorage.setItem("lettera_admin_secret", adminSecret);
      } else {
        setFeedback({ type: "error", msg: data.error || "Kunci admin tidak cocok." });
        setIsUnlocked(false);
      }
    } catch {
      setFeedback({ type: "error", msg: "Gagal terhubung ke server." });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isUnlocked && secret) {
      fetchLetters(secret);
    }
  }, [isUnlocked, secret, fetchLetters]);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!secret.trim()) return;
    fetchLetters(secret.trim());
  };

  const handleActivate = async (token: string) => {
    setActivatingToken(token);
    setFeedback(null);
    try {
      const res = await fetch("/api/admin/activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, secret }),
      });
      const data = await res.json();

      if (data.ok) {
        setFeedback({ type: "success", msg: `Surat ${token} berhasil diaktifkan menjadi PAID & PUBLISHED!` });
        // Update local state directly
        setLetters((prev) =>
          prev.map((l) => (l.publicToken === token ? { ...l, paymentStatus: "paid", status: "published" } : l)),
        );
      } else {
        setFeedback({ type: "error", msg: data.error || "Gagal mengaktifkan surat." });
      }
    } catch {
      setFeedback({ type: "error", msg: "Terjadi gangguan saat memproses aktivasi." });
    } finally {
      setActivatingToken(null);
    }
  };

  const handleCopyLink = async (templateSlug: string, token: string) => {
    const url = `${window.location.origin}/letter/${templateSlug}/${token}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopiedToken(token);
      setTimeout(() => setCopiedToken(null), 2500);
    } catch {
      // fallback
    }
  };

  const filteredLetters = useMemo(() => {
    return letters.filter((item) => {
      // Filter tab
      if (filterTab === "pending" && item.paymentStatus === "paid") return false;
      if (filterTab === "paid" && item.paymentStatus !== "paid") return false;

      // Filter search
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const amountStr = item.amount.toString();
      const uniqueCode = amountStr.slice(-3);

      return (
        item.publicToken.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.recipient.toLowerCase().includes(q) ||
        item.templateName.toLowerCase().includes(q) ||
        amountStr.includes(q) ||
        uniqueCode.includes(q)
      );
    });
  }, [letters, filterTab, searchQuery]);

  return (
    <div className="py-10 sm:py-14 bg-page min-h-screen">
      <Container className="max-w-4xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-line pb-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-seal-100 px-3 py-1 text-xs font-semibold text-seal-800 mb-2">
              <ShieldCheck className="h-3.5 w-3.5 text-seal-600" />
              Panel Verifikasi Admin Lettera
            </div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-ink">
              Aktivasi Pembayaran QRIS Statis
            </h1>
            <p className="text-xs sm:text-sm text-ink-soft mt-1">
              Cocokkan mutasi bank/e-Wallet Anda dengan 3 digit unik nominal, lalu klik konfirmasi untuk menerbitkan surat.
            </p>
          </div>

          {isUnlocked && (
            <button
              type="button"
              onClick={() => fetchLetters(secret)}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-paper px-4 py-2.5 text-xs font-semibold text-ink hover:bg-page transition-all shrink-0 self-start sm:self-auto shadow-2xs"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin text-seal-600" : ""}`} />
              <span>Segarkan Data</span>
            </button>
          )}
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div
            className={`mb-6 rounded-2xl p-4 text-xs sm:text-sm flex items-start gap-3 animate-in fade-in ${
              feedback.type === "success"
                ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                : "bg-rose-50 border border-rose-200 text-rose-800"
            }`}
          >
            {feedback.type === "success" ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
            )}
            <span className="font-medium">{feedback.msg}</span>
          </div>
        )}

        {/* Form Otentikasi Admin Kunci Rahasia */}
        {!isUnlocked ? (
          <div className="mx-auto max-w-md rounded-3xl border border-line bg-paper p-8 shadow-sm text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-seal-100 text-seal-700 mb-4">
              <Key className="h-6 w-6" />
            </div>
            <h2 className="font-display text-xl font-bold text-ink">Buka Kunci Akses Admin</h2>
            <p className="text-xs text-ink-muted mt-1 mb-6">
              Masukkan kunci rahasia admin untuk memverifikasi dan mengaktifkan pembayaran pelanggan.
            </p>

            <form onSubmit={handleUnlock} className="space-y-4">
              <input
                type="password"
                placeholder="Masukkan Admin Secret Key..."
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                className="w-full rounded-xl border border-line bg-white px-4 py-3 text-sm font-mono text-ink placeholder:text-ink-muted focus:border-seal-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-seal-600 py-3 text-sm font-bold text-white hover:bg-seal-700 transition-colors shadow-xs"
              >
                {loading ? "Memverifikasi Kunci..." : "Masuk ke Panel Verifikasi"}
              </button>
            </form>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              {/* Search Box */}
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-muted" />
                <input
                  type="text"
                  placeholder="Cari 3 digit kode unik (misal: 132), token, judul, atau penerima..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-2xl border border-line bg-paper pl-10 pr-4 py-2.5 text-xs sm:text-sm text-ink placeholder:text-ink-muted focus:border-seal-500 focus:outline-none shadow-2xs"
                />
              </div>

              {/* Status Tabs */}
              <div className="flex items-center gap-1 rounded-2xl border border-line bg-paper/80 p-1 shrink-0">
                <button
                  type="button"
                  onClick={() => setFilterTab("pending")}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                    filterTab === "pending"
                      ? "bg-amber-600 text-white shadow-2xs"
                      : "text-ink-soft hover:text-ink"
                  }`}
                >
                  Menunggu Verifikasi ({letters.filter((l) => l.paymentStatus !== "paid").length})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterTab("paid")}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                    filterTab === "paid"
                      ? "bg-emerald-600 text-white shadow-2xs"
                      : "text-ink-soft hover:text-ink"
                  }`}
                >
                  Lunas ({letters.filter((l) => l.paymentStatus === "paid").length})
                </button>
                <button
                  type="button"
                  onClick={() => setFilterTab("all")}
                  className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition-all ${
                    filterTab === "all"
                      ? "bg-ink text-white shadow-2xs"
                      : "text-ink-soft hover:text-ink"
                  }`}
                >
                  Semua ({letters.length})
                </button>
              </div>
            </div>

            {/* List Surat */}
            {filteredLetters.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-line bg-paper/50 p-12 text-center">
                <Clock className="h-8 w-8 text-ink-muted mx-auto mb-2 opacity-50" />
                <p className="text-sm font-semibold text-ink">Tidak ada transaksi yang cocok.</p>
                <p className="text-xs text-ink-muted mt-1">
                  {filterTab === "pending"
                    ? "Semua pesanan saat ini telah terverifikasi lunas."
                    : "Coba ubah kata kunci pencarian Anda."}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredLetters.map((item) => {
                  const isPaid = item.paymentStatus === "paid";
                  const amountStr = item.amount.toString();
                  const uniqueDigits = amountStr.slice(-3);
                  const isActivating = activatingToken === item.publicToken;

                  return (
                    <div
                      key={item.id}
                      className={`rounded-3xl border p-5 sm:p-6 transition-all shadow-xs ${
                        isPaid
                          ? "border-emerald-200 bg-paper/60"
                          : "border-amber-300/80 bg-amber-50/40 hover:border-amber-400"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        {/* Kolom Info Nominal & Keterangan */}
                        <div className="space-y-2 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            {/* Highlight Nominal Transfer */}
                            <div className="inline-flex items-baseline gap-1 rounded-xl bg-white px-3 py-1 border border-line shadow-2xs">
                              <span className="text-xs text-ink-muted">Nominal:</span>
                              <span className="font-display text-lg sm:text-xl font-bold text-ink">
                                Rp 15.
                              </span>
                              <span className="font-display text-lg sm:text-xl font-black text-amber-700 bg-amber-100/80 px-1 rounded">
                                {uniqueDigits}
                              </span>
                            </div>

                            {/* Badge Status */}
                            {isPaid ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-800 border border-emerald-300">
                                <Check className="h-3 w-3" />
                                LUNAS / AKTIF
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-900 border border-amber-300 animate-pulse">
                                <Clock className="h-3 w-3" />
                                MENUNGGU TRANSFER
                              </span>
                            )}

                            <span className="rounded-full bg-page-deep px-2.5 py-0.5 text-[11px] font-semibold text-ink-soft">
                              {item.templateName}
                            </span>
                          </div>

                          {/* Judul & Penerima */}
                          <div>
                            <h3 className="font-display text-base font-bold text-ink">
                              {item.title}
                            </h3>
                            <p className="text-xs text-ink-soft">
                              {item.recipient ? `Untuk: ${item.recipient}` : "Penerima: (Tidak diisi)"} ·{" "}
                              {item.payerName ? `Pemesan: ${item.payerName}` : ""}
                            </p>
                          </div>

                          {/* Token & Waktu */}
                          <div className="flex flex-wrap items-center gap-3 text-[11px] text-ink-muted">
                            <span className="font-mono bg-white/80 px-2 py-0.5 rounded border border-line/70">
                              Token: {item.publicToken}
                            </span>
                            <span>Dibuat: {new Date(item.createdAt).toLocaleString("id-ID")}</span>
                          </div>
                        </div>

                        {/* Kolom Tombol Aksi */}
                        <div className="flex flex-col sm:items-end gap-2 shrink-0">
                          {!isPaid ? (
                            <button
                              type="button"
                              onClick={() => handleActivate(item.publicToken)}
                              disabled={isActivating}
                              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-xs hover:bg-emerald-700 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                            >
                              {isActivating ? (
                                <>
                                  <RefreshCw className="h-4 w-4 animate-spin" />
                                  <span>Mengaktifkan...</span>
                                </>
                              ) : (
                                <>
                                  <CheckCircle2 className="h-4 w-4" />
                                  <span>Konfirmasi & Aktifkan</span>
                                </>
                              )}
                            </button>
                          ) : (
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleCopyLink(item.templateSlug, item.publicToken)}
                                className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-white px-3 py-2 text-xs font-semibold text-ink hover:bg-page transition-colors cursor-pointer"
                              >
                                {copiedToken === item.publicToken ? (
                                  <>
                                    <Check className="h-3.5 w-3.5 text-emerald-600" />
                                    <span className="text-emerald-700">Link Tersalin!</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="h-3.5 w-3.5 text-ink-muted" />
                                    <span>Salin Link</span>
                                  </>
                                )}
                              </button>

                              <Link
                                href={`/letter/${item.templateSlug}/${item.publicToken}`}
                                target="_blank"
                                className="inline-flex items-center gap-1.5 rounded-xl bg-seal-600 px-3 py-2 text-xs font-bold text-white hover:bg-seal-700 transition-colors"
                              >
                                <Eye className="h-3.5 w-3.5" />
                                <span>Lihat Surat</span>
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </Container>
    </div>
  );
}
