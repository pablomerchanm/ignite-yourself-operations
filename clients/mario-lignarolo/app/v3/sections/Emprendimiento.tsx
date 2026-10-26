import Image from "next/image";
import type { CSSProperties } from "react";
import { site } from "@/data/content";
import { v3 } from "@/data/v3";
import { Arrow, Paragraphs, ext } from "./ui";
import s from "../v3.module.css";

/**
 * 05 · EMPRENDIMIENTO / LIGNAROLO. Menos peso que los dos mundos
 * anteriores: fondo cálido, titular serif a escala media, el copy en
 * primera persona y, como evidencia, la fotografía de Lignarolo con
 * un solo enlace. Las fotos de producto y taller quedan como pendientes.
 */
export default function Emprendimiento() {
  const { emprendimiento: e } = v3;
  const { lignarolo: lg } = e;
  return (
    <section className={s.emp} id="emprendimiento" aria-labelledby="emp-h">
      <div className={`${s.wrap} ${s.grid} ${s.empGrid}`}>
        <div className={s.empHeadCol} data-reveal="up">
          <p className={s.label}>{e.label}</p>
          <h2 className={s.empHead} id="emp-h">
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
        <figure className={`${s.photo} ${s.lgPhoto}`} data-reveal="up">
          <Image src={lg.image.src} alt={lg.image.alt} fill sizes="100vw" style={{ objectPosition: lg.image.position }} />
        </figure>
        <div className={`${s.grid} ${s.lgRow}`}>
          <div className={s.lgText} data-reveal="up">
            <p className={s.lgLine}>{lg.text}</p>
            <a href={lg.href} className={s.link} {...ext}>
              {lg.cta} <Arrow />
            </a>
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
        </div>
      </article>
    </section>
  );
}
