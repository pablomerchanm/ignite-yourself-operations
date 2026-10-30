import Image from "next/image";
import { v3 } from "@/data/v3";
import { Arrow, Paragraphs, SectionHead, ext } from "./ui";
import s from "../v3.module.css";

/**
 * 03 · PSICOCIBERNÉTICA, en negro. Apertura: título, el titular en
 * condensada y el copy en la columna de lectura. Después, la escena fija
 * (escritorio): el retrato a la izquierda y los cuatro conceptos que se
 * encienden de uno en uno, como una respiración; al final aparecen los
 * secundarios, el statement y el enlace.
 */
export default function Psico() {
  const { psico } = v3;
  return (
    <section className={`${s.dark} ${s.psico}`} id="psicocibernetica" aria-labelledby="psico-h">
      <div className={`${s.wrap} ${s.sectionTop}`}>
        <SectionHead label={psico.label} />
        <h2 className={`${s.statement} ${s.displayHead} ${s.psicoHead}`} id="psico-h" data-reveal="up">
          {psico.headline}
        </h2>
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
            <ul className={s.concepts} aria-label="Conceptos">
              {psico.concepts.map((c) => (
                <li key={c} className={s.statement} data-step>
                  {c}
                </li>
              ))}
            </ul>
            <div className={s.stageAfter} data-after>
              <p className={s.small}>{psico.secondary.join(" · ")}</p>
              <p className={s.quiet}>{psico.statement}</p>
              <a href={psico.href} className={s.link} {...ext}>
                {psico.cta} <Arrow />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
