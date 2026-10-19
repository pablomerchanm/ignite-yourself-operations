import type { CSSProperties } from "react";
import { hipertrofia } from "@/data/content";
import { Eyebrow, ImageSlot, Lines } from "./ui";

/**
 * 03 — El método: Hipertrofia del Ser, en tres planos. Responde a la
 * pregunta de «Sostener»; lo que escribe con ese nombre vive en «Escritos».
 */
export default function Hipertrofia() {
  return (
    <section id="metodo" aria-labelledby="hipertrofia-title" className="gutter bg-paper py-[clamp(4.5rem,3rem+7vw,9.5rem)] text-charcoal">
      <div className="border-b border-charcoal pb-4">
        <Eyebrow className="text-charcoal/70">{hipertrofia.eyebrow}</Eyebrow>
      </div>

      <Lines
        id="hipertrofia-title"
        lines={[
          <>
            {hipertrofia.name.before} <em>{hipertrofia.name.italic}</em> {hipertrofia.name.after}
          </>,
        ]}
        className="display py-[clamp(1.5rem,3vw,3rem)] text-[clamp(3.4rem,0.6rem+10.4vw,13rem)] leading-[0.86]"
      />

      <div className="grid grid-cols-1 gap-y-12 border-t border-charcoal/20 pt-[clamp(2.5rem,5vw,4.5rem)] lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-4">
          <p data-reveal="up" className="display text-[clamp(2rem,1.4rem+2.1vw,3.4rem)] leading-[1.02]">
            {hipertrofia.planesTitle}
          </p>
          <p data-reveal="up" className="mt-6 max-w-[28rem] text-[1.0625rem] leading-relaxed text-charcoal/80">
            {hipertrofia.planesIntro}
          </p>
          <div data-reveal="up" className="mt-10 hidden lg:block">
            <ImageSlot
              src={hipertrofia.image.src}
              alt={hipertrofia.image.alt}
              pendingLabel="Entreno"
              sizes="25vw"
              className="aspect-[4/5] w-full max-w-[20rem]"
            />
          </div>
        </div>

        <ol className="grid grid-cols-1 content-start gap-y-6 lg:col-span-7 lg:col-start-6">
          {hipertrofia.planes.map((pl, i) => (
            <li
              key={pl.name}
              data-reveal="up"
              style={{ "--delay": `${i * 0.08}s` } as CSSProperties}
              className="grid grid-cols-1 gap-y-3 border-t border-charcoal/20 pt-6 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:gap-x-6"
            >
              <h3 className="display text-[clamp(2.4rem,1.6rem+2.6vw,4.4rem)] leading-none">{pl.name}</h3>
              <p className="text-[1.0625rem] leading-relaxed text-charcoal/75 sm:pt-3">{pl.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
