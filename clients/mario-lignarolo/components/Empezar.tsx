import Image from "next/image";
import type { CSSProperties } from "react";
import { home, lignarolo } from "@/data/content";
import { Arrow } from "./ui";

/**
 * 09 — Tres formas de empezar (programa · uno a uno · Substack) y, aparte,
 * Lignarolo como tarjeta con foto: lo que emprende.
 */
export default function Empezar() {
  const { empezar } = home;
  return (
    <section id="empezar" aria-labelledby="empezar-title" className="gutter py-[clamp(4.5rem,3rem+7vw,9rem)]">
      <p data-reveal="up" className="caps text-stone">
        {empezar.eyebrow}
      </p>
      <h2 id="empezar-title" data-reveal="up" className="title mt-4 text-[clamp(2.6rem,1.6rem+3.6vw,5rem)]">
        {empezar.title.before} <b>{empezar.title.strong}</b>
      </h2>

      <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
        {empezar.items.map((it, i) => (
          <li
            key={it.name}
            data-reveal="up"
            style={{ "--delay": `${i * 0.08}s` } as CSSProperties}
            className={`card flex flex-col p-6 md:p-7 ${i === 0 ? "card--blue" : ""}`}
          >
            <p className={`caps ${i === 0 ? "text-white/80" : "text-stone"}`}>{it.kicker}</p>
            <h3 className="title mt-8 text-[clamp(2rem,1.6rem+1.4vw,2.8rem)]">
              <b>{it.name}</b>
            </h3>
            <p className={`mt-3 flex-1 text-[0.975rem] leading-[1.5] ${i === 0 ? "text-white/85" : "text-charcoal/75"}`}>{it.text}</p>
            <a
              href={it.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn mt-8 w-fit ${i === 0 ? "btn--glass" : "btn--ink"}`}
            >
              {it.cta} <Arrow diagonal />
            </a>
          </li>
        ))}
      </ul>

      {/* Lignarolo: la marca que emprende, como tarjeta con foto. */}
      <a
        href={lignarolo.href}
        target="_blank"
        rel="noopener noreferrer"
        data-reveal="up"
        className="card group mt-4 grid grid-cols-1 overflow-hidden md:grid-cols-12"
      >
        <span className="duo relative block aspect-[16/9] md:col-span-5 md:aspect-auto md:min-h-[18rem]">
          <Image
            src={lignarolo.image.src}
            alt={lignarolo.image.alt}
            fill
            sizes="(min-width: 768px) 42vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </span>
        <span className="flex flex-col p-6 md:col-span-7 md:p-8">
          <span className="caps text-stone">
            {lignarolo.eyebrow} · {lignarolo.tagline}
          </span>
          <span className="title mt-6 text-[clamp(2rem,1.6rem+1.4vw,2.8rem)]">
            <b>{lignarolo.name}</b>
          </span>
          <span className="display mt-4 max-w-[30rem] text-[clamp(1.3rem,1.1rem+0.7vw,1.7rem)] leading-[1.12] italic">
            «{lignarolo.quote}»
          </span>
          <span className="mt-4 max-w-[30rem] text-[0.95rem] leading-[1.5] text-charcoal/70">{lignarolo.description}</span>
          <span className="link-line mt-auto inline-flex w-fit items-center gap-2 pt-6 text-[0.9rem] font-medium">
            {lignarolo.cta} <Arrow diagonal />
          </span>
        </span>
      </a>
    </section>
  );
}
