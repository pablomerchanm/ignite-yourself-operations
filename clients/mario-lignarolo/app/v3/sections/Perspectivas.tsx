import { v3 } from "@/data/v3";
import Conversaciones from "./Conversaciones";
import Reels from "./Reels";
import s from "../v3.module.css";

/**
 * 06 · PERSPECTIVAS. Casi sin copy: la palabra a toda escala y dos
 * bloques, el archivo vivo. A) reels, como las «Short Stories» de Nike
 * About: piezas verticales con título serif; B) conversaciones, como
 * biblioteca sobre casi negro.
 */
export default function Perspectivas() {
  const { perspectivas: p } = v3;
  return (
    <section className={s.persp} id="perspectivas" aria-labelledby="persp-h">
      <div className={s.wrap}>
        <h2 className={`${s.statement} ${s.perspTitle}`} id="persp-h" data-reveal="up">
          {p.title}
        </h2>
      </div>
      <Reels label={p.reels.label} items={p.reels.items} all={p.reels.all} />
      <Conversaciones label={p.conversaciones.label} items={p.conversaciones.items} all={p.conversaciones.all} />
    </section>
  );
}
