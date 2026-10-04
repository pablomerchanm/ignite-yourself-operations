import { testimonialsSection } from "@/data/content";
import { testimonials } from "@/data/testimonials";
import { Eyebrow } from "./ui";

/**
 * 09 — Prueba. Solo testimonios reales y aprobados: sin estrellas, sin
 * cifras. Mientras no haya ninguno, la sección no existe.
 */
export default function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <section aria-label="Testimonios" className="gutter bg-cream py-[clamp(5rem,4rem+8vw,11rem)] text-charcoal">
      <Eyebrow className="mb-12 text-charcoal/70">{testimonialsSection.eyebrow}</Eyebrow>
      <div className="space-y-[clamp(4rem,10vw,9rem)]">
        {testimonials.map((t) => (
          <figure key={t.quote} data-reveal="up" className="max-w-[60rem]">
            <blockquote className="display text-[clamp(2rem,1.3rem+2.6vw,4rem)] leading-[1.02]">
              <p>«{t.quote}»</p>
            </blockquote>
            <figcaption className="caps mt-8 text-charcoal/60">
              {t.name}
              {t.context ? ` · ${t.context}` : ""}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
