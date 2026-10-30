import Image from "next/image";
import { v3 } from "@/data/v3";
import { Words } from "./ui";
import s from "../v3.module.css";

/**
 * 02 · TERRITORIO / ORIGEN, en blanco, en una sola pantalla. El código de
 * Nike About: un golpe en condensada (los cuatro territorios, palabras
 * sueltas) y la voz de Mario en serif (titular, manifiesto y pregunta). En
 * escritorio la escena se fija ([data-pin]) y el scroll enciende el
 * manifiesto palabra a palabra, hasta la pregunta. A la izquierda, los
 * territorios y el titular; en el centro, el manifiesto; a la derecha, la
 * foto a toda altura. En móvil, todo en el flujo.
 */
export default function Origen() {
  const { origen } = v3;
  return (
    <section className={s.origen} id="origen" aria-labelledby="origen-h" data-pin="2.8">
      <div className={`${s.wrap} ${s.grid} ${s.origenFrame}`} data-scrub="0.68">
        <div className={s.origenSide}>
          <p className={`${s.statement} ${s.origenTerritories}`} data-reveal="up">
            {origen.label.split(" · ").map((t) => (
              <span key={t}>{t}</span>
            ))}
          </p>
          <h2 className={s.origenHead} id="origen-h" data-reveal="up">
            {origen.headline}
          </h2>
        </div>

        <div className={s.manifestoText}>
          {origen.paragraphs.map((p) => (
            <p key={p} className={s.scrubText}>
              <Words text={p} />
            </p>
          ))}
          <p className={s.question}>
            <Words text={origen.question} />
          </p>
        </div>

        <figure className={`${s.photo} ${s.manifestoPhoto}`}>
          <Image src={origen.image.src} alt={origen.image.alt} fill sizes="(min-width: 881px) 28vw, 100vw" style={{ objectPosition: origen.image.position }} />
        </figure>
      </div>
    </section>
  );
}
