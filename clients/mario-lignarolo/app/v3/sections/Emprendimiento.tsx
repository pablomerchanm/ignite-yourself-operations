import Image from "next/image";
import { v3 } from "@/data/v3";
import { Arrow, Paragraphs, Tag, ext } from "./ui";
import s from "../v3.module.css";

/**
 * 05 · EMPRENDIMIENTO / LIGNAROLO, en una sola pantalla, con la luz de su
 * propia foto: el gris de estudio. El retrato de campaña a sangre por la
 * derecha, fundido con el fondo (Mario sentado, pensando, con mocasines de
 * la marca). A su izquierda, en el vacío del estudio: la etiqueta, el golpe
 * en condensada, el copy en serif, los cinco territorios como etiqueta y el
 * cierre; abajo, Lignarolo como firma, con su frase y el enlace.
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
          <Tag label={e.label} />
          <h2 className={`${s.statement} ${s.golpe} ${s.empHead}`} id="emp-h" data-reveal="up">
            {e.headline}
          </h2>
          <div className={s.empCopy} data-reveal="up">
            <Paragraphs items={e.paragraphs} className={s.lectura} />
          </div>
          <p className={`${s.tag} ${s.empFields}`} data-reveal="up">
            {e.fields}
          </p>
          <p className={`${s.lectura} ${s.empClose}`} data-reveal="up">
            {e.close}
          </p>

          <article className={s.lg} id="lignarolo" aria-label={lg.name} data-reveal="up">
            <p className={s.lgMark}>{lg.name}</p>
            <p className={s.lectura}>{lg.text}</p>
            <a href={lg.href} className={s.link} {...ext}>
              {lg.cta} <Arrow />
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
