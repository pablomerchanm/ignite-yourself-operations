import Image from "next/image";
import { v3 } from "@/data/v3";
import { Arrow, Paragraphs, Tag, ext } from "./ui";
import s from "../v3.module.css";

/**
 * 03 · PSICOCIBERNÉTICA, en negro, en una sola pantalla: el reflejo de
 * Origen. A la izquierda, el retrato a toda altura; en el centro, la
 * etiqueta, el golpe en condensada y el copy en serif; a la derecha, los
 * cuatro conceptos. En escritorio la escena se fija ([data-pin]) y los
 * conceptos se encienden de uno en uno, como una respiración; al final
 * aparecen los secundarios, el statement y el enlace. En móvil, en el flujo.
 */
export default function Psico() {
  const { psico } = v3;
  return (
    <section className={`${s.dark} ${s.psico}`} id="psicocibernetica" aria-labelledby="psico-h" data-pin="2.4">
      <div className={`${s.wrap} ${s.grid} ${s.screen} ${s.psicoFrame}`}>
        <figure className={`${s.photo} ${s.psicoPhoto}`}>
          <Image src={psico.image.src} alt={psico.image.alt} fill sizes="(min-width: 881px) 32vw, 100vw" style={{ objectPosition: psico.image.position }} />
        </figure>

        <div className={s.psicoIntro}>
          <Tag label={psico.label} />
          <h2 className={`${s.statement} ${s.golpe} ${s.psicoHead}`} id="psico-h" data-reveal="up">
            {psico.headline}
          </h2>
          <div className={s.psicoCopy} data-reveal="up">
            <Paragraphs items={psico.paragraphs} className={s.lectura} />
          </div>
        </div>

        <div className={s.psicoStage}>
          <ul className={s.concepts} aria-label="Conceptos">
            {psico.concepts.map((c) => (
              <li key={c} data-step>
                {c}
              </li>
            ))}
          </ul>
          <div className={s.stageAfter} data-after>
            <p className={s.tag}>{psico.secondary.join(" · ")}</p>
            <p className={s.quiet}>{psico.statement}</p>
            <a href={psico.href} className={s.link} {...ext}>
              {psico.cta} <Arrow />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
