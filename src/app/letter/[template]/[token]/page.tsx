import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TemplateRenderer, hasTemplateComponent } from "@/templates/renderer";
import { isValidTemplateSlug } from "@/templates/registry";
import { isValidPublicToken } from "@/lib/utils/token";
import { siteConfig } from "@/lib/constants";
import { getPublicLetter } from "@/services/letters.service";

type PageProps = { params: Promise<{ template: string; token: string }> };

// Selalu diambil segar supaya perubahan dari dashboard langsung terlihat penerima.
export const dynamic = "force-dynamic";

/**
 * Metadata sengaja generik: judul dan isi surat tidak pernah bocor ke preview
 * tautan maupun mesin pencari, dan halaman ini di-noindex.
 */
export const metadata: Metadata = {
  title: "Sebuah surat untukmu",
  description: `Sebuah surat digital dikirim lewat ${siteConfig.name}.`,
  robots: { index: false, follow: false, nocache: true },
  openGraph: {
    title: "Sebuah surat untukmu",
    description: "Seseorang menulis sesuatu untukmu.",
  },
};

export default async function PublicLetterPage({ params }: PageProps) {
  const { template, token } = await params;

  // Validasi bentuk parameter sebelum menyentuh database.
  if (!isValidTemplateSlug(template) || !hasTemplateComponent(template) || !isValidPublicToken(token)) {
    notFound();
  }

  const letter = await getPublicLetter(token);

  // Token harus cocok dengan template pada URL, agar tautan tidak bisa dimodifikasi.
  if (!letter || letter.templateSlug !== template) notFound();

  return (
    <main id="konten" className="min-h-dvh bg-page">
      <TemplateRenderer template={letter.templateSlug} data={letter.content} />

      <div className="border-t border-line bg-paper px-5 py-8 text-center">
        <p className="text-sm text-ink-soft">
          Surat ini dibuat di {siteConfig.name}.{" "}
          <Link href="/" className="font-medium text-seal-600 hover:text-seal-700">
            Buat suratmu sendiri
          </Link>
        </p>
      </div>
    </main>
  );
}
