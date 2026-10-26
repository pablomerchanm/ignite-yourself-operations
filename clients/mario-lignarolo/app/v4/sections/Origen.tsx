import Image from "next/image";
import { v3 } from "@/data/v3";
import { Progress, SectionHead, Words } from "./ui";
import s from "../v4.module.css";

/**
 * 02 · TERRITORIO / ORIGEN, en claro (hueso). Apertura: la etiqueta en la
 * columna índice y el titular en la voz de Mario (Cormorant). Después, el
 * manifiesto como lectura guiada, en statement (Geist 600, todo a un
 * tamaño): cada palabra se enciende al cruzar la línea de lectura, con la
 * foto fija a la derecha y la barra de progreso (01/05) debajo. Al final,
 * un silencio y la pregunta, en itálica, sola y centrada.
 */
export default function Origen() {
  const { origen } = v3;
  return (
    <section className={`${s.wrap} ${s.section}`} id="origen" aria-labelledby="origen-h">
      <div className={s.opener}>
        <SectionHead label={origen.label} />
        <h2 className={s.serifHead} id="origen-h" data-reveal="up">
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
            <Image src={origen.image.src} alt={origen.image.alt} fill sizes="(min-width: 880px) 30vw, 100vw" style={{ objectPosition: origen.image.position }} />
          </figure>
          <Progress total={origen.paragraphs.length} />
        </div>
      </div>

      <p className={`${s.quietL} ${s.question}`} data-scrub="0.75">
        <Words text={origen.question} />
      </p>
    </section>
  );
}
