import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";
import { buttonStyles } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/states";
import { LetterRow } from "@/components/dashboard/letter-row";
import { StatCard } from "@/components/dashboard/stat-card";
import { formatDateShort } from "@/lib/utils/format";
import { getLetterStats, getUserLetters } from "@/services/letters.service";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export default async function DashboardPage() {
  const [letters, stats] = await Promise.all([getUserLetters(5), getLetterStats()]);

  return (
    <div className="space-y-10">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-[1.9rem] leading-tight font-semibold tracking-tight text-ink">
            Suratku
          </h1>
          <p className="mt-2 text-ink-soft">Kelola surat yang sudah kamu buat dan tautannya.</p>
        </div>
        <Link href="/templates" className={buttonStyles()}>
          Tulis surat baru
        </Link>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Total surat" value={String(stats.total)} />
        <StatCard label="Dibuat bulan ini" value={String(stats.thisMonth)} />
        <StatCard
          label="Template dipakai"
          value={String(stats.templatesUsed)}
          hint={
            stats.lastCreatedAt ? `Terakhir ${formatDateShort(stats.lastCreatedAt)}` : undefined
          }
        />
      </div>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold text-ink">Terbaru</h2>
          {letters.length > 0 ? (
            <Link
              href="/dashboard/letters"
              className="text-sm text-ink-muted transition-colors hover:text-ink"
            >
              Lihat semua
            </Link>
          ) : null}
        </div>

        {letters.length > 0 ? (
          <div className="space-y-4">
            {letters.map((letter) => (
              <LetterRow key={letter.id} letter={letter} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<Mail className="h-7 w-7" strokeWidth={1.5} aria-hidden />}
            title="Belum ada surat di sini"
            description="Pilih satu template, tulis pesanmu, lalu bagikan tautannya. Surat yang sudah dibuat akan muncul di halaman ini."
            actionLabel="Pilih template"
            actionHref="/templates"
          />
        )}
      </section>
    </div>
  );
}
