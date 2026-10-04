import type { MetadataRoute } from "next";

export const dynamic = "force-static";
import { site } from "@/data/content";

export default function robots(): MetadataRoute.Robots {
  // En borrador no se indexa nada.
  return site.draft
    ? { rules: { userAgent: "*", disallow: "/" } }
    : { rules: { userAgent: "*", allow: "/" }, sitemap: `${site.url}/sitemap.xml` };
}
