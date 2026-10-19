"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { articles } from "@/data/articles";
import { channels, home } from "@/data/content";
import { videos } from "@/data/videos";
import { formatDate } from "./format";
import { Arrow, SmartLink } from "./ui";

type Tab = "articles" | "videos";
const ytUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;

/**
 * 08 — Lo que escribe y lo que graba, en un solo carrusel con dos pestañas.
 * Las tarjetas se deslizan (y con las flechas, en escritorio).
 */
export default function Contenido() {
  const [tab, setTab] = useState<Tab>("articles");
  const rail = useRef<HTMLUListElement>(null);
  const { contenido } = home;

  const go = (dir: 1 | -1) => {
    const el = rail.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.offsetWidth + 16), behavior: "smooth" });
  };
  const select = (t: Tab) => {
    setTab(t);
    rail.current?.scrollTo({ left: 0 });
  };

  return (
    <section id="escritos" aria-labelledby="contenido-title" className="gutter bg-mist py-[clamp(4.5rem,3rem+7vw,9rem)]">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p data-reveal="up" className="caps text-stone">
            {contenido.eyebrow}
          </p>
          <h2 id="contenido-title" data-reveal="up" className="title mt-4 text-[clamp(2.6rem,1.6rem+3.6vw,5rem)]">
            {contenido.title.before} <b>{contenido.title.strong}</b>
          </h2>
        </div>
        <div data-reveal="up" className="flex items-center gap-2">
          <div role="tablist" aria-label="Tipo de contenido" className="flex gap-1">
            {(["articles", "videos"] as Tab[]).map((t) => (
              <button
                key={t}
                role="tab"
                type="button"
                aria-selected={tab === t}
                onClick={() => select(t)}
                className="chip bg-paper"
              >
                {contenido.tabs[t]}
              </button>
            ))}
          </div>
          <div className="ml-2 hidden gap-2 lg:flex">
            <button type="button" className="rail-btn" aria-label="Anterior" onClick={() => go(-1)}>
              <Arrow className="rotate-180" />
            </button>
            <button type="button" className="rail-btn" aria-label="Siguiente" onClick={() => go(1)}>
              <Arrow />
            </button>
          </div>
        </div>
      </div>

      <ul ref={rail} className="rail rail--cards mt-10" role="tabpanel">
        {tab === "articles"
          ? articles.map((a) => (
              <li key={a.title} className="card card--paper flex flex-col p-6">
                <span className="caps flex flex-wrap items-center gap-x-3 text-stone">
                  <span>{a.topic}</span>
                  {a.date ? <time dateTime={a.date}>{formatDate(a.date)}</time> : null}
                </span>
                <h3 className="title mt-5 text-[clamp(1.5rem,1.3rem+0.6vw,1.9rem)] font-normal">{a.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-[1.5] text-charcoal/70">{a.excerpt}</p>
                <SmartLink href={a.url} className="btn btn--ghost btn--sm mt-auto w-fit pt-[calc(0.65rem+1px)] [margin-top:1.75rem]">
                  Leer <Arrow diagonal />
                </SmartLink>
              </li>
            ))
          : videos.map((v) => (
              <li key={v.title} className="group">
                <SmartLink href={v.youtubeId ? ytUrl(v.youtubeId) : ""} className="block">
                  <span className="frame relative block aspect-video bg-ink">
                    {v.youtubeId && (
                      <Image
                        src={`https://i.ytimg.com/vi/${v.youtubeId}/maxresdefault.jpg`}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 22rem, 78vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    )}
                    <span
                      aria-hidden="true"
                      className="absolute left-1/2 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-paper/90 text-charcoal"
                    >
                      <svg viewBox="0 0 16 16" className="ml-0.5 size-4" fill="currentColor">
                        <path d="M3 1.5v13L14 8z" />
                      </svg>
                    </span>
                  </span>
                  <span className="mt-4 block text-[1.05rem] font-medium leading-[1.3]">{v.title}</span>
                </SmartLink>
              </li>
            ))}
      </ul>

      <p data-reveal="up" className="mt-8">
        <a
          href={tab === "articles" ? channels.substack.href : channels.youtube.href}
          target="_blank"
          rel="noopener noreferrer"
          className="link-line inline-flex items-center gap-2 text-[0.9rem] font-medium"
        >
          {tab === "articles" ? contenido.allArticles : contenido.allVideos} <Arrow diagonal />
        </a>
      </p>
    </section>
  );
}
