import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/constants";
import { listTemplates } from "@/templates/registry";

const groups = [
  {
    title: "Produk",
    links: [
      { label: "Katalog Template", href: "/templates" },
      { label: "Cara Kerja", href: "/#cara-kerja" },
      { label: "Tentang Kami", href: "/about" },
    ],
  },
  {
    title: "Pengaduan & Bantuan",
    links: [
      { label: "Hubungi Admin", href: "/contact" },
      { label: "Tanya Jawab (FAQ)", href: "/#faq" },
      { label: "WhatsApp: 0852-1035-8521", href: "https://wa.me/6285210358521" },
      { label: "TikTok: @bykisahkarsa", href: "https://www.tiktok.com/@bykisahkarsa" },
    ],
  },
  {
    title: "Ketentuan",
    links: [
      { label: "Kebijakan Privasi", href: "/privacy" },
      { label: "Syarat Layanan", href: "/terms" },
    ],
  },
];

export function SiteFooter() {
  const templates = listTemplates().slice(0, 4);

  return (
    <footer className="mt-24 border-t border-line bg-paper">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <div className="space-y-3 sm:col-span-2 md:col-span-1 lg:col-span-2">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <Image
              src="/images/logo.jpeg"
              alt="Logo Lettera"
              width={32}
              height={32}
              className="h-8 w-8 rounded-lg object-cover shadow-2xs transition-transform duration-200 group-hover:scale-105 ring-1 ring-seal-200"
            />
            <span className="font-display text-lg font-bold text-ink">{siteConfig.name}</span>
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-ink-soft">{siteConfig.description}</p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 rounded-full bg-seal-50 px-3 py-1 text-xs font-semibold text-seal-700 border border-seal-200 hover:bg-seal-100 transition-colors"
            >
              <span>Layanan Pengaduan Pelanggan</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-ink">Template Populer</h2>
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
                    {...(link.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
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
            © {new Date().getFullYear()} {siteConfig.name}. Hak Cipta Dilindungi.
          </p>
          <p className="text-sm text-ink-muted">Dibuat untuk kalimat yang layak disimpan selamanya.</p>
        </Container>
      </div>
    </footer>
  );
}
