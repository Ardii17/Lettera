import type { TemplateMeta } from "@/templates/types";
import { TemplateCard } from "./template-card";

export function TemplateGrid({ templates }: { templates: TemplateMeta[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {templates.map((template) => (
        <TemplateCard key={template.slug} template={template} />
      ))}
    </div>
  );
}
