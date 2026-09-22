import { Container } from "@/components/ui/container";
import { Star, MailCheck, ShieldCheck, Zap } from "lucide-react";

export function SocialProofBar() {
  const stats = [
    {
      icon: MailCheck,
      value: "10.000+",
      label: "Surat Digital Dibuat",
      sub: "Untuk momen terindah di seluruh Indonesia",
    },
    {
      icon: Star,
      value: "4.9 / 5.0",
      label: "Tingkat Kepuasan",
      sub: "Dari 2.500+ ulasan penerima & pengirim",
    },
    {
      icon: ShieldCheck,
      value: "100% Privat",
      label: "Bebas Iklan & Login",
      sub: "Hanya penerima tautan yang bisa membaca",
    },
    {
      icon: Zap,
      value: "1x Bayar",
      label: "Aktif Selamanya",
      sub: "Tanpa biaya langganan atau perpanjangan",
    },
  ];

  return (
    <section className="border-b border-line bg-paper/60 py-8 backdrop-blur-xs">
      <Container>
        <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`flex flex-col items-center text-center sm:items-start sm:text-left ${
                  i !== 0 ? "border-line/60 sm:border-l sm:pl-8" : ""
                }`}
              >
                <div className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-seal-100 text-seal-700">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  {stat.value}
                </p>
                <p className="text-sm font-semibold text-ink-soft">{stat.label}</p>
                <p className="mt-0.5 text-xs text-ink-muted">{stat.sub}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
