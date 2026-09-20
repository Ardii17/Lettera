import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Surat bersifat personal: tidak boleh diindeks maupun ditelusuri crawler.
      disallow: ["/letter/", "/created/", "/dashboard/", "/create/"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
