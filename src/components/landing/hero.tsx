import Link from "next/link";
import { Sparkles, Tag } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonStyles } from "@/components/ui/button";
import { romanticTemplate } from "@/templates/romantic/definition";
import { TemplateRenderer } from "@/templates/renderer";

export function Hero() {
  return (
    <section className="envelope-lining relative overflow-hidden border-b border-line">
      <Container className="grid items-center gap-14 py-16 lg:grid-cols-[1.05fr_1fr] lg:py-24">
        <div>
          {/* Badge Promo Awal Peluncuran */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-seal-200/90 bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-seal-800 shadow-2xs backdrop-blur-xs">
            <Sparkles className="h-3.5 w-3.5 text-seal-600 animate-pulse" />
            <span>Spesial Awal Peluncuran: <strong>Diskon 70%</strong></span>
            <span className="rounded-full bg-seal-600 px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
              Terbatas
            </span>
          </div>

          <h1 className="max-w-xl font-display text-[2.6rem] leading-[1.05] font-semibold tracking-[-0.02em] text-ink sm:text-[3.4rem]">
            Create something they&rsquo;ll remember.
          </h1>

          <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-soft">
            Tulis surat digital dengan template yang sudah dirancang rapi, lihat hasilnya sambil
            mengetik, lalu kirim satu tautan. Penerimanya cukup membuka — tanpa aplikasi, tanpa akun.
          </p>

          {/* Iklan Harga Promo Peluncuran */}
          <div className="mt-7 max-w-lg rounded-2xl border border-seal-200/90 bg-white/95 p-4 shadow-xs backdrop-blur-xs">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div className="flex items-baseline gap-2.5">
                <span className="text-sm sm:text-base font-medium text-ink-muted line-through">
                  Rp 50.000
                </span>
                <span className="font-display text-2xl sm:text-3xl font-bold text-seal-600">
                  Rp 15.000
                </span>
                <span className="text-xs text-ink-muted">/ surat</span>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-bold text-rose-700 border border-rose-200">
                <Tag className="h-3 w-3" />
                HEMAT 70%
              </span>
            </div>
            <div className="mt-2.5 border-t border-line/70 pt-2 flex items-center justify-between text-xs text-ink-soft">
              <span>🎉 Harga promo rilis perdana (sekali bayar, surat aktif selamanya)</span>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link href="/create/romantic" className={buttonStyles({ size: "lg", className: "bg-seal-600 hover:bg-seal-700 text-white shadow-sm" })}>
              Buat digital letter
            </Link>
            <Link href="/templates" className={buttonStyles({ variant: "outline", size: "lg" })}>
              Lihat template
            </Link>
          </div>

          <p className="mt-5 text-sm text-ink-muted">
            Siap dalam dua menit, dan hanya bisa dibuka lewat tautan yang kamu bagikan.
          </p>
        </div>

        <div className="relative">
          <div
            aria-hidden
            className="thumb-frame animate-settle mx-auto max-w-md overflow-hidden rounded-[1.75rem] border border-line bg-paper shadow-paper"
          >
            <div className="aspect-20/23 relative">
              <div className="thumb-canvas absolute top-0 left-0">
                <TemplateRenderer
                  template="romantic"
                  data={{ ...romanticTemplate.sample, bgMusicUrl: "", musicTitle: "" }}
                />
              </div>
            </div>
          </div>

          <p className="mt-5 text-center text-sm text-ink-muted">
            Romantic Letter — salah satu dari {`${4}`} template yang tersedia
          </p>
        </div>
      </Container>
    </section>
  );
}
