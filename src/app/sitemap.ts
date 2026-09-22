import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/constants";
import { listTemplates } from "@/templates/registry";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/templates", "/about", "/contact", "/privacy", "/terms"].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const templateRoutes = listTemplates().map((template) => ({
    url: `${siteConfig.url}/templates/${template.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...templateRoutes];
}
