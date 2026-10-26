import { v3 } from "@/data/v3";
import Conversaciones from "./Conversaciones";
import Reels from "./Reels";
import s from "../v3.module.css";

/**
 * 06 · PERSPECTIVAS. Casi sin copy: la palabra en condensada y dos
 * bloques, el archivo vivo. A) reels, como las «Short Stories» de Nike
 * About: verticales con título serif; B) conversaciones, como biblioteca
 * sobre negro.
 */
export default function Perspectivas() {
  const { perspectivas: p } = v3;
  return (
    <section id="perspectivas" aria-labelledby="persp-h">
      <div className={`${s.wrap} ${s.perspHead}`}>
        <h2 className={`${s.statement} ${s.displayHead}`} id="persp-h" data-reveal="up">
          {p.title}
        </h2>
      </div>
      <Reels label={p.reels.label} items={p.reels.items} all={p.reels.all} />
      <Conversaciones label={p.conversaciones.label} items={p.conversaciones.items} all={p.conversaciones.all} />
    </section>
  );
}
