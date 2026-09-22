"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { TemplateCard } from "@/components/templates/template-card";
import type { TemplateMeta } from "@/templates/types";

export function TemplateShowcase({ templates }: { templates: TemplateMeta[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = useMemo(() => {
    const list = ["all"];
    const seen = new Set<string>();
    for (const t of templates) {
      if (t.category && !seen.has(t.category)) {
        seen.add(t.category);
        list.push(t.category);
      }
    }
    return list;
  }, [templates]);

  const filteredTemplates = useMemo(() => {
    if (selectedCategory === "all") return templates.slice(0, 6);
    return templates.filter((t) => t.category === selectedCategory).slice(0, 6);
  }, [templates, selectedCategory]);

  return (
    <section id="template" className="py-20 sm:py-24">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-seal-50 px-3 py-1 text-xs font-semibold text-seal-700 ring-1 ring-seal-200 mb-3">
              <Sparkles className="h-3.5 w-3.5 text-seal-600" />
              Katalog Pilihan Terpopuler
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Pilih Desain yang Paling Menggambarkan Ceritamu
            </h2>
            <p className="mt-3 text-base sm:text-lg leading-relaxed text-ink-soft">
              Setiap template memiliki tata letak, alunan musik, tipografi, dan animasi khusus. Tinggal
              isi pesannya, kami yang atur estetika visualnya.
            </p>
          </div>

          <Link
            href="/templates"
            className="group inline-flex items-center gap-2 text-[0.95rem] font-semibold text-seal-600 transition-colors hover:text-seal-700 shrink-0"
          >
            <span>Jelajahi Semua Template</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Category Pills Filter */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            const label = cat === "all" ? "Semua Tema" : cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-seal-600 text-white shadow-xs"
                    : "bg-paper border border-line text-ink-soft hover:border-line-strong hover:text-ink"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Grid Template Cards */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTemplates.map((template) => (
            <TemplateCard key={template.slug} template={template} />
          ))}
        </div>

        {/* Bottom Explorer Banner */}
        <div className="mt-12 rounded-2xl border border-line bg-paper/70 p-6 text-center sm:p-8 backdrop-blur-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h3 className="font-display text-lg font-bold text-ink">
              Mencari tema untuk momen lain?
            </h3>
            <p className="text-xs sm:text-sm text-ink-soft mt-0.5">
              Tersedia puluhan tema unik untuk anniversary, wisuda, perpisahan, ucapan maaf, hingga undangan.
            </p>
          </div>
          <Link
            href="/templates"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-2.5 text-xs font-semibold text-page hover:bg-ink/90 transition-all shrink-0"
          >
            <span>Buka Semua Template</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
