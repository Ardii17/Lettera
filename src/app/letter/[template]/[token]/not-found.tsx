import Link from "next/link";
import { buttonStyles } from "@/components/ui/button";

export default function LetterNotFound() {
  return (
    <main className="flex min-h-dvh items-center justify-center bg-page px-5 py-20">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl font-semibold text-ink">Surat ini tidak ditemukan</h1>
        <p className="mt-3 leading-relaxed text-ink-soft">
          Tautannya mungkin tidak lengkap saat disalin, atau pengirimnya sudah menghapus surat ini.
          Coba minta tautan barunya.
        </p>
        <Link href="/" className={buttonStyles({ className: "mt-8" })}>
          Tulis surat untuk seseorang
        </Link>
      </div>
    </main>
  );
}
