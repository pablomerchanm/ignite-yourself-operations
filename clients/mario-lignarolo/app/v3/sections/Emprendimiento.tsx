import Image from "next/image";
import { site } from "@/data/content";
import { v3 } from "@/data/v3";
import { Arrow, Paragraphs, SectionHead, ext } from "./ui";
import s from "../v3.module.css";

/**
 * 05 · EMPRENDIMIENTO / LIGNAROLO, en blanco y con menos peso. La misma
 * apertura que el resto (título, titular serif, copy en la columna de
 * lectura) y Lignarolo como una página de campaña: la foto panorámica con
 * la figura a la derecha y el texto sobre el vacío.
 */
export default function Emprendimiento() {
  const { emprendimiento: e } = v3;
  const { lignarolo: lg } = e;
  return (
    <section className={`${s.wrap} ${s.section}`} id="emprendimiento" aria-labelledby="emp-h">
      <SectionHead label={e.label} />
      <h2 className={`${s.serifHead} ${s.head}`} id="emp-h" data-reveal="up">
        {e.headline}
      </h2>

      <div className={`${s.grid} ${s.afterHead}`}>
        <div className={`${s.read} ${s.stack}`} data-reveal="up">
          <Paragraphs items={e.paragraphs} className={s.body} />
          <p className={s.lead}>{e.fields}</p>
          <p className={s.body}>{e.close}</p>
        </div>
      </div>

      <article className={s.lg} id="lignarolo" aria-label={lg.name}>
        <div className={s.lgFrame} data-reveal="up">
          <figure className={`${s.photo} ${s.lgPhoto}`}>
            <Image src={lg.image.src} alt={lg.image.alt} fill sizes="100vw" />
          </figure>
          <div className={s.lgOver}>
            <p className={s.lead}>{lg.text}</p>
            <a href={lg.href} className={s.link} {...ext}>
              {lg.cta} <Arrow />
            </a>
          </div>
        </div>
        {site.draft && (
          <div className={s.lgPending} aria-label="Fotografía pendiente">
            {lg.pending.map((p) => (
              <div key={p} className={s.pending}>
                Foto pendiente · {p}
              </div>
            ))}
          </div>
        )}
      </article>
    </section>
  );
}
