import Image from "next/image";
import type { CSSProperties } from "react";
import { hero } from "@/data/content";

const d = (s: number) => ({ "--delay": `${s}s` }) as CSSProperties;

/** 01 — Portada editorial. La geometría vive en globals.css (.hero*). */
export default function Hero() {
  return (
    <section id="top" className="hero grain" aria-label="Portada">
      <div className="hero__stage">
        <div className="hero__media">
          <div className="hero__settle">
            <div className="hero__drift">
              <Image
                src={hero.image.src}
                alt={hero.image.alt}
                fill
                priority
                quality={85}
                sizes="100vw"
                className="hero__img"
              />
            </div>
          </div>
        </div>

        <h1 className="hero__name">
          <span className="hero__first">
            <span className="rise" style={d(0.35)}>
              Mario
            </span>
          </span>{" "}
          <span className="hero__last">
            <span className="rise" style={d(0.5)}>
              Li<i>gn</i>arolo.
            </span>
          </span>
        </h1>

        <ul className="hero__words fade-up" style={d(1.05)} aria-label="Territorios">
          {hero.territories.map((t) => (
            <li key={t.word} className={t.italic ? "italic" : undefined}>
              {t.word}
            </li>
          ))}
        </ul>

        <p className="hero__statement fade-up" style={d(1.25)}>
          {hero.statement.map((line) => (
            <span key={line}>{line} </span>
          ))}
        </p>

        <a href="#mario" className="hero__scroll caps fade-up" style={d(1.6)}>
          <span className="scroll-line" aria-hidden="true" />
          Desliza
        </a>
      </div>
    </section>
  );
}
