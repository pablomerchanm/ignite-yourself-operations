import Image from "next/image";
import type { CSSProperties } from "react";
import { origin } from "@/data/content";
import { Eyebrow, ImageSlot, Lines } from "./ui";

/**
 * 02 — El punto de partida. La historia de Mario en capítulos, con sus
 * palabras textuales. Los capítulos sin foto son tipográficos (sin huecos);
 * su «Antes / Ahora» entra como díptico a todo el ancho tras «El fondo».
 */
export default function OriginStory() {
  const { diptych } = origin;
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

      <ol className="mt-[clamp(3rem,6vw,5.5rem)] border-b border-charcoal/20">
        {origin.chapters.map((c, i) => {
          const n = i + 1;
          const hasPhoto = Boolean(c.photo?.src);
          return (
            <li key={c.title} className="border-t border-charcoal/20">
              <div className="grid grid-cols-1 gap-y-5 py-[clamp(1.75rem,3vw,2.75rem)] lg:grid-cols-12 lg:gap-x-6">
                <div data-reveal="up" className="flex items-baseline gap-4 lg:col-span-3 lg:flex-col lg:gap-3">
                  <span className="caps text-charcoal/55">{String(n).padStart(2, "0")}</span>
                  <h3 className="display text-[clamp(1.6rem,1.3rem+1vw,2.3rem)] leading-none">{c.title}</h3>
                </div>

                <div className={`max-w-[38rem] ${hasPhoto ? "lg:col-span-5" : "lg:col-span-6"}`}>
                  {c.pull && (
                    <p data-reveal="up" className="display mb-5 text-[clamp(1.8rem,1.3rem+1.8vw,2.9rem)] leading-[1.04] italic">
                      {c.pull}
                    </p>
                  )}
                  <p data-reveal="up" className="text-[1.0625rem] leading-[1.65] text-charcoal/80 lg:text-[1.125rem]">
                    {c.text}
                  </p>
                </div>

                {hasPhoto && c.photo && (
                  <div data-reveal="up" className="lg:col-span-4 lg:col-start-9">
                    <ImageSlot
                      src={c.photo.src}
                      alt={c.photo.alt}
                      pendingLabel={c.photo.pendingLabel}
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="aspect-[4/5] w-full max-w-[22rem] lg:max-w-none"
                    />
                  </div>
                )}
              </div>

              {/* Díptico «Antes / Ahora»: el único momento fotográfico a todo el ancho. */}
              {diptych && n === diptych.afterChapter && (
                <figure className="grid grid-cols-2 gap-3 pb-[clamp(2rem,4vw,3.5rem)] sm:gap-6 lg:grid-cols-12 lg:gap-x-6">
                  {[diptych.before, diptych.after].map((ph, k) => (
                    <div
                      key={ph.label}
                      data-reveal="up"
                      className={`lg:col-span-5 ${k === 0 ? "lg:col-start-2" : ""}`}
                      style={{ "--delay": `${k * 0.12}s` } as CSSProperties}
                    >
                      <div className="relative aspect-[4/5] overflow-hidden bg-charcoal/10">
                        <div className="sd-zoom absolute inset-0">
                          <Image src={ph.src} alt={ph.alt} fill sizes="(min-width: 1024px) 42vw, 50vw" className="object-cover" />
                        </div>
                      </div>
                      <span className="caps mt-3 block text-charcoal/60">{ph.label}</span>
                    </div>
                  ))}
                  <figcaption
                    data-reveal="up"
                    className="display col-span-2 mt-2 text-[clamp(1.5rem,1.1rem+1.4vw,2.4rem)] leading-[1.06] italic lg:col-span-6 lg:col-start-4 lg:mt-4"
                  >
                    {diptych.caption}
                  </figcaption>
                </figure>
              )}
            </li>
          );
        })}
      </ol>

      <div className="mt-[clamp(3rem,6vw,5.5rem)] grid grid-cols-1 lg:grid-cols-12 lg:gap-x-6">
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
