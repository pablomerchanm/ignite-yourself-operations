import Image from "next/image";
import type { CSSProperties } from "react";
import { channels, watch } from "@/data/content";
import { videos, type Video } from "@/data/videos";
import { Arrow, Eyebrow, Lines, SampleTag, SmartLink } from "./ui";

const ytUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;

function Play() {
  return (
    <span
      aria-hidden="true"
      className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-bone/40 transition-colors duration-500 group-hover:border-acid group-hover:text-acid"
    >
      <svg viewBox="0 0 16 16" className="ml-0.5 size-4" fill="currentColor">
        <path d="M3 1.5v13L14 8z" />
      </svg>
    </span>
  );
}

/** Miniatura: la real de YouTube si hay id; si no, tipográfica. */
function Thumb({ video }: { video: Video }) {
  return (
    <span className="grain relative block aspect-video overflow-hidden bg-[#0f1e1b]">
      {video.youtubeId ? (
        <Image
          src={`https://i.ytimg.com/vi/${video.youtubeId}/maxresdefault.jpg`}
          alt=""
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover opacity-80 transition-[transform,opacity] duration-700 group-hover:scale-[1.03] group-hover:opacity-100"
        />
      ) : (
        <span
          aria-hidden="true"
          className="display absolute bottom-0 left-0 max-w-[85%] p-[6%] text-[clamp(1.3rem,1rem+0.8vw,1.75rem)] leading-[0.95] text-bone/85"
        >
          {video.title}
        </span>
      )}
      <Play />
    </span>
  );
}

/** 09 — Videos: cuatro en fila (dos en móvil). */
export default function Watch() {
  if (videos.length === 0) return null;
  return (
    <section id="videos" aria-labelledby="watch-title" className="gutter grain bg-ink py-[clamp(4.5rem,3rem+7vw,9.5rem)] text-bone">
      <div className="grid grid-cols-1 items-end gap-y-8 lg:grid-cols-12 lg:gap-x-6">
        <div className="lg:col-span-8">
          <Eyebrow className="mb-8 text-fog">{watch.eyebrow}</Eyebrow>
          <Lines id="watch-title" lines={[watch.title]} className="display text-[clamp(2.6rem,1.4rem+4.6vw,6.5rem)] leading-[0.92]" />
        </div>
        <div data-reveal="up" className="lg:col-span-4 lg:text-right">
          <SmartLink href={channels.youtube.href} className="caps link-line inline-flex items-center gap-3 pb-1">
            {watch.cta} <Arrow diagonal />
          </SmartLink>
        </div>
      </div>

      <ul className="mt-[clamp(2.5rem,5vw,4rem)] grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {videos.slice(0, 4).map((v, i) => (
          <li
            key={v.title}
            data-reveal="up"
            style={{ "--delay": `${(i % 4) * 0.08}s` } as CSSProperties}
            className={i > 1 ? "hidden sm:block" : undefined}
          >
            <SmartLink href={v.youtubeId ? ytUrl(v.youtubeId) : ""} className="group block">
              <Thumb video={v} />
              <span className="mt-4 flex items-baseline justify-between gap-3">
                <span className="display text-[clamp(1.3rem,1.1rem+0.5vw,1.6rem)] leading-tight text-bone/90">{v.youtubeId ? v.title : null}</span>
                <SampleTag show={v.sample} />
              </span>
            </SmartLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
