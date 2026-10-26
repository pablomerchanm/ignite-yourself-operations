import Image from "next/image";
import type { CSSProperties } from "react";
import { v3 } from "@/data/v3";
import { Arrow, Paragraphs, SectionHead, Words, ext } from "./ui";
import s from "../v3.module.css";

/**
 * 05 · EMPRENDIMIENTO / LIGNAROLO. Menos peso que los dos mundos
 * anteriores, otra luz: el gris de estudio de la propia foto.
 *
 *  1. Escena. El retrato de campaña a sangre por la derecha, fundido con el
 *     fondo: Mario sentado, la mano en el mentón, pensando. A su izquierda,
 *     en el vacío del estudio, «Hay ideas que me gusta pensar. Otras
 *     necesito construirlas.» La foto dice la primera mitad de la frase.
 *  2. Silencio. Los cinco territorios, centrados, se encienden uno a uno con
 *     el scroll; debajo, la última línea del copy.
 *  3. Lignarolo. Tres detalles de la marca, en el orden de la frase
 *     (producto, diseño, marca), y el nombre como firma de casa de moda.
 */
export default function Emprendimiento() {
  const { emprendimiento: e } = v3;
  const { lignarolo: lg } = e;
  return (
    <section className={s.emp} id="emprendimiento" aria-labelledby="emp-h">
      <div className={s.empScene}>
        <figure className={s.empPhoto}>
          <Image src={e.image.src} alt={e.image.alt} fill sizes="(min-width: 881px) 86vw, 100vw" />
        </figure>
        <div className={`${s.wrap} ${s.empText}`}>
          <SectionHead label={e.label} />
          <h2 className={`${s.serifHead} ${s.empHead}`} id="emp-h" data-reveal="up">
            {e.headline}
          </h2>
          <div className={`${s.stack} ${s.empCopy}`} data-reveal="up" style={{ "--delay": "0.1s" } as CSSProperties}>
            <Paragraphs items={e.paragraphs} className={s.body} />
          </div>
        </div>
      </div>

      <div className={`${s.wrap} ${s.empQuiet}`}>
        <p className={s.empFields} data-scrub="0.72">
          <Words text={e.fields} />
        </p>
        <p className={s.body} data-reveal="up">
          {e.close}
        </p>
      </div>

      <article className={`${s.wrap} ${s.grid} ${s.lg}`} id="lignarolo" aria-label={lg.name}>
        <div className={s.lgText} data-reveal="up">
          <p className={s.lgMark}>{lg.name}</p>
          <p className={s.lead}>{lg.text}</p>
          <a href={lg.href} className={s.link} {...ext}>
            {lg.cta} <Arrow />
          </a>
        </div>
        <ul className={s.lgDetails}>
          {lg.details.map((d, i) => (
            <li key={d.src} data-reveal="up" style={{ "--delay": `${0.08 * i}s` } as CSSProperties}>
              <span className={`${s.photo} ${s.lgDetail}`}>
                <Image src={d.src} alt={d.alt} fill sizes="(min-width: 881px) 22vw, 33vw" />
              </span>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
