import Link from "next/link";
import { buttonStyles } from "@/components/ui/button";

export default function EditLetterNotFound() {
  return (
    <div className="rounded-2xl border border-dashed border-line-strong bg-paper px-6 py-16 text-center">
      <h1 className="font-display text-xl font-semibold text-ink">Surat tidak ditemukan</h1>
      <p className="mt-2 text-ink-soft">
        Surat ini sudah dihapus atau bukan milik akun yang sedang kamu pakai.
      </p>
      <Link href="/dashboard/letters" className={buttonStyles({ className: "mt-6" })}>
        Kembali ke daftar surat
      </Link>
    </div>
  );
}
