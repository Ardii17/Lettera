"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Heart,
  PartyPopper,
  GraduationCap,
  Sparkles,
  Mail,
  HeartHandshake,
  Search,
  X,
  Sparkle,
  ArrowRight,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { buttonStyles } from "@/components/ui/button";
import { Badge } from "@/components/ui/card";
import { TemplateCard } from "./template-card";
import {
  TEMPLATE_CATEGORIES,
  getCategoryMeta,
  type CategoryMeta,
} from "@/templates/categories";
import type { TemplateMeta } from "@/templates/types";

interface TemplateCatalogProps {
  templates: TemplateMeta[];
}

const CATEGORY_ICONS = {
  Heart,
  PartyPopper,
  GraduationCap,
  Sparkles,
  Mail,
  HeartHandshake,
};

export function TemplateCatalog({ templates }: TemplateCatalogProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Kelompokkan template berdasarkan kategori induk
  const categoryGroups = useMemo(() => {
    const groups = new Map<
      string,
      { category: CategoryMeta; templates: TemplateMeta[] }
    >();

    // Inisialisasi semua kategori yang terdaftar
    for (const cat of TEMPLATE_CATEGORIES) {
      groups.set(cat.id, { category: cat, templates: [] });
    }

    // Masukkan tiap template ke kategorinya
    for (const template of templates) {
      const catMeta = getCategoryMeta(template.category);
      const existing = groups.get(catMeta.id);
      if (existing) {
        existing.templates.push(template);
      } else {
        groups.set(catMeta.id, { category: catMeta, templates: [template] });
      }
    }

    return groups;
  }, [templates]);

  // Hitung total template per kategori
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: templates.length };
    for (const [id, group] of categoryGroups.entries()) {
      counts[id] = group.templates.length;
    }
    return counts;
  }, [templates, categoryGroups]);

  // Filter berdasarkan search query dan tab kategori aktif
  const filteredSections = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const result: Array<{ category: CategoryMeta; templates: TemplateMeta[] }> =
      [];

    for (const [id, group] of categoryGroups.entries()) {
      // Jika filter kategori aktif dan bukan 'all', lewati yang tidak sesuai
      if (activeCategory !== "all" && activeCategory !== id) {
        continue;
      }

      // Filter template di dalam kategori ini berdasarkan kata kunci
      const matchingTemplates = group.templates.filter((tpl) => {
        if (!query) return true;
        return (
          tpl.name.toLowerCase().includes(query) ||
          tpl.tagline.toLowerCase().includes(query) ||
          tpl.description.toLowerCase().includes(query) ||
          tpl.category.toLowerCase().includes(query) ||
          tpl.highlights.some((h) => h.toLowerCase().includes(query))
        );
      });

      // Bila sedang search, hanya tampilkan seksi jika ada template yang cocok
      if (query && matchingTemplates.length === 0) {
        continue;
      }

      // Bila tidak sedang search, tampilkan seksi yang memiliki template atau kategori yang aktif dipilih
      if (!query) {
        if (matchingTemplates.length > 0 || activeCategory === id) {
          result.push({
            category: group.category,
            templates: matchingTemplates,
          });
        }
      } else {
        result.push({
          category: group.category,
          templates: matchingTemplates,
        });
      }
    }

    return result;
  }, [categoryGroups, activeCategory, searchQuery]);

  const totalFilteredCount = filteredSections.reduce(
    (acc, sec) => acc + sec.templates.length,
    0,
  );

  return (
    <div className="space-y-6">
      {/* Bar Navigasi Kategori & Search */}
      <div className="flex flex-col gap-5 border-b border-line pb-6 md:flex-row md:items-center md:justify-between">
        {/* Tab Pills Navigasi Kategori */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none md:pb-0">
          <button
            type="button"
            onClick={() => setActiveCategory("all")}
            className={cn(
              "inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all",
              activeCategory === "all"
                ? "bg-ink text-paper shadow-sm"
                : "bg-paper border border-line text-ink-soft hover:border-line-strong hover:text-ink",
            )}
          >
            <span>Semua Kategori</span>
            <span
              className={cn(
                "rounded-full px-1.5 py-0.5 text-xs font-semibold",
                activeCategory === "all"
                  ? "bg-white/20 text-white"
                  : "bg-page-deep text-ink-muted",
              )}
            >
              {categoryCounts.all ?? 0}
            </span>
          </button>

          {TEMPLATE_CATEGORIES.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.icon] ?? Mail;
            const count = categoryCounts[cat.id] ?? 0;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all",
                  isActive
                    ? "bg-ink text-paper shadow-sm"
                    : "bg-paper border border-line text-ink-soft hover:border-line-strong hover:text-ink",
                )}
              >
                <Icon
                  className={cn(
                    "h-3.5 w-3.5",
                    isActive ? "text-paper" : cat.colorClass.iconColor,
                  )}
                  aria-hidden
                />
                <span>{cat.name}</span>
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 text-xs font-semibold",
                    isActive
                      ? "bg-white/20 text-white"
                      : count > 0
                        ? "bg-page-deep text-ink-muted"
                        : "bg-amber-50 text-amber-700 ring-1 ring-amber-200/60",
                  )}
                >
                  {count > 0 ? count : "Segera"}
                </span>
              </button>
            );
          })}
        </div>

        {/* Input Pencarian Cepat */}
        <div className="relative w-full md:w-72">
          <Search
            className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-ink-muted"
            aria-hidden
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari tema atau suasana…"
            className="w-full rounded-full border border-line bg-paper py-2 pr-9 pl-10 text-sm text-ink placeholder:text-ink-muted focus:border-ink focus:ring-1 focus:ring-ink focus:outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-ink-muted hover:text-ink"
              aria-label="Hapus pencarian"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Keterangan hasil pencarian jika sedang aktif */}
      {searchQuery && (
        <div className="flex items-center justify-between rounded-xl bg-page-deep px-4 py-2.5 text-sm text-ink-soft">
          <p>
            Menampilkan <span className="font-semibold text-ink">{totalFilteredCount}</span> tema layout untuk kata kunci &ldquo;{searchQuery}&rdquo;
          </p>
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="text-xs font-medium text-seal-600 hover:underline"
          >
            Hapus filter kata kunci
          </button>
        </div>
      )}

      {/* Tampilan Seksi Berdasarkan Kategori */}
      {filteredSections.length > 0 ? (
        <div className="space-y-16">
          {filteredSections.map(({ category, templates: catTemplates }) => {
            const Icon = CATEGORY_ICONS[category.icon] ?? Mail;

            return (
              <section
                key={category.id}
                id={`category-${category.id}`}
                className="scroll-mt-24 space-y-6"
              >
                {/* Header Seksi Kategori */}
                <div className="flex flex-col gap-3 rounded-2xl border border-line bg-paper p-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
                        category.colorClass.iconBg,
                      )}
                    >
                      <Icon
                        className={cn("h-6 w-6", category.colorClass.iconColor)}
                        aria-hidden
                      />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2.5">
                        <h2 className="font-display text-2xl font-bold tracking-tight text-ink">
                          {category.name}
                        </h2>
                        <Badge className={category.colorClass.badge}>
                          {catTemplates.length > 0
                            ? `${catTemplates.length} Desain Layout`
                            : "Dalam Pengembangan"}
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm text-ink-soft">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {catTemplates.length > 0 && activeCategory === "all" && (
                    <button
                      type="button"
                      onClick={() => setActiveCategory(category.id)}
                      className="inline-flex shrink-0 items-center gap-1.5 text-xs font-medium text-ink-muted hover:text-ink"
                    >
                      <span>Fokus kategori ini</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                {/* Grid Template atau Placeholder Segera Hadir */}
                {catTemplates.length > 0 ? (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {catTemplates.map((template) => (
                      <TemplateCard key={template.slug} template={template} />
                    ))}
                  </div>
                ) : (
                  /* Kartu Coming Soon untuk kategori yang belum punya tema terpasang */
                  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line bg-paper px-6 py-12 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-page-deep text-ink-muted">
                      <Clock className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                      Tema {category.name} Segera Hadir
                    </h3>
                    <p className="mt-2 max-w-md text-sm text-ink-soft">
                      Kami sedang merancang beragam tema layout menarik untuk
                      kategori ini (vintage floral, modern minimalist, scrapbook,
                      dan animasi interaktif).
                    </p>
                    <div className="mt-6 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setActiveCategory("all")}
                        className={buttonStyles({
                          variant: "outline",
                          size: "sm",
                        })}
                      >
                        Lihat Kategori Lain
                      </button>
                    </div>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      ) : (
        /* Empty State ketika pencarian tidak menemukan hasil */
        <div className="flex flex-col items-center justify-center rounded-2xl border border-line bg-paper px-6 py-16 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-page-deep text-ink-muted">
            <Search className="h-5 w-5" />
          </div>
          <h3 className="mt-4 font-display text-xl font-semibold text-ink">
            Tidak ada template yang cocok
          </h3>
          <p className="mt-2 max-w-md text-sm text-ink-soft">
            Tidak ditemukan template dengan kata kunci &ldquo;{searchQuery}
            &rdquo; pada kategori yang dipilih.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className={buttonStyles({ size: "sm" })}
            >
              Reset Filter & Pencarian
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
