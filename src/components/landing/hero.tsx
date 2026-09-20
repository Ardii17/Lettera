import Link from "next/link";
import { Container } from "@/components/ui/container";
import { buttonStyles } from "@/components/ui/button";
import { romanticTemplate } from "@/templates/romantic/definition";
import { TemplateRenderer } from "@/templates/renderer";

export function Hero() {
  return (
    <section className="envelope-lining relative overflow-hidden border-b border-line">
      <Container className="grid items-center gap-14 py-16 lg:grid-cols-[1.05fr_1fr] lg:py-24">
        <div>
          <h1 className="max-w-xl font-display text-[2.6rem] leading-[1.05] font-semibold tracking-[-0.02em] text-ink sm:text-[3.4rem]">
            Create something they&rsquo;ll remember.
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">
            Tulis surat digital dengan template yang sudah dirancang rapi, lihat hasilnya sambil
            mengetik, lalu kirim satu tautan. Penerimanya cukup membuka — tanpa aplikasi, tanpa akun.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/create/romantic" className={buttonStyles({ size: "lg" })}>
              Buat digital letter
            </Link>
            <Link href="/templates" className={buttonStyles({ variant: "outline", size: "lg" })}>
              Lihat template
            </Link>
          </div>

          <p className="mt-6 text-sm text-ink-muted">
            Gratis, siap dalam dua menit, dan hanya bisa dibuka lewat tautan yang kamu bagikan.
          </p>
        </div>

        <div className="relative">
          <div
            aria-hidden
            className="thumb-frame animate-settle mx-auto max-w-md overflow-hidden rounded-[1.75rem] border border-line bg-paper shadow-paper"
          >
            <div className="aspect-20/23 relative">
              <div className="thumb-canvas absolute top-0 left-0">
                <TemplateRenderer template="romantic" data={romanticTemplate.sample} />
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
