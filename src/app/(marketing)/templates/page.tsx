import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/states";
import { TemplateCatalog } from "@/components/templates/template-catalog";
import { getAvailableTemplates } from "@/services/templates.service";

export const metadata: Metadata = {
  title: "Katalog Template Surat Digital & Momen Spesial",
  description:
    "Pilihan template surat dan website tribut digital berdasarkan kategori momen: romansa, ulang tahun, kelulusan, pertemanan, dan momen spesial lainnya.",
  alternates: { canonical: "/templates" },
};

export default async function TemplatesPage() {
  const templates = await getAvailableTemplates();

  return (
    <Container className="py-12 sm:py-16">
      {/* Header Halaman */}
      <header className="max-w-3xl">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-seal-50 px-3 py-1 text-xs font-semibold text-seal-700 ring-1 ring-seal-200">
          Koleksi Surat Digital & Tribute
        </span>
        <h1 className="mt-4 font-display text-[2.2rem] leading-tight font-semibold tracking-tight text-ink sm:text-[2.8rem]">
          Temukan Template untuk Setiap Momen Berhargamu
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">
          Pilih kategori yang sesuai dengan momen spesialmu. Setiap kategori memiliki
          karakteristik desain, form interaktif, dan tema tata letak unik untuk
          menyampaikan pesanmu secara berkesan.
        </p>
      </header>

      {/* Katalog Template Terpisah Berdasarkan Kategori */}
      <div className="mt-10">
        {templates.length > 0 ? (
          <TemplateCatalog templates={templates} />
        ) : (
          <EmptyState
            title="Template belum tersedia"
            description="Template digital letter sedang dipersiapkan. Silakan periksa kembali beberapa saat lagi."
            actionLabel="Kembali ke beranda"
            actionHref="/"
          />
        )}
      </div>
    </Container>
  );
}
