import Link from "next/link";
import { buttonStyles } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="flex min-h-dvh items-center justify-center px-5 py-24">
      <div className="max-w-md text-center">
        <p className="font-display text-5xl font-semibold text-ink">404</p>
        <h1 className="mt-4 font-display text-2xl font-semibold text-ink">
          Halaman ini tidak ada
        </h1>
        <p className="mt-3 leading-relaxed text-ink-soft">
          Tautannya mungkin salah ketik atau halamannya sudah dipindahkan.
        </p>
        <Link href="/" className={buttonStyles({ className: "mt-8" })}>
          Kembali ke beranda
        </Link>
      </div>
    </main>
  );
}
