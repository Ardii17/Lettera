import { Container } from "@/components/ui/container";
import { Star, Quote, Heart } from "lucide-react";

export function Testimonials() {
  const reviews = [
    {
      name: "Dinda Pratama",
      role: "Hadiah Anniversary ke-2",
      avatarBg: "bg-rose-100 text-rose-700",
      initials: "DP",
      stars: 5,
      story:
        "Pasanganku sampai berkaca-kaca pas buka tautan suratnya pas dinner anniversary kami. Pas amplop digitalnya disentuh, lagu favorit kami langsung mengalun dengan galeri polaroid kenangan. Jauh lebih berkesan daripada sekadar chat biasa!",
      templateUsed: "Romantic Tribute",
    },
    {
      name: "Fikri Ramadhan",
      role: "Ucapan Wisuda Sahabat",
      avatarBg: "bg-indigo-100 text-indigo-700",
      initials: "FR",
      stars: 5,
      story:
        "Fitur unduh kode QR-nya juara banget! Saya cetak lalu diselipkan di buket bunga wisuda sahabatku. Pas dia scan pakai kamera HP, langsung kebuka website perayaan wisuda lengkap dengan foto masa kuliah kami. Bener-bener anti-mainstream!",
      templateUsed: "Graduation Honors",
    },
    {
      name: "Natasha Aurelia",
      role: "Ulang Tahun Pacar (LDR)",
      avatarBg: "bg-amber-100 text-amber-700",
      initials: "NA",
      stars: 5,
      story:
        "Karena LDR Jakarta–Yogya, bingung mau kasih apa pas jam 00.00. Tepat pergantian hari, saya kirim link Lettera. Dia kaget banget ada love counter yang ngitung udah berapa hari kami barengan. Dia bilang ini kado paling menyentuh hati.",
      templateUsed: "Starlight Love",
    },
  ];

  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-seal-50 px-3 py-1 text-xs font-semibold text-seal-700 ring-1 ring-seal-200 mb-3">
            <Heart className="h-3.5 w-3.5 text-seal-600" />
            Cerita & Senyuman Mereka
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Dipercaya untuk Momen yang Tak Tergantikan
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-ink-soft">
            Lihat bagaimana ribuan orang mengabadikan perasaan terdalam mereka dan meninggalkan
            kenangan manis bagi orang tercinta.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {reviews.map((rev) => (
            <div
              key={rev.name}
              className="relative flex flex-col justify-between rounded-3xl border border-line bg-paper p-7 shadow-xs hover:border-seal-400 hover:shadow-lift transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500">
                    {[...Array(rev.stars)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="h-6 w-6 text-seal-300" />
                </div>

                <p className="mt-5 text-sm leading-relaxed text-ink-soft italic">
                  &ldquo;{rev.story}&rdquo;
                </p>
              </div>

              <div className="mt-8 border-t border-line/70 pt-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold ${rev.avatarBg}`}
                  >
                    {rev.initials}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-ink">{rev.name}</h4>
                    <p className="text-xs text-ink-muted">{rev.role}</p>
                  </div>
                </div>

                <span className="rounded-full bg-page-deep px-2.5 py-0.5 text-[10px] font-semibold text-ink-soft">
                  {rev.templateUsed}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
