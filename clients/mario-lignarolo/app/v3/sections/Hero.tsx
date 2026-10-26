import Image from "next/image";
import type { CSSProperties } from "react";
import { v3 } from "@/data/v3";
import Logo from "../Logo";
import s from "../v3.module.css";

/**
 * 01 · HERO. Portada de revista sobre negro: el logo como cabecera, el
 * territorio y el statement en siete líneas; el retrato a la derecha.
 *
 * Una sola medida manda (--s, el cuerpo del statement), calculada desde el
 * alto de la pantalla para que todo quepa justo en ella. El logo mide lo
 * mismo que la línea más larga del statement (5,97 × --s), así nombre y
 * mensaje forman un bloque de un mismo ancho.
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

      <nav className={s.nav} aria-label="Principal">
        <ul className={s.navList}>
          {nav.map((n) => (
            <li key={n.href}>
              <a href={n.href}>{n.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div className={s.heroCopy} data-parallax="-0.08">
        <h1 className={s.heroMark}>
          <Logo className={s.heroLogo} />
        </h1>
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
