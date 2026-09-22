"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/container";

const FAQS = [
  {
    q: "Apakah penerima harus mengunduh aplikasi atau membuat akun?",
    a: "Tidak sama sekali. Penerima cukup mengklik tautan yang kamu kirimkan (lewat WhatsApp, DM, email) atau memindai kode QR. Surat akan langsung terbuka secara mulus di browser HP atau laptop mereka tanpa perlu login.",
  },
  {
    q: "Berapa lama surat digital ini aktif? Apakah ada biaya bulanan?",
    a: "Surat aktif selamanya! Cukup dengan sekali bayar promo Rp 15.000 saat penerbitan, tanpa biaya bulanan atau biaya perpanjangan apapun. Tautan kenangan kalian akan tetap bisa dibuka bertahun-tahun kemudian.",
  },
  {
    q: "Apakah surat saya aman dan tidak akan muncul di pencarian Google?",
    a: "100% aman dan privat. Setiap surat dilindungi dengan token unik acak dan tag proteksi 'noindex'. Mesin pencari seperti Google tidak akan mengindeks isi suratmu. Hanya orang yang memiliki tautan langsung yang bisa membacanya.",
  },
  {
    q: "Metode pembayaran apa saja yang didukung?",
    a: "Kami menggunakan QRIS instan otomatis. Kamu bisa membayar lewat GoPay, OVO, DANA, ShopeePay, serta semua aplikasi mobile banking di Indonesia (BCA, Mandiri, BRI, BNI, BSI, dll). Konfirmasi berlangsung otomatis dalam hitungan detik.",
  },
  {
    q: "Bisakah saya melihat tampilan surat sebelum melakukan pembayaran?",
    a: "Tentu saja! Editor Lettera dilengkapi panel Live Preview interaktif. Kamu bisa mengetik isi surat, mencoba variasi warna, mengatur foto polaroid, dan melihat hasil aslinya secara langsung sampai puas sebelum memutuskan untuk membayar.",
  },
  {
    q: "Bagaimana cara menggabungkannya dengan hadiah atau kado fisik?",
    a: "Setelah surat diterbitkan, kamu bisa langsung mengunduh gambar Kartu QR Code beresolusi tinggi. Tinggal cetak di kertas foto, lalu selipkan di dalam amplop kado, buket bunga wisuda, kotak perhiasan, atau bingkisan hadiah.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="border-t border-line bg-paper/30 py-20 sm:py-24">
      <Container className="max-w-3xl">
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-seal-50 px-3 py-1 text-xs font-semibold text-seal-700 ring-1 ring-seal-200 mb-3">
            <HelpCircle className="h-3.5 w-3.5 text-seal-600" />
            Tanya Jawab
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="mt-3 text-base text-ink-soft">
            Semua hal penting yang perlu kamu ketahui sebelum membuat surat pertamamu.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.q}
                className="overflow-hidden rounded-2xl border border-line bg-paper transition-colors hover:border-line-strong"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between p-5 text-left sm:p-6"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-base sm:text-lg font-semibold text-ink">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-seal-600 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="border-t border-line/60 px-5 pb-5 pt-3 sm:px-6 sm:pb-6 text-sm sm:text-base leading-relaxed text-ink-soft animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Banner Bantuan & Pengaduan Admin */}
        <div className="mt-10 rounded-2xl border border-line bg-paper/80 p-6 text-center sm:p-7 backdrop-blur-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h3 className="font-display text-base font-bold text-ink">
              Masih memiliki pertanyaan atau mengalami kendala?
            </h3>
            <p className="text-xs text-ink-soft mt-0.5">
              Admin siap membantu via WhatsApp (0852-1035-8521) dan TikTok (@bykisahkarsa).
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-seal-600 px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-seal-700 transition-colors shrink-0"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            <span>Pusat Pengaduan & Bantuan</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
