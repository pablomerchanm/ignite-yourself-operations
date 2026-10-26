import type { Metadata } from "next";
import Motion from "@/components/Motion";
import { site } from "@/data/content";
import { v3 } from "@/data/v3";
import { archivo } from "./fonts";
import Contacto from "./sections/Contacto";
import Emprendimiento from "./sections/Emprendimiento";
import Footer from "./sections/Footer";
import Hero from "./sections/Hero";
import Hipertrofia from "./sections/Hipertrofia";
import Origen from "./sections/Origen";
import Perspectivas from "./sections/Perspectivas";
import Psico from "./sections/Psico";
import s from "./v3.module.css";

/**
 * /v3 — iteración de la home según marca/HOMEPAGE-SPEC-v1.md.
 * Oculta: sin enlaces desde la web, fuera del sitemap y `noindex`.
 * Secuencia: 01 Hero → 02 Origen → 03 Psicocibernética → 04 Hipertrofia
 * del Ser → 05 Emprendimiento / Lignarolo → 06 Perspectivas → 07 Contacto
 * → pie. Una sección por archivo en ./sections; contenido en data/v3.ts;
 * estilos en v3.module.css; la grotesk condensada en ./fonts.ts.
 * Referencia visual principal: Nike About (about.nike.com).
 */
export const metadata: Metadata = {
  title: v3.meta.title,
  description: v3.meta.description,
  robots: { index: false, follow: false },
};

export default function V3() {
  return (
    <div className={`${s.page} ${archivo.variable}`}>
      {site.draft && <p className={s.notice}>{v3.notice}</p>}
      <div className={s.grain} aria-hidden="true" />
      <Hero />
      <main>
        <Origen />
        <Psico />
        <Hipertrofia />
        <Emprendimiento />
        <Perspectivas />
        <Contacto />
      </main>
      <Footer />
      <Motion />
    </div>
  );
}
