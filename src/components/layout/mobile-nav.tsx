"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, PenLine, ArrowRight, ShieldCheck, Tag } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface NavLinkItem {
  label: string;
  href: string;
  icon?: LucideIcon;
  badge?: string;
}

export function MobileNav({ links }: { links: NavLinkItem[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Tutup menu" : "Buka menu"}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-paper/80 text-ink shadow-2xs hover:bg-page transition-colors"
      >
        {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
      </button>

      {open ? (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full border-b border-line bg-paper px-6 py-6 shadow-lift animate-in fade-in slide-in-from-top-2 duration-200"
        >
          {/* Header Mobile Menu */}
          <div className="flex items-center justify-between pb-4 border-b border-line">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.jpeg"
                alt="Logo Lettera"
                width={32}
                height={32}
                className="h-8 w-8 rounded-lg object-cover ring-1 ring-seal-200"
              />
              <div>
                <span className="font-display text-base font-bold text-ink block">Lettera</span>
                <span className="text-[10px] text-ink-muted -mt-1 block">
                  Surat Digital & Momen Spesial
                </span>
              </div>
            </div>

            {/* Promo Pill */}
            <span className="inline-flex items-center gap-1 rounded-full bg-seal-100 px-2.5 py-0.5 text-[10px] font-bold text-seal-800 border border-seal-200">
              <Tag className="h-2.5 w-2.5 text-seal-600" />
              Promo Rp 15rb
            </span>
          </div>

          {/* Links Navigasi */}
          <nav className="mt-4 flex flex-col gap-1.5">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center justify-between rounded-xl px-3.5 py-3 text-sm font-semibold text-ink-soft hover:bg-page hover:text-ink transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {Icon && <Icon className="h-4 w-4 text-seal-600" />}
                    <span>{link.label}</span>
                  </div>
                  {link.badge && (
                    <span className="rounded-full bg-seal-100 px-2 py-0.5 text-[10px] font-bold text-seal-800">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Tombol Utama Mobile */}
          <div className="mt-6 pt-4 border-t border-line">
            <Link
              href="/templates"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-seal-600 py-3 text-sm font-bold text-white shadow-xs hover:bg-seal-700 transition-colors"
            >
              <PenLine className="h-4 w-4" />
              <span>Tulis Surat Sekarang</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <p className="mt-3 text-center text-[11px] text-ink-muted flex items-center justify-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-seal-600" />
              <span>100% Privat · Sekali bayar aktif selamanya</span>
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
