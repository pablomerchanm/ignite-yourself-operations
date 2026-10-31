"use client";

import { useEffect, useRef, useState } from "react";

/**
 * El vídeo de la portada: sin sonido, en bucle, a la medida de cada pantalla
 * (en móvil, el recorte vertical). Con movimiento reducido no arranca y
 * queda el póster. Un botón discreto lo pausa o lo reanuda.
 */
export default function HeroVideo({
  desktop,
  mobile,
  poster,
  className,
  buttonClassName,
}: {
  desktop: string;
  mobile: string;
  poster: string;
  className?: string;
  buttonClassName?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    // React no escribe el atributo muted en el HTML: sin él, iOS no reproduce
    v.muted = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
      return;
    }
    v.play().then(() => setPlaying(true), () => setPlaying(false));
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play().then(() => setPlaying(true), () => setPlaying(false));
    else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <video ref={ref} className={className} muted loop playsInline preload="auto" poster={poster} aria-hidden="true">
        {/* WebM (VP9) para Chrome y Firefox; MP4 (H.264) para Safari */}
        <source src={mobile.replace(/\.mp4$/, ".webm")} type="video/webm" media="(max-width: 880px)" />
        <source src={mobile} type="video/mp4" media="(max-width: 880px)" />
        <source src={desktop.replace(/\.mp4$/, ".webm")} type="video/webm" />
        <source src={desktop} type="video/mp4" />
      </video>
      <button type="button" className={buttonClassName} onClick={toggle} aria-label={playing ? "Pausar el vídeo" : "Reproducir el vídeo"}>
        {playing ? "Pausa" : "Reproducir"}
      </button>
    </>
  );
}
