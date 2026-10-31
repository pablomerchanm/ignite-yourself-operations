"use client";

import Image from "next/image";
import { useState } from "react";
import type { Talk } from "@/data/v3";
import { Arrow, ext } from "./ui";
import s from "../v4.module.css";

const thumb = (id: string) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;

/**
 * 06 B · CONVERSACIONES. Biblioteca de piezas largas sobre casi negro:
 * una principal en grande, con su control de reproducción, y el listado
 * al lado. El video se carga solo al pulsar (sin cookies ni marca de la
 * plataforma hasta entonces).
 */
export default function Conversaciones({ label, items, all }: { label: string; items: Talk[]; all: { label: string; href: string } }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  const cur = items[active];
  if (!cur) return null;

  const select = (i: number) => {
    setActive(i);
    setPlaying(false);
  };

  return (
    <div className={`${s.dark} ${s.talks}`}>
      <div className={`${s.wrap} ${s.talksHead}`}>
        <p className={s.title}>{label}</p>
        <a href={all.href} className={s.link} {...ext}>
          {all.label} <Arrow />
        </a>
      </div>

      <div className={`${s.wrap} ${s.grid} ${s.talksGrid}`}>
        <div className={s.talkMain}>
          <div className={s.talkScreen}>
            {playing ? (
              <iframe
                className={s.talkFrame}
                src={`https://www.youtube-nocookie.com/embed/${cur.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                title={cur.title}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <>
                <Image key={cur.youtubeId} src={thumb(cur.youtubeId)} alt="" fill sizes="(min-width: 880px) 64vw, 100vw" className={s.talkPoster} />
                <button type="button" className={s.talkPlay} onClick={() => setPlaying(true)} aria-label={`Reproducir: ${cur.title}`}>
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 4v16l13-8z" />
                  </svg>
                  <span>Reproducir</span>
                </button>
              </>
            )}
          </div>
          <div className={s.talkCaption}>
            <p className={s.dato}>
              ({String(active + 1).padStart(2, "0")}/{String(items.length).padStart(2, "0")})
              {cur.duration ? ` · ${cur.duration}` : ""}
            </p>
            <h3 className={s.talkTitle}>{cur.title}</h3>
          </div>
        </div>

        <ol className={s.talkList} aria-label="Listado">
          {items.map((t, i) => (
            <li key={t.youtubeId}>
              <button type="button" className={s.talkRow} aria-current={i === active ? "true" : undefined} onClick={() => select(i)}>
                <span className={s.talkRowIndex}>{String(i + 1).padStart(2, "0")}</span>
                <span className={s.talkRowTitle}>{t.title}</span>
                {t.duration && <span className={s.talkRowMeta}>{t.duration}</span>}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
