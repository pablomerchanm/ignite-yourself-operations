import { v3 } from "@/data/v3";
import Conversaciones from "./Conversaciones";
import Reels from "./Reels";

/**
 * 06 · PERSPECTIVAS. Casi sin copy: dos pantallas, el archivo vivo.
 * A) reels, como las «Short Stories» de Nike About: los ocho en una fila,
 * verticales, con título serif; B) conversaciones, como biblioteca sobre
 * negro.
 */
export default function Perspectivas() {
  const { perspectivas: p } = v3;
  return (
    <section id="perspectivas" aria-labelledby="persp-h">
      <Reels title={p.title} label={p.reels.label} items={p.reels.items} all={p.reels.all} />
      <Conversaciones label={p.conversaciones.label} items={p.conversaciones.items} all={p.conversaciones.all} />
    </section>
  );
}
