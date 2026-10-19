import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { about, origin } from "@/data/content";
import Timeline from "./Timeline";
import { Arrow, Eyebrow, Lines } from "./ui";

/**
 * 06 — Quién es Mario: su recorrido como una curva (Timeline), su «Antes /
 * Ahora» y quién es hoy. Llega después del método: es la prueba vivida.
 * Los capítulos completos, con sus palabras, siguen en data/content.ts.
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

      {/* El recorrido: su historia como una curva, a todo el ancho. */}
      <div className="mt-[clamp(3rem,6vw,5.5rem)] mx-[calc(-1*var(--gutter))]">
        <Timeline />
      </div>

      {/* Díptico «Antes / Ahora»: el cuerpo, donde el cambio se hizo visible. */}
      {diptych && (
        <figure className="mt-[clamp(3rem,6vw,5.5rem)] grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-12 lg:gap-x-6">
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
          <Link
            href="/historia"
            data-reveal="up"
            className="caps link-line mt-10 inline-flex items-center gap-2 text-charcoal transition-colors hover:text-charcoal/60"
          >
            {about.storyCta} <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
