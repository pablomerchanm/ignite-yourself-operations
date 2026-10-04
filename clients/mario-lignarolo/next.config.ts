import type { NextConfig } from "next";

// STATIC_EXPORT=1 next build → `out/` estático (vista previa sin servidor Node).
const staticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(staticExport ? { output: "export" as const } : {}),
  // /links → la mini web estática (public/links), destino del enlace de la bio.
  // (En exportación estática no hay rewrites; ahí vive en /links/index.html.)
  ...(staticExport
    ? {}
    : { async rewrites() { return [{ source: "/links", destination: "/links/index.html" }]; } }),
  images: {
    unoptimized: staticExport,
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }],
  },
};

export default nextConfig;
