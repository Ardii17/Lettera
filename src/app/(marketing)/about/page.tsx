import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Tentang",
  description: `Apa itu ${siteConfig.name} dan kenapa surat digital masih terasa personal.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <Container className="max-w-2xl py-16">
      <h1 className="font-display text-[2.2rem] leading-tight font-semibold tracking-tight text-ink">
        Tentang {siteConfig.name}
      </h1>
      <div className="mt-6 space-y-5 text-[1.02rem] leading-[1.85] text-ink-soft">
        <p>
          Pesan panjang di aplikasi chat mudah tenggelam. {siteConfig.name} memberi tempat tersendiri
          untuk kalimat yang ingin kamu simpan: satu halaman, satu tautan, satu penerima.
        </p>
        <p>
          Kamu memilih template, mengisi form yang sudah disesuaikan dengan template itu, dan melihat
          hasilnya sambil menulis. Setelah selesai, surat mendapat tautan acak yang hanya bisa dibuka
          oleh orang yang kamu beri.
        </p>
        <p>
          Surat tidak muncul di mesin pencari, tidak bisa dijelajahi dari surat lain, dan terlindungi
          lewat tautan unik rahasia yang kamu bagikan.
        </p>
      </div>
    </Container>
  );
}
