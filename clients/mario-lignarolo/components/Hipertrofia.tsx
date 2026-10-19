import Image from "next/image";
import type { CSSProperties } from "react";
import { channels, hipertrofia, home, lignarolo, psico } from "@/data/content";
import { Arrow } from "./ui";

// Una foto por plano: la del retrato azul (espiritual), la del taller
// (mental: crear, construir) y la del entreno (físico).
const photos = [psico.image, lignarolo.image, hipertrofia.image];

/**
 * 07 — El método: Hipertrofia del Ser en tres planos, como tres tarjetas con
 * foto. En móvil se deslizan; en escritorio van en fila.
 */
export default function Hipertrofia() {
  return (
    <section id="metodo" aria-labelledby="metodo-title" className="gutter py-[clamp(4.5rem,3rem+7vw,9rem)]">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p data-reveal="up" className="caps text-stone">
            {hipertrofia.eyebrow} · {hipertrofia.name.before} {hipertrofia.name.italic} {hipertrofia.name.after}
          </p>
          <h2 id="metodo-title" data-reveal="up" className="title mt-4 text-[clamp(2.6rem,1.6rem+3.6vw,5rem)]">
            {home.metodo.title.before} <b>{home.metodo.title.strong}</b>
          </h2>
        </div>
        <p data-reveal="up" className="max-w-[26rem] text-[1.0625rem] leading-[1.55] text-charcoal/75">
          {hipertrofia.planesIntro}
        </p>
      </div>

      <ol className="rail rail--wide rail--grid mt-10">
        {hipertrofia.planes.map((pl, i) => (
          <li
            key={pl.name}
            data-reveal="up"
            style={{ "--delay": `${i * 0.08}s` } as CSSProperties}
            className="card flex flex-col overflow-hidden"
          >
            <div className="p-6 pb-5">
              <p className="caps text-stone">0{i + 1}</p>
              <h3 className="title mt-3 text-[clamp(1.9rem,1.5rem+1.2vw,2.6rem)]">
                <b>{pl.name}</b>
              </h3>
              <p className="mt-3 min-h-[3.2em] text-[0.975rem] leading-[1.5] text-charcoal/75">{pl.text}</p>
            </div>
            <div className="relative mt-auto aspect-[4/3] overflow-hidden">
              <div className="sd-zoom absolute inset-0">
                <Image src={photos[i].src} alt={photos[i].alt} fill sizes="(min-width: 1024px) 30vw, 84vw" className="object-cover" />
              </div>
            </div>
          </li>
        ))}
      </ol>

      <p data-reveal="up" className="mt-8">
        <a
          href={channels.substack.href}
          target="_blank"
          rel="noopener noreferrer"
          className="link-line inline-flex items-center gap-2 text-[0.9rem] font-medium"
        >
          Leer Hipertrofia del Ser en Substack <Arrow diagonal />
        </a>
      </p>
    </section>
  );
}
