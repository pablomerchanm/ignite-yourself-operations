import Image from "next/image";
import { v3 } from "@/data/v3";
import { Btn, Paragraphs, Tag } from "./ui";
import s from "../v3.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * 03 · PSICOCIBERNÉTICA, en negro, en una sola pantalla. Retícula
 * editorial, en dos bandas y con dos ejes (la columna 1 y la 7), sin
 * cajas: arriba, a la izquierda, la etiqueta, el golpe en condensada y,
 * pegada a él, la voz de Mario en itálica; a la derecha, desde la columna
 * 7, el copy y el botón. Abajo, el retrato en una banda ancha a sangre por
 * la izquierda y, desde la columna 7, los cuatro conceptos con su índice.
 * En escritorio la escena se fija ([data-pin]) y los conceptos se
 * encienden de uno en uno; al final aparecen los secundarios. En móvil, en
 * el flujo.
 */
export default function Psico() {
  const { psico } = v3;
  return (
    <section className={`${s.dark} ${s.psico}`} id="psicocibernetica" aria-labelledby="psico-h" data-pin="2.4">
      <div className={`${s.wrap} ${s.grid} ${s.screen} ${s.psicoFrame}`}>
        <div className={s.psicoLead}>
          <Tag label={psico.label} />
          <h2 className={`${s.statement} ${s.golpe} ${s.psicoHead}`} id="psico-h" data-reveal="up">
            {psico.headline}
          </h2>
          <p className={`${s.quiet} ${s.psicoVoice}`} data-reveal="up">
            {psico.statement}
          </p>
        </div>

        <div className={s.psicoIntro} data-reveal="up">
          <Paragraphs items={psico.paragraphs} className={s.lectura} />
          <div className={s.psicoCta}>
            <Btn href={psico.href}>{psico.cta}</Btn>
          </div>
        </div>

        <figure className={`${s.photo} ${s.psicoPhoto}`}>
          <Image src={psico.image.src} alt={psico.image.alt} fill sizes="(min-width: 881px) 52vw, 100vw" style={{ objectPosition: "50% 34%" }} />
        </figure>

        <div className={s.psicoStage}>
          <ol className={s.concepts} aria-label="Conceptos">
            {psico.concepts.map((c, i) => (
              <li key={c} data-step>
                <span className={s.conceptIndex}>({pad(i + 1)})</span>
                {c}
              </li>
            ))}
          </ol>
          <p className={`${s.tag} ${s.psicoSecondary}`} data-after>
            {psico.secondary.join(" · ")}
          </p>
        </div>
      </div>
    </section>
  );
}
