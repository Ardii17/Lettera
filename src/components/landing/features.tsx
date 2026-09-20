import { EyeOff, Layers, Link2, QrCode, Smartphone, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";

const features = [
  {
    icon: Layers,
    title: "Template yang benar-benar berbeda",
    body: "Bukan satu layout dengan empat warna. Tiap template punya tata letak, tipografi, dan detailnya sendiri.",
  },
  {
    icon: Sparkles,
    title: "Preview langsung",
    body: "Apa yang kamu ketik langsung muncul dalam bentuk akhirnya, bukan perkiraan.",
  },
  {
    icon: Link2,
    title: "Satu tautan untuk satu surat",
    body: "Setiap surat punya token acak sendiri. Tidak berurutan, tidak bisa ditebak dari surat lain.",
  },
  {
    icon: Smartphone,
    title: "Dibuka dari mana saja",
    body: "Dirancang untuk layar ponsel lebih dulu, karena di situlah tautannya akan dibuka.",
  },
  {
    icon: EyeOff,
    title: "Tidak muncul di pencarian",
    body: "Halaman surat diberi noindex dan hanya bisa diakses lewat tautan yang kamu bagikan.",
  },
  {
    icon: QrCode,
    title: "Pembayaran Instan via QRIS",
    body: "Selesai mengisi surat, langsung bayar via QRIS tanpa perlu registrasi akun atau kata sandi.",
  },
];

export function Features() {
  return (
    <section className="border-y border-line bg-paper py-20">
      <Container>
        <div className="max-w-xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Hal kecil yang membuatnya terasa serius
          </h2>
        </div>

        <div className="mt-12 grid gap-x-10 gap-y-11 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title}>
              <feature.icon className="h-5 w-5 text-seal-500" strokeWidth={1.75} aria-hidden />
              <h3 className="mt-4 text-lg font-semibold text-ink">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{feature.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
