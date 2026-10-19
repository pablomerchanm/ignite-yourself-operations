import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { hero, home } from "@/data/content";
import { Arrow } from "./ui";

const d = (s: number) => ({ "--delay": `${s}s` }) as CSSProperties;

/**
 * 01 — Portada: su retrato a sangre en duotono azul (la foto es la real;
 * el color lo pone el CSS) y, abajo, el titular con los dos caminos.
 */
export default function Hero() {
  const { kicker, title, sub, primary, secondary } = home.hero;
  return (
    <section id="top" className="hero dark grain grain--strong" aria-label="Portada">
      <div className="hero__media">
        <div className="hero__settle absolute inset-0">
          <div className="hero__drift absolute inset-0">
            <Image src={hero.image.src} alt={hero.image.alt} fill priority quality={85} sizes="100vw" className="hero__img" />
          </div>
        </div>
      </div>
      <div className="hero__tint" aria-hidden="true" />
      <div className="hero__lift" aria-hidden="true" />
      <div className="hero__shade" aria-hidden="true" />

      <div className="hero__body gutter">
        <p className="caps fade-up text-bone/80" style={d(0.3)}>
          {kicker}
        </p>
        <h1 className="title fade-up mt-5 max-w-[14ch] text-[clamp(2.7rem,1.3rem+6vw,6.5rem)] text-white" style={d(0.45)}>
          <span className="sr-only">Mario Lignarolo. </span>
          {title.before} <b>{title.strong}</b> {title.after}
        </h1>
        <div className="fade-up mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between" style={d(0.7)}>
          <p className="max-w-[30rem] text-[1.0625rem] leading-[1.5] text-bone/85 lg:text-[1.125rem]">{sub}</p>
          <div className="flex flex-wrap gap-3">
            <a href={primary.href} target="_blank" rel="noopener noreferrer" className="btn btn--blue">
              {primary.label} <Arrow />
            </a>
            <Link href={secondary.href} className="btn btn--glass">
              {secondary.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
