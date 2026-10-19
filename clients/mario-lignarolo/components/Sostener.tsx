import { sostener } from "@/data/content";
import { Eyebrow, Lines } from "./ui";

/**
 * 02 — Lo primero después de la portada: el momento de quien llega
 * (ya logró cosas y vuelve a sus patrones) y la pregunta que ordena el sitio.
 */
export default function Sostener() {
  return (
    <section id="sostener" aria-labelledby="sostener-title" className="gutter bg-cream py-[clamp(4.5rem,3rem+7vw,9.5rem)] text-charcoal">
      <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-8">
          <Eyebrow className="mb-8 text-charcoal/70">{sostener.eyebrow}</Eyebrow>
          <Lines
            id="sostener-title"
            lines={sostener.headline}
            italicLine={sostener.headlineItalicLine}
            className="display text-[clamp(3.1rem,1.2rem+7.6vw,9.5rem)] leading-[0.86] uppercase"
          />
          <p data-reveal="up" className="display mt-6 text-[clamp(2rem,1.3rem+2.6vw,3.8rem)] leading-none italic text-charcoal/80">
            {sostener.lead}
          </p>
        </div>
      </div>

      <div className="mt-[clamp(2.5rem,5vw,4.5rem)] grid grid-cols-1 gap-y-10 border-t border-charcoal/20 pt-[clamp(2rem,4vw,3.25rem)] lg:grid-cols-12 lg:gap-x-6">
        <p data-reveal="up" className="max-w-[34rem] text-[1.0625rem] leading-[1.65] text-charcoal/80 lg:col-span-5 lg:text-[1.125rem]">
          {sostener.text}
        </p>
        <div className="lg:col-span-6 lg:col-start-7">
          <p
            data-reveal="up"
            className="display border-l border-charcoal/25 pl-6 text-[clamp(1.7rem,1.2rem+1.8vw,2.8rem)] leading-[1.05] italic"
          >
            {sostener.question}
          </p>
          <p data-reveal="up" className="display mt-8 pl-6 text-[clamp(1.5rem,1.2rem+1.1vw,2.2rem)] leading-[1.08]">
            {sostener.answer.before} <em className="text-charcoal">{sostener.answer.em}</em>
          </p>
        </div>
      </div>
    </section>
  );
}
