import { EyeOff, Layers, Link2, QrCode, Smartphone, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";

const features = [
  {
    icon: Layers,
    title: "Template Benar-Benar Berbeda",
    body: "Bukan satu layout dengan warna berbeda. Setiap template memiliki tata letak, ritme animasi, tipografi, dan kepribadiannya sendiri.",
  },
  {
    icon: Sparkles,
    title: "Pratinjau Instan (*Live Preview*)",
    body: "Setiap huruf yang kamu ketik langsung tercermin secara nyata pada pratinjau surat di sebelah formulir, tanpa perlu menebak.",
  },
  {
    icon: Link2,
    title: "Satu Tautan Unik & Rahasia",
    body: "Setiap surat dilindungi dengan token acak berkriptografi tinggi. Tidak berurutan dan tidak bisa ditebak oleh orang lain.",
  },
  {
    icon: Smartphone,
    title: "Optimal di Semua Layar Ponsel",
    body: "Dirancang cermat mengutamakan layar smartphone (*mobile-first*), di mana penerima akan membuka dan membacanya.",
  },
  {
    icon: EyeOff,
    title: "Terlindungi dari Mesin Pencari",
    body: "Semua surat pribadi otomatis diberi instruksi proteksi 'noindex' agar tidak terindeks oleh Google atau mesin pencari publik.",
  },
  {
    icon: QrCode,
    title: "Konfirmasi QRIS Otomatis",
    body: "Setelah surat selesai disusun, pembayaran diproses secara otomatis via QRIS. Tautan terbit seketika tanpa perlu verifikasi manual.",
  },
];

export function Features() {
  return (
    <section className="border-t border-line bg-paper/40 py-20 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-seal-50 px-3 py-1 text-xs font-semibold text-seal-700 ring-1 ring-seal-200 mb-3">
            <Sparkles className="h-3.5 w-3.5 text-seal-600" />
            Standar Kualitas & Keamanan
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Detail Kecil yang Membuatnya Terasa Istimewa
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-ink-soft">
            Kami memperhatikan setiap aspek teknis, privasi, dan keindahan visual agar momen berhargamu
            tersampaikan dengan sempurna.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl border border-line bg-paper p-7 shadow-xs hover:border-seal-400 hover:shadow-lift transition-all"
            >
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-seal-100 text-seal-700">
                <feature.icon className="h-5 w-5" strokeWidth={2} aria-hidden />
              </div>
              <h3 className="mt-5 text-lg font-bold text-ink">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{feature.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
