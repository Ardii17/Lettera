import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { EmptyState } from "@/components/ui/states";
import { LetterRow } from "@/components/dashboard/letter-row";
import { getUserLetters } from "@/services/letters.service";

export const metadata: Metadata = {
  title: "Semua surat",
  robots: { index: false, follow: false },
};

export default async function DashboardLettersPage() {
  const letters = await getUserLetters();

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-[1.9rem] leading-tight font-semibold tracking-tight text-ink">
          Semua surat
        </h1>
        <p className="mt-2 text-ink-soft">
          {letters.length > 0
            ? `${letters.length} surat tersimpan di akunmu.`
            : "Surat yang kamu buat akan muncul di sini."}
        </p>
      </header>

      {letters.length > 0 ? (
        <div className="space-y-4">
          {letters.map((letter) => (
            <LetterRow key={letter.id} letter={letter} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Mail className="h-7 w-7" strokeWidth={1.5} aria-hidden />}
          title="Belum ada surat"
          description="Mulai dari satu template, isi formnya, dan tautan surat akan dibuat otomatis."
          actionLabel="Pilih template"
          actionHref="/templates"
        />
      )}
    </div>
  );
}
