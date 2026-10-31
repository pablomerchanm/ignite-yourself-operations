"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

type Reel = { id: string; at: { x: number; y: number; w: number } };

/**
 * La ráfaga de la portada: reels de Mario, en vertical y sin sonido, que se
 * apilan uno tras otro en el sitio del recorte (la coreografía, en CSS).
 * Cuando el recorte se abre, se van; aquí solo se arrancan y, al terminar
 * la secuencia, se pausan. Con movimiento reducido no se reproducen (y el
 * CSS no los muestra).
 */
export default function HeroSweep({ items, base, className, itemClassName }: { items: Reel[]; base: string; className?: string; itemClassName?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const videos = Array.from(ref.current?.querySelectorAll("video") ?? []);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    for (const v of videos) {
      v.muted = true; // React no escribe el atributo: sin él, iOS no reproduce
      v.play().catch(() => {});
    }
    const t = window.setTimeout(() => videos.forEach((v) => v.pause()), 4500);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div ref={ref} className={className} aria-hidden="true">
      {items.map((r, i) => (
        <span key={r.id} className={itemClassName} style={{ "--x": `${r.at.x}%`, "--y": `${r.at.y}%`, "--w": `${r.at.w}%`, "--d": `${0.15 + i * 0.42}s` } as CSSProperties}>
          <video muted loop playsInline preload="auto" poster={`${base}/${r.id}.jpg`}>
            <source src={`${base}/${r.id}.webm`} type="video/webm" />
            <source src={`${base}/${r.id}.mp4`} type="video/mp4" />
          </video>
        </span>
      ))}
    </div>
  );
}
