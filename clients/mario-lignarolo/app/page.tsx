import Connect from "@/components/Connect";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Hipertrofia from "@/components/Hipertrofia";
import Lignarolo from "@/components/Lignarolo";
import Motion from "@/components/Motion";
import OriginStory from "@/components/OriginStory";
import PointOfView from "@/components/PointOfView";
import Psicocibernetica from "@/components/Psicocibernetica";
import Ser from "@/components/Ser";
import Sostener from "@/components/Sostener";
import Testimonials from "@/components/Testimonials";
import Watch from "@/components/Watch";
import Writing from "@/components/Writing";
import { about, channels, site } from "@/data/content";

/**
 * Orden de la experiencia, pensado para quien llega (un emprendedor que ya
 * logró cosas y se siente estancado), no como «producto → comprar»:
 * PERSONA → SU MOMENTO Y LA PREGUNTA → MÉTODO → CÓMO EMPEZAR (programa · «SER»)
 * → PRUEBA → QUIÉN ES MARIO (historia · hoy · Lignarolo) → IDEAS → ESCRITOS → VIDEOS → CONEXIÓN
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
        <Sostener />
        <Hipertrofia />
        <Psicocibernetica />
        <Ser />
        <Testimonials />
        <OriginStory />
        <Lignarolo />
        <PointOfView />
        <Writing />
        <Watch />
        <Connect />
      </main>
      <Footer />
      <Motion />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
    </>
  );
}
