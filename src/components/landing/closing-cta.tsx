import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, Heart } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonStyles } from "@/components/ui/button";

export function ClosingCta() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="envelope-lining relative overflow-hidden rounded-3xl border-2 border-seal-300/80 bg-paper px-7 py-16 text-center sm:px-16 shadow-lift">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-seal-800 shadow-2xs backdrop-blur-xs mb-4">
            <Sparkles className="h-3.5 w-3.5 text-seal-600 animate-pulse" />
            Promo Terbatas Rilis Perdana
          </div>

          <h2 className="mx-auto max-w-2xl font-display text-3xl leading-tight font-bold tracking-tight text-ink sm:text-[2.8rem]">
            Ada Pesan Tulus yang Sudah Lama Ingin Kamu Sampaikan?
          </h2>

          <p className="mx-auto mt-4 max-w-lg text-base sm:text-lg leading-relaxed text-ink-soft">
            Tulis sekarang selagi perasaannya masih hangat. Hanya butuh dua menit untuk menciptakan
            kado digital yang akan mereka kenang selamanya.
          </p>

          {/* Pricing Pill */}
          <div className="mt-7 inline-flex items-baseline gap-2 rounded-2xl bg-seal-50 px-5 py-2.5 border border-seal-200">
            <span className="text-xs font-medium text-ink-muted line-through">Rp 50.000</span>
            <span className="font-display text-2xl font-bold text-seal-700">Rp 15.000</span>
            <span className="text-xs text-ink-soft">/ surat aktif selamanya</span>
          </div>

          <div className="mt-8 flex flex-wrap justify-center items-center gap-3.5">
            <Link
              href="/create/romantic"
              className={buttonStyles({
                size: "lg",
                className:
                  "bg-seal-600 hover:bg-seal-700 text-white shadow-md hover:shadow-lg transition-all text-base px-8",
              })}
            >
              Mulai Tulis Surat Sekarang
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/templates"
              className={buttonStyles({
                variant: "outline",
                size: "lg",
                className: "hover:bg-page text-base",
              })}
            >
              Lihat Semua Koleksi Template
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-ink-muted">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-seal-600" />
              100% Pembayaran Aman via QRIS
            </span>
            <span className="flex items-center gap-1.5">
              <Heart className="h-4 w-4 text-seal-600" />
              Garansi Kepuasan Momen Istimewa
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
