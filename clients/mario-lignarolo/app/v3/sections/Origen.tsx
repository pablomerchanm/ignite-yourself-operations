import Image from "next/image";
import type { CSSProperties } from "react";
import { v3 } from "@/data/v3";
import s from "../v3.module.css";

/**
 * 02 · TERRITORIO / ORIGEN. Cambio de ritmo tras la portada: papel, aire,
 * un titular serif y el copy en una columna; una foto alta a la derecha
 * (el cuerpo, la primera transformación visible). Sin biografía.
 */
export default function Origen() {
  const { origen } = v3;
  const [lead, ...rest] = origen.paragraphs;
  return (
    <section className={`${s.wrap} ${s.origen}`} id="origen" aria-labelledby="origen-h">
      <p className={s.label} data-reveal="up">
        {origen.label}
      </p>
      <h2 className={s.origenHead} id="origen-h" data-reveal="up" style={{ "--delay": "0.08s" } as CSSProperties}>
        {origen.headline}
      </h2>
      <div className={`${s.grid} ${s.origenGrid}`}>
        <div className={s.origenCopy} data-reveal="up">
          <p className={s.origenLead}>{lead}</p>
          {rest.map((p) => (
            <p key={p} className={s.body}>
              {p}
            </p>
          ))}
          <p className={s.origenQuestion}>{origen.question}</p>
        </div>
        <figure className={`${s.photo} ${s.origenPhoto}`} data-reveal="up" style={{ "--delay": "0.12s" } as CSSProperties}>
          <Image
            src={origen.image.src}
            alt={origen.image.alt}
            fill
            sizes="(min-width: 880px) 34vw, 100vw"
            style={{ objectPosition: origen.image.position }}
          />
        </figure>
      </div>
    </section>
  );
}
