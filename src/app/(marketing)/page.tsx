import { ClosingCta } from "@/components/landing/closing-cta";
import { Features } from "@/components/landing/features";
import { Hero } from "@/components/landing/hero";
import { HowItWorks } from "@/components/landing/how-it-works";
import { TemplateShowcase } from "@/components/landing/template-showcase";
import { getAvailableTemplates } from "@/services/templates.service";

export default async function HomePage() {
  const templates = await getAvailableTemplates();

  return (
    <>
      <Hero />
      <TemplateShowcase templates={templates.slice(0, 3)} />
      <HowItWorks />
      <Features />
      <ClosingCta />
    </>
  );
}
