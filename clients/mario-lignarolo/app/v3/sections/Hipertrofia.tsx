import Image from "next/image";
import type { CSSProperties } from "react";
import { v3 } from "@/data/v3";
import { Arrow, Lines, Paragraphs, SectionHead, ext } from "./ui";
import s from "../v3.module.css";

/**
 * 04 · HIPERTROFIA DEL SER, sobre casi negro, como el bloque de
 * entrevistas de Nike About: título de sección, el titular a toda escala
 * (el cuerpo en condensada, el ser en serif), el copy y una retícula de
 * tres columnas con las entradas reales de Substack y sus portadas; la
 * tarjeta central lleva la imagen más alta y escalona la fila.
 */
export default function Hipertrofia() {
  const { hipertrofia: h } = v3;
  return (
    <section className={`${s.dark} ${s.pub}`} id="hipertrofia" aria-labelledby="pub-h">
      <div className={s.wrap}>
        <SectionHead label={h.label} />
        <Lines
          as="h2"
          id="pub-h"
          className={s.pubHead}
          lines={[
            <span key="a" className={s.statement}>
              El cuerpo
            </span>,
            <span key="b" className={s.statement}>
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

        <ul className={s.cards}>
          {h.pieces.map((p, i) => (
            <li key={p.href} className={s.card}>
              <a href={p.href} className={s.cardLink} {...ext} data-reveal="up" style={{ "--delay": `${(i % 3) * 0.08}s` } as CSSProperties}>
                <span className={`${s.photo} ${s.cardPhoto}`}>
                  <Image src={p.image.src} alt={p.image.alt} fill sizes="(min-width: 880px) 31vw, 100vw" />
                </span>
                <span className={s.cardBody}>
                  <span className={s.small}>
                    {p.date} · {p.minutes} min
                  </span>
                  <h3 className={s.cardTitle}>{p.title}</h3>
                  <span className={s.dek}>{p.dek}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
