import Image from "next/image";
import type { CSSProperties } from "react";
import { v3, type Piece } from "@/data/v3";
import { Arrow, Lines, Paragraphs, SectionHead, ext } from "./ui";
import s from "../v3.module.css";

function Meta({ p }: { p: Piece }) {
  return (
    <p className={s.small}>
      {p.date} · {p.minutes} min
    </p>
  );
}

/**
 * 04 · HIPERTROFIA DEL SER. Una publicación: el titular ocupa la pantalla
 * (el cuerpo en grotesk condensada, el ser en serif) y debajo una portada
 * al modo del magazine de Nike About: lead con foto apaisada y titular
 * serif grande; a la derecha, un secundario y el listado, sin filetes.
 */
export default function Hipertrofia() {
  const { hipertrofia: h } = v3;
  const [first, ...rest] = h.pieces;
  return (
    <section className={`${s.wrap} ${s.pub}`} id="hipertrofia" aria-labelledby="pub-h">
      <SectionHead label={h.label} />
      <Lines
        as="h2"
        id="pub-h"
        className={s.pubHead}
        lines={[
          <span key="a" className={`${s.statement} ${s.pubHeadA}`}>
            El cuerpo
          </span>,
          <span key="b" className={`${s.statement} ${s.pubHeadA}`}>
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
        <div className={s.pubText} data-reveal="up">
          <Paragraphs items={h.paragraphs} className={s.body} />
          <a href={h.href} className={s.link} {...ext}>
            {h.cta} <Arrow />
          </a>
        </div>
      </div>

      <div className={`${s.grid} ${s.pubGrid}`}>
        <a href={h.lead.href} className={s.lead} {...ext} data-reveal="up">
          <figure className={`${s.photo} ${s.leadPhoto}`}>
            <Image src={h.cover.src} alt={h.cover.alt} fill sizes="(min-width: 880px) 56vw, 100vw" style={{ objectPosition: "50% 22%" }} />
          </figure>
          <div className={s.leadBody}>
            <Meta p={h.lead} />
            <h3 className={s.leadTitle}>{h.lead.title}</h3>
            <p className={s.dek}>{h.lead.dek}</p>
          </div>
        </a>

        <div className={s.pubSide}>
          <a href={first.href} className={s.pieceFirst} {...ext} data-reveal="up" style={{ "--delay": "0.1s" } as CSSProperties}>
            <Meta p={first} />
            <h3 className={s.pieceFirstTitle}>{first.title}</h3>
            <p className={s.dek}>{first.dek}</p>
          </a>
          <ul className={s.pieceList}>
            {rest.map((p, i) => (
              <li key={p.href}>
                <a href={p.href} className={s.pieceRow} {...ext} data-reveal="up" style={{ "--delay": `${0.14 + i * 0.06}s` } as CSSProperties}>
                  <Meta p={p} />
                  <h3 className={s.pieceTitle}>{p.title}</h3>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
