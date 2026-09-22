import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import {
  MessageCircle,
  Clock,
  CheckCircle2,
  FileQuestion,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Copy,
} from "lucide-react";
import { siteConfig } from "@/lib/constants";
import { ContactFormatCopy } from "@/components/contact/contact-format-copy";

export const metadata: Metadata = {
  title: "Pusat Bantuan & Pengaduan Layanan",
  description:
    "Hubungi admin resmi Lettera untuk pengaduan kendala pembayaran QRIS, kendala surat digital, atau pertanyaan layanan via WhatsApp dan TikTok.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const waNumber = "085210358521";
  const waLink =
    "https://wa.me/6285210358521?text=Halo%20Admin%20Lettera%2C%20saya%20ingin%20mengadukan%20kendala%20terkait%20surat%20digital%20saya%3A%0A%0A-%20Nama%20Pengirim%3A%20%0A-%20Template%20Surat%3A%20%0A-%20Kendala%3A%20";
  const tiktokUsername = "@bykisahkarsa";
  const tiktokLink = "https://www.tiktok.com/@bykisahkarsa";

  return (
    <div className="py-12 sm:py-16">
      <Container className="max-w-4xl">
        {/* Header Seksi */}
        <header className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-seal-50 px-3.5 py-1 text-xs font-semibold text-seal-700 ring-1 ring-seal-200">
            <HelpCircle className="h-3.5 w-3.5 text-seal-600" />
            Layanan Pengaduan & Bantuan Pelanggan
          </span>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Ada Kendala atau Pertanyaan? Kami Siap Membantu
          </h1>
          <p className="mt-3 text-base sm:text-lg leading-relaxed text-ink-soft">
            Kepuasan momen berhargamu adalah prioritas kami. Jika kamu mengalami kendala pembayaran,
            kesalahan link surat, atau memerlukan bantuan, hubungi admin kami melalui saluran resmi berikut.
          </p>
        </header>

        {/* Kartu 2 Saluran Pengaduan Resmi */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {/* Opsi 1: WhatsApp */}
          <div className="relative flex flex-col justify-between rounded-3xl border-2 border-emerald-500/40 bg-paper p-7 sm:p-8 shadow-xs hover:shadow-lift transition-all">
            <div>
              <div className="flex items-center justify-between">
                {/* WhatsApp SVG Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                  <svg
                    className="h-6 w-6 fill-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
                  Respon Cepat (Utama)
                </span>
              </div>

              <div className="mt-5">
                <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  Saluran WhatsApp
                </span>
                <h2 className="font-display text-2xl font-bold text-ink mt-0.5">
                  {waNumber}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  Hubungi admin langsung lewat WhatsApp untuk pengaduan pembayaran QRIS, konfirmasi
                  manual, atau penanganan kendala teknis secara langsung.
                </p>
              </div>
            </div>

            <div className="mt-7">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-xs hover:bg-emerald-700 hover:shadow-md transition-all active:scale-[0.98]"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Chat Admin WhatsApp</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Opsi 2: TikTok */}
          <div className="relative flex flex-col justify-between rounded-3xl border-2 border-stone-800/30 bg-paper p-7 sm:p-8 shadow-xs hover:shadow-lift transition-all">
            <div>
              <div className="flex items-center justify-between">
                {/* TikTok SVG Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-stone-900 text-white">
                  <svg
                    className="h-6 w-6 fill-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.88 2.88 0 01-2.88-2.88 2.89 2.89 0 012.88-2.88c.37 0 .72.07 1.04.2v-3.6a6.38 6.38 0 00-1.04-.09 6.38 6.38 0 00-6.38 6.38 6.38 6.38 0 006.38 6.38 6.38 6.38 0 006.38-6.38V8.71a8.28 8.28 0 004.81 1.54V6.8a4.85 4.85 0 01-1.09-.11z" />
                  </svg>
                </div>
                <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-bold text-stone-800 border border-stone-300">
                  Akun Resmi
                </span>
              </div>

              <div className="mt-5">
                <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  Direct Message TikTok
                </span>
                <h2 className="font-display text-2xl font-bold text-ink mt-0.5">
                  {tiktokUsername}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  Kirim DM atau beri komentar pada akun resmi TikTok kami untuk pertanyaan seputar
                  fitur template, inspirasi kado digital, dan konsultasi lainnya.
                </p>
              </div>
            </div>

            <div className="mt-7">
              <a
                href={tiktokLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-stone-900 px-6 py-3.5 text-sm font-bold text-white shadow-xs hover:bg-stone-800 hover:shadow-md transition-all active:scale-[0.98]"
              >
                <span>Buka Profil TikTok</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Informasi Jam Kerja & Komitmen Respon */}
        <div className="mt-10 rounded-2xl border border-line bg-paper/60 p-6 sm:p-7 backdrop-blur-xs flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4 text-left">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-seal-100 text-seal-700">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-ink">Jam Operasional Layanan Admin</h3>
              <p className="text-xs text-ink-soft mt-0.5">
                Setiap Hari (Senin – Minggu) pukul <strong>08.00 – 22.00 WIB</strong>.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 shrink-0">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Admin Siap Membantu</span>
          </div>
        </div>

        {/* Format Pengaduan Siap Salin */}
        <div className="mt-12">
          <ContactFormatCopy />
        </div>

        {/* Hal-Hal yang Sering Ditanyakan Sebelum Menghubungi Admin */}
        <div className="mt-14 rounded-3xl border border-line bg-paper p-8">
          <h3 className="font-display text-xl font-bold text-ink mb-4 flex items-center gap-2">
            <FileQuestion className="h-5 w-5 text-seal-600" />
            Pertanyaan yang Sering Diajukan Saat Ada Kendala
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 text-sm">
            <div className="rounded-2xl border border-line/60 bg-page/60 p-4">
              <h4 className="font-semibold text-ink">Sudah bayar tapi status belum terverifikasi?</h4>
              <p className="mt-1.5 text-xs text-ink-soft leading-relaxed">
                Kirim tangkapan layar bukti pembayaran QRIS dari aplikasi bank/e-wallet Anda ke WhatsApp admin.
                Admin akan segera melakukan verifikasi manual dalam 1-5 menit.
              </p>
            </div>
            <div className="rounded-2xl border border-line/60 bg-page/60 p-4">
              <h4 className="font-semibold text-ink">Tautan surat hilang atau belum sempat tersimpan?</h4>
              <p className="mt-1.5 text-xs text-ink-soft leading-relaxed">
                Sampaikan nama pengirim dan nama penerima surat ke admin WhatsApp. Admin dapat mencari
                kembali arsip tautan surat yang telah terbit.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
