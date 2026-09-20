import Link from "next/link";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/constants";
import { listTemplates } from "@/templates/registry";

const groups = [
  {
    title: "Produk",
    links: [
      { label: "Semua template", href: "/templates" },
      { label: "Cara kerja", href: "/#cara-kerja" },
      { label: "Tentang", href: "/about" },
    ],
  },
  {
    title: "Ketentuan",
    links: [
      { label: "Privasi", href: "/privacy" },
      { label: "Syarat layanan", href: "/terms" },
    ],
  },
];

export function SiteFooter() {
  const templates = listTemplates().slice(0, 4);

  return (
    <footer className="mt-24 border-t border-line bg-paper">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-3">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-seal-500" aria-hidden />
            <span className="font-display text-lg font-semibold text-ink">{siteConfig.name}</span>
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-ink-soft">{siteConfig.description}</p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-ink">Template</h2>
          <ul className="mt-4 space-y-2.5">
            {templates.map((template) => (
              <li key={template.slug}>
                <Link
                  href={`/templates/${template.slug}`}
                  className="text-sm text-ink-soft transition-colors hover:text-ink"
                >
                  {template.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {groups.map((group) => (
          <div key={group.title}>
            <h2 className="text-sm font-semibold text-ink">{group.title}</h2>
            <ul className="mt-4 space-y-2.5">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-soft transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ink-muted">
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
          <p className="text-sm text-ink-muted">Dibuat untuk kalimat yang layak disimpan.</p>
        </Container>
      </div>
    </footer>
  );
}
