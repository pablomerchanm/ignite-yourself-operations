"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useRef, useState } from "react";

/**
 * Video propio (alojado en el sitio): portada con botón; al pulsar se
 * reproduce con los controles nativos y, al terminar, vuelve a la portada.
 * Sin carga previa: el mp4 solo se pide cuando alguien lo reproduce.
 * `cover` sustituye la foto de portada por cualquier otra cosa (p. ej. el aura).
 */
export default function VideoPlayer({
  src,
  poster,
  duration,
  label,
  cover,
  className = "",
}: {
  src: string;
  poster: string;
  duration: string;
  label: string;
  cover?: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    setPlaying(true);
    void ref.current?.play();
  };
  const reset = () => {
    setPlaying(false);
    ref.current?.load();
  };

  return (
    <div className={`relative overflow-hidden ${playing ? "bg-black" : ""} ${className}`} data-playing={playing || undefined}>
      <video
        ref={ref}
        preload="none"
        playsInline
        controls={playing}
        onEnded={reset}
        poster={poster}
        className={`absolute inset-0 h-full w-full ${playing ? "object-contain" : "object-cover"}`}
      >
        <source src={src} type="video/mp4" />
      </video>

      {!playing && (
        <>
          {cover ?? <Image src={poster} alt="" fill sizes="(min-width: 1024px) 66vw, 100vw" className="object-cover" />}
          <button
            type="button"
            onClick={play}
            aria-label={`Reproducir: ${label}`}
            className="group absolute inset-0 z-10 flex items-end p-4 text-left sm:p-5"
          >
            <span className="btn btn--paper btn--sm shadow-lg">
              <svg viewBox="0 0 16 16" className="size-3" fill="currentColor" aria-hidden="true">
                <path d="M3 1.5v13L14 8z" />
              </svg>
              {label} · {duration}
            </span>
          </button>
        </>
      )}
    </div>
  );
}
