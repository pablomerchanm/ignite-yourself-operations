import Image from "next/image";
import type { CSSProperties } from "react";
import { v3 } from "@/data/v3";
import Logo from "../Logo";
import s from "../v3.module.css";

/**
 * 01 · HERO. Sobre negro: arriba, el logo y el menú en una misma línea,
 * en la retícula (el menú arranca en la columna 7, el eje de la página, y
 * «Contacto» cierra a la derecha, subrayado);
 * abajo, apoyados en el borde, el territorio y el statement en siete
 * líneas; entre ambos, aire. El retrato a la derecha.
 *
 * Proporción: el statement es el golpe de la página, en condensada y a
 * una medida contenida (--s, calculada por el ancho y por el alto de
 * pantalla); el territorio, una etiqueta pequeña; el logo firma.
 *
 * Movimiento: el retrato entra desde negro y se asienta; el logo se revela
 * con un barrido; cada línea sube desde detrás de su máscara, en cadena.
 * Con el scroll, foto y texto se separan a distinta velocidad (Scrolly.tsx).
 */
export default function Hero() {
  const { hero, nav } = v3;
  const links = nav.filter((n) => n.href !== "#contacto");
  const contact = nav.find((n) => n.href === "#contacto");
  return (
    <header className={s.hero} id="mario">
      <div className={s.heroPhoto} data-parallax="0.22">
        <Image src={hero.image.src} alt={hero.image.alt} fill priority unoptimized sizes="66vw" />
      </div>

      <div className={`${s.grid} ${s.heroTop}`}>
        <h1 className={s.heroMark}>
          <Logo className={s.heroLogo} />
        </h1>
        <nav className={s.nav} aria-label="Principal">
          <ul className={s.navList}>
            {links.map((n) => (
              <li key={n.href}>
                <a href={n.href}>{n.label}</a>
              </li>
            ))}
          </ul>
          {contact && (
            <a href={contact.href} className={s.navContact}>
              {contact.label}
            </a>
          )}
        </nav>
      </div>

      <div className={s.heroCopy} data-parallax="-0.08">
        <p className={`${s.tag} ${s.heroTerritory}`}>{hero.territory}</p>
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
