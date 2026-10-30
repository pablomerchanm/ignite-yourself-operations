import Image from "next/image";
import { v3 } from "@/data/v3";
import { Progress, Words } from "./ui";
import s from "../v3.module.css";

/**
 * 02 · TERRITORIO / ORIGEN, en blanco. La primera lectura, en una sola voz:
 * la serif de Mario a tamaños contenidos. La etiqueta en la columna índice
 * y, desde la columna 4, el titular y el manifiesto como lectura guiada:
 * cada palabra se enciende al cruzar la línea de lectura, con la foto fija
 * a la derecha y la barra de progreso (01 / 05) debajo. Al final, un
 * silencio y la pregunta, sola y centrada.
 */
export default function Origen() {
  const { origen } = v3;
  return (
    <section className={`${s.wrap} ${s.section} ${s.origen}`} id="origen" aria-labelledby="origen-h">
      <div className={`${s.grid} ${s.origenTop}`}>
        <p className={s.indexLabel} data-reveal="up">
          {origen.label.split(" · ").map((t) => (
            <span key={t}>{t}</span>
          ))}
        </p>
        <h2 className={s.origenHead} id="origen-h" data-reveal="up">
          {origen.headline}
        </h2>
      </div>

      <div className={`${s.grid} ${s.manifesto}`} data-scrub="0.68">
        <div className={s.manifestoText}>
          {origen.paragraphs.map((p) => (
            <p key={p} className={s.scrubText} data-seg>
              <Words text={p} />
            </p>
          ))}
        </div>
        <div className={s.manifestoAside}>
          <figure className={`${s.photo} ${s.manifestoPhoto}`}>
            <Image src={origen.image.src} alt={origen.image.alt} fill sizes="(min-width: 1101px) 26vw, (min-width: 881px) 36vw, 100vw" style={{ objectPosition: origen.image.position }} />
          </figure>
          <Progress total={origen.paragraphs.length} />
        </div>
      </div>

      <p className={s.question} data-scrub="0.75">
        <Words text={origen.question} />
      </p>
    </section>
  );
}
