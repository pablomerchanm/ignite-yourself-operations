import Image from "next/image";
import { v3 } from "@/data/v3";
import { Btn, Paragraphs, Progress, SectionHead } from "./ui";
import s from "../v4.module.css";

/**
 * 03 · PSICOCIBERNÉTICA, en oscuro. Apertura: la etiqueta en la columna
 * índice, el titular en Geist negrita (caja de frase) y el copy en la
 * columna de lectura. Después, la escena fija (escritorio): el retrato a la
 * izquierda, en color, y los cuatro conceptos en póster pequeño que se
 * encienden de uno en uno, como una respiración; al final aparecen los
 * secundarios (en mono), el statement en itálica y el botón.
 */
export default function Psico() {
  const { psico } = v3;
  return (
    <section className={`${s.dark} ${s.psico}`} id="psicocibernetica" aria-labelledby="psico-h">
      <div className={`${s.wrap} ${s.sectionTop}`}>
        <div className={s.opener}>
          <SectionHead label={psico.label} />
          <h2 className={s.display} id="psico-h" data-reveal="up">
            {psico.headline}
          </h2>
        </div>
        <div className={`${s.grid} ${s.afterHead}`}>
          <div className={`${s.read} ${s.stack}`} data-reveal="up">
            <Paragraphs items={psico.paragraphs} className={s.body} />
          </div>
        </div>
      </div>

      <div className={s.pin} data-pin="3.2">
        <div className={`${s.wrap} ${s.grid} ${s.stage}`}>
          <figure className={`${s.photo} ${s.stagePhoto}`}>
            <Image src={psico.image.src} alt={psico.image.alt} fill sizes="(min-width: 880px) 40vw, 100vw" style={{ objectPosition: psico.image.position }} />
          </figure>
          <div className={s.stageCopy}>
            <Progress total={psico.concepts.length} />
            <ul className={s.concepts} aria-label="Conceptos">
              {psico.concepts.map((c) => (
                <li key={c} className={s.statement} data-step>
                  {c}
                </li>
              ))}
            </ul>
            <div className={s.stageAfter} data-after>
              <p className={s.dato}>{psico.secondary.join(" · ")}</p>
              <p className={s.quiet}>{psico.statement}</p>
              <Btn href={psico.href} external>
                {psico.cta}
              </Btn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
