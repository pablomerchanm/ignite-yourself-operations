import type { ReactNode } from "react";
import { v3 } from "@/data/v3";
import s from "../v3.module.css";

/** `**obra**` → en blanco sobre el gris del párrafo: lo que se lee al escanear. */
function marks(text: string): ReactNode[] {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part));
}

/**
 * 01b · QUIÉN ES MARIO, en negro, a continuación de la portada: un solo
 * párrafo en serif, grande y en gris, con sus obras encendidas en blanco
 * (al modo de los «about» editoriales), y el paso a su historia completa.
 * Sin foto: la portada ya es su retrato; aquí manda la tipografía.
 */
export default function About() {
  const { about } = v3;
  return (
    <section className={`${s.dark} ${s.about}`} aria-label={about.label}>
      <div className={`${s.wrap} ${s.grid}`}>
        <div className={s.aboutBody} data-reveal="up">
          <p className={s.aboutText}>{marks(about.text)}</p>
          <a href={about.link.href} className={s.aboutLink}>
            {about.link.label}
            <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M1 8h13M9 3l5 5-5 5" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
