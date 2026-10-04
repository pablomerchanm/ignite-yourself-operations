import { origin } from "@/data/content";
import { Eyebrow, ImageSlot, Lines } from "./ui";

/**
 * 02 — El punto de partida. La historia de Mario en capítulos, con sus
 * palabras textuales; cada capítulo reserva el hueco de su foto original.
 */
export default function OriginStory() {
  return (
    <section id="mario" className="gutter bg-cream py-[clamp(5rem,4rem+8vw,11rem)] text-charcoal">
      <header className="grid grid-cols-1 gap-y-10 lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-9">
          <Eyebrow className="mb-8 text-charcoal/70">{origin.eyebrow}</Eyebrow>
          <Lines
            lines={origin.headline}
            italicLine={origin.headlineItalicLine}
            className="display text-[clamp(3.3rem,1.2rem+8.4vw,10.5rem)] leading-[0.86] uppercase"
          />
        </div>
        <p
          data-reveal="up"
          className="display text-[clamp(1.7rem,1.2rem+1.6vw,2.6rem)] leading-[1.08] italic lg:col-span-6 lg:col-start-4"
        >
          {origin.lead}
        </p>
      </header>

      <ol className="mt-[clamp(3.5rem,8vw,7rem)] border-b border-charcoal/20">
        {origin.chapters.map((c, i) => (
          <li
            key={c.title}
            className="grid grid-cols-1 gap-y-5 border-t border-charcoal/20 py-[clamp(2rem,4vw,3.5rem)] lg:grid-cols-12 lg:gap-x-6"
          >
            <div data-reveal="up" className="flex items-baseline gap-4 lg:col-span-3 lg:flex-col lg:gap-3">
              <span className="caps text-charcoal/55">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="display text-[clamp(1.7rem,1.3rem+1.2vw,2.5rem)] leading-none">{c.title}</h3>
            </div>

            <div className="max-w-[36rem] lg:col-span-5">
              {c.pull && (
                <p data-reveal="up" className="display mb-5 text-[clamp(1.9rem,1.3rem+2vw,3.1rem)] leading-[1.04] italic">
                  {c.pull}
                </p>
              )}
              <p data-reveal="up" className="text-[1.0625rem] leading-relaxed text-charcoal/85">
                {c.text}
              </p>
            </div>

            {c.photo && (
              <div data-reveal="up" className="lg:col-span-3 lg:col-start-10">
                <ImageSlot
                  src={c.photo.src}
                  alt={c.photo.alt}
                  pendingLabel={c.photo.pendingLabel}
                  sizes="(min-width: 1024px) 25vw, 100vw"
                  className="aspect-[4/5] w-full max-w-[22rem] lg:max-w-none"
                />
              </div>
            )}
          </li>
        ))}
      </ol>

      <div className="mt-[clamp(3.5rem,8vw,7rem)] grid grid-cols-1 lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-7 lg:col-start-4">
          <p data-reveal="up" className="max-w-[34rem] text-[1.0625rem] leading-relaxed text-charcoal/60">
            {origin.bridge}
          </p>
          <p
            data-reveal="up"
            className="display mt-8 border-l border-charcoal/25 pl-6 text-[clamp(1.9rem,1.3rem+2vw,3.1rem)] leading-[1.04] italic"
          >
            {origin.question}
          </p>
        </div>
      </div>
    </section>
  );
}
