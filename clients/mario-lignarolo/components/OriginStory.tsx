import Image from "next/image";
import type { CSSProperties } from "react";
import { about, origin } from "@/data/content";
import { Eyebrow, ImageSlot, Lines } from "./ui";

/**
 * 06 — Quién es Mario: su historia en cuatro capítulos, con sus palabras
 * textuales; su «Antes / Ahora» a todo el ancho tras «El fondo», y al final
 * quién es hoy. Llega después del método: es la prueba vivida, no la portada.
 */
export default function OriginStory() {
  const { diptych } = origin;
  const chapters = origin.chapters.filter((c) => origin.show.includes(c.title));
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
        {chapters.map((c) => {
          const hasPhoto = Boolean(c.photo?.src);
          const wide = Boolean(c.photo && "wide" in c.photo && c.photo.wide);
          return (
            <li key={c.title} className="border-t border-charcoal/20">
              <div className="grid grid-cols-1 gap-y-5 py-[clamp(1.75rem,3vw,2.75rem)] lg:grid-cols-12 lg:gap-x-6">
                <div data-reveal="up" className="lg:col-span-3">
                  <h3 className="display text-[clamp(1.6rem,1.3rem+1vw,2.3rem)] leading-none">{c.title}</h3>
                </div>

                <div className={`max-w-[38rem] ${hasPhoto && !wide ? "lg:col-span-5" : "lg:col-span-6"}`}>
                  {c.pull && (
                    <p data-reveal="up" className="display mb-5 text-[clamp(1.8rem,1.3rem+1.8vw,2.9rem)] leading-[1.04] italic">
                      {c.pull}
                    </p>
                  )}
                  <p data-reveal="up" className="text-[1.0625rem] leading-[1.65] text-charcoal/80 lg:text-[1.125rem]">
                    {c.text}
                  </p>
                </div>

                {/* Foto apaisada: completa, bajo el texto, al ancho de la columna de lectura. */}
                {hasPhoto && c.photo && wide && (
                  <div data-reveal="up" className="mt-2 lg:col-span-9 lg:col-start-4 lg:mt-4">
                    <ImageSlot
                      src={c.photo.src}
                      alt={c.photo.alt}
                      pendingLabel={c.photo.pendingLabel}
                      sizes="(min-width: 1024px) 70vw, 100vw"
                      className="aspect-[16/9] w-full"
                    />
                  </div>
                )}

                {hasPhoto && c.photo && !wide && (
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
              {diptych && c.title === diptych.afterTitle && (
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

      {/* Mario, hoy: el cierre de su propio relato y la bio corta. */}
      <div className="mt-[clamp(3rem,6vw,5.5rem)] grid grid-cols-1 gap-y-8 lg:grid-cols-12 lg:gap-x-6">
        <p data-reveal="up" className="caps text-charcoal/60 lg:col-span-3">
          {about.eyebrow}
        </p>
        <div className="lg:col-span-8 lg:col-start-4">
          <p data-reveal="up" className="display text-[clamp(1.8rem,1.3rem+1.9vw,3.1rem)] leading-[1.04]">
            {about.quote}
          </p>
          <p data-reveal="up" className="display mt-6 max-w-[36rem] text-[clamp(1.4rem,1.1rem+1vw,2rem)] leading-[1.1] italic text-charcoal/75">
            {about.quoteEnd}
          </p>
          <p data-reveal="up" className="mt-8 max-w-[36rem] text-[1.0625rem] leading-relaxed text-charcoal/80">
            {about.bio}
          </p>
        </div>
      </div>
    </section>
  );
}
