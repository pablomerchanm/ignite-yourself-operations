import type { CSSProperties } from "react";
import s from "../v3.module.css";

/** Enlaces externos: pestaña nueva sin filtrar el opener. */
export const ext = { target: "_blank", rel: "noopener noreferrer" } as const;

/** Título de sección a la manera de Nike About: caja baja, peso regular, tamaño humano. */
export function SectionHead({ label, id }: { label: string; id?: string }) {
  return (
    <p className={s.title} id={id} data-reveal="up">
      {label}
    </p>
  );
}

/** Flecha ↗ de los CTA: un trazo, sin relleno. */
export function Arrow() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M3 13 13 3M5 3h8v8" />
    </svg>
  );
}

/** Titular que entra línea a línea (usa el revelado global de <Motion/>). */
export function Lines({
  lines,
  className,
  as: Tag = "p",
  id,
}: {
  lines: React.ReactNode[];
  className: string;
  as?: "h1" | "h2" | "h3" | "p";
  id?: string;
}) {
  return (
    <Tag className={className} id={id} data-reveal="lines">
      {lines.map((l, i) => (
        <span key={i} className="line" style={{ "--i": i } as CSSProperties}>
          <span>{l}</span>
        </span>
      ))}
    </Tag>
  );
}

/** Párrafos del copy, tal cual, sin reescribir. */
export function Paragraphs({ items, className }: { items: string[]; className?: string }) {
  return (
    <>
      {items.map((p) => (
        <p key={p} className={className}>
          {p}
        </p>
      ))}
    </>
  );
}
