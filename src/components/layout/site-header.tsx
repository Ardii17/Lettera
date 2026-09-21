import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { buttonStyles } from "@/components/ui/button";
import { siteConfig } from "@/lib/constants";
import { MobileNav } from "./mobile-nav";

const links = [
  { label: "Template", href: "/templates" },
  { label: "Cara kerja", href: "/#cara-kerja" },
  { label: "Tentang", href: "/about" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-page/85 backdrop-blur-md">
      <Container className="relative flex h-16 items-center justify-between gap-4">
        <Link href="/" className="inline-flex items-center gap-2.5 group">
          <Image
            src="/images/logo.jpeg"
            alt="Logo Lettera"
            width={32}
            height={32}
            className="h-8 w-8 rounded-lg object-cover shadow-2xs transition-transform duration-200 group-hover:scale-105"
            priority
          />
          <span className="font-display text-lg font-semibold tracking-tight text-ink">
            {siteConfig.name}
          </span>
        </Link>

        <nav aria-label="Navigasi utama" className="hidden items-center gap-7 sm:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[0.95rem] text-ink-soft transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 sm:flex">
          <Link href="/templates" className={buttonStyles({ size: "sm" })}>
            Tulis surat
          </Link>
        </div>

        <MobileNav links={links} />
      </Container>
    </header>
  );
}
