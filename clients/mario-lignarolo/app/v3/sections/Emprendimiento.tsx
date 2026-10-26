import Image from "next/image";
import type { CSSProperties } from "react";
import { site } from "@/data/content";
import { v3 } from "@/data/v3";
import { Arrow, Paragraphs, SectionHead, ext } from "./ui";
import s from "../v3.module.css";

/**
 * 05 · EMPRENDIMIENTO / LIGNAROLO, en blanco y con menos peso: titular
 * serif a escala media y el copy en primera persona. Lignarolo como una
 * página de campaña: la foto panorámica con la figura a la derecha y el
 * texto sobre el vacío.
 */
export default function Emprendimiento() {
  const { emprendimiento: e } = v3;
  const { lignarolo: lg } = e;
  return (
    <section className={s.emp} id="emprendimiento" aria-labelledby="emp-h">
      <div className={s.wrap}>
        <SectionHead label={e.label} />
      </div>
      <div className={`${s.wrap} ${s.grid} ${s.empGrid}`}>
        <div className={s.empHeadCol} data-reveal="up">
          <h2 className={`${s.serifHead} ${s.empHead}`} id="emp-h">
            {e.headline}
          </h2>
        </div>
        <div className={s.empCopy} data-reveal="up" style={{ "--delay": "0.1s" } as CSSProperties}>
          <Paragraphs items={e.paragraphs} className={s.body} />
          <p className={s.empFields}>{e.fields}</p>
          <p className={s.body}>{e.close}</p>
        </div>
      </div>

      <article className={`${s.wrap} ${s.lg}`} id="lignarolo" aria-label={lg.name}>
        <div className={s.lgFrame}>
          <figure className={`${s.photo} ${s.lgPhoto}`} data-reveal="up">
            <Image src={lg.image.src} alt={lg.image.alt} fill sizes="100vw" />
          </figure>
          <div className={s.lgOver} data-reveal="up" style={{ "--delay": "0.15s" } as CSSProperties}>
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
