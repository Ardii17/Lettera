"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Tag,
  Star,
  ShieldCheck,
  Music,
  Smartphone,
  Infinity,
  ArrowRight,
  Heart,
  PartyPopper,
  GraduationCap,
  Mail,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonStyles } from "@/components/ui/button";
import { romanticTemplate } from "@/templates/romantic/definition";
import { birthdayTemplate } from "@/templates/birthday/definition";
import { graduationTemplate } from "@/templates/graduation/definition";
import { weddingTemplate } from "@/templates/wedding/definition";
import { TemplateRenderer } from "@/templates/renderer";
import { listTemplates } from "@/templates/registry";

const PREVIEW_OPTIONS = [
  {
    slug: "romantic",
    label: "Romansa",
    icon: Heart,
    template: romanticTemplate,
  },
  {
    slug: "birthday",
    label: "Ulang Tahun",
    icon: PartyPopper,
    template: birthdayTemplate,
  },
  {
    slug: "graduation",
    label: "Wisuda",
    icon: GraduationCap,
    template: graduationTemplate,
  },
  {
    slug: "wedding",
    label: "Undangan",
    icon: Mail,
    template: weddingTemplate,
  },
];

export function Hero() {
  const [activeSlug, setActiveSlug] = useState("romantic");
  const totalTemplates = listTemplates().length;

  const currentPreview =
    PREVIEW_OPTIONS.find((opt) => opt.slug === activeSlug) ?? PREVIEW_OPTIONS[0];

  return (
    <section className="envelope-lining relative overflow-hidden border-b border-line">
      <Container className="grid items-center gap-12 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
        <div>
          {/* Badge Promo Awal Peluncuran & Social Proof Micro */}
          <div className="mb-5 flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-2 rounded-full border border-seal-200/90 bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-seal-800 shadow-2xs backdrop-blur-xs">
              <Sparkles className="h-3.5 w-3.5 text-seal-600 animate-pulse" />
              <span>
                Promo Rilis Perdana: <strong>Diskon 70%</strong>
              </span>
              <span className="rounded-full bg-seal-600 px-2 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                Terbatas
              </span>
            </div>

            {/* Micro Social Proof Rating */}
            <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-line bg-paper/80 px-3 py-1 text-xs text-ink-soft backdrop-blur-xs">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-current" />
                ))}
              </div>
              <span className="font-semibold text-ink">4.9/5</span>
              <span className="text-ink-muted">· 2.500+ Surat Terkirim</span>
            </div>
          </div>

          <h1 className="max-w-xl font-display text-[2.7rem] leading-[1.08] font-bold tracking-[-0.02em] text-ink sm:text-[3.5rem]">
            Kirim Surat Digital yang Tak Pernah Mereka Lupakan.
          </h1>

          <p className="mt-4 max-w-lg text-lg leading-relaxed text-ink-soft">
            Tulis pesan tulusmu dengan template interaktif eksklusif, diiringi lagu kenangan berdua,
            galeri foto, dan efek sinematik. Penerima cukup membuka tautan — tanpa aplikasi, tanpa login.
          </p>

          {/* Iklan Harga Promo Peluncuran */}
          <div className="mt-6 max-w-lg rounded-2xl border border-seal-200/90 bg-white/95 p-4 shadow-xs backdrop-blur-xs">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div className="flex items-baseline gap-2.5">
                <span className="text-sm sm:text-base font-medium text-ink-muted line-through">
                  Rp 50.000
                </span>
                <span className="font-display text-2xl sm:text-3xl font-bold text-seal-600">
                  Rp 15.000
                </span>
                <span className="text-xs text-ink-muted">/ surat</span>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-seal-100 px-2.5 py-0.5 text-xs font-bold text-seal-800 border border-seal-200">
                <Tag className="h-3 w-3 text-seal-600" />
                HEMAT 70%
              </span>
            </div>
            <div className="mt-2.5 border-t border-line/70 pt-2 flex flex-wrap items-center justify-between gap-1 text-xs text-ink-soft">
              <span>Sekali bayar via QRIS otomatis · Surat tersimpan aktif selamanya</span>
            </div>
          </div>

          {/* Tombol Aksi Utama */}
          <div className="mt-7 flex flex-wrap items-center gap-3.5">
            <Link
              href={`/create/${activeSlug}`}
              className={buttonStyles({
                size: "lg",
                className:
                  "bg-seal-600 hover:bg-seal-700 text-white shadow-md hover:shadow-lg transition-all text-base px-8",
              })}
            >
              Buat Digital Letter
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/templates"
              className={buttonStyles({
                variant: "outline",
                size: "lg",
                className: "hover:bg-page-deep/60 text-base",
              })}
            >
              Lihat {totalTemplates} Template
            </Link>
          </div>

          {/* Keunggulan Ringkas & Jaminan Trust */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center sm:gap-5 text-xs text-ink-muted border-t border-line/60 pt-5">
            <div className="flex items-center gap-1.5">
              <Infinity className="h-4 w-4 text-seal-600 shrink-0" />
              <span>Aktif Selamanya</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-seal-600 shrink-0" />
              <span>100% Privat & Rahasia</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Music className="h-4 w-4 text-seal-600 shrink-0" />
              <span>Musik & Galeri Foto</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Smartphone className="h-4 w-4 text-seal-600 shrink-0" />
              <span>Tanpa Download Aplikasi</span>
            </div>
          </div>
        </div>

        {/* Live Preview Card with Switcher */}
        <div className="relative">
          {/* Showcase Frame */}
          <div
            aria-hidden
            className="thumb-frame animate-settle mx-auto max-w-md overflow-hidden rounded-[1.75rem] border border-line bg-paper shadow-paper transition-transform duration-300 hover:scale-[1.01]"
          >
            <div className="aspect-20/23 relative">
              <div className="thumb-canvas absolute top-0 left-0">
                <TemplateRenderer
                  template={currentPreview.template.slug}
                  data={{
                    ...currentPreview.template.sample,
                    bgMusicUrl: "",
                    musicTitle: "",
                  }}
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between max-w-md mx-auto text-xs text-ink-muted px-2">
            <span>
              Tema: <strong className="text-ink">{currentPreview.template.name}</strong>
            </span>
            <Link
              href={`/create/${currentPreview.slug}`}
              className="font-semibold text-seal-600 hover:text-seal-700 hover:underline inline-flex items-center gap-1"
            >
              Coba template ini <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
