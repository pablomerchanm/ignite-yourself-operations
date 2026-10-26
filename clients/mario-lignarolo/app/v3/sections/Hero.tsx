import Image from "next/image";
import type { CSSProperties } from "react";
import { v3 } from "@/data/v3";
import s from "../v3.module.css";

/**
 * 01 · HERO. Se mantiene la dirección visual: retrato a pantalla completa,
 * el nombre como cabecera serif en la franja inferior. Entra el statement
 * en siete líneas, en sans contundente, en la zona libre a la izquierda
 * de la cara. En móvil: panel de foto 4:5 y, debajo, statement y nombre.
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
        <Image src={hero.image.src} alt={hero.image.alt} fill priority sizes="100vw" />
      </div>

      <p className={s.heroStatement}>
        {hero.statement.map((line, i) => (
          <span key={line} style={{ "--i": i } as CSSProperties}>
            {line}{" "}
          </span>
        ))}
      </p>

      <div className={`${s.wrap} ${s.heroBody}`}>
        <h1 className={s.mark}>
          <span>{hero.name[0]}</span> <span>{hero.name[1]}</span>
        </h1>
        <p className={`${s.label} ${s.heroTerritory}`}>{hero.territory}</p>
      </div>
    </header>
  );
}
