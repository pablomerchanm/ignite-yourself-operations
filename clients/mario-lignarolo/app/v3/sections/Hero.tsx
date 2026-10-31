import Image from "next/image";
import type { CSSProperties } from "react";
import { v3 } from "@/data/v3";
import Logo from "../Logo";
import HeroVideo from "./HeroVideo";
import s from "../v3.module.css";

/**
 * 01 · HERO, en movimiento, al modo de Nike «The Record». Sobre negro:
 * arriba, el logo y el menú en la retícula (el menú arranca en la columna
 * 7 y «Contacto» cierra a la derecha); abajo a la izquierda, el territorio
 * y el statement en siete líneas.
 *
 * En el centro, un recorte. Al entrar, una ráfaga de fotos reales de Mario
 * se apila en él, cada una de su tamaño; luego el recorte se abre desde el
 * centro y queda el vídeo de Psicocibernética (la toma de la biblioteca),
 * sin sonido y en bucle. En escritorio la portada se fija ([data-pin]) y,
 * con el scroll, el recorte se abre hasta llenar la pantalla (--pp,
 * Scrolly.tsx), con un velo que deja leer el statement. En móvil, el
 * recorte ocupa la parte de arriba y la portada mide una pantalla.
 *
 * Movimiento: la ráfaga, la apertura del recorte, el barrido del logo y
 * las líneas que suben, todo en CSS. Con movimiento reducido no hay ráfaga
 * y el vídeo queda en su póster.
 */
export default function Hero() {
  const { hero, nav } = v3;
  const links = nav.filter((n) => n.href !== "#contacto");
  const contact = nav.find((n) => n.href === "#contacto");
  return (
    <header className={s.hero} id="mario" data-pin="1.8">
      <div className={s.heroFrame}>
        {/* la ráfaga: fotos que se apilan en el recorte antes del vídeo */}
        <div className={s.heroSweep} aria-hidden="true">
          {hero.sweep.map((p, i) => (
            <span
              key={p.src}
              className={`${s.photo} ${s.sweepItem}`}
              style={{ "--x": `${p.at.x}%`, "--y": `${p.at.y}%`, "--w": `${p.at.w}%`, "--ar": p.ar, "--d": `${0.15 + i * 0.3}s` } as CSSProperties}
            >
              <Image src={p.src} alt="" fill loading="eager" sizes="(min-width: 881px) 30vw, 60vw" />
            </span>
          ))}
        </div>

        {/* el recorte: el vídeo a sangre, recortado por una ventana que se
            abre con el scroll */}
        <div className={s.heroStage}>
          <div className={s.heroReveal}>
            <HeroVideo desktop={hero.video.desktop} mobile={hero.video.mobile} poster={hero.video.poster} className={s.heroVideo} buttonClassName={s.heroPause} />
          </div>
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

        <div className={s.heroCopy}>
          <p className={`${s.tag} ${s.heroTerritory}`}>{hero.territory}</p>
          <p className={s.heroStatement}>
            {hero.statement.map((line, i) => (
              <span key={line} className={s.heroLine} style={{ "--i": i } as CSSProperties}>
                <span>{line} </span>
              </span>
            ))}
          </p>
        </div>
      </div>
    </header>
  );
}
