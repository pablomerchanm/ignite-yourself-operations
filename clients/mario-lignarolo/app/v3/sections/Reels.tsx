"use client";

import Image from "next/image";
import { useRef } from "react";
import type { Reel } from "@/data/v3";
import { Arrow, ext } from "./ui";
import s from "../v3.module.css";

/**
 * 06 A · REELS. Carrusel horizontal de piezas verticales, grandes, con
 * desplazamiento nativo (scroll-snap) y dos controles. Cada pieza enlaza
 * a su publicación; la portada y el texto son los de Mario.
 */
export default function Reels({ label, items, all }: { label: string; items: Reel[]; all: { label: string; href: string } }) {
  const track = useRef<HTMLUListElement>(null);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("li");
    const step = card ? card.getBoundingClientRect().width * 2 + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className={s.reels}>
      <div className={`${s.wrap} ${s.reelsHead}`}>
        <p className={s.label}>{label}</p>
        <div className={s.reelsTools}>
          <a href={all.href} className={s.link} {...ext}>
            {all.label} <Arrow />
          </a>
          <span className={s.ctls}>
            <button type="button" className={s.ctl} onClick={() => go(-1)} aria-label="Anterior">
              <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
                <path d="M15 8H2M7 3 2 8l5 5" />
              </svg>
            </button>
            <button type="button" className={s.ctl} onClick={() => go(1)} aria-label="Siguiente">
              <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
                <path d="M1 8h13M9 3l5 5-5 5" />
              </svg>
            </button>
          </span>
        </div>
      </div>

      <ul className={s.reelTrack} ref={track}>
        {items.map((r, i) => (
          <li key={r.code} className={s.reel}>
            <a href={`https://www.instagram.com/reel/${r.code}/`} {...ext} className={s.reelLink}>
              <span className={`${s.photo} ${s.reelCover}`}>
                <Image src={r.src} alt="" fill sizes="(min-width: 880px) 22vw, 70vw" priority={i < 2} />
              </span>
              <span className={s.reelTitle}>{r.title}</span>
              <span className={s.reelMeta}>
                {r.duration} · {r.date}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
