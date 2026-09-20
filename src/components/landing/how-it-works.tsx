import { Container } from "@/components/ui/container";

const steps = [
  {
    title: "Pilih template",
    body: "Empat gaya berbeda, dari yang tenang sampai yang ramai. Semuanya bisa dilihat penuh sebelum kamu mulai.",
  },
  {
    title: "Tulis pesanmu",
    body: "Form mengikuti template: nama penerima, isi surat, kutipan, tanda tangan. Tidak ada kolom yang tidak dipakai.",
  },
  {
    title: "Atur tampilannya",
    body: "Ubah nuansa warna dan detail kecil sambil melihat hasil aslinya di sebelah kanan.",
  },
  {
    title: "Bagikan tautannya",
    body: "Satu tautan unik untuk satu surat. Salin, kirim lewat WhatsApp, selesai.",
  },
];

export function HowItWorks() {
  return (
    <section id="cara-kerja" className="py-20">
      <Container>
        <div className="max-w-xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Empat langkah, dua menit
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            Tidak ada dashboard rumit. Kamu menulis, kami yang mengurus tampilannya.
          </p>
        </div>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title} className="bg-paper p-7">
              <span className="font-display text-2xl text-seal-500 tabular-nums">{index + 1}</span>
              <h3 className="mt-4 text-lg font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
