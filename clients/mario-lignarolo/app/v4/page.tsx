import type { Metadata } from "next";
import Motion from "@/components/Motion";
import { site } from "@/data/content";
import { v3 } from "@/data/v3";
import { cormorant, geist, geistMono, poster } from "./fonts";
import Scrolly from "./Scrolly";
import Banner from "./sections/Banner";
import Contacto from "./sections/Contacto";
import Emprendimiento from "./sections/Emprendimiento";
import Footer from "./sections/Footer";
import Hero from "./sections/Hero";
import Hipertrofia from "./sections/Hipertrofia";
import Origen from "./sections/Origen";
import Perspectivas from "./sections/Perspectivas";
import Psico from "./sections/Psico";
import s from "./v4.module.css";

/**
 * /v4 — la iteración /v3 con la identidad gráfica aplicada
 * (marca/identidad/: tokens, voces y piezas; plan en aplicacion.md).
 * Iteración paralela: /v3 queda intacta para comparar. Mismo contenido
 * (data/v3.ts), mismo spec (marca/HOMEPAGE-SPEC-v1.md) y misma secuencia:
 * 01 Hero → 02 Origen → 03 Psicocibernética → 04 Hipertrofia del Ser →
 * 05 Emprendimiento / Lignarolo → 06 Perspectivas → 07 Contacto → pie.
 * Oculta: sin enlaces desde la web, fuera del sitemap y `noindex`.
 */
export const metadata: Metadata = {
  title: v3.meta.title,
  description: v3.meta.description,
  robots: { index: false, follow: false },
};

export default function V4() {
  return (
    <div className={`${s.page} ${poster.variable} ${geist.variable} ${geistMono.variable} ${cormorant.variable}`}>
      {site.draft && <p className={s.notice}>Borrador · iteración /v4 (identidad) · no indexada</p>}
      <div className={s.grain} aria-hidden="true" />
      <Hero />
      <main>
        <Origen />
        <Banner id="interno" />
        <Psico />
        <Banner id="musculo" />
        <Hipertrofia />
        <Emprendimiento />
        <Perspectivas />
        <Banner id="ser" />
        <Contacto />
      </main>
      <Footer />
      <Motion />
      <Scrolly />
    </div>
  );
}
