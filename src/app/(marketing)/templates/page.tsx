import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { EmptyState } from "@/components/ui/states";
import { TemplateGrid } from "@/components/templates/template-grid";
import { getAvailableTemplates } from "@/services/templates.service";

export const metadata: Metadata = {
  title: "Template surat digital",
  description:
    "Empat template surat digital dengan tata letak dan tipografi berbeda: romantis, ulang tahun, kelulusan, dan pertemanan.",
  alternates: { canonical: "/templates" },
};

export default async function TemplatesPage() {
  const templates = await getAvailableTemplates();

  return (
    <Container className="py-14 sm:py-20">
      <header className="max-w-2xl">
        <h1 className="font-display text-[2.2rem] leading-tight font-semibold tracking-tight text-ink sm:text-[2.8rem]">
          Template
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">
          Setiap template punya form, tata letak, dan tipografinya sendiri. Buka detailnya untuk
          melihat tampilan penuh sebelum mulai menulis.
        </p>
      </header>

      <div className="mt-12">
        {templates.length > 0 ? (
          <TemplateGrid templates={templates} />
        ) : (
          <EmptyState
            title="Template belum tersedia"
            description="Jalankan migrasi dan seed database Supabase untuk mengaktifkan template bawaan."
            actionLabel="Kembali ke beranda"
            actionHref="/"
          />
        )}
      </div>
    </Container>
  );
}
