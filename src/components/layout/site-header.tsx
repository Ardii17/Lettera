"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutTemplate,
  Sparkles,
  HelpCircle,
  MessageCircle,
  PenLine,
  ArrowRight,
  Tag,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/constants";
import { MobileNav } from "./mobile-nav";

const navLinks = [
  {
    label: "Katalog Template",
    href: "/templates",
    icon: LayoutTemplate,
    badge: "35+",
  },
  {
    label: "Cara Kerja",
    href: "/#cara-kerja",
    icon: Sparkles,
  },
  {
    label: "Tanya Jawab",
    href: "/#faq",
    icon: HelpCircle,
  },
  {
    label: "Pengaduan",
    href: "/contact",
    icon: MessageCircle,
  },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="sticky top-0 z-40 w-full">
      {/* Top Banner Pengumuman Promo Halus */}
      <div className="bg-seal-700 px-4 py-1.5 text-center text-[11px] font-medium text-white/95 sm:text-xs">
        <div className="flex items-center justify-center gap-2">
          <Tag className="h-3 w-3 text-seal-300 animate-pulse shrink-0" />
          <span>
            Spesial Rilis: Buat surat digital aktif selamanya hanya{" "}
            <strong className="text-amber-200">Rp 15.000</strong> (Diskon 70%)
          </span>
          <Link
            href="/templates"
            className="hidden sm:inline-flex items-center gap-0.5 underline underline-offset-2 hover:text-amber-200 ml-1 font-semibold"
          >
            Pilih Template <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {/* Bar Navigasi Utama */}
      <header
        className={`w-full border-b transition-all duration-200 ${
          scrolled
            ? "border-line bg-page/90 backdrop-blur-md shadow-xs py-2.5"
            : "border-line/60 bg-page/80 backdrop-blur-sm py-3.5"
        }`}
      >
        <Container className="relative flex items-center justify-between gap-4">
          {/* Logo & Identitas Brand */}
          <Link href="/" className="inline-flex items-center gap-3 group shrink-0">
            <div className="relative">
              <Image
                src="/images/logo.jpeg"
                alt="Logo Lettera"
                width={36}
                height={36}
                className="h-9 w-9 rounded-xl object-cover ring-2 ring-seal-200/90 shadow-2xs transition-transform duration-200 group-hover:scale-105"
                priority
              />
              <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-seal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-seal-600"></span>
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-display text-xl font-bold tracking-tight text-ink">
                  {siteConfig.name}
                </span>
                <span className="hidden sm:inline-flex rounded-full bg-seal-100 px-2 py-0.5 text-[10px] font-semibold text-seal-800 border border-seal-200">
                  Studio
                </span>
              </div>
              <span className="hidden md:inline text-[10px] font-medium text-ink-muted -mt-0.5">
                Surat Digital & Momen Spesial
              </span>
            </div>
          </Link>

          {/* Menu Navigasi Tengah (Pill Nav) */}
          <nav
            aria-label="Navigasi utama"
            className="hidden items-center gap-1 lg:flex rounded-full border border-line/80 bg-paper/80 px-3 py-1.5 shadow-2xs backdrop-blur-xs"
          >
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold text-ink-soft hover:bg-page hover:text-ink transition-all"
                >
                  <Icon className="h-3.5 w-3.5 text-seal-600" />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="rounded-full bg-seal-100 px-1.5 py-0.5 text-[9px] font-bold text-seal-800">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Sisi Kanan: Live Indicator & Tombol Tulis Surat */}
          <div className="hidden sm:flex items-center gap-3">
            <div className="hidden xl:flex items-center gap-2 rounded-full border border-line/70 bg-paper/60 px-3 py-1 text-xs">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-medium text-ink-soft">
                Promo: <strong className="text-seal-700">Rp 15.000</strong>
              </span>
            </div>

            <Link
              href="/templates"
              className="group inline-flex items-center gap-2 rounded-full bg-seal-600 px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-seal-700 hover:shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <PenLine className="h-3.5 w-3.5 transition-transform group-hover:-rotate-12" />
              <span>Tulis Surat</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Menu Navigasi Mobile */}
          <MobileNav links={navLinks} />
        </Container>
      </header>
    </div>
  );
}
