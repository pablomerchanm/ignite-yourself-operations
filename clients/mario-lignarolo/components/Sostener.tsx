import { sostener } from "@/data/content";

/**
 * 02 — El gancho, en una pantalla: el momento de quien llega (ya logró cosas
 * y vuelve a sus patrones) y la frase que ordena el sitio.
 */
export default function Sostener() {
  return (
    <section id="sostener" aria-labelledby="sostener-title" className="gutter py-[clamp(4.5rem,3rem+7vw,9rem)]">
      <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-6">
          <p data-reveal="up" className="caps text-stone">
            {sostener.eyebrow}
          </p>
          <h2
            id="sostener-title"
            data-reveal="up"
            className="title mt-5 max-w-[11ch] text-[clamp(2.6rem,1.4rem+4.6vw,5.75rem)]"
          >
            {sostener.headline.join(" ")} <b>{sostener.lead}</b>
          </h2>
        </div>
        <div className="lg:col-span-5 lg:col-start-8 lg:pt-10">
          <p data-reveal="up" className="max-w-[32rem] text-[1.0625rem] leading-[1.65] text-charcoal/80 lg:text-[1.125rem]">
            {sostener.text}
          </p>
          <p data-reveal="up" className="display mt-8 max-w-[26rem] text-[clamp(1.5rem,1.2rem+1.2vw,2.2rem)] leading-[1.08] italic">
            {sostener.question}
          </p>
          <p data-reveal="up" className="title mt-8 text-[clamp(1.5rem,1.2rem+1.1vw,2.1rem)]">
            {sostener.answer.before} <b>{sostener.answer.em}</b>
          </p>
        </div>
      </div>
    </section>
  );
}
