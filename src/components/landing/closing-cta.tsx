import Link from "next/link";
import { Container } from "@/components/ui/container";
import { buttonStyles } from "@/components/ui/button";

export function ClosingCta() {
  return (
    <section className="py-20">
      <Container>
        <div className="envelope-lining rounded-3xl border border-line px-7 py-16 text-center sm:px-16">
          <h2 className="mx-auto max-w-2xl font-display text-3xl leading-tight font-semibold tracking-tight text-ink sm:text-[2.6rem]">
            Ada kalimat yang sudah lama ingin kamu kirim?
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-ink-soft">
            Tulis sekarang selagi masih terasa. Dua menit, lalu tinggal kirim tautannya.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href="/create/romantic" className={buttonStyles({ size: "lg" })}>
              Buat digital letter
            </Link>
            <Link href="/templates" className={buttonStyles({ variant: "outline", size: "lg" })}>
              Lihat semua template
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
