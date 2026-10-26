import { v3 } from "@/data/v3";
import Conversaciones from "./Conversaciones";
import Reels from "./Reels";
import s from "../v3.module.css";

/**
 * 06 · PERSPECTIVAS. Casi sin copy: un título a toda escala y dos
 * bloques, el archivo vivo. A) reels, en carrusel; B) conversaciones,
 * como biblioteca sobre fondo oscuro.
 */
export default function Perspectivas() {
  const { perspectivas: p } = v3;
  return (
    <section className={s.persp} id="perspectivas" aria-labelledby="persp-h">
      <h2 className={`${s.wrap} ${s.statement} ${s.perspTitle}`} id="persp-h" data-reveal="up">
        {p.title}
      </h2>
      <Reels label={p.reels.label} items={p.reels.items} all={p.reels.all} />
      <Conversaciones label={p.conversaciones.label} items={p.conversaciones.items} all={p.conversaciones.all} />
    </section>
  );
}
