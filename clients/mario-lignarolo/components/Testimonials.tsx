import { testimonialsSection } from "@/data/content";
import { testimonials } from "@/data/testimonials";

/**
 * 04 — Prueba. Solo testimonios reales y aprobados: sin estrellas, sin
 * cifras. Mientras no haya ninguno, la sección no existe.
 */
export default function Testimonials() {
  if (testimonials.length === 0) return null;
  return (
    <section aria-label="Testimonios" className="gutter py-[clamp(4rem,3rem+6vw,8rem)]">
      <p data-reveal="up" className="caps text-stone">
        {testimonialsSection.eyebrow}
      </p>
      <ul className="rail rail--cards mt-8">
        {testimonials.map((t) => (
          <li key={t.quote} data-reveal="up" className="card flex flex-col justify-between p-6">
            <blockquote className="display text-[clamp(1.4rem,1.2rem+0.8vw,1.9rem)] leading-[1.12]">«{t.quote}»</blockquote>
            <p className="caps mt-8 text-stone">
              {t.name}
              {t.context ? ` · ${t.context}` : ""}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
