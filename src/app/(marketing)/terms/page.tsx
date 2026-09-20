import type { Metadata } from "next";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Syarat layanan",
  description: "Aturan pemakaian platform surat digital ini.",
  alternates: { canonical: "/terms" },
};

const terms = [
  {
    title: "Pemakaian yang wajar",
    body: "Gunakan platform ini untuk mengirim surat kepada orang yang kamu kenal. Konten yang melanggar hukum, mengancam, atau melecehkan akan dihapus.",
  },
  {
    title: "Kepemilikan konten",
    body: "Isi surat tetap milikmu. Kami hanya menyimpan dan menampilkannya sesuai tautan yang kamu bagikan.",
  },
  {
    title: "Ketersediaan layanan",
    body: "Ini produk demo. Layanan diberikan apa adanya tanpa jaminan ketersediaan penuh.",
  },
];

export default function TermsPage() {
  return (
    <Container className="max-w-2xl py-16">
      <h1 className="font-display text-[2.2rem] leading-tight font-semibold tracking-tight text-ink">
        Syarat layanan
      </h1>
      <div className="mt-10 space-y-8">
        {terms.map((item) => (
          <section key={item.title}>
            <h2 className="text-lg font-semibold text-ink">{item.title}</h2>
            <p className="mt-2 leading-relaxed text-ink-soft">{item.body}</p>
          </section>
        ))}
      </div>
    </Container>
  );
}
