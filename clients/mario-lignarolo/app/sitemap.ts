import type { MetadataRoute } from "next";

export const dynamic = "force-static";
import { site } from "@/data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: site.url, changeFrequency: "monthly", priority: 1 }];
}
