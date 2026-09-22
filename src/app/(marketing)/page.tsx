import { Hero } from "@/components/landing/hero";
import { SocialProofBar } from "@/components/landing/social-proof-bar";
import { TemplateShowcase } from "@/components/landing/template-showcase";
import { ExperienceComparison } from "@/components/landing/experience-comparison";
import { MultimediaFeatures } from "@/components/landing/multimedia-features";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Features } from "@/components/landing/features";
import { Testimonials } from "@/components/landing/testimonials";
import { FaqSection } from "@/components/landing/faq-section";
import { ClosingCta } from "@/components/landing/closing-cta";
import { getAvailableTemplates } from "@/services/templates.service";

export default async function HomePage() {
  const templates = await getAvailableTemplates();

  return (
    <>
      {/* 1. Hero Section dengan Hook Emosional, Promo Rilis & Live Preview Switcher */}
      <Hero />

      {/* 2. Statistik Kepercayaan & Social Proof Bar */}
      <SocialProofBar />

      {/* 3. Showcase Template Interaktif dengan Filter Kategori */}
      <TemplateShowcase templates={templates} />

      {/* 4. Perbandingan Nilai: Pesan Biasa vs Surat Digital Lettera */}
      <ExperienceComparison />

      {/* 5. Sorotan Fitur Multimedia: Musik Kenangan, Galeri Foto, Love Counter, QR Code */}
      <MultimediaFeatures />

      {/* 6. 4 Langkah Mudah Alur Pembuatan */}
      <HowItWorks />

      {/* 7. Standar Keamanan & Keandalan Teknis */}
      <Features />

      {/* 8. Cerita & Ulasan Pengguna Nyata */}
      <Testimonials />

      {/* 9. Tanya Jawab (FAQ) Accordion Interaktif */}
      <FaqSection />

      {/* 10. Call to Action Penutup dengan Jaminan Kualitas */}
      <ClosingCta />
    </>
  );
}
