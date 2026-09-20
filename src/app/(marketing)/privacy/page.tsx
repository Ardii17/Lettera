import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Kebijakan privasi",
  description: `Data apa yang disimpan ${siteConfig.name} dan bagaimana surat kamu dilindungi.`,
  alternates: { canonical: "/privacy" },
};

const sections = [
  {
    title: "Data yang disimpan",
    body: "Alamat email dan nama tampilan untuk akun, serta isi surat yang kamu buat. Tidak ada data lain yang diminta.",
  },
  {
    title: "Siapa yang bisa membaca suratmu",
    body: "Hanya kamu dan siapa pun yang memegang tautan surat rahasia. Tautan berisi token acak yang unik dan tidak bisa ditebak dari surat lain.",
  },
  {
    title: "Mesin pencari",
    body: "Halaman surat diberi instruksi noindex dan diblokir lewat robots.txt sehingga tidak muncul di hasil pencarian.",
  },
  {
    title: "Keamanan data & pembayaran",
    body: "Data surat dan bukti pembayaran tersimpan secara aman tanpa memerlukan kata sandi akun.",
  },
];

export default function PrivacyPage() {
  return (
    <Container className="max-w-2xl py-16">
      <h1 className="font-display text-[2.2rem] leading-tight font-semibold tracking-tight text-ink">
        Kebijakan privasi
      </h1>
      <p className="mt-4 text-ink-soft">
        Ringkasan singkat tentang apa yang kami simpan. Dokumen ini contoh untuk produk demo dan
        perlu ditinjau ulang sebelum dipakai di produksi.
      </p>
      <div className="mt-10 space-y-8">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-lg font-semibold text-ink">{section.title}</h2>
            <p className="mt-2 leading-relaxed text-ink-soft">{section.body}</p>
          </section>
        ))}
      </div>
    </Container>
  );
}
