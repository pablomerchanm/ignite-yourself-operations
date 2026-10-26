import Image from "next/image";
import type { CSSProperties } from "react";
import { v3 } from "@/data/v3";
import Logo from "../Logo";
import s from "../v3.module.css";

/**
 * 01 · HERO. Sobre negro: arriba, el logo y el menú en una misma línea;
 * abajo, apoyados en el borde, el territorio y el statement en siete
 * líneas; entre ambos, aire. El retrato a la derecha.
 *
 * Proporción: una sola medida manda (--s, el cuerpo del statement,
 * calculado desde el alto de pantalla). La línea más larga del statement
 * mide 5,97 --s y el logo es φ² veces menor (2,28 --s): firma, no titular.
 *
 * Movimiento: el retrato entra desde negro y se asienta; el logo se revela
 * con un barrido; cada línea sube desde detrás de su máscara, en cadena.
 * Con el scroll, foto y texto se separan a distinta velocidad (Scrolly.tsx).
 */
export default function Hero() {
  const { hero, nav } = v3;
  return (
    <header className={s.hero} id="mario">
      <div className={s.heroPhoto} data-parallax="0.22">
        <Image src={hero.image.src} alt={hero.image.alt} fill priority unoptimized sizes="66vw" />
      </div>

      <div className={s.heroTop}>
        <h1 className={s.heroMark}>
          <Logo className={s.heroLogo} />
        </h1>
        <nav className={s.nav} aria-label="Principal">
          <ul className={s.navList}>
            {nav.map((n) => (
              <li key={n.href}>
                <a href={n.href}>{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className={s.heroCopy} data-parallax="-0.08">
        <p className={s.heroTerritory}>{hero.territory}</p>
        <p className={s.heroStatement}>
          {hero.statement.map((line, i) => (
            <span key={line} className={s.heroLine} style={{ "--i": i } as CSSProperties}>
              <span>{line} </span>
            </span>
          ))}
        </p>
      </div>
    </header>
  );
}
