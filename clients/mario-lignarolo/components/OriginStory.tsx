import type { CSSProperties } from "react";
import { origin } from "@/data/content";
import { Eyebrow, ImageSlot, Lines } from "./ui";

/**
 * 02 — El punto de partida. El arco va en palabras de Mario (origin.beats);
 * el estudio solo pone el puente hacia la pregunta que organiza el sitio.
 */
export default function OriginStory() {
  return (
    <section id="mario" className="gutter bg-cream py-[clamp(5rem,4rem+8vw,11rem)] text-charcoal">
      <div className="grid grid-cols-1 gap-x-6 gap-y-12 lg:grid-cols-12">
        <header className="lg:col-span-8 lg:col-start-1 lg:row-start-1">
          <Eyebrow className="mb-8 text-charcoal/70">{origin.eyebrow}</Eyebrow>
          <Lines
            lines={origin.headline}
            italicLine={origin.headlineItalicLine}
            className="display text-[clamp(3.3rem,1.2rem+8.4vw,10.5rem)] leading-[0.86] uppercase"
          />
        </header>

        <div className="lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1 lg:pt-[clamp(4rem,10vw,9rem)]">
          <div data-reveal="up" className="sd-drift lg:sticky lg:top-[calc(var(--nav-h)+2rem)]">
            <ImageSlot
              src={origin.image.src}
              alt={origin.image.alt}
              pendingLabel={origin.image.pendingLabel}
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="aspect-[4/5] w-full"
            />
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-2 lg:row-start-2">
          <p data-reveal="up" className="display text-[clamp(1.7rem,1.2rem+1.6vw,2.6rem)] leading-[1.08] italic">
            {origin.lead}
          </p>

          <div className="mt-10 max-w-[34rem] space-y-6 text-[1.0625rem] leading-relaxed text-charcoal/85">
            {origin.beats.map((b, i) => (
              <p
                key={b.text}
                data-reveal="up"
                style={{ "--delay": `${i * 0.04}s` } as CSSProperties}
                className={
                  b.pull
                    ? "display py-4 text-[clamp(1.9rem,1.3rem+2vw,3.1rem)] leading-[1.04] italic text-charcoal"
                    : undefined
                }
              >
                {b.text}
              </p>
            ))}
          </div>

          <p data-reveal="up" className="mt-12 max-w-[34rem] text-[1.0625rem] leading-relaxed text-charcoal/60">
            {origin.bridge}
          </p>
          <p
            data-reveal="up"
            className="display my-10 border-l border-charcoal/25 pl-6 text-[clamp(1.9rem,1.3rem+2vw,3.1rem)] leading-[1.04] italic lg:-ml-6"
          >
            {origin.question}
          </p>
          <p data-reveal="up" className="display max-w-[34rem] text-[clamp(1.7rem,1.2rem+1.6vw,2.6rem)] leading-[1.08]">
            {origin.closing.before}
            <br />
            <em>{origin.closing.em}</em>
          </p>
        </div>
      </div>
    </section>
  );
}
