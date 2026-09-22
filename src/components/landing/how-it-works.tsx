import { Container } from "@/components/ui/container";
import { Sparkles, LayoutTemplate, PenLine, Sliders, Send } from "lucide-react";

const steps = [
  {
    icon: LayoutTemplate,
    step: "01",
    title: "Pilih Desain Template",
    body: "Tersedia puluhan tema artistik mulai dari romansa, perayaan ulang tahun, wisuda, hingga pertemanan. Lihat sampel penuh sebelum memilih.",
    badge: "Banyak Pilihan",
  },
  {
    icon: PenLine,
    step: "02",
    title: "Tulis Pesan & Unggah Foto",
    body: "Formulir interaktif memudahkanmu mengisi nama penerima, cerita kenangan, kutipan manis, serta mengunggah foto polaroid terbaik.",
    badge: "Mudah & Cepat",
  },
  {
    icon: Sliders,
    step: "03",
    title: "Lihat Hasil Secara Langsung",
    body: "Apa yang kamu ketik langsung tampil di panel pratinjau real-time. Sesuaikan palet warna dan lagu latar favorit sesuai selera.",
    badge: "Pratinjau Nyata",
  },
  {
    icon: Send,
    step: "04",
    title: "Bayar QRIS & Kirim Tautan",
    body: "Selesaikan pembayaran Rp 15.000 via QRIS tanpa perlu login akun. Tautan rahasia dan kartu QR siap dikirim seketika.",
    badge: "Langsung Aktif",
  },
];

export function HowItWorks() {
  return (
    <section id="cara-kerja" className="border-t border-line bg-paper/50 py-20 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-seal-50 px-3 py-1 text-xs font-semibold text-seal-700 ring-1 ring-seal-200 mb-3">
            <Sparkles className="h-3.5 w-3.5 text-seal-600" />
            Alur Sangat Sederhana
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Empat Langkah, Selesai dalam Dua Menit
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-ink-soft">
            Tidak ada pendaftaran akun yang berbelit-belit. Kamu fokus menulis pesan terbaikmu, kami
            yang merangkainya jadi karya digital yang memukau.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="relative flex flex-col justify-between rounded-3xl border border-line bg-paper p-7 shadow-xs hover:border-seal-400 hover:shadow-lift transition-all"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-3xl font-bold text-seal-600/40">
                      {item.step}
                    </span>
                    <span className="rounded-full bg-seal-50 px-2.5 py-0.5 text-[11px] font-semibold text-seal-700 border border-seal-200">
                      {item.badge}
                    </span>
                  </div>

                  <div className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-seal-100 text-seal-700">
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3 className="font-display text-lg font-bold text-ink mt-4">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {item.body}
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
