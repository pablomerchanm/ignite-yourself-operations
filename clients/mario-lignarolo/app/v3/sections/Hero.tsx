import Image from "next/image";
import type { CSSProperties } from "react";
import { v3 } from "@/data/v3";
import s from "../v3.module.css";

/**
 * 01 · HERO, al modo de Nike About / Mission: campo casi negro, el
 * territorio como rótulo en caja baja, el statement en siete líneas de
 * grotesk condensada ocupando la altura, y el retrato a la derecha,
 * fundido en el negro para que la tipografía se monte sobre él sin
 * tocar la cara. La firma, en serif, cierra abajo.
 * En móvil: rótulo, statement y firma sobre negro; la foto, debajo.
 */
export default function Hero() {
  const { hero, nav } = v3;
  return (
    <header className={s.hero} id="mario">
      <nav className={s.nav} aria-label="Principal">
        <a href="#mario" className={s.wordmark}>
          Mario Lignarolo
        </a>
        <ul className={s.navList}>
          {nav.map((n) => (
            <li key={n.href}>
              <a href={n.href}>{n.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div className={s.heroPhoto}>
        <Image src={hero.image.src} alt={hero.image.alt} fill priority sizes="(min-width: 880px) 66vw, 100vw" />
      </div>

      <p className={s.heroTerritory}>{hero.territory}</p>

      <p className={s.heroStatement}>
        {hero.statement.map((line, i) => (
          <span key={line} style={{ "--i": i } as CSSProperties}>
            {line}{" "}
          </span>
        ))}
      </p>

      <h1 className={s.heroName}>
        <span>{hero.name[0]}</span> <span>{hero.name[1]}</span>
      </h1>
    </header>
  );
}
