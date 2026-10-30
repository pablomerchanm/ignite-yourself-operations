import Image from "next/image";
import type { CSSProperties } from "react";
import { v3 } from "@/data/v3";
import HdsSymbol from "../HdsSymbol";
import { Arrow, Paragraphs, ext } from "./ui";
import s from "../v3.module.css";

/**
 * 04 · HIPERTROFIA DEL SER, en negro, en una sola pantalla: una publicación
 * con identidad propia. Arriba, en tres columnas: su cabecera (el símbolo,
 * que crece con el scroll, y el nombre) con el golpe en condensada; el copy
 * en serif con el enlace; y la suscripción, en una línea. Abajo, las seis
 * entradas reales de Substack en una sola fila, como un índice.
 */
export default function Hipertrofia() {
  const { hipertrofia: h } = v3;
  return (
    <section className={s.dark} id="hipertrofia" aria-labelledby="pub-h">
      <div className={`${s.wrap} ${s.grid} ${s.screen} ${s.hdsFrame}`}>
        <div className={s.hdsLead}>
          <div className={s.hdsMasthead} data-reveal="up">
            <HdsSymbol variant="small" grow className={s.hdsSymbol} />
            <p className={s.hdsMast}>
              <span className={s.hdsMastName}>{h.masthead[0]}</span>{" "}
              <span className={s.hdsMastDel}>{h.masthead[1]}</span>
            </p>
          </div>
          <h2 className={`${s.statement} ${s.golpe} ${s.hdsHead}`} id="pub-h" data-reveal="up">
            <span className={s.line}>{h.headline[0]}</span> <span className={s.line}>{h.headline[1]}</span>
          </h2>
        </div>

        <div className={s.hdsIntro} data-reveal="up">
          <Paragraphs items={h.paragraphs} className={s.lectura} />
          <a href={h.href} className={s.link} {...ext}>
            {h.cta} <Arrow />
          </a>
        </div>

        {/* Suscripción: el gesto del widget de Substack, en una línea y sin JavaScript. */}
        <div className={s.subscribe} data-reveal="up">
          <p className={s.tag}>{h.subscribe.label}</p>
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

        <ul className={s.cards} aria-label="Entradas">
          {h.pieces.map((p, i) => (
            <li key={p.href}>
              <a href={p.href} className={s.cardLink} {...ext} data-reveal="up" style={{ "--delay": `${i * 0.05}s` } as CSSProperties}>
                <span className={`${s.photo} ${s.cardPhoto}`}>
                  <Image src={p.image.src} alt={p.image.alt} fill sizes="(min-width: 1101px) 15vw, (min-width: 881px) 30vw, 80vw" />
                </span>
                <span className={s.small}>
                  {p.date} · {p.minutes} min
                </span>
                <h3 className={s.cardTitle}>{p.title}</h3>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
