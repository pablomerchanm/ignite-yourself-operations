import Image from "next/image";
import { v3 } from "@/data/v3";
import { Progress, SectionHead, Words } from "./ui";
import s from "../v3.module.css";

/**
 * 02 · TERRITORIO / ORIGEN, en blanco. Título y titular serif; después, el
 * manifiesto como lectura guiada: todo a un mismo tamaño grande, cada palabra
 * se enciende al cruzar la línea de lectura, con la foto fija a la derecha y
 * la barra de progreso (01 / 05) debajo. Al final, un silencio y la pregunta,
 * sola y centrada.
 */
export default function Origen() {
  const { origen } = v3;
  return (
    <section className={`${s.wrap} ${s.section}`} id="origen" aria-labelledby="origen-h">
      <SectionHead label={origen.label} />
      <h2 className={`${s.serifHead} ${s.head}`} id="origen-h" data-reveal="up">
        {origen.headline}
      </h2>

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
