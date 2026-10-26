import Image from "next/image";
import type { CSSProperties } from "react";
import { v3 } from "@/data/v3";
import HdsSymbol from "../HdsSymbol";
import { Arrow, Paragraphs, Words, ext } from "./ui";
import s from "../v3.module.css";

/**
 * 04 · HIPERTROFIA DEL SER, en negro: una publicación con identidad propia.
 * Abre con su cabecera (el símbolo, que crece con el scroll, y el nombre)
 * en el lugar del título de sección; después, el titular en condensada
 * («El ser también.» se enciende con el scroll) y el copy en la columna de
 * lectura. Seis entradas reales de Substack, todas al mismo tamaño y con
 * títulos en serif; al cierre, una suscripción discreta con el símbolo.
 */
export default function Hipertrofia() {
  const { hipertrofia: h } = v3;
  return (
    <section className={`${s.dark} ${s.pub}`} id="hipertrofia" aria-labelledby="pub-h">
      <div className={`${s.wrap} ${s.section}`}>
        <div className={s.hdsMasthead} data-reveal="up">
          <HdsSymbol grow className={s.hdsSymbol} />
          <p className={s.hdsMast}>
            <span className={s.hdsMastName}>{h.masthead[0]}</span>{" "}
            <span className={s.hdsMastDel}>{h.masthead[1]}</span>
          </p>
        </div>
        <h2 className={`${s.statement} ${s.displayHead}`} id="pub-h" data-scrub="0.82">
          <span className={s.line}>{h.headline[0]}</span>
          <span className={s.line}>
            <Words text={h.headline[1]} />
          </span>
        </h2>

        <div className={`${s.grid} ${s.afterHead}`}>
          <div className={`${s.read} ${s.stack}`} data-reveal="up">
            <Paragraphs items={h.paragraphs} className={s.body} />
            <a href={h.href} className={s.link} {...ext}>
              {h.cta} <Arrow />
            </a>
          </div>
        </div>

        <ul className={s.cards} aria-label="Entradas">
          {h.pieces.map((p, i) => (
            <li key={p.href}>
              <a href={p.href} className={s.cardLink} {...ext} data-reveal="up" style={{ "--delay": `${(i % 3) * 0.08}s` } as CSSProperties}>
                <span className={`${s.photo} ${s.cardPhoto}`}>
                  <Image src={p.image.src} alt={p.image.alt} fill sizes="(min-width: 880px) 31vw, 100vw" />
                </span>
                <span className={s.small}>
                  {p.date} · {p.minutes} min
                </span>
                <h3 className={s.cardTitle}>{p.title}</h3>
                <span className={s.dek}>{p.dek}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* Suscripción: el gesto del widget de Substack, en pequeño y sin JavaScript. */}
        <div className={s.subscribe} data-reveal="up">
          <p className={s.small}>{h.subscribe.label}</p>
          <p className={s.subHead}>{h.subscribe.headline}</p>
          <div className={s.subPub}>
            <HdsSymbol variant="small" className={s.subLogo} />
            <span>
              <span className={s.subName}>{h.subscribe.name}</span>
              <span className={s.small}>{h.subscribe.by}</span>
            </span>
          </div>
          <form className={s.subForm} action={h.subscribe.action} method="post" target="_blank" rel="noopener">
            <label className={s.srOnly} htmlFor="sub-email">
              Correo electrónico
            </label>
            <input id="sub-email" name="email" type="email" required autoComplete="email" placeholder={h.subscribe.placeholder} />
            <button type="submit">{h.subscribe.button}</button>
          </form>
          <p className={s.subLegal}>
            {h.subscribe.legal.map((part, i) =>
              typeof part === "string" ? (
                <span key={i}>{part}</span>
              ) : (
                <a key={i} href={part.href} {...ext}>
                  {part.label}
                </a>
              ),
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
