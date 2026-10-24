"use client";

import Image from "next/image";
import { useRef, useState } from "react";

/**
 * Video propio para /v3: portada con un control de bordes rectos; al pulsar
 * se reproduce con los controles nativos y al terminar vuelve a la portada.
 * El mp4 solo se pide cuando alguien lo reproduce.
 */
export default function Video({
  src,
  poster,
  duration,
  label,
  className = "",
  buttonClassName = "",
}: {
  src: string;
  poster: string;
  duration: string;
  label: string;
  className?: string;
  buttonClassName?: string;
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
    <div className={className} style={{ position: "relative", overflow: "hidden", background: "#000" }}>
      <video
        ref={ref}
        preload="none"
        playsInline
        controls={playing}
        onEnded={reset}
        poster={poster}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: playing ? "contain" : "cover" }}
      >
        <source src={src} type="video/mp4" />
      </video>
      {!playing && (
        <>
          <Image src={poster} alt="" fill sizes="(min-width: 880px) 60vw, 100vw" style={{ objectFit: "cover" }} />
          <button type="button" onClick={play} aria-label={`Reproducir: ${label}`} className={buttonClassName}>
            <svg viewBox="0 0 16 16" width="10" height="10" fill="currentColor" aria-hidden="true">
              <path d="M3 1.5v13L14 8z" />
            </svg>
            <span>
              {label} · {duration}
            </span>
          </button>
        </>
      )}
    </div>
  );
}
