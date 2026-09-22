import { Container } from "@/components/ui/container";
import { XCircle, CheckCircle2, HeartHandshake } from "lucide-react";

export function ExperienceComparison() {
  const painPoints = [
    "Cepat tenggelam dan tertimbun ribuan pesan chat sehari-hari",
    "Format teks polos yang kaku tanpa sentuhan emosi artistik",
    "Foto kenangan terkirim terpisah dan pecah akibat kompresi",
    "Tidak ada musik latar yang mengikat suasana kenangan kalian berdua",
    "Mudah terhapus atau terlupakan begitu saja setelah beberapa minggu",
  ];

  const valuePoints = [
    "Satu halaman web eksklusif yang aktif selamanya dan layak disimpan",
    "Tipografi mewah dengan animasi lilin segel (wax seal) & amplop interaktif",
    "Galeri foto polaroid resolusi tinggi dengan efek lightbox sinematik",
    "Pemutar musik romantis latar yang langsung mengalun saat surat dibuka",
    "Bisa diunduh jadi kartu QR Code elegan untuk diselipkan di kado fisik atau bunga",
  ];

  return (
    <section className="border-y border-line bg-paper/40 py-20 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-seal-50 px-3 py-1 text-xs font-semibold text-seal-700 ring-1 ring-seal-200 mb-3">
            <HeartHandshake className="h-3.5 w-3.5 text-seal-600" />
            Sentuhan yang Membedakan
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Kenapa Surat Digital Lettera Terasa Begitu Berbeda?
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-ink-soft">
            Sebuah kalimat tulus berhak mendapatkan perlakuan istimewa. Jangan biarkan kata-kata
            terindahmu hanya jadi sebaris teks chat biasa.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {/* Sisi Chat Biasa */}
          <div className="rounded-3xl border border-line bg-paper/80 p-7 sm:p-9 shadow-xs">
            <div className="flex items-center justify-between border-b border-line pb-4 mb-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
                  Metode Biasa
                </span>
                <h3 className="font-display text-xl font-bold text-ink mt-0.5">
                  Teks Chat Aplikasi
                </h3>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                Mudah Dilupakan
              </span>
            </div>

            <ul className="space-y-4">
              {painPoints.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-ink-soft">
                  <XCircle className="h-5 w-5 shrink-0 text-red-400 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sisi Lettera Digital Letter */}
          <div className="relative rounded-3xl border-2 border-seal-500/60 bg-paper p-7 sm:p-9 shadow-lift">
            {/* Top Recommended Tag */}
            <div className="absolute -top-3 right-8 rounded-full bg-seal-600 px-3.5 py-0.5 text-[11px] font-bold text-white shadow-xs tracking-wide uppercase">
              Pengalaman Penuh Kesan
            </div>

            <div className="flex items-center justify-between border-b border-line pb-4 mb-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-seal-700">
                  Bersama Lettera
                </span>
                <h3 className="font-display text-xl font-bold text-ink mt-0.5">
                  Surat Digital Interaktif
                </h3>
              </div>
              <span className="rounded-full bg-seal-100 px-3 py-1 text-xs font-bold text-seal-800">
                Disimpan Selamanya
              </span>
            </div>

            <ul className="space-y-4">
              {valuePoints.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm font-medium leading-relaxed text-ink">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-seal-600 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
