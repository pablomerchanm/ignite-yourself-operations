import Image from "next/image";
import type { CSSProperties } from "react";
import { v3, type Piece } from "@/data/v3";
import { Arrow, Lines, Paragraphs, ext } from "./ui";
import s from "../v3.module.css";

function Meta({ p }: { p: Piece }) {
  return (
    <span className={s.meta}>
      {p.date} · {p.minutes} min
    </span>
  );
}

/**
 * 04 · HIPERTROFIA DEL SER. Una publicación, no un widget: el titular
 * ocupa gran parte de la pantalla (el cuerpo en sans, el ser en serif),
 * y debajo una portada editorial con jerarquía desigual: lead con foto,
 * un secundario grande y un listado. Piezas reales del archivo.
 */
export default function Hipertrofia() {
  const { hipertrofia: h } = v3;
  const [first, ...rest] = h.pieces;
  return (
    <section className={`${s.wrap} ${s.pub}`} id="hipertrofia" aria-labelledby="pub-h">
      <Lines
        as="h2"
        id="pub-h"
        className={s.pubHead}
        lines={[
          <span key="a" className={s.pubHeadA}>
            El cuerpo
          </span>,
          <span key="b" className={s.pubHeadA}>
            se entrena.
          </span>,
          <span key="c" className={s.pubHeadB}>
            El ser
          </span>,
          <span key="d" className={s.pubHeadB}>
            también.
          </span>,
        ]}
      />

      <div className={`${s.grid} ${s.pubIntro}`}>
        <p className={`${s.label} ${s.pubLabel}`} data-reveal="up">
          {h.label}
        </p>
        <div className={s.pubText} data-reveal="up" style={{ "--delay": "0.08s" } as CSSProperties}>
          <Paragraphs items={h.paragraphs} className={s.body} />
          <a href={h.href} className={s.link} {...ext}>
            {h.cta} <Arrow />
          </a>
        </div>
      </div>

      <div className={`${s.grid} ${s.pubGrid}`}>
        <a href={h.lead.href} className={s.lead} {...ext} data-reveal="up">
          <figure className={`${s.photo} ${s.leadPhoto}`}>
            <Image src={h.cover.src} alt={h.cover.alt} fill sizes="(min-width: 880px) 28vw, 100vw" style={{ objectPosition: h.cover.position }} />
          </figure>
          <div className={s.leadBody}>
            <h3 className={s.leadTitle}>{h.lead.title}</h3>
            <p className={s.dek}>{h.lead.dek}</p>
            <Meta p={h.lead} />
          </div>
        </a>

        <div className={s.pubSide}>
          <a href={first.href} className={s.pieceFirst} {...ext} data-reveal="up" style={{ "--delay": "0.1s" } as CSSProperties}>
            <h3 className={s.pieceFirstTitle}>{first.title}</h3>
            <p className={s.dek}>{first.dek}</p>
            <Meta p={first} />
          </a>
          <ol className={s.pieceList}>
            {rest.map((p, i) => (
              <li key={p.href}>
                <a href={p.href} className={s.pieceRow} {...ext} data-reveal="up" style={{ "--delay": `${0.14 + i * 0.06}s` } as CSSProperties}>
                  <span className={s.pieceIndex}>{String(i + 2).padStart(2, "0")}</span>
                  <span>
                    <h3 className={s.pieceTitle}>{p.title}</h3>
                    <Meta p={p} />
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
