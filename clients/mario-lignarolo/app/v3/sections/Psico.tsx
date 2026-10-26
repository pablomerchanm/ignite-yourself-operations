import Image from "next/image";
import type { CSSProperties } from "react";
import { v3 } from "@/data/v3";
import { Arrow, Paragraphs, ext } from "./ui";
import s from "../v3.module.css";

/**
 * 03 · PSICOCIBERNÉTICA. Un mundo aparte dentro de la página: azul
 * profundo, a sangre, con un resplandor que respira. Retrato en doble
 * exposición, el copy, los cuatro conceptos en grande, el statement
 * final y un solo enlace. Sin precios, beneficios ni argumentos.
 */
export default function Psico() {
  const { psico } = v3;
  return (
    <section className={s.psico} id="psicocibernetica" aria-labelledby="psico-h">
      <div className={`${s.wrap} ${s.psicoInner}`}>
        <p className={s.label} data-reveal="up">
          {psico.label}
        </p>
        <h2 className={`${s.statement} ${s.psicoHead}`} id="psico-h" data-reveal="up" style={{ "--delay": "0.08s" } as CSSProperties}>
          {psico.headline}
        </h2>

        <div className={`${s.grid} ${s.psicoGrid}`}>
          <figure className={`${s.photo} ${s.psicoPhoto}`} data-reveal="up">
            <Image
              src={psico.image.src}
              alt={psico.image.alt}
              fill
              sizes="(min-width: 880px) 40vw, 100vw"
              style={{ objectPosition: psico.image.position }}
            />
          </figure>

          <div className={s.psicoCopy}>
            <div className={s.psicoText} data-reveal="up">
              <Paragraphs items={psico.paragraphs} className={s.body} />
            </div>

            <ol className={s.psicoConcepts} aria-label="Conceptos">
              {psico.concepts.map((c, i) => (
                <li key={c} data-reveal="up" style={{ "--delay": `${i * 0.07}s` } as CSSProperties}>
                  <span className={s.psicoIndex}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={s.psicoConcept}>{c}</span>
                </li>
              ))}
            </ol>
            <p className={s.psicoSecondary} data-reveal="up">
              {psico.secondary.map((t, i) => (
                <span key={t}>
                  {i > 0 && <span aria-hidden="true"> · </span>}
                  {t}
                </span>
              ))}
            </p>

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
