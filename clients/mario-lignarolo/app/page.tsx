import Contenido from "@/components/Contenido";
import Empezar from "@/components/Empezar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Hipertrofia from "@/components/Hipertrofia";
import Marquee from "@/components/Marquee";
import Motion from "@/components/Motion";
import Psicocibernetica from "@/components/Psicocibernetica";
import Sostener from "@/components/Sostener";
import Testimonials from "@/components/Testimonials";
import Timeline from "@/components/Timeline";
import { about, channels, site } from "@/data/content";

/**
 * La home como portada que lleva a cada cosa (no como página donde está
 * todo), en unas ocho pantallas:
 * PORTADA → EL GANCHO → PSICO-CIBERNÉTICA → (PRUEBA) → EL RECORRIDO
 * → SUS IDEAS → EL MÉTODO → ESCRITOS Y VIDEOS → TRES FORMAS DE EMPEZAR → PIE
 * La historia completa vive en /historia.
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
        <Psicocibernetica />
        <Testimonials />
        <Timeline />
        <Marquee />
        <Hipertrofia />
        <Contenido />
        <Empezar />
      </main>
      <Footer />
      <Motion />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
    </>
  );
}
