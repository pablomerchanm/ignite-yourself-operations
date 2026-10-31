import Image from "next/image";
import type { Reel } from "@/data/v3";
import { Arrow, ext } from "./ui";
import s from "../v3.module.css";

/**
 * 06 A · REELS, en una pantalla. En escritorio ancho, los ocho en una fila,
 * sin controles: se ven todos. En pantallas medianas y en móvil, una tira
 * con desplazamiento nativo (scroll-snap). Cada pieza enlaza a su
 * publicación; la portada y el texto son los de Mario.
 */
export default function Reels({ title, label, items, all }: { title: string; label: string; items: Reel[]; all: { label: string; href: string } }) {
  return (
    <div className={`${s.screen} ${s.reels}`}>
      <div className={`${s.wrap} ${s.blockHead}`}>
        <h2 className={s.tag} id="persp-h" data-reveal="up">
          {title} · {label}
        </h2>
        <a href={all.href} className={s.link} {...ext}>
          {all.label} <Arrow />
        </a>
      </div>

      <ul className={s.reelTrack}>
        {items.map((r, i) => (
          <li key={r.code} className={s.reel}>
            <a href={`https://www.instagram.com/reel/${r.code}/`} {...ext} className={s.reelLink}>
              <span className={`${s.photo} ${s.reelCover}`}>
                <Image src={r.src} alt="" fill sizes="(min-width: 1201px) 12vw, (min-width: 881px) 22vw, 62vw" priority={i < 2} />
              </span>
              <span className={s.reelTitle}>{r.title}</span>
              <span className={s.small}>
                {r.duration} · {r.date}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
