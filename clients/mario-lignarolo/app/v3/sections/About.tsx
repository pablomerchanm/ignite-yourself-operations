import Image from "next/image";
import type { ReactNode } from "react";
import { v3 } from "@/data/v3";
import s from "../v3.module.css";

/** `**obra**` → en blanco sobre el gris del párrafo: lo que se lee al escanear. */
function marks(text: string): ReactNode[] {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part));
}

/**
 * 01b · QUIÉN ES MARIO, en negro, a continuación de la portada, al modo de
 * los «about» editoriales: a la izquierda, un solo párrafo en serif, en
 * gris, con sus obras encendidas en blanco, y el paso a su historia
 * completa; a la derecha, su retrato, a toda altura y a sangre.
 */
export default function About() {
  const { about, hero } = v3;
  return (
    <section className={`${s.dark} ${s.about}`} aria-label={about.label}>
      <div className={`${s.wrap} ${s.grid} ${s.screen} ${s.aboutFrame}`}>
        <div className={s.aboutBody} data-reveal="up">
          <p className={s.aboutText}>{marks(about.text)}</p>
          <a href={about.link.href} className={s.aboutLink}>
            {about.link.label}
            <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M1 8h13M9 3l5 5-5 5" />
            </svg>
          </a>
        </div>
        <figure className={`${s.photo} ${s.aboutPhoto}`}>
          <Image src={hero.image.src} alt={hero.image.alt} fill unoptimized sizes="(min-width: 881px) 46vw, 100vw" />
        </figure>
      </div>
    </section>
  );
}
