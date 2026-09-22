import { Container } from "@/components/ui/container";
import { Music, Image as ImageIcon, Clock, QrCode, Sparkles } from "lucide-react";

export function MultimediaFeatures() {
  const features = [
    {
      icon: Music,
      badge: "Audio Ambience",
      title: "Alunan Musik Latar Kenangan",
      description:
        "Pilih lagu yang menjadi saksi cerita kalian berdua. Pemutar musik elegan mengalun lembut secara otomatis saat amplop surat dibuka.",
      highlight: "Mendukung lagu romantis, akustik, lofi, dan instrumen",
    },
    {
      icon: ImageIcon,
      badge: "Memories Gallery",
      title: "Galeri Foto Polaroid Interaktif",
      description:
        "Tampilkan foto-foto kenangan berharga dengan bingkai polaroid estetik, catatan tanggal, dan pratinjau lightbox layar penuh.",
      highlight: "Foto resolusi tajam dengan tata letak artistik",
    },
    {
      icon: Clock,
      badge: "Real-time Tracker",
      title: "Penghitung Hari & Waktu Bersama",
      description:
        "Tampilkan detik, hari, dan tahun perjalanan hubungan kalian secara langsung (*live counter*). Pengingat abadi betapa berharganya setiap momen.",
      highlight: "Hitungan otomatis sinkron secara akurat",
    },
    {
      icon: QrCode,
      badge: "Physical Gift Ready",
      title: "Unduh Kode QR Khusus Siap Cetak",
      description:
        "Dapatkan gambar QR Code beresolusi tinggi setelah surat terbit. Tinggal cetak dan tempelkan di buket bunga wisuda, kotak hadiah, atau kartu ucapan.",
      highlight: "Bisa di-scan dengan kamera HP apa saja",
    },
  ];

  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-seal-50 px-3 py-1 text-xs font-semibold text-seal-700 ring-1 ring-seal-200 mb-3">
            <Sparkles className="h-3.5 w-3.5 text-seal-600" />
            Fitur Multimedia Eksklusif
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Lebih dari Sekadar Kata-Kata
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-ink-soft">
            Sentuh indera pendengaran dan penglihatan mereka dengan perpaduan audio, visual kenangan,
            dan kartu fisik yang mengharukan.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="group relative flex flex-col justify-between rounded-3xl border border-line bg-paper p-7 transition-all duration-300 hover:-translate-y-1 hover:border-seal-400 hover:shadow-lift"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-seal-100 text-seal-700 transition-colors group-hover:bg-seal-600 group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-page-deep px-2.5 py-0.5 text-[11px] font-semibold text-ink-muted">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-ink mt-5 group-hover:text-seal-700 transition-colors">
                    {feat.title}
                  </h3>

                  <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">
                    {feat.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-line/70 pt-4">
                  <p className="text-xs font-semibold text-seal-700 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-seal-500" />
                    {feat.highlight}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
