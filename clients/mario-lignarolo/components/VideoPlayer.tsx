"use client";

import Image from "next/image";
import { useRef, useState } from "react";

/**
 * Video propio (alojado en el sitio): portada con botón; al pulsar se
 * reproduce con los controles nativos y, al terminar, vuelve a la portada.
 * Sin carga previa: el mp4 solo se pide cuando alguien lo reproduce.
 */
export default function VideoPlayer({
  src,
  poster,
  duration,
  label,
  className = "",
}: {
  src: string;
  poster: string;
  duration: string;
  label: string;
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
    <div className={`relative overflow-hidden bg-black ${className}`}>
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
          <Image src={poster} alt="" fill sizes="(min-width: 1024px) 66vw, 100vw" className="object-cover" />
          <button
            type="button"
            onClick={play}
            aria-label={`Reproducir: ${label}`}
            className="group absolute inset-0 flex items-end justify-between bg-ink/15 p-5 text-left transition-colors hover:bg-ink/5 sm:p-7"
          >
            <span className="caps max-w-[22rem] text-bone">{label}</span>
            <span className="caps text-bone/80">{duration}</span>
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-acid text-ink shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-transform duration-500 group-hover:scale-110 sm:size-20"
            >
              <svg viewBox="0 0 16 16" className="ml-1 size-6" fill="currentColor">
                <path d="M3 1.5v13L14 8z" />
              </svg>
            </span>
          </button>
        </>
      )}
    </div>
  );
}
