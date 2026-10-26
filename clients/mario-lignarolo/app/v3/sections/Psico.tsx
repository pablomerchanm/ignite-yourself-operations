import Image from "next/image";
import type { CSSProperties } from "react";
import { v3 } from "@/data/v3";
import { Arrow, Paragraphs, SectionHead, ext } from "./ui";
import s from "../v3.module.css";

/**
 * 03 · PSICOCIBERNÉTICA. Un mundo aparte: azul profundo a sangre con un
 * resplandor que respira; el titular en grotesk condensada; el retrato
 * en doble exposición sangrando por la izquierda; los cuatro conceptos
 * apilados en grande; el statement final y un solo enlace.
 */
export default function Psico() {
  const { psico } = v3;
  return (
    <section className={s.psico} id="psicocibernetica" aria-labelledby="psico-h">
      <div className={`${s.wrap} ${s.psicoInner}`}>
        <SectionHead label={psico.label} />
        <h2 className={`${s.statement} ${s.psicoHead}`} id="psico-h" data-reveal="up" style={{ "--delay": "0.08s" } as CSSProperties}>
          {psico.headline}
        </h2>

        <div className={`${s.grid} ${s.psicoGrid}`}>
          <figure className={`${s.photo} ${s.psicoPhoto}`} data-reveal="up">
            <Image
              src={psico.image.src}
              alt={psico.image.alt}
              fill
              sizes="(min-width: 880px) 44vw, 100vw"
              style={{ objectPosition: psico.image.position }}
            />
          </figure>

          <div className={s.psicoCopy}>
            <div className={s.psicoText} data-reveal="up">
              <Paragraphs items={psico.paragraphs} className={s.body} />
            </div>

            <div>
              <ul className={s.psicoConcepts} aria-label="Conceptos">
                {psico.concepts.map((c, i) => (
                  <li key={c} className={s.statement} data-reveal="up" style={{ "--delay": `${i * 0.07}s` } as CSSProperties}>
                    {c}
                  </li>
                ))}
              </ul>
              <p className={s.psicoSecondary} data-reveal="up">
                {psico.secondary.map((t, i) => (
                  <span key={t}>
                    {i > 0 && <span aria-hidden="true"> · </span>}
                    {t}
                  </span>
                ))}
              </p>
            </div>

            <p className={s.psicoStatement} data-reveal="up">
              {psico.statement}
            </p>
            <a href={psico.href} className={s.link} {...ext} data-reveal="up">
              {psico.cta} <Arrow />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
