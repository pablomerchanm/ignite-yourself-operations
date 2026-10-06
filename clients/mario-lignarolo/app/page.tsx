import AboutMario from "@/components/AboutMario";
import Connect from "@/components/Connect";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Hipertrofia from "@/components/Hipertrofia";
import Lignarolo from "@/components/Lignarolo";
import Motion from "@/components/Motion";
import OriginStory from "@/components/OriginStory";
import PointOfView from "@/components/PointOfView";
import Speaking from "@/components/Speaking";
import Psicocibernetica from "@/components/Psicocibernetica";
import Territories from "@/components/Territories";
import Testimonials from "@/components/Testimonials";
import Watch from "@/components/Watch";
import Writing from "@/components/Writing";
import { about, channels, site } from "@/data/content";

/**
 * Orden de la experiencia (no reordenar a «producto → comprar»):
 * PERSONA → PREGUNTA → HISTORIA → VISIÓN → IDEAS → PRODUCTO → EMPRENDER → CONTENIDO → PRUEBA → PLATAFORMA → CONEXIÓN
 */
export default function Home() {
  // schema.org: solo perfiles confirmados (los que tienen URL) y sin credenciales.
  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    image: `${site.url}${about.image.src}`,
    description: site.description,
    sameAs: Object.values(channels)
      .map((c) => c.href)
      .filter(Boolean),
  };

  return (
    <>
      <a
        href="#contenido"
        className="caps sr-only z-[60] bg-acid px-4 py-3 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido" tabIndex={-1} className="outline-none">
        <Hero />
        <OriginStory />
        <Territories />
        <Hipertrofia />
        <PointOfView />
        <Psicocibernetica />
        <Lignarolo />
        <Writing />
        <Watch />
        <Testimonials />
        <AboutMario />
        <Speaking />
        <Connect />
      </main>
      <Footer />
      <Motion />
      {site.draft && (
        <p className="caps pointer-events-none fixed bottom-3 left-3 z-40 rounded-full bg-bone/90 px-3 py-1.5 text-[0.6rem] text-ink shadow-sm">
          Borrador<span className="hidden sm:inline"> · vista previa</span>
        </p>
      )}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
    </>
  );
}
