import Image from "next/image";
import type { CSSProperties } from "react";
import { v3 } from "@/data/v3";
import { SectionHead } from "./ui";
import s from "../v3.module.css";

/**
 * 02 · TERRITORIO / ORIGEN. Papel, aire y una sola voz: título de sección
 * en caja baja, titular serif, el copy en columna y la pregunta final en
 * itálica grande. La foto, alta, sangra por la derecha.
 */
export default function Origen() {
  const { origen } = v3;
  const [lead, ...rest] = origen.paragraphs;
  return (
    <section className={`${s.wrap} ${s.origen}`} id="origen" aria-labelledby="origen-h">
      <SectionHead label={origen.label} />
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
            sizes="(min-width: 880px) 44vw, 100vw"
            style={{ objectPosition: origen.image.position }}
          />
        </figure>
      </div>
    </section>
  );
}
